import type {
  WikiPageContent,
  WikiSection,
} from "../../components/wiki/wikiPageTypes";
import { cycle1Iterations, cycle1Section } from "./engineeringCycle1";
import { cycle2Iterations, cycle2Section } from "./engineeringRecordAdditions";
import { cycle3Iterations, cycle3Section } from "./engineeringCycle3";
import { cycle4Iterations, cycle4Section } from "./engineeringCycle4";

/**
 * Engineering — the CirCure TIME record.
 *
 * `TIME` is the team's own engineering system: four project-level cycles
 * (**T**argeting, **I**ntegration, **M**easurement, **E**valuation) on the outer
 * scale of a central gear, with Design–Build–Test–Learn running on the inner
 * scale. The two hands of the dial locate the project within its current cycle
 * and its current engineering stage.
 */

export type EngineeringCycleLetter = "T" | "I" | "M" | "E";

export interface EngineeringCycleDatum {
  id: string;
  letter: EngineeringCycleLetter;
  title: string;
  /** `planned` cycles keep a dashed arc on the dial but publish no article section. */
  status: "recorded" | "planned";
}

export interface EngineeringTeamDatum {
  id: string;
  label: string;
}

export interface EngineeringIterationDatum {
  /** Matches the `subheading` anchor and the `dbtl` block id. */
  id: string;
  /** Owning cycle, 1-based, aligned with `TIME_CYCLES` by index. */
  cycle: number;
  cycleId: string;
  /** "1.1" … "4.8" */
  index: string;
  /** Iteration heading, e.g. "Iteration 1.1｜Defining the clinical use case". */
  label: string;
  /** Short form for the gear strip's hover list. */
  short: string;
  /** Team ids that contributed to this iteration; drives the satellite gears. */
  teams: string[];
}

export const TIME_CYCLES: EngineeringCycleDatum[] = [
  {
    id: "engineering-cycle-1",
    letter: "T",
    title: "Targeting: From intended use to a four-antigen strategy",
    status: "recorded",
  },
  {
    id: "engineering-cycle-2",
    letter: "I",
    title: "Integration: From epitope exploration to Combined",
    status: "recorded",
  },
  {
    id: "engineering-cycle-3",
    letter: "M",
    title: "Measurement: building the molecular and cellular evidence chain",
    status: "recorded",
  },
  {
    id: "engineering-cycle-4",
    letter: "E",
    title: "Evaluation: Extending molecular and cellular evidence to in vivo evaluation",
    status: "recorded",
  },
];

export const ENGINEERING_TEAMS: EngineeringTeamDatum[] = [
  { id: "dry-lab", label: "Dry Lab" },
  { id: "wet-lab", label: "Wet Lab" },
  { id: "ihp", label: "Integrated Human Practices" },
  { id: "education", label: "Education" },
  { id: "visual-design", label: "Visual Design" },
  { id: "entrepreneurship", label: "Entrepreneurship" },
];

/** Ordered Design–Build–Test–Learn stage order, shared by every iteration. */
export const DBTL_STAGE_KEYS = ["design", "build", "test", "learn"] as const;

export const ENGINEERING_ITERATIONS: EngineeringIterationDatum[] = [
  ...cycle1Iterations,
  ...cycle2Iterations,
  ...cycle3Iterations,
  ...cycle4Iterations,
];

const overviewSection: WikiSection = {
  id: "engineering-overview",
  index: "00",
  kicker: "Overview",
  navLabel: "Overview",
  title: "TIME: a stopwatch, not an acronym",
  summary:
    "TIME marks four connected project-level cycles on the outer scale of the central gear. Design–Build–Test–Learn runs along the inner scale, and the two hands locate the project within its current cycle and engineering stage.",
  blocks: [
    {
      type: "prose",
      paragraphs: [
        "**TIME** is the engineering system developed by JLU-FBH to organize the evidence-driven development of CirCure. **TIME** represents four connected project-level cycles: **Targeting, Integration, Measurement and Evaluation**. The system takes the form of a mechanical stopwatch: TIME is marked on the outer scale of the central gear, Design–Build–Test–Learn runs along the inner scale, and the two hands locate the project within its current cycle and engineering stage. Yet TIME is more than an acronym. It reflects the urgency at the heart of CirCure: when recurrence remains a possibility, every well-founded decision should bring the next answer closer. Our stopwatch therefore records how evidence from antigen selection, construct design and functional testing shapes each next engineering decision, while carrying our long-term hope that this progress can help patients at high risk of recurrence gain more time to recover, be with their families and return to everyday life.",
      ],
    },
    {
      type: "figure",
      src: "interactive-system-overview",
      alt: "The CirCure TIME Engineering System",
      caption:
        "CirCure TIME connects four project-level cycles with recurring Design–Build–Test–Learn iterations and the coordinated engagement of the project teams.",
    },
    {
      type: "prose",
      paragraphs: [
        "In TIME, **Dry Lab and Wet Lab act as the primary driving gears**. Dry Lab turns biological questions into traceable antigen and epitope decisions, structural hypotheses and quantitative predictions; Wet Lab converts these designs into physical constructs and molecular or cellular evidence. Their alternating motion drives the central mechanism and gives rise to [CircuForge](https://2026.igem.wiki/jlu-fbh/software), [TorusFold](https://2026.igem.wiki/jlu-fbh/software), mathematical modelling. **iHP, Education, Visual Design and Entrepreneurship operate as driven gears**, translating scientific progress into clinical and ethical refinements, transferable learning, coherent communication and development requirements. Their feedback then enters the next DBTL iteration, guiding and extending the main drive.",
      ],
    },
    {
      type: "figure",
      src: "https://static.igem.wiki/teams/6056/wiki/files/pages/project/engineering/engineering-overviewcycle.avif",
      width: 3000,
      height: 2100,
      alt: "CirCure TIME Four Connected Cycles Overview",
      caption:
        "Four connected cycles record how CirCure progressed through TIME: Targeting (Cycle 1), Integration (Cycle 2), Measurement (Cycle 3), and Evaluation (Cycle 4).",
    },
    {
      type: "callout",
      tone: "navy",
      label: "How to read this page",
      body: "The dial's outer ring selects a TIME cycle, and its inner ring tracks the Design–Build–Test–Learn stage you are reading. The heading identifies the current iteration. Use the side arrows (‹ and ›) alongside the iteration title to move between iterations, or alongside Design, Build, Test, or Learn to switch between stages. You can also scroll to follow the engineering story, or open a TIME letter below and click a small gear to jump directly to an iteration.",
    },
  ],
};

export const engineeringPage: WikiPageContent = {
  route: "/engineering",
  category: "project",
  chapter: "Project / 02 of 07",
  eyebrow: "Engineering · The TIME record",
  title: "Engineering",
  lede: "Four project-level cycles on the outer scale, Design–Build–Test–Learn on the inner.",
  boundary:
    "Dates, construct versions, raw measurements and figures must be replaced with team records as experiments are completed. Figure and code slots below are reservations, not results.",
  visual: "engineering-cycle",
  visualLabel: "CirCure TIME engineering system",
  visualSteps: ["Design", "Build", "Test", "Learn"],
  facts: [
    {
      label: "T",
      value: "Targeting — intended use to a four-antigen strategy",
    },
    { label: "I", value: "Integration — epitope exploration to Combined" },
    {
      label: "M",
      value: "Measurement — the molecular and cellular evidence chain",
    },
    { label: "E", value: "Evaluation — molecular and cellular evidence to in vivo evaluation" },
  ],
  sections: [
    overviewSection,
    cycle1Section,
    cycle2Section,
    cycle3Section,
    cycle4Section,
  ],
  links: [
    { path: "/description", label: "Project Rationale" },
    { path: "/design", label: "Construct Design" },
    { path: "/experiments", label: "Experimental Protocols" },
    { path: "/results", label: "Results & Discussion" },
  ],
  next: {
    path: "/results",
    label: "Results",
    title: "Which Hypotheses Survived the Test?",
    description: "The engineering cycles made their boldest predictions. Enter our experimental ledger to examine the gels, cytotoxicity assays, and in vivo tumour suppression data.",
  },
};
