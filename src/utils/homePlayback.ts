export const HOME_PLAYBACK_STATE_EVENT = "circure:home-playback-state";
export const HOME_PLAYBACK_ANTIGEN_EVENT = "circure:home-playback-antigen";

export type HomePlaybackMode = "manual" | "playing" | "paused";
export type HomePlaybackState = { mode: HomePlaybackMode; rate: number };

export function readHomePlaybackState(): HomePlaybackState {
  const root = document.documentElement;
  return {
    mode:
      (root.dataset.homePlayback as HomePlaybackMode | undefined) ?? "manual",
    rate: Number(root.dataset.homePlaybackRate) || 1,
  };
}

// The player and independent scene clocks share this small browser contract.
export function publishHomePlaybackState(state: HomePlaybackState) {
  document.documentElement.dataset.homePlayback = state.mode;
  document.documentElement.dataset.homePlaybackRate = String(state.rate);
  window.dispatchEvent(
    new CustomEvent<HomePlaybackState>(HOME_PLAYBACK_STATE_EVENT, {
      detail: state,
    }),
  );
}
