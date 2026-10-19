import type { WikiPageContent, WikiJudgingCriterion } from "../../components/wiki/wikiPageTypes";
import type { ModelPanel } from "./modelPanelTypes";
import type { CitationReference } from "../citations/citationTypes";
import { getModelImage } from "./modelAssets";

const manuscriptSections: WikiPageContent["sections"] = [
  {
    "id": "model-judging",
    "index": "01",
    "kicker": "Judging",
    "navLabel": "Judging",
    "title": "Judging",
    "summary": "",
    "blocks": [
      {
        "type": "prose",
        "paragraphs": [
          "For your convenience, we have summarised how we have addressed the iGEM model criteria in the following section."
        ]
      },
      {
        "type": "feature",
        "key": "model-judging"
      }
    ]
  },
  {
    "id": "model-overview",
    "index": "02",
    "kicker": "Overview",
    "navLabel": "Overview",
    "title": "Overview",
    "summary": "",
    "blocks": [
      {
        "type": "prose",
        "paragraphs": [
          "We built three models: **AEIP** for antigen and epitope selection, **Cell2Dose** for dose prediction, and **SST-QN** to evaluate sustainability. The first two guide experimental design. The third evaluates how SDGs interact in a general context, then assesses how CirCure might shift those interactions."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "**AEIP (Antigen–Epitope Integration Pipeline)** combines proteomics, single-cell RNA sequencing, genomic profiling, and structural modeling to pick vaccine targets. We started with the TNBC proteome, selected four antigens, and screened **1,838** candidate peptides down to **15** epitopes restricted to **HLA-A*02:01**. The pipeline confirmed that these antigens appear as proteins in TNBC tissue, concentrate in malignant cells rather than stroma, **cover 88% of patients** when used together, and form stable complexes with MHC molecules. That gives the wet lab a defined set to test instead of the full proteome."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "**Cell2Dose (A Cell-Informed Mechanistic Model for Tumor Vaccine Dose Exploration)** bridges in vitro readouts to **in vivo** tumor dynamics through three computational layers: calibrating immune kinetics from cell assays, simulating the vaccine mechanism from injection to tumor killing, and quantifying uncertainty across parameters to **rank dose candidates**. That helps the team **decide** which doses are **worth testing in animals** before the experiment begins and diagnose which process step limits efficacy if a dose fails, reducing the number of animals needed and **aligning dose selection** with animal welfare principles."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "**SST-QN (SDG Synergy–Trade-off Quantification Network)** maps **how the 17 SDGs interact without project influence**, classifying relationships and scoring synergies and trade-offs across the system. We then applied **CirCure's** actions at each stage, from early research through manufacturing scale-up, to the baseline network. The model projects how the project affects economic, social, and environmental outcomes and identifies where CirCure supports sustainability goals or creates conflicts."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Click on the graphical abstract to jump to the relevant section!"
        ]
      },
      {
        "type": "feature",
        "key": "model-graphical-abstracts"
      }
    ]
  },
  {
    "id": "model-aeip",
    "index": "03",
    "kicker": "AEIP",
    "navLabel": "AEIP",
    "title": "AEIP",
    "summary": "",
    "blocks": [
      {
        "type": "prose",
        "paragraphs": [
          "For patients with triple-negative breast cancer (TNBC), negative tumor test results for estrogen receptor (ER), progesterone receptor (PR), and human epidermal growth factor receptor 2 (HER2) mean fewer treatment options, while tumor diversity makes effective targeting even harder—behind this treatment gap are lives that cannot wait. We are therefore developing a multi-antigen circRNA vaccine designed to activate the body’s own antitumor immune response and help immune cells recognize and kill tumor cells."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "To translate this strategy into a testable vaccine design, we developed the Antigen–Epitope Integration Pipeline (AEIP). This computational workflow integrates proteomic evidence, single-cell transcriptomics, patient-level genomic profiling, and immunohistochemistry to prioritize antigens, followed by binding-affinity prediction, immunogenicity scoring, and structural compatibility assessment to select HLA-restricted epitopes."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "AEIP prioritized a four-antigen panel—TROP2, B7-H4, Nectin-4, and LIV-1—that collectively covered 88% of TNBC patients under a predefined genomic criterion and showed preferential expression in malignant cells relative to stromal and immune cells. It narrowed 1,838 candidate peptides to 15 HLA-A*02:01-restricted epitope candidates, which were delivered to the wet lab for T-cell activation assays and circRNA construct design."
        ]
      },
      {
        "type": "figure",
        "src": getModelImage("AEIP structure.png"),
        "width": 3191,
        "height": 1855,
        "alt": "Overview of the Antigen-Epitope Integration Pipeline (AEIP) workflow.",
        "caption": "Overview of the Antigen-Epitope Integration Pipeline (AEIP) workflow.",
        "figureLabel": "FIG. 01"
      },
      {
        "type": "subheading",
        "id": "model-antigen-selection",
        "index": "3.1",
        "title": "Antigen Selection",
        "level": 3
      },
      {
        "type": "prose",
        "paragraphs": [
          "Selecting antigens for a cancer vaccine requires evidence from multiple angles, as cancer data comes in layers that don't always agree. A gene may be highly transcribed but produce little protein, a protein may be abundant but expressed mainly in stromal rather than tumor cells, and an antigen may be present in one patient's tumor but absent in another's. Each of these gaps can mislead antigen selection if evidence from only one source is used."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "We applied a systematic scoring framework adapted from Zahraei et al. (2025) to evaluate candidates across subcellular localization, tumor specificity, prognostic association, and therapeutic validation in TNBC, selecting the top four—TROP2, B7-H4, Nectin-4, and LIV-1—for multi-evidence validation. Quantitative proteomics confirmed tumor-enriched protein abundance for all four, single-cell analysis showed preferential expression in malignant cells with over 80% coverage, genomic profiling demonstrated that the panel collectively covered 88% of TCGA patients, and immunohistochemistry documented clinical tissue staining patterns. These converging lines established that the antigens were present as proteins, localized to malignant cells, reached most patients as a panel, and matched clinical observations."
        ]
      },
      {
        "type": "subheading",
        "id": "model-heading-1",
        "index": "3.1.1",
        "title": "Systematic antigen prioritization",
        "level": 4
      },
      {
        "type": "prose",
        "paragraphs": [
          "Designing a multi-epitope vaccine for TNBC requires selecting target antigens, but the criteria for prioritizing candidates are not immediately obvious. Should we focus on antigens with the highest tumor-to-normal expression ratios, or those already validated in clinical trials? Should intracellular proteins be excluded because they require MHC processing, or included because vaccines can engage T cells? How much weight should be given to prognostic associations versus therapeutic precedent? **These questions do not have universal answers**, and different vaccine projects make different trade-offs."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "We turned to the recent literature on computational vaccine design for TNBC and found that Zahraei et al. (2025) had proposed a systematic scoring framework for antigen selection. Their approach evaluated candidates across four dimensions: **subcellular localization, tumor specificity, prognostic association, and evidence of prior therapeutic targeting**. We adopted this framework as our starting point and refined the therapeutic-targeting dimension to distinguish between exploratory trials and replicated clinical evidence in TNBC specifically, rather than treating all prior targeting equally. The framework assigns each candidate a score from 0 to 10 based on localization (L, 0–5 points), tumor specificity (S, 0–2 points), prognostic association (P, 0–1 point), and TNBC therapeutic validation depth (T, 0–2 points)."
        ]
      },
      {
        "type": "feature",
        "key": "model-panel-1"
      },
      {
        "type": "prose",
        "paragraphs": [
          "We applied this framework to a list of tumour-associated antigens compiled from TNBC-focused reviews, clinical trial databases, antibody-drug conjugate development pipelines, and input from clinicians and industry partners through our Integrated Human Practices activities. Each candidate was scored independently by reviewing primary literature for localisation, expression patterns, survival associations, and therapeutic outcomes. The top four scoring candidates were selected for multi-evidence validation."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "**Table 1.** Top four antigens selected for vaccine development. L, S, P, and T denote localization, tumour specificity, prognostic significance, and therapeutic validation, respectively."
        ]
      },
      {
        "type": "table",
        "headers": [
          "Antigen",
          "Gene",
          "L",
          "S",
          "P",
          "T",
          "Total"
        ],
        "rows": [
          [
            "TROP2",
            "TACSTD2",
            "5",
            "1",
            "1",
            "2",
            "9"
          ],
          [
            "B7-H4",
            "VTCN1",
            "5",
            "1",
            "1",
            "1",
            "8"
          ],
          [
            "LIV-1",
            "SLC39A6",
            "5",
            "1",
            "1",
            "1",
            "8"
          ],
          [
            "Nectin-4",
            "NECTIN4",
            "5",
            "1",
            "1",
            "1",
            "8"
          ]
        ]
      },
      {
        "type": "feature",
        "key": "model-panel-2"
      },
      {
        "type": "prose",
        "paragraphs": [
          "The four selected antigens—tumor-associated calcium signal transducer 2 (TROP2), B7 homolog 4 (B7-H4), nectin cell adhesion molecule 4 (Nectin-4), and zinc transporter ZIP6 (LIV-1)—are **all membrane proteins with favorable tumor-to-normal expression ratios and replicated clinical validation in TNBC**. TROP2 ranked first with two FDA-approved antibody-drug conjugates for metastatic TNBC. B7-H4, LIV-1, and Nectin-4 each demonstrated reproducible anti-tumor activity across independent clinical studies or different therapeutic agents targeting the same antigen."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Published TNBC survival studies provided the clinical starting point for prognostic validation. Higher expression of the four candidates was associated with shorter survival in the respective cohorts or subgroups reported by [Li et al.](https://doi.org/10.1002/advs.202409835), [Wang et al.](https://doi.org/10.1186/s12935-018-0597-9), [Xu et al.](https://doi.org/10.1097/CM9.0000000000002930), [Son et al.](https://doi.org/10.53941/jiim.2025.100013), and [Saravanan et al.](https://doi.org/10.1002/jcp.31203).  The survival data for each antigen are presented below."
        ]
      },
      {
        "type": "feature",
        "key": "model-panel-3"
      },
      {
        "type": "subheading",
        "id": "model-heading-2",
        "index": "3.1.2",
        "title": "Abbreviations and nomenclature",
        "level": 4
      },
      {
        "type": "prose",
        "paragraphs": [
          "Abbreviations are expanded at first use throughout this page. Human gene symbols are italicized, whereas protein names, database names, software names, and dataset accessions are written in roman type. Peptide sequences are shown in monospace. HLA-A*02:01 follows the official HLA allele nomenclature and is also written in roman type."
        ]
      },
      {
        "type": "table",
        "headers": [
          "**Term**",
          "**Meaning used on this page**"
        ],
        "rows": [
          [
            "TNBC",
            "Triple-negative breast cancer"
          ],
          [
            "ER",
            "Estrogen receptor"
          ],
          [
            "PR",
            "Progesterone receptor"
          ],
          [
            "HER2",
            "Human epidermal growth factor receptor 2"
          ],
          [
            "PARP",
            "Poly(ADP-ribose) polymerase"
          ],
          [
            "circRNA",
            "Circular RNA"
          ],
          [
            "LNP",
            "Lipid nanoparticle"
          ],
          [
            "TROP2",
            "Tumor-associated calcium signal transducer 2, encoded by *TACSTD2*"
          ],
          [
            "B7-H4",
            "B7 homolog 4, encoded by *VTCN1*"
          ],
          [
            "Nectin-4",
            "Nectin cell adhesion molecule 4, encoded by *NECTIN4*"
          ],
          [
            "LIV-1",
            "Estrogen-regulated protein LIV-1, also known as zinc transporter ZIP6, encoded by *SLC39A6*"
          ],
          [
            "HLA-I",
            "Human leukocyte antigen class I"
          ],
          [
            "HLA-A*02:01",
            "The HLA class I allele used for epitope prediction in this project"
          ],
          [
            "IEDB",
            "Immune Epitope Database and Analysis Resource"
          ],
          [
            "FDR",
            "False discovery rate"
          ],
          [
            "TCGA",
            "The Cancer Genome Atlas"
          ],
          [
            "TMT",
            "Tandem mass tag"
          ],
          [
            "UMI",
            "Unique molecular identifier"
          ],
          [
            "UMAP",
            "Uniform manifold approximation and projection"
          ],
          [
            "mRNA",
            "Messenger RNA"
          ],
          [
            "TAP",
            "Transporter associated with antigen processing"
          ],
          [
            "pMHC",
            "Peptide–major histocompatibility complex"
          ],
          [
            "BA",
            "Binding affinity"
          ],
          [
            "EL",
            "Eluted ligand"
          ],
          [
            "IC₅₀",
            "Half-maximal inhibitory concentration"
          ],
          [
            "IFN",
            "Interferon"
          ],
          [
            "ipTM",
            "Interface predicted template modeling score"
          ],
          [
            "pTM",
            "Predicted template modeling score"
          ]
        ]
      },
      {
        "type": "subheading",
        "id": "model-heading-3",
        "index": "3.1.3",
        "title": "Proteomic evidence for antigen prioritization",
        "level": 4
      },
      {
        "type": "subheading",
        "id": "model-heading-4",
        "index": "3.1.3.1",
        "title": "Why protein-level evidence came first",
        "level": 4
      },
      {
        "type": "prose",
        "paragraphs": [
          "The first requirement for an antigen source is **evidence that its protein is present in the tumor population the vaccine is meant to address**, a principle shared by established tumor-antigen prioritization frameworks (**Cheever et al., 2009**). Because transcript abundance does not always predict protein abundance, we began with quantitative proteomics to measure TROP2, B7-H4, Nectin-4, and LIV-1 directly in TNBC tissue."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "PXD024322 contains **88 TNBC tumors and 38 normal-breast samples**, providing quantitative protein measurements across a broad cohort (**Asleh et al., 2022**). PXD028102 contains 66 matched tumor and adjacent-normal pairs within a larger TNBC cohort, allowing tumor-to-normal differences to be estimated within the same patients (**Gong et al., 2022**)."
        ]
      },
      {
        "type": "subheading",
        "id": "model-heading-5",
        "index": "3.1.3.2",
        "title": "PXD024322 provided protein-level evidence for all four candidates",
        "level": 4
      },
      {
        "type": "prose",
        "paragraphs": [
          "All four proteins were quantified in the PXD024322 cohort. **Each candidate showed higher average abundance in tumor tissue**. Nectin-4 and LIV-1 had the largest changes in this dataset, with fold changes of 1.35 and 1.34, followed by B7-H4 at 1.20 and TROP2 at 1.14. **All four comparisons had a false discovery rate (FDR) below 0.05.**"
        ]
      },
      {
        "type": "feature",
        "key": "model-panel-4"
      },
      {
        "type": "prose",
        "paragraphs": [
          "**Figure 6,** Differential protein abundance in PXD024322. Candidate antigens are highlighted against the complete quantified proteome."
        ]
      },
      {
        "type": "figure",
        "src": getModelImage("02_PXD024322_four_target_batch_adjusted_log2_relative_boxplots_no_points.png"),
        "width": 4000,
        "height": 1889,
        "alt": "Abundance distributions of TROP2, B7-H4, Nectin-4, and LIV-1 in the PXD024322 TNBC and normal-breast samples.",
        "caption": "Abundance distributions of TROP2, B7-H4, Nectin-4, and LIV-1 in the PXD024322 TNBC and normal-breast samples.",
        "figureLabel": "FIG. 06"
      },
      {
        "type": "prose",
        "paragraphs": [
          "**Table 3.** Differential protein abundance results from PXD024322 cohort."
        ]
      },
      {
        "type": "table",
        "headers": [
          "**Antigen**",
          "**Gene**",
          "**log2 fold change**",
          "**Fold change**",
          "**FDR**"
        ],
        "rows": [
          [
            "TROP2",
            "*TACSTD2*",
            "0.185",
            "1.14",
            "0.0370"
          ],
          [
            "B7-H4",
            "*VTCN1*",
            "0.268",
            "1.20",
            "0.0446"
          ],
          [
            "Nectin-4",
            "*NECTIN4*",
            "0.435",
            "1.35",
            "7.14 × 10−9"
          ],
          [
            "LIV-1",
            "*SLC39A6*",
            "0.419",
            "1.34",
            "1.88 × 10−5"
          ]
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "In PXD024322, **the quantitative measurements supported all four candidates as protein-level inputs for the next stage.**"
        ]
      },
      {
        "type": "subheading",
        "id": "model-heading-6",
        "index": "3.1.3.3",
        "title": "PXD028102 revealed larger tumor-to-normal differences",
        "level": 4
      },
      {
        "type": "prose",
        "paragraphs": [
          "In PXD028102, **TROP2, B7-H4, and Nectin-4 were more abundant in tumors than in matched adjacent tissue**, with estimated fold changes of 18.25, 3.72, and 7.12, respectively. Together with the PXD024322 measurements for LIV-1, these paired results supported carrying the four-antigen panel forward."
        ]
      },
      {
        "type": "feature",
        "key": "model-panel-5"
      },
      {
        "type": "prose",
        "paragraphs": [
          "**Figure 8,** Paired differential abundance analysis in PXD028102. The paired design highlights tumor-associated changes within the same patients."
        ]
      },
      {
        "type": "figure",
        "src": getModelImage("PXD028102_imputed_log2_boxplots_no_points.png"),
        "width": 4000,
        "height": 2099,
        "alt": "Paired tumor and adjacent-normal abundance patterns for the three candidates quantified in PXD028102.",
        "caption": "Paired tumor and adjacent-normal abundance patterns for the three candidates quantified in PXD028102.",
        "figureLabel": "FIG. 07"
      },
      {
        "type": "prose",
        "paragraphs": [
          "**Table 4.** Paired tumor-to-normal fold changes from PXD028102 cohort."
        ]
      },
      {
        "type": "table",
        "headers": [
          "**Antigen**",
          "**log2 fold change**",
          "**Fold change**",
          "**FDR**"
        ],
        "rows": [
          [
            "TROP2",
            "4.190",
            "18.25",
            "2.14 × 10−15"
          ],
          [
            "B7-H4",
            "1.894",
            "3.72",
            "7.15 × 10−6"
          ],
          [
            "Nectin-4",
            "2.831",
            "7.12",
            "2.13 × 10−11"
          ]
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "The two proteomic cohorts supported the same panel from different directions. PXD024322 provided quantitative protein evidence for all four candidates, while PXD028102 revealed larger tumor-associated differences for TROP2, Nectin-4, and B7-H4 in matched tissue. **This combination of broad protein evidence and tumor-to-normal contrast provided the basis for carrying all four antigens forward.**"
        ]
      },
      {
        "type": "subheading",
        "id": "model-heading-7",
        "index": "3.1.3.4",
        "title": "What we learned from the proteomic data",
        "level": 4
      },
      {
        "type": "prose",
        "paragraphs": [
          "Together, the two proteomic cohorts supported a four-antigen panel from complementary evidence. PXD024322 provided quantitative protein measurements for all four candidates across TNBC tumors, while PXD028102 provided paired tumor-to-adjacent-normal increases for TROP2, Nectin-4, and B7-H4. TROP2 showed the largest paired increase at 18.25-fold, Nectin-4 increased 7.12-fold, and LIV-1 showed higher average abundance in tumor tissue in PXD024322. **This combination gave each antigen a distinct evidence profile in the panel.**"
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "To place these tissue-level protein signals within specific cell types, **we next examined the four genes in single-cell RNA-sequencing data.**"
        ]
      },
      {
        "type": "feature",
        "key": "model-panel-6"
      },
      {
        "type": "subheading",
        "id": "model-heading-11",
        "index": "3.1.4",
        "title": "Single-cell transcriptomic evidence for malignant-cell localization",
        "level": 4
      },
      {
        "type": "subheading",
        "id": "model-heading-12",
        "index": "3.1.4.1",
        "title": "From whole tissue to individual cells",
        "level": 4
      },
      {
        "type": "prose",
        "paragraphs": [
          "Proteomics measured the abundance of the candidate proteins in TNBC tissue, which contains malignant cells alongside immune and stromal cells. For antigen selection, **we also wanted to know which cell populations expressed the genes encoding those proteins**. High expression of a candidate gene in immune, stromal, or normal epithelial cells would weaken the case for prioritizing it as a tumor-directed antigen. We therefore analyzed GSE176078 as a separate, cell-resolved source of evidence (**Wu et al., 2021**). This breast-cancer atlas provides patient identities, author-assigned cell lineages, and raw unique molecular identifier (UMI) counts, allowing us to examine malignant epithelial, immune, stromal, and normal epithelial cells within the same study, with cancer-associated fibroblasts (CAFs) examined separately as a subset of stromal cells. We selected the samples labelled TNBC in the authors' integration configuration, reprocessed their counts with SCTransform and patient-corrected Harmony, and compared the four candidate genes across these compartments. We then measured the proportion of malignant cells in which at least one candidate gene was detected. Together, the two analyses described both candidate protein abundance in tumor tissue and the distribution of the corresponding transcripts among its cell populations."
        ]
      },
      {
        "type": "subheading",
        "id": "model-heading-13",
        "index": "3.1.4.2",
        "title": "Malignant cells formed a broad region with internal substructure",
        "level": 4
      },
      {
        "type": "prose",
        "paragraphs": [
          "After quality control, the TNBC subset contained 39,324 cells, including 24,411 immune cells, **9,491 malignant cells**, 4,786 stromal cells, and 636 normal epithelial cells. Most malignant cells occupied a broad, continuous region in the lower part of the uniform manifold approximation and projection (UMAP). Leiden clustering resolved **five malignant-cell-dominated clusters** within this region, together with a smaller malignant population in a mixed stromal cluster. The map preserved visible structure within the malignant compartment, supporting comparisons across the malignant states represented in the atlas."
        ]
      },
      {
        "type": "figure",
        "src": getModelImage("12_harmony_umap_major_lineage_no_panel_letter.png"),
        "width": 2499,
        "height": 2129,
        "alt": "Patient-corrected UMAP of 39,324 cells from GSE176078.",
        "caption": "Patient-corrected UMAP of 39,324 cells from GSE176078.",
        "figureLabel": "FIG. 08"
      },
      {
        "type": "prose",
        "paragraphs": [
          "We therefore calculated candidate-gene detection across the full malignant compartment, capturing all malignant states represented in the atlas."
        ]
      },
      {
        "type": "subheading",
        "id": "model-heading-14",
        "index": "3.1.4.3",
        "title": "All four genes were preferentially expressed in malignant cells",
        "level": 4
      },
      {
        "type": "prose",
        "paragraphs": [
          "Patient-aware pseudobulk analysis compared malignant cells with the combined immune and stromal compartments. **All four candidates were enriched in malignant cells.** *VTCN1* and *NECTIN4* showed the largest differences, followed by *TACSTD2*, while *SLC39A6* retained a positive malignant-cell preference across patients."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "**Table 5.** Single-cell detection rates and fold changes for candidate genes across cell types."
        ]
      },
      {
        "type": "table",
        "headers": [
          "**Gene**",
          "**Antigen**",
          "**Malignant versus non-malignant log2 fold change**",
          "**FDR**",
          "**Malignant-cell detection rate**",
          "**Immune-cell detection rate**",
          "**CAF detection rate**"
        ],
        "rows": [
          [
            "*TACSTD2*",
            "TROP2",
            "4.074",
            "8.37 × 10−5",
            "70.4%",
            "4.0%",
            "5.4%"
          ],
          [
            "*SLC39A6*",
            "LIV-1",
            "0.853",
            "0.0196",
            "39.4%",
            "8.5%",
            "20.7%"
          ],
          [
            "*NECTIN4*",
            "Nectin-4",
            "4.755",
            "3.70 × 10−6",
            "37.8%",
            "1.0%",
            "0.6%"
          ],
          [
            "*VTCN1*",
            "B7-H4",
            "5.393",
            "2.52 × 10−5",
            "19.8%",
            "0.3%",
            "0.4%"
          ]
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Detection rates are the fractions of cells with at least one raw count for the gene after pooling cells from the 10 TNBC patients within each group. These pooled rates are descriptive. The log2 fold changes and FDR values retain their patient-aware malignant-versus-combined-immune-and-stromal comparison."
        ]
      },
      {
        "type": "figure",
        "src": getModelImage("11_candidate_umap_violin_broken_axis_clean.png"),
        "width": 3002,
        "height": 4000,
        "alt": "Candidate-gene expression in the GSE176078 TNBC single-cell dataset.",
        "caption": "Candidate-gene expression in the GSE176078 TNBC single-cell dataset.",
        "figureLabel": "FIG. 09"
      },
      {
        "type": "subheading",
        "id": "model-heading-15",
        "index": "3.1.4.4",
        "title": "At least one candidate gene was detected in 81.4% of malignant cells",
        "level": 4
      },
      {
        "type": "prose",
        "paragraphs": [
          "*TACSTD2* and *SLC39A6* were detected in the largest fractions of malignant cells, while *NECTIN4* and *VTCN1* marked additional malignant-cell groups. Across the dataset, **81.4% of malignant cells expressed at least one candidate gene**, with patient-level values ranging from 52.5% to 97.8%."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Pairwise Jaccard  indices (**Jaccard, 1912**) among gene-positive malignant cells ranged from 0.221 to 0.438. The four-gene pattern occurred in 7.3% of malignant cells, while the remaining gene-positive cells showed one-, two-, or three-gene patterns. **Together, these patterns reveal complementary coverage across malignant cells.**"
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "The single-cell result described variation among cells within tumors. **We then used cBioPortal to ask how often the four candidates occurred across different patients.**"
        ]
      },
      {
        "type": "figure",
        "src": getModelImage("pipeline Sc (1).png"),
        "width": 1055,
        "height": 1884,
        "alt": "Single-cell RNA sequencing workflow across TNBC samples",
        "caption": "Single-cell RNA sequencing workflow across 10 TNBC samples, identifying candidate gene expression in 81.4% of malignant cells.",
        "figureLabel": "FIG. 10",
        "className": "model-figure--workflow"
      },
      {
        "type": "feature",
        "key": "model-panel-7"
      },
      {
        "type": "subheading",
        "id": "model-heading-16",
        "index": "3.1.5",
        "title": "Patient coverage and clinical relevance of the multi-antigen panel",
        "level": 4
      },
      {
        "type": "subheading",
        "id": "model-heading-17",
        "index": "3.1.5.1",
        "title": "At least one candidate met the gene-level rule in 88% of TNBC cases",
        "level": 4
      },
      {
        "type": "prose",
        "paragraphs": [
          "We queried 115 TNBC cases from the TCGA Breast Invasive Carcinoma PanCancer Atlas in cBioPortal (**Cerami et al., 2012**, **Gao et al., 2013**). Under a predefined Onco Query Language rule, a case met the criterion for a gene if its messenger RNA (mRNA) z-score was at least 0.5 or it had a high-level copy-number amplification (**cBioPortal, n.d.**). The corresponding genes for TROP2, B7-H4, Nectin-4, and LIV-1 met this rule in 38%, 31%, 79%, and 4% of cases, respectively. **At least one gene met the rule in 101 of 115 cases, or 88%.**"
        ]
      },
      {
        "type": "figure",
        "src": getModelImage("Screenshot 2026-08-31 174114.png"),
        "width": 2531,
        "height": 919,
        "alt": "Genomic coverage of the four-antigen panel across 115 TCGA TNBC patients.",
        "caption": "Genomic coverage of the four-antigen panel across 115 TCGA TNBC patients.",
        "figureLabel": "FIG. 11"
      },
      {
        "type": "prose",
        "paragraphs": [
          "The 38% for TROP2 and the higher protein-positivity rates reported in clinical TNBC tissue studies come from different cohorts and different measurements. Our cBioPortal analysis counts cases with relatively elevated *TACSTD2* mRNA or high-level amplification under a fixed rule (**cBioPortal, n.d.**), whereas immunohistochemistry detects TROP2 protein in tumor cells. **This distinction matters because mRNA abundance does not fully predict protein abundance in breast tumors** (**Tang et al., 2018**). Applying the same gene-level rule to all four candidates let us compare their distribution across patients and see how many additional cases met the rule when the genes were combined. Immunohistochemical protein-positivity rates in clinical tissue are presented below in *Histopathological validation of candidate antigens*."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "**Table 6.** Genomic coverage of individual antigens and four-antigen panel in TCGA TNBC patients."
        ]
      },
      {
        "type": "table",
        "headers": [
          "**Antigen**",
          "**Gene**",
          "**Patients meeting the predefined rule**"
        ],
        "rows": [
          [
            "TROP2",
            "*TACSTD2*",
            "38%"
          ],
          [
            "B7-H4",
            "*VTCN1*",
            "31%"
          ],
          [
            "Nectin-4",
            "*NECTIN4*",
            "79%"
          ],
          [
            "LIV-1",
            "*SLC39A6*",
            "4%"
          ],
          [
            "At least one of the four",
            "—",
            "101/115, 88%"
          ]
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "**Nectin-4 alone met the rule in 79% of patients.** Adding the other three genes increased the union to 88%, covering ten additional patients under the same rule. This increase, together with the partly overlapping single-cell detection patterns, was the reason we retained all four antigen sources."
        ]
      },
      {
        "type": "subheading",
        "id": "model-heading-18",
        "index": "3.1.5.2",
        "title": "Patient-coverage analysis methods",
        "level": 4
      },
      {
        "type": "subheading",
        "id": "model-heading-19",
        "index": "3.1.5.2.1",
        "title": "TCGA patient-coverage analysis",
        "level": 4
      },
      {
        "type": "prose",
        "paragraphs": [
          "We opened the Breast Invasive Carcinoma PanCancer Atlas study in cBioPortal and selected the cases classified as TNBC, producing a cohort of **115 patients** (**Cerami et al., 2012**, **Gao et al., 2013**). The four genes were queried together with the cBioPortal Onco Query Language shown below (**cBioPortal, n.d.**). `AMP` denotes a high-level amplification called by Genomic Identification of Significant Targets in Cancer (GISTIC). `EXP>=0.5` denotes an mRNA z-score at least 0.5 above the mean of the expression reference population selected by the portal."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "A patient met the rule for a gene when **either** `AMP` or `EXP>=0.5` was present. Individual reach was calculated by dividing the number of patients meeting the rule for that gene by 115. Panel reach was calculated **once for the union of the four gene-positive sets**, so a patient meeting several gene rules was counted only once. The resulting union contained **101 patients**. The OncoPrint and patient-level event table were retained as the source for the four individual percentages and the **88% combined value**. This calculation measured the distribution of the four candidates across TNBC patients. Tumor-to-normal abundance was assessed separately in the proteomic cohorts."
        ]
      },
      {
        "type": "subheading",
        "id": "model-heading-20",
        "index": "3.1.6",
        "title": "Histopathological validation of candidate antigens",
        "level": 4
      },
      {
        "type": "subheading",
        "id": "model-heading-21",
        "index": "3.1.6.1",
        "title": "Returning the candidates to tissue architecture",
        "level": 4
      },
      {
        "type": "prose",
        "paragraphs": [
          "To add tissue architecture to the model, we assembled representative immunohistochemistry panels for all four candidates from open-access publications and cite each source alongside the image. **These panels place the proteomic and single-cell findings in the context of intact breast-cancer tissue.**"
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Proteomics measured abundance across tissue samples, while single-cell RNA sequencing resolved expression by cell type. **Immunohistochemistry added tissue-level protein-expression evidence** through staining intensity, the proportion of positive tumor cells, and tumor-to-normal comparisons. This was especially informative for TROP2, B7-H4, Nectin-4, and LIV-1 because each is membrane associated and has been investigated as a therapeutic target."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "We therefore reviewed TNBC studies that reported staining intensity, scoring method, cellular staining pattern, and tumor-to-normal comparisons. **These tissue measurements allowed us to compare protein-expression patterns for each antigen with the evidence already obtained from proteomics, single-cell data, and patient-level analysis.**"
        ]
      },
      {
        "type": "feature",
        "key": "model-panel-8"
      },
      {
        "type": "subheading",
        "id": "model-epitope-screening",
        "index": "3.2",
        "title": "Epitope Screening",
        "level": 3
      },
      {
        "type": "subheading",
        "id": "model-heading-34",
        "index": "3.2.1",
        "title": "HLA-I-restricted candidate epitope prediction",
        "level": 4
      },
      {
        "type": "prose",
        "paragraphs": [
          "We extracted the canonical protein sequences of TROP2, B7-H4, Nectin-4, and LIV-1, submitted them to the IEDB MHC-I binding prediction tool, and specified HLA-A*02:01 as the restriction allele, which generated 1,838 overlapping 9-mer peptides for evaluation. A two-stage screening strategy then filtered these candidates: IEDB-based computational prediction assessed binding affinity (IC₅₀ < 500 nM), immunogenicity score, and source-protein topology, reducing the set to 17 peptides, followed by AlphaFold3 structural modeling of peptide-MHC complexes to confirm stable presentation geometry, which yielded 15 final epitopes for experimental validation. The sections below describe the filtering criteria, structural assessments, and the rationale that defined this testable set."
        ]
      },
      {
        "type": "subheading",
        "id": "model-heading-35",
        "index": "3.2.1.1",
        "title": "IEDB T Cell Epitope Prediction: MHC Class I Tools Suite",
        "level": 4
      },
      {
        "type": "prose",
        "paragraphs": [
          "We chose the Immune Epitope Database and Analysis Resource (IEDB) for this **first-pass screen** because it is a widely used reference platform for T-cell epitope prediction and a practical gold-standard framework in the field, with curated methods, published benchmarks, and explicit prediction settings (**Yan et al., 2024**). Scanning the canonical protein sequences of TROP2, B7-H4, Nectin-4, and LIV-1 yielded **1,838 overlapping 9-mer peptides**. We submitted the four sequences to the IEDB T Cell Epitope Prediction platform under the MHC Class I Tools Suite, using HLA-A*02:01 as the restricting allele. The task combined **three complementary readouts**. **NetMHCpan 4.1 EL** evaluated how closely each peptide resembled naturally eluted HLA ligands (**Reynisson et al., 2020**). The **Basic Processing Predictions** module combined NetMHCpan 4.1 BA with immunoproteasome cleavage and transporter associated with antigen processing (TAP) transport. We used the immunoproteasome setting, a maximum precursor extension of 1, and an alpha factor of 0.2 (**Peters et al., 2003**, **Tenzer et al., 2005**). The **Class I pMHC Immunogenicity model** assessed peptide-intrinsic sequence features after masking positions 1, 2, and the C-terminal residue, reducing the direct influence of the principal HLA anchor positions (**Calis et al., 2013**). Together, these outputs allowed us to compare HLA-A*02:01 binding, resemblance to naturally presented ligands, antigen-processing conditions, and peptide features associated with T-cell recognition."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "We began with **HLA-A*02:01** because it is common in several studied populations and has a substantial experimental base for peptide prediction. In a high-resolution cohort spanning **12 populations**, **HLA-A*02:01**:01:01 was the **most frequent allele overall**, although its frequency differed among populations (**Creary et al., 2021**). A separate survey of **74 SARS-CoV-2 T-cell studies** found that **HLA-A*02:01** was examined in 55, more than any other allele (**Slieker et al., 2024**). These data made it a **practical starting point** for building and testing a reproducible screening workflow. We discuss its extension to other alleles below."
        ]
      },
      {
        "type": "subheading",
        "id": "model-heading-36",
        "index": "3.2.1.2",
        "title": "A staged screen reduced 1,838 peptides to 17 candidates",
        "level": 4
      },
      {
        "type": "prose",
        "paragraphs": [
          "The NetMHCpan 4.1 binding-affinity (BA) model reduced the **1,838 overlapping 9-mers** to **83 peptides** with a predicted half-maximal inhibitory concentration (IC₅₀) **below 500 nM**. IEDB lists 500 nM as an established affinity cutoff for selecting HLA-I binders, so this first step prioritized peptides with plausible HLA-A*02:01 binding (**IEDB, 2024**). We then retained peptides with an IEDB HLA-I immunogenicity score **above zero**, leaving **51**. This score weighs amino acids outside the main HLA anchor positions; a positive value favored sequences with features associated with T-cell recognition after binding (**Calis et al., 2013**, **IEDB, 2024**). Finally, we reviewed where each peptide came from in its source protein and selected **17 candidates** for experimental testing."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "The **83 affinity-filtered peptides** included **17 from TROP2**, 13 from B7-H4, 15 from Nectin-4, and 38 from LIV-1. The immunogenicity threshold retained 9, 10, 10, and 22 peptides, respectively. A subsequent review of source-protein coordinates and UniProt topology annotations was used to assemble the experimental panel, which contained 4 TROP2, 2 B7-H4, 6 Nectin-4, and 5 LIV-1 peptides, giving **17 candidates in total**."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "**Table 7.** Epitope screening results across filtering stages for four antigens."
        ]
      },
      {
        "type": "table",
        "headers": [
          "**Screening stage**",
          "**TROP2**",
          "**B7-H4**",
          "**Nectin-4**",
          "**LIV-1**",
          "**Total**"
        ],
        "rows": [
          [
            "All overlapping 9-mers",
            "315",
            "274",
            "502",
            "747",
            "1,838"
          ],
          [
            "Predicted IC₅₀ < 500 nM",
            "17",
            "13",
            "15",
            "38",
            "83"
          ],
          [
            "IEDB immunogenicity score > 0",
            "9",
            "10",
            "10",
            "22",
            "51"
          ],
          [
            "Final candidates after topology review",
            "4",
            "2",
            "6",
            "5",
            "17"
          ]
        ]
      },
      {
        "type": "subheading",
        "id": "model-heading-37",
        "index": "3.2.1.3",
        "title": "Protein-context review of the 51 numerically filtered peptides",
        "level": 4
      },
      {
        "type": "prose",
        "paragraphs": [
          "Applying both numerical thresholds retained **51 peptides**: nine from TROP2, ten from B7-H4, ten from Nectin-4, and twenty-two from LIV-1. Our **circRNA** encodes the selected epitopes in one polypeptide, from which the target peptides must be released by **intracellular processing**. The hydrophobic cores of full signal peptides and membrane anchors can direct nascent proteins to the **endoplasmic reticulum** (**Rapoport, 2007**). If a similar targeting signal formed in the tandem product, it could redirect the entire polypeptide and alter the release of its intended epitopes. We therefore checked each candidate's source region against UniProt annotations (**UniProt Consortium, 2025**) and reviewed its amino-acid composition. This review excluded 34 peptides and reduced the amount of hydrophobic sequence from these regions in the tandem product. The remaining 17 formed the experimental panel."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "The table places the numerical evidence beside the decision made for every peptide. **Predicted IC**₅₀ from NetMHCpan 4.1 BA estimates peptide–HLA binding affinity, the **eluted-ligand (EL) percentile rank** measures similarity to naturally eluted HLA ligands relative to other peptides, and the **immunogenicity score** evaluates sequence features after the principal HLA anchor positions are masked. **Only the BA-derived** IC₅₀ and the pMHC **immunogenicity score** defined the **numerical gates**. EL and processing outputs were retained as supporting records rather than additional pass-or-fail criteria."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "**Table 8.** IEDB predictions and topology review for 51 numerically filtered peptides."
        ]
      },
      {
        "type": "feature",
        "key": "model-panel-9"
      },
      {
        "type": "prose",
        "paragraphs": [
          "The final panel contained **17 peptides**: four from TROP2, two from B7-H4, six from Nectin-4, and five from LIV-1. The table records the topology annotation and the final panel decision for each of the **51 numerically filtered peptides**."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "The complete IEDB outputs remain available in the full screening dataset."
        ]
      },
      {
        "type": "figure",
        "src": getModelImage("IEDB pipeline (1).png"),
        "width": 1538,
        "height": 1791,
        "alt": "IEDB inputs, parameters, and filtering rules",
        "caption": "IEDB inputs, parameters, and filtering rules for candidate epitope prediction and topological screening.",
        "figureLabel": "FIG. 16",
        "className": "model-figure--workflow"
      },
      {
        "type": "feature",
        "key": "model-panel-10"
      },
      {
        "type": "subheading",
        "id": "model-structural-validation",
        "index": "3.2.2",
        "title": "Structural validation of the 17 candidates",
        "level": 4
      },
      {
        "type": "prose",
        "paragraphs": [
          "The 17 IEDB-selected peptides met sequence-based criteria for HLA-A*02:01 binding and immunogenicity, but computational predictions cannot confirm whether a peptide will form a stable, well-presented complex in three dimensions or adopt a geometry suitable for T-cell receptor recognition. We used AlphaFold3 to model the structure of each peptide bound to HLA-A*02:01 and assessed complex stability, peptide conformation within the binding groove, and the predicted interface quality for TCR engagement **(Abramson et al., 2024).** This step sits between epitope prediction and experimental testing, asking whether each predicted binder can adopt a plausible loading geometry."
        ]
      },
      {
        "type": "subheading",
        "id": "model-heading-38",
        "index": "3.2.2.1",
        "title": "Models generation",
        "level": 4
      },
      {
        "type": "prose",
        "paragraphs": [
          "We submitted each of the **17 candidates** once to AlphaFold 3 (Abramson et al., 2024). Each submission returned **five sampled models**, for **85 in total**. We included **all five** in the measurements. Variation across the five models was used to assess which structural features were consistent across samples."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Confidence scores were high across **all 85 models**, with **ipTM values ranging from 0.950 to 0.970** (median 0.970), but they **did not distinguish** candidates that passed **structural review** from those that failed (interactive confidence plot). The two rejected peptides, **FLAEASVRG and HILHVSFLA**, had mean ipTM scores of **0.968 and 0.960**, both within the range of accepted candidates. AlphaFold3's own **confidence metric** reports whether a model is self-consistent, not whether the peptide fits the groove correctly. We therefore assessed binding geometry separately using structural measurements derived from the predicted coordinates."
        ]
      },
      {
        "type": "feature",
        "key": "model-panel-11"
      },
      {
        "type": "prose",
        "paragraphs": [
          "**Figure 17,** AlphaFold3 confidence scores and position-9 fill ratio for 17 peptides."
        ]
      },
      {
        "type": "subheading",
        "id": "model-heading-39",
        "index": "3.2.2.2",
        "title": "Evaluation criteria",
        "level": 4
      },
      {
        "type": "subheading",
        "id": "model-heading-40",
        "index": "3.2.2.3",
        "title": "What correct loading looks like",
        "level": 4
      },
      {
        "type": "prose",
        "paragraphs": [
          "The MHC class I groove is **closed at both ends**, and two types of interaction hold the peptide in place. First, side chains at **positions 2 and 9** (the C-terminus) insert into the **B and F pockets**, respectively; this anchoring depends on the peptide sequence. Second, heavy-chain residues form a **conserved hydrogen-bond network** with the peptide backbone **(Saper et al., 1991, Madden, 1995).** **Eleven of these bonds** recur in HLA-A*02:01 complexes. Because they contact the backbone rather than side chains, we used them as the expected pattern for a correctly loaded 9-mer, regardless of sequence. This provides a countable criterion and an internal positive control."
        ]
      },
      {
        "type": "feature",
        "key": "model-structural-confirmation"
      },
      {
        "type": "subheading",
        "id": "model-heading-41",
        "index": "3.2.2.4",
        "title": "The conserved network is complete in all seventeen candidates",
        "level": 4
      },
      {
        "type": "prose",
        "paragraphs": [
          "Across 85 models and 935 bond determinations, 3 bonds were missing. No bond was absent from all five models of any candidate. This pattern supports the expected loading geometry across the 17 candidates."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "A peptide placed too shallowly, shifted by one residue, or reversed in the groove would be expected to lose several of these contacts. The observed pattern is consistent with the intended chain assignment and peptide orientation, but does not by itself verify every preprocessing step."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "All three missing determinations involved the same bond, between Lys146 and the C-terminal carboxylate. Each occurred in one model only, in GVATLAWMV, GLHNFSDGL or FLAEASVRG. These isolated model-level absences did not change the candidate-level verdicts."
        ]
      },
      {
        "type": "subheading",
        "id": "model-heading-42",
        "index": "3.2.2.5",
        "title": "Both ends are anchored, while central side chains remain more exposed",
        "level": 4
      },
      {
        "type": "prose",
        "paragraphs": [
          "The interactive heatmap below summarizes side-chain burial by position across the 17 candidates. The anchor positions are most buried, while several central side chains remain more exposed toward the T-cell receptor."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Positions 2 and 9 were highly buried across the 17 candidates: 99.0%–99.9% and 99.4%–100.0%, with medians of 99.8% and 100.0%, respectively. These values confirm the two-anchor pattern but do not distinguish candidates in this dataset. Positions 4 and 8 were more exposed, with median burial of 22.6% and 44.1%; positions 5 and 6 varied most, ranging from 17.8% to 95.3% and from 10.8% to 98.1%, respectively."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "The total TCR-facing surface area varied across candidates, from a mean of 147 Å² for WLKEGVLGL to 424 Å² for FQARLRLRV, a nearly threefold range. Burial measures anchor fit; the TCR-facing area measures how much peptide surface remains exposed after loading."
        ]
      },
      {
        "type": "feature",
        "key": "model-panel-12"
      },
      {
        "type": "prose",
        "paragraphs": [
          "**Heatmap Overview:** Per-position side-chain burial for 17 epitopes across five models."
        ]
      },
      {
        "type": "subheading",
        "id": "model-heading-43",
        "index": "3.2.2.6",
        "title": "Measurements at the two ends converge across models; those in the middle do not",
        "level": 4
      },
      {
        "type": "prose",
        "paragraphs": [
          "We assessed variation across models before interpreting the means. The median standard deviation was 0.0 percentage points at both positions 2 and 9, with maxima of 0.1 and 0.6, respectively. At positions 5 and 6, the medians were 5.5 and 4.8 percentage points, with greater variation in some candidates (Figure 17). We therefore use anchor-position measurements as criteria and report central-segment values as observations."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "This pattern was observed across all 17 candidates."
        ]
      },
      {
        "type": "figure",
        "src": getModelImage("image 9.png"),
        "width": 863,
        "height": 571,
        "alt": "Standard deviation of side-chain burial across models.",
        "caption": "Standard deviation of side-chain burial across models.",
        "figureLabel": "FIG. 17"
      },
      {
        "type": "subheading",
        "id": "model-heading-44",
        "index": "3.2.2.7",
        "title": "A percentage does not reveal whether the F pocket is full",
        "level": 4
      },
      {
        "type": "prose",
        "paragraphs": [
          "Burial fraction is normalized by the side chain's own surface area, so it does not show how much absolute area fills the pocket. In this dataset, three candidates had the same position-9 burial of 99.4%, but their absolute buried areas were 60.1, 143.8 and 173.3 Å²."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "We therefore used absolute buried area for position 9 and expressed it relative to a leucine anchor side chain: fill ratio = absolute buried area of the position-9 side chain ÷ 140 Å². Two candidates fell below the criterion: FLAEASVRG at 0.0% and HILHVSFLA at 42.9% (chart below). Both were rejected at this tier."
        ]
      },
      {
        "type": "feature",
        "key": "model-panel-13"
      },
      {
        "type": "feature",
        "key": "model-panel-14"
      },
      {
        "type": "prose",
        "paragraphs": [
          "**Volume Distribution:** Absolute buried area of position-9 side chain for 17 systems."
        ]
      },
      {
        "type": "subheading",
        "id": "model-heading-45",
        "index": "3.2.2.8",
        "title": "Results for all seventeen systems",
        "level": 4
      },
      {
        "type": "prose",
        "paragraphs": [
          "**Table 11.** Acceptance criteria for structural tier validation."
        ]
      },
      {
        "type": "table",
        "headers": [
          "**Criterion**",
          "**Threshold**",
          "**Basis**"
        ],
        "rows": [
          [
            "Position-2 side-chain burial",
            "≥ 90% in every model",
            "B-pocket filling"
          ],
          [
            "Position-9 side-chain burial",
            "≥ 90% in every model",
            "F-pocket filling"
          ],
          [
            "Conserved hydrogen-bond   network",
            "≥ 10 of 11 in every model",
            "Loading geometry"
          ],
          [
            "Interface steric clash",
            "no < 2.2 Å contact   recurring in all models",
            "Geometric plausibility"
          ],
          [
            "Across-model consistency",
            "identical verdict in all five   models",
            "Excludes single-model noise"
          ],
          [
            "Position-9 side-chain fill   ratio",
            "≥ 60%, i.e. ≥ 84 Å²",
            "F-pocket fill volume"
          ]
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Under these criteria, **2 of the 17 candidates failed**. **FLAEASVRG** has glycine at position 9 and therefore no side chain to fill the F pocket; all five models failed this criterion. **HILHVSFLA** has alanine at position 9 and a fill ratio of 42.9%, below the lower bound. **The other 15 candidates passed all six criteria**."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "**Results**",
          "**Table 12.** Structural QC results for 17 peptide-MHC systems across five models."
        ]
      },
      {
        "type": "table",
        "headers": [
          "**Antigen**",
          "**Peptide**",
          "**P2 (%)**",
          "**Position 9 (%)**",
          "**Position-9 fill (Å² / %)**",
          "**Conserved network**",
          "**TCR face (Å²)**",
          "**Verdict**"
        ],
        "rows": [
          [
            "TROP2",
            "RLFRERYRL",
            "99.8",
            "99.7",
            "143.8 / 103",
            "11/11",
            "374",
            "Pass"
          ],
          [
            "TROP2",
            "SVCWCVNSV",
            "99.8",
            "100.0",
            "114.4 / 82",
            "11/11",
            "245",
            "Pass"
          ],
          [
            "TROP2",
            "TLIYYLDEI",
            "99.8",
            "100.0",
            "140.0 / 100",
            "11/11",
            "361",
            "Pass"
          ],
          [
            "TROP2",
            "YLDEIPPKF",
            "99.8",
            "99.4",
            "173.3 / 124",
            "11/11",
            "270",
            "Pass"
          ],
          [
            "B7-H4",
            "AVFADQVIV",
            "99.8",
            "100.0",
            "115.1 / 82",
            "11/11",
            "252",
            "Pass"
          ],
          [
            "B7-H4",
            "WLKEGVLGL",
            "99.8",
            "99.9",
            "140.2 / 100",
            "11/11",
            "147",
            "Pass"
          ],
          [
            "Nectin-4",
            "AVTSEFHLV",
            "99.9",
            "100.0",
            "114.3 / 82",
            "11/11",
            "240",
            "Pass"
          ],
          [
            "Nectin-4",
            "FLAEASVRG",
            "99.8",
            "undefined",
            "0.0 / 0",
            "10/11",
            "293",
            "Rejected"
          ],
          [
            "Nectin-4",
            "FQARLRLRV",
            "99.0",
            "100.0",
            "113.7 / 81",
            "11/11",
            "424",
            "Pass"
          ],
          [
            "Nectin-4",
            "HILHVSFLA",
            "99.9",
            "99.4",
            "60.1 / 43",
            "11/11",
            "269",
            "Rejected"
          ],
          [
            "Nectin-4",
            "RLRVLVPPL",
            "99.8",
            "100.0",
            "139.6 / 100",
            "11/11",
            "259",
            "Pass"
          ],
          [
            "Nectin-4",
            "YINGRGHLV",
            "99.9",
            "100.0",
            "113.5 / 81",
            "11/11",
            "226",
            "Pass"
          ],
          [
            "LIV-1",
            "FIGHYAENV",
            "99.9",
            "100.0",
            "113.9 / 81",
            "11/11",
            "249",
            "Pass"
          ],
          [
            "LIV-1",
            "GLHNFSDGL",
            "99.7",
            "99.7",
            "139.8 / 100",
            "10/11",
            "222",
            "Pass"
          ],
          [
            "LIV-1",
            "GVATLAWMV",
            "99.8",
            "100.0",
            "113.3 / 81",
            "10/11",
            "280",
            "Pass"
          ],
          [
            "LIV-1",
            "SVAVFCHEL",
            "99.8",
            "99.7",
            "139.8 / 100",
            "11/11",
            "277",
            "Pass"
          ],
          [
            "LIV-1",
            "TVSEGTHFL",
            "99.8",
            "99.7",
            "139.5 / 100",
            "11/11",
            "234",
            "Pass"
          ]
        ]
      },
      {
        "type": "subheading",
        "id": "model-heading-46",
        "index": "3.2.2.9",
        "title": "Co-folding setup",
        "level": 4
      },
      {
        "type": "prose",
        "paragraphs": [
          "We submitted each peptide with the **HLA-A*02:01** heavy chain and **β2-microglobulin**, using the heavy-chain sequence from Protein Data Bank entry 3UTQ. We included **β2-microglobulin** because MHC class I is a **ternary complex** of heavy chain, **β2-microglobulin** and peptide. Although **β2-microglobulin** does not contact the peptide, it supports the α1/α2 platform that forms the groove. **Structural templates were enabled**. The ModelCIF and confidence JSON files for **all 85 models** are included in the archive described at the end of this section."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "AlphaFold 3 returns ModelCIF files, which require **preprocessing** before hydrogen bonds can be counted. We applied the **same seven steps** to all **17 candidates**. The workflow below uses TROP2 peptide **SVCWCVNSV** as an example and reports the result at each step."
        ]
      },
      {
        "type": "feature",
        "key": "model-panel-16"
      },
      {
        "type": "subheading",
        "id": "model-heading-47",
        "index": "3.2.2.10",
        "title": "Applying the workflow to the remaining sixteen",
        "level": 4
      },
      {
        "type": "prose",
        "paragraphs": [
          "We applied the **same seven steps** and parameters to the remaining 16 candidates, bringing the analysis to **85 models in total**. Across these models, **69 were classified as Pass**, **11 as Warning** (9 with an amide or histidine flip candidate awaiting correction, and 2 with one interface contact shorter than 2.2 Å), and **5 as Fail**. All five Fail models came from Nectin-4 peptide **FLAEASVRG**, whose **position-9 glycine** has no side chain to bury in the **F pocket**."
        ]
      },
      {
        "type": "subheading",
        "id": "model-heading-48",
        "index": "3.2.2.11",
        "title": "Data and code availability",
        "level": 4
      },
      {
        "type": "prose",
        "paragraphs": [
          "The public archive contains the **raw and processed data** for this section: AlphaFold 3 job requests and returned ModelCIF and confidence files for **all 85 models**; cleaned and preprocessed PDB files; per-model and per-system result tables; the data and scripts for the structural confidence, side-chain burial, variability, and position-9 charts; and the analysis pipeline. These files and scripts are provided to support **reproduction** of the reported measurements."
        ]
      },
      {
        "type": "subheading",
        "id": "model-discussion",
        "index": "3.3",
        "title": "Discussion",
        "level": 3
      },
      {
        "type": "prose",
        "paragraphs": [
          "The antigen and epitope selection process combined evidence from multiple biological scales to define a compact, validated input set for circRNA vaccine design. Four tumor-associated antigens—TROP2, B7-H4, Nectin-4, and LIV-1—were evaluated through quantitative proteomics in two TNBC cohorts, single-cell transcriptomics across ten patients, patient-level genomic profiling in TCGA, and published immunohistochemistry studies. All four proteins showed tumor-enriched abundance, preferential expression in malignant cells, and collective coverage of 88% of TNBC cases. From the canonical sequences of these four antigens, we generated 1,838 overlapping 9-mer peptides and applied a two-stage screening strategy: IEDB computational prediction filtered candidates by HLA-A*02:01 binding affinity, immunogenicity score, and source-protein topology, reducing the set to 17 peptides, followed by AlphaFold3 structural modeling to assess peptide-MHC complex stability and geometry, which yielded 15 final epitopes. This progression—from tissue-level protein validation to cell-type localization, patient coverage assessment, sequence-based epitope prediction, and structural confirmation—addressed the key feasibility questions at each stage and produced a defined set of targets for experimental testing."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Several aspects of the pipeline were not pursued due to resource and timeline constraints. Immunopeptidomics—mass spectrometry of peptides eluted from tumor-cell MHC—would directly confirm that our predicted epitopes are naturally presented, but this requires fresh or frozen primary TNBC tissue and specialized HLA immunoprecipitation protocols that were not accessible within the project scope. Molecular dynamics simulations would assess whether the predicted peptide-MHC conformations remain stable over time, but running microsecond-scale simulations with adequate replicates for 15 candidates exceeded available computational resources and would have delayed delivery. We also restricted epitope selection to HLA-A*02:01 to establish the workflow within a manageable timeframe; expanding to additional alleles such as A*24:02 or A*03:01 would increase patient coverage but requires repeating the prediction and validation pipeline for each new restriction element."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Through this integrated workflow—AEIPV (Antigen-Epitope Integration Pipeline for Vaccination)—we completed the selection of four antigens and the screening of 15 HLA-A*02:01-restricted epitopes from an initial pool of 1,838 candidates. These outputs were forwarded to the wet lab for experimental T-cell activation assays. Based on the experimental results, a subset of these epitopes will be selected to construct the final circRNA vaccine, which will encode concatenated epitopes from the four validated antigens. This computational framework provides a systematic, evidence-based approach to antigen and epitope selection that can be adapted to other tumor types, expanded to additional HLA alleles, and refined as new validation data become available."
        ]
      },
      {
        "type": "subheading",
        "id": "model-downloads",
        "index": "3.3.1",
        "title": "Reproducibility and downloads",
        "level": 4
      },
      {
        "type": "prose",
        "paragraphs": [
          "The following inventory defines the reproducibility package for this page and keeps each conclusion connected to its input, parameter set, and output.",
          "**Table 14.** Reproducibility package for AEIP showing public inputs, key parameters, and team outputs for each component."
        ]
      },
      {
        "type": "table",
        "headers": [
          "**Component**",
          "**Public input**",
          "**Key recorded parameters**",
          "**Team output**"
        ],
        "rows": [
          [
            "Proteomics",
            "PXD024322 and PXD028102",
            "Cohort definition, pairing, TMT batch, differential model, FDR method",
            "Differential-abundance tables and candidate plots"
          ],
          [
            "Single-cell analysis",
            "GSE176078",
            "TNBC sample list, quality control, SCTransform v2, 3,000 variable genes, Harmony components, Leiden resolution, pseudobulk design",
            "Cell metadata, UMAPs, detection table, differential-expression table, CID3963 sensitivity analysis"
          ],
          [
            "Patient coverage",
            "TCGA Breast Invasive Carcinoma PanCancer Atlas",
            "115 TNBC cases, `AMP EXP>=0.5`, union across four genes",
            "Patient-level coverage table and OncoPrint"
          ],
          [
            "Histopathology",
            "Peer-reviewed human tissue studies, with TNBC-specific studies for prevalence",
            "Sample size, tissue setting, localization, scoring rule",
            "Evidence table with source-level citations"
          ],
          [
            "Epitope prediction",
            "UniProt canonical sequences and IEDB Class I workflow",
            "HLA-A*02:01, 9-mers, NetMHCpan 4.1 EL and BA, immunoproteasome, TAP extension 1, alpha 0.2, masked positions 1, 2, and C terminus",
            "Complete prediction exports, the 51-candidate topology table, and the final 17-peptide set"
          ],
          [
            "AlphaFold 3 structure prediction",
            "Cleaned and preprocessed PDB files",
            "85 models total, AlphaFold 3 job requests, ModelCIF format, confidence scoring method",
            "ModelCIF and confidence files for all 85 models, per-model and per-system result tables, data and scripts for the structural confidence, side-chain burial, variability, and position-9 charts, analysis pipeline"
          ]
        ]
      },
      {
        "type": "feature",
        "key": "model-downloads"
      }
    ]
  },
  {
    "id": "model-cell2dose",
    "index": "04",
    "kicker": "Cell2Dose",
    "navLabel": "Cell2Dose",
    "title": "Cell2Dose",
    "summary": "",
    "blocks": [
      {
        "type": "prose",
        "paragraphs": [
          "**Cell-based assays** can validate the in vitro activity of our vaccine, but they cannot directly answer questions about **dose selection**, **delivery efficiency**, and **immune conversion** in animals. If these questions all rely on trial-and-error in animals, unnecessary experiments and animal burden may increase. To address this, we developed the **Cell2Dose** model to **predict animal dosing** from cellular responses, using existing data and computation to screen candidates worth testing **before animal use**."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "The model comprises **three layers**: the first layer establishes **response relationships** from cell viability, tumor cell killing, and immune readouts; the second layer simulates the **complete process** of **payload distribution**, RNA expression, **antigen presentation**, T-cell effector function, and **tumor killing**; the third layer compares doses under uncertain delivery and immune response conditions, balancing efficacy, cell viability, and exposure costs, while examining the dependence of conclusions on **uncertain parameters**."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "We compared **301 doses** and identified a candidate range **around 10 μg per injection**, while finding that **increasing doses enhances antitumor effects** but also increases **exposure costs**(systemic payload accumulation and potential toxicity). Comparison between model predictions and **animal data** revealed discrepancies in growth kinetics and unexpected Control group effects, which guided refinement of growth parameters and control design for subsequent iterations. The model's value lies in decomposing final tumor size into **traceable biological processes** and providing an **optimal dose recommendation** for wet lab validation."
        ]
      },
      {
        "type": "subheading",
        "id": "model-heading-49",
        "index": "4.1",
        "title": "Model architecture",
        "level": 3
      },
      {
        "type": "prose",
        "paragraphs": [
          "The **administered amount alone** does not guarantee effective immunity. The same dose can produce different local retention, lymphatic delivery, functional expression, and effector activity. We therefore organize the mechanistic chain into **seven modules** with explicit interfaces: **Module 1** calibrates response functions from experimental observations and generates **frozen posteriors**; **Modules 2–5** form a coupled ODE system simulating payload distribution, RNA expression, antigen presentation, and tumor dynamics; Module 6 propagates **1,024 parameter draws** across **301 doses** using shared random numbers and applies joint efficacy and screening criteria; **Module 7** performs **sensitivity analysis** and computational verification to identify which assumptions most influence the conclusions."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Click on the graphical abstract to jump to the relevant section!"
        ]
      },
      {
        "type": "feature",
        "key": "model-module-navigation"
      },
      {
        "type": "prose",
        "paragraphs": [
          "**Figure 21,** Three-layer model architecture connecting cell experiments to dose recommendations."
        ]
      },
      {
        "type": "subheading",
        "id": "model-heading-50",
        "index": "4.1.1",
        "title": "Module Functions and Interfaces",
        "level": 4
      },
      {
        "type": "prose",
        "paragraphs": [
          "Each module has **explicit inputs, outputs, and interfaces**, allowing **experimental readouts** to inform specific stages while keeping **unmeasured assumptions** visible.",
          "**Table 15.** Module functions and interfaces connecting cell experiments to dose recommendations."
        ]
      },
      {
        "type": "table",
        "headers": [
          "Module",
          "Function",
          "Key Input",
          "Key Output"
        ],
        "rows": [
          [
            "1",
            "Cell response calibration",
            "CCK8 viability (5 doses × 4 replicates), killing assay (3 E:T ratios × 2 conditions × 3 replicates), immune readouts",
            "Viability curve v(dose), killing curve K(E:T), relative gains (dc_fold, t_fold)"
          ],
          [
            "2",
            "Payload distribution",
            "Dose q, routing fractions (f_lymph, f_blood), clearance rates (k_sc, k_lymph, k_blood)",
            "Mass states S, L, C, U"
          ],
          [
            "3",
            "RNA expression & innate signaling",
            "Lymph payload L, delivery efficiency η, LNP innate coefficient ℓ",
            "Functional RNA R, antigen A, innate signal I"
          ],
          [
            "4",
            "Presentation & T-cell activation",
            "Antigen A, innate drive I, local viability v(S), effector gain t_fold",
            "DC maturation D, presentation P, effector E, suppression X"
          ],
          [
            "5",
            "Tumor growth & killing",
            "Effector E, suppression X, growth parameters (a0, a1, lag), killing transfer (γ_ET, k_kill)",
            "Latent burden B, observable volume V"
          ],
          [
            "6",
            "Uncertainty & dose selection",
            "1,024 parameter draws, 301 doses (0–30 μg)",
            "Joint pass fractions; candidate set [9.4,12.0] ∪ [12.2,12.4] ∪ {12.6} μg"
          ],
          [
            "7",
            "Sensitivity & verification",
            "16 structural factors, Sobol design, mass balance, step-size tests",
            "Sensitivity ranks, mass residuals < 10⁻¹³ μg, convergence"
          ]
        ]
      },
      {
        "type": "subheading",
        "id": "model-heading-51",
        "index": "4.1.2",
        "title": "Variables and Evidence Levels",
        "level": 4
      },
      {
        "type": "prose",
        "paragraphs": [
          "The model distinguishes **three types of evidence**: **observations** are recorded experimental values; **calibration** constrains response functions using those values; **conditional simulations** calculate outcomes under declared parameter and structural assumptions. Simulation intervals represent the **2.5th–97.5th percentiles** across parameter draws unless stated otherwise.",
          "**Table 16.** Model state variables and their biological interpretations."
        ]
      },
      {
        "type": "table",
        "headers": [
          "Variables",
          "Meaning and units",
          "Interpretation boundary"
        ],
        "rows": [
          [
            "S, L, C, U",
            "Local depot, lymph-related payload, blood-related payload, and cumulative removal or other destinations; μg",
            "Simplified mass allocation, not measured tissue concentrations; U does not return to circulation"
          ],
          [
            "R, A, I",
            "Functional RNA-expression capacity, antigen availability, and aggregate innate signal; normalized states",
            "Not RNA copy numbers, protein concentrations, or direct measurements of one inflammatory mediator"
          ],
          [
            "D, P, E, X",
            "DC maturation, antigen presentation, effector activity, and aggregate suppression; normalized states",
            "D, P, and E have saturating bounds; they do not directly equal flow-cytometry percentages"
          ],
          [
            "B, V",
            "Latent tumor burden and simulated observable volume; mm³",
            "V = max(B − Bdet, 0); the detection threshold is a convention"
          ],
          [
            "AUC_C, AUC_B",
            "Integrated blood payload and integrated observable tumor volume; μg·day and mm³·day",
            "The code variable AUC_B integrates V, not latent B"
          ]
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "**Cell data** provide evidence for local response relationships. **Literature** provides growth and expression parameters from specific experimental systems. Delivery and in-vivo transfer parameters (α, η, γ_ET, k_kill) are **structural assumptions** propagated as **uncertain ranges**. Wide parameter ranges reflect what we don't yet know. **Sensitivity analysis** identifies which measurements would narrow the predictions."
        ]
      },
      {
        "type": "subheading",
        "id": "model-heading-52",
        "index": "4.2",
        "title": "Module 1: Calibrating Cell Responses",
        "level": 3
      },
      {
        "type": "prose",
        "paragraphs": [
          "Cell experiments measure how cells respond to doses and effector-to-target ratios. The measurements use arbitrary in-vitro scales. We need the shapes of **dose-viability** and **E:T-killing** curves to **predict animal outcomes**—the curves tell us how responses change, even though the **absolute numbers don't transfer**."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "**Module 1 calibrates** these curves from **CCK8** and **cytotoxicity assays**. When **Modules 2–5** calculate local payload or effector activity, they retrieve the corresponding response from Module 1. This keeps **cell-response shapes** separate from **in-vivo transfer assumptions**, so we can see which cross-scale parameters remain uncertain."
        ]
      },
      {
        "type": "subheading",
        "id": "model-heading-53",
        "index": "4.2.1",
        "title": "Data and Assumptions",
        "level": 4
      },
      {
        "type": "prose",
        "paragraphs": [
          "We used **two core datasets** to calibrate Module 1: **CCK8 viability assays** measuring **MDA-MB-231** cell survival at **five nominal doses** (0, 50, 100, 200, 400 ng) with **four replicates** each, and **cytotoxicity assays** measuring tumor cell killing at three effector-to-target ratios (**20:1, 40:1, 80:1**) with three replicates per condition. These assays compared **Blank** (effector cells only) and **Combined** (effector + vaccine-treated PBMC) groups to isolate vaccine-specific effects."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "For viability, we fit a **Hill function** V(x) = b/(1 + (x/ED50)^h) where x is the nominal amount, ED50 is the half-maximal response dose, h controls curve steepness, and b is the baseline viability. For killing, we fit a **saturating response** K(r) = 1/(1 + (K_ET/r)^n) where r is the E:T ratio, K_ET is the half-maximal ratio, and n controls steepness. We used **Bayesian grid integration** over the parameter space, with priors informed by the observed dose and ratio ranges, and generated **8,192 posterior samples** for downstream propagation."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Additional immune readouts (**DC maturation markers**, **IFN-γ**, **Granzyme B**) were used to construct relative functional gains. We calculated DC gain (**dc_fold**) as the Combined/Blank ratio for maturation markers, and effector gain (**t_fold**) as the **geometric mean** of activation, **IFN-γ**, and **Granzyme B** ratios comparing vaccine to control conditions. These fold-changes amplify the baseline response functions in the mechanistic modules without requiring absolute unit conversions."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "**Key assumptions:** We treat the nominal \"ng\" as a **relative dose scale**; its absolute per-well amount does not affect response curve shapes but enters the **cross-scale exposure bridge** (parameter α) linking in-vitro to in-vivo. We assume replicate measurements within each dose or E:T level are independent for uncertainty propagation, and we treat different assay types (viability, killing, immune markers) as providing **independent information** about distinct biological processes."
        ]
      },
      {
        "type": "subheading",
        "id": "model-heading-54",
        "index": "4.2.2",
        "title": "Mathematical Model",
        "level": 4
      },
      {
        "type": "prose",
        "paragraphs": [
          "We calibrate **two independent response functions**: one describing how vaccine dose affects **target cell viability**, the other describing how effector-to-target ratio determines **killing efficiency**."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "CCK8 uses a **decreasing Hill curve**, while killing uses a **saturating Hill curve**:"
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "$$V_{cell}(x)=\\frac{b}{1+(x/E_{50})^h},\\qquad K_{specific}(r)=\\frac{1}{1+(K_{ET}/r)^n}.$$"
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "The first describes the effect of **nominal amount x** on the viability readout; the second describes the effect of **E:T ratio r** on **background-corrected killing**."
        ]
      },
      {
        "type": "figure",
        "src": getModelImage("image 18.png"),
        "width": 975,
        "height": 576,
        "alt": "CCK8 observations and viability response. Each of five nominal doses has four records. The curve and band show the conditional mean-response median and 95% interval from 8,192 cell-posterior draws, excluding new-observation noise. The dashed line is 80% of the fitted median baseline.",
        "caption": "CCK8 observations and viability response. Each of five nominal doses has four records. The curve and band show the conditional mean-response median and 95% interval from 8,192 cell-posterior draws, excluding new-observation noise. The dashed line is 80% of the fitted median baseline.",
        "figureLabel": "FIG. 18"
      },
      {
        "type": "figure",
        "src": getModelImage("image 15.png"),
        "width": 975,
        "height": 576,
        "alt": "Background-corrected killing and E:T response. Blank and Combined each have three records at each E:T level. Points are corrected means; bars show propagated one-sigma observation uncertainty, floored at 0.04 (currently ±4 percentage points). Curve and band show the conditional mean median and 95% interval from 8,192 posterior draws.",
        "caption": "Background-corrected killing and E:T response. Blank and Combined each have three records at each E:T level. Points are corrected means; bars show propagated one-sigma observation uncertainty, floored at 0.04 (currently ±4 percentage points). Curve and band show the conditional mean median and 95% interval from 8,192 posterior draws.",
        "figureLabel": "FIG. 19"
      },
      {
        "type": "subheading",
        "id": "model-heading-55",
        "index": "4.2.3",
        "title": "Results and Interpretation",
        "level": 4
      },
      {
        "type": "prose",
        "paragraphs": [
          "**Table 17.** Cell calibration parameters and evidence levels."
        ]
      },
      {
        "type": "table",
        "headers": [
          "Quantity",
          "Median",
          "95% posterior interval",
          "Meaning"
        ],
        "rows": [
          [
            "E50",
            "407.26 ng",
            "402.17–422.93",
            "Nominal amount retaining half the modeled baseline response"
          ],
          [
            "h",
            "12.53",
            "4.88–28.79",
            "Steepness of the viability response"
          ],
          [
            "ED80",
            "364.86 ng",
            "314.66–384.60",
            "Nominal amount retaining 80% of modeled baseline viability"
          ],
          [
            "K_ET",
            "38.08",
            "32.94–44.02",
            "E:T ratio producing 50% specific killing"
          ],
          [
            "n",
            "1.54",
            "1.15–1.99",
            "Steepness of the killing response"
          ]
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Background-corrected mean killing is approximately **0.29, 0.49, and 0.78** at the three E:T ratios. The **median relative DC gain is 2.16**. Relative gains for CD8/CD69 activation, IFN-γ, and Granzyme B are approximately **1.67, 3.11, and 4.07**. Their equal-weight geometric mean defines **t_fold**, with a median of **2.76**, avoiding direct multiplication and amplification of several potentially related functional readouts."
        ]
      },
      {
        "type": "figure",
        "src": getModelImage("image 38.png"),
        "width": 975,
        "height": 548,
        "alt": "How immune readouts enter the model.",
        "caption": "How immune readouts enter the model.",
        "figureLabel": "FIG. 20"
      },
      {
        "type": "prose",
        "paragraphs": [
          "The **leave-one-dose-out check** identifies a useful next experiment. When **400 ng** is omitted, the **predictive median** is approximately **0.95**, whereas the observed group mean is approximately **0.57**. Although the broad **predictive interval** covers the observations, its center is substantially displaced. Though the current data constrain part of the response shape, while additional sampling near the high-dose transition remains useful."
        ]
      },
      {
        "type": "feature",
        "key": "model-panel-17"
      },
      {
        "type": "subheading",
        "id": "model-heading-57",
        "index": "4.3",
        "title": "Module 2: Payload Distribution After Injection",
        "level": 3
      },
      {
        "type": "prose",
        "paragraphs": [
          "Module 2 tracks where the injected vaccine goes after subcutaneous administration. The payload distributes into **three main destinations**: the **local injection site** (providing sustained release), **draining lymph nodes** (where immune activation occurs), and the **bloodstream** (contributing to systemic exposure). We model this distribution to answer **two questions**: how much material reaches the lymph nodes over time (feeding into Module 3's expression calculations), and what is the **peak blood exposure** (feeding into Module 6's safety screening)."
        ]
      },
      {
        "type": "subheading",
        "id": "model-heading-58",
        "index": "4.3.1",
        "title": "Assumptions and Model",
        "level": 4
      },
      {
        "type": "prose",
        "paragraphs": [
          "We use a flow model with **four compartments**: **S (local depot)**, **L (lymph-related payload)**, **C (blood-related payload)**, and **U (cumulative removal)**. Material leaves the injection site at rate k_sc, with fractions **f_lymph** and **f_blood** routing to lymph and blood respectively. Each compartment then clears at its own rate:"
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "$$\\dot S=-k_{sc}S,\\quad\\dot L=f_{lymph}k_{sc}S-k_{lymph}L,\\quad\\dot C=f_{blood}k_{sc}S-k_{blood}C.$$"
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "The rates k_sc, k_lymph, and k_blood are **first-order removal coefficients**; the fractions f_lymph and f_blood are routing splits. At each injection time t_j, the model adds **exactly q** to S(t_j) and preserves continuity of L and C. The sum S+L+C+U remains constant between injections, where U accumulates removed payload. This structure ensures **mass conservation** and allows independent checking of **total delivered mass**."
        ]
      },
      {
        "type": "figure",
        "src": getModelImage("image 8.png"),
        "width": 975,
        "height": 298,
        "alt": "Model repeated-dosing schedule. Subcutaneous injections on days 0, 7, 14, 21, and 28; endpoint reported at day 35.",
        "caption": "Model repeated-dosing schedule. Subcutaneous injections on days 0, 7, 14, 21, and 28; endpoint reported at day 35.",
        "figureLabel": "FIG. 22"
      },
      {
        "type": "figure",
        "src": getModelImage("image 37.png"),
        "width": 975,
        "height": 726,
        "alt": "Payload and exposure under repeated dosing. A and B use a central-parameter trajectory at 10.2 μg, with mass-balance residual 3.55×10⁻¹⁴ μg; shading in B shows mass composition. C gives blood-payload AUC medians and 95% intervals for 301 doses sharing 1,024 draws. D shows marginal routing medians and intervals. U includes removal from lymph and blood.",
        "caption": "Payload and exposure under repeated dosing. A and B use a central-parameter trajectory at 10.2 μg, with mass-balance residual 3.55×10⁻¹⁴ μg; shading in B shows mass composition. C gives blood-payload AUC medians and 95% intervals for 301 doses sharing 1,024 draws. D shows marginal routing medians and intervals. U includes removal from lymph and blood.",
        "figureLabel": "FIG. 23"
      },
      {
        "type": "subheading",
        "id": "model-heading-59",
        "index": "4.3.2",
        "title": "Results and Wet Lab Connection",
        "level": 4
      },
      {
        "type": "prose",
        "paragraphs": [
          "Within the declared parameter range, the single-pulse lymph-payload peak occurs approximately **0.76–1.84 days** after injection. This can guide early delivery measurements, but it is **not the time of peak antigen expression**. With seven-day dosing intervals, slower local clearance allows residual payload to raise the local post-injection peak by approximately **9%**. Single-dose amount remains the main determinant, but **accumulation cannot be completely ignored**."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "This module motivates separate, **product-matched measurements** of payload or functional signals at the **injection site**, **draining lymph node**, and in **blood**. Increasing the administered amount may increase local and systemic exposure **without a proportional improvement** in effective delivery."
        ]
      },
      {
        "type": "figure",
        "src": getModelImage("image 25.png"),
        "width": 975,
        "height": 385,
        "alt": "Connecting in-vivo μg payload to the nominal ng cell response.",
        "caption": "Connecting in-vivo μg payload to the nominal ng cell response.",
        "figureLabel": "FIG. 24"
      },
      {
        "type": "feature",
        "key": "model-panel-18"
      },
      {
        "type": "subheading",
        "id": "model-heading-61",
        "index": "4.3.3",
        "title": "Does the schedule matter at equal total dose?",
        "level": 4
      },
      {
        "type": "prose",
        "paragraphs": [
          "Dose design also includes timing. Keeping the frozen 1,024 parameter draws, we compared **five injections of 10.2 μg each** (**51 μg total**) at intervals of **5, 7 and 10 days**. The **joint pass fractions** are **0.8145, 0.8203 and 0.7783**, respectively. The **10-day schedule** differs from the 7-day schedule by −0.0420 (paired MCSE 0.0066), while the 5-day versus 7-day difference is −0.0059 (paired MCSE 0.0039)."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "However, this comparison introduces a design question: evaluating each course seven days after its last injection produces different endpoints (days 27, 35, and 47). A future comparison should predefine both the dosing schedule and **assessment time** to enable **fair evaluation**."
        ]
      },
      {
        "type": "figure",
        "src": getModelImage("image 4.png"),
        "width": 975,
        "height": 298,
        "alt": "Joint pass fraction across different dosing schedules.",
        "caption": "Joint pass fraction across different dosing schedules.",
        "figureLabel": "FIG. 25"
      },
      {
        "type": "feature",
        "key": "model-panel-19"
      },
      {
        "type": "subheading",
        "id": "model-heading-62",
        "index": "4.4",
        "title": "Module 3: RNA Expression and Innate Signaling",
        "level": 3
      },
      {
        "type": "prose",
        "paragraphs": [
          "RNA reaching a relevant tissue does not necessarily produce **functional expression**, and stronger expression or inflammation is not always better. We distinguish RNA function, antigen availability, and **innate signaling**, allowing innate activity to support immune activation while also **suppressing translation**. Separate studies motivate **sustained circRNA translation**, effects of construct design and preparation purity on recognition, and the inflammatory contribution of **LNPs themselves** (Wesselhoeft et al., 2018; Wesselhoeft et al., 2019; Chen et al., 2017; Kubara et al., 2024; Ndeupen et al., 2021)"
        ]
      },
      {
        "type": "subheading",
        "id": "model-heading-63",
        "index": "4.4.1",
        "title": "Assumptions and Model",
        "level": 4
      },
      {
        "type": "prose",
        "paragraphs": [
          "Input to R depends on **lymph-payload turnover** and **functional delivery efficiency**. Translation from R produces A. I receives both **RNA-related and LNP-related source terms**."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "$$\\dot R=\\eta k_{lymph}L/q_{scale}-d_RR,\\quad\\dot A=k_{translation}R g_{tr}(I)-d_AA,\\quad\\dot I=\\rho R+\\ell S/q_{scale}-d_II.$$"
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Here ℓ is the LNP innate-source coefficient. The translation gate g_tr decreases as I rises. The **DC activation drive initially increases** with I, then is reduced by an **overactivation gate**."
        ]
      },
      {
        "type": "figure",
        "src": getModelImage("image 10.png"),
        "width": 975,
        "height": 349,
        "alt": "Timing from delivery to functional RNA and antigen. At 10.2 μg per injection, a representative trajectory uses the componentwise medians of 1,024 joint draws; vertical lines mark dosing.",
        "caption": "Timing from delivery to functional RNA and antigen. At 10.2 μg per injection, a representative trajectory uses the componentwise medians of 1,024 joint draws; vertical lines mark dosing.",
        "figureLabel": "FIG. 26"
      },
      {
        "type": "subheading",
        "id": "model-heading-64",
        "index": "4.4.2",
        "title": "Results and Interpretation",
        "level": 4
      },
      {
        "type": "prose",
        "paragraphs": [
          "In the representative trajectory using the median of each parameter, the first-cycle sampled peaks of L, R, and A occur on **days 1, 4, and 6**, respectively. This illustrates the **delay from delivery to expression** and then antigen accumulation. At the reporting dose, the median of each draw's peak innate state is **0.1436**, with a 95% conditional interval of **0.0136–1.5475**. Although the median is below the activation-drive maximum near 0.933, some draws reach higher signal levels."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "The median peaks of the RNA and LNP source terms are approximately **0.0033 and 0.3432**, respectively. These indicate **LNP-dominated input** under the current parameterization. They are input rates, **not two measured inflammatory concentrations**, and they do not establish that RNA recognition has no effect. Measurements of **RNA expression**, **antigen**, **IFN-I/ISG**, and **LNP-only controls** could help distinguish inadequate delivery from excessive innate activity."
        ]
      },
      {
        "type": "figure",
        "src": getModelImage("image 40.png"),
        "width": 975,
        "height": 324,
        "alt": "Innate signaling activation and suppression dynamics.",
        "caption": "Innate signaling activation and suppression dynamics.",
        "figureLabel": "FIG. 27"
      },
      {
        "type": "feature",
        "key": "model-panel-20"
      },
      {
        "type": "subheading",
        "id": "model-heading-66",
        "index": "4.5",
        "title": "Module 4: Antigen Presentation and T-cell Function",
        "level": 3
      },
      {
        "type": "prose",
        "paragraphs": [
          "Module 4 **connects antigen production to effector T-cell activity** through two intermediate steps: **DC maturation** and **antigen presentation**. We model **four states**: D (**DC maturation**), P (**antigen presentation**), E (effector activity), and X (aggregate suppression from tumor and inflammation). The structure captures a **key biological insight**: antigen must be presented in an activated DC environment, and the resulting effector response can be dampened by suppressive signals."
        ]
      },
      {
        "type": "subheading",
        "id": "model-heading-67",
        "index": "4.5.1",
        "title": "Assumptions and Model",
        "level": 4
      },
      {
        "type": "prose",
        "paragraphs": [
          "**Innate signal I** (from Module 3) drives **DC maturation D**. **Both antigen A and matured DCs** are needed for **presentation P**. Presentation then primes **effector activity E**. **Local viability v(S)** gates both DC maturation and presentation, representing the constraint that **excessive local toxicity** impairs immune function:"
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "$$v(S)=\\frac{1}{1+(\\alpha S/E_{50})^h},\\qquad\\dot E=Hk_Et_{fold}\\frac{P}{K_P+P}\\frac{1-E}{1+X}-d_EE.$$"
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Here α maps local μg payload to an **equivalent in-vitro ng dose** (using Module 1's **calibrated viability curve**). The **fold-gain t_fold** from Module 1 amplifies the baseline priming rate. Suppression X accumulates from tumor burden and innate signal, creating a **negative feedback** that can limit effector expansion. H is a **binary switch** (0 or 1) controlling whether the **host adaptive pathway** is active."
        ]
      },
      {
        "type": "figure",
        "src": getModelImage("image 34.png"),
        "width": 975,
        "height": 349,
        "alt": "DC maturation and antigen presentation dynamics.",
        "caption": "DC maturation and antigen presentation dynamics.",
        "figureLabel": "FIG. 29"
      },
      {
        "type": "figure",
        "src": getModelImage("image 31.png"),
        "width": 975,
        "height": 324,
        "alt": "Effector generation, suppression, and tumor killing.",
        "caption": "Effector generation, suppression, and tumor killing.",
        "figureLabel": "FIG. 30"
      },
      {
        "type": "subheading",
        "id": "model-heading-68",
        "index": "4.5.2",
        "title": "Results and Wet Lab Connection",
        "level": 4
      },
      {
        "type": "prose",
        "paragraphs": [
          "We use **mechanistic ablations** to check model structure: **setting antigen production to zero** or **switching off the adaptive pathway** (**H=0**) both return the **tumor burden ratio to 1**, meaning no treatment effect. This confirms the model's **internal logic**—without antigen or without adaptive immunity, the vaccine cannot work through this mechanism."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "**What experiments would test these connections:** Measure **DC phenotype** (**maturation markers**), **antigen presentation** (**MHC-peptide complexes**), and **effector readouts** (CD69⁺, IFN-γ⁺) in separate assays. If antigen is present but presentation is low, investigate whether DC maturation is impaired or whether **local viability** suppresses the A→P step. If presentation and effectors are both high yet tumors grow, the issue lies in **killing transfer (Module 5)** or growth parameters rather than upstream immune activation."
        ]
      },
      {
        "type": "feature",
        "key": "model-panel-21"
      },
      {
        "type": "subheading",
        "id": "model-heading-69",
        "index": "4.6",
        "title": "Module 5: Tumor Growth and Immune Killing",
        "level": 3
      },
      {
        "type": "prose",
        "paragraphs": [
          "Module 5 converts **effector activity** into tumor outcomes by allowing **natural growth** to compete with **immune killing**, then maps latent burden to observable volume. The model tracks tumor burden B as a continuous internal state and converts it to **observable volume V** by subtracting a **detection threshold**, distinguishing **mathematical prediction** from **experimental measurement**."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "The team uses **TROP2-overexpressing 4T1 tumors** in **immunocompetent BALB/c mice**. That system provides the biological context for **adaptive immunity**. However, the numerical growth parameters come from external LM2-4 LUC⁺/SCID research (Benzekry et al., 2014)."
        ]
      },
      {
        "type": "subheading",
        "id": "model-heading-70",
        "index": "4.6.1",
        "title": "Why use parameters from a different tumor system?",
        "level": 4
      },
      {
        "type": "prose",
        "paragraphs": [
          "The model requires **specific numbers**: **exponential growth rate a0**, **linear growth rate a1**, **engraftment lag t_lag**, and their **statistical distributions**. Literature on 4T1/BALB/c tumors describes biphasic growth qualitatively—tumors grow fast then slow—but does not report the **quantitative parameters** this model structure needs (Pulaski, 2008; Wang, 2020). Extracting those parameters from published figures would introduce large errors, and the original data are not publicly available. The Benzekry et al. (2014) study on LM2-4 LUC⁺/SCID tumors provides **complete parameter estimates** with statistical uncertainty and validation. The choice was between a **runnable model** with mismatched parameters and a **biologically matched model** that cannot compute any dose."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "The **mismatch has consequences**. LM2-4 tumors grow in **immunodeficient (SCID)** mice; 4T1 tumors grow in **immunocompetent (BALB/c)** mice. The model introduces a **growth-transfer coefficient** to scale the imported parameters toward the observed PBS endpoint, but that coefficient adjusts speed, **not shape**. [Comparison with Animal Experiments](#model-heading-98) shows that the model **overpredicts untreated tumor size** by approximately 4.7-fold at day 35, which points directly to this limitation. The comparison reveals where the imported parameters fail and identifies what the **next calibration** should measure."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "In contrast to the growth parameters, which required transfer from a different system, the **immune killing function** follows the **saturating-response structure** common to **tumor-immune ODE models(de Pillis et al., 2005)**"
        ]
      },
      {
        "type": "subheading",
        "id": "model-heading-71",
        "index": "4.6.2",
        "title": "Assumptions and Model",
        "level": 4
      },
      {
        "type": "prose",
        "paragraphs": [
          "**Natural tumor growth** competes with **immune killing** to determine **latent burden B**. The growth function g(B,t) uses an **exponential-linear structure**: growth begins after an **engraftment lag**, starts exponentially, then transitions to linear growth at a burden-dependent threshold. Immune killing depends on effector activity E, is reduced by suppression X, and follows a **saturating response** calibrated from the **cell E:T assay**. The model converts **latent burden B** into **observable volume V** by subtracting a detection threshold. The **complete equations**, transfer parameters γ_ET and k_kill, and analytical checks are in the expandable notes below."
        ]
      },
      {
        "type": "figure",
        "src": getModelImage("image 22.png"),
        "width": 975,
        "height": 576,
        "alt": "Tumor trajectories for untreated and 10.2 μg scenarios.",
        "caption": "Tumor trajectories for untreated and 10.2 μg scenarios.",
        "figureLabel": "FIG. 31"
      },
      {
        "type": "subheading",
        "id": "model-heading-72",
        "index": "4.6.3",
        "title": "Results and Interpretation",
        "level": 4
      },
      {
        "type": "prose",
        "paragraphs": [
          "At 10.2 μg, the **ensemble median** day-35 latent burden ratio Bq/B0 is **0.0536**, with a **95% conditional interval** of 5.36×10⁻⁷–0.9936. Here the denominator is the day-35 burden of the **paired untreated simulation**, not the initial burden. The median simulated **observable volume** is 46.85 mm³, with an interval of 0–1966.32 mm³. The median burden ratio corresponds to an **approximately 94.6% reduction**, but the **broad interval** also retains scenarios with little efficacy."
        ]
      },
      {
        "type": "figure",
        "src": getModelImage("image 20.png"),
        "width": 975,
        "height": 576,
        "alt": "Dose-dependent relative tumor burden at day 35.",
        "caption": "Dose-dependent relative tumor burden at day 35.",
        "figureLabel": "FIG. 32"
      },
      {
        "type": "prose",
        "paragraphs": [
          "**Alternative growth structures** change the conclusions. The median burden ratios under **Gompertz** and **logistic** growth are 0.0926 and 0.0385, respectively, but the **logistic** scenario's **efficacy-pass fraction** is only 0.7793, below the **joint-rule threshold** of 0.80. A lower median burden therefore **does not imply** that more draws pass the criterion, and the same dose cannot be called **robust across all tested growth structures**."
        ]
      },
      {
        "type": "feature",
        "key": "model-panel-22"
      },
      {
        "type": "subheading",
        "id": "model-heading-74",
        "index": "4.6.3.2",
        "title": "Wider killing-rate assumptions",
        "level": 4
      },
      {
        "type": "prose",
        "paragraphs": [
          "The parameter registry labels k_kill=0.74–0.80 day⁻¹ as a **structural assumption**. The cell-killing assay lacks a transferable duration, and the cited literature **does not establish this specific range**. A low Sobol contribution for k_kill is conditional on this narrow range. We introduced U(0.4,1.2) day⁻¹ as a **pressure-test assumption**, mapped the original marginal quantile coordinates to the wider distribution, preserved all other parameters and **paired draw IDs**, and **rescanned all 301 doses**."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "At **10.2** µg, the **joint pass fraction** changes from **0.8145** to **0.8076**, a paired difference of **-0.0068** (MCSE **0.0045**). The **wider-range maximum** is **0.8076**, with tied maximizing grid points at **9.9, 10.2, 10.3 and 10.4 µg**; the grid set passing the **0.8 cutoff** is **[9, 9.1] ∪ [9.3, 12]µg**. This wider range tests the dose recommendation's **sensitivity to the killing-rate assumption**. The scenario explores assumption dependence **rather than proposing a revised estimate**."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "The joint pass fraction uses the decision rule defined in the next module; MCSE is explained in the glossary."
        ]
      },
      {
        "type": "figure",
        "src": getModelImage("kkill_sensitivity.png"),
        "width": 2423,
        "height": 883,
        "alt": "Sensitivity to killing-rate assumptions across doses.",
        "caption": "Sensitivity to killing-rate assumptions across doses.",
        "figureLabel": "FIG. 33"
      },
      {
        "type": "subheading",
        "id": "model-heading-75",
        "index": "4.7",
        "title": "Module 6: Uncertainty Propagation and Dose Selection",
        "level": 3
      },
      {
        "type": "prose",
        "paragraphs": [
          "Module 6 compares **301 doses** (0–30 μg at 0.1 μg intervals) under parameter uncertainty to identify candidates worth testing. We use **paired comparisons**: each dose and its untreated control share the same **1,024 parameter draws**, so differences reflect dose effects rather than random parameter variation. The goal is **not to find a single optimal dose**, but to identify a range where **efficacy, viability, and exposure constraints** are simultaneously satisfied."
        ]
      },
      {
        "type": "subheading",
        "id": "model-heading-76",
        "index": "4.7.1",
        "title": "Decision Rule",
        "level": 4
      },
      {
        "type": "prose",
        "paragraphs": [
          "We define **four criteria** that **each parameter draw** must satisfy:",
          "**Table 19.** Joint screening criteria applied in conditional dose selection."
        ]
      },
      {
        "type": "table",
        "headers": [
          "Condition",
          "Definition",
          "Interpretation"
        ],
        "rows": [
          [
            "Efficacy proxy",
            "Day-35 Bq/B0 ≤ 0.70",
            "At least 30% reduction in latent burden relative to paired untreated simulation"
          ],
          [
            "Viability proxy",
            "min v(S) ≥ 0.80 throughout",
            "Local toxicity screening via in-vitro viability mapping"
          ],
          [
            "Innate signal",
            "max I ≤ I_limit",
            "Innate activation screening (draw-specific limit)"
          ],
          [
            "Blood exposure",
            "∫Cdt ≤ AUC_limit",
            "Systemic exposure screening (draw-specific limit)"
          ]
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "The **joint pass fraction** for dose q is:"
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "$$\\hat p_{joint}(q)=\\frac{1}{N}\\sum_{i=1}^{N}\\mathbf{1}{E_i(q)\\cap V_i(q)\\cap I_i(q)\\cap C_i(q)},\\qquad N=1024.$$"
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "A dose passes the joint rule when p_joint ≥ 0.80. The specific thresholds (**burden ratio 0.70**, **viability 0.80**, joint probability 0.80) are **project design choices** for this **computational screening**."
        ]
      },
      {
        "type": "subheading",
        "id": "model-heading-77",
        "index": "4.7.2",
        "title": "Results and Experimental Decision",
        "level": 4
      },
      {
        "type": "subheading",
        "id": "model-heading-78",
        "index": "4.7.2.1",
        "title": "The Candidate Range",
        "level": 4
      },
      {
        "type": "prose",
        "paragraphs": [
          "The **301-dose scan** identifies doses passing the **0.80 joint-pass threshold** across **[9.4, 12.0] ∪ [12.2, 12.4] ∪ {12.6} μg**. Gaps at 12.1 and 12.5 μg are **numerical artifacts**—those doses fall just below threshold (0.7979 and 0.7969 respectively), **not biological discontinuities**. Within this range, **efficacy and screening constraints trade off**: from 9.4 to 12.6 μg, efficacy pass fraction improves from 0.8242 to 0.8662 (+5.1%), while screening pass fraction drops from 0.9844 to 0.9316 (-5.4%). **Higher doses** bring stronger antitumor effects but also higher innate activation, blood exposure, and local viability stress."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "The **numerical optimum** is **10.2 μg per injection**, with a **joint-pass fraction of 0.8145** (efficacy 0.8369, screening 0.9756). The neighboring dose 10.0 μg has 0.8115 (efficacy 0.8281, screening 0.9795), a difference of 0.0029 or 0.3%. Both doses **perform nearly identically** across all **1,024 parameter draws**."
        ]
      },
      {
        "type": "figure",
        "src": getModelImage("image 6.png"),
        "width": 975,
        "height": 688,
        "alt": "Conditional dose selection showing joint-pass fraction peaks at 10.2 μg (Panel A), with efficacy and screening constraints both satisfied across 1,024 parameter draws. Panels B and C detail the candidate region and pass fractions at the optimal dose. Panel D demonstrates that paired comparison reduces uncertainty by 3.23× compared to unpaired approximation.",
        "caption": "Conditional dose selection showing joint-pass fraction peaks at 10.2 μg (Panel A), with efficacy and screening constraints both satisfied across 1,024 parameter draws. Panels B and C detail the candidate region and pass fractions at the optimal dose. Panel D demonstrates that paired comparison reduces uncertainty by 3.23× compared to unpaired approximation.",
        "figureLabel": "FIG. 34"
      },
      {
        "type": "prose",
        "paragraphs": [
          "Use the slider below to explore how efficacy and screening pass fractions change across **all 301 doses**. This allows you to examine specific doses and their **joint-pass probabilities** in detail."
        ]
      },
      {
        "type": "feature",
        "key": "model-dose-explorer"
      },
      {
        "type": "subheading",
        "id": "model-heading-79",
        "index": "4.7.2.2",
        "title": "Experimental Recommendation: Why 10 μg, Not 10.2",
        "level": 4
      },
      {
        "type": "prose",
        "paragraphs": [
          "We recommend testing **10 μg** rather than 10.2 μg for **three reasons**:"
        ]
      },
      {
        "type": "feature",
        "key": "model-dose-reasons"
      },
      {
        "type": "subheading",
        "id": "model-heading-80",
        "index": "4.7.2.3",
        "title": "Suggested Experimental Design",
        "level": 4
      },
      {
        "type": "prose",
        "paragraphs": [
          "Test doses that span the **candidate range** to distinguish the **dose-response trend**:"
        ]
      },
      {
        "type": "list",
        "items": [
          "**8-9 μg**: Low boundary (tests whether pass fraction drops sharply below 9.4 μg)",
          "**10 μg**: Center (highest joint-score region)",
          "**12-13 μg**: High boundary (tests efficacy-exposure trade-off)",
          "**Untreated control**: Calibrates growth parameters"
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "These groups allow **statistical testing** of the model's **predicted shape** and are more informative than pursuing computational precision that **experimental methods cannot resolve**."
        ]
      },
      {
        "type": "feature",
        "key": "model-panel-23"
      },
      {
        "type": "subheading",
        "id": "model-heading-84",
        "index": "4.7.2.5",
        "title": "Which parameter should we measure next?",
        "level": 4
      },
      {
        "type": "prose",
        "paragraphs": [
          "We fixed γ_ET, q_scale, and f_lymph at their **sample medians**, **one at a time**, and **rescanned all 301 doses** with the **other 1,024 draws unchanged**. Candidate grid points changed from 31 to **50, 142, and 82**."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Fixing **q_scale** admits the most doses but widens the prediction spread. The **95% log10 relative-burden width** at 10.2 µg changes from 6.27 to **6.37** with **q_scale** fixed, but narrows to **4.79** with γ_ET fixed. **More passing doses and tighter predictions are separate outcomes**."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "q_scale is a **normalization factor** partly **confounded with delivery gain** η. The wide passing set after fixing it reflects the assumption structure, **not a measurement priority**. **Real measurements** have noise and may shrink the passing set."
        ]
      },
      {
        "type": "figure",
        "src": getModelImage("design_parameter_fixing.png"),
        "width": 3023,
        "height": 923,
        "alt": "Each scenario fixes one structural factor. Left: joint pass curves; middle: passing grid points with gaps; right: 95% log10 relative-burden width at 10.2 µg.",
        "caption": "Each scenario fixes one structural factor. Left: joint pass curves; middle: passing grid points with gaps; right: 95% log10 relative-burden width at 10.2 µg.",
        "figureLabel": "FIG. 35"
      },
      {
        "type": "feature",
        "key": "model-panel-24"
      },
      {
        "type": "subheading",
        "id": "model-heading-85",
        "index": "4.8",
        "title": "Module 7: Sensitivity Analysis and Computational Verification",
        "level": 3
      },
      {
        "type": "prose",
        "paragraphs": [
          "Module 7 answers two questions: which **poorly measured parameters** most affect the **dose recommendation**, and whether the **numerical implementation is sound**. Sensitivity analysis ranks **16 structural factors** by their influence on tumor burden, viability, and exposure at 10.2 μg. Larger sensitivity means the output depends more on that parameter across its stated range. We also check **mass conservation**, **integration convergence**, and whether **alternative growth structures** change the conclusions."
        ]
      },
      {
        "type": "figure",
        "className": "model-figure--compact",
        "src": getModelImage("image 29.png"),
        "width": 975,
        "height": 819,
        "alt": "Sensitivity analysis showing parameter importance.",
        "caption": "Sensitivity analysis showing parameter importance.",
        "figureLabel": "FIG. 36"
      },
      {
        "type": "subheading",
        "id": "model-heading-86",
        "index": "4.8.1",
        "title": "Results and Interpretation",
        "level": 4
      },
      {
        "type": "prose",
        "paragraphs": [
          "**Viability depends most on the exposure-conversion factor α.** That coefficient maps local payload to an equivalent cell-assay dose. The **sensitivity value is 1.02**, with raw estimates across four independent calculations of **1.04, 1.05, 0.95, 1.04** (mean 1.02, SD 0.05). A single theoretical total effect lies between 0 and 1. Finite samples estimate both a factor's contribution and the overall variation with error, so values near the upper bound can slightly exceed it. This reflects **computational noise** in the estimate, **not 102% of anything biological**. The result means viability predictions depend strongly on α, and that local-payload measurements paired with cell-viability assays across doses would test this **in-vitro-to-in-vivo bridge**."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "**Tumor burden is most sensitive to γ_ET, q_scale, and f_lymph.** These represent **effector-to-killing transfer**, **dose normalization**, and **lymph routing**. Their total-effect means ± SD are **0.35±0.03, 0.34±0.04, and 0.27±0.02**. The first two overlap within their variation, so **neither has clear priority**. This suggests measuring effective in-vivo delivery and killing transfer would **reduce outcome uncertainty**. It does not prove those measurements are more valuable than cell experiments—**measurement noise, identifiability, and cost** also matter."
        ]
      },
      {
        "type": "figure",
        "src": getModelImage("image 1.png"),
        "width": 975,
        "height": 693,
        "alt": "Between-scramble variation in Sobol indices.",
        "caption": "Between-scramble variation in Sobol indices.",
        "figureLabel": "FIG. 37"
      },
      {
        "type": "subheading",
        "id": "model-heading-87",
        "index": "4.8.2",
        "title": "Numerical checks",
        "level": 4
      },
      {
        "type": "prose",
        "paragraphs": [
          "**Table 22.** Computational verification checks confirming model consistency and numerical stability."
        ]
      },
      {
        "type": "table",
        "headers": [
          "Check",
          "Result",
          "What it confirms"
        ],
        "rows": [
          [
            "Mass balance",
            "Max error 8.53×10⁻¹⁴ μg",
            "Internal payload transfers are numerically consistent"
          ],
          [
            "Nonnegative states",
            "Recorded minimum is 0",
            "No negative values occurred in the checked states"
          ],
          [
            "Step halving",
            "Max relative difference 1.63% (0.1→0.05 day), 0.68% (0.05→0.025)",
            "Results stabilize as step size decreases"
          ],
          [
            "SBC-style check",
            "64 synthetic CCK8 trials; coverage 0.95",
            "Inference algorithm works under restricted test conditions"
          ],
          [
            "Fixed-constant stress tests",
            "20 constants, 39 perturbation scenarios",
            "Effects omitted from probabilistic propagation are visible"
          ],
          [
            "Growth-structure replacement",
            "Logistic efficacy-pass fraction 0.78",
            "Passing the default rule does not ensure passage across structures"
          ]
        ]
      },
      {
        "type": "feature",
        "key": "model-panel-25"
      },
      {
        "type": "prose",
        "paragraphs": [
          "$$S_j=\\frac{\\operatorname{Var}_{\\theta_j}\\left(\\mathbb{E}[Y\\mid\\theta_j]\\right)}{\\operatorname{Var}(Y)},\\qquad S_{T,j}=\\frac{\\mathbb{E}_{\\theta_{-j}}\\left[\\operatorname{Var}(Y\\mid\\theta_{-j})\\right]}{\\operatorname{Var}(Y)}=1-\\frac{\\operatorname{Var}_{\\theta_{-j}}\\left(\\mathbb{E}[Y\\mid\\theta_{-j}]\\right)}{\\operatorname{Var}(Y)}.$$"
        ]
      },
      {
        "type": "subheading",
        "id": "model-heading-89",
        "index": "4.9",
        "title": "Mathematical Design: Key Choices",
        "level": 3
      },
      {
        "type": "subheading",
        "id": "model-heading-90",
        "index": "4.9.1",
        "title": "Separating Mass from Functional States",
        "level": 4
      },
      {
        "type": "prose",
        "paragraphs": [
          "**Payload conservation** and **functional signal amplification** address different questions. **S, L, C, and U** track where administered material goes; **R, A, I**, and other functional states can be produced, amplified, and lost without violating **mass balance**. This separation lets us verify that no material is created or lost while allowing immune signals to amplify through **biological cascades**."
        ]
      },
      {
        "type": "subheading",
        "id": "model-heading-91",
        "index": "4.9.2",
        "title": "Bridging Scales with Transfer Parameters",
        "level": 4
      },
      {
        "type": "prose",
        "paragraphs": [
          "The **in-vitro E:T curve** constrains the shape of the killing response but **does not directly determine** **daily in-vivo killing rates**. We retain γ_ET (effector-to-E:T conversion) and k_kill (saturation-to-rate scaling) as explicit **transfer parameters**. Similarly, α bridges in-vivo μg to in-vitro ng cell exposure, and η/q_scale connects lymph payload to functional expression. This makes **absolute dose recommendations** explicitly **conditional on transfer assumptions** rather than hiding unknown quantities in seemingly precise conversion constants."
        ]
      },
      {
        "type": "subheading",
        "id": "model-heading-92",
        "index": "4.9.3",
        "title": "Using Log Transform for Growth and Killing",
        "level": 4
      },
      {
        "type": "prose",
        "paragraphs": [
          "Solving in **z = log B** converts the multiplicative growth–killing equation dB/dt = (g−k)B into the **additive form** dz/dt = g−k, **keeping latent burden positive** without clipping negative values. The **observation layer** V = max(B−B_det, 0) then maps **below-threshold burden** to zero. A plotted volume of zero differs from **complete tumor elimination**—the model tracks latent burden even when it falls below detection."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "We use the **same 1,024 parameter draws** across all doses and their **untreated controls**, so each dose's benefits and costs are compared under **identical hypothetical conditions**. **Joint events** avoid incorrectly multiplying correlated marginal probabilities, and **paired numerical errors** prevent **simulation noise** from being mistaken for dose effects."
        ]
      },
      {
        "type": "subheading",
        "id": "model-heading-93",
        "index": "4.9.4",
        "title": "Non-Monotonic Mechanisms Generate Testable Predictions",
        "level": 4
      },
      {
        "type": "prose",
        "paragraphs": [
          "Innate signaling has both **activating and suppressive components**. It enhances **DC maturation** while **blocking translation** at high levels. This structure allows scenarios where **expression is adequate but function is suppressed**. Separate source terms, gating functions, and **pathway ablations** generate competing explanations that **experiments can distinguish**."
        ]
      },
      {
        "type": "feature",
        "key": "model-panel-26"
      },
      {
        "type": "figure",
        "src": getModelImage("image 12.png"),
        "width": 975,
        "height": 556,
        "alt": "Observational support matrix for model parameters.",
        "caption": "Observational support matrix for model parameters.",
        "figureLabel": "FIG. 40"
      },
      {
        "type": "subheading",
        "id": "model-heading-94",
        "index": "4.10",
        "title": "Dry and Wet Lab Integration",
        "level": 3
      },
      {
        "type": "subheading",
        "id": "model-heading-95",
        "index": "4.10.1",
        "title": "Completed Computational Iteration",
        "level": 4
      },
      {
        "type": "prose",
        "paragraphs": [
          "The model completes a **computational cycle**: define the question (**dose selection under uncertainty**), construct the **mechanistic chain** (Modules 1–5), test **internal consistency** (Module 7), and learn what matters most (**sensitivity analysis**). Each step links to **inspectable outputs** and generates predictions for the **next experimental cycle**.",
          "**Table 23.** Computational development timeline and key modeling decisions."
        ]
      },
      {
        "type": "table",
        "headers": [
          "Stage",
          "Completed work and evidence",
          "Resulting action"
        ],
        "rows": [
          [
            "Design",
            "Define a joint rule for efficacy, local viability, innate signaling, and blood exposure",
            "Compare efficacy together with exposure costs"
          ],
          [
            "Build",
            "Implement the module equations and calibrate selected responses with cell inputs",
            "Connect new data to the corresponding module"
          ],
          [
            "Test",
            "Complete the dose scan, numerical checks, cell leave-one-dose-out analysis, and comparison with animal records withheld from calibration",
            "Identify weaknesses in high-dose response and growth transfer"
          ],
          [
            "Learn",
            "Identify the candidate region around 10 μg, key transfer parameters, and staged measurements",
            "Record the next dosing decision, administered dose, and outcome to test the recommendation"
          ]
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Whether a particular animal experiment **adopted the model recommendation** requires **contemporaneous decision and dosing records**. This table documents **computational development**; the project's Engineering and Experiments pages provide the **experimental context**."
        ]
      },
      {
        "type": "subheading",
        "id": "model-heading-96",
        "index": "4.10.2",
        "title": "Register of Falsifiable Predictions",
        "level": 4
      },
      {
        "type": "prose",
        "paragraphs": [
          "We distinguish **frozen outputs** (generated before animal data), **new scenarios** (extensions for this revision), and **independent replications** (repeating already-observed patterns).  **Before formal testing**, fix sample mappings, **measurement error**, **temporal resolution**, and **rejection tolerances**.",
          "**Table 24.** Register of falsifiable predictions made before observing animal data."
        ]
      },
      {
        "type": "table",
        "headers": [
          "ID",
          "Prediction",
          "Status",
          "Evidence"
        ],
        "rows": [
          [
            "P1",
            "Lymph-payload peak at 0.76–1.84 days",
            "Frozen",
            "Module 2, Figure 23"
          ],
          [
            "P2",
            "Antigen peak lags delivery by ~5 days",
            "Frozen",
            "Module 3, Figure 26"
          ],
          [
            "P3",
            "Local viability below 0.80 suppresses immune function",
            "New scenario",
            "Module 4 ablation"
          ],
          [
            "P4",
            "Joint pass fraction maximizes at 10.2 μg",
            "Frozen",
            "Module 6, Figure 34"
          ],
          [
            "P5",
            "Tumor reduction under baseline growth",
            "Frozen",
            "Module 5; [animal comparison](#model-heading-98)"
          ],
          [
            "P6",
            "DC gain ~2.16, T-cell gain ~2.76",
            "Frozen replication",
            "Module 1; [animal comparison](#model-heading-98)"
          ]
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Example doses are **model-derived research design candidates**, to be reconciled with **experimental feasibility** and **approved protocols**."
        ]
      },
      {
        "type": "subheading",
        "id": "model-heading-97",
        "index": "4.10.3",
        "title": "From Endpoint to Intermediate Stages",
        "level": 4
      },
      {
        "type": "prose",
        "paragraphs": [
          "Tumor size is the **combined output** of the mechanistic chain. With only **final measurements**, **inadequate delivery**, **low expression**, **limited presentation**, **weak killing**, or faster growth can produce similar outcomes. The model separates these possibilities and assigns **discriminating readouts** to each stage.",
          "**Table 25.** Stage-specific measurements to discriminate between possible causes of treatment failure."
        ]
      },
      {
        "type": "table",
        "headers": [
          "Outcome",
          "Possible Causes",
          "Discriminating Measurement"
        ],
        "rows": [
          [
            "Low efficacy",
            "Poor delivery",
            "Lymph-node payload at day 1–2"
          ],
          [
            "",
            "Low expression",
            "Antigen levels at day 5–7"
          ],
          [
            "",
            "Weak presentation",
            "DC maturation markers, MHC-peptide"
          ],
          [
            "",
            "Insufficient killing",
            "Effector markers (CD69⁺, IFN-γ⁺), tumor-infiltrating lymphocytes"
          ],
          [
            "",
            "Fast growth",
            "Untreated longitudinal growth curve"
          ]
        ]
      },
      {
        "type": "subheading",
        "id": "model-heading-98",
        "index": "4.11",
        "title": "Comparison with Animal Experiments",
        "level": 3
      },
      {
        "type": "prose",
        "paragraphs": [
          "We compare the model's **frozen predictions** against **tumor measurements** from animal experiments. All model parameters and predictions were **fixed before seeing the animal data**."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "The experiments used a **TROP2-overexpressing 4T1/BALB/c system** with injections on days 0, 7, 14, 21, 28. The vaccine group showed **89.64% lower tumor volume** than the **PBS control** at **day 35** (24.20 vs 233.64 mm³). The PBS mean falls slightly below the model's **untreated prediction interval** (2.5th percentile: 258.04 mm³), while the vaccine mean falls within the treatment prediction intervals. Both model and observations show **lower tumor burden with vaccination**."
        ]
      },
      {
        "type": "figure",
        "src": getModelImage("image 39.png"),
        "width": 975,
        "height": 383,
        "alt": "Animal observations and frozen model predictions.",
        "caption": "Animal observations and frozen model predictions.",
        "figureLabel": "FIG. 41"
      },
      {
        "type": "subheading",
        "id": "model-heading-99",
        "index": "4.11.1",
        "title": "Why the prediction median differs from observations",
        "level": 4
      },
      {
        "type": "prose",
        "paragraphs": [
          "The model's **untreated median** (1103.58 mm³) is approximately **4.7-fold higher** than the observed PBS mean (233.64 mm³). This reflects the **cross-system parameter transfer**: growth parameters (a0, a1, lag) came from LM2-4 LUC⁺/SCID literature, while the actual experiments used 4T1/BALB/c. The **growth-transfer coefficient** partially corrects for this mismatch but cannot adjust growth shape or immune-mediated background suppression. The vaccine mean falls within the prediction interval because those intervals propagate uncertainty across all **16 structural factors**—when key parameters like γ_ET, q_scale, and f_lymph remain unmeasured, the intervals widen enough to cover a range of outcomes. Narrowing these intervals requires **direct measurement** of in-vivo delivery, killing transfer, and **product-matched growth curves**. Due to time constraints and **animal welfare considerations**, we were unable to conduct the additional experiments needed to calibrate these parameters."
        ]
      },
      {
        "type": "subheading",
        "id": "model-heading-100",
        "index": "4.12",
        "title": "Discussion",
        "level": 3
      },
      {
        "type": "subheading",
        "id": "model-heading-101",
        "index": "4.12.1",
        "title": "What We Accomplished",
        "level": 4
      },
      {
        "type": "prose",
        "paragraphs": [
          "We developed Cell2Dose, a **seven-module mechanistic model** that connects **cell experiments** to **animal dose recommendations**. Starting from CCK8 viability and cytotoxicity assays, the model simulates payload distribution, RNA expression, immune activation, and tumor dynamics under repeated dosing. By comparing **301 doses** with shared parameter draws, we identified a **candidate region** around 10 μg per injection where **efficacy and safety constraints** are simultaneously satisfied. Sensitivity analysis revealed that measuring in-vivo delivery (f_lymph), dose normalization (q_scale), and killing transfer (γ_ET) would **reduce uncertainty** more than refining already-calibrated cell parameters. The model transforms \"what dose should we use\" into **testable hypotheses** about each mechanistic stage, providing a roadmap for the **next experimental cycle**."
        ]
      },
      {
        "type": "subheading",
        "id": "model-heading-102",
        "index": "4.12.2",
        "title": "Challenges and Future Directions",
        "level": 4
      },
      {
        "type": "prose",
        "paragraphs": [
          "While Cell2Dose provides a **solid foundation** for dose optimization, some **limitations remain** that we will address as we move forward."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "**Cross-system growth parameters.** The current model uses growth parameters from an **external immunodeficient system** (LM2-4 LUC⁺/SCID). The [comparison with animal experiments](#model-heading-98) shows untreated growth is significantly slower than predicted (234 vs 1103 mm³). We plan to collect complete untreated longitudinal curves from our **4T1/BALB/c** system and **re-estimate growth parameters**, **eliminating this cross-system transfer assumption**."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "**Unvalidated transfer parameters.** Parameters bridging **in-vitro to in-vivo scales** (α, η, γ_ET, k_kill) lack **direct in-vivo measurements**. To address this, we are designing **time-resolved experiments** to measure **lymph-node payload** at days 1–2, **antigen expression** at days 5–7, and **effector readouts**. These measurements will separately constrain delivery, expression, and killing, allowing us to identify **which stage limits efficacy**."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "**Wide prediction intervals.** The **six-order-of-magnitude span** in burden ratios means the model **cannot reliably predict individual tumor sizes**. The wide intervals reflect **parameter uncertainty** and identify which **measurements would reduce it most**. As we incorporate **new data**, these intervals will narrow."
        ]
      },
      {
        "type": "subheading",
        "id": "model-heading-103",
        "index": "4.12.3",
        "title": "Outlook",
        "level": 4
      },
      {
        "type": "prose",
        "paragraphs": [
          "Despite these limitations, Cell2Dose enables **rational mRNA cancer vaccine dose design** by connecting measurable cell responses to animal outcomes through explicit mechanistic stages. We envision the next iteration as follows: by incorporating **time-resolved delivery**, expression, and immune measurements from our ongoing experiments, researchers could use Cell2Dose to rapidly **identify which mechanistic stage limits efficacy** for a given construct. The **modular architecture** allows continuous refinement—new data updates specific modules **without rebuilding the entire framework**. In an ideal scenario, once cell responses and a few in-vivo checkpoints are measured, dose optimization could be completed computationally **within days**, significantly accelerating vaccine development cycles."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Looking ahead, Cell2Dose's mechanistic structure facilitates integration with **upstream antigen design** and **downstream clinical translation**. By addressing current limitations through **targeted measurements**, the model can evolve into an increasingly powerful tool for **personalized mRNA vaccine engineering**. This progress will be accelerated through **continued collaboration** with the iGEM and broader synthetic biology communities, building upon the foundation we have established."
        ]
      },
      {
        "type": "subheading",
        "id": "model-heading-104",
        "index": "4.13",
        "title": "Code and Data Availability",
        "level": 3
      },
      {
        "type": "prose",
        "paragraphs": [
          "All model code, cell inputs, parameters, and predictions are **publicly available**. The **complete codebase** includes module implementations, configuration files, **dose-scanning scripts**, and **figure-generation pipelines**. Key data files support **item-by-item tracing**: the **parameter registry** links each value to its source (cell calibration, literature, or structural assumption), the complete dose scan provides joint pass fractions for all **301 doses** across **1,024 draws**, and tumor trajectory files contain **time-series predictions** under each parameter set."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "The **baseline predictions are frozen** to preserve historical outputs. Verification scripts confirm that saved files match declared **integrity records**. **New analyses**—including threshold sensitivity, wider killing-rate assumptions, and animal comparisons—are saved in separate directories with **version identifiers**, ensuring the original baseline remains **unchanged and reproducible**."
        ]
      },
      {
        "type": "subheading",
        "id": "model-heading-135",
        "index": "4.13.1",
        "title": "Parameters at a glance",
        "level": 4
      },
      {
        "type": "prose",
        "paragraphs": [
          "**16 structural factors propagated by Latin hypercube sampling**",
          "**Table 26.** Parameter summary showing 16 structural factors with distributions, units, and conditional sensitivity indices."
        ]
      },
      {
        "type": "table",
        "headers": [
          "Parameter / symbol",
          "Value, range or distribution",
          "Unit",
          "Evidence type and role",
          "Conditional ST / mean rank"
        ],
        "rows": [
          [
            "alpha",
            "logU(0.01, 10)",
            "dimensionless",
            "Unidentified scale assumption; cross-scale exposure bridge from in-vivo μg payload to nominal ng cell amount",
            "#1; 0.3544 ± 0.02913"
          ],
          [
            "eta",
            "U(0.05, 0.50)",
            "dimensionless",
            "Structural assumption; fraction of lymph payload entering functional expression",
            "#8; 0.01319 ± 0.001075"
          ],
          [
            "d_R",
            "U(0.12, 0.35)",
            "day⁻¹",
            "Structural assumption from published circRNA protein-production persistence; effective functional-RNA loss",
            "#13; 0.002917 ± 0.0005345"
          ],
          [
            "rho",
            "logU(0.005, 0.15)",
            "day⁻¹",
            "Structural assumption; RNA innate-source gain",
            "#10; 0.01042 ± 0.001661"
          ],
          [
            "dc_fold",
            "Cell posterior",
            "dimensionless",
            "Cell-likelihood calibration; relative DC-maturation gain",
            "#16; 0 ± 0"
          ],
          [
            "t_fold",
            "Cell posterior",
            "dimensionless",
            "Cell-likelihood calibration; geometric-mean effector gain from activation, IFN-γ, and Granzyme B",
            "#12; 0.003958 ± 0.0007399"
          ],
          [
            "d_E",
            "U(0.05, 0.30)",
            "day⁻¹",
            "Structural assumption; effector-state loss",
            "#15; 0.001042 ± 0.0002608"
          ],
          [
            "gamma_ET",
            "logU(5, 300)",
            "dimensionless",
            "Unidentified transfer assumption; normalized E to assay-equivalent E:T scale",
            "#3; 0.2884 ± 0.02096"
          ],
          [
            "k_kill",
            "U(0.74, 0.80)",
            "day⁻¹",
            "Structural assumption; saturating cell-response function to daily in-vivo killing rate",
            "#11; 0.005417 ± 0.0009364"
          ],
          [
            "s_X",
            "logU(0.001, 0.15)",
            "day⁻¹",
            "Structural assumption; aggregate suppression source",
            "#7; 0.01528 ± 0.001531"
          ],
          [
            "K_X_tumor",
            "U(50, 500)",
            "mm³",
            "Structural assumption; tumor-driven suppression half-saturation",
            "#5; 0.01917 ± 0.002281"
          ],
          [
            "a0",
            "External reference with stated CV",
            "day⁻¹",
            "External LM2-4 LUC⁺/SCID literature; exponential growth rate",
            "#6; 0.01625 ± 0.001419"
          ],
          [
            "a1",
            "External reference with stated CV",
            "mm³·day⁻¹",
            "External LM2-4 LUC⁺/SCID literature; linear growth rate",
            "#4; 0.1089 ± 0.007833"
          ],
          [
            "lag_day",
            "U(0, 7)",
            "day",
            "Structural assumption; engraftment delay",
            "#9; 0.00875 ± 0.0004532"
          ],
          [
            "systemic_limit",
            "logU(1, 12)",
            "µg·day",
            "Unvalidated screening-threshold assumption; blood-exposure screening threshold",
            "#14; 0 ± 0"
          ],
          [
            "innate_limit",
            "U(1, 4)",
            "relative",
            "Unvalidated screening-threshold assumption; innate-signal screening threshold",
            "#14; 0 ± 0"
          ],
          [
            "q_scale",
            "logU(1, 100)",
            "µg",
            "Unidentified scale assumption; partial redundancy with eta in the expression input; dose normalization scale for lymph delivery and the LNP innate source",
            "#2; 0.3425 ± 0.04142"
          ]
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "**20 fixed constants**",
          "**Table 27.** Fixed constants with values, units, and structural assumptions not propagated in uncertainty analysis."
        ]
      },
      {
        "type": "table",
        "headers": [
          "Parameter / symbol",
          "Value, range or distribution",
          "Unit",
          "Evidence type and role",
          "Conditional ST / mean rank"
        ],
        "rows": [
          [
            "k_translation",
            "1",
            "day⁻¹",
            "Fixed structural assumption; Normalized RNA → antigen translation",
            "NA"
          ],
          [
            "k_lymph",
            "0.8",
            "day⁻¹",
            "Fixed structural assumption; Functional lymph-payload turnover",
            "NA"
          ],
          [
            "k_blood",
            "1.5",
            "day⁻¹",
            "Fixed structural assumption; Blood-tracer clearance",
            "NA"
          ],
          [
            "d_A",
            "0.5",
            "day⁻¹",
            "Fixed structural assumption; Antigen turnover",
            "NA"
          ],
          [
            "d_I",
            "1",
            "day⁻¹",
            "Fixed structural assumption; Innate-state loss",
            "NA"
          ],
          [
            "k_D",
            "1",
            "day⁻¹",
            "Fixed structural assumption; DC-maturation generation",
            "NA"
          ],
          [
            "d_D",
            "0.35",
            "day⁻¹",
            "Fixed structural assumption; DC-state loss",
            "NA"
          ],
          [
            "k_P",
            "1",
            "day⁻¹",
            "Fixed structural assumption; Antigen-presentation generation",
            "NA"
          ],
          [
            "d_P",
            "0.4",
            "day⁻¹",
            "Fixed structural assumption; Presentation-state loss",
            "NA"
          ],
          [
            "k_E",
            "0.6",
            "day⁻¹",
            "Fixed structural assumption; Effector T-cell priming",
            "NA"
          ],
          [
            "d_X",
            "0.15",
            "day⁻¹",
            "Fixed structural assumption; Suppression-state loss",
            "NA"
          ],
          [
            "K_A",
            "0.2",
            "relative",
            "Fixed structural assumption; Antigen-presentation half-saturation gate",
            "NA"
          ],
          [
            "K_I",
            "0.2",
            "relative",
            "Fixed structural assumption; Innate-stimulation half-saturation gate",
            "NA"
          ],
          [
            "I_translation",
            "2",
            "relative",
            "Fixed structural assumption; Translation-suppression gate scale",
            "NA"
          ],
          [
            "I_overactivation",
            "3",
            "relative",
            "Fixed structural assumption; Innate-overactivation gate scale",
            "NA"
          ],
          [
            "lnp_innate",
            "0.334",
            "day⁻¹",
            "Fixed structural assumption; LNP innate-stimulation gain",
            "NA"
          ],
          [
            "K_P",
            "0.2",
            "relative",
            "Fixed structural assumption; T-cell priming half-saturation gate",
            "NA"
          ],
          [
            "B0",
            "1",
            "mm³",
            "Fixed conventional assumption; Initial tumor burden",
            "NA"
          ],
          [
            "Bdet",
            "1",
            "mm³",
            "Fixed conventional assumption; Observable-volume detection threshold",
            "NA"
          ],
          [
            "H",
            "1",
            "dimensionless",
            "Fixed switch; Host adaptive-effector pathway",
            "NA"
          ]
        ]
      }
    ]
  },
  {
    "id": "model-sst-qn",
    "index": "05",
    "kicker": "SST-QN",
    "navLabel": "SST-QN",
    "title": "SST-QN",
    "summary": "",
    "blocks": [
      {
        "type": "prose",
        "paragraphs": [
          "The 2030 Agenda treats the **17 Sustainable Development Goals** as a coupled system where progress in one area affects others (Le Blanc, 2015; United Nations, 2015). To better understand and visualize how these interactions work, we built **SST-QN**—a quantitative model that evaluates how the 17 goals influence each other. We then applied this model to CirCure, a circRNA vaccine for triple-negative breast cancer, to calculate how the project's **direct contributions** spread through the network."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "We constructed a 17×17 interaction matrix by **pre-registering** **272 goal pairs** and scoring each relationship based on **documented mechanisms** and **evidence quality**. To ensure **traceability**, project contributions are assessed through a **four-dimensional framework**: **Action** (10%), **Implementation/outputs** (30%), **Feedback** (10%), and **Record/assessment** (50%). Each dimension uses a **fixed five-tier scale**. When we input CirCure's documented contributions to SDG 3 (health), 4 (education), 9 (innovation), 12 (responsible production), and 17 (partnerships), the model calculates spillover effects across all 17 goals."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Direct contributions total 11.25 **evidence index units** across five goals. Network propagation produces 14.43 total units, showing 28% **amplification** through multi-step pathways. SDG 4 (education) emerges as the **top beneficiary** (T=3.82), followed by SDG 9 (innovation, T=3.44) and SDG 3 (health, T=3.23). Indirect effects reveal **synergies** with SDG 1 (poverty reduction, T=0.22) and SDG 8 (employment, T=0.47). SDG 14/15 (marine and terrestrial ecosystems) show negative effects (T=-0.06, -0.09) under current scenarios but turn positive under **green implementation** pathways."
        ]
      },
      {
        "type": "subheading",
        "id": "model-heading-105",
        "index": "5.1",
        "title": "Inspiration",
        "level": 3
      },
      {
        "type": "subheading",
        "id": "model-heading-106",
        "index": "5.1.1",
        "title": "From Single-Goal Lists to Network Effects",
        "level": 4
      },
      {
        "type": "prose",
        "paragraphs": [
          "We started the way most teams do: matching CirCure to individual SDGs. Health outcomes link to SDG 3. The RNA editing platform counts as SDG 9 innovation. Resource tracking connects to SDG 12. Three separate boxes to check."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "At the 2026 Global Youth Development Week, conversations with practitioners working on education access, clean energy, and agricultural systems surfaced a different question. A health technology doesn't just improve health—it creates jobs or displaces them, costs money that raises or lowers access barriers, consumes materials from fossil or bio-based sources, and requires trained personnel who depend on education infrastructure. These aren't separate goals acting in parallel. They're coupled."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "The realization: advancing one goal changes the others. A vaccine that works but costs too much might worsen inequality even as it improves health. Scaling production might pressure ecosystems unless the process routes through **green pathway**s. We stopped asking \"which SDGs does CirCure touch\" and started asking \"when CirCure enters this coupled system, what happens to all 17 goals through their interactions?\""
        ]
      },
      {
        "type": "subheading",
        "id": "model-heading-107",
        "index": "5.1.2",
        "title": "Why Existing Models Don't Fit",
        "level": 4
      },
      {
        "type": "prose",
        "paragraphs": [
          "Existing SDG interaction models fall into three camps: expert scoring methods that capture direct relationships but can't compute **multi-step propagation** (Nilsson et al., 2016), indicator correlation approaches that need decades of national-level data projects don't have (Pradhan et al., 2017), and network analysis frameworks built for policy-scale questions with no clear injection point for a specific technology (Zhou and Moinuddin, 2017; Dawes, 2022). We needed a model that accepts project-specific inputs—experiments, documented activities, stakeholder feedback—and propagates effects through a defensible network structure without requiring data we'll never collect."
        ]
      },
      {
        "type": "subheading",
        "id": "model-heading-108",
        "index": "5.1.3",
        "title": "Design Principles",
        "level": 4
      },
      {
        "type": "prose",
        "paragraphs": [
          "**SST-QN** breaks the problem into three separable layers."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "The **boundary layer** pre-registers which goal pairs may interact directly before we score anything. We classify all **272 directed edges** into core (well-supported mechanisms), exploratory (plausible but weak evidence), conditional (sign depends on implementation), or excluded (no direct mechanism). Freezing this structure before seeing results prevents reverse-engineering conclusions."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "The **scoring layer** assigns each allowed edge a value on [−1, +1], split into direction (from systematic reviews) and **evidence quality** (mechanism clarity, reproducibility). If someone challenges a score we can defend the two factors separately. **Conditional edges** use a **gate parameter** M: M=0 represents worst-case pathways like fossil-intensive production, M=1 represents best-case like **circular economy** with renewables, M=0.42 is the reference calibrated to current global averages."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "The **propagation layer** computes **network effects**. Matrix A captures **one-step relationships**, but the full effect includes **multi-step paths**: SDG 3→9→8 means health innovation creates jobs even without a direct 3→8 edge. We compute this via matrix power series, truncated at three steps because longer chains lose causal clarity. **Monte Carlo** sampling quantifies **uncertainty**. Gate scenarios model implementation choices—often the most policy-relevant finding."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "When evaluating CirCure's contributions, the model requires traceable evidence through four dimensions:"
        ]
      },
      {
        "type": "list",
        "items": [
          "Action (did activities start?)",
          "Implementation (were outputs delivered?)",
          "Feedback (did stakeholders engage?)",
          "Record (is evidence documented and verifiable?)"
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Each dimension scores on a **fixed five-tier scale**. Record carries 50% weight because external evaluators cannot verify undocumented claims. Contribution scores are based on evidence that others can confirm."
        ]
      },
      {
        "type": "subheading",
        "id": "model-heading-109",
        "index": "5.2",
        "title": "Mathematical Framework",
        "level": 3
      },
      {
        "type": "subheading",
        "id": "model-heading-110",
        "index": "5.2.1",
        "title": "Core Structure",
        "level": 4
      },
      {
        "type": "prose",
        "paragraphs": [
          "**SST-QN** treats the 17 SDGs as nodes in a **directed network**. Each directed edge from SDG i to SDG j carries a score S_ij ∈ [−1, 1] representing how progress in goal i affects goal j. **Positive scores** indicate **synergies**, **negative scores** indicate **trade-offs**, and zero means no direct interaction."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "The network has 17 × 16 = **272 possible directed edges** (excluding self-loops). We represent the system as a 17×17 **matrix A** where A_ij = S_ij. This matrix encodes **one-step propagation**: if we advance SDG i by one unit, A_ij tells us the direct effect on SDG j."
        ]
      },
      {
        "type": "subheading",
        "id": "model-heading-111",
        "index": "5.2.2",
        "title": "Pre-Registered Boundaries",
        "level": 4
      },
      {
        "type": "prose",
        "paragraphs": [
          "Before assigning any scores, we classified all 272 directed pairs into four categories based on mechanism clarity and evidence strength, documented in a classification ledger that became part of the permanent record:"
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "**Core edges (C): Direct, well-documented mechanisms supported by multiple sources. Example: SDG 3 (health) → SDG 1 (poverty). Better health reduces medical expenditure and increases labor productivity, both documented in systematic reviews of SDG interactions (Pradhan et al., 2017). 44 edges fall in this category.**"
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "**Exploratory edges (E)**: Plausible mechanisms with weaker or single-source evidence. Example: SDG 4 (education) → SDG 13 (climate action). Education can increase climate awareness, but the strength of this link at project scale is less certain. 20 edges fall here."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "**Conditional edges (±)**: Sign depends on implementation pathway. Example: SDG 9 (industry/innovation) → SDG 15 (terrestrial ecosystems). Resource-intensive industrialization harms ecosystems; circular-economy approaches protect them. 35 edges are conditional."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "**Excluded edges (0)**: No direct mechanism identified in literature or project context. These edges receive zero in the adjacency matrix, but **indirect effects** through **multi-step paths** are allowed. 173 edges are excluded."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "This **pre-registration** serves two purposes: it prevents us from adjusting classifications after seeing results (which would invalidate the analysis), and it documents what we can and cannot defend based on available evidence."
        ]
      },
      {
        "type": "feature",
        "key": "model-sdg-boundary"
      },
      {
        "type": "subheading",
        "id": "model-heading-112",
        "index": "5.2.3",
        "title": "Scoring System",
        "level": 4
      },
      {
        "type": "prose",
        "paragraphs": [
          "For each non-excluded edge, we assign S_ij ∈ [−1, 1] based on two separable factors: direction (from systematic reviews (Nilsson et al., 2016; Pradhan et al., 2017)) and **evidence quality** (mechanism clarity, reproducibility, causal strength at project scale)."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Direction comes from literature synthesis: does advancing SDG i help or harm SDG j? Magnitude reflects how strong the documented mechanism is. Evidence quality accounts for whether the mechanism operates at project scale (not just national aggregates), whether multiple studies agree, and whether the causal pathway is explicit rather than correlational."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "**Conditional edges** use a **gate parameter** M ∈ [0,1] to interpolate between worst-case and best-case scenarios:"
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "S_ij = M × (L⁺_ij / 3) × q_ij + (1 − M) × (L⁻_ij / 3) × q_ij"
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "where L⁺ represents **green pathway**s (**renewable energy**, **circular economy**) and L⁻ represents resource-intensive pathways (fossil fuels, linear production). M = 0.42 serves as our **reference scenario** based on current global implementation patterns."
        ]
      },
      {
        "type": "feature",
        "key": "model-sdg-interactions"
      },
      {
        "type": "feature",
        "key": "model-sdg-dimensions"
      },
      {
        "type": "subheading",
        "id": "model-heading-113",
        "index": "5.2.4",
        "title": "Network Propagation",
        "level": 4
      },
      {
        "type": "prose",
        "paragraphs": [
          "Matrix A describes **one-step relationships**. Real interactions also propagate through mediators: SDG 3 (health) affects SDG 8 (employment) directly, but also indirectly through SDG 1 (poverty)—healthier populations escape poverty, which then increases workforce participation."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "We compute **total effects** through matrix power series:"
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "T = A + α A² + α² A³ + ... = Σ (k=1 to K) αᵏ Aᵏ"
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "where A captures direct (one-step) effects, A² captures two-step paths (i → m → j), A³ captures three-step paths (i → m → n → j), α is a decay factor that discounts longer paths, and K = 3 truncates the series for computational and interpretative clarity."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "When the spectral radius ρ(αA) < 1, the series converges and we can use the closed form:"
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "T = (I − αA)⁻¹ − I"
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "We set α = 0.5 / ρ(A), ensuring an effective spectral radius of 0.5. This balances two concerns: α must be large enough that multi-step effects matter, but small enough that the series converges and fourth-order paths contribute negligibly."
        ]
      },
      {
        "type": "subheading",
        "id": "model-heading-114",
        "index": "5.2.5",
        "title": "Project Injection",
        "level": 4
      },
      {
        "type": "prose",
        "paragraphs": [
          "Given an **intervention vector** u where u_i represents a project's **direct contribution** to SDG i, the total system-wide impact is:"
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "r = (I − αA)⁻¹ u"
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "This decomposes as:"
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "r = u + (αA)u + (αA)² u + (αA)³ u + ..."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "where u is the **direct contribution** (what the project does), (αA)u is **one-step propagation** (direct effects trigger adjacent goals), and (αA)² u, (αA)³ u represent **multi-step propagation** (chain reactions)."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "The model accepts any project's **direct contribution** vector and calculates how those contributions propagate through the **pre-registered** network to generate system-wide effects."
        ]
      },
      {
        "type": "subheading",
        "id": "model-heading-115",
        "index": "5.3",
        "title": "Applying SST-QN to CirCure",
        "level": 3
      },
      {
        "type": "subheading",
        "id": "model-heading-116",
        "index": "5.3.1",
        "title": "Constructing the Intervention Vector",
        "level": 4
      },
      {
        "type": "prose",
        "paragraphs": [
          "To apply **SST-QN**, we first needed to document CirCure's **direct contributions** to each SDG. We assessed each goal through the four-dimensional evidence framework: **Action** (did activities start?), Implementation (were outputs delivered?), **Feedback** (did stakeholders engage?), and Record (is evidence documented and verifiable?). Each dimension scores on a **fixed five-tier scale** (1.00 / 0.75 / 0.50 / 0.25 / 0.00), weighted as A=10%, I=30%, F=10%, R=50%."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "The contribution index formula is D = 3G(0.10A + 0.30I + 0.10F + 0.50R), where G=1 for goals the project addresses, G=0 otherwise. A score of 0.00 does not mean CirCure has no effect on that goal—it means we have no documented direct action. Indirect effects emerge through network propagation."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "**SDG 3 (Health): D = 2.325**"
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "A=1.00: Vaccine design activities documented (antigen selection, circRNA encoding, LNP formulation). I=0.75: In vitro DC maturation (CD80⁺CD86⁺), T cell activation (CD8⁺CD69⁺), IFN-γ secretion, animal tumor growth inhibition—stage outputs without clinical endpoints. F=0.75: Patient interviews revealed treatment cost barriers; oncologist consultations informed antigen priorities. R=0.75: Lab protocols, data files, and interview transcripts documented, but missing integrated needs assessment across stakeholder groups."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "**SDG 9 (Industry, Innovation and Infrastructure): D = 2.550**"
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "A=1.00: ADAR-mediated RNA editing system, circRNA self-**amplification**, modular multi-antigen design, LNP delivery optimization all initiated. I=1.00: Functional validation across multiple technical checkpoints (editing efficiency, circRNA stability, immune activation). F=0.75: Industry consultations on scale-up feasibility, technology transfer workshop documented. R=1.00: Complete technical documentation, structured data, reproducible protocols—independent verification possible."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "**SDG 4 (Education): D = 2.550**"
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "A=1.00: Workshops for high school students and undergraduates, synthetic biology curriculum modules, hands-on lab experiences delivered. I=1.00: Post-workshop surveys showing increased understanding, participant feedback, immediate knowledge assessments—stage-appropriate for education. F=0.75: Student feedback integrated into workshop design; educator consultations on curriculum alignment documented. R=1.00: Survey data structured and analyzed, workshop materials published, assessment rubrics documented, attendance tracked."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "**SDG 12 (Responsible Consumption and Production): D = 1.950**"
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "A=1.00: Resource consumption tracking initiated, waste management protocols established, consumables inventory maintained. I=0.75: Resource logs quantifying materials per dose, waste generation measured, energy consumption documented. F=0.75: Environmental NGO recommendations on green chemistry documented. R=0.50: Consumables and energy data structured, but lacking full lifecycle assessment or cross-scale extrapolation validation."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "**SDG 17 (Partnerships for the Goals): D = 1.875**"
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "A=1.00: Stakeholder engagement with patient groups, biotech companies, clinicians, environmental NGOs documented. I=0.75: Partnership outputs include recommendations integrated into project design, co-developed protocols. F=0.50: **Feedback** from partners documented but not systematically structured across all partnerships. R=0.50: Partnership records exist but lack complete mapping of all collaborative outputs and decision points."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "**All other SDGs: D = 0.000**"
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Zero scores for SDG 1, 2, 5, 6, 7, 8, 10, 11, 13, 14, 15, 16 mean we have no documented direct actions targeting these goals. For SDG 13 (Climate), real laboratory energy consumption exists, but without structured measurement and documentation (R=0), the contribution index becomes zero under strict **traceability** requirements. The model will calculate whether **indirect effects** emerge through network propagation."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "The **intervention vector** is:"
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "u = [0, 0, 2.325, 2.550, 0, 0, 0, 0, 2.550, 0, 0, 1.950, 0, 0, 0, 0, 1.875]"
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Direct input sum: 11.250"
        ]
      },
      {
        "type": "subheading",
        "id": "model-heading-117",
        "index": "5.3.2",
        "title": "Results Overview",
        "level": 4
      },
      {
        "type": "prose",
        "paragraphs": [
          "We computed r = (I − αA)⁻¹ u under the **reference scenario** (M = 0.42). Total positive effects sum to 14.43, representing a 1.28-fold **amplification** through **network effects**. Direct contributions (11.25) propagate through one-step pathways and multi-step chains to generate system-wide impact."
        ]
      },
      {
        "type": "feature",
        "key": "model-sdg-contributions"
      },
      {
        "type": "prose",
        "paragraphs": [
          "**Top five total impacts:**"
        ]
      },
      {
        "type": "list",
        "items": [
          "SDG 4 (Education): 3.82 (D=2.55, I₁=1.06, I₂₊=0.21)",
          "SDG 9 (Innovation): 3.44 (D=2.55, I₁=0.78, I₂₊=0.11)",
          "SDG 3 (Health): 3.23 (D=2.33, I₁=0.76, I₂₊=0.15)",
          "SDG 12 (Responsible Production): 2.36 (D=1.95, I₁=0.38, I₂₊=0.03)",
          "SDG 17 (Partnerships): 1.88 (D=1.88, I₁=0.00, I₂₊=0.00)"
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "**Key indirect effects (direct = 0):**"
        ]
      },
      {
        "type": "list",
        "items": [
          "SDG 5 (Gender Equality): 0.68",
          "SDG 8 (Employment): 0.47",
          "SDG 13 (Climate Action): 0.42",
          "SDG 10 (Inequality): 0.37",
          "SDG 1 (Poverty): 0.22"
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "**Negative effects:**"
        ]
      },
      {
        "type": "list",
        "items": [
          "SDG 15 (Terrestrial ecosystems): −0.09",
          "SDG 14 (Marine ecosystems): −0.06"
        ]
      },
      {
        "type": "subheading",
        "id": "model-heading-118",
        "index": "5.3.3",
        "title": "Key Findings",
        "level": 4
      },
      {
        "type": "prose",
        "paragraphs": [
          "**SDG 4 (Education) emerges as top beneficiary.** Total effect (3.82) exceeds both SDG 9 and SDG 3 due to strong **one-step propagation** (I₁=1.06). This does not mean education impact is larger than health or innovation impact—it reflects that under the **four-dimensional framework**, comprehensive education documentation (I=1.0, R=1.0 for delivered workshops with structured assessment) combined with network position produces the highest weighted index."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "**SDG 1 (Poverty) and SDG 8 (Employment) show modest indirect effects.** Compared to assessments using different scoring methods, these have dropped substantially (SDG 1: 0.97→0.22; SDG 8: 0.99→0.47). The reduction stems from the R=50% weighting—when direct inputs prioritize well-documented education and innovation activities over health outcomes (where stage-appropriate verification lowers Implementation scores), the pathways feeding poverty reduction (Health → Poverty) carry less weight. The mechanism remains valid (health improvements reduce medical impoverishment), but the effect magnitude now reflects documentation completeness rather than projected real-world impact."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "The poverty-reduction pathway operates as follows: Patient interviews confirmed treatment costs create financial barriers. One interviewee stated: \"If the price is too high, even if it works, I'll give up treatment to avoid bankrupting my family.\" Effective treatment that costs less than chemotherapy prevents medical impoverishment. The model's predicted indirect effect (0.22) aligns directionally with qualitative evidence, though the magnitude is lower than earlier estimates because SDG 3's contribution index now weights documentation over projected clinical impact."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "The employment pathway traces through two mechanisms: Innovation → Employment (SDG 9 → SDG 8) via technology commercialization, and Health → Employment (SDG 3 → SDG 8) via workforce participation. Industry stakeholder interviews indicated that scaled circRNA production requires manufacturing technicians and quality control specialists. One industry partner estimated 15-20 jobs per 10,000-dose annual capacity. Again, the model's prediction (0.47) matches stakeholder feedback directionally but at reduced magnitude."
        ]
      },
      {
        "type": "subheading",
        "id": "model-heading-119",
        "index": "5.3.4",
        "title": "Trade-offs and Mitigation",
        "level": 4
      },
      {
        "type": "prose",
        "paragraphs": [
          "**SDG 14/15 (Ecosystems) show persistent negative effects.** Marine ecosystems (−0.06) and terrestrial ecosystems (−0.09) remain negative under **reference scenario** (M=0.42). The mechanism traces through Innovation/Industry (SDG 9) → Resource Consumption (SDG 12) → Ecosystems (SDG 14/15). Laboratory operations and scaled manufacturing consume materials (plastics, reagents, cold chain energy). Resource extraction and waste generation harm ecosystems when production follows conventional pathways."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "However, these effects are conditional. We conducted gate-parameter analysis across three scenarios:",
          "**Table 28.** Gate scenario comparison showing ecological SDG impacts under reference, fossil-intensive, and green pathways."
        ]
      },
      {
        "type": "table",
        "headers": [
          "Scenario",
          "Gate M",
          "SDG 13 (Climate)",
          "SDG 14 (Water Life)",
          "SDG 15 (Land Life)",
          "Ecological Total"
        ],
        "rows": [
          [
            "Reference (current mix)",
            "0.42",
            "0.42",
            "−0.06",
            "−0.09",
            "2.15"
          ],
          [
            "Worst (fossil-intensive)",
            "0",
            "0.06",
            "−0.20",
            "−0.18",
            "1.32"
          ],
          [
            "Green (renewables + circular)",
            "1",
            "0.77",
            "0.47",
            "0.77",
            "5.87"
          ]
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Under **green implementation** (M=1.0), all ecological goals flip positive. The 4.55-unit swing in ecological dimension total (1.32→5.87) demonstrates that ecosystem **trade-offs** are not intrinsic to the vaccine technology but depend on manufacturing choices CirCure has not yet made. Environmental NGO partners (documented in SDG 17 activities) provided recommendations for green chemistry substitutions and **renewable energy** sourcing that informed the M=1.0 scenario parameters."
        ]
      },
      {
        "type": "subheading",
        "id": "model-heading-120",
        "index": "5.4",
        "title": "Model Validation",
        "level": 3
      },
      {
        "type": "subheading",
        "id": "model-heading-121",
        "index": "5.4.1",
        "title": "Internal Consistency",
        "level": 4
      },
      {
        "type": "prose",
        "paragraphs": [
          "Before comparing **SST-QN** to external benchmarks, we checked whether the model behaves as designed."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "**Convergence check:** The matrix power series T = Σ αᵏAᵏ must converge for results to be meaningful. We verified that the spectral radius ρ(αA) = 0.50, which guarantees convergence. We also compared the truncated series (K=3) against the closed-form solution (I − αA)⁻¹ − I. Maximum element-wise difference is 0.077, meaning truncation at third-order paths introduces less than 8% error in any single interaction estimate. This is acceptable given that edge scores themselves carry larger uncertainties."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "**Sign preservation:** If SDG i positively affects SDG j through documented pathways, the total effect T_ij should remain positive even after **multi-step propagation**. We checked all 99 non-zero edges: 97 preserved their signs through propagation, 2 flipped due to strong indirect counterflows. Example: SDG 4 (Education) → SDG 2 (Hunger) is positive at one step (education improves agricultural knowledge), but turns slightly negative after propagation because education also drives urbanization (SDG 11), which can disrupt traditional food systems. This flip is mechanistically plausible and documented in rural-urban transition literature, so we count it as correct model behavior rather than an error."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "**Null test:** We constructed a null **intervention vector** u_null = [0, 0, ..., 0] (no project). The model correctly returns r_null = 0 for all SDGs, confirming that effects only arise from actual inputs."
        ]
      },
      {
        "type": "subheading",
        "id": "model-heading-122",
        "index": "5.4.2",
        "title": "Convergence with Published Research",
        "level": 4
      },
      {
        "type": "prose",
        "paragraphs": [
          "We compared our interaction **matrix A** to two widely-cited SDG interaction studies."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "**Pradhan et al. (2017):** Indicator correlation analysis across 227 countries over 15 years. They report correlation matrices for SDG indicator pairs, which we converted to interaction signs (positive correlation → synergy, negative correlation → trade-off). On the 183 goal pairs where both studies have data, sign agreement is 78% (143 pairs match, 40 differ). Spearman rank correlation on overlapping scores: ρ = 0.64."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "**Nilsson et al. (2016):** Expert scoring of 316 target-level interactions using a seven-point scale. We aggregated their target scores to goal-level and compared signs. On 142 overlapping pairs, sign agreement is 81% (115 pairs match, 27 differ). Spearman rank correlation: ρ = 0.58."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Discrepancies exist because the three studies measure different constructs. Pradhan measures macro-level correlation between countries' aggregate SDG performance, which includes confounders and common causes that do not represent causal pathways. Nilsson elicits expert judgments about policy-scale interventions, which may not operate at project scale. **SST-QN** scores project-scale mechanisms using literature and stakeholder evidence—pathways an individual biotech project can trigger."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Despite these conceptual differences, 78-81% sign agreement suggests the model captures real interaction patterns rather than arbitrary assignments."
        ]
      },
      {
        "type": "subheading",
        "id": "model-heading-123",
        "index": "5.4.3",
        "title": "Four-Dimensional Framework Verification",
        "level": 4
      },
      {
        "type": "prose",
        "paragraphs": [
          "The A/I/F/R scoring framework aligns with how **iGEM judges** evaluate contributions. We mapped the four dimensions to judging criteria: **Action** corresponds to \"demonstrated effort\" (whether work began), Implementation maps to \"results produced\" (deliverables with appropriate verification), **Feedback** captures \"stakeholder engagement\" (documented input), and Record reflects \"**evidence quality**\" (**traceability** for independent review)."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Record's 50% weight reflects that evaluators cannot verify claims without documentation—a principle embedded in iGEM's emphasis on \"show your work.\" The **fixed five-tier scale** ensures consistency across different team members scoring different SDGs. When two team members independently scored CirCure's contributions, inter-rater agreement was 88% on tier assignment (exact match) and 100% within one tier."
        ]
      },
      {
        "type": "subheading",
        "id": "model-heading-124",
        "index": "5.4.4",
        "title": "Historical Case Backtest",
        "level": 4
      },
      {
        "type": "prose",
        "paragraphs": [
          "We tested the model on yeast-synthesized artemisinic acid—a synthetic biology case with **documented trade-offs** where industrialization displaced smallholder artemisia farmers and patent restrictions limited access. Building an **intervention vector** from its technical features (innovation in metabolic engineering, scaled fermentation production), the model reproduces literature-reported patterns: SDG 3 (health) positive, SDG 1 (poverty) negative due to farmer displacement, SDG 10 (inequality) negative due to access barriers. This case demonstrates that the model can surface both **synergies** and **trade-offs** when the underlying mechanisms operate in documented directions."
        ]
      },
      {
        "type": "subheading",
        "id": "model-heading-125",
        "index": "5.4.5",
        "title": "Limitations of Validation",
        "level": 4
      },
      {
        "type": "prose",
        "paragraphs": [
          "These comparisons are suggestive, **not definitive**. Pradhan and Nilsson measure different constructs at different scales. Perfect agreement would actually be suspicious—it would suggest we replicated their methods rather than adapting the framework to project-scale evidence. The 78-81% agreement indicates our model is grounded in established SDG interaction patterns while remaining appropriately tailored to project contexts."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "A stronger validation would compare **SST-QN** predictions to observed multi-goal outcomes in other completed biotech projects. Such data are scarce—most projects report only their target SDGs, not system-wide effects. As more iGEM teams adopt **SST-QN**, **cross-project validation** will become possible."
        ]
      },
      {
        "type": "subheading",
        "id": "model-heading-126",
        "index": "5.5",
        "title": "Uncertainty and Scenarios",
        "level": 3
      },
      {
        "type": "subheading",
        "id": "model-heading-127",
        "index": "5.5.1",
        "title": "Sources of Uncertainty",
        "level": 4
      },
      {
        "type": "prose",
        "paragraphs": [
          "**SST-QN**'s scores are constructed from literature, stakeholder interviews, and project documentation, not from controlled experiments. Three sources of **uncertainty** affect the results."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "**Scoring uncertainty:** Each edge score combines direction (from systematic reviews) and **evidence quality** (mechanism clarity, reproducibility). Both involve judgment. Two researchers examining the same evidence might assign different strength values. We do not claim our scores are objectively correct—only that they are defensible given the evidence we documented."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "**Input uncertainty:** CirCure's **intervention vector** u uses the **four-dimensional framework**, but tier assignments involve judgment. SDG 3's Implementation score (0.75) reflects stage outputs without clinical endpoints. A different team might rate this 0.50 or 1.00 depending on how they weight R&D-stage evidence. Record scores (50% weight) carry the same tier-assignment **uncertainty**. This **input uncertainty** propagates through the network."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "**Propagation uncertainty:** The decay factor α = 0.5 / ρ(A) and truncation at K=3 are design choices. Different values would yield different results. We selected these parameters to balance convergence, interpretability, and computational cost, but they introduce model **uncertainty** that we do not address through sensitivity analysis."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "We address scoring and **input uncertainty** through **Monte Carlo** simulation, **propagation uncertainty** remains unaddressed and represents a **known limitation**."
        ]
      },
      {
        "type": "subheading",
        "id": "model-heading-128",
        "index": "5.5.2",
        "title": "Monte Carlo Quantification",
        "level": 4
      },
      {
        "type": "prose",
        "paragraphs": [
          "For each edge score and each four-dimensional input component (A/I/F/R), we specified **uncertainty** ranges: core edges ±15% (high confidence), exploratory edges ±25% (moderate confidence), **conditional edges** ±20% in both directions, direct input dimensions ±20% (tier-assignment **uncertainty**). We sampled 4,096 realizations from these distributions, recomputed the full model for each, and collected the distribution of outcomes."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Results for key SDGs (median [90% **credible interval**]):",
          "**Table 29.** Total SDG impact indices for CirCure with median values, 90% intervals, and negative probabilities."
        ]
      },
      {
        "type": "table",
        "headers": [
          "SDG",
          "Median Total",
          "90% Interval",
          "Negative Probability"
        ],
        "rows": [
          [
            "4 (Education)",
            "3.82",
            "[2.91, 4.86]",
            "0%"
          ],
          [
            "9 (Innovation)",
            "3.44",
            "[2.68, 4.31]",
            "0%"
          ],
          [
            "3 (Health)",
            "3.23",
            "[2.45, 4.12]",
            "0%"
          ],
          [
            "1 (Poverty)",
            "0.22",
            "[0.11, 0.38]",
            "0%"
          ],
          [
            "8 (Employment)",
            "0.47",
            "[0.28, 0.71]",
            "0%"
          ],
          [
            "14 (Marine)",
            "−0.06",
            "[−0.18, 0.09]",
            "58.30%"
          ],
          [
            "15 (Terrestrial)",
            "−0.09",
            "[−0.24, 0.11]",
            "64.70%"
          ]
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "**Ranking stability:** We computed how often each SDG maintains its position across simulations. Top-three beneficiaries (SDG 4/9/3) hold their ranks in 89%, 76%, and 82% of simulations respectively—highly stable. SDG 1 (Poverty) and SDG 8 (Employment) appear in positions 8-12 with wider variance, reflecting that their effects emerge through longer propagation chains where **uncertainty** accumulates."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "**Interpretation:** The conclusion \"SDG 4/9/3 are top contributors\" is **robust** to **scoring uncertainty**. The conclusion \"SDG 14/15 show negative effects\" is less certain—intervals cross zero, meaning the sign could flip under different assumptions. This highlights that ecosystem impacts depend heavily on implementation choices, which scenario analysis explores next."
        ]
      },
      {
        "type": "subheading",
        "id": "model-heading-129",
        "index": "5.5.3",
        "title": "Gate-Parameter Scenarios",
        "level": 4
      },
      {
        "type": "prose",
        "paragraphs": [
          "**Conditional edges** (±) use **gate parameter** M ∈ [0,1] to interpolate between implementation pathways. We computed three scenarios representing worst-case (M=0.0, resource-intensive production with fossil energy), reference (M=0.42, current global average for biotech manufacturing), and **green pathway** (M=1.0, **renewable energy** with **circular economy** principles)."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Results across scenarios:",
          "**Table 30.** SDG impact indices across three gate scenarios showing sensitivity to manufacturing pathway choices."
        ]
      },
      {
        "type": "table",
        "headers": [
          "SDG",
          "M=0.0 (Worst)",
          "M=0.42 (Reference)",
          "M=1.0 (Green)"
        ],
        "rows": [
          [
            "3 (Health)",
            "3.21",
            "3.23",
            "3.27"
          ],
          [
            "8 (Employment)",
            "0.39",
            "0.47",
            "0.68"
          ],
          [
            "13 (Climate)",
            "0.21",
            "0.42",
            "0.77"
          ],
          [
            "14 (Marine)",
            "−0.20",
            "−0.06",
            "0.47"
          ],
          [
            "15 (Terrestrial)",
            "−0.18",
            "−0.09",
            "0.77"
          ],
          [
            "Ecological Total",
            "1.32",
            "2.15",
            "5.87"
          ]
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "All three ecological goals (SDG 13/14/15) flip from negative to positive under **green implementation**. The 4.55-unit swing in ecological dimension total (1.32→5.87) demonstrates that ecosystem **trade-offs** are implementation-dependent, not intrinsic to vaccine technology. If CirCure adopts **renewable energy**, circular materials, and green chemistry during scale-up, it can simultaneously improve health, create jobs, reduce poverty, and protect ecosystems."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Employment gains under **green pathway**: SDG 8 (Employment) also improves under **green implementation** (0.47→0.68). This occurs because **renewable energy** installations and **circular economy** infrastructure create additional jobs beyond direct manufacturing—a synergy documented in green economy literature that the model captures through **multi-step propagation** (SDG 9→12→7→8 pathway)."
        ]
      },
      {
        "type": "feature",
        "key": "model-panel-27"
      },
      {
        "type": "subheading",
        "id": "model-heading-134",
        "index": "5.6",
        "title": "Discussion",
        "level": 3
      },
      {
        "type": "prose",
        "paragraphs": [
          "**SST-QN** quantifies how CirCure's contributions propagate through the SDG network. Direct inputs across five goals (11.25 **evidence index units**) amplify 1.28-fold through **network effects**. Each documented action generates 1.28 units of system-wide impact. The **four-dimensional framework** scores contributions through **Action**, Implementation, **Feedback**, and Record, with Record weighted at 50% to ensure claims trace to verifiable documentation. SDG 4 (Education, T=3.82), SDG 9 (Innovation, T=3.44), and SDG 3 (Health, T=3.23) rank as top contributors. Indirect effects emerge in goals CirCure never directly targeted—SDG 5 (Gender Equality, 0.68), SDG 8 (Employment, 0.47), SDG 1 (Poverty, 0.22). Gate scenario analysis shows ecological impacts depend on implementation choices. Under **green pathway**s (M=1.0), SDG 14/15 flip from negative to positive, shifting ecological total from 1.32 to 5.87."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "**SST-QN** has two inherent limitations. First, rankings depend more on what materials we have than actual importance. Results don't match intuition—SDG 4 (Education) ranks highest because workshop activities have complete records (R=1.0), while SDG 3 (Health), the project's core, remains at R&D stage without clinical endpoints. Second, the model cannot account for temporal differences. Some effects we document now may only materialize years later, but **SST-QN** treats all impacts as occurring in the present. This means it cannot guide resource allocation priorities or distinguish short-term deliverables from long-term cascades."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Cross-project validation will test whether **SST-QN** generalizes beyond CirCure. As more iGEM teams apply the framework and compare predictions to stakeholder feedback, patterns will emerge showing which interaction pathways hold across different technologies and contexts. This collective validation enables **SST-QN** to evolve—edges can be recalibrated, **uncertainty** ranges tightened, and new mechanisms incorporated as synthetic biology expands into novel domains. Integrating temporal dynamics would add predictive power, letting teams forecast not just what effects occur but when they unfold. The ultimate goal is for **SST-QN** to become a shared tool that helps synthetic biology teams navigate sustainability from the earliest design decisions. With a validated model, teams could identify co-benefits before committing resources, spot **trade-offs** before they lock in through manufacturing choices, and steer their projects toward pathways that create positive cascades across health, environment, and equity simultaneously. **SST-QN** is one project's attempt to make invisible **network effects** visible and actionable—if other teams build on it, the framework could become part of how responsible innovation happens in synthetic biology."
        ]
      }
    ]
  },
  {
    "id": "model-references",
    "index": "06",
    "kicker": "References",
    "navLabel": "References",
    "title": "References",
    "summary": "",
    "blocks": [
      {
        "type": "feature",
        "key": "model-references"
      }
    ]
  }
];

export const modelPanels: Record<string, ModelPanel> = {
  "model-panel-1": {
    "kind": "fold",
    "title": "Detailed scoring criteria",
    "blocks": [
      {
        "type": "prose",
        "paragraphs": [
          "**Localization (L, 0–5 points)** distinguishes membrane proteins from intracellular targets. Membrane-localized antigens (5 points) are accessible to antibody-based therapies and can be targeted by both arms of the adaptive immune system. Intracellular proteins (3 points) require processing and MHC presentation for T-cell recognition, making them suitable for vaccines but not for antibodies alone. Antigens with uncertain or unfavorable localization receive 0 points."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "**Tumor specificity (S, 0–2 points)** reflects how selectively the antigen is expressed in tumor versus normal tissue. Tumor-specific antigens such as neoantigens or cancer-testis antigens (2 points) minimize the risk of autoimmunity. Tumor-associated antigens that are overexpressed in cancer but also present in normal tissues (1 point) are acceptable if the normal expression is low or restricted to expendable compartments. Antigens broadly expressed across essential normal tissues receive 0 points."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "**Prognostic association (P, 0–1 point)** captures whether high antigen expression correlates with worse survival in TNBC patient cohorts. A candidate receives 1 point if published studies report a statistically significant association between elevated expression and at least one adverse survival endpoint—overall survival (OS), disease-free survival (DFS), relapse-free survival (RFS), metastasis-free survival (MFS), or distant metastasis-free survival (DMFS)—in human TNBC cohorts. Antigens without such evidence receive 0 points. This criterion identifies targets whose elimination may confer clinical benefit."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "**TNBC therapeutic validation depth (T, 0–2 points)** assesses the strength of clinical evidence that targeting the antigen can elicit anti-tumor effects specifically in TNBC. We refined this dimension from the original framework to distinguish between regulatory approval, replicated clinical signals, and exploratory trials. A candidate receives 2 points if an antigen-directed therapy has obtained regulatory approval for a TNBC indication, supported by randomized trial data showing survival benefit. One point is awarded if there is replicated clinical evidence of anti-tumor activity in TNBC—such as objective responses observed across independent cohorts, different drugs targeting the same antigen, or single-agent plus combination signals. Zero points are given when clinical exploration has been initiated, but no efficacy signal has emerged, when trials have failed, or when the only evidence comes from other cancer types. This distinction is critical: many antigens have been \"targeted\" in early-phase trials without demonstrating benefit, and efficacy in other cancers does not guarantee relevance in TNBC."
        ]
      }
    ]
  },
  "model-panel-2": {
    "kind": "fold",
    "title": "Complete scoring table for all evaluated antigens",
    "blocks": [
      {
        "type": "prose",
        "paragraphs": [
          "**Table 2.** Complete scoring table for all evaluated antigens."
        ]
      },
      {
        "type": "table",
        "headers": [
          "Protein name",
          "Location",
          "Tumor-associated\nexpression and\nspecificity",
          "Association with poor prognosis in TNBC",
          "TNBC therapeutic validation",
          "Total scores"
        ],
        "rows": [
          [
            "TROP-2",
            "5",
            "1 (Human Protein Atlas, n.d.-a; Li et al., 2025)",
            "1 (Li et al., 2025)",
            "2 (FDA, 2026; Bardia et al., 2021)",
            "9"
          ],
          [
            "B7-H4",
            "5",
            "1 (Wang et al., 2018; Pfizer, 2024)",
            "1 (Wang et al., 2018)",
            "1 (Hamilton et al., 2025; Pfizer, 2024)",
            "8"
          ],
          [
            "LIV-1 / ZIP6",
            "5",
            "1 (Saravanan et al., 2024)",
            "1 (Saravanan et al., 2024)",
            "1 (Peng et al., 2026)",
            "8"
          ],
          [
            "Nectin-4",
            "5",
            "1 (M-Rabet et al., 2017)",
            "1 (M-Rabet et al., 2017)",
            "1 (Giordano et al., 2024; Zhang et al., 2025)",
            "8"
          ],
          [
            "GPNMB",
            "5",
            "1 (Huang et al., 2021)",
            "1 (Huang et al., 2021)",
            "0 (Vahdat et al., 2021)",
            "7"
          ],
          [
            "ROR1",
            "5",
            "1 (Chien et al., 2016)",
            "1 (Chien et al., 2016)",
            "0* (ClinicalTrials.gov, n.d.-a, NCT04504916)",
            "7"
          ],
          [
            "PTK7",
            "5",
            "1 (Kim et al., 2025)",
            "1 (Kim et al., 2025)",
            "0* (Maitland et al., 2021)",
            "7"
          ],
          [
            "FRα",
            "5",
            "1 (Ginter et al., 2017; Norton et al., 2020)",
            "1 (Ginter et al., 2017; Norton et al., 2020)",
            "0* (ClinicalTrials.gov, n.d.-b, NCT02593227)",
            "7"
          ],
          [
            "B7-H3",
            "5",
            "1 (Kim et al., 2022)",
            "1 (Kim et al., 2022)",
            "0* (ClinicalTrials.gov, n.d.-c, NCT03729596)",
            "7"
          ],
          [
            "EGFR",
            "5",
            "1 (Liu et al., 2012)",
            "1 (Liu et al., 2012; Zhang et al., 2014)",
            "0* (Carey et al., 2012)",
            "7"
          ],
          [
            "GD2 (carbohydrate antigen)",
            "5",
            "1 (Higashi et al., 2023)",
            "1 (Higashi et al., 2023)",
            "0* (ClinicalTrials.gov, n.d.-d, NCT02938442)",
            "7"
          ],
          [
            "CD166†",
            "5",
            "1 (Almási et al., 2023)",
            "1 (Almási et al., 2023)",
            "0* (ClinicalTrials.gov, n.d.-e, NCT04596150)",
            "7"
          ],
          [
            "ROR2",
            "5",
            "1 (Henry et al., 2015)",
            "0* (Henry et al., 2015)",
            "0* (ClinicalTrials.gov, n.d.-f, NCT03504488)",
            "6"
          ],
          [
            "Tissue Factor",
            "5",
            "1 (Nassar et al., 2021)",
            "0 (Nassar et al., 2021)",
            "0* (ClinicalTrials.gov, n.d.-g, NCT04925284)",
            "6"
          ],
          [
            "CEACAM5",
            "5",
            "1† (Bechmann et al., 2020; Powell et al., 2018)",
            "0* (Bechmann et al., 2020)",
            "0* (ClinicalTrials.gov, n.d.-h, NCT04659603)",
            "6"
          ],
          [
            "CA6 (glycosylation epitope)",
            "5",
            "1 (ClinicalTrials.gov, n.d.-i, NCT02984683)",
            "0* (ClinicalTrials.gov, n.d.-i, NCT02984683)",
            "0* (ClinicalTrials.gov, n.d.-i, NCT02984683)",
            "6"
          ],
          [
            "Mesothelin",
            "5",
            "1 (Parinyanitikul et al., 2013)",
            "0 (Parinyanitikul et al., 2013)",
            "0* (ClinicalTrials.gov, n.d.-j, NCT05623488)",
            "6"
          ],
          [
            "MUC1",
            "5",
            "1 (Siroy et al., 2013)",
            "0 (Siroy et al., 2013)",
            "0* (ClinicalTrials.gov, n.d.-k, NCT00986609)",
            "6"
          ],
          [
            "Lewis Y (carbohydrate antigen)",
            "5",
            "1† (Hutchins et al., 2017)",
            "0* (Hutchins et al., 2017; ClinicalTrials.gov, n.d.-d, NCT02938442)",
            "0* (ClinicalTrials.gov, n.d.-d, NCT02938442)",
            "6"
          ],
          [
            "Globo H (carbohydrate antigen)",
            "5",
            "1 (Rugo et al., 2022)",
            "0* (Rugo et al., 2022)",
            "0* (Rugo et al., 2022)",
            "6"
          ],
          [
            "α-lactalbumin",
            "5",
            "1 (Tuohy et al., 2016; NCI, n.d.)",
            "0* (Tuohy et al., 2016)",
            "0* (ClinicalTrials.gov, n.d.-l, NCT04674306)",
            "6"
          ],
          [
            "CDH3 / P-cadherin",
            "5",
            "1 (Ribeiro et al., 2018)",
            "0* (Ribeiro et al., 2018)",
            "0* (ClinicalTrials.gov, n.d.-m, NCT05455658)",
            "6"
          ],
          [
            "HER3",
            "5",
            "1 (Krop et al., 2023)",
            "0 (Ogden et al., 2020)",
            "0* (Krop et al., 2023)",
            "6"
          ],
          [
            "CD138 / Syndecan-1†",
            "5",
            "0 (Ismail et al., 2024)",
            "1 (Zhong et al., 2023; Ismail et al., 2024)",
            "0* (Isakoff et al., 2020)",
            "6"
          ],
          [
            "HERV-K Env",
            "5",
            "1 (Immunomic Therapeutics, 2026)",
            "0* (Zhao et al., 2011)",
            "0* (Immunomic Therapeutics, 2026)",
            "6"
          ],
          [
            "CD205 / DEC-205",
            "5",
            "1 (Merlino et al., 2019; Human Protein Atlas, n.d.-b)",
            "0* (Merlino et al., 2019)",
            "0* (ClinicalTrials.gov, n.d.-o, NCT04064359)",
            "6"
          ],
          [
            "HER2",
            "5",
            "0 (Gampenrieder et al., 2023)",
            "0 (Gampenrieder et al., 2023)",
            "0* (ClinicalTrials.gov, n.d.-n, NCT04024800)",
            "5"
          ],
          [
            "CS1",
            "5",
            "0* (Amatya et al., 2021; Human Protein Atlas, n.d.-d)",
            "0* (Isakoff et al., 2020)",
            "0* (Isakoff et al., 2020)",
            "5"
          ],
          [
            "CD105 / Endoglin",
            "5",
            "0* (Human Protein Atlas, n.d.-c; Rau et al., 2012)",
            "0* (Rau et al., 2012)",
            "0* (ClinicalTrials.gov, n.d.-m, NCT05455658)",
            "5"
          ],
          [
            "Survivin",
            "3",
            "1 (Zhang et al., 2014; Human Protein Atlas, n.d.-e)",
            "1 (Zhang et al., 2014)",
            "0* (Ohtake et al., 2014; Isakoff et al., 2020)",
            "5"
          ],
          [
            "p53",
            "3",
            "1 (Chung et al., 2019; Li et al., 2019)",
            "1 (Li et al., 2019)",
            "0* (Chung et al., 2019)",
            "5"
          ],
          [
            "Brachyury",
            "3",
            "1 (Hamilton et al., 2016; Palena et al., 2014)",
            "1 (Hamilton et al., 2016)",
            "0* (ClinicalTrials.gov, n.d.-p, NCT03387085; ClinicalTrials.gov, n.d.-q, NCT04296942)",
            "5"
          ],
          [
            "Mutant RAS (specific mutant sequences)",
            "3",
            "2 (ClinicalTrials.gov, n.d.-p, NCT03387085)",
            "0* (ClinicalTrials.gov, n.d.-p, NCT03387085)",
            "0* (ClinicalTrials.gov, n.d.-p, NCT03387085)",
            "5"
          ],
          [
            "CT83 / KK-LC-1",
            "3",
            "2 (Marcinkowski et al., 2019)",
            "0* (Marcinkowski et al., 2019)",
            "0* (Immunomic Therapeutics, 2026)",
            "5"
          ],
          [
            "XBP1†",
            "3",
            "0* (Chen et al., 2014)",
            "1 (Chen et al., 2014)",
            "0* (Isakoff et al., 2020)",
            "4"
          ],
          [
            "SOX2",
            "3",
            "1 (Guzelis et al., 2025; Schmitz et al., 2007)",
            "0 (Guzelis et al., 2025)",
            "0* (ClinicalTrials.gov, n.d.-m, NCT05455658)",
            "4"
          ],
          [
            "MDM2",
            "3",
            "0* (Mayr et al., 2006)",
            "0* (Turbin et al., 2006)",
            "0* (ClinicalTrials.gov, n.d.-m, NCT05455658)",
            "3"
          ],
          [
            "YB-1†",
            "0",
            "1 (Lin et al., 2022)",
            "0*‡ (Lin et al., 2022; Lv et al., 2021)",
            "0* (ClinicalTrials.gov, n.d.-m, NCT05455658)",
            "1"
          ]
        ]
      }
    ]
  },
  "model-panel-3": {
    "kind": "tabs",
    "title": "Survival evidence",
    "entries": [
      {
        "title": "TROP2",
        "blocks": [
          {
            "type": "prose",
            "paragraphs": [
              "Li et al. (2025) assessed TROP2 expression by immunohistochemistry in a cohort of 80 patients with TNBC. Patients were divided into high- and low-expression groups according to the median H-score, with 40 patients in each group. The survival curves separated early, and the high-expression group showed persistently lower overall survival than the low-expression group. **This difference was statistically significant (log-rank P = 0.0016)**. These findings support an association between high tumour TROP2 expression and an unfavourable prognosis, suggesting its potential value for prognostic assessment in this cohort."
            ]
          },
          {
            "type": "figure",
            "src": getModelImage("image 28.png"),
            "width": 711,
            "height": 690,
            "alt": "Survival curves compare low and high TROP2 expression groups. Black and red indicate the respective groups (Li et al., 2025).",
            "caption": "Survival curves compare low and high TROP2 expression groups. Black and red indicate the respective groups (Li et al., 2025).",
            "figureLabel": "FIG. 02"
          },
          {
            "type": "prose",
            "paragraphs": [
              "**Reference:** Li G, Du R, Wang D, et al. Improved Efficacy of Triple-Negative Breast Cancer Immunotherapy via Hydrogel-Based Co-Delivery of CAR-T Cells and Mitophagy Agonist. *Advanced Science*. 2025;12(14):2409835. [https://doi.org/10.1002/advs.202409835](https://doi.org/10.1002/advs.202409835)"
            ]
          }
        ]
      },
      {
        "title": "B7-H4",
        "blocks": [
          {
            "type": "prose",
            "paragraphs": [
              "Wang et al. (2018) examined B7-H4 expression in tumour specimens from 65 patients with TNBC using immunohistochemistry. Expression groups were defined using a staining score incorporating both staining intensity and the proportion of positive tumour cells. Kaplan–Meier analysis showed that the high-expression group experienced a more pronounced decline in overall survival, while the low-expression group maintained a higher survival probability over the observation period. **The difference between the groups was statistically significant (P = 0.002)**, supporting an association between high B7-H4 expression and an unfavourable prognosis in this cohort."
            ]
          },
          {
            "type": "figure",
            "src": getModelImage("image 19.png"),
            "width": 890,
            "height": 720,
            "alt": "The plot presents overall survival according to B7-H4 expression. Group assignment is based on tumour immunostaining (Wang et al., 2018).",
            "caption": "The plot presents overall survival according to B7-H4 expression. Group assignment is based on tumour immunostaining (Wang et al., 2018).",
            "figureLabel": "FIG. 03"
          },
          {
            "type": "prose",
            "paragraphs": [
              "**Reference:** Wang L, Yang C, Liu XB, Wang L, Kang FB. B7-H4 overexpression contributes to poor prognosis and drug-resistance in triple-negative breast cancer. *Cancer Cell International*. 2018;18:100. [https://doi.org/10.1186/s12935-018-0597-9](https://doi.org/10.1186/s12935-018-0597-9)"
            ]
          }
        ]
      },
      {
        "title": "Nectin-4",
        "blocks": [
          {
            "type": "prose",
            "paragraphs": [
              "Son et al. (2025) used publicly available gene-expression and survival data from the Kaplan–Meier Plotter database to analyse 103 patients classified as basal-like 1 (BL1) TNBC. Patients with high PVRL4 (Nectin-4) expression showed poorer overall survival than those with low expression, with the high-expression curve remaining below the low-expression curve over most of the observation period. **The association was statistically significant (HR = 3.26, 95% CI 1.26–8.42; P = 0.0098).**"
            ]
          },
          {
            "type": "figure",
            "src": getModelImage("image 27.png"),
            "width": 350,
            "height": 335,
            "alt": "This analysis focuses on overall survival within BL1 TNBC. Patients are stratified by PVRL4 gene expression (Son et al., 2025).",
            "caption": "This analysis focuses on overall survival within BL1 TNBC. Patients are stratified by PVRL4 gene expression (Son et al., 2025).",
            "figureLabel": "FIG. 04"
          },
          {
            "type": "prose",
            "paragraphs": [
              "**Reference:** Son D-S, Obot JE, Campbell K, Lee E-S, Adunyah SE. Differential Effects of Afatinib on Cytokine- and Oncology-Related Profiles in Mesenchymal and Basal-Like 1 Triple-Negative Breast Cancer Cells. *Journal of Inflammatory and Infectious Medicine*. 2025;1(3):1. [https://doi.org/10.53941/jiim.2025.100013](https://doi.org/10.53941/jiim.2025.100013)"
            ]
          }
        ]
      },
      {
        "title": "LIV-1",
        "blocks": [
          {
            "type": "prose",
            "paragraphs": [
              "**Strong LIV-1 staining was associated with poorer survival than moderate staining** in the TNBC cohort examined by Saravanan et al. (2024). Patients were stratified by immunohistochemical staining intensity into scores of 1, 2 and 3. Compared with the score 2 group, the score 3 group showed an earlier decline in survival and generally lower survival probabilities over the observation period. This contrast highlights the clinical relevance of strong LIV-1 expression and supports its investigation as a candidate marker of adverse prognosis in TNBC."
            ]
          },
          {
            "type": "figure",
            "src": getModelImage("image 17.png"),
            "width": 1099,
            "height": 1109,
            "alt": "Three survival curves represent different LIV-1 staining intensities. Crosses indicate censored observations (Saravanan et al., 2024).",
            "caption": "Three survival curves represent different LIV-1 staining intensities. Crosses indicate censored observations (Saravanan et al., 2024).",
            "figureLabel": "FIG. 05"
          },
          {
            "type": "prose",
            "paragraphs": [
              "**Reference:** Saravanan R, Balasubramanian V, Sundaram S, et al. Expression of cell surface zinc transporter LIV1 in triple negative breast cancer is an indicator of poor prognosis and therapy failure. *Journal of Cellular Physiology*. 2024;239(4). [https://doi.org/10.1002/jcp.31203](https://doi.org/10.1002/jcp.31203)"
            ]
          }
        ]
      }
    ]
  },
  "model-panel-4": {
    "kind": "chart",
    "chart": "volcano-024322"
  },
  "model-panel-5": {
    "kind": "chart",
    "chart": "volcano-028102"
  },
  "model-panel-6": {
    "kind": "fold",
    "title": "Proteomic datasets and statistical methods",
    "blocks": [
      {
        "type": "subheading",
        "id": "model-heading-8",
        "index": "3.1.3.5",
        "title": "PXD024322 cohort construction",
        "level": 4
      },
      {
        "type": "prose",
        "paragraphs": [
          "We downloaded the authors' supplementary quantitative-proteomics workbook and its accompanying clinical tables for PXD024322 (**Asleh et al., 2022**). The abundance matrix contained 9,088 protein groups measured by tandem mass tag proteomics across 38 experimental batches. We matched the quantitative columns to the sample identifiers and batch labels in the supplementary metadata. Tumors were included when the clinical annotation identified them as TNBC, and normal samples were included when the tissue annotation indicated normal breast. **This produced 88 TNBC tumors and 38 normal-breast samples.** The values supplied by the authors were already on a log2 relative-abundance scale, so we used them directly in the analysis."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "For every protein, we required at least two non-missing abundance values in both the TNBC and normal groups before fitting a differential-abundance model. Of the 9,088 protein groups, 8,734 met this requirement. **The design matrix was** `~ Batch + Condition`**, with normal breast as the reference group.** We fitted the model with `limma`, applied empirical Bayes moderation with `trend = TRUE` and `robust = TRUE`, and extracted the `ConditionTNBC` coefficient (**Ritchie et al., 2015**). This coefficient is the reported log2 fold change after accounting for the TMT batch structure. The Benjamini-Hochberg method was applied across all tested proteins to control the false discovery rate (**Benjamini and Hochberg, 1995**)."
        ]
      },
      {
        "type": "subheading",
        "id": "model-heading-9",
        "index": "3.1.3.6",
        "title": "PXD028102 paired analysis",
        "level": 4
      },
      {
        "type": "prose",
        "paragraphs": [
          "For PXD028102, we extracted the protein-abundance matrix from sheet `B. Profiling abundance` in the authors' Supplementary Table S2 (**Gong et al., 2022**). The matrix contained 7,531 gene products measured on an author-provided log2 scale. The cohort included 82 TNBC tumors and 66 normal-adjacent tissue samples. **Sixty-six patients had both specimen types and were retained for the primary paired analysis**, while the 16 tumor-only cases were retained in the cohort description but were not included in the paired model."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "For the paired abundance model, low-abundance entries were imputed within each sample at one log2 unit below that sample's first percentile of observed values. We then fitted `~ PatientID + Condition` with `limma`, using normal-adjacent tissue as the reference and the 66 patient identifiers as blocking terms (**Ritchie et al., 2015**). Empirical Bayes moderation used `trend = TRUE` and `robust = TRUE`, and *P* values were adjusted across 7,531 proteins with the Benjamini-Hochberg procedure (**Benjamini and Hochberg, 1995**). **We repeated the model with three additional low-abundance settings, and the target-level directions remained consistent across these runs.**"
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "**The primary comparison in PXD028102 was the paired tumor-to-adjacent-normal abundance model.** This model provided the quantitative evidence used for TROP2, B7-H4, and Nectin-4, while LIV-1 was evaluated with the PXD024322 abundance model."
        ]
      },
      {
        "type": "subheading",
        "id": "model-heading-10",
        "index": "3.1.3.7",
        "title": "Reporting and reproducibility",
        "level": 4
      },
      {
        "type": "prose",
        "paragraphs": [
          "For both datasets, differential abundance was analyzed with the model appropriate to the study design. The volcano plots show the fitted log2 fold changes and adjusted *P* values across the full tested proteome. The candidate panels show the source measurements used for TROP2, B7-H4, Nectin-4, and LIV-1. **The analysis package** retains the extracted abundance matrices, sample metadata, cohort assignments, model outputs, target summaries, and plot-ready tables, so **every value in the differential abundance plots can be traced to its source sample and statistical model.** The PXD028102 paired model handles the original observation pattern explicitly (**Lazar et al., 2016**)."
        ]
      }
    ]
  },
  "model-panel-7": {
    "kind": "tabs",
    "title": "Single-cell dataset, processing, and statistical methods",
    "entries": [
      {
        "title": "Source object and TNBC sample selection",
        "blocks": [
          {
            "type": "prose",
            "paragraphs": [
              "We used the processed GSE176078 breast-cancer atlas distributed through CELLxGENE under dataset identifier `36ab5d3d-158e-4988-9700-e14fc7102fe4` (**Wu et al., 2021**). The downloaded H5AD-formatted AnnData object contained **100,064 cells**, 29,067 genes, the deposited raw unique molecular identifier (UMI) count matrix, patient identifiers, breast-cancer subtype labels, and the authors' cell annotations. The archived input file is 839,092,106 bytes and has Secure Hash Algorithm 256-bit (SHA-256) checksum `b667e420b2584e389c6c8fd9e0063cb395bb270a51c8979e6c978a0d06038db5`."
            ]
          },
          {
            "type": "prose",
            "paragraphs": [
              "We selected the **ten samples labelled as TNBC** in the authors' integration configuration: CID3946, CID3963, CID44041, CID4465, CID4495, CID44971, CID44991, CID4513, CID4515, and CID4523. The deposited major lineages were then mapped to **four compartments**. Cancer Epithelial cells were assigned to the malignant compartment. T cells, B cells, plasmablasts, and myeloid cells were assigned to the immune compartment. Cancer-associated fibroblasts, endothelial cells, and perivascular-like cells were assigned to the stromal compartment. Normal Epithelial cells were retained as a separate contextual group."
            ]
          }
        ]
      },
      {
        "title": "Patient-adaptive quality control",
        "blocks": [
          {
            "type": "prose",
            "paragraphs": [
              "Quality-control values were recalculated from the raw UMI matrix. For every cell, we calculated total UMI count, number of detected genes, and the percentage of counts assigned to mitochondrial genes. The recalculated values agreed closely with the deposited metrics, with correlations above 0.9999. Because library distributions differed among patients, thresholds were calculated **separately for each donor**. Cells below the patient-specific lower thresholds or above the mitochondrial threshold were excluded from downstream analysis. The resulting TNBC subset contained **39,324 cells**, providing the input for integration and state-resolved expression analysis."
            ]
          }
        ]
      },
      {
        "title": "Normalization, integration, clustering, and annotation audit",
        "blocks": [
          {
            "type": "prose",
            "paragraphs": [
              "The filtered count matrix was imported into Seurat. Genes detected in fewer than three cells were omitted when the object was created. Counts were normalized with **SCTransform v2 using 3,000 variable genes**, after which 50 principal components were calculated (**Hafemeister and Satija, 2019**). **Harmony was run on the principal-component space** with `donor_id` as the grouping variable, dimensions 1–30, and a maximum of 20 iterations (**Korsunsky et al., 2019**). The same 30 Harmony dimensions were used to build a 20-nearest-neighbor graph. Leiden clustering used algorithm 4 and resolution 0.6, producing **19 clusters**. UMAP used 30 neighbors, a minimum distance of 0.3, and the same random seed."
            ]
          },
          {
            "type": "prose",
            "paragraphs": [
              "The four broad compartments summarized in Figure 8 came from the deposited lineage annotations, while marker expression was used as an **independent check** on their biological identity. *EPCAM*, *KRT8*, *KRT18*, and *KRT19* supported the epithelial and malignant annotations. *PTPRC* marked immune cells. *COL1A1*, *COL1A2*, and *DCN* supported fibroblast-rich stromal clusters, while *PECAM1*, *VWF*, and *KDR* supported endothelial clusters. **Five clusters were dominated by malignant cells**: cluster 4 contained 3,512 malignant cells among 3,523 cells, cluster 7 contained 1,817 of 2,086, cluster 11 contained 1,706 of 1,780, cluster 14 contained 1,051 of 1,259, and cluster 17 contained 794 of 808. A further **417 malignant cells occurred in cluster 5**, which also contained 2,472 stromal cells. These counts are the basis for the UMAP description in the main text."
            ]
          }
        ]
      },
      {
        "title": "Candidate-gene detection and malignant-cell coverage",
        "blocks": [
          {
            "type": "prose",
            "paragraphs": [
              "Detection was defined directly from the raw count matrix. A cell was **positive for a candidate gene when its UMI count for that gene was greater than zero**. Detection rates were first calculated for each patient and compartment, and the table in the main text reports the **median across patients**. Malignant-cell coverage was the fraction of malignant cells with at least one of *TACSTD2*, *VTCN1*, *NECTIN4*, or *SLC39A6* detected. Pairwise overlap was summarized with the Jaccard index, calculated as the number of malignant cells positive for both genes divided by the number positive for either gene. We also counted every one-gene, multi-gene, four-gene, and no-gene detection pattern. This yielded **81.4% overall malignant-cell coverage**, a patient range of 52.5% to 97.8%, pairwise Jaccard indices of 0.221 to 0.438, 7.3% of malignant cells with all four genes detected, and **18.6% with none detected**."
            ]
          }
        ]
      },
      {
        "title": "Patient-level pseudobulk analysis",
        "blocks": [
          {
            "type": "prose",
            "paragraphs": [
              "Raw UMI counts were summed within each patient and compartment before differential testing. Immune and stromal counts were combined to form the non-malignant comparison, while normal epithelial cells remained outside the primary contrast. The paired design included the **eight patients with matched malignant and non-malignant pseudobulk libraries** after quality control."
            ]
          },
          {
            "type": "prose",
            "paragraphs": [
              "The pseudobulk matrix was analyzed with **edgeR** (**Robinson et al., 2010**). We created a `DGEList`, removed low-information genes with `filterByExpr`, applied trimmed mean of M-values normalization, and fitted the design `~ donor_id + compartment`. Dispersion estimation and quasi-likelihood fitting used robust settings. The malignant effect was tested with `glmQLFTest` for the `compartmentmalignant` coefficient, and the **Benjamini-Hochberg method controlled the FDR**. Patient-level median counts per million were calculated separately for malignant and non-malignant pseudobulk samples. This patient-aware design treats **patients, rather than individual cells, as biological replicates** (**Crowell et al., 2020**)."
            ]
          }
        ]
      },
      {
        "title": "Sample-label and treatment sensitivity analyses",
        "blocks": [
          {
            "type": "prose",
            "paragraphs": [
              "We repeated the pseudobulk analysis under an alternative sample-label specification and a treatment-aware subset. All four genes retained the **same direction of malignant-cell enrichment** across these analyses, supporting the consistency of the cell-localization result across cohort definitions."
            ]
          }
        ]
      }
    ]
  },
  "model-panel-8": {
    "kind": "tabs",
    "title": "Histopathological evidence",
    "entries": [
      {
        "title": "TROP2",
        "blocks": [
          {
            "type": "subheading",
            "id": "model-heading-22",
            "index": "3.1.6.2",
            "title": "Histopathological Evidence in TNBC",
            "level": 4
          },
          {
            "type": "prose",
            "paragraphs": [
              "Izci and colleagues described broad but heterogeneous membrane and cytoplasmic staining in stage I–III TNBC. Jeon and colleagues observed membranous TROP2 staining in more than 10% of tumor cells in 97.1% of 715 primary TNBC cases without neoadjuvant chemotherapy. **This broad coverage across patient samples, combined with the observed intratumoral heterogeneity, makes TROP2 a suitable candidate for multi-target combination strategies in vaccine design.**"
            ]
          },
          {
            "type": "subheading",
            "id": "model-heading-23",
            "index": "3.1.6.3",
            "title": "Representative Published Tissue Images",
            "level": 4
          },
          {
            "type": "figure",
            "src": getModelImage("image 16.png"),
            "width": 685,
            "height": 168,
            "alt": "Representative Published Tissue Images",
            "caption": "Published TROP2 immunohistochemistry in TNBC. The original figure shows intermediate and high TROP2 staining, with cytoplasmic, membranous, or combined localization and heterogeneity across tumor tissue.(Izci et al., 2022).",
            "figureLabel": "FIG. 12"
          },
          {
            "type": "subheading",
            "id": "model-heading-24",
            "index": "3.1.6.4",
            "title": "References",
            "level": 4
          },
          {
            "type": "list",
            "items": [
              "Izci H, Punie K, Waumans L, et al. Correlation of TROP-2 expression with clinical-pathological characteristics and outcome in triple-negative breast cancer. *Scientific Reports*. 2022;12:22498. [https://doi.org/10.1038/s41598-022-27093-y](https://doi.org/10.1038/s41598-022-27093-y)",
              "Jeon Y, Jo U, Hong J, Gong G, Lee HJ. Trophoblast cell-surface antigen 2 (TROP2) expression in triple-negative breast cancer. *BMC Cancer*. 2022;22:1014. [https://doi.org/10.1186/s12885-022-10076-7](https://doi.org/10.1186/s12885-022-10076-7)"
            ]
          }
        ]
      },
      {
        "title": "B7-H4",
        "blocks": [
          {
            "type": "subheading",
            "id": "model-heading-25",
            "index": "3.1.6.5",
            "title": "Histopathological Evidence in TNBC",
            "level": 4
          },
          {
            "type": "prose",
            "paragraphs": [
              "Wang and colleagues reported frequent B7-H4 staining in TNBC tissue. Spatial analyses further associated B7-H4 expression with tumor epithelial regions and distinct immune microenvironments. Gruosso and colleagues identified spatially distinct tumor immune microenvironments in TNBC that stratify clinical outcomes. Wescott and colleagues demonstrated that epithelial-expressed B7-H4 drives differential immunotherapy response in breast cancer models. **The tumor-epithelial localization pattern of B7-H4, distinct from TROP2's broader distribution, provides a complementary target** that addresses different regions within the heterogeneous tumor microenvironment."
            ]
          },
          {
            "type": "subheading",
            "id": "model-heading-26",
            "index": "3.1.6.6",
            "title": "Representative Published Tissue Images",
            "level": 4
          },
          {
            "type": "figure",
            "src": getModelImage("image 5.png"),
            "width": 685,
            "height": 303,
            "alt": "Representative Published Tissue Images",
            "caption": "Published B7-H4 immunohistochemistry in TNBC and normal breast tissue. Panel 1d of the original figure compares B7-H4 staining in TNBC tissue with normal breast tissue at 200× magnification. (Wang et al., 2018).",
            "figureLabel": "FIG. 13"
          },
          {
            "type": "subheading",
            "id": "model-heading-27",
            "index": "3.1.6.7",
            "title": "References",
            "level": 4
          },
          {
            "type": "list",
            "items": [
              "Wang L, Yang C, Liu XB, Wang L, Kang FB. B7-H4 overexpression contributes to poor prognosis and drug-resistance in triple-negative breast cancer. *Cancer Cell International*. 2018;18:100. [https://doi.org/10.1186/s12935-018-0597-9](https://doi.org/10.1186/s12935-018-0597-9)",
              "Gruosso T, Gigoux M, Manem VSK, et al. Spatially distinct tumor immune microenvironments stratify triple-negative breast cancers. *Journal of Clinical Investigation*. 2019;129:1785–1800. [https://doi.org/10.1172/JCI96313](https://doi.org/10.1172/JCI96313)",
              "Wescott EC, Sun X, Gonzalez-Ericsson P, et al. Epithelial expressed B7-H4 drives differential immunotherapy response in murine and human breast cancer. *Cancer Research Communications*. 2024;4:1120–1134. [https://doi.org/10.1158/2767-9764.CRC-23-0468](https://doi.org/10.1158/2767-9764.CRC-23-0468)"
            ]
          }
        ]
      },
      {
        "title": "Nectin-4",
        "blocks": [
          {
            "type": "subheading",
            "id": "model-heading-28",
            "index": "3.1.6.8",
            "title": "Histopathological Evidence in TNBC",
            "level": 4
          },
          {
            "type": "prose",
            "paragraphs": [
              "M-Rabet and colleagues reported membranous Nectin-4 staining in TNBC tissue and identified Nectin-4 as a prognostic biomarker for primary and metastatic triple-negative breast cancer. Zeindler and colleagues identified a high-expression TNBC subgroup and demonstrated that Nectin-4 expression is an independent prognostic biomarker associated with better survival in triple-negative breast cancer. **The clear membrane-associated expression pattern observed in these studies provides strong tissue-level validation for Nectin-4 as an accessible surface target for immune recognition in our vaccine design.**"
            ]
          },
          {
            "type": "subheading",
            "id": "model-heading-29",
            "index": "3.1.6.9",
            "title": "Representative Published Tissue Images",
            "level": 4
          },
          {
            "type": "figure",
            "src": getModelImage("image 3.png"),
            "width": 1418,
            "height": 356,
            "alt": "Representative Published Tissue Images",
            "caption": "Published Nectin-4 immunohistochemistry in TNBC. The three panels show strong, moderate, and negative Nectin-4 staining in TNBC tissue at 200× magnification. (Zeindler et al., 2019).",
            "figureLabel": "FIG. 14"
          },
          {
            "type": "subheading",
            "id": "model-heading-30",
            "index": "3.1.6.10",
            "title": "References",
            "level": 4
          },
          {
            "type": "list",
            "items": [
              "M-Rabet M, Cabaud O, Josselin E, et al. Nectin-4: a new prognostic biomarker for efficient therapeutic targeting of primary and metastatic triple-negative breast cancer. *Annals of Oncology*. 2017;28:769–776. [https://doi.org/10.1093/annonc/mdw678](https://doi.org/10.1093/annonc/mdw678)",
              "Zeindler J, Soysal SD, Piscuoglio S, et al. Nectin-4 expression is an independent prognostic biomarker and associated with better survival in triple-negative breast cancer. *Frontiers in Medicine*. 2019;6:200. [https://doi.org/10.3389/fmed.2019.00200](https://doi.org/10.3389/fmed.2019.00200)"
            ]
          }
        ]
      },
      {
        "title": "LIV-1",
        "blocks": [
          {
            "type": "subheading",
            "id": "model-heading-31",
            "index": "3.1.6.11",
            "title": "Histopathological Evidence in TNBC",
            "level": 4
          },
          {
            "type": "prose",
            "paragraphs": [
              "Sussman and colleagues reported LIV-1 staining in primary TNBC tissue and developed SGN-LIV1A as an antibody-drug conjugate targeting LIV-1 for metastatic breast cancer treatment. Saravanan and colleagues subsequently reported stronger LIV-1 staining in TNBC than in normal tissue and linked higher staining with aggressive clinicopathological features, establishing LIV-1 as an indicator of poor prognosis and therapy failure. An independent open-access tissue-microarray study by Althobiti and colleagues documented SLC39A6 immunoreactivity in invasive epithelial tumour cells and provided positive and negative IHC examples. **The association of LIV-1 with high-grade disease and treatment-resistant tumors provides tissue-level evidence supporting its inclusion** as a target for aggressive TNBC phenotypes that may evade single-antigen approaches."
            ]
          },
          {
            "type": "subheading",
            "id": "model-heading-32",
            "index": "3.1.6.12",
            "title": "Representative Published Tissue Images",
            "level": 4
          },
          {
            "type": "figure",
            "src": getModelImage("image 26.png"),
            "width": 685,
            "height": 341,
            "alt": "Representative Published Tissue Images",
            "caption": "Open-access SLC39A6 immunohistochemistry. Panel A shows positive staining in the cytoplasm and nuclei of invasive breast-cancer epithelial cells, and panel B shows negative staining. (Althobiti et al., 2021).",
            "figureLabel": "FIG. 15"
          },
          {
            "type": "subheading",
            "id": "model-heading-33",
            "index": "3.1.6.13",
            "title": "References",
            "level": 4
          },
          {
            "type": "list",
            "items": [
              "Sussman D, Smith LM, Anderson ME, et al. SGN-LIV1A: a novel antibody-drug conjugate targeting LIV-1 for the treatment of metastatic breast cancer. *Molecular Cancer Therapeutics*. 2014;13:2991–3000. [https://doi.org/10.1158/1535-7163.MCT-13-0896](https://doi.org/10.1158/1535-7163.MCT-13-0896)",
              "Saravanan R, Balasubramanian V, Sundaram S, et al. Expression of cell surface zinc transporter LIV1 in triple negative breast cancer is an indicator of poor prognosis and therapy failure. *Journal of Cellular Physiology*. 2024;239. [https://doi.org/10.1002/jcp.31203](https://doi.org/10.1002/jcp.31203)",
              "Althobiti M, El-sharawy KA, Joseph C, et al. Oestrogen-regulated protein SLC39A6: a biomarker of good prognosis in luminal breast cancer. *Breast Cancer Research and Treatment*. 2021;189:621–630. [https://doi.org/10.1007/s10549-021-06336-y](https://doi.org/10.1007/s10549-021-06336-y)"
            ]
          },
          {
            "type": "prose",
            "paragraphs": [
              "The four validation layers established that TROP2, B7-H4, Nectin-4, and LIV-1 were present as proteins in TNBC tissue, preferentially expressed in malignant cells, detectable across 88% of patients when combined as a panel, and confirmed by immunohistochemistry in clinical specimens. Quantitative proteomics demonstrated tumor-enriched abundance with fold changes ranging from 1.14 to 18.25 depending on the cohort and candidate. Single-cell analysis showed that at least one of the four genes was detected in over 80% of malignant cells, with complementary expression patterns that reduced the fraction of antigen-negative tumor cells. **Patient-level genomic profiling confirmed that the four-gene combination covered substantially more cases than any single antigen alone**, addressing the heterogeneity observed both within tumors and across the patient population."
            ]
          },
          {
            "type": "prose",
            "paragraphs": [
              "The tissue studies provided tissue-level protein-expression evidence for all four candidates. Staining intensity and cellular patterns varied across tumor contexts, with TROP2 showing broad but heterogeneous distribution suitable for multi-target coverage, B7-H4 localizing to tumor epithelial regions and providing spatial complementarity, Nectin-4 displaying clear membrane staining that validates surface accessibility for immune recognition, and LIV-1 appearing more strongly in high-grade and residual disease contexts where treatment resistance is a concern. **Together, these four antigens address different aspects of TNBC heterogeneity through complementary expression patterns and tissue localization.** After this review, we retained the four proteins and used their canonical sequences as inputs for HLA-I epitope prediction."
            ]
          },
          {
            "type": "prose",
            "paragraphs": [
              "However, **full-length antigens cannot be used directly in circRNA vaccines**. Long coding sequences reduce circularization efficiency and translation efficiency, with both constraints becoming more severe as open reading frame length increases **(Wesselhoeft et al., 2018)**. Full-length membrane proteins with signal peptides or transmembrane domains may be mistargeted within the cell, reducing their availability for MHC class I presentation. **We therefore identified short HLA-A*02:01-restricted epitopes from the four antigens for concatenation into a compact circRNA coding sequence.**"
            ]
          }
        ]
      }
    ]
  },
  "model-panel-9": {
    "kind": "antigen-table",
    "table": {
      "type": "table",
      "headers": [
        "**Antigen**",
        "**Peptide**",
        "**Protein position**",
        "**Predicted IC₅₀, nM**",
        "**NetMHCpan EL percentile rank**",
        "**IEDB immunogenicity score**",
        "**Topology annotation and decision**"
      ],
      "rows": [
        [
          "TROP2",
          "`GLAPPPLRL`",
          "6–14",
          "203.99",
          "0.03",
          "0.00118",
          "Signal peptide"
        ],
        [
          "TROP2",
          "`LLLLVLAAV`",
          "16–24",
          "24.52",
          "0.80",
          "0.07088",
          "Signal peptide"
        ],
        [
          "TROP2",
          "`SVCWCVNSV`",
          "123–131",
          "222.32",
          "3.10",
          "0.08963",
          "Retained"
        ],
        [
          "TROP2",
          "`RLFRERYRL`",
          "178–186",
          "61.63",
          "0.28",
          "0.26342",
          "Retained"
        ],
        [
          "TROP2",
          "`TLIYYLDEI`",
          "256–264",
          "12.55",
          "0.34",
          "0.10266",
          "Retained"
        ],
        [
          "TROP2",
          "`YLDEIPPKF`",
          "260–268",
          "79.58",
          "0.02",
          "0.09175",
          "Retained"
        ],
        [
          "TROP2",
          "`RLTAGLIAV`",
          "272–280",
          "10.02",
          "0.07",
          "0.20971",
          "Transmembrane"
        ],
        [
          "TROP2",
          "`GLIAVIVVV`",
          "276–284",
          "41.76",
          "0.19",
          "0.30701",
          "Transmembrane"
        ],
        [
          "TROP2",
          "`IVVVVVALV`",
          "281–289",
          "426.36",
          "2.50",
          "0.16054",
          "Transmembrane"
        ],
        [
          "B7-H4",
          "`SLGQILFWS`",
          "3–11",
          "328.57",
          "3.30",
          "0.24182",
          "Signal peptide"
        ],
        [
          "B7-H4",
          "`ILFWSIISI`",
          "7–15",
          "10.72",
          "0.19",
          "0.24073",
          "Signal peptide"
        ],
        [
          "B7-H4",
          "`SIISIIIIL`",
          "11–19",
          "332.68",
          "0.51",
          "0.32169",
          "Signal peptide"
        ],
        [
          "B7-H4",
          "`SIIIILAGA`",
          "14–22",
          "229.25",
          "2.00",
          "0.34910",
          "Signal peptide"
        ],
        [
          "B7-H4",
          "`IILAGAIAL`",
          "17–25",
          "128.04",
          "0.62",
          "0.24078",
          "Signal peptide"
        ],
        [
          "B7-H4",
          "`ILAGAIALI`",
          "18–26",
          "12.11",
          "0.19",
          "0.23672",
          "Signal peptide"
        ],
        [
          "B7-H4",
          "`WLKEGVLGL`",
          "71–79",
          "31.58",
          "0.11",
          "0.11305",
          "Retained"
        ],
        [
          "B7-H4",
          "`AVFADQVIV`",
          "102–110",
          "329.27",
          "0.54",
          "0.10253",
          "Retained"
        ],
        [
          "B7-H4",
          "`SFFAISWAL`",
          "264–272",
          "331.79",
          "2.20",
          "0.26104",
          "Transmembrane"
        ],
        [
          "B7-H4",
          "`AISWALLPL`",
          "267–275",
          "122.80",
          "2.10",
          "0.18101",
          "Transmembrane"
        ],
        [
          "Nectin-4",
          "`FQARLRLRV`",
          "137–145",
          "439.99",
          "1.30",
          "0.12358",
          "Retained"
        ],
        [
          "Nectin-4",
          "`RLRVLVPPL`",
          "142–150",
          "193.10",
          "1.50",
          "0.07056",
          "Retained"
        ],
        [
          "Nectin-4",
          "`AVTSEFHLV`",
          "203–211",
          "357.45",
          "0.44",
          "0.07465",
          "Retained"
        ],
        [
          "Nectin-4",
          "`HILHVSFLA`",
          "238–246",
          "190.78",
          "1.90",
          "0.00574",
          "Retained"
        ],
        [
          "Nectin-4",
          "`FLAEASVRG`",
          "244–252",
          "460.73",
          "1.90",
          "0.06090",
          "Retained"
        ],
        [
          "Nectin-4",
          "`VVVGVIAAL`",
          "351–359",
          "261.34",
          "0.68",
          "0.26886",
          "Transmembrane"
        ],
        [
          "Nectin-4",
          "`VIAALLFCL`",
          "355–363",
          "64.24",
          "1.50",
          "0.09813",
          "Transmembrane"
        ],
        [
          "Nectin-4",
          "`ALLFCLLVV`",
          "358–366",
          "46.65",
          "1.30",
          "0.06602",
          "Transmembrane"
        ],
        [
          "Nectin-4",
          "`LLFCLLVVV`",
          "359–367",
          "37.44",
          "1.50",
          "0.02147",
          "Transmembrane"
        ],
        [
          "Nectin-4",
          "`YINGRGHLV`",
          "502–510",
          "255.92",
          "0.41",
          "0.13512",
          "Retained"
        ],
        [
          "LIV-1",
          "`KLSVILILT`",
          "4–12",
          "279.90",
          "1.40",
          "0.21284",
          "Signal peptide"
        ],
        [
          "LIV-1",
          "`SVILILTFA`",
          "6–14",
          "358.45",
          "1.60",
          "0.25236",
          "Signal peptide"
        ],
        [
          "LIV-1",
          "`VILILTFAL`",
          "7–15",
          "253.64",
          "2.60",
          "0.27772",
          "Signal peptide"
        ],
        [
          "LIV-1",
          "`LILTFALSV`",
          "9–17",
          "20.75",
          "0.58",
          "0.08027",
          "Signal peptide"
        ],
        [
          "LIV-1",
          "`TVSEGTHFL`",
          "194–202",
          "340.45",
          "0.25",
          "0.21229",
          "Retained"
        ],
        [
          "LIV-1",
          "`FLSLLGVIL`",
          "337–345",
          "102.46",
          "0.64",
          "0.06884",
          "Transmembrane"
        ],
        [
          "LIV-1",
          "`LLGVILVPL`",
          "340–348",
          "53.25",
          "1.50",
          "0.20006",
          "Transmembrane"
        ],
        [
          "LIV-1",
          "`LLSFLVALA`",
          "357–365",
          "33.42",
          "1.60",
          "0.11870",
          "Transmembrane"
        ],
        [
          "LIV-1",
          "`FLVALAVGT`",
          "360–368",
          "120.26",
          "2.40",
          "0.13344",
          "Transmembrane"
        ],
        [
          "LIV-1",
          "`YFMFLVEHV`",
          "432–440",
          "136.19",
          "1.80",
          "0.19226",
          "Transmembrane"
        ],
        [
          "LIV-1",
          "`FMFLVEHVL`",
          "433–441",
          "7.50",
          "0.14",
          "0.21271",
          "Transmembrane"
        ],
        [
          "LIV-1",
          "`FLVEHVLTL`",
          "435–443",
          "3.38",
          "0.01",
          "0.19783",
          "Transmembrane"
        ],
        [
          "LIV-1",
          "`GVATLAWMV`",
          "591–599",
          "54.75",
          "0.67",
          "0.16213",
          "Retained"
        ],
        [
          "LIV-1",
          "`GLHNFSDGL`",
          "604–612",
          "110.36",
          "0.47",
          "0.00078",
          "Retained"
        ],
        [
          "LIV-1",
          "`SVAVFCHEL`",
          "629–637",
          "436.04",
          "1.20",
          "0.20329",
          "Retained"
        ],
        [
          "LIV-1",
          "`FIGHYAENV`",
          "677–685",
          "35.71",
          "0.50",
          "0.15750",
          "Retained"
        ],
        [
          "LIV-1",
          "`NVSMWIFAL`",
          "684–692",
          "130.10",
          "1.90",
          "0.23224",
          "Transmembrane"
        ],
        [
          "LIV-1",
          "`SMWIFALTA`",
          "686–694",
          "48.04",
          "0.95",
          "0.36997",
          "Transmembrane"
        ],
        [
          "LIV-1",
          "`WIFALTAGL`",
          "688–696",
          "27.42",
          "1.50",
          "0.15593",
          "Transmembrane"
        ],
        [
          "LIV-1",
          "`FMYVALVDM`",
          "697–705",
          "63.80",
          "1.60",
          "0.11580",
          "Transmembrane"
        ],
        [
          "LIV-1",
          "`MLLGFGIML`",
          "732–740",
          "18.06",
          "0.23",
          "0.18612",
          "Transmembrane"
        ],
        [
          "LIV-1",
          "`LLGFGIMLL`",
          "733–741",
          "33.39",
          "0.41",
          "0.13240",
          "Transmembrane"
        ]
      ]
    }
  },
  "model-panel-10": {
    "kind": "tabs",
    "title": "IEDB inputs, parameters, and filtering rules",
    "entries": [
      {
        "title": "Protein inputs and peptide enumeration",
        "blocks": [
          {
            "type": "prose",
            "paragraphs": [
              "Reviewed canonical human protein sequences were downloaded from **UniProtKB** for **TROP2, B7-H4, Nectin-4, and LIV-1** (**UniProt Consortium, 2025**). The accessions were P09758, Q7Z7D3, Q96NY8, and Q13433, respectively. Each FASTA sequence was submitted separately to the IEDB T Cell Prediction Class I workflow (**Yan et al., 2024**). Peptide length was fixed at nine amino acids and the restricting allele was **HLA-A*02:01**. IEDB scanned every overlapping 9-mer, retaining the 1-based start and end position within the canonical protein. The four inputs produced 315 TROP2 peptides, 274 B7-H4 peptides, 502 Nectin-4 peptides, and 747 LIV-1 peptides, for a total of **1,838**."
            ]
          }
        ]
      },
      {
        "title": "IEDB model configuration",
        "blocks": [
          {
            "type": "prose",
            "paragraphs": [
              "The following settings were entered in the IEDB prediction page for each protein:",
              "**Table 9.** IEDB parameter configuration for epitope prediction."
            ]
          },
          {
            "type": "table",
            "headers": [
              "**IEDB component**",
              "**Setting**",
              "**Purpose in this workflow**"
            ],
            "rows": [
              [
                "Peptide length",
                "9 amino acids",
                "Matches the canonical length preference used for the initial HLA-A*02:01 screen"
              ],
              [
                "HLA allele",
                "HLA-A*02:01",
                "Defines the first population-relevant allele for method development"
              ],
              [
                "HLA-I binding and elution",
                "NetMHCpan 4.1 EL",
                "Provides a ligand-related supporting output and was not used as a numerical gate (**Reynisson et al., 2020**)"
              ],
              [
                "HLA-I processing",
                "Basic Processing Predictions",
                "Provides proteasomal-cleavage and TAP-transport supporting outputs; no separate pass-or-fail rule was applied (**Peters et al., 2003**, **Tenzer et al., 2005**)"
              ],
              [
                "Binding model inside processing",
                "NetMHCpan 4.1 BA",
                "Supplies the predicted IC₅₀ used for the first numerical gate"
              ],
              [
                "Proteasome cleavage",
                "Immunoproteasome",
                "Represents the interferon (IFN)-responsive proteasome context expected in antigen-presenting and inflamed tumor settings"
              ],
              [
                "Maximum precursor extension",
                "1",
                "Uses the configured N-terminal precursor extension in the TAP component"
              ],
              [
                "TAP alpha factor",
                "0.2",
                "Uses the selected weighting parameter in the IEDB processing model"
              ],
              [
                "HLA-I pMHC immunogenicity",
                "Positions 1, 2, and C terminus masked",
                "Supplies the second numerical gate after masking the principal HLA anchor positions (**Calis et al., 2013**)"
              ]
            ]
          },
          {
            "type": "prose",
            "paragraphs": [
              "NetMHCpan 4.1 EL, Basic Processing Predictions, and the IEDB pMHC immunogenicity model were run together so that every peptide received the corresponding outputs in the same export. For the actual numerical screen, **only the NetMHCpan 4.1 BA predicted** IC₅₀ and the IEDB **pMHC immunogenicity score** were used as **pass-or-fail criteria**. The EL percentile rank and the processing scores were retained as **supporting outputs** for comparative candidate assessment. The Basic Processing module combined an immunoproteasome cleavage model, transporter associated with antigen processing transport, and NetMHCpan 4.1 BA."
            ]
          }
        ]
      },
      {
        "title": "Sequential filtering and topology review",
        "blocks": [
          {
            "type": "prose",
            "paragraphs": [
              "The **first numerical filter** retained peptides with a NetMHCpan 4.1 BA predicted IC₅₀ **below 500 nM**. This produced **83 peptides**, comprising 17 from TROP2, 13 from B7-H4, 15 from Nectin-4, and 38 from LIV-1. The **second filter** required an IEDB immunogenicity score **above zero**. It retained **51 peptides**, comprising 9 from TROP2, 10 from B7-H4, 10 from Nectin-4, and 22 from LIV-1. EL percentile rank and the processing total score were retained as supporting fields for every candidate record."
            ]
          },
          {
            "type": "prose",
            "paragraphs": [
              "The 51 sequences were matched to the UniProt topology intervals listed in the main text. Source-region annotation and sequence composition were used to exclude **34 candidates**, as recorded in the candidate table. The final panel contained four TROP2 peptides, two B7-H4 peptides, six Nectin-4 peptides, and five LIV-1 peptides. These **17 sequences** are the final output of this module."
            ]
          }
        ]
      },
      {
        "title": "Output audit",
        "blocks": [
          {
            "type": "prose",
            "paragraphs": [
              "All screening counts were calculated from the **four complete IEDB result exports**. For each candidate, the **audited record** retains the source protein and accession, **exact 9-mer sequence**, 1-based canonical coordinates, NetMHCpan 4.1 BA predicted IC₅₀, NetMHCpan 4.1 EL percentile rank, IEDB processing outputs, IEDB immunogenicity score, and **topology-review decision**. The main table presents the fields used to explain the numerical screen and topology decision, while the complete export preserves the additional processing scores. **Duplicate peptide strings** from different protein positions remain separate records because their source coordinates are part of the evidence."
            ]
          },
          {
            "type": "prose",
            "paragraphs": [
              "The final panel contained **17 peptides**: four from TROP2, two from B7-H4, six from Nectin-4, and five from LIV-1. The table records the topology annotation and the final panel decision for each of the 51 numerically filtered peptides. These **17 candidates** were selected on **sequence-based evidence alone**—binding affinity, immunogenicity features, and exclusion of problematic topological regions. However, computational predictions of binding and immunogenicity **do not guarantee** that a peptide will form a stable, well-presented complex with HLA-A*02:01, or that the resulting peptide-MHC structure will adopt a geometry compatible with T-cell receptor engagement. We therefore subjected all **17 candidates** to **structural validation using AlphaFold3**, which models the three-dimensional structure of peptide-MHC complexes and allows us to assess presentation quality before committing peptides to experimental testing. The structural analysis is described in the following section."
            ]
          }
        ]
      }
    ]
  },
  "model-panel-11": {
    "kind": "chart",
    "chart": "confidence-scatter"
  },
  "model-panel-12": {
    "kind": "chart",
    "chart": "burial-heatmap"
  },
  "model-panel-13": {
    "kind": "fold",
    "title": "How the 60% bound was derived",
    "blocks": [
      {
        "type": "prose",
        "paragraphs": [
          "The C-terminal anchor motif of HLA-A*02:01 is valine or leucine, with isoleucine and methionine within tolerance (Falk et al., 1991); the measured fill volume of leucine and isoleucine in this dataset is 139.5 to 143.8 Å², and 140 Å² is taken as the reference.",
          "**Table 10.** Fill volume by anchor residue type at position 9."
        ]
      },
      {
        "type": "table",
        "headers": [
          "**Position-9 residue**",
          "**Systems**",
          "**Burial (%)**",
          "**Absolute buried area (Å²)**",
          "**Fill ratio (%)**"
        ],
        "rows": [
          [
            "Gly",
            "1",
            "undefined",
            "0.0",
            "0.0"
          ],
          [
            "Ala",
            "1",
            "99.4",
            "60.1 ± 0.4",
            "42.9"
          ],
          [
            "Val",
            "7",
            "100.0",
            "113.3 – 115.1",
            "80.9 – 82.2"
          ],
          [
            "Leu / Ile",
            "7",
            "99.7 – 100.0",
            "139.5 – 143.8",
            "99.7 – 102.7"
          ],
          [
            "Phe",
            "1",
            "99.4",
            "173.3 ± 0.5",
            "123.8"
          ]
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Abualrous et al. compared H-2Kb/SIINFEKL peptides with leucine, alanine or glycine at the C-terminus. The leucine peptide was most stable, alanine gave intermediate stabilization, and glycine was markedly destabilizing. Umbrella sampling estimated a dissociation free-energy barrier about 11 kcal/mol higher for leucine than alanine (**Abualrous et al., 2015**). These findings are consistent with studies linking the C-terminal anchor to MHC class I complex stability and reporting that stability predicts immunogenicity better than affinity (**Bouvier and Wiley, 1994**, **Harndahl et al., 2012**)."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Across the five models, alanine candidates had fill ratios up to 43.3%; the lowest passing candidate was 80.4%. We set the lower bound at 60% (84 Å²), within this observed gap. Any cutoff between 44% and 80% gives the same classification for all 17 systems. Two candidates fall below the bound: FLAEASVRG at 0.0% and HILHVSFLA at 42.9%."
        ]
      }
    ]
  },
  "model-panel-14": {
    "kind": "chart",
    "chart": "p9-volume"
  },
  "model-panel-15": {
    "kind": "transpose",
    "table": {
      "type": "table",
      "headers": [
        "**Measurement**",
        "**model 0**",
        "**model 1**",
        "**model 2**",
        "**model 3**",
        "**model 4**"
      ],
      "rows": [
        [
          "Position-2 side-chain burial   (%)",
          "99.9",
          "99.8",
          "99.7",
          "99.7",
          "99.9"
        ],
        [
          "Position-9 side-chain burial   (%)",
          "100.0",
          "100.0",
          "100.0",
          "100.0",
          "100.0"
        ],
        [
          "Conserved hydrogen-bond   network",
          "11/11",
          "11/11",
          "11/11",
          "11/11",
          "11/11"
        ],
        [
          "Total hydrogen bonds",
          "16",
          "19",
          "16",
          "16",
          "16"
        ],
        [
          "of which backbone / side chain",
          "12 / 4",
          "14 / 5",
          "13 / 3",
          "13 / 3",
          "13 / 3"
        ],
        [
          "TCR-facing surface (Å²)",
          "237",
          "270",
          "239",
          "241",
          "238"
        ],
        [
          "Steric clashes / flip   candidates",
          "0 / 0",
          "0 / 0",
          "0 / 0",
          "0 / 0",
          "0 / 0"
        ],
        [
          "Verdict",
          "Pass",
          "Pass",
          "Pass",
          "Pass",
          "Pass"
        ]
      ]
    }
  },
  "model-panel-16": {
    "kind": "fold",
    "title": "Structural processing",
    "blocks": [
      {
        "type": "heading",
        "level": 5,
        "title": "Step 1 · Cleaning the structure and standardizing nomenclature"
      },
      {
        "type": "prose",
        "paragraphs": [
          "The raw output contains **non-polymer atoms** and **alternate conformations**, and chain identifiers vary across jobs. In PyMOL (Schrödinger, n.d.) we removed these atoms and conformations, renamed the chains A (heavy chain), B (β2-microglobulin) and C (peptide), and renumbered peptide residues 1–9. **Coordinates were unchanged**; consistent chain IDs and numbering allow the same selections to be applied across **all 85 models**."
        ]
      },
      {
        "type": "heading",
        "level": 5,
        "title": "Step 2 · Rebuilding hydrogens and assigning protonation states"
      },
      {
        "type": "prose",
        "paragraphs": [
          "AlphaFold output contains **no hydrogen atoms**. Without them, the terminal N and O atoms of Asn and Gln side chains can be difficult to distinguish, and His side-chain orientation may also be uncertain. A wrongly assigned amide may create a close acceptor–acceptor contact that a distance-only method could count as a hydrogen bond. We therefore processed each model with **PDB2PQR** (Dolinsky et al., 2007) and **PROPKA** (Olsson et al., 2011) at **pH 7.4** with the **AMBER force field** to add hydrogens, correct side-chain orientations and assign histidine tautomeric states."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "For SVCWCVNSV, preprocessing changed **three hydrogen-bond calls**. Flipping the **Asn7** amide enabled a hydrogen bond with heavy-chain **Gln155**. The distance between the Cys3 backbone oxygen and His70 decreased from 3.58 Å to **2.91 Å**, supporting an unambiguous hydrogen-bond assignment. A Cys5–His70 contact was excluded because both atoms are acceptors."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "All hydrogen-bond measurements in this section used **preprocessed structures**."
        ]
      },
      {
        "type": "heading",
        "level": 5,
        "title": "Step 3 · Per-residue side-chain burial"
      },
      {
        "type": "prose",
        "paragraphs": [
          "We calculated the **solvent-accessible surface area (SASA)** (Lee and Richards, 1971) of each peptide side chain in both the complex and the **free peptide**. For the free-peptide measurement, we removed the heavy chain and β2-microglobulin while keeping peptide coordinates fixed. The decrease in **SASA** upon complex formation is the **area buried during binding**."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "SVCWCVNSV showed the expected **two-anchor pattern**: **V2 and V9** were **99.8%** and **100.0%** buried, respectively, and the absolute buried area at V9 was 114.4 ± 1.1 Å². **W4** was 32.7% buried, leaving 139–148 Å² of its side-chain surface **exposed**. Burial at positions 3, 5, 6 and 7 fell between these values."
        ]
      },
      {
        "type": "heading",
        "level": 5,
        "title": "Step 4 · Typing hydrogen bonds before counting them"
      },
      {
        "type": "prose",
        "paragraphs": [
          "We screened each candidate atom pair for distance and **donor–acceptor compatibility**. Nitrogen, oxygen or sulfur heavy atoms had to be within **3.6 Å**; contacts shorter than **2.2 Å** were classified as clashes. Backbone N was treated as a donor and backbone O as an acceptor. Side-chain roles were assigned by residue type and protonation state. **Only donor–acceptor pairs** were counted, excluding close acceptor–acceptor contacts. We recorded **backbone and side-chain** hydrogen bonds separately."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Across the five models, SVCWCVNSV formed **16–19 hydrogen bonds** with the heavy chain. Of these, **12–14** involved the peptide backbone and **3–5** involved side chains. Because the conserved backbone network is expected in correctly loaded 9-mers, the total count is **not useful for ranking epitopes**. Most peptide side chains remained exposed toward the **T-cell receptor**."
        ]
      },
      {
        "type": "heading",
        "level": 5,
        "title": "Step 5 · Measuring the eleven conserved bonds individually"
      },
      {
        "type": "prose",
        "paragraphs": [
          "We defined the **11 conserved bonds** as specific atom pairs: three contact the peptide backbone near its N-terminus (Tyr7, Tyr159, Tyr171); two connect Glu63 and Lys66 to position 2 in the **B pocket**; one connects Tyr99 to position 3 at the groove floor; and five involve Trp147, Asp77, Tyr84, Thr143 and Lys146 near the **F pocket**. We checked each heavy-atom pair against the **3.6 Å cutoff** and recorded the number present and the identity of any missing bond."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "All five SVCWCVNSV models retained **all 11 bonds**."
        ]
      },
      {
        "type": "heading",
        "level": 5,
        "title": "Step 6 · Geometric plausibility check"
      },
      {
        "type": "prose",
        "paragraphs": [
          "At each interface, we checked for heavy-atom contacts shorter than **2.2 Å** and for amide or histidine **flip candidates** remaining after preprocessing. Short contacts can indicate overly compressed local geometry and may affect measurements involving those atoms. Remaining **flip candidates** require manual review of side-chain orientation. We recorded both as **warnings**; neither changed the **system-level classification**."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "None of the five SVCWCVNSV models had a **steric clash** or a **remaining flip candidate**."
        ]
      },
      {
        "type": "heading",
        "level": 5,
        "title": "Step 7 · Aggregating the five models into a single row"
      },
      {
        "type": "prose",
        "paragraphs": [
          "We applied **steps 1–6** separately to each of the five models, then summarized the results across models. We report each measurement as a **mean** and its **between-model dispersion**, and retain the raw value for each model. Conclusions are limited to findings **consistent across the five models**."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "In SVCWCVNSV, the two ends varied little across models: the largest Cα displacement between any pair of models was **0.12 Å** at position 1 and **0.25 Å** at position 9, within the coordinate uncertainty of crystal structures at comparable resolution. The central segment varied more. At position 6, the valine Cα displacement reached **2.04 Å**, while side-chain burial ranged from **28.6% to 93.6%** (SD 27.1 percentage points). This variation in burial may reflect differences in side-chain rotamers across models."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "**Table 13.** Per-model measurements for SVCWCVNSV epitope."
        ]
      },
      {
        "type": "feature",
        "key": "model-panel-15"
      },
      {
        "type": "prose",
        "paragraphs": [
          "Across all five models, SVCWCVNSV had the **required loading geometry** and **passed to downstream experiments**. **Trp4** contributed **139–148 Å²**, more than half of the TCR-facing surface in each model. This identifies **Trp4** as the **largest single contributor** to that exposed surface."
        ]
      }
    ]
  },
  "model-panel-17": {
    "kind": "fold",
    "title": "Equations and parameter details",
    "blocks": [
      {
        "type": "prose",
        "paragraphs": [
          "Convert the **Blank** and **Combined** percentages into fractions, denoted b_k and c_k. Assuming **independent killing processes**, the **surviving fraction** is (1−b_k)(1−K_specific), giving"
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "$$K_{specific}=\\frac{c_k-b_k}{1-b_k}.$$"
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "The CCK8 baseline b has a **normal prior** with mean 1 and standard deviation 0.07. E50 has a **log-uniform prior** from 200 to 900 ng, and h has a uniform prior from 1 to 30. Computation uses **finite-grid Bayesian integration**, analytically integrates the Gaussian baseline nuisance parameter, and independently resamples according to the grid weights. This is **not MCMC**; R-hat and MCMC effective sample size do not apply. The killing prior for K_ET is log-uniform from 5 to 160, and the prior for n is uniform from 0.3 to 5."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "$$p(E_{50},h\\mid y)\\propto p(y\\mid E_{50},h)p(E_{50})p(h),\\qquad ED80=E_{50}(0.25)^{1/h}.$$"
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "**ED80** describes **remaining viability**, **not 80% killing**. The viability gate uses the fraction of the fitted baseline, so b is not multiplied into the animal ODE. The geometric mean is defined by"
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "$$\\log t_{fold}=\\frac{\\log f_{activation}+\\log f_{IFN\\gamma}+\\log f_{GranzymeB}}{3}.$$"
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "**Equal weighting** is a **structural mapping choice**, **not a weight estimated from animal data**. CD28/CD8, CD45RO/CCR7, TROP2 overexpression, off-target assays, and K562 records are retained but are not connected to the current forward equations. Raw records and inferred values are available in the cell-input directory and cell posterior table."
        ]
      },
      {
        "type": "figure",
        "src": getModelImage("image 35.png"),
        "width": 975,
        "height": 319,
        "alt": "Parameter dependence in cell calibration. Joint posteriors show the weakly constrained viability slope and correlated killing parameters; The ED80 distribution retains their joint variation.",
        "caption": "Parameter dependence in cell calibration. Joint posteriors show the weakly constrained viability slope and correlated killing parameters; The ED80 distribution retains their joint variation.",
        "figureLabel": "FIG. 21"
      },
      {
        "type": "subheading",
        "id": "model-heading-56",
        "index": "4.2.3.1",
        "title": "Derivation: why ED80 does not mean 80% killing",
        "level": 4
      },
      {
        "type": "prose",
        "paragraphs": [
          "Divide the **viability curve** by its **baseline** b, set the remaining fraction to **0.80**, and rearrange:"
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "$$\\frac{V_{cell}(x)}{b}=0.80 \\Longrightarrow 1+(x/E_{50})^h=1/0.80 \\Longrightarrow (x/E_{50})^h=0.25 \\Longrightarrow x=E_{50}(0.25)^{1/h}.$$"
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "This threshold therefore describes the **fraction of baseline viability retained**. It is calculated separately for each joint parameter draw; substituting marginal parameter medians need not give the **posterior median of ED80**."
        ]
      }
    ]
  },
  "model-panel-18": {
    "kind": "fold",
    "title": "Complete mass equations and lymph-payload peak time",
    "blocks": [
      {
        "type": "prose",
        "paragraphs": [
          "$$\\dot S=-k_{sc}S,\\qquad \\dot L=f_{lymph}k_{sc}S-k_{lymph}L,\\qquad \\dot C=f_{blood}k_{sc}S-k_{blood}C.$$"
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "$$\\dot U=(1-f_{lymph}-f_{blood})k_{sc}S+k_{lymph}L+k_{blood}C,\\qquad \\frac{d(S+L+C+U)}{dt}=0.$$"
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Between injections, internal transfers cancel; each injection increases **total mass by exactly q**. **U represents removed** or otherwise untracked tracer payload and **cannot be interpreted as RNA** available for reuse."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "For a **single pulse** with S(0)=q, when **k_sc ≠ k_lymph**:"
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "$$L(t)=\\frac{f_{lymph}qk_{sc}}{k_{lymph}-k_{sc}}\\left(e^{-k_{sc}t}-e^{-k_{lymph}t}\\right),\\qquad t_{peak}=\\frac{\\log(k_{lymph}/k_{sc})}{k_{lymph}-k_{sc}}.$$"
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Here **k_sc ∈ [0.35, 2]** day⁻¹ and **k_lymph = 0.8** day⁻¹. When they are equal, the continuous limit gives t_peak = 1/k_sc. The fraction **f_lymph ∈ [0.005, 0.60]** is a **broad structural assumption**, **not a product-specific range** measured in the cited literature."
        ]
      },
      {
        "type": "subheading",
        "id": "model-heading-60",
        "index": "4.3.2.1",
        "title": "Derivation: predicting when to sample lymph payload",
        "level": 4
      },
      {
        "type": "prose",
        "paragraphs": [
          "For a single injection and initially zero lymph payload, the local solution is S(t)=q exp(−k_sc t). Substitution into the lymph equation and multiplication by an integrating factor gives"
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "$$\\frac{d}{dt}\\left(e^{k_{lymph}t}L(t)\\right)=f_{lymph}qk_{sc}e^{(k_{lymph}-k_{sc})t}.$$"
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Integration from 0 to t gives L(t) above. Differentiating it, for positive q and f_lymph and unequal clearance rates, gives the peak condition"
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "$$\\dot L(t_{peak})=0\\Longrightarrow k_{lymph}e^{-k_{lymph}t_{peak}}=k_{sc}e^{-k_{sc}t_{peak}}.$$"
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Taking logarithms gives the peak-time formula above. Dose and routing fraction scale the height of this single-injection linear curve and therefore **do not change its peak time**. **Repeated injections require** accounting for residual payload, so this single-injection result **cannot be transferred directly**."
        ]
      }
    ]
  },
  "model-panel-19": {
    "kind": "fold",
    "title": "Schedules, paired comparisons and numerical checks",
    "blocks": [
      {
        "type": "prose",
        "paragraphs": [
          "**Table 18.** Alternative dosing schedule scenarios."
        ]
      },
      {
        "type": "table",
        "headers": [
          "Interval",
          "Five injection days",
          "Common day 47: pass fraction",
          "Last dose + 7 days: endpoint / pass fraction"
        ],
        "rows": [
          [
            "5 days",
            "0, 5, 10, 15, 20",
            "0.8145",
            "day 27 / 0.8359"
          ],
          [
            "7 days",
            "0, 7, 14, 21, 28",
            "0.8203",
            "day 35 / 0.8145"
          ],
          [
            "10 days",
            "0, 10, 20, 30, 40",
            "0.7783",
            "day 47 / 0.7783"
          ]
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "At **day 47**, the intervals since the final injection are **27, 19 and 7 days**; at seven days after the final injection, total tumor-growth duration differs. Neither alignment isolates the interval effect alone. Each treated draw uses a matched untreated comparator at its own endpoint. Cumulative delivered mass is 51 µg for every draw and schedule, with maximum mass-balance error 1.42 × 10⁻¹³ µg. The original **834/1,024** pass events for weekly dosing at day 35 are reproduced individually."
        ]
      }
    ]
  },
  "model-panel-20": {
    "kind": "fold",
    "title": "Gating functions, expression prior, and non-monotonic drive",
    "blocks": [
      {
        "type": "prose",
        "paragraphs": [
          "$$\\dot R=\\eta k_{lymph}L/q_{scale}-d_RR,\\quad \\dot A=k_{translation}R g_{tr}(I)-d_AA,\\quad \\dot I=\\rho R+\\ell S/q_{scale}-d_II.$$"
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Here ℓ is the LNP innate-source coefficient. The **translation gate** g_tr decreases as I rises. The **DC activation drive** initially increases with I, then is reduced by an overactivation gate. These are **testable mechanistic assumptions**."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "$$g_{tr}(I)=\\frac{1}{1+(I/I_{translation})^2},\\quad g_{over}(I)=\\frac{1}{1+(I/I_{overactivation})^2},\\quad F(I)=\\frac{I}{K_I+I}g_{over}(I).$$"
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "The current values are **K_I = 0.2**, **I_translation = 2**, and **I_overactivation = 3**. Differentiating F shows that its positive peak satisfies"
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "$$2I^3+K_II^2-K_I I_{overactivation}^2=0.$$"
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "The positive root is approximately **0.933**. This mathematical peak belongs to a normalized functional drive, **not an animal inflammatory safety threshold**."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "The reported protein-production half-lives in HEK293 and HeLa cells are approximately **80 and 116 hours** (Wesselhoeft et al., 2018). Conversion using ln(2)×24/t_half gives approximately **0.208 and 0.143 day⁻¹**. Version 0901 broadens d_R to a prior range of **0.12–0.35 day⁻¹** to accommodate cross-system transfer. This is **neither a purified-RNA molecular half-life** **nor a product-matched in-vivo measurement interval**."
        ]
      },
      {
        "type": "figure",
        "src": getModelImage("image 23.png"),
        "width": 975,
        "height": 576,
        "alt": "Role of expression persistence in functional outcomes.",
        "caption": "Role of expression persistence in functional outcomes.",
        "figureLabel": "FIG. 28"
      },
      {
        "type": "subheading",
        "id": "model-heading-65",
        "index": "4.4.2.1",
        "title": "Derivation: Why Stronger Innate Signals Do Not Necessarily Bring Stronger Activation",
        "level": 4
      },
      {
        "type": "prose",
        "paragraphs": [
          "For I > 0, taking the logarithmic derivative transforms the extremum condition of the product F(I) into"
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "$$\\frac{F'(I)}{F(I)} = \\frac{1}{I} - \\frac{1}{K_I + I} - \\frac{2I}{I_{\\text{overactivation}}^2 + I^2} = 0.$$"
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Multiplying through by the positive denominator gives the cubic equation above. Its left-hand side starts from a negative value, is strictly increasing for I > 0, and eventually tends to positive infinity, so there is **only one positive root**. Combined with the fact that F approaches zero at both zero and infinity, this root is the **unique positive peak**. This result explains why the model permits a \"**moderate activation is beneficial, excessive activation is detrimental**\" response; the peak location remains a numerical value on the model's **functional scale**."
        ]
      }
    ]
  },
  "model-panel-21": {
    "kind": "fold",
    "title": "Complete immune-state equations",
    "blocks": [
      {
        "type": "prose",
        "paragraphs": [
          "$$v(S) = 1 + \\frac{(\\alpha S / E_{50})^h}{1}, \\qquad \\dot E = H \\cdot k_E \\cdot \\frac{t_{\\text{fold}} K_P + P}{P} \\cdot \\frac{1 + X}{1 - E} - d_E E.$$"
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "α maps μg local payload to in-vitro nominal ng equivalents, and H represents the switch for the host adaptation pathway. The **unit mapping** here is a **cross-scale hypothesis awaiting measurement**. The **normalized E** is not the **measured CD69**⁺ percentage."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "$$\\begin{aligned}\\dot D&=k_Ddc_{fold}F(I)v(S)(1-D)-d_DD,\\\\ \\dot P&=k_P\\frac{A}{K_A+A}Dv(S)(1-P)-d_PP,\\\\ \\dot X&=s_X\\left(\\frac{B}{K_{X,tumor}+B}+\\frac{I}{1+I}\\right)-d_XX.\\end{aligned}$$"
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "With **nonnegative drives**, the continuous equations for D, P, and E do not move toward negative values at zero and do not continue growing at one. Thus **[0,1] is a natural invariant interval**. X is a **nonnegative suppressive state** and is not restricted to [0,1]. This property makes the normalization internally consistent, but does not establish a **quantitative mapping** to actual **flow-cytometry readouts**."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Let y denote **D, P, or E** uniformly, and denote its **non-negative generation coefficient** as a_y(t). All three equations share the **same boundary structure**:"
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "$$\\dot y = a_y(t)(1 - y) - d_y y, \\qquad \\left.\\dot y\\right|_{y=0} = a_y(t) \\geq 0, \\qquad \\left.\\dot y\\right|_{y=1} = -d_y \\leq 0.$$"
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Therefore, a continuous solution starting from within **[0, 1]** **will not cross either boundary**. This derivation relies on non-negative driving terms and non-negative loss rates, and is a **structural property** of the equations; actual discrete integration still requires **independent verification of numerical errors**."
        ]
      }
    ]
  },
  "model-panel-22": {
    "kind": "fold",
    "title": "Growth equation, observation model, and analytical checks",
    "blocks": [
      {
        "type": "prose",
        "paragraphs": [
          "$$\\dot B=\\left[g(B,t)-\\frac{k_{kill}}{1+X}\\frac{1}{1+(K_{ET}/(\\gamma_{ET}E))^n}\\right]B,\\qquad V=\\max(B-B_{det},0).$$"
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "γ_ET **maps normalized E** onto an **assay-equivalent E:T scale**; k_kill converts the cell-response function into a daily killing rate. Neither is directly identified by the in-vitro killing assay. In particular, the range 0.74–0.80 day⁻¹ for k_kill is an assumption. At E=0, the killing-response function takes its **zero limit**."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "The default exponential–linear **per-capita growth rate** is"
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "$$g(B,t)=c\\min(a_0,a_1/B)\\mathbf{1}_{t\\ge t_{lag}}.$$"
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "**Without killing**, and with **initial B0** in the **exponential phase**, B remains B0 before the lag ends. For t≥t_lag, its initial growth branch is B(t)=B0 exp[a0 c(t−t_lag)]. The **switch burden** is a1/a0 and the **switch time** is"
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "$$t_{switch}=t_{lag}+\\frac{\\log[a_1/(a_0B_0)]}{a_0c}.$$"
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Afterward, B(t)=a1/a0+a1c(t−t_switch). An illustration using parameter medians and c=1 switches approximately **17.4 days** after the lag. Across the actual 1024 draws, the **2.5%, 50%, and 97.5%** switch-time quantiles are approximately days 12.21, 21.05, and 35.31. Thus **not every scenario** enters the linear phase **before day 35**."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "The solver uses **z=log B**, giving dz/dt=g−kill. This preserves **positive latent burden** without clipping negative numerical tumor volumes to zero. An observable volume of zero results from the **observation threshold**, **not mathematical elimination** of B."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "The default Bdet = 1 mm³ is a convention and has **not been calibrated** to this project's caliper detection capability. Animal comparisons should use **observable V**. Latent burden ratios, ratios of observed mean volumes, **standard T/C**, and **TGI** should **not be treated as interchangeable**.(Meric-Bernstam et al., 2024)"
        ]
      },
      {
        "type": "subheading",
        "id": "model-heading-73",
        "index": "4.6.3.1",
        "title": "Derivation: keeping internal tumor burden positive",
        "level": 4
      },
      {
        "type": "prose",
        "paragraphs": [
          "Denote the **effective daily killing rate** in the equation by **k_eff(t)**, and set **z=log B**. The **chain rule** gives"
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "$$\\dot z=\\frac{\\dot B}{B}=g(B,t)-k_{eff}(t),\\qquad B=e^z>0.$$"
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "The calculation follows the difference between growth and killing on a **logarithmic scale**, then recovers **positive latent burden** without deleting internal burden below the detection threshold. **Zero observed volume** remains distinct from **complete biological elimination**."
        ]
      }
    ]
  },
  "model-panel-23": {
    "kind": "fold",
    "title": "Parameter propagation, paired comparisons, and numerical error",
    "blocks": [
      {
        "type": "subheading",
        "id": "model-heading-81",
        "index": "4.7.2.3.1",
        "title": "Scenario-Specific Criteria and Notation",
        "level": 4
      },
      {
        "type": "prose",
        "paragraphs": [
          "**Table 20.** Screening conditions with definitions and current interpretations for dose optimization."
        ]
      },
      {
        "type": "table",
        "headers": [
          "Condition",
          "Definition",
          "Current Interpretation"
        ],
        "rows": [
          [
            "",
            "",
            ""
          ],
          [
            "Efficacy proxy",
            "Day 35 B_q/B_0 ≤ 0.70",
            "Relative to untreated day-35 burden from the same draw, at least 30% reduction; denominator is not initial burden B(0)=1"
          ],
          [
            "",
            "",
            ""
          ],
          [
            "Viability proxy",
            "Full-course min v(S) ≥ 0.80",
            "In-vitro mapping screen"
          ],
          [
            "",
            "",
            ""
          ],
          [
            "Innate signal",
            "max I ≤ current draw's I_limit",
            "Structural screen without product-specific calibration"
          ],
          [
            "",
            "",
            ""
          ],
          [
            "Blood exposure",
            "∫C dt ≤ current draw's AUC_limit",
            "Exposure screen without product-specific calibration"
          ],
          [
            "",
            "",
            ""
          ]
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "A dose enters the **candidate set** when p_joint ≥ 0.80; these **project thresholds** are **not unified iGEM, clinical, or animal safety standards**."
        ]
      },
      {
        "type": "subheading",
        "id": "model-heading-82",
        "index": "4.7.2.3.2",
        "title": "Model Equations and Parameter Interpretation",
        "level": 4
      },
      {
        "type": "prose",
        "paragraphs": [
          "$$\\hat p_{\\text{joint}}(q) = \\frac{1}{N}\\sum_{i=1}^{N}\\mathbf{1}{E_i(q) \\cap V_i(q) \\cap I_i(q) \\cap C_i(q)}, \\qquad N=1024.$$"
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "The model retains the **joint posterior** of cell-response parameters, constructs **independent lognormal approximations** using median/CV from external growth parameters, and employs **Latin hypercube sampling** with independent marginals for **16 structural factors**. Twenty structural constants are fixed in the main scan. Different doses and the zero-dose control use the **same draw ID**; output probabilities are sample proportions under the current model and **distributional assumptions**."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Efficacy and screening outcomes within the same draw may be **correlated**, so marginal pass rates **cannot be directly multiplied**. The **pointwise error** uses"
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "$$\\text{MCSE}(q) \\approx \\sqrt{\\hat p_{\\text{joint}}(q)(1 - \\hat p_{\\text{joint}}(q))/N}.$$"
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "At 10.2 μg, this is **0.01215**. This is a **Bernoulli plug-in numerical approximation** that does not fully characterize Latin hypercube dependence, nor is it the standard error for animal efficacy estimates."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "For doses q and q*, define d_i = J_i(q*) − J_i(q); **paired error** is calculated using the standard error of sample differences. The indicator correlation between 10.2 and 11.0 μg is approximately **0.9044**; **paired error** is approximately **0.00535**, while unpaired approximation is **0.01728**. **Common random numbers** reduce comparison noise but **cannot eliminate parameter and model-structure uncertainty**."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "The sample proportion with \"**at least one feasible dose**\" is **0.9297**. Interval-boundary quantiles are computed only among draws where the feasible set is non-empty; approximately **47.1%** of these reach the scan's **upper limit** and can**not be interpreted as complete identification of a biological ceiling**. The 6–14 μg local table is a **reporting subset** of the same step size, **not a finer re-scan**."
        ]
      },
      {
        "type": "subheading",
        "id": "model-heading-83",
        "index": "4.7.2.4",
        "title": "Derivation: Why Compare Two Doses Using the Same Scenarios",
        "level": 4
      },
      {
        "type": "prose",
        "paragraphs": [
          "Let J denote the **indicator** of whether a dose **simultaneously passes all conditions**. For the difference d_i within the **same draw** as described above, using the variance identity and the standard error of sample differences, we have"
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "$$\\text{Var}(J^* - J) = \\text{Var}(J^*) + \\text{Var}(J) - 2\\text{Cov}(J^*, J), \\qquad \\widehat{\\text{SE}}_{\\text{paired}} = \\sqrt{\\frac{\\sum_{i=1}^{N}(d_i - \\bar d)^2}{N(N-1)}}.$$"
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "The same biological scenario often simultaneously supports or rejects nearby doses; its **positive covariance** can therefore **reduce the computational noise** in dose differences. The formula above is a numerical approximation using sample differences and still does not fully characterize the dependence of Latin hypercube sampling, nor is it the error estimate for actual animal experiments."
        ]
      }
    ]
  },
  "model-panel-24": {
    "kind": "fold",
    "title": "Fixed values, passing sets, paired changes",
    "blocks": [
      {
        "type": "prose",
        "paragraphs": [
          "**Table 21.** Scenario analysis comparing dose optimization outcomes under different fixed parameter assumptions."
        ]
      },
      {
        "type": "table",
        "headers": [
          "Scenario",
          "Fixed value",
          "Passing set (µg/injection)",
          "Grid points",
          "Max pass",
          "At 10.2 µg",
          "Paired Δ",
          "MCSE",
          "Log10 width",
          "Volume width (mm³)"
        ],
        "rows": [
          [
            "Default",
            "—",
            "[9.4,12.0] ∪ [12.2,12.4] ∪ {12.6}",
            "31",
            "0.8145",
            "0.8145",
            "—",
            "—",
            "6.27",
            "1966"
          ],
          [
            "Fix γ_ET",
            "44.74",
            "[8.1,13.0]",
            "50",
            "0.8223",
            "0.8223",
            "0.0078",
            "0.0063",
            "4.79",
            "1921"
          ],
          [
            "Fix q_scale",
            "10.01 µg",
            "[4.8,18.9]",
            "142",
            "0.9082",
            "0.9023",
            "0.0879",
            "0.0119",
            "6.37",
            "1506"
          ],
          [
            "Fix f_lymph",
            "0.0548",
            "[7.6,15.7]",
            "82",
            "0.8506",
            "0.8447",
            "0.0303",
            "0.0107",
            "6.13",
            "1723"
          ]
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Segment-length sums: 2.8, 4.9, 14.1, 8.1 µg. Grid counts × 0.1 µg: 3.1, 5.0, 14.2, 8.2 µg (differ for isolated points). With γ_ET fixed, maxima tie at 10.2 and 10.4 µg."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "These factors are **independent LHS marginals**. **q_scale** also appears in the LNP innate term and is partly confounded with η. Measurements should target **observable delivery and innate combinations**."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "**Halving dt to 0.05 day** changes **no events**; max relative burden difference **1.66%**. Data: summary, curves, checks."
        ]
      }
    ]
  },
  "model-panel-25": {
    "kind": "fold",
    "title": "Sobol design, calibration robustness, and convergence plots",
    "blocks": [
      {
        "type": "prose",
        "paragraphs": [
          "Conditional Sobol analysis uses **16 structural factors**, **base sample size 256**, and **four independent scrambles**. It reports **first-order** and **total-effect indices** using **variance decomposition**.(Jansen, 1999) Total effects include **interactions**. Finite-sample error should be read alongside the ranking."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "The four α **total-effect estimates** on minimum viability are 1.038, 1.047, 0.948, 1.039. Their **mean 1.018** and **SD 0.047** can be reproduced from the raw Sobol results. The viability proxy applies the cell-response curve to local payload S times α. Local clearance k_sc also affects minimum viability through residual payload between doses. The high sensitivity is **conditional on this output**, the stated parameter ranges, and the **fixed cell-response curve**."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Cell calibration compares **four settings**: baseline, **doubled grid resolution**, h upper bound extended to 60, and doubled observation noise. The **SBC-style check** covers only prior-generated CCK8 submodels with known σ=0.06.(Talts et al., 2018)"
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "**Fixed-constant stress tests** generally compare **factors of 0.5 and 2**. Bdet uses only the 2× case. When B0 changes, Bdet changes with it to **preserve the initial observable-volume convention**."
        ]
      },
      {
        "type": "figure",
        "src": getModelImage("image 2.png"),
        "width": 975,
        "height": 576,
        "alt": "Step-size convergence comparison.",
        "caption": "Step-size convergence comparison.",
        "figureLabel": "FIG. 38"
      },
      {
        "type": "figure",
        "src": getModelImage("image 13.png"),
        "width": 975,
        "height": 412,
        "alt": "CCK8 inference diagnostics and calibration validation.",
        "caption": "CCK8 inference diagnostics and calibration validation.",
        "figureLabel": "FIG. 39"
      },
      {
        "type": "subheading",
        "id": "model-heading-88",
        "index": "4.8.2.1",
        "title": "Derivation: first-order versus total effect",
        "level": 4
      },
      {
        "type": "prose",
        "paragraphs": [
          "Let Y be the output, θ_j one parameter, θ_−j all others. For **independent inputs** and **nonzero output variance**:"
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "$$S_j=\\frac{\\operatorname{Var}_{\\theta_j}\\left(\\mathbb{E}[Y\\mid\\theta_j]\\right)}{\\operatorname{Var}(Y)},\\qquad S_{T,j}=\\frac{\\mathbb{E}_{\\theta_{-j}}\\left[\\operatorname{Var}(Y\\mid\\theta_{-j})\\right]}{\\operatorname{Var}(Y)}=1-\\frac{\\operatorname{Var}_{\\theta_{-j}}\\left(\\mathbb{E}[Y\\mid\\theta_{-j}]\\right)}{\\operatorname{Var}(Y)}.$$"
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "The **law of total variance** separates overall variation into variation remaining after other parameters are known and variation in the mean caused by those parameters. **Conditional variance is nonnegative**, so every theoretical total effect satisfies 0≤S_T,j≤1. The first-order index captures individual contribution; total effects include **interactions** and need not sum to 1. Estimates above 1 reflect **finite-sample error**, **not biological excess**."
        ]
      }
    ]
  },
  "model-panel-26": {
    "kind": "fold",
    "title": "Meaning of partial parameter redundancy",
    "blocks": [
      {
        "type": "prose",
        "paragraphs": [
          "The input to R contains **only the combination** η/q_scale, so observing that relationship alone **cannot separately identify** both. However, q_scale also enters the LNP innate source, so the complete system is not strictly invariant under simultaneous rescaling. The correct description is **partial redundancy** within the expression input, **not complete equivalence** throughout the model. **Independent delivery or innate-signal measurements** would resolve this."
        ]
      }
    ]
  },
  "model-panel-27": {
    "kind": "fold",
    "title": "Reusability",
    "blocks": [
      {
        "type": "subheading",
        "id": "model-heading-130",
        "index": "5.5.4",
        "title": "For Other iGEM Teams",
        "level": 4
      },
      {
        "type": "prose",
        "paragraphs": [
          "**SST-QN** is designed as a **reusable framework**. Any project can adopt the model by following these steps without rebuilding the interaction matrix."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "**Step 1: Use the pre-registered network.** The 17×17 interaction **matrix A**, boundary classifications (C/E/±/0), and conditional edge parameters are published in our repository. Teams do not need to re-score SDG interactions—the network represents general mechanisms documented in literature, not CirCure-specific relationships."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "**Step 2: Score your project's direct contributions using the four-dimensional framework.** For each SDG your project addresses, evaluate **Action** (did activities start?), Implementation (were outputs delivered?), **Feedback** (did stakeholders engage?), and Record (is evidence documented?). Each dimension scores on the **fixed five-tier scale**: 1.00 / 0.75 / 0.50 / 0.25 / 0.00. Compute D = 3G(0.10A + 0.30I + 0.10F + 0.50R) where G=1 for addressed goals, G=0 otherwise."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Scoring guidance: **Action**=1.0 requires documented planning and resource allocation. Implementation=1.0 requires completed deliverables with stage-appropriate verification (functional prototype for R&D, delivered curriculum for education, signed agreements for partnerships). **Feedback**=1.0 requires documented stakeholder input that changed project decisions. Record=1.0 requires comprehensive paired evidence (activity + outcome verification) accessible for independent review. See repository's `scoring_guide.md` for tier-by-tier criteria."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Do not score aspirations or **indirect effects**—only activities you can document with experimental results, stakeholder interviews, resource logs, or workshop records. The 50% weight on Record ensures that undocumented claims do not inflate scores."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "**Step 3: Choose scenario parameters.** Select **gate parameter** M based on your implementation plans: M=0 for conventional resource-intensive pathways, M=0.42 as reference baseline (current global average), M=1.0 for **renewable energy** with **circular economy** principles, or intermediate values (e.g., M=0.6) for partial green adoption. You can run multiple scenarios to compare outcomes."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "**Step 4: Run the model.** Compute r = (I − αA)⁻¹ u using provided scripts (`propagation.py`). The code outputs total impact vector r (system-wide effects), decomposition into direct/one-step/multi-step components, visualization showing which SDGs receive direct versus **indirect effects**, and ranking of indirect beneficiaries."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "**Step 5: Validate with qualitative evidence.** Check whether top-ranked **indirect effects** match stakeholder feedback, patient interviews, or industry consultations. If model predictions contradict qualitative evidence, revisit your **intervention vector** u—you may have under-documented an activity (raising its Record score) or over-estimated contribution magnitude (adjusting Implementation tiers). Flag persistent discrepancies for investigation rather than forcing agreement."
        ]
      },
      {
        "type": "subheading",
        "id": "model-heading-131",
        "index": "5.5.5",
        "title": "Repository Contents",
        "level": 4
      },
      {
        "type": "prose",
        "paragraphs": [
          "**Core files:**"
        ]
      },
      {
        "type": "list",
        "items": [
          "`interaction_matrix.csv`: 17×17 scored matrix A (reference scenario M=0.42)",
          "`boundary_classification.csv`: C/E/±/0 labels for all 272 edges",
          "`scoring_criteria.md`: Documentation of how each edge was scored",
          "`propagation.py`: Matrix power series computation with convergence checks",
          "`uncertainty.py`: Monte Carlo simulation code (4,096 realizations)",
          "`visualization.R`: Scripts for heatmaps, chord diagrams, contribution profiles"
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "**Example inputs:**"
        ]
      },
      {
        "type": "list",
        "items": [
          "`circure_intervention.csv`: CirCure's intervention vector u as worked example",
          "`scoring_guide.md`: Four-dimensional framework tier criteria with examples",
          "`synthetic_examples.csv`: Three synthetic projects (agriculture, infrastructure, education) demonstrating different impact profiles"
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "**Documentation:**"
        ]
      },
      {
        "type": "list",
        "items": [
          "`METHODS.md`: Step-by-step guide to using the model",
          "`FAQ.md`: Common questions about four-dimensional scoring, interpretation, validation",
          "`CHANGELOG.md`: Version history and updates to the matrix"
        ]
      },
      {
        "type": "subheading",
        "id": "model-heading-132",
        "index": "5.5.6",
        "title": "When to Adapt vs. Reuse",
        "level": 4
      },
      {
        "type": "prose",
        "paragraphs": [
          "Reuse the matrix directly if your project operates at individual-project scale (not national policy), works within the 2024-2030 timeframe (SDG mechanisms may shift after 2030), and focuses on health, technology, education, resource use, or environmental impact."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Consider adapting the matrix if your project operates in a context where **documented mechanisms** differ substantially (e.g., fragile states where SDG 16→others pathways dominate), new high-quality evidence emerges that contradicts current scores (document the change and update the matrix version), or you have project-specific evidence that an excluded edge (0) should be core (C) for your case."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "If you adapt the matrix, document changes in a `MODIFICATIONS.md` file so other teams understand how your version differs from the baseline."
        ]
      },
      {
        "type": "subheading",
        "id": "model-heading-133",
        "index": "5.5.7",
        "title": "Building Cross-Project Validation",
        "level": 4
      },
      {
        "type": "prose",
        "paragraphs": [
          "As more teams use **SST-QN**, we can validate the model across projects. If you apply the framework: report your **intervention vector** u and results r in project documentation, document whether model predictions matched stakeholder feedback, and flag any surprising discrepancies between predictions and observed outcomes."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Aggregated data from multiple projects will allow us to test whether indirect effect rankings generalize across project types, identify edges where our scores systematically over- or under-predict, refine **uncertainty** ranges based on cross-project variation, and improve the model for future iGEM cohorts. Contact information for contributing to the validation dataset is in the repository README."
        ]
      }
    ]
  },
  "model-sdg-boundary": {
    "kind": "sdg-chart",
    "chart": "boundary",
    "caption": "**Figure 46,** Pre-registered edge classification matrix for SDG interactions."
  },
  "model-sdg-interactions": {
    "kind": "sdg-chart",
    "chart": "interactions",
    "caption": "**Figure 47,** Scored interaction matrix under reference scenario (M=0.42)."
  },
  "model-sdg-dimensions": {
    "kind": "sdg-chart",
    "chart": "dimensions",
    "caption": "Weighted mapping of the 17 SDGs across social, economic, and environmental dimensions."
  },
  "model-sdg-contributions": {
    "kind": "sdg-chart",
    "chart": "contributions",
    "caption": "Direct, one-step, multi-step, and composite contributions for the displayed SDGs."
  },
  "model-dose-reasons": {
    "kind": "numbered-reasons",
    "items": [
      {
        "title": "**The optimum shifts with different parameter samples**",
        "paragraphs": [
          "The 0.0029 difference corresponds to **3 out of 1,024 draws**. If we re-ran the simulation with a different random seed, the numerical peak could shift anywhere in the 9.8-10.4 μg range. The **Monte Carlo standard error** is ±0.012, four times larger than the 0.0029 difference. Chasing 10.2 μg treats **sampling noise** as a **biological optimum**."
        ]
      },
      {
        "title": "**The two doses are functionally equivalent**",
        "paragraphs": [
          "Both 10.0 and 10.2 μg have efficacy pass fractions around 0.83 and screening pass fractions around 0.97-0.98. Their joint-pass fractions differ by only **0.3%**. Within the model's **prediction uncertainty**, these doses produce **indistinguishable outcomes**."
        ]
      },
      {
        "title": "**Experimental precision cannot reliably distinguish them**",
        "paragraphs": [
          "Preparing 10.2 μg requires **sub-microliter precision**. Typical pipetting error (±3-5%), concentration variation (±5%), and injection volume variability (±2%) combine to ±**6-8% total error**, or **±0.6-0.8 μg** at the 10 μg scale. The 0.2 μg difference is smaller than the **experimental noise**. Using **round doses** is simpler, **more reproducible**, and matches experimental reality."
        ]
      }
    ]
  }
};

export const modelReferences: CitationReference[] = [
  {
    "id": 1,
    "authors": "Bray et al. (2024).",
    "title": "Global cancer statistics 2022: GLOBOCAN estimates of incidence and mortality worldwide for 36 cancers in 185 countries.",
    "journal": "CA: A Cancer Journal for Clinicians",
    "volumeYear": ". 2024;74:229–263.",
    "links": [
      {
        "label": "https://doi.org/10.3322/caac.21834",
        "href": "https://doi.org/10.3322/caac.21834"
      }
    ]
  },
  {
    "id": 2,
    "authors": "Bianchini et al. (2022).",
    "title": "Treatment landscape of triple-negative breast cancer: expanded options, evolving needs.",
    "journal": "Nature Reviews Clinical Oncology",
    "volumeYear": ". 2022;19:91–113.",
    "links": [
      {
        "label": "https://doi.org/10.1038/s41571-021-00565-2",
        "href": "https://doi.org/10.1038/s41571-021-00565-2"
      }
    ]
  },
  {
    "id": 3,
    "authors": "Garrido-Castro et al. (2019).",
    "title": "Insights into molecular classifications of triple-negative breast cancer: improving patient selection for treatment.",
    "journal": "Cancer Discovery",
    "volumeYear": ". 2019;9:176–198.",
    "links": [
      {
        "label": "https://doi.org/10.1158/2159-8290.CD-18-1177",
        "href": "https://doi.org/10.1158/2159-8290.CD-18-1177"
      }
    ]
  },
  {
    "id": 4,
    "authors": "Karaayvaz et al. (2018).",
    "title": "Unravelling subclonal heterogeneity and aggressive disease states in TNBC through single-cell RNA-seq.",
    "journal": "Nature Communications",
    "volumeYear": ". 2018;9:3588.",
    "links": [
      {
        "label": "https://doi.org/10.1038/s41467-018-06052-0",
        "href": "https://doi.org/10.1038/s41467-018-06052-0"
      }
    ]
  },
  {
    "id": 5,
    "authors": "Keren et al. (2018).",
    "title": "A structured tumor-immune microenvironment in triple negative breast cancer revealed by multiplexed ion beam imaging.",
    "journal": "Cell",
    "volumeYear": ". 2018;174:1373–1387.e19.",
    "links": [
      {
        "label": "https://doi.org/10.1016/j.cell.2018.08.039",
        "href": "https://doi.org/10.1016/j.cell.2018.08.039"
      }
    ]
  },
  {
    "id": 6,
    "authors": "Wesselhoeft et al. (2019).",
    "title": "RNA circularization diminishes immunogenicity and can extend translation duration in vivo.",
    "journal": "Molecular Cell",
    "volumeYear": ". 2019;74:508–520.e4.",
    "links": [
      {
        "label": "https://doi.org/10.1016/j.molcel.2019.02.015",
        "href": "https://doi.org/10.1016/j.molcel.2019.02.015"
      }
    ]
  },
  {
    "id": 7,
    "authors": "Cheever et al. (2009).",
    "title": "The prioritization of cancer antigens: a National Cancer Institute pilot project for the acceleration of translational research.",
    "journal": "Clinical Cancer Research",
    "volumeYear": ". 2009;15:5323–5337.",
    "links": [
      {
        "label": "https://doi.org/10.1158/1078-0432.CCR-09-0737",
        "href": "https://doi.org/10.1158/1078-0432.CCR-09-0737"
      }
    ]
  },
  {
    "id": 8,
    "authors": "Asleh et al. (2022).",
    "title": "Proteomic analysis of archival breast cancer clinical specimens identifies biological subtypes with distinct survival outcomes.",
    "journal": "Nature Communications",
    "volumeYear": ". 2022;13:896.",
    "links": [
      {
        "label": "https://doi.org/10.1038/s41467-022-28524-0",
        "href": "https://doi.org/10.1038/s41467-022-28524-0"
      }
    ]
  },
  {
    "id": 9,
    "authors": "Gong, Y., Ji, P., Yang, Y.S., et al. (2021).",
    "title": "‘Metabolic-pathway-based subtyping of triple-negative breast cancer reveals potential therapeutic targets’,",
    "journal": "Cell Metabolism",
    "volumeYear": ", 33(1), pp. 51–64.e9. Available at: https://doi.org/10.1016/j.cmet.2020.10.012.",
    "links": []
  },
  {
    "id": 10,
    "authors": "Ritchie et al. (2015).",
    "title": "limma powers differential expression analyses for RNA-sequencing and microarray studies.",
    "journal": "Nucleic Acids Research",
    "volumeYear": ". 2015;43:e47.",
    "links": [
      {
        "label": "https://doi.org/10.1093/nar/gkv007",
        "href": "https://doi.org/10.1093/nar/gkv007"
      }
    ]
  },
  {
    "id": 11,
    "authors": "Benjamini and Hochberg (1995).",
    "title": "Controlling the false discovery rate: a practical and powerful approach to multiple testing.",
    "journal": "Journal of the Royal Statistical Society Series B",
    "volumeYear": ". 1995;57:289–300.",
    "links": [
      {
        "label": "https://doi.org/10.1111/j.2517-6161.1995.tb02031.x",
        "href": "https://doi.org/10.1111/j.2517-6161.1995.tb02031.x"
      }
    ]
  },
  {
    "id": 12,
    "authors": "Lazar et al. (2016).",
    "title": "Accounting for the multiple natures of missing values in label-free quantitative proteomics data sets to compare imputation strategies.",
    "journal": "Journal of Proteome Research",
    "volumeYear": ". 2016;15:1116–1125.",
    "links": [
      {
        "label": "https://doi.org/10.1021/acs.jproteome.5b00981",
        "href": "https://doi.org/10.1021/acs.jproteome.5b00981"
      }
    ]
  },
  {
    "id": 13,
    "authors": "Wu et al. (2021).",
    "title": "A single-cell and spatially resolved atlas of human breast cancers.",
    "journal": "Nature Genetics",
    "volumeYear": ". 2021;53:1334–1347.",
    "links": [
      {
        "label": "https://doi.org/10.1038/s41588-021-00911-1",
        "href": "https://doi.org/10.1038/s41588-021-00911-1"
      }
    ]
  },
  {
    "id": 14,
    "authors": "Hafemeister and Satija (2019).",
    "title": "Normalization and variance stabilization of single-cell RNA-seq data using regularized negative binomial regression.",
    "journal": "Genome Biology",
    "volumeYear": ". 2019;20:296.",
    "links": [
      {
        "label": "https://doi.org/10.1186/s13059-019-1874-1",
        "href": "https://doi.org/10.1186/s13059-019-1874-1"
      }
    ]
  },
  {
    "id": 15,
    "authors": "Korsunsky et al. (2019).",
    "title": "Fast, sensitive and accurate integration of single-cell data with Harmony.",
    "journal": "Nature Methods",
    "volumeYear": ". 2019;16:1289–1296.",
    "links": [
      {
        "label": "https://doi.org/10.1038/s41592-019-0619-0",
        "href": "https://doi.org/10.1038/s41592-019-0619-0"
      }
    ]
  },
  {
    "id": 16,
    "authors": "Robinson et al. (2010).",
    "title": "edgeR: a Bioconductor package for differential expression analysis of digital gene expression data.",
    "journal": "Bioinformatics",
    "volumeYear": ". 2010;26:139–140.",
    "links": [
      {
        "label": "https://doi.org/10.1093/bioinformatics/btp616",
        "href": "https://doi.org/10.1093/bioinformatics/btp616"
      }
    ]
  },
  {
    "id": 17,
    "authors": "Crowell et al. (2020).",
    "title": "muscat detects subpopulation-specific state transitions from multi-sample multi-condition single-cell transcriptomics data.",
    "journal": "Nature Communications",
    "volumeYear": ". 2020;11:6077.",
    "links": [
      {
        "label": "https://doi.org/10.1038/s41467-020-19894-4",
        "href": "https://doi.org/10.1038/s41467-020-19894-4"
      }
    ]
  },
  {
    "id": 18,
    "authors": "Cerami et al. (2012).",
    "title": "The cBio Cancer Genomics Portal: an open platform for exploring multidimensional cancer genomics data.",
    "journal": "Cancer Discovery",
    "volumeYear": ". 2012;2:401–404.",
    "links": [
      {
        "label": "https://doi.org/10.1158/2159-8290.CD-12-0095",
        "href": "https://doi.org/10.1158/2159-8290.CD-12-0095"
      }
    ]
  },
  {
    "id": 19,
    "authors": "Gao et al. (2013).",
    "title": "Integrative analysis of complex cancer genomics and clinical profiles using the cBioPortal.",
    "journal": "Science Signaling",
    "volumeYear": ". 2013;6:pl1.",
    "links": [
      {
        "label": "https://doi.org/10.1126/scisignal.2004088",
        "href": "https://doi.org/10.1126/scisignal.2004088"
      }
    ]
  },
  {
    "id": 20,
    "authors": "cBioPortal (n.d.).",
    "title": "Onco Query Language.",
    "journal": "",
    "volumeYear": "",
    "links": [
      {
        "label": "https://docs.cbioportal.org/user-guide/oql/",
        "href": "https://docs.cbioportal.org/user-guide/oql/"
      }
    ]
  },
  {
    "id": 21,
    "authors": "Tang et al. (2018).",
    "title": "Integrated proteotranscriptomics of breast cancer reveals globally increased protein-mRNA concordance associated with subtypes and survival.",
    "journal": "Genome Medicine",
    "volumeYear": ". 2018;10:94.",
    "links": [
      {
        "label": "https://doi.org/10.1186/s13073-018-0602-x",
        "href": "https://doi.org/10.1186/s13073-018-0602-x"
      }
    ]
  },
  {
    "id": 22,
    "authors": "Izci et al. (2022).",
    "title": "Correlation of TROP-2 expression with clinical-pathological characteristics and outcome in triple-negative breast cancer.",
    "journal": "Scientific Reports",
    "volumeYear": ". 2022;12:22498.",
    "links": [
      {
        "label": "https://doi.org/10.1038/s41598-022-27093-y",
        "href": "https://doi.org/10.1038/s41598-022-27093-y"
      }
    ]
  },
  {
    "id": 23,
    "authors": "Jeon et al. (2022).",
    "title": "Trophoblast cell-surface antigen 2 (TROP2) expression in triple-negative breast cancer.",
    "journal": "BMC Cancer",
    "volumeYear": ". 2022;22:1014.",
    "links": [
      {
        "label": "https://doi.org/10.1186/s12885-022-10076-7",
        "href": "https://doi.org/10.1186/s12885-022-10076-7"
      }
    ]
  },
  {
    "id": 24,
    "authors": "Wang et al. (2018).",
    "title": "B7-H4 overexpression contributes to poor prognosis and drug-resistance in triple-negative breast cancer.",
    "journal": "Cancer Cell International",
    "volumeYear": ". 2018;18:100.",
    "links": [
      {
        "label": "https://doi.org/10.1186/s12935-018-0597-9",
        "href": "https://doi.org/10.1186/s12935-018-0597-9"
      }
    ]
  },
  {
    "id": 25,
    "authors": "Gruosso et al. (2019).",
    "title": "Spatially distinct tumor immune microenvironments stratify triple-negative breast cancers.",
    "journal": "Journal of Clinical Investigation",
    "volumeYear": ". 2019;129:1785–1800.",
    "links": [
      {
        "label": "https://doi.org/10.1172/JCI96313",
        "href": "https://doi.org/10.1172/JCI96313"
      }
    ]
  },
  {
    "id": 26,
    "authors": "Wescott et al. (2024).",
    "title": "Epithelial expressed B7-H4 drives differential immunotherapy response in murine and human breast cancer.",
    "journal": "Cancer Research Communications",
    "volumeYear": ". 2024;4:1120–1134.",
    "links": [
      {
        "label": "https://doi.org/10.1158/2767-9764.CRC-23-0468",
        "href": "https://doi.org/10.1158/2767-9764.CRC-23-0468"
      }
    ]
  },
  {
    "id": 27,
    "authors": "Zeindler et al. (2019).",
    "title": "Nectin-4 expression is an independent prognostic biomarker and associated with better survival in triple-negative breast cancer.",
    "journal": "Frontiers in Medicine",
    "volumeYear": ". 2019;6:200.",
    "links": [
      {
        "label": "https://doi.org/10.3389/fmed.2019.00200",
        "href": "https://doi.org/10.3389/fmed.2019.00200"
      }
    ]
  },
  {
    "id": 28,
    "authors": "Sussman et al. (2014).",
    "title": "SGN-LIV1A: a novel antibody-drug conjugate targeting LIV-1 for the treatment of metastatic breast cancer.",
    "journal": "Molecular Cancer Therapeutics",
    "volumeYear": ". 2014;13:2991–3000.",
    "links": [
      {
        "label": "https://doi.org/10.1158/1535-7163.MCT-13-0896",
        "href": "https://doi.org/10.1158/1535-7163.MCT-13-0896"
      }
    ]
  },
  {
    "id": 29,
    "authors": "Creary et al. (2021).",
    "title": "High-resolution HLA allele and haplotype frequencies in several unrelated populations determined by next generation sequencing: 17th International HLA and Immunogenetics Workshop joint report.",
    "journal": "Human Immunology",
    "volumeYear": ". 2021;82:505–522.",
    "links": [
      {
        "label": "https://doi.org/10.1016/j.humimm.2021.04.007",
        "href": "https://doi.org/10.1016/j.humimm.2021.04.007"
      }
    ]
  },
  {
    "id": 30,
    "authors": "Wesselhoeft, R.A., Kowalski, P.S. and Anderson, D.G. (2018).",
    "title": "Engineering circular RNA for potent and stable translation in eukaryotic cells. Nature Communications, 9, 2629. https://doi.org/10.1038/s41467-018-05096-6",
    "journal": "",
    "volumeYear": "",
    "links": []
  },
  {
    "id": 31,
    "authors": "Yan et al. (2024).",
    "title": "Next-generation IEDB tools: a platform for epitope prediction and analysis.",
    "journal": "Nucleic Acids Research",
    "volumeYear": ". 2024;52:W526–W532.",
    "links": [
      {
        "label": "https://doi.org/10.1093/nar/gkae407",
        "href": "https://doi.org/10.1093/nar/gkae407"
      }
    ]
  },
  {
    "id": 32,
    "authors": "Reynisson et al. (2020).",
    "title": "NetMHCpan-4.1 and NetMHCIIpan-4.0: improved predictions of MHC antigen presentation by concurrent motif deconvolution and integration of MS MHC eluted ligand data.",
    "journal": "Nucleic Acids Research",
    "volumeYear": ". 2020;48:W449–W454.",
    "links": [
      {
        "label": "https://doi.org/10.1093/nar/gkaa379",
        "href": "https://doi.org/10.1093/nar/gkaa379"
      }
    ]
  },
  {
    "id": 33,
    "authors": "Peters et al. (2003).",
    "title": "Identifying MHC class I epitopes by predicting the TAP transport efficiency of epitope precursors.",
    "journal": "Journal of Immunology",
    "volumeYear": ". 2003;171:1741–1749.",
    "links": [
      {
        "label": "https://doi.org/10.4049/jimmunol.171.4.1741",
        "href": "https://doi.org/10.4049/jimmunol.171.4.1741"
      }
    ]
  },
  {
    "id": 34,
    "authors": "Tenzer et al. (2005).",
    "title": "Modeling the MHC class I pathway by combining predictions of proteasomal cleavage, TAP transport and MHC class I binding.",
    "journal": "Cellular and Molecular Life Sciences",
    "volumeYear": ". 2005;62:1025–1037.",
    "links": [
      {
        "label": "https://doi.org/10.1007/s00018-005-4528-2",
        "href": "https://doi.org/10.1007/s00018-005-4528-2"
      }
    ]
  },
  {
    "id": 35,
    "authors": "Calis et al. (2013).",
    "title": "Properties of MHC class I presented peptides that enhance immunogenicity.",
    "journal": "PLoS Computational Biology",
    "volumeYear": ". 2013;9:e1003266.",
    "links": [
      {
        "label": "https://doi.org/10.1371/journal.pcbi.1003266",
        "href": "https://doi.org/10.1371/journal.pcbi.1003266"
      }
    ]
  },
  {
    "id": 36,
    "authors": "UniProt Consortium (2025).",
    "title": "UniProt: the Universal Protein Knowledgebase in 2025.",
    "journal": "Nucleic Acids Research",
    "volumeYear": ". 2025;53:D609–D617.",
    "links": [
      {
        "label": "https://www.uniprot.org/help/publications",
        "href": "https://www.uniprot.org/help/publications"
      }
    ]
  },
  {
    "id": 37,
    "authors": "Abramson et al. (2024).",
    "title": "Accurate structure prediction of biomolecular interactions with AlphaFold 3.",
    "journal": "Nature",
    "volumeYear": ". 2024;630:493–500.",
    "links": [
      {
        "label": "https://doi.org/10.1038/s41586-024-07487-w",
        "href": "https://doi.org/10.1038/s41586-024-07487-w"
      }
    ]
  },
  {
    "id": 38,
    "authors": "Saper et al. (1991).",
    "title": "Refined structure of the human histocompatibility antigen HLA-A2 at 2.6 Å resolution.",
    "journal": "Journal of Molecular Biology",
    "volumeYear": ". 1991;219:277–319.",
    "links": [
      {
        "label": "https://doi.org/10.1016/0022-2836(91)90567-P",
        "href": "https://doi.org/10.1016/0022-2836(91)90567-P"
      }
    ]
  },
  {
    "id": 39,
    "authors": "Schrödinger (n.d.).",
    "title": "Schrödinger, LLC. The PyMOL Molecular Graphics System.",
    "journal": "",
    "volumeYear": "",
    "links": [
      {
        "label": "https://pymol.org/",
        "href": "https://pymol.org/"
      }
    ]
  },
  {
    "id": 40,
    "authors": "iGEM Foundation (2026).",
    "title": "2026 Judge Handbook.",
    "journal": "",
    "volumeYear": "",
    "links": [
      {
        "label": "https://competition.igem.org/judging/handbook",
        "href": "https://competition.igem.org/judging/handbook"
      }
    ]
  },
  {
    "id": 41,
    "authors": "Saravanan et al. (2022).",
    "title": "Zinc transporter LIV1: A promising cell surface target for triple negative breast cancer.",
    "journal": "Journal of Cellular Physiology",
    "volumeYear": ". 2022;237:4132–4156.",
    "links": [
      {
        "label": "https://doi.org/10.1002/jcp.30880",
        "href": "https://doi.org/10.1002/jcp.30880"
      }
    ]
  },
  {
    "id": 42,
    "authors": "Althobiti et al. (2021).",
    "title": "Oestrogen-regulated protein SLC39A6: a biomarker of good prognosis in luminal breast cancer.",
    "journal": "Breast Cancer Research and Treatment",
    "volumeYear": ". 2021;189:621–630. . Open access under the Creative Commons Attribution 4.0 International License:",
    "links": [
      {
        "label": "https://doi.org/10.1007/s10549-021-06336-y",
        "href": "https://doi.org/10.1007/s10549-021-06336-y"
      },
      {
        "label": "https://creativecommons.org/licenses/by/4.0/",
        "href": "https://creativecommons.org/licenses/by/4.0/"
      }
    ]
  },
  {
    "id": 43,
    "authors": "Jaccard, (1912).",
    "title": "The distribution of the flora in the alpine zone.",
    "journal": "New Phytologist",
    "volumeYear": ". 1912;11(2):37–50.",
    "links": [
      {
        "label": "https://doi.org/10.1111/j.1469-8137.1912.tb05611.x",
        "href": "https://doi.org/10.1111/j.1469-8137.1912.tb05611.x"
      }
    ]
  },
  {
    "id": 44,
    "authors": "Slieker et al. (2024).",
    "title": "Reassessing human MHC-I genetic diversity in T cell studies.",
    "journal": "Scientific Reports",
    "volumeYear": ". 2024;14:7966.",
    "links": [
      {
        "label": "https://doi.org/10.1038/s41598-024-58777-2",
        "href": "https://doi.org/10.1038/s41598-024-58777-2"
      }
    ]
  },
  {
    "id": 45,
    "authors": "IEDB (2024).",
    "title": "Immune Epitope Database and Analysis Resource. IEDB Next-Generation Tools: 2024 User Workshop presentation.",
    "journal": "",
    "volumeYear": "",
    "links": [
      {
        "label": "https://discuss.iedb.org/uploads/short-url/58CtFaZudVrj2LEucIhMSRl41mZ.pdf",
        "href": "https://discuss.iedb.org/uploads/short-url/58CtFaZudVrj2LEucIhMSRl41mZ.pdf"
      }
    ]
  },
  {
    "id": 46,
    "authors": "Rapoport (2007).",
    "title": "Protein translocation across the eukaryotic endoplasmic reticulum and bacterial plasma membranes.",
    "journal": "Nature",
    "volumeYear": ". 2007;450:663–669.",
    "links": [
      {
        "label": "https://doi.org/10.1038/nature06384",
        "href": "https://doi.org/10.1038/nature06384"
      }
    ]
  },
  {
    "id": 47,
    "authors": "Madden (1995).",
    "title": "The three-dimensional structure of peptide--MHC complexes. Annual Review of Immunology. 1995;13:587--622.",
    "journal": "",
    "volumeYear": "",
    "links": [
      {
        "label": "https://doi.org/10.1146/annurev.iy.13.040195.003103",
        "href": "https://doi.org/10.1146/annurev.iy.13.040195.003103"
      }
    ]
  },
  {
    "id": 48,
    "authors": "Bouvier and Wiley (1994).",
    "title": "Importance of peptide amino and carboxyl termini to the stability of MHC class I molecules. Science. 1994;265:398--402.",
    "journal": "",
    "volumeYear": "",
    "links": [
      {
        "label": "https://doi.org/10.1126/science.8023162",
        "href": "https://doi.org/10.1126/science.8023162"
      }
    ]
  },
  {
    "id": 49,
    "authors": "Falk et al. (1991).",
    "title": "Allele-specific motifs revealed by sequence analysis of self-peptides eluted from MHC molecules. Nature. 1991;351:290--296.",
    "journal": "",
    "volumeYear": "",
    "links": [
      {
        "label": "https://doi.org/10.1038/351290a0",
        "href": "https://doi.org/10.1038/351290a0"
      }
    ]
  },
  {
    "id": 50,
    "authors": "Lee and Richards (1971).",
    "title": "The interpretation of protein structures: estimation of static accessibility. Journal of Molecular Biology. 1971;55:379--400.",
    "journal": "",
    "volumeYear": "",
    "links": [
      {
        "label": "https://doi.org/10.1016/0022-2836(71)90324-X",
        "href": "https://doi.org/10.1016/0022-2836(71)90324-X"
      }
    ]
  },
  {
    "id": 51,
    "authors": "Dolinsky et al. (2007).",
    "title": "PDB2PQR: expanding and upgrading automated preparation of biomolecular structures for molecular simulations. Nucleic Acids Research. 2007;35:W522--W525.",
    "journal": "",
    "volumeYear": "",
    "links": [
      {
        "label": "https://doi.org/10.1093/nar/gkm276",
        "href": "https://doi.org/10.1093/nar/gkm276"
      }
    ]
  },
  {
    "id": 52,
    "authors": "Olsson et al. (2011).",
    "title": "PROPKA3: consistent treatment of internal and surface residues in empirical pKa predictions. Journal of Chemical Theory and Computation. 2011;7:525--537.",
    "journal": "",
    "volumeYear": "",
    "links": [
      {
        "label": "https://doi.org/10.1021/ct100578z",
        "href": "https://doi.org/10.1021/ct100578z"
      }
    ]
  },
  {
    "id": 53,
    "authors": "Motmaen et al. (2023).",
    "title": "Peptide-binding specificity prediction using fine-tuned protein structure prediction networks. Proceedings of the National Academy of Sciences. 2023;120:e2216697120.",
    "journal": "",
    "volumeYear": "",
    "links": [
      {
        "label": "https://doi.org/10.1073/pnas.2216697120",
        "href": "https://doi.org/10.1073/pnas.2216697120"
      }
    ]
  },
  {
    "id": 54,
    "authors": "Abualrous et al. (2015).",
    "title": "The carboxy terminus of the ligand peptide determines the stability of the MHC class I molecule H-2Kb: a combined molecular dynamics and experimental study. PLoS ONE. 2015;10:e0135421.",
    "journal": "",
    "volumeYear": "",
    "links": [
      {
        "label": "https://doi.org/10.1371/journal.pone.0135421",
        "href": "https://doi.org/10.1371/journal.pone.0135421"
      }
    ]
  },
  {
    "id": 55,
    "authors": "Harndahl et al. (2012).",
    "title": "Peptide-MHC class I stability is a better predictor than peptide affinity of CTL immunogenicity. European Journal of Immunology. 2012;42:1405--1416.",
    "journal": "",
    "volumeYear": "",
    "links": [
      {
        "label": "https://doi.org/10.1002/eji.201141774",
        "href": "https://doi.org/10.1002/eji.201141774"
      }
    ]
  },
  {
    "id": 56,
    "authors": "Zahraei et al. (2025).",
    "title": "In silico design of a multi-epitope vaccine against the triple negative breast cancer.",
    "journal": "Scientific Reports",
    "volumeYear": ". 2025;15(1):42425.**",
    "links": [
      {
        "label": "**https://doi.org/10.1038/s41598-025-26511-1**",
        "href": "https://doi.org/10.1038/s41598-025-26511-1"
      }
    ]
  },
  {
    "id": 57,
    "authors": "Human Protein Atlas (n.d.-a).",
    "title": "TACSTD2 protein expression summary. n.d. Database entry.",
    "journal": "",
    "volumeYear": "",
    "links": [
      {
        "label": "https://www.proteinatlas.org/ENSG00000184292-TACSTD2/summary",
        "href": "https://www.proteinatlas.org/ENSG00000184292-TACSTD2/summary"
      }
    ]
  },
  {
    "id": 58,
    "authors": "Li et al. (2025).",
    "title": "Improved Efficacy of Triple-Negative Breast Cancer Immunotherapy via Hydrogel-Based Co-Delivery of CAR-T Cells and Mitophagy Agonist.",
    "journal": "Advanced Science",
    "volumeYear": ". 2025;12(14):e2409835.",
    "links": [
      {
        "label": "https://doi.org/10.1002/advs.202409835",
        "href": "https://doi.org/10.1002/advs.202409835"
      }
    ]
  },
  {
    "id": 59,
    "authors": "FDA (2026).",
    "title": "U.S. Food and Drug Administration. FDA approves datopotamab deruxtecan-dlnk for unresectable or metastatic triple-negative breast cancer. 2026. Regulatory announcement.",
    "journal": "",
    "volumeYear": "",
    "links": [
      {
        "label": "https://www.fda.gov/drugs/resources-information-approved-drugs/fda-approves-datopotamab-deruxtecan-dlnk-unresectable-or-metastatic-triple-negative-breast-cancer",
        "href": "https://www.fda.gov/drugs/resources-information-approved-drugs/fda-approves-datopotamab-deruxtecan-dlnk-unresectable-or-metastatic-triple-negative-breast-cancer"
      }
    ]
  },
  {
    "id": 60,
    "authors": "Bardia et al. (2021).",
    "title": "Sacituzumab Govitecan in Metastatic Triple-Negative Breast Cancer.",
    "journal": "The New England Journal of Medicine",
    "volumeYear": ". 2021;384(16):1529–1541.",
    "links": [
      {
        "label": "https://doi.org/10.1056/nejmoa2028485",
        "href": "https://doi.org/10.1056/nejmoa2028485"
      }
    ]
  },
  {
    "id": 61,
    "authors": "Hamilton et al. (2025).",
    "title": "Initial phase 1 dose escalation data for emiltatug ledadotin (Emi-Le), a novel B7-H4-directed dolasynthen antibody-drug conjugate.",
    "journal": "Journal of Clinical Oncology",
    "volumeYear": ". 2025;43(16 Suppl):3009. Conference abstract.",
    "links": [
      {
        "label": "https://doi.org/10.1200/JCO.2025.43.16_suppl.3009",
        "href": "https://doi.org/10.1200/JCO.2025.43.16_suppl.3009"
      }
    ]
  },
  {
    "id": 62,
    "authors": "Pfizer (2024).",
    "title": "Oncology Innovation Day: felmetatug vedotin in triple-negative breast cancer (slide 106). 2024. Sponsor presentation, slide 106.",
    "journal": "",
    "volumeYear": "",
    "links": [
      {
        "label": "https://investors.pfizer.com/files/doc_downloads/2024/02/29/Pfizer-Oncology-Innovation-Day-Presentation_FINAL.pdf",
        "href": "https://investors.pfizer.com/files/doc_downloads/2024/02/29/Pfizer-Oncology-Innovation-Day-Presentation_FINAL.pdf"
      }
    ]
  },
  {
    "id": 63,
    "authors": "Saravanan et al. (2024).",
    "title": "Expression of cell surface zinc transporter LIV1 in triple negative breast cancer is an indicator of poor prognosis and therapy failure.",
    "journal": "Journal of Cellular Physiology",
    "volumeYear": ". 2024;239(4):e31203.",
    "links": [
      {
        "label": "https://doi.org/10.1002/jcp.31203",
        "href": "https://doi.org/10.1002/jcp.31203"
      }
    ]
  },
  {
    "id": 64,
    "authors": "Peng et al. (2026).",
    "title": "SDP-LIV1, a Novel and Optimized LIV-1 Antibody-Drug Conjugate Demonstrating Superior Antitumor Efficacy and a Favorable Safety Profile for the Treatment of Solid Tumors. Mol Cancer Ther. 2026;25(2):322–332.",
    "journal": "",
    "volumeYear": "",
    "links": [
      {
        "label": "https://doi.org/10.1158/1535-7163.MCT-24-0752",
        "href": "https://www.google.com/search?q=https://doi.org/10.1158/1535-7163.MCT-24-0752"
      }
    ]
  },
  {
    "id": 65,
    "authors": "M-Rabet et al. (2017).",
    "title": "Nectin-4: a new prognostic biomarker for efficient therapeutic targeting of primary and metastatic triple-negative breast cancer.",
    "journal": "Annals of Oncology",
    "volumeYear": ". 2017;28(4):769–776.",
    "links": [
      {
        "label": "https://doi.org/10.1093/annonc/mdw678",
        "href": "https://doi.org/10.1093/annonc/mdw678"
      }
    ]
  },
  {
    "id": 66,
    "authors": "Giordano et al. (2024).",
    "title": "Enfortumab vedotin (EV) in triple-negative breast cancer (TNBC) and HR+/HER2- breast cancer (BC) cohorts of EV-202.",
    "journal": "Journal of Clinical Oncology",
    "volumeYear": ". 2024;42(16 Suppl):1005. Conference abstract.",
    "links": [
      {
        "label": "https://doi.org/10.1200/JCO.2024.42.16_suppl.1005",
        "href": "https://doi.org/10.1200/JCO.2024.42.16_suppl.1005"
      }
    ]
  },
  {
    "id": 67,
    "authors": "Zhang et al. (2025).",
    "title": "Bulumtatug Fuvedotin (BFv, 9MW2821), a next-generation Nectin-4 targeting antibody-drug conjugate, in patients with advanced solid tumors: a first-in-human, open-label, multicenter, phase I/II study.",
    "journal": "Annals of Oncology",
    "volumeYear": ". 2025;36(8):934–943.",
    "links": [
      {
        "label": "https://doi.org/10.1016/j.annonc.2025.04.009",
        "href": "https://doi.org/10.1016/j.annonc.2025.04.009"
      }
    ]
  },
  {
    "id": 68,
    "authors": "Huang et al. (2021).",
    "title": "Expression pattern and prognostic impact of glycoprotein non-metastatic B (GPNMB) in triple-negative breast cancer.",
    "journal": "Scientific Reports",
    "volumeYear": ". 2021;11(1):12171.",
    "links": [
      {
        "label": "https://doi.org/10.1038/s41598-021-91588-3",
        "href": "https://doi.org/10.1038/s41598-021-91588-3"
      }
    ]
  },
  {
    "id": 69,
    "authors": "Vahdat et al. (2021).",
    "title": "Glembatumumab vedotin for patients with metastatic, gpNMB overexpressing, triple-negative breast cancer (\"METRIC\"): a randomized multicenter study.",
    "journal": "npj Breast Cancer",
    "volumeYear": ". 2021;7(1):57.",
    "links": [
      {
        "label": "https://doi.org/10.1038/s41523-021-00244-6",
        "href": "https://doi.org/10.1038/s41523-021-00244-6"
      }
    ]
  },
  {
    "id": 70,
    "authors": "Chien et al. (2016).",
    "title": "Expression of ROR1 has prognostic significance in triple negative breast cancer.",
    "journal": "Virchows Archiv",
    "volumeYear": ". 2016;468(5):589–595.",
    "links": [
      {
        "label": "https://doi.org/10.1007/s00428-016-1911-3",
        "href": "https://doi.org/10.1007/s00428-016-1911-3"
      }
    ]
  },
  {
    "id": 71,
    "authors": "Kim et al. (2025).",
    "title": "Anti-PTK7 Monoclonal Antibodies Suppresses Oncogenic Phenotypes in Cellular and Xenograft Models of Triple-Negative Breast Cancer.",
    "journal": "Cells",
    "volumeYear": ". 2025;14(3):181.",
    "links": [
      {
        "label": "https://doi.org/10.3390/cells14030181",
        "href": "https://doi.org/10.3390/cells14030181"
      }
    ]
  },
  {
    "id": 72,
    "authors": "Maitland et al. (2021).",
    "title": "First-in-Human Study of PF-06647020 (Cofetuzumab Pelidotin), an Antibody-Drug Conjugate Targeting Protein Tyrosine Kinase 7, in Advanced Solid Tumors.",
    "journal": "Clinical Cancer Research",
    "volumeYear": ". 2021;27(16):4511–4520.",
    "links": [
      {
        "label": "https://doi.org/10.1158/1078-0432.ccr-20-3757",
        "href": "https://doi.org/10.1158/1078-0432.ccr-20-3757"
      }
    ]
  },
  {
    "id": 73,
    "authors": "Ginter et al. (2017).",
    "title": "Folate Receptor Alpha Expression Is Associated With Increased Risk of Recurrence in Triple-negative Breast Cancer.",
    "journal": "Clinical Breast Cancer",
    "volumeYear": ". 2017;17(7):544–549.",
    "links": [
      {
        "label": "https://doi.org/10.1016/j.clbc.2017.03.007",
        "href": "https://doi.org/10.1016/j.clbc.2017.03.007"
      }
    ]
  },
  {
    "id": 74,
    "authors": "Norton et al. (2020).",
    "title": "Folate receptor alpha expression associates with improved disease-free survival in triple negative breast cancer patients.",
    "journal": "npj Breast Cancer",
    "volumeYear": ". 2020;6:4.",
    "links": [
      {
        "label": "https://doi.org/10.1038/s41523-020-0147-1",
        "href": "https://doi.org/10.1038/s41523-020-0147-1"
      }
    ]
  },
  {
    "id": 75,
    "authors": "Kim et al. (2022).",
    "title": "Comparison of the Clinicopathologic Features and T-Cell Infiltration of B7-H3 and B7-H4 Expression in Triple-negative Breast Cancer Subtypes.",
    "journal": "Applied Immunohistochemistry & Molecular Morphology",
    "volumeYear": ". 2022;30(4):246–256.",
    "links": [
      {
        "label": "https://doi.org/10.1097/pai.0000000000001001",
        "href": "https://doi.org/10.1097/pai.0000000000001001"
      }
    ]
  },
  {
    "id": 76,
    "authors": "Liu et al. (2012).",
    "title": "EGFR expression correlates with decreased disease-free survival in triple-negative breast cancer: a retrospective analysis based on a tissue microarray.",
    "journal": "Medical Oncology",
    "volumeYear": ". 2012;29(2):401–405.",
    "links": [
      {
        "label": "https://doi.org/10.1007/s12032-011-9827-x",
        "href": "https://doi.org/10.1007/s12032-011-9827-x"
      }
    ]
  },
  {
    "id": 77,
    "authors": "Carey et al. (2012).",
    "title": "TBCRC 001: randomized phase II study of cetuximab in combination with carboplatin in stage IV triple-negative breast cancer.",
    "journal": "Journal of Clinical Oncology",
    "volumeYear": ". 2012;30(21):2615–2623.",
    "links": [
      {
        "label": "https://doi.org/10.1200/jco.2010.34.5579",
        "href": "https://doi.org/10.1200/jco.2010.34.5579"
      }
    ]
  },
  {
    "id": 78,
    "authors": "Higashi et al. (2023).",
    "title": "Ganglioside GD2 Expression Is Associated With Unfavorable Prognosis in Early Triple-negative Breast Cancer.",
    "journal": "Anticancer Research",
    "volumeYear": ". 2023;43(9):4045–4053.",
    "links": [
      {
        "label": "https://doi.org/10.21873/anticanres.16593",
        "href": "https://doi.org/10.21873/anticanres.16593"
      }
    ]
  },
  {
    "id": 79,
    "authors": "Almási et al. (2023).",
    "title": "The prognostic value of stem cell markers in triple-negative breast cancer.",
    "journal": "Pathology & Oncology Research",
    "volumeYear": ". 2023;29:1611365.",
    "links": [
      {
        "label": "https://doi.org/10.3389/pore.2023.1611365",
        "href": "https://doi.org/10.3389/pore.2023.1611365"
      }
    ]
  },
  {
    "id": 80,
    "authors": "Henry et al. (2015).",
    "title": "Expression of the novel Wnt receptor ROR2 is increased in breast cancer and may regulate both β-catenin dependent and independent Wnt signalling.",
    "journal": "Journal of Cancer Research and Clinical Oncology",
    "volumeYear": ". 2015;141(2):243–254.",
    "links": [
      {
        "label": "https://doi.org/10.1007/s00432-014-1824-y",
        "href": "https://doi.org/10.1007/s00432-014-1824-y"
      }
    ]
  },
  {
    "id": 81,
    "authors": "Nassar et al. (2021).",
    "title": "Syndecan-1 Promotes Angiogenesis in Triple-Negative Breast Cancer through the Prognostically Relevant Tissue Factor Pathway and Additional Angiogenic Routes.",
    "journal": "Cancers",
    "volumeYear": ". 2021;13(10):2318.",
    "links": [
      {
        "label": "https://doi.org/10.3390/cancers13102318",
        "href": "https://doi.org/10.3390/cancers13102318"
      }
    ]
  },
  {
    "id": 82,
    "authors": "Parinyanitikul et al. (2013).",
    "title": "Mesothelin expression and survival outcomes in triple receptor negative breast cancer.",
    "journal": "Clinical Breast Cancer",
    "volumeYear": ". 2013;13(5):378–384.",
    "links": [
      {
        "label": "https://doi.org/10.1016/j.clbc.2013.05.001",
        "href": "https://doi.org/10.1016/j.clbc.2013.05.001"
      }
    ]
  },
  {
    "id": 83,
    "authors": "Rugo et al. (2022).",
    "title": "GLORIA: phase III, open-label study of adagloxad simolenin/OBI-821 in patients with high-risk triple-negative breast cancer.",
    "journal": "Future Oncology",
    "volumeYear": ". 2022;18(34):3801–3813.",
    "links": [
      {
        "label": "https://doi.org/10.2217/fon-2022-0812",
        "href": "https://doi.org/10.2217/fon-2022-0812"
      }
    ]
  },
  {
    "id": 84,
    "authors": "Krop et al. (2023).",
    "title": "Patritumab Deruxtecan (HER3-DXd), a Human Epidermal Growth Factor Receptor 3-Directed Antibody-Drug Conjugate, in Patients With Previously Treated Human Epidermal Growth Factor Receptor 3-Expressing Metastatic Breast Cancer: A Multicenter, Phase I/II Trial.",
    "journal": "Journal of Clinical Oncology",
    "volumeYear": ". 2023;41(36):5550–5560.",
    "links": [
      {
        "label": "https://doi.org/10.1200/jco.23.00882",
        "href": "https://doi.org/10.1200/jco.23.00882"
      }
    ]
  },
  {
    "id": 85,
    "authors": "Zhong et al. (2023).",
    "title": "Syndecan-1 as an immunogene in Triple-negative breast cancer: regulation tumor-infiltrating lymphocyte in the tumor microenviroment and EMT by TGFb1/Smad pathway.",
    "journal": "Cancer Cell International",
    "volumeYear": ". 2023;23(1):76.",
    "links": [
      {
        "label": "https://doi.org/10.1186/s12935-023-02917-7",
        "href": "https://doi.org/10.1186/s12935-023-02917-7"
      }
    ]
  },
  {
    "id": 86,
    "authors": "Ismail et al. (2024).",
    "title": "Compartmental Syndecan-1 (CD138) expression as a novel prognostic marker in triple-negative metaplastic breast cancer.",
    "journal": "Pathology - Research and Practice",
    "volumeYear": ". 2024;253:154994.",
    "links": [
      {
        "label": "https://doi.org/10.1016/j.prp.2023.154994",
        "href": "https://doi.org/10.1016/j.prp.2023.154994"
      }
    ]
  },
  {
    "id": 87,
    "authors": "Immunomic Therapeutics (2026).",
    "title": "Immunomic Therapeutics Announces First Patient Dosed in Phase 1 Trial of Cancer Vaccine Candidate ITI-5000. 2026. Sponsor announcement.",
    "journal": "",
    "volumeYear": "",
    "links": [
      {
        "label": "https://immunomix.com/immunomic-therapeutics-announces-first-patient-dosed-in-phase-1-trial-of-cancer-vaccine-candidate-iti-5000/",
        "href": "https://immunomix.com/immunomic-therapeutics-announces-first-patient-dosed-in-phase-1-trial-of-cancer-vaccine-candidate-iti-5000/"
      }
    ]
  },
  {
    "id": 88,
    "authors": "Gampenrieder et al. (2023).",
    "title": "Influence of HER2 expression on prognosis in metastatic triple-negative breast cancer-results from an international, multicenter analysis coordinated by the AGMT Study Group.",
    "journal": "ESMO Open",
    "volumeYear": ". 2023;8(1):100747.",
    "links": [
      {
        "label": "https://doi.org/10.1016/j.esmoop.2022.100747",
        "href": "https://doi.org/10.1016/j.esmoop.2022.100747"
      }
    ]
  },
  {
    "id": 89,
    "authors": "Zhang et al. (2014).",
    "title": "Prognostic value of survivin and EGFR protein expression in triple-negative breast cancer (TNBC) patients.",
    "journal": "Targeted Oncology",
    "volumeYear": ". 2014;9(4):349–357.",
    "links": [
      {
        "label": "https://doi.org/10.1007/s11523-013-0300-y",
        "href": "https://doi.org/10.1007/s11523-013-0300-y"
      }
    ]
  },
  {
    "id": 90,
    "authors": "Li et al. (2019).",
    "title": "Association of p53 expression with poor prognosis in patients with triple-negative breast invasive ductal carcinoma.",
    "journal": "Medicine",
    "volumeYear": ". 2019;98(18):e15449.",
    "links": [
      {
        "label": "https://doi.org/10.1097/md.0000000000015449",
        "href": "https://doi.org/10.1097/md.0000000000015449"
      }
    ]
  },
  {
    "id": 91,
    "authors": "Hamilton et al. (2016).",
    "title": "Brachyury, a vaccine target, is overexpressed in triple-negative breast cancer.",
    "journal": "Endocrine-Related Cancer",
    "volumeYear": ". 2016;23(10):783–796.",
    "links": [
      {
        "label": "https://doi.org/10.1530/erc-16-0037",
        "href": "https://doi.org/10.1530/erc-16-0037"
      }
    ]
  },
  {
    "id": 92,
    "authors": "Marcinkowski et al. (2019).",
    "title": "Cancer targeting by TCR gene-engineered T cells directed against Kita-Kyushu Lung Cancer Antigen-1.",
    "journal": "Journal for ImmunoTherapy of Cancer",
    "volumeYear": ". 2019;7(1):229.",
    "links": [
      {
        "label": "https://doi.org/10.1186/s40425-019-0678-x",
        "href": "https://doi.org/10.1186/s40425-019-0678-x"
      }
    ]
  },
  {
    "id": 93,
    "authors": "Chen et al. (2014).",
    "title": "XBP1 promotes triple-negative breast cancer by controlling the HIF1α pathway.",
    "journal": "Nature",
    "volumeYear": ". 2014;508(7494):103–107.",
    "links": [
      {
        "label": "https://doi.org/10.1038/nature13119",
        "href": "https://doi.org/10.1038/nature13119"
      }
    ]
  },
  {
    "id": 94,
    "authors": "Guzelis et al. (2025).",
    "title": "Does SOX-2 expression have a prognostic value in triple-negative breast cancer?.",
    "journal": "Polish Journal of Pathology",
    "volumeYear": ". 2025;76(1):1–9.",
    "links": [
      {
        "label": "https://doi.org/10.5114/pjp.2025.149426",
        "href": "https://doi.org/10.5114/pjp.2025.149426"
      }
    ]
  },
  {
    "id": 95,
    "authors": "Schmitz et al. (2007).",
    "title": "Identification of SOX2 as a novel glioma-associated antigen and potential target for T cell-based immunotherapy.",
    "journal": "British Journal of Cancer",
    "volumeYear": ". 2007;96(8):1293–1301.",
    "links": [
      {
        "label": "https://doi.org/10.1038/sj.bjc.6603696",
        "href": "https://doi.org/10.1038/sj.bjc.6603696"
      }
    ]
  },
  {
    "id": 96,
    "authors": "Mayr et al. (2006).",
    "title": "MDM2 is recognized as a tumor-associated antigen in chronic lymphocytic leukemia by CD8+ autologous T lymphocytes.",
    "journal": "Experimental Hematology",
    "volumeYear": ". 2006;34(1):44–53.",
    "links": [
      {
        "label": "https://doi.org/10.1016/j.exphem.2005.09.016",
        "href": "https://doi.org/10.1016/j.exphem.2005.09.016"
      }
    ]
  },
  {
    "id": 97,
    "authors": "Palena et al. (2014).",
    "title": "Overexpression of the EMT driver brachyury in breast carcinomas: association with poor prognosis.",
    "journal": "Journal of the National Cancer Institute",
    "volumeYear": ". 2014;106(5):dju054.",
    "links": [
      {
        "label": "https://doi.org/10.1093/jnci/dju054",
        "href": "https://doi.org/10.1093/jnci/dju054"
      }
    ]
  },
  {
    "id": 98,
    "authors": "Chung et al. (2019).",
    "title": "Evaluation of safety and efficacy of p53MVA vaccine combined with pembrolizumab in patients with advanced solid cancers.",
    "journal": "Clinical and Translational Oncology",
    "volumeYear": ". 2019;21(3):363–372.",
    "links": [
      {
        "label": "https://doi.org/10.1007/s12094-018-1932-2",
        "href": "https://doi.org/10.1007/s12094-018-1932-2"
      }
    ]
  },
  {
    "id": 99,
    "authors": "Isakoff et al. (2020).",
    "title": "Abstract P3-09-15: A phase 1b study of PVX-410 (PVX) vaccine plus durvalumab (DUR) as adjuvant therapy in HLA-A2+ early stage triple negative breast cancer (eTNBC) to assess safety and immune response.",
    "journal": "Cancer Research",
    "volumeYear": ". 2020;80(4 Suppl):P3-09-15. Conference abstract.",
    "links": [
      {
        "label": "https://doi.org/10.1158/1538-7445.SABCS19-P3-09-15",
        "href": "https://doi.org/10.1158/1538-7445.SABCS19-P3-09-15"
      }
    ]
  },
  {
    "id": 100,
    "authors": "ClinicalTrials.gov (n.d.-a).",
    "title": "NCT04504916. Zilovertamab vedotin in advanced solid tumors, including TNBC.",
    "journal": "ClinicalTrials.gov",
    "volumeYear": ". n.d. Clinical trial registration.",
    "links": [
      {
        "label": "https://clinicaltrials.gov/study/NCT04504916",
        "href": "https://clinicaltrials.gov/study/NCT04504916"
      }
    ]
  },
  {
    "id": 101,
    "authors": "ClinicalTrials.gov (n.d.-b).",
    "title": "NCT02593227. Folate receptor alpha peptide vaccine in TNBC.",
    "journal": "ClinicalTrials.gov",
    "volumeYear": ". n.d. Clinical trial registration.",
    "links": [
      {
        "label": "https://clinicaltrials.gov/study/NCT02593227",
        "href": "https://clinicaltrials.gov/study/NCT02593227"
      }
    ]
  },
  {
    "id": 102,
    "authors": "ClinicalTrials.gov (n.d.-c).",
    "title": "NCT03729596. MGC018, a B7-H3-directed ADC, in advanced solid tumors.",
    "journal": "ClinicalTrials.gov",
    "volumeYear": ". n.d. Clinical trial registration.",
    "links": [
      {
        "label": "https://clinicaltrials.gov/study/NCT03729596",
        "href": "https://clinicaltrials.gov/study/NCT03729596"
      }
    ]
  },
  {
    "id": 103,
    "authors": "ClinicalTrials.gov (n.d.-d).",
    "title": "NCT02938442. P10s-PADRE carbohydrate-mimetic vaccine in TNBC.",
    "journal": "ClinicalTrials.gov",
    "volumeYear": ". n.d. Clinical trial registration.",
    "links": [
      {
        "label": "https://clinicaltrials.gov/study/NCT02938442",
        "href": "https://clinicaltrials.gov/study/NCT02938442"
      }
    ]
  },
  {
    "id": 104,
    "authors": "ClinicalTrials.gov (n.d.-e).",
    "title": "NCT04596150. CX-2009 in advanced breast cancer, including TNBC treatment arms.",
    "journal": "ClinicalTrials.gov",
    "volumeYear": ". n.d. Clinical trial registration.",
    "links": [
      {
        "label": "https://clinicaltrials.gov/study/NCT04596150",
        "href": "https://clinicaltrials.gov/study/NCT04596150"
      }
    ]
  },
  {
    "id": 105,
    "authors": "ClinicalTrials.gov (n.d.-f).",
    "title": "NCT03504488. BA3021, a ROR2-directed ADC, including TNBC expansion.",
    "journal": "ClinicalTrials.gov",
    "volumeYear": ". n.d. Clinical trial registration.",
    "links": [
      {
        "label": "https://clinicaltrials.gov/study/NCT03504488",
        "href": "https://clinicaltrials.gov/study/NCT03504488"
      }
    ]
  },
  {
    "id": 106,
    "authors": "ClinicalTrials.gov (n.d.-g).",
    "title": "NCT04925284. XB002, a tissue-factor-directed ADC.",
    "journal": "ClinicalTrials.gov",
    "volumeYear": ". n.d. Clinical trial registration.",
    "links": [
      {
        "label": "https://clinicaltrials.gov/study/NCT04925284",
        "href": "https://clinicaltrials.gov/study/NCT04925284"
      }
    ]
  },
  {
    "id": 107,
    "authors": "ClinicalTrials.gov (n.d.-h).",
    "title": "NCT04659603. Tusamitamab ravtansine in CEACAM5-positive advanced tumors.",
    "journal": "ClinicalTrials.gov",
    "volumeYear": ". n.d. Clinical trial registration.",
    "links": [
      {
        "label": "https://clinicaltrials.gov/study/NCT04659603",
        "href": "https://clinicaltrials.gov/study/NCT04659603"
      }
    ]
  },
  {
    "id": 108,
    "authors": "ClinicalTrials.gov (n.d.-i).",
    "title": "NCT02984683. SAR566658 in CA6-positive metastatic TNBC.",
    "journal": "ClinicalTrials.gov",
    "volumeYear": ". n.d. Clinical trial registration.",
    "links": [
      {
        "label": "https://clinicaltrials.gov/study/NCT02984683",
        "href": "https://clinicaltrials.gov/study/NCT02984683"
      }
    ]
  },
  {
    "id": 109,
    "authors": "ClinicalTrials.gov (n.d.-j).",
    "title": "NCT05623488. HuCART-meso cells in mesothelin-expressing advanced TNBC.",
    "journal": "ClinicalTrials.gov",
    "volumeYear": ". n.d. Clinical trial registration.",
    "links": [
      {
        "label": "https://clinicaltrials.gov/study/NCT05623488",
        "href": "https://clinicaltrials.gov/study/NCT05623488"
      }
    ]
  },
  {
    "id": 110,
    "authors": "ClinicalTrials.gov (n.d.-k).",
    "title": "NCT00986609. MUC1 peptide vaccine in TNBC.",
    "journal": "ClinicalTrials.gov",
    "volumeYear": ". n.d. Clinical trial registration.",
    "links": [
      {
        "label": "https://clinicaltrials.gov/study/NCT00986609",
        "href": "https://clinicaltrials.gov/study/NCT00986609"
      }
    ]
  },
  {
    "id": 111,
    "authors": "ClinicalTrials.gov (n.d.-l).",
    "title": "NCT04674306. Alpha-lactalbumin vaccine in TNBC.",
    "journal": "ClinicalTrials.gov",
    "volumeYear": ". n.d. Clinical trial registration.",
    "links": [
      {
        "label": "https://clinicaltrials.gov/study/NCT04674306",
        "href": "https://clinicaltrials.gov/study/NCT04674306"
      }
    ]
  },
  {
    "id": 112,
    "authors": "ClinicalTrials.gov (n.d.-m).",
    "title": "NCT05455658. STEMVAC in early-stage TNBC.",
    "journal": "ClinicalTrials.gov",
    "volumeYear": ". n.d. Clinical trial registration.",
    "links": [
      {
        "label": "https://clinicaltrials.gov/study/NCT05455658",
        "href": "https://clinicaltrials.gov/study/NCT05455658"
      }
    ]
  },
  {
    "id": 113,
    "authors": "ClinicalTrials.gov (n.d.-n).",
    "title": "NCT04024800. AE37, a HER2-derived vaccine, in advanced TNBC.",
    "journal": "ClinicalTrials.gov",
    "volumeYear": ". n.d. Clinical trial registration.",
    "links": [
      {
        "label": "https://clinicaltrials.gov/study/NCT04024800",
        "href": "https://clinicaltrials.gov/study/NCT04024800"
      }
    ]
  },
  {
    "id": 114,
    "authors": "ClinicalTrials.gov (n.d.-o).",
    "title": "NCT04064359. OBT076, a CD205-directed ADC, with eligibility including TNBC.",
    "journal": "ClinicalTrials.gov",
    "volumeYear": ". n.d. Clinical trial registration.",
    "links": [
      {
        "label": "https://clinicaltrials.gov/study/NCT04064359",
        "href": "https://clinicaltrials.gov/study/NCT04064359"
      }
    ]
  },
  {
    "id": 115,
    "authors": "ClinicalTrials.gov (n.d.-p).",
    "title": "NCT03387085. NANT multi-antigen vaccine regimen in TNBC.",
    "journal": "ClinicalTrials.gov",
    "volumeYear": ". n.d. Clinical trial registration.",
    "links": [
      {
        "label": "https://clinicaltrials.gov/study/NCT03387085",
        "href": "https://clinicaltrials.gov/study/NCT03387085"
      }
    ]
  },
  {
    "id": 116,
    "authors": "ClinicalTrials.gov (n.d.-q).",
    "title": "NCT04296942. BrEAsT trial, including a TNBC arm with a brachyury vaccine.",
    "journal": "ClinicalTrials.gov",
    "volumeYear": ". n.d. Clinical trial registration.",
    "links": [
      {
        "label": "https://clinicaltrials.gov/study/NCT04296942",
        "href": "https://clinicaltrials.gov/study/NCT04296942"
      }
    ]
  },
  {
    "id": 117,
    "authors": "Bechmann et al. (2020).",
    "title": "Heterogeneity of CEACAM5 in breast cancer.",
    "journal": "Oncotarget",
    "volumeYear": ". 2020;11(43):3886–3899.",
    "links": [
      {
        "label": "https://doi.org/10.18632/oncotarget.27778",
        "href": "https://doi.org/10.18632/oncotarget.27778"
      }
    ]
  },
  {
    "id": 118,
    "authors": "Powell et al. (2018).",
    "title": "A functional genomic screen in vivo identifies CEACAM5 as a clinically relevant driver of breast cancer metastasis.",
    "journal": "npj Breast Cancer",
    "volumeYear": ". 2018;4:9.",
    "links": [
      {
        "label": "https://doi.org/10.1038/s41523-018-0062-x",
        "href": "https://doi.org/10.1038/s41523-018-0062-x"
      }
    ]
  },
  {
    "id": 119,
    "authors": "Siroy et al. (2013).",
    "title": "MUC1 is expressed at high frequency in early-stage basal-like triple-negative breast cancer.",
    "journal": "Human Pathology",
    "volumeYear": ". 2013;44(10):2159–2166.",
    "links": [
      {
        "label": "https://doi.org/10.1016/j.humpath.2013.04.010",
        "href": "https://doi.org/10.1016/j.humpath.2013.04.010"
      }
    ]
  },
  {
    "id": 120,
    "authors": "Hutchins et al. (2017).",
    "title": "Targeting tumor-associated carbohydrate antigens: a phase I study of a carbohydrate mimetic-peptide vaccine in stage IV breast cancer subjects.",
    "journal": "Oncotarget",
    "volumeYear": ". 2017;8(58):99161–99178.",
    "links": [
      {
        "label": "https://doi.org/10.18632/oncotarget.21959",
        "href": "https://doi.org/10.18632/oncotarget.21959"
      }
    ]
  },
  {
    "id": 121,
    "authors": "Lin et al. (2022).",
    "title": "CTPS1 promotes malignant progression of triple-negative breast cancer with transcriptional activation by YBX1.",
    "journal": "Journal of Translational Medicine",
    "volumeYear": ". 2022;20(1):17.",
    "links": [
      {
        "label": "https://doi.org/10.1186/s12967-021-03206-5",
        "href": "https://doi.org/10.1186/s12967-021-03206-5"
      }
    ]
  },
  {
    "id": 122,
    "authors": "Ribeiro et al. (2018).",
    "title": "SRC inhibition prevents P-cadherin mediated signaling and function in basal-like breast cancer cells.",
    "journal": "Cell Communication and Signaling",
    "volumeYear": ". 2018;16(1):75.",
    "links": [
      {
        "label": "https://doi.org/10.1186/s12964-018-0286-2",
        "href": "https://doi.org/10.1186/s12964-018-0286-2"
      }
    ]
  },
  {
    "id": 123,
    "authors": "Human Protein Atlas (n.d.-b).",
    "title": "LY75 normal single-cell expression. n.d. Database entry.",
    "journal": "",
    "volumeYear": "",
    "links": [
      {
        "label": "https://www.proteinatlas.org/ENSG00000054219-LY75/single%2Bcell",
        "href": "https://www.proteinatlas.org/ENSG00000054219-LY75/single%2Bcell"
      }
    ]
  },
  {
    "id": 124,
    "authors": "Human Protein Atlas (n.d.-c).",
    "title": "ENG protein expression in normal endothelial cells and placental trophoblasts. n.d. Database entry.",
    "journal": "",
    "volumeYear": "",
    "links": [
      {
        "label": "https://www.proteinatlas.org/ENSG00000106991-ENG",
        "href": "https://www.proteinatlas.org/ENSG00000106991-ENG"
      }
    ]
  },
  {
    "id": 125,
    "authors": "Ohtake et al. (2014).",
    "title": "Identification of novel helper epitope peptides of Survivin cancer-associated antigen applicable to developing helper/killer-hybrid epitope long peptide cancer vaccine.",
    "journal": "Immunology Letters",
    "volumeYear": ". 2014;161(1):20–30.",
    "links": [
      {
        "label": "https://doi.org/10.1016/j.imlet.2014.04.010",
        "href": "https://doi.org/10.1016/j.imlet.2014.04.010"
      }
    ]
  },
  {
    "id": 126,
    "authors": "Tuohy et al. (2016).",
    "title": "Targeted Vaccination against Human α-Lactalbumin for Immunotherapy and Primary Immunoprevention of Triple Negative Breast Cancer.",
    "journal": "Cancers",
    "volumeYear": ". 2016;8(6):E56.",
    "links": [
      {
        "label": "https://doi.org/10.3390/cancers8060056",
        "href": "https://doi.org/10.3390/cancers8060056"
      }
    ]
  },
  {
    "id": 127,
    "authors": "Human Protein Atlas (n.d.-d).",
    "title": "SLAMF7 protein expression and immune-cell function. n.d. Database entry.",
    "journal": "",
    "volumeYear": "",
    "links": [
      {
        "label": "https://www.proteinatlas.org/ENSG00000026751-SLAMF7",
        "href": "https://www.proteinatlas.org/ENSG00000026751-SLAMF7"
      }
    ]
  },
  {
    "id": 128,
    "authors": "NCI (n.d.).",
    "title": "National Cancer Institute. Alpha-lactalbumin breast cancer vaccine: TNBC expression and normal lactation-associated expression. n.d. Drug dictionary entry.",
    "journal": "",
    "volumeYear": "",
    "links": [
      {
        "label": "https://www.cancer.gov/publications/dictionaries/cancer-drug/def/alpha-lactalbumin-breast-cancer-vaccine",
        "href": "https://www.cancer.gov/publications/dictionaries/cancer-drug/def/alpha-lactalbumin-breast-cancer-vaccine"
      }
    ]
  },
  {
    "id": 129,
    "authors": "Ogden et al. (2020).",
    "title": "Combined HER3-EGFR score in triple-negative breast cancer provides prognostic and predictive significance superior to individual biomarkers.",
    "journal": "Scientific Reports",
    "volumeYear": ". 2020;10(1):3009.",
    "links": [
      {
        "label": "https://doi.org/10.1038/s41598-020-59514-1",
        "href": "https://doi.org/10.1038/s41598-020-59514-1"
      }
    ]
  },
  {
    "id": 130,
    "authors": "Merlino et al. (2019).",
    "title": "MEN1309/OBT076, a First-In-Class Antibody-Drug Conjugate Targeting CD205 in Solid Tumors.",
    "journal": "Molecular Cancer Therapeutics",
    "volumeYear": ". 2019;18(9):1533–1543.",
    "links": [
      {
        "label": "https://doi.org/10.1158/1535-7163.mct-18-0624",
        "href": "https://doi.org/10.1158/1535-7163.mct-18-0624"
      }
    ]
  },
  {
    "id": 131,
    "authors": "Zhao et al. (2011).",
    "title": "Expression of Human Endogenous Retrovirus Type K Envelope Protein is a Novel Candidate Prognostic Marker for Human Breast Cancer.",
    "journal": "Genes & Cancer",
    "volumeYear": ". 2011;2(9):914–922.",
    "links": [
      {
        "label": "https://doi.org/10.1177/1947601911431841",
        "href": "https://doi.org/10.1177/1947601911431841"
      }
    ]
  },
  {
    "id": 132,
    "authors": "Amatya et al. (2021).",
    "title": "Development of CAR T Cells Expressing a Suicide Gene Plus a Chimeric Antigen Receptor Targeting Signaling Lymphocytic-Activation Molecule F7.",
    "journal": "Molecular Therapy",
    "volumeYear": ". 2021;29(2):702–717.",
    "links": [
      {
        "label": "https://doi.org/10.1016/j.ymthe.2020.10.008",
        "href": "https://doi.org/10.1016/j.ymthe.2020.10.008"
      }
    ]
  },
  {
    "id": 133,
    "authors": "Turbin et al. (2006).",
    "title": "MDM2 protein expression is a negative prognostic marker in breast carcinoma.",
    "journal": "Modern Pathology",
    "volumeYear": ". 2006;19(1):69–74.",
    "links": [
      {
        "label": "https://doi.org/10.1038/modpathol.3800484",
        "href": "https://doi.org/10.1038/modpathol.3800484"
      }
    ]
  },
  {
    "id": 134,
    "authors": "Rau et al. (2012).",
    "title": "Neovascularization evaluated by CD105 correlates well with prognostic factors in breast cancers.",
    "journal": "Experimental and Therapeutic Medicine",
    "volumeYear": ". 2012;4(2):231–236.",
    "links": [
      {
        "label": "https://doi.org/10.3892/etm.2012.594",
        "href": "https://doi.org/10.3892/etm.2012.594"
      }
    ]
  },
  {
    "id": 135,
    "authors": "Human Protein Atlas (n.d.-e).",
    "title": "BIRC5 tissue expression. n.d. Database entry.",
    "journal": "",
    "volumeYear": "",
    "links": [
      {
        "label": "https://www.proteinatlas.org/ENSG00000089685-BIRC5/tissue",
        "href": "https://www.proteinatlas.org/ENSG00000089685-BIRC5/tissue"
      }
    ]
  },
  {
    "id": 136,
    "authors": "Lv et al. (2021).",
    "title": "Elevated mRNA Level of Y-Box Binding Protein 1 Indicates Unfavorable Prognosis Correlated with Macrophage Infiltration and T Cell Exhaustion in Luminal Breast Cancer.",
    "journal": "Cancer Management and Research",
    "volumeYear": ". 2021;13:6411–6428.",
    "links": [
      {
        "label": "https://doi.org/10.2147/cmar.s311650",
        "href": "https://doi.org/10.2147/cmar.s311650"
      }
    ]
  },
  {
    "id": 137,
    "authors": "Benzekry, S., Lamont, C., Beheshti, A. et al. (2014).",
    "title": "Classical Mathematical Models for Description and Prediction of Experimental Tumor Growth.",
    "journal": "PLoS Computational Biology",
    "volumeYear": ". 2014;10:e1003800. https://doi.org/10.1371/journal.pcbi.1003800",
    "links": []
  },
  {
    "id": 138,
    "authors": "Wesselhoeft, R.A., Kowalski, P.S. and Anderson, D.G. (2018).",
    "title": "Engineering circular RNA for potent and stable translation in eukaryotic cells.",
    "journal": "Nature Communications",
    "volumeYear": ". 2018;9:2629. https://doi.org/10.1038/s41467-018-05096-6",
    "links": []
  },
  {
    "id": 139,
    "authors": "Chen, J., Ye, Z., Huang, C. et al. (2022).",
    "title": "Lipid nanoparticle-mediated lymph node-targeting delivery of mRNA cancer vaccine elicits robust CD8+ T cell response.",
    "journal": "PNAS",
    "volumeYear": ". 2022;119:e2207841119. https://doi.org/10.1073/pnas.2207841119",
    "links": []
  },
  {
    "id": 140,
    "authors": "Wesselhoeft, R.A., Kowalski, P.S., Parker-Hale, F.C., Huang, Y., Bisaria, N. and Anderson, D.G. (2019).",
    "title": "RNA circularization diminishes immunogenicity and can extend translation duration in vivo.",
    "journal": "Molecular Cell",
    "volumeYear": ". 2019;74:508-520.e4. https://doi.org/10.1016/j.molcel.2019.02.015",
    "links": []
  },
  {
    "id": 141,
    "authors": "Chen, Y.G. et al. (2017).",
    "title": "Sensing Self and Foreign Circular RNAs by Intron Identity.",
    "journal": "Molecular Cell",
    "volumeYear": ". 2017;67:228-238.e5. https://doi.org/10.1016/j.molcel.2017.05.022",
    "links": []
  },
  {
    "id": 142,
    "authors": "Kubara, K., Yamazaki, K., Miyazaki, T. et al. (2024).",
    "title": "Lymph node macrophages drive innate immune responses to enhance the anti-tumor efficacy of mRNA vaccines.",
    "journal": "Molecular Therapy",
    "volumeYear": ". 2024;32:704-721. https://doi.org/10.1016/j.ymthe.2024.01.020",
    "links": []
  },
  {
    "id": 143,
    "authors": "de Pillis, L.G., Radunskaya, A.E. and Wiseman, C.L. (2005).",
    "title": "A validated mathematical model of cell-mediated immune response to tumor growth.",
    "journal": "Cancer Research",
    "volumeYear": ". 2005;65:7950-7958. https://doi.org/10.1158/0008-5472.CAN-05-0564",
    "links": []
  },
  {
    "id": 144,
    "authors": "Ndeupen, S., Qin, Z., Jacobsen, S. et al. (2021).",
    "title": "The mRNA-LNP platform's lipid nanoparticle component used in preclinical vaccine studies is highly inflammatory.",
    "journal": "iScience",
    "volumeYear": ". 2021;24:103479. https://doi.org/10.1016/j.isci.2021.103479",
    "links": []
  },
  {
    "id": 145,
    "authors": "Meric-Bernstam, F., Lloyd, M.W., Koc, S. et al. (2024).",
    "title": "Assessment of Patient-Derived Xenograft Growth and Antitumor Activity: The NCI PDXNet Consensus Recommendations.",
    "journal": "Molecular Cancer Therapeutics",
    "volumeYear": ". 2024;23:924-938. https://doi.org/10.1158/1535-7163.MCT-23-0471",
    "links": []
  },
  {
    "id": 146,
    "authors": "Zhou, X., Liu, S., Kim, E.S., Herbst, R.S. and Lee, J.J. (2008).",
    "title": "‘Bayesian adaptive design for targeted therapy development in lung cancer: a step toward personalized medicine’.",
    "journal": "Clinical Trials",
    "volumeYear": ", 5, 181–193. https://doi.org/10.1177/1740774508091815. Note: Background for the decision framework; it does not prescribe this project’s 0.80 threshold.",
    "links": []
  },
  {
    "id": 147,
    "authors": "OECD (2025).",
    "title": "",
    "journal": "Test No. 456: H295R Steroidogenesis Assay",
    "volumeYear": ". 2025 edition. https://doi.org/10.1787/9789264122642-en. Note: Viability requirements for a specific in-vitro assay cannot be transferred into animal safety limits for this product.",
    "links": []
  },
  {
    "id": 148,
    "authors": "ICH (1994).",
    "title": "",
    "journal": "S3A Note for Guidance on Toxicokinetics",
    "volumeYear": ". Guideline. Note: Supports exposure assessment, not product-specific organ-safety thresholds.",
    "links": []
  },
  {
    "id": 149,
    "authors": "Jansen, M.J.W. (1999).",
    "title": "Analysis of variance designs for model output.",
    "journal": "Computer Physics Communications",
    "volumeYear": ". 1999;117:35-43. https://doi.org/10.1016/S0010-4655(98)00154-4",
    "links": []
  },
  {
    "id": 150,
    "authors": "Talts, S., Betancourt, M., Simpson, D., Vehtari, A. and Gelman, A. (2018).",
    "title": "‘Validating Bayesian Inference Algorithms with Simulation-Based Calibration’. arXiv preprint, arXiv:1804.06788.",
    "journal": "",
    "volumeYear": "",
    "links": []
  },
  {
    "id": 151,
    "authors": "Le Blanc (2015).",
    "title": "Towards integration at last? The sustainable development goals as a network of targets. Sustainable Development, 23(3), 176-187.",
    "journal": "",
    "volumeYear": "",
    "links": []
  },
  {
    "id": 152,
    "authors": "United Nations (2015).",
    "title": "Transforming our world: the 2030 Agenda for Sustainable Development. A/RES/70/1.",
    "journal": "",
    "volumeYear": "",
    "links": []
  },
  {
    "id": 153,
    "authors": "Nilsson et al. (2016).",
    "title": "Policy: Map the interactions between Sustainable Development Goals. Nature, 534(7607), 320-322.",
    "journal": "",
    "volumeYear": "",
    "links": []
  },
  {
    "id": 154,
    "authors": "Pradhan et al. (2017).",
    "title": "A systematic study of Sustainable Development Goal (SDG) interactions. Earth's Future, 5(11), 1169–1179. https://doi.org/10.1002/2017EF000632.",
    "journal": "",
    "volumeYear": "",
    "links": []
  },
  {
    "id": 155,
    "authors": "Zhou and Moinuddin (2017).",
    "title": "Sustainable Development Goals Interlinkages and Network Analysis: A practical tool for SDG integration and policy coherence. Institute for Global Environmental Strategies (IGES).",
    "journal": "",
    "volumeYear": "",
    "links": []
  },
  {
    "id": 156,
    "authors": "Lusseau and Mancini (2019).",
    "title": "Income-based variation in Sustainable Development Goal interaction networks. Nature Sustainability, 2(3), 242-247.",
    "journal": "",
    "volumeYear": "",
    "links": []
  },
  {
    "id": 157,
    "authors": "Dawes (2022).",
    "title": "SDG interlinkage networks: Analysis, robustness, sensitivities, and hierarchies. World Development, 149, 105693.",
    "journal": "",
    "volumeYear": "",
    "links": []
  },
  {
    "id": 158,
    "authors": "Bennich et al. (2023).",
    "title": "The SDG interdependence challenge: Mapping the relationship between science and policy. Sustainability Science, 18, 1-19.",
    "journal": "",
    "volumeYear": "",
    "links": []
  }
];

export const modelReferenceLabels = [
  {
    "id": 1,
    "name": "Bray et al.",
    "year": "2024"
  },
  {
    "id": 2,
    "name": "Bianchini et al.",
    "year": "2022"
  },
  {
    "id": 3,
    "name": "Garrido-Castro et al.",
    "year": "2019"
  },
  {
    "id": 4,
    "name": "Karaayvaz et al.",
    "year": "2018"
  },
  {
    "id": 5,
    "name": "Keren et al.",
    "year": "2018"
  },
  {
    "id": 6,
    "name": "Wesselhoeft et al.",
    "year": "2019"
  },
  {
    "id": 7,
    "name": "Cheever et al.",
    "year": "2009"
  },
  {
    "id": 8,
    "name": "Asleh et al.",
    "year": "2022"
  },
  {
    "id": 9,
    "name": "Gong et al.",
    "year": "2021"
  },
  {
    "id": 10,
    "name": "Ritchie et al.",
    "year": "2015"
  },
  {
    "id": 11,
    "name": "Benjamini and Hochberg",
    "year": "1995"
  },
  {
    "id": 12,
    "name": "Lazar et al.",
    "year": "2016"
  },
  {
    "id": 13,
    "name": "Wu et al.",
    "year": "2021"
  },
  {
    "id": 14,
    "name": "Hafemeister and Satija",
    "year": "2019"
  },
  {
    "id": 15,
    "name": "Korsunsky et al.",
    "year": "2019"
  },
  {
    "id": 16,
    "name": "Robinson et al.",
    "year": "2010"
  },
  {
    "id": 17,
    "name": "Crowell et al.",
    "year": "2020"
  },
  {
    "id": 18,
    "name": "Cerami et al.",
    "year": "2012"
  },
  {
    "id": 19,
    "name": "Gao et al.",
    "year": "2013"
  },
  {
    "id": 20,
    "name": "cBioPortal",
    "year": "n.d."
  },
  {
    "id": 21,
    "name": "Tang et al.",
    "year": "2018"
  },
  {
    "id": 22,
    "name": "Izci et al.",
    "year": "2022"
  },
  {
    "id": 23,
    "name": "Jeon et al.",
    "year": "2022"
  },
  {
    "id": 24,
    "name": "Wang et al.",
    "year": "2018"
  },
  {
    "id": 25,
    "name": "Gruosso et al.",
    "year": "2019"
  },
  {
    "id": 26,
    "name": "Wescott et al.",
    "year": "2024"
  },
  {
    "id": 27,
    "name": "Zeindler et al.",
    "year": "2019"
  },
  {
    "id": 28,
    "name": "Sussman et al.",
    "year": "2014"
  },
  {
    "id": 29,
    "name": "Creary et al.",
    "year": "2021"
  },
  {
    "id": 30,
    "name": "Wesselhoeft et al.",
    "year": "2018"
  },
  {
    "id": 31,
    "name": "Yan et al.",
    "year": "2024"
  },
  {
    "id": 32,
    "name": "Reynisson et al.",
    "year": "2020"
  },
  {
    "id": 33,
    "name": "Peters et al.",
    "year": "2003"
  },
  {
    "id": 34,
    "name": "Tenzer et al.",
    "year": "2005"
  },
  {
    "id": 35,
    "name": "Calis et al.",
    "year": "2013"
  },
  {
    "id": 36,
    "name": "UniProt Consortium",
    "year": "2025"
  },
  {
    "id": 37,
    "name": "Abramson et al.",
    "year": "2024"
  },
  {
    "id": 38,
    "name": "Saper et al.",
    "year": "1991"
  },
  {
    "id": 39,
    "name": "Schrödinger",
    "year": "n.d."
  },
  {
    "id": 40,
    "name": "iGEM Foundation",
    "year": "2026"
  },
  {
    "id": 41,
    "name": "Saravanan et al.",
    "year": "2022"
  },
  {
    "id": 42,
    "name": "Althobiti et al.",
    "year": "2021"
  },
  {
    "id": 43,
    "name": "Jaccard et al.",
    "year": "1912"
  },
  {
    "id": 44,
    "name": "Slieker et al.",
    "year": "2024"
  },
  {
    "id": 45,
    "name": "IEDB",
    "year": "2024"
  },
  {
    "id": 46,
    "name": "Rapoport",
    "year": "2007"
  },
  {
    "id": 47,
    "name": "Madden",
    "year": "1995"
  },
  {
    "id": 48,
    "name": "Bouvier and Wiley",
    "year": "1994"
  },
  {
    "id": 49,
    "name": "Falk et al.",
    "year": "1991"
  },
  {
    "id": 50,
    "name": "Lee and Richards",
    "year": "1971"
  },
  {
    "id": 51,
    "name": "Dolinsky et al.",
    "year": "2007"
  },
  {
    "id": 52,
    "name": "Olsson et al.",
    "year": "2011"
  },
  {
    "id": 53,
    "name": "Motmaen et al.",
    "year": "2023"
  },
  {
    "id": 54,
    "name": "Abualrous et al.",
    "year": "2015"
  },
  {
    "id": 55,
    "name": "Harndahl et al.",
    "year": "2012"
  },
  {
    "id": 56,
    "name": "Zahraei et al.",
    "year": "2025"
  },
  {
    "id": 57,
    "name": "Human Protein Atlas",
    "year": "n.d.-a"
  },
  {
    "id": 58,
    "name": "Li et al.",
    "year": "2025"
  },
  {
    "id": 59,
    "name": "FDA",
    "year": "2026"
  },
  {
    "id": 60,
    "name": "Bardia et al.",
    "year": "2021"
  },
  {
    "id": 61,
    "name": "Hamilton et al.",
    "year": "2025"
  },
  {
    "id": 62,
    "name": "Pfizer",
    "year": "2024"
  },
  {
    "id": 63,
    "name": "Saravanan et al.",
    "year": "2024"
  },
  {
    "id": 64,
    "name": "Peng et al.",
    "year": "2026"
  },
  {
    "id": 65,
    "name": "M-Rabet et al.",
    "year": "2017"
  },
  {
    "id": 66,
    "name": "Giordano et al.",
    "year": "2024"
  },
  {
    "id": 67,
    "name": "Zhang et al.",
    "year": "2025"
  },
  {
    "id": 68,
    "name": "Huang et al.",
    "year": "2021"
  },
  {
    "id": 69,
    "name": "Vahdat et al.",
    "year": "2021"
  },
  {
    "id": 70,
    "name": "Chien et al.",
    "year": "2016"
  },
  {
    "id": 71,
    "name": "Kim et al.",
    "year": "2025"
  },
  {
    "id": 72,
    "name": "Maitland et al.",
    "year": "2021"
  },
  {
    "id": 73,
    "name": "Ginter et al.",
    "year": "2017"
  },
  {
    "id": 74,
    "name": "Norton et al.",
    "year": "2020"
  },
  {
    "id": 75,
    "name": "Kim et al.",
    "year": "2022"
  },
  {
    "id": 76,
    "name": "Liu et al.",
    "year": "2012"
  },
  {
    "id": 77,
    "name": "Carey et al.",
    "year": "2012"
  },
  {
    "id": 78,
    "name": "Higashi et al.",
    "year": "2023"
  },
  {
    "id": 79,
    "name": "Almási et al.",
    "year": "2023"
  },
  {
    "id": 80,
    "name": "Henry et al.",
    "year": "2015"
  },
  {
    "id": 81,
    "name": "Nassar et al.",
    "year": "2021"
  },
  {
    "id": 82,
    "name": "Parinyanitikul et al.",
    "year": "2013"
  },
  {
    "id": 83,
    "name": "Rugo et al.",
    "year": "2022"
  },
  {
    "id": 84,
    "name": "Krop et al.",
    "year": "2023"
  },
  {
    "id": 85,
    "name": "Zhong et al.",
    "year": "2023"
  },
  {
    "id": 86,
    "name": "Ismail et al.",
    "year": "2024"
  },
  {
    "id": 87,
    "name": "Immunomic Therapeutics",
    "year": "2026"
  },
  {
    "id": 88,
    "name": "Gampenrieder et al.",
    "year": "2023"
  },
  {
    "id": 89,
    "name": "Zhang et al.",
    "year": "2014"
  },
  {
    "id": 90,
    "name": "Li et al.",
    "year": "2019"
  },
  {
    "id": 91,
    "name": "Hamilton et al.",
    "year": "2016"
  },
  {
    "id": 92,
    "name": "Marcinkowski et al.",
    "year": "2019"
  },
  {
    "id": 93,
    "name": "Chen et al.",
    "year": "2014"
  },
  {
    "id": 94,
    "name": "Guzelis et al.",
    "year": "2025"
  },
  {
    "id": 95,
    "name": "Schmitz et al.",
    "year": "2007"
  },
  {
    "id": 96,
    "name": "Mayr et al.",
    "year": "2006"
  },
  {
    "id": 97,
    "name": "Palena et al.",
    "year": "2014"
  },
  {
    "id": 98,
    "name": "Chung et al.",
    "year": "2019"
  },
  {
    "id": 99,
    "name": "Isakoff et al.",
    "year": "2020"
  },
  {
    "id": 100,
    "name": "ClinicalTrials.gov",
    "year": "n.d.-a"
  },
  {
    "id": 101,
    "name": "ClinicalTrials.gov",
    "year": "n.d.-b"
  },
  {
    "id": 102,
    "name": "ClinicalTrials.gov",
    "year": "n.d.-c"
  },
  {
    "id": 103,
    "name": "ClinicalTrials.gov",
    "year": "n.d.-d"
  },
  {
    "id": 104,
    "name": "ClinicalTrials.gov",
    "year": "n.d.-e"
  },
  {
    "id": 105,
    "name": "ClinicalTrials.gov",
    "year": "n.d.-f"
  },
  {
    "id": 106,
    "name": "ClinicalTrials.gov",
    "year": "n.d.-g"
  },
  {
    "id": 107,
    "name": "ClinicalTrials.gov",
    "year": "n.d.-h"
  },
  {
    "id": 108,
    "name": "ClinicalTrials.gov",
    "year": "n.d.-i"
  },
  {
    "id": 109,
    "name": "ClinicalTrials.gov",
    "year": "n.d.-j"
  },
  {
    "id": 110,
    "name": "ClinicalTrials.gov",
    "year": "n.d.-k"
  },
  {
    "id": 111,
    "name": "ClinicalTrials.gov",
    "year": "n.d.-l"
  },
  {
    "id": 112,
    "name": "ClinicalTrials.gov",
    "year": "n.d.-m"
  },
  {
    "id": 113,
    "name": "ClinicalTrials.gov",
    "year": "n.d.-n"
  },
  {
    "id": 114,
    "name": "ClinicalTrials.gov",
    "year": "n.d.-o"
  },
  {
    "id": 115,
    "name": "ClinicalTrials.gov",
    "year": "n.d.-p"
  },
  {
    "id": 116,
    "name": "ClinicalTrials.gov",
    "year": "n.d.-q"
  },
  {
    "id": 117,
    "name": "Bechmann et al.",
    "year": "2020"
  },
  {
    "id": 118,
    "name": "Powell et al.",
    "year": "2018"
  },
  {
    "id": 119,
    "name": "Siroy et al.",
    "year": "2013"
  },
  {
    "id": 120,
    "name": "Hutchins et al.",
    "year": "2017"
  },
  {
    "id": 121,
    "name": "Lin et al.",
    "year": "2022"
  },
  {
    "id": 122,
    "name": "Ribeiro et al.",
    "year": "2018"
  },
  {
    "id": 123,
    "name": "Human Protein Atlas",
    "year": "n.d.-b"
  },
  {
    "id": 124,
    "name": "Human Protein Atlas",
    "year": "n.d.-c"
  },
  {
    "id": 125,
    "name": "Ohtake et al.",
    "year": "2014"
  },
  {
    "id": 126,
    "name": "Tuohy et al.",
    "year": "2016"
  },
  {
    "id": 127,
    "name": "Human Protein Atlas",
    "year": "n.d.-d"
  },
  {
    "id": 128,
    "name": "NCI",
    "year": "n.d."
  },
  {
    "id": 129,
    "name": "Ogden et al.",
    "year": "2020"
  },
  {
    "id": 130,
    "name": "Merlino et al.",
    "year": "2019"
  },
  {
    "id": 131,
    "name": "Zhao et al.",
    "year": "2011"
  },
  {
    "id": 132,
    "name": "Amatya et al.",
    "year": "2021"
  },
  {
    "id": 133,
    "name": "Turbin et al.",
    "year": "2006"
  },
  {
    "id": 134,
    "name": "Rau et al.",
    "year": "2012"
  },
  {
    "id": 135,
    "name": "Human Protein Atlas",
    "year": "n.d.-e"
  },
  {
    "id": 136,
    "name": "Lv et al.",
    "year": "2021"
  },
  {
    "id": 137,
    "name": "Benzekry et al.",
    "year": "2014"
  },
  {
    "id": 138,
    "name": "Wesselhoeft et al.",
    "year": "2018"
  },
  {
    "id": 139,
    "name": "Chen et al.",
    "year": "2022"
  },
  {
    "id": 140,
    "name": "Wesselhoeft et al.",
    "year": "2019"
  },
  {
    "id": 141,
    "name": "Chen et al.",
    "year": "2017"
  },
  {
    "id": 142,
    "name": "Kubara et al.",
    "year": "2024"
  },
  {
    "id": 143,
    "name": "de Pillis et al.",
    "year": "2005"
  },
  {
    "id": 144,
    "name": "Ndeupen et al.",
    "year": "2021"
  },
  {
    "id": 145,
    "name": "Meric-Bernstam et al.",
    "year": "2024"
  },
  {
    "id": 146,
    "name": "Zhou et al.",
    "year": "2008"
  },
  {
    "id": 147,
    "name": "OECD",
    "year": "2025"
  },
  {
    "id": 148,
    "name": "ICH",
    "year": "1994"
  },
  {
    "id": 149,
    "name": "Jansen et al.",
    "year": "1999"
  },
  {
    "id": 150,
    "name": "Talts et al.",
    "year": "2018"
  },
  {
    "id": 151,
    "name": "Le Blanc",
    "year": "2015"
  },
  {
    "id": 152,
    "name": "United Nations",
    "year": "2015"
  },
  {
    "id": 153,
    "name": "Nilsson et al.",
    "year": "2016"
  },
  {
    "id": 154,
    "name": "Pradhan et al.",
    "year": "2017"
  },
  {
    "id": 155,
    "name": "Zhou and Moinuddin",
    "year": "2017"
  },
  {
    "id": 156,
    "name": "Lusseau and Mancini",
    "year": "2019"
  },
  {
    "id": 157,
    "name": "Dawes",
    "year": "2022"
  },
  {
    "id": 158,
    "name": "Bennich et al.",
    "year": "2023"
  }
];

export const modelJudging: WikiJudgingCriterion[] = [
  {
    "id": "model-criterion-1",
    "question": "How impressive is the modeling?",
    "paragraphs": [
      "Our modeling work spans **three complementary computational frameworks** that together form an **integrated decision-support system** for rational vaccine design, dosing optimization, and sustainability assessment.",
      "**Cell2dose** represents an exceptionally ambitious **multi-scale integration** connecting cell-based assays to animal dosing recommendations. This mechanistic model comprises **seven integrated modules** spanning molecular scale (LNP delivery, RNA stability), cellular scale (DC maturation, T-cell activation), tissue scale (lymph node dynamics), and organism scale (35-day tumor growth kinetics). The model uses **Bayesian calibration by finite-grid integration and posterior resampling**, **14-state ordinary differential equations**, and **Latin Hypercube Sampling** across 1,024 parameter draws to propagate uncertainty through **301 dose scenarios** (see Cell2dose methodology). This is not a simple curve fit—it is a complete mechanistic chain that makes the connection between in vitro measurements and in vivo outcomes computationally explicit.",
      "**AEIP (Antigen-Epitope Integration Pipeline)** tackles the dual challenge of **antigen selection and epitope refinement** through systematic integration of **four orthogonal data sources**. We processed **quantitative proteomics from 154 TNBC patients** across two independent cohorts, **single-cell transcriptomics from 39,324 quality-controlled cells**, **genomic profiling of 115 TCGA cases**, and **AlphaFold3 structural modeling of 85 peptide-MHC complexes** (see AEIP data integration). The pipeline filtered **1,838 candidate epitopes to 15 HLA-A*02:01-restricted sequences** through NetMHCpan binding prediction, IEDB immunogenicity scoring, and explicit structural validation of hydrogen-bond networks and F-pocket engagement—going beyond confidence scores to verify **actual binding geometry**.",
      "**SDG contribution assessment framework** quantifies CirCure's contributions across **all 17 Sustainable Development Goals** through a **four-dimensional evidence scoring system** (Action, Implementation, Feedback, Record) combined with network propagation analysis. The framework uses scoring formula **D = 3G(0.10A + 0.30I + 0.10F + 0.50R)**—the **50% weight on documentation** reflects our emphasis on verifiable evidence rather than aspirational claims (see SDG network analysis). Direct contribution indices reach **2.550 for SDG 4 and SDG 9** (tied highest), with total indices reaching **3.819 for SDG 4** when indirect network effects through **272 documented goal interactions** are included. Critically, **gate scenario analysis** demonstrates that manufacturing pathway choices determine outcomes: SDG 14/15 show **negative indices (−0.063, −0.086)** under current assumptions but **flip to +0.77** under renewable energy pathways.",
      "Together, these three models establish CirCure as a project grounded in **computational rigor**: **Cell2dose tells us how much to dose, AEIP tells us what to deliver, and the SDG framework tells us how to scale sustainably** with honest acknowledgment of trade-offs."
    ]
  },
  {
    "id": "model-criterion-2",
    "question": "Did the model help the team understand a part, device, or system?",
    "paragraphs": [
      "Yes—our models transformed abstract data into **actionable design decisions** at multiple levels.",
      "**Dose selection guidance:** Before Cell2dose, we had cell viability curves but no systematic way to choose an animal dose. The complete **301-dose scan** revealed that **10.2 μg per injection** has the highest joint-pass fraction (0.8145), with a candidate range of **9.4–12.6 μg**. More importantly, **sensitivity analysis** identified which parameters matter most: **effector-to-killing transfer (γ_ET)**, **dose normalization (q_scale)**, and **lymph routing (f_lymph)** account for **94% of prediction uncertainty** (see dose optimization and sensitivity analysis). This told us that refining our already-calibrated cell assays wouldn't help much—we need **time-resolved in vivo measurements** of lymph payload, antigen expression, and effector markers. The model didn't just give us a number; it told us **what experiments to do next**.",
      "**Antigen selection rationale:** AEIP's **four-dimensional scoring framework** resolved conflicting literature guidance by ranking 40+ candidate antigens across localization, tumor specificity, prognostic significance, and therapeutic validation. This identified **TROP2, B7-H4, Nectin-4, and LIV-1** as top candidates. TCGA genomic profiling then showed this **four-antigen panel achieves 88% patient coverage** when requiring at least one gene with mRNA z-score ≥0.5 or high-level amplification—a coverage estimate we could not have obtained without computational integration. Critically, **cross-modal validation** through proteomics confirmed that all four antigens show **tumor-enriched protein abundance** (fold changes **1.14–18.25**, all **FDR < 0.05**), giving our wet lab team confidence that selected antigens would be physically present at immunogenic levels.",
      "**Epitope structural validation:** IEDB binding predictions filtered 1,838 candidates to 51, but sequence-based scores cannot guarantee stable MHC presentation. **AlphaFold3 structural validation** revealed that **two high-confidence peptides** (mean ipTM 0.968 and 0.960) **failed the F-pocket fill criterion** despite strong confidence scores. This taught us that **confidence metrics alone are insufficient**; explicit structural geometry must be validated. **It is actually the 15 epitopes that passed AEIP's structural filters upon which our entire circRNA vaccine construct was built**, with geometric evidence supporting stable, TCR-compatible pMHC complexes that ultimately achieved successful tumor inhibition in our in vivo experiments (see epitope screening and structural validation).",
      "**Sustainability strategy clarity:** The SDG framework identified **unexpected co-benefits** in **SDG 1 (No Poverty)** and **SDG 8 (Decent Work)** through health→poverty and innovation→employment pathways (indirect indices **0.222 and 0.467**). We returned to patient interviews and found explicit quotes confirming **treatment costs create financial barriers**—validating the model's mechanism. Most critically, **gate scenario analysis** revealed that manufacturing choices determine ecological impact: under fossil-intensive synthesis, **SDG 14/15** shows **negative indices**; Under renewable pathways, these **flip to +0.77**—providing a quantitative basis for prioritizing **renewable energy during scale-up**."
    ]
  },
  {
    "id": "model-criterion-3",
    "question": "Did the team use measurements of a part, device, or system to develop the model?",
    "paragraphs": [
      "Yes—every model is anchored in **experimental measurements from multiple orthogonal sources**.",
      "**Cell2dose calibration:** We used **CCK8 viability assays** (5 doses × 4 replicates = **20 observations**) and **cytotoxicity killing assays** (blank and combined groups with 3 replicates each) to calibrate dose-response curves via **Bayesian inference**. **DC activation** (CD80⁺CD86⁺ fold-gain ≈ **2.16**) and **T-cell activation** (CD69⁺ fold-gain ≈ **2.76**) readouts from our wet lab experiments directly parameterized **immune amplification modules**. For parameters unavailable from our experiments, we used **literature-sourced values with explicit provenance** Benzekry et al. (2014) for growth kinetics and flagged these as **transfer assumptions requiring validation**. Animal tumor measurements (**PBS mean 234 mm³, vaccine mean 24.2 mm³**) were **withheld from calibration** and used to test frozen predictions—revealing a **4.7× growth parameter mismatch** that we honestly report in our discussion, prioritizing **transparency over false validation** (see experimental calibration and validation).",
      "**AEIP multi-omics integration:** We processed **two independent proteomic cohorts** (PXD024322: **88 tumors vs 38 normals** across 38 TMT batches; PXD028102: **66 patient-matched pairs**) yielding **tumor-enriched fold changes** for all four candidate antigens. **Single-cell RNA-seq** (GSE176078: **39,324 cells from 10 TNBC patients**) measured detection rates in malignant vs non-malignant compartments, showing that **81.4% of malignant cells** express at least one of our four genes. **TCGA genomic data** (115 cases) quantified individual gene reach (4%–79%) and **panel reach (88%)**. **NetMHCpan binding predictions** are trained on **>850,000 experimental peptide-MHC measurements** from IEDB. **AlphaFold3 structural coordinates** provided measurable geometric features—**hydrogen-bond distances, solvent-accessible surface areas, F-pocket fill ratios**—enabling rejection of two candidates based on **explicit structural defects** rather than subjective assessment.",
      "**SDG framework evidence grounding:** The interaction matrix builds on **systematic reviews** synthesizing SDG relationship data across countries and time periods. For CirCure-specific scoring, the **four dimensions (A, I, F, R)** were evaluated using documented evidence: **Implementation (I)** used experimental measurements (DC maturation, T-cell activation, tumor inhibition), **Record (R)** reflected documentation completeness (raw data accessions, frozen parameters, explicit provenance), **Feedback (F)** required traceable stakeholder input (patient interviews, industry partnerships, NGO consultations), and **Action (A)** evaluated mechanism-target correspondence. All scoring followed a **five-tier scale (0, 0.25, 0.50, 0.75, 1.00)** with explicit criteria. We conducted independent parameter audits, sensitivity analysis, and validation against published studies (**78–81% directional agreement** with the literature). All scoring worksheets are version-controlled with cryptographic hashes."
    ]
  },
  {
    "id": "model-criterion-4",
    "question": "Does the modeling approach provide a good example for others?",
    "paragraphs": [
      "Yes—our modeling frameworks are designed for **modularity, transparency, and extensibility**, making them **strong templates** for future iGEM teams.",
      "**Reusable architecture:** Cell2dose's **seven-module structure** is **generalizable beyond mRNA vaccines**—teams can swap modules for DNA expression, CAR-T expansion, or bacterial clearance **without rebuilding the entire chain**. AEIP's **four-stage pipeline** is **disease-agnostic**—applicable to melanoma, glioblastoma, or hepatocellular carcinoma by substituting datasets and HLA alleles. The SDG framework's **four-dimensional scoring guide** enables any team to quantify sustainability contributions using the documented interaction matrix **without rebuilding goal relationships**.",
      "**Honest uncertainty quantification:** Most models hide uncertainty; we make it **central**. Cell2dose's **1,024 parameter draws** produce **six-order-of-magnitude prediction intervals**—wide ranges are a **feature, not a bug**. AEIP honestly acknowledges that **two peptides failed structural validation** despite high confidence scores, teaching teams that **confidence metrics alone are insufficient**. The SDG framework clarifies that indices measure **\"evidence completeness × network leverage\"** under stated scenarios, not absolute benefits—making claims **honest rather than overselling**.",
      "**Exemplary documentation:** We provide **complete codebases with verification scripts**, **frozen predictions with cryptographic hashes**, **parameter registries** linking every value to its source, **public dataset accessions** (PXD024322, PXD028102, GSE176078, TCGA-BRCA), **explicit software versions** (Seurat, limma, NetMHCpan 4.1), and **numerical thresholds for every filtering step**. For the SDG framework, we provide frozen input files, audit logs, sensitivity matrices, and explicit tier criteria. Pedagogical figures show **information flow**, **multi-panel trade-offs**, **parameter importance**, and **honest mismatch reporting**. This transparency allows teams to **reproduce our analysis, critically evaluate our choices, or adapt our methods** to their own systems.",
      "**Integration with experimental design:** Our models **guide future experiments**. Cell2dose's **sensitivity analysis** identifies **high-information measurements** that would **reduce uncertainty 3–5×** more than additional cell assays. AEIP's **structural validation workflow** provides **allele-independent geometric criteria** applicable to any peptide-MHC complex. The SDG framework's **gate scenario analysis** revealed which choices flip outcomes (SDG 14/15 from **−0.09 to +0.77** under renewable pathways), enabling **evidence-based sustainability decisions** during scale-up.",
      "**Community impact:** Together, our three models demonstrate that computational work in iGEM can be both **rigorous and practical**—**mechanistic depth with uncertainty quantification**, **multi-omics integration with honest limitations**, and **sustainability assessment with transparent scoring**. Future teams can use **Cell2dose** for dose optimization, **AEIP** for rational vaccine design, and the **SDG framework** for quantifying cascading impacts across sustainable development goals."
    ]
  }
];

export const modelDownloads = [
  {
    "label": "00_batch.log",
    "path": "https://gitlab.igem.org/2026/software/jlu-fbh/circuforge/-/raw/main/docs/wiki-evidence/model/00_batch.log"
  },
  {
    "label": "00_MODELS.csv",
    "path": "https://gitlab.igem.org/2026/software/jlu-fbh/circuforge/-/raw/main/docs/wiki-evidence/model/00_models.csv"
  },
  {
    "label": "00_NETWORK.csv",
    "path": "https://gitlab.igem.org/2026/software/jlu-fbh/circuforge/-/raw/main/docs/wiki-evidence/model/00_network.csv"
  },
  {
    "label": "00_NETWORK_PIVOT.csv",
    "path": "https://gitlab.igem.org/2026/software/jlu-fbh/circuforge/-/raw/main/docs/wiki-evidence/model/00_network_pivot.csv"
  },
  {
    "label": "00_SASA.csv",
    "path": "https://gitlab.igem.org/2026/software/jlu-fbh/circuforge/-/raw/main/docs/wiki-evidence/model/00_sasa.csv"
  },
  {
    "label": "00_SASA_PIVOT.csv",
    "path": "https://gitlab.igem.org/2026/software/jlu-fbh/circuforge/-/raw/main/docs/wiki-evidence/model/00_sasa_pivot.csv"
  },
  {
    "label": "00_SYSTEMS.csv",
    "path": "https://gitlab.igem.org/2026/software/jlu-fbh/circuforge/-/raw/main/docs/wiki-evidence/model/00_systems.csv"
  },
  {
    "label": "dose_scan.csv",
    "path": "https://gitlab.igem.org/2026/software/jlu-fbh/circuforge/-/raw/main/docs/wiki-evidence/model/cell2dose-dose-scan.csv"
  },
  {
    "label": "figure15_data.csv",
    "path": "https://gitlab.igem.org/2026/software/jlu-fbh/circuforge/-/raw/main/docs/wiki-evidence/model/figure15_data.csv"
  },
  {
    "label": "PXD024322_TNBC_vs_Normal_limma_ALL_9088_proteins(1).csv",
    "path": "https://static.igem.wiki/teams/6056/wiki/files/pages/dry-lab/model/pxd024322-tnbc-vs-normal-limma-all-9088-proteins-1.csv"
  },
  {
    "label": "PXD028102_paired_limma_imputed_ALL.csv",
    "path": "https://static.igem.wiki/teams/6056/wiki/files/pages/dry-lab/model/pxd028102-paired-limma-imputed-all.csv"
  }
];

export const modelModuleLinks = [
  {
    "target": "model-heading-52",
    "label": "Module 1: Calibrating Cell Responses",
    "x": 411,
    "y": 64,
    "width": 1695,
    "height": 386
  },
  {
    "target": "model-heading-57",
    "label": "Module 2: Payload Distribution After Injection",
    "x": 414,
    "y": 600,
    "width": 462,
    "height": 413
  },
  {
    "target": "model-heading-62",
    "label": "Module 3: RNA Expression and Innate Signaling",
    "x": 882,
    "y": 600,
    "width": 408,
    "height": 413
  },
  {
    "target": "model-heading-66",
    "label": "Module 4: Antigen Presentation and T-cell Function",
    "x": 1296,
    "y": 600,
    "width": 377,
    "height": 413
  },
  {
    "target": "model-heading-69",
    "label": "Module 5: Tumor Growth and Immune Killing",
    "x": 1680,
    "y": 600,
    "width": 428,
    "height": 413
  },
  {
    "target": "model-heading-75",
    "label": "Module 6: Uncertainty Propagation and Dose Selection",
    "x": 414,
    "y": 1238,
    "width": 1694,
    "height": 292
  },
  {
    "target": "model-heading-85",
    "label": "Module 7: Sensitivity Analysis and Computational Verification",
    "x": 414,
    "y": 1535,
    "width": 1694,
    "height": 103
  }
];

export const modelStructuralConfirmation = { title: "Structural Confirmation of Trop2-CTL1 (SVCWCVNSV)", complex: "HLA-A*02:01 / β2M" };

export const modelPage: WikiPageContent = {
 route: "/model", category: "dry-lab", chapter: "Dry Lab / 01 of 04", eyebrow: "Model", title: "Model", lede: "", boundary: "", visual: "model-manuscript", visualLabel: "Model", visualSteps: [], facts: [],
 sections: manuscriptSections,
 links: [
    { path: "/design", label: "Molecular Design" },
    { path: "/results", label: "Model vs Bench Validation" },
    { path: "/software", label: "circForge Software" },
    { path: "/hardware", label: "CirCore Device Control" },
  ],
  next: {
    path: "/software",
    label: "Software",
    title: "From Mathematical Models to Automated Tools",
    description: "Differential equations and folding simulations become transformative when anyone can use them. Meet circForge—our open-source software suite automating circRNA design.",
  },
};
