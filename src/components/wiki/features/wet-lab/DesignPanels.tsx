/* eslint-disable react-refresh/only-export-components */
import type { ReactNode } from "react";
import {
  designAssets,
  getDesignDocument,
} from "../../../../data/wet-lab/designAssets";
import {
  designPage,
  designReferences,
} from "../../../../data/wet-lab/designPage";
import {
  buildAuthorYearCitationIndex,
  reportCitationIssues,
} from "../../../../data/citations/citationIndex";
import {
  CitationReferenceList,
  createCitationRenderer,
  type CitationFlashTint,
} from "../../citations/CitationRegister";
import { DocumentViewer } from "../../documents/DocumentViewer";
import { DesignConstructViewer } from "./DesignConstructViewer";
import "../../../../styles/features/design-panels.css";

/**
 * Design page feature slots.
 *
 * Three page-owned interactions, each mounted from a `{ type: "feature" }`
 * block in `designPage.ts`:
 *
 * - `construct-architecture-viewer` — Figure 6 (section 5).
 * - `design-eda-report` — Figure 9, the NC3Rs Experimental Design Report,
 *   embedded through the browser's own PDF viewer (section 7.4).
 * - `design-references` — the bibliography, on the shared citation register.
 */

/** Deep sea blue, the Wet Lab heading ink, for the landing flash. */
const WET_LAB_CITATION_FLASH: CitationFlashTint = {
  ramp: "rgba(20, 53, 76, 0.14)",
  ring: "0 0 0 3px rgba(20, 53, 76, 0.32)",
};

const designCitationIndex = buildAuthorYearCitationIndex(
  designPage.sections,
  designReferences,
);
reportCitationIssues("design", designCitationIndex);

/** Inline renderer handed to `WikiRoutePage` on the Design page. */
export const renderDesignCitedText = createCitationRenderer(
  designCitationIndex,
  WET_LAB_CITATION_FLASH,
);

/**
 * Figure 9: the pre-registered animal-study design report, as a PDF.
 *
 * Rendered through the shared document viewer (WIKI_ARCHITECTURE_SPEC.md §4.6),
 * so the report is collapsed until the reader asks for it: the PDF plugin is a
 * separate process surface and the page should not carry it by default.
 *
 * The card shows the manuscript's own caption and nothing besides — the
 * paragraph above already introduces the report in the team's words, and the
 * accessible name comes from the same caption.
 */
function DesignEdaReport() {
  const report = designAssets.edaReport;

  return (
    <DocumentViewer
      document={{
        caption: report.caption,
        url: getDesignDocument("edaReport"),
      }}
    />
  );
}

function DesignReferenceList() {
  return (
    <CitationReferenceList
      references={designReferences}
      index={designCitationIndex}
      tint={WET_LAB_CITATION_FLASH}
    />
  );
}

export function designFeatures(): Record<string, ReactNode> {
  return {
    "construct-architecture-viewer": <DesignConstructViewer />,
    "design-eda-report": <DesignEdaReport />,
    "design-references": <DesignReferenceList />,
  };
}
