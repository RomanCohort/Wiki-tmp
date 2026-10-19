import type { WikiSection } from "../../components/wiki/wikiPageTypes";
import type { EngineeringIterationDatum } from "./engineeringPage";

export const cycle3Iterations: EngineeringIterationDatum[] = [
  {
    id: "eng-m-3-1",
    cycle: 3,
    cycleId: "engineering-cycle-3",
    index: "3.1",
    label: "Iteration 3.1｜Preparing circRNA inputs for the second-round comparison",
    short: "Preparing circRNA inputs for the second-round comparison",
    teams: ["wet-lab"],
  },
  {
    id: "eng-m-3-2",
    cycle: 3,
    cycleId: "engineering-cycle-3",
    index: "3.2",
    label: "Iteration 3.2｜Measuring the persistence of Combined RNA",
    short: "Measuring the persistence of Combined RNA",
    teams: ["wet-lab"],
  },
  {
    id: "eng-m-3-3",
    cycle: 3,
    cycleId: "engineering-cycle-3",
    index: "3.3",
    label: "Iteration 3.3｜Exploring the full-length structure of Combined RNA with TorusFold",
    short: "Exploring the full-length structure of Combined RNA with TorusFold",
    teams: ["dry-lab"],
  },
  {
    id: "eng-m-3-4",
    cycle: 3,
    cycleId: "engineering-cycle-3",
    index: "3.4",
    label: "Iteration 3.4｜Testing structural refinement in TorusFold",
    short: "Testing structural refinement in TorusFold",
    teams: ["dry-lab"],
  },
  {
    id: "eng-m-3-5",
    cycle: 3,
    cycleId: "engineering-cycle-3",
    index: "3.5",
    label: "Iteration 3.5｜Verifying circRNA translation and comparing dendritic-cell maturation",
    short: "Verifying circRNA translation and comparing dendritic-cell maturation",
    teams: ["wet-lab"],
  },
  {
    id: "eng-m-3-6",
    cycle: 3,
    cycleId: "engineering-cycle-3",
    index: "3.6",
    label: "Iteration 3.6｜Following the response across complementary T-cell phenotypes",
    short: "Following the response across complementary T-cell phenotypes",
    teams: ["wet-lab"],
  },
  {
    id: "eng-m-3-7",
    cycle: 3,
    cycleId: "engineering-cycle-3",
    index: "3.7",
    label: "Iteration 3.7｜Comparing the five second-round preparations by ELISpot",
    short: "Comparing the five second-round preparations by ELISpot",
    teams: ["wet-lab"],
  },
  {
    id: "eng-m-3-8",
    cycle: 3,
    cycleId: "engineering-cycle-3",
    index: "3.8",
    label: "Iteration 3.8｜Testing cytotoxic activity in a TNBC target-cell context",
    short: "Testing cytotoxic activity in a TNBC target-cell context",
    teams: ["wet-lab"],
  },
  {
    id: "eng-m-3-9",
    cycle: 3,
    cycleId: "engineering-cycle-3",
    index: "3.9",
    label: "Iteration 3.9｜Comparing killing of tumour and non-tumour target cells",
    short: "Comparing killing of tumour and non-tumour target cells",
    teams: ["wet-lab"],
  },
  {
    id: "eng-m-3-10",
    cycle: 3,
    cycleId: "engineering-cycle-3",
    index: "3.10",
    label: "Iteration 3.10｜Assessing the effect of empty LNP on dendritic-cell viability",
    short: "Assessing the effect of empty LNP on dendritic-cell viability",
    teams: ["wet-lab"],
  },
  {
    id: "eng-m-3-11",
    cycle: 3,
    cycleId: "engineering-cycle-3",
    index: "3.11",
    label: "Iteration 3.11｜Testing CircuForge as a transferable design workflow",
    short: "Testing CircuForge as a transferable design workflow",
    teams: ["dry-lab"],
  },
  {
    id: "eng-m-3-12",
    cycle: 3,
    cycleId: "engineering-cycle-3",
    index: "3.12",
    label: "Iteration 3.12｜Moving orientation before the first virtual operation",
    short: "Moving orientation before the first virtual operation",
    teams: ["education"],
  },
  {
    id: "eng-m-3-13",
    cycle: 3,
    cycleId: "engineering-cycle-3",
    index: "3.13",
    label: "Iteration 3.13｜Connecting orientation, physical experiments and molecular design",
    short: "Connecting orientation, physical experiments and molecular design",
    teams: ["education"],
  },
  {
    id: "eng-m-3-14",
    cycle: 3,
    cycleId: "engineering-cycle-3",
    index: "3.14",
    label: "Iteration 3.14｜Iterating the sheep character family through exchange feedback",
    short: "Iterating the sheep character family through exchange feedback",
    teams: ["visual-design"],
  },
];

export const cycle3Section: WikiSection = {
  id: "engineering-cycle-3",
  index: "03",
  kicker: "Cycle 3 — Measurement",
  navLabel: "Cycle 3 — Measurement",
  title: "Cycle 3: Building the molecular and cellular evidence chain",
  summary: "TIME enters **M—Measurement**. Cycle 2 answered **what should be integrated** by establishing Combined and three TROP2 comparison constructs. Cycle 3 then asked **what evidence the integrated design could produce**. Four antigen-encoding circRNA preparations and an equal-input Blank control were examined in sequence from RNA preparation and persistence to protein translation, dendritic-cell activation, T-cell responses, IFN-γ secretion and target-cell killing. Once this molecule-to-function chain was established, its value was extended through three further levels: CircuForge turned experimental records into a transferable workflow, Education translated that workflow into procedures learners could follow, and Visual Design transformed the project’s specialised content into a shared visual language. Measurement therefore progressed from the molecule, to the cell, to the transfer of the knowledge produced.",
  blocks: [
        {
          type: "prose",
          paragraphs: [
          "TIME enters **M—Measurement**. Cycle 2 answered **what should be integrated** by establishing Combined and three TROP2 comparison constructs. Cycle 3 then asked **what evidence the integrated design could produce**. Four antigen-encoding circRNA preparations and an equal-input Blank control were examined in sequence from RNA preparation and persistence to protein translation, dendritic-cell activation, T-cell responses, IFN-γ secretion and target-cell killing. Once this molecule-to-function chain was established, its value was extended through three further levels: CircuForge turned experimental records into a transferable workflow, Education translated that workflow into procedures learners could follow, and Visual Design transformed the project’s specialised content into a shared visual language. Measurement therefore progressed from the molecule, to the cell, to the transfer of the knowledge produced."
]
        },
    {
      type: "subheading",
      id: "eng-m-3-1",
      index: "3.1",
      title: "Iteration 3.1｜Preparing circRNA inputs for the second-round comparison",
    },
    {
      type: "dbtl",
      id: "dbtl-3-1",
      stages: [
        {
          key: "design",
          title: "Design",
          blocks: [
        {
          type: "prose",
          paragraphs: [
          "The first-round ELISpot selected eight modules from 13 circRNA groups, leading to the Combined design. The second round compared Combined with TROP2 CTL1, TROP2 CTL2, TROP2 CTL1+2 and the empty-vector Blank. We established a shared preparation route for these five inputs and selected Combined as the representative preparation for quantitative circularity assessment and junction-sequence verification before DC electroporation. Blank retained the same circRNA backbone and adjuvant elements while omitting the epitope-coding sequence."
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
          "Wet Lab prepared all five circRNA inputs through a shared DNA-to-RNA workflow. PCR and agarose-gel electrophoresis were used to verify the plasmid target regions. The corresponding plasmids were separately linearised and purified as templates for T7 in vitro transcription, followed by DNA-template removal, RNA purification, self-splicing circularisation and RNase R treatment.",
          "For the purified Combined preparation, divergent- and convergent-primer RT-qPCR used the 4 µL working input established in Iteration 2.5, with three technical wells. The recorded calculation estimated the circular fraction against the predefined ≥90% release criterion. Sanger sequencing of a junction-spanning amplification product then checked the expected head-to-tail connection. Group identifiers were retained throughout preparation and subsequent DC electroporation (Wesselhoeft et al., 2018; LGC Biosearch Technologies, n.d.)."
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
                    "label": "LGC Biosearch Technologies (n.d.)",
                    "text": "LGC Biosearch Technologies (n.d.) *Ribonuclease R Manual*. Cat. RNR07250.",
                    "href": "https://biosearchtech.a.bigcontent.io/v1/static/manual_RNR07250_RNase-R?utm_source=chatgpt.com",
                    "hrefLabel": "Official manual"
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
          "The gel documented target-region PCR products from the four antigen-encoding plasmids, supporting the plasmid-verification step. At the RNA stage, the purified Combined preparation gave a recorded circular-to-linear signal ratio of 145.7:1 and an estimated circular fraction of 99.30±0.17%, exceeding the ≥90% release criterion. This measurement described the composition after RNase R purification.",
          "Junction sequencing recovered the expected connection between the precursor’s 3′ and 5′ sequences. Together, the quantitative readout and junction sequence supported the preparation of circRNA-rich Combined material for the second-round comparison."
]
        },
        {
          type: "figure",
          src: "https://static.igem.wiki/teams/6056/wiki/files/pages/project/engineering/engineering-c3-01a.avif",
          width: 733,
          height: 549,
          alt: "Figure C3-01A｜Plasmid verification by PCR｜质粒PCR核验",
          caption: "Agarose-gel electrophoresis of target-region PCR products used to verify the four antigen-encoding plasmids."
        },
        {
          type: "table",
          caption: "Table C3-01｜RT-qPCR assessment of purified Combined",
          headers: ["Measure", "Recorded result"],
          rows: [
            ["Working input", "4 µL"],
            ["Technical wells", "3"],
            ["ΔCq: convergent−divergent", "7.19±0.39"],
            ["Recorded circular-to-linear signal ratio", "145.7:1"],
            ["Estimated circular fraction", "99.30±0.17%"],
            ["Release criterion", "≥90%"]
          ]
        },
        {
          type: "note",
          label: "Table C3-01 note",
          body: "Results describe the RNase R-purified Combined preparation. ΔCq and estimated circular fraction are reported as mean±SD across three technical wells; the ratio and fraction follow the recorded calculation."
        },
        {
          type: "figure",
          src: "https://static.igem.wiki/teams/6056/wiki/files/pages/project/engineering/engineering-c3-01b-new.avif",
          width: 1585,
          height: 726,
          alt: "Figure C3-01B",
          caption: "Sanger chromatogram of the Combined junction-spanning amplification product. The marked junction connects the expected 3′- and 5′-side sequences."
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
          "The shared preparation route supplied the five second-round inputs, while Combined’s quantitative assessment and junction sequence established the molecular evidence for the complete multi-antigen design. We next compared Combined circRNA with its corresponding linear precursor over time to examine whether circularisation improved RNA persistence."
]
        },
        {
          type: "prose",
          paragraphs: [
          "[Further details: Experiments — circRNA preparation and characterisation](https://2026.igem.wiki/jlu-fbh/experiments)"
]
        }
          ]
        }
      ]
    },
    {
      type: "subheading",
      id: "eng-m-3-2",
      index: "3.2",
      title: "Iteration 3.2｜Measuring the persistence of Combined RNA",
    },
    {
      type: "dbtl",
      id: "dbtl-3-2",
      stages: [
        {
          key: "design",
          title: "Design",
          blocks: [
        {
          type: "prose",
          paragraphs: [
          "After confirming the identity of the Combined circRNA preparation, we next asked whether its circular structure provided greater persistence than the corresponding linear precursor—an important reason for selecting circRNA as the project platform. We therefore established a matched time-course comparison using equal masses of both RNA forms from the same preparation batch, incubated at 37 °C and sampled at 0, 24, 48 and 72 h. By aligning their sequence background, starting mass and incubation conditions, the experiment focused on the effect of RNA topology on persistence (Wesselhoeft et al., 2018)."
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
          "Wet Lab established a four-point electrophoretic persistence assay. Equal-mass aliquots were incubated in parallel, frozen after collection and later loaded together on the same 1% agarose gel. Band intensity was normalised within the same image and then to each RNA form's own 0 h lane, producing a relative residual-signal record. With one lane representing each time point, relative band retention served as the defined descriptive endpoint."
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
          "The time course showed greater retention of Combined circRNA than its linear precursor. At 24 h, their relative band intensities were 71.9% and 5.9% of their respective 0 h values; at 72 h, they were 39.5% and 2.7%. The electrophoretic and densitometric results therefore supported greater persistence of Combined circRNA under the tested 37 °C in vitro conditions, providing experimental support for the stability advantage sought when selecting the circRNA platform."
]
        },
        {
          type: "figure",
          src: "https://static.igem.wiki/teams/6056/wiki/files/pages/project/engineering/engineering-c3-02a.avif",
          width: 1297,
          height: 537,
          alt: "Figure C3-02A",
          caption: "Combined circRNA and its linear precursor were compared by electrophoresis after incubation at 37 °C for 0, 24, 48 and 72 h."
        },
        {
          type: "figure",
          src: "https://static.igem.wiki/teams/6056/wiki/files/pages/project/engineering/engineering-c3-02b.avif",
          width: 1302,
          height: 730,
          alt: "Figure C3-02B",
          caption: "Relative band intensities were normalised to each RNA’s own 0 h value. Lines connect the measured time points."
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
          "The time course provided the first direct comparison of Combined circRNA with its linear counterpart. The mature Combined RNA is 2013 nt long and contains the complete sequence used in the experiment, including its annotated IRES region. Its length made direct three-dimensional prediction impractical, so the next iteration addressed how the real sequence could enter a reproducible structural-computation route."
]
        },
        {
          type: "prose",
          paragraphs: [
          "[Further details: Results — RNA persistence](https://2026.igem.wiki/jlu-fbh/results)"
]
        }
          ]
        }
      ]
    },
    {
      type: "subheading",
      id: "eng-m-3-3",
      index: "3.3",
      title: "Iteration 3.3｜Exploring the full-length structure of Combined RNA with TorusFold",
    },
    {
      type: "dbtl",
      id: "dbtl-3-3",
      stages: [
        {
          key: "design",
          title: "Design",
          blocks: [
        {
          type: "prose",
          paragraphs: [
          "To add a spatial perspective to the molecular measurements, we sought to explore the complete mature Combined RNA sequence. Its length exceeded the range suitable for direct processing by the selected three-dimensional prediction tool and available computing resources. We therefore developed **TorusFold**, a workflow that preserves the original sequence, predicts overlapping fragments locally and uses their shared nucleotides to assemble a full-length structural hypothesis (Hofacker, 2003; Shen et al., 2024)."
]
        },
        {
          type: "references",
          items: [
          {
                    "label": "doi:10.1093/nar/gkg599",
                    "text": "Hofacker IL. Vienna RNA secondary structure server. *Nucleic Acids Research*. 2003;31:3429–3431.",
                    "href": "https://doi.org/10.1093/nar/gkg599",
                    "hrefLabel": "doi:10.1093/nar/gkg599"
          },
          {
                    "label": "doi:10.1038/s41592-024-02487-0",
                    "text": "Shen T, Hu Z, Sun S, et al. Accurate RNA 3D structure prediction using a language model-based deep learning approach. *Nature Methods*. 2024.",
                    "href": "https://doi.org/10.1038/s41592-024-02487-0",
                    "hrefLabel": "doi:10.1038/s41592-024-02487-0"
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
          "We organised TorusFold into four steps: **(1)** use predicted base-pairing information to guide segment boundaries; **(2)** divide the 2,013 nt sequence into overlapping fragments with a target length of approximately 200 nt; **(3)** retain each fragment’s original coordinates during local three-dimensional prediction; and **(4)** align neighbouring models through their shared nucleotides, using prediction confidence to weight their contribution to the assembly."
]
        },
        {
          type: "figure",
          src: "https://static.igem.wiki/teams/6056/wiki/files/pages/project/engineering/engineering-c3-03.avif",
          width: 1854,
          height: 610,
          alt: "Figure C3-03",
          caption: "The 2,013 nt Combined sequence was divided into ten overlapping fragments. Hatched regions indicate shared sequence between neighbouring fragments. The diagram uses 0-based half-open coordinates; Table C3-02 lists the corresponding 1-based inclusive positions."
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
          "The segmentation record contained ten fragments of 195–249 nt whose combined coverage preserved the complete 2,013 nt sequence. Eight neighbouring pairs shared 30 nt, and the final pair shared 50 nt. Recording every fragment’s position, length and overlap established the sequence correspondence needed for local prediction and subsequent assembly."
]
        },
        {
          type: "table",
          caption: "Table C3-02｜Fragment coordinates and overlaps for Combined RNA",
          headers: ["Fragment", "Sequence positions", "Length (nt)", "Overlap with previous fragment (nt)"],
          rows: [
            ["C1", "1–195", "195", "—"],
            ["C2", "166–396", "231", "30"],
            ["C3", "367–588", "222", "30"],
            ["C4", "559–781", "223", "30"],
            ["C5", "752–982", "231", "30"],
            ["C6", "953–1201", "249", "30"],
            ["C7", "1172–1406", "235", "30"],
            ["C8", "1377–1619", "243", "30"],
            ["C9", "1590–1818", "229", "30"],
            ["C10", "1769–2013", "245", "50"]
          ]
        },
        {
          type: "note",
          label: "Table C3-02 note",
          body: "Coordinates are 1-based and inclusive. C1 and C10 flank the back-splice junction and share no residues with each other in this segmentation record."
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
          "The segmentation scheme defined how the full-length sequence could enter local prediction and assembly. The next task was to examine the geometry produced during refinement: **(1)** whether excessively close backbone contacts decreased and **(2)** how fragment terminal distance changed. We tested these quantities in a 200 nt fragment before presenting the separately retained full-length model."
]
        }
          ]
        }
      ]
    },
    {
      type: "subheading",
      id: "eng-m-3-4",
      index: "3.4",
      title: "Iteration 3.4｜Testing structural refinement in TorusFold",
    },
    {
      type: "dbtl",
      id: "dbtl-3-4",
      stages: [
        {
          key: "design",
          title: "Design",
          blocks: [
        {
          type: "prose",
          paragraphs: [
          "Following the segmentation scheme in Iteration 3.3, we examined whether TorusFold refinement improved structural geometry. A 200 nt fragment corresponding to Combined residues 1–200 provided a manageable test case. We compared backbone close contacts and terminal distance across successive stages, while presenting the existing 2,013 nt model separately as a full-length structural hypothesis."
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
          "The assembly workflow combined boundary alignment and relaxation with hydrogen-bond repair and final all-atom refinement. For the 200 nt test, we retained the initial reconstruction, PPR-stage model and final Amber-stage model from the same run. Each stage was evaluated using the same definitions of non-adjacent P-atom close contacts and fragment terminal P–P distance. Before-and-after views displayed the P atoms extracted from the all-atom models (Eastman et al., 2024)."
]
        },
        {
          type: "references",
          items: [
          {
                    "label": "doi:10.1021/acs.jpcb.3c06662",
                    "text": "Eastman P, Galvelis R, Peláez RP, et al. OpenMM 8: molecular dynamics simulation with machine learning potentials. *Journal of Physical Chemistry B*. 2024;128:109–116.",
                    "href": "https://doi.org/10.1021/acs.jpcb.3c06662",
                    "hrefLabel": "doi:10.1021/acs.jpcb.3c06662"
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
          "In the 200 nt test, non-adjacent P-atom close-contact pairs decreased from 8 in the initial reconstruction to 4 after PPR and 3 after Amber refinement. The fragment terminal P–P distance decreased from 6.751 Å to 5.899 Å and then 5.673 Å. These measurements showed fewer excessively close backbone contacts and a shorter terminal separation during refinement of the tested fragment."
]
        },
        {
          type: "figure",
          src: "https://static.igem.wiki/teams/6056/wiki/files/pages/project/engineering/engineering-c3-04a.avif",
          width: 1018,
          height: 369,
          alt: "Figure C3-04A",
          caption: "P-atom views of the same 200 nt Combined fragment before refinement (left) and after final Amber refinement (right). Both views originate from all-atom models of the same run."
        },
        {
          type: "table",
          caption: "Table C3-03｜Geometric diagnostics during refinement of the 200 nt fragment",
          headers: ["Stage", "Non-adjacent P-atom close-contact pairs", "Fragment terminal P–P distance (Å)"],
          rows: [
            ["Raw reconstruction", "8", "6.751"],
            ["PPR refinement", "4", "5.899"],
            ["Amber refinement", "3", "5.673"]
          ]
        },
        {
          type: "note",
          label: "Table C3-03 note",
          body: "Close contacts count P-atom pairs separated by at least three sequence positions and less than 3 Å in space. Terminal distance is measured between the first and last P atoms of the 200 nt fragment."
        },
        {
          type: "prose",
          paragraphs: [
          "Alongside this fragment-level test, the retained full-length model represented all 2,013 nt of Combined and contained 42,831 atoms. It provided a computational view of the complete sequence’s spatial organisation. The quantitative refinement measurements above refer specifically to the 200 nt fragment."
]
        },
        {
          type: "figure",
          src: "https://static.igem.wiki/teams/6056/wiki/files/pages/project/engineering/engineering-c3-04b-new.avif",
          width: 480,
          height: 369,
          alt: "Figure C3-04B",
          caption: "The separately retained full-length Combined model represents 2,013 nt and contains 42,831 atoms. It is presented as a sequence-specific structural hypothesis."
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
          "TorusFold established a segmentation scheme for the experimental Combined sequence, demonstrated geometric refinement in a fragment-level test and supplied a full-length structural hypothesis. This work established a sequence-preserving route for structural exploration while keeping fragment-level refinement results distinct from the full-length hypothesis. Translation and dendritic-cell maturation were evaluated through a separate experimental route, providing complementary functional evidence."
]
        },
        {
          type: "prose",
          paragraphs: [
          "[Further details: Software — TorusFold outputs](https://2026.igem.wiki/jlu-fbh/software)"
]
        }
          ]
        }
      ]
    },
    {
      type: "subheading",
      id: "eng-m-3-5",
      index: "3.5",
      title: "Iteration 3.5｜Verifying circRNA translation and comparing dendritic-cell maturation",
    },
    {
      type: "dbtl",
      id: "dbtl-3-5",
      stages: [
        {
          key: "design",
          title: "Design",
          blocks: [
        {
          type: "prose",
          paragraphs: [
          "The cell-validation route examined two connected steps in vaccine function: **(1)** translation of the delivered circRNA into protein and **(2)** maturation of the receiving dendritic cells, which supports subsequent T-cell activation. These experiments were conducted independently of the TorusFold structural calculations. The five-group comparison assessed the DC response to Combined alongside its TROP2 components and the empty-vector background."
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
          "Wet Lab established protein-expression and DC-maturation measurements. Anti-FLAG Western blotting compared circRNA-electroporated DCs with the negative control, using β-actin as the loading reference (Towbin et al., 1979).",
          "For the five-group maturation comparison, Blank, TROP2 CTL1, TROP2 CTL2, TROP2 CTL1+2 and Combined each delivered 5 µg of circRNA to 1×10⁶ DCs in 100 µL using programme U-002. Blank received equal-input empty-vector circRNA. Flow cytometry measured DCs expressing both CD80 and CD86, two co-stimulatory molecules associated with their ability to activate T cells (Banchereau and Steinman, 1998)."
]
        },
        {
          type: "references",
          items: [
          {
                    "label": "doi:10.1038/32588",
                    "text": "Banchereau J, Steinman RM. Dendritic cells and the control of immunity. *Nature*. 1998;392:245–252.",
                    "href": "https://doi.org/10.1038/32588",
                    "hrefLabel": "doi:10.1038/32588"
          },
          {
                    "label": "doi:10.1073/pnas.76.9.4350",
                    "text": "Towbin H, Staehelin T, Gordon J. Electrophoretic transfer of proteins from polyacrylamide gels to nitrocellulose sheets. *Proceedings of the National Academy of Sciences USA*. 1979;76:4350–4354.",
                    "href": "https://doi.org/10.1073/pnas.76.9.4350",
                    "hrefLabel": "doi:10.1073/pnas.76.9.4350"
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
          "Anti-FLAG blotting detected a distinct band near 50 kDa in the circRNA-electroporated lane, with little corresponding signal in the negative control and comparable β-actin signals. This supported translation of the circRNA-encoded protein in DCs.",
          "The maturation comparison showed a stronger response with Combined. CD80⁺CD86⁺ DCs increased from 10.33±0.55% in Blank to 15.57±0.35% and 15.80±0.36% in the two individual TROP2 groups, 17.50±0.30% in TROP2 CTL1+2 and 22.37±0.31% in Combined. Combined reached 2.16 times the Blank level and exceeded both Blank and the dual-module construct after Holm correction. These results connected protein expression with a measurable DC response and supported following the immune response into T cells."
]
        },
        {
          type: "figure",
          src: "https://static.igem.wiki/teams/6056/wiki/files/pages/project/engineering/engineering-c3-05a.avif",
          width: 1480,
          height: 812,
          alt: "Figure C3-05A",
          caption: "Anti-FLAG Western blot with β-actin as the loading reference. The original circRNA and Blank lane labels are retained."
        },
        {
          type: "figure",
          src: "https://static.igem.wiki/teams/6056/wiki/files/pages/project/engineering/engineering-c3-05b.avif",
          width: 1340,
          height: 441,
          alt: "Figure C3-05B",
          caption: "Representative flow-cytometry plots show CD80⁺CD86⁺ DCs across the five circRNA groups."
        },
        {
          type: "figure",
          src: "https://static.igem.wiki/teams/6056/wiki/files/pages/project/engineering/engineering-c3-05c.avif",
          width: 828,
          height: 766,
          alt: "Figure C3-05C",
          caption: "CD80⁺CD86⁺ DC frequencies are shown as mean ± SD; *** denotes P < 0.001 for Blank versus Combined."
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
          "The protein-expression measurement supported circRNA translation in DCs, while the five-group comparison identified Combined as the strongest DC-maturation condition. We therefore retained the same comparison groups and next examined T-cell activation, co-stimulation and effector-memory-associated phenotypes after DC–T-cell co-culture."
]
        },
        {
          type: "prose",
          paragraphs: [
          "[Further details: Results — translation and DC maturation](https://2026.igem.wiki/jlu-fbh/results)"
]
        }
          ]
        }
      ]
    },
    {
      type: "subheading",
      id: "eng-m-3-6",
      index: "3.6",
      title: "Iteration 3.6｜Following the response across complementary T-cell phenotypes",
    },
    {
      type: "dbtl",
      id: "dbtl-3-6",
      stages: [
        {
          key: "design",
          title: "Design",
          blocks: [
        {
          type: "prose",
          paragraphs: [
          "After examining whether circRNA-loaded DCs entered a maturation-associated state, we next asked how the T cells receiving their signals responded. Three complementary phenotype axes were selected to describe different parts of this response: **(1) CD8⁺CD69⁺** captured early T-cell activation, **(2) CD8⁺CD28⁺** indicated retention of the co-stimulatory receptor associated with continued responsiveness and **(3) CD45RO⁺CCR7⁻** identified the effector-memory-associated population used in our analysis. Together, these measurements followed the response from initial activation to continued responsiveness and memory-associated differentiation, while each axis was analysed separately to preserve its distinct biological meaning (Cibrián and Sánchez-Madrid, 2017; Lenschow et al., 1996; Sallusto et al., 1999)."
]
        },
        {
          type: "references",
          items: [
          {
                    "label": "doi:10.1002/eji.201646837",
                    "text": "Cibrián D, Sánchez-Madrid F. CD69: from activation marker to metabolic gatekeeper. *European Journal of Immunology*. 2017;47:946–953.",
                    "href": "https://doi.org/10.1002/eji.201646837",
                    "hrefLabel": "doi:10.1002/eji.201646837"
          },
          {
                    "label": "doi:10.1146/annurev.immunol.14.1.233",
                    "text": "Lenschow DJ, Walunas TL, Bluestone JA. CD28/B7 system of T cell costimulation. *Annual Review of Immunology*. 1996;14:233–258.",
                    "href": "https://doi.org/10.1146/annurev.immunol.14.1.233",
                    "hrefLabel": "doi:10.1146/annurev.immunol.14.1.233"
          },
          {
                    "label": "doi:10.1038/44385",
                    "text": "Sallusto F, Lenig D, Förster R, Lipp M, Lanzavecchia A. Two subsets of memory T lymphocytes with distinct homing potentials and effector functions. *Nature*. 1999;401:708–712.",
                    "href": "https://doi.org/10.1038/44385",
                    "hrefLabel": "doi:10.1038/44385"
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
          "Wet Lab established three independent flow-cytometry panels for T cells generated through the common DC–T-cell route. Blank, TROP2 CTL1, TROP2 CTL2, TROP2 CTL1+2 and Combined entered the same viability, staining and gating framework for CD8/CD69, CD8/CD28 and CD8/CD45RO/CCR7. Each group was represented by three independently electroporated and co-cultured wells, while unstained, single-stain and isotype controls supported panel interpretation."
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
          "Across the recorded CD8/CD69, CD8/CD28 and CD45RO/CCR7 comparisons, Combined remained at the leading end of the five-group response and showed increases relative to Blank. The three panels approached the T-cell response from different phenotypic directions and converged on Combined as the preparation to carry into direct cytokine-secretion measurement."
]
        },
        {
          type: "figure",
          src: "https://static.igem.wiki/teams/6056/wiki/files/pages/project/engineering/engineering-c3-06a.avif",
          width: 1360,
          height: 1250,
          alt: "Figure C3-06A",
          caption: "Representative flow-cytometry plots (top) and quantitative comparison (bottom) of CD8⁺CD69⁺ cells across the five circRNA groups, assessing the activation-associated T-cell response."
        },
        {
          type: "figure",
          src: "https://static.igem.wiki/teams/6056/wiki/files/pages/project/engineering/engineering-c3-06b.avif",
          width: 1360,
          height: 1250,
          alt: "Figure C3-06B",
          caption: "Representative flow-cytometry plots (top) and quantitative comparison (bottom) of CD8⁺CD28⁺ cells across the five circRNA groups, assessing the co-stimulation-associated phenotype."
        },
        {
          type: "figure",
          src: "https://static.igem.wiki/teams/6056/wiki/files/pages/project/engineering/engineering-c3-06c.avif",
          width: 1360,
          height: 1250,
          alt: "Figure C3-06C",
          caption: "Representative flow-cytometry plots (top) and quantitative comparison (bottom) of the CD45RO⁺CCR7⁻ population across the five circRNA groups, assessing the effector-memory-associated phenotype."
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
          "The phenotype panels supported Combined across three complementary views of the T-cell response. The next iteration retained the same five groups and used IFN-γ ELISpot to compare their cytokine-secretion-associated responses under one second-round assay."
]
        },
        {
          type: "prose",
          paragraphs: [
          "[Further details: Results — T-cell phenotypes](https://2026.igem.wiki/jlu-fbh/results)"
]
        }
          ]
        }
      ]
    },
    {
      type: "subheading",
      id: "eng-m-3-7",
      index: "3.7",
      title: "Iteration 3.7｜Comparing the five second-round preparations by ELISpot",
    },
    {
      type: "dbtl",
      id: "dbtl-3-7",
      stages: [
        {
          key: "design",
          title: "Design",
          blocks: [
        {
          type: "prose",
          paragraphs: [
          "Iteration 2.6 used the first-round ELISpot screen to retain two responsive modules from each antigen source, with TROP2 CTL1 and TROP2 CTL2 forming the leading same-antigen pair. The second-round ELISpot therefore compared five circRNA preparations within one assay: Blank represented the vector background, TROP2 CTL1 and CTL2 represented the individual modules, TROP2 CTL1+2 tested their combined response and Combined represented the complete four-antigen design. This arrangement allowed IFN-γ-associated responses to be compared across progressively integrated designs (Dakewe Biotech, n.d.)."
]
        },
        {
          type: "references",
          items: [
          {
                    "label": "Dakewe Biotech (n.d.)",
                    "text": "Dakewe Biotech (n.d.) *Human IFN-γ Precoated ELISPOT Kit (strips): instruction manual*. Cat. 2110005, Rev. C/2.",
                    "href": "https://files.dakewe.cn/crm/instruction/dy/2110005.pdf?utm_source=chatgpt.com",
                    "hrefLabel": "Instruction manual"
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
          "Wet Lab established a five-group second-round IFN-γ ELISpot. DCs carrying Blank, TROP2 CTL1, TROP2 CTL2, TROP2 CTL1+2 or Combined were co-cultured with autologous T cells at a DC:T ratio of 1:20, with 1×10⁵ cells placed in each well for 20 h. Plate handling, washing, colour development and spot counting followed one procedure across all five conditions."
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
          "The recorded spot counts were 32 for Blank, 198 for TROP2 CTL1, 227 for TROP2 CTL2, 298 for TROP2 CTL1+2 and 367 for Combined. The response increased from the vector background through the individual TROP2 modules and their paired design, with Combined producing the highest IFN-γ-associated readout. This ordering supported the value of integrating the selected modules and retained Combined as the leading design for subsequent functional evaluation."
]
        },
        {
          type: "figure",
          src: "https://static.igem.wiki/teams/6056/wiki/files/pages/project/engineering/engineering-c3-07.avif",
          width: 736,
          height: 214,
          alt: "Figure C3-07",
          caption: "IFN-γ ELISpot comparison across the five second-round circRNA groups. Combined produced the highest recorded spot count, followed by the paired TROP2 CTL1+2 design."
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
          "ELISpot added a direct IFN-γ-associated readout and placed Combined at the top of this recorded five-group run. This result supported carrying all five effector preparations into a functional comparison against the HLA-A*02:01-positive, TROP2-positive TNBC cell line MDA-MB-231."
]
        },
        {
          type: "prose",
          paragraphs: [
          "[Further details: Results — second-round ELISpot](https://2026.igem.wiki/jlu-fbh/results)"
]
        }
          ]
        }
      ]
    },
    {
      type: "subheading",
      id: "eng-m-3-8",
      index: "3.8",
      title: "Iteration 3.8｜Testing cytotoxic activity in a TNBC target-cell context",
    },
    {
      type: "dbtl",
      id: "dbtl-3-8",
      stages: [
        {
          key: "design",
          title: "Design",
          blocks: [
        {
          type: "prose",
          paragraphs: [
          "We extended the cellular evidence chain from IFN-γ secretion to target-cell function. Blank-, TROP2 CTL1-, TROP2 CTL2-, TROP2 CTL1+2- and Combined-derived effector preparations were compared against MDA-MB-231 at increasing effector-to-target ratios. Calcein-AM release retained spontaneous- and maximum-release controls, allowing every condition to be normalised to its own target-cell background (Lichtenfels et al., 1994; Neri et al., 2001)."
]
        },
        {
          type: "references",
          items: [
          {
                    "label": "PMID: 7518485",
                    "text": "Lichtenfels R, Biddison WE, Schulz H, Vogt AB, Martin R. CARE-LASS (calcein-release-assay), an improved fluorescence-based test system to measure cytotoxic T lymphocyte activity. *Journal of Immunological Methods*. 1994;172:227–239.",
                    "href": "https://pubmed.ncbi.nlm.nih.gov/7518485/",
                    "hrefLabel": "PMID: 7518485"
          },
          {
                    "label": "PMID: 11687452",
                    "text": "Neri S, Mariani E, Meneghetti A, Cattini L, Facchini A. Calcein-acetoxymethyl cytotoxicity assay: standardization of a method allowing additional analyses on recovered effector cells and supernatants. *Clinical and Diagnostic Laboratory Immunology*. 2001;8:1131–1135.",
                    "href": "https://pubmed.ncbi.nlm.nih.gov/11687452/",
                    "hrefLabel": "PMID: 11687452"
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
          "Wet Lab established a three-ratio target-cell assay. Calcein-AM-labelled MDA-MB-231 cells were combined with the five effector preparations at 20:1, 40:1 and 80:1 and co-incubated for 4–6 h. Every condition included three replicate wells together with spontaneous-, maximum- and medium-background controls. Target-cell input and release calculations were kept consistent, leaving the priming circRNA and effector-to-target ratio as the comparison variables."
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
          "Cytotoxicity increased with the effector-to-target ratio, and Combined produced the highest recorded killing across the three tested ratios. This result extended the evidence chain from translation, activation and IFN-γ secretion to direct function against an HLA- and target-matched TNBC cell line. MDA-MB-231 then served as the tumour reference for a broader target-cell comparison."
]
        },
        {
          type: "figure",
          src: "https://static.igem.wiki/teams/6056/wiki/files/pages/project/engineering/engineering-c3-08.avif",
          width: 756,
          height: 451,
          alt: "Figure C3-08",
          caption: "Killing of MDA-MB-231 TNBC cells by T cells stimulated through DCs receiving Blank, TROP2 CTL1, TROP2 CTL2, TROP2 CTL1+2 or Combined circRNA, at effector-to-target ratios of 20:1, 40:1 and 80:1. Killing increased with the effector-to-target ratio, with Combined showing the highest recorded activity at all three ratios."
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
          "Combined led the five-group comparison in the MDA-MB-231 context. An iHP safety review then refined the next question from efficacy ranking to target context: how would the same Combined-derived effectors behave against HLA-A*02:01-positive non-tumour cell lines? We fixed the effector preparation and varied the target cells in the next assay."
]
        },
        {
          type: "prose",
          paragraphs: [
          "[Further details: Results — MDA-MB-231 cytotoxicity](https://2026.igem.wiki/jlu-fbh/results)"
]
        }
          ]
        }
      ]
    },
    {
      type: "subheading",
      id: "eng-m-3-9",
      index: "3.9",
      title: "Iteration 3.9｜Comparing killing of tumour and non-tumour target cells",
    },
    {
      type: "dbtl",
      id: "dbtl-3-9",
      stages: [
        {
          key: "design",
          title: "Design",
          blocks: [
        {
          type: "prose",
          paragraphs: [
          "Iteration 3.8 established Combined-associated killing of TNBC target cells. We next examined whether these effectors also damaged non-tumour cells. Using the same Combined-primed T-cell preparation, we compared MDA-MB-231 with four HLA-A*02:01-positive non-tumour cell lines from different tissues. This matched-HLA comparison assessed tumour-target preference alongside potential effects on non-tumour cells."
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
          "Wet Lab used the Calcein-AM release assay at effector-to-target ratios of 80:1 and 100:1. Targets included MDA-MB-231 and four non-tumour cell lines: HCAEC from coronary artery endothelium, LX-2 from hepatic stellate cells, BEAS-2B from bronchial epithelium and MCF12A from mammary epithelium. Each target had its own spontaneous- and maximum-release controls. Experimental and control conditions each contained three technical replicate wells on the same plate."
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
          "At 80:1, mean killing of the four non-tumour cell lines ranged from 0.78% to 2.77%, compared with 59.24±2.10% for MDA-MB-231. At 100:1, the corresponding range was 1.31–3.47%, while tumour-cell killing reached 62.07±3.58%. MCF12A, which shared a mammary epithelial origin with the tumour target, showed only 1.86% and 2.26% killing at the two ratios. The consistent separation supported preferential activity against the tumour target while retaining low non-tumour-cell killing within the tested panel."
]
        },
        {
          type: "figure",
          src: "https://static.igem.wiki/teams/6056/wiki/files/pages/project/engineering/engineering-c3-09.avif",
          width: 694,
          height: 450,
          alt: "Figure C3-09",
          caption: "Combined-primed T cells showed substantially higher killing of MDA-MB-231 than of four HLA-A*02:01-positive non-tumour cell lines at both tested ratios. Values are mean±SD across three technical replicate wells per condition."
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
          "This comparison showed that tumour-cell killing and effects on non-tumour cells needed to remain separate evaluation dimensions. Strong activity against MDA-MB-231 alone could not establish target preference; that interpretation required comparison with non-tumour targets under matched conditions. We therefore retained both readouts in evaluating Combined, while limiting the low-killing conclusion to the tested cell panel and conditions. Carrier-related effects were assessed independently through the earlier empty-LNP CCK-8 assay described below."
]
        },
        {
          type: "prose",
          paragraphs: [
          "[Further details: Experiments — target-cell comparison](https://2026.igem.wiki/jlu-fbh/experiments)"
]
        }
          ]
        }
      ]
    },
    {
      type: "subheading",
      id: "eng-m-3-10",
      index: "3.10",
      title: "Iteration 3.10｜Assessing the effect of empty LNP on dendritic-cell viability",
    },
    {
      type: "dbtl",
      id: "dbtl-3-10",
      stages: [
        {
          key: "design",
          title: "Design",
          blocks: [
        {
          type: "prose",
          paragraphs: [
          "Alongside assessing effector-cell function, we needed to determine how the delivery carrier itself affected DC viability. We addressed this question in an earlier, independent experiment using empty LNP without circRNA cargo to isolate carrier-related effects. A five-level input series and a common 24 h CCK-8 readout assessed how increasing carrier amounts affected cell viability (Dojindo Laboratories, 2026)."
]
        },
        {
          type: "references",
          items: [
          {
                    "label": "Official manual",
                    "text": "Dojindo Laboratories. *Cell Counting Kit-8 (CCK-8) Product Manual*, Code CK04. Revised April 14, 2026.",
                    "href": "https://www.dojindo.com/manual/CK04/",
                    "hrefLabel": "Official manual"
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
          "Wet Lab seeded 1×10⁴ immature monocyte-derived DCs per well and added empty LNP at 0, 50, 100, 200 or 400 ng per well. Each level contained four replicate wells. After 24 h, CCK-8 absorbance was corrected using cell-free reagent wells and normalised to the 0 ng control, producing a comparable relative-viability series."
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
          "DC viability remained near the untreated level at 50–200 ng per well, with relative values of 101.7±3.7%, 106.3±4.7% and 103.0±1.6%; none differed significantly from the control. At 400 ng, viability fell to 57.2±5.8% (Holm-corrected P=7.6×10⁻⁵). The series identified a clear change between 200 and 400 ng, supporting carrier inputs up to 200 ng per well as compatible with maintained DC viability under the tested conditions."
]
        },
        {
          type: "figure",
          src: "https://static.igem.wiki/teams/6056/wiki/files/pages/project/engineering/engineering-c3-10.avif",
          width: 699,
          height: 486,
          alt: "Figure C3-10",
          caption: "Immature monocyte-derived DCs received empty LNP without circRNA cargo for 24 h. Relative viability remained near baseline at 50–200 ng per well and decreased at 400 ng. Values are mean±SD across four replicate wells, normalised to the 0 ng control."
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
          "The assay added a carrier-specific viability measurement to the molecular and cellular evidence assembled for Combined. As these records accumulated, their transfer required more than a list of results: another user needed to identify the tested material, follow the comparison and recover the reasoning behind each decision. The next iteration therefore tested how CircuForge preserved and transferred this information."
]
        },
        {
          type: "prose",
          paragraphs: [
          "[Further details: Results — empty-LNP viability](https://2026.igem.wiki/jlu-fbh/results)"
]
        }
          ]
        }
      ]
    },
    {
      type: "subheading",
      id: "eng-m-3-11",
      index: "3.11",
      title: "Iteration 3.11｜Testing CircuForge as a transferable design workflow",
    },
    {
      type: "dbtl",
      id: "dbtl-3-11",
      stages: [
        {
          key: "design",
          title: "Design",
          blocks: [
        {
          type: "prose",
          paragraphs: [
          "Iteration 2.11 established CircuForge V2.0 as a guided workflow that retained candidate identity, review decisions and supporting evidence across modules. As the project accumulated source data, sequence records and exported designs, we used this more complete evidence chain to test whether the workflow remained understandable after handoff to another user. Software-architecture consultation focused the evaluation on three requirements: candidate identity should persist between modules, long-running external tasks should display their progress and returned evidence should pass through an explicit researcher-confirmation step."
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
          "Building on CircuForge V2.0, we refined the transfer workflow around stable identifiers, Evidence Cards, the Design Cart, visible task states, run manifests and reloadable Project Bundles. External services remained connected through adapters, while PENDING, RUNNING, COMPLETED and FAILED made task progress visible. KEEP, REVIEW and REJECT recorded the review state, and a separate confirmation action determined whether an entry entered the Design Cart. Together, these functions kept researcher judgement and supporting evidence connected throughout the handoff."
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
          "Automated tests covered identifier stability, review-state assignment, Cart deduplication, task creation and status changes, and export readback. Task walkthroughs highlighted the BLASTP transition as a priority for workflow refinement. Users needed a clearer connection between task submission, returned alignment evidence and researcher confirmation. We translated this finding into a three-stage interface requirement—submit, monitor and review—with emphasis on visible task progress, accessible evidence and an explicit confirmation step."
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
          "The revision established three practical rules for transferable workflows: orientation should precede unfamiliar actions, intermediate states should remain visible and final acceptance should stay with the user. This handoff challenge was also central to the Virtual Laboratory, which needed to remain understandable and usable after the team stepped away."
]
        },
        {
          type: "prose",
          paragraphs: [
          "[Further details: Software — CircuForge](https://2026.igem.wiki/jlu-fbh/software)"
]
        }
          ]
        }
      ]
    },
    {
      type: "subheading",
      id: "eng-m-3-12",
      index: "3.12",
      title: "Iteration 3.12｜Moving orientation before the first virtual operation",
    },
    {
      type: "dbtl",
      id: "dbtl-3-12",
      stages: [
        {
          key: "design",
          title: "Design",
          blocks: [
        {
          type: "prose",
          paragraphs: [
          "Iteration 1.3 established layered education as a principle for adapting scientific content to learners with different ages and prior knowledge. Iteration 2.8 then showed at Hailun No. 1 High School that the revised Virtual Laboratory could continue to be used by a teacher after handoff. However, children in some economically disadvantaged and resource-limited communities still have few opportunities to enter a laboratory because their schools lack specialised instruments, consumables and trained experimental support. We hoped that the Virtual Laboratory could help narrow this gap, so that a child’s opportunity to experience experimental science would not be determined solely by geography or school resources.",
          "With this purpose, we brought the programme to Pilu Town and organised a Gram-staining activity for second- and fourth-grade pupils. Younger learners mainly followed colour and touch cues, while older pupils more often paused to ask about the experimental purpose and materials. These observations defined the next design target: provide essential orientation before the first virtual action and keep supporting information accessible throughout the procedure."
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
          "Education and the development team reorganised the learning entry into four concise orientation cards: Theory introduced the purpose and principle of Gram staining, Safety highlighted operational precautions, Instruments identified the required equipment and Reagents explained the materials used in the procedure. All four cards appeared before the first operation and remained accessible from the procedure screen, providing different levels of support within one continuous activity route."
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
          "During first use in Pilu Town, Sichuan Province, China, second-grade learners tended to follow colour and touch cues, while fourth-grade learners more often paused to ask about the purpose, instruments and reagents involved in Gram staining. These behaviours defined two requirements for the revised interface: establish the experimental context before action and keep supporting information accessible during operation. A complete walkthrough confirmed that Safety, Theory, Instruments and Reagents all appeared before the first operation and could be reopened from the procedure screen."
]
        },
        {
          type: "carousel",
          figureLabel: "Figure C3-11",
          images: [
          {
                    "src": "https://static.igem.wiki/teams/6056/wiki/files/pages/project/engineering/engineering-c3-11a.avif"
          },
          {
                    "src": "https://static.igem.wiki/teams/6056/wiki/files/pages/project/engineering/engineering-c3-11b.avif"
          }
],
          caption: "During the Gram-staining learning activity in Pilu Town, team members used illustrated teaching materials to introduce crystal violet and iodine, explaining their roles in the staining procedure to primary-school learners."
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
          "The Pilu Town observation and interface walkthrough showed that first-time learners benefited from receiving the experimental purpose, safety information, instruments and reagents before beginning an unfamiliar virtual procedure, with the same information remaining available during operation. We therefore retained the four-card entry as the standard orientation structure for the Virtual Laboratory. This decision also extended layered education from a single interface to a complete teaching route: the next iteration would connect virtual orientation, physical experimentation, result interpretation and molecular design for high-school learners in Synbio Classroom."
]
        },
        {
          type: "prose",
          paragraphs: [
          "[Further details: Education — Virtual Laboratory and the Pilu Town activity](https://2026.igem.wiki/jlu-fbh/education)"
]
        }
          ]
        }
      ]
    },
    {
      type: "subheading",
      id: "eng-m-3-13",
      index: "3.13",
      title: "Iteration 3.13｜Connecting orientation, physical experiments and molecular design",
    },
    {
      type: "dbtl",
      id: "dbtl-3-13",
      stages: [
        {
          key: "design",
          title: "Design",
          blocks: [
        {
          type: "prose",
          paragraphs: [
          "Iteration 3.12 established how orientation could support learners entering a single unfamiliar virtual procedure. For students about to enter Grade 11, the next educational need was to connect procedures that they had previously encountered as separate concepts. Many already recognised terms such as DNA, PCR and plasmids, but had limited opportunities to follow how preparation, operation, verification, interpretation and design form one research process. We therefore designed Synbio Classroom for 16 rising Grade 11 students as a connected learning route, extending layered education from interface guidance to research-process understanding."
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
          "Education, Wet Lab members and instructors built a course containing laboratory safety, pipetting, DNA extraction, PCR, gel electrophoresis, a process game and plasmid-component design. The activity order followed the movement of biological information: learners first prepared and handled material, then interpreted experimental outputs and finally used functional elements to assemble a design. Virtual resources supplied procedural orientation and review where they matched the course sequence."
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
          "Activity records documented 16 learners participating in physical operations, the process game and plasmid-component design. Their clearest qualitative feedback emerged after the design activity, when they continued asking how a plasmid design would proceed through amplification, digestion, ligation, transformation and verification. The originally planned Virtual Laboratory component covered one PCR- and electrophoresis-related exercise. In response to these questions, the teaching team expanded it during the session into a guided walkthrough of the platform’s existing nine-experiment route. The change from one virtual exercise to a nine-experiment walkthrough provided a measurable revision of the teaching scope, while the learners’ questions identified the need for stronger continuity between design and verification."
]
        },
        {
          type: "carousel",
          figureLabel: "Figure C3-12",
          images: [
          {
                    "src": "https://static.igem.wiki/teams/6056/wiki/files/pages/project/engineering/engineering-c3-12a.avif"
          },
          {
                    "src": "https://static.igem.wiki/teams/6056/wiki/files/pages/project/engineering/engineering-c3-12b.avif"
          },
          {
                    "src": "https://static.igem.wiki/teams/6056/wiki/files/pages/project/engineering/engineering-c3-12c.avif"
          }
],
          caption: "Photographs from Synbio Classroom document guided pipetting practice, a classroom discussion of gel electrophoresis results, and a group photograph of learners and JLU-FBH team members."
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
          "The layered Virtual Laboratory route produced three progressive outcomes: **(1)** at Hailun No. 1 High School, it became a resource that a teacher could continue using independently; **(2)** in Pilu Town, it gained a four-module orientation structure adapted to younger learners; and **(3)** in Synbio Classroom, it connected virtual preparation, physical experiments, result interpretation and molecular design for 16 high-school learners. These outcomes showed that the same scientific workflow could retain its core while changing its entry point and depth for different audiences. As Wet Lab, Education, software and communication roles increasingly appeared together in these materials, a new visual requirement emerged: the shared project character needed to preserve one identity while making each contribution recognisable."
]
        },
        {
          type: "prose",
          paragraphs: [
          "[Further details: Education — Synbio Classroom](https://2026.igem.wiki/jlu-fbh/education)"
]
        }
          ]
        }
      ]
    },
    {
      type: "subheading",
      id: "eng-m-3-14",
      index: "3.14",
      title: "Iteration 3.14｜Iterating the sheep character family through exchange feedback",
    },
    {
      type: "dbtl",
      id: "dbtl-3-14",
      stages: [
        {
          key: "design",
          title: "Design",
          blocks: [
        {
          type: "prose",
          paragraphs: [
          "Iteration 1.3 established CirCure’s first sheep-based visual identity, which later appeared in presentation materials, keychains and fridge magnets at China iGEM exchanges. Participants recognised the shared character and suggested that it could also represent the different work behind the project, including Dry Lab, Wet Lab and Engineering. We therefore asked how the original sheep could evolve into distinct project roles while remaining recognisably part of CirCure."
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
          "In response to this feedback, Visual Design developed a role-based sheep family by translating each team’s characteristic work into clothing, tools and actions. Laboratory instruments identified Wet Lab, computers and computational elements represented Dry Lab and Software, and teaching materials distinguished Education. The original silhouette, facial features and colour palette remained consistent across the variants, which were then applied to revised presentation materials, keychains and fridge magnets."
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
          "The revised character family and its corresponding merchandise were taken to subsequent iGEM exchange activities. Qualitative feedback focused on two outcomes: the variants remained recognisable as members of the same CirCure character family, and their clothing, tools and actions made the represented roles easier to distinguish. The same role cues also remained visible when transferred from presentation graphics to the smaller surfaces of keychains and fridge magnets. These exchanges therefore tested both project-level consistency and role-level clarity across digital and physical formats."
]
        },
        {
          type: "carousel",
          figureLabel: "Figure C3-13",
          images: [
          {
                    "src": "https://static.igem.wiki/teams/6056/wiki/files/pages/project/engineering/engineering-c3-13a.avif"
          },
          {
                    "src": "https://static.igem.wiki/teams/6056/wiki/files/pages/project/engineering/engineering-c3-13b.avif"
          },
          {
                    "src": "https://static.igem.wiki/teams/6056/wiki/files/pages/project/engineering/engineering-c3-13c.avif"
          },
          {
                    "src": "https://static.igem.wiki/teams/6056/wiki/files/pages/project/engineering/engineering-c3-13d.avif"
          },
          {
                    "src": "https://static.igem.wiki/teams/6056/wiki/files/pages/project/engineering/engineering-c3-13e.avif"
          }
],
          caption: "Photographs document CirCure project displays and discussions at iGEM exchange activities. The sheep character variants share a consistent colour palette and core appearance, while accessories including a blueprint, microphone and notebook provide distinct visual cues for different team roles."
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
          "The two rounds of exchange established a reusable visual rule: the sheep’s silhouette, face and colour palette should remain fixed as the project identity, while clothing, tools and actions could vary to express different roles. We retained this “shared identity plus role-specific cues” system for later Wiki and presentation materials. It also provided the visual basis for representing the project teams as distinguishable but connected gears within the CirCure TIME overview."
]
        }
          ]
        }
      ]
    }
  ],
  note: {
    label: "Cycle 3 outcome",
    body: "**M—Measurement** connected the Combined design to measurable molecular and cellular performance. Five comparison preparations followed a shared production route, with DNA-template checks and Combined junction sequencing linking the design records to the experimental materials. The time course demonstrated greater RNA persistence than the linear precursor, while TorusFold produced a structural hypothesis for the full-length sequence. Cellular measurements connected circRNA translation with DC maturation, T-cell responses, IFN-γ secretion and tumour-cell killing. The non-tumour-cell comparison and empty-LNP assay complemented these functional results with target-selectivity and carrier-viability evidence. The non-tumour-cell comparison was conducted alongside the in vivo work described in Cycle 4, providing complementary in vitro risk-assessment evidence. CircuForge improved the transfer of design records, layered educational activities brought experimental workflows to different learners, and the revised visual system made team roles recognisable. Together, these outcomes contributed molecular, cellular and computational evidence to the evaluation of Combined and made the project’s methods and findings easier to use and communicate."
  }
};
