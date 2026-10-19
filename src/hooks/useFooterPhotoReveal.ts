import { useEffect, useRef } from "react";

const clamp = (value: number) => Math.max(0, Math.min(1, value));

/** Match the reference window: p = (viewport - top) / window height. */
export function useFooterPhotoReveal() {
  const stageRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    const card = cardRef.current;
    if (!stage || !card) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let nearby = false;
    let height = stage.getBoundingClientRect().height;

    const paint = () => {
      frame = 0;
      const top = stage.getBoundingClientRect().top;
      const progress = clamp((window.innerHeight - top) / Math.max(1, height));
      card.style.transform = `scale(${reduced.matches ? 1 : 1.3 - progress * 0.3})`;
    };
    const schedule = () => {
      if (nearby && !frame) frame = window.requestAnimationFrame(paint);
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        nearby = entry.isIntersecting;
        // Refresh at both boundaries so a fast End/Home jump is reversible.
        paint();
      },
      { rootMargin: "100% 0px" },
    );
    const resize = new ResizeObserver(() => {
      height = stage.getBoundingClientRect().height;
      paint();
    });
    observer.observe(stage);
    resize.observe(stage);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    reduced.addEventListener("change", paint);
    paint();
    return () => {
      observer.disconnect();
      resize.disconnect();
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      reduced.removeEventListener("change", paint);
    };
  }, []);

  return { stageRef, cardRef };
}
