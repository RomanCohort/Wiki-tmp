import type { WikiContentBlock, WikiPageContent } from "./wikiPageTypes";

/** Include figures in closed drawers and inactive DBTL stages. */
export function wikiPageImages(content: WikiPageContent): string[] {
  const images = new Set<string>();
  const visit = (block: WikiContentBlock) => {
    if (block.type === "figure") images.add(block.src);
    if (block.type === "carousel") {
      block.images.forEach((img) => images.add(img.src));
    }
    if (block.type === "dbtl") {
      block.stages.forEach((stage) => stage.blocks.forEach(visit));
    }
    if (block.type === "split") {
      block.prose.forEach(visit);
      visit(block.aside);
    }
  };
  content.sections.forEach((section) => {
    if (section.masthead?.image) images.add(section.masthead.image);
    section.blocks?.forEach(visit);
  });
  return [...images];
}
