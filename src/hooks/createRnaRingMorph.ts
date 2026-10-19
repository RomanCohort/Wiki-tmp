import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { trackPagePreparation } from "../utils/pageLoader";
import { HOME_EASE } from "./homeMotion";

const clamp = gsap.utils.clamp(0, 1);
const smooth = (from: number, to: number, value: number) => {
  const p = clamp((value - from) / (to - from));
  return p * p * p * (p * (p * 6 - 15) + 10);
};
const mix = (from: number, to: number, p: number) => from + (to - from) * p;
const curve = (from: number, a: number, b: number, to: number, p: number) =>
  (1 - p) ** 3 * from +
  3 * (1 - p) ** 2 * p * a +
  3 * (1 - p) * p * p * b +
  p ** 3 * to;

const PAINT_STEPS = 16;
const PAINT_PADDING = 0.015;
const PAINT_EXTENT = 1 + PAINT_PADDING * 2;
const travelEase = gsap.parseEase(HOME_EASE);

// Carry the complete circle before handing it to the cropped platform plate.
// Mixing that crop during the flight makes the lower arc dissolve in midair.
const LANDING_START = 0.78;
const TRAVEL_END = 0.9;

// Cache closely spaced radial deformations once. Interpolating adjacent
// plates avoids the double edge of dissolving directly between thick/thin
// strokes, and keeps pixel sampling out of the scroll callback.
function preparePaint(image: HTMLImageElement, compact: boolean) {
  const sample = document.createElement("canvas");
  sample.width = Math.min(image.naturalWidth, compact ? 320 : 459);
  sample.height = Math.round(
    (sample.width * image.naturalHeight) / image.naturalWidth,
  );
  const ink = sample.getContext("2d", { willReadFrequently: true });
  if (!ink) return null;
  ink.drawImage(image, 0, 0, sample.width, sample.height);
  const pixels = ink.getImageData(0, 0, sample.width, sample.height).data;
  const plates: CanvasImageSource[] = [image];
  for (let step = 1; step <= PAINT_STEPS; step++) {
    const progress = step / PAINT_STEPS;
    const tone = smooth(0.03, 0.72, progress);
    const thickness = mix(1, 0.72, smooth(LANDING_START, 1, progress));
    const tint = [mix(1, 0.961, tone), mix(1, 0.79, tone), mix(1, 0.774, tone)];
    const plate = document.createElement("canvas");
    plate.width = sample.width;
    plate.height = sample.height;
    const output = plate.getContext("2d");
    if (!output) return null;
    const result = output.createImageData(plate.width, plate.height);
    for (let y = 0; y < plate.height; y++) {
      for (let x = 0; x < plate.width; x++) {
        const dx = ((x + 0.5) / plate.width) * 2 - 1;
        const dy = ((y + 0.5) / plate.height) * 2 - 1;
        const radius = Math.hypot(dx, dy);
        const originalRadius =
          radius < 1 ? 1 - (1 - radius) / thickness : radius;
        if (originalRadius < 0 || radius === 0) continue;
        const sx = (((dx * originalRadius) / radius + 1) * plate.width - 1) / 2;
        const sy =
          (((dy * originalRadius) / radius + 1) * plate.height - 1) / 2;
        const ix = Math.floor(sx),
          iy = Math.floor(sy);
        const destination = (y * plate.width + x) * 4;
        let alpha = 0,
          red = 0,
          green = 0,
          blue = 0;
        // Bilinear sampling uses premultiplied alpha at the watercolor edge.
        for (let cy = 0; cy < 2; cy++) {
          for (let cx = 0; cx < 2; cx++) {
            const px = ix + cx,
              py = iy + cy;
            if (px < 0 || py < 0 || px >= plate.width || py >= plate.height)
              continue;
            const weight =
              (cx ? sx - ix : 1 - sx + ix) * (cy ? sy - iy : 1 - sy + iy);
            const offset = (py * plate.width + px) * 4;
            const coverage = (pixels[offset + 3] / 255) * weight;
            alpha += coverage;
            red += pixels[offset] * coverage;
            green += pixels[offset + 1] * coverage;
            blue += pixels[offset + 2] * coverage;
          }
        }
        if (!alpha) continue;
        result.data[destination] = (red / alpha) * tint[0];
        result.data[destination + 1] = (green / alpha) * tint[1];
        result.data[destination + 2] = (blue / alpha) * tint[2];
        result.data[destination + 3] = alpha * 255;
      }
    }
    output.putImageData(result, 0, 0);
    plates.push(plate);
  }
  return plates;
}

export function getRnaRingGeometry(image: HTMLImageElement) {
  if (image.dataset.ringFormat === "square") {
    // The square plate keeps its centered bounds while the image decodes.
    const width = image.naturalWidth || 1;
    const height = image.naturalHeight || 1;
    return {
      width,
      height,
      centerX: width / 2,
      centerY: height / 2,
      diameter: Math.min(width, height),
    };
  }
  return {
    width: 611,
    height: 833,
    centerX: 306.009,
    centerY: 757.002,
    diameter: 605.599,
  };
}

export function separateFanPaint(image: HTMLImageElement) {
  const ring = document.createElement("canvas");
  const lettering = document.createElement("canvas");
  ring.width = lettering.width = image.naturalWidth;
  ring.height = lettering.height = image.naturalHeight;
  const ink = ring.getContext("2d", { willReadFrequently: true });
  const words = lettering.getContext("2d");
  if (!ink || !words) return null;
  ink.drawImage(image, 0, 0);
  // The new plate contains only the ring; preserve every painted color.
  if (image.dataset.ringFormat === "square") return { ring, lettering };
  const red = ink.getImageData(0, 0, ring.width, ring.height);
  const gold = words.createImageData(ring.width, ring.height);
  for (let i = 0; i < red.data.length; i += 4) {
    const letter = smooth(10, 40, red.data[i + 1] - red.data[i + 2]);
    for (let c = 0; c < 3; c++) gold.data[i + c] = red.data[i + c];
    gold.data[i + 3] = red.data[i + 3] * letter;
    red.data[i + 3] -= gold.data[i + 3];
  }
  ink.putImageData(red, 0, 0);
  words.putImageData(gold, 0, 0);
  return { ring, lettering };
}

/** One solid, painted ring follows a curved route and changes pigment/stroke.
 * All texture plates share one circle coordinate system, including the fan's
 * transparent top and cropped bottom. No particles or replacement art. */
export function createRnaRingMorph(
  stage: HTMLElement,
  source: SVGElement,
  target: HTMLImageElement,
  compact: boolean,
  onReady: () => void,
) {
  const canvas = document.createElement("canvas");
  canvas.className = "story-rna-ring-morph";
  canvas.dataset.renderer = "painted-rgba";
  canvas.setAttribute("aria-hidden", "true");
  canvas.style.visibility = "hidden";
  stage.append(canvas);
  const context = canvas.getContext("2d");
  const image = new Image();
  image.crossOrigin = "anonymous";
  const href = source.querySelector<SVGImageElement>("image")?.href.baseVal;
  const originalLoading = target.getAttribute("loading");
  let paint: ReturnType<typeof preparePaint> = null;
  let fan: ReturnType<typeof separateFanPaint> = null;
  let geometry: ReturnType<typeof measure> | null = null;
  let disposed = false;
  let ready = false;
  let frame = 0;
  let lastProgress = 0;
  let resolvePreparation!: () => void;
  const stopTrackingPreparation = trackPagePreparation(
    new Promise<void>((resolve) => {
      resolvePreparation = resolve;
    }),
  );
  const finishPreparation = () => {
    resolvePreparation();
    stopTrackingPreparation();
  };

  function measure() {
    const stageBox = stage.getBoundingClientRect();
    const box = source.getBoundingClientRect();
    const destination = target.getBoundingClientRect();
    const targetGeometry = getRnaRingGeometry(target);
    const width = box.width / (Number(gsap.getProperty(source, "scaleX")) || 1);
    const height =
      box.height / (Number(gsap.getProperty(source, "scaleY")) || 1);
    const x =
      box.left +
      box.width / 2 -
      Number(gsap.getProperty(source, "x")) -
      stageBox.left;
    const y =
      box.top +
      box.height / 2 -
      Number(gsap.getProperty(source, "y")) -
      stageBox.top;
    const toX =
      destination.left -
      stageBox.left +
      destination.width * (targetGeometry.centerX / targetGeometry.width);
    const toY =
      destination.top -
      stageBox.top +
      destination.height * (targetGeometry.centerY / targetGeometry.height);
    const toWidth =
      destination.width * (targetGeometry.diameter / targetGeometry.width);
    const toHeight =
      destination.height * (targetGeometry.diameter / targetGeometry.height);
    const dx = toX - x,
      dy = toY - y;
    const bend = Math.min(compact ? 28 : 65, stage.clientWidth * 0.055);
    return { x, y, width, height, toX, toY, toWidth, toHeight, dx, dy, bend };
  }

  function draw(progress: number, painted = true) {
    lastProgress = clamp(progress);
    const tone = smooth(0.03, 0.72, lastProgress);
    const incoming = smooth(LANDING_START, 1, lastProgress);
    canvas.dataset.progress = String(lastProgress);
    canvas.dataset.tone = String(tone);
    canvas.dataset.shape = String(incoming);
    const available = ready && painted && !disposed;
    const visible = available && lastProgress > 0 && lastProgress < 1;
    if (!visible) canvas.style.visibility = "hidden";
    if (disposed || !geometry) return false;
    const g = geometry;
    // One easing curve starts the carry promptly and leaves a short landing
    // beat. The previous quintic ease followed by the curve barely moved the
    // ring during the opening scroll while its texture was already fading.
    const p = travelEase(clamp(lastProgress / TRAVEL_END));
    const x = curve(
      g.x,
      g.x + g.dx * 0.18 + g.bend,
      g.toX - g.dx * 0.14 + g.bend * 0.35,
      g.toX,
      p,
    );
    const y = curve(g.y, g.y + g.dy * 0.12, g.toY - g.dy * 0.2, g.toY, p);
    const breath = Math.sin(Math.PI * p) * (compact ? 0.015 : 0.035);
    const width = mix(g.width, g.toWidth, p) * (1 + breath);
    const height = mix(g.height, g.toHeight, p) * (1 + breath);
    // The native artwork follows this same flight when texture preparation
    // fails or finishes late. Keep its axes unrotated so refresh can recover
    // its original bounds by removing only translation and scale.
    gsap.set(source, {
      x: x - g.x,
      y: y - g.y,
      scaleX: width / g.width,
      scaleY: height / g.height,
    });
    if (!available || !context || !paint || !fan) return false;
    const rotation = Math.sin(Math.PI * p) * (compact ? 3 : 5);
    canvas.style.transform = `translate3d(${x - (g.width * PAINT_EXTENT) / 2}px, ${y - (g.height * PAINT_EXTENT) / 2}px, 0) rotate(${rotation}deg) scale(${width / g.width}, ${height / g.height})`;
    context.clearRect(0, 0, canvas.width, canvas.height);
    // Weighted additive composition interpolates premultiplied RGBA, so the
    // shared painted edge retains its density throughout the texture blend.
    context.globalCompositeOperation = "lighter";
    const unit = canvas.width / PAINT_EXTENT;
    const padding = unit * PAINT_PADDING;
    const plate = (texture: CanvasImageSource, alpha: number) => {
      if (alpha <= 0) return;
      context.globalAlpha = alpha;
      context.drawImage(texture, padding, padding, unit, unit);
    };
    const index = lastProgress * PAINT_STEPS;
    const lower = Math.floor(index);
    const fraction = index - lower;
    plate(paint[lower], (1 - fraction) * (1 - incoming));
    plate(paint[Math.min(PAINT_STEPS, lower + 1)], fraction * (1 - incoming));
    const targetGeometry = getRnaRingGeometry(target);
    const fanPlate = (texture: CanvasImageSource, alpha: number) => {
      context.globalAlpha = alpha;
      context.drawImage(
        texture,
        padding +
          (0.5 - targetGeometry.centerX / targetGeometry.diameter) * unit,
        padding +
          (0.5 - targetGeometry.centerY / targetGeometry.diameter) * unit,
        (targetGeometry.width / targetGeometry.diameter) * unit,
        (targetGeometry.height / targetGeometry.diameter) * unit,
      );
    };
    fanPlate(fan.ring, incoming);
    fanPlate(fan.lettering, incoming);
    context.globalAlpha = 1;
    context.globalCompositeOperation = "source-over";
    // Paint endpoint frames too. Only release the native artwork after the
    // carrier has an actual frame, including after a canvas resize/refresh.
    canvas.style.visibility = visible ? "visible" : "hidden";
    return true;
  }

  const refresh = () => {
    if (disposed) return;
    // Native geometry does not depend on decoded pixels or a Canvas context.
    // Preserve the last valid measurement while the loader hides the stage.
    const measured = measure();
    if (measured.width && measured.height && measured.toWidth) {
      geometry = measured;
    }
    if (!context) {
      if (geometry) onReady();
      finishPreparation();
      return;
    }
    if (!image.naturalWidth || !target.naturalWidth || !target.complete) {
      if (geometry) onReady();
      if ([image, target].some((art) => art.complete && !art.naturalWidth))
        finishPreparation();
      return;
    }
    if (!geometry) return;
    const resolution = Math.min(
      1024,
      Math.max(
        512,
        Math.ceil(
          Math.max(geometry.width, geometry.height) *
            Math.min(window.devicePixelRatio || 1, 2),
        ),
      ),
    );
    canvas.width = canvas.height = Math.ceil(resolution * PAINT_EXTENT);
    canvas.style.width = `${geometry.width * PAINT_EXTENT}px`;
    canvas.style.height = `${geometry.height * PAINT_EXTENT}px`;
    try {
      paint ??= preparePaint(image, compact);
      fan ??= separateFanPaint(target);
      ready = Boolean(paint && fan);
    } catch {
      ready = false;
    }
    try {
      onReady();
    } finally {
      finishPreparation();
    }
  };
  const schedule = () => {
    if (disposed) return;
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => {
      frame = 0;
      refresh();
    });
  };
  const observer = new ResizeObserver(schedule);
  observer.observe(stage);
  image.addEventListener("load", schedule);
  target.addEventListener("load", schedule);
  image.addEventListener("error", finishPreparation);
  target.addEventListener("error", finishPreparation);
  ScrollTrigger.addEventListener("refresh", schedule);
  target.loading = "eager";
  if (href) image.src = href;
  if (!context || !href) finishPreparation();
  void Promise.all([image.decode(), target.decode()])
    .then(schedule)
    .catch(schedule);

  return {
    render: draw,
    dispose() {
      disposed = true;
      finishPreparation();
      observer.disconnect();
      cancelAnimationFrame(frame);
      ScrollTrigger.removeEventListener("refresh", schedule);
      image.removeEventListener("load", schedule);
      target.removeEventListener("load", schedule);
      image.removeEventListener("error", finishPreparation);
      target.removeEventListener("error", finishPreparation);
      canvas.remove();
      if (originalLoading === null) target.removeAttribute("loading");
      else target.setAttribute("loading", originalLoading);
      paint = null;
      fan = null;
    },
  };
}
