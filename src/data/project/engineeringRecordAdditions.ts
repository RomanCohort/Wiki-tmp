import type {
  WikiSection,
  WikiDbTLStageKey,
} from "../../components/wiki/wikiPageTypes";
import type { EngineeringIterationDatum } from "./engineeringPage";

export const cycle2Iterations: EngineeringIterationDatum[] = [
  {
    id: "eng-i-2-1",
    cycle: 2,
    cycleId: "engineering-cycle-2",
    index: "2.1",
    label: "Iteration 2.1｜Defining a traceable epitope-prioritisation route",
    short: "Defining a traceable epitope-prioritisation route",
    teams: ["dry-lab"],
  },
  {
    id: "eng-i-2-2",
    cycle: 2,
    cycleId: "engineering-cycle-2",
    index: "2.2",
    label: "Iteration 2.2｜Using structural review to define the Wet Lab handoff",
    short: "Using structural review to define the Wet Lab handoff",
    teams: ["dry-lab"],
  },
  {
    id: "eng-i-2-3",
    cycle: 2,
    cycleId: "engineering-cycle-2",
    index: "2.3",
    label: "Iteration 2.3｜Converting overlapping epitopes into continuous coding designs",
    short: "Converting overlapping epitopes into continuous coding designs",
    teams: ["dry-lab","wet-lab"],
  },
  {
    id: "eng-i-2-4",
    cycle: 2,
    cycleId: "engineering-cycle-2",
    index: "2.4",
    label: "Iteration 2.4｜Connecting coding designs to transcribable DNA templates",
    short: "Connecting coding designs to transcribable DNA templates",
    teams: ["wet-lab"],
  },
  {
    id: "eng-i-2-5",
    cycle: 2,
    cycleId: "engineering-cycle-2",
    index: "2.5",
    label: "Iteration 2.5｜Producing comparable circRNA inputs for the first screen",
    short: "Producing comparable circRNA inputs for the first screen",
    teams: ["wet-lab"],
  },
  {
    id: "eng-i-2-6",
    cycle: 2,
    cycleId: "engineering-cycle-2",
    index: "2.6",
    label: "Iteration 2.6｜Selecting two responsive modules from each antigen source",
    short: "Selecting two responsive modules from each antigen source",
    teams: ["wet-lab"],
  },
  {
    id: "eng-i-2-7",
    cycle: 2,
    cycleId: "engineering-cycle-2",
    index: "2.7",
    label: "Iteration 2.7｜Translating recognition into Vaccine Classroom",
    short: "Translating recognition into Vaccine Classroom",
    teams: ["education","visual-design"],
  },
  {
    id: "eng-i-2-8",
    cycle: 2,
    cycleId: "engineering-cycle-2",
    index: "2.8",
    label: "Iteration 2.8｜From team-guided use to independent classroom teaching",
    short: "From team-guided use to independent classroom teaching",
    teams: ["education"],
  },
  {
    id: "eng-i-2-9",
    cycle: 2,
    cycleId: "engineering-cycle-2",
    index: "2.9",
    label: "Iteration 2.9｜Extending the first-round evidence from secretion to cellular action",
    short: "Extending the first-round evidence from secretion to cellular action",
    teams: ["wet-lab"],
  },
  {
    id: "eng-i-2-10",
    cycle: 2,
    cycleId: "engineering-cycle-2",
    index: "2.10",
    label: "Iteration 2.10｜Integrating eight selected modules into Combined",
    short: "Integrating eight selected modules into Combined",
    teams: ["wet-lab"],
  },
  {
    id: "eng-i-2-11",
    cycle: 2,
    cycleId: "engineering-cycle-2",
    index: "2.11",
    label: "Iteration 2.11｜Turning the integration route into a traceable CircuForge workflow",
    short: "Turning the integration route into a traceable CircuForge workflow",
    teams: ["dry-lab"],
  },
];

export const cycle2Section: WikiSection = {
  id: "engineering-cycle-2",
  index: "02",
  kicker: "Cycle 2 — Integration",
  navLabel: "Cycle 2 — Integration",
  title: "Cycle 2: From epitope exploration to Combined",
  summary: "TIME continues with **I—Integration**. Cycle 1 defined four antigen sources and a common human DC–T-cell context; this cycle connected those starting points to an experimentally selected multi-antigen...",
  blocks: [
        {
          type: "prose",
          paragraphs: [
          "TIME continues with **I—Integration**. Cycle 1 defined four antigen sources and a common human DC–T-cell context; this cycle connected those starting points to an experimentally selected multi-antigen design. Dry Lab first reduced the peptide search through sequence prediction and structural review. Wet Lab then converted retained epitope sequences into traceable coding designs, corresponding circRNA preparations and a shared first-round screen. ELISpot, cellular activation and overall effector-activity measurements supplied complementary evidence for selecting modules and building Combined. Education and Visual Design translated recognition and experimental continuity into accessible learning experiences, while CircuForge developed the record structure needed to preserve decisions across a longer design workflow."
]
        },
    {
      type: "subheading",
      id: "eng-i-2-1",
      index: "2.1",
      title: "Iteration 2.1｜Defining a traceable epitope-prioritisation route",
    },
    {
      type: "dbtl",
      id: "dbtl-2-1",
      stages: [
        {
          key: "design",
          title: "Design",
          blocks: [
        {
          type: "prose",
          paragraphs: [
          "The four antigen sources retained in Cycle 1 established the protein space for epitope exploration. We next moved from source proteins to experimentally comparable short sequences under a defined HLA context. The Dry Lab consultation with Associate Professor Qingtian Guan that shaped Iteration 1.5 helped us distinguish two connected decisions: antigen selection identified the proteins to examine, while epitope prediction prioritised peptide sequences within those proteins. We selected HLA-A*02:01 as a well-characterised starting allele and required every predicted peptide to retain its source antigen, protein coordinates, HLA context, prediction outputs and selection status. Canonical UniProt sequences provided a common protein reference, while the IEDB environment supplied the prediction tools (The UniProt Consortium, 2025; Yan et al., 2024)."
]
        },
        {
          type: "references",
          items: [
          {
                    "label": "doi:10.1093/nar/gkae1010",
                    "text": "The UniProt Consortium. UniProt: the Universal Protein Knowledgebase in 2025. *Nucleic Acids Research*. 2025;53–D617.",
                    "href": "https://doi.org/10.1093/nar/gkae1010",
                    "hrefLabel": "doi:10.1093/nar/gkae1010"
          },
          {
                    "label": "doi:10.1093/nar/gkae407",
                    "text": "Yan Z, Kim K, Kim H, et al. Next-generation IEDB tools: a platform for epitope prediction and analysis. *Nucleic Acids Research*. 2024;52–W532.",
                    "href": "https://doi.org/10.1093/nar/gkae407",
                    "hrefLabel": "doi:10.1093/nar/gkae407"
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
          "We built a staged prioritisation route using all overlapping nine-amino-acid windows from the four canonical protein sequences. Each peptide record linked its sequence and source coordinates to predicted HLA-A*02:01 binding affinity, sequence-based immunogenicity and processing-related outputs. The numerical screen applied two predefined criteria in sequence:",
          "**1. Binding-affinity criterion:** Peptides with a predicted HLA-A*02:01 binding IC50 below 500 nM were retained, identifying sequences with stronger predicted binding.",
          "**2. Immunogenicity criterion:** The retained peptides were further required to have an IEDB immunogenicity score above zero, prioritising sequences with favourable immunogenicity predictions.",
          "Processing- and eluted-ligand-related outputs were retained as supporting fields for subsequent review rather than applied as additional independent cutoffs (Reynisson et al., 2020; Calis et al., 2013; Peters et al., 2003; Tenzer et al., 2005).",
          "Peptides satisfying both criteria then entered a source-protein context review. Their start and end coordinates were mapped onto the corresponding UniProt canonical sequences and compared individually with signal-peptide and transmembrane-region annotations. We also recorded sequence overlaps and the representation of all four antigen sources to support later coding design. This route connected each peptide’s numerical prediction results with its biological position in the source protein and preserved the basis for every subsequent selection decision."
]
        },
        {
          type: "references",
          items: [
          {
                    "label": "doi:10.1093/nar/gkaa379",
                    "text": "Reynisson B, Alvarez B, Paul S, Peters B, Nielsen M. NetMHCpan-4.1 and NetMHCIIpan-4.0: improved predictions of MHC antigen presentation by concurrent motif deconvolution and integration of MS MHC eluted ligand data. *Nucleic Acids Research*. 2020;48–W454.",
                    "href": "https://doi.org/10.1093/nar/gkaa379",
                    "hrefLabel": "doi:10.1093/nar/gkaa379"
          },
          {
                    "label": "doi:10.1371/journal.pcbi.1003266",
                    "text": "Calis JJA, Maybeno M, Greenbaum JA, et al. Properties of MHC class I presented peptides that enhance immunogenicity. *PLoS Computational Biology*. 2013;9.",
                    "href": "https://doi.org/10.1371/journal.pcbi.1003266",
                    "hrefLabel": "doi:10.1371/journal.pcbi.1003266"
          },
          {
                    "label": "doi:10.4049/jimmunol.171.4.1741",
                    "text": "Peters B, Bulik S, Tampé R, Van Endert PM, Holzhütter HG. Identifying MHC class I epitopes by predicting the TAP transport efficiency of epitope precursors. *Journal of Immunology*. 2003;171:1741–1749.",
                    "href": "https://doi.org/10.4049/jimmunol.171.4.1741",
                    "hrefLabel": "doi:10.4049/jimmunol.171.4.1741"
          },
          {
                    "label": "doi:10.1007/s00018-005-4528-2",
                    "text": "Tenzer S, Peters B, Bulik S, et al. Modeling the MHC class I pathway by combining predictions of proteasomal cleavage, TAP transport and MHC class I binding. *Cellular and Molecular Life Sciences*. 2005;62:1025–1037.",
                    "href": "https://doi.org/10.1007/s00018-005-4528-2",
                    "hrefLabel": "doi:10.1007/s00018-005-4528-2"
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
          "The four canonical proteins generated 1,838 overlapping nine-amino-acid peptides: 315 from TROP2, 274 from B7-H4, 502 from Nectin-4 and 747 from LIV-1. The binding-affinity threshold retained 83 peptides—17, 13, 15 and 38 from the four respective sources. Applying the positive immunogenicity-score requirement retained 51 peptides: nine from TROP2, ten from B7-H4, ten from Nectin-4 and twenty-two from LIV-1.",
          "We then mapped these 51 peptides back to their source proteins and compared their coordinates with UniProt signal-peptide and transmembrane annotations. The source-protein review formed a 17-epitope shortlist comprising four TROP2, two B7-H4, six Nectin-4 and five LIV-1 sequences. Each shortlisted epitope retained its binding-affinity result, immunogenicity score, source coordinates and protein-context record, providing a traceable input for structural review."
]
        },
        {
          type: "figure",
          src: "https://static.igem.wiki/teams/6056/wiki/files/pages/project/engineering/engineering-c2-01.avif",
          width: 3000,
          height: 2100,
          alt: "Figure C2-01",
          caption: "Binding-affinity and immunogenicity thresholds followed by source-protein context review reduced 1,838 overlapping nine-amino-acid peptides to 17 traceable candidate epitopes."
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
          "The staged route connected numerical prediction with source-protein context and produced 17 candidate epitopes carrying explicit selection records. The next decision concerned their predicted peptide–HLA arrangements, so the 17-sequence shortlist entered a shared structural-review route before the experimental handoff. Natural presentation was assigned to a dedicated subsequent evidence layer. Further details are provided in [Bioinformatics: epitope prediction](https://2026.igem.wiki/jlu-fbh/bioinformatics) and [Integrated Human Practices: Dry Lab route](https://2026.igem.wiki/jlu-fbh/human-practices)."
]
        }
          ]
        }
      ]
    },
    {
      type: "subheading",
      id: "eng-i-2-2",
      index: "2.2",
      title: "Iteration 2.2｜Using structural review to define the Wet Lab handoff",
    },
    {
      type: "dbtl",
      id: "dbtl-2-2",
      stages: [
        {
          key: "design",
          title: "Design",
          blocks: [
        {
          type: "prose",
          paragraphs: [
          "Iteration 2.1 produced 17 traceable candidate epitopes through sequence prediction and source-protein context review. Dry Lab then introduced a unified structural assessment to support the Wet Lab handoff. We examined peptide placement within the HLA-A*02:01 binding groove, P2/P9 anchoring, interface contacts, consistency across sampled models and structural conflicts. These observations supported computational prioritisation, while subsequent cell-based experiments would evaluate immune responses (Bouvier and Wiley, 1994; Saper et al., 1991)."
]
        },
        {
          type: "references",
          items: [
          {
                    "label": "doi:10.1126/science.8023162",
                    "text": "Bouvier M, Wiley DC. Importance of peptide amino and carboxyl termini to the stability of MHC class I molecules. *Science*. 1994;265:398–402.",
                    "href": "https://doi.org/10.1126/science.8023162",
                    "hrefLabel": "doi:10.1126/science.8023162"
          },
          {
                    "label": "doi:10.1016/0022-2836(91)90567-P",
                    "text": "Saper MA, Bjorkman PJ, Wiley DC. Refined structure of the human histocompatibility antigen HLA-A2 at 2.6 Å resolution. *Journal of Molecular Biology*. 1991;219:277–319.",
                    "href": "https://doi.org/10.1016/0022-2836%2891%2990567-P",
                    "hrefLabel": "doi:10.1016/0022-2836(91)90567-P"
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
          "We established a unified AlphaFold 3 structural-review workflow for all 17 candidates. Each peptide was submitted with the HLA-A*02:01 heavy chain and β2-microglobulin, with structural templates enabled. Each task returned five sampled models; all 85 models and their confidence files were retained, and all five models per candidate were included in the structural measurements (Abramson et al., 2024).",
          "The review was organised into five dimensions:",
          "**1. Groove placement:** the peptide’s position and orientation within the HLA binding groove.",
          "**2. P2/P9 anchoring:** side-chain burial at positions 2 and 9 and their accommodation within the B and F pockets, respectively.",
          "**3. Interface contacts:** peptide–HLA contacts and the conserved backbone hydrogen-bond network.",
          "**4. Model consistency:** agreement in structural measurements and review outcomes across the five sampled models.",
          "**5. Structural conflicts:** recurring steric clashes, distortion or displacement.",
          "Each record remained linked to the source antigen, protein coordinates and IEDB prediction history. The representative TROP2 peptide `SVCWCVNSV` documented the PyMOL workflow for examining peptide placement, interface residues and predicted hydrogen bonds (Saper et al., 1991)."
]
        },
        {
          type: "figure",
          src: "https://static.igem.wiki/teams/6056/wiki/files/pages/project/engineering/engineering-c2-02a.avif",
          width: 3000,
          height: 2100,
          alt: "Figure C2-02A",
          caption: "Each candidate peptide was modelled with the HLA-A*02:01 heavy chain and β2-microglobulin. All five returned models were retained and assessed across five structural-review dimensions. `SVCWCVNSV` illustrated the PyMOL measurement and visualization workflow."
        },
        {
          type: "references",
          items: [
          {
                    "label": "doi:10.1038/s41586-024-07487-w",
                    "text": "Abramson J, Adler J, Dunger J, et al. Accurate structure prediction of biomolecular interactions with AlphaFold 3. *Nature*. 2024;630:493–500.",
                    "href": "https://doi.org/10.1038/s41586-024-07487-w",
                    "hrefLabel": "doi:10.1038/s41586-024-07487-w"
          },
          {
                    "label": "doi:10.1016/0022-2836(91)90567-P",
                    "text": "Saper MA, Bjorkman PJ, Wiley DC. Refined structure of the human histocompatibility antigen HLA-A2 at 2.6 Å resolution. *Journal of Molecular Biology*. 1991;219:277–319.",
                    "href": "https://doi.org/10.1016/0022-2836%2891%2990567-P",
                    "hrefLabel": "doi:10.1016/0022-2836(91)90567-P"
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
          "The first-round handoff retained 15 of the 17 candidate epitopes: four TROP2, two B7-H4, four Nectin-4 and five LIV-1 sequences. `HILHVSFLA` and `FLAEASVRG` were not included in the first-round coding set. The table summarises structural measurements alongside coding status, while the retained sequences remained linked to their IEDB results and source-protein coordinates for Wet Lab preparation."
]
        },
        {
          type: "table",
          caption: "Table C2-02B｜Structural measurements and first-round coding status of 17 candidate epitopes",
          headers: [
            "Antigen",
            "Peptide",
            "P2 side-chain burial (%)",
            "P9 side-chain burial (%)",
            "P9 buried area / reference ratio (Å² / %)",
            "Conserved hydrogen-bond network",
            "TCR-facing exposed area (Å²)",
            "First-round coding status"
          ],
          rows: [
            ["TROP2", "RLFRERYRL", "99.8", "99.7", "143.8 / 103", "11.11", "374", "Included"],
            ["TROP2", "SVCWCVNSV", "99.8", "100", "114.4 / 82", "11.11", "245", "Included"],
            ["TROP2", "TLIYYLDEI", "99.8", "100", "140.0 / 100", "11.11", "361", "Included"],
            ["TROP2", "YLDEIPPKF", "99.8", "99.4", "173.3 / 124", "11.11", "270", "Included"],
            ["B7-H4", "AVFADQVIV", "99.8", "100", "115.1 / 82", "11.11", "252", "Included"],
            ["B7-H4", "WLKEGVLGL", "99.8", "99.9", "140.2 / 100", "11.11", "147", "Included"],
            ["Nectin-4", "AVTSEFHLV", "99.9", "100", "114.3 / 82", "11.11", "240", "Included"],
            ["Nectin-4", "FLAEASVRG", "99.8", "Undefined", "0.0 / 0", "11.11", "293", "Not included"],
            ["Nectin-4", "FQARLRLRV", "99", "100", "113.7 / 81", "11.11", "424", "Included"],
            ["Nectin-4", "HILHVSFLA", "99.9", "99.4", "60.1 / 43", "11.11", "269", "Not included"],
            ["Nectin-4", "RLRVLVPPL", "99.8", "100", "139.6 / 100", "11.11", "259", "Included"],
            ["Nectin-4", "YINGRGHLV", "99.9", "100", "113.5 / 81", "11.11", "226", "Included"],
            ["LIV-1", "FIGHYAENV", "99.9", "100", "113.9 / 81", "11.11", "249", "Included"],
            ["LIV-1", "GLHNFSDGL", "99.7", "99.7", "139.8 / 100", "11.11", "222", "Included"],
            ["LIV-1", "GVATLAWMV", "99.8", "100", "113.3 / 81", "11.11", "280", "Included"],
            ["LIV-1", "SVAVFCHEL", "99.8", "99.7", "139.8 / 100", "11.11", "277", "Included"],
            ["LIV-1", "TVSEGTHFL", "99.8", "99.7", "139.5 / 100", "11.11", "234", "Included"]
          ]
        },
        {
          type: "note",
          label: "Table C2-02B note",
          body: "Coding status records inclusion in the first-round experimental design; structural measurements provide accompanying computational descriptions. Numerical measurements are means across five models, while the conserved-network column counts hydrogen bonds present in all five. The P9 reference ratio uses 140 Å² as its denominator and may exceed 100%. “Undefined” denotes an undefined side-chain burial percentage."
        },
        {
          type: "prose",
          paragraphs: [
          "Across the five models of the representative TROP2 peptide `SVCWCVNSV`, the P2 and P9 side chains were highly buried, the conserved hydrogen-bond network was maintained and no interface steric clashes were recorded. PyMOL views illustrated peptide placement within the HLA binding groove, surrounding interface residues and predicted hydrogen bonds. The archived models, measurement records and PyMOL session preserved these observations for subsequent review."
]
        },
        {
          type: "figure",
          src: "https://static.igem.wiki/teams/6056/wiki/files/pages/project/engineering/engineering-c2-02c.avif",
          width: 1280,
          height: 718,
          alt: "Figure C2-02C",
          caption: "A representative PyMOL view illustrates the predicted placement of `SVCWCVNSV` within the HLA-A*02:01 binding groove, together with surrounding interface residues and predicted hydrogen bonds. Structural measurements included all five sampled models."
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
          "Structural review accompanied a defined 15-sequence Dry Lab handoff, with prediction and structural records retained for each candidate. The source-protein coordinates also allowed Wet Lab to identify two overlapping pairs: `TLIYYLDEI` with `YLDEIPPKF` in TROP2, and `FQARLRLRV` with `RLRVLVPPL` in Nectin-4. This defined the next engineering decision: encode each pair as one continuous segment while preserving both source epitopes. Further details are provided in [Bioinformatics: AlphaFold structural review](https://2026.igem.wiki/jlu-fbh/bioinformatics)."
]
        }
          ]
        }
      ]
    },
    {
      type: "subheading",
      id: "eng-i-2-3",
      index: "2.3",
      title: "Iteration 2.3｜Converting overlapping epitopes into continuous coding designs",
    },
    {
      type: "dbtl",
      id: "dbtl-2-3",
      stages: [
        {
          key: "design",
          title: "Design",
          blocks: [
        {
          type: "prose",
          paragraphs: [
          "Wet Lab compared the source coordinates of the 15 retained candidate epitopes. Two pairs overlapped within their native proteins: `TLIYYLDEI` with `YLDEIPPKF` in TROP2, and `FQARLRLRV` with `RLRVLVPPL` in Nectin-4. Representing each overlapping pair as one continuous segment allowed the shared residues to be encoded once while preserving the complete native sequence of both source epitopes. We therefore designed one continuous coding segment for each pair."
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
          "Wet Lab produced three TROP2, two B7-H4, three Nectin-4 and five LIV-1 coding designs for the first experimental comparison. To preserve the complete information of the overlapping epitopes without repeatedly encoding their shared residues, two sequence pairs were merged into continuous segments: `TLIYYLDEI` and `YLDEIPPKF` formed TROP2 CTL3 (`TLIYYLDEIPPKF`), while `FQARLRLRV` and `RLRVLVPPL` formed NECTIN4 CTL1 (`FQARLRLRVLVPPL`). The other retained candidate epitopes remained separately encoded."
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
          "Sequence mapping confirmed that the 13 first-round coding designs contained all 15 retained candidate epitopes. The TROP2 epitopes `TLIYYLDEI` and `YLDEIPPKF` shared `YLDEI` and formed the continuous segment `TLIYYLDEIPPKF`, designated TROP2 CTL3. The Nectin-4 epitopes `FQARLRLRV` and `RLRVLVPPL` shared `RLRV` and formed `FQARLRLRVLVPPL`, designated NECTIN4 CTL1. Each merged segment preserved both source epitopes in their native order, with the shared residues encoded once."
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
          "The overlap decision established 13 first-round coding designs representing all 15 retained candidate epitopes. The next requirement was to connect these sequence-level designs to identifiable DNA materials while preserving the correspondence among insert sequence, supplier-assembled recombinant plasmid and Wet Lab sample label. This requirement led the engineering route from coding design to the DNA-template handoff used for transcription. Further details are provided in [Experiments: first-round coding designs](https://2026.igem.wiki/jlu-fbh/experiments) and [Parts: epitope-encoding sequences](https://2026.igem.wiki/jlu-fbh/parts)."
]
        }
          ]
        }
      ]
    },
    {
      type: "subheading",
      id: "eng-i-2-4",
      index: "2.4",
      title: "Iteration 2.4｜Connecting coding designs to transcribable DNA templates",
    },
    {
      type: "dbtl",
      id: "dbtl-2-4",
      stages: [
        {
          key: "design",
          title: "Design",
          blocks: [
        {
          type: "prose",
          paragraphs: [
          "The 13 coding designs needed corresponding DNA material that could enter one common transcription route. This handoff required three identities to remain aligned: the intended insert sequence, the recombinant plasmid supplied for that design and the Wet Lab sample label used during template processing. Establishing this correspondence was the purpose of the iteration."
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
          "Wet Lab and the commercial service provider translated the 13 coding designs into identifiable plasmid materials. Wet Lab finalised the insert sequences and construct identities, while the provider completed plasmid synthesis and assembly. On delivery, we matched the plasmid maps, sequence files and sample labels to the design records. The verified plasmids then entered transcription-template preparation, maintaining the connection between each coding design and the DNA material used for circRNA production."
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
          "The document-to-sample check confirmed the correspondence between the 13 delivered plasmids, their intended coding designs and sample labels. Construct identifiers were retained during DNA-template preparation and T7 transcription, allowing each first-round design to remain linked to the material used for circRNA production. This established an identifiable set of plasmid inputs for the shared preparation workflow."
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
          "The 13 coding designs were now connected to identifiable plasmid materials and a common transcription route. The next engineering question shifted from DNA identity to preparation comparability: could all 13 designs be converted into circRNA inputs under shared conditions and introduced into the same DC–T-cell system?"
]
        }
          ]
        }
      ]
    },
    {
      type: "subheading",
      id: "eng-i-2-5",
      index: "2.5",
      title: "Iteration 2.5｜Producing comparable circRNA inputs for the first screen",
    },
    {
      type: "dbtl",
      id: "dbtl-2-5",
      stages: [
        {
          key: "design",
          title: "Design",
          blocks: [
        {
          type: "prose",
          paragraphs: [
          "A meaningful first-round comparison required the encoded epitope segment to be the principal difference among the 13 inputs. We therefore fixed a shared route from DNA template to circRNA preparation, DC electroporation and DC–T-cell co-culture. The RNA measurements were reported at their actual scale, with RNase R-related and primer-based results describing preparation composition and consistency."
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
          "Wet Lab established a unified plasmid-to-circRNA-to-DC–T-cell workflow for the 13 coding designs, allowing each preparation to enter the first experimental comparison under consistent conditions. Starting from the delivered plasmids, we prepared transcription templates, generated precursor RNA by T7 in vitro transcription, removed the DNA templates and purified the RNA (New England Biolabs, n.d.). The precursors then underwent self-splicing and circularisation (Wesselhoeft et al., 2018), followed by RNA purification and the recorded RNase R-related check (LGC Biosearch Technologies, n.d.). Discussion with Ruohan Yang helped standardise the preparation sequence and the terminology used for the RNA readouts. Finally, each circRNA preparation was introduced into immature DCs using the same Nucleofector II programme and RNA input (Lonza, n.d.), after which the DCs were co-cultured with autologous T cells at the common ratio established in Cycle 1."
]
        },
        {
          type: "references",
          items: [
          {
                    "label": "New England Biolabs (n.d.)",
                    "text": "New England Biolabs (n.d.) *Standard RNA synthesis with HiScribe T7 Quick High Yield RNA Synthesis Kit, E2050*.",
                    "href": "https://www.neb.com/en/protocols/standard-rna-synthesis-with-hiscribe-t7-quick-high-yield-rna-synthesis-kit-neb-e2050?utm_source=chatgpt.com",
                    "hrefLabel": "Source"
          },
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
                    "hrefLabel": "Source"
          },
          {
                    "label": "Lonza (n.d.)",
                    "text": "Lonza (n.d.) *Human Dendritic Cell Nucleofector Kit*. VPA-1004, Optimized Protocol U-002.",
                    "href": "https://bioscience.lonza.com/lonza_bs/US/en/Transfection/p/000000000000191773/Human-Dendritic-Cell-Nucleofector-Kit?utm_source=chatgpt.com",
                    "hrefLabel": "Source"
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
          "RT-qPCR assessment of the RNase R-purified TROP2-CTL1 preparation supported 4 µL as the working input. Divergent primers targeted the circularisation junction, while convergent primers supplied the comparison signal used in the recorded calculation. At 4 µL, the recorded circular-to-linear signal ratio was 32.5:1, with an estimated circular fraction of 96.96±0.70% across three technical wells, consistent with the 6 µL result. These measurements supported a circRNA-rich representative preparation. The 13 preparations produced through the shared route subsequently entered the first DC–T-cell screen under matched electroporation and culture conditions."
]
        },
        {
          type: "table",
          caption: "Table C2-01｜RT-qPCR assessment of the representative first-round preparation",
          headers: ["Input volume", "Recorded circular-to-linear signal ratio", "Estimated circular fraction"],
          rows: [
            ["2 µL", "13.0:1", "92.85±0.08%"],
            ["4 µL", "32.5:1", "96.96±0.70%"],
            ["6 µL", "26.4:1", "96.25±1.14%"]
          ]
        },
        {
          type: "note",
          label: "Table C2-01 note",
          body: "TROP2-CTL1 served as the representative first-round preparation. Each input volume included three technical replicate wells; estimated fractions are reported as mean±SD using the source calculation. The 4 µL input was selected for subsequent measurements."
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
          "The shared preparation route produced 13 traceable circRNA inputs under matched molecular and cellular conditions. This made a within-run immune-response comparison possible. The next Design therefore fixed the selection rule before examining the ELISpot results: retain two responsive modules from each antigen source so that the four-antigen strategy established in Cycle 1 remained represented in Combined. Further details are provided in [Experiments: circRNA preparation and DC–T-cell culture](https://2026.igem.wiki/jlu-fbh/experiments) and [Integrated Human Practices: circRNA preparation](https://2026.igem.wiki/jlu-fbh/human-practices)."
]
        }
          ]
        }
      ]
    },
    {
      type: "subheading",
      id: "eng-i-2-6",
      index: "2.6",
      title: "Iteration 2.6｜Selecting two responsive modules from each antigen source",
    },
    {
      type: "dbtl",
      id: "dbtl-2-6",
      stages: [
        {
          key: "design",
          title: "Design",
          blocks: [
        {
          type: "prose",
          paragraphs: [
          "Iteration 1.6 established protein-level support for the four antigen sources, Iteration 1.7 located them within complementary malignant-cell populations and Iteration 1.8 extended this complementarity across patients. Together, these results supported retaining all four sources during epitope selection. Before examining the ELISpot spot counts, we therefore established an antigen-source-stratified rule: rank the circRNA preparations within each source and select two responsive modules from every source. This preserved more than one experimentally responsive sequence from each antigen, maintained equal representation despite different numbers of first-round constructs and produced a balanced eight-module composition for Combined."
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
          "The 13 epitope-encoding circRNA preparations were compared through the same human DC–T-cell route and IFN-γ ELISpot procedure. Equalised cell inputs, the shared culture route and consistent plate handling allowed the spot counts to serve as a within-run ranking measure. A methods consultation with Teacher Lin Jia addressed whether ELISpot alone was sufficient for the next design decision and established the need for complementary activation and effector-activity measurements (Dakewe Biotech, n.d.)."
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
          key: "test",
          title: "Test",
          blocks: [
        {
          type: "prose",
          paragraphs: [
          "The spot-count comparison identified two modules from each antigen source and refined the 13 first-round circRNA inputs into eight selected modules. TROP2 CTL1 and TROP2 CTL2 produced the two highest counts within the TROP2 group. Both B7-H4 modules were retained, together with the two leading Nectin-4 modules and LIV-1 CTL2 and CTL3. Because all 13 inputs were compared within the same experimental run, their spot counts provided the relative selection evidence required to define Combined’s eight-module composition."
]
        },
        {
          type: "figure",
          src: "https://static.igem.wiki/teams/6056/wiki/files/pages/project/engineering/engineering-c2-03.avif",
          width: 966,
          height: 334,
          alt: "Figure C2-03",
          caption: "First-round IFN-γ ELISpot compared 13 epitope-encoding circRNA preparations and selected two responsive modules from each of the four antigen sources."
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
          "ELISpot supplied the eight modules required for Combined and also clarified the next evidence step. IFN-γ secretion recorded a recognition-associated cellular response; the project still needed to observe early CD8 T-cell activation and overall effector activity before assembling the first-round evidence. We retained that scientific requirement. The idea of recognition also served as a shared scientific theme for our age-appropriate educational activities. Further details are provided in [Results: first-round ELISpot](https://2026.igem.wiki/jlu-fbh/results) and [Integrated Human Practices: extending the ELISpot evidence](https://2026.igem.wiki/jlu-fbh/human-practices)."
]
        }
          ]
        }
      ]
    },
    {
      type: "subheading",
      id: "eng-i-2-7",
      index: "2.7",
      title: "Iteration 2.7｜Translating recognition into Vaccine Classroom",
    },
    {
      type: "dbtl",
      id: "dbtl-2-7",
      stages: [
        {
          key: "design",
          title: "Design",
          blocks: [
        {
          type: "prose",
          paragraphs: [
          "The principle that biological information guides immune recognition provided the scientific basis for Vaccine Classroom. For primary-school learners, we began with experiences already familiar to them: receiving an injection, feeling pain or fever and hearing that vaccination helps the body prepare. These everyday memories became a bridge to the idea of advance recognition, allowing immunological concepts to unfold through situations that children could readily understand."
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
          "Education and Visual Design developed an interactive vaccine-science lesson for approximately 50 students at the Primary School Affiliated to Jilin University. Beginning with the students’ own vaccination experiences, the lesson introduced the basic idea that the immune system recognises targets through biological information. Students then completed two rounds of a “wanted-poster” game: the first provided only limited information, while the second added clear identifying clues. By comparing their group decisions across the two rounds, students could experience how more specific information improves recognition before returning to the scientific explanation of immune recognition."
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
          "A rough classroom tally showed that recognition accuracy increased from approximately **40%** in the limited-clue round to approximately **87%** after clear identifying clues were provided—an improvement of about **47 percentage points**. In the second round, students also explained which clues supported their choices more actively during group discussion. The class then connected this experience to how biological information supports immune recognition and how vaccination prepares the immune system to respond."
]
        },
        {
          type: "carousel",
          figureLabel: "Figure C2-04",
          images: [
          {
                    "src": "https://static.igem.wiki/teams/6056/wiki/files/pages/project/engineering/engineering-c2-04a.avif"
          },
          {
                    "src": "https://static.igem.wiki/teams/6056/wiki/files/pages/project/engineering/engineering-c2-04b.avif"
          }
],
          caption: "(A) Approximate classroom recognition accuracy in the limited-clue and clear-clue rounds. (B) Classroom scene from the Vaccine Classroom activity at the Primary School Affiliated to Jilin University."
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
          "We retained the four-part structure, two-round game and scientific return in a reusable Teaching Pack. The classroom also gave us a transferable design principle: understanding improved when learners could see what information entered a decision and how that information changed the next action. This principle also informed improvements to the existing Virtual Laboratory, particularly the visibility of experimental steps and their connections. Further details are provided in [Education: Vaccine Classroom](https://2026.igem.wiki/jlu-fbh/education)."
]
        }
          ]
        }
      ]
    },
    {
      type: "subheading",
      id: "eng-i-2-8",
      index: "2.8",
      title: "Iteration 2.8｜From team-guided use to independent classroom teaching",
    },
    {
      type: "dbtl",
      id: "dbtl-2-8",
      stages: [
        {
          key: "design",
          title: "Design",
          blocks: [
        {
          type: "prose",
          paragraphs: [
          "Iteration 2.7 showed that learners understood a decision more clearly when they could see what information guided it and how it changed the next action. We next asked whether this principle could be extended from a short recognition activity to a complete molecular-biology workflow. This was particularly relevant for schools that could teach experimental concepts but could not continuously provide the instruments, consumables, safety conditions and supervision required for a full cloning course. Building on our Winter Outreach connection, we introduced the initial Virtual Laboratory at Hailun No. 1 High School in Heilongjiang Province, China. The first team-guided activity showed that learners needed clearer explanations of each experiment’s purpose and more visible links between consecutive steps, defining the focus of the subsequent revision."
]
        },
        {
          type: "figure",
          src: "https://static.igem.wiki/teams/6056/wiki/files/pages/project/engineering/engineering-c2-05a.avif",
          width: 1702,
          height: 1276,
          alt: "Figure C2-05A",
          caption: "During the first activity at Hailun No. 1 High School, the teacher used the initial Virtual Laboratory with support from the development team. This activity revealed the need for clearer experimental purposes and more visible connections between consecutive steps."
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
          "Education and the Wiki team reorganised the Virtual Laboratory into a continuous nine-experiment GFP cloning and verification route. Approximately 160 experimental illustrations supported direct mouse-based operation. Step navigation displayed the learner’s current position, yellow prompts identified the next action and the Theory, Safety, Instruments and Reagents modules remained accessible throughout the procedure. Together, these changes allowed the programme itself to explain where the learner was, what should be done and how the result connected to the next experiment."
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
          "We returned to Hailun No. 1 High School with the revised programme and invited the same teacher to organise a second activity. The teacher introduced the workflow through the classroom display and later continued using it during self-study periods without the development team present. Her feedback highlighted two improvements: the visible route made the experimental sequence easier to organise, and the supporting modules allowed key explanations to be revisited whenever students encountered difficulty. The second activity therefore demonstrated a transition from team-guided presentation to continued teacher-led use."
]
        },
        {
          type: "figure",
          src: "https://static.igem.wiki/teams/6056/wiki/files/pages/project/engineering/engineering-c2-05b.avif",
          width: 1706,
          height: 1279,
          alt: "Figure C2-05B",
          caption: "After revision, the same teacher independently organised the Virtual Laboratory and continued using it after the development team had left."
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
          "The two activities showed that digital access alone was not sufficient; a transferable learning resource also needed to explain its sequence and retain its supporting information after handoff. Hailun No. 1 High School therefore became not only a user of the Virtual Laboratory but also a contributor to its refinement. This experience encouraged us to introduce the resource to more schools with different equipment conditions, teaching schedules and learner backgrounds. With this Education branch completed, the scientific route returned to the first-round screen from Iteration 2.6 and extended IFN-γ secretion evidence to cellular activation and effector activity. Further details are provided in [Education: Virtual Laboratory](https://2026.igem.wiki/jlu-fbh/education)."
]
        }
          ]
        }
      ]
    },
    {
      type: "subheading",
      id: "eng-i-2-9",
      index: "2.9",
      title: "Iteration 2.9｜Extending the first-round evidence from secretion to cellular action",
    },
    {
      type: "dbtl",
      id: "dbtl-2-9",
      stages: [
        {
          key: "design",
          title: "Design",
          blocks: [
        {
          type: "prose",
          paragraphs: [
          "Iteration 2.6 identified eight modules through IFN-γ-associated responses. To complete the planned first-round evidence, we added two complementary questions: whether TROP2 CTL1 and CTL2 initiated early activation of CD8-positive T cells, and whether the first-round effector preparations displayed measurable overall cytotoxic activity. Consultation with Jia Lin helped us place the K562 result at the correct level: it could inform overall effector activity, while a TNBC target carrying the relevant antigen and HLA context would be required later for target-specific interpretation (Cibrián and Sánchez-Madrid, 2017; Lichtenfels et al., 1994; Neri et al., 2001)."
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
                    "label": "PubMed",
                    "text": "Lichtenfels R, Biddison WE, Schulz H, Vogt AB, Martin R. CARE-LASS (calcein-release-assay), an improved fluorescence-based test system to measure cytotoxic T lymphocyte activity. *Journal of Immunological Methods*. 1994;172:227–239.",
                    "href": "https://pubmed.ncbi.nlm.nih.gov/7518485/",
                    "hrefLabel": "PubMed"
          },
          {
                    "label": "PubMed",
                    "text": "Neri S, Mariani E, Meneghetti A, Cattini L, Facchini A. Calcein-acetoxymethyl cytotoxicity assay: standardization of a method allowing additional analyses on recovered effector cells and supernatants. *Clinical and Diagnostic Laboratory Immunology*. 2001;8:1131–1135.",
                    "href": "https://pubmed.ncbi.nlm.nih.gov/11687452/",
                    "hrefLabel": "PubMed"
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
          "We built two parallel functional assays to complement the IFN-γ secretion measured by ELISpot. The first used flow cytometry to quantify the CD8⁺CD69⁺ cell fraction under the TROP2 CTL1 and CTL2 conditions, providing an early T-cell activation readout. The second used Calcein-AM-labelled K562 targets to measure the overall cytotoxic activity of the first-round effector preparations at an effector-to-target ratio of 80:1. Spontaneous- and maximum-release controls provided the fluorescence references for calculating normalised cytotoxicity. Together, these assays supplemented the secretion measurement with complementary evidence of early activation and effector-cell killing activity."
]
        },
        {
          type: "figure",
          src: "https://static.igem.wiki/teams/6056/wiki/files/pages/project/engineering/engineering-c2-06.avif",
          width: 3000,
          height: 2100,
          alt: "Figure C2-06",
          caption: "**(A)** CD8/CD69 staining and flow cytometry assessed early T-cell activation under the TROP2 CTL1 and CTL2 conditions. **(B)** Calcein-AM release from K562 targets measured overall effector-cell cytotoxicity at an effector-to-target ratio of 80:1, with spontaneous- and maximum-release controls supporting normalisation."
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
          "The CD8/CD69 comparison recorded early activation under both leading TROP2 conditions, while the K562 assay detected effector activity across the first-round preparations. These results complemented the ELISpot ranking through distinct cellular readouts. K562 therefore supplied overall effector-activity evidence; the later TNBC target-cell assay would add the corresponding antigen–HLA context."
]
        },
        {
          type: "figure",
          src: "https://static.igem.wiki/teams/6056/wiki/files/pages/project/engineering/engineering-c2-07a.avif",
          width: 1340,
          height: 612,
          alt: "Figure C2-07A",
          caption: "CD8/CD69 flow cytometry following TROP2 CTL1 or CTL2 stimulation. Red ellipses identify the lymphocyte gate; green boxes identify CD8⁺CD69⁺ cells within that gate."
        },
        {
          type: "figure",
          src: "https://static.igem.wiki/teams/6056/wiki/files/pages/project/engineering/engineering-c2-07b.avif",
          width: 1745,
          height: 1611,
          alt: "Figure C2-07B",
          caption: "K562 killing was measured by Calcein-AM release at an effector-to-target ratio of 80:1 across the first-round constructs."
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
          "ELISpot established the eight selected modules, while CD8/CD69 and K562 extended the evidence from cytokine secretion to cellular activation and overall effector action. The four antigen sources remained represented, and TROP2 CTL1 and CTL2 supplied the strongest single-antigen reference pair. These decisions defined the next Build: assemble the eight selected modules into Combined and create a five-group comparison that could distinguish vector background, single TROP2 modules, their within-antigen combination and the complete multi-antigen design. Further details are provided in [Results: first-round flow cytometry and K562 assay](https://2026.igem.wiki/jlu-fbh/results) and [Integrated Human Practices: defining the K562 evidence boundary](https://2026.igem.wiki/jlu-fbh/human-practices)."
]
        }
          ]
        }
      ]
    },
    {
      type: "subheading",
      id: "eng-i-2-10",
      index: "2.10",
      title: "Iteration 2.10｜Integrating eight selected modules into Combined",
    },
    {
      type: "dbtl",
      id: "dbtl-2-10",
      stages: [
        {
          key: "design",
          title: "Design",
          blocks: [
        {
          type: "prose",
          paragraphs: [
          "The eight-module endpoint was predetermined by the stratified ELISpot rule: two modules from each of the four antigen sources. Wet Lab now designed their order and linker arrangement within one multi-antigen coding sequence. To evaluate what the complete design added, the second-round comparison was organised as Blank, TROP2 CTL1, TROP2 CTL2, TROP2 CTL1+2 and Combined. This hierarchy separated vector background, the two strongest TROP2 modules, their within-antigen combination and the complete four-antigen design."
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
          "Wet Lab built a five-group comparison centred on Combined. The eight selected modules from four antigen sources were arranged with defined linkers to form the Combined coding sequence. Blank, TROP2 CTL1, TROP2 CTL2 and TROP2 CTL1+2 provided stepwise references for the shared background, individual modules and their within-antigen combination. A commercial service provider assembled the corresponding recombinant plasmids, and the delivered DNA templates entered the same transcription, circularisation and purification workflow to produce comparable circRNA preparations for the second-round experiments."
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
          "Wet Lab compared the supplier-provided sequence records and sample labels with the intended five-group design, focusing on the order of the eight selected modules and the linker boundaries in Combined. This check linked the first-round selection records to the second-round construct materials, providing a traceable starting point for subsequent circRNA preparation and comparison."
]
        },
        {
          type: "figure",
          src: "https://static.igem.wiki/teams/6056/wiki/files/pages/project/engineering/engineering-c2-08.avif",
          width: 1844,
          height: 1339,
          alt: "Figure C2-08",
          caption: "Plasmid map of the Combined construct, designed to incorporate eight modules selected through the first-round ELISpot screen."
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
          "Integration now had a physical endpoint: Combined and four comparison preparations whose roles were defined before testing. The next cycle could therefore measure the molecules that had actually been prepared, beginning with their RNA-level properties and continuing through translation, DC activation, T-cell phenotype, cytokine secretion and TNBC target-cell activity. Before entering that Measurement cycle, we used the completed integration route to refine how such decisions could be recorded and handed to another researcher. Further details are provided in [Experiments: Combined construction](https://2026.igem.wiki/jlu-fbh/experiments) and [Parts: Combined design](https://2026.igem.wiki/jlu-fbh/parts)."
]
        }
          ]
        }
      ]
    },
    {
      type: "subheading",
      id: "eng-i-2-11",
      index: "2.11",
      title: "Iteration 2.11｜Turning the integration route into a traceable CircuForge workflow",
    },
    {
      type: "dbtl",
      id: "dbtl-2-11",
      stages: [
        {
          key: "design",
          title: "Design",
          blocks: [
        {
          type: "prose",
          paragraphs: [
          "Across Cycle 2, epitopes moved through prediction, review, coding and experimental preparation, but their sources, evidence and selection decisions remained scattered across different files. We therefore aimed to turn this one-project route into a reusable evidence chain, allowing another researcher to trace why each candidate was retained and continue the design without reconstructing its history. Feedback from the five-team software exchange, Associate Professor Qingtian Guan and Professor Xiangyu Meng defined three requirements for CircuForge: separate software recommendations from researcher decisions through a Design Cart, display task states and preserve a reproducible workflow."
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
          "CircuForge V2.0 reorganised these requirements into a guided browser workflow. Stage-specific identifiers and Evidence Cards preserved source information; KEEP, REVIEW and REJECT represented software review states, while researcher confirmation determined whether an entry entered the Design Cart. Stable Cart IDs, deduplication and retained order supported later assembly. External resources were connected through adapters, longer tasks displayed visible progress states, and reviewed designs could be exported together with their sequences and evidence records. In this way, decisions about sequence overlap, module selection and Combined arrangement remained traceable as confirmed researcher choices throughout the workflow."
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
          "Automated tests examined identifiers, review states, Cart behaviour, task progression, external-response parsing and export readback. Task-based user testing then followed the workflow from data import and target or epitope review to junction inspection and export. Early sessions identified unclear task-status messages and export guidance. After these elements were revised, participants completed the workflow more independently and efficiently, supporting the usability and transferability of CircuForge V2.0."
]
        },
        {
          type: "carousel",
          figureLabel: "Figure C2-09",
          images: [
          {
                    "src": "https://static.igem.wiki/teams/6056/wiki/files/pages/project/engineering/engineering-c2-09a.avif"
          },
          {
                    "src": "https://static.igem.wiki/teams/6056/wiki/files/pages/project/engineering/engineering-c2-09b.avif"
          },
          {
                    "src": "https://static.igem.wiki/teams/6056/wiki/files/pages/project/engineering/engineering-c2-09c.avif"
          },
          {
                    "src": "https://static.igem.wiki/teams/6056/wiki/files/pages/project/engineering/engineering-c2-09d.avif"
          }
],
          caption: "CircuForge V2.0 interfaces illustrated using a hepatocellular carcinoma proteomics demo project. (A) The Design Cart, labelled “Design list”, displays saved targets and epitopes, project identifiers and project-saving controls. (B) The construct interface provides researcher review controls for the inferred mature circRNA boundary and backbone design, alongside a confirmation-record field. (C) The export interface displays construct-generation status, review guidance and file-download options. (D) The Evidence Card summarises candidate-target evidence while retaining the requirement for user confirmation."
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
          "CircuForge converted the lessons of Integration into a reusable design workflow: later users could preserve source evidence, review state and researcher decisions without rebuilding the process across separate scripts. The software retained and transferred the biological decisions made by Dry Lab and Wet Lab. With Combined and its four comparison preparations already defined experimentally, the engineering story could now enter **M—Measurement** and test their molecular and cellular performance. Further details are provided in [Software: CircuForge](https://2026.igem.wiki/jlu-fbh/software) and [Integrated Human Practices: software workflow reviews](https://2026.igem.wiki/jlu-fbh/human-practices)."
]
        }
          ]
        }
      ]
    }
  ],
  note: {
    label: "Cycle 2 outcome",
    body: "Integration began with four antigen sources and ended with one defined multi-antigen design. Sequence prediction established a traceable epitope shortlist; structural review refined it; Wet Lab converted overlapping sequences into continuous coding designs and connected the resulting materials to a common circRNA and DC–T-cell route. First-round ELISpot retained two modules from every antigen source, while CD8/CD69 and K562 supplied complementary activation and overall effector-activity evidence. These decisions produced Combined and four comparison preparations for the next cycle. Vaccine Classroom and the Virtual Laboratory extended the same ideas of recognition and continuity into Education, and CircuForge turned the completed handoff logic into a reusable Dry Lab workflow.\n\nWith Combined and the four comparison preparations established, the next step was to move from sequence selection to experimental measurement. Under matched preparation and comparison conditions, we would follow the five second-round preparations from RNA characterisation through translation and immune-cell responses to their functional effects on TNBC target cells."
  }
};

export const engineeringReferenceStages: Record<
  string,
  Record<string, WikiDbTLStageKey>
> = {
  "1.1": {
    "https://doi.org/10.1158/2159-8290.CD-18-1177": "design",
  },
  "1.2": {
    "https://doi.org/10.1016/j.molcel.2017.05.022": "build",
    "https://doi.org/10.1038/s41467-018-05096-6": "build",
    "https://doi.org/10.1016/j.molcel.2019.02.015": "build",
  },
  "1.5": {
    "https://doi.org/10.1158/1078-0432.CCR-09-0737": "build",
  },
  "1.6": {
    "https://doi.org/10.1038/s41467-022-28524-0": "design",
    "https://doi.org/10.1016/j.celrep.2022.110460": "design",
    "https://doi.org/10.1093/nar/gkv007": "build",
    "https://doi.org/10.1111/j.2517-6161.1995.tb02031.x": "build",
  },
  "1.7": {
    "https://doi.org/10.1038/s41588-021-00911-1": "design",
    "https://doi.org/10.1186/s13059-019-1874-1": "build",
    "https://doi.org/10.1038/s41592-019-0619-0": "build",
    "https://doi.org/10.1093/bioinformatics/btp616": "build",
  },
  "1.8": {
    "https://doi.org/10.1158/2159-8290.CD-12-0095": "build",
    "https://doi.org/10.1126/scisignal.2004088": "build",
  },
  "1.10": {
    "https://www.miltenyibiotec.com/upload/assets/IM0001260.PDF": "build",
    "https://www.miltenyibiotec.com/upload/assets/IM0001261.PDF": "build",
    "https://doi.org/10.1084/jem.179.4.1109": "build",
  },
  "2.1": {
    "https://doi.org/10.1093/nar/gkae1010": "design",
    "https://doi.org/10.1093/nar/gkae407": "design",
    "https://doi.org/10.1093/nar/gkaa379": "build",
    "https://doi.org/10.1371/journal.pcbi.1003266": "build",
    "https://doi.org/10.4049/jimmunol.171.4.1741": "build",
    "https://doi.org/10.1007/s00018-005-4528-2": "build",
  },
  "2.2": {
    "https://doi.org/10.1038/s41586-024-07487-w": "design",
    "https://doi.org/10.1126/science.8023162": "build",
    "https://doi.org/10.1002/eji.201141774": "build",
  },
  "2.5": {
    "https://doi.org/10.1038/s41467-018-05096-6": "build",
    "https://www.neb.com/en/protocols/standard-rna-synthesis-with-hiscribe-t7-quick-high-yield-rna-synthesis-kit-neb-e2050":
      "build",
    "https://biosearchtech.a.bigcontent.io/v1/static/manual_RNR07250_RNase-R":
      "build",
    "https://bioscience.lonza.com/lonza_bs/US/en/Transfection/p/000000000000191773/Human-Dendritic-Cell-Nucleofector-Kit":
      "build",
  },
  "2.6": {
    "https://files.dakewe.cn/crm/instruction/dy/2110005.pdf": "build",
  },
  "2.9": {
    "https://doi.org/10.1002/eji.201646837": "design",
    "https://pubmed.ncbi.nlm.nih.gov/7518485/": "design",
    "https://pubmed.ncbi.nlm.nih.gov/11687452/": "design",
  },
};

