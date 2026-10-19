import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HOME_REST_RATIO } from "./homeMotion";

// The patient's question leads into a concise marker-by-marker explanation.
export function animateTnbcReading(
  copy: HTMLElement,
  cleanups: (() => void)[],
) {
  const title = copy.querySelector<HTMLElement>("h2")!;
  const paragraphs = [
    ...copy.querySelectorAll<HTMLElement>(
      ".tnbc-context > p, .tnbc-explanation > p",
    ),
  ];
  const receptors = copy.querySelector<HTMLElement>(".story-receptors")!;
  const receptorLabels = [...receptors.querySelectorAll<HTMLElement>("span")];
  const diagram = copy.querySelector<HTMLElement>(".tnbc-diagram")!;
  const layer = (name: string) =>
    diagram.querySelector<HTMLImageElement>(`[data-tnbc-layer="${name}"]`)!;
  const cellLayers = ["outline", "cytoplasm", "nucleus", "markers"].map(layer);
  const negativeLayers = [
    layer("negative-upper"),
    layer("negative-middle"),
    layer("negative-lower"),
  ];
  const source = copy.querySelector<HTMLElement>(".story-source")!;
  const section = copy.closest<HTMLElement>(".story-chapter")!;
  const headerHeight =
    Number.parseFloat(
      getComputedStyle(section).getPropertyValue("--header-height"),
    ) || 0;
  const fits = copy.offsetHeight <= window.innerHeight - headerHeight + 2;

  // Preserve searchable phrases that cross emphasis or receptor sign nodes.
  [title, ...receptorLabels].forEach((element) => {
    const original = element.getAttribute("data-home-reading-text");
    element.dataset.homeReadingText = "";
    cleanups.push(() => {
      if (original === null) delete element.dataset.homeReadingText;
      else element.setAttribute("data-home-reading-text", original);
    });
  });
  if (!fits) {
    // Taller explanations follow their elements into view instead of waiting
    // for a desktop-sized reading sequence to advance off screen.
    const reading = gsap.timeline({
      scrollTrigger: {
        id: "home-why-tnbc-reading",
        trigger: copy,
        start: "top 85%",
        end: "bottom 65%",
        scrub: 0.22,
        invalidateOnRefresh: true,
      },
    });
    const cell = gsap.timeline({
      defaults: { ease: "sine.out" },
      scrollTrigger: {
        trigger: diagram,
        start: "top 90%",
        end: "top 45%",
        scrub: 0.22,
        invalidateOnRefresh: true,
      },
    });
    cell.fromTo(
      diagram,
      { autoAlpha: 0, y: 12, scale: 0.98 },
      {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        duration: 0.22,
      },
      0,
    );
    cellLayers.forEach((image, index) => {
      cell.fromTo(
        image,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.22,
        },
        0.12 + index * 0.1,
      );
    });
    cell.addLabel("cell-visible", 0.64);
    // Labels and their crosses follow the completed marker artwork together.
    receptorLabels.forEach((label, index) => {
      const at = 0.68 + index * 0.16;
      cell.fromTo(
        label,
        { opacity: 0, y: 6 },
        { opacity: 1, y: 0, duration: 0.18 },
        at,
      );
      cell.fromTo(
        negativeLayers[index],
        { opacity: 0, y: -5 },
        { opacity: 1, y: 0, duration: 0.16 },
        at + 0.06,
      );
    });
    cell.addLabel("markers-visible");
    [...paragraphs, source].forEach((element) => {
      gsap.fromTo(
        element,
        { autoAlpha: 0, y: 8 },
        {
          autoAlpha: 1,
          y: 0,
          ease: "sine.out",
          scrollTrigger: {
            trigger: element,
            start: "top 94%",
            end: "top 80%",
            scrub: 0.18,
            invalidateOnRefresh: true,
          },
        },
      );
    });
    reading.to({}, { duration: 1 });
    reading.addLabel("reading-complete");
    const syncPhaseLabels = () => {
      const trigger = reading.scrollTrigger;
      if (
        !trigger ||
        !Number.isFinite(trigger.start) ||
        !Number.isFinite(trigger.end) ||
        trigger.end <= trigger.start
      ) return;
      const { start, end } = trigger;
      ["cell-visible", "markers-visible"].forEach((label) => {
        const phaseTrigger = cell.scrollTrigger;
        if (
          !phaseTrigger ||
          !Number.isFinite(phaseTrigger.start) ||
          !Number.isFinite(phaseTrigger.end) ||
          phaseTrigger.end <= phaseTrigger.start
        ) return;
        const phaseEnd = phaseTrigger.start +
          (phaseTrigger.end - phaseTrigger.start) *
          (cell.labels[label] / cell.duration());
        const progress = gsap.utils.clamp(
          0,
          1,
          (phaseEnd - start) / (end - start),
        );
        reading.addLabel(label, progress * reading.duration());
      });
    };
    // Resolve playback stops after every trigger has refreshed its geometry.
    ScrollTrigger.addEventListener("refresh", syncPhaseLabels);
    cleanups.push(() =>
      ScrollTrigger.removeEventListener("refresh", syncPhaseLabels),
    );
    syncPhaseLabels();
    return reading;
  }
  // The map bridge reveals only the title. All remaining content belongs to
  // this reversible sequence, which starts at the bridge's natural handoff.
  gsap.set([diagram, receptors, ...paragraphs, source], { autoAlpha: 0 });
  gsap.set([...cellLayers, ...receptorLabels, ...negativeLayers], {
    opacity: 0,
  });
  const reading = gsap.timeline({
    defaults: { ease: "sine.out" },
    scrollTrigger: {
      id: "home-why-tnbc-reading",
      trigger: copy,
      start: () => `top top+=${headerHeight}`,
      end: () => `+=${Math.round(window.innerHeight * 1.48 * (1 + HOME_REST_RATIO))}`,
      pin: true,
      scrub: 0.22,
      invalidateOnRefresh: true,
    },
  });
  reading.addLabel("title-readable", 0);
  reading.fromTo(
    diagram,
    { autoAlpha: 0, y: 12, scale: 0.98 },
    {
      autoAlpha: 1,
      y: 0,
      scale: 1,
      duration: 0.45,
    },
    0.3,
  );
  cellLayers.forEach((image, index) => {
    reading.fromTo(
      image,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 0.38,
      },
      0.32 + index * 0.12,
    );
  });
  reading.addLabel("cell-visible", 1.06);
  const reveal = (element: HTMLElement, at: number, duration = 0.5) => {
    reading.fromTo(
      element,
      { autoAlpha: 0, y: 8 },
      {
        autoAlpha: 1,
        y: 0,
        duration,
      },
      at,
    );
  };
  reveal(paragraphs[0], 1.15);
  reading.fromTo(
    receptors,
    { autoAlpha: 0 },
    {
      autoAlpha: 1,
      duration: 0.24,
    },
    1.85,
  );
  receptorLabels.forEach((label, index) => {
    const at = 1.95 + index * 0.36;
    reading.fromTo(
      label,
      { opacity: 0, y: 6 },
      {
        opacity: 1,
        y: 0,
        duration: 0.32,
      },
      at,
    );
    reading.fromTo(
      negativeLayers[index],
      { opacity: 0, y: -5 },
      {
        opacity: 1,
        y: 0,
        duration: 0.26,
      },
      at + 0.08,
    );
  });
  reading.addLabel("markers-visible", 3.01);
  reveal(paragraphs[1], 3.18, 0.45);
  reveal(paragraphs[2], 3.8);
  reveal(paragraphs[3], 4.48);
  reveal(source, 5.12, 0.32);
  reading.addLabel("reading-complete", 5.44);
  // A short completed-frame hold gives the conclusion room before the clinic.
  reading.to({}, { duration: reading.duration() * HOME_REST_RATIO });
  return reading;
}
