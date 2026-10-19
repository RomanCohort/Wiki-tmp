import { type MouseEvent, useCallback, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
const teamCrestUrl = "https://static.igem.wiki/teams/6056/wiki/files/pages/shared/jlu-fbh-crest.avif";
import Pages from "../pages";
import { PageSearch } from "./PageSearch";
import { HOME_INTRO_REPLAY_EVENT } from "../utils/homeIntro";
import { useRouteModule } from "../hooks/useRouteModule";
import { NAV_ICONS } from "./navIcons";

interface NavCard {
  name: string;
  path: string;
  icon: string;
}

interface NavDropdown {
  key: string;
  label: string;
  cards: NavCard[];
}

const NAV_KEYS: Record<string, string> = {
  Team: "team",
  Project: "project",
  "Wet Lab": "wet-lab",
  "Dry Lab": "dry-lab",
  Engagement: "engagement",
};

const DROPDOWNS: NavDropdown[] = Pages.flatMap((item) => {
  if (!("folder" in item) || !item.folder || !item.name) return [];
  const key = NAV_KEYS[item.name];
  if (!key) return [];

  const cards = item.folder.flatMap((page): NavCard[] => {
    if (!page.name || !page.path) return [];
    return [
      {
        name: page.name,
        path: page.path,
        icon: NAV_ICONS[page.name] ?? "",
      },
    ];
  });

  return [
    {
      key,
      label: item.name,
      cards,
    },
  ];
});

const NAV_BREAKPOINT = 980;

function isActive(pathname: string, path: string): boolean {
  if (path === "/") return pathname === "/";
  return pathname === path || pathname.startsWith(`${path}/`);
}

function dropdownActive(pathname: string, dropdown: NavDropdown): boolean {
  return dropdown.cards.some((c) => isActive(pathname, c.path));
}

export function Navbar() {
  const [openKey, setOpenKey] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileGroup, setMobileGroup] = useState<string | null>(null);
  const [menuAnchor, setMenuAnchor] = useState(0);
  const openTimerRef = useRef<number>(0);
  const closeTimerRef = useRef<number>(0);
  const headerRef = useRef<HTMLElement>(null);
  const shellRef = useRef<HTMLDivElement>(null);
  const mobileToggleRef = useRef<HTMLButtonElement>(null);
  const pathname = useLocation().pathname;
  const module = useRouteModule();
  const homeActive = module.home;
  const currentDropdownKey =
    DROPDOWNS.find((d) => dropdownActive(pathname, d))?.key ?? null;
  const [isBallMode, setIsBallMode] = useState(false);
  const [isBallExpanded, setIsBallExpanded] = useState(false);
  const scrollDeltaRef = useRef(0);

  const clearTimers = useCallback(() => {
    window.clearTimeout(openTimerRef.current);
    window.clearTimeout(closeTimerRef.current);
  }, []);

  const updateMenuAnchor = useCallback((key: string) => {
    const shell = shellRef.current;
    const toggle = shell?.querySelector<HTMLButtonElement>(
      `button[data-nav-key="${key}"]`,
    );
    if (!shell || !toggle) return;
    const shellRect = shell.getBoundingClientRect();
    const toggleRect = toggle.getBoundingClientRect();
    const trayWidth = Math.min(
      Number.parseFloat(getComputedStyle(shell).getPropertyValue("--nav-menu-width")) || 304,
      shellRect.width - 20,
    );
    const centeredLeft = toggleRect.left - shellRect.left + toggleRect.width / 2 - trayWidth / 2;
    setMenuAnchor(Math.max(10, Math.min(shellRect.width - trayWidth - 10, centeredLeft)));
  }, []);

  const queueOpen = useCallback(
    (key: string) => {
      if (typeof window === "undefined" || window.innerWidth <= NAV_BREAKPOINT)
        return;
      clearTimers();
      openTimerRef.current = window.setTimeout(() => {
        updateMenuAnchor(key);
        setOpenKey(key);
      }, 70);
    },
    [clearTimers, updateMenuAnchor],
  );

  const queueClose = useCallback(() => {
    if (typeof window === "undefined" || window.innerWidth <= NAV_BREAKPOINT)
      return;
    clearTimers();
    closeTimerRef.current = window.setTimeout(() => setOpenKey(null), 170);
  }, [clearTimers]);

  const openImmediate = useCallback(
    (key: string) => {
      if (
        typeof window === "undefined" ||
        window.innerWidth <= NAV_BREAKPOINT
      ) {
        setMobileOpen(true);
        return;
      }
      clearTimers();
      updateMenuAnchor(key);
      setOpenKey(key);
    },
    [clearTimers, updateMenuAnchor],
  );

  const closeAll = useCallback(() => {
    clearTimers();
    setOpenKey(null);
    setMobileOpen(false);
  }, [clearTimers]);

  const returnHome = (event: MouseEvent<HTMLAnchorElement>) => {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    )
      return;
    closeAll();
    setIsBallExpanded(false);
    if (homeActive) {
      event.preventDefault();
      window.dispatchEvent(new Event(HOME_INTRO_REPLAY_EVENT));
    }
  };

  const handleCrestClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (isBallMode && !isBallExpanded) {
      event.preventDefault();
      setIsBallExpanded(true);
      return;
    }
    const target = event.target as HTMLElement | null;
    if (isBallMode && isBallExpanded && target?.closest(".wordmark-crest")) {
      event.preventDefault();
      setIsBallExpanded(false);
      return;
    }
    returnHome(event);
  };

  // Close on route change
  useEffect(() => {
    closeAll();
  }, [pathname, closeAll]);

  // Clean up timers on unmount
  useEffect(() => () => clearTimers(), [clearTimers]);

  useEffect(() => {
    if (!openKey) return;
    const onResize = () => updateMenuAnchor(openKey);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [openKey, updateMenuAnchor]);

  // The dark header belongs only to Home's opening scene. Reuse the progress
  // listener so scrolling back, resizing and route changes restore its theme.
  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;
    if (header.style.getPropertyValue("--scroll-p") !== "0") {
      header.style.setProperty("--scroll-p", "0");
    }
    const root = document.documentElement;
    let frame = 0;
    let lastY = window.scrollY;

    const paint = () => {
      frame = 0;
      const currentY = window.scrollY;
      const delta = currentY - lastY;
      lastY = currentY;

      const max = root.scrollHeight - window.innerHeight;
      const progress =
        max > 0 ? Math.min(1, Math.max(0, currentY / max)) : 0;
      const progressValue = progress.toFixed(4);
      // CROSS-FILE: reads Home DOM every frame. .home-scene01 lives in
      // contents/home-scene-01.tsx and #home-finale in HomeFinale.tsx.
      // Renaming either of them
      // silently breaks the header theme (data-home-opening/-closing, styled in
      // circure-nav.css). HomeIntro.tsx also measures .logo-word-full below.
      const opening = homeActive
        ? document.querySelector<HTMLElement>(".home-scene01")
        : null;
      const headerHeight = Number.parseFloat(
        getComputedStyle(header).getPropertyValue("--header-height"),
      ) || 0;
      // Home loads lazily after the header. Keep its initial dark theme until
      // the opening scene mounts, then let scrolling determine the theme.
      const isOpening =
        homeActive &&
        (!opening || opening.getBoundingClientRect().bottom > headerHeight);
      const homeOpening = String(isOpening);

      const closing = homeActive
        ? document.getElementById("home-finale")?.getBoundingClientRect()
        : null;
      const isClosing =
        homeActive &&
        !!closing && closing.top <= headerHeight + 50;
      const homeClosing = String(isClosing);

      // Finish layout reads before changing styles or header theme attributes.
      if (header.style.getPropertyValue("--scroll-p") !== progressValue) {
        header.style.setProperty("--scroll-p", progressValue);
      }
      if (header.dataset.homeOpening !== homeOpening) {
        header.dataset.homeOpening = homeOpening;
      }
      if (header.dataset.homeClosing !== homeClosing) {
        header.dataset.homeClosing = homeClosing;
      }

      if (homeActive) {
        const nextBallMode = !isOpening && !isClosing;
        setIsBallMode((prev) => (prev === nextBallMode ? prev : nextBallMode));

        if (nextBallMode) {
          if (delta > 0) {
            if (scrollDeltaRef.current < 0) scrollDeltaRef.current = 0;
            scrollDeltaRef.current += delta;
            if (scrollDeltaRef.current > 18) {
              setIsBallExpanded(false);
              clearTimers();
              setOpenKey(null);
            }
          } else if (delta < 0) {
            if (scrollDeltaRef.current > 0) scrollDeltaRef.current = 0;
            scrollDeltaRef.current += delta;
            if (scrollDeltaRef.current < -18) {
              setIsBallExpanded(true);
            }
          }
        } else {
          setIsBallExpanded(false);
          scrollDeltaRef.current = 0;
        }
      } else {
        setIsBallMode(false);
        setIsBallExpanded(false);
        scrollDeltaRef.current = 0;
      }
    };

    const request = () => {
      if (!frame) frame = window.requestAnimationFrame(paint);
    };
    const onScroll = () => request();
    const onResize = () => request();
    paint();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [pathname, homeActive, clearTimers]);

  // Click-outside to close whichever menu is open (desktop, mobile, or expanded ball)
  useEffect(() => {
    if (!openKey && !mobileOpen && !isBallExpanded) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!headerRef.current) return;
      if (headerRef.current.contains(event.target as Node)) return;
      closeAll();
      if (isBallExpanded) setIsBallExpanded(false);
    };
    document.addEventListener("pointerdown", onPointerDown, true);
    return () =>
      document.removeEventListener("pointerdown", onPointerDown, true);
  }, [openKey, mobileOpen, isBallExpanded, closeAll]);

  // Escape closes whichever menu is open and restores focus to its toggle
  useEffect(() => {
    if (!openKey && !mobileOpen && !isBallExpanded) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      event.preventDefault();
      if (mobileOpen) {
        setMobileOpen(false);
        clearTimers();
        mobileToggleRef.current?.focus();
      } else if (isBallExpanded) {
        setIsBallExpanded(false);
        clearTimers();
      } else {
        const toggle = shellRef.current?.querySelector<HTMLButtonElement>(
          `button[aria-controls="circure-nav-menu"][aria-expanded="true"]`,
        );
        setOpenKey(null);
        clearTimers();
        toggle?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [openKey, mobileOpen, clearTimers]);

  // Arrow Left/Right cycling among dropdown toggles
  const onToggleKeydown = useCallback(
    (event: React.KeyboardEvent<HTMLButtonElement>) => {
      if (event.key === "ArrowDown") {
        event.preventDefault();
        const key = event.currentTarget.dataset.navKey;
        if (!key) return;
        openImmediate(key);
        window.requestAnimationFrame(() => {
          shellRef.current?.querySelector<HTMLAnchorElement>(
            ".circure-nav-panel.is-active .nav-image-card",
          )?.focus();
        });
        return;
      }
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
      event.preventDefault();
      const toggles = Array.from(
        shellRef.current?.querySelectorAll<HTMLButtonElement>(
          `button[aria-controls="circure-nav-menu"]`,
        ) ?? [],
      );
      if (toggles.length === 0) return;
      const currentIndex = toggles.findIndex((t) => t === event.currentTarget);
      const nextIndex =
        event.key === "ArrowRight"
          ? (currentIndex + 1) % toggles.length
          : (currentIndex - 1 + toggles.length) % toggles.length;
      const nextToggle = toggles[nextIndex];
      nextToggle.focus();
      const nextKey = nextToggle.dataset.navKey;
      if (nextKey) openImmediate(nextKey);
    },
    [openImmediate],
  );

  // Reader-route modules recolour the fixed bar and its pills from their own
  // palette (`route-palette-<module>.css`). The footer needs the same answer and
  // lives outside the reader tree, so both read it from `useRouteModule`.
  const headerClassName = [
    "site-header",
    module.home ? "is-home-page" : "",
    isBallMode ? "is-nav-ball" : "",
    isBallMode && isBallExpanded ? "is-ball-expanded" : "",
    openKey ? "is-nav-open" : "",
    mobileOpen ? "is-mobile-open" : "",
    module.className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <>
      <svg
        aria-hidden="true"
        style={{
          position: "absolute",
          width: 0,
          height: 0,
          overflow: "hidden",
        }}
        focusable="false"
      >
        <symbol id="circure-ribbon-knot" viewBox="0 0 32 46">
          <path d="M8.2 41C10.8 32.6 19.8 24.7 21.4 15.9C22.6 9.2 18.4 5.1 14.3 6.6C9.7 8.2 9.6 13.3 12.4 18.3C15.7 24.2 21.8 31.3 24.2 41" />
        </symbol>
      </svg>

      <header
        ref={headerRef}
        className={headerClassName}
        data-header
        data-home-opening={homeActive ? "true" : undefined}
        data-home-ball={isBallMode ? "true" : undefined}
        data-ball-expanded={isBallMode && isBallExpanded ? "true" : undefined}
        data-nav-theme={openKey ?? undefined}
      >
        <div
          className="circure-nav-shell"
          ref={shellRef}
          onPointerEnter={openKey ? clearTimers : undefined}
          onPointerLeave={openKey ? queueClose : undefined}
        >
          <div className="circure-nav-head">
            <Link
              to="/"
              className={`wordmark ${isBallMode ? "is-ball-target" : ""}`}
              aria-label={
                isBallMode && !isBallExpanded
                  ? "Expand navigation menu"
                  : "CirCure home"
              }
              title={
                isBallMode && !isBallExpanded
                  ? "Click to expand navigation"
                  : undefined
              }
              onClick={handleCrestClick}
            >
              <span className="wordmark-stage" aria-hidden="true">
                <span className="wordmark-crest">
                  <img
                    className="team-crest logo--dark"
                    src={teamCrestUrl}
                    alt=""
                  />
                  {isBallMode && !isBallExpanded && (
                    <span className="ball-pulse-ring" aria-hidden="true" />
                  )}
                </span>
                <span className="logo-word-full">CirCure</span>
                <svg className="logo-symbol" viewBox="0 0 40 40">
                  <circle
                    className="logo-ring"
                    pathLength={1}
                    cx="20"
                    cy="20"
                    r="15.25"
                  />
                  <path
                    className="logo-ribbon"
                    pathLength={1}
                    d="M13.2 29.8C15.3 24.3 21.4 18.2 23 13.1C24.2 9.2 21.8 7 18.9 7.5C15.4 8.1 14.2 11.1 15.8 14.4C17.8 18.7 22.1 23.7 24.3 29.7"
                  />
                  <circle className="logo-junction" cx="9.2" cy="8.8" r="1.7" />
                </svg>
                <span className="wordmark-folio">JLU-FBH · iGEM 2026</span>
              </span>
            </Link>

            <nav className="desktop-nav" aria-label="Primary navigation">
              <ul className="nav-list">
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="/"
                    onClick={returnHome}
                    aria-current={homeActive ? "page" : undefined}
                  >
                    Home
                  </Link>
                </li>
                {DROPDOWNS.map((d) => (
                  <li key={d.key} className="nav-item" data-section={d.key}>
                    <button
                      className="nav-link"
                      type="button"
                      data-nav-key={d.key}
                      aria-expanded={openKey === d.key}
                      aria-controls="circure-nav-menu"
                      aria-current={
                        dropdownActive(pathname, d) ? "page" : undefined
                      }
                      onPointerEnter={() => queueOpen(d.key)}
                      onClick={() => {
                        clearTimers();
                        if (openKey === d.key) setOpenKey(null);
                        else openImmediate(d.key);
                      }}
                      onKeyDown={onToggleKeydown}
                    >
                      {d.label}
                      <svg
                        className="nav-caret"
                        viewBox="0 0 10 6"
                        aria-hidden="true"
                        focusable="false"
                      >
                        <path d="M1 1l4 4 4-4" />
                      </svg>
                    </button>
                  </li>
                ))}
              </ul>
            </nav>

            <PageSearch onOpen={closeAll} menuOpen={!!openKey || mobileOpen} />

            {isBallMode && isBallExpanded && (
              <button
                className="ball-collapse-btn"
                type="button"
                aria-label="Collapse navigation"
                title="Collapse navigation"
                onClick={(e) => {
                  e.stopPropagation();
                  closeAll();
                  setIsBallExpanded(false);
                }}
              >
                <svg
                  viewBox="0 0 20 20"
                  width="16"
                  height="16"
                  aria-hidden="true"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    d="M5 5l10 10M15 5L5 15"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            )}

            <button
              className="mobile-menu-toggle"
              type="button"
              aria-expanded={mobileOpen}
              aria-controls="circure-mobile-menu"
              onClick={() => {
                // Re-open on the module the reader is currently in.
                setMobileGroup(currentDropdownKey);
                setMobileOpen((v) => !v);
              }}
              ref={mobileToggleRef}
            >
              <span>Menu</span>
              <svg
                className="ribbon-mark"
                viewBox="0 0 32 46"
                aria-hidden="true"
              >
                <use href="#circure-ribbon-knot" />
              </svg>
            </button>
          </div>

          <span className="circure-nav-surface" aria-hidden="true">
            {DROPDOWNS.map((dropdown) => (
              <span
                key={`${dropdown.key}-aura`}
                className={`circure-nav-aura circure-nav-aura--${dropdown.key}`}
              />
            ))}
          </span>

          <div
            className={`circure-mega-menu${openKey ? " is-open" : ""}`}
            id="circure-nav-menu"
            aria-hidden={!openKey}
            inert={!openKey || undefined}
            style={{ "--nav-panel-left": `${menuAnchor}px` } as React.CSSProperties}
          >
            {DROPDOWNS.map((d) => {
              const isActivePanel = openKey === d.key;
              return (
                <div
                  key={d.key}
                  className={[
                    "circure-nav-panel",
                    isActivePanel ? "is-active" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  data-nav-panel={d.key}
                  aria-hidden={!isActivePanel}
                  inert={!isActivePanel || undefined}
                  role="navigation"
                  aria-label={`${d.label} pages`}
                >
                  {d.cards.map((c) => (
                    <Link
                      key={c.path}
                      to={c.path}
                      className="nav-image-card"
                      aria-current={isActive(pathname, c.path) ? "page" : undefined}
                      onClick={closeAll}
                    >
                      <span className="nav-card-thumb" aria-hidden="true">
                        {/* Closed panels used to fetch all ~96 thumbnails on
                            first paint. Only request a card's art once its
                            section is actually open. */}
                        <img
                          src={isActivePanel ? c.icon : undefined}
                          alt=""
                          loading="lazy"
                        />
                      </span>
                      <span className="nav-card-info">
                        <strong>{c.name}</strong>
                      </span>
                    </Link>
                  ))}
                </div>
              );
            })}
          </div>

          <nav
            className={`circure-mobile-menu${mobileOpen ? " is-open" : ""}`}
            id="circure-mobile-menu"
            aria-label="Mobile navigation"
            aria-hidden={!mobileOpen}
            inert={!mobileOpen || undefined}
          >
            <Link
              to="/"
              onClick={returnHome}
              aria-current={homeActive ? "page" : undefined}
            >
              Home
            </Link>
            {/* Two-level accordion: each module is a toggle, its pages nest
                underneath. One group open at a time keeps the sheet short. */}
            {DROPDOWNS.map((d) => {
              const groupOpen = mobileGroup === d.key;
              const panelId = `circure-mobile-group-${d.key}`;
              return (
                <div
                  key={d.key}
                  className={`circure-mobile-group${groupOpen ? " is-open" : ""}`}
                >
                  <button
                    type="button"
                    className="circure-mobile-group__toggle"
                    aria-expanded={groupOpen}
                    aria-controls={panelId}
                    aria-current={
                      dropdownActive(pathname, d) ? "true" : undefined
                    }
                    onClick={() => setMobileGroup(groupOpen ? null : d.key)}
                  >
                    <span>{d.label}</span>
                    <svg
                      className="circure-mobile-group__caret"
                      viewBox="0 0 10 6"
                      aria-hidden="true"
                      focusable="false"
                    >
                      <path d="M1 1l4 4 4-4" />
                    </svg>
                  </button>
                  <div
                    className="circure-mobile-group__panel"
                    id={panelId}
                    inert={!groupOpen || undefined}
                  >
                    <div className="circure-mobile-group__list">
                      {d.cards.map((c) => (
                        <Link
                          key={c.path}
                          to={c.path}
                          className="circure-mobile-group__link"
                          aria-current={
                            isActive(pathname, c.path) ? "page" : undefined
                          }
                          onClick={closeAll}
                        >
                          {c.icon ? (
                            <img
                              src={c.icon}
                              alt=""
                              className="circure-mobile-group__icon"
                              loading="eager"
                            />
                          ) : null}
                          <span>{c.name}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </nav>
        </div>
      </header>
    </>
  );
}
