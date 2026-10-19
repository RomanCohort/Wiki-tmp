import { useEffect, useLayoutEffect, useState, type RefObject } from "react";
import { clamp, scrollReaderToTarget } from "../utils";
import { whenPageLoaderLeaves } from "../utils/pageLoader";

function findSections(root: HTMLElement, sectionIds: string[]) {
  return sectionIds
    .map((id) => document.getElementById(id))
    .filter(
      (section): section is HTMLElement =>
        Boolean(section && root.contains(section)),
    );
}

/** Track reading position without animating the article on scroll. */
export function useWikiPageMotion(
  rootRef: RefObject<HTMLElement | null>,
  sectionIds: string[],
  scrollContainerRef: RefObject<HTMLElement | null>,
  route: string,
  projectedReader = true,
) {
  const [activeSection, setActiveSection] = useState(() => {
    const hash = window.location.hash.slice(1);
    return sectionIds.includes(hash) ? hash : (sectionIds[0] ?? "");
  });
  const [activeSubsection, setActiveSubsection] = useState(() => {
    const hash = window.location.hash.slice(1);
    return hash && !sectionIds.includes(hash) ? hash : "";
  });

  useLayoutEffect(() => {
    const root = rootRef.current;
    const scrollContainer = scrollContainerRef.current;
    if (!root || !scrollContainer) return;

    const sections = findSections(root, sectionIds);
    const progressBar = root.querySelector<HTMLElement>(".wiki-page-progress");
    const article = root.querySelector<HTMLElement>(".wiki-article");
    const outlineAnchors = Array.from(
      root.querySelectorAll<HTMLElement>("[data-wiki-outline-anchor]"),
    );
    const anchorsBySection = new Map(
      sections.map((section) => [
        section.id,
        outlineAnchors.filter((anchor) => section.contains(anchor)),
      ]),
    );

    // Some feature components also use this class for their initial state.
    // All reading content is ready immediately; no reveal observers are needed.
    root.querySelectorAll("[data-wiki-reveal]").forEach((element) => {
      element.classList.add("is-visible");
    });

    let frame = 0;
    let lastProgress = "";
    let locationInitialized = false;
    let previousSection: HTMLElement | undefined;
    let previousAnchor: HTMLElement | undefined;

    const updateReadingPosition = () => {
      frame = 0;
      const containerBounds = scrollContainer.getBoundingClientRect();
      const viewportHeight = projectedReader
        ? scrollContainer.clientHeight
        : window.innerHeight;
      const activationLine = projectedReader
        ? containerBounds.top + Math.min(112, viewportHeight * 0.22)
        : Math.min(viewportHeight * 0.25, 160);
      const scrollable = Math.max(
        1,
        scrollContainer.scrollHeight - viewportHeight,
      );
      const progress = clamp(
        (projectedReader ? scrollContainer.scrollTop : -containerBounds.top) /
          scrollable,
      ).toFixed(4);

      let currentSection = sections[0];
      sections.forEach((section) => {
        if (section.getBoundingClientRect().top <= activationLine) {
          currentSection = section;
        }
      });

      let currentAnchor: HTMLElement | undefined;
      const currentAnchors = currentSection
        ? (anchorsBySection.get(currentSection.id) ?? [])
        : [];
      currentAnchors.forEach((anchor) => {
        if (
          anchor.getClientRects().length &&
          anchor.getBoundingClientRect().top <=
            activationLine + (projectedReader ? 18 : 0)
        ) {
          currentAnchor = anchor;
        }
      });
      if (
        projectedReader &&
        scrollContainer.scrollTop + viewportHeight >=
          scrollContainer.scrollHeight - 4
      ) {
        const lastAnchor = currentAnchors[currentAnchors.length - 1];
        if (
          lastAnchor?.getClientRects().length &&
          lastAnchor.getBoundingClientRect().bottom >= 0
        ) {
          currentAnchor = lastAnchor;
        }
      }

      // Complete geometry reads before changing active styles. Only the
      // progress bar inherits the changing value, never the article subtree.
      if (progressBar && progress !== lastProgress) {
        lastProgress = progress;
        progressBar.style.setProperty("--wiki-page-progress", progress);
      }
      if (!locationInitialized || currentSection !== previousSection) {
        previousSection?.removeAttribute("data-wiki-active");
        currentSection?.setAttribute("data-wiki-active", "");
        previousSection = currentSection;
        setActiveSection(currentSection?.id ?? "");
      }
      if (!locationInitialized || currentAnchor !== previousAnchor) {
        previousAnchor?.removeAttribute("data-wiki-outline-active");
        currentAnchor?.setAttribute("data-wiki-outline-active", "");
        previousAnchor = currentAnchor;
        setActiveSubsection(currentAnchor?.id ?? "");
      }
      locationInitialized = true;
    };

    // At most one update per scroll frame, with no eased animation tail.
    const requestUpdate = () => {
      if (!frame) frame = requestAnimationFrame(updateReadingPosition);
    };
    const scrollTarget: HTMLElement | Window = projectedReader
      ? scrollContainer
      : window;
    const resizeObserver = new ResizeObserver(requestUpdate);
    resizeObserver.observe(scrollContainer);
    if (article) resizeObserver.observe(article);
    sections.forEach((section) => resizeObserver.observe(section));
    scrollTarget.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate, { passive: true });
    requestUpdate();

    return () => {
      if (frame) cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      scrollTarget.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      previousSection?.removeAttribute("data-wiki-active");
      previousAnchor?.removeAttribute("data-wiki-outline-active");
      progressBar?.style.removeProperty("--wiki-page-progress");
    };
  }, [projectedReader, rootRef, route, scrollContainerRef, sectionIds]);

  useEffect(() => {
    // Entry anchors need the styled article and its final reader-track height.
    // The leave signal also runs when an optional asset exceeds the loader's
    // deadline, so a slow CDN cannot skip the initial navigation.
    let mounted = true;
    const scrollToHash = () => {
      const root = rootRef.current;
      if (!mounted || !root) return;
      const hash = window.location.hash.slice(1);
      const target = hash ? document.getElementById(hash) : null;
      if (target && root.contains(target)) {
        scrollReaderToTarget(
          target,
          projectedReader ? scrollContainerRef.current : null,
          "instant",
        );
      }
    };
    void whenPageLoaderLeaves().then(scrollToHash);
    window.addEventListener("hashchange", scrollToHash);
    return () => {
      mounted = false;
      window.removeEventListener("hashchange", scrollToHash);
    };
  }, [projectedReader, rootRef, route, scrollContainerRef]);

  return { activeSection, activeSubsection };
}
