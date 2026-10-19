/* eslint-disable react-refresh/only-export-components -- Feature registry follows the shared page assembly contract. */
import { useState, type ReactNode } from "react";
import {
  DocumentViewer,
  type WikiDocument,
} from "../../documents/DocumentViewer";
import { PdfToolList } from "../engagement/sustainability/PdfToolList";
import { renderInlineFormatting } from "../../proseInline";
import {
  getSafetyAsset,
  getSafetyDocument,
  safetyLanguages,
  type SafetyAssetKey,
  type SafetyLanguage,
} from "../../../../data/project/safetyAssets";
import {
  safetyFeatureSpecs,
  type SafetyFeatureSpec,
} from "../../../../data/project/safetyPage";
import "../../../../styles/features/safety-panels.css";

/** Preserve the manuscript's combined bold/italic emphasis, which the basic
 * shared formatter does not parse as a single delimiter. */
export function renderSafetyInline(
  text: string,
  fallback: (text: string) => ReactNode,
): ReactNode {
  if (!text.includes("***")) return fallback(text);
  return text.split(/(\*\*\*[^*]+\*\*\*)/g).map((part, index) =>
    part.startsWith("***") && part.endsWith("***") ? (
      <strong key={index}>
        <em>{part.slice(3, -3)}</em>
      </strong>
    ) : (
      <span key={index}>{fallback(part)}</span>
    ),
  );
}

type WhitePaperSpec = Extract<SafetyFeatureSpec, { kind: "white-paper" }>;
type FolderSpec = Extract<SafetyFeatureSpec, { kind: "folders" }>;
type ImageSpec = Extract<SafetyFeatureSpec, { kind: "images" }>;

function SafetyWhitePaper({ spec }: { spec: WhitePaperSpec }) {
  const [language, setLanguage] = useState<SafetyLanguage>("en");
  const [selected, setSelected] = useState<WikiDocument | null>(null);
  const version = spec.versions[language];
  const document = getSafetyDocument(version.document);
  return (
    <div className="safety-white-paper">
      <div
        className="safety-document-languages"
        role="group"
        aria-label={`${document.caption} language`}
      >
        {safetyLanguages.map(({ key, label }) => (
          <button
            type="button"
            key={key}
            aria-pressed={key === language}
            lang={key === "cn" ? "zh" : key}
            onClick={() => setLanguage(key)}
          >
            {label}
          </button>
        ))}
      </div>
      <DocumentViewer document={document} />
      <details className="safety-attachments">
        <summary>
          Attachments <span>({version.attachments.length})</span>
        </summary>
        <ol>
          {version.attachments.map((key) => (
            <li key={key}>
              <button
                type="button"
                aria-haspopup="dialog"
                onClick={() => setSelected(getSafetyDocument(key))}
              >
                {getSafetyDocument(key).caption}
              </button>
            </li>
          ))}
        </ol>
      </details>
      {selected ? (
        <DocumentViewer
          variant="modal"
          document={selected}
          open
          onOpenChange={(open) => {
            if (!open) setSelected(null);
          }}
        />
      ) : null}
    </div>
  );
}

function SafetyFolders({
  spec,
  instance,
}: {
  spec: FolderSpec;
  instance: string;
}) {
  const [selected, setSelected] = useState<WikiDocument | null>(null);
  const tools = spec.documents.map(({ title, versions }) => ({
    title,
    pdfs: safetyLanguages.map(({ key }) => ({
      label: key === "en" ? "English" : key === "cn" ? "Chinese" : "Korean",
      fileName: versions[key],
      url: getSafetyDocument(versions[key]).url,
    })),
  }));
  return (
    <div className="safety-folders">
      <PdfToolList
        tools={tools}
        instance={instance}
        showFileNumbers={false}
        onPdfSelect={(pdf) =>
          setSelected(getSafetyDocument(pdf.fileName as SafetyAssetKey))
        }
      />
      {selected ? (
        <DocumentViewer
          variant="modal"
          document={selected}
          open
          onOpenChange={(open) => {
            if (!open) setSelected(null);
          }}
        />
      ) : null}
    </div>
  );
}

function SafetyImages({
  spec,
  instance,
}: {
  spec: ImageSpec;
  instance?: string;
}) {
  return (
    <figure
      className={`wiki-figure safety-image-group safety-image-group--${spec.layout}${instance ? ` safety-image-group--${instance}` : ""}`}
      data-safety-feature={instance}
    >
      <div className="safety-image-group__grid">
        {spec.images.map((key, index) => {
          const asset = getSafetyAsset(key);
          const language =
            spec.layout === "trilingual" ? safetyLanguages[index] : undefined;
          return (
            <div className="safety-image-group__item" key={key}>
              <img
                src={asset.uploadUrl}
                alt={`${asset.alt}${language ? ` (${language.label})` : `, image ${index + 1}`}`}
                width={asset.width}
                height={asset.height}
                loading="lazy"
                decoding="async"
              />
            </div>
          );
        })}
      </div>
      <figcaption>
        {spec.caption ? renderInlineFormatting(spec.caption) : null}
      </figcaption>
    </figure>
  );
}

export function safetyFeatures(): Record<string, ReactNode> {
  return Object.fromEntries(
    Object.entries(safetyFeatureSpecs).map(([key, spec]) => {
      switch (spec.kind) {
        case "white-paper":
          return [key, <SafetyWhitePaper spec={spec} key={key} />];
        case "folders":
          return [key, <SafetyFolders spec={spec} instance={key} key={key} />];
        case "document":
          return [
            key,
            <DocumentViewer
              document={getSafetyDocument(spec.document)}
              key={key}
            />,
          ];
        case "images":
          return [key, <SafetyImages spec={spec} instance={key} key={key} />];
      }
    }),
  );
}
