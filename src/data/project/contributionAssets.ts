/**
 * Contribution page — asset registry.
 *
 * One entry per image / document the page renders, in the shape the team's
 * asset workflow expects (`sustainabilityAssets.ts` is the reference model):
 *
 *   semantic key → file name · local source · iGEM upload URL · alt text
 *
 * ## Current state: local sources only, upload URLs blank
 *
 * Every file below was produced from the source drop in
 * `文案集/project/contribution/图片和附件/` (the eight activity `.zip` archives
 * were expanded first). Images were capped at 1800px on the long edge and
 * re-encoded as WebP at q82 — the largest is now ~440 kB, inside the team's
 * 1.5 MB image budget. The four PDFs are copied byte-for-byte into
 * `public/assets/docs/`.
 *
 * `uploadUrl` is intentionally an empty string for all of them: nothing has
 * been pushed to `static.igem.wiki` yet. Once the asset owner uploads the files
 * and returns the CDN URLs, fill in exactly one string per entry here and
 * re-run the asset registry:
 *
 *   node scripts/igem-asset-manager.mjs scan-all
 *   node scripts/igem-asset-manager.mjs export-markdown
 *
 * Because `contributionImage()` prefers `localSrc`, every image renders today
 * from the bundled local copy and will keep rendering if a URL is ever missing
 * — a blank `uploadUrl` is a visible TODO, never a broken page.
 *
 * Naming follows the team convention
 * `contribution-<topic>-<what>[-<n>].webp`, and the upload target mirrors it
 * under `pages/project/`.
 */

const ddlCrisisPosterImg = "https://static.igem.wiki/teams/6056/wiki/files/pages/project/contribution/contribution-responsible-ddl-crisis-poster-1947ba1bf803.webp";

const circoreDeviceImg = "https://static.igem.wiki/teams/6056/wiki/files/pages/project/contribution/contribution-hardware-circore-device-cce193f20a95.webp";

const sdgFrameworkImg = "https://static.igem.wiki/teams/6056/wiki/files/pages/project/contribution/contribution-sdg-set-develop-grow-framework-2a21c9b3895c.webp";

const tamSamSomImg = "https://static.igem.wiki/teams/6056/wiki/files/pages/project/contribution/contribution-entrepreneurship-tam-sam-som-15c258abe6a7.webp";

const bioMemoryCoverImg = "https://static.igem.wiki/teams/6056/wiki/files/pages/project/contribution/contribution-education-bio-memory-cover-c9e5096f1b79.webp";
const bioStrategyArena1Img = "https://static.igem.wiki/teams/6056/wiki/files/pages/project/contribution/contribution-education-bio-strategy-arena-1-4dde6b3fbb18.webp";
const bioStrategyArena2Img = "https://static.igem.wiki/teams/6056/wiki/files/pages/project/contribution/contribution-education-bio-strategy-arena-2-9d2bc7dabbf6.webp";

const virtualLab1Img = "https://static.igem.wiki/teams/6056/wiki/files/pages/project/contribution/contribution-education-virtual-lab-1-55d67d3ba88e.webp";
const virtualLab2Img = "https://static.igem.wiki/teams/6056/wiki/files/pages/project/contribution/contribution-education-virtual-lab-2-1243700ee70f.webp";

const synbioClassroom1Img = "https://static.igem.wiki/teams/6056/wiki/files/pages/project/contribution/contribution-education-synbio-classroom-1-7b4bbddf90c2.webp";
const synbioClassroom2Img = "https://static.igem.wiki/teams/6056/wiki/files/pages/project/contribution/contribution-education-synbio-classroom-2-bf181a767d6a.webp";
const synbioClassroom3Img = "https://static.igem.wiki/teams/6056/wiki/files/pages/project/contribution/contribution-education-synbio-classroom-3-ac5832f75713.webp";
const synbioClassroom4Img = "https://static.igem.wiki/teams/6056/wiki/files/pages/project/contribution/contribution-education-synbio-classroom-4-998942cb4f72.webp";

const musicFestival1Img = "https://static.igem.wiki/teams/6056/wiki/files/pages/project/contribution/contribution-education-music-festival-1-7357164fb39b.webp";
const musicFestival2Img = "https://static.igem.wiki/teams/6056/wiki/files/pages/project/contribution/contribution-education-music-festival-2-db52106de9fc.webp";
const musicFestival3Img = "https://static.igem.wiki/teams/6056/wiki/files/pages/project/contribution/contribution-education-music-festival-3-8f48062e2ab1.webp";
const musicFestival4Img = "https://static.igem.wiki/teams/6056/wiki/files/pages/project/contribution/contribution-education-music-festival-4-52536f97544f.webp";

const ethicsDebate1Img = "https://static.igem.wiki/teams/6056/wiki/files/pages/project/contribution/contribution-education-ethics-debate-1-c2c7e8c4d197.webp";
const ethicsDebate2Img = "https://static.igem.wiki/teams/6056/wiki/files/pages/project/contribution/contribution-education-ethics-debate-2-b44a7554e324.webp";

const northeastExchange1Img = "https://static.igem.wiki/teams/6056/wiki/files/pages/project/contribution/contribution-collab-northeast-exchange-1-aafdc4bcdd85.webp";
const northeastExchange2Img = "https://static.igem.wiki/teams/6056/wiki/files/pages/project/contribution/contribution-collab-northeast-exchange-2-48262538ed99.webp";
const northeastExchange3Img = "https://static.igem.wiki/teams/6056/wiki/files/pages/project/contribution/contribution-collab-northeast-exchange-3-93554848c087.webp";

const lettersAcrossIgem1Img = "https://static.igem.wiki/teams/6056/wiki/files/pages/project/contribution/contribution-collab-letters-across-igem-1-ff61293f485c.webp";
const lettersAcrossIgem2Img = "https://static.igem.wiki/teams/6056/wiki/files/pages/project/contribution/contribution-collab-letters-across-igem-2-021f4b5ee8f0.webp";
const lettersAcrossIgem3Img = "https://static.igem.wiki/teams/6056/wiki/files/pages/project/contribution/contribution-collab-letters-across-igem-3-e9afeee34d09.webp";

const ccic1Img = "https://static.igem.wiki/teams/6056/wiki/files/pages/project/contribution/contribution-collab-ccic-1-a8ed72a7cd82.webp";
const ccic2Img = "https://static.igem.wiki/teams/6056/wiki/files/pages/project/contribution/contribution-collab-ccic-2-885f894abadd.webp";
const ccic3Img = "https://static.igem.wiki/teams/6056/wiki/files/pages/project/contribution/contribution-collab-ccic-3-4c3533bab071.webp";
const ccic4Img = "https://static.igem.wiki/teams/6056/wiki/files/pages/project/contribution/contribution-collab-ccic-4-3c37d5ecaa14.webp";

const apic1Img = "https://static.igem.wiki/teams/6056/wiki/files/pages/project/contribution/contribution-collab-apic-1-9eb8087d530a.webp";
const apic2Img = "https://static.igem.wiki/teams/6056/wiki/files/pages/project/contribution/contribution-collab-apic-2-e2d2998aef73.webp";

const regionalNorthChinaImg = "https://static.igem.wiki/teams/6056/wiki/files/pages/project/contribution/contribution-collab-regional-north-china-27865d2b4c45.webp";
const regionalEastChinaImg = "https://static.igem.wiki/teams/6056/wiki/files/pages/project/contribution/contribution-collab-regional-east-china-de9c844fc0fd.webp";
const regionalSouthChinaImg = "https://static.igem.wiki/teams/6056/wiki/files/pages/project/contribution/contribution-collab-regional-south-china-4d207c6a3bae.webp";
const regionalCentralChinaImg = "https://static.igem.wiki/teams/6056/wiki/files/pages/project/contribution/contribution-collab-regional-central-china-111bffd776c7.webp";

export type ContributionAssetKind = "image" | "pdf";

export interface ContributionAssetEntry {
  kind: ContributionAssetKind;
  /** File name as the reader sees it (images: also the published name). */
  fileName: string;
  /**
   * Name the file carries on `static.igem.wiki`. Identical to `fileName` for
   * every image; the four documents keep their descriptive Chinese titles as
   * local files but are uploaded under ASCII names so the CDN path stays clean
   * (a URL built from `动物伦理白皮书.pdf` would be a run of percent escapes,
   * and the asset registry's own sanitizer collapses such a stem to nothing).
   */
  uploadFileName?: string;
  /** Where the file lives in the repository. */
  localSourcePath: string;
  /** Bundled local URL (images only — Vite emits a hashed asset URL). */
  localSrc?: string;
  /** iGEM CDN URL; empty until the file is uploaded. */
  uploadUrl: string;
  /** Intrinsic pixel size of the CDN file, for layout reservation. */
  width?: number;
  height?: number;
  /** Figure caption / document label. Also the accessible name. */
  alt: string;
  /** Section the asset belongs to, for the registry export. */
  section: string;
}

/** Published CDN file name — the upload target's own name. */
const publishedName = (entry: ContributionAssetEntry): string =>
  entry.uploadFileName ?? entry.fileName;

const IMG = "https://static.igem.wiki/teams/6056/wiki/files/pages/project";
const DOCS = "https://static.igem.wiki/teams/6056/wiki/files/docs";

const assetDir = "src/assets/wiki/contribution";
const docDir = "public/assets/docs";

/**
 * Reserved upload targets. Kept as named constants rather than inline template
 * strings so filling in the returned CDN URL is a one-line change per asset.
 */
const IMG_TARGET = `${IMG}/`;
const DOC_TARGET = `${DOCS}/`;

export const contributionAssets = {
  /* --- Responsible research in practice ---------------------------------- */
  ddlCrisisPoster: {
    kind: "image",
    fileName: "contribution-responsible-ddl-crisis-poster.webp",
    localSourcePath: `${assetDir}/contribution-responsible-ddl-crisis-poster.webp`,
    localSrc: ddlCrisisPosterImg,
    uploadUrl: "https://static.igem.wiki/teams/6056/wiki/files/pages/project/contribution/contribution-responsible-ddl-crisis-poster-1947ba1bf803.webp",
    width: 1086,
    height: 1448,
    alt: "Poster of DDL Crisis murder mystery game",
    section: "Responsible Research in Practice",
  },
  animalEthicsHandbook: {
    kind: "pdf",
    fileName: "动物伦理白皮书.pdf",
    uploadFileName: "contribution-animal-ethics-handbook.pdf",
    localSourcePath: `${docDir}/动物伦理白皮书.pdf`,
    uploadUrl: "https://static.igem.wiki/teams/6056/wiki/files/docs/contribution/animal-model-research-safety-and-ethics-handbook.pdf",
    alt: "Animal Model Research Safety and Ethics Handbook",
    section: "Responsible Research in Practice",
  },
  laboratorySafetyHandbook: {
    kind: "pdf",
    fileName: "实验室规范安全白皮书.pdf",
    uploadFileName: "contribution-laboratory-safety-handbook.pdf",
    localSourcePath: `${docDir}/实验室规范安全白皮书.pdf`,
    uploadUrl: "https://static.igem.wiki/teams/6056/wiki/files/docs/contribution/laboratory-safety-handbook.pdf",
    alt: "Laboratory Safety Handbook",
    section: "Responsible Research in Practice",
  },

  /* --- Accessible computational tools ------------------------------------ */

  /* --- Modular hardware platform ----------------------------------------- */
  circoreDevice: {
    kind: "image",
    fileName: "contribution-hardware-circore-device.webp",
    localSourcePath: `${assetDir}/contribution-hardware-circore-device.webp`,
    localSrc: circoreDeviceImg,
    uploadUrl: "https://static.igem.wiki/teams/6056/wiki/files/pages/project/contribution/contribution-hardware-circore-device-cce193f20a95.webp",
    width: 597,
    height: 674,
    alt: "Schematic diagram of the CirCore circRNA vaccine expression device",
    section: "Modular Hardware Platform",
  },

  /* --- Sustainable innovation framework ---------------------------------- */
  sdgFramework: {
    kind: "image",
    fileName: "contribution-sdg-set-develop-grow-framework.webp",
    localSourcePath: `${assetDir}/contribution-sdg-set-develop-grow-framework.webp`,
    localSrc: sdgFrameworkImg,
    uploadUrl: "https://static.igem.wiki/teams/6056/wiki/files/pages/project/contribution/contribution-sdg-set-develop-grow-framework-2a21c9b3895c.webp",
    width: 1796,
    height: 1800,
    alt: "SET-DEVELOP-GROW Impact Framework (SDG Impact Framework)",
    section: "Sustainable Innovation Framework",
  },

  /* --- Translation pathway ----------------------------------------------- */
  tamSamSom: {
    kind: "image",
    fileName: "contribution-entrepreneurship-tam-sam-som.webp",
    localSourcePath: `${assetDir}/contribution-entrepreneurship-tam-sam-som.webp`,
    localSrc: tamSamSomImg,
    uploadUrl: "https://static.igem.wiki/teams/6056/wiki/files/pages/project/contribution/contribution-entrepreneurship-tam-sam-som-15c258abe6a7.webp",
    width: 1280,
    height: 960,
    alt: "TAM-SAM-SOM market size estimation",
    section: "Translation Pathway",
  },

  /* --- Education --------------------------------------------------------- */
  virtualLab1: {
    kind: "image",
    fileName: "contribution-education-virtual-lab-1.webp",
    localSourcePath: `${assetDir}/contribution-education-virtual-lab-1.webp`,
    localSrc: virtualLab1Img,
    uploadUrl: "https://static.igem.wiki/teams/6056/wiki/files/pages/project/contribution/contribution-education-virtual-lab-1-55d67d3ba88e.webp",
    alt: "Virtual Laboratory operation example, experiment 2 main working page",
    section: "Education",
  },
  virtualLab2: {
    kind: "image",
    fileName: "contribution-education-virtual-lab-2.webp",
    localSourcePath: `${assetDir}/contribution-education-virtual-lab-2.webp`,
    localSrc: virtualLab2Img,
    uploadUrl: "https://static.igem.wiki/teams/6056/wiki/files/pages/project/contribution/contribution-education-virtual-lab-2-1243700ee70f.webp",
    alt: "Virtual Laboratory operation example, experiment 6 reagent addition",
    section: "Education",
  },
  synbioClassroom1: {
    kind: "image",
    fileName: "contribution-education-synbio-classroom-1.webp",
    localSourcePath: `${assetDir}/contribution-education-synbio-classroom-1.webp`,
    localSrc: synbioClassroom1Img,
    uploadUrl: "https://static.igem.wiki/teams/6056/wiki/files/pages/project/contribution/contribution-education-synbio-classroom-1-7b4bbddf90c2.webp",
    alt: "Activity photo from SynBio Classroom, students loading samples",
    section: "Education",
  },
  synbioClassroom2: {
    kind: "image",
    fileName: "contribution-education-synbio-classroom-2.webp",
    localSourcePath: `${assetDir}/contribution-education-synbio-classroom-2.webp`,
    localSrc: synbioClassroom2Img,
    uploadUrl: "https://static.igem.wiki/teams/6056/wiki/files/pages/project/contribution/contribution-education-synbio-classroom-2-bf181a767d6a.webp",
    alt: "Activity photo from SynBio Classroom, students operating equipment",
    section: "Education",
  },
  synbioClassroom3: {
    kind: "image",
    fileName: "contribution-education-synbio-classroom-3.webp",
    localSourcePath: `${assetDir}/contribution-education-synbio-classroom-3.webp`,
    localSrc: synbioClassroom3Img,
    uploadUrl: "https://static.igem.wiki/teams/6056/wiki/files/pages/project/contribution/contribution-education-synbio-classroom-3-ac5832f75713.webp",
    alt: "Activity photo from SynBio Classroom, group photo in the laboratory",
    section: "Education",
  },
  synbioClassroom4: {
    kind: "image",
    fileName: "contribution-education-synbio-classroom-4.webp",
    localSourcePath: `${assetDir}/contribution-education-synbio-classroom-4.webp`,
    localSrc: synbioClassroom4Img,
    uploadUrl: "https://static.igem.wiki/teams/6056/wiki/files/pages/project/contribution/contribution-education-synbio-classroom-4-998942cb4f72.webp",
    alt: "Activity photo from SynBio Classroom, closing group photo",
    section: "Education",
  },
  bioMemoryCover: {
    kind: "image",
    fileName: "contribution-education-bio-memory-cover.webp",
    localSourcePath: `${assetDir}/contribution-education-bio-memory-cover.webp`,
    localSrc: bioMemoryCoverImg,
    uploadUrl: "https://static.igem.wiki/teams/6056/wiki/files/pages/project/contribution/contribution-education-bio-memory-cover-c9e5096f1b79.webp",
    width: 1024,
    height: 1535,
    alt: "Cover design of the Bio Memory Match game",
    section: "Education",
  },
  bioStrategyArena1: {
    kind: "image",
    fileName: "contribution-education-bio-strategy-arena-1.webp",
    localSourcePath: `${assetDir}/contribution-education-bio-strategy-arena-1.webp`,
    localSrc: bioStrategyArena1Img,
    uploadUrl: "https://static.igem.wiki/teams/6056/wiki/files/pages/project/contribution/contribution-education-bio-strategy-arena-1-4dde6b3fbb18.webp",
    alt: "Design example of the Bio Strategy Arena game, card sheet",
    section: "Education",
  },
  bioStrategyArena2: {
    kind: "image",
    fileName: "contribution-education-bio-strategy-arena-2.webp",
    localSourcePath: `${assetDir}/contribution-education-bio-strategy-arena-2.webp`,
    localSrc: bioStrategyArena2Img,
    uploadUrl: "https://static.igem.wiki/teams/6056/wiki/files/pages/project/contribution/contribution-education-bio-strategy-arena-2-9d2bc7dabbf6.webp",
    alt: "Design example of the Bio Strategy Arena game, quorum-sensing card",
    section: "Education",
  },
  musicFestival1: {
    kind: "image",
    fileName: "contribution-education-music-festival-1.webp",
    localSourcePath: `${assetDir}/contribution-education-music-festival-1.webp`,
    localSrc: musicFestival1Img,
    uploadUrl: "https://static.igem.wiki/teams/6056/wiki/files/pages/project/contribution/contribution-education-music-festival-1-7357164fb39b.webp",
    alt: "Photo from the Music Festival outreach activity, group photo",
    section: "Education",
  },
  musicFestival2: {
    kind: "image",
    fileName: "contribution-education-music-festival-2.webp",
    localSourcePath: `${assetDir}/contribution-education-music-festival-2.webp`,
    localSrc: musicFestival2Img,
    uploadUrl: "https://static.igem.wiki/teams/6056/wiki/files/pages/project/contribution/contribution-education-music-festival-2-db52106de9fc.webp",
    alt: "Photo from the Music Festival outreach activity, event site",
    section: "Education",
  },
  musicFestival3: {
    kind: "image",
    fileName: "contribution-education-music-festival-3.webp",
    localSourcePath: `${assetDir}/contribution-education-music-festival-3.webp`,
    localSrc: musicFestival3Img,
    uploadUrl: "https://static.igem.wiki/teams/6056/wiki/files/pages/project/contribution/contribution-education-music-festival-3-8f48062e2ab1.webp",
    alt: "Photo from the Music Festival outreach activity, activity booth",
    section: "Education",
  },
  musicFestival4: {
    kind: "image",
    fileName: "contribution-education-music-festival-4.webp",
    localSourcePath: `${assetDir}/contribution-education-music-festival-4.webp`,
    localSrc: musicFestival4Img,
    uploadUrl: "https://static.igem.wiki/teams/6056/wiki/files/pages/project/contribution/contribution-education-music-festival-4-52536f97544f.webp",
    alt: "Photo from the Music Festival outreach activity, participants taking part",
    section: "Education",
  },
  ethicsDebate1: {
    kind: "image",
    fileName: "contribution-education-ethics-debate-1.webp",
    localSourcePath: `${assetDir}/contribution-education-ethics-debate-1.webp`,
    localSrc: ethicsDebate1Img,
    uploadUrl: "https://static.igem.wiki/teams/6056/wiki/files/pages/project/contribution/contribution-education-ethics-debate-1-c2c7e8c4d197.webp",
    alt: "Photo from the Ethics Debate, group photo of the participants",
    section: "Education",
  },
  ethicsDebate2: {
    kind: "image",
    fileName: "contribution-education-ethics-debate-2.webp",
    localSourcePath: `${assetDir}/contribution-education-ethics-debate-2.webp`,
    localSrc: ethicsDebate2Img,
    uploadUrl: "https://static.igem.wiki/teams/6056/wiki/files/pages/project/contribution/contribution-education-ethics-debate-2-b44a7554e324.webp",
    alt: "Poster of the Ethics Debate activity",
    section: "Education",
  },

  /* --- Collaboration ----------------------------------------------------- */
  northeastExchange1: {
    kind: "image",
    fileName: "contribution-collab-northeast-exchange-1.webp",
    localSourcePath: `${assetDir}/contribution-collab-northeast-exchange-1.webp`,
    localSrc: northeastExchange1Img,
    uploadUrl: "https://static.igem.wiki/teams/6056/wiki/files/pages/project/contribution/contribution-collab-northeast-exchange-1-aafdc4bcdd85.webp",
    alt: "Photo from the iGEM Northeast Regional Exchange, group photo",
    section: "Collaboration",
  },
  northeastExchange2: {
    kind: "image",
    fileName: "contribution-collab-northeast-exchange-2.webp",
    localSourcePath: `${assetDir}/contribution-collab-northeast-exchange-2.webp`,
    localSrc: northeastExchange2Img,
    uploadUrl: "https://static.igem.wiki/teams/6056/wiki/files/pages/project/contribution/contribution-collab-northeast-exchange-2-48262538ed99.webp",
    alt: "Photo from the iGEM Northeast Regional Exchange, hosted roundtable",
    section: "Collaboration",
  },
  northeastExchange3: {
    kind: "image",
    fileName: "contribution-collab-northeast-exchange-3.webp",
    localSourcePath: `${assetDir}/contribution-collab-northeast-exchange-3.webp`,
    localSrc: northeastExchange3Img,
    uploadUrl: "https://static.igem.wiki/teams/6056/wiki/files/pages/project/contribution/contribution-collab-northeast-exchange-3-93554848c087.webp",
    alt: "Photo from the iGEM Northeast Regional Exchange, registration desk",
    section: "Collaboration",
  },
  lettersAcrossIgem1: {
    kind: "image",
    fileName: "contribution-collab-letters-across-igem-1.webp",
    localSourcePath: `${assetDir}/contribution-collab-letters-across-igem-1.webp`,
    localSrc: lettersAcrossIgem1Img,
    uploadUrl: "https://static.igem.wiki/teams/6056/wiki/files/pages/project/contribution/contribution-collab-letters-across-igem-1-ff61293f485c.webp",
    alt: "Photo from Letters Across iGEM, JLU-FBH group photo",
    section: "Collaboration",
  },
  lettersAcrossIgem2: {
    kind: "image",
    fileName: "contribution-collab-letters-across-igem-2.webp",
    localSourcePath: `${assetDir}/contribution-collab-letters-across-igem-2.webp`,
    localSrc: lettersAcrossIgem2Img,
    uploadUrl: "https://static.igem.wiki/teams/6056/wiki/files/pages/project/contribution/contribution-collab-letters-across-igem-2-021f4b5ee8f0.webp",
    alt: "Photo from Letters Across iGEM, a letter from WHU-China",
    section: "Collaboration",
  },
  lettersAcrossIgem3: {
    kind: "image",
    fileName: "contribution-collab-letters-across-igem-3.webp",
    localSourcePath: `${assetDir}/contribution-collab-letters-across-igem-3.webp`,
    localSrc: lettersAcrossIgem3Img,
    uploadUrl: "https://static.igem.wiki/teams/6056/wiki/files/pages/project/contribution/contribution-collab-letters-across-igem-3-e9afeee34d09.webp",
    alt: "Photo from Letters Across iGEM, a letter from TJUSLS_China",
    section: "Collaboration",
  },
  togetherWithIgem: {
    kind: "pdf",
    fileName: "Together With iGEM.pdf",
    uploadFileName: "contribution-together-with-igem.pdf",
    localSourcePath: `${docDir}/Together With iGEM.pdf`,
    uploadUrl: "https://static.igem.wiki/teams/6056/wiki/files/docs/asset-e422a0dd03ee7ae3.pdf",
    alt: "Together With iGEM — cross-team science communication handbook",
    section: "Collaboration",
  },
  newTeamHandbook: {
    kind: "pdf",
    fileName: "iGEM 新队伍建设与知识传承手册完整版9.pdf",
    uploadFileName: "contribution-new-team-handbook.pdf",
    localSourcePath: `${docDir}/iGEM 新队伍建设与知识传承手册完整版9.pdf`,
    uploadUrl: "https://static.igem.wiki/teams/6056/wiki/files/docs/contribution/the-igem-handbook-for-new-team-building-and-knowledge-transfer.pdf",
    alt: "New Team Development and Knowledge Inheritance Handbook",
    section: "Collaboration",
  },
  ccic1: {
    kind: "image",
    fileName: "contribution-collab-ccic-1.webp",
    localSourcePath: `${assetDir}/contribution-collab-ccic-1.webp`,
    localSrc: ccic1Img,
    uploadUrl: "https://static.igem.wiki/teams/6056/wiki/files/pages/project/contribution/contribution-collab-ccic-1-a8ed72a7cd82.webp",
    alt: "Photo from Synbiopunk-CCiC 2026, team group photo",
    section: "Collaboration",
  },
  ccic2: {
    kind: "image",
    fileName: "contribution-collab-ccic-2.webp",
    localSourcePath: `${assetDir}/contribution-collab-ccic-2.webp`,
    localSrc: ccic2Img,
    uploadUrl: "https://static.igem.wiki/teams/6056/wiki/files/pages/project/contribution/contribution-collab-ccic-2-885f894abadd.webp",
    alt: "Photo from Synbiopunk-CCiC 2026, roundtable discussion",
    section: "Collaboration",
  },
  ccic3: {
    kind: "image",
    fileName: "contribution-collab-ccic-3.webp",
    localSourcePath: `${assetDir}/contribution-collab-ccic-3.webp`,
    localSrc: ccic3Img,
    uploadUrl: "https://static.igem.wiki/teams/6056/wiki/files/pages/project/contribution/contribution-collab-ccic-3-4c3533bab071.webp",
    alt: "Photo from Synbiopunk-CCiC 2026, poster and project exchange",
    section: "Collaboration",
  },
  ccic4: {
    kind: "image",
    fileName: "contribution-collab-ccic-4.webp",
    localSourcePath: `${assetDir}/contribution-collab-ccic-4.webp`,
    localSrc: ccic4Img,
    uploadUrl: "https://static.igem.wiki/teams/6056/wiki/files/pages/project/contribution/contribution-collab-ccic-4-3c37d5ecaa14.webp",
    alt: "Photo from Synbiopunk-CCiC 2026, roundtable game",
    section: "Collaboration",
  },
  apic1: {
    kind: "image",
    fileName: "contribution-collab-apic-1.webp",
    localSourcePath: `${assetDir}/contribution-collab-apic-1.webp`,
    localSrc: apic1Img,
    uploadUrl: "https://static.igem.wiki/teams/6056/wiki/files/pages/project/contribution/contribution-collab-apic-1-9eb8087d530a.webp",
    alt: "Photo from the 1st Grand APiC, Shenzhen group photo",
    section: "Collaboration",
  },
  apic2: {
    kind: "image",
    fileName: "contribution-collab-apic-2.webp",
    localSourcePath: `${assetDir}/contribution-collab-apic-2.webp`,
    localSrc: apic2Img,
    uploadUrl: "https://static.igem.wiki/teams/6056/wiki/files/pages/project/contribution/contribution-collab-apic-2-e2d2998aef73.webp",
    alt: "Photo from the 1st Grand APiC, Hong Kong group photo",
    section: "Collaboration",
  },
  regionalNorthChina: {
    kind: "image",
    fileName: "contribution-collab-regional-north-china.webp",
    localSourcePath: `${assetDir}/contribution-collab-regional-north-china.webp`,
    localSrc: regionalNorthChinaImg,
    uploadUrl: "https://static.igem.wiki/teams/6056/wiki/files/pages/project/contribution/contribution-collab-regional-north-china-27865d2b4c45.webp",
    alt: "Photo from the North China regional exchange",
    section: "Collaboration",
  },
  regionalEastChina: {
    kind: "image",
    fileName: "contribution-collab-regional-east-china.webp",
    localSourcePath: `${assetDir}/contribution-collab-regional-east-china.webp`,
    localSrc: regionalEastChinaImg,
    uploadUrl: "https://static.igem.wiki/teams/6056/wiki/files/pages/project/contribution/contribution-collab-regional-east-china-de9c844fc0fd.webp",
    alt: "Photo from the East China regional exchange",
    section: "Collaboration",
  },
  regionalSouthChina: {
    kind: "image",
    fileName: "contribution-collab-regional-south-china.webp",
    localSourcePath: `${assetDir}/contribution-collab-regional-south-china.webp`,
    localSrc: regionalSouthChinaImg,
    uploadUrl: "https://static.igem.wiki/teams/6056/wiki/files/pages/project/contribution/contribution-collab-regional-south-china-4d207c6a3bae.webp",
    alt: "Photo from the South China regional exchange",
    section: "Collaboration",
  },
  regionalCentralChina: {
    kind: "image",
    fileName: "contribution-collab-regional-central-china.webp",
    localSourcePath: `${assetDir}/contribution-collab-regional-central-china.webp`,
    localSrc: regionalCentralChinaImg,
    uploadUrl: "https://static.igem.wiki/teams/6056/wiki/files/pages/project/contribution/contribution-collab-regional-central-china-111bffd776c7.webp",
    alt: "Photo from the Central China regional exchange",
    section: "Collaboration",
  },
} as const satisfies Record<string, ContributionAssetEntry>;

export type ContributionAssetKey = keyof typeof contributionAssets;

/** Keys whose entry is an image (i.e. has a bundled local source). */
export type ContributionImageAssetKey = {
  [K in ContributionAssetKey]: (typeof contributionAssets)[K]["kind"] extends "image"
    ? K
    : never;
}[ContributionAssetKey];

/** Keys whose entry is a document served from `public/assets/docs/`. */
export type ContributionDocAssetKey = {
  [K in ContributionAssetKey]: (typeof contributionAssets)[K]["kind"] extends "pdf"
    ? K
    : never;
}[ContributionAssetKey];

/**
 * Resolve one image from iGEM CDN, with a local preview as fallback.
 */
export const contributionImage = (key: ContributionImageAssetKey): string => {
  const entry: ContributionAssetEntry = contributionAssets[key];
  return entry?.uploadUrl || entry?.localSrc || "";
};

/**
 * Local URL of a document kept in `public/assets/docs/`.
 *
 * `public/` is served from the deployment base, not from the site root, so the
 * path has to be built off `import.meta.env.BASE_URL` — the same rule
 * `designAssets.ts` uses. A bare `/assets/docs/...` resolves in neither the dev
 * server (which serves under a team slug) nor the deployed wiki, so the browser
 * PDF plugin shows Vite's "did you mean to visit …?" notice instead of the
 * document. The file name is percent-encoded because several titles contain
 * spaces.
 */
const localDocUrl = (fileName: string): string =>
  `${import.meta.env.BASE_URL}assets/docs/${encodeURIComponent(fileName)}`;

/**
 * iGEM docs URL of a hosted PDF, with the local copy as the fallback.
 *
 * Prefer the hosted file in development and production.
 */
export const contributionDocUrl = (key: ContributionDocAssetKey): string => {
  const entry = contributionAssets[key];
  const local = localDocUrl(entry.fileName);
  return entry.uploadUrl || local;
};

/** Upload targets still waiting for a CDN URL. */
export const contributionPendingUploads = (
  Object.entries(contributionAssets) as Array<
    [ContributionAssetKey, ContributionAssetEntry]
  >
)
  .filter(([, entry]) => entry.uploadUrl === "")
  .map(([key, entry]) => ({
    key,
    target: `${
      entry.kind === "image" ? IMG_TARGET : DOC_TARGET
    }${publishedName(entry)}`,
  }));
