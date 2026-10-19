import {
  useEffect,
  useId,
  useRef,
  useState,
  type CSSProperties,
  type RefObject,
} from "react";
import { ArrowRight, List, Pause, Play, RotateCcw, X } from "lucide-react";
import { useHomePlayback } from "../../hooks/useHomePlayback";
import "../../styles/home-playback.css";

type HomePlaybackProps = {
  root: RefObject<HTMLDivElement | null>;
  introPlaying: boolean;
};

const PLAYBACK_RATES = [1, 1.5, 2];

export function HomePlayback({ root, introPlaying }: HomePlaybackProps) {
  const {
    mode,
    rate,
    chapterIndex,
    progress,
    ended,
    chapters,
    reducedMotion,
    artworkStatus,
    artworkChapter,
    toggle,
    seekChapter,
    setRate,
    retryArtwork,
  } = useHomePlayback(root);
  const [showScenes, setShowScenes] = useState(false);
  const playerRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLOListElement>(null);
  const scenesButtonRef = useRef<HTMLButtonElement>(null);
  const id = useId();
  const currentChapter = chapters[chapterIndex] ?? chapters[0];
  const playLabel = introPlaying
    ? mode === "playing"
      ? "Turn off automatic story playback"
      : "Turn on automatic story playback"
    : ended
      ? "Replay story"
      : mode === "playing"
        ? "Pause story"
        : mode === "paused"
          ? "Resume story"
          : "Play story";
  const percent = Math.round(Math.min(1, Math.max(0, progress)) * 100);
  const nextRate =
    PLAYBACK_RATES[(PLAYBACK_RATES.indexOf(rate) + 1) % PLAYBACK_RATES.length];

  useEffect(() => {
    if (introPlaying) setShowScenes(false);
  }, [introPlaying]);

  useEffect(() => {
    if (!showScenes || introPlaying) return;

    const centerCurrent = () => {
      const list = listRef.current;
      const current = panelRef.current?.querySelector<HTMLButtonElement>(
        '[aria-current="step"]',
      );
      if (!list || !current) return;
      const listBox = list.getBoundingClientRect();
      const currentBox = current.getBoundingClientRect();
      list.scrollTop +=
        currentBox.top - listBox.top - (listBox.height - currentBox.height) / 2;
    };
    centerCurrent();
    panelRef.current
      ?.querySelector<HTMLButtonElement>('[aria-current="step"]')
      ?.focus({ preventScroll: true });

    const dismissOutside = (event: PointerEvent) => {
      if (
        event.target instanceof Node &&
        !playerRef.current?.contains(event.target)
      ) {
        setShowScenes(false);
      }
    };
    const dismissEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      event.preventDefault();
      setShowScenes(false);
      scenesButtonRef.current?.focus({ preventScroll: true });
    };
    document.addEventListener("pointerdown", dismissOutside);
    document.addEventListener("keydown", dismissEscape);
    window.addEventListener("resize", centerCurrent);
    return () => {
      document.removeEventListener("pointerdown", dismissOutside);
      document.removeEventListener("keydown", dismissEscape);
      window.removeEventListener("resize", centerCurrent);
    };
  }, [showScenes, introPlaying]);

  const closeScenes = () => {
    setShowScenes(false);
    scenesButtonRef.current?.focus({ preventScroll: true });
  };

  return (
    <div
      className={`home-playback${reducedMotion ? " is-static" : ""}`}
      data-home-player=""
      data-playback-mode={mode}
      data-playback-chapter={currentChapter.id}
      data-artwork-status={artworkStatus}
      ref={playerRef}
      onBlur={(event) => {
        // Safari can clear focus on pointerdown before a scene receives click.
        // Outside pointer presses are dismissed separately; only a real focus
        // destination should close the directory during keyboard navigation.
        if (
          event.relatedTarget &&
          !event.currentTarget.contains(event.relatedTarget)
        )
          setShowScenes(false);
      }}
    >
      {/* Waiting and failed layers stay silent during playback: a card in the
          middle of a live walkthrough reads as breakage. Retry controls only
          appear once the reader takes manual control. */}
      {!introPlaying && mode === "manual" && artworkStatus === "error" && (
        <div className="home-playback-loading" role="status" aria-live="polite">
          <p>Some scene images could not load.</p>
          <p className="home-playback-loading-scene">{artworkChapter}</p>
          <div className="home-playback-loading-actions">
            <button type="button" onClick={retryArtwork}>Retry images</button>
            <button type="button" onClick={() => window.location.reload()}>Reload page</button>
          </div>
        </div>
      )}
      <div
        className="home-playback-scenes"
        data-open={showScenes && !introPlaying}
        inert={!showScenes || introPlaying}
        aria-hidden={!showScenes || introPlaying}
        id={`${id}-scenes`}
        ref={panelRef}
        role="dialog"
        aria-labelledby={`${id}-scenes-title`}
      >
        <div className="home-playback-scenes-heading">
          <h2 id={`${id}-scenes-title`}>Scenes</h2>
          {!reducedMotion && (
            <button
              className="home-playback-speed"
              type="button"
              aria-label={`Playback speed ${rate} times; change to ${nextRate} times`}
              title={`Playback speed · ${rate}× → ${nextRate}×`}
              onClick={() => setRate(nextRate)}
            >
              {rate}×
            </button>
          )}
          <button
            className="home-playback-close"
            type="button"
            onClick={closeScenes}
            aria-label="Close scene list"
          >
            <X size={18} strokeWidth={1.5} aria-hidden="true" />
          </button>
        </div>
        <ol className="home-playback-scene-list" ref={listRef}>
          {chapters.map((chapter, index) => (
            <li
              key={chapter.id}
              style={{ "--scene-order": index } as CSSProperties}
            >
              <button
                type="button"
                aria-current={index === chapterIndex ? "step" : undefined}
                onClick={() => {
                  seekChapter(index);
                  closeScenes();
                }}
              >
                <span className="home-playback-scene-number" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="home-playback-scene-title">
                  {chapter.title}
                </span>
                <ArrowRight
                  className="home-playback-scene-arrow"
                  size={15}
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
              </button>
            </li>
          ))}
        </ol>
      </div>

      <div
        className="home-playback-bar"
        role="group"
        aria-label="Story playback"
      >
        {!reducedMotion && (
          <button
            className="home-playback-toggle"
            type="button"
            onClick={() => {
              setShowScenes(false);
              toggle();
            }}
            aria-label={playLabel}
            title={playLabel}
            aria-pressed={mode === "playing"}
          >
            {ended ? (
              <RotateCcw size={16} aria-hidden="true" />
            ) : mode === "playing" ? (
              <Pause
                size={15}
                fill="currentColor"
                strokeWidth={1.5}
                aria-hidden="true"
              />
            ) : (
              <Play
                size={15}
                fill="currentColor"
                strokeWidth={1.5}
                aria-hidden="true"
              />
            )}
          </button>
        )}
        <button
          className="home-playback-scenes-toggle"
          type="button"
          ref={scenesButtonRef}
          disabled={introPlaying}
          onClick={() => {
            if (!showScenes && mode === "playing") toggle();
            setShowScenes((visible) => !visible);
          }}
          aria-label="Choose a story scene"
          aria-haspopup="dialog"
          aria-expanded={showScenes}
          aria-controls={`${id}-scenes`}
          title={`${String(chapterIndex + 1).padStart(2, "0")} / ${chapters.length} · ${currentChapter.title}`}
        >
          <List size={19} strokeWidth={1.5} aria-hidden="true" />
        </button>
        <div
          className="home-playback-progress"
          role="progressbar"
          aria-label="Story progress"
          aria-orientation="vertical"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={percent}
        >
          <span style={{ transform: `scaleY(${progress})` }} />
        </div>
      </div>
      <span className="home-playback-sr" role="status" aria-live="polite">
        {introPlaying
          ? mode === "playing"
            ? "Automatic story playback will start after the introduction."
            : "Automatic story playback is off. The introduction will continue."
          : artworkStatus !== "ready"
            ? "Story waiting for scene images."
            : reducedMotion
              ? "Reduced motion is on. Story playback is in static view."
              : ended
                ? "Story complete. Replay is available."
                : mode === "playing"
                  ? "Story playing. Scroll or use the arrow keys to pause."
                  : mode === "paused"
                    ? "Story paused."
                    : "Automatic story playback is available."}
      </span>
    </div>
  );
}
