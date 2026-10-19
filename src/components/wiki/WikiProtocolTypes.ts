// Shared reader props retained for the Description page. No protocol records are published here.
export interface ExperimentProtocolPair {
  key: string;
  section: string;
  code: string;
  title: string;
  shortTitle: string;
  targetId: string;
  flowPage: number;
  inventoryPage: number;
  flowSize: [number, number];
  inventorySize: [number, number];
  boundary?: string;
}

export function experimentProtocolImage(page: number): string {
  return `https://static.igem.wiki/teams/6056/wiki/files/pages/wet-lab/protocol/protocol-${String(page).padStart(2, "0")}.webp`;
}
