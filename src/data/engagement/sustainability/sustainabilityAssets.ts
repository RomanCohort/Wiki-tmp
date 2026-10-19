/**
 * Sustainability page asset registry.
 *
 * Semantic key → file name / local source / iGEM URL / alt for every image and
 * PDF the page renders. Local sources live in
 * `文案集/engagement/sustainability/图片和附件/`; upload targets follow the team's
 * `static.igem.wiki/teams/6056/wiki/files/...` naming (uploads are handled by
 * the asset owner — see IGEM_ASSET_REGISTRY.md).
 *
 * SST-QN Figures 5–7 are rendered as interactive charts (ECharts), and the
 * Overview SDG / SET-DEVELOP-GROW graphics as components, so they have no
 * image entry here. Engagement photographs live in `sustainabilityPhotos.ts`.
 */

import { sdg12EvidenceAssets } from "./sustainabilitySdg12Assets";
import { sdg4ImageAssets } from "./sustainabilitySdg4Assets";

export type SustainabilityAssetKind = "image" | "pdf";

export interface SustainabilityAssetEntry {
  kind: SustainabilityAssetKind;
  fileName: string;
  localSourcePath: string;
  localSrc?: string;
  uploadUrl: string;
  alt: string;
  section: string;
  pdfPages?: number;
  /** Intrinsic pixel size of the rendered source; reserves layout space. */
  width?: number;
  height?: number;
}

const IMG = "https://static.igem.wiki/teams/6056/wiki/files/pages/engagement/sustainability";
const DOCS = "https://static.igem.wiki/teams/6056/wiki/files/docs";

export const sustainabilityAssets = {
  overviewMasthead: {
    kind: "image",
    fileName: "sustainability-overview-masthead.avif",
    localSourcePath: "src/assets/wiki/sustainability/sustainability-overview-masthead.avif",
    uploadUrl: "https://static.igem.wiki/teams/6056/wiki/files/pages/engagement/sustainability-overview-masthead-96e3e6da2d09.avif",
    alt: "Children holding up the 17 UN Sustainable Development Goal icons",
    section: "Overview",
  },
  overviewMapOfStakeholders: {
    kind: "image",
    fileName: "sustainability-overview-map-of-stakeholders.png",
    localSourcePath: "src/assets/wiki/sustainability/sustainability-overview-map-of-stakeholders.png",
    uploadUrl: "https://static.igem.wiki/teams/6056/wiki/files/pages/engagement/sustainability/overview/01-map-of-stakeholders-2.avif",
    alt: "Map of stakeholders",
    section: "Overview",
    width: 4000,
    height: 1913,
  },
  overviewScaleModel: {
    kind: "image",
    fileName: "sustainability-overview-scale-model.png",
    localSourcePath: "src/assets/wiki/sustainability/sustainability-overview-scale-model.png",
    uploadUrl: `${IMG}/sustainability-overview-scale-model.avif`,
    alt: "SCALE Model",
    section: "Overview",
    width: 1800,
    height: 1007,
  },
  overviewSstQnNetwork: {
    kind: "image",
    fileName: "sustainability-overview-sst-qn-network.png",
    localSourcePath: "src/assets/wiki/sustainability/sustainability-overview-sst-qn-network.png",
    uploadUrl: `${IMG}/sustainability-overview-sst-qn-network.avif`,
    alt: "SDG Synergy–Trade-off Quantification Network (SST-QN)",
    section: "Overview",
    width: 1800,
    height: 1020,
  },
  overviewReusableToolkit: {
    kind: "image",
    fileName: "sustainability-overview-reusable-toolkit.png",
    localSourcePath: "src/assets/wiki/sustainability/sustainability-overview-reusable-toolkit.png",
    uploadUrl: `${IMG}/sustainability-overview-reusable-toolkit.avif`,
    alt: "Reusable Sustainability Toolkit",
    section: "Overview",
    width: 1800,
    height: 1020,
  },
  sstQnStatusClassification: {
    kind: "image",
    fileName: "sustainability-sst-qn-status-classification.png",
    localSourcePath: "src/assets/wiki/sustainability/sustainability-sst-qn-status-classification.png",
    uploadUrl: `${IMG}/sustainability-sst-qn-status-classification.avif`,
    alt: "SST-QN Interaction Status Classification",
    section: "SST-QN",
    width: 1800,
    height: 550,
  },
  frameworkSetDevelopGrow: {
    kind: "image",
    fileName: "sustainability-framework-set-develop-grow.png",
    localSourcePath: "src/assets/wiki/sustainability/sustainability-framework-set-develop-grow.png",
    uploadUrl: `${IMG}/sustainability-framework-set-develop-grow.avif`,
    alt: "SET-DEVELOP-GROW Impact Framework (SDG Impact Framework)",
    section: "SDG Impact Framework",
    width: 7181,
    height: 7197,
  },
  sdg3StakeholdersDistribution: {
    kind: "image",
    fileName: "sustainability-sdg3-stakeholders-distribution.png",
    localSourcePath: "src/assets/wiki/sustainability/sustainability-sdg3-stakeholders-distribution.png",
    uploadUrl: `${IMG}/sustainability-sdg3-stakeholders-distribution.avif`,
    alt: "49 stakeholders across five groups",
    section: "SDG 3 — Evidence",
    width: 1800,
    height: 855,
  },
  sdg3TraceableImprovements: {
    kind: "image",
    fileName: "sustainability-sdg3-traceable-improvements.png",
    localSourcePath: "src/assets/wiki/sustainability/sustainability-sdg3-traceable-improvements.png",
    uploadUrl: `${IMG}/sustainability-sdg3-traceable-improvements.avif`,
    alt: "Eight traceable project improvements",
    section: "SDG 3 — Evidence",
    width: 1800,
    height: 1041,
  },
  sdg3DcMaturationFlow: {
    kind: "image",
    fileName: "sustainability-sdg3-dc-maturation-flow.png",
    localSourcePath: "src/assets/wiki/sustainability/sustainability-sdg3-dc-maturation-flow.png",
    uploadUrl: `${IMG}/sustainability-sdg3-dc-maturation-flow.avif`,
    alt: "In vitro flow cytometry of dendritic-cell maturation and CD8⁺ T-cell subsets",
    section: "SDG 3 — Evidence",
    width: 1800,
    height: 1304,
  },
  sdg3SplenocyteFlow: {
    kind: "image",
    fileName: "sustainability-sdg3-splenocyte-flow.png",
    localSourcePath: "src/assets/wiki/sustainability/sustainability-sdg3-splenocyte-flow.png",
    uploadUrl: `${IMG}/sustainability-sdg3-splenocyte-flow.avif`,
    alt: "In vivo splenocyte flow cytometry of IFN-γ⁺CD8⁺ and GzmB⁺CD8⁺ subsets",
    section: "SDG 3 — Evidence",
    width: 1800,
    height: 1173,
  },
  sdg3TumorGrowth: {
    kind: "image",
    fileName: "sustainability-sdg3-tumor-growth.png",
    localSourcePath: "src/assets/wiki/sustainability/sustainability-sdg3-tumor-growth.png",
    uploadUrl: `${IMG}/sustainability-sdg3-tumor-growth.avif`,
    alt: "Excised tumors and endpoint tumor volume across PBS, control and circRNA vaccine groups",
    section: "SDG 3 — Evidence",
    width: 1800,
    height: 684,
  },
  sdg9TraceableExpertFeedback: {
    kind: "image",
    fileName: "sustainability-sdg9-traceable-expert-feedback.png",
    localSourcePath: "src/assets/wiki/sustainability/sustainability-sdg9-traceable-expert-feedback.png",
    uploadUrl: `${IMG}/sustainability-sdg9-traceable-expert-feedback.avif`,
    alt: "Seven traceable SDG 9 expert feedback records",
    section: "SDG 9 — Evidence",
    width: 2080,
    height: 1023,
  },
  sdg9Evidence2: {
    kind: "image",
    fileName: "evidence-2.avif",
    localSourcePath: "",
    uploadUrl: `${IMG}/sdg9/evidence-2.avif`,
    alt: "Vaccine constructs and comparative immune responses",
    section: "SDG 9 — Evidence",
    width: 4000,
    height: 1775,
  },
  sdg9BatchProjection: {
    kind: "image",
    fileName: "evidence-2.avif",
    localSourcePath: "",
    uploadUrl: `${IMG}/sdg9/evidence-2.avif`,
    alt: "Vaccine constructs and comparative immune responses",
    section: "SDG 9 — Evidence",
  },
  sdg9Evidence3: {
    kind: "image",
    fileName: "evidence-3.avif",
    localSourcePath: "",
    uploadUrl: `${IMG}/sdg9/evidence-3.avif`,
    alt: "Circularization and antigen translation evidence",
    section: "SDG 9 — Evidence",
    width: 1575,
    height: 744,
  },
  sdg9Evidence: {
    kind: "image",
    fileName: "evidence-3.avif",
    localSourcePath: "",
    uploadUrl: `${IMG}/sdg9/evidence-3.avif`,
    alt: "Circularization and antigen translation evidence",
    section: "SDG 9 — Evidence",
  },
  sdg9Evidence4: {
    kind: "image",
    fileName: "evidence-4.avif",
    localSourcePath: "",
    uploadUrl: `${IMG}/sdg9/evidence-4.avif`,
    alt: "CTL selectivity assessment",
    section: "SDG 9 — Evidence",
    width: 2784,
    height: 1686,
  },
  sdg9Evidence5: {
    kind: "image",
    fileName: "evidence-5.avif",
    localSourcePath: "",
    uploadUrl: `${IMG}/sdg9/evidence-5.avif`,
    alt: "Three-module vaccine design system",
    section: "SDG 9 — Evidence",
    width: 4000,
    height: 2252,
  },
  ...sdg12EvidenceAssets,
  ...sdg4ImageAssets,
  sstQnModelConstruction: {
    kind: "pdf",
    fileName: "sustainability-sst-qn-model-construction.pdf",
    localSourcePath: "public/assets/docs/sustainability-sst-qn-model-construction.pdf",
    uploadUrl: `${DOCS}/sustainability-sst-qn-model-construction.pdf`,
    alt: "SDG 模型构建",
    section: "SST-QN",
    pdfPages: 53,
  },
} as const satisfies Record<string, SustainabilityAssetEntry>;

export type SustainabilityAssetKey = keyof typeof sustainabilityAssets;

export type SustainabilityImageAssetKey = {
  [K in SustainabilityAssetKey]: (typeof sustainabilityAssets)[K]["kind"] extends "image"
    ? K
    : never;
}[SustainabilityAssetKey];

/** iGEM URL of a registered image with local fallback. */
export const sustainabilityImage = (key: SustainabilityImageAssetKey): string => {
  const entry = sustainabilityAssets[key] as SustainabilityAssetEntry;
  return entry.localSrc || entry.uploadUrl;
};

/** Full registry entry of a registered image (alt + intrinsic size). */
export const sustainabilityImageEntry = (
  key: SustainabilityImageAssetKey,
): SustainabilityAssetEntry => sustainabilityAssets[key] as SustainabilityAssetEntry;

/** iGEM docs URL of a hosted PDF/HTML file name, with local dev fallback. */
export const sustainabilityDocUrl = (fileName: string) =>
  import.meta.env.DEV ? `/assets/docs/${fileName}` : `${DOCS}/${fileName}`;
