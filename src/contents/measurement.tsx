import { WikiRoutePage } from "../components/wiki/WikiRoutePage";
import { getWetLabHeroImage } from "../components/wiki/wetLabHeroAssets";
import { measurementFeatures, renderMeasurementCitedText } from "../components/wiki/features/wet-lab/MeasurementPanels";
import { measurementPage } from "../data/wet-lab/measurementPage";

const MEASUREMENT_COLLAPSIBLE_SECTIONS = [
  "04-choosing-what-to-build",
  "05-releasing-the-material",
  "06-fixing-the-quantities-every-readout-shares",
  "07-reading-the-immune-response",
  "08-measuring-the-outcome-in-the-animal",
] as const;

export function Measurement() {
  return (
    <WikiRoutePage
      content={measurementPage}
      heroImage={getWetLabHeroImage(measurementPage.route)}
      theme="wet-lab"
      pageClassName="wiki-page--wet-lab"
      hideHeroCopy
      collapsibleSubheadingSections={MEASUREMENT_COLLAPSIBLE_SECTIONS}
      features={measurementFeatures()}
      inlineRenderer={renderMeasurementCitedText}
    />
  );
}
