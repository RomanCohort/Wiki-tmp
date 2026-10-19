import {
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type RefObject,
} from "react";
import * as Dialog from "@radix-ui/react-dialog";
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Maximize2,
  Minus,
  Plus,
  X,
} from "lucide-react";
import { PageImagePreloads } from "../../common/PageImagePreloads";
import type {
  LongImageGalleryImage,
  LongImageGalleryProps,
} from "./longImageGalleryTypes";
import "../../../styles/features/long-image-gallery.css";

function imageName(image: LongImageGalleryImage, index: number) {
  return image.title || `Image ${index + 1}`;
}

function ImageNavigation({
  index,
  count,
  onSelect,
}: {
  index: number;
  count: number;
  onSelect: (index: number) => void;
}) {
  return (
    <>
      <button
        type="button"
        className="wiki-long-gallery__button"
        aria-label="Previous image"
        disabled={count < 2 || index === 0}
        onClick={() => onSelect(index - 1)}
      >
        <ChevronLeft size={16} aria-hidden="true" /> Previous
      </button>
      <button
        type="button"
        className="wiki-long-gallery__button"
        aria-label="Next image"
        disabled={count < 2 || index === count - 1}
        onClick={() => onSelect(index + 1)}
      >
        Next <ChevronRight size={16} aria-hidden="true" />
      </button>
    </>
  );
}

/** Keyed by the selected image so every new image starts at its top. */
function ImageReader({
  image,
  name,
  id,
  zoom = 100,
  viewportRef,
}: {
  image: LongImageGalleryImage;
  name: string;
  id?: string;
  zoom?: number;
  viewportRef?: RefObject<HTMLDivElement | null>;
}) {
  const [status, setStatus] = useState<"loading" | "ready" | "error">(
    "loading",
  );
  const [attempt, setAttempt] = useState(0);
  const imageRef = useRef<HTMLImageElement>(null);

  useLayoutEffect(() => {
    const element = imageRef.current;
    if (element?.complete)
      setStatus(element.naturalWidth > 0 ? "ready" : "error");
  }, [attempt]);

  return (
    <div
      ref={viewportRef}
      id={id}
      className="wiki-long-gallery__reader"
      role="region"
      aria-label={`${name} reading area`}
      aria-busy={status === "loading"}
      tabIndex={0}
    >
      <div
        className="wiki-long-gallery__canvas"
        style={{ "--long-gallery-zoom": `${zoom}%` } as CSSProperties}
      >
        <img
          ref={imageRef}
          key={attempt}
          className="wiki-long-gallery__image"
          data-state={status}
          src={image.src}
          alt={image.alt || name}
          width={image.width}
          height={image.height}
          decoding="async"
          onLoad={() => setStatus("ready")}
          onError={() => setStatus("error")}
        />
        {image.caption && status === "ready" ? (
          <div className="wiki-long-gallery__caption">{image.caption}</div>
        ) : null}
      </div>
      {status !== "ready" ? (
        <div
          className="wiki-long-gallery__status"
          role={status === "error" ? "alert" : "status"}
        >
          {status === "loading" ? (
            "Loading image…"
          ) : (
            <>
              <span>This image could not be loaded.</span>
              <button
                type="button"
                className="wiki-long-gallery__button"
                onClick={() => {
                  setStatus("loading");
                  setAttempt((value) => value + 1);
                }}
              >
                Retry
              </button>
            </>
          )}
        </div>
      ) : null}
    </div>
  );
}

function Thumbnail({ image }: { image: LongImageGalleryImage }) {
  const [failed, setFailed] = useState(false);
  return failed ? (
    <span className="wiki-long-gallery__thumbnail-fallback">No preview</span>
  ) : (
    <img
      src={image.thumbnailSrc || image.src}
      alt=""
      decoding="async"
      onError={() => setFailed(true)}
    />
  );
}

function EnlargedReader({
  image,
  index,
  count,
  title,
  onSelect,
}: {
  image: LongImageGalleryImage;
  index: number;
  count: number;
  title: string;
  onSelect: (index: number) => void;
}) {
  const [zoom, setZoom] = useState(100);
  const previousZoom = useRef(zoom);
  const viewportRef = useRef<HTMLDivElement>(null);
  const name = imageName(image, index);

  useLayoutEffect(() => {
    const viewport = viewportRef.current;
    if (viewport) {
      const ratio = zoom / previousZoom.current;
      viewport.scrollTop *= ratio;
      viewport.scrollLeft =
        (viewport.scrollLeft + viewport.clientWidth / 2) * ratio -
        viewport.clientWidth / 2;
    }
    previousZoom.current = zoom;
  }, [zoom]);

  return (
    <>
      <header className="wiki-long-gallery__toolbar">
        <div className="wiki-long-gallery__heading">
          <Dialog.Title className="wiki-long-gallery__title">
            {title}
          </Dialog.Title>
          <div
            className="wiki-long-gallery__current"
            aria-live="polite"
            aria-atomic="true"
          >
            <span>{name}</span>
            <span className="wiki-long-gallery__count">
              {index + 1} / {count}
            </span>
          </div>
        </div>
        <div className="wiki-long-gallery__actions">
          <ImageNavigation index={index} count={count} onSelect={onSelect} />
          <Dialog.Close
            className="wiki-long-gallery__button"
            aria-label="Close enlarged reader"
            autoFocus
          >
            <X size={16} aria-hidden="true" /> Close
          </Dialog.Close>
        </div>
      </header>
      <Dialog.Description className="wiki-long-gallery__sr-only">
        Scroll to read the complete image. Zoom from 50% to 200%. Press Escape
        to close.
      </Dialog.Description>
      <div
        className="wiki-long-gallery__zoom-tools"
        role="group"
        aria-label="Image zoom"
      >
        <button
          type="button"
          className="wiki-long-gallery__button"
          aria-label="Zoom out"
          disabled={zoom === 50}
          onClick={() => setZoom((value) => Math.max(50, value - 25))}
        >
          <Minus size={16} aria-hidden="true" />
        </button>
        <output
          className="wiki-long-gallery__zoom-value"
          aria-label="Zoom level"
          aria-live="polite"
        >
          {zoom}%
        </output>
        <button
          type="button"
          className="wiki-long-gallery__button"
          aria-label="Zoom in"
          disabled={zoom === 200}
          onClick={() => setZoom((value) => Math.min(200, value + 25))}
        >
          <Plus size={16} aria-hidden="true" />
        </button>
        <button
          type="button"
          className="wiki-long-gallery__button"
          onClick={() => setZoom(100)}
        >
          Fit width
        </button>
        <a
          className="wiki-long-gallery__button wiki-long-gallery__original"
          href={image.src}
          target="_blank"
          rel="noopener noreferrer"
        >
          View original <ExternalLink size={14} aria-hidden="true" />
        </a>
      </div>
      <ImageReader
        key={`${index}:${image.src}`}
        image={image}
        name={name}
        zoom={zoom}
        viewportRef={viewportRef}
      />
    </>
  );
}

/** Independent, data-driven image collections; figure metadata belongs to the caller. */
export function LongImageGallery({
  images,
  title = "Image gallery",
  readerHeight,
}: LongImageGalleryProps) {
  const [selected, setSelected] = useState(0);
  const [open, setOpen] = useState(false);
  const titleId = useId();
  const readerId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const index = Math.max(0, Math.min(selected, images.length - 1));
  const image = images[index];

  function selectImage(nextIndex: number) {
    setSelected(Math.max(0, Math.min(nextIndex, images.length - 1)));
  }

  return (
    <Dialog.Root open={open && !!image} onOpenChange={setOpen}>
      <section
        className="wiki-long-gallery"
        aria-labelledby={titleId}
        style={
          readerHeight && Number.isFinite(readerHeight) && readerHeight > 0
            ? ({
                "--long-gallery-reader-height": `${readerHeight}px`,
              } as CSSProperties)
            : undefined
        }
      >
        <PageImagePreloads
          sources={images.flatMap((item) => [item.src, item.thumbnailSrc])}
        />
        <header className="wiki-long-gallery__toolbar">
          <div className="wiki-long-gallery__heading">
            <div className="wiki-long-gallery__title" id={titleId}>
              {title}
            </div>
            <div
              className="wiki-long-gallery__current"
              aria-live="polite"
              aria-atomic="true"
            >
              <span>{image ? imageName(image, index) : "No images"}</span>
              <span className="wiki-long-gallery__count">
                {image ? index + 1 : 0} / {images.length}
              </span>
            </div>
          </div>
          <div className="wiki-long-gallery__actions">
            <ImageNavigation
              index={index}
              count={images.length}
              onSelect={selectImage}
            />
            <Dialog.Trigger asChild>
              <button
                ref={triggerRef}
                type="button"
                className="wiki-long-gallery__button wiki-long-gallery__button--primary"
                disabled={!image}
                aria-label="Enlarge reader"
              >
                <Maximize2 size={15} aria-hidden="true" /> Enlarge
              </button>
            </Dialog.Trigger>
          </div>
        </header>
        {image ? (
          <ImageReader
            key={`${index}:${image.src}`}
            id={readerId}
            image={image}
            name={imageName(image, index)}
          />
        ) : (
          <div className="wiki-long-gallery__empty" role="status">
            No images are available in this gallery.
          </div>
        )}
        {images.length ? (
          <div
            className="wiki-long-gallery__thumbnails"
            role="group"
            aria-label="Select an image"
          >
            {images.map((item, itemIndex) => (
              <button
                type="button"
                className="wiki-long-gallery__thumbnail"
                key={`${itemIndex}:${item.src}:${item.thumbnailSrc || ""}`}
                aria-label={`Show ${imageName(item, itemIndex)}, ${itemIndex + 1} of ${images.length}`}
                aria-pressed={itemIndex === index}
                aria-controls={readerId}
                onClick={() => selectImage(itemIndex)}
              >
                <Thumbnail image={item} />
                <span>{imageName(item, itemIndex)}</span>
              </button>
            ))}
          </div>
        ) : null}
      </section>
      <Dialog.Portal>
        <Dialog.Overlay className="wiki-long-gallery-overlay" />
        <Dialog.Content
          className="wiki-long-gallery-dialog"
          onCloseAutoFocus={(event) => {
            event.preventDefault();
            triggerRef.current?.focus({ preventScroll: true });
          }}
        >
          {image ? (
            <EnlargedReader
              image={image}
              index={index}
              count={images.length}
              title={title}
              onSelect={selectImage}
            />
          ) : null}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
