import { renderInlineFormatting } from "../../../proseInline";

/** Keep bold, italic and scientific notation consistent with the shared reader. */
export function RichText({ text }: { text: string }) {
  return <>{renderInlineFormatting(text)}</>;
}
