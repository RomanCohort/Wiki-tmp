export type WikiCategory =
  | "project"
  | "wet-lab"
  | "dry-lab"
  | "engagement"
  | "team";

export type WikiVisual =
  | "living-ring"
  | "engineering-cycle"
  | "evidence-ledger"
  | "resource-library"
  | "experiment-gates"
  | "notebook-trace"
  | "measurement-field"
  | "platform-orbit"
  | "safety-boundary"
  | "model-manuscript"
  | "software-console"
  | "hardware-schematic"
  | "games-portal"
  | "venture-path"
  | "human-thread"
  | "education-dialogue"
  | "sustainability-radar";

export type WikiSectionLayout =
  | "editorial"
  | "steps"
  | "ledger"
  | "matrix"
  | "timeline";

export interface WikiFact {
  label: string;
  value: string;
}

export interface WikiJudgingCriterion {
  id: string;
  question: string;
  paragraphs: readonly string[];
  anchorIds?: readonly string[];
}

export interface WikiItem {
  label: string;
  navLabel?: string;
  title: string;
  body: string;
  evidence?: string[];
  decision?: string;
  status?: "recorded" | "planned" | "boundary" | "open";
}

export type WikiCalloutTone = "navy" | "coral" | "gold" | "neutral";

/** The four engineering-cycle stages, in loop order. */
export type WikiDbTLStageKey = "design" | "build" | "test" | "learn";

export interface WikiDbTLStage {
  key: WikiDbTLStageKey;
  /** Stage heading copy, e.g. "Design". */
  title: string;
  blocks: WikiContentBlock[];
}

export interface WikiReferenceEntry {
  label: string;
  text: string;
  href?: string;
  hrefLabel?: string;
}

/**
 * Ordered content block inside a section. When a section provides `blocks`,
 * the renderer emits the section header (index / title / summary) followed by
 * the blocks in order — this lets a page keep faithful paragraph / figure /
 * callout interleaving while still running through the shared renderer.
 */
export type WikiContentBlock =
  | { type: "prose"; paragraphs: string[]; id?: string }
  | { type: "quote"; text: string }
  | { type: "heading"; level: 4 | 5 | 6; title: string }
  | { type: "protocol-steps"; steps: Array<{ number: string; blocks: WikiContentBlock[] }> }
  | { type: "list"; items: string[]; ordered?: boolean; start?: number }
  | { type: "code"; language?: string; code: string; label?: string }
  | {
      type: "figure";
      src: string;
      alt: string;
      /** Intrinsic size; reserves the figure's space before the file arrives. */
      width?: number;
      height?: number;
      caption?: string;
      className?: string;
      /** Manuscript-provided figure label, including subfigure suffixes such as 4A. */
      figureLabel?: string;
      /** Keep the shared FIG counter visible when the manuscript has no caption. */
      showFigureNumber?: boolean;
    }
  | {
      type: "carousel";
      images: Array<{ src: string; alt?: string; width?: number; height?: number }>;
      caption?: string;
      figureLabel?: string;
    }
  | {
      type: "image-placeholder";
      filename: string;
      instruction: string;
      caption?: string;
    }
  | {
      type: "table";
      caption?: string;
      headers: string[];
      rows: string[][];
    }
  /**
   * A parts/registry table. Same `<table>` the `table` block emits — identical
   * skin, identical responsive scroller — but the first column renders `name`
   * as a link to `href` rather than as plain text, because a Registry accession
   * is a hyperlink. Cells still support the data layer's `**bold**`.
   */
  | {
      type: "parts-table";
      caption?: string;
      headers: string[];
      rows: Array<{
        name: string;
        href: string;
        cells: string[];
      }>;
    }
  | {
      type: "mini-visual";
      label?: string;
      title: string;
      items: string[];
      tone?: "navy" | "gold" | "care";
    }
  | {
      type: "callout";
      tone?: WikiCalloutTone;
      label?: string;
      body: string;
    }
  | {
      type: "subheading";
      id: string;
      index: string;
      kicker?: string;
      title: string;
      level?: 3 | 4;
      anchorIds?: string[];
    }
  | { type: "feature"; key: string }
  | { type: "chapter-link"; target: string; label: string; imageSrc?: string; imageAlt?: string }
  /**
   * A Design–Build–Test–Learn quartet. `id` is the anchor the concentric TIME
   * dial uses to resolve the active stage, and each stage carries
   * `data-dbtl-stage` so the dial's inner ring can track the reader's position
   * without observing every anchor on the page.
   */
  | { type: "dbtl"; id: string; stages: WikiDbTLStage[] }
  /** Numbered bibliography, reusing the Description page's hanging-indent skin. */
  | { type: "references"; items: WikiReferenceEntry[] }
  | {
      type: "prose-linked";
      parts: Array<{ text: string; target?: string; label?: string }>;
    }
  | { type: "note"; label: string; body: string }
  | {
      type: "epigraph";
      quote: string;
      translationZh: string;
      attribution: string;
      attributionRole: string;
    }
  | {
      /**
       * Prose-anchored two-column pair: narrative text on the left, one compact
       * figure / chart as an aside on the right. Keeps charts from becoming
       * full-width banners that interrupt the reading column. Collapses to a
       * single column below 880px.
       */
      type: "split";
      id: string;
      prose: WikiContentBlock[];
      aside: WikiContentBlock;
    };

export interface WikiMasthead {
  image?: string;
  imageAlt?: string;
  quote: string;
  attribution: string;
  attributionRole: string;
}

export interface WikiSection {
  id: string;
  index: string;
  kicker: string;
  /**
   * Manuscript skins hide the kicker slot because Wet Lab kickers restate the
   * title. A section whose kicker is metadata instead (e.g. the Protocol
   * Library's "Bench reference / 15 indexed files") opts back in here so the
   * string is rendered rather than silently dropped.
   */
  showKicker?: boolean;
  /**
   * Drops the section number from the heading. Used for blocks that are not
   * numbered chapters — e.g. the Games station map, which is a route diagram,
   * so the numbered record starts with the first playable project below it.
   * Honoured by the reader-route template (`WikiRoutePage`); the Wet Lab
   * manuscript template ignores it, and no Wet Lab section sets it.
   */
  hideSectionNumber?: boolean;
  /**
   * Drops the entire section heading header. Used for visual-first full-page
   * features (e.g. Roster) where an overarching section title is redundant.
   */
  hideHeading?: boolean;
  navLabel?: string;
  /**
   * Full-bleed photo masthead rendered above the section heading, with an
   * epigraph laid over the photo's faded lower edge. Reader-route only.
   */
  masthead?: WikiMasthead;
  title: string;
  summary: string;
  body?: string[];
  layout?: WikiSectionLayout;
  items?: WikiItem[];
  blocks?: WikiContentBlock[];
  anchorIds?: string[];
  note?: {
    label: string;
    body: string;
  };
}

export interface WikiLink {
  path: string;
  label: string;
}

export interface WikiPageContent {
  route: string;
  category: WikiCategory;
  chapter: string;
  eyebrow: string;
  title: string;
  lede: string;
  boundary: string;
  visual: WikiVisual;
  visualLabel: string;
  visualSteps: string[];
  facts: WikiFact[];
  sections: WikiSection[];
  links: WikiLink[];
  next: WikiLink & { title: string; description?: string };
  heroMinimal?: boolean;
}
