import { isHomeMotionRefreshing } from "./homeMotion";

export type InkCue = {
  tokens: HTMLElement[];
  state: { progress: number };
};
export type InkTransfer = { source: InkCue; target: InkCue; state: { progress: number } };
export type InkArtworkTransfer = { source: InkCue; element: HTMLElement; target: HTMLImageElement; state: { progress: number } };
type Grain = { x: number; y: number; alpha: number; color: string; rgb: number[]; phase: number; token: number };
type Plate = { grains: Grain[]; x: number; y: number; width: number; height: number; spacing: number };
type Pair = { a: Grain; b: Grain; shared: boolean };
type ArtworkFlight = { plate: Plate; pairs: Pair[]; direction: number[]; low: number; high: number;
  mask: { angle: number; center: number; extent: number } };

const clamp = (v: number) => Math.max(0, Math.min(1, v));
const smooth = (a: number, b: number, v: number) => {
  const t = clamp((v - a) / (b - a));
  return t * t * (3 - 2 * t);
};
const noise = (i: number) => {
  const n = Math.sin(i * 127.1 + 19.7) * 43758.5453;
  return n - Math.floor(n);
};

/** One demand-rendered ink surface per reading panel. Real browser glyphs supply
 * the pigment; the DOM takes over at the end, preserving selectable, sharp text.
 * Sampling is lazy, bounded, and independent of scroll position or elapsed time. */
export function createReadingInk(stage: HTMLElement, cues: InkCue[], transfers: InkTransfer[], compact: boolean,
  artworkTransfers: InkArtworkTransfer[] = []) {
  const canvas = document.createElement("canvas");
  canvas.className = "story-reading-ink";
  canvas.setAttribute("aria-hidden", "true");
  canvas.width = canvas.height = 1;
  stage.append(canvas);
  const context = canvas.getContext("2d");
  const plates = new Map<InkCue, Plate>();
  const correspondences = new Map<InkTransfer, Pair[]>();
  const artworkFlights = new Map<InkArtworkTransfer, ArtworkFlight>();
  const artworkModes = new Map<InkArtworkTransfer, "particles" | "dissolve" | "waiting">();
  const original = new Map<HTMLElement, string | null>();
  const originalMasks = new Map<HTMLElement, string>();
  const opacity = new Map<InkCue, number>();
  let disposed = false;
  let width = 0;
  let height = 0;
  let ratio = 1;
  let lastProgress: number[] = [];
  let prepareFrame = 0;
  for (const cue of cues) for (const token of cue.tokens) {
    original.set(token, token.getAttribute("style"));
    token.style.opacity = "0";
  }
  for (const transfer of artworkTransfers) {
    original.set(transfer.element, transfer.element.getAttribute("style"));
    originalMasks.set(transfer.element, transfer.element.style.maskImage);
    original.set(transfer.target, transfer.target.getAttribute("style"));
    transfer.target.style.opacity = "0";
  }

  const setOpacity = (cue: InkCue, value: number) => {
    if (opacity.get(cue) === value) return;
    cue.tokens.forEach(token => { token.style.opacity = String(value); });
    opacity.set(cue, value);
  };

  const prepare = (cue: InkCue): Plate | undefined => {
    if (plates.has(cue)) return plates.get(cue);
    const stageBox = stage.getBoundingClientRect();
    const range = document.createRange();
    // Surface padding protects italic overflow, but is not owned pigment.
    // Use the text advance so adjacent words keep separate grain ownership.
    const boxes = cue.tokens.map(token => {
      range.selectNodeContents(token);
      return range.getBoundingClientRect();
    });
    if (!boxes.length) return;
    const bounds = boxes.map(box => ({
      left: box.left - stageBox.left, right: box.right - stageBox.left,
      top: box.top - stageBox.top, bottom: box.bottom - stageBox.top,
    }));
    const scratch = document.createElement("canvas");
    const ink = scratch.getContext("2d", { willReadFrequently: true });
    if (!ink) return;
    const runs: { text: string; font: string; color: string; letterSpacing: string; x: number; baseline: number }[] = [];
    for (const [index, token] of cue.tokens.entries()) {
      const walker = document.createTreeWalker(token, NodeFilter.SHOW_TEXT);
      let node: Node | null;
      while ((node = walker.nextNode())) {
        const text = node.textContent || "";
        if (!text.trim()) continue;
        const style = getComputedStyle(node.parentElement!);
        ink.font = `${style.fontStyle} ${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
        ink.letterSpacing = style.letterSpacing === "normal" ? "0px" : style.letterSpacing;
        range.selectNodeContents(node);
        const box = range.getBoundingClientRect();
        const metrics = ink.measureText(text);
        const ascent = metrics.fontBoundingBoxAscent ?? metrics.actualBoundingBoxAscent;
        const descent = metrics.fontBoundingBoxDescent ?? metrics.actualBoundingBoxDescent;
        const x = box.left - stageBox.left;
        const baseline = box.top - stageBox.top + (box.height - ascent - descent) / 2 + ascent;
        // Italic contours can extend beyond the word's advance box. Include them
        // in both the raster and particle ownership, so shared words stay whole.
        const bound = bounds[index];
        bound.left = Math.min(bound.left, x - metrics.actualBoundingBoxLeft);
        bound.right = Math.max(bound.right, x + metrics.actualBoundingBoxRight);
        bound.top = Math.min(bound.top, baseline - metrics.actualBoundingBoxAscent);
        bound.bottom = Math.max(bound.bottom, baseline + metrics.actualBoundingBoxDescent);
        runs.push({ text, font: ink.font, color: style.color,
          letterSpacing: ink.letterSpacing, x, baseline });
      }
    }
    const left = Math.min(...bounds.map(b => b.left)) - 4;
    const top = Math.min(...bounds.map(b => b.top)) - 4;
    const w = Math.ceil(Math.max(...bounds.map(b => b.right)) - left + 4);
    const h = Math.ceil(Math.max(...bounds.map(b => b.bottom)) - top + 4);
    if (w <= 0 || h <= 0) return;
    const sampleRatio = 1.5;
    scratch.width = Math.ceil(w * sampleRatio);
    scratch.height = Math.ceil(h * sampleRatio);
    ink.scale(sampleRatio, sampleRatio);
    ink.textBaseline = "alphabetic";
    for (const run of runs) {
      ink.font = run.font;
      ink.fillStyle = run.color;
      ink.letterSpacing = run.letterSpacing;
      ink.fillText(run.text, run.x - left, run.baseline - top);
    }
    const pixels = ink.getImageData(0, 0, scratch.width, scratch.height).data;
    const grains: Grain[] = [];
    const spacing = compact ? 1.15 : 1.05;
    const step = spacing * sampleRatio;
    for (let y = step / 2; y < scratch.height; y += step) {
      for (let x = step / 2; x < scratch.width; x += step) {
        const offset = (Math.floor(y) * scratch.width + Math.floor(x)) * 4;
        const alpha = pixels[offset + 3] / 255;
        if (alpha < 0.1) continue;
        const gx = left + x / sampleRatio, gy = top + y / sampleRatio;
        const token = bounds.findIndex(b => gx >= b.left - 2 && gx <= b.right + 2
          && gy >= b.top - 2 && gy <= b.bottom + 2);
        const rgb = [pixels[offset], pixels[offset + 1], pixels[offset + 2]];
        grains.push({ x: gx, y: gy, alpha, token, rgb,
          color: `rgb(${rgb.join(",")})`, phase: noise(grains.length) });
      }
    }
    // Keep the contour dense without scaling work with a very large monitor.
    const cap = compact ? 3200 : 6200;
    const stride = Math.max(1, Math.ceil(grains.length / cap));
    const plate = { grains: grains.filter((_, i) => i % stride === 0), x: left, y: top,
      width: w, height: h, spacing: spacing * Math.sqrt(stride) };
    plates.set(cue, plate);
    canvas.dataset.sampledGrains = String([...plates.values()].reduce((n, p) => n + p.grains.length, 0));
    return plate;
  };

  const dot = (grain: Grain, x: number, y: number, size: number, alpha: number, color = grain.color) => {
    context!.globalAlpha = alpha * grain.alpha;
    context!.fillStyle = color;
    context!.fillRect(x - size / 2, y - size / 2, size, size);
  };

  const paint = (cue: InkCue, p: number) => {
    const plate = prepare(cue);
    if (!plate || !context) return;
    const native = smooth(0.86, 1, p);
    setOpacity(cue, native);
    const travel = compact ? 0.62 : 1;
    for (const grain of plate.grains) {
      const u = (grain.x - plate.x) / plate.width;
      const delay = u * 0.22;
      const local = clamp((p - delay) / (0.84 - delay));
      if (local <= 0) continue;
      const t = smooth(0, 1, local);
      const remain = 1 - t;
      const wave = Math.sin(Math.PI * t);
      const theta = grain.phase * Math.PI * 2;
      const x = grain.x - remain * (32 + 28 * grain.phase) * travel;
      const y = grain.y + Math.sin(theta + t * 5) * remain * 9 * travel;
      const alpha = smooth(0, 0.16, local) * (1 - native);
      dot(grain, x, y, plate.spacing * (0.68 + 0.35 * t), alpha);
      // Sparse hairline wakes reveal the direction of ink, without a haze over later words.
      if (grain.phase < 0.018 && local > 0.1 && local < 0.8) {
        context.globalAlpha = alpha * 0.2;
        context.strokeStyle = grain.color;
        context.lineWidth = 0.45;
        context.beginPath(); context.moveTo(x, y);
        context.quadraticCurveTo(x - 5 * remain, y - 9 * wave, x - 13 * remain, y - 3 * wave);
        context.stroke();
      }
    }
  };

  const transfer = (transition: InkTransfer) => {
    const { source, target, state } = transition;
    const p = state.progress;
    if (p <= 0) { setOpacity(target, 0); return; }
    const native = smooth(0.87, 1, p);
    setOpacity(source, 1 - smooth(0, 0.07, p));
    setOpacity(target, native);
    // Seeking past the transition only needs the native text, not pixel sampling.
    if (!context || p >= 1) return;
    const from = prepare(source), to = prepare(target);
    if (!from || !to) return;
    if (!from.grains.length || !to.grains.length) return;
    let pairs = correspondences.get(transition);
    if (!pairs) {
      pairs = [];
      const matchedSource = new Set<number>(), matchedTarget = new Set<number>();
      // Punctuation is part of the contour: "back.”" cannot supply "back?”".
      const key = (token: HTMLElement) => token.textContent?.trim().toLowerCase();
      const pair = (a: Grain[], b: Grain[], shared: boolean) => {
        const count = Math.max(a.length, b.length);
        if (!a.length || !b.length) return;
        for (let i = 0; i < count; i++) pairs!.push({
          a: a[Math.floor(i / count * a.length)], b: b[Math.floor(i / count * b.length)], shared,
        });
      };
      // Preserve shared words as coherent glyphs. Only the changed language disperses.
      target.tokens.forEach((token, targetIndex) => {
        const sourceIndex = source.tokens.findIndex((s, i) => !matchedSource.has(i) && key(s) === key(token));
        if (sourceIndex < 0) return;
        matchedSource.add(sourceIndex); matchedTarget.add(targetIndex);
        const origin = source.tokens[sourceIndex].getBoundingClientRect();
        const destination = token.getBoundingClientRect();
        // Move the original contour rigidly: independently sampled point arrays
        // have different densities and pairing them by index would scramble a word.
        for (const a of from.grains.filter(g => g.token === sourceIndex)) pairs!.push({
          a, b: { ...a, x: a.x + destination.left - origin.left,
            y: a.y + destination.top - origin.top }, shared: true,
        });
      });
      pair(from.grains.filter(g => !matchedSource.has(g.token)), to.grains.filter(g => !matchedTarget.has(g.token)), false);
      correspondences.set(transition, pairs);
      canvas.dataset.sharedWords = String(matchedTarget.size);
    }
    const tint = smooth(0.1, 0.9, p);
    const color = `rgb(${from.grains[0].rgb.map((v, i) => Math.round(v + (to.grains[0].rgb[i] - v) * tint)).join(",")})`;
    for (const { a, b, shared } of pairs) {
      const t = shared ? smooth(0.07, 0.86, p) : smooth(0.05 + a.phase * 0.08, 0.86, p);
      const arc = Math.sin(Math.PI * t);
      const x = a.x + (b.x - a.x) * t + (shared ? 0 : Math.sin(a.phase * 6.28 + t * 3) * arc * (compact ? 16 : 32));
      const rise = shared ? 3 : compact ? 6 + a.phase * 10 : 12 + a.phase * 32;
      const y = a.y + (b.y - a.y) * t - arc * rise;
      dot(t > 0.5 ? b : a, x, y, from.spacing + (to.spacing - from.spacing) * t,
        smooth(0, 0.07, p) * (1 - native), color);
    }
  };

  const prepareArtwork = (transition: InkArtworkTransfer): ArtworkFlight | undefined => {
    if (artworkFlights.has(transition)) return artworkFlights.get(transition);
    const image = transition.target;
    const from = prepare(transition.source);
    if (!from?.grains.length || !image.complete || !image.naturalWidth) return;
    const stageBox = stage.getBoundingClientRect();
    const box = image.getBoundingClientRect();
    const x = box.left - stageBox.left, y = box.top - stageBox.top;
    const w = Math.ceil(box.width), h = Math.ceil(box.height);
    if (w <= 0 || h <= 0) return;
    const scratch = document.createElement("canvas");
    scratch.width = w; scratch.height = h;
    const ink = scratch.getContext("2d", { willReadFrequently: true });
    if (!ink) return;
    ink.drawImage(image, 0, 0, w, h);
    const pixels = ink.getImageData(0, 0, w, h).data;
    const targets: Grain[] = [];
    const step = Math.max(1.15, Math.sqrt(w * h / (compact ? 4800 : 9000)));
    for (let py = step / 2; py < h; py += step) {
      for (let px = step / 2; px < w; px += step) {
        const offset = (Math.floor(py) * w + Math.floor(px)) * 4;
        const alpha = pixels[offset + 3] / 255;
        if (alpha < 0.1) continue;
        const rgb = [pixels[offset], pixels[offset + 1], pixels[offset + 2]];
        targets.push({ x: x + px, y: y + py, alpha, rgb,
          color: `rgb(${rgb.join(",")})`, token: -1, phase: noise(targets.length) });
      }
    }
    if (!targets.length) return;
    // Shed toward the actual destination: rightward on desktop, downward on mobile.
    const dx = x + w / 2 - from.x - from.width / 2;
    const dy = y + h / 2 - from.y - from.height / 2;
    const distance = Math.max(1, Math.hypot(dx, dy));
    const direction = [dx / distance, dy / distance];
    const projection = (px: number, py: number) => px * direction[0] + py * direction[1];
    const corners = [projection(from.x, from.y), projection(from.x + from.width, from.y),
      projection(from.x, from.y + from.height), projection(from.x + from.width, from.y + from.height)];
    const textBox = transition.element.getBoundingClientRect();
    const flight = { plate: from, direction, low: Math.min(...corners), high: Math.max(...corners),
      mask: {
        angle: Math.atan2(direction[0], -direction[1]) * 180 / Math.PI,
        center: projection(textBox.left - stageBox.left + textBox.width / 2,
          textBox.top - stageBox.top + textBox.height / 2),
        extent: Math.abs(textBox.width * direction[0]) + Math.abs(textBox.height * direction[1]),
      },
      // Keep one moving grain per source point; repeating origins brightens the glyphs.
      pairs: from.grains.map((a, i) => ({ a, b: targets[Math.floor(i / from.grains.length * targets.length)], shared: false })) };
    artworkFlights.set(transition, flight);
    canvas.dataset.artworkGrains = String(flight.pairs.length);
    return flight;
  };

  const scheduleArtworkPreparation = () => {
    if (disposed || prepareFrame || !context || !artworkTransfers.length) return;
    prepareFrame = requestAnimationFrame(() => {
      prepareFrame = 0;
      if (disposed || isHomeMotionRefreshing() || !stage.isConnected
        || !stage.clientWidth || !stage.clientHeight) return;
      // Decode and sample before scrolling reaches the handoff. Warming the
      // cache must not change the current pass's renderer or visible layers.
      artworkTransfers.forEach(prepareArtwork);
    });
  };

  const carryArtwork = (transition: InkArtworkTransfer) => {
    const { source, element, target, state } = transition;
    const p = state.progress;
    element.style.maskImage = originalMasks.get(element) || "";
    target.style.opacity = String(smooth(0.8, 1, p));
    canvas.dataset.artworkProgress = p.toFixed(3);
    // Refresh renders temporary startAt endpoints while measuring the page.
    // Keep the same renderer for the real pass throughout that measurement.
    const refreshing = isHomeMotionRefreshing();
    if (!refreshing && p <= 0) artworkModes.delete(transition);
    if (p <= 0) {
      canvas.dataset.artworkMode = "idle";
      return;
    }
    const available = target.complete && target.naturalWidth > 0;
    let mode = artworkModes.get(transition);
    if (p >= 1) {
      // A pass that began without its artwork keeps the native question even
      // at the endpoint. Late decoding must not swap the two layers in a hold.
      const waiting = mode === "waiting" || !available;
      if (!refreshing) {
        if (waiting) artworkModes.set(transition, "waiting");
        else artworkModes.delete(transition);
      }
      canvas.dataset.artworkMode = waiting ? "waiting" : mode || "complete";
      setOpacity(source, waiting ? 1 : 0);
      target.style.opacity = waiting ? "0" : "1";
      return;
    }
    if (!mode && !refreshing) {
      mode = !available ? "waiting" : context && prepareArtwork(transition) ? "particles" : "dissolve";
      artworkModes.set(transition, mode);
    }
    canvas.dataset.artworkMode = mode || "waiting";
    if (!available || mode === "waiting") {
      setOpacity(source, 1);
      target.style.opacity = "0";
      return;
    }
    // A decoded image can be used on the next pass; it must not replace an
    // already visible native dissolve with particles halfway through this one.
    const flight = mode === "particles" && context && prepareArtwork(transition);
    if (!flight) {
      // Keep the same crossfade if a drawing surface cannot be initialized.
      setOpacity(source, 1 - smooth(0.8, 1, p));
      return;
    }
    setOpacity(source, p < 0.29 ? 1 : 0);
    const { plate, pairs, direction, low, high, mask } = flight;
    const span = Math.max(1, high - low);
    const shedAt = (x: number, y: number) => (high - x * direction[0] - y * direction[1]) / span * 0.2;
    const native = smooth(0.8, 1, p);
    // Erode the original browser glyphs. Repainting them into a raster at p > 0
    // changes italic contours and antialiasing in a single frame.
    if (p < 0.29) {
      const stops = Array.from({ length: 25 }, (_, index) => {
        const position = index / 24;
        const projection = mask.center + (position - 0.5) * mask.extent;
        const alpha = 1 - smooth(0, 0.09, p - (high - projection) / span * 0.2);
        return `rgba(0,0,0,${alpha}) ${position * 100}%`;
      });
      element.style.maskImage = `linear-gradient(${mask.angle}deg, ${stops.join(",")})`;
    }
    for (const { a, b } of pairs) {
      const delay = shedAt(a.x, a.y);
      const shed = smooth(0, 0.09, p - delay);
      if (shed <= 0) continue;
      const t = smooth(0.04, 0.86, (p - delay) / (1 - delay));
      const arc = Math.sin(Math.PI * t);
      const rise = (compact ? 14 : 30) + a.phase * (compact ? 16 : 36);
      const x = a.x + (b.x - a.x) * t + Math.sin(a.phase * 6.28 + t * 4) * arc * (compact ? 5 : 10);
      const y = a.y + (b.y - a.y) * t - arc * rise;
      const color = `rgb(${a.rgb.map((v, i) => Math.round(v + (b.rgb[i] - v) * t)).join(",")})`;
      dot(a, x, y, plate.spacing * (0.95 - arc * 0.22), shed * (1 - native), color);
    }
    context!.globalAlpha = 1;
  };

  const render = () => {
    if (disposed) return;
    // The parent timeline also animates later sentences and a reading hold.
    // Repaint only when this surface's own ink state actually changes.
    const progress = [...cues.map(c => c.state.progress), ...transfers.map(t => t.state.progress),
      ...artworkTransfers.map(t => t.state.progress)];
    if (progress.length === lastProgress.length && progress.every((p, i) => p === lastProgress[i])) return;
    lastProgress = progress;
    const inTransit = [...transfers, ...artworkTransfers].some(t => t.state.progress > 0 && t.state.progress < 1);
    const moving = cues.some(c => c.state.progress > 0 && c.state.progress < 1) || inTransit;
    canvas.style.visibility = moving ? "visible" : "hidden";
    if (context && moving) {
      if (width !== stage.clientWidth || height !== stage.clientHeight) {
        width = stage.clientWidth; height = stage.clientHeight;
        ratio = Math.min(devicePixelRatio || 1, 1.5);
        canvas.width = Math.ceil(width * ratio); canvas.height = Math.ceil(height * ratio);
      }
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      context.clearRect(0, 0, width, height);
    }
    for (const cue of cues) {
      const p = cue.state.progress;
      if (!context || p <= 0 || p >= 1) setOpacity(cue, p >= 1 ? 1 : 0);
      else paint(cue, p);
    }
    transfers.forEach(transfer);
    // Run last: the earlier wish-to-question transfer restores the question.
    artworkTransfers.forEach(carryArtwork);
    canvas.dataset.active = String(moving);
  };
  const invalidate = () => {
    if (disposed) return;
    plates.clear();
    correspondences.clear();
    artworkFlights.clear();
    lastProgress = [];
    render();
    scheduleArtworkPreparation();
  };
  artworkTransfers.forEach(({ target }) => { void target.decode().then(invalidate).catch(() => {}); });
  scheduleArtworkPreparation();
  return { render, invalidate, dispose: () => {
    disposed = true;
    if (prepareFrame) cancelAnimationFrame(prepareFrame);
    canvas.remove();
    plates.clear();
    correspondences.clear();
    artworkFlights.clear();
    artworkModes.clear();
    original.forEach((style, element) => {
      if (style === null) element.removeAttribute("style"); else element.setAttribute("style", style);
    });
  } };
}
