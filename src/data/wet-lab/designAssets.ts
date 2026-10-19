const fig1Local = "https://static.igem.wiki/teams/6056/wiki/files/pages/project/design/design-fig1-circular-workflow-b43ee238217d.webp";
const fig2aLocal = "https://static.igem.wiki/teams/6056/wiki/files/pages/project/design/design-fig2a-stability-faca8e585172.webp";
const fig2bLocal = "https://static.igem.wiki/teams/6056/wiki/files/pages/project/design/design-fig2b-translation-initiation-7d08e5879945.webp";
const fig2cLocal = "https://static.igem.wiki/teams/6056/wiki/files/pages/project/design/design-fig2c-innate-sensing-92bd3023e4d4.webp";
const fig3Local = "https://static.igem.wiki/teams/6056/wiki/files/pages/project/design/design-fig3-four-antigens-498138625bea.webp";
const fig4Local = "https://static.igem.wiki/teams/6056/wiki/files/pages/project/design/design-fig4-screening-funnel-5818c7ba45a8.webp";
const fig5Local = "https://static.igem.wiki/teams/6056/wiki/files/pages/project/design/design-fig5-mechanism-of-action-00e4cad47990.webp";
const fig7Local = "https://static.igem.wiki/teams/6056/wiki/files/pages/project/design/design-fig7-two-design-cycles-2345ab5f1c11.webp";
const fig8Local = "https://static.igem.wiki/teams/6056/wiki/files/pages/project/design/design-fig8-in-vivo-study-design-b23d8f4ca06f.webp";

/**
 * Design page asset registry.
 *
 * Double-track contract (see WIKI_ARCHITECTURE_SPEC.md §4.2): every entry
 * carries the local source path it was prepared from, the bundled preview
 * import, and the iGEM static URL it will be served from once uploaded.
 * `uploadUrl` stays an empty string until the asset owner confirms the upload —
 * the resolver then falls back to the bundled file, so nothing here has to
 * change when the CDN copies go live.
 *
 * Preparation (PNG -> flattened WebP, and the EDA report copy) is recorded in
 * scripts/prepare-design-assets.py.
 *
 * The manuscript's Wet Lab CDN URLs are used in production, with the bundled
 * WebP files retained as local preview fallbacks.
 */

const CDN_BASE = "https://static.igem.wiki/teams/6056/wiki/files/pages/wet-lab";

export type DesignAssetKind = "image" | "pdf";

export interface DesignAssetEntry {
  kind: DesignAssetKind;
  fileName: string;
  localSourcePath: string;
  localSrc?: string;
  uploadUrl: string;
  /** Intrinsic size, so the figure keeps its space before the file arrives. */
  width?: number;
  height?: number;
  alt: string;
  caption?: string;
  section?: string;
}

/**
 * Figures 6 and 9 are not raster assets: Figure 6 is the interactive construct
 * viewer (`DesignConstructViewer`), and Figure 9 is the NC3Rs EDA report, held
 * as a PDF so the browser's native viewer can page through it.
 */
export const designAssets = {
  fig1: {
    kind: "image",
    fileName: "design-fig1-circular-workflow.webp",
    localSourcePath:
      "src/assets/wiki/design/design-fig1-circular-workflow.webp",
    localSrc: fig1Local,
    uploadUrl: `${CDN_BASE}/circure-at-a-glance.avif`,
    width: 1280,
    height: 836,
    alt: "Circular workflow diagram of the CirCure platform, from plasmid template through in vitro transcription, self-splicing circularisation, lipid-nanoparticle delivery and dendritic-cell priming to CD8⁺ T-cell killing of triple-negative breast cancer cells",
    caption: "CirCure at a glance",
    section: "Overview",
  },
  fig2a: {
    kind: "image",
    fileName: "design-fig2a-stability.webp",
    localSourcePath: "src/assets/wiki/design/design-fig2a-stability.webp",
    localSrc: fig2aLocal,
    uploadUrl: `${CDN_BASE}/stability.avif`,
    width: 1280,
    height: 298,
    alt: "Side-by-side comparison of linear mRNA and circRNA stability: exonucleases attack the free 5′ and 3′ ends of the linear transcript, whereas the covalently closed circle offers no free end and therefore no exonuclease substrate",
    caption: "Stability",
    section: "Why circRNA",
  },
  fig2b: {
    kind: "image",
    fileName: "design-fig2b-translation-initiation.webp",
    localSourcePath:
      "src/assets/wiki/design/design-fig2b-translation-initiation.webp",
    localSrc: fig2bLocal,
    uploadUrl: `${CDN_BASE}/translation-initiation.avif`,
    width: 1280,
    height: 298,
    alt: "Side-by-side comparison of translation initiation: cap-dependent recruitment of the ribosome on linear mRNA versus internal ribosome entry site driven, cap-independent initiation on circRNA",
    caption: "Translation initiation",
    section: "Why circRNA",
  },
  fig2c: {
    kind: "image",
    fileName: "design-fig2c-innate-sensing.webp",
    localSourcePath: "src/assets/wiki/design/design-fig2c-innate-sensing.webp",
    localSrc: fig2cLocal,
    uploadUrl: `${CDN_BASE}/innate-sensing.avif`,
    width: 1280,
    height: 298,
    alt: "Side-by-side comparison of innate immune sensing: unmodified circRNA in the cytoplasm is detected by RIG-I and MDA5 and matures the dendritic cell, supplying the danger signal carried by the vaccine itself",
    caption: "Innate sensing",
    section: "Why circRNA",
  },
  fig3: {
    kind: "image",
    fileName: "design-fig3-four-antigens.webp",
    localSourcePath: "src/assets/wiki/design/design-fig3-four-antigens.webp",
    localSrc: fig3Local,
    uploadUrl: `${CDN_BASE}/the-four-antigens-of-circure.avif`,
    width: 2042,
    height: 1428,
    alt: "Four antigen tiles summarising TROP2 as a calcium signal transducer driving proliferation and migration, Nectin-4 as an adhesion molecule supporting adhesion-dependent growth and metastasis, B7-H4 as a checkpoint ligand suppressing CD8⁺ T cells, and LIV-1 as a zinc transporter associated with epithelial–mesenchymal transition",
    caption: "The four antigens of CirCure",
    section: "Target selection",
  },
  fig4: {
    kind: "image",
    fileName: "design-fig4-screening-funnel.webp",
    localSourcePath: "src/assets/wiki/design/design-fig4-screening-funnel.webp",
    localSrc: fig4Local,
    uploadUrl: `${CDN_BASE}/the-screening-funnel.avif`,
    width: 1280,
    height: 702,
    alt: "Screening funnel narrowing candidate 9-mers from four antigens through NetMHCpan binding prediction, VaxiJen antigenicity, NetChop proteasomal cleavage and a structural and redundancy filter to thirteen buildable single-epitope constructs, then through IFN-γ ELISpot to the eight selected epitopes",
    caption: "The screening funnel",
    section: "From antigen to epitope",
  },
  fig5: {
    kind: "image",
    fileName: "design-fig5-mechanism-of-action.webp",
    localSourcePath:
      "src/assets/wiki/design/design-fig5-mechanism-of-action.webp",
    localSrc: fig5Local,
    uploadUrl: `${CDN_BASE}/mechanism-of-action.avif`,
    width: 1280,
    height: 858,
    alt: "Mechanism of action: subcutaneous circRNA-lipid nanoparticle drainage to the draining lymph node, dendritic-cell uptake and endosomal escape, cap-independent translation of the polyprotein, MITD-directed MHC class I presentation, CD8⁺ T-cell priming with CD69 activation and CD45RO⁺CCR7⁻ effector-memory commitment, and perforin and granzyme killing of triple-negative breast cancer cells",
    caption: "Mechanism of action",
    section: "Mechanism",
  },
  fig7: {
    kind: "image",
    fileName: "design-fig7-two-design-cycles.webp",
    localSourcePath:
      "src/assets/wiki/design/design-fig7-two-design-cycles.webp",
    localSrc: fig7Local,
    uploadUrl: `${CDN_BASE}/two-design-cycles.avif`,
    width: 1280,
    height: 680,
    alt: "Two sequential Design–Build–Test–Learn cycles: the first comparing thirteen single-epitope constructs by IFN-γ ELISpot to select the eight epitopes, the second comparing empty vector, single-epitope and combined constructs against dendritic-cell maturation, translation, T-cell activation and MDA-MB-231 killing",
    caption: "Two design cycles",
    section: "Experimental design",
  },
  fig8: {
    kind: "image",
    fileName: "design-fig8-in-vivo-study-design.webp",
    localSourcePath:
      "src/assets/wiki/design/design-fig8-in-vivo-study-design.webp",
    localSrc: fig8Local,
    uploadUrl: `${CDN_BASE}/immunisation-scheme-for-the-three-groups.avif`,
    width: 1280,
    height: 591,
    alt: "Horizontal timeline of the mouse tumour study: TROP2-overexpressing 4T1 inoculation on day 0 in immunocompetent BALB/c mice, five weekly subcutaneous doses of PBS vehicle, empty-vector circRNA-lipid nanoparticle or combined circRNA-lipid nanoparticle at the tail base, calliper tumour-volume follow-up to a day 35 endpoint, and tumour and spleen harvest for mechanism readouts",
    caption: "In vivo study design.",
    section: "Experimental design",
  },
  edaReport: {
    kind: "pdf",
    fileName: "design-eda-report-nc3rs.pdf",
    localSourcePath: "public/assets/docs/design-eda-report-nc3rs.pdf",
    uploadUrl: "https://static.igem.wiki/teams/6056/wiki/files/docs/design-eda-report-nc3rs-8f07f37bee76.pdf",
    alt: "NC3Rs Experimental Design Assistant report for the CirCure in vivo tumour study, conforming to the ARRIVE 2.0 Essential 10",
    caption: "Experimental Design Report, NC3Rs EDA.",
    section: "Experimental design",
  },
} as const satisfies Record<string, DesignAssetEntry>;

export type DesignAssetKey = keyof typeof designAssets;

export type DesignImageKey = {
  [K in DesignAssetKey]: (typeof designAssets)[K]["kind"] extends "image"
    ? K
    : never;
}[DesignAssetKey];

/** Registered image URL: iGEM CDN once uploaded, bundled preview until then. */
export const getDesignImage = (key: DesignImageKey): string => {
  const entry: DesignAssetEntry = designAssets[key];
  return entry?.uploadUrl || entry?.localSrc || "";
};

/**
 * Document URL served from the site's own `public/` tree, so the embedded
 * report works identically in development and in the published bundle.
 */
export const getDesignDocument = (key: DesignAssetKey): string => {
  const entry: DesignAssetEntry = designAssets[key];
  return (
    entry?.uploadUrl ||
    `${import.meta.env.BASE_URL}${(entry?.localSourcePath || "").replace(/^public\//, "")}`
  );
};
