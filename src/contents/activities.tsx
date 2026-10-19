import { ActivitiesExperience } from "../components/wiki/features/team/ActivitiesPanels";
import { activitiesPage } from "../data/team/activitiesPage";
import { activitiesPhotos } from "../data/team/activitiesAssets";
import { getTeamHeroImage } from "../components/wiki/teamHeroAssets";
import "../styles/wiki-route-skin.css";

export function Activities() {
  return (
    <ActivitiesExperience
      content={activitiesPage}
      photos={activitiesPhotos}
      heroImage={getTeamHeroImage(activitiesPage.route)}
    />
  );
}
