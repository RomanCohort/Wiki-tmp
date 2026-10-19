import { useEffect, useRef, useState } from "react";
import "./index.css";

export interface BioMemoryGameProps {
  // Kept compatible with the integration API used by the other game embeds.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onGameComplete?: (stats: any) => void;
  onRequestClose?: () => void;
  className?: string;
}

export default function BioMemoryGame({
  onGameComplete,
  onRequestClose,
  className,
}: BioMemoryGameProps) {
  const frameRef = useRef<HTMLIFrameElement>(null);
  const onGameCompleteRef = useRef(onGameComplete);
  const onRequestCloseRef = useRef(onRequestClose);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    onGameCompleteRef.current = onGameComplete;
    onRequestCloseRef.current = onRequestClose;
  }, [onGameComplete, onRequestClose]);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;

    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return;
      if (event.source !== frame.contentWindow) return;
      if (event.data?.source !== "bio-memory-match") return;

      if (event.data.type === "bio-memory:complete") {
        onGameCompleteRef.current?.(event.data.stats ?? {});
      }
      if (event.data.type === "bio-memory:close") {
        onRequestCloseRef.current?.();
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  const rootClassName = ["bio-memory-game-root", className]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={rootClassName} data-bio-memory-game="">
      {failed ? (
        <p className="bio-memory-game-error" role="alert">
          游戏资源加载失败，请刷新页面重试。
        </p>
      ) : (
        <iframe
          ref={frameRef}
          className="bio-memory-game-frame"
          title="生物翻翻乐 · 生物志配对考察"
          src={`${import.meta.env.BASE_URL}game-assets/bio-memory/index.html`}
          allow="fullscreen"
          allowFullScreen
          sandbox="allow-scripts allow-same-origin"
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}
