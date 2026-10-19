const educationHero = "https://static.igem.wiki/teams/6056/wiki/files/pages/engagement/education/games/education-page-hero-01f9811aecb2.webp";
const entrepreneurshipHero = "https://static.igem.wiki/teams/6056/wiki/files/pages/engagement/engagement-entrepreneurship-hero-v2-efb0a019ee72.webp";
const humanPracticesHero = "https://static.igem.wiki/teams/6056/wiki/files/pages/engagement/engagement-human-practices-hero-v2-ce6ea8234186.webp";
const sustainabilityHero = "https://static.igem.wiki/teams/6056/wiki/files/pages/engagement/engagement-sustainability-hero-v2-af187053f50d.webp";

/**
 * Per-page hero art for the Engagement reader.
 *
 * Same contract as `projectHeroAssets.ts` / `dryLabHeroAssets.ts`. The water
 * colour images are the exact files the pre-revamp Engagement pages used: the
 * old `EngagementHeroVisual` mapped each route onto one of the Wet Lab hero
 * watercolours, and those (v2) files are copied here verbatim so every page
 * keeps the opening it already had.
 */
export type EngagementHeroVariant =
  | "entrepreneurship"
  | "human-practices"
  | "education"
  | "sustainability";

const VARIANT_BY_ROUTE: Record<string, EngagementHeroVariant> = {
  "/entrepreneurship": "entrepreneurship",
  "/human-practices": "human-practices",
  "/education": "education",
  "/sustainability": "sustainability",
};

const HERO_BY_VARIANT: Record<EngagementHeroVariant, string> = {
  entrepreneurship: entrepreneurshipHero,
  "human-practices": humanPracticesHero,
  education: educationHero,
  sustainability: sustainabilityHero,
};

export function getEngagementHeroVariant(route: string) {
  return VARIANT_BY_ROUTE[route] ?? "entrepreneurship";
}

export function getEngagementHeroImage(route: string) {
  return HERO_BY_VARIANT[getEngagementHeroVariant(route)];
}
