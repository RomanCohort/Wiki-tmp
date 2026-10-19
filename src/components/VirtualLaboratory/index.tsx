import { useEffect, useRef } from "react";

const LAB_URL = "https://virtual-lab-208fd4.igem.wiki/";
const LAB_ORIGIN = new URL(LAB_URL).origin;

/** A separate document keeps the lab's Tailwind styles and viewport intact. */
export default function VirtualLaboratory({
  onRequestClose,
}: {
  onRequestClose: () => void;
}) {
  const frameRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const receive = (event: MessageEvent) => {
      if (
        event.origin === LAB_ORIGIN &&
        event.source === frameRef.current?.contentWindow &&
        event.data?.type === "virtual-lab-close"
      )
        onRequestClose();
    };
    window.addEventListener("message", receive);
    return () => window.removeEventListener("message", receive);
  }, [onRequestClose]);

  return (
    <iframe
      ref={frameRef}
      className="games-experience__lab"
      title="Virtual Laboratory — nine interactive molecular biology experiments"
      src={LAB_URL}
      allow="autoplay; fullscreen"
      loading="lazy"
    />
  );
}
