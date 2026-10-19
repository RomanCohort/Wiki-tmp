import { WikiRoutePage } from "../components/wiki/WikiRoutePage";
import {
  contributionFeatures,
  renderContributionCitedText,
} from "../components/wiki/features/project/ContributionPanels";
import { getProjectHeroImage } from "../components/wiki/projectHeroAssets";
import { contributionPage } from "../data/project/contributionPage";

export function Contribution() {
  return (
    <WikiRoutePage
      content={contributionPage}
      heroImage={getProjectHeroImage(contributionPage.route)}
      theme="project"
      pageClassName="wiki-page--project wiki-page--contribution"
      hideHeroCopy
      outlineDepth={2}
      features={contributionFeatures()}
      inlineRenderer={renderContributionCitedText}
    />
  );
}
