import { WikiRoutePage } from "../components/wiki/WikiRoutePage";
import { getWetLabHeroImage } from "../components/wiki/wetLabHeroAssets";
import {
  designFeatures,
  renderDesignCitedText,
} from "../components/wiki/features/wet-lab/DesignPanels";
import { designPage } from "../data/wet-lab/designPage";

export function Design() {
  return (
    <WikiRoutePage
      content={designPage}
      heroImage={getWetLabHeroImage(designPage.route)}
      theme="wet-lab"
      pageClassName="wiki-page--wet-lab wiki-page--design"
      hideHeroCopy
      features={designFeatures()}
      inlineRenderer={renderDesignCitedText}
    />
  );
}
