import { WikiRoutePage } from "../components/wiki/WikiRoutePage";
import { getProjectHeroImage } from "../components/wiki/projectHeroAssets";
import { notebookFeatures } from "../components/wiki/features/project/NotebookPanels";
import { notebookPreloadImages } from "../data/project/notebookAssets";
import { notebookPage } from "../data/project/notebookPage";

export function Notebook() {
  return (
    <WikiRoutePage
      content={notebookPage}
      heroImage={getProjectHeroImage(notebookPage.route)}
      theme="project"
      pageClassName="wiki-page--project wiki-page--notebook"
      documentFlow
      hideOutline
      hideHeroCopy
      preloadImages={notebookPreloadImages}
      features={notebookFeatures()}
    />
  );
}
