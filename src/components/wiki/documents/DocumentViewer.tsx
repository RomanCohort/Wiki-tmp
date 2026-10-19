import { useEffect, useId, useRef, useState } from "react";
import "../../../styles/wiki-documents.css";

/**
 * Shared document viewer for the wiki.
 *
 * Implements the housing convention's §4.6 pattern: a document displayed in the
 * body as a card that is **collapsed until the reader asks for it**. Collapsed is
 * the default so the frame it opens is a browser PDF plugin — a separate
 * process surface that is not free to composite, and that nothing on the page
 * needs before the reader actually wants to read the document.
 *
 * Three rules this component exists to enforce:
 *
 *   1. **The manuscript writes the card, not the developer.** The only text on
 *      the card is the document's own caption — the line the source manuscript
 *      already gives for this embed (on Design, `Figure 9. Experimental Design
 *      Report, NC3Rs EDA.`). No invented title, subtitle, file name or "PDF"
 *      badge: every one of those is a sentence the team never wrote, and the
 *      page ends up saying the same thing three times.
 *   2. **It must not read as a figure caption.** A first version was caption-sized
 *      grey type in the prose column, and the team read it as a second caption
 *      under the figure above it. Hence the deep tinted surface and a real
 *      control. It is deliberately **not** a `.wiki-figure` — the reader's blue
 *      `FIG. nn` badge hangs on that class.
 *
 *   3. **No decoration.** No icon, no file-type badge, no colour rail along the
 *      top edge, no dot: the reader's own rules ban AI eyebrows and mechanical
 *      small print (铁律 4) and generative ornaments such as top rules and dots
 *      (铁律 3). The colour that distinguishes the block is the block's own
 *      surface.
 */

export interface WikiDocument {
  /**
   * The manuscript's own words for this document — the only text shown, and the
   * frame's accessible name.
   */
  caption: string;
  /** Resolved URL — always built through the page's own document resolver. */
  url: string;
  /** Optional manuscript-provided description shown after the card opens. */
  description?: string;
  /** Optional direct links preserved from the manuscript's embed. */
  openUrl?: string;
  downloadUrl?: string;
  fallbackText?: string;
}

type DocumentViewerProps = {
  document: WikiDocument;
  defaultOpen?: boolean;
  readLabel?: string;
  closeLabel?: string;
} & (
  | { variant?: "inline" }
  | { variant: "modal"; open: boolean; onOpenChange: (open: boolean) => void }
);

export function DocumentViewer(props: DocumentViewerProps) {
  return props.variant === "modal" ? (
    <DocumentDialog
      document={props.document}
      open={props.open}
      onOpenChange={props.onOpenChange}
    />
  ) : (
    <InlineDocumentViewer {...props} />
  );
}

/** Native top-layer dialog keeps the route palette and traps focus, including
 * the PDF frame. The browser restores focus to the attachment/folder button. */
function DocumentDialog({
  document,
  open,
  onOpenChange,
}: {
  document: WikiDocument;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const opener = window.document.activeElement;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
    return () => {
      if (dialog.open) dialog.close();
      if (opener instanceof HTMLElement && opener.isConnected)
        opener.focus({ preventScroll: true });
    };
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      className="wiki-document wiki-document--modal"
      aria-labelledby={titleId}
      onCancel={() => onOpenChange(false)}
      onClose={() => {
        // Ignore the queued close event from React's development effect replay
        // if that replay has already opened the dialog again.
        if (!dialogRef.current?.open) onOpenChange(false);
      }}
      onClick={(event) => {
        if (event.target !== event.currentTarget) return;
        const bounds = event.currentTarget.getBoundingClientRect();
        if (
          event.clientX < bounds.left ||
          event.clientX > bounds.right ||
          event.clientY < bounds.top ||
          event.clientY > bounds.bottom
        )
          onOpenChange(false);
      }}
    >
      <header className="wiki-document__card">
        <h2 className="wiki-document__caption" id={titleId}>
          {document.caption}
        </h2>
        <button
          type="button"
          className="wiki-document__toggle"
          autoFocus
          onClick={() => onOpenChange(false)}
        >
          Close
        </button>
      </header>
      <div className="wiki-document__panel">
        {open ? <DocumentContents document={document} /> : null}
      </div>
    </dialog>
  );
}

function DocumentContents({ document }: { document: WikiDocument }) {
  return (
    <>
      {document.description ? (
        <p className="wiki-document__description">{document.description}</p>
      ) : null}
      {document.openUrl || document.downloadUrl ? (
        <p className="wiki-document__actions">
          {document.openUrl ? (
            <a href={document.openUrl} target="_blank" rel="noreferrer">
              Open PDF
            </a>
          ) : null}
          {document.openUrl && document.downloadUrl ? " or " : null}
          {document.downloadUrl ? (
            <a href={document.downloadUrl} download>
              download the guide
            </a>
          ) : null}
          .
        </p>
      ) : null}
      <iframe
        className="wiki-document__frame"
        src={document.url}
        title={document.caption}
      />
      {document.fallbackText ? (
        <p className="wiki-document__fallback">{document.fallbackText}</p>
      ) : null}
    </>
  );
}

function InlineDocumentViewer({
  document,
  /** Open on first paint. Off by default; the Sustainability report passes true. */
  defaultOpen = false,
  /** Labels for the collapse control, so a manual is not called a "report". */
  readLabel = "Read",
  closeLabel = "Close",
}: {
  document: WikiDocument;
  defaultOpen?: boolean;
  readLabel?: string;
  closeLabel?: string;
}) {
  const [open, setOpen] = useState(defaultOpen);
  /** Once opened the frame stays mounted: re-creating a PDF surface on every
      toggle would reload the document and lose the reader's page. */
  const [mounted, setMounted] = useState(defaultOpen);
  const panelId = useId();
  const toggleLabel = open ? closeLabel : readLabel;

  const toggle = () => {
    setOpen((previous) => {
      if (!previous) setMounted(true);
      return !previous;
    });
  };

  return (
    <figure className={`wiki-document${open ? " is-open" : ""}`}>
      <div className="wiki-document__card">
        <p className="wiki-document__caption">{document.caption}</p>
        <button
          type="button"
          className="wiki-document__toggle"
          aria-expanded={open}
          aria-controls={panelId}
          aria-label={`${toggleLabel} — ${document.caption}`}
          onClick={toggle}
        >
          <span className="wiki-document__chevron" aria-hidden="true" />
          {toggleLabel}
        </button>
      </div>

      <div className="wiki-document__panel" id={panelId} hidden={!open}>
        {mounted ? <DocumentContents document={document} /> : null}
      </div>
    </figure>
  );
}
