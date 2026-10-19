import { WikiRoutePage } from "../components/wiki/WikiRoutePage";
import { getDryLabHeroImage } from "../components/wiki/dryLabHeroAssets";
import {
  modelFeatures,
  renderModelCitedText,
} from "../components/wiki/features/drylab/ModelPanels";
import { modelPage } from "../data/drylab/modelPage";

export function Model() {
  return (
    <WikiRoutePage
      content={modelPage}
      heroImage={getDryLabHeroImage(modelPage.route)}
      theme="dry-lab"
      pageClassName="wiki-page--dry-lab wiki-page--model"
      hideHeroCopy
      outlineDepth={3}
      features={modelFeatures()}
      inlineRenderer={renderModelCitedText}
    />
  );
}
