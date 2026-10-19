import {
  Fragment,
  useId,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { ArrowDown, ChevronDown } from "lucide-react";
import {
  formatGanttRange,
  ganttMonthGroups,
  layoutGanttGroup,
  type GanttEntry,
} from "./verticalGanttDates";
import "../../../styles/features/vertical-gantt.css";

interface VerticalGanttProps {
  entries: readonly GanttEntry[];
  selectedId: string | null;
  onSelect: (id: string, reveal?: boolean) => void;
  renderDetail: (entry: GanttEntry) => ReactNode;
  detailId: string;
  monthAnchorPrefix: string;
}

const monthFormat = new Intl.DateTimeFormat("en-GB", {
  month: "long",
  timeZone: "UTC",
});
const shortMonthFormat = new Intl.DateTimeFormat("en-GB", {
  month: "short",
  timeZone: "UTC",
});
const endDateFormat = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  timeZone: "UTC",
});

/** Connected months share one grid, so a spanning record stays in one track. */
export function VerticalGantt({
  entries,
  selectedId,
  onSelect,
  renderDetail,
  detailId,
  monthAnchorPrefix,
}: VerticalGanttProps) {
  const paintId = useId();
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const activeId = hoveredId ?? selectedId;
  const layouts = ganttMonthGroups(entries).map(layoutGanttGroup);
  // Every group uses the same axis width, keeping both event columns equal.
  const lanes = Math.max(1, ...layouts.map((layout) => layout.lanes));

  return (
    <div
      className="vertical-gantt"
      aria-label="Recorded timeline"
      data-has-active={activeId !== null}
    >
      <svg className="vertical-gantt__paint-defs" aria-hidden="true">
        <defs>
          <filter
            id={`${paintId}-wash`}
            x="-30%"
            y="-4%"
            width="160%"
            height="108%"
            colorInterpolationFilters="sRGB"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.24 0.06"
              numOctaves="2"
              seed="17"
              result="grain"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="grain"
              scale="2.5"
              xChannelSelector="R"
              yChannelSelector="G"
              result="edge"
            />
            <feColorMatrix
              in="grain"
              type="matrix"
              values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0.75 0 0.5"
              result="paper"
            />
            <feComposite in="edge" in2="paper" operator="in" />
          </filter>
        </defs>
      </svg>
      <div className="vertical-gantt__axis-label" aria-hidden="true">
        <span>
          Date <ArrowDown size={12} />
        </span>
      </div>
      {layouts.map((layout) => {
        const periods = layout.periods.map((period) => ({
          ...period,
          lane:
            period.side === "right"
              ? period.lane + lanes - layout.lanes
              : period.lane,
        }));
        const periodsById = new Map(
          periods.map((period) => [period.entry.id, period]),
        );
        return (
          <div
            className="vertical-gantt__calendar"
            key={layout.months[0].month}
            style={
              {
                "--gantt-rows": layout.rowCount,
                "--gantt-lanes": lanes,
              } as CSSProperties
            }
          >
            {layout.months.map(({ month, headingRow, rows }) => (
              <Fragment key={month}>
                <header
                  className="vertical-gantt__heading"
                  id={`${monthAnchorPrefix}-${month}`}
                  data-month={month}
                  style={{ gridRow: headingRow }}
                  tabIndex={-1}
                >
                  <h3>
                    <span className="vertical-gantt__month-full">
                      {monthFormat.format(new Date(`${month}-01T00:00:00Z`))}
                    </span>
                    <span className="vertical-gantt__month-short">
                      {shortMonthFormat.format(
                        new Date(`${month}-01T00:00:00Z`),
                      )}
                    </span>
                  </h3>
                  <span>{month.slice(0, 4)}</span>
                </header>
                {rows.map(({ date, row, entries: starting }) => (
                  <Fragment key={date}>
                    <div
                      className="vertical-gantt__day-rule"
                      style={{ gridRow: row }}
                      aria-hidden="true"
                    />
                    <time
                      className="vertical-gantt__day"
                      style={{ gridRow: row }}
                      dateTime={date}
                    >
                      {date.slice(8)}
                    </time>
                    {starting.length ? (
                      <div
                        className="vertical-gantt__date-entries"
                        style={{ gridRow: row }}
                      >
                        {(["left", "right"] as const).map((side) => {
                          const sideEntries = starting.filter(
                            (entry) => periodsById.get(entry.id)!.side === side,
                          );
                          return sideEntries.length ? (
                            <div
                              className="vertical-gantt__entries"
                              data-side={side}
                              key={side}
                            >
                              {sideEntries.map((entry) => (
                                <div
                                  className="vertical-gantt__event"
                                  data-selected={entry.id === selectedId}
                                  data-highlighted={entry.id === activeId}
                                  data-phase={entry.phase}
                                  data-phase-tone={entry.phaseTone}
                                  data-side={side}
                                  style={
                                    {
                                      "--gantt-lane": periodsById.get(entry.id)!
                                        .lane,
                                    } as CSSProperties
                                  }
                                  onPointerEnter={() => setHoveredId(entry.id)}
                                  onPointerLeave={() => setHoveredId(null)}
                                  onFocus={() => setHoveredId(entry.id)}
                                  onBlur={() => setHoveredId(null)}
                                  key={entry.id}
                                >
                                  <span
                                    className="vertical-gantt__lead"
                                    aria-hidden="true"
                                  />
                                  <button
                                    type="button"
                                    id={`${detailId}-label-${entry.id}`}
                                    data-entry-label={entry.id}
                                    data-side={side}
                                    className="vertical-gantt__entry"
                                    data-selected={entry.id === selectedId}
                                    data-phase={entry.phase}
                                    data-phase-tone={entry.phaseTone}
                                    aria-expanded={entry.id === selectedId}
                                    aria-controls={
                                      entry.id === selectedId
                                        ? detailId
                                        : undefined
                                    }
                                    onClick={() => onSelect(entry.id)}
                                  >
                                    <span className="vertical-gantt__entry-date">
                                      {formatGanttRange(entry)}
                                      <span className="vertical-gantt__duration">
                                        {Math.round(
                                          (Date.parse(entry.end) -
                                            Date.parse(entry.start)) /
                                            86400000,
                                        ) + 1}
                                        {entry.start === entry.end
                                          ? " day"
                                          : " days"}
                                      </span>
                                    </span>
                                    <span className="vertical-gantt__entry-title">
                                      {entry.title}
                                    </span>
                                    {entry.phases?.length ? (
                                      <span className="vertical-gantt__phases">
                                        {entry.phases.map(({ label, tone }) => (
                                          <span
                                            className="vertical-gantt__phase"
                                            data-phase={label}
                                            data-phase-tone={tone}
                                            key={label}
                                          >
                                            {label}
                                          </span>
                                        ))}
                                      </span>
                                    ) : entry.phase ? (
                                      <span className="vertical-gantt__phase">
                                        {entry.phase}
                                      </span>
                                    ) : null}
                                    <ChevronDown
                                      className="vertical-gantt__entry-arrow"
                                      size={15}
                                      aria-hidden="true"
                                    />
                                  </button>
                                  {entry.id === selectedId ? (
                                    <div
                                      className="vertical-gantt__detail"
                                      id={detailId}
                                      role="region"
                                      aria-labelledby={`${detailId}-label-${entry.id}`}
                                      tabIndex={0}
                                    >
                                      {renderDetail(entry)}
                                    </div>
                                  ) : null}
                                </div>
                              ))}
                            </div>
                          ) : null;
                        })}
                      </div>
                    ) : null}
                  </Fragment>
                ))}
              </Fragment>
            ))}
            {periods.map(({ entry, lane, startRow, endRow }) => (
              <button
                type="button"
                key={entry.id}
                className="vertical-gantt__bar"
                data-entry-id={entry.id}
                data-selected={entry.id === selectedId}
                data-highlighted={entry.id === activeId}
                data-single-day={entry.start === entry.end}
                data-phase={entry.phase}
                data-phase-tone={entry.phaseTone}
                style={
                  {
                    "--gantt-lane": lane,
                    gridRow: `${startRow} / ${Math.max(startRow + 1, endRow - 1)}`,
                  } as CSSProperties
                }
                title={`${entry.title} · ${formatGanttRange(entry)}`}
                onClick={() => onSelect(entry.id, true)}
                onPointerEnter={() => setHoveredId(entry.id)}
                onPointerLeave={() => setHoveredId(null)}
                tabIndex={-1}
                aria-hidden="true"
              >
                <svg
                  viewBox="0 0 18 100"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <rect
                    x="4"
                    y="0"
                    width="10"
                    height="100"
                    rx="3"
                    fill="currentColor"
                    filter={`url(#${paintId}-wash)`}
                  />
                  <rect
                    x="7"
                    y="2"
                    width="3"
                    height="96"
                    rx="1.5"
                    fill="currentColor"
                    opacity="0.25"
                    filter={`url(#${paintId}-wash)`}
                  />
                </svg>
                <span className="vertical-gantt__end-label">
                  {entry.start === entry.end ? "On " : "Ends "}
                  {endDateFormat.format(new Date(`${entry.end}T00:00:00Z`))}
                </span>
              </button>
            ))}
          </div>
        );
      })}
      <p className="vertical-gantt__footnote">
        Date spacing is condensed. Dates and day counts show the full recorded
        duration.
      </p>
    </div>
  );
}
