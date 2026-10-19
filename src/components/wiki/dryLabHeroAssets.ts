const gamesHero =
  "https://static.igem.wiki/teams/6056/wiki/files/pages/hero/dry-lab-games-hero.webp";
const hardwareHero =
  "https://static.igem.wiki/teams/6056/wiki/files/pages/dry-lab/dry-lab-hardware-hero.webp";
const modelHero =
  "https://static.igem.wiki/teams/6056/wiki/files/pages/dry-lab/dry-lab-model-hero.webp";
const softwareHero =
  "https://static.igem.wiki/teams/6056/wiki/files/pages/dry-lab/dry-lab-software-hero.webp";

/**
 * Per-page hero art for the Dry Lab reader.
 *
 * Same contract as `projectHeroAssets.ts`: the reader-route template resolves
 * its full-bleed hero through this map so every page of the module can carry
 * its own opening without component branching. The artwork is migrated
 * verbatim from the pre-revamp project.
 */
export type DryLabHeroVariant = "model" | "software" | "hardware" | "games";

const VARIANT_BY_ROUTE: Record<string, DryLabHeroVariant> = {
  "/model": "model",
  "/software": "software",
  "/hardware": "hardware",
  "/games": "games",
};

const HERO_BY_VARIANT: Record<DryLabHeroVariant, string> = {
  model: modelHero,
  software: softwareHero,
  hardware: hardwareHero,
  games: gamesHero,
};

export function getDryLabHeroVariant(route: string) {
  return VARIANT_BY_ROUTE[route] ?? "model";
}

export function getDryLabHeroImage(route: string) {
  return HERO_BY_VARIANT[getDryLabHeroVariant(route)];
}
