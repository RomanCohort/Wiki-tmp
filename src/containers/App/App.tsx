import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/circure-tokens.css";
import "../../styles/circure-nav.css";
import "../../styles/circure-search.css";
import "../../styles/circure-back-to-top.css";
import "../../styles/circure-cursor.css";
import "../../styles/circure-footer.css";
/* All five module palettes are loaded here, once, rather than by each page
   module. The footer renders outside <Routes> and so outside every palette
   scope, and it is on the page whichever route you are on — a palette that is
   only pulled in by `roster.tsx` simply does not exist on /model, which left
   the footer on its fallback colour on four of the five routes. The per-page
   imports stay in place; they are idempotent, since every rule here is scoped
   to its own `.wiki-page--*` / `.is-<module>-page` class. */
import "../../styles/route-palette-team.css";
import "../../styles/route-palette-project.css";
import "../../styles/route-palette-wetlab.css";
import "../../styles/route-palette-drylab.css";
import "../../styles/route-palette-engagement.css";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { getPathMapping, stringToSlug } from "../../utils";
import { Suspense, useEffect, useLayoutEffect, type ReactNode } from "react";
import { Navbar } from "../../components/Navbar";
import { Header } from "../../components/Header";
import { NotFound } from "../../components/NotFound";
import { Footer } from "../../components/Footer";
import { BackToTop } from "../../components/BackToTop";
import { SheepCursor } from "../../components/SheepCursor";
import {
  hidePageLoaderWhenReady,
  showPageLoader,
} from "../../utils/pageLoader";
import { installHomeArtworkGate } from "../../utils/homeArtworkGate";

// Keep the default Header/container for existing template pages until their
// reader implementations are published. Navigation grouping comes from pages.ts.
const ROUTE_READER_ROUTES = new Set([
  "/",
  "/description", "/engineering", "/safety-and-security", "/hardware",
  "/attributions", "/games", "/roster", "/design",
  "/contribution", "/entrepreneurship", "/visual-design", "/activities",
  "/education", "/alternative-platform",
  "/measurement", "/experiments",
  "/results", "/notebook",
  "/model", "/software",
]);

// This effect commits only after the selected lazy page has mounted. Measuring
// readiness from App itself could inspect the Suspense fallback or the old page.
function PageReady({ children }: { children: ReactNode }) {
  useEffect(() => {
    hidePageLoaderWhenReady();
  }, []);
  return children;
}

const App = () => {
  // Every AVIF has a WebP twin on the CDN. Swap document-wide so routes that
  // never mount the home gate still render on WebViews without AVIF support.
  useEffect(() => installHomeArtworkGate(document.body), []);

  const { pathname } = useLocation();
  const pathMapping = getPathMapping();
  const currentPath =
    pathname.split(`${stringToSlug(import.meta.env.VITE_TEAM_NAME)}`).pop() ||
    "/";

  // Each route loads its own art on demand, so every route change is covered
  // by the static loader from index.html until that route is presentable.
  // Layout effect: the loader must be up before the new page's first paint.
  useLayoutEffect(() => {
    showPageLoader();
  }, [pathname]);

  // React Router can retain the previous page while a lazy route suspends.
  // Cover a real in-app navigation before that transition starts, not only
  // after the new pathname finally commits.
  useEffect(() => {
    const committedPath = window.location.pathname;
    const coverNavigation = (event: MouseEvent) => {
      if (
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      )
        return;
      const link =
        event.target instanceof Element
          ? event.target.closest<HTMLAnchorElement>("a[href]")
          : null;
      if (
        !link ||
        link.hasAttribute("download") ||
        (link.target && link.target !== "_self")
      )
        return;
      const target = new URL(link.href, window.location.href);
      if (
        target.origin === window.location.origin &&
        target.pathname.startsWith(import.meta.env.BASE_URL) &&
        target.pathname !== window.location.pathname
      ) {
        const previousPath = window.location.pathname;
        showPageLoader();
        // A link handler can cancel navigation after this capture listener.
        // The mounted page still needs to release the cover in that case.
        window.setTimeout(() => {
          if (event.defaultPrevented && window.location.pathname === previousPath)
            hidePageLoaderWhenReady();
        }, 0);
      }
    };
    const coverHistoryNavigation = () => {
      if (window.location.pathname !== committedPath) showPageLoader();
      else if (!document.getElementById("page-loader")?.hidden)
        hidePageLoaderWhenReady();
    };
    document.addEventListener("click", coverNavigation, true);
    window.addEventListener("popstate", coverHistoryNavigation);
    return () => {
      document.removeEventListener("click", coverNavigation, true);
      window.removeEventListener("popstate", coverHistoryNavigation);
    };
  }, [pathname]);

  // Set Page Title
  const title =
    currentPath in pathMapping ? pathMapping[currentPath].title : "Not Found";

  useEffect(() => {
    document.title = `${title || ""} | ${import.meta.env.VITE_TEAM_NAME} - iGEM ${import.meta.env.VITE_TEAM_YEAR}`;
  }, [title]);

  // Route changes start a fresh page timeline. Keep hash navigation intact: the
  // page motion hooks resolve the hash after the new content has mounted.
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);

  useEffect(() => {
    const body = document.body;
    const beginPress = (event: MouseEvent) => {
      if (event.button === 0) body.classList.add("is-pressing");
    };
    const endPress = () => body.classList.remove("is-pressing");

    window.addEventListener("mousedown", beginPress);
    window.addEventListener("mouseup", endPress);
    window.addEventListener("blur", endPress);

    return () => {
      window.removeEventListener("mousedown", beginPress);
      window.removeEventListener("mouseup", endPress);
      window.removeEventListener("blur", endPress);
      endPress();
    };
  }, []);

  return (
    <>
      {/* Navigation */}
      <Navbar />

      {/* Header and PageContent */}
      <Suspense fallback={null}>
        <PageReady key={pathname}>
          <Routes>
            {Object.entries(pathMapping).map(
              ([path, { title, lead, component: Component }]) => (
                <Route
                  key={path}
                  path={path}
                  element={
                    ROUTE_READER_ROUTES.has(path) ? (
                      <Component />
                    ) : (
                      <>
                        <Header title={title || ""} lead={lead || ""} />
                        <div className="container">
                          <Component />
                        </div>
                      </>
                    )
                  }
                />
              ),
            )}
            <Route path="/team" element={<Navigate to="/roster" replace />} />
            <Route
              path="/attribution"
              element={<Navigate to="/attributions" replace />}
            />
            <Route
              path="/art"
              element={<Navigate to="/visual-design" replace />}
            />
            <Route
              path="/safety"
              element={<Navigate to="/safety-and-security" replace />}
            />
            <Route
              path="*"
              element={
                <>
                  <Header
                    title="Not Found"
                    lead="The requested URL was not found on this server."
                  />
                  <NotFound />
                </>
              }
            />
          </Routes>
        </PageReady>
      </Suspense>

      <BackToTop />
      <SheepCursor />

      {/* MUST mention license AND have a link to team wiki's repository on gitlab.igem.org */}
      <Footer />
    </>
  );
};

export default App;
