type Fade = "bridge" | "clinical";

const factors = new WeakMap<HTMLElement, Record<Fade, number>>();

// Two adjacent scroll scenes can fade the same reading panel independently.
export function setTnbcCopyOpacity(
  copy: HTMLElement,
  fade: Fade,
  value: number,
) {
  const current = factors.get(copy) ?? { bridge: 1, clinical: 1 };
  current[fade] = value;
  factors.set(copy, current);
  copy.style.opacity = String(current.bridge * current.clinical);
}

export function resetTnbcCopyOpacity(copy: HTMLElement, fade: Fade) {
  const current = factors.get(copy);
  if (!current) return;
  current[fade] = 1;
  copy.style.opacity = String(current.bridge * current.clinical);
  if (current.bridge === 1 && current.clinical === 1) factors.delete(copy);
}
