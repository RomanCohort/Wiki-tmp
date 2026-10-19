import type { WikiPageContent } from "../../components/wiki/wikiPageTypes";
import type { CitationReference } from "../citations/citationTypes";
import { descriptionFigures } from "./descriptionAssets";

/**
 * Description page — structured typed content.
 *
 * Provenance: 文案集/project/description/Description.md
 *
 * Every prose string is preserved verbatim from the source brief.
 * Editorial instructions (e.g. zip file download directives) are stripped
 * in favor of formal scientific figure blocks.
 */

export const descriptionReferences: CitationReference[] = [
  {
    id: 1,
    authors: "Sung, H. et al.",
    title: "Global cancer statistics 2024: GLOBOCAN estimates of incidence and mortality worldwide for 34 cancers in 186 countries.",
    journal: "CA: A Cancer Journal for Clinicians",
    volumeYear: "76, e70090 (2026).",
  },
  {
    id: 2,
    authors: "Obidiro, O., Battogtokh, G. & Akala, E. O.",
    title: "Triple negative breast cancer treatment options and limitations: Future outlook.",
    journal: "Pharmaceutics",
    volumeYear: "15, 1796 (2023).",
  },
  {
    id: 3,
    authors: "Bianchini, G., Balko, J. M., Mayer, I. A., Sanders, M. E. & Gianni, L.",
    title: "Triple-negative breast cancer: Challenges and opportunities of a heterogeneous disease.",
    journal: "Nat Rev Clin Oncol",
    volumeYear: "13, 674–690 (2016).",
  },
  {
    id: 4,
    authors: "Jiang, M.-P., Huang, X., Yin, Y.-M. & Tang, J.-H.",
    title: "The pathological and clinical landscape of refractory metastatic triple negative breast cancer: A narrative review.",
    journal: "Ann Transl Med",
    volumeYear: "10, 907 (2022).",
  },
  {
    id: 5,
    authors: "Yang, R. & Cui, J.",
    title: "Advances and applications of RNA vaccines in tumor treatment.",
    journal: "Mol Cancer",
    volumeYear: "23, 226 (2024).",
  },
  {
    id: 6,
    authors: "Li, Y. et al.",
    title: "Recent advances in therapeutic strategies for triple-negative breast cancer.",
    journal: "J Hematol Oncol",
    volumeYear: "15, 121 (2022).",
  },
  {
    id: 7,
    authors: "Ferguson, L. L., Curran, B., Martinez, M. & Mancuso, P.",
    title: "Triple-negative breast cancer: What is known about it?",
    journal: "Clin J Oncol Nurs",
    volumeYear: "18, E6–E11 (2014).",
  },
  {
    id: 8,
    authors: "Fancellu, A. et al.",
    title: "Outcomes after breast-conserving surgery or mastectomy in patients with triple-negative breast cancer: Meta-analysis.",
    journal: "Br J Surg",
    volumeYear: "108, 760–768 (2021).",
  },
  {
    id: 9,
    authors: "Ye, F. et al.",
    title: "Advancements in clinical aspects of targeted therapy and immunotherapy in breast cancer.",
    journal: "Mol Cancer",
    volumeYear: "22, 105 (2023).",
  },
  {
    id: 10,
    authors: "Yu, H. et al.",
    title: "Optimized circular RNA vaccines for superior cancer immunotherapy.",
    journal: "Theranostics",
    volumeYear: "15, 1420–1438 (2025).",
  },
  {
    id: 11,
    authors: "Teplensky, M. H. et al.",
    title: "Multi-antigen spherical nucleic acid cancer vaccines.",
    journal: "Nat Biomed Eng",
    volumeYear: "7, 911–927 (2023).",
  },
  {
    id: 12,
    authors: "Moseman, J. E. et al.",
    title: "Messenger RNA and plasmid DNA vaccines for the treatment of cancer.",
    journal: "Vaccines (Basel)",
    volumeYear: "13, 976 (2025).",
  },
  {
    id: 13,
    authors: "Niu, D., Wu, Y. & Lian, J.",
    title: "Circular RNA vaccine in disease prevention and treatment.",
    journal: "Signal Transduct Target Ther",
    volumeYear: "8, 341 (2023).",
  },
  {
    id: 14,
    authors: "Huang, D. et al.",
    title: "Tumour circular RNAs elicit anti-tumour immunity by encoding cryptic peptides.",
    journal: "Nature",
    volumeYear: "625, 593–602 (2024).",
  },
  {
    id: 15,
    authors: "Wesselhoeft, R. A. et al.",
    title: "RNA circularization diminishes immunogenicity and can extend translation duration in vivo.",
    journal: "Mol Cell",
    volumeYear: "74, 508-520.e4 (2019).",
  },
  {
    id: 16,
    authors: "Liu, C.-X. et al.",
    title: "Structure and degradation of circular RNAs regulate PKR activation in innate immunity.",
    journal: "Cell",
    volumeYear: "177, 865-880.e21 (2019).",
  },
  {
    id: 17,
    authors: "Yin, L., Duan, J.-J., Bian, X.-W. & Yu, S.-C.",
    title: "Triple-negative breast cancer molecular subtyping and treatment progress.",
    journal: "Breast Cancer Res",
    volumeYear: "22, 61 (2020).",
  },
  {
    id: 18,
    authors: "König, E. et al.",
    title: "Multi-antigen outer membrane vesicle engineering to develop polyvalent vaccines: The staphylococcus aureus case.",
    journal: "Front Immunol",
    volumeYear: "12, 752168 (2021).",
  },
  {
    id: 19,
    authors: "Chng, J. et al.",
    title: "Cleavage efficient 2A peptides for high level monoclonal antibody expression in CHO cells.",
    journal: "MAbs",
    volumeYear: "7, 403–412 (2015).",
  },
  {
    id: 20,
    authors: "Chen, C.-K. et al.",
    title: "Structured elements drive extensive circular RNA translation.",
    journal: "Mol Cell",
    volumeYear: "81, 4300-4318.e13 (2021).",
  },
  {
    id: 21,
    authors: "Wan, J. et al.",
    title: "Circular RNA vaccines with long-term lymph node-targeting delivery stability after lyophilization induce potent and persistent immune responses.",
    journal: "mBio",
    volumeYear: "15, e0177523 (2024).",
  },
  {
    id: 22,
    authors: "Liu, Z., Dai, Q., Yu, X., Duan, X. & Wang, C.",
    title: "Predicting circRNA-drug resistance associations based on a multimodal graph representation learning framework.",
    journal: "IEEE J Biomed Health Inform",
    volumeYear: "29, 1838–1848 (2025).",
  },
  {
    id: 23,
    authors: "Liu, G. & Gack, M. U.",
    title: "Distinct and orchestrated functions of RNA sensors in innate immunity.",
    journal: "Immunity",
    volumeYear: "53, 26–42 (2020).",
  },
  {
    id: 24,
    authors: "Rault, J.-L., Binder, R. & Grimm, H.",
    title: "Rethink farm animal production: The 3Rs.",
    journal: "Science",
    volumeYear: "378, 842 (2022).",
  },
] as const;

export const introductionData = {
  title: "Triple-Negative Breast Cancer: Clinical Challenges and Platform Rationale",
  summary:
    "TNBC lacks conventional targets and exhibits high clonal heterogeneity. CirCure responds with a multi-antigen circular RNA platform designed for the postoperative adjuvant setting.",
  paragraphs: [
    "Breast cancer is the most commonly diagnosed cancer among women worldwide (Sung et al. 2026). Among its subtypes, **triple-negative breast cancer (TNBC)** remains particularly challenging, accounting for approximately 15–20% of breast cancer cases. Because TNBC lacks estrogen receptor (ER), progesterone receptor (PR), and HER2 overexpression, patients cannot benefit from conventional hormone- or HER2-targeted therapies (Obidiro et al. 2023). Although chemotherapy, immunotherapy, targeted therapies, and antibody–drug conjugates have expanded treatment options (Bianchini et al. 2016), **early recurrence, distant metastasis, treatment resistance, and toxicity remain major clinical challenges** (Jiang et al. 2022).",
    "Our motivation to work on TNBC began during our clinical internships and **clinical investigation**, where we encountered the challenges faced by patients with advanced TNBC and discussed their treatment experiences with **oncologists, patients, nursing staff, and researchers working on nucleic-acid therapeutics** (Yang and Cui 2024; Li et al. 2022; Ferguson et al. 2014). These conversations helped us recognize a clinically important problem: for patients with advanced TNBC who undergo surgery, removal of the primary tumor does not necessarily eliminate microscopic residual or disseminated tumor cells. The possibility of **micrometastatic disease after surgery** means that preventing recurrence and distant metastasis remains an important challenge in postoperative treatment (Fancellu et al. 2021).",
    "We chose TNBC rather than another cancer type because of its **aggressive clinical course, relatively poor median survival, high risk of recurrence and metastasis, and limited availability of conventional molecular targets.** These characteristics make TNBC a particularly demanding setting in which to explore new therapeutic strategies. Our discussions with clinical and research stakeholders also led us to focus on the postoperative setting, where a therapeutic strategy capable of targeting residual tumor cells could potentially complement existing treatment rather than replace standard surgery or systemic therapy (Ye et al. 2023).",
    "A fundamental problem is that **TNBC is highly heterogeneous.** Tumors can differ in their molecular characteristics, tumor-associated antigen expression, and immune microenvironment (Bianchini et al. 2016). This means that a target expressed by one tumor-cell population may not be uniformly present across the entire tumor. When treatment or immune recognition depends on a limited number of targets, tumor cells with low or absent target expression may escape recognition and survive (Yu et al. 2025). **For postoperative patients, this heterogeneity becomes particularly important because residual microscopic tumor cells may not share the same antigenic profile.** Thus, the challenge is not simply to find another TNBC target, but to develop a therapeutic strategy capable of recognizing heterogeneous residual tumor populations more broadly (Teplensky et al. 2023).",
  ],
  vaccineRationaleIntro:
    "This challenge led us to explore **therapeutic cancer vaccines**, which can direct the immune system toward tumor-associated antigens. We chose a nucleic-acid vaccine approach because antigen sequences can be designed and combined flexibly, allowing several tumor-associated antigens to be incorporated into one therapeutic strategy.",
  vaccineFormatComparison:
    "We considered different vaccine formats, including mRNA, DNA, and protein-based vaccines, before focusing on circRNA. Compared with linear mRNA, circRNA has a covalently closed structure that provides greater resistance to exonuclease-mediated degradation and can support more sustained antigen expression. Compared with DNA-based approaches, circRNA functions in the cytoplasm without requiring nuclear entry, while protein vaccines require the production and delivery of the antigen itself (Moseman et al. 2025; Niu et al. 2023). Importantly, circRNA also has the potential to interact with innate immune sensing pathways, providing an intrinsic **adjuvant-like immunostimulatory effect** that may contribute to vaccine-induced immune activation. These characteristics made circRNA an attractive architecture for our goal of achieving **stable antigen expression together with immune stimulation** (Huang et al. 2024; Wesselhoeft et al. 2019).",
  projectInception:
    "This question became the starting point for CirCure, our exploration of a **multi-antigen circRNA vaccine for postoperative treatment of advanced TNBC.** We currently validate and apply CirCure in the postoperative adjuvant scenario of advanced TNBC as our initial clinical entry point, while our modular platform is designed to be **universally adaptable and expandable to diverse tumor types**, enabling broad application across multiple cancers in the future.",
};

export const solutionData = {
  title: "Building CirCure: A Multi-Antigen circRNA Vaccine for TNBC",
  summary:
    "An integrated platform linking candidate antigen selection, circRNA engineering, in vitro functional verification, and in vivo efficacy validation.",
  leadParagraphs: [
    "CirCure was designed to address two major challenges of TNBC: the lack of conventional therapeutic targets and the limited durability of linear RNA-based approaches. Instead of relying on a single tumor marker, our vaccine combines multiple TNBC-associated antigens within one circRNA molecule. At the same time, the covalently closed structure of circRNA provides a more stable RNA architecture and enables cap-independent translation, creating the potential for sustained antigen production (C.-X. Liu et al. 2019).",
    "Our design therefore connects **antigen selection, circRNA engineering, RNA production, delivery, and immune activation** within one vaccine platform. Rather than developing an individual construct for a single tumor antigen, we aimed to establish a modular strategy in which the antigen composition can be adapted according to different tumor antigen profiles.",
    "At this stage, we have established the major components required to evaluate this concept: **candidate antigen selection, multi-antigen circRNA design, an intron-mediated circularization workflow, molecular validation of the resulting RNA, computational evaluation of circRNA structure and immune sensing, and an in vitro functional testing route**. These components allow us to move from sequence design toward biological evaluation while keeping the individual modules experimentally distinguishable.",
  ],
  mechanismChain: [
    "Antigen selection",
    "circRNA engineering",
    "RNA production",
    "Purification & QC",
    "Cellular delivery",
    "Antigen expression & presentation",
    "CD8⁺ T-cell activation",
    "TNBC cell killing",
  ],
  antigenModule: {
    kicker: "Target selection",
    title: "Antigen Selection Module",
    paragraphs: [
      "The first challenge is deciding **what the vaccine should target**.",
      "TNBC is molecularly heterogeneous and lacks the classical ER- or HER2-based therapeutic targets found in other breast cancer subtypes (Yin et al. 2020). We therefore focused on tumor-associated antigens with relevance to TNBC and evaluated their expression and tumor specificity through literature analysis and bioinformatic screening.",
      "Our candidate set includes **Trop-2, LIV-1, Nectin-4, and B7-H4**, which provide multiple antigenic targets rather than depending on a single tumor-associated molecule.",
      "This multi-antigen strategy is intended to reduce the dependence of the vaccine on one tumor marker and provide broader coverage of heterogeneous TNBC tumors (König et al. 2021).",
    ],
  },
  circRnaDesignModule: {
    kicker: "Molecular architecture",
    title: "CircRNA Design Module",
    paragraphs: [
      "Once candidate antigens were selected, we asked a second question: **How can several tumor antigens be encoded within one stable RNA molecule?**",
      "We designed a single circRNA construct containing multiple antigen-coding sequences. **2A peptides** were introduced between antigen sequences to enable their separation during translation, while codon optimization was used to improve compatibility with human cellular translation (Chng et al. 2015).",
      "Because circRNA lacks the conventional 5′ cap and 3′ poly(A) tail, we incorporated **IRES elements** to support cap-independent translation. The design of the IRES regions was also considered in relation to RNA secondary structure, aiming to maintain an appropriate balance between structural stability and translational activity (Chen et al. 2021).",
      "Together, these elements transform multiple antigenic targets into **one programmable circRNA vaccine construct**.",
    ],
  },
  productionQcModule: {
    kicker: "In vitro synthesis & purity",
    title: "Production & Quality Control Module",
    paragraphs: [
      "A vaccine design must ultimately be converted into a validated RNA molecule.",
      "We therefore established an experimental workflow for circRNA production using **self-splicing intron-mediated circularization**, followed by purification and structural validation. RNase R treatment and other purification procedures were used to remove residual linear RNA, while complementary molecular assays were established to verify successful circularization.",
      "Our validation strategy combines **RNA purification, circularization analysis, RT-qPCR, and back-splice junction (BSJ) sequencing**, allowing us to distinguish successfully circularized RNA from linear products before proceeding to downstream functional studies.",
      "These experiments provide the first quality-control checkpoint for CirCure: **before asking whether the vaccine can activate an immune response, we first need to establish that the intended circRNA molecule has been successfully produced and sufficiently characterized.**",
      "Our experimental characterization showed that the resulting circRNA achieved a **circularization rate and purity above 90%**, providing a quality-control foundation for subsequent functional experiments. RT-qPCR and **BSJ sequencing** were used to verify successful circularization and distinguish circular products from linear RNA.",
    ],
  },
  deliveryModule: {
    kicker: "Preclinical delivery route",
    title: "Delivery Module",
    paragraphs: [
      "For future therapeutic applications, we envision **lipid nanoparticles (LNPs)** as the primary delivery system for CirCure. LNPs may protect circRNA from degradation, improve cellular uptake, and facilitate delivery to relevant target cells. This strategy is also compatible with the broader development of RNA-based therapeutic platforms.",
      "In the current in vitro validation, however, we use **electroporation** to introduce circRNA into cells efficiently. This approach provides a direct and reproducible method for evaluating the biological activity of our constructs while minimizing the influence of delivery efficiency as an independent experimental variable (Wan et al. 2024).",
      "Using electroporation allows us to focus on the intrinsic properties of CirCure, including its ability to support antigen expression and induce downstream biological responses. Delivery and therapeutic formulation remain separate areas for future optimization, particularly with respect to LNP composition, tissue targeting, administration route, and in vivo biodistribution.",
      "Therefore, the current delivery strategy serves as an experimental validation method rather than a finalized clinical formulation. It enables us to evaluate the function of circRNA under controlled conditions while maintaining a clear path toward future LNP-based delivery.",
    ],
  },
  immuneActivationModule: {
    kicker: "In vitro immunological evaluation",
    title: "Immune Activation Module",
    paragraphs: [
      "Following intracellular delivery, we evaluated whether CirCure could support sustained antigen expression and activate immune cells involved in antigen processing and presentation.",
      "**CirCure produces more sustained antigen expression than the corresponding mRNA control.** Detectable expression persisted for approximately three days, whereas the mRNA signal declined more rapidly. This finding supports the rationale for selecting circRNA as the RNA architecture of CirCure and suggests that its prolonged expression may provide a broader time window for downstream antigen processing and presentation.",
      "We next investigated the interaction between CirCure and dendritic cells. Cellular uptake and dendritic-cell activation were assessed by flow cytometry, **including analysis of the co-stimulatory molecules CD80 and CD86, together with Western blot analysis.** These experiments provided evidence that CirCure can be taken up by dendritic cells and induce activation-associated responses.",
      "CirCure also induced innate immune activation without causing pronounced cytotoxicity under the tested conditions. This finding supports the potential of circRNA to function not only as an antigen-expression platform, but also as an immunostimulatory component of the vaccine. The limited cytotoxicity observed in these experiments is important because it suggests that the detected immune responses were not primarily caused by nonspecific cellular damage.",
      "Together, these results demonstrate that CirCure can maintain antigen expression, interact with dendritic cells, and induce immune activation under in vitro conditions. These findings provide the basis for subsequent evaluation of the anti-tumor consequences of CirCure-induced immune responses in vitro and in vivo.",
    ],
  },
  inVivoValidationModule: {
    kicker: "Preclinical evidence & translational boundaries",
    title: "Tumor Killing Module",
    paragraphs: [
      "We evaluated the anti-tumor activity of CirCure at both **cellular and animal levels.**",
      "In vitro, the functional consequence of CirCure-induced immune activation was assessed using a calcein-release-based cytotoxicity assay. Under the tested conditions, **CirCure-mediated immune responses resulted in up to approximately 80% killing of TNBC cells.** This result provides initial evidence that the immune responses induced by CirCure can translate into measurable tumor-cell cytotoxicity.",
      "To further evaluate anti-tumor activity in vivo, we established an antigen-matched murine tumor model. Because the endogenous expression of key TNBC-associated antigens, including TROP2, is relatively low in wild-type 4T1 cells, we first generated a stable TROP2-overexpressing 4T1 cell line. The modified cells were validated at both the mRNA and membrane-protein levels, providing a standardized model in which tumor cells could present the selected target antigen for vaccine-induced immune recognition.",
      "We then established a syngeneic subcutaneous tumor model in immunocompetent **BALB/c mice.** CirCure LNP vaccine was administered subcutaneously on days 0, 7, 14, 21, and 28. PBS and empty circRNA vector groups were included as parallel controls to distinguish antigen-specific anti-tumor effects from nonspecific responses associated with the circRNA backbone or the LNP delivery system.",
      "Tumor growth was monitored throughout the immunization period, followed by tumor resection and endpoint measurement. These readouts enabled us to evaluate whether CirCure vaccination could suppress tumor progression and reduce tumor burden in vivo.",
      "To examine the immune basis of the observed tumor effects, we analyzed both the tumor microenvironment and systemic immune responses. **Tumor-infiltrating CD8⁺ cytotoxic T cells and Granzyme B expression** were evaluated by immunofluorescence staining to determine whether CirCure increased the recruitment and activation of cytotoxic effector cells within the tumor. In parallel, splenic immune profiling was used to assess dendritic-cell maturation, CD8⁺ T-cell activation, and the production of cytotoxic mediators, including IFN-γ and Granzyme B.",
      "Taken together, the in vitro cytotoxicity assay and the in vivo tumor model provide complementary evidence for the anti-tumor activity of CirCure. The in vitro results demonstrate that CirCure-induced immune responses can lead to TNBC cell killing, while the in vivo experiments evaluate whether this activity is associated with tumor growth control and cytotoxic immune-cell responses in an immunocompetent setting.",
      "The current model has several limitations. It uses an engineered TROP2-overexpressing murine tumor line, and species-specific differences in antigen processing and MHC presentation limit direct extrapolation to human TNBC. Therefore, these results should be interpreted as preclinical evidence supporting the feasibility and anti-tumor potential of the CirCure platform, rather than as a complete prediction of clinical efficacy. Further studies using additional tumor models and human-relevant antigen-presentation systems will be needed to define the contribution of antigen-specific CD8⁺ T cells and to support future translational development.",
    ],
  },
  designOutlook: {
    kicker: "Platform integration",
    title: "An Integrated Vaccine Platform",
    paragraphs: [
      "Each module addresses a specific limitation identified in our design process, while the overall architecture remains modular enough to be adapted to different antigen profiles.",
      "Rather than asking **“Can we make a circRNA?”**, we ask a broader question:",
      "**“Can circRNA engineering provide a flexible platform for designing multi-antigen cancer vaccines?”**",
      "CirCure therefore represents a starting point for exploring this approach in TNBC. The immediate goal is not to claim clinical efficacy, but to determine whether the engineered circRNA can successfully pass through each stage of the proposed workflow from molecular construction and quality control to antigen expression, immune activation, and tumor-cell killing.",
    ],
  },
};

export const computationalToolsData = {
  title: "Computational Tools",
  summary:
    "A dual in silico layer combining circular-aware topology and immune sensing prediction with 3R-oriented systems modeling.",
  beyondStructurePrediction: {
    kicker: "Topological prediction",
    title: "Beyond Structure Prediction",
    paragraphs: [
      "Designing a therapeutic circRNA requires us to consider more than its encoded antigen. Unlike linear RNA, circRNA forms a covalently closed molecule in which the two ends of the sequence are connected. This circular topology can influence RNA folding and stability, while sequence and structural properties may also affect interactions with innate immune sensors (Z. Liu et al. 2025).",
      "To account for these properties, we developed an advanced computational tool for **circRNA structure and immune-context analysis**. Rather than treating circRNA as a conventional linear RNA sequence, our framework incorporates the circular topology of the molecule into structural prediction.",
      "The software uses **circular-aware positional encoding and structural constraints** to preserve the topological connection between the beginning and end of the sequence. This allows us to evaluate the predicted structural characteristics and stability of candidate circRNAs before experimental synthesis.",
      "However, structural stability alone does not determine whether a circRNA is suitable for therapeutic use. We therefore incorporated several innate immune sensing pathways, including **RIG-I, TLR7, TLR8, and PKR**, into the same framework (G. Liu and Gack 2020). This enables different candidates to be evaluated from both structural and immunological perspectives.",
      "This provides CirCure with a computational layer for comparing candidate circRNAs before they enter experimental validation, helping us select designs with a more appropriate combination of structural and immunological properties.",
    ],
  },
  modelingBeforeAnimals: {
    kicker: "3R simulation",
    title: "Modeling Before Animal Experiments",
    paragraphs: [
      "We developed a **3R-oriented computational model** to reduce the need for extensive in vivo testing of circRNA vaccine candidates. By integrating **pharmacokinetic modeling with protein expression, immune response, and tumor dynamics**, our model connects the behavior of a circRNA after administration with its potential downstream therapeutic effects (Rault et al. 2022).",
      "The model describes the progression from **circRNA administration and persistence to antigen expression, immune activation, and tumor response**, allowing us to explore how changes in candidate design may propagate through the biological system. Instead of evaluating each process independently, the integrated framework provides a continuous view of the potential relationship between **circRNA properties and therapeutic response**.",
      "To support candidate selection before animal experiments, the model can be used to **compare predicted responses across different circRNA designs** and prioritize candidates for subsequent in vivo validation. In this way, computational simulation provides an additional decision-making layer before committing experimental resources, supporting the principles of **Reduction and Refinement** within the 3Rs framework.",
      "By connecting molecular design with system-level responses, our model complements the circRNA design software developed in CirCure. While the software focuses on the **structural and immunological properties of the RNA molecule**, the model extends this analysis toward its **potential behavior in vivo**, providing a computational bridge from **circRNA design to therapeutic evaluation**.",
    ],
  },
};

export const oncologyImpactData = {
  title: "Oncology Impact and Access",
  summary:
    "Positioning CirCure as an advanced-stage adjuvant platform while adhering to rigorous evidence boundaries and addressing real-world access dimensions.",
  paragraphs: [
    "CirCure is currently positioned as an **advanced-stage adjuvant therapeutic platform for TNBC**, particularly for patients whose tumors express one or more of the selected target antigens. Our project focuses on the **treatment dimension** of the Oncology Track: we aim to explore whether a multi-antigen circRNA vaccine can broaden immune recognition of heterogeneous TNBC tumors and contribute to better tumor control. At this stage, we do not define a specific postoperative or recurrent/metastatic treatment indication, as determining the appropriate clinical setting will require further preclinical and clinical evidence.",
    "For CirCure, **boosting survival rate cannot be claimed directly from an in vitro vaccine study**. We therefore define a measurable sequence of endpoints connecting our current experiments with eventual clinical outcomes. Our current experiments focus on the early stages of this chain, including circRNA circularization and purity, antigen expression and its duration, cellular uptake and immune activation, and cytotoxicity against TNBC cells. These results will help determine whether CirCure has sufficient biological activity to justify subsequent in vivo evaluation. Future animal studies will then assess tumor growth, regression, recurrence, and metastasis, while longer-term clinical studies would be required to determine whether these effects ultimately translate into improved progression-free and overall survival. In this way, **survival is treated as the ultimate clinical endpoint rather than an unsupported claim at the current stage**.",
    "However, biological efficacy alone does not determine whether a cancer therapy can contribute to **quality and equitable cancer care**. To address the access dimension of the Oncology Track, we will evaluate **manufacturability, storage stability, delivery requirements, companion biomarker requirements, and cost alongside biological efficacy**. Manufacturing evaluation will consider whether circRNA production and purification can be performed reproducibly and whether the workflow can move beyond laboratory-scale production. Storage studies will examine whether the product can maintain sufficient quality over time and under practical storage conditions. Delivery requirements will be considered together with the complexity of administration and the feasibility of the proposed delivery system. Because CirCure uses multiple tumor-associated antigens, companion biomarker requirements are also important: patient selection should be based on tumor antigen profiles rather than assuming that every TNBC patient will respond to the same antigen combination. Finally, cost and manufacturing complexity will be considered together with biological performance to identify potential barriers to broader access.",
    "We also recognize that **cancer care extends beyond the development of a therapeutic product**. Our Education activities therefore do not claim to provide clinical cancer prevention or professional patient care. Instead, they contribute to the broader care ecosystem by improving public understanding of cancer biology, synthetic biology, and biotechnology, while our project-level work focuses on developing a potential therapeutic approach. Together, these efforts allow us to address different dimensions of the Oncology Track without overstating the scope of CirCure.",
    "Ultimately, CirCure aims to move beyond the question of whether a circRNA vaccine can be engineered. We ask whether it can be developed into a **biologically effective, manufacturable, deliverable, and potentially accessible therapeutic strategy** for TNBC. Our current work establishes the experimental foundation for answering these questions, while tumor control, recurrence, metastasis, survival, and real-world accessibility remain the key challenges for subsequent stages of development.",
  ],
} as const;

export const educationData = {
  title: "Education",
  summary:
    "An outreach journey spanning children, middle school, high school, and university students to make synthetic biology and oncology accessible.",
  paragraphs: [
    "Synthetic biology connects biology, engineering, medicine, and society, yet this interdisciplinary field can be difficult to approach without suitable educational opportunities. We therefore asked how we could make synthetic biology and oncology understandable and engaging for people at different stages of learning.",
    "We built an educational journey that spans **from children to the general public**. For younger students, we use **biology card games and interactive activities** to turn scientific knowledge into play. For middle school students, we introduce synthetic biology and cancer biology through accessible and engaging courses. High school students are given the opportunity to **step into the laboratory and experience hands-on experiments**, while university students explore the broader responsibilities of biotechnology through **ethics and biosafety debates**.",
    "To extend learning beyond the classroom, we developed a **Virtual Laboratory** for students with limited access to experimental facilities and brought our science communication to the public through activities such as the **Apricot Blossom Festival**.",
    "Through these different forms of engagement, we hope to make synthetic biology not only something to **learn**, but something to **experience, question, and discuss**—encouraging more people to understand biotechnology and inspiring the next generation to participate in the field.",
  ],
};

export const futureData = {
  title: "In The Future",
  summary:
    "Scaling from an initial TNBC candidate into a modular platform adaptable across diverse tumor types and personalized medicine.",
  paragraphs: [
    "Our goal is to develop CirCure from an early-stage TNBC circRNA vaccine candidate into a **scalable platform for cancer immunotherapy**. The next stage of work will focus on completing the experimental chain from **RNA quality and antigen expression to immune activation and TNBC cell killing**, followed by in vivo validation of anti-tumor efficacy. Further refinement of our computational models will also allow candidate designs to be prioritized before animal experiments.",
    "Beyond TNBC, the modular design of CirCure could be adapted to different tumor-associated antigens and cancer types. In the long term, we hope to explore personalized vaccine design, intellectual-property development, and clinical translation. However, these remain future directions rather than completed outcomes.",
    "For us, CirCure is not the endpoint, but a starting point for exploring how synthetic biology can create more precise and adaptable cancer therapies.",
  ],
};

export const descriptionPage: WikiPageContent = {
  route: "/description",
  category: "project",
  chapter: "Project / 01 of 07",
  eyebrow: "Description · The Living Ring",
  title: "Description",
  lede: "A multi-target circular RNA strategy for triple-negative breast cancer.",
  boundary:
    "This page describes the project rationale, molecular architecture, computational evaluation, in vitro verification, and preclinical in vivo outcomes of CirCure. It establishes evidence boundaries and does not claim completed clinical translation.",
  visual: "living-ring",
  visualLabel: "Multi-antigen circular RNA platform architecture",
  visualSteps: [
    "antigen selection",
    "circrna design",
    "molecular qc",
    "invitro readout",
    "invivo efficacy",
    "clinical endpoints",
  ],
  facts: [
    {
      label: "Clinical Challenge",
      value: "TNBC lacks conventional targets and exhibits high clonal heterogeneity.",
    },
    {
      label: "Platform Format",
      value: "Covalently closed circRNA carrying multi-epitope cassette.",
    },
    {
      label: "Validation Chain",
      value: "From >90% purity & 3-day expression to ~80% killing & in vivo efficacy.",
    },
    {
      label: "Evidence Standard",
      value: "Proof of biological mechanism before claims of clinical survival.",
    },
  ],
  sections: [
    {
      id: "introduction",
      index: "01",
      kicker: "01 / Clinical Context",
      navLabel: "Introduction",
      title: introductionData.title,
      summary: introductionData.summary,
      blocks: [
        {
          type: "prose",
          paragraphs: introductionData.paragraphs.slice(0, 2),
        },
        {
          type: "prose",
          paragraphs: [introductionData.paragraphs[2]],
        },
        {
          type: "prose",
          paragraphs: [introductionData.paragraphs[3]],
        },
        {
          type: "figure",
          ...descriptionFigures.fig1,
        },
        {
          type: "prose",
          paragraphs: [introductionData.vaccineRationaleIntro],
        },
        {
          type: "prose",
          paragraphs: [introductionData.vaccineFormatComparison],
        },
        {
          type: "prose",
          paragraphs: [introductionData.projectInception],
        },
      ],
    },
    {
      id: "project-solution",
      index: "02",
      kicker: "02 / Platform Architecture",
      navLabel: "Project Solution",
      title: solutionData.title,
      summary: solutionData.summary,
      blocks: [
        {
          type: "prose",
          paragraphs: solutionData.leadParagraphs,
        },
        {
          type: "figure",
          ...descriptionFigures.fig2,
        },
        {
          type: "subheading",
          id: "antigen-module",
          index: "2.1",
          kicker: solutionData.antigenModule.kicker,
          title: solutionData.antigenModule.title,
        },
        {
          type: "prose",
          paragraphs: solutionData.antigenModule.paragraphs,
        },
        {
          type: "feature",
          key: "antigen-candidate-cards",
        },
        {
          type: "subheading",
          id: "circrna-design-module",
          index: "2.2",
          kicker: solutionData.circRnaDesignModule.kicker,
          title: solutionData.circRnaDesignModule.title,
        },
        {
          type: "prose",
          paragraphs: solutionData.circRnaDesignModule.paragraphs,
        },
        {
          type: "figure",
          ...descriptionFigures.fig3,
        },
        {
          type: "subheading",
          id: "production-qc-module",
          index: "2.3",
          kicker: solutionData.productionQcModule.kicker,
          title: solutionData.productionQcModule.title,
        },
        {
          type: "prose",
          paragraphs: solutionData.productionQcModule.paragraphs.slice(0, 4),
        },
        {
          type: "prose",
          paragraphs: [solutionData.productionQcModule.paragraphs[4]],
        },
        {
          type: "subheading",
          id: "delivery-module",
          index: "2.4",
          kicker: solutionData.deliveryModule.kicker,
          title: solutionData.deliveryModule.title,
        },
        {
          type: "prose",
          paragraphs: solutionData.deliveryModule.paragraphs,
        },
        {
          type: "subheading",
          id: "immune-activation-module",
          index: "2.5",
          kicker: solutionData.immuneActivationModule.kicker,
          title: solutionData.immuneActivationModule.title,
        },
        {
          type: "prose",
          paragraphs: solutionData.immuneActivationModule.paragraphs,
        },
        {
          type: "subheading",
          id: "invivo-validation-module",
          index: "2.6",
          kicker: solutionData.inVivoValidationModule.kicker,
          title: solutionData.inVivoValidationModule.title,
        },
        {
          type: "prose",
          paragraphs: solutionData.inVivoValidationModule.paragraphs,
        },
        {
          type: "figure",
          ...descriptionFigures.fig4,
        },
        {
          type: "prose",
          paragraphs: solutionData.designOutlook.paragraphs,
        },
      ],
    },
    {
      id: "computational-tools",
      index: "03",
      kicker: "03 / In Silico Modeling",
      navLabel: "Computational Tools",
      title: computationalToolsData.title,
      summary: computationalToolsData.summary,
      blocks: [
        {
          type: "subheading",
          id: "beyond-structure-prediction",
          index: "3.1",
          kicker: computationalToolsData.beyondStructurePrediction.kicker,
          title: computationalToolsData.beyondStructurePrediction.title,
        },
        {
          type: "prose",
          paragraphs:
            computationalToolsData.beyondStructurePrediction.paragraphs,
        },
        {
          type: "subheading",
          id: "modeling-before-animals",
          index: "3.2",
          kicker: computationalToolsData.modelingBeforeAnimals.kicker,
          title: computationalToolsData.modelingBeforeAnimals.title,
        },
        {
          type: "prose",
          paragraphs: computationalToolsData.modelingBeforeAnimals.paragraphs,
        },
        {
          type: "figure",
          ...descriptionFigures.fig5,
        },
      ],
    },
    {
      id: "oncology-impact-access",
      index: "04",
      kicker: "04 / Clinical Translation",
      navLabel: "Impact & Access",
      title: oncologyImpactData.title,
      summary: oncologyImpactData.summary,
      blocks: [
        {
          type: "prose",
          paragraphs: [...oncologyImpactData.paragraphs],
        },
        {
          type: "figure",
          ...descriptionFigures.fig6,
        },
      ],
    },
    {
      id: "education-outreach",
      index: "05",
      kicker: "05 / Science Communication",
      navLabel: "Education",
      title: educationData.title,
      summary: educationData.summary,
      blocks: [
        {
          type: "prose",
          paragraphs: educationData.paragraphs,
        },
        {
          type: "figure",
          ...descriptionFigures.fig7,
        },
      ],
    },
    {
      id: "future-directions",
      index: "06",
      kicker: "06 / Horizon",
      navLabel: "In The Future",
      title: futureData.title,
      summary: futureData.summary,
      blocks: [
        {
          type: "prose",
          paragraphs: futureData.paragraphs.slice(0, 2),
        },
        {
          type: "epigraph",
          quote: futureData.paragraphs[2],
          translationZh: "",
          attribution: "CirCure Team",
          attributionRole: "Project Manifesto",
        },
      ],
    },
    {
      id: "references",
      index: "07",
      kicker: "07 / Evidence Base",
      navLabel: "References",
      title: "References",
      summary:
        "24 peer-reviewed academic publications supporting the biological rationale, circRNA engineering principles, and clinical context of CirCure.",
      blocks: [
        {
          type: "feature",
          key: "description-references",
        },
      ],
    },
  ],
  links: [
    { path: "/engineering", label: "Engineering Success" },
    { path: "/design", label: "Molecular Design" },
    { path: "/results", label: "Results & Discussion" },
    { path: "/human-practices", label: "Clinical & Human Context" },
  ],
  next: {
    path: "/engineering",
    label: "Engineering Success",
    title: "Turning Molecular Rationale into Working Circuits",
    description: "A powerful clinical concept demands rigorous engineering. Follow four iterative DBTL cycles that transformed theoretical circRNA into functional biological hardware.",
  },
};

