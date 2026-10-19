/**
 * Shared SDG interaction network data for the Sustainability page.
 *
 * Provenance: 文案集/Human Practice/sustainability/SDG 模型构建.pdf (Appendix B
 * Table B.1) — the 99 directed interaction edges also appear in
 * `D:/Download/Qwen_html_20260815_x7bv4g4hn.html` ("SDG-NEXUS 17 Chord") and in
 * the `M` matrix of `SdgInteractionHeatmap.tsx`. Keeping them here as a single
 * source of truth lets the chord diagram, heatmap and boundary matrix stay in
 * sync without duplicating the numbers.
 */

export interface SdgNetworkEdge {
  source: number;
  target: number;
  value: number;
}

export interface SdgNetworkMeta {
  id: number;
  name: string;
  color: string;
}

export interface SdgNetworkDimension {
  name: string;
  color: string;
}

/** Appendix B Table B.1 — 99 directed [source, target, score] edges. */
export const SDG_EDGES: ReadonlyArray<SdgNetworkEdge> = [
  [1, 2, 0.92], [1, 3, 0.59], [1, 4, 0.92], [1, 10, 0.59], [1, 11, 0.26], [1, 16, 0.59],
  [2, 3, 0.89], [2, 6, -0.4], [2, 15, -0.63],
  [3, 1, 0.92], [3, 4, 0.92], [3, 8, 0.59], [3, 11, 0.59],
  [4, 1, 0.92], [4, 3, 0.59], [4, 5, 0.92], [4, 7, 0.59], [4, 8, 0.92], [4, 9, 0.59], [4, 10, 0.59], [4, 12, 0.59], [4, 13, 0.59], [4, 16, 0.59], [4, 17, 0.29],
  [5, 1, 0.26], [5, 2, 0.59], [5, 4, 0.26], [5, 10, 0.26], [5, 16, 0.59],
  [6, 2, 0.59], [6, 3, 0.92], [6, 7, 0.17], [6, 11, 0.59], [6, 14, 0.29], [6, 15, 0.26],
  [7, 2, 0.26], [7, 4, 0.59], [7, 6, -0.17], [7, 8, 0.59], [7, 9, 0.59], [7, 12, 0.59], [7, 13, 0.92], [7, 15, -0.28],
  [8, 1, 0.92], [8, 5, 0.59], [8, 7, 0.26], [8, 9, 0.59], [8, 10, 0.59], [8, 11, 0.59], [8, 12, -0.64], [8, 13, -0.71], [8, 14, -0.39], [8, 15, -0.63], [8, 17, 0.29],
  [9, 4, 0.59], [9, 6, 0.59], [9, 7, 0.59], [9, 8, 0.89], [9, 11, 0.89], [9, 12, 0.26], [9, 13, -0.51], [9, 14, -0.34], [9, 15, -0.56], [9, 17, 0.29],
  [10, 1, 0.92], [10, 5, 0.26], [10, 7, 0.59], [10, 8, 0.26], [10, 9, 0.59], [10, 12, 0.59], [10, 13, 0.59],
  [11, 6, -0.28], [11, 12, 0.59], [11, 13, 0.26], [11, 14, -0.34], [11, 15, -0.56],
  [12, 7, 0.59], [12, 9, 0.26], [12, 13, 0.92], [12, 14, 0.29],
  [13, 6, 0.59], [13, 14, 0.9], [13, 15, 0.9],
  [14, 2, 0.92], [14, 13, 0.52], [14, 15, 0.29],
  [15, 2, 0.59], [15, 3, 0.26], [15, 14, 0.29],
  [16, 1, 0.59], [16, 5, 0.92], [16, 6, 0.59], [16, 10, 0.59], [16, 15, 0.6], [16, 17, 0.29],
  [17, 5, 0.59], [17, 6, 0.59], [17, 15, 0.29], [17, 16, 0.59],
].map(([source, target, value]) => ({ source, target, value }));

/** 17 SDG names + official UN colours. */
export const SDG_META: ReadonlyArray<SdgNetworkMeta> = [
  { id: 1, name: "No Poverty", color: "#E5243B" },
  { id: 2, name: "Zero Hunger", color: "#DDA63A" },
  { id: 3, name: "Good Health and Well-Being", color: "#4C9F38" },
  { id: 4, name: "Quality Education", color: "#C5192D" },
  { id: 5, name: "Gender Equality", color: "#FF3A21" },
  { id: 6, name: "Clean Water and Sanitation", color: "#26BDE2" },
  { id: 7, name: "Affordable and Clean Energy", color: "#FCC30B" },
  { id: 8, name: "Decent Work and Economic Growth", color: "#A21942" },
  { id: 9, name: "Industry, Innovation and Infrastructure", color: "#FD6925" },
  { id: 10, name: "Reduced Inequalities", color: "#DD1367" },
  { id: 11, name: "Sustainable Cities and Communities", color: "#FD9D24" },
  { id: 12, name: "Responsible Consumption and Production", color: "#BF8B2E" },
  { id: 13, name: "Climate Action", color: "#3F7E44" },
  { id: 14, name: "Life Below Water", color: "#0A97D9" },
  { id: 15, name: "Life on Land", color: "#56C02B" },
  { id: 16, name: "Peace, Justice and Strong Institutions", color: "#00689D" },
  { id: 17, name: "Partnerships for the Goals", color: "#19486A" },
];

export const SDG_DIMENSIONS: ReadonlyArray<SdgNetworkDimension> = [
  { name: "Social Dimension", color: "#64748b" },
  { name: "Economic Dimension", color: "#475569" },
  { name: "Environmental Dimension", color: "#334155" },
];

/** 0 = Social, 1 = Economic, 2 = Environmental (keyed by SDG id 1..17). */
export const SDG_DIMENSION_OF: Readonly<Record<number, number>> = {
  1: 1, 2: 1, 8: 1, 9: 1, 17: 1,
  3: 0, 4: 0, 5: 0, 10: 0, 11: 0, 16: 0,
  6: 2, 7: 2, 12: 2, 13: 2, 14: 2, 15: 2,
};
