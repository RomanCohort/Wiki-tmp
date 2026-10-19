const figure0 = "https://static.igem.wiki/teams/6056/wiki/files/pages/dry-lab/software/figure-01-integration-overview.webp";
const figure1 = "https://static.igem.wiki/teams/6056/wiki/files/pages/dry-lab/software/figure-02-candidate-workflow.webp";
const figure2 = "https://static.igem.wiki/teams/6056/wiki/files/pages/dry-lab/software/figure-03-prepare-data.webp";
const figure3 = "https://static.igem.wiki/teams/6056/wiki/files/pages/dry-lab/software/figure-04a-comparison-design.webp";
const figure4 = "https://static.igem.wiki/teams/6056/wiki/files/pages/dry-lab/software/figure-04b-evidence-card.webp";
const figure5 = "https://static.igem.wiki/teams/6056/wiki/files/pages/dry-lab/software/figure-05a-epitope-prediction.webp";
const figure6 = "https://static.igem.wiki/teams/6056/wiki/files/pages/dry-lab/software/figure-05b-candidate-epitopes.webp";
const figure7 = "https://static.igem.wiki/teams/6056/wiki/files/pages/dry-lab/software/figure-06a-assembly.webp";
const figure8 = "https://static.igem.wiki/teams/6056/wiki/files/pages/dry-lab/software/figure-06b-junction-review.webp";
const figure9 = "https://static.igem.wiki/teams/6056/wiki/files/pages/dry-lab/software/figure-07a-backbone-import.webp";
const figure10 = "https://static.igem.wiki/teams/6056/wiki/files/pages/dry-lab/software/figure-08-downloads.webp";
const figure11 = "https://static.igem.wiki/teams/6056/wiki/files/pages/dry-lab/software/figure-10-one-click-setup.webp";
const figure12 = "https://static.igem.wiki/teams/6056/wiki/files/pages/dry-lab/software/figure-11-run-console.webp";
const figure13 = "https://static.igem.wiki/teams/6056/wiki/files/pages/dry-lab/software/figure-12-status-panel.webp";
const figure14 = "https://static.igem.wiki/teams/6056/wiki/files/pages/dry-lab/software/figure-13-circuforge-modules.webp";
const figure15 = "https://static.igem.wiki/teams/6056/wiki/files/pages/dry-lab/software/figure-14-torusfold-stages.webp";
const figure16 = "https://static.igem.wiki/teams/6056/wiki/files/pages/dry-lab/software/figure-15-workflow-evolution.webp";
const figure17 = "https://static.igem.wiki/teams/6056/wiki/files/pages/dry-lab/software/figure-16-software-exchange.webp";
const figure18 = "https://static.igem.wiki/teams/6056/wiki/files/pages/dry-lab/software/figure-17-consultation.webp";
const figure19 = "https://static.igem.wiki/teams/6056/wiki/files/pages/dry-lab/software/figure-18-team-discussion.webp";
const figure20 = "https://static.igem.wiki/teams/6056/wiki/files/pages/dry-lab/software/figure-19-circuforge-user-testing.webp";
const figure21 = "https://static.igem.wiki/teams/6056/wiki/files/pages/dry-lab/software/figure-20-torusfold-user-testing.webp";
const figure22 = "https://static.igem.wiki/teams/6056/wiki/files/pages/dry-lab/software/figure-21-epitope-structural-review.webp";
const figure23 = "https://static.igem.wiki/teams/6056/wiki/files/pages/dry-lab/software/figure-21b-epitope-position-burial.webp";
const figure24 = "https://static.igem.wiki/teams/6056/wiki/files/pages/dry-lab/software/figure-22-first-round-elispot.webp";
const figure25 = "https://static.igem.wiki/teams/6056/wiki/files/pages/dry-lab/software/figure-23a-combined-bsj.webp";
const figure26 = "https://static.igem.wiki/teams/6056/wiki/files/pages/dry-lab/software/figure-23b-combined-expression.webp";
const figure27 = "https://static.igem.wiki/teams/6056/wiki/files/pages/dry-lab/software/figure-24a-combined-elispot.webp";
const figure28 = "https://static.igem.wiki/teams/6056/wiki/files/pages/dry-lab/software/figure-24b-combined-target-killing.webp";

export interface SoftwareAssetEntry {
  fileName: string;
  localSourcePath: string;
  localSrc: string;
  uploadUrl: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
  figureLabel: string;
  section: string;
}

export const softwareFigures = {
  "figure-01-integration-overview": {
    fileName: "figure-01-integration-overview.webp",
    localSourcePath:
      "文案集/drylab/Software/Software-Wiki-CircuForge-TorusFold-English/图片和附件/figure-01-integration-overview.png",
    localSrc: figure0,
    uploadUrl: "https://static.igem.wiki/teams/6056/wiki/files/pages/dry-lab/software/figure-01-integration-overview.webp",
    width: 2400,
    height: 1680,
    alt: "Workflow from candidate review and ORF assembly to mature RNA and fragment-based circular modeling",
    caption:
      "CircuForge supports reviewed sequence design; TorusFold supports circular structure modeling. The sequence passes between the programs as a user-transferred file.",
    figureLabel: "FIG. 1",
    section: "Software",
  },
  "figure-02-candidate-workflow": {
    fileName: "figure-02-candidate-workflow.webp",
    localSourcePath:
      "文案集/drylab/Software/Software-Wiki-CircuForge-TorusFold-English/图片和附件/figure-02-candidate-workflow.png",
    localSrc: figure1,
    uploadUrl: "https://static.igem.wiki/teams/6056/wiki/files/pages/dry-lab/software/figure-02-candidate-workflow.webp",
    width: 2400,
    height: 1351,
    alt: "CircuForge candidate review, Design Cart, construct generation and export",
    caption:
      "CircuForge connects target screening, epitope selection, and construct design through the Design Cart.",
    figureLabel: "FIG. 2",
    section: "Software",
  },
  "figure-03-prepare-data": {
    fileName: "figure-03-prepare-data.webp",
    localSourcePath:
      "文案集/drylab/Software/Software-Wiki-CircuForge-TorusFold-English/图片和附件/figure-03-prepare-data.png",
    localSrc: figure2,
    uploadUrl: "https://static.igem.wiki/teams/6056/wiki/files/pages/dry-lab/software/figure-03-prepare-data.webp",
    width: 2400,
    height: 1350,
    alt: "Prepare data provides data-upload controls, a sample-information template, Load demo data, and Process data.",
    caption:
      "Prepare data provides data-upload controls, a sample-information template, Load demo data, and Process data.",
    figureLabel: "FIG. 3",
    section: "Software",
  },
  "figure-04a-comparison-design": {
    fileName: "figure-04a-comparison-design.webp",
    localSourcePath:
      "文案集/drylab/Software/Software-Wiki-CircuForge-TorusFold-English/图片和附件/figure-04a-comparison-design.png",
    localSrc: figure3,
    uploadUrl: "https://static.igem.wiki/teams/6056/wiki/files/pages/dry-lab/software/figure-04a-comparison-design.webp",
    width: 2400,
    height: 1350,
    alt: "Comparison design and screening criteria are set separately. Run the differential analysis before applying screening criteria to the results.",
    caption:
      "Comparison design and screening criteria are set separately. Run the differential analysis before applying screening criteria to the results.",
    figureLabel: "FIG. 4A",
    section: "Software",
  },
  "figure-04b-evidence-card": {
    fileName: "figure-04b-evidence-card.webp",
    localSourcePath:
      "文案集/drylab/Software/Software-Wiki-CircuForge-TorusFold-English/图片和附件/figure-04b-evidence-card.png",
    localSrc: figure4,
    uploadUrl: "https://static.igem.wiki/teams/6056/wiki/files/pages/dry-lab/software/figure-04b-evidence-card.webp",
    width: 2400,
    height: 1350,
    alt: "Selecting P16401 displays its information in the Evidence Card. Add Selected Targets to Cart saves the selected target in the Design list.",
    caption:
      "Selecting P16401 displays its information in the Evidence Card. Add Selected Targets to Cart saves the selected target in the Design list.",
    figureLabel: "FIG. 4B",
    section: "Software",
  },
  "figure-05a-epitope-prediction": {
    fileName: "figure-05a-epitope-prediction.webp",
    localSourcePath:
      "文案集/drylab/Software/Software-Wiki-CircuForge-TorusFold-English/图片和附件/figure-05a-epitope-prediction.png",
    localSrc: figure5,
    uploadUrl: "https://static.igem.wiki/teams/6056/wiki/files/pages/dry-lab/software/figure-05a-epitope-prediction.webp",
    width: 2400,
    height: 1350,
    alt: "After loading a target from the Design list, set the peptide length and HLA allele, then start epitope prediction.",
    caption:
      "After loading a target from the Design list, set the peptide length and HLA allele, then start epitope prediction.",
    figureLabel: "FIG. 5A",
    section: "Software",
  },
  "figure-05b-candidate-epitopes": {
    fileName: "figure-05b-candidate-epitopes.webp",
    localSourcePath:
      "文案集/drylab/Software/Software-Wiki-CircuForge-TorusFold-English/图片和附件/figure-05b-candidate-epitopes.png",
    localSrc: figure6,
    uploadUrl: "https://static.igem.wiki/teams/6056/wiki/files/pages/dry-lab/software/figure-05b-candidate-epitopes.webp",
    width: 2400,
    height: 1350,
    alt: "Two candidate epitopes are checked in this example. They enter the Design list when the user clicks Add to design list.",
    caption:
      "Two candidate epitopes are checked in this example. They enter the Design list when the user clicks Add to design list.",
    figureLabel: "FIG. 5B",
    section: "Software",
  },
  "figure-06a-assembly": {
    fileName: "figure-06a-assembly.webp",
    localSourcePath:
      "文案集/drylab/Software/Software-Wiki-CircuForge-TorusFold-English/图片和附件/figure-06a-assembly.png",
    localSrc: figure7,
    uploadUrl: "https://static.igem.wiki/teams/6056/wiki/files/pages/dry-lab/software/figure-06a-assembly.webp",
    width: 2400,
    height: 1350,
    alt: "The two saved epitopes appear on the assembly page. The user checks the input, ORF name, and linkers before generating the ORF.",
    caption:
      "The two saved epitopes appear on the assembly page. The user checks the input, ORF name, and linkers before generating the ORF.",
    figureLabel: "FIG. 6A",
    section: "Software",
  },
  "figure-06b-junction-review": {
    fileName: "figure-06b-junction-review.webp",
    localSourcePath:
      "文案集/drylab/Software/Software-Wiki-CircuForge-TorusFold-English/图片和附件/figure-06b-junction-review.png",
    localSrc: figure8,
    uploadUrl: "https://static.igem.wiki/teams/6056/wiki/files/pages/dry-lab/software/figure-06b-junction-review.webp",
    width: 2400,
    height: 1352,
    alt: "Junction review provides HLA settings, consent for external submission, and a list of peptide windows to scan. The scan has not started in this screenshot.",
    caption:
      "Junction review provides HLA settings, consent for external submission, and a list of peptide windows to scan. The scan has not started in this screenshot.",
    figureLabel: "FIG. 6B",
    section: "Software",
  },
  "figure-07a-backbone-import": {
    fileName: "figure-07a-backbone-import.webp",
    localSourcePath:
      "文案集/drylab/Software/Software-Wiki-CircuForge-TorusFold-English/图片和附件/figure-07a-backbone-import.png",
    localSrc: figure9,
    uploadUrl: "https://static.igem.wiki/teams/6056/wiki/files/pages/dry-lab/software/figure-07a-backbone-import.webp",
    width: 2400,
    height: 1348,
    alt: "Backbone import, DNA feature map, and editing-method controls",
    caption:
      "Users import a backbone, inspect its feature map, and select the editing method and target region.",
    figureLabel: "FIG. 7A",
    section: "Software",
  },
  "figure-08-downloads": {
    fileName: "figure-08-downloads.webp",
    localSourcePath:
      "文案集/drylab/Software/Software-Wiki-CircuForge-TorusFold-English/图片和附件/figure-08-downloads.png",
    localSrc: figure10,
    uploadUrl: "https://static.igem.wiki/teams/6056/wiki/files/pages/dry-lab/software/figure-08-downloads.webp",
    width: 2400,
    height: 1350,
    alt: "Download files brings together downloads for construct sequences, annotations, result tables, and the validation package.",
    caption:
      "Download files brings together downloads for construct sequences, annotations, result tables, and the validation package.",
    figureLabel: "FIG. 8",
    section: "Software",
  },
  "figure-10-one-click-setup": {
    fileName: "figure-10-one-click-setup.webp",
    localSourcePath:
      "文案集/drylab/Software/Software-Wiki-CircuForge-TorusFold-English/图片和附件/figure-10-one-click-setup.png",
    localSrc: figure11,
    uploadUrl: "https://static.igem.wiki/teams/6056/wiki/files/pages/dry-lab/software/figure-10-one-click-setup.webp",
    width: 1080,
    height: 561,
    alt: "Users review installation options and external-tool requirements before starting a prediction.",
    caption:
      "Users review installation options and external-tool requirements before starting a prediction.",
    figureLabel: "FIG. 10",
    section: "Software",
  },
  "figure-11-run-console": {
    fileName: "figure-11-run-console.webp",
    localSourcePath:
      "文案集/drylab/Software/Software-Wiki-CircuForge-TorusFold-English/图片和附件/figure-11-run-console.png",
    localSrc: figure12,
    uploadUrl: "https://static.igem.wiki/teams/6056/wiki/files/pages/dry-lab/software/figure-11-run-console.webp",
    width: 980,
    height: 1132,
    alt: "Users follow stage messages and execution details in the run console.",
    caption:
      "Users follow stage messages and execution details in the run console.",
    figureLabel: "FIG. 11",
    section: "Software",
  },
  "figure-12-status-panel": {
    fileName: "figure-12-status-panel.webp",
    localSourcePath:
      "文案集/drylab/Software/Software-Wiki-CircuForge-TorusFold-English/图片和附件/figure-12-status-panel.png",
    localSrc: figure13,
    uploadUrl: "https://static.igem.wiki/teams/6056/wiki/files/pages/dry-lab/software/figure-12-status-panel.webp",
    width: 235,
    height: 316,
    alt: "Users inspect the saved stage, configuration, and checkpoint files.",
    caption:
      "Users inspect the saved stage, configuration, and checkpoint files.",
    figureLabel: "FIG. 12",
    section: "Software",
  },
  "figure-13-circuforge-modules": {
    fileName: "figure-13-circuforge-modules.webp",
    localSourcePath:
      "文案集/drylab/Software/Software-Wiki-CircuForge-TorusFold-English/图片和附件/figure-13-circuforge-modules.png",
    localSrc: figure14,
    uploadUrl: "https://static.igem.wiki/teams/6056/wiki/files/pages/dry-lab/software/figure-13-circuforge-modules.webp",
    width: 2400,
    height: 1350,
    alt: "CircuForge research-task modules connected through the Design Cart",
    caption:
      "CircuForge’s task-based modules transfer confirmed candidates through the Design Cart.",
    figureLabel: "FIG. 13",
    section: "Software",
  },
  "figure-14-torusfold-stages": {
    fileName: "figure-14-torusfold-stages.webp",
    localSourcePath:
      "文案集/drylab/Software/Software-Wiki-CircuForge-TorusFold-English/图片和附件/figure-14-torusfold-stages.png",
    localSrc: figure15,
    uploadUrl: "https://static.igem.wiki/teams/6056/wiki/files/pages/dry-lab/software/figure-14-torusfold-stages.webp",
    width: 2400,
    height: 1680,
    alt: "TorusFold pairing, fragment prediction, reconstruction, refinement, and stage outputs",
    caption:
      "TorusFold connects pairing information, fragment prediction, reconstruction, and refinement, saving outputs at each stage.",
    figureLabel: "FIG. 14",
    section: "Software",
  },
  "figure-15-workflow-evolution": {
    fileName: "figure-15-workflow-evolution.webp",
    localSourcePath:
      "文案集/drylab/Software/Software-Wiki-CircuForge-TorusFold-English/图片和附件/figure-15-workflow-evolution.png",
    localSrc: figure16,
    uploadUrl: "https://static.igem.wiki/teams/6056/wiki/files/pages/dry-lab/software/figure-15-workflow-evolution.webp",
    width: 2400,
    height: 1680,
    alt: "CircuForge development from candidate analysis to confirmed selection and construct export",
    caption:
      "CircuForge evolved from analysis modules into a connected candidate-review and construct-design workflow.",
    figureLabel: "FIG. 15",
    section: "Software",
  },
  "figure-16-software-exchange": {
    fileName: "figure-16-software-exchange.webp",
    localSourcePath:
      "文案集/drylab/Software/Software-Wiki-CircuForge-TorusFold-English/图片和附件/figure-16-software-exchange.png",
    localSrc: figure17,
    uploadUrl: "https://static.igem.wiki/teams/6056/wiki/files/pages/dry-lab/software/figure-16-software-exchange.webp",
    width: 1280,
    height: 815,
    alt: "Participants in the five-team online software exchange",
    caption:
      "Participants share software-development experience at an online exchange involving five iGEM teams.",
    figureLabel: "FIG. 16",
    section: "Software",
  },
  "figure-17-consultation": {
    fileName: "figure-17-consultation.webp",
    localSourcePath:
      "文案集/drylab/Software/Software-Wiki-CircuForge-TorusFold-English/图片和附件/figure-17-consultation.jpg",
    localSrc: figure18,
    uploadUrl: "https://static.igem.wiki/teams/6056/wiki/files/pages/dry-lab/software/figure-17-consultation.webp",
    width: 1706,
    height: 1279,
    alt: "Software consultation with Associate Professor Qingtian Guan",
    caption:
      "The team discusses the software workflow with Associate Professor Qingtian Guan.",
    figureLabel: "FIG. 17",
    section: "Software",
  },
  "figure-18-team-discussion": {
    fileName: "figure-18-team-discussion.webp",
    localSourcePath:
      "文案集/drylab/Software/Software-Wiki-CircuForge-TorusFold-English/图片和附件/figure-18-team-discussion.png",
    localSrc: figure19,
    uploadUrl: "https://static.igem.wiki/teams/6056/wiki/files/pages/dry-lab/software/figure-18-team-discussion.webp",
    width: 1280,
    height: 852,
    alt: "In-person software-engineering discussion",
    caption:
      "The team discusses module responsibilities, task management, and software deployment.",
    figureLabel: "FIG. 18",
    section: "Software",
  },
  "figure-19-circuforge-user-testing": {
    fileName: "figure-19-circuforge-user-testing.webp",
    localSourcePath:
      "文案集/drylab/Software/Software-Wiki-CircuForge-TorusFold-English/图片和附件/figure-19-circuforge-user-testing.png",
    localSrc: figure20,
    uploadUrl: "https://static.igem.wiki/teams/6056/wiki/files/pages/dry-lab/software/figure-19-circuforge-user-testing.webp",
    width: 2400,
    height: 1800,
    alt: "Team members testing the CircuForge browser workflow",
    caption:
      "Team members test CircuForge’s candidate-review and construct-design workflow.",
    figureLabel: "FIG. 19",
    section: "Software",
  },
  "figure-20-torusfold-user-testing": {
    fileName: "figure-20-torusfold-user-testing.webp",
    localSourcePath:
      "文案集/drylab/Software/Software-Wiki-CircuForge-TorusFold-English/图片和附件/figure-20-torusfold-user-testing.png",
    localSrc: figure21,
    uploadUrl: "https://static.igem.wiki/teams/6056/wiki/files/pages/dry-lab/software/figure-20-torusfold-user-testing.webp",
    width: 2275,
    height: 1279,
    alt: "Team members testing RNA-model inspection in TorusFold",
    caption:
      "Team members inspect the RNA model and review TorusFold’s result-viewing workflow.",
    figureLabel: "FIG. 20",
    section: "Software",
  },
  "figure-21-epitope-structural-review": {
    fileName: "figure-21-epitope-structural-review.webp",
    localSourcePath:
      "文案集/drylab/Software/Software-Wiki-CircuForge-TorusFold-English/图片和附件/figure-21-epitope-structural-review.png",
    localSrc: figure22,
    uploadUrl: "https://static.igem.wiki/teams/6056/wiki/files/pages/dry-lab/software/figure-21-epitope-structural-review.webp",
    width: 863,
    height: 570,
    alt: "AlphaFold 3 model-derived position-9 side-chain burial for 17 candidate peptides",
    caption:
      "Position-9 side-chain burial in AlphaFold 3 models supported the 17-to-15 candidate selection.",
    figureLabel: "FIG. 21A",
    section: "Software",
  },
  "figure-21b-epitope-position-burial": {
    fileName: "figure-21b-epitope-position-burial.webp",
    localSourcePath:
      "文案集/drylab/Software/Software-Wiki-CircuForge-TorusFold-English/图片和附件/figure-21b-epitope-position-burial.png",
    localSrc: figure23,
    uploadUrl: "https://static.igem.wiki/teams/6056/wiki/files/pages/dry-lab/software/figure-21b-epitope-position-burial.webp",
    width: 863,
    height: 717,
    alt: "Per-position side-chain burial across the 17 candidate peptides",
    caption:
      "Per-position side-chain burial complements terminal-anchor review across the 17 candidate peptide models.",
    figureLabel: "FIG. 21B",
    section: "Software",
  },
  "figure-22-first-round-elispot": {
    fileName: "figure-22-first-round-elispot.webp",
    localSourcePath:
      "文案集/drylab/Software/Software-Wiki-CircuForge-TorusFold-English/图片和附件/figure-22-first-round-elispot.png",
    localSrc: figure24,
    uploadUrl: "https://static.igem.wiki/teams/6056/wiki/files/pages/dry-lab/software/figure-22-first-round-elispot.webp",
    width: 2400,
    height: 814,
    alt: "First-round IFN-gamma ELISpot wells and raw counts for 13 epitope-encoding constructs",
    caption:
      "First-round IFN-γ ELISpot counts guided selection of two coding segments per antigen for Combined.",
    figureLabel: "FIG. 22",
    section: "Software",
  },
  "figure-23a-combined-bsj": {
    fileName: "figure-23a-combined-bsj.webp",
    localSourcePath:
      "文案集/drylab/Software/Software-Wiki-CircuForge-TorusFold-English/图片和附件/figure-23a-combined-bsj.png",
    localSrc: figure25,
    uploadUrl: "https://static.igem.wiki/teams/6056/wiki/files/pages/dry-lab/software/figure-23a-combined-bsj.webp",
    width: 937,
    height: 432,
    alt: "Sanger sequencing across the back-splice junction of the Wet Lab Combined construct",
    caption:
      "BSJ sequencing identifies the ligation junction in the experimentally tested Combined RNA.",
    figureLabel: "FIG. 23A",
    section: "Software",
  },
  "figure-23b-combined-expression": {
    fileName: "figure-23b-combined-expression.webp",
    localSourcePath:
      "文案集/drylab/Software/Software-Wiki-CircuForge-TorusFold-English/图片和附件/figure-23b-combined-expression.png",
    localSrc: figure26,
    uploadUrl: "https://static.igem.wiki/teams/6056/wiki/files/pages/dry-lab/software/figure-23b-combined-expression.webp",
    width: 1532,
    height: 745,
    alt: "Anti-FLAG Western blot of the Wet Lab circRNA construct with Blank and beta-actin controls",
    caption:
      "Anti-FLAG immunoblotting detects expression from the Wet Lab construct, with β-actin as the loading control.",
    figureLabel: "FIG. 23B",
    section: "Software",
  },
  "figure-24a-combined-elispot": {
    fileName: "figure-24a-combined-elispot.webp",
    localSourcePath:
      "文案集/drylab/Software/Software-Wiki-CircuForge-TorusFold-English/图片和附件/figure-24a-combined-elispot.png",
    localSrc: figure27,
    uploadUrl: "https://static.igem.wiki/teams/6056/wiki/files/pages/dry-lab/software/figure-24a-combined-elispot.webp",
    width: 2400,
    height: 659,
    alt: "Second-round IFN-gamma ELISpot wells comparing Blank, TROP2 singles, dual and Combined constructs",
    caption:
      "Second-round IFN-γ ELISpot compares Combined with Blank, single-segment, and dual-segment designs.",
    figureLabel: "FIG. 24A",
    section: "Software",
  },
  "figure-24b-combined-target-killing": {
    fileName: "figure-24b-combined-target-killing.webp",
    localSourcePath:
      "文案集/drylab/Software/Software-Wiki-CircuForge-TorusFold-English/图片和附件/figure-24b-combined-target-killing.png",
    localSrc: figure28,
    uploadUrl: "https://static.igem.wiki/teams/6056/wiki/files/pages/dry-lab/software/figure-24b-combined-target-killing.webp",
    width: 1891,
    height: 1115,
    alt: "MDA-MB-231 cell killing across three effector-to-target ratios and five construct groups",
    caption:
      "Vaccine-primed T-cell killing of MDA-MB-231 cells was measured across three effector-to-target ratios.",
    figureLabel: "FIG. 24B",
    section: "Software",
  },
} as const satisfies Record<string, SoftwareAssetEntry>;

export type SoftwareFigureKey = keyof typeof softwareFigures;
export const getSoftwareImage = (key: SoftwareFigureKey): string =>
  softwareFigures[key].uploadUrl;

export const softwareGuides = {
  circuforge: {
    fileName: "circuforge-usage-guide.pdf",
    caption: "CircuForge User Guide",
    description:
      "Read the illustrated guide for installation, target and epitope review, construct design, exports, and troubleshooting.",
    fallback: "If the preview is unavailable, use the links above.",
    localSourcePath: "public/assets/docs/software/circuforge-usage-guide.pdf",
    uploadUrl: "https://static.igem.wiki/teams/6056/wiki/files/pages/dry-lab/software/circuforge-usage-guide.pdf",
  },
  torusfold: {
    fileName: "torusfold-usage-guide.pdf",
    caption: "TorusFold User Guide",
    description:
      "Read the illustrated guide for environment setup, prediction, checkpoint recovery, model inspection, exports, and troubleshooting.",
    fallback: "If the preview is unavailable, use the links above.",
    localSourcePath: "public/assets/docs/software/torusfold-usage-guide.pdf",
    uploadUrl: "https://static.igem.wiki/teams/6056/wiki/files/pages/dry-lab/software/torusfold-usage-guide.pdf",
  },
} as const;

export const softwareVideo = {
  fileName: "figure-07b-registry-matching.webp",
  alt: "CircuForge Registry matching demonstration",
  caption:
    "Users review Registry DNA matches and confirm the Part IDs to write into construct annotations.",
  figureLabel: "FIG. 7B",
  localSourcePath:
    "public/assets/docs/software/figure-07b-registry-matching.webp",
  uploadUrl:
    "https://static.igem.wiki/teams/6056/wiki/files/pages/dry-lab/software/figure-07b-registry-matching.webp",
} as const;

export const softwareUsageVideo = {
  title: "JLU-FBH: CircuForge Usage Guide (2026) [English]",
  src: "https://video.igem.org/videos/embed/dpwGrMSSQS3dK8xeZXsYkT?subtitle=en",
  allow: "fullscreen",
  sandbox: "allow-same-origin allow-scripts allow-popups allow-forms",
} as const;

export const softwareModel = {
  fileName: "isrnaclong-final.pdb",
  localSourcePath: "public/assets/docs/software/isrnaclong-final.pdb",
  uploadUrl: "https://static.igem.wiki/teams/6056/wiki/files/pages/dry-lab/software/isrnaclong-final.pdb",
  residueCount: 2013,
  atomCount: 42831,
  chain: "A",
  stage: "Saved PPR-repaired model",
  figureLabel: "FIG. 9",
  caption:
    "Users rotate the saved model, adjust its display, and mark the circular junction.",
} as const;

/** Attachments keep their original names in the official software repository. */
export function getSoftwareResource(path: string): string {
  const file = path.replace(/^图片和附件\//, "");
  const repositoryFiles = new Set([
    "evidence/reference-case-evidence.zip",
    "evidence/reference-mature-region.fasta",
    "evidence/torusfold-headline-LF.log",
    "evidence/torusfold-resource-notes.md",
    "evidence/third-party/3Dmol-LICENSE.txt",
    "evidence/third-party/igem-munich-registry-LICENSE.txt",
    "evidence/third-party/pako-LICENSE.txt",
    "torusfold-example-viewer.html",
  ]);
  if (repositoryFiles.has(file)) {
    return `https://gitlab.igem.org/2026/software/jlu-fbh/circuforge/-/raw/main/docs/wiki-evidence/${file.replace(/^evidence\//, "")}`;
  }
  return `https://static.igem.wiki/teams/6056/wiki/files/pages/dry-lab/software/${file.toLowerCase()}`;
}
