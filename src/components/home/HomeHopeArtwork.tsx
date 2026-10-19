import { type CSSProperties } from "react";
const clinic = "https://static.igem.wiki/teams/6056/wiki/files/pages/home/hope-return-clinic.webp";
const doctor = "https://static.igem.wiki/teams/6056/wiki/files/pages/home/hope-return-doctor.webp";
const patient = "https://static.igem.wiki/teams/6056/wiki/files/pages/home/hope-return-patient.webp";
import "../../styles/home-hope.css";

export function HomeHopeArtwork() {
  return (
    <>
      <img
        className="story-backdrop story-hope-backdrop"
        src={clinic}
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        width={2560}
        height={1440}
      />
      <div
        className="story-art story-art--hope-return"
        style={{ "--art-aspect": 16 / 9 } as CSSProperties}
      >
        <figure
          className="story-hope-people"
          role="img"
          aria-label="A smiling doctor and patient meet again in a softly painted hospital room."
        >
          {/* Cropped layers retain their positions on the original 2560 × 1440 canvas. */}
          <img
            className="story-layer story-hope-doctor"
            data-layer="2"
            src={doctor}
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
            width={860}
            height={1192}
          />
          <img
            className="story-layer story-hope-patient"
            data-layer="3"
            src={patient}
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
            width={626}
            height={906}
          />
        </figure>
        <article className="story-hope-copy">
          <h3 data-hope-copy="question">
            “If it comes back, can we give her <em>more options?</em>”
          </h3>
          <p data-hope-copy="context">
            Clinical training showed us the uncertainty patients face. Research
            gives us a way to work toward an answer.
          </p>
        </article>
      </div>
    </>
  );
}
