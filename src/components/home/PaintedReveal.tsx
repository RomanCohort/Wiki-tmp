import { useId, type CSSProperties } from "react";

type PaintedRevealProps = {
  src: string;
  kind: "ring" | "arrow" | "platform";
  number: number;
  style: CSSProperties;
};

// Reveal the original pixels through a stroke; no replacement artwork is painted.
export function PaintedReveal({
  src,
  kind,
  number,
  style,
}: PaintedRevealProps) {
  const id = useId().replace(/:/g, "");
  const maskId = `painted-${id}`;
  return (
    <svg
      className={`story-layer story-layer--reveal story-painted story-painted--${kind}`}
      data-layer={number}
      style={style}
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <mask
          id={maskId}
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="100"
          height="100"
        >
          {kind === "ring" && (
            <circle
              className="story-paint-stroke"
              cx="50"
              cy="50"
              r="42"
              fill="none"
              stroke="white"
              strokeWidth="27"
              pathLength="1"
              transform="rotate(-90 50 50)"
            />
          )}
          {kind === "arrow" && (
            <path
              className="story-paint-stroke"
              d="M 2 76 Q 43 -3 93 51"
              fill="none"
              stroke="white"
              strokeWidth="62"
              strokeLinecap="round"
              pathLength="1"
            />
          )}
          {kind === "platform" && (
            <>
              <ellipse
                className="story-paint-core"
                cx="50"
                cy="50"
                rx="13"
                ry="23"
                fill="white"
              />
              <path
                className="story-paint-ray"
                d="M 38 50 H 0"
                fill="none"
                stroke="white"
                strokeWidth="8"
                pathLength="1"
              />
              <path
                className="story-paint-ray"
                d="M 50 29 V 0"
                fill="none"
                stroke="white"
                strokeWidth="8"
                pathLength="1"
              />
              <path
                className="story-paint-ray"
                d="M 62 50 H 100"
                fill="none"
                stroke="white"
                strokeWidth="8"
                pathLength="1"
              />
              <path
                className="story-paint-ray"
                d="M 50 71 V 100"
                fill="none"
                stroke="white"
                strokeWidth="8"
                pathLength="1"
              />
            </>
          )}
          <rect
            className="story-paint-complete"
            width="100"
            height="100"
            fill="white"
          />
        </mask>
      </defs>
      <image
        href={src}
        width="100"
        height="100"
        preserveAspectRatio="none"
        mask={`url(#${maskId})`}
      />
    </svg>
  );
}
