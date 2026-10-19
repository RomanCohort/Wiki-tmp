import type gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { createChallengeParticleRenderer } from "./challengeParticleRenderer";

type InkPoint = { x: number; y: number; alpha: number; color: string; rgb: number[] };
type Grain = InkPoint & {
  tx: number; ty: number; bend: number; phase: number; delay: number;
};

const clamp = (value: number) => Math.max(0, Math.min(1, value));
const smooth = (start: number, end: number, value: number) => {
  const t = clamp((value - start) / (end - start));
  return t * t * (3 - 2 * t);
};
// Stable noise makes reverse scrolling retrace exactly the same paths.
const noise = (index: number) => {
  const value = Math.sin(index * 127.1 + 311.7) * 43758.5453;
  return value - Math.floor(value);
};

/** Each illustration supplies the source positions, pigment and transparency.
 * Text is sampled from DOM character ranges, including the browser's wrapping.
 * Only GSAP progress drives rendering; there is no idle animation loop. */
export function animateChallengeMorph(
  section: HTMLElement,
  timeline: ReturnType<typeof gsap.timeline>,
  compact: boolean,
): () => void {
  const cleanups: (() => void)[] = [];
  const pending = new Map<SVGSVGElement, () => void>();
  let prepareFrame = 0;
  let stopped = false;
  const flushPrepare = () => {
    prepareFrame = 0;
    if (stopped) return;
    const next = pending.entries().next().value;
    if (next) {
      pending.delete(next[0]);
      next[1]();
    }
    if (pending.size && !prepareFrame) {
      prepareFrame = requestAnimationFrame(flushPrepare);
    }
  };
  const queuePrepare = (icon: SVGSVGElement, task: () => void) => {
    if (stopped) return;
    pending.set(icon, task);
    if (!prepareFrame) prepareFrame = requestAnimationFrame(flushPrepare);
  };
  section.querySelectorAll<SVGSVGElement>("[data-morph-icon]").forEach((icon, index) => {
    const key = icon.dataset.morphIcon;
    const word = section.querySelector<HTMLElement>(`[data-morph-word="${key}"]`);
    const thumbnail = section.querySelector<SVGSVGElement>(`[data-morph-thumbnail="${key}"]`);
    const crop = icon.querySelector("clipPath rect");
    const href = icon.querySelector("image")?.getAttribute("href");
    const art = icon.closest<HTMLElement>(".story-art");
    if (!word || !crop || !href || !art) return;

    const canvas = document.createElement("canvas");
    canvas.className = "story-morph-canvas";
    canvas.setAttribute("aria-hidden", "true");
    canvas.style.cssText = "position:absolute;z-index:6;pointer-events:none;visibility:hidden";
    icon.parentElement!.append(canvas);
    const context = canvas.getContext("2d");
    const source = document.createElement("canvas");
    const sourceContext = source.getContext("2d", { willReadFrequently: true });
    const ink = document.createElement("canvas");
    const inkContext = ink.getContext("2d", { willReadFrequently: true });
    if (!context || !sourceContext || !inkContext) {
      canvas.remove();
      timeline.to(icon, { opacity: 0, duration: 0.2 }, 0.24 + index * 0.1);
      timeline.to(word, { opacity: 1, duration: 0.2 }, 0.4 + index * 0.1);
      if (thumbnail) {
        timeline.fromTo(thumbnail, { opacity: 0, scale: 1.2, y: 8 },
          { opacity: 1, scale: 1, y: 0, duration: 0.2 }, 0.4 + index * 0.1);
      }
      return;
    }

    const originalIconStyle = icon.style.opacity;
    const originalWordStyle = word.style.opacity;
    const originalThumbnailStyle = thumbnail?.getAttribute("style");
    const state = { progress: 0 };
    const image = new Image();
    image.crossOrigin = "anonymous";
    let disposed = false;
    let ready = false;
    let width = 1;
    let height = 1;
    let ratio = 1;
    let sourceX = 0;
    let sourceY = 0;
    let sourceWidth = 1;
    let sourceHeight = 1;
    let spacing = 1.6;
    let accent = "#5475a5";
    let grains: Grain[] = [];
    let decoded = false;
    let pendingRebuild = false;
    let transitionActive = false;
    let useParticles = false;
    let activated = false;
    const gpuCanvas = document.createElement("canvas");
    gpuCanvas.className = "story-morph-grains";
    gpuCanvas.setAttribute("aria-hidden", "true");
    gpuCanvas.style.cssText = canvas.style.cssText;
    canvas.after(gpuCanvas);
    let gpu: ReturnType<typeof createChallengeParticleRenderer> = null;
    let rendererInitialized = false;
    let thumbnailX = 0;
    let thumbnailY = 8;
    let thumbnailScale = 1.2;

    const draw = () => {
      if (disposed) return;
      const p = state.progress;
      const active = p > 0 && p < 1;
      // Fast input keeps the original-image dissolve for its whole pass.
      // Preparing late must not replace a half-visible icon with particles.
      if (!active || !transitionActive) useParticles = ready;
      transitionActive = active;
      const particlesReady = ready && useParticles;
      if (!active && pendingRebuild) scheduleRebuild();
      const finish = smooth(0.88, 1, p);
      word.style.opacity = String(particlesReady ? finish : smooth(0.5, 1, p));
      icon.style.opacity = String(particlesReady ? (p <= 0 ? 1 : 0) : 1 - smooth(0, 0.5, p));
      if (thumbnail) {
        const settle = smooth(0.5, 1, p);
        thumbnail.style.opacity = String(smooth(0.62, 0.94, p));
        thumbnail.style.transform = `translate(${thumbnailX * (1 - settle)}px, ${thumbnailY * (1 - settle)}px) scale(${1 + (thumbnailScale - 1) * (1 - settle)})`;
      }
      canvas.style.visibility = particlesReady && active ? "visible" : "hidden";
      gpuCanvas.style.visibility = canvas.style.visibility;
      if (!particlesReady || !active) return;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      context.clearRect(0, 0, width, height);
      context.globalAlpha = 1;

      // A travelling erosion front preserves the unshed part of the drawing.
      // Its alpha matches the grains emerging at the same source coordinates.
      if (p < 0.27) {
        context.drawImage(source, sourceX, sourceY, sourceWidth, sourceHeight);
        context.globalCompositeOperation = "destination-in";
        const mask = context.createLinearGradient(sourceX, 0, sourceX + sourceWidth, 0);
        for (let stop = 0; stop <= 24; stop++) {
          const alpha = 1 - smooth(0, 0.07, p - (stop / 24) * 0.2);
          mask.addColorStop(stop / 24, `rgba(0,0,0,${alpha})`);
        }
        context.fillStyle = mask;
        context.fillRect(0, 0, width, height);
        context.globalCompositeOperation = "source-over";
      }

      if (gpu?.render(p)) return;
      gpuCanvas.style.visibility = "hidden";
      canvas.dataset.renderer = "canvas";
      const colorMix = smooth(0.42, 0.84, p);
      const stride = Math.max(1, Math.ceil(grains.length / 1800));
      for (let i = 0; i < grains.length; i += stride) {
        const grain = grains[i];
        const local = (p - grain.delay) / (1 - grain.delay);
        const shed = smooth(0, 0.07, p - grain.delay);
        if (shed <= 0) continue;
        const travel = smooth(0.06, 0.86, local);
        const arc = Math.sin(Math.PI * travel);
        const flutter = Math.sin(grain.phase + travel * Math.PI * 2) * arc;
        const x = grain.x + (grain.tx - grain.x) * travel
          + grain.bend * arc * 0.32 + flutter * 3;
        const y = grain.y + (grain.ty - grain.y) * travel
          - grain.bend * arc + flutter * 2;
        const size = spacing * Math.sqrt(stride) * (1.25 - 0.42 * arc - 0.48 * travel);
        context.globalAlpha = shed * (1 - finish) * (grain.alpha + (0.8 - grain.alpha) * travel);
        context.fillStyle = colorMix > noise(grain.phase) ? accent : grain.color;
        context.beginPath();
        context.arc(x, y, Math.max(0.35, size * 0.5), 0, Math.PI * 2);
        context.fill();
      }
      context.globalAlpha = 1;
    };

    const rebuild = () => {
      if (disposed || !image.naturalWidth) return;
      const artBox = art.getBoundingClientRect();
      const iconBox = icon.getBoundingClientRect();
      const wordBox = word.getBoundingClientRect();
      // Remove the shared camera scale; all positions stay in artwork CSS pixels.
      const scaleX = artBox.width / art.clientWidth;
      const scaleY = artBox.height / art.clientHeight;
      if (!scaleX || !scaleY) return;
      const attr = (name: string) => Number(crop.getAttribute(name)) / 100;
      sourceWidth = iconBox.width / scaleX * attr("width");
      sourceHeight = iconBox.height / scaleY * attr("height");
      const cropLeft = (iconBox.left - artBox.left) / scaleX + iconBox.width / scaleX * attr("x");
      const cropTop = (iconBox.top - artBox.top) / scaleY + iconBox.height / scaleY * attr("y");
      if (thumbnail) {
        // The thumbnail's CSS anchor remains stable while its own transform moves.
        // Never sample the animated thumbnail as the particle source on refresh.
        const style = getComputedStyle(thumbnail);
        thumbnailX = cropLeft + sourceWidth / 2 - Number.parseFloat(style.left);
        thumbnailY = cropTop + sourceHeight / 2 - Number.parseFloat(style.top);
        thumbnailScale = sourceWidth / Number.parseFloat(style.width);
      }
      const wordLeft = (wordBox.left - artBox.left) / scaleX;
      const wordTop = (wordBox.top - artBox.top) / scaleY;
      const padding = compact ? 22 : 42;
      const left = Math.min(cropLeft, wordLeft) - padding;
      const top = Math.min(cropTop, wordTop) - padding;
      width = Math.ceil(Math.max(cropLeft + sourceWidth, wordLeft + wordBox.width / scaleX) - left + padding);
      height = Math.ceil(Math.max(cropTop + sourceHeight, wordTop + wordBox.height / scaleY) - top + padding);
      sourceX = cropLeft - left;
      sourceY = cropTop - top;
      ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.ceil(width * ratio);
      canvas.height = Math.ceil(height * ratio);
      Object.assign(canvas.style, { left: `${left}px`, top: `${top}px`, width: `${width}px`, height: `${height}px` });
      gpuCanvas.style.cssText = canvas.style.cssText;
      source.width = Math.max(1, Math.ceil(sourceWidth));
      source.height = Math.max(1, Math.ceil(sourceHeight));
      sourceContext.drawImage(image,
        attr("x") * image.naturalWidth, attr("y") * image.naturalHeight,
        attr("width") * image.naturalWidth, attr("height") * image.naturalHeight,
        0, 0, source.width, source.height);

      ink.width = Math.ceil(width * 2);
      ink.height = Math.ceil(height * 2);
      inkContext.scale(2, 2);
      const style = getComputedStyle(word);
      accent = style.color;
      inkContext.fillStyle = accent;
      inkContext.font = `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
      inkContext.textBaseline = "alphabetic";
      // Range follows the real text-wrap: balance result without adding spans.
      const walker = document.createTreeWalker(word, NodeFilter.SHOW_TEXT);
      const range = document.createRange();
      let node: Node | null;
      while ((node = walker.nextNode())) {
        const text = node.textContent || "";
        for (let i = 0; i < text.length; i++) {
          if (!text[i].trim()) continue;
          range.setStart(node, i);
          range.setEnd(node, i + 1);
          const box = range.getBoundingClientRect();
          const metrics = inkContext.measureText(text[i]);
          const ascent = metrics.fontBoundingBoxAscent ?? metrics.actualBoundingBoxAscent;
          const descent = metrics.fontBoundingBoxDescent ?? metrics.actualBoundingBoxDescent;
          const baseline = (box.top - artBox.top) / scaleY - top
            + (box.height / scaleY - ascent - descent) / 2 + ascent;
          inkContext.fillText(text[i], (box.left - artBox.left) / scaleX - left, baseline);
        }
      }
      try {
        const sourcePixels = sourceContext.getImageData(0, 0, source.width, source.height).data;
        const inkPixels = inkContext.getImageData(0, 0, ink.width, ink.height).data;
        const targets: { x: number; y: number }[] = [];
        for (let y = 0; y < ink.height; y += 2) {
          for (let x = 0; x < ink.width; x += 2) {
            if (inkPixels[(y * ink.width + x) * 4 + 3] > 80) targets.push({ x: x / 2, y: y / 2 });
          }
        }
        if (!targets.length) throw new Error("Empty text mask");
        const samples: InkPoint[] = [];
        // Bound work on very large displays while retaining sub-two-pixel grain.
        spacing = Math.max(compact ? 1.25 : 1.45, Math.sqrt(sourceWidth * sourceHeight / (compact ? 9500 : 22000)));
        for (let y = spacing / 2; y < source.height; y += spacing) {
          for (let x = spacing / 2; x < source.width; x += spacing) {
            const offset = (Math.floor(y) * source.width + Math.floor(x)) * 4;
            const alpha = sourcePixels[offset + 3] / 255;
            if (alpha < 0.07) continue;
            const r = sourcePixels[offset], g = sourcePixels[offset + 1], b = sourcePixels[offset + 2];
            samples.push({ x: x + sourceX, y: y + sourceY, alpha,
              color: `rgb(${r},${g},${b})`, rgb: [r, g, b] });
          }
        }
        // Spatial ordering preserves neighbourhoods and avoids a tangled burst.
        const order = (a: { x: number; y: number }, b: { x: number; y: number }) =>
          a.x - b.x || a.y - b.y;
        samples.sort(order);
        targets.sort(order);
        grains = samples.map((sample, i) => {
          const target = targets[Math.min(targets.length - 1, Math.floor(i / samples.length * targets.length))];
          return { ...sample, tx: target.x, ty: target.y,
            delay: clamp((sample.x - sourceX) / sourceWidth) * 0.2,
            bend: (noise(i + 1) - 0.3) * (compact ? 30 : 64),
            phase: noise(i + 9) * Math.PI * 2 };
        });
        ready = grains.length > 0;
        canvas.dataset.particleCount = String(grains.length);
        canvas.dataset.morphKey = key;
        const data = new Float32Array(grains.length * 11);
        grains.forEach((grain, i) => data.set([
          grain.x, grain.y, grain.tx, grain.ty,
          ...grain.rgb.map(value => value / 255), grain.alpha,
          grain.delay, grain.bend, grain.phase,
        ], i * 11));
        gpu?.upload(data, width, height, ratio, spacing,
          accent.match(/[\d.]+/g)?.slice(0, 3).map(Number) ?? [84, 117, 165]);
      } catch {
        // Asset/CORS failures keep the readable SVG-to-label fallback working.
        ready = false;
      }
      draw();
    };

    const scheduleRebuild = () => {
      if (disposed || !activated || !decoded) return;
      pendingRebuild = true;
      if (transitionActive) return;
      queuePrepare(icon, () => {
        if (disposed || transitionActive) return;
        // Shader setup and pixel sampling get separate frames. The five
        // icons share this queue so they cannot all rebuild in one frame.
        if (!rendererInitialized) {
          rendererInitialized = true;
          gpu = createChallengeParticleRenderer(gpuCanvas);
          canvas.dataset.renderer = gpu ? "webgl" : "canvas";
          scheduleRebuild();
          return;
        }
        pendingRebuild = false;
        rebuild();
      });
    };
    const observer = new ResizeObserver(scheduleRebuild);
    const onContextLost = () => draw();
    gpuCanvas.addEventListener("webglcontextlost", onContextLost);
    observer.observe(art);
    observer.observe(word);
    ScrollTrigger.addEventListener("refresh", scheduleRebuild);
    image.onload = () => {
      // Decoding off the sampling callback avoids a lazy image decode there.
      void image.decode().then(() => {
        if (disposed) return;
        decoded = true;
        scheduleRebuild();
      }).catch(() => {
        if (disposed) return;
        decoded = Boolean(image.naturalWidth);
        scheduleRebuild();
      });
    };
    image.onerror = () => { ready = false; draw(); };
    // Sampling text and compiling WebGL must not compete with the page loader.
    // Prepare only when this chapter is approaching the viewport.
    const proximity = new IntersectionObserver((entries) => {
      if (disposed || !entries.some((entry) => entry.isIntersecting)) return;
      activated = true;
      proximity.disconnect();
      image.src = href;
      scheduleRebuild();
    }, { rootMargin: "100% 0px" });
    proximity.observe(section);
    void document.fonts.ready.then(() => { if (!disposed) scheduleRebuild(); });
    timeline.fromTo(state, { progress: 0 }, {
      progress: 1, duration: 0.46, ease: "none", onUpdate: draw,
    }, 0.2 + index * 0.11);
    cleanups.push(() => {
      disposed = true;
      observer.disconnect();
      proximity.disconnect();
      ScrollTrigger.removeEventListener("refresh", scheduleRebuild);
      pending.delete(icon);
      image.onload = null;
      image.onerror = null;
      gpuCanvas.removeEventListener("webglcontextlost", onContextLost);
      canvas.remove();
      gpu?.dispose();
      gpuCanvas.remove();
      icon.style.opacity = originalIconStyle;
      word.style.opacity = originalWordStyle;
      if (thumbnail) {
        if (originalThumbnailStyle === null) thumbnail.removeAttribute("style");
        else if (originalThumbnailStyle !== undefined) thumbnail.setAttribute("style", originalThumbnailStyle);
      }
      grains = [];
    });
  });
  return () => {
    stopped = true;
    cancelAnimationFrame(prepareFrame);
    pending.clear();
    cleanups.forEach((cleanup) => cleanup());
  };
}
