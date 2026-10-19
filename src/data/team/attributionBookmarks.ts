/** Dynamic responsive section distribution profiles for the official iGEM attribution form.
 * Ratios represent proportional offsets of sections [ai-tool-use, igem-partner-offers, external-contributions, timeline]
 * relative to the live reported form height. Section 0 (team-member-contributions) sits right below the header.
 */
interface ResponsiveProfile {
  minWidth: number;
  fallbackHeight: number;
  topOffset: number;
  ratios: readonly [number, number, number, number];
}

const PROFILES: readonly ResponsiveProfile[] = [
  {
    minWidth: 0,
    fallbackHeight: 22000,
    topOffset: 240,
    ratios: [0.535, 0.575, 0.635, 0.985],
  },
  {
    minWidth: 640,
    fallbackHeight: 21500,
    topOffset: 192,
    ratios: [0.55, 0.595, 0.648, 0.985],
  },
  {
    minWidth: 768,
    fallbackHeight: 13800,
    topOffset: 192,
    ratios: [0.548, 0.595, 0.664, 0.976],
  },
  {
    minWidth: 1024,
    fallbackHeight: 11500,
    topOffset: 144,
    ratios: [0.615, 0.65, 0.712, 0.972],
  },
];

export function getAttributionBookmarks(
  width: number,
  reportedHeight?: number | null,
) {
  const upper =
    PROFILES.find((p) => p.minWidth >= width) ?? PROFILES[PROFILES.length - 1];
  const lower =
    PROFILES.slice()
      .reverse()
      .find((p) => p.minWidth <= width) ?? PROFILES[0];
  const fraction =
    lower.minWidth === upper.minWidth
      ? 0
      : (width - lower.minWidth) / (upper.minWidth - lower.minWidth);

  const lerp = (a: number, b: number) => a + (b - a) * fraction;

  const contentHeight =
    reportedHeight && reportedHeight > 0
      ? reportedHeight
      : Math.round(lerp(lower.fallbackHeight, upper.fallbackHeight));

  const topOffset = Math.round(lerp(lower.topOffset, upper.topOffset));
  const ratios = lower.ratios.map((r, i) => lerp(r, upper.ratios[i]));

  return {
    contentHeight,
    offsets: [
      topOffset,
      ...ratios.map((ratio) => Math.round(ratio * contentHeight)),
    ],
  };
}
