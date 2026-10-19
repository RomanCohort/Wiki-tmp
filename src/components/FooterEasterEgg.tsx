import { lazy, Suspense, useRef } from "react";
import { useFooterEasterEgg } from "../hooks/useFooterEasterEgg";
import "../styles/footer-easter-egg.css";

const FooterPhotoScene = lazy(() => import("./FooterPhotoScene"));
/** Reserve the final window before loading, so native scrolling never hits a gate. */
export function FooterEasterEgg() {
  const rootRef = useRef<HTMLElement>(null);
  const ready = useFooterEasterEgg(rootRef);

  return (
    <section
      ref={rootRef}
      id="circure-team-finale"
      className="circure-photo-afterword"
      aria-label="A photograph from JLU-FBH"
    >
      {ready && (
        <Suspense
          fallback={
            <div className="finale-photo-loading" role="status">
              <span className="visually-hidden">
                Loading the team photograph…
              </span>
            </div>
          }
        >
          <FooterPhotoScene />
        </Suspense>
      )}
    </section>
  );
}
