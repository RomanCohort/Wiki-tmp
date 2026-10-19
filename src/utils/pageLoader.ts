/**
 * Runtime control for the static page loader in `index.html`.
 *
 * The loader is plain HTML/CSS so it paints before the app bundle arrives.
 * This module only decides WHEN it leaves: as soon as the current route is
 * actually presentable and the loader's entrance has finished. Readiness
 * includes the selected route's styles, fonts, decoded images around the
 * first screen and the first renderable frame of autoplay media used by its
 * animations. After the styles, these waits are capped by READY_DEADLINE_MS.
 */

const LEAVE_MS = 380; // matches `.page-loader` opacity transition

/** Some environments (static analysis, older embedded webviews) do not expose
 * the Performance API. The loader only needs a monotonic-ish clock. */
const clock = () =>
  typeof performance !== "undefined" &&
  typeof performance.now === "function"
    ? performance.now()
    : Date.now();
const COMPLETE_HOLD_MS = 350; // let the finished illustration register
// External apps may never send their readiness message when their service is
// unavailable. This limit applies only to explicitly opted-in embeds.
const EMBED_WAIT_MS = 12000;
// A CDN request can stall with headers sent and a body that never finishes,
// firing neither load nor error. Once the stylesheet applies, art, fonts and
// scene preparation share this budget; then the page enters and the rest
// keeps loading in place.
const READY_DEADLINE_MS = 15000;

let token = 0;
let leaveTimer = 0;
let leaving = false;
let readiness: AbortController | undefined;
const leaveListeners = new Set<() => void>();
const pagePreparations = new Set<() => void | Promise<void>>();
const preparationTasks = new Set<Promise<void>>();
const settledSvgSources = new Set<string>();
const nativeSvgTasks = new Map<string, Promise<void>>();
const nativeSvgPreloads = new Set<SVGSVGElement>();

const svgSource = (image: SVGImageElement) =>
  JSON.stringify([image.href.baseVal, image.getAttribute("crossorigin")]);

// Register before React mounts. A decoded HTML Image and an SVG image have
// separate loading lifecycles, even when they point at the same artwork.
for (const type of ["load", "error"]) {
  document.addEventListener(type, (event) => {
    if (event.target instanceof SVGImageElement) {
      const source = svgSource(event.target);
      settledSvgSources.add(source);
    }
  }, true);
}

/** Register layout work that needs the route's final styles, fonts and art. */
export function registerPagePreparation(prepare: () => void | Promise<void>) {
  pagePreparations.add(prepare);
  return () => { pagePreparations.delete(prepare); };
}

/** Track work already started by a scene, including work created by a rebuild.
 * The scene owns its failure fallback. Cleanup releases snapshots waiting on
 * an unmounted scene even if its original decode promise has not settled. */
export function trackPagePreparation(task: Promise<void>) {
  let resolve!: () => void;
  const pending = new Promise<void>((done) => { resolve = done; });
  preparationTasks.add(pending);
  const finish = () => {
    preparationTasks.delete(pending);
    resolve();
  };
  void task.then(finish, finish);
  return finish;
}

const PREPARATION_DRAIN_MS = 4000;

/** Scene preparation is an optimisation, not a correctness requirement: the
 * loader already releases these tasks at the 15 s deadline. Give the drain a
 * short budget so one scene whose geometry never settles cannot hold the page
 * for the full deadline. Waiting longer buys nothing — the same tasks are
 * still unfinished when the deadline fires. */
async function finishPagePreparations(
  signal: AbortSignal,
  deadline = Number.POSITIVE_INFINITY,
) {
  while (!signal.aborted && preparationTasks.size) {
    const remaining = deadline - clock();
    if (remaining <= 0) return;
    const batch = Array.from(preparationTasks);
    await new Promise<void>((resolve) => {
      const id = window.setTimeout(resolve, remaining);
      const done = () => {
        window.clearTimeout(id);
        signal.removeEventListener("abort", done);
        resolve();
      };
      signal.addEventListener("abort", done, { once: true });
      void Promise.all(batch).then(done, done);
      if (signal.aborted) done();
    });
  }
}

function reportStatus(loader: HTMLElement, phase: string, message: string) {
  loader.dataset.phase = phase;
  loader.dataset.message = message;
  loader.dispatchEvent(new Event("loaderstatus"));
}

function renderFrames() {
  return new Promise<void>((resolve) =>
    requestAnimationFrame(() => requestAnimationFrame(() => resolve())),
  );
}

function loaderElement() {
  return document.getElementById("page-loader");
}

function isVisible(loader: HTMLElement) {
  return !loader.hidden && !leaving;
}

function notifyLeave() {
  leaveListeners.forEach((listener) => listener());
  leaveListeners.clear();
}

/** Resolves when the loader starts leaving (immediately if already gone). */
export function whenPageLoaderLeaves(): Promise<void> {
  const loader = loaderElement();
  if (!loader || !isVisible(loader)) return Promise.resolve();
  return new Promise((resolve) => leaveListeners.add(resolve));
}

/** Cover the page for an in-app route change. */
export function showPageLoader() {
  const loader = loaderElement();
  if (!loader) return;
  ++token;
  readiness?.abort();
  nativeSvgPreloads.forEach((svg) => svg.remove());
  nativeSvgPreloads.clear();
  nativeSvgTasks.clear();
  settledSvgSources.clear();
  window.clearTimeout(leaveTimer);
  if (isVisible(loader)) return; // first load or an overlapping navigation

  leaving = false;
  loader.hidden = false;
  loader.classList.remove("is-leaving", "is-playing");
  void loader.offsetWidth; // restart the CSS stage timeline
  // index.html owns the entrance clock for initial loads and route replays.
  loader.dispatchEvent(new Event("loaderstart"));
}

/** Wait for the real CSS entrance, excluding the infinite breathing loops. */
async function openingComplete(loader: HTMLElement, signal: AbortSignal) {
  if (!loader.classList.contains("is-playing")) {
    await new Promise<void>((resolve) => {
      const done = () => {
        loader.removeEventListener("loaderplay", done);
        signal.removeEventListener("abort", done);
        resolve();
      };
      loader.addEventListener("loaderplay", done, { once: true });
      signal.addEventListener("abort", done, { once: true });
    });
  }
  if (signal.aborted) return;
  const animations = loader
    .getAnimations({ subtree: true })
    .filter(
      (animation) => animation.effect?.getTiming().iterations !== Infinity,
    );
  await Promise.allSettled(animations.map((animation) => animation.finished));
  if (
    signal.aborted ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  )
    return;
  await new Promise<void>((resolve) =>
    window.setTimeout(resolve, COMPLETE_HOLD_MS),
  );
}

/** Hide the loader once the page that is mounted now is presentable. */
export function hidePageLoaderWhenReady() {
  const loader = loaderElement();
  if (!loader) return;
  const current = ++token;
  readiness?.abort();
  readiness = new AbortController();
  const { signal } = readiness;
  const ready = Promise.all([
    openingComplete(loader, signal),
    pageReady(loader, signal),
  ]);

  void ready.then(() => {
    if (current !== token || signal.aborted || !isVisible(loader)) return;
    reportStatus(loader, "ready", "Ready");
    loader.dispatchEvent(new Event("loaderready"));
    leaving = true;
    loader.classList.add("is-leaving");
    notifyLeave();
    leaveTimer = window.setTimeout(() => {
      if (current !== token) return;
      loader.hidden = true;
      loader.classList.remove("is-leaving", "is-playing");
      leaving = false;
    }, LEAVE_MS);
  }).catch(() => {
    if (current !== token || signal.aborted || !isVisible(loader)) return;
    reportStatus(loader, "error", "The page could not load. Please try again.");
    loader.dispatchEvent(new Event("loadererror"));
  });
}

type LoaderMark = (label: string) => void;

async function pageReady(loader: HTMLElement, signal: AbortSignal) {
  const startedAt = clock();
  const marks: Array<{ label: string; at: number }> = [];
  const mark: LoaderMark = (label) => {
    marks.push({ label, at: Math.round(clock() - startedAt) });
  };
  mark("start");
  // Let the selected route's effects initialize its animation DOM first.
  await renderFrames();
  mark("renderFrames#1");
  if (signal.aborted) return;
  reportStatus(loader, "styles", "Preparing the page…");
  await deferredStyles(signal);
  mark("deferredStyles");
  if (signal.aborted) return;
  // Without its stylesheet the page is not presentable, so only the remaining
  // stages run under the deadline. Its abort settles every wait below.
  const budget = new AbortController();
  const expire = () => budget.abort();
  signal.addEventListener("abort", expire, { once: true });
  budget.signal.addEventListener("abort", () => mark("aborted"), { once: true });
  const timer = window.setTimeout(expire, READY_DEADLINE_MS);
  try {
    await styledPageReady(loader, budget.signal, mark);
  } finally {
    window.clearTimeout(timer);
    signal.removeEventListener("abort", expire);
    mark("done");
    if (
      window.location?.search?.includes("loader-timing") &&
      typeof console !== "undefined"
    )
      console.info("[loader-timing]", JSON.stringify(marks));
  }
}

async function styledPageReady(
  loader: HTMLElement,
  signal: AbortSignal,
  mark: LoaderMark,
) {
  // Applying the non-blocking stylesheet can start new font requests. Do not
  // capture fonts.ready before the browser has laid out its styled content.
  await renderFrames();
  mark("renderFrames#2");
  if (signal.aborted) return;
  const seenArt = new Set<string>();
  const preparedElements = new WeakMap<Element, string>();
  const prepareArt = () => pageImagesAndAnimations(signal, (complete, total) => {
    reportStatus(loader, "assets", `Preparing artwork · ${complete} of ${total} ready`);
  }, seenArt, preparedElements);
  reportStatus(loader, "assets", "Preparing the artwork…");
  await prepareArt();
  mark("prepareArt#1");
  if (signal.aborted) return;
  reportStatus(loader, "fonts", "Preparing the text…");
  await fontsSettled(signal);
  mark("fonts#1");
  if (signal.aborted) return;
  reportStatus(loader, "layout", "Preparing the scene…");
  await untilAborted(Promise.all(Array.from(pagePreparations, (prepare) => prepare())), signal);
  mark("pagePreparations");
  if (signal.aborted) return;
  // Font-dependent animation geometry and refreshed pins must paint before
  // HomeIntro is allowed to play, rather than settling during the reveal.
  await renderFrames();
  mark("renderFrames#3");
  if (signal.aborted) return;
  // Preparation can mount new transfer layers or replace image clones. Their
  // own requests and decode must finish too, even when the source art is cached.
  await prepareArt();
  mark("prepareArt#2");
  if (signal.aborted) return;
  await fontsSettled(signal);
  mark("fonts#2");
  if (signal.aborted) return;
  reportStatus(loader, "layout", "Preparing the scene…");
  // Rebuilds can start new decode -> RAF -> pixel-sampling work. Drain the
  // current tasks, including tasks added while waiting or during final paint.
  const drainDeadline = clock() + PREPARATION_DRAIN_MS;
  do {
    await finishPagePreparations(signal, drainDeadline);
    mark("drain");
    if (signal.aborted) return;
    await renderFrames();
    mark("renderFrames#4");
  } while (
    !signal.aborted &&
    preparationTasks.size &&
    clock() < drainDeadline
  );
  mark("styledReady-done");
}

const FONT_WAIT_MS = 2500;

/** Every site font uses `font-display: swap`, so text is readable while the
 * request is still in flight. A stalled font must not hold the loader until
 * the 15 s deadline; wait briefly, then let the page paint with fallbacks. */
function fontsSettled(signal: AbortSignal) {
  const ready = document.fonts?.ready;
  if (!ready) return Promise.resolve();
  return untilAborted(
    Promise.race([
      ready,
      new Promise<void>((resolve) => {
        window.setTimeout(resolve, FONT_WAIT_MS);
      }),
    ]),
    signal,
  );
}

/** Settle with `task`, or quietly on abort. Rejections still pass through:
 * a failed page preparation must surface as an error. */
function untilAborted(task: Promise<unknown> | undefined, signal: AbortSignal) {
  if (!task || signal.aborted) return Promise.resolve();
  let stop = () => {};
  return Promise.race([
    task.then(() => {}),
    new Promise<void>((resolve) => {
      stop = resolve;
      signal.addEventListener("abort", stop, { once: true });
    }),
  ]).finally(() => signal.removeEventListener("abort", stop));
}

/** The app stylesheet is loaded non-blocking (see vite.config.ts). */
function deferredStyles(signal: AbortSignal) {
  const links = Array.from(
    document.querySelectorAll<HTMLLinkElement>("link[data-deferred-css]"),
  );
  return Promise.all(
    links.map(
      (link) =>
        new Promise<void>((resolve, reject) => {
          const cleanup = () => {
            link.removeEventListener("load", done);
            link.removeEventListener("error", failed);
            signal.removeEventListener("abort", done);
          };
          const done = () => {
            cleanup();
            resolve();
          };
          const failed = () => {
            cleanup();
            // A stylesheet failure cannot produce a presentable page.
            reject(new Error("Page stylesheet could not load"));
          };
          link.addEventListener("load", done, { once: true });
          link.addEventListener("error", failed, { once: true });
          signal.addEventListener("abort", done, { once: true });
          if (signal.aborted) done();
          else if (link.dataset.styleState === "error") failed();
          // Chromium can retain a sheet object after a failed request. Only
          // the successful print -> all swap proves this CSS has applied.
          else if (link.media === "all") done();
        }),
    ),
  );
}

const URL_PATTERN = /url\(["']?([^"')]+)["']?\)/g;

function waitForSvgImage(image: SVGImageElement, signal: AbortSignal) {
  const source = svgSource(image);
  if (signal.aborted || settledSvgSources.has(source)) return Promise.resolve();
  const existing = nativeSvgTasks.get(source);
  if (existing) return existing;
  let cancelled = false;
  const pending = new Promise<void>((resolve) => {
    const namespace = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(namespace, "svg");
    const art = document.createElementNS(namespace, "image");
    svg.setAttribute("viewBox", "0 0 1 1");
    svg.setAttribute("aria-hidden", "true");
    svg.setAttribute("data-page-asset-preload", "");
    svg.style.cssText = "position:fixed;left:0;top:0;width:1px;height:1px;opacity:.01;pointer-events:none";
    art.setAttribute("width", "1");
    art.setAttribute("height", "1");
    const crossOrigin = image.getAttribute("crossorigin");
    if (crossOrigin !== null) art.setAttribute("crossorigin", crossOrigin);
    const done = () => {
      art.removeEventListener("load", done);
      art.removeEventListener("error", done);
      signal.removeEventListener("abort", done);
      if (signal.aborted) {
        cancelled = true;
        svg.remove();
        nativeSvgPreloads.delete(svg);
        if (nativeSvgTasks.get(source) === pending) nativeSvgTasks.delete(source);
      } else {
        settledSvgSources.add(source);
      }
      resolve();
    };
    art.addEventListener("load", done, { once: true });
    art.addEventListener("error", done, { once: true });
    signal.addEventListener("abort", done, { once: true });
    // An independent native SVG client loads even while the story keeps its
    // image transparent. Retain it for this route so SVG resources stay warm.
    svg.append(art);
    nativeSvgPreloads.add(svg);
    document.body.append(svg);
    art.setAttribute("href", image.href.baseVal);
    if (signal.aborted) done();
  });
  if (!cancelled) nativeSvgTasks.set(source, pending);
  return pending;
}

async function waitForImage(image: HTMLImageElement, signal: AbortSignal) {
  if (signal.aborted || (!image.src && !image.srcset)) return;
  // Switching lazy -> eager starts a new request. decode() called before that
  // request is ready can reject, which must not be mistaken for a loaded image.
  image.loading = "eager";
  if (!image.complete) {
    await new Promise<void>((resolve) => {
      const done = () => {
        image.removeEventListener("load", done);
        image.removeEventListener("error", done);
        signal.removeEventListener("abort", done);
        resolve();
      };
      image.addEventListener("load", done, { once: true });
      image.addEventListener("error", done, { once: true });
      signal.addEventListener("abort", done, { once: true });
      if (image.complete || signal.aborted) done();
    });
  }
  // A failed URL settles through error; it must not trap the loader forever.
  if (!signal.aborted && image.naturalWidth > 0 && image.decode) {
    await image.decode().catch(() => {});
  }
}

async function waitForAnimation(video: HTMLVideoElement, signal: AbortSignal) {
  if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA || video.error)
    return;
  if (!video.currentSrc && !video.src && !video.querySelector("source[src]"))
    return;
  await new Promise<void>((resolve) => {
    const done = () => {
      video.removeEventListener("loadeddata", done);
      video.removeEventListener("error", done);
      signal.removeEventListener("abort", done);
      resolve();
    };
    video.addEventListener("loadeddata", done, { once: true });
    video.addEventListener("error", done, { once: true });
    signal.addEventListener("abort", done, { once: true });
    video.preload = "auto";
  });
}

async function waitForEmbed(frame: HTMLIFrameElement, signal: AbortSignal) {
  if (signal.aborted || frame.dataset.pageEmbedReady === "true") return;
  await new Promise<void>((resolve) => {
    const done = () => {
      window.clearTimeout(timeout);
      frame.removeEventListener("wiki-embed-ready", done);
      frame.removeEventListener("error", done);
      signal.removeEventListener("abort", done);
      resolve();
    };
    const timeout = window.setTimeout(done, EMBED_WAIT_MS);
    frame.addEventListener("wiki-embed-ready", done, { once: true });
    frame.addEventListener("error", done, { once: true });
    signal.addEventListener("abort", done, { once: true });
    if (signal.aborted || frame.dataset.pageEmbedReady === "true") done();
  });
}

async function pageImagesAndAnimations(
  signal: AbortSignal,
  onProgress: (complete: number, total: number) => void,
  seen: Set<string>,
  preparedElements: WeakMap<Element, string>,
): Promise<void> {
  // Home transfer layers and other React portals mount alongside #root.
  const root = document.body;
  if (!root) return;
  const loader = loaderElement();
  // Article text is usable before its figures arrive. Only figures around the
  // first screen gate the loader; the rest stay lazy and load while reading.
  const article = root.querySelector(".wiki-article");
  const viewport = window.innerHeight;
  const deferred = (element: Element) => {
    if (article?.contains(element)) {
      const rect = element.getBoundingClientRect();
      // Hidden tabs and closed drawers have no boxes.
      if (!element.getClientRects().length) return true;
      return rect.bottom < -viewport * 0.5 || rect.top > viewport * 1.5;
    }
    // The home story mounts every chapter at once. Previously only wiki
    // articles were viewport-gated, so the home page queued all of its scene
    // art behind the loader and raced a 15 s deadline. Gate later chapters
    // too; they load as the playback or the reader approaches them.
    const chapter =
      typeof element.closest === "function"
        ? element.closest(".story-chapter, .home-scene01")
        : null;
    if (!chapter) return false;
    return chapter.getBoundingClientRect().top > viewport * 2;
  };
  const pending: Promise<void>[] = [];
  let complete = 0;
  let scanned = false;
  let count = 0;
  const track = (task: Promise<void>) => {
    pending.push(task.then(() => {
      ++complete;
      if (scanned && !signal.aborted) onProgress(complete, pending.length);
    }));
  };
  const preload = (
    url: string,
    crossOrigin: string | null = null,
    element?: SVGImageElement,
  ) => {
    if (!url || url.startsWith("#") || url.startsWith("data:")) return;
    const key = JSON.stringify([url, crossOrigin]);
    // A new SVG clone can start its own request even when an earlier node
    // used this URL. It needs its own load/decode probe, not the old URL gate.
    if (element
      ? preparedElements.get(element) === key && settledSvgSources.has(key)
      : seen.has(key)) return;
    seen.add(key);
    const image = new Image();
    if (crossOrigin !== null) image.crossOrigin = crossOrigin;
    image.src = url;
    track(Promise.all([
      waitForImage(image, signal),
      ...(element ? [waitForSvgImage(element, signal)] : []),
    ]).then(() => {
      if (element) preparedElements.set(element, key);
    }));
  };

  // React hoists these resource hints into <head>. They include figures in
  // closed drawers, inactive tabs and dialogs that are not in the route DOM.
  for (const link of document.querySelectorAll<HTMLLinkElement>(
    'link[rel="preload"][as="image"]',
  )) {
    preload(link.href, link.crossOrigin);
  }

  // Route heroes and home scenes paint their art as CSS backgrounds.
  for (const element of root.querySelectorAll<HTMLElement>("*:not([data-page-asset-preload], [data-page-asset-preload] *)")) {
    if (signal.aborted) return;
    if (element === loader || loader?.contains(element)) continue;
    if (deferred(element)) continue;
    // Yield during large routes instead of blocking the loader's drawing.
    if (++count % 120 === 0) await new Promise(requestAnimationFrame);
    // Offscreen and initially transparent animation layers belong to this
    // page too. Eager loading avoids waiting forever on a lazy image's decode.
    if (element instanceof HTMLImageElement) {
      const source = () => JSON.stringify([
        element.currentSrc || element.src, element.srcset, element.crossOrigin,
      ]);
      if (!element.complete || preparedElements.get(element) !== source()) {
        track(waitForImage(element, signal).then(() => {
          preparedElements.set(element, source());
        }));
      }
    }
    if (element instanceof SVGImageElement) {
      preload(element.href.baseVal, element.getAttribute("crossorigin"), element);
    }
    if (element instanceof HTMLVideoElement) {
      preload(element.poster);
      if (element.autoplay) track(waitForAnimation(element, signal));
    }
    if (
      element instanceof HTMLIFrameElement &&
      element.hasAttribute("data-page-embed-ready") &&
      !preparedElements.has(element)
    ) {
      preparedElements.set(element, "embed");
      track(waitForEmbed(element, signal));
    }
    for (const pseudo of [null, "::before", "::after"]) {
      const style = getComputedStyle(element, pseudo);
      for (const value of [
        style.backgroundImage,
        style.maskImage,
        style.borderImageSource,
        style.listStyleImage,
        style.content,
      ]) {
        for (const [, url] of value.matchAll(URL_PATTERN)) preload(url);
      }
    }
  }

  scanned = true;
  if (!signal.aborted && pending.length) onProgress(complete, pending.length);
  await Promise.all(pending);
}
