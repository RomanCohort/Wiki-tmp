import type { WikiContentBlock, WikiSection } from "./wikiPageTypes";

const NUMERIC_INDEX = /^\d+(?:\.\d+)*$/;

/** Article depth: chapter = 1, subsection = 2, nested subsection = 3+. */
export function wikiSubheadingDepth(
  heading: Extract<WikiContentBlock, { type: "subheading" }>,
): number {
  return Math.max(
    heading.level === 4 ? 3 : 2,
    heading.index ? heading.index.split(".").length : 0,
  );
}

/** Remove only this heading's index; dates and numbered titles keep their text. */
export function stripWikiHeadingIndex(title: string, index: string): string {
  if (!index) return title;
  const escaped = index.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return title.replace(new RegExp(`^(\\*\\*)?${escaped}[.\\s·•]+`), "$1");
}

/**
 * Overview and the sections preceding it are front matter. Number the remaining
 * chapters once, then derive every subsection from its displayed parent.
 * Manuscript text and anchors stay intact; only heading numbers are presented
 * differently. Explicitly unnumbered sections and subheadings remain so.
 */
export function numberWikiSections(sections: WikiSection[]): WikiSection[] {
  const overview = sections.findIndex((section) =>
    [section.title, section.navLabel].some(
      (title) => title && stripWikiHeadingIndex(title, section.index).trim().toLowerCase() === "overview",
    ),
  );
  let chapter = 0;

  return sections.map((section, position) => {
    const unnumbered = position <= overview || Boolean(section.hideSectionNumber);
    const index = unnumbered ? "" : String(++chapter);
    const subheadings = (section.blocks ?? []).filter(
      (block): block is Extract<WikiContentBlock, { type: "subheading" }> =>
        block.type === "subheading" && NUMERIC_INDEX.test(block.index),
    );
    const baseDepth = subheadings.length
      ? Math.min(...subheadings.map((block) => block.index.split(".").length))
      : 1;
    const counters: number[] = [];

    return {
      ...section,
      index,
      hideSectionNumber: unnumbered,
      title: stripWikiHeadingIndex(section.title, section.index),
      navLabel: section.navLabel === undefined
        ? undefined
        : stripWikiHeadingIndex(section.navLabel, section.index),
      blocks: section.blocks?.map((block): WikiContentBlock => {
        if (block.type !== "subheading") return block;

        let nextIndex = "";
        if (!unnumbered && block.index) {
          const sourceDepth = NUMERIC_INDEX.test(block.index)
            ? block.index.split(".").length
            : baseDepth;
          // Compress missing source parents (e.g. "5.0.1") instead of emitting
          // zero or orphan levels in the reader's outline.
          const depth = Math.max(1, Math.min(sourceDepth - baseDepth + 1, counters.length + 1));
          counters[depth - 1] = (counters[depth - 1] ?? 0) + 1;
          counters.length = depth;
          nextIndex = `${index}.${counters.join(".")}`;
        }

        const cleanTitle = stripWikiHeadingIndex(block.title, block.index);
        const showsIndex = cleanTitle !== block.title || (
          block.level === 4 && Boolean(block.index) && block.index.split(".").length < 3
        );
        return {
          ...block,
          index: nextIndex,
          title: showsIndex && nextIndex
            ? cleanTitle.replace(/^(\*\*)?/, `$1${nextIndex} `)
            : cleanTitle,
        };
      }),
    };
  });
}
