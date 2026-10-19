import type { ReactNode } from "react";
import {
  experimentsPage,
  experimentsReferences,
} from "../../../../data/wet-lab/experimentsPage";
import {
  buildNumericCitationIndex,
  reportCitationIssues,
} from "../../../../data/citations/citationIndex";
import {
  CitationReferenceList,
  createCitationRenderer,
} from "../../citations/CitationRegister";
import { ExperimentProtocolAtlas } from "./ExperimentProtocolAtlas";
import "../../../../styles/features/experiments-panels.css";

const citationTint = {
  ramp: "rgba(20, 53, 76, 0.14)",
  ring: "0 0 0 3px rgba(20, 53, 76, 0.32)",
};
export const experimentsCitationIndex = buildNumericCitationIndex(
  experimentsPage.sections,
  experimentsReferences,
);
reportCitationIssues("experiments", experimentsCitationIndex);
const renderCitations = createCitationRenderer(
  experimentsCitationIndex,
  citationTint,
);

/** Source URLs are links; equations use the shared, source-driven math renderer. */
function renderExperimentFormatting(
  text: string,
  fallback: (text: string) => ReactNode,
): ReactNode {
  const tokens = text.split(/(https?:\/\/\S+)/g);
  return tokens.map((token, index) =>
    token.startsWith("http") ? (
      <a
        key={index}
        className="wiki-prose-link"
        href={token}
        target="_blank"
        rel="noreferrer"
      >
        {token}
      </a>
    ) : (
      <span key={index}>{fallback(token)}</span>
    ),
  );
}

export function renderExperimentText(
  text: string,
  fallback: (text: string) => ReactNode,
  sectionId?: string,
): ReactNode {
  return renderCitations(
    text,
    (segment) => renderExperimentFormatting(segment, fallback),
    sectionId,
  );
}

export function experimentsFeatures(): Record<string, ReactNode> {
  return {
    "exp-protocol-map": <ExperimentProtocolAtlas />,
    "exp-references": (
      <CitationReferenceList
        references={experimentsReferences}
        index={experimentsCitationIndex}
        tint={citationTint}
      />
    ),
  };
}
