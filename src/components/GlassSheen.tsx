import { useId } from "react";
import "../styles/glass-sheen.css";

/** Refract the illustration itself through a narrow moving facet. */
export function GlassSheen({
  src,
  className = "",
}: {
  src: string;
  className?: string;
}) {
  const id = `glass-sheen-${useId().replace(/:/g, "")}`;
  return (
    <span className={`glass-sheen ${className}`} aria-hidden="true">
      <svg viewBox="0 0 100 100" focusable="false">
        <defs>
          <filter
            id={id}
            x="-5%"
            y="-5%"
            width="110%"
            height="110%"
            colorInterpolationFilters="sRGB"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.018 0.025"
              numOctaves="1"
              seed="8"
              result="curvature"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="curvature"
              scale="5"
              xChannelSelector="R"
              yChannelSelector="G"
              result="lens"
            />
            <feColorMatrix
              in="lens"
              type="matrix"
              values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0"
              result="red"
            />
            <feOffset in="red" dx="0.45" dy="0.15" result="redEdge" />
            <feColorMatrix
              in="lens"
              type="matrix"
              values="0 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0"
              result="cyan"
            />
            <feBlend in="redEdge" in2="cyan" mode="screen" />
          </filter>
        </defs>
        <image href={src} width="100" height="100" filter={`url(#${id})`} />
      </svg>
      <span
        className="glass-sheen__light"
        style={{ maskImage: `url(${src})`, WebkitMaskImage: `url(${src})` }}
      />
    </span>
  );
}
