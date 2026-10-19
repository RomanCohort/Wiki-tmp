import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type RefObject,
} from "react";
import { gsap } from "gsap";
import { measureAntigenTransit, pointOnTransit } from "./useAntigenTransit";
import { ANTIGEN_STAGE_STARTS } from "./antigenMechanismTiming";
import {
  HOME_PLAYBACK_STATE_EVENT,
  readHomePlaybackState,
  type HomePlaybackState,
} from "../utils/homePlayback";

// One clock owns both the illustrations and the explanatory stages.
// These durations explain the sequence, not biological time.
const stageStarts = Object.values(ANTIGEN_STAGE_STARTS);
const finalStage = stageStarts.length - 1;
type ProteinPaths = { growing: string; processed: string; peptide: string };

export function useAntigenMechanism(
  root: RefObject<HTMLDivElement | null>,
  selected: number,
  { growing, processed, peptide }: ProteinPaths,
  enabled = true,
) {
  const [phase, setPhase] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [run, setRun] = useState(0);
  const timeline = useRef<gsap.core.Timeline | null>(null);
  const reducedMotion = useRef(false);
  const inViewport = useRef(false);
  const activated = useRef(false);

  const stop = useCallback(() => {
    timeline.current?.progress(1).pause();
    setPhase(finalStage);
    setPlaying(false);
  }, []);
  const replay = useCallback(() => {
    activated.current = true;
    setRun((previous) => previous + 1);
  }, []);
  const syncPlayback = useCallback((state: HomePlaybackState) => {
    const sequence = timeline.current;
    if (!sequence) return;
    sequence.timeScale(state.mode === "playing" ? state.rate : 1);
    if (
      state.mode === "paused" ||
      document.hidden ||
      (state.mode === "playing" && !inViewport.current)
    ) {
      sequence.pause();
      setPlaying(false);
    } else if (
      activated.current &&
      !reducedMotion.current &&
      sequence.progress() < 1
    ) {
      sequence.resume();
      setPlaying(true);
    }
  }, []);
  useEffect(() => {
    const onPlaybackState = (event: Event) => {
      const state = (event as CustomEvent<HomePlaybackState>).detail;
      // A chapter jump pauses the player; scrolling resumes the visible example.
      if (
        enabled &&
        state.mode === "manual" &&
        inViewport.current &&
        !activated.current &&
        !document.hidden
      )
        replay();
      else syncPlayback(state);
    };
    window.addEventListener(HOME_PLAYBACK_STATE_EVENT, onPlaybackState);
    return () => {
      window.removeEventListener(HOME_PLAYBACK_STATE_EVENT, onPlaybackState);
    };
  }, [syncPlayback, replay, enabled]);

  useLayoutEffect(() => {
    const scene = root.current;
    if (!scene) return;
    if (!enabled) {
      setPhase(0);
      setPlaying(false);
      return;
    }
    reducedMotion.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const select = (name: string) =>
      scene.querySelector<SVGGraphicsElement>(`.home-antigen-switch__${name}`)!;
    const all = (name: string) =>
      scene.querySelectorAll<SVGGraphicsElement>(
        `.home-antigen-switch__${name}`,
      );
    const product = select("product-route");
    const ribosomeOrbit = select("ribosome-orbit");
    const tcell = select("tcell");
    const proteins = all("protein");
    const tcellLabel = select("tcell-label");
    let labelSize = parseFloat(
      getComputedStyle(scene).getPropertyValue("--tcell-label-size"),
    );
    const active = scene
      .querySelector(`[data-antigen-contact="${selected}"]`)
      ?.closest(".home-antigen-switch__cell");
    if (!product || !tcell || !active) return;
    let geometry = measureAntigenTransit(scene, selected);
    const initialMotion = {
      travel: 0,
      dock: 0,
      approach: 0,
      migration: 0,
      turn: 0,
      outline: 0,
      growth: 0,
      orbit: -55,
    };
    const motion = { ...initialMotion };
    const growingToProcessed = gsap.utils.interpolate(growing, processed);
    const processedToPeptide = gsap.utils.interpolate(processed, peptide);
    const render = () => {
      ribosomeOrbit.setAttribute(
        "transform",
        `rotate(${motion.orbit} 150 150)`,
      );
      if (geometry) {
        const route = pointOnTransit(geometry.product, motion.travel);
        const x =
          route.x +
          (geometry.presented.x - geometry.processing.x) * motion.dock;
        const y =
          route.y +
          (geometry.presented.y - geometry.processing.y) * motion.dock;
        const scale = 1 + (geometry.productScale - 1) * motion.travel;
        product.setAttribute(
          "transform",
          `translate(${x} ${y}) rotate(${geometry.productAngle * motion.travel}) scale(${scale})`,
        );
        const position = pointOnTransit(geometry.tcell, motion.migration);
        const tcellScale = 1.1 + (geometry.tcellScale - 1.1) * motion.migration;
        tcell.setAttribute(
          "transform",
          `translate(${position.x + 16 * (1 - motion.approach)} ${position.y + 1 - motion.approach}) scale(${tcellScale})`,
        );
      }
      select("tcr-turn").setAttribute(
        "transform",
        `rotate(${motion.turn * (geometry?.tcellAngle ?? 180)})`,
      );
      tcellLabel.style.fontSize = `${16 + (labelSize - 16) * motion.migration}px`;
      tcellLabel.setAttribute(
        "y",
        `${63 - (selected === 0 ? 0 : 125) * motion.migration}`,
      );
      tcellLabel.setAttribute(
        "x",
        `${(selected === 1 ? -38 : 0) * motion.migration}`,
      );
      select("cytotoxic-turn").setAttribute(
        "transform",
        `rotate(${(geometry?.tcellAngle ?? 180) - 180})`,
      );
      proteins.forEach((path) => {
        path.setAttribute(
          "d",
          motion.outline === 0
            ? growing
            : motion.outline <= 1
              ? growingToProcessed(motion.outline)
              : processedToPeptide(motion.outline - 1),
        );
        // Reveal the chain from the exit before morphing the released protein.
        path.style.strokeDasharray = motion.outline === 0 ? "1" : "none";
        path.style.strokeDashoffset = `${motion.outline === 0 ? 1 - motion.growth : 0}`;
      });
    };
    let lastPhase = -1;
    const syncPhase = () => {
      const time = sequence.time();
      const current = stageStarts.filter((start) => time >= start).length - 1;
      if (current !== lastPhase) {
        lastPhase = current;
        setPhase(current);
      }
      render();
    };
    const sequence = gsap.timeline({
      paused: true,
      defaults: { ease: "power2.inOut" },
      onUpdate: syncPhase,
      onComplete: () => setPlaying(false),
    });
    timeline.current = sequence;
    const resetVisuals = () => {
      Object.assign(motion, initialMotion);
      const zero = { opacity: 0 };
      gsap.set(proteins, {
        ...zero,
        fillOpacity: 0,
        strokeDasharray: 1,
        strokeDashoffset: 1,
      });
      proteins.forEach((path) =>
        gsap.set(path, {
          strokeWidth: path.classList.contains(
            "home-antigen-switch__protein-wash",
          )
            ? 4.5
            : 2.35,
        }),
      );
      gsap.set(tcell, { opacity: 0.78 });
      gsap.set([select("dendritic-cell"), select("dc-label")], { opacity: 1 });
      gsap.set(select("ribosome"), zero);
      gsap.set(
        [
          select("binding-wash"),
          select("priming-contact"),
          select("synapse"),
          select("presenter"),
          select("presented-peptide"),
          select("presentation-label"),
          select("activation-glow"),
          ...all("granule"),
          ...all("apoptotic-body"),
          ...all("target-status"),
        ],
        zero,
      );
      gsap.set(select("tcell-sub-label"), { opacity: 1 });
      gsap.set(select("tcell-label"), { fontSize: 16, opacity: 1 });
      gsap.set(all("cell-response"), { opacity: 0.55, scale: 1 });
      gsap.set(all("tumor-peptide"), { opacity: 0.65 });
      gsap.set(all("flow-in"), {
        opacity: 0.4,
        strokeDasharray: 1,
        strokeDashoffset: 1,
      });
      render();
    };
    resetVisuals();
    const stage = ANTIGEN_STAGE_STARTS;
    sequence
      .to(select("ribosome"), { opacity: 1, duration: 0.45 }, stage.translation)
      .to(proteins, { opacity: 0.95, duration: 0.4 }, stage.translation + 0.3)
      .to(
        motion,
        { growth: 1, orbit: 0, duration: 1.8, ease: "sine.inOut" },
        stage.translation + 0.45,
      )
      // Hold the translated chain before it travels to the presenting cell.
      .to(
        select("ribosome"),
        { opacity: 0, duration: 0.5 },
        stage.processing - 0.8,
      )
      .to(motion, { travel: 1, duration: 1.4 }, stage.processing - 0.8)
      .to(
        all("flow-in"),
        { strokeDashoffset: 0, opacity: 0.65, duration: 0.9 },
        stage.processing - 0.8,
      )
      .to(motion, { outline: 1, duration: 0.6 }, stage.processing + 0.6)
      .to(motion, { outline: 2, duration: 0.6 }, stage.processing + 1.2)
      .to(proteins, { fillOpacity: 1, duration: 0.6 }, stage.processing + 1.2)
      .to(motion, { dock: 1, duration: 0.8 }, stage.processing + 1.6)
      .to(
        select("presenter"),
        { opacity: 1, duration: 0.6 },
        stage.processing + 1.6,
      )
      .to(
        select("binding-wash"),
        { opacity: 0.12, duration: 0.4 },
        stage.processing + 1.8,
      )
      .to(proteins, { opacity: 0, duration: 0.4 }, stage.priming)
      .to(
        select("presented-peptide"),
        { opacity: 1, duration: 0.4 },
        stage.priming,
      )
      .to(
        select("presentation-label"),
        { opacity: 1, duration: 0.4 },
        stage.priming,
      )
      .to(
        select("binding-wash"),
        { opacity: 0, duration: 0.6 },
        stage.priming + 0.2,
      )
      .to(motion, { approach: 1, duration: 0.65 }, stage.priming)
      .to(tcell, { opacity: 1, duration: 0.65 }, stage.priming)
      .to(
        select("priming-contact"),
        { opacity: 0.28, duration: 0.35 },
        stage.priming + 0.6,
      )
      .to(
        select("activation-glow"),
        { opacity: 1, duration: 0.65 },
        stage.priming + 0.9,
      )
      .to(
        select("priming-contact"),
        { opacity: 0, duration: 0.5 },
        stage.priming + 1.6,
      )
      // End the presentation vignette while the activated T cell takes focus.
      .to(
        [select("dendritic-cell"), select("dc-label")],
        { opacity: 0.28, duration: 0.6 },
        stage.activated,
      )
      .to(
        [
          select("presenter"),
          select("presented-peptide"),
          select("presentation-label"),
        ],
        { opacity: 0, duration: 0.45 },
        stage.activated,
      )
      .to(all("flow-in"), { opacity: 0.1, duration: 0.6 }, stage.activated)
      .to(motion, { turn: 1, duration: 1.2 }, stage.activated)
      .to(motion, { migration: 1, duration: 2.1 }, stage.activated)
      .to(tcellLabel, { opacity: 0, duration: 0.15 }, stage.activated)
      .to(
        select("tcell-sub-label"),
        { opacity: 0, duration: 0.3 },
        stage.activated,
      )
      .to(tcellLabel, { opacity: 1, duration: 0.4 }, stage.recognition)
      .to(select("synapse"), { opacity: 0.5, duration: 0.5 }, stage.recognition)
      .to(
        active.querySelector(".home-antigen-switch__cell-response"),
        { opacity: 1, duration: 0.5 },
        stage.recognition,
      )
      .to(
        active.querySelector(".home-antigen-switch__tumor-peptide"),
        { opacity: 1, duration: 0.5 },
        stage.recognition,
      )
      // Leave the matched contact visible before releasing cytotoxic granules.
      .to(select("synapse"), { opacity: 0, duration: 1 }, stage.apoptosis)
      .to(
        active.querySelector(".home-antigen-switch__cell-response"),
        { opacity: 0.22, scale: 0.68, duration: 1.6 },
        stage.apoptosis,
      )
      .to(
        active.querySelector(".home-antigen-switch__tumor-peptide"),
        { opacity: 0.15, duration: 1.6 },
        stage.apoptosis,
      )
      .to(
        active.querySelector(".home-antigen-switch__target-status"),
        { opacity: 1, duration: 0.65 },
        stage.apoptosis + 0.65,
      );
    proteins.forEach((path) =>
      sequence.to(
        path,
        {
          strokeWidth: path.classList.contains(
            "home-antigen-switch__protein-wash",
          )
            ? 2.5
            : 0.9,
          duration: 0.6,
        },
        stage.processing + 1.2,
      ),
    );
    all("granule").forEach((granule, index) => {
      const y = -8 + index * 8;
      gsap.set(granule, { x: 28, y, scale: 0.65 });
      sequence
        .to(
          granule,
          { opacity: 0.85, x: 40, scale: 1, duration: 0.3 },
          stage.cytotoxic + index * 0.16,
        )
        .to(
          granule,
          { opacity: 0, x: 100, scale: 0.7, duration: 0.85 },
          stage.cytotoxic + 0.3 + index * 0.16,
        );
    });
    active
      .querySelectorAll<SVGGraphicsElement>(
        ".home-antigen-switch__apoptotic-body",
      )
      .forEach((body) => {
        const style = getComputedStyle(body);
        const coordinate = (name: string) =>
          parseFloat(style.getPropertyValue(name));
        gsap.set(body, {
          x: coordinate("--body-start-x"),
          y: coordinate("--body-start-y"),
          scale: 0.3,
        });
        sequence.to(
          body,
          {
            opacity: 0.6,
            x: coordinate("--body-end-x"),
            y: coordinate("--body-end-y"),
            scale: 0.9,
            duration: 1.6,
          },
          stage.apoptosis,
        );
      });
    const playback = readHomePlaybackState();
    sequence.timeScale(playback.mode === "playing" ? playback.rate : 1);
    if (
      reducedMotion.current ||
      (activated.current && document.hidden && playback.mode === "manual")
    ) {
      sequence.progress(1).pause();
      setPhase(finalStage);
      setPlaying(false);
    } else if (activated.current) {
      setPhase(0);
      const paused = playback.mode === "paused" || document.hidden;
      setPlaying(!paused);
      if (!paused) sequence.play(0);
    }
    let frame = 0;
    const observer = new ResizeObserver(() => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        geometry = measureAntigenTransit(scene, selected);
        labelSize = parseFloat(
          getComputedStyle(scene).getPropertyValue("--tcell-label-size"),
        );
        render();
      });
    });
    scene
      .querySelectorAll<SVGSVGElement>(
        "[data-antigen-ring] > svg, [data-antigen-bridge], .home-antigen-switch__target > svg",
      )
      .forEach((svg) => observer.observe(svg));
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      sequence.kill();
      // Re-entry starts from antigen translation, without the last run's peptide.
      resetVisuals();
      if (timeline.current === sequence) timeline.current = null;
    };
  }, [root, selected, run, growing, processed, peptide, enabled]);

  useEffect(() => {
    const scene = root.current;
    if (!scene || !enabled) return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let resizeTimer = 0;
    let resizing = false;
    let measuredWidth = window.innerWidth;
    let measuredHeight = window.innerHeight;
    const resize = () => {
      // Match the story's gate: mobile address bars do not rebuild its tracks.
      if (
        window.innerWidth === measuredWidth &&
        Math.abs(window.innerHeight - measuredHeight) < 80
      )
        return;
      // Only bookmark this diagram while the reader is looking at it.
      if ((!inViewport.current && !resizing) || document.hidden) {
        measuredWidth = window.innerWidth;
        measuredHeight = window.innerHeight;
        return;
      }
      resizing = true;
      window.clearTimeout(resizeTimer);
      // The story owns scroll restoration across overview/flow layouts. Keep
      // the mechanism alive during its rebuild without applying a second seek.
      resizeTimer = window.setTimeout(() => {
        resizing = false;
        measuredWidth = window.innerWidth;
        measuredHeight = window.innerHeight;
      }, 300);
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        inViewport.current = entry.isIntersecting;
        const playback = readHomePlaybackState();
        const visibleHeight =
          Math.min(
            entry.boundingClientRect.height,
            entry.rootBounds?.height ?? window.innerHeight,
          ) * 0.55;
        if (
          playback.mode === "manual" &&
          entry.isIntersecting &&
          entry.intersectionRect.height >= visibleHeight &&
          !activated.current &&
          !document.hidden
        )
          replay();
        if (!entry.isIntersecting && !resizing) {
          if (playback.mode === "manual") {
            if (activated.current) stop();
            activated.current = false;
          } else {
            timeline.current?.pause();
            setPlaying(false);
          }
        } else if (playback.mode !== "manual") {
          syncPlayback(playback);
        }
      },
      { threshold: Array.from({ length: 21 }, (_, index) => index / 20) },
    );
    observer.observe(scene);
    const preferenceChanged = () => {
      reducedMotion.current = media.matches;
      stop();
    };
    const visibilityChanged = () => {
      const playback = readHomePlaybackState();
      if (playback.mode !== "manual") syncPlayback(playback);
      else if (document.hidden) stop();
      else if (inViewport.current) replay();
    };
    media.addEventListener("change", preferenceChanged);
    document.addEventListener("visibilitychange", visibilityChanged);
    window.addEventListener("resize", resize);
    return () => {
      observer.disconnect();
      media.removeEventListener("change", preferenceChanged);
      document.removeEventListener("visibilitychange", visibilityChanged);
      window.removeEventListener("resize", resize);
      window.clearTimeout(resizeTimer);
      activated.current = false;
      inViewport.current = false;
    };
  }, [root, replay, stop, syncPlayback, enabled]);
  return { phase, playing, replay };
}
