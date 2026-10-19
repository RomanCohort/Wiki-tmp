/**
 * SDG 4 hosted assets, copied verbatim from their positions in the manuscript.
 *
 * Photographs use the team's remote `static.igem.wiki` URLs (same convention as
 * the SDG 12 chapter).
 */
import type { SustainabilityAssetEntry } from "./sustainabilityAssets";
import type { StakeholderPhotoSet } from "./sustainabilityPhotos";

const SDG4_PAGES =
  "https://static.igem.wiki/teams/6056/wiki/files/pages/engagement/sustainability/sdg4";
const SDG4_DOCS =
  "https://static.igem.wiki/teams/6056/wiki/files/docs/sus-sdg4";

export const sdg4DocUrl = (fileName: string) => `${SDG4_DOCS}/${fileName}`;

/** Build a sequential photograph set (…-1, …-2 …) for one card. */
const photoSet = (
  label: string,
  ...files: ReadonlyArray<string>
): StakeholderPhotoSet =>
  files.map((file, index) => ({
    src: `${SDG4_PAGES}/${file}`,
    alt: `${label} — photograph ${index + 1}`,
    caption: label,
  }));

export const sdg4PhotoSets = {
  "sdg4-01": photoSet("Yue Zhang", "01-yuezhang-1.avif", "01-yuezhang-2.avif"),
  "sdg4-02": photoSet(
    "Professor Shuangcheng Yu",
    "02-shuangcheng-yu-2.avif",
    "02-shuangcheng-yu-3.avif",
  ),
  "sdg4-03": photoSet(
    "Xiang Cao",
    "03-xiang-cao-1.avif",
    "03-xiang-cao-2.avif",
  ),
  "sdg4-05": photoSet(
    "Body Guardians",
    "05-body-guardians-1.avif",
    "05-body-guardians-2.avif",
    "05-body-guardians-3.avif",
    "05-body-guardians-4.avif",
    "05-body-guardians-5.avif",
    "05-body-guardians-6.avif",
  ),
  "sdg4-06": photoSet(
    "Imagining the Future through Biology",
    "06-imagining-the-future-through-biology-1.avif",
    "06-imagining-the-future-through-biology-2.avif",
    "06-imagining-the-future-through-biology-3.avif",
    "06-imagining-the-future-through-biology-4.avif",
    "06-imagining-the-future-through-biology-5.avif",
    "06-imagining-the-future-through-biology-6.avif",
  ),
  // Verbatim from the manuscript, which mixes the 07/08 prefixes here.
  "sdg4-07": photoSet(
    "Exploring Student Research Projects",
    "07-exploring-student-research-projects-1.avif",
    "08-engineering-biology-for-real-problems-2.avif",
    "08-engineering-biology-for-real-problems-3.avif",
    "08-engineering-biology-for-real-problems-4.avif",
    "08-engineering-biology-for-real-problems-5.avif",
  ),
  "sdg4-08": photoSet(
    "Engineering Biology for Real Problems",
    "08-engineering-biology-for-real-problems-1.avif",
    "08-engineering-biology-for-real-problems-2.avif",
    "08-engineering-biology-for-real-problems-3.avif",
    "08-engineering-biology-for-real-problems-4.avif",
    "08-engineering-biology-for-real-problems-5.avif",
  ),
  "sdg4-09": photoSet(
    "More Than Biology",
    "09-more-than-biology-1.avif",
    "09-more-than-biology-2.avif",
    "09-more-than-biology-3.avif",
    "09-more-than-biology-4.avif",
  ),
  "sdg4-10": photoSet(
    "SynBio Across Borders",
    "10-synbio-across-borders-1.avif",
    "10-synbio-across-borders-2.avif",
    "10-synbio-across-borders-3.avif",
  ),
  "sdg4-11": photoSet(
    "Air to Bread",
    "11-air-to-bread-1.avif",
    "11-air-to-bread-2.avif",
    "11-air-to-bread-3.avif",
    "11-air-to-bread-4.avif",
    "11-air-to-bread-5.avif",
  ),
  // The nine 12-* frames sit at the end of section 11 in the manuscript but are
  // named for activity 12 (Synbio classroom); they are assigned by file name.
  "sdg4-12": photoSet(
    "Synbio classroom",
    "12-synbio-classroom-1.avif",
    "12-synbio-classroom-2.avif",
    "12-synbio-classroom-3.avif",
    "12-synbio-classroom-4.avif",
    "12-synbio-classroom-6.avif",
    "12-synbio-classroom-7.avif",
    "12-synbio-classroom-11.avif",
    "12-synbio-classroom-12.avif",
    "12-synbio-classroom-13.avif",
  ),
  "sdg4-13": photoSet(
    "The Pen of Creation",
    "13-the-pen-of-creation-1.avif",
    "13-the-pen-of-creation-2.avif",
    "13-the-pen-of-creation-3.avif",
    "13-the-pen-of-creation-4.avif",
    "13-the-pen-of-creation-5.avif",
  ),
  "sdg4-14": photoSet(
    "Apricot Blossoms and Pink Care",
    "14-apricot-blossoms-and-pink-care-1.avif",
    "14-apricot-blossoms-and-pink-care-2.avif",
    "14-apricot-blossoms-and-pink-care-3.avif",
    "14-apricot-blossoms-and-pink-care-4.avif",
    "14-apricot-blossoms-and-pink-care-5.avif",
    "14-apricot-blossoms-and-pink-care-6.avif",
    "14-apricot-blossoms-and-pink-care-7.avif",
    "14-apricot-blossoms-and-pink-care-8.avif",
  ),
  "sdg4-15": photoSet(
    "Love, Music & Us",
    "15-love-music-us-1.avif",
    "15-love-music-us-2.avif",
    "15-love-music-us-3.avif",
    "15-love-music-us-4.avif",
    "15-love-music-us-5.avif",
  ),
  "sdg4-16": photoSet(
    "Life Science Adventure",
    "16-life-science-adventure-1.avif",
    "16-life-science-adventure-2.avif",
    "16-life-science-adventure-3.avif",
    "16-life-science-adventure-4.avif",
  ),
  "sdg4-17": photoSet(
    "Little Scientist",
    "17-little-scientist-1.avif",
    "17-little-scientist-2.avif",
    "17-little-scientist-3.avif",
  ),
  "sdg4-18": photoSet(
    "Health Guardians",
    "18-health-guardians-1.avif",
    "18-health-guardians-2.avif",
    "18-health-guardians-3.avif",
  ),
} as const satisfies Record<string, StakeholderPhotoSet>;

/** Resource showcase figures + E — Evidence figures. */
export const sdg4ImageAssets = {
  sdg4VirtualLaboratory: {
    kind: "image",
    fileName: "01-virtual-laboratory.avif",
    localSourcePath: "",
    uploadUrl: `${SDG4_PAGES}/01-virtual-laboratory.avif`,
    alt: "Virtual laboratory with nine experiments across three difficulty levels",
    section: "SDG 4 — Educational Resources",
    width: 1600,
    height: 900,
  },
  sdg4BioMemoryMatch: {
    kind: "image",
    fileName: "02-bio-memory-match.avif",
    localSourcePath: "",
    uploadUrl: `${SDG4_PAGES}/02-bio-memory-match.avif`,
    alt: "Bio Memory Match physical cards and bilingual concept guide",
    section: "SDG 4 — Educational Resources",
    width: 1600,
    height: 900,
  },
  sdg4BreastGuardianRpg: {
    kind: "image",
    fileName: "03-breast-guardian-rpg.avif",
    localSourcePath: "",
    uploadUrl: `${SDG4_PAGES}/03-breast-guardian-rpg.avif`,
    alt: "Breast Guardian RPG interactive story game",
    section: "SDG 4 — Educational Resources",
    width: 2560,
    height: 1440,
  },
  sdg4Evidence0: {
    kind: "image",
    fileName: "evidence-0-1.avif",
    localSourcePath: "",
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/pages/engagement/sustainability/sdg4/evidence-0-1.avif",
    alt: "Feedback from three stakeholder groups informing educational design",
    section: "SDG 4 — Evidence",
    width: 3106,
    height: 1029,
  },
  sdg4Evidence1: {
    kind: "image",
    fileName: "evidence-1-2.avif",
    localSourcePath: "",
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/pages/engagement/sustainability/sdg4/evidence-1-2.avif",
    alt: "Reach of the 14 educational activities across schools and audiences",
    section: "SDG 4 — Evidence",
    width: 3604,
    height: 1997,
  },
  sdg4Evidence2: {
    kind: "image",
    fileName: "evidence-2.avif",
    localSourcePath: "",
    uploadUrl: `${SDG4_PAGES}/evidence-2.avif`,
    alt: "SDG 4-shaped word cloud of educational priorities",
    section: "SDG 4 — Evidence",
    width: 2010,
    height: 694,
  },
} as const satisfies Record<string, SustainabilityAssetEntry>;
