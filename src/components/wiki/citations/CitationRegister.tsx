/* eslint-disable react-refresh/only-export-components */
/**
 * Canonical citation register.
 *
 * Extracted from the Description page, which is the house standard for this
 * interaction: a dotted-underline in-text link, a hover card carrying the
 * bibliographic line, a click that scrolls to the bibliography and flashes the
 * entry, and reverse back-links from each entry to every place it is cited.
 *
 * One implementation for the whole wiki. A page supplies its own reference list,
 * its own index and its own flash tint; the markup, the anchors (`#ref-N`,
 * `#cite-N-M`) and the skin are shared, so a citation behaves identically
 * wherever it appears and a module's palette drives the colours.
 */

import {
  Fragment,
  useEffect,
  useSyncExternalStore,
  type MouseEvent,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { scrollReaderToTarget } from "../../../utils/scrollReaderToTarget";
import type { InlineRenderer } from "../WikiRoutePage";
import type {
  CitationFlashTint,
  CitationIndex,
  CitationOccurrence,
  CitationReference,
} from "../../../data/citations/citationTypes";
import "../../../styles/wiki-citations.css";

/* Host pages only need this module: the tint they pass in is one of its inputs. */
export type { CitationFlashTint } from "../../../data/citations/citationTypes";

const MODIFIER_KEYS = (event: MouseEvent) =>
  event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0;

const FLASH_DURATION = 2200;

/** Deep forest green: the Project page's own heading ink. */
export const PROJECT_CITATION_FLASH: CitationFlashTint = {
  ramp: "rgba(183, 215, 129, 0.22)",
  ring: "0 0 0 3px rgba(183, 215, 129, 0.45)",
};

/* --------------------------------------------------------------- jump+flash */

/**
 * Landing highlight. WAAPI survives React re-renders that would wipe a toggled
 * className (the scroll spy re-renders sections on every jump).
 */
export function flashCitationTarget(
  el: HTMLElement,
  tint: CitationFlashTint = PROJECT_CITATION_FLASH,
): void {
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  if (reduceMotion) {
    const animation = el.animate(
      [{ backgroundColor: tint.ramp, boxShadow: tint.ring }],
      {
        duration: FLASH_DURATION,
        fill: "forwards",
      },
    );
    window.setTimeout(() => animation.cancel(), FLASH_DURATION);
    return;
  }

  el.animate(
    [
      { backgroundColor: tint.ramp, boxShadow: tint.ring },
      { backgroundColor: tint.ramp, boxShadow: tint.ring, offset: 0.35 },
      { backgroundColor: "transparent", boxShadow: "0 0 0 0 transparent" },
    ],
    {
      duration: 1800,
      delay: 250,
      easing: "cubic-bezier(0.22, 1, 0.36, 1)",
      fill: "none",
    },
  );
}

/**
 * Jump inside the pinned reader frame: reveal the target's reveal wrapper, scroll
 * through the shared reader helper, mirror the anchor into the URL (replace, so
 * the back stack stays clean), move focus, and flash.
 */
export function jumpToAnchor(id: string, tint?: CitationFlashTint): void {
  const target = document.getElementById(id);
  const el = target?.closest<HTMLElement>(".wiki-cite") ?? target;
  if (!el) return;

  const closedSubheading = el.closest<HTMLElement>(
    "[data-wiki-subheading-fold]:not(.is-open)",
  );
  if (closedSubheading) {
    closedSubheading
      .querySelector<HTMLButtonElement>(".wiki-protocol-drawer__header")
      ?.click();
    window.requestAnimationFrame(() => jumpToAnchor(id, tint));
    return;
  }

  el.closest("[data-wiki-reveal]")?.classList.add("is-visible");

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  // Focus first: Chromium can cancel an ongoing smooth scroll when focus changes.
  el.focus({ preventScroll: true });
  scrollReaderToTarget(
    el,
    el.closest<HTMLElement>(".route-frame__scroll"),
    reduceMotion ? "instant" : "smooth",
  );

  window.history.replaceState(window.history.state, "", `#${id}`);
  flashCitationTarget(el, tint);
}

/* ----------------------------------------------------------------- preview */

interface PreviewState {
  refIds: readonly number[];
  top: number;
  left: number;
  width: number;
  placement: "top" | "bottom";
}

const EDGE = 12;
const GAP = 8;
const MAX_WIDTH = 352; // 22rem
const ESTIMATED_HEIGHT = 150;
const SHOW_DELAY = 150;
const HIDE_GRACE = 100;

let current: PreviewState | null = null;
const listeners = new Set<() => void>();
let showTimer = 0;
let hideTimer = 0;

function emit() {
  listeners.forEach((listener) => listener());
}

function clearTimers() {
  window.clearTimeout(showTimer);
  window.clearTimeout(hideTimer);
}

function positionFor(
  refIds: readonly number[],
  anchor: HTMLElement,
): PreviewState {
  const rect = anchor.getBoundingClientRect();
  const width = Math.min(MAX_WIDTH, window.innerWidth - EDGE * 2);
  const left = Math.min(
    Math.max(rect.left, EDGE),
    window.innerWidth - width - EDGE,
  );
  const spaceBelow = window.innerHeight - rect.bottom;
  const estimatedHeight = Math.min(
    ESTIMATED_HEIGHT * refIds.length,
    window.innerHeight / 2 - EDGE * 2,
  );
  const placeAbove =
    spaceBelow < estimatedHeight + GAP && rect.top > spaceBelow;
  return {
    refIds,
    width,
    left,
    placement: placeAbove ? "top" : "bottom",
    top: placeAbove ? rect.top - GAP : rect.bottom + GAP,
  };
}

/**
 * Single-page preview store. Module-level because in-text links and the
 * bibliography sit in different subtrees; only one route is mounted at a time, so
 * the page that owns the register also owns the lookup.
 */
export const citationPreview = {
  subscribe(listener: () => void) {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  },
  getSnapshot() {
    return current;
  },
  /** Server render always starts closed, so the snapshot is simply `current`. */
  getServerSnapshot() {
    return current;
  },
  show(refId: number | readonly number[], anchor: HTMLElement) {
    clearTimers();
    showTimer = window.setTimeout(() => {
      if (!window.matchMedia("(hover: hover)").matches) return;
      current = positionFor(
        typeof refId === "number" ? [refId] : refId,
        anchor,
      );
      emit();
    }, SHOW_DELAY);
  },
  /** Keep the tooltip open while the pointer crosses onto it. */
  keep() {
    clearTimers();
  },
  scheduleHide() {
    clearTimers();
    hideTimer = window.setTimeout(() => {
      current = null;
      emit();
    }, HIDE_GRACE);
  },
  hide() {
    clearTimers();
    current = null;
    emit();
  },
};

/**
 * Hover card for a citation. One portal instance lives at the end of the
 * register; the reference text comes from the host page's own list.
 */
export function CitationPreview({
  references,
}: {
  references: readonly CitationReference[];
}) {
  const state = useSyncExternalStore(
    citationPreview.subscribe,
    citationPreview.getSnapshot,
    citationPreview.getServerSnapshot,
  );

  useEffect(() => {
    const dismiss = (event?: Event) => {
      if (
        event?.type === "scroll" &&
        event.target instanceof Element &&
        event.target.closest(".wiki-cite-preview")
      )
        return;
      citationPreview.hide();
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") dismiss();
    };
    window.addEventListener("scroll", dismiss, true);
    window.addEventListener("resize", dismiss);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("scroll", dismiss, true);
      window.removeEventListener("resize", dismiss);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  if (!state) return null;
  const previewReferences = state.refIds.flatMap((refId) => {
    const reference = references.find((item) => item.id === refId);
    return reference ? [reference] : [];
  });
  if (!previewReferences.length) return null;

  return createPortal(
    <div
      className="wiki-cite-preview"
      data-placement={state.placement}
      aria-hidden="true"
      style={{
        top: state.top,
        left: state.left,
        width: state.width,
        transform: state.placement === "top" ? "translateY(-100%)" : undefined,
      }}
      onPointerEnter={citationPreview.keep}
      onPointerLeave={citationPreview.scheduleHide}
    >
      {previewReferences.map((reference) => (
        <div className="wiki-cite-preview__entry" key={reference.id}>
          <span className="wiki-cite-preview__index">[{reference.id}]</span>{" "}
          {reference.authors ? <span><CitationText text={reference.authors} /> </span> : null}
          <span><CitationText text={reference.title} /> </span>
          {reference.journal ? <em>{reference.journal} </em> : null}
          <span>{reference.volumeYear}</span>
        </div>
      ))}
    </div>,
    document.body,
  );
}

/* -------------------------------------------------------------------- link */

function CitationLink({
  occ,
  additionalOccs = [],
  tint,
  children,
}: {
  occ: CitationOccurrence;
  additionalOccs?: readonly CitationOccurrence[];
  tint?: CitationFlashTint;
  children?: ReactNode;
}) {
  const refIds = [occ, ...additionalOccs].map((occurrence) => occurrence.refId);
  return (
    <a
      id={occ.occId}
      href={`#ref-${occ.refId}`}
      className="wiki-cite"
      role="doc-biblioref"
      aria-describedby={refIds.map((refId) => `ref-${refId}-body`).join(" ")}
      onClick={(event) => {
        if (MODIFIER_KEYS(event)) return; // let the browser open the anchor
        event.preventDefault();
        citationPreview.hide();
        jumpToAnchor(`ref-${occ.refId}`, tint);
      }}
      onPointerEnter={(event) => {
        if (event.pointerType === "mouse") {
          citationPreview.show(refIds, event.currentTarget);
        }
      }}
      onPointerLeave={citationPreview.scheduleHide}
      onFocus={(event) => {
        if (event.currentTarget.matches(":focus-visible")) {
          citationPreview.show(refIds, event.currentTarget);
        }
      }}
      onBlur={citationPreview.hide}
    >
      {additionalOccs.map((occurrence) => (
        <span
          key={occurrence.occId}
          id={occurrence.occId}
          className="wiki-cite__additional-target"
          aria-hidden="true"
        />
      ))}
      {children ?? `[${occ.refId}]`}
    </a>
  );
}

/**
 * Build the inline renderer a page hands to `WikiRoutePage`. Paragraphs whose
 * citations resolve are split into text and links; everything else falls through
 * to `linkify` (the reader's Markdown-link handling), so cross-references and
 * citations cooperate inside one sentence.
 */
export function createCitationRenderer(
  index: CitationIndex,
  tint?: CitationFlashTint,
): InlineRenderer {
  return (text, fallback, sectionId) => {
    const entry = (sectionId ? index.byScopedParagraph?.get(`${sectionId}\0${text}`) : undefined)
      ?? index.byParagraph.get(text);
    if (!entry) return fallback(text);

    let occurrenceIndex = 0;
    return entry.segments.map((segment, segmentIndex) => {
      if (segment.kind === "text") {
        return <Fragment key={segmentIndex}>{fallback(segment.text)}</Fragment>;
      }
      const occurrences = entry.occs.slice(
        occurrenceIndex,
        occurrenceIndex + (segment.refIds?.length ?? 1),
      );
      occurrenceIndex += occurrences.length;
      return (
        <CitationLink
          key={segmentIndex}
          occ={occurrences[0]}
          additionalOccs={occurrences.slice(1)}
          tint={tint}
        >
          {/* The link shows exactly what the author wrote: an author-year group,
              a bracketed numeral, or whatever the next manuscript uses. */}
          {fallback(segment.text)}
        </CitationLink>
      );
    });
  };
}

/* --------------------------------------------------------------- backlinks */

/** Wikipedia-style back-links appended to each bibliography entry. */
export function Backlinks({
  occs,
  tint,
}: {
  occs: readonly CitationOccurrence[];
  tint?: CitationFlashTint;
}) {
  if (occs.length === 0) return null;

  return (
    <span className="wiki-reference-item__backlinks">
      {occs.map((occ, index) => (
        <a
          key={occ.occId}
          href={`#${occ.occId}`}
          role="doc-backlink"
          aria-label={
            occs.length === 1
              ? "Back to in-text citation"
              : `Back to in-text citation ${index + 1} of ${occs.length}`
          }
          onClick={(event) => {
            if (MODIFIER_KEYS(event)) return;
            event.preventDefault();
            jumpToAnchor(occ.occId, tint);
          }}
        >
          {index === 0 ? "↩" : String.fromCharCode(96 + index)}
        </a>
      ))}
    </span>
  );
}

/* ----------------------------------------------------------------- register */

/**
 * A bibliographic field may carry one italicised run — a binomial in a paper
 * title, for instance. `*…*` is the data layer's marker; the journal slot has
 * its own italic element and does not pass through here.
 */
function CitationText({ text }: { text: string }) {
  if (!text.includes("*")) return <>{text}</>;
  return (
    <>
      {text
        .split(/(\*[^*]+\*)/g)
        .map((part, index) =>
          part.startsWith("*") && part.endsWith("*") && part.length > 2 ? (
            <em key={index}>{part.slice(1, -1)}</em>
          ) : (
            <Fragment key={index}>{part}</Fragment>
          ),
        )}
    </>
  );
}

/**
 * The bibliography: hanging index, authors, title, italic journal, volume/year,
 * identifier links and back-links. Driven entirely by the page's reference list,
 * so an entry is written once and never restyled per page.
 */
export function CitationReferenceList({
  references,
  index,
  tint,
}: {
  references: readonly CitationReference[];
  index: CitationIndex;
  tint?: CitationFlashTint;
}) {
  /* Landing on a deep link (`#ref-7`) replays the flash, because the jump that
     put the reader here happened before this register mounted. */
  useEffect(() => {
    const hash = window.location.hash.replace(/^#/, "");
    if (!/^ref-\d+$/.test(hash)) return;
    const el = document.getElementById(hash);
    if (el) flashCitationTarget(el, tint);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- mount only
  }, []);

  return (
    <>
      <ol className="wiki-reference-list">
        {references.map((reference) => (
          <li
            key={reference.id}
            id={`ref-${reference.id}`}
            tabIndex={-1}
            className="wiki-reference-item"
          >
            <span className="wiki-reference-item__index">[{reference.id}]</span>
            <div
              className="wiki-reference-item__content"
              id={`ref-${reference.id}-body`}
            >
              {reference.authors ? (
                <span className="wiki-reference-item__authors">
                  <CitationText text={reference.authors} />{" "}
                </span>
              ) : null}
              <span className="wiki-reference-item__title">
                <CitationText text={reference.title} />{" "}
              </span>
              {reference.journal ? (
                <em className="wiki-reference-item__journal">
                  {reference.journal}{" "}
                </em>
              ) : null}
              <span className="wiki-reference-item__vol">
                {reference.volumeYear}
              </span>
              {reference.links?.map((link) => (
                <Fragment key={link.href}>
                  {" "}
                  <a
                    className="wiki-reference-item__link"
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {link.label}
                  </a>
                </Fragment>
              ))}
              <Backlinks
                occs={index.byRef.get(reference.id) ?? []}
                tint={tint}
              />
            </div>
          </li>
        ))}
      </ol>
      <CitationPreview references={references} />
    </>
  );
}
