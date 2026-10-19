/* eslint-disable react-refresh/only-export-components */
import { useEffect, useRef, useState } from "react";
import * as echarts from "../shared/echartsRuntime";
import {
  EPITOPE_HEATMAP_DATA,
  EPITOPE_VOLUME_DATA,
  POSITIONS,
} from "../../../../data/project/epitopeStructuralData";
import "../../../../styles/features/epitope-structural-validation-chart.css";

type ViewMode = "dual" | "heatmap" | "volume";

export function EpitopeStructuralValidationChart({
  captions,
  badges,
  heatmapFigureTitle,
}: {
  /** A host manuscript can supply its own two captions without the legacy notes. */
  captions?: readonly [string, string];
  /** Explicit FIG badges rendered next to each per-card caption. */
  badges?: readonly [string, string];
  /** Overrides the in-canvas heatmap title prefix (e.g. "Figure 10."). */
  heatmapFigureTitle?: string;
} = {}) {
  const [mode, setMode] = useState<ViewMode>("dual");

  const heatmapDomRef = useRef<HTMLDivElement | null>(null);
  const barDomRef = useRef<HTMLDivElement | null>(null);

  const heatmapChartRef = useRef<echarts.ECharts | null>(null);
  const barChartRef = useRef<echarts.ECharts | null>(null);

  /* ------------------------------------------------ Heatmap Chart Setup */
  useEffect(() => {
    if (mode === "volume" || !heatmapDomRef.current) {
      if (heatmapChartRef.current) {
        heatmapChartRef.current.dispose();
        heatmapChartRef.current = null;
      }
      return;
    }

    if (!heatmapChartRef.current) {
      heatmapChartRef.current = echarts.init(heatmapDomRef.current);
    }
    const chart = heatmapChartRef.current;

    const option = createEpitopeHeatmapOption(
      EPITOPE_HEATMAP_DATA,
      false,
      heatmapFigureTitle ?? "Figure 11.",
    );

    chart.setOption(option, true);
    chart.resize();
  }, [mode]);

  /* --------------------------------------------- Horizontal Bar Chart Setup */
  useEffect(() => {
    if (mode === "heatmap" || !barDomRef.current) {
      if (barChartRef.current) {
        barChartRef.current.dispose();
        barChartRef.current = null;
      }
      return;
    }

    if (!barChartRef.current) {
      barChartRef.current = echarts.init(barDomRef.current);
    }
    const chart = barChartRef.current;

    const option = createEpitopeVolumeOption();

    chart.setOption(option, true);
    chart.resize();
  }, [mode]);

  /* ------------------------------------------------ Responsive resize logic */
  useEffect(() => {
    const handleResize = () => {
      heatmapChartRef.current?.resize();
      barChartRef.current?.resize();
    };

    window.addEventListener("resize", handleResize);

    const resizeObserver = new ResizeObserver(() => {
      heatmapChartRef.current?.resize();
      barChartRef.current?.resize();
    });

    if (heatmapDomRef.current) resizeObserver.observe(heatmapDomRef.current);
    if (barDomRef.current) resizeObserver.observe(barDomRef.current);

    return () => {
      window.removeEventListener("resize", handleResize);
      resizeObserver.disconnect();
      heatmapChartRef.current?.dispose();
      barChartRef.current?.dispose();
      heatmapChartRef.current = null;
      barChartRef.current = null;
    };
  }, []);

  return (
    <figure
      className={`wiki-figure epitope-validation-panel${captions ? " epitope-validation-panel--manuscript" : ""}`}
    >
      {/* Header with Mode Toggle */}
      <header className="epitope-validation-header">
        {!captions && (
          <h3 className="epitope-validation-title">
            <span>Structural Validation of 17 Candidate Epitopes</span>
            <span className="epitope-validation-badge">
              HLA-A*02:01 Groove Loading
            </span>
          </h3>
        )}

        <div
          className="epitope-validation-modes"
          role="tablist"
          aria-label="View selection"
        >
          <button
            type="button"
            className={`epitope-mode-btn ${mode === "dual" ? "is-active" : ""}`}
            onClick={() => setMode("dual")}
            role="tab"
            aria-selected={mode === "dual"}
          >
            {captions ? "Both charts" : "Dual View (左右双栏)"}
          </button>
          <button
            type="button"
            className={`epitope-mode-btn ${mode === "heatmap" ? "is-active" : ""}`}
            onClick={() => setMode("heatmap")}
            role="tab"
            aria-selected={mode === "heatmap"}
          >
            {captions ? "Burial heatmap" : "Fig 11 Burial Heatmap (位点包埋)"}
          </button>
          <button
            type="button"
            className={`epitope-mode-btn ${mode === "volume" ? "is-active" : ""}`}
            onClick={() => setMode("volume")}
            role="tab"
            aria-selected={mode === "volume"}
          >
            {captions ? "P9 buried area" : "P9 Volume & Fill (填充容积)"}
          </button>
        </div>
      </header>

      {/* Charts Display Grid */}
      <div
        className={`epitope-charts-container epitope-charts-container--${mode}`}
      >
        {(mode === "dual" || mode === "heatmap") && (
          <div className="epitope-chart-card">
            {!captions && (
              <div className="epitope-chart-card__header">
                <h4 className="epitope-chart-card__title">
                  Figure 11. Per-Position Side-Chain Burial Across Positions
                  P1–P9
                </h4>
                <p className="epitope-chart-card__subtitle">
                  Mean across 5 independent co-folded models. Grouped by source
                  antigen: TROP2, B7-H4, Nectin-4, LIV-1.
                </p>
              </div>
            )}
            <div ref={heatmapDomRef} className="epitope-chart-instance" />
            {captions && (
              <div className="epitope-card-caption">
                {badges?.[0] && (
                  <span className="epitope-card-caption__badge">{badges[0]}</span>
                )}
                <p>{captions[0]}</p>
              </div>
            )}
          </div>
        )}

        {(mode === "dual" || mode === "volume") && (
          <div className="epitope-chart-card">
            {!captions && (
              <div className="epitope-chart-card__header">
                <h4 className="epitope-chart-card__title">
                  Position-9 Buried Surface Area and Fill Ratio Relative to
                  Leucine
                </h4>
                <p className="epitope-chart-card__subtitle">
                  Threshold: ≥ 84 Å² (60% of 140 Å² Leu anchor reference). Bars
                  show mean ± 1 SD.
                </p>
              </div>
            )}
            <div ref={barDomRef} className="epitope-chart-instance" />
            {captions && (
              <div className="epitope-card-caption">
                {badges?.[1] && (
                  <span className="epitope-card-caption__badge">{badges[1]}</span>
                )}
                <p>{captions[1]}</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Captions and Editorial Notes Underneath */}
      {!captions && (
        <figcaption className="epitope-validation-caption">
          <div className="epitope-caption-entry">
            <strong>
              Figure 11. Per-position side-chain burial for the 17 candidate
              epitopes, averaged over five models.
            </strong>
            <p>
              Side-chain solvent-accessible surface area (SASA) burial
              percentage across peptide positions P1 through P9 in complex with
              HLA-A*02:01. Cells with diagonal hatching denote glycine residues
              (P1 in GVATLAWMV and GLHNFSDGL; P3 in FIGHYAENV; P5 in WLKEGVLGL
              and TVSEGTHFL; P4/P6 in YINGRGHLV; P8 in WLKEGVLGL and GLHNFSDGL;
              P9 in FLAEASVRG), which possess no side chain. Both primary anchor
              residues (P2 and P9) exhibit near-complete nominal burial (≥ 99%)
              across almost all candidates.
            </p>
          </div>

          <div className="epitope-caption-entry">
            <strong>
              Burial percentage saturates on small side chains; filling volume
              does not.
            </strong>
            <p>
              Mean position-9 buried side-chain surface area across five folded
              models with error bars representing ±1 SD. Labels display the fill
              ratio relative to the canonical leucine anchor reference (140 Å²).
              While nominal burial percentage saturates at ~100% due to pocket
              encapsulation, absolute buried volume differentiates geometric
              fit: 15 peptides clear the derived 60% fill-ratio criterion (≥ 84
              Å²), while 2 peptides are rejected (
              <span className="epitope-highlight-fail">FLAEASVRG</span> at 0% /
              0 Å² and <span className="epitope-highlight-fail">HILHVSFLA</span>{" "}
              at 43% / 60.1 Å²).
            </p>
          </div>

          <div className="epitope-academic-note">
            <h4>Academic & Structural Interpretation</h4>
            <p>
              The fill-ratio criterion performs critical discriminative work
              that burial percentage alone cannot. In the HLA-A*02:01 binding
              groove, deep anchor pockets enclose small side chains entirely,
              yielding false-positive burial scores of 99–100% (e.g. HILHVSFLA
              at 99.4% burial). By evaluating absolute volume against the 140 Å²
              reference anchor, under-filled pockets that fail to support stable
              hydrophobic anchoring are cleanly eliminated prior to wet-lab
              synthesis.
            </p>
          </div>
        </figcaption>
      )}
    </figure>
  );
}

/** Shared ECharts option used by Results and Model; no second heatmap renderer. */
export function createEpitopeHeatmapOption(
  rows: typeof EPITOPE_HEATMAP_DATA = EPITOPE_HEATMAP_DATA,
  hideEmptyValues = false,
  figureTitle = "Figure 11.",
): echarts.EChartsOption {
    const yCategories = rows.map((d) => d.peptide);

    // Format valid data cells: [xIndex, yIndex, value]
    const validCells: [number, number, number][] = [];
    // Cells with null (Glycine / no side chain)
    const missingCells: [number, number, string][] = [];

    rows.forEach((row, yIdx) => {
      row.values.forEach((val, xIdx) => {
        if (val !== null && !isNaN(val)) {
          validCells.push([xIdx, yIdx, val]);
        } else {
          missingCells.push([xIdx, yIdx, "Gly"]);
        }
      });
    });

    const option: echarts.EChartsOption = {
      title: {
        text: `${figureTitle} Per-position side-chain burial across 17 candidates`,
        subtext: "Mean of five independent models · hatched = glycine (no side chain)",
        left: "left",
        top: 4,
        textStyle: { fontSize: 13, fontWeight: "bold", color: "#16332a" },
        subtextStyle: { fontSize: 11, color: "#617b73" },
      },
      tooltip: {
        position: "top",
        formatter: (p) => {
          const params = p as echarts.DefaultLabelFormatterCallbackParams;
          if (params.seriesType === "custom") {
            if (hideEmptyValues) return "";
            const [xIdx, yIdx] = params.value as number[];
            const row = rows[yIdx];
            return `
              <div style="font-size:12px; line-height:1.4;">
                <strong style="color:${row.targetColor};">${row.target}</strong>: <strong>${row.peptide}</strong><br/>
                Position: <strong>${POSITIONS[xIdx]}</strong><br/>
                Residue: <strong>Glycine</strong> (no side chain)<br/>
                <span style="color:#b34d3f; font-weight:600;">Side-chain burial: Undefined / N/A</span>
              </div>
            `;
          }
          const [xIdx, yIdx, val] = params.value as number[];
          if (hideEmptyValues && !val) return "";
          const row = rows[yIdx];
          const status = row.passed
            ? '<span style="color:#207062; font-weight:600;">✓ Pass</span>'
            : '<span style="color:#b34d3f; font-weight:600;">✗ Rejected (P9 volume failure)</span>';
          return `
            <div style="font-size:12px; line-height:1.4;">
              <strong style="color:${row.targetColor};">${row.target}</strong>: <strong>${row.peptide}</strong><br/>
              Position: <strong>${POSITIONS[xIdx]}</strong><br/>
              Side-chain burial: <strong>${val}%</strong><br/>
              Construct status: ${status}
            </div>
          `;
        },
      },
      grid: {
        top: 70,
        left: 115,
        right: 25,
        bottom: 85,
      },
      xAxis: {
        type: "category",
        data: POSITIONS as unknown as string[],
        splitArea: { show: true },
        axisLine: { lineStyle: { color: "#d2dcd7" } },
        axisLabel: { color: "#2d3e38", fontWeight: 600, fontSize: 11 },
      },
      yAxis: {
        type: "category",
        data: yCategories,
        inverse: true, // Render in dataset order from top to bottom
        splitArea: { show: true },
        axisLine: { lineStyle: { color: "#d2dcd7" } },
        axisLabel: {
          formatter: (value: string) => {
            const row = rows.find((r) => r.peptide === value);
            if (!row) return value;
            const tag = row.target.slice(0, 1);
            return `{tgt${tag}|${row.target.slice(0, 4)}} {${row.passed ? "pass" : "fail"}|${value}}`;
          },
          rich: {
            tgtT: { color: "#207062", fontWeight: 700, fontSize: 9 },
            tgtB: { color: "#b06b2a", fontWeight: 700, fontSize: 9 },
            tgtN: { color: "#2c5fa8", fontWeight: 700, fontSize: 9 },
            tgtL: { color: "#9d384b", fontWeight: 700, fontSize: 9 },
            pass: { color: "#20332d", fontWeight: 500, fontSize: 10.5, fontFamily: "monospace" },
            fail: { color: "#b34d3f", fontWeight: 700, fontSize: 10.5, fontFamily: "monospace" },
          },
        },
      },
      visualMap: {
        min: 0,
        max: 100,
        calculable: false,
        orient: "horizontal",
        left: "center",
        bottom: 12,
        inRange: {
          // Mint to dark pine forest green
          color: ["#ffffff", "#e1f3ec", "#9cd8c5", "#4ea98f", "#26725e", "#164438"],
        },
        text: ["100%", "0%"],
        textStyle: { color: "#455953", fontSize: 10.5 },
      },
      series: [
        {
          name: "Burial (%)",
          type: "heatmap",
          data: validCells,
          itemStyle: {
            borderColor: "#ffffff",
            borderWidth: 1.5,
          },
        },
        {
          name: "Glycine (No Side Chain)",
          type: "custom",
          renderItem: (_params, api) => {
            const pt = api.coord([api.value(0), api.value(1)]);
            const size = api.size!([1, 1]) as number[];
            const halfW = size[0] / 2;
            const halfH = size[1] / 2;
            return {
              type: "group",
              children: [
                {
                  type: "rect",
                  shape: {
                    x: pt[0] - halfW,
                    y: pt[1] - halfH,
                    width: size[0],
                    height: size[1],
                  },
                  style: {
                    fill: "#f0f2f2",
                    stroke: "#ffffff",
                    lineWidth: 1.5,
                  },
                },
                // Diagonal hatched lines
                {
                  type: "line",
                  shape: {
                    x1: pt[0] - halfW,
                    y1: pt[1] + halfH,
                    x2: pt[0] + halfW,
                    y2: pt[1] - halfH,
                  },
                  style: {
                    stroke: "#d1d7d7",
                    lineWidth: 1.2,
                  },
                },
              ],
            };
          },
          data: missingCells,
        },
      ],
    };

    return option;
}

export function createEpitopeVolumeOption(): echarts.EChartsOption {
  const yCategories = EPITOPE_VOLUME_DATA.map((d) => `${d.peptide} (${d.resn})`);

  const barData = EPITOPE_VOLUME_DATA.map((row) => ({
    value: row.mean,
    itemStyle: {
      color: row.passed ? "#266a58" : "#b34d3f",
      borderRadius: [0, 3, 3, 0],
    },
    label: {
      color: row.passed ? "#31453e" : "#b34d3f",
    },
  }));

  const option: echarts.EChartsOption = {
    title: {
      text: "P9 Anchor buried volume & fill ratio relative to Leu",
      subtext: "Mean of five models · bars show ±1 SD · labels give fill ratio relative to 140 Å² Leu",
      left: "left",
      top: 4,
      textStyle: { fontSize: 13, fontWeight: "bold", color: "#16332a" },
      subtextStyle: { fontSize: 11, color: "#617b73" },
    },
    tooltip: {
      trigger: "axis",
      axisPointer: { type: "shadow" },
      formatter: (params) => {
        const item = (params as echarts.DefaultLabelFormatterCallbackParams[])[0];
        const row = EPITOPE_VOLUME_DATA[item.dataIndex];
        const statusText = row.passed
          ? '<span style="color:#207062; font-weight:600;">✓ Pass (≥ 60% fill)</span>'
          : '<span style="color:#b34d3f; font-weight:600;">✗ Rejected (< 60% fill)</span>';
        return `
          <div style="font-size:12px; line-height:1.4;">
            <strong>${row.peptide}</strong> (${row.resn})<br/>
            P9 Buried surface: <strong>${row.mean} ± ${row.sd} Å²</strong><br/>
            Fill ratio relative to Leu: <strong>${row.fill}%</strong> (criterion: ≥ 84 Å² / 60%)<br/>
            Status: ${statusText}
          </div>
        `;
      },
    },
    legend: {
      right: 15,
      top: 36,
      itemWidth: 12,
      itemHeight: 12,
      data: [
        { name: "passes the fill criterion", itemStyle: { color: "#266a58" } },
        { name: "rejected at this tier", itemStyle: { color: "#b34d3f" } },
      ],
      textStyle: { fontSize: 10.5, color: "#4a5e57" },
    },
    grid: {
      top: 70,
      left: 125,
      right: 48,
      bottom: 50,
    },
    xAxis: {
      type: "value",
      min: 0,
      max: 200,
      name: "Buried surface on binding (Å²)",
      nameLocation: "middle",
      nameGap: 28,
      nameTextStyle: { color: "#4a5e57", fontSize: 11 },
      splitLine: { lineStyle: { color: "#eef2f0" } },
      axisLabel: { color: "#4a5e57", fontSize: 10.5 },
    },
    yAxis: {
      type: "category",
      data: yCategories,
      inverse: true, // Highest volume at the top
      axisLine: { lineStyle: { color: "#d2dcd7" } },
      axisLabel: {
        formatter: (value: string) => {
          const isFail = value.includes("HILHVSFLA") || value.includes("FLAEASVRG");
          return `{${isFail ? "fail" : "pass"}|${value}}`;
        },
        rich: {
          pass: { color: "#20332d", fontWeight: 500, fontSize: 10.5, fontFamily: "monospace" },
          fail: { color: "#b34d3f", fontWeight: 700, fontSize: 10.5, fontFamily: "monospace" },
        },
      },
    },
    series: [
      {
        name: "passes the fill criterion",
        type: "bar",
        data: barData,
        barWidth: 13,
        label: {
          show: true,
          position: "right",
          distance: 6,
          formatter: (params) => {
            const row = EPITOPE_VOLUME_DATA[params.dataIndex];
            return `${row.fill}%`;
          },
          fontSize: 10,
          fontWeight: "bold",
        },
        markArea: {
          silent: true,
          itemStyle: { color: "rgba(38, 106, 88, 0.04)" },
          data: [
            [
              { xAxis: 84 },
              { xAxis: 200 },
            ],
          ],
        },
        markLine: {
          symbol: ["none", "none"],
          silent: false,
          data: [
            {
              xAxis: 84,
              lineStyle: { type: "dashed", color: "#6e7f79", width: 1.5 },
              label: {
                formatter: "criterion 84 Å²\n(= 60% of Leu)",
                position: "insideEndTop",
                color: "#465b53",
                fontSize: 9.5,
                padding: [0, 0, 0, 4],
              },
            },
            {
              xAxis: 140,
              lineStyle: { type: "solid", color: "#388e7b", width: 1.5 },
              label: {
                formatter: "Leu reference\n140 Å²",
                position: "insideEndTop",
                color: "#1d6553",
                fontSize: 9.5,
                padding: [0, 0, 0, 4],
              },
            },
          ],
        },
      },
      // Fake series for the "rejected" legend toggle
      {
        name: "rejected at this tier",
        type: "bar",
        data: [],
        itemStyle: { color: "#b34d3f" },
      },
      // Custom series for ±1 SD error bars
      {
        name: "Error Bar",
        type: "custom",
        renderItem: (_params, api) => {
          const index = api.value(1) as number;
          const row = EPITOPE_VOLUME_DATA[index];
          if (!row || row.sd === 0) return null;
          const start = api.coord([Math.max(0, row.mean - row.sd), index]);
          const end = api.coord([row.mean + row.sd, index]);
          const cap = 3;
          return {
            type: "group",
            children: [
              {
                type: "line",
                shape: { x1: start[0], y1: start[1], x2: end[0], y2: end[1] },
                style: { stroke: "#1f2624", lineWidth: 1.2 },
              },
              {
                type: "line",
                shape: { x1: start[0], y1: start[1] - cap, x2: start[0], y2: start[1] + cap },
                style: { stroke: "#1f2624", lineWidth: 1.2 },
              },
              {
                type: "line",
                shape: { x1: end[0], y1: end[1] - cap, x2: end[0], y2: end[1] + cap },
                style: { stroke: "#1f2624", lineWidth: 1.2 },
              },
            ],
          };
        },
        data: EPITOPE_VOLUME_DATA.map((r, i) => [r.mean, i]),
      },
    ],
  };
  return option;
}
