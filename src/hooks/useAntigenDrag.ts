import { useEffect, type RefObject } from "react";

type PiecePosition = {
  left: number;
  top: number;
  width: number;
  height: number;
};

type Drag = {
  pointerId: number;
  button: HTMLButtonElement;
  startX: number;
  startY: number;
  offsetX: number;
  offsetY: number;
  width: number;
  height: number;
  moved: boolean;
};

export function useAntigenDrag(
  root: RefObject<HTMLDivElement | null>,
  onSelect: (index: number) => void,
) {
  useEffect(() => {
    const scene = root.current;
    if (!scene) return;
    const ring = scene.querySelector<HTMLElement>("[data-antigen-ring]")!;
    const installed = scene.querySelector<SVGGElement>(
      "[data-antigen-installed]",
    )!;
    const installedImage = installed.querySelector("image")!;
    const ghost = scene.querySelector<HTMLElement>("[data-antigen-ghost]")!;
    const ghostImage = ghost.querySelector("image")!;
    const buttons = [
      ...scene.querySelectorAll<HTMLButtonElement>("[data-antigen-option]"),
    ];
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const listeners = new AbortController();
    const signal = listeners.signal;
    let drag: Drag | null = null;
    const animations: Animation[] = [];
    let finishTimer: ReturnType<typeof setTimeout> | undefined;
    let clickTimer: ReturnType<typeof setTimeout> | undefined;
    let suppressedButton: HTMLButtonElement | null = null;

    function cancelAnimations() {
      animations.forEach((animation) => animation.cancel());
      animations.length = 0;
    }

    function stopAnimation() {
      clearTimeout(finishTimer);
      finishTimer = undefined;
      cancelAnimations();
      ghost.hidden = true;
      installed.style.opacity = "1";
      installedImage.setAttribute("filter", scene!.dataset.selectedFilter!);
    }

    function resetDrag() {
      if (!drag) return;
      const previous = drag;
      drag = null;
      previous.button.classList.remove("is-held");
      if (previous.button.hasPointerCapture(previous.pointerId)) {
        previous.button.releasePointerCapture(previous.pointerId);
      }
      ghost.hidden = true;
      installed.style.opacity = "1";
      scene!.classList.remove("is-dragging", "is-near");
    }

    function suppressPointerClick(button: HTMLButtonElement) {
      suppressedButton = button;
      clearTimeout(clickTimer);
      clickTimer = setTimeout(() => (suppressedButton = null), 350);
    }

    function interruptInteraction() {
      if (drag) suppressPointerClick(drag.button);
      resetDrag();
      stopAnimation();
    }

    function cancelPointerDrag() {
      // Releasing capture after a successful drop also emits lostpointercapture.
      if (drag) interruptInteraction();
    }

    function position(x: number, y: number): PiecePosition {
      return {
        left: x - drag!.offsetX,
        top: y - drag!.offsetY,
        width: drag!.width,
        height: drag!.height,
      };
    }

    // Test the visible piece against the slot, not a large area around the pointer.
    function isAligned(piece: PiecePosition) {
      const bounds = ring.getBoundingClientRect();
      const dx =
        piece.left + piece.width / 2 - (bounds.left + bounds.width / 2);
      const dy =
        piece.top +
        (piece.height * 25) / 65 -
        (bounds.top + (bounds.height * 25) / 300);
      const rx = Math.max(18, Math.min(42, bounds.width * 0.14));
      const ry = Math.max(16, Math.min(28, bounds.height * 0.085));
      return (dx / rx) ** 2 + (dy / ry) ** 2 <= 1;
    }

    function install(index: number, origin?: PiecePosition, immediate = false) {
      stopAnimation();
      const filter = buttons[index].dataset.filter!;
      const finish = () => {
        finishTimer = undefined;
        cancelAnimations();
        ghost.hidden = true;
        installed.style.opacity = "1";
        installedImage.setAttribute("filter", filter);
        onSelect(index);
        if (!reducedMotion.matches) {
          animations.push(
            installed.animate(
              [
                { transform: "translateY(-1px)" },
                { transform: "translateY(0)" },
              ],
              { duration: 160, easing: "cubic-bezier(0.22, 1, 0.36, 1)" },
            ),
          );
        }
      };
      if (reducedMotion.matches || immediate) {
        finish();
        return;
      }
      const bounds = ring.getBoundingClientRect();
      const stage = scene!.getBoundingClientRect();
      const start =
        origin ?? buttons[index].querySelector("svg")!.getBoundingClientRect();
      const end = {
        left: bounds.left + (bounds.width * 80) / 300,
        top: bounds.top,
        width: (bounds.width * 140) / 300,
        height: (bounds.width * 65) / 300,
      };
      const duration = origin
        ? 190
        : Math.min(
            420,
            Math.max(
              300,
              Math.hypot(start.left - end.left, start.top - end.top) * 0.75,
            ),
          );
      // A shallow arc approaches the slot without a large detour.
      const controlX =
        Math.max(start.left, end.left) +
        (origin ? 0 : Math.min(24, bounds.width * 0.08));
      const controlY = end.top + (start.top - end.top) * 0.35;
      const keyframes = Array.from({ length: 21 }, (_, step) => {
        const t = step / 20;
        const u = 1 - t;
        const left =
          u * u * start.left + 2 * u * t * controlX + t * t * end.left;
        const top = u * u * start.top + 2 * u * t * controlY + t * t * end.top;
        const scaleX =
          (start.width + (end.width - start.width) * t) / end.width;
        const scaleY =
          (start.height + (end.height - start.height) * t) / end.height;
        return {
          offset: t,
          transform: `translate(${left - stage.left}px, ${top - stage.top}px) rotate(${-1.5 * Math.sin(Math.PI * t)}deg) scale(${scaleX}, ${scaleY})`,
        };
      });
      // Animate transforms at a fixed size, avoiding layout on every frame.
      ghost.style.width = `${end.width}px`;
      ghost.style.height = `${end.height}px`;
      ghost.style.transformOrigin = "0 0";
      ghost.hidden = false;
      ghostImage.setAttribute("filter", filter);
      animations.push(
        installed.animate([{ opacity: 1 }, { opacity: 0.08 }], {
          duration: duration * 0.65,
          easing: "ease-in-out",
          fill: "forwards",
        }),
        ghost.animate(keyframes, {
          duration,
          easing: "cubic-bezier(0.2, 0.65, 0.3, 1)",
          fill: "forwards",
        }),
      );
      finishTimer = setTimeout(finish, duration);
    }

    buttons.forEach((button, index) => {
      button.addEventListener(
        "pointerdown",
        (event) => {
          if (event.button !== 0 || !event.isPrimary || drag) return;
          const art = button.querySelector("svg")!.getBoundingClientRect();
          stopAnimation();
          drag = {
            pointerId: event.pointerId,
            button,
            startX: event.clientX,
            startY: event.clientY,
            offsetX: event.clientX - art.left,
            offsetY: event.clientY - art.top,
            width: art.width,
            height: art.height,
            moved: false,
          };
          button.setPointerCapture(event.pointerId);
        },
        { signal },
      );
      button.addEventListener(
        "pointermove",
        (event) => {
          if (!drag || drag.pointerId !== event.pointerId) return;
          if (
            !drag.moved &&
            Math.hypot(
              event.clientX - drag.startX,
              event.clientY - drag.startY,
            ) < 7
          ) {
            return;
          }
          if (!drag.moved) {
            drag.moved = true;
            button.classList.add("is-held");
            scene.classList.add("is-dragging");
            scene.style.setProperty("--incoming-color", button.dataset.color!);
            ghostImage.setAttribute("filter", button.dataset.filter!);
            ghost.hidden = false;
          }
          const piece = position(event.clientX, event.clientY);
          const stage = scene.getBoundingClientRect();
          ghost.style.width = piece.width + "px";
          ghost.style.height = piece.height + "px";
          ghost.style.transform =
            "translate(" +
            (piece.left - stage.left) +
            "px," +
            (piece.top - stage.top) +
            "px)";
          scene.classList.toggle("is-near", isAligned(piece));
          installed.style.opacity = "0.08";
        },
        { signal },
      );
      button.addEventListener(
        "pointerup",
        (event) => {
          if (!drag || drag.pointerId !== event.pointerId) return;
          const moved = drag.moved;
          const piece = position(event.clientX, event.clientY);
          const aligned = isAligned(piece);
          resetDrag();
          if (!moved) return;
          // Suppress only this drag's generated click; keyboard activation stays available.
          suppressPointerClick(button);
          if (aligned) install(index, piece);
        },
        { signal },
      );
      button.addEventListener("pointercancel", cancelPointerDrag, { signal });
      button.addEventListener("lostpointercapture", cancelPointerDrag, {
        signal,
      });
      button.addEventListener(
        "keydown",
        (event) => {
          if (event.key !== "Enter" && event.key !== " ") return;
          // Own keyboard activation so the native click cannot install twice.
          event.preventDefault();
          if (event.repeat) return;
          cancelPointerDrag();
          // Focus may scroll the page; commit before that cancels visual travel.
          install(index, undefined, true);
        },
        { signal },
      );
      button.addEventListener(
        "keyup",
        (event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
          }
        },
        { signal },
      );
      button.addEventListener(
        "click",
        (event) => {
          if (suppressedButton === button && event.detail !== 0) {
            suppressedButton = null;
            clearTimeout(clickTimer);
            return;
          }
          install(index);
        },
        { signal },
      );
    });

    scene.addEventListener(
      "keydown",
      (event) => {
        if (event.key === "Escape" && drag) {
          event.preventDefault();
          interruptInteraction();
        }
      },
      { signal },
    );
    window.addEventListener("blur", cancelPointerDrag, { signal });
    window.addEventListener("resize", interruptInteraction, { signal });
    window.addEventListener("scroll", interruptInteraction, {
      signal,
      passive: true,
    });
    reducedMotion.addEventListener("change", interruptInteraction, { signal });
    const chapter = scene.closest(".story-chapter");
    let chapterActive = chapter?.classList.contains("is-current") ?? false;
    const chapterObserver = new MutationObserver(() => {
      const nextActive = chapter?.classList.contains("is-current") ?? false;
      if (chapterActive && !nextActive) interruptInteraction();
      chapterActive = nextActive;
    });
    if (chapter) {
      chapterObserver.observe(chapter, {
        attributes: true,
        attributeFilter: ["class"],
      });
    }
    return () => {
      listeners.abort();
      chapterObserver.disconnect();
      resetDrag();
      stopAnimation();
      clearTimeout(clickTimer);
    };
  }, [root, onSelect]);
}
