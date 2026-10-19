import { useEffect, useRef } from "react";
import "../../../styles/wiki-html-embed.css";

interface InteractiveHtmlEmbedProps {
  src: string;
  title: string;
}

/** Same-origin HTML tools keep their own scripts and size to their content. */
export function InteractiveHtmlEmbed({
  src,
  title,
}: InteractiveHtmlEmbedProps) {
  const frameRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;
    let observer: ResizeObserver | undefined;
    let cancelFrame = 0;
    let active = true;

    const connect = () => {
      observer?.disconnect();
      const doc = frame.contentDocument;
      const root = doc?.querySelector<HTMLElement>("[data-wiki-embed-root]");
      if (!doc || !root) return;

      const resize = () => {
        if (!active) return;
        cancelAnimationFrame(cancelFrame);
        cancelFrame = requestAnimationFrame(() => {
          const height = Math.ceil(root.getBoundingClientRect().height) + 2;
          frame.style.setProperty("--wiki-html-height", `${height}px`);
        });
      };
      observer = new ResizeObserver(resize);
      observer.observe(root);
      void doc.fonts.ready.then(() => {
        if (!active) return;
        resize();
        frame.dataset.pageEmbedReady = "true";
        frame.dispatchEvent(new Event("wiki-embed-ready"));
      });
      resize();
    };

    frame.addEventListener("load", connect);
    connect();
    return () => {
      active = false;
      frame.removeEventListener("load", connect);
      observer?.disconnect();
      cancelAnimationFrame(cancelFrame);
    };
  }, [src]);

  return (
    <div className="wiki-html-embed">
      <div className="wiki-html-embed__actions">
        <a href={src} target="_blank" rel="noreferrer">
          Open full page <span aria-hidden="true">↗</span>
        </a>
      </div>
      <iframe ref={frameRef} src={src} title={title} data-page-embed-ready="false" />
    </div>
  );
}
