/* eslint-disable react-refresh/only-export-components */
import type { ReactNode } from "react";
import {
  hardwarePage,
  hardwareReferences,
} from "../../../../data/drylab/hardwarePage";
import {
  buildNumericCitationIndex,
  reportCitationIssues,
} from "../../../../data/citations/citationIndex";
import {
  CitationReferenceList,
  createCitationRenderer,
  type CitationFlashTint,
} from "../../citations/CitationRegister";
import "../../../../styles/features/hardware-panels.css";

/**
 * Hardware page feature slots.
 *
 * One page-owned slot, mounted from the `{ type: "feature" }` block closing
 * section 7 in `hardwarePage.ts`:
 *
 * - `hardware-references` — the bibliography, on the shared citation register,
 *   carrying the page's own nine sources and the Dry Lab flash tint.
 */

/** Dry Lab heading ink: pine black-green. */
const DRY_LAB_CITATION_FLASH: CitationFlashTint = {
  ramp: "rgba(21, 62, 52, 0.14)",
  ring: "0 0 0 3px rgba(21, 62, 52, 0.32)",
};

const hardwareCitationIndex = buildNumericCitationIndex(
  hardwarePage.sections,
  hardwareReferences,
);
reportCitationIssues("hardware", hardwareCitationIndex);

/** Inline renderer handed to `WikiRoutePage` on the Hardware page. */
export const renderHardwareCitedText = createCitationRenderer(
  hardwareCitationIndex,
  DRY_LAB_CITATION_FLASH,
);

function HardwareReferenceList() {
  return (
    <CitationReferenceList
      references={hardwareReferences}
      index={hardwareCitationIndex}
      tint={DRY_LAB_CITATION_FLASH}
    />
  );
}

export function hardwareFeatures(): Record<string, ReactNode> {
  return { "hardware-references": <HardwareReferenceList /> };
}
