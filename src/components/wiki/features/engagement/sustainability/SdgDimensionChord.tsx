// @ts-nocheck — verbatim port of an external D3 script; d3 is a runtime global.
/* eslint-disable @typescript-eslint/no-explicit-any --
   The chord script is ported verbatim from the pre-revamp project: d3 stays a
   runtime global loaded from public/vendor/d3.min.js (self-hosted; iGEM forbids
   external CDNs), so the module keeps its original loose typing. `@ts-nocheck`
   is allowed for this one file by the scoped override in eslint.config.js. */
import { useEffect, useRef, useState } from "react";
import {
  SDG_DIMENSION_OF,
  SDG_DIMENSIONS,
  SDG_EDGES,
  SDG_META,
} from "../../../../../data/engagement/sustainability/sustainabilitySdgNetwork";

declare global {
  interface Window {
    /** Classic global provided by public/vendor/d3.min.js. */
    d3?: any;
  }
}

type D3 = any;

interface ChordRecord {
  L: [number, number];
  R?: [number, number];
  val: number;
  i: number;
  d: number;
  t: "syn" | "trade";
}

/**
 * SDG-NEXUS 17 Chord — 17 SDGs (left arc) ↔ Social / Economic / Environmental
 * dimensions (right arc), with synergy (solid) vs trade-off (hatched) ribbons.
 *
 * This is a direct port of `Qwen_html_20260815_x7bv4g4hn.html`, which replaces
 * the static `filename 1.png` SDG association figure. The D3 layout is kept
 * verbatim; only the runtime source of d3 changed from a CDN to the local
 * `public/vendor/d3.min.js` (iGEM forbids external CDNs).
 */
// 模块级单例：并发挂载的多个实例共享同一次 d3 加载，避免重复插入
// 相同的 <script> 标签。
let d3Loader: Promise<unknown> | null = null;
function loadD3(): Promise<unknown> {
  d3Loader ??= new Promise((resolve, reject) => {
    if (window.d3) {
      resolve(window.d3);
      return;
    }
    const script = document.createElement("script");
    script.src = `${import.meta.env.BASE_URL}vendor/d3.min.js`;
    script.async = true;
    script.onload = () => resolve(window.d3);
    script.onerror = () => reject(new Error("d3 load failed"));
    document.head.appendChild(script);
  });
  return d3Loader;
}

export function SdgDimensionChord({
  numbered = true,
  scrollable = false,
  caption = "Weighted mapping of the 17 SDGs across social, economic, and environmental dimensions.",
}: {
  numbered?: boolean;
  scrollable?: boolean;
  caption?: string;
} = {}) {
  const figureRef = useRef<HTMLElement | null>(null);
  const hostRef = useRef<HTMLDivElement | null>(null);
  const tipRef = useRef<HTMLDivElement | null>(null);
  const [d3, setD3] = useState<D3 | null>(() => window.d3 ?? null);
  const [missing, setMissing] = useState(false);

  useEffect(() => {
    if (window.d3) {
      setD3(window.d3);
      return;
    }
    let cancelled = false;
    loadD3().then(
      (loaded) => {
        if (!cancelled) setD3(loaded ?? null);
      },
      () => {
        if (!cancelled) setMissing(true);
      },
    );
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const host = hostRef.current;
    const tip = tipRef.current;
    if (!host || !tip || !d3) return;

    host.innerHTML = "";
    const tipNode = d3.select(tip);

    /* ---------------- 1. Aggregate: edge i→j into (source i, target dim) ---------------- */
    const agg = SDG_META.map(() =>
      SDG_DIMENSIONS.map(() => ({ pos: 0, neg: 0 })),
    );
    for (const { source: s, target: t, value: v } of SDG_EDGES) {
      const a = agg[s - 1][SDG_DIMENSION_OF[t]];
      if (v >= 0) a.pos += v;
      else a.neg += -v;
    }
    const T = d3.sum(
      agg.flat(),
      (a: { pos: number; neg: number }) => a.pos + a.neg,
    );

    /* ---------------- 2. Angle layout ---------------- */
    const R = 430;
    const BAND = 20;
    const RIB = R - 2;
    const PI = Math.PI;
    const gap = 0.03;
    const padL = 0.012;
    const padR = 0.02;
    const kL = (PI - 2 * gap - 16 * padL) / T;
    const kR = (PI - 2 * gap - 2 * padR) / T;

    const chordMap = new Map<string, ChordRecord>();
    const leftGroups: Array<{
      id: number;
      name: string;
      color: string;
      start: number;
      end: number;
    }> = [];
    const rightGroups: Array<{
      name: string;
      color: string;
      d: number;
      start: number;
      end: number;
      total: number;
    }> = [];

    let cur = PI + gap;
    SDG_META.forEach((s, i) => {
      const start = cur;
      SDG_DIMENSIONS.forEach((_, d) => {
        (["syn", "trade"] as const).forEach((t) => {
          const val = t === "syn" ? agg[i][d].pos : agg[i][d].neg;
          if (val < 1e-9) return;
          const a1 = cur + val * kL;
          chordMap.set(`${i}-${d}-${t}`, { L: [cur, a1], val, i, d, t });
          cur = a1;
        });
      });
      leftGroups.push({ ...s, start, end: cur });
      cur += padL;
    });

    cur = gap;
    SDG_DIMENSIONS.forEach((dm, d) => {
      const start = cur;
      let total = 0;
      SDG_META.forEach((_, i) => {
        (["syn", "trade"] as const).forEach((t) => {
          const val = t === "syn" ? agg[i][d].pos : agg[i][d].neg;
          if (val < 1e-9) return;
          const a1 = cur + val * kR;
          total += val;
          const rec = chordMap.get(`${i}-${d}-${t}`);
          if (rec) rec.R = [cur, a1];
          cur = a1;
        });
      });
      rightGroups.push({ ...dm, d, start, end: cur, total });
      cur += padR;
    });

    const chords: Array<{
      goal: number;
      dim: number;
      type: "syn" | "trade";
      val: number;
      source: { startAngle: number; endAngle: number };
      target: { startAngle: number; endAngle: number };
    }> = [];
    chordMap.forEach((rec) => {
      chords.push({
        goal: rec.i,
        dim: rec.d,
        type: rec.t,
        val: rec.val,
        source: { startAngle: rec.L[0], endAngle: rec.L[1] },
        target: {
          startAngle: rec.R![0],
          endAngle: rec.R![1],
        },
      });
    });
    chords.sort((a, b) =>
      a.type === b.type
        ? a.dim - b.dim || a.goal - b.goal
        : a.type === "syn"
          ? -1
          : 1,
    );

    /* ---------------- 3. Render ---------------- */
    const svg = d3.select(host).append("svg");
    const defs = svg.append("defs");
    const pat = defs
      .selectAll("pattern")
      .data(SDG_META)
      .join("pattern")
      .attr("id", (d) => `sdgchord-hatch-${d.id}`)
      .attr("patternUnits", "userSpaceOnUse")
      .attr("width", 5)
      .attr("height", 5)
      .attr("patternTransform", "rotate(45)");
    pat
      .append("rect")
      .attr("width", 5)
      .attr("height", 5)
      .attr("fill", (d) => d.color)
      .attr("fill-opacity", 0.16);
    pat
      .append("line")
      .attr("x1", 0)
      .attr("y1", 0)
      .attr("x2", 0)
      .attr("y2", 5)
      .attr("stroke", (d) => d.color)
      .attr("stroke-width", 1.3);

    const arc = d3.arc();
    const ribbon = d3.ribbon().radius(RIB);
    const g = svg.append("g");

    const rib = g
      .selectAll("path.rib")
      .data(chords)
      .join("path")
      .attr("class", "rib")
      .attr("d", ribbon)
      .attr("fill", (d) =>
        d.type === "syn"
          ? SDG_META[d.goal].color
          : `url(#sdgchord-hatch-${SDG_META[d.goal].id})`,
      )
      .attr("fill-opacity", (d) => (d.type === "syn" ? 0.72 : 1))
      .attr("stroke", (d) => SDG_META[d.goal].color)
      .attr("stroke-width", (d) => (d.type === "syn" ? 0.4 : 0.8))
      .attr("stroke-opacity", (d) => (d.type === "syn" ? 0.5 : 0.85));

    g.selectAll("path.goal")
      .data(leftGroups)
      .join("path")
      .attr("class", "goal")
      .attr("d", (d) =>
        arc({
          innerRadius: R,
          outerRadius: R + BAND,
          startAngle: d.start,
          endAngle: d.end,
        }),
      )
      .attr("fill", (d) => d.color)
      .attr("stroke", "#fff")
      .attr("stroke-width", 1);

    g.selectAll("path.dim")
      .data(rightGroups)
      .join("path")
      .attr("class", "dim")
      .attr("d", (d) =>
        arc({
          innerRadius: R,
          outerRadius: R + BAND,
          startAngle: d.start,
          endAngle: d.end,
        }),
      )
      .attr("fill", (d) => d.color)
      .attr("stroke", "#fff")
      .attr("stroke-width", 1);

    const tickG = g.selectAll("g.ticks").data(rightGroups).join("g");
    tickG.each(function (dim) {
      const sel = d3.select(this);
      const n = Math.floor(dim.total + 1e-6);
      const tv = d3.range(0, n + 1);
      const ang = (v: number) => dim.start + v * kR;
      sel
        .selectAll("line")
        .data(tv)
        .join("line")
        .attr("x1", (v) => Math.sin(ang(v)) * (R + BAND + 2))
        .attr("y1", (v) => -Math.cos(ang(v)) * (R + BAND + 2))
        .attr("x2", (v) => Math.sin(ang(v)) * (R + BAND + 8))
        .attr("y2", (v) => -Math.cos(ang(v)) * (R + BAND + 8))
        .attr("stroke", "#94a3b8")
        .attr("stroke-width", 0.8);
      sel
        .selectAll("text")
        .data(tv)
        .join("text")
        .attr("x", (v) => Math.sin(ang(v)) * (R + BAND + 14))
        .attr("y", (v) => -Math.cos(ang(v)) * (R + BAND + 14))
        .attr("dy", ".32em")
        .attr("font-size", 10.5)
        .attr("font-weight", 600)
        .attr("fill", "#64748b")
        .text((v) => v);
    });

    g.selectAll("text.dimname")
      .data(rightGroups)
      .join("text")
      .attr("x", (d) => Math.sin((d.start + d.end) / 2) * (R + BAND + 44))
      .attr("y", (d) => -Math.cos((d.start + d.end) / 2) * (R + BAND + 44))
      .attr("dy", ".32em")
      .attr("font-size", 17)
      .attr("font-weight", 800)
      .attr("fill", "#111")
      .text((d) => d.name);

    const labels = leftGroups
      .map((d) => {
        const m = (d.start + d.end) / 2;
        return {
          d,
          m,
          x1: Math.sin(m) * (R + BAND + 2),
          y1: -Math.cos(m) * (R + BAND + 2),
          y: -Math.cos(m) * (R + BAND + 18),
        };
      })
      .sort((a, b) => a.y - b.y);
    for (let i = 1; i < labels.length; i++) {
      if (labels[i].y < labels[i - 1].y + 19) {
        labels[i].y = labels[i - 1].y + 19;
      }
    }

    const labG = g.selectAll("g.lab").data(labels).join("g");
    labG
      .append("polyline")
      .attr(
        "points",
        (d) =>
          `${d.x1},${d.y1} ${Math.sin(d.m) * (R + BAND + 18)},${d.y} ${-(R + BAND + 32)},${d.y}`,
      )
      .attr("fill", "none")
      .attr("stroke", (d) => d.d.color)
      .attr("stroke-width", 1)
      .attr("stroke-opacity", 0.75);
    labG
      .append("text")
      .attr("x", -(R + BAND + 38))
      .attr("y", (d) => d.y)
      .attr("dy", ".32em")
      .attr("text-anchor", "end")
      .attr("font-size", 14.5)
      .attr("font-weight", 700)
      .attr("fill", (d) => d.d.color)
      .text((d) => `${d.d.id} ${d.d.name}`);

    /* ---------------- 4. Auto-fit viewBox ---------------- */
    const bb = (svg.node() as SVGSVGElement).getBBox();
    svg.attr(
      "viewBox",
      `${bb.x - 24} ${bb.y - 24} ${bb.width + 48} ${bb.height + 48}`,
    );

    /* ---------------- 5. Interaction ---------------- */
    const focus = (p: (d: (typeof chords)[number]) => boolean) =>
      rib.attr("opacity", (d) => (p(d) ? 1 : 0.18));

    rib.on("mouseenter", (_e, d) => {
      focus((x) => x === d);
      tipNode
        .style("opacity", 1)
        .html(
          `<b>${SDG_META[d.goal].id} ${SDG_META[d.goal].name}</b> → ${SDG_DIMENSIONS[d.dim].name}<br>` +
            `${d.type === "syn" ? "synergy" : "trade-off"}, Σ|score| = ${d.val.toFixed(2)}`,
        );
    })
      .on("mousemove", (e) => {
        const figureRect = figureRef.current!.getBoundingClientRect();
        const tipEl = tipRef.current;
        const tipW = tipEl ? tipEl.offsetWidth || 250 : 250;
        const tipH = tipEl ? tipEl.offsetHeight || 65 : 65;
        const posX = Math.min(
          figureRect.width - 8,
          Math.max(tipW + 8, e.clientX - figureRect.left - 16),
        );
        const posY = Math.max(tipH + 8, e.clientY - figureRect.top - 16);
        tipNode
          .style("left", `${posX}px`)
          .style("top", `${posY}px`);
      })
      .on("mouseleave", () => {
        rib.attr("opacity", 1);
        tipNode.style("opacity", 0);
      });
    g.selectAll("path.goal")
      .on("mouseenter", (_e, d) => focus((x) => x.goal + 1 === d.id))
      .on("mouseleave", () => rib.attr("opacity", 1));
    g.selectAll("path.dim")
      .on("mouseenter", (_e, d) => focus((x) => x.dim === d.d))
      .on("mouseleave", () => rib.attr("opacity", 1));

    return () => {
      host.innerHTML = "";
      tipNode.style("opacity", 0);
    };
  }, [d3]);

  return (
    <figure ref={figureRef} className={`${numbered ? "wiki-figure " : ""}sust-chord`}>
      <div
        className={scrollable ? "sust-chord__scroll" : undefined}
        tabIndex={scrollable ? 0 : undefined}
        role={scrollable ? "region" : undefined}
        aria-label={scrollable ? caption : undefined}
      >
        <div className="sust-chord__host" ref={hostRef}>
          {missing ? (
            <p className="sust-chord__missing">
              The chord diagram needs d3 (public/vendor/d3.min.js is not loaded).
            </p>
          ) : null}
        </div>
      </div>
      <div className="sust-chord__tooltip" ref={tipRef} />
      <figcaption className="sust-chart-caption">
        {caption}
      </figcaption>
    </figure>
  );
}


