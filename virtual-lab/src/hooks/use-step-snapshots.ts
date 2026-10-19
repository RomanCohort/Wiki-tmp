import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';

interface ElementSnapshot {
  id: string;
  path: number[];
  tag: string;
  style: string | null;
  src: string | null;
}

function stopSceneAnimations(root: HTMLElement | null) {
  if (!root) return;
  for (const animation of gsap.globalTimeline.getChildren(false, true, true)) {
    const tweens = animation instanceof gsap.core.Timeline ? animation.getChildren(true, true, false) : [animation];
    if (tweens.some((tween) => 'targets' in tween && (tween as gsap.core.Tween).targets().some((target: unknown) => target instanceof Node && root.contains(target)))) {
      animation.kill();
    }
  }
}

// Keep the first stable state of each reached step, including imperative scene positions.
export function useStepSnapshots<State extends Record<string, unknown>>(
  step: number,
  busy: boolean,
  captureState: () => State,
  restoreState: (state: State) => void,
) {
  const snapshots = useRef(new Map<number, { state: State; elements: ElementSnapshot[] }>());
  const pending = useRef<ElementSnapshot[] | null>(null);
  const callbacks = useRef({ captureState, restoreState });
  callbacks.current = { captureState, restoreState };

  useLayoutEffect(() => {
    const root = document.querySelector<HTMLElement>('.experiment-shell main');
    if (!root) return;
    if (pending.current) {
      for (const item of pending.current) {
        let node: Element | undefined | null = item.id ? root.querySelector(`[id="${CSS.escape(item.id)}"]`) : root;
        if (!item.id) for (const index of item.path) node = node?.children[index];
        if (!(node instanceof HTMLElement) || node.tagName !== item.tag) continue;
        gsap.set(node, { clearProps: 'all' });
        if (item.style === null) node.removeAttribute('style');
        else node.setAttribute('style', item.style);
        if (item.src !== null) node.setAttribute('src', item.src);
        (gsap.core as unknown as { getCache: (target: Element) => { uncache: number } }).getCache(node).uncache = 1;
      }
      pending.current = null;
    }
    if (busy || snapshots.current.has(step)) return;
    const elements = Array.from(root.querySelectorAll<HTMLElement>('*')).map((node) => {
      const path: number[] = [];
      let cursor: Element | null = node;
      while (cursor && cursor !== root) {
        const parent: Element | null = cursor.parentElement;
        if (!parent) break;
        path.unshift(Array.prototype.indexOf.call(parent.children, cursor));
        cursor = parent;
      }
      return { id: node.id, path, tag: node.tagName, style: node.getAttribute('style'), src: node instanceof HTMLImageElement ? node.getAttribute('src') : null };
    });
    snapshots.current.set(step, { state: structuredClone(callbacks.current.captureState()), elements });
  });

  useLayoutEffect(() => {
    const root = document.querySelector<HTMLElement>('.experiment-shell main');
    return () => stopSceneAnimations(root);
  }, []);

  return {
    restore(target: number) {
      if (target < 0 || target > step || busy) return false;
      const snapshot = snapshots.current.get(target);
      if (!snapshot) return false;
      stopSceneAnimations(document.querySelector<HTMLElement>('.experiment-shell main'));
      for (const index of snapshots.current.keys()) if (index > target) snapshots.current.delete(index);
      pending.current = snapshot.elements;
      callbacks.current.restoreState(structuredClone(snapshot.state));
      return true;
    },
  };
}
