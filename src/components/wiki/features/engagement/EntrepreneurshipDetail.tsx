/* eslint-disable react-refresh/only-export-components */
import {
  useEffect,
  useId,
  useRef,
  useState,
  type ReactNode,
  type PointerEvent,
  type FocusEvent,
  type MouseEvent,
  type KeyboardEvent,
} from "react";
import type { EntrepreneurshipOrbitTone } from "../../../../data/engagement/entrepreneurshipPage";

/** One reading-strip interaction for the four Entrepreneurship diagrams. */
export function useEntrepreneurshipDetail() {
  const detailId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const pinnedRef = useRef(false);
  const suppressFocusRef = useRef(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const close = () => {
    pinnedRef.current = false;
    setActiveIndex(null);
  };

  useEffect(() => {
    if (activeIndex === null) return;
    const onEscape = (event: globalThis.KeyboardEvent) => {
      if (event.key !== "Escape") return;
      pinnedRef.current = false;
      setActiveIndex(null);
    };
    const onOutside = (event: globalThis.PointerEvent) => {
      if (rootRef.current?.contains(event.target as Node)) return;
      pinnedRef.current = false;
      setActiveIndex(null);
    };
    document.addEventListener("keydown", onEscape);
    document.addEventListener("pointerdown", onOutside);
    return () => {
      document.removeEventListener("keydown", onEscape);
      document.removeEventListener("pointerdown", onOutside);
    };
  }, [activeIndex]);

  const triggerProps = (index: number) => ({
    "aria-expanded": activeIndex === index,
    "aria-controls": activeIndex === index ? detailId : undefined,
    onPointerEnter: (event: PointerEvent<HTMLButtonElement>) => {
      if (event.pointerType === "touch") return;
      triggerRef.current = event.currentTarget;
      setActiveIndex(index);
    },
    onFocus: (event: FocusEvent<HTMLButtonElement>) => {
      if (suppressFocusRef.current) return;
      triggerRef.current = event.currentTarget;
      setActiveIndex(index);
    },
    onClick: (event: MouseEvent<HTMLButtonElement>) => {
      triggerRef.current = event.currentTarget;
      pinnedRef.current = true;
      setActiveIndex(index);
    },
    // The page reader otherwise captures Space to scroll the article.
    onKeyDown: (event: KeyboardEvent<HTMLButtonElement>) => {
      if (event.key === " " || event.key === "Enter") event.stopPropagation();
    },
  });

  const closeDetail = () => {
    close();
    suppressFocusRef.current = true;
    triggerRef.current?.focus({ preventScroll: true });
    suppressFocusRef.current = false;
  };

  return {
    activeIndex,
    detailId,
    triggerProps,
    closeDetail,
    containerProps: {
      ref: rootRef,
      onPointerLeave: () => {
        if (
          !pinnedRef.current &&
          !rootRef.current?.contains(document.activeElement)
        )
          close();
      },
      onBlur: (event: FocusEvent<HTMLDivElement>) => {
        if (
          !event.currentTarget.contains(event.relatedTarget) &&
          !pinnedRef.current
        )
          close();
      },
    },
  };
}

export function EntrepreneurshipDetail({
  id,
  title,
  tone,
  group,
  image,
  above = false,
  onClose,
  children,
}: {
  id: string;
  title: string;
  tone: EntrepreneurshipOrbitTone;
  group?: string;
  image?: string;
  above?: boolean;
  onClose: () => void;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className={`entrepreneurship-detail${above ? " entrepreneurship-detail--above" : ""}`}
      data-orbit-tone={tone}
      role="region"
      aria-labelledby={`${id}-title`}
      tabIndex={0}
      onKeyDown={(event) => {
        if (
          [
            "ArrowDown",
            "ArrowUp",
            "PageDown",
            "PageUp",
            " ",
            "Home",
            "End",
          ].includes(event.key)
        ) {
          event.stopPropagation();
        }
      }}
    >
      <button
        className="entrepreneurship-detail__close"
        type="button"
        aria-label="Close details"
        onClick={onClose}
      >
        <svg viewBox="0 0 20 20" aria-hidden="true">
          <path d="m5 5 10 10M15 5 5 15" />
        </svg>
      </button>
      {group ? <p className="entrepreneurship-detail__group">{group}</p> : null}
      {image ? (
        <img
          className="entrepreneurship-detail__image"
          src={image}
          alt={title}
          loading="lazy"
        />
      ) : null}
      <h3 id={`${id}-title`}>{title}</h3>
      <div className="entrepreneurship-detail__body">{children}</div>
    </section>
  );
}
