// Usage: node image-size.mjs <url-or-path> [...]  -> prints "WIDTHxHEIGHT  source" per image
import { readFileSync } from "node:fs";

async function head(src) {
  if (!/^https?:/.test(src)) return readFileSync(src);
  const res = await fetch(src, { headers: { Range: "bytes=0-131071" } });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return Buffer.from(await res.arrayBuffer());
}

function size(b) {
  if (b.toString("ascii", 1, 4) === "PNG") return [b.readUInt32BE(16), b.readUInt32BE(20)];
  if (b.toString("ascii", 0, 3) === "GIF") return [b.readUInt16LE(6), b.readUInt16LE(8)];
  if (b.toString("ascii", 0, 4) === "RIFF" && b.toString("ascii", 8, 12) === "WEBP") {
    const kind = b.toString("ascii", 12, 16);
    if (kind === "VP8X") return [1 + b.readUIntLE(24, 3), 1 + b.readUIntLE(27, 3)];
    if (kind === "VP8L") { const v = b.readUInt32LE(21); return [1 + (v & 0x3fff), 1 + ((v >> 14) & 0x3fff)]; }
    return [b.readUInt16LE(26) & 0x3fff, b.readUInt16LE(28) & 0x3fff];
  }
  if (b[0] === 0xff && b[1] === 0xd8) {
    for (let i = 2; i < b.length - 9; ) {
      const m = b[i + 1];
      if (m >= 0xc0 && m <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(m)) return [b.readUInt16BE(i + 7), b.readUInt16BE(i + 5)];
      i += 2 + b.readUInt16BE(i + 2);
    }
  }
  if (b.toString("ascii", 4, 8) === "ftyp") {
    // AVIF: take the largest 'ispe' (the primary image, not a thumbnail); 'irot' 90/270 swaps axes.
    let best = null;
    for (let i = b.indexOf("ispe"); i > 0; i = b.indexOf("ispe", i + 4)) {
      const w = b.readUInt32BE(i + 8), h = b.readUInt32BE(i + 12);
      if (!best || w * h > best[0] * best[1]) best = [w, h];
    }
    const r = b.indexOf("irot");
    if (best && r > 0 && b[r + 4] & 1) best.reverse();
    if (best) return best;
  }
  const svg = b.toString("utf8");
  const vb = svg.match(/viewBox=["']\s*[-\d.]+[\s,]+[-\d.]+[\s,]+([\d.]+)[\s,]+([\d.]+)/);
  if (vb) return [Math.round(+vb[1]), Math.round(+vb[2])];
  throw new Error("unknown format");
}

for (const src of process.argv.slice(2)) {
  try { const [w, h] = size(await head(src)); console.log(`${w}x${h}  ${src}`); }
  catch (e) { console.log(`FAIL(${e.message})  ${src}`); process.exitCode = 1; }
}
