const MESSAGE_SOURCE = "breast-guardian-game";

/**
 * Mount the prebuilt Breast Guardian game in its own browsing context.
 * Destroying the iframe also destroys every listener, timer and audio object
 * created by the standalone game bundle.
 */
export function initializeBreastGuardianGame(container, options) {
  const {
    gameUrl,
    initialChapter,
    onGameComplete,
    onQuizAnswer,
    onRequestClose,
  } = options;
  const url = new URL(gameUrl, window.location.origin);

  if (initialChapter) {
    url.searchParams.set("initialChapter", initialChapter);
  }

  const frame = document.createElement("iframe");
  frame.className = "breast-guardian-game-frame";
  frame.title = "乳腺守护者——乳腺癌科普互动 RPG";
  frame.src = url.toString();
  frame.allow = "autoplay; fullscreen";
  frame.setAttribute("allowfullscreen", "");
  frame.setAttribute("sandbox", "allow-scripts allow-same-origin");

  const handleMessage = (event) => {
    if (event.origin !== window.location.origin) return;
    if (event.source !== frame.contentWindow) return;
    if (!event.data || event.data.source !== MESSAGE_SOURCE) return;

    switch (event.data.type) {
      case "breast-guardian:ready":
        container.dataset.gameReady = "true";
        break;
      case "breast-guardian:complete":
        onGameComplete?.(event.data.stats ?? {});
        break;
      case "breast-guardian:quiz-answer":
        onQuizAnswer?.(
          String(event.data.questionId ?? ""),
          Boolean(event.data.isCorrect),
        );
        break;
      case "breast-guardian:close":
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

    // Navigating away first stops media and pending network activity promptly.
    frame.src = "about:blank";
    frame.remove();
  };
}
