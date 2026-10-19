/** Declare small page images whose UI is mounted only after an interaction. */
export function PageImagePreloads({
  sources,
}: {
  sources: readonly (string | undefined)[];
}) {
  return (
    <>
      {[...new Set(sources)].map((src) =>
        src ? <link key={src} rel="preload" as="image" href={src} /> : null,
      )}
    </>
  );
}
