import { useEffect, useMemo, useRef, useState } from "react";
import * as echarts from "../shared/echartsRuntime";
import {
  DOSE_SCAN_DEFAULT_INDEX,
  DOSE_SCAN_DRAW_COUNT,
  DOSE_SCAN_REQUIRED_JOINT,
  doseScanData,
} from "../../../../data/project/doseScanData";

const seriesColors = {
  effect: "#2f7fb8",
  screen: "#f1841a",
  joint: "#379d3f",
} as const;

function formatPercent(value: number) {
  return `${(value * 100).toFixed(2)}%`;
}

function nearestDoseIndex(value: number) {
  if (!Number.isFinite(value)) return DOSE_SCAN_DEFAULT_INDEX;
  const index = Math.round(value * 10);
  return Math.max(0, Math.min(doseScanData.length - 1, index));
}

export function DoseScanChart({ caption }: { caption: string }) {
  const [selectedIndex, setSelectedIndex] = useState(DOSE_SCAN_DEFAULT_INDEX);
  const chartElement = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<echarts.ECharts | null>(null);
  const selectedRow = doseScanData[selectedIndex];

  const option = useMemo<echarts.EChartsOption>(
    () => ({
      animation: false,
      grid: { left: 68, right: 30, top: 58, bottom: 68 },
      legend: {
        top: 10,
        right: 8,
        itemWidth: 20,
        itemHeight: 3,
        textStyle: { color: "#263f55", fontSize: 12 },
      },
      tooltip: {
        trigger: "axis",
        confine: true,
        valueFormatter: (value) => formatPercent(Number(value)),
        axisPointer: { type: "line", lineStyle: { color: "#82949a" } },
        formatter: (params) => {
          const points = Array.isArray(params) ? params : [params];
          const axisValue = (points[0] as { axisValue?: unknown } | undefined)
            ?.axisValue;
          const dose = Number(axisValue);
          const row = doseScanData[nearestDoseIndex(dose)];
          if (!row) return "";
          return [
            `<strong>${row.dose_ug.toFixed(1)} μg per injection</strong>`,
            `Efficacy: ${formatPercent(row.p_effect)}`,
            `All proxy screens: ${formatPercent(row.p_screen)}`,
            `Joint event: ${formatPercent(row.p_joint)}`,
            `MCSE: ${row.p_joint_mcse.toFixed(4)}`,
          ].join("<br />");
        },
      },
      xAxis: {
        type: "value",
        min: 0,
        max: 30,
        interval: 5,
        name: "SC dose (μg / injection)",
        nameLocation: "middle",
        nameGap: 42,
        nameTextStyle: { color: "#263f55", fontSize: 12 },
        axisLine: { lineStyle: { color: "#788995" } },
        axisLabel: { color: "#536c7a" },
        splitLine: { lineStyle: { color: "#e7ecee" } },
      },
      yAxis: {
        type: "value",
        min: 0,
        max: 1,
        interval: 0.2,
        name: "Conditional pass fraction",
        nameLocation: "middle",
        nameGap: 48,
        nameTextStyle: { color: "#263f55", fontSize: 12 },
        axisLine: { lineStyle: { color: "#788995" } },
        axisLabel: {
          color: "#536c7a",
          formatter: (value: number) => value.toFixed(1),
        },
        splitLine: { lineStyle: { color: "#e7ecee" } },
      },
      series: [
        {
          name: "Efficacy",
          type: "line",
          showSymbol: false,
          smooth: false,
          lineStyle: { width: 2.5, color: seriesColors.effect },
          itemStyle: { color: seriesColors.effect },
          data: doseScanData.map((row): [number, number] => [
            row.dose_ug,
            row.p_effect,
          ]),
        },
        {
          name: "All proxy screens",
          type: "line",
          showSymbol: false,
          smooth: false,
          lineStyle: { width: 2.5, color: seriesColors.screen },
          itemStyle: { color: seriesColors.screen },
          data: doseScanData.map((row): [number, number] => [
            row.dose_ug,
            row.p_screen,
          ]),
        },
        {
          name: "Joint event",
          type: "line",
          showSymbol: false,
          smooth: false,
          lineStyle: { width: 3, color: seriesColors.joint },
          itemStyle: { color: seriesColors.joint },
          data: doseScanData.map((row): [number, number] => [
            row.dose_ug,
            row.p_joint,
          ]),
          markLine: {
            symbol: "none",
            silent: true,
            label: { show: false },
            data: [
              {
                yAxis: DOSE_SCAN_REQUIRED_JOINT,
                lineStyle: { color: "#8a9197", type: "dashed", width: 1.5 },
              },
              {
                xAxis: selectedRow.dose_ug,
                lineStyle: { color: "#7d8c90", type: "solid", width: 1.5 },
              },
            ],
          },
          markPoint: {
            symbol: "circle",
            symbolSize: 10,
            itemStyle: {
              color: "#ffffff",
              borderColor: seriesColors.joint,
              borderWidth: 3,
            },
            label: {
              show: true,
              position: selectedRow.dose_ug > 24 ? "left" : "right",
              distance: 12,
              color: "#263f55",
              fontSize: 12,
              formatter: `${selectedRow.dose_ug.toFixed(1)} μg | ${selectedRow.p_joint.toFixed(4)}`,
            },
            data: [
              {
                name: "selected dose",
                coord: [selectedRow.dose_ug, selectedRow.p_joint],
              },
            ],
          },
        },
      ],
    }),
    [selectedRow],
  );

  useEffect(() => {
    const node = chartElement.current;
    if (!node) return;
    const chart = echarts.init(node);
    chartInstance.current = chart;
    const resizeObserver = new ResizeObserver(() => chart.resize());
    resizeObserver.observe(node);
    chart.on("click", (params: unknown) => {
      if (!params || typeof params !== "object") return;
      const dataIndex = (params as { dataIndex?: unknown }).dataIndex;
      if (
        typeof dataIndex === "number" &&
        dataIndex >= 0 &&
        dataIndex < doseScanData.length
      ) {
        setSelectedIndex(dataIndex);
      }
    });
    return () => {
      resizeObserver.disconnect();
      chart.dispose();
      chartInstance.current = null;
    };
  }, []);

  useEffect(() => {
    chartInstance.current?.setOption(option, true);
  }, [option]);

  return (
    <figure className="wiki-figure results-dose-scan-figure">
      <div className="results-dose-scan-panel">
        <div className="results-dose-scan-controls">
          <label htmlFor="results-dose-scan-range">Dose per injection</label>
          <input
            id="results-dose-scan-range"
            type="range"
            min={0}
            max={doseScanData.length - 1}
            step={1}
            value={selectedIndex}
            onChange={(event) => setSelectedIndex(Number(event.target.value))}
            aria-describedby="results-dose-scan-selected"
          />
          <input
            className="results-dose-scan-number"
            type="number"
            min={0}
            max={30}
            step={0.1}
            value={selectedRow.dose_ug.toFixed(1)}
            onChange={(event) =>
              setSelectedIndex(nearestDoseIndex(Number(event.target.value)))
            }
            aria-label="Dose per injection in micrograms"
          />
          <span>μg</span>
        </div>
        <p
          className="results-dose-scan-selected"
          id="results-dose-scan-selected"
        >
          Selected dose: <strong>{selectedRow.dose_ug.toFixed(1)} μg</strong> ·
          Joint event: <strong>{formatPercent(selectedRow.p_joint)}</strong>
        </p>
        <div
          ref={chartElement}
          className="results-dose-scan-chart"
          role="img"
          aria-label={`Dose-response passage probability chart. Selected dose ${selectedRow.dose_ug.toFixed(1)} micrograms, joint event ${formatPercent(selectedRow.p_joint)}.`}
        />
        <p className="results-dose-scan-source">
          {DOSE_SCAN_DRAW_COUNT.toLocaleString()} joint parameter draws · 301
          dose levels · dashed line: joint passage threshold{" "}
          {DOSE_SCAN_REQUIRED_JOINT.toFixed(2)}
        </p>
      </div>
      <figcaption>{caption}</figcaption>
    </figure>
  );
}
