import {
  useEffect,
  useId,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { scrollReaderToTarget } from "../../../../utils";
import {
  experimentProtocolImage,
  experimentProtocolLocalImage,
  experimentProtocolPairs,
  type ExperimentProtocolPair,
} from "../../../../data/wet-lab/experimentProtocolPages";
import { experimentRingStages } from "../../../../data/wet-lab/experimentProtocolRing";
import { WikiProtocolModal } from "../../WikiProtocolViewer";
import { WatercolorCircle } from "../../WatercolorCircle";
import "../../../../styles/features/experiments-protocol.css";

type Point = { x: number; y: number };

function pointStyle(point: Point, color?: string): CSSProperties {
  return {
    "--node-x": `${point.x}px`,
    "--node-y": `${point.y}px`,
    ...(color ? { "--node-color": color } : {}),
  } as CSSProperties;
}

function spokePath(from: Point, to: Point) {
  const distance = Math.hypot(to.x - from.x, to.y - from.y);
  const dx = (to.x - from.x) / distance;
  const dy = (to.y - from.y) / distance;
  return `M ${from.x + dx * 44} ${from.y + dy * 44} L ${to.x - dx * 28} ${to.y - dy * 28}`;
}

function AtlasWatercolor({ seed }: { seed: number }) {
  return (
    <svg
      className="exp-atlas__wash"
      viewBox="0 0 100 100"
      aria-hidden="true"
      focusable="false"
    >
      <WatercolorCircle
        cx={50}
        cy={50}
        radius={44}
        seed={seed}
        className="exp-atlas__pigment"
      />
    </svg>
  );
}

/** Reveal one protocol branch at a time, reserving readable space for its labels. */
export function ExperimentProtocolAtlas() {
  const [showStages, setShowStages] = useState(false);
  const [expandedStage, setExpandedStage] = useState<string | null>(null);
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [size, setSize] = useState({ width: 960, height: 520 });
  const mapRef = useRef<HTMLDivElement>(null);
  const centreRef = useRef<HTMLButtonElement>(null);
  const stageRefs = useRef(new Map<string, HTMLButtonElement>());
  const atlasId = useId().replace(/:/g, "");
  const stagesId = `${atlasId}-stages`;
  const hintId = `${atlasId}-hint`;
  const selectedIndex = experimentRingStages.findIndex(
    (stage) => stage.number === expandedStage,
  );
  const selectedStage = experimentRingStages[selectedIndex] ?? null;
  const activePair = activeKey
    ? (experimentProtocolPairs.find((pair) => pair.key === activeKey) ?? null)
    : null;

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    const observer = new ResizeObserver(([entry]) => {
      if (!entry) return;
      const { width, height } = entry.contentRect;
      if (!width || !height) return;
      setSize((previous) =>
        previous.width === width && previous.height === height
          ? previous
          : { width, height },
      );
    });
    observer.observe(map);
    return () => observer.disconnect();
  }, []);

  const centre: Point = {
    x: size.width * (selectedStage ? 0.28 : 0.5),
    y: size.height / 2 - (selectedStage ? 10 : 18),
  };
  const radiusX = selectedStage
    ? Math.min(size.width * 0.19, 185)
    : Math.min(size.width * 0.235, 220);
  const radiusY = selectedStage ? 184 : 158;
  const hubs = experimentRingStages.map((_, index) => {
    const relativeIndex =
      (index - selectedIndex + experimentRingStages.length) %
      experimentRingStages.length;
    const angle = selectedStage
      ? ((relativeIndex === 0 ? 0 : 52 + (relativeIndex - 1) * 51.2) *
          Math.PI) /
        180
      : -Math.PI / 2 + (index * Math.PI * 2) / experimentRingStages.length;
    return {
      x: centre.x + Math.cos(angle) * radiusX,
      y: centre.y + Math.sin(angle) * radiusY,
    };
  });
  const leaves = selectedStage
    ? selectedStage.nodes.flatMap((node) => {
        const pair = experimentProtocolPairs.find(
          (entry) => entry.key === node.key,
        );
        return pair ? [{ pair, label: node.label }] : [];
      })
    : [];
  const leafPoints = leaves.map((_, index) => ({
    x: size.width * 0.61,
    y: centre.y + (index - (leaves.length - 1) / 2) * 82,
  }));

  const toggleStages = () => {
    setShowStages(!showStages);
    setExpandedStage(null);
  };
  const toggleStage = (number: string) => {
    setExpandedStage((current) => (current === number ? null : number));
  };
  const jumpToArticle = () => {
    if (!activePair) return;
    const target = document.getElementById(activePair.targetId);
    if (!target) return;
    setActiveKey(null);
    const reader = target.closest<HTMLElement>(".route-frame__scroll");
    const behavior = window.matchMedia("(prefers-reduced-motion: reduce)")
      .matches
      ? "instant"
      : "smooth";
    scrollReaderToTarget(target, reader, behavior);
  };

  return (
    <section
      className={`exp-atlas${showStages ? " is-expanded" : ""}${selectedStage ? " has-branch" : ""}`}
      aria-label="Interactive experiment map"
      onKeyDown={(event) => {
        if (event.key !== "Escape" || !showStages || activeKey) return;
        event.preventDefault();
        if (expandedStage) {
          stageRefs.current.get(expandedStage)?.focus({ preventScroll: true });
          setExpandedStage(null);
        } else {
          centreRef.current?.focus({ preventScroll: true });
          setShowStages(false);
        }
      }}
    >
      <div ref={mapRef} className="exp-atlas__map">
        <svg
          className="exp-atlas__connections"
          viewBox={`0 0 ${size.width} ${size.height}`}
          aria-hidden="true"
          focusable="false"
        >
          {showStages ? (
            <>
              <ellipse
                className="exp-atlas__orbit"
                cx={centre.x}
                cy={centre.y}
                rx={radiusX}
                ry={radiusY}
              />
              {experimentRingStages.map((stage, index) => (
                <path
                  key={stage.number}
                  className={`exp-atlas__spoke${expandedStage === stage.number ? " is-selected" : ""}`}
                  d={spokePath(centre, hubs[index])}
                  color={stage.color}
                />
              ))}
            </>
          ) : null}
          {selectedStage
            ? leafPoints.map((point, index) => {
                const hub = hubs[selectedIndex];
                const startX = hub.x + 28;
                const endX = point.x;
                const controlX = startX + (endX - startX) * 0.6;
                return (
                  <path
                    key={leaves[index].pair.key}
                    className="exp-atlas__branch"
                    color={selectedStage.color}
                    d={`M ${startX} ${hub.y} C ${controlX} ${hub.y}, ${controlX} ${point.y}, ${endX} ${point.y}`}
                  />
                );
              })
            : null}
        </svg>

        <div className="exp-atlas__centre-position" style={pointStyle(centre)}>
          <button
            ref={centreRef}
            className="exp-atlas__centre"
            type="button"
            aria-expanded={showStages}
            aria-controls={stagesId}
            aria-describedby={hintId}
            aria-label={
              showStages
                ? "Collapse experiment stages"
                : "Show experiment stages"
            }
            onClick={toggleStages}
          >
            <span className="exp-atlas__centre-circle" aria-hidden="true">
              <AtlasWatercolor seed={8} />
              <span className="exp-atlas__ink">C</span>
              <span className="exp-atlas__toggle">
                {showStages ? "−" : "+"}
              </span>
            </span>
          </button>
        </div>

        <div id={stagesId} className="exp-atlas__stages" hidden={!showStages}>
          {experimentRingStages.map((stage, index) => {
            const isSelected = expandedStage === stage.number;
            return (
              <div
                key={stage.number}
                className="exp-atlas__stage-position"
                style={pointStyle(hubs[index], stage.color)}
              >
                <button
                  ref={(button) => {
                    if (button) stageRefs.current.set(stage.number, button);
                    else stageRefs.current.delete(stage.number);
                  }}
                  type="button"
                  className={`exp-atlas__stage${isSelected ? " is-selected" : ""}`}
                  aria-expanded={isSelected}
                  aria-controls={
                    isSelected ? `${atlasId}-protocols` : undefined
                  }
                  aria-label={`Stage ${stage.number}, ${stage.label}`}
                  onClick={() => toggleStage(stage.number)}
                >
                  <span className="exp-atlas__stage-circle" aria-hidden="true">
                    <AtlasWatercolor seed={15 + index * 7} />
                    <span className="exp-atlas__ink">{stage.number}</span>
                    <span className="exp-atlas__toggle">
                      {isSelected ? "−" : "+"}
                    </span>
                  </span>
                  <span className="exp-atlas__stage-title">{stage.label}</span>
                </button>
              </div>
            );
          })}
        </div>

        {selectedStage ? (
          <div
            id={`${atlasId}-protocols`}
            className="exp-atlas__leaves"
            aria-label={`Stage ${selectedStage.number} protocols`}
          >
            {leaves.map(({ pair, label }, index) => (
              <div
                className="exp-atlas__leaf-position"
                key={pair.key}
                style={pointStyle(leafPoints[index], selectedStage.color)}
              >
                <button
                  type="button"
                  className={`exp-atlas__node${activeKey === pair.key ? " is-active" : ""}`}
                  aria-haspopup="dialog"
                  aria-label={`${pair.code} ${pair.title}`}
                  data-protocol-key={pair.key}
                  onClick={() => setActiveKey(pair.key)}
                >
                  <span className="exp-atlas__node-code" aria-hidden="true">
                    <AtlasWatercolor seed={71 + index * 7} />
                    <span className="exp-atlas__ink">{pair.code}</span>
                  </span>
                  <span className="exp-atlas__node-title">{label}</span>
                  <span className="exp-atlas__node-arrow" aria-hidden="true">
                    ↗
                  </span>
                </button>
              </div>
            ))}
          </div>
        ) : null}
      </div>

      <p className="exp-atlas__instruction" id={hintId} aria-live="polite">
        {selectedStage
          ? `${selectedStage.label} · Select a protocol to view its workflow and materials.`
          : showStages
            ? "Select a numbered stage to explore its protocols."
            : "Start with C, then select a stage to reveal its protocols."}
      </p>

      <WikiProtocolModal
        pair={activePair}
        initialTab="flow"
        onClose={() => setActiveKey(null)}
        onJumpToArticle={jumpToArticle}
      />
    </section>
  );
}

/**
 * Article-level illustrated protocol display used beside the detailed prose.
 * The map modal is the primary viewer; this spread remains a static, readable
 * fallback in the protocol sections themselves.
 */
export function ExperimentProtocolSpread({
  pair,
}: {
  pair: ExperimentProtocolPair;
}): ReactNode {
  if (!pair.hasFigure || typeof pair.flowPage !== "number") {
    return null;
  }

  const flowSize = pair.flowSize ?? [2400, 1800];
  const inventorySize = pair.inventorySize ?? [2400, 1800];

  return (
    <figure
      className="exp-protocol-spread"
      aria-label={`Illustrated protocol for ${pair.code} ${pair.title}`}
    >
      <figcaption className="exp-protocol-spread__heading">
        <strong>{pair.title}</strong>
      </figcaption>
      {pair.boundary ? (
        <p className="exp-protocol-spread__boundary">{pair.boundary}</p>
      ) : null}
      <div className="exp-protocol-spread__images">
        <a
          className="exp-protocol-spread__workflow"
          href={experimentProtocolImage(pair.flowPage)}
          target="_blank"
          rel="noreferrer"
        >
          <span>P{pair.flowPage} · Workflow</span>
          <img
            src={experimentProtocolImage(pair.flowPage)}
            alt={`Workflow diagram for ${pair.title}`}
            width={flowSize[0]}
            height={flowSize[1]}
            loading="lazy"
            decoding="async"
            onError={(event) => {
              event.currentTarget.src = experimentProtocolLocalImage(
                pair.flowPage!,
              );
            }}
          />
          <small>View full image ↗</small>
        </a>
        {typeof pair.inventoryPage === "number" ? (
          <details className="exp-protocol-spread__materials">
            <summary>Materials &amp; equipment</summary>
            <a
              href={experimentProtocolImage(pair.inventoryPage)}
              target="_blank"
              rel="noreferrer"
            >
              <span>P{pair.inventoryPage} · Materials &amp; equipment</span>
              <img
                src={experimentProtocolImage(pair.inventoryPage)}
                alt={`Illustrated materials and equipment for ${pair.title}`}
                width={inventorySize[0]}
                height={inventorySize[1]}
                loading="lazy"
                decoding="async"
                onError={(event) => {
                  event.currentTarget.src = experimentProtocolLocalImage(
                    pair.inventoryPage!,
                  );
                }}
              />
              <small>View full image ↗</small>
            </a>
          </details>
        ) : null}
      </div>
    </figure>
  );
}
