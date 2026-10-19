import { useId, useLayoutEffect, useRef } from "react";
import { keyAchievements } from "../../../../../data/wet-lab/keyAchievementsData";
import { keyAchievementsAssets } from "../../../../../data/wet-lab/keyAchievementsAssets";
import { mountKeyAchievements } from "./keyAchievementsController";
import "../../../../../styles/features/key-achievements.css";

export interface KeyAchievementsProps {
  className?: string;
  /** Optional local URL supplied by the Wiki's existing asset loader. */
  overviewSrc?: string;
}

function ExpandIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <path d="M8 3H3v5m13-5h5v5M3 16v5h5m13-5v5h-5M3 3l6 6m12-6-6 6M3 21l6-6m12 6-6-6" />
    </svg>
  );
}

/** Uses the existing React runtime plus native DOM/CSS/SVG animation APIs. */
export function KeyAchievements({
  className = "",
  overviewSrc = keyAchievementsAssets.overview,
}: KeyAchievementsProps) {
  const rootRef = useRef<HTMLElement>(null);
  const reactId = useId();
  const instanceId = `cc-achievements-${reactId.replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const imageId = `${instanceId}-image`;
  const imageReference = `#${imageId}`;

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    return mountKeyAchievements(root, keyAchievements, imageId);
  }, [imageId, overviewSrc]);

  return (
    <section
      ref={rootRef}
      className={`cc-achievements ${className}`.trim()}
      aria-label="CirCure key achievements"
    >
      <svg className="cc-image-definitions" aria-hidden="true">
        <defs>
          <image id={imageId} width="1394" height="2097" href={overviewSrc} />
        </defs>
      </svg>
      <div className="cc-responsive">
        <div className="cc-workspace">
          <nav
            className="cc-navigation"
            aria-label="Explore the seven achievements"
          >
            <div className="cc-orbit">
              <div className="cc-rotor" data-cc="rotor" />
              <button
                className="cc-centre"
                data-cc="overview-button"
                type="button"
                aria-pressed="true"
                aria-controls={`${instanceId}-content`}
                aria-label="Key Achievements: show visual overview"
              >
                Key
                <br />
                Achievements
              </button>
            </div>
            <p className="cc-hint">
              <span>Select an achievement to explore.</span>Click the centre to
              return to the overview.
            </p>
          </nav>
          <div
            className="cc-panel"
            id={`${instanceId}-content`}
            data-cc="content"
            role="region"
            aria-label="Achievement overview"
          >
            <div className="cc-layer cc-overview" data-cc="overview">
              <div className="cc-panel-heading">
                <h3>Visual overview</h3>
                <button
                  type="button"
                  className="cc-expand"
                  data-expand="overview"
                  aria-label="Enlarge visual overview"
                >
                  <ExpandIcon />
                </button>
              </div>
              <div className="cc-overview-body">
                <svg
                  className="cc-overview-image"
                  data-cc="overview-image"
                  viewBox="0 5 1394 2092"
                  role="img"
                  aria-label="Visual overview of all seven CirCure achievements"
                >
                  <use href={imageReference} />
                </svg>
              </div>
              <p className="cc-overview-caption">
                Seven connected contributions to a reusable circRNA platform.
              </p>
            </div>
            <article
              className="cc-layer cc-detail"
              data-cc="detail"
              aria-labelledby={`${instanceId}-detail-title`}
              hidden
            >
              <div className="cc-copy" data-cc="copy">
                <h3
                  className="cc-detail-title"
                  id={`${instanceId}-detail-title`}
                  data-cc="detail-title"
                />
                <div data-cc="detail-text" />
              </div>
              <div className="cc-figure-area" data-cc="figure-area">
                <figure className="cc-figure">
                  <svg
                    className="cc-crop"
                    data-cc="detail-image"
                    viewBox="0 5 1394 329"
                    role="img"
                  >
                    <title data-cc="crop-title" />
                    <use href={imageReference} />
                  </svg>
                </figure>
                <div className="cc-figure-bottom">
                  <button
                    type="button"
                    className="cc-expand"
                    data-expand="detail"
                    aria-label="Enlarge selected achievement illustration"
                  >
                    <ExpandIcon />
                  </button>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
      <div
        className="cc-sr-only"
        data-cc="announcement"
        aria-live="polite"
        aria-atomic="true"
      />
      <dialog
        className="cc-dialog"
        data-cc="image-dialog"
        aria-labelledby={`${instanceId}-dialog-title`}
      >
        <div className="cc-dialog-bar">
          <h3 id={`${instanceId}-dialog-title`} data-cc="dialog-title">
            Visual overview
          </h3>
          <button type="button" className="cc-close" data-cc="close-dialog">
            Close
          </button>
        </div>
        <svg
          className="cc-dialog-image"
          data-cc="dialog-image"
          viewBox="0 5 1394 2092"
          role="img"
          aria-label="Enlarged visual overview"
        >
          <use href={imageReference} />
        </svg>
      </dialog>
    </section>
  );
}

export default KeyAchievements;
