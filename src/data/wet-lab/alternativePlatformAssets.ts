const platformComparison = "https://static.igem.wiki/teams/6056/wiki/files/pages/wet-lab/five-platforms-against-the-problem-s-requirement-with-the-failure-point-of-each-marked.avif";
const necessityChain = "https://static.igem.wiki/teams/6056/wiki/files/pages/wet-lab/host-modality-and-production-as-three-stacked-layers-with-the-forcing-constraint-on-each-arrow.avif";
const backboneArchitecture = "https://static.igem.wiki/teams/6056/wiki/files/pages/wet-lab/the-circrna-in-translation-order-with-the-four-encoded-elements-highlighted.avif";
const evidenceDependencyMap = "https://static.igem.wiki/teams/6056/wiki/files/pages/wet-lab/the-evidence-chain-from-dc-maturation-to-tumour-cell-killing-each-link-with-its-read-out-and-its-control.avif";
const releaseWorkflow = "https://static.igem.wiki/teams/6056/wiki/files/pages/wet-lab/the-cell-free-production-route-and-the-release-gate-that-returns-a-failed-preparation-to-transcription.avif";
const roundOneRanking = "https://static.igem.wiki/teams/6056/wiki/files/pages/wet-lab/round-1-killing-of-k562-by-t-cells-primed-with-each-construct.avif";
const roundOneElispot = "https://static.igem.wiki/teams/6056/wiki/files/pages/wet-lab/round-1-ifn-elispot-wells-for-all-13-single-epitope-constructs.avif";
const inVivoResults = "https://static.igem.wiki/teams/6056/wiki/files/pages/wet-lab/tumour-growth-curves-for-the-three-groups.avif";
const evidenceTiers = "https://static.igem.wiki/teams/6056/wiki/files/pages/wet-lab/every-claim-on-this-page-placed-in-one-of-six-evidence-tiers-with-the-read-out-that-supports-it.avif";

export interface AlternativePlatformAssetEntry {
  fileName: string;
  localSourcePath: string;
  localSrc?: string;
  uploadUrl: string;
  /** Intrinsic size of the rendered source (CDN upload when present). */
  width?: number;
  height?: number;
  alt: string;
  caption: string;
  section: string;
}

export const alternativePlatformAssets = {
  platformComparison: {
    fileName: "platform-comparison.webp",
    localSourcePath:
      "文案集/wetlab/Alternative_Platform/图片和附件/Mea Fig 1.png",
    localSrc: platformComparison,
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/pages/wet-lab/five-platforms-against-the-problem-s-requirement-with-the-failure-point-of-each-marked.avif",
    width: 1280,
    height: 694,
    alt: "Five platforms against the problem's requirements, with the failure point of each marked.",
    caption:
      "Five platforms against the problem's requirements, with the failure point of each marked.",
    section: "The gap",
  },
  necessityChain: {
    fileName: "necessity-chain.webp",
    localSourcePath:
      "文案集/wetlab/Alternative_Platform/图片和附件/Create a publication-quality BioRender scientific figure titled “The Necessity C.png",
    localSrc: necessityChain,
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/pages/wet-lab/host-modality-and-production-as-three-stacked-layers-with-the-forcing-constraint-on-each-arrow.avif",
    width: 1280,
    height: 735,
    alt: "Host, modality and production as three stacked layers, with the forcing constraint on each arrow.",
    caption:
      "Host, modality and production as three stacked layers, with the forcing constraint on each arrow.",
    section: "Why this platform",
  },
  backboneArchitecture: {
    fileName: "backbone-architecture.webp",
    localSourcePath:
      "文案集/wetlab/Alternative_Platform/图片和附件/Create a publication-quality BioRender mechanism figure titled “Engineering the.png",
    localSrc: backboneArchitecture,
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/pages/wet-lab/the-circrna-in-translation-order-with-the-four-encoded-elements-highlighted.avif",
    width: 1280,
    height: 896,
    alt: "The circRNA in translation order, with the four encoded elements highlighted.",
    caption:
      "The circRNA in translation order, with the four encoded elements highlighted.",
    section: "Why this platform",
  },
  evidenceDependencyMap: {
    fileName: "evidence-dependency-map.webp",
    localSourcePath:
      "文案集/wetlab/Alternative_Platform/图片和附件/Create a publication-ready BioRender-style SCIENTIFIC DEPENDENCY MAP, -CirCure -.png",
    localSrc: evidenceDependencyMap,
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/pages/wet-lab/the-evidence-chain-from-dc-maturation-to-tumour-cell-killing-each-link-with-its-read-out-and-its-control.avif",
    width: 1280,
    height: 640,
    alt: "The evidence chain from DC maturation to tumour-cell killing, each link with its read-out and its control.",
    caption:
      "The evidence chain from DC maturation to tumour-cell killing, each link with its read-out and its control.",
    section: "Evidence",
  },
  releaseWorkflow: {
    fileName: "release-workflow.webp",
    localSourcePath:
      "文案集/wetlab/Alternative_Platform/图片和附件/放行流程图.png",
    localSrc: releaseWorkflow,
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/pages/wet-lab/the-cell-free-production-route-and-the-release-gate-that-returns-a-failed-preparation-to-transcription.avif",
    width: 1280,
    height: 795,
    alt: "The cell-free production route and the release gate that returns a failed preparation to transcription.",
    caption:
      "The cell-free production route and the release gate that returns a failed preparation to transcription.",
    section: "Construction and release",
  },
  backSpliceJunction: {
    fileName: "back-splice-junction.avif",
    localSourcePath:
      "文案集/wetlab/Alternative_Platform/Alternative_Platform.md",
    localSrc: "",
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/pages/wet-lab/sanger-trace-across-the-backsplice-junction-bsj-of-the-combined-vaccine.avif",
    width: 1280,
    height: 586,
    alt: "Sanger trace across the back-splice junction of the Combined vaccine.",
    caption:
      "The back-splice junction of the Combined vaccine, read across the ligation site.",
    section: "Construction and release",
  },
  roundOneRanking: {
    fileName: "round-one-ranking.webp",
    localSourcePath:
      "文案集/wetlab/Alternative_Platform/图片和附件/image 1.png",
    localSrc: roundOneRanking,
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/pages/wet-lab/round-1-killing-of-k562-by-t-cells-primed-with-each-construct.avif",
    width: 1280,
    height: 1155,
    alt: "Round-1 ELISpot rank against K562 killing rank for all 13 constructs.",
    caption:
      "Round-1 ELISpot rank against K562 killing rank for all 13 constructs.",
    section: "Why the platform includes a wet screen",
  },
  roundOneElispot: {
    fileName: "round-one-elispot.webp",
    localSourcePath: "文案集/wetlab/Alternative_Platform/图片和附件/image.png",
    localSrc: roundOneElispot,
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/pages/wet-lab/round-1-ifn-elispot-wells-for-all-13-single-epitope-constructs.avif",
    width: 1278,
    height: 1280,
    alt: "Round-1 IFN-γ ELISpot wells for all 13 single-epitope constructs.",
    caption:
      "Round-1 IFN-γ ELISpot wells for all 13 single-epitope constructs.",
    section: "Why the platform includes a wet screen",
  },
  inVivoResults: {
    fileName: "in-vivo-results.webp",
    localSourcePath:
      "文案集/wetlab/Alternative_Platform/图片和附件/9458b226-2e84-44af-bb78-95b25d378d0c.png",
    localSrc: inVivoResults,
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/pages/wet-lab/tumour-growth-curves-for-the-three-groups.avif",
    width: 1065,
    height: 510,
    alt: "Tumour growth curves to day 35 and excised tumours at endpoint.",
    caption: "Tumour growth curves to day 35 and excised tumours at endpoint.",
    section: "In vivo",
  },
  evidenceTiers: {
    fileName: "evidence-tiers.webp",
    localSourcePath: "文案集/wetlab/Alternative_Platform/图片和附件/证据链.png",
    localSrc: evidenceTiers,
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/pages/wet-lab/every-claim-on-this-page-placed-in-one-of-six-evidence-tiers-with-the-read-out-that-supports-it.avif",
    width: 1280,
    height: 827,
    alt: "Every claim on this page placed in one of six evidence tiers, with the read-out that supports it.",
    caption:
      "Every claim on this page placed in one of six evidence tiers, with the read-out that supports it.",
    section: "Evidence strength",
  },
} as const satisfies Record<string, AlternativePlatformAssetEntry>;

export type AlternativePlatformAssetKey =
  keyof typeof alternativePlatformAssets;

export function getAlternativePlatformImage(
  key: AlternativePlatformAssetKey,
): string {
  const asset: AlternativePlatformAssetEntry = alternativePlatformAssets[key];
  return asset.uploadUrl || asset.localSrc || "";
}

export const alternativePlatformEmbeds = {
  backbone: {
    fileName: "inside-the-backbone.html",
    localSourcePath:
      "C:/Users/香芋派/xwechat_files/wxid_5ebnlqbau8vc22_50a2/msg/file/2026-10/inside-the-backbone.html",
  },
  reuseStudio: {
    fileName: "reuse-studio-v2.html",
    localSourcePath:
      "C:/Users/香芋派/xwechat_files/wxid_5ebnlqbau8vc22_50a2/msg/file/2026-10/reuse-studio-v2.html",
  },
} as const;

export function getAlternativePlatformEmbed(
  key: keyof typeof alternativePlatformEmbeds,
): string {
  return `${import.meta.env.BASE_URL}assets/interactive/alternative-platform/${alternativePlatformEmbeds[key].fileName}`;
}
