import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  lazy,
  Suspense,
  type MouseEvent,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import { scrollReaderToTarget } from "../../../utils";
import "../../../styles/games-page.css";
const bombCatArt =
  "https://static.igem.wiki/teams/6056/wiki/files/pages/games/bomb-cat/cover-9a800b8be673.webp";
const breastGuardianArt =
  "https://static.igem.wiki/teams/6056/wiki/files/pages/shared/breast-guardian-showcase-86cd548b1ac0.webp";
const bioMemoryArt =
  "https://static.igem.wiki/teams/6056/wiki/files/pages/shared/bio-memory-showcase-e198853d2fb5.webp";
const virtualLabArt =
  "https://static.igem.wiki/teams/6056/wiki/files/pages/shared/virtual-lab-showcase-4b03b6f1bbbb.webp";

/**
 * Games — interactive station map + four playable projects.
 *
 * Migrated from the previous build's `contents/games.tsx` without copy changes.
 * The interaction model is unchanged: the station map scrolls to a showcase, a
 * showcase opens the game in a full-screen play surface, Escape / backdrop /
 * "Close game" leave it and focus returns to the button that opened it.
 *
 * What changed is the container: the page now runs on the shared Dry Lab
 * reader-route template, so this file exports the pieces the page mounts as
 * feature blocks (`GamesStationMap`, `GameLaunchCard`) plus the provider that
 * owns the open-game state they share.
 */

const BreastGuardianGame = lazy(() => import("../../BreastGuardianGame"));
const BombCatGame = lazy(() => import("../../BombCatGame"));
const BioMemoryGame = lazy(() => import("../../BioMemoryGame"));
const VirtualLaboratory = lazy(() => import("../../VirtualLaboratory"));

type GameKey = "virtual-lab" | "breast-guardian" | "bomb-cat" | "bio-memory";

const GAME_META: Record<GameKey, { station: string; title: string }> = {
  "virtual-lab": {
    station: "Project 01 · Virtual Laboratory",
    title: "Virtual Laboratory",
  },
  "breast-guardian": {
    station: "Project 02 · Interactive Story",
    title: "Breast Guardian RPG",
  },
  "bomb-cat": {
    station: "Project 03 · Strategy Card Game",
    title: "Bomb Cat",
  },
  "bio-memory": {
    station: "Project 04 · Specimen Match",
    title: "Bio Memory Match",
  },
};

const SECTION_ID: Record<GameKey, string> = {
  "virtual-lab": "game-virtual-lab",
  "breast-guardian": "game-breast-guardian",
  "bomb-cat": "game-bomb-cat",
  "bio-memory": "game-bio-memory",
};

interface GamesContextValue {
  openGame: (game: GameKey, trigger: HTMLElement | null) => void;
  scrollToShowcase: (game: GameKey, triggerEl?: Element | null) => void;
}

const GamesContext = createContext<GamesContextValue | null>(null);

function useGames(): GamesContextValue {
  const value = useContext(GamesContext);
  if (!value) {
    throw new Error("Games features must be rendered inside <GamesProvider>.");
  }
  return value;
}

function GameExperience({
  game,
  onExit,
}: {
  game: GameKey;
  onExit: () => void;
}) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const isBombCat = game === "bomb-cat";
  const isBioMemory = game === "bio-memory";
  const gameMeta = GAME_META[game];

  useEffect(() => {
    const previousBodyOverflow = document.body.style.overflow;
    const appRoot = document.getElementById("root");
    const previousRootInert = appRoot?.inert ?? false;

    document.body.style.overflow = "hidden";
    window.dispatchEvent(new Event("sheep-cursor-hide"));
    if (appRoot) appRoot.inert = true;
    closeButtonRef.current?.focus();

    const closeFromKeyboard = (event: KeyboardEvent) => {
      if (event.key === "Escape") onExit();
    };
    window.addEventListener("keydown", closeFromKeyboard);

    return () => {
      window.removeEventListener("keydown", closeFromKeyboard);
      document.body.style.overflow = previousBodyOverflow;
      if (appRoot) appRoot.inert = previousRootInert;
    };
  }, [onExit]);

  const closeFromBackdrop = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) onExit();
  };

  return createPortal(
    <div
      className="games-experience"
      role="dialog"
      aria-modal="true"
      aria-labelledby="games-experience-title"
      onClick={closeFromBackdrop}
    >
      <div className="games-experience__surface">
        <header className="games-experience__bar">
          <div>
            <span>{gameMeta.station}</span>
            <h2 id="games-experience-title">{gameMeta.title}</h2>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            className="games-experience__close"
            onClick={onExit}
            aria-label="Close experience"
          >
            <span>Back to Wiki</span>
            <b aria-hidden="true">×</b>
          </button>
        </header>

        <div className="games-experience__body">
          <Suspense
            fallback={
              <div className="games-experience__loading" role="status">
                <span aria-hidden="true" />
                Preparing the game…
              </div>
            }
          >
            {game === "virtual-lab" ? (
              <VirtualLaboratory onRequestClose={onExit} />
            ) : isBombCat ? (
              <BombCatGame onRequestClose={onExit} />
            ) : isBioMemory ? (
              <BioMemoryGame onRequestClose={onExit} />
            ) : (
              <BreastGuardianGame onRequestClose={onExit} />
            )}
          </Suspense>
        </div>
      </div>
    </div>,
    document.body,
  );
}

/** Owns the open-game state shared by the station map and the showcase cards. */
export function GamesProvider({ children }: { children: ReactNode }) {
  const [activeGame, setActiveGame] = useState<GameKey | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  const openGame = useCallback((game: GameKey, trigger: HTMLElement | null) => {
    triggerRef.current = trigger;
    setActiveGame(game);
  }, []);

  const closeGame = useCallback(() => {
    setActiveGame(null);
  }, []);

  // Message-based closes may commit after the next animation frame. Restore
  // focus after the dialog cleanup has removed the background's inert state.
  useEffect(() => {
    if (activeGame === null)
      triggerRef.current?.focus({ preventScroll: true });
  }, [activeGame]);

  const scrollToShowcase = useCallback(
    (game: GameKey, triggerEl?: Element | null) => {
      const targetId = SECTION_ID[game];
      const target = document.getElementById(targetId);
      if (!target) return;
      const inner =
        target.closest<HTMLElement>(".route-frame__scroll") ??
        (triggerEl as HTMLElement)?.closest<HTMLElement>(
          ".route-frame__scroll",
        );
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      scrollReaderToTarget(target, inner, reduceMotion ? "instant" : "smooth", {
        block: "start",
      });
    },
    [],
  );

  const value = useMemo(
    () => ({ openGame, scrollToShowcase }),
    [openGame, scrollToShowcase],
  );

  return (
    <GamesContext.Provider value={value}>
      {children}
      {activeGame ? (
        <GameExperience game={activeGame} onExit={closeGame} />
      ) : null}
    </GamesContext.Provider>
  );
}

/** Four-station route map; all stations jump to their showcase. */
export function GamesStationMap() {
  const { scrollToShowcase } = useGames();

  return (
    <div className="games-project-map">
      <div className="games-project-map__stage">
        <span className="games-project-map__ribbon" aria-hidden="true" />
        <ol className="games-project-map__stations">
          <li id="virtual-laboratory" className="is-available">
            <button
              type="button"
              onClick={(e) => scrollToShowcase("virtual-lab", e.currentTarget)}
              aria-controls="game-virtual-lab"
            >
              <span className="games-project-map__node" aria-hidden="true">
                <svg className="ribbon-mark" viewBox="0 0 32 46">
                  <use href="#circure-ribbon-knot" />
                </svg>
              </span>
              <strong id="virtual-lab-title">Virtual Laboratory</strong>
            </button>
          </li>

          <li id="breast-guardian-rpg" className="is-available">
            <button
              type="button"
              onClick={(e) =>
                scrollToShowcase("breast-guardian", e.currentTarget)
              }
              aria-controls="game-breast-guardian"
            >
              <span className="games-project-map__node" aria-hidden="true">
                <svg className="ribbon-mark" viewBox="0 0 32 46">
                  <use href="#circure-ribbon-knot" />
                </svg>
              </span>
              <strong>Breast Guardian RPG</strong>
            </button>
          </li>

          <li id="exploding-cat-card-game" className="is-available">
            <button
              type="button"
              onClick={(e) => scrollToShowcase("bomb-cat", e.currentTarget)}
              aria-controls="game-bomb-cat"
            >
              <span className="games-project-map__node" aria-hidden="true">
                <svg className="ribbon-mark" viewBox="0 0 32 46">
                  <use href="#circure-ribbon-knot" />
                </svg>
              </span>
              <strong id="exploding-cat-title">Bomb Cat Card Game</strong>
            </button>
          </li>

          <li id="bio-memory-match" className="is-available">
            <button
              type="button"
              onClick={(e) => scrollToShowcase("bio-memory", e.currentTarget)}
              aria-controls="game-bio-memory"
            >
              <span className="games-project-map__node" aria-hidden="true">
                <svg className="ribbon-mark" viewBox="0 0 32 46">
                  <use href="#circure-ribbon-knot" />
                </svg>
              </span>
              <strong>Bio Memory Match</strong>
            </button>
          </li>
        </ol>
      </div>
      <p className="games-project-map__source-note">
        <span className="games-project-map__source-mascot" aria-hidden="true">
          <img
            src="https://static.igem.wiki/teams/6056/wiki/files/pages/shared/lamb.avif"
            alt=""
            loading="lazy"
          />
        </span>
        <span className="games-project-map__source-copy">
          <span>Open source</span>
          The source code for these games is openly available in our iGEM GitLab
          repository.
        </span>
      </p>
    </div>
  );
}

interface GameLaunchConfig {
  station: string;
  badge: string;
  title: string;
  subtitle: string;
  coverImage?: string;
}

const GAME_LAUNCH_CONFIG: Record<GameKey, GameLaunchConfig> = {
  "virtual-lab": {
    station: "Project 01",
    badge: "Virtual Lab · 9 Protocols",
    title: "Virtual Laboratory",
    subtitle: "Molecular biology workbench",
    coverImage: virtualLabArt,
  },
  "breast-guardian": {
    station: "Project 02",
    badge: "Story RPG · 3 Chapters",
    title: "Breast Guardian RPG",
    subtitle: "Interactive breast health journey",
    coverImage: breastGuardianArt,
  },
  "bomb-cat": {
    station: "Project 03",
    badge: "Card Strategy · 2–4 Players",
    title: "circRNA Bomb Cat",
    subtitle: "TNBC immune defense & outbreak defusal",
    coverImage: bombCatArt,
  },
  "bio-memory": {
    station: "Project 04",
    badge: "Specimen Match · 18 Pairs",
    title: "Bio Memory Match",
    subtitle: "Biology specimen field guide",
    coverImage: bioMemoryArt,
  },
};

/** Shared artwork and action dock for game launchers and page links. */
function GameShowcaseVisual({
  game,
  actionLabel,
}: {
  game: GameKey;
  actionLabel: string;
}) {
  const config = GAME_LAUNCH_CONFIG[game];
  return (
    <>
      <div className="games-showcase__canvas-stage" aria-hidden="true">
        <div
          className="games-showcase__art"
          style={
            config.coverImage
              ? { backgroundImage: `url(${config.coverImage})` }
              : undefined
          }
        />
        <div className="games-showcase__vignette" />
      </div>

      <div className="games-showcase__hud">
        <span className="games-showcase__station-badge">
          <svg
            className="games-showcase__knot-mark"
            viewBox="0 0 32 46"
            aria-hidden="true"
          >
            <use href="#circure-ribbon-knot" />
          </svg>
          <strong>{config.station}</strong>
        </span>
        <span className="games-showcase__mode-pill">{config.badge}</span>
      </div>

      <div className="games-showcase__dock">
        <div className="games-showcase__dock-meta">
          <strong className="games-showcase__title">{config.title}</strong>
          <span className="games-showcase__subtitle">{config.subtitle}</span>
        </div>
        <div className="games-showcase__dock-action">
          <span className="games-showcase__cta-btn">
            <b className="games-showcase__cta-play" aria-hidden="true">
              ▶
            </b>
            <span>{actionLabel}</span>
          </span>
        </div>
      </div>
    </>
  );
}

/** One showcase launch card; clicking anywhere opens the game surface. */
export function GameLaunchCard({ game }: { game: GameKey }) {
  const { openGame } = useGames();
  return (
    <div className={`games-showcase games-showcase--${game}`}>
      <button
        type="button"
        className="games-showcase__launch"
        onClick={(event) => openGame(game, event.currentTarget)}
        aria-haspopup="dialog"
      >
        <GameShowcaseVisual game={game} actionLabel="Play" />
      </button>
    </div>
  );
}

/** Reuse the Games artwork and skin when another chapter links to a game. */
export function GameShowcaseLink({ game }: { game: GameKey }) {
  return (
    <div className="wiki-page--games games-showcase-preview">
      <div className={`games-showcase games-showcase--${game}`}>
        <Link
          className="games-showcase__launch"
          to={`/games#${SECTION_ID[game]}`}
        >
          <GameShowcaseVisual game={game} actionLabel="Turn to Games Page." />
        </Link>
      </div>
    </div>
  );
}
