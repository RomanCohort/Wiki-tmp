import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import "../../../styles/features/drift-wall.css";

gsap.registerPlugin(useGSAP);

export interface DriftWallPhoto {
  id: string;
  src: string;
  alt: string;
}

/** Perspective and alternating columns inspired by React Bits' Drift Wall.
 * Only the visible wall animates; hover hit tests follow its moving geometry.
 * The parent supplies a stable, keyboard-accessible photo browser because
 * drifting copies cannot provide a reliable tab order.
 */
export function DriftWall({
  photos,
  paused,
  onSelect,
}: {
  photos: readonly DriftWallPhoto[];
  paused: boolean;
  onSelect: (index: number) => void;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [columns, setColumns] = useState(5);
  const [visible, setVisible] = useState(false);
  const [documentVisible, setDocumentVisible] = useState(true);
  const playbackRef = useRef<
    ((state: { paused: boolean; suspended: boolean }) => void) | null
  >(null);
  const playbackStateRef = useRef({ paused: true, suspended: true });

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const narrow = window.matchMedia("(max-width: 700px)");
    const updateColumns = () => setColumns(narrow.matches ? 3 : 5);
    const updateVisibility = () => setDocumentVisible(!document.hidden);
    updateColumns();
    updateVisibility();
    narrow.addEventListener("change", updateColumns);
    document.addEventListener("visibilitychange", updateVisibility);
    const observer = new IntersectionObserver(([entry]) => {
      setVisible(entry.isIntersecting);
    });
    observer.observe(root);
    return () => {
      observer.disconnect();
      narrow.removeEventListener("change", updateColumns);
      document.removeEventListener("visibilitychange", updateVisibility);
    };
  }, []);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;
      const media = gsap.matchMedia();
      media.add(
        {
          all: "(min-width: 0px)",
          reduced: "(prefers-reduced-motion: reduce)",
          fine: "(hover: hover) and (pointer: fine)",
        },
        (context) => {
          const { reduced, fine } = context.conditions!;
          let activeTile: HTMLButtonElement | null = null;
          let activeColumn = -1;
          let pointer: { x: number; y: number } | null = null;
          let checkingPointer = false;
          const tracks = [
            ...root.querySelectorAll<HTMLElement>(".drift-wall__track"),
          ];
          const speeds = reduced
            ? []
            : tracks.map((track, column) => {
                const style = getComputedStyle(track);
                const reverse = column % 2 === 1;
                const loop = gsap.fromTo(
                  track,
                  { yPercent: reverse ? -100 / 3 : 0 },
                  {
                    yPercent: reverse ? 0 : -100 / 3,
                    duration: Number(
                      style.getPropertyValue("--drift-duration"),
                    ),
                    ease: "none",
                    repeat: -1,
                    paused: true,
                  },
                );
                loop
                  .progress(Number(style.getPropertyValue("--drift-phase")))
                  .timeScale(0);
                const rateTo = gsap.quickTo(loop, "timeScale", {
                  duration: 0.6,
                  ease: "power2.out",
                  onComplete: () => {
                    if (loop.timeScale() === 0) loop.pause();
                  },
                });
                return { loop, rateTo, target: -1 };
              });
          const updateSpeeds = () => {
            const state = playbackStateRef.current;
            speeds.forEach((speed, column) => {
              const target =
                state.paused || state.suspended || activeColumn === column
                  ? 0
                  : 1;
              if (state.suspended) {
                speed.rateTo.tween.pause();
                speed.loop.pause().timeScale(0);
                speed.target = -1;
              } else if (speed.target !== target) {
                speed.target = target;
                speed.loop.play();
                speed.rateTo.tween.duration(target === 0 ? 0.45 : 0.7);
                speed.rateTo(target);
              }
            });
          };
          const activate = (tile: HTMLButtonElement | null) => {
            if (tile === activeTile) return;
            activeTile?.classList.remove("is-active");
            activeTile = tile;
            activeTile?.classList.add("is-active");
            activeColumn = tile ? Number(tile.dataset.column) : -1;
            updateSpeeds();
          };
          const checkPointer = () => {
            if (!pointer || playbackStateRef.current.suspended) return;
            // Hit the stable button, never the lifted image or a transparent track.
            const hit = document.elementFromPoint(pointer.x, pointer.y);
            const tile =
              hit?.closest<HTMLButtonElement>(".drift-wall__tile") ?? null;
            activate(tile && root.contains(tile) ? tile : null);
          };
          const stopChecking = () => {
            gsap.ticker.remove(checkPointer);
            checkingPointer = false;
          };
          const tiltX = gsap.quickTo(root, "--drift-pointer-x", {
            duration: 0.8,
            ease: "power2.out",
          });
          const tiltY = gsap.quickTo(root, "--drift-pointer-y", {
            duration: 0.8,
            ease: "power2.out",
          });
          const move = (event: PointerEvent) => {
            if (event.pointerType === "touch") return;
            pointer = { x: event.clientX, y: event.clientY };
            checkPointer();
            if (
              !reduced &&
              !checkingPointer &&
              !playbackStateRef.current.suspended
            ) {
              gsap.ticker.add(checkPointer);
              checkingPointer = true;
            }
            if (reduced) return;
            const rect = root.getBoundingClientRect();
            tiltX(((event.clientY - rect.top) / rect.height - 0.5) * -4);
            tiltY(((event.clientX - rect.left) / rect.width - 0.5) * 6);
          };
          const reset = () => {
            pointer = null;
            stopChecking();
            activate(null);
            if (!reduced) {
              tiltX(0);
              tiltY(0);
            }
          };
          playbackRef.current = (state) => {
            playbackStateRef.current = state;
            if (state.suspended) reset();
            updateSpeeds();
          };
          updateSpeeds();
          if (fine) {
            root.addEventListener("pointerenter", move);
            root.addEventListener("pointermove", move);
            root.addEventListener("pointerleave", reset);
          }
          return () => {
            playbackRef.current = null;
            stopChecking();
            activeTile?.classList.remove("is-active");
            root.removeEventListener("pointerenter", move);
            root.removeEventListener("pointermove", move);
            root.removeEventListener("pointerleave", reset);
          };
        },
      );
      return () => media.revert();
    },
    { scope: rootRef, dependencies: [columns, photos], revertOnUpdate: true },
  );

  useEffect(() => {
    const state = { paused, suspended: !visible || !documentVisible };
    playbackStateRef.current = state;
    playbackRef.current?.(state);
  }, [paused, visible, documentVisible, columns, photos]);

  const groups = Array.from({ length: columns }, (_, column) =>
    photos
      .map((photo, index) => ({ ...photo, index }))
      .filter((_, index) => index % columns === column),
  );

  return (
    <div
      ref={rootRef}
      className="drift-wall"
      data-running={!paused && visible && documentVisible}
      aria-hidden="true"
    >
      <div className="drift-wall__plane">
        {groups.map((group, column) => (
          <div className="drift-wall__column" key={column}>
            <div className="drift-wall__track">
              {[0, 1, 2].map((copy) => (
                <div className="drift-wall__group" key={copy}>
                  {group.map((photo) => (
                    <button
                      className="drift-wall__tile"
                      key={photo.id}
                      data-column={column}
                      data-photo-index={photo.index}
                      tabIndex={-1}
                      aria-label={`View photograph ${photo.index + 1}`}
                      onClick={() => onSelect(photo.index)}
                    >
                      <span className="drift-wall__image">
                        <img
                          src={photo.src}
                          alt={photo.alt}
                          decoding="async"
                          draggable={false}
                        />
                      </span>
                    </button>
                  ))}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
