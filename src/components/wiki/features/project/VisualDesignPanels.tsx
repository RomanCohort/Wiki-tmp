import type { ReactNode } from "react";
import "../../../../styles/features/visual-design-panels.css";

/* -------------------------------------------------------------------------- */
/* 1. Palette Swatches Component                                             */
/* -------------------------------------------------------------------------- */

interface ModulePalette {
  id: string;
  module: string;
  colors: Array<{
    role: string;
    hex: string;
    label: string;
  }>;
}

const MODULE_PALETTES: ModulePalette[] = [
  {
    id: "project",
    module: "Project",
    colors: [
      { role: "Main Accent", hex: "#b7d782", label: "Leaf Green" },
      { role: "Heading H2", hex: "#243d2c", label: "Moss Forest" },
      { role: "Subheading H3", hex: "#84382b", label: "Terracotta" },
      { role: "Surface Base", hex: "#f3f7e0", label: "Sage Tint" },
    ],
  },
  {
    id: "wet-lab",
    module: "Wet Lab",
    colors: [
      { role: "Main Accent", hex: "#b4dff0", label: "Ice Blue" },
      { role: "Heading H2", hex: "#14354c", label: "Marine Navy" },
      { role: "Subheading H3", hex: "#88541e", label: "Amber Ochre" },
      { role: "Surface Base", hex: "#fdf5d1", label: "Parchment" },
    ],
  },
  {
    id: "dry-lab",
    module: "Dry Lab",
    colors: [
      { role: "Main Accent", hex: "#9bd6c0", label: "Mint Green" },
      { role: "Heading H2", hex: "#153e34", label: "Pine Slate" },
      { role: "Subheading H3", hex: "#633256", label: "Amethyst Ink" },
      { role: "Surface Base", hex: "#fef6e6", label: "Warm Ivory" },
    ],
  },
  {
    id: "engagement",
    module: "Engagement",
    colors: [
      { role: "Main Accent", hex: "#f0b04a", label: "Warm Ochre" },
      { role: "Heading H2", hex: "#4a2c1d", label: "Coffee Brown" },
      { role: "Subheading H3", hex: "#174a47", label: "Peacock Cyan" },
      { role: "Surface Base", hex: "#fff8d6", label: "Sunlight Pale" },
    ],
  },
  {
    id: "team",
    module: "Team",
    colors: [
      { role: "Main Accent", hex: "#f5cf6f", label: "Bronze Gold" },
      { role: "Heading H2", hex: "#3e2d14", label: "Bronze Ink" },
      { role: "Subheading H3", hex: "#762338", label: "Burgundy" },
      { role: "Surface Base", hex: "#fffbd0", label: "Champagne" },
    ],
  },
];

export function PaletteSwatches() {
  return (
    <div className="palette-swatches" data-wiki-reveal>
      <header className="palette-swatches__header">
        <h4 className="palette-swatches__title">
          Module Colors
        </h4>
      </header>

      <div className="palette-swatches__grid">
        {MODULE_PALETTES.map((item) => (
          <article
            key={item.id}
            className={`palette-swatches__card palette-swatches__card--${item.id}`}
          >
            <div className="palette-swatches__card-header">
              <h5 className="palette-swatches__module-name">
                {item.module}
              </h5>
            </div>

            <div className="palette-swatches__chips-row">
              {item.colors.map((c) => (
                <div key={c.role} className="palette-swatches__chip-item">
                  <span
                    className="palette-swatches__color-dot"
                    style={{ backgroundColor: c.hex }}
                    aria-hidden="true"
                  />
                  <div className="palette-swatches__chip-meta">
                    <span className="palette-swatches__chip-role">{c.role}</span>
                    <span className="palette-swatches__chip-hex">{c.hex}</span>
                  </div>
                </div>
              ))}
            </div>

          </article>
        ))}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 2. Architecture Flowchart Component                                       */
/* -------------------------------------------------------------------------- */

interface ArchitectureLayer {
  step: string;
  title: string;
  highlights: string[];
}

const ARCHITECTURE_LAYERS: ArchitectureLayer[] = [
  {
    step: "01",
    title: "Manuscript",
    highlights: [
      "The manuscript supplies the research text and narrative structure.",
      "Prose and companion figures avoid repeating the same content.",
      "Reviewer instructions stay outside the published text.",
    ],
  },
  {
    step: "02",
    title: "TypeScript Content Data",
    highlights: [
      "**src/data/** stores typed content without JSX.",
      "**WikiContentBlock** defines prose, headings, figures, tables, and notes.",
      "Content can be checked independently of the page layout.",
    ],
  },
  {
    step: "03",
    title: "Assets & Feature Panels",
    highlights: [
      "**Assets.ts** maps media URLs, alternative text, and captions.",
      "Asset links are checked before publication.",
      "**Panels.tsx** provides specialized viewers and interactive components where needed.",
    ],
  },
  {
    step: "04",
    title: "Page Assembly",
    highlights: [
      "**WikiRoutePage.tsx** assembles content, reading progress, and the mobile contents drawer.",
      "**wiki-route-skin.css** sets shared layout dimensions.",
      "CSS numbers figures automatically.",
    ],
  },
];

export function ArchitectureFlowchart() {
  return (
    <div className="architecture-flowchart" data-wiki-reveal>
      <header className="architecture-flowchart__header">
        <h4 className="architecture-flowchart__title">
          Four-Layer Architecture
        </h4>
      </header>

      <div className="architecture-flowchart__timeline">
        {ARCHITECTURE_LAYERS.map((layer, index) => (
          <div key={layer.step} className="architecture-flowchart__step">
            <div className="architecture-flowchart__badge-col">
              <span className="architecture-flowchart__index-pill">
                {layer.step}
              </span>
              {index < ARCHITECTURE_LAYERS.length - 1 ? (
                <span
                  className="architecture-flowchart__rail-line"
                  aria-hidden="true"
                />
              ) : null}
            </div>

            <div className="architecture-flowchart__card">
              <div className="architecture-flowchart__card-header">
                <h5 className="architecture-flowchart__card-title">
                  {layer.title}
                </h5>
              </div>

              <ul className="architecture-flowchart__highlights">
                {layer.highlights.map((point) => (
                  <li
                    key={point}
                    className="architecture-flowchart__highlight-item"
                    dangerouslySetInnerHTML={{
                      __html: point.replace(
                        /\*\*(.*?)\*\*/g,
                        "<strong>$1</strong>",
                      ),
                    }}
                  />
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 3. Lumi Mascot Cursor Interaction Showcase                                */
/* -------------------------------------------------------------------------- */

interface CursorStateItem {
  id: string;
  badge: string;
  title: string;
  src: string;
  alt: string;
  description: string;
}

const CURSOR_STATES: CursorStateItem[] = [
  {
    id: "rest",
    badge: "State A · Rest",
    title: "Alert Resting State",
    src: "https://static.igem.wiki/teams/6056/wiki/files/pages/project/art/lumi-cursor-rest.avif",
    alt: "Lumi Cursor Resting Posture",
    description:
      "Default watchful posture accompanying general desktop navigation and long-form reading.",
  },
  {
    id: "active",
    badge: "State B · Hover",
    title: "Joyful Active Reaction",
    src: "https://static.igem.wiki/teams/6056/wiki/files/pages/project/art/lumi-cursor-active.avif",
    alt: "Lumi Cursor Active Hover Posture",
    description:
      "Joyful wink and delicate glass specular sheen triggered upon interactive links and controls.",
  },
  {
    id: "spark",
    badge: "State C · Click",
    title: "Dynamic Spark Burst",
    src: "https://static.igem.wiki/teams/6056/wiki/files/pages/project/art/lumi-cursor-spark.avif",
    alt: "Lumi Cursor Click Spark Burst",
    description:
      "Inertia spring recoil emitting an 18-particle burst tinted dynamically to the active section's palette.",
  },
];

export function LumiCursorShowcase() {
  return (
    <figure className="wiki-figure wiki-cursor-showcase" data-wiki-reveal>
      <div className="wiki-cursor-showcase__grid">
        {CURSOR_STATES.map((state) => (
          <div key={state.id} className="wiki-cursor-showcase__card">
            <div className="wiki-cursor-showcase__preview">
              <img
                src={state.src}
                alt={state.alt}
                className="wiki-cursor-showcase__sprite"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="wiki-cursor-showcase__meta">
              <span className="wiki-cursor-showcase__badge">{state.badge}</span>
              <strong className="wiki-cursor-showcase__card-title">
                {state.title}
              </strong>
              <p className="wiki-cursor-showcase__desc">{state.description}</p>
            </div>
          </div>
        ))}
      </div>
      <figcaption>
        Lumi mascot cursor interaction lifecycle: (A) Alert resting state during general desktop navigation; (B) Joyful hover reaction with glass specular sheen over interactive controls; (C) Inertia spring recoil emitting dynamic theme-aware spark particle bursts upon click.
      </figcaption>
    </figure>
  );
}

/* -------------------------------------------------------------------------- */
/* 4. Features Map Export                                                     */
/* -------------------------------------------------------------------------- */

export function visualDesignFeatures(): Record<string, ReactNode> {
  return {
    "palette-swatches": <PaletteSwatches />,
    "architecture-flowchart": <ArchitectureFlowchart />,
    "lumi-cursor-showcase": <LumiCursorShowcase />,
  };
}
