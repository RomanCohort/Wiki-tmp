import type { ReactNode } from "react";
import { JudgingCriteria } from "../shared/JudgingCriteria";
import { EpitopeStructuralValidationChart } from "../project/EpitopeStructuralValidationChart";
import { ModelVolcanoChart } from "../drylab/ModelVolcanoChart";
import { WikiFigurePlate } from "../../WikiFigurePlate";
import {
  getMeasurementImage,
  measurementAssets,
} from "../../../../data/wet-lab/measurementAssets";
import {
  measurementJudgingCriteria,
  measurementPage,
  measurementReferences,
} from "../../../../data/wet-lab/measurementPage";
import { renderInlineFormatting } from "../../proseInline";
import {
  buildAuthorYearCitationIndex,
  reportCitationIssues,
} from "../../../../data/citations/citationIndex";
import {
  CitationReferenceList,
  createCitationRenderer,
} from "../../citations/CitationRegister";
import "../../../../styles/features/measurement-panels.css";

const WET_LAB_CITATION_FLASH = {
  ramp: "rgba(20, 53, 76, 0.14)",
  ring: "0 0 0 3px rgba(20, 53, 76, 0.32)",
};

const citationIndex = buildAuthorYearCitationIndex(
  measurementPage.sections,
  measurementReferences,
);
reportCitationIssues("measurement", citationIndex);

export const renderMeasurementCitedText = createCitationRenderer(
  citationIndex,
  WET_LAB_CITATION_FLASH,
);

function MeasurementReferenceList() {
  return (
    <CitationReferenceList
      references={measurementReferences}
      index={citationIndex}
      tint={WET_LAB_CITATION_FLASH}
    />
  );
}

export function MeasurementJudgingCriteria() {
  return (
    <JudgingCriteria
      items={measurementJudgingCriteria}
      renderParagraph={(paragraph) =>
        renderMeasurementCitedText(paragraph, renderInlineFormatting)
      }
    />
  );
}

const plateGroups = [
  {
    featureKey: "measurement-plate-3",
    keys: [
      "human-dc-maturation-flow-and-quantification",
      "human-cd8-cd69-flow-and-quantification",
      "human-cd8-cd28-flow-and-quantification",
      "human-effector-memory-flow-and-quantification",
    ],
    caption: "Representative flow plots for the human immune response chain",
  },
  {
    featureKey: "measurement-plate-4",
    keys: [
      "splenic-dc-cd80-cd86-maturation",
      "splenic-cd8-t-cell-cd69-early-activation",
      "cd44-cd62l-central-memory-frequencies-within-splenic-cd8-t-cells",
      "ifn-frequencies-within-splenic-cd8-t-cells",
      "granzyme-b-frequencies-within-splenic-cd8-t-cells",
    ],
    caption: "Splenic immunophenotype across the immune response chain",
  },
].map((group) => ({
  ...group,
  keys: group.keys as (keyof typeof measurementAssets)[],
}));

export function measurementFeatures(): Record<string, ReactNode> {
  return {
    "measurement-judging-criteria": <MeasurementJudgingCriteria />,
    "measurement-references": <MeasurementReferenceList />,
    "measurement-structural-validation": <EpitopeStructuralValidationChart />,
    "measurement-proteomics-volcanoes": (
      <div className="measurement-model-volcanoes">
        <section>
          <h4>PXD024322 · TNBC vs healthy normal</h4>
          <ModelVolcanoChart cohort="024322" />
        </section>
        <section>
          <h4>PXD028102 · TNBC vs matched adjacent normal</h4>
          <ModelVolcanoChart cohort="028102" />
        </section>
      </div>
    ),
    ...Object.fromEntries(
      plateGroups.map((group) => [
        group.featureKey,
        <WikiFigurePlate
          className="measurement-plate"
          images={group.keys.map((key) => ({
            key,
            src: getMeasurementImage(key),
            alt: measurementAssets[key].alt,
            width: measurementAssets[key].width,
            height: measurementAssets[key].height,
          }))}
          caption={group.caption}
          columns={group.featureKey === "measurement-plate-3" ? 1 : 3}
          numbered
        />,
      ]),
    ),
  };
}
