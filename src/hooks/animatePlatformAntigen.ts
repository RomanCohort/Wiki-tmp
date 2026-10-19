import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getRnaRingGeometry, separateFanPaint } from "./createRnaRingMorph";
import {
  createHomeScrubBoundaryGuard,
  isHomeMotionRefreshing,
  settleHomeScrubEndpoint,
} from "./homeMotion";
import { trackPagePreparation } from "../utils/pageLoader";

const smooth = (value: number) => {
  const p = gsap.utils.clamp(0, 1, value);
  return p * p * (3 - 2 * p);
};

/** Carry the candidate figure's ring into the interactive construct, using
 * the existing reading anchor only when that chapter is present. */
export function animatePlatformAntigen(
  sequence: HTMLElement,
  source: HTMLImageElement,
  sourceTimeline: gsap.core.Timeline,
  compact: boolean,
) {
  const root = sequence.closest<HTMLElement>(".home-story");
  const reading = sequence.querySelector<HTMLElement>(
    ".story-rna-sequence-reading",
  );
  const anchor = sequence.querySelector<HTMLElement>(
    ".story-rna-reading-anchor",
  );
  const hasReading = Boolean(reading && anchor);
  const antigen = root?.querySelector<HTMLElement>("#plug-and-play");
  const target = antigen?.querySelector<HTMLElement>("[data-antigen-ring]");
  const targetSvg = target?.querySelector("svg");
  const sourceStage = sequence.querySelector<HTMLElement>(
    ".story-rna-sequence-stage",
  );
  const targetStage = antigen?.querySelector<HTMLElement>(
    ".story-chapter-inner",
  );
  if (
    !root ||
    !antigen ||
    !target ||
    !targetSvg ||
    !sourceStage ||
    !targetStage
  ) {
    return () => {};
  }

  const ghost = document.createElement("div");
  ghost.className = "story-rna-antigen-carry";
  ghost.style.transformOrigin = "0 0";
  ghost.setAttribute("aria-hidden", "true");
  const paint = document.createElement("canvas");
  paint.width = paint.height = compact ? 512 : 768;
  const context = paint.getContext("2d");
  const lettering = document.createElement("canvas");
  lettering.width = lettering.height = paint.width;
  const letteringContext = lettering.getContext("2d");
  const incoming = targetSvg.cloneNode(true) as SVGSVGElement;
  // Keep only the closed construct; mechanism animation stays in its chapter.
  [...incoming.children].forEach((child) => {
    if (
      child.tagName !== "defs" &&
      !child.classList.contains("home-antigen-switch__assembly")
    )
      child.remove();
  });
  const identifiers = new Map<string, string>();
  incoming.querySelectorAll<SVGElement>("[id]").forEach((element) => {
    identifiers.set(element.id, `${element.id}-carry`);
    element.id = `${element.id}-carry`;
  });
  const localReferences = (value: string) => {
    for (const [id, replacement] of identifiers) {
      value = value.split(`#${id})`).join(`#${replacement})`);
    }
    return value;
  };
  incoming.querySelectorAll<SVGElement>("*").forEach((element) => {
    [...element.attributes].forEach((attribute) => {
      if (attribute.value.includes("url(#")) {
        element.setAttribute(attribute.name, localReferences(attribute.value));
      }
    });
  });
  const name = document.createElement("span");
  name.textContent = "circRNA";
  ghost.append(paint, lettering, incoming, name);
  root.append(ghost);
  const sourceVisibility = source.style.visibility;
  const targetVisibility = target.style.visibility;
  const platformLayout = sequence.querySelector<HTMLElement>(
    ".story-platform-layout",
  );
  const platformOpacity = platformLayout?.style.opacity ?? "";
  let fan: ReturnType<typeof separateFanPaint> = null;
  let disposed = false;
  let start = 0;
  let end = 0;
  let settleEnd = 0;
  let departStart = 0;
  let transitionActive = false;
  let usePaintedRing = false;
  let sourceCompleted = false;
  const motion = { progress: 0 };
  const targetVisual = antigen.querySelector<HTMLElement>(".story-visual");
  const targetName = target.querySelector<HTMLElement>(
    ".home-antigen-switch__center",
  );
  const installed = incoming.querySelector("[data-antigen-installed] image");
  let targetFont = compact ? 22 : 46;
  let baseSize = 1;
  let from = { x: 0, y: 0, size: 1 };
  let to = { x: 0, y: 0, size: 1 };
  let rest = { x: 0, size: 1, top: 0, naturalTop: 0 };
  const restingAt = (scroll: number) => ({
    x: rest.x,
    y: Math.max(rest.top, rest.naturalTop - scroll) + rest.size / 2,
    size: rest.size,
  });

  const restore = () => {
    source.style.visibility = sourceVisibility;
    target.style.visibility = targetVisibility;
    ghost.style.visibility = "hidden";
  };
  const render = () => {
    if (disposed || isHomeMotionRefreshing()) return;
    const actual = gsap.utils.clamp(
      0,
      1,
      (window.scrollY - start) / Math.max(1, end - start),
    );
    const active = actual > 0 && actual < 1;
    // A quick chapter jump can reach this carry before the source scrub does.
    // Finish that painting before its closed-ring copy takes ownership.
    if (actual > 0 && !sourceCompleted) {
      sourceTimeline.scrollTrigger?.getTween()?.progress(1);
      sourceTimeline.progress(1);
      sourceCompleted = true;
    } else if (actual === 0 && sourceCompleted) {
      sourceTimeline.scrollTrigger?.getTween()?.progress(1);
      sourceTimeline.progress(sourceTimeline.scrollTrigger?.progress ?? 0);
      sourceCompleted = false;
    }
    // A texture decoded midway through a pass becomes available next time.
    // Switching the live original to its fixed copy midway causes a flash.
    if (!active || !transitionActive) usePaintedRing = Boolean(fan);
    transitionActive = active;
    // Render from scrubbed progress even after the last wheel event. Geometry
    // uses the same virtual scroll, so DOM scrolling cannot pull the ring away.
    const scroll = gsap.utils.interpolate(start, end, motion.progress);
    sequence.dataset.antigenBridgeProgress = String(motion.progress);
    ghost.dataset.renderer = usePaintedRing ? "painted" : "native";
    // Keep all advantages together until this bridge starts. Fade their parent
    // early in the flight so the fixed ring clears the mobile reading rows.
    // The source timeline still owns each child's cumulative reveal.
    if (platformLayout && !hasReading) {
      const fade = gsap.utils.clamp(0, 1, motion.progress / 0.18);
      platformLayout.style.opacity = usePaintedRing
        ? String((1 - fade) ** 3)
        : platformOpacity;
    }
    // The carry clone contains only the closed ring. Once the mechanism is
    // opened, its live ribosome and protein must remain visible on the real SVG.
    const mechanismOpen =
      target.closest<HTMLElement>(".home-antigen-switch")?.dataset
        .mechanismExpanded === "true";
    // The expanded mechanism owns the ring only after its chapter begins.
    // Restore the carry when scrolling back into this bridge.
    if (
      !active ||
      !usePaintedRing ||
      !context ||
      !fan ||
      (mechanismOpen && window.scrollY >= end)
    ) {
      boundaryGuard.setActive(false);
      restore();
      return;
    }
    boundaryGuard.setActive(true);
    source.style.visibility = "hidden";
    target.style.visibility = "hidden";
    ghost.style.visibility = "visible";
    const entering = hasReading && scroll < settleEnd;
    const leaving = !hasReading || scroll > departStart;
    const p = hasReading
      ? entering
        ? smooth((scroll - start) / Math.max(1, settleEnd - start))
        : leaving
          ? smooth((scroll - departStart) / Math.max(1, end - departStart))
          : 0
      : smooth((scroll - start) / Math.max(1, end - start));
    // A departing reading ring stays at its anchor until the direct flight
    // takes over; sequences without reading use only their two endpoints.
    const a = hasReading
      ? entering
        ? from
        : restingAt(leaving ? departStart : scroll)
      : from;
    const b = hasReading
      ? entering
        ? restingAt(scroll)
        : leaving
          ? to
          : a
      : to;
    const size = gsap.utils.interpolate(a.size, b.size, p);
    const x = gsap.utils.interpolate(a.x, b.x, p);
    const y = gsap.utils.interpolate(a.y, b.y, p);
    const pigment = !hasReading || entering ? smooth(p) : 1;
    const scale = size / baseSize;
    ghost.style.transform = `translate3d(${x - size / 2}px, ${y - size / 2}px, 0) scale(${scale})`;
    ghost.style.opacity = String(
      leaving && targetVisual
        ? gsap.utils.interpolate(
            1,
            Number(getComputedStyle(targetVisual).opacity),
            p,
          )
        : 1,
    );
    paint.style.opacity = String(1 - pigment);
    incoming.style.opacity = String(pigment);
    // Keep the ring solid while the two different centre labels take turns.
    lettering.style.opacity = String(1 - smooth(pigment / 0.45));
    name.style.opacity = String(smooth((pigment - 0.55) / 0.45));
    name.style.fontSize = `${
      gsap.utils.interpolate(compact ? 11 : 28, targetFont, leaving ? p : 0) /
      scale
    }px`;
    const selected = targetSvg
      .querySelector("[data-antigen-installed] image")
      ?.getAttribute("filter");
    if (selected) {
      installed?.setAttribute("filter", localReferences(selected));
    }
  };
  const boundaryGuard = createHomeScrubBoundaryGuard(
    () => timeline.scrollTrigger,
    render,
  );
  // Opening the mechanism can change visibility without a scroll update.
  const mechanism = target.closest<HTMLElement>(".home-antigen-switch");
  const mechanismObserver = new MutationObserver(render);
  if (mechanism) {
    mechanismObserver.observe(mechanism, {
      attributes: true,
      attributeFilter: ["data-mechanism-expanded"],
    });
  }
  const preparePaint = () => {
    if (disposed || fan || !context || !letteringContext) return;
    try {
      const textures = separateFanPaint(source);
      if (!textures) return;
      // Preserve each plate's crop inside the incoming construct's square
      // coordinate system, including the original fan ring's lower edge.
      const unit = paint.width;
      const sourceGeometry = getRnaRingGeometry(source);
      for (const [plateContext, texture] of [
        [context, textures.ring],
        [letteringContext, textures.lettering],
      ] as const) {
        plateContext.clearRect(0, 0, unit, unit);
        plateContext.drawImage(
          texture,
          (0.5 - sourceGeometry.centerX / sourceGeometry.diameter) * unit,
          (0.5 - sourceGeometry.centerY / sourceGeometry.diameter) * unit,
          (sourceGeometry.width / sourceGeometry.diameter) * unit,
          (sourceGeometry.height / sourceGeometry.diameter) * unit,
        );
      }
      fan = textures;
    } catch {
      restore();
    }
  };
  // Responsive rebuilds already have a loaded source. Prepare it before the
  // first refresh locks the renderer for a flight restored midway through.
  if (source.complete && source.naturalWidth) preparePaint();
  const timeline = gsap.timeline({
    onUpdate: render,
    scrollTrigger: {
      id: "home-platform-antigen-carry",
      // Measure after the chapter triggers so the handoff lands on the construct.
      refreshPriority: -1,
      trigger: reading && anchor ? reading : sequence,
      start: () => sourceTimeline.scrollTrigger?.end ?? 0,
      end: () => antigen.getBoundingClientRect().top + window.scrollY,
      scrub: compact ? 0.28 : 0.36,
      onUpdate: (self) => {
        settleHomeScrubEndpoint(self);
        render();
      },
      onRefresh: (self) => {
        start = self.start;
        end = Math.max(start + 1, self.end);
        // Measure stage-local endpoints so refresh can run inside a pin. A
        // taller mobile source stage leaves with its bottom at the viewport.
        const sourceBox = source.getBoundingClientRect();
        const sourceStageBox = sourceStage.getBoundingClientRect();
        const sourceGeometry = getRnaRingGeometry(source);
        const targetBox = targetSvg.getBoundingClientRect();
        from = {
          x:
            sourceBox.left +
            sourceBox.width * (sourceGeometry.centerX / sourceGeometry.width),
          y:
            sourceBox.top +
            sourceBox.height *
              (sourceGeometry.centerY / sourceGeometry.height) -
            sourceStageBox.top +
            Math.min(0, window.innerHeight - sourceStageBox.height),
          size:
            sourceBox.width * (sourceGeometry.diameter / sourceGeometry.width),
        };
        to = {
          x: targetBox.left + targetBox.width / 2,
          y:
            targetBox.top +
            targetBox.height / 2 -
            targetStage.getBoundingClientRect().top,
          size: targetBox.width,
        };
        if (reading && anchor) {
          const restBox = anchor.getBoundingClientRect();
          rest = {
            x: restBox.left + restBox.width / 2,
            size: restBox.width,
            top: Number.parseFloat(getComputedStyle(anchor).top) || 0,
            naturalTop:
              reading.getBoundingClientRect().top +
              window.scrollY +
              Number.parseFloat(getComputedStyle(reading).paddingTop),
          };
          const distance = end - start;
          settleEnd =
            start + Math.min(distance * 0.32, window.innerHeight * 0.72);
          departStart =
            end - Math.min(distance * 0.28, window.innerHeight * 0.65);
          const readingTrigger = ScrollTrigger.getById(
            "home-our-platform-reading",
          );
          if (readingTrigger?.pin) {
            departStart = Math.max(settleEnd, readingTrigger.end);
          }
          departStart = Math.min(departStart, end - 1);
        }
        // Rasterize at the largest endpoint so mobile enlargement stays crisp.
        baseSize = Math.max(from.size, to.size, hasReading ? rest.size : 0);
        ghost.style.width = ghost.style.height = `${baseSize}px`;
        targetFont = targetName
          ? Number.parseFloat(getComputedStyle(targetName).fontSize)
          : compact
            ? 22
            : 46;
        motion.progress = self.progress;
        sequence.dataset.antigenBridgeStart = String(start);
        sequence.dataset.antigenBridgeEnd = String(end);
        render();
      },
    },
  });
  timeline.fromTo(
    motion,
    { progress: 0 },
    { progress: 1, duration: 1, ease: "none", immediateRender: false },
  );
  // Refresh can temporarily reset scroll and rewind scrubbed timelines. Draw
  // only after all chapters have restored their real geometry and progress.
  ScrollTrigger.addEventListener("refresh", render);
  const preparation = source
    .decode()
    .then(() => {
      preparePaint();
      render();
    })
    .catch(() => {});
  const stopTrackingPreparation = trackPagePreparation(preparation);

  return () => {
    disposed = true;
    boundaryGuard.dispose();
    stopTrackingPreparation();
    ScrollTrigger.removeEventListener("refresh", render);
    mechanismObserver.disconnect();
    timeline.scrollTrigger?.kill();
    timeline.kill();
    restore();
    if (platformLayout) platformLayout.style.opacity = platformOpacity;
    ghost.remove();
    fan = null;
    delete sequence.dataset.antigenBridgeProgress;
    delete sequence.dataset.antigenBridgeStart;
    delete sequence.dataset.antigenBridgeEnd;
  };
}
