/* eslint-disable react-refresh/only-export-components */
import { useEffect, useId, useMemo, useRef, useState } from "react";
import * as echarts from "./echartsRuntime";
import "../../../../styles/features/dose-prediction-explorer.css";

export interface DosePredictionRow {
  dose_ug: number;
  p_effect: number;
  p_screen: number;
  p_joint: number;
  p_joint_mcse: number;
  volume_lo: number;
  volume_median: number;
  volume_hi: number;
}

export function nearestDoseIndex(
  rows: readonly DosePredictionRow[],
  value: number,
) {
  return rows.reduce(
    (nearest, row, index) =>
      Math.abs(row.dose_ug - value) < Math.abs(rows[nearest].dose_ug - value)
        ? index
        : nearest,
    0,
  );
}

const percent = (value: number) => `${(100 * value).toFixed(2)}%`;
const volume = (value: number) =>
  value.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
const curves = [
  {
    key: "p_effect",
    name: "Tumor-control criterion",
    color: "#4b86b7",
    type: "dotted",
  },
  {
    key: "p_screen",
    name: "Viability and exposure screens",
    color: "#bd6531",
    type: "dashed",
  },
  {
    key: "p_joint",
    name: "Both in the same scenario",
    color: "#087f7e",
    type: "solid",
  },
] as const;

export function createDosePredictionOption(
  rows: readonly DosePredictionRow[],
  selected: DosePredictionRow,
  threshold: number,
): echarts.EChartsOption {
  return {
    animation: false,
    grid: { left: 54, right: 16, top: 18, bottom: 58 },
    tooltip: {
      trigger: "axis",
      confine: true,
      formatter: (params) => {
        const points = Array.isArray(params) ? params : [params];
        const value = Number((points[0] as { axisValue?: unknown })?.axisValue);
        const row = rows[nearestDoseIndex(rows, value)];
        return [
          `<strong>${row.dose_ug.toFixed(1)} μg per injection</strong>`,
          ...curves.map((curve) => `${curve.name}: ${percent(row[curve.key])}`),
        ].join("<br />");
      },
    },
    xAxis: {
      type: "value",
      min: rows[0].dose_ug,
      max: rows.at(-1)!.dose_ug,
      name: "Dose per injection (μg)",
      nameLocation: "middle",
      nameGap: 36,
      axisLine: { lineStyle: { color: "#a7bec4" } },
      axisLabel: { color: "#36576a" },
      splitLine: { show: false },
    },
    yAxis: {
      type: "value",
      min: 0,
      max: 1,
      interval: 0.2,
      axisLabel: {
        color: "#36576a",
        formatter: (value: number) => `${Math.round(value * 100)}%`,
      },
      splitLine: { lineStyle: { color: "#dfe9eb" } },
    },
    series: curves.map((curve) => ({
      name: curve.name,
      type: "line",
      showSymbol: false,
      smooth: false,
      data: rows.map((row) => [row.dose_ug, row[curve.key]]),
      lineStyle: {
        color: curve.color,
        type: curve.type,
        width: curve.key === "p_joint" ? 3 : 2.3,
      },
      itemStyle: { color: curve.color },
      markPoint: {
        symbol: "circle",
        symbolSize: 9,
        label: { show: false },
        itemStyle: { color: "#fff", borderColor: curve.color, borderWidth: 2 },
        data: [
          {
            name: curve.name,
            coord: [selected.dose_ug, selected[curve.key]] as [number, number],
          },
        ],
      },
      ...(curve.key === "p_joint"
        ? {
            markLine: {
              silent: true,
              symbol: "none",
              label: { show: false },
              lineStyle: { color: "#7a8586", type: "dashed", width: 1 },
              data: [{ yAxis: threshold }, { xAxis: selected.dose_ug }],
            },
          }
        : {}),
    })),
  };
}

/** A shared, local-data explorer. Every readout uses one supplied grid row. */
export function DosePredictionExplorer({
  rows,
  draws,
  downloadUrl,
  initialDose = 11.5,
  threshold = 0.8,
}: {
  rows: readonly DosePredictionRow[];
  draws: number;
  downloadUrl: string;
  initialDose?: number;
  threshold?: number;
}) {
  const id = useId();
  const [selectedIndex, setSelectedIndex] = useState(() =>
    nearestDoseIndex(rows, initialDose),
  );
  const selected = rows[selectedIndex];
  const [numberInput, setNumberInput] = useState(selected.dose_ug.toFixed(1));
  const element = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<echarts.ECharts | null>(null);
  const option = useMemo(
    () => createDosePredictionOption(rows, selected, threshold),
    [rows, selected, threshold],
  );
  const count = (value: number) =>
    Math.round(value * draws).toLocaleString("en-US");
  const jointCount = Math.round(selected.p_joint * draws);
  const effectOnly = Math.round(selected.p_effect * draws) - jointCount;
  const passes = selected.p_joint >= threshold;
  const selectDose = (value: number) => {
    const index = nearestDoseIndex(rows, value);
    setSelectedIndex(index);
    setNumberInput(rows[index].dose_ug.toFixed(1));
  };

  useEffect(() => {
    if (!element.current) return;
    const chart = echarts.init(element.current);
    chartInstance.current = chart;
    const observer = new ResizeObserver(() => chart.resize());
    observer.observe(element.current);
    const click = (event: { offsetX: number; offsetY: number }) => {
      const point = [event.offsetX, event.offsetY];
      if (!chart.containPixel("grid", point)) return;
      const value = chart.convertFromPixel({ gridIndex: 0 }, point) as number[];
      const index = nearestDoseIndex(rows, value[0]);
      setSelectedIndex(index);
      setNumberInput(rows[index].dose_ug.toFixed(1));
    };
    chart.getZr().on("click", click);
    return () => {
      observer.disconnect();
      chart.getZr().off("click", click);
      chart.dispose();
      chartInstance.current = null;
    };
  }, [rows]);

  useEffect(() => {
    chartInstance.current?.setOption(option, true);
  }, [option]);

  return (
    <section
      className="dose-prediction-explorer"
      aria-labelledby={`${id}-title`}
    >
      <header>
        <h3 id={`${id}-title`}>Explore predictions by dose per injection</h3>
        <p className="dose-prediction-explorer__meta">
          Layer 3 · Module 6: joint efficacy and proxy screens · every 7 days, 5
          injections · day 35 endpoint
        </p>
      </header>
      <p>
        Each dose is evaluated in {draws.toLocaleString("en-US")} model
        scenarios with different delivery and immune-response conditions. The
        three percentages show how many scenarios meet each criterion. Every
        dose uses the same paired scenarios.
      </p>
      <div
        className="dose-prediction-explorer__controls"
        onKeyDownCapture={(event) => {
          // The reader routes navigation keys to document scrolling. Inputs
          // keep their native keyboard behavior without moving the article.
          if (
            [
              "ArrowLeft",
              "ArrowRight",
              "ArrowUp",
              "ArrowDown",
              "Home",
              "End",
              "PageUp",
              "PageDown",
              " ",
            ].includes(event.key)
          )
            event.stopPropagation();
        }}
      >
        <label htmlFor={`${id}-range`}>Dose per injection (μg)</label>
        <input
          id={`${id}-range`}
          type="range"
          min={rows[0].dose_ug}
          max={rows.at(-1)!.dose_ug}
          step={0.1}
          value={selected.dose_ug}
          aria-describedby={`${id}-help`}
          onChange={(event) => selectDose(Number(event.target.value))}
        />
        <input
          type="number"
          min={rows[0].dose_ug}
          max={rows.at(-1)!.dose_ug}
          step={0.1}
          value={numberInput}
          aria-label="Dose per injection in micrograms"
          aria-describedby={`${id}-help`}
          onChange={(event) => {
            setNumberInput(event.target.value);
            const value = event.target.valueAsNumber;
            if (Number.isFinite(value))
              setSelectedIndex(nearestDoseIndex(rows, value));
          }}
          onBlur={() =>
            selectDose(
              numberInput.trim() && Number.isFinite(Number(numberInput))
                ? Number(numberInput)
                : selected.dose_ug,
            )
          }
        />
        <span>μg</span>
      </div>
      <p className="dose-prediction-explorer__help" id={`${id}-help`}>
        Drag the slider or enter a number. Arrow keys change the dose by 0.1 μg;
        entered values snap to the nearest supplied 0.1 μg grid point.
      </p>
      <p
        className="dose-prediction-explorer__status"
        aria-live="polite"
        aria-atomic="true"
      >
        Selected:{" "}
        <strong>{selected.dose_ug.toFixed(1)} μg per injection</strong> ·{" "}
        <strong data-passes={passes}>
          {passes ? "Meets" : "Below"} the candidate threshold: ≥
          {Math.round(threshold * 100)}% joint pass
        </strong>
      </p>
      <ul
        className="dose-prediction-explorer__legend"
        aria-label="Chart legend"
      >
        {curves.map((curve) => (
          <li key={curve.key} data-curve={curve.key}>
            <i aria-hidden="true" />
            {curve.name}
          </li>
        ))}
      </ul>
      <p className="dose-prediction-explorer__axis">
        Fraction of scenarios meeting the criterion
      </p>
      <div
        ref={element}
        className="dose-prediction-explorer__chart"
        role="img"
        aria-label={`Dose scan from 0 to 30 micrograms. At ${selected.dose_ug.toFixed(1)} micrograms: tumor control ${percent(selected.p_effect)}, proxy screens ${percent(selected.p_screen)}, joint pass ${percent(selected.p_joint)}.`}
      />
      <div className="dose-prediction-explorer__metrics">
        {curves.map((curve, index) => (
          <div key={curve.key} data-metric={curve.key}>
            <p>
              {curve.name}
              <small>
                {
                  [
                    "Efficacy pass fraction",
                    "All proxy screens pass fraction",
                    "Joint pass fraction",
                  ][index]
                }
              </small>
            </p>
            <strong>{percent(selected[curve.key])}</strong>
            <p>
              {count(selected[curve.key])} / {draws.toLocaleString("en-US")}{" "}
              scenarios
            </p>
            <p>
              {
                [
                  "Day 35 latent tumor burden is at least 30% lower than the untreated control in the same scenario.",
                  "Relative cell viability remains ≥80%, while peak innate signal and cumulative blood exposure stay within preset limits.",
                  "The same scenario meets the tumor-control criterion and passes every viability and exposure screen.",
                ][index]
              }
            </p>
          </div>
        ))}
      </div>
      <div className="dose-prediction-explorer__volume" data-metric="volume">
        <p>Day 35 observable volume · median [conditional interval]</p>
        <strong>
          {volume(selected.volume_median)} [{volume(selected.volume_lo)},{" "}
          {volume(selected.volume_hi)}] mm³
        </strong>
      </div>
      <p className="dose-prediction-explorer__joint">
        Joint passage requires both criteria in the same scenario. At this dose,{" "}
        <strong>{jointCount.toLocaleString("en-US")}</strong> scenarios pass
        jointly; {effectOnly.toLocaleString("en-US")} meet tumor control but
        fail at least one proxy screen.
      </p>
      <p>
        Read the teal joint curve to identify candidate doses. A higher
        tumor-control curve means more scenarios reduce tumor burden; a lower
        screening curve means more scenarios exceed a viability or exposure
        limit. The dashed horizontal line requires at least{" "}
        {Math.round(threshold * 100)}% joint passage.
      </p>
      <p className="dose-prediction-explorer__footnote">
        These are fractions of model scenarios, not cure rates or safety
        probabilities in animals. Volume intervals span the 2.5th–97.5th
        percentiles of model scenarios. Values come from the supplied dose grid;
        0 μg is the untreated reference.{" "}
        <a href={downloadUrl} download>
          Download all {rows.length} dose points
        </a>
        .
      </p>
    </section>
  );
}
