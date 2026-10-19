/* eslint-disable react-refresh/only-export-components */
import { useId, useState, type CSSProperties, type ReactNode } from "react";
import {
  businessModelCanvas,
  entrepreneurshipConcerns,
  entrepreneurshipDocuments,
  entrepreneurshipHighlights,
  entrepreneurshipImpacts,
  entrepreneurshipPage,
  entrepreneurshipThankYouNote,
  type EntrepreneurshipDocumentKey,
  type EntrepreneurshipOrbitTopic,
} from "../../../../data/engagement/entrepreneurshipPage";
import { entrepreneurshipReferences } from "../../../../data/engagement/entrepreneurshipReferences";
import {
  buildNumericCitationIndex,
  reportCitationIssues,
} from "../../../../data/citations/citationIndex";
import {
  CitationReferenceList,
  createCitationRenderer,
  type CitationFlashTint,
} from "../../citations/CitationRegister";
import {
  linkify,
  renderInlineFormatting as renderEmphasis,
} from "../../proseInline";
import { DocumentViewer } from "../../documents/DocumentViewer";
import { CirCureGoldenCircle } from "./CirCureGoldenCircle";
import { StakeholderMatrix3D } from "./StakeholderMatrix3D";
import {
  EntrepreneurshipDetail,
  useEntrepreneurshipDetail,
} from "./EntrepreneurshipDetail";
import { WatercolorCircle } from "./EntrepreneurshipWatercolor";
import { MilestoneTimeline } from "./MilestoneTimeline";
import "../../../../styles/features/entrepreneurship-panels.css";

const concernPositions = [
  [320, 147],
  [478, 264],
  [418, 449],
  [222, 449],
  [162, 264],
];
const impactPositions = [
  [208, 198],
  [432, 198],
  [208, 422],
  [432, 422],
];
const concernRingTones = ["peach", "sage", "sky", "lavender", "rose"];

function CircRnaRing({ impacts }: { impacts: boolean }) {
  const radius = impacts ? 107 : 83;
  return (
    <g className="circure-orbit__rna">
      <circle
        className="circure-orbit__backbone"
        cx="320"
        cy="310"
        r={radius}
      />
      {Array.from({ length: 40 }, (_, index) => {
        const angle = (index / 40) * Math.PI * 2 - Math.PI / 2;
        const tone = impacts
          ? index === 5
            ? "lime"
            : index === 15
              ? "mauve"
              : index === 25
                ? "slate"
                : index === 35
                  ? "yellow"
                  : index % 4 === 0
                    ? "lavender"
                    : "sky"
          : concernRingTones[index % concernRingTones.length];
        const point = (r: number) => ({
          x: 320 + Math.cos(angle) * r,
          y: 310 + Math.sin(angle) * r,
        });
        const bead = point(radius);
        const outerBase = point(radius - 10);
        const innerBase = point(radius - 21);
        return (
          <g key={index} data-orbit-tone={tone}>
            <line
              className="circure-orbit__base"
              x1={outerBase.x}
              y1={outerBase.y}
              x2={innerBase.x}
              y2={innerBase.y}
            />
            <circle
              className="circure-orbit__bead"
              cx={bead.x}
              cy={bead.y}
              r={impacts ? 6 : 4.7}
            />
          </g>
        );
      })}
      <text className="circure-orbit__brand" x="320" y="305">
        CirCure
      </text>
      <text className="circure-orbit__subtitle" x="320" y="337">
        circRNA
      </text>
    </g>
  );
}

function CircureOrbitPanel({
  topics,
  impacts = false,
}: {
  topics: EntrepreneurshipOrbitTopic[];
  impacts?: boolean;
}) {
  const id = useId();
  const detail = useEntrepreneurshipDetail();
  const { activeIndex } = detail;
  const active = activeIndex === null ? null : topics[activeIndex];
  const positions = impacts ? impactPositions : concernPositions;
  const title = impacts
    ? "Positive Long-Term Impacts"
    : "Potential Problems and Solutions";
  const detailAbove =
    activeIndex !== null &&
    (impacts ? activeIndex >= 2 : activeIndex === 2 || activeIndex === 3);

  return (
    <div
      className={`circure-orbit circure-orbit--${impacts ? "impacts" : "concerns"}`}
      role="group"
      aria-label={title}
      {...detail.containerProps}
    >
      <svg
        className="circure-orbit__drawing"
        viewBox="0 0 640 570"
        aria-hidden="true"
      >
        <defs>
          <path id={`${id}-title-arc`} d="M 55,166 Q 320,-30 585,166" />
        </defs>
        {impacts ? (
          <text className="circure-orbit__title circure-orbit__title--arched">
            <textPath
              href={`#${id}-title-arc`}
              startOffset="50%"
              textAnchor="middle"
            >
              {title}
            </textPath>
          </text>
        ) : (
          <text
            className="circure-orbit__title"
            x="320"
            y="45"
            textAnchor="middle"
          >
            {title}
          </text>
        )}
        <CircRnaRing impacts={impacts} />
        {topics.map((topic, index) => {
          const [x, y] = positions[index];
          const radius = impacts ? 32 : 64;
          return (
            <WatercolorCircle
              key={topic.id}
              cx={x}
              cy={y}
              radius={radius}
              tone={topic.tone}
              seed={8 + index * 7}
              active={activeIndex === index}
            />
          );
        })}
      </svg>

      {topics.map((topic, index) => (
        <button
          key={topic.id}
          type="button"
          className={`circure-orbit__node circure-orbit__node--${topic.id}`}
          data-orbit-tone={topic.tone}
          aria-label={
            topic.group ? `${topic.group}: ${topic.title}` : topic.title
          }
          {...detail.triggerProps(index)}
        >
          {topic.label.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </button>
      ))}

      {impacts ? (
        <div className="circure-orbit__legend">
          <span>
            <i data-orbit-tone="yellow" />
            <i data-orbit-tone="lime" />
            Direct impacts
          </span>
          <span>
            <i data-orbit-tone="slate" />
            <i data-orbit-tone="mauve" />
            Indirect impacts
          </span>
        </div>
      ) : null}

      {active ? (
        <EntrepreneurshipDetail
          id={detail.detailId}
          title={active.title}
          tone={active.tone}
          group={active.group}
          above={detailAbove}
          onClose={detail.closeDetail}
        >
          <p>{active.body}</p>
        </EntrepreneurshipDetail>
      ) : null}
    </div>
  );
}

export function PotentialProblemsAndSolutions() {
  return <CircureOrbitPanel topics={entrepreneurshipConcerns} />;
}

export function PositiveLongTermImpacts() {
  return <CircureOrbitPanel topics={entrepreneurshipImpacts} impacts />;
}

export { CirCureGoldenCircle } from "./CirCureGoldenCircle";
export { StakeholderMatrix3D } from "./StakeholderMatrix3D";

/** Warm peacock-teal landing flash belonging to the Engagement palette. */
const ENTREPRENEURSHIP_CITATION_FLASH: CitationFlashTint = {
  ramp: "rgba(23, 74, 71, 0.16)",
  ring: "0 0 0 3px rgba(23, 74, 71, 0.38)",
};

const entrepreneurshipCitationIndex = buildNumericCitationIndex(
  entrepreneurshipPage.sections,
  entrepreneurshipReferences,
);
reportCitationIssues("entrepreneurship", entrepreneurshipCitationIndex);

const renderNumberedCitation = createCitationRenderer(
  entrepreneurshipCitationIndex,
  ENTREPRENEURSHIP_CITATION_FLASH,
);

/** Shared numeric citations, previews and bibliography backlinks. */
export const renderEntrepreneurshipInline = renderNumberedCitation;

/**
 * Business Model Canvas: the canvas figure stays visible, while the nine
 * written elaborations beneath it collapse into a single disclosure — one
 * click expands the whole block, as the manuscript asks.
 */
export function BusinessModelCanvas() {
  const [open, setOpen] = useState(false);
  const regionId = useId();
  return (
    <div className="business-model-canvas" data-wiki-reveal>
      <figure className="business-model-canvas__figure">
        <img
          src={businessModelCanvas.image}
          width={businessModelCanvas.imageWidth}
          height={businessModelCanvas.imageHeight}
          alt={businessModelCanvas.imageAlt}
          loading="lazy"
        />
      </figure>
      <button
        type="button"
        className="business-model-canvas__toggle"
        aria-expanded={open}
        aria-controls={regionId}
        onClick={() => setOpen((value) => !value)}
      >
        <span>{businessModelCanvas.prompt}</span>
        <svg viewBox="0 0 16 16" aria-hidden="true">
          <path d="m4 6 4 4 4-4" />
        </svg>
      </button>
      <div
        id={regionId}
        className={`business-model-canvas__body${open ? " is-open" : ""}`}
        hidden={!open}
      >
        {businessModelCanvas.sections.map((section) => (
          <section
            key={section.id}
            id={section.id}
            className="business-model-canvas__section"
          >
            <h4>{section.title}</h4>
            {section.paragraphs.map((paragraph, index) => (
              <p key={index}>{renderEmphasis(paragraph)}</p>
            ))}
          </section>
        ))}
      </div>
    </div>
  );
}

/** The team's thank-you letter, laid over the signed massage paper. */
export function ThankYouNote() {
  return (
    <div
      className="thank-you-note"
      data-wiki-reveal
      style={
        {
          "--thanks-bg": `url(${entrepreneurshipThankYouNote.background})`,
        } as CSSProperties
      }
    >
      <div className="thank-you-note__paper">
        <h3>{entrepreneurshipThankYouNote.title}</h3>
        {entrepreneurshipThankYouNote.paragraphs.map((paragraph, index) => (
          <p key={index}>{renderEmphasis(paragraph)}</p>
        ))}
        <p className="thank-you-note__sign-off">
          {entrepreneurshipThankYouNote.signOff.map((line, index) => (
            <span key={index}>{renderEmphasis(line)}</span>
          ))}
        </p>
      </div>
    </div>
  );
}

/**
 * Our Highlights, in judging format: the record shows one question per row and
 * keeps the team's answer folded until the reader asks for it — one row open
 * at a time, like a judgeship Q&A sheet.
 */
export function OurHighlights() {
  const [openId, setOpenId] = useState<string | null>(null);
  return (
    <div className="highlights-record" data-wiki-reveal>
      {entrepreneurshipHighlights.map((item) => {
        const open = openId === item.id;
        return (
          <article
            key={item.id}
            className={`highlights-record__item${open ? " is-open" : ""}`}
          >
            <button
              type="button"
              id={`${item.id}-toggle`}
              className="highlights-record__toggle"
              aria-expanded={open}
              aria-controls={`${item.id}-answer`}
              onClick={() => setOpenId(open ? null : item.id)}
            >
              <span className="highlights-record__question">
                {item.question}
              </span>
              <svg viewBox="0 0 16 16" aria-hidden="true">
                <path d="m4 6 4 4 4-4" />
              </svg>
            </button>
            <div
              id={`${item.id}-answer`}
              role="region"
              aria-labelledby={`${item.id}-toggle`}
              className="highlights-record__answer"
              hidden={!open}
            >
              {item.paragraphs.map((paragraph, paragraphIndex) => (
                <p key={paragraphIndex}>
                  {renderEntrepreneurshipInline(paragraph, linkify)}
                </p>
              ))}
            </div>
          </article>
        );
      })}
    </div>
  );
}

/** One manuscript document housed in the wiki's shared collapsible PDF card. */
function EntrepreneurshipDocumentCard({
  docKey,
}: {
  docKey: EntrepreneurshipDocumentKey;
}) {
  const document = entrepreneurshipDocuments[docKey];
  return (
    <div data-wiki-reveal>
      <DocumentViewer
        document={{
          caption: document.caption,
          url: document.url,
          downloadUrl: document.url,
        }}
      />
    </div>
  );
}

/** The bibliography on the shared citation register (hover, flash, back-links). */
function EntrepreneurshipReferenceList() {
  return (
    <div data-wiki-reveal>
      <CitationReferenceList
        references={entrepreneurshipReferences}
        index={entrepreneurshipCitationIndex}
        tint={ENTREPRENEURSHIP_CITATION_FLASH}
      />
    </div>
  );
}

export function entrepreneurshipFeatures(): Record<string, ReactNode> {
  return {
    "our-highlights": <OurHighlights />,
    "potential-problems-and-solutions": <PotentialProblemsAndSolutions />,
    "positive-long-term-impacts": <PositiveLongTermImpacts />,
    "circure-golden-circle": <CirCureGoldenCircle />,
    "stakeholder-matrix-3d": <StakeholderMatrix3D />,
    "entrepreneurship-milestone": <MilestoneTimeline />,
    "business-model-canvas": <BusinessModelCanvas />,
    "thank-you-note": <ThankYouNote />,
    "entrepreneurship-references": <EntrepreneurshipReferenceList />,
    "doc-jika": <EntrepreneurshipDocumentCard docKey="jika" />,
    "doc-jienzhihe": <EntrepreneurshipDocumentCard docKey="jienzhihe" />,
    "doc-scalability": <EntrepreneurshipDocumentCard docKey="scalability" />,
    "doc-business-plan": <EntrepreneurshipDocumentCard docKey="businessPlan" />,
    "doc-legal-plan": <EntrepreneurshipDocumentCard docKey="legalPlan" />,
  };
}
