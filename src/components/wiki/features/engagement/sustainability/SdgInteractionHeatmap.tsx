import { useEffect, useRef } from "react";
import * as echarts from "echarts/core";
import { HeatmapChart } from "echarts/charts";
import { CanvasRenderer } from "echarts/renderers";
import {
  GraphicComponent,
  GridComponent,
  TooltipComponent,
  VisualMapComponent,
  type TooltipComponentOption,
} from "echarts/components";
import type { EChartsOption } from "echarts";

echarts.use([
  HeatmapChart,
  CanvasRenderer,
  GridComponent,
  TooltipComponent,
  VisualMapComponent,
  GraphicComponent,
]);

// eslint-disable-next-line react-refresh/only-export-components
export const SDG = [
  "No Poverty",
  "Zero Hunger",
  "Good Health and Well-Being",
  "Quality Education",
  "Gender Equality",
  "Clean Water and Sanitation",
  "Affordable and Clean Energy",
  "Decent Work and Economic Growth",
  "Industry, Innovation and Infrastructure",
  "Reduced Inequalities",
  "Sustainable Cities and Communities",
  "Responsible Consumption and Production",
  "Climate Action",
  "Life Below Water",
  "Life on Land",
  "Peace, Justice and Strong Institutions",
  "Partnerships for the Goals",
];

/** 17x17 directed interaction scores, row = source, column = target. */
const M: (number | null)[][] = [
  [null,0.92,0.59,0.92,0.00,0.00,0.00,0.00,0.00,0.59,0.26,0.00,0.00,0.00,0.00,0.59,0.00],
  [0.00,null,0.89,0.00,0.00,-0.40,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,-0.63,0.00,0.00],
  [0.92,0.00,null,0.92,0.00,0.00,0.00,0.59,0.00,0.00,0.59,0.00,0.00,0.00,0.00,0.00,0.00],
  [0.92,0.00,0.59,null,0.92,0.00,0.59,0.92,0.59,0.59,0.00,0.59,0.59,0.00,0.00,0.59,0.29],
  [0.26,0.59,0.00,0.26,null,0.00,0.00,0.00,0.00,0.26,0.00,0.00,0.00,0.00,0.00,0.59,0.00],
  [0.00,0.59,0.92,0.00,0.00,null,0.17,0.00,0.00,0.00,0.59,0.00,0.00,0.29,0.26,0.00,0.00],
  [0.00,0.26,0.00,0.59,0.00,-0.17,null,0.59,0.59,0.00,0.00,0.59,0.92,0.00,-0.28,0.00,0.00],
  [0.92,0.00,0.00,0.00,0.59,0.00,0.26,null,0.59,0.59,0.59,-0.64,-0.71,-0.39,-0.63,0.00,0.29],
  [0.00,0.00,0.00,0.59,0.00,0.59,0.59,0.89,null,0.00,0.89,0.26,-0.51,-0.34,-0.56,0.00,0.29],
  [0.92,0.00,0.00,0.00,0.26,0.00,0.59,0.26,0.59,null,0.00,0.59,0.59,0.00,0.00,0.00,0.00],
  [0.00,0.00,0.00,0.00,0.00,-0.28,0.00,0.00,0.00,0.00,null,0.59,0.26,-0.34,-0.56,0.00,0.00],
  [0.00,0.00,0.00,0.00,0.00,0.00,0.59,0.00,0.26,0.00,0.00,null,0.92,0.29,0.00,0.00,0.00],
  [0.00,0.00,0.00,0.00,0.00,0.59,0.00,0.00,0.00,0.00,0.00,0.00,null,0.90,0.90,0.00,0.00],
  [0.00,0.92,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.52,null,0.29,0.00,0.00],
  [0.00,0.59,0.26,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.29,null,0.00,0.00],
  [0.59,0.00,0.00,0.00,0.92,0.59,0.00,0.00,0.00,0.59,0.00,0.00,0.00,0.00,0.60,null,0.29],
  [0.00,0.00,0.00,0.00,0.59,0.59,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.29,0.59,null],
];

/** Colour-bar sampled pixel-by-pixel from the source figure, -1 -> 1, step 0.1. */
const STOPS = [
  "#821e3a", "#982b3f", "#af3844", "#c74649", "#d55d51", "#de765a", "#e89264",
  "#f0ac77", "#f2c49d", "#f5dcc3", "#f7f2e7", "#e0e9dd", "#c8dfd1", "#b0d5c5",
  "#96c8ba", "#7dbcb1", "#61aea7", "#4a9d9d", "#3c8595", "#2d6d8d", "#1f5785",
];

const FONT = "Lexend, 'Helvetica Neue', Arial, sans-serif";

/** Keep a wrapped tooltip inside the chart and away from the 80px sheep cursor. */
// eslint-disable-next-line react-refresh/only-export-components
export function sdgTooltip(width: number): TooltipComponentOption {
  return {
    confine: true,
    renderMode: "html",
    className: "sust-matrix-tooltip",
    extraCssText: `white-space:normal;max-width:${Math.min(360, width - 24)}px;pointer-events:none;`,
    position: (point, _params, dom, _rect, size) => {
      const [w, h] = size.contentSize;
      const [vw, vh] = size.viewSize;
      const htmlDom = dom instanceof HTMLElement ? dom : null;
      const chartBox = htmlDom?.parentElement?.getBoundingClientRect();
      const reader = htmlDom?.closest<HTMLElement>(".route-frame__scroll");
      const readerBox = reader?.getBoundingClientRect();
      // The chart may be partly above/below the pinned reading window.
      const bounds = chartBox
        ? {
            left: Math.max(12, (readerBox?.left ?? 0) - chartBox.left + 12),
            right:
              Math.min(
                vw,
                (readerBox?.right ?? window.innerWidth) - chartBox.left,
              ) - 12,
            top: Math.max(12, (readerBox?.top ?? 0) - chartBox.top + 12),
            bottom:
              Math.min(
                vh,
                (readerBox?.bottom ?? window.innerHeight) - chartBox.top,
              ) - 12,
          }
        : { left: 12, right: vw - 12, top: 12, bottom: vh - 12 };
      const gap = 96;
      // Prefer the left: the sheep follows below and to the right of the pointer.
      const x =
        point[0] - w - 24 >= bounds.left ? point[0] - w - 24 : point[0] + gap;
      let y = point[1] - h - 24;
      if (y < bounds.top) y = point[1] + gap;
      return [
        Math.max(bounds.left, Math.min(x, bounds.right - w)),
        Math.max(bounds.top, Math.min(y, bounds.bottom - h)),
      ];
    },
  };
}

const cells: { value: number[]; label?: { color: string } }[] = [];
const diag: { value: number[] }[] = [];
M.forEach((row, r) =>
  row.forEach((v, c) => {
    if (v === null) diag.push({ value: [c, r, 0] });
    else
      cells.push({
        value: [c, r, v],
        // Dark teal / dark red backgrounds carry white labels, pale ones black.
        label: { color: Math.abs(v) >= 0.55 ? "#fff" : "#222" },
      });
  }),
);

function option(s: number): EChartsOption {
  const text = (
    x: number,
    y: number,
    t: string,
    fontSize: number,
    fill: string,
    fontWeight: string | number = "normal",
    rich?: Record<string, Record<string, unknown>>,
  ): Record<string, unknown> => ({
    type: "text",
    silent: true,
    style: {
      x: x * s,
      y: y * s,
      text: t,
      fill,
      fontWeight,
      fontSize: fontSize * s,
      fontFamily: FONT,
      textAlign: "center",
      textVerticalAlign: "middle",
      ...(rich ? { rich } : {}),
    },
  });
  const g: Record<string, unknown>[] = [
    text(557, 38.6, "Rows: source goal (influencing)    |    Columns: target goal (influenced)", 13.5, "#434443"),

  ];
  return {
    animation: false,
    grid: { left: 270.9 * s, top: 71 * s, right: 140.8 * s, bottom: 24 * s },
    xAxis: {
      type: "category",
      position: "top",
      data: SDG.map((_, i) => `${i + 1}`),
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: "#000", fontWeight: "bold", fontSize: 11 * s, fontFamily: FONT, margin: 8 * s },
    },
    yAxis: {
      type: "category",
      inverse: true,
      data: SDG.map((n, i) => `${i + 1}  ${n}`),
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { align: "right", color: "#000", fontSize: 10.2 * s, fontFamily: FONT, margin: 8 * s },
    },
    tooltip: {
      ...sdgTooltip(984 * s),
      formatter: (p: unknown) => {
        const { value, seriesIndex } = p as {
          value: number[];
          seriesIndex: number;
        };
        const [c, r, v] = value;
        return seriesIndex === 1
          ? `SDG ${r + 1} ${SDG[r]} (self)`
          : `SDG ${r + 1} ${SDG[r]}<br/>→ SDG ${c + 1} ${SDG[c]}<br/>score: <b>${Number(v).toFixed(2)}</b>`;
      },
    },
    visualMap: [
      { show: false, min: -1, max: 1, seriesIndex: 0, inRange: { color: STOPS } },
      // Diagonal cells ignore the scale: fixed neutral grey like the source figure.
      { show: false, min: 0, max: 1, seriesIndex: 1, inRange: { color: ["#d4d7da"] } },
    ],
    series: [
      {
        type: "heatmap",
        data: cells,
        label: {
          show: true,
          fontSize: 9.5 * s,
          fontFamily: FONT,
          formatter: (p: unknown) => {
            const v = Number((p as { value: number[] }).value[2]);
            return Math.abs(v) < 1e-6 ? "" : v.toFixed(2);
          },
        },
        itemStyle: { borderColor: "#fff", borderWidth: 1 },
        // Emphasize the cell under the pointer.
        emphasis: {
          itemStyle: {
            borderColor: "#fff",
            borderWidth: 2,
            shadowBlur: 10 * s,
            shadowOffsetY: 4 * s,
            shadowColor: "rgba(20, 30, 40, 0.45)",
          },
        },
      },
      {
        type: "heatmap",
        data: diag,
        label: { show: true, formatter: "−", color: "#4c4d4c", fontSize: 9.5 * s, fontFamily: FONT },
        itemStyle: { borderColor: "#fff", borderWidth: 1 },
      },
    ],
    graphic: g as unknown as NonNullable<EChartsOption["graphic"]>,
  };
}

/** Responsive ECharts shell shared by the SDG figures: scales a w0×h0 design canvas to container width. */
// eslint-disable-next-line react-refresh/only-export-components
export function useSdgChart(
  makeOption: (s: number) => EChartsOption,
  w0: number,
  h0: number,
) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current!;
    let chart: echarts.ECharts | undefined;
    let renderedWidth = 0;
    const render = () => {
      const w = el.clientWidth;
      // Ignore the observer notification caused by our own height update.
      if (w <= 0 || w === renderedWidth) return;
      renderedWidth = w;
      const height = Math.ceil((w * h0) / w0);
      el.style.height = `${height}px`;
      if (chart) chart.resize({ width: w, height });
      else {
        chart = echarts.init(el, undefined, { width: w, height });
      }
      chart.setOption(makeOption(w / w0), true);
    };
    render();
    const ro = new ResizeObserver(render);
    ro.observe(el);
    return () => {
      ro.disconnect();
      chart?.dispose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return ref;
}

export function SdgInteractionHeatmap() {
  const ref = useSdgChart(option, 984, 667.5);
  return <div ref={ref} style={{ width: "100%" }} />;
}
