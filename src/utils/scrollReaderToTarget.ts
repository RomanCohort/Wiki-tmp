/**
 * Document scrollY at which the reader mat pins. The mat is `position: sticky`
 * with `top: var(--header-height)`, so it pins when the track's top reaches the
 * header's bottom edge — not the viewport top. Using the raw track top shifted
 * the whole projection by one header height (the frame idled for the first
 * 78px and the last 78px of the article were never reached).
 */
export function readerTrackStart(track: HTMLElement) {
  const mat = track.firstElementChild as HTMLElement | null;
  const pinTop = mat ? Number.parseFloat(getComputedStyle(mat).top) || 0 : 0;
  return track.getBoundingClientRect().top + window.scrollY - pinTop;
}

/**
 * Scroll a reader-route section into the single DOCUMENT timeline.
 *
 * Reader frames stay pinned while the document owns the scroll and projects
 * its position onto the frame's inner container, so scrolling the inner
 * container directly desyncs it from the document (wrong scrollbar position,
 * hidden Back-to-Top, snap-back on the next wheel gesture). Convert the
 * target's in-frame offset into a document position instead.
 */
export function scrollReaderToTarget(
  target: HTMLElement | Range,
  inner: HTMLElement | null | undefined,
  behavior: ScrollBehavior = "instant",
  options: { block?: ScrollLogicalPosition } = {},
) {
  const track = inner?.closest<HTMLElement>(".wiki-reader-track");
  // Scroll-driven panels can occupy one viewport while owning different
  // reading positions. Their calibrated targets remain valid for deep links.
  const declaredTop =
    target instanceof HTMLElement ? target.dataset.readerScrollTop : undefined;
  if (declaredTop !== undefined && Number.isFinite(Number(declaredTop))) {
    const position = Number(declaredTop);
    const projected =
      inner && track && getComputedStyle(inner).overflowY === "hidden";
    if (projected && behavior !== "smooth") inner.scrollTop = position;
    window.scrollTo({
      top: projected ? readerTrackStart(track) + position : position,
      behavior,
    });
    return;
  }
  if (!inner || !track || getComputedStyle(inner).overflowY !== "hidden") {
    if (target instanceof Range) {
      const bounds = target.getBoundingClientRect();
      const offset =
        options.block === "center"
          ? (window.innerHeight - bounds.height) / 2
          : 32;
      window.scrollTo({
        top: window.scrollY + bounds.top - offset,
        behavior,
      });
    } else {
      target.scrollIntoView({ behavior, block: options.block ?? "start" });
    }
    return;
  }

  const trackStart = readerTrackStart(track);
  const innerBounds = inner.getBoundingClientRect();
  const targetBounds = target.getBoundingClientRect();
  const targetOffset =
    options.block === "center"
      ? (inner.clientHeight - targetBounds.height) / 2
      : 32;
  const innerTop =
    inner.scrollTop + targetBounds.top - innerBounds.top - targetOffset;
  const targetScrollTop = Math.max(0, innerTop);
  if (behavior !== "smooth") {
    inner.scrollTop = targetScrollTop;
  }
  window.scrollTo({ top: trackStart + targetScrollTop, behavior });
}

/**
 * Jump to an element id from any control inside a reader route (feature
 * panels, portalled rails). Resolves the page's reader frame from `from`.
 */
export function scrollReaderToId(
  id: string,
  from: Element,
  behavior: ScrollBehavior = "instant",
) {
  const target = document.getElementById(id);
  if (!target) return;
  const inner = from
    .closest(".wiki-page")
    ?.querySelector<HTMLElement>(".route-frame__scroll");
  scrollReaderToTarget(target, inner, behavior);
  window.history.replaceState(window.history.state, "", `#${id}`);
}
