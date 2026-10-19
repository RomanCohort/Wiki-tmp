export interface BreastGuardianEngineOptions {
  gameUrl: string;
  initialChapter?: "childhood" | "youth" | "elderly";
  // Kept compatible with the integration API requested by the Wiki.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onGameComplete?: (stats: any) => void;
  onQuizAnswer?: (questionId: string, isCorrect: boolean) => void;
  onRequestClose?: () => void;
}

export function initializeBreastGuardianGame(
  container: HTMLElement,
  options: BreastGuardianEngineOptions,
): () => void;
