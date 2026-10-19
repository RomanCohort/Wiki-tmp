export type TransitPoint = { x: number; y: number };
export type TransitCurve = [
  TransitPoint,
  TransitPoint,
  TransitPoint,
  TransitPoint,
];
export type AntigenTransit = {
  product: TransitCurve;
  processing: TransitPoint;
  presented: TransitPoint;
  productScale: number;
  productAngle: number;
  tcell: TransitCurve;
  tcellScale: number;
  tcellAngle: number;
};

export function pointOnTransit(curve: TransitCurve, progress: number) {
  const inverse = 1 - progress;
  const weights = [
    inverse ** 3,
    3 * inverse ** 2 * progress,
    3 * inverse * progress ** 2,
    progress ** 3,
  ];
  return {
    x: curve.reduce((sum, point, index) => sum + point.x * weights[index], 0),
    y: curve.reduce((sum, point, index) => sum + point.y * weights[index], 0),
  };
}

// Measure the static frames, never the moving actors themselves.
export function measureAntigenTransit(
  scene: HTMLDivElement,
  selected: number,
): AntigenTransit | null {
  const bridge = scene.querySelector<SVGSVGElement>("[data-antigen-bridge]");
  const anchor = scene.querySelector<SVGGraphicsElement>(
    `[data-antigen-contact="${selected}"]`,
  );
  const frame = scene.querySelector<SVGGraphicsElement>(
    "[data-antigen-product-frame]",
  );
  const origin = scene.querySelector<SVGGraphicsElement>(
    "[data-antigen-product-origin]",
  );
  const bridgeMatrix = bridge?.getScreenCTM();
  const targetMatrix = anchor?.getScreenCTM();
  const sourceMatrix = origin?.getScreenCTM();
  if (!bridgeMatrix || !targetMatrix || !sourceMatrix || !frame) return null;
  const matrices = [bridgeMatrix, targetMatrix, sourceMatrix];
  if (
    matrices.some((matrix) =>
      [matrix.a, matrix.b, matrix.c, matrix.d, matrix.e, matrix.f].some(
        (value) => !Number.isFinite(value),
      ),
    )
  )
    return null;
  const bridgeScale = Math.hypot(bridgeMatrix.a, bridgeMatrix.b);
  const sourceScale = Math.hypot(sourceMatrix.a, sourceMatrix.b);
  const targetScale = Math.hypot(targetMatrix.a, targetMatrix.b);
  if (Math.min(bridgeScale, sourceScale, targetScale) <= 0) return null;
  try {
    // DOMMatrix also normalizes WebKit legacy SVGMatrix results.
    const matrix = (value: DOMMatrix) =>
      new DOMMatrix([value.a, value.b, value.c, value.d, value.e, value.f]);
    const sourceToBridge = matrix(bridgeMatrix)
      .inverse()
      .multiply(matrix(sourceMatrix));
    const bridgeToSource = sourceToBridge.inverse();
    const source = new DOMPoint(0, 0).matrixTransform(sourceToBridge);
    const processing = new DOMPoint(72, 72).matrixTransform(bridgeToSource);
    const presented = new DOMPoint(140, 67).matrixTransform(bridgeToSource);
    // Enter from outside the ring and settle inside the dendritic cell.
    const stacked = 72 - source.y > 180;
    const controls = stacked
      ? [new DOMPoint(source.x + 68, source.y + 22), new DOMPoint(150, 18)]
      : [new DOMPoint(source.x + 40, source.y + 8), new DOMPoint(24, 40)];
    const point = new DOMPoint(0, 0)
      .matrixTransform(targetMatrix)
      .matrixTransform(matrix(bridgeMatrix).inverse());
    // Keep the effector legible while keeping the TCR precisely docked.
    const tcellScale = Math.max(
      1,
      Math.min(1.15, (targetScale / bridgeScale) * 1.35),
    );
    // Approach the upper targets from above, clear of their neighbours.
    const tcellAngle = [180, -135, -45][selected];
    const angle = (tcellAngle * Math.PI) / 180;
    const end = {
      x: point.x + 55 * tcellScale * Math.cos(angle),
      y: point.y + (6 + 55 * Math.sin(angle)) * tcellScale,
    };
    const dx = end.x - 200;
    const dy = end.y - 73;
    const lift = Math.min(52, Math.hypot(dx, dy) * 0.2);
    const product: TransitCurve = [
      { x: 0, y: 0 },
      controls[0].matrixTransform(bridgeToSource),
      controls[1].matrixTransform(bridgeToSource),
      processing,
    ];
    const tcell: TransitCurve = [
      { x: 200, y: 73 },
      { x: 200 + dx * 0.28, y: 73 + dy * 0.28 - lift },
      { x: 200 + dx * 0.76, y: 73 + dy * 0.76 - lift },
      end,
    ];
    const productAngle =
      (Math.atan2(bridgeMatrix.b, bridgeMatrix.a) -
        Math.atan2(sourceMatrix.b, sourceMatrix.a)) *
      (180 / Math.PI);
    const result = {
      product,
      processing,
      presented,
      productScale: bridgeScale / sourceScale,
      productAngle,
      tcell,
      tcellScale,
      tcellAngle,
    };
    return [
      processing.x,
      processing.y,
      presented.x,
      presented.y,
      productAngle,
      ...product.flatMap((p) => [p.x, p.y]),
      ...tcell.flatMap((p) => [p.x, p.y]),
    ].every(Number.isFinite)
      ? result
      : null;
  } catch {
    return null;
  }
}
