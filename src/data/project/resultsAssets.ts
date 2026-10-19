import type { WikiContentBlock } from "../../components/wiki/wikiPageTypes";

/** Static figures use the official URLs from the current Results manuscript. */
export interface ResultsAssetEntry {
  fileName: string;
  localSourcePath: string;
  localSrc?: string;
  uploadUrl: string;
  alt: string;
  caption: string;
  section: string;
  width: number;
  height: number;
}
export const resultsFigureCaptions = {
  fig01: "Differential protein abundance in PXD024322.",
  fig02: "Abundance distributions of the four candidates in PXD024322.",
  fig03: "Paired differential abundance analysis in PXD028102.",
  fig04: "Paired abundance patterns for the three candidates in PXD028102.",
  fig05: "UMAP projection of 39,324 single cells from 10 TNBC patients.",
  fig06: "Candidate-gene expression in the GSE176078 TNBC single-cell dataset.",
  fig07: "Published TROP2 immunohistochemistry in TNBC.",
  fig08:
    "Published B7-H4 immunohistochemistry in TNBC and normal breast tissue.",
  fig09: "Published Nectin-4 immunohistochemistry in TNBC.",
  fig10: "Open-access SLC39A6 immunohistochemistry.",
  fig11:
    "Per-position side-chain burial for the 17 candidate epitopes, averaged over five models.",
  fig12:
    "Absolute buried area of the position-9 side chain for the 17 systems.",
  fig13: "Round 1 ELISpot wells and counts",
  fig14: "Round 1 killing of K562 by T cells primed with each construct.",
  fig15: "CD8/CD69 flow cytometry of T cells primed with TROP2-CTL1 and CTL2",
  fig16: "Map of the Combined vaccine plasmid pCirCure-circMEV (5267 bp)",
  fig17: "Agarose gel of target-fragment PCR products from the four epitope-encoding constructs",
  fig18:
    "Sanger trace across the back-splice junction (BSJ) of the Combined vaccine",
  fig19: "CD80⁺CD86⁺ double-positive DC frequencies for each group",
  fig20: "Quantification of DC maturation across groups",
  fig21: "Western blot of FLAG-tagged fusion protein in DCs",
  fig22: "CD8⁺CD69⁺ T-cell frequencies after DC–T co-culture",
  fig23: "Quantification of CD8⁺CD69⁺ frequencies across groups",
  fig24: "CD8⁺CD28⁺ T-cell frequencies after DC–T co-culture",
  fig25: "Quantification of CD8⁺CD28⁺ frequencies across groups",
  fig26: "CD45RO⁺CCR7⁻ effector-memory frequencies within CD8⁺ T cells",
  fig27: "Quantification of CD45RO⁺CCR7⁻ frequencies across groups",
  fig28: "Round 2 ELISpot wells and counts",
  fig29:
    "Killing of MDA-MB-231 by T cells primed with each construct, across E:T ratios",
  fig30:
    "Joint passage probability across tested doses. The 10.2 μg dose achieves peak conditional passage probability (0.8145) under the project's joint decision rule. The broad peak near 10 μg indicates robustness to small dosing variations.",
  fig31:
    "Key intermediate states at 10.2 μg dose. (A) Effector activity (blue) and suppression (red) over 35 days. (B) Cell-response interface showing equivalent effector-to-target ratio approaching saturation. (C) Per-capita tumor killing rate (effective rate after suppression, solid; before suppression, dashed). Five injection events create pulsed immune responses.",
  fig32:
    "Cell-inferred immune gains and composite effector score. Relative gains from DC maturation (CD80/CD86), T-cell activation (CD8/CD69), IFN-γ secretion, and Granzyme B. The geometric effector composite (orange) integrates the three T-cell readouts with equal weighting, providing the calibration anchor for immune-activation parameters. CD44/CD62L ratio is shown descriptively but not used in the composite.",
  fig33:
    "Model prediction versus literature-scale tumor growth. Gray: external untreated scenario; Blue: conditional 10.2 μg treatment prediction with 95% uncertainty interval. The model predicts moderate tumor suppression; observed outcomes showed stronger efficacy (ratio 0.104) but fell within the conditional simulation envelope.",
  fig34:
    "In vitro stability of circRNA versus linear precursor RNA at 37 °C — gel",
  fig35: "Relative remaining RNA over time",
  fig36:
    "Killing of four normal cell lines and MDA-MB-231 by vaccine-primed T cells",
  fig37: "Dose–viability curve of empty LNP on DCs after 24 h",
  fig38:
    "Map of the TROP2 overexpression lentiviral transfer plasmid (pLV3-CMV-TACSTD2-3×FLAG-CopGFP-Puro, 9259 bp)",
  fig39: "GFP fluorescence in 4T1 cells 48–72 h after lentiviral transduction",
  fig40: "Three-step gating strategy for sorting GFP⁺ 4T1 cells",
  fig41: "RT-PCR quantification of TROP2 mRNA in 4T1 cells",
  fig42: "Flow cytometric detection of surface TROP2 on 4T1 cells",
  fig43: "Excised tumours at endpoint (D35)",
  fig44: "Immunisation scheme for the three groups",
  fig45: "Tumour growth curves for the three groups",
  fig46: "CD8 / Granzyme B dual immunofluorescence of tumour tissue",
  fig47: "Splenic DC CD80⁺CD86⁺ maturation",
  fig48: "Splenic CD8⁺ T-cell CD69⁺ early activation",
  fig49: "CD44⁺CD62L⁺ central-memory frequencies within splenic CD8⁺ T cells",
  fig50: "IFN-γ⁺ frequencies within splenic CD8⁺ T cells",
  fig51: "Granzyme B⁺ frequencies within splenic CD8⁺ T cells",
} as const;
export const resultsAssets = {
  fig02: {
    fileName:
      "figure2-abundance-distributions-of-the-four-candidates-in-pxd024322.avif",
    localSourcePath:
      "文案集/project/results/图片和附件/02_PXD024322_four_target_batch_adjusted_log2_relative_boxplots_no_points.png",
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/pages/project/results/figure2-abundance-distributions-of-the-four-candidates-in-pxd024322.avif",
    alt: "Figure 2. Abundance distributions of the four candidates in PXD024322.",
    caption: "Abundance distributions of the four candidates in PXD024322.",
    section:
      "Target Discovery: From Four Antigens to Fifteen Testable Epitopes",
    width: 1280,
    height: 604,
  },
  fig04: {
    fileName:
      "figure4-paired-abundance-patterns-for-the-three-candidates-in-pxd028102.avif",
    localSourcePath:
      "文案集/project/results/图片和附件/PXD028102_imputed_log2_boxplots_no_points.png",
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/pages/project/results/figure4-paired-abundance-patterns-for-the-three-candidates-in-pxd028102.avif",
    alt: "Figure 4. Paired abundance patterns for the three candidates in PXD028102.",
    caption: "Paired abundance patterns for the three candidates in PXD028102.",
    section:
      "Target Discovery: From Four Antigens to Fifteen Testable Epitopes",
    width: 1280,
    height: 671,
  },
  fig05: {
    fileName:
      "figure5-umap-projection-of-39-324-single-cells-from-10-tnbc-patients.avif",
    localSourcePath:
      "文案集/project/results/图片和附件/12_harmony_umap_major_lineage_no_panel_letter.png",
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/pages/project/results/figure5-umap-projection-of-39-324-single-cells-from-10-tnbc-patients.avif",
    alt: "Figure 5. UMAP projection of 39,324 single cells from 10 TNBC patients.",
    caption: "UMAP projection of 39,324 single cells from 10 TNBC patients.",
    section:
      "Target Discovery: From Four Antigens to Fifteen Testable Epitopes",
    width: 1280,
    height: 1090,
  },
  fig06: {
    fileName:
      "figure6-candidate-gene-expression-in-the-gse176078-tnbc-single-cell-dataset.avif",
    localSourcePath:
      "文案集/project/results/图片和附件/11_candidate_umap_violin_broken_axis_clean.png",
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/pages/project/results/figure6-candidate-gene-expression-in-the-gse176078-tnbc-single-cell-dataset.avif",
    alt: "Figure 6. Candidate-gene expression in the GSE176078 TNBC single-cell dataset.",
    caption:
      "Candidate-gene expression in the GSE176078 TNBC single-cell dataset.",
    section:
      "Target Discovery: From Four Antigens to Fifteen Testable Epitopes",
    width: 960,
    height: 1280,
  },
  fig07: {
    fileName: "figure7-published-trop2-immunohistochemistry-in-tnbc.avif",
    localSourcePath: "文案集/project/results/3.3 Results.md",
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/pages/project/results/figure7-published-trop2-immunohistochemistry-in-tnbc.avif",
    alt: "Figure 7. Published TROP2 immunohistochemistry in TNBC.",
    caption: "Published TROP2 immunohistochemistry in TNBC.",
    section:
      "Target Discovery: From Four Antigens to Fifteen Testable Epitopes",
    width: 828,
    height: 203,
  },
  fig08: {
    fileName:
      "figure8-published-b7-h4-immunohistochemistry-in-tnbc-and-normal-breast-tissue.avif",
    localSourcePath: "文案集/project/results/3.3 Results.md",
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/pages/project/results/figure8-published-b7-h4-immunohistochemistry-in-tnbc-and-normal-breast-tissue.avif",
    alt: "Figure 8. Published B7-H4 immunohistochemistry in TNBC and normal breast tissue.",
    caption:
      "Published B7-H4 immunohistochemistry in TNBC and normal breast tissue.",
    section:
      "Target Discovery: From Four Antigens to Fifteen Testable Epitopes",
    width: 828,
    height: 366,
  },
  fig09: {
    fileName: "figure9-published-nectin-4-immunohistochemistry-in-tnbc.avif",
    localSourcePath: "文案集/project/results/3.3 Results.md",
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/pages/project/results/figure9-published-nectin-4-immunohistochemistry-in-tnbc.avif",
    alt: "Figure 9. Published Nectin-4 immunohistochemistry in TNBC.",
    caption: "Published Nectin-4 immunohistochemistry in TNBC.",
    section:
      "Target Discovery: From Four Antigens to Fifteen Testable Epitopes",
    width: 828,
    height: 207,
  },
  fig10: {
    fileName: "figure10-open-access-slc39a6-immunohistochemistry.avif",
    localSourcePath: "文案集/project/results/3.3 Results.md",
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/pages/project/results/figure10-open-access-slc39a6-immunohistochemistry.avif",
    alt: "Figure 10. Open-access SLC39A6 immunohistochemistry.",
    caption: "Open-access SLC39A6 immunohistochemistry.",
    section:
      "Target Discovery: From Four Antigens to Fifteen Testable Epitopes",
    width: 828,
    height: 411,
  },
  fig13: {
    fileName: "round-1-elispot-wells-and-counts.avif",
    localSourcePath: "文案集/project/results/3.3 Results.md",
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/pages/wet-lab/round-1-elispot-wells-and-counts.avif",
    alt: "Figure 12. Round 1 ELISpot wells and counts",
    caption: "Round 1 ELISpot wells and counts",
    section: "Round 1: Screening Single-Epitope Immunogenicity",
    width: 1280,
    height: 434,
  },
  fig14: {
    fileName:
      "round-1-killing-of-k562-by-t-cells-primed-with-each-construct.avif",
    localSourcePath: "文案集/project/results/3.3 Results.md",
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/pages/wet-lab/round-1-killing-of-k562-by-t-cells-primed-with-each-construct.avif",
    alt: "Figure 13. Round 1 killing of K562 by T cells primed with each construct.",
    caption: "Round 1 killing of K562 by T cells primed with each construct.",
    section: "Round 1: Screening Single-Epitope Immunogenicity",
    width: 1280,
    height: 1155,
  },
  fig15: {
    fileName:
      "cd8-cd69-flow-cytometry-of-t-cells-primed-with-trop2-ctl1-and-ctl2.avif",
    localSourcePath: "文案集/project/results/3.3 Results.md",
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/pages/wet-lab/cd8-cd69-flow-cytometry-of-t-cells-primed-with-trop2-ctl1-and-ctl2.avif",
    alt: "Figure 14. CD8/CD69 flow cytometry of T cells primed with TROP2-CTL1 and CTL2",
    caption:
      "CD8/CD69 flow cytometry of T cells primed with TROP2-CTL1 and CTL2",
    section: "Round 1: Screening Single-Epitope Immunogenicity",
    width: 1280,
    height: 519,
  },
  fig16: {
    fileName:
      "map-of-the-combined-vaccine-plasmid-pcircure-circmev-5267bp.avif",
    localSourcePath: "文案集/project/results/3.3 Results.md",
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/pages/wet-lab/map-of-the-combined-vaccine-plasmid-pcircure-circmev-5267bp.avif",
    alt: "Figure 15. Map of the Combined vaccine plasmid pCirCure-circMEV (5267 bp)",
    caption: "Map of the Combined vaccine plasmid pCirCure-circMEV (5267 bp)",
    section: "Round 1: Screening Single-Epitope Immunogenicity",
    width: 1280,
    height: 929,
  },
  fig17: {
    fileName:
      "agarose-gel-verification-of-the-four-epitope-encoding-linearised-transcription-templates.avif",
    localSourcePath: "文案集/project/results/3.3 Results.md",
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/pages/wet-lab/agarose-gel-verification-of-the-four-epitope-encoding-linearised-transcription-templates.avif",
    alt: "Figure 16. Agarose gel of target-fragment PCR products from the four epitope-encoding constructs",
    caption:
      "Agarose gel of target-fragment PCR products from the four epitope-encoding constructs",
    section: "Round 1: Screening Single-Epitope Immunogenicity",
    width: 1004,
    height: 741,
  },
  fig18: {
    fileName:
      "sanger-trace-across-the-backsplice-junction-bsj-of-the-combined-vaccine.avif",
    localSourcePath: "文案集/project/results/3.3 Results.md",
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/pages/wet-lab/sanger-trace-across-the-backsplice-junction-bsj-of-the-combined-vaccine.avif",
    alt: "Figure 17. Sanger trace across the back-splice junction (BSJ) of the Combined vaccine",
    caption:
      "Sanger trace across the back-splice junction (BSJ) of the Combined vaccine",
    section: "Round 1: Screening Single-Epitope Immunogenicity",
    width: 1280,
    height: 586,
  },
  fig19: {
    fileName: "cd80-cd86-double-positive-dc-frequencies-for-each-group.avif",
    localSourcePath: "文案集/project/results/3.3 Results.md",
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/pages/wet-lab/cd80-cd86-double-positive-dc-frequencies-for-each-group.avif",
    alt: "Figure 18. CD80⁺CD86⁺ double-positive DC frequencies for each group",
    caption: "CD80⁺CD86⁺ double-positive DC frequencies for each group",
    section: "Round 2: Functional Validation of the Combined Vaccine",
    width: 1280,
    height: 341,
  },
  fig20: {
    fileName: "quantification-of-dc-maturation-across-groups.avif",
    localSourcePath: "文案集/project/results/3.3 Results.md",
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/pages/wet-lab/quantification-of-dc-maturation-across-groups.avif",
    alt: "Figure 19. Quantification of DC maturation across groups",
    caption: "Quantification of DC maturation across groups",
    section: "Round 2: Functional Validation of the Combined Vaccine",
    width: 777,
    height: 669,
  },
  fig21: {
    fileName: "western-blot-of-flag-tagged-fusion-protein-in-dcs.avif",
    localSourcePath: "文案集/project/results/3.3 Results.md",
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/pages/wet-lab/western-blot-of-flag-tagged-fusion-protein-in-dcs.avif",
    alt: "Figure 20. Western blot of FLAG-tagged fusion protein in DCs",
    caption: "Western blot of FLAG-tagged fusion protein in DCs",
    section: "Round 2: Functional Validation of the Combined Vaccine",
    width: 1280,
    height: 622,
  },
  fig22: {
    fileName: "cd8-cd69-t-cell-frequencies-after-dc-t-co-culture.avif",
    localSourcePath: "文案集/project/results/3.3 Results.md",
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/pages/wet-lab/cd8-cd69-t-cell-frequencies-after-dc-t-co-culture.avif",
    alt: "Figure 21. CD8⁺CD69⁺ T-cell frequencies after DC–T co-culture",
    caption: "CD8⁺CD69⁺ T-cell frequencies after DC–T co-culture",
    section: "Round 2: Functional Validation of the Combined Vaccine",
    width: 1280,
    height: 336,
  },
  fig23: {
    fileName: "quantification-of-cd8-cd69-frequencies-across-groups.avif",
    localSourcePath: "文案集/project/results/3.3 Results.md",
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/pages/wet-lab/quantification-of-cd8-cd69-frequencies-across-groups.avif",
    alt: "Figure 22. Quantification of CD8⁺CD69⁺ frequencies across groups",
    caption: "Quantification of CD8⁺CD69⁺ frequencies across groups",
    section: "Round 2: Functional Validation of the Combined Vaccine",
    width: 775,
    height: 670,
  },
  fig24: {
    fileName: "cd8-cd28-t-cell-frequencies-after-dc-t-co-culture.avif",
    localSourcePath: "文案集/project/results/3.3 Results.md",
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/pages/wet-lab/cd8-cd28-t-cell-frequencies-after-dc-t-co-culture.avif",
    alt: "Figure 23. CD8⁺CD28⁺ T-cell frequencies after DC–T co-culture",
    caption: "CD8⁺CD28⁺ T-cell frequencies after DC–T co-culture",
    section: "Round 2: Functional Validation of the Combined Vaccine",
    width: 1280,
    height: 334,
  },
  fig25: {
    fileName: "quantification-of-cd8-cd28-frequencies-across-groups.avif",
    localSourcePath: "文案集/project/results/3.3 Results.md",
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/pages/wet-lab/quantification-of-cd8-cd28-frequencies-across-groups.avif",
    alt: "Figure 24. Quantification of CD8⁺CD28⁺ frequencies across groups",
    caption: "Quantification of CD8⁺CD28⁺ frequencies across groups",
    section: "Round 2: Functional Validation of the Combined Vaccine",
    width: 778,
    height: 679,
  },
  fig26: {
    fileName: "cd45ro-ccr7-effector-memory-frequencies-within-cd8-t-cells.avif",
    localSourcePath: "文案集/project/results/3.3 Results.md",
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/pages/wet-lab/cd45ro-ccr7-effector-memory-frequencies-within-cd8-t-cells.avif",
    alt: "Figure 25. CD45RO⁺CCR7⁻ effector-memory frequencies within CD8⁺ T cells",
    caption: "CD45RO⁺CCR7⁻ effector-memory frequencies within CD8⁺ T cells",
    section: "Round 2: Functional Validation of the Combined Vaccine",
    width: 1280,
    height: 274,
  },
  fig27: {
    fileName: "quantification-of-cd45ro-ccr7-frequencies-across-groups.avif",
    localSourcePath: "文案集/project/results/3.3 Results.md",
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/pages/wet-lab/quantification-of-cd45ro-ccr7-frequencies-across-groups.avif",
    alt: "Figure 26. Quantification of CD45RO⁺CCR7⁻ frequencies across groups",
    caption: "Quantification of CD45RO⁺CCR7⁻ frequencies across groups",
    section: "Round 2: Functional Validation of the Combined Vaccine",
    width: 1042,
    height: 901,
  },
  fig28: {
    fileName: "round-2-elispot-wells-and-counts.avif",
    localSourcePath: "文案集/project/results/3.3 Results.md",
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/pages/wet-lab/round-2-elispot-wells-and-counts.avif",
    alt: "Figure 27. Round 2 ELISpot wells and counts",
    caption: "Round 2 ELISpot wells and counts",
    section: "Round 2: Functional Validation of the Combined Vaccine",
    width: 1280,
    height: 351,
  },
  fig29: {
    fileName:
      "killing-of-mda-mb-231-by-t-cells-primed-with-each-construct-across-e-t-ratios.avif",
    localSourcePath: "文案集/project/results/3.3 Results.md",
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/pages/wet-lab/killing-of-mda-mb-231-by-t-cells-primed-with-each-construct-across-e-t-ratios.avif",
    alt: "Figure 28. Killing of MDA-MB-231 by T cells primed with each construct, across E:T ratios",
    caption:
      "Killing of MDA-MB-231 by T cells primed with each construct, across E:T ratios",
    section: "Round 2: Functional Validation of the Combined Vaccine",
    width: 1280,
    height: 754,
  },
  fig31: {
    fileName: "results-31-effector-suppression-dynamics.avif",
    localSourcePath:
      "文案集/project/results/图片和附件/31_effector_suppression_dynamics.png",
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/pages/project/results/results/results-31-effector-suppression-dynamics.avif",
    alt: "Figure 30. Key intermediate states at 10.2 μg dose. (A) Effector activity (blue) and suppression (red) over 35 days. (B) Cell-response interface showing equivalent effector-to-target ratio approaching saturation. (C) Per-capita tumor killing rate (effective rate after suppression, solid; before suppression, dashed). Five injection events create pulsed immune responses.",
    caption:
      "Key intermediate states at 10.2 μg dose. (A) Effector activity (blue) and suppression (red) over 35 days. (B) Cell-response interface showing equivalent effector-to-target ratio approaching saturation. (C) Per-capita tumor killing rate (effective rate after suppression, solid; before suppression, dashed). Five injection events create pulsed immune responses.",
    section: "Dose Optimization and Mechanistic Modeling",
    width: 3274,
    height: 1089,
  },
  fig32: {
    fileName: "results-29-immune-gain-components.avif",
    localSourcePath:
      "文案集/project/results/图片和附件/29_immune_gain_components.png",
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/pages/project/results/results/results-29-immune-gain-components.avif",
    alt: "Figure 31. Cell-inferred immune gains and composite effector score. Relative gains from DC maturation (CD80/CD86), T-cell activation (CD8/CD69), IFN-γ secretion, and Granzyme B. The geometric effector composite (orange) integrates the three T-cell readouts with equal weighting, providing the calibration anchor for immune-activation parameters. CD44/CD62L ratio is shown descriptively but not used in the composite.",
    caption:
      "Cell-inferred immune gains and composite effector score. Relative gains from DC maturation (CD80/CD86), T-cell activation (CD8/CD69), IFN-γ secretion, and Granzyme B. The geometric effector composite (orange) integrates the three T-cell readouts with equal weighting, providing the calibration anchor for immune-activation parameters. CD44/CD62L ratio is shown descriptively but not used in the composite.",
    section: "Dose Optimization and Mechanistic Modeling",
    width: 2469,
    height: 1388,
  },
  fig33: {
    fileName: "results-animal-comparison.avif",
    localSourcePath: "文案集/project/results/图片和附件/animal_comparison.png",
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/pages/project/results/results/results-animal-comparison.avif",
    alt: "Figure 32. Model prediction versus literature-scale tumor growth. Gray: external untreated scenario; Blue: conditional 10.2 μg treatment prediction with 95% uncertainty interval. The model predicts moderate tumor suppression; observed outcomes showed stronger efficacy (ratio 0.104) but fell within the conditional simulation envelope.",
    caption:
      "Model prediction versus literature-scale tumor growth. Gray: external untreated scenario; Blue: conditional 10.2 μg treatment prediction with 95% uncertainty interval. The model predicts moderate tumor suppression; observed outcomes showed stronger efficacy (ratio 0.104) but fell within the conditional simulation envelope.",
    section: "Dose Optimization and Mechanistic Modeling",
    width: 2565,
    height: 1007,
  },
  fig34: {
    fileName:
      "in-vitro-stability-of-circrna-versus-linear-precursor-rna-at-37-c-gel.avif",
    localSourcePath: "文案集/project/results/3.3 Results.md",
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/pages/wet-lab/in-vitro-stability-of-circrna-versus-linear-precursor-rna-at-37-c-gel.avif",
    alt: "Figure 33. In vitro stability of circRNA versus linear precursor RNA at 37 °C — gel",
    caption:
      "In vitro stability of circRNA versus linear precursor RNA at 37 °C — gel",
    section: "Safety: Defining the Boundaries",
    width: 1280,
    height: 440,
  },
  fig35: {
    fileName: "relative-remaining-rna-over-time.avif",
    localSourcePath: "文案集/project/results/3.3 Results.md",
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/pages/wet-lab/relative-remaining-rna-over-time.avif",
    alt: "Figure 34. Relative remaining RNA over time",
    caption: "Relative remaining RNA over time",
    section: "Safety: Defining the Boundaries",
    width: 1280,
    height: 663,
  },
  fig36: {
    fileName:
      "killing-of-four-normal-cell-lines-and-mda-mb-231-by-vaccine-primed-tcells.avif",
    localSourcePath: "文案集/project/results/3.3 Results.md",
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/pages/wet-lab/killing-of-four-normal-cell-lines-and-mda-mb-231-by-vaccine-primed-tcells.avif",
    alt: "Figure 35. Killing of four normal cell lines and MDA-MB-231 by vaccine-primed T cells",
    caption:
      "Killing of four normal cell lines and MDA-MB-231 by vaccine-primed T cells",
    section: "Safety: Defining the Boundaries",
    width: 694,
    height: 450,
  },
  fig37: {
    fileName: "dose-viability-curve-of-empty-lnp-on-dcs-after-24-h.avif",
    localSourcePath: "文案集/project/results/3.3 Results.md",
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/pages/wet-lab/dose-viability-curve-of-empty-lnp-on-dcs-after-24-h.avif",
    alt: "Figure 36. Dose–viability curve of empty LNP on DCs after 24 h",
    caption: "Dose–viability curve of empty LNP on DCs after 24 h",
    section: "Safety: Defining the Boundaries",
    width: 986,
    height: 675,
  },
  fig38: {
    fileName:
      "map-of-the-trop2-overexpression-lentiviral-transfer-plasmid-plv3-cmv-tacstd2-3-flag-copgfp-puro-9259-bp.avif",
    localSourcePath: "文案集/project/results/3.3 Results.md",
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/pages/wet-lab/map-of-the-trop2-overexpression-lentiviral-transfer-plasmid-plv3-cmv-tacstd2-3-flag-copgfp-puro-9259-bp.avif",
    alt: "Figure 37. Map of the TROP2 overexpression lentiviral transfer plasmid (pLV3-CMV-TACSTD2-3×FLAG-CopGFP-Puro, 9259 bp)",
    caption:
      "Map of the TROP2 overexpression lentiviral transfer plasmid (pLV3-CMV-TACSTD2-3×FLAG-CopGFP-Puro, 9259 bp)",
    section: "In Vivo: Efficacy and Immune Mechanism",
    width: 1280,
    height: 1041,
  },
  fig39: {
    fileName:
      "gfp-fluorescence-in-4t1-cells-48-72-h-after-lentiviral-transduction.avif",
    localSourcePath: "文案集/project/results/3.3 Results.md",
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/pages/wet-lab/gfp-fluorescence-in-4t1-cells-48-72-h-after-lentiviral-transduction.avif",
    alt: "Figure 38. GFP fluorescence in 4T1 cells 48–72 h after lentiviral transduction",
    caption:
      "GFP fluorescence in 4T1 cells 48–72 h after lentiviral transduction",
    section: "In Vivo: Efficacy and Immune Mechanism",
    width: 1280,
    height: 747,
  },
  fig40: {
    fileName: "three-step-gating-strategy-for-sorting-gfp-4t1-cells.avif",
    localSourcePath: "文案集/project/results/3.3 Results.md",
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/pages/wet-lab/three-step-gating-strategy-for-sorting-gfp-4t1-cells.avif",
    alt: "Figure 39. Three-step gating strategy for sorting GFP⁺ 4T1 cells",
    caption: "Three-step gating strategy for sorting GFP⁺ 4T1 cells",
    section: "In Vivo: Efficacy and Immune Mechanism",
    width: 4000,
    height: 1285,
  },
  fig41: {
    fileName: "trop2-transcript-assessment-in-4t1-cells.avif",
    localSourcePath: "文案集/project/results/3.3 Results.md",
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/pages/wet-lab/trop2-transcript-assessment-in-4t1-cells.avif",
    alt: "Figure 40. RT-PCR quantification of TROP2 mRNA in 4T1 cells",
    caption: "RT-PCR quantification of TROP2 mRNA in 4T1 cells",
    section: "In Vivo: Efficacy and Immune Mechanism",
    width: 872,
    height: 1134,
  },
  fig42: {
    fileName: "flow-cytometric-detection-of-surface-trop2-on-4t1-cells.avif",
    localSourcePath: "文案集/project/results/3.3 Results.md",
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/pages/wet-lab/flow-cytometric-detection-of-surface-trop2-on-4t1-cells.avif",
    alt: "Figure 41. Flow cytometric detection of surface TROP2 on 4T1 cells",
    caption: "Flow cytometric detection of surface TROP2 on 4T1 cells",
    section: "In Vivo: Efficacy and Immune Mechanism",
    width: 1280,
    height: 602,
  },
  fig43: {
    fileName: "excised-tumours-at-endpoint-d35.avif",
    localSourcePath: "文案集/project/results/3.3 Results.md",
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/pages/wet-lab/excised-tumours-at-endpoint-d35.avif",
    alt: "Figure 42. Excised tumours at endpoint (D35)",
    caption: "Excised tumours at endpoint (D35)",
    section: "In Vivo: Efficacy and Immune Mechanism",
    width: 460,
    height: 336,
  },
  fig44: {
    fileName: "immunisation-scheme-for-the-three-groups.avif",
    localSourcePath: "文案集/project/results/3.3 Results.md",
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/pages/wet-lab/immunisation-scheme-for-the-three-groups.avif",
    alt: "Figure 43. Immunisation scheme for the three groups",
    caption: "Immunisation scheme for the three groups",
    section: "In Vivo: Efficacy and Immune Mechanism",
    width: 1280,
    height: 591,
  },
  fig45: {
    fileName: "tumour-growth-curves-for-the-three-groups.avif",
    localSourcePath: "文案集/project/results/3.3 Results.md",
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/pages/wet-lab/tumour-growth-curves-for-the-three-groups.avif",
    alt: "Figure 44. Tumour growth curves for the three groups",
    caption: "Tumour growth curves for the three groups",
    section: "In Vivo: Efficacy and Immune Mechanism",
    width: 1065,
    height: 510,
  },
  fig46: {
    fileName: "cd8-granzyme-b-dual-immunofluorescence-of-tumour-tissue-actual.avif",
    localSourcePath: "文案集/project/results/3.3 Results.md",
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/pages/wet-lab/cd8-granzyme-b-dual-immunofluorescence-of-tumour-tissue-actual.avif",
    alt: "Figure 45. CD8 / Granzyme B dual immunofluorescence of tumour tissue",
    caption: "CD8 / Granzyme B dual immunofluorescence of tumour tissue",
    section: "In Vivo: Efficacy and Immune Mechanism",
    width: 1602,
    height: 1028,
  },
  fig47: {
    fileName: "splenic-dc-cd80-cd86-maturation.avif",
    localSourcePath: "文案集/project/results/3.3 Results.md",
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/pages/wet-lab/splenic-dc-cd80-cd86-maturation.avif",
    alt: "Figure 46. Splenic DC CD80⁺CD86⁺ maturation",
    caption: "Splenic DC CD80⁺CD86⁺ maturation",
    section: "In Vivo: Efficacy and Immune Mechanism",
    width: 1280,
    height: 395,
  },
  fig48: {
    fileName: "splenic-cd8-t-cell-cd69-early-activation.avif",
    localSourcePath: "文案集/project/results/3.3 Results.md",
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/pages/wet-lab/splenic-cd8-t-cell-cd69-early-activation.avif",
    alt: "Figure 47. Splenic CD8⁺ T-cell CD69⁺ early activation",
    caption: "Splenic CD8⁺ T-cell CD69⁺ early activation",
    section: "In Vivo: Efficacy and Immune Mechanism",
    width: 1280,
    height: 402,
  },
  fig49: {
    fileName:
      "cd44-cd62l-central-memory-frequencies-within-splenic-cd8-t-cells.avif",
    localSourcePath: "文案集/project/results/3.3 Results.md",
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/pages/wet-lab/cd44-cd62l-central-memory-frequencies-within-splenic-cd8-t-cells.avif",
    alt: "Figure 48. CD44⁺CD62L⁺ central-memory frequencies within splenic CD8⁺ T cells",
    caption:
      "CD44⁺CD62L⁺ central-memory frequencies within splenic CD8⁺ T cells",
    section: "In Vivo: Efficacy and Immune Mechanism",
    width: 1280,
    height: 376,
  },
  fig50: {
    fileName: "ifn-frequencies-within-splenic-cd8-t-cells.avif",
    localSourcePath: "文案集/project/results/3.3 Results.md",
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/pages/wet-lab/ifn-frequencies-within-splenic-cd8-t-cells.avif",
    alt: "Figure 49. IFN-γ⁺ frequencies within splenic CD8⁺ T cells",
    caption: "IFN-γ⁺ frequencies within splenic CD8⁺ T cells",
    section: "In Vivo: Efficacy and Immune Mechanism",
    width: 1280,
    height: 393,
  },
  fig51: {
    fileName: "granzyme-b-frequencies-within-splenic-cd8-t-cells.avif",
    localSourcePath: "文案集/project/results/3.3 Results.md",
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/pages/wet-lab/granzyme-b-frequencies-within-splenic-cd8-t-cells.avif",
    alt: "Figure 50. Granzyme B⁺ frequencies within splenic CD8⁺ T cells",
    caption: "Granzyme B⁺ frequencies within splenic CD8⁺ T cells",
    section: "In Vivo: Efficacy and Immune Mechanism",
    width: 1280,
    height: 431,
  },
} as const satisfies Record<string, ResultsAssetEntry>;
export type ResultsAssetKey = keyof typeof resultsAssets;
export const getResultsImage = (key: ResultsAssetKey): string => {
  const entry: ResultsAssetEntry = resultsAssets[key];
  return entry.uploadUrl || entry.localSrc || "";
};
const compactFigures = new Set<ResultsAssetKey>([
  "fig14",
  "fig20",
  "fig21",
  "fig23",
  "fig25",
  "fig27",
  "fig29",
  "fig35",
  "fig36",
  "fig37",
  "fig41",
  "fig45",
]);
export function resultsFigure(
  key: ResultsAssetKey,
): Extract<WikiContentBlock, { type: "figure" }> {
  const entry = resultsAssets[key];
  return {
    type: "figure",
    src: getResultsImage(key),
    alt: entry.alt,
    caption: entry.caption,
    width: entry.width,
    height: entry.height,
    className: [
      compactFigures.has(key) ? "results-figure--compact" : "",
      `results-figure--${key}`,
    ]
      .filter(Boolean)
      .join(" ") || undefined,
  };
}
