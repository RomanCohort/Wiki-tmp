export interface LongImageGalleryImage {
  src: string;
  title?: string;
  alt?: string;
  /** Optional image-specific note; manuscript figure captions stay outside. */
  caption?: string;
  thumbnailSrc?: string;
  width?: number;
  height?: number;
}

export interface LongImageGalleryProps {
  images: readonly LongImageGalleryImage[];
  title?: string;
  /** Defaults to the scoped CSS value of 440px. */
  readerHeight?: number;
}
