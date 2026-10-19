/**
 * Sustainability — SDG 3 engagement photos.
 *
 * Source drop: `sustain-overview-SDG3/02-SDG Impact Franmework/01-SDG3/
 * 01-stakeholders/<NN>-<person>/*.avif` (cameras, ward visits, lab and conference
 * records). Every file was capped at 1800px on the long edge and re-encoded as
 * WebP; the original AVIFs stay untouched in the team archive.
 *
 * Two consumers, one source of truth:
 *   - `StakeholderPhotoReel` — the slow crossfade bleeding off the card's right
 *     edge (only the 3–4 strongest frames per person, in narrative order);
 *   - the "Click more" article — the full set, laid out inline at body width.
 *
 * A person with no `photos` entry simply renders without a photo layer, so the
 * mechanism stays identical across all twelve SDG 3 cards.
 */

export interface StakeholderPhoto {
  src: string;
  alt: string;
  /** Serif italic line that fades in over the photo. */
  caption: string;
}

export type StakeholderPhotoSet = ReadonlyArray<StakeholderPhoto>;

const CDN = "https://static.igem.wiki/teams/6056/wiki/files/pages/engagement/sustainability";
const photoUrl = (slug: string) => `${CDN}/sustainability-sdg3-${slug}.webp`;

/* ----------------------------------------------------------------------------
 * Per-person photo sets
 * -------------------------------------------------------------------------- */

const liChengli: StakeholderPhotoSet = [
  {
    src: photoUrl("li-chengli-1"),
    alt: "Project pitch shared on screen during the video consultation with Dr. Chengli Li",
    caption: "Presenting the CirCure concept",
  },
  {
    src: photoUrl("li-chengli-2"),
    alt: "Video consultation gallery view with our team and Dr. Chengli Li",
    caption: "Video consultation",
  },
  {
    src: photoUrl("li-chengli-3"),
    alt: "Team members joining the consultation from their own rooms",
    caption: "Joining from Jilin",
  },
  {
    src: photoUrl("li-chengli-4"),
    alt: "Later stage of the video consultation with Dr. Chengli Li",
    caption: "Reordering our priorities",
  },
];

const tianRunhui: StakeholderPhotoSet = [
  {
    src: "https://static.igem.wiki/teams/6056/wiki/files/pages/engagement/sustainability/sdg3/02-runhui-tian-1.avif",
    alt: "Interview with Runhui Tian — photograph 1",
    caption: "Runhui Tian",
  },
  {
    src: "https://static.igem.wiki/teams/6056/wiki/files/pages/engagement/sustainability/sdg3/02-runhui-tian-2.avif",
    alt: "Interview with Runhui Tian — photograph 2",
    caption: "Runhui Tian",
  },
  {
    src: "https://static.igem.wiki/teams/6056/wiki/files/pages/engagement/sustainability/sdg3/02-runhui-tian-3.avif",
    alt: "Interview with Runhui Tian — photograph 3",
    caption: "Runhui Tian",
  },
  {
    src: "https://static.igem.wiki/teams/6056/wiki/files/pages/engagement/sustainability/sdg3/02-runhui-tian-4.avif",
    alt: "Interview with Runhui Tian — photograph 4",
    caption: "Runhui Tian",
  },
];

const tnbcPatients: StakeholderPhotoSet = [
  {
    src: "https://static.igem.wiki/teams/6056/wiki/files/pages/engagement/sustainability/sdg3/03-tnbc-patients-1.avif",
    alt: "TNBC Patients — photograph 1",
    caption: "TNBC Patients",
  },
  {
    src: "https://static.igem.wiki/teams/6056/wiki/files/pages/engagement/sustainability/sdg3/03-tnbc-patients-2.avif",
    alt: "TNBC Patients — photograph 2",
    caption: "TNBC Patients",
  },
  {
    src: "https://static.igem.wiki/teams/6056/wiki/files/pages/engagement/sustainability/sdg3/03-tnbc-patients-3.avif",
    alt: "TNBC Patients — photograph 3",
    caption: "TNBC Patients",
  },
];

const wangJianguo: StakeholderPhotoSet = [
  {
    src: "https://static.igem.wiki/teams/6056/wiki/files/pages/engagement/sustainability/sdg3/05-jianguo-wang-1.avif",
    alt: "Jianguo Wang — photograph 1",
    caption: "Jianguo Wang",
  },
  {
    src: "https://static.igem.wiki/teams/6056/wiki/files/pages/engagement/sustainability/sdg3/05-jianguo-wang-2.avif",
    alt: "Jianguo Wang — photograph 2",
    caption: "Jianguo Wang",
  },
  {
    src: "https://static.igem.wiki/teams/6056/wiki/files/pages/engagement/sustainability/sdg3/05-jianguo-wang-3.avif",
    alt: "Jianguo Wang — photograph 3",
    caption: "Jianguo Wang",
  },
  {
    src: "https://static.igem.wiki/teams/6056/wiki/files/pages/engagement/sustainability/sdg3/05-jianguo-wang-4.avif",
    alt: "Jianguo Wang — photograph 4",
    caption: "Jianguo Wang",
  },
];

const wenJing: StakeholderPhotoSet = [
  {
    src: "https://static.igem.wiki/teams/6056/wiki/files/pages/engagement/sustainability/sdg3/06-jing-wen-1.avif",
    alt: "Jing Wen — photograph 1",
    caption: "Jing Wen",
  },
  {
    src: "https://static.igem.wiki/teams/6056/wiki/files/pages/engagement/sustainability/sdg3/06-jing-wen-2.avif",
    alt: "Jing Wen — photograph 2",
    caption: "Jing Wen",
  },
];

const wangLei: StakeholderPhotoSet = [
  {
    src: "https://static.igem.wiki/teams/6056/wiki/files/pages/engagement/sustainability/sdg3/07-lei-wang-1.avif",
    alt: "Lei Wang — photograph 1",
    caption: "Lei Wang",
  },
  {
    src: "https://static.igem.wiki/teams/6056/wiki/files/pages/engagement/sustainability/sdg3/07-lei-wang-2.avif",
    alt: "Lei Wang — photograph 2",
    caption: "Lei Wang",
  },
  {
    src: "https://static.igem.wiki/teams/6056/wiki/files/pages/engagement/sustainability/sdg3/07-lei-wang-3.avif",
    alt: "Lei Wang — photograph 3",
    caption: "Lei Wang",
  },
];

const yangShujuan: StakeholderPhotoSet = [
  {
    src: photoUrl("yang-shujuan-1"),
    alt: "Team members with Shujuan Yang holding the team banner in her office",
    caption: "First Bethune Hospital",
  },
  {
    src: photoUrl("yang-shujuan-2"),
    alt: "Shujuan Yang in conversation with three team members at her desk",
    caption: "Discussing prevention and screening",
  },
  {
    src: photoUrl("yang-shujuan-3"),
    alt: "Shujuan Yang reading her notes during the discussion",
    caption: "Beyond treatment alone",
  },
  {
    src: photoUrl("yang-shujuan-4"),
    alt: "Shujuan Yang holding up printed materials for the visiting team",
    caption: "Reviewing our printed records",
  },
  {
    src: photoUrl("yang-shujuan-5"),
    alt: "Shujuan Yang smiling at her desk as the team takes notes",
    caption: "Closing the discussion",
  },
];

const jiaLin: StakeholderPhotoSet = [
  {
    src: photoUrl("jia-lin-1"),
    alt: "Team members reviewing project material with Lin Jia in the laboratory",
    caption: "Laboratory discussion",
  },
  {
    src: photoUrl("jia-lin-2"),
    alt: "Six people in the laboratory seated around a laptop",
    caption: "Clinical needs review",
  },
  {
    src: photoUrl("jia-lin-3"),
    alt: "Lin Jia in a white coat seated with team members taking notes",
    caption: "From pathology to design",
  },
  {
    src: photoUrl("jia-lin-4"),
    alt: "Lin Jia addressing five team members gathered in the laboratory",
    caption: "What problem should we solve?",
  },
  {
    src: photoUrl("jia-lin-5"),
    alt: "Wider view of the laboratory discussion with Lin Jia gesturing",
    caption: "Clarifying the unmet need",
  },
];

const zhaoGang: StakeholderPhotoSet = [
  {
    src: photoUrl("zhao-gang-1"),
    alt: "Gang Zhao speaking with the team in a clinical office",
    caption: "Clinical management",
  },
  {
    src: photoUrl("zhao-gang-2"),
    alt: "Gang Zhao talking across his desk to a team member taking notes",
    caption: "Fitting into the care pathway",
  },
  {
    src: photoUrl("zhao-gang-3"),
    alt: "Team members holding iGEM and JLU-FBH emblems beside Gang Zhao",
    caption: "A shared goal",
  },
  {
    src: photoUrl("zhao-gang-4"),
    alt: "Five team members listening while one takes notes on a tablet",
    caption: "From lab bench to ward",
  },
  {
    src: photoUrl("zhao-gang-5"),
    alt: "Full team group photo with Gang Zhao and the team banner",
    caption: "Visit complete",
  },
];

const globalYouth: StakeholderPhotoSet = [
  {
    src: photoUrl("global-youth-1"),
    alt: "Opening ceremony of the 2026 Acceleration Week for Global Youth Development Programs",
    caption: "Acceleration Week, June 2026",
  },
  {
    src: photoUrl("global-youth-2"),
    alt: "Team members with fellow participants at the Lin-Gang reception",
    caption: "Meeting peers from other regions",
  },
  {
    src: photoUrl("global-youth-3"),
    alt: "Two team members during a workshop session at Acceleration Week",
    caption: "Workshop session",
  },
  {
    src: photoUrl("global-youth-4"),
    alt: "Young practitioners from different countries seated in the session audience",
    caption: "Health and Well-being group",
  },
  {
    src: photoUrl("global-youth-5"),
    alt: "Team member presenting the project at the Good Health and Well-being forum",
    caption: "Project pitch",
  },
  {
    src: photoUrl("global-youth-6"),
    alt: "Team member in front of the Acceleration Week backdrop",
    caption: "Shenzhen and Wuhan",
  },
];

const cuiJiuwei: StakeholderPhotoSet = [
  {
    src: "https://static.igem.wiki/teams/6056/wiki/files/pages/engagement/sustainability/sdg3/10-jiuwei-cui-1.avif",
    alt: "Jiuwei Cui — photograph 1",
    caption: "Jiuwei Cui",
  },
  {
    src: "https://static.igem.wiki/teams/6056/wiki/files/pages/engagement/sustainability/sdg3/10-jiuwei-cui-2.avif",
    alt: "Jiuwei Cui — photograph 2",
    caption: "Jiuwei Cui",
  },
];

/**
 * Named sets, so article copy can drop a specific frame between two sections
 * without hard-coding asset paths into the prose layer.
 */
export const sdg3PhotoSets = {
  "sdg3-li-chengli": liChengli,
  "sdg3-tian-runhui": tianRunhui,
  "sdg3-tnbc-patients": tnbcPatients,
  "sdg3-wang-jianguo": wangJianguo,
  "sdg3-wen-jing": wenJing,
  "sdg3-wang-lei": wangLei,
  "sdg3-yang-shujuan": yangShujuan,
  "sdg3-jia-lin": jiaLin,
  "sdg3-cui-jiuwei": cuiJiuwei,
  "sdg3-zhao-gang": zhaoGang,
  "sdg3-global-youth": globalYouth,
} as const satisfies Record<string, StakeholderPhotoSet>;

/**
 * `StakeholderProfile.id` → photos.
 */
export const sdg3StakeholderPhotos: Readonly<Record<string, StakeholderPhotoSet>> =
  sdg3PhotoSets;

/** Every SDG 3 engagement photo, ordered for the inline article galleries. */
export const sdg3AllPhotos: ReadonlyArray<StakeholderPhoto> = [
  ...liChengli,
  ...tianRunhui,
  ...tnbcPatients,
  ...wangJianguo,
  ...wenJing,
  ...wangLei,
  ...yangShujuan,
  ...jiaLin,
  ...cuiJiuwei,
  ...zhaoGang,
  ...globalYouth,
];

/** Photos of one profile, or an empty list when nothing was documented. */
export const stakeholderPhotos = (id: string): StakeholderPhotoSet =>
  sdg3StakeholderPhotos[id] ?? [];

/* ----------------------------------------------------------------------------
 * SDG 9 — iGEM-hosted interview photo sets
 * -------------------------------------------------------------------------- */

const hostedSdg9PhotoSet = (
  slug: string,
  count: number,
  label: string,
): StakeholderPhotoSet =>
  Array.from({ length: count }, (_, index) => ({
    src: `https://static.igem.wiki/teams/6056/wiki/files/pages/engagement/sustainability/sdg9/${slug}-${index + 1}.avif`,
    alt: `${label} interview photo ${index + 1}`,
    caption: label,
  }));

/** The source manuscript supplied iGEM-hosted images rather than local files. */
export const sdg9PhotoSets = {
  "sdg9-01": hostedSdg9PhotoSet("01-yishu-wang", 5, "Interview with Professor Yishu Wang"),
  "sdg9-02": [
    {
      src: "https://static.igem.wiki/teams/6056/wiki/files/pages/engagement/sustainability/sdg9/02-qingtian-guan-1.avif",
      alt: "Interview with Mr. Qingtian Guan interview photo 1",
      caption: "Interview with Mr. Qingtian Guan",
    },
    {
      src: "https://static.igem.wiki/teams/6056/wiki/files/pages/engagement/sustainability/sdg9/02-qingtian-guan-2.avif",
      alt: "Interview with Mr. Qingtian Guan interview photo 2",
      caption: "Interview with Mr. Qingtian Guan",
    },
    {
      src: "https://static.igem.wiki/teams/6056/wiki/files/pages/engagement/sustainability/sdg9/02-qingtian-guan-3.avif",
      alt: "Interview with Mr. Qingtian Guan interview photo 3",
      caption: "Interview with Mr. Qingtian Guan",
    },
  ],
  "sdg9-03": hostedSdg9PhotoSet("03-jifan-hu", 6, "Interview with Professor Jifan Hu"),
  "sdg9-04": hostedSdg9PhotoSet("04-tiesuo-zhao", 5, "Interview with Professor Tiesuo Zhao"),
  "sdg9-05": hostedSdg9PhotoSet("05-junqi-niu", 6, "Interview with Professor Junqi Niu"),
  "sdg9-06": hostedSdg9PhotoSet("06-yuning-zhang", 7, "Interview with Professor Yuning Zhang"),
  "sdg9-07": hostedSdg9PhotoSet("07-di-wu", 6, "Interview with Professor Di Wu"),
  "sdg9-08": hostedSdg9PhotoSet(
    "08-shanghai-lin-gang-research-center-for-medical-equipment",
    6,
    "Visit to the Shanghai Lingang Research Center for Medical Equipment",
  ),
  "sdg9-09": hostedSdg9PhotoSet("09-hualan-bio", 6, "Discussion with Hualan Bio"),
} as const satisfies Record<string, StakeholderPhotoSet>;
