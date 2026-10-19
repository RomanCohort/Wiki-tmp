import { goldenCircleTopics } from "../../../../data/engagement/entrepreneurshipPage";
import {
  EntrepreneurshipDetail,
  useEntrepreneurshipDetail,
} from "./EntrepreneurshipDetail";
import { WatercolorCircle } from "./EntrepreneurshipWatercolor";

const positions = [
  [320, 170],
  [202, 358],
  [438, 358],
];

export function CirCureGoldenCircle() {
  const detail = useEntrepreneurshipDetail();
  const active =
    detail.activeIndex === null ? null : goldenCircleTopics[detail.activeIndex];

  return (
    <div
      className="circure-golden-circle"
      role="group"
      aria-label="The Golden Circle Framework"
      {...detail.containerProps}
    >
      <div className="circure-golden-circle__stage">
        <svg
          className="circure-golden-circle__drawing"
          viewBox="0 0 640 520"
          aria-hidden="true"
        >
          {goldenCircleTopics.map((topic, index) => (
            <WatercolorCircle
              key={topic.id}
              cx={positions[index][0]}
              cy={positions[index][1]}
              radius={146}
              tone={topic.tone}
              seed={12 + index * 9}
              active={detail.activeIndex === index}
            />
          ))}
        </svg>
        {goldenCircleTopics.map((topic, index) => (
          <button
            key={topic.id}
            type="button"
            className={`circure-golden-circle__node circure-golden-circle__node--${topic.id}`}
            data-orbit-tone={topic.tone}
            {...detail.triggerProps(index)}
          >
            {topic.title}
          </button>
        ))}
      </div>
      {active ? (
        <EntrepreneurshipDetail
          id={detail.detailId}
          title={active.title}
          tone={active.tone}
          above={detail.activeIndex !== 0}
          onClose={detail.closeDetail}
        >
          <p className="entrepreneurship-detail__lead">{active.lead}</p>
          <p>{active.body}</p>
        </EntrepreneurshipDetail>
      ) : null}
    </div>
  );
}
