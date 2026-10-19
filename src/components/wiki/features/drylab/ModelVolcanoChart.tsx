import { useEffect, useMemo, useRef, useState } from "react";
import * as echarts from "../shared/echartsRuntime";
import { loadModelVolcanoData, type VolcanoPoint } from "../../../../data/drylab/modelVolcanoData";

const categories = ["Up", "Down", "Other"];
const colors = ["#c74d55", "#4c79a7", "#cbd0d4"];
const targets: Record<string, { label: string; color: string }> = {
  TACSTD2: { label: "TROP2 / TACSTD2", color: "#d56a16" },
  VTCN1: { label: "B7-H4 / VTCN1", color: "#c875a5" },
  NECTIN4: { label: "Nectin-4 / NECTIN4", color: "#0878b2" },
  PVRL4: { label: "Nectin-4 / PVRL4", color: "#0878b2" },
  SLC39A6: { label: "LIV-1 / SLC39A6", color: "#209d87" },
};

function VolcanoCanvas({
  option,
  label,
}: {
  option: echarts.EChartsOption;
  label: string;
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
      className="model-chart model-chart--volcano"
      role="img"
      aria-label={label}
    />
  );
}

export function ModelVolcanoChart({ cohort }: { cohort: "024322" | "028102" }) {
  const [data, setData] = useState<Awaited<ReturnType<typeof loadModelVolcanoData>>>();
  const [failed, setFailed] = useState(false);
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    let active = true;
    loadModelVolcanoData().then(
      (result) => { if (active) setData(result); },
      () => { if (active) setFailed(true); },
    );
    return () => { active = false; };
  }, [attempt]);
  if (data) return <VolcanoChart cohort={cohort} rows={data[cohort]} />;
  return (
    <div className="model-chart-panel model-chart-loading" role="status">
      {failed ? (
        <>
          <p>Unable to load volcano plot data.</p>
          <button className="model-action" type="button" onClick={() => {
            setFailed(false);
            setAttempt((value) => value + 1);
          }}>Retry</button>
        </>
      ) : <p>Loading volcano plot data…</p>}
    </div>
  );
}


function VolcanoChart({ cohort, rows }: { cohort: "024322" | "028102"; rows: VolcanoPoint[] }) {
  const [visible, setVisible] = useState([true, true, true]);
  const threshold = cohort === "024322" ? 0.15 : 1;
  const fdr = cohort === "024322" ? 0.05 : 0.01;
  const grouped = useMemo(() => {
    const result: VolcanoPoint[][] = [[], [], []];
    for (const point of rows) {
      const category =
        point[2] < fdr && Math.abs(point[1]) >= threshold
          ? point[1] > 0
            ? 0
            : 1
          : 2;
      result[category].push(point);
    }
    return result;
  }, [rows, threshold, fdr]);
  const option = useMemo<echarts.EChartsOption>(() => {
    const xs = rows.map((row) => row[1]);
    const yMax =
      Math.ceil(Math.max(...rows.map((row) => -Math.log10(row[2]))) / 5) * 5;
    const series: echarts.ScatterSeriesOption[] = grouped.map(
      (points, index) => ({
        name: categories[index],
        type: "scatter",
        symbolSize: 4,
        animation: false,
        data: visible[index]
          ? points.map((row) => ({
              value: [row[1], -Math.log10(row[2])],
              source: row,
            }))
          : [],
        itemStyle: { color: colors[index], opacity: 0.52 },
        emphasis: { scale: 2, itemStyle: { opacity: 1 } },
      }),
    );
    const markers = grouped.flatMap((points, index) =>
      visible[index] ? points.filter((point) => targets[point[0]]) : [],
    );
    series.push({
      name: "Candidate antigens",
      type: "scatter",
      symbol: "diamond",
      symbolSize: 14,
      data: markers.map((row) => ({
        value: [row[1], -Math.log10(row[2])],
        source: row,
        itemStyle: {
          color: targets[row[0]].color,
          borderColor: "white",
          borderWidth: 1.5,
        },
        label: {
          show: true,
          formatter: targets[row[0]].label,
          position: row[0] === "VTCN1" ? "bottom" : "top",
          color: "#20332d",
          fontSize: 10,
        },
      })),
      labelLayout: { hideOverlap: true, moveOverlap: "shiftY" },
      z: 5,
    });
    series.push({
      type: "scatter",
      data: [],
      markLine: {
        silent: true,
        symbol: "none",
        lineStyle: { color: "#7f8184", type: "dashed" },
        label: { position: "insideEndTop", fontSize: 10, formatter: "{b}" },
        data: [
          { xAxis: -threshold, name: `log₂FC = −${threshold}` },
          { xAxis: threshold, name: `log₂FC = +${threshold}` },
          { yAxis: -Math.log10(fdr), name: `BH-adjusted P = ${fdr}` },
        ],
      },
    });
    return {
      animation: false,
      grid: { left: 62, right: 24, top: 24, bottom: 72 },
      tooltip: {
        trigger: "item",
        confine: true,
        formatter: (params) => {
          const item = (Array.isArray(params) ? params[0] : params).data as {
            source?: VolcanoPoint;
          };
          if (!item.source) return "";
          const [gene, fc, p, id] = item.source;
          return `${echarts.format.encodeHTML(targets[gene]?.label ?? gene)}<br/>ID: ${echarts.format.encodeHTML(id)}<br/>log₂FC: ${fc.toFixed(4)}<br/>BH-adjusted P: ${p.toExponential(3)}`;
        },
      },
      xAxis: {
        type: "value",
        name:
          cohort === "024322"
            ? "log₂ fold change (TNBC − healthy normal)"
            : "log₂ fold change (TNBC − NAT)",
        nameLocation: "middle",
        nameGap: 38,
        nameTextStyle: { fontSize: 11 },
        min: Math.floor(Math.min(...xs)),
        max: Math.ceil(Math.max(...xs)),
        splitLine: { show: false },
      },
      yAxis: {
        type: "value",
        name: "−log₁₀ (BH-adjusted P)",
        nameLocation: "middle",
        nameGap: 43,
        min: 0,
        max: yMax,
        splitLine: { lineStyle: { color: "#edf1ef" } },
      },
      series,
    };
  }, [cohort, rows, grouped, visible, threshold, fdr]);

  return (
    <div className="model-chart-panel model-chart-panel--volcano" data-cohort={cohort}>
      <div
        className="model-chart-filters"
        role="group"
        aria-label={`PXD${cohort} protein categories`}
      >
        {categories.map((label, index) => (
          <button
            key={label}
            type="button"
            data-category={index}
            aria-pressed={visible[index]}
            onClick={() =>
              setVisible((current) =>
                current.map((on, itemIndex) =>
                  itemIndex === index ? !on : on,
                ),
              )
            }
          >
            {label} ({grouped[index].length.toLocaleString()})
          </button>
        ))}
        <button type="button" onClick={() => setVisible([true, true, true])}>
          Show all
        </button>
      </div>
      <p className="model-chart-rule">
        BH-adjusted P &lt; {fdr}; |log₂FC| ≥ {threshold}
      </p>
      <VolcanoCanvas
        option={option}
        label={`PXD${cohort} volcano plot. ${grouped[0].length} upregulated, ${grouped[1].length} downregulated and ${grouped[2].length} other proteins. Use the category buttons to filter.`}
      />
    </div>
  );
}
