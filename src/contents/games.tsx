import { WikiRoutePage } from "../components/wiki/WikiRoutePage";
import { getDryLabHeroImage } from "../components/wiki/dryLabHeroAssets";
import {
  GameLaunchCard,
  GamesProvider,
  GamesStationMap,
} from "../components/wiki/features/GamesShowcase";
import { gamesPage } from "../data/gamesPage";

/**
 * Dry Lab 04 — Games.
 *
 * Runs on the shared Dry Lab reader-route template with the module palette, so
 * the hero, mat, paper frame, section rhythm, closing prompt and footer are the
 * same components as Model / Software / Hardware. `hideOutline` renders without
 * the TOC card and lets its reader frame take the released width.
 */
export function Games() {
  return (
    <GamesProvider>
      <WikiRoutePage
        content={gamesPage}
        heroImage={getDryLabHeroImage(gamesPage.route)}
        theme="dry-lab"
        pageClassName="wiki-page--dry-lab wiki-page--games"
        hideOutline
        hideHeroCopy
        features={{
          "games-project-map": <GamesStationMap />,
          "game-virtual-lab": <GameLaunchCard game="virtual-lab" />,
          "game-breast-guardian": <GameLaunchCard game="breast-guardian" />,
          "game-bomb-cat": <GameLaunchCard game="bomb-cat" />,
          "game-bio-memory": <GameLaunchCard game="bio-memory" />,
        }}
      />
    </GamesProvider>
  );
}
