import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type RefObject,
} from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  ENGINEERING_ITERATIONS,
  TIME_CYCLES,
  engineeringPage,
  type EngineeringIterationDatum,
} from "../../../../data/project/engineeringPage";
import { engineeringReferenceStages } from "../../../../data/project/engineeringRecordAdditions";
import type {
  WikiContentBlock,
  WikiDbTLStage,
  WikiDbTLStageKey,
  WikiSection,
} from "../../wikiPageTypes";
import { StakeholderPhotoReel } from "../engagement/sustainability/StakeholderPhotoReel";
import "../../../../styles/features/sustainability-panels.css";
import { engineeringOutcome } from "../../../../data/project/engineeringOutcome";
import { EngineeringOutline } from "./EngineeringPanels";
import { EngineeringSystemOverview } from "./EngineeringSystemOverview";
import { whenPageLoaderLeaves } from "../../../../utils/pageLoader";
const gearTSrc = "https://static.igem.wiki/teams/6056/wiki/files/pages/project/engineering/engineering-gear-t.webp";
const gearTActiveSrc = "https://static.igem.wiki/teams/6056/wiki/files/pages/project/engineering/engineering-gear-t-active.webp";
const gearISrc = "https://static.igem.wiki/teams/6056/wiki/files/pages/project/engineering/engineering-gear-i.webp";
const gearIActiveSrc = "https://static.igem.wiki/teams/6056/wiki/files/pages/project/engineering/engineering-gear-i-active.webp";
const gearMSrc = "https://static.igem.wiki/teams/6056/wiki/files/pages/project/engineering/engineering-gear-m.webp";
const gearMActiveSrc = "https://static.igem.wiki/teams/6056/wiki/files/pages/project/engineering/engineering-gear-m-active.webp";
const gearESrc = "https://static.igem.wiki/teams/6056/wiki/files/pages/project/engineering/engineering-gear-e.webp";
const gearEActiveSrc = "https://static.igem.wiki/teams/6056/wiki/files/pages/project/engineering/engineering-gear-e-active.webp";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface IterationRecord {
  iteration: EngineeringIterationDatum;
  stages: WikiDbTLStage[];
}
interface Selection {
  id: string;
  stage: WikiDbTLStageKey;
}
type Navigate = (
  iteration: EngineeringIterationDatum,
  stage?: WikiDbTLStageKey,
) => void;
type Register = (
  id: string,
  navigate: (stage: WikiDbTLStageKey) => void,
) => () => void;
const STAGE_KEYS: WikiDbTLStageKey[] = ["design", "build", "test", "learn"];

// Keep Cycle 1's published blocks intact, placing its bibliography at the
// stage recorded in the source brief. Cycle 2 already carries stage references.
function iterationRecords(section: WikiSection): IterationRecord[] {
  const records: IterationRecord[] = [];
  let current: IterationRecord | undefined;
  for (const block of section.blocks ?? []) {
    if (block.type === "subheading") {
      const iteration = ENGINEERING_ITERATIONS.find((it) => it.id === block.id);
      current = iteration ? { iteration, stages: [] } : undefined;
      if (current) records.push(current);
    } else if (block.type === "dbtl" && current) {
      current.stages = block.stages.map((stage) => {
        const nonRefBlocks = stage.blocks.filter((b) => b.type !== "references");
        const refBlocks = stage.blocks.filter((b) => b.type === "references");
        return {
          ...stage,
          blocks: [...nonRefBlocks, ...refBlocks],
        };
      });
    } else if (block.type === "references" && current) {
      const locations = engineeringReferenceStages[current.iteration.index];
      for (const stage of current.stages) {
        const items = block.items.filter(
          (entry) => entry.href && locations?.[entry.href] === stage.key,
        );
        if (items.length) stage.blocks.push({ type: "references", items });
      }
    }
  }
  for (const record of records) {
    for (const stage of record.stages) {
      const nonRef = stage.blocks.filter((b) => b.type !== "references");
      const refBlocks = stage.blocks.filter((b) => b.type === "references");
      stage.blocks = [...nonRef, ...refBlocks];
    }
  }
  return records;
}

const cycles = engineeringPage.sections
  .slice(1)
  .map((section) => ({ section, records: iterationRecords(section) }));

// Only ordinary article headings follow the shared marker/colon treatment.
// The dial scenes and Next page retain their distinct editorial typography.
function EngineeringArticleHeading({ title }: { title: string }) {
  const colon = title.search(/[:：]/);
  if (colon < 0) return <span className="wiki-heading-marker">{title}</span>;
  const lead = title.slice(0, colon + 1);
  const sub = title.slice(colon + 1).trim();
  return (
    <>
      <span className="wiki-heading-line wiki-heading-line--lead">
        <span className="wiki-heading-marker wiki-heading-marker--lead">
          {lead}
        </span>
      </span>
      {sub ? (
        <span className="wiki-heading-line wiki-heading-line--sub">
          <span className="wiki-heading-marker wiki-heading-marker--sub">
            {sub}
          </span>
        </span>
      ) : null}
    </>
  );
}

function InlineCopy({ text }: { text: string }) {
  return (
    <>
      {text
        .split(
          /(\*\*[^*]+?\*\*|(?<![\w*])\*[^*\n]+?\*(?![\w*])|\[[^\]\n]+\]\(https?:\/\/[^\s)]+\))/g,
        )
        .map((part, index) => {
          if (part.startsWith("**") && part.endsWith("**"))
            return <strong key={index}>{part.slice(2, -2)}</strong>;
          if (part.startsWith("*") && part.endsWith("*"))
            return <em key={index}>{part.slice(1, -1)}</em>;
          const link = part.match(/^\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)$/);
          return link ? (
            <a
              className="wiki-prose-link"
              key={index}
              href={link[2]}
              target="_blank"
              rel="noreferrer"
            >
              {link[1]}
            </a>
          ) : (
            part
          );
        })}
    </>
  );
}

function EngineeringBlock({ block }: { block: WikiContentBlock }) {
  switch (block.type) {
    case "prose":
      return (
        <div className="wiki-prose">
          {block.paragraphs.map((text, index) => (
            <p key={index}>
              <InlineCopy text={text} />
            </p>
          ))}
        </div>
      );
    case "callout":
      if (block.label === "How to read this page")
        return (
          <details
            className="eng-reading-tips"
            onToggle={() => ScrollTrigger.refresh()}
          >
            <summary>
              <span>{block.label}</span>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="m6 9 6 6 6-6" />
              </svg>
            </summary>
            <div className="eng-reading-tips__body">
              <h4 className="eng-reading-tips__subtitle">
                Navigation &amp; Stage Switching
              </h4>
              <p>
                <InlineCopy text={block.body} />
              </p>
              <div className="eng-reading-tips__stages" aria-hidden="true">
                <span className="eng-reading-tips__hint">Stage Controls:</span>
                {(["Design", "Build", "Test", "Learn"] as const).map((stage) => (
                  <span
                    key={stage}
                    className={`eng-reading-tips__pill eng-reading-tips__pill--${stage.toLowerCase()}`}
                  >
                    <span className="eng-reading-tips__arrow">‹</span>
                    {stage}
                    <span className="eng-reading-tips__arrow">›</span>
                  </span>
                ))}
              </div>
            </div>
          </details>
        );
      return (
        <aside className="wiki-callout" data-tone={block.tone}>
          {block.label ? <h3>{block.label}</h3> : null}
          <p>
            <InlineCopy text={block.body} />
          </p>
        </aside>
      );
    case "table":
      return (
        <div
          className="wiki-table-wrap"
          role="region"
          aria-label={block.caption ?? "Engineering comparison"}
          tabIndex={0}
        >
          <table className="wiki-table">
            {block.caption ? <caption>{block.caption}</caption> : null}
            <thead>
              <tr>
                {block.headers.map((header) => (
                  <th key={header} scope="col">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, index) => (
                <tr key={index}>
                  {row.map((cell, col) => (
                    <td key={col}>
                      <InlineCopy text={cell} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "image-placeholder":
      return (
        <figure className="wiki-figure wiki-figure--placeholder">
          <div
            className="wiki-image-placeholder"
            role="img"
            aria-label={`Reserved figure: ${block.filename}`}
          >
            <strong>{block.filename}</strong>
            <p>{block.instruction}</p>
          </div>
          {block.caption ? (
            <figcaption>
              <InlineCopy text={block.caption} />
            </figcaption>
          ) : null}
        </figure>
      );
    case "figure":
      return (
        <figure className="wiki-figure">
          <img
            src={block.src}
            alt={block.alt}
            width={block.width}
            height={block.height}
            loading="lazy"
            decoding="async"
          />
          {block.caption ? (
            <figcaption>
              <InlineCopy text={block.caption} />
            </figcaption>
          ) : null}
        </figure>
      );
    case "references":
      return (
        <aside className="eng-stage-references" aria-label="References">
          <ol>
            {block.items.map((entry, index) => (
              <li key={`${entry.href}-${index}`}>
                <span aria-hidden="true">[{index + 1}] </span>
                {entry.text}{" "}
                {entry.href ? (
                  <a href={entry.href} target="_blank" rel="noreferrer">
                    {entry.hrefLabel ?? "Source"}
                  </a>
                ) : null}
              </li>
            ))}
          </ol>
        </aside>
      );
    case "carousel":
      return (
        <StakeholderPhotoReel
          photos={block.images.map((img, i) => ({
            src: img.src,
            alt: img.alt ?? `${block.figureLabel ?? "Figure"} slide ${i + 1}`,
            caption: block.caption ?? "",
          }))}
          label={block.figureLabel ?? "Engineering slide reel"}
        />
      );
    case "code":
      return (
        <details
          className="eng-code-fold"
        >
          <summary className="eng-code-fold__summary">
            <span className="eng-code-fold__label">
              {block.label ?? "Code snippet"}
            </span>
            <span className="eng-code-fold__badge">{block.language ?? "R"}</span>
            <svg
              className="eng-code-fold__icon"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                d="m6 9 6 6 6-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </summary>
          <pre className="eng-code-fold__pre">
            <code>{block.code}</code>
          </pre>
        </details>
      );
    case "note":
      return (
        <aside className="eng-stage-note" aria-label={block.label}>
          {block.label ? (
            <strong className="eng-stage-note__label">{block.label}</strong>
          ) : null}
          <p className="eng-stage-note__body">
            <InlineCopy text={block.body} />
          </p>
        </aside>
      );
    default:
      return null;
  }
}

export function EngineeringIntroduction({ section }: { section: WikiSection }) {
  const firstIteration =
    section.blocks?.findIndex((block) => block.type === "subheading") ?? -1;
  const blocks =
    firstIteration < 0
      ? section.blocks
      : section.blocks?.slice(0, firstIteration);
  return (
    <section className="eng-introduction" id={section.id}>
      <header className="eng-introduction__heading">
        <h2>
          <EngineeringArticleHeading title={section.title} />
        </h2>
      </header>
      <div className="wiki-blocks">
        {blocks?.map((block, index) => {
          if (
            section.id === "engineering-overview" &&
            block.type === "figure" &&
            block.src === "interactive-system-overview"
          ) {
            return <EngineeringSystemOverview key={index} />;
          }
          return <EngineeringBlock block={block} key={index} />;
        })}
      </div>
    </section>
  );
}

function CycleScenes({
  section,
  records,
  selection,
  onChange,
  register,
  onNavigate,
}: {
  section: WikiSection;
  records: IterationRecord[];
  selection: Selection;
  onChange: (selection: Selection) => void;
  register: Register;
  onNavigate: Navigate;
}) {
  const root = useRef<HTMLDivElement>(null);
  const current =
    records.find((record) => record.iteration.id === selection.id) ??
    records[0];
  const activeStage =
    current.iteration.id === selection.id ? selection.stage : "design";

  useGSAP(
    () => {
      const element = root.current;
      if (!element) return;
      const media = gsap.matchMedia();
      media.add(
        {
          animated:
            "(min-width: 981px) and (prefers-reduced-motion: no-preference)",
          readable: "(max-width: 980px), (prefers-reduced-motion: reduce)",
        },
        (context) => {
          const slides = Array.from(
            element.querySelectorAll<HTMLElement>(".eng-scene"),
          );
          const stages = Array.from(
            element.querySelectorAll<HTMLElement>(".eng-stage"),
          );
          const cleanups: Array<() => void> = [];

          if (!context.conditions?.animated) {
            stages.forEach((stage) => {
              stage.inert = false;
              stage.removeAttribute("aria-hidden");
            });
            slides.forEach((slide) => {
              slide.inert = false;
              slide.removeAttribute("aria-hidden");
            });
            records.forEach((record) =>
              cleanups.push(
                register(record.iteration.id, (key) => {
                  const target = document.getElementById(
                    key === "design"
                      ? record.iteration.id
                      : `${record.iteration.id}-${key}`,
                  );
                  target?.scrollIntoView({
                    behavior: "instant",
                    block: "start",
                  });
                  onChange({ id: record.iteration.id, stage: key });
                }),
              ),
            );
            const observer = new IntersectionObserver(
              (entries) => {
                const visible = entries
                  .filter((entry) => entry.isIntersecting)
                  .sort(
                    (a, b) =>
                      a.boundingClientRect.top - b.boundingClientRect.top,
                  )[0];
                const target = visible?.target as HTMLElement | undefined;
                if (target?.dataset.iteration && target.dataset.dbtlStage)
                  onChange({
                    id: target.dataset.iteration,
                    stage: target.dataset.dbtlStage as WikiDbTLStageKey,
                  });
              },
              { rootMargin: "-15% 0px -60% 0px", threshold: 0 },
            );
            stages.forEach((stage) => observer.observe(stage));
            return () => {
              observer.disconnect();
              cleanups.forEach((cleanup) => cleanup());
            };
          }

          const track = element.querySelector<HTMLElement>(".eng-slides");
          const clip = element.querySelector<HTMLElement>(".eng-slides-clip");
          if (!track || !clip) return;
          const markers: Array<{
            time: number;
            selection: Selection;
            panel: HTMLElement;
            slide: HTMLElement;
          }> = [];
          gsap.set(stages, { autoAlpha: 0 });
          gsap.set(stages[0], { autoAlpha: 1 });
          const timeline = gsap.timeline({ paused: true });
          let cursor = 0;
          records.forEach((record, slideIndex) => {
            const panels = Array.from(
              slides[slideIndex].querySelectorAll<HTMLElement>(".eng-stage"),
            );
            record.stages.forEach((stage, stageIndex) => {
              const panel = panels[stageIndex];
              const content =
                panel.querySelector<HTMLElement>(".eng-stage-content");
              const viewport =
                panel.querySelector<HTMLElement>(".eng-stage-body");
              const label = `${record.iteration.id}-${stage.key}`;
              timeline.addLabel(label, cursor);
              markers.push({
                time: cursor,
                selection: { id: record.iteration.id, stage: stage.key },
                panel,
                slide: slides[slideIndex],
              });
              if (slideIndex > 0 || stageIndex > 0)
                timeline.to(panel, { autoAlpha: 1, duration: 0.18 }, cursor);

              // Keep the existing document-driven reading and transitions;
              // the fixed title sits above this narrower reading window.
              const overflow = () =>
                Math.max(
                  0,
                  (content?.scrollHeight ?? 0) - (viewport?.clientHeight ?? 0),
                );

              // 1. Initial top dwell so the reader can absorb the opening before scroll begins
              const topDwell = 0.32;
              const readingStart = cursor + topDwell;

              // 2. Reading scroll rate: increased density divisor (320px instead of 450px)
              // so vertical travel moves steadily without rushing
              const readingDuration = Math.max(1.5, 1.0 + overflow() / 320);

              if (content)
                timeline.fromTo(
                  content,
                  { y: 0 },
                  {
                    y: () => -overflow(),
                    duration: readingDuration,
                    ease: "none",
                    immediateRender: false,
                  },
                  readingStart,
                );

              // 3. Generous bottom dwell buffer:
              // Holds content at the bottom so the reader can comfortably finish reading
              // the conclusions and examining figures/captions without premature stage transition.
              const bottomDwell = overflow() > 0 ? 1.2 : 0.9;
              cursor = readingStart + readingDuration + bottomDwell;

              if (stageIndex < record.stages.length - 1) {
                timeline.to(panel, { autoAlpha: 0, duration: 0.18 }, cursor);
                cursor += 0.18;
              }
            });
            if (slideIndex < records.length - 1) {
              const nextFirst =
                slides[slideIndex + 1].querySelector<HTMLElement>(".eng-stage");
              if (nextFirst) timeline.set(nextFirst, { autoAlpha: 1 }, cursor);
              timeline.to(
                track,
                {
                  x: () => -(slideIndex + 1) * clip.clientWidth,
                  duration: 0.7,
                  ease: "power1.inOut",
                },
                cursor,
              );
              cursor += 0.7;
            }
          });
          timeline.to({}, { duration: 0.01 }, cursor);

          let lastMarker = -1;
          const updateSelection = (publish = false) => {
            const time = timeline.time();
            let index = 0;
            while (
              index + 1 < markers.length &&
              markers[index + 1].time <= time + 0.001
            )
              index++;
            const marker = markers[index];
            if (index !== lastMarker) {
              lastMarker = index;
              stages.forEach((panel) => {
                panel.inert = panel !== marker.panel;
                panel.setAttribute(
                  "aria-hidden",
                  String(panel !== marker.panel),
                );
              });
              slides.forEach((slide) => {
                slide.inert = slide !== marker.slide;
                slide.setAttribute(
                  "aria-hidden",
                  String(slide !== marker.slide),
                );
              });
            }
            if (publish) onChange(marker.selection);
          };
          timeline.eventCallback("onUpdate", () => updateSelection());
          const trigger = ScrollTrigger.create({
            trigger: element,
            animation: timeline,
            pin: true,
            scrub: window.matchMedia("(prefers-reduced-motion: reduce)").matches
              ? true
              : 0.6,
            start: () =>
              `top ${getComputedStyle(document.documentElement).getPropertyValue("--header-height").trim() || "78px"}`,
            end: () =>
              `+=${timeline.duration() * Math.max(440, clip.clientHeight * 0.8)}`,
            invalidateOnRefresh: true,
            anticipatePin: 1,
            onUpdate: (self) => updateSelection(self.isActive),
            onRefresh: (self) => updateSelection(self.isActive),
            onEnter: (self) => updateSelection(self.isActive),
            onEnterBack: (self) => updateSelection(self.isActive),
          });
          updateSelection(trigger.isActive);
          records.forEach((record) =>
            cleanups.push(
              register(record.iteration.id, (key) => {
                const time =
                  timeline.labels[`${record.iteration.id}-${key}`] ?? 0;
                // Land after the fade-in so the requested stage is immediately readable.
                const targetTime = time + 0.22;
                const position =
                  trigger.start +
                  (trigger.end - trigger.start) *
                    (targetTime / timeline.duration());
                window.scrollTo({ top: position, behavior: "instant" });
                timeline.time(targetTime);
                trigger.update();
              }),
            ),
          );
          return () => {
            cleanups.forEach((cleanup) => cleanup());
            stages.forEach((panel) => {
              panel.inert = false;
              panel.removeAttribute("aria-hidden");
            });
            slides.forEach((slide) => {
              slide.inert = false;
              slide.removeAttribute("aria-hidden");
            });
          };
        },
      );
      let alive = true;
      document.fonts.ready.then(() => {
        if (alive) ScrollTrigger.refresh();
      });
      return () => {
        alive = false;
        media.revert();
      };
    },
    {
      scope: root,
      dependencies: [records, register, onChange],
      revertOnUpdate: true,
    },
  );

  return (
    <div
      className="eng-cycle-scenes"
      ref={root}
      aria-label={`${section.navLabel} engineering iterations`}
    >
      <EngineeringOutline
        activeIteration={current.iteration}
        activeStage={activeStage}
        onNavigate={onNavigate}
      />
      <div className="eng-slides-clip">
        <div className="eng-slides">
          {records.map((record) => {
            const index = ENGINEERING_ITERATIONS.findIndex(
              (iteration) => iteration.id === record.iteration.id,
            );
            const previous = ENGINEERING_ITERATIONS[index - 1];
            const next = ENGINEERING_ITERATIONS[index + 1];
            return (
              <article
                className="eng-scene"
                id={record.iteration.id}
                key={record.iteration.id}
                aria-label={record.iteration.label}
              >
                <header className="eng-scene-heading">
                  <p className="eng-scene-cycle">
                    Cycle {record.iteration.cycle}
                    <span aria-hidden="true"> · </span>
                    {
                      TIME_CYCLES[record.iteration.cycle - 1].title.split(
                        ":",
                      )[0]
                    }
                  </p>
                  <div className="eng-scene-heading__row">
                    <button
                      className="eng-iteration-arrow"
                      type="button"
                      aria-label="Previous iteration"
                      disabled={!previous}
                      onClick={() => previous && onNavigate(previous)}
                    >
                      <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path d="m15 4-8 8 8 8" />
                      </svg>
                    </button>
                    <h3 tabIndex={-1} id={`${record.iteration.id}-title`}>
                      <span className="eng-iteration-index">
                        {record.iteration.index}
                      </span>
                      {record.iteration.short}
                    </h3>
                    <button
                      className="eng-iteration-arrow"
                      type="button"
                      aria-label="Next iteration"
                      disabled={!next}
                      onClick={() => next && onNavigate(next)}
                    >
                      <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path d="m9 4 8 8-8 8" />
                      </svg>
                    </button>
                  </div>
                </header>
                <div
                  className="eng-stage-stack"
                  id={`dbtl-${record.iteration.index.replace(".", "-")}`}
                >
                  {record.stages.map((stage, stageIndex) => {
                    const prevStage = record.stages[stageIndex - 1];
                    const nextStage = record.stages[stageIndex + 1];
                    return (
                      <section
                        className="eng-stage"
                        id={`${record.iteration.id}-${stage.key}`}
                        data-iteration={record.iteration.id}
                        data-dbtl-stage={stage.key}
                        key={stage.key}
                        aria-label={`${record.iteration.index} ${stage.title}`}
                      >
                        <div className="eng-stage-header">
                          <button
                            type="button"
                            className="eng-stage-arrow"
                            aria-label={
                              prevStage
                                ? `Previous stage: ${prevStage.title}`
                                : "No previous stage"
                            }
                            disabled={!prevStage}
                            onClick={() =>
                              prevStage &&
                              onNavigate(record.iteration, prevStage.key)
                            }
                          >
                            <svg viewBox="0 0 24 24" aria-hidden="true">
                              <path d="m15 18-6-6 6-6" />
                            </svg>
                          </button>
                          <h4 className="eng-stage-title">{stage.title}</h4>
                          <button
                            type="button"
                            className="eng-stage-arrow"
                            aria-label={
                              nextStage
                                ? `Next stage: ${nextStage.title}`
                                : "No next stage"
                            }
                            disabled={!nextStage}
                            onClick={() =>
                              nextStage &&
                              onNavigate(record.iteration, nextStage.key)
                            }
                          >
                            <svg viewBox="0 0 24 24" aria-hidden="true">
                              <path d="m9 6 6 6-6 6" />
                            </svg>
                          </button>
                        </div>
                        <div className="eng-stage-body">
                          <div className="eng-stage-content">
                            {stage.blocks.map((block, index) => (
                              <EngineeringBlock block={block} key={index} />
                            ))}
                          </div>
                        </div>
                      </section>
                    );
                  })}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}

const GEAR_ASSETS: Record<string, { normal: string; active: string }> = {
  t: { normal: gearTSrc, active: gearTActiveSrc },
  i: { normal: gearISrc, active: gearIActiveSrc },
  m: { normal: gearMSrc, active: gearMActiveSrc },
  e: { normal: gearESrc, active: gearEActiveSrc },
};

function SmallGear({
  letter,
  isActive,
  phase,
}: {
  letter: string;
  isActive: boolean;
  phase: number;
}) {
  const assets = GEAR_ASSETS[letter.toLowerCase()] ?? GEAR_ASSETS.t;
  const src = isActive ? assets.active : assets.normal;
  return (
    <img
      src={src}
      alt=""
      aria-hidden="true"
      className="eng-small-gear__img"
      style={{ "--gear-phase": `${phase}deg` } as CSSProperties}
    />
  );
}

function GearNavigation({
  selection,
  onNavigate,
}: {
  selection: Selection;
  onNavigate: Navigate;
}) {
  const root = useRef<HTMLElement>(null);
  const [pinnedCycle, setPinnedCycle] = useState<string | null>(null);
  const [hoveredCycle, setHoveredCycle] = useState<string | null>(null);
  const openCycle = hoveredCycle ?? pinnedCycle;
  useEffect(() => {
    const closeOutside = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) {
        setPinnedCycle(null);
        setHoveredCycle(null);
      }
    };
    document.addEventListener("pointerdown", closeOutside);
    return () => document.removeEventListener("pointerdown", closeOutside);
  }, []);
  return (
    <nav
      className="eng-gear-nav wiki-page--project"
      aria-label="Jump to an engineering iteration"
      ref={root}
      data-open={Boolean(openCycle)}
      onPointerLeave={() => setHoveredCycle(null)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setPinnedCycle(null);
          setHoveredCycle(null);
        }
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape" && openCycle) {
          event.preventDefault();
          root.current
            ?.querySelector<HTMLButtonElement>(`[data-cycle-id="${openCycle}"]`)
            ?.focus();
          setPinnedCycle(null);
          setHoveredCycle(null);
        }
      }}
    >
      <div className="eng-time-bar">
        {TIME_CYCLES.map((cycle, index) => (
          <button
            type="button"
            key={cycle.id}
            className="eng-time-letter"
            data-cycle-id={cycle.id}
            data-letter={cycle.letter.toLowerCase()}
            aria-label={`${cycle.letter} — Cycle ${index + 1}: ${cycle.title.split(":")[0]}${cycle.status === "planned" ? " (coming soon)" : ""}`}
            aria-expanded={openCycle === cycle.id}
            aria-controls={`eng-cycle-menu-${cycle.letter}`}
            aria-current={
              ENGINEERING_ITERATIONS.find((it) => it.id === selection.id)
                ?.cycleId === cycle.id
                ? "step"
                : undefined
            }
            onPointerEnter={(event) => {
              if (event.pointerType === "mouse") setHoveredCycle(cycle.id);
            }}
            onClick={() => {
              setHoveredCycle(null);
              setPinnedCycle((previous) =>
                previous === cycle.id ? null : cycle.id,
              );
            }}
            onKeyDown={(event) => {
              if (event.key !== "ArrowUp" && event.key !== "ArrowDown") return;
              event.preventDefault();
              setHoveredCycle(null);
              setPinnedCycle(cycle.id);
              requestAnimationFrame(() => {
                root.current
                  ?.querySelector<HTMLButtonElement>(
                    `#eng-cycle-menu-${cycle.letter} .eng-small-gear`,
                  )
                  ?.focus();
              });
            }}
          >
            {cycle.letter}
          </button>
        ))}
      </div>
      {TIME_CYCLES.map((cycle, cycleIndex) => {
        const records =
          cycles.find(({ section }) => section.id === cycle.id)?.records ?? [];
        return (
          <div
            className="eng-cycle-flyout"
            key={cycle.id}
            id={`eng-cycle-menu-${cycle.letter}`}
            data-letter={cycle.letter.toLowerCase()}
            hidden={openCycle !== cycle.id}
            role="group"
            aria-label={`Cycle ${cycleIndex + 1} iterations`}
            style={{ "--flyout-slot": cycleIndex - 1.5 } as CSSProperties}
          >
            <div className="eng-cycle-flyout__heading">
              <span>
                Cycle {cycleIndex + 1} · {cycle.title.split(":")[0]}
              </span>
              <span>
                {records.length
                  ? `${records.length} iterations`
                  : "Coming soon"}
              </span>
            </div>
            <div className="eng-gear-cluster">
              {records.map(({ iteration }, index) => (
                <button
                  type="button"
                  key={iteration.id}
                  className={`eng-small-gear${selection.id === iteration.id ? " is-active" : ""}`}
                  aria-label={`Go to iteration ${iteration.index}: ${iteration.short}`}
                  aria-current={
                    selection.id === iteration.id ? "step" : undefined
                  }
                  title={`${iteration.index} · ${iteration.short}`}
                  onClick={() => {
                    onNavigate(iteration);
                    setPinnedCycle(null);
                    setHoveredCycle(null);
                    requestAnimationFrame(() => {
                      document
                        .getElementById(`${iteration.id}-title`)
                        ?.focus({ preventScroll: true });
                    });
                  }}
                >
                  <SmallGear
                    letter={cycle.letter}
                    isActive={selection.id === iteration.id}
                    phase={index % 2 ? 7.5 : 0}
                  />
                  <span>{iteration.index}</span>
                </button>
              ))}
            </div>
          </div>
        );
      })}
    </nav>
  );
}

export function EngineeringJourney({
  heroRef,
}: {
  heroRef: RefObject<HTMLElement | null>;
}) {
  const root = useRef<HTMLDivElement>(null);
  const navigation = useRef(
    new Map<string, (stage: WikiDbTLStageKey) => void>(),
  );
  const [selection, setSelection] = useState<Selection>({
    id: ENGINEERING_ITERATIONS[0].id,
    stage: "design",
  });
  const currentSelection = useRef(selection);
  const resizeTarget = useRef<Selection | null>(null);
  const readerVisible = useRef(false);
  const [navigationVisible, setNavigationVisible] = useState(false);

  useGSAP(
    () => {
      const hero = heroRef.current;
      if (!hero) return;
      ScrollTrigger.create({
        trigger: hero,
        start: () =>
          `bottom ${getComputedStyle(document.documentElement).getPropertyValue("--header-height").trim() || "0px"}`,
        end: "max",
        onEnter: () => setNavigationVisible(true),
        onLeaveBack: () => setNavigationVisible(false),
        onRefresh: (trigger) =>
          setNavigationVisible(trigger.scroll() >= trigger.start),
      });
    },
    { scope: root, dependencies: [heroRef], revertOnUpdate: true },
  );
  const onChange = useCallback((next: Selection) => {
    if (resizeTarget.current) return;
    currentSelection.current = next;
    setSelection((previous) =>
      previous.id === next.id && previous.stage === next.stage
        ? previous
        : next,
    );
  }, []);
  const register = useCallback<Register>((id, navigate) => {
    navigation.current.set(id, navigate);
    return () => {
      navigation.current.delete(id);
    };
  }, []);
  const onNavigate = useCallback<Navigate>(
    (iteration, stage = "design") => {
      resizeTarget.current = null;
      navigation.current.get(iteration.id)?.(stage);
      onChange({ id: iteration.id, stage });
      window.history.replaceState(
        null,
        "",
        `#${iteration.id}${stage === "design" ? "" : `-${stage}`}`,
      );
    },
    [onChange],
  );

  useEffect(() => {
    const element = root.current;
    if (!element) return;
    const visibleScenes = new Set<Element>();
    const sceneObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visibleScenes.add(entry.target);
          else visibleScenes.delete(entry.target);
        }
        readerVisible.current = visibleScenes.size > 0;
      },
      { rootMargin: "-80px 0px -24px 0px", threshold: 0 },
    );
    element
      .querySelectorAll(".eng-cycle-scenes")
      .forEach((scene) => sceneObserver.observe(scene));
    let resizeTimer: ReturnType<typeof setTimeout> | undefined;
    const handleResize = () => {
      if (!readerVisible.current && !resizeTarget.current) return;
      resizeTarget.current ??= currentSelection.current;
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        // Refresh after the responsive scene has rebuilt, then restore the
        // selected stage instead of retaining a stale document offset.
        ScrollTrigger.refresh();
        const next = resizeTarget.current;
        resizeTarget.current = null;
        if (next) {
          navigation.current.get(next.id)?.(next.stage);
          onChange(next);
        }
      }, 350);
    };
    window.addEventListener("resize", handleResize, { capture: true });
    const handleHash = () => {
      const hash = decodeURIComponent(window.location.hash.slice(1));
      const iteration = ENGINEERING_ITERATIONS.find(
        (it) =>
          hash === it.id ||
          hash.startsWith(`${it.id}-`) ||
          hash === `dbtl-${it.index.replace(".", "-")}` ||
          hash === it.cycleId,
      );
      if (iteration) {
        const stage =
          STAGE_KEYS.find((key) => hash.endsWith(`-${key}`)) ?? "design";
        navigation.current.get(iteration.id)?.(stage);
        onChange({ id: iteration.id, stage });
      }
    };
    // Deferred CSS, fonts and artwork can change pin lengths after mount.
    // Resolve the entry anchor only after the loader has prepared that layout.
    let mounted = true;
    void whenPageLoaderLeaves().then(() => {
      if (!mounted) return;
      ScrollTrigger.refresh();
      handleHash();
    });
    window.addEventListener("hashchange", handleHash);
    return () => {
      mounted = false;
      sceneObserver.disconnect();
      clearTimeout(resizeTimer);
      resizeTarget.current = null;
      window.removeEventListener("resize", handleResize, { capture: true });
      window.removeEventListener("hashchange", handleHash);
    };
  }, [onChange]);

  return (
    <div className="eng-journey" ref={root}>
      {cycles.map(({ section, records }) => (
        <div className="eng-cycle" key={section.id}>
          <EngineeringIntroduction section={section} />
          <CycleScenes
            section={section}
            records={records}
            selection={selection}
            onChange={onChange}
            register={register}
            onNavigate={onNavigate}
          />
          {section.note ? (
            <aside className="eng-outcome">
              <h3>
                <EngineeringArticleHeading title={section.note.label} />
              </h3>
              <div className="wiki-prose">
                {section.note.body.split(/\n+/).map((text, index) => (
                  <p key={index}>
                    <InlineCopy text={text} />
                  </p>
                ))}
              </div>
            </aside>
          ) : null}
        </div>
      ))}
      <section className="eng-outcome-final" id="engineering-outcome">
        <header className="eng-outcome-final__heading">
          <h2>
            <EngineeringArticleHeading title={engineeringOutcome.title} />
          </h2>
        </header>
        <div className="wiki-blocks">
          {engineeringOutcome.paragraphs.map((text, index) => (
            <div className="wiki-prose" key={index}>
              <p>
                <InlineCopy text={text} />
              </p>
            </div>
          ))}
          {engineeringOutcome.links.length > 0 ? (
            <div className="wiki-prose eng-outcome-final__links">
              {engineeringOutcome.links.map((link, index) => (
                <p key={index}>
                  <InlineCopy text={link} />
                </p>
              ))}
            </div>
          ) : null}
        </div>
      </section>
      {navigationVisible
        ? createPortal(
            <GearNavigation selection={selection} onNavigate={onNavigate} />,
            document.body,
          )
        : null}
    </div>
  );
}
