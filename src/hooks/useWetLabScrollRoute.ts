import { useEffect, type RefObject } from "react";
import { readerTrackStart } from "../utils";

/**
 * Makes the document the single scroll source for reader routes. The article
 * viewport remains visually pinned; its scrollTop is only a projection of the
 * document position. This avoids the feedback loop caused by syncing both
 * scrollTop and window.scrollY in response to one gesture.
 */
export function useWetLabScrollRoute(
  enabled: boolean,
  interfaceRef: RefObject<HTMLElement | null>,
  innerRef: RefObject<HTMLElement | null>,
  options: { rootClass?: string } = {},
) {
  useEffect(() => {
    if (!enabled) return;
    const frame = interfaceRef.current;
    const inner = innerRef.current;
    const track = frame?.parentElement;
    if (!frame || !inner || !track) return;

    const root = document.documentElement;
    const rootClass = options.rootClass ?? "has-wet-lab-scroll-route";
    root.classList.add(rootClass);

    let start = 0;
    let extra = 0;
    let raf = 0;

    const refresh = () => {
      extra = Math.max(0, inner.scrollHeight - inner.clientHeight);
      track.style.setProperty("--reader-scroll-extra", `${extra}px`);
      start = readerTrackStart(track);
      sync();
    };

    const sync = () => {
      raf = 0;
      if (extra <= 0) return;
      const next = Math.max(0, Math.min(extra, window.scrollY - start));
      if (Math.abs(inner.scrollTop - next) > 0.5) inner.scrollTop = next;
    };

    const requestSync = () => {
      if (!raf) raf = requestAnimationFrame(sync);
    };

    const onKeyDown = (event: KeyboardEvent) => {
      const keys = new Set(["ArrowDown", "ArrowUp", "PageDown", "PageUp", " ", "Home", "End"]);
      if (!keys.has(event.key)) return;
      // The inner viewport is intentionally non-scrollable. Route keyboard
      // input to the same document timeline as wheel and touch input.
      event.preventDefault();
      const amount = event.key === "Home" ? -window.scrollY : event.key === "End" ? document.documentElement.scrollHeight : event.key === "PageDown" || event.key === " " ? window.innerHeight * 0.9 : event.key === "PageUp" ? -window.innerHeight * 0.9 : event.key === "ArrowDown" ? 80 : -80;
      window.scrollBy({ top: amount, behavior: "auto" });
    };

    const resizeObserver = new ResizeObserver(refresh);
    resizeObserver.observe(track);
    resizeObserver.observe(frame);
    resizeObserver.observe(inner);
    // `inner` has a fixed height, so it never reports content growth. Watch
    // the article itself so lazy images, opened accordions and late feature
    // renders extend the timeline instead of cutting off the page's tail.
    Array.from(inner.children).forEach((child) => resizeObserver.observe(child));
    window.addEventListener("scroll", requestSync, { passive: true });
    window.addEventListener("resize", refresh, { passive: true });
    inner.addEventListener("keydown", onKeyDown);

    refresh();

    return () => {
      if (raf) cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      window.removeEventListener("scroll", requestSync);
      window.removeEventListener("resize", refresh);
      inner.removeEventListener("keydown", onKeyDown);
      root.classList.remove(rootClass);
    };
  }, [enabled, interfaceRef, innerRef, options.rootClass]);
}
