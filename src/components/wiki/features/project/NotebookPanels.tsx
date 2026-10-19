/* eslint-disable react-refresh/only-export-components */
import { useEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { ArrowDown } from "lucide-react";
import {
  notebookGroups,
  type NotebookBlock,
  type NotebookEntry,
  type NotebookGroup,
  type NotebookGroupId,
} from "../../../../data/project/notebookPage";
import {
  getNotebookImage,
  notebookAssets,
  type NotebookAsset,
} from "../../../../data/project/notebookAssets";
import { LongImageGallery } from "../../gallery/LongImageGallery";
import { VerticalGantt } from "../../timeline/VerticalGantt";
import {
  formatGanttRange,
  ganttMonthGroups,
  layoutGanttMonth,
} from "../../timeline/verticalGanttDates";
import { renderInlineFormatting } from "../../proseInline";
import "../../../../styles/features/notebook-panels.css";

// The same source tag keeps its colour across every notebook group.
const phaseTones = new Map(
  [
    "Brainstorming",
    "Preparation",
    "Pause",
    "Review & Handoff",
    "Approval",
    "Construction",
    "Validation",
    "Experiments",
    "Analysis",
    "Design",
    "Development",
    "Learning",
    "Consultation",
    "Education",
    "Exchange",
  ].map((label, index) => [label, index]),
);
const timelines = notebookGroups.map((group) => {
  const entries = group.entries.map((entry) => ({
    ...entry,
    phase: entry.tags[0],
    phaseTone: phaseTones.get(entry.tags[0]),
    phases: entry.tags.map((label) => ({ label, tone: phaseTones.get(label) })),
  }));
  return {
    id: group.id,
    entries,
    months: ganttMonthGroups(entries).flatMap((connected) => connected.months),
  };
});
function RecordBlock({ block }: { block: NotebookBlock }) {
  if (block.type === "prose")
    return <p>{renderInlineFormatting(block.text)}</p>;
  if (block.type === "discussion") {
    return (
      <div
        className="notebook-record__discussion"
        data-phase={block.label}
        data-phase-tone={phaseTones.get(block.label)}
      >
        <h4>
          <span className="notebook-record__phase">{block.label}</span>
          <span>{block.title}</span>
        </h4>
        <p>{renderInlineFormatting(block.text)}</p>
      </div>
    );
  }
  if (block.type === "table") {
    return (
      <figure className="notebook-record__table">
        <table>
          <caption>
            {block.label}: {block.title}
          </caption>
          <thead>
            <tr>
              {block.headers.map((header) => (
                <th scope="col" key={header}>
                  {renderInlineFormatting(header)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {block.rows.map((row) => (
              <tr key={row[0]}>
                {row.map((cell, index) =>
                  index === 0 ? (
                    <th scope="row" key={index}>
                      {renderInlineFormatting(cell)}
                    </th>
                  ) : (
                    <td key={index}>{renderInlineFormatting(cell)}</td>
                  ),
                )}
              </tr>
            ))}
          </tbody>
        </table>
        <figcaption>{block.caption}</figcaption>
      </figure>
    );
  }
  return (
    <figure
      className="notebook-record__figure"
      data-gallery-kind={block.gallery?.kind}
    >
      <figcaption>
        <span>
          <span className="notebook-record__figure-label">{block.label}</span>
          {block.title}
        </span>
      </figcaption>
      {block.gallery ? (
        <LongImageGallery
          title={
            block.gallery.kind === "photos" ? "Photo gallery" : "Image gallery"
          }
          images={block.assets.map((key) => {
            const asset: NotebookAsset = notebookAssets[key];
            return {
              src: getNotebookImage(key),
              title: asset.title,
              alt: asset.alt,
              caption: asset.caption,
              thumbnailSrc: asset.thumbnailUrl,
              width: asset.width,
              height: asset.height,
            };
          })}
        />
      ) : (
        <div className="notebook-record__images">
          {block.assets.map((key) => (
            <a
              href={getNotebookImage(key)}
              target="_blank"
              rel="noreferrer"
              key={key}
              aria-label={`Open image: ${notebookAssets[key].alt}`}
            >
              <img
                src={getNotebookImage(key)}
                alt={notebookAssets[key].alt}
                width={notebookAssets[key].width}
                height={notebookAssets[key].height}
                decoding="async"
              />
            </a>
          ))}
        </div>
      )}
      <p className="notebook-record__caption">{block.caption}</p>
    </figure>
  );
}

function NotebookRecord({ entry }: { entry: NotebookEntry }) {
  return (
    <div className="notebook-record">
      <div className="notebook-record__paper">
        <div className="notebook-record__body">
          {entry.blocks.map((block, blockIndex) => (
            <RecordBlock block={block} key={`${entry.id}-${blockIndex}`} />
          ))}
        </div>
      </div>
    </div>
  );
}

function NotebookTimeline({ group }: { group: NotebookGroup }) {
  const { entries: timelineEntries, months } = timelines.find(
    (timeline) => timeline.id === group.id,
  )!;
  const [month, setMonth] = useState(months[0]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const navigationRef = useRef<HTMLElement>(null);
  const selectedEntry = group.entries.find((entry) => entry.id === selectedId);
  const monthAnchorPrefix = `notebook-${group.id}-month`;

  useEffect(() => {
    const headings = [
      ...timelineRef.current!.querySelectorAll<HTMLElement>("[data-month]"),
    ];
    let frame = 0;
    function updateMonth() {
      frame = 0;
      const headerHeight =
        Number.parseFloat(
          getComputedStyle(document.documentElement).getPropertyValue(
            "--header-height",
          ),
        ) || 80;
      const threshold =
        Math.max(
          headerHeight,
          navigationRef.current?.getBoundingClientRect().bottom ?? 0,
        ) + 28;
      const current = [...headings]
        .reverse()
        .find((heading) => heading.getBoundingClientRect().top <= threshold);
      if (current?.dataset.month) setMonth(current.dataset.month);
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(updateMonth);
    };
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    schedule();
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      cancelAnimationFrame(frame);
    };
  }, []);

  function selectEntry(id: string, reveal = false) {
    setSelectedId((current) => (current === id ? null : id));
    if (reveal && selectedId !== id) {
      requestAnimationFrame(() => {
        timelineRef.current
          ?.querySelector<HTMLButtonElement>(`[data-entry-label="${id}"]`)
          ?.scrollIntoView({ block: "start" });
      });
    }
  }

  function selectMonth(value: string) {
    setMonth(value);
  }

  return (
    <div className="notebook-workspace" id={`notebook-group-${group.id}`}>
      <header className="notebook-workspace__heading">
        <div>
          <h2>
            <span className="wiki-heading-marker">{group.label}</span>
          </h2>
          <p>
            {formatGanttRange({
              start: group.entries[0].start,
              end: group.entries.reduce(
                (last, entry) => (entry.end > last ? entry.end : last),
                group.entries[0].end,
              ),
            })}
          </p>
        </div>
        <p className="notebook-workspace__guide">
          <ArrowDown size={17} aria-hidden="true" />
          Follow the dates downward. Select an entry to expand or collapse it.
        </p>
      </header>
      {group.intro.map((paragraph) => (
        <p className="notebook-workspace__intro" key={paragraph}>
          {renderInlineFormatting(paragraph)}
        </p>
      ))}
      <nav
        ref={navigationRef}
        className="notebook-months"
        aria-label={`${group.label} notebook months`}
      >
        {months.map((value) => {
          const date = new Date(`${value}-01T00:00:00Z`);
          const count = layoutGanttMonth(group.entries, value).periods.length;
          const label = new Intl.DateTimeFormat("en-GB", {
            month: "short",
            timeZone: "UTC",
          }).format(date);
          return (
            <a
              href={`#${monthAnchorPrefix}-${value}`}
              key={value}
              aria-current={month === value ? "date" : undefined}
              aria-label={`${label} ${date.getUTCFullYear()}, ${count} ${count === 1 ? "entry" : "entries"}`}
              onClick={() => selectMonth(value)}
            >
              <span className="notebook-months__year">
                {date.getUTCFullYear()}
              </span>
              <span>{label}</span>
              <span
                className="notebook-months__activity"
                data-has-entries={count > 0}
                aria-hidden="true"
              />
            </a>
          );
        })}
      </nav>
      <div ref={timelineRef} className="notebook-workspace__timeline">
        <VerticalGantt
          entries={timelineEntries}
          monthAnchorPrefix={monthAnchorPrefix}
          selectedId={selectedId}
          onSelect={selectEntry}
          detailId={`notebook-${group.id}-selected-record`}
          renderDetail={() =>
            selectedEntry ? <NotebookRecord entry={selectedEntry} /> : null
          }
        />
      </div>
    </div>
  );
}

function groupFromHash(): NotebookGroupId {
  const hash = window.location.hash;
  return (
    notebookGroups.find(
      (group) =>
        hash === `#notebook-group-${group.id}` ||
        hash.startsWith(`#notebook-${group.id}-month-`),
    )?.id ?? "wet-lab"
  );
}

export function NotebookWorkspace() {
  const [groupId, setGroupId] = useState<NotebookGroupId>(groupFromHash);
  const shellRef = useRef<HTMLDivElement>(null);
  const group = notebookGroups.find((item) => item.id === groupId)!;

  useEffect(() => {
    const syncGroup = () => setGroupId(groupFromHash());
    window.addEventListener("hashchange", syncGroup);
    return () => window.removeEventListener("hashchange", syncGroup);
  }, []);

  function switchGroup(id: NotebookGroupId) {
    setGroupId(id);
    window.history.pushState(window.history.state, "", `#notebook-group-${id}`);
    requestAnimationFrame(() => {
      shellRef.current?.scrollIntoView({ block: "start" });
    });
  }

  return (
    <div className="notebook-shell" ref={shellRef}>
      {createPortal(
        <nav className="notebook-group-nav" aria-label="Notebook groups">
          {notebookGroups.map((item) => (
            <a
              href={`#notebook-group-${item.id}`}
              key={item.id}
              aria-current={item.id === groupId ? "true" : undefined}
              onClick={(event) => {
                // Keep modified clicks available for opening a group in another tab.
                if (
                  event.metaKey ||
                  event.ctrlKey ||
                  event.shiftKey ||
                  event.altKey
                )
                  return;
                event.preventDefault();
                switchGroup(item.id);
              }}
            >
              <span className="notebook-group-nav__dot" aria-hidden="true" />
              {item.label}
            </a>
          ))}
        </nav>,
        document.body,
      )}
      <NotebookTimeline group={group} key={group.id} />
    </div>
  );
}

export function notebookFeatures(): Record<string, ReactNode> {
  return { "notebook-workspace": <NotebookWorkspace /> };
}
