import type { ReactNode } from "react";

/**
 * Minimal LaTeX-subset renderer for `$…$` math embedded in page data.
 *
 * The data layer carries a handful of measurement / protocol formulas written
 * in LaTeX by the Feishu drafts. Rather than pulling in a full math engine,
 * this parses the subset those drafts actually use:
 *
 * - groups `{…}` and arguments (braced or single token) for `^` / `_`
 * - `\frac{num}{den}` rendered as a stacked fraction
 * - `\text{…}` / `\mathrm{…}` / `\operatorname{…}` / `\mathbf{…}` upright runs
 * - Greek letters, relation and binary operators (`\times`, `\leq`, `\pm`, …)
 * - spacing commands (`\quad`, `\qquad`, `\,`, `\;`, `\ `) and escaped symbols
 *
 * Variables are italicised via `<var>`; anything unknown is printed verbatim
 * so a future formula degrades visibly instead of silently disappearing.
 */

const SYMBOLS: Record<string, string> = {
  sum: "∑",
  prod: "∏",
  times: "×",
  cdot: "·",
  div: "÷",
  pm: "±",
  mp: "∓",
  ast: "∗",
  circ: "∘",
  bullet: "•",
  degree: "°",
  leq: "≤",
  geq: "≥",
  neq: "≠",
  approx: "≈",
  equiv: "≡",
  sim: "∼",
  propto: "∝",
  infty: "∞",
  rightarrow: "→",
  to: "→",
  leftarrow: "←",
  leftrightarrow: "↔",
  Delta: "Δ",
  alpha: "α",
  beta: "β",
  gamma: "γ",
  delta: "δ",
  epsilon: "ε",
  varepsilon: "ε",
  zeta: "ζ",
  eta: "η",
  theta: "θ",
  iota: "ι",
  kappa: "κ",
  lambda: "λ",
  mu: "μ",
  nu: "ν",
  xi: "ξ",
  pi: "π",
  rho: "ρ",
  sigma: "σ",
  tau: "τ",
  upsilon: "υ",
  phi: "φ",
  varphi: "φ",
  chi: "χ",
  psi: "ψ",
  omega: "ω",
  Gamma: "Γ",
  Lambda: "Λ",
  Sigma: "Σ",
  Phi: "Φ",
  Psi: "Ψ",
  Omega: "Ω",
  Longrightarrow: "⟹",
  cap: "∩",
  cup: "∪",
  mid: "∣",
  ge: "≥",
  le: "≤",
  int: "∫",
  in: "∈",
  max: "max",
  min: "min",
  log: "log",
  ln: "ln",
  exp: "exp",
  quad: "\u2003",
  qquad: "\u2003\u2003",
  "%": "%",
  "&": "&",
  $: "$",
  _: "_",
  "#": "#",
  "{": "{",
  "}": "}",
};

/**
 * Feishu exports thin-space markers inside brackets as literal commas
 * (`[,\mathrm{circular},]`), so restore readable bracket spacing here.
 */
function normalizeSource(input: string): string {
  return input.replace(/\[,/g, "\u2009[\u2009").replace(/,\]/g, "\u2009]\u2009");
}

export function renderMathLatex(input: string): ReactNode {
  const src = normalizeSource(input);
  let pos = 0;
  let uid = 0;
  const nk = () => `wm${uid++}`;
  const isSpecial = (c: string) => c === "{" || c === "}" || c === "\\" || c === "^" || c === "_";

  const renderChar = (c: string, italic: boolean): ReactNode =>
    italic && /[A-Za-z]/.test(c) ? <var key={nk()}>{c}</var> : <span key={nk()}>{c}</span>;

  function parseNodes(endOnBrace: boolean, italic: boolean): ReactNode[] {
    const out: ReactNode[] = [];
    while (pos < src.length) {
      const ch = src[pos];
      if (ch === "}") {
        pos += 1;
        if (endOnBrace) return out;
        out.push(<span key={nk()}>{"}"}</span>);
        continue;
      }
      if (ch === "{") {
        pos += 1;
        out.push(...parseNodes(true, italic));
        continue;
      }
      if (ch === "\\") {
        out.push(...parseCommand(italic));
        continue;
      }
      if (ch === "^" || ch === "_") {
        pos += 1;
        const arg = readArg(italic);
        out.push(
          ch === "^" ? (
            <sup key={nk()}>{arg}</sup>
          ) : (
            <sub key={nk()}>{arg}</sub>
          ),
        );
        continue;
      }
      let j = pos;
      while (j < src.length && !isSpecial(src[j])) j += 1;
      const run = src.slice(pos, j);
      pos = j;
      if (italic && /[A-Za-z]/.test(run)) {
        for (const c of run) out.push(renderChar(c, true));
      } else {
        out.push(<span key={nk()}>{run}</span>);
      }
    }
    return out;
  }

  function readArg(italic: boolean): ReactNode[] {
    while (pos < src.length && src[pos] === " ") pos += 1;
    if (src[pos] === "{") {
      pos += 1;
      return parseNodes(true, italic);
    }
    if (src[pos] === "\\") return parseCommand(italic);
    const c = src[pos] ?? "";
    pos += 1;
    return [renderChar(c, italic)];
  }

  function parseCommand(italic: boolean): ReactNode[] {
    pos += 1; // consume "\"
    if (src[pos] === "\\") {
      pos += 1;
      return [<br key={nk()} />];
    }
    const nameMatch = src.slice(pos).match(/^[A-Za-z]+/);
    if (nameMatch) {
      const name = nameMatch[0];
      pos += name.length;
      if (name === "frac" || name === "dfrac" || name === "tfrac") {
        const top = readArg(italic);
        const bottom = readArg(italic);
        return [
          <span className="wiki-math__frac" key={nk()}>
            <span className="wiki-math__frac-top">{top}</span>
            <span className="wiki-math__frac-bottom">{bottom}</span>
          </span>,
        ];
      }
      if (name === "sqrt") {
        const arg = readArg(italic);
        return [
          <span className="wiki-math__sqrt" key={nk()}>
            <span className="wiki-math__sqrt-sign">√</span>
            <span className="wiki-math__sqrt-stem">{arg}</span>
          </span>,
        ];
      }
      if (name === "dot") {
        const arg = readArg(italic);
        return [
          <span className="wiki-math__accent" key={nk()}>
            <span className="wiki-math__accent-base">{arg}</span>
            <span className="wiki-math__accent-symbol">˙</span>
          </span>,
        ];
      }
      if (name === "hat" || name === "widehat") {
        const arg = readArg(italic);
        return [
          <span className="wiki-math__accent" key={nk()}>
            <span className="wiki-math__accent-base">{arg}</span>
            <span className="wiki-math__accent-symbol">^</span>
          </span>,
        ];
      }
      if (name === "bar" || name === "overline") {
        const arg = readArg(italic);
        return [
          <span className="wiki-math__accent" key={nk()}>
            <span className="wiki-math__accent-base">{arg}</span>
            <span className="wiki-math__accent-symbol">¯</span>
          </span>,
        ];
      }
      if (name === "begin" || name === "end") {
        readArg(false);
        return [];
      }
      if (
        name === "text" ||
        name === "mathrm" ||
        name === "operatorname" ||
        name === "mathbf" ||
        name === "mathsf" ||
        name === "mathbb"
      ) {
        return [<span className="wiki-math__up" key={nk()}>{readArg(false)}</span>];
      }
      if (name === "mathit") return readArg(true);
      if (name === "left" || name === "right") {
        while (pos < src.length && src[pos] === " ") pos += 1;
        const delim = src[pos] ?? "";
        pos += 1;
        return delim && delim !== "." ? [renderChar(delim, false)] : [];
      }
      const symbol = SYMBOLS[name];
      return [<span key={nk()}>{symbol ?? name}</span>];
    }
    const c = src[pos] ?? "";
    pos += 1;
    if (c === "," || c === ";") return [<span key={nk()}>{'\u2009'}</span>];
    if (c === "!" ) return [];
    return [<span key={nk()}>{c === " " ? "\u00A0" : c}</span>];
  }

  return <>{parseNodes(false, true)}</>;
}

/** A `$…$` segment. `display` centres it as a standalone equation line. */
export function WikiMath({ latex, display = false }: { latex: string; display?: boolean }) {
  return (
    <span className={display ? "wiki-math wiki-math--block" : "wiki-math"} role="math">
      {renderMathLatex(latex)}
    </span>
  );
}

/**
 * Split text into literal segments, inline code spans and `$…$` math so
 * `renderInlineFormatting` can delegate each part to the right renderer
 * without a `$` inside a code span being mistaken for a formula delimiter.
 */
export function splitMathSegments(text: string): Array<{ math: boolean; text: string; display?: boolean }> {
  const parts = text.split(/(`[^`\n]+`|\${1,2}[^$\n]+?\${1,2})/g);
  return parts
    .filter((part) => part.length > 0)
    .map((part) => {
      if (part.startsWith("$$") && part.endsWith("$$") && part.length >= 4) {
        return { math: true, text: part.slice(2, -2), display: true };
      }
      if (part.startsWith("$") && part.endsWith("$") && part.length >= 2) {
        return { math: true, text: part.slice(1, -1) };
      }
      return { math: false, text: part };
    });
}
