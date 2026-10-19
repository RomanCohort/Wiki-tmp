/**
 * Canonical citation model for the wiki.
 *
 * Provenance: extracted from the Description page's citation layer, which is the
 * house standard for in-text citation, the hover preview and the bibliography
 * register. Every page that cites sources uses these types, so a reference entry
 * is written once, in one shape, for the whole site.
 *
 * Pure types and builders — no React here; `components/wiki/citations/` owns the
 * presentation.
 */

/** One machine-readable identifier hanging off a reference (DOI, PMID, URL). */
export interface CitationIdentifier {
  href: string;
  label: string;
}

/**
 * A bibliography entry in the house format:
 * `Authors. Title. Journal. VolumeYear. Identifiers.`
 *
 * `authors` is `""` when the source names no author (a dataset, a tool, a
 * patent number standing in for one). `journal` carries the italicised slot,
 * which is also where a manual's own title goes when the source has no journal.
 */
export interface CitationReference {
  id: number;
  authors: string;
  title: string;
  journal: string;
  volumeYear: string;
  links?: readonly CitationIdentifier[];
}

export type CitationSegment =
  | { kind: "text"; text: string }
  | { kind: "cite"; text: string; refId: number; refIds?: readonly number[] };

export interface CitationOccurrence {
  occId: string;
  refId: number;
  ordinal: number;
  sectionId: string;
}

export interface CitationEntry {
  segments: CitationSegment[];
  occs: CitationOccurrence[];
}

export interface CitationIndex {
  byParagraph: Map<string, CitationEntry>;
  /** Resolve repeated passages in different chapters without duplicate anchor IDs. */
  byScopedParagraph?: Map<string, CitationEntry>;
  byRef: Map<number, CitationOccurrence[]>;
  issues: string[];
}

/** Landing-highlight colours, so each module's flash belongs to its palette. */
export interface CitationFlashTint {
  ramp: string;
  ring: string;
}
