import { useEffect, useRef, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown, ArrowLeft, ArrowRight, Pause, Play, X } from "lucide-react";
import { PageImagePreloads } from "../../../common/PageImagePreloads";
import { DriftWall, type DriftWallPhoto } from "../../gallery/DriftWall";
import type { ActivitiesPageContent } from "../../../../data/team/activitiesPage";
import { WikiNextRecord } from "../../WikiNextRecord";
import { whenPageLoaderLeaves } from "../../../../utils/pageLoader";
import "../../../../styles/features/activities-panels.css";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function ActivitiesExperience({
  content,
  photos,
  heroImage,
}: {
  content: ActivitiesPageContent;
  photos: readonly DriftWallPhoto[];
  heroImage: string;
}) {
  const rootRef = useRef<HTMLElement>(null);
  const browseRef = useRef<HTMLButtonElement>(null);
  const photoFlowRef = useRef<HTMLDivElement>(null);
  const allPhotosRef = useRef<HTMLButtonElement>(null);
  const photoFlowScrollRef = useRef(0);
  const lastSelectedRef = useRef<number | null>(null);
  const [paused, setPaused] = useState(false);
  const [browsing, setBrowsing] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);
  const openPhoto = (index: number) => {
    photoFlowScrollRef.current = photoFlowRef.current?.scrollTop ?? 0;
    setBrowsing(false);
    setSelected(index);
  };
  const changePhoto = (step: number) =>
    setSelected((index) =>
      index === null ? null : (index + step + photos.length) % photos.length,
    );

  useEffect(() => {
    if (selected !== null) {
      lastSelectedRef.current = selected;
      // The selected thumbnail becomes hidden while this dialog stays mounted.
      if (
        document.activeElement === document.body ||
        photoFlowRef.current?.contains(document.activeElement)
      ) {
        allPhotosRef.current?.focus({ preventScroll: true });
      }
      return;
    }
    const flow = photoFlowRef.current;
    if (!browsing || !flow) return;
    flow.scrollTop = photoFlowScrollRef.current;
    const tile = flow.querySelector<HTMLButtonElement>(
      `[data-photo-index="${lastSelectedRef.current}"]`,
    );
    tile?.focus({ preventScroll: true });
    tile?.scrollIntoView({ block: "nearest" });
  }, [browsing, selected]);

  useGSAP(
    (_, contextSafe) => {
      if (!contextSafe) return;
      const media = gsap.matchMedia();
      let mounted = true;
      void whenPageLoaderLeaves().then(
        contextSafe(() => {
          if (!mounted) return;
          media.add("(prefers-reduced-motion: no-preference)", () => {
            gsap
              .timeline({
                defaults: { ease: "power3.out", duration: 1.15 },
                scrollTrigger: {
                  trigger: ".activities-opening",
                  start: "top 75%",
                  once: true,
                },
              })
              .from(
                ".activities-opening__copy p",
                { autoAlpha: 0, y: 24, stagger: 0.15 },
                0.2,
              )
              .from(
                ".activities-opening__explore",
                { autoAlpha: 0, y: 12 },
                0.65,
              );
            gsap.fromTo(
              ".activities-gallery__scene",
              { scale: 0.88, autoAlpha: 0.35 },
              {
                scale: 1,
                autoAlpha: 1,
                ease: "none",
                scrollTrigger: {
                  trigger: ".activities-gallery",
                  start: "top bottom",
                  end: () =>
                    `top top+=${getComputedStyle(document.documentElement).getPropertyValue("--header-height").trim()}`,
                  scrub: 0.7,
                },
              },
            );
            gsap.from(".activities-closing p", {
              autoAlpha: 0,
              y: 32,
              stagger: 0.16,
              duration: 1.1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: ".activities-closing",
                start: "top 72%",
                once: true,
              },
            });
            ScrollTrigger.refresh();
          });
        }),
      );
      return () => {
        mounted = false;
        media.revert();
      };
    },
    { scope: rootRef },
  );

  const photo = selected === null ? null : photos[selected];

  return (
    <main
      ref={rootRef}
      className="activities-page wiki-page--route"
      data-wiki-route={content.route}
      aria-labelledby="activities-title"
    >
      <PageImagePreloads
        sources={[heroImage, ...photos.map((item) => item.src)]}
      />
      <header className="activities-hero">
        <h1 id="activities-title" className="activities-sr-only">
          {content.title}
        </h1>
        <img src={heroImage} alt="" fetchPriority="high" />
      </header>
      <section
        className="activities-opening"
        aria-label="Looking back together"
      >
        <div className="activities-opening__copy">
          {content.opening.map((text) => (
            <p key={text}>{text}</p>
          ))}
        </div>
        <a className="activities-opening__explore" href="#activities-photos">
          Explore our moments <ArrowDown aria-hidden="true" size={18} />
        </a>
      </section>

      <section
        id="activities-photos"
        className="activities-gallery"
        aria-label="Team activity photo wall"
      >
        <div className="activities-gallery__viewport">
          <div className="activities-gallery__scene">
            <DriftWall
              photos={photos}
              paused={paused || browsing || selected !== null}
              onSelect={openPhoto}
            />
          </div>
          <div className="activities-gallery__controls">
            <button
              ref={browseRef}
              className="activities-control"
              onClick={() => {
                lastSelectedRef.current = null;
                photoFlowScrollRef.current = 0;
                setBrowsing(true);
              }}
            >
              Browse {photos.length} photos{" "}
              <ArrowRight aria-hidden="true" size={17} />
            </button>
            <button
              className="activities-control activities-control--icon"
              aria-pressed={paused}
              aria-label={paused ? "Resume photo wall" : "Pause photo wall"}
              onClick={() => setPaused(!paused)}
            >
              {paused ? (
                <Play aria-hidden="true" size={18} />
              ) : (
                <Pause aria-hidden="true" size={18} />
              )}
            </button>
          </div>
        </div>
      </section>

      <section
        className="activities-closing"
        aria-label="A thank you to our team"
      >
        {content.closing.map((text, index) => (
          <p
            key={text}
            className={index === 2 ? "activities-closing__last" : undefined}
          >
            {text}
          </p>
        ))}
      </section>

      {"next" in content && content.next ? (
        <WikiNextRecord {...content.next} reveal={false} />
      ) : null}

      <Dialog.Root
        open={browsing || selected !== null}
        onOpenChange={(open) => {
          if (!open) {
            setSelected(null);
            setBrowsing(false);
          }
        }}
      >
        <Dialog.Portal>
          <Dialog.Overlay className="activities-lightbox-overlay" />
          <Dialog.Content
            className={`activities-lightbox${browsing ? " activities-lightbox--browse" : ""}`}
            onCloseAutoFocus={(event) => {
              event.preventDefault();
              browseRef.current?.focus({ preventScroll: true });
            }}
            onKeyDown={(event) => {
              if (browsing) return;
              if (event.key === "ArrowLeft") {
                event.preventDefault();
                changePhoto(-1);
              }
              if (event.key === "ArrowRight") {
                event.preventDefault();
                changePhoto(1);
              }
            }}
          >
            <Dialog.Title
              className={
                browsing ? "activities-browser__title" : "activities-sr-only"
              }
            >
              All {photos.length} photos
            </Dialog.Title>
            <Dialog.Description className="activities-sr-only">
              Select any photograph to view it in full size. In the photo
              viewer, use the arrow keys to change photos or All photos to
              return to the collection. Press Escape to close.
            </Dialog.Description>
            <Dialog.Close
              className="activities-control activities-lightbox__close"
              aria-label="Close photo viewer"
            >
              <X size={23} />
            </Dialog.Close>
            <div
              ref={photoFlowRef}
              className="activities-browser"
              hidden={!browsing}
            >
              <div className="activities-browser__flow">
                {photos.map((item, index) => (
                  <button
                    key={item.id}
                    className="activities-browser__tile"
                    data-photo-index={index}
                    aria-label={`View photograph ${index + 1}`}
                    onClick={() => openPhoto(index)}
                  >
                    <img src={item.src} alt={item.alt} decoding="async" />
                  </button>
                ))}
              </div>
            </div>
            {photo && !browsing && (
              <button
                ref={allPhotosRef}
                className="activities-control activities-lightbox__all"
                onClick={() => {
                  setSelected(null);
                  setBrowsing(true);
                }}
              >
                <ArrowLeft size={17} aria-hidden="true" /> All photos
              </button>
            )}
            {photo && !browsing && (
              <img
                className="activities-lightbox__photo"
                key={photo.id}
                src={photo.src}
                alt={photo.alt}
              />
            )}
            {!browsing && (
              <div className="activities-lightbox__navigation">
                <button
                  className="activities-control"
                  aria-label="Previous photo"
                  onClick={() => changePhoto(-1)}
                >
                  <ArrowLeft size={20} />
                </button>
                <span aria-live="polite" aria-atomic="true">
                  {(selected ?? 0) + 1} / {photos.length}
                </span>
                <button
                  className="activities-control"
                  aria-label="Next photo"
                  onClick={() => changePhoto(1)}
                >
                  <ArrowRight size={20} />
                </button>
              </div>
            )}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </main>
  );
}
