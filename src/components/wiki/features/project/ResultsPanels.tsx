/* eslint-disable react-refresh/only-export-components */
import { Fragment, type ReactNode } from "react";
import {
  CitationReferenceList,
  createCitationRenderer,
  PROJECT_CITATION_FLASH,
} from "../../citations/CitationRegister";
import {
  buildAuthorYearCitationIndex,
  reportCitationIssues,
} from "../../../../data/citations/citationIndex";
import { resultsFigureCaptions } from "../../../../data/project/resultsAssets";
import { resultsPage } from "../../../../data/project/resultsPage";
import {
  resultsCitationReferences,
  resultsReferences,
} from "../../../../data/project/resultsReferences";
import { ModelVolcanoChart } from "../drylab/ModelVolcanoChart";
import { DoseScanChart } from "./DoseScanChart";
import { EpitopeStructuralValidationChart } from "./EpitopeStructuralValidationChart";
import type { InlineRenderer } from "../../WikiRoutePage";
import "../../../../styles/features/results-panels.css";

export { EpitopeStructuralValidationChart };
export { DoseScanChart };

const resultsCitationIndex = buildAuthorYearCitationIndex(
  resultsPage.sections,
  resultsCitationReferences,
);
// Formulae and experimental parentheses are not bibliography errors.
reportCitationIssues("results", {
  ...resultsCitationIndex,
  issues: resultsCitationIndex.issues.filter(
    (issue) =>
      /^(?:unresolved|ambiguous):/.test(issue) &&
      /(?:et al\.,?|[A-Z][a-z-]+,?)\s+(?:19|20)\d{2}/.test(issue),
  ),
});
const citedRenderer = createCitationRenderer(
  resultsCitationIndex,
  PROJECT_CITATION_FLASH,
);

// Scientific significance stars are literal tokens, never Markdown delimiters.
// Exact double-star runs carry bold; recursive formatting preserves *td* inside it.
const INLINE_TOKEN_RE =
  /\*{3,}|`[^`]+`|(?<!\*)\*\*(?!\*)(?:[^*]|\*(?!\*))+?\*\*(?!\*)|(?<![\w*])\*(?![\s*])[^*\n]+?(?<![\s*])\*(?![\w*])/g;

function formatResultsText(
  text: string,
  fallback: (chunk: string) => ReactNode,
): ReactNode {
  const matches = [...text.matchAll(INLINE_TOKEN_RE)];
  if (!matches.length) return fallback(text);
  const nodes: ReactNode[] = [];
  let last = 0;
  for (const match of matches) {
    const position = match.index!;
    if (position > last) {
      nodes.push(
        <Fragment key={`t-${last}`}>
          {fallback(text.slice(last, position))}
        </Fragment>,
      );
    }
    const token = match[0];
    if (/^\*{3,}$/.test(token)) {
      nodes.push(<Fragment key={`s-${position}`}>{token}</Fragment>);
    } else if (token.startsWith("**")) {
      nodes.push(
        <strong key={`b-${position}`}>
          {formatResultsText(token.slice(2, -2), fallback)}
        </strong>,
      );
    } else if (token.startsWith("`")) {
      nodes.push(<code key={`c-${position}`}>{token.slice(1, -1)}</code>);
    } else {
      nodes.push(<em key={`i-${position}`}>{token.slice(1, -1)}</em>);
    }
    last = position + token.length;
  }
  if (last < text.length) {
    nodes.push(
      <Fragment key={`t-${last}`}>{fallback(text.slice(last))}</Fragment>,
    );
  }
  return nodes;
}

export const renderResultsText: InlineRenderer = (text, fallback, sectionId) =>
  citedRenderer(text, (chunk) => formatResultsText(chunk, fallback), sectionId);

function ResultsVolcano({ cohort }: { cohort: "024322" | "028102" }) {
  return (
    <figure className="wiki-figure results-volcano">
      <ModelVolcanoChart cohort={cohort} />
      <figcaption>
        {resultsFigureCaptions[cohort === "024322" ? "fig01" : "fig03"]}
      </figcaption>
    </figure>
  );
}

export function resultsFeatures(): Record<string, ReactNode> {
  return {
    "results-volcano-024322": <ResultsVolcano cohort="024322" />,
    "results-volcano-028102": <ResultsVolcano cohort="028102" />,
    "results-plate-structural": (
      <EpitopeStructuralValidationChart
        captions={[resultsFigureCaptions.fig11, resultsFigureCaptions.fig12]}
        badges={["FIG. 10", "FIG. 11"]}
        heatmapFigureTitle="Figure 10."
      />
    ),
    "results-dose-scan": (
      <DoseScanChart caption={resultsFigureCaptions.fig30} />
    ),
    "results-references": (
      <CitationReferenceList
        references={resultsReferences}
        index={resultsCitationIndex}
        tint={PROJECT_CITATION_FLASH}
      />
    ),
  };
}
