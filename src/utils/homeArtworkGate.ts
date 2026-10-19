type ArtworkElement = HTMLImageElement | SVGImageElement;

function sourceOf(element: ArtworkElement) {
  return element instanceof HTMLImageElement
    ? element.currentSrc || element.src
    : element.href.baseVal;
}

/** Some Android WebViews cannot decode AVIF and render a broken-image icon.
 * Retry the same asset as WebP (both live on static.igem.wiki). There is no
 * placeholder art: a blurred stand-in read as a broken page, so layers load
 * their real files directly. */
export function installHomeArtworkGate(root: HTMLElement) {
  const retried = new WeakSet<Element>();

  const swap = (element: Element) => {
    if (retried.has(element)) return;
    if (
      !(element instanceof HTMLImageElement) &&
      !(element instanceof SVGImageElement)
    )
      return;
    const url = sourceOf(element);
    if (!url.endsWith(".avif")) return;
    retried.add(element);
    element.setAttribute("data-avif-fallback", "");
    const webp = url.replace(/\.avif$/, ".webp");
    if (element instanceof HTMLImageElement) element.src = webp;
    else element.setAttribute("href", webp);
  };

  // Every AVIF on the home page has a WebP twin. Loading WebP unconditionally
  // avoids depending on decode-failure events, which older WebViews can miss.
  const repairBroken = () => {
    for (const element of document.querySelectorAll("img, image")) swap(element);
  };

  const fallbackToWebp = (event: Event) => {
    if (event.target instanceof Element) swap(event.target);
  };

  // Image error events do not bubble; capture them at the document level so
  // every home layer is covered, including ones mounted outside `root`.
  document.addEventListener("error", fallbackToWebp, true);
  repairBroken();
  const owner = root.ownerDocument ?? document;
  const observer = new MutationObserver(repairBroken);
  observer.observe(owner.body, { childList: true, subtree: true });
  return () => {
    document.removeEventListener("error", fallbackToWebp, true);
    observer.disconnect();
  };
}
