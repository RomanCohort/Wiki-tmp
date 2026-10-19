import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
const whyRingTexture = "https://static.igem.wiki/teams/6056/wiki/files/pages/home/scene-1-layer-4.webp";
import {
  HOME_EASE,
  HOME_SCRUB,
  isHomeMotionRefreshing,
  settleHomeScrubEndpoint,
} from "./homeMotion";
import { animateThinkingGallery } from "./animateThinkingGallery";

type Bounds = { left: number; top: number; width: number; height: number };
const GALLERY_RING_OPACITY = 0.64;
const GALLERY_RING_TONE = "saturate(0.72) brightness(1.06)";

// The incoming ring later moves to the platform, so measure its untransformed
// position even while that earlier timeline is settling during reverse scroll.
function baseBounds(ring: SVGElement): Bounds {
  const rect = ring.getBoundingClientRect();
  const scaleX = Number(gsap.getProperty(ring, "scaleX")) || 1;
  const scaleY = Number(gsap.getProperty(ring, "scaleY")) || 1;
  const width = rect.width / scaleX;
  const height = rect.height / scaleY;
  return {
    left:
      rect.left -
      Number(gsap.getProperty(ring, "x")) +
      (rect.width - width) / 2,
    top:
      rect.top -
      Number(gsap.getProperty(ring, "y")) +
      (rect.height - height) / 2,
    width,
    height,
  };
}

export function animateGalleryWhy(root: HTMLElement, compact: boolean) {
  const gallery = root.querySelector<HTMLElement>("#molecule-gallery")!;
  const cards = Array.from(
    gallery.querySelectorAll<HTMLElement>(".home-molecule-gallery__card"),
  );
  const chosen = gallery.querySelector<HTMLElement>(
    ".home-molecule-gallery__card--chosen",
  )!;
  const alternatives = cards.filter((card) => card !== chosen);
  const decision = gallery.querySelector<HTMLElement>(
    ".home-molecule-gallery__decision",
  )!;
  const source = chosen.querySelector<SVGSVGElement>("[data-gallery-ring]")!;
  const stage = gallery.querySelector<HTMLElement>(
    ".home-molecule-gallery__stage",
  )!;
  const target = root.querySelector<SVGSVGElement>(
    '#why-circrna [data-layer="4"]',
  )!;
  const whyTrack = root.querySelector<HTMLElement>(
    ".story-rna-sequence-track",
  )!;
  const stacked =
    compact && !window.matchMedia("(min-aspect-ratio: 4/5)").matches;
  const detailLayers = cards.flatMap((card) =>
    Array.from(
      card.querySelectorAll<SVGElement>(
        '[data-gallery-layer="symbols"], [data-gallery-layer="labels"]',
      ),
    ),
  );

  // A staggered fromTo only initializes the first target immediately. Set all
  // layers before creating the timeline so the entering edge has one state.
  gsap.set(cards, { autoAlpha: 0, y: compact ? 10 : 16 });
  gsap.set(detailLayers, { opacity: 0 });
  gsap.set(source, { opacity: 0, filter: GALLERY_RING_TONE });
  gsap.set(decision, { opacity: 0 });
  const title = gallery.querySelector<HTMLElement>(
    ".home-molecule-gallery__title",
  )!;
  gsap.set(title, { autoAlpha: 0 });

  const intro = gsap.timeline({
    scrollTrigger: {
      id: "home-molecule-gallery-intro",
      trigger: gallery,
      start: "top bottom",
      end: "bottom bottom",
      scrub: compact ? 0.42 : HOME_SCRUB,
      invalidateOnRefresh: true,
      onUpdate: settleHomeScrubEndpoint,
    },
  });
  intro.fromTo(
    stage,
    { backgroundColor: "#f0f3fd" },
    { backgroundColor: "#fff4e2", duration: 0.48, ease: HOME_EASE },
    0,
  );
  intro.addLabel("choices-enter", 0.14);
  cards.forEach((card, index) => {
    // Finish each complete card before the next starts, including during the
    // incoming fixed-stage carry. Keep all four ready at choices-visible.
    const at = intro.labels["choices-enter"] + index * 0.16;
    intro.to(card, { autoAlpha: 1, y: 0, duration: 0.14, ease: HOME_EASE }, at);
    const symbols = card.querySelector(
      '[data-gallery-layer="symbols"], [data-gallery-ring]',
    );
    if (symbols) {
      intro.to(
        symbols,
        {
          opacity: card === chosen ? GALLERY_RING_OPACITY : 1,
          duration: 0.12,
          ease: HOME_EASE,
        },
        at + 0.02,
      );
    }
    intro.to(
      card.querySelectorAll('[data-gallery-layer="labels"]'),
      { opacity: 1, duration: 0.12, ease: HOME_EASE },
      at + 0.02,
    );
  });
  intro.to(title, { autoAlpha: 1, duration: 0.12, ease: HOME_EASE }, 0.02);
  intro.addLabel("choices-visible", 0.76);
  intro.to(
    alternatives,
    {
      autoAlpha: 0,
      y: -8,
      stagger: 0.025,
      duration: 0.36,
      ease: HOME_EASE,
    },
    0.96,
  );
  intro.to(title, { autoAlpha: 0, duration: 0.36, ease: HOME_EASE }, 0.96);
  intro.to(
    chosen,
    {
      xPercent: stacked ? 50 : -50,
      yPercent: stacked ? -50 : 0,
      scale: 1.045,
      duration: 0.48,
      ease: HOME_EASE,
    },
    0.96,
  );
  intro.fromTo(
    decision,
    { opacity: 0, y: 12 },
    { opacity: 1, y: 0, duration: 0.3, ease: HOME_EASE },
    1.4,
  );
  intro.addLabel("circ-selected", 1.74);
  intro.to({}, { duration: 0.12 }, 1.76);
  const cleanupThinking = animateThinkingGallery(root, intro, compact);

  const ghost = source.cloneNode(true) as SVGSVGElement;
  ghost.removeAttribute("style");
  ghost.removeAttribute("data-gallery-ring");
  ghost.classList.add("home-gallery-ring-transfer");
  ghost.setAttribute("aria-hidden", "true");
  const outgoingPaint = ghost.querySelector<SVGImageElement>("image")!;
  outgoingPaint.style.filter = GALLERY_RING_TONE;
  const incomingPaint = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "image",
  );
  const crop = source.viewBox.baseVal;
  incomingPaint.setAttribute("href", whyRingTexture);
  incomingPaint.setAttribute("x", String(crop.x));
  incomingPaint.setAttribute("y", String(crop.y));
  incomingPaint.setAttribute("width", String(crop.width));
  incomingPaint.setAttribute("height", String(crop.height));
  incomingPaint.setAttribute("preserveAspectRatio", "none");
  incomingPaint.style.opacity = "0";
  ghost.append(incomingPaint);
  document.body.append(ghost);

  const cardCopy = chosen.cloneNode(true) as HTMLElement;
  cardCopy.removeAttribute("style");
  cardCopy.querySelector("[data-gallery-ring]")?.remove();
  // This clone is made before the detail reveal runs. Keep its label painted
  // during handoff instead of carrying the timeline's initial opacity: 0.
  cardCopy
    .querySelectorAll<SVGElement>('[data-gallery-layer="labels"]')
    .forEach((label) => {
      label.style.opacity = "1";
    });
  cardCopy.classList.add("home-gallery-card-transfer");
  cardCopy.setAttribute("aria-hidden", "true");
  document.body.append(cardCopy);

  const originalSourceVisibility = source.style.visibility;
  const originalTargetVisibility = target.style.visibility;
  const originalTargetOpacity = target.style.opacity;
  const ease = gsap.parseEase(HOME_EASE);
  const whyTrigger = ScrollTrigger.getById("home-circrna-platform");
  const whyStart = () => whyTrack.getBoundingClientRect().top + window.scrollY;
  type Geometry = {
    fromX: number;
    fromY: number;
    fromWidth: number;
    fromHeight: number;
    toX: number;
    toY: number;
    toWidth: number;
    toHeight: number;
  };
  let geometry: Geometry | undefined;
  let measuredAt: { end: number; width: number; height: number } | undefined;
  let crossedIntoBridge = false;
  const measure = (galleryEnd: number): Geometry => {
    const scroll = window.scrollY;
    const sourceShift = Math.max(0, scroll - (galleryEnd - window.innerHeight));
    const card = chosen.getBoundingClientRect();
    const from = source.getBoundingClientRect();
    const to = baseBounds(target);
    const geometry = {
      fromX: from.left,
      fromY: from.top + sourceShift,
      fromWidth: from.width,
      fromHeight: from.height,
      toX: to.left,
      toY: to.top - Math.max(0, galleryEnd - scroll),
      toWidth: to.width,
      toHeight: to.height,
    };
    gsap.set(cardCopy, {
      autoRound: false,
      x: card.left,
      y: card.top + sourceShift,
      width: card.width,
      height: card.height,
    });
    gsap.set(ghost, {
      autoRound: false,
      width: from.width,
      height: from.height,
    });
    return geometry;
  };
  const prepare = () => {
    if (!crossedIntoBridge) {
      // Complete the gallery's resting frame before measuring its outgoing ring.
      intro.scrollTrigger?.getTween()?.progress(1);
      intro.progress(1);
      crossedIntoBridge = true;
    }
  };
  const smooth = (from: number, to: number, value: number) =>
    ease(gsap.utils.clamp(0, 1, (value - from) / (to - from)));
  const bridgeSurface = gsap.utils.interpolate("#fff4e2", "#fceeed");
  const draw = () => {
    if (isHomeMotionRefreshing()) return;
    // The preceding pinned scenes can change their spacing after load. Read
    // the visible section boundary, not a cached ScrollTrigger progress.
    const galleryEnd = gallery.getBoundingClientRect().bottom + window.scrollY;
    const p = gsap.utils.clamp(
      0,
      1,
      (window.scrollY + window.innerHeight - galleryEnd) / window.innerHeight,
    );
    ghost.dataset.progress = String(p);
    const arrived = p >= 1 - 0.0001;
    const travelling = p > 0 && !arrived;
    // Both native panels share one surface while the ring crosses their seam.
    // Removing the override gives each chapter's timeline its background back.
    root.classList.toggle("is-gallery-why-carry", travelling);
    if (travelling) {
      root.style.setProperty(
        "--gallery-why-surface",
        bridgeSurface(smooth(0, 1, p)),
      );
    } else {
      root.style.removeProperty("--gallery-why-surface");
    }
    if (p > 0) prepare();
    else if (crossedIntoBridge) {
      // Restore the gallery's actual scroll frame. A scene-picker jump can
      // land before the choice has been made, while a reverse scroll lands
      // on the completed choice.
      intro.scrollTrigger?.getTween()?.progress(1);
      const time = intro.time();
      // Re-render with the original tween start values intact.
      intro.time(0).time(time);
      crossedIntoBridge = false;
    }

    source.style.visibility = p > 0 ? "hidden" : originalSourceVisibility;
    cardCopy.style.visibility = travelling ? "visible" : "hidden";
    ghost.style.visibility = travelling ? "visible" : "hidden";
    // Only one ring is painted during the carry. The Why ring takes over once
    // its sticky scene and the travelling ring share the same final bounds.
    target.style.visibility = arrived ? originalTargetVisibility : "hidden";
    if (p > 0) {
      gsap.set(chosen, { opacity: 0 });
      gsap.set(alternatives, { autoAlpha: 0 });
      gsap.set(decision, { opacity: 1 - smooth(0, 0.25, p) });
      gsap.set(cardCopy, { opacity: 1 - smooth(0.08, 0.5, p) });
      // The Why timeline takes ownership when its ring morph starts.
      // Before then, a direct chapter jump must show the finished native ring.
      const whyTimeline = whyTrigger?.animation as
        gsap.core.Timeline | undefined;
      if (
        (whyTimeline?.time() ?? 0) <
        (whyTimeline?.labels["ring-to-platform"] ?? 1.25)
      ) {
        gsap.set(target, { opacity: arrived ? 1 : 0 });
      }
    }
    if (!travelling) return;

    // Re-measure only when a late layout shift or viewport rebuild moves an
    // anchor. An arriving scene may first paint before scroll restoration.
    if (
      !geometry ||
      !measuredAt ||
      Math.abs(measuredAt.end - galleryEnd) > 1 ||
      measuredAt.width !== window.innerWidth ||
      measuredAt.height !== window.innerHeight
    ) {
      geometry = measure(galleryEnd);
      measuredAt = {
        end: galleryEnd,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    }
    const pigment = smooth(0.04, 0.96, p);
    // Deepen the colour throughout the carry; blend the two close paintings
    // near arrival so their slightly different edges never read as two rings.
    const texture = smooth(0.62, 0.9, p);
    gsap.set(outgoingPaint, { opacity: 1 - texture });
    gsap.set(incomingPaint, { opacity: texture });
    const { fromX, fromY, fromWidth, fromHeight, toX, toY, toWidth, toHeight } =
      geometry;
    const travel = ease(p);
    gsap.set(ghost, {
      x: gsap.utils.interpolate(fromX, toX, travel),
      y: gsap.utils.interpolate(fromY, toY, travel),
      scaleX: gsap.utils.interpolate(1, toWidth / fromWidth, travel),
      scaleY: gsap.utils.interpolate(1, toHeight / fromHeight, travel),
      opacity: GALLERY_RING_OPACITY + (1 - GALLERY_RING_OPACITY) * pigment,
    });
  };
  const bridge = ScrollTrigger.create({
    id: "home-gallery-why-ring",
    trigger: gallery,
    // Carry the ring only while the old scene leaves and the Why scene enters.
    start: () => whyStart() - window.innerHeight,
    end: whyStart,
    invalidateOnRefresh: true,
    onUpdate: draw,
    onRefresh: () => {
      geometry = undefined;
    },
  });
  let frame = 0;
  let refreshPending = false;
  const refreshAnchor = () => {
    if (!refreshPending || isHomeMotionRefreshing()) return;
    refreshPending = false;
    if (Math.abs(bridge.start - (whyStart() - window.innerHeight)) > 2) {
      bridge.refresh();
      draw();
    }
  };
  const onRefresh = () => {
    refreshPending = false;
    geometry = undefined;
    draw();
  };
  const onScroll = () => {
    if (frame) return;
    frame = window.requestAnimationFrame(() => {
      frame = 0;
      if (isHomeMotionRefreshing()) return;
      draw();
      // Continue painting from real layout while scrolling. Re-measuring all
      // pinned chapters mid-gesture can briefly pull native scrolling back.
      // Update this unpinned bridge's anchors once the gesture has settled.
      const galleryBottom = gallery.getBoundingClientRect().bottom;
      if (
        galleryBottom <= -window.innerHeight ||
        galleryBottom >= window.innerHeight * 2
      )
        return;
      const anchor = whyStart() - window.innerHeight;
      if (Math.abs(bridge.start - anchor) > 2) refreshPending = true;
    });
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  ScrollTrigger.addEventListener("scrollEnd", refreshAnchor);
  ScrollTrigger.addEventListener("refresh", onRefresh);
  draw();

  return () => {
    cleanupThinking();
    window.removeEventListener("scroll", onScroll);
    ScrollTrigger.removeEventListener("scrollEnd", refreshAnchor);
    ScrollTrigger.removeEventListener("refresh", onRefresh);
    window.cancelAnimationFrame(frame);
    root.classList.remove("is-gallery-why-carry");
    root.style.removeProperty("--gallery-why-surface");
    intro.kill();
    bridge.kill();
    source.style.visibility = originalSourceVisibility;
    target.style.visibility = originalTargetVisibility;
    target.style.opacity = originalTargetOpacity;
    gsap.set([...cards, decision], { clearProps: "opacity,transform" });
    gsap.set(detailLayers, { clearProps: "opacity" });
    gsap.set(stage, { clearProps: "backgroundColor" });
    gsap.set(source, { clearProps: "opacity,filter" });
    cardCopy.remove();
    ghost.remove();
  };
}
