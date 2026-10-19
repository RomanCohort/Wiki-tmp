import { useId, type CSSProperties } from "react";
import { stakeholders3DList } from "../../../../data/engagement/entrepreneurshipPage";
import {
  EntrepreneurshipDetail,
  useEntrepreneurshipDetail,
} from "./EntrepreneurshipDetail";

// Interest runs right, Influence up, and Impact away from the reader.
// All points use the same projection and the original 0–10 scale.
function project(interest: number, influence: number, impact: number) {
  return {
    x: 96 + interest * 39 + impact * 14,
    y: 395 + interest * 6.5 - influence * 27.5 - impact * 9,
  };
}

function segment(a: ReturnType<typeof project>, b: ReturnType<typeof project>) {
  return `M${a.x},${a.y} L${b.x},${b.y}`;
}

const plottedStakeholders = stakeholders3DList.map((item) => ({
  ...item,
  point: project(
    item.coordinates.interest,
    item.coordinates.influence,
    item.coordinates.impact,
  ),
}));

export function StakeholderMatrix3D() {
  const id = useId();
  const detail = useEntrepreneurshipDetail();
  const active =
    detail.activeIndex === null
      ? null
      : plottedStakeholders[detail.activeIndex];

  return (
    <div
      className="stakeholder-matrix-3d"
      role="group"
      aria-label="Interest × Influence × Impact Framework"
      {...detail.containerProps}
    >
      <div className="stakeholder-matrix-3d__stage">
        <svg
          className="stakeholder-matrix-3d__drawing"
          viewBox="0 0 720 510"
          aria-hidden="true"
        >
          <defs>
            <marker
              id={`${id}-arrow`}
              markerWidth="7"
              markerHeight="7"
              refX="5.5"
              refY="3.5"
              orient="auto"
              markerUnits="userSpaceOnUse"
            >
              <path
                d="M1 1 5.5 3.5 1 6"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.1"
              />
            </marker>
          </defs>
          <g className="stakeholder-matrix-3d__grid">
            {[0, 5, 10].map((value) => (
              <g key={value}>
                <path
                  d={segment(project(0, 0, value), project(10, 0, value))}
                />
                <path
                  d={segment(project(value, 0, 0), project(value, 0, 10))}
                />
                <path
                  d={segment(project(0, value, 10), project(10, value, 10))}
                />
                <path
                  d={segment(project(value, 0, 10), project(value, 10, 10))}
                />
              </g>
            ))}
          </g>
          <g
            className="stakeholder-matrix-3d__axes"
            markerEnd={`url(#${id}-arrow)`}
          >
            <path
              data-axis="impact"
              d={segment(project(0, 0, 0), project(0, 0, 11))}
            />
            <path
              data-axis="influence"
              d={segment(project(0, 0, 0), project(0, 10.7, 0))}
            />
            <path
              data-axis="interest"
              d={segment(project(0, 0, 0), project(10.7, 0, 0))}
            />
          </g>
          <g className="stakeholder-matrix-3d__axis-labels">
            <text
              x="179"
              y="327"
              transform="rotate(-33 179 327)"
              textAnchor="middle"
            >
              Impact
            </text>
            <text
              x="68"
              y="259"
              transform="rotate(-90 68 259)"
              textAnchor="middle"
            >
              Influence
            </text>
            <text
              x="307"
              y="460"
              transform="rotate(9.5 307 460)"
              textAnchor="middle"
            >
              Interest
            </text>
          </g>
          <g className="stakeholder-matrix-3d__ticks">
            <text x="81" y="419">
              0
            </text>
            {[5, 10].map((value) => (
              <g key={value}>
                <text
                  x={project(value, 0, 0).x}
                  y={project(value, 0, 0).y + 24}
                  textAnchor="middle"
                >
                  {value}
                </text>
                <text x="82" y={project(0, value, 0).y + 4} textAnchor="end">
                  {value}
                </text>
                <text
                  x={project(0, 0, value).x + 10}
                  y={project(0, 0, value).y + 18}
                >
                  {value}
                </text>
              </g>
            ))}
          </g>
          {plottedStakeholders.map((item, index) => {
            const floor = project(
              item.coordinates.interest,
              0,
              item.coordinates.impact,
            );
            return (
              <g
                key={item.id}
                data-orbit-tone={item.tone}
                className={`stakeholder-matrix-3d__point${detail.activeIndex === index ? " is-active" : ""}`}
              >
                <path
                  className="stakeholder-matrix-3d__projection"
                  d={segment(floor, item.point)}
                />
                <circle
                  className="stakeholder-matrix-3d__dot"
                  cx={item.point.x}
                  cy={item.point.y}
                  r="6.5"
                />
                {detail.activeIndex === index ? (
                  <circle
                    className="stakeholder-matrix-3d__selection"
                    cx={item.point.x}
                    cy={item.point.y}
                    r="11.5"
                  />
                ) : null}
              </g>
            );
          })}
        </svg>
        {plottedStakeholders.map((item, index) => (
          <button
            key={item.id}
            type="button"
            className="stakeholder-matrix-3d__point-trigger"
            data-orbit-tone={item.tone}
            aria-label={item.name}
            style={
              {
                "--point-x": `${(item.point.x / 720) * 100}%`,
                "--point-y": `${(item.point.y / 510) * 100}%`,
              } as CSSProperties
            }
            {...detail.triggerProps(index)}
          />
        ))}
      </div>
      <div
        className="stakeholder-matrix-3d__legend"
        aria-label="Stakeholder groups"
      >
        {plottedStakeholders.map((item, index) => (
          <button
            key={item.id}
            type="button"
            className="stakeholder-matrix-3d__legend-item"
            data-orbit-tone={item.tone}
            {...detail.triggerProps(index)}
          >
            <span
              className="stakeholder-matrix-3d__swatch"
              aria-hidden="true"
            />
            <span>{item.name}</span>
          </button>
        ))}
      </div>
      {active ? (
        <EntrepreneurshipDetail
          id={detail.detailId}
          title={active.name}
          tone={active.tone}
          image={active.image}
          above
          onClose={detail.closeDetail}
        >
          <dl className="stakeholder-matrix-3d__dimensions">
            {(["interest", "influence", "impact"] as const).map((dimension) => (
              <div key={dimension}>
                <dt>
                  {dimension[0].toUpperCase() + dimension.slice(1)}{" "}
                  <span>{active.coordinates[dimension]}</span>
                </dt>
                <dd>{active.details[dimension]}</dd>
              </div>
            ))}
          </dl>
        </EntrepreneurshipDetail>
      ) : null}
    </div>
  );
}
