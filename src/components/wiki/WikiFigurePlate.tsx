import "../../styles/wiki-figure-plate.css";

export interface WikiFigurePlateImage {
  key: string;
  src: string;
  alt: string;
  /** Intrinsic size, so the browser reserves space before the file arrives. */
  width?: number;
  height?: number;
}

interface WikiFigurePlateProps {
  images: readonly WikiFigurePlateImage[];
  columns?: 1 | 2 | 3;
  caption?: string;
  numbered?: boolean;
  shareNumber?: boolean;
  className?: string;
}

export function WikiFigurePlate({
  images,
  columns = 2,
  caption,
  numbered = false,
  shareNumber = false,
  className = "",
}: WikiFigurePlateProps) {
  const grid = (
    <div
      className={`wiki-figure-plate__grid wiki-figure-plate__grid--cols-${columns}`}
    >
      {images.map((image) => (
        <img
          key={image.key}
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          loading="lazy"
          decoding="async"
        />
      ))}
    </div>
  );

  if (!numbered && !caption) {
    return (
      <div className={`wiki-figure-plate wiki-figure-plate--bare ${className}`}>
        {grid}
      </div>
    );
  }

  return (
    <figure
      className={`wiki-figure wiki-figure-plate${
        numbered ? " wiki-figure-plate--numbered" : ""
      }${shareNumber ? " wiki-figure-plate--share-number" : ""} ${className}`}
    >
      {grid}
      {caption ? <figcaption>{caption}</figcaption> : null}
    </figure>
  );
}
