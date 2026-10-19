import { useRef } from "react";
const anxietyLabelUrl = "https://static.igem.wiki/teams/6056/wiki/files/pages/home/anxiety-label.webp";
const anxietyUrl = "https://static.igem.wiki/teams/6056/wiki/files/pages/home/anxiety.webp";
const chemotherapyLabelUrl = "https://static.igem.wiki/teams/6056/wiki/files/pages/home/chemotherapy-label.webp";
const chemotherapyUrl = "https://static.igem.wiki/teams/6056/wiki/files/pages/home/chemotherapy.webp";
const deathRateLabelUrl = "https://static.igem.wiki/teams/6056/wiki/files/pages/home/death-rate-label.webp";
const deathRateUrl = "https://static.igem.wiki/teams/6056/wiki/files/pages/home/death-rate.webp";
const hairLossLabelUrl = "https://static.igem.wiki/teams/6056/wiki/files/pages/home/hair-loss-label.webp";
const hairLossUrl = "https://static.igem.wiki/teams/6056/wiki/files/pages/home/hair-loss.webp";
const surgeryLabelUrl = "https://static.igem.wiki/teams/6056/wiki/files/pages/home/surgery-label.webp";
const surgeryUrl = "https://static.igem.wiki/teams/6056/wiki/files/pages/home/surgery.webp";
const womanFrameUrl = "https://static.igem.wiki/teams/6056/wiki/files/pages/home/woman-frame-focus-b24540ae8a11.webp";
const womanPortraitUrl = "https://static.igem.wiki/teams/6056/wiki/files/pages/home/woman-portrait-02efc9a4ddeb.svg";
import { HomeIntro } from "../components/home/HomeIntro";
import { HomePlayback } from "../components/home/HomePlayback";
import { useHomeScene01Animation } from "../hooks/useHomeScene01Animation";
import { HomeStory } from "./home-story";
import "../styles/home-scene-01.css";

const sceneItems = [
  {
    key: "anxiety",
    visual: anxietyUrl,
    label: anxietyLabelUrl,
    description: "Anxiety",
  },
  {
    key: "surgery",
    visual: surgeryUrl,
    label: surgeryLabelUrl,
    description: "Surgery",
  },
  {
    key: "hair-loss",
    visual: hairLossUrl,
    label: hairLossLabelUrl,
    description: "Hair loss",
  },
  {
    key: "chemotherapy",
    visual: chemotherapyUrl,
    label: chemotherapyLabelUrl,
    description: "Chemotherapy",
  },
  {
    key: "death-rate",
    visual: deathRateUrl,
    label: deathRateLabelUrl,
    description: "Death rate",
  },
] as const;

export function Home() {
  const rootRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLElement>(null);
  useHomeScene01Animation({ root: rootRef, scene: sceneRef });

  return (
    <div className="home-redesign" ref={rootRef}>
      <main id="top">
        {/* CROSS-FILE: .home-scene01 is read by Navbar.tsx; its darkness and
            portrait are driven by HomeIntro (see data-intro). */}
        <section
          className="home-scene01"
          ref={sceneRef}
          aria-labelledby="home-scene01-title"
        >
          <h1 id="home-scene01-title" className="scene01-sr-only">
            The burdens surrounding breast cancer
          </h1>
          <div className="home-scene01-canvas" data-surface="navy">
            <div className="scene01-darkness" aria-hidden="true" />
            <div className="scene01-stage">
              {sceneItems.map(({ key, visual, label, description }) => (
                <figure
                  className={`scene01-orbit scene01-orbit--${key}`}
                  key={key}
                >
                  <img
                    className="scene01-visual"
                    src={visual}
                    alt=""
                    decoding="async"
                  />
                  <img
                    className={`scene01-label scene01-label--${key}`}
                    src={label}
                    alt=""
                    aria-hidden="true"
                    decoding="async"
                  />
                  <figcaption className="scene01-sr-only">
                    {description}
                  </figcaption>
                </figure>
              ))}
              <div className="scene01-frame-layer" aria-hidden="true">
                <img src={womanFrameUrl} alt="" />
              </div>
              <div className="scene01-portrait">
                <div className="scene01-person">
                  <img
                    className="scene01-person-image"
                    src={womanPortraitUrl}
                    alt="A woman in profile at the center of the surrounding burdens"
                    fetchPriority="high"
                  />
                </div>
              </div>
            </div>
            <div className="scene01-head-darkness" aria-hidden="true" />
            <div className="story-prologue scene01-prologue">
              <p>
                <span className="story-prologue-line">
                  Behind every diagnosis,
                </span>{" "}
                <em className="story-prologue-line">there is a person.</em>
              </p>
              <button
                type="button"
                onClick={() =>
                  rootRef.current
                    ?.querySelector("#what-we-saw")
                    ?.scrollIntoView({
                      block: "start",
                      behavior: "instant",
                    })
                }
              >
                It began with a question <span aria-hidden="true">↓</span>
              </button>
            </div>
          </div>
        </section>
        {/* A sibling, so the section ref is attached before its effects run. */}
        <HomeIntro scene={sceneRef}>
          {(introPlaying) => (
            <HomePlayback root={rootRef} introPlaying={introPlaying} />
          )}
        </HomeIntro>
        <HomeStory />
      </main>
    </div>
  );
}
