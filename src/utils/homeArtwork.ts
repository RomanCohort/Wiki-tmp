type ArtworkElement = HTMLImageElement | SVGImageElement;
export type HomeArtworkStatus = "ready" | "loading" | "error";

type Artwork = {
  source: string;
  crossOrigin: string | null;
  elements: Set<ArtworkElement>;
  status: HomeArtworkStatus;
  retries: number;
  revision: number;
  url: string;
  cancel: () => void;
};

const REQUEST_TIMEOUT = 12000;
const SLOW_REQUEST_TIMEOUT = 25000;
const MAX_RETRIES = 2;
const RETRY_PARAMETER = "home-image-retry";

type NetworkInformationLike = {
  effectiveType?: string;
  saveData?: boolean;
};

/** A single 8 s deadline treated every slow handshake as a broken image.
 * Give weak links and data-saver modes room before declaring failure. */
function requestTimeout() {
  if (typeof navigator === "undefined") return REQUEST_TIMEOUT;
  const connection = (
    navigator as Navigator & { connection?: NetworkInformationLike }
  ).connection;
  if (connection?.saveData) return SLOW_REQUEST_TIMEOUT;
  if (
    connection?.effectiveType &&
    /(^|-)2g$/.test(connection.effectiveType)
  )
    return SLOW_REQUEST_TIMEOUT;
  if (window.matchMedia?.("(pointer: coarse)").matches)
    return Math.round((REQUEST_TIMEOUT + SLOW_REQUEST_TIMEOUT) / 2);
  return REQUEST_TIMEOUT;
}

/** Home alone owns these requests. A shared URL gets one retry sequence,
 * including artwork reused in several cards or SVG layers. */
export function createHomeArtworkLoader(
  root: HTMLElement,
  onChange: () => void,
) {
  const artwork = new Map<string, Artwork>();
  const elements = new WeakMap<Element, Artwork>();
  let disposed = false;

  const mark = (art: Artwork, status: HomeArtworkStatus) => {
    art.status = status;
    art.elements.forEach((element) => {
      element.dataset.homeArtwork = status;
    });
  };
  const applyRetry = (art: Artwork, element: ArtworkElement) => {
    if (!art.revision) return;
    if (element instanceof HTMLImageElement) {
      // Keep successful copies and their decoded pixels in place.
      if (element.complete && element.naturalWidth > 0) return;
      if (element.src !== art.url) element.src = art.url;
    } else if (element.href.baseVal !== art.url) {
      element.setAttribute("href", art.url);
    }
  };
  const start = (art: Artwork, retry = false) => {
    art.cancel();
    if (disposed) return;
    if (retry) {
      const url = new URL(art.source, document.baseURI);
      url.searchParams.set(RETRY_PARAMETER, String(++art.revision));
      art.url = url.href;
    }
    mark(art, "loading");
    const image = new Image();
    if (art.crossOrigin !== null) image.crossOrigin = art.crossOrigin;
    let active = true;
    let timer = 0;
    const cleanup = () => {
      active = false;
      window.clearTimeout(timer);
      image.removeEventListener("load", loaded);
      image.removeEventListener("error", failed);
    };
    const finish = (success: boolean) => {
      if (!active || disposed) return;
      cleanup();
      if (!success) image.src = "";
      if (success) {
        if (
          !art.revision &&
          [...art.elements].some(
            (element) =>
              element instanceof HTMLImageElement &&
              element.complete &&
              !element.naturalWidth,
          )
        ) {
          ++art.retries;
          start(art, true);
          onChange();
          return;
        }
        art.elements.forEach((element) => applyRetry(art, element));
        mark(art, "ready");
        // A native image can stall independently of its decoded cache probe.
        const nativeTimer = window.setTimeout(() => {
          if (disposed || nativeReady()) return;
          if (art.retries < MAX_RETRIES) {
            ++art.retries;
            start(art, true);
          } else mark(art, "error");
          onChange();
        }, requestTimeout());
        art.cancel = () => window.clearTimeout(nativeTimer);
      } else if (art.retries < MAX_RETRIES) {
        const delay = 750 * 2 ** art.retries++;
        const backoff = window.setTimeout(() => start(art, true), delay);
        art.cancel = () => window.clearTimeout(backoff);
      } else {
        mark(art, "error");
        art.cancel = () => {};
      }
      onChange();
    };
    const failed = () => finish(false);
    const nativeReady = () =>
      [...art.elements].every(
        (element) =>
          !root.contains(element) ||
          !(element instanceof HTMLImageElement) ||
          (element.complete && element.naturalWidth > 0),
      );
    const loaded = () => {
      if (!image.naturalWidth) {
        failed();
        return;
      }
      // Download completion alone does not mean the browser can paint it.
      void image.decode().then(() => finish(true), failed);
    };
    art.cancel = () => {
      cleanup();
      image.src = "";
    };
    image.addEventListener("load", loaded, { once: true });
    image.addEventListener("error", failed, { once: true });
    timer = window.setTimeout(failed, requestTimeout());
    image.src = art.url;
  };

  const warm = (scene: Element) => {
    const added: Artwork[] = [];
    scene.querySelectorAll<ArtworkElement>("img, image").forEach((element) => {
      // The gate parks a blurred placeholder in src/href; the real URL lives
      // on data-artwork-src so warming still targets the full-size asset.
      const raw =
        element.dataset.artworkSrc ||
        (element instanceof HTMLImageElement
          ? element.currentSrc || element.src
          : element.href.baseVal);
      if (!raw || raw.startsWith("#") || raw.startsWith("data:")) return;
      const source = new URL(raw, document.baseURI);
      source.searchParams.delete(RETRY_PARAMETER);
      const crossOrigin = element.getAttribute("crossorigin");
      const key = JSON.stringify([source.href, crossOrigin]);
      let art = artwork.get(key);
      if (!art) {
        art = {
          source: source.href,
          url: source.href,
          crossOrigin,
          elements: new Set(),
          status: "loading",
          retries: 0,
          revision: 0,
          cancel: () => {},
        };
        artwork.set(key, art);
        added.push(art);
      }
      art.elements.add(element);
      elements.set(element, art);
      element.dataset.homeArtwork = art.status;
      if (element instanceof HTMLImageElement) element.loading = "eager";
      if (art.status === "ready") applyRetry(art, element);
    });
    added.forEach((art) => start(art));
  };
  const sourcesIn = (scene: Element | null | undefined) =>
    new Set(
      Array.from(scene?.querySelectorAll("img, image") ?? [], (element) =>
        elements.get(element),
      ).filter((art): art is Artwork => !!art),
    );
  const status = (scene: Element | null | undefined): HomeArtworkStatus => {
    const sources = [...sourcesIn(scene)];
    // A layer that has fallen back to its blurred placeholder is degraded, not
    // broken: the story should keep playing instead of blocking on it.
    // An AVIF layer that successfully retried as WebP is not broken, even
    // though the original URL probe failed.
    const broken = sources.filter((art) => art.status === "error").some((art) =>
      [...art.elements].some(
        (element) =>
          !element.hasAttribute("data-avif-fallback") &&
          !element.hasAttribute("data-artwork-degraded"),
      ),
    );
    if (broken) return "error";
    if (sources.some((art) => art.status === "loading")) return "loading";
    // Chapters that were never warmed still gate readiness: their images
    // load lazily, so "not in the map" is not the same as "ready". A failed
    // image (complete but no pixels) must not read as pending forever —
    // that deadlocks the story on scenes that will never finish loading.
    const images = Array.from(
      scene?.querySelectorAll("img") ?? [],
      (element) => element as HTMLImageElement,
    );
    if (images.some((element) => !element.complete)) return "loading";
    return "ready";
  };
  const onError = (event: Event) => {
    const art =
      event.target instanceof Element ? elements.get(event.target) : undefined;
    // An actual DOM image can fail after its cached preload succeeded.
    if (art?.status === "ready") {
      if (art.retries < MAX_RETRIES) {
        ++art.retries;
        start(art, true);
      } else mark(art, "error");
      onChange();
    }
  };
  const onLoad = () => onChange();
  root.addEventListener("error", onError, true);
  root.addEventListener("load", onLoad, true);
  const observer = new MutationObserver((records) => {
    if (
      records.some((record) =>
        [...record.addedNodes].some(
          (node) =>
            node instanceof Element &&
            (node.matches("img, image") || node.querySelector("img, image")),
        ),
      )
    ) {
      // Do not warm(root) here. React mounts every chapter at once, and
      // re-warming the page turned every lazy layer back into eager, which
      // queued the entire story on first paint. The playback controller owns
      // chapter warming and knows which scene is current.
      onChange();
    }
  });
  observer.observe(root, { childList: true, subtree: true });

  return {
    warm,
    status,
    retry(scene: Element | null | undefined) {
      if (!scene) return;
      for (const art of sourcesIn(scene)) {
        if (art.status !== "error") continue;
        art.retries = 0;
        start(art, true);
      }
      onChange();
    },
    dispose() {
      disposed = true;
      observer.disconnect();
      root.removeEventListener("error", onError, true);
      root.removeEventListener("load", onLoad, true);
      artwork.forEach((art) => {
        art.cancel();
        art.elements.forEach((element) => {
          delete element.dataset.homeArtwork;
        });
      });
    },
  };
}
