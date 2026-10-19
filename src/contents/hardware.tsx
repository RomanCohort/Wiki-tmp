import { WikiRoutePage } from "../components/wiki/WikiRoutePage";
import { getDryLabHeroImage } from "../components/wiki/dryLabHeroAssets";
import {
  hardwareFeatures,
  renderHardwareCitedText,
} from "../components/wiki/features/drylab/HardwarePanels";
import { hardwarePage } from "../data/drylab/hardwarePage";

export function Hardware() {
  return (
    <WikiRoutePage
      content={hardwarePage}
      heroImage={getDryLabHeroImage(hardwarePage.route)}
      theme="dry-lab"
      pageClassName="wiki-page--dry-lab wiki-page--hardware"
      hideHeroCopy
      features={hardwareFeatures()}
      inlineRenderer={renderHardwareCitedText}
    />
  );
}
