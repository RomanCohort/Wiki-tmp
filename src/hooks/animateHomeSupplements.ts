import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { createReadingInk, type InkCue } from "./readingInk";

type Splits = ReturnType<typeof SplitText.create>[];

export function animateTear(
  section: HTMLElement,
  timeline: gsap.core.Timeline,
  compact: boolean,
  splits: Splits,
  cleanups: (() => void)[],
) {
  // animateWardTear owns the artwork arrival; a second reveal moves its
  // destination while the carried drop is still trying to meet it.
  const stage = section.querySelector<HTMLElement>(".story-visual")!;
  const wish = section.querySelector<HTMLElement>(".story-tear-wish")!;
  const question = section.querySelector<HTMLElement>(".story-tear-question")!;
  const cue = (element: HTMLElement): InkCue => {
    const split = SplitText.create(element, {
      type: "words",
      wordsClass: "story-reading-word",
      aria: "auto",
    });
    splits.push(split);
    return { tokens: split.words as HTMLElement[], state: { progress: 0 } };
  };
  const source = cue(wish);
  const target = cue(question);
  const transfer = { source, target, state: { progress: 0 } };
  const carry = { source: target,
    element: question,
    target: section.querySelector<HTMLImageElement>('[data-layer="5"]')!,
    state: { progress: 0 } };
  const ink = createReadingInk(stage, [source, target], [transfer], compact, [carry]);
  // Let the wish paint into view as the carried drop settles.
  timeline.to(source.state, { progress: 1, duration: 0.13, ease: "none" }, 0.3);
  timeline.addLabel("wish-readable", 0.43);
  timeline.to(
    transfer.state,
    { progress: 1, duration: 0.23, ease: "none" },
    0.55,
  );
  timeline.addLabel("question-readable", 0.78);
  timeline.eventCallback("onUpdate", ink.render);
  const refreshInk = () => ink.invalidate();
  ScrollTrigger.addEventListener("refresh", refreshInk);
  cleanups.push(() => {
    ScrollTrigger.removeEventListener("refresh", refreshInk);
    ink.dispose();
  });
  ink.render();
  // Let the question register, then carry its own pigment into the painted
  // lettering inside the drop. Reverse scroll retraces the same erosion front.
  timeline.to(carry.state, { progress: 1, duration: 0.38, ease: "none" }, 0.98);
  timeline.addLabel("question-in-tear", 1.36);
  section
    .querySelectorAll<HTMLElement>("[data-tear-copy] > p")
    .forEach((element, index) => {
      // Keep the narration intact; the wish and question carry the ink motion.
      timeline.fromTo(
        element,
        { opacity: 0, y: compact ? 3 : 5 },
        { opacity: 1, y: 0, duration: 0.18, ease: "sine.out" },
        index === 0 ? 0.22 : 1.26 + (index - 1) * 0.2,
      );
    });
}
