import { useEffect, useState, type RefObject } from "react";

/** Load before the reserved window arrives, without changing document height. */
export function useFooterEasterEgg(rootRef: RefObject<HTMLElement | null>) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setReady(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200% 0px" },
    );
    observer.observe(root);
    return () => observer.disconnect();
  }, [rootRef]);

  return ready;
}
