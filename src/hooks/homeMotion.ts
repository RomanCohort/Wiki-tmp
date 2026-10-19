import { ScrollTrigger } from "gsap/ScrollTrigger";

// A short scrub smooths wheel input without leaving the illustration trailing.
export const HOME_SCRUB = 0.22;
// NOTE: "sine.inOut" is also hardcoded in useHomeStoryAnimation.ts (paint()
// and several tweens). Changing this alone will not retune those; search for
// the literal.
export const HOME_EASE = "sine.inOut";

// Pinned reading pages hold their completed text still for a quarter of the
// reveal distance. Scaling the track by the same amount preserves reveal speed.
export const HOME_REST_RATIO = 0.25;

// Desktop: every scrubbed scene stays perfectly still for this fraction of its
// own reveal distance before the next scene, or the bridge into it, moves.
export const HOME_STILL_RATIO = 0.06;

// GSAP exposes this refresh flag at runtime; its current types omit it.
export function isHomeMotionRefreshing() {
  return Boolean(
    (ScrollTrigger as typeof ScrollTrigger & { isRefreshing?: boolean })
      .isRefreshing,
  );
}

/** Release carried overlays at the native scroll boundary, even when a fast
 * wheel input has left their scrubbed animation several frames behind. */
export function settleHomeScrubEndpoint(trigger: ScrollTrigger) {
  if (
    isHomeMotionRefreshing() ||
    (trigger.progress !== 0 && trigger.progress !== 1)
  ) return;
  trigger.getTween()?.progress(1);
  trigger.animation?.progress(trigger.progress);
}

/** Watch a visible carry's native boundary when Safari scroll callbacks lag.
 * Interior frames keep their scrub; endpoint rendering stays with the caller. */
export function createHomeScrubBoundaryGuard(
  getTrigger: () => ScrollTrigger | undefined,
  render: () => void,
) {
  let frame = 0;
  let active = false;
  let disposed = false;
  const cancel = () => {
    cancelAnimationFrame(frame);
    frame = 0;
  };
  const schedule = () => {
    if (!disposed && active && !frame) frame = requestAnimationFrame(check);
  };
  const check = () => {
    frame = 0;
    if (disposed || !active) return;
    // Refresh temporarily rewinds native scroll while measuring its pins.
    if (!isHomeMotionRefreshing()) {
      const trigger = getTrigger();
      if (
        trigger && trigger.end > trigger.start &&
        (window.scrollY <= trigger.start || window.scrollY >= trigger.end)
      ) {
        // Refresh the scroll cache and native scenes before releasing the carry.
        // Reentrant renders may cancel or rearm this watch for the final state.
        active = false;
        ScrollTrigger.update();
        settleHomeScrubEndpoint(trigger);
        render();
        return;
      }
    }
    schedule();
  };
  return {
    setActive(value: boolean) {
      if (disposed) return;
      active = value;
      if (active) schedule();
      else cancel();
    },
    dispose() {
      disposed = true;
      active = false;
      cancel();
    },
  };
}

/**
 * Desktop scroll budget for a scene whose timeline ends in an empty rest tween.
 * `range` is its current ScrollTrigger distance and `rest` the rest tween's
 * share of the reveal (rest duration / reveal duration). A bridge that starts
 * `lead` px before the scene ends would consume that rest, so the lead is
 * added on top of the `still` hold. Returns the factor to lengthen the scroll
 * track by and the new rest share; the reveal speed stays unchanged.
 */
export function stillHold(range: number, rest: number, lead = 0, still = HOME_STILL_RATIO) {
  // A chapter can mount while the page loader keeps it unmeasurable. Keep its
  // normal track length instead of writing Infinity into CSS.
  if (!(range > 0) || !Number.isFinite(range)) return { scale: 1, rest };
  const reveal = range / (1 + rest);
  const next = reveal * (1 + still) + lead;
  return { scale: next / range, rest: next / reveal - 1 };
}
