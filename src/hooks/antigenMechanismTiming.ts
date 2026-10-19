// Editorial seconds, not biological time. The diagram and player share a clock.
export const ANTIGEN_STAGE_STARTS = {
  sequence: 0,
  translation: 0.35,
  processing: 4,
  priming: 6.4,
  activated: 8.8,
  recognition: 11.2,
  cytotoxic: 13.4,
  apoptosis: 15,
} as const;

export const ANTIGEN_MECHANISM_DURATION = ANTIGEN_STAGE_STARTS.apoptosis + 1.6;
// Read the completed result before the player swaps the antigen sequence.
export const ANTIGEN_PLAYBACK_HOLD = ANTIGEN_MECHANISM_DURATION + 2.4;
