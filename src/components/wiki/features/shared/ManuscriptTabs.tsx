import { useEffect, useRef, useState, type ReactNode } from "react";
import { flushSync } from "react-dom";
import * as Tabs from "@radix-ui/react-tabs";
import "../../../../styles/features/manuscript-tabs.css";

/** Author-supplied headings and content, without duplicated prose or summaries. */
export function ManuscriptTabs({
  title,
  entries,
}: {
  title: string;
  entries: { title: string; content: ReactNode }[];
}) {
  const [value, setValue] = useState("0");
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Citation backlinks must reveal the destination before the shared jump
    // handler measures it. Keep inactive prose mounted for stable anchor IDs.
    const reveal = (event: MouseEvent) => {
      const link = (event.target as Element).closest(
        'a[href^="#"]',
      );
      if (!link) return;
      const target = document.getElementById(link.getAttribute("href")!.slice(1));
      const panel = target?.closest<HTMLElement>("[data-manuscript-tab]");
      if (!panel || !root.current?.contains(panel)) return;
      flushSync(() => setValue(panel.dataset.manuscriptTab!));
    };
    document.addEventListener("click", reveal, true);
    return () => document.removeEventListener("click", reveal, true);
  }, []);

  return (
    <div ref={root} className="manuscript-tabs">
      <h3 className="manuscript-tabs__heading">{title}</h3>
      <Tabs.Root
        value={value}
        onValueChange={setValue}
        orientation="vertical"
        className="manuscript-tabs__layout"
      >
        <Tabs.List className="manuscript-tabs__list" aria-label={title}>
          {entries.map((entry, i) => (
            <Tabs.Trigger
              className="manuscript-tabs__tab"
              value={String(i)}
              key={i}
            >
              {entry.title}
            </Tabs.Trigger>
          ))}
        </Tabs.List>
        <div className="manuscript-tabs__sheet">
          {entries.map((entry, i) => (
            <Tabs.Content
              forceMount
              data-manuscript-tab={String(i)}
              className="manuscript-tabs__content"
              value={String(i)}
              key={i}
            >
              {entry.content}
            </Tabs.Content>
          ))}
        </div>
      </Tabs.Root>
    </div>
  );
}
