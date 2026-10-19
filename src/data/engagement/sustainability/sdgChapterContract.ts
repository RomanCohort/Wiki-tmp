/**
 * SDG chapter contract for the Sustainability page.
 *
 * Every SET / DEVELOP chapter (SDG 3 / 9 / 12 / 4 / 17) follows the same
 * SCALE skeleton. Going live with another SDG = one more file exporting an
 * `SdgChapter`, pushed into `sustainabilityChapters`; the page builder and the
 * feature map derive their blocks and keys from it. Pure types + helpers.
 */

import type { SustainabilityImageAssetKey } from "./sustainabilityAssets";
import type { StakeholderPhoto } from "./sustainabilityPhotos";

export interface SustainabilityStat {
  id: string;
  value: number;
  /** Fraction digits kept when counting up (e.g. 22.37 → 2). */
  decimals?: number;
  unit?: string;
  label: string;
}

/** A run of direct quotes; `speaker` is omitted for anonymous family voices. */
export interface ChatQuote {
  speaker?: string;
  text: string;
}

/** Ordered content of a "Click more" article: prose, quote runs or bullets. */
export type ArticleBlock =
  | string
  | { quotes: ReadonlyArray<ChatQuote> }
  | { bullets: ReadonlyArray<string> }
  /** One engagement photo, placed at body width between sections. */
  | { photo: StakeholderPhoto };

export interface ArticleSection {
  heading?: string;
  blocks: ReadonlyArray<ArticleBlock>;
}

export interface StakeholderArticle {
  title: string;
  sections: ReadonlyArray<ArticleSection>;
}

export interface StakeholderProfile {
  id: string;
  /** Ordinal from the source heading ("01" … "18"). */
  index: string;
  name: string;
  role?: string;
  /**
   * Engagement photographs. Resolved from `sustainabilityPhotos.ts` by `id`;
   * profiles with nothing documented render without a photo layer.
   */
  photos?: ReadonlyArray<StakeholderPhoto>;
  relevantStakeholder?: string;
  activityType?: string;
  partner?: string;
  partnerLabel?: string;
  challenge?: string;
  challengeLabel?: string;
  /** Educator/interview cards carry Key Insight; SDG 4 activity cards omit it. */
  keyInsight?: string;
  whatWeDid?: string;
  /** SDG 4 activity cards label this field "Our Response". */
  whatWeDidLabel?: string;
  whatChanged: string;
  whatChangedLabel?: string;
  /** Some source cards intentionally omit a status line. */
  currentStatus?: string;
  sdgs: ReadonlyArray<number>;
  sdgsLabel?: string;
  /** Prose that sits in the main flow right before this card. */
  leadIn?: ReadonlyArray<string>;
  article?: StakeholderArticle;
  /* ----- SDG 4 education-activity metadata (optional; other chapters omit) -- */
  /** Event date line, e.g. "Jan. 24, 2026". */
  date?: string;
  /** Venue line, e.g. "Heilongjiang Hailun No.1 High School". */
  location?: string;
  /** Attendance line, e.g. "130 Students". */
  participants?: string;
  /** The manuscript "For" audience line. */
  audience?: string;
  /** "Teaching Resources" asset list, e.g. slides · cards · guides. */
  resourcesNote?: string;
  /** Second teaching-resource line ("For teachers and other teams …"). */
  resourcesHint?: string;
  /** Teaching-resource downloads (explicit manuscript URLs). */
  resourcePdfs?: ReadonlyArray<LegacyToolPdf>;
}

/** A reusable educational resource showcased inside an SDG 4 S section. */
export interface EducationResource {
  id: string;
  title: string;
  paragraphs: ReadonlyArray<string>;
  figure?: SustainabilityImageAssetKey;
  /** Side-by-side document links (e.g. the picture book CN/EN PDFs). */
  pdfs?: ReadonlyArray<LegacyToolPdf>;
  /** Manuscript sends readers to the Games route for this resource. */
  gamesLink?: boolean;
}

/** One audience group (Young Learners, Secondary School …) and its activities. */
export interface EducationActivityGroup {
  id: string;
  title: string;
  intro: ReadonlyArray<string>;
  activities: ReadonlyArray<StakeholderProfile>;
}

/** Chapter-specific continuation after the stakeholder cards (SDG 4 only). */
export interface EducationShowcase {
  /** Prose between the educator cards and the four resource showcases. */
  transition: ReadonlyArray<string>;
  resources: ReadonlyArray<EducationResource>;
  /** Prose introducing the audience-grouped activities; last sentence links. */
  activitiesLead: ReadonlyArray<string>;
  /** The trailing "click here to read the evidence" sentence, split for linking. */
  activitiesLeadLink?: {
    before: string;
    label: string;
    after: string;
    target: string;
  };
  groups: ReadonlyArray<EducationActivityGroup>;
  /** Final "Making Science Explorable and Resources Shareable" block. */
  closing: { title: string; paragraphs: ReadonlyArray<string> };
}

export interface ConsequenceDimension {
  id: "social" | "economic" | "environmental";
  title: string;
  intro?: string;
  benefit?: string;
  risk?: string;
  boundary?: string;
  /** Chapters whose source uses continuous prose keep that paragraph structure. */
  paragraphs?: ReadonlyArray<string>;
}

export interface AlignmentTable {
  headers: ReadonlyArray<string>;
  rows: ReadonlyArray<ReadonlyArray<string>>;
}

export interface LegacyToolPdf {
  label: string;
  fileName: string;
  /** Explicit manuscript URL, including when a PDF is reused by another tool. */
  url?: string;
}

export interface LegacyTool {
  title: string;
  why: string;
  whatItHelpsWith: string;
  bestFor: string;
  /** One-line summary shown in the Evidence tool table. */
  whatItDoes: string;
  pdfs: ReadonlyArray<LegacyToolPdf>;
  /** Existing page resources that are referenced without a downloadable file. */
  links?: ReadonlyArray<{ label: string; href: string }>;
}

export interface EvidenceItem {
  /** Bold manuscript lead, e.g. "Educational activity reach" (number from the list). */
  title?: string;
  text: string;
  figure?: SustainabilityImageAssetKey;
  /** Caption under `figure`; defaults to the asset's alt text. */
  figureCaption?: string;
  /** Follow the item with the chapter's Legacy tool table (Tool / What it does / Download). */
  toolTable?: true;
  table?: AlignmentTable;
}

export type ScaleStepKey =
  "stakeholder" | "consequences" | "alignment" | "legacy" | "evidence";

export interface SdgChapter {
  /** Anchor prefix; SCALE anchors are `${id}-${ScaleStepKey}`. */
  id: string;
  /** Anchor of the chapter heading itself, e.g. `sdg3-health`. */
  headingId: string;
  index: string;
  title: string;
  intro: ReadonlyArray<string>;
  stakeholders: {
    heading?: string;
    lead: ReadonlyArray<string>;
    profiles: ReadonlyArray<StakeholderProfile>;
    groups?: ReadonlyArray<{
      id: string;
      index?: string;
      title?: string;
      /** Present the complete manuscript in the reading flow, without a summary card. */
      layout?: "prose";
      intro: ReadonlyArray<string>;
      profiles: ReadonlyArray<StakeholderProfile>;
    }>;
    closing?: ReadonlyArray<string>;
    /** SDG 4 only: resource showcases and audience-grouped activities. */
    extras?: EducationShowcase;
  };
  consequences: {
    lead: ReadonlyArray<string>;
    shortTerm: { heading: string; paragraphs: ReadonlyArray<string> };
    /** Feature rendered right after the short-term paragraphs (SDG 4 microplate). */
    featureKey?: string;
    longTerm: { heading: string; intro: string };
    dimensions: ReadonlyArray<ConsequenceDimension>;
  };
  alignment: {
    leadHeading?: string;
    lead: ReadonlyArray<string>;
    /** Optional because some chapters present alignment as prose findings only. */
    table?: AlignmentTable;
    findings: ReadonlyArray<string>;
    /** Undefined preserves existing chapters; null keeps findings as plain prose. */
    findingsHeading?: string | null;
  };
  legacy: {
    intro: ReadonlyArray<string>;
    tools: ReadonlyArray<LegacyTool>;
    table?: AlignmentTable;
    closing?: ReadonlyArray<string>;
  };
  evidence: {
    intro: ReadonlyArray<string>;
    stats: ReadonlyArray<SustainabilityStat>;
    measurableIntro?: ReadonlyArray<string>;
    measurable: ReadonlyArray<EvidenceItem>;
    /** Closing prose after the numbered measurable items (SDG 4). */
    measurableClosing?: ReadonlyArray<string>;
    significant: ReadonlyArray<string>;
  };
}

/** SCALE letters with the full names shown by the rail and subheadings. */
export const scaleSteps: ReadonlyArray<{
  key: ScaleStepKey;
  letter: string;
  name: string;
}> = [
  { key: "stakeholder", letter: "S", name: "Stakeholder Insights" },
  { key: "consequences", letter: "C", name: "Consequences" },
  { key: "alignment", letter: "A", name: "Alignment" },
  { key: "legacy", letter: "L", name: "Legacy" },
  { key: "evidence", letter: "E", name: "Evidence" },
];

export const scaleAnchorId = (
  chapter: Pick<SdgChapter, "id">,
  key: ScaleStepKey,
) => `${chapter.id}-${key}`;

/** Chinese + English PDF pair hosted on iGEM docs. */
export const pdfPair = (slug: string) => [
  { label: "Chinese", fileName: `sustainability-${slug}-cn.pdf` },
  { label: "English", fileName: `sustainability-${slug}-en.pdf` },
];
