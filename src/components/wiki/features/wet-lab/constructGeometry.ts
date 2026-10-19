/**
 * Pure geometry for the `pCirCure-circMEV` construct viewer.
 *
 * Ported from the team's `construct-architecture.html` delivery: the same ring
 * radii, lane assignment, label spreading, arrow-glyph paths and sequence-row
 * layout, so the React viewer draws exactly the map the delivered file drew.
 * Everything here is a pure function of `designConstruct.ts` — no React, no DOM
 * reads — which is what lets the component stay a thin renderer.
 */

import {
  constructCategoryByKey,
  constructElements,
  constructSequence,
  constructSites,
  type ConstructCategoryKey,
  type ConstructElement,
  type ConstructSite,
} from "../../../../data/wet-lab/designConstruct";

export const MAP_VIEWBOX = "0 0 680 620";
export const SEQUENCE_LENGTH = constructSequence.length;

/** Ring centre, base-ring radius, first label lane radius and lane pitch. */
const CX = 340;
const CY = 305;
const RB = 158;
const LANE0 = 132;
const LANEH = 14;
/** Element glyph thickness on the ring. */
const TH = 11;
/** Smallest angular span (degrees) a glyph may occupy, so 1 bp stays visible. */
const MIN_SPAN = 0.62;
/** Feature-bar lane pitch and height in the sequence browser. */
const SEQ_FEATURE_PITCH = 15;
const SEQ_FEATURE_MIN_LABEL_PX = 46;

/* ------------------------------------------------------------------ helpers */

export function complement(sequence: string): string {
  const map: Record<string, string> = {
    A: "T",
    T: "A",
    G: "C",
    C: "G",
    N: "N",
  };
  let out = "";
  for (const base of sequence) out += map[base] ?? "N";
  return out;
}

export function formatBp(value: number): string {
  return String(value).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/** iGEM Registry slug for a part number: `BBa_26KIMH8W` -> `bba-26kimh8w`. */
export function partRegistrySlug(partBba: string): string {
  return partBba.toLowerCase().replace(/_/g, "-");
}

/** Remove the author's inline markup, for `title` attributes and plain labels. */
export function stripMarkup(value: string): string {
  return value.replace(/<[^>]+>/g, "");
}

/** Base pair -> degrees clockwise from 12 o'clock. */
function ang(bp: number): number {
  return ((bp - 1) / SEQUENCE_LENGTH) * 360;
}

function pt(radius: number, degrees: number): [number, number] {
  const a = ((degrees - 90) * Math.PI) / 180;
  return [CX + radius * Math.cos(a), CY + radius * Math.sin(a)];
}

/** `x,y` pair rounded the way the source viewer rounded its path data. */
function xy(radius: number, degrees: number): string {
  const [x, y] = pt(radius, degrees);
  return `${x.toFixed(2)},${y.toFixed(2)}`;
}

/* -------------------------------------------------------------------- paths */

/** Plain annular band — the invisible pointer target behind each glyph. */
export function bandPath(a1: number, a2: number, r: number, t: number): string {
  if (a2 - a1 < MIN_SPAN) a2 = a1 + MIN_SPAN;
  const ro = r + t / 2;
  const ri = r - t / 2;
  const la = a2 - a1 > 180 ? 1 : 0;
  return (
    `M${xy(ro, a1)} A${ro} ${ro} 0 ${la} 1 ${xy(ro, a2)}` +
    ` L${xy(ri, a2)} A${ri} ${ri} 0 ${la} 0 ${xy(ri, a1)} Z`
  );
}

/**
 * Element glyph: rounded-rectangle tail plus triangular head. `dir >= 0` points
 * the head at `a2` (sense strand); `dir < 0` points it at `a1` (antisense).
 */
export function tagPath(
  a1: number,
  a2: number,
  r: number,
  t: number,
  dir: number,
): string {
  if (a2 - a1 < MIN_SPAN) a2 = a1 + MIN_SPAN;
  const span = a2 - a1;
  const ro = r + t / 2;
  const ri = r - t / 2;
  const head = Math.min(span * 0.4, 3.4);
  const cr = Math.min(span * 0.22, 1.0);
  const k = t * 0.2;

  if (dir >= 0) {
    const tip = a2;
    const base = a2 - head;
    const tail = a1;
    const c = a1 + cr;
    return (
      `M${xy(ro, c)}` +
      ` A${ro} ${ro} 0 0 1 ${xy(ro, base)}` +
      ` L${xy(r, tip)}` +
      ` L${xy(ri, base)}` +
      ` A${ri} ${ri} 0 0 0 ${xy(ri, c)}` +
      ` Q${xy(ri, tail)} ${xy(r - k, tail)}` +
      ` L${xy(r + k, tail)}` +
      ` Q${xy(ro, tail)} ${xy(ro, c)} Z`
    );
  }

  const tip = a1;
  const base = a1 + head;
  const tail = a2;
  const c = a2 - cr;
  return (
    `M${xy(r, tip)}` +
    ` L${xy(ro, base)}` +
    ` A${ro} ${ro} 0 0 1 ${xy(ro, c)}` +
    ` Q${xy(ro, tail)} ${xy(r + k, tail)}` +
    ` L${xy(r - k, tail)}` +
    ` Q${xy(ri, tail)} ${xy(ri, c)}` +
    ` A${ri} ${ri} 0 0 0 ${xy(ri, base)} Z`
  );
}

function centreArc(a1: number, a2: number, r: number, rev: boolean): string {
  const la = a2 - a1 > 180 ? 1 : 0;
  return rev
    ? `M${xy(r, a2)} A${r} ${r} 0 ${la} 0 ${xy(r, a1)}`
    : `M${xy(r, a1)} A${r} ${r} 0 ${la} 1 ${xy(r, a2)}`;
}

/** Selection wedge: an annular sector from the hub out past the label lanes. */
export function wedgePath(
  a1: number,
  a2: number,
  r1: number,
  r2: number,
): string {
  if (a2 - a1 < 1.2) {
    const m = (a1 + a2) / 2;
    a1 = m - 0.6;
    a2 = m + 0.6;
  }
  const la = a2 - a1 > 180 ? 1 : 0;
  return (
    `M${xy(r1, a1)} L${xy(r2, a1)}` +
    ` A${r2} ${r2} 0 ${la} 1 ${xy(r2, a2)}` +
    ` L${xy(r1, a2)} A${r1} ${r1} 0 ${la} 0 ${xy(r1, a1)} Z`
  );
}

/** Widened span used by the selection wedge so a 1 bp element stays visible. */
export function wedgeSpan(a1: number, a2: number): [number, number] {
  if (a2 - a1 < 1.2) {
    const m = (a1 + a2) / 2;
    return [m - 0.6, m + 0.6];
  }
  return [a1, a2];
}

/* -------------------------------------------------------------- map layout */

/**
 * Greedy lane packing: longest element first, each into the first lane whose
 * last occupant ends before this one starts. Reproduces the source viewer's
 * `assignLanes()` exactly, which is what keeps the two maps identical.
 */
function assignLanes(): Map<string, number> {
  const sorted = [...constructElements].sort(
    (a, b) => b.end - b.start - (a.end - a.start),
  );
  const lanes: ConstructElement[][] = [];
  const laneOf = new Map<string, number>();

  for (const element of sorted) {
    for (let i = 0; ; i += 1) {
      if (!lanes[i]) lanes[i] = [];
      const clash = lanes[i].some(
        (other) => !(element.end < other.start || element.start > other.end),
      );
      if (!clash) {
        lanes[i].push(element);
        laneOf.set(element.id, i);
        break;
      }
    }
  }
  return laneOf;
}

interface SpreadItem {
  y: number;
}

/** Push overlapping labels apart, then pull the stack back into `[minY, maxY]`. */
function spread<T extends SpreadItem>(
  items: T[],
  minY: number,
  maxY: number,
  gap: number,
): T[] {
  items.sort((a, b) => a.y - b.y);
  let i: number;
  for (i = 1; i < items.length; i += 1) {
    if (items[i].y - items[i - 1].y < gap) items[i].y = items[i - 1].y + gap;
  }
  if (items.length) {
    const over = items[items.length - 1].y - maxY;
    if (over > 0) for (i = 0; i < items.length; i += 1) items[i].y -= over;
  }
  for (i = items.length - 2; i >= 0; i -= 1) {
    if (items[i + 1].y - items[i].y < gap) items[i].y = items[i + 1].y - gap;
  }
  if (items.length && items[0].y < minY) {
    const shift = minY - items[0].y;
    for (i = 0; i < items.length; i += 1) items[i].y += shift;
  }
  return items;
}

export interface MapLine {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

export interface MapText {
  x: number;
  y: number;
  value: string;
}

export interface MapExternalLabel {
  /** Polyline points from the ring out to the label's text anchor. */
  lead: string;
  textX: number;
  textY: number;
  anchor: "start" | "end";
  side: 1 | -1;
}

export interface MapElementGeometry {
  element: ConstructElement;
  fill: string;
  stroke: string;
  a1: number;
  a2: number;
  r: number;
  mid: number;
  /** True when the short label fits inside the glyph, on a curved text path. */
  inline: boolean;
  tag: string;
  hit: string;
  arc?: string;
  arcReversed?: boolean;
  tick?: MapLine;
  label?: MapExternalLabel;
}

export interface MapSiteGeometry {
  site: ConstructSite;
  angle: number;
  cutmark: MapLine;
  label: MapExternalLabel;
}

export type MapLabelItem =
  | { kind: "element"; key: string; geometry: MapElementGeometry }
  | { kind: "site"; key: string; geometry: MapSiteGeometry };

export interface ConstructMapModel {
  viewBox: string;
  centreX: number;
  centreY: number;
  centreName: string;
  centreLength: string;
  ringRadius: number;
  kbTicks: MapLine[];
  kbLabels: MapText[];
  topTick: MapLine;
  /** Elements labelled inside their own glyph; rendered beneath the labels. */
  inlineElements: MapElementGeometry[];
  rightLabels: MapLabelItem[];
  leftLabels: MapLabelItem[];
}

function buildMapModel(): ConstructMapModel {
  const laneOf = assignLanes();
  const kbTicks: MapLine[] = [];
  const kbLabels: MapText[] = [];

  for (let k = 1000; k < SEQUENCE_LENGTH; k += 1000) {
    const a = ang(k);
    const [x1, y1] = pt(RB, a);
    const [x2, y2] = pt(RB - 6, a);
    kbTicks.push({ x1, y1, x2, y2 });
    const [lx, ly] = pt(RB + 13, a);
    kbLabels.push({ x: lx, y: ly + 3, value: formatBp(k) });
  }

  const geometries: MapElementGeometry[] = constructElements.map((element) => {
    const a1 = ang(element.start);
    let a2 = ang(element.end);
    if (a2 - a1 < MIN_SPAN) a2 = a1 + MIN_SPAN;
    const r = LANE0 - (laneOf.get(element.id) ?? 0) * LANEH;
    const mid = (a1 + a2) / 2;
    const category = constructCategoryByKey[element.category];
    // A label fits inline when the arc it must ride on is longer than the text.
    const arcLength = (r * ((a2 - a1) * Math.PI)) / 180;
    const textWidth = stripMarkup(element.shortLabel).length * 10 * 0.56;

    return {
      element,
      fill: category.fill,
      stroke: category.stroke,
      a1,
      a2,
      r,
      mid,
      inline: arcLength > textWidth + 4,
      tag: tagPath(a1, a2, r, TH, element.strand),
      hit: bandPath(a1, a2, r, TH + 10),
    };
  });

  const right: Array<{ item: MapLabelItem; y: number }> = [];
  const left: Array<{ item: MapLabelItem; y: number }> = [];

  for (const geometry of geometries) {
    if (geometry.inline) {
      geometry.arc = centreArc(
        geometry.a1,
        geometry.a2,
        geometry.r,
        geometry.mid > 180,
      );
      geometry.arcReversed = geometry.mid > 180;
      continue;
    }
    const [, labelY] = pt(RB + 8, geometry.mid);
    const item: MapLabelItem = {
      kind: "element",
      key: geometry.element.id,
      geometry,
    };
    (Math.cos(((geometry.mid - 90) * Math.PI) / 180) >= 0 ? right : left).push({
      item,
      y: labelY,
    });
  }

  for (const site of constructSites) {
    const a = ang(site.cut);
    const geometry: MapSiteGeometry = {
      site,
      angle: a,
      cutmark: {
        x1: pt(RB - 9, a)[0],
        y1: pt(RB - 9, a)[1],
        x2: pt(RB + 8, a)[0],
        y2: pt(RB + 8, a)[1],
      },
      label: { lead: "", textX: 0, textY: 0, anchor: "start", side: 1 },
    };
    const [, labelY] = pt(RB + 8, a);
    const item: MapLabelItem = { kind: "site", key: site.id, geometry };
    (Math.cos(((a - 90) * Math.PI) / 180) >= 0 ? right : left).push({
      item,
      y: labelY,
    });
  }

  spread(right, 13, 607, 16);
  spread(left, 13, 607, 16);

  const place = (
    entries: Array<{ item: MapLabelItem; y: number }>,
    side: 1 | -1,
  ) => {
    const elbowX = side > 0 ? CX + 188 : CX - 188;
    const textX = side > 0 ? CX + 194 : CX - 194;
    return entries.map(({ item, y }) => {
      if (item.kind === "site") {
        const [ax, ay] = pt(RB + 8, item.geometry.angle);
        item.geometry.label = {
          lead: `${ax.toFixed(2)},${ay.toFixed(2)} ${elbowX},${y.toFixed(2)} ${textX},${y.toFixed(2)}`,
          textX: side > 0 ? textX + 4 : textX - 4,
          textY: y + 3,
          anchor: side > 0 ? "start" : "end",
          side,
        };
        return item;
      }
      const geometry = item.geometry;
      const [ax, ay] = pt(RB + 3, geometry.mid);
      geometry.tick = {
        x1: pt(RB - 3, geometry.mid)[0],
        y1: pt(RB - 3, geometry.mid)[1],
        x2: pt(RB + 6, geometry.mid)[0],
        y2: pt(RB + 6, geometry.mid)[1],
      };
      geometry.label = {
        lead: `${ax.toFixed(2)},${ay.toFixed(2)} ${elbowX},${y.toFixed(2)} ${textX},${y.toFixed(2)}`,
        textX: side > 0 ? textX + 4 : textX - 4,
        textY: y + 3,
        anchor: side > 0 ? "start" : "end",
        side,
      };
      return item;
    });
  };

  return {
    viewBox: MAP_VIEWBOX,
    centreX: CX,
    centreY: CY,
    centreName: "pCirCure-circMEV",
    centreLength: `${formatBp(SEQUENCE_LENGTH)} bp`,
    ringRadius: RB,
    kbTicks,
    kbLabels,
    topTick: {
      x1: CX,
      y1: CY - RB - 5,
      x2: CX,
      y2: CY - RB + 6,
    },
    inlineElements: geometries.filter((geometry) => geometry.inline),
    rightLabels: place(right, 1),
    leftLabels: place(left, -1),
  };
}

/** The map is a pure function of static data, so it is built once per bundle. */
export const constructMap = buildMapModel();

/* --------------------------------------------------------- sequence browser */

export interface SequenceFeatureBar {
  id: string;
  label: string;
  title: string;
  left: number;
  width: number;
  top: number;
  fill: string;
  stroke: string;
  clip: string | null;
}

export interface SequenceCutMark {
  left: number;
  /** `null` for the two vertical strokes, which take the CSS default width. */
  width: number | null;
  top: string;
  height: string;
}

export interface SequenceRow {
  start: number;
  end: number;
  sense: string;
  antisense: string;
  /** Height reserved for the restriction-site chip lane (0 when unused). */
  siteLane: number;
  featuresHeight: number;
  bars: SequenceFeatureBar[];
  chips: Array<{ id: string; name: string; left: number }>;
  cuts: SequenceCutMark[];
  /** Decade labels, positioned from the row start. */
  ruler: Array<{ left: number; label: string }>;
  /** Pitch of the CSS tick pattern, in px (`10 × advance`). */
  tickPitch: number;
  /** Phase of the CSS tick pattern, in px (negative half a base). */
  tickPhase: number;
}

export interface SequenceMetrics {
  /** Horizontal advance of one base, in px. */
  advance: number;
  /** Bases per row, rounded to a multiple of ten. */
  basesPerRow: number;
  /** Rendered line height of one strand, in px. */
  lineHeight: number;
  /** Resolved letter-spacing, in px. */
  letterSpacing: number;
}

/** x of the gap that follows base `n`, within a row starting at `start`. */
function cutX(n: number, start: number, metrics: SequenceMetrics): number {
  return (n - start + 1) * metrics.advance - metrics.letterSpacing / 2;
}

/**
 * Lay out the sequence browser for a given measurement. Reproduces the source
 * viewer's row builder: strand text, lane-packed feature bars with arrow heads,
 * restriction chips and staggered cut marks, and the decade ruler.
 */
export function buildSequenceRows(metrics: SequenceMetrics): SequenceRow[] {
  const { advance, basesPerRow } = metrics;
  const rows: SequenceRow[] = [];

  for (let start = 1; start <= SEQUENCE_LENGTH; start += basesPerRow) {
    const end = Math.min(SEQUENCE_LENGTH, start + basesPerRow - 1);
    const sense = constructSequence.slice(start - 1, end);

    const inRow = constructElements
      .filter((element) => element.end >= start && element.start <= end)
      .sort((a, b) => a.start - b.start || b.end - b.start - (a.end - a.start));

    const laneEnds: number[] = [];
    const bars: SequenceFeatureBar[] = [];

    for (const element of inRow) {
      let lane = 0;
      while (laneEnds[lane] !== undefined && laneEnds[lane] >= element.start)
        lane += 1;
      laneEnds[lane] = element.end;

      const from = Math.max(element.start, start);
      const to = Math.min(element.end, end);
      const left = (from - start) * advance;
      const width = (to - from + 1) * advance;
      const category = constructCategoryByKey[element.category];
      // Heads appear only where the element genuinely terminates inside the row,
      // so a glyph cut off by a row break reads as "continues".
      const head =
        element.strand >= 0 && to === element.end
          ? 1
          : element.strand < 0 && from === element.start
            ? -1
            : 0;
      const notch = Math.min(6, width * 0.4).toFixed(1);
      const clip =
        head === 1
          ? `polygon(0 0, calc(100% - ${notch}px) 0, 100% 50%, calc(100% - ${notch}px) 100%, 0 100%)`
          : head === -1
            ? `polygon(${notch}px 0, 100% 0, 100% 100%, ${notch}px 100%, 0 50%)`
            : null;

      bars.push({
        id: element.id,
        label:
          width > SEQ_FEATURE_MIN_LABEL_PX
            ? stripMarkup(element.shortLabel)
            : "",
        title: `${stripMarkup(element.name)} (${formatBp(element.start)}..${formatBp(element.end)})`,
        left,
        width,
        top: lane * SEQ_FEATURE_PITCH,
        fill: category.fill,
        stroke: category.stroke,
        clip,
      });
    }

    const chips: SequenceRow["chips"] = [];
    const cuts: SequenceCutMark[] = [];
    let siteLane = 0;

    for (const site of constructSites) {
      if (site.cut < start || site.cut > end) continue;
      siteLane = 18;
      const top = cutX(site.cut, start, metrics);
      const bottom = cutX(
        Math.min(Math.max(site.cutBottom, start), end),
        start,
        metrics,
      );
      const lo = Math.min(top, bottom);
      const hi = Math.max(top, bottom);

      chips.push({ id: site.id, name: site.name, left: top });
      cuts.push(
        { left: top - 0.75, top: "0", width: null, height: "50%" },
        {
          left: lo,
          top: "calc(50% - 0.75px)",
          width: hi - lo,
          height: "1.5px",
        },
        { left: bottom - 0.75, top: "50%", width: null, height: "50%" },
      );
    }

    /**
     * Ruler labels only. The tick marks are one repeating CSS gradient per row
     * (see `.cc-ruler-ticks`): drawing them as elements cost ~1,000 extra nodes
     * across the 5,267 bp template, and inside the reader's main-thread scroll
     * projection that is per-frame paint the page cannot afford.
     *
     * `tickPitch` and `tickPhase` reproduce the source viewer's marks exactly:
     * one at the row origin, then one under every decade label.
     */
    const ruler: SequenceRow["ruler"] = [
      { left: advance / 2, label: String(start) },
    ];
    for (let base = start; base <= end; base += 1) {
      if (base % 10 !== 0) continue;
      ruler.push({
        left: (base - start) * advance + advance / 2,
        label: String(base),
      });
    }

    rows.push({
      start,
      end,
      sense,
      antisense: complement(sense),
      siteLane,
      tickPitch: advance * 10,
      // Labels sit at `(base - start) * advance + advance / 2`, so the first
      // decade tick is half a base to the left of a ten-base grid.
      tickPhase: -advance / 2,
      featuresHeight: laneEnds.length * SEQ_FEATURE_PITCH,
      bars,
      chips,
      cuts,
      ruler,
    });
  }

  return rows;
}

/* ------------------------------------------------------------- selection */

export interface SelectedConstruct {
  kind: "element" | "site";
  category: ConstructCategoryKey;
  name: string;
  description: string;
  chipLabel: string;
  chipFill: string;
  coordinates: string;
  partBba: string | null;
  start: number;
  end: number;
  /** Selection wedge, only meaningful for a single element. */
  wedge: { body: string; edges: Array<MapLine> } | null;
}

export function findSelectable(id: string | null): SelectedConstruct | null {
  if (!id) return null;

  const geometry = constructMap.inlineElements
    .concat(
      constructMap.rightLabels
        .concat(constructMap.leftLabels)
        .flatMap((item) => (item.kind === "element" ? [item.geometry] : [])),
    )
    .find((candidate) => candidate.element.id === id);

  if (geometry) {
    const { element } = geometry;
    const category = constructCategoryByKey[element.category];
    const [wa1, wa2] = wedgeSpan(geometry.a1, geometry.a2);
    return {
      kind: "element",
      category: element.category,
      name: element.name,
      description: element.description,
      chipLabel: category.label,
      chipFill: category.fill,
      coordinates: `${formatBp(element.start)}–${formatBp(element.end)}  ·  ${formatBp(
        element.end - element.start + 1,
      )} bp  ·  ${element.strand > 0 ? "sense" : "antisense"} strand`,
      partBba: element.partBba,
      start: element.start,
      end: element.end,
      wedge: {
        body: wedgePath(geometry.a1, geometry.a2, 56, RB + 16),
        edges: [wa1, wa2].map((angle) => ({
          x1: pt(46, angle)[0],
          y1: pt(46, angle)[1],
          x2: pt(RB + 34, angle)[0],
          y2: pt(RB + 34, angle)[1],
        })),
      },
    };
  }

  const site = constructSites.find((candidate) => candidate.id === id);
  if (!site) return null;

  return {
    kind: "site",
    category: "site",
    name: site.name,
    description: site.note,
    chipLabel: constructCategoryByKey.site.label,
    chipFill: constructCategoryByKey.site.fill,
    coordinates: `${site.recognition}  ·  cuts after ${formatBp(site.cut)} / ${formatBp(
      site.cutBottom,
    )}  ·  unique cutter`,
    partBba: null,
    start: site.cut,
    end: site.cut,
    wedge: null,
  };
}
