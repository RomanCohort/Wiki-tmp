import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { basename, extname } from "node:path";

const sourceExtensions = new Set([
  ".ts", ".tsx", ".js", ".jsx", ".mjs", ".cjs", ".css", ".scss",
  ".html", ".json", ".yml", ".yaml", ".md", ".lock",
]);
const configNames = new Set(["LICENSE", ".env", ".gitignore", ".gitattributes", ".yarnrc", ".npmrc"]);
const files = execFileSync("git", ["ls-files", "-z"], { encoding: "utf8" }).split("\0").filter(Boolean);
const embeddedImage = /data:(?:image|font|audio|video)\/[a-z0-9.+-]+;base64,[a-z0-9+/=]{16,}|data:image\/svg\+xml,(?:%3c|<)svg/i;
const forbidden = files.filter((file) =>
  (!sourceExtensions.has(extname(file).toLowerCase()) && !configNames.has(basename(file))) ||
  readFileSync(file).includes(0),
);
const embedded = files.filter((file) => embeddedImage.test(readFileSync(file, "utf8")));

if (forbidden.length || embedded.length) {
  console.error("Publish blocked: move these media assets to the official CDN:\n" + [...forbidden, ...embedded].join("\n"));
  process.exitCode = 1;
} else {
  console.log(`Source asset audit passed: ${files.length} tracked files, no standalone binary files or embedded media.`);
}
