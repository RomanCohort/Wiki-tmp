import { useCallback, useEffect, useRef, useState } from "react";
import { initializeBreastGuardianGame } from "./gameEngine";
import "./index.css";

export interface BreastGuardianGameProps {
  initialChapter?: "childhood" | "youth" | "elderly";
  // Kept compatible with the integration API requested by the Wiki.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onGameComplete?: (stats: any) => void;
  onQuizAnswer?: (questionId: string, isCorrect: boolean) => void;
  onRequestClose?: () => void;
  className?: string;
}

const SPRITES = [
  "https://static.igem.wiki/teams/6056/wiki/files/pages/games/breast-guardian/asset-8f186094407d9c6f.avif",
  "https://static.igem.wiki/teams/6056/wiki/files/pages/games/breast-guardian/asset-7fa40ddbd4448803.avif",
  "https://static.igem.wiki/teams/6056/wiki/files/pages/games/breast-guardian/asset-819d0baf4b0f6860.avif",
];

export default function BreastGuardianGame({
  initialChapter,
  onGameComplete,
  onQuizAnswer,
  onRequestClose,
  className,
}: BreastGuardianGameProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const onGameCompleteRef = useRef(onGameComplete);
  const onQuizAnswerRef = useRef(onQuizAnswer);
  const onRequestCloseRef = useRef(onRequestClose);

  const [loading, setLoading] = useState(true);
  const [spriteIndex, setSpriteIndex] = useState(0);
  const dismissedRef = useRef(false);

  const dismiss = useCallback(() => {
    if (dismissedRef.current) return;
    dismissedRef.current = true;
    setLoading(false);
  }, []);

  useEffect(() => {
    onGameCompleteRef.current = onGameComplete;
    onQuizAnswerRef.current = onQuizAnswer;
    onRequestCloseRef.current = onRequestClose;
  }, [onGameComplete, onQuizAnswer, onRequestClose]);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const gameUrl = `${import.meta.env.BASE_URL}game-assets/index.html`;

    const cleanup = initializeBreastGuardianGame(host, {
      gameUrl,
      initialChapter,
      onGameComplete: (stats) => onGameCompleteRef.current?.(stats),
      onQuizAnswer: (questionId, isCorrect) =>
        onQuizAnswerRef.current?.(questionId, isCorrect),
      onRequestClose: () => onRequestCloseRef.current?.(),
    });

    const frame = host.querySelector("iframe");

    // Signal 1: iframe document finished loading — give the game a beat to
    // paint its first frame before we lift the overlay.
    let dismissTimer = 0;
    const onFrameLoad = () => {
      dismissTimer = window.setTimeout(dismiss, 600);
    };
    frame?.addEventListener("load", onFrameLoad);

    // Signal 2: the game posts an explicit "ready" message after init — more
    // accurate than load, so dismiss immediately when it arrives.
    const onMessage = (event: MessageEvent) => {
      if (frame && event.source !== frame.contentWindow) return;
      if (
        event.data?.source === "breast-guardian-game" &&
        event.data?.type === "breast-guardian:ready"
      ) {
        dismiss();
      }
    };
    window.addEventListener("message", onMessage);

    // Safety net: never trap the user behind a stuck loading overlay.
    const fallback = window.setTimeout(dismiss, 15000);

    return () => {
      frame?.removeEventListener("load", onFrameLoad);
      window.removeEventListener("message", onMessage);
      window.clearTimeout(dismissTimer);
      window.clearTimeout(fallback);
      cleanup();
    };
  }, [initialChapter, dismiss]);

  // Rotate pixel-art portraits while the overlay is visible.
  useEffect(() => {
    if (!loading) return;
    const id = window.setInterval(
      () => setSpriteIndex((i) => (i + 1) % SPRITES.length),
      1800,
    );
    return () => window.clearInterval(id);
  }, [loading]);

  const rootClassName = ["breast-guardian-game-root", className]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={rootClassName} data-breast-guardian-game="">
      <div ref={hostRef} className="breast-guardian-game-host" />
      <div
        className={`bg-loading${loading ? "" : " is-hidden"}`}
        role="status"
        aria-live="polite"
      >
        <img
          key={spriteIndex}
          className="bg-loading__sprite"
          src={SPRITES[spriteIndex]}
          alt=""
        />
        <span className="bg-loading__text">
          Loading
          <span className="bg-loading__dots" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
        </span>
      </div>
    </div>
  );
}
