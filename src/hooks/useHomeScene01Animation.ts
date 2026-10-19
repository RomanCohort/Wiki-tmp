import { type RefObject } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HOME_EASE, HOME_REST_RATIO, settleHomeScrubEndpoint } from "./homeMotion";

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface HomeScene01AnimationRefs {
  root: RefObject<HTMLDivElement | null>;
  scene: RefObject<HTMLElement | null>;
}

// Each paper plane shares the artist's canvas but moves independently. Labels
// live inside their own plane; the foreground person is separate from its frame.
const DEPTHS = [
  { key: "anxiety", x: 0, y: -66, at: 0 },
  { key: "surgery", x: -72, y: -26, at: 0.04 },
  { key: "hair-loss", x: 72, y: -26, at: 0.08 },
  { key: "chemotherapy", x: -58, y: 50, at: 0.12 },
  { key: "death-rate", x: 58, y: 50, at: 0.16 },
] as const;

// Keep the opening responsive; the prologue text shares the reading hold.
const SCENE01_SCRUB = 0.2;
const SCENE01_REST_RATIO = HOME_REST_RATIO;
// Keep the paper, labels and ribbon fixed behind the approaching person.
// Fit a verified solid-ink rectangle inside the original 4000 × 2250 drawing.
// The head's outer bounds still contain purple contours at close-up scale.
const PERSON_FOCUS = { x: 0.465, y: 0.345 };
const HEAD_INK_SIZE = { width: 160 / 4000, height: 280 / 2250 };
const CLOSEUP_MARGIN = 1.12;
const APPROACH_START = 0.8;
const APPROACH_DURATION = 1.1;
const APPROACH_END = APPROACH_START + APPROACH_DURATION;
const CLOSEUP_HOLD = 0.1;
const DARK_START = APPROACH_END + CLOSEUP_HOLD;
const DARK_DURATION = 0.18;
const DARK_END = DARK_START + DARK_DURATION;
const PROLOGUE_START = DARK_END + 0.08;

export function useHomeScene01Animation({
  root,
  scene,
}: HomeScene01AnimationRefs) {
  useGSAP(
    () => {
      const section = scene.current;
      if (!section) return;
      const stage = section.querySelector<HTMLElement>(".scene01-stage");
      const canvas = section.querySelector<HTMLElement>(".home-scene01-canvas");
      const person = section.querySelector<HTMLElement>(".scene01-person");
      const portrait = section.querySelector<HTMLElement>(".scene01-portrait");
      if (!stage || !canvas || !person || !portrait) return;
      gsap.set(section, { "--scene01-scroll-scale": 1 + SCENE01_REST_RATIO });
      const media = gsap.matchMedia();

      const buildTimeline = (compact: boolean) => {
        const select = gsap.utils.selector(section);
        const distance = compact ? 0.58 : 1;
        const restRatio = SCENE01_REST_RATIO;
        section.classList.add("has-scene01-motion");
        // Layout offsets remain valid during refresh even when the current
        // frame is transformed; phones use a wider portrait than the stage.
        const focusOffset = () => ({
          x:
            stage.offsetWidth * 0.5 -
            portrait.offsetLeft -
            person.offsetLeft -
            person.offsetWidth * PERSON_FOCUS.x,
          y:
            stage.offsetHeight * 0.5 -
            portrait.offsetTop -
            person.offsetTop -
            person.offsetHeight * PERSON_FOCUS.y,
        });

        let closeupScale = 1;
        const approachEase = gsap.parseEase("sine.inOut");
        const timeline = gsap.timeline({
          defaults: { ease: HOME_EASE },
          scrollTrigger: {
            id: "home-person-transition",
            trigger: section,
            start: () =>
              `top top+=${Number.parseFloat(getComputedStyle(canvas).top) || 0}`,
            end: () =>
              `+=${Math.max(1, section.offsetHeight - canvas.offsetHeight)}`,
            scrub: SCENE01_SCRUB,
            invalidateOnRefresh: true,
            onUpdate: settleHomeScrubEndpoint,
          },
        });

        // HomeIntro owns the outer portrait wrapper. Animate its inner person
        // only, so the intro and the scroll timeline never share a transform.
        DEPTHS.forEach(({ key, x, y, at }) => {
          timeline.fromTo(
            select(`.scene01-orbit--${key}`),
            {
              x: x * distance,
              y: y * distance,
              scale: 0.975,
              opacity: 0,
            },
            {
              x: 0,
              y: 0,
              scale: 1,
              opacity: 1,
              duration: 0.35,
            },
            at,
          );
          timeline.fromTo(
            select(`.scene01-label--${key}`),
            { opacity: 0 },
            { opacity: 1, duration: 0.22 },
            at + 0.18,
          );
        });

        timeline.addLabel("portrait-approach", APPROACH_START);
        timeline.addLabel("portrait-closeup", APPROACH_END);
        timeline.addLabel("portrait-darken", DARK_START);
        timeline.addLabel("portrait-reading", PROLOGUE_START);

        // Continue through the purple contour until solid ink fills the whole
        // viewport. The same source rectangle covers wide and tall screens.
        timeline.fromTo(
          select(".scene01-person"),
          {
            scale: 1,
            x: 0,
            y: 0,
            force3D: false,
            transformOrigin: `${PERSON_FOCUS.x * 100}% ${PERSON_FOCUS.y * 100}%`,
          },
          {
            scale: () => {
              closeupScale = Math.max(
                canvas.offsetWidth / (person.offsetWidth * HEAD_INK_SIZE.width),
                canvas.offsetHeight / (person.offsetHeight * HEAD_INK_SIZE.height),
              ) * CLOSEUP_MARGIN;
              return closeupScale;
            },
            duration: APPROACH_DURATION,
            // Equal relative magnification feels like a steady camera approach.
            ease: (progress: number) =>
              closeupScale > 1
                ? Math.expm1(Math.log(closeupScale) * approachEase(progress)) /
                  (closeupScale - 1)
                : approachEase(progress),
          },
          APPROACH_START,
        );
        timeline.fromTo(
          person,
          { x: 0, y: 0 },
          {
            x: () => focusOffset().x,
            y: () => focusOffset().y,
            duration: APPROACH_DURATION,
            ease: "power2.inOut",
          },
          APPROACH_START,
        );
        // Keep the person opaque throughout the impact. A separate viewport
        // layer takes over late, using the pigment inside the painted head.
        timeline.fromTo(
          select(".scene01-head-darkness"),
          { opacity: 0 },
          { opacity: 1, duration: DARK_DURATION, ease: "power2.inOut" },
          DARK_START,
        );
        timeline.set(stage, { autoAlpha: 0 }, DARK_END);
        timeline.fromTo(
          select(".scene01-prologue"),
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 0.16 },
          PROLOGUE_START,
        );
        timeline.fromTo(
          select(".story-prologue-line"),
          { opacity: 0, y: compact ? 6 : 8 },
          { opacity: 1, y: 0, duration: 0.5 },
          PROLOGUE_START,
        );
        timeline.fromTo(
          select(".scene01-prologue button"),
          { autoAlpha: 0, y: 8 },
          { autoAlpha: 1, y: 0, duration: 0.35 },
          PROLOGUE_START + 0.4,
        );
        timeline.to({}, { duration: timeline.duration() * restRatio });

        return () => section.classList.remove("has-scene01-motion");
      };

      media.add(
        "(prefers-reduced-motion: no-preference) and (min-width: 801px)",
        () => buildTimeline(false),
      );
      media.add(
        "(prefers-reduced-motion: no-preference) and (max-width: 800px)",
        () => buildTimeline(true),
      );
      return () => media.revert();
    },
    { scope: root },
  );
}
