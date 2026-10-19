/** Geometry and labels from the supplied single-ring SVG. Angles run clockwise. */
export interface ExperimentRingStage {
  number: string;
  color: string;
  label: string;
  angle: number;
  start: number;
  end: number;
  nodes: { key: string; label: string; angle: number }[];
}

export const experimentRingStages: ExperimentRingStage[] = [
  {
    number: "1",
    color: "#5F84A0",
    label: "Construction & IVT",
    angle: -82.4604,
    start: -94.6997,
    end: -70.2233,
    nodes: [
      {
        key: "1-1",
        label: "circRNA Synthesis",
        angle: -82.4604,
      },
    ],
  },
  {
    number: "2",
    color: "#6E9A80",
    label: "Round 1 Screening",
    angle: -35.077,
    start: -67.6232,
    end: -2.5309,
    nodes: [
      {
        key: "2-1",
        label: "DC Prep & Electroporation",
        angle: -60.1234,
      },
      {
        key: "2-2",
        label: "T Cell Isolation & Co-culture",
        angle: -47.6006,
      },
      {
        key: "2-3",
        label: "ELISpot (Round 1)",
        angle: -35.0775,
      },
      {
        key: "2-4",
        label: "Killing Assay (K562)",
        angle: -22.5525,
      },
      {
        key: "2-5",
        label: "TROP2 Epitope Flow",
        angle: -10.0301,
      },
    ],
  },
  {
    number: "3",
    color: "#A98D58",
    label: "Combined Vaccine",
    angle: 12.3085,
    start: 0.0688,
    end: 24.5462,
    nodes: [
      {
        key: "3-1",
        label: "Combined circRNA & Release",
        angle: 12.3085,
      },
    ],
  },
  {
    number: "4",
    color: "#9C6A80",
    label: "Round 2 Validation",
    angle: 59.6936,
    start: 27.1464,
    end: 92.2383,
    nodes: [
      {
        key: "4-1",
        label: "DC Maturation",
        angle: 34.6448,
      },
      {
        key: "4-2",
        label: "Anti-FLAG Western Blot",
        angle: 47.1693,
      },
      {
        key: "4-3",
        label: "T Cell Activation & Memory",
        angle: 59.6925,
      },
      {
        key: "4-4",
        label: "ELISpot (Round 2)",
        angle: 72.2157,
      },
      {
        key: "4-5",
        label: "Specific Killing (MDA-MB-231)",
        angle: 84.7383,
      },
    ],
  },
  {
    number: "5",
    color: "#7E7D9E",
    label: "In Vitro Safety",
    angle: 113.8483,
    start: 94.8389,
    end: 132.8538,
    nodes: [
      {
        key: "5-1",
        label: "circRNA Stability",
        angle: 98.8179,
      },
      {
        key: "5-2",
        label: "Off-target Cytotoxicity",
        angle: 113.8461,
      },
      {
        key: "5-3",
        label: "LNP Dose Window",
        angle: 128.8743,
      },
    ],
  },
  {
    number: "6",
    color: "#5F9794",
    label: "Target Cell Model",
    angle: 161.2315,
    start: 135.4539,
    end: 187.008,
    nodes: [
      {
        key: "6-1",
        label: "Lentiviral Transduction",
        angle: 151.2123,
      },
      {
        key: "6-2",
        label: "GFP+ Sorting",
        angle: 161.2312,
      },
      {
        key: "6-3",
        label: "TROP2 mRNA RT-PCR",
        angle: 171.25,
      },
      {
        key: "6-4",
        label: "Surface TROP2 Flow",
        angle: 181.2688,
      },
    ],
  },
  {
    number: "7",
    color: "#9C7B64",
    label: "In Vivo Efficacy",
    angle: -137.8463,
    start: -170.392,
    end: -105.2995,
    nodes: [
      {
        key: "7-1",
        label: "Tumour Model",
        angle: -162.8924,
      },
      {
        key: "7-2",
        label: "Antitumour Effect",
        angle: -150.3699,
      },
      {
        key: "7-3",
        label: "Intratumoural CD8 / GzmB",
        angle: -137.8468,
      },
      {
        key: "7-4",
        label: "Splenocyte Flow",
        angle: -125.3223,
      },
      {
        key: "7-5",
        label: "Intracellular Cytokine Staining",
        angle: -112.7991,
      },
    ],
  },
];
