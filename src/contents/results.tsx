import { WikiRoutePage } from "../components/wiki/WikiRoutePage";
import {
  renderResultsText,
  resultsFeatures,
} from "../components/wiki/features/project/ResultsPanels";
import { getProjectHeroImage } from "../components/wiki/projectHeroAssets";
import { resultsPage } from "../data/project/resultsPage";

export function Results() {
  return (
    <WikiRoutePage
      content={resultsPage}
      heroImage={getProjectHeroImage(resultsPage.route)}
      hideHeroCopy
      theme="project"
      pageClassName="wiki-page--project"
      features={resultsFeatures()}
      inlineRenderer={renderResultsText}
    />
  );
}
