import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";
import { readFile, writeFile } from "node:fs/promises";
import { inflateSync } from "node:zlib";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";

/** Deduplicate iSpring picture comparison data without changing the player metadata. */
async function compactCoursePresentation(outDir: string) {
  const courseDir = resolve(outDir, "experiment9-assets/ispring");
  const entryPath = resolve(courseDir, "index.html");
  const html = await readFile(entryPath, "utf8");
  const metadata = html.match(/var presInfo = "([^"]+)";/);
  if (!metadata) throw new Error("Experiment 9 presentation metadata is missing");
  const presentation: unknown = JSON.parse(
    inflateSync(Buffer.from(metadata[1], "base64")).toString("utf8"),
  );
  const pictures: unknown[][] = [];
  const indices = new Map<string, number>();
  function compact(value: unknown) {
    if (Array.isArray(value)) value.forEach(compact);
    else if (value && typeof value === "object") {
      for (const [key, child] of Object.entries(value)) {
        if (key === "normalizedPic" && Array.isArray(child)) {
          const serialized = JSON.stringify(child);
          let index = indices.get(serialized);
          if (index === undefined) {
            index = pictures.length;
            indices.set(serialized, index);
            pictures.push(child);
          }
          (value as Record<string, unknown>)[key] = index;
        } else compact(child);
      }
    }
  }
  compact(presentation);
  const runtime = `(function () {
var presentation = ${JSON.stringify(presentation)};
var pictures = ${JSON.stringify(pictures)};
function restore(value) {
  if (Array.isArray(value)) value.forEach(restore);
  else if (value && typeof value === "object") {
    Object.keys(value).forEach(function (key) {
      if (key === "normalizedPic" && Number.isInteger(value[key])) {
        value[key] = pictures[value[key]].slice();
      } else restore(value[key]);
    });
  }
}
restore(presentation);
window.__experiment9Presentation = presentation;
})();
`;
  await writeFile(resolve(courseDir, "data/presentation.js"), runtime);
  await writeFile(
    entryPath,
    html
      .replace(metadata[0], "var presInfo = window.__experiment9Presentation;")
      .replace("</head>", '<script src="data/presentation.js"></script>\n</head>'),
  );
}


function compactExperiment9(): Plugin {
  let outDir = resolve("dist");
  return {
    name: "compact-experiment9",
    apply: "build",
    configResolved(config) { outDir = resolve(config.root, config.build.outDir); },
    async closeBundle() { await compactCoursePresentation(outDir); },
  };
}

export default defineConfig({
  // Relative output works under an official Pages project path or a dedicated domain.
  base: "./",
  plugins: [react(), compactExperiment9()],
  css: { postcss: { plugins: [tailwindcss({ config: resolve("tailwind.config.cjs") }), autoprefixer()] } },
  build: { target: "esnext", minify: "esbuild" },
});
