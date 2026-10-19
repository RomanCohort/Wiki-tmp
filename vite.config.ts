import { defineConfig, loadEnv, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import { stringToSlug } from "./src/utils/stringToSlug";
import { resolve } from "node:path";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";
import { build as bundleModule } from "esbuild";

/** Compile Mol* separately so Rollup does not retain its full module graph. */
function molecularRuntime(): Plugin {
  const moduleId = "virtual:molecular-runtime";
  const resolvedId = `\0${moduleId}`;
  let root = process.cwd();
  let production = false;
  return {
    name: "molecular-runtime",
    configResolved(config) {
      root = config.root;
      production = config.command === "build";
    },
    resolveId(id) {
      if (id === moduleId) return resolvedId;
    },
    async load(id) {
      if (id !== resolvedId) return;
      const source = "/src/components/wiki/features/shared/molstarRuntime.ts";
      if (!production) return `export { Viewer } from ${JSON.stringify(source)};`;
      const result = await bundleModule({
        entryPoints: [resolve(root, source.slice(1))],
        bundle: true,
        format: "esm",
        platform: "browser",
        target: "esnext",
        minify: true,
        write: false,
      });
      const asset = this.emitFile({
        type: "asset",
        name: "molstar-runtime.js",
        source: result.outputFiles[0].contents,
      });
      return `const runtime = await import(/* @vite-ignore */ import.meta.ROLLUP_FILE_URL_${asset});\nexport const Viewer = runtime.Viewer;`;
    },
  };
}

/**
 * The app stylesheet (~700 kB) would otherwise block the first paint, and with
 * it the inline page loader in index.html. Load it with the print-media swap
 * instead; src/utils/pageLoader.ts keeps the loader up until it has applied.
 */
function nonBlockingAppCss(): Plugin {
  return {
    name: "non-blocking-app-css",
    apply: "build",
    transformIndexHtml: {
      order: "post",
      handler: (html) =>
        html.replace(
          /<link rel="stylesheet" crossorigin href="([^"]+\.css)">/g,
          `<link rel="stylesheet" crossorigin href="$1" media="print" data-deferred-css onload="this.media='all';this.dataset.styleState='loaded'" onerror="this.dataset.styleState='error'"><noscript><link rel="stylesheet" href="$1"></noscript>`,
        ),
    },
  };
}

/**
 * Ensures requests to root `/` or `/${slug}` without trailing slash are automatically
 * redirected to `/${slug}/` with HTTP 302, matching official Nginx / GitLab Pages behavior.
 */
function autoTrailingSlashPlugin(slug: string): Plugin {
  return {
    name: "auto-trailing-slash",
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const pathOnly = (req.url || "").split("?")[0];
        if (pathOnly === `/${slug}` || pathOnly === "/") {
          const query =
            req.url && req.url.includes("?")
              ? req.url.slice(req.url.indexOf("?"))
              : "";
          res.writeHead(302, { Location: `/${slug}/${query}` });
          res.end();
          return;
        }
        next();
      });
    },
    configurePreviewServer(server) {
      server.middlewares.use((req, res, next) => {
        const pathOnly = (req.url || "").split("?")[0];
        if (pathOnly === `/${slug}` || pathOnly === "/") {
          const query =
            req.url && req.url.includes("?")
              ? req.url.slice(req.url.indexOf("?"))
              : "";
          res.writeHead(302, { Location: `/${slug}/${query}` });
          res.end();
          return;
        }
        next();
      });
    },
  };
}

// https://vitejs.dev/config/
export default () => {
  const env = loadEnv("dev", process.cwd());
  const slug = stringToSlug(env.VITE_TEAM_NAME || "jlu-fbh");
  return defineConfig({
    base: `/${slug}/`,
    plugins: [react(), molecularRuntime(), nonBlockingAppCss(), autoTrailingSlashPlugin(slug)],
    css: {
      postcss: {
        plugins: [
          tailwindcss({ config: resolve("virtual-lab/tailwind.config.cjs") }),
          autoprefixer(),
        ],
      },
    },
    build: {
      target: "esnext",
      minify: process.platform === "win32" ? false : "esbuild",
      rollupOptions: {
        input: {
          wiki: resolve("index.html"),
        },
      },
    },
    optimizeDeps: {
      entries: [
        "index.html",
        "src/**/*.{ts,tsx,js,jsx}",
      ],
    },
  });
};
