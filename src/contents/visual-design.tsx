import { WikiRoutePage } from "../components/wiki/WikiRoutePage";
import { visualDesignFeatures } from "../components/wiki/features/project/VisualDesignPanels";
import { getProjectHeroImage } from "../components/wiki/projectHeroAssets";
import { visualDesignPage } from "../data/project/visualDesignPage";
import "../styles/description-page.css";
import "../styles/features/visual-design-panels.css";

export function VisualDesign() {
  return (
    <WikiRoutePage
      content={visualDesignPage}
      heroImage={getProjectHeroImage(visualDesignPage.route)}
      theme="project"
      pageClassName="wiki-page--project wiki-page--description wiki-page--visual-design"
      hideHeroCopy
      features={visualDesignFeatures()}
    />
  );
}
