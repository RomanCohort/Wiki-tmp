import gsap from "gsap";
import { HOME_STILL_RATIO } from "./homeMotion";

// Continue the existing circRNA closing shot in the same pinned viewport.
// Every phase belongs to one scrubbed timeline, so reverse scroll retraces it.
export function animateFinaleExplore(
  finale: HTMLElement,
  timeline: gsap.core.Timeline,
  compact: boolean,
) {
  const explore = finale.querySelector<HTMLElement>('[data-finale="explore"]');
  const ring = finale.querySelector<HTMLElement>('[data-finale="ring"]');
  if (!explore || !ring) return () => {};

  const statement = finale.querySelector<HTMLElement>(".story-final-statement");
  const glow = finale.querySelector<HTMLElement>('[data-finale="glow"]');
  const background = explore.querySelector<HTMLElement>(".story-backdrop");
  const patient = explore.querySelector<HTMLElement>('[data-layer="3"]');
  const hands = explore.querySelector<HTMLElement>('[data-layer="2"]');
  const nav = explore.querySelector<HTMLElement>(".story-hope-links");
  const entries = [
    ...explore.querySelectorAll<HTMLElement>("[data-hope-card]"),
  ];
  // Keep the paper and painted circle on one centre and expansion curve.
  const blendStart = 1.2;
  const ringEmphasisScale = 1.06;
  const expansionStart = 1.4;
  const expansionDuration = 1.16;
  const ringExpanded = expansionStart + expansionDuration;
  const ringFadeStart = ringExpanded - 0.44;
  const ringFadeDuration = 0.56;
  const ringGone = ringFadeStart + ringFadeDuration;
  // Keep the original patient, hands and chapter entries in distinct beats.
  const patientAt = ringExpanded - 0.68;
  const handsAt = ringExpanded - 0.38;
  const careSettled = handsAt + 0.56 + 0.14;
  const entryDuration = 0.28;
  const rowInterval = 0.09;
  const navigationReady = careSettled + 2 * rowInterval + entryDuration + 0.04;

  // The mask's opaque interior covers the corners at the final frame.
  // Read layout lazily: Home is hidden while the intro is being prepared.
  const paperRadius = () =>
    Math.hypot(finale.clientWidth / 2, finale.clientHeight / 2) / 0.78;

  gsap.set(explore, { autoAlpha: 0, "--care-footer-blend": 0 });
  gsap.set(background, {
    opacity: 0,
    "--care-radius": "0px",
  });
  gsap.set(patient, {
    autoAlpha: 0,
    scale: 0.96,
    y: compact ? 6 : 12,
    transformOrigin: "50% 27%",
  });
  gsap.set(hands, {
    autoAlpha: 0,
    y: compact ? 10 : 20,
    scale: 0.97,
    transformOrigin: "50% 100%",
  });
  gsap.set(entries, { autoAlpha: 0, y: compact ? 7 : 12 });
  if (nav) nav.inert = true;

  timeline.addLabel("circle-to-care", blendStart);
  timeline.fromTo(
    ring,
    { rotation: 24 },
    // A restrained half-turn continues through the reveal and dissolve.
    { rotation: -156, duration: ringGone - 0.3, ease: "sine.inOut" },
    0.3,
  );
  timeline.to(
    statement,
    {
      autoAlpha: 0,
      y: compact ? -8 : -14,
      duration: 0.42,
      ease: "sine.inOut",
    },
    blendStart + 0.08,
  );
  timeline.to(
    ring,
    {
      scale: ringEmphasisScale,
      opacity: 0.28,
      duration: expansionStart - blendStart,
      ease: "sine.inOut",
    },
    blendStart,
  );
  timeline.set(explore, { autoAlpha: 1 }, blendStart);
  timeline.fromTo(
    background,
    {
      "--care-radius": () => `${ring.offsetWidth / 2}px`,
    },
    {
      "--care-radius": () => `${(ring.offsetWidth / 2) * ringEmphasisScale}px`,
      duration: expansionStart - blendStart,
      ease: "sine.inOut",
      immediateRender: false,
    },
    blendStart,
  );
  // Introduce a little pigment, then let its density grow with its area.
  timeline.to(
    background,
    {
      opacity: 0.2,
      duration: expansionStart - blendStart,
      ease: "sine.inOut",
    },
    blendStart,
  );
  timeline.to(
    background,
    {
      "--care-radius": () => `${paperRadius()}px`,
      opacity: 1,
      duration: expansionDuration,
      ease: "sine.inOut",
      // Home is hidden during intro setup; measure after its layout is visible.
      immediateRender: false,
    },
    expansionStart,
  );
  timeline.to(
    glow,
    { opacity: 0.38, duration: 0.46, ease: "sine.inOut" },
    blendStart,
  );
  timeline.to(
    glow,
    {
      opacity: 0,
      duration: ringExpanded - (blendStart + 0.46),
      ease: "sine.inOut",
    },
    blendStart + 0.46,
  );
  timeline.to(
    ring,
    {
      // The painted circumference passes beyond every viewport edge.
      scale: () => (paperRadius() * 2) / ring.offsetWidth,
      duration: expansionDuration,
      ease: "sine.inOut",
    },
    expansionStart,
  );
  timeline.to(
    ring,
    { opacity: 0, duration: ringFadeDuration, ease: "sine.inOut" },
    ringFadeStart,
  );
  // Blend into the footer only after the circle has filled the viewport.
  timeline.to(
    explore,
    { "--care-footer-blend": 1, duration: 0.36, ease: "sine.inOut" },
    ringExpanded,
  );
  timeline.to(
    patient,
    {
      autoAlpha: 1,
      scale: 1,
      y: 0,
      duration: 0.66,
      ease: "sine.inOut",
    },
    patientAt,
  );
  timeline.to(
    hands,
    {
      autoAlpha: 1,
      scale: 1,
      y: 0,
      duration: 0.56,
      ease: "sine.inOut",
    },
    handsAt,
  );
  // Let the patient and hands rest before paired chapter entries arrive.
  timeline.addLabel("care-settled", careSettled);
  entries.forEach((entry, index) => {
    timeline.to(
      entry,
      {
        autoAlpha: 1,
        y: 0,
        duration: entryDuration,
        ease: "sine.out",
      },
      careSettled + (index % 3) * rowInterval,
    );
  });
  timeline.addLabel("care-complete", navigationReady);
  timeline.to({}, { duration: navigationReady * HOME_STILL_RATIO }, "care-complete");

  // Refresh can render the timeline with callbacks suppressed. Animate the
  // native flag itself so resize restores navigation along with the image,
  // and reverse scroll disables it before the entry reveal is complete.
  if (nav) {
    timeline.set(nav, { inert: true }, 0);
    timeline.set(nav, { inert: false }, "care-complete");
  }
  return () => {
    if (nav) nav.inert = false;
  };
}
