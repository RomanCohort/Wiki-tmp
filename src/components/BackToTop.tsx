import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { HOME_INTRO_REPLAY_EVENT } from "../utils/homeIntro";

const backToTopImage =
  "https://static.igem.wiki/teams/6056/wiki/files/pages/shared/back-to-top-girl.avif";

// ReactBits Magnet defaults (https://www.reactbits.dev/animations/magnet):
// padding activates the pull this far around the button; the cursor offset is
// divided by the strength (higher = subtler pull).
const MAGNET_PADDING = 100;
const MAGNET_STRENGTH = 6;

export function BackToTop() {
  const { pathname } = useLocation();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const magnetRef = useRef<HTMLSpanElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isLaunching, setIsLaunching] = useState(false);
  const topLabel = pathname === "/" ? "Return to CirCure title" : "Return to top";

  useEffect(() => {
    setIsLaunching(false);
  }, [pathname]);

  // Every reader route (Wet Lab / Project / Dry Lab / Engagement) scrolls the
  // document through its full article via the unified document timeline, so a
  // single threshold covers all pages: the reader hero is exactly 100dvh, and
  // the button fades in as the article takes over.
  useEffect(() => {
    let frame = 0;

    const updateVisibility = () => {
      frame = 0;
      const threshold = Math.max(420, window.innerHeight * 0.72);
      const nextVisible = window.scrollY > threshold;
      setIsVisible((current) =>
        current === nextVisible ? current : nextVisible,
      );
    };

    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateVisibility);
    };

    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate, { passive: true });
    requestUpdate();

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, [pathname]);

  // Magnet pull: a window-level proximity check against the stationary button
  // box. The inner magnet layer is the only translated element, so its
  // transform never fights the launch keyframes (which live one level deeper).
  useEffect(() => {
    if (!isVisible || isLaunching) return;
    const finePointer = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    ).matches;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (!finePointer || reducedMotion) return;

    const resetMagnet = () => {
      const magnet = magnetRef.current;
      if (magnet) {
        magnet.dataset.magnet = "false";
        magnet.style.transform = "translate3d(0, 0, 0)";
      }
    };

    const handleMouseMove = (event: MouseEvent) => {
      const button = buttonRef.current;
      const magnet = magnetRef.current;
      if (!button || !magnet) return;

      const rect = button.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const withinX =
        Math.abs(event.clientX - centerX) < rect.width / 2 + MAGNET_PADDING;
      const withinY =
        Math.abs(event.clientY - centerY) < rect.height / 2 + MAGNET_PADDING;

      if (withinX && withinY) {
        magnet.dataset.magnet = "true";
        magnet.style.transform = `translate3d(${(event.clientX - centerX) / MAGNET_STRENGTH}px, ${(event.clientY - centerY) / MAGNET_STRENGTH}px, 0)`;
      } else {
        resetMagnet();
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      resetMagnet();
    };
  }, [isVisible, isLaunching]);

  // Scroll-up tween via standard requestAnimationFrame (720ms quad ease-in-out).
  // Dependency-free and aligned with the launch animation lifecycle.
  useEffect(() => {
    if (!isLaunching) return;

    const startY = window.scrollY;
    const duration = 720;
    const startTime = performance.now();
    let animFrame = 0;

    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      // Quad ease-in-out (power2.inOut equivalent)
      const ease =
        progress < 0.5
          ? 2 * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 2) / 2;

      window.scrollTo({
        top: Math.round(startY * (1 - ease)),
        behavior: "instant",
      });

      if (progress < 1) {
        animFrame = window.requestAnimationFrame(step);
      } else {
        window.scrollTo({ top: 0, behavior: "instant" });
        if (pathname === "/") {
          window.dispatchEvent(new Event(HOME_INTRO_REPLAY_EVENT));
        }
        setIsLaunching(false);
      }
    };

    animFrame = window.requestAnimationFrame(step);

    return () => {
      if (animFrame) window.cancelAnimationFrame(animFrame);
    };
  }, [isLaunching, pathname]);

  const returnToTop = () => {
    if (isLaunching) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reducedMotion) {
      window.scrollTo({ top: 0, behavior: "instant" });
      if (pathname === "/") {
        window.dispatchEvent(new Event(HOME_INTRO_REPLAY_EVENT));
      }
    } else {
      setIsLaunching(true);
    }
  };

  return (
    <button
      ref={buttonRef}
      className={`circure-back-to-top${isVisible || isLaunching ? " is-visible" : ""}${isLaunching ? " is-launching" : ""}`}
      type="button"
      onClick={returnToTop}
      disabled={isLaunching}
      aria-label={topLabel}
      aria-hidden={!isVisible && !isLaunching}
      tabIndex={isVisible && !isLaunching ? 0 : -1}
      title={topLabel}
    >
      <span
        ref={magnetRef}
        className="circure-back-to-top__magnet"
        aria-hidden="true"
      >
        <span className="circure-back-to-top__artwork">
          <img src={backToTopImage} alt="" draggable={false} />
        </span>
      </span>
    </button>
  );
}
