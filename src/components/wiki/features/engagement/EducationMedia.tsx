import { useEffect, useRef, useState, type CSSProperties, type ReactNode, type TouchEvent } from "react";
import galleries from "../../../../data/engagement/educationGalleries.json";
import mediaGroups from "../../../../data/engagement/educationMediaGroups.json";
import { educationAssetUrl } from "../../../../data/engagement/educationRemoteAssets";
import { DocumentViewer } from "../../documents/DocumentViewer";
import "../../../../styles/features/education-media.css";

type Gallery = (typeof galleries)[number];
type MediaGroup = (typeof mediaGroups)[number];

function useNearViewport<T extends HTMLElement>(rootMargin = "400px 0px") {
  const ref = useRef<T>(null);
  const [near, setNear] = useState(false);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (!("IntersectionObserver" in window)) {
      setNear(true);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => setNear(entry.isIntersecting), { rootMargin });
    observer.observe(element);
    return () => observer.disconnect();
  }, [rootMargin]);
  return { ref, near };
}

const interactivePages = {
  "education-interactive-map": {
    title: "Community & Educational Function Map",
    load: () => import("../../../../data/engagement/interactive/community-educational-function-map.html?raw").then((module) => module.default),
    height: 730,
  },
  "education-interactive-design-board": {
    title: "Education Design Board",
    load: () => import("../../../../data/engagement/interactive/education-design-board.html?raw").then((module) => module.default),
    height: 850,
  },
  "education-interactive-evidence-room": {
    title: "Breast Guardian Evidence Room",
    load: () => import("../../../../data/engagement/interactive/breast-guardian-evidence-room.html?raw").then((module) => module.default),
    height: 900,
  },
} as const;

function InteractivePage({ item }: { item: (typeof interactivePages)[keyof typeof interactivePages] }) {
  const { ref, near } = useNearViewport<HTMLElement>("1200px 0px");
  const [started, setStarted] = useState(false);
  const [html, setHtml] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ready" | "error">("idle");
  const [attempt, setAttempt] = useState(0);
  useEffect(() => { if (near) setStarted(true); }, [near]);
  useEffect(() => {
    if (!started) return;
    let active = true;
    setStatus("loading");
    void item.load().then((content) => {
      if (!active) return;
      setHtml(content);
      setStatus("ready");
    }).catch(() => { if (active) setStatus("error"); });
    return () => { active = false; };
  }, [item, started, attempt]);
  return (
    <section className="education-interactive" aria-label={item.title} ref={ref}>
      <div className="education-interactive__head">
        <strong>{item.title}</strong>
      </div>
      {status === "ready" && html && near ? <iframe srcDoc={html} title={item.title} loading="lazy" sandbox="allow-scripts allow-popups" style={{ height: item.height }} />
        : <div className="education-interactive__launch" style={{ minHeight: item.height }}>
            <p>{status === "loading" ? "Loading activity…" : status === "error" ? "This activity could not load. Please try again." : started ? "Activity ready — scroll here to play." : "Activity loads automatically when you reach this section."}</p>
            {status === "error" ? <button type="button" onClick={() => setAttempt((current) => current + 1)}>Try again</button> : null}
          </div>}
    </section>
  );
}

function MediaGrid({ group }: { group: MediaGroup }) {
  const allPdf = group.items.every((item) => item.kind === "pdf");
  if (allPdf) {
    return (
      <div className="education-document-group">
        {group.items.map((item, index) => {
          const src = educationAssetUrl(item.src);
          const title = "title" in item ? String(item.title) : "Education Document";
          return (
            <DocumentViewer
              key={`${src}-${index}`}
              document={{
                caption: title,
                url: src,
                openUrl: src,
                downloadUrl: src,
              }}
            />
          );
        })}
      </div>
    );
  }

  const { ref, near } = useNearViewport<HTMLDivElement>();
  return (
    <div className="education-media-grid" data-count={group.items.length} ref={ref}>
      {group.items.map((item, index) => {
        const src = educationAssetUrl(item.src);
        return (
          <figure className="education-media-grid__image" key={`${src}-${index}`}>
            {near ? <img src={src} alt={"alt" in item ? item.alt : "Education illustration"} loading="lazy" decoding="async" /> : <span className="education-media-grid__placeholder education-media-grid__placeholder--image" />}
            {"caption" in item && item.caption ? <figcaption>{item.caption}</figcaption> : null}
          </figure>
        );
      })}
    </div>
  );
}

function PhotoGallery({ gallery }: { gallery: Gallery }) {
  const [index, setIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const { ref, near } = useNearViewport<HTMLElement>();
  const photos = gallery.images;
  const count = photos.length;
  const go = (step: number) => setIndex((current) => (current + step + count) % count);
  const onTouchEnd = (event: TouchEvent<HTMLElement>) => {
    if (touchStart === null) return;
    const distance = event.changedTouches[0].clientX - touchStart;
    if (Math.abs(distance) > 45) go(distance < 0 ? 1 : -1);
    setTouchStart(null);
  };
  const visible = [-1, 0, 1].map((offset) => ({
    offset,
    photoIndex: (index + offset + count) % count,
  }));
  return (
    <figure
      className="education-gallery"
      ref={ref}
      aria-label={`${gallery.title} photographs`}
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "ArrowRight") { event.preventDefault(); go(1); }
        if (event.key === "ArrowLeft") { event.preventDefault(); go(-1); }
      }}
      onTouchStart={(event) => setTouchStart(event.touches[0].clientX)}
      onTouchEnd={onTouchEnd}
    >
      <div className="education-gallery__stage">
        {visible.map(({ offset, photoIndex }) => {
          const photo = photos[photoIndex];
          return <button
            type="button"
            className={`education-gallery__card education-gallery__card--${offset === 0 ? "active" : offset < 0 ? "previous" : "next"}`}
            key={`${photo.file}-${offset}`}
            onClick={() => offset && go(offset)}
            aria-label={offset === 0 ? photo.caption : `${offset < 0 ? "Previous" : "Next"}: ${photo.caption}`}
            tabIndex={offset === 0 ? -1 : 0}
          >{near ? <img src={educationAssetUrl(`galleries/${photo.file}`)} alt={photo.caption} loading="lazy" decoding="async" /> : null}</button>;
        })}
        <button type="button" className="education-gallery__arrow education-gallery__arrow--prev" onClick={() => go(-1)} aria-label={`Previous ${gallery.title} photograph`}>‹</button>
        <button type="button" className="education-gallery__arrow education-gallery__arrow--next" onClick={() => go(1)} aria-label={`Next ${gallery.title} photograph`}>›</button>
      </div>
      <figcaption>
        <span>{photos[index].caption}</span>
        <span>{index + 1} / {count}</span>
      </figcaption>
    </figure>
  );
}

const winterStations = [
  { name: "Hailun", filePrefix: "hailun", count: 6 },
  { name: "Yanbian", filePrefix: "jilinyanbian", count: 2 },
  { name: "Chongqing", filePrefix: "chongqing", count: 5 },
  { name: "Jining", filePrefix: "shandongjining", count: 4 },
  { name: "Turin", filePrefix: "yidaliduling", count: 3 },
] as const;

function WinterOutreachGallery() {
  const [stationIndex, setStationIndex] = useState(0);
  const station = winterStations[stationIndex];
  const gallery: Gallery = {
    key: "education-gallery-winter-outreach",
    title: `Winter Outreach · ${station.name}`,
    images: Array.from({ length: station.count }, (_, index) => ({
      file: `new-figure/${station.filePrefix}-${index + 1}.avif`,
      caption: `${station.name} · ${index + 1} / ${station.count}`,
    })),
  };

  return (
    <section className="education-stations" aria-label="Winter Outreach locations">
      <div className="education-stations__labels">
        {winterStations.map((stop, index) => (
          <button
            key={stop.name}
            type="button"
            className={index === stationIndex ? "education-stations__label education-stations__label--active" : "education-stations__label"}
            aria-current={index === stationIndex ? "step" : undefined}
            onClick={() => setStationIndex(index)}
          >{stop.name}</button>
        ))}
      </div>
      <input
        className="education-stations__range"
        type="range"
        min={0}
        max={winterStations.length - 1}
        step={1}
        value={stationIndex}
        onChange={(event) => setStationIndex(Number(event.currentTarget.value))}
        aria-label="Choose a Winter Outreach location"
        aria-valuetext={station.name}
        style={{ "--education-station-progress": `${stationIndex / (winterStations.length - 1) * 100}%` } as CSSProperties}
      />
      <PhotoGallery key={station.name} gallery={gallery} />
    </section>
  );
}

export function educationFeatures() {
  const features: Record<string, ReactNode> = {};
  for (const [key, item] of Object.entries(interactivePages)) {
    features[key] = <InteractivePage item={item} key={key} />;
  }
  for (const gallery of galleries) {
    features[gallery.key] = <PhotoGallery gallery={gallery} key={gallery.key} />;
  }
  features["education-gallery-winter-outreach"] = <WinterOutreachGallery />;
  for (const group of mediaGroups) {
    features[group.key] = <MediaGrid group={group} key={group.key} />;
  }
  features["education-equation-1"] = (
    <div className="education-equation" role="math" aria-label="x sub i equals one if education format i is selected, otherwise zero">
      <span><var>x</var><sub>i</sub> = </span><span className="education-equation__brace">&#123;</span>
      <span className="education-equation__cases"><span>1, <small>if education format <var>i</var> is selected</small></span><span>0, <small>otherwise</small></span></span>
    </div>
  );
  features["education-equation-2"] = (
    <div className="education-equation education-equation--stacked" role="math" aria-label="Coverage and weighted education portfolio objective">
      <div><var>y</var><sub>k</sub> ≤ <span className="education-equation__sum"><sup>n</sup>∑<sub>i=1</sub></span> <var>a</var><sub>ik</sub><var>x</var><sub>i</sub>,</div>
      <div>max <var>Z</var> = <span className="education-equation__sum"><sup>K</sup>∑<sub>k=1</sub></span> <var>w</var><sub>k</sub><var>y</var><sub>k</sub></div>
    </div>
  );
  features["education-equation-3"] = (
    <div className="education-equation" role="math" aria-label="Sum of resources required by selected educational formats is no greater than available resources">
      <span className="education-equation__sum"><sup>n</sup>∑<sub>i=1</sub></span> <var>c</var><sub>ir</sub><var>x</var><sub>i</sub> ≤ <var>C</var><sub>r</sub>
    </div>
  );
  return features;
}

export function renderEducationInline(text: string, fallback: (value: string) => ReactNode): ReactNode {
  text = text.replace(/\*\*(?=\[[^\]]+\]\()/g, "").replace(/(?<=\))\*\*/g, "");
  if (!text.includes("$")) return fallback(text);
  return text.split(/(\$[^$]+\$)/g).map((part, index) => {
    if (!part.startsWith("$") || !part.endsWith("$")) return <span key={index}>{fallback(part)}</span>;
    const formula = part.slice(1, -1);
    const match = formula.match(/^([A-Za-z])_(?:\{([^}]+)\}|([A-Za-z]))$/);
    return match ? <span className="education-inline-math" key={index}><var>{match[1]}</var><sub>{match[2] ?? match[3]}</sub></span>
      : <span className="education-inline-math" key={index}><var>{formula}</var></span>;
  });
}
