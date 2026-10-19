import type {
  WikiContentBlock,
  WikiPageContent,
} from "../../components/wiki/wikiPageTypes";
import type { CitationReference } from "../citations/citationTypes";
import {
  contributionAssets,
  contributionImage,
  type ContributionAssetEntry,
  type ContributionImageAssetKey,
} from "./contributionAssets";
import {
  contributionPartsHeading,
  contributionPartsTable,
} from "./contributionParts";

/**
 * Contribution page — structured typed content.
 *
 * Provenance: `文案集/project/contribution/3.6 Contribution.md`
 * (669 lines: Introduction, seven Contribution chapters, References).
 *
 * Faithful by construction:
 * - Every prose paragraph is the manuscript's own sentence, in its own order.
 * - The manuscript's `##` chapters become sections; its `###` headings become
 *   subheadings, so the TOC mirrors the source hierarchy exactly.
 * - The 23-row Registry table and all fifteen references are reproduced in
 *   full (see `contributionParts.ts` and `contributionReferences`).
 *
 * Editorial repairs (mechanical only — no claim, number or name was changed):
 * - Markdown escapes (`\_`, `\-`, `\(`, `\.`, `\*`, `\&`) are resolved so the
 *   text reads as ordinary prose instead of printing backslashes.
 * - A duplicated sentence in the circForge limitations paragraph appears twice
 *   in the manuscript and once here.
 * - The manuscript's "Collabortion" heading typo is corrected to
 *   "Collaboration".
 * - `🔗 …（click to learn）` link lines are retained as real links, in place.
 * - The two bare "待拍摄" video notes are surfaced as the source states them.
 *
 * Pure data: no React, no JSX. All imagery and documents are resolved through
 * `contributionAssets.ts`; grouped photo sets are mounted as feature slots and
 * implemented in `ContributionPanels.tsx`.
 */

/** Prose block helper — one paragraph per argument. */
const prose = (...paragraphs: string[]): WikiContentBlock => ({
  type: "prose",
  paragraphs,
});

const subheading = (
  id: string,
  index: string,
  title: string,
): WikiContentBlock => ({ type: "subheading", id, index, title });

const feature = (key: string): WikiContentBlock => ({ type: "feature", key });

/**
 * A "click to learn" line.
 *
 * The manuscript writes these as instructions rather than as prose:
 * `🔗 URL （click to learn）` — the resource is named, then a phrase tells the
 * reader to open it. They stay in the same place in the running text, and the
 * phrase itself is the Markdown link: a click on "click to learn" opens the
 * resource — an external page, in a new tab, by way of `linkify`. The
 * stylesheet dresses the instruction as a hint (a rule and a tint, keyed on a
 * paragraph whose last element is that link) so a reader skimming the page can
 * see where a resource is waiting.
 *
 * Nothing follows the link on purpose: the anchor stays the paragraph's last
 * child, which is exactly what the hint selector keys on.
 */
const learnMore = (label: string, url: string): string =>
  `${label} — [click to learn](${url})`;

/** Figure block carrying a registered asset; its caption is the FIG badge's line. */
const fig = (
  key: ContributionImageAssetKey,
  caption: string,
): WikiContentBlock => {
  const asset: ContributionAssetEntry = contributionAssets[key];
  return {
    type: "figure",
    src: contributionImage(key),
    alt: asset.alt,
    caption,
    width: asset.width,
    height: asset.height,
  };
};

/**
 * The manuscript is written in author–year style — `(Sahin et al. 2017)` — so
 * the bibliography is registered on the shared citation model and the inline
 * renderer (`ContributionPanels.tsx`) resolves every in-text marker to it.
 */
export const contributionReferences: CitationReference[] = [
  {
    id: 1,
    authors: "Sahin, U. et al.",
    title:
      "Personalized RNA mutanome vaccines mobilize poly-specific therapeutic immunity against cancer.",
    journal: "Nature",
    volumeYear: "547, 222–226 (2017).",
  },
  {
    id: 2,
    authors: "Wesselhoeft, R. A., Kowalski, P. S. & Anderson, D. G.",
    title:
      "Engineering circular RNA for potent and stable translation in eukaryotic cells.",
    journal: "Nat Commun",
    volumeYear: "9, 2629 (2018).",
  },
  {
    id: 3,
    authors: "Kreiter, S. et al.",
    title:
      "Increased antigen presentation efficiency by coupling antigens to MHC class I trafficking signals.",
    journal: "J Immunol",
    volumeYear: "180, 309–318 (2008).",
  },
  {
    id: 4,
    authors: "Bergmann-Leitner, E. S. et al.",
    title:
      "C3D-defined complement receptor-binding peptide p28 conjugated to circumsporozoite protein provides protection against plasmodium berghei.",
    journal: "Vaccine",
    volumeYear: "25, 7732–7736 (2007).",
  },
  {
    id: 5,
    authors: "Sharma, P. et al.",
    title:
      "2A peptides provide distinct solutions to driving stop-carry on translational recoding.",
    journal: "Nucleic Acids Res",
    volumeYear: "40, 3143–3151 (2012).",
  },
  {
    id: 6,
    authors: "Hu, Y., Zhu, Y., Qi, D., Tang, C. & Zhang, W.",
    title: "Trop2-targeted therapy in breast cancer.",
    journal: "Biomark Res",
    volumeYear: "12, 82 (2024).",
  },
  {
    id: 7,
    authors: "Sun, L. et al.",
    title:
      "Pilot study of nectin-4-targeted PET imaging agent 68Ga-FZ-NR-1 in triple-negative breast cancer from bench to first-in-human.",
    journal: "J Nucl Med",
    volumeYear: "66, 473–479 (2025).",
  },
  {
    id: 8,
    authors: "Zeng, L. et al.",
    title:
      "Tuning immune-cold tumor by suppressing USP10/B7-H4 proteolytic axis reinvigorates therapeutic efficacy of ADCs.",
    journal: "Adv Sci (Weinh)",
    volumeYear: "11, e2400757 (2024).",
  },
  {
    id: 9,
    authors: "Saravanan, R. et al.",
    title:
      "Expression of cell surface zinc transporter LIV1 in triple negative breast cancer is an indicator of poor prognosis and therapy failure.",
    journal: "J Cell Physiol",
    volumeYear: "239, e31203 (2024).",
  },
  {
    id: 10,
    authors: "Terpe, K.",
    title:
      "Overview of tag protein fusions: From molecular and biochemical fundamentals to commercial systems.",
    journal: "Appl Microbiol Biotechnol",
    volumeYear: "60, 523–533 (2003).",
  },
  {
    id: 11,
    authors: "Holtkamp, S. et al.",
    title:
      "Modification of antigen-encoding RNA increases stability, translational efficacy, and T-cell stimulatory capacity of dendritic cells.",
    journal: "Blood",
    volumeYear: "108, 4009–4017 (2006).",
  },
  {
    id: 12,
    authors: "Appleton, E., Madsen, C., Roehner, N. & Densmore, D.",
    title: "Design automation in synthetic biology.",
    journal: "Cold Spring Harb Perspect Biol",
    volumeYear: "9, a023978 (2017).",
  },
  {
    id: 13,
    authors: "Qu, L. et al.",
    title: "Circular RNA vaccines against SARS-CoV-2 and emerging variants.",
    journal: "Cell",
    volumeYear: "185, 1728-1744.e16 (2022).",
  },
  {
    id: 14,
    authors: "Wesselhoeft, R. A. et al.",
    title:
      "RNA circularization diminishes immunogenicity and can extend translation duration in vivo.",
    journal: "Mol Cell",
    volumeYear: "74, 508-520.e4 (2019).",
  },
  {
    id: 15,
    authors: "Gnaim, R. & Ledesma-Amaro, R.",
    title:
      "Synthetic biology of fusarium for the sustainable production of valuable bioproducts.",
    journal: "Biotechnol Adv",
    volumeYear: "81, 108579 (2025).",
  },
];

export const contributionPage: WikiPageContent = {
  route: "/contribution",
  category: "project",
  chapter: "Project / 04 of 07",
  eyebrow: "Contribution · Open records",
  title: "Contribution",
  lede: "Reusable methods, tools, and records for future iGEM teams.",
  boundary:
    "These resources do not replace institutional approval, professional veterinary advice, biosafety consultation, laboratory-specific training, or locally applicable laws and regulations. Their purpose is to document and transfer our practical experience.",
  visual: "resource-library",
  visualLabel: "CirCure reusable resource library",
  visualSteps: [
    "responsible research",
    "wet lab and parts",
    "computational tools",
    "hardware, translation and education",
  ],
  facts: [
    {
      label: "Wet lab",
      value: "circRNA protocol and a circularity release framework.",
    },
    {
      label: "Parts",
      value: "23 characterised genetic parts in the iGEM Registry.",
    },
    {
      label: "Dry lab",
      value: "circForge design workflow and TorusFold structure modelling.",
    },
    {
      label: "Engagement",
      value:
        "Ethics and safety handbooks, education resources, exchange platforms.",
    },
  ],
  sections: [
    /* =================================================================== 01 */
    {
      id: "contribution-introduction",
      index: "01",
      kicker: "Introduction",
      navLabel: "Introduction",
      title: "Introduction",
      summary:
        "How the knowledge and experience gained throughout CirCure could benefit future iGEM teams and contribute to the Oncology Village.",
      blocks: [
        prose(
          "While developing **CirCure**, our multi-antigen circRNA vaccine for triple-negative breast cancer (TNBC), we considered how the knowledge and experience gained throughout the project could benefit future iGEM teams and contribute to the **Oncology Village**. By targeting multiple tumour-associated antigens, CirCure explores a treatment-oriented cancer immunotherapy strategy designed to broaden tumour recognition and address antigen heterogeneity in TNBC (Sahin et al. 2017). Beyond the vaccine itself, our contributions include reusable wet-lab resources, computational and structural modelling tools, hardware concepts, translational and Sustainable Development Goals (SDGs) oriented frameworks, educational materials, and collaboration initiatives. Together, these resources provide practical support for designing, constructing, evaluating, and adapting future cancer-related synthetic biology projects. Although CirCure does not establish clinical efficacy or improved patient outcomes, it offers a reusable foundation for developing and evaluating future cancer-treatment technologies.",
        ),
      ],
    },

    /* =================================================================== 02 */
    {
      id: "contribution-therapeutic-approach",
      index: "02",
      kicker: "Therapeutic approach",
      navLabel: "A New Therapeutic Approach",
      title:
        "A New Therapeutic Approach: A Circular RNA Vaccine for Triple-Negative Breast Cancer",
      summary:
        "CirCure combines four TNBC-associated antigens into a single modular circular RNA vaccine for postoperative adjuvant immunotherapy.",
      blocks: [
        prose(
          "The central contribution of our project is CirCure, a multi-antigen circular RNA vaccine designed as a possible postoperative adjuvant treatment for triple-negative breast cancer. Although surgery can remove the primary tumour, residual tumour cells may remain and later contribute to recurrence or metastasis. This challenge is particularly important in TNBC because tumour cells can differ substantially in their antigen expression, allowing cells with low or absent expression of one target to escape immune recognition.",
          "CirCure addresses this problem by combining epitopes from four TNBC-associated antigens: TROP2, B7-H4, Nectin-4 and LIV-1. These targets were selected through our dry-lab validation and incorporated into a single circular RNA construct. By presenting multiple tumour-associated targets at the same time, CirCure is designed to broaden immune recognition across heterogeneous tumour-cell populations and reduce dependence on any single antigen.",
          "The circular RNA architecture also provides a flexible way to combine several antigenic sequences within one vaccine. Its covalently closed structure can improve resistance to degradation and support sustained antigen expression. CirCure therefore connects multi-antigen recognition with a programmable RNA platform that can be further adapted according to different tumour antigen profiles.",
          "Our experimental results provided initial support for the feasibility of this approach. The purified Combined vaccine reached a circular fraction of 99.30 ± 0.17%. In functional assays, it increased dendritic-cell maturation, CD8⁺ T-cell activation, effector-memory differentiation and IFN-γ secretion. Combined-primed T cells achieved 83.57 ± 1.68% killing of MDA-MB-231 tumour cells at an E ratio of 80:1, while the tested normal cell lines showed substantially lower killing.",
          "CirCure may therefore provide a new therapeutic direction for postoperative TNBC treatment. Instead of relying on a single target or directly delivering a cytotoxic drug, it is designed to stimulate the immune system to recognise several tumour-associated antigens and eliminate residual tumour cells. In this way, the vaccine could complement surgery and existing treatment strategies by addressing tumour cells that remain after primary treatment.",
          "At this stage, CirCure should be understood as a proposed therapeutic solution supported by experimental evidence, rather than as a confirmed treatment outcome. Its main contribution is the development of a multi-antigen circular RNA vaccine strategy for TNBC, together with an integrated route from antigen selection and RNA construction to immune activation and tumour-cell killing. Because the antigen cassette is modular, this design may also be adapted to other tumour types and antigen profiles in future work.",
        ),
      ],
    },

    /* =================================================================== 03 */
    {
      id: "contribution-responsible-research",
      index: "03",
      kicker: "Responsible research",
      navLabel: "Responsible Research in Practice",
      title:
        "Responsible Research in Practice: Animal Ethics, Animal Use Forms, and Laboratory Safety",
      summary:
        "An ethics handbook, a laboratory safety handbook, a guide to animal-use applications, and a safety-themed role-playing game.",
      blocks: [
        prose(
          "During the development of CirCure, we recognised that responsible synthetic biology requires more than experimental protocols and technical results. When a project involves animal experiments, engineered biological materials, chemical reagents, and laboratory waste, scientific innovation must be accompanied by ethical reasoning, risk awareness, personnel responsibility, and appropriate safety management.",
          "Based on our experience in animal ethics review, laboratory safety management, and safety education, we developed a set of resources for future iGEM teams. These resources include an **Animal Model Research Safety and Ethics Handbook**, a **Laboratory Safety Handbook**, a guide on **How to Write an Animal Use Form**, and a safety-themed mystery role-playing game entitled **DDL Crisis: The Qinghe Bacterial Leak**.",
          "Our contribution is not intended to establish a universal set of rules for all research projects. Instead, we aim to turn our practical experience into a reusable framework that helps future teams recognise risks earlier, communicate more clearly with reviewers and collaborators, and integrate safety into project design.",
        ),

        subheading(
          "contribution-animal-ethics-handbook",
          "2.1",
          "Animal Model Research Safety and Ethics Handbook",
        ),
        prose(
          "The **Animal Model Research Safety and Ethics Handbook** contributes a structured framework for understanding animal research as both a scientific and ethical activity. Rather than treating animal welfare as an administrative requirement that begins only during the approval process, the handbook presents it as a consideration that should influence experimental design from the start.",
          "The handbook introduces the principles of Replacement, Reduction, and Refinement and connects them with the broader requirements of scientific necessity, experimental reliability, welfare protection, and risk management. It also emphasises that animal research involves a continuous decision-making process, in which model selection, experimental design, welfare monitoring, unexpected events, and post-experiment management should be considered as parts of one integrated system.",
          "By organising these considerations into a coherent framework, the handbook helps future teams understand how animal welfare, scientific validity, and laboratory safety are connected. It also provides a common language for communication between student researchers, laboratory supervisors, ethics committees, animal facility personnel, and veterinary professionals.",
        ),
        { type: "feature", key: "contribution-doc-animal-ethics" },

        subheading(
          "contribution-laboratory-safety-handbook",
          "2.2",
          "Laboratory Safety Handbook",
        ),
        prose(
          "The **Laboratory Safety Handbook** extends responsible research beyond animal studies to the broader laboratory environment. It presents laboratory safety as a shared organisational responsibility rather than an individual checklist.",
          "The handbook connects safety responsibilities at the institutional, laboratory, and individual levels. It highlights the links among management systems, laboratory practices, personnel competence, equipment condition, biological and chemical hazards, emergency response, incident reporting, and waste management.",
          "In addition to describing safety requirements, the handbook highlights the causes and consequences of common laboratory incidents. It shows how incomplete risk identification, unclear responsibilities, insufficient training, inadequate equipment management, or poor communication may affect researchers, experimental materials, data quality, and the surrounding environment.",
          "This perspective is particularly relevant to iGEM projects, which often combine molecular biology, engineered cells, nucleic-acid technologies, chemical reagents, public engagement, and sometimes animal research. By presenting these risks as connected rather than isolated, the handbook encourages future teams to consider safety as part of project organisation and scientific quality.",
        ),
        { type: "feature", key: "contribution-doc-lab-safety" },

        subheading(
          "contribution-animal-use-form",
          "2.3",
          "How to Write an Animal Use Form",
        ),
        prose(
          "Our guide on **How to Write an Animal Use Form** was developed from our experience preparing and completing the institutional review process for animal research. Its main contribution is to help future teams understand how an animal-use plan can be communicated in a complete, logical, and reviewable manner.",
          "The guide focuses on the connection between scientific necessity, animal welfare, experimental design, and institutional responsibility. It encourages applicants to explain not only what they plan to do, but also why the animal model is necessary, how the proposed design addresses the research question, and how animal use is justified within the principles of the 3Rs.",
          "The guide also emphasises the importance of consistency between the application, the approved protocol, the experimental-design documents, and the actual research process. Clear descriptions and transparent limitations can improve communication between student teams and ethics reviewers, while also helping researchers identify weaknesses in their own experimental plans before the study begins.",
          "Rather than serving as a universal application template, the guide provides future iGEM teams with a conceptual and organisational starting point. It helps them recognise the types of questions to consider when preparing an animal-use application and encourages them to adapt their documents to the requirements of their institutions, animal facilities, biosafety systems, and veterinary professionals.",
          learnMore(
            "How to Write an Animal Use Form",
            "https://teams.igem.org/6056/safety/safety-animal-use-form/d68bc7e2-b026-45c6-be28-ec88fb684fcb",
          ),
        ),

        subheading(
          "contribution-ddl-crisis",
          "2.4",
          "DDL Crisis: The Qinghe Bacterial Leak",
        ),
        prose(
          "To make laboratory safety more accessible and interactive, we created **DDL Crisis: The Qinghe Bacterial Leak**, a safety-themed mystery role-playing game for iGEM team exchange and education.",
          "The game transforms laboratory safety from a passive learning topic into a collaborative problem-solving experience. Through a simulated incident, participants are encouraged to examine how multiple small failures, such as inadequate communication, incomplete records, insufficient inspection, or unclear responsibilities, may combine to produce a larger safety event.",
          "Its contribution goes beyond presenting safety knowledge in a more engaging format. The game also creates a space for participants from different teams to compare their experiences, discuss the responsibilities of researchers and institutions, and reflect on how safety systems can be improved before an accident occurs.",
          "In this way, the activity extends laboratory safety beyond a single team. It supports communication within the iGEM community and encourages participants to see safety as a collective responsibility that includes experimental design, laboratory management, team culture, and scientific integrity.",
        ),
        fig("ddlCrisisPoster", "Poster of the DDL Crisis murder mystery game."),

        subheading(
          "contribution-responsible-teams",
          "2.5",
          "Contribution to Future iGEM Teams",
        ),
        prose(
          "Together, these resources form a transferable framework for responsible research. Future iGEM teams can use the complete framework when planning projects involving animal experiments, biological materials, engineered organisms, or chemical hazards. They can also selectively adapt individual resources according to the needs of their own projects.",
          "Teams working with different disease models, experimental systems, or therapeutic platforms may replace the project-specific content while retaining the underlying principles of scientific justification, ethical responsibility, risk awareness, clear communication, and continuous improvement.",
          "Our resources are designed to reduce avoidable omissions, support communication with ethics and safety reviewers, and help young researchers recognise potential risks before experiments begin. More importantly, they encourage teams to view safety not as a limitation added after scientific decisions have been made, but as a factor that can improve the quality, reliability, and responsibility of those decisions.",
          "At the same time, these materials do not replace institutional approval, professional veterinary advice, biosafety consultation, laboratory-specific training, or locally applicable laws and regulations. Their purpose is to document and transfer our practical experience, providing future teams with a clearer starting point for developing research that is scientifically justified, ethically responsible, and operationally safe.",
        ),
      ],
    },

    /* =================================================================== 04 */
    {
      id: "contribution-wet-lab",
      index: "04",
      kicker: "Reusable wet lab",
      navLabel: "Reusable Wet Lab Resources",
      title: "Reusable Wet Lab Resources for circRNA Vaccine Development",
      summary:
        "A circRNA experimental handbook (Protocol), a circularity measurement and release framework (Measurement), and 23 characterised parts (Parts).",
      blocks: [
        subheading(
          "contribution-protocol-handbook",
          "3.1",
          "Protocol → A Reusable circRNA Experimental Handbook",
        ),
        prose(
          "During the development of **CirCure**, we found that working with circRNA was not simply a matter of following a single experimental protocol. The development process involved a series of connected steps, where decisions and results at one stage affected how the next stage should be performed and evaluated. Experimental information was also often scattered across individual papers, supplementary materials, and laboratory-specific experience. For an iGEM team entering circRNA research for the first time, reconstructing this process from scratch can therefore require substantial time and trial-and-error.",
          "Rather than keeping our project experience in our own laboratory records, we consolidated it into a **circRNA experimental protocol** for the iGEM community.",
          learnMore(
            "circRNA experimental protocol",
            "https://2026.igem.wiki/jlu-fbh/experiments",
          ),
          "The handbook brings together the practical procedures and experimental knowledge needed to move through a circRNA workflow, while preserving the connection between different stages of the process. **Our contribution is therefore not the creation of a new experimental technique, but the documentation and transfer of practical experimental knowledge in a form that other teams can access and reuse.**",
          "The **protocol** is particularly intended for **iGEM teams and early-stage researchers beginning work with circRNA vaccines, related RNA-engineering projects or vaccine functional validation**. A team with limited prior experience can use it as a starting point when establishing its own workflow, while a team with an existing system can selectively reuse individual sections relevant to its needs, such as RNA characterisation or quality-control procedures. The procedures are documented in a way that may provide a useful starting point for teams working with different constructs, biological models, or laboratory conditions, without requiring them to reproduce the CirCure system exactly.",
          "**In this way, the handbook serves not only as a record of our work, but also as a community resource for future RNA-engineering projects. At the same time, we do not present it as a universal or fully optimised protocol: differences in RNA sequence, circularisation strategy, reagents, equipment, and biological models may require additional optimisation. The value of this contribution therefore lies not in claiming that every experiment will work identically, but in making our experimental pathway and accumulated experience accessible, transferable, and reusable for future iGEM teams.**",
        ),

        /**
         * The manuscript carries an intermediate `### Measurement → Reference
         * Methods for Evaluation and Characterisation` above this heading, and
         * repeats the Hardware chapter's `##` title as its first `###`. Both are
         * dropped: one only groups a single child, the other restates its own
         * section verbatim, so keeping either would put an empty, duplicate row
         * in the table of contents (铁律 4).
         */
        subheading(
          "contribution-measurement-framework",
          "3.2",
          "Measurement → A Reusable circRNA Circularity Measurement Framework",
        ),
        prose(
          "During the development of **CirCure**, we found that measuring circRNA was not simply a matter of reporting a single qPCR value or showing resistance to RNase R. Before a circRNA preparation could be used in downstream experiments, we had to answer several connected questions: Did the RNA form a covalently closed circle? What proportion of the purified product was circular rather than linear? Was the assay performed within a reliable input range? And could the resulting value be used to decide whether a batch was suitable for further experiments?",
          "For an iGEM team entering circRNA research for the first time, these questions are often addressed using different methods, while the criteria for interpreting the results remain unclear. Rather than keeping the measurement logic developed during our project within our own laboratory records, we consolidated it into a **reusable circRNA circularity measurement and release framework** for the iGEM community.",
          "The framework is based on a divergent–convergent RT-qPCR assay, but its main contribution is not the use of this assay itself. Instead, it defines how circularity should be measured, calibrated and interpreted. The divergent primer pair spans the back-splice junction and detects the circular RNA species, while the convergent primer pair is designed to detect the linear precursor. Under this primer convention, the circular fraction is calculated as:",
        ),
        feature("contribution-equation-fcirc"),
        prose(
          "The framework requires an input-volume series before any circularity ratio is calculated. In our workflow, both primer channels were tested using 2, 4 and 6 µL of cDNA input, with three technical replicates at each volume. A no-template control was included on every plate, and a backbone-encoded GFP amplicon was measured in both channels as an equal-input control. Because the 2 µL input did not meet the acceptance criteria, 4 µL was selected as the working input volume.",
          "A circRNA preparation was considered **release-grade** only when it satisfied several pre-defined conditions: a circular fraction of at least 90%, an approximately one-cycle Cq shift per two-fold increase in input in both channels, close agreement among technical replicates, matched GFP Cq values between the two primer channels, and an undetected no-template control. These criteria transform circularity measurement from an isolated numerical result into a reproducible decision-making process.",
          "Our contribution is therefore not the creation of a new circRNA detection technique. It is the documentation of an explicit and reusable measurement standard that connects primer design, input calibration, control selection, calculation and batch-release decisions. Other iGEM teams can adopt the complete framework or selectively reuse individual components, such as the input-volume series, the equal-input control, the primer-species convention or the release checklist.",
          "The framework is particularly intended for **iGEM teams and early-stage researchers working with circRNA vaccines, RNA-engineering projects or nucleic-acid delivery systems**. A team with limited experience can use it as a starting point when establishing a circularity assay, while a team with an existing workflow can use individual elements to strengthen its quality-control procedures. The framework can also be adapted to different RNA sequences, circularisation strategies, reagents, instruments and experimental systems without requiring other teams to reproduce the CirCure construct exactly.",
          "At the same time, we do not present this framework as a universal or fully optimized standard. The 90% threshold is a project-specific release criterion rather than a universal biological boundary. Differences in primer placement, RNA sequence, amplification efficiency, RNase R treatment, purification procedures and instrumentation may require additional validation. RNase R resistance alone cannot establish covalent circularity, and complementary evidence such as back-splice junction sequencing remains important.",
          "In this way, the framework serves not only as a record of how we evaluated our own circRNA, but also as a practical community resource for future RNA-engineering projects. The value of this contribution lies not in claiming that every laboratory will obtain identical measurements, but in making the reasoning behind circRNA detection, the acceptance criteria and the limitations of the assay accessible, transferable and reusable for future iGEM teams.",
          learnMore(
            "circRNA circularity measurement framework",
            "https://2026.igem.wiki/jlu-fbh/measurement",
          ),
        ),

        subheading(
          contributionPartsHeading.sectionId,
          contributionPartsHeading.sectionIndex,
          contributionPartsHeading.sectionTitle,
        ),
        prose(
          "JLU-FBH has designed and characterized 23 genetic parts covering key steps in the construction, expression, and evaluation of our multi-antigen circRNA vaccine. These parts support circRNA production and translation, antigen presentation and immune activation, target-antigen expression, and experimental validation. Key parts have been documented and submitted to the iGEM Registry, creating a collection of defined genetic components that can serve as building blocks for circRNA vaccines and related synthetic biology applications.",
          "Together, these parts form a modular toolkit for constructing and evaluating circRNA-based cancer vaccines. The PIE elements and T7 promoter support precursor transcription and circRNA circularization, while synIRES-RC25 and the PABP-binding spacer facilitate cap-independent translation and provide additional support for RNA stability and translational efficiency (Wesselhoeft et al. 2018). The tPA signal peptide, MITD, 4x mC3d-P28 adjuvant, and GSGGS linker contribute to antigen secretion, intracellular trafficking, immune stimulation, and protein assembly (Kreiter et al. 2008; Bergmann-Leitner et al. 2007; Sharma et al. 2012). We also contributed HLA-A*02:01-restricted CTL epitopes targeting TROP2, LIV-1, B7-H4, and PVRL4/NECTIN4 (Hu et al. 2024; Sun et al. 2025; Zeng et al. 2024; Saravanan et al. 2024). These epitopes can function as individual antigenic modules within a multi-epitope construct, linking tumor-antigen selection to downstream CD8⁺ T-cell recognition. In addition, FLAG tags, copGFP, and the human TROP2 coding sequence provide tools for monitoring protein expression and establishing antigen-positive target cells, while elements such as the HBA1 3'UTR and polyA25 internal segment support RNA stability, precursor purification, and characterization (Wesselhoeft et al. 2018; Terpe 2003; Holtkamp et al. 2006). The collection therefore covers not only vaccine construction, but also the experimental tools needed to evaluate whether each stage of the system is functioning as intended.",
          learnMore(
            "JLU-FBH Registry collection",
            "https://registry.igem.org/organisations/d1b6aa0f-bfc0-4f6b-9c69-33347e7ea510",
          ),
        ),
        {
          type: "parts-table",
          headers: ["Number", "Short Description", "Functional Description"],
          rows: contributionPartsTable.rows.map((part) => ({
            name: part.name,
            href: part.registryUrl,
            cells: [part.shortDescription, part.functionalDescription],
          })),
        },
        prose(
          "Rather than providing only a complete vaccine construct, we separated key functions into individually defined components so that different parts of the system can be exchanged without redesigning the entire architecture. For example, the circularization and translation framework can be retained while antigenic sequences are replaced, allowing the same basic circRNA framework to be adapted to different tumor-associated targets. Likewise, individual regulatory, trafficking, or detection elements can be modified when a future project requires changes in expression, intracellular localization, or experimental readout. This separation of functions makes the Parts collection applicable beyond the specific antigen combination and disease model used by JLU-FBH.",
          "Our contribution to the iGEM community is therefore not limited to depositing 23 sequences in the Registry. We provide a set of functionally defined components that future teams can select, combine, replace, and further optimize according to their own research goals. A team developing a circRNA vaccine for another cancer could retain the core production and translation modules while introducing new epitopes; a team studying RNA expression could modify the regulatory elements while keeping the antigen modules; and teams developing new validation systems could reuse the expression tags and target-cell components. By documenting these parts together with their intended functions and experimental context, JLU-FBH aims to provide a practical starting point for future teams to build on existing circRNA designs rather than repeatedly developing the same foundational components from scratch.",
        ),
      ],
    },

    /* =================================================================== 05 */
    {
      id: "contribution-computational-tools",
      index: "05",
      kicker: "Computational tools",
      navLabel: "Accessible Computational Tools",
      title: "Accessible Computational Tools for Cancer Vaccine Design",
      summary:
        "circForge, an integrated and reviewable circRNA vaccine design pipeline, and TorusFold, a structure-modelling framework for long circular RNA.",
      blocks: [
        subheading(
          "contribution-circforge",
          "4.1",
          "An Integrated and Reviewable Pipeline for circRNA Vaccine Design",
        ),
        prose(
          "During the development of CirCure, we found that computational design in synthetic-biology projects is often fragmented across databases, prediction tools, sequence-editing software, and researcher-generated scripts (Appleton et al. 2017). Each tool may answer one specific question, but moving from these individual results to an experimental construct still requires repeated data conversion, manual comparison, and interpretation. For teams with limited computational resources, this can make it difficult to trace how a candidate was selected, which evidence supported the decision, and how computational results were translated into a sequence that could actually be tested in the laboratory.",
          "To address this practical problem, we developed **circForge**, an integrated computational workflow for circRNA vaccine design. The software does not aim to replace individual specialized prediction tools. Instead, it provides a common workflow for organizing their outputs and connecting them with sequence design and researcher decisions. The workflow covers target and antigen screening, epitope evaluation, candidate comparison, multi-epitope assembly, circRNA sequence compilation, sequence annotation, and standardized export. At each stage, relevant sequence information, analysis results, parameters, and user-confirmed decisions can be retained within the same design record.",
          "The contribution is therefore particularly relevant to **iGEM teams and early-stage synthetic-biology researchers who need to combine multiple computational analyses but may not have the resources to develop an entire computational infrastructure themselves**. A team can use the workflow to move from a list of candidate antigens or epitopes to a documented construct design, while retaining the reasoning behind each major decision. For example, a team can compare several candidate epitopes, record the criteria used for selection, assemble the selected sequences into a multi-epitope construct, and export an annotated sequence for subsequent experimental construction. The same workflow can also be adapted when the target antigen, disease, sequence architecture, or analysis tool changes.",
          "An important part of our software contribution is therefore **traceability rather than prediction alone**. Instead of producing a final sequence as a black-box output, **circForge** is designed to preserve the relationship between input data, computational evidence, researcher decisions, and the resulting construct. This makes a computational design easier to review, reproduce, debug, and communicate between computational and wet-lab team members. It also allows future teams to replace individual analytical components with their preferred tools while retaining the overall workflow.",
          "We developed and refined the workflow through our own **Design–Build–Test–Learn cycle**. Candidate designs generated computationally were transferred to experimental testing, while observations from the laboratory were used to inform subsequent design decisions. This experience helped us identify where computational outputs were insufficient on their own and where additional experimental verification was required. Therefore, **circForge** should be understood as a **design-support and integration tool**, rather than a system that independently determines whether a vaccine candidate will succeed.",
          "The current implementation also has clear limitations. Its usefulness depends on the quality and availability of the underlying databases, prediction methods, and user-defined selection criteria. Computational prioritization cannot establish biological efficacy, and the workflow does not eliminate the need for experimental validation. In addition, some modules were developed around the requirements of our circRNA vaccine project and may require modification before being applied to other therapeutic modalities. We therefore define its contribution within a practical scope: to make multi-step computational design more organized, transparent, and reusable, while providing a structured basis for evaluating vaccine candidates and guiding subsequent experimental validation.",
          "By documenting the workflow, data structure, sequence outputs, and decision process, we hope **circForge** can provide future iGEM teams with a starting framework for computationally assisted vaccine design. Teams can reuse the workflow directly, replace individual analysis modules, introduce new antigen-selection criteria, or extend the output format for their own experimental systems. In this way, our software contribution lies not only in the interface or individual functions, but in providing a **reproducible bridge between computational evidence and experimentally testable biological designs**.",
          learnMore(
            "circForge software workflow",
            "https://2026.igem.wiki/jlu-fbh/software",
          ),
        ),

        subheading(
          "contribution-torusfold",
          "4.2",
          "Beyond Structure Prediction: An Advanced Tool for circRNA Design",
        ),
        prose(
          "During the development of CirCure, we found that the main computational challenge was not simply predicting whether an RNA sequence could form a secondary structure. Our vaccine construct is a 2,013-nt circular RNA containing a back-splice junction, long-range interactions, regulatory elements, and multiple functional regions. For such a long circRNA, existing computational tools usually provide only part of the required information. Thermodynamic methods can estimate secondary structures and base-pairing probabilities, while deep-learning models can provide useful predictions for shorter RNA fragments. However, no single method can reliably fold the complete long circular RNA from sequence to a structurally interpretable three-dimensional model. Researchers therefore have to combine different tools manually, transfer data between incompatible formats, and decide whether the resulting structure is physically reasonable. This fragmented process makes structural errors difficult to trace and limits the use of computational modeling in experimental design.",
          "To address this problem, we developed **TorusFold**, an integrated computational framework for long circRNA structure modeling and structure-informed design. Its core folding pipeline, TorusFold, connects secondary-structure prediction, long-range interaction detection, segmented three-dimensional modeling, coarse-grained physical relaxation, enhanced sampling, all-atom refinement, and structural quality assessment in a single workflow. The purpose of TorusFold is not to replace specialized prediction software. Instead, it provides a coordinated framework in which different models and physical methods can contribute complementary evidence to the same circRNA design.",
          "The workflow begins with the input RNA sequence and, when available, a previously generated secondary structure. At the first stage, TorusFold integrates multiple sources of structural evidence, including ViennaRNA partition-function base-pairing probabilities, minimum-free-energy predictions, DivideFold results, and sequence-based pair-graph analysis. High-confidence interactions can be used as hard constraints, while lower-confidence interactions are retained as soft constraints. The pipeline also searches for possible non-canonical interactions and long-range complementary regions that may be missed by conventional secondary-structure prediction. This stage transforms heterogeneous prediction results into a unified set of structural constraints rather than treating each prediction as an independent final answer.",
          "Because current three-dimensional RNA predictors are not designed to process a 2,013-nt sequence reliably in one step, TorusFold uses a structure-aware segmentation strategy. The sequence is divided into shorter overlapping fragments, allowing several prediction models to analyze regions within the length range where they perform best. RhoFold+, trRNA2, and RNAbpFlow are combined through an ensemble strategy, with region-adaptive weights for stems, loops, and the back-splice junction. The overlapping fragments are assembled using geometric superposition, confidence-weighted coordinate fusion, and boundary smoothing. This prevents the final structure from being produced by simply concatenating independent fragments. Overlap regions preserve spatial continuity, confidence scores reduce the influence of inconsistent predictions, and local smoothing limits coordinate discontinuities at fragment boundaries.",
          "The assembled coarse-grained structure is then progressively refined. Constrained relaxation corrects abnormal backbone bonds, angles, steric clashes, and discontinuities introduced during segment assembly while preserving important structural restraints. The pipeline subsequently uses GPU-accelerated coarse-grained simulation, replica-exchange sampling, and reinforcement-learning-assisted scheduling to explore alternative conformations. The reinforcement-learning module can adjust relaxation steps, long-range pair injection, and early stopping according to the current simulation state, reducing unnecessary computation during long-chain folding. Specific handling of the back-splice junction is also included because maintaining circular closure is one of the most difficult aspects of long circRNA modeling.",
          "After coarse-grained optimization, the structure can be converted into an all-atom representation and further refined through optional PyRosetta optimization, metadynamics, REST2 sampling, AMBER RNA.OL3 refinement, and hydrogen-bond repair. These stages are not intended to create an artificial impression of certainty. Instead, they provide successive opportunities to remove geometric anomalies, sample alternative conformations, and select models that satisfy multiple structural criteria. The final output is therefore supported by a chain of intermediate structures and diagnostic results rather than by a single unexplained prediction.",
          "TorusFold also produces design-relevant structural evidence beyond a final PDB file. The workflow records secondary-structure constraints, segment information, pair rates, bond quality, steric clashes, energy values, radius of gyration, back-splice junction distance, and structure-quality scores. Once an all-atom model is available, the pipeline can further examine features such as long double-stranded RNA regions, back-splice junction exposure, and the accessibility of functional regions including the IRES. These analyses allow researchers to ask practical design questions: whether the back-splice junction is geometrically closed, whether a region is structurally exposed or buried, whether a long dsRNA segment may require attention, and whether alternative sequence designs should be considered before experimental construction.",
          "An important contribution of TorusFold is its traceability. Each stage can export intermediate structures, parameters, diagnostic files, and checkpoint data. If a long calculation is interrupted, the workflow can resume from a previous checkpoint rather than repeating the entire process. Optional prediction and refinement modules can also be replaced or bypassed when they are unavailable, while the overall workflow remains intact. This makes the computational reasoning easier to review and allows computational and wet-lab researchers to discuss the same design using explicit structural evidence.",
          "We developed and refined this framework through the Design–Build–Test–Learn cycle of CirCure. Computationally generated structures were compared with experimental requirements, and problems revealed during development were used to improve segmentation, structural relaxation, back-splice junction handling, and sampling strategies. This process also showed us that computational modeling cannot independently determine whether a circRNA vaccine will be effective. A structurally plausible model may still fail because of RNA dynamics, experimental conditions, cellular regulation, delivery efficiency, or biological mechanisms that are not represented in the simulation.",
          "Therefore, the contribution of TorusFold is not a universal prediction of circRNA function or vaccine efficacy. Its value lies in providing a transparent, modular, and reusable route from a long circRNA sequence to a set of structurally testable hypotheses. Future iGEM teams can replace the input sequence, modify the circular RNA architecture, adjust structural constraints, substitute individual prediction models, or recalibrate the refinement modules for their own RNA systems. Although some parameters and downstream analyses were developed around our TNBC-targeting, HLA-A*02:01-restricted circRNA vaccine, the overall framework can be adapted to other long circular RNAs and RNA therapeutic platforms.",
          "By integrating heterogeneous structural evidence with physical refinement, enhanced sampling, checkpointed computation, and downstream accessibility analysis, TorusFold helps move circRNA design beyond isolated prediction results. It provides future researchers with a practical computational bridge between sequence design, three-dimensional structural hypotheses, and experimental verification, while clearly preserving the boundary between computational support and biological proof.",
          learnMore(
            "TorusFold structure modelling framework",
            "https://2026.igem.wiki/jlu-fbh/software",
          ),
        ),
      ],
    },

    /* =================================================================== 06 */
    {
      id: "contribution-hardware",
      index: "06",
      kicker: "Hardware",
      navLabel: "Modular Hardware Platform",
      title:
        "A Modular Hardware Platform for More Integrated circRNA Manufacturing",
      summary:
        "CirCore, a modular prototype that integrates temperature control, active mixing, sealed reagent handling and fluorescence monitoring around the circRNA production workflow.",
      blocks: [
        prose(
          "During the development of CirCure, we found that the practical challenge of circRNA production was not limited to optimizing individual reactions. The workflow involves several operations with different physical requirements, including temperature changes, mixing, sample transfer, and downstream processing. When these steps are performed using separate conventional instruments, repeated tube opening and transfer can introduce additional handling, increase opportunities for contamination or sample loss, and make process control dependent on manual operation. For an iGEM team working with limited laboratory infrastructure, these interfaces between biological steps can become an important engineering bottleneck.",
          "To address this problem, we developed **CirCore**, a modular hardware platform designed around the workflow of circRNA production rather than a single reaction. We translated the biological process into engineering requirements and integrated temperature control, active mixing, sealed reagent handling, pressure equalization, and contamination-control features within a compact reaction environment. A modular fluorescence-monitoring unit was also incorporated to explore a transition from fixed-time operation toward process-aware control. Instead of requiring researchers to repeatedly move samples between different instruments, CirCore aims to provide a more integrated environment in which multiple operations can be performed and monitored within the same workflow.",
        ),
        fig(
          "circoreDevice",
          "Schematic diagram of the CirCore circRNA vaccine expression device.",
        ),
        subheading(
          "contribution-circore-approach",
          "5.1",
          "From a Single Device to a Reusable Engineering Approach",
        ),
        prose(
          "First, the complete biological workflow is mapped to identify where physical conditions must be controlled. These requirements are then translated into hardware functions such as heating, cooling, mixing, containment, or sensing. Functions that are coupled by the workflow can subsequently be integrated into the same reaction environment, while monitoring can be introduced where a measurable signal provides information about process progress. This approach allows hardware development to begin with the biological workflow and its practical constraints, rather than starting from a predefined instrument configuration.",
          "This principle is particularly relevant to **iGEM teams and student research groups developing multi-step molecular-biology workflows with limited access to specialized equipment**. For example, teams working with RNA synthesis, enzymatic reactions, cell-free systems, or other workflows involving repeated temperature transitions and sample transfers may use the same requirement-mapping process to identify where a custom device could provide practical value. The hardware architecture does not require every team to reproduce CirCore exactly; instead, teams can retain the design logic and select only the functions required by their own workflow.",
        ),
        subheading(
          "contribution-circore-interfaces",
          "5.2",
          "Designing Around Process Interfaces",
        ),
        prose(
          "Our development also highlighted an important engineering lesson: **the bottleneck in a biological workflow may occur at the interface between operations rather than within an individual reaction.** A reaction may be well optimized in isolation while the overall process remains inefficient because samples must be repeatedly transferred, temperatures changed manually, or reaction chambers opened between steps.",
          "CirCore therefore focuses on these process interfaces. By integrating controlled temperature transitions, mixing, and sealed handling, the platform aims to reduce unnecessary interruptions between connected operations. This makes the hardware relevant not only to circRNA circularization, but also to other small-volume, multi-step biological workflows in which process continuity and contamination control are important.",
        ),
        subheading(
          "contribution-circore-iteration",
          "5.3",
          "Iteration and What We Learned",
        ),
        prose(
          "CirCore was developed through iterative hardware redesign rather than as a single finished instrument. The transition from **Gen 1 to Gen 2** was driven by limitations identified during development: single-tube operation was expanded toward multi-position processing; heating-only control was developed toward active heating and cooling; fixed-time operation was supplemented by fluorescence-based monitoring; and the scope was extended from circularization toward integration with downstream RNase R processing.",
          "These iterations also defined the limitations of the current platform. CirCore does not eliminate the need for conventional laboratory equipment, nor does it automatically guarantee higher circularization efficiency or product quality. Process-aware fluorescence monitoring is useful only when the measured signal can be reliably related to reaction progress, and the current system still requires calibration and experimental validation for different reactions and sample volumes. In addition, a hardware configuration optimized for our circRNA workflow may not transfer directly to biological processes with substantially different temperature ranges, mixing requirements, reaction volumes, or sensing mechanisms.",
          "These limitations define the appropriate scope of our contribution. CirCore should be regarded as a **modular prototype and an engineering starting point**, rather than a universal replacement for laboratory instruments. Its value lies in demonstrating how biological process requirements can be translated into an integrated hardware architecture and then refined through iterative testing.",
        ),
        subheading(
          "contribution-circore-reuse",
          "5.4",
          "What Future Teams Can Reuse",
        ),
        prose(
          "Future iGEM teams can reuse CirCore at several levels. Teams with a similar multi-step workflow can adapt the hardware specifications and modify the heating, cooling, mixing, or sensing modules according to their own reaction requirements. Teams that do not need the complete platform can reuse individual design concepts, such as sealed microvolume reaction handling or process-aware fluorescence monitoring. More importantly, teams can apply the **Process → Requirement → Integration → Monitoring → Iteration** workflow to design their own biological hardware without reproducing CirCore as a fixed device.",
          "Our contribution to the iGEM community is therefore both a **prototype hardware platform and a transferable design methodology**. Rather than claiming to have solved circRNA manufacturing as a whole, CirCore demonstrates how process interfaces can be identified as engineering targets, how multiple physical functions can be integrated around a biological workflow, and how hardware can be iteratively refined based on experimental constraints. We hope this provides future teams with a practical starting point for developing more integrated, accessible, and workflow-specific hardware for their own synthetic-biology applications.",
          learnMore(
            "CirCore hardware platform",
            "https://2026.igem.wiki/jlu-fbh/hardware",
          ),
        ),
      ],
    },

    /* =================================================================== 07 */
    {
      id: "contribution-model",
      index: "07",
      kicker: "Model",
      navLabel: "Modelling Before Animal Experiments",
      title:
        "Modeling Before Animal Experiments: A Prediction Framework toward 3R Principles for circRNA Vaccine Design",
      summary:
        "A 3R-oriented pre-animal-experiment modelling framework for candidate prioritisation, and the boundary between prediction and biological proof.",
      blocks: [
        subheading(
          "contribution-model-before-animals",
          "6.1",
          "Modeling Before Animal Experiments",
        ),
        prose(
          "During the development of CirCure, we recognized a practical challenge in nucleic-acid vaccine development: many sequence and construct decisions are made before animal studies, yet experimental resources are limited and not every candidate can be evaluated in depth. For circRNA vaccines, properties such as RNA structure, stability, innate immune sensing, and protein expression may influence whether a candidate is worth advancing to further experiments. These properties cannot be fully captured by a single experimental measurement or a single computational score (Qu et al. 2022; Wesselhoeft et al. 2019).",
          "To address this challenge, we developed a **3R-oriented pre-animal-experiment modeling framework** to support candidate prioritization before extensive experimental testing. The purpose of the framework is not to replace animal experiments or to determine therapeutic efficacy computationally. Instead, it provides complementary evidence that can help researchers identify candidates that are more suitable for further investigation and potentially reduce the number of low-priority designs entering later-stage experiments.",
        ),
        subheading(
          "contribution-model-prioritisation",
          "6.2",
          "From Sequence Properties to Candidate Prioritization",
        ),
        prose(
          "Our framework integrates several computationally assessable properties of circRNA vaccine candidates. These include circRNA structural characteristics, potential innate immune activation, predicted expression-related behavior, and downstream biological responses. Rather than treating these outputs as independent conclusions, the framework is designed to connect them into a candidate-level evaluation process.",
          "At the sequence level, structural analysis provides information about the predicted folding characteristics of different circRNA designs. Immunogenicity-related analysis can be used to examine the potential interaction of candidate RNAs with innate immune-sensing pathways. Where sufficient biological assumptions and parameters are available, additional simulation modules can estimate how molecular properties may influence persistence, protein expression, or downstream immune responses. These modules provide **different pieces of evidence rather than a single definitive measure of vaccine quality**.",
          "The resulting information can then be used to compare candidate designs and prioritize which ones should proceed to experimental validation. For example, when several circRNA constructs contain different antigen combinations or regulatory elements, the model can help identify a smaller set of candidates that represent more favorable computational profiles. Researchers can then use experimental results to determine whether these computationally prioritized candidates actually show the expected biological behavior.",
        ),
        subheading(
          "contribution-model-decisions",
          "6.3",
          "Connecting Modeling with Experimental Decisions",
        ),
        prose(
          "The practical value of the model lies in this connection between **prediction and experimental decision-making**. A computational result is useful only when it changes what researchers do next.",
          "During the development of CirCure, computationally prioritized designs were considered alongside wet-lab results. Where computational expectations and experimental observations were not fully consistent, the discrepancy was treated as evidence of model uncertainty or biological complexity rather than as proof that the prediction was correct. This Design–Build–Test–Learn process helped us recognize that computational models are most useful as tools for narrowing experimental choices, not as substitutes for biological validation.",
          "This also defines the relationship between our **Model and circForge software**. circForge is responsible for organizing sequence information, computational outputs, design decisions, and provenance within an integrated workflow. The Model, in contrast, provides the **quantitative predictions or simulations for specific biological properties** that can be incorporated into that workflow. In simple terms, the software helps researchers organize and use evidence, whereas the model generates evidence for a defined biological question.",
        ),
        subheading(
          "contribution-model-users",
          "6.4",
          "Who Can Reuse the Framework?",
        ),
        prose(
          "The primary users of this framework are **iGEM teams and early-stage researchers developing circRNA or other nucleic-acid therapeutic candidates who need to prioritize designs before extensive experimental testing**. A future team working on another circRNA vaccine could retain the overall sequence-to-prioritization workflow while replacing the antigen sequences, training data, biological parameters, or prediction modules with those appropriate for its own project.",
          "The framework can also be adapted beyond our specific multi-epitope TNBC vaccine, but such adaptation requires validation within the new biological context. For example, a team studying another tumor type may need different antigen datasets or immune-response assumptions, while a team working with a different RNA therapeutic may need to replace circRNA-specific structural or expression modules. Therefore, we regard the framework as **adaptable in architecture, but not universally transferable without revalidation**.",
        ),
        subheading(
          "contribution-model-scope",
          "6.5",
          "3R-Oriented Scope and Limitations",
        ),
        prose(
          "Our use of the 3R principle is specifically focused on **supporting reduction and refinement before animal studies**. By computationally prioritizing candidates, the framework may help reduce the number of designs that require downstream animal evaluation and allow researchers to enter animal studies with a more focused set of candidates. It does not replace animal experiments, and it cannot establish safety, therapeutic efficacy, pharmacokinetics, or survival benefit in vivo.",
          "The framework also has important technical limitations. Predictions depend on the quality of the underlying datasets, assumptions, and computational models. Structural predictions may not fully represent the dynamic behavior of circRNA in cells, while simulated immune or therapeutic responses necessarily simplify complex biological systems. In addition, a model developed around our HLA-A*02:01-restricted multi-epitope circRNA vaccine may not perform reliably when directly applied to other HLA backgrounds, RNA architectures, delivery systems, or disease models without further validation. Computationally high-priority candidates may therefore still fail during cellular or animal testing.",
          "These limitations are not treated as exceptions to the framework but as part of its intended use. **The model narrows the search space; experiments determine whether the prediction holds.** Its value is therefore measured not by whether it can perfectly predict biological outcomes, but by whether it can provide useful, interpretable evidence for deciding which candidates are most informative to test next.",
        ),
        subheading(
          "contribution-model-teams",
          "6.6",
          "Contribution to Future iGEM Teams",
        ),
        prose(
          "Our contribution is therefore a **reusable modeling strategy for prioritizing sequence designs before resource-intensive experimental evaluation**. Future teams can reuse the overall workflow, replace individual prediction modules, retrain or recalibrate models with project-specific data, and define new biological outputs according to their own research questions. The framework can also be extended as additional experimental data become available.",
          "Rather than presenting computational modeling as a replacement for experimental biology, CirCure demonstrates a more limited but practical role: **using quantitative predictions to reduce the search space, expose uncertainty, and support better-informed experimental decisions before animal studies**. In this way, our Model provides future iGEM teams with a framework they can adapt, test, and improve as part of their own Design–Build–Test–Learn cycles.",
          learnMore(
            "3R-oriented pre-animal-experiment modeling framework",
            "https://2026.igem.wiki/jlu-fbh/model",
          ),
        ),
      ],
    },

    /* =================================================================== 08 */
    {
      id: "contribution-sustainability",
      index: "08",
      kicker: "Sustainability",
      navLabel: "Sustainable Innovation Framework",
      title: "A Sustainable Innovation Framework for Synthetic Biology",
      summary:
        "An SDG-oriented evaluation framework that connects synthetic biology design with the United Nations Sustainable Development Goals.",
      blocks: [
        subheading(
          "contribution-sdg-framework",
          "7.1",
          "A Framework for Integrating Synthetic Biology with Sustainable Development Goals",
        ),
        prose(
          "During the development of **CirCure**, we recognized that sustainable innovation in synthetic biology should not be limited to reducing environmental impact or improving technical performance (Gnaim and Ledesma-Amaro 2025). Instead, a successful biotechnology project requires a systematic understanding of how scientific innovation interacts with global challenges, industrial transformation, healthcare accessibility, and long-term societal development.",
          "To address this challenge, we developed an **SDG-oriented evaluation framework** that connects synthetic biology design with the United Nations Sustainable Development Goals (SDGs). Rather than treating SDGs as an additional description after project completion, our framework integrates sustainability considerations throughout the entire project development process — from technological inspiration, design decisions, potential applications, to future translation pathways.",
        ),
        fig("sdgFramework", "SET-DEVELOP-GROW impact framework."),
        subheading(
          "contribution-sdg-mapping",
          "7.2",
          "From Biological Innovation to Sustainable Impact Mapping",
        ),
        prose(
          "Using our circRNA vaccine platform as a case study, we explored how emerging nucleic acid technologies can contribute to multiple dimensions of sustainable development.",
          "At the technological level, our project addresses the development of next-generation vaccines through programmable RNA design, supporting **SDG 3: Good Health and Well-being** by exploring more flexible and scalable therapeutic platforms.",
          "At the industrial level, we analyzed the future translation pathway of nucleic acid vaccines, including manufacturing scalability, accessibility, and potential applications beyond research environments, providing connections between synthetic biology innovation and sustainable healthcare systems.",
          "At the educational and societal level, we designed approaches to improve public understanding of synthetic biology and responsible biotechnology development, supporting knowledge accessibility and scientific communication.",
          "Through this process, we demonstrated that a synthetic biology project can generate multidimensional value rather than a single technological output.",
        ),
        subheading(
          "contribution-sdg-model",
          "7.3",
          "A Reusable SDG Design Model for Future iGEM Teams",
        ),
        prose(
          "Our contribution is not only the sustainability analysis of CirCure itself, but also a **transferable framework for future teams to evaluate and design their own SDG-related impacts**.",
          "We propose that future synthetic biology projects can consider sustainability through three interconnected stages: **Inspiration:** Identify global challenges and corresponding SDG goals as the motivation for technological development, ensuring that biological engineering begins from real-world needs.",
          "**Innovation:** Integrate sustainability considerations into experimental design, including resource efficiency, scalability, accessibility, and responsible development.",
          "**Impact:** Evaluate how the final technology may contribute to healthcare, environment, industry, education, or other societal systems, transforming laboratory innovation into broader sustainable value.",
          "This framework provides future iGEM teams with a structured approach to connect their scientific projects with global sustainability challenges.",
        ),
        subheading(
          "contribution-sdg-reference",
          "7.4",
          "Providing a Reference Model for Sustainable Synthetic Biology Projects",
        ),
        prose(
          "We hope that our SDG framework can serve as a reference for future teams exploring sustainability-oriented synthetic biology. By incorporating SDG thinking into the early stages of project design rather than treating it as a final presentation component, teams can better identify the broader implications of their technologies and develop innovations with both scientific and societal value.",
          "Through CirCure, we demonstrate a possible pathway for transforming synthetic biology from a laboratory-centered discipline into a tool for addressing global challenges. Our contribution is therefore not only a circRNA vaccine platform, but also a reusable approach for designing biotechnology projects with sustainable impact in mind.",
          learnMore(
            "SDG-oriented evaluation framework",
            "https://2026.igem.wiki/jlu-fbh/sustainability",
          ),
        ),
      ],
    },

    /* =================================================================== 09 */
    {
      id: "contribution-translation",
      index: "09",
      kicker: "Translation",
      navLabel: "Translation Pathway",
      title:
        "An Innovative Translation Pathway for Next-Generation Nucleic Acid Vaccines",
      summary:
        "A six-stage, translation-oriented framework for early-stage nucleic acid technologies, plus its scope and limitations.",
      blocks: [
        subheading(
          "contribution-translation-gap",
          "8.1",
          "Inspiration: Identifying the Translation Gap",
        ),
        prose(
          "The rapid development of mRNA vaccines has demonstrated the potential of nucleic acid technologies in medicine, while emerging platforms such as circRNA are opening new possibilities for cancer vaccines and other RNA-based therapeutics. However, a promising biological concept is only the beginning of translation. Moving an emerging nucleic acid technology beyond the laboratory requires coordinated consideration of reproducible production, quality control, delivery, scalability, and the requirements of its intended application.",
          "During the development of **CirCure**, we encountered these questions at different stages of our own project. We realized that experimental optimization and future translation are often considered separately: a sequence may perform well experimentally without being readily reproducible at scale, while a promising biological result may not yet provide enough information to evaluate its eventual application. This revealed a broader **translation gap between synthetic-biology development and real-world implementation**.",
          "Rather than treating translation as a final step after laboratory development, we therefore asked whether these considerations could be incorporated into the development process from the beginning.",
        ),
        subheading(
          "contribution-translation-framework",
          "8.2",
          "Contribution: From CirCure to a Reusable Translation Framework",
        ),
        prose(
          "Our contribution is a **translation-oriented framework for early-stage nucleic acid technologies**, developed by organizing the questions and development requirements encountered during CirCure into six interconnected stages: **Computational Design, Biological Construction, Production, Quality Evaluation, Delivery, Application.**",
          "At the **computational design** stage, sequence and antigen candidates can be evaluated before experimental construction, helping researchers prioritize promising designs and reduce unnecessary screening. At the **biological construction** stage, the selected design must be converted into a reproducible biological system. The **production** stage then considers whether the technology can be generated consistently, while **quality evaluation** determines whether the resulting product possesses the characteristics required for downstream experiments.",
          "The pathway then extends beyond laboratory production. **Delivery** connects the engineered nucleic acid with the cells or tissues in which it is intended to function, while the **application** stage considers therapeutic context, scalability, and the requirements that would eventually need to be addressed for clinical or industrial development.",
          "The key contribution is therefore not any individual step, but the **connection between them**. A change made at one stage can influence the feasibility of later stages. For example, an optimized biological construct may still face challenges in production or delivery, while a technically feasible production process may not be meaningful if the resulting product cannot satisfy the requirements of its intended application.",
          "By connecting these considerations into a single pathway, CirCure provides a way for early-stage biotechnology projects to evaluate not only **whether a system works**, but also **what would be required for that system to become reproducible, scalable, and applicable**.",
        ),
        subheading(
          "contribution-translation-users",
          "8.3",
          "Who Can Reuse It?",
        ),
        prose(
          "The framework is primarily intended for **researchers and future iGEM teams developing emerging nucleic acid technologies**, particularly projects that are still at the early development or proof-of-concept stage. Although CirCure is centered on circRNA vaccines, the framework is not restricted to circRNA. Teams working on mRNA, RNA therapeutics, engineered nucleic acids, or other synthetic-biology platforms can adapt the same structure to their own development processes.",
          "Its practical use is to provide a **translation-oriented checklist during project design and evaluation**. Instead of waiting until the end of a project to consider commercialization or application, teams can use the pathway to identify potential bottlenecks earlier:",
          "**Can the biological design be reproduced?**",
          "**Can the production process be standardized?**",
          "**Can the product be adequately characterized?**",
          "**Is the delivery strategy compatible with the intended application?**",
          "**Could the process eventually be scaled?**",
          "**What additional evidence would be required before practical or clinical translation?**",
          "Future teams can reuse the framework without reproducing CirCure's specific biological design. They can replace the circRNA-specific components with their own technology while retaining the six-stage structure and the corresponding translation questions. In this way, the framework functions as a **reusable project-development scaffold rather than a fixed commercialization model**.",
        ),
        fig("tamSamSom", "TAM-SAM-SOM market size estimation."),
        subheading(
          "contribution-translation-scope",
          "8.4",
          "Scope and Limitations",
        ),
        prose(
          "We also recognize that an iGEM project cannot establish the complete industrial or clinical feasibility of a new nucleic acid technology. Our laboratory-scale experiments cannot determine whether CirCure can ultimately meet large-scale manufacturing requirements, long-term stability requirements, regulatory standards, or clinical efficacy and safety thresholds. Likewise, the framework does not replace formal pharmaceutical development, economic assessment, regulatory consultation, or clinical validation.",
          "These limitations define the appropriate scope of our contribution. The framework is most useful for **early-stage technology development**, where many downstream requirements remain uncertain and where identifying potential translation barriers can influence experimental priorities. It should not be interpreted as evidence that a technology is already commercially viable or clinically ready.",
          "Rather than claiming to have completed the path from laboratory research to commercialization, **CirCure contributes a structured starting point for navigating that path**. By bringing scientific design, manufacturing feasibility, quality evaluation, delivery, and application considerations into the same development framework, we hope to help future synthetic-biology teams think about translation earlier—and design their projects with not only experimental success, but also future usability in mind.",
          learnMore(
            "Translation-oriented framework",
            "https://2026.igem.wiki/jlu-fbh/entrepreneurship",
          ),
        ),
      ],
    },

    /* =================================================================== 10 */
    {
      id: "contribution-education",
      index: "10",
      kicker: "Education",
      navLabel: "Making Synthetic Biology Education More Accessible",
      title: "Making Synthetic Biology Education More Accessible",
      summary:
        "A portfolio of connected education resources — virtual laboratory, classroom programme, two card games, a music festival, an ethics debate, and additional pathways.",
      blocks: [
        prose(
          "Synthetic biology education does not face a single, uniform audience. Learners may be separated from science by limited access to experimental environments, differences in prior knowledge, unfamiliar scientific language, limited time, or uncertainty about how scientific technologies relate to their own lives.",
          "For this reason, we did not treat education as a collection of isolated outreach activities. Instead, we developed a set of connected resources and educational experiences that provide different entry points into synthetic biology. These include the **Virtual Laboratory**, **SynBio Classroom**, two biology-themed card games, a public **Music Festival** activity, an **Ethics Debate**, and a range of public-health and digital education resources.",
          "Each activity addresses a different educational barrier. The Virtual Laboratory expands access to experimental experience, SynBio Classroom connects textbook knowledge with real research, the card games support concept learning and peer interaction, the Music Festival introduces science through sensory and cultural experiences, and the Ethics Debate develops evidence-based judgment about the social consequences of biotechnology.",
          "Together, these activities form a flexible education portfolio rather than a single universal teaching model.",
        ),
        subheading(
          "contribution-education-virtual-lab",
          "9.1",
          "Virtual Laboratory",
        ),
        prose(
          "The Virtual Laboratory contributes to an accessible and reusable environment for learners who cannot fully enter a physical laboratory. Experimental learning is often restricted by the availability of equipment, reagents, trained instructors, laboratory space, and class time. These limitations may prevent students from experiencing how individual techniques form a continuous research workflow.",
          "Our Virtual Laboratory addresses this gap by connecting multiple molecular biology experiments into a coherent experimental pathway. It allows learners to encounter experimental processes in a form that can be revisited, repeated, and adapted to different learning contexts.",
          "Its contribution is not to replace physical laboratory training. Instead, it provides an additional entry point through which learners can become familiar with experimental logic before or after entering a real laboratory. Teachers and future iGEM teams can also adapt the platform to support classroom teaching, independent learning, or preparation for practical experiments.",
          "The Virtual Laboratory therefore contributes to Education through access, continuity, and reusability. It allows learners to approach synthetic biology even when physical laboratory conditions are unavailable, while preserving the relationship between experimental steps, scientific reasoning, and laboratory safety.",
        ),
        feature("contribution-gallery-virtual-lab"),
        subheading(
          "contribution-education-classroom",
          "9.2",
          "SynBio Classroom",
        ),
        prose(
          "The **SynBio Classroom** contributes a structured learning pathway that connects existing school knowledge with practical experimentation, engineering decisions, and synthetic biology design.",
          "Many students encounter DNA, gene expression, and heredity as textbook concepts before they have opportunities to understand how these concepts are used in real research. Our classroom program builds on learners' existing knowledge and extends it toward experimental interpretation, laboratory practice, scientific decision-making, and biological design.",
          "The value of SynBio Classroom lies in its continuity. Experimental activities, process-based games, and plasmid design are not treated as separate demonstrations. Instead, they are connected as different stages of one learning process, allowing students to move from understanding biological information to considering how biological systems may be designed.",
          "The classroom also demonstrates that Education can be changed by learners' questions. When students' discussions moved beyond the original teaching plan, the role of the Virtual Laboratory within the class was expanded to support a more complete experimental pathway. This provided a clear example of how participation can contribute to, and reshape, an educational experience.",
          "SynBio Classroom therefore contributes not only teaching materials, but also a model for connecting **prior knowledge, practical experience, collaborative learning, and engineering judgment**.",
        ),
        feature("contribution-gallery-synbio-classroom"),
        subheading(
          "contribution-education-bio-memory",
          "9.3",
          "Bio Memory Match",
        ),
        prose(
          "**Bio Memory Match** is a lightweight biology card game designed to provide an accessible entry point into synthetic biology concepts.",
          "The game uses a matching mechanism to introduce terms such as DNA, RNA, plasmids, promoters, proteins, enzymes, biosensors, fluorescent proteins, antibodies, vaccines, and genetic circuits. Its purpose is not to replace formal scientific learning, but to make unfamiliar concepts easier to encounter, remember, and revisit.",
          "The game is available in both digital and physical formats. This allows it to be used in different contexts, including independent learning, classroom activities, public outreach, and peer interaction. Its adjustable scale and bilingual presentation also make it adaptable to learners with different levels of prior knowledge.",
          "The main contribution of Bio Memory Match is its ability to transform abstract terminology into a low-pressure, repeatable learning experience. The accompanying concept guide creates a transition from recognition to further understanding, allowing learners to move from remembering a term to exploring its biological meaning.",
        ),
        fig("bioMemoryCover", "Cover design of the Bio Memory Match game."),
        subheading(
          "contribution-education-bio-strategy",
          "9.4",
          "Bio Strategy Arena",
        ),
        prose(
          "Our second card game, referred to as **Bio Strategy Arena**, is a competitive, faction-based biology card game. The name emphasizes strategic interaction and biological decision-making rather than directly reproducing the structure of existing entertainment card games.",
          "Unlike Bio Memory Match, which focuses on recognition and concept association, Bio Strategy Arena emphasizes competition, resource management, role interaction, and strategic judgment. Players encounter biological concepts through a changing game environment in which their decisions influence subsequent possibilities.",
          "The game contributes to a different form of educational engagement. It encourages learners to use information in context rather than simply recall isolated definitions. Concepts become connected with choices, constraints, cooperation, competition, and consequences.",
          "This format is particularly useful for learners who may not initially respond to lecture-based science communication. By placing scientific ideas within a social and strategic setting, the game creates opportunities for peer explanation, discussion, and mutual learning.",
          "Together, the two card games address different educational functions. **Bio Memory Match** supports entry-level recognition and concept familiarity, while **Bio Strategy Arena** supports applied reasoning, interaction, and strategic thinking.",
        ),
        feature("contribution-gallery-bio-strategy-arena"),
        subheading(
          "contribution-education-music-festival",
          "9.5",
          "Music Festival: Science Through Rhythm, Color, and Voice",
        ),
        prose(
          "We also organized a public Music Festival activity that introduced synthetic biology through rhythm, visual expression, and personal participation.",
          "A music festival has a different educational environment than a classroom. Participants are mobile, attention is distributed across multiple activities, and many people may only have a short period of time to engage. Instead of transferring a complete lecture into this setting, we adapted scientific content to the sensory and social atmosphere of the event.",
          "The activity included several forms of engagement. **Molecular Rhythm** translated experimental operations into rhythmic interaction. The **Transcript Plan** connected sequences, musical notation, and visual expression. **Gene Jukebox** provided a more personal entry point through familiar music, memories, and conversation.",
          "The contribution of this activity lies in expanding the ways people can approach science. Participants did not need to begin with a technical definition or a long explanation. They could enter through movement, sound, color, or personal experience, and then continue toward scientific content if they wished.",
          "The Music Festival therefore demonstrates how synthetic biology education can enter public spaces without requiring the public to behave like a classroom audience. It also shows how resources developed for one context, such as the Virtual Laboratory, can be transformed into new educational forms while retaining their scientific relationships.",
        ),
        feature("contribution-gallery-music-festival"),
        subheading(
          "contribution-education-ethics-debate",
          "9.6",
          "Ethics Debate",
        ),
        prose(
          "The **Ethics Debate** extends education from scientific understanding to evidence-based judgment.",
          "Synthetic biology can help answer questions about what may be changed in living systems, but scientific capability alone cannot determine what should be changed, who should make that decision, or how potential risks and responsibilities should be evaluated.",
          "Through the debate, students considered the relationship between scientific evidence, technological intervention, uncertainty, risk, responsibility, and values. The activity did not aim to produce one universally correct position. Instead, it encouraged participants to explain their assumptions, respond to opposing arguments, distinguish factual disagreements from value disagreements, and reconsider their own initial views.",
          "The debate contributes a form of participation that differs from experimental learning and game-based learning. The Virtual Laboratory allows learners to enter scientific processes through action. Card games allow them to engage with concepts through interaction. The Ethics Debate asks them to evaluate consequences and form positions in situations where evidence may not lead everyone to the same conclusion.",
          "This activity helps learners recognize that responsible participation in synthetic biology requires not only understanding how a technology works, but also considering its social meaning and ethical boundaries.",
        ),
        feature("contribution-gallery-ethics-debate"),
        subheading(
          "contribution-education-additional",
          "9.7",
          "Additional Education Pathways",
        ),
        prose(
          "In addition to these core resources, our Education practice included vaccine education, public-health outreach, digital science communication, medical-humanities content, and long-term online participation.",
          "The **Vaccine Classroom** used age-appropriate narratives and interactive judgment activities to connect children's existing experiences with concepts such as immune recognition and preparedness. Public-health activities, including breast-health education, adapted scientific content to open community settings and provided multiple levels of access, from short interactions to professional consultation.",
          "Our digital education work extended participation beyond a single event. Science graphics, long-form posts, picture books, medical-humanities writing, and community contributions allowed learners to encounter synthetic biology through different media and at different levels of depth.",
          "These activities contribute to the continuity of Education. Learning does not have to end when a class or event ends. A question raised in one activity can become the starting point for another resource; a teaching material can move into a new community; and a digital tool can continue to be used after the original team is no longer present.",
          learnMore(
            "Education portfolio",
            "https://2026.igem.wiki/jlu-fbh/education",
          ),
        ),
      ],
    },

    /* =================================================================== 11 */
    {
      id: "contribution-collaboration",
      index: "11",
      kicker: "Collaboration",
      navLabel: "Collaboration",
      title: "Collaboration",
      summary:
        "A collaboration framework rather than a list of events: a regional exchange platform, low-barrier connection formats, shared knowledge resources, and a wider national network.",
      blocks: [
        prose(
          "For CirCure, collaboration means more than attending conferences or presenting our project to other teams. We regard collaboration as a way to contribute lasting value to the iGEM community: by creating platforms for exchange, transforming individual experiences into shared resources, and developing accessible ways for teams to connect.",
          "Some of our activities were initiated and organized by JLU-FBH, while others were completed through participation in broader iGEM events. Although their formats differed, they shared the same purpose: to make knowledge, experience, and peer support more available to future teams.",
        ),
        subheading(
          "contribution-collab-northeast",
          "10.1",
          "Building a Regional Exchange Platform",
        ),
        prose(
          "On May 2, 2026, JLU-FBH and JLU-CP jointly organized the “Integrating Intelligence in Northeast China, Advancing Science and Ensuring Safety” iGEM Northeast Regional Exchange at Jilin University. The event brought together 11 iGEM teams from nine schools, including Tsinghua University, Jilin University, Ocean University of China, Harbin Institute of Technology, Dalian University of Technology, Northeast Normal University, Shenyang Pharmaceutical University, Northwest A&F University, and Shanghai High School International Division.",
          "The exchange was designed as more than a series of project presentations. It provided a regional platform where teams could discuss research design, experimental challenges, biosafety, ethics, interdisciplinary cooperation, and future implementation. Project presentations allowed teams to compare different approaches, while roundtable discussions encouraged more open conversations about issues that are often difficult to address within individual teams.",
          "Interactive activities, including the signature wall and postcard exchange, also helped create a more connected and welcoming community. Through this event, JLU-FBH contributed to the development of a cross-school and cross-disciplinary network in Northeast China. The format can be adapted by future teams seeking to organize regional exchanges that combine scientific discussion with peer connection.",
        ),
        feature("contribution-gallery-northeast-exchange"),
        subheading(
          "contribution-collab-letters",
          "10.2",
          "Creating Low-Barrier Forms of Connection",
        ),
        prose(
          "“Letters Across iGEM” was initiated by JLU-FBH together with WHU-China, BioX-Shanghai, and TJUSLS_China. Through handwritten letters, teams shared their project development, experimental exploration, team management, difficulties, personal growth, and expectations for the iGEM season.",
          "This activity created a form of collaboration that did not depend on travel, specialized equipment, or synchronous online meetings. The written format encouraged teams to reflect on their experiences in a more personal and thoughtful way, while allowing others to understand not only what a team achieved, but also how it grew through uncertainty and repeated effort.",
          "By organizing this exchange, JLU-FBH contributed an accessible and human-centered model of collaboration. It showed that community building can also take place through asynchronous communication, personal reflection, and mutual encouragement.",
        ),
        feature("contribution-gallery-letters-across-igem"),
        subheading(
          "contribution-collab-peers",
          "10.3",
          "Sharing Knowledge Across Villages",
        ),
        prose(
          "“For iGEM Peers” was initiated by JLU-FBH as a cross-team science communication project involving 17 iGEM teams. Each participating team selected a Village and identified common misconceptions related to its scientific field. The teams then provided explanations that contrasted these misconceptions with more accurate scientific understanding.",
          "JLU-FBH collected, edited, and organized these contributions into a shared handbook. The topics covered agriculture, food, health, the environment, art, computing, space, and other areas connected with synthetic biology. In this way, knowledge that was originally distributed across different teams and Villages was transformed into a more accessible community resource.",
          "The project contributed to iGEM in two ways. It helped teams communicate specialized knowledge to wider audiences, and it demonstrated how multiple teams can collectively produce science communication material that is more diverse than the output of any single project. The handbook can also be expanded or adapted by future teams for new topics and audiences.",
        ),
        { type: "feature", key: "contribution-doc-together-with-igem" },
        subheading(
          "contribution-collab-new-team",
          "10.4",
          "New Team Development and Knowledge Inheritance Handbook",
        ),
        prose(
          "Many new iGEM teams face similar difficulties: finding reliable experience, understanding where to begin, organizing a long competition cycle, and preserving knowledge for future members. To address this challenge, JLU-FBH developed the *New Team Development and Knowledge Inheritance Handbook*.",
          "The handbook follows the development of an iGEM team from team formation and topic selection to experimental work, Human Practices, wiki preparation, presentation, final delivery, and knowledge transfer. It emphasizes that knowledge inheritance should include not only final results, but also the reasoning behind decisions, the evidence supporting conclusions, the feedback received, and the changes made during the process.",
          "By organizing practical experience into a reusable resource, the handbook aims to reduce repeated trial and error and help future teams build on existing work rather than starting from zero. It is intended to be updated and expanded over time, allowing each generation of teams to transform its experience into a foundation for the next.",
        ),
        { type: "feature", key: "contribution-doc-new-team-handbook" },
        subheading(
          "contribution-collab-health",
          "10.5",
          "Co-creating Health Communication Resources",
        ),
        prose(
          "JLU-FBH also initiated a cross-team health communication project based on Baduanjin, a traditional Chinese exercise practice. Participating iGEM teams recorded assigned movement segments and incorporated team-identifying elements and positive health messages into their videos. JLU-FBH coordinated the integration of the submitted materials into a joint video.",
          "This project extended collaboration beyond scientific discussion. It combined traditional culture, practical health education, youth wellbeing, and iGEM team cooperation in one shared media resource. Instead of presenting health knowledge only through text or lectures, the project encouraged audiences to engage with health education through visible and repeatable physical activity.",
          "The final video provides a reusable format for future teams that wish to combine science communication with public health, traditional culture, or community wellbeing. It also reflects our belief that collaboration can produce not only academic resources, but also activities that support healthier and more connected communities.",
          "The Baduanjin joint video is still to be filmed (八段锦视频 待拍摄); the assembled result will be published with the team's videos and audios.",
          learnMore(
            "Videos and audios",
            "https://teams.igem.org/6056/deliverables/wiki/videos-and-audios",
          ),
        ),
        subheading(
          "contribution-collab-ccic",
          "10.6",
          "CCiC and Synbiopunk-CCiC 2026",
        ),
        prose(
          "At Synbiopunk-CCiC 2026 in Dalian on July 25–26, 2026, JLU-FBH shared CirCure through a project poster, team presentation, and booth-based interactions. We also organized postcard and music-themed activities to encourage informal communication among participating teams.",
          "More importantly, JLU-FBH initiated the “From Teams, For Teams” unconference discussion. The session focused on the possibility of building an open, shared handbook and micro-course library for iGEM teams. Participants discussed project design, experimental work, team management, human practices, and lessons learned from previous seasons.",
          "This discussion extended the knowledge-inheritance principles of our New Team Handbook into a broader community conversation. It allowed us to share our own experience while also learning how other teams understood the needs of future participants.",
        ),
        feature("contribution-gallery-ccic"),
        subheading(
          "contribution-collab-apic",
          "10.7",
          "APIC and Regional Exchanges",
        ),
        prose(
          "JLU-FBH also contributed to APIC through project presentation and poster communication. These activities allowed us to share CirCure's scientific design, experimental thinking, and project development with teams outside our immediate network, while receiving feedback from different institutional and disciplinary perspectives.",
          "In addition, we participated in North China, East China, South China, and Central China regional exchanges. Through project presentations and booth interactions, we introduced CirCure, discussed experimental and Human Practices ideas, and exchanged team-building experiences with other participants. These activities helped connect local exchanges with a wider national network of iGEM teams.",
          "JLU-FBH also took part in iGBA-related communication activities. Although these events differed in format, they provided further opportunities to share our project experience, learn from teams in different contexts, and contribute to the ongoing exchange of ideas within the iGEM community.",
        ),
        feature("contribution-gallery-apic"),
        subheading(
          "contribution-collab-reusable",
          "10.8",
          "A Collaboration Network",
        ),
        prose(
          "Together, these activities form a collaboration framework rather than a list of independent events. The Northeast Regional Exchange created a regional communication platform; “Letters Across iGEM” provided a low-barrier form of personal connection; “For iGEM Peers” transformed team knowledge into shared science communication material; the New Team Handbook supported long-term knowledge inheritance; and the Baduanjin project explored a practical and creative form of public health collaboration.",
          "Our participation in CCiC, APIC, and regional exchanges further connected these resources with a broader iGEM network. Through CirCure, JLU-FBH contributed not only project ideas, but also reusable ways for teams to exchange experience, support one another, and build shared community resources.",
          "These activities cannot solve every challenge faced by iGEM teams. Their value lies in their adaptability: future teams can reuse the platforms, formats, and resources according to their own region, project, experience, and community needs. In this sense, our collaboration contribution is not limited to what happened during one competition season. It is an attempt to help knowledge continue moving between teams, generations, and regions.",
        ),
        feature("contribution-gallery-regional-exchanges"),
        prose(
          learnMore(
            "Human Practices and collaboration",
            "https://2026.igem.wiki/jlu-fbh/human-practices",
          ),
        ),
      ],
    },

    /* =================================================================== 12 */
    {
      id: "contribution-references",
      index: "12",
      kicker: "Bibliography",
      navLabel: "References",
      title: "References",
      summary:
        "The fifteen sources cited in the text above, on the wiki's shared citation register.",
      blocks: [{ type: "feature", key: "contribution-references" }],
    },
  ],
  links: [
    { path: "/design", label: "BioBrick Construct Design" },
    { path: "/software", label: "circForge Design Suite" },
    { path: "/hardware", label: "CirCore Reaction Device" },
    { path: "/measurement", label: "Standardized Measurement" },
  ],
  next: {
    path: "/visual-design",
    label: "Visual Design",
    title: "Translating Complexity into Visual Clarity",
    description: "Standardized biology reaches its full potential when communicated clearly. Explore the aesthetic philosophy, color logic, and visual systems that give CirCure its voice.",
  },
};
