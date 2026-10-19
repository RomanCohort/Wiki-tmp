// Animated words keep one searchable text run, even when SplitText hides its
// visual wrappers from assistive technology. Real hidden ancestors stay excluded.
export function collectPageTextMatches(root: ParentNode, query: string, skipSelector: string): Range[] {
  if (!query) return [];
  const matches: Range[] = [];
  const visited = new Set<HTMLElement>();
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const needle = query.toLowerCase().replace(/\u00a0/g, " ");
  while (walker.nextNode()) {
    const node = walker.currentNode;
    const parent = node.parentElement;
    if (!parent) continue;
    const reading = parent.closest<HTMLElement>("[data-home-reading-text]");
    if ((reading || parent).closest(skipSelector)) continue;
    if (reading && visited.has(reading)) continue;
    const nodes: Node[] = [];
    if (reading) {
      visited.add(reading);
      const words = document.createTreeWalker(reading, NodeFilter.SHOW_TEXT);
      while (words.nextNode()) nodes.push(words.currentNode);
    } else {
      nodes.push(node);
    }
    const offsets: number[] = [];
    let text = "";
    nodes.forEach((part) => {
      offsets.push(text.length);
      text += part.nodeValue || "";
    });
    text = text.toLowerCase().replace(/\u00a0/g, " ");
    let index = text.indexOf(needle);
    while (index !== -1) {
      const end = index + query.length;
      const first = nodes.findIndex((part, i) => offsets[i] + (part.nodeValue?.length || 0) > index);
      const last = nodes.findIndex((part, i) => offsets[i] + (part.nodeValue?.length || 0) >= end);
      const range = document.createRange();
      range.setStart(nodes[first], index - offsets[first]);
      range.setEnd(nodes[last], end - offsets[last]);
      matches.push(range);
      index = text.indexOf(needle, end);
    }
  }
  return matches;
}
