import { useEffect, useRef, type CSSProperties } from "react";
import { FOOTER_SPONSORS, FOOTER_SUPPORTERS } from "../data/footer";

/** Colour supporters lead; a single grey ribbon loops beneath them. */
export function FooterSponsors() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    const group = track?.querySelector("ul");
    if (!track || !group) return;

    // Keep an even 18px/s drift as responsive logo widths and gaps change.
    const updateLoop = (entries?: ResizeObserverEntry[]) => {
      // Measure the layout box, preserving subpixels and ignoring story transforms.
      const width =
        entries?.[0]?.borderBoxSize[0]?.inlineSize ?? group.offsetWidth;
      if (width <= 0) return;
      track.style.setProperty("--sponsor-loop-offset", `${-width}px`);
      track.style.setProperty("--sponsor-loop-duration", `${width / 18}s`);
    };

    updateLoop();
    const observer = new ResizeObserver(updateLoop);
    observer.observe(group);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      className="circure-footer__thanks"
      aria-labelledby="footer-supporters-title"
    >
      <h2 id="footer-supporters-title">With thanks</h2>
      <ul className="circure-footer__supporter-list">
        {FOOTER_SUPPORTERS.map((organisation) => (
          <li className="circure-footer__supporter" key={organisation.name}>
            {organisation.marks.map((mark) => (
              <img
                key={mark.src}
                src={mark.src}
                alt={mark.alt}
                width={mark.width}
                height={mark.width}
                loading="lazy"
                decoding="async"
                draggable={false}
              />
            ))}
          </li>
        ))}
      </ul>
      <div className="circure-footer__marquee">
        <div className="circure-footer__marquee-track" ref={trackRef}>
          {/* Three sets cover the widest viewport even with compact spacing. */}
          {[0, 1, 2].map((copyIndex) => (
            <ul
              className="circure-footer__sponsor-list"
              aria-label={copyIndex === 0 ? "Acknowledgements" : undefined}
              aria-hidden={copyIndex > 0 || undefined}
              tabIndex={copyIndex === 0 ? 0 : undefined}
              key={copyIndex}
            >
              {FOOTER_SPONSORS.map((organisation) => (
                <li
                  className="circure-footer__sponsor"
                  data-organisation={organisation.name}
                  key={organisation.name}
                  style={
                    {
                      "--sponsor-logo-width": `${organisation.marks[0].width}px`,
                    } as CSSProperties
                  }
                >
                  {organisation.marks.map((mark) => (
                    <img
                      key={mark.src}
                      src={mark.src}
                      alt={mark.alt}
                      width={mark.width}
                      loading="eager"
                      decoding="async"
                      draggable={false}
                    />
                  ))}
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
