import { useEffect, useRef, useState } from "react";

const clamp = (value: number) => Math.max(0, Math.min(1, value));
const smoothstep = (value: number) => value * value * (3 - 2 * value);

/** Native scrolling holds the photograph, turns it, then rests on the note. */
export function useFooterPhotoTurn() {
  const stageRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [flipped, setFlipped] = useState(false);
  const [staticView, setStaticView] = useState(false);

  useEffect(() => {
    const stage = stageRef.current;
    const pin = pinRef.current;
    const card = cardRef.current;
    if (!stage || !pin || !card) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const forcedColors = window.matchMedia("(forced-colors: active)");
    let frame = 0;
    let nearby = false;
    let lastFlipped = false;

    const paint = () => {
      frame = 0;
      if (reduced.matches || forcedColors.matches) return;
      // Home's earlier scroll scenes can change their height after loading.
      // Read the live geometry rather than caching a document offset.
      const rect = stage.getBoundingClientRect();
      const pinTop = Number.parseFloat(getComputedStyle(pin).top) || 0;
      const stageStyle = getComputedStyle(stage);
      const paddingTop = Number.parseFloat(stageStyle.paddingTop) || 0;
      // The last frame must be reachable at the real document end, even when
      // the mobile postcard is shorter than the viewport.
      const travel = Math.max(
        1,
        stage.offsetHeight - window.innerHeight - paddingTop + pinTop,
      );
      const progress = clamp((pinTop - rect.top - paddingTop) / travel);
      // Match the reference footer's 1.3 -> 1 image scale as it enters.
      const entry = clamp(
        (window.innerHeight - rect.top - paddingTop) /
          (window.innerHeight * 0.8),
      );
      card.style.setProperty(
        "--keepsake-image-scale",
        String(1.3 - entry * 0.3),
      );
      // Leave a quiet interval before the first turn and after it finishes.
      const turn = clamp((progress - 0.24) / 0.5);
      const easedTurn = smoothstep(turn);
      const nextFlipped = turn > 0.5;
      card.style.setProperty("--keepsake-turn", `${easedTurn * 180}deg`);
      card.style.setProperty(
        "--keepsake-turn-scale",
        String(1 - 0.06 * Math.sin(turn * Math.PI)),
      );
      if (nextFlipped !== lastFlipped) {
        lastFlipped = nextFlipped;
        setFlipped(nextFlipped);
      }
    };
    const schedulePaint = () => {
      if (nearby && !frame) frame = window.requestAnimationFrame(paint);
    };
    const syncPreference = () => {
      const showStatic = reduced.matches || forcedColors.matches;
      setStaticView(showStatic);
      if (showStatic) {
        card.style.removeProperty("--keepsake-turn");
        card.style.removeProperty("--keepsake-turn-scale");
        card.style.removeProperty("--keepsake-image-scale");
        lastFlipped = false;
        setFlipped(false);
      } else paint();
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        nearby = entry.isIntersecting;
        if (nearby) paint();
      },
      { rootMargin: "100% 0px" },
    );
    const resize = new ResizeObserver(() => paint());
    observer.observe(stage);
    resize.observe(pin);
    window.addEventListener("scroll", schedulePaint, { passive: true });
    window.addEventListener("resize", schedulePaint);
    reduced.addEventListener("change", syncPreference);
    forcedColors.addEventListener("change", syncPreference);
    syncPreference();
    return () => {
      observer.disconnect();
      resize.disconnect();
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedulePaint);
      window.removeEventListener("resize", schedulePaint);
      reduced.removeEventListener("change", syncPreference);
      forcedColors.removeEventListener("change", syncPreference);
    };
  }, []);

  return { stageRef, pinRef, cardRef, flipped, staticView };
}
