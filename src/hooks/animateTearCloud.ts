import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { createChallengeParticleRenderer } from "./challengeParticleRenderer";
import {
  createHomeScrubBoundaryGuard,
  isHomeMotionRefreshing,
  settleHomeScrubEndpoint,
} from "./homeMotion";

type Grain = { x: number; y: number; alpha: number; rgb: number[] };
type CloudBounds = { left: number; top: number; width: number; height: number };
// Viewports the bridge starts before the tear track ends, while it is sticky.
export const TEAR_CLOUD_LEAD = 0.24;
const BRIDGE_SCRUB = 0.2;
const clamp = gsap.utils.clamp(0, 1);
const smooth = (from: number, to: number, value: number) => {
  const p = clamp((value - from) / (to - from));
  return p * p * (3 - 2 * p);
};
const noise = (index: number) => {
  const value = Math.sin(index * 127.1 + 311.7) * 43758.5453;
  return value - Math.floor(value);
};

/** Keep both original stages at the same viewport coordinates. The tear's
 * sampled pigment flies into one cloud cut from the artist's original map. */
export function animateTearCloud(
  root: HTMLElement,
  tearTimeline: gsap.core.Timeline,
  mapTimeline: gsap.core.Timeline,
  compact: boolean,
) {
  const tear = root.querySelector<HTMLElement>("#what-stayed-with-us")!;
  const map = root.querySelector<HTMLElement>("#why-tnbc")!;
  const source = tear.querySelector<HTMLElement>(".story-chapter-inner")!;
  const destination = map.querySelector<HTMLElement>(".story-chapter-inner")!;
  const cloud = map.querySelector<SVGSVGElement>(
    '[data-map-piece="cloud-northwest"]',
  )!;
  const from = tearTimeline.scrollTrigger;
  const to = mapTimeline.scrollTrigger;
  if (!source || !destination || !cloud || !from || !to) return () => {};

  const stages = [source, destination];
  const stageOpacity = stages.map((stage) => stage.style.opacity);
  const mapReveal = destination.style.getPropertyValue(
    "--tear-cloud-map-reveal",
  );
  const cloudOpacity = cloud.style.opacity;
  const cloudPlayState = cloud.style.animationPlayState;
  const frame = document.createElement("div");
  frame.className = "story-tear-cloud-transition";
  frame.setAttribute("aria-hidden", "true");
  const wash = stages.map((stage) => {
    const image = document.createElement("img");
    image.src = stage.querySelector<HTMLImageElement>(".story-backdrop")!.src;
    image.className = "story-tear-wash";
    image.alt = "";
    frame.append(image);
    return image;
  });
  const colors = stages.map((stage) => getComputedStyle(stage).backgroundColor);
  const background = gsap.utils.interpolate(colors[0], colors[1]);
  const canvas = document.createElement("canvas");
  const fallback = document.createElement("canvas");
  canvas.className = fallback.className = "story-tear-cloud-grains";
  canvas.setAttribute("aria-hidden", "true");
  fallback.setAttribute("aria-hidden", "true");
  root.append(frame, canvas, fallback);
  const context = fallback.getContext("2d");
  const cloudImage = new Image();
  cloudImage.crossOrigin = "anonymous";
  cloudImage.src = cloud.querySelector<SVGImageElement>("image")!.href.baseVal;
  const tearImages = [3, 4, 5].map((number) =>
    tear.querySelector<HTMLImageElement>(`[data-layer="${number}"]`)!,
  );
  const state = { progress: 0 };
  let disposed = false;
  let ready = false;
  let particlePass: boolean | undefined;
  let prepareFrame = 0;
  let fixed = false;
  let width = 0;
  let height = 0;
  let ratio = 1;
  let spacing = 1;
  let data = new Float32Array();
  let gpu: ReturnType<typeof createChallengeParticleRenderer> = null;
  let initialized = false;
  let targetBounds: CloudBounds | null = null;
  const accent = [185, 185, 215];

  const measureCloud = (): CloudBounds => {
    const stage = destination.getBoundingClientRect();
    const box = cloud.getBoundingClientRect();
    return {
      left: box.left - stage.left,
      top: box.top - stage.top,
      width: box.width,
      height: box.height,
    };
  };
  const retarget = () => {
    if (!ready || !targetBounds) return;
    const next = measureCloud();
    const before = targetBounds;
    if (
      next.left === before.left && next.top === before.top &&
      next.width === before.width && next.height === before.height
    ) return;
    // The native cloud may have drifted since prewarming or the previous pass.
    // Reposition its cached pigment to the paused phase without reading pixels.
    const scaleX = next.width / before.width;
    const scaleY = next.height / before.height;
    for (let offset = 0; offset < data.length; offset += 11) {
      data[offset + 2] = next.left + (data[offset + 2] - before.left) * scaleX;
      data[offset + 3] = next.top + (data[offset + 3] - before.top) * scaleY;
    }
    targetBounds = next;
    gpu?.upload(data, width, height, ratio, spacing, accent);
  };

  const setFixed = (active: boolean) => {
    if (fixed === active) return;
    fixed = active;
    stages.forEach((stage) =>
      stage.classList.toggle("is-tear-cloud-carried", active),
    );
    cloud.style.animationPlayState = active ? "paused" : cloudPlayState;
    if (active) retarget();
    if (!active) {
      stages.forEach((stage, index) => {
        stage.style.opacity = stageOpacity[index];
      });
      cloud.style.opacity = cloudOpacity;
      if (mapReveal) {
        destination.style.setProperty("--tear-cloud-map-reveal", mapReveal);
      } else {
        destination.style.removeProperty("--tear-cloud-map-reveal");
      }
    }
  };
  const prepare = () => {
    if (
      disposed ||
      ready ||
      !cloudImage.complete ||
      !cloudImage.naturalWidth ||
      tearImages.some((image) => !image.complete || !image.naturalWidth)
    )
      return;
    width = frame.clientWidth;
    height = frame.clientHeight;
    // Safari's toolbar changes the fixed viewport without resizing the native
    // svh stages. Keep sampled pixels at their measured size between refreshes.
    canvas.style.width = fallback.style.width = `${width}px`;
    canvas.style.height = fallback.style.height = `${height}px`;
    ratio = Math.min(window.devicePixelRatio || 1, 2);
    const sample = document.createElement("canvas");
    sample.width = Math.ceil(width);
    sample.height = Math.ceil(height);
    const ink = sample.getContext("2d", { willReadFrequently: true });
    if (!ink) return;
    const sourceBox = source.getBoundingClientRect();
    const imageBounds = tearImages.map((image) => {
      const box = image.getBoundingClientRect();
      return {
        left: box.left - sourceBox.left, top: box.top - sourceBox.top,
        width: box.width, height: box.height,
      };
    });
    tearImages.forEach((image, index) => {
      const box = imageBounds[index];
      ink.drawImage(image, box.left, box.top, box.width, box.height);
    });
    const sourceLeft = Math.min(...imageBounds.map((box) => box.left));
    const sourceTop = Math.min(...imageBounds.map((box) => box.top));
    const sourceBounds: CloudBounds = {
      left: sourceLeft, top: sourceTop,
      width: Math.max(...imageBounds.map((box) => box.left + box.width)) - sourceLeft,
      height: Math.max(...imageBounds.map((box) => box.top + box.height)) - sourceTop,
    };
    const sampleGrains = (step: number, bounds: CloudBounds) => {
      // Keep the viewport grid and a two-pixel antialias margin, but read only
      // the painted bounds instead of two whole viewport-sized pixel buffers.
      const left = Math.max(0, Math.floor(bounds.left) - 2);
      const top = Math.max(0, Math.floor(bounds.top) - 2);
      const right = Math.min(sample.width, Math.ceil(bounds.left + bounds.width) + 2);
      const bottom = Math.min(sample.height, Math.ceil(bounds.top + bounds.height) + 2);
      if (right <= left || bottom <= top) return [];
      const width = right - left;
      const pixels = ink.getImageData(left, top, width, bottom - top).data;
      const firstPoint = (start: number) => {
        const index = Math.max(0, Math.ceil((start - step / 2) / step));
        let point = step / 2;
        // Repeat the original addition order so fractional pixel rounding and
        // the cached particle coordinates remain identical to the full scan.
        for (let i = 0; i < index; i++) point += step;
        if (point < start) point += step;
        return point;
      };
      const grains: Grain[] = [];
      const firstX = firstPoint(left);
      for (let y = firstPoint(top); y < bottom; y += step) {
        for (let x = firstX; x < right; x += step) {
          const offset = ((Math.floor(y) - top) * width + Math.floor(x) - left) * 4;
          if (pixels[offset + 3] < 42) continue;
          grains.push({
            x,
            y,
            alpha: pixels[offset + 3] / 255,
            rgb: [pixels[offset], pixels[offset + 1], pixels[offset + 2]],
          });
        }
      }
      return grains;
    };
    const bounds = imageBounds[1];
    spacing = Math.max(
      1.35,
      Math.sqrt((bounds.width * bounds.height) / (compact ? 4500 : 9500)),
    );
    const origins = sampleGrains(spacing, sourceBounds);
    ink.clearRect(0, 0, sample.width, sample.height);
    const box = measureCloud();
    const crop = cloud.viewBox.baseVal;
    ink.drawImage(
      cloudImage,
      (cloudImage.naturalWidth * crop.x) / 100,
      (cloudImage.naturalHeight * crop.y) / 100,
      (cloudImage.naturalWidth * crop.width) / 100,
      (cloudImage.naturalHeight * crop.height) / 100,
      box.left,
      box.top,
      box.width,
      box.height,
    );
    const targets = sampleGrains(compact ? 1.05 : 1.2, box);
    if (!origins.length || !targets.length) return;
    // Reading order correspondence preserves the tear's outline at departure;
    // repeated target points let the same pigment gather into the small cloud.
    const count = Math.max(origins.length, targets.length);
    data = new Float32Array(count * 11);
    let alphaSum = 0;
    const tint = [0, 0, 0];
    targets.forEach((grain) => {
      alphaSum += grain.alpha;
      grain.rgb.forEach((channel, index) => {
        tint[index] += channel * grain.alpha;
      });
    });
    tint.forEach((channel, index) => {
      accent[index] = channel / alphaSum;
    });
    for (let i = 0; i < count; i++) {
      const origin = origins[Math.floor((i / count) * origins.length)];
      const target = targets[Math.floor((i / count) * targets.length)];
      data.set(
        [
          origin.x,
          origin.y,
          target.x,
          target.y,
          ...origin.rgb.map((channel) => channel / 255),
          origin.alpha,
          noise(i + 3) * 0.08,
          (noise(i + 1) - 0.5) * (compact ? 75 : 150),
          noise(i + 9) * Math.PI * 2,
        ],
        i * 11,
      );
    }
    if (!initialized) {
      initialized = true;
      gpu = createChallengeParticleRenderer(canvas);
    }
    gpu?.upload(data, width, height, ratio, spacing, accent);
    fallback.width = Math.ceil(width * ratio);
    fallback.height = Math.ceil(height * ratio);
    frame.dataset.renderer = gpu ? "webgl" : "canvas";
    frame.dataset.particleCount = String(count);
    targetBounds = box;
    ready = true;
  };
  const schedulePrepare = () => {
    if (
      disposed || ready || prepareFrame || !cloudImage.complete ||
      !cloudImage.naturalWidth ||
      tearImages.some((image) => !image.complete || !image.naturalWidth)
    ) return;
    // Stage-relative coordinates keep sampling independent of native scroll.
    // The cloud keeps its ambient motion until the actual carried transition.
    prepareFrame = requestAnimationFrame(() => {
      prepareFrame = 0;
      if (disposed) return;
      prepare();
    });
  };
  const renderParticles = (progress: number) => {
    const visible = fixed && particlePass && ready && progress > 0 && progress < 1;
    canvas.style.visibility = visible ? "visible" : "hidden";
    fallback.style.visibility = "hidden";
    if (!visible || gpu?.render(progress)) return;
    canvas.style.visibility = "hidden";
    fallback.style.visibility = "visible";
    frame.dataset.renderer = "canvas";
    if (!context) return;
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    context.clearRect(0, 0, width, height);
    const count = data.length / 11;
    const stride = Math.max(1, Math.ceil(count / (compact ? 2400 : 4000)));
    for (let i = 0; i < count; i += stride) {
      const offset = i * 11;
      const local = (progress - data[offset + 8]) / (1 - data[offset + 8]);
      const travel = smooth(0.06, 0.86, local);
      const arc = Math.sin(Math.PI * travel);
      const flutter = Math.sin(data[offset + 10] + travel * Math.PI * 2) * arc;
      const x =
        data[offset] +
        (data[offset + 2] - data[offset]) * travel +
        data[offset + 9] * arc * 0.32 +
        flutter * 3;
      const y =
        data[offset + 1] +
        (data[offset + 3] - data[offset + 1]) * travel -
        data[offset + 9] * arc +
        flutter * 2;
      context.globalAlpha =
        smooth(0, 0.07, progress - data[offset + 8]) *
        (1 - smooth(0.88, 1, progress)) *
        data[offset + 7];
      const mix = smooth(0.42, 0.84, progress);
      context.fillStyle = `rgb(${accent.map((channel, index) => Math.round(data[offset + 4 + index] * 255 * (1 - mix) + channel * mix)).join(",")})`;
      context.fillRect(
        x,
        y,
        spacing * Math.sqrt(stride) * 0.8,
        spacing * Math.sqrt(stride) * 0.8,
      );
    }
    context.globalAlpha = 1;
  };
  const draw = () => {
    if (disposed || isHomeMotionRefreshing()) return;
    const p = state.progress;
    const active = p > 0 && p < 1;
    boundaryGuard.setActive(active);
    setFixed(active);
    frame.style.visibility = active ? "visible" : "hidden";
    frame.dataset.progress = p.toFixed(3);
    frame.dataset.phase = p === 0
      ? "idle"
      : p < 0.4
        ? "disperse"
        : p < 1
          ? "map-reveal"
          : "complete";
    if (!active) {
      particlePass = undefined;
      frame.dataset.particleMode = "idle";
      renderParticles(0);
      return;
    }
    if (!ready) prepare();
    // Keep the same rendering path for this pass if the images were still
    // decoding on entry; newly ready particles belong to the next pass.
    if (particlePass === undefined) {
      const waitingForLettering = source.querySelector<HTMLElement>(
        ".story-reading-ink",
      )?.dataset.artworkMode === "waiting";
      // That earlier pass still owns the native question. Crossfade the whole
      // stage instead of sampling lettering that remains hidden in the tear.
      particlePass = ready && !waitingForLettering;
    }
    frame.dataset.particleMode = particlePass ? "particles" : "crossfade";
    const color = smooth(0, 0.72, p);
    frame.style.backgroundColor = background(color);
    wash[0].style.opacity = String(1 - color);
    wash[1].style.opacity = String(color);
    source.style.opacity = String(
      1 - smooth(particlePass ? 0.18 : 0, particlePass ? 0.36 : 0.7, p),
    );
    // Reveal the map while the pigment gathers; a small cloud alone leaves
    // the middle of the viewport empty during a slow scroll or pause.
    destination.style.opacity = "1";
    destination.style.setProperty(
      "--tear-cloud-map-reveal",
      String(smooth(particlePass ? 0.4 : 0.22, 1, p)),
    );
    cloud.style.opacity = String(smooth(particlePass ? 0.5 : 0.22, 0.7, p));
    renderParticles(smooth(0, 0.7, p));
  };
  const boundaryGuard = createHomeScrubBoundaryGuard(
    () => timeline.scrollTrigger,
    draw,
  );
  const timeline = gsap.timeline({
    scrollTrigger: {
      id: "home-tear-cloud-carry",
      trigger: map,
      start: () => from.end - window.innerHeight * TEAR_CLOUD_LEAD,
      end: () => to.start + Math.max(1, to.end - to.start) * 0.22,
      scrub: compact ? 0.18 : BRIDGE_SCRUB,
      invalidateOnRefresh: true,
      onUpdate: settleHomeScrubEndpoint,
    },
  });
  timeline.fromTo(
    state,
    { progress: 0 },
    {
      progress: 1,
      duration: 1,
      ease: "none",
      onUpdate: draw,
    },
  );
  const prewarm = ScrollTrigger.create({
    trigger: map,
    start: () => timeline.scrollTrigger!.start - window.innerHeight,
    end: () => timeline.scrollTrigger!.end + window.innerHeight,
    onEnter: schedulePrepare,
    onEnterBack: schedulePrepare,
    onRefresh: ({ isActive }) => {
      if (isActive) schedulePrepare();
    },
  });
  const refresh = () => {
    ready = false;
    targetBounds = null;
    cancelAnimationFrame(prepareFrame);
    prepareFrame = 0;
    frame.dataset.scrollStart = String(timeline.scrollTrigger!.start);
    frame.dataset.scrollEnd = String(timeline.scrollTrigger!.end);
    settleHomeScrubEndpoint(timeline.scrollTrigger!);
    draw();
    if (prewarm.isActive) schedulePrepare();
  };
  ScrollTrigger.addEventListener("refresh", refresh);
  Promise.all([
    ...tearImages.map((image) => image.decode()),
    cloudImage.decode(),
  ])
    .then(() => {
      if (!disposed) {
        draw();
        if (prewarm.isActive) schedulePrepare();
      }
    })
    .catch(() => {});
  refresh();
  return () => {
    disposed = true;
    boundaryGuard.dispose();
    cancelAnimationFrame(prepareFrame);
    prewarm.kill();
    ScrollTrigger.removeEventListener("refresh", refresh);
    timeline.scrollTrigger?.kill();
    timeline.kill();
    setFixed(false);
    gpu?.dispose();
    frame.remove();
    canvas.remove();
    fallback.remove();
    data = new Float32Array();
  };
}
