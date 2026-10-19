import { WikiRoutePage } from "../components/wiki/WikiRoutePage";
import {
  RosterOpening,
  rosterFeatures,
} from "../components/wiki/features/team/RosterPanels";
import { getTeamHeroImage } from "../components/wiki/teamHeroAssets";
import { rosterPage } from "../data/team/rosterPage";
import { rosterPreloadImages } from "../data/team/rosterAssets";

export function Roster() {
  return (
    <WikiRoutePage
      content={rosterPage}
      heroImage={getTeamHeroImage(rosterPage.route)}
      theme="team"
      pageClassName="wiki-page--team wiki-page--roster"
      hideHeroCopy
      hideOutline
      documentFlow
      preloadImages={rosterPreloadImages}
      leadSection={<RosterOpening />}
      features={rosterFeatures()}
    />
  );
}
