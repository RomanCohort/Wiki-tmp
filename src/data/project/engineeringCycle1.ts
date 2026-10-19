import type { WikiSection } from "../../components/wiki/wikiPageTypes";
import type { EngineeringIterationDatum } from "./engineeringPage";

export const cycle1Iterations: EngineeringIterationDatum[] = [
  {
    id: "eng-t-1-1",
    cycle: 1,
    cycleId: "engineering-cycle-1",
    index: "1.1",
    label: "Iteration 1.1｜Defining the clinical use case",
    short: "Defining the clinical use case",
    teams: ["ihp"],
  },
  {
    id: "eng-t-1-2",
    cycle: 1,
    cycleId: "engineering-cycle-1",
    index: "1.2",
    label: "Iteration 1.2｜Selecting a measurable circRNA platform",
    short: "Selecting a measurable circRNA platform",
    teams: ["dry-lab","ihp"],
  },
  {
    id: "eng-t-1-3",
    cycle: 1,
    cycleId: "engineering-cycle-1",
    index: "1.3",
    label: "Iteration 1.3｜Building the first educational and visual entry",
    short: "Building the first educational and visual entry",
    teams: ["education","visual-design"],
  },
  {
    id: "eng-t-1-4",
    cycle: 1,
    cycleId: "engineering-cycle-1",
    index: "1.4",
    label: "Iteration 1.4｜Defining a clinically grounded four-antigen starting set",
    short: "Defining a clinically grounded four-antigen starting set",
    teams: ["dry-lab"],
  },
  {
    id: "eng-t-1-5",
    cycle: 1,
    cycleId: "engineering-cycle-1",
    index: "1.5",
    label: "Iteration 1.5｜Building a four-dimensional antigen-evidence framework",
    short: "Building a four-dimensional antigen-evidence framework",
    teams: ["dry-lab","ihp"],
  },
  {
    id: "eng-t-1-6",
    cycle: 1,
    cycleId: "engineering-cycle-1",
    index: "1.6",
    label: "Iteration 1.6｜Testing the four antigen sources with protein evidence",
    short: "Testing the four antigen sources with protein evidence",
    teams: ["dry-lab"],
  },
  {
    id: "eng-t-1-7",
    cycle: 1,
    cycleId: "engineering-cycle-1",
    index: "1.7",
    label: "Iteration 1.7｜Locating antigen expression within malignant-cell diversity",
    short: "Locating antigen expression within malignant-cell diversity",
    teams: ["dry-lab"],
  },
  {
    id: "eng-t-1-8",
    cycle: 1,
    cycleId: "engineering-cycle-1",
    index: "1.8",
    label: "Iteration 1.8｜Extending antigen representation across patients",
    short: "Extending antigen representation across patients",
    teams: ["dry-lab","ihp"],
  },
  {
    id: "eng-t-1-9",
    cycle: 1,
    cycleId: "engineering-cycle-1",
    index: "1.9",
    label: "Iteration 1.9｜Connecting the first Dry Lab workflow in CircuForge V1.0",
    short: "Connecting the first Dry Lab workflow in CircuForge V1.0",
    teams: ["dry-lab","entrepreneurship"],
  },
  {
    id: "eng-t-1-10",
    cycle: 1,
    cycleId: "engineering-cycle-1",
    index: "1.10",
    label: "Iteration 1.10｜Preparing a common human DC–T-cell workflow",
    short: "Preparing a common human DC–T-cell workflow",
    teams: ["wet-lab","ihp"],
  },
];

export const cycle1Section: WikiSection = {
  id: "engineering-cycle-1",
  index: "01",
  kicker: "Cycle 1 — Targeting",
  navLabel: "Cycle 1 — Targeting",
  title: "Cycle 1: From intended use to a four-antigen strategy",
  summary: "TIME begins with **T—Targeting**. This cycle moved from intended use to a four-antigen strategy ready for epitope-level engineering.",
  blocks: [
        {
          type: "prose",
          paragraphs: [
          "TIME begins with **T—Targeting**. This cycle moved from intended use to a four-antigen strategy. We first located the project within the TNBC treatment pathway, then translated that purpose into an RNA-platform decision and a multilayer antigen-selection route. Education and Visual Design developed a shared language for circRNA, while Dry Lab, Software and Human Practices connected the scientific question with traceable evidence and experimental preparation. By the end of the cycle, four antigen sources had gained support at the protein, malignant-cell and patient levels, and a common human DC–T-cell workflow had been established."
]
        },
    {
      type: "subheading",
      id: "eng-t-1-1",
      index: "1.1",
      title: "Iteration 1.1｜Defining the clinical use case",
    },
    {
      type: "dbtl",
      id: "dbtl-1-1",
      stages: [
        {
          key: "design",
          title: "Design",
          blocks: [
        {
          type: "prose",
          paragraphs: [
          "We began with a clinical question: where could an additional immune intervention contribute most clearly in the TNBC treatment pathway? TNBC heterogeneity and recurrence after standard treatment directed our attention to patients who remain at higher risk after neoadjuvant treatment and surgery (Garrido-Castro et al., 2019). Runhui Tian encouraged us to explore an additional therapeutic approach for TNBC."
]
        },
        {
          type: "references",
          items: [
          {
                    "label": "doi:10.1158/2159-8290.CD-18-1177",
                    "text": "Garrido-Castro AC, Lin NU, Polyak K. Insights into molecular classifications of triple-negative breast cancer: improving patient selection for treatment. *Cancer Discovery*. 2019;9:176–198.",
                    "href": "https://doi.org/10.1158/2159-8290.CD-18-1177",
                    "hrefLabel": "doi:10.1158/2159-8290.CD-18-1177"
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
          "We combined this direction with literature research and clinical discussions with Lei Wang and Chengli Li, both oncology doctors, and **built an intended-use specification with three defined elements.** First, the clinical setting was the period after neoadjuvant treatment and surgery, when some patients remain at higher risk of recurrence. Second, the proposed role was an antigen-directed immune approach that could complement standard treatment. Third, later development would require a documented antigen rationale, molecular eligibility criteria and measurable molecular and immune-response evidence. Tumour-antigen expression and HLA compatibility were recorded as questions for the subsequent Dry Lab and epitope analyses."
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
          "We placed the intended use after neoadjuvant treatment and surgery, focusing on TNBC patients with residual invasive disease and a high risk of recurrence. This clinical setting defined four questions for subsequent evaluation: whether the selected antigens were expressed in the tumour, whether their epitopes matched the patient’s HLA type, whether the circRNA preparation could be reliably identified and whether it could induce measurable responses in the DC–T-cell system. The review therefore fixed the timing and initial patient population, while leaving the antigen- and HLA-based eligibility criteria to later analysis."
]
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
          "Literature and clinical consultation showed that recurrence risk may remain after surgery and systemic treatment, establishing a clear complementary position for an antigen-directed immune approach. We therefore retained the post-treatment, higher-risk TNBC setting as the project's intended use and translated it into three requirements for platform selection: the ability to encode tumour-antigen sequences, support sustained expression and remain measurable from molecular preparation to immune function. These requirements formed the Design of Iteration 1.2. Further details are provided in [Integrated Human Practices: clinical positioning](https://2026.igem.wiki/jlu-fbh/human-practices)."
]
        }
          ]
        }
      ]
    },
    {
      type: "subheading",
      id: "eng-t-1-2",
      index: "1.2",
      title: "Iteration 1.2｜Selecting a measurable circRNA platform",
    },
    {
      type: "dbtl",
      id: "dbtl-1-2",
      stages: [
        {
          key: "design",
          title: "Design",
          blocks: [
        {
          type: "prose",
          paragraphs: [
          "The intended-use specification from Iteration 1.1 gave us five criteria for platform selection: antigen-coding capacity, RNA stability, duration of expression, immune-stimulatory potential and compatibility with measurements available to the team. We used these criteria to compare linear mRNA with engineered circRNA, allowing stability, expression and experimental measurability to enter the same decision."
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
          "Literature research and technical discussions with Jifan Hu and Ruohan Yang were organized into a platform-decision matrix. The same work produced a five-stage route linking the DNA template, linear transcription precursor, mature circRNA, encoded protein and immune function. Published studies supported stable translation from engineered circRNA and showed that innate sensing depends on how the RNA is generated and prepared. We therefore defined adjuvant-like stimulation as a preparation-dependent property to examine in later experiments (Chen et al., 2017; Wesselhoeft et al., 2018; Wesselhoeft et al., 2019)."
]
        },
        {
          type: "table",
          caption: "Table C1-01｜Platform decision matrix",
          headers: ["Design requirement","Linear mRNA","Engineered circRNA","Project check","Design implication"],
          rows: [
          [
                    "Antigen coding",
                    "Can encode the selected antigen sequence",
                    "Can encode the selected antigen sequence",
                    "Sequence and construct feasibility",
                    "Both formats meet the basic coding requirement"
          ],
          [
                    "RNA stability",
                    "Free ends remain susceptible to exonuclease-mediated decay",
                    "Closed topology can improve nuclease resistance",
                    "Literature and technical consultation",
                    "circRNA better matches the intended persistence question"
          ],
          [
                    "Expression duration",
                    "Expression is constrained by RNA lifetime",
                    "Engineered circRNA can extend translation duration",
                    "Published expression studies",
                    "Supports staged persistence measurements"
          ],
          [
                    "Immune stimulation",
                    "Depends on sequence, modification, purity and delivery",
                    "Innate sensing is tunable through RNA design and preparation",
                    "Literature and iHP discussion",
                    "Evaluate it under defined preparation conditions"
          ],
          [
                    "Preparation",
                    "Comparatively direct production route",
                    "Requires circularization and added identity checks",
                    "Team facilities and planned Experiments",
                    "Assign a measurable checkpoint to every preparation stage"
          ],
          [
                    "Functional evaluation",
                    "Can enter protein and immune assays",
                    "Can enter the same downstream assays after circularization checks",
                    "FLAG expression, DC–T-cell culture and immune readouts",
                    "Provides a continuous molecule-to-function route"
          ]
]
        },
        {
          type: "references",
          items: [
          {
                    "label": "doi:10.1016/j.molcel.2017.05.022",
                    "text": "Chen YG, Kim MV, Chen X, et al. Sensing self and foreign circular RNAs by intron identity. *Molecular Cell*. 2017;67:228–238.e5.",
                    "href": "https://doi.org/10.1016/j.molcel.2017.05.022",
                    "hrefLabel": "doi:10.1016/j.molcel.2017.05.022"
          },
          {
                    "label": "doi:10.1038/s41467-018-05096-6",
                    "text": "Wesselhoeft RA, Kowalski PS, Anderson DG. Engineering circular RNA for potent and stable translation in eukaryotic cells. *Nature Communications*. 2018;9:2629.",
                    "href": "https://doi.org/10.1038/s41467-018-05096-6",
                    "hrefLabel": "doi:10.1038/s41467-018-05096-6"
          },
          {
                    "label": "doi:10.1016/j.molcel.2019.02.015",
                    "text": "Wesselhoeft RA, Kowalski PS, Parker-Hale FC, et al. RNA circularization diminishes immunogenicity and can extend translation duration in vivo. *Molecular Cell*. 2019;74:508–520.e4.",
                    "href": "https://doi.org/10.1016/j.molcel.2019.02.015",
                    "hrefLabel": "doi:10.1016/j.molcel.2019.02.015"
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
          "We tested the selected platform against the operations required by the literature and the resources available to the team. For each molecular stage, we asked whether there was a defined way to obtain the material, an accessible measurement and an observable output that could be passed to the next stage."
]
        },
        {
          type: "table",
          caption: "Table C1-02｜Stage-by-stage feasibility check for the circRNA route",
          headers: ["Stage","Material source or operation","Available project check","Observable output","Decision"],
          rows: [
          [
                    "DNA template",
                    "Recombinant plasmids assembled by a commercial service provider",
                    "Supplier plasmid map, sequence file and sample label were matched to the intended design before the delivered material entered the team’s recorded template-processing and transcription route",
                    "DNA template corresponding to the intended construct",
                    "Executable"
          ],
          [
                    "Linear transcription precursor",
                    "In vitro transcription from the DNA template and the designed self-splicing precursor",
                    "RNA preparation and nucleic-acid analytical methods recorded in Experiments",
                    "Detectable linear precursor",
                    "Executable"
          ],
          [
                    "Mature circRNA",
                    "Self-splicing and circularization of the precursor",
                    "RNA purification, RNase R treatment and the corresponding nucleic-acid analysis recorded in Experiments",
                    "A circRNA preparation that can be evaluated separately from the linear precursor",
                    "Executable"
          ],
          [
                    "Encoded protein",
                    "Translation after cellular delivery",
                    "FLAG-associated protein-expression measurement",
                    "Expected FLAG-associated expression signal",
                    "Executable"
          ],
          [
                    "Immune function",
                    "circRNA-loaded DCs co-cultured with T cells",
                    "ELISpot, flow cytometry and target-cell killing assays",
                    "IFN-γ-associated, activation and effector readouts",
                    "Executable"
          ]
]
        },
        {
          type: "prose",
          paragraphs: [
          "All five stages therefore had a defined source or procedure, an accessible measurement and an observable output. This established the testability of the circRNA route; the resulting RNA, protein and immune-response evidence is presented in the later cycles."
]
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
          "We selected circRNA as the project's working expression platform. Its closed topology provided a clear stability rationale, published work supported prolonged expression, and its preparation-dependent innate sensing defined an additional experimental question. With the platform established, the next decision concerned its antigen payload. That content question became the scientific thread carried into antigen selection. Further details are provided in [Integrated Human Practices: platform selection](https://2026.igem.wiki/jlu-fbh/human-practices) and [Experiments: circRNA preparation and validation](https://2026.igem.wiki/jlu-fbh/experiments)."
]
        }
          ]
        }
      ]
    },
    {
      type: "subheading",
      id: "eng-t-1-3",
      index: "1.3",
      title: "Iteration 1.3｜Building the first educational and visual entry",
    },
    {
      type: "dbtl",
      id: "dbtl-1-3",
      stages: [
        {
          key: "design",
          title: "Design",
          blocks: [
        {
          type: "prose",
          paragraphs: [
          "Once circRNA became the working platform, Education and Visual Design asked how first-time learners could encounter an unfamiliar molecular form without losing sight of its biomedical setting. The scientific core needed to remain stable, while the teaching entry and visual language had to adapt to different schools."
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
          "We planned and delivered Winter Outreach across five schools, reaching approximately 308 students. Five school-adapted teaching decks introduced synthetic biology, linear and circular RNA and possible biomedical applications. Dream circRNA used circular cardboard and coloured segments as a participatory activity after the scientific explanation. The first sheep character and project emblem gave the materials a consistent identity."
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
          "In an end-of-session show-of-hands check, roughly 80% of students indicated that they understood the core distinction between linear and circular RNA introduced in class. Their participation and completed Dream circRNA pieces showed that the circular form provided an accessible entry to the topic. Differences among the five classrooms also showed that a shared scientific core benefited from school-specific teaching routes."
]
        },
        {
          type: "carousel",
          figureLabel: "Figure C1-01",
          images: [
          {
                    "src": "https://static.igem.wiki/teams/6056/wiki/files/pages/project/engineering/engineering-c1-01-1.avif"
          },
          {
                    "src": "https://static.igem.wiki/teams/6056/wiki/files/pages/project/engineering/engineering-c1-01-2.avif"
          },
          {
                    "src": "https://static.igem.wiki/teams/6056/wiki/files/pages/project/engineering/engineering-c1-01-3.avif"
          },
          {
                    "src": "https://static.igem.wiki/teams/6056/wiki/files/pages/project/engineering/engineering-c1-01-4.avif"
          },
          {
                    "src": "https://static.igem.wiki/teams/6056/wiki/files/pages/project/engineering/engineering-c1-01-5.avif"
          },
          {
                    "src": "https://static.igem.wiki/teams/6056/wiki/files/pages/project/engineering/engineering-c1-01-6.avif"
          },
          {
                    "src": "https://static.igem.wiki/teams/6056/wiki/files/pages/project/engineering/engineering-c1-01-7.avif"
          },
          {
                    "src": "https://static.igem.wiki/teams/6056/wiki/files/pages/project/engineering/engineering-c1-01-8.avif"
          },
          {
                    "src": "https://static.igem.wiki/teams/6056/wiki/files/pages/project/engineering/engineering-c1-01-9.avif"
          },
          {
                    "src": "https://static.igem.wiki/teams/6056/wiki/files/pages/project/engineering/engineering-c1-01-10.avif"
          },
          {
                    "src": "https://static.igem.wiki/teams/6056/wiki/files/pages/project/engineering/engineering-c1-01-11.avif"
          },
          {
                    "src": "https://static.igem.wiki/teams/6056/wiki/files/pages/project/engineering/engineering-c1-01-12.avif"
          },
          {
                    "src": "https://static.igem.wiki/teams/6056/wiki/files/pages/project/engineering/engineering-c1-01-13.avif"
          }
],
          caption: "Winter Outreach introduced circRNA through five school-adapted teaching decks and the Dream circRNA activity. The first sheep character and project emblem maintained visual continuity across the materials."
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
          "We retained the first visual identity and adopted a **layered education approach** for later activities. The scientific core remained consistent, while the depth of content, language, interaction and teaching materials were adjusted to learners’ ages, prior knowledge, learning settings and educational goals. Vaccine Classroom, Virtual Laboratory and Synbio Classroom later applied this principle to different audiences and forms of learning. Along the main scientific route, Iteration 1.2 had also defined the next content question: which TNBC antigens should the circRNA encode? Further details are provided in [Education: Winter Outreach](https://2026.igem.wiki/jlu-fbh/education)."
]
        }
          ]
        }
      ]
    },
    {
      type: "subheading",
      id: "eng-t-1-4",
      index: "1.4",
      title: "Iteration 1.4｜Defining a clinically grounded four-antigen starting set",
    },
    {
      type: "dbtl",
      id: "dbtl-1-4",
      stages: [
        {
          key: "design",
          title: "Design",
          blocks: [
        {
          type: "prose",
          paragraphs: [
          "Iteration 1.2 established circRNA as the molecular platform, leaving a central content question: which TNBC antigens should it encode? We therefore needed to identify a clinically relevant starting set before applying quantitative selection. At this stage, an antigen needed documented relevance to human TNBC tissue and a connection to disease outcome or translational research; final retention would depend on the common evidence framework developed later."
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
          "We combined preliminary clinical-data review, iHP discussions and literature research to build an initial four-antigen evidence record. This process identified TROP2 (*TACSTD2*), B7-H4 (*VTCN1*), Nectin-4 (*NECTIN4*) and LIV-1 (*SLC39A6*) as the starting set. For each antigen, we recorded its molecular identity, the TNBC population or tissue context in which it had been studied, the reported clinical or pathological observation and the question that remained for quantitative evaluation (Izci et al., 2022; Wang et al., 2018; M-Rabet et al., 2017; Saravanan et al., 2024)."
]
        },
        {
          type: "references",
          items: [
          {
                    "label": "doi:10.1038/s41598-022-27093-y",
                    "text": "Izci H, Punie K, Waumans L, et al. Correlation of TROP-2 expression with clinical-pathological characteristics and outcome in triple-negative breast cancer. *Scientific Reports*. 2022;12:22498.",
                    "href": "https://doi.org/10.1038/s41598-022-27093-y",
                    "hrefLabel": "doi:10.1038/s41598-022-27093-y"
          },
          {
                    "label": "doi:10.1186/s12935-018-0597-9",
                    "text": "Wang L, Yang C, Liu XB, Wang L, Kang FB. B7-H4 overexpression contributes to poor prognosis and drug-resistance in triple-negative breast cancer. *Cancer Cell International*. 2018;18:100.",
                    "href": "https://doi.org/10.1186/s12935-018-0597-9",
                    "hrefLabel": "doi:10.1186/s12935-018-0597-9"
          },
          {
                    "label": "doi:10.1093/annonc/mdw678",
                    "text": "M-Rabet M, Cabaud O, Josselin E, et al. Nectin-4: a new prognostic biomarker for efficient therapeutic targeting of primary and metastatic triple-negative breast cancer. *Annals of Oncology*. 2017;28:769–776.",
                    "href": "https://doi.org/10.1093/annonc/mdw678",
                    "hrefLabel": "doi:10.1093/annonc/mdw678"
          },
          {
                    "label": "doi:10.1002/jcp.31203",
                    "text": "Saravanan R, Balasubramanian V, Sundaram S, et al. Expression of cell surface zinc transporter LIV1 in triple negative breast cancer is an indicator of poor prognosis and therapy failure. *Journal of Cellular Physiology*. 2024;239.",
                    "href": "https://doi.org/10.1002/jcp.31203",
                    "hrefLabel": "doi:10.1002/jcp.31203"
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
          "We reviewed each antigen against three starting questions: whether it had been studied in human TNBC samples, whether tumour-associated expression had been reported and what clinical relevance the published evidence supported. Studies documented TROP2 expression in TNBC tissue and its association with selected clinicopathological features; B7-H4 expression associated with poor prognosis and drug resistance; Nectin-4 expression in primary and metastatic TNBC with prognostic relevance; and LIV-1 expression associated with aggressive features and therapy failure. These findings provided a clinical basis for retaining all four antigen sources for systematic quantitative evaluation. The following published tissue images illustrate their protein-expression patterns, with the study population and source identified in each caption."
]
        },
        {
          type: "figure",
          src: "https://static.igem.wiki/teams/6056/wiki/files/pages/project/engineering/engineering-c1-02a.avif",
          width: 852,
          height: 257,
          alt: "Figure C1-02A",
          caption: "Representative TROP2 immunohistochemistry in TNBC tissue, showing intermediate staining in the left and middle fields and high staining in the right field. Reproduced from Figure 2 of Izci et al. (2022), under CC BY 4.0; the tissue fields are retained and an external panel label has been added."
        },
        {
          type: "figure",
          src: "https://static.igem.wiki/teams/6056/wiki/files/pages/project/engineering/engineering-c1-02b.avif",
          width: 412,
          height: 420,
          alt: "Figure C1-02B",
          caption: "Representative B7-H4 immunostaining showing strong, moderate, weak and negative staining, as labelled in the source image. Cropped from Figure 1d of Wang et al. (2018), under CC BY 4.0; source labels and scale bars are retained, with an external panel label added."
        },
        {
          type: "figure",
          src: "https://static.igem.wiki/teams/6056/wiki/files/pages/project/engineering/engineering-c1-02c.avif",
          width: 852,
          height: 261,
          alt: "Figure C1-02C",
          caption: "Representative TNBC tissue showing strong, moderate and negative Nectin-4 staining in the original panels A, B and C, respectively (200× magnification). Reproduced from Figure 1 of Zeindler et al. (2019), under CC BY; original panel labels and scale bars are retained, with an external panel label added."
        },
        {
          type: "figure",
          src: "https://static.igem.wiki/teams/6056/wiki/files/pages/project/engineering/engineering-c1-02d.avif",
          width: 852,
          height: 465,
          alt: "Figure C1-02D",
          caption: "Representative positive and negative SLC39A6/LIV-1 immunostaining in breast-cancer tissue, corresponding to the original panels A and B. Reproduced from Figure 1 of Althobiti et al. (2021), under CC BY 4.0; an external panel label has been added. These images illustrate breast-cancer tissue staining rather than TNBC-specific prevalence."
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
          "The four-antigen starting set answered what the project should evaluate, while also clarifying that literature findings obtained from different cohorts and measurements could not by themselves determine final retention. We therefore needed a common framework that examined protein abundance, malignant-cell localization, patient representation and clinical evidence as distinct but connected dimensions. Building that framework became the next design. Further details are provided in [Bioinformatics: clinical starting evidence](https://2026.igem.wiki/jlu-fbh/bioinformatics) and [Integrated Human Practices: antigen-selection route](https://2026.igem.wiki/jlu-fbh/human-practices)."
]
        }
          ]
        }
      ]
    },
    {
      type: "subheading",
      id: "eng-t-1-5",
      index: "1.5",
      title: "Iteration 1.5｜Building a four-dimensional antigen-evidence framework",
    },
    {
      type: "dbtl",
      id: "dbtl-1-5",
      stages: [
        {
          key: "design",
          title: "Design",
          blocks: [
        {
          type: "prose",
          paragraphs: [
          "Iteration 1.4 established TROP2, B7-H4, Nectin-4 and LIV-1 as a clinically grounded starting set. To determine how these antigens should be evaluated under a common standard, we translated antigen selection into four measurable questions: whether each antigen was supported at the protein level in TNBC tissue; whether its expression was enriched in malignant cells; how broadly and complementarily it represented different patients; and how strongly tissue, disease and translational studies supported its clinical relevance. In consultation with Associate Professor Qingtian Guan, we separated these questions so that each type of evidence would support a defined decision."
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
          "We built a four-dimensional antigen-evidence framework. **Protein abundance** evaluated whether each antigen was present and increased at the protein level in TNBC tissue. **Malignant-cell enrichment** located the corresponding expression signal within malignant and non-malignant cellular compartments. **Patient representation** measured the individual and combined reach of the four genes across TNBC cases. **Clinical evidence** integrated published histopathological, prognostic and translational findings. Normal-tissue expression was retained as a parallel safety consideration. This structure followed established principles for tumour-antigen prioritization (Cheever et al., 2009)."
]
        },
        {
          type: "references",
          items: [
          {
                    "label": "doi:10.1158/1078-0432.CCR-09-0737",
                    "text": "Cheever MA, Allison JP, Ferris AS, et al. The prioritization of cancer antigens: a National Cancer Institute pilot project for the acceleration of translational research. *Clinical Cancer Research*. 2009;15:5323–5337.",
                    "href": "https://doi.org/10.1158/1078-0432.CCR-09-0737",
                    "hrefLabel": "doi:10.1158/1078-0432.CCR-09-0737"
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
          "We tested whether the framework could be executed by assigning an accessible evidence source, measurable output and engineering decision to every dimension. Public TNBC quantitative-proteomics cohorts could measure protein abundance; a cell-resolved breast-cancer atlas could locate expression among malignant and non-malignant compartments; patient-level cancer-genomics records could quantify individual and combined antigen representation; and published tissue and translational studies could provide clinical context. This source-readiness check confirmed that all four antigens could enter the same evidence structure and established the order in which the four dimensions would be examined."
]
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
          "The framework converted the four-antigen starting set into an executable evidence sequence. We would first test protein-level support, then locate the expression signal at cellular resolution, extend the comparison across patients and finally integrate the quantitative results with clinical evidence. Quantitative proteomics therefore became the next design.",
          "The finalized evidence map is shown below. Further details are provided in [Bioinformatics: antigen-selection framework](https://2026.igem.wiki/jlu-fbh/bioinformatics) and [Integrated Human Practices: Dry Lab route](https://2026.igem.wiki/jlu-fbh/human-practices)."
]
        },
        {
          type: "table",
          caption: "Table C1-03｜Four-dimensional antigen-evidence map",
          headers: ["Evidence dimension", "Question", "Primary source", "Decision produced"],
          rows: [
            [
              "Protein abundance",
              "Is each antigen supported by protein-level measurements in TNBC tissue?",
              "Public TNBC quantitative-proteomics cohorts",
              "Retain or reconsider each antigen source"
            ],
            [
              "Malignant-cell enrichment",
              "Is the corresponding expression signal enriched in malignant cells?",
              "A public cell-resolved breast-cancer atlas",
              "Establish tumour-cell relevance and cellular complementarity"
            ],
            [
              "Patient representation",
              "How broadly do individual antigens and their union represent TNBC cases?",
              "Patient-level cancer-genomics records",
              "Evaluate the patient-level value of retaining four antigen sources"
            ],
            [
              "Clinical evidence",
              "How do tissue, prognostic and translational studies support continued development?",
              "Published TNBC histopathological and translational studies",
              "Integrate quantitative results with clinical context"
            ]
          ]
        }
          ]
        }
      ]
    },
    {
      type: "subheading",
      id: "eng-t-1-6",
      index: "1.6",
      title: "Iteration 1.6｜Testing the four antigen sources with protein evidence",
    },
    {
      type: "dbtl",
      id: "dbtl-1-6",
      stages: [
        {
          key: "design",
          title: "Design",
          blocks: [
        {
          type: "prose",
          paragraphs: [
          "Following the evidence order established in Iteration 1.5, we first asked whether the four antigen candidates were supported by quantitative protein measurements in TNBC tissue and whether their abundance was higher in tumours than in normal or adjacent-normal tissue. PXD024322 and PXD028102 are ProteomeXchange accessions for two public quantitative-proteomics cohorts with complementary designs. PXD024322 provided 88 TNBC tumours and 38 normal-breast samples; PXD028102 included 82 TNBC tumours, of which 66 had matched adjacent-normal tissue (Asleh et al., 2022; Gong et al., 2022)."
]
        },
        {
          type: "references",
          items: [
          {
                    "label": "doi:10.1038/s41467-022-28524-0",
                    "text": "Asleh K, Negri GL, Spencer Miko SE, et al. Proteomic analysis of archival breast cancer clinical specimens identifies biological subtypes with distinct survival outcomes. *Nature Communications*. 2022;13:896.",
                    "href": "https://doi.org/10.1038/s41467-022-28524-0",
                    "hrefLabel": "doi:10.1038/s41467-022-28524-0"
          },
          {
                    "label": "doi:10.1016/j.celrep.2022.110460",
                    "text": "Gong Y, Ji P, Yang YS, et al. Metabolic-pathway-based subtyping of triple-negative breast cancer reveals potential therapeutic targets. *Cell Reports*. 2022;39:110460.",
                    "href": "https://doi.org/10.1016/j.celrep.2022.110460",
                    "hrefLabel": "doi:10.1016/j.celrep.2022.110460"
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
          "We built a reproducible proteomic-analysis workflow that retained sample, batch and patient identities. PXD024322 used a `Batch + Condition` model to compare TNBC tumours with normal-breast samples while accounting for TMT batches; proteins required at least two non-missing measurements in each group to enter statistical testing. PXD028102 used a paired `subject + condition` model, with `subject` identifying the 66 tumour–adjacent-normal patient pairs. Four left-censored imputation settings assessed sensitivity to missing-value handling. Both analyses used limma empirical-Bayes moderation and Benjamini–Hochberg correction across the proteins entering each analysis (Ritchie et al., 2015; Benjamini and Hochberg, 1995)."
]
        },
        {
          type: "references",
          items: [
          {
                    "label": "doi:10.1093/nar/gkv007",
                    "text": "Ritchie ME, Phipson B, Wu D, et al. limma powers differential expression analyses for RNA-sequencing and microarray studies. *Nucleic Acids Research*. 2015;43:e47.",
                    "href": "https://doi.org/10.1093/nar/gkv007",
                    "hrefLabel": "doi:10.1093/nar/gkv007"
          },
          {
                    "label": "doi:10.1111/j.2517-6161.1995.tb02031.x",
                    "text": "Benjamini Y, Hochberg Y. Controlling the false discovery rate: a practical and powerful approach to multiple testing. *Journal of the Royal Statistical Society Series B*. 1995;57:289–300.",
                    "href": "https://doi.org/10.1111/j.2517-6161.1995.tb02031.x",
                    "hrefLabel": "doi:10.1111/j.2517-6161.1995.tb02031.x"
          }
]
        },
        {
          type: "note",
          label: "Code C1-01｜Proteomic-analysis script excerpts",
          body: "The excerpts retain the original model specifications, filtering rules, imputation settings and output filenames. Data loading, function definitions and complete result-table assembly are provided in the full script."
        },
        {
          type: "code",
          language: "R",
          label: "PXD024322｜Batch-adjusted comparison",
          code: "# Original script: 08_pxd024322_limma_tnbc_vs_normal.R\n\nnormal_columns <- metadata$Condition == \"Normal\"\ntnbc_columns <- metadata$Condition == \"TNBC\"\n\nnormal_n <- rowSums(!is.na(expression[, normal_columns, drop = FALSE]))\ntnbc_n <- rowSums(!is.na(expression[, tnbc_columns, drop = FALSE]))\ntotal_n <- normal_n + tnbc_n\n\n# Test proteins with at least 2 nonmissing values in each group.\n# Retain all proteins in the complete results table.\ntestable <- normal_n >= 2 & tnbc_n >= 2\n\ndesign <- model.matrix(~ Batch + Condition, data = metadata)\nif (qr(design)$rank != ncol(design)) {\n  stop(\"Design matrix is not full rank: batch and condition are confounded.\")\n}\n\nfit <- lmFit(expression[testable, , drop = FALSE], design)\nfit <- eBayes(fit, trend = TRUE, robust = TRUE)\ntested_results <- topTable(\n  fit,\n  coef = \"ConditionTNBC\",\n  number = Inf,\n  sort.by = \"none\"\n)\n\n# After complete result-table assembly:\nfull_results$TNBC_coverage <- full_results$TNBC_n / full_results$TNBC_total\nfull_results$Normal_coverage <- full_results$Normal_n / full_results$Normal_total\nfull_results$Primary_high_coverage <- (\n  full_results$TNBC_coverage >= 0.70 &\n    full_results$Normal_coverage >= 0.70\n)\nfull_results$Meets_conservative_screen <- (\n  !is.na(full_results$adj.P.Val) &\n    full_results$adj.P.Val < 0.05 &\n    full_results$log2FC_TNBC_minus_Normal >= 0.5\n)\n\nwrite.csv(\n  full_results,\n  file.path(result_dir, \"PXD024322_TNBC_vs_Normal_limma_ALL_9088_proteins.csv\"),\n  row.names = FALSE,\n  na = \"\"\n)\n\nprimary_results <- subset(full_results, Primary_high_coverage & Testable)\nwrite.csv(\n  primary_results,\n  file.path(result_dir, \"PXD024322_TNBC_vs_Normal_limma_primary_high_coverage.csv\"),\n  row.names = FALSE,\n  na = \"\"\n)"
        },
        {
          type: "code",
          language: "R",
          label: "PXD028102｜Patient-paired comparison and missingness sensitivity",
          code: "# Original script: 12_pxd028102_missingness_sensitive_limma.R\n# subject represents the patient identifier (PatientID).\n\ntumor_columns <- grep(\"T_Prot$\", names(abundance), value = TRUE)\nnat_columns <- grep(\"P_Prot$\", names(abundance), value = TRUE)\ntumor_ids <- sub(\"T_Prot$\", \"\", tumor_columns)\nnat_ids <- sub(\"P_Prot$\", \"\", nat_columns)\npaired_ids <- intersect(tumor_ids, nat_ids)\n\nif (length(paired_ids) != 66L) {\n  stop(\"Expected 66 tumor-NAT patient pairs; found \", length(paired_ids))\n}\n\nsample_columns <- c(\n  paste0(paired_ids, \"P_Prot\"),\n  paste0(paired_ids, \"T_Prot\")\n)\ncondition <- factor(\n  c(rep(\"NAT\", length(paired_ids)), rep(\"TNBC\", length(paired_ids))),\n  levels = c(\"NAT\", \"TNBC\")\n)\nsubject <- factor(rep(paired_ids, 2))\ndesign <- model.matrix(~ subject + condition)\ncoefficient_name <- \"conditionTNBC\"\n\n# run_limma() performs left-censored imputation and then:\n# lmFit(imputed, design)\n# eBayes(fit, trend = TRUE, robust = TRUE)\n# topTable(fit, coef = coefficient_name, number = Inf, sort.by = \"none\")\n\nsensitivity_settings <- data.frame(\n  quantile_probability = c(0.005, 0.01, 0.01, 0.05),\n  offset = c(1.0, 0.5, 1.0, 1.0),\n  method = c(\n    \"q0.5pct_minus1.0\",\n    \"q1pct_minus0.5\",\n    \"q1pct_minus1.0_primary\",\n    \"q5pct_minus1.0\"\n  ),\n  stringsAsFactors = FALSE\n)\n\nall_results <- vector(\"list\", nrow(sensitivity_settings))\nfor (index in seq_len(nrow(sensitivity_settings))) {\n  setting <- sensitivity_settings[index, ]\n  all_results[[index]] <- run_limma(\n    quantile_probability = setting$quantile_probability,\n    offset = setting$offset,\n    method_name = setting$method\n  )\n}\n\nprimary <- all_results[[3]]\nwrite.csv(\n  primary,\n  file.path(result_dir, \"PXD028102_paired_limma_imputed_ALL.csv\"),\n  row.names = FALSE,\n  fileEncoding = \"UTF-8\"\n)"
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
          "PXD024322 provided quantitative protein evidence for all four candidates. Compared with normal-breast samples, average abundance was higher in TNBC tumours for TROP2 (1.14-fold, FDR = 0.0370), B7-H4 (1.20-fold, FDR = 0.0446), Nectin-4 (1.35-fold, FDR = 7.14 × 10⁻⁹) and LIV-1 (1.34-fold, FDR = 1.88 × 10⁻⁵). In the paired PXD028102 analysis, TROP2, B7-H4 and Nectin-4 were respectively 18.25-, 3.72- and 7.12-fold more abundant in tumours than in matched adjacent-normal tissue, with FDR values of 2.14 × 10⁻¹⁵, 7.15 × 10⁻⁶ and 2.13 × 10⁻¹¹. LIV-1 was not quantified in this cohort and retained its protein-level support from PXD024322. Together, the two cohorts supported carrying all four antigen sources forward."
]
        },
        {
          type: "figure",
          src: "https://static.igem.wiki/teams/6056/wiki/files/pages/project/engineering/engineering-c1-03a-new.avif",
          width: 4000,
          height: 2744,
          alt: "Figure C1-03A",
          caption: "Volcano plot comparing TNBC tumours with normal-breast samples in PXD024322 using a batch-adjusted limma model. Axes show the fitted log₂ fold change and −log₁₀ Benjamini–Hochberg-adjusted P value. Red and blue points indicate increased and decreased abundance, respectively, at adjusted P < 0.05 and |log₂FC| ≥ 0.15. Purple vertical reference lines mark log₂FC = ±0.5. TROP2, B7-H4, LIV-1 and Nectin-4 are highlighted."
        },
        {
          type: "figure",
          src: "https://static.igem.wiki/teams/6056/wiki/files/pages/project/engineering/engineering-c1-03b-new.avif",
          width: 4000,
          height: 1889,
          alt: "Figure C1-03B",
          caption: "Boxplots of batch-adjusted log₂ relative protein abundance for TROP2, B7-H4, LIV-1 and Nectin-4 in PXD024322. Grey and orange boxes represent normal-breast and TNBC samples, respectively. Each panel reports the model-estimated TNBC-to-normal fold change and Benjamini–Hochberg-adjusted P value."
        },
        {
          type: "figure",
          src: "https://static.igem.wiki/teams/6056/wiki/files/pages/project/engineering/engineering-c1-03c-new.avif",
          width: 4000,
          height: 2960,
          alt: "Figure C1-03C",
          caption: "Volcano plot from the patient-paired limma comparison of TNBC tumours and matched normal-adjacent tissue (NAT) in PXD028102. Axes show the fitted log₂ fold change and −log₁₀ Benjamini–Hochberg-adjusted P value. Red and blue points indicate increased and decreased abundance, respectively, at adjusted P < 0.01 and |log₂FC| ≥ 1. TROP2, B7-H4 and Nectin-4 are highlighted."
        },
        {
          type: "figure",
          src: "https://static.igem.wiki/teams/6056/wiki/files/pages/project/engineering/engineering-c1-03d-new.avif",
          width: 4000,
          height: 2099,
          alt: "Figure C1-03D",
          caption: "Boxplots of log₂ protein abundance after the primary missing-value imputation for TROP2, B7-H4 and Nectin-4 in PXD028102. Grey and orange boxes represent normal-adjacent tissue (NAT) and TNBC samples, respectively. Each panel reports the TNBC-to-NAT fold change and Benjamini–Hochberg-adjusted P value from the patient-paired limma model."
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
          "Quantitative proteomics established protein-level support for all four antigen sources: PXD024322 measured all four candidates, while the matched design of PXD028102 independently reinforced TROP2, B7-H4 and Nectin-4. We therefore retained the complete four-antigen starting set. The next question concerned cellular origin: tumour tissue contains malignant, immune and stromal compartments, so a cell-resolved analysis was required to determine where the corresponding expression signals arose. This became the next design. Further details are provided in [Bioinformatics: proteomic evidence](https://2026.igem.wiki/jlu-fbh/bioinformatics)."
]
        }
          ]
        }
      ]
    },
    {
      type: "subheading",
      id: "eng-t-1-7",
      index: "1.7",
      title: "Iteration 1.7｜Locating antigen expression within malignant-cell diversity",
    },
    {
      type: "dbtl",
      id: "dbtl-1-7",
      stages: [
        {
          key: "design",
          title: "Design",
          blocks: [
        {
          type: "prose",
          paragraphs: [
          "The proteomic results supported all four antigen sources in TNBC tissue, but tumour samples also contain immune, stromal and endothelial cells.We therefore asked whether the corresponding genes were enriched in malignant cells and whether they marked the same or complementary malignant-cell populations. GSE176078—the accession number of a public single-cell and spatial atlas of human breast cancer in the Gene Expression Omnibus—retained the patient and cell-type identities required for this analysis (Wu et al., 2021)."
]
        },
        {
          type: "references",
          items: [
          {
                    "label": "doi:10.1038/s41588-021-00911-1",
                    "text": "Wu SZ, Al-Eryani G, Roden DL, et al. A single-cell and spatially resolved atlas of human breast cancers. *Nature Genetics*. 2021;53:1334–1347.",
                    "href": "https://doi.org/10.1038/s41588-021-00911-1",
                    "hrefLabel": "doi:10.1038/s41588-021-00911-1"
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
          "We established a unified workflow for the ten TNBC-derived samples selected from GSE176078. Quality control was performed within each sample, followed by SCTransform normalization and Harmony integration for cell-level visualization. To assess malignant-cell enrichment, raw gene counts were aggregated by patient and cell compartment for pseudobulk analysis. The eight patients with paired malignant and non-malignant compartments served as biological replicates (Hafemeister and Satija, 2019; Korsunsky et al., 2019; Robinson et al., 2010). For the eight cases containing retained malignant cells, we also calculated the four-gene detection union: a cell was counted as positive when at least one candidate gene had a raw UMI count above zero. The positive fraction within each case, together with its malignant-cell count, supplied the case-wise pie-chart summary."
]
        },
        {
          type: "references",
          items: [
          {
                    "label": "doi:10.1186/s13059-019-1874-1",
                    "text": "Hafemeister C, Satija R. Normalization and variance stabilization of single-cell RNA-seq data using regularized negative binomial regression. *Genome Biology*. 2019;20:296.",
                    "href": "https://doi.org/10.1186/s13059-019-1874-1",
                    "hrefLabel": "doi:10.1186/s13059-019-1874-1"
          },
          {
                    "label": "doi:10.1038/s41592-019-0619-0",
                    "text": "Korsunsky I, Millard N, Fan J, et al. Fast, sensitive and accurate integration of single-cell data with Harmony. *Nature Methods*. 2019;16:1289–1296.",
                    "href": "https://doi.org/10.1038/s41592-019-0619-0",
                    "hrefLabel": "doi:10.1038/s41592-019-0619-0"
          },
          {
                    "label": "doi:10.1093/bioinformatics/btp616",
                    "text": "Robinson MD, McCarthy DJ, Smyth GK. edgeR: a Bioconductor package for differential expression analysis of digital gene expression data. *Bioinformatics*. 2010;26:139–140.",
                    "href": "https://doi.org/10.1093/bioinformatics/btp616",
                    "hrefLabel": "doi:10.1093/bioinformatics/btp616"
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
          "The analysis retained 39,324 cells, including 9,491 malignant cells. All four candidate genes were enriched in the malignant compartment, with lower detection rates in immune cells and cancer-associated fibroblasts. TROP2 had the highest individual malignant-cell detection rate at 70.4%; combining the four genes increased this fraction to 81.4% (7,727/9,491), while 7.3% had all four detected. Across the eight cases shown, the union fractions ranged from 52.5% to 97.8%. These results supported retaining complementary antigen sources rather than relying on a single gene."
]
        },
        {
          type: "table",
          caption: "Table C1-04｜Malignant-cell enrichment and compartment-specific detection of candidate genes",
          headers: [
            "Gene",
            "Antigen",
            "Malignant vs non-malignant log₂ fold change",
            "FDR",
            "Malignant-cell detection",
            "Immune-cell detection",
            "CAF detection"
          ],
          rows: [
            [
              "TACSTD2",
              "TROP2",
              "4.074",
              "8.37 × 10⁻⁵",
              "70.40%",
              "4.00%",
              "5.40%"
            ],
            [
              "SLC39A6",
              "LIV-1",
              "0.853",
              "0.0196",
              "39.40%",
              "8.50%",
              "20.70%"
            ],
            [
              "NECTIN4",
              "Nectin-4",
              "4.755",
              "3.70 × 10⁻⁶",
              "37.80%",
              "1.00%",
              "0.60%"
            ],
            [
              "VTCN1",
              "B7-H4",
              "5.393",
              "2.52 × 10⁻⁵",
              "19.80%",
              "0.30%",
              "0.40%"
            ]
          ]
        },
        {
          type: "note",
          label: "Table C1-04 note",
          body: "Log₂ fold changes and FDR values describe the patient-paired pseudobulk comparison between malignant and non-malignant compartments. Detection rates indicate the fraction of cells within each compartment with a raw UMI count greater than zero for the corresponding gene. CAF, cancer-associated fibroblast."
        },
        {
          type: "figure",
          src: "https://static.igem.wiki/teams/6056/wiki/files/pages/project/engineering/engineering-c1-04a-new.avif",
          width: 2499,
          height: 2129,
          alt: "Figure C1-04A",
          caption: "Harmony-integrated UMAP of the 39,324 quality-controlled cells in the GSE176078 TNBC subset. Each point represents a cell, coloured by its annotated major lineage. The map shows malignant, normal epithelial, immune, stromal and endothelial cell populations."
        },
        {
          type: "figure",
          src: "https://static.igem.wiki/teams/6056/wiki/files/pages/project/engineering/enngineering-c1-04b-new.avif",
          width: 3002,
          height: 4000,
          alt: "Figure C1-04B",
          caption: "Candidate-gene expression on the Harmony UMAP (left) and violin plots across cell compartments (right). Rows show TROP2/*TACSTD2*, B7-H4/*VTCN1*, LIV-1/*SLC39A6* and Nectin-4/*NECTIN4* (labelled PVRL4). Expression is displayed as ln(CP10K + 1), calculated from raw counts. Cancer-associated fibroblasts (CAFs) are included in the stromal compartment and also shown separately. The B7-H4 and Nectin-4 violin plots use broken y-axes."
        },
        {
          type: "figure",
          src: "https://static.igem.wiki/teams/6056/wiki/files/pages/project/engineering/engineering-c1-04c.avif",
          width: 2088,
          height: 2126,
          alt: "Figure C1-04C",
          caption: "The pie chart represents 9,491 malignant cells from eight cases in the GSE176078 TNBC subset. Each case contributes a sector proportional to its malignant-cell count, divided into coloured portions with at least one candidate gene detected and grey portions with none detected. Labels report the case-specific detection fraction and malignant-cell number. The pooled detection fraction was 81.4% (7,727/9,491)."
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
          "The cell-resolved analysis gave the multi-antigen strategy a cellular rationale: the four sources represented partly overlapping but non-identical malignant-cell populations, while the case-wise summaries showed their combined detection within individual tumours. We retained all four sources to broaden the cellular expression patterns represented in the design. The next iteration used an independent TCGA TNBC cohort to evaluate representation at the patient level. Further details are provided in [Bioinformatics: single-cell analysis](https://2026.igem.wiki/jlu-fbh/bioinformatics)."
]
        }
          ]
        }
      ]
    },
    {
      type: "subheading",
      id: "eng-t-1-8",
      index: "1.8",
      title: "Iteration 1.8｜Extending antigen representation across patients",
    },
    {
      type: "dbtl",
      id: "dbtl-1-8",
      stages: [
        {
          key: "design",
          title: "Design",
          blocks: [
        {
          type: "prose",
          paragraphs: [
          "Iteration 1.7 showed that the four antigen sources marked partly overlapping but non-identical malignant-cell populations. We next asked whether combining these sources also increased representation across TNBC patients. To answer this question, we needed a patient-level rule that could be applied consistently to all four genes and a union calculation that counted each patient only once."
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
          "We examined 115 TNBC cases from the TCGA Breast Invasive Carcinoma PanCancer Atlas through cBioPortal, a public cancer-genomics platform. A patient met the criterion for a gene when its mRNA z-score was at least 0.5 or when high-level copy-number amplification was recorded. We calculated the proportion of patients meeting the rule for each gene and then formed the union of the four gene-positive sets, counting patients who met several criteria only once (Cerami et al., 2012; Gao et al., 2013; cBioPortal, n.d.). Published tissue evidence reviewed earlier in the cycle provided the clinical context for interpreting these patient-level molecular records."
]
        },
        {
          type: "references",
          items: [
          {
                    "label": "doi:10.1158/2159-8290.CD-12-0095",
                    "text": "Cerami E, Gao J, Dogrusoz U, et al. The cBio Cancer Genomics Portal: an open platform for exploring multidimensional cancer genomics data. *Cancer Discovery*. 2012;2:401–404.",
                    "href": "https://doi.org/10.1158/2159-8290.CD-12-0095",
                    "hrefLabel": "doi:10.1158/2159-8290.CD-12-0095"
          },
          {
                    "label": "doi:10.1126/scisignal.2004088",
                    "text": "Gao J, Aksoy BA, Dogrusoz U, et al. Integrative analysis of complex cancer genomics and clinical profiles using the cBioPortal. *Science Signaling*. 2013;6:pl1.",
                    "href": "https://doi.org/10.1126/scisignal.2004088",
                    "hrefLabel": "doi:10.1126/scisignal.2004088"
          },
          {
                    "label": "cBioPortal(n.d.)",
                    "text": "cBioPortal(n.d.). Onco Query Language.",
                    "href": "https://docs.cbioportal.org/user-guide/oql/",
                    "hrefLabel": "Documentation"
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
          "Under the predefined rule, TROP2, B7-H4, Nectin-4 and LIV-1 individually met the criterion in 38%, 31%, 79% and 4% of the 115 cases, respectively. Nectin-4 provided the broadest individual representation, while the union of all four genes included 101 patients, or 88%. The combined set therefore represented ten additional patients beyond Nectin-4 alone. Together with the partly overlapping malignant-cell patterns observed in Iteration 1.7 and Yishu Wang’s advice on multi-epitope design, this increase supported retaining all four antigen sources for epitope selection. The 88% value described antigen representation under the predefined molecular rule; HLA matching was carried forward as an independent eligibility layer."
]
        },
        {
          type: "figure",
          src: "https://static.igem.wiki/teams/6056/wiki/files/pages/project/engineering/engineering-c1-05.avif",
          width: 2531,
          height: 919,
          alt: "Figure C1-05",
          caption: "cBioPortal OncoPrint of 115 selected TCGA TNBC cases using the query `AMP EXP >= 0.5`, which identifies copy-number amplification or an mRNA expression Z-score of at least 0.5. The proportions meeting this rule were 38% for *TACSTD2*, 31% for *VTCN1*, 79% for *NECTIN4* and 4% for *SLC39A6*. At least one of the four genes met the rule in 101 of 115 cases (88%)."
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
          "The four-antigen strategy now had three connected quantitative evidence levels. Iteration 1.6 established protein-level support in TNBC tissue; Iteration 1.7 located the four genes within partly overlapping malignant-cell populations; and this iteration showed that combining the four sources increased patient representation beyond the broadest individual antigen. Together with the clinical starting evidence from Iteration 1.4, these results supported retaining TROP2, B7-H4, Nectin-4 and LIV-1. The next task was to preserve their data, literature and selection reasons as the four antigen sources moved into epitope design. Further details are provided in [Bioinformatics: patient-level evidence](https://2026.igem.wiki/jlu-fbh/bioinformatics)."
]
        }
          ]
        }
      ]
    },
    {
      type: "subheading",
      id: "eng-t-1-9",
      index: "1.9",
      title: "Iteration 1.9｜Connecting the first Dry Lab workflow in CircuForge V1.0",
    },
    {
      type: "dbtl",
      id: "dbtl-1-9",
      stages: [
        {
          key: "design",
          title: "Design",
          blocks: [
        {
          type: "prose",
          paragraphs: [
          "During our own Dry Lab work, quantitative results first had to be reorganized for target review, and selected target names, accessions, protein sequences and supporting evidence then had to be transferred into epitope prediction. Moving between R, Python, command-line scripts and web tools repeatedly changed the required input format and made selection reasons difficult to retain. This was especially demanding for new users. We therefore designed CircuForge to connect the steps in one guided environment and preserve the context needed for the next decision."
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
          "We built CircuForge V1.0 in R Shiny with three connected modules: data import and quality control, candidate-target screening and epitope prediction. Processed data could move into target analysis, and selected targets could continue into epitope review without rebuilding the workflow in another application. V1.0 was intended to help first-time users follow the path from evidence to an epitope candidate while keeping the main analysis stages visible."
]
        },
        {
          type: "carousel",
          figureLabel: "Figure C1-06",
          images: [
          {
                    "src": "https://static.igem.wiki/teams/6056/wiki/files/pages/project/engineering/engineering-c1-06a.avif"
          },
          {
                    "src": "https://static.igem.wiki/teams/6056/wiki/files/pages/project/engineering/engineering-c1-06b.avif"
          },
          {
                    "src": "https://static.igem.wiki/teams/6056/wiki/files/pages/project/engineering/engineering-c1-06c.avif"
          }
],
          caption: "CircuForge V1.0 module interfaces. (A) Data import and quality control, showing quantitative-data and sample-metadata upload, preprocessing controls and quality-control plots. (B) Candidate-target screening, showing Limma analysis settings and a volcano plot. (C) Epitope prediction, showing protein-sequence input, prediction-mode and HLA settings, and a candidate-peptide results table."
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
          "We presented V1.0 at an iGEM software exchange involving five teams. Participants asked for a clearer distinction between software recommendations and the entries selected by the researcher, together with more visible candidate identity and supporting information during stage-to-stage transfer. We converted this feedback into specific requirements for the next version."
]
        },
        {
          type: "figure",
          src: "https://static.igem.wiki/teams/6056/wiki/files/pages/project/engineering/engineering-c1-07.avif",
          width: 3033,
          height: 2031,
          alt: "Figure C1-07",
          caption: "Group screenshot from a five-team online iGEM software exchange involving JLU-FBH, HUBU-WUHAN, AFMU-China, JLU-SPH and LZU-GANSU."
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
          "V1.0 connected the first three Dry Lab stages and gave the next software iteration three precise directions: **separate judgement, preserve evidence and clarify handoff**. Stage-specific candidate keys, Evidence Cards, visible software states and an independent confirmation step would later answer the problems identified here. Along the scientific route, the four selected antigen sources also needed a common human-cell framework before their epitopes could be compared experimentally.  [See Software: CircuForge iterations](https://2026.igem.wiki/jlu-fbh/software)."
]
        }
          ]
        }
      ]
    },
    {
      type: "subheading",
      id: "eng-t-1-10",
      index: "1.10",
      title: "Iteration 1.10｜Preparing a common human DC–T-cell workflow",
    },
    {
      type: "dbtl",
      id: "dbtl-1-10",
      stages: [
        {
          key: "design",
          title: "Design",
          blocks: [
        {
          type: "prose",
          paragraphs: [
          "Before the four antigen sources could enter epitope screening, their later RNA designs needed a common human-cell context. We therefore required a defined cell source, a consistent route for preparing antigen-presenting and responder cells, and records that would keep biological inputs comparable across constructs."
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
          "Based on the Wet Lab protocol and human-material ethics discussion with Junqi Niu, we placed procurement, cell preparation and record continuity within the experimental plan. We then built a standardized preparation and co-culture framework beginning with commercial HLA-A*02:01 PBMC material. CD14-positive monocytes were isolated for GM-CSF/IL-4-induced monocyte-derived DC culture, while CD3-positive T cells were obtained from the CD14-negative fraction. The framework specified how circRNA-loaded DCs would later enter a common DC–T-cell co-culture for ELISpot, flow-cytometry and killing readouts (Miltenyi Biotec, n.d.-a; Miltenyi Biotec, n.d.-b; Sallusto and Lanzavecchia, 1994)."
]
        },
        {
          type: "references",
          items: [
          {
                    "label": "Source",
                    "text": "Miltenyi Biotec(n.d.-a). CD14 MicroBeads, human: data sheet, 130-050-201.",
                    "href": "https://www.miltenyibiotec.com/upload/assets/IM0001260.PDF",
                    "hrefLabel": "Source"
          },
          {
                    "label": "Source",
                    "text": "Miltenyi Biotec(n.d.-b). CD3 MicroBeads, human: data sheet, 130-050-101.",
                    "href": "https://www.miltenyibiotec.com/upload/assets/IM0001261.PDF",
                    "hrefLabel": "Source"
          },
          {
                    "label": "doi:10.1084/jem.179.4.1109",
                    "text": "Sallusto F, Lanzavecchia A. Efficient presentation of soluble antigen by cultured human dendritic cells is maintained by granulocyte/macrophage colony-stimulating factor plus interleukin 4 and downregulated by tumor necrosis factor alpha. *Journal of Experimental Medicine*. 1994;179:1109–1118.",
                    "href": "https://doi.org/10.1084/jem.179.4.1109",
                    "hrefLabel": "doi:10.1084/jem.179.4.1109"
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
          "The first ELISpot screen was intended to compare the immune responses associated with different epitope-encoding RNA constructs. For that comparison to be interpretable, the construct being tested needed to remain the principal planned variable. We therefore checked the experimental plan group by group: the commercial PBMC batch, HLA-A*02:01 background, DC and T-cell preparation routes, RNA input, loading procedure, co-culture conditions and ELISpot procedure were kept consistent, while the RNA construct assigned to each condition changed. This design allowed differences between wells to be interpreted primarily in relation to the construct under comparison."
]
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
          "The common DC–T-cell framework made a controlled first comparison possible: different epitope designs could later enter the same cell-preparation and culture route, while cell source and construct identity remained visible during interpretation. The four antigen sources were therefore ready to move from antigen-level evidence to peptide prediction and experimental construct design. Further details are provided in [Experiments: human-cell preparation](https://2026.igem.wiki/jlu-fbh/experiments) and [Integrated Human Practices: human-material ethics](https://2026.igem.wiki/jlu-fbh/human-practices)."
]
        }
          ]
        }
      ]
    }
  ],
  note: {
    label: "Cycle 1 outcome",
    body: "Cycle 1 completed the **T—Targeting** stage of TIME, moving from intended use to a four-antigen strategy ready for epitope-level engineering. We selected a measurable circRNA platform, established a clinically grounded four-antigen starting set and retained TROP2, B7-H4, Nectin-4 and LIV-1 through clinical, protein-level, malignant-cell and patient-level evidence.Education and Visual Design established an adaptable first language for circRNA; CircuForge V1.0 began to connect the computational handoff; and the common DC–T-cell workflow prepared a shared experimental setting. Cycle 2 could now ask a narrower engineering question: which epitopes from the four antigen sources should be encoded, built and compared?"
  }
};
