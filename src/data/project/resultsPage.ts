import type { WikiPageContent } from "../../components/wiki/wikiPageTypes";
import { resultsSectionsTargetDiscovery } from "./resultsSectionsTargetDiscovery";
import { resultsSectionsConstructionRound1 } from "./resultsSectionsConstructionRound1";
import { resultsSectionsRound2Safety } from "./resultsSectionsRound2Safety";
import { resultsSectionsInVivoDiscussion } from "./resultsSectionsInVivoDiscussion";

/**
 * Results — the project's evidence chain, migrated verbatim from
 * `文案集/project/results/3.3 Results.md` (updated manuscript).
 *
 * The manuscript's eleven `#` headings become the page's eleven sections; its `##`
 * headings become `subheading` blocks, so the reader's outline mirrors the
 * document rather than a re-authored summary. The copy is split across four
 * sibling files purely for reviewability — `engineeringPage.ts` /
 * `engineeringRecordAdditions.ts` set that precedent — and nothing but prose,
 * tables and figures is added to it.
 *
 * Nothing rendered here is invented. The three statements that are not the
 * manuscript's own words are its own framing restated in the metadata slots the
 * reader never displays (`boundary`, `facts`), kept truthful rather than left at
 * the placeholder text this page used to carry.
 */

export const resultsPage: WikiPageContent = {
  route: "/results",
  category: "project",
  chapter: "Project / 03 of 07",
  eyebrow: "Results · Evidence chain",
  title: "Results",
  lede: "A linked design–build–test–learn evidence chain: from four antigens and fifteen epitopes to a functionally validated multi-epitope circRNA vaccine.",
  boundary:
    "The in vivo section is presented as proof of concept for the multi-epitope circRNA platform: the epitopes are human HLA-A*02:01-restricted, while the efficacy study used immunocompetent wild-type BALB/c mice, so antigen-specific HLA-restricted efficacy is deliberately not claimed.",
  visual: "evidence-ledger",
  visualLabel: "Evidence chain",
  visualSteps: [
    "target selection",
    "epitope screening",
    "construction",
    "Round 1",
    "Round 2",
    "safety",
    "in vivo",
  ],
  facts: [
    {
      label: "Constructs",
      value:
        "13 single-epitope; the Combined cassette carries 9 predicted epitopes in 8 fragments.",
    },
    {
      label: "Release",
      value:
        "Combined batch measured at 99.30 ± 0.17% circular, with the back-splice junction sequenced.",
    },
    {
      label: "In vitro killing",
      value:
        "83.57 ± 1.68% of MDA-MB-231 at E:T 80 : 1, against 26.20 ± 3.28% for the empty-vector control.",
    },
    {
      label: "In vivo TGI",
      value:
        "73.2% for the vaccine against the empty vector (89.6% against PBS), n = 5 per group.",
    },
  ],
  sections: [
    ...resultsSectionsTargetDiscovery,
    ...resultsSectionsConstructionRound1,
    ...resultsSectionsRound2Safety,
    ...resultsSectionsInVivoDiscussion,
  ],
  links: [
    { path: "/experiments", label: "Experimental Protocols" },
    { path: "/measurement", label: "Measurement Standards" },
    { path: "/model", label: "Biophysical Models" },
    { path: "/contribution", label: "Reusable Contributions" },
  ],
  next: {
    path: "/contribution",
    label: "Contribution",
    title: "What Can the SynBio Community Build Next?",
    description: "Our experimental evidence validates the circular RNA platform. Discover the thirty deposited BioBrick parts, verified protocols, and software tools packaged for future teams.",
  },
};
