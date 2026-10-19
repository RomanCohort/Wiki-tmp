const SHARED_CDN =
  "https://static.igem.wiki/teams/6056/wiki/files/pages/shared";
const biorender = `${SHARED_CDN}/sponsor-biorender.webp`;
const grammarly = `${SHARED_CDN}/sponsor-grammarly.avif`;
const charlesRiver = `${SHARED_CDN}/sponsor-charles-river-english.webp`;
const igem = `${SHARED_CDN}/sponsor-igem.avif`;
const lark = `${SHARED_CDN}/sponsor-lark.avif`;
const mathworks = `${SHARED_CDN}/sponsor-mathworks.avif`;
const schrodinger = `${SHARED_CDN}/sponsor-schrodinger.avif`;
const jluWordmark = `${SHARED_CDN}/jlu-wordmark-bilingual.webp`;
const teachingSeal = `${SHARED_CDN}/bethune-teaching-department.webp`;
const coreFacility = `${SHARED_CDN}/sponsor-jlu-core-facility.webp`;
const itm = `${SHARED_CDN}/sponsor-jlu-itm.webp`;
const animalCenter = `${SHARED_CDN}/laboratory-animal-center-logo.avif`;
const xiaohongshu = `${SHARED_CDN}/xiaohongshu.avif`;
const youtube = `${SHARED_CDN}/youtube.avif`;
const wechat = `${SHARED_CDN}/wechat.avif`;

/**
 * Footer — single source of truth for the closing panel.
 *
 * Two rules govern this file:
 *   1. Nothing here is derived from the route. The panel's colour comes from the
 *      module palette (`route-palette-<module>.css`), not from a value below.
 *   2. Artwork is kept as supplied by the team. CSS sets its displayed size
 *      and preserves the marks' proportions.
 *
 * The panel is warm off-white paper. Institutional marks retain their supplied
 * colours; the other acknowledgements are softened to neutral grey by CSS.
 *   - `jlu-crest`               solid, not the outline cut (L2) — hairlines
 *                                break up when reduced to 92px.
 *   - `jlu-wordmark-bilingual`  right-hand crop of the team's supplied blue
 *                                Chinese/English signature, without redrawing.
 *   - `bethune-clinical-college` solid, not the outline cut (L1).
 *   - `bethune-hospital-seal`   the only version that exists.
 */

/**
 * A mark rendered in the footer from the team's hosted or bundled assets.
 */
export interface FooterMark {
  src: string;
  /** Display width in pixels; responsive CSS can scale the artwork down. */
  width: number;
  /** Accessible name; marks beside a written institution name are decorative. */
  alt: string;
}

const jluCrest = `${SHARED_CDN}/jlu-crest.avif`;
const collegeWordmark = `${SHARED_CDN}/bethune-clinical-college.avif`;
const hospitalSeal = `${SHARED_CDN}/bethune-hospital-seal.avif`;
const cancerCenter = `${SHARED_CDN}/cancer-center.avif`;

/**
 * Institution names are written in the component, so these assets are
 * decorative signatures rather than the only source of a name.
 */
export const FOOTER_CLINICAL_COLLEGE_NAME =
  "The First Bethune Clinical Medical College of Jilin University";
export const FOOTER_CLINICAL_HOSPITAL_NAME =
  "The First Bethune Hospital of Jilin University";

export const FOOTER_MARK_UNIVERSITY: ReadonlyArray<FooterMark> = [
  { src: jluCrest, width: 96, alt: "Jilin University crest" },
  { src: jluWordmark, width: 160, alt: "吉林大学 · Jilin University" },
];

export const FOOTER_MARK_CLINICAL: ReadonlyArray<FooterMark> = [
  { src: hospitalSeal, width: 82, alt: FOOTER_CLINICAL_HOSPITAL_NAME },
  { src: collegeWordmark, width: 238, alt: FOOTER_CLINICAL_COLLEGE_NAME },
];

export const FOOTER_INSTITUTION_LINES: ReadonlyArray<string> = [
  FOOTER_CLINICAL_COLLEGE_NAME,
  "Xinmin Street 71, Chaoyang District, Changchun, Jilin, PRC",
];

/**
 * Split so the footer can underline the local part alone. Underlining the whole
 * address lets the browser treat `jlu-fbh.cn` as a top-level domain.
 */
export const FOOTER_EMAIL_LOCAL = "team";
export const FOOTER_EMAIL_DOMAIN = "jlu-fbh.cn";
export const FOOTER_EMAIL = `${FOOTER_EMAIL_LOCAL}@${FOOTER_EMAIL_DOMAIN}`;

export interface FooterSocialLink {
  id: string;
  name: string;
  href: string;
  icon: string;
  alt: string;
}

export const FOOTER_SOCIAL_LINKS: ReadonlyArray<FooterSocialLink> = [
  {
    id: "wechat",
    name: "WeChat",
    href: "https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzYyMzk1NjY2Mw==&scene=124#wechat_redirect",
    icon: wechat,
    alt: "微信公众号 (WeChat Official Account)",
  },
  {
    id: "xhs",
    name: "Xiaohongshu",
    href: "https://xhslink.cn/o/7mSIM6djn5u",
    icon: xiaohongshu,
    alt: "小红书 (Xiaohongshu)",
  },
  {
    id: "youtube",
    name: "YouTube",
    href: "https://www.youtube.com/@JLU-FBH-iGEM",
    icon: youtube,
    alt: "YouTube (@JLU-FBH-iGEM)",
  },
];

/**
 * The CC BY 4.0 notice and the gitlab.igem.org repository link are required on
 * every page by iGEM; they are rendered by `Footer.tsx` from these values and
 * must never be removed.
 */
export const FOOTER_LICENSE_LABEL =
  "Creative Commons Attribution 4.0 International license";
export const FOOTER_LICENSE_URL =
  "https://creativecommons.org/licenses/by/4.0/";

export const FOOTER_MARK_TEACHING: FooterMark = {
  src: teachingSeal,
  width: 84,
  alt: "Department of Teaching, The First Bethune School of Clinical Medicine, Jilin University",
};

/** The Cancer Center is part of the clinical institution, not a sponsor tier. */
export const FOOTER_MARK_CANCER_CENTER: FooterMark = {
  src: cancerCenter,
  width: 132,
  alt: "Cancer Center, The First Bethune Hospital of Jilin University",
};

export interface FooterOrganisation {
  name: string;
  marks: ReadonlyArray<FooterMark>;
}

/** The institutional supporters lead the acknowledgement set in full colour. */
export const FOOTER_SUPPORTERS: ReadonlyArray<FooterOrganisation> = [
  {
    name: "Core Facility",
    marks: [
      {
        src: coreFacility,
        width: 72,
        alt: "Core Facility of the First Hospital of Jilin University",
      },
    ],
  },
  {
    name: "Institute of Translational Medicine",
    marks: [
      {
        src: itm,
        width: 72,
        alt: "Institute of Translational Medicine, the First Hospital of Jilin University",
      },
    ],
  },
  {
    name: "Laboratory Animal Center",
    marks: [
      {
        src: animalCenter,
        width: 72,
        alt: "Laboratory Animal Center, the First Hospital of Jilin University",
      },
    ],
  },
];

/** Alternate visual weight, including the last-to-first join of the loop. */
export const FOOTER_SPONSORS: ReadonlyArray<FooterOrganisation> = [
  {
    // Vital River (维通利华) is Charles River's company in China.
    name: "Charles River",
    marks: [{ src: charlesRiver, width: 144, alt: "Charles River" }],
  },
  {
    name: "BioRender",
    marks: [{ src: biorender, width: 50, alt: "BioRender" }],
  },
  {
    name: "MathWorks",
    marks: [{ src: mathworks, width: 150, alt: "MathWorks" }],
  },
  {
    name: "Lark",
    marks: [{ src: lark, width: 108, alt: "Lark" }],
  },
  {
    name: "Grammarly",
    marks: [{ src: grammarly, width: 140, alt: "Grammarly" }],
  },
  {
    name: "iGEM",
    marks: [{ src: igem, width: 62, alt: "iGEM" }],
  },
  {
    // Schrödinger publishes PyMOL.
    name: "Schrödinger",
    marks: [{ src: schrodinger, width: 150, alt: "Schrödinger" }],
  },
];
