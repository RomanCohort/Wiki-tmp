// The upper-right magnifier in thinking-4.webp, clear of the medical tools below.
export const THINKING_MAGNIFIER_CROP = {
  left: 485 / 692,
  top: 0,
  width: 207 / 692,
  height: 216 / 778,
};

/** Reuse the original painting without sampling or dissolving its pixels. */
export function createThinkingGalleryMagnifier(source: HTMLImageElement) {
  const mark = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  mark.setAttribute("viewBox", "485 0 207 216");
  mark.setAttribute("aria-hidden", "true");
  mark.classList.add("home-thinking-gallery-mark");
  const image = document.createElementNS("http://www.w3.org/2000/svg", "image");
  image.setAttribute("href", source.currentSrc || source.src);
  image.setAttribute("width", "692");
  image.setAttribute("height", "778");
  mark.append(image);
  return mark;
}
