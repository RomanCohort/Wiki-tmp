import {
  scrollReaderToId,
  scrollReaderToTarget,
} from "../../../../utils/scrollReaderToTarget";
import "../../../../styles/features/image-anchor-map.css";

interface ImageAnchorRegion {
  target: string;
  label: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

/** Image coordinates stay aligned as the figure scales to its reader column. */
export function ImageAnchorMap({
  src,
  alt,
  width,
  height,
  regions,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  regions: readonly ImageAnchorRegion[];
}) {
  return (
    <div className="image-anchor-map">
      <img src={src} alt={alt} width={width} height={height} />
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="image-anchor-map__links"
        role="group"
        aria-label="Jump to a module"
      >
        {regions.map((region) => (
          <a
            key={region.target}
            href={`#${region.target}`}
            aria-label={region.label}
            tabIndex={0}
            onFocus={(event) => {
              const link = event.currentTarget;
              if (!link.matches(":focus-visible")) return;
              // Mobile browsers can scroll SVG links to the wrong coordinates.
              // Correct their native focus scroll after it has finished.
              requestAnimationFrame(() => {
                if (document.activeElement !== link) return;
                const range = document.createRange();
                range.selectNode(link);
                const inner = link
                  .closest(".wiki-page")
                  ?.querySelector<HTMLElement>(".route-frame__scroll");
                scrollReaderToTarget(range, inner, "instant", { block: "center" });
              });
            }}
            onClick={(event) => {
              event.preventDefault();
              scrollReaderToId(region.target, event.currentTarget);
              const heading = document.getElementById(region.target);
              if (heading) {
                heading.tabIndex = -1;
                heading.focus({ preventScroll: true });
              }
            }}
          >
            <title>{region.label}</title>
            <rect
              x={region.x}
              y={region.y}
              width={region.width}
              height={region.height}
              rx={8}
              vectorEffect="non-scaling-stroke"
            />
          </a>
        ))}
      </svg>
    </div>
  );
}
