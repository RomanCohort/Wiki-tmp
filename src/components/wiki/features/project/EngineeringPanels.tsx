import { useEffect, useRef, useState, type MouseEvent } from "react";
import {
  ENGINEERING_ITERATIONS,
  TIME_CYCLES,
  type EngineeringIterationDatum,
} from "../../../../data/project/engineeringPage";
import type { WikiDbTLStageKey as DbTLStageKey } from "../../wikiPageTypes";
const dialBaseSrc = "https://static.igem.wiki/teams/6056/wiki/files/pages/project/engineering/engineering-dial-base.webp";
const handLongSrc = "https://static.igem.wiki/teams/6056/wiki/files/pages/project/engineering/engineering-dial-hand-long.webp";
const handShortSrc = "https://static.igem.wiki/teams/6056/wiki/files/pages/project/engineering/engineering-dial-hand-short.webp";
const dialCapSrc = "https://static.igem.wiki/teams/6056/wiki/files/pages/project/engineering/engineering-dial-cap.webp";
import "../../../../styles/features/engineering-dial.css";

export interface EngineeringOutlineProps {
  activeIteration: EngineeringIterationDatum;
  activeStage: DbTLStageKey;
  onNavigate: (
    iteration: EngineeringIterationDatum,
    stage?: DbTLStageKey,
  ) => void;
}

// Dial geometry in 732x732 viewBox around the centre (C, C).
const C = 366;
const RING_OUT = 290; // outer TIME ring
const RING_IN = 135;
const DIAL_OUT = 135; // inner DBTL dial
const DIAL_IN = 42;

// Polar coordinate helper (0 deg = 12 o'clock, clockwise)
const polar = (r: number, deg: number) => {
  const rad = ((deg - 90) * Math.PI) / 180;
  return [C + r * Math.cos(rad), C + r * Math.sin(rad)] as const;
};

const f2 = (n: number) => n.toFixed(2);

// Annular sector path (donut wedge)
function sectorPath(
  rInner: number,
  rOuter: number,
  startDeg: number,
  sweepDeg: number,
) {
  const [x1, y1] = polar(rOuter, startDeg);
  const [x2, y2] = polar(rOuter, startDeg + sweepDeg);
  const [x3, y3] = polar(rInner, startDeg + sweepDeg);
  const [x4, y4] = polar(rInner, startDeg);
  return `M ${f2(x1)} ${f2(y1)} A ${rOuter} ${rOuter} 0 0 1 ${f2(x2)} ${f2(y2)} L ${f2(x3)} ${f2(y3)} A ${rInner} ${rInner} 0 0 0 ${f2(x4)} ${f2(y4)} Z`;
}

// Layout: T top-left (270°), then clockwise I (0°), M (90°), E (180°).
const CYCLE_START = [270, 0, 90, 180];

const STAGES: { key: DbTLStageKey; label: string; start: number }[] = [
  { key: "design", label: "Design", start: 270 },
  { key: "build", label: "Build", start: 0 },
  { key: "test", label: "Test", start: 90 },
  { key: "learn", label: "Learn", start: 180 },
];

const cycleWord = (title: string) => title.split(":")[0];

// Pointers render via declarative CSS transforms (see engineering-dial.css):
// `transform-box: fill-box` pins the rotation origin to each image's own centre,
// so the dial centre can never drift, and CSS transitions keep moves smooth.
const normalizeDelta = (delta: number) =>
  ((((delta % 360) + 540) % 360) - 180) as number;

export function EngineeringOutline({
  activeIteration,
  activeStage,
  onNavigate,
}: EngineeringOutlineProps) {
  const activeCycle = activeIteration.cycle - 1;
  const shownStage = activeStage;
  const svgRef = useRef<SVGSVGElement>(null);

  // Accumulated angles so each move takes the shortest arc under CSS transition.
  const [angles, setAngles] = useState(() => ({
    short: 315,
    long: (CYCLE_START[activeCycle] ?? 270) + 45,
  }));

  const shown = STAGES.find((s) => s.key === shownStage) ?? STAGES[0];
  const targetShort = shown.start + 45;
  const targetLong = (CYCLE_START[activeCycle] ?? 270) + 45;

  useEffect(() => {
    setAngles((prev) => {
      const next = {
        short: prev.short + normalizeDelta(targetShort - prev.short),
        long: prev.long + normalizeDelta(targetLong - prev.long),
      };
      return next.short === prev.short && next.long === prev.long
        ? prev
        : next;
    });
  }, [targetShort, targetLong]);

  const jumpTo = (id: string, event: MouseEvent<Element>) => {
    event.preventDefault();
    const first = ENGINEERING_ITERATIONS.find((it) => it.cycleId === id);
    if (first) onNavigate(first);
  };

  const jumpToStage = (stage: DbTLStageKey, event: MouseEvent<Element>) => {
    event.preventDefault();
    onNavigate(activeIteration, stage);
  };

  return (
    <nav
      className="eng-mech-nav"
      aria-label="TIME cycles and engineering stages"
    >
      <div className="eng-mech-figure-box">
        <svg
          ref={svgRef}
          viewBox="0 0 732 732"
          className="eng-dial"
          role="group"
          aria-label="TIME cycles and Design–Build–Test–Learn stages"
        >
          {/* Base artwork: outer gear teeth, colored quadrants, dividing rings, and serif text */}
          <image
            href={dialBaseSrc}
            x="0"
            y="0"
            width="732"
            height="732"
            className="eng-dial__base-image"
          />

          {/* Outer ring interactive sectors (TIME cycles) */}
          {TIME_CYCLES.map((cycle, i) => {
            const start = CYCLE_START[i];
            const word = cycleWord(cycle.title);
            const recorded = cycle.status === "recorded";
            const isActive = i === activeCycle;
            const className = [
              "eng-dial__cycle",
              `eng-dial__cycle--${cycle.letter.toLowerCase()}`,
              isActive ? "is-active" : "",
              recorded ? "" : "is-planned",
            ]
              .filter(Boolean)
              .join(" ");

            const face = (
              <>
                <title>{`Cycle ${i + 1} · ${word}${recorded ? "" : " (coming soon)"}`}</title>
                <path
                  className="eng-dial__cycle-face"
                  d={sectorPath(RING_IN, RING_OUT, start, 90)}
                />
              </>
            );

            return recorded ? (
              <a
                key={cycle.id}
                href={`#${cycle.id}`}
                className={className}
                aria-label={`Cycle ${i + 1}: ${word}`}
                aria-current={isActive ? "step" : undefined}
                onClick={(e) => jumpTo(cycle.id, e)}
              >
                {face}
              </a>
            ) : (
              <g key={cycle.id} className={className} aria-disabled="true">
                {face}
              </g>
            );
          })}

          {/* Inner dial interactive sectors (DBTL stages) */}
          {STAGES.map((stage) => {
            const isActive = stage.key === shownStage;
            return (
              <a
                key={stage.key}
                href={`#${activeIteration.id}-${stage.key}`}
                className={`eng-dial__stage eng-dial__stage--${stage.key}${isActive ? " is-active" : ""}`}
                aria-label={`Iteration ${activeIteration.index}: ${stage.label}`}
                aria-current={isActive ? "step" : undefined}
                onClick={(e) => jumpToStage(stage.key, e)}
              >
                <title>{stage.label}</title>
                <path
                  className="eng-dial__stage-face"
                  d={sectorPath(DIAL_IN, DIAL_OUT, stage.start, 90)}
                />
              </a>
            );
          })}

          {/* Pointers and hub cap */}
          <image
            className="eng-dial__hand-long"
            href={handLongSrc}
            x="0"
            y="0"
            width="732"
            height="732"
            style={{ transform: `rotate(${angles.long}deg)` }}
          />
          <image
            className="eng-dial__hand-short"
            href={handShortSrc}
            x="0"
            y="0"
            width="732"
            height="732"
            style={{ transform: `rotate(${angles.short}deg)` }}
          />
          <image
            className="eng-dial__cap"
            href={dialCapSrc}
            x="0"
            y="0"
            width="732"
            height="732"
          />
        </svg>

        <p className="eng-current-iteration" aria-live="polite">
          <span className="eng-current-iteration__index">
            {activeIteration.index}
          </span>
          <span>{activeIteration.short}</span>
        </p>
      </div>
    </nav>
  );
}
