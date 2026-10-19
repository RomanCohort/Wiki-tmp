import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
  type MouseEvent,
  type PointerEvent,
  type RefObject,
} from "react";
import { Link } from "react-router-dom";
import { readerTrackStart, scrollReaderToTarget } from "../../utils";
import {
  WikiProtocolHoverCard,
} from "./WikiProtocolViewer";
import type { ExperimentProtocolPair } from "../../data/wet-lab/experimentProtocolPages";
import { stripWikiHeadingIndex } from "./wikiPageNumbering";

export interface WikiLineSidebarItem {
  id: string;
  index: string;
  label: string;
  meta?: string;
  children?: Array<{
    id: string;
    index: string;
    label: string;
    depth?: number;
  }>;
}

type WikiLineSidebarChild = NonNullable<WikiLineSidebarItem["children"]>[number];

/**
 * By default, deeper headings are listed only under the level-2 heading being
 * read, so long records stay short. Education opts into the full outline.
 */
function outlineRows(children: WikiLineSidebarChild[], activeChildId: string, showAllChildren = false) {
  const depthOf = (child: WikiLineSidebarChild) => child.depth ?? child.index.split(".").length;
  const baseDepth = Math.min(...children.map(depthOf));
  let groupId = "";
  const rows = children.map((child) => {
    const tertiary = depthOf(child) > baseDepth;
    if (!tertiary) groupId = child.id;
    return { child, tertiary, groupId };
  });
  const activeGroupId =
    rows.find((row) => row.child.id === activeChildId)?.groupId ?? "";
  return rows
    .filter((row) => showAllChildren || !row.tertiary || row.groupId === activeGroupId)
    .map(({ child, tertiary }) => ({
      child,
      tertiary,
      isTrail: !tertiary && child.id === activeGroupId,
    }));
}

export interface WikiLineSidebarLink {
  label: string;
  path: string;
}

interface WikiLineSidebarProps {
  activeId: string;
  activeChildId?: string;
  items: WikiLineSidebarItem[];
  links?: WikiLineSidebarLink[];
  label?: string;
  minimal?: boolean;
  showAllChildren?: boolean;
  structuredHeadings?: boolean;
  scrollContainerRef?: RefObject<HTMLElement | null>;
  protocolPairs?: ExperimentProtocolPair[];
  onOpenProtocolModal?: (pair: ExperimentProtocolPair, initialTab?: "flow" | "inventory") => void;
  onSelectSubheading?: (id: string) => void;
  id?: string;
  /** Jump animation for outline links (the mobile drawer uses "smooth"). */
  scrollBehavior?: ScrollBehavior;
  /**
   * Drawer mode: renders a close button and is called after any outline or
   * related link is chosen so the host can slide the drawer away.
   */
  onRequestClose?: () => void;
}

export function WikiLineSidebar({
  activeId,
  activeChildId = "",
  items,
  links = [],
  label = "On this page",
  minimal = false,
  showAllChildren = false,
  structuredHeadings = false,
  scrollContainerRef,
  protocolPairs,
  onOpenProtocolModal,
  onSelectSubheading,
  id,
  scrollBehavior = "instant",
  onRequestClose,
}: WikiLineSidebarProps) {
  const outlineRef = useRef<HTMLElement>(null);
  const ribbonRef = useRef<HTMLSpanElement>(null);
  const pointerIdRef = useRef<number | null>(null);
  const requestRibbonMeasureRef = useRef<() => void>(() => undefined);
  const [ribbonTargetId, setRibbonTargetId] = useState(
    activeChildId || activeId,
  );
  // A section's introduction belongs to that section even before its first
  // subsection reaches the reading line. Keep its full second level open.
  const expandedItemId = activeId;
  const activeTopChildId = useMemo(() => {
    if (!activeChildId || !expandedItemId) return "";
    const parent = items.find((item) => item.id === expandedItemId);
    const children = parent?.children;
    if (!children?.length) return "";
    const exact = children.find((child) => child.id === activeChildId);
    if (exact) return exact.id;
    if (structuredHeadings) return children.find((child) => activeChildId.startsWith(child.id))?.id ?? "";
    const prefix = `${activeChildId.split("-")[0]}-`;
    return children.find((child) => child.id.startsWith(prefix))?.id ?? "";
  }, [activeChildId, expandedItemId, items, structuredHeadings]);
  const drawerMode = Boolean(onRequestClose);

  const protocolMap = useMemo(() => {
    if (!protocolPairs?.length) return new Map<string, ExperimentProtocolPair>();
    return new Map(protocolPairs.map((pair) => [pair.targetId, pair]));
  }, [protocolPairs]);

  const [hoveredProtocol, setHoveredProtocol] = useState<{
    pair: ExperimentProtocolPair;
    rect: DOMRect;
  } | null>(null);
  const hoverTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) window.clearTimeout(hoverTimeoutRef.current);
    };
  }, []);
  const targetSignature = items
    .flatMap((item) => [
      item.id,
      ...(item.children?.map((child) => child.id) ?? []),
    ])
    .join("|");

  useEffect(() => {
    if (!minimal) return;

    const outline = outlineRef.current;
    const ribbon = ribbonRef.current;
    if (!outline || !ribbon) return;

    let frame = 0;
    const measure = () => {
      frame = 0;
      if (ribbon.classList.contains("is-dragging")) return;

      const stops = Array.from(
        outline.querySelectorAll<HTMLElement>("[data-outline-target]"),
      )
        .map((navigation) => {
          const id = navigation.dataset.outlineTarget ?? "";
          return {
            id,
            navigation,
            content: id ? document.getElementById(id) : null,
          };
        })
        .filter(
          (
            stop,
          ): stop is {
            id: string;
            navigation: HTMLElement;
            content: HTMLElement;
          } => Boolean(stop.id && stop.content),
        );
      if (!stops.length) return;

      const headerHeight =
        Number.parseFloat(
          getComputedStyle(document.documentElement).getPropertyValue(
            "--header-height",
          ),
        ) || 78;
      const scrollContainer = scrollContainerRef?.current;
      // Mobile drawer: the article is in document flow, so read against the
      // header instead of the (non-scrolling) frame.
      const readingLine = scrollContainer && !drawerMode
        ? scrollContainer.getBoundingClientRect().top +
        Math.min(112, scrollContainer.clientHeight * 0.22)
        : headerHeight + 108;
      let currentIndex = -1;
      let nextIndex = 0;

      stops.forEach((stop, index) => {
        if (stop.content.getBoundingClientRect().top <= readingLine) {
          currentIndex = index;
          nextIndex = Math.min(stops.length - 1, index + 1);
        }
      });

      if (currentIndex < 0) {
        currentIndex = 0;
        nextIndex = 0;
      }

      const current = stops[currentIndex];
      const next = stops[nextIndex];
      const currentBounds = current.navigation.getBoundingClientRect();
      const nextBounds = next.navigation.getBoundingClientRect();
      const ribbonBounds = ribbon.getBoundingClientRect();
      const currentCenter = currentBounds.top + currentBounds.height / 2;
      const nextCenter = nextBounds.top + nextBounds.height / 2;
      const contentDistance = Math.max(
        1,
        next.content.getBoundingClientRect().top -
        current.content.getBoundingClientRect().top,
      );
      const travelWindow = Math.min(
        220,
        Math.max(72, contentDistance * 0.32),
      );
      const nextTop = next.content.getBoundingClientRect().top;
      const rawTravel =
        currentIndex === nextIndex
          ? 0
          : Math.min(
            1,
            Math.max(
              0,
              (readingLine + travelWindow - nextTop) / travelWindow,
            ),
          );
      const travel = rawTravel * rawTravel * (3 - 2 * rawTravel);
      const knotCenter =
        currentCenter + (nextCenter - currentCenter) * travel;
      const progress = Math.min(
        1,
        Math.max(
          0,
          (knotCenter - ribbonBounds.top) /
          Math.max(1, ribbonBounds.height),
        ),
      );
      const nearest = travel < 0.5 ? current : next;

      // The ribbon alone consumes progress; keep its changing value out of
      // the navigation labels' inherited styles.
      const progressValue = progress.toFixed(4);
      if (ribbon.style.getPropertyValue("--wiki-outline-progress") !== progressValue) {
        ribbon.style.setProperty("--wiki-outline-progress", progressValue);
      }
      setRibbonTargetId((previous) =>
        previous === nearest.id ? previous : nearest.id,
      );
    };

    const requestMeasure = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };
    const record = outline.closest<HTMLElement>(".wiki-record");
    const scrollTarget: HTMLElement | Window =
      scrollContainerRef?.current ?? window;
    const resizeObserver =
      "ResizeObserver" in window ? new ResizeObserver(requestMeasure) : null;

    requestRibbonMeasureRef.current = requestMeasure;
    scrollTarget.addEventListener("scroll", requestMeasure, { passive: true });
    if (drawerMode) {
      window.addEventListener("scroll", requestMeasure, { passive: true });
    }
    window.addEventListener("resize", requestMeasure, { passive: true });
    outline.addEventListener("scroll", requestMeasure, { passive: true });
    if (record) resizeObserver?.observe(record);
    requestMeasure();

    return () => {
      if (frame) cancelAnimationFrame(frame);
      scrollTarget.removeEventListener("scroll", requestMeasure);
      window.removeEventListener("scroll", requestMeasure);
      window.removeEventListener("resize", requestMeasure);
      outline.removeEventListener("scroll", requestMeasure);
      resizeObserver?.disconnect();
      requestRibbonMeasureRef.current = () => undefined;
    };
  }, [minimal, scrollContainerRef, targetSignature, drawerMode]);

  useEffect(() => {
    const outline = outlineRef.current;
    const targetId = ribbonTargetId || activeChildId || activeId;
    const target = targetId
      ? outline?.querySelector<HTMLElement>(
        `[data-outline-target="${targetId}"]`,
      )
      : null;
    if (!outline || !target || !target.offsetParent) return;

    const outlineBounds = outline.getBoundingClientRect();
    const targetBounds = target.getBoundingClientRect();
    const upperGuard = outlineBounds.top + 76;
    const lowerGuard = outlineBounds.bottom - 42;
    const delta =
      targetBounds.top < upperGuard
        ? targetBounds.top - upperGuard
        : targetBounds.bottom > lowerGuard
          ? targetBounds.bottom - lowerGuard
          : 0;

    if (delta) {
      outline.scrollTo({
        top: outline.scrollTop + delta,
        behavior: "auto",
      });
    }

  }, [activeChildId, activeId, ribbonTargetId]);

  const jumpToSection = (
    event: MouseEvent<HTMLAnchorElement>,
    id: string,
  ) => {
    event.preventDefault();
    onSelectSubheading?.(id);
    window.history.replaceState(null, "", `#${id}`);
    const target = document.getElementById(id);
    if (!target) return;

    scrollReaderToTarget(target, scrollContainerRef?.current, scrollBehavior);
    onRequestClose?.();
  };

  const setScrollFromRibbon = (clientY: number) => {
    const outline = outlineRef.current;
    const ribbon = ribbonRef.current;
    const inner = scrollContainerRef?.current;
    const track = inner?.closest<HTMLElement>(".wiki-reader-track");
    if (!outline || !ribbon || !inner || !track) return;

    const ribbonBounds = ribbon.getBoundingClientRect();
    const progress = Math.min(
      1,
      Math.max(
        0,
        (clientY - ribbonBounds.top) / Math.max(1, ribbonBounds.height),
      ),
    );
    ribbon.style.setProperty("--wiki-outline-progress", progress.toFixed(4));
    document.documentElement.classList.add("is-thread-directing");

    // Scrub through the document timeline; the pinned frame's scrollTop is
    // projected from it by the reader scroll route.
    const start = readerTrackStart(track);
    const travel = Math.max(1, inner.scrollHeight - inner.clientHeight);
    window.scrollTo(0, start + travel * progress);
  };

  const beginRibbonDrag = (event: PointerEvent<HTMLSpanElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    event.preventDefault();
    pointerIdRef.current = event.pointerId;
    event.currentTarget.setPointerCapture(event.pointerId);
    event.currentTarget.classList.add("is-dragging");
    document.body.classList.add("is-wiki-outline-dragging");
    event.currentTarget.focus({ preventScroll: true });
    setScrollFromRibbon(event.clientY);
  };

  const moveRibbonDrag = (event: PointerEvent<HTMLSpanElement>) => {
    if (event.pointerId !== pointerIdRef.current) return;
    event.preventDefault();
    setScrollFromRibbon(event.clientY);
  };

  const endRibbonDrag = (event: PointerEvent<HTMLSpanElement>) => {
    if (event.pointerId !== pointerIdRef.current) return;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    pointerIdRef.current = null;
    event.currentTarget.classList.remove("is-dragging");
    document.body.classList.remove("is-wiki-outline-dragging");
    document.documentElement.classList.remove("is-thread-directing");
    requestAnimationFrame(() => requestRibbonMeasureRef.current());
  };

  const moveRibbonWithKeyboard = (event: KeyboardEvent<HTMLSpanElement>) => {
    if (items.length === 0) return;
    const activeIndex = Math.max(
      0,
      items.findIndex((item) => item.id === activeId),
    );
    let nextIndex = activeIndex;

    if (event.key === "ArrowDown" || event.key === "ArrowRight") {
      nextIndex += 1;
    } else if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
      nextIndex -= 1;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = items.length - 1;
    } else {
      return;
    }

    event.preventDefault();
    const target = items[Math.min(items.length - 1, Math.max(0, nextIndex))];
    const content = document.getElementById(target.id);
    if (!content) return;

    scrollReaderToTarget(content, scrollContainerRef?.current, "instant");
  };

  return (
    <aside
      ref={outlineRef}
      id={id}
      className="wiki-outline wiki-outline--marker"
      aria-label={label}
    >
      {onRequestClose ? (
        <div className="wiki-outline__drawer-head">
          <strong>{label}</strong>
          <button
            type="button"
            className="wiki-outline__close"
            aria-label="Close table of contents"
            onClick={onRequestClose}
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>
      ) : null}
      <nav aria-label={label}>
        <span
          ref={ribbonRef}
          className="wiki-outline__ribbon"
          role="slider"
          tabIndex={0}
          aria-label="Drag the ribbon to navigate this record"
          aria-orientation="vertical"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(
            (Math.max(0, items.findIndex((item) => item.id === activeId)) /
              Math.max(1, items.length - 1)) *
            100,
          )}
          onPointerDown={beginRibbonDrag}
          onPointerMove={moveRibbonDrag}
          onPointerUp={endRibbonDrag}
          onPointerCancel={endRibbonDrag}
          onKeyDown={moveRibbonWithKeyboard}
        >
          <i className="wiki-outline__ribbon-progress" />
          <i className="wiki-outline__ribbon-rest" />
          <svg
            className="ribbon-mark wiki-outline__ribbon-knot"
            viewBox="0 0 32 46"
          >
            <use href="#circure-ribbon-knot" />
          </svg>
        </span>
        {items.map((item) => {
          const hasChildren = Boolean(minimal && item.children?.length);
          const isExpanded = hasChildren && expandedItemId === item.id;

          return (
            <div
              className={`wiki-outline__group ${isExpanded ? "is-expanded" : ""
                }`}
              key={item.id}
            >
              <a
                href={`#${item.id}`}
                className={`wiki-outline__primary ${activeId === item.id ? "is-active" : ""
                  }`}
                data-outline-target={item.id}
                aria-current={activeId === item.id ? "location" : undefined}
                aria-expanded={hasChildren ? isExpanded : undefined}
                onClick={(event) => jumpToSection(event, item.id)}
                title={item.label}
              >
                <span className="wiki-outline__index">
                  {minimal && /^\d+$/.test(item.index)
                    ? Number(item.index)
                    : item.index}
                </span>
                <span className="wiki-outline__copy">
                  {!minimal && item.meta ? <small>{item.meta}</small> : null}
                  <strong>{item.label}</strong>
                </span>
              </a>

              {isExpanded && item.children ? (
                <div
                  className="wiki-outline__subnav"
                  aria-label={`${item.label} subsections`}
                >
                  {outlineRows(item.children, activeTopChildId || activeChildId, showAllChildren).map(({ child, tertiary, isTrail }) => {
                    const childPair = protocolMap.get(child.id);
                    const isActive = (activeTopChildId || ribbonTargetId) === child.id;
                    const childIndex = !structuredHeadings && /^\d+$/.test(item.index)
                      ? child.index.replace(/^\d+(?=\.)/, String(Number(item.index)))
                      : child.index;
                    const childLabel = stripWikiHeadingIndex(child.label, child.index).trim();
                    return (
                      <a
                        className={`wiki-outline__secondary wiki-outline__secondary--depth-${Math.min(child.depth ?? child.index.split(".").length, 4)}${
                          tertiary ? " is-tertiary" : ""
                        }${isActive ? " is-active" : ""}${
                          isTrail && !isActive ? " is-trail" : ""
                        }`}
                        href={`#${child.id}`}
                        data-outline-target={child.id}
                        onClick={(event) => jumpToSection(event, child.id)}
                        onMouseEnter={(event) => {
                          if (!childPair || !childPair.hasFigure) return;
                          if (hoverTimeoutRef.current) window.clearTimeout(hoverTimeoutRef.current);
                          const target = event.currentTarget;
                          hoverTimeoutRef.current = window.setTimeout(() => {
                            setHoveredProtocol({
                              pair: childPair,
                              rect: target.getBoundingClientRect(),
                            });
                          }, 160);
                        }}
                        onMouseLeave={() => {
                          if (hoverTimeoutRef.current) window.clearTimeout(hoverTimeoutRef.current);
                          hoverTimeoutRef.current = window.setTimeout(() => {
                            setHoveredProtocol(null);
                          }, 220);
                        }}
                        aria-current={isActive ? "location" : undefined}
                        title={`${childIndex} ${childLabel}`.trim()}
                        key={child.id}
                      >
                        <span className="wiki-outline__sub-index">
                          {childIndex}
                        </span>
                        <strong>{childLabel}</strong>
                        {childPair && childPair.hasFigure ? (
                          <button
                            type="button"
                            className="wiki-outline__protocol-icon"
                            title="实验图谱速览 (点击可直接放大查看)"
                            onClick={(e) => {
                              e.stopPropagation();
                              e.preventDefault();
                              onOpenProtocolModal?.(childPair);
                            }}
                          >
                            <svg viewBox="0 0 16 16" width="12" height="12" fill="currentColor" aria-hidden="true">
                              <path d="M14 3H2a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1zm-1 8H3V5h10v6z" />
                              <circle cx="5.5" cy="7.5" r="1.2" />
                              <path d="M12 10.2 9.5 7.5 7 10.2h5z" />
                            </svg>
                          </button>
                        ) : null}
                      </a>
                    );
                  })}
                </div>
              ) : null}
            </div>
          );
        })}
      </nav>

      {links.length ? (
        <div className="wiki-outline__related">
          <span className="wiki-outline__related-title">Related</span>
          {links.map((link) => (
            <Link key={link.path} to={link.path} onClick={onRequestClose}>
              <span>{link.label}</span>
              <span className="wiki-outline__link-arrow" aria-hidden="true">
                ↗
              </span>
            </Link>
          ))}
        </div>
      ) : null}

      {hoveredProtocol && (
        <WikiProtocolHoverCard
          pair={hoveredProtocol.pair}
          anchorRect={hoveredProtocol.rect}
          onOpenModal={(pair, tab) => {
            setHoveredProtocol(null);
            onOpenProtocolModal?.(pair, tab);
          }}
          onMouseEnter={() => {
            if (hoverTimeoutRef.current) window.clearTimeout(hoverTimeoutRef.current);
          }}
          onMouseLeave={() => {
            if (hoverTimeoutRef.current) window.clearTimeout(hoverTimeoutRef.current);
            hoverTimeoutRef.current = window.setTimeout(() => {
              setHoveredProtocol(null);
            }, 200);
          }}
        />
      )}
    </aside>
  );
}
