/* eslint-disable react-refresh/only-export-components */
import type { ReactNode } from "react";
import {
  contributionAssets,
  contributionDocUrl,
  contributionImage,
  type ContributionDocAssetKey,
  type ContributionImageAssetKey,
} from "../../../../data/project/contributionAssets";
import {
  contributionPage,
  contributionReferences,
} from "../../../../data/project/contributionPage";
import {
  buildAuthorYearCitationIndex,
  reportCitationIssues,
} from "../../../../data/citations/citationIndex";
import {
  CitationReferenceList,
  PROJECT_CITATION_FLASH,
  createCitationRenderer,
} from "../../citations/CitationRegister";
import { DocumentViewer } from "../../documents/DocumentViewer";
import "../../../../styles/features/contribution-panels.css";

/**
 * Contribution page feature slots.
 *
 * The page is overwhelmingly editorial — seven chapters of prose, three
 * diagrams, one 23-row Registry table, four embedded documents and thirty-five
 * activity photographs. Only two mechanisms are needed, and both are reused
 * rather than invented:
 *
 * 1. `ContributionFigureGallery` — a plain grid of the page's *own* figure
 *    blocks, used where the manuscript prints a single caption for a set of
 *    photographs ("Figure 7-10. Activity photos from SynbioClassroom."). Each
 *    photo is still a `.wiki-figure`, so the reader's existing `FIG. nn`
 *    counter numbers them continuously and in document order — no bespoke
 *    numbering, and no caption text is duplicated across the set.
 * 2. `DocumentViewer` — the wiki's shared PDF housing (WIKI_ARCHITECTURE_SPEC
 *    §4.6), collapsed until the reader asks for it.
 *
 * The bibliography runs on the shared citation register, so `(Sahin et al.
 * 2017)` in the running text becomes a hoverable, jump-and-flash citation
 * exactly as on the Description page.
 *
 * Deliberately absent: KPI strips, "framework" cards, progress rails and any
 * other summarising widget. The manuscript does not ask for one, and a page of
 * contributions is read for its evidence, not for a re-statement of it.
 */

/** The page's own prose already introduces every figure; the gallery only lays them out. */
function ContributionFigureGallery({
  keys,
  className,
}: {
  keys: readonly ContributionImageAssetKey[];
  className?: string;
}) {
  return (
    <div
      className={`contribution-gallery${className ? ` ${className}` : ""}`}
      data-count={keys.length}
      data-wiki-reveal
    >
      {keys.map((key) => {
        const asset = contributionAssets[key];
        return (
          <figure className="wiki-figure contribution-gallery__item" key={key}>
            <img
              src={contributionImage(key)}
              alt={asset.alt}
              loading="lazy"
              decoding="async"
            />
            <figcaption>{asset.alt}</figcaption>
          </figure>
        );
      })}
    </div>
  );
}

function ContributionDocument({
  assetKey,
}: {
  assetKey: ContributionDocAssetKey;
}) {
  const asset = contributionAssets[assetKey];
  return (
    <DocumentViewer
      document={{ caption: asset.alt, url: contributionDocUrl(assetKey) }}
    />
  );
}

const contributionCitationIndex = buildAuthorYearCitationIndex(
  contributionPage.sections,
  contributionReferences,
);
reportCitationIssues("contribution", contributionCitationIndex);

/** Inline renderer handed to `WikiRoutePage` on the Contribution page. */
export const renderContributionCitedText = createCitationRenderer(
  contributionCitationIndex,
  PROJECT_CITATION_FLASH,
);

function ContributionReferenceList() {
  return (
    <div data-wiki-reveal>
      <CitationReferenceList
        references={contributionReferences}
        index={contributionCitationIndex}
        tint={PROJECT_CITATION_FLASH}
      />
    </div>
  );
}

export function contributionFeatures(): Record<string, ReactNode> {
  return {
    /* The circularity fraction, typeset as a real equation instead of raw ASCII. */
    "contribution-equation-fcirc": (
      <div
        className="contribution-equation"
        role="math"
        aria-label="f circ equals 2 to the power of minus Cq div, over 2 to the power of minus Cq div plus 2 to the power of minus Cq conv"
      >
        <var>f</var>
        <sub>circ</sub>
        <span aria-hidden="true">=</span>
        <span className="contribution-equation__fraction" aria-hidden="true">
          <span>
            2<sup>−Cq<sub>div</sub></sup>
          </span>
          <span>
            2<sup>−Cq<sub>div</sub></sup> + 2<sup>−Cq<sub>conv</sub></sup>
          </span>
        </span>
      </div>
    ),
    /* Photograph sets whose captions the manuscript writes as one Figure range. */
    "contribution-gallery-virtual-lab": (
      <ContributionFigureGallery keys={["virtualLab1", "virtualLab2"]} />
    ),
    "contribution-gallery-synbio-classroom": (
      <ContributionFigureGallery
        className="contribution-gallery--compact-grid"
        keys={[
          "synbioClassroom1",
          "synbioClassroom2",
          "synbioClassroom3",
          "synbioClassroom4",
        ]}
      />
    ),
    "contribution-gallery-bio-strategy-arena": (
      <ContributionFigureGallery
        className="contribution-gallery--cards"
        keys={["bioStrategyArena1", "bioStrategyArena2"]}
      />
    ),
    "contribution-gallery-music-festival": (
      <ContributionFigureGallery
        className="contribution-gallery--compact-grid"
        keys={[
          "musicFestival1",
          "musicFestival2",
          "musicFestival3",
          "musicFestival4",
        ]}
      />
    ),
    "contribution-gallery-ethics-debate": (
      <ContributionFigureGallery keys={["ethicsDebate1", "ethicsDebate2"]} />
    ),
    "contribution-gallery-northeast-exchange": (
      <ContributionFigureGallery
        keys={[
          "northeastExchange1",
          "northeastExchange2",
          "northeastExchange3",
        ]}
      />
    ),
    "contribution-gallery-letters-across-igem": (
      <ContributionFigureGallery
        keys={[
          "lettersAcrossIgem1",
          "lettersAcrossIgem2",
          "lettersAcrossIgem3",
        ]}
      />
    ),
    "contribution-gallery-ccic": (
      <ContributionFigureGallery
        className="contribution-gallery--compact-grid"
        keys={["ccic1", "ccic2", "ccic3", "ccic4"]}
      />
    ),
    "contribution-gallery-apic": (
      <ContributionFigureGallery keys={["apic1", "apic2"]} />
    ),
    "contribution-gallery-regional-exchanges": (
      <ContributionFigureGallery
        className="contribution-gallery--compact-grid"
        keys={[
          "regionalNorthChina",
          "regionalEastChina",
          "regionalSouthChina",
          "regionalCentralChina",
        ]}
      />
    ),

    /* Documents, through the shared PDF housing. */
    "contribution-doc-animal-ethics": (
      <ContributionDocument assetKey="animalEthicsHandbook" />
    ),
    "contribution-doc-lab-safety": (
      <ContributionDocument assetKey="laboratorySafetyHandbook" />
    ),
    "contribution-doc-together-with-igem": (
      <ContributionDocument assetKey="togetherWithIgem" />
    ),
    "contribution-doc-new-team-handbook": (
      <ContributionDocument assetKey="newTeamHandbook" />
    ),

    "contribution-references": <ContributionReferenceList />,
  };
}
