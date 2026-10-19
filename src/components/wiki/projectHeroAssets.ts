const contributionHero =
  "https://static.igem.wiki/teams/6056/wiki/files/pages/hero/project-contribution-hero.webp";
const visualDesignHero =
  "https://static.igem.wiki/teams/6056/wiki/files/pages/hero/project-visual-design-hero.webp";
const safetyHero =
  "https://static.igem.wiki/teams/6056/wiki/files/pages/hero/project-safety-hero.webp";

const descriptionHero =
  "https://static.igem.wiki/teams/6056/wiki/files/pages/project/project-description-hero.webp";
const engineeringHero = "https://static.igem.wiki/teams/6056/wiki/files/pages/project/engineering/project-engineering-hero.webp";
const resultsHero =
  "https://static.igem.wiki/teams/6056/wiki/files/pages/project/results/project-results-hero.webp";

const notebookHero =
  "https://static.igem.wiki/teams/6056/wiki/files/pages/wet-lab/wet-lab-notebook-hero-v3.webp";

/**
 * Per-page hero art for the Project reader.
 *
 * The reader-route template resolves its hero through this map so every page
 * of the module can carry its own full-bleed opening without any component
 * branching. A new module only needs its own `<module>HeroAssets.ts` with the
 * same two functions.
 */
export type ProjectHeroVariant =
  | "description"
  | "engineering"
  | "results"
  | "contribution"
  | "visual-design"
  | "notebook"
  | "safety";

const VARIANT_BY_ROUTE: Record<string, ProjectHeroVariant> = {
  "/description": "description",
  "/engineering": "engineering",
  "/results": "results",
  "/contribution": "contribution",
  "/visual-design": "visual-design",
  "/art": "visual-design",
  "/notebook": "notebook",
  "/safety-and-security": "safety",
  "/safety": "safety",
};

const HERO_BY_VARIANT: Record<ProjectHeroVariant, string> = {
  description: descriptionHero,
  engineering: engineeringHero,
  results: resultsHero,
  contribution: contributionHero,
  "visual-design": visualDesignHero,
  notebook: notebookHero,
  safety: safetyHero,
};

export function getProjectHeroVariant(route: string) {
  return VARIANT_BY_ROUTE[route] ?? "description";
}

export function getProjectHeroImage(route: string) {
  return HERO_BY_VARIANT[getProjectHeroVariant(route)];
}
