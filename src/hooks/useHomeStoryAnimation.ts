import { type RefObject } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import {
  HOME_EASE,
  HOME_SCRUB,
  HOME_STILL_RATIO,
  stillHold,
  settleHomeScrubEndpoint,
} from "./homeMotion";
import { animateCircRnaSequence } from "./animateCircRnaSequence";
import { animateHomeReading } from "./animateHomeReading";
import { animateChallengeMorph } from "./animateChallengeMorph";
import { animateTear } from "./animateHomeSupplements";
import { animateWardTear, WARD_TEAR_LEAD } from "./animateWardTear";
import { animateTearCloud, TEAR_CLOUD_LEAD } from "./animateTearCloud";
import { animateFinaleExplore } from "./animateFinaleExplore";
import {
  animateClinicalSequence,
  CLINICAL_ILLUSTRATION_HOLD,
  CLINICAL_QUESTION_HOLD,
} from "./animateClinicalSequence";
import { animateGalleryWhy } from "./animateGalleryWhy";
import { animateTnbcBridge } from "./animateTnbcBridge";
import { animateHopeHandoff } from "./animateHopeHandoff";
import { updateWardInfusionTube } from "./wardInfusionGeometry";
import { registerPagePreparation } from "../utils/pageLoader";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

const ART_REVEAL_DURATION = 0.28;
const ARTWORK_START = 0.06;
// Timeline units covered by the map's unscaled scroll track. Keep this fixed
// when extending its gathering phase so the earlier entrances keep their pace.
const MAP_SCROLL_UNITS = 1.52;
const ART_REST_RATIO = HOME_STILL_RATIO;
// Chapters whose outgoing bridge starts while the chapter is still sticky.
const BRIDGE_LEADS: Record<string, number> = {
  "what-we-saw": WARD_TEAR_LEAD,
  "what-stayed-with-us": TEAR_CLOUD_LEAD,
};

declare global {
  interface Window {
    __homeMotion?: {
      seek: (id: string, progress: number) => void;
      state: () => { id: string; progress: number }[];
    };
  }
}

function choreographArt(
  section: HTMLElement,
  timeline: gsap.core.Timeline,
  compact: boolean,
  splits: ReturnType<typeof SplitText.create>[],
  cleanups: (() => void)[],
) {
  const distance = compact ? 0.64 : 1;
  const layer = (number: number) =>
    section.querySelector<HTMLElement>(`[data-layer="${number}"]`);
  const scaled = (vars: gsap.TweenVars) => {
    const result = { ...vars };
    if (typeof result.x === "number") result.x *= distance;
    if (typeof result.y === "number") result.y *= distance;
    if (typeof result.xPercent === "number") result.xPercent *= distance;
    if (typeof result.yPercent === "number") result.yPercent *= distance;
    return result;
  };
  const move = (
    number: number,
    from: gsap.TweenVars,
    to: gsap.TweenVars,
    at = 0,
    duration = 1,
    ease = "none",
  ) => {
    const target = layer(number);
    if (!target) return;
    timeline.fromTo(
      target,
      scaled(from),
      { ...scaled(to), duration, ease },
      at,
    );
  };
  const arrive = (
    number: number,
    at: number,
    from: gsap.TweenVars = {},
    duration = 0.3,
    to: gsap.TweenVars = {},
  ) =>
    move(
      number,
      { opacity: 0.72, ...from },
      { opacity: 1, x: 0, y: 0, scale: 1, rotation: 0, ...to },
      at,
      duration,
      HOME_EASE,
    );
  const camera = (
    from: gsap.TweenVars = { scale: 1.035 },
    to: gsap.TweenVars = { scale: 1.01 },
  ) => {
    const background = section.querySelector<HTMLElement>(".story-backdrop");
    if (background) {
      timeline.fromTo(background, scaled(from), {
        ...scaled(to),
        duration: 1,
        ease: "none",
      });
    }
  };
  // DUPLICATE: animateCircRna.ts repeats this draw pattern for scene 1.
  const paint = (kind: "arrow", at: number, duration: number) => {
    const stroke = section.querySelector(
      `.story-painted--${kind} .story-paint-stroke`,
    );
    const complete = section.querySelector(
      `.story-painted--${kind} .story-paint-complete`,
    );
    const image = section.querySelector(`.story-painted--${kind} image`);
    if (!stroke || !complete || !image) return;
    gsap.set(stroke, {
      attr: { "stroke-dasharray": "1 1", "stroke-dashoffset": 1 },
    });
    gsap.set(complete, { opacity: 0 });
    timeline.to(
      stroke,
      { attr: { "stroke-dashoffset": 0 }, duration, ease: "sine.inOut" },
      at,
    );
    timeline.to(
      complete,
      { opacity: 1, duration: 0.12, ease: "sine.inOut" },
      at + duration - 0.1,
    );
  };

  switch (section.id) {
    case "what-stayed-with-us":
      animateTear(section, timeline, compact, splits, cleanups);
      break;
    case "what-we-saw": {
      const ward = (name: string) =>
        section.querySelector<HTMLElement>(`[data-ward="${name}"]`);
      const tube = (name: string) =>
        section.querySelector<SVGSVGElement>(`[data-ward-tube="${name}"]`);
      timeline.eventCallback("onUpdate", () => updateWardInfusionTube(section));
      camera({ scale: 1.02 }, { scale: 1.005 });
      // The clinician faces right, so she approaches from the left.
      timeline.fromTo(
        ward("original-3"),
        { x: -36 * distance },
        { x: 0, duration: 0.34, ease: HOME_EASE },
        0.04,
      );
      [
        ["original-2", "patient", 0.42],
        ["original-3", "clinician", 0.64],
      ].forEach(([before, after, at]) => {
        timeline.to(
          ward(String(before)),
          { opacity: 0, duration: 0.18, ease: HOME_EASE },
          Number(at),
        );
        timeline.fromTo(
          ward(String(after)),
          { opacity: 0, y: 5 * distance },
          { opacity: 1, y: 0, duration: 0.2, ease: HOME_EASE },
          Number(at),
        );
      });
      timeline.to(tube("original-2"), { opacity: 0, duration: 0.18, ease: HOME_EASE }, 0.42);
      timeline.fromTo(tube("patient"), { opacity: 0 }, { opacity: 1, duration: 0.2, ease: HOME_EASE }, 0.42);
      timeline.fromTo(
        ward("question"),
        { opacity: 0, scale: 0.94, y: 8 * distance },
        { opacity: 1, scale: 1, y: 0, duration: 0.22, ease: HOME_EASE },
        0.82,
      );
      timeline.fromTo(
        ward("ellipsis"),
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.13, ease: HOME_EASE },
        0.89,
      );
      break;
    }
    case "why-tnbc": {
      const gatherStart = 0.76;
      const gatherDuration = 0.7;
      // Let the upper cards clear the headline before asking readers to follow it.
      const headlineStart = gatherStart + gatherDuration * 0.58;
      timeline.addLabel("map-gather-start", gatherStart);
      timeline.addLabel("map-gathered", gatherStart + gatherDuration);
      camera({ scale: 1.018 }, { scale: 1.006 });
      const visual = section.querySelector<HTMLElement>(".story-visual")!;
      const illustration = section.querySelector(".tnbc-map-illustration");
      const mapCopy = section.querySelector(".tnbc-map-copy");
      // The carry reveal owns opacity; keep this timeline's gate independent.
      gsap.set(mapCopy, { visibility: "hidden" });
      section.querySelectorAll("[data-map-marker]").forEach((marker, index) => {
        timeline.fromTo(
          marker,
          { opacity: 0, scale: 0.65, y: -24 * distance },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.15,
            ease: "sine.out",
          },
          0.06 + index * 0.075,
        );
      });
      const notes = section.querySelectorAll<HTMLElement>("[data-map-note]");
      if (notes.length) {
        let noteTargets: { x: number; y: number; scale: number }[] = [];
        const measureNotes = () => {
          const portrait = window.matchMedia(
            "(max-width: 800px) and (orientation: portrait)",
          ).matches;
          const width = visual.clientWidth;
          const height = visual.clientHeight;
          const boxes = Array.from(notes, (note) => ({
            left: note.offsetLeft,
            top: note.offsetTop,
            width: note.offsetWidth,
            height: note.offsetHeight,
          }));
          const scale = portrait
            ? Math.min(1.06, (width / 2 - 24) / boxes[0].width)
            : Math.min(1.18, (width * 0.92 - 48) / (boxes[0].width * 4));
          noteTargets = boxes.map((box, index) => ({
            x: (portrait
              ? width * (index % 2 ? 0.75 : 0.25)
              : width / 2 + (index - 1.5) * (box.width * scale + 16)) -
              box.left - box.width / 2,
            y: height * (portrait ? 0.53 + Math.floor(index / 2) * 0.23 : 0.67) -
              box.top - box.height / 2,
            scale,
          }));
        };
        // Read layout together before rendering, never between card writes.
        // Refresh keeps the cached destinations current after fonts or resize.
        measureNotes();
        ScrollTrigger.addEventListener("refreshInit", measureNotes);
        cleanups.push(() =>
          ScrollTrigger.removeEventListener("refreshInit", measureNotes),
        );
        gsap.set(notes, { force3D: true });
        timeline.fromTo(
          notes,
          { opacity: 0, scale: 0.82, y: -14 * distance, rotate: -2 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            rotate: 0,
            duration: 0.18,
            stagger: 0.07,
            ease: "sine.out",
          },
          0.16,
        );
        notes.forEach((note, index) => {
          timeline.to(
            note,
            {
              x: () => noteTargets[index].x,
              y: () => noteTargets[index].y,
              scale: () => noteTargets[index].scale,
              duration: gatherDuration,
              ease: HOME_EASE,
            },
            gatherStart,
          );
        });
        timeline.to(
          section.querySelectorAll(".tnbc-map-note-val"),
          { scale: 1.1, duration: 0.6, ease: HOME_EASE },
          gatherStart + 0.075,
        );
      }
      timeline.to(
        illustration,
        { opacity: 0.14, duration: 0.66, ease: HOME_EASE },
        gatherStart,
      );
      timeline.set(mapCopy, { visibility: "inherit" }, gatherStart);
      section
        .querySelectorAll<HTMLElement>("[data-map-copy]")
        .forEach((element, index) => {
          timeline.fromTo(
            element,
            { opacity: 0, y: 16 * distance },
            { opacity: 1, y: 0, duration: 0.2, ease: HOME_EASE },
            headlineStart + index * 0.045,
          );
        });
      break;
    }
    case "clinical-challenge": {
      camera({ scale: 1.02 }, { scale: 1.008 });
      move(
        2,
        { opacity: 0.88, scale: 0.995 },
        { opacity: 1, scale: 1 },
        0,
        0.17,
        HOME_EASE,
      );
      move(
        4,
        { x: -8, opacity: 0.85 },
        { x: 0, opacity: 1 },
        0,
        0.22,
        HOME_EASE,
      );
      timeline.addLabel("nurse-visible", 0.22);
      const morph = gsap.timeline();
      cleanups.push(animateChallengeMorph(section, morph, compact));
      timeline.add(morph, CLINICAL_ILLUSTRATION_HOLD);
      arrive(
        3,
        CLINICAL_ILLUSTRATION_HOLD + 0.82,
        { scale: 0.9, opacity: 0 },
        0.13,
      );
      break;
    }
    case "a-new-direction": {
      // The shared clinical stage owns the board and the doctor. Keep the
      // explanation intact while the surrounding illustrations settle in.
      arrive(4, 0.08, { x: -8, opacity: 0 }, 0.3);
      arrive(9, 0.04, { opacity: 0 }, 0.2);
      arrive(10, 0.52 + CLINICAL_QUESTION_HOLD, { opacity: 0 }, 0.2);
      const question = section.querySelector<HTMLElement>(
        '[data-vaccine-copy="question"] h3',
      )!;
      const answer = section.querySelector<HTMLElement>(
        '[data-vaccine-copy="answer"] h3',
      )!;
      timeline.fromTo(
        question,
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 0.26, ease: HOME_EASE },
        0.04,
      );
      timeline.addLabel("vaccine-question-readable", 0.3 + CLINICAL_QUESTION_HOLD * 0.5);
      arrive(8, 0.18, { y: 8, scale: 0.88, opacity: 0 }, 0.2);
      arrive(6, 0.34 + CLINICAL_QUESTION_HOLD, { opacity: 0 }, 0.12);
      paint("arrow", 0.36 + CLINICAL_QUESTION_HOLD, 0.24);
      arrive(3, 0.52 + CLINICAL_QUESTION_HOLD, { x: 8, scale: 0.98, opacity: 0 }, 0.26);
      arrive(7, 0.56 + CLINICAL_QUESTION_HOLD, { y: 8, scale: 0.86, opacity: 0 }, 0.18);
      timeline.fromTo(
        answer,
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 0.3, ease: HOME_EASE },
        0.6 + CLINICAL_QUESTION_HOLD,
      );
      break;
    }
    case "plug-and-play":
      // Keep the drag surface still; antigen changes belong to the reader.
      break;
    case "what-we-hope": {
      camera({ scale: 1.025 }, { scale: 1.005 });
      arrive(2, 0.02, { x: -12, y: 8, opacity: 0 }, 0.32);
      arrive(3, 0.1, { x: -8, y: 6, opacity: 0 }, 0.32);
      const copyStart = 0.68;
      const copyInterval = 0.18;
      const copyDuration = 0.24;
      const copy = section.querySelector<HTMLElement>(".story-hope-copy");
      if (copy) {
        // Reveal the reading wash and question with the same timing and ease.
        timeline.fromTo(
          copy,
          { "--hope-wash-opacity": 0 },
          { "--hope-wash-opacity": 1, duration: copyDuration, ease: HOME_EASE },
          copyStart,
        );
        timeline.addLabel("hope-wash-visible", copyStart + copyDuration);
      }
      const copyParts = section.querySelectorAll<HTMLElement>("[data-hope-copy]");
      copyParts.forEach((part, index) => {
        timeline.fromTo(
          part,
          { autoAlpha: 0, y: compact ? 6 : 10 },
          { autoAlpha: 1, y: 0, duration: copyDuration, ease: HOME_EASE },
          copyStart + index * copyInterval,
        );
      });
      if (copy && copyParts.length) {
        const copyComplete = copyStart + (copyParts.length - 1) * copyInterval + copyDuration;
        timeline.addLabel("hope-copy-visible", copyComplete);
      }
      break;
    }
    case "beyond-tnbc":
      camera({ scale: 1.025, xPercent: -0.2 }, { scale: 1.006, xPercent: 0 });
      move(
        3,
        { x: -10, y: 0, scale: 1, opacity: 0.55 },
        { x: 0, y: 0, scale: 1, opacity: 1 },
        0.03,
        0.72,
        HOME_EASE,
      );
      move(
        2,
        { x: 18, y: 0, opacity: 0.35 },
        { x: 0, y: 0, opacity: 1 },
        0.2,
        0.6,
        HOME_EASE,
      );
      timeline.fromTo(
        section.querySelector<HTMLElement>(".story-beyond-glow")!,
        { autoAlpha: 0 },
        { autoAlpha: 0.32, duration: 0.55, ease: "sine.inOut" },
        0.16,
      );
      section
        .querySelectorAll<HTMLElement>(".story-beyond-ink")
        .forEach((line, index) => {
          timeline.fromTo(
            line,
            { autoAlpha: 0 },
            {
              autoAlpha: 1,
              duration: 0.48,
              ease: "sine.inOut",
            },
            0.25 + index * 0.04,
          );
        });
      break;
  }

  // Normalize the choreography; the parent reserves the completed-frame hold.
  timeline.to({}, { duration: 0.04 }, 0.96);
}

export function useHomeStoryAnimation(root: RefObject<HTMLDivElement | null>) {
  useGSAP(
    () => {
      gsap.set(root.current, { "--home-scroll-scale": 1 + ART_REST_RATIO });
      let media = gsap.matchMedia();
      let galleryResizeProgress: number | undefined;
      const antigenFlow = window.matchMedia(
        "(max-width: 800px) and (orientation: portrait), (max-height: 650px) and (orientation: landscape), (prefers-reduced-motion: reduce)",
      );
      type ResizePosition = {
        id: string;
        progress: number;
        antigenFlow?: boolean;
        antigenMechanism?: boolean;
      };
      let resizePosition: ResizePosition | undefined;
      const primaryIds = new Set([
        "home-person-transition",
        "home-ward-tear-carry", "home-tear-cloud-carry", "home-tnbc-copy-bridge",
        "home-why-tnbc-reading",
        "home-clinical-sequence", "home-thinking-gallery-carry", "home-molecule-gallery-intro", "home-gallery-why-ring",
        "home-circrna-platform", "home-platform-antigen-carry",
        "home-antigen-overview-transition", "home-antigen-overview-fade",
        "home-antigen-mechanism-entry",
      ]);
      const activeTrigger = () => {
        const reading = ScrollTrigger.getById("home-why-tnbc-reading");
        const animation = reading?.animation as gsap.core.Timeline | undefined;
        // On tall screens the clinic enters below the still-unfolding copy.
        // Preserve the reading beat during a resize until its conclusion lands.
        if (reading?.isActive && animation &&
            animation.time() < animation.labels["reading-complete"]) return reading;
        return ScrollTrigger.getAll().filter(
          (trigger) =>
            trigger.isActive &&
            (primaryIds.has(trigger.vars.id || "") ||
              (trigger.vars.id?.startsWith("home-") &&
                ((trigger.vars.id.endsWith("-reading") && trigger.pin) ||
                  trigger.vars.id.endsWith("-art")))),
        ).sort((a, b) =>
          // This bridge remains foreground while the gallery intro overlaps.
          Number(b.vars.id === "home-thinking-gallery-carry") -
          Number(a.vars.id === "home-thinking-gallery-carry") ||
          // A tall earlier chapter can remain active behind the foreground
          // scene. Prefer the latest start, then its bridge on equal bounds.
          b.start - a.start ||
          Number(primaryIds.has(b.vars.id || "")) - Number(primaryIds.has(a.vars.id || "")),
        )[0];
      };
      const capturePosition = (trigger = activeTrigger()): ResizePosition | undefined => {
        const id = trigger?.vars.id;
        if (!trigger || !id) return;
        if (id === "home-thinking-gallery-carry") {
          const gallery = ScrollTrigger.getById("home-molecule-gallery-intro");
          const intro = gallery?.animation as gsap.core.Timeline | undefined;
          const enter = intro?.labels["choices-enter"];
          // The carry's lead changes on compact layouts. Once cards enter,
          // preserve their own timeline so resizing keeps the same reveal.
          if (gallery && intro && enter !== undefined && intro.time() >= enter) {
            return capturePosition(gallery);
          }
        }
        const position: ResizePosition = { id, progress: trigger.progress };
        if (id === "home-plug-and-play-art" || id.startsWith("home-antigen-")) {
          const entry = ScrollTrigger.getById("home-antigen-mechanism-entry");
          const transition = ScrollTrigger.getById("home-antigen-overview-transition");
          position.antigenFlow = Boolean(entry);
          position.antigenMechanism = entry
            ? window.scrollY >= entry.start
            : (transition?.progress ?? 0) >= 0.9;
        }
        return position;
      };
      const restorePosition = (position: ResizePosition) => {
        let trigger = ScrollTrigger.getById(position.id);
        let top: number | undefined;
        const entry = ScrollTrigger.getById("home-antigen-mechanism-entry");
        if (position.antigenFlow !== undefined &&
          (position.antigenFlow !== antigenFlow.matches || !trigger)) {
          // Flow and overlay layouts have different trigger IDs and ranges.
          // Carry the same view across that boundary rather than its old ratio.
          if (antigenFlow.matches) {
            const chapter = root.current?.querySelector<HTMLElement>("#plug-and-play");
            const view = chapter?.querySelector<HTMLElement>(
              `[data-antigen-view="${position.antigenMechanism ? "mechanism" : "overview"}"]`,
            );
            if (chapter && view) {
              const header = Number.parseFloat(getComputedStyle(chapter)
                .getPropertyValue("--header-height")) || 78;
              top = view.getBoundingClientRect().top + window.scrollY - header;
            }
            trigger = entry;
          } else {
            trigger = ScrollTrigger.getById("home-antigen-overview-transition");
            if (trigger) top = position.antigenMechanism
              ? trigger.end + 1
              : trigger.start;
          }
        } else if (trigger) {
          top = trigger.start + (trigger.end - trigger.start) * position.progress;
        }
        if (top === undefined) return false;
        window.scrollTo({ top, behavior: "instant" });
        ScrollTrigger.update();
        trigger?.getTween()?.progress(1);
        return true;
      };
      const mediaEvents = gsap as typeof gsap & {
        addEventListener: (event: "matchMediaInit" | "matchMedia", callback: () => void) => void;
        removeEventListener: (event: "matchMediaInit" | "matchMedia", callback: () => void) => void;
      };
      const buildTimelines = (compact: boolean) => {
        const timelines = new Map<string, gsap.core.Timeline>();
        const splits: ReturnType<typeof SplitText.create>[] = [];
        const cleanups: (() => void)[] = [];
        let debugMotion: Window["__homeMotion"];
        root.current?.classList.add("has-story-motion");
        const clinicalSequence = root.current?.querySelector<HTMLElement>(
          ".story-clinical-sequence",
        );
        clinicalSequence?.classList.add("has-clinical-transition");
        root.current
          ?.querySelectorAll<HTMLElement>(".story-chapter")
          .forEach((section) => {
            if (section.closest(".story-rna-sequence")) {
              const sequence = section.closest<HTMLElement>(".story-rna-sequence")!;
              if (section.id === "why-circrna") {
                timelines.set("circrna-platform", animateCircRnaSequence(sequence, compact, splits, cleanups));
                cleanups.push(() => {
                  sequence.querySelectorAll(".is-current").forEach((scene) => scene.classList.remove("is-current"));
                });
              }
              return;
            }
            if (section.closest(".has-clinical-transition")) return;
            const stage = section.querySelector<HTMLElement>(
              ".story-chapter-inner",
            );
            const track =
              section.querySelector<HTMLElement>(".story-scene-track");
            const visual = section.querySelector<HTMLElement>(".story-visual");
            if (stage && track && visual) {
              const stackedVaccine =
                compact && section.id === "a-new-direction";
              const stackedAntigen =
                section.id === "plug-and-play" &&
                window.matchMedia(
                  "(max-width: 800px) and (orientation: portrait), (max-height: 650px) and (orientation: landscape)",
                ).matches;
              const flowScene = stackedVaccine || stackedAntigen;
              // Desktop: a bridge leaving this scene early must not eat its
              // still hold, so the track also reserves the bridge's lead.
              // This map already has a dedicated reading handoff. Keep its
              // final statistics briefly still without adding a second pause.
              let restRatio = section.id === "why-tnbc" ? 0.08 : ART_REST_RATIO;
              if (section.id === "why-tnbc") {
                gsap.set(section, { "--home-scroll-scale": 1 + restRatio });
              }
              const lead = BRIDGE_LEADS[section.id];
              if (!compact && lead) {
                const hold = stillHold(
                  track.offsetHeight - stage.offsetHeight,
                  ART_REST_RATIO,
                  window.innerHeight * lead,
                  ART_REST_RATIO,
                );
                restRatio = hold.rest;
                gsap.set(section, {
                  "--home-scroll-scale": (1 + ART_REST_RATIO) * hold.scale,
                });
              }
              const timeline = gsap.timeline({
                defaults: { ease: "none" },
                scrollTrigger: {
                  id: `home-${section.id}-art`,
                  trigger: track,
                  start: () => {
                    if (flowScene) return "top 80%";
                    // Let the people arrive with the room, then begin the
                    // question once the incoming viewport has settled.
                    if (section.id === "what-we-hope") return "top 60%";
                    return `top top+=${Number.parseFloat(getComputedStyle(stage).top) || 0}`;
                  },
                  end: () =>
                    flowScene
                      ? "bottom bottom"
                      : `bottom top+=${stage.offsetHeight + (Number.parseFloat(getComputedStyle(stage).top) || 0)}`,
                  scrub: HOME_SCRUB,
                  invalidateOnRefresh: true,
                  onUpdate: settleHomeScrubEndpoint,
                  // CROSS-FILE: home-antigen-switch.css reads .is-current.
                  onToggle: ({ isActive }) =>
                    section.classList.toggle("is-current", isActive),
                },
              });
              // Keep the illustration visible on entry; the layer choreography
              // begins while its contrast is still settling.
              timeline.fromTo(
                visual,
                { opacity: 0.86 },
                {
                  opacity: 1,
                  duration: ART_REVEAL_DURATION,
                  ease: "sine.inOut",
                },
                0,
              );
              const artworkTimeline = gsap.timeline({
                defaults: { ease: "none" },
              });
              choreographArt(
                section,
                artworkTimeline,
                compact,
                splits,
                cleanups,
              );
              // The cloud bridge already masks the arriving map. Start its
              // marks immediately instead of reserving a second empty lead-in.
              // Scale with the artwork duration so a longer gathering phase
              // gains scroll distance without speeding up the earlier marks.
              if (section.id === "why-tnbc") {
                const artDuration = artworkTimeline.duration();
                gsap.set(section, {
                  "--home-scroll-scale":
                    (1 + restRatio) * (artDuration + ARTWORK_START) /
                    MAP_SCROLL_UNITS,
                });
              }
              timeline.add(
                artworkTimeline,
                ARTWORK_START,
              );
              if (section.id === "what-we-hope") {
                timeline.addLabel("hope-readable", ARTWORK_START + artworkTimeline.duration());
              }

              if (stackedVaccine) {
                // This mobile composition is taller than the viewport. Let it
                // scroll through, then hold its fully revealed ending in view.
                ScrollTrigger.create({
                  id: `home-${section.id}-hold`,
                  trigger: stage,
                  start: "bottom bottom",
                  end: () => `+=${Math.round(window.innerHeight * 0.45)}`,
                  pin: true,
                });
              } else if (!stackedAntigen) {
                timeline.to(
                  {},
                  {
                    duration: timeline.duration() * restRatio,
                  },
                );
              }
              timelines.set(section.id, timeline);
            }

            const copy = section.querySelector<HTMLElement>(".story-copy");
            if (copy) {
              timelines.set(
                `${section.id}-reading`,
                animateHomeReading(copy, section, compact, splits, cleanups),
              );
            }
          });

        if (root.current) animateHopeHandoff(root.current);

        const tnbc = root.current?.querySelector<HTMLElement>("#why-tnbc");
        if (tnbc) {
          const bridge = animateTnbcBridge(tnbc);
          timelines.set("tnbc-copy-bridge", bridge.timeline);
          cleanups.push(bridge.cleanup);
        }

        if (root.current && clinicalSequence) {
          const challenge = clinicalSequence.querySelector<HTMLElement>(
            "#clinical-challenge",
          )!;
          const vaccine = clinicalSequence.querySelector<HTMLElement>(
            "#a-new-direction",
          )!;
          const challengeArt = gsap.timeline();
          const vaccineArt = gsap.timeline();
          choreographArt(challenge, challengeArt, compact, splits, cleanups);
          choreographArt(vaccine, vaccineArt, compact, splits, cleanups);
          const clinical = animateClinicalSequence(
            root.current,
            challengeArt,
            vaccineArt,
            compact,
          );
          timelines.set("clinical-sequence", clinical.timeline);
          cleanups.push(clinical.cleanup);
        }

        if (root.current) {
          cleanups.push(animateGalleryWhy(root.current, compact));
          const rememberGalleryPosition = () => {
            if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
              galleryResizeProgress = undefined;
              resizePosition = undefined;
              if (root.current) delete root.current.dataset.galleryBridgeProgress;
              return;
            }
            const selected = activeTrigger();
            if (resizePosition === undefined && selected) {
              resizePosition = capturePosition(selected);
            }
            const progress = Number.parseFloat(
              document.querySelector<HTMLElement>(".home-gallery-ring-transfer")
                ?.dataset.progress ?? "",
            );
            if (progress > 0 && progress < 1) {
              galleryResizeProgress = progress;
              if (root.current) root.current.dataset.galleryBridgeProgress = String(progress);
            }
          };
          const resumeGalleryPosition = () => {
            const story = root.current;
            if (!story) return;
            const galleryProgress = Number.parseFloat(
              story.dataset.galleryBridgeProgress ?? "",
            );
            const position = galleryProgress > 0 && galleryProgress < 1
              ? { id: "home-gallery-why-ring", progress: galleryProgress }
              : resizePosition;
            if (!position || !restorePosition(position)) return;
            delete story.dataset.galleryBridgeProgress;
            galleryResizeProgress = undefined;
            resizePosition = undefined;
          };
          mediaEvents.addEventListener("matchMediaInit", rememberGalleryPosition);
          mediaEvents.addEventListener("matchMedia", resumeGalleryPosition);
          cleanups.push(() => {
            mediaEvents.removeEventListener("matchMediaInit", rememberGalleryPosition);
            mediaEvents.removeEventListener("matchMedia", resumeGalleryPosition);
          });
        }

        const wardTimeline = timelines.get("what-we-saw");
        const tearTimeline = timelines.get("what-stayed-with-us");
        const mapTimeline = timelines.get("why-tnbc");
        if (root.current && wardTimeline && tearTimeline) {
          cleanups.push(
            animateWardTear(root.current, wardTimeline, tearTimeline, compact),
          );
        }
        if (root.current && tearTimeline && mapTimeline) {
          cleanups.push(animateTearCloud(root.current, tearTimeline, mapTimeline, compact));
        }
        // CROSS-FILE: id owned by HomeFinale.tsx; Navbar.tsx reads it too.
        const finale = root.current?.querySelector<HTMLElement>("#home-finale");
        if (finale) {
          const pick = (name: string) =>
            finale.querySelector<HTMLElement>(`[data-finale="${name}"]`);
          const ring = pick("ring");
          const glow = pick("glow");
          const fold = pick("fold");
          const name = pick("name");
          const accent = pick("accent");
          const stroke = ring?.querySelector(".story-paint-stroke");
          const complete = ring?.querySelector(".story-paint-complete");
          const copy = (part: string) =>
            finale.querySelector<HTMLElement>(`[data-final-copy="${part}"]`);
          const title = copy("title");
          const tagline = copy("tagline");
          // Pinned finale: "the question behind" folds away so the
          //    flanks close in on "That is CirCure." (centred text does the
          //    drawing together), the name glows as they meet, then the
          //    statement, its light pass and the tagline follow while the
          //    "Why circRNA?" ring paints itself closed behind them.
          const evolve = gsap.timeline({ defaults: { ease: "none" } });
          if (fold) {
            evolve.fromTo(
              fold,
              {
                width: () => fold.scrollWidth,
                opacity: 1,
                filter: "blur(0px)",
                "--feather": 0,
              },
              {
                width: 0,
                opacity: 0,
                filter: "blur(4px)",
                "--feather": 1,
                duration: 0.2,
                ease: HOME_EASE,
              },
              0.04,
            );
          }
          if (name) {
            evolve
              .fromTo(
                name,
                { "--merge": 0 },
                { "--merge": 1, duration: 0.06 },
                0.2,
              )
              .to(
                name,
                { "--merge": 0.25, duration: 0.14, ease: "sine.out" },
                0.26,
              );
          }
          if (title) {
            evolve.fromTo(
              title,
              { autoAlpha: 0, y: compact ? 10 : 18, filter: "blur(6px)" },
              {
                autoAlpha: 1,
                y: 0,
                filter: "blur(0px)",
                duration: 0.16,
                ease: HOME_EASE,
              },
              0.3,
            );
          }
          if (accent) {
            evolve.fromTo(
              accent,
              { "--shine": "100%" },
              { "--shine": "0%", duration: 0.26, ease: "sine.inOut" },
              0.42,
            );
          }
          if (tagline) {
            evolve.fromTo(
              tagline,
              { autoAlpha: 0, y: compact ? 8 : 12 },
              { autoAlpha: 1, y: 0, duration: 0.14, ease: HOME_EASE },
              0.52,
            );
          }
          if (ring && stroke && complete) {
            gsap.set(stroke, {
              attr: { "stroke-dasharray": "1 1", "stroke-dashoffset": -1 },
            });
            gsap.set(complete, { opacity: 0 });
            evolve.fromTo(
              ring,
              { scale: 0.9, opacity: 0.1 },
              {
                scale: 1,
                opacity: compact ? 0.16 : 0.2,
                duration: 0.66,
              },
              0.3,
            );
            evolve.to(
              stroke,
              {
                attr: { "stroke-dashoffset": 0 },
                duration: 0.46,
                ease: HOME_EASE,
              },
              0.3,
            );
            evolve.to(complete, { opacity: 1, duration: 0.08 }, 0.72);
          }
          if (glow) {
            evolve.fromTo(
              glow,
              { opacity: 0.35 },
              { opacity: 0.9, duration: 0.5 },
              0.3,
            );
          }
          // Let the closing words rest before the circle opens into patient care.
          evolve.to({}, { duration: 0.24 }, 0.96);
          cleanups.push(animateFinaleExplore(finale, evolve, compact));
          // Let the complete question settle after entering from the doctor.
          // Move the whole sequence together so its later handoffs stay aligned.
          const questionHold = 0.36;
          const answerHold = 0.18;
          const revealDuration = evolve.duration();
          // Give the merged answer its own reading beat before the title/ring.
          evolve.shiftChildren(answerHold, true, 0.3);
          evolve.shiftChildren(questionHold, true);
          evolve.addLabel("question-readable", questionHold / 2);
          evolve.addLabel("answer-readable", questionHold + 0.24 + answerHold / 2);
          // Desktop: hold the settled care links still for the shared ratio.
          // Add scroll for the new hold instead of speeding up the existing art.
          let finaleScale = evolve.duration() / revealDuration;
          const settled = evolve.labels["care-complete"];
          if (!compact && settled) {
            const rest = evolve.duration() - settled;
            const hold = stillHold(1, rest / settled);
            finaleScale *= hold.scale;
            evolve.to({}, { duration: settled * hold.rest - rest });
          }

          ScrollTrigger.create({
            id: "home-finale-reading",
            trigger: finale,
            start: () => {
              const headerHeight =
                Number.parseFloat(
                  getComputedStyle(finale).getPropertyValue("--header-height"),
                ) || 0;
              return finale.offsetHeight > window.innerHeight - headerHeight + 1
                ? "bottom bottom"
                : `top top+=${headerHeight}`;
            },
            end: () =>
              `+=${Math.round(window.innerHeight * (compact ? 3 : 3.4) * finaleScale)}`,
            pin: true,
            animation: evolve,
            scrub: HOME_SCRUB,
            onUpdate: settleHomeScrubEndpoint,
            // The fold's start width is re-measured after font or size changes.
            invalidateOnRefresh: true,
          });
          timelines.set("home-finale", evolve);

        }

        if (import.meta.env.DEV) {
          debugMotion = {
            seek(id, progress) {
              const timeline = timelines.get(id);
              const trigger = timeline?.scrollTrigger;
              if (!timeline || !trigger) return;
              const p = gsap.utils.clamp(0, 1, progress);
              window.scrollTo({
                top: trigger.start + (trigger.end - trigger.start) * p,
                behavior: "instant",
              });
              ScrollTrigger.update();
              trigger.getTween()?.progress(1);
              timeline.progress(p);
            },
            state: () =>
              [...timelines].map(([id, timeline]) => ({
                id,
                progress: timeline.progress(),
              })),
          };
          window.__homeMotion = debugMotion;
        }

        return () => {
          cleanups.forEach((cleanup) => cleanup());
          splits.forEach((split) => split.revert());
          if (window.__homeMotion === debugMotion) {
            delete window.__homeMotion;
          }
          root.current?.classList.remove("has-story-motion");
          root.current?.querySelectorAll(".story-chapter.is-current")
            .forEach((section) => section.classList.remove("is-current"));
          clinicalSequence?.classList.remove("has-clinical-transition");
        };
      };

      const registerMedia = () =>
        media.add(
          {
            motion: "(prefers-reduced-motion: no-preference)",
            compact: "(max-width: 800px)",
          },
          (context) => {
            if (context.conditions?.motion) {
              return buildTimelines(Boolean(context.conditions.compact));
            }
          },
        );
      registerMedia();
      // Pin eligibility must be measured again after font loading or zoom/reflow.
      let active = true;
      let resizeTimer = 0;
      let measuredWidth = window.innerWidth;
      let measuredHeight = window.innerHeight;
      const rebuild = () => {
        if (!active) return;
        const current = activeTrigger();
        const position = galleryResizeProgress !== undefined ? {
          id: "home-gallery-why-ring",
          progress: galleryResizeProgress,
        } : resizePosition ?? capturePosition(current);
        galleryResizeProgress = undefined;
        resizePosition = undefined;
        if (root.current) delete root.current.dataset.galleryBridgeProgress;
        media.revert();
        media = gsap.matchMedia();
        registerMedia();
        ScrollTrigger.refresh();
        if (position) restorePosition(position);
      };
      const onResize = () => {
        // Ignore the small height changes caused by mobile browser chrome.
        if (
          window.innerWidth === measuredWidth &&
          Math.abs(window.innerHeight - measuredHeight) < 80
        )
          return;
        // Save before ScrollTrigger refreshes the old geometry during debounce.
        const selected = activeTrigger();
        if (resizePosition === undefined && selected) {
          resizePosition = capturePosition(selected);
        }
        const galleryProgress = Number.parseFloat(
          document.querySelector<HTMLElement>(".home-gallery-ring-transfer")
            ?.dataset.progress ?? "",
        );
        if (galleryResizeProgress === undefined && galleryProgress > 0 && galleryProgress < 1) {
          galleryResizeProgress = galleryProgress;
          if (root.current) root.current.dataset.galleryBridgeProgress = String(galleryProgress);
        }
        window.clearTimeout(resizeTimer);
        resizeTimer = window.setTimeout(() => {
          measuredWidth = window.innerWidth;
          measuredHeight = window.innerHeight;
          rebuild();
        }, 220);
      };
      window.addEventListener("resize", onResize);
      // The main stylesheet can arrive after this hook mounts. Measure the
      // final fonts and art under the loader, before releasing the intro.
      const removePreparation = registerPagePreparation(rebuild);
      return () => {
        active = false;
        removePreparation();
        window.removeEventListener("resize", onResize);
        window.clearTimeout(resizeTimer);
        media.revert();
      };
    },
    { scope: root },
  );
}
