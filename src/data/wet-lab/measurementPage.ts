import type { WikiPageContent } from "../../components/wiki/wikiPageTypes";
import type { CitationReference } from "../citations/citationTypes";
import { getMeasurementImage } from "./measurementAssets";

export interface MeasurementJudgingCriterion {
  id: string;
  question: string;
  paragraphs: string[];
}

export const measurementJudgingCriteria: MeasurementJudgingCriterion[] = [
  {
    id: "q1",
    question: "Could the measurement(s) be reproduced by other iGEM teams?",
    paragraphs: [
      "Fourteen methods are described on this page. Eleven of them run on equipment a standard wet lab already has: a thermal cycler, a real-time PCR instrument, a gel imager, a plate reader, a flow cytometer, a cell sorter, an ELISpot reader and a fluorescence microscope. Nothing depends on custom hardware or an instrument-specific calibrant. The other three are dry-lab analyses that need public data and a workstation. Another team reruns those and gets our numbers, because the accessions, software settings and thresholds are listed below, the single-cell input is identified by its SHA-256 checksum, and the 85 structural models are archived with their job requests, coordinates and confidence files. The circular-fraction calculation reports the sample stage, the two named primer pairs, the input series and the stated 90% criterion, so another team can reproduce the calculation and assess its assumptions.",
      "One constraint limits reproduction. The human immunology used commercially sourced HLA-A*02:01 mononuclear cells from one donor, so another team would reproduce the method and get its own frequencies.",
    ],
  },
  {
    id: "q2",
    question: "Are the methods or protocols described well?",
    paragraphs: [
      "Each method on this page carries its own Protocols section with reagents, volumes, concentrations, times, temperatures and instrument settings, and its Experimental workflow section names every experiment in the project that used it. The complete step lists are on our Experiments page, where every experiment follows one template: Background, Materials and Reagents, Equipment, Experimental Design, Step-by-Step Instructions, Notes.",
      "The Experimental Design block states which controls were seeded and what each subtracts, whether replicates are technical or biological, how many there are, what the statistical unit is, and what the number may be cited as. Where an assay ran without a control, it says so and states the consequence. The Round 1 ELISpot block records that no negative and no positive well was seeded, that values are raw counts, and that no value from that round may be cited as an antigen-specific T-cell frequency.",
      "The three dry-lab methods are written to the same standard, with dataset accessions, software settings, numerical thresholds, acceptance criteria and exclusion rules all stated, and with the stage-by-stage counts recorded so the screens can be audited. The full parameter sets and per-model values are on our Model page.",
    ],
  },
  {
    id: "q3",
    question: "Could it be useful to other projects?",
    paragraphs: [
      "Circular RNA is unusual ground in iGEM. Searching the Registry by sequence role returns two group I introns and two autocatalytically spliced introns across more than 32,000 sequence features, and 64 human-host parts against 502 for *E. coli*. The main precedent is Team Gifu, who worked on circular RNA from 2014. A team starting a circRNA project inherits a large literature and almost no community measurement practice or Registry parts.",
      "We deposited 30 parts covering the circularisation backbone, the adjuvant module, the trafficking and membrane-targeting elements and the epitope cassettes, grouped into a part collection, with the measurements reported here attached to the parts they characterise. The circularity assay below is described in enough detail to be adopted directly, including a three-volume comparison that shows whether the estimated fraction changes with input. The empty-vector control design applies to any team delivering RNA or DNA into innate-immune-competent cells. And the structural epitope check below reports the absolute buried area of the anchor residue alongside the burial percentage that is normally quoted. The percentage saturates near 100% whatever the residue's size: in our own set, three peptides share a burial of 99.4% at buried areas of 60.1, 143.8 and 173.3 Å². The change is free for any team doing the same work.",
    ],
  },
  {
    id: "q4",
    question:
      "Did the team validate and calibrate their measurement process appropriately for their approach?",
    paragraphs: [
      "Measurement checks took five forms. The circular-fraction assay compared three cDNA inputs in Round 1. The 2 µL input gave a lower fraction estimate than 4 and 6 µL and was not selected for the later assay. The 4 µL input was adopted as the lower of the two inputs giving similar estimates. All three estimates exceeded 90% under the base-2 model, so the choice of input was separate from that criterion. Both rounds use target Cq values without GFP normalisation. The GFP reference measurements recorded in Round 2 are retained separately. The input comparison documents input dependence; it does not establish cross-assay calibration. Every Calcein-AM figure is computed between two measured bounds on the same plate, spontaneous and maximum release. Every per-cell readout rests on a counted and viability-gated input, so SFC per 10⁵ cells and every effector-to-target ratio share a measured denominator. Flow cytometry used single-stain compensation beads at a CV below 5%, isotype and unstained tubes, FMO controls and a fixable viability dye. Immunofluorescence sections were imaged in one batch under uniform exposure and magnification against a secondary-only control section, so that signal could be separated from the autofluorescence of necrotic tumour tissue.",
      "Three dry-lab checks belong here as well. The structural tier began by testing whether AlphaFold's own confidence score could serve as its criterion: ipTM across 85 models runs from 0.932 to 0.970 and its rank correlation with the position-9 fill ratio is +0.02, so a geometric criterion was built instead and confidence is reported as a record. Between-model dispersion then decided which measurements were allowed to carry a threshold, with anchor-position burial reproducible to 0.0 percentage points at the median and central-segment burial varying by several points. And the fill-ratio threshold was placed inside a measured gap, since alanine candidates reach 43.3% and the lowest passing candidate sits at 80.4%, so any cutoff between 44% and 80% classifies all 17 systems identically.",
    ],
  },
];

export const measurementReferences = [
  {
    id: 1,
    authors: "Abe, B.T., Wesselhoeft, R.A., Chen, R., et al.",
    title: "Circular RNA migration in agarose gel electrophoresis",
    journal: "Molecular Cell",
    volumeYear: "82(9), pp. 1768–1777.e3 (2022).",
    links: [
      {
        href: "https://doi.org/10.1016/j.molcel.2022.03.008",
        label: "doi:10.1016/j.molcel.2022.03.008",
      },
    ],
  },
  {
    id: 2,
    authors: "Abramson, J., Adler, J., Dunger, J., et al.",
    title: "Accurate structure prediction of biomolecular interactions with AlphaFold 3",
    journal: "Nature",
    volumeYear: "630, pp. 493–500 (2024).",
    links: [
      {
        href: "https://doi.org/10.1038/s41586-024-07487-w",
        label: "doi:10.1038/s41586-024-07487-w",
      },
    ],
  },
  {
    id: 3,
    authors: "Abualrous, E.T., Saini, S.K., Ramnarayan, V.R., et al.",
    title: "The carboxy terminus of the ligand peptide determines the stability of the MHC class I molecule H-2Kb: a combined molecular dynamics and experimental study",
    journal: "PLoS ONE",
    volumeYear: "10, e0135421 (2015).",
    links: [
      {
        href: "https://doi.org/10.1371/journal.pone.0135421",
        label: "doi:10.1371/journal.pone.0135421",
      },
    ],
  },
  {
    id: 4,
    authors: "Asleh, K., Negri, G.L., Spencer Miko, S.E., et al.",
    title: "Proteomic analysis of archival breast cancer clinical specimens identifies biological subtypes with distinct survival outcomes",
    journal: "Nature Communications",
    volumeYear: "13, article 896 (2022).",
    links: [
      {
        href: "https://doi.org/10.1038/s41467-022-28524-0",
        label: "doi:10.1038/s41467-022-28524-0",
      },
    ],
  },
  {
    id: 5,
    authors: "Benjamini, Y. and Hochberg, Y.",
    title: "Controlling the false discovery rate: a practical and powerful approach to multiple testing",
    journal: "Journal of the Royal Statistical Society: Series B",
    volumeYear: "57, pp. 289–300 (1995).",
    links: [
      {
        href: "https://doi.org/10.1111/j.2517-6161.1995.tb02031.x",
        label: "doi:10.1111/j.2517-6161.1995.tb02031.x",
      },
    ],
  },
  {
    id: 6,
    authors: "Bouvier, M. and Wiley, D.C.",
    title: "Importance of peptide amino and carboxyl termini to the stability of MHC class I molecules",
    journal: "Science",
    volumeYear: "265, pp. 398–402 (1994).",
    links: [
      {
        href: "https://doi.org/10.1126/science.8023162",
        label: "doi:10.1126/science.8023162",
      },
    ],
  },
  {
    id: 7,
    authors: "Calis, J.J.A., Maybeno, M., Greenbaum, J.A., et al.",
    title: "Properties of MHC class I presented peptides that enhance immunogenicity",
    journal: "PLoS Computational Biology",
    volumeYear: "9, e1003266 (2013).",
    links: [
      {
        href: "https://doi.org/10.1371/journal.pcbi.1003266",
        label: "doi:10.1371/journal.pcbi.1003266",
      },
    ],
  },
  {
    id: 8,
    authors: "Cerami, E., Gao, J., Dogrusoz, U., et al.",
    title: "The cBio Cancer Genomics Portal: an open platform for exploring multidimensional cancer genomics data",
    journal: "Cancer Discovery",
    volumeYear: "2, pp. 401–404 (2012).",
    links: [
      {
        href: "https://doi.org/10.1158/2159-8290.CD-12-0095",
        label: "doi:10.1158/2159-8290.CD-12-0095",
      },
    ],
  },
  {
    id: 9,
    authors: "Cheever, M.A., Allison, J.P., Ferris, A.S., et al.",
    title: "The prioritization of cancer antigens: a National Cancer Institute pilot project for the acceleration of translational research",
    journal: "Clinical Cancer Research",
    volumeYear: "15, pp. 5323–5337 (2009).",
    links: [
      {
        href: "https://doi.org/10.1158/1078-0432.CCR-09-0737",
        label: "doi:10.1158/1078-0432.CCR-09-0737",
      },
    ],
  },
  {
    id: 10,
    authors: "Chen, Y.G., Kim, M.V., Chen, X., et al.",
    title: "Sensing self and foreign circular RNAs by intron identity",
    journal: "Molecular Cell",
    volumeYear: "67(2), pp. 228–238.e5 (2017).",
    links: [
      {
        href: "https://doi.org/10.1016/j.molcel.2017.05.022",
        label: "doi:10.1016/j.molcel.2017.05.022",
      },
    ],
  },
  {
    id: 11,
    authors: "Creary, L.E., Sacchi, N., Mazzocco, M., et al.",
    title: "High-resolution HLA allele and haplotype frequencies in several unrelated populations determined by next generation sequencing",
    journal: "Human Immunology",
    volumeYear: "82, pp. 505–522 (2021).",
    links: [
      {
        href: "https://doi.org/10.1016/j.humimm.2021.04.007",
        label: "doi:10.1016/j.humimm.2021.04.007",
      },
    ],
  },
  {
    id: 12,
    authors: "Crowell, H.L., Soneson, C., Germain, P.L., et al.",
    title: "muscat detects subpopulation-specific state transitions from multi-sample multi-condition single-cell transcriptomics data",
    journal: "Nature Communications",
    volumeYear: "11, article 6077 (2020).",
    links: [
      {
        href: "https://doi.org/10.1038/s41467-020-19894-4",
        label: "doi:10.1038/s41467-020-19894-4",
      },
    ],
  },
  {
    id: 13,
    authors: "Enuka, Y., Lauriola, M., Feldman, M.E., et al.",
    title: "Circular RNAs are long-lived and display only minimal early alterations in response to a growth factor",
    journal: "Nucleic Acids Research",
    volumeYear: "44(3), pp. 1370–1383 (2016).",
    links: [
      {
        href: "https://doi.org/10.1093/nar/gkv1367",
        label: "doi:10.1093/nar/gkv1367",
      },
    ],
  },
  {
    id: 14,
    authors: "Falk, K., Rötzschke, O., Stevanović, S., et al.",
    title: "Allele-specific motifs revealed by sequencing of self-peptides eluted from MHC molecules",
    journal: "Nature",
    volumeYear: "351(6324), pp. 290–296 (1991).",
    links: [
      {
        href: "https://doi.org/10.1038/351290a0",
        label: "doi:10.1038/351290a0",
      },
    ],
  },
  {
    id: 15,
    authors: "Gao, J., Aksoy, B.A., Dogrusoz, U., et al.",
    title: "Integrative analysis of complex cancer genomics and clinical profiles using the cBioPortal",
    journal: "Science Signaling",
    volumeYear: "6, pl1 (2013).",
    links: [
      {
        href: "https://doi.org/10.1126/scisignal.2004088",
        label: "doi:10.1126/scisignal.2004088",
      },
    ],
  },
  {
    id: 16,
    authors: "Gong, Y., Ji, P., Yang, Y.S., et al.",
    title: "Metabolic-pathway-based subtyping of triple-negative breast cancer reveals potential therapeutic targets",
    journal: "Cell Reports",
    volumeYear: "39, article 110460 (2022).",
    links: [
      {
        href: "https://doi.org/10.1016/j.celrep.2022.110460",
        label: "doi:10.1016/j.celrep.2022.110460",
      },
    ],
  },
  {
    id: 17,
    authors: "Gong, Z., Hu, W., Zhou, C., et al.",
    title: "Recent advances and perspectives on the development of circular RNA cancer vaccines",
    journal: "npj Vaccines",
    volumeYear: "10, article 41 (2025).",
    links: [
      {
        href: "https://doi.org/10.1038/s41541-025-01097-x",
        label: "doi:10.1038/s41541-025-01097-x",
      },
    ],
  },
  {
    id: 18,
    authors: "Hafemeister, C. and Satija, R.",
    title: "Normalization and variance stabilization of single-cell RNA-seq data using regularized negative binomial regression",
    journal: "Genome Biology",
    volumeYear: "20, article 296 (2019).",
    links: [
      {
        href: "https://doi.org/10.1186/s13059-019-1874-1",
        label: "doi:10.1186/s13059-019-1874-1",
      },
    ],
  },
  {
    id: 19,
    authors: "Harndahl, M., Rasmussen, M., Roder, G., et al.",
    title: "Peptide-MHC class I stability is a better predictor than peptide affinity of CTL immunogenicity",
    journal: "European Journal of Immunology",
    volumeYear: "42, pp. 1405–1416 (2012).",
    links: [
      {
        href: "https://doi.org/10.1002/eji.201141774",
        label: "doi:10.1002/eji.201141774",
      },
    ],
  },
  {
    id: 20,
    authors: "Holm, S.",
    title: "A simple sequentially rejective multiple test procedure",
    journal: "Scandinavian Journal of Statistics",
    volumeYear: "6, pp. 65–70 (1979).",
  },
  {
    id: 21,
    authors: "Hou, X., Zaks, T., Langer, R. and Dong, Y.",
    title: "Lipid nanoparticles for mRNA delivery",
    journal: "Nature Reviews Materials",
    volumeYear: "6(12), pp. 1078–1094 (2021).",
    links: [
      {
        href: "https://doi.org/10.1038/s41578-021-00358-0",
        label: "doi:10.1038/s41578-021-00358-0",
      },
    ],
  },
  {
    id: 22,
    authors: "Jeck, W.R., Sorrentino, J.A., Wang, K., et al.",
    title: "Circular RNAs are abundant, conserved, and associated with ALU repeats",
    journal: "RNA",
    volumeYear: "19(2), pp. 141–157 (2013).",
    links: [
      {
        href: "https://doi.org/10.1261/rna.035667.112",
        label: "doi:10.1261/rna.035667.112",
      },
    ],
  },
  {
    id: 23,
    authors: "Korsunsky, I., Millard, N., Fan, J., et al.",
    title: "Fast, sensitive and accurate integration of single-cell data with Harmony",
    journal: "Nature Methods",
    volumeYear: "16, pp. 1289–1296 (2019).",
    links: [
      {
        href: "https://doi.org/10.1038/s41592-019-0619-0",
        label: "doi:10.1038/s41592-019-0619-0",
      },
    ],
  },
  {
    id: 24,
    authors: "Madden, D.R.",
    title: "The three-dimensional structure of peptide-MHC complexes",
    journal: "Annual Review of Immunology",
    volumeYear: "13, pp. 587–622 (1995).",
    links: [
      {
        href: "https://doi.org/10.1146/annurev.iy.13.040195.003103",
        label: "doi:10.1146/annurev.iy.13.040195.003103",
      },
    ],
  },
  {
    id: 25,
    authors: "Motmaen, A., Dauparas, J., Baek, M., et al.",
    title: "Peptide-binding specificity prediction using fine-tuned protein structure prediction networks",
    journal: "Proceedings of the National Academy of Sciences of the United States of America",
    volumeYear: "120, e2216697120 (2023).",
    links: [
      {
        href: "https://doi.org/10.1073/pnas.2216697120",
        label: "doi:10.1073/pnas.2216697120",
      },
    ],
  },
  {
    id: 26,
    authors: "Percie du Sert, N., Hurst, V., Ahluwalia, A., et al.",
    title: "The ARRIVE guidelines 2.0: updated guidelines for reporting animal research",
    journal: "PLoS Biology",
    volumeYear: "18(7), e3000410 (2020).",
    links: [
      {
        href: "https://doi.org/10.1371/journal.pbio.3000410",
        label: "doi:10.1371/journal.pbio.3000410",
      },
    ],
  },
  {
    id: 27,
    authors: "Peters, B., Bulik, S., Tampé, R., et al.",
    title: "Identifying MHC class I epitopes by predicting the TAP transport efficiency of epitope precursors",
    journal: "Journal of Immunology",
    volumeYear: "171, pp. 1741–1749 (2003).",
    links: [
      {
        href: "https://doi.org/10.4049/jimmunol.171.4.1741",
        label: "doi:10.4049/jimmunol.171.4.1741",
      },
    ],
  },
  {
    id: 28,
    authors: "Reynisson, B., Alvarez, B., Paul, S., et al.",
    title: "NetMHCpan-4.1 and NetMHCIIpan-4.0: improved predictions of MHC antigen presentation by concurrent motif deconvolution and integration of MS MHC eluted ligand data",
    journal: "Nucleic Acids Research",
    volumeYear: "48(W1), pp. W449–W454 (2020).",
    links: [
      {
        href: "https://doi.org/10.1093/nar/gkaa379",
        label: "doi:10.1093/nar/gkaa379",
      },
    ],
  },
  {
    id: 29,
    authors: "Ritchie, M.E., Phipson, B., Wu, D., et al.",
    title: "limma powers differential expression analyses for RNA-sequencing and microarray studies",
    journal: "Nucleic Acids Research",
    volumeYear: "43, e47 (2015).",
    links: [
      {
        href: "https://doi.org/10.1093/nar/gkv007",
        label: "doi:10.1093/nar/gkv007",
      },
    ],
  },
  {
    id: 30,
    authors: "Robinson, M.D., McCarthy, D.J. and Smyth, G.K.",
    title: "edgeR: a Bioconductor package for differential expression analysis of digital gene expression data",
    journal: "Bioinformatics",
    volumeYear: "26, pp. 139–140 (2010).",
    links: [
      {
        href: "https://doi.org/10.1093/bioinformatics/btp616",
        label: "doi:10.1093/bioinformatics/btp616",
      },
    ],
  },
  {
    id: 31,
    authors: "Saper, M.A., Bjorkman, P.J. and Wiley, D.C.",
    title: "Refined structure of the human histocompatibility antigen HLA-A2 at 2.6 Å resolution",
    journal: "Journal of Molecular Biology",
    volumeYear: "219, pp. 277–319 (1991).",
    links: [
      {
        href: "https://doi.org/10.1016/0022-2836(91)90567-P",
        label: "doi:10.1016/0022-2836(91)90567-P",
      },
    ],
  },
  {
    id: 32,
    authors: "Slieker, R.C., Warmerdam, D.O., Vermeer, M.H., et al.",
    title: "Reassessing human MHC-I genetic diversity in T cell studies",
    journal: "Scientific Reports",
    volumeYear: "14, article 7966 (2024).",
    links: [
      {
        href: "https://doi.org/10.1038/s41598-024-58777-2",
        label: "doi:10.1038/s41598-024-58777-2",
      },
    ],
  },
  {
    id: 33,
    authors: "Tenzer, S., Peters, B., Bulik, S., et al.",
    title: "Modeling the MHC class I pathway by combining predictions of proteasomal cleavage, TAP transport and MHC class I binding",
    journal: "Cellular and Molecular Life Sciences",
    volumeYear: "62, pp. 1025–1037 (2005).",
    links: [
      {
        href: "https://doi.org/10.1007/s00018-005-4528-2",
        label: "doi:10.1007/s00018-005-4528-2",
      },
    ],
  },
  {
    id: 34,
    authors: "Tremblay-McLean, A., Coenraads, S., Kiani, Z., et al.",
    title: "Expression of ligands for activating natural killer cell receptors on cell lines commonly used to assess natural killer cell function",
    journal: "BMC Immunology",
    volumeYear: "20, article 8 (2019).",
    links: [
      {
        href: "https://doi.org/10.1186/s12865-018-0272-x",
        label: "doi:10.1186/s12865-018-0272-x",
      },
    ],
  },
  {
    id: 35,
    authors: "Wang, J., Ding, Y., Chong, K., et al.",
    title: "Recent advances in lipid nanoparticles and their safety concerns for mRNA delivery",
    journal: "Vaccines",
    volumeYear: "12(10), article 1148 (2024).",
    links: [
      {
        href: "https://doi.org/10.3390/vaccines12101148",
        label: "doi:10.3390/vaccines12101148",
      },
    ],
  },
  {
    id: 36,
    authors: "Wu, S.Z., Al-Eryani, G., Roden, D.L., et al.",
    title: "A single-cell and spatially resolved atlas of human breast cancers",
    journal: "Nature Genetics",
    volumeYear: "53(9), pp. 1334–1347 (2021).",
    links: [
      {
        href: "https://doi.org/10.1038/s41588-021-00911-1",
        label: "doi:10.1038/s41588-021-00911-1",
      },
    ],
  },
  {
    id: 37,
    authors: "Xiao, M.S. and Wilusz, J.E.",
    title: "An improved method for circular RNA purification using RNase R that efficiently removes linear RNAs containing G-quadruplexes or structured 3′ ends",
    journal: "Nucleic Acids Research",
    volumeYear: "47(16), pp. 8755–8769 (2019).",
    links: [
      {
        href: "https://doi.org/10.1093/nar/gkz576",
        label: "doi:10.1093/nar/gkz576",
      },
    ],
  },
  {
    id: 38,
    authors: "Yan, Z., Dhanda, S.K., Paul, S., et al.",
    title: "Next-generation IEDB tools: a platform for epitope prediction and analysis",
    journal: "Nucleic Acids Research",
    volumeYear: "52, pp. W526–W532 (2024).",
    links: [
      {
        href: "https://doi.org/10.1093/nar/gkae407",
        label: "doi:10.1093/nar/gkae407",
      },
    ],
  },
] satisfies readonly CitationReference[];

export const measurementPage: WikiPageContent = {
  route: "/measurement",
  category: "wet-lab",
  chapter: "Wet Lab / 03 of 04",
  eyebrow: "Measurement",
  title: "Measurement",
  lede: "",
  boundary: "",
  visual: "measurement-field",
  visualLabel: "",
  visualSteps: [],
  facts: [],
  sections: [
    {
      id: "01-judging-criteria",
      index: "01",
      kicker: "",
      title: "Judging Criteria",
      summary: "",
      blocks: [
        {
          type: "feature",
          key: "measurement-judging-criteria",
        },
      ],
    },
    {
      id: "02-contributions-to-measurement",
      index: "02",
      kicker: "",
      title: "Contributions to Measurement",
      summary: "",
      blocks: [
        {
          type: "prose",
          paragraphs: [
            "Five things here were built so that another team can use them without taking on the rest of the project.",
          ],
        },
        {
          type: "subheading",
          id: "02-contributions-to-measurement-1-1-a-circularity-assay-with-a-working-range-check-so-the-figure-is-comparable",
          index: "1",
          title:
            "A circular-fraction estimate with named assays and an input-volume comparison.",
          level: 3,
        },
        {
          type: "prose",
          paragraphs: [
            "We estimate the circular fraction in the RNA preparation after RNase R treatment. The circular channel uses SJ3910F + SJ3909R, and the residual-linear channel uses SJ3911F + SJ3909R. Stating the sample stage and primer pairs makes the denominator clear.",
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "For the Round 1 representative, three cDNA inputs gave estimates of 92.85 ± 0.08% at 2 µL, 96.96 ± 0.70% at 4 µL and 96.25 ± 1.14% at 6 µL. These are mean ± SD across three technical comparisons per input. The 2 µL input gave a lower circular-fraction estimate than the two higher inputs. A 4 µL input was sufficient to obtain an estimate comparable to that at 6 µL, with no clear benefit from adding more template. We therefore adopted 4 µL as the standard cDNA input for subsequent measurements. All three inputs remain reported. This empirical comparison does not establish a validated quantitative range.",
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "Other teams can reuse the plate layout and calculation. Round 1 uses nine wells per target assay, or 18 target-assay wells in total. Both rounds use the same target-Cq calculation without GFP normalisation. The Combined record also contains GFP measurements, which are retained separately. Reporting the raw Cq values allows other teams to reproduce the estimates. Cross-assay calibration remains necessary to establish a quantitative scale for the two targets.",
          ],
        },
        {
          type: "subheading",
          id: "02-contributions-to-measurement-2-2-an-empty-vector-control-that-separates-the-antigen-from-its-carrier",
          index: "2",
          title:
            "An empty-vector control that separates the antigen from its carrier.",
          level: 3,
        },
        {
          type: "prose",
          paragraphs: [
            "The comparator is a circRNA carrying the complete backbone and the 4×mC3dP28 adjuvant with no epitope, electroporated identically. It applies well beyond circRNA. Any nucleic acid delivered into innate-immune-competent cells is itself an immune stimulus, so an increase in a T-cell readout cannot be assigned to the encoded antigen unless the comparator carries the same backbone and the same adjuvant.",
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "We can put a number on what that arm is worth. In the animal study the vaccine inhibited tumour growth by 89.6% against PBS and by 73.2% against the empty vector. The 16.4 percentage points between those figures belong to the carrier, and a two-arm design would have handed them to the antigen.",
          ],
        },
        {
          type: "subheading",
          id: "02-contributions-to-measurement-3-3-absolute-anchor-buried-area-reported-beside-the-burial-percentage",
          index: "3",
          title:
            "Absolute anchor buried area reported beside the burial percentage.",
          level: 3,
        },
        {
          type: "prose",
          paragraphs: [
            "Whether a peptide's C-terminal anchor is seated in the HLA groove is normally reported as percentage side-chain burial. Almost every peptide reads 99% to 100% there, because the residue is enclosed whatever its size, so a glycine with no side chain at all and a leucine that fills the pocket can both read near 100%. Three peptides in our own set share a burial of 99.4% at buried areas of 60.1, 143.8 and 173.3 Å².",
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "Reporting the absolute area alongside the percentage separates them, against the roughly 140 Å² that a leucine or isoleucine anchor occupies. It changed two verdicts out of seventeen, and both of those peptides would otherwise have gone into the wet lab.",
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "The threshold is also cheap to defend. Any cutoff between 44% and 80% of the reference classifies all seventeen the same way, so the result does not turn on where exactly it is set. The number is already produced by the calculation, so recording it costs nothing.",
          ],
        },
        {
          type: "subheading",
          id: "02-contributions-to-measurement-4-4-stated-denominators-and-labelled-replicates-throughout",
          index: "4",
          title: "Stated denominators and labelled replicates throughout.",
          level: 3,
        },
        {
          type: "prose",
          paragraphs: [
            "Every per-cell figure here names the denominator it was computed over, and every replicate is labelled technical or biological where it appears. SFC per 10⁵ cells means nothing between constructs unless the T-cell input was the same, and a standard deviation from three wells on one plate says something different from one across three experiments.",
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "Both are routinely left implicit on iGEM wikis, and both are free to state.",
          ],
        },
        {
          type: "subheading",
          id: "02-contributions-to-measurement-5-5-thirty-registry-parts-grouped-as-a-collection",
          index: "5",
          title: "Thirty Registry parts, grouped as a collection.",
          level: 3,
        },
        {
          type: "prose",
          paragraphs: [
            "They cover the circularisation backbone, the adjuvant module, the trafficking and membrane-targeting elements and the epitope cassettes. Grouping them into a collection means the backbone can be taken as a working unit instead of assembled entry by entry.",
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "The measurements reported here are attached to the parts they characterise, so the circularisation backbone comes with a circularity figure and the epitope cassettes that went through Round 1 carry their ELISpot and killing counts. The next team to build a circRNA construct therefore starts from a backbone with a number attached rather than from a sequence in a paper.",
          ],
        },
      ],
    },
    {
      id: "03-overview",
      index: "03",
      kicker: "",
      title: "Overview",
      summary: "",
      blocks: [
        {
          type: "prose",
          paragraphs: [
            "CirCure is a multi-epitope circular RNA vaccine against triple-negative breast cancer, built on a T4 *td* permuted-intron backbone carrying eight selected epitope fragments from TROP2, B7-H4, Nectin-4 and LIV-1. Four candidate antigens were assessed against four lines of public evidence. Their sequences yielded 1,838 candidate peptides, reduced to 17 by sequence screening and topology review, then to 15 by structural screening. Thirteen single-epitope constructs were ordered as synthesised plasmids, with sequence identity documented by the supplier. The plasmids were linearised for T7 in vitro transcription, followed by circularisation and RNase R treatment. The post-RNase R circular fraction was estimated on TROP2-CTL1 as the Round 1 representative and on the Combined preparation in Round 2. The Combined vaccine also underwent Sanger sequencing of an RT-PCR product spanning the back-splice junction (BSJ). The functional experiments then asked whether dendritic cells translated the antigen, how the constructs ranked by IFN-γ release, whether primed T cells killed tumour cells while sparing normal cells, and whether the vaccine restrained tumour growth in vivo.",
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "Three kinds of relation hold that sequence together. Some measurements set acceptance criteria: the stated circular-fraction criterion is at least 90%, applied here to the measured representative preparations, the surface TROP2 measurement on the engineered 4T1 line gates the entire animal study, and the GFP imaging gates the sort that produced that line. Some fix a number that the others reuse: cell counting fixes the denominator behind every per-cell figure, the input-volume comparison led to selection of 4 µL for the Combined circular-fraction measurement, with 2 µL not carried forward as the standard input, and the CCK-8 curve fixes 200 ng per 1×10⁴ dendritic cells as the carrier ceiling. An error in a shared number moves every readout that uses it in the same direction. And some license the reading of another: the K562 arm of the killing assay shows that all thirteen effector preparations were functional, which is what allows a low ELISpot count to be read as a weak epitope instead of as cells that never worked.",
          ],
        },
        {
          type: "figure",
          src: getMeasurementImage(
            "dependency-relations-between-the-measurements-in-the-project",
          ),
          width: 1280,
          height: 896,
          alt: "Dependency relations between the measurements in the project",
          caption:
            "Dependency relations between the measurements in the project",
        },
        {
          type: "prose",
          paragraphs: [
            "Circular RNA is unusual ground in iGEM. Searching the Registry by sequence role returns two group I introns and two autocatalytically spliced introns across more than 32,000 sequence features, and 64 human-host parts against 502 for *E. coli*. The main precedent is Team Gifu, whose circular RNA work began in 2014. The literature is large and recent while the Registry toolkit is almost empty, so there is no shared protocol for checking that a preparation is circular and no agreed way to report that figure once it has been measured. So we built those pieces: a circular-fraction assay that compares input volumes before fixing the input used for later measurements, a control design that separates the encoded antigen from the carrier delivering it, and 30 parts deposited as a collection, with each measurement reported here attached to the part it characterises.",
          ],
        },
      ],
    },
    {
      id: "04-choosing-what-to-build",
      index: "04",
      kicker: "",
      title: "Choosing what to build",
      summary: "",
      blocks: [
        {
          type: "prose",
          paragraphs: [
            "Nothing had been built at this point. The question was which four proteins to aim at, and which peptides from them were worth a wet-lab slot, and the only evidence available was data other groups had already generated. The three methods here hand their output to one another as a shrinking list: four antigens, then 17 peptides, then 15.",
          ],
        },
        {
          type: "subheading",
          id: "04-choosing-what-to-build-1-public-dataset-re-analysis-a-method-to-choose-antigens-on-measured-evidence",
          index: "1",
          title:
            "Public-dataset re-analysis: A method to choose antigens on measured evidence",
          level: 3,
        },
        {
          type: "subheading",
          id: "04-choosing-what-to-build-1-1-introduction",
          index: "1.1",
          title: "Introduction",
          level: 4,
        },
        {
          type: "prose",
          paragraphs: [
            "The antigens are chosen before anything is built, and a bad choice cannot be repaired by careful work downstream. The usual evidence offered for a choice is a paper reporting that a protein is overexpressed in the disease. A CTL vaccine requires several criteria to be satisfied simultaneously. The protein has to be present at the protein level, which is what established tumour-antigen prioritisation frameworks ask for first (Cheever et al., 2009). It has to be made by the malignant cells rather than by the fibroblasts and immune cells mixed in with them. It has to be present in enough patients to be worth targeting. And it needs to be localized where MHC class I presentation can occur or where it is accessible to antigen-presenting cells.",
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "Four public datasets were re-analysed, one for each of those questions. Every threshold and every rule was fixed before the numbers came back, and the same rule went to all four candidates. That discipline is what the measurement consists of here, since the raw data were generated by other groups for their own purposes.",
          ],
        },
        {
          type: "subheading",
          id: "04-choosing-what-to-build-1-2-experimental-workflow",
          index: "1.2",
          title: "Experimental workflow",
          level: 4,
        },
        {
          type: "prose",
          paragraphs: [
            "Four candidate proteins entered this stage: TROP2 (TACSTD2), B7-H4 (VTCN1), Nectin-4 (NECTIN4) and LIV-1 (SLC39A6). They came from clinical-data review, the literature and our Human Practices consultations, and the four modules below are what tested them.",
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "Protein abundance was read from two public TMT proteomic datasets. PXD024322 holds 88 TNBC tumours against 38 normal-breast samples and covers all four candidates (Asleh et al., 2022). PXD028102 holds 66 matched tumour and adjacent-normal pairs and covers three (Gong et al., 2022). Running both was deliberate, because the two designs carry different amounts of between-patient variation.",
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "Cell-type resolution came from the TNBC subset of the GSE176078 breast-cancer atlas (Wu et al., 2021), recomputed from the deposited raw counts to 39,324 cells that passed quality control across 10 patients. The malignant compartment was compared against pooled immune and stromal cells, and the proportion of cells carrying at least one read was recorded for each compartment.",
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "Patient-level coverage came from the 115 TNBC cases of the TCGA Breast Invasive Carcinoma PanCancer Atlas in cBioPortal (Cerami et al., 2012; Gao et al., 2013), under one query rule applied to all four genes.",
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "Tissue architecture came from published immunohistochemistry. This module is a literature review and is marked as such wherever its numbers appear.",
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "All four candidates cleared all four tiers, so the decision these modules fed was whether to narrow the panel at all.",
          ],
        },
        {
          type: "subheading",
          id: "04-choosing-what-to-build-1-3-protocols",
          index: "1.3",
          title: "Protocols",
          level: 4,
        },
        {
          type: "prose",
          paragraphs: [
            "1. For PXD024322, download the authors' supplementary quantitative-proteomics workbook and clinical tables. The abundance matrix holds 9,088 protein groups across 38 TMT batches on a log₂ relative scale. Keep tumours annotated as TNBC and samples annotated as normal breast, giving 88 and 38.",
            "2. Require at least two non-missing values in each group before fitting, which 8,734 of the 9,088 protein groups meet. Fit `~ Batch + Condition` in limma with normal breast as the reference, apply empirical Bayes moderation with trend and robust both enabled, take the TNBC coefficient as the log₂ fold change, and control the false discovery rate across all tested proteins by Benjamini-Hochberg (Ritchie et al., 2015; Benjamini and Hochberg, 1995).",
            "3. For PXD028102, take the profiling-abundance matrix of 7,531 gene products on the authors' log₂ scale, covering 82 tumours and 66 adjacent-normal samples, and retain the 66 patients holding both for the paired model. Impute low-abundance entries within each sample at one log₂ unit below that sample's first percentile. Fit `~ PatientID + Condition` with the same moderation settings and adjust across all 7,531 proteins. Repeat under three further low-abundance settings and record whether the target-level directions hold.",
            "4. For GSE176078, take the processed atlas distributed through CELLxGENE, record the SHA-256 checksum of the downloaded file, and select the ten samples labelled TNBC in the authors' integration configuration.",
            "5. Recalculate quality control from the raw unique-molecular-identifier matrix: total count, genes detected and the percentage of counts on mitochondrial genes. Set the thresholds separately for each donor, because library distributions differ between patients. 39,324 cells remain.",
            "6. Normalise with SCTransform v2 on 3,000 variable genes, compute 50 principal components, run Harmony on `donor_id` over dimensions 1 to 30, build a 20-nearest-neighbour graph on the same 30 dimensions, cluster with Leiden at resolution 0.6, and fix the random seed so the embedding is reproducible (Hafemeister and Satija, 2019; Korsunsky et al., 2019).",
            "7. Sum raw counts within each patient and compartment before any test, so the replicate is the patient. Combine immune and stromal counts as the non-malignant side, use the eight patients holding both libraries, fit `~ donor_id + compartment` in edgeR with trimmed-mean normalisation and robust quasi-likelihood, and control the false discovery rate by Benjamini-Hochberg (Robinson et al., 2010; Crowell et al., 2020).",
            "8. Define detection rate as the proportion of cells with a raw count of at least 1, compute it on pooled cells, and report it as an observation.",
            "9. Compute the pairwise Jaccard index between gene-positive malignant populations, together with the proportion of malignant cells expressing at least one candidate and the proportion expressing all four.",
            "10. In cBioPortal, open the Breast Invasive Carcinoma PanCancer Atlas, select the TNBC cases to give a cohort of 115, and query all four genes together under one Onco Query Language rule: a high-level amplification, or an mRNA z-score of at least 0.5. Count the union once per patient.",
            "11. For the tissue review, record sample size, tissue setting, staining pattern and localisation for each candidate, and cite the source beside each image.",
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "Fix every threshold before the first dataset is opened, and use one rule for all candidates. A per-candidate threshold turns a screen into a justification.",
          ],
        },
        {
          type: "subheading",
          id: "04-choosing-what-to-build-1-4-results",
          index: "1.4",
          title: "Results",
          level: 4,
        },
        {
          type: "table",
          caption:
            "Table 1. Protein and transcript evidence for the four candidate antigens.",
          headers: [
            "Antigen",
            "Gene",
            "PXD024322 FC (FDR)",
            "PXD028102 FC (FDR)",
            "Malignant vs non-malignant log₂FC (FDR)",
            "Detection rate, malignant / immune / CAF (%)",
            "TCGA cases meeting the rule (%)",
          ],
          rows: [
            [
              "TROP2",
              "TACSTD2",
              "1.14× (0.0370)",
              "18.25× (2.14 × 10⁻¹⁵)",
              "4.074 (8.37 × 10⁻⁵)",
              "70.4 / 4.0 / 5.4",
              "38",
            ],
            [
              "B7-H4",
              "VTCN1",
              "1.20× (0.0446)",
              "3.72× (7.15 × 10⁻⁶)",
              "5.393 (2.52 × 10⁻⁵)",
              "19.8 / 0.3 / 0.4",
              "31",
            ],
            [
              "Nectin-4",
              "NECTIN4",
              "1.35× (7.14 × 10⁻⁹)",
              "7.12× (2.13 × 10⁻¹¹)",
              "4.755 (3.70 × 10⁻⁶)",
              "37.8 / 1.0 / 0.6",
              "79",
            ],
            [
              "LIV-1",
              "SLC39A6",
              "1.34× (1.88 × 10⁻⁵)",
              "not quantified",
              "0.853 (0.0196)",
              "39.4 / 8.5 / 20.7",
              "4",
            ],
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "All four candidates were quantified and reached significance in at least one proteomic dataset. The effect sizes differ by about an order of magnitude between the two, and the design explains it: the paired dataset removes between-patient variation. TROP2 is the clearest case, lowest in the unpaired cohort at 1.14× and largest in the paired design at 18.25×.",
          ],
        },
        {
          type: "feature",
          key: "measurement-proteomics-volcanoes",
        },
        {
          type: "prose",
          paragraphs: [
            "All four genes are enriched in malignant cells. Three of them are close to absent from the immune and stromal compartments, with detection rates at or below 5.4%. LIV-1 is the exception, with an enrichment an order of magnitude smaller and the only appreciable stromal signal at 20.7% in cancer-associated fibroblasts, which is 508 of 2,458 such cells.",
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "The number that decided the panel size is the overlap between the four. Across the dataset, 81.4% of malignant cells express at least one candidate gene, ranging from 52.5% to 97.8% between patients, and 7.3% express all four. The pairwise Jaccard indices between gene-positive populations run from 0.221 to 0.438. The four antigens therefore mark largely different malignant cells. TACSTD2 has the broadest reach, and NECTIN4 and VTCN1 label populations it misses.",
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "Patient coverage runs the same way. Nectin-4 alone meets the cBioPortal rule in 79% of the 115 cases, and the union of all four reaches 88%, or 101 of 115, adding 10 patients under the same rule.",
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "Published immunohistochemistry documents tissue-level protein for all four candidates, with four distinguishable patterns: TROP2 broad but heterogeneous, B7-H4 concentrated in tumour epithelial regions, Nectin-4 clearly membranous, LIV-1 stronger in high-grade and residual disease.",
          ],
        },
        {
          type: "figure",
          src: getMeasurementImage(
            "malignant-cell-enrichment-and-compartment-detection-rates-in-gse176078",
          ),
          width: 1280,
          height: 1090,
          alt: "Malignant-cell enrichment and compartment detection rates in GSE176078",
          caption:
            "Malignant-cell enrichment and compartment detection rates in GSE176078",
        },
        {
          type: "subheading",
          id: "04-choosing-what-to-build-1-5-discussion",
          index: "1.5",
          title: "Discussion",
          level: 4,
        },
        {
          type: "prose",
          paragraphs: [
            "The four tiers were built to eliminate candidates and none of them did, which turned the question from which antigen to take into whether to narrow the panel at all. Two measurements argued against narrowing: the Jaccard indices of 0.221 to 0.438 between gene-positive malignant populations, and the rise in patient coverage from 79% for the best single antigen to 88% for the union. A single-antigen vaccine would leave a large share of the malignant compartment unaddressed. All four canonical sequences therefore went into epitope prediction, and the equal-representation rule that gave each antigen two epitopes in the final cassette comes from this measurement.",
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "The tiers also check each other, which is why there are four of them. Proteomics measures abundance averaged over every cell type in a sample, so a high figure there can come from stroma, and the single-cell data settles that. Single-cell data reports transcripts, so a gene enriched in malignant cells may still fail to reach the surface as protein, and the tissue review addresses that. Both are within-tumour measurements and say nothing about how many patients a target would reach, which is what cBioPortal answers. Where two tiers appear to disagree, the disagreement is usually a difference in what is being measured. LIV-1 is the case worth stating plainly: it is the weakest candidate at three of the four tiers, and it was retained on its single-cell detection rate and its proteomic signal in the unpaired cohort.",
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "The pseudobulk design fixes the statistical unit for this stage, in the same way the cell count fixes it for the wet-lab readouts. Counts are summed within each patient before any test is run, so the replicate is the patient. Thirty-nine thousand cells from eight patients give eight replicates, and the FDR values in Table 1 are computed on that basis.",
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "Three limits bound everything above. These are re-analyses of data other groups generated, on cohorts we did not assemble. Detection rate as computed here is a lower bound: single-cell data are sparse, so a gene scored as undetected may have been missed at the achieved sequencing depth, and the fold changes are much less sensitive to this than the rates are. And the differential test rests on 8 patients, which is a small pseudobulk sample, although the direction of enrichment held for all four genes under an alternative sample-label assignment and under treatment-status subsetting.",
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "One comparison should be kept out of this table, and it is the one a reader is most likely to attempt. The 38% recorded for TACSTD2 under the cBioPortal rule is a transcript-and-copy-number figure on one cohort. Clinical staining studies report far higher TROP2 positivity rates on different cohorts under different criteria. The two numbers measure different quantities, so quoting them side by side would misrepresent both.",
          ],
        },
        {
          type: "subheading",
          id: "04-choosing-what-to-build-2-iedb-class-i-prediction-a-method-to-reduce-1-838-peptides-to-a-testable-panel",
          index: "2",
          title:
            "IEDB Class I prediction: A method to reduce 1,838 peptides to a testable panel",
          level: 3,
        },
        {
          type: "subheading",
          id: "04-choosing-what-to-build-2-1-introduction",
          index: "2.1",
          title: "Introduction",
          level: 4,
        },
        {
          type: "prose",
          paragraphs: [
            "The four antigens contain 1,838 overlapping nine-residue peptides between them. A wet lab can test somewhere between ten and twenty. Prediction is what closes that gap, and what it supplies is a ranking by resemblance to peptides already known to be presented.",
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "Resemblance can be measured in several ways at once, and the choice we had to make was how many of those measures to let into the decision. The prediction run produced four kinds of output: a binding affinity, a similarity to naturally eluted ligands, a processing and transport score, and a peptide-intrinsic immunogenicity score. Two of them were declared gates before the run and two were kept as records. Declaring that in advance is what keeps a screen from becoming a search for the combination of thresholds that returns the desired number of peptides.",
          ],
        },
        {
          type: "subheading",
          id: "04-choosing-what-to-build-2-2-experimental-workflow",
          index: "2.2",
          title: "Experimental workflow",
          level: 4,
        },
        {
          type: "prose",
          paragraphs: [
            "HLA-A*02:01 was taken as the first allele because the workflow had to be developed against something well characterised. In a high-resolution survey spanning 12 unrelated populations it was the most frequent allele overall, with frequency differing between populations (Creary et al., 2021), and a survey of 74 SARS-CoV-2 T-cell studies found it examined in 55 of them, more than any other allele (Slieker et al., 2024). Every epitope in this project is restricted to it.",
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "The four canonical sequences were submitted separately to the IEDB T Cell Epitope Prediction Class I workflow (Yan et al., 2024) with peptide length fixed at nine residues. IEDB scanned every overlapping 9-mer and kept its start and end position in the canonical protein, giving 315 peptides from TROP2, 274 from B7-H4, 502 from Nectin-4 and 747 from LIV-1.",
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "Three components ran together so that every peptide left the same export with every output. NetMHCpan 4.1 EL scored resemblance to naturally eluted HLA ligands (Reynisson et al., 2020). The Basic Processing module combined immunoproteasome cleavage, TAP transport and NetMHCpan 4.1 BA (Peters et al., 2003; Tenzer et al., 2005), and the BA predicted IC₅₀ from inside it supplied the first gate. The Class I pMHC immunogenicity model scored sequence features with positions 1, 2 and the C terminus masked, so that the principal anchor positions did not dominate it (Calis et al., 2013), and it supplied the second gate.",
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "Each survivor was then checked against its position in the source protein, and peptides from a signal peptide or a transmembrane segment were removed. The reason is specific to a multi-epitope construct. Our circRNA encodes the selected epitopes in one polypeptide, from which each target peptide has to be released by intracellular processing. The hydrophobic core of a signal peptide or a membrane anchor can direct a nascent protein to the endoplasmic reticulum, and if a similar targeting signal assembled in the tandem product it could redirect the whole polypeptide and change what is released from it. This review is a judgement about the construct.",
          ],
        },
        {
          type: "subheading",
          id: "04-choosing-what-to-build-2-3-protocols",
          index: "2.3",
          title: "Protocols",
          level: 4,
        },
        {
          type: "prose",
          paragraphs: [
            "1. Download the reviewed canonical human sequences from UniProtKB: P09758 for TROP2, Q7Z7D3 for B7-H4, Q96NY8 for Nectin-4 and Q13433 for LIV-1.",
            "2. Submit each FASTA sequence separately to the IEDB Class I workflow with peptide length 9 and HLA-A*02:01 as the restricting allele, and retain the 1-based start and end coordinates IEDB returns for every 9-mer.",
            "3. Enable NetMHCpan 4.1 EL for binding and elution, the Basic Processing Predictions module for cleavage and transport, and the pMHC immunogenicity model, so that one export carries all outputs for every peptide.",
            "4. Set the processing module to the immunoproteasome, a maximum precursor extension of 1 and a TAP alpha factor of 0.2, and take the predicted IC₅₀ from the NetMHCpan 4.1 BA model inside it.",
            "5. Set the immunogenicity model to mask positions 1, 2 and the C terminus.",
            "6. Apply the first gate: keep peptides with a predicted IC₅₀ below 500 nM, which is the affinity cutoff IEDB lists for selecting Class I binders.",
            "7. Apply the second gate: keep peptides with an immunogenicity score above zero.",
            "8. Retain the EL percentile rank and the processing scores as supporting fields on every candidate record, with no pass-or-fail rule attached to either.",
            "9. Match each surviving peptide to the UniProt topology intervals of its source protein, review its amino-acid composition, and exclude peptides lying in a signal peptide or a transmembrane segment.",
            "10. Keep duplicate peptide strings arising at different protein positions as separate records, because the source coordinates are part of the evidence.",
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "Record the counts surviving each stage before moving to the next one. The stage-by-stage counts are what make the screen auditable afterwards.",
          ],
        },
        {
          type: "subheading",
          id: "04-choosing-what-to-build-2-4-results",
          index: "2.4",
          title: "Results",
          level: 4,
        },
        {
          type: "table",
          caption: "Table 2. The staged epitope screen, by source antigen.",
          headers: [
            "Screening stage",
            "TROP2",
            "B7-H4",
            "Nectin-4",
            "LIV-1",
            "Total",
          ],
          rows: [
            ["All overlapping 9-mers", "315", "274", "502", "747", "1,838"],
            ["Predicted IC₅₀ below 500 nM", "17", "13", "15", "38", "83"],
            ["Immunogenicity score above 0", "9", "10", "10", "22", "51"],
            ["After topology review", "4", "2", "6", "5", "17"],
            ["After structural screening", "4", "2", "4", "5", "15"],
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "The two numerical gates together removed 1,787 of the 1,838 peptides. Topology review then removed 34 of the remaining 51, the largest proportional cut of any stage, and all 34 lie in a signal peptide or a transmembrane segment. The effect is uneven between antigens: of B7-H4's 10 numerically qualified peptides, 6 lie in the signal peptide and 2 in the transmembrane region, leaving 2.",
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "Seventeen peptides formed the experimental panel, distributed across all four antigens, so no antigen was lost at this stage. Fifteen of them survived the structural screening described in the next block, and thirteen of those became the Round 1 construct library.",
          ],
        },
        {
          type: "figure",
          className: "measurement-figure--compact measurement-figure--fig03",
          src: getMeasurementImage(
            "the-staged-epitope-screen-from-1-838-nine-mers-to-15-delivered-peptides",
          ),
          width: 1135,
          height: 1280,
          alt: "The staged epitope screen, from 1,838 nine-mers to 15 delivered peptides.",
          caption:
            "The staged epitope screen, from 1,838 nine-mers to 15 delivered peptides.",
        },
        {
          type: "subheading",
          id: "04-choosing-what-to-build-2-5-discussion",
          index: "2.5",
          title: "Discussion",
          level: 4,
        },
        {
          type: "prose",
          paragraphs: [
            "The distinction between a gate and a record is the part of this stage worth copying. Four outputs were available and two were used to decide. The elution percentile and the processing scores stayed on every candidate record and influenced nothing, which means the screen can be re-run from the same export by anyone and will return the same 83, 51 and 17. Had all four been treated as filters, the surviving count would have depended on the order they were applied in and on four thresholds instead of two.",
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "The topology review is the one stage that rests on judgement, and it is also the one that removed the most. That combination deserves to be stated rather than buried in a count. The decision it makes is about the tandem product, and the evidence it uses is a UniProt annotation plus the amino-acid composition of the region. It set the per-antigen ceiling that constrained cassette composition later, because B7-H4 came out of it with only two peptides and therefore had nothing left to select between in Round 1.",
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "Three limits bound this stage. Everything here rests on one allele, which bounds the population the vaccine could address whatever else is improved. Peptide length was fixed at nine residues, the canonical preference for this allele, which leaves out the eight, ten and eleven-residue peptides it also presents. And the 34 peptides removed on topology were never synthesised, so the rule has no experimental test in either direction. Running the same workflow across further alleles, and measuring which peptides TNBC cells actually present by targeted immunopeptidomics, are the two extensions that would lift those limits.",
          ],
        },
        {
          type: "subheading",
          id: "04-choosing-what-to-build-3-alphafold-3-structural-screening-a-method-to-check-that-a-predicted-epitope-can-be-loaded",
          index: "3",
          title:
            "AlphaFold 3 structural screening: A method to check that a predicted epitope can be loaded",
          level: 3,
        },
        {
          type: "subheading",
          id: "04-choosing-what-to-build-3-1-introduction",
          index: "3.1",
          title: "Introduction",
          level: 4,
        },
        {
          type: "prose",
          paragraphs: [
            "The 17 peptides that cleared the sequence screen were selected on predicted numbers alone. A sequence-based affinity is a number about a sequence, and it leaves one physical question open: can this peptide sit in the groove in the geometry a loaded peptide has?",
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "The groove of a class I molecule is closed at both ends, and two kinds of interaction hold a peptide in it. Side chains at position 2 and at the C terminus insert into the B and F pockets, which depends on the peptide's own sequence. Heavy-chain residues then form a conserved hydrogen-bond network with the peptide backbone, and eleven of those bonds recur in HLA-A*02:01 complexes (Saper et al., 1991; Madden, 1995). Because they contact the backbone rather than the side chains, the same eleven are expected in any correctly loaded 9-mer whatever its sequence. That gives this stage a countable criterion and an internal positive control at the same time: a peptide placed too shallowly, shifted by one residue, or reversed in the groove would lose several of them.",
          ],
        },
        {
          type: "subheading",
          id: "04-choosing-what-to-build-3-2-experimental-workflow",
          index: "3.2",
          title: "Experimental workflow",
          level: 4,
        },
        {
          type: "prose",
          paragraphs: [
            "Each of the 17 candidates was submitted once to AlphaFold 3 (Abramson et al., 2024) together with the HLA-A*02:01 heavy chain, taken from Protein Data Bank entry 3UTQ, and β2-microglobulin. β2-microglobulin makes no contact with the peptide, and it was included because it supports the α1 and α2 platform that forms the groove. Structural templates were enabled. Each submission returned five sampled models, giving 85 in total, and all five were kept in every measurement.",
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "The first thing measured was whether AlphaFold’s own confidence could serve as the criterion. It could not, so a separate geometric criterion was built and confidence is reported alongside it as a record. A separate geometric criterion was therefore built, and confidence is reported alongside it as a record.",
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "A seven-step pipeline then produced the measurements, applied identically to all 85 models. Chain cleanup and renumbering came first, then hydrogen rebuilding and protonation-state assignment, then per-residue side-chain burial, then hydrogen-bond typing, then the eleven conserved bonds measured individually, then a geometric plausibility check, then aggregation across the five models.",
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "Dispersion across the five models decided which measurements were allowed to be criteria. At positions 2 and 9 the median between-model standard deviation of side-chain burial is 0.0 percentage points, with maxima of 0.1 and 0.6. At positions 5 and 6 the medians are 5.5 and 4.8 percentage points. The anchor positions are therefore used as acceptance criteria and the central segment is reported as observation.",
          ],
        },
        {
          type: "subheading",
          id: "04-choosing-what-to-build-3-3-protocols",
          index: "3.3",
          title: "Protocols",
          level: 4,
        },
        {
          type: "prose",
          paragraphs: [
            "1. In PyMOL, strip non-polymer atoms and alternate conformations, rename the chains A for heavy chain, B for β2-microglobulin and C for peptide, and renumber peptide residues 1 to 9. Leave coordinates untouched, so one set of selections applies to all 85 models.",
            "2. Rebuild hydrogens with PDB2PQR and assign protonation states with PROPKA at pH 7.4 under the AMBER force field, which fixes Asn and Gln amide orientations and histidine tautomers. Without this step a wrongly oriented amide can create an acceptor-to-acceptor contact that a distance-only method counts as a hydrogen bond.",
            "3. Compute the solvent-accessible surface area of every peptide side chain in the complex and in the free peptide, removing the heavy chain and β2-microglobulin with the peptide coordinates held fixed. The decrease on complex formation is the area buried on binding.",
            "4. Type every candidate atom pair before counting it. Require nitrogen, oxygen or sulfur heavy atoms within 3.6 Å, classify contacts shorter than 2.2 Å as clashes, treat backbone N as donor and backbone O as acceptor, assign side-chain roles by residue type and protonation state, count donor-to-acceptor pairs only, and record backbone and side-chain bonds separately.",
            "5. Measure the eleven conserved bonds as named atom pairs: three contacting the backbone near the N terminus at Tyr7, Tyr159 and Tyr171; two connecting Glu63 and Lys66 to position 2 in the B pocket; one connecting Tyr99 to position 3 at the groove floor; and five involving Trp147, Asp77, Tyr84, Thr143 and Lys146 near the F pocket. Record how many are present and which one is missing.",
            "6. Check each interface for heavy-atom contacts under 2.2 Å and for amide or histidine flip candidates left after preprocessing, and record both as warnings.",
            "7. Aggregate the five models into one row per peptide as a mean with its between-model dispersion, keep every per-model value, and draw conclusions only from findings that hold across all five.",
            "8. Accept a peptide on six criteria, each required in every model: side-chain burial at position 2 of at least 90%; side-chain burial at position 9 of at least 90%; at least 10 of the 11 conserved bonds; no sub-2.2 Å interface contact recurring in all models; an identical verdict across all five models; and a position-9 side-chain fill ratio of at least 60%, which is 84 Å² against a 140 Å² reference.",
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "The reference comes from the C-terminal anchor preference of HLA-A*02:01, which is valine and leucine with isoleucine and methionine tolerated (Falk et al., 1991), and from the 139.5 to 143.8 Å² that leucine and isoleucine occupy in this dataset.",
          ],
        },
        {
          type: "subheading",
          id: "04-choosing-what-to-build-3-4-results",
          index: "3.4",
          title: "Results",
          level: 4,
        },
        {
          type: "prose",
          paragraphs: [
            "Across the 85 models ipTM ran from 0.932 to 0.970, and its rank correlation with the position-9 fill ratio was +0.02. HILHVSFLA, one of the two peptides this stage rejects, has an ipTM of 0.960.",
          ],
        },
        {
          type: "figure",
          src: getMeasurementImage(
            "alphafold-3-confidence-scores-against-position-9-fill-ratio",
          ),
          width: 863,
          height: 563,
          alt: "AlphaFold 3 confidence scores against position-9 fill ratio",
          caption:
            "AlphaFold 3 confidence scores against position-9 fill ratio",
        },
        {
          type: "prose",
          paragraphs: [
            "Across 85 models and 935 bond determinations, 3 bonds were missing. No bond was absent from all five models of any candidate, and all three absences involved the same bond, between Lys146 and the C-terminal carboxylate, each in a single model of GVATLAWMV, GLHNFSDGL or FLAEASVRG. The conserved network is therefore complete at candidate level in all 17.",
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "The two-anchor pattern holds throughout. Burial at position 2 runs from 99.0% to 99.9% with a median of 99.8%, and at position 9 from 99.4% to 100.0% with a median of 100.0%. Positions 4 and 8 are more exposed, with median burial of 22.6% and 44.1%, and positions 5 and 6 vary most, from 17.8% to 95.3% and from 10.8% to 98.1%. Total TCR-facing surface runs from 147 Å² for WLKEGVLGL to 424 Å² for FQARLRLRV, close to threefold.",
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "Burial percentage at position 9 is saturated and cannot separate candidates. Three of them share a position-9 burial of 99.4%, and their absolute buried areas are 60.1, 143.8 and 173.3 Å².",
          ],
        },
        {
          type: "table",
          caption: "Table 3. Position-9 fill volume by anchor residue type.",
          headers: [
            "Position-9 residue",
            "Systems",
            "Burial (%)",
            "Absolute buried area (Å²)",
            "Fill ratio (%)",
          ],
          rows: [
            ["Gly", "1", "undefined", "0.0", "0.0"],
            ["Ala", "1", "99.4", "60.1 ± 0.4", "42.9"],
            ["Val", "7", "100.0", "113.3 – 115.1", "80.9 – 82.2"],
            ["Leu / Ile", "7", "99.7 – 100.0", "139.5 – 143.8", "99.7 – 102.7"],
            ["Phe", "1", "99.4", "173.3 ± 0.5", "123.8"],
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "The burial column is flat across every residue that has a side chain. The fill-ratio column separates them by size, which is the quantity the F pocket responds to.",
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "Of the 85 models, 69 were classified as passing, 11 carried a warning, with 9 holding an amide or histidine flip candidate and 2 an interface contact shorter than 2.2 Å, and 5 failed. All five failing models belong to one peptide, FLAEASVRG, whose position-9 glycine has no side chain to bury.",
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "Fifteen of the 17 candidates passed all six criteria. FLAEASVRG fills 0% of the reference volume, and HILHVSFLA, with alanine at position 9, fills 42.9% against the 60% bound.",
          ],
        },
        {
          type: "feature",
          key: "measurement-structural-validation",
        },
        {
          type: "subheading",
          id: "04-choosing-what-to-build-3-5-discussion",
          index: "3.5",
          title: "Discussion",
          level: 4,
        },
        {
          type: "prose",
          paragraphs: [
            "The fill ratio exists because of one specific blind spot in the percentage it sits beside. A burial fraction is normalised by the side chain's own surface area, so it reports that the pocket is closed around whatever is in it. How much of the pocket is occupied is a different quantity, and the three candidates sharing 99.4% burial at 60.1, 143.8 and 173.3 Å² are the clearest demonstration available in this dataset. Both rejected peptides would have passed on burial percentage alone. The absolute area is already produced by the same calculation, so recording it costs nothing.",
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "The 60% bound was placed inside a measured gap. Alanine candidates reach fill ratios up to 43.3% across the five models, and the lowest passing candidate sits at 80.4%. Any cutoff between 44% and 80% classifies all 17 systems identically, so the exact value of the threshold does not carry the result. That is the form of justification a threshold can actually be given here, and it is worth more than a round number defended on principle. The biochemical reason the F pocket matters at all is that the C-terminal anchor governs complex stability, and complex stability predicts immunogenicity better than affinity does (Bouvier and Wiley, 1994; Harndahl et al., 2012; Abualrous et al., 2015).",
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "The five-model requirement does what replicate wells do in a wet-lab assay, and the dispersion it reveals is what made the criteria selectable. Anchor burial is reproducible to 0.0 percentage points at the median, so it can carry a threshold. Central-segment burial varies by several percentage points between models of the same peptide, so those values are reported as observations. Treating disagreement between models as a failure rather than a majority vote means a borderline peptide does not reach the wet lab on the strength of one favourable sample.",
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "Measuring AlphaFold's own confidence first, and finding that it separates nothing, is the part of this stage that most changed what it looks like. An ipTM range of 0.932 to 0.970 with a rank correlation of +0.02 against fill ratio says that a high-confidence model is available for a peptide that cannot seat its anchor. Confidence is an internal-consistency statement about a prediction, and this tier needed a statement about geometry.",
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "What this stage establishes is loading geometry under an assumption. AlphaFold will place known non-binders in the groove and return plausible-looking conformations (Motmaen et al., 2023), so the reading is conditional: given that a peptide binds, is its loading geometry plausible? Binding itself is addressed by the sequence-based prediction of the previous block and by ELISpot. The three criteria are pass-or-fail gates, so Table 2 counts peptides at each stage and the structural numbers rank nothing. The 35-fold span of predicted IC₅₀ across the passing set, and the nearly threefold span of TCR-facing surface, are recorded for that reason: these fifteen peptides differ from one another, and what distinguishes them lies outside this stage. The 5.8-fold ELISpot spread the wet lab later found was not predictable from any number here.",
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "Two further limits are worth stating. HLA-A*02:01 complexes with 9-mer peptides are common in structural databases and AlphaFold 3 is likely to have met this class in training, which may contribute to the reliability of the geometry and also means high confidence says nothing about novelty. And the two rejected peptides were never synthesised, so the claim that a peptide failing the fill criterion would not have worked has no experimental support in either direction.",
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "Reproduction is supported by the archive rather than by this description. It holds the AlphaFold 3 job requests, the returned ModelCIF and confidence files for all 85 models, the cleaned and preprocessed structures, the per-model and per-system result tables, and the data and scripts behind the figures in this block.",
          ],
        },
      ],
    },
    {
      id: "05-releasing-the-material",
      index: "05",
      kicker: "",
      title: "Releasing the material",
      summary: "",
      blocks: [
        {
          type: "prose",
          paragraphs: [
            "The wet-lab workflow starts with commercially synthesised plasmids and the supplier's sequencing reports. In Round 1, the supplied plasmids were linearised and purified for in vitro transcription; no agarose gel electrophoresis was performed. In Round 2, target-region PCR and agarose gel electrophoresis checked aliquots of the supplied plasmids, while the transcription templates were prepared separately by plasmid linearisation and purification. After transcription, circularisation and RNase R treatment, RT-qPCR estimated the circular fraction in one representative preparation from each round. BSJ Sanger sequencing was performed on the Combined vaccine. RT-PCR was also performed to assess TROP2 transcripts in the engineered target line, without agarose gel electrophoresis. Gel densitometry was used separately for the Combined circRNA stability comparison.",
          ],
        },
        {
          type: "subheading",
          id: "05-releasing-the-material-1-restriction-digestion-and-sanger-sequencing-a-method-to-verify-construct-identity",
          index: "1",
          title:
            "Plasmid target-region PCR and agarose gel electrophoresis: A method to check the supplied constructs",
          level: 3,
        },
        {
          type: "subheading",
          id: "05-releasing-the-material-1-1-introduction",
          index: "1.1",
          title: "Introduction",
          level: 4,
        },
        {
          type: "prose",
          paragraphs: [
            "The vaccine plasmids were ordered from a commercial gene-synthesis supplier, with their sequence identity documented in the supplier's sequencing reports. Target-region PCR and agarose gel electrophoresis were performed in Round 2. An aliquot of a Round 2 plasmid was used for PCR, and the amplified product was checked against the expected amplicon size defined by the primer positions. No agarose gel electrophoresis was performed in Round 1.",
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "The PCR product was used only for verification. The DNA template for T7 in vitro transcription was prepared separately by restriction linearisation and purification of the supplied plasmid.",
          ],
        },
        {
          type: "subheading",
          id: "05-releasing-the-material-1-2-experimental-workflow",
          index: "1.2",
          title: "Experimental workflow",
          level: 4,
        },
        {
          type: "prose",
          paragraphs: [
            "Round 2 comprised five preparations: empty vector, TROP2-CTL1, TROP2-CTL2, TROP2-CTL1+2 and Combined. Target regions were amplified from plasmid aliquots and the PCR products were run alongside a DNA ladder. The band position was compared with the expected amplicon size for the corresponding construct.",
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "A separate plasmid aliquot was linearised downstream of the transcription cassette and purified for T7 in vitro transcription. The RNA precursor was then purified, circularised and treated with RNase R before circularity was assessed. For the Combined vaccine, a BSJ-spanning RT-PCR product was also submitted for Sanger sequencing.",
          ],
        },
        {
          type: "subheading",
          id: "05-releasing-the-material-1-3-protocols",
          index: "1.3",
          title: "Protocols",
          level: 4,
        },
        {
          type: "prose",
          paragraphs: [
            "1. Thaw an aliquot of the supplied plasmid on ice and mix gently. Retain the design file and supplier's sequencing report for the construct.",
            "2. Amplify the intended plasmid region with target-region primers. Use the primer positions to determine the expected amplicon length for each construct.",
            "3. Analyse the PCR product on a 1% agarose gel alongside a DNA ladder and compare the band position with the expected amplicon size. Keep this product for verification only.",
            "4. Prepare the transcription template from a separate plasmid aliquot by restriction digestion downstream of the transcription cassette, then purify the linearised DNA to remove enzyme and salts. The PCR product from step 2 is not the IVT template.",
            "5. Carry the purified linearised plasmid into the T7 transcription and RNA preparation workflow described in the following section.",
          ],
        },
        {
          type: "subheading",
          id: "05-releasing-the-material-1-4-results",
          index: "1.4",
          title: "Results",
          level: 4,
        },
        {
          type: "prose",
          paragraphs: [
            "The displayed panel contains four PCR-product lanes labelled TROP2-CTL1, TROP2-CTL2, TROP2-CTL1+2 and Combined. Each lane contains a prominent signal, with broad bright bands and vertical trailing that limit precise size assignment. The bands should be compared with the expected amplicon lengths defined by the primer positions. The full plasmid length is not the expected band size in this assay.",
          ],
        },
        {
          type: "figure",
          className: "measurement-figure--compact measurement-figure--fig06",
          src: getMeasurementImage(
            "agarose-gel-verification-of-the-four-epitope-encoding-linearised-transcription-templates",
          ),
          width: 1004,
          height: 741,
          alt: "Round 2 agarose gel of PCR products amplified from the plasmid target regions",
          caption:
            "Round 2 agarose gel of PCR products amplified from the plasmid target regions",
        },
        {
          type: "subheading",
          id: "05-releasing-the-material-1-5-discussion",
          index: "1.5",
          title: "Discussion",
          level: 4,
        },
        {
          type: "prose",
          paragraphs: [
            "A band at the expected size is consistent with amplification of the intended plasmid region. The target-region PCR gel and the separately prepared IVT template answer different questions.Expected amplicon sizes should be reported with the primer sequences and lane assignments so that the band positions can be assessed. RNA circularity is measured separately after preparation, using RT-qPCR and, for Combined, BSJ amplicon sequencing.",
          ],
        },
        {
          type: "subheading",
          id: "05-releasing-the-material-2-divergent-convergent-rt-qpcr-a-method-to-quantify-circrna-circularity",
          index: "2",
          title:
            "RT-qPCR: estimating the circular fraction after RNase R treatment",
          level: 3,
        },
        {
          type: "subheading",
          id: "05-releasing-the-material-2-1-introduction",
          index: "2.1",
          title: "Introduction",
          level: 4,
        },
        {
          type: "prose",
          paragraphs: [
            "The RNA preparation was assessed after circularisation and RNase R treatment, because this is the material used in the downstream experiments (Gong et al., 2025). Covalently closed RNA can resist exonuclease degradation and persist longer than linear transcripts (Enuka et al., 2016). We report the estimated circular fraction of the treated preparation.",
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "Several measurements contribute different evidence. RNase R resistance alone does not establish circularity because some structured linear RNAs also survive digestion (Xiao and Wilusz, 2019). Native-gel migration is affected by RNA topology (Abe et al., 2022), so band position alone cannot identify a circle. Junction-targeted RT-PCR has been used to identify circular transcripts (Jeck et al., 2013). In this project, two named RT-qPCR channels estimated the circular fraction, and Sanger sequencing of the Combined BSJ-spanning RT-PCR product checked the junction sequence. No agarose gel electrophoresis was performed in Round 1.",
          ],
        },
        {
          type: "subheading",
          id: "05-releasing-the-material-2-2-experimental-workflow",
          index: "2.2",
          title: "Experimental workflow",
          level: 4,
        },
        {
          type: "prose",
          paragraphs: [
            "Both channels measure cDNA prepared from the same RNase R-treated preparation. The circular channel, denoted C, uses SJ3910F + SJ3909R. The residual-linear channel, denoted L, uses SJ3911F + SJ3909R. The latter detects the assayed precursor-associated interval. These assay names are used throughout this page.",
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "For target quantities on a common scale, the estimated circular fraction is",
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "$F_i(\\%)=100\\times\\frac{Q_{C,i}}{Q_{C,i}+Q_{L,i}}.$",
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "Both rounds use the target Cq values without GFP normalisation. Under the base-2 model,",
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "$\\Delta Cq_i=Cq_{L,i}-Cq_{C,i},\\qquad F_i(\\%)=\\frac{100}{1+2^{-\\Delta Cq_i}}.$",
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "The calculation assumes doubling per cycle and comparable quantitative response between the circular and residual-linear assays, including reverse transcription.",
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "Calculate each fraction from its recorded Cq comparison before calculating the arithmetic mean and sample SD (n − 1). Keep the three input volumes separate. The denominator describes the treated preparation at the time of measurement. The amount of precursor initially placed into the circularisation reaction was not measured by this comparison.",
          ],
        },
        {
          type: "heading",
          level: 5,
          title: "RT-qPCR for the estimated circular fraction",
        },
        {
          type: "prose",
          paragraphs: [
            "The assay was applied to TROP2-CTL1 as the representative Round 1 preparation and to the Combined vaccine preparation in Round 2. For Round 1, each target channel was measured at cDNA inputs of 2, 4 and 6 µL, with three technical wells per input, giving 18 target-assay wells in total. The later measurement used 4 µL, with three technical wells per target channel. GFP reference measurements were also recorded and are retained separately.",
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "The three-volume comparison was used to select the input for the later assay. The same RNA preparation gave an estimated circular fraction of 92.85 ± 0.08% at 2 µL, compared with 96.96 ± 0.70% at 4 µL and 96.25 ± 1.14% at 6 µL. Changing the cDNA input should not change the composition of the preparation, so this separation raised concern about input-dependent quantification at 2 µL. We therefore excluded the 2 µL condition from subsequent measurements. Increasing the input from 4 to 6 µL changed the estimate by only 0.71 percentage points and did not reduce the observed technical SD (0.70 and 1.14 percentage points, respectively). A 4 µL input was therefore considered sufficient for subsequent comparisons and adopted as the standard input. All three Round 1 inputs are reported. This is an empirical input choice, without a validated quantitative range. The project used an estimated circular-fraction criterion of at least 90% for the measured representative preparations. No-template controls should be retained with each run, and their results should be reported separately from the target Cq values.",
          ],
        },
        {
          type: "heading",
          level: 5,
          title: "RT-PCR assessment of TROP2 transcripts",
        },
        {
          type: "prose",
          paragraphs: [
            "Wild-type and transduced 4T1 cells were processed in parallel through RNA extraction, DNase I treatment, reverse transcription and TROP2 PCR amplification. The three recorded values per group came from three RNA extractions from the same cell sample. These were extraction replicates from one biological source per group. No agarose gel electrophoresis was performed for this transcript readout.",
          ],
        },
        {
          type: "figure",
          src: getMeasurementImage("workflow-of-the-circularity-release-assay"),
          width: 1280,
          height: 896,
          alt: "Workflow for estimating the circular fraction after RNase R treatment",
          caption:
            "Workflow for estimating the circular fraction after RNase R treatment",
        },
        {
          type: "subheading",
          id: "05-releasing-the-material-2-3-protocols",
          index: "2.3",
          title: "Protocols",
          level: 4,
        },
        {
          type: "heading",
          level: 5,
          title: "RT-qPCR for the estimated circular fraction",
        },
        {
          type: "prose",
          paragraphs: [
            "1. Start with the commercially synthesised plasmid. In Round 1, linearise the supplied plasmid with NotI-HF and purify the template; no agarose gel electrophoresis was performed. In Round 2, target-region PCR and agarose gel electrophoresis check an aliquot of the supplied plasmid. Prepare the IVT template separately by plasmid linearisation and purification, as described in Experiments Section 3.1.",
            "2. Transcribe the purified linearised plasmid with T7 RNA polymerase, remove the DNA template with RNase-free DNase I, and purify the precursor RNA using the round-specific procedure in Experiments Sections 1.1 and 3.1.",
            "3. Circularise the precursor in the Mg²⁺-containing reaction at 55 °C for 10 to 15 min.",
            "4. Treat the reaction product with RNase R at 2 U per 2.0 µg RNA in a 20 µL reaction at 37 °C for 15 min, then prepare cDNA from the treated material.",
            "5. Run the circular channel with SJ3910F + SJ3909R and the residual-linear channel with SJ3911F + SJ3909R. Use 2, 4 and 6 µL cDNA for the Round 1 input comparison, with three technical wells per input and assay. For the Combined preparation, use 4 µL with three technical wells per assay. Cycling is 95 °C for 3 min, followed by 40 cycles of 95 °C for 10 s and 60 °C for 30 s. Include no-template controls.",
            "6. Calculate each estimated circular fraction using the target-Cq equation above, then report mean ± SD across the three technical comparisons. Retain the raw Cq values and input-volume labels.",
            "7. For the Combined vaccine, submit a BSJ-spanning RT-PCR amplicon for Sanger sequencing and compare the trace with the expected junction. This sequence check is separate from the circular-fraction calculation.",
          ],
        },
        {
          type: "heading",
          level: 5,
          title: "RT-PCR assessment of TROP2 transcripts",
        },
        {
          type: "prose",
          paragraphs: [
            "The recorded workflow comprised RNA extraction, DNase I treatment, reverse transcription and TROP2 PCR amplification, as described in Experiments Section 6.3, steps 1 to 6. Three RNA extractions were performed on the same cell sample in each group. Summarise the resulting relative-expression values as mean ± SD across extraction replicates, with one biological sample per group. This comparison is descriptive. No agarose gel electrophoresis or band densitometry was performed for this readout. Record the signal readout, reference gene and normalisation calculation alongside the data.",
          ],
        },
        {
          type: "subheading",
          id: "05-releasing-the-material-2-4-results",
          index: "2.4",
          title: "Results",
          level: 4,
        },
        {
          type: "table",
          caption:
            "Table 4. Estimated circular fraction of RNase R-treated TROP2-CTL1 at three cDNA inputs.",
          headers: ["cDNA input", "Estimated circular fraction, mean ± SD"],
          rows: [
            ["2 µL", "92.85 ± 0.08%"],
            ["4 µL", "96.96 ± 0.70%"],
            ["6 µL", "96.25 ± 1.14%"],
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "Each input was measured in three technical wells per target channel. Fractions were calculated from the corresponding Cq records before averaging, with unrounded intermediate values. All three estimates exceeded the project's stated 90% criterion under the working model.",
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "The discrepancy at 2 µL raised concern about input-dependent quantification, so this condition was not carried forward. We adopted 4 µL for subsequent measurements because increasing the input to 6 µL produced little change in the estimate and did not reduce technical variability. The 2 µL measurements remain in the reported input series. This choice standardises the input for Round 2; it does not define a validated quantitative range.",
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "The mean circular-channel Cq decreased from 8.22 at 2 µL to 5.44 at 4 µL, a change of 2.77 cycles rather than the one-cycle change expected for ideal doubling. The input series therefore documents a departure from the ideal response, without identifying its cause or proving that 2 µL is outside a validated range.",
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "For the Combined preparation at 4 µL, the estimated circular fraction was 99.30 ± 0.17% across three technical comparisons. The target Cq differences were 6.93, 7.00 and 7.63 cycles, giving individual fractions of 99.1866%, 99.2248% and 99.4977%. The mean and SD were calculated from these individual fractions before rounding.",
          ],
        },
        {
          type: "figure",
          src: getMeasurementImage(
            "sanger-trace-across-the-back-splice-junction-bsj-of-the-combined-vaccine",
          ),
          alt: "Sanger trace of the BSJ-spanning RT-PCR product from the Combined vaccine",
          caption:
            "Sanger trace of the BSJ-spanning RT-PCR product from the Combined vaccine",
          width: 1280,
          height: 586,
        },
        {
          type: "prose",
          paragraphs: [
            "Sanger sequencing of the BSJ-spanning RT-PCR product from the Combined preparation recovered the BSJ sequence `CTCAGTAGATGTTTTCTTGGGT | CTACCGTTTAATATTGCGTCATAT`. The sequence joins the expected downstream and upstream boundaries of the circularised RNA, with single well-separated peaks on both sides and no overlapping signal at the junction.",
          ],
        },
        {
          type: "heading",
          level: 5,
          title: "TROP2 transcript assessment in 4T1 cells",
        },
        {
          type: "figure",
          src: getMeasurementImage(
            "rt-pcr-quantification-of-trop2-mrna-in-4t1-cells",
          ),
          alt: "Relative TROP2 expression in wild-type and transduced 4T1 cells. Values are mean ± SD across three RNA-extraction replicates from one cell sample per group (biological n = 1 per group). The result is reported descriptively.",
          caption:
            "Relative TROP2 expression in wild-type and transduced 4T1 cells. Values are mean ± SD across three RNA-extraction replicates from one cell sample per group (biological n = 1 per group). The result is reported descriptively.",
          width: 1518,
          height: 916,
        },
        {
          type: "prose",
          paragraphs: [
            "The recorded relative-expression values were 72.40, 78.90 and 76.20 for the transduced line, with all three control entries set to 1. The transduced values have a mean of 75.83 ± 3.27 (mean ± SD across three extraction replicates). The replicates came from the same cell sample and describe variation within that sampled material.",
          ],
        },
        {
          type: "subheading",
          id: "05-releasing-the-material-2-5-discussion",
          index: "2.5",
          title: "Discussion",
          level: 4,
        },
        {
          type: "prose",
          paragraphs: [
            "The estimated circular fractions were 96.96 ± 0.70% for the Round 1 representative and 99.30 ± 0.17% for the Combined preparation, both measured at 4 µL and calculated from target Cq values. Each SD describes technical variation within one preparation. These records do not establish a general improvement between rounds or an individual circular-fraction value for every construct.",
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "The residual-linear assay detects a defined precursor-associated interval. Linear fragments or other RNA species without that interval are outside its measurement. Together with the uncalibrated cross-assay response and possible reverse-transcription effects, this limits the result to an estimated fraction for the assayed target classes. RNase R resistance alone cannot establish absolute purity (Xiao and Wilusz, 2019). The Combined BSJ Sanger result provides a separate check of junction sequence.",
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "The three TROP2 relative-expression values reproduce the reported mean and SD. They came from separate RNA extractions from the same cell sample, so their SD describes variation across extraction replicates rather than variability between independent cell preparations. The available record identifies the assay as RT-PCR but does not specify the signal readout or the relative-expression calculation. These details need to be documented before the numerical fold values can be independently reproduced. Surface TROP2 was assessed separately by flow cytometry.",
          ],
        },
        {
          type: "subheading",
          id: "05-releasing-the-material-3-gel-densitometry-a-method-to-quantify-relative-band-intensity",
          index: "3",
          title:
            "Gel densitometry: A method to compare circRNA and linear RNA persistence",
          level: 3,
        },
        {
          type: "subheading",
          id: "05-releasing-the-material-3-1-introduction",
          index: "3.1",
          title: "Introduction",
          level: 4,
        },
        {
          type: "prose",
          paragraphs: [
            "The stability experiment compared how much circRNA and linear precursor RNA remained after incubation at 37 °C. Densitometry converts the intensity of each RNA band into a relative signal, with each RNA's own 0 h lane as its baseline. The comparison depends on the RNA identity established by the circularity measurements.",
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "Band intensity is reliable only within the detector's working range. Saturation compresses differences between bright bands, while integration becomes uncertain as a band approaches background.",
          ],
        },
        {
          type: "subheading",
          id: "05-releasing-the-material-3-2-experimental-workflow",
          index: "3.2",
          title: "Experimental workflow",
          level: 4,
        },
        {
          type: "prose",
          paragraphs: [
            "Equal masses of purified Combined circRNA and its linear precursor were incubated in parallel at 37 °C and sampled at 0, 24, 48 and 72 h. Both RNAs were run side by side under the same electrophoresis and imaging conditions. Each time point was represented by one lane, without biological replication. The readout is the relative amount remaining at each time point.",
          ],
        },
        {
          type: "subheading",
          id: "05-releasing-the-material-3-3-protocols",
          index: "3.3",
          title: "Protocols",
          level: 4,
        },
        {
          type: "prose",
          paragraphs: [
            "1. Normalise the purified circRNA and linear precursor to the same mass concentration and aliquot equal amounts into parallel tubes for each time point.",
            "2. Incubate at 37 °C and collect the corresponding tubes at 0, 24, 48 and 72 h. Freeze each sample immediately at −80 °C until all time points are collected.",
            "3. Thaw the samples together and run equal volumes on a 1% agarose gel at 100 V alongside a marker. Image all lanes under the same settings, within the detector's linear range.",
            "4. Integrate band intensities in ImageJ, normalise to the reference lane on the same panel, and express each RNA's signal relative to its own 0 h lane, set to 1.0.",
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "Report the relative residual amount. A half-life or decay constant requires a time course with replicated points sufficient to fit and assess a decay model.",
          ],
        },
        {
          type: "subheading",
          id: "05-releasing-the-material-3-4-results",
          index: "3.4",
          title: "Results",
          level: 4,
        },
        {
          type: "table",
          caption: "Table 5. Fraction of each RNA remaining at 37 °C.",
          headers: ["Time", "circRNA remaining", "Linear RNA remaining"],
          rows: [
            ["0 h", "1.000", "1.000"],
            ["24 h", "0.719", "0.059"],
            ["48 h", "0.616", "0.091"],
            ["72 h", "0.395", "0.027"],
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "Values are densitometric integrations normalised to the ladder lane, one lane per timepoint. The difference is established within the first 24 h, where the linear RNA has lost 94.1% and the circRNA retains 71.9%.",
          ],
        },
        {
          type: "figure",
          src: getMeasurementImage(
            "in-vitro-stability-of-circrna-versus-linear-precursor-rna-at-37-c-gel",
          ),
          width: 1280,
          height: 440,
          alt: "Stability of circRNA and its linear precursor at 37 °C",
          caption: "Stability of circRNA and its linear precursor at 37 °C",
        },
        {
          type: "subheading",
          id: "05-releasing-the-material-3-5-discussion",
          index: "3.5",
          title: "Discussion",
          level: 4,
        },
        {
          type: "prose",
          paragraphs: [
            "Three boundaries apply to the stability data. We report the fraction remaining and no kinetic parameter, because four single-lane points cannot support fitting a decay model, and turning 39.5% at 72 h into a half-life would be an extrapolation the data do not carry. The linear value at 48 h exceeds that at 24 h, which real degradation cannot do; the band is near background there, where integration error is amplified, so the linear values after 24 h should be read as at or below the detection limit. We report the raw integrations without smoothing or exclusion. And circular RNA migrates anomalously in native gels, usually slower than linear RNA of the same length (Abe et al., 2022), so band position in this experiment cannot establish circularity. For the Combined material used here, the circularity assessment combines the RT-qPCR estimate with Sanger sequencing of the BSJ-spanning RT-PCR product.",
          ],
        },
      ],
    },
    {
      id: "06-fixing-the-quantities-every-readout-shares",
      index: "06",
      kicker: "",
      title: "Fixing the quantities every readout shares",
      summary: "",
      blocks: [
        {
          type: "prose",
          paragraphs: [
            "Two numbers are reused by almost everything that follows: the number of cells a per-cell figure is divided by, and the highest carrier dose a cell can take before the carrier itself does the damage. Both are measured once, here. An error in either moves every downstream readout in the same direction, which is why they are settled before those readouts rather than alongside them.",
          ],
        },
        {
          type: "subheading",
          id: "06-fixing-the-quantities-every-readout-shares-1-cell-preparation-and-counting-a-method-to-fix-the-denominator-of-every-per-cell-readout",
          index: "1",
          title:
            "Cell preparation and counting: A method to fix the denominator of every per-cell readout",
          level: 3,
        },
        {
          type: "subheading",
          id: "06-fixing-the-quantities-every-readout-shares-1-1-introduction",
          index: "1.1",
          title: "Introduction",
          level: 4,
        },
        {
          type: "prose",
          paragraphs: [
            "Most of the numbers on this page are ratios whose denominator is a number of cells. Spot-forming cells are reported per 1×10⁵ cells. Every killing percentage comes from a stated effector-to-target ratio. Every flow frequency is a fraction of a gated population. If the cell input differs between wells, those numbers stop being comparable, and nothing downstream can repair it.",
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "Cell preparation is therefore the project's first measurement. Two quantities are controlled: how many cells go into each well, and what fraction of them are alive and of the intended type.",
          ],
        },
        {
          type: "subheading",
          id: "06-fixing-the-quantities-every-readout-shares-1-2-experimental-workflow",
          index: "1.2",
          title: "Experimental workflow",
          level: 4,
        },
        {
          type: "prose",
          paragraphs: [
            "Starting material is a single commercial lot of human peripheral blood mononuclear cells, lot 059K048, collected by apheresis from one donor, HLA-A*02:01 typed by the supplier and shipped with a certificate of analysis. Using one donor for the whole project fixes the restriction element and removes inter-individual variation from every comparison between constructs.",
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "The certificate characterises the material we started from. Viability on receipt is 94% and the vial contains 1.55×10⁸ cells. Within leukocytes, CD45⁺ is 98.77%, CD3⁺ 57.78% and CD14⁺ 19.21%, with CD19⁺ at 9.16%, CD16⁺ at 7.72% and CD66B⁺ at 0.69%; within the CD3⁺ fraction, CD4⁺CD8⁻ is 68.81% and CD4⁻CD8⁺ 23.74%. The two populations this workflow selects are therefore present at known frequencies before selection begins, which is what makes the expected yield of each fraction predictable. The lot is also certified negative for bacterial, fungal and mycoplasma contamination and for TPPA, HTLV, B19, CMV, EBV, HCV, HBV and HIV.",
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "CD14⁺ monocytes are positively selected by magnetic beads and differentiated into immature monocyte-derived dendritic cells. The CD14-negative flow-through is retained and CD3⁺ T cells are positively selected from it, so that the dendritic cells and the T cells they will be co-cultured with come from the same donor. Autologous pairing lets a T-cell response be attributed to the presented epitope; across donors, an allogeneic mismatch would produce one on its own.",
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "Viability is confirmed above 90% before electroporation. That threshold protects the readouts that follow. Dead cells fluoresce non-specifically and would show up as false positives in every flow panel, and a preparation that has lost cells to electroporation no longer matches the count used to set up the well.",
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "Electroporation conditions are held identical across all groups in an experiment, at 5 µg circRNA into 1×10⁶ dendritic cells in 100 µL, so that electroporation stress forms a shared background across groups. Dendritic cells and T cells are then co-cultured at a fixed ratio of one to twenty, and ELISpot wells are seeded at 1×10⁵ cells per well, with the count verified at seeding.",
          ],
        },
        {
          type: "subheading",
          id: "06-fixing-the-quantities-every-readout-shares-1-3-protocols",
          index: "1.3",
          title: "Protocols",
          level: 4,
        },
        {
          type: "prose",
          paragraphs: [
            "1. Dilute PBMC with 1× PBS at pH 7.2 to 7.4 and layer slowly onto the separation medium, keeping the interface intact.",
            "2. Centrifuge at 2000 rpm for 15 min at room temperature with slow acceleration and deceleration, then aspirate the buffy layer, add 5 to 10 volumes of PBS and wash twice at 2200 rpm for 5 min.",
            "3. For CD14⁺ selection, resuspend in MACS buffer, count, and add 80 µL buffer with 5 µL CD14 MicroBeads per 10⁷ cells; incubate at 4 °C in the dark for 15 min.",
            "4. Pass through the magnetic column, collect the flow-through for T-cell selection, wash the column three times with 3 mL buffer, then remove from the magnet and flush out the bound monocytes.",
            "5. Differentiate in RPMI-1640 with 10% FBS, GM-CSF at 100 ng/mL and IL-4 at 50 ng/mL for 7 days at 37 °C and 5% CO₂, with a half-volume medium change and fresh cytokines every 3 days.",
            "6. For CD3⁺ selection, take the CD14-negative flow-through, add 80 µL buffer with 20 µL CD3 MicroBeads per 10⁷ cells, incubate at 2 to 8 °C for 15 min, and filter through a 30 µm pre-separation filter before loading the column.",
            "7. Count and confirm viability above 90%, then electroporate 5 µg circRNA into 1×10⁶ dendritic cells in 100 µL on the Nucleofector II using programme U-002, adding pre-warmed complete medium immediately afterwards and recovering for 24 h.",
            "8. Co-culture with autologous CD3⁺ T cells at one to twenty, with no exogenous IL-2 for short-term 24 h readouts and low-dose IL-2 at 20 to 50 IU/mL every 3 days for 7 to 10 day priming.",
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "Sort CD3⁺ cells from the flow-through after CD14 depletion. Sorting from whole PBMC lets monocytes carry over into the T-cell fraction. Adjust cytokines by stage: IL-4 is reduced or removed during antigen loading and maturation, and the co-culture stage no longer depends on either cytokine.",
          ],
        },
        {
          type: "figure",
          src: getMeasurementImage(
            "preparation-workflow-for-dendritic-cells-and-autologous-t-cells",
          ),
          width: 1280,
          height: 749,
          alt: "Preparation workflow for dendritic cells and autologous T cells",
          caption:
            "Preparation workflow for dendritic cells and autologous T cells",
        },
        {
          type: "subheading",
          id: "06-fixing-the-quantities-every-readout-shares-1-4-results",
          index: "1.4",
          title: "Results",
          level: 4,
        },
        {
          type: "prose",
          paragraphs: [
            "Every human experiment in this project ran on cells prepared this way from lot 059K048: one donor throughout, viability confirmed above 90% at electroporation, identical electroporation conditions across groups, a fixed one-to-twenty co-culture ratio, and a verified seeding count.",
          ],
        },
        {
          type: "subheading",
          id: "06-fixing-the-quantities-every-readout-shares-1-5-discussion",
          index: "1.5",
          title: "Discussion",
          level: 4,
        },
        {
          type: "prose",
          paragraphs: [
            "This method is verified at both ends without being measured in the middle. The input is documented by the supplier's certificate, which gives the viability and the frequency of each population before selection. The output is confirmed functionally: the selected monocytes differentiate into dendritic cells that upregulate CD80 and CD86 on stimulation, and the selected T cells respond to those dendritic cells in every downstream readout. A selection that had failed would show up at both of those steps.",
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "What the workflow does not produce is a purity figure for the two selected fractions, since no post-selection flow panel was run on them. The magnetic selection is used as specified by the manufacturer and its success is read from the behaviour of the cells rather than from a percentage. Adding that panel would turn an inference into a number, and it is listed in Future Work.",
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "One donor for the whole project is a deliberate design choice with a known cost. It removes inter-individual variation from every comparison between constructs, and it makes every frequency on this page specific to this donor.",
          ],
        },
        {
          type: "subheading",
          id: "06-fixing-the-quantities-every-readout-shares-2-cck-8-dose-response-a-method-to-bound-lnp-carrier-toxicity",
          index: "2",
          title: "CCK-8 dose–response: A method to bound LNP carrier toxicity",
          level: 3,
        },
        {
          type: "subheading",
          id: "06-fixing-the-quantities-every-readout-shares-2-1-introduction",
          index: "2.1",
          title: "Introduction",
          level: 4,
        },
        {
          type: "prose",
          paragraphs: [
            "circRNA needs a lipid nanoparticle to enter cells efficiently, and ionisable lipids are themselves cytotoxic above a threshold (Hou et al., 2021; Wang et al., 2024). The carrier therefore has to be bounded before any cargo is added, so that toxicity in a later experiment can be assigned to the vaccine with the vehicle already accounted for.",
          ],
        },
        {
          type: "subheading",
          id: "06-fixing-the-quantities-every-readout-shares-2-2-experimental-workflow",
          index: "2.2",
          title: "Experimental workflow",
          level: 4,
        },
        {
          type: "prose",
          paragraphs: [
            "Empty LNPs carrying no circRNA were applied to immature monocyte-derived dendritic cells at 0, 50, 100, 200 and 400 ng per well for 24 h, four replicate wells per dose. The 0 ng well is the 100% viability baseline and a cell-free well of medium plus reagent subtracts background absorbance. Because no well contained cargo, the measured quantity is the intrinsic toxicity of the lipid formulation. The dose axis is lipid mass.",
          ],
        },
        {
          type: "subheading",
          id: "06-fixing-the-quantities-every-readout-shares-2-3-protocols",
          index: "2.3",
          title: "Protocols",
          level: 4,
        },
        {
          type: "prose",
          paragraphs: [
            "1. Seed immature dendritic cells and allow them to settle.",
            "2. Apply empty LNP at each dose and incubate at 37 °C and 5% CO₂ for 24 h, with four wells per dose plus a cell-free blank.",
            "3. Add 10 µL CCK-8 reagent per well, avoiding bubbles, and mix by gentle rocking. Pop any bubbles before reading.",
            "4. Develop for the interval established in a pilot run for this cell type, then read absorbance.",
            "5. Subtract the blank and express each dose relative to the 0 ng baseline.",
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "CCK-8 development time has to be determined per cell type; over-incubation saturates the optical density and compresses between-group differences.",
          ],
        },
        {
          type: "subheading",
          id: "06-fixing-the-quantities-every-readout-shares-2-4-results",
          index: "2.4",
          title: "Results",
          level: 4,
        },
        {
          type: "prose",
          paragraphs: [
            "Relative viability is 1.000 ± 0.040 at baseline, 1.017 ± 0.037 at 50 ng, 1.063 ± 0.047 at 100 ng, 1.030 ± 0.016 at 200 ng and 0.572 ± 0.058 at 400 ng, with n = 4 wells per dose and F(4,15) = 95.3. None of the doses up to 200 ng differs from baseline, with Holm-corrected P values from 0.26 to 0.56, and 400 ng falls at P = 7.6 × 10⁻⁵.",
          ],
        },
        {
          type: "figure",
          className: "measurement-figure--compact measurement-figure--fig12",
          src: getMeasurementImage(
            "dose-viability-curve-of-empty-lnp-on-dcs-after-24-h",
          ),
          width: 1342,
          height: 852,
          alt: "Dose–viability relationship for empty LNP on dendritic cells",
          caption:
            "Dose–viability relationship for empty LNP on dendritic cells",
        },
        {
          type: "subheading",
          id: "06-fixing-the-quantities-every-readout-shares-2-5-discussion",
          index: "2.5",
          title: "Discussion",
          level: 4,
        },
        {
          type: "prose",
          paragraphs: [
            "The curve is a plateau followed by a cliff, the threshold behaviour characteristic of ionisable lipid cytotoxicity: the membrane tolerates the load below a critical concentration and decompensates rapidly above it. Doubling from 200 to 400 ng costs 44% of viability. We therefore set 200 ng per 10⁴ dendritic cells as the in vitro upper bound for the carrier and worked below it.",
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "Two scope statements belong with that number. Every well contained carrier only, so this bounds the vehicle. A loaded particle delivers an additional stimulus, because circRNA is itself sensed by cytosolic receptors (Chen et al., 2017) . And the dose unit here is nanograms of lipid per a defined number of cells, while the in vivo dose is micrograms of loaded circRNA per animal. The denominators are different in kind, and the two cannot be converted into one another.",
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "This is also a single cell type at a single timepoint, and CCK-8 reads metabolic activity, which tracks survival without being identical to it and does not distinguish apoptosis from necrosis.",
          ],
        },
      ],
    },
    {
      id: "07-reading-the-immune-response",
      index: "07",
      kicker: "",
      title: "Reading the immune response",
      summary: "",
      blocks: [
        {
          type: "prose",
          paragraphs: [
            "Released material and counted cells meet here. The order these four methods run in is the order the response itself runs in: translation of the antigen inside a dendritic cell, the frequency of T cells that answer it, what those T cells do to a tumour cell and to a normal one, and which link of the chain the effect sits on. Flow cytometry also carries the target-line validation that the animal study depends on.",
          ],
        },
        {
          type: "subheading",
          id: "07-reading-the-immune-response-1-anti-flag-western-blot-a-method-to-confirm-antigen-translation-inside-dendritic-cells",
          index: "1",
          title:
            "Anti-FLAG Western blot: A method to confirm antigen translation inside dendritic cells",
          level: 3,
        },
        {
          type: "subheading",
          id: "07-reading-the-immune-response-1-1-introduction",
          index: "1.1",
          title: "Introduction",
          level: 4,
        },
        {
          type: "prose",
          paragraphs: [
            "Every immunological readout downstream of electroporation assumes that the circRNA was translated. Until that is shown at the protein level, a positive ELISpot or killing result is equally compatible with the circRNA having been sensed and never translated, and a negative result cannot be told apart from a delivery failure. The construct carries a FLAG tag downstream of the epitope cassette for exactly this purpose, so a single blot answers the question directly.",
          ],
        },
        {
          type: "subheading",
          id: "07-reading-the-immune-response-1-2-experimental-workflow",
          index: "1.2",
          title: "Experimental workflow",
          level: 4,
        },
        {
          type: "prose",
          paragraphs: [
            "Dendritic cells electroporated with the Combined vaccine circRNA were lysed and probed with an anti-FLAG antibody, against the FLAG tag encoded downstream of the epitope cassette. Mock-electroporated dendritic cells provide the negative control, and β-actin at 42 kDa provides the loading control, so that a difference in band intensity between lanes can be separated from a difference in how much protein was loaded. The expected product runs at approximately 50 kDa.",
          ],
        },
        {
          type: "subheading",
          id: "07-reading-the-immune-response-1-3-protocols",
          index: "1.3",
          title: "Protocols",
          level: 4,
        },
        {
          type: "prose",
          paragraphs: [
            "1. Harvest electroporated and mock-electroporated dendritic cells after the recovery period and lyse in cold lysis buffer with protease inhibitors.",
            "2. Clear the lysate by centrifugation and quantify total protein, loading an equal mass per lane.",
            "3. Separate by SDS-PAGE and transfer to a PVDF membrane.",
            "4. Block, then probe with the anti-FLAG primary antibody, wash, and incubate with the HRP-conjugated secondary.",
            "5. Develop by ECL and image, keeping the exposure inside the linear range of the detector.",
            "6. Strip or re-probe for β-actin on the same membrane and image under the same settings.",
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "The full reagent list, gel percentage, transfer conditions and antibody dilutions are on our Experiments page.",
          ],
        },
        {
          type: "subheading",
          id: "07-reading-the-immune-response-1-4-results",
          index: "1.4",
          title: "Results",
          level: 4,
        },
        {
          type: "figure",
          src: getMeasurementImage(
            "western-blot-of-flag-tagged-fusion-protein-in-dcs",
          ),
          width: 1280,
          height: 622,
          alt: "Anti-FLAG Western blot of electroporated dendritic cells",
          caption: "Anti-FLAG Western blot of electroporated dendritic cells",
        },
        {
          type: "prose",
          paragraphs: [
            "The circRNA-electroporated lane carries a distinct band at approximately 50 kDa that is near-absent in the mock-electroporated control. β-actin at 42 kDa is comparable across lanes.",
          ],
        },
        {
          type: "subheading",
          id: "07-reading-the-immune-response-1-5-discussion",
          index: "1.5",
          title: "Discussion",
          level: 4,
        },
        {
          type: "prose",
          paragraphs: [
            "Comparable β-actin across lanes lets the FLAG-specific band be read as translation of the circRNA-encoded sequence; without it, the same band could reflect how much protein was loaded. This closes a link that every section downstream had until now been inferring from function.",
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "The boundary of this result is narrower than it first appears. The blot demonstrates that the antigen is synthesised inside the cell. It says nothing about processing and presentation on MHC-I at the cell surface, which is the step the T-cell readouts actually depend on. Presentation is supported here only indirectly, through the downstream ELISpot, activation and killing data. Direct evidence would require pMHC multimer staining or peptide elution followed by mass spectrometry, neither of which the project timeline allowed.",
          ],
        },
        {
          type: "subheading",
          id: "07-reading-the-immune-response-2-ifn-elispot-a-method-to-quantify-epitope-immunogenicity",
          index: "2",
          title: "IFN-γ ELISpot: A method to quantify epitope immunogenicity",
          level: 3,
        },
        {
          type: "subheading",
          id: "07-reading-the-immune-response-2-1-introduction",
          index: "2.1",
          title: "Introduction",
          level: 4,
        },
        {
          type: "prose",
          paragraphs: [
            "Thirteen constructs, built from the fifteen peptides the structural screen passed, entered the wet lab, and eight epitopes had to come out. The selection criterion has to be the frequency of antigen-specific IFN-γ-secreting T cells, because that is what a CTL vaccine is trying to raise. ELISpot measures it at single-cell resolution, which no bulk cytokine assay does.",
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "The quantity is spot-forming cells per 1×10⁵ cells, and the denominator carries the whole comparison. SFC can be compared between constructs only when the T-cell input is identical, and the counting step in the preparation method above is what secures that.",
          ],
        },
        {
          type: "subheading",
          id: "07-reading-the-immune-response-2-2-experimental-workflow",
          index: "2.2",
          title: "Experimental workflow",
          level: 4,
        },
        {
          type: "prose",
          paragraphs: [
            "This method served both selection rounds, and the control design differs between them. The two rounds together show what a screen gains when it carries a baseline and what it gives up when it does not.",
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "Round 1 screened all thirteen single-epitope constructs and ran with no controls of any kind. No empty-vector or antigen-free well was seeded and the kit's PHA positive well was not run. The round was a triage screen whose only job was to rank thirteen constructs against one another, and for ranking an internal comparison suffices when every construct shares backbone, adjuvant, electroporation and donor cells.",
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "Round 2 carries a strict vector control. The Blank group is dendritic cells electroporated with empty-vector circRNA, carrying the complete backbone and the 4×mC3dP28 adjuvant module but encoding no epitope, at identical cell number, volume and Nucleofector programme. That single control subtracts electroporation stress, innate sensing of the backbone through cytosolic receptors such as RIG-I and MDA5 (Chen et al. , 2017) , and the adjuvant's own activity together, so the increment above it can come only from the epitope-encoding sequence.",
          ],
        },
        {
          type: "subheading",
          id: "07-reading-the-immune-response-2-3-protocols",
          index: "2.3",
          title: "Protocols",
          level: 4,
        },
        {
          type: "prose",
          paragraphs: [
            "1. Equilibrate the pre-coated plate to room temperature, block, and discard the blocking solution.",
            "2. Add 200 µL RPMI-1640 per well, activate for 10 min at room temperature, then discard.",
            "3. Seed the dendritic cell and T cell co-culture at 1×10⁵ cells per 100 µL per well, together with the control wells defined for that round.",
            "4. Incubate at 37 °C and 5% CO₂ in the dark for 20 h without shaking, since agitation distorts spot morphology.",
            "5. Discard the cells and lyse with 200 µL cold deionised water per well at 4 °C for 10 min.",
            "6. Wash six times with 260 µL wash buffer per well, never letting the PVDF membrane dry between washes.",
            "7. Add 100 µL biotinylated detection antibody, 37 °C for 1 h, wash five times.",
            "8. Add 100 µL streptavidin-HRP, 37 °C for 1 h, wash and blot dry.",
            "9. Add 100 µL AEC substrate and develop in the dark for 5 to 15 min, stopping as soon as spots are clearly visible and never beyond 20 min. Stop by rinsing three to five times with deionised water, then unclip the plate bottom and rinse the back of the membrane.",
            "10. Air-dry and count round spots with a halo on the reader. Report SFC per 1×10⁵ cells and state whether the count is raw or background-subtracted.",
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "High background usually comes from insufficient washing or blocking. Plan the control wells before seeding; a round that reaches the reader without them cannot be repaired afterwards.",
          ],
        },
        {
          type: "subheading",
          id: "07-reading-the-immune-response-2-4-results",
          index: "2.4",
          title: "Results",
          level: 4,
        },
        {
          type: "figure",
          src: getMeasurementImage("round-1-elispot-wells-and-counts"),
          width: 1098,
          height: 1090,
          alt: "Round 1 ELISpot wells",
          caption: "Round 1 ELISpot wells",
        },
        {
          type: "prose",
          paragraphs: [
            "Round 1 counts across the thirteen constructs run from 47 to 271 SFC per 10⁵ cells, a 5.8-fold spread with a panel median of 78, reported raw with no background subtraction. The two leading epitopes both belong to TROP2, at 271 and 217, and every one of the four antigens contains both a stronger and a weaker epitope.",
          ],
        },
        {
          type: "figure",
          src: getMeasurementImage("round-2-elispot-wells-and-counts"),
          width: 1280,
          height: 351,
          alt: "Round 2 ELISpot wells",
          caption: "Round 2 ELISpot wells",
        },
        {
          type: "prose",
          paragraphs: [
            "Round 2 compares the Combined vaccine against the two strongest single epitopes of the whole Round 1 panel and against a dual-epitope construct, with every group read against the empty-vector Blank. The counts are 32 for Blank, 198 and 227 for the two single epitopes, 298 for the dual construct and 367 for the Combined vaccine. Each group is a single well.",
          ],
        },
        {
          type: "subheading",
          id: "07-reading-the-immune-response-2-5-discussion",
          index: "2.5",
          title: "Discussion",
          level: 4,
        },
        {
          type: "prose",
          paragraphs: [
            "The Round 1 spread is what justified running the screen at all. All thirteen sequences had already cleared the in silico filter, and nothing in the prediction scores separated the construct returning 47 SFC from the one returning 271. Because every antigen contained both a strong and a weak epitope, selection had to be made epitope by epitope; picking the best antigen and taking its whole repertoire would have carried weak sequences into the vaccine.",
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "The cost of running Round 1 without controls is specific. The counts support the ordering and the relative magnitudes. They do not support a floor: we cannot say 47 SFC is no response, only that it is the bottom of the range. No value from that round is cited anywhere in the project as an antigen-specific T-cell frequency, and every quantitative attribution comes from Round 2 or later.",
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "The Round 2 series is monotonic, and the dual construct at 298 exceeds the arithmetic mean of its two components at 212.5. Two limits apply to reading it. Each group is one well, so these are single determinations with no error bar and no test. Stimulation was polyclonal co-culture, not peptide re-stimulation, so between-group differences can be attributed to the presence or absence of epitopes while SFC cannot be resolved down to any individual epitope. Replicate wells should be added in any repeat.",
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "What the Round 2 comparison holds fixed is also worth stating. The linkers and the cleavage-guided ordering of the epitopes were taken from the literature and appear in every construct compared here.",
          ],
        },
        {
          type: "subheading",
          id: "07-reading-the-immune-response-3-calcein-am-release-a-method-to-quantify-specific-killing-and-off-target-safety",
          index: "3",
          title:
            "Calcein-AM release: A method to quantify specific killing and off-target safety",
          level: 3,
        },
        {
          type: "subheading",
          id: "07-reading-the-immune-response-3-1-introduction",
          index: "3.1",
          title: "Introduction",
          level: 4,
        },
        {
          type: "prose",
          paragraphs: [
            "A vaccine claim ends in killing, and the same assay has to answer two opposite questions: whether primed T cells kill tumour cells, and whether they spare normal ones. Calcein-AM release suits both. The assay carries a third job as well: its K562 arm tests whether each effector preparation was functional at all, which is the condition under which a low ELISpot count can be attributed to the epitope. The dye enters live cells, is hydrolysed by esterases into a charged fluorescent form that is retained intracellularly, and escapes into the supernatant when the target lyses, so supernatant fluorescence tracks lysis.",
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "Its advantage for this project is that both ends of the scale are measured on the same plate, so no step of the calculation rests on an assumed zero.",
          ],
        },
        {
          type: "subheading",
          id: "07-reading-the-immune-response-3-2-experimental-workflow",
          index: "3.2",
          title: "Experimental workflow",
          level: 4,
        },
        {
          type: "prose",
          paragraphs: [
            "Specific lysis is computed as experimental fluorescence minus spontaneous, divided by maximum minus spontaneous. Spontaneous wells carry target plus medium and maximum wells carry target plus 4.2% Triton X-100, both seeded in triplicate on the same plate as the experimental wells.",
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "The assay was used three times with different targets, and each use turns on that choice of target.",
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "K562 in Round 1 is MHC-I negative and carries none of the four target antigens, so it reports overall non-antigen-restricted killing capacity (Tremblay-McLean et al., 2019). All thirteen constructs were assayed in parallel at an effector-to-target ratio of 80 to 1, three wells each, as a single functional gate.",
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "MDA-MB-231 in Round 2 is HLA-A*02:01 positive and TROP2 positive, carrying both the correct restriction element and the target antigen. Five groups were assayed at three effector-to-target ratios, 20 to 1, 40 to 1 and 80 to 1, three wells per condition, so that dose dependence could be examined.",
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "The off-target panel assayed Combined-primed T cells against four normal human lines of different tissue origin at 80 to 1 and 100 to 1, with MDA-MB-231 as the positive-control target. All four normal lines were confirmed HLA-A02:01 positive beforehand, which is the design feature that makes the result interpretable: had they not been, low killing might only have meant the cells were invisible to HLA-A*02:01 restricted CTLs.",
          ],
        },
        {
          type: "subheading",
          id: "07-reading-the-immune-response-3-3-protocols",
          index: "3.3",
          title: "Protocols",
          level: 4,
        },
        {
          type: "prose",
          paragraphs: [
            "1. Harvest targets, wash once in PBS and adjust to 1×10⁶/mL. Detach adherent lines briefly, under 3 min, with 0.05% trypsin-EDTA or a gentle dissociation buffer, and confirm viability before labelling.",
            "2. Add Calcein-AM to 1 µM and incubate at 37 °C in the dark for 20 to 30 min.",
            "3. Wash twice with PBS to remove unincorporated dye.",
            "4. Plate in a 96-well plate: spontaneous wells with 100 µL target plus 100 µL medium, maximum wells with 100 µL target plus 90 µL medium and 10 µL 4.2% Triton, experimental wells with 100 µL target plus 100 µL effector, three wells each.",
            "5. Co-incubate for 4 to 6 h, then read supernatant fluorescence.",
            "6. Compute specific lysis from the two bounds.",
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "Ageing targets or effectors and over-long incubation both raise spontaneous release and depress the signal-to-noise ratio. Normal adherent lines must be dissociated into a uniform single-cell suspension. Digestion damage raises spontaneous release, which then reads as off-target killing.",
          ],
        },
        {
          type: "subheading",
          id: "07-reading-the-immune-response-3-4-results",
          index: "3.4",
          title: "Results",
          level: 4,
        },
        {
          type: "prose",
          paragraphs: [
            "All thirteen Round 1 constructs cleared the K562 gate. Killing runs from 31.37% to 44.15%, a 1.41-fold band across the panel, with the three highest being TROP2-CTL1 at 44.15 ± 2.61%, TROP2-CTL2 at 42.15 ± 1.16% and LIV1-CTL5 at 41.53 ± 2.84%. Values are percentage specific lysis, mean ± SD, n = 3 replicate wells per construct on one plate.",
          ],
        },
        {
          type: "figure",
          className: "measurement-figure--compact measurement-figure--fig16",
          src: getMeasurementImage(
            "round-1-killing-of-k562-by-t-cells-primed-with-each-construct",
          ),
          width: 1280,
          height: 1155,
          alt: "Round 1 killing of K562 by T cells primed with each construct",
          caption:
            "Round 1 killing of K562 by T cells primed with each construct",
        },
        {
          type: "table",
          caption: "Table 6. Killing of MDA-MB-231.",
          headers: [
            "E:T ratio",
            "Empty vector",
            "TROP2-1",
            "TROP2-2",
            "TROP2-1+2",
            "Combined",
          ],
          rows: [
            [
              "20 : 1",
              "6.93 ± 1.55",
              "15.03 ± 4.61",
              "18.70 ± 0.96",
              "25.63 ± 4.37",
              "33.83 ± 4.26",
            ],
            [
              "40 : 1",
              "12.60 ± 2.72",
              "27.53 ± 2.04",
              "26.67 ± 1.35",
              "46.77 ± 3.80",
              "55.20 ± 2.36",
            ],
            [
              "80 : 1",
              "26.20 ± 3.28",
              "47.37 ± 3.21",
              "46.60 ± 2.29",
              "68.70 ± 1.40",
              "83.57 ± 1.68",
            ],
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "Values are percentage specific lysis, mean ± SD, n = 3 replicate wells. One-way ANOVA is below 0.0001 at all three ratios.",
          ],
        },
        {
          type: "figure",
          className: "measurement-figure--compact measurement-figure--fig17",
          src: getMeasurementImage(
            "killing-of-mda-mb-231-by-t-cells-primed-with-each-construct-across-e-t-ratios",
          ),
          width: 1480,
          height: 832,
          alt: "Killing of MDA-MB-231 across three effector-to-target ratios",
          caption:
            "Killing of MDA-MB-231 across three effector-to-target ratios",
        },
        {
          type: "table",
          caption: "Table 7. Off-target cytotoxicity.",
          headers: ["Target", "Tissue origin", "80 : 1", "100 : 1"],
          rows: [
            [
              "HCAEC",
              "Coronary artery endothelium",
              "2.77 ± 0.32",
              "3.47 ± 1.35",
            ],
            ["LX-2", "Hepatic stellate", "0.78 ± 0.58", "1.31 ± 0.46"],
            ["BEAS-2B", "Bronchial epithelium", "2.67 ± 0.65", "2.37 ± 1.10"],
            [
              "MCF12A",
              "Normal mammary epithelium",
              "1.86 ± 0.48",
              "2.26 ± 0.60",
            ],
            [
              "MDA-MB-231",
              "TNBC, positive control",
              "59.24 ± 2.10",
              "62.07 ± 3.58",
            ],
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "Values are percentage specific lysis, mean ± SD, n = 3 replicate wells on one plate. Pooling the four normal lines at 80 : 1 gives 2.02 ± 0.95% across twelve wells. The highest single normal-cell well across all 24 is 4.90% and the lowest MDA-MB-231 well is 57.11%.",
          ],
        },
        {
          type: "figure",
          src: getMeasurementImage(
            "killing-of-four-normal-cell-lines-and-mda-mb-231-by-vaccine-primed-t-cells",
          ),
          alt: "Killing of four normal cell lines and MDA-MB-231",
          caption: "Killing of four normal cell lines and MDA-MB-231",
          width: 694,
          height: 450,
        },
        {
          type: "subheading",
          id: "07-reading-the-immune-response-3-5-discussion",
          index: "3.5",
          title: "Discussion",
          level: 4,
        },
        {
          type: "prose",
          paragraphs: [
            "The K562 result works as a gate and as a normaliser. Because every one of the thirteen preparations produced functional effectors, a low ELISpot count can be attributed to the epitope sequence. And because the baseline sits in a 1.41-fold band across constructs while ELISpot spans 5.8-fold, the ELISpot spread reflects the epitopes and not thirteen effector populations of unequal fitness. The rank correlation between the two readouts is Spearman ρ = 0.43 at P = 0.14, the result the target biology predicts for an MHC-I negative line.",
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "On MDA-MB-231, killing rises monotonically with effector dose in every group with no plateau or inversion, and that monotonicity is the assay's internal validity check: an erratic curve would point to systematic error in the assay itself. The two single epitopes cannot be distinguished at any ratio, so the data support the tier ordering and not a four-way ranking. Because the empty-vector arm still kills 26.20 ± 3.28% at the highest ratio, subtracting it leaves roughly 57 percentage points of the Combined arm's 83.57% attributable to the epitope-encoding sequence.",
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "MCF12A is the most demanding line in the safety panel, sharing tissue origin with the target and carrying the correct restriction element, and it was killed at 1.86 to 2.26%. Raising the effector dose moves the normal lines by at most 0.7 percentage points while tumour killing continues to rise.",
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "The Round 1 panel also carries this page's reproducibility figure for the epitope cassettes. Within-construct standard deviation averages 1.28 percentage points, a CV of 3.4%, and one-way analysis of variance across the thirteen constructs gives F(12,26) = 18.8 at P = 8.1 × 10⁻¹⁰, with 85.6% of total variance sitting between constructs rather than between wells. The thirteen preparations are therefore separable from one another by an amount well above the scatter of the assay that measures them.",
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "One limit covers all three uses: the replicates are technical wells on a single plate, so precision and separation are established at plate level and have not been tested across effector-cell batches.",
          ],
        },
        {
          type: "subheading",
          id: "07-reading-the-immune-response-4-multiparameter-flow-cytometry-a-method-to-track-the-immune-response-chain-and-validate-the-target-line",
          index: "4",
          title:
            "Multiparameter flow cytometry: A method to track the immune response chain and validate the target line",
          level: 3,
        },
        {
          type: "subheading",
          id: "07-reading-the-immune-response-4-1-introduction",
          index: "4.1",
          title: "Introduction",
          level: 4,
        },
        {
          type: "prose",
          paragraphs: [
            "Tumour growth inhibition is an endpoint, and an endpoint alone does not say which step of the immune response the vaccine acted on. Flow cytometry can follow the chain link by link in the order it runs: dendritic cell maturation, T-cell activation, co-stimulation, memory differentiation, and effector molecule production. Measuring each link separately also means a failure can be localised rather than inferred.",
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "The same instrument and the same control architecture served a second purpose in this project: sorting and validating the TROP2-overexpressing 4T1 line that the animal study depends on. Because both uses share compensation, gating and control design, they are described together.",
          ],
        },
        {
          type: "subheading",
          id: "07-reading-the-immune-response-4-2-experimental-workflow",
          index: "4.2",
          title: "Experimental workflow",
          level: 4,
        },
        {
          type: "prose",
          paragraphs: [
            "Four control types are on every panel. Single-stain compensation beads build the compensation matrix, since auto-compensating from a fully stained sample is unreliable. An isotype tube sets the positive threshold and an unstained tube corrects autofluorescence. A fixable viability dye removes dead-cell false positives, which otherwise produce non-specific fluorescence. FMO controls are included for any marker whose distribution is not clearly bimodal, because a gate drawn on a continuous distribution is otherwise arbitrary. At least 2×10⁴ events are acquired per tube.",
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "Round 1 activation. CD8⁺CD69⁺ double positives were measured for the two leading TROP2 epitopes, as an independent and mechanistically earlier line of evidence alongside ELISpot.",
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "Round 2 immune chain. Every human panel was read against the empty-vector circRNA baseline, with n = 3 independently electroporated wells per group, each acquired as its own tube. The panels were CD80⁺CD86⁺ for dendritic cell maturation, CD8⁺CD69⁺ and CD8⁺CD28⁺ for activation and co-stimulation, and CD45RO⁺CCR7⁻ within the CD8⁺ gate for effector-memory differentiation.",
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "Sorting the target line. GFP⁺ 4T1 were isolated with a three-step gate, each step removing one class of false event, with the GFP threshold set on untransduced 4T1.",
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "Validating the target line. Surface TROP2 was measured on wild-type and transduced 4T1 in four tubes: wild type, isotype, unstained and overexpressing.",
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "Splenic response. At endpoint, splenocytes were assessed across four panels, with the mouse panels using CD44 and CD62L for memory phenotyping, the standard markers in that species, in place of the CD45RO and CCR7 pair used in the human work.",
          ],
        },
        {
          type: "subheading",
          id: "07-reading-the-immune-response-4-3-protocols",
          index: "4.3",
          title: "Protocols",
          level: 4,
        },
        {
          type: "prose",
          paragraphs: [
            "1. Warm the instrument for 30 min and calibrate with compensation beads to a CV below 5%. Set an FSC-H threshold above 10⁴ to exclude debris.",
            "2. Harvest cells, adjust to 1×10⁶/mL and divide into stained, isotype, unstained and FMO tubes.",
            "3. Stain surface markers at 4 °C in the dark for 15 to 30 min, flicking every 5 min.",
            "4. For intracellular staining, re-stimulate with PMA at 50 ng/mL and ionomycin at 1 µg/mL for 4 to 6 h with GolgiPlug at 1 µL/mL to block secretion. Granzyme B is stored constitutively and needs no re-stimulation.",
            "5. Fix and permeabilise, then perform all subsequent washes and antibody dilutions in Perm/Wash buffer. Using ordinary staining buffer washes out the saponin, reseals the membrane and produces false-negative intracellular staining.",
            "6. Gate on FSC/SSC for lymphocytes, then on the marker pairs, with the positive threshold set on the isotype or FMO control.",
            "7. For sorting, gate FSC-A against SSC-A to exclude debris, FSC-A against FSC-H to exclude doublets, then GFP-A against a threshold set on untransduced cells; collect into serum-rich medium.",
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "Buffers were kept ice-cold and time at room temperature minimised throughout the mouse memory panels, since CD62L staining is sensitive to both.",
          ],
        },
        {
          type: "subheading",
          id: "07-reading-the-immune-response-4-4-results",
          index: "4.4",
          title: "Results",
          level: 4,
        },
        {
          type: "figure",
          src: getMeasurementImage(
            "three-step-gating-strategy-for-sorting-gfp-4t1-cells",
          ),
          width: 4000,
          height: 1285,
          alt: "Gating strategy for sorting GFP-positive 4T1",
          caption: "Gating strategy for sorting GFP-positive 4T1",
        },
        {
          type: "prose",
          paragraphs: [
            "The sort kept 68.8% of acquired events at the debris gate and 89.3% of those at the doublet gate, where the population lay along the expected diagonal. Of the remaining singlets, 84.1% were GFP positive. The threshold sat at about 10³, with untransduced 4T1 holding at 10¹ to 10².",
          ],
        },
        {
          type: "figure",
          src: getMeasurementImage(
            "flow-cytometric-detection-of-surface-trop2-on-4t1-cells",
          ),
          alt: "Surface TROP2 on wild-type and TROP2-overexpressing 4T1",
          caption: "Surface TROP2 on wild-type and TROP2-overexpressing 4T1",
          width: 1682,
          height: 952,
        },
        {
          type: "prose",
          paragraphs: [
            "Surface TROP2 is 99.9% positive in the sorted and drug-selected line against 0% in wild type.",
          ],
        },
        {
          type: "feature",
          key: "measurement-plate-3",
        },
        {
          type: "prose",
          paragraphs: [
            "In the human system, CD80⁺CD86⁺ dendritic cells rose from 10.33 ± 0.55% in the empty-vector arm to 22.37 ± 0.31% for the Combined vaccine, with F(4,10) = 378.2 and a Holm-corrected P of 2.5 × 10⁻⁵. CD8⁺CD69⁺ rose from 27.33 ± 0.40% to 45.53 ± 0.31% and CD8⁺CD28⁺ from 2.77 ± 0.60% to 17.53 ± 0.45%, with F(4,10) = 872.7 and 185.8. CD45RO⁺CCR7⁻ effector-memory cells within the CD8⁺ gate rose from 1.10 ± 0.36% to 21.90 ± 0.72%, F(4,10) = 701.1. In Round 1, CD8⁺CD69⁺ frequencies ranked TROP2-CTL1 above TROP2-CTL2, agreeing in direction with their ELISpot ranking.",
          ],
        },
        {
          type: "table",
          caption: "Table 8. Splenic immunophenotype at endpoint.",
          headers: ["Readout", "PBS", "Empty vector", "Vaccine", "Fold vs PBS"],
          rows: [
            [
              "DC CD80⁺CD86⁺ (%)",
              "22.43 ± 0.50",
              "32.27 ± 2.00",
              "43.77 ± 1.42",
              "1.95×",
            ],
            [
              "CD8⁺CD69⁺ (%)",
              "3.98 ± 0.14",
              "5.34 ± 0.75",
              "8.04 ± 0.74",
              "2.02×",
            ],
            [
              "CD8⁺CD44⁺CD62L⁺ (%)",
              "5.30 ± 0.56",
              "8.13 ± 0.90",
              "12.97 ± 1.89",
              "2.45×",
            ],
            [
              "CD8⁺IFN-γ⁺ (%)",
              "1.02 ± 0.08",
              "1.52 ± 0.10",
              "3.18 ± 0.07",
              "3.11×",
            ],
            [
              "CD8⁺GzmB⁺ (%)",
              "0.71 ± 0.04",
              "1.42 ± 0.50",
              "2.89 ± 0.12",
              "4.07×",
            ],
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "Values are mean ± SD, n = 3 animals per group; the statistical unit is the animal and pairwise P values are Holm corrected.",
          ],
        },
        {
          type: "feature",
          key: "measurement-plate-4",
        },
        {
          type: "subheading",
          id: "07-reading-the-immune-response-4-5-discussion",
          index: "4.5",
          title: "Discussion",
          level: 4,
        },
        {
          type: "prose",
          paragraphs: [
            "Read in the order of the immune chain, the panels say more as a set than individually. In the human system the increase in CD28 is 6.34-fold against 1.67-fold for CD69, which places the vaccine's effect on co-stimulatory support as well as on the immediate activation signal. In the memory readout the single-epitope groups sit at about half the level of the dual and multi-epitope groups, and the dual and Combined groups are indistinguishable at P = 0.52, so two epitopes already reach a plateau on that measure. In the spleen all five readouts are ordered PBS below empty vector below vaccine, both the vaccine-against-PBS and vaccine-against-vector comparisons survive Holm correction on all five, and the fold increase rises along the chain with the largest value at the most downstream link.",
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "The same group ordering appears in five mechanistically different readouts: dendritic cell maturation, T-cell activation, co-stimulation, effector-memory differentiation, and the IFN-γ ELISpot and Calcein-AM killing assays of the two blocks above. Those five fail in different ways, so an ordering that holds in all of them does not depend on any single assay being right.",
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "For the target line, the sort and the validation measure different things, so the two percentages are not one purity rising. GFP positivity at the sort is a reporter, and a proxy for integration, scored within the singlet gate. Surface TROP2 is the protein itself, scored in the expanded and drug-selected population. What the pair supports is that sorting and drug selection acted in the same direction and left no detectable negative subpopulation.",
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "Four limits apply. The human data are technical replicates within one experiment on a single donor. The CD28 result is a single-timepoint snapshot with no kinetic series, so the chosen time point bounds what it can say. Intracellular staining used polyclonal re-stimulation, not peptide re-stimulation, so it measures overall effector capacity and not epitope-specific responses. And the memory readouts are phenotypes.",
          ],
        },
      ],
    },
    {
      id: "08-measuring-the-outcome-in-the-animal",
      index: "08",
      kicker: "",
      title: "Measuring the outcome in the animal",
      summary: "",
      blocks: [
        {
          type: "prose",
          paragraphs: [
            "These two methods bracket the in vivo arm. One built and checked the tumour line the study needed, then looked inside the treated tumours at the end. The other produced the endpoint number. Both are read against measurements made in the three stages above.",
          ],
        },
        {
          type: "subheading",
          id: "08-measuring-the-outcome-in-the-animal-1-fluorescence-microscopy-a-method-to-confirm-transduction-and-to-visualise-intratumoural-infiltration",
          index: "1",
          title:
            "Fluorescence microscopy: A method to confirm transduction and to visualise intratumoural infiltration",
          level: 3,
        },
        {
          type: "subheading",
          id: "08-measuring-the-outcome-in-the-animal-1-1-introduction",
          index: "1.1",
          title: "Introduction",
          level: 4,
        },
        {
          type: "prose",
          paragraphs: [
            "Fluorescence microscopy answered two questions in this project that sit at opposite ends of the quantitative scale. One had to come back positive before the tumour line could be sorted at all. The other is the last descriptive readout the project produced.",
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "In live transduced cells the question is yes or no: did the lentivirus enter the cells, and is the reporter expressed widely enough to justify sorting. In fixed tumour sections the question is how much: are CD8⁺ T cells present inside the tumour, and does their density differ between treatment groups. Both are read from the images, and both rest on the same two controls: a sample imaged under identical settings that should carry no signal, and a single acquisition session so that every image is exposed alike.",
          ],
        },
        {
          type: "subheading",
          id: "08-measuring-the-outcome-in-the-animal-1-2-experimental-workflow",
          index: "1.2",
          title: "Experimental workflow",
          level: 4,
        },
        {
          type: "prose",
          paragraphs: [
            "Transduction check. The TROP2-overexpressing lentivirus was bought ready-made rather than packaged in-house, and its titre was not determined here, so the imaging is the first evidence that it worked. 4T1 were imaged 48 to 72 h after transduction at two magnifications, in bright field, the GFP channel and merge. Untransduced 4T1 were imaged under identical settings as the autofluorescence control, which separates signal from background at this step.",
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "Intratumoural infiltration. Paraffin sections from all three groups were stained for CD8 and Granzyme B, with a negative-control section carrying secondary antibody only to subtract the strong autofluorescence of necrotic tumour tissue. All three groups were processed and imaged in one batch in randomised order under uniform exposure and magnification, with the groups coded throughout. One field was acquired from each of three animals per group, those three drawn at random from each group's five, and the field judged most representative of that section was taken without the operator knowing which group the section belonged to.",
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "The scale bar is stored as an ImageJ overlay in the image files instead of being burned into the pixels, and the imaging facility confirmed it as 100 µm. Because it is an overlay it contributes no pixels to any channel, so the displayed images carry the scale without the annotation entering the image data.",
          ],
        },
        {
          type: "subheading",
          id: "08-measuring-the-outcome-in-the-animal-1-3-protocols",
          index: "1.3",
          title: "Protocols",
          level: 4,
        },
        {
          type: "prose",
          paragraphs: [
            "1. For the transduction check, image live cells 48 to 72 h after transduction in bright field and the GFP channel at two magnifications, and image untransduced cells under identical exposure and gain as the autofluorescence control.",
            "2. For tissue, section the paraffin-embedded tumours and process all three groups in one batch in randomised order.",
            "3. Stain for CD8 and Granzyme B, including a negative-control section with secondary antibody only and a single-stain section under the same settings.",
            "4. Image all groups in one session under uniform exposure and magnification, recording the scale bar as an overlay instead of burning it into the pixels.",
            "5. Display all panels at an identical linear gain, with no group-specific brightness or contrast adjustment, and present the animal carrying the median appearance for each group.",
          ],
        },
        {
          type: "subheading",
          id: "08-measuring-the-outcome-in-the-animal-1-4-results",
          index: "1.4",
          title: "Results",
          level: 4,
        },
        {
          type: "figure",
          src: getMeasurementImage(
            "gfp-fluorescence-in-4t1-cells-48-72-h-after-lentiviral-transduction",
          ),
          width: 1280,
          height: 747,
          alt: "GFP fluorescence in transduced 4T1",
          caption: "GFP fluorescence in transduced 4T1",
        },
        {
          type: "prose",
          paragraphs: [
            "In bright field the cells are adherent and polygonal to spindle-shaped with no rounding or detachment, so the transduction imposed no visible cytotoxicity. The GFP signal is bright and evenly distributed across the field, with no sign of being confined to a few unusually bright cells, and in the merge it localises inside the cell outlines defined by bright field.",
          ],
        },
        {
          type: "figure",
          src: getMeasurementImage(
            "cd8-granzyme-b-dual-immunofluorescence-of-tumour-tissue",
          ),
          width: 1602,
          height: 1028,
          alt: "CD8 and Granzyme B dual immunofluorescence of tumour tissue",
          caption:
            "CD8 and Granzyme B dual immunofluorescence of tumour tissue",
        },
        {
          type: "prose",
          paragraphs: [
            "A gradient runs across the three groups. PBS sections carry sparse intratumoural CD8⁺ T cells, empty-vector sections carry moderately more, and vaccine sections carry the densest CD8⁺ T-cell infiltrate, with more Granzyme B signal alongside it. All nine images were acquired in one session under identical exposure and gain, and all panels are displayed at the same linear gain, so what differs between the panels is the sections themselves and not how they were captured or shown.",
          ],
        },
        {
          type: "subheading",
          id: "08-measuring-the-outcome-in-the-animal-1-5-discussion",
          index: "1.5",
          title: "Discussion",
          level: 4,
        },
        {
          type: "prose",
          paragraphs: [
            "The transduction check is reported qualitatively because that is what it supports. Even illumination across the field and localisation inside cell outlines rule out the two common artefacts at this step: a few bright outliers read as a transduced population, and extracellular debris read as signal. What it leaves open is TROP2 expression, since GFP is a surrogate for successful integration and a cell could carry and express the reporter without presenting functional TROP2. TROP2 was therefore assessed separately by RT-PCR and surface staining. The transcript-level relative-expression values are reported in the reverse transcription PCR section, while surface staining provides the direct readout of TROP2 expression on the target cells.",
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "The tumour sections are reported as representative images, and the design is the reason. One field was acquired per animal from three animals per group, and immune infiltration is patchy within a tumour, so a single field cannot stand for the tumour it was taken from. The field was chosen blind to group allocation, which removes the most obvious source of bias. Choosing the most representative field is still a judgement by eye, and no number can be built on one. What the images support is that CD8⁺ T cells are present inside the vaccine-treated tumours and sparse in the PBS tumours. The decomposition of what the carrier contributes and what the antigen adds rests on the caliper and splenic data, where the design supports it.",
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "The Granzyme B channel carries a further limit. Its morphology is strand-like and reticular, unlike the granular pattern of lymphocyte granules, which is consistent with a contribution from stromal autofluorescence, and no single-stain or isotype-control sections exist to separate specific staining from background. This section therefore shows increased CD8⁺ T-cell infiltration and does not establish that those cells are armed; that claim rests on the splenic intracellular cytokine staining alone.",
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "The same three animals per group supplied both these sections and the splenic material, so the two readouts come from one subsample of animals. Their agreement is weaker evidence than two separate sets of animals would give.",
          ],
        },
        {
          type: "subheading",
          id: "08-measuring-the-outcome-in-the-animal-2-blinded-caliper-volumetry-a-method-to-measure-tumour-growth-without-observer-bias",
          index: "2",
          title:
            "Blinded caliper volumetry: A method to measure tumour growth without observer bias",
          level: 3,
        },
        {
          type: "subheading",
          id: "08-measuring-the-outcome-in-the-animal-2-1-introduction",
          index: "2.1",
          title: "Introduction",
          level: 4,
        },
        {
          type: "prose",
          paragraphs: [
            "Caliper measurement of a subcutaneous tumour is the most operator-dependent number in the whole project. The tumour is soft and compressible, the same animals are measured week after week for six weeks, and whoever holds the caliper may know what each animal received. Each of those is a route for expectation to enter the data.",
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "What the resulting number means also rests on measurements made before the first animal was dosed. The tumour line had to carry TROP2 on its surface, the circRNA had to clear its circularity release figure, and the carrier dose had to sit inside a bounded range. Blinding protects the measurement; those three protect its interpretation.",
          ],
        },
        {
          type: "subheading",
          id: "08-measuring-the-outcome-in-the-animal-2-2-experimental-workflow",
          index: "2.2",
          title: "Experimental workflow",
          level: 4,
        },
        {
          type: "prose",
          paragraphs: [
            "The design was drafted in the NC3Rs Experimental Design Assistant and an Experimental Design Report was generated before the study began, fixing sample size, randomisation, blinding, inclusion and exclusion criteria, the primary outcome and the statistical method in advance. Reporting follows ARRIVE 2.0 (Percie du Sert et al., 2020). The study was approved by the Animal Ethics Committee of the First Hospital of Jilin University, approval JDYY20261369 of 27 July 2026, under animal use licence SYXK (Ji) 2023-0011.",
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "Three groups of five female BALB/c mice received PBS, empty-vector circRNA-LNP or the Combined vaccine, with 4T1-TROP2 inoculated subcutaneously on day 0, five weekly doses of 10 µg, and the endpoint at day 35. Three spare animals covered losses at inoculation. Allocation was by complete randomisation on the day of inoculation with individual ear-tag coding. The experimental unit is the animal. A single sex was used because triple-negative breast cancer occurs overwhelmingly in women and 4T1 derives from a spontaneous mammary carcinoma of female BALB/c origin, which also removes sex as a source of variability and reduces animal use.",
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "The person administering treatment could not be blinded, since the three preparations look different. The primary outcome was therefore measured blind, by a single independent operator working on coded animals. The measurement order was randomised from a random-number table at each timepoint, so that any drift in the operator's technique could not line up with the groups. Each tumour was measured three times in a row and the mean taken.",
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "The primary outcome is endpoint tumour volume alone, with growth curves descriptive. All three pairwise contrasts are pre-specified in a stated hierarchy and Holm corrected (Holm, 1979). The minimum important effect was set in advance at 50% tumour growth inhibition.",
          ],
        },
        {
          type: "subheading",
          id: "08-measuring-the-outcome-in-the-animal-2-3-protocols",
          index: "2.3",
          title: "Protocols",
          level: 4,
        },
        {
          type: "prose",
          paragraphs: [
            "1. Allocate eligible mice completely at random to the three groups on day 0 using a randomisation table, with individual ear-tag coding.",
            "2. Inoculate 4T1-TROP2 subcutaneously in the right axillary fat pad.",
            "3. Dose 100 µL subcutaneously at the base of the tail on days 0, 7, 14, 21 and 28.",
            "4. At each timepoint, present the animals to the blinded operator in a randomised order.",
            "5. Restrain the animal gently so the tumour is not compressed, measure the long and short axes at the widest point with a vernier caliper, repeat three times and take the mean.",
            "6. Compute volume from the mean axes and record against the animal code.",
            "7. Check the pre-specified assumptions before analysis, then run the pre-specified test.",
          ],
        },
        {
          type: "figure",
          src: getMeasurementImage("immunisation-and-measurement-schedule"),
          width: 1280,
          height: 723,
          alt: "Immunisation and measurement schedule",
          caption: "Immunisation and measurement schedule",
        },
        {
          type: "subheading",
          id: "08-measuring-the-outcome-in-the-animal-2-4-results",
          index: "2.4",
          title: "Results",
          level: 4,
        },
        {
          type: "table",
          caption: "Table 9. Endpoint tumour volume at day 35.",
          headers: ["Group", "Endpoint tumour volume (mm³)"],
          rows: [
            ["PBS", "233.64 ± 28.33"],
            ["Empty vector", "90.36 ± 13.51"],
            ["Combined vaccine", "24.20 ± 9.72"],
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "Values are mean ± SD, n = 5 animals per group. Shapiro-Wilk gives P of 0.69, 0.79 and 0.77 and Levene's test P = 0.24, so both assumptions pass and the pre-specified one-way ANOVA was used with no transformation, giving F(2,12) = 159.2 and P = 2.3 × 10⁻⁹.",
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "The three pre-specified contrasts give Holm-corrected P values of 8.4 × 10⁻⁷ for vaccine against PBS at 89.6% tumour growth inhibition, 2.0 × 10⁻⁵ for vaccine against empty vector at 73.2%, and 1.5 × 10⁻⁵ for empty vector against PBS at 61.3%. All three clear the pre-specified minimum important effect.",
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "At the first measurable timepoint the three groups are indistinguishable at P = 0.81. Separation appears the following week and widens thereafter.",
          ],
        },
        {
          type: "figure",
          className: "measurement-figure--compact measurement-figure--fig26",
          src: getMeasurementImage("tumour-growth-curves-for-the-three-groups"),
          width: 1065,
          height: 510,
          alt: "Tumour growth curves for the three groups",
          caption: "Tumour growth curves for the three groups",
        },
        {
          type: "figure",
          src: getMeasurementImage("excised-tumours-at-endpoint-d35"),
          width: 460,
          height: 336,
          alt: "Excised tumours at endpoint",
          caption: "Excised tumours at endpoint",
        },
        {
          type: "subheading",
          id: "08-measuring-the-outcome-in-the-animal-2-5-discussion",
          index: "2.5",
          title: "Discussion",
          level: 4,
        },
        {
          type: "prose",
          paragraphs: [
            "The three-arm design is what the extra animals bought. Reported against PBS alone the vaccine achieves 89.6% inhibition; reported against the empty vector the antigen-attributable figure is 73.2%. The 16.4 percentage points between them belong to the carrier, and a two-arm design would have credited them to the antigen. The three contrasts are not independent, since the third is the difference between the first two, so the set decomposes one effect into its components; it does not test three separate hypotheses.",
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "The agreement at the first measurable timepoint rules out the most common confounder in this model, that the groups differed from the outset through inoculation technique. The excised tumours at endpoint show the same three-tier size gradient as the curves, so the caliper readings are corroborated by a measurement that does not involve a caliper.",
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "Two limits bound every number here. The epitopes are human HLA-A*02:01 restricted and the model is a wild-type mouse of H-2d haplotype, which cannot efficiently present them, so this is a proof of concept for the platform, and the response may include non-specific innate effects from the backbone and adjuvant. And TROP2 overexpression in this model far exceeds physiological expression in clinical TNBC, so efficacy is likely to be systematically overestimated. Both figures should be read as upper-bound performance in an idealised antigen-enriched model.",
          ],
        },
      ],
    },
    {
      id: "09-future-work",
      index: "09",
      kicker: "",
      title: "Future Work",
      summary: "",
      blocks: [
        {
          type: "prose",
          paragraphs: [
            "The measurements on this page were made under a single project timeline, and the places where they stop are where the next round of work starts.",
          ],
        },
        {
          type: "subheading",
          id: "09-future-work-1-1-circularity-on-every-batch-with-calibrated-primer-pairs",
          index: "1",
          title:
            "Estimated circular fractions on every batch, with calibrated assays.",
          level: 3,
        },
        {
          type: "prose",
          paragraphs: [
            "The circular fraction was estimated for the Round 1 representative and the Combined preparation. Other constructs need their own measurements. The next analytical step is to calibrate SJ3910F + SJ3909R and SJ3911F + SJ3909R using suitable RNA standards, establish amplification and reverse-transcription responses, and test the input range. Defined circular/linear reference mixtures would test whether the model recovers known compositions. Raw target and reference Cq values should be retained with every batch. The TROP2 transcript comparison used three RNA-extraction replicates from one cell sample per group. Independent cell preparations, together with a documented signal readout and normalisation calculation, are needed to assess biological reproducibility.",
          ],
        },
        {
          type: "subheading",
          id: "09-future-work-2-2-more-hla-alleles-and-presentation-measured-on-cells",
          index: "2",
          title: "More HLA alleles, and presentation measured on cells.",
          level: 3,
        },
        {
          type: "prose",
          paragraphs: [
            "Every epitope here is HLA-A*02:01 restricted, which bounds the population this vaccine could address whatever else improves. The same workflow runs on any allele given allele-specific predictions and panels. Targeted immunopeptidomics would then show which of the selected peptides TNBC cells actually present, which neither the sequence screen nor the structural screen can establish.",
          ],
        },
        {
          type: "subheading",
          id: "09-future-work-3-3-an-hla-matched-mouse-model-with-tetramer-staining",
          index: "3",
          title: "An HLA-matched mouse model, with tetramer staining.",
          level: 3,
        },
        {
          type: "prose",
          paragraphs: [
            "The epitopes are HLA-A*02:01 restricted and the efficacy model is a wild-type BALB/c mouse of H-2d haplotype, which cannot efficiently present them. Tetramer staining in a matched model would count antigen-specific CD8⁺ T cells directly. A model expressing TROP2 at physiological levels, rather than the forced overexpression used here, would also remove the upward bias it introduces.",
          ],
        },
      ],
    },
    {
      id: "references",
      index: "10",
      kicker: "",
      title: "References",
      summary: "",
      blocks: [
        {
          type: "feature",
          key: "measurement-references",
        },
      ],
    },
  ],
  links: [
    {
      path: "/experiments",
      label: "Experimental Verification",
    },
    {
      path: "/results",
      label: "Quantitative Results",
    },
    {
      path: "/alternative-platform",
      label: "Alternative Chassis Exploration",
    },
    {
      path: "/hardware",
      label: "CirCore Device Calibration",
    },
  ],
  next: {
    path: "/alternative-platform",
    label: "Alternative Platform",
    title: "Beyond the Conventional Chassis",
    description:
      "Now that analytical standards are established, can circRNA synthesis escape costly cell-free enzymes? Explore our evaluation of alternative cellular expression platforms.",
  },
};
