import { useEffect, useId, useRef } from "react";
import { updateWardInfusionTube } from "../../hooks/wardInfusionGeometry";

export function WardInfusionTube() {
  const id = useId();
  const original = useRef<SVGSVGElement>(null);
  useEffect(() => {
    const visual = original.current?.closest<HTMLElement>(".story-visual");
    if (!visual) return;
    const update = () => updateWardInfusionTube(visual);
    const observer = new ResizeObserver(update);
    observer.observe(visual);
    visual.querySelectorAll<HTMLImageElement>("img").forEach((image) => {
      observer.observe(image);
      image.addEventListener("load", update);
    });
    update();
    return () => {
      observer.disconnect();
      visual.querySelectorAll("img").forEach((image) => image.removeEventListener("load", update));
    };
  }, []);

  return (
    <>
      {(["original-2", "patient"] as const).map((name) => (
        <svg
          key={name}
          ref={name === "original-2" ? original : undefined}
          className={`story-ward-infusion ${name === "original-2" ? "story-ward-original--2" : "story-ward-change story-ward-infusion--changed"}`}
          data-ward-tube={name}
          aria-hidden="true"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id={`${id}-${name}-blend`} gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="black" />
              <stop offset="1" stopColor="white" />
            </linearGradient>
            <mask id={`${id}-${name}-join`} maskUnits="userSpaceOnUse" x="-100%" y="-100%" width="300%" height="300%">
              <rect x="-100%" y="-100%" width="300%" height="300%" fill={`url(#${id}-${name}-blend)`} />
            </mask>
          </defs>
          <g mask={`url(#${id}-${name}-join)`}>
            <path className="story-ward-infusion-edge" />
            <path className="story-ward-infusion-core" />
            <path className="story-ward-infusion-light" />
          </g>
        </svg>
      ))}
    </>
  );
}
