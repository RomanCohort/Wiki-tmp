import type { WikiPageContent } from "../../components/wiki/wikiPageTypes";
import type { NotebookAssetKey } from "./notebookAssets";
import { engagementEntries } from "./notebookEngagement";

export type NotebookBlock =
  | { type: "prose"; text: string }
  | { type: "discussion"; label: string; title: string; text: string }
  | {
      type: "figure";
      label: string;
      title: string;
      assets: NotebookAssetKey[];
      caption: string;
      gallery?: { kind: "long-image" | "photos" };
    }
  | {
      type: "table";
      label: string;
      title: string;
      headers: string[];
      rows: string[][];
      caption: string;
    };

export interface NotebookEntry {
  id: string;
  start: string;
  end: string;
  title: string;
  tags: string[];
  blocks: NotebookBlock[];
}

export type NotebookGroupId = "wet-lab" | "dry-lab" | "wiki" | "engagement";
export interface NotebookGroup {
  id: NotebookGroupId;
  label: string;
  intro: string[];
  entries: NotebookEntry[];
}

/** English copy and tags transcribed from 文案集/project/notebook/Notebook新.md. */
export const wetLabEntries: NotebookEntry[] = [
  {
    id: "wet-2025-12-06-1",
    start: "2025-12-06",
    end: "2025-12-20",
    title: "Team formation and initial brainstorming",
    tags: ["Brainstorming", "Preparation"],
    blocks: [
      {
        type: "discussion",
        label: "Brainstorming",
        title: "From project ideas to testable questions",
        text: "Discussion focus: Which health problems could be addressed within our experimental resources, and what constructs and readouts could make a project testable?",
      },
      {
        type: "prose",
        text: "We completed recruitment and team formation and began discussing possible project directions, laboratory resources and measurable outcomes.",
      },
    ],
  },
  {
    id: "wet-2025-12-21-2",
    start: "2025-12-21",
    end: "2026-01-20",
    title: "Final examinations",
    tags: ["Pause"],
    blocks: [
      {
        type: "prose",
        text: "Team members prepared for and took final examinations, pausing coordinated project work.",
      },
    ],
  },
  {
    id: "wet-2026-01-21-3",
    start: "2026-01-21",
    end: "2026-04-29",
    title: "Project discussions and experimental planning",
    tags: ["Brainstorming", "Preparation"],
    blocks: [
      {
        type: "discussion",
        label: "Brainstorming",
        title: "Planning a connected validation route",
        text: "Discussion focus: How should RNA identity and quality, protein expression, immune responses and functional comparisons connect? Align sequence handoff, sample labels and approval requirements with Dry Lab.",
      },
      {
        type: "prose",
        text: "After examinations, we resumed project discussions and developed the circRNA vaccine direction, outlining material preparation, expression and immune-function validation, resource needs and approvals.",
      },
      {
        type: "figure",
        label: "Figure Wet-Figure1",
        title: "Selected slides from early project discussions",
        assets: ["wet_f1_a", "wet_f1_b", "wet_f1_c", "wet_f1_d"],
        caption: "Selected slides from early project discussions.",
      },
    ],
  },
  {
    id: "wet-2026-06-15-4",
    start: "2026-06-15",
    end: "2026-06-15",
    title: "Laboratory preparation",
    tags: ["Preparation"],
    blocks: [
      {
        type: "prose",
        text: "We began laboratory work, prepared materials and reviewed operating procedures.",
      },
    ],
  },
  {
    id: "wet-2026-06-20-5",
    start: "2026-06-20",
    end: "2026-06-20",
    title: "Sequence handoff and label checks",
    tags: ["Brainstorming", "Review & Handoff"],
    blocks: [
      {
        type: "discussion",
        label: "Brainstorming",
        title: "Comparing the first-round designs",
        text: "Discussion focus: Check the mapping from 17 candidates to 15 retained epitopes and 13 coding designs, including the two overlapping pairs. Discuss common RNA inputs and controls for screening.",
      },
      {
        type: "prose",
        text: "We received the Dry Lab candidate sequences and checked the two overlapping epitope pairs against the 13 first-round coding designs. Merging the two pairs connected 15 retained epitopes to 13 designs, with labels linked to their continuous coding sequences.",
      },
    ],
  },
  {
    id: "wet-2026-06-21-6",
    start: "2026-06-21",
    end: "2026-08-08",
    title: "Materials, experimental planning and form preparation",
    tags: ["Brainstorming", "Preparation", "Construction"],
    blocks: [
      {
        type: "discussion",
        label: "Brainstorming",
        title: "Preparing the first-round comparisons",
        text: "Discussion focus: Discuss RNA identity, circularisation-related quality readouts, consistent inputs and controls. Outline the PBMC, DC and T-cell workflow and the records needed to link each construct with its readouts.",
      },
      {
        type: "discussion",
        label: "Brainstorming",
        title: "Planning the animal evaluation",
        text: "Discussion focus: Outline the proposed model, comparison groups, administration arrangements, welfare criteria and endpoint collection. Keep the early evaluation framework distinct from the module composition that would later be selected experimentally.",
      },
      {
        type: "prose",
        text: "We organised sequence versions, material and procurement requirements, sample identifiers, comparison plans and record sheets. We also prepared the initial cell-experiment and animal-study plans for the first Check-in and Animal Use Form submissions.",
      },
    ],
  },
  {
    id: "wet-2026-08-09-7",
    start: "2026-08-09",
    end: "2026-08-09",
    title: "Initial Check-in and Animal Use Form submissions",
    tags: ["Approval"],
    blocks: [
      {
        type: "prose",
        text: "We submitted the initial Check-in and Animal Use Form, recording the experimental plans available at that stage.",
      },
    ],
  },
  {
    id: "wet-2026-08-10-8",
    start: "2026-08-10",
    end: "2026-08-16",
    title: "Implementation preparation and record checks",
    tags: ["Brainstorming", "Preparation"],
    blocks: [
      {
        type: "discussion",
        label: "Brainstorming",
        title: "Aligning the plan and implementation",
        text: "Discussion focus: Review material readiness, sample labels, comparison conditions, record sheets and handoffs between operations.",
      },
      {
        type: "prose",
        text: "We continued checking materials, sample identifiers, operating arrangements and record sheets for the forthcoming experiments.",
      },
    ],
  },
  {
    id: "wet-2026-08-17-9",
    start: "2026-08-17",
    end: "2026-08-17",
    title: "PBMC Check-in approval",
    tags: ["Approval"],
    blocks: [
      {
        type: "prose",
        text: "The PBMC-related Check-in was approved, and the corresponding cell operations began within its approved scope.",
      },
    ],
  },
  {
    id: "wet-2026-08-17-10",
    start: "2026-08-17",
    end: "2026-08-19",
    title: "PBMC, dendritic-cell and T-cell preparation",
    tags: ["Brainstorming", "Preparation", "Experiments"],
    blocks: [
      {
        type: "discussion",
        label: "Brainstorming",
        title: "Connecting the DC–T-cell workflow",
        text: "Discussion focus: Align cell batches, comparison groups and sample identifiers across DC preparation, T-cell preparation and functional readouts.",
      },
      {
        type: "prose",
        text: "We began work with commercial PBMC material and prepared the DC and T-cell conditions for first-round screening.",
      },
    ],
  },
  {
    id: "wet-2026-08-20-11",
    start: "2026-08-20",
    end: "2026-08-24",
    title: "First-round electroporation, co-culture and screening",
    tags: ["Brainstorming", "Experiments", "Validation"],
    blocks: [
      {
        type: "discussion",
        label: "Brainstorming",
        title: "Linking material quality to the screen",
        text: "Discussion focus: Keep representative-preparation quality results linked to the tested sample. Compare modules within each antigen source while retaining cell-batch and control records.",
      },
      {
        type: "prose",
        text: "We carried out the first-round electroporation, co-culture and screening using quality-checked circRNA materials.",
      },
      {
        type: "prose",
        text: "The quality record for the first-round screening material showed the following representative-preparation result. At a 4 µL input, the representative TROP2-CTL1 preparation had a recorded circular-to-linear-associated signal ratio of 32.5:1 and an estimated circular fraction of 96.96±0.70% across three technical replicate wells. This readout describes that representative preparation, rather than an identical fraction measured separately for all 13 preparations.",
      },
      {
        type: "table",
        label: "Table Wet-Table1",
        title: "First-round RNA circularity assessment",
        headers: [
          "Input volume",
          "ΔCq (linear − circular)",
          "Circular : linear",
          "Estimated circular fraction",
        ],
        rows: [
          ["2 µL", "3.70 ± 0.02", "13.0∶1", "92.85 ± 0.08%"],
          ["**4 µL**", "**5.02 ± 0.37**", "**32.5∶1**", "**96.96 ± 0.70%**"],
          ["6 µL", "4.72 ± 0.45", "26.4∶1", "96.25 ± 1.14%"],
          ["All nine wells", "4.48 ± 0.67", "22.4∶1", "95.35 ± 2.01%"],
        ],
        caption:
          "RT-qPCR assessment of representative TROP2-CTL1 RNA; three technical wells per input volume. The pooled nine wells span three input conditions, not nine biological replicates.",
      },
    ],
  },
  {
    id: "wet-2026-08-24-12",
    start: "2026-08-24",
    end: "2026-08-24",
    title: "First-round results and Combined selection",
    tags: ["Brainstorming", "Analysis"],
    blocks: [
      {
        type: "discussion",
        label: "Brainstorming",
        title: "Selecting and combining eight modules",
        text: "Discussion focus: How can two modules from each antigen source preserve the four-antigen design? Discuss the Combined arrangement, linkers and second-round groups with Dry Lab, and review their connection with the earlier animal-evaluation framework.",
      },
      {
        type: "prose",
        text: "We tested 13 first-round preparations in the DC–T-cell system using ELISpot. The within-run comparison supported selecting two modules from each antigen source. TROP2 CTL1 and CTL2 recorded 271 and 217 spots, respectively.",
      },
      {
        type: "prose",
        text: "We supplemented first-round CD8/CD69 and K562 killing measurements to document cell activation and overall effector activity.",
      },
      {
        type: "prose",
        text: "We reviewed the first-round screen and selected two modules from each antigen source. The eight selected modules were TROP2 CTL1/CTL2, B7-H4 CTL1/CTL2, Nectin-4 CTL1/CTL2 and LIV-1 CTL2/CTL3 for the subsequent Combined design.",
      },
      {
        type: "figure",
        label: "Figure Wet-Figure2",
        title: "First-round ELISpot",
        assets: ["wet_f2"],
        caption: "ELISpot comparison of the 13 first-round preparations.",
      },
      {
        type: "figure",
        label: "Figure Wet-Figure3",
        title: "First-round CD8/CD69",
        assets: ["wet_f3"],
        caption:
          "Representative CD8/CD69 plots for the two leading TROP2 conditions.",
      },
      {
        type: "figure",
        label: "Figure Wet-Figure4",
        title: "First-round K562 killing",
        assets: ["wet_f4"],
        caption: "K562 killing by first-round effector-cell preparations.",
      },
    ],
  },
  {
    id: "wet-2026-08-24-19",
    start: "2026-08-24",
    end: "2026-09-03",
    title: "Preparation and in vitro validation of TROP2-expressing 4T1 cells",
    tags: ["Brainstorming", "Construction", "Validation"],
    blocks: [
      {
        type: "discussion",
        label: "Brainstorming",
        title: "Preparing the model-cell input",
        text: "Discussion focus: Align transduction, GFP sorting, selection, transcript detection and surface-TROP2 records with the cell population used for the animal study.",
      },
      {
        type: "prose",
        text: "We prepared the TROP2-expressing 4T1 cell population through lentiviral transduction, GFP-positive cell sorting and puromycin selection, followed by final in vitro expression validation from 1 to 3 September.",
      },
      {
        type: "figure",
        label: "Figure Wet-Figure19",
        title: "TROP2 transcript detection",
        assets: ["wet_f19"],
        caption:
          "Semi-quantitative TROP2 transcript comparison in the model cells.",
      },
      {
        type: "figure",
        label: "Figure Wet-Figure20",
        title: "Surface TROP2 expression",
        assets: ["wet_f20"],
        caption:
          "Surface TROP2 staining in wild-type and engineered 4T1 cells.",
      },
      {
        type: "figure",
        label: "Figure Wet-Figure21",
        title: "GFP fluorescence",
        assets: ["wet_f21"],
        caption: "GFP fluorescence recorded after lentiviral transduction.",
      },
      {
        type: "figure",
        label: "Figure Wet-Figure22",
        title: "GFP sorting gates",
        assets: ["wet_f22"],
        caption: "Flow-cytometry gates used to select GFP-positive cells.",
      },
    ],
  },
  {
    id: "wet-2026-08-25-13",
    start: "2026-08-25",
    end: "2026-08-27",
    title: "Combined sequence verification and second-round preparation",
    tags: ["Preparation", "Construction", "Validation"],
    blocks: [
      {
        type: "prose",
        text: "We checked the Combined sequence version with Dry Lab, organised the materials for the second round of experiments and initiated plasmid identity verification and quality control.",
      },
      {
        type: "figure",
        label: "Figure Wet-Figure5",
        title: "Combined plasmid map",
        assets: ["wet_f5"],
        caption:
          "Plasmid map of the construct integrating eight selected modules.",
      },
    ],
  },
  {
    id: "wet-2026-08-27-14",
    start: "2026-08-27",
    end: "2026-08-30",
    title: "Second-round quality control, electroporation and co-culture",
    tags: ["Brainstorming", "Construction", "Experiments"],
    blocks: [
      {
        type: "discussion",
        label: "Brainstorming",
        title: "From molecular identity to functional readouts",
        text: "Discussion focus: Connect DNA-template and junction checks with RNA persistence, protein expression, DC maturation and T-cell functional comparisons. Keep the five preparations and their sample labels consistent.",
      },
      {
        type: "prose",
        text: "We checked second-round DNA templates, RNA circularisation and the Combined junction alongside preparation for the functional comparisons. Junction sequencing identified the expected head-to-tail connection. Purified Combined had a circular-to-linear-associated signal ratio of 145.7:1 and an estimated circular fraction of 99.30±0.17%.",
      },
      {
        type: "prose",
        text: "We carried out second-round electroporation and co-culture, preparing the effector-cell conditions for the functional comparisons.",
      },
      {
        type: "figure",
        label: "Figure Wet-Figure6",
        title: "Second-round DNA templates",
        assets: ["wet_f6"],
        caption:
          "Gel electrophoresis of four antigen-encoding DNA transcription templates.",
      },
      {
        type: "figure",
        label: "Figure Wet-Figure7",
        title: "Combined junction sequencing",
        assets: ["wet_f7"],
        caption:
          "Sanger sequencing of the junction-spanning amplification product identified the expected head-to-tail connection.",
      },
    ],
  },
  {
    id: "wet-2026-08-28-15",
    start: "2026-08-28",
    end: "2026-08-31",
    title: "CCK-8 viability assay",
    tags: ["Brainstorming", "Experiments"],
    blocks: [
      {
        type: "discussion",
        label: "Brainstorming",
        title: "Separating carrier effects from target-cell killing",
        text: "Discussion focus: Empty-LNP effects on DC viability and effector-cell killing address different questions. Keep the cell identity, input units and controls explicit for each assay.",
      },
      {
        type: "prose",
        text: "We assessed immature moDC viability after 24 h of empty-LNP exposure at nominal inputs of 0, 50, 100, 200 and 400 ng per well, with four wells per dose. Viability remained near baseline at 50–200 ng and decreased to 57.2±5.8% at 400 ng. The dataset was completed by 31 August for Cell2Dose calibration.",
      },
      {
        type: "figure",
        label: "Figure Wet-Figure8",
        title: "Empty-LNP DC viability",
        assets: ["wet_f8"],
        caption: "DC viability across the tested nominal empty-LNP inputs.",
      },
    ],
  },
  {
    id: "wet-2026-08-28-16",
    start: "2026-08-28",
    end: "2026-09-03",
    title: "Molecular and cellular supplementary readouts",
    tags: ["Brainstorming", "Experiments", "Validation"],
    blocks: [
      {
        type: "discussion",
        label: "Brainstorming",
        title: "Connecting the evidence chain",
        text: "Discussion focus: What does each RNA, protein, DC, T-cell and ELISpot measurement establish? Compare the roles of expression, maturation-associated phenotypes and functional outputs without treating them as interchangeable readouts.",
      },
      {
        type: "prose",
        text: "We measured RNA persistence at 37 ℃. circRNA retained 71.9% and 39.5% of its own 0 h signal at 24 h and 72 h; the corresponding linear precursor retained 5.9% and 2.7%. This time course ran alongside the cell comparisons.",
      },
      {
        type: "prose",
        text: "We assessed protein expression and compared DC maturation. Anti-FLAG Western blotting detected a band near 50 kDa in the circRNA-electroporated lane, supporting expression of the encoded protein. CD80⁺CD86⁺ DCs increased from 10.33±0.55% in Blank to 22.37±0.31% in Combined, a 2.16-fold difference.",
      },
      {
        type: "prose",
        text: "We completed second-round T-cell phenotyping and the five-group ELISpot comparison. Combined showed relatively high values in the CD8/CD69, CD8/CD28 and CD45RO/CCR7 comparisons. Spot counts were 32 for Blank, 198 for TROP2 CTL1, 227 for TROP2 CTL2, 298 for TROP2 CTL1+2 and 367 for Combined.",
      },
      {
        type: "figure",
        label: "Figure Wet-Figure9",
        title: "RNA persistence gel",
        assets: ["wet_f9"],
        caption:
          "circRNA and linear precursor signals at 0, 24, 48 and 72 h at 37 ℃.",
      },
      {
        type: "figure",
        label: "Figure Wet-Figure10",
        title: "Relative RNA band intensity",
        assets: ["wet_f10"],
        caption:
          "Band intensities normalised to each RNA form’s own 0 h signal.",
      },
      {
        type: "figure",
        label: "Figure Wet-Figure11",
        title: "Anti-FLAG Western blot",
        assets: ["wet_f11"],
        caption: "Anti-FLAG signal near 50 kDa after circRNA electroporation.",
      },
      {
        type: "figure",
        label: "Figure Wet-Figure12",
        title: "DC maturation flow cytometry",
        assets: ["wet_f12"],
        caption:
          "Representative CD80/CD86 flow-cytometry plots for the five preparations.",
      },
      {
        type: "figure",
        label: "Figure Wet-Figure13",
        title: "DC maturation quantification",
        assets: ["wet_f13"],
        caption: "Comparison of CD80⁺CD86⁺ DC proportions across five groups.",
      },
      {
        type: "figure",
        label: "Figure Wet-Figure14",
        title: "T-cell activation phenotype",
        assets: ["wet_f14"],
        caption:
          "Representative CD8/CD69 plots and corresponding quantification.",
      },
      {
        type: "figure",
        label: "Figure Wet-Figure15",
        title: "T-cell co-stimulation phenotype",
        assets: ["wet_f15"],
        caption:
          "Representative CD8/CD28 plots and corresponding quantification.",
      },
      {
        type: "figure",
        label: "Figure Wet-Figure16",
        title: "Effector-memory-associated phenotype",
        assets: ["wet_f16"],
        caption:
          "Representative CD45RO/CCR7 plots and corresponding quantification.",
      },
      {
        type: "figure",
        label: "Figure Wet-Figure17",
        title: "Second-round ELISpot",
        assets: ["wet_f17"],
        caption:
          "IFN-γ ELISpot comparison of the five second-round preparations.",
      },
    ],
  },
  {
    id: "wet-2026-08-30-17",
    start: "2026-08-30",
    end: "2026-08-31",
    title: "Three-ratio cytotoxicity assay",
    tags: ["Experiments"],
    blocks: [
      {
        type: "prose",
        text: "We completed MDA-MB-231 target-cell killing measurements at E:T ratios of 20:1, 40:1 and 80:1. Blank and Combined each had three records per ratio; Combined showed the highest recorded killing across the tested preparations at all three ratios. The Blank and Combined data were organised for background correction and Cell2Dose calibration.",
      },
      {
        type: "figure",
        label: "Figure Wet-Figure18",
        title: "MDA-MB-231 killing",
        assets: ["wet_f18"],
        caption: "Target-cell killing at three effector-to-target ratios.",
      },
    ],
  },
  {
    id: "wet-2026-08-31-18",
    start: "2026-08-31",
    end: "2026-08-31",
    title: "Core cell-data handoff",
    tags: ["Review & Handoff"],
    blocks: [
      {
        type: "prose",
        text: "We handed the CCK8 and three-ratio cytotoxicity datasets to Dry Lab, together with sample identifiers, dose and E:T labels, controls and replicate records. These two datasets formed the core response-curve calibration inputs available before 1 September.",
      },
    ],
  },
  {
    id: "wet-2026-09-04-20",
    start: "2026-09-04",
    end: "2026-09-04",
    title: "Animal Use approval and dose confirmation",
    tags: ["Brainstorming", "Approval", "Review & Handoff"],
    blocks: [
      {
        type: "discussion",
        label: "Brainstorming",
        title: "Translating the plan into an animal study",
        text: "Discussion focus: Review groups, administration arrangements, welfare criteria and endpoint records together with the practical dose choice.",
      },
      {
        type: "prose",
        text: "The Animal Use Form was approved. We reviewed the preliminary Cell2Dose comparison and experimental plan with Dry Lab and the supervisors and confirmed 10 µg for the animal study.",
      },
    ],
  },
  {
    id: "wet-2026-09-06-22",
    start: "2026-09-06",
    end: "2026-10-03",
    title: "Animal-study implementation and longitudinal monitoring",
    tags: ["Experiments"],
    blocks: [
      {
        type: "prose",
        text: "We initiated the TROP2-expressing 4T1 tumour study in three groups: PBS, empty-vector circRNA–LNP and Combined circRNA–LNP, with five mice per group. Five administrations were completed during this period, with a Combined dose of 10 µg per administration. Animal condition and tumour growth were monitored and recorded throughout.",
      },
    ],
  },
  {
    id: "wet-2026-09-17-21",
    start: "2026-09-17",
    end: "2026-09-19",
    title: "Normal-cell safety Check-ins and comparison",
    tags: ["Brainstorming", "Approval", "Experiments"],
    blocks: [
      {
        type: "discussion",
        label: "Brainstorming",
        title: "Interpreting target preference within the panel",
        text: "Discussion focus: Compare tumour and normal targets under the same tested E:T conditions and distinguish this panel comparison from empty-LNP DC viability and the earlier model-calibration assay.",
      },
      {
        type: "prose",
        text: "The normal-cell safety Check-ins were approved on 17 September. The corresponding experiments began after approval and were completed over three days, in parallel with the animal study. We compared HCAEC, LX-2, BEAS-2B and MCF-12A with the MDA-MB-231 tumour target. At E:T 80:1, tumour-target killing was 59.24±2.10%, versus 0.78%–2.77% for the four normal targets; at 100:1, the values were 62.07±3.58% and 1.31%–3.47%. These records were separate from the earlier three-ratio Cell2Dose calibration data.",
      },
      {
        type: "figure",
        label: "Figure Wet-Figure23",
        title: "Tumour and non-tumour targets",
        assets: ["wet_f23"],
        caption: "Killing of tumour and non-tumour targets at 80:1 and 100:1.",
      },
    ],
  },
  {
    id: "wet-2026-10-04-23",
    start: "2026-10-04",
    end: "2026-10-09",
    title: "Continued observations and endpoint preparation",
    tags: ["Experiments", "Preparation"],
    blocks: [
      {
        type: "prose",
        text: "We continued tumour-growth and animal-condition observations and prepared the endpoint sample identifiers and collection records.",
      },
    ],
  },
  {
    id: "wet-2026-10-09-24",
    start: "2026-10-09",
    end: "2026-10-09",
    title: "Endpoint assessment and tissue collection",
    tags: ["Brainstorming", "Experiments", "Analysis"],
    blocks: [
      {
        type: "discussion",
        label: "Brainstorming",
        title: "Interpreting tumour and immune observations together",
        text: "Discussion focus: Connect tumour control with systemic immune readouts under the same group and animal identifiers, and organise the samples for local tissue imaging.",
      },
      {
        type: "prose",
        text: "We completed endpoint assessment, tumour and spleen collection and the splenic immune measurements. Mean endpoint tumour volumes were 233.64±28.33 mm³ for PBS, 90.36±13.51 mm³ for empty vector and 24.20±9.72 mm³ for Combined (five animals per group). Combined volumes were 89.6% lower than PBS and 73.2% lower than empty vector. The splenic panels assessed DC maturation, CD8 activation, memory-associated phenotype, intracellular IFN-γ and Granzyme B; quantification used three animals per group.",
      },
      {
        type: "figure",
        label: "Figure Wet-Figure24",
        title: "Tumour growth curves",
        assets: ["wet_f24"],
        caption: "Mean tumour growth in PBS, empty-vector and Combined groups.",
      },
      {
        type: "figure",
        label: "Figure Wet-Figure25",
        title: "Excised tumours at the endpoint",
        assets: ["wet_f25"],
        caption:
          "Excised tumours from the three comparison groups at the endpoint.",
      },
      {
        type: "figure",
        label: "Figure Wet-Figure26",
        title: "Splenic DC maturation",
        assets: ["wet_f26"],
        caption:
          "Representative splenic DC plots and quantification across three groups.",
      },
      {
        type: "figure",
        label: "Figure Wet-Figure27",
        title: "Splenic CD8 activation",
        assets: ["wet_f27"],
        caption: "Splenic CD8 activation-associated plots and quantification.",
      },
      {
        type: "figure",
        label: "Figure Wet-Figure28",
        title: "Splenic memory-associated phenotype",
        assets: ["wet_f28"],
        caption:
          "Splenic memory-associated phenotype plots and quantification.",
      },
      {
        type: "figure",
        label: "Figure Wet-Figure29",
        title: "Splenic intracellular IFN-γ",
        assets: ["wet_f29"],
        caption:
          "Intracellular IFN-γ in splenic CD8 T cells after stimulation.",
      },
      {
        type: "figure",
        label: "Figure Wet-Figure30",
        title: "Splenic intracellular Granzyme B",
        assets: ["wet_f30"],
        caption:
          "Intracellular Granzyme B in splenic CD8 T cells after stimulation.",
      },
    ],
  },
  {
    id: "wet-2026-10-10-25",
    start: "2026-10-10",
    end: "2026-10-13",
    title: "Tumour immunofluorescence and result organisation",
    tags: ["Experiments", "Analysis"],
    blocks: [
      {
        type: "prose",
        text: "We stained and imaged the tumour sections and organised the CD8 and Granzyme B channels with the endpoint records. Representative fields showed stronger CD8-associated signals in Combined; the tissue images were interpreted qualitatively.",
      },
      {
        type: "figure",
        label: "Figure Wet-Figure31",
        title: "Tumour immune-signal imaging",
        assets: ["wet_f31"],
        caption:
          "Representative tumour CD8 and Granzyme B channels, interpreted qualitatively.",
      },
    ],
  },
  {
    id: "wet-2026-10-13-26",
    start: "2026-10-13",
    end: "2026-10-13",
    title: "Wet Lab completion and handoff",
    tags: ["Review & Handoff"],
    blocks: [
      {
        type: "prose",
        text: "We completed Wet Lab work, checked sample and figure correspondence and handed the final experimental materials to Dry Lab and Wiki.",
      },
    ],
  },
];

export const dryLabEntries: NotebookEntry[] = [
  {
    id: "dry-2025-12-06-1",
    start: "2025-12-06",
    end: "2025-12-20",
    title: "Team formation and initial brainstorming",
    tags: ["Brainstorming", "Preparation"],
    blocks: [
      {
        type: "discussion",
        label: "Brainstorming",
        title: "Connecting computation to experimental questions",
        text: "Discussion focus: Which data could support candidate selection, and which computational outputs would be useful for Wet Lab design and interpretation?",
      },
      {
        type: "prose",
        text: "We completed team formation and began discussing project directions, available datasets and computational questions.",
      },
    ],
  },
  {
    id: "dry-2025-12-21-2",
    start: "2025-12-21",
    end: "2026-01-20",
    title: "Final examinations",
    tags: ["Pause"],
    blocks: [
      {
        type: "prose",
        text: "Team members prepared for and took final examinations, pausing coordinated project work.",
      },
    ],
  },
  {
    id: "dry-2026-01-21-3",
    start: "2026-01-21",
    end: "2026-04-29",
    title: "Project discussions and computational planning",
    tags: ["Brainstorming", "Preparation"],
    blocks: [
      {
        type: "discussion",
        label: "Brainstorming",
        title: "Planning evidence and data handoffs",
        text: "Discussion focus: Discuss protein evidence, malignant-cell localisation, patient representation, epitope prioritisation and the information needed to connect analysis with experiments.",
      },
      {
        type: "prose",
        text: "After examinations, we resumed project discussions and organised the TNBC antigen, epitope and software questions for subsequent analysis.",
      },
    ],
  },
  {
    id: "dry-2026-03-28-4",
    start: "2026-03-28",
    end: "2026-03-31",
    title: "Software development begins",
    tags: ["Brainstorming", "Development"],
    blocks: [
      {
        type: "discussion",
        label: "Brainstorming",
        title: "Defining the initial workflow",
        text: "Discussion focus: What inputs and outputs should connect data processing, target screening, epitope work and circRNA design within one workflow?",
      },
      {
        type: "prose",
        text: "We began software development and organised initial functions, data inputs and links between analysis steps.",
      },
    ],
  },
  {
    id: "dry-2026-04-01-5",
    start: "2026-04-01",
    end: "2026-04-01",
    title: "Runnable software baseline",
    tags: ["Development", "Validation"],
    blocks: [
      {
        type: "prose",
        text: "We established a runnable V1 baseline. The repository history retains this early development version; it is distinct from creation of the later official repository.",
      },
    ],
  },
  {
    id: "dry-2026-04-02-6",
    start: "2026-04-02",
    end: "2026-04-20",
    title: "Initial software workflow development",
    tags: ["Development"],
    blocks: [
      {
        type: "prose",
        text: "We improved the existing data-processing, quality-control, target-screening, epitope and circRNA-design functions.",
      },
    ],
  },
  {
    id: "dry-2026-05-01-7",
    start: "2026-05-01",
    end: "2026-05-08",
    title: "TNBC analysis and antigen-evidence framework",
    tags: ["Brainstorming", "Analysis", "Design"],
    blocks: [
      {
        type: "discussion",
        label: "Brainstorming",
        title: "Choosing a complementary antigen panel",
        text: "Discussion focus: Compare the evidence for TROP2, B7-H4, Nectin-4 and LIV-1 across protein, cell and patient levels rather than ranking candidates solely by expression.",
      },
      {
        type: "prose",
        text: "We organised the TNBC candidate antigens and data sources and established an evaluation framework spanning protein evidence, malignant-cell localisation, patient representation and clinical context.",
      },
    ],
  },
  {
    id: "dry-2026-05-09-8",
    start: "2026-05-09",
    end: "2026-05-22",
    title: "Proteomic evidence",
    tags: ["Analysis"],
    blocks: [
      {
        type: "prose",
        text: "We analysed proteomic data for the four candidate antigens. PXD024322 supported all four at the protein level, while the paired PXD028102 analysis further supported tumour-associated increases in TROP2, B7-H4 and Nectin-4. LIV-1 was not quantified in the latter cohort and retained its evidence from PXD024322.",
      },
      {
        type: "figure",
        label: "Figure Dry-Figure1",
        title: "PXD024322 differential proteins",
        assets: ["dry_f1"],
        caption:
          "Volcano plot comparing TNBC and normal-breast protein abundance.",
      },
      {
        type: "figure",
        label: "Figure Dry-Figure2",
        title: "PXD024322 candidate abundance",
        assets: ["dry_f2"],
        caption:
          "Protein-abundance distributions of the four candidate antigens.",
      },
      {
        type: "figure",
        label: "Figure Dry-Figure3",
        title: "PXD028102 paired analysis",
        assets: ["dry_f3"],
        caption:
          "Volcano plot of paired tumour and adjacent-normal protein abundance.",
      },
      {
        type: "figure",
        label: "Figure Dry-Figure4",
        title: "PXD028102 candidate abundance",
        assets: ["dry_f4"],
        caption: "Paired-cohort abundance of TROP2, B7-H4 and Nectin-4.",
      },
    ],
  },
  {
    id: "dry-2026-05-23-9",
    start: "2026-05-23",
    end: "2026-05-31",
    title: "Single-cell localisation",
    tags: ["Analysis"],
    blocks: [
      {
        type: "prose",
        text: "We used single-cell analysis to locate the cellular sources of antigen expression. The analysis retained 39,324 cells, including 9,491 malignant cells. TROP2 alone was detected in 70.4% of malignant cells, and the four-gene union increased detection to 81.4%; the four genes were not simultaneously expressed in every malignant cell.",
      },
      {
        type: "figure",
        label: "Figure Dry-Figure5",
        title: "Single-cell lineages",
        assets: ["dry_f5"],
        caption: "Cell-lineage distribution in the TNBC single-cell subset.",
      },
      {
        type: "figure",
        label: "Figure Dry-Figure6",
        title: "Candidate-gene localisation",
        assets: ["dry_f6"],
        caption:
          "Candidate-gene expression across the analysed cell populations.",
      },
      {
        type: "figure",
        label: "Figure Dry-Figure7",
        title: "Malignant-cell panel detection",
        assets: ["dry_f7"],
        caption: "Four-gene panel detection in malignant cells across cases.",
      },
    ],
  },
  {
    id: "dry-2026-06-01-10",
    start: "2026-06-01",
    end: "2026-06-05",
    title: "Patient-level antigen representation",
    tags: ["Analysis"],
    blocks: [
      {
        type: "prose",
        text: "We assessed patient-level representation and organised evidence for the four-antigen combination. Under the predefined molecular criteria, the four-gene union represented 101 of 115 patients, or 88%. This describes antigen representation in the cohort, rather than HLA compatibility or clinical efficacy.",
      },
      {
        type: "figure",
        label: "Figure Dry-Figure8",
        title: "Patient-level representation",
        assets: ["dry_f8"],
        caption: "Four antigen-source genes across the patient cohort.",
      },
    ],
  },
  {
    id: "dry-2026-06-06-11",
    start: "2026-06-06",
    end: "2026-06-12",
    title: "Epitope prioritisation",
    tags: ["Brainstorming", "Analysis"],
    blocks: [
      {
        type: "discussion",
        label: "Brainstorming",
        title: "Prioritising traceable epitopes",
        text: "Discussion focus: Discuss binding and immunogenicity predictions in the HLA-A*02:01 context, retaining source-protein coordinates and evidence for experimental handoff.",
      },
      {
        type: "prose",
        text: "We predicted epitopes in the HLA-A*02:01 context and reviewed their source-protein positions, producing 17 traceable candidates. Binding affinity, immunogenicity and source-protein context supported their progression to structural assessment.",
      },
      {
        type: "figure",
        label: "Figure Dry-Figure9",
        title: "Epitope prioritisation",
        assets: ["dry_f9"],
        caption:
          "Prediction and source-protein review leading to 17 candidates.",
      },
    ],
  },
  {
    id: "dry-2026-06-13-12",
    start: "2026-06-13",
    end: "2026-06-19",
    title: "Peptide–HLA structural review",
    tags: ["Analysis", "Validation"],
    blocks: [
      {
        type: "prose",
        text: "We reviewed peptide–HLA structures and established the 15 retained sequences for handoff. Of the 17 candidates, four TROP2, two B7-H4, four Nectin-4 and five LIV-1 epitopes were retained. HILHVSFLA and FLAEASVRG were excluded from the first-round coding set. The representative peptide–HLA image is a computational structure, rather than an immune-function experiment.",
      },
      {
        type: "figure",
        label: "Figure Dry-Figure10",
        title: "Peptide–HLA structural model",
        assets: ["dry_f10"],
        caption: "Predicted peptide placement within the HLA binding groove.",
      },
    ],
  },
  {
    id: "dry-2026-06-20-13",
    start: "2026-06-20",
    end: "2026-06-20",
    title: "Mapping merged coding designs",
    tags: ["Brainstorming", "Review & Handoff"],
    blocks: [
      {
        type: "discussion",
        label: "Brainstorming",
        title: "Handing sequences to Wet Lab",
        text: "Discussion focus: Check the 17-candidate, 15-epitope and 13-design mapping, including both overlapping pairs and their continuous coding sequences.",
      },
      {
        type: "prose",
        text: "We checked the two overlapping pairs and the 13 design labels with Wet Lab. The continuous coding fragments were TLIYYLDEIPPKF and FQARLRLRVLVPPL, corresponding to the merged labels TROP2 CTL3 and NECTIN4 CTL1, respectively.",
      },
    ],
  },
  {
    id: "dry-2026-06-21-14",
    start: "2026-06-21",
    end: "2026-07-10",
    title: "Existing prototype improvement and organisation",
    tags: ["Brainstorming", "Development"],
    blocks: [
      {
        type: "discussion",
        label: "Brainstorming",
        title: "Connecting analysis steps",
        text: "Discussion focus: Keep candidate identifiers and outputs consistent across import, screening, prediction and experimental sequence handoff.",
      },
      {
        type: "prose",
        text: "We improved the existing CircuForge prototype and organised the linked data-import, quality-control, target-screening and epitope-prediction functions. The V1 interfaces below illustrate this workflow.",
      },
      {
        type: "figure",
        label: "Figure Dry-Figure11",
        title: "V1.0 import and quality control",
        assets: ["dry_f11"],
        caption: "CircuForge V1.0 data-import and quality-control interface.",
      },
      {
        type: "figure",
        label: "Figure Dry-Figure12",
        title: "V1.0 target screening",
        assets: ["dry_f12"],
        caption: "CircuForge V1.0 candidate-target screening interface.",
      },
      {
        type: "figure",
        label: "Figure Dry-Figure13",
        title: "V1.0 epitope prediction",
        assets: ["dry_f13"],
        caption: "CircuForge V1.0 epitope-prediction interface.",
      },
    ],
  },
  {
    id: "dry-2026-07-11-15",
    start: "2026-07-11",
    end: "2026-07-31",
    title: "CircuForge V2 iteration",
    tags: ["Brainstorming", "Development"],
    blocks: [
      {
        type: "discussion",
        label: "Brainstorming",
        title: "Keeping evidence and researcher decisions",
        text: "Discussion focus: Discuss how recommendations, evidence, researcher review and design exports should remain connected across revisions.",
      },
      {
        type: "prose",
        text: "We iterated the evidence-processing workflow, compiler, export and traceability functions, refining how candidate sources and design decisions were retained.",
      },
    ],
  },
  {
    id: "dry-2026-08-01-16",
    start: "2026-08-01",
    end: "2026-08-16",
    title: "Candidate review and Cell2Dose framework",
    tags: ["Brainstorming", "Analysis", "Design"],
    blocks: [
      {
        type: "discussion",
        label: "Brainstorming",
        title: "Distinguishing measured inputs from assumptions",
        text: "Discussion focus: Identify which upcoming cell measurements can constrain parameters and which processes require literature values or uncertainty ranges.",
      },
      {
        type: "prose",
        text: "We supplemented the candidate-epitope evidence review and checked the correspondence between computational results and experimental labels.",
      },
      {
        type: "prose",
        text: "We prepared the sequence-handoff workflow and outlined the Cell2Dose framework using the planned experimental context. We organised literature parameters, structural assumptions and interfaces for cell measurements that would become available later.",
      },
    ],
  },
  {
    id: "dry-2026-08-24-17",
    start: "2026-08-24",
    end: "2026-08-25",
    title: "Combined result and sequence handoff",
    tags: ["Brainstorming", "Review & Handoff"],
    blocks: [
      {
        type: "discussion",
        label: "Brainstorming",
        title: "Aligning the Combined input",
        text: "Discussion focus: Keep the selected eight modules, sequence version, construct labels and mature-RNA input linked across Wet Lab preparation and structural analysis.",
      },
      {
        type: "prose",
        text: "We received the first-round results and checked the eight selected modules. Two experimentally selected modules from each antigen source were retained, aligning the Combined module list and input version between Dry and Wet Lab.",
      },
      {
        type: "prose",
        text: "We checked the full Combined sequence and its version to prepare inputs for structural computation.",
      },
      {
        type: "prose",
        text: "The confirmed sequence version was handed to Wet Lab for second-round material preparation.",
      },
    ],
  },
  {
    id: "dry-2026-08-26-18",
    start: "2026-08-26",
    end: "2026-08-30",
    title: "Cell2Dose comparison setup",
    tags: ["Preparation", "Design"],
    blocks: [
      {
        type: "prose",
        text: "We prepared the CCK8 and cytotoxicity data-processing workflow, background correction, curve-fitting interfaces and candidate-dose settings while coordinating the data handoff with Wet Lab.",
      },
    ],
  },
  {
    id: "dry-2026-08-31-19",
    start: "2026-08-31",
    end: "2026-08-31",
    title: "Cell2Dose input handoff",
    tags: ["Review & Handoff"],
    blocks: [
      {
        type: "prose",
        text: "We received the CCK8 and three-ratio Blank/Combined cytotoxicity records, checked their sample identities and units, and fixed the input version for core response-curve calibration.",
      },
    ],
  },
  {
    id: "dry-2026-09-01-20",
    start: "2026-09-01",
    end: "2026-09-02",
    title: "Cell2Dose core response-curve calibration",
    tags: ["Brainstorming", "Analysis", "Validation"],
    blocks: [
      {
        type: "discussion",
        label: "Brainstorming",
        title: "Calibrating the core cell responses",
        text: "Discussion focus: Align the received CCK-8 and three-ratio killing inputs, background correction and parameter units, retaining uncertainty in the fitted responses.",
      },
      {
        type: "prose",
        text: "We fitted the viability and background-corrected killing curves using the two received core datasets. The posterior median E50 was 407.26 ng, with a 95% credible interval of 402.17–422.93 ng; K_ET was 38.08, with a 95% credible interval of 32.94–44.02. These are fitted model parameters, rather than additional experimental measurements.",
      },
      {
        type: "figure",
        label: "Figure Dry-Figure14",
        title: "Viability-response calibration",
        assets: ["dry_f14"],
        caption:
          "Cell2Dose viability-response fit and observed cell measurements.",
      },
      {
        type: "figure",
        label: "Figure Dry-Figure15",
        title: "Killing-response calibration",
        assets: ["dry_f15"],
        caption: "Cell2Dose fit to background-corrected killing measurements.",
      },
    ],
  },
  {
    id: "dry-2026-09-02-21",
    start: "2026-09-02",
    end: "2026-09-03",
    title: "Preliminary Cell2Dose scenario comparison",
    tags: ["Analysis"],
    blocks: [
      {
        type: "prose",
        text: "We compared candidate doses using the calibrated core response curves and declared mechanistic assumptions, and checked uncertainty and numerical consistency. We organised the approximately 10 µg candidate region for discussion with Wet Lab and the supervisors.",
      },
    ],
  },
  {
    id: "dry-2026-09-04-22",
    start: "2026-09-04",
    end: "2026-09-04",
    title: "Confirmation of the animal-study dose",
    tags: ["Review & Handoff"],
    blocks: [
      {
        type: "prose",
        text: "We reviewed the available core cell-response calibration and conditional Cell2Dose comparison alongside the experimental plan, and confirmed the 10 µg study dose with Wet Lab and the supervisors. This provided a basis for implementation without establishing an experimentally validated optimal dose.",
      },
    ],
  },
  {
    id: "dry-2026-09-05-23",
    start: "2026-09-05",
    end: "2026-09-18",
    title: "TorusFold input, segmentation and workflow organisation",
    tags: ["Brainstorming", "Analysis", "Design"],
    blocks: [
      {
        type: "discussion",
        label: "Brainstorming",
        title: "Modelling long RNA while retaining coordinates",
        text: "Discussion focus: Discuss overlapping fragments, assembly consistency and separate presentation of fragment-refinement metrics and the full-length structural hypothesis.",
      },
      {
        type: "prose",
        text: "We organised the mature Combined RNA input, segmentation scheme, structure-analysis workflow and available outputs. The 2,013 nt sequence was represented by ten fragments of 195–249 nt: eight adjacent pairs overlapped by 30 nt and the final pair by 50 nt, retaining the original sequence coordinates.",
      },
      {
        type: "figure",
        label: "Figure Dry-Figure16",
        title: "Combined RNA segmentation",
        assets: ["dry_f16"],
        caption:
          "Ten overlapping segments preserve the 2,013 nt Combined sequence.",
      },
    ],
  },
  {
    id: "dry-2026-09-06-24",
    start: "2026-09-06",
    end: "2026-09-06",
    title: "Official TorusFold repository publication",
    tags: ["Review & Handoff"],
    blocks: [
      {
        type: "prose",
        text: "We created the official TorusFold repository and uploaded a code snapshot and the existing full-length demonstration outputs.",
      },
    ],
  },
  {
    id: "dry-2026-09-19-25",
    start: "2026-09-19",
    end: "2026-09-27",
    title: "TorusFold refinement and comparisons",
    tags: ["Analysis", "Validation"],
    blocks: [
      {
        type: "prose",
        text: "We compared structural metrics before and after refinement. In the 200 nt test fragment, non-adjacent P-atom close-contact pairs decreased from 8 to 4 and then 3, while terminal P–P distance decreased from 6.751 Å to 5.899 Å and then 5.673 Å. The full-length 2,013 nt model contained 42,831 atoms. Fragment-refinement results and the full-length structural hypothesis are presented separately.",
      },
      {
        type: "figure",
        label: "Figure Dry-Figure17",
        title: "Fragment refinement",
        assets: ["dry_f17"],
        caption:
          "Structural views of the 200 nt fragment before and after refinement.",
      },
      {
        type: "figure",
        label: "Figure Dry-Figure18",
        title: "Full-length RNA model",
        assets: ["dry_f18"],
        caption:
          "Computational structural hypothesis for the 2,013 nt Combined RNA.",
      },
    ],
  },
  {
    id: "dry-2026-09-20-26",
    start: "2026-09-20",
    end: "2026-09-20",
    title: "CircuForge interface and repository integration",
    tags: ["Brainstorming", "Development"],
    blocks: [
      {
        type: "discussion",
        label: "Brainstorming",
        title: "Making a handoff usable",
        text: "Discussion focus: Review how users understand inputs, inspect intermediate states and confirm final exports.",
      },
      {
        type: "prose",
        text: "We integrated the CircuForge interface, bilingual support, deployment configuration and development history. The V2 demonstration interfaces show Evidence Cards, review states, the Design Cart and export functions using a hepatocellular-carcinoma proteomics demo project.",
      },
      {
        type: "figure",
        label: "Figure Dry-Figure19",
        title: "V2.0 Design Cart",
        assets: ["dry_f19"],
        caption:
          "Design Cart shown with the hepatocellular-carcinoma demo project.",
      },
      {
        type: "figure",
        label: "Figure Dry-Figure20",
        title: "V2.0 construct review",
        assets: ["dry_f20"],
        caption: "Construct-review interface in the software demo project.",
      },
      {
        type: "figure",
        label: "Figure Dry-Figure21",
        title: "V2.0 export",
        assets: ["dry_f21"],
        caption: "File-export interface in the software demo project.",
      },
      {
        type: "figure",
        label: "Figure Dry-Figure22",
        title: "V2.0 Evidence Card",
        assets: ["dry_f22"],
        caption: "Candidate-evidence display in the software demo project.",
      },
    ],
  },
  {
    id: "dry-2026-09-22-27",
    start: "2026-09-22",
    end: "2026-09-22",
    title: "Compiler and junction-interface checks",
    tags: ["Validation"],
    blocks: [
      {
        type: "prose",
        text: "We updated the compiler and junction interface, documentation and associated checks.",
      },
    ],
  },
  {
    id: "dry-2026-10-01-28",
    start: "2026-10-01",
    end: "2026-10-06",
    title: "TorusFold interface and reproducibility updates",
    tags: ["Development", "Validation"],
    blocks: [
      {
        type: "prose",
        text: "We improved the interface, molecular viewer, refinement implementation and reproducibility documentation.",
      },
    ],
  },
  {
    id: "dry-2026-10-02-29",
    start: "2026-10-02",
    end: "2026-10-02",
    title: "CircuForge mature-RNA boundary correction",
    tags: ["Development", "Validation"],
    blocks: [
      {
        type: "prose",
        text: "We corrected the mature-RNA boundary handling and updated the associated software records.",
      },
    ],
  },
  {
    id: "dry-2026-10-08-30",
    start: "2026-10-08",
    end: "2026-10-13",
    title: "Software export, reload and compatibility checks",
    tags: ["Validation"],
    blocks: [
      {
        type: "prose",
        text: "We checked export, readback and project reload, and continued deployment, compatibility and control updates for the software handoff.",
      },
    ],
  },
  {
    id: "dry-2026-10-09-31",
    start: "2026-10-09",
    end: "2026-10-15",
    title: "Endpoint-data comparison and integrated model evaluation",
    tags: ["Brainstorming", "Analysis", "Validation"],
    blocks: [
      {
        type: "discussion",
        label: "Brainstorming",
        title: "Separating calibration, inputs and comparisons",
        text: "Discussion focus: Which observations informed each calculation, and which were used for comparison? Keep input provenance and model assumptions visible when integrating tumour and immune evidence.",
      },
      {
        type: "prose",
        text: "As endpoint and imaging records became available, we checked sample correspondence and separated core cell-response calibration, immune-response inputs and animal-outcome comparisons. The integrated Cell2Dose evaluation used 1,024 parameter sets to scan 301 doses from 0 to 30 µg at 0.1 µg intervals. Joint passage of the four model criteria was 81.15% at 10.0 µg and reached a grid maximum of 81.45% at 10.2 µg. These conditional calculations supplied quantitative context for the study dose; they were recorded separately from the earlier core calibration and dose discussion.",
      },
    ],
  },
  {
    id: "dry-2026-10-14-32",
    start: "2026-10-14",
    end: "2026-10-15",
    title: "Primary Dry Lab materials and handoff",
    tags: ["Review & Handoff"],
    blocks: [
      {
        type: "prose",
        text: "We organised the main figures, code, model-input notes and version records and handed these materials to Wiki.",
      },
    ],
  },
  {
    id: "dry-2026-10-17-33",
    start: "2026-10-17",
    end: "2026-10-17",
    title: "TorusFold deliverable verification and Dry Lab completion",
    tags: ["Brainstorming", "Validation", "Review & Handoff"],
    blocks: [
      {
        type: "discussion",
        label: "Brainstorming",
        title: "Checking what the delivered files support",
        text: "Discussion focus: Distinguish file and statistic checks from rerunning the complete prediction pipeline or validating structural accuracy. Keep reproduced checks and recorded discrepancies visible.",
      },
      {
        type: "prose",
        text: "We checked the delivered files at public commit b6c4171 using NumPy 2.3.5. With the original LF sequence file, 20 of the script’s 32 checks reproduced; 12 checks retained the recorded intra_pc reconstruction discrepancies. Converting the sequence file to Windows CRLF introduced an additional file-hash mismatch, giving 19/32. We completed the verification record and Dry Lab handoff; this was a check of existing deliverables rather than a full pipeline rerun.",
      },
    ],
  },
];

export const wikiEntries: NotebookEntry[] = [
  {
    id: "wiki-2026-01-06-1",
    start: "2026-01-06",
    end: "2026-01-06",
    title: "Wiki roles and documentation",
    tags: ["Brainstorming", "Preparation"],
    blocks: [
      {
        type: "discussion",
        label: "Brainstorming",
        title: "Audiences and group handoff",
        text: "Discussion focus: Discuss what visitors need to understand and how groups should submit text and media for the Wiki.",
      },
      {
        type: "prose",
        text: "We completed Wiki subgroup recruitment and role assignments and established shared documentation workflows.",
      },
    ],
  },
  {
    id: "wiki-2026-01-08-2",
    start: "2026-01-08",
    end: "2026-01-12",
    title: "Development setup and Wiki review",
    tags: ["Learning", "Preparation"],
    blocks: [
      {
        type: "prose",
        text: "We configured Node.js, VSCode and Git, reviewed static-hosting requirements and studied previous Wikis.",
      },
    ],
  },
  {
    id: "wiki-2026-01-14-3",
    start: "2026-01-14",
    end: "2026-01-14",
    title: "Learning roadmap",
    tags: ["Brainstorming", "Design"],
    blocks: [
      {
        type: "discussion",
        label: "Brainstorming",
        title: "Learning and collaboration",
        text: "Discussion focus: Plan the order of technical learning, Git collaboration and reusable interface work.",
      },
      {
        type: "prose",
        text: "We outlined the learning roadmap, Git branching conventions and initial self-study tasks.",
      },
    ],
  },
  {
    id: "wiki-2026-01-17-4",
    start: "2026-01-17",
    end: "2026-01-22",
    title: "HTML and CSS practice",
    tags: ["Learning"],
    blocks: [
      {
        type: "prose",
        text: "We studied semantic HTML and CSS fundamentals and built practice pages.",
      },
    ],
  },
  {
    id: "wiki-2026-01-28-5",
    start: "2026-01-28",
    end: "2026-02-02",
    title: "Responsive layout and Git practice",
    tags: ["Learning"],
    blocks: [
      {
        type: "prose",
        text: "We practised Flexbox, responsive media queries and multi-branch integration workflows.",
      },
    ],
  },
  {
    id: "wiki-2026-02-07-6",
    start: "2026-02-07",
    end: "2026-02-07",
    title: "Interaction prototypes",
    tags: ["Brainstorming", "Design", "Development"],
    blocks: [
      {
        type: "discussion",
        label: "Brainstorming",
        title: "Clear interaction states",
        text: "Discussion focus: Discuss accidental-click handling, visible progress and feedback for unfamiliar operations.",
      },
      {
        type: "prose",
        text: "We explored DOM events, accidental-click prevention in multi-step interactions and biological-themed cursors.",
      },
    ],
  },
  {
    id: "wiki-2026-02-11-7",
    start: "2026-02-11",
    end: "2026-02-14",
    title: "JavaScript and virtual-experiment planning",
    tags: ["Learning", "Design"],
    blocks: [
      {
        type: "prose",
        text: "We studied ES6+ and discussed the revival and staining workflows with Wet Lab for virtual-course design.",
      },
    ],
  },
  {
    id: "wiki-2026-02-15-8",
    start: "2026-02-15",
    end: "2026-02-15",
    title: "Virtual Laboratory kickoff",
    tags: ["Brainstorming", "Design", "Development"],
    blocks: [
      {
        type: "discussion",
        label: "Brainstorming",
        title: "Virtual Laboratory modules",
        text: "Discussion focus: Compare frameworks and decide how experimental steps, explanations and interactions should be divided into prototypes.",
      },
      {
        type: "prose",
        text: "We reviewed JavaScript challenges, compared frameworks and began the Virtual Laboratory project.",
      },
    ],
  },
  {
    id: "wiki-2026-02-22-9",
    start: "2026-02-22",
    end: "2026-02-27",
    title: "Component architecture",
    tags: ["Learning"],
    blocks: [
      {
        type: "prose",
        text: "We evaluated Vite and component-based development and selected React with TypeScript as the learning path.",
      },
    ],
  },
  {
    id: "wiki-2026-03-05-10",
    start: "2026-03-05",
    end: "2026-03-10",
    title: "First experiment prototypes",
    tags: ["Design", "Development"],
    blocks: [
      {
        type: "prose",
        text: "Parallel work covered TypeScript and component decomposition, alongside workflow mapping and assets for revival and staining.",
      },
    ],
  },
  {
    id: "wiki-2026-03-15-11",
    start: "2026-03-15",
    end: "2026-03-15",
    title: "Prototype review",
    tags: ["Brainstorming", "Validation"],
    blocks: [
      {
        type: "discussion",
        label: "Brainstorming",
        title: "Guiding the first virtual operations",
        text: "Discussion focus: Review whether prompts, experiment purpose and transitions between modules are clear to a new user.",
      },
      {
        type: "prose",
        text: "We reviewed componentisation progress and demonstrated interactions for the first two virtual experiments.",
      },
    ],
  },
  {
    id: "wiki-2026-03-21-12",
    start: "2026-03-21",
    end: "2026-03-26",
    title: "Extraction-module interactions",
    tags: ["Design", "Development"],
    blocks: [
      {
        type: "prose",
        text: "We practised modal and tab logic and designed centrifugation and gel-cutting interactions for plasmid and gel extraction modules.",
      },
    ],
  },
  {
    id: "wiki-2026-04-03-13",
    start: "2026-04-03",
    end: "2026-04-08",
    title: "PCR and assembly-module interactions",
    tags: ["Learning", "Development"],
    blocks: [
      {
        type: "prose",
        text: "We studied TailwindCSS and modelled pipetting and water-bath interactions for PCR, double digestion and ligation.",
      },
    ],
  },
  {
    id: "wiki-2026-04-10-14",
    start: "2026-04-10",
    end: "2026-04-10",
    title: "Technical stack and canvas",
    tags: ["Brainstorming", "Design"],
    blocks: [
      {
        type: "discussion",
        label: "Brainstorming",
        title: "Canvas and navigation",
        text: "Discussion focus: Discuss how the 16:9 canvas and directory should respond to different screens while keeping the current step visible.",
      },
      {
        type: "prose",
        text: "We settled the React, TypeScript and Tailwind stack and reviewed the responsive 16:9 canvas and three-dimensional directory design.",
      },
    ],
  },
  {
    id: "wiki-2026-04-17-15",
    start: "2026-04-17",
    end: "2026-04-23",
    title: "Transformation and verification modules",
    tags: ["Learning", "Development"],
    blocks: [
      {
        type: "prose",
        text: "We practised Git merges and review workflows and designed transformation and fluorescent-clone verification interactions.",
      },
    ],
  },
  {
    id: "wiki-2026-05-02-16",
    start: "2026-05-02",
    end: "2026-05-08",
    title: "Nine-experiment integration",
    tags: ["Brainstorming", "Development"],
    blocks: [
      {
        type: "discussion",
        label: "Brainstorming",
        title: "Connecting nine virtual experiments",
        text: "Discussion focus: Review continuity between experiments and the placement of step indicators, questions and equipment activities.",
      },
      {
        type: "prose",
        text: "We connected all nine virtual experiments and added step indicators, theory questions and equipment drag-and-drop activities.",
      },
    ],
  },
  {
    id: "wiki-2026-05-15-17",
    start: "2026-05-15",
    end: "2026-05-15",
    title: "Prototype and hosting review",
    tags: ["Validation"],
    blocks: [
      {
        type: "prose",
        text: "We reviewed the nine-experiment prototypes and checked the build and asset-loading approach against hosting requirements.",
      },
    ],
  },
  {
    id: "wiki-2026-05-21-18",
    start: "2026-05-21",
    end: "2026-05-26",
    title: "Reusable interface components",
    tags: ["Development"],
    blocks: [
      {
        type: "prose",
        text: "We extracted step indicators, citation tooltips and lightboxes and drafted the technical architecture specification.",
      },
    ],
  },
  {
    id: "wiki-2026-06-03-19",
    start: "2026-06-03",
    end: "2026-06-05",
    title: "Learning archive and development plan",
    tags: ["Preparation", "Review & Handoff"],
    blocks: [
      {
        type: "prose",
        text: "We archived study notes and prototype code and organised the official development schedule.",
      },
    ],
  },
  {
    id: "wiki-2026-06-06-20",
    start: "2026-06-06",
    end: "2026-06-06",
    title: "Official repository setup",
    tags: ["Preparation"],
    blocks: [
      {
        type: "prose",
        text: "We concluded the initial learning phase, initialised the official iGEM GitLab repository and configured its baseline settings.",
      },
    ],
  },
  {
    id: "wiki-2026-06-10-21",
    start: "2026-06-10",
    end: "2026-06-18",
    title: "Production layout and routing",
    tags: ["Development"],
    blocks: [
      {
        type: "prose",
        text: "We confirmed the React 19, TypeScript, Vite and TailwindCSS setup and built routing and global layout skeletons.",
      },
    ],
  },
  {
    id: "wiki-2026-06-25-22",
    start: "2026-06-25",
    end: "2026-07-05",
    title: "Visual design system",
    tags: ["Design"],
    blocks: [
      {
        type: "prose",
        text: "We established the colour palette, typography scale and spacing conventions.",
      },
    ],
  },
  {
    id: "wiki-2026-07-15-23",
    start: "2026-07-15",
    end: "2026-07-28",
    title: "Home Story and shared templates",
    tags: ["Design", "Development"],
    blocks: [
      {
        type: "prose",
        text: "We built the scroll-driven Home Story, back-to-top navigation, footer and reusable subpage templates.",
      },
    ],
  },
  {
    id: "wiki-2026-08-25-24",
    start: "2026-08-25",
    end: "2026-09-05",
    title: "Molecular viewer integration",
    tags: ["Development"],
    blocks: [
      {
        type: "prose",
        text: "We integrated Molstar to display the TROP2-CTL1 protein complex interactively.",
      },
    ],
  },
  {
    id: "wiki-2026-09-12-25",
    start: "2026-09-12",
    end: "2026-09-19",
    title: "Page Skins and navigation",
    tags: ["Development"],
    blocks: [
      {
        type: "prose",
        text: "We refactored routing with modular Page Skins and a bookmark-style contents sidebar.",
      },
    ],
  },
  {
    id: "wiki-2026-09-20-26",
    start: "2026-09-20",
    end: "2026-09-26",
    title: "First content pages",
    tags: ["Development"],
    blocks: [
      {
        type: "prose",
        text: "We built initial Description, SDG and Team Member pages from the first content deliveries.",
      },
    ],
  },
  {
    id: "wiki-2026-09-27-27",
    start: "2026-09-27",
    end: "2026-09-30",
    title: "Virtual Laboratory migration",
    tags: ["Development"],
    blocks: [
      {
        type: "prose",
        text: "We moved the nine existing virtual modules into the main repository and added asset-indexing scripts.",
      },
    ],
  },
  {
    id: "wiki-2026-10-01-28",
    start: "2026-10-01",
    end: "2026-10-06",
    title: "Scientific content integration",
    tags: ["Development"],
    blocks: [
      {
        type: "prose",
        text: "We processed the available text and in vitro results and developed the Wet Lab protocol ring atlas, Results page structure and Attributions reader.",
      },
    ],
  },
  {
    id: "wiki-2026-10-07-29",
    start: "2026-10-07",
    end: "2026-10-11",
    title: "Interactive pages and media",
    tags: ["Development"],
    blocks: [
      {
        type: "prose",
        text: "We uploaded available media to iGEM-hosted assets and developed interactive components for model outputs, the Engineering cycle wheel and educational games.",
      },
    ],
  },
  {
    id: "wiki-2026-10-12-30",
    start: "2026-10-12",
    end: "2026-10-15",
    title: "Final page integration",
    tags: ["Development", "Validation"],
    blocks: [
      {
        type: "prose",
        text: "We continued the Software showcase, Education gallery and Entrepreneurship modules, received the final Wet Lab materials and the main Dry Lab delivery, and checked cross-page integration and responsive layouts.",
      },
    ],
  },
  {
    id: "wiki-2026-10-16-31",
    start: "2026-10-16",
    end: "2026-10-20",
    title: "Page checks and final content integration — ongoing and scheduled",
    tags: ["Brainstorming", "Development", "Validation"],
    blocks: [
      {
        type: "discussion",
        label: "Brainstorming",
        title: "Cross-page scientific consistency",
        text: "Discussion focus: Check whether Notebook, Engineering, Results and Model use consistent sample names, chronology and evidence descriptions.",
      },
      {
        type: "prose",
        text: "We continue page and asset checks and integrate the final group deliveries, including the Dry Lab verification record completed on 17 October. Caption, link, cross-page and responsive-layout checks through 20 October remain part of the current schedule.",
      },
    ],
  },
  {
    id: "wiki-2026-10-21-32",
    start: "2026-10-21",
    end: "2026-10-21",
    title: "Final build and page checks — scheduled",
    tags: ["Validation", "Review & Handoff"],
    blocks: [
      {
        type: "prose",
        text: "We plan to complete the final page checks, build verification and submission preparation on 21 October.",
      },
    ],
  },
];

export const notebookGroups: NotebookGroup[] = [
  { id: "wet-lab", label: "Wet Lab", intro: [], entries: wetLabEntries },
  { id: "dry-lab", label: "Dry Lab", intro: [], entries: dryLabEntries },
  {
    id: "wiki",
    label: "Wiki",
    intro: [
      "The January–early June entries cover technical learning and Virtual Laboratory prototypes. Development in the official iGEM GitLab repository began on 6 June. Page development and experimental-content integration are recorded separately.",
    ],
    entries: wikiEntries,
  },
  {
    id: "engagement",
    label: "Engagement",
    intro: [],
    entries: engagementEntries,
  },
];

export const notebookPage: WikiPageContent = {
  route: "/notebook",
  category: "project",
  chapter: "Project / 06 of 07",
  eyebrow: "Notebook",
  title: "Notebook",
  lede: "",
  boundary: "",
  visual: "notebook-trace",
  visualLabel: "Notebook",
  visualSteps: [],
  facts: [],
  sections: [
    {
      id: "notebook-wet-lab",
      index: "01",
      kicker: "",
      title: "Notebook",
      summary: "",
      hideHeading: true,
      blocks: [{ type: "feature", key: "notebook-workspace" }],
    },
  ],
  links: [
    { path: "/experiments", label: "Protocol Library" },
    { path: "/results", label: "Experimental Evidence" },
    { path: "/safety-and-security", label: "Biosafety Guardrails" },
    { path: "/engineering", label: "DBTL Iteration Log" },
  ],
  next: {
    path: "/safety-and-security",
    label: "Safety and Security",
    title: "Where Must Innovation Draw the Line?",
    description: "Exhaustive lab notes prove that powerful synthetic biology demands vigilant containment. Review our BSL-2 protocols, animal ethics, and dual-use risk assessments.",
  },
};
