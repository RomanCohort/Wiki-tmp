import { useEffect, useRef } from "react";
import * as echarts from "../shared/echartsRuntime";
import confidenceData from "../../../../data/drylab/modelConfidenceData.json";
import heatmapData from "../../../../data/drylab/modelHeatmapData.json";
import type { EpitopeHeatmapRow } from "../../../../data/project/epitopeStructuralData";
import { createEpitopeHeatmapOption, createEpitopeVolumeOption } from "../project/EpitopeStructuralValidationChart";

const GROUP_COLORS = {
  TROP2: "#207062",
  "B7-H4": "#aa8417",
  "Nectin-4": "#2c5fa8",
  "LIV-1": "#b43c4c",
};
// ECharts rich-text style names must not contain hyphens.
const GROUP_STYLES = Object.fromEntries(
  Object.keys(GROUP_COLORS).map((name, index) => [name, `group${index}`]),
);

/** Shared ECharts lifecycle: resize with its container and dispose on unmount. */
function ModelChart({
  option,
  label,
  heatmap = false,
}: {
  option: echarts.EChartsOption;
  label: string;
  heatmap?: boolean;
}) {
  const element = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const node = element.current;
    if (!node) return;
    const chart = echarts.init(node);
    chart.setOption(option);
    const observer = new ResizeObserver(() => chart.resize());
    observer.observe(node);
    return () => {
      observer.disconnect();
      chart.dispose();
    };
  }, [option]);
  return (
    <div
      ref={element}
      className={`model-chart${heatmap ? " model-chart--heatmap" : ""}`}
      role="img"
      aria-label={label}
    />
  );
}

const heatmapRows: EpitopeHeatmapRow[] = heatmapData.map((row) => ({
  ...row,
  target: row.target as EpitopeHeatmapRow["target"],
  targetColor: GROUP_COLORS[row.target as keyof typeof GROUP_COLORS],
  passed: !["FLAEASVRG", "HILHVSFLA"].includes(row.peptide),
}));
const heatmapOption = createEpitopeHeatmapOption(heatmapRows, true);
heatmapOption.title = { show: false };
heatmapOption.animation = false;
heatmapOption.grid = { top: 12, left: 156, right: 12, bottom: 40 };
// All antigens use TROP2's green ramp on the same 0–100% scale.
const originalSeries = heatmapOption.series as echarts.SeriesOption[];
const burialSeries = originalSeries[0] as echarts.HeatmapSeriesOption;
heatmapOption.series = [
  ...Object.keys(GROUP_COLORS).map((target) => ({
    ...burialSeries,
    name: target,
    data: heatmapRows.flatMap((row, y) =>
      row.target !== target
        ? []
        : row.values.flatMap((value, x) =>
            value === null ? [] : [[x, y, value]],
          ),
    ),
  })),
  originalSeries[1],
];
heatmapOption.visualMap = Object.values(GROUP_COLORS).map(
  (_color, seriesIndex) => ({
    type: "continuous",
    show: false,
    min: 0,
    max: 100,
    dimension: 2,
    seriesIndex,
    inRange: { color: ["#ffffff", GROUP_COLORS.TROP2] },
  }),
);
heatmapOption.yAxis = {
  type: "category",
  data: heatmapRows.map((row) => row.peptide),
  inverse: true,
  axisLine: { lineStyle: { color: "#d2dcd7" } },
  axisLabel: {
    fontSize: 10,
    formatter: (_value: string, index: number) => {
      const row = heatmapRows[index];
      return `{${GROUP_STYLES[row.target]}|${row.target}} {${row.passed ? "pass" : "fail"}|${row.peptide}}`;
    },
    rich: {
      ...Object.fromEntries(
        Object.entries(GROUP_COLORS).map(([name, color]) => [
          GROUP_STYLES[name],
          { color, fontSize: 9, fontWeight: 700, width: 47 },
        ]),
      ),
      pass: { color: "#20332d", fontFamily: "monospace", fontSize: 10 },
      fail: { color: "#b34d3f", fontFamily: "monospace", fontSize: 10 },
    },
  },
};

export function ModelBurialHeatmap() {
  return (
    <div className="model-chart-panel">
      <ModelChart
        option={heatmapOption}
        heatmap
        label="Per-position side-chain burial: 17 candidates by P1–P9. Hover a cell for its measured percentage; hatched cells have no side chain."
      />
      <div
        className="model-heatmap-legend"
        aria-label="Side-chain burial: light 0%, dark 100% in each antigen group"
      >
        {Object.keys(GROUP_COLORS).map((target) => (
          <div key={target} data-target={target}>
            <span>{target}</span>
            <i aria-hidden="true" />
            <small>0–100%</small>
          </div>
        ))}
      </div>
      <details className="model-chart-data">
        <summary>View data</summary>
        <div className="wiki-table-wrap">
          <table className="wiki-table">
            <thead>
              <tr>
                <th scope="col">Peptide</th>
                {Array.from({ length: 9 }, (_, i) => (
                  <th scope="col" key={i}>
                    P{i + 1}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {heatmapRows.map((row) => (
                <tr key={row.peptide}>
                  <th scope="row">{row.peptide}</th>
                  {row.values.map((value, i) => (
                    <td key={i}>{value !== null ? `${value.toFixed(1)}%` : "—"}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>
    </div>
  );
}

export { ModelVolcanoChart as ModelVolcano } from "./ModelVolcanoChart";

const volumeOption = createEpitopeVolumeOption();

export function ModelP9Volume() {
  return <ModelChart option={volumeOption} heatmap label="Position-9 buried surface area and fill ratio for 17 candidates. Hover a bar for the mean, standard deviation, fill ratio and pass status." />;
}

// eslint-disable-next-line react-refresh/only-export-components
export function createModelConfidenceOption(): echarts.EChartsOption {
  return {
    animation: false,
    grid: { left: 65, right: 24, top: 48, bottom: 85 },
    legend: { top: 8, selectedMode: false },
    tooltip: {
      trigger: "item",
      confine: true,
      formatter: (params) => {
        const row = (Array.isArray(params) ? params[0] : params).data as typeof confidenceData.rows[number];
        if (!row?.peptide) return "";
        return `<strong>${echarts.format.encodeHTML(row.peptide)}</strong><br/>Mean ipTM: ${row.iptm.toFixed(3)}<br/>P9 buried area: ${row.buriedArea.toFixed(2)} Å²<br/>P9 fill ratio: ${row.fill.toFixed(2)}%<br/>Status: ${row.passed ? "Pass" : "Rejected"}<br/>` +
          row.models.map((score, i) => `Model ${i}: ${score.toFixed(3)}`).join("<br/>");
      },
    },
    xAxis: {
      type: "value", min: 0, max: 130,
      name: "P9 fill ratio (% of leucine reference)", nameLocation: "middle", nameGap: 40,
      nameTextStyle: { fontSize: 11 },
      splitLine: { lineStyle: { color: "#edf1ef" } },
    },
    yAxis: {
      type: "value", min: 0.8, max: 1, interval: 0.05,
      name: "Mean ipTM", nameLocation: "middle", nameGap: 45,
      nameTextStyle: { fontSize: 11 },
      axisLabel: { formatter: (value: number) => value.toFixed(2) },
      splitLine: { lineStyle: { color: "#edf1ef" } },
    },
    series: [true, false].map((passed) => ({
      name: passed ? "Pass (15)" : "Rejected (2)",
      type: "scatter",
      symbol: passed ? "circle" : "diamond",
      symbolSize: passed ? 11 : 15,
      itemStyle: { color: passed ? "#207062" : "#b34d3f", borderColor: "#fff", borderWidth: 1.5 },
      emphasis: { scale: 1.4 },
      data: confidenceData.rows.filter((row) => row.passed === passed).map((row) => ({ ...row, name: row.peptide, value: [row.fill, row.iptm] })),
      label: { show: !passed, formatter: "{b}", position: "bottom", color: "#b34d3f", fontSize: 10 },
      labelLayout: { hideOverlap: true },
      ...(passed ? {
        markLine: {
          silent: true, symbol: ["none", "none"],
          lineStyle: { type: "dashed", color: "#6e7f79" },
          label: { formatter: "60% threshold", position: "insideStartTop", fontSize: 10 },
          data: [{ xAxis: 60 }],
        },
        markArea: { silent: true, itemStyle: { color: "rgba(32,112,98,0.06)" }, data: [[{ xAxis: 60 }, { xAxis: 130 }]] },
      } : {}),
    })),
  };
}

const confidenceOption = createModelConfidenceOption();
export function ModelConfidenceScatter() {
  return (
    <div className="model-chart-panel">
      <ModelChart option={confidenceOption} label="Mean ipTM versus P9 fill ratio for 17 candidates. Fifteen pass and two are rejected. Hover a point for all five model scores." />
      <details className="model-chart-data">
        <summary>View data</summary>
        <div className="wiki-table-wrap">
          <table className="wiki-table">
            <thead><tr><th scope="col">Peptide</th><th scope="col">Mean ipTM</th><th scope="col">P9 fill (%)</th><th scope="col">Status</th>{Array.from({ length: 5 }, (_, i) => <th scope="col" key={i}>Model {i}</th>)}</tr></thead>
            <tbody>{confidenceData.rows.map((row) => <tr key={row.peptide}><th scope="row">{row.peptide}</th><td>{row.iptm.toFixed(3)}</td><td>{row.fill.toFixed(2)}</td><td>{row.passed ? "Pass" : "Rejected"}</td>{row.models.map((score, i) => <td key={i}>{score.toFixed(3)}</td>)}</tr>)}</tbody>
          </table>
        </div>
      </details>
    </div>
  );
}
