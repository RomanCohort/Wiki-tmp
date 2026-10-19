import {
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { PageImagePreloads } from "../../../common/PageImagePreloads";
import { WikiNextRecord } from "../../WikiNextRecord";
import { getTeamHeroImage } from "../../teamHeroAssets";
import { attributionPage } from "../../../../data/team/attributionPage";
import { getAttributionBookmarks } from "../../../../data/team/attributionBookmarks";
import { useRouteReaderScroll } from "../../../../hooks/useRouteReaderScroll";
import { scrollReaderToTarget } from "../../../../utils";
import "../../../../styles/wiki-route-skin.css";
import "../../../../styles/official-attributions.css";

const FRAME_NAME = "igem-attribution-form";
const FORM_ORIGIN = new URL(attributionPage.formUrl).origin;
const COMPACT_QUERY = "(max-width: 980px)";

function sectionFromHostHash(hash: string) {
  const value = hash.replace(/^#(?:attribution-)?/, "");
  return attributionPage.sections.some((section) => section.id === value)
    ? value
    : null;
}

function readFormHeight(data: unknown): number | null {
  if (typeof data === "string") {
    try {
      data = JSON.parse(data) as unknown;
    } catch {
      return null;
    }
  }
  if (typeof data !== "object" || data === null) return null;
  const message = data as { type?: unknown; data?: unknown };
  if (message.type !== "igem-attribution-form") return null;
  const height = Number(message.data);
  return Number.isFinite(height) && height > 0 ? Math.ceil(height + 100) : null;
}

export function OfficialAttributionReader() {
  const frameRef = useRef<HTMLIFrameElement>(null);
  const readerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [reportedHeight, setReportedHeight] = useState<number | null>(null);
  const [formWidth, setFormWidth] = useState(819);
  const initialSection = sectionFromHostHash(window.location.hash);
  const [selectedSection, setSelectedSection] = useState<string>(
    initialSection ?? attributionPage.sections[0].id,
  );
  const [compact, setCompact] = useState(
    () => window.matchMedia(COMPACT_QUERY).matches,
  );
  const [tocOpen, setTocOpen] = useState(false);
  const outlineId = useId();
  const heroImage = getTeamHeroImage(attributionPage.route);
  const heroStyle = {
    "--route-hero-image": `url(${heroImage})`,
  } as CSSProperties;
  const bookmarks = getAttributionBookmarks(formWidth, reportedHeight);
  const formStyle = {
    "--attribution-form-height": `${reportedHeight ?? bookmarks.contentHeight + 100}px`,
  } as CSSProperties;

  const jumpToSection = (sectionId: string) => {
    const bookmark = document.getElementById(`attribution-${sectionId}`);
    if (bookmark) {
      const inner = scrollRef.current;
      if (!compact && inner) {
        const offset =
          inner.scrollTop +
          bookmark.getBoundingClientRect().top -
          inner.getBoundingClientRect().top -
          32;
        bookmark.dataset.readerScrollTop = String(
          Math.max(
            0,
            Math.min(inner.scrollHeight - inner.clientHeight, offset),
          ),
        );
      } else {
        delete bookmark.dataset.readerScrollTop;
      }
      scrollReaderToTarget(bookmark, scrollRef.current);
    }
    window.history.replaceState(
      window.history.state,
      "",
      `#attribution-${sectionId}`,
    );
    setSelectedSection(sectionId);
    setTocOpen(false);
  };

  useEffect(() => {
    const initial = sectionFromHostHash(window.location.hash);
    if (!initial) return;
    const timer = window.setTimeout(() => jumpToSection(initial), 120);
    return () => window.clearTimeout(timer);
  }, []);

  // Keep the full live document on the shared reader timeline, including
  // gestures over the table of contents and the surrounding Team background.
  useRouteReaderScroll(!compact, readerRef, scrollRef);

  useEffect(() => {
    const media = window.matchMedia(COMPACT_QUERY);
    const onChange = () => {
      setCompact(media.matches);
      setTocOpen(false);
    };
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  useLayoutEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;
    const onResize = () => setFormWidth(frame.clientWidth);
    const observer = new ResizeObserver(onResize);
    observer.observe(frame);
    onResize();
    return () => observer.disconnect();
  }, []);

  useLayoutEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;
    const onLoad = () => {
      if (frame.dataset.pageEmbedReady === "true") return;
      frame.dataset.pageEmbedReady = "true";
      frame.dispatchEvent(new Event("wiki-embed-ready"));
    };
    const onMessage = (event: MessageEvent<unknown>) => {
      if (event.origin !== FORM_ORIGIN || event.source !== frame.contentWindow)
        return;
      const height = readFormHeight(event.data);
      if (height === null) return;
      setReportedHeight(height);
      onLoad();
    };
    window.addEventListener("message", onMessage);
    frame.addEventListener("load", onLoad);
    return () => {
      frame.removeEventListener("load", onLoad);
      window.removeEventListener("message", onMessage);
    };
  }, []);

  useEffect(() => {
    const inner = scrollRef.current;
    if (!inner) return;

    let frame = 0;
    const updateActiveSection = () => {
      frame = 0;
      const innerBounds = inner.getBoundingClientRect();
      const headerHeight =
        Number.parseFloat(
          getComputedStyle(document.documentElement).getPropertyValue(
            "--header-height",
          ),
        ) || 78;
      // Keep the active item tied to the reading line below the fixed header.
      // The same viewport rule works for the projected desktop reader and the
      // natural mobile flow because the bookmarks move with the live iframe.
      const readingLine = Math.max(innerBounds.top + 48, headerHeight + 24);
      let active: string = attributionPage.sections[0].id;
      for (const section of attributionPage.sections) {
        const bookmark = document.getElementById(`attribution-${section.id}`);
        if (bookmark && bookmark.getBoundingClientRect().top <= readingLine) {
          active = section.id;
        }
      }
      setSelectedSection((current) => (current === active ? current : active));
    };
    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateActiveSection);
    };
    const observer = new ResizeObserver(requestUpdate);

    observer.observe(inner);
    const documentShell = inner.querySelector(
      ".official-attributions-page__document",
    );
    if (documentShell) observer.observe(documentShell);
    window.addEventListener("scroll", requestUpdate, { passive: true });
    inner.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate, { passive: true });
    requestUpdate();

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", requestUpdate);
      inner.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, [compact, formWidth, reportedHeight]);

  useEffect(() => {
    if (!tocOpen) return;
    const trigger = triggerRef.current;
    closeRef.current?.focus({ preventScroll: true });
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setTocOpen(false);
      if (event.key !== "Tab") return;
      const controls = Array.from(
        document
          .getElementById(outlineId)
          ?.querySelectorAll<HTMLElement>("button, a[href]") ?? [],
      );
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      trigger?.focus({ preventScroll: true });
    };
  }, [tocOpen, outlineId]);

  return (
    <main
      className={`wiki-page wiki-page--route wiki-page--manuscript route--reader wiki-page--team official-attributions-page${tocOpen ? " is-toc-open" : ""}`}
      data-wiki-route={attributionPage.route}
      data-route-theme="team"
    >
      <PageImagePreloads sources={[heroImage]} />
      <link rel="preconnect" href={FORM_ORIGIN} />
      <link rel="dns-prefetch" href={FORM_ORIGIN} />
      <header className="wiki-hero" style={heroStyle}>
        <h1 className="wiki-hero__sr-only">{attributionPage.title}</h1>
      </header>
      <div className="wiki-reader-track">
        <div
          ref={readerRef}
          className="wiki-record"
          aria-label="Project attribution reader"
        >
          <aside
            id={outlineId}
            className="wiki-outline wiki-outline--marker"
            aria-label="Attribution table of contents"
          >
            <div className="wiki-outline__drawer-head">
              <strong>On this page</strong>
              <button
                ref={closeRef}
                type="button"
                className="wiki-outline__close"
                aria-label="Close table of contents"
                onClick={() => setTocOpen(false)}
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <nav aria-label="Jump to an official attribution section">
              {attributionPage.sections.map((section, index) => (
                <div className="wiki-outline__group" key={section.id}>
                  <a
                    className={`wiki-outline__primary${selectedSection === section.id ? " is-active" : ""}`}
                    href={`#attribution-${section.id}`}
                    onClick={(event) => {
                      if (
                        event.ctrlKey ||
                        event.metaKey ||
                        event.shiftKey ||
                        event.altKey
                      )
                        return;
                      event.preventDefault();
                      jumpToSection(section.id);
                    }}
                  >
                    <span className="wiki-outline__index">{index + 1}</span>
                    <span className="wiki-outline__copy">
                      <strong>{section.label}</strong>
                    </span>
                  </a>
                </div>
              ))}
            </nav>
          </aside>
          {compact ? (
            <>
              <button
                ref={triggerRef}
                type="button"
                className="wiki-toc-trigger"
                aria-controls={outlineId}
                aria-expanded={tocOpen}
                aria-label="Open table of contents"
                onClick={() => setTocOpen(true)}
              >
                <svg
                  viewBox="0 0 20 20"
                  width="18"
                  height="18"
                  aria-hidden="true"
                >
                  <path
                    d="M3 5h14M3 10h14M3 15h9"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    fill="none"
                  />
                </svg>
                <span>TOC</span>
              </button>
              <div
                className="wiki-toc-backdrop"
                aria-hidden="true"
                onClick={() => setTocOpen(false)}
              />
            </>
          ) : null}
          <div className="route-frame">
            <div
              ref={scrollRef}
              className="route-frame__scroll"
              tabIndex={0}
              aria-label="Project Attributions article"
            >
              <div
                className="official-attributions-page__form"
                style={formStyle}
              >
                <div className="official-attributions-page__document">
                  <nav
                    className="official-attributions-page__jump-nav"
                    aria-label="Official attribution Jump to navigation"
                  >
                    <span className="official-attributions-page__jump-title">
                      Jump to
                    </span>
                    <div className="official-attributions-page__jump-chips">
                      {attributionPage.sections.map((section) => (
                        <button
                          key={section.id}
                          type="button"
                          className={`official-attributions-page__jump-chip${selectedSection === section.id ? " is-active" : ""}`}
                          onClick={() => jumpToSection(section.id)}
                        >
                          {section.label}
                        </button>
                      ))}
                    </div>
                  </nav>
                  {attributionPage.sections.map((section, index) => (
                    <span
                      key={section.id}
                      id={`attribution-${section.id}`}
                      className="official-attributions-page__bookmark"
                      aria-hidden="true"
                      style={
                        {
                          "--attribution-bookmark-top": `${bookmarks.offsets[index]}px`,
                        } as CSSProperties
                      }
                    />
                  ))}
                  <iframe
                    ref={frameRef}
                    id={FRAME_NAME}
                    name={FRAME_NAME}
                    title="Official iGEM attribution form"
                    src={
                      initialSection
                        ? `${attributionPage.formUrl}#${initialSection}`
                        : attributionPage.formUrl
                    }
                    loading="eager"
                    data-page-embed-ready="false"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <WikiNextRecord {...attributionPage.next} reveal={false} />
    </main>
  );
}
