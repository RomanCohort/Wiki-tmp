import type { EChartsOption } from "echarts";
import { SDG, sdgTooltip, useSdgChart } from "./SdgInteractionHeatmap";

/** 17x17 boundary classes, row = source, column = target. 0 "-", 1 "0", 2 C, 3 E, 4 ±. */
const M = [
  [0,2,2,2,1,1,1,1,1,2,3,1,1,1,1,2,1],
  [1,0,2,1,1,4,1,1,1,1,1,1,1,1,4,1,1],
  [2,1,0,2,1,1,1,2,1,1,2,1,1,1,1,1,1],
  [2,1,2,0,2,1,2,2,2,2,1,2,2,1,1,2,2],
  [3,2,1,3,0,1,1,1,1,3,1,1,1,1,1,2,1],
  [1,2,2,1,1,0,4,1,1,1,2,1,1,2,3,1,1],
  [1,3,1,2,1,4,0,2,2,1,1,2,2,1,4,1,1],
  [2,1,1,1,2,1,3,0,2,2,2,4,4,4,4,1,2],
  [1,1,1,2,1,2,2,2,0,1,2,3,4,4,4,1,2],
  [2,1,1,1,3,1,2,3,2,0,1,2,2,1,1,1,1],
  [1,1,1,1,1,4,1,1,1,1,0,2,3,4,4,1,1],
  [1,1,1,1,1,1,2,1,3,1,1,0,2,2,1,1,1],
  [1,1,1,1,1,2,1,1,1,1,1,1,0,2,2,1,1],
  [1,2,1,1,1,1,1,1,1,1,1,1,3,0,2,1,1],
  [1,2,3,1,1,1,1,1,1,1,1,1,1,2,0,1,1],
  [2,1,1,1,2,2,1,1,1,2,1,1,1,1,2,0,2],
  [1,1,1,1,2,2,1,1,1,1,1,1,1,1,2,2,0],
];

const SYM = ["−", "0", "C", "E", "±"];
/** Cell fills sampled pixel-exact from the source figure, index = category. */
const COLOR = ["#d0d3d6", "#f2f2f0", "#b9d9c0", "#b9d8e8", "#f0c987"];
const LEGEND = [
  { sw: 56.0, tx: 85.2, i: 2, desc: "Core direct edge" },
  { sw: 207.5, tx: 236.9, i: 3, desc: "Exploratory direct edge" },
  { sw: 395.0, tx: 424.3, i: 4, desc: "Conditional sign-switching edge" },
  { sw: 629.2, tx: 657.9, i: 1, desc: "Excluded direct edge" },
  { sw: 803.2, tx: 832.7, i: 0, desc: "Diagonal / not defined" },
];

const FONT = "Lexend, 'Helvetica Neue', Arial, sans-serif";

const cells = M.flatMap((row, r) => row.map((v, c) => ({ value: [c, r, v] })));

function option(s: number): EChartsOption {
  const text = (
    x: number,
    y: number,
    t: string,
    fontSize: number,
    fill: string,
    align: "center" | "left" = "center",
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
      textAlign: align,
      textVerticalAlign: "middle",
      ...(rich ? { rich } : {}),
    },
  });
  const g: Record<string, unknown>[] = [
    text(505.5, 34.7, "Rows = source goal    |    Columns = target goal    |    Natural UN order", 13.5, "#434443"),
    {
      type: "rect",
      silent: true,
      shape: { x: 240.1 * s, y: 71.5 * s, width: 530.9 * s, height: 530.9 * s },
      style: { fill: "none", stroke: "#7f858a", lineWidth: 1 },
    },
    ...LEGEND.flatMap((l) => [
      {
        type: "rect",
        silent: true,
        shape: { x: l.sw * s, y: 653 * s, width: 20.5 * s, height: 8 * s },
        style: {
          fill: COLOR[l.i],
          ...(l.i === 1 ? { stroke: "#cbcccb", lineWidth: 1 } : {}),
        },
      },
      text(l.tx, 656.8, `{s|${SYM[l.i]}}  ${l.desc}`, 10.5, "#000", "left", "normal", {
        s: { fontWeight: "bold", fontFamily: FONT, fontSize: 10.5 * s, fill: "#000" },
      }),
    ]),
  ];
  return {
    animation: false,
    grid: { left: 240.1 * s, top: 71.5 * s, right: 207.1 * s, bottom: 72.1 * s },
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
      axisLabel: { align: "right", color: "#000", fontSize: 10 * s, fontFamily: FONT, margin: 8 * s },
    },
    tooltip: {
      ...sdgTooltip(978.1 * s),
      formatter: (p: unknown) => {
        const [c, r, v] = (p as { value: number[] }).value;
        return c === r
          ? `SDG ${r + 1} ${SDG[r]} (diagonal / not defined)`
          : `SDG ${r + 1} ${SDG[r]}<br/>→ SDG ${c + 1} ${SDG[c]}<br/><b>${SYM[v]}</b> ${LEGEND.find((l) => l.i === v)!.desc}`;
      },
    },
    visualMap: {
      type: "piecewise",
      show: false,
      pieces: COLOR.map((color, i) => ({ value: i, color })),
    },
    series: [
      {
        type: "heatmap",
        data: cells,
        label: {
          show: true,
          color: "#263238",
          fontWeight: "bold",
          fontSize: 10.2 * s,
          fontFamily: FONT,
          formatter: (p: unknown) => {
            const v = (p as { value: number[] }).value[2];
            return v === 1 ? "" : SYM[v];
          },
        },
        itemStyle: { borderColor: "#fff", borderWidth: 1 },
      },
    ],
    graphic: g as unknown as NonNullable<EChartsOption["graphic"]>,
  };
}

export function SdgBoundaryMatrix() {
  const ref = useSdgChart(option, 978.1, 674.5);
  return <div ref={ref} style={{ width: "100%" }} />;
}


