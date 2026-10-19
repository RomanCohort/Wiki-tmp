import { type ReactNode } from "react";
import "../../styles/home-rna-sequence.css";

// Without motion both illustrations retain their normal document order.
export function HomeRnaSequence({
  rna,
  platform,
}: {
  rna: ReactNode;
  platform: ReactNode;
}) {
  return (
    <div className="story-rna-sequence story-chapter story-chapter--platform">
      <div className="story-rna-sequence-track">
        <div className="story-rna-sequence-stage">
          <section
            id="why-circrna"
            className="story-chapter story-chapter--rna"
            aria-labelledby="why-circrna-title"
          >
            <h2 className="story-sr-only" id="why-circrna-title">
              Why circRNA?
            </h2>
            <div className="story-scene-track">
              <div className="story-chapter-inner">
                <div className="story-visual">{rna}</div>
              </div>
            </div>
          </section>
          <section
            id="our-platform"
            className="story-chapter story-chapter--platform"
            aria-labelledby="our-platform-title"
          >
            <h2 className="story-sr-only" id="our-platform-title">
              Project advantages
            </h2>
            <div className="story-scene-track">
              <div className="story-chapter-inner">
                <div className="story-visual">{platform}</div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
