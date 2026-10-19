// Calibrated Wiki wording, with formatting represented as plain typed data.
// No JSX, HTML markup, image imports or third-party imports appear here.
export interface KeyAchievementTextRun {
  readonly text: string;
  readonly format?: 'strong' | 'code';
}
export interface KeyAchievement {
  readonly id: string;
  readonly name: string;
  readonly label: readonly string[];
  readonly y: number;
  readonly h: number;
  readonly alt: string;
  readonly paragraphs: readonly (readonly KeyAchievementTextRun[])[];
}
export const keyAchievements = [
  {
    id: "modular-backbone",
    name: "Modular Backbone",
    label: [
      "Modular",
      "Backbone"
    ],
    y: 5,
    h: 330,
    alt: "Overview row: a 5,267 bp circular plasmid ordered endotoxin-free from a commercial supplier, with an exchangeable 336 bp antigen cassette between BamHI and XhoI linearised as cell-free IVT template.",
    paragraphs: [
      [
        {
          text: "pCirCure-circMEV",
          format: "strong"
        },
        {
          text: " is a 5,267 bp plasmid with a 336 bp antigen cassette at bases 1606–1941, between the BamHI and XhoI sites. The remaining 4,931 bp are fixed in our design. To use a different antigen set, replace the cassette in the design file and order the complete plasmid from a commercial supplier. The supplied plasmid is then linearised and purified for the documented cell-free production workflow."
        }
      ],
      [
        {
          text: "The circularisation chemistry has been public since 2018 (Wesselhoeft et al., 2018) and circRNA vaccines have been demonstrated in both infectious disease and oncology (Li et al., 2022; Qu et al., 2022). What did not exist was a documented, release-tested backbone with a defined interface for someone else's antigens. That interface is what makes this a platform."
        }
      ],
      [
        {
          text: "See the element-by-element map in Section 6 and the Parts page."
        }
      ]
    ]
  },
  {
    id: "registry-parts",
    name: "30 Registry Parts",
    label: [
      "30 Registry",
      "Parts"
    ],
    y: 346,
    h: 269,
    alt: "Overview row: a part library, payload-free chassis, epitope cassette and complete plasmid.",
    paragraphs: [
      [
        {
          text: "Thirty parts are deposited as one collection, covering backbone elements, eight epitope fragments, three target-model parts and assembled regions. The collection provides the components and assembled designs used to describe the platform."
        }
      ],
      [
        {
          text: "The boundaries are exact. The T7 promoter part is bases 402–434, the PIE 5′ half is 465–766, the PABP spacer is 767–816, through to the polyA25 spacer at 2947–2971. The backbone can be rebuilt element by element from the Registry and checked against our map, which is what makes the coupling claim in Section 6 something a judge can verify rather than take on trust."
        }
      ],
      [
        {
          text: "Three parts provide starting points for reuse. BBa_26DTP41G is the payload-free chassis, with the antigen window empty. BBa_26DQL85I is the eight-fragment TNBC epitope array, and BBa_26QYL2YH is the complete Combined plasmid. The single-epitope and comparator preparations used related designs on the same backbone."
        }
      ],
      [
        {
          text: "Two further parts are worth knowing about before you build. The PIE halves, BBa_26T5SEQR and BBa_26P7AUA8, reference each other and should be taken as one circularisation unit rather than separately. BBa_26X4AOBB, the eIF4G aptamer, is deposited on its own although it is never used on its own here, so it can be grafted onto another IRES or UTR."
        }
      ],
      [
        {
          text: "See the Parts page, the Part Collection and the Registry page for JLU-FBH 2026."
        }
      ]
    ]
  },
  {
    id: "encoded-adjuvant",
    name: "Encoded Adjuvant",
    label: [
      "Encoded",
      "Adjuvant"
    ],
    y: 626,
    h: 261,
    alt: "Overview row: circRNA translation into a fusion containing tPA, antigens, four C3d-P28 repeats, MITD and FLAG.",
    paragraphs: [
      [
        {
          text: "An antigen sequence on its own is a protein, not a vaccine. Three of the backbone's elements do the rest of the work, and all three translate from the same circle as the antigen, so they arrive in whatever cell the antigen arrives in."
        }
      ],
      [
        {
          text: "The adjuvant is encoded. Four tandem copies of C3d-P28 sit in frame downstream of the cassette, so it is translated as part of the antigen fusion. A co-formulated adjuvant has to reach the same cell as the antigen; one translated from the same molecule reaches it by construction. Potency scales with copy number (Bergmann-Leitner et al., 2007; Bower and Ross, 2006; Wang et al., 2004), which is why there are four."
        }
      ],
      [
        {
          text: "Two trafficking signals sit in series: a tPA leader at the N-terminus entering the secretory pathway for cross-presentation, and MITD at the C-terminus entering the MHC-I/II vesicular pathway (Kreiter et al., 2008). A FLAG tag is placed last, so a positive blot reports translation of the entire fusion."
        }
      ],
      [
        {
          text: "CR2/CD21, the ER–Golgi pathway and the MHC-I trafficking machinery are all mammalian, so this design is inseparable from the platform. Our CD8 read-outs test whether the compensation worked."
        }
      ],
      [
        {
          text: "See Section 5.3 and the Results page."
        }
      ]
    ]
  },
  {
    id: "production-qc",
    name: "Production & QC",
    label: [
      "Production",
      "& QC"
    ],
    y: 898,
    h: 335,
    alt: "Overview row: linear DNA template from commercially supplied plasmid, T7 transcription, linear RNA precursor, PIE circularisation, RNase R enrichment and final circular RNA; Combined batch circular fraction 99.30 percent, with BSJ Sanger verification on Combined only.",
    paragraphs: [
      [
        {
          text: "Eighteen RNA preparations followed one route: linearisation and purification of commercially supplied plasmids, T7 transcription, DNase treatment, LiCl precipitation, PIE circularisation and RNase R enrichment. Thirteen were Round-1 single-epitope preparations and five formed the Round-2 batch."
        }
      ],
      [
        {
          text: "The stated release criterion was at least 90% circular fraction after RNase R. Plasmid-target PCR was used for verification, with the IVT template prepared separately by plasmid linearisation and purification. The reported RT-qPCR measurements were 95.35 ± 2.01% for the representative Round-1 TROP2-CTL1 preparation and 99.30 ± 0.17% for Combined in Round 2. Preparations below the criterion were to be remade from transcription and recorded."
        }
      ],
      [
        {
          text: "Combined also underwent RT-PCR across the back-splice junction followed by Sanger sequencing. This junction check was performed on Combined only."
        }
      ],
      [
        {
          text: "See Experiments Sections 1.1 and 3.1 and Section 7.1 of this page."
        }
      ]
    ]
  },
  {
    id: "cellular-testing",
    name: "Cellular Testing",
    label: [
      "Cellular",
      "Testing"
    ],
    y: 1244,
    h: 286,
    alt: "Overview row: human dendritic cells and autologous T cells, ELISpot, flow and killing readouts, with a separate 4T1-hTROP2 target-cell model.",
    paragraphs: [
      [
        {
          text: "The immunogenicity pipeline runs from HLA-A*02:01-typed human PBMC through CD14⁺ monocyte isolation, GM-CSF/IL-4 differentiation to moDC, circRNA electroporation and autologous CD3⁺ T-cell co-culture, to IFN-γ ELISpot, multicolour flow and Calcein-AM killing. It is written as step-by-step protocols and is reusable unchanged for any epitope set loaded into the cassette."
        }
      ],
      [
        {
          text: "The target model was made by transducing 4T1 with a commercially supplied human-TROP2 lentiviral preparation, sorting GFP-positive cells and maintaining puromycin selection. TROP2 was checked by RT-PCR and surface flow cytometry. Three target-model components are deposited as parts."
        }
      ],
      [
        {
          text: "Neither has a standard-chassis version. The pipeline's unit of success is a 9-mer on HLA-A*02:01 read by an autologous human T cell. No bacterial or yeast system can present it, and none can be the target of it."
        }
      ],
      [
        {
          text: "See Experiments Sections 2, 4 and 6."
        }
      ]
    ]
  },
  {
    id: "circuforge",
    name: "CircuForge",
    label: [
      "CircuForge"
    ],
    y: 1541,
    h: 272,
    alt: "Overview row: a browser-based construct-design tool, cassette assembly, sequence checks and export.",
    paragraphs: [
      [
        {
          text: "Our dry lab built "
        },
        {
          text: "CircuForge",
          format: "strong"
        },
        {
          text: ", a browser-based workflow that shortlists targets, analyses epitopes, assembles a frame-checked cassette into a supplied annotated backbone, exports the construct in six formats with a manifest and checksums, and annotates features against the iGEM Registry. It is released under the Apache License 2.0. Section 9 describes what it does and what we validated it against; the Software page carries the methods and benchmarks."
        }
      ],
      [
        {
          text: "Its coupling to this platform is uneven and we state it that way. The compiler is backbone-agnostic, because the user supplies the vector, so it is the least platform-bound of our outputs. What is platform-shaped is the cartridge interface itself: once antigen identity is confined to one restriction-bounded window, a general assembly tool becomes worth building."
        }
      ],
      [
        {
          text: "The Registry client is written in R and calls the official iGEM Registry interface directly. iGEM Munich 2025's "
        },
        {
          text: "igem-registry-api",
          format: "code"
        },
        {
          text: ", MIT licence, is kept locally as the reference implementation and our rate-limit handling follows it; it is not a runtime dependency."
        }
      ]
    ]
  },
  {
    id: "documented-lessons",
    name: "Documented Lessons",
    label: [
      "Documented",
      "Lessons"
    ],
    y: 1824,
    h: 273,
    alt: "Overview row: a research notebook, magnifying glass and iteration arrows representing failures, limitations and improvements.",
    paragraphs: [
      [
        {
          text: "Five limitations are documented with their consequences and recommendations for future work. They include disagreement between the Round-1 ELISpot and K562 rankings, missing controls and documented replication in Round-1 ELISpot, BSJ sequencing on Combined only, the 61.3% TGI of empty-vector circRNA-LNP relative to PBS, and the HLA mismatch in the mouse model."
        }
      ],
      [
        {
          text: "See Section 8."
        }
      ]
    ]
  }
] satisfies readonly KeyAchievement[];
