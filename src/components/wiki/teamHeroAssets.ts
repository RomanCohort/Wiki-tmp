const attributionHero =
  "https://static.igem.wiki/teams/6056/wiki/files/pages/hero/team-attributions-hero.webp";

const rosterHero =
  "https://static.igem.wiki/teams/6056/wiki/files/pages/team/team-roster-hero.webp";
const activitiesHero =
  "https://static.igem.wiki/teams/6056/wiki/files/pages/team/team-activities-hero.webp";

export function getTeamHeroImage(route?: string) {
  if (route === "/activities") {
    return activitiesHero;
  }
  if (route === "/attributions") {
    return attributionHero;
  }
  return rosterHero;
}
