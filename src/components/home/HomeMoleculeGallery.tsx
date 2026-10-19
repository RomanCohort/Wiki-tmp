import { HomeVaccineCandidates } from "./HomeVaccineCandidates";
import "../../styles/home-molecule-gallery.css";

const captions = ["DNA", "mRNA", "circRNA", "Protein and cells"];

export function HomeMoleculeGallery() {
  return (
    <section
      id="molecule-gallery"
      className="home-molecule-gallery"
      aria-labelledby="molecule-gallery-title"
    >
      <h2 id="molecule-gallery-title" className="story-sr-only">
        Tumor vaccine candidates
      </h2>
      <p className="story-sr-only">
        Platforms considered: {captions.join(", ")}.
      </p>
      <div className="home-molecule-gallery__stage">
        <HomeVaccineCandidates />
        <p className="home-molecule-gallery__decision">
          Many possibilities. <em>We chose circRNA.</em>
        </p>
      </div>
    </section>
  );
}
