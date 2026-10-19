import metaData from "../assets/structures/trop2-ctl1-meta.json";

export interface PolarContact {
  start: [number, number, number];
  end: [number, number, number];
}

export const TROP2_COMPLEX_DATA = {
  title: "Trop2-CTL1 (SVCWCVNSV) in HLA-A*02:01 / B2M",
  epitopeSequence: "SVCWCVNSV",
  chains: {
    A: "HLA-A*02:01 Heavy Chain (275 residues)",
    B: "β2-Microglobulin (99 residues)",
    C: "Trop2-CTL1 Core Epitope (9 residues)",
  },
  pocketResiduesChainA: metaData.pocketResiduesChainA as number[],
  pocketLabels: metaData.pocketLabels as unknown as Record<
    string,
    [number, number, number]
  >,
  polarContacts: metaData.polarContacts as PolarContact[],
  viewMatrix: metaData.viewMatrix as number[],
  statistics: {
    totalAtoms: 6098,
    totalResidues: 383,
    polarContactsCount: metaData.polarContacts.length,
    pocketResiduesCount: metaData.pocketResiduesChainA.length,
  },
};
