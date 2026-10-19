/**
 * Pure data for the 17 candidate epitope structural validation.
 * Sourced from the raw PyMOL/SASA pipeline batch outputs.
 *
 * Contains:
 * 1. Per-position side-chain burial matrix across 5 models (Heatmap data)
 * 2. Position-9 anchor side-chain buried volume (mean ± 1 SD) & fill ratio relative to 140 Å² Leu reference (Bar chart data)
 */

export interface EpitopeHeatmapRow {
  peptide: string;
  target: "TROP2" | "B7-H4" | "Nectin-4" | "LIV-1";
  targetColor: string;
  passed: boolean;
  /** P1 to P9 side-chain burial percentage (0-100), null for glycine (no side chain) */
  values: (number | null)[];
}

export interface EpitopeVolumeRow {
  peptide: string;
  resn: string;
  mean: number;
  sd: number;
  fill: number;
  passed: boolean;
}

export interface AntigenGroupInfo {
  name: "TROP2" | "B7-H4" | "Nectin-4" | "LIV-1";
  color: string;
  startIndex: number;
  count: number;
}

export const EPITOPE_HEATMAP_DATA: EpitopeHeatmapRow[] = [
  // --- TROP2 (4) ---
  {
    peptide: "RLFRERYRL",
    target: "TROP2",
    targetColor: "#207062",
    passed: true,
    values: [61.9, 99.8, 87.8, 10.5, 95.3, 17.7, 81.7, 38.0, 99.7],
  },
  {
    peptide: "SVCWCVNSV",
    target: "TROP2",
    targetColor: "#207062",
    passed: true,
    values: [92.3, 99.8, 96.1, 32.7, 79.4, 75.7, 67.1, 57.7, 100.0],
  },
  {
    peptide: "TLIYYLDEI",
    target: "TROP2",
    targetColor: "#207062",
    passed: true,
    values: [90.4, 99.8, 85.0, 22.8, 18.5, 96.9, 63.3, 47.3, 100.0],
  },
  {
    peptide: "YLDEIPPKF",
    target: "TROP2",
    targetColor: "#207062",
    passed: true,
    values: [64.0, 99.8, 76.1, 33.7, 30.6, 98.1, 88.9, 40.0, 99.4],
  },
  // --- B7-H4 (2) ---
  {
    peptide: "AVFADQVIV",
    target: "B7-H4",
    targetColor: "#b06b2a",
    passed: true,
    values: [96.4, 99.8, 88.9, 22.4, 51.6, 30.6, 90.9, 44.3, 100.0],
  },
  {
    peptide: "WLKEGVLGL",
    target: "B7-H4",
    targetColor: "#b06b2a",
    passed: true,
    values: [66.1, 99.8, 86.9, 39.2, null, 92.6, 56.5, null, 99.9],
  },
  // --- Nectin-4 (6) ---
  {
    peptide: "AVTSEFHLV",
    target: "Nectin-4",
    targetColor: "#2c5fa8",
    passed: true,
    values: [96.4, 99.9, 93.2, 21.6, 52.0, 69.1, 73.5, 48.7, 100.0],
  },
  {
    peptide: "FLAEASVRG",
    target: "Nectin-4",
    targetColor: "#2c5fa8",
    passed: false,
    values: [69.9, 99.8, 88.7, 35.2, 38.4, 86.0, 67.8, 32.6, null],
  },
  {
    peptide: "FQARLRLRV",
    target: "Nectin-4",
    targetColor: "#2c5fa8",
    passed: true,
    values: [71.4, 99.0, 92.4, 18.8, 84.8, 10.8, 89.3, 36.5, 100.0],
  },
  {
    peptide: "HILHVSFLA",
    target: "Nectin-4",
    targetColor: "#2c5fa8",
    passed: false,
    values: [74.2, 99.9, 91.1, 16.7, 19.7, 84.7, 76.6, 45.0, 99.4],
  },
  {
    peptide: "RLRVLVPPL",
    target: "Nectin-4",
    targetColor: "#2c5fa8",
    passed: true,
    values: [59.9, 99.8, 92.2, 17.4, 17.8, 95.3, 71.1, 35.6, 100.0],
  },
  {
    peptide: "YINGRGHLV",
    target: "Nectin-4",
    targetColor: "#2c5fa8",
    passed: true,
    values: [62.6, 99.9, 85.5, null, 19.5, null, 79.9, 50.2, 100.0],
  },
  // --- LIV-1 (5) ---
  {
    peptide: "FIGHYAENV",
    target: "LIV-1",
    targetColor: "#9d384b",
    passed: true,
    values: [75.1, 99.9, null, 28.8, 61.1, 91.8, 54.6, 59.5, 100.0],
  },
  {
    peptide: "GLHNFSDGL",
    target: "LIV-1",
    targetColor: "#9d384b",
    passed: true,
    values: [null, 99.7, 88.1, 39.1, 19.9, 79.1, 59.2, null, 99.7],
  },
  {
    peptide: "GVATLAWMV",
    target: "LIV-1",
    targetColor: "#9d384b",
    passed: true,
    values: [null, 99.8, 91.7, 14.5, 18.8, 94.9, 81.2, 42.1, 100.0],
  },
  {
    peptide: "SVAVFCHEL",
    target: "LIV-1",
    targetColor: "#9d384b",
    passed: true,
    values: [93.1, 99.8, 89.1, 20.3, 48.8, 66.8, 79.2, 44.1, 99.7],
  },
  {
    peptide: "TVSEGTHFL",
    target: "LIV-1",
    targetColor: "#9d384b",
    passed: true,
    values: [92.1, 99.8, 79.7, 36.0, null, 69.0, 81.6, 42.9, 99.7],
  },
];

export const ANTIGEN_GROUPS: AntigenGroupInfo[] = [
  { name: "TROP2", color: "#207062", startIndex: 0, count: 4 },
  { name: "B7-H4", color: "#b06b2a", startIndex: 4, count: 2 },
  { name: "Nectin-4", color: "#2c5fa8", startIndex: 6, count: 6 },
  { name: "LIV-1", color: "#9d384b", startIndex: 12, count: 5 },
];

export const EPITOPE_VOLUME_DATA: EpitopeVolumeRow[] = [
  { peptide: "YLDEIPPKF", resn: "Phe", mean: 173.3, sd: 0.53, fill: 124, passed: true },
  { peptide: "RLFRERYRL", resn: "Leu", mean: 143.8, sd: 0.59, fill: 103, passed: true },
  { peptide: "WLKEGVLGL", resn: "Leu", mean: 140.2, sd: 0.22, fill: 100, passed: true },
  { peptide: "TLIYYLDEI", resn: "Ile", mean: 140.0, sd: 0.42, fill: 100, passed: true },
  { peptide: "GLHNFSDGL", resn: "Leu", mean: 139.8, sd: 0.76, fill: 100, passed: true },
  { peptide: "SVAVFCHEL", resn: "Leu", mean: 139.8, sd: 1.78, fill: 100, passed: true },
  { peptide: "RLRVLVPPL", resn: "Leu", mean: 139.6, sd: 2.83, fill: 100, passed: true },
  { peptide: "TVSEGTHFL", resn: "Leu", mean: 139.5, sd: 0.99, fill: 100, passed: true },
  { peptide: "AVFADQVIV", resn: "Val", mean: 115.1, sd: 1.18, fill: 82, passed: true },
  { peptide: "SVCWCVNSV", resn: "Val", mean: 114.4, sd: 1.05, fill: 82, passed: true },
  { peptide: "AVTSEFHLV", resn: "Val", mean: 114.3, sd: 0.29, fill: 82, passed: true },
  { peptide: "FIGHYAENV", resn: "Val", mean: 113.9, sd: 0.29, fill: 81, passed: true },
  { peptide: "FQARLRLRV", resn: "Val", mean: 113.7, sd: 1.18, fill: 81, passed: true },
  { peptide: "YINGRGHLV", resn: "Val", mean: 113.5, sd: 0.33, fill: 81, passed: true },
  { peptide: "GVATLAWMV", resn: "Val", mean: 113.3, sd: 0.61, fill: 81, passed: true },
  { peptide: "HILHVSFLA", resn: "Ala", mean: 60.1, sd: 0.39, fill: 43, passed: false },
  { peptide: "FLAEASVRG", resn: "Gly", mean: 0.0, sd: 0.0, fill: 0, passed: false },
];

export const POSITIONS = ["P1", "P2", "P3", "P4", "P5", "P6", "P7", "P8", "P9"] as const;
