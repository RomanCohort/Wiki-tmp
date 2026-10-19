import { useId } from "react";

export interface WatercolorCircleProps {
  cx: number;
  cy: number;
  radius: number;
  tone?: string;
  seed?: number;
  active?: boolean;
  className?: string;
}

/** Transparent pigment, uneven edges, and a fine wash rather than stacked discs. */
export function WatercolorCircle({
  cx,
  cy,
  radius,
  tone,
  seed = 8,
  active = false,
  className = "wiki-watercolor",
}: WatercolorCircleProps) {
  const id = useId();
  const pigment = "var(--watercolor-color, var(--orbit-color, currentColor))";
  return (
    <g
      className={`${className}${active ? " is-active" : ""}`}
      data-orbit-tone={tone}
    >
      <defs>
        <radialGradient id={`${id}-pigment`} cx="42%" cy="38%" r="65%">
          <stop offset="0" stopColor={pigment} stopOpacity="0.1" />
          <stop offset="0.55" stopColor={pigment} stopOpacity="0.23" />
          <stop offset="0.83" stopColor={pigment} stopOpacity="0.35" />
          <stop offset="0.96" stopColor={pigment} stopOpacity="0.17" />
          <stop offset="1" stopColor={pigment} stopOpacity="0" />
        </radialGradient>
        <filter
          id={`${id}-wash`}
          x="-10%"
          y="-10%"
          width="120%"
          height="120%"
          colorInterpolationFilters="sRGB"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.035"
            numOctaves="3"
            seed={seed}
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale={radius * 0.065}
            xChannelSelector="R"
            yChannelSelector="G"
            result="edge"
          />
          <feColorMatrix
            in="noise"
            type="matrix"
            values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0.9 0 0.35"
            result="paper"
          />
          <feComposite in="edge" in2="paper" operator="in" />
        </filter>
      </defs>
      <circle
        cx={cx}
        cy={cy}
        r={radius}
        fill={`url(#${id}-pigment)`}
        filter={`url(#${id}-wash)`}
      />
      <circle
        className={`${className}__edge`}
        cx={cx}
        cy={cy}
        r={radius * 0.96}
        fill="none"
        filter={`url(#${id}-wash)`}
      />
    </g>
  );
}
