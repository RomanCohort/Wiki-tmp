import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
const ringImage = "https://static.igem.wiki/teams/6056/wiki/files/pages/home/scene-1-layer-4.webp";
const targetImage = "https://static.igem.wiki/teams/6056/wiki/files/pages/home/scene-2-layer-6.webp";
const immuneImage = "https://static.igem.wiki/teams/6056/wiki/files/pages/home/scene-2-layer-5.webp";
import { useAntigenDrag } from "../../hooks/useAntigenDrag";
import { useAntigenMechanism } from "../../hooks/useAntigenMechanism";
import {
  HOME_EASE,
  HOME_SCRUB,
  settleHomeScrubEndpoint,
} from "../../hooks/homeMotion";
import { HOME_PLAYBACK_ANTIGEN_EVENT } from "../../utils/homePlayback";
import "../../styles/home-antigen-switch.css";

const antigens = [
  { name: "A", color: "#a65370" },
  { name: "B", color: "#a17755" },
  { name: "C", color: "#7c699f" },
] as const;

// Illustrative peptide identities; these are not molecular structures.
const epitopes = [
  "M0 -6 C1 -6 1 -5 2 -4 C3 -2 6 3 5 5 C4 6 -4 6 -5 4 C-6 3 -2 -5 0 -6",
  "M-4 -5 C-1 -6 4 -6 5 -4 C6 -1 6 4 4 5 C1 6 -4 6 -5 4 C-6 1 -6 -4 -4 -5",
  "M0 -6 C2 -6 6 -2 6 0 C6 2 2 6 0 6 C-2 6 -6 2 -6 0 C-6 -2 -2 -6 0 -6",
];
// Matching cubic segments let the same outline become the processed peptide.
const nascentProteinPath =
  "M0 0 C0 -7 10 -6 8 -12 C6 -18 -4 -18 2 -22 C8 -26 12 -28 5 -33 C5 -33 5 -33 5 -33";
const processedProteinPath =
  "M0 0 C0 -2 3 -3 2 -5 C2 -5 2 -5 2 -5 C2 -5 2 -5 2 -5 C2 -5 2 -5 2 -5";
const ribosomeFrame = "translate(260.6 72.6) rotate(55)";
const ribosomeExit = "translate(7 -23)";
// Split the painted receptor along its natural attachment, not a straight cut.
const receptorEdge =
  "M99 56 C98 61 97 64 96 67 C94 70 94 73 96 76 C98 82 97 88 93 98 H137 V56 Z";
const productEpitopes = epitopes.map((path) =>
  path.replace(
    /-?\d+(?:\.\d+)?/g,
    (coordinate) => `${Number(coordinate) * 1.4}`,
  ),
);
const phaseLabels = [
  "Antigen sequence",
  "Antigen translation",
  "Processing & presentation",
  "T-cell priming",
  "Activated T cell",
  "Tumor recognition",
  "Cytotoxic response",
  "Target-cell apoptosis",
];

const apoptoticBodies = [
  { x: -50, y: -34, size: 28 },
  { x: 42, y: -28, size: 24 },
  { x: 36, y: 48, size: 30 },
];

// Preserve the original watercolour texture while identifying each module.
function textureMatrix(color: string) {
  return (
    [1, 3, 5]
      .map((offset) => {
        const channel = parseInt(color.slice(offset, offset + 2), 16) / 255;
        return `0.12756 0.42912 0.04332 0 ${channel - 0.3}`;
      })
      .join(" ") + " 0 0 0 1 0"
  );
}

// The source regions include the painted edges and surrounding fragments.
const targetCells = [
  {
    path: "M-5 204 H152 L186 242 H260 V410 H-5 Z",
    center: [125, 307],
    label: [119, 437],
    peptide: [55, 304],
  },
  {
    path: "M149 70 H321 V140 H342 V202 H308 V242 H188 L149 192 Z",
    center: [227, 155],
    label: [194, 23],
    peptide: [172, 146],
  },
  {
    path: "M325 -5 H455 V244 H342 V140 H325 Z",
    center: [392, 117],
    label: [390, 279],
    peptide: [350, 60],
  },
] as const;

function Peptide({ index }: { index: number }) {
  return (
    <g
      className="home-antigen-switch__peptide-shape"
      fill={antigens[index].color}
    >
      <path
        d={epitopes[index]}
        stroke={antigens[index].color}
        strokeWidth="1.15"
        strokeLinejoin="round"
      />
    </g>
  );
}

type AntigenViewProps = {
  view: "overview" | "mechanism";
  selected: number;
  select: (index: number) => void;
  hasInteracted: boolean;
  interact: () => void;
  active: boolean;
  interactive: boolean;
};

function AntigenView({
  view,
  selected,
  select,
  hasInteracted,
  interact,
  active,
  interactive,
}: AntigenViewProps) {
  const root = useRef<HTMLDivElement>(null);
  const mechanismExpanded = view === "mechanism";
  const { phase, playing, replay } = useAntigenMechanism(root, selected, {
    growing: nascentProteinPath,
    processed: processedProteinPath,
    peptide: productEpitopes[selected],
  }, mechanismExpanded && active);
  const id = useId().replace(/:/g, "");
  const slotId = id + "-slot";
  const backboneId = id + "-backbone";
  const seamId = id + "-seam";
  const filterUrl = (index: number) => "url(#" + id + "-antigen-" + index + ")";
  const antigen = antigens[selected];
  const handleSelect = useCallback(
    (index: number) => {
      select(index);
      interact();
      if (mechanismExpanded && active) replay();
    },
    [active, interact, mechanismExpanded, replay, select],
  );
  useAntigenDrag(root, handleSelect);
  useEffect(() => {
    if (!mechanismExpanded) return;
    const onPlaybackAntigen = (event: Event) => {
      const index = (event as CustomEvent<{ selected: number }>).detail.selected;
      if (!Number.isInteger(index) || index < 0 || index >= antigens.length)
        return;
      select(index);
      interact();
      if (active) replay();
    };
    window.addEventListener(HOME_PLAYBACK_ANTIGEN_EVENT, onPlaybackAntigen);
    return () => {
      window.removeEventListener(HOME_PLAYBACK_ANTIGEN_EVENT, onPlaybackAntigen);
    };
  }, [active, interact, mechanismExpanded, replay, select]);

  return (
    <div
      ref={root}
      className="home-antigen-switch"
      data-antigen-view={view}
      data-mechanism-expanded={mechanismExpanded}
      inert={!interactive}
      data-guidance={!hasInteracted}
      data-phase={mechanismExpanded ? phase : 0}
      data-playing={mechanismExpanded && playing}
      data-primed={mechanismExpanded && phase >= 4}
      data-engaged={mechanismExpanded && phase >= 5}
      data-apoptosis={mechanismExpanded && phase === 7}
      data-selected-filter={filterUrl(selected)}
      style={
        {
          "--selected-color": antigen.color,
        } as CSSProperties
      }
    >
      <div className="home-antigen-switch__content">
        <div className="home-antigen-switch__diagram" id={id + "-diagram"}>
          <div className="home-antigen-switch__rna" data-antigen-ring>
            <svg
              viewBox="0 0 300 300"
              role="img"
              aria-label="Closed circRNA backbone with a replaceable antigen-encoding sequence. Sequence replacement happens during construct design."
            >
              {/* Shared resources stay available while the ring is carried. */}
              <defs style={{ visibility: "visible" }}>
                <linearGradient id={id + "-ribosome-wash"} x2="85%" y2="100%">
                  <stop stopColor="#efdecc" />
                  <stop offset="0.55" stopColor="#e2c9b1" />
                  <stop offset="1" stopColor="#d2b395" />
                </linearGradient>
                <filter id={id + "-ribosome-paper"}>
                  <feTurbulence
                    type="fractalNoise"
                    baseFrequency="0.17"
                    numOctaves="2"
                    seed="11"
                    result="paper"
                  />
                  <feColorMatrix in="paper" type="saturate" values="0" />
                  <feComponentTransfer>
                    <feFuncA type="linear" slope="0.16" />
                  </feComponentTransfer>
                  <feComposite in2="SourceGraphic" operator="in" />
                  <feBlend in="SourceGraphic" mode="soft-light" />
                </filter>
                <clipPath id={id + "-tcell-crop"}>
                  <ellipse cx="147" cy="207" rx="54" ry="52" />
                </clipPath>
                <clipPath id={id + "-mhc-crop"}>
                  <path d={receptorEdge} />
                </clipPath>
                <clipPath id={id + "-tcr-crop"}>
                  <path d="M137 56 H184 V98 H137 Z" />
                </clipPath>
                <filter id={id + "-dc-seam"}>
                  <feGaussianBlur stdDeviation="0.8" />
                </filter>
                <mask
                  id={id + "-dc-clean"}
                  maskUnits="userSpaceOnUse"
                  x="0"
                  y="0"
                  width="123"
                  height="135"
                  style={{ maskType: "luminance" }}
                >
                  <rect width="123" height="135" fill="white" />
                  {/* The original painting already contains this receptor. */}
                  <path
                    d={receptorEdge}
                    fill="black"
                    filter={"url(#" + id + "-dc-seam)"}
                  />
                </mask>
                <mask
                  id={id + "-receptor-clean"}
                  maskUnits="userSpaceOnUse"
                  x="0"
                  y="0"
                  width="516"
                  height="259"
                  style={{ maskType: "luminance" }}
                >
                  <rect width="516" height="259" fill="white" />
                  <ellipse cx="134" cy="78" rx="7.2" ry="9" fill="black" />
                  <rect x="128.5" y="84.5" width="1" height="1" fill="black" />
                </mask>
                <filter
                  id={id + "-tcell-wash"}
                  colorInterpolationFilters="sRGB"
                  filterUnits="userSpaceOnUse"
                  x="90"
                  y="153"
                  width="115"
                  height="106"
                >
                  <feColorMatrix
                    type="matrix"
                    values={textureMatrix("#879c71")}
                  />
                </filter>
                <symbol id={id + "-painted-tcell"} viewBox="90 153 115 106">
                  <image
                    href={immuneImage}
                    width="516"
                    height="259"
                    clipPath={"url(#" + id + "-tcell-crop)"}
                    filter={"url(#" + id + "-tcell-wash)"}
                  />
                </symbol>
                <symbol id={id + "-painted-mhc"} viewBox="94 56 43 42">
                  <image
                    href={immuneImage}
                    width="516"
                    height="259"
                    clipPath={"url(#" + id + "-mhc-crop)"}
                    mask={"url(#" + id + "-receptor-clean)"}
                  />
                </symbol>
                <symbol id={id + "-painted-tcr"} viewBox="137 56 47 42">
                  <image
                    href={immuneImage}
                    width="516"
                    height="259"
                    clipPath={"url(#" + id + "-tcr-crop)"}
                    mask={"url(#" + id + "-receptor-clean)"}
                  />
                </symbol>
                <filter id={seamId}>
                  <feGaussianBlur stdDeviation="0.8" />
                </filter>
                <mask
                  id={slotId}
                  maskUnits="userSpaceOnUse"
                  x="-5"
                  y="-5"
                  width="310"
                  height="310"
                  style={{ maskType: "alpha" }}
                >
                  <path
                    d="M150 150 L65 -40 L235 -40 Z"
                    fill="white"
                    filter={"url(#" + seamId + ")"}
                  />
                </mask>
                <mask
                  id={backboneId}
                  maskUnits="userSpaceOnUse"
                  x="-5"
                  y="-5"
                  width="310"
                  height="310"
                  style={{ maskType: "luminance" }}
                >
                  <rect width="300" height="300" fill="white" />
                  <path
                    d="M150 150 L65 -40 L235 -40 Z"
                    fill="black"
                    filter={"url(#" + seamId + ")"}
                  />
                </mask>
                {antigens.map((item, index) => (
                  <filter
                    key={item.name}
                    id={id + "-antigen-" + index}
                    colorInterpolationFilters="sRGB"
                  >
                    <feColorMatrix
                      type="matrix"
                      values={textureMatrix(item.color)}
                    />
                  </filter>
                ))}
              </defs>
              <g className="home-antigen-switch__assembly">
                <image
                  href={ringImage}
                  width="300"
                  height="300"
                  preserveAspectRatio="none"
                  mask={"url(#" + backboneId + ")"}
                />
                <g data-antigen-installed>
                  <image
                    href={ringImage}
                    width="300"
                    height="300"
                    preserveAspectRatio="none"
                    mask={"url(#" + slotId + ")"}
                    filter={filterUrl(selected)}
                  />
                </g>
              </g>
              <path
                className="home-antigen-switch__guide"
                d="M84 15 Q150 -13 216 15"
              />
              {/* Transit measures the fixed release point after translation. */}
              <g data-antigen-product-frame transform={ribosomeFrame}>
                <g data-antigen-product-origin transform={ribosomeExit} />
              </g>
              <g
                className="home-antigen-switch__ribosome-orbit"
                aria-hidden="true"
              >
                {/* The RNA channel and exit share a tangent-aligned frame. */}
                <g transform={ribosomeFrame}>
                  <g className="home-antigen-switch__ribosome">
                    <path
                      className="home-antigen-switch__rna-channel"
                      d="M-25 2.3 Q0 -1 25 2.3"
                    />
                    <g filter={"url(#" + id + "-ribosome-paper)"}>
                      <g
                        className="home-antigen-switch__ribosome-subunit"
                        fill={"url(#" + id + "-ribosome-wash)"}
                      >
                        <path d="M-23 -5 C-26 -12 -18 -25 -9 -26 C-4 -30 3 -27 7 -28 C16 -29 25 -19 23 -11 Q24 -5 17 -3 Q1 -5 -12 -4 Q-19 -3 -23 -5 Z" />
                        <path d="M-18 5 Q-12 2 -3 5 Q9 3 17 6 C23 12 16 21 6 21 Q-7 23 -16 16 Q-21 11 -18 5 Z" />
                      </g>
                      <path
                        className="home-antigen-switch__ribosome-wash"
                        d="M-19 -10 Q-17 -21 -7 -23 Q6 -27 16 -20 Q8 -23 0 -19 Q-10 -15 -19 -10 Z M-14 8 Q-3 9 13 8 Q10 14 -2 16 Q-12 16 -14 8 Z"
                      />
                      <path
                        className="home-antigen-switch__ribosome-detail"
                        d="M-15 -8 Q-3 -12 13 -8 M-11 8 Q-1 10 10 8"
                      />
                      <path
                        className="home-antigen-switch__ribosome-exit"
                        d="M4 -24 Q7 -22 10 -24"
                      />
                    </g>
                  </g>
                  <g transform={ribosomeExit}>
                    <g className="home-antigen-switch__product-route">
                      {[" home-antigen-switch__protein-wash", ""].map(
                        (wash) => (
                          <path
                            key={wash}
                            className={"home-antigen-switch__protein" + wash}
                            d={productEpitopes[selected]}
                            pathLength="1"
                          />
                        ),
                      )}
                    </g>
                  </g>
                </g>
              </g>
            </svg>
            <span className="home-antigen-switch__center" aria-hidden="true">
              circRNA
            </span>
          </div>
          <div className="home-antigen-switch__bridge" aria-hidden={!mechanismExpanded}>
            <svg
              data-antigen-bridge
              className="home-antigen-switch__arrow"
              viewBox="-24 -8 310 183"
              fill="none"
              role="img"
              aria-label="A dendritic cell primes one representative CD8-positive T cell, which moves to a matching tumor target and releases cytotoxic proteins."
            >
              <g>
                <path
                  className="home-antigen-switch__arrow-shaft home-antigen-switch__flow-in"
                  d="M-20 67 Q-2 61 16 65"
                  pathLength="1"
                />
                <path
                  className="home-antigen-switch__arrow-head home-antigen-switch__flow-in"
                  d="M9 58 L17 65 L9 70"
                  pathLength="1"
                />
              </g>
              {/* Both image crops share the source painting's 0.8 scale. */}
              <svg
                data-antigen-dc
                className="home-antigen-switch__dendritic-cell"
                x="32.8"
                y="4.4"
                width="98.4"
                height="108"
                viewBox="0 0 123 135"
                overflow="hidden"
              >
                <defs>
                  <filter
                    id={id + "-dc-wash"}
                    colorInterpolationFilters="sRGB"
                    filterUnits="userSpaceOnUse"
                    x="-4"
                    y="-4"
                    width="131"
                    height="143"
                  >
                    <feColorMatrix
                      type="matrix"
                      values={textureMatrix("#8b739a")}
                    />
                  </filter>
                </defs>
                <image
                  href={immuneImage}
                  width="516"
                  height="259"
                  filter={"url(#" + id + "-dc-wash)"}
                  mask={"url(#" + id + "-dc-clean)"}
                />
              </svg>
              <g>
                <ellipse
                  className="home-antigen-switch__binding-wash"
                  cx="140"
                  cy="67"
                  rx="18"
                  ry="22"
                />
                <g className="home-antigen-switch__presenter">
                  <use
                    href={"#" + id + "-painted-mhc"}
                    x="108"
                    y="49"
                    width="34.4"
                    height="34"
                  />
                </g>
                <g
                  className="home-antigen-switch__presented-peptide"
                  transform="translate(140 67) scale(1.4)"
                >
                  <Peptide index={selected} />
                </g>
                <g
                  className="home-antigen-switch__tcell"
                  transform="translate(216 74) scale(1.1)"
                  data-antigen-tcell
                >
                  <g className="home-antigen-switch__activation-glow">
                    <ellipse
                      className="home-antigen-switch__activation-wash"
                      cx="0"
                      cy="-2"
                      rx="47"
                      ry="48"
                    />
                    <ellipse
                      className="home-antigen-switch__activation-ring"
                      cx="0"
                      cy="-2"
                      rx="42"
                      ry="43"
                    />
                  </g>
                  <use
                    href={"#" + id + "-painted-tcell"}
                    x="-45"
                    y="-46"
                    width="90"
                    height="92"
                  />
                  <g transform="translate(0 -6)">
                    <g className="home-antigen-switch__tcr-turn">
                      <use
                        href={"#" + id + "-painted-tcr"}
                        x="-55"
                        y="-16.7"
                        width="34.4"
                        height="31.1"
                      />
                      {/* An empty receptor pocket stays on the T cell. */}
                      <g
                        className="home-antigen-switch__tcr-site"
                        transform="translate(-55 0)"
                        data-antigen-tcr-site
                      >
                        <path
                          className="home-antigen-switch__tcr-outline"
                          d="M-7 -9 Q7 -10 7 0 Q7 10 -7 9"
                          transform="scale(1.4)"
                        />
                      </g>
                    </g>
                  </g>
                  <g transform="translate(0 -6)">
                    <g className="home-antigen-switch__cytotoxic-turn">
                      <circle
                        className="home-antigen-switch__synapse"
                        cx="55"
                        cy="0"
                        r="17"
                      />
                      {[0, 1, 2].map((index) => (
                        <g
                          key={index}
                          className="home-antigen-switch__granule"
                          aria-hidden="true"
                        >
                          <ellipse rx="6" ry="5" fill="#c0a06d" opacity="0.2" />
                          <path
                            d="M-4 -1 Q-4 -4 0 -3 Q5 -3 4 1 Q3 4 -1 3 Q-5 2 -4 -1"
                            fill="#ac8b58"
                            opacity="0.8"
                          />
                        </g>
                      ))}
                    </g>
                  </g>
                  <text
                    x="0"
                    y="63"
                    className="home-antigen-switch__tcell-label"
                  >
                    CD8⁺ T
                  </text>
                  <text
                    x="0"
                    y="81"
                    className="home-antigen-switch__tcell-sub-label"
                  >
                    TCR
                  </text>
                </g>
                <path
                  className="home-antigen-switch__priming-contact"
                  d="M132 57 Q146 64 135 76"
                />
              </g>
              <text
                x="72"
                y="142"
                className="home-antigen-switch__bridge-label home-antigen-switch__dc-label"
              >
                Dendritic cell
                <tspan
                  x="72"
                  dy="20"
                  className="home-antigen-switch__molecule-label home-antigen-switch__presentation-label"
                >
                  peptide–MHC-I
                </tspan>
              </text>
            </svg>
            <span
              className="home-antigen-switch__phase-label"
              aria-hidden="true"
            >
              {phaseLabels.map((label, index) => (
                <span key={label} data-active={phase === index}>
                  {label}
                </span>
              ))}
            </span>
          </div>
          <div className="home-antigen-switch__target" aria-hidden={!mechanismExpanded}>
            <svg
              viewBox="-45 -12 510 470"
              role="img"
              aria-label={`Illustrative tumor cells with peptide–MHC-I A, B and C. Target ${antigen.name} matches the selected peptide. A successful cytotoxic response is shown as target-cell apoptosis; compatible HLA is required and recognition alone does not guarantee killing.`}
            >
              <defs>
                <clipPath id={id + "-apoptotic-body-crop"}>
                  <circle cx="125" cy="307" r="17" />
                </clipPath>
                <symbol id={id + "-apoptotic-body"} viewBox="108 290 34 34">
                  <image
                    href={targetImage}
                    width="450"
                    height="402"
                    clipPath={"url(#" + id + "-apoptotic-body-crop)"}
                  />
                </symbol>
                {targetCells.map((cell, index) => (
                  <clipPath key={index} id={id + "-cell-" + index}>
                    <path d={cell.path} />
                  </clipPath>
                ))}
              </defs>
              {targetCells.map((cell, index) => (
                <g
                  key={antigens[index].name}
                  className="home-antigen-switch__cell"
                  data-target-cell={antigens[index].name}
                  data-active={selected === index}
                  style={
                    {
                      "--cell-origin": `${cell.center[0]}px ${cell.center[1]}px`,
                      "--cell-color": antigens[index].color,
                    } as CSSProperties
                  }
                >
                  <g
                    className="home-antigen-switch__cell-response"
                    data-cell-response
                  >
                    <image
                      href={targetImage}
                      width="450"
                      height="402"
                      clipPath={"url(#" + id + "-cell-" + index + ")"}
                      filter={filterUrl(index)}
                    />
                  </g>
                  <g
                    transform={`translate(${cell.center[0]} ${cell.center[1]})`}
                    aria-hidden="true"
                  >
                    {apoptoticBodies.map((body, bodyIndex) => (
                      <g
                        key={bodyIndex}
                        className="home-antigen-switch__apoptotic-body"
                        style={
                          {
                            "--body-start-x": `${body.x * 0.7}px`,
                            "--body-start-y": `${body.y * 0.7}px`,
                            "--body-end-x": `${body.x}px`,
                            "--body-end-y": `${body.y}px`,
                          } as CSSProperties
                        }
                      >
                        <use
                          href={"#" + id + "-apoptotic-body"}
                          x={-body.size / 2}
                          y={-body.size / 2}
                          width={body.size}
                          height={body.size}
                          filter={filterUrl(index)}
                        />
                      </g>
                    ))}
                  </g>
                  <g
                    className="home-antigen-switch__tumor-peptide"
                    data-antigen-contact={index}
                    transform={`translate(${cell.peptide[0]} ${cell.peptide[1]}) rotate(-90)`}
                  >
                    <path d="M-11 -8 Q-14 9 0 11 Q14 9 11 -8 M0 11 V22" />
                    <Peptide index={index} />
                  </g>
                  <text
                    x={cell.label[0]}
                    y={cell.label[1]}
                    className="home-antigen-switch__cell-label"
                  >
                    <tspan className="home-antigen-switch__cell-prefix">
                      Target{" "}
                    </tspan>
                    {antigens[index].name}
                    <tspan
                      x={cell.label[0]}
                      dy="30"
                      className="home-antigen-switch__target-status"
                    >
                      Apoptosis
                    </tspan>
                  </text>
                </g>
              ))}
            </svg>
          </div>
        </div>
        <div className="home-antigen-switch__copy">
          <h3>Like changing <em>a key.</em></h3>
          <p>
            Drag or select an antigen sequence to explore the same backbone
            with a different target.
          </p>
          <p>
            Our design separates the shared circRNA backbone from the
            antigen-encoding sequence. A, B and C illustrate this concept;
            they are not experimental results.
          </p>
        </div>
        <div
          className="home-antigen-switch__options"
          role="group"
          aria-label="Drag an antigen-encoding sequence to the top of the ring, or select it"
        >
          <span className="home-antigen-switch__hint" aria-hidden="true">
            <span>↖</span> Drag or click
          </span>
          {antigens.map((item, index) => (
            <button
              key={item.name}
              className="home-antigen-switch__option"
              type="button"
              data-antigen-option={index}
              data-filter={filterUrl(index)}
              data-color={item.color}
              aria-pressed={selected === index}
              aria-label={"Use antigen sequence " + item.name}
              style={{ "--option-color": item.color } as CSSProperties}
            >
              <svg viewBox="80 0 140 65" aria-hidden="true">
                <image
                  href={ringImage}
                  width="300"
                  height="300"
                  preserveAspectRatio="none"
                  mask={"url(#" + slotId + ")"}
                  filter={filterUrl(index)}
                />
              </svg>
              <span>Sequence {item.name}</span>
            </button>
          ))}
        </div>
        <div className="home-antigen-switch__footer">
          <details className="home-antigen-switch__science">
            <summary>Mechanism notes</summary>
            <div className="home-antigen-switch__science-content">
              <section>
                <h4>Construct design &amp; antigen presentation</h4>
                <p>
                  Change the <strong>antigen-encoding sequence</strong> during
                  construct design. Inside a dendritic cell, <strong>circRNA is
                  translated into antigen</strong>; processing releases peptides
                  for <strong>MHC-I presentation</strong>.
                </p>
              </section>
              <section>
                <h4>CD8⁺ T-cell priming</h4>
                <p>
                  Dendritic cells prime <strong>antigen-specific CD8⁺ T
                  cells</strong>, which can recognize matching
                  <strong> peptide–MHC-I</strong> on tumor cells with
                  <strong> compatible HLA</strong>.
                </p>
                <p>
                  The peptide–MHC-I <strong>stays on the dendritic cell</strong>
                  {" "}during priming; it is not handed to the T cell. The
                  dendritic cell and tumor each present their own peptide–MHC-I.
                </p>
              </section>
              <section>
                <h4>How to read the illustration</h4>
                <ul>
                  <li>
                    <strong>Enlarged view.</strong> The circRNA is an enlarged
                    view of translation inside the dendritic cell; movement
                    between views is schematic.
                  </li>
                  <li>
                    <strong>TCR outline.</strong> The TCR remains attached to
                    the T cell during migration. Its open outline represents a
                    receptor pocket, not a carried antigen.
                  </li>
                  <li>
                    <strong>Colored aura.</strong> The colored aura marks
                    T-cell activation and follows the T cell; the dendritic-cell
                    presentation fades from view as attention shifts to the
                    target.
                  </li>
                  <li>
                    <strong>Target shapes.</strong> Shapes on the target show
                    presented peptide identities, not a pre-existing TCR match.
                  </li>
                </ul>
              </section>
              <section>
                <h4>Recognition &amp; target-cell killing</h4>
                <p>
                  After recognition, an effector CD8⁺ T cell can release
                  <strong> perforin and granzymes</strong> toward the target,
                  triggering <strong>apoptosis</strong>. Only the matching
                  target contracts and forms apoptotic bodies; the T cell
                  remains intact.
                </p>
                <p>
                  <strong>Recognition alone does not guarantee killing.</strong>
                </p>
              </section>
              <section>
                <h4>Scope &amp; limitations</h4>
                <p>
                  A/B/C and the shapes are illustrative. One representative T
                  cell is followed; delivery, costimulation, expansion and
                  migration are simplified and time-compressed.
                </p>
                <p>
                  This is a <strong>possible mechanism</strong>, not evidence
                  of efficacy for this construct. <strong>Each new target
                  requires its own validation.</strong>
                </p>
              </section>
              <p className="home-antigen-switch__science-source">
                <a
                  href="https://www.ncbi.nlm.nih.gov/books/NBK27101/"
                  target="_blank"
                  rel="noreferrer"
                >
                  T-cell cytotoxicity · NCBI
                </a>
              </p>
            </div>
          </details>
          <button
            className="home-antigen-switch__replay"
            type="button"
            onClick={replay}
            aria-label="Replay the antigen mechanism"
          >
            ↻ Replay
          </button>
        </div>
      </div>
      <div
        className="home-antigen-switch__ghost"
        data-antigen-ghost
        hidden
        aria-hidden="true"
      >
        <svg viewBox="80 0 140 65">
          <image
            href={ringImage}
            width="300"
            height="300"
            preserveAspectRatio="none"
            mask={"url(#" + slotId + ")"}
          />
        </svg>
      </div>
      <p className="story-sr-only" role="status" aria-live="polite">
        Antigen-encoding sequence {antigen.name} selected.{" "}
        {mechanismExpanded
          ? `${phaseLabels[phase]}. Conceptual mechanism.`
          : "Shared circRNA backbone with a replaceable antigen sequence."}
      </p>
    </div>
  );
}

export function HomeAntigenSwitch() {
  const root = useRef<HTMLDivElement>(null);
  const advance = useRef<((index: number) => void) | null>(null);
  const [selected, setSelected] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [mechanismActive, setMechanismActive] = useState(false);
  const [flowLayout, setFlowLayout] = useState(false);
  const interact = useCallback(() => setHasInteracted(true), []);
  const selectOverview = useCallback((index: number) => {
    setSelected(index);
    advance.current?.(index);
  }, []);

  useEffect(() => {
    const story = root.current;
    const chapter = story?.closest<HTMLElement>(".story-chapter");
    const overview = story?.querySelector<HTMLElement>(
      '[data-antigen-view="overview"]',
    );
    const mechanism = story?.querySelector<HTMLElement>(
      '[data-antigen-view="mechanism"]',
    );
    const copy = overview?.querySelector<HTMLElement>(
      ".home-antigen-switch__copy",
    );
    const overviewRing = overview?.querySelector<HTMLElement>(
      "[data-antigen-ring]",
    );
    const overviewOptions = overview?.querySelector<HTMLElement>(
      ".home-antigen-switch__options",
    );
    const mechanismRing = mechanism?.querySelector<HTMLElement>(
      "[data-antigen-ring]",
    );
    const mechanismOptions = mechanism?.querySelector<HTMLElement>(
      ".home-antigen-switch__options",
    );
    if (
      !chapter ||
      !overview ||
      !mechanism ||
      !copy ||
      !overviewRing ||
      !overviewOptions ||
      !mechanismRing ||
      !mechanismOptions
    )
      return;

    const flow = window.matchMedia(
      "(max-width: 800px) and (orientation: portrait), (max-height: 650px) and (orientation: landscape), (prefers-reduced-motion: reduce)",
    );
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let triggers: ScrollTrigger[] = [];
    let carryTween: gsap.core.Tween | null = null;
    let advanceTween: gsap.core.Tween | null = null;
    const cancelAdvance = () => {
      advanceTween?.kill();
      advanceTween = null;
    };
    // Installation commits before scrolling, which cancels unfinished drags.
    advance.current = (index) => {
      cancelAdvance();
      const transition = triggers.find(
        (trigger) => trigger.vars.id === "home-antigen-overview-transition",
      );
      const header = document.querySelector<HTMLElement>(".site-header");
      const headerBottom = header?.getBoundingClientRect().bottom ?? 0;
      const destination = flow.matches
        ? window.scrollY +
          mechanism.getBoundingClientRect().top -
          headerBottom -
          24
        : transition?.end;
      if (destination === undefined) return;
      const top = Math.max(
        0,
        Math.min(
          document.documentElement.scrollHeight - window.innerHeight,
          destination + (flow.matches ? 0 : 1),
        ),
      );
      if (top <= window.scrollY) return;
      const transferFocus = overview.contains(document.activeElement);
      const complete = () => {
        advanceTween = null;
        if (transferFocus) {
          mechanismOptions
            .querySelector<HTMLButtonElement>(
              `[data-antigen-option="${index}"]`,
            )
            ?.focus({ preventScroll: true });
        }
      };
      const scroll = (y: number) => {
        window.scrollTo({ top: y, behavior: "instant" });
        ScrollTrigger.update();
      };
      if (reducedMotion.matches) {
        scroll(top);
        complete();
        return;
      }
      const position = { y: window.scrollY };
      advanceTween = gsap.to(position, {
        y: top,
        duration: 1.1,
        ease: HOME_EASE,
        onUpdate: () => scroll(position.y),
        onComplete: complete,
      });
    };
    const alpha = (element: HTMLElement, value: number) => {
      element.style.opacity = String(value);
      element.style.visibility = value < 0.001 ? "hidden" : "visible";
    };
    const smooth = (value: number) => {
      const p = Math.max(0, Math.min(1, value));
      return p * p * (3 - 2 * p);
    };
    const overviewName = overviewRing.querySelector<HTMLElement>(
      ".home-antigen-switch__center",
    );
    const mechanismName = mechanismRing.querySelector<HTMLElement>(
      ".home-antigen-switch__center",
    );
    const optionCarries = Array.from(overviewOptions.children, (element, index) => ({
      element: element as HTMLElement,
      target: mechanismOptions.children[index] as HTMLElement,
      dx: 0,
      dy: 0,
      sx: 1,
      sy: 1,
    }));
    const resetOptionCarry = () => {
      optionCarries.forEach(({ element }) => {
        element.style.removeProperty("transform");
        element.style.removeProperty("transform-origin");
      });
    };
    let carryGeometry = { dx: 0, dy: 0, sx: 1, sy: 1, fromFont: 46, toFont: 46 };
    const measureCarry = () => {
      overviewRing.style.removeProperty("transform");
      overviewName?.style.removeProperty("font-size");
      resetOptionCarry();
      const from = overviewRing.getBoundingClientRect();
      const to = mechanismRing.getBoundingClientRect();
      carryGeometry = {
        dx: to.left - from.left,
        dy: to.top - from.top,
        sx: to.width / from.width,
        sy: to.height / from.height,
        fromFont: overviewName ? parseFloat(getComputedStyle(overviewName).fontSize) : 46,
        toFont: mechanismName ? parseFloat(getComputedStyle(mechanismName).fontSize) : 46,
      };
      optionCarries.forEach((item) => {
        const start = item.element.getBoundingClientRect();
        const end = item.target.getBoundingClientRect();
        item.dx = end.left - start.left;
        item.dy = end.top - start.top;
        item.sx = end.width / start.width;
        item.sy = end.height / start.height;
        item.element.style.transformOrigin = "top left";
      });
    };
    const build = () => {
      cancelAdvance();
      carryTween?.kill();
      carryTween = null;
      triggers.forEach((trigger) => trigger.kill());
      triggers = [];
      setFlowLayout(flow.matches);
      if (flow.matches) {
        alpha(overview, 1);
        alpha(mechanism, 1);
        mechanism.style.removeProperty("background-color");
        overviewRing.style.removeProperty("transform");
        overviewRing.style.removeProperty("opacity");
        overviewName?.style.removeProperty("font-size");
        overviewOptions.style.removeProperty("opacity");
        overviewOptions.inert = false;
        resetOptionCarry();
        mechanismRing.style.removeProperty("opacity");
        mechanismOptions.style.removeProperty("opacity");
        setMechanismActive(false);
        const fade = reducedMotion.matches
          ? null
          : ScrollTrigger.create({
              id: "home-antigen-overview-fade",
              trigger: copy,
              start: "top 48%",
              end: "bottom 12%",
              onUpdate: ({ progress }) => {
                copy.style.opacity = String(1 - smooth(progress));
              },
            });
        const entry = ScrollTrigger.create({
          id: "home-antigen-mechanism-entry",
          trigger: mechanism,
          start: "top 72%",
          end: "bottom top",
          onEnter: () => setMechanismActive(true),
          onEnterBack: () => setMechanismActive(true),
          onLeaveBack: () => setMechanismActive(false),
        });
        if (fade) triggers.push(fade);
        triggers.push(entry);
        copy.style.opacity = fade ? String(1 - smooth(fade.progress)) : "1";
        setMechanismActive(entry.progress > 0);
        return;
      }

      // Carry the construct and each choice to their measured destinations.
      // Change ownership only when the corresponding painted elements align.
      mechanism.style.backgroundColor = "transparent";
      overviewRing.style.transformOrigin = "top left";
      measureCarry();
      const render = (progress: number) => {
        const travel = smooth((progress - 0.4) / 0.44);
        const handoff = smooth((progress - 0.84) / 0.12);
        copy.style.opacity = String(1 - smooth((progress - 0.18) / 0.4));
        const { dx, dy, sx, sy, fromFont, toFont } = carryGeometry;
        const scaleX = 1 + (sx - 1) * travel;
        overviewRing.style.transform =
          `translate(${dx * travel}px, ${dy * travel}px) ` +
          `scale(${scaleX}, ${1 + (sy - 1) * travel})`;
        if (overviewName) {
          overviewName.style.fontSize = `${gsap.utils.interpolate(fromFont, toFont, travel) / scaleX}px`;
        }
        optionCarries.forEach(({ element, dx, dy, sx, sy }) => {
          element.style.transform =
            `translate(${dx * travel}px, ${dy * travel}px) ` +
            `scale(${1 + (sx - 1) * travel}, ${1 + (sy - 1) * travel})`;
        });
        alpha(overview, 1 - handoff);
        alpha(mechanism, smooth((progress - 0.45) / 0.27));
        // Crossfading translucent watercolour loses pigment and doubles text.
        // Both boxes and label sizes match here, so ownership can change at once.
        const arrived = progress >= 0.84;
        overviewRing.style.opacity = arrived ? "0" : "1";
        mechanismRing.style.opacity = arrived ? "1" : "0";
        overviewOptions.style.opacity = arrived ? "0" : "1";
        overviewOptions.inert = arrived;
        mechanismOptions.style.opacity = arrived ? "1" : "0";
        setMechanismActive(progress >= 0.9);
      };
      const motion = { progress: 0 };
      carryTween = gsap.to(motion, {
        progress: 1,
        duration: 1,
        ease: "none",
        paused: true,
        onUpdate: () => render(motion.progress),
      });
      const trigger = ScrollTrigger.create({
        id: "home-antigen-overview-transition",
        trigger: chapter,
        start: "top top",
        end: () => `+=${Math.round(window.innerHeight * 0.95)}`,
        refreshPriority: -2,
        animation: carryTween,
        scrub: HOME_SCRUB,
        onUpdate: settleHomeScrubEndpoint,
        onRefresh: ({ progress }) => {
          measureCarry();
          carryTween?.progress(progress);
          render(progress);
        },
      });
      triggers.push(trigger);
      render(trigger.progress);
    };
    build();
    window.addEventListener("wheel", cancelAdvance, { passive: true });
    window.addEventListener("touchstart", cancelAdvance, { passive: true });
    window.addEventListener("pointerdown", cancelAdvance, true);
    window.addEventListener("keydown", cancelAdvance, true);
    window.addEventListener("resize", cancelAdvance);
    flow.addEventListener("change", build);
    reducedMotion.addEventListener("change", build);
    return () => {
      advance.current = null;
      cancelAdvance();
      carryTween?.kill();
      window.removeEventListener("wheel", cancelAdvance);
      window.removeEventListener("touchstart", cancelAdvance);
      window.removeEventListener("pointerdown", cancelAdvance, true);
      window.removeEventListener("keydown", cancelAdvance, true);
      window.removeEventListener("resize", cancelAdvance);
      flow.removeEventListener("change", build);
      reducedMotion.removeEventListener("change", build);
      triggers.forEach((trigger) => trigger.kill());
      overview.style.removeProperty("opacity");
      overview.style.removeProperty("visibility");
      mechanism.style.removeProperty("opacity");
      mechanism.style.removeProperty("visibility");
      mechanism.style.removeProperty("background-color");
      overviewRing.style.removeProperty("transform");
      overviewRing.style.removeProperty("transform-origin");
      overviewRing.style.removeProperty("opacity");
      overviewName?.style.removeProperty("font-size");
      overviewOptions.style.removeProperty("opacity");
      overviewOptions.inert = false;
      resetOptionCarry();
      mechanismRing.style.removeProperty("opacity");
      mechanismOptions.style.removeProperty("opacity");
      copy.style.removeProperty("opacity");
    };
  }, []);

  return (
    <div ref={root} className="home-antigen-switch-story">
      <AntigenView
        view="overview"
        selected={selected}
        select={selectOverview}
        hasInteracted={hasInteracted}
        interact={interact}
        active={!mechanismActive}
        interactive={flowLayout || !mechanismActive}
      />
      <AntigenView
        view="mechanism"
        selected={selected}
        select={setSelected}
        hasInteracted={hasInteracted}
        interact={interact}
        active={mechanismActive}
        interactive={flowLayout || mechanismActive}
      />
    </div>
  );
}
