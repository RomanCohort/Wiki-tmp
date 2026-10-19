import type { ReactNode, Ref } from "react";
import "../../../../styles/trop2-complex-viewer.css";

/** Shared Model viewport skin; domain-specific controls remain with the model. */
export function MolecularViewerFrame({
  figureRef,
  containerRef,
  label,
  loading,
  error,
  caption,
  children,
  className = "",
}: {
  figureRef: Ref<HTMLElement>;
  containerRef: Ref<HTMLDivElement>;
  label: string;
  loading: boolean;
  error?: ReactNode;
  caption: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <figure
      ref={figureRef}
      className={`trop2-viewer-container ${className}`}
      aria-label={label}
    >
      <div className="trop2-viewer-stage">
        {loading && (
          <div className="trop2-viewer-loading" role="status">
            <div className="trop2-viewer-spinner" />
            <span>Loading 3D structure...</span>
          </div>
        )}
        {error && (
          <div className="trop2-viewer-loading" role="alert">
            {error}
          </div>
        )}
        <div
          ref={containerRef}
          className="trop2-viewer-canvas"
          data-native-cursor
        />
        {children}
      </div>
      <figcaption className="trop2-viewer-caption">{caption}</figcaption>
    </figure>
  );
}
