/**
 * Measurement page asset registry.
 *
 * The source manuscript keeps the original AVIF files under 文案集/wetlab/Measurment.
 * The page uses the official iGEM URLs so the reader does not depend on a build-time
 * copy of the source folder. The two structural AVIFs requested by the author are
 * intentionally absent; their location mounts the Results structural chart instead.
 */
export interface MeasurementAssetEntry {
  fileName: string;
  localSourcePath: string;
  localSrc: string;
  uploadUrl: string;
  /** Intrinsic size, so the figure keeps its space before the file arrives. */
  width?: number;
  height?: number;
  alt: string;
  caption?: string;
  section?: string;
}

export const measurementAssets = {
  "dependency-relations-between-the-measurements-in-the-project": {
    fileName:
      "dependency-relations-between-the-measurements-in-the-project.avif",
    localSourcePath:
      "文案集/wetlab/Measurment/measurete图片与附件/dependency-relations-between-the-measurements-in-the-project.avif",
    localSrc: "",
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/pages/wet-lab/dependency-relations-between-the-measurements-in-the-project.avif",
    width: 1280,
    height: 896,
    alt: "Dependency relations between the measurements in the project",
    caption: "Dependency relations between the measurements in the project",
    section: "Measurement",
  },
  "differential-protein-abundance-of-the-four-candidates-across-two-proteomic-datasets":
    {
      fileName:
        "differential-protein-abundance-of-the-four-candidates-across-two-proteomic-datasets.avif",
      localSourcePath:
        "文案集/wetlab/Measurment/measurete图片与附件/differential-protein-abundance-of-the-four-candidates-across-two-proteomic-datasets.avif",
      localSrc: "",
      uploadUrl:
        "https://static.igem.wiki/teams/6056/wiki/files/pages/wet-lab/differential-protein-abundance-of-the-four-candidates-across-two-proteomic-datasets.avif",
      width: 1280,
      height: 719,
      alt: "Differential protein abundance of the four candidates across two proteomic datasets",
      caption:
        "Differential protein abundance of the four candidates across two proteomic datasets",
      section: "Measurement",
    },
  "malignant-cell-enrichment-and-compartment-detection-rates-in-gse176078": {
    fileName:
      "malignant-cell-enrichment-and-compartment-detection-rates-in-gse176078.avif",
    localSourcePath:
      "文案集/wetlab/Measurment/measurete图片与附件/malignant-cell-enrichment-and-compartment-detection-rates-in-gse176078.avif",
    localSrc: "",
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/pages/wet-lab/malignant-cell-enrichment-and-compartment-detection-rates-in-gse176078.avif",
    width: 1280,
    height: 1090,
    alt: "Malignant-cell enrichment and compartment detection rates in GSE176078",
    caption:
      "Malignant-cell enrichment and compartment detection rates in GSE176078",
    section: "Measurement",
  },
  "the-staged-epitope-screen-from-1-838-nine-mers-to-15-delivered-peptides": {
    fileName:
      "the-staged-epitope-screen-from-1-838-nine-mers-to-15-delivered-peptides.avif",
    localSourcePath:
      "文案集/wetlab/Measurment/measurete图片与附件/the-staged-epitope-screen-from-1-838-nine-mers-to-15-delivered-peptides.avif",
    localSrc: "",
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/pages/wet-lab/the-staged-epitope-screen-from-1-838-nine-mers-to-15-delivered-peptides.avif",
    width: 1135,
    height: 1280,
    alt: "The staged epitope screen, from 1,838 nine-mers to 15 delivered peptides.",
    caption:
      "The staged epitope screen, from 1,838 nine-mers to 15 delivered peptides.",
    section: "Measurement",
  },
  "alphafold-3-confidence-scores-against-position-9-fill-ratio": {
    fileName:
      "alphafold-3-confidence-scores-against-position-9-fill-ratio.avif",
    localSourcePath:
      "文案集/wetlab/Measurment/measurete图片与附件/alphafold-3-confidence-scores-against-position-9-fill-ratio.avif",
    localSrc: "",
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/pages/wet-lab/alphafold-3-confidence-scores-against-position-9-fill-ratio.avif",
    width: 863,
    height: 563,
    alt: "AlphaFold 3 confidence scores against position-9 fill ratio",
    caption: "AlphaFold 3 confidence scores against position-9 fill ratio",
    section: "Measurement",
  },
  "agarose-gel-verification-of-the-four-epitope-encoding-linearised-transcription-templates":
    {
      fileName:
        "agarose-gel-verification-of-the-four-epitope-encoding-linearised-transcription-templates.avif",
      localSourcePath:
        "文案集/wetlab/Measurment/measurete图片与附件/agarose-gel-verification-of-the-four-epitope-encoding-linearised-transcription-templates.avif",
      localSrc: "",
      uploadUrl:
        "https://static.igem.wiki/teams/6056/wiki/files/pages/wet-lab/agarose-gel-verification-of-the-four-epitope-encoding-linearised-transcription-templates.avif",
      width: 1004,
      height: 741,
      alt: "Round 2 agarose gel of PCR products amplified from the plasmid target regions",
      caption:
        "Round 2 agarose gel of PCR products amplified from the plasmid target regions",
      section: "Measurement",
    },
  "workflow-of-the-circularity-release-assay": {
    fileName: "workflow-of-the-circularity-release-assay.avif",
    localSourcePath:
      "文案集/wetlab/Measurment/measurete图片与附件/workflow-of-the-circularity-release-assay.avif",
    localSrc: "",
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/pages/wet-lab/workflow-of-the-circularity-release-assay.avif",
    width: 1280,
    height: 896,
    alt: "Workflow for estimating the circular fraction after RNase R treatment",
    caption:
      "Workflow for estimating the circular fraction after RNase R treatment",
    section: "Measurement",
  },
  "sanger-trace-across-the-back-splice-junction-bsj-of-the-combined-vaccine": {
    fileName:
      "sanger-trace-across-the-backsplice-junction-bsj-of-the-combined-vaccine.avif",
    localSourcePath:
      "文案集/wetlab/Measurment/measurete图片与附件/sanger-trace-across-the-backsplice-junction-bsj-of-the-combined-vaccine.avif",
    localSrc: "",
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/pages/wet-lab/sanger-trace-across-the-backsplice-junction-bsj-of-the-combined-vaccine.avif",
    alt: "Sanger trace of the BSJ-spanning RT-PCR product from the Combined vaccine",
    caption:
      "Sanger trace of the BSJ-spanning RT-PCR product from the Combined vaccine",
    section: "Measurement",
    width: 1280,
    height: 586,
  },
  "in-vitro-stability-of-circrna-versus-linear-precursor-rna-at-37-c-gel": {
    fileName:
      "in-vitro-stability-of-circrna-versus-linear-precursor-rna-at-37-c-gel.avif",
    localSourcePath:
      "文案集/wetlab/Measurment/measurete图片与附件/in-vitro-stability-of-circrna-versus-linear-precursor-rna-at-37-c-gel.avif",
    localSrc: "",
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/pages/wet-lab/in-vitro-stability-of-circrna-versus-linear-precursor-rna-at-37-c-gel.avif",
    width: 1280,
    height: 440,
    alt: "Stability of circRNA and its linear precursor at 37 °C",
    caption: "Stability of circRNA and its linear precursor at 37 °C",
    section: "Measurement",
  },
  "rt-pcr-quantification-of-trop2-mrna-in-4t1-cells": {
    fileName: "wet-image2.avif",
    localSourcePath:
      "文案集/wetlab/Measurment/measurete图片与附件/wet-image2.avif",
    localSrc: "",
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/pages/wet-lab/wet-image2.avif",
    width: 1518,
    height: 916,
    alt: "Relative TROP2 expression in wild-type and transduced 4T1 cells. Values are mean ± SD across three RNA-extraction replicates from one cell sample per group (biological n = 1 per group). The result is reported descriptively.",
    caption:
      "Relative TROP2 expression in wild-type and transduced 4T1 cells. Values are mean ± SD across three RNA-extraction replicates from one cell sample per group (biological n = 1 per group). The result is reported descriptively.",
    section: "Measurement",
  },
  "flow-cytometric-detection-of-surface-trop2-on-4t1-cells": {
    fileName: "wet-image6.avif",
    localSourcePath:
      "文案集/wetlab/Measurment/measurete图片与附件/wet-image6.avif",
    localSrc: "",
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/pages/wet-lab/wet-image6.avif",
    width: 1682,
    height: 952,
    alt: "Surface TROP2 on wild-type and TROP2-overexpressing 4T1",
    caption: "Surface TROP2 on wild-type and TROP2-overexpressing 4T1",
    section: "Measurement",
  },
  "preparation-workflow-for-dendritic-cells-and-autologous-t-cells": {
    fileName:
      "preparation-workflow-for-dendritic-cells-and-autologous-t-cells.avif",
    localSourcePath:
      "文案集/wetlab/Measurment/measurete图片与附件/preparation-workflow-for-dendritic-cells-and-autologous-t-cells.avif",
    localSrc: "",
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/pages/wet-lab/preparation-workflow-for-dendritic-cells-and-autologous-t-cells.avif",
    width: 1280,
    height: 749,
    alt: "Preparation workflow for dendritic cells and autologous T cells",
    caption: "Preparation workflow for dendritic cells and autologous T cells",
    section: "Measurement",
  },
  "dose-viability-curve-of-empty-lnp-on-dcs-after-24-h": {
    fileName: "wet-image.avif",
    localSourcePath:
      "文案集/wetlab/Measurment/measurete图片与附件/wet-image.avif",
    localSrc: "",
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/pages/wet-lab/wet-image.avif",
    width: 1342,
    height: 852,
    alt: "Dose–viability relationship for empty LNP on dendritic cells",
    caption: "Dose–viability relationship for empty LNP on dendritic cells",
    section: "Measurement",
  },
  "western-blot-of-flag-tagged-fusion-protein-in-dcs": {
    fileName: "western-blot-of-flag-tagged-fusion-protein-in-dcs.avif",
    localSourcePath:
      "文案集/wetlab/Measurment/measurete图片与附件/western-blot-of-flag-tagged-fusion-protein-in-dcs.avif",
    localSrc: "",
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/pages/wet-lab/western-blot-of-flag-tagged-fusion-protein-in-dcs.avif",
    width: 1280,
    height: 622,
    alt: "Anti-FLAG Western blot of electroporated dendritic cells",
    caption: "Anti-FLAG Western blot of electroporated dendritic cells",
    section: "Measurement",
  },
  "round-1-elispot-wells-and-counts": {
    fileName: "wet-image3.avif",
    localSourcePath:
      "文案集/wetlab/Measurment/measurete图片与附件/wet-image3.avif",
    localSrc: "",
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/pages/wet-lab/wet-image3.avif",
    width: 1098,
    height: 1090,
    alt: "Round 1 ELISpot wells",
    caption: "Round 1 ELISpot wells",
    section: "Measurement",
  },
  "round-2-elispot-wells-and-counts": {
    fileName: "round-2-elispot-wells-and-counts.avif",
    localSourcePath:
      "文案集/wetlab/Measurment/measurete图片与附件/round-2-elispot-wells-and-counts.avif",
    localSrc: "",
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/pages/wet-lab/round-2-elispot-wells-and-counts.avif",
    width: 1280,
    height: 351,
    alt: "Round 2 ELISpot wells",
    caption: "Round 2 ELISpot wells",
    section: "Measurement",
  },
  "round-1-killing-of-k562-by-t-cells-primed-with-each-construct": {
    fileName:
      "round-1-killing-of-k562-by-t-cells-primed-with-each-construct.avif",
    localSourcePath:
      "文案集/wetlab/Measurment/measurete图片与附件/round-1-killing-of-k562-by-t-cells-primed-with-each-construct.avif",
    localSrc: "",
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/pages/wet-lab/round-1-killing-of-k562-by-t-cells-primed-with-each-construct.avif",
    width: 1280,
    height: 1155,
    alt: "Round 1 killing of K562 by T cells primed with each construct",
    caption: "Round 1 killing of K562 by T cells primed with each construct",
    section: "Measurement",
  },
  "killing-of-mda-mb-231-by-t-cells-primed-with-each-construct-across-e-t-ratios":
    {
      fileName: "wet-image4.avif",
      localSourcePath:
        "文案集/wetlab/Measurment/measurete图片与附件/wet-image4.avif",
      localSrc: "",
      uploadUrl:
        "https://static.igem.wiki/teams/6056/wiki/files/pages/wet-lab/wet-image4.avif",
      width: 1480,
      height: 832,
      alt: "Killing of MDA-MB-231 across three effector-to-target ratios",
      caption: "Killing of MDA-MB-231 across three effector-to-target ratios",
      section: "Measurement",
    },
  "killing-of-four-normal-cell-lines-and-mda-mb-231-by-vaccine-primed-t-cells":
    {
      fileName: "wet-image5.avif",
      localSourcePath:
        "文案集/wetlab/Measurment/measurete图片与附件/wet-image5.avif",
      localSrc: "",
      uploadUrl:
        "https://static.igem.wiki/teams/6056/wiki/files/pages/wet-lab/wet-image5.avif",
      alt: "Killing of four normal cell lines and MDA-MB-231",
      caption: "Killing of four normal cell lines and MDA-MB-231",
      section: "Measurement",
      width: 694,
      height: 450,
    },
  "three-step-gating-strategy-for-sorting-gfp-4t1-cells": {
    fileName: "three-step-gating-strategy-for-sorting-gfp-4t1-cells.avif",
    localSourcePath:
      "文案集/wetlab/Measurment/measurete图片与附件/three-step-gating-strategy-for-sorting-gfp-4t1-cells.avif",
    localSrc: "",
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/pages/wet-lab/three-step-gating-strategy-for-sorting-gfp-4t1-cells.avif",
    width: 4000,
    height: 1285,
    alt: "Gating strategy for sorting GFP-positive 4T1",
    caption: "Gating strategy for sorting GFP-positive 4T1",
    section: "Measurement",
  },
  "splenic-dc-cd80-cd86-maturation": {
    fileName: "splenic-dc-cd80-cd86-maturation.avif",
    localSourcePath:
      "文案集/wetlab/Measurment/measurete图片与附件/splenic-dc-cd80-cd86-maturation.avif",
    localSrc: "",
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/pages/wet-lab/splenic-dc-cd80-cd86-maturation.avif",
    width: 1280,
    height: 395,
    alt: "Splenic immunophenotype across the immune response chain",
    caption: "Splenic immunophenotype across the immune response chain",
    section: "Measurement",
  },
  "splenic-cd8-t-cell-cd69-early-activation": {
    fileName: "splenic-cd8-t-cell-cd69-early-activation.avif",
    localSourcePath:
      "文案集/wetlab/Measurment/measurete图片与附件/splenic-cd8-t-cell-cd69-early-activation.avif",
    localSrc: "",
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/pages/wet-lab/splenic-cd8-t-cell-cd69-early-activation.avif",
    width: 1280,
    height: 402,
    alt: "Splenic immunophenotype across the immune response chain",
    caption: "Splenic immunophenotype across the immune response chain",
    section: "Measurement",
  },
  "cd44-cd62l-central-memory-frequencies-within-splenic-cd8-t-cells": {
    fileName:
      "cd44-cd62l-central-memory-frequencies-within-splenic-cd8-t-cells.avif",
    localSourcePath:
      "文案集/wetlab/Measurment/measurete图片与附件/cd44-cd62l-central-memory-frequencies-within-splenic-cd8-t-cells.avif",
    localSrc: "",
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/pages/wet-lab/cd44-cd62l-central-memory-frequencies-within-splenic-cd8-t-cells.avif",
    width: 1280,
    height: 376,
    alt: "Splenic immunophenotype across the immune response chain",
    caption: "Splenic immunophenotype across the immune response chain",
    section: "Measurement",
  },
  "ifn-frequencies-within-splenic-cd8-t-cells": {
    fileName: "ifn-frequencies-within-splenic-cd8-t-cells.avif",
    localSourcePath:
      "文案集/wetlab/Measurment/measurete图片与附件/ifn-frequencies-within-splenic-cd8-t-cells.avif",
    localSrc: "",
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/pages/wet-lab/ifn-frequencies-within-splenic-cd8-t-cells.avif",
    width: 1280,
    height: 393,
    alt: "Splenic immunophenotype across the immune response chain",
    caption: "Splenic immunophenotype across the immune response chain",
    section: "Measurement",
  },
  "granzyme-b-frequencies-within-splenic-cd8-t-cells": {
    fileName: "granzyme-b-frequencies-within-splenic-cd8-t-cells.avif",
    localSourcePath:
      "文案集/wetlab/Measurment/measurete图片与附件/granzyme-b-frequencies-within-splenic-cd8-t-cells.avif",
    localSrc: "",
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/pages/wet-lab/granzyme-b-frequencies-within-splenic-cd8-t-cells.avif",
    width: 1280,
    height: 431,
    alt: "Splenic immunophenotype across the immune response chain",
    caption: "Splenic immunophenotype across the immune response chain",
    section: "Measurement",
  },
  "gfp-fluorescence-in-4t1-cells-48-72-h-after-lentiviral-transduction": {
    fileName:
      "gfp-fluorescence-in-4t1-cells-48-72-h-after-lentiviral-transduction.avif",
    localSourcePath:
      "文案集/wetlab/Measurment/measurete图片与附件/gfp-fluorescence-in-4t1-cells-48-72-h-after-lentiviral-transduction.avif",
    localSrc: "",
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/pages/wet-lab/gfp-fluorescence-in-4t1-cells-48-72-h-after-lentiviral-transduction.avif",
    width: 1280,
    height: 747,
    alt: "GFP fluorescence in transduced 4T1",
    caption: "GFP fluorescence in transduced 4T1",
    section: "Measurement",
  },
  "cd8-granzyme-b-dual-immunofluorescence-of-tumour-tissue": {
    fileName: "cd8-granzyme-b-dual-immunofluorescence-of-tumour-tissue-actual.avif",
    localSourcePath:
      "文案集/wetlab/Measurment/measurete图片与附件/cd8-granzyme-b-dual-immunofluorescence-of-tumour-tissue-actual.avif",
    localSrc: "",
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/pages/wet-lab/cd8-granzyme-b-dual-immunofluorescence-of-tumour-tissue-actual.avif",
    width: 1602,
    height: 1028,
    alt: "CD8 and Granzyme B dual immunofluorescence of tumour tissue",
    caption: "CD8 and Granzyme B dual immunofluorescence of tumour tissue",
    section: "Measurement",
  },
  "immunisation-and-measurement-schedule": {
    fileName: "immunisation-and-measurement-schedule.avif",
    localSourcePath:
      "文案集/wetlab/Measurment/measurete图片与附件/immunisation-and-measurement-schedule.avif",
    localSrc: "",
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/pages/wet-lab/immunisation-and-measurement-schedule.avif",
    width: 1280,
    height: 723,
    alt: "Immunisation and measurement schedule",
    caption: "Immunisation and measurement schedule",
    section: "Measurement",
  },
  "tumour-growth-curves-for-the-three-groups": {
    fileName: "tumour-growth-curves-for-the-three-groups.avif",
    localSourcePath:
      "文案集/wetlab/Measurment/measurete图片与附件/tumour-growth-curves-for-the-three-groups.avif",
    localSrc: "",
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/pages/wet-lab/tumour-growth-curves-for-the-three-groups.avif",
    width: 1065,
    height: 510,
    alt: "Tumour growth curves for the three groups",
    caption: "Tumour growth curves for the three groups",
    section: "Measurement",
  },
  "excised-tumours-at-endpoint-d35": {
    fileName: "excised-tumours-at-endpoint-d35.avif",
    localSourcePath:
      "文案集/wetlab/Measurment/measurete图片与附件/excised-tumours-at-endpoint-d35.avif",
    localSrc: "",
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/pages/wet-lab/excised-tumours-at-endpoint-d35.avif",
    width: 460,
    height: 336,
    alt: "Excised tumours at endpoint",
    caption: "Excised tumours at endpoint",
    section: "Measurement",
  },
  "human-dc-maturation-flow-and-quantification": {
    localSrc: "",
    alt: "human dc maturation flow and quantification",
    section: "Measurement",
    fileName: "wet-image7.avif",
    localSourcePath:
      "文案集/wetlab/Measurment/measurete图片与附件/wet-image7.avif",
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/pages/wet-lab/wet-image7.avif",
    width: 1920,
    height: 393,
  },
  "human-cd8-cd69-flow-and-quantification": {
    localSrc: "",
    alt: "human cd8 cd69 flow and quantification",
    section: "Measurement",
    fileName: "wet-image8.avif",
    localSourcePath:
      "文案集/wetlab/Measurment/measurete图片与附件/wet-image8.avif",
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/pages/wet-lab/wet-image8.avif",
    width: 1920,
    height: 402,
  },
  "human-cd8-cd28-flow-and-quantification": {
    localSrc: "",
    alt: "human cd8 cd28 flow and quantification",
    section: "Measurement",
    fileName: "wet-image9.avif",
    localSourcePath:
      "文案集/wetlab/Measurment/measurete图片与附件/wet-image9.avif",
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/pages/wet-lab/wet-image9.avif",
    width: 1920,
    height: 378,
  },
  "human-effector-memory-flow-and-quantification": {
    localSrc: "",
    alt: "human effector memory flow and quantification",
    section: "Measurement",
    fileName: "wet-image10.avif",
    localSourcePath:
      "文案集/wetlab/Measurment/measurete图片与附件/wet-image10.avif",
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/pages/wet-lab/wet-image10.avif",
    width: 1920,
    height: 342,
  },
} as const satisfies Record<string, MeasurementAssetEntry>;

export type MeasurementAssetKey = keyof typeof measurementAssets;

export function getMeasurementImage(key: MeasurementAssetKey): string {
  const asset: MeasurementAssetEntry = measurementAssets[key];
  return asset.uploadUrl || asset.localSrc || "";
}
