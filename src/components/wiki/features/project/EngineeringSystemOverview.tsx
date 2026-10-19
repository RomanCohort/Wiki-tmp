import { useRef, useCallback, type MouseEvent } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const sheepSrc = "https://static.igem.wiki/teams/6056/wiki/files/pages/project/engineering/engineering-overview-sheep.webp";
const gearDryLabSrc = "https://static.igem.wiki/teams/6056/wiki/files/pages/project/engineering/engineering-overview-gear-dry-lab.webp";
const gearWetLabSrc = "https://static.igem.wiki/teams/6056/wiki/files/pages/project/engineering/engineering-overview-gear-wet-lab.webp";
const gearIhpSrc = "https://static.igem.wiki/teams/6056/wiki/files/pages/project/engineering/engineering-overview-gear-ihp.webp";
const gearEducationSrc = "https://static.igem.wiki/teams/6056/wiki/files/pages/project/engineering/engineering-overview-gear-education.webp";
const gearVisualDesignSrc = "https://static.igem.wiki/teams/6056/wiki/files/pages/project/engineering/engineering-overview-gear-visual-design.webp";
const gearEntrepreneurshipSrc = "https://static.igem.wiki/teams/6056/wiki/files/pages/project/engineering/engineering-overview-gear-entrepreneurship.webp";

const dialOuterGearSrc = "https://static.igem.wiki/teams/6056/wiki/files/pages/project/engineering/engineering-dial-outer-gear.webp";
const dialInnerFaceSrc = "https://static.igem.wiki/teams/6056/wiki/files/pages/project/engineering/engineering-dial-inner-face.webp";
const handLongSrc = "https://static.igem.wiki/teams/6056/wiki/files/pages/project/engineering/engineering-dial-hand-long.webp";
const handShortSrc = "https://static.igem.wiki/teams/6056/wiki/files/pages/project/engineering/engineering-dial-hand-short.webp";
const dialCapSrc = "https://static.igem.wiki/teams/6056/wiki/files/pages/project/engineering/engineering-dial-cap.webp";

import "../../../../styles/features/engineering-overview.css";

gsap.registerPlugin(useGSAP);

const C_X = 836;
const C_Y = 462;

// Polar coordinate helper in global SVG viewBox (1673 x 940)
const polar = (r: number, deg: number) => {
  const rad = ((deg - 90) * Math.PI) / 180;
  return [C_X + r * Math.cos(rad), C_Y + r * Math.sin(rad)] as const;
};

// Donut wedge path helper around (C_X, C_Y)
function sectorPath(rInner: number, rOuter: number, startDeg: number, sweepDeg: number) {
  const [x1, y1] = polar(rOuter, startDeg);
  const [x2, y2] = polar(rOuter, startDeg + sweepDeg);
  const [x3, y3] = polar(rInner, startDeg + sweepDeg);
  const [x4, y4] = polar(rInner, startDeg);
  return `M ${x1.toFixed(2)} ${y1.toFixed(2)} A ${rOuter} ${rOuter} 0 0 1 ${x2.toFixed(2)} ${y2.toFixed(2)} L ${x3.toFixed(2)} ${y3.toFixed(2)} A ${rInner} ${rInner} 0 0 0 ${x4.toFixed(2)} ${y4.toFixed(2)} Z`;
}

interface TimeSectorItem {
  id: string;
  letter: "T" | "I" | "M" | "E";
  title: string;
  targetId: string;
  startDeg: number;
}

const TIME_SECTORS: TimeSectorItem[] = [
  {
    id: "engineering-cycle-1",
    letter: "T",
    title: "Cycle 1 · Targeting",
    targetId: "engineering-cycle-1",
    startDeg: 270,
  },
  {
    id: "engineering-cycle-2",
    letter: "I",
    title: "Cycle 2 · Integration",
    targetId: "engineering-cycle-2",
    startDeg: 0,
  },
  {
    id: "engineering-cycle-3",
    letter: "M",
    title: "Cycle 3 · Measurement",
    targetId: "engineering-cycle-3",
    startDeg: 90,
  },
  {
    id: "engineering-cycle-4",
    letter: "E",
    title: "Cycle 4 · Evaluation",
    targetId: "engineering-cycle-4",
    startDeg: 180,
  },
];

export function EngineeringSystemOverview() {
  const svgRef = useRef<SVGSVGElement>(null);

  const navigateTo = useCallback((targetId: string, e: MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.pushState(null, "", `#${targetId}`);
    }
  }, []);

  useGSAP(
    () => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced || !svgRef.current) return;

      // 1. Dual pointers rotating continuously around dial center (836, 462)
      // Long pointer (TIME cycle hand): 20s per 360 deg sweep
      gsap.to(svgRef.current.querySelector(".eng-overview-hand-long"), {
        rotation: "+=360",
        svgOrigin: "836 462",
        smoothOrigin: false,
        duration: 20,
        ease: "none",
        repeat: -1,
      });

      // Short pointer (DBTL stage hand): 8s per 360 deg sweep
      gsap.to(svgRef.current.querySelector(".eng-overview-hand-short"), {
        rotation: "+=360",
        svgOrigin: "836 462",
        smoothOrigin: false,
        duration: 8,
        ease: "none",
        repeat: -1,
      });

      // 2. Central dial OUTER gear teeth slow rotation (90s per revolution)
      // Note: The inner dial face remains completely static so T, I, M, E sector clicks and text stay fixed!
      gsap.to(svgRef.current.querySelector(".eng-overview-dial-outer-gear"), {
        rotation: "+=360",
        svgOrigin: "836 462",
        smoothOrigin: false,
        duration: 90,
        ease: "none",
        repeat: -1,
      });

      // 3. Six satellite gears continuous 360 deg rotation around their own centers
      // Dry Lab (Top-Left, center: 361.5, 230.0) -> Clockwise
      gsap.to(svgRef.current.querySelector(".eng-overview-gear-dry-lab"), {
        rotation: "+=360",
        svgOrigin: "361.5 230.0",
        smoothOrigin: false,
        duration: 16,
        ease: "none",
        repeat: -1,
      });

      // Wet Lab (Bottom-Left, center: 326.5, 567.0) -> Counter-Clockwise (Meshed)
      gsap.to(svgRef.current.querySelector(".eng-overview-gear-wet-lab"), {
        rotation: "-=360",
        svgOrigin: "326.5 567.0",
        smoothOrigin: false,
        duration: 16,
        ease: "none",
        repeat: -1,
      });

      // iHP (Top-Right, center: 1232.5, 188.0) -> Clockwise
      gsap.to(svgRef.current.querySelector(".eng-overview-gear-ihp"), {
        rotation: "+=360",
        svgOrigin: "1232.5 188.0",
        smoothOrigin: false,
        duration: 12,
        ease: "none",
        repeat: -1,
      });

      // Education (Mid-Top Right, center: 1320.5, 405.5) -> Counter-Clockwise
      gsap.to(svgRef.current.querySelector(".eng-overview-gear-education"), {
        rotation: "-=360",
        svgOrigin: "1320.5 405.5",
        smoothOrigin: false,
        duration: 12,
        ease: "none",
        repeat: -1,
      });

      // Visual Design (Mid-Bottom Right, center: 1323.0, 644.5) -> Clockwise
      gsap.to(svgRef.current.querySelector(".eng-overview-gear-visual-design"), {
        rotation: "+=360",
        svgOrigin: "1323.0 644.5",
        smoothOrigin: false,
        duration: 12,
        ease: "none",
        repeat: -1,
      });

      // Entrepreneurship (Bottom-Right, center: 1152.5, 820.0) -> Counter-Clockwise
      gsap.to(svgRef.current.querySelector(".eng-overview-gear-entrepreneurship"), {
        rotation: "-=360",
        svgOrigin: "1152.5 820.0",
        smoothOrigin: false,
        duration: 12,
        ease: "none",
        repeat: -1,
      });
    },
    { scope: svgRef },
  );

  return (
    <figure className="eng-overview-mech" aria-label="CirCure TIME Engineering System Overview">
      <div className="eng-overview-mech__canvas-wrap">
        <svg
          ref={svgRef}
          viewBox="0 0 1673 940"
          className="eng-overview-mech__svg"
          role="img"
          aria-label="The CirCure TIME Engineering System interactive mechanical illustration"
        >
          {/* 1. Background Canvas - removed to blend seamlessly into page background */}

          {/* 2. Six Satellite Gears (continuous rotation around their own centers) */}
          {/* Dry Lab: center (361.5, 230.0), size 360 */}
          <image
            href={gearDryLabSrc}
            x={361.5 - 180}
            y={230.0 - 180}
            width="360"
            height="360"
            className="eng-overview-gear-dry-lab"
          />

          {/* Wet Lab: center (326.5, 567.0), size 330 */}
          <image
            href={gearWetLabSrc}
            x={326.5 - 165}
            y={567.0 - 165}
            width="330"
            height="330"
            className="eng-overview-gear-wet-lab"
          />

          {/* iHP: center (1232.5, 188.0), size 250 */}
          <image
            href={gearIhpSrc}
            x={1232.5 - 125}
            y={188.0 - 125}
            width="250"
            height="250"
            className="eng-overview-gear-ihp"
          />

          {/* Education: center (1320.5, 405.5), size 250 */}
          <image
            href={gearEducationSrc}
            x={1320.5 - 125}
            y={405.5 - 125}
            width="250"
            height="250"
            className="eng-overview-gear-education"
          />

          {/* Visual Design: center (1323.0, 644.5), size 260 */}
          <image
            href={gearVisualDesignSrc}
            x={1323.0 - 130}
            y={644.5 - 130}
            width="260"
            height="260"
            className="eng-overview-gear-visual-design"
          />

          {/* Entrepreneurship: center (1152.5, 820.0), size 250 */}
          <image
            href={gearEntrepreneurshipSrc}
            x={1152.5 - 125}
            y={820.0 - 125}
            width="250"
            height="250"
            className="eng-overview-gear-entrepreneurship"
          />

          {/* 3. Central Dial Outer Gear Teeth (slow continuous gear rotation around 836, 462) */}
          <image
            href={dialOuterGearSrc}
            x="470"
            y="96"
            width="732"
            height="732"
            className="eng-overview-dial-outer-gear"
          />

          {/* 4. Central Dial Inner Face (Static face with TIME & DBTL scales and text) */}
          <image
            href={dialInnerFaceSrc}
            x="470"
            y="96"
            width="732"
            height="732"
            className="eng-overview-dial-inner-face"
          />

          {/* 5. Static Text Labels centered exactly on each satellite gear */}
          <g className="eng-overview-gear-labels" aria-hidden="true">
            {/* Dry Lab: center (361.5, 230.0) */}
            <text x="361.5" y="230.0" className="eng-gear-label eng-gear-label--dry-lab">
              Dry Lab
            </text>

            {/* Wet Lab: center (326.5, 567.0) */}
            <text x="326.5" y="567.0" className="eng-gear-label eng-gear-label--wet-lab">
              Wet Lab
            </text>

            {/* iHP: center (1232.5, 188.0) */}
            <text x="1232.5" y="188.0" className="eng-gear-label eng-gear-label--ihp">
              iHP
            </text>

            {/* Education: center (1320.5, 405.5) */}
            <text x="1320.5" y="405.5" className="eng-gear-label eng-gear-label--education">
              Education
            </text>

            {/* Visual Design: center (1323.0, 644.5) */}
            <text x="1323.0" y="644.5" className="eng-gear-label eng-gear-label--visual-design">
              <tspan x="1323.0" dy="-0.58em">Visual</tspan>
              <tspan x="1323.0" dy="1.16em">Design</tspan>
            </text>

            {/* Entrepreneurship: center (1152.5, 820.0) */}
            <text x="1152.5" y="820.0" className="eng-gear-label eng-gear-label--entrepreneurship">
              Entrepreneurship
            </text>
          </g>

          {/* 6. Clickable T, I, M, E Quadrant Sectors (direct jumps to Cycle 1~4) */}
          {TIME_SECTORS.map((sector) => (
            <a
              key={sector.id}
              href={`#${sector.targetId}`}
              className={`eng-dial-sector eng-dial-sector--${sector.letter.toLowerCase()}`}
              onClick={(e) => navigateTo(sector.targetId, e)}
              aria-label={`Jump to ${sector.title}`}
            >
              <path
                className="eng-dial-sector__face"
                d={sectorPath(135, 290, sector.startDeg, 90)}
              />
            </a>
          ))}

          {/* 6. Central Pointers (pivoting precisely around 836, 462) */}
          {/* Long Gold Hand */}
          <image
            href={handLongSrc}
            x="470"
            y="96"
            width="732"
            height="732"
            className="eng-overview-hand-long"
          />

          {/* Short Blue Hand */}
          <image
            href={handShortSrc}
            x="470"
            y="96"
            width="732"
            height="732"
            className="eng-overview-hand-short"
          />

          {/* Hub Cap */}
          <image
            href={dialCapSrc}
            x="470"
            y="96"
            width="732"
            height="732"
            className="eng-overview-cap"
          />

          {/* 7. Mascot Sheep Layer (foreground, non-blocking) */}
          <image
            href={sheepSrc}
            x="0"
            y="0"
            width="1673"
            height="940"
            className="eng-overview-sheep"
          />
        </svg>
      </div>

      {/* Centered Feature Caption */}
      <figcaption className="eng-overview-caption">
        <span className="eng-overview-caption__tag">
          Interactive TIME Model
        </span>
        <h4 className="eng-overview-caption__title">
          The CirCure TIME Engineering Stopwatch
        </h4>
        <p className="eng-overview-caption__p">
          An interactive mechanical model of our engineering framework: Dry Lab and Wet Lab act as the primary driving gears meshed with team disciplines. Click any quadrant (T, I, M, E) on the central dial to jump directly to that cycle.
        </p>
      </figcaption>
    </figure>
  );
}
