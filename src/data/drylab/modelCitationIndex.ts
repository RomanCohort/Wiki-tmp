import type {
  CitationIndex,
  CitationSegment,
} from "../citations/citationTypes";
import type { WikiContentBlock } from "../../components/wiki/wikiPageTypes";
import {
  modelPage,
  modelPanels,
  modelReferences,
  modelReferenceLabels,
  modelJudging,
} from "./modelPage";

/** Recognize caption labels only; prose references such as "Figure 16 summarizes" stay prose. */
export function parseModelFigureCaption(text: string) {
  const match =
    /^[*\s]*Figure\s+[*\s]*(\d+[A-Z]?)[*\s]*[.,:|][*\s]*(.+?)\s*\**$/s.exec(
      text,
    );
  return match
    ? { label: `FIG. ${match[1].padStart(2, "0")}`, text: match[2] }
    : null;
}

/** This manuscript uses comma-separated, frequently bold author/year labels.
 * Match its own bibliography labels without rewriting any displayed copy. */
export function buildModelCitationIndex(): CitationIndex {
  const index: CitationIndex = {
    byParagraph: new Map(),
    byScopedParagraph: new Map(),
    byRef: new Map(),
    issues: [],
  };
  const escape = (text: string) => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  // Repeated generic labels (e.g. different trial registrations from the same
  // database) cannot identify one paper. Keep those bibliography entries without
  // silently linking an ambiguous author/year citation to the wrong study.
  const groups = new Map<string, typeof modelReferenceLabels>();
  for (const label of modelReferenceLabels) {
    const key = `${label.name}\0${label.year}`;
    groups.set(key, [...(groups.get(key) ?? []), label]);
  }
  const labels = [...groups.values()].flatMap((group) => {
    const { id, name, year } = group[0];
    if (group.length > 1) {
      const urls = group.map(
        (label) =>
          modelReferences.find((r) => r.id === label.id)?.links?.[0]?.href,
      );
      if (!urls[0] || !urls.every((url) => url === urls[0])) return [];
    }
    return {
      id,
      pattern: new RegExp(
        `(?:\\*\\*\\s*)?${escape(name)}\\s*[,()]?\\s*${escape(year)}(?!\\w)(?:\\s*\\))?(?:\\.?\\s*\\*\\*)?`,
        "gu",
      ),
    };
  });
  const visit = (text: string, sectionId: string) => {
    text = parseModelFigureCaption(text)?.text ?? text;
    const scopedKey = `${sectionId}\0${text}`;
    if (index.byScopedParagraph!.has(scopedKey)) return;
    const matches = labels
      .flatMap(({ id, pattern }) =>
        [...text.matchAll(pattern)].map((m) => ({
          id,
          start: m.index!,
          text: m[0],
        })),
      )
      .sort((a, b) => a.start - b.start || b.text.length - a.text.length);
    const segments: CitationSegment[] = [];
    const occs = [];
    let cursor = 0;
    for (const match of matches) {
      if (match.start < cursor) continue;
      if (match.start > cursor)
        segments.push({ kind: "text", text: text.slice(cursor, match.start) });
      segments.push({ kind: "cite", refId: match.id, text: match.text });
      const list = index.byRef.get(match.id) ?? [];
      const occurrence = {
        occId: `cite-${match.id}-${list.length + 1}`,
        refId: match.id,
        ordinal: list.length + 1,
        sectionId,
      };
      list.push(occurrence);
      index.byRef.set(match.id, list);
      occs.push(occurrence);
      cursor = match.start + match.text.length;
    }
    if (!occs.length) return;
    if (cursor < text.length)
      segments.push({ kind: "text", text: text.slice(cursor) });
    index.byScopedParagraph!.set(scopedKey, { segments, occs });
    if (!index.byParagraph.has(text))
      index.byParagraph.set(text, { segments, occs });
  };
  const blocks = (items: readonly WikiContentBlock[], sectionId: string) => {
    for (const block of items) {
      if (block.type === "figure" && block.caption)
        visit(block.caption, sectionId);
      if (block.type === "prose")
        block.paragraphs.forEach((text) => visit(text, sectionId));
      if (block.type === "list")
        block.items.forEach((text) => visit(text, sectionId));
      if (block.type === "table")
        [...block.headers, ...block.rows.flat()].forEach((text) =>
          visit(text, sectionId),
        );
      if (block.type === "feature") {
        const panel = modelPanels[block.key];
        if (panel?.kind === "fold") blocks(panel.blocks, block.key);
        if (panel?.kind === "tabs")
          panel.entries.forEach((entry) => blocks(entry.blocks, block.key));
      }
    }
  };
  modelPage.sections.forEach((section) =>
    blocks(section.blocks ?? [], section.id),
  );
  modelJudging.forEach((criterion) =>
    criterion.paragraphs.forEach((text) => visit(text, "model-judging")),
  );
  return index;
}
