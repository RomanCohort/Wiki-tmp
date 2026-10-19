import gsap from "gsap";
import { HOME_EASE, HOME_SCRUB, settleHomeScrubEndpoint } from "./homeMotion";

// Keep edge washes local to the native handoff. Settled scenes retain their
// original contrast, and reverse scroll follows the same progress.
export function animateHopeHandoff(root: HTMLElement) {
  const beyond = root.querySelector<HTMLElement>("#beyond-tnbc");
  const hope = root.querySelector<HTMLElement>("#what-we-hope");
  if (!beyond || !hope) return;

  for (const section of [beyond, hope]) {
    const track = section.querySelector<HTMLElement>(".story-scene-track");
    if (!track) continue;
    const from: gsap.TweenVars = { "--hope-exit-feather": 0 };
    const to: gsap.TweenVars = {
      "--hope-exit-feather": 1,
      ease: HOME_EASE,
      scrollTrigger: {
        id: `home-${section.id}-exit-edge`,
        trigger: track,
        start: "bottom bottom",
        end: "bottom 60%",
        scrub: HOME_SCRUB,
        invalidateOnRefresh: true,
        onUpdate: settleHomeScrubEndpoint,
      },
    };
    if (section === hope) {
      // Clear the outgoing wording before its closing line returns below.
      from["--hope-copy-exit"] = 1;
      to["--hope-copy-exit"] = 0;
    }
    gsap.fromTo(section, from, to);
  }

  gsap.fromTo(hope, { "--hope-entry-feather": 1 }, {
    "--hope-entry-feather": 0,
    ease: HOME_EASE,
    scrollTrigger: {
      id: "home-hope-entry-edge",
      trigger: hope,
      start: "top 65%",
      end: "top top",
      scrub: HOME_SCRUB,
      invalidateOnRefresh: true,
      onUpdate: settleHomeScrubEndpoint,
    },
  });
}
