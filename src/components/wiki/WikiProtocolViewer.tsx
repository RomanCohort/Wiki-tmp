import {
  useEffect,
  useId,
  useRef,
  useState,
  type CSSProperties,
  type TouchEvent,
} from "react";
import { createPortal } from "react-dom";
import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Expand,
  Shrink,
  X,
} from "lucide-react";
import {
  experimentProtocolImage,
  experimentProtocolLocalImage,
  type ExperimentProtocolPair,
} from "../../data/wet-lab/experimentProtocolPages";
import "../../styles/features/experiments-protocol.css";

/**
 * Floating hover preview card displayed beside the TOC item.
 */
export function WikiProtocolHoverCard({
  pair,
  anchorRect,
  onOpenModal,
  onMouseEnter,
  onMouseLeave,
}: {
  pair: ExperimentProtocolPair;
  anchorRect: DOMRect;
  onOpenModal: (
    pair: ExperimentProtocolPair,
    initialTab?: "flow" | "inventory",
  ) => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}) {
  const [activeTab, setActiveTab] = useState<"flow" | "inventory">("flow");
  const popoverWidth = 320;
  const popoverHeight = 270;
  const padding = 12;

  let left = anchorRect.right + padding;
  if (left + popoverWidth > window.innerWidth - 16) {
    left = Math.max(16, anchorRect.left - popoverWidth - padding);
  }

  let top = anchorRect.top - 20;
  if (top + popoverHeight > window.innerHeight - 16) {
    top = Math.max(16, window.innerHeight - popoverHeight - 16);
  }

  const style: CSSProperties = {
    position: "fixed",
    top: `${Math.round(top)}px`,
    left: `${Math.round(left)}px`,
    width: `${popoverWidth}px`,
    zIndex: 9999,
  };
  const currentPage = activeTab === "flow" ? pair.flowPage : pair.inventoryPage;
  const currentLabel =
    activeTab === "flow" ? "Workflow" : "Materials & equipment";

  return createPortal(
    <div
      className="wiki-protocol-popover"
      style={style}
      role="tooltip"
      aria-label={`${pair.code} ${pair.title} preview`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="wiki-protocol-popover__header">
        <div className="wiki-protocol-popover__badge-row">
          <span className="wiki-protocol-popover__badge">{pair.code}</span>
        </div>
        <h4 className="wiki-protocol-popover__title">{pair.title}</h4>
      </div>

      <div className="wiki-protocol-popover__tabs">
        <button
          type="button"
          className={`wiki-protocol-popover__tab ${activeTab === "flow" ? "is-active" : ""}`}
          onClick={(event) => {
            event.stopPropagation();
            setActiveTab("flow");
          }}
          disabled={typeof pair.flowPage !== "number"}
        >
          P{pair.flowPage ?? "—"} · Workflow
        </button>
        <button
          type="button"
          className={`wiki-protocol-popover__tab ${activeTab === "inventory" ? "is-active" : ""}`}
          onClick={(event) => {
            event.stopPropagation();
            setActiveTab("inventory");
          }}
          disabled={typeof pair.inventoryPage !== "number"}
        >
          P{pair.inventoryPage ?? "—"} · Materials
        </button>
      </div>

      <button
        type="button"
        className="wiki-protocol-popover__image-wrap"
        onClick={() => onOpenModal(pair, activeTab)}
        title="Open full-size image"
        aria-label={`Open ${pair.title}, ${currentLabel}`}
        disabled={typeof currentPage !== "number"}
      >
        {typeof currentPage === "number" ? (
          <img
            src={experimentProtocolImage(currentPage)}
            alt={`${pair.title} - ${currentLabel}`}
            className="wiki-protocol-popover__thumb"
            loading="eager"
            onError={(event) => {
              event.currentTarget.src =
                experimentProtocolLocalImage(currentPage);
            }}
          />
        ) : (
          <span className="wiki-protocol-popover__placeholder">
            Illustration pending
          </span>
        )}
        <span
          className="wiki-protocol-popover__overlay-hint"
          aria-hidden="true"
        >
          <Expand size={18} />
        </span>
      </button>

      <div className="wiki-protocol-popover__footer">
        <span className="wiki-protocol-popover__page-hint">
          P{currentPage ?? "—"} · {currentLabel}
        </span>
        <button
          type="button"
          className="wiki-protocol-popover__expand-btn"
          aria-label="Open full-size image"
          title="Open full-size image"
          onClick={() => onOpenModal(pair, activeTab)}
          disabled={typeof currentPage !== "number"}
        >
          <Expand size={18} aria-hidden="true" />
        </button>
      </div>
    </div>,
    document.body,
  );
}

/**
 * Top-layer viewer shared by the sidebar and the vertical experiment map.
 * The image itself is deliberately single-frame: the left/right controls and
 * touch swipe switch between the workflow and materials image for this node.
 */
export function WikiProtocolModal({
  pair,
  initialTab = "flow",
  onClose,
  onJumpToArticle,
}: {
  pair: ExperimentProtocolPair | null;
  initialTab?: "flow" | "inventory";
  onClose: () => void;
  onJumpToArticle?: () => void;
}) {
  const [activeTab, setActiveTab] = useState<"flow" | "inventory">(initialTab);
  const [showActualSize, setShowActualSize] = useState(false);
  const titleId = useId();
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const surfaceRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setActiveTab(
      initialTab === "inventory" && typeof pair?.inventoryPage === "number"
        ? "inventory"
        : "flow",
    );
    setShowActualSize(false);
    touchStart.current = null;
  }, [initialTab, pair]);

  useEffect(() => {
    if (!pair) return;
    const previousOverflow = document.body.style.overflow;
    const previousFocus =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    document.body.style.overflow = "hidden";
    surfaceRef.current?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus({ preventScroll: true });
    };
  }, [pair]);

  useEffect(() => {
    if (!pair) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      } else if (
        event.key === "ArrowLeft" &&
        typeof pair.flowPage === "number"
      ) {
        event.preventDefault();
        setActiveTab("flow");
        setShowActualSize(false);
      } else if (
        event.key === "ArrowRight" &&
        typeof pair.inventoryPage === "number"
      ) {
        event.preventDefault();
        setActiveTab("inventory");
        setShowActualSize(false);
      } else if (event.key === "Tab") {
        const controls =
          surfaceRef.current?.querySelectorAll<HTMLButtonElement>(
            "button:not(:disabled)",
          );
        const first = controls?.[0];
        const last = controls?.[controls.length - 1];
        if (
          event.shiftKey &&
          (document.activeElement === first ||
            document.activeElement === surfaceRef.current)
        ) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, pair]);

  if (!pair) return null;

  const currentPage = activeTab === "flow" ? pair.flowPage : pair.inventoryPage;
  const currentLabel =
    activeTab === "flow" ? "Workflow" : "Materials & equipment";
  const currentSize = activeTab === "flow" ? pair.flowSize : pair.inventorySize;
  const hasFlow = typeof pair.flowPage === "number";
  const hasInventory = typeof pair.inventoryPage === "number";

  const switchTab = (tab: "flow" | "inventory") => {
    if (tab === "flow" && !hasFlow) return;
    if (tab === "inventory" && !hasInventory) return;
    setActiveTab(tab);
    setShowActualSize(false);
  };

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    const touch = event.changedTouches[0];
    touchStart.current =
      touch && !showActualSize ? { x: touch.clientX, y: touch.clientY } : null;
  };

  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    const start = touchStart.current;
    const touch = event.changedTouches[0];
    touchStart.current = null;
    if (!start || !touch) return;
    const deltaX = touch.clientX - start.x;
    const deltaY = touch.clientY - start.y;
    if (Math.abs(deltaX) < 48 || Math.abs(deltaX) <= Math.abs(deltaY)) return;
    if (deltaX < 0) switchTab("inventory");
    if (deltaX > 0) switchTab("flow");
  };

  return createPortal(
    <div
      className="wiki-protocol-modal"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        ref={surfaceRef}
        className="wiki-protocol-modal__surface"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
      >
        <header className="wiki-protocol-modal__header">
          <div className="wiki-protocol-modal__meta">
            <h4 id={titleId}>
              <span className="wiki-protocol-modal__code">{pair.code}</span>
              {pair.title}
            </h4>
          </div>

          <div className="wiki-protocol-modal__header-actions">
            {onJumpToArticle ? (
              <button
                type="button"
                className="wiki-protocol-modal__jump wiki-protocol-modal__icon-button"
                aria-label="View in article"
                title="View in article"
                onClick={onJumpToArticle}
              >
                <BookOpen aria-hidden="true" />
              </button>
            ) : null}
            <button
              type="button"
              className="wiki-protocol-modal__close wiki-protocol-modal__icon-button"
              aria-label="Close protocol viewer"
              title="Close"
              onClick={onClose}
            >
              <X aria-hidden="true" />
            </button>
          </div>
        </header>

        {pair.boundary ? (
          <p className="wiki-protocol-modal__boundary">
            <strong>Protocol note:</strong> {pair.boundary}
          </p>
        ) : null}

        <div
          className="wiki-protocol-modal__tabs"
          role="tablist"
          aria-label="Protocol images"
        >
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "flow"}
            className={activeTab === "flow" ? "is-active" : ""}
            onClick={() => switchTab("flow")}
            disabled={!hasFlow}
          >
            Workflow
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "inventory"}
            className={activeTab === "inventory" ? "is-active" : ""}
            onClick={() => switchTab("inventory")}
            disabled={!hasInventory}
          >
            Materials
          </button>
          <button
            type="button"
            className="wiki-protocol-modal__size-toggle wiki-protocol-modal__icon-button"
            aria-label={showActualSize ? "Fit to window" : "View actual size"}
            title={showActualSize ? "Fit to window" : "View actual size"}
            aria-pressed={showActualSize}
            onClick={() => setShowActualSize((visible) => !visible)}
            disabled={typeof currentPage !== "number"}
          >
            {showActualSize ? (
              <Shrink aria-hidden="true" />
            ) : (
              <Expand aria-hidden="true" />
            )}
          </button>
        </div>

        <div
          className="wiki-protocol-modal__stage"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <button
            type="button"
            className="wiki-protocol-modal__edge wiki-protocol-modal__edge--left"
            aria-label="Previous protocol image"
            onClick={() => switchTab("flow")}
            disabled={activeTab === "flow" || !hasFlow}
          >
            <ChevronLeft aria-hidden="true" />
          </button>
          <div className="wiki-protocol-modal__image-scroll">
            {typeof currentPage === "number" ? (
              <img
                className={showActualSize ? "is-actual" : ""}
                src={experimentProtocolImage(currentPage)}
                alt={`${pair.title}, ${currentLabel}, page ${currentPage}`}
                width={currentSize?.[0] ?? 2400}
                height={currentSize?.[1] ?? 1800}
                decoding="async"
                onError={(event) => {
                  event.currentTarget.src =
                    experimentProtocolLocalImage(currentPage);
                }}
              />
            ) : (
              <div className="wiki-protocol-modal__empty">
                <strong>No illustration available</strong>
              </div>
            )}
          </div>
          <button
            type="button"
            className="wiki-protocol-modal__edge wiki-protocol-modal__edge--right"
            aria-label="Next protocol image"
            onClick={() => switchTab("inventory")}
            disabled={activeTab === "inventory" || !hasInventory}
          >
            <ChevronRight aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
