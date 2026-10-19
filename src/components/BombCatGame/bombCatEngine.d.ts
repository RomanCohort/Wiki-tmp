export interface BombCatEngineOptions {
  gameUrl: string;
  // Kept compatible with the integration API requested by the Wiki.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onGameComplete?: (stats: any) => void;
  onRequestClose?: () => void;
  onLoadError?: () => void;
}

export function initializeBombCatGame(
  container: HTMLElement,
  options: BombCatEngineOptions,
): () => void;
