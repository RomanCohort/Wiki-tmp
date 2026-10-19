import {
  Fragment,
  type ReactNode,
  type RefObject,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { HOME_INTRO_REPLAY_EVENT } from "../../utils/homeIntro";
import { whenPageLoaderLeaves } from "../../utils/pageLoader";
import {
  INTRO_WORDMARK_GLYPHS,
  INTRO_WORDMARK_STROKES,
  INTRO_WORDMARK_VIEWBOX,
} from "../../data/homeIntroWordmark";
import "../../styles/home-intro.css";

gsap.registerPlugin(useGSAP);

const SUBTITLE =
  "A Multi-Epitope Circular RNA Vaccine Platform for Triple-Negative Breast Cancer";
const SUBTITLE_WORDS = SUBTITLE.split(" ");
const SUBTITLE_WORD_DURATION = 0.36;
const SUBTITLE_WORD_STAGGER = 0.14;

// Seconds the sparkler takes to write the whole signature (lifts included),
// and the pause as it lifts between strokes.
const WRITE_DURATION = 2.4;
const LIFT = 0.08;
// Seconds of pure black before the first stroke, and how long the finished
// subtitle holds after its final word appears, before the flash.
const START = 0.6;
const HOLD = 1.8;
// The mask's round cap runs slightly ahead of the dash length.
const CAP_LEAD = 40;
const MAX_EMBERS = 140;

type Ember = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  size: number;
};

function shouldPlayIntro() {
  if (typeof window === "undefined") return false;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
    return false;
  return true;
}

interface HomeIntroProps {
  scene: RefObject<HTMLElement | null>;
  children: (playing: boolean) => ReactNode;
}

/**
 * Plays on every page load: a sparkler writes CirCure on black, holds, and
 * a single flash reveals the patient. The wordmark
 * lands beneath the persistent header. Only Skip can interrupt its own clock;
 * page input and story playback stay separate until the intro hands over.
 * Re-entering Home or explicitly returning to its title restarts the intro.
 * Reduced motion shows the finished title until the reader continues.
 *
 * Cross-file contract (rename with care):
 * - Drives .scene01-darkness / .scene01-portrait inside home-scene-01.tsx and
 *   sets its data-intro ("playing" | "done"), read by home-scene-01.css.
 * - Sets <html data-home-intro> ("playing" | "landed" | "revealing") and
 *   measures .site-header .logo-word-full as the signature's landing point.
 *   The navigation stays visible beneath the intro layer throughout.
 */
export function HomeIntro({ scene, children }: HomeIntroProps) {
  const [mode, setMode] = useState<"opening" | "title" | null>(() =>
    shouldPlayIntro() ? "opening" : "title",
  );
  const [replayCount, setReplayCount] = useState(0);
  const playing = mode !== null;
  const layerRef = useRef<HTMLDivElement>(null);
  const skipRef = useRef<() => void>(() => {});

  useLayoutEffect(() => {
    // A responsive ScrollTrigger rebuild can temporarily move the page to 0.
    // Only an explicit replay request should restart a completed intro.
    const replay = () => {
      if (layerRef.current) return;
      setMode(shouldPlayIntro() ? "opening" : "title");
      setReplayCount((count) => count + 1);
    };
    const onHomeKey = (event: KeyboardEvent) => {
      if (event.key !== "Home" || event.altKey) return;
      const target = event.target;
      if (
        target instanceof HTMLElement &&
        (target.isContentEditable || target.closest("input, textarea, select"))
      )
        return;
      event.preventDefault();
      replay();
    };
    window.addEventListener(HOME_INTRO_REPLAY_EVENT, replay);
    window.addEventListener("keydown", onHomeKey);
    return () => {
      window.removeEventListener(HOME_INTRO_REPLAY_EVENT, replay);
      window.removeEventListener("keydown", onHomeKey);
    };
  }, []);

  useLayoutEffect(() => {
    if (playing) return;

    let returning = false;
    let replayed = false;
    let lastY = window.scrollY;
    const replayAtTop = () => {
      if (!returning || replayed || window.scrollY > 0) return;
      replayed = true;
      window.dispatchEvent(new Event(HOME_INTRO_REPLAY_EVENT));
    };
    const onWheel = (event: WheelEvent) => {
      if (
        event.ctrlKey ||
        (event.target instanceof Element &&
          event.target.closest(".home-playback-scenes"))
      )
        return;
      if (event.deltaY === 0) return;
      returning = event.deltaY < 0;
      // Also handle another upward gesture when the document is already at 0.
      replayAtTop();
    };
    const onScroll = () => {
      const nextY = window.scrollY;
      if (nextY > lastY) returning = false;
      lastY = nextY;
      replayAtTop();
    };
    const onResize = () => {
      // ScrollTrigger may move to 0 while rebuilding its responsive layout.
      returning = false;
    };

    // Arm only from upward wheel intent; programmatic scroll-to-top stays quiet.
    window.addEventListener("wheel", onWheel, { passive: true, capture: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    return () => {
      window.removeEventListener("wheel", onWheel, true);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [playing]);

  // Set before paint so the opening artwork does not flicker.
  useLayoutEffect(() => {
    const section = scene.current;
    const root = document.documentElement;
    if (!section) return;
    // Home is one continuous page. Discard legacy chapter fragments on entry
    // so refresh always starts a new reading from the signature.
    if (window.location.hash) {
      window.history.replaceState(
        window.history.state,
        "",
        window.location.pathname + window.location.search,
      );
    }
    if (!playing) {
      section.dataset.intro = "done";
      return;
    }
    section.dataset.intro = "playing";
    root.dataset.homeIntro = "playing";
    // The portal owns input, including the story's autoplay preference toggle.
    // Keep the document at its opening pose until the intro finishes.
    const app = document.getElementById("root");
    const wasInert = app?.inert ?? false;
    const previousFocus = document.activeElement;
    if (app) app.inert = true;
    layerRef.current?.focus({ preventScroll: true });
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    const blockScroll = (event: Event) => event.preventDefault();
    const onScroll = () => {
      if (window.scrollY !== 0)
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("wheel", blockScroll, {
      passive: false,
      capture: true,
    });
    window.addEventListener("touchmove", blockScroll, {
      passive: false,
      capture: true,
    });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("wheel", blockScroll, true);
      window.removeEventListener("touchmove", blockScroll, true);
      if (app) app.inert = wasInert;
      if (previousFocus instanceof HTMLElement && previousFocus.isConnected)
        previousFocus.focus({ preventScroll: true });
      delete root.dataset.homeIntro;
      section.dataset.intro = "done";
    };
  }, [mode, playing, replayCount, scene]);

  useGSAP(
    () => {
      const layer = layerRef.current;
      const section = scene.current;
      if (!playing || !layer || !section) return;

      const root = document.documentElement;
      const select = gsap.utils.selector(layer);
      const svg = layer.querySelector<SVGSVGElement>(".home-intro-word")!;
      const flight = layer.querySelector<HTMLElement>(".home-intro-flight")!;
      const tip = layer.querySelector<SVGGElement>(".home-intro-tip")!;
      const tipCore = layer.querySelector<SVGCircleElement>(".home-intro-tip-core")!;
      const canvas =
        layer.querySelector<HTMLCanvasElement>(".home-intro-embers")!;
      const darkness = section.querySelector<HTMLElement>(".scene01-darkness");
      const portrait = section.querySelector<HTMLElement>(".scene01-portrait");
      const strokes = gsap.utils.toArray<SVGPathElement>(
        select(".home-intro-mask path"),
      );
      const setHeaderGlow = (active: boolean) => {
        document.querySelector(".site-header .logo-word-full")
          ?.classList.toggle("is-intro-landed", active);
      };
      const revealScene = () => {
        setHeaderGlow(false);
        gsap.set(darkness, { opacity: 0 });
        gsap.set(portrait, { scale: 1, x: 0 });
        section.dataset.intro = "done";
        root.dataset.homeIntro = "revealing";
      };

      // Respect reduced motion while keeping the large signature readable.
      if (mode === "title") {
        let continued = false;
        gsap.set(darkness, { opacity: 1 });
        gsap.set(flight, { x: 0, y: 0, scale: 1, autoAlpha: 1 });
        gsap.set(svg, { opacity: 1 });
        gsap.set(select(".home-intro-ink"), { opacity: 1 });
        gsap.set([tip, canvas], { autoAlpha: 0 });
        gsap.set(select(".home-intro-tip-core"), { animation: "none" });
        gsap.set(select(".home-intro-subtitle"), {
          autoAlpha: 1,
          y: 0,
          filter: "none",
        });
        gsap.set(select(".home-intro-subtitle-word"), { opacity: 1, y: 0 });
        gsap.set(select(".home-intro-skip"), { autoAlpha: 1 });
        skipRef.current = () => {
          if (continued) return;
          continued = true;
          revealScene();
          setMode(null);
        };
        layer
          .querySelector<HTMLButtonElement>(".home-intro-skip")
          ?.focus({ preventScroll: true });
        return () => {
          skipRef.current = () => {};
        };
      }

      const context = canvas.getContext("2d");

      // Embers live on a viewport canvas so they can fall past the wordmark.
      const embers: Ember[] = [];
      let emissionBudget = 0;
      let emissionFrame = -1;
      let emitting = true;
      let drawing = false;
      let tipMatrix: DOMMatrix | null = null;
      let tipMatrixDirty = true;
      const resize = () => {
        tipMatrixDirty = true;
        const ratio = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = window.innerWidth * ratio;
        canvas.height = window.innerHeight * ratio;
        context?.setTransform(ratio, 0, 0, ratio, 0, 0);
      };
      resize();
      window.addEventListener("resize", resize);

      const emit = (x: number, y: number) => {
        // Crossing two strokes in one slow frame must not charge the clock twice.
        if (emissionFrame === gsap.ticker.frame) return;
        emissionFrame = gsap.ticker.frame;
        emissionBudget += 3 * Math.min(gsap.ticker.deltaRatio(60), 3);
        const count = Math.floor(emissionBudget);
        emissionBudget -= count;
        for (let i = 0; i < count && embers.length < MAX_EMBERS; i += 1) {
          const angle = Math.random() * Math.PI * 2;
          const speed = 0.6 + Math.random() * 2.4;
          embers.push({
            x,
            y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed - 0.8,
            life: 1,
            size: 0.8 + Math.random() * 1.6,
          });
        }
        startDrawing();
      };
      const drawEmbers = () => {
        if (!context) return;
        // Fractional 60 Hz steps preserve the original trajectory at any refresh rate.
        const step = Math.min(gsap.ticker.deltaRatio(60), 3);
        const damping = 0.96 ** step;
        const distance = (0.96 * (1 - damping)) / (1 - 0.96);
        context.clearRect(0, 0, window.innerWidth, window.innerHeight);
        context.globalCompositeOperation = "lighter";
        for (let i = embers.length - 1; i >= 0; i -= 1) {
          const ember = embers[i];
          ember.life -= 0.022 * step;
          if (ember.life <= 0) {
            embers.splice(i, 1);
            continue;
          }
          ember.x += ember.vx * distance;
          ember.y += 2.25 * step + (ember.vy - 2.25) * distance;
          ember.vx *= damping;
          ember.vy = 2.25 + (ember.vy - 2.25) * damping;
          context.globalAlpha = ember.life;
          context.fillStyle = ember.life > 0.6 ? "#fff6fb" : "#e8b5d6";
          context.beginPath();
          context.arc(
            ember.x,
            ember.y,
            ember.size * ember.life + 0.3,
            0,
            Math.PI * 2,
          );
          context.fill();
        }
        context.globalAlpha = 1;
        if (!emitting && embers.length === 0) {
          gsap.ticker.remove(drawEmbers);
          drawing = false;
        }
      };
      const startDrawing = () => {
        if (!context || !embers.length || drawing) return;
        drawing = true;
        gsap.ticker.add(drawEmbers);
      };
      const stopEffects = () => {
        emitting = false;
        gsap.ticker.remove(drawEmbers);
        drawing = false;
        tipCore.style.animationPlayState = "paused";
        setHeaderGlow(false);
        window.removeEventListener("resize", resize);
      };

      // Moves the glowing tip to the painted end of a stroke and sheds sparks.
      const placeTip = (path: SVGPathElement, drawn: number) => {
        if (!emitting) return; // context cleanup can render old stroke tweens
        const length = Number(path.dataset.length);
        const point = path.getPointAtLength(
          Math.min(length, Math.max(0, drawn)),
        );
        // The word stays still while it is written. Read its final geometry
        // once, before writing the tip transform, and remeasure on resize.
        if (tipMatrixDirty) {
          tipMatrix = svg.getScreenCTM();
          tipMatrixDirty = false;
        }
        const matrix = tipMatrix;
        tip.setAttribute("transform", `translate(${point.x} ${point.y})`);
        if (emitting && matrix) {
          emit(
            point.x * matrix.a + point.y * matrix.c + matrix.e,
            point.x * matrix.b + point.y * matrix.d + matrix.f,
          );
        }
      };

      // Held until the page loader starts leaving, so the signature is never
      // written behind the loader on a slow first load.
      const timeline = gsap.timeline({
        defaults: { ease: "none" },
        paused: true,
      });
      let disposed = false;
      let skipped = false;
      // App shows the route loader in its parent layout effect. Inspect it
      // after this commit so a returning Home never plays behind that loader.
      void Promise.resolve()
        .then(() => whenPageLoaderLeaves())
        .then(() => {
          if (disposed || skipped) return;
          tipMatrix = svg.getScreenCTM();
          tipMatrixDirty = false;
          timeline.play();
        });

      // Write the signature on the dark stage before the original light burst.
      timeline.set(darkness, { opacity: 1 }, 0);
      timeline.fromTo(
        select(".home-intro-skip"),
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 0.3 },
        0.3,
      );
      timeline.set(tip, { autoAlpha: 0 }, 0);
      timeline.set(tip, { autoAlpha: 1 }, START);
      timeline.set(tipCore, { animationPlayState: "running" }, START);

      // Each centre line sweeps its mask like a sparkler.
      let cursor = START;
      const lengths = strokes.map((path) => path.getTotalLength());
      const totalLength = lengths.reduce((sum, length) => sum + length, 0);
      const speed =
        totalLength / Math.max(0.5, WRITE_DURATION - LIFT * strokes.length);
      strokes.forEach((path, index) => {
        const length = lengths[index];
        path.dataset.length = String(length);
        gsap.set(path, {
          strokeDasharray: `${length} ${length + 400}`,
          strokeDashoffset: length + 80,
        });
        const duration = Math.max(0.06, length / speed);
        timeline.to(
          path,
          {
            strokeDashoffset: 0,
            duration,
            ease: "power1.inOut",
            onUpdate: () =>
              placeTip(
                path,
                length -
                  Number(gsap.getProperty(path, "strokeDashoffset")) +
                  CAP_LEAD,
              ),
          },
          cursor,
        );
        cursor += duration + LIFT;
      });

      timeline.addLabel("strokes-done", cursor);
      timeline.call(
        () => {
          emitting = false;
          tipCore.style.animationPlayState = "paused";
        },
        undefined,
        "strokes-done",
      );
      timeline.to(tip, { autoAlpha: 0, duration: 0.18 }, "strokes-done");
      timeline.to(
        select(".home-intro-ink"),
        { opacity: 1, duration: 0.2 },
        "strokes-done",
      );
      const subtitleStart = cursor + 0.1;
      const subtitleEnd =
        subtitleStart +
        SUBTITLE_WORD_DURATION +
        SUBTITLE_WORD_STAGGER * (SUBTITLE_WORDS.length - 1);
      timeline.set(
        select(".home-intro-subtitle"),
        { autoAlpha: 1, y: 0, filter: "none" },
        subtitleStart,
      );
      timeline.fromTo(
        select(".home-intro-subtitle-word"),
        { opacity: 0, y: 4 },
        {
          opacity: 1,
          y: 0,
          duration: SUBTITLE_WORD_DURATION,
          stagger: SUBTITLE_WORD_STAGGER,
          ease: "power2.out",
        },
        subtitleStart,
      );
      // Keep a full reading pause after the final subtitle word settles.
      timeline.addLabel("written", cursor - LIFT);
      timeline.addLabel("subtitle-readable", subtitleEnd);

      // The finished signature breathes softly while it holds in the dark.
      timeline.to(
        svg,
        {
          opacity: 0.86,
          duration: subtitleEnd - (cursor - LIFT) + HOLD - 0.14,
          ease: "sine.inOut",
        },
        "written",
      );

      // The light gathers, then strobes; the woman emerges as it fades.
      timeline.addLabel("flash", `subtitle-readable+=${HOLD}`);
      timeline.set(svg, { opacity: 1 }, "flash-=0.14");
      timeline.to(
        select(".home-intro-skip"),
        { autoAlpha: 0, duration: 0.2 },
        "flash-=0.2",
      );
      timeline.to(
        flight,
        { scale: 0.94, duration: 0.14, ease: "power2.in" },
        "flash-=0.14",
      );
      timeline.to(
        select(".home-intro-flash"),
        { opacity: 1, duration: 0.07, ease: "power4.in" },
        "flash",
      );
      timeline.to(
        select(".home-intro-flash"),
        { opacity: 0, duration: 0.5, ease: "power2.out" },
        "flash+=0.07",
      );
      timeline.to(
        select(".home-intro-subtitle"),
        { autoAlpha: 0, y: -6, duration: 0.2 },
        "flash",
      );
      timeline.to(
        darkness,
        { opacity: 0, duration: 0.9, ease: "power2.out" },
        "flash+=0.05",
      );
      timeline.fromTo(
        portrait,
        { scale: 1.035 },
        { scale: 1, duration: 0.8, ease: "expo.out" },
        "flash+=0.07",
      );
      timeline.fromTo(
        portrait,
        { x: -8 },
        { x: 0, duration: 0.5, ease: "elastic.out(1.1, 0.35)" },
        "flash+=0.07",
      );

      // Land beneath the real header word while the navigation stays visible.
      const headerWord = () => {
        const word = document.querySelector(".site-header .logo-word-full");
        if (!word) return null;
        const range = document.createRange();
        range.selectNodeContents(word);
        const rect = range.getBoundingClientRect();
        return rect.width > 0 ? rect : null;
      };
      let landing: DOMRect | null = null;
      const offsetTo = (axis: "x" | "y") => {
        landing ??= headerWord();
        if (!landing) return axis === "x" ? 0 : -window.innerHeight * 0.35;
        const box = flight.getBoundingClientRect();
        const current = Number(gsap.getProperty(flight, axis));
        return axis === "x"
          ? landing.left +
              landing.width / 2 -
              (box.left + box.width / 2 - current)
          : landing.top +
              landing.height / 2 -
              (box.top + box.height / 2 - current);
      };
      timeline.to(
        flight,
        {
          duration: 0.75,
          ease: "power3.inOut",
          scale: () => {
            landing ??= headerWord();
            return landing ? landing.width / flight.offsetWidth : 0.4;
          },
          x: () => offsetTo("x"),
          y: () => offsetTo("y"),
        },
        "flash+=0.12",
      );
      timeline.call(
        () => {
          setHeaderGlow(true);
          root.dataset.homeIntro = "landed";
        },
        undefined,
        "flash+=0.81",
      );
      timeline.to(flight, { autoAlpha: 0, duration: 0.2 }, "flash+=0.81");
      timeline.call(
        () => {
          setHeaderGlow(false);
          root.dataset.homeIntro = "revealing";
        },
        undefined,
        "flash+=1.01",
      );
      timeline.call(
        () => {
          section.dataset.intro = "done";
        },
        undefined,
        "flash+=1.01",
      );
      const finish = () => {
        stopEffects();
        setMode(null);
      };
      timeline.call(finish, undefined, "+=0.12");

      // Finish even while waiting for the loader. Applying the final pose also
      // clears the portrait darkness before native scrolling starts.
      const skip = () => {
        if (skipped) return;
        skipped = true;
        emitting = false;
        // Do not seek through intermediate callbacks or run light updates on Skip.
        timeline.kill();
        revealScene();
        finish();
      };
      skipRef.current = skip;

      return () => {
        disposed = true;
        timeline.kill();
        skipRef.current = () => {};
        stopEffects();
      };
    },
    {
      scope: layerRef,
      dependencies: [mode, playing, replayCount],
      revertOnUpdate: true,
    },
  );

  // Keep the player mounted through hand-off so its autoplay choice survives.
  return createPortal(
    <div
      className={playing ? "home-intro" : undefined}
      ref={playing ? layerRef : undefined}
      role={playing ? "dialog" : undefined}
      aria-modal={playing || undefined}
      aria-label={playing ? "CirCure introduction" : undefined}
      tabIndex={playing ? -1 : undefined}
    >
      {playing && (
        <>
          <div className="home-intro-flash" aria-hidden="true" />
          <canvas className="home-intro-embers" aria-hidden="true" />
          <div className="home-intro-title">
            <div className="home-intro-flight">
              <svg
                className="home-intro-word"
                viewBox={INTRO_WORDMARK_VIEWBOX}
                role="img"
                aria-label="CirCure"
              >
                <defs>
                  <linearGradient id="home-intro-ink" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="#fff7fb" />
                    <stop offset="0.55" stopColor="#f3c6df" />
                    <stop offset="1" stopColor="#d784b3" />
                  </linearGradient>
                  <radialGradient id="home-intro-spark">
                    <stop offset="0" stopColor="#ffffff" />
                    <stop offset="0.28" stopColor="#f6d9ea" stopOpacity="0.95" />
                    <stop offset="0.6" stopColor="#e8b5d6" stopOpacity="0.45" />
                    <stop offset="1" stopColor="#a25172" stopOpacity="0" />
                  </radialGradient>
                  <mask
                    id="home-intro-mask"
                    className="home-intro-mask"
                    maskUnits="userSpaceOnUse"
                    x="0"
                    y="0"
                    width="3100"
                    height="820"
                  >
                    {INTRO_WORDMARK_STROKES.map((d) => (
                      <path
                        key={d}
                        d={d}
                        fill="none"
                        stroke="#fff"
                        strokeWidth="140"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    ))}
                  </mask>
                </defs>
                <g fill="url(#home-intro-ink)">
                  <g mask="url(#home-intro-mask)">
                    {INTRO_WORDMARK_GLYPHS.map((d) => (
                      <path key={d} d={d} />
                    ))}
                  </g>
                  {/* Unmasked copy fills any hairline the brush mask missed. */}
                  <g className="home-intro-ink">
                    {INTRO_WORDMARK_GLYPHS.map((d) => (
                      <path key={d} d={d} />
                    ))}
                  </g>
                </g>
                <g className="home-intro-tip">
                  <circle r="92" fill="url(#home-intro-spark)" />
                  <circle className="home-intro-tip-core" r="18" fill="#fff" />
                </g>
              </svg>
            </div>
            <p className="home-intro-subtitle">
              {SUBTITLE_WORDS.map((word, index) => (
                <Fragment key={word}>
                  <span className="home-intro-subtitle-word">{word}</span>
                  {index < SUBTITLE_WORDS.length - 1 ? " " : null}
                </Fragment>
              ))}
            </p>
          </div>
          <button
            type="button"
            className="home-intro-skip"
            onClick={() => skipRef.current()}
          >
            {mode === "title" ? "Continue" : "Skip intro"}
          </button>
        </>
      )}
      {children(playing)}
    </div>,
    document.body,
  );
}
