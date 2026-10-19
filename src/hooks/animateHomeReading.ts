import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { HOME_EASE, HOME_REST_RATIO, HOME_SCRUB, settleHomeScrubEndpoint } from "./homeMotion";
import { createReadingInk, type InkCue } from "./readingInk";
import { animateTnbcReading } from "./animateTnbcReading";

type Splits = ReturnType<typeof SplitText.create>[];
type Voice = "reflect" | "explain" | "weigh" | "assemble" | "exchange" | "expand" | "resolve";

const voices: Record<string, Voice> = {
  "what-we-saw": "reflect",
  "why-tnbc": "explain",
  "clinical-challenge": "weigh",
  "our-platform": "assemble",
  "plug-and-play": "exchange",
};

// Follow the argument sentence by sentence: context → evidence → consequence;
// framework → replacement → possibility. Source links always resolve last.
const sentenceVoices: Record<string, Voice[]> = {
  "why-tnbc": ["reflect", "weigh", "weigh", "weigh", "explain", "weigh", "expand", "reflect"],
  "clinical-challenge": ["resolve", "weigh", "explain", "explain", "explain", "reflect", "reflect"],
  "our-platform": ["explain", "expand", "assemble", "exchange", "expand"],
  "plug-and-play": ["exchange", "assemble", "reflect"],
};

// Split words, never measured lines: browser reflow remains free at any zoom.
function words(element: HTMLElement, splits: Splits) {
  // Retained in reduced motion so search uses the same sentence boundaries.
  element.dataset.homeReadingText = "";
  const split = SplitText.create(element, {
    type: "words", wordsClass: "story-reading-word", aria: "auto",
  });
  splits.push(split);
  return split.words as HTMLElement[];
}

function sentences(tokens: HTMLElement[]) {
  const groups: HTMLElement[][] = [];
  let sentence: HTMLElement[] = [];
  tokens.forEach((token, index) => {
    sentence.push(token);
    if (/[.!?][”’"')]*$/.test(token.textContent || "") || index === tokens.length - 1) {
      groups.push(sentence);
      sentence = [];
    }
  });
  return groups;
}

function reveal(
  timeline: gsap.core.Timeline,
  tokens: HTMLElement[],
  voice: Voice,
  compact: boolean,
  at: number,
  duration: number,
  sentenceIndex = 0,
) {
  const travel = compact ? 0.55 : 1;
  // A closed aperture hides the entire future sentence, including its silhouette.
  // Font-relative clearance also preserves overhangs on short italic words.
  // Resolve the clearance once in the word's local box. Matching % units avoid
  // GSAP dropping the initial aperture or changing a calc term's sign mid-tween.
  const clearance = tokens.map(token => {
    const pixels = Number.parseFloat(getComputedStyle(token).fontSize) * 0.35;
    return {
      x: pixels / Math.max(1, token.offsetWidth) * 100,
      y: pixels / Math.max(1, token.offsetHeight) * 100,
    };
  });
  const inset = (edges: number[]) => `inset(${edges.map(edge => `${edge}%`).join(" ")})`;
  const open = (index: number) => {
    const { x, y } = clearance[index];
    return [-y, -x, -y, -x];
  };
  let aperture: "top" | "right" | "bottom" | "left" | "center" = "top";
  const from: gsap.TweenVars = { yPercent: 24 * travel };
  let order: "start" | "center" | "end" = "start";
  switch (voice) {
    case "reflect": break;
    case "explain":
      from.yPercent = 0;
      aperture = "right";
      break;
    case "weigh":
      from.yPercent = -18 * travel;
      aperture = "bottom";
      break;
    case "assemble":
      from.yPercent = 0;
      aperture = "center";
      order = "center";
      break;
    case "exchange":
      from.xPercent = (sentenceIndex % 2 ? 12 : -12) * travel;
      from.yPercent = 0;
      aperture = sentenceIndex % 2 ? "right" : "left";
      order = sentenceIndex % 2 ? "end" : "start";
      break;
    case "expand":
      from.yPercent = 0;
      aperture = "center";
      from.x = (i: number) => (i - (tokens.length - 1) / 2) * -1.3 * travel;
      order = "center";
      break;
    case "resolve": order = "center"; break;
  }
  from.clipPath = (index: number) => {
    const edges = open(index);
    const { x, y } = clearance[index];
    if (aperture === "center") edges[1] = edges[3] = 50;
    else if (aperture === "top") edges[0] = 100 + y;
    else if (aperture === "right") edges[1] = 100 + x;
    else if (aperture === "bottom") edges[2] = 100 + y;
    else edges[3] = 100 + x;
    return inset(edges);
  };
  timeline.fromTo(tokens, { opacity: 0 }, { opacity: 1, duration: 0.015,
    stagger: { amount: duration * 0.28, from: order, ease: "sine.inOut" },
  }, at);
  timeline.fromTo(tokens, from, {
    x: 0, xPercent: 0, yPercent: 0,
    clipPath: (index: number) => inset(open(index)),
    duration: duration * 0.72,
    stagger: { amount: duration * 0.28, from: order, ease: "sine.inOut" },
    ease: "power3.out",
  }, at);
}

export function animateArtworkWords(
  element: HTMLElement,
  timeline: gsap.core.Timeline,
  voice: Voice,
  compact: boolean,
  splits: Splits,
  at: number,
  duration: number,
) {
  const tokens = words(element, splits);
  // Staggered children in a nested timeline may not render until their turn.
  // Hide every word now so later reveals cannot flash on section entry.
  gsap.set(tokens, { opacity: 0 });
  reveal(timeline, tokens, voice, compact, at, duration);
}

function animateQuietReading(
  copy: HTMLElement,
  section: HTMLElement,
  compact: boolean,
  cleanups: (() => void)[],
) {
  const title = copy.querySelector<HTMLElement>("h2")!;
  const paragraphs = [...copy.querySelectorAll<HTMLElement>(".story-body > p")];
  const blocks = [title, ...paragraphs];
  copy.classList.add("has-quiet-reading");
  cleanups.push(() => copy.classList.remove("has-quiet-reading"));
  const headerHeight = Number.parseFloat(getComputedStyle(section).getPropertyValue("--header-height")) || 0;
  const fits = !compact && window.innerHeight > 650 && copy.offsetHeight <= window.innerHeight - headerHeight + 2;
  blocks.forEach((element) => {
    const original = element.getAttribute("data-home-reading-text");
    element.dataset.homeReadingText = "";
    cleanups.push(() => {
      if (original === null) delete element.dataset.homeReadingText;
      else element.setAttribute("data-home-reading-text", original);
    });
  });
  const reading = gsap.timeline({
    scrollTrigger: {
      id: `home-${section.id}-reading`, trigger: copy,
      start: fits ? `top top+=${headerHeight}` : "top 85%",
      end: () => fits
        ? `+=${Math.round(window.innerHeight * 1.4 / 1.8 * (1 + HOME_REST_RATIO))}`
        : "bottom 65%",
      pin: fits, scrub: 0.22, invalidateOnRefresh: true,
      onUpdate: settleHomeScrubEndpoint,
    },
  });

  if (!fits) {
    copy.classList.add("has-flow-reading");
    cleanups.push(() => copy.classList.remove("has-flow-reading"));
    // Each intact paragraph enters where it is read, even after zoom or reflow.
    blocks.forEach((element) => {
      gsap.fromTo(element, { opacity: 0, y: 6 }, {
        opacity: 1, y: 0, duration: 1, ease: "sine.out",
        scrollTrigger: {
          trigger: element, start: "top 92%", end: "top 78%",
          scrub: 0.18, invalidateOnRefresh: true,
        },
      });
    });
    reading.to({}, { duration: 1 });
    return reading;
  }

  reading.fromTo(title, { opacity: 0, y: 6 }, {
    opacity: 1, y: 0, duration: 0.45, ease: "sine.out",
  }, 0);
  paragraphs.forEach((paragraph, index) => {
    reading.fromTo(paragraph, { opacity: 0, y: 6 }, {
      opacity: 1, y: 0, duration: 0.45, ease: "sine.out",
    }, 0.18 + index * 0.18);
  });
  reading.addLabel("reading-complete");
  reading.to({}, { duration: reading.duration() * HOME_REST_RATIO });
  copy.dataset.readingHold = String(1 / (1 + HOME_REST_RATIO));
  cleanups.push(() => delete copy.dataset.readingHold);
  return reading;
}

export function animateHomeReading(
  copy: HTMLElement,
  section: HTMLElement,
  compact: boolean,
  splits: Splits,
  cleanups: (() => void)[],
) {
  if (section.id === "why-tnbc") {
    return animateTnbcReading(copy, cleanups);
  }
  if (["our-platform", "plug-and-play"].includes(section.id)) {
    return animateQuietReading(copy, section, compact, cleanups);
  }
  const voice = voices[section.id] || "reflect";
  const ward = section.id === "what-we-saw";
  const readingRestRatio = HOME_REST_RATIO;
  copy.dataset.readingVoice = voice;
  cleanups.push(() => delete copy.dataset.readingVoice);
  if (ward) {
    copy.classList.add("has-ward-reading");
    cleanups.push(() => copy.classList.remove("has-ward-reading"));
  }
  const title = copy.querySelector<HTMLElement>("h2")!;
  const titleWords = words(title, splits);
  const targets = [...copy.querySelectorAll<HTMLElement>(
    ".story-body > p, .story-body > a, .story-receptors > span, .story-challenges > li, .story-ward-dialogue > *",
  )];
  const entries = targets.map((element) => ({
    element,
    // Keep source links structurally intact.
    groups: element.matches("a")
      ? [[element]] : sentences(words(element, splits)),
  }));
  const sentenceCount = entries.reduce((n, e) => n + e.groups.length, 0);
  const headerHeight = Number.parseFloat(getComputedStyle(section).getPropertyValue("--header-height")) || 0;
  const fits = copy.offsetHeight <= window.innerHeight - headerHeight + 2;
  const reading = gsap.timeline({
    defaults: { ease: HOME_EASE },
    scrollTrigger: {
      id: `home-${section.id}-reading`, trigger: copy,
      start: fits ? `top top+=${headerHeight}` : "top 80%",
      end: () => fits
        ? `+=${Math.round(window.innerHeight * (ward ? 4.8 : 1.6 + sentenceCount * 0.25) * (1 + readingRestRatio))}`
        : "bottom 65%",
      pin: fits, scrub: HOME_SCRUB, invalidateOnRefresh: true,
      onUpdate: settleHomeScrubEndpoint,
    },
  });
  if (!fits) {
    copy.classList.remove("has-ward-reading");
    copy.classList.add("has-flow-reading");
    cleanups.push(() => copy.classList.remove("has-flow-reading"));
    // Each sentence follows its own position, including paragraphs taller than a screen.
    let sentenceIndex = 0;
    [{ element: title, groups: sentences(titleWords) }, ...entries].forEach(({ element, groups }) => {
      groups.forEach((tokens) => {
        const index = sentenceIndex++;
        const flow = gsap.timeline({ scrollTrigger: {
          trigger: tokens[0], endTrigger: tokens[tokens.length - 1],
          start: "top 92%", end: "bottom 68%", scrub: HOME_SCRUB,
          invalidateOnRefresh: true,
        } });
        reveal(flow, tokens, element === title ? voice
          : sentenceVoices[section.id]?.[index - sentences(titleWords).length] || voice,
          compact, 0, 1, index);
      });
    });
    reading.to({}, { duration: 1 });
    return reading;
  }

  const titleGroups = sentences(titleWords);
  titleGroups.forEach((tokens, i) => reveal(reading, tokens, voice, compact, i * 0.62, 0.9, i));
  const titleEnd = 0.62 * (titleGroups.length - 1) + 0.9;
  if (ward) {
    const entry = (selector: string) => entries.find(({ element }) => element.matches(selector))!;
    const context = entry(".story-ward-context");
    context.groups.forEach((tokens, i) => reveal(reading, tokens, "reflect", compact, 1.05 + i * 0.82, 0.75));
    const wish = entry(".story-ward-wish");
    const question = entry(".story-ward-question");
    const source: InkCue = { tokens: wish.groups.flat(), state: { progress: 0 } };
    const target: InkCue = { tokens: question.groups.flat(), state: { progress: 0 } };
    const transfer = { source, target, state: { progress: 0 } };
    const ink = createReadingInk(copy, [source, target], [transfer], compact);
    cleanups.push(ink.dispose);
    reading.to(source.state, { progress: 1, duration: 1.25, ease: "none" }, 2.85);
    // Let the wish become readable before its very own pigment forms the question.
    reading.addLabel("wish-readable", 4.1);
    reading.to(transfer.state, { progress: 1, duration: 1.4, ease: "none" }, 5.2);
    reading.addLabel("question-readable", 6.6);
    reading.eventCallback("onUpdate", ink.render);
    ink.render();
    const thread = copy.querySelector(".story-ward-thread");
    reading.fromTo(thread, { scaleX: 0, opacity: 0 }, { scaleX: 1, opacity: 0.65, duration: 0.8 }, 3.15);
    reading.to(thread, { scaleX: 0.36, opacity: 0.35, duration: 1.4 }, 5.2);
    entry(".story-ward-aftermath").groups.forEach((tokens, i) => {
      reveal(reading, tokens, ["reflect", "weigh", "resolve"][i] as Voice, compact, 7.1 + i * 0.82, 0.72);
    });
  } else {
    let cursor = titleEnd + 0.3;
    let sentenceIndex = 0;
    entries.forEach(({ groups }) => {
      groups.forEach((tokens) => {
        const duration = Math.min(1.05, 0.65 + tokens.length * 0.018);
        const sentenceVoice = sentenceVoices[section.id]?.[sentenceIndex] || voice;
        reveal(reading, tokens, sentenceVoice, compact, cursor, duration, sentenceIndex++);
        cursor += duration + 0.26 + Math.min(0.2, tokens.length * 0.008);
      });
    });
  }
  reading.addLabel("reading-complete");
  reading.to({}, { duration: reading.duration() * readingRestRatio });
  copy.dataset.readingHold = String(1 / (1 + readingRestRatio));
  cleanups.push(() => delete copy.dataset.readingHold);
  return reading;
}
