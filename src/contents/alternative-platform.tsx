import { WikiRoutePage } from "../components/wiki/WikiRoutePage";
import { getWetLabHeroImage } from "../components/wiki/wetLabHeroAssets";
import {
  alternativePlatformFeatures,
  renderAlternativePlatformCitedText,
} from "../components/wiki/features/wet-lab/AlternativePlatformPanels";
import { alternativePlatformPage } from "../data/wet-lab/alternativePlatformPage";

export function AlternativePlatform() {
  return (
    <WikiRoutePage
      content={alternativePlatformPage}
      heroImage={getWetLabHeroImage(alternativePlatformPage.route)}
      theme="wet-lab"
      pageClassName="wiki-page--wet-lab"
      hideHeroCopy
      features={alternativePlatformFeatures()}
      inlineRenderer={renderAlternativePlatformCitedText}
    />
  );
}
