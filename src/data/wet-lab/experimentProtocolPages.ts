import { experimentProtocolSize } from "./experimentProtocolAssets";
export {
  experimentProtocolImage,
  experimentProtocolLocalImage,
} from "./experimentProtocolAssets";

export interface ExperimentProtocolPair {
  key: string;
  section: string;
  sectionNumber: string;
  code: string;
  title: string;
  shortTitle: string;
  targetId: string;
  flowPage?: number;
  inventoryPage?: number;
  flowSize?: [number, number];
  inventorySize?: [number, number];
  boundary?: string;
  hasFigure: boolean;
}

export interface ExperimentProtocolSection {
  index: string;
  name: string;
  subtitle: string;
  nodeKeys: string[];
}

export const experimentProtocolSections: ExperimentProtocolSection[] = [
  {
    index: "01",
    name: "Construct",
    subtitle: "In Vitro Synthesis",
    nodeKeys: ["1-1"],
  },
  {
    index: "02",
    name: "Screen",
    subtitle: "Round 1 Screening",
    nodeKeys: ["2-1", "2-2", "2-3", "2-4", "2-5"],
  },
  {
    index: "03",
    name: "Optimise",
    subtitle: "Combined Vaccine",
    nodeKeys: ["3-1"],
  },
  {
    index: "04",
    name: "Validate",
    subtitle: "Round 2 Validation",
    nodeKeys: ["4-1", "4-2", "4-3", "4-4", "4-5"],
  },
  {
    index: "05",
    name: "Safety",
    subtitle: "In Vitro Safety",
    nodeKeys: ["5-1", "5-2", "5-3"],
  },
  {
    index: "06",
    name: "Target model",
    subtitle: "Cell Engineering",
    nodeKeys: ["6-1", "6-2", "6-3", "6-4"],
  },
  {
    index: "07",
    name: "In vivo",
    subtitle: "Efficacy & Mechanism",
    nodeKeys: ["7-1", "7-2", "7-3", "7-4", "7-5"],
  },
];

export const experimentProtocolPairs: ExperimentProtocolPair[] = [
  // -------------------------------------------------------------------------
  // 01 Construct
  // -------------------------------------------------------------------------

  {
    key: "1-1",
    section: "Construct",
    sectionNumber: "01",
    code: "1.1",
    title: "circRNA synthesis and circularity verification",
    shortTitle: "1.1",
    targetId: "exp-1-1",
    flowPage: 3,
    inventoryPage: 4,
    flowSize: experimentProtocolSize(3),
    inventorySize: experimentProtocolSize(4),
    hasFigure: true,
  },

  // -------------------------------------------------------------------------
  // 02 Screen
  // -------------------------------------------------------------------------
  {
    key: "2-1",
    section: "Screen",
    sectionNumber: "02",
    code: "2.1",
    title: "DC preparation and circRNA delivery",
    shortTitle: "2.1",
    targetId: "exp-2-1",
    flowPage: 5,
    inventoryPage: 6,
    flowSize: experimentProtocolSize(5),
    inventorySize: experimentProtocolSize(6),
    hasFigure: true,
  },
  {
    key: "2-2",
    section: "Screen",
    sectionNumber: "02",
    code: "2.2",
    title: "T cell isolation and DC–T co-culture",
    shortTitle: "2.2",
    targetId: "exp-2-2",
    flowPage: 7,
    inventoryPage: 8,
    flowSize: experimentProtocolSize(7),
    inventorySize: experimentProtocolSize(8),
    hasFigure: true,
  },
  {
    key: "2-3",
    section: "Screen",
    sectionNumber: "02",
    code: "2.3",
    title: "ELISpot assay and spot counting",
    shortTitle: "2.3",
    targetId: "exp-2-3",
    flowPage: 9,
    inventoryPage: 10,
    flowSize: experimentProtocolSize(9),
    inventorySize: experimentProtocolSize(10),
    hasFigure: true,
  },
  {
    key: "2-4",
    section: "Screen",
    sectionNumber: "02",
    code: "2.4",
    title: "Calcein-AM killing assay (K562)",
    shortTitle: "2.4",
    targetId: "exp-2-4",
    flowPage: 11,
    inventoryPage: 12,
    flowSize: experimentProtocolSize(11),
    inventorySize: experimentProtocolSize(12),
    hasFigure: true,
  },
  {
    key: "2-5",
    section: "Screen",
    sectionNumber: "02",
    code: "2.5",
    title: "Flow validation of TROP2 epitopes",
    shortTitle: "2.5",
    targetId: "exp-2-5",
    flowPage: 45,
    inventoryPage: 46,
    flowSize: experimentProtocolSize(45),
    inventorySize: experimentProtocolSize(46),
    hasFigure: true,
  },

  // -------------------------------------------------------------------------
  // 03 Optimise
  // -------------------------------------------------------------------------

  {
    key: "3-1",
    section: "Optimise",
    sectionNumber: "03",
    code: "3.1",
    title: "Combined circRNA synthesis and release testing",
    shortTitle: "3.1",
    targetId: "exp-3-1",
    flowPage: 15,
    inventoryPage: 16,
    flowSize: experimentProtocolSize(15),
    inventorySize: experimentProtocolSize(16),
    hasFigure: true,
  },

  // -------------------------------------------------------------------------
  // 04 Validate
  // -------------------------------------------------------------------------
  {
    key: "4-1",
    section: "Validate",
    sectionNumber: "04",
    code: "4.1",
    title: "DC maturation",
    shortTitle: "4.1",
    targetId: "exp-4-1",
    flowPage: 17,
    inventoryPage: 18,
    flowSize: experimentProtocolSize(17),
    inventorySize: experimentProtocolSize(18),
    hasFigure: true,
  },
  {
    key: "4-2",
    section: "Validate",
    sectionNumber: "04",
    code: "4.2",
    title: "Antigen translation by anti-FLAG Western blot",
    shortTitle: "4.2",
    targetId: "exp-4-2",
    flowPage: 19,
    inventoryPage: 20,
    flowSize: experimentProtocolSize(19),
    inventorySize: experimentProtocolSize(20),
    hasFigure: true,
  },
  {
    key: "4-3",
    section: "Validate",
    sectionNumber: "04",
    code: "4.3",
    title: "T cell activation and memory differentiation",
    shortTitle: "4.3",
    targetId: "exp-4-3",
    flowPage: 21,
    inventoryPage: 22,
    flowSize: experimentProtocolSize(21),
    inventorySize: experimentProtocolSize(22),
    hasFigure: true,
  },
  {
    key: "4-4",
    section: "Validate",
    sectionNumber: "04",
    code: "4.4",
    title: "Round-2 ELISpot",
    shortTitle: "4.4",
    targetId: "exp-4-4",
    flowPage: 25,
    inventoryPage: 26,
    flowSize: experimentProtocolSize(25),
    inventorySize: experimentProtocolSize(26),
    hasFigure: true,
  },
  {
    key: "4-5",
    section: "Validate",
    sectionNumber: "04",
    code: "4.5",
    title: "MDA-MB-231 specific killing",
    shortTitle: "4.5",
    targetId: "exp-4-5",
    flowPage: 23,
    inventoryPage: 24,
    flowSize: experimentProtocolSize(23),
    inventorySize: experimentProtocolSize(24),
    hasFigure: true,
  },

  // -------------------------------------------------------------------------
  // 05 Safety
  // -------------------------------------------------------------------------
  {
    key: "5-1",
    section: "Safety",
    sectionNumber: "05",
    code: "5.1",
    title: "In vitro stability of circRNA versus linear RNA",
    shortTitle: "5.1",
    targetId: "exp-5-1",
    flowPage: 47,
    inventoryPage: 48,
    flowSize: experimentProtocolSize(47),
    inventorySize: experimentProtocolSize(48),
    hasFigure: true,
  },
  {
    key: "5-2",
    section: "Safety",
    sectionNumber: "05",
    code: "5.2",
    title: "Off-target cytotoxicity against normal cells",
    shortTitle: "5.2",
    targetId: "exp-5-2",
    flowPage: 49,
    inventoryPage: 50,
    flowSize: experimentProtocolSize(49),
    inventorySize: experimentProtocolSize(50),
    hasFigure: true,
  },
  {
    key: "5-3",
    section: "Safety",
    sectionNumber: "05",
    code: "5.3",
    title: "Safe dose window of the LNP delivery system",
    shortTitle: "5.3",
    targetId: "exp-5-3",
    flowPage: 51,
    inventoryPage: 52,
    flowSize: experimentProtocolSize(51),
    inventorySize: experimentProtocolSize(52),
    hasFigure: true,
  },

  // -------------------------------------------------------------------------
  // 06 Target Model
  // -------------------------------------------------------------------------

  {
    key: "6-1",
    section: "Target model",
    sectionNumber: "06",
    code: "6.1",
    title: "TROP2-overexpressing 4T1 cells using supplied lentivirus",
    shortTitle: "6.1",
    targetId: "exp-6-1",
    flowPage: 29,
    inventoryPage: 30,
    flowSize: experimentProtocolSize(29),
    inventorySize: experimentProtocolSize(30),
    hasFigure: true,
  },
  {
    key: "6-2",
    section: "Target model",
    sectionNumber: "06",
    code: "6.2",
    title: "Flow sorting of GFP⁺ cells",
    shortTitle: "6.2",
    targetId: "exp-6-2",
    flowPage: 31,
    inventoryPage: 32,
    flowSize: experimentProtocolSize(31),
    inventorySize: experimentProtocolSize(32),
    hasFigure: true,
  },
  {
    key: "6-3",
    section: "Target model",
    sectionNumber: "06",
    code: "6.3",
    title: "RNA preparation and RT-PCR for TROP2",
    shortTitle: "6.3",
    targetId: "exp-6-3",
    flowPage: 33,
    inventoryPage: 34,
    flowSize: experimentProtocolSize(33),
    inventorySize: experimentProtocolSize(34),
    hasFigure: true,
  },
  {
    key: "6-4",
    section: "Target model",
    sectionNumber: "06",
    code: "6.4",
    title: "Surface TROP2 by flow cytometry",
    shortTitle: "6.4",
    targetId: "exp-6-4",
    flowPage: 35,
    inventoryPage: 36,
    flowSize: experimentProtocolSize(35),
    inventorySize: experimentProtocolSize(36),
    hasFigure: true,
  },

  // -------------------------------------------------------------------------
  // 07 In Vivo
  // -------------------------------------------------------------------------
  {
    key: "7-1",
    section: "In vivo",
    sectionNumber: "07",
    code: "7.1",
    title: "Establishing the tumour-bearing model",
    shortTitle: "7.1",
    targetId: "exp-7-1",
    flowPage: 37,
    inventoryPage: 38,
    flowSize: experimentProtocolSize(37),
    inventorySize: experimentProtocolSize(38),
    hasFigure: true,
  },
  {
    key: "7-2",
    section: "In vivo",
    sectionNumber: "07",
    code: "7.2",
    title: "In vivo antitumour effect",
    shortTitle: "7.2",
    targetId: "exp-7-2",
    flowPage: 39,
    inventoryPage: 40,
    flowSize: experimentProtocolSize(39),
    inventorySize: experimentProtocolSize(40),
    hasFigure: true,
  },
  {
    key: "7-3",
    section: "In vivo",
    sectionNumber: "07",
    code: "7.3",
    title: "Intratumoural CD8 and Granzyme B",
    shortTitle: "7.3",
    targetId: "exp-7-3",
    flowPage: 41,
    inventoryPage: 42,
    flowSize: experimentProtocolSize(41),
    inventorySize: experimentProtocolSize(42),
    hasFigure: true,
  },
  {
    key: "7-4",
    section: "In vivo",
    sectionNumber: "07",
    code: "7.4",
    title: "Splenocyte flow cytometry",
    shortTitle: "7.4",
    targetId: "exp-7-4",
    flowPage: 43,
    inventoryPage: 44,
    flowSize: experimentProtocolSize(43),
    inventorySize: experimentProtocolSize(44),
    hasFigure: true,
  },
  {
    key: "7-5",
    section: "In vivo",
    sectionNumber: "07",
    code: "7.5",
    title: "Intracellular cytokine staining",
    shortTitle: "7.5",
    targetId: "exp-7-5",
    flowPage: 43,
    inventoryPage: 44,
    flowSize: experimentProtocolSize(43),
    inventorySize: experimentProtocolSize(44),
    hasFigure: true,
  },
];
