const MESSAGE_SOURCE = "bomb-cat-game";

/**
 * Mount the standalone Bomb Cat build in an isolated browsing context.
 * Removing the iframe also stops its timers, network connections and UI.
 */
export function initializeBombCatGame(container, options) {
  const { gameUrl, onGameComplete, onRequestClose, onLoadError } = options;
  const frame = document.createElement("iframe");
  frame.className = "bomb-cat-game-frame";
  frame.title = "circRNA 爆炸猫卡牌游戏";
  frame.src = new URL(gameUrl, window.location.origin).toString();
  frame.allow = "fullscreen";
  frame.setAttribute("allowfullscreen", "");
  frame.setAttribute("sandbox", "allow-scripts allow-same-origin");
  frame.addEventListener("error", () => onLoadError?.());

  const handleMessage = (event) => {
    if (event.origin !== window.location.origin) return;
    if (event.source !== frame.contentWindow) return;
    if (!event.data || event.data.source !== MESSAGE_SOURCE) return;

    switch (event.data.type) {
      case "bomb-cat:ready":
        container.dataset.gameReady = "true";
        break;
      case "bomb-cat:complete":
        onGameComplete?.(event.data.stats ?? {});
        break;
      case "bomb-cat:close":
        onRequestClose?.();
        break;
      default:
        break;
    }
  };

  window.addEventListener("message", handleMessage);
  container.replaceChildren(frame);

  return () => {
    window.removeEventListener("message", handleMessage);
    delete container.dataset.gameReady;
    frame.src = "about:blank";
    frame.remove();
  };
}
