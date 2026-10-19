import gsap from "gsap";
import { resetTnbcCopyOpacity, setTnbcCopyOpacity } from "./tnbcCopyOpacity";

const BRIDGE_SCRUB = 0.2;

// Let native scrolling carry both panels while their shared word changes shape.
export function animateTnbcBridge(section: HTMLElement) {
  const track = section.querySelector<HTMLElement>(".story-scene-track")!;
  const stage = section.querySelector<HTMLElement>(".story-chapter-inner")!;
  const copy = section.querySelector<HTMLElement>(".story-copy")!;
  const source = section.querySelector<HTMLElement>("[data-tnbc-map-shared]")!;
  const sourceLine = source.closest<HTMLElement>("[data-map-copy]");
  const sourceHeading = source.closest<HTMLElement>(".tnbc-map-intro")!;
  const target = copy.querySelector<HTMLElement>("[data-tnbc-title-shared]")!;
  const departing = [...section.querySelectorAll<HTMLElement>(
    ".tnbc-map-notes, .tnbc-map-source",
  )].map((element) => ({
    element,
    opacity: element.style.opacity,
    visibility: element.style.visibility,
  }));
  const wash = document.createElement("div");
  wash.className = "tnbc-reading-bridge-wash";
  wash.setAttribute("aria-hidden", "true");
  const word = document.createElement("span");
  word.className = "tnbc-reading-word-transfer";
  word.textContent = source.textContent?.trim() || "Breast cancer";
  word.setAttribute("aria-hidden", "true");
  stage.append(wash);
  section.append(word);

  const original = {
    copyOpacity: copy.style.opacity,
    copyPointerEvents: copy.style.pointerEvents,
    copyZIndex: copy.style.zIndex,
    sourceVisibility: source.style.visibility,
    sourceHeadingOpacity: sourceHeading.style.opacity,
    targetOpacity: target.style.opacity,
  };
  const state = { progress: 0 };
  const clamp = gsap.utils.clamp(0, 1);
  const ease = gsap.parseEase("sine.inOut");
  const fade = (start: number, end: number, value: number) =>
    ease(clamp((value - start) / (end - start)));
  const bridgeRef: { current?: gsap.core.Timeline } = {};
  let geometry:
    | {
        fromX: number;
        fromY: number;
        fromWidth: number;
        fromHeight: number;
        toX: number;
        toY: number;
        toWidth: number;
        toHeight: number;
      }
    | undefined;

  const headerHeight = () =>
    Number.parseFloat(
      getComputedStyle(section).getPropertyValue("--header-height"),
    ) || 0;
  const trackBottom = () =>
    track.getBoundingClientRect().bottom + window.scrollY;

  const measure = () => {
    const sectionBox = section.getBoundingClientRect();
    const sectionTop = sectionBox.top + window.scrollY;
    const from = source.getBoundingClientRect();
    const stageBox = stage.getBoundingClientRect();
    const sourceY = sourceLine
      ? Number(gsap.getProperty(sourceLine, "y")) || 0
      : 0;
    const to = target.getBoundingClientRect();
    const style = getComputedStyle(source);
    const trigger = bridgeRef.current?.scrollTrigger;
    geometry = {
      // Anchor the source at sticky release. Section-local coordinates let
      // the browser scroll the word without a per-frame counter-transform.
      fromX: from.left - sectionBox.left,
      fromY:
        (trigger?.start ?? sectionTop) -
        sectionTop +
        from.top -
        stageBox.top -
        sourceY,
      fromWidth: from.width,
      fromHeight: from.height,
      toX: to.left - sectionBox.left,
      toY: to.top - sectionBox.top,
      toWidth: to.width,
      toHeight: to.height,
    };
    Object.assign(word.style, {
      width: from.width + "px",
      height: from.height + "px",
      fontFamily: style.fontFamily,
      fontSize: style.fontSize,
      fontWeight: style.fontWeight,
      lineHeight: style.lineHeight,
      letterSpacing: style.letterSpacing,
      color: style.color,
    });
  };

  const draw = () => {
    const trigger = bridgeRef.current?.scrollTrigger;
    const scroll = trigger?.scroll() ?? 0;
    // ScrollTrigger stops calling onUpdate once its progress is clamped.
    // Check during the trailing scrub too, so repeated large scrolls cannot
    // leave an unfinished shared word in a distant scene.
    if (
      trigger &&
      state.progress > 0 &&
      state.progress < 1 &&
      (scroll < trigger.start - window.innerHeight * 0.5 ||
        scroll > trigger.end + window.innerHeight * 0.5)
    ) {
      trigger.getTween()?.pause();
      bridgeRef.current?.progress(scroll < trigger.start ? 0 : 1);
      return;
    }
    // Finish the same scrubbed fade at both boundaries before handing back
    // the real word; fast wheel input must not force an unfinished last frame.
    const progress = state.progress;
    const visible = progress > 0 && progress < 1;
    if (!visible) geometry = undefined;
    if (visible && !geometry) measure();
    wash.style.visibility = visible ? "visible" : "hidden";
    word.style.visibility = visible ? "visible" : "hidden";
    wash.style.opacity = String(fade(0, 0.88, progress));
    // Complete the carried word's journey before the longer title and diagram
    // become readable, so wrapped lines do not expose an empty middle phrase.
    setTnbcCopyOpacity(copy, "bridge", fade(0.62, 0.9, progress));
    target.style.opacity = String(fade(0.72, 0.94, progress));
    source.style.visibility = visible ? "hidden" : original.sourceVisibility;
    // Clear the outgoing headline before the shared word crosses its lines.
    sourceHeading.style.opacity =
      progress > 0
        ? String(1 - fade(0, 0.16, progress))
        : original.sourceHeadingOpacity;
    // Clear the statistics before the shared word crosses their outgoing row.
    departing.forEach(({ element, opacity, visibility }) => {
      element.style.opacity = progress > 0
        ? String(1 - fade(0, 0.2, progress))
        : opacity;
      element.style.visibility = progress >= 0.2 ? "hidden" : visibility;
    });
    copy.style.pointerEvents =
      progress < 1 ? "none" : original.copyPointerEvents;
    copy.style.zIndex = visible ? "62" : original.copyZIndex;
    if (!visible || !geometry) return;

    // Carry the word as the map fades, then complete the title near the
    // natural-flow handoff so neither end has another stationary interval.
    const move = fade(0, 0.72, progress);
    const { fromX, fromY, fromWidth, fromHeight, toX, toY, toWidth, toHeight } =
      geometry;
    const x = gsap.utils.interpolate(fromX, toX, move);
    const y = gsap.utils.interpolate(fromY, toY, move);
    const scaleX = gsap.utils.interpolate(1, toWidth / fromWidth, move);
    const scaleY = gsap.utils.interpolate(1, toHeight / fromHeight, move);
    word.style.transform =
      "translate3d(" +
      x +
      "px, " +
      y +
      "px, 0) scale(" +
      scaleX +
      ", " +
      scaleY +
      ")";
    word.style.opacity = String(1 - fade(0.72, 0.94, progress));
  };

  const bridge = gsap.timeline({
    scrollTrigger: {
      id: "home-tnbc-copy-bridge",
      trigger: track,
      start: () => trackBottom() - stage.offsetHeight,
      end: () => trackBottom() - headerHeight(),
      scrub: BRIDGE_SCRUB,
      invalidateOnRefresh: true,
      onRefreshInit: () => {
        geometry = undefined;
      },
      onRefresh: draw,
    },
  });
  bridgeRef.current = bridge;
  bridge.fromTo(
    state,
    { progress: 0 },
    { progress: 1, duration: 1, ease: "none", onUpdate: draw },
  );
  draw();

  return {
    timeline: bridge,
    cleanup: () => {
      bridge.kill();
      resetTnbcCopyOpacity(copy, "bridge");
      copy.style.opacity = original.copyOpacity;
      copy.style.pointerEvents = original.copyPointerEvents;
      copy.style.zIndex = original.copyZIndex;
      source.style.visibility = original.sourceVisibility;
      sourceHeading.style.opacity = original.sourceHeadingOpacity;
      target.style.opacity = original.targetOpacity;
      departing.forEach(({ element, opacity, visibility }) => {
        element.style.opacity = opacity;
        element.style.visibility = visibility;
      });
      wash.remove();
      word.remove();
    },
  };
}
