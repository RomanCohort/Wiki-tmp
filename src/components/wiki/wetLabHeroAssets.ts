const designHero = "https://static.igem.wiki/teams/6056/wiki/files/pages/wet-lab/wet-lab-design-hero-b77d14a9e8d7.webp";
const platformHero =
  "https://static.igem.wiki/teams/6056/wiki/files/pages/hero/wet-lab-platform-hero.webp";

const experimentsHero =
  "https://static.igem.wiki/teams/6056/wiki/files/pages/wet-lab/wet-lab-experiments-hero.webp";
const measurementHero =
  "https://static.igem.wiki/teams/6056/wiki/files/pages/wet-lab/wet-lab-measurement-hero.webp";

export type WetLabHeroVariant =
  | "design"
  | "experiments"
  | "measurement"
  | "platform";

const VARIANT_BY_ROUTE: Record<string, WetLabHeroVariant> = {
  "/design": "design",
  "/experiments": "experiments",
  "/measurement": "measurement",
  "/alternative-platform": "platform",
};

const HERO_BY_VARIANT: Record<WetLabHeroVariant, string> = {
  design: designHero,
  experiments: experimentsHero,
  measurement: measurementHero,
  platform: platformHero,
};

export function getWetLabHeroVariant(route: string) {
  return VARIANT_BY_ROUTE[route] ?? "design";
}

export function getWetLabHeroImage(route: string) {
  return HERO_BY_VARIANT[getWetLabHeroVariant(route)];
}
