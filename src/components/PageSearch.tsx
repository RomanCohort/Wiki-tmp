import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type ChangeEvent,
  type KeyboardEvent,
  type MouseEvent,
} from "react";
import { useLocation } from "react-router-dom";
import { collectPageTextMatches } from "../utils/collectPageTextMatches";
import { scrollReaderToTarget } from "../utils/scrollReaderToTarget";

// Elements whose text is never part of a page search. The search runs over the
// rendered page DOM, so we skip the chrome (header/footer/back-to-top), any
// element that is inert or hidden to assistive tech, and form/media nodes.
const SKIP_SELECTOR = [
  "script",
  "style",
  "noscript",
  "svg",
  "input",
  "textarea",
  "select",
  "mark",
  "button",
  ".site-header",
  "footer",
  ".circure-footer",
  ".circure-back-to-top",
  ".page-search",
  ".circure-mega-menu",
  ".circure-mobile-menu",
  // Outline counts and live regions are interface text, not article content.
  ".wiki-outline",
  "[aria-live]",
  "[aria-hidden='true']",
  "[inert]",
  "[hidden]",
].join(",");

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

// Ranges leave React-owned text nodes intact across search, updates and routing.
function collectMatches(root: ParentNode, query: string): Range[] {
  return collectPageTextMatches(root, query, SKIP_SELECTOR);
}

function supportsHighlights(): boolean {
  return typeof Highlight !== "undefined" && "highlights" in CSS;
}

function clearSearchHighlights(): void {
  if (supportsHighlights()) {
    CSS.highlights.delete("page-search-results");
    CSS.highlights.delete("page-search-current");
  }
}

export function PageSearch({
  onOpen,
  menuOpen,
}: {
  onOpen: () => void;
  menuOpen: boolean;
}) {
  const reactId = useId().replace(/:/g, "");
  const panelId = `page-search-panel-${reactId}`;
  const searchRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const { pathname } = useLocation();

  const inputRef = useRef<HTMLInputElement>(null);
  const matchesRef = useRef<Range[]>([]);
  const selectionRef = useRef<Range | null>(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [count, setCount] = useState(0);
  const [current, setCurrent] = useState(0);

  const clearHighlights = useCallback(() => {
    clearSearchHighlights();
    const selection = window.getSelection();
    if (
      selectionRef.current &&
      selection?.rangeCount &&
      selection.getRangeAt(0) === selectionRef.current
    ) {
      selection.removeAllRanges();
    }
    selectionRef.current = null;
    matchesRef.current = [];
    setCount(0);
    setCurrent(0);
  }, []);

  const applyIndex = useCallback((index: number, shouldScroll: boolean) => {
    const matches = matchesRef.current;
    if (matches.length === 0) return;
    const wrapped =
      ((index % matches.length) + matches.length) % matches.length;
    const range = matches[wrapped];
    if (supportsHighlights()) {
      const active = new Highlight(range);
      active.priority = 1;
      CSS.highlights.set("page-search-current", active);
    } else if (shouldScroll) {
      // Older browsers can still navigate and select the current match.
      const selection = window.getSelection();
      selection?.removeAllRanges();
      selection?.addRange(range);
      selectionRef.current = range;
    }
    setCurrent(wrapped + 1);
    if (shouldScroll) {
      const target = range.startContainer.parentElement;
      if (!target) return;

      // Reader routes project the article's progress onto the document. The
      // frame itself is intentionally non-scrollable, so native
      // `scrollIntoView` only nudges the page while the outline moves ahead.
      // Reuse the same route-aware conversion as the TOC and inline links.
      const reader = target.closest<HTMLElement>(".route-frame__scroll");
      scrollReaderToTarget(range, reader, "instant", { block: "center" });
    }
  }, []);

  const runSearch = useCallback(
    (value: string) => {
      clearHighlights();
      const trimmed = value.trim();
      setQuery(value);
      if (!trimmed) return;
      const matches = collectMatches(document.body, trimmed);
      matchesRef.current = matches;
      if (supportsHighlights()) {
        CSS.highlights.set("page-search-results", new Highlight(...matches));
      }
      setCount(matches.length);
      if (matches.length > 0) applyIndex(0, false);
    },
    [clearHighlights, applyIndex],
  );

  // Home rebuilds word wrappers after reflow; recreate ranges against the new nodes.
  useEffect(() => {
    if (!open || !query.trim()) return;
    let timer = 0;
    const refresh = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(() => runSearch(query), 350);
    };
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    window.addEventListener("resize", refresh);
    motion.addEventListener("change", refresh);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("resize", refresh);
      motion.removeEventListener("change", refresh);
    };
  }, [open, query, runSearch]);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    clearHighlights();
    inputRef.current?.blur();
  }, [clearHighlights]);

  // Focus the input once the pill expands (after it is no longer read-only).
  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  // A route change replaces the page DOM — drop stale highlights and reset.
  useEffect(() => {
    setOpen(false);
    setQuery("");
    clearHighlights();
  }, [pathname, clearHighlights]);

  // Never leave named highlight ranges behind on unmount.
  useEffect(() => {
    return clearSearchHighlights;
  }, []);

  const handleOpen = useCallback(() => {
    onOpen();
    setOpen(true);
  }, [onOpen]);

  useEffect(() => {
    if (menuOpen) close();
  }, [menuOpen, close]);

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      runSearch(event.target.value);
    },
    [runSearch],
  );

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!searchRef.current?.contains(event.target as Node)) close();
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open, close]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter") {
        event.preventDefault();
        // `current` is 1-based; next match is index `current`, previous is
        // index `current - 2`.
        applyIndex(event.shiftKey ? current - 2 : current, true);
      } else if (event.key === "Escape") {
        event.preventDefault();
        event.stopPropagation();
        close();
        triggerRef.current?.focus();
      }
    },
    [applyIndex, current, close],
  );

  const countLabel =
    count > 0 ? `${current}/${count}` : query.trim() ? "No matches" : "";

  return (
    <div
      className={`page-search${open ? " is-open" : ""}`}
      ref={searchRef}
      role="search"
      aria-label="Search this page"
    >
      <button
        ref={triggerRef}
        className="page-search__trigger"
        type="button"
        aria-label="Search this page"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => (open ? close() : handleOpen())}
      >
        <SearchIcon />
        <span>Search</span>
      </button>
      <div
        className="page-search__panel"
        id={panelId}
        aria-hidden={!open}
        inert={!open || undefined}
      >
        <label className="page-search__label" htmlFor={`${panelId}-input`}>
          Find on this page
        </label>
        <div className="page-search__pill">
          <SearchIcon className="page-search__pill-icon" />
          <input
            ref={inputRef}
            className="page-search__input"
            type="search"
            enterKeyHint="search"
            autoComplete="off"
            spellCheck={false}
            id={`${panelId}-input`}
            placeholder="Enter a word or phrase"
            aria-label="Search this page"
            value={query}
            readOnly={!open}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onFocus={handleOpen}
          />
        </div>
        <div className="page-search__meta">
          <span className="page-search__count" aria-live="polite">
            {countLabel || "Current page only"}
          </span>
          {count > 1 ? (
            <>
              <button
                type="button"
                className="page-search__nav"
                aria-label="Previous match"
                onMouseDown={(e: MouseEvent) => e.preventDefault()}
                onClick={() => applyIndex(current - 2, true)}
              >
                ↑
              </button>
              <button
                type="button"
                className="page-search__nav"
                aria-label="Next match"
                onMouseDown={(e: MouseEvent) => e.preventDefault()}
                onClick={() => applyIndex(current, true)}
              >
                ↓
              </button>
            </>
          ) : null}
          <button
            type="button"
            className="page-search__close"
            onClick={close}
            aria-label="Close search"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
