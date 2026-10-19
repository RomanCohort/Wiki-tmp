import { useId, type CSSProperties } from "react";
import {
  entrepreneurshipMilestoneGroups,
  type EntrepreneurshipMilestone,
} from "../../../../data/engagement/entrepreneurshipMilestones";
import { useEntrepreneurshipDetail } from "./EntrepreneurshipDetail";
import "../../../../styles/features/entrepreneurship-milestone.css";

function monthNumber(value: string) {
  const [year, month] = value.split("-").map(Number);
  return year * 12 + month - 1;
}

const firstMonth = Math.min(
  ...entrepreneurshipMilestoneGroups.flatMap((group) =>
    group.milestones.map((item) => monthNumber(item.start)),
  ),
);
const lastMonth =
  Math.max(
    ...entrepreneurshipMilestoneGroups.flatMap((group) =>
      group.milestones.map((item) => monthNumber(item.end ?? item.start)),
    ),
  ) + 1;
const months = lastMonth - firstMonth;
const years = Array.from(
  {
    length: Math.floor((lastMonth - 1) / 12) - Math.floor(firstMonth / 12) + 1,
  },
  (_, index) => {
    const year = Math.floor(firstMonth / 12) + index;
    return {
      year,
      start: Math.max(year * 12, firstMonth) - firstMonth,
      end: Math.min((year + 1) * 12, lastMonth) - firstMonth,
    };
  },
);

function milestoneDates(item: EntrepreneurshipMilestone) {
  return (
    item.start.replace("-", ".") +
    (item.end ? `–${item.end.replace("-", ".")}` : "")
  );
}

export function MilestoneTimeline() {
  const id = useId();
  const { activeIndex, detailId, triggerProps, containerProps } =
    useEntrepreneurshipDetail();
  return (
    <div
      {...containerProps}
      className="milestone-timeline"
      role="group"
      aria-label="CirCure milestone timeline"
    >
      <svg className="milestone-timeline__paint-defs" aria-hidden="true">
        <defs>
          <filter
            id={`${id}-wash`}
            x="-5%"
            y="-35%"
            width="110%"
            height="170%"
            colorInterpolationFilters="sRGB"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.06 0.24"
              numOctaves="2"
              seed="17"
              result="grain"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="grain"
              scale="3"
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
      <div className="milestone-timeline__ruler" aria-hidden="true">
        {years
          .filter((year) => year.end - year.start >= 6)
          .map(({ year, start, end }) => (
            <span
              key={year}
              style={
                {
                  "--year-center": `${((start + end) / 2 / months) * 100}%`,
                } as CSSProperties
              }
            >
              {year}
            </span>
          ))}
      </div>
      {entrepreneurshipMilestoneGroups.map((group, groupIndex) => (
        <section
          className="milestone-timeline__group"
          data-orbit-tone={group.tone}
          key={group.title}
          aria-labelledby={`${id}-${group.title}`}
        >
          <h3
            id={`${id}-${group.title}`}
            className="milestone-timeline__group-title"
          >
            {group.title}
          </h3>
          <ol className="milestone-timeline__rows">
            {group.milestones.map((item, itemIndex) => {
              const start = monthNumber(item.start) - firstMonth;
              const end = monthNumber(item.end ?? item.start) + 1 - firstMonth;
              const dateLabel = milestoneDates(item);
              const index =
                entrepreneurshipMilestoneGroups
                  .slice(0, groupIndex)
                  .reduce(
                    (total, entry) => total + entry.milestones.length,
                    0,
                  ) + itemIndex;
              const active = activeIndex === index;
              const paintId = `${id}-paint-${index}`;
              return (
                <li
                  className="milestone-timeline__row"
                  data-active={active || undefined}
                  key={item.title}
                >
                  <div className="milestone-timeline__label">
                    <span className="milestone-timeline__name">
                      {item.title}
                    </span>
                  </div>
                  <div
                    className="milestone-timeline__plot"
                    style={
                      {
                        "--bar-start": `${(start / months) * 100}%`,
                        "--bar-width": `${((end - start) / months) * 100}%`,
                        "--bar-center": `${((start + end) / 2 / months) * 100}%`,
                      } as CSSProperties
                    }
                  >
                    <svg
                      className="milestone-timeline__track"
                      viewBox={`0 0 ${months * 10} 32`}
                      preserveAspectRatio="none"
                      aria-hidden="true"
                    >
                      <defs>
                        <linearGradient
                          id={paintId}
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="0"
                            stopColor="var(--orbit-color)"
                            stopOpacity="0.25"
                          />
                          <stop
                            offset="0.35"
                            stopColor="var(--orbit-color)"
                            stopOpacity="0.58"
                          />
                          <stop
                            offset="0.7"
                            stopColor="var(--orbit-color)"
                            stopOpacity="0.43"
                          />
                          <stop
                            offset="1"
                            stopColor="var(--orbit-color)"
                            stopOpacity="0.2"
                          />
                        </linearGradient>
                      </defs>
                      {years.slice(1).map((year) => (
                        <line
                          key={year.year}
                          className="milestone-timeline__year-line"
                          x1={year.start * 10}
                          x2={year.start * 10}
                          y1="0"
                          y2="32"
                        />
                      ))}
                      <rect
                        className="milestone-timeline__bar"
                        data-start={item.start}
                        data-end={item.end ?? item.start}
                        x={start * 10 + 1}
                        y="7"
                        width={(end - start) * 10 - 2}
                        height="18"
                        rx="3"
                        fill={`url(#${paintId})`}
                        filter={`url(#${id}-wash)`}
                      />
                    </svg>
                    <button
                      {...triggerProps(index)}
                      className="milestone-timeline__trigger"
                      type="button"
                      aria-label={`${item.title}: ${dateLabel}`}
                    />
                    {active ? (
                      <div
                        id={detailId}
                        role="tooltip"
                        className={`milestone-timeline__dates${item.end ? "" : " milestone-timeline__dates--single"}`}
                      >
                        <time dateTime={item.start}>
                          {item.start.replace("-", ".")}
                        </time>
                        {item.end ? (
                          <>
                            –
                            <time dateTime={item.end}>
                              {item.end.replace("-", ".")}
                            </time>
                          </>
                        ) : null}
                      </div>
                    ) : null}
                  </div>
                </li>
              );
            })}
          </ol>
        </section>
      ))}
    </div>
  );
}
