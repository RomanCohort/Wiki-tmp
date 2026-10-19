/** Verbatim Results manuscript data; Markdown escapes and typography only are resolved. */
import type { WikiSection } from "../../components/wiki/wikiPageTypes";
import { resultsFigure } from "./resultsAssets";
export const resultsSectionsRound2Safety: WikiSection[] = [
  {
    id: "results-round2",
    index: "06",
    kicker: "",
    navLabel: "Round 2",
    title: "Round 2: Functional Validation of the Combined Vaccine",
    summary: "",
    blocks: [
      {
        type: "prose",
        paragraphs: [
          "We tested the **Combined vaccine** against three comparators — empty vector, TROP2-CTL1 and TROP2-CTL2, plus the dual-epitope TROP2-CTL1+2 — along the whole immune chain, one link at a time: **DC maturation (CD80/CD86)**, **antigen translation (anti-FLAG Western blot)**, **T-cell activation and co-stimulation (CD69, CD28)**, **effector-memory differentiation (CD45RO⁺CCR7⁻)**, **cytokine secretion (ELISpot)** and **specific killing of MDA-MB-231**. The functional assays use an empty-vector circRNA control. The anti-FLAG Western blot in §6.2 uses mock-electroporated DCs as its negative control. This section reports the six datasets in that order.",
          "**Why TROP2-CTL1 and TROP2-CTL2 are the comparators, and not some other epitope.** They are the **two strongest single epitopes in the entire Round 1 panel** — 271 and 217 SFC against a panel median of 78 (Table 10). Choosing them sets the comparison at its hardest: a Combined vaccine that beat a mid-range or weak single epitope would prove very little, because almost any multi-epitope construct would do that. The claim we want to test is stronger — that combining epitopes adds something beyond taking the best one — and that claim can only be tested against the best one. The dual-epitope **TROP2-CTL1+2** group then supplies the intermediate rung, so the four epitope-carrying groups form a ladder of increasing epitope content — **single → dual → eight-epitope Combined** — at constant backbone, constant adjuvant and constant electroporation. Read in that order, the series answers two questions at once: whether the Combined vaccine works at all (against the Blank), and whether multivalency itself is worth the extra construction (against the best single epitope and the best pair).",
          "**A key control choice for this whole section.** Every group is baselined against the **Blank group**, and the Blank group was electroporated with an **empty backbone circRNA encoding no epitopes (empty vector)** — not untreated cells, and not electroporation buffer alone.",
          'This choice makes the Blank group subtract three backgrounds at once: **electroporation stress itself**, **innate stimulation by the circRNA backbone through cytosolic sensors such as RIG-I/MDA5**, and **the effect of the 4×mC3dP28 adjuvant module**. Consequently, **the entire increment from Blank to Combined can only come from the epitope-encoding sequence**. This is not a "blank" control but a strict **vector control**, and it is what allows the in vitro results on this page to be attributed to antigen at all. Cell number, volume and programme (Nucleofector II, Program U-002) were identical across all groups.',
        ],
      },
      {
        type: "subheading",
        id: "results-4-1",
        index: "6.1",
        title: "6.1 DC maturation: upregulation of CD80/CD86",
        anchorIds: ["results-section-6-1"],
      },
      {
        type: "prose",
        paragraphs: [
          "**Aim**｜To prime T cells effectively, DCs must not only present antigen (signal 1) but also upregulate co-stimulatory molecules (signal 2). This step tests each construct's ability to drive DC maturation — a **precondition** for everything downstream.",
          "**Design & Readout**｜**CD80⁺CD86⁺** double positives on moDCs by flow across five groups (Blank / TROP2-1 / TROP2-2 / TROP2-1+2 / Combined), **n = 3** (Experiments 4.1).",
          "**Result**",
        ],
      },
      resultsFigure("fig19"),
      {
        type: "prose",
        paragraphs: [
          "(The X-axis is CD80 and the Y-axis CD86; the boxed number is the double-positive percentage.)",
        ],
      },
      resultsFigure("fig20"),
      {
        type: "prose",
        paragraphs: [
          "(Error bars are SD; *** denotes P < 0.001 for Blank vs Combined.)",
        ],
      },
      {
        type: "table",
        caption: "Table 16. DC maturation frequencies.",
        headers: [
          "Group",
          "CD80⁺CD86⁺ (%)",
          "Increase over Blank",
          "vs Blank (Holm)",
        ],
        rows: [
          ["Blank", "10.33 ± 0.55", "—", "—"],
          ["TROP2-1", "15.57 ± 0.35", "+51%", "2.7 × 10⁻⁴"],
          ["TROP2-2", "15.80 ± 0.36", "+53%", "2.7 × 10⁻⁴"],
          ["TROP2-1+2", "17.50 ± 0.30", "+69%", "1.5 × 10⁻⁴"],
          ["**Combined**", "**22.37 ± 0.31**", "**+117%**", "**2.5 × 10⁻⁵**"],
        ],
      },
      {
        type: "prose",
        paragraphs: [
          "Values are mean ± SD, n = 3.",
          "One-way ANOVA F(4,10) = 378.2, P < 0.0001. **Combined vs TROP2-1+2 also reaches significance** (Holm-corrected（Holm, 1979） P = 1.5 × 10⁻⁴), so eight epitopes still add over two. The representative flow values in Figure 18 (10.9 / 15.6 / 15.9 / 17.2 / 22.1) differ slightly from these means, as expected — the former is a single representative sample, the latter the mean of three replicates.",
          "**Interpretation**｜All epitope-encoding groups exceeded the empty-vector Blank, following a clear **epitope-complexity gradient**: single-epitope < dual-epitope < Combined, with Combined at **2.16× Blank** (Holm-corrected P = 2.5 × 10⁻⁵).",
          "**The attribution here is clean.** Because the Blank group already carries the complete circRNA backbone and the 4×mC3dP28 adjuvant, backbone innate stimulation and adjuvant activity are **identical across all four groups** and are subtracted at baseline. The rise from 10.33% to 22.37% can therefore **only come from the epitope-encoding sequence** — the translated antigenic peptides themselves promote DC maturation. This is consistent with the classical mechanism whereby increased antigen load drives uptake and processing of more exogenous protein and upregulation of co-stimulatory molecules.",
        ],
      },
      {
        type: "subheading",
        id: "results-4-2",
        index: "6.2",
        title: "6.2 Antigen translation: anti-FLAG Western blot",
        anchorIds: ["results-section-6-2"],
      },
      {
        type: "prose",
        paragraphs: [
          "**Aim**｜For the vaccine to work, the circRNA must first be **translated into protein inside DCs**. This step provides direct evidence at the protein level.",
          "**Design & Readout**｜Anti-FLAG Western blot of electroporated DCs against the **FLAG tag** carried downstream of the epitope cassette, with **β-actin** as loading control and mock-electroporated DCs as the negative control (Experiments 4.2).",
          "**Result**",
        ],
      },
      resultsFigure("fig21"),
      {
        type: "prose",
        paragraphs: [
          "The circRNA-electroporated lane shows a distinct band at **~50 kDa**, near-absent in the blank control; **β-actin (42 kDa) is comparable across lanes**, confirming equal loading.",
          '**Interpretation**｜A **FLAG-specific band at ~50 kDa with comparable β-actin across lanes** indicates that the band derives from translation of the circRNA-encoded sequence rather than from a loading difference. This closes the link "**the antigen is actually synthesised inside the cell**" — until this point, translation could only be inferred indirectly from downstream function.',
          "**Limitations and scope**",
          "**The scope of the anti-FLAG result.** The anti-FLAG blot demonstrates **translation/expression**. It does **not** directly demonstrate that the antigen is processed and presented on MHC-I at the cell surface. Presentation is supported only **indirectly**, by the downstream ELISpot, T-cell activation and specific killing data. Direct proof would require pMHC multimer staining or surface peptide elution mass spectrometry, which we could not complete within the project timeline — this is listed as future work.",
        ],
      },
      {
        type: "subheading",
        id: "results-4-3",
        index: "6.3",
        title: "6.3 T-cell activation and co-stimulation: CD69 and CD28",
        anchorIds: ["results-section-6-3"],
      },
      {
        type: "prose",
        paragraphs: [
          "**Aim**｜Test whether antigen presentation actually translates into **CD8⁺ T-cell activation**, and whether those cells receive co-stimulatory support — which determines whether effector cells survive and expand.",
          "**Design & Readout**｜**CD8⁺CD69⁺** (early activation) and **CD8⁺CD28⁺** (co-stimulation) by flow after DC–T co-culture at 1 : 20, four constructs plus Blank, **n = 3** (Experiments 4.3).",
          "**Result**",
        ],
      },
      resultsFigure("fig22"),
      resultsFigure("fig23"),
      resultsFigure("fig24"),
      resultsFigure("fig25"),
      {
        type: "prose",
        paragraphs: [
          "(Error bars in Figures 23 and 25 are SD; *** denotes P < 0.001 for Blank vs Combined.)",
        ],
      },
      {
        type: "table",
        caption:
          "Table 17. T-cell activation and co-stimulatory marker expression.",
        headers: ["Group", "CD8⁺CD69⁺ (%)", "CD8⁺CD28⁺ (%)"],
        rows: [
          ["Blank", "27.33 ± 0.40", "2.77 ± 0.60"],
          ["TROP2-1", "37.07 ± 0.25", "15.10 ± 0.70"],
          ["TROP2-2", "42.00 ± 0.62", "14.53 ± 1.19"],
          ["TROP2-1+2", "42.43 ± 0.40", "15.50 ± 0.56"],
          ["**Combined**", "**45.53 ± 0.31**", "**17.53 ± 0.45**"],
        ],
      },
      {
        type: "prose",
        paragraphs: [
          "Values are mean ± SD, n = 3.",
          "One-way ANOVA: CD69 F(4,10) = 872.7, P < 0.0001; CD28 F(4,10) = 185.8, P < 0.0001. All four circRNA groups differ from Blank at P < 0.001 after Holm correction (largest Holm P: CD69 1.1 × 10⁻⁵, CD28 2.2 × 10⁻⁴). Combined vs TROP2-1+2 is also significant on both (CD69 Holm P = 4.5 × 10⁻⁴; CD28 Holm P = 0.008).",
          "**Interpretation**｜Both dimensions agree: all circRNA groups significantly exceed Blank (CD69: P < 0.001), and **Combined is highest on both**.",
          "Worth singling out: **the fold-increase in CD28 is far larger than in CD69.** CD69 rises from 27.33% to 45.53% (**1.67-fold**), while CD28 rises from 2.77% to 17.53% (**6.34-fold**). This suggests the vaccine does more than switch on an immediate activation signal — it drives a substantial fraction of CD8⁺ T cells to express **co-stimulatory receptors**, and CD28 signalling is precisely what allows effector T cells to survive, expand and avoid anergy. This sets up mechanistically the memory differentiation observed in the next section.",
          "**Limitation.** CD28 is downregulated during terminal effector differentiation, so the chosen time point affects the readout; this is a single-time-point snapshot with no kinetic time course.",
        ],
      },
      {
        type: "subheading",
        id: "results-4-4",
        index: "6.4",
        title: "6.4 Effector-memory differentiation: CD45RO⁺CCR7⁻",
        anchorIds: ["results-section-6-4"],
      },
      {
        type: "prose",
        paragraphs: [
          "**Aim**｜A high-quality CTL response must not only activate but **differentiate towards an effector/memory phenotype** — this determines whether the response persists.",
          "**Design & Readout**｜**CD45RO⁺CCR7⁻ (effector memory)** within the CD8⁺ gate, same five groups, **n = 3** (Experiments 4.3).",
          "**Result**",
        ],
      },
      resultsFigure("fig26"),
      {
        type: "prose",
        paragraphs: [
          "(Left to right: Blank, TROP2-1, TROP2-2, TROP2-1+2, Combined.)",
        ],
      },
      resultsFigure("fig27"),
      {
        type: "prose",
        paragraphs: [
          "(Error bars are SD; *** denotes P < 0.001 for Blank vs Combined.)",
        ],
      },
      {
        type: "table",
        caption: "Table 18. Effector-memory differentiation by group.",
        headers: ["Group", "CD45RO⁺CCR7⁻ (%)", "Fold vs Blank"],
        rows: [
          ["Blank", "1.10 ± 0.36", "—"],
          ["TROP2-1", "11.03 ± 0.32", "10.0×"],
          ["TROP2-2", "12.07 ± 0.15", "11.0×"],
          ["**TROP2-1+2**", "**21.43 ± 0.90**", "**19.5×**"],
          ["**Combined**", "**21.90 ± 0.72**", "**19.9×**"],
        ],
      },
      {
        type: "prose",
        paragraphs: [
          "Values are mean ± SD, n = 3.",
          "One-way ANOVA F(4,10) = 701.1, P < 0.0001; all four circRNA groups exceed Blank at P < 0.001 (largest Holm-corrected P = 1.0 × 10⁻⁵). **Combined vs TROP2-1+2 is not significant (P = 0.52)** — two epitopes already saturate this readout, and eight add nothing further.",
          "**Interpretation**｜The separation between groups is the largest in this section: Blank at 1.10 ± 0.36% versus Combined at 21.90 ± 0.72% — a **19.9-fold difference** (Holm P = 6.0 × 10⁻⁶).",
          "More informative still is a clear **step change**: single-epitope groups (11.03%, 12.07%) sit at roughly half the level of the dual/multi-epitope groups (21.43%, 21.90%), and TROP2-1+2 vs Combined is statistically indistinguishable (P = 0.52). The pattern suggests that **what drives effector-memory differentiation is not the absolute number of epitopes but whether more than one epitope is present** — two epitopes already push differentiation to a plateau. This has direct design value: it supports multivalency, but also indicates diminishing returns from simply stacking more epitopes on this particular metric.",
          "**Limitations.** This is a phenotypic readout; functional memory (rapid recall on re-stimulation) was not tested.",
        ],
      },
      {
        type: "subheading",
        id: "results-4-5",
        index: "6.5",
        title:
          "6.5 Round 2 ELISpot: the immunogenicity advantage of multi-epitope design",
        anchorIds: ["results-section-6-5"],
      },
      {
        type: "prose",
        paragraphs: [
          "**Aim**｜Repeat the ELISpot on the four optimised constructs to **test whether multi-epitope combination outperforms single epitopes** — the core evidence for the vaccine design.",
          "**Design & Readout**｜Round 2 ELISpot, same kit and format as §5.1, reported as SFC per 10⁵ cells. **Unlike Round 1, this round carries a vector control**: the Blank group is DC electroporated with empty-vector circRNA, and it defines the background against which every other group is read. **Each group is a single well**, so every value is a single determination and this section carries no error bars and no statistical test (Experiments 4.4).",
          "**Result**",
        ],
      },
      resultsFigure("fig28"),
      {
        type: "table",
        caption: "Table 19. Round 2 ELISpot results.",
        headers: ["Group", "SFC / 10⁵ cells", "Fold vs Blank"],
        rows: [
          ["Blank", "32", "—"],
          ["TROP2-1", "198", "6.2×"],
          ["TROP2-2", "227", "7.1×"],
          ["TROP2-1+2", "298", "9.3×"],
          ["**Combined**", "**367**", "**11.5×**"],
        ],
      },
      {
        type: "prose",
        paragraphs: [
          "**Interpretation**｜The response is **strictly monotonic**: Blank 32, single epitopes 198 and 227, dual 298, Combined 367.",
          "Two steps of that ordering carry the design argument. **TROP2-1+2 (298) exceeds both TROP2-1 (198) and TROP2-2 (227), and also exceeds their arithmetic mean (212.5)**, so combining two strong epitopes from the same antigen adds to what either gives alone. **Combined (367) exceeds TROP2-1+2 (298)**, so extending the repertoire across antigens raises the response frequency further. Both comparisons are read against an **empty-vector Blank**, which is what Round 1 lacked, so the increment over background can be attributed to the epitope-encoding sequence (Sahin et al., 2026; Zeng et al., 2026).",
          "**What single wells do and do not support.** With one well per group there is no estimate of measurement scatter, so the monotonic ordering is the observation and no individual gap is claimed to be distinguishable from any other. The step from Blank to any epitope-encoding group (6.2× to 11.5×) is far larger than any step between adjacent epitope-encoding groups, which is why the attribution to the epitope-encoding sequence is the part of this result the design rests on. The §6.6 killing data, run with 3 replicate wells per condition at three E:T ratios, carry the same tier ordering and are where that ordering is tested.",
          '**Limitations.** Stimulation was polyclonal co-culture rather than **peptide re-stimulation**, so although between-group differences can be attributed to "epitope-encoding or not", SFC cannot be resolved down to any individual epitope. Replicate wells belong in any repeat of this experiment.',
        ],
      },
      {
        type: "subheading",
        id: "results-4-6",
        index: "6.6",
        title: "6.6 Specific killing of TNBC target cells: MDA-MB-231",
        anchorIds: ["results-section-6-6"],
      },
      {
        type: "prose",
        paragraphs: [
          '**Aim**｜Demonstrate that vaccine-primed T cells specifically kill genuine triple-negative breast cancer cells, and test whether the advantage of multi-epitope design converts from "stronger immune response" into "actual killing capacity".',
          "**Design & Readout**｜Calcein-AM killing of **MDA-MB-231 (human TNBC, HLA-A*02:01⁺, TROP2⁺)** — unlike the K562 target of Round 1 it carries both the correct HLA type and the target antigen — at **three E:T ratios (20 : 1 / 40 : 1 / 80 : 1)**, five groups, **3 replicate wells** per condition (Experiments 4.5).",
          "**Result**",
        ],
      },
      resultsFigure("fig29"),
      {
        type: "prose",
        paragraphs: [
          "(Each point is one replicate well, with points of the same group connected; the X-axis is the E:T ratio and the Y-axis the percentage of cell death.)",
        ],
      },
      {
        type: "table",
        caption: "Table 20. Killing of MDA-MB-231.",
        headers: [
          "E:T ratio",
          "Blank",
          "TROP2-1",
          "TROP2-2",
          "TROP2-1+2",
          "**Combined**",
        ],
        rows: [
          [
            "20 : 1",
            "6.93 ± 1.55",
            "15.03 ± 4.61",
            "18.70 ± 0.96",
            "25.63 ± 4.37",
            "**33.83 ± 4.26**",
          ],
          [
            "40 : 1",
            "12.60 ± 2.72",
            "27.53 ± 2.04",
            "26.67 ± 1.35",
            "46.77 ± 3.80",
            "**55.20 ± 2.36**",
          ],
          [
            "**80 : 1**",
            "26.20 ± 3.28",
            "47.37 ± 3.21",
            "46.60 ± 2.29",
            "68.70 ± 1.40",
            "**83.57 ± 1.68**",
          ],
        ],
      },
      {
        type: "prose",
        paragraphs: [
          "Values are %, mean ± SD, n = 3 replicate wells.",
          "One-way ANOVA is P < 0.0001 at all three ratios (F = 25.5 / 130.9 / 236.5). Blank vs Combined after Holm correction: P = 0.0015 / 0.0001 / 3.4 × 10⁻⁵. **TROP2-1 and TROP2-2 do not differ at any ratio** (P = 0.25 / 0.57 / 0.75). Combined vs TROP2-1+2 reaches significance only at 80 : 1 (Holm P = 0.0006).",
          "**Interpretation**｜",
          "**First, a dose–response relationship holds.** Killing rises monotonically with E:T ratio in all five groups, with no plateau or inversion. A genuine cytotoxic effect should show exactly this dose dependence; an erratic curve would more likely indicate systematic error in the assay itself.",
          "**Second, the advantage of multi-epitope design is realised functionally, and it widens with effector dose.** At all three ratios the group ordering is **Blank < TROP2-1 ≈ TROP2-2 < TROP2-1+2 < Combined**, matching the Round 2 ELISpot ordering (32 < 198 ≈ 227 < 298 < 367) **at the level of tiers**.",
          "To be precise: **the two single epitopes cannot be distinguished by killing** — TROP2-1 vs TROP2-2 is non-significant at all three ratios (P = 0.25 / 0.57 / 0.75) and the direction actually flips between 20 : 1 and 40 : 1/80 : 1. What is consistent across the two independent readouts is the tier ordering **Blank < single < dual < eight-epitope**, not the exact four-way ranking. More telling is how the gap changes: at 20 : 1, Combined exceeds TROP2-1 by roughly 19 percentage points; by 80 : 1 the gap widens to about **36 percentage points**. This indicates that the multivalent vaccine does not merely generate *more* effector cells — the **killing efficiency per cell is also higher**, so the difference amplifies as effector numbers increase.",
          '**Third, the Blank group defines the "backbone + adjuvant" baseline, letting the antigen contribution be read off directly.** Blank-group T cells were primed by DCs carrying the **empty-vector circRNA** — they have received the full stimulus of the circRNA backbone and 4×mC3dP28 adjuvant, only without epitopes. Such effectors still kill 26.20 ± 3.28% of targets at 80 : 1 (NK-like activity plus backbone/adjuvant-driven non-specific killing). Subtracting that baseline from the Combined group\'s 83.57 ± 1.68% leaves roughly **57 percentage points attributable to the epitope-encoding sequence**. The attribution is direct: the only difference between the two groups is the presence or absence of epitopes.',
        ],
      },
    ],
  },
  {
    id: "results-dose-modeling",
    index: "07",
    kicker: "",
    navLabel: "Dose modeling",
    title: "Dose Optimization and Mechanistic Modeling",
    summary: "",
    blocks: [
      {
        type: "prose",
        paragraphs: [
          "The Round 2 assays established that the Combined vaccine activates dendritic cells, primes CD8+ T cells, drives effector-memory differentiation, and kills TROP2-positive tumor cells in vitro. Those measurements answer whether the construct works; they do not answer **what dose to use in vivo** or which steps in the delivery-expression-immune chain might **limit efficacy**. We built a mechanistic model to connect cell-level responses to animal dosing and to identify doses worth testing before an animal study.",
          "The model links **seven processes**: LNP distribution across injection site, lymph nodes, and blood; circRNA expression and innate signaling; antigen presentation; T-cell priming and effector activity; tumor growth; and immunosuppression. Cell viability, killing, DC maturation, and T-cell activation data from Rounds 1 and 2 **constrain the response functions**; published literature on RNA expression kinetics and tumor growth provides the remaining parameters. The model outputs a dose-response landscape and intermediate states at each step, allowing us to trace differences in final tumor size back to delivery, expression, or immune-activation bottlenecks.",
        ],
      },
      {
        type: "subheading",
        id: "results-dose-7-1",
        index: "7.1",
        title: "7.1 Model architecture and calibration strategy",
        anchorIds: ["results-section-7-1"],
      },
      {
        type: "prose",
        paragraphs: [
          "The model comprises seven modules with defined interfaces. Module 1 provides dose-response curves from cell assays; Module 2 calculates payload distribution across compartments; Module 3 tracks RNA expression and innate signals; Module 4 connects antigen presentation to effector activity and suppression; Module 5 simulates tumor burden; Module 6 compares doses under uncertainty; Module 7 identifies which parameters and structural choices drive the results.",
          "Experimental measurements constrain viability and killing responses **directly**. DC maturation (CD80/CD86 MFI) and T-cell activation (CD69+ percentage, IFN-γ and GzmB secretion) anchor immune-activation parameters. The **geometric mean** of three markers — percentage of activated cells at 24 h, IFN-γ concentration, and GzmB concentration — defines a **composite effector score**, weighted equally because each captures a distinct facet of the adaptive response and none had prior reason to dominate. Cross-scale parameters linking nanogram-level expression to organ-level effects remain **unvalidated** and are treated as conditional assumptions rather than calibrated quantities.",
          "The baseline scenario injects **equal doses** subcutaneously on days 0, 7, 14, 21, and 28, with follow-up to day 35. The model sweeps single-dose amounts from 0 to 30 μg in 0.1-μg steps (**301 dose levels**) and evaluates each against a joint decision rule: day-35 paired tumor burden ratio **≤ 0.70**, normalized viability **≥ 0.80**, and joint-passage probability **≥ 0.80** across parameter uncertainty.",
          "Mass conservation, time-step checks, and numerical integration (4th-order Runge-Kutta, Δt = 0.1 day) were verified. Alternative tumor-growth structures (exponential, logistic, Gompertz) and different suppression formulations were tested to confirm that the qualitative dose ranking holds across mechanistic choices.",
        ],
      },
      {
        type: "subheading",
        id: "results-dose-7-2",
        index: "7.2",
        title: "7.2 Dose-response landscape and candidate selection",
        anchorIds: ["results-section-7-2"],
      },
      {
        type: "prose",
        paragraphs: [
          "**Aim** | Identify which dose balances tumor control against exposure burden when both efficacy and viability must pass thresholds **simultaneously**.",
          "**Design & Readout** | Scan 301 dose levels from 0 to 30 μg per injection. For each dose, simulate the five-injection protocol under 1,024 parameter draws and count how many satisfy **all three criteria**: tumor ratio ≤ 0.70, viability ≥ 0.80 at all time points, and joint passage across the uncertainty distribution.",
          "**Result**",
          "**10.2 μg per injection** achieved the **highest** passage probability of **0.8145**; 10.0 μg scored 0.8115, a difference **smaller than parameter uncertainty**. The interval [9.4, 12.0] μg ∪ [12.2, 12.4] μg ∪ \\{12.6\\} μg passed all three criteria. Doses **below 9 μg** failed the tumor-control threshold; doses **above 13 μg** violated the viability floor with increasing frequency as exposure burden accumulated across five injections.",
        ],
      },
      { type: "feature", key: "results-dose-scan" },
      {
        type: "prose",
        paragraphs: [
          "**Interpretation** | The peak near 10 μg is **broad rather than sharp**, meaning small perturbations in dosing precision will **not qualitatively alter** the outcome. Higher doses raise both efficacy-passage rates and exposure costs; the 10.2-μg recommendation **balances the two** under the project-defined thresholds.",
          "The in vivo study used **10.0 μg per injection** (§9.2). The passage-probability difference between 10.0 and 10.2 μg is 0.003, which sits **within the uncertainty** of unmeasured parameters such as lymph-node delivery fraction and in-vivo RNA half-life. Practical considerations—formulation precision and pipetting reproducibility—supported the round number, and the observed tumor-growth inhibition of **89.6%** (Combined vs PBS, §9.2) confirmed **efficacy at this dose**.",
          "Each dose level produces time courses of payload in lymph nodes, functional RNA expression, antigen presentation level, effector-cell activity, and tumor burden. These **intermediate states** allow us to ask which process limits efficacy at a given dose and where additional experimental measurements would reduce uncertainty most.",
        ],
      },
      {
        type: "subheading",
        id: "results-dose-7-3",
        index: "7.3",
        title:
          "7.3 Mechanistic interpretation: where efficacy comes from and where it might fail",
        anchorIds: ["results-section-7-3"],
      },
      {
        type: "prose",
        paragraphs: [
          "**Aim** | Trace how dose translates into tumor control by examining the contributions of delivery, expression, immune priming, and killing at the 10.2-μg level.",
          "**Delivery and lymph-node accumulation** | The model assumes **40%** of injected payload reaches draining lymph nodes (Chen et al., 2022; Kubara et al., 2024), with the remainder distributed between the injection site and systemic circulation. At 10.2 μg per dose, approximately **4 μg** reaches lymph-associated compartments per injection. This fraction is the **first potential bottleneck**: if actual lymph delivery is lower, more RNA must be injected to achieve the same immune priming.",
          "**Expression and innate signaling** | CircRNA's covalently closed structure extends translation duration relative to linear mRNA (Wesselhoeft et al., 2019), and the absence of free 5' or 3' ends reduces innate immune activation (Chen et al., 2017). The model encodes these effects as **slower RNA decay** (half-life ~48 h vs. ~6 h for linear mRNA) and reduced pattern-recognition-receptor stimulation. However, LNP vehicles themselves trigger TLR and inflammasome pathways (Ndeupen et al., 2021), producing a **dose-dependent innate signal** that helps or hinders depending on magnitude. Our parameter range allows mild adjuvant benefit without overt toxicity; if actual inflammation is stronger, the viability floor may be breached earlier.",
        ],
      },
      resultsFigure("fig31"),
      {
        type: "prose",
        paragraphs: [
          "**Antigen presentation and T-cell priming** | DC maturation and antigen presentation **saturate** as peptide-MHC complexes fill available grooves and co-stimulatory molecules reach expression ceilings. The Round 2 DC data (CD80/CD86 upregulation) constrain the steepness of this saturation. The model shows that at 10.2 μg, presentation **approaches but does not fully saturate**, leaving room for modest gains if expression efficiency improves. T-cell activation, measured by CD69 upregulation and cytokine secretion, follows presentation with a **lag**. The effector score peaks 1–2 days after each injection and decays with a time constant informed by in-vitro activation kinetics.",
          "**Tumor growth and killing competition** | The baseline tumor-growth model is Gompertzian (Benzekry et al., 2014), reflecting **density-dependent slowdown** as tumors approach carrying capacity. Effector-mediated killing opposes this growth; the net result is a **race between proliferation and immune clearance**. At the recommended dose, the model predicts **moderate tumor-growth inhibition** (TGI ~50–60% relative to untreated controls by day 35), but **not complete eradication**. Immunosuppression, modeled as a function of tumor burden and regulatory signals, rises as tumors grow, creating a **negative feedback loop** that limits late-stage efficacy.",
          "**Ablation studies** | Removing innate signaling entirely reduces efficacy-passage rates by **~15 percentage points**, confirming that controlled inflammation aids priming. **Eliminating suppression** raises passage rates by **~20 points**, showing that immune inhibition is the **larger constraint** at this dose level. Doubling the expression half-life shifts the optimal dose **downward by ~1 μg**, illustrating the leverage of improving RNA stability.",
        ],
      },
      {
        type: "subheading",
        id: "results-dose-7-4",
        index: "7.4",
        title: "7.4 Sensitivity analysis and parameter influence",
        anchorIds: ["results-section-7-4"],
      },
      {
        type: "prose",
        paragraphs: [
          "**Aim** | Identify which uncertainties matter **most** and which cell measurements most strongly constrain model predictions.",
          "**Method** | Variance-based sensitivity analysis on 16 key parameters: payload-distribution fractions, RNA decay rate, presentation saturation, effector potency, tumor growth rate, and suppression strength.",
        ],
      },
      resultsFigure("fig32"),
      {
        type: "prose",
        paragraphs: [
          "**Result** | Tumor intrinsic growth rate and effector killing potency together account for **>50% of variance** in day-35 tumor burden. Lymph-node delivery fraction contributes **~15%**, and RNA expression half-life **~10%**. DC saturation level and suppression strength each contribute ~5–8%. The remaining parameters (injection-site retention, blood clearance, innate-signal amplitude) collectively explain **<10%**.",
          "**Interpretation** | Measuring actual lymph delivery (e.g., via radiolabeled or fluorescent LNPs) and in-vivo RNA expression kinetics (e.g., via luciferase reporters) would **reduce uncertainty more** than refining the already-constrained cell-killing curves. Characterizing tumor growth rates in the specific 4T1-TROP2 model and quantifying suppressive mechanisms (Treg infiltration, checkpoint expression) would **narrow the efficacy predictions** further.",
          "**Robustness checks** | Switching from Gompertzian to logistic tumor growth changed the absolute day-35 volumes but left the dose ranking **nearly unchanged** (Spearman ρ > 0.95). Varying the time step from 0.05 to 0.2 days altered trajectories by **<2%**, confirming numerical stability. Using exponential rather than linear viability penalties shifted the optimal dose by **<0.5 μg**. The 10.2-μg recommendation is thus **robust** to these structural choices.",
        ],
      },
      {
        type: "subheading",
        id: "results-dose-7-5",
        index: "7.5",
        title: "7.5 Comparison with pilot animal data",
        anchorIds: ["results-section-7-5"],
      },
      {
        type: "prose",
        paragraphs: [
          "**Aim** | Compare model predictions against independent pilot animal measurements to assess **directional validity**.",
          "The observed day-35 mean tumour volume in the treated group was **24.20 ± 9.72 mm³** (n=5), compared to **233.64 ± 28.33 mm³** (n=5) in the untreated control (mean ± SD; §9.2, Table 27). The observed ratio is **0.104**, falling **well below** the model's 0.70 efficacy threshold. The baseline model's central prediction was ~80 mm³ for treated and ~200 mm³ for control (ratio ~0.40), meaning the actual treatment effect was **stronger than the median prediction** but **within the 95% uncertainty interval**.",
        ],
      },
      resultsFigure("fig33"),
      {
        type: "prose",
        paragraphs: [
          "Splenic CD8+ T-cell percentages and IFN-γ+ frequencies were **elevated** in treated animals relative to controls, directionally consistent with the model's T-cell activation module. However, the experimental protocol differed from the modeled schedule (actual dosing days and tumor inoculation timing were not perfectly aligned), so **quantitative agreement was not expected**.",
          "**Interpretation** | The **directional efficacy** (tumor suppression and immune activation) is confirmed. The model's dose recommendation was **not contradicted** — efficacy was observed, and viability remained acceptable. The quantitative mismatch in absolute tumor size highlights the **cross-scale gap**: improving predictions requires measuring in-vivo expression levels, actual lymph delivery, and baseline tumor-growth parameters in the target model.",
          "**Mismatch sources** | The model assumed five equal doses on a rigid schedule; the actual study used a **modified regimen**. The model's cross-scale parameters (nanogram RNA to microgram antigen equivalence) were **not independently validated** and remain the largest source of absolute-volume uncertainty. The Gompertz carrying capacity and baseline growth rate were taken from literature on 4T1 tumors but **not confirmed** in this specific TROP2-overexpressing line.",
        ],
      },
      {
        type: "subheading",
        id: "results-dose-7-6",
        index: "7.6",
        title: "7.6 Limitations and scope",
        anchorIds: ["results-section-7-6"],
      },
      {
        type: "prose",
        paragraphs: [
          'This is a **conditional design tool**, not a validated predictor. The 10.2-μg recommendation assumes the stated delivery fractions, expression kinetics, and tumor-growth parameters. If those assumptions are wrong, the optimal dose will differ. The model outputs a **testable hypothesis** ("doses near 10 μg should balance efficacy and exposure") and a framework for revising that hypothesis as new measurements arrive.',
          "**What remains unmeasured** | Lymph-node delivery fraction (assumed 40%, **not measured**); in-vivo RNA half-life (assumed ~48 h from circRNA literature, **not measured** in this system); actual tumor growth rate in 4T1-TROP2 cells (taken from literature on parental 4T1); suppression mechanisms and their kinetics (modeled phenomenologically, **not mechanistically validated**).",
          "The model's efficacy predictions span a **fourfold range** (day-35 tumor burden 40–160 mm³ in the 2.5th–97.5th percentile) because these cross-scale parameters are uncertain. Narrowing that range requires **in-vivo measurements**, not more cell-assay replicates.",
          'The joint passage rule is a **project-specific decision**. The thresholds (tumor ratio ≤ 0.70, viability ≥ 0.80, probability ≥ 0.80) were chosen by the team to define "acceptable" outcomes for this stage of development. Different thresholds would yield different dose recommendations.',
          'The model does **not replace** wet-lab work; it **organizes** it. The recommendation is "test doses around 10 μg and measure intermediate states to learn which assumptions limit accuracy." If 10.2 μg fails in vivo, the model\'s intermediate outputs point to **where** — delivery, expression, priming, or killing — to look for the failure.',
        ],
      },
      {
        type: "subheading",
        id: "results-dose-outcome",
        index: "",
        title: "What left this section",
      },
      {
        type: "prose",
        paragraphs: [
          "A mechanistic model connecting cell responses to animal dosing identified **10.2 μg per injection** as the dose balancing tumor control and viability under the project's joint decision rule. The candidate range spans** 9.4–12.6 μg**, with efficacy-passage probability peaking **broadly** near 10 μg. Analysis of intermediate states revealed that effector activity builds through repeated dosing events, approaches presentation saturation, and competes against tumor growth and immunosuppression.",
          "Pilot animal data confirmed **directional efficacy** (90% tumor-volume reduction, immune activation observed) but showed quantitative mismatches in absolute tumor size, tracing to **unmeasured cross-scale parameters**: lymph delivery fraction, in-vivo RNA expression kinetics, and baseline tumor growth in the TROP2-overexpressing 4T1 line. The model outputs not just a dose number but a set of **testable intermediate predictions** — payload distribution, expression time course, presentation saturation — that allow systematic refinement as measurements accumulate.",
          "The recommendation is **conditional**: if delivery efficiency is lower or tumor growth faster than assumed, the effective dose must be adjusted upward. Conversely, improving circRNA stability or delivery targeting could lower the required dose.",
        ],
      },
    ],
  },
  {
    id: "results-safety",
    index: "08",
    kicker: "",
    navLabel: "Safety",
    title: "Safety: Defining the Boundaries",
    summary: "",
    blocks: [
      {
        type: "prose",
        paragraphs: [
          "The Round 2 assays assessed immune activation and tumour-cell killing, but functional activity alone does not define the boundaries of the platform. We measured three quantities that bound how CirCure can be used: **how long the circRNA survives** relative to its linear precursor, **whether vaccine-activated T cells kill normal cells**, and **what dose of the LNP carrier cells tolerate**. This section reports the degradation curves, the off-target killing panel across four normal cell lines, and the dose–viability data.",
        ],
      },
      {
        type: "subheading",
        id: "results-5-1",
        index: "8.1",
        title:
          "8.1 In vitro resistance of circRNA to degradation, compared with its linear precursor",
        anchorIds: ["results-section-8-1"],
      },
      {
        type: "prose",
        paragraphs: [
          "**Aim**｜Test the platform's core assumption — that circularity confers resistance to degradation — and inform **dosing frequency**: the longer the molecule persists, the lower the nucleic-acid dose and the fewer administrations needed for equivalent antigen expression, and the smaller the systemic exposure.",
          "**Design & Readout**｜Equal masses of purified circRNA and its linear precursor incubated in parallel at 37 °C, sampled at **0, 24, 48 and 72 h**, run side by side on one gel and quantified by densitometry against each RNA's own 0 h lane (Experiments 5.1). **The material was the Combined batch** prepared in §5.5, which also supplied circRNA for the Round 2 functional assays (Section 6) and the in vivo study (Section 9). The stability measurement therefore applies to the vaccine preparation used downstream.",
          "**Result**",
        ],
      },
      resultsFigure("fig34"),
      {
        type: "prose",
        paragraphs: [
          "(Top row circRNA, bottom row linear precursor; lanes left to right are 0, 24, 48 and 72 h. The 2000 nt marker position is indicated.)",
        ],
      },
      resultsFigure("fig35"),
      {
        type: "prose",
        paragraphs: [
          "X-axis: incubation time (h). Y-axis: fraction remaining (each RNA's 0 h = 1.0), from densitometric integration of Figure 33. **Each timepoint is a single lane measured once, so there are no error bars; the lines simply join consecutive data points and are not a fitted curve.**",
        ],
      },
      {
        type: "table",
        caption: "Table 21. Fraction of each RNA remaining.",
        headers: [
          "Time",
          "circRNA remaining",
          "Linear RNA remaining",
          "circRNA / linear",
        ],
        rows: [
          ["0 h", "1.000", "1.000", "1.0×"],
          ["24 h", "**0.719**", "0.059", "12.2×"],
          ["48 h", "0.616", "0.091", "6.8×"],
          ["72 h", "**0.395**", "0.027", "14.6×"],
        ],
      },
      {
        type: "prose",
        paragraphs: [
          "Densitometric values normalised to the DNA ladder lane; n = 1 per timepoint.",
          "**Interpretation**｜The difference in shape between the two traces is the point of this section, and it is **fully established within the first 24 h**:",
          "**Linear RNA loses 94.1% by 24 h (0.059 remaining) and then sits near baseline, while circRNA still retains 71.9% at the same timepoint.** By 72 h circRNA is still at 39.5% against 2.7% for linear RNA — a **14.6-fold difference**. Put another way: **what remains of the circRNA after three days is still more than six times what was left of the linear RNA after one.**",
          'This matches the mechanistic expectation — circRNA lacks free 5′/3′ ends and is intrinsically resistant to exonucleases (Jeck et al., 2013; Enuka et al., 2016) — and supports the platform\'s "low-frequency dosing, sustained expression" design rationale (Gong et al., 2025): the longer the molecule persists, the lower the dose and the fewer administrations needed for equivalent antigen expression.',
          "**Three boundaries of this experiment that we do not cross**",
        ],
      },
      {
        type: "list",
        ordered: true,
        start: 1,
        items: [
          '**We report only the fraction remaining at each timepoint — no half-life, decay constant or any other kinetic parameter.** Each timepoint is **a single lane with no biological replicate**, and four points are not enough to fit and test a kinetic model. Turning "39.5% remaining at 72 h" into "a half-life of X hours" would be an **extrapolation the data do not support**, so we do not make it. The lines in Figure 34 join consecutive data points and **do not represent the real trajectory between measurements**.',
          '**The linear RNA value at 48 h (0.091) exceeds that at 24 h (0.059) — it is non-monotonic**, visible in Figure 34 as a distinct upward kink. Real degradation cannot rebound, so this must be **densitometric noise in the low-signal regime**: the band is near background and integration error is substantially amplified. We report the raw values without smoothing or exclusion, but accordingly **the three linear-RNA values after 24 h should be read only as "degraded to near the limit of detection" and not interpreted point by point**.',
          '**Circular RNA migrates anomalously in native gels** (usually slower than linear RNA of the same length), so **band position cannot be used to establish circularity**; circular identity is established in §4.2 and §5.5, and this experiment answers only "how much is left".',
        ],
      },
      {
        type: "subheading",
        id: "results-5-2",
        index: "8.2",
        title:
          "8.2 Off-target cytotoxicity: do vaccine-activated T cells harm normal cells?",
        anchorIds: ["results-section-8-2"],
      },
      {
        type: "prose",
        paragraphs: [
          "**Aim**｜The most serious concern for any tumour vaccine is **on-target / off-tumour toxicity** — activated CTLs damaging normal tissues that express low levels of the cognate antigen. This experiment measures that risk directly.",
          "**Design & Readout**｜The same Calcein-AM system as the efficacy assay, with Combined-primed effector T cells against four normal human cell lines of different tissue origin, **3 replicate wells** per condition at **E:T 80 : 1 and 100 : 1** (Experiments 5.2):",
        ],
      },
      {
        type: "table",
        caption:
          "Table 22. Normal human cell lines used for off-target cytotoxicity testing.",
        headers: ["Cell line", "Tissue origin"],
        rows: [
          ["HCAEC", "coronary artery endothelium"],
          ["LX-2", "hepatic stellate"],
          ["BEAS-2B", "bronchial epithelium"],
          ["MCF12A", "normal mammary epithelium"],
        ],
      },
      {
        type: "prose",
        paragraphs: [
          "**MDA-MB-231 served as the positive control target** (high killing expected). Spontaneous- and maximum-release wells were included for every target, at **E:T ratios of 80 : 1 and 100 : 1**. Spontaneous-release, maximum-release and experimental wells were each set up **in 3 replicate wells**, so the three values recorded per cell line per ratio are **technical replicates on the same plate**.",
          "**All four normal lines were confirmed HLA-A*02:01 positive** — critical to the interpretability of this experiment; see below.",
          "**Result**",
        ],
      },
      resultsFigure("fig36"),
      {
        type: "prose",
        paragraphs: [
          "Purple bars are E:T 80 : 1, blue bars 100 : 1; **** denotes P < 0.0001. Note the **broken y-axis** (0–35% and 35–70% segments).",
        ],
      },
      {
        type: "table",
        caption: "Table 23. Off-target cytotoxicity.",
        headers: [
          "Target",
          "Tissue origin",
          "80 : 1",
          "100 : 1",
          "Specificity ratio (80 : 1)",
        ],
        rows: [
          [
            "HCAEC",
            "Coronary artery endothelium",
            "2.77 ± 0.32",
            "3.47 ± 1.35",
            "21.4×",
          ],
          ["LX-2", "Hepatic stellate", "0.78 ± 0.58", "1.31 ± 0.46", "76.1×"],
          [
            "BEAS-2B",
            "Bronchial epithelium",
            "2.67 ± 0.65",
            "2.37 ± 1.10",
            "22.2×",
          ],
          [
            "MCF12A",
            "Normal breast epithelium",
            "1.86 ± 0.48",
            "2.26 ± 0.60",
            "31.8×",
          ],
          [
            "**MDA-MB-231**",
            "**TNBC (positive control)**",
            "**59.24 ± 2.10**",
            "**62.07 ± 3.58**",
            "—",
          ],
        ],
      },
      {
        type: "prose",
        paragraphs: [
          "Values are killing %, mean ± SD, **n = 3 replicate wells on one plate**. Specificity ratio = MDA-MB-231 killing ÷ that line's killing.",
          "MDA-MB-231 versus each normal line is **P < 10⁻⁵ at both ratios** (P = 1.3–1.5 × 10⁻⁶ at 80 : 1). Pooling the four normal lines at 80 : 1 gives **2.02 ± 0.95% (n = 12), maximum single well 3.29%**.",
          "**Interpretation**｜",
          "**First, all four normal lines fall below 5%, against 59–62% for MDA-MB-231 — a 21- to 76-fold separation.** Not merely on average: **every line, every ratio, every one of the three replicate wells** is low. The highest single normal-cell measurement across all 24 wells (4 lines × 2 ratios × 3 replicate wells) is **4.90%**, in HCAEC at 100 : 1; the highest at 80 : 1 is 3.29%. The lowest MDA-MB-231 measurement is **57.11%**, so the two distributions do not overlap. The three values per condition are replicate wells on one plate, so this separation is established at plate level and has not been tested across effector-cell batches.",
          '**Second, all four normal lines are HLA-A*02:01 positive, so the low killing cannot be explained by HLA mismatch.** This matters because if the normal cells did not present HLA-A*02:01, "not killed" might simply mean the CTLs could not see them, which says nothing about antigen discrimination. With HLA typing confirmed positive, these cells **are visible to HLA-A*02:01-restricted CTLs and were nonetheless spared** — so the low killing must arise at the level of **target-antigen discrimination**, not presentation-molecule invisibility. That upgrades this section from suggestive to a genuine negative control.',
          "**Third, MCF12A is the most informative line.** It shares **tissue origin with the tumour target** (both breast epithelium) and is HLA-A*02:01⁺, making it the line most likely to express low levels of cognate antigen and be mistakenly killed. It was killed at only 1.86–2.26%, a specificity ratio of 31.8×. This is the most direct available test of on-target / off-tumour risk.",
          "**Fourth, raising the effector dose does not cost safety.** From 80 : 1 to 100 : 1 the normal lines move by at most ±0.7 percentage points, **all non-significant** (P = 0.28–0.70), while tumour killing continues to rise.",
        ],
      },
      {
        type: "subheading",
        id: "results-5-3",
        index: "8.3",
        title: "8.3 Safe dose window of the LNP delivery system",
        anchorIds: ["results-section-8-3"],
      },
      {
        type: "prose",
        paragraphs: [
          "**Aim**｜circRNA requires lipid nanoparticles (LNPs) for efficient cellular entry, but ionisable lipids are themselves cytotoxic at high doses (Hou et al., 2021; Wang et al., 2024). This step asks how much of the **carrier alone** cells tolerate, so that the delivery vehicle can be ruled out as a source of toxicity before any cargo is added.",
          "**Design & Readout**｜**Empty LNPs carrying no circRNA** applied to immature moDCs at **0 / 50 / 100 / 200 / 400 ng of LNP per well** for 24 h and read by CCK-8, **4 replicate wells per dose** with 0 ng as the 100% baseline (Experiments 5.3). No well contained cargo, so what is measured is the cytotoxicity of the lipid formulation itself.",
          "**Result**",
        ],
      },
      resultsFigure("fig37"),
      {
        type: "prose",
        paragraphs: [
          "(Empty LNP, no circRNA cargo; n ≥ 3; error bars = SD.) Viability holds at baseline across 0–200 ng, then falls sharply at 400 ng.",
        ],
      },
      {
        type: "table",
        caption: "Table 24. Dose–viability relationship for empty LNP.",
        headers: [
          "Empty-LNP dose",
          "Relative viability (mean ± SD)",
          "vs 0 ng (Holm)",
          "Assessment",
        ],
        rows: [
          ["0 ng (baseline)", "1.000 ± 0.040", "—", "—"],
          ["50 ng", "1.017 ± 0.037", "P = 0.56 (ns)", "no toxicity"],
          ["100 ng", "1.063 ± 0.047", "P = 0.26 (ns)", "no toxicity"],
          [
            "**200 ng**",
            "**1.030 ± 0.016**",
            "**P = 0.43 (ns)**",
            "**no toxicity (safe upper bound)**",
          ],
          [
            "400 ng",
            "**0.572 ± 0.058**",
            "**P = 7.6 × 10⁻⁵**",
            "clear toxicity",
          ],
        ],
      },
      {
        type: "prose",
        paragraphs: [
          "Values are n = 4 wells.",
          "One-way ANOVA F(4,15) = 95.3, P < 0.0001. **None of the 0–200 ng doses differs from baseline**; only 400 ng falls significantly.",
          "**Interpretation**｜The curve has a **plateau-then-cliff** shape, which is more informative than a slow monotonic decline:",
        ],
      },
      {
        type: "list",
        ordered: true,
        start: 1,
        items: [
          "**Viability does not fall at all between 0 and 200 ng** (fluctuating between 100% and 106%; all three doses non-significant vs baseline, Holm P = 0.26–0.56), indicating that the LNP carrier itself produces **no measurable toxicity** to DCs across this range. The slightly above-baseline reading at 100 ng (≈106%) is normal variation for a colorimetric CCK-8 readout at this scale and should not be interpreted as a proliferative effect.",
          "**At 400 ng viability drops to 57.2 ± 5.8%** (P = 7.6 × 10⁻⁵) — doubling the dose from 200 ng (103.0%) costs 44% of viability. This sharp fall is characteristic of the threshold behaviour of ionisable lipid cytotoxicity: the membrane tolerates the load below a critical concentration and decompensates rapidly above it.",
          "We therefore set **200 ng of LNP per 10⁴ DCs as the in vitro safe upper bound for the carrier**, and chose a working dose below that bound so that delivery efficiency and cell survival are secured simultaneously.",
        ],
      },
      {
        type: "prose",
        paragraphs: [
          "**Limitations and scope**",
          "**What this experiment is scoped to bound.** Every well contained **LNP only**, so the dose–viability relationship measured here belongs to the **lipid carrier**, and the window it returns is a carrier-toxicity window. The assay was designed to isolate the carrier: circRNA is itself sensed by cytosolic receptors such as RIG-I/MDA5 (§6.1), so a loaded particle delivers a stimulus an empty one does not, and the ceiling of the whole formulation is a separate quantity. The ceiling of the loaded formulation remains to be defined in a future in vivo dose-escalation study. We therefore describe 200 ng as **the carrier's** safe upper bound and do not extend it to the vaccine.",
          "**Why the in vitro and in vivo dose units are not interconvertible.** The dose unit here is **ng of empty LNP per 10⁴ DCs**; the in vivo dose is **10 µg of loaded circRNA-LNP per animal**. The denominators are entirely different (a defined number of cells versus the distribution volume and total cell count of a whole animal), so the two **cannot be converted into or compared with one another**. This experiment defines an upper bound for the in vitro working dose; the safety of the in vivo dose must be answered by an independent animal toxicology study. We state this explicitly because juxtaposing nanogram-scale in vitro data with microgram-scale in vivo doses is a common but serious interpretive error.",
          "**Other boundaries of the readout.** This is a single cell type at a single time point (24 h). CCK-8 measures mitochondrial dehydrogenase activity, so it reports metabolic viability rather than cell survival and does not distinguish apoptosis from necrosis. Repeat-dose toxicity, immunotoxicity and systemic toxicology are outside this assay and belong to the animal toxicology study above.",
        ],
      },
    ],
  },
];
