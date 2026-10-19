import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  createHomeScrubBoundaryGuard,
  isHomeMotionRefreshing,
  settleHomeScrubEndpoint,
} from "./homeMotion";
import { updateWardInfusionTube } from "./wardInfusionGeometry";
import { trackPagePreparation } from "../utils/pageLoader";
const patientTeardrop = "https://static.igem.wiki/teams/6056/wiki/files/pages/home/patient-teardrop-20261004-765c97bc4482.webp";

// The portrait and detached drop share the artist's 2752 × 2064 canvas.
const PATIENT_CANVAS = { width: 2752, height: 2064 };
const DROP = { left: 681, top: 1144, width: 74, height: 103 };
// Viewports the bridge starts before the ward track ends, while it is sticky.
export const WARD_TEAR_LEAD = 0.36;
const BRIDGE_SCRUB = 0.2;
// Timeline rebuilds reuse the same artwork. Preserve successful preparation
// for that live outline, while a changed source still needs a fresh decode.
const decodedArtwork = new WeakMap<HTMLImageElement, string>();

const clamp = gsap.utils.clamp(0, 1);
const smooth = (from: number, to: number, value: number) => {
  const t = clamp((value - from) / (to - from));
  return t * t * (3 - 2 * t);
};

/** Hold the room steady while moisture gathers, slips down the cheek, and
 * leaves the face. Only the detached drop grows into the original painting. */
export function animateWardTear(
  root: HTMLElement,
  wardTimeline: gsap.core.Timeline,
  tearTimeline: gsap.core.Timeline,
  compact: boolean,
) {
  const ward = root.querySelector<HTMLElement>(
    "#what-we-saw .story-chapter-inner",
  );
  const tear = root.querySelector<HTMLElement>("#what-stayed-with-us");
  const stage = tear?.querySelector<HTMLElement>(".story-chapter-inner");
  const outline = tear?.querySelector<HTMLImageElement>('[data-layer="4"]');
  const layers = [3, 4].map((number) =>
    tear?.querySelector<HTMLImageElement>(`[data-layer="${number}"]`),
  );
  const from = wardTimeline.scrollTrigger;
  const to = tearTimeline.scrollTrigger;
  if (
    !ward ||
    !tear ||
    !stage ||
    !outline ||
    layers.some((layer) => !layer) ||
    !from ||
    !to
  ) {
    return () => {};
  }
  const images = layers as HTMLImageElement[];
  const originalVisibility = images.map((image) => image.style.visibility);
  const frame = document.createElement("div");
  frame.className = "story-tear-transition";
  frame.setAttribute("aria-hidden", "true");
  const room = ward.cloneNode(true) as HTMLElement;
  room.classList.add("story-tear-room");
  const wardColor = getComputedStyle(ward).backgroundColor;
  const tearColor = getComputedStyle(stage).backgroundColor;
  const backgroundColor = gsap.utils.interpolate(wardColor, tearColor);
  // The clone lives outside the chapter, so it cannot inherit --chapter-bg.
  // An opaque backing prevents the departing room showing through it twice.
  room.style.backgroundColor = wardColor;
  room.querySelector<HTMLElement>(".story-visual")!.style.opacity = "1";
  const roomBackdrop = room.querySelector<HTMLImageElement>(".story-backdrop")!;
  roomBackdrop.style.transform = "scale(1.005)";
  room
    .querySelectorAll("[id]")
    .forEach((element) => element.removeAttribute("id"));
  room
    .querySelectorAll<HTMLImageElement>("img")
    .forEach((image) => (image.loading = "eager"));
  room
    .querySelectorAll<HTMLElement>(".story-ward-change")
    .forEach((element) => {
      element.style.opacity = "1";
      element.style.transform = "none";
    });
  room
    .querySelectorAll<HTMLElement>(
      ".story-ward-original--2, .story-ward-original--3",
    )
    .forEach((element) => (element.style.opacity = "0"));
  const patient = room.querySelector<HTMLElement>('[data-ward="patient"]')!;
  const wash = document.createElement("img");
  wash.className = "story-tear-wash";
  wash.src = tear.querySelector<HTMLImageElement>(".story-backdrop")!.src;
  const sprite = document.createElement("div");
  sprite.className = "story-tear-sprite";
  const bounds = ["left", "top", "width", "height"] as const;
  const outlineBounds = bounds.map((key) => parseFloat(outline.style[key]));
  images.forEach((image) => {
    const copy = document.createElement("img");
    copy.src = image.src;
    const b = bounds.map((key) => parseFloat(image.style[key]));
    Object.assign(copy.style, {
      left: `${((b[0] - outlineBounds[0]) / outlineBounds[2]) * 100}%`,
      top: `${((b[1] - outlineBounds[1]) / outlineBounds[3]) * 100}%`,
      width: `${(b[2] / outlineBounds[2]) * 100}%`,
      height: `${(b[3] / outlineBounds[3]) * 100}%`,
    });
    sprite.append(copy);
  });
  const bead = document.createElement("img");
  bead.src = patientTeardrop;
  bead.alt = "";
  bead.decoding = "async";
  bead.classList.add("story-tear-bead");
  frame.append(room, wash, bead, sprite);
  root.append(frame);

  let disposed = false;
  const artwork = [
    patient as HTMLImageElement,
    bead,
    outline,
    ...sprite.querySelectorAll<HTMLImageElement>("img"),
  ];
  const artworkKey = JSON.stringify(artwork.map((image) => image.src));
  let artworkReady = decodedArtwork.get(outline) === artworkKey;
  let paintedPass: boolean | undefined;
  const state = { progress: 0 };
  const measure = () => {
    updateWardInfusionTube(room);
    const source = patient.getBoundingClientRect();
    const destination = outline.getBoundingClientRect();
    return {
      // Match the detached drop's tip to the painted pool below the eye.
      sx:
        source.left +
        (source.width * (DROP.left + DROP.width / 2)) / PATIENT_CANVAS.width,
      sy: source.top + (source.height * DROP.top) / PATIENT_CANVAS.height,
      beadWidth: (source.width * DROP.width) / PATIENT_CANVAS.width,
      beadHeight: (source.height * DROP.height) / PATIENT_CANVAS.height,
      cheekX: source.width * 0.006,
      cheekY: source.height * 0.055,
      releaseDistance: source.height * 0.2,
      dx: destination.left + destination.width / 2,
      dy:
        destination.top -
        stage.getBoundingClientRect().top +
        destination.height / 2,
      width: destination.width,
      height: destination.height,
    };
  };
  let geometry = measure();
  const draw = () => {
    if (disposed || isHomeMotionRefreshing()) return;
    const p = state.progress;
    const active = p > 0 && p < 1;
    boundaryGuard.setActive(active);
    // A late decode must not replace a quiet crossfade with a drop midway
    // through one pass. The next entry can use the fully decoded artwork.
    if (!active) paintedPass = undefined;
    else if (paintedPass === undefined) paintedPass = artworkReady;
    frame.dataset.artworkMode = active
      ? paintedPass ? "painted" : "crossfade"
      : "idle";
    frame.dataset.progress = p.toFixed(3);
    frame.dataset.phase =
      p === 0
        ? "idle"
        : p === 1
          ? "complete"
          : p < 0.2
            ? "gather"
            : p < 0.44
              ? "cheek"
              : p < 0.52
                ? "release"
                : p < 0.94
                  ? "enlarge"
                  : "settle";
    frame.style.visibility = active ? "visible" : "hidden";
    images.forEach((image, index) => {
      image.style.visibility =
        paintedPass && p > 0 && p < 0.94
          ? "hidden"
          : originalVisibility[index];
    });
    if (!active) return;
    const {
      sx,
      sy,
      beadWidth,
      beadHeight,
      cheekX: cheekOffsetX,
      cheekY: cheekOffsetY,
      releaseDistance,
      dx,
      dy,
      width: spriteWidth,
      height: spriteHeight,
    } = geometry;
    const gather = smooth(0.02, 0.2, p);
    // Grow from the tip, retaining the artist's natural size on every screen.
    // Zero endpoint tangents let the cheek and release meet without a snap.
    const slip = smooth(0.2, 0.44, p);
    const gatheredHeight = beadHeight * (0.24 + gather * 0.76);
    const cheekX = sx - slip * cheekOffsetX;
    const cheekY = sy + slip * cheekOffsetY + gatheredHeight / 2;
    // The drop remains small until it has cleared the face. A slow initial
    // release gives way to gravity, before the painted silhouette takes over.
    const travel = smooth(0.44, 0.94, p);
    const remaining = 1 - travel;
    const curve = (start: number, first: number, second: number, end: number) =>
      remaining ** 3 * start +
      3 * remaining ** 2 * travel * first +
      3 * remaining * travel ** 2 * second +
      travel ** 3 * end;
    const startX = sx - cheekOffsetX;
    const startY = sy + cheekOffsetY + beadHeight / 2;
    const x = curve(startX, startX, dx, dx);
    const lower = startY + releaseDistance;
    // Rise toward the final center as growth starts, keeping the enlarged
    // contour inside the viewport after the initial downward release.
    const y = curve(startY, lower, dy, dy);
    const small = beadHeight / Math.max(1, spriteHeight);
    // Give growth most of the detached drop's travel, so a wheel gesture can
    // show intermediate sizes instead of jumping from the bead to the full tear.
    const scale = gsap.utils.interpolate(small, 1, smooth(0.52, 0.94, p));
    // Keep one silhouette through release. The painted drop takes over only
    // after leaving the face, with both shapes sharing a center and height.
    const painted = smooth(0.5, 0.62, p);
    const beadX = p < 0.44 ? cheekX : x;
    const beadY = p < 0.44 ? cheekY : y;
    const visibleHeight = p < 0.44 ? gatheredHeight : spriteHeight * scale;
    const visibleWidth =
      gsap.utils.interpolate(
        beadWidth / beadHeight,
        spriteWidth / spriteHeight,
        painted,
      ) * visibleHeight;
    Object.assign(bead.style, {
      width: `${visibleWidth}px`,
      height: `${visibleHeight}px`,
      opacity: String(paintedPass ? smooth(0.02, 0.12, p) * (1 - painted) : 0),
      transform: `translate(${beadX - visibleWidth / 2}px, ${beadY - visibleHeight / 2}px) rotate(${-slip * 4 * (1 - painted)}deg)`,
    });
    Object.assign(sprite.style, {
      width: `${spriteWidth}px`,
      height: `${spriteHeight}px`,
      opacity: String(paintedPass ? painted : 0),
      transform: `translate(${x - spriteWidth / 2}px, ${y - spriteHeight / 2}px) scale(${scale})`,
    });
    // A quiet fallback must respond from entry, even before the drop decodes.
    const roomFade = smooth(paintedPass ? 0.56 : 0, 0.9, p);
    frame.style.backgroundColor = backgroundColor(
      smooth(paintedPass ? 0.54 : 0, 0.9, p),
    );
    frame.style.opacity = String(1 - smooth(paintedPass ? 0.94 : 0.8, 1, p));
    room.style.opacity = String(1 - roomFade);
    wash.style.opacity = String(roomFade);
  };
  const boundaryGuard = createHomeScrubBoundaryGuard(
    () => timeline.scrollTrigger,
    draw,
  );
  const timeline = gsap.timeline({
    scrollTrigger: {
      id: "home-ward-tear-carry",
      trigger: tear,
      start: () => from.end - window.innerHeight * WARD_TEAR_LEAD,
      // Finish while the illustration is still sticky, leaving a reading pause.
      end: () =>
        to.start +
        Math.max(1, stage.parentElement!.offsetHeight - stage.offsetHeight) *
          0.17,
      scrub: compact ? 0.18 : BRIDGE_SCRUB,
      invalidateOnRefresh: true,
      onUpdate: settleHomeScrubEndpoint,
    },
  });
  timeline.fromTo(
    state,
    { progress: 0 },
    { progress: 1, duration: 1, ease: "none", onUpdate: draw },
  );
  const refresh = () => {
    geometry = measure();
    const trigger = timeline.scrollTrigger!;
    frame.dataset.scrollStart = String(trigger.start);
    frame.dataset.scrollEnd = String(trigger.end);
    settleHomeScrubEndpoint(trigger);
    draw();
  };
  // A clone created after page load still needs its own image-load measurement.
  roomBackdrop.addEventListener("load", refresh);
  // Newly cloned/cropped artwork may finish decoding after the first refresh.
  const preparation = Promise.all(artwork.map((image) => image.decode()))
    .then(() => {
      if (!disposed) {
        decodedArtwork.set(outline, artworkKey);
        artworkReady = true;
        refresh();
      }
    })
    .catch(() => {});
  const releasePreparation = trackPagePreparation(preparation);
  ScrollTrigger.addEventListener("refresh", refresh);
  refresh();
  draw();
  return () => {
    disposed = true;
    releasePreparation();
    boundaryGuard.dispose();
    roomBackdrop.removeEventListener("load", refresh);
    ScrollTrigger.removeEventListener("refresh", refresh);
    timeline.scrollTrigger?.kill();
    timeline.kill();
    images.forEach(
      (image, index) => (image.style.visibility = originalVisibility[index]),
    );
    frame.remove();
  };
}
