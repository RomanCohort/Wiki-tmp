import { WikiRoutePage } from "../components/wiki/WikiRoutePage";
import { getDryLabHeroImage } from "../components/wiki/dryLabHeroAssets";
import {
  renderSoftwareCitedText,
  softwareFeatures,
} from "../components/wiki/features/drylab/SoftwarePanels";
import { softwarePage } from "../data/drylab/softwarePage";

export function Software() {
  return (
    <WikiRoutePage
      content={softwarePage}
      heroImage={getDryLabHeroImage(softwarePage.route)}
      theme="dry-lab"
      pageClassName="wiki-page--dry-lab wiki-page--software"
      hideHeroCopy
      features={softwareFeatures()}
      inlineRenderer={renderSoftwareCitedText}
    />
  );
}
