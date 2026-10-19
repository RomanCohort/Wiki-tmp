import { useCallback, useEffect, useRef } from 'react';

export function useExperimentTimers() {
  const timers = useRef(new Set<number>());
  const cancel = useCallback(() => { timers.current.forEach(window.clearTimeout); timers.current.clear(); }, []);
  useEffect(() => cancel, [cancel]);
  const schedule = useCallback((callback: () => void, delay: number) => {
    const timer = window.setTimeout(() => { timers.current.delete(timer); callback(); }, delay);
    timers.current.add(timer);
    return timer;
  }, []);
  return { schedule, cancel };
}
