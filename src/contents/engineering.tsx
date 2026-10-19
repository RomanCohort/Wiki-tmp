import { useRef, type CSSProperties } from "react";
import {
  EngineeringIntroduction,
  EngineeringJourney,
} from "../components/wiki/features/project/EngineeringExperience";
import { WikiNextRecord } from "../components/wiki/WikiNextRecord";
import { getProjectHeroImage } from "../components/wiki/projectHeroAssets";
import { engineeringPage } from "../data/project/engineeringPage";
import { PageImagePreloads } from "../components/common/PageImagePreloads";
import { wikiPageImages } from "../components/wiki/wikiPageImages";
import "../styles/wiki-route-skin.css";
import "../styles/features/engineering-experience.css";

/** The TIME scroll narrative is confined to Engineering; shared readers stay generic. */
export function Engineering() {
  const heroRef = useRef<HTMLElement>(null);
  return (
    <main
      className="wiki-page wiki-page--route wiki-page--manuscript wiki-page--project wiki-page--engineering"
      data-wiki-route="/engineering"
      data-route-theme="project"
    >
      <PageImagePreloads sources={wikiPageImages(engineeringPage)} />
      <header
        ref={heroRef}
        className="wiki-hero"
        style={
          {
            "--route-hero-image": `url(${getProjectHeroImage(engineeringPage.route)})`,
          } as CSSProperties
        }
      >
        <h1 className="wiki-hero__sr-only">{engineeringPage.title}</h1>
      </header>
      <EngineeringIntroduction section={engineeringPage.sections[0]} />
      <EngineeringJourney heroRef={heroRef} />
      <WikiNextRecord {...engineeringPage.next} />
    </main>
  );
}
