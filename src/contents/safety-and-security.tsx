import { WikiRoutePage } from "../components/wiki/WikiRoutePage";
import { getProjectHeroImage } from "../components/wiki/projectHeroAssets";
import { safetyFeatures, renderSafetyInline } from "../components/wiki/features/project/SafetyPanels";
import { safetyImagePreloads } from "../data/project/safetyAssets";
import { safetyPage } from "../data/project/safetyPage";

export function SafetyAndSecurity() {
  return (
    <WikiRoutePage
      content={safetyPage}
      heroImage={getProjectHeroImage(safetyPage.route)}
      theme="project"
      pageClassName="wiki-page--project wiki-page--safety"
      hideHeroCopy
      features={safetyFeatures()}
      inlineRenderer={renderSafetyInline}
      preloadImages={safetyImagePreloads}
      outlineDepth={2}
    />
  );
}
