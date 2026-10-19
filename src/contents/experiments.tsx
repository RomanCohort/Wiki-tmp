import { WikiRoutePage } from "../components/wiki/WikiRoutePage";
import { getWetLabHeroImage } from "../components/wiki/wetLabHeroAssets";
import { experimentsFeatures, renderExperimentText } from "../components/wiki/features/wet-lab/ExperimentsPanels";
import { experimentsPage } from "../data/wet-lab/experimentsPage";
import { experimentProtocolPairs } from "../data/wet-lab/experimentProtocolPages";

export function Experiments() {
  return (
    <WikiRoutePage
      content={experimentsPage}
      heroImage={getWetLabHeroImage(experimentsPage.route)}
      theme="wet-lab"
      pageClassName="wiki-page--wet-lab wiki-page--experiments"
      hideHeroCopy
      collapsibleSubheadingSections={experimentsPage.sections
        .filter((section) => section.id !== "sec-outlook")
        .map((section) => section.id)}
      protocolPairs={experimentProtocolPairs}
      features={experimentsFeatures()}
      articleLead={experimentsFeatures()["exp-protocol-map"]}
      inlineRenderer={renderExperimentText}
    />
  );
}
