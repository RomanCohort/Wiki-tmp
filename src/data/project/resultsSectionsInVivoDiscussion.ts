/** Verbatim Results manuscript data; Markdown escapes and typography only are resolved. */
import type { WikiSection } from "../../components/wiki/wikiPageTypes";
import { resultsFigure } from "./resultsAssets";
export const resultsSectionsInVivoDiscussion: WikiSection[] = [
  {
    id: "results-in-vivo",
    index: "09",
    kicker: "",
    navLabel: "In vivo",
    title: "In Vivo: Efficacy and Immune Mechanism",
    summary: "",
    blocks: [
      {
        type: "prose",
        paragraphs: [
          "The in vitro experiments defined several properties of the vaccine material and delivery carrier, but they could not determine whether the platform could affect tumour growth in an intact organism. We therefore built a **TROP2-overexpressing 4T1 line**, established subcutaneous tumours in BALB/c mice, and treated them with **five weekly doses of circRNA-LNP** against PBS and empty-vector controls. Tumour volume was followed by caliper over six weeks; at endpoint we assessed tumour volume, intratumoural CD8 / Granzyme B immunofluorescence, and splenic immunophenotype by flow cytometry with intracellular cytokine staining. The study followed **ARRIVE 2.0** (Percie du Sert et al., 2020), with the design drafted in the NC3Rs Experimental Design Assistant and welfare limits set per UKCCCR/NCRI guidance and body-condition scoring. It was approved by the Animal Ethics Committee of the First Hospital of Jilin University (approval **JDYY20261369**, 27 July 2026; animal use licence **SYXK (Ji) 2023-0011**) and follows the **3Rs** and humane endpoints. This section reports the growth curves, the endpoint data and the two mechanism readouts.",
          "**Limitations and scope**",
          "**The species–HLA mismatch, and how it frames every result in this section.**",
          "CirCure's epitopes were predicted and screened as **human HLA-A*02:01-restricted**, but the efficacy study uses **immunocompetent wild-type BALB/c mice (H-2d haplotype)**. Human HLA-A*02:01-restricted epitopes cannot, in principle, be efficiently presented by the mouse's own MHC-I molecules.",
          'All in vivo results in this section should therefore be understood as a **proof of concept for the multi-epitope circRNA platform**. They show that the platform can induce a substantial anti-tumour immune response and restrain tumour growth in a living animal, but that response may include non-specific innate immune effects from the circRNA backbone and adjuvant. **These results must not be read as "efficacy mediated by antigen-specific, HLA-A*02:01-restricted CTLs."** The remedy is to move the experiment into a mouse system expressing human HLA-A*02:01 (an HLA-A*02:01 transgenic or humanised mouse), combined with tetramer staining to quantify antigen-specific CD8⁺ T cells directly — our highest-priority next step.',
        ],
      },
      {
        type: "subheading",
        id: "results-6-1",
        index: "9.1",
        title:
          "9.1 Establishing and validating the TROP2-positive target model",
        anchorIds: ["results-section-9-1"],
      },
      {
        type: "prose",
        paragraphs: [
          "**Aim**｜An in vivo experiment is only valid if the tumour cells carry the antigen the vaccine targets. Wild-type 4T1 expresses almost no TROP2, so a stable TROP2-overexpressing 4T1 line was required (Corti et al., 2023; Li et al., 2026).",
          "**Design & Readout**｜A **commercially produced TROP2-overexpression lentivirus** (CopGFP reporter, puromycin resistance) was used to transduce 4T1, and the line was validated in four steps: transduction (GFP microscopy), enrichment (GFP⁺ sorting then puromycin selection), **transcript-level verification** (RT-PCR) and **surface-protein verification** (flow cytometry) — the last two measuring TROP2 itself rather than the GFP surrogate (Experiments 6.1–6.4).",
          "**Result**",
        ],
      },
      resultsFigure("fig38"),
      resultsFigure("fig39"),
      {
        type: "prose",
        paragraphs: [
          "Two magnifications (upper and lower rows); columns left to right: bright field, GFP channel, merge. Untransduced 4T1 was imaged under identical settings as the autofluorescence control.",
          "Three things are read off this figure in order. **In bright field the cells are healthy** — adherent, polygonal to spindle-shaped, with no rounding, granulation or detachment — so the transduction and the Polybrene did not impose visible cytotoxicity, which matters because a toxic transduction selects for survivors rather than for transductants. **In the GFP channel the signal is bright, dense and evenly distributed** across the field rather than confined to a few unusually bright cells, indicating that the reporter is expressed at a high level across a large fraction of the population. **In the merge the fluorescence localises inside the cells** whose outlines the bright field defines, ruling out the most common artefact at this step, extracellular debris or medium autofluorescence read as signal.",
        ],
      },
      resultsFigure("fig40"),
      {
        type: "prose",
        paragraphs: [
          "Sorting used a **three-step gate**, each step removing one specific class of false event: **FSC-A/SSC-A** excluded debris and sub-cellular particles, retaining **68.8%** of acquired events; **FSC-A/FSC-H** excluded doublets and aggregates, retaining **89.3%** of those, with the population lying along the expected diagonal and so confirming that the suspension was well dispersed; and **GFP-A** against a threshold set on untransduced 4T1 (negative fluorescence held at 10¹–10², threshold ≈ 10³) captured **84.1%** of the singlets as GFP-positive. The GFP⁺ population was tight rather than smeared across decades, indicating uniform expression rather than a mixture of high and low integrants. Sorted cells were collected into serum-rich medium and expanded for 3–5 days under **puromycin at 2 µg/mL**, so that any residual untransduced cells were removed by drug pressure as well as by sorting.",
        ],
      },
      resultsFigure("fig41"),
      resultsFigure("fig42"),
      {
        type: "prose",
        paragraphs: [
          "Left: wild-type 4T1. Right: TROP2-overexpressing 4T1.",
          "Table 25. Validation of the TROP2-overexpressing 4T1 line at mRNA and surface-protein level.",
          "Values are mRNA n = 3.",
        ],
      },
      {
        type: "table",
        headers: [
          "Cell line",
          "TROP2 mRNA, relative expression",
          "Surface TROP2⁺",
        ],
        rows: [
          ["4T1 WT (Control)", "1 (baseline)", "0%"],
          ["4T1-TROP2 (OE)", "**75.83 ± 3.27-fold**", "**99.9%**"],
        ],
      },
      {
        type: "prose",
        paragraphs: [
          "**Interpretation**｜The two levels of validation agree: a **75.8 ± 3.3-fold increase in TROP2 mRNA** (P < 0.0001) and **99.9% surface positivity**, against 0% in wild-type. The transcriptional increase therefore converts into surface protein, so the transgene is transcribed, processed and trafficked to the membrane — and membrane TROP2 is what a T cell can recognise. Sorting followed by drug selection produced a homogeneous overexpression line, so in the downstream efficacy study the presence or absence of the target antigen is a controlled variable rather than a source of variation.",
          "**What the enrichment can be read from.** GFP positivity within the singlet gate at the moment of sorting was **84.1%** (Figure 39); surface TROP2 positivity in the expanded, puromycin-selected line was **99.9%** (Figure 41). These are two different measurements — a reporter scored at the sort, and the target protein scored after selection and expansion — and what the pair shows is that the two enrichment pressures, sorting and drug selection, acted in the same direction and left no detectable negative subpopulation behind. The post-sort re-check on the cytometer and by fluorescence microscopy confirmed that the population was homogeneous; the descriptive check on the sorted line is the surface-TROP2 measurement in Figure 41.",
          "**Limitations.** GFP reports successful integration of the construct rather than TROP2 itself, which is why the verification rests on the two measurements made on TROP2 directly, RT-PCR at the transcript level and flow cytometry at the cell surface. The model also uses **forced overexpression of human TROP2 on a mouse cell**, at 75.8-fold over wild-type, far above physiological expression in clinical TNBC, so in vivo efficacy measured on it is likely to be an overestimate.",
        ],
      },
      {
        type: "subheading",
        id: "results-6-2",
        index: "9.2",
        title: "9.2 In vivo tumour growth inhibition",
        anchorIds: ["results-section-9-2"],
      },
      {
        type: "prose",
        paragraphs: [
          "**Aim**｜Quantify the anti-tumour activity of the Combined vaccine in immunocompetent tumour-bearing mice.",
          "**Design & Readout**｜Three groups — PBS / empty-vector circRNA-LNP / Combined vaccine — **n = 5 per group**; 4T1-TROP2 inoculated subcutaneously on **D0**, five weekly doses of **10 µg circRNA-LNP** (D0, 7, 14, 21, 28), endpoint **D35**. Caliper measurement was **blinded**, on coded animals in randomised order (Experiments 7.1–7.2). The design was pre-specified in an **NC3Rs EDA Experimental Design Report** before the experiment began, and two of its provisions govern how the numbers below must be read: the **primary outcome is endpoint tumour volume alone** (growth curves are descriptive), and **all three pairwise comparisons are pre-specified** — Combined vs PBS, empty vector vs PBS, and Combined vs empty vector — Holm-corrected across the three.",
          "**Result**",
        ],
      },
      resultsFigure("fig43"),
      {
        type: "prose",
        paragraphs: [
          "Top to bottom: PBS, empty vector, vaccine (n = 5 each); background grid = 1 cm.",
        ],
      },
      resultsFigure("fig44"),
      {
        type: "prose",
        paragraphs: [
          "Left to right: PBS control, empty-vector control, Combined circRNA vaccine; 100 µL injected subcutaneously at the tail base in each group.",
        ],
      },
      {
        type: "table",
        caption:
          "Table 26. Mapping between the figure's week axis and the study day.",
        headers: [
          "X-axis label",
          "Study day",
          "What happens on that day",
          "Tumour volume recorded",
        ],
        rows: [
          [
            "*(before Week 1)*",
            "—",
            "Acclimatisation. No tumour, no dosing",
            "no data point",
          ],
          [
            "**Week 1**",
            "**D0**",
            "**Tumour inoculation; dose 1.** Caliper reading taken the same day",
            "**0 mm³ in every animal — by definition, not by measurement**",
          ],
          ["**Week 2**", "**D7**", "dose 2", "first measurable tumour"],
          ["Week 3", "D14", "dose 3", ""],
          ["Week 4", "D21", "dose 4", ""],
          ["Week 5", "D28", "**dose 5 (final)**", ""],
          [
            "**Week 6**",
            "**D35**",
            "**Endpoint**, one week after the final dose — animals sacrificed, tumours excised, spleens taken (§9.3, §9.4)",
            "endpoint volume",
          ],
        ],
      },
      {
        type: "prose",
        paragraphs: [
          "Five weekly doses run from Week 1 to Week 5; the endpoint at Week 6 leaves a one-week interval after the last dose.",
          "**The Week-1 reading is not an informative measurement, and it is not tested.** It is taken on the day of inoculation, before any tumour could have grown, so the value is 0 in every animal in every group. It carries no variance and no between-group comparison is defined there. It anchors each growth curve at the origin and is listed in Table 28 for completeness, but **every statistical test on this page begins at Week 2**.",
        ],
      },
      resultsFigure("fig45"),
      {
        type: "prose",
        paragraphs: [
          "X-axis: study week (see Table 26). **Week 1 is D0** — tumour inoculation and the first dose, with all curves starting at 0 mm³ there by definition rather than by measurement — and **Week 6 is the D35 endpoint**, one week after the final dose. The acclimatisation period precedes Week 1 and carries no data point. Y-axis: tumour volume (mm³) from caliper measurement. Each trace shows the group mean tumour volume, with error bars indicating SD (n = 5 mice per group). The endpoint bracket compares PBS with the Combined vaccine; **** denotes Holm-corrected P < 0.0001.",
        ],
      },
      {
        type: "table",
        caption: "Table 27. Endpoint tumour volumes.",
        headers: [
          "Group",
          "Endpoint (Week 6 / D35) tumour volume, mean ± SD",
          "Individual mice",
        ],
        rows: [
          ["PBS", "233.64 ± 28.33 mm³", "224 / 196 / 225 / 267.2 / 256"],
          [
            "Empty vector (Control)",
            "90.36 ± 13.51 mm³",
            "100 / 75 / 87.5 / 81.3 / 108",
          ],
          [
            "**Combined vaccine**",
            "**24.20 ± 9.72 mm³**",
            "32 / 22.5 / 18 / 12.5 / 36",
          ],
        ],
      },
      {
        type: "prose",
        paragraphs: [
          "Values are n = 5 per group.",
          "Growth curve by timepoint:",
        ],
      },
      {
        type: "table",
        caption: "Table 28. Tumour volume at each timepoint.",
        headers: [
          "Timepoint",
          "Study day",
          "PBS",
          "Empty vector",
          "Vaccine",
          "Three-group ANOVA",
        ],
        rows: [
          ["Week 1", "D0", "0", "0", "0", "— (see note)"],
          [
            "Week 2",
            "D7",
            "4.80 ± 0.84",
            "4.80 ± 0.84",
            "4.48 ± 1.03",
            "P = 0.81 (ns)",
          ],
          [
            "Week 3",
            "D14",
            "65.80 ± 15.65",
            "26.70 ± 6.91",
            "13.92 ± 2.00",
            "P = 7.4 × 10⁻⁶",
          ],
          [
            "Week 4",
            "D21",
            "101.40 ± 18.43",
            "43.30 ± 8.12",
            "16.65 ± 2.01",
            "P = 2.7 × 10⁻⁷",
          ],
          [
            "Week 5",
            "D28",
            "163.84 ± 17.11",
            "64.56 ± 13.61",
            "18.70 ± 3.16",
            "P = 1.6 × 10⁻⁹",
          ],
          [
            "**Week 6 (endpoint)**",
            "**D35**",
            "**233.64 ± 28.33**",
            "**90.36 ± 13.51**",
            "**24.20 ± 9.72**",
            "**P = 2.3 × 10⁻⁹**",
          ],
        ],
      },
      {
        type: "prose",
        paragraphs: [
          "Values are mm³, mean ± SD, n = 5. **No test is performed at Week 1**: the reading is taken on the day of inoculation, so every animal in every group reads 0 mm³ and no between-group comparison is defined.",
          "**Assumption checks (the pre-specified analysis path).** Shapiro-Wilk on endpoint volumes gives P = 0.69 / 0.79 / 0.77 for the three groups (**all pass**), and Levene's test gives P = 0.24 (**passes**). Given these assumption checks, we use **one-way ANOVA with Holm-corrected pairwise comparisons**, with no log transformation and no switch to Kruskal-Wallis.",
          "One-way ANOVA on endpoint volume: **F(2,12) = 159.2, P = 2.3 × 10⁻⁹** (the non-parametric Kruskal-Wallis agrees at P = 0.0019).",
        ],
      },
      {
        type: "table",
        caption:
          "Table 29. Tumour growth inhibition (TGI) and statistical tests.",
        headers: ["Comparison", "Holm-corrected P", "TGI"],
        rows: [
          [
            "**Vaccine vs PBS** (**pre-specified — primary**)",
            "**8.4 × 10⁻⁷**",
            "**89.6%**",
          ],
          [
            "**Vaccine vs empty vector (pre-specified)**",
            "**2.0 × 10⁻⁵**",
            "**73.2%**",
          ],
          [
            "**Empty vector vs PBS (pre-specified)**",
            "**1.5 × 10⁻⁵**",
            "**61.3%**",
          ],
        ],
      },
      {
        type: "prose",
        paragraphs: [
          "Values are n = 5 per group.",
          "All three comparisons reach significance, and all three TGIs exceed the pre-specified minimum important effect (TGI ≥ 50%).",
          "**Pre-specified comparisons.** The design report pre-specifies all three pairwise contrasts, in a stated hierarchy. **Combined vaccine vs PBS** answers the question the experiment was built around — whether the vaccine inhibits tumour growth relative to untreated animals — and is the primary comparison. **Empty vector vs PBS** measures what the delivery platform contributes on its own. **Vaccine vs empty vector** isolates what the antigen-encoding sequence adds. Multiplicity across the three is controlled by the Holm procedure. The three contrasts are not independent — the third is the difference between the first two — so the set is designed to decompose a single effect into its components rather than to test three separate hypotheses, and the hierarchy records which claim each contrast is licensed to support.",
          '**Tumour-free animals.** The smallest endpoint volumes were 196 / 75 / 12.5 mm³ in the three groups: **no group contained a tumour-free animal**, so the pre-specified "do not exclude tumour-free animals" rule was never invoked.',
          "**Interpretation**｜Four points bear on how this result should be read.",
          "**First, the groups are indistinguishable at Week 2 and separate from Week 3 onwards.** At **Week 2 (D7)** — the first timepoint at which any tumour is measurable — the three-group ANOVA gives **P = 0.81** (4.80 / 4.80 / 4.48 mm³, essentially identical), which rules out the most common confounder: that the groups differed from the outset because of inoculation technique. **It is not strictly a pre-treatment baseline**, since the first dose was given at D0, but one week is too short for an immune effect to have accumulated. From Week 3 (D14) all three pairwise comparisons are significant (Holm-corrected P = 0.0002–0.004), and the gaps widen every week thereafter; endpoint Holm-corrected P values range from 8.4 × 10⁻⁷ to 2.0 × 10⁻⁵.",
          'One point should be stated plainly: **separation appears at Week 3 — D14, two weeks after inoculation — which sits at the early edge of the classical kinetics of "an adaptive response needs 2–3 weeks to build an effector pool"**. Note, too, that **the empty-vector group is already significantly below PBS at that same timepoint** (26.70 vs 65.80), indicating that part of this early separation is **innate/adjuvant** rather than antigen-specific. The vaccine-versus-empty-vector gap likewise opens at Week 3 and widens thereafter (13.92 vs 26.70 → 24.20 vs 90.36); that component is the antigen\'s contribution.',
          "**Second, the pre-specified antigen contrast (vaccine vs empty vector) meets the pre-specified effect-size threshold.** Endpoint TGI is **73.2%**, comfortably above the minimum biologically important effect we set before the experiment (TGI ≥ 50%), with **P = 2.0 × 10⁻⁵** after Holm correction. Under the pre-specified comparison framework described in §9.2 (Design & Readout), this result **supports the presence of a substantial contribution to tumour inhibition attributable to the antigen-encoding sequence**.",
          "**Third, the empty-vector group again quantifies the adjuvant contribution.** The empty vector alone achieved a TGI of **61.3%** versus PBS (Holm P = 1.5 × 10⁻⁵) — meaning the circRNA backbone and 4×mC3dP28 adjuvant **produce considerable tumour inhibition in their own right**, clearing the pre-specified minimum important effect on their own. Compared against PBS only, the vaccine's TGI is recorded as 89.6% — a figure that **includes the adjuvant's contribution alongside the antigen's**. The two numbers differ by **16.4 percentage points** (89.6% vs 73.2%), and the design is built to tell them apart: the primary comparison reports what the intervention achieves as a whole, and the antigen contrast reports how much of that the encoded sequence is responsible for. This is directionally consistent with §9.4, where the empty-vector group significantly exceeds PBS on four of five splenic metrics.",
          "**Fourth, the excised tumour photographs corroborate the growth curves.** The endpoint tumours in Figure 42 show the same three-tier size gradient as the curves, indicating that the caliper measurements are not a measurement artefact.",
          "**Limitations and scope**",
          "**On the choice of comparator.** All three contrasts are pre-specified, and each answers a different question. **Combined vs PBS** is the primary comparison: whether the vaccine inhibits tumour growth relative to untreated animals. It does not separate antigen from carrier — the circRNA backbone and the 4×mC3dP28 adjuvant produce non-specific innate immune stimulation in their own right, as the splenic flow data in §9.4 show. **Combined vs empty vector** is the contrast that isolates the antigen's contribution, and it is the figure this page uses wherever it refers to what the antigen-encoding sequence adds.",
          "**On tumour-free animals.** They are not excluded. Because dosing began on the day of inoculation, being tumour-free may be a **treatment effect** rather than a technical failure; excluding such animals would systematically remove the strongest responders and **bias the analysis against the vaccine**. These animals are analysed with an endpoint volume of 0 mm³, and the number of tumour-free animals per group is reported separately.",
          "**Limitations**｜As stated in the opening Limitations and scope of Section 9, the species‒HLA mismatch means this efficacy conclusion can only be framed as platform proof of concept. In addition, TROP2 overexpression in this 4T1 model far exceeds physiological expression in clinical TNBC (§9.1), so **in vivo efficacy is likely to be systematically overestimated** — the figures of 89.6% and 73.2% should be read as \"upper-bound performance in an idealised, antigen-enriched model\", not as a prediction of clinical efficacy.",
        ],
      },
      {
        type: "subheading",
        id: "results-6-3",
        index: "9.3",
        title:
          "9.3 Tumour immune microenvironment: CD8⁺ T infiltration and Granzyme B",
        anchorIds: ["results-section-9-3"],
      },
      {
        type: "prose",
        paragraphs: [
          "**Aim**｜Tumour growth inhibition requires a mechanistic explanation. This step looks at the **local immune microenvironment** (Gao et al., 2020): are cytotoxic CD8⁺ T cells present inside the tumour, and does the staining differ between the three treatment groups?",
          "**Design & Readout**｜**CD8 / Granzyme B dual immunofluorescence** on paraffin sections from all three groups, with negative-control sections to subtract the strong autofluorescence of necrotic tumour tissue. All three groups were processed, stained and imaged **in one batch, in randomised order, under identical exposure, gain and display settings**, so the panels can be compared with one another by eye (Experiments 7.3). Group labels were coded at the microscope as well as at review, so the field taken from each section was selected without knowledge of allocation. Three animals per group were sectioned, one field each, drawn at random from each group's 5 tumour-bearing mice — and, importantly for reading §9.3 and §9.4 together, **the same 3 animals supplied both this tumour material and the splenic material in §9.4**. This section is a **descriptive readout**; The quantitative immune data for this study are the splenic panels in §9.4.",
          "**Result**",
        ],
      },
      resultsFigure("fig46"),
      {
        type: "prose",
        paragraphs: [
          "Rows top to bottom: PBS, empty vector, vaccine, one animal per row. Columns left to right: CD8⁺ T (green), Granzyme B (red), Merge (with DAPI, blue). **Scale bar = 100 µm; all panels are at the same magnification** (1 pixel = 1.00 µm; field of view 1368 × 1020 µm). All panels are displayed at an **identical linear gain of 1.5× with no group-specific brightness or contrast adjustment**. The Merge panels were assembled from the paired single-label exposures of the same field (registration offset 0.00 px, DAPI-channel correlation r = 0.977–0.996 across all nine field pairs) and are shown for orientation. **All 18 raw images (3 groups × 3 animals × 2 channels) are deposited**, so the three fields printed here can be read against the full set.",
          "**Interpretation**｜**The three groups differ visibly in CD8⁺ staining, in the order the growth curves predict.** The PBS sections carry sparse, scattered CD8⁺ signal; the empty-vector sections carry more; the vaccine sections carry the densest CD8⁺ staining and the most Granzyme B signal. Read together with §9.2, the tumours that grew least are the tumours in which cytotoxic T cells are most visible, which is the local counterpart of the growth inhibition measured there.",
          "**What this section supports, and what it does not.** It supports the presence of CD8⁺ T cells inside vaccine-treated tumours and a consistent visual ordering of the three groups. It does not establish the size of that difference, and none of the fold-changes or P values on this page rest on it: the effect on tumour growth is quantified in §9.2 and the immune mechanism in §9.4. Nor does it establish that the intratumoural T cells are armed. That claim rests on the **splenic ICS in §9.4** alone (IFN-γ⁺ 3.11×, GzmB⁺ 4.07×, n = 3, significant after Holm correction).",
          "**Limitations and scope**",
        ],
      },
      {
        type: "list",
        ordered: true,
        start: 1,
        items: [
          "**This is a descriptive readout, and the sampling is what bounds it.** One field per animal, in 3 of the 5 animals per group, cannot capture intratumoural spatial heterogeneity, because immune infiltration is patchy within a tumour. **Acquiring 3–5 fields per animal across all 5 animals per group is what a quantitative version of this section would require**, and it is the cheapest improvement available here.",
          '**Field selection is a judgement by eye, although it was made blind.** Group labels were coded at the microscope, so the field taken from each section was chosen without knowing which group it belonged to. With one field per animal, that field was still the one judged most representative, and "representative" is a criterion a person applies rather than a rule the sampling enforces.',
          "**The identity of the Granzyme B signal has not been independently verified.** The channel's morphology is strand-like and reticular rather than granular, and no single-stain or isotype-control sections exist to separate specific staining from stromal autofluorescence. The Granzyme B panels are the weaker half of this figure, and the Granzyme B conclusion of this page rests on §9.4.",
          "**The species–MHC mismatch** (see the opening Limitations and scope of Section 9) means this mechanistic attribution — particularly, the \"**antigen-specific** CTL\" part — can only be framed as proof of concept; rigorous proof requires **tetramer staining** in an HLA-transgenic or humanised model.",
        ],
      },
      {
        type: "subheading",
        id: "results-6-4",
        index: "9.4",
        title:
          "9.4 Splenic systemic immune response: the complete chain from presentation to effector molecules",
        anchorIds: ["results-section-9-4"],
      },
      {
        type: "prose",
        paragraphs: [
          "**Aim**｜Intratumoural immunofluorescence reflects only the local microenvironment. The spleen, as the principal secondary lymphoid organ, reports directly on the **systemic** response. At endpoint (D35) we assessed the full chain — **antigen presentation → T-cell activation → memory formation → effector molecule production**.",
          "**Design & Readout**｜Splenocyte flow cytometry at endpoint, **n = 3 animals per group**, across four panels (Experiments 7.4–7.5):",
        ],
      },
      {
        type: "table",
        caption:
          "Table 30. Splenic flow-cytometry panels, markers and assessed immune functions.",
        headers: ["Panel", "Markers", "Assesses"],
        rows: [
          ["①", "CD11c + CD80 + CD86", "DC maturation"],
          ["②", "CD3 + CD8 + CD69", "CD8⁺ T early activation"],
          [
            "③",
            "CD3 + CD8 + CD44 + CD62L",
            "Central-memory phenotype (CD44⁺CD62L⁺, Tcm)",
          ],
          [
            "④",
            "CD3 + CD8 + IFN-γ + Granzyme B",
            "Intracellular effector molecules (ICS)",
          ],
        ],
      },
      {
        type: "prose",
        paragraphs: ["**Result**"],
      },
      resultsFigure("fig47"),
      resultsFigure("fig48"),
      resultsFigure("fig49"),
      resultsFigure("fig50"),
      resultsFigure("fig51"),
      {
        type: "prose",
        paragraphs: [
          "Figures 47–51 share a common layout: **representative flow plots for PBS / circRNA-vector / circRNA-antigens on the left, and the corresponding quantification bar chart on the right** (error bars = SD; pairwise P values are Holm-corrected; ns, P ≥ 0.05; *, P < 0.05; **, P < 0.01; ***, P < 0.001; ****, P < 0.0001).",
        ],
      },
      {
        type: "table",
        caption: "Table 31. Splenic flow assessment.",
        headers: [
          "Link in the chain",
          "Metric",
          "PBS",
          "Empty vector",
          "Vaccine",
          "ANOVA",
          "Vaccine vs PBS",
          "**Vaccine vs vector**",
          "Vector vs PBS",
          "Fold",
        ],
        rows: [
          [
            "① Antigen presentation",
            "DC CD80⁺CD86⁺ (%)",
            "22.43 ± 0.50",
            "32.27 ± 2.00",
            "**43.77 ± 1.42**",
            "P < 0.0001",
            "5.0 × 10⁻⁵",
            "**0.0024**",
            "0.0024",
            "1.95×",
          ],
          [
            "② T-cell activation",
            "CD69⁺CD8⁺ (%)",
            "3.98 ± 0.14",
            "5.34 ± 0.75",
            "**8.04 ± 0.74**",
            "P = 0.0005",
            "0.0022",
            "**0.023**",
            "0.037",
            "2.02×",
          ],
          [
            "③ Memory formation",
            "CD44⁺CD62L⁺CD8⁺ (%)",
            "5.30 ± 0.56",
            "8.13 ± 0.90",
            "**12.97 ± 1.89**",
            "P = 0.00084",
            "0.0076",
            "**0.020**",
            "0.020",
            "2.45×",
          ],
          [
            "④ Effector molecules",
            "IFN-γ⁺CD8⁺ (%)",
            "1.02 ± 0.08",
            "1.52 ± 0.10",
            "**3.18 ± 0.07**",
            "P < 0.0001",
            "1.2 × 10⁻⁵",
            "**3.7 × 10⁻⁵**",
            "0.0021",
            "3.11×",
          ],
          [
            "④ Effector molecules",
            "GzmB⁺CD8⁺ (%)",
            "0.71 ± 0.04",
            "1.42 ± 0.50",
            "**2.89 ± 0.12**",
            "P = 0.0003",
            "2.0 × 10⁻⁵",
            "**0.015**",
            "0.070 (ns)",
            "4.07×",
          ],
        ],
      },
      {
        type: "prose",
        paragraphs: [
          "Values are mean ± SD, n = 3 animals per group; pairwise P values are Holm-corrected.",
          "**Interpretation**｜Three points follow from this dataset.",
          "**First, all five metrics show a strictly monotonic PBS < empty vector < vaccine ordering, and both the vaccine-vs-PBS and vaccine-vs-vector comparisons survive Holm correction on all five.** Five distinct immunological readouts, spanning four stages of the immune response, all point in the same direction. The conclusion rests on that consistency rather than on the significance of any single metric.",
          "**The vaccine-vs-vector column**: with the raw data in hand, **all five are significant** (Holm P = 0.0024 / 0.023 / 0.020 / 3.7 × 10⁻⁵ / 0.015), so the antigen increment holds up under multiplicity correction on five independent metrics.",
          '**Second, the vaccine-over-PBS fold increase rises monotonically along the entire chain**: DC maturation **1.95×** → T-cell activation **2.02×** → central-memory formation **2.45×** → IFN-γ **3.11×** → Granzyme B **4.07×**. The sequence is complete and strictly increasing across all four stages of the response, and **the largest increase sits at the most downstream link** — indicating that the vaccine does not merely enlist more T cells but genuinely **arms** them. Memory formation falls exactly where the biology predicts it should: above activation, below effector-molecule production. Note that **this rests on the splenic ICS alone**: the intratumoural Granzyme B immunofluorescence of §9.3 was excluded because the specificity of that signal is in doubt (see the §9.3 callout), so we do not claim that local and systemic chains converge on "armed" status. The qualitative CD8⁺ staining pattern in §9.3 is directionally consistent with these systemic activation and memory metrics; intratumoural infiltration density was not quantified.',
          '**Third, the empty-vector group\'s position delimits "the contribution of antigen".** The empty vector significantly exceeded PBS on **four of the five** metrics (DC, CD69, CD44/CD62L, IFN-γ), confirming that the circRNA backbone and 4×mC3dP28 adjuvant **do produce substantial non-specific innate stimulation** — on memory formation alone it reaches 1.53× over PBS. The vaccine group exceeded the empty vector on **all five**, and that increment is what can be **attributed to the antigen-encoding sequence**.',
          'The single exception is **Granzyme B: empty vector vs PBS does not reach significance (P = 0.070)**. The per-animal values explain why — the empty-vector group reads 1.11 / 1.15 / **1.99**, with the third animal well off the other two, inflating the SD to 0.50 (the other groups\' SDs are 0.04 and 0.12). **We do not exclude that point** (at n = 3, removing one leaves two, and there is no independent technical reason to call it an error); we report it as measured and plot every point. That metric is therefore recorded as "directionally consistent but not significant".',
          "This also **validates at the data level our decision in §9.2 to pre-specify the Combined vs empty vector contrast alongside Combined vs PBS**: reporting the vaccine only against PBS would credit the adjuvant's effect to the antigen. It agrees precisely with the quantified gap in §9.2 — a TGI of 89.6% against PBS but 73.2% against the empty vector. **Two independent systems (caliper tumour measurement and splenic immunophenotyping) quantify the same fact in two different ways**: the adjuvant genuinely works, but the antigen delivers an additional and separable increment.",
          "**Limitations and scope**",
          "**A species difference we handled explicitly.** The standard memory markers for **mouse** T cells are **CD44 / CD62L** (CD44⁺CD62L⁺ = central memory, Tcm; CD44⁺CD62L⁻ = effector memory, Tem), **not** the CD45RO / CCR7 pair used in the human experiments (§6.4). The panel was changed accordingly. In addition, **CD62L is sensitive to temperature and enzymatic dissociation and is readily shed**, so ice-cold buffers were used throughout and prolonged time at room temperature avoided — otherwise the central memory fraction is underestimated.",
          "**Technical points for Panel ④.** IFN-γ is detectable only after **re-stimulation with PMA (50 ng/mL) + ionomycin (1 µg/mL) for 4–6 h with BD GolgiPlug (1 µL/mL) blocking secretion**; Granzyme B is constitutively stored in cytoplasmic granules and can be stained without re-stimulation. After fixation/permeabilisation, **all washes and antibody dilutions must use Perm/Wash Buffer** — using ordinary staining buffer washes out the saponin, resealing the membrane and producing false-negative intracellular staining.",
          "**Sample size and animal allocation**",
          "**This section uses n = 3 animals per group — the same 3 as §9.3.** All five metrics have exactly three values per group in the raw data, below the n = 5 of tumour measurement in §9.2. The allocation, as ARRIVE requires it to be stated: **tumour measurement used all 5 animals per group; 3 of those 5 were then selected at random per group, and each of those 3 supplied both the spleen for this section and the tumour section for §9.3.** That is a defensible design (splenocyte preparation plus four staining panels is laborious), but it means the §9.3 images and the measurements in this section come from the same animals rather than from independent cohorts.",
          "**Limitations.** (i) The fundamental species–HLA mismatch still applies — the T-cell responses observed here cannot be shown to be **antigen-specific**; rigorous proof requires tetramer staining. (ii) ICS used **polyclonal** PMA/ionomycin re-stimulation rather than peptide re-stimulation, so it measures **overall** effector capacity, not vaccine-epitope-specific responses. (iii) **n = 3 per group, with limited power**; all five metrics survive Holm correction, but at n = 3 a single animal's variation moves the conclusion materially — Granzyme B already shows this. (iv) **The memory readout is a phenotype, not a function.** CD44⁺CD62L⁺ identifies central-memory-like cells by surface markers; it does not demonstrate recall capacity, which would require re-challenge or an adoptive-transfer experiment. The same caveat applies to the human CD45RO⁺CCR7⁻ data in §6.4.",
        ],
      },
    ],
  },
  {
    id: "results-discussion",
    index: "10",
    kicker: "",
    navLabel: "Discussion",
    title: "Discussion",
    summary: "",
    blocks: [
      {
        type: "subheading",
        id: "results-discussion-findings",
        index: "",
        title: "Integrated Findings",
      },
      {
        type: "prose",
        paragraphs: [
          "This study presents CirCure as a multi-antigen circular RNA vaccine strategy for TNBC, supported by results spanning target selection, construct generation, immune-function assays and an in vivo proof of concept. The dry-lab screen narrowed a broad peptide set to candidates for experimental testing, while the Round 1 assays showed that predicted candidates differed in measured immune activity. These findings informed the selection of epitopes from TROP2, B7-H4, Nectin-4 and LIV-1 for the Combined vaccine.",
          "The Combined vaccine was produced with a high measured circular fraction and increased several immune-response readouts, including dendritic-cell maturation, T-cell activation, effector-memory phenotype and IFN-γ secretion. In vitro, vaccine-primed cells showed strong killing of MDA-MB-231 tumour cells and substantially lower killing of the normal cell lines tested. The in vivo study also showed reduced tumour burden relative to the empty-vector control in the TROP2-overexpressing 4T1 model.",
          "Together, these findings support the feasibility of combining multiple tumour-associated epitopes in a circular RNA construct and provide preclinical evidence for further evaluation of this approach.",
        ],
      },
      {
        type: "subheading",
        id: "results-discussion-patients",
        index: "",
        title: "Potential Relevance to Patients",
      },
      {
        type: "prose",
        paragraphs: [
          "For patients with TNBC, a treatment that could address residual tumour cells after surgery would be valuable, particularly where tumour cells differ in the antigens they express. By including epitopes from four tumour-associated antigens, CirCure is designed to reduce reliance on a single target. If this multi-antigen strategy proves effective in further studies, it could offer a way to broaden immune recognition of residual disease and complement surgery and existing treatments.",
          "The low killing observed in the tested normal cell lines, alongside stronger killing of the TNBC cell line, is encouraging as an initial indication of selectivity within this assay panel. It does not establish safety in patients or show that recurrence can be prevented. Likewise, the animal study supports continued investigation of the approach but did not model treatment after surgical removal of a tumour. CirCure should therefore be viewed as a preclinical therapeutic direction, not as a demonstrated patient benefit.",
        ],
      },
      {
        type: "subheading",
        id: "results-discussion-future",
        index: "",
        title: "Limitations and Future Optimization",
      },
      {
        type: "prose",
        paragraphs: [
          "The in vivo model used wild-type BALB/c mice, whereas the vaccine epitopes were designed for human HLA-A*02:01*. This mismatch limits conclusions about whether the observed anti-tumour response was driven by the intended HLA-restricted epitopes. Testing CirCure in an HLA-A*02:01-transgenic or humanised model, alongside peptide–MHC tetramer analysis, could determine whether the vaccine induces the intended antigen-specific CD8⁺ T-cell response.",
          "The human immune-cell experiments were limited to in vitro assays, and the study did not include a postoperative residual-disease model. Further validation across independent human donors and in models that better reproduce the human tumour–immune environment is needed.",
          "Further work could also test the fully formulated circRNA-LNP product in safety studies, since the current LNP dose experiment assessed the empty carrier. Expanding epitope selection beyond HLA-A*02:01 would address the limited HLA coverage of the current design and could make the approach relevant to a broader patient population. These studies would help define the conditions under which CirCure’s multi-antigen design may be useful and what changes are needed before its therapeutic potential can be assessed more directly.",
          "Overall, CirCure provides preclinical support for continued development of a multi-antigen circular RNA vaccine strategy for TNBC. Its potential value lies in the possibility of broadening tumour recognition and contributing to postoperative treatment strategies; establishing these benefits will require further testing in models that better reflect human immunity and the post-surgical setting.",
        ],
      },
    ],
  },
  {
    id: "results-bibliography",
    index: "11",
    kicker: "",
    navLabel: "References",
    title: "References",
    summary: "",
    blocks: [
      {
        type: "feature",
        key: "results-references",
      },
    ],
  },
];
