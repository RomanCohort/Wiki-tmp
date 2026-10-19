import { useEffect, useRef, useState, type CSSProperties } from "react";
import type { StakeholderPhoto } from "../../../../../data/engagement/sustainability/sustainabilityPhotos";

/** Advance every 1.2 seconds, with a short fade at each change. */
const DWELL = 1.2;
const FADE = 0.4;

export function StakeholderPhotoReel({
  photos,
  label,
  paused = false,
}: {
  photos: ReadonlyArray<StakeholderPhoto>;
  label: string;
  /** Pause a page reel while its expanded gallery is open or its deck is inactive. */
  paused?: boolean;
}) {
  const ref = useRef<HTMLElement>(null);
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const [pageVisible, setPageVisible] = useState(!document.hidden);
  const [motionAllowed, setMotionAllowed] = useState(
    () => !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const count = photos.length;
  const running =
    visible && pageVisible && motionAllowed && !paused && count > 1;

  useEffect(() => {
    if (!running) return;
    const timer = window.setTimeout(
      () => setIndex((i) => (i + 1) % count),
      DWELL * 1000,
    );
    return () => window.clearTimeout(timer);
  }, [index, running, count]);

  useEffect(() => {
    const onVisibility = () => setPageVisible(!document.hidden);
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onMotionChange = () => setMotionAllowed(!motionQuery.matches);
    document.addEventListener("visibilitychange", onVisibility);
    motionQuery.addEventListener("change", onMotionChange);
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.15 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      motionQuery.removeEventListener("change", onMotionChange);
    };
  }, []);

  if (!count) return null;

  return (
    <figure
      ref={ref}
      className={`sust-stake-reel${count === 1 ? " sust-stake-reel--single" : ""}`}
      aria-label={`${label} — engagement photographs`}
      style={
        {
          "--reel-fade": `${FADE}s`,
        } as CSSProperties
      }
    >
      <div className="sust-stake-reel__media">
        {count > 1 ? (
          <button
            className="sust-stake-reel__arrow sust-stake-reel__arrow--previous"
            type="button"
            aria-label="Previous photograph"
            onClick={() => setIndex((i) => (i - 1 + count) % count)}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="m14 5-7 7 7 7" />
            </svg>
          </button>
        ) : null}
        <div className="sust-stake-reel__frame">
          {photos.map((photo, i) => (
            <img
              key={photo.src}
              src={photo.src}
              alt={i === index ? photo.alt : ""}
              aria-hidden={i !== index}
              className="sust-stake-reel__img"
              data-active={i === index || undefined}
              loading="eager"
              decoding="async"
              draggable={false}
            />
          ))}
        </div>
        {count > 1 ? (
          <button
            className="sust-stake-reel__arrow sust-stake-reel__arrow--next"
            type="button"
            aria-label="Next photograph"
            onClick={() => setIndex((i) => (i + 1) % count)}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="m10 5 7 7-7 7" />
            </svg>
          </button>
        ) : null}
      </div>
      <figcaption className="sust-stake-reel__caption" aria-live="off">
        {photos.map((photo, i) => (
          <span
            key={photo.src}
            className="sust-stake-reel__caption-text"
            data-current={i === index || undefined}
            aria-hidden={i !== index}
          >
            {photo.caption}
          </span>
        ))}
      </figcaption>
    </figure>
  );
}
