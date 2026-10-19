import type { WikiSection } from "../../components/wiki/wikiPageTypes";
import type { EngineeringIterationDatum } from "./engineeringPage";

export const cycle4Iterations: EngineeringIterationDatum[] = [
  {
    id: "eng-e-4-1",
    cycle: 4,
    cycleId: "engineering-cycle-4",
    index: "4.1",
    label: "Iteration 4.1｜Establishing a verified TROP2-expressing 4T1 model cell input",
    short: "Establishing a verified TROP2-expressing 4T1 model cell input",
    teams: ["wet-lab"],
  },
  {
    id: "eng-e-4-2",
    cycle: 4,
    cycleId: "engineering-cycle-4",
    index: "4.2",
    label: "Iteration 4.2｜Turning the in vivo question into an approved Wet Lab protocol",
    short: "Turning the in vivo question into an approved Wet Lab protocol",
    teams: ["wet-lab","ihp"],
  },
  {
    id: "eng-e-4-3",
    cycle: 4,
    cycleId: "engineering-cycle-4",
    index: "4.3",
    label: "Iteration 4.3｜Modelling vaccine performance from cell-based measurements",
    short: "Modelling vaccine performance from cell-based measurements",
    teams: ["dry-lab"],
  },
  {
    id: "eng-e-4-4",
    cycle: 4,
    cycleId: "engineering-cycle-4",
    index: "4.4",
    label: "Iteration 4.4｜Evaluating doses through joint vaccine-performance criteria",
    short: "Evaluating doses through joint vaccine-performance criteria",
    teams: ["dry-lab","wet-lab"],
  },
  {
    id: "eng-e-4-5",
    cycle: 4,
    cycleId: "engineering-cycle-4",
    index: "4.5",
    label: "Iteration 4.5｜Measuring tumour control under the three-group comparison",
    short: "Measuring tumour control under the three-group comparison",
    teams: ["wet-lab"],
  },
  {
    id: "eng-e-4-6",
    cycle: 4,
    cycleId: "engineering-cycle-4",
    index: "4.6",
    label: "Iteration 4.6｜Connecting tumour control with systemic immune measurements",
    short: "Connecting tumour control with systemic immune measurements",
    teams: ["wet-lab"],
  },
  {
    id: "eng-e-4-7",
    cycle: 4,
    cycleId: "engineering-cycle-4",
    index: "4.7",
    label: "Iteration 4.7｜Examining local immune signals in tumour tissue",
    short: "Examining local immune signals in tumour tissue",
    teams: ["wet-lab"],
  },
  {
    id: "eng-e-4-8",
    cycle: 4,
    cycleId: "engineering-cycle-4",
    index: "4.8",
    label: "Iteration 4.8｜Integrating the evidence for Combined’s in vivo performance",
    short: "Integrating the evidence for Combined’s in vivo performance",
    teams: ["wet-lab","dry-lab"],
  },
];

export const cycle4Section: WikiSection = {
  id: "engineering-cycle-4",
  index: "04",
  kicker: "Cycle 4 — Evaluation",
  navLabel: "Cycle 4 — Evaluation",
  title: "Cycle 4 — Evaluation: Extending molecular and cellular evidence to in vivo evaluation",
  summary: "TIME reaches **E—Evaluation**. Building on the molecular and cellular evidence for Combined, this cycle examined whether its activity could translate into tumour control in vivo. The non-tumour-cell...",
  blocks: [
        {
          type: "prose",
          paragraphs: [
          "TIME reaches **E—Evaluation**. Building on the molecular and cellular evidence for Combined, this cycle examined whether its activity could translate into tumour control in vivo. The non-tumour-cell comparison described in Cycle 3 was conducted during the same evaluation period, complementing the animal study with a separate assessment of effects on non-tumour cells under the tested in vitro conditions. After submitting the Animal Use Form and receiving approval, we used verified TROP2-expressing 4T1 model cells to conduct a three-group comparison of PBS, empty-vector circRNA–LNP and Combined circRNA–LNP in BALB/c mice. Wet Lab measured tumour growth, splenic immune responses and local tumour signals. Dry Lab used Cell2Dose, a mathematical model informed by experimental data, to connect selected readouts with published parameters, simulate vaccine action and explore dose-related uncertainty. Together, the experimental observations and mechanistic calculations extended the evaluation of Combined from in vitro activity to tumour control and associated immune responses in the animal model."
]
        },
    {
      type: "subheading",
      id: "eng-e-4-1",
      index: "4.1",
      title: "Iteration 4.1｜Establishing a verified TROP2-expressing 4T1 model cell input",
    },
    {
      type: "dbtl",
      id: "dbtl-4-1",
      stages: [
        {
          key: "design",
          title: "Design",
          blocks: [
        {
          type: "prose",
          paragraphs: [
          "Evaluation in immunocompetent BALB/c mice required a syngeneic tumour background and a defined model target. Following consultation with Zheng Hu on tumour-model selection, Wet Lab retained 4T1 as the murine tumour background and introduced human TROP2 as the model antigen."
]
        }
          ]
        },
        {
          key: "build",
          title: "Build",
          blocks: [
        {
          type: "prose",
          paragraphs: [
          "Building on Junqi Niu’s guidance in Iteration 1.10, we consulted him again on lentiviral biosafety and model-cell preparation. Wet Lab then established a four-step BSL-2 workflow: transduction of 4T1 cells with supplier-prepared TROP2 lentivirus, GFP observation after 48–72 h, enrichment of GFP-positive singlets by flow sorting and maintenance under puromycin selection. Wild-type and modified cells were subsequently prepared in parallel for semi-quantitative RT-PCR and surface-TROP2 flow-cytometry validation (Naldini et al., 1996; Zufferey et al., 1997)."
]
        },
        {
          type: "references",
          items: [
          {
                    "label": "doi:10.1126/science.272.5259.263",
                    "text": "Naldini L, Blömer U, Gallay P, et al. In vivo gene delivery and stable transduction of nondividing cells by a lentiviral vector. *Science*. 1996;272:263–267.",
                    "href": "https://doi.org/10.1126/science.272.5259.263",
                    "hrefLabel": "doi:10.1126/science.272.5259.263"
          },
          {
                    "label": "doi:10.1038/nbt0997-871",
                    "text": "Zufferey R, Nagy D, Mandel RJ, Naldini L, Trono D. Multiply attenuated lentiviral vector achieves efficient gene delivery in vivo. *Nature Biotechnology*. 1997;15:871–875.",
                    "href": "https://doi.org/10.1038/nbt0997-871",
                    "hrefLabel": "doi:10.1038/nbt0997-871"
          }
]
        }
          ]
        },
        {
          key: "test",
          title: "Test",
          blocks: [
        {
          type: "prose",
          paragraphs: [
          "GFP fluorescence was broadly distributed across the transduced-cell field without visible rounding or detachment, supporting successful transduction without evident morphological cytotoxicity. During flow sorting, 84.1% of the remaining singlet events were GFP-positive. Semi-quantitative RT-PCR subsequently recorded a 75.83 ± 3.27-fold increase in TROP2 transcript signal relative to wild-type 4T1 cells (`P < 0.0001`, `n = 3` independent RNA extractions); because this method has a limited dynamic range, the result was interpreted as an order-of-magnitude increase rather than a calibrated expression fold change. Surface staining provided the decisive model-cell validation: 99.9% of the sorted and drug-selected cells were TROP2-positive, compared with 0% of wild-type 4T1 cells. These successive measurements established a predominantly TROP2-expressing 4T1 population for the subsequent in vivo study."
]
        },
        {
          type: "figure",
          src: "https://static.igem.wiki/teams/6056/wiki/files/pages/project/engineering/engineering-c4-01a.avif",
          width: 748,
          height: 977,
          alt: "Figure C4-01A",
          caption: "Semi-quantitative RT-PCR compared TROP2 transcript signals between wild-type and TROP2-expressing 4T1 cells. Values are mean ± SD from three independent RNA extractions; **** denotes P < 0.0001. The relative signal supports markedly increased transcription."
        },
        {
          type: "figure",
          src: "https://static.igem.wiki/teams/6056/wiki/files/pages/project/engineering/engineering-c4-01b.avif",
          width: 1340,
          height: 742,
          alt: "Figure C4-01B",
          caption: "Surface TROP2 staining compared wild-type 4T1 cells (left) with the sorted and puromycin-selected TROP2-expressing population (right). The recorded TROP2-positive fractions were 0% and 99.9%, respectively."
        },
        {
          type: "figure",
          src: "https://static.igem.wiki/teams/6056/wiki/files/pages/project/engineering/engineering-c4-01c.avif",
          width: 1340,
          height: 847,
          alt: "Figure C4-01C",
          caption: "Representative 4T1 cell fields 48–72 h after lentiviral transduction. Columns show bright-field, GFP-channel and merged images. GFP fluorescence was visible in the transduced cells. Scale bars: 200 µm."
        },
        {
          type: "figure",
          src: "https://static.igem.wiki/teams/6056/wiki/files/pages/project/engineering/engineering-c4-01d.avif",
          width: 2323,
          height: 853,
          alt: "Figure C4-01D",
          caption: "Sequential gates identified the cell population using FSC-A/SSC-A, selected singlets using FSC-A/FSC-H and identified GFP-positive cells. The respective gates retained 68.8%, 89.3% and 84.1% of their parent populations; the final value represents GFP positivity within the singlet gate."
        }
          ]
        },
        {
          key: "learn",
          title: "Learn",
          blocks: [
        {
          type: "prose",
          paragraphs: [
          "We successfully established and verified a human TROP2-expressing 4T1 cell population, providing the tumour-cell material needed to establish a TROP2-bearing tumour model in immunocompetent BALB/c mice. Wet Lab had begun animal-study planning earlier, considering control comparisons, administration arrangements, animal-welfare criteria and systemic and local immune measurements. Model-cell verification provided the defined cellular input needed to implement the evaluation of Combined’s in vivo tumour-control effect."
]
        },
        {
          type: "prose",
          paragraphs: [
          "[Further details: Experiments — TROP2-expressing 4T1 construction](https://2026.igem.wiki/jlu-fbh/experiments)"
]
        }
          ]
        }
      ]
    },
    {
      type: "subheading",
      id: "eng-e-4-2",
      index: "4.2",
      title: "Iteration 4.2｜Turning the in vivo question into an approved Wet Lab protocol",
    },
    {
      type: "dbtl",
      id: "dbtl-4-2",
      stages: [
        {
          key: "design",
          title: "Design",
          blocks: [
        {
          type: "prose",
          paragraphs: [
          "During earlier animal-study planning, we developed an evaluation framework to distinguish tumour progression, carrier-associated effects and the contribution of an antigen-encoding preparation. This framework was subsequently applied to the complete Combined preparation. Jiuwei Cui advised that tumour control should be interpreted together with systemic and local immune evidence. We therefore defined three connected endpoints: longitudinal tumour growth, splenic immune phenotypes and intratumoural CD8/Granzyme B signals (Pulaski and Ostrand-Rosenberg, 2000)."
]
        },
        {
          type: "references",
          items: [
          {
                    "label": "PMID:18432775",
                    "text": "Pulaski BA, Ostrand-Rosenberg S. Mouse 4T1 breast tumor model. *Current Protocols in Immunology*. 2000;Chapter 20 20.2.",
                    "href": "https://pubmed.ncbi.nlm.nih.gov/18432775/",
                    "hrefLabel": "PMID:18432775"
          }
]
        }
          ]
        },
        {
          key: "build",
          title: "Build",
          blocks: [
        {
          type: "prose",
          paragraphs: [
          "Wet Lab built the protocol around three groups of immunocompetent BALB/c mice: PBS, empty-vector circRNA–LNP and Combined circRNA–LNP, with five animals per group. TROP2-expressing 4T1 cells were inoculated on D0, which also marked the first administration. The study comprised five administrations, longitudinal tumour measurements and endpoint tissue collection. The protocol specified animal coding, group allocation, consistent inoculation and administration routes, humane endpoints and coordinated tissue collection. Consultation with Zhiman Li on animal ethics and the 3Rs was translated into an Experimental Design Assistant record and an Animal Use Form, with approval obtained before the animal work began (Percie du Sert et al., 2020; NC3Rs, n.d.)."
]
        },
        {
          type: "references",
          items: [
          {
                    "label": "doi:10.1371/journal.pbio.3000410",
                    "text": "Percie du Sert N, Hurst V, Ahluwalia A, et al. The ARRIVE guidelines 2.0: updated guidelines for reporting animal research. *PLoS Biology*. 2020;18:e3000410.",
                    "href": "https://doi.org/10.1371/journal.pbio.3000410",
                    "hrefLabel": "doi:10.1371/journal.pbio.3000410"
          },
          {
                    "label": "Resource",
                    "text": "NC3Rs(n.d.). *Experimental Design Assistant*.",
                    "href": "https://eda.nc3rs.org.uk/",
                    "hrefLabel": "Resource"
          }
]
        }
          ]
        },
        {
          key: "test",
          title: "Test",
          blocks: [
        {
          type: "prose",
          paragraphs: [
          "We tested the interpretability of the protocol by tracing each planned conclusion to a specific comparison. PBS versus empty vector measured the carrier and backbone background; empty vector versus Combined measured the additional effect associated with the antigen-encoding sequence; and PBS versus Combined described the overall effect of the complete preparation. Tumour measurements, splenic phenotyping and tumour-tissue imaging were then linked through the same animal identifiers. This review confirmed that every endpoint had an appropriate comparator and could be collected from the same cohort without introducing additional animals."
]
        },
        {
          type: "figure",
          src: "https://static.igem.wiki/teams/6056/wiki/files/pages/project/engineering/engineering-c4-02.avif",
          width: 1280,
          height: 591,
          alt: "Figure C4-02",
          caption: "Schematic of the PBS, empty-vector circRNA–LNP and Combined circRNA–LNP comparison, with five mice per group. The workflow includes tumour-cell inoculation, administration, tumour measurements and endpoint tumour and spleen collection."
        }
          ]
        },
        {
          key: "learn",
          title: "Learn",
          blocks: [
        {
          type: "prose",
          paragraphs: [
          "The approved protocol specified the 4T1–TROP2 model, three comparison groups, dosing schedule and endpoint measurements before animal work began. During earlier planning, Dry Lab and Wet Lab aligned the experimental context and outlined the Cell2Dose framework and its data requirements. CCK-8 and three-ratio cytotoxicity measurements were subsequently incorporated as they became available, connecting the planned experimental conditions with quantitative cell-response calibration and vaccine-action simulation."
]
        },
        {
          type: "prose",
          paragraphs: [
          "[Further details: Integrated Human Practices — animal model, readout and ethics consultations](https://2026.igem.wiki/jlu-fbh/human-practices)"
]
        }
          ]
        }
      ]
    },
    {
      type: "subheading",
      id: "eng-e-4-3",
      index: "4.3",
      title: "Iteration 4.3｜Modelling vaccine performance from cell-based measurements",
    },
    {
      type: "dbtl",
      id: "dbtl-4-3",
      stages: [
        {
          key: "design",
          title: "Design",
          blocks: [
        {
          type: "prose",
          paragraphs: [
          "Dry Lab first outlined the Cell2Dose framework and its data requirements using the planned animal-model context, comparison groups and administration schedule. Once the CCK-8 and three-ratio cytotoxicity measurements became available, we incorporated them to calibrate the core cell-response functions. Cell2Dose: A Cell-Informed Mechanistic Model for Tumor Vaccine Dose Exploration was designed to examine four complementary aspects of Combined performance: **(1) antitumour efficacy**, assessing tumour suppression; **(2) cell viability**, assessing carrier-related effects on cell survival; **(3) systemic exposure**, estimating material entering the systemic compartment; and **(4) innate immune activation**, assessing stimulation against a predefined model criterion. By connecting delivery, circRNA expression and immune responses, Cell2Dose provided a quantitative framework for comparing candidate doses across these four aspects (Wesselhoeft et al., 2018; Chen et al., 2022; Benzekry et al., 2014)."
]
        },
        {
          type: "references",
          items: [
          {
                    "label": "doi:10.1038/s41467-018-05096-6",
                    "text": "Wesselhoeft RA, Kowalski PS, Anderson DG. Engineering circular RNA for potent and stable translation in eukaryotic cells. *Nature Communications*. 2018;9:2629.",
                    "href": "https://doi.org/10.1038/s41467-018-05096-6",
                    "hrefLabel": "doi:10.1038/s41467-018-05096-6"
          },
          {
                    "label": "doi:10.1073/pnas.2207841119",
                    "text": "Chen J, Ye Z, Huang C, et al. Lipid nanoparticle-mediated lymph node-targeting delivery of mRNA cancer vaccine elicits robust CD8+ T cell response. *Proceedings of the National Academy of Sciences USA*. 2022;119:e2207841119.",
                    "href": "https://doi.org/10.1073/pnas.2207841119",
                    "hrefLabel": "doi:10.1073/pnas.2207841119"
          },
          {
                    "label": "doi:10.1371/journal.pcbi.1003800",
                    "text": "Benzekry S, Lamont C, Beheshti A, et al. Classical mathematical models for description and prediction of experimental tumor growth. *PLoS Computational Biology*. 2014;10:e1003800.",
                    "href": "https://doi.org/10.1371/journal.pcbi.1003800",
                    "hrefLabel": "doi:10.1371/journal.pcbi.1003800"
          }
]
        }
          ]
        },
        {
          key: "build",
          title: "Build",
          blocks: [
        {
          type: "prose",
          paragraphs: [
          "We built a two-part Cell2Dose workflow connecting experimental measurements to vaccine-action simulation.",
          "**(1) Parameter calibration.** Empty-LNP CCK-8 data and background-corrected killing measurements entered finite-grid Bayesian numerical integration to estimate the viability-response parameters `E50` and `h`, and the killing-response parameters `K_ET` and `n`. These two datasets formed the core cell-response calibration.",
          "**(2) Vaccine-action simulation.** Ordinary differential equations described material distribution from the subcutaneous injection site to lymph nodes, circRNA translation, innate stimulation associated with RNA and LNP, DC maturation and T-cell priming. Effector-cell killing and immune suppression then contributed to the simulated tumour response. The simulation evaluated a five-administration regimen, with published parameters and registered uncertainty ranges supporting processes beyond the measured cell responses. Immune-response inputs and animal-outcome comparisons were identified separately in the integrated evidence analysis."
]
        }
          ]
        },
        {
          key: "test",
          title: "Test",
          blocks: [
        {
          type: "prose",
          paragraphs: [
          "Calibration translated the viability and background-corrected killing measurements into quantitative response functions for Cell2Dose. The posterior median nominal input retaining half the model baseline viability, `E50`, was 407.26 ng (95% credible interval: 402.17–422.93 ng). The effector-to-target ratio producing 50% background-corrected killing, `K_ET`, was 38.08 (95% credible interval: 32.94–44.02). These fitted responses connected experimental measurements with the model’s delivery and immune processes, providing quantitative inputs for candidate-dose comparison. Haiming Song reviewed parameter identifiability, uncertainty registration and numerical checks, clarifying which quantities were constrained by measurements and which required uncertainty analysis."
]
        },
        {
          type: "figure",
          src: "https://static.igem.wiki/teams/6056/wiki/files/pages/project/engineering/engineering-c4-03a.avif",
          width: 2048,
          height: 1209,
          alt: "Figure C4-03A",
          caption: "Empty-LNP CCK-8 measurements were fitted to estimate the viability-response parameters `E50` and `h`. Orange points show observed measurements, the blue line shows the posterior median response, and shading indicates the 95% conditional mean interval. The red dashed line marks 80% of the median baseline."
        },
        {
          type: "figure",
          src: "https://static.igem.wiki/teams/6056/wiki/files/pages/project/engineering/engineering-c4-03b.avif",
          width: 2048,
          height: 1209,
          alt: "Figure C4-03B",
          caption: "Blank-corrected Combined killing measurements were fitted to estimate the effector-to-target response parameter `K_ET`. Orange points show corrected means, with error bars representing propagated observation uncertainty. The blue line shows the posterior median response, and shading indicates the 95% conditional mean interval."
        },
        {
          type: "figure",
          src: "https://static.igem.wiki/teams/6056/wiki/files/pages/project/engineering/engineering-c4-03c-2.avif",
          width: 2516,
          height: 1659,
          alt: "Figure C4-03C",
          caption: "The Cell2Dose architecture connects experimentally calibrated response functions with delivery, circRNA expression, immune responses and tumour control to support dose exploration."
        }
          ]
        },
        {
          key: "learn",
          title: "Learn",
          blocks: [
        {
          type: "prose",
          paragraphs: [
          "We established a quantitative bridge from cell measurements to vaccine-action simulation, allowing efficacy, viability, systemic exposure and innate activation to be evaluated within one framework. The next decision was to compare doses while varying parameters beyond the reach of the cell assays, so that the recommendation would reflect a range of plausible biological conditions."
]
        },
        {
          type: "prose",
          paragraphs: [
          "[Further details: Model — parameter calibration and vaccine-action simulation](https://2026.igem.wiki/jlu-fbh/model)"
]
        }
          ]
        }
      ]
    },
    {
      type: "subheading",
      id: "eng-e-4-4",
      index: "4.4",
      title: "Iteration 4.4｜Evaluating doses through joint vaccine-performance criteria",
    },
    {
      type: "dbtl",
      id: "dbtl-4-4",
      stages: [
        {
          key: "design",
          title: "Design",
          blocks: [
        {
          type: "prose",
          paragraphs: [
          "Building on the Cell2Dose framework in Iteration 4.3, we evaluated the 10 µg dose used in the animal study alongside alternative doses. We examined which doses could satisfy four performance criteria when delivery and immune-effect parameters varied together. A dose met the joint criterion when the predefined tumour-control, viability, systemic-exposure and innate-activation conditions were satisfied simultaneously in at least 80% of sampled parameter sets. This rule assessed balanced performance across the modelled biological variation."
]
        }
          ]
        },
        {
          key: "build",
          title: "Build",
          blocks: [
        {
          type: "prose",
          paragraphs: [
          "We built a dose-comparison workflow combining cell-response parameter samples with Latin hypercube sampling of uncertain model factors to form 1,024 parameter sets. These factors included `f_lymph`, the lymph-node allocation fraction, and `γ_ET`, which mapped modelled effector activity to the experimental effector-to-target scale. We evaluated 301 doses from 0 to 30 µg at 0.1-µg intervals, using the same parameter sets and five-administration model regimen throughout. For each dose, the proportion of simulations simultaneously satisfying the efficacy, viability, systemic-exposure and innate-activation criteria defined the joint pass probability, `p_joint`."
]
        }
          ]
        },
        {
          key: "test",
          title: "Test",
          blocks: [
        {
          type: "prose",
          paragraphs: [
          "The dose scan identified a favourable region around 10 µg. The joint pass probability was 81.15% at 10.0 µg, while 10.2 µg achieved the highest grid value of 81.45%. Both exceeded the predefined 80% threshold, indicating that all four criteria were satisfied together in approximately eight out of ten sampled scenarios. The 10 µg dose used in the animal study therefore lay close to the highest-scoring region of this model comparison, combining simulated tumour control with passage of the three accompanying screening conditions."
]
        },
        {
          type: "figure",
          src: "https://static.igem.wiki/teams/6056/wiki/files/pages/project/engineering/engineering-c4-04.avif",
          width: 2064,
          height: 1462,
          alt: "Figure C4-04",
          caption: "Cell2Dose evaluated 301 doses from 0 to 30 µg per injection using 1,024 shared parameter sets. Blue shows the efficacy-criterion pass fraction; orange shows the fraction passing all three proxy screens for viability, systemic exposure and innate activation; green shows the fraction satisfying all four criteria simultaneously. The dashed line marks the 80% threshold, and the vertical line identifies the highest grid value at 10.2 µg, with a joint pass probability of 81.45%."
        }
          ]
        },
        {
          key: "learn",
          title: "Learn",
          blocks: [
        {
          type: "prose",
          paragraphs: [
          "Cell2Dose showed how the interpretation of a dose depended on delivery assumptions, immune-effect parameters and the performance criteria considered together. The similar scores at 10.0 and 10.2 µg supported interpreting the result as a favourable dose region around 10 µg. This supplied a conditional computational context for the dose used in the study. Experimental tumour control was assessed through the PBS, empty-vector circRNA–LNP and Combined circRNA–LNP comparisons presented in Iteration 4.5."
]
        },
        {
          type: "prose",
          paragraphs: [
          "[Further details: Model — Cell2Dose dose evaluation](https://2026.igem.wiki/jlu-fbh/model)"
]
        }
          ]
        }
      ]
    },
    {
      type: "subheading",
      id: "eng-e-4-5",
      index: "4.5",
      title: "Iteration 4.5｜Measuring tumour control under the three-group comparison",
    },
    {
      type: "dbtl",
      id: "dbtl-4-5",
      stages: [
        {
          key: "design",
          title: "Design",
          blocks: [
        {
          type: "prose",
          paragraphs: [
          "Combined’s molecular and cellular results established the basis for testing its antitumour activity, while Iteration 4.4 evaluated dose performance computationally. The experimental assessment focused on **the vaccine’s in vivo tumour-control effect**, using endpoint tumour volume as the primary outcome and group-mean growth trajectories to describe tumour development over time. PBS and empty-vector circRNA–LNP controls distinguished the overall Combined effect from the delivery-and-backbone background."
]
        }
          ]
        },
        {
          key: "build",
          title: "Build",
          blocks: [
        {
          type: "prose",
          paragraphs: [
          "Five female BALB/c mice per group received TROP2-expressing 4T1 cells and were assigned to PBS, empty-vector circRNA–LNP or Combined circRNA–LNP. Each group received five scheduled administrations, with tumour and spleen collection at the study endpoint. Tumours were measured three times at each timepoint by a blinded operator, and the mean was retained under the individual animal identifier."
]
        }
          ]
        },
        {
          key: "test",
          title: "Test",
          blocks: [
        {
          type: "prose",
          paragraphs: [
          "Endpoint tumour volumes were 233.64±28.33 mm³ for PBS, 90.36±13.51 mm³ for empty vector and 24.20±9.72 mm³ for Combined (*n*=5 animals per group). The overall difference was supported by one-way ANOVA (*F*(2,12)=159.2, *P*=2.3×10⁻⁹). Combined produced 89.6% tumour-growth inhibition relative to PBS and 73.2% relative to empty vector, while empty vector produced 61.3% inhibition relative to PBS; all three pre-specified comparisons remained significant after Holm correction."
]
        },
        {
          type: "figure",
          src: "https://static.igem.wiki/teams/6056/wiki/files/pages/project/engineering/engineering-c4-05a.avif",
          width: 1125,
          height: 610,
          alt: "Figure C4-05A",
          caption: "Group-mean tumour volumes during the study, with five mice per group. Control denotes empty-vector circRNA–LNP, and circRNA vaccine denotes Combined circRNA–LNP. Curves describe the growth trajectories; endpoint tumour volume was the primary outcome."
        },
        {
          type: "figure",
          src: "https://static.igem.wiki/teams/6056/wiki/files/pages/project/engineering/engineering-c4-05b.avif",
          width: 520,
          height: 436,
          alt: "Figure C4-05B",
          caption: "Excised tumours collected at the study endpoint. Rows from top to bottom represent PBS, empty-vector circRNA–LNP and Combined circRNA–LNP, with five tumours per group. Background grid spacing: 1 cm."
        },
        {
          type: "table",
          caption: "Table C4-02｜Endpoint tumour volumes",
          headers: ["Group", "Individual volumes (mm³)", "Mean±SD (mm³)"],
          rows: [
            ["PBS", "224.0、196.0、225.0、267.2、256.0", "233.64±28.33"],
            ["Empty-vector circRNA–LNP", "100.0、75.0、87.5、81.3、108.0", "90.36±13.51"],
            ["Combined circRNA–LNP", "32.0、22.5、18.0、12.5、36.0", "24.20±9.72"]
          ]
        },
        {
          type: "note",
          label: "Table C4-02 note",
          body: "Each value represents one animal; five animals were analysed per group."
        }
          ]
        },
        {
          key: "learn",
          title: "Learn",
          blocks: [
        {
          type: "prose",
          paragraphs: [
          "The comparison showed that Combined achieved the strongest antitumour effect among the three groups. To interpret this difference, we considered tumour control alongside systemic immune measurements. Iteration 4.6 examines the connected evidence from splenic dendritic-cell maturation and CD8⁺ T-cell activation to memory-associated phenotypes and effector responses."
]
        },
        {
          type: "prose",
          paragraphs: [
          "[Further details: Results — in vivo tumour control](https://2026.igem.wiki/jlu-fbh/results)"
]
        }
          ]
        }
      ]
    },
    {
      type: "subheading",
      id: "eng-e-4-6",
      index: "4.6",
      title: "Iteration 4.6｜Connecting tumour control with systemic immune measurements",
    },
    {
      type: "dbtl",
      id: "dbtl-4-6",
      stages: [
        {
          key: "design",
          title: "Design",
          blocks: [
        {
          type: "prose",
          paragraphs: [
          "To determine whether Combined’s tumour control was accompanied by coordinated systemic immune activation, we arranged the splenic measurements along the immune-response chain: dendritic-cell maturation, CD8⁺ T-cell activation, memory-associated differentiation and the effector outputs IFN-γ and Granzyme B. This sequence connected antigen presentation, T-cell response and effector function within one evaluation framework."
]
        }
          ]
        },
        {
          key: "build",
          title: "Build",
          blocks: [
        {
          type: "prose",
          paragraphs: [
          "Splenocytes from three animals per group were analysed by flow cytometry. After dendritic cells and CD8⁺ T cells were identified through their respective gating strategies, CD80/CD86 co-expression was used to evaluate dendritic-cell maturation, CD69 to indicate CD8⁺ T-cell activation and CD44/CD62L to describe memory-associated differentiation. Intracellular staining further measured IFN-γ as a cytokine-response output and Granzyme B as a cytotoxic-effector indicator. Each animal was retained as an independent statistical unit."
]
        }
          ]
        },
        {
          key: "test",
          title: "Test",
          blocks: [
        {
          type: "prose",
          paragraphs: [
          "The five measurements formed a coherent systemic immune-response pattern. Empty-vector circRNA–LNP produced an intermediate increase above PBS, while Combined generated the strongest response at every stage—from dendritic-cell maturation and CD8⁺ T-cell activation to memory-associated differentiation, IFN-γ production and Granzyme B expression. Combined remained significantly higher than both controls after Holm correction across all five panels. The consistency of this pattern connected Combined’s tumour-control performance with coordinated activation of the systemic immune-response chain rather than a change in a single marker."
]
        },
        {
          type: "prose",
          paragraphs: [
          "The following five panels show representative splenic flow-cytometry plots and corresponding quantitative results. circRNA-vector/Vector denotes empty-vector circRNA–LNP, while circRNA-antigens/Antigens denotes Combined circRNA–LNP. Quantification shows mean ± SD from three animals per group; percentages within the flow plots refer to the displayed samples. For the indicated comparisons, ns denotes no significant difference, *** P < 0.001 and **** P < 0.0001."
]
        },
        {
          type: "figure",
          src: "https://static.igem.wiki/teams/6056/wiki/files/pages/project/engineering/engineering-c4-06a.avif",
          width: 1340,
          height: 495,
          alt: "Figure C4-06A",
          caption: "Representative CD80/CD86 flow plots (left) and quantification of CD80⁺CD86⁺ cells within the splenic dendritic-cell population (right), assessing the maturation-associated response at the study endpoint."
        },
        {
          type: "figure",
          src: "https://static.igem.wiki/teams/6056/wiki/files/pages/project/engineering/engineering-c4-06b.avif",
          width: 1340,
          height: 502,
          alt: "Figure C4-06B",
          caption: "Representative CD69 flow plots (left) and quantification of CD69-positive cells within the splenic CD8 T-cell population (right), assessing early activation at the study endpoint."
        },
        {
          type: "figure",
          src: "https://static.igem.wiki/teams/6056/wiki/files/pages/project/engineering/engineering-c4-06c.avif",
          width: 1340,
          height: 476,
          alt: "Figure C4-06C",
          caption: "Representative CD44/CD62L flow plots (left) and quantification of the CD44⁺CD62L⁺ population within splenic CD8 T cells (right), assessing the central-memory-associated phenotype at the study endpoint."
        },
        {
          type: "figure",
          src: "https://static.igem.wiki/teams/6056/wiki/files/pages/project/engineering/engineering-c4-06d.avif",
          width: 1340,
          height: 493,
          alt: "Figure C4-06D",
          caption: "Representative intracellular IFN-γ flow plots (left) and quantification of IFN-γ-positive cells within the splenic CD8 T-cell population (right) at the study endpoint."
        },
        {
          type: "figure",
          src: "https://static.igem.wiki/teams/6056/wiki/files/pages/project/engineering/engineering-c4-06e.avif",
          width: 1340,
          height: 531,
          alt: "Figure C4-06E",
          caption: "Representative intracellular Granzyme B flow plots (left) and quantification of Granzyme B-positive cells within the splenic CD8 T-cell population (right) at the study endpoint."
        },
        {
          type: "note",
          label: "Figure C4-06 note",
          body: "circRNA-vector/Vector denotes empty-vector circRNA–LNP, and circRNA-antigens/Antigens denotes Combined circRNA–LNP. Quantification shows mean ± SD from three animals per group; percentages in representative flow plots describe the displayed samples. ns, not significant; *** P < 0.001; **** P < 0.0001 for the indicated comparisons."
        }
          ]
        },
        {
          key: "learn",
          title: "Learn",
          blocks: [
        {
          type: "prose",
          paragraphs: [
          "The splenic results connected lower tumour burden with broader systemic immune-associated changes. Because intracellular staining used polyclonal rather than peptide-specific re-stimulation, these measurements described overall effector capacity rather than epitope-specific responses. We therefore next examined whether CD8-associated signals were also present inside the tumour."
]
        },
        {
          type: "prose",
          paragraphs: [
          "[Further details: Results — systemic immune response](https://2026.igem.wiki/jlu-fbh/results)"
]
        }
          ]
        }
      ]
    },
    {
      type: "subheading",
      id: "eng-e-4-7",
      index: "4.7",
      title: "Iteration 4.7｜Examining local immune signals in tumour tissue",
    },
    {
      type: "dbtl",
      id: "dbtl-4-7",
      stages: [
        {
          key: "design",
          title: "Design",
          blocks: [
        {
          type: "prose",
          paragraphs: [
          "The splenic measurements described systemic immune changes but did not show whether immune cells entered the tumour. We therefore used tumour immunofluorescence to examine local CD8 distribution and the accompanying Granzyme B channel under the same three-group comparison."
]
        }
          ]
        },
        {
          key: "build",
          title: "Build",
          blocks: [
        {
          type: "prose",
          paragraphs: [
          "One tumour section from each of three animals per group was processed in a single randomised staining and imaging batch. CD8, Granzyme B and nuclear channels were acquired under identical exposure and magnification, with a secondary-only control used to assess background. Group identities remained coded during field selection and imaging."
]
        }
          ]
        },
        {
          key: "test",
          title: "Test",
          blocks: [
        {
          type: "prose",
          paragraphs: [
          "The representative sections showed sparse intratumoural CD8 signal in PBS, an intermediate signal in the empty-vector group and the strongest signal in Combined. Because only one field was collected per animal and immune infiltration was spatially heterogeneous, the images were interpreted qualitatively without density estimates or statistical comparison. The Granzyme B channel showed a stronger signal in Combined, but its reticular morphology and the absence of single-stain and isotype-control sections prevented that signal from establishing cytotoxic activity. The direct local conclusion was therefore increased CD8-associated infiltration in the Combined sections."
]
        },
        {
          type: "figure",
          src: "https://static.igem.wiki/teams/6056/wiki/files/pages/project/engineering/engineering-c4-07.avif",
          width: 954,
          height: 596,
          alt: "Figure C4-07",
          caption: "Representative tumour sections stained for CD8 and Granzyme B, with merged views. circRNA-vector denotes empty-vector circRNA–LNP, and circRNA-antigens denotes Combined circRNA–LNP. Combined showed stronger CD8-associated signals in the displayed fields; the images provide a qualitative comparison of local immune infiltration."
        }
          ]
        },
        {
          key: "learn",
          title: "Learn",
          blocks: [
        {
          type: "prose",
          paragraphs: [
          "Bringing tumour growth, splenic phenotypes and tissue images together taught us that each measurement answered a different question: whether tumour growth was suppressed, whether systemic immunity changed and whether CD8-associated signals were present locally. Their agreement strengthened the interpretation of Combined’s performance in this model, while increased staining alone could not establish cytotoxic function or antigen-specific recognition. This distinction was particularly important because BALB/c mice carry H-2ᵈ, whereas the selected epitopes were defined in a human HLA-A*02:01 context. We therefore recognised that further development required matching each conclusion to the evidence supporting it and using an HLA-matched system to investigate antigen-specific recognition."
]
        },
        {
          type: "prose",
          paragraphs: [
          "[Further details: Results — tumour immunofluorescence](https://2026.igem.wiki/jlu-fbh/results) and [Integrated Human Practices — interpretation of local signals](https://2026.igem.wiki/jlu-fbh/human-practices)"
]
        }
          ]
        }
      ]
    },
    {
      type: "subheading",
      id: "eng-e-4-8",
      index: "4.8",
      title: "Iteration 4.8｜Integrating the evidence for Combined’s in vivo performance",
    },
    {
      type: "dbtl",
      id: "dbtl-4-8",
      stages: [
        {
          key: "design",
          title: "Design",
          blocks: [
        {
          type: "prose",
          paragraphs: [
          "Tiesuo Zhao’s guidance clarified the distinction between the human HLA-A*02:01 epitope-design context and evaluation in ordinary BALB/c mice bearing human-TROP2-expressing 4T1 tumours. Together with Jiuwei Cui, we defined the final task: integrate tumour and immune measurements into a clear account of Combined’s performance, while identifying the contribution and scope of each experimental and computational result."
]
        }
          ]
        },
        {
          key: "build",
          title: "Build",
          blocks: [
        {
          type: "prose",
          paragraphs: [
          "We assembled an evidence table covering model-cell verification, tumour control, splenic immune measurements, tumour immunofluorescence and Cell2Dose. Each entry linked the direct record to its supported conclusion and evidence scope. For Cell2Dose, we distinguished three data roles: CCK-8 and background-corrected cytotoxicity measurements constrained the core cell-response functions; IFN-γ and Granzyme B measurements contributed to immune-response inputs in the integrated analysis; and animal tumour, DC and CD69 records were used for comparison with model outputs. This separation preserved the distinction between measurements informing the calculations and observations used to assess their correspondence with experimental outcomes."
]
        },
        {
          type: "table",
          caption: "Table C4-01｜Evidence supporting the final interpretation",
          headers: ["Evidence object", "Direct record", "Supported conclusion", "Evidence scope"],
          rows: [
            ["4T1–TROP2 model cells", "Semi-quantitative transcript signal: 75.83±3.27-fold; surface-positive fraction: 99.9%", "The established cell population expressed human TROP2", "Antigen expression in the murine tumour-cell background"],
            ["Tumour control", "Endpoint volumes: PBS 233.64±28.33, empty vector 90.36±13.51, Combined 24.20±9.72 mm³", "Combined achieved the strongest tumour control among the three groups", "The five-dose study in the 4T1–TROP2 BALB/c model"],
            ["Splenic immune measurements", "Five readouts followed PBS < empty vector < Combined", "Combined was associated with stronger systemic immune activation and effector-associated responses", "Endpoint DC, CD8 activation, memory-associated phenotype, IFN-γ and Granzyme B measurements"],
            ["Tumour immunofluorescence", "Combined showed stronger CD8-associated signals in the displayed fields", "Tumour sections supported increased local CD8-associated infiltration", "Qualitative comparison of representative tissue fields"],
            ["Cell2Dose", "Cell-response calibration and dose scanning; 10.0 µg joint pass probability: 81.15%", "Mechanistic simulation supported dose exploration around 10 µg", "Conditional simulations with core calibration data, immune-response inputs and animal-outcome comparisons separately identified"]
          ]
        },
        {
          type: "note",
          label: "Table C4-01 note",
          body: "Tumour volumes are mean±SD for five animals per group. The semi-quantitative RT-PCR value describes the recorded transcript-signal increase. Cell2Dose probabilities describe the fraction of sampled model scenarios meeting the specified criteria."
        }
          ]
        },
        {
          key: "test",
          title: "Test",
          blocks: [
        {
          type: "prose",
          paragraphs: [
          "We cross-checked the table against the source results and organised the findings into an integrated evidence map. Combined’s endpoint tumour volume was 89.6% lower than PBS and 73.2% lower than empty vector, accompanied by the highest values across all five splenic panels and stronger local CD8-associated signals. Together, these experimental observations established an in vivo proof of concept for Combined in the 4T1–TROP2 BALB/c model. Cell2Dose complemented this result through mechanistic simulation and conditional dose evaluation. The integrated analysis separately identified core cell-response calibration data, immune-response inputs and animal-outcome comparisons."
]
        },
        {
          type: "figure",
          src: "https://static.igem.wiki/teams/6056/wiki/files/pages/project/engineering/engineering-c4-08.avif",
          width: 3000,
          height: 2100,
          alt: "Figure C4-08",
          caption: "The evidence map connects Combined’s tumour-control and immune-response observations with model-cell verification and Cell2Dose calculations. The accompanying analysis distinguishes core calibration data, immune-response inputs and outcome comparisons."
        }
          ]
        },
        {
          key: "learn",
          title: "Learn",
          blocks: [
        {
          type: "prose",
          paragraphs: [
          "The final integration brought tumour control, systemic immune responses and local CD8 observations into a coherent in vivo proof of concept, complemented by Cell2Dose’s mechanistic and dose evaluation. TIME concluded with a clear engineering outcome: Combined’s performance was supported by traceable materials, defined comparisons and connected measurements, while each result retained its experimental or computational meaning."
]
        },
        {
          type: "prose",
          paragraphs: [
          "[Further details: Integrated Human Practices — evidence review](https://2026.igem.wiki/jlu-fbh/human-practices), [Model — Cell2Dose](https://2026.igem.wiki/jlu-fbh/model), [Results — in vivo proof of concept](https://2026.igem.wiki/jlu-fbh/results) and [Entrepreneurship — development pathway](https://2026.igem.wiki/jlu-fbh/entrepreneurship)"
]
        }
          ]
        }
      ]
    }
  ],
  note: {
    label: "Cycle 4 outcome",
    body: "**E—Evaluation** completed a major engineering milestone: carrying Combined from molecular and cellular activity to demonstrated tumour control in vivo. We established verified TROP2-expressing 4T1 model cells and completed an approved three-group animal study, in which Combined achieved the strongest tumour control alongside systemic immune changes and increased local CD8-associated signals. These experimental results established an in vivo proof of concept in the tested BALB/c model. Cell2Dose complemented the findings through mechanistic simulation and dose-uncertainty evaluation. Together, model-cell construction, biological measurements and computational analysis brought the four TIME cycles to a concrete engineering outcome."
  }
};
