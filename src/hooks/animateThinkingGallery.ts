import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  HOME_EASE,
  createHomeScrubBoundaryGuard,
  isHomeMotionRefreshing,
  settleHomeScrubEndpoint,
} from "./homeMotion";
import {
  createThinkingGalleryMagnifier,
  THINKING_MAGNIFIER_CROP,
} from "./createThinkingGalleryInk";
import "../styles/home-thinking-gallery.css";
import { clinicalGalleryLead } from "./animateClinicalSequence";

const smooth = (start: number, end: number, value: number) => {
  const t = gsap.utils.clamp(0, 1, (value - start) / (end - start));
  return t * t * (3 - 2 * t);
};

/** Carry the intact magnifier to the choices title, in either scroll direction. */
export function animateThinkingGallery(
  root: HTMLElement,
  intro: gsap.core.Timeline,
  compact: boolean,
) {
  const source = root.querySelector<HTMLElement>(".story-clinical-stage");
  const destination = root.querySelector<HTMLElement>(
    ".home-molecule-gallery__stage",
  );
  const artwork = destination?.querySelector<HTMLElement>(
    ".home-molecule-gallery__artwork",
  );
  const magnifier = root.querySelector<HTMLImageElement>(
    '#a-new-direction [data-layer="4"]',
  );
  const clinical = ScrollTrigger.getById("home-clinical-sequence");
  if (
    !source ||
    !destination ||
    !artwork ||
    !magnifier ||
    !clinical ||
    !intro.scrollTrigger
  )
    return () => {};

  const wash = document.createElement("div");
  wash.className = "home-thinking-gallery-wash";
  wash.setAttribute("aria-hidden", "true");
  document.body.append(wash);
  const landed = createThinkingGalleryMagnifier(magnifier);
  artwork.prepend(landed);
  const travelling = landed.cloneNode(true) as SVGSVGElement;
  travelling.classList.add("home-thinking-gallery-mark--travelling");
  document.body.append(travelling);
  // This native copy scrolls with the gallery and fades with its title.
  intro.fromTo(
    landed,
    { opacity: 1 },
    { opacity: 0, duration: 0.36, ease: HOME_EASE },
    0.96,
  );
  magnifier.style.setProperty(
    "--thinking-magnifier-cutoff",
    `${(THINKING_MAGNIFIER_CROP.top + THINKING_MAGNIFIER_CROP.height) * 100}%`,
  );
  const state = { progress: 0 };
  let disposed = false;
  let carried = false;
  const boundary = createHomeScrubBoundaryGuard(
    () => ScrollTrigger.getById("home-thinking-gallery-carry"),
    () => draw(),
  );
  const carry = (active: boolean) => {
    if (carried === active) return;
    carried = active;
    source.classList.toggle("is-thinking-gallery-source", active);
    destination.classList.toggle("is-thinking-gallery-target", active);
    if (active) clinical.getTween()?.progress(1);
  };
  const draw = () => {
    if (disposed || isHomeMotionRefreshing()) return;
    const trigger = ScrollTrigger.getById("home-thinking-gallery-carry");
    // Release the overlay immediately when the chapter picker skips this pass.
    if (
      trigger &&
      state.progress > 0 &&
      state.progress < 1 &&
      (trigger.scroll() < trigger.start - window.innerHeight * 0.5 ||
        trigger.scroll() > trigger.end + window.innerHeight * 0.5)
    ) {
      trigger.getTween()?.pause();
      trigger.animation?.progress(trigger.scroll() < trigger.start ? 0 : 1);
      return;
    }
    const p = state.progress;
    const active = p > 0 && p < 1;
    boundary.setActive(active);
    carry(active);
    landed.style.visibility = p >= 1 ? "visible" : "hidden";
    travelling.style.visibility = active ? "visible" : "hidden";
    wash.style.visibility = active ? "visible" : "hidden";
    wash.dataset.progress = p.toFixed(4);
    wash.dataset.phase = p < 0.75 ? "carry" : "choices";
    if (!active) return;

    const box = magnifier.getBoundingClientRect();
    const stage = source.getBoundingClientRect();
    const crop = THINKING_MAGNIFIER_CROP;
    const width = box.width * crop.width || 88;
    const height = (width * 216) / 207;
    const fromLeft = box.width
      ? box.left + crop.left * box.width
      : (window.innerWidth - width) / 2;
    const fromTop = box.height
      ? box.top - stage.top + crop.top * box.height
      : (window.innerHeight - height) / 2;
    const target = landed.getBoundingClientRect();
    const travel = smooth(0.02, 0.75, p);
    gsap.set(travelling, {
      // Resize the SVG viewport so small paintings retain their soft edges.
      autoRound: false,
      x: gsap.utils.interpolate(fromLeft, target.left, travel),
      y: gsap.utils.interpolate(fromTop, target.top, travel),
      width: gsap.utils.interpolate(width, target.width, travel),
      height: gsap.utils.interpolate(height, target.height, travel),
      opacity: box.width ? 1 : smooth(0, 0.16, p),
    });
    const sceneExit = smooth(0, 0.34, p);
    wash.style.opacity = String(sceneExit);
    wash.style.backgroundColor = gsap.utils.interpolate(
      "#f0f3fd",
      "#fff4e2",
      smooth(0.18, 0.72, p),
    );
    source.style.setProperty("--thinking-scene-opacity", String(1 - sceneExit));
    source.style.setProperty(
      "--thinking-cloud-opacity",
      String(1 - smooth(0, 0.12, p)),
    );
    destination.style.setProperty(
      "--thinking-title-opacity",
      String(smooth(0.18, 0.36, p)),
    );
  };
  const bridge = gsap.timeline({
    scrollTrigger: {
      id: "home-thinking-gallery-carry",
      trigger: destination.parentElement!,
      start: () => clinical.end - clinicalGalleryLead(compact),
      end: () => {
        const trigger = intro.scrollTrigger!;
        return (
          trigger.start +
          (trigger.end - trigger.start) *
            (intro.labels["choices-visible"] / intro.duration())
        );
      },
      scrub: 0.2,
      invalidateOnRefresh: true,
      onUpdate: settleHomeScrubEndpoint,
      onRefreshInit: () => {
        boundary.setActive(false);
        carry(false);
        wash.style.visibility = "hidden";
        travelling.style.visibility = "hidden";
      },
    },
  });
  bridge.fromTo(
    state,
    { progress: 0 },
    {
      progress: 1,
      duration: 1,
      ease: "none",
      onUpdate: draw,
    },
  );
  ScrollTrigger.addEventListener("refresh", draw);
  draw();
  return () => {
    disposed = true;
    boundary.dispose();
    ScrollTrigger.removeEventListener("refresh", draw);
    bridge.scrollTrigger?.kill();
    bridge.kill();
    carry(false);
    source.style.removeProperty("--thinking-scene-opacity");
    source.style.removeProperty("--thinking-cloud-opacity");
    destination.style.removeProperty("--thinking-title-opacity");
    magnifier.style.removeProperty("--thinking-magnifier-cutoff");
    landed.remove();
    travelling.remove();
    wash.remove();
  };
}
