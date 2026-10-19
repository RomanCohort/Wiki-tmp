import { useId, useRef, useState, type KeyboardEvent } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { renderInlineFormatting } from "../../proseInline";
import type { WikiContentBlock } from "../../wikiPageTypes";
import "../../../../styles/features/manuscript-figure-gallery.css";

/** Author-supplied figure groups, with one caption per image and no autoplay. */
export function ManuscriptFigureGallery({
  id,
  title,
  entries,
}: {
  id: string;
  title: string;
  entries: {
    title: string;
    figure: Extract<WikiContentBlock, { type: "figure" }>;
  }[];
}) {
  const uid = useId();
  const [selected, setSelected] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const touch = useRef<{ x: number; y: number } | null>(null);
  const move = (delta: number) =>
    setSelected((value) => (value + delta + entries.length) % entries.length);
  const keyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next: number;
    if (event.key === "ArrowRight") next = (index + 1) % entries.length;
    else if (event.key === "ArrowLeft")
      next = (index - 1 + entries.length) % entries.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = entries.length - 1;
    else return;
    event.preventDefault();
    setSelected(next);
    tabs.current[next]?.focus();
  };

  return (
    <div
      className="manuscript-figure-gallery"
      id={id}
      role="region"
      aria-label={title}
    >
      <div className="manuscript-figure-gallery__controls">
        <button
          type="button"
          onClick={() => move(-1)}
          aria-label="Previous figure"
        >
          <ChevronLeft size={18} />
        </button>
        <div
          className="manuscript-figure-gallery__tabs"
          role="tablist"
          aria-label={title}
        >
          {entries.map((entry, index) => (
            <button
              key={entry.title}
              ref={(element) => {
                tabs.current[index] = element;
              }}
              type="button"
              role="tab"
              id={`${uid}-tab-${index}`}
              aria-controls={`${uid}-slide-${index}`}
              aria-selected={selected === index}
              tabIndex={selected === index ? 0 : -1}
              onClick={() => setSelected(index)}
              onKeyDown={(event) => keyDown(event, index)}
            >
              {entry.title}
            </button>
          ))}
        </div>
        <span className="manuscript-figure-gallery__count" aria-live="polite">
          {selected + 1} / {entries.length}
        </span>
        <button type="button" onClick={() => move(1)} aria-label="Next figure">
          <ChevronRight size={18} />
        </button>
      </div>
      <div
        className="manuscript-figure-gallery__slides"
        onTouchStart={(event) => {
          const point = event.touches[0];
          touch.current = { x: point.clientX, y: point.clientY };
        }}
        onTouchEnd={(event) => {
          const start = touch.current;
          touch.current = null;
          if (!start) return;
          const end = event.changedTouches[0];
          const dx = end.clientX - start.x;
          if (
            Math.abs(dx) > 48 &&
            Math.abs(dx) > Math.abs(end.clientY - start.y)
          )
            move(dx < 0 ? 1 : -1);
        }}
      >
        {entries.map(({ figure }, index) => (
          <div
            className="manuscript-figure-gallery__slide"
            key={figure.src}
            role="tabpanel"
            id={`${uid}-slide-${index}`}
            aria-labelledby={`${uid}-tab-${index}`}
            hidden={selected !== index}
            tabIndex={0}
          >
            <figure className="wiki-figure wiki-figure--labelled">
              <a
                href={figure.src}
                target="_blank"
                rel="noreferrer"
                aria-label={`Open ${figure.figureLabel}`}
              >
                <img
                  src={figure.src}
                  alt={figure.alt}
                  width={figure.width}
                  height={figure.height}
                  loading="lazy"
                  decoding="async"
                />
              </a>
              <figcaption>
                <span className="wiki-figure__label">{figure.figureLabel}</span>
                <span className="wiki-figure__caption">
                  {renderInlineFormatting(figure.caption ?? "")}
                </span>
              </figcaption>
            </figure>
          </div>
        ))}
      </div>
    </div>
  );
}
