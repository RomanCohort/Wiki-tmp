import { WikiRoutePage } from "../components/wiki/WikiRoutePage";
import {
  descriptionFeatures,
  renderCitedText,
} from "../components/wiki/features/project/DescriptionPanels";
import { getProjectHeroImage } from "../components/wiki/projectHeroAssets";
import { descriptionPage } from "../data/project/descriptionPage";
import "../styles/description-page.css";

export function Description() {
  return (
    <WikiRoutePage
      content={descriptionPage}
      heroImage={getProjectHeroImage(descriptionPage.route)}
      theme="project"
      pageClassName="wiki-page--project wiki-page--description"
      hideHeroCopy
      features={descriptionFeatures()}
      inlineRenderer={renderCitedText}
    />
  );
}
