import { useEffect, useId, useState } from "react";
import { Link } from "react-router-dom";
import { homeDestinations } from "../../data/homeDestinations";
import "../../styles/home-explore.css";

export function HomeExploreLinks() {
  const [preview, setPreview] = useState<string | null>(null);
  const id = useId();

  // Dismiss pointer hints on scroll, preserving the focused link's description.
  useEffect(() => {
    const dismiss = () => {
      const focused = document.activeElement?.closest(".story-hope-entry");
      setPreview(focused?.getAttribute("data-hope-card") ?? null);
    };
    window.addEventListener("scroll", dismiss, { passive: true });
    return () => window.removeEventListener("scroll", dismiss);
  }, []);

  return (
    <nav
      className="story-hope-links"
      aria-label="Continue exploring CirCure"
      onKeyDown={(event) => {
        if (event.key === "Escape") setPreview(null);
      }}
    >
      {["left", "right"].map((side, groupIndex) => (
        <div
          className={`story-hope-group story-hope-group--${side}`}
          key={side}
        >
          {homeDestinations
            .slice(groupIndex * 3, groupIndex * 3 + 3)
            .map((destination) => {
              const { key, label, path, summary } = destination;
              const showingPreview = preview === key;
              return (
                <div
                  className={`story-hope-entry${showingPreview ? " is-previewing" : ""}`}
                  data-hope-card={key}
                  key={key}
                  onPointerEnter={(event) => {
                    if (event.pointerType === "mouse") setPreview(key);
                  }}
                  onPointerLeave={(event) => {
                    if (!event.currentTarget.contains(document.activeElement)) {
                      setPreview(null);
                    }
                  }}
                  onBlur={(event) => {
                    if (!event.currentTarget.contains(event.relatedTarget))
                      setPreview(null);
                  }}
                >
                  <Link
                    className="story-hope-card"
                    to={path}
                    aria-describedby={
                      showingPreview ? `${id}-${key}-preview` : undefined
                    }
                    onFocus={() => setPreview(key)}
                    onClick={() => setPreview(null)}
                  >
                    {label} <span aria-hidden="true">↗</span>
                  </Link>
                  <div
                    className="home-explore-preview"
                    id={`${id}-${key}-preview`}
                    role="tooltip"
                    aria-hidden={!showingPreview}
                  >
                    <p>{summary}</p>
                  </div>
                </div>
              );
            })}
        </div>
      ))}
    </nav>
  );
}
