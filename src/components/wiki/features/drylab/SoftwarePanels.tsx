import type { ReactNode } from "react";
import { DocumentViewer } from "../../documents/DocumentViewer";
import { WikiContentBlocks } from "../../WikiRoutePage";
import { ManuscriptFigureGallery } from "../shared/ManuscriptFigureGallery";
import { JudgingCriteria } from "../shared/JudgingCriteria";
import { linkify } from "../../proseInline";
import { TorusFoldViewer } from "./TorusFoldViewer";
import { EpitopeStructuralValidationChart } from "../project/EpitopeStructuralValidationChart";
import {
  getSoftwareResource,
  softwareFigures,
  softwareGuides,
  softwareUsageVideo,
  softwareVideo,
} from "../../../../data/drylab/softwareAssets";
import {
  softwarePage,
  softwareJudgingCriteria,
  softwarePanels,
  softwareReferences,
  type SoftwarePanel,
} from "../../../../data/drylab/softwarePage";
import {
  buildNumericCitationIndex,
  reportCitationIssues,
} from "../../../../data/citations/citationIndex";
import {
  CitationReferenceList,
  createCitationRenderer,
  type CitationFlashTint,
} from "../../citations/CitationRegister";
import "../../../../styles/features/software-panels.css";

/* eslint-disable react-refresh/only-export-components */

const DRY_LAB_CITATION_FLASH: CitationFlashTint = {
  ramp: "rgba(21, 62, 52, 0.14)",
  ring: "0 0 0 3px rgba(21, 62, 52, 0.32)",
};

const softwareCitationIndex = buildNumericCitationIndex(
  softwarePage.sections,
  softwareReferences,
);
reportCitationIssues("software", softwareCitationIndex);

const renderCitations = createCitationRenderer(
  softwareCitationIndex,
  DRY_LAB_CITATION_FLASH,
);

export function renderSoftwareCitedText(
  text: string,
  fallback: (text: string) => ReactNode,
  sectionId?: string,
) {
  // Keep the manuscript's link labels and resolve its relative attachments
  // here, so the common inline parser and the site's base path stay intact.
  return renderCitations(
    text,
    (value) =>
      fallback(
        value.replace(
          /\]\(((?:evidence|图片和附件)\/[^)\s]+)\)/g,
          (_, path: string) =>
            `](${new URL(getSoftwareResource(path), window.location.href).href})`,
        ),
      ),
    sectionId,
  );
}

function SoftwareGuide({
  guide,
}: {
  guide: (typeof softwareGuides)[keyof typeof softwareGuides];
}) {
  const url = guide.uploadUrl;

  return (
    <div className="software-guide-feature">
      <DocumentViewer
        document={{
          caption: guide.caption,
          url: `${url}#view=FitH`,
          description: guide.description,
          openUrl: url,
          downloadUrl: url,
          fallbackText: guide.fallback,
        }}
      />
    </div>
  );
}

function SoftwareReferenceList() {
  return (
    <CitationReferenceList
      references={softwareReferences}
      index={softwareCitationIndex}
      tint={DRY_LAB_CITATION_FLASH}
    />
  );
}

function SoftwareManuscriptPanel({ panel }: { panel: SoftwarePanel }) {
  if (panel.kind === "gallery") return <ManuscriptFigureGallery {...panel} />;
  return (
    <details className="software-implementation" id={panel.id}>
      <summary>{panel.title}</summary>
      <div className="software-implementation__body">
        <WikiContentBlocks blocks={panel.blocks} sectionId={panel.id} />
      </div>
    </details>
  );
}

function SoftwareRegistryVideo() {
  const url =
    softwareVideo.uploadUrl || getSoftwareResource(softwareVideo.fileName);
  return (
    <figure className="wiki-figure wiki-figure--labelled software-registry-video">
      <img
        src={url}
        alt={softwareVideo.alt}
        loading="lazy"
        decoding="async"
        width={2560}
        height={1438}
      />
      <p className="software-video-actions">
        <a href={url} target="_blank" rel="noreferrer">
          Open animation
        </a>{" "}
        ·{" "}
        <a href={url} download>
          Download animation
        </a>
      </p>
      <figcaption>
        <span className="wiki-figure__label">{softwareVideo.figureLabel}</span>
        <span className="wiki-figure__caption">{softwareVideo.caption}</span>
      </figcaption>
    </figure>
  );
}

export function softwareFeatures(): Record<string, ReactNode> {
  const features: Record<string, ReactNode> = {
    "software-judging-criteria": (
      <JudgingCriteria
        items={softwareJudgingCriteria}
        renderParagraph={(paragraph) =>
          renderSoftwareCitedText(paragraph, linkify, "software-judging")
        }
      />
    ),
    "software-circuforge-video": (
      <div className="software-usage-video">
        <iframe
          title={softwareUsageVideo.title}
          src={softwareUsageVideo.src}
          allow={softwareUsageVideo.allow}
          sandbox={softwareUsageVideo.sandbox}
          loading="lazy"
          allowFullScreen
        />
      </div>
    ),
    "software-circuforge-guide": (
      <SoftwareGuide guide={softwareGuides.circuforge} />
    ),
    "software-torusfold-guide": (
      <SoftwareGuide guide={softwareGuides.torusfold} />
    ),
    "software-torusfold-model": (
      <div id="software-torusfold-model">
        <TorusFoldViewer />
      </div>
    ),
    "software-registry-video": <SoftwareRegistryVideo />,
    "software-references": <SoftwareReferenceList />,
  };
  for (const [key, panel] of Object.entries(softwarePanels))
    features[key] = <SoftwareManuscriptPanel panel={panel} />;
  features["software-validation-structure-gallery"] = (
    <EpitopeStructuralValidationChart
      captions={[
        `${softwareFigures["figure-21-epitope-structural-review"].figureLabel}. ${softwareFigures["figure-21-epitope-structural-review"].caption}`,
        `${softwareFigures["figure-21b-epitope-position-burial"].figureLabel}. ${softwareFigures["figure-21b-epitope-position-burial"].caption}`,
      ]}
    />
  );
  return features;
}

import "../../../../styles/features/model-software-reader.css";
