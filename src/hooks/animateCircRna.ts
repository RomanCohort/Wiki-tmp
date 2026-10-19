import gsap from "gsap";
import { HOME_EASE } from "./homeMotion";

// The gallery carries a complete ring here; the remaining artwork follows it.
export function animateCircRna(
  section: HTMLElement,
  timeline: gsap.core.Timeline,
) {
  const find = (selector: string) => section.querySelector(selector);
  const stroke = find(".story-paint-stroke");
  const complete = find(".story-paint-complete");
  gsap.set(stroke, {
    attr: { "stroke-dasharray": "1 1", "stroke-dashoffset": 0 },
  });
  gsap.set(complete, { opacity: 1 });
  timeline.fromTo(
    find(".story-backdrop"),
    { opacity: 0 },
    { opacity: 1, duration: 0.38, ease: HOME_EASE },
    0,
  );
  timeline.fromTo(
    find('[data-layer="2"]'),
    { opacity: 0, y: 10 },
    { opacity: 1, y: 0, duration: 0.32, ease: HOME_EASE },
    0.02,
  );
  timeline.fromTo(
    find('[data-layer="3"]'),
    { opacity: 0 },
    { opacity: 1, duration: 0.35, ease: HOME_EASE },
    0.38,
  );
  const sketches = section.querySelectorAll("[data-circrna-sketch]");
  // Initialize both sketches together so the later one never flashes on entry.
  gsap.set(sketches, { autoAlpha: 0, y: 10 });
  sketches.forEach((sketch, index) => {
    const at = 0.6 + index * 0.6;
    timeline.to(
      sketch,
      { autoAlpha: 1, y: 0, duration: 0.42, ease: HOME_EASE },
      at,
    );
    timeline.addLabel(
      index === 0 ? "stability-readable" : "expression-readable",
      at + 0.42,
    );
  });
  timeline.fromTo(
    find(".circrna-caption"),
    { opacity: 0, y: 10, filter: "blur(2px)" },
    {
      opacity: 0.75,
      y: 0,
      filter: "blur(0px)",
      duration: 0.24,
      ease: HOME_EASE,
    },
    1.68,
  );
}
