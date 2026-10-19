/* eslint-disable react-refresh/only-export-components */
import type { ReactNode } from "react";
import { JudgingCriteria } from "../shared/JudgingCriteria";
import {
  alternativePlatformJudgingCriteria,
  alternativePlatformPage,
  alternativePlatformReferences,
} from "../../../../data/wet-lab/alternativePlatformPage";
import { renderInlineFormatting } from "../../proseInline";
import {
  buildAuthorYearCitationIndex,
  reportCitationIssues,
} from "../../../../data/citations/citationIndex";
import {
  CitationReferenceList,
  createCitationRenderer,
} from "../../citations/CitationRegister";
import { InteractiveHtmlEmbed } from "../../embeds/InteractiveHtmlEmbed";
import { getAlternativePlatformEmbed } from "../../../../data/wet-lab/alternativePlatformAssets";
import { KeyAchievements } from "./key-achievements";
import "../../../../styles/features/alternative-platform-panels.css";

const WET_LAB_CITATION_FLASH = {
  ramp: "rgba(20, 53, 76, 0.14)",
  ring: "0 0 0 3px rgba(20, 53, 76, 0.32)",
};

const citationIndex = buildAuthorYearCitationIndex(
  alternativePlatformPage.sections,
  alternativePlatformReferences,
);
reportCitationIssues("alternative-platform", citationIndex);

export const renderAlternativePlatformCitedText = createCitationRenderer(
  citationIndex,
  WET_LAB_CITATION_FLASH,
);

function AlternativePlatformReferenceList() {
  return (
    <CitationReferenceList
      references={alternativePlatformReferences}
      index={citationIndex}
      tint={WET_LAB_CITATION_FLASH}
    />
  );
}

/**
 * Judging-criteria Q&A record, same card format as the Measurement page's
 * highlights record: one question per card, a single card open at a time.
 */
function AlternativePlatformJudgingCriteria() {
  return (
    <JudgingCriteria
      items={alternativePlatformJudgingCriteria}
      renderParagraph={(paragraph) =>
        renderAlternativePlatformCitedText(paragraph, renderInlineFormatting)
      }
    />
  );
}

/**
 * Sanger sequence across the back-splice junction (BSJ) of the Combined vaccine.
 * Styled in CirCure's Chinese ink-wash watercolor aesthetic (水墨淡彩风),
 * centered and proportioned to pair directly with the chromatogram peaks in FIG. 06 below.
 */
function BsjSequenceBanner() {
  return (
    <div
      className="bsj-plate"
      data-wiki-reveal
      role="region"
      aria-label="Sanger sequenced back-splice junction sequence"
    >
      <div className="bsj-plate__halo" aria-hidden="true" />
      <div className="bsj-plate__segment bsj-plate__segment--3prime">
        <code className="bsj-plate__seq">CTCAGTAGATGTTTTCTTGGGT</code>
      </div>
      <div className="bsj-plate__divider" aria-hidden="true">
        <span className="bsj-plate__divider-stem" />
        <span className="bsj-plate__divider-mark">|</span>
        <span className="bsj-plate__divider-stem" />
      </div>
      <div className="bsj-plate__segment bsj-plate__segment--5prime">
        <code className="bsj-plate__seq">CTACCGTTTAATATTGCGTCATAT</code>
      </div>
    </div>
  );
}

export function alternativePlatformFeatures(): Record<string, ReactNode> {
  return {
    "alternative-platform-achievement-navigation": <KeyAchievements />,
    "alternative-platform-bsj-sequence": <BsjSequenceBanner />,
    "alternative-platform-backbone": (
      <div className="platform-backbone">
        <InteractiveHtmlEmbed
          src={getAlternativePlatformEmbed("backbone")}
          title="CirCure interactive plasmid map"
        />
      </div>
    ),
    "alternative-platform-reuse-studio": (
      <InteractiveHtmlEmbed
        src={getAlternativePlatformEmbed("reuseStudio")}
        title="CirCure backbone reuse studio"
      />
    ),
    "alternative-platform-judging-criteria": (
      <AlternativePlatformJudgingCriteria />
    ),
    "alternative-platform-references": <AlternativePlatformReferenceList />,
  };
}
