import type { WikiPageContent } from "../../components/wiki/wikiPageTypes";

import type { CitationReference } from "../citations/citationTypes";

export const experimentsPage: WikiPageContent = {
  "route": "/experiments",
  "category": "wet-lab",
  "chapter": "Wet Lab / 02 of 04",
  "eyebrow": "CirCure · Wet Lab Protocol & Verification",
  "title": "Experiments",
  "lede": "This page records how the CirCure multi-epitope circRNA vaccine was built and tested. The work falls into five stages: constructing the single-epitope circRNAs, screening them for immunogenicity, combining the strongest epitopes into one vaccine, validating that vaccine along the immune chain in vitro, and testing it in tumour-bearing mice. Each stage asks a narrower question than the one before. The in vitro experiments supports antigen translation and downstream immune function, then that CD8⁺ T cells are activated, differentiate towards an effector-memory phenotype, and kill TNBC target cells. The in vivo experiments ask whether the same vaccine restrains tumour growth in an immunocompetent animal, and what the immune response inside the tumour and in the spleen looks like at the endpoint. Data for every experiment are on the Results page.",
  "boundary": "This page records the laboratory blueprint, step-by-step protocols, quality gates, and evidence boundaries established for the CirCure project.",
  "visual": "experiment-gates",
  "visualLabel": "Seven-stage CirCure experimental route",
  "visualSteps": [
    "Construct",
    "Screen",
    "Optimise",
    "Validate",
    "Safety",
    "Target Model",
    "In Vivo"
  ],
  "facts": [
    {
      "label": "Design Order",
      "value": "Later claims depend on verified earlier gates."
    },
    {
      "label": "Vector Controls",
      "value": "Empty-vector circRNA subtracts backbone and adjuvant backgrounds."
    },
    {
      "label": "Standardized Host",
      "value": "BALB/c syngeneic 4T1-TROP2 axillary fat pad model."
    },
    {
      "label": "Bench Protocol",
      "value": "Illustrated protocol atlas and written steps are archived together."
    }
  ],
  "sections": [
    {
      "id": "sec-overview",
      "index": "00",
      "kicker": "",
      "navLabel": "Overview",
      "title": "Overview",
      "summary": "",
      "hideSectionNumber": true,
      "blocks": [
        {
          "type": "prose",
          "paragraphs": [
            "This page records how the CirCure multi-epitope circRNA vaccine was built and tested. The work falls into five stages: constructing the single-epitope circRNAs, screening them for immunogenicity, combining the strongest epitopes into one vaccine, validating that vaccine along the immune chain in vitro, and testing it in tumour-bearing mice. Each stage asks a narrower question than the one before. The in vitro experiments supports antigen translation and downstream immune function, then that CD8⁺ T cells are activated, differentiate towards an effector-memory phenotype, and kill TNBC target cells. The in vivo experiments ask whether the same vaccine restrains tumour growth in an immunocompetent animal, and what the immune response inside the tumour and in the spleen looks like at the endpoint. Data for every experiment are on the Results page."
          ]
        }
      ]
    },
    {
      "id": "sec-synthesis",
      "index": "01",
      "kicker": "01 / In Vitro Synthesis",
      "navLabel": "Synthesis & Cyclisation",
      "title": "Construction and in vitro synthesis of the circRNA vaccine",
      "summary": "",
      "blocks": [
        {
          "type": "prose",
          "paragraphs": [
            "A candidate epitope becomes a vaccine molecule in two steps, plasmid sourcing and in vitro synthesis. The CTL epitope coding sequences predicted by the dry lab were designed into expression plasmids carrying a T7 promoter and the circularisation elements. The constructs were ordered from a commercial gene-synthesis supplier, linearised and purified before use as templates for T7 in vitro transcription. Each of the 13 cassettes sits between a BamHI site and an XhoI site, immediately downstream of the tPA signal sequence and immediately upstream of the 4×mC3dP28 adjuvant block; two of them, Trop2-CTL3 and Nectin4-CTL1, merges two overlapping predicted epitopes into a single 14-mer. Having the constructs synthesised keeps all 13 plasmids identical to the design file, so the round-1 comparison between them rests on the epitope sequence alone. T7 RNA polymerase transcribed a linear precursor RNA, the DNA template was digested away and the RNA purified, and a self-splicing intron closed the precursor into a covalent circle. Having no free ends, the circle survives exonuclease attack better than a linear mRNA and keeps expressing antigen inside the DC for longer, which is the reason the platform is built on circRNA. After circularisation and RNase R treatment, the estimated circular fraction was measured on the representative preparation using the circular channel (SJ3910F + SJ3909R) and residual-linear channel (SJ3911F + SJ3909R)."
          ]
        },
        {
          "type": "subheading",
          "id": "exp-1-1",
          "index": "1.1",
          "title": "1.1 circRNA synthesis and circularity verification",
          "anchorIds": [
            "exp-1-2"
          ]
        },
        {
          "type": "heading",
          "level": 4,
          "title": "Background"
        },
        {
          "type": "prose",
          "paragraphs": [
            "circRNA is a covalently closed circle with no free 5′/3′ ends, so it resists exonuclease degradation better than a linear mRNA and expresses for longer. That stability is what the platform rests on. Here a linearised epitope plasmid is the template for T7 in vitro transcription (IVT) of a precursor RNA, which a permuted group I intron–exon (PIE) element then self-splices into a closed circle. The preparation is then treated with RNase R. RT-qPCR with the circular channel (SJ3910F + SJ3909R) and residual-linear channel (SJ3911F + SJ3909R) estimates the circular fraction of the treated material."
          ]
        },
        {
          "type": "heading",
          "level": 4,
          "title": "Materials & Reagents"
        },
        {
          "type": "table",
          "headers": [
            "Component",
            "Amount / Spec"
          ],
          "rows": [
            [
              "Synthesised epitope plasmid (template)",
              "1 µg, linearised by digestion"
            ],
            [
              "NotI-HF + 10× rCutSmart Buffer",
              "10 U per 1 µg plasmid"
            ],
            [
              "Phenol:chloroform (1:1), chloroform, 3 M NaOAc (pH 5.2), absolute/70% ethanol",
              "As required"
            ],
            [
              "HiScribe® T7 Quick High Yield RNA Synthesis Kit",
              "NEB #E2050S, 20 µL reaction"
            ],
            [
              "DNase I (RNase-free)",
              "2 µL"
            ],
            [
              "7.5 M LiCl (10 mM EDTA)",
              "25 µL / 50 µL"
            ],
            [
              "GTP, Mg²⁺ (self-splicing cofactors / circularisation buffer)",
              "GTP final 2 mM, MgCl₂ final 10 mM (50 mM Tris-HCl, pH 7.5)"
            ],
            [
              "RNase R",
              "2.0 µg RNA + 2 µL 10× Buffer + 2 U RNase R + water to 20 µL, 37 ℃ for 15 min (1 U per µg RNA)"
            ],
            [
              "Reverse transcription and RT-qPCR kits; circular-channel primers SJ3910F + SJ3909R; residual-linear-channel primers SJ3911F + SJ3909R",
              "Per kit"
            ],
            [
              "Nuclease-free water, 0.1 mM EDTA",
              "As required"
            ]
          ]
        },
        {
          "type": "heading",
          "level": 4,
          "title": "Equipment"
        },
        {
          "type": "prose",
          "paragraphs": [
            "Thermal cycler, real-time PCR instrument, dry bath, biosafety cabinet, centrifuge; nuclease-free consumables throughout."
          ]
        },
        {
          "type": "heading",
          "level": 4,
          "title": "Experimental Design (controls and replicates)"
        },
        {
          "type": "prose",
          "paragraphs": [
            "**Assays and controls**: the circular channel (C) uses SJ3910F + SJ3909R, and the residual-linear channel (L) uses SJ3911F + SJ3909R. Both target assays are run on cDNA from the same RNase R-treated preparation. The residual-linear assay detects the assayed precursor-associated interval. Include a no-template control on each plate. Cross-assay quantitative response has not been calibrated with suitable standards, so the base-2 calculation is reported as an estimate.",
            "**Scope of the measurement**: all thirteen constructs followed the same preparation route, including circularisation and RNase R treatment. TROP2-CTL1 was quantified as the Round 1 representative; the other twelve preparations were not quantified individually. The shared backbone and preparation chemistry suggest that the other constructs may have similar circular fractions. BSJ-spanning RT-PCR followed by Sanger sequencing was performed on the Combined preparation (§3.1, step 11) as a separate junction sequence check.",
            "**Replicates**: each target assay is measured at 2, 4 and 6 µL cDNA input, with three technical wells per input. This gives nine wells per target assay and eighteen target-assay wells in total. Calculate fractions from the corresponding Cq records and report mean ± sample SD separately for each input (three technical comparisons per input). These wells are not independent RNA preparations."
          ]
        },
        {
          "type": "heading",
          "level": 4,
          "title": "Step-by-Step Instructions"
        },
        {
          "type": "prose",
          "paragraphs": [
            "**Plasmid Thawing**"
          ]
        },
        {
          "type": "protocol-steps",
          "steps": [
            {
              "number": "1",
              "blocks": [
                {
                  "type": "prose",
                  "paragraphs": [
                    "Thaw a single-use aliquot of the synthesised epitope plasmid on ice and mix gently. The plasmid is supplied endotoxin-free and kept at −20 ℃ in single-use aliquots, so that no aliquot is thawed twice."
                  ]
                }
              ]
            }
          ]
        },
        {
          "type": "prose",
          "paragraphs": [
            "**Template Linearisation & Purification**"
          ]
        },
        {
          "type": "protocol-steps",
          "steps": [
            {
              "number": "1",
              "blocks": [
                {
                  "type": "prose",
                  "paragraphs": [
                    "Linearise the plasmid completely with NotI-HF in a 50 µL reaction (1 µg plasmid, 5 µL 10× rCutSmart Buffer, 10 U NotI-HF, nuclease-free water to volume) at 37 ℃ for 1 h. NotI-HF is the version supplied in rCutSmart Buffer, where it has full activity; the standard enzyme retains only about a quarter of its activity in that buffer. NotI cuts once, between the polyA25 spacer and the T7 terminator, so transcription runs off the end of the template at the 3′ boundary of the designed transcript."
                  ]
                }
              ]
            },
            {
              "number": "2",
              "blocks": [
                {
                  "type": "prose",
                  "paragraphs": [
                    "Purify by extracting twice with phenol: chloroform and once with chloroform."
                  ]
                }
              ]
            },
            {
              "number": "3",
              "blocks": [
                {
                  "type": "prose",
                  "paragraphs": [
                    "Add 1/10 volume of 3 M NaOAc and 2 volumes of absolute ethanol to the aqueous phase, precipitate at −20 ℃ for 30 min, and recover the DNA by centrifugation at 4 ℃ for 15 min."
                  ]
                }
              ]
            },
            {
              "number": "4",
              "blocks": [
                {
                  "type": "prose",
                  "paragraphs": [
                    "Wash with 70% ethanol, air-dry, and dissolve in nuclease-free water to 0.5–1 µg/µL as the transcription template."
                  ]
                }
              ]
            }
          ]
        },
        {
          "type": "prose",
          "paragraphs": [
            "**In Vitro Transcription** [1]"
          ]
        },
        {
          "type": "protocol-steps",
          "steps": [
            {
              "number": "1",
              "blocks": [
                {
                  "type": "prose",
                  "paragraphs": [
                    "Assemble the 20 µL in vitro transcription reaction at room temperature in the order given in the HiScribe® T7 Quick manual (10 µL NTP Buffer Mix, 1 µg template DNA, 1 µL 0.1 M DTT, 2 µL T7 RNA Polymerase Mix, nuclease-free water to 20 µL), mix, and incubate at 37 ℃ for 2 h to synthesise the precursor RNA."
                  ]
                }
              ]
            }
          ]
        },
        {
          "type": "prose",
          "paragraphs": [
            "**DNase I Treatment**"
          ]
        },
        {
          "type": "protocol-steps",
          "steps": [
            {
              "number": "1",
              "blocks": [
                {
                  "type": "prose",
                  "paragraphs": [
                    "Add 30 µL nuclease-free water and 2 µL DNase I and incubate at 37 ℃ for a further 15 min to remove the DNA template completely."
                  ]
                }
              ]
            }
          ]
        },
        {
          "type": "prose",
          "paragraphs": [
            "**LiCl Precipitation**"
          ]
        },
        {
          "type": "protocol-steps",
          "steps": [
            {
              "number": "1",
              "blocks": [
                {
                  "type": "prose",
                  "paragraphs": [
                    "Bring the reaction to 50 µL, add 25 µL 7.5 M LiCl and mix, stand at −20 ℃ for 30 min, then pellet the RNA by centrifugation at ≥16,000 × g, 4 ℃, for 15 min."
                  ]
                }
              ]
            },
            {
              "number": "2",
              "blocks": [
                {
                  "type": "prose",
                  "paragraphs": [
                    "Discard the supernatant, wash with 500 µL pre-chilled 70% ethanol, air-dry for 5 min, and resuspend in 50 µL 0.1 mM EDTA."
                  ]
                }
              ]
            }
          ]
        },
        {
          "type": "prose",
          "paragraphs": [
            "**Circularisation** [2]"
          ]
        },
        {
          "type": "protocol-steps",
          "steps": [
            {
              "number": "1",
              "blocks": [
                {
                  "type": "prose",
                  "paragraphs": [
                    "Assemble the reaction according to the circularisation kit (containing GTP and Mg²⁺) and incubate at 55 ℃ for 10–15 min to allow the precursor RNA to self-splice into a circle."
                  ]
                }
              ]
            }
          ]
        },
        {
          "type": "prose",
          "paragraphs": [
            "**RNase R Digestion** [3][4]"
          ]
        },
        {
          "type": "protocol-steps",
          "steps": [
            {
              "number": "1",
              "blocks": [
                {
                  "type": "prose",
                  "paragraphs": [
                    "Digest the linear RNA in the circularisation product with RNase R at 1 U per µg RNA (2 U for 2.0 µg in a 20 µL reaction) at 37 ℃ for 15 min. [5]"
                  ]
                }
              ]
            }
          ]
        },
        {
          "type": "prose",
          "paragraphs": [
            "**Circularisation Assay: RT-qPCR**"
          ]
        },
        {
          "type": "protocol-steps",
          "steps": [
            {
              "number": "1",
              "blocks": [
                {
                  "type": "prose",
                  "paragraphs": [
                    "Reverse-transcribe the RNase R-treated preparation to cDNA. Measure the circular channel (SJ3910F + SJ3909R) and residual-linear channel (SJ3911F + SJ3909R) at cDNA inputs of 2, 4 and 6 µL, with three technical wells per input and target assay. Run 95 °C for 3 min, followed by 40 cycles of 95 °C for 10 s and 60 °C for 30 s. Retain the plate layout and Cq of every well. For each recorded comparison, define"
                  ]
                },
                {
                  "type": "prose",
                  "paragraphs": [
                    "$\\Delta Cq_i=Cq_{L,i}-Cq_{C,i},\\qquad F_i(\\%)=\\frac{100}{1+2^{-\\Delta Cq_i}}.$",
                    "Here C and L denote the circular and residual-linear channels. Calculate each fraction before calculating the arithmetic mean and sample SD (n − 1) across the three technical comparisons at that input. Use unrounded intermediate values. No GFP normalisation is used in the reported fractions. The model assumes doubling per cycle and comparable quantitative response between the target assays, including reverse transcription."
                  ]
                }
              ]
            }
          ]
        },
        {
          "type": "heading",
          "level": 4,
          "title": "Notes"
        },
        {
          "type": "list",
          "ordered": true,
          "start": 1,
          "items": [
            "Use RNase-free water and consumables, and keep RNA samples on ice during handling.",
            "Maintain the Mg²⁺ concentration, temperature and incubation time specified for circularisation. Keep the RNase R amount and digestion time consistent between preparations.",
            "Store circRNA in aliquots at −80 °C and avoid repeated freeze–thaw cycles.",
            "Check the primer identities, cDNA input volumes and replicate-well labels against the plate layout before running qPCR. Retain the plate layout and the Cq record for every well."
          ]
        }
      ]
    },
    {
      "id": "sec-round1-screen",
      "index": "02",
      "kicker": "02 / Primary Screen",
      "navLabel": "Round 1 Screening",
      "title": "Round 1: single-epitope immunogenicity screening",
      "summary": "",
      "blocks": [
        {
          "type": "prose",
          "paragraphs": [
            "With circRNA for the 13 single-epitope constructs in hand, the task of round 1 was to identify which of them are genuinely immunogenic. Starting from commercially sourced human PBMC of defined HLA-A*02:01 type, we sorted monocytes and induced them into dendritic cells while also sorting autologous T cells; each single-epitope circRNA was electroporated separately into DCs, which were then co-cultured with autologous T cells so that the translated epitope could be presented on MHC-I. ELISpot quantification of IFN-γ secretion was the main criterion, with cytotoxicity and flow-cytometric activation assays alongside it, and the constructs were compared one against another. The round selects, from each of the four antigens TROP2, B7-H4, Nectin-4 and LIV-1, the two most immunogenic epitopes to carry into the combined construct. The per-antigen ceiling of two is set by B7-H4, which entered round 1 with only two constructs; taking two from every antigen is what keeps the four antigens equally represented in the cassette."
          ]
        },
        {
          "type": "subheading",
          "id": "exp-2-1",
          "index": "2.1",
          "title": "2.1 DC preparation and circRNA delivery"
        },
        {
          "type": "heading",
          "level": 4,
          "title": "Background"
        },
        {
          "type": "prose",
          "paragraphs": [
            "Dendritic cells are the professional antigen-presenting cells that initiate a CTL response. Human peripheral blood CD14⁺ monocytes differentiate into immature monocyte-derived DCs (moDC) under GM-CSF and IL-4. Here CD14⁺ monocytes are positively selected with magnetic beads from commercial HLA-A*02:01 PBMC and induced into moDCs, then circRNA is introduced by electroporation so that the epitope is translated inside the cell and presented on MHC-I. The circRNA-loaded DC made at this step is the input to every immunological readout that follows."
          ]
        },
        {
          "type": "heading",
          "level": 4,
          "title": "Materials & Reagents"
        },
        {
          "type": "table",
          "headers": [
            "Component",
            "Amount / Spec"
          ],
          "rows": [
            [
              "Commercial HLA-A*02:01 PBMC",
              "Typed and quality-controlled"
            ],
            [
              "Human peripheral blood lymphocyte separation medium",
              "TBD LTS1077, density 1.077 g/mL"
            ],
            [
              "MACS buffer",
              "39 mL 0.9% NaCl + 0.8 mL albumin + 160 µL 0.5 M EDTA (degassed, pre-chilled)"
            ],
            [
              "CD14⁺ MicroBeads + separation column",
              "Miltenyi Biotec #130-050-201; 80 µL buffer + 20 µL beads per 10⁷ cells"
            ],
            [
              "RPMI-1640 + 10% FBS + 1% P/S",
              "Complete medium"
            ],
            [
              "Recombinant human GM-CSF",
              "100 ng/mL"
            ],
            [
              "Recombinant human IL-4",
              "50 ng/mL"
            ],
            [
              "Purified circRNA",
              "5 µg / 1×10⁶ DC"
            ],
            [
              "Nucleofector II electroporation buffer",
              "Human DC program U-002, 100 µL per reaction"
            ]
          ]
        },
        {
          "type": "heading",
          "level": 4,
          "title": "Equipment"
        },
        {
          "type": "prose",
          "paragraphs": [
            "Centrifuge with slow acceleration/deceleration, MACS separator + high-gradient magnet, Nucleofector II electroporation system, CO₂ incubator, biosafety cabinet, haemocytometer."
          ]
        },
        {
          "type": "heading",
          "level": 4,
          "title": "Step-by-Step Instructions"
        },
        {
          "type": "prose",
          "paragraphs": [
            "**PBMC Isolation** [6]"
          ]
        },
        {
          "type": "protocol-steps",
          "steps": [
            {
              "number": "1",
              "blocks": [
                {
                  "type": "prose",
                  "paragraphs": [
                    "Dilute the whole blood with an equal volume of 1× PBS (pH 7.2–7.4) and layer it slowly down the tube wall onto the surface of the separation medium, keeping the interface intact."
                  ]
                }
              ]
            },
            {
              "number": "2",
              "blocks": [
                {
                  "type": "prose",
                  "paragraphs": [
                    "Centrifuge at 400 × g for 30–40 min at 18–20 ℃ with the brake off, so that mononuclear cells collect as a buffy layer at the interface."
                  ]
                }
              ]
            },
            {
              "number": "3",
              "blocks": [
                {
                  "type": "prose",
                  "paragraphs": [
                    "Aspirate the buffy layer with a Pasteur pipette into a 50 mL tube, add at least 3 volumes of PBS, and wash twice at 60–100 × g for 10 min at 18–20 ℃, which also removes platelets."
                  ]
                }
              ]
            }
          ]
        },
        {
          "type": "prose",
          "paragraphs": [
            "**CD14⁺ MACS Sorting** [7]"
          ]
        },
        {
          "type": "protocol-steps",
          "steps": [
            {
              "number": "1",
              "blocks": [
                {
                  "type": "prose",
                  "paragraphs": [
                    "Resuspend in MACS buffer and count; mix at a ratio of 80 µL buffer + 20 µL CD14⁺ MicroBeads per 10⁷ cells and incubate at 2–8 ℃ for 15 min."
                  ]
                }
              ]
            },
            {
              "number": "2",
              "blocks": [
                {
                  "type": "prose",
                  "paragraphs": [
                    "Pass the suspension through the magnetic column, collect the flow-through (CD14-negative, contains T cells, retained for 2.2), and wash the column three times with 3 mL buffer each."
                  ]
                }
              ]
            },
            {
              "number": "3",
              "blocks": [
                {
                  "type": "prose",
                  "paragraphs": [
                    "Remove the column from the magnet, add 5 mL buffer and use the plunger to flush the bound CD14⁺ monocytes into a fresh tube; collect by centrifugation at 1500 rpm for 5 min."
                  ]
                }
              ]
            }
          ]
        },
        {
          "type": "prose",
          "paragraphs": [
            "**DC Differentiation** [8]"
          ]
        },
        {
          "type": "protocol-steps",
          "steps": [
            {
              "number": "1",
              "blocks": [
                {
                  "type": "prose",
                  "paragraphs": [
                    "Resuspend CD14⁺ monocytes in RPMI-1640 containing 10% FBS and add GM-CSF 100 ng/mL and IL-4 50 ng/mL."
                  ]
                }
              ]
            },
            {
              "number": "2",
              "blocks": [
                {
                  "type": "prose",
                  "paragraphs": [
                    "Culture at 37 ℃, 5% CO₂ for 3 days to induce immature DCs, performing a half-volume medium change with fresh cytokines every 3 days."
                  ]
                }
              ]
            }
          ]
        },
        {
          "type": "prose",
          "paragraphs": [
            "**circRNA Electroporation** [9]"
          ]
        },
        {
          "type": "protocol-steps",
          "steps": [
            {
              "number": "1",
              "blocks": [
                {
                  "type": "prose",
                  "paragraphs": [
                    "Harvest the immature DCs, pellet them at 200 × g for 10 min at room temperature, discard the supernatant completely and resuspend 1×10⁶ DCs in 100 µL room-temperature Nucleofector® Solution; combine with 5 µg circRNA and run programme U-002 on the Nucleofector II. Do not leave the cells in Nucleofector® Solution for longer than 15 min, which lowers both viability and transfer efficiency."
                  ]
                }
              ]
            },
            {
              "number": "2",
              "blocks": [
                {
                  "type": "prose",
                  "paragraphs": [
                    "Immediately after electroporation, add about 500 µL pre-equilibrated complete medium to the cuvette, transfer the sample gently into a 12-well plate with the supplied pipette to a final volume of 1 mL per well, and return the cells to the incubator for 24 h of recovery."
                  ]
                }
              ]
            }
          ]
        },
        {
          "type": "heading",
          "level": 4,
          "title": "Notes"
        },
        {
          "type": "list",
          "ordered": true,
          "start": 1,
          "items": [
            "Adjust cytokines by stage: during antigen loading and maturation, IL-4 is usually reduced or removed while GM-CSF is maintained or lowered; the DC–T co-culture stage no longer depends on GM-CSF/IL-4. Staged adjustment helps keep the DC phenotype stable.",
            "Confirm DC viability > 90% before electroporation to avoid non-specific fluorescence from dead cells in downstream flow cytometry; if the monocyte fraction is low, a brief plastic-adherence step can enrich it first.",
            "The electroporation follows Lonza's Optimized Protocol for Human Dendritic Cells, which specifies 0.5–2×10⁶ cells per sample resuspended in 100 µL Nucleofector® Solution, combined with 1–5 µg DNA or an appropriate amount of another substrate, on programme U-002 (U-02 on the Nucleofector I). The 1×10⁶ cells used here sit in the middle of that range and the 5 µg at the top of it; Lonza quantifies only the DNA substrate, so the circRNA input was set at the upper end of the DNA range. [9]"
          ]
        },
        {
          "type": "subheading",
          "id": "exp-2-2",
          "index": "2.2",
          "title": "2.2 T cell isolation and DC–T co-culture"
        },
        {
          "type": "heading",
          "level": 4,
          "title": "Background"
        },
        {
          "type": "prose",
          "paragraphs": [
            "Detecting a CTL response needs antigen-specific T cells. This step positively selects CD3⁺ T cells with magnetic beads from the CD14-negative flow-through and co-cultures them with autologous circRNA-loaded DCs, so that antigen presentation and T cell priming happen in vitro. DC : T is fixed at 1 : 20. Every functional readout in this project, ELISpot, activation flow cytometry and the killing assays, draws on this co-culture."
          ]
        },
        {
          "type": "heading",
          "level": 4,
          "title": "Materials & Reagents"
        },
        {
          "type": "table",
          "headers": [
            "Component",
            "Amount / Spec"
          ],
          "rows": [
            [
              "CD14-negative flow-through retained from 2.1",
              "Contains T cells"
            ],
            [
              "CD3⁺ MicroBeads + separation column",
              "Miltenyi Biotec; 80 µL buffer + 20 µL beads per 10⁷ cells"
            ],
            [
              "MACS buffer",
              "As in 2.1 (pre-chilled)"
            ],
            [
              "T cell medium (RPMI-1640 + 10% FBS ± IL-2)",
              "IL-2 20–50 IU/mL (added during long-term priming)"
            ],
            [
              "circRNA-loaded DCs",
              "From 2.1"
            ],
            [
              "30 µm pre-separation filter",
              "Prevents column clogging"
            ]
          ]
        },
        {
          "type": "heading",
          "level": 4,
          "title": "Equipment"
        },
        {
          "type": "prose",
          "paragraphs": [
            "MACS separator, centrifuge, CO₂ incubator."
          ]
        },
        {
          "type": "heading",
          "level": 4,
          "title": "Step-by-Step Instructions"
        },
        {
          "type": "prose",
          "paragraphs": [
            "**CD3⁺ MACS Sorting** [10][11]"
          ]
        },
        {
          "type": "protocol-steps",
          "steps": [
            {
              "number": "1",
              "blocks": [
                {
                  "type": "prose",
                  "paragraphs": [
                    "Take the CD14-negative flow-through retained in 2.1 and add 80 µL MACS Buffer + 20 µL CD3 MicroBeads per 10⁷ cells; incubate at 2–8 ℃ for 15 min."
                  ]
                }
              ]
            },
            {
              "number": "2",
              "blocks": [
                {
                  "type": "prose",
                  "paragraphs": [
                    "Before loading the column, moisten the 30 µm pre-separation filter with 500 µL of the same buffer, discard the effluent, and pass the cells through it to prevent clumps from clogging the column; then pass the suspension through the magnetic column and wash three times with 3 mL pre-chilled buffer each to remove unbound cells."
                  ]
                }
              ]
            },
            {
              "number": "3",
              "blocks": [
                {
                  "type": "prose",
                  "paragraphs": [
                    "Remove the column from the magnet, add 5 mL buffer and flush rapidly with the plunger; collect the CD3⁺ T cells and centrifuge at 1500 rpm for 5 min."
                  ]
                }
              ]
            },
            {
              "number": "4",
              "blocks": [
                {
                  "type": "prose",
                  "paragraphs": [
                    "Resuspend the CD3⁺ T cells in T cell medium."
                  ]
                }
              ]
            }
          ]
        },
        {
          "type": "prose",
          "paragraphs": [
            "**DC–T Co-culture** [12]"
          ]
        },
        {
          "type": "protocol-steps",
          "steps": [
            {
              "number": "1",
              "blocks": [
                {
                  "type": "prose",
                  "paragraphs": [
                    "Mix DCs electroporated with circRNA 24 h earlier with autologous CD3⁺ T cells at 1 : 20."
                  ]
                }
              ]
            },
            {
              "number": "2",
              "blocks": [
                {
                  "type": "prose",
                  "paragraphs": [
                    "Co-culture at 37 ℃, 5% CO₂ for downstream ELISpot, flow cytometry or killing assays."
                  ]
                }
              ]
            },
            {
              "number": "3",
              "blocks": [
                {
                  "type": "prose",
                  "paragraphs": [
                    "Short-term culture (24 h ELISpot / CD69 flow cytometry): no exogenous IL-2, to avoid background interference. Long-term priming (7–10 days): supplement low-dose IL-2 (20–50 IU/mL) every 3 days."
                  ]
                }
              ]
            }
          ]
        },
        {
          "type": "heading",
          "level": 4,
          "title": "Notes"
        },
        {
          "type": "list",
          "ordered": true,
          "start": 1,
          "items": [
            "CD3⁺ T cells should be sorted from the flow-through after CD14 depletion to avoid monocyte contamination; if necessary, residual monocytes can first be removed by adherence.",
            "Primary antigen sensitisation usually requires 3–7 days and can be repeated to expand antigen-specific T cells; a single 24 h co-culture is relatively short and may underestimate the frequency, so priming can be extended if sensitivity is a priority."
          ]
        },
        {
          "type": "subheading",
          "id": "exp-2-3",
          "index": "2.3",
          "title": "2.3 ELISpot assay and spot counting"
        },
        {
          "type": "heading",
          "level": 4,
          "title": "Background"
        },
        {
          "type": "prose",
          "paragraphs": [
            "ELISpot counts IFN-γ–secreting T cells one cell at a time, which makes it the primary immunogenicity readout of this project. IFN-γ released by an activated T cell is captured by the plate-bound antibody and developed through biotin, streptavidin, HRP and AEC into an insoluble spot, and the spot count (SFC) tracks the frequency of responding T cells. Round 1 used it to rank the 13 single-epitope constructs, and was run as a ranking screen with no control wells, so its numbers are comparative only. [13]"
          ]
        },
        {
          "type": "heading",
          "level": 4,
          "title": "Materials & Reagents"
        },
        {
          "type": "table",
          "headers": [
            "Component",
            "Amount / Spec"
          ],
          "rows": [
            [
              "Human IFN-γ Precoated ELISpot Kit",
              "Dakewe #2110005"
            ],
            [
              "RPMI-1640; deionised water",
              "Activation / lysis"
            ],
            [
              "Wash buffer",
              "Supplied as a 50× concentrate; dilute 1:50 in deionised water"
            ],
            [
              "Biotinylated detection antibody, streptavidin-HRP, AEC substrate",
              "Supplied in kit, 100 µL/well"
            ],
            [
              "DC–T co-culture cells (from 2.2)",
              "1×10⁵/well"
            ]
          ]
        },
        {
          "type": "heading",
          "level": 4,
          "title": "Equipment"
        },
        {
          "type": "prose",
          "paragraphs": [
            "ELISpot reader/analysis system, CO₂ incubator, biosafety cabinet, centrifuge."
          ]
        },
        {
          "type": "heading",
          "level": 4,
          "title": "Experimental Design (controls and replicates)"
        },
        {
          "type": "prose",
          "paragraphs": [
            "**Controls**: none, in either direction. Round 1 was designed as a between-construct comparison whose only purpose was to rank the candidates, so no negative control well was seeded, neither empty-vector nor antigen-free, and the kit's PHA positive-control well was not run. SFC is therefore reported as the raw spot count per 1×10⁵ cells with no background subtraction, and no value from this round can be cited as an antigen-specific T-cell frequency. The empty-vector control enters the project at round 2 (4.4).",
            "**Replicates**: no replicate-well count is on record, so the values are single determinations and carry no statistical test."
          ]
        },
        {
          "type": "heading",
          "level": 4,
          "title": "Step-by-Step Instructions"
        },
        {
          "type": "prose",
          "paragraphs": [
            "**Cell Seeding** [14]"
          ]
        },
        {
          "type": "protocol-steps",
          "steps": [
            {
              "number": "1",
              "blocks": [
                {
                  "type": "prose",
                  "paragraphs": [
                    "Add 200 µL RPMI-1640 per well to the pre-coated plate, activate at room temperature for 10 min, then discard."
                  ]
                }
              ]
            },
            {
              "number": "2",
              "blocks": [
                {
                  "type": "prose",
                  "paragraphs": [
                    "Seed the DC–T co-culture cells at 1×10⁵ per 100 µL per well, together with the control wells defined in the Experimental Design."
                  ]
                }
              ]
            },
            {
              "number": "3",
              "blocks": [
                {
                  "type": "prose",
                  "paragraphs": [
                    "Incubate the plate undisturbed at 37 ℃, 5% CO₂ for 20 h, inside the kit's stated 16–24 h window; do not shake during incubation or spot morphology will be distorted."
                  ]
                }
              ]
            }
          ]
        },
        {
          "type": "prose",
          "paragraphs": [
            "**Lysis & Washing**"
          ]
        },
        {
          "type": "protocol-steps",
          "steps": [
            {
              "number": "1",
              "blocks": [
                {
                  "type": "prose",
                  "paragraphs": [
                    "Discard the cells and add 200 µL pre-chilled deionised water per well to lyse at 4 ℃ for 10 min."
                  ]
                }
              ]
            },
            {
              "number": "2",
              "blocks": [
                {
                  "type": "prose",
                  "paragraphs": [
                    "Wash the plate 6 times with 260 µL wash buffer per well, leaving the buffer in the well for 1 min each time, and blot dry on absorbent paper after the final wash. Never allow the PVDF membrane to dry out between washes."
                  ]
                }
              ]
            }
          ]
        },
        {
          "type": "prose",
          "paragraphs": [
            "**Detection & Development** [14]"
          ]
        },
        {
          "type": "protocol-steps",
          "steps": [
            {
              "number": "1",
              "blocks": [
                {
                  "type": "prose",
                  "paragraphs": [
                    "Add 100 µL biotinylated detection antibody per well, incubate at 37 ℃ for 1 h, then wash 6 times as in step 5."
                  ]
                }
              ]
            },
            {
              "number": "2",
              "blocks": [
                {
                  "type": "prose",
                  "paragraphs": [
                    "Add 100 µL streptavidin-HRP per well, incubate at 37 ℃ for 1 h, wash 5 times in the same way and blot dry."
                  ]
                }
              ]
            },
            {
              "number": "3",
              "blocks": [
                {
                  "type": "prose",
                  "paragraphs": [
                    "Add 100 µL AEC substrate per well and develop at room temperature in the dark for 5–30 min, stopping once spots are clearly visible; stop by rinsing 3–5 times with deionised water, then unclip the plate bottom and rinse the back of the membrane. Mabtech & Abcam ELISpot Guides"
                  ]
                }
              ]
            }
          ]
        },
        {
          "type": "prose",
          "paragraphs": [
            "**Spot Counting**"
          ]
        },
        {
          "type": "protocol-steps",
          "steps": [
            {
              "number": "1",
              "blocks": [
                {
                  "type": "prose",
                  "paragraphs": [
                    "After air-drying, count round spots with a halo on the reader and report SFC per 1×10⁵ cells, stating whether the count is raw or background-subtracted."
                  ]
                }
              ]
            }
          ]
        },
        {
          "type": "heading",
          "level": 4,
          "title": "Notes"
        },
        {
          "type": "list",
          "ordered": true,
          "start": 1,
          "items": [
            "High background usually results from insufficient washing or blocking; do not touch the coated area of the plate bottom, and AEC development must be kept dark and strictly timed to prevent spots from merging.",
            "Plan the control wells before seeding: include the kit PHA positive well, and an antigen-free or empty-vector negative well. Subtract the negative well before reporting any count as an antigen-specific frequency."
          ]
        },
        {
          "type": "subheading",
          "id": "exp-2-4",
          "index": "2.4",
          "title": "2.4 Calcein-AM killing assay (K562)"
        },
        {
          "type": "heading",
          "level": 4,
          "title": "Background"
        },
        {
          "type": "prose",
          "paragraphs": [
            "A vaccine has to produce effector T cells that kill. Calcein-AM is a lipophilic, non-fluorescent dye; inside a live cell, esterases hydrolyse it to charged fluorescent calcein, which an intact membrane retains. When the target lyses, calcein escapes into the supernatant, and supernatant fluorescence rises with the extent of lysis. In round 1 this assay reports the total cytotoxicity of the effector T cells, with K562 as the target. [15][16]"
          ]
        },
        {
          "type": "heading",
          "level": 4,
          "title": "Materials & Reagents"
        },
        {
          "type": "table",
          "headers": [
            "Component",
            "Amount / Spec"
          ],
          "rows": [
            [
              "K562 target cells",
              "E:T = 80:1; 1×10⁶/mL for labelling, 5×10⁴/mL for plating"
            ],
            [
              "Calcein-AM",
              "Final concentration 1 µM"
            ],
            [
              "Medium with 5% FBS; PBS",
              "As required"
            ],
            [
              "4.2% Triton X-100",
              "Maximum-release wells, 10 µL/well"
            ],
            [
              "96-well flat plate / black 96-well plate",
              "3 replicate wells per condition"
            ]
          ]
        },
        {
          "type": "heading",
          "level": 4,
          "title": "Equipment"
        },
        {
          "type": "prose",
          "paragraphs": [
            "CO₂ incubator, microplate reader (Ex 485 / Em 528 nm), centrifuge, microscope."
          ]
        },
        {
          "type": "heading",
          "level": 4,
          "title": "Experimental Design (controls and replicates)"
        },
        {
          "type": "prose",
          "paragraphs": [
            "**Controls**: spontaneous-release wells (target + medium) and maximum-release wells (target + 4.2% Triton X-100) define the lower and upper bounds of the killing calculation.",
            "**Replicates**: 3 wells per condition on a single plate. These are technical replicates, with no biological replication across effector-cell batches. All 13 round-1 single-epitope constructs were assayed in parallel."
          ]
        },
        {
          "type": "heading",
          "level": 4,
          "title": "Step-by-Step Instructions"
        },
        {
          "type": "prose",
          "paragraphs": [
            "**Target Labeling**"
          ]
        },
        {
          "type": "protocol-steps",
          "steps": [
            {
              "number": "1",
              "blocks": [
                {
                  "type": "prose",
                  "paragraphs": [
                    "Harvest K562, wash once with PBS and adjust to 1×10⁶/mL, add Calcein-AM to a final concentration of 1 µM, and incubate at 37 ℃ in the dark for 20–30 min."
                  ]
                }
              ]
            },
            {
              "number": "2",
              "blocks": [
                {
                  "type": "prose",
                  "paragraphs": [
                    "Wash away free dye and adjust the target cells to 5×10⁴/mL in medium containing 5% FBS."
                  ]
                }
              ]
            }
          ]
        },
        {
          "type": "prose",
          "paragraphs": [
            "**Effector Preparation**"
          ]
        },
        {
          "type": "protocol-steps",
          "steps": [
            {
              "number": "1",
              "blocks": [
                {
                  "type": "prose",
                  "paragraphs": [
                    "Harvest the co-cultured effector T cells and adjust to 4×10⁶/mL in medium containing 5% FBS (corresponding to 80:1)."
                  ]
                }
              ]
            }
          ]
        },
        {
          "type": "prose",
          "paragraphs": [
            "**Plating & Co-incubation**"
          ]
        },
        {
          "type": "protocol-steps",
          "steps": [
            {
              "number": "1",
              "blocks": [
                {
                  "type": "prose",
                  "paragraphs": [
                    "Plate in a 96-well plate: spontaneous wells (100 µL target + 100 µL medium), maximum wells (100 µL target + 90 µL medium + 10 µL 4.2% Triton), experimental wells (100 µL target + 100 µL effector), 3 replicate wells each."
                  ]
                }
              ]
            },
            {
              "number": "2",
              "blocks": [
                {
                  "type": "prose",
                  "paragraphs": [
                    "Co-incubate at 37 ℃, 5% CO₂ in the dark for 4 h."
                  ]
                }
              ]
            }
          ]
        },
        {
          "type": "prose",
          "paragraphs": [
            "**Fluorescence Readout**"
          ]
        },
        {
          "type": "protocol-steps",
          "steps": [
            {
              "number": "1",
              "blocks": [
                {
                  "type": "prose",
                  "paragraphs": [
                    "After the 4 h co-incubation, the 96-well plate must first be centrifuged at 200 × g for 5 min at room temperature; then transfer 100 µL supernatant per well to a black plate and measure fluorescence on the plate reader (Ex 485 / Em 528 nm)."
                  ]
                }
              ]
            },
            {
              "number": "2",
              "blocks": [
                {
                  "type": "prose",
                  "paragraphs": [
                    "Calculate the killing rate as:",
                    "Cytotoxicity (%) = (F experimental − F spontaneous) / (F maximum − F spontaneous) × 100%"
                  ]
                }
              ]
            }
          ]
        },
        {
          "type": "heading",
          "level": 4,
          "title": "Notes"
        },
        {
          "type": "list",
          "ordered": true,
          "start": 1,
          "items": [
            "Use K562 only as a readout of overall (including NK-like) cytotoxic activity: it is MHC-I–negative and antigen-negative, so it cannot report antigen specificity. Validate antigen-specific killing on an HLA-matched, antigen-positive target such as MDA-MB-231 (see 4.5).",
            "Ageing target or effector cells and over-long incubation both raise spontaneous release and depress the signal-to-noise ratio; use cells in good condition and control the incubation time.",
            "Treat replicate wells on one plate as a measure of precision only. Where a small difference between constructs has to be shown to be real, plan biological replication as well, a repeat with an independently prepared effector-cell batch."
          ]
        },
        {
          "type": "subheading",
          "id": "exp-2-5",
          "index": "2.5",
          "title": "2.5 Flow validation of TROP2 epitopes"
        },
        {
          "type": "heading",
          "level": 4,
          "title": "Background"
        },
        {
          "type": "prose",
          "paragraphs": [
            "CD69 is the earliest T cell activation marker, up within 2–4 h of TCR signalling, and it responds sensitively to whether antigen presentation has started a T cell response at all. This step quantifies the CD8⁺CD69⁺ fraction by multicolour flow cytometry and compares the immediate activation induced by the TROP2-CTL1 and CTL2 epitopes, giving epitope selection a functional readout independent of ELISpot. [17]"
          ]
        },
        {
          "type": "heading",
          "level": 4,
          "title": "Materials & Reagents"
        },
        {
          "type": "table",
          "headers": [
            "Component",
            "Amount / Spec"
          ],
          "rows": [
            [
              "DC–T co-culture cells (prepared as in 2.1–2.2)",
              "1×10⁶/mL"
            ],
            [
              "Human Fc receptor block (Human TruStain FcX)",
              "5 µL per 10⁶ cells in 100 µL staining volume"
            ],
            [
              "Fixable Viability Dye eFluor 780",
              "1 µL per 1 mL of cells at 1–10×10⁶/mL, in azide-free protein-free PBS"
            ],
            [
              "PE anti-human CD8 (clone SK1)",
              "0.2 µg/10⁶"
            ],
            [
              "PerCP anti-human CD69 (clone FN50)",
              "0.3 µg/10⁶"
            ],
            [
              "Flow staining buffer (PBS + 2% FBS + 0.1% sodium azide); pre-chilled PBS; single-stain compensation beads",
              "As required"
            ]
          ]
        },
        {
          "type": "heading",
          "level": 4,
          "title": "Equipment"
        },
        {
          "type": "prose",
          "paragraphs": [
            "Flow cytometer (488 nm), refrigerated centrifuge with slow acceleration/deceleration, vortex mixer, 200 µm nylon mesh, 5 mL light-protected flow tubes."
          ]
        },
        {
          "type": "heading",
          "level": 4,
          "title": "Experimental Design (controls and replicates)"
        },
        {
          "type": "prose",
          "paragraphs": [
            "**Controls**: an isotype control tube, an unstained control tube and single-stain compensation beads for the compensation matrix, plus a fixable viability dye to remove dead-cell false positives before analysis.",
            "**Replicates**: ≥2×10⁴ events are acquired per tube."
          ]
        },
        {
          "type": "heading",
          "level": 4,
          "title": "Step-by-Step Instructions"
        },
        {
          "type": "prose",
          "paragraphs": [
            "**Blocking & Staining** [18]"
          ]
        },
        {
          "type": "protocol-steps",
          "steps": [
            {
              "number": "1",
              "blocks": [
                {
                  "type": "prose",
                  "paragraphs": [
                    "Harvest, filter and count the co-cultured cells, resuspend 1×10⁶ cells in 100 µL staining buffer, add 5 µL Fc block and incubate at room temperature for 5–10 min."
                  ]
                }
              ]
            },
            {
              "number": "2",
              "blocks": [
                {
                  "type": "prose",
                  "paragraphs": [
                    "Wash the cells once and resuspend them in azide-free, protein-free PBS at 1–10×10⁶/mL, add 1 µL fixable viability dye per 1 mL of suspension and incubate at 2–8 ℃ in the dark for 30 min. Serum protein and azide both degrade this staining, so the dye must not be applied in the staining buffer. Wash once into staining buffer before adding the surface antibodies."
                  ]
                }
              ]
            },
            {
              "number": "3",
              "blocks": [
                {
                  "type": "prose",
                  "paragraphs": [
                    "Add CD8-PE 0.2 µg and CD69-PerCP 0.3 µg and incubate at 4 ℃ in the dark for 15 min, flicking the tube every 5 min."
                  ]
                }
              ]
            }
          ]
        },
        {
          "type": "prose",
          "paragraphs": [
            "**Washing & Resuspension**"
          ]
        },
        {
          "type": "protocol-steps",
          "steps": [
            {
              "number": "1",
              "blocks": [
                {
                  "type": "prose",
                  "paragraphs": [
                    "Add 2 mL pre-chilled PBS, centrifuge at 1500 rpm, 4 ℃, for 5 min and discard the supernatant."
                  ]
                }
              ]
            },
            {
              "number": "2",
              "blocks": [
                {
                  "type": "prose",
                  "paragraphs": [
                    "Disperse the pellet into a single-cell suspension with vortex pulses (2000 rpm)."
                  ]
                }
              ]
            }
          ]
        },
        {
          "type": "prose",
          "paragraphs": [
            "**Acquisition & Analysis**"
          ]
        },
        {
          "type": "protocol-steps",
          "steps": [
            {
              "number": "1",
              "blocks": [
                {
                  "type": "prose",
                  "paragraphs": [
                    "Warm up the instrument for 30 min and calibrate with compensation beads (CV < 5%); set an FSC-H > 10⁴ threshold to exclude debris."
                  ]
                }
              ]
            },
            {
              "number": "2",
              "blocks": [
                {
                  "type": "prose",
                  "paragraphs": [
                    "Gate on the live cell population and quantify the CD8⁺(PE) CD69⁺(PerCP) double-positive fraction."
                  ]
                }
              ]
            }
          ]
        },
        {
          "type": "heading",
          "level": 4,
          "title": "Notes"
        },
        {
          "type": "list",
          "ordered": true,
          "start": 1,
          "items": [
            "Multicolour staining requires single-stain controls to build the compensation matrix; never auto-compensate from a fully stained sample.",
            "Donor material from a single batch cannot separate an epitope effect from a donor effect; plan n ≥ 3 independent donor batches where the conclusion has to generalise beyond the donor."
          ]
        }
      ]
    },
    {
      "id": "sec-optimisation",
      "index": "03",
      "kicker": "03 / Optimisation",
      "navLabel": "Optimisation",
      "title": "Epitope optimisation and Combined vaccine construction",
      "summary": "",
      "blocks": [
        {
          "type": "prose",
          "paragraphs": [
            "This round brings together the epitopes that scored highest in the primary screen. Guided by the ELISpot ranking we took the two highest-SFC epitopes of each of the four antigens, 8 out of the 13, joined them with flexible linkers and had the cassette synthesised into an optimised vector that retains the T7 promoter, the T4 *td* circularisation intron, the translation enhancement element, the 4×mC3dP28 adjuvant and the membrane-localisation signal. The eight are TROP2-CTL1/CTL2, B7H4-CTL1/CTL2, Nectin4-CTL1/CTL2 and LIV1-CTL2/CTL3; Nectin4-CTL1 is the merged 14-mer designed in round 1 and is carried across unchanged, so the cassette encodes 9 predicted epitopes in 8 fragments. The reading frame was verified across every junction and the linkers were checked with bioinformatic tools to confirm that they introduce no new immunogenic epitopes. The Combined plasmid was linearised and purified before T7 in vitro transcription. The precursor RNA was then circularised and treated with RNase R to produce the circRNA used throughout round 2 and the in vivo experiments."
          ]
        },
        {
          "type": "subheading",
          "id": "exp-3-1",
          "index": "3.1",
          "title": "3.1 Combined circRNA synthesis and release testing",
          "anchorIds": [
            "exp-3-2"
          ]
        },
        {
          "type": "heading",
          "level": 4,
          "title": "Background"
        },
        {
          "type": "prose",
          "paragraphs": [
            "PCR and agarose gel electrophoresis check the plasmid target region. The PCR product is used only for verification; the transcription template is prepared separately by plasmid linearisation and purification, as in §1.1. The precursor RNA is circularised at 55 °C for 10–15 min and treated with RNase R. The post-treatment circular fraction is estimated using the circular channel (SJ3910F + SJ3909R) and residual-linear channel (SJ3911F + SJ3909R). The Round 2 batch contains five preparations: empty vector, TROP2-CTL1, TROP2-CTL2, TROP2-CTL1+2 and Combined. All followed the preparation route, but Combined alone was quantified as the representative release measurement and submitted for BSJ Sanger sequencing. The other four preparations were not quantified individually."
          ]
        },
        {
          "type": "heading",
          "level": 4,
          "title": "Materials & Reagents"
        },
        {
          "type": "table",
          "headers": [
            "Component",
            "Amount / Spec"
          ],
          "rows": [
            [
              "Optimised plasmids (5 groups, including the empty vector)",
              "Linearised and purified before IVT"
            ],
            [
              "Target-region PCR primers and PCR reagents",
              "Plasmid verification (step 2)"
            ],
            [
              "Restriction enzyme and compatible buffer",
              "Plasmid linearisation"
            ],
            [
              "DNA purification reagents",
              "Removal of restriction enzyme and salts after digestion"
            ],
            [
              "Agarose (1%), 1× TAE, DNA ladder, nucleic-acid stain",
              "Plasmid PCR verification (step 2)"
            ],
            [
              "HiScribe® T7 Quick Kit",
              "NEB #E2050S"
            ],
            [
              "DNase I; 7.5 M LiCl; 0.1 mM EDTA; circularisation kit",
              "As in 1.1"
            ],
            [
              "RNase R",
              "2.0 µg RNA + 2 µL 10× Buffer + 2 U RNase R + water to 20 µL, 37 ℃ for 15 min (fixed for the whole batch; do not vary between preparations)"
            ],
            [
              "Reverse transcription and RT-qPCR kits; circular-channel primers SJ3910F + SJ3909R; residual-linear-channel primers SJ3911F + SJ3909R",
              "Circularisation quantification"
            ]
          ]
        },
        {
          "type": "heading",
          "level": 4,
          "title": "Equipment"
        },
        {
          "type": "prose",
          "paragraphs": [
            "Thermal cycler / qPCR instrument, water bath, micro-volume spectrophotometer, agarose electrophoresis system and gel imager, 96-well plates, centrifuge."
          ]
        },
        {
          "type": "heading",
          "level": 4,
          "title": "Experimental Design (controls and replicates)"
        },
        {
          "type": "prose",
          "paragraphs": [
            "**Assays and controls**: run the circular channel (SJ3910F + SJ3909R) and residual-linear channel (SJ3911F + SJ3909R) on cDNA from the same RNase R-treated preparation and include a no-template control. The reported calculation uses target Cq values without GFP normalisation. The recorded GFP measurements are retained separately. Running the assays on the same plate does not establish a common quantitative scale; the base-2 calculation retains the assumptions stated in §1.1, step 12.",
            "**Scope of the measurement**: Combined was measured at the 4 µL cDNA input selected from the Round 1 comparison (§1.1, note 4), with three technical wells per target assay. Mean ± sample SD describes technical variation within this preparation. The TROP2-CTL1, TROP2-CTL2, TROP2-CTL1+2 and empty-vector preparations followed the same route but were not quantified individually. BSJ Sanger sequencing was performed on Combined as a separate sequence check.",
            "**Release criterion**: a circular fraction ≥ 90%. A preparation below the criterion is re-prepared from the transcription step."
          ]
        },
        {
          "type": "heading",
          "level": 4,
          "title": "Step-by-Step Instructions"
        },
        {
          "type": "prose",
          "paragraphs": [
            "**Plasmid Thawing**"
          ]
        },
        {
          "type": "protocol-steps",
          "steps": [
            {
              "number": "1",
              "blocks": [
                {
                  "type": "prose",
                  "paragraphs": [
                    "For each of the five preparations, thaw a single-use aliquot of the corresponding synthesised plasmid on ice and mix gently. The plasmid is supplied endotoxin-free and kept at −20 ℃ in single-use aliquots."
                  ]
                }
              ]
            }
          ]
        },
        {
          "type": "prose",
          "paragraphs": [
            "**Plasmid Verification by PCR**"
          ]
        },
        {
          "type": "protocol-steps",
          "steps": [
            {
              "number": "1",
              "blocks": [
                {
                  "type": "prose",
                  "paragraphs": [
                    "Amplify the target region from a plasmid aliquot by PCR and analyse the product by agarose gel electrophoresis alongside a DNA ladder. Check for a band at the expected size. The PCR product is used only for plasmid verification; the IVT template is prepared separately by linearising and purifying the plasmid."
                  ]
                }
              ]
            }
          ]
        },
        {
          "type": "prose",
          "paragraphs": [
            "**Template Linearisation & Purification** [1]"
          ]
        },
        {
          "type": "protocol-steps",
          "steps": [
            {
              "number": "1",
              "blocks": [
                {
                  "type": "prose",
                  "paragraphs": [
                    "Completely linearise each plasmid by restriction digestion downstream of the transcription cassette."
                  ]
                }
              ]
            },
            {
              "number": "2",
              "blocks": [
                {
                  "type": "prose",
                  "paragraphs": [
                    "Purify the linearised plasmid DNA to remove the restriction enzyme and salts, then resuspend it in nuclease-free water for transcription."
                  ]
                }
              ]
            }
          ]
        },
        {
          "type": "prose",
          "paragraphs": [
            "**IVT & Template Removal** [1]"
          ]
        },
        {
          "type": "protocol-steps",
          "steps": [
            {
              "number": "1",
              "blocks": [
                {
                  "type": "prose",
                  "paragraphs": [
                    "Transcribe the purified linearised plasmid DNA with the HiScribe® T7 system at 37 ℃ for 2 h. Add DNase I and incubate at 37 ℃ for 20 min to remove the DNA template."
                  ]
                }
              ]
            }
          ]
        },
        {
          "type": "prose",
          "paragraphs": [
            "**Purification & Circularisation** [2][3]"
          ]
        },
        {
          "type": "protocol-steps",
          "steps": [
            {
              "number": "1",
              "blocks": [
                {
                  "type": "prose",
                  "paragraphs": [
                    "Purify the RNA by LiCl precipitation (as in 1.1), then circularise at 55 ℃ for 10–15 min (the same condition as 1.1)."
                  ]
                }
              ]
            },
            {
              "number": "2",
              "blocks": [
                {
                  "type": "prose",
                  "paragraphs": [
                    "Digest the linear RNA in the circularisation product with RNase R (2 U per 2.0 µg RNA in a 20 µL reaction, 37 ℃ for 15 min), using the same digestion time for every preparation in the batch."
                  ]
                }
              ]
            }
          ]
        },
        {
          "type": "prose",
          "paragraphs": [
            "**Circularisation Assay**"
          ]
        },
        {
          "type": "protocol-steps",
          "steps": [
            {
              "number": "1",
              "blocks": [
                {
                  "type": "prose",
                  "paragraphs": [
                    "Reverse-transcribe the digested product to cDNA."
                  ]
                }
              ]
            },
            {
              "number": "2",
              "blocks": [
                {
                  "type": "prose",
                  "paragraphs": [
                    "Measure the circular channel (SJ3910F + SJ3909R) and residual-linear channel (SJ3911F + SJ3909R) on the same plate, loading 4 µL cDNA into three technical wells per target assay. Run 95 °C for 3 min, followed by 40 cycles of 95 °C for 10 s and 60 °C for 30 s. Define ΔCq_i = Cq_L,i − Cq_C,i and calculate F_i (%) = 100 / (1 + 2^(−ΔCq_i)) for each recorded comparison. Use unrounded intermediate values and report the arithmetic mean ± sample SD across the three technical comparisons. No GFP normalisation is used. This follows the same base-2 model as §1.1, step 12."
                  ]
                }
              ]
            },
            {
              "number": "3",
              "blocks": [
                {
                  "type": "prose",
                  "paragraphs": [
                    "Release decision: compare the value against the ≥ 90% criterion. A preparation below it does not go to electroporation; re-prepare it and record the failed run alongside the released one."
                  ]
                }
              ]
            }
          ]
        },
        {
          "type": "prose",
          "paragraphs": [
            "**BSJ Verification (Combined vaccine)**"
          ]
        },
        {
          "type": "protocol-steps",
          "steps": [
            {
              "number": "1",
              "blocks": [
                {
                  "type": "prose",
                  "paragraphs": [
                    "For the Combined vaccine, amplify an RT-PCR product spanning the back-splice junction (BSJ) and submit it for Sanger sequencing. Check the sequence against the expected junction and assess the baseline, peak separation and overlapping signal on both flanks. Record the RT-PCR primer identities separately from the two qPCR assay names."
                  ]
                }
              ]
            }
          ]
        },
        {
          "type": "heading",
          "level": 4,
          "title": "Notes"
        },
        {
          "type": "list",
          "ordered": true,
          "start": 1,
          "items": [
            "Linkers must balance flexibility against accessibility of cleavage sites, so that neighbouring epitopes do not sterically hinder processing and presentation; proteasomal cleavage prediction can be used to optimise the order of the epitopes.",
            "The 4 µL input is carried over from the loading series run in 1.1, which established that this volume sits inside the linear range of the assay. A single volume is sufficient only while the material and the primer sets are unchanged; if either changes, re-run a 2, 4 and 6 µL series first and settle on a volume from that before quantifying with replicates at one point.",
            "Mg²⁺ concentration (excess promotes non-specific folding, with gel smearing and secondary bands) and reaction temperature (too low leaves self-splicing incomplete) should be titrated as a gradient before a condition is described as optimised, and the RNase R amount and digestion time likewise; excess enzyme or over-long digestion can partly degrade loosely structured circular RNA.",
            "Work RNase-free throughout: dedicated pipettes and filter tips, gloves changed frequently, nuclease-free water and tubes, samples kept on ice, and circRNA aliquoted and stored at −80 ℃ to avoid repeated freeze–thaw.",
            "Release criterion and what to do when it is not met. A preparation whose circular fraction reaches ≥ 90% may proceed; one that does not is re-prepared from the transcription step. Extending the digestion time removes more linear RNA without producing more circles, and degrades the circle; the digestion time is fixed for the whole batch.",
            "Data recording. Label every well with preparation name + loading volume + replicate-well number and archive the plate layout, so that each reported value can be traced back to the wells it came from."
          ]
        }
      ]
    },
    {
      "id": "sec-round2-validation",
      "index": "04",
      "kicker": "04 / Functional Validation",
      "navLabel": "Round 2 Validation",
      "title": "Round 2: functional validation of the Combined vaccine",
      "summary": "",
      "blocks": [
        {
          "type": "prose",
          "paragraphs": [
            "Round 2 asks whether the Combined vaccine activates a complete anti-tumour immune chain. Using the same DC/T system as round 1, we electroporated four constructs into DCs, the single-epitope, double-epitope and Combined TROP2 constructs, and then followed the response link by link in the order an immune response takes: whether the DC matures (CD80/CD86) and the antigen is translated (anti-FLAG WB), whether T cells are activated and differentiate towards effector memory (CD69, CD28, CD45RO⁺CCR7⁻), and whether they secrete cytokines (ELISpot) and kill TNBC target cells (MDA-MB-231)."
          ]
        },
        {
          "type": "subheading",
          "id": "exp-4-1",
          "index": "4.1",
          "title": "4.1 DC maturation"
        },
        {
          "type": "heading",
          "level": 4,
          "title": "Background"
        },
        {
          "type": "prose",
          "paragraphs": [
            "A DC primes T cells only if it does two things: present antigen (signal 1) and upregulate the co-stimulatory molecules CD80/CD86 (signal 2). This step measures the CD80⁺CD86⁺ mature fraction of DCs by flow cytometry after electroporation with each construct, which is how far each circRNA drives DC maturation and the precondition for anything downstream in the T cell response. [19]"
          ]
        },
        {
          "type": "heading",
          "level": 4,
          "title": "Materials & Reagents"
        },
        {
          "type": "table",
          "headers": [
            "Component",
            "Amount / Spec"
          ],
          "rows": [
            [
              "Immature DC (iDC); candidate circRNA; empty-vector circRNA (for the Blank group)",
              "Grouped electroporation; 5 µg circRNA / 1×10⁶ DC / 100 µL, Program U-002 (as in 2.1)"
            ],
            [
              "RPMI-1640 complete medium",
              "Culture for 24–48 h"
            ],
            [
              "Fluorochrome-conjugated anti-CD80, anti-CD86",
              "Surface staining, 0.2–0.5 µg/10⁶ (determined by titration)"
            ],
            [
              "Isotype control antibodies; flow staining buffer",
              "Controls"
            ]
          ]
        },
        {
          "type": "heading",
          "level": 4,
          "title": "Equipment"
        },
        {
          "type": "prose",
          "paragraphs": [
            "Nucleofector II electroporation system, flow cytometer, CO₂ incubator, centrifuge, biosafety cabinet."
          ]
        },
        {
          "type": "heading",
          "level": 4,
          "title": "Experimental Design (controls and replicates)"
        },
        {
          "type": "prose",
          "paragraphs": [
            "**Controls**: the Blank group is electroporated with an equal amount of empty-vector circRNA (complete circRNA backbone and 4×mC3dP28 adjuvant element, no epitope encoded) and is the vector control. This design lets the Blank group subtract three backgrounds at once: the stress of electroporation itself, the innate immune stimulation of the circRNA backbone through intracellular sensors such as RIG-I/MDA5, and the effect of the adjuvant element; each group also has an isotype control tube. Electroporation conditions (cell number, volume, program) are identical across groups.",
            "**Replicates**: n = 3, three independently electroporated wells per group, each acquired as a separate flow tube and reported as mean ± SD of the three. ≥2×10⁴ events are acquired per tube."
          ]
        },
        {
          "type": "heading",
          "level": 4,
          "title": "Step-by-Step Instructions"
        },
        {
          "type": "prose",
          "paragraphs": [
            "**Grouped Electroporation** [9]"
          ]
        },
        {
          "type": "protocol-steps",
          "steps": [
            {
              "number": "1",
              "blocks": [
                {
                  "type": "prose",
                  "paragraphs": [
                    "For each group, mix 100 µL cells with the corresponding circRNA (the Blank group receives an equal amount of empty-vector circRNA), stand at room temperature for 5 min and avoid bubbles."
                  ]
                }
              ]
            },
            {
              "number": "2",
              "blocks": [
                {
                  "type": "prose",
                  "paragraphs": [
                    "Electroporate with the Nucleofector II human DC program (U-002) and immediately add pre-warmed RPMI complete medium to stop the reaction."
                  ]
                }
              ]
            },
            {
              "number": "3",
              "blocks": [
                {
                  "type": "prose",
                  "paragraphs": [
                    "Transfer to a 6-well plate and culture at 37 ℃, 5% CO₂ for 24–48 h to induce maturation."
                  ]
                }
              ]
            }
          ]
        },
        {
          "type": "prose",
          "paragraphs": [
            "**Flow Staining** [18]"
          ]
        },
        {
          "type": "protocol-steps",
          "steps": [
            {
              "number": "1",
              "blocks": [
                {
                  "type": "prose",
                  "paragraphs": [
                    "Harvest DCs by centrifugation at 1200 rpm for 5 min and resuspend in 100 µL flow staining buffer."
                  ]
                }
              ]
            },
            {
              "number": "2",
              "blocks": [
                {
                  "type": "prose",
                  "paragraphs": [
                    "Add anti-CD80 and anti-CD86 (with a separate isotype control tube) and incubate at 4 ℃ in the dark for 30 min."
                  ]
                }
              ]
            }
          ]
        },
        {
          "type": "prose",
          "paragraphs": [
            "**Acquisition**"
          ]
        },
        {
          "type": "protocol-steps",
          "steps": [
            {
              "number": "1",
              "blocks": [
                {
                  "type": "prose",
                  "paragraphs": [
                    "Wash twice with 2 mL buffer, filter and acquire; gate on the DC population and quantify the CD80⁺CD86⁺ double-positive fraction."
                  ]
                }
              ]
            }
          ]
        },
        {
          "type": "heading",
          "level": 4,
          "title": "Notes"
        },
        {
          "type": "list",
          "ordered": true,
          "start": 1,
          "items": [
            "A more complete maturation assessment could add CD83, HLA-DR and CCR7; this experiment uses CD80/CD86 as the core markers.",
            "Use empty-vector circRNA for the Blank group rather than mock electroporation or untreated cells, so that backbone and adjuvant stimulation is identical across groups and subtracted at the baseline."
          ]
        },
        {
          "type": "subheading",
          "id": "exp-4-2",
          "index": "4.2",
          "title": "4.2 Antigen translation by anti-FLAG Western blot"
        },
        {
          "type": "heading",
          "level": 4,
          "title": "Background"
        },
        {
          "type": "prose",
          "paragraphs": [
            "Before anything else can follow, the circRNA has to be translated into protein inside the DC. A FLAG tag was fused downstream of the epitopes during construction, so Western blotting with an anti-FLAG antibody detects the product in DC lysate, with β-actin as the loading control. A band at the expected size is the protein-level evidence that the circRNA is translated. [20]"
          ]
        },
        {
          "type": "heading",
          "level": 4,
          "title": "Materials & Reagents"
        },
        {
          "type": "table",
          "headers": [
            "Component",
            "Amount / Spec"
          ],
          "rows": [
            [
              "Electroporated DCs + blank control DCs",
              "Samples"
            ],
            [
              "RIPA lysis buffer with protease inhibitors; PMSF; PBS; loading buffer; protein marker",
              "PMSF 1 mM, protease inhibitor 1×; equal loading"
            ],
            [
              "SDS-PAGE gel kit; running/transfer buffer; PVDF membrane; methanol",
              "Electrophoresis and transfer"
            ],
            [
              "5% skimmed milk; anti-FLAG primary antibody; HRP secondary antibody; TBST; ECL (A/B)",
              "Immunoblotting/development"
            ]
          ]
        },
        {
          "type": "heading",
          "level": 4,
          "title": "Equipment"
        },
        {
          "type": "prose",
          "paragraphs": [
            "Protein electrophoresis unit, transfer apparatus, chemiluminescence gel imager, shaker, ice box, centrifuge."
          ]
        },
        {
          "type": "heading",
          "level": 4,
          "title": "Experimental Design (controls and replicates)"
        },
        {
          "type": "prose",
          "paragraphs": [
            "**Controls**: The blank control consisted of DCs processed in the same way as the RNA-treated groups, including electroporation, but without added RNA. β-actin served as the loading control, and equal amounts of total protein were loaded in each lane."
          ]
        },
        {
          "type": "heading",
          "level": 4,
          "title": "Step-by-Step Instructions"
        },
        {
          "type": "prose",
          "paragraphs": [
            "**Protein Extraction** [21]"
          ]
        },
        {
          "type": "protocol-steps",
          "steps": [
            {
              "number": "1",
              "blocks": [
                {
                  "type": "prose",
                  "paragraphs": [
                    "Wash the DCs twice with PBS, add freshly prepared 1 mM PMSF and 1× protease inhibitor, keeping everything on ice, then add RIPA and lyse on ice for 30 min (mixing every 10 min)."
                  ]
                }
              ]
            },
            {
              "number": "2",
              "blocks": [
                {
                  "type": "prose",
                  "paragraphs": [
                    "Centrifuge at 14,000 × g, 4 ℃, for 15 min, take the supernatant and quantify protein; add loading buffer, denature in boiling water for 10 min and chill on ice."
                  ]
                }
              ]
            }
          ]
        },
        {
          "type": "prose",
          "paragraphs": [
            "**SDS-PAGE & Transfer** [22]"
          ]
        },
        {
          "type": "protocol-steps",
          "steps": [
            {
              "number": "1",
              "blocks": [
                {
                  "type": "prose",
                  "paragraphs": [
                    "Load equal amounts of protein together with the marker; run the stacking gel at 80 V until the dye front reaches the resolving gel, then switch to 120 V until the bromophenol blue runs off."
                  ]
                }
              ]
            },
            {
              "number": "2",
              "blocks": [
                {
                  "type": "prose",
                  "paragraphs": [
                    "Activate the PVDF membrane in methanol for 15–30 s, then equilibrate it in transfer buffer for 2–5 min; assemble filter paper–gel–membrane–filter paper, expel bubbles, and wet-transfer at constant current 250–300 mA or constant voltage 100 V for 60–90 min."
                  ]
                }
              ]
            }
          ]
        },
        {
          "type": "prose",
          "paragraphs": [
            "**Immunoblotting**"
          ]
        },
        {
          "type": "protocol-steps",
          "steps": [
            {
              "number": "1",
              "blocks": [
                {
                  "type": "prose",
                  "paragraphs": [
                    "Block with 5% skimmed milk at room temperature for 1 h, then incubate with the anti-FLAG primary antibody overnight at 4 ℃ on a shaker."
                  ]
                }
              ]
            },
            {
              "number": "2",
              "blocks": [
                {
                  "type": "prose",
                  "paragraphs": [
                    "Wash the membrane 3 times with TBST (10 min each), incubate with the HRP secondary antibody at room temperature for 1 h and wash 3 more times."
                  ]
                }
              ]
            }
          ]
        },
        {
          "type": "prose",
          "paragraphs": [
            "**ECL Detection**"
          ]
        },
        {
          "type": "protocol-steps",
          "steps": [
            {
              "number": "1",
              "blocks": [
                {
                  "type": "prose",
                  "paragraphs": [
                    "Mix ECL solutions A and B in equal volumes and apply; react in the dark for 1 min and expose on the imager (β-actin as loading control), judging the FLAG band against the marker."
                  ]
                }
              ]
            }
          ]
        },
        {
          "type": "heading",
          "level": 4,
          "title": "Notes"
        },
        {
          "type": "list",
          "ordered": true,
          "start": 1,
          "items": [
            "An anti-FLAG Western blot demonstrates translation/expression, not MHC-I surface presentation directly; presentation is supported indirectly by the downstream ELISpot, activation and killing readouts.",
            "If the target band is weak, increase the loading, extend the exposure or use a more sensitive ECL; diffuse bands usually result from overloading or over-transfer."
          ]
        },
        {
          "type": "subheading",
          "id": "exp-4-3",
          "index": "4.3",
          "title": "4.3 T cell activation and memory differentiation"
        },
        {
          "type": "heading",
          "level": 4,
          "title": "Background"
        },
        {
          "type": "prose",
          "paragraphs": [
            "Immediate activation, co-stimulatory support and differentiation towards a memory phenotype are three separable properties of a CTL response, and a response can have one without the others. This step measures all three by flow cytometry: CD69 for early activation, CD28 for co-stimulation and effector survival, and CD45RO⁺CCR7⁻ for effector memory. Together they describe the quality of the T cell response the Combined vaccine induces. [23][24]"
          ]
        },
        {
          "type": "heading",
          "level": 4,
          "title": "Materials & Reagents"
        },
        {
          "type": "table",
          "headers": [
            "Component",
            "Amount / Spec"
          ],
          "rows": [
            [
              "DC–T co-culture cells for the four constructs (see 2.1–2.2)",
              "1×10⁶/mL"
            ],
            [
              "Panel ① CD8-PE + CD69-PerCP",
              "CD8 0.2 µg, CD69 0.3 µg /10⁶"
            ],
            [
              "Panel ② CD8-PE + CD28-APC",
              "0.2 / 0.3 µg /10⁶"
            ],
            [
              "Panel ③ CD8-PE + CD45RO-FITC + CCR7-APC",
              "0.2 / 0.3 µg /10⁶"
            ],
            [
              "Fixable viability dye (e.g. Zombie Aqua)",
              "Per manufacturer; stain in protein-free PBS"
            ],
            [
              "Pre-chilled PBS; cell fixation buffer; compensation beads",
              "As required"
            ]
          ]
        },
        {
          "type": "heading",
          "level": 4,
          "title": "Equipment"
        },
        {
          "type": "prose",
          "paragraphs": [
            "Flow cytometer, CO₂ incubator, centrifuge, vortex mixer, 5 mL light-protected flow tubes."
          ]
        },
        {
          "type": "heading",
          "level": 4,
          "title": "Experimental Design (controls and replicates)"
        },
        {
          "type": "prose",
          "paragraphs": [
            "**Controls**: the Blank group (electroporated with empty-vector circRNA) as baseline; each panel also has isotype, unstained and single-stain compensation controls, plus a fixable viability dye to exclude dead cells. ≥2×10⁴ events are acquired per tube.",
            "**Replicates**: n = 3 per group for all three panels (CD69, CD28, CD45RO/CCR7), three independently electroporated and co-cultured wells, each acquired as a separate tube and reported as mean ± SD of the three."
          ]
        },
        {
          "type": "heading",
          "level": 4,
          "title": "Step-by-Step Instructions"
        },
        {
          "type": "prose",
          "paragraphs": [
            "**Antibody Staining** [18][25]"
          ]
        },
        {
          "type": "protocol-steps",
          "steps": [
            {
              "number": "1",
              "blocks": [
                {
                  "type": "prose",
                  "paragraphs": [
                    "Harvest T cells from each group, adjust to 1×10⁶/mL, centrifuge at 300 × g for 5 min and resuspend in about 100 µL."
                  ]
                }
              ]
            },
            {
              "number": "2",
              "blocks": [
                {
                  "type": "prose",
                  "paragraphs": [
                    "Add the antibody panel appropriate to the readout and incubate in the dark for 15–20 min (flicking every 5 min): Panels ① and ② (CD8/CD69, CD8/CD28) are stained at 4 ℃; Panel ③, which contains CCR7, is stained at 37 ℃. Immediately after staining, wash with pre-chilled PBS and acquire as soon as possible."
                  ]
                }
              ]
            }
          ]
        },
        {
          "type": "prose",
          "paragraphs": [
            "**Washing & Resuspension**"
          ]
        },
        {
          "type": "protocol-steps",
          "steps": [
            {
              "number": "1",
              "blocks": [
                {
                  "type": "prose",
                  "paragraphs": [
                    "Add 2 mL pre-chilled PBS, centrifuge at 1500 rpm, 4 ℃, for 5 min and discard the supernatant."
                  ]
                }
              ]
            },
            {
              "number": "2",
              "blocks": [
                {
                  "type": "prose",
                  "paragraphs": [
                    "Disperse into a single-cell suspension with vortex pulses (2000 rpm, 1–2 s × 3–5)."
                  ]
                }
              ]
            }
          ]
        },
        {
          "type": "prose",
          "paragraphs": [
            "**Acquisition & Analysis** [26]"
          ]
        },
        {
          "type": "protocol-steps",
          "steps": [
            {
              "number": "1",
              "blocks": [
                {
                  "type": "prose",
                  "paragraphs": [
                    "Calibrate with compensation beads and set an FSC-H > 10⁴ threshold; gate the lymphocyte population on FSC/SSC (R1)."
                  ]
                }
              ]
            },
            {
              "number": "2",
              "blocks": [
                {
                  "type": "prose",
                  "paragraphs": [
                    "Add a fixable viability dye (e.g. Zombie Aqua) in protein-free PBS to exclude non-specific fluorescence from dead cells, then wash back into staining buffer."
                  ]
                }
              ]
            },
            {
              "number": "3",
              "blocks": [
                {
                  "type": "prose",
                  "paragraphs": [
                    "Within the CD8⁺ gate, quantify the positive fraction for each marker: CD69, CD28 and CD45RO⁺CCR7⁻."
                  ]
                }
              ]
            }
          ]
        },
        {
          "type": "heading",
          "level": 4,
          "title": "Notes"
        },
        {
          "type": "list",
          "ordered": true,
          "start": 1,
          "items": [
            "CD28 can be downregulated with terminal effector differentiation, so the time point of detection matters; acquire promptly after staining, or fix and store at 4 ℃ in the dark (noting that fixation may affect some epitopes).",
            "CCR7 stains poorly at 4 ℃, which is why Panel ③ is stained at 37 ℃ while the other panels are kept cold; after staining, wash with pre-chilled PBS and acquire promptly, because surface receptors internalise once the cells are warmed.",
            "Use an empty-vector circRNA Blank to subtract the innate contribution of the backbone and the adjuvant. For proof of antigen specificity, add pMHC tetramer staining in a matched HLA system (see Outlook O1)."
          ]
        },
        {
          "type": "subheading",
          "id": "exp-4-4",
          "index": "4.4",
          "title": "4.4 Round-2 ELISpot"
        },
        {
          "type": "heading",
          "level": 4,
          "title": "Background"
        },
        {
          "type": "prose",
          "paragraphs": [
            "Same assay as 2.3, now on the four optimised constructs, and this time against a vector control. It quantifies how many IFN-γ–secreting T cells each construct induces, which is what allows the Combined vaccine to be compared with the single-epitope constructs. [13]"
          ]
        },
        {
          "type": "heading",
          "level": 4,
          "title": "Materials & Reagents"
        },
        {
          "type": "table",
          "headers": [
            "Component",
            "Amount / Spec"
          ],
          "rows": [
            [
              "Human IFN-γ Precoated ELISpot Kit",
              "Dakewe #2110005"
            ],
            [
              "Blocking solution; wash buffer; biotinylated detection antibody; HRP-streptavidin; AEC",
              "Supplied in kit, 100 µL/well"
            ],
            [
              "DCs electroporated with the four circRNA constructs + autologous T cells (see 2.1–2.2)",
              "DC : T = 1 : 20, 1×10⁵/well; plus Blank (empty-vector circRNA)"
            ]
          ]
        },
        {
          "type": "heading",
          "level": 4,
          "title": "Equipment"
        },
        {
          "type": "prose",
          "paragraphs": [
            "ELISpot reader/analysis system, CO₂ incubator, centrifuge, biosafety cabinet."
          ]
        },
        {
          "type": "heading",
          "level": 4,
          "title": "Experimental Design (controls and replicates)"
        },
        {
          "type": "prose",
          "paragraphs": [
            "**Control**: the Blank group is DCs electroporated with empty-vector circRNA (complete backbone and 4×mC3dP28 adjuvant, no epitope encoded) and co-cultured with autologous T cells, and it provides the background against which every other group is read. Being a vector control rather than an untreated well is what round 1 lacked (2.3), and it is what lets the round-2 increment be attributed to the epitope-encoding sequence. T-cell input numbers are identical across groups and results are reported as SFC per 1×10⁵ cells.",
            "**Replicates**: each group is a single well, so this assay yields no error bar and no statistical test, and every value is a single determination. Replicate wells belong in any repeat of the experiment."
          ]
        },
        {
          "type": "heading",
          "level": 4,
          "title": "Step-by-Step Instructions"
        },
        {
          "type": "prose",
          "paragraphs": [
            "**Blocking & Co-culture** [14]"
          ]
        },
        {
          "type": "protocol-steps",
          "steps": [
            {
              "number": "1",
              "blocks": [
                {
                  "type": "prose",
                  "paragraphs": [
                    "Equilibrate the ELISpot plate to room temperature, add blocking solution and block at room temperature, then discard."
                  ]
                }
              ]
            },
            {
              "number": "2",
              "blocks": [
                {
                  "type": "prose",
                  "paragraphs": [
                    "Add DCs and autologous T cells for each group at DC : T = 1 : 20, 1×10⁵ cells per well, together with a Blank (empty-vector circRNA group), and incubate at 37 ℃ in the CO₂ incubator for 20 h to stimulate IFN-γ secretion."
                  ]
                }
              ]
            }
          ]
        },
        {
          "type": "prose",
          "paragraphs": [
            "**Detection & Development** [14]"
          ]
        },
        {
          "type": "protocol-steps",
          "steps": [
            {
              "number": "1",
              "blocks": [
                {
                  "type": "prose",
                  "paragraphs": [
                    "Discard the cells and wash the plate 5 times with wash buffer, then add the biotinylated detection antibody and incubate at room temperature."
                  ]
                }
              ]
            },
            {
              "number": "2",
              "blocks": [
                {
                  "type": "prose",
                  "paragraphs": [
                    "Wash and add HRP-streptavidin; incubate at room temperature."
                  ]
                }
              ]
            },
            {
              "number": "3",
              "blocks": [
                {
                  "type": "prose",
                  "paragraphs": [
                    "Wash and add AEC substrate, developing in the dark until spots are clearly visible, then stop with deionised water."
                  ]
                }
              ]
            }
          ]
        },
        {
          "type": "prose",
          "paragraphs": [
            "**Spot Counting**"
          ]
        },
        {
          "type": "protocol-steps",
          "steps": [
            {
              "number": "1",
              "blocks": [
                {
                  "type": "prose",
                  "paragraphs": [
                    "Air-dry and count on the reader."
                  ]
                }
              ]
            }
          ]
        },
        {
          "type": "heading",
          "level": 4,
          "title": "Notes"
        },
        {
          "type": "list",
          "ordered": true,
          "start": 1,
          "items": [
            "The T cell input must be identical across constructs for SFC to be comparable; report SFC per 10⁵ cells."
          ]
        },
        {
          "type": "subheading",
          "id": "exp-4-5",
          "index": "4.5",
          "title": "4.5 MDA-MB-231 specific killing"
        },
        {
          "type": "heading",
          "level": 4,
          "title": "Background"
        },
        {
          "type": "prose",
          "paragraphs": [
            "Killing a real tumour cell is the functional endpoint of the in vitro work. This step runs the Calcein-AM release assay against the human triple-negative breast cancer line MDA-MB-231 (HLA-A*02:01⁺, TROP2⁺), which carries both the matching HLA type and the target antigen that K562 in 2.4 lacks, so lysis here can be read as antigen-specific. [15][16]"
          ]
        },
        {
          "type": "heading",
          "level": 4,
          "title": "Materials & Reagents"
        },
        {
          "type": "table",
          "headers": [
            "Component",
            "Amount / Spec"
          ],
          "rows": [
            [
              "MDA-MB-231 (HLA-A*02:01⁺, TROP2⁺)",
              "Target cells; 1×10⁶/mL for labelling"
            ],
            [
              "Calcein-AM",
              "Label in the dark, final concentration 1 µM"
            ],
            [
              "0.05% Trypsin-EDTA or gentle cell dissociation buffer",
              "Digest for < 3 min"
            ],
            [
              "Medium with FBS; PBS; Triton X-100",
              "As required"
            ],
            [
              "Primed effector T cells of each group",
              "E:T = 20:1 / 40:1 / 80:1"
            ],
            [
              "Black light-protected 96-well plate",
              "3 replicate wells"
            ]
          ]
        },
        {
          "type": "heading",
          "level": 4,
          "title": "Equipment"
        },
        {
          "type": "prose",
          "paragraphs": [
            "CO₂ incubator, fluorescence microplate reader (Ex 485 / Em 530 nm), centrifuge, microscope."
          ]
        },
        {
          "type": "heading",
          "level": 4,
          "title": "Experimental Design (controls and replicates)"
        },
        {
          "type": "prose",
          "paragraphs": [
            "**Controls**: spontaneous-release wells (target + medium), maximum-release wells (target + Triton) and blank wells (medium only).",
            "**Replicates**: 3 wells per condition at each of three effector-to-target ratios, 20:1, 40:1 and 80:1, which gives the dose dependence of killing."
          ]
        },
        {
          "type": "heading",
          "level": 4,
          "title": "Step-by-Step Instructions"
        },
        {
          "type": "prose",
          "paragraphs": [
            "**Target Labeling** [27]"
          ]
        },
        {
          "type": "protocol-steps",
          "steps": [
            {
              "number": "1",
              "blocks": [
                {
                  "type": "prose",
                  "paragraphs": [
                    "Take log-phase MDA-MB-231 and detach briefly (< 3 min) with 0.05% Trypsin-EDTA or a gentle cell dissociation buffer, washing twice with PBS after labelling to prevent damage to membrane proteins; then add Calcein-AM and label at 37 ℃ in the dark for 30 min."
                  ]
                }
              ]
            },
            {
              "number": "2",
              "blocks": [
                {
                  "type": "prose",
                  "paragraphs": [
                    "Wash twice with complete medium to remove free dye and adjust to the required density."
                  ]
                }
              ]
            }
          ]
        },
        {
          "type": "prose",
          "paragraphs": [
            "**Plating & Co-incubation**"
          ]
        },
        {
          "type": "protocol-steps",
          "steps": [
            {
              "number": "1",
              "blocks": [
                {
                  "type": "prose",
                  "paragraphs": [
                    "Plate the activated T cells with the labelled target cells at three E:T ratios, 20:1, 40:1 and 80:1, with spontaneous, maximum (Triton) and blank wells, 3 replicates each."
                  ]
                }
              ]
            },
            {
              "number": "2",
              "blocks": [
                {
                  "type": "prose",
                  "paragraphs": [
                    "Co-incubate at 37 ℃ in the dark for 4–6 h."
                  ]
                }
              ]
            }
          ]
        },
        {
          "type": "prose",
          "paragraphs": [
            "**Fluorescence Readout**"
          ]
        },
        {
          "type": "protocol-steps",
          "steps": [
            {
              "number": "1",
              "blocks": [
                {
                  "type": "prose",
                  "paragraphs": [
                    "Centrifuge at 200 × g for 5 min and carefully transfer the supernatant to a black 96-well plate."
                  ]
                }
              ]
            },
            {
              "number": "2",
              "blocks": [
                {
                  "type": "prose",
                  "paragraphs": [
                    "Measure fluorescence on the fluorescence plate reader (Ex 485 / Em 530 nm) and calculate the specific killing rate as:",
                    "Specific lysis (%) = (F experimental − F spontaneous) / (F maximum − F spontaneous) × 100%"
                  ]
                }
              ]
            }
          ]
        },
        {
          "type": "heading",
          "level": 4,
          "title": "Notes"
        },
        {
          "type": "list",
          "ordered": true,
          "start": 1,
          "items": [
            "Pair the tumour target with an HLA-matched, antigen-negative target, or with a normal line of the same tissue origin, so that the comparison separates antigen recognition from HLA recognition.",
            "The Calcein-AM release method suits short (4–6 h) killing assays; for longer time courses or higher sensitivity, LDH release or a luciferase reporter target cell can be considered."
          ]
        }
      ]
    },
    {
      "id": "sec-safety",
      "index": "05",
      "kicker": "05 / In Vitro Safety",
      "navLabel": "Safety Groundwork",
      "title": "Safety exploration: in vitro groundwork",
      "summary": "",
      "blocks": [
        {
          "type": "prose",
          "paragraphs": [
            "This block measures three quantities in cell culture: how well circRNA resists degradation compared with its linear precursor, whether the T cells the vaccine activates also kill normal cells, and how much LNP carrier cells tolerate. Each corresponds to a distinct way the platform could go wrong. A molecule that needs large and frequent doses makes exposure itself the problem (5.1); a response that cannot tell tumour from healthy tissue is dangerous whatever its potency (5.2); and the carrier can be toxic on its own account (5.3). Taken together they give a working envelope, how much, how often and against what, which is also the 3Rs argument for doing this work in cells first, since the first stability figure already lowered the dose and dosing frequency the animal study had to use. The stability and LNP dose experiments were completed before any animal was used. The off-target experiment in 5.2 was added during the animal work, after our Human Practices activities raised on-target/off-tumour toxicity as the risk to address directly.",
            "These are cell-based experiments, so their conclusions hold at the level of cells: a discrimination ratio, a dose ceiling, a persistence profile. The tissue-level questions that complete a safety case, repeat-dose tolerance, organ histopathology, haematology and serum chemistry, immunotoxicity and biodistribution, need an animal, and the study designed to answer them is set out in Outlook O3. The two stages are one programme: the numbers obtained here parameterised the Dry Lab model, and that model proposed the dose and schedule carried into Section 7."
          ]
        },
        {
          "type": "subheading",
          "id": "exp-5-1",
          "index": "5.1",
          "title": "5.1 In vitro stability of circRNA versus linear RNA"
        },
        {
          "type": "heading",
          "level": 4,
          "title": "Background"
        },
        {
          "type": "prose",
          "paragraphs": [
            "Having no free 5′/3′ ends, circRNA natively resists exonuclease degradation, which is what the platform's low dosing frequency and durable expression rest on. It is also a safety argument: the more stable the molecule, the less nucleic acid and the fewer doses needed for the same antigen expression, and the smaller the exposure. Here equal amounts of circRNA and its linear precursor are incubated in parallel, sampled at 0, 24, 48 and 72 h, and compared for residual band intensity by agarose gel electrophoresis. [2]"
          ]
        },
        {
          "type": "heading",
          "level": 4,
          "title": "Materials & Reagents"
        },
        {
          "type": "table",
          "headers": [
            "Component",
            "Amount / Spec"
          ],
          "rows": [
            [
              "Purified circRNA / an equal amount of linear precursor RNA",
              "Two groups in parallel at equal mass; from the Combined batch (3.1); specific preparation: the Combined circRNA"
            ],
            [
              "Incubation matrix",
              "Incubated at 37 ℃; the matrix and the loading amount per time point are to be confirmed"
            ],
            [
              "1% agarose, nucleic acid stain, RNA marker",
              "Electrophoresis"
            ],
            [
              "Micro-volume spectrophotometer consumables; nuclease-free consumables and water",
              "Nuclease-free throughout"
            ]
          ]
        },
        {
          "type": "heading",
          "level": 4,
          "title": "Equipment"
        },
        {
          "type": "prose",
          "paragraphs": [
            "Dry bath / incubator (37 ℃), agarose gel electrophoresis system, gel imager, micro-volume spectrophotometer; nuclease-free consumables throughout."
          ]
        },
        {
          "type": "heading",
          "level": 4,
          "title": "Experimental Design (controls and replicates)"
        },
        {
          "type": "prose",
          "paragraphs": [
            "**Material**: the Combined circRNA of the 3.1 batch, the same preparation run, circularisation condition and RNase R enrichment as the material used from round 2 onwards. The stability figure therefore applies to the vaccine itself rather than to a round-1 construct, which is what lets it be carried into the dosing rationale.",
            "**Control**: an equal mass of the linear precursor RNA, incubated in the same matrix at the same temperature. The 0 h lane of each group is its own baseline, and all time points run side by side on one gel so that both RNAs share electrophoresis and imaging conditions.",
            "**Readout**: band intensities are integrated densitometrically, normalised to the integrated signal of the DNA ladder lane on the same panel, and expressed relative to each RNA's own 0 h lane (set to 1.0).",
            "**Replicates**: each time point is a single lane with no biological replicate, so the result is the relative residual amount at each time point; no decay is fitted and no half-life or decay constant is reported."
          ]
        },
        {
          "type": "heading",
          "level": 4,
          "title": "Step-by-Step Instructions"
        },
        {
          "type": "prose",
          "paragraphs": [
            "**Sample Preparation & Incubation**"
          ]
        },
        {
          "type": "protocol-steps",
          "steps": [
            {
              "number": "1",
              "blocks": [
                {
                  "type": "prose",
                  "paragraphs": [
                    "Measure the concentration and A260/280 of the purified circRNA and the linear precursor RNA on the micro-volume spectrophotometer and normalise both to the same mass concentration."
                  ]
                }
              ]
            },
            {
              "number": "2",
              "blocks": [
                {
                  "type": "prose",
                  "paragraphs": [
                    "Aliquot equal amounts of the two RNAs into nuclease-free tubes, one tube per RNA per time point."
                  ]
                }
              ]
            },
            {
              "number": "3",
              "blocks": [
                {
                  "type": "prose",
                  "paragraphs": [
                    "Incubate all tubes at 37 ℃ and remove the corresponding tubes at 0, 24, 48 and 72 h; freeze each sampled tube immediately at −80 ℃ so that all time points can be run on the same gel."
                  ]
                }
              ]
            }
          ]
        },
        {
          "type": "prose",
          "paragraphs": [
            "**Agarose Gel Electrophoresis**"
          ]
        },
        {
          "type": "protocol-steps",
          "steps": [
            {
              "number": "1",
              "blocks": [
                {
                  "type": "prose",
                  "paragraphs": [
                    "Thaw all time-point samples together, load equal volumes onto a 1% agarose gel alongside an RNA marker, and run at 100 V."
                  ]
                }
              ]
            },
            {
              "number": "2",
              "blocks": [
                {
                  "type": "prose",
                  "paragraphs": [
                    "After imaging, integrate the density of each band with image analysis software, normalise to the DNA ladder lane of the same panel, and calculate for each time point the residual fraction of each RNA relative to its own 0 h lane."
                  ]
                }
              ]
            }
          ]
        },
        {
          "type": "heading",
          "level": 4,
          "title": "Notes"
        },
        {
          "type": "list",
          "ordered": true,
          "start": 1,
          "items": [
            "Circular RNA migrates anomalously in non-denaturing gels (usually more slowly than linear RNA of the same length), so band position alone is not sufficient to establish circularisation, confirm circularisation by divergent-primer RT-qPCR (1.1/3.1) and BSJ sequencing (3.1 step 11) instead.",
            "Report densitometry as a relative residual amount, not as a kinetic parameter. Report a half-life or decay constant only from a time course with replicated points and enough points to fit and test a decay model, preferably quantified by divergent-primer RT-qPCR against an internal reference rather than by gel, and preferably inside cells.",
            "The incubation matrix must be specified when interpreting the biological meaning: degradation in nuclease-free buffer, in serum-containing medium and inside a cell are three different questions.",
            "Densitometry in the low-signal range is noise-prone: once a band approaches background, integration error is greatly amplified and a later time point can read higher than an earlier one. Report raw integrated values without smoothing or exclusion, and read any point near the detection limit only as \"at or below the detection limit\" rather than interpreting it individually."
          ]
        },
        {
          "type": "subheading",
          "id": "exp-5-2",
          "index": "5.2",
          "title": "5.2 Off-target cytotoxicity against normal cells"
        },
        {
          "type": "heading",
          "level": 4,
          "title": "Background"
        },
        {
          "type": "prose",
          "paragraphs": [
            "The safety risk specific to a tumour vaccine is that the cytotoxic T cells it activates damage normal tissue expressing low levels of the same antigen while they kill the tumour (on-target/off-tumour toxicity). This step uses exactly the same Calcein-AM release system as the efficacy experiment, co-incubating Combined-vaccine-primed effector T cells with a panel of human normal cell lines, HCAEC (coronary artery endothelium), LX-2 (hepatic stellate cells), BEAS-2B (bronchial epithelium) and MCF12A (normal mammary epithelium), with MDA-MB-231 (the TNBC target) as a positive control, at two relatively high effector-to-target ratios. The readout is the contrast between lysis of the tumour line and lysis of the normal lines under the same conditions. [15][16]"
          ]
        },
        {
          "type": "heading",
          "level": 4,
          "title": "Materials & Reagents"
        },
        {
          "type": "table",
          "headers": [
            "Component",
            "Amount / Spec"
          ],
          "rows": [
            [
              "Normal cell lines: HCAEC, LX-2, BEAS-2B, MCF12A",
              "5×10⁴/mL each; all four confirmed HLA-A*02:01 positive"
            ],
            [
              "Positive-control target: MDA-MB-231 (HLA-A*02:01⁺, TROP2⁺)",
              "5×10⁴/mL"
            ],
            [
              "Combined-vaccine-primed effector T cells (see 2.2)",
              "E:T = 80:1 and 100:1"
            ],
            [
              "Calcein-AM",
              "Final concentration 1 µM"
            ],
            [
              "4.2% Triton X-100 (maximum release); medium with 5% FBS; PBS",
              "As required"
            ],
            [
              "Black light-protected 96-well plate",
              "3 replicate wells per condition"
            ]
          ]
        },
        {
          "type": "heading",
          "level": 4,
          "title": "Equipment"
        },
        {
          "type": "prose",
          "paragraphs": [
            "CO₂ incubator, fluorescence microplate reader (Ex 485 / Em 530 nm), centrifuge, biosafety cabinet, microscope."
          ]
        },
        {
          "type": "heading",
          "level": 4,
          "title": "Experimental Design (controls and replicates)"
        },
        {
          "type": "prose",
          "paragraphs": [
            "**Controls**: every target cell line has spontaneous-release wells (target + medium) and maximum-release wells (target + Triton); MDA-MB-231 is the positive-control target (high killing expected) and the four normal cell lines are the safety objects (low killing expected). All four normal lines were confirmed HLA-A*02:01 positive before the experiment, so whatever level of killing is observed cannot be attributed to HLA mismatch preventing CTL recognition.",
            "**Replicates**: every condition is examined at two effector-to-target ratios, 80:1 and 100:1, with 3 technical replicate wells per condition on a single plate. These wells give plate-level precision, so a mean ± SD derived from them describes the plate and not biological variation across effector-cell batches."
          ]
        },
        {
          "type": "heading",
          "level": 4,
          "title": "Step-by-Step Instructions"
        },
        {
          "type": "prose",
          "paragraphs": [
            "**Target Labeling**"
          ]
        },
        {
          "type": "protocol-steps",
          "steps": [
            {
              "number": "1",
              "blocks": [
                {
                  "type": "prose",
                  "paragraphs": [
                    "Take log-phase normal cell lines and MDA-MB-231, wash twice with PBS and resuspend in PBS at 1×10⁶/mL."
                  ]
                }
              ]
            },
            {
              "number": "2",
              "blocks": [
                {
                  "type": "prose",
                  "paragraphs": [
                    "Add Calcein-AM to a final concentration of 1 µM and incubate at 37 ℃, 5% CO₂ in the dark for 20–30 min."
                  ]
                }
              ]
            },
            {
              "number": "3",
              "blocks": [
                {
                  "type": "prose",
                  "paragraphs": [
                    "Wash away free dye and adjust to 5×10⁴/mL in medium containing 5% FBS."
                  ]
                }
              ]
            }
          ]
        },
        {
          "type": "prose",
          "paragraphs": [
            "**Effector Preparation & Plating**"
          ]
        },
        {
          "type": "protocol-steps",
          "steps": [
            {
              "number": "1",
              "blocks": [
                {
                  "type": "prose",
                  "paragraphs": [
                    "Harvest the Combined-vaccine-primed effector T cells and adjust the concentration for the two effector-to-target ratios, 80:1 and 100:1."
                  ]
                }
              ]
            },
            {
              "number": "2",
              "blocks": [
                {
                  "type": "prose",
                  "paragraphs": [
                    "For each target cell line, plate spontaneous wells (target + medium), maximum wells (target + Triton) and experimental wells (target + effector), 3 replicate wells per condition."
                  ]
                }
              ]
            }
          ]
        },
        {
          "type": "prose",
          "paragraphs": [
            "**Co-incubation & Readout**"
          ]
        },
        {
          "type": "protocol-steps",
          "steps": [
            {
              "number": "1",
              "blocks": [
                {
                  "type": "prose",
                  "paragraphs": [
                    "Co-incubate at 37 ℃, 5% CO₂ in the dark for 4–6 h."
                  ]
                }
              ]
            },
            {
              "number": "2",
              "blocks": [
                {
                  "type": "prose",
                  "paragraphs": [
                    "Centrifuge at 200 × g at room temperature for 5 min and carefully transfer 100 µL supernatant per well to a black 96-well plate."
                  ]
                }
              ]
            },
            {
              "number": "3",
              "blocks": [
                {
                  "type": "prose",
                  "paragraphs": [
                    "Measure fluorescence (Ex 485 / Em 530 nm) and calculate the killing percentage for each cell line for between-group comparison:",
                    "Killing (%) = (F experimental − F spontaneous) / (F maximum − F spontaneous) × 100%"
                  ]
                }
              ]
            }
          ]
        },
        {
          "type": "heading",
          "level": 4,
          "title": "Notes"
        },
        {
          "type": "list",
          "ordered": true,
          "start": 1,
          "items": [
            "Normal cells are mostly adherent; before labelling and plating they must be dissociated into a uniform single-cell suspension and their viability confirmed, so that digestion damage does not raise spontaneous release and get misread as \"off-target killing\".",
            "Confirm the HLA type of every normal line before the assay, and match the panel to the restriction element of the epitopes; an unmatched panel cannot test antigen discrimination.",
            "Measure target-antigen expression on the normal panel as well (flow cytometry suffices). Until it is measured, call the panel an HLA-matched normal cell panel and not an antigen-negative control.",
            "This experiment was added after the in vivo work had begun: Human Practices discussions during that stage identified on-target/off-tumour toxicity as the first safety question a clinical reader asks, and the normal-cell panel was assembled in response."
          ]
        },
        {
          "type": "subheading",
          "id": "exp-5-3",
          "index": "5.3",
          "title": "5.3 Safe dose window of the LNP delivery system"
        },
        {
          "type": "heading",
          "level": 4,
          "title": "Background"
        },
        {
          "type": "prose",
          "paragraphs": [
            "circRNA requires lipid nanoparticles (LNP) to enter cells efficiently, but cationic/ionisable lipids are themselves cytotoxic at high doses, so the interval in which delivery is effective and cells are undamaged must be defined first. This step co-cultures empty LNP, the carrier alone, with no circRNA cargo, with DCs across a dose gradient (0, 50, 100, 200, 400 ng of LNP per well) and measures cell viability by CCK-8, determining the highest dose that causes no obvious toxicity as the safety ceiling for subsequent in vitro and in vivo dose selection. The dose axis is therefore lipid mass, not RNA mass, and what is measured is the intrinsic toxicity of the delivery vehicle, isolated from any contribution of the nucleic-acid cargo."
          ]
        },
        {
          "type": "heading",
          "level": 4,
          "title": "Materials & Reagents"
        },
        {
          "type": "table",
          "headers": [
            "Component",
            "Amount / Spec"
          ],
          "rows": [
            [
              "Empty LNP (carrier only, no circRNA loaded)",
              "0 / 50 / 100 / 200 / 400 ng LNP per well"
            ],
            [
              "Immature moDC (prepared as in 2.1)",
              "1×10⁴/well (96-well plate)"
            ],
            [
              "RPMI-1640 complete medium",
              "100 µL/well"
            ],
            [
              "CCK-8 reagent (WST-8)",
              "10 µL/well"
            ],
            [
              "96-well flat-bottom plate",
              "4 replicate wells per dose"
            ]
          ]
        },
        {
          "type": "heading",
          "level": 4,
          "title": "Equipment"
        },
        {
          "type": "prose",
          "paragraphs": [
            "CO₂ incubator, microplate reader (450 nm), biosafety cabinet, pipettes."
          ]
        },
        {
          "type": "heading",
          "level": 4,
          "title": "Experimental Design (controls and replicates)"
        },
        {
          "type": "prose",
          "paragraphs": [
            "**Controls**: the 0 ng group (medium only) is the 100% viability baseline, and a cell-free blank well (medium + CCK-8) subtracts background absorbance.",
            "**Scope of the measurement**: the particles carry no circRNA, so the dose–viability relationship measured here belongs to the lipid carrier. The assay was designed to isolate the carrier, and the window it returns is a carrier-toxicity window; the whole formulation has its own ceiling, which the in vivo dose escalation of Outlook O3 is designed to establish.",
            "**Replicates**: 4 wells per dose."
          ]
        },
        {
          "type": "heading",
          "level": 4,
          "title": "Step-by-Step Instructions"
        },
        {
          "type": "prose",
          "paragraphs": [
            "**Cell Seeding**"
          ]
        },
        {
          "type": "protocol-steps",
          "steps": [
            {
              "number": "1",
              "blocks": [
                {
                  "type": "prose",
                  "paragraphs": [
                    "Seed immature DCs at 1×10⁴ per well in 100 µL complete medium in a 96-well flat-bottom plate."
                  ]
                }
              ]
            },
            {
              "number": "2",
              "blocks": [
                {
                  "type": "prose",
                  "paragraphs": [
                    "Incubate overnight at 37 ℃, 5% CO₂ to let the cells stabilise."
                  ]
                }
              ]
            }
          ]
        },
        {
          "type": "prose",
          "paragraphs": [
            "**LNP Treatment**"
          ]
        },
        {
          "type": "protocol-steps",
          "steps": [
            {
              "number": "1",
              "blocks": [
                {
                  "type": "prose",
                  "paragraphs": [
                    "Prepare the empty LNP (carrier only, no circRNA loaded) and dilute in complete medium to give the series 0, 50, 100, 200 and 400 ng LNP per well."
                  ]
                }
              ]
            },
            {
              "number": "2",
              "blocks": [
                {
                  "type": "prose",
                  "paragraphs": [
                    "Add the corresponding dose of empty LNP to each well, with 4 replicate wells and a cell-free blank, and mix by gentle rocking."
                  ]
                }
              ]
            },
            {
              "number": "3",
              "blocks": [
                {
                  "type": "prose",
                  "paragraphs": [
                    "Continue culture at 37 ℃, 5% CO₂ for 24 h."
                  ]
                }
              ]
            }
          ]
        },
        {
          "type": "prose",
          "paragraphs": [
            "**CCK-8 Assay** [28]"
          ]
        },
        {
          "type": "protocol-steps",
          "steps": [
            {
              "number": "1",
              "blocks": [
                {
                  "type": "prose",
                  "paragraphs": [
                    "Add 10 µL CCK-8 reagent per well, avoiding bubbles, and mix by gentle rocking."
                  ]
                }
              ]
            },
            {
              "number": "2",
              "blocks": [
                {
                  "type": "prose",
                  "paragraphs": [
                    "Incubate at 37 ℃ in the dark for 1–4 h (aiming for an OD of 1.0–1.5 in the 0 ng group)."
                  ]
                }
              ]
            },
            {
              "number": "3",
              "blocks": [
                {
                  "type": "prose",
                  "paragraphs": [
                    "Measure absorbance at 450 nm on the plate reader (600–650 nm may be used as the reference wavelength)."
                  ]
                }
              ]
            },
            {
              "number": "4",
              "blocks": [
                {
                  "type": "prose",
                  "paragraphs": [
                    "Calculate relative viability as below, plot the dose–viability curve and determine the safe dose window:",
                    "Relative viability (%) = (OD sample − OD blank) / (OD 0 ng − OD blank) × 100%"
                  ]
                }
              ]
            }
          ]
        },
        {
          "type": "heading",
          "level": 4,
          "title": "Notes"
        },
        {
          "type": "list",
          "ordered": true,
          "start": 1,
          "items": [
            "CCK-8 is a colorimetric method and the development time must be determined for each cell type in a pilot run; over-incubation saturates the OD and compresses between-group differences. Any bubbles after adding reagent must be popped, or the reading will be badly disturbed.",
            "The safe dose window should be interpreted together with the functional data: the working dose finally chosen must lie within the non-toxic interval and also be sufficient for antigen expression and DC activation.",
            "Assay the empty carrier first so that any toxicity seen is attributable to the lipid alone, then run the loaded particle alongside it on the same dose series and the same plate. Do not carry a window obtained on the empty carrier over to the loaded particle, and do not convert a per-cell in vitro dose (ng per 10⁴ cells) into a per-animal in vivo dose."
          ]
        }
      ]
    },
    {
      "id": "sec-trop2-model",
      "index": "06",
      "kicker": "06 / Target Model",
      "navLabel": "4T1-TROP2 Model",
      "title": "Construction of the TROP2-positive target model",
      "summary": "",
      "blocks": [
        {
          "type": "prose",
          "paragraphs": [
            "For an in vivo experiment to be meaningful, the tumour cells must carry the target antigen that the vaccine is directed against so that T cells can recognise them. Wild-type 4T1 barely expresses TROP2, so we needed a 4T1 line stably overexpressing TROP2 as a target-matched, standardised tool. To ensure vector quality and batch consistency and to avoid the biosafety burden and titre variability of in-house packaging, this project ordered a ready-made TROP2-overexpressing lentiviral preparation directly from a commercial supplier (carrying a GFP reporter gene and puromycin resistance), and did not carry out molecular cloning or virus packaging itself. On arrival the virus was used to transduce 4T1 directly; GFP⁺ cells were then sorted by flow cytometry and maintained under puromycin selection, and surface TROP2 expression was verified by flow cytometry before the cell line was used for the subsequent in vivo efficacy evaluation."
          ]
        },
        {
          "type": "subheading",
          "id": "exp-6-1",
          "index": "6.1",
          "title": "6.1 Lentiviral transduction of 4T1"
        },
        {
          "type": "heading",
          "level": 4,
          "title": "Background"
        },
        {
          "type": "prose",
          "paragraphs": [
            "To make 4T1 express TROP2 stably rather than transiently, the gene of interest must be integrated into the host genome by a lentivirus. To keep the titre stable and batches consistent, and to avoid the quality variability and additional biosafety burden of in-house packaging, this project ordered a ready-made TROP2-overexpressing lentiviral preparation (carrying a GFP reporter for flow sorting and puromycin resistance for selection pressure), and on arrival transduced 4T1 directly under BSL-2 conditions, using GFP fluorescence for preliminary confirmation of successful transduction. Stable integration is the basis for a tumour-model cell line that can be passaged long-term with a stable target. The virus is produced by the supplier by co-transfecting HEK293T with a second-generation three-plasmid system (transfer vector + psPAX2, which provides both Gag/Pol and Rev, + pMD2.G, the VSV-G envelope), as described in Chapter 6, “Lentiviral packaging”, of the plasmid manual shipped with the product (Miaoling Bio). In a second-generation system *rev* sits on the same plasmid as *gag/pol*, which is the difference from a third-generation vector and the reason this work was done under BSL-2. [29][30]"
          ]
        },
        {
          "type": "heading",
          "level": 4,
          "title": "Materials & Reagents"
        },
        {
          "type": "table",
          "headers": [
            "Component",
            "Amount / Spec"
          ],
          "rows": [
            [
              "Commercial TROP2-overexpressing lentiviral preparation (GFP + puromycin resistance)",
              "Titre not determined in-house; aliquoted and stored at −80 ℃"
            ],
            [
              "Log-phase 4T1 cells",
              "2×10⁵/well (6-well plate)"
            ],
            [
              "Polybrene (transduction enhancer)",
              "Final concentration 4–8 µg/mL"
            ],
            [
              "RPMI-1640 complete medium (10% FBS + 1% P/S)",
              "Medium change / culture"
            ],
            [
              "Chlorine disinfectant (available chlorine ≥5000 ppm)",
              "Inactivation of viral waste, ≥30 min contact"
            ]
          ]
        },
        {
          "type": "heading",
          "level": 4,
          "title": "Equipment"
        },
        {
          "type": "prose",
          "paragraphs": [
            "CO₂ incubator, Class II biosafety cabinet (BSC), fluorescence microscope, centrifuge, −80 ℃ freezer."
          ]
        },
        {
          "type": "heading",
          "level": 4,
          "title": "Experimental Design (controls and replicates)"
        },
        {
          "type": "prose",
          "paragraphs": [
            "**Control**: normal 4T1 without virus, which excludes autofluorescence and shows the effect of the handling itself.",
            "**Volume of virus added**: the batch was supplied without a titre, so the volume added followed the instructions shipped with the product rather than a calculated MOI, and transduction was judged from GFP fluorescence."
          ]
        },
        {
          "type": "heading",
          "level": 4,
          "title": "Step-by-Step Instructions"
        },
        {
          "type": "prose",
          "paragraphs": [
            "**Storage**"
          ]
        },
        {
          "type": "protocol-steps",
          "steps": [
            {
              "number": "1",
              "blocks": [
                {
                  "type": "prose",
                  "paragraphs": [
                    "Aliquot into single-use volumes inside the BSC and store at −80 ℃, avoiding repeated freeze–thaw, which lowers the titre (20–50% loss per cycle); thaw slowly on ice before use."
                  ]
                }
              ]
            }
          ]
        },
        {
          "type": "prose",
          "paragraphs": [
            "**Cell Seeding**"
          ]
        },
        {
          "type": "protocol-steps",
          "steps": [
            {
              "number": "1",
              "blocks": [
                {
                  "type": "prose",
                  "paragraphs": [
                    "Take log-phase 4T1, trypsinise and count, seed at 2×10⁵ per well in a 6-well plate and culture overnight at 37 ℃ to 50–70% confluence."
                  ]
                }
              ]
            }
          ]
        },
        {
          "type": "prose",
          "paragraphs": [
            "**Transduction**"
          ]
        },
        {
          "type": "protocol-steps",
          "steps": [
            {
              "number": "1",
              "blocks": [
                {
                  "type": "prose",
                  "paragraphs": [
                    "In the BSC, aspirate the medium and replace it with fresh complete medium."
                  ]
                }
              ]
            },
            {
              "number": "2",
              "blocks": [
                {
                  "type": "prose",
                  "paragraphs": [
                    "Add the volume of virus recommended by the instructions shipped with the product, add Polybrene to a final concentration of 4–8 µg/mL, mix by gentle rocking and return to the incubator."
                  ]
                }
              ]
            }
          ]
        },
        {
          "type": "prose",
          "paragraphs": [
            "**Medium Change & Expression**"
          ]
        },
        {
          "type": "protocol-steps",
          "steps": [
            {
              "number": "1",
              "blocks": [
                {
                  "type": "prose",
                  "paragraphs": [
                    "After 12–24 h of transduction, aspirate the virus-containing medium in the BSC and discharge it directly into chlorine disinfectant (available chlorine ≥5000 ppm, ≥30 min)."
                  ]
                }
              ]
            },
            {
              "number": "2",
              "blocks": [
                {
                  "type": "prose",
                  "paragraphs": [
                    "Wash the cells gently 1–2 times with PBS, change to fresh complete medium and culture for a further 48–72 h to allow full expression of TROP2 and GFP."
                  ]
                }
              ]
            }
          ]
        },
        {
          "type": "prose",
          "paragraphs": [
            "**GFP Verification**"
          ]
        },
        {
          "type": "protocol-steps",
          "steps": [
            {
              "number": "1",
              "blocks": [
                {
                  "type": "prose",
                  "paragraphs": [
                    "Under an inverted fluorescence microscope, observe and capture bright-field, GFP-channel and merged images in turn. Proceed to the sorting in 6.2 only if the fluorescence is bright and dense and the cell morphology is normal; if the signal is weak, read again at 72–96 h."
                  ]
                }
              ]
            }
          ]
        },
        {
          "type": "heading",
          "level": 4,
          "title": "Notes"
        },
        {
          "type": "list",
          "ordered": true,
          "start": 1,
          "items": [
            "Biosafety (BSL-2): The lentivirus is VSV-G pseudotyped with broad tropism; although replication-defective, it can still infect human cells and integrate into the genome. All open-vessel handling must therefore be carried out in a Class II biosafety cabinet with double gloves, and sealed rotors must be used for centrifugation; tips, tubes and media that have contacted virus must be soaked in chlorine disinfectant (available chlorine ≥5000 ppm) for ≥30 min before autoclaving. In the event of a spill, cover with absorbent paper, pour chlorine disinfectant from the outside inwards, leave for 30 min, then clean up and report. Immunocompromised and pregnant personnel must not take part in these operations.",
            "What lentivirus does to 4T1 is transduction (integration into the genome), not transfection; GFP fluorescence usually peaks 48–72 h after transduction, so observing too early gives false negatives while observing too late allows the cells to over-confluence and obscures the reading.",
            "Thawed virus should not be refrozen: each freeze–thaw cycle costs 20–50% of the titre, which is the most common cause of an unexpectedly low transduction rate."
          ]
        },
        {
          "type": "subheading",
          "id": "exp-6-2",
          "index": "6.2",
          "title": "6.2 Flow sorting of GFP⁺ cells"
        },
        {
          "type": "heading",
          "level": 4,
          "title": "Background"
        },
        {
          "type": "prose",
          "paragraphs": [
            "After lentiviral transduction the culture is a mixture of positive and negative cells and must be enriched and purified to obtain a homogeneous overexpressing cell line. Fluorescence-activated cell sorting selects GFP⁺ cells after three gates that exclude debris and doublets, and continuous puromycin pressure then removes the negative cells that remain, leaving a stable TROP2-overexpressing 4T1 population."
          ]
        },
        {
          "type": "heading",
          "level": 4,
          "title": "Materials & Reagents"
        },
        {
          "type": "table",
          "headers": [
            "Component",
            "Amount / Spec"
          ],
          "rows": [
            [
              "Transduced 4T1; trypsin; pre-chilled PBS",
              "1×10⁶–5×10⁶/mL"
            ],
            [
              "Untransduced 4T1 negative control; standard fluorescent beads",
              "Threshold setting / calibration"
            ],
            [
              "Puromycin",
              "Working concentration 2 µg/mL"
            ],
            [
              "Collection tubes pre-filled with 100% fetal bovine serum (FBS) or complete medium containing 50% FBS",
              "Protection during sorting"
            ]
          ]
        },
        {
          "type": "heading",
          "level": 4,
          "title": "Equipment"
        },
        {
          "type": "prose",
          "paragraphs": [
            "Cell sorter, CO₂ incubator, biosafety cabinet, centrifuge, fluorescence microscope."
          ]
        },
        {
          "type": "heading",
          "level": 4,
          "title": "Experimental Design (controls and replicates)"
        },
        {
          "type": "prose",
          "paragraphs": [
            "**Controls**: untransduced 4T1 as the negative control for setting the FSC/SSC voltages and the GFP threshold; standard fluorescent beads for instrument calibration. After sorting, an aliquot is re-run on the flow cytometer and checked by fluorescence microscopy. That re-check is a pass or fail confirmation that the population is homogeneous; the quantitative check on the sorted line is the surface-TROP2 measurement in 6.4."
          ]
        },
        {
          "type": "heading",
          "level": 4,
          "title": "Step-by-Step Instructions"
        },
        {
          "type": "prose",
          "paragraphs": [
            "**Single-Cell Preparation**"
          ]
        },
        {
          "type": "protocol-steps",
          "steps": [
            {
              "number": "1",
              "blocks": [
                {
                  "type": "prose",
                  "paragraphs": [
                    "Wash the transduced 4T1 twice with PBS, trypsinise at 37 ℃ for 2–3 min until the cells round up, and stop with complete medium."
                  ]
                }
              ]
            },
            {
              "number": "2",
              "blocks": [
                {
                  "type": "prose",
                  "paragraphs": [
                    "Pipette gently, centrifuge at 1000 rpm for 5 min and resuspend in pre-chilled PBS at 1×10⁶–5×10⁶/mL; keep on ice."
                  ]
                }
              ]
            }
          ]
        },
        {
          "type": "prose",
          "paragraphs": [
            "**Calibration & Gating**"
          ]
        },
        {
          "type": "protocol-steps",
          "steps": [
            {
              "number": "1",
              "blocks": [
                {
                  "type": "prose",
                  "paragraphs": [
                    "Calibrate the instrument with standard beads and use the negative control to set the FSC/SSC voltages and the GFP threshold (negative fluorescence 10¹–10²)."
                  ]
                }
              ]
            },
            {
              "number": "2",
              "blocks": [
                {
                  "type": "prose",
                  "paragraphs": [
                    "Gate in sequence: first FSC-A/SSC-A to remove debris, then FSC-A/FSC-H to remove doublets, then GFP⁺ with the threshold set at about 10³."
                  ]
                }
              ]
            }
          ]
        },
        {
          "type": "prose",
          "paragraphs": [
            "**Sorting & Selection** [31][32]"
          ]
        },
        {
          "type": "protocol-steps",
          "steps": [
            {
              "number": "1",
              "blocks": [
                {
                  "type": "prose",
                  "paragraphs": [
                    "Sort GFP⁺ cells aseptically into collection tubes containing medium."
                  ]
                }
              ]
            },
            {
              "number": "2",
              "blocks": [
                {
                  "type": "prose",
                  "paragraphs": [
                    "Seed the sorted cells in medium containing 2 µg/mL puromycin and select for 3–5 days before expansion."
                  ]
                }
              ]
            }
          ]
        },
        {
          "type": "prose",
          "paragraphs": [
            "**Purity Re-check**"
          ]
        },
        {
          "type": "protocol-steps",
          "steps": [
            {
              "number": "1",
              "blocks": [
                {
                  "type": "prose",
                  "paragraphs": [
                    "Re-run an aliquot on the flow cytometer to measure the GFP⁺ percentage and check homogeneity under the fluorescence microscope to confirm purity."
                  ]
                }
              ]
            }
          ]
        },
        {
          "type": "heading",
          "level": 4,
          "title": "Notes"
        },
        {
          "type": "list",
          "ordered": true,
          "start": 1,
          "items": [
            "Sorted cells are relatively fragile; collection tubes should be pre-filled with complete medium (which may contain a higher serum concentration) for protection, and the cells should be seeded as soon as possible.",
            "If a single sort does not give sufficient purity, the cells can be expanded and sorted a second time; over long-term passage, GFP/TROP2 should be re-checked periodically in case the transgene is silenced."
          ]
        },
        {
          "type": "subheading",
          "id": "exp-6-3",
          "index": "6.3",
          "title": "6.3 RNA preparation and RT-PCR for TROP2"
        },
        {
          "type": "heading",
          "level": 4,
          "title": "Background"
        },
        {
          "type": "prose",
          "paragraphs": [
            "Total RNA from wild-type and TROP2-overexpressing 4T1 cells is extracted with TRIzol, reverse-transcribed to cDNA and used for TROP2 PCR amplification. DNase I treatment before reverse transcription removes genomic and residual plasmid DNA to limit false positives."
          ]
        },
        {
          "type": "heading",
          "level": 4,
          "title": "Materials & Reagents"
        },
        {
          "type": "table",
          "headers": [
            "Component",
            "Amount / Spec"
          ],
          "rows": [
            [
              "WT / OE 4T1",
              "Two groups"
            ],
            [
              "TRIzol; chloroform, isopropanol, 75% ethanol (DEPC), DEPC water",
              "RNA extraction; 200 µL chloroform per 1 mL TRIzol"
            ],
            [
              "DNase I, EDTA; reverse transcription kit (oligo(dT)/random primers, RNase inhibitor)",
              "Genomic removal / RT"
            ],
            [
              "TROP2 and reference (GAPDH/β-actin) primers; 2× PCR Mix",
              "20 µL reaction"
            ]
          ]
        },
        {
          "type": "heading",
          "level": 4,
          "title": "Equipment"
        },
        {
          "type": "prose",
          "paragraphs": [
            "Thermal cycler, centrifuge, nucleic acid quantification instrument."
          ]
        },
        {
          "type": "heading",
          "level": 4,
          "title": "Experimental Design (controls and replicates)"
        },
        {
          "type": "prose",
          "paragraphs": [
            "**Control**: wild-type 4T1 (WT) as the control group, run in parallel with the overexpressing cells through the same RNA extraction, DNase I treatment, reverse transcription and PCR, with parallel reference-gene amplification (GAPDH/β-actin). A no-reverse-transcriptase (−RT) control and a no-template control (NTC) are run alongside every batch.",
            "**Replicates**: n = 3, three independent RNA extractions and reverse-transcription reactions per group, each with its own reference-gene amplification."
          ]
        },
        {
          "type": "heading",
          "level": 4,
          "title": "Step-by-Step Instructions"
        },
        {
          "type": "prose",
          "paragraphs": [
            "**RNA Extraction & DNase** [33]"
          ]
        },
        {
          "type": "protocol-steps",
          "steps": [
            {
              "number": "1",
              "blocks": [
                {
                  "type": "prose",
                  "paragraphs": [
                    "Lyse the cells in TRIzol, add 200 µL chloroform per 1 mL, shake and let stand, then centrifuge at 12,000 g, 4 ℃, for 15 min and take the aqueous phase."
                  ]
                }
              ]
            },
            {
              "number": "2",
              "blocks": [
                {
                  "type": "prose",
                  "paragraphs": [
                    "Precipitate the RNA with an equal volume of isopropanol, wash twice with 75% ethanol, dissolve in DEPC water and measure concentration/purity."
                  ]
                }
              ]
            },
            {
              "number": "3",
              "blocks": [
                {
                  "type": "prose",
                  "paragraphs": [
                    "Treat with DNase I at 37 ℃ for 30 min to remove genomic DNA, then inactivate with EDTA at 65 ℃ for 10 min."
                  ]
                }
              ]
            }
          ]
        },
        {
          "type": "prose",
          "paragraphs": [
            "**Reverse Transcription**"
          ]
        },
        {
          "type": "protocol-steps",
          "steps": [
            {
              "number": "1",
              "blocks": [
                {
                  "type": "prose",
                  "paragraphs": [
                    "Take 1 µg RNA with primers, denature at 65 ℃ for 5 min and chill on ice, then assemble a 20 µL reverse transcription reaction."
                  ]
                }
              ]
            },
            {
              "number": "2",
              "blocks": [
                {
                  "type": "prose",
                  "paragraphs": [
                    "Run 25 ℃ for 5–10 min, 42 ℃ for 30–60 min and 85 ℃ for 5 min to synthesise cDNA."
                  ]
                }
              ]
            }
          ]
        },
        {
          "type": "prose",
          "paragraphs": [
            "**PCR**"
          ]
        },
        {
          "type": "protocol-steps",
          "steps": [
            {
              "number": "1",
              "blocks": [
                {
                  "type": "prose",
                  "paragraphs": [
                    "Assemble 20 µL PCR reactions (2× Mix, primers, cDNA, water) for the WT and overexpressing groups in parallel, and amplify with 95 ℃ for 5 min, then 28–35 cycles of 95 ℃ 30 s, 55–60 ℃ 30 s and 72 ℃ 30–60 s, and a final 72 ℃ for 5–10 min."
                  ]
                }
              ]
            }
          ]
        },
        {
          "type": "heading",
          "level": 4,
          "title": "Notes"
        },
        {
          "type": "list",
          "ordered": true,
          "start": 1,
          "items": [
            "Exogenous overexpression plasmid very readily causes DNA-contamination false positives, so the DNase I step before reverse transcription must not be omitted. A −RT (no reverse transcriptase) control alongside every batch closes this gap rigorously and should be run as standard."
          ]
        },
        {
          "type": "subheading",
          "id": "exp-6-4",
          "index": "6.4",
          "title": "6.4 Surface TROP2 by flow cytometry"
        },
        {
          "type": "heading",
          "level": 4,
          "title": "Background"
        },
        {
          "type": "prose",
          "paragraphs": [
            "This step uses flow cytometry to detect surface TROP2 on 4T1, with wild-type cells as the negative control and an isotype control to set the threshold. The TROP2-positive rate and fluorescence intensity are used to assess surface expression in the overexpressing cells."
          ]
        },
        {
          "type": "heading",
          "level": 4,
          "title": "Materials & Reagents"
        },
        {
          "type": "table",
          "headers": [
            "Component",
            "Amount / Spec"
          ],
          "rows": [
            [
              "WT / OE 4T1",
              "Two groups, 1×10⁶/mL"
            ],
            [
              "Mouse Fc Block (anti-mouse CD16/32, clone 2.4G2, BioLegend Cat. No. 101320)",
              "Block for 10 min before staining"
            ],
            [
              "Fluorochrome-conjugated anti-TROP2; isotype control antibody; unstained control (PBS)",
              "Staining / gating"
            ],
            [
              "Basal medium (RPMI-1640 + 10% FBS + antibiotics), PBS; compensation beads",
              "As required"
            ]
          ]
        },
        {
          "type": "heading",
          "level": 4,
          "title": "Equipment"
        },
        {
          "type": "prose",
          "paragraphs": [
            "Flow cytometer, CO₂ incubator, biosafety cabinet, centrifuge, light-protected flow tubes."
          ]
        },
        {
          "type": "heading",
          "level": 4,
          "title": "Experimental Design (controls and replicates)"
        },
        {
          "type": "prose",
          "paragraphs": [
            "**Controls**: wild-type 4T1 (WT) as the negative control, an isotype control tube to set the positive threshold and an unstained control tube to correct autofluorescence, together with the TROP2-overexpressing group, four tubes in total.",
            "**Replicates**: ≥2×10⁴ events are acquired per tube."
          ]
        },
        {
          "type": "heading",
          "level": 4,
          "title": "Step-by-Step Instructions"
        },
        {
          "type": "prose",
          "paragraphs": [
            "**Grouping & Staining** [18][34]"
          ]
        },
        {
          "type": "protocol-steps",
          "steps": [
            {
              "number": "1",
              "blocks": [
                {
                  "type": "prose",
                  "paragraphs": [
                    "Harvest the cells of each group, adjust to 1×10⁶/mL, leave about 100 µL and divide into WT / isotype / unstained / OE groups."
                  ]
                }
              ]
            },
            {
              "number": "2",
              "blocks": [
                {
                  "type": "prose",
                  "paragraphs": [
                    "Before staining, add mouse Fc Block (anti-mouse CD16/32, clone 2.4G2) to each tube and block for 10 min to prevent non-specific adsorption of fluorescent antibody by 4T1 cells."
                  ]
                }
              ]
            },
            {
              "number": "3",
              "blocks": [
                {
                  "type": "prose",
                  "paragraphs": [
                    "Add the TROP2 antibody to each group (an equal amount of isotype control to the isotype group, PBS to the unstained group) and incubate at 4 ℃ in the dark for 15–20 min (flicking every 5 min)."
                  ]
                }
              ]
            }
          ]
        },
        {
          "type": "prose",
          "paragraphs": [
            "**Washing**"
          ]
        },
        {
          "type": "protocol-steps",
          "steps": [
            {
              "number": "1",
              "blocks": [
                {
                  "type": "prose",
                  "paragraphs": [
                    "Wash twice with 2 mL pre-chilled PBS to remove free antibody."
                  ]
                }
              ]
            }
          ]
        },
        {
          "type": "prose",
          "paragraphs": [
            "**Acquisition & Analysis**"
          ]
        },
        {
          "type": "protocol-steps",
          "steps": [
            {
              "number": "1",
              "blocks": [
                {
                  "type": "prose",
                  "paragraphs": [
                    "Calibrate with compensation beads, gate on the live cell population and set the positive threshold on the isotype control."
                  ]
                }
              ]
            },
            {
              "number": "2",
              "blocks": [
                {
                  "type": "prose",
                  "paragraphs": [
                    "Acquire ≥2×10⁴ events per tube and report the TROP2⁺ rate and mean fluorescence intensity."
                  ]
                }
              ]
            }
          ]
        },
        {
          "type": "heading",
          "level": 4,
          "title": "Notes"
        },
        {
          "type": "list",
          "ordered": true,
          "start": 1,
          "items": [
            "Overexpressing lines may silence the transgene over long passage, so confirm before assay that the cells are in log phase and healthy.",
            "Non-permeabilised (surface) staining is recommended for membrane proteins; if the signal is weak, optimise the antibody clone and amount and use FMO controls for accurate gating."
          ]
        }
      ]
    },
    {
      "id": "sec-in-vivo",
      "index": "07",
      "kicker": "07 / In Vivo Efficacy",
      "navLabel": "In Vivo Efficacy",
      "title": "In vivo efficacy and immune mechanism",
      "summary": "",
      "blocks": [
        {
          "type": "prose",
          "paragraphs": [
            "The last step is to test the in vitro conclusions in a living animal. Using the TROP2-positive 4T1 cells constructed in the previous step, we established tumours in the right axillary subcutaneous fat pad of immunocompetent BALB/c mice and immunised from the day of inoculation on a D0, 7, 14, 21, 28 schedule by subcutaneous injection at the base of the tail (with D35 as the study endpoint), comparing tumour growth between the PBS, empty-vector and Combined vaccine groups. At the endpoint we examined CD8⁺ T cell infiltration and Granzyme B staining in the tumour by immunofluorescence and the systemic immune response by splenocyte flow cytometry and intracellular cytokine staining, moving from macroscopic efficacy down to local and systemic mechanism. Because the vaccine epitopes are human HLA-A*02:01–restricted while the model is a wild-type mouse, the conclusions of this section stand as a proof of concept for the multi-epitope circRNA platform. The in vivo design of this section was modelled with the NC3Rs Experimental Design Assistant (EDA) and an Experimental Design Report generated before the study began; sample size, randomisation, blinding, inclusion/exclusion criteria and statistical methods were all pre-specified before the experiment started."
          ]
        },
        {
          "type": "subheading",
          "id": "exp-7-1",
          "index": "7.1",
          "title": "7.1 Establishing the tumour-bearing model"
        },
        {
          "type": "heading",
          "level": 4,
          "title": "Background"
        },
        {
          "type": "prose",
          "paragraphs": [
            "In vitro conclusions need to be tested in a living animal. This step uses 4T1 stably overexpressing TROP2 to establish a syngeneic tumour in the right axillary subcutaneous fat pad of immunocompetent BALB/c mice. Syngeneic transplantation keeps the adaptive immune system intact and gives a defined target antigen, which is what a vaccine working through anti-tumour immunity has to be tested in. A standardised inoculation technique and proper randomisation are what make the between-group comparison trustworthy. [35]"
          ]
        },
        {
          "type": "heading",
          "level": 4,
          "title": "Materials & Reagents"
        },
        {
          "type": "table",
          "headers": [
            "Component",
            "Amount / Spec"
          ],
          "rows": [
            [
              "SPF female BALB/cAnNCrl mice",
              "6–8 weeks, 18–22 g; supplier Beijing Vital River; ethics approval JDYY20261369; animal use licence SYXK (Ji) 2023-0011"
            ],
            [
              "4T1 stably overexpressing TROP2",
              "Viability ≥95%, 1×10⁶/100 µL"
            ],
            [
              "0.25% trypsin-EDTA, RPMI-1640, FBS; sterile pyrogen-free PBS (pH 7.4); trypan blue",
              "Cell preparation"
            ],
            [
              "Isoflurane; 75% ethanol, povidone-iodine, 0.5% peracetic acid",
              "Anaesthesia / disinfection"
            ],
            [
              "1 mL syringe + 4-gauge needle; electric clipper",
              "Inoculation; a fresh needle for each animal"
            ]
          ]
        },
        {
          "type": "heading",
          "level": 4,
          "title": "Equipment"
        },
        {
          "type": "prose",
          "paragraphs": [
            "Vernier caliper (0.02 mm), CO₂ incubator, Class II biosafety cabinet, SPF barrier animal facility (7th floor, Institute of Translational Medicine)."
          ]
        },
        {
          "type": "heading",
          "level": 4,
          "title": "Experimental Design (controls and replicates)"
        },
        {
          "type": "list",
          "items": [
            "**Groups and sample size**: Randomly divided into 3 groups (PBS vehicle / empty vector / Combined vaccine), n = 5 per group, 15 experimental units in total, plus 3 reserve mice to replace animals lost at inoculation, giving 18 animals overall; the experimental unit is the individual mouse. [36][37]",
            "**Sample size justification**: The minimum biologically important effect is a ≥50% reduction in mean endpoint tumour volume (TGI ≥ 50%), which at the variability commonly reported for subcutaneous 4T1 models (CV ≈ 30%) corresponds to Cohen d ≈ 1.7. With n = 5, a two-sample t-test (α = 0.05, two-sided) has approximately 80% power to detect d ≈ 2.0 (about 60% TGI) and approximately 65% power at the minimum important effect itself. The resource equation gives E = N − k = 15 − 3 = 12, within the recommended range of 10–20. n = 5 is the smallest group size, within the approved animal allocation, that keeps the resource equation in range while retaining ~80% power for a large antitumour effect (3Rs, Reduction). A non-significant result at the 50% TGI level will be interpreted as inconclusive rather than as evidence of no effect.",
            "**Randomisation**: Complete randomisation using a randomisation table on the day of inoculation (Day 0), with individual ear-tag coding.",
            "**Inclusion criteria**: SPF female BALB/cAnNCrl mice, 6–8 weeks old, supplied at 18–22 g and verified against the supplier's certificate on arrival; healthy after a 7-day acclimatisation period (normal activity, feeding and drinking, glossy coat, body condition score 3/5, no clinical signs); technically successful tumour cell inoculation.",
            "**Pre-randomisation exclusion**: Body weight outside the 18–22 g supply specification on arrival; any sign of ill health during acclimatisation; visible leakage of the cell suspension, bleeding or misinjection at inoculation. Excluded animals are replaced from the reserve cohort of 3, so that all three groups start with n = 5.",
            "**Humane endpoints** (applied pre-emptively and independently of the scheduled endpoint): (i) maximum tumour diameter reaching 1.5 cm (approximately 1500 mm³, the UKCCCR/NCRI upper limit for therapeutic studies); (ii) tumour ulceration or necrosis, or a tumour interfering with locomotion, feeding or drinking; (iii) a body condition score of 1 (emaciated) on the 5-point murine scale (Ullman-Cullere & Foltz, 1999), or a score of 2 combined with any clinical sign; (iv) signs of severe distress such as persistent hunching, immobility, laboured respiration, or failure to eat or drink over 24–48 h. A body condition score of 2 alone does not itself trigger euthanasia but triggers escalation to twice-daily observation and reporting to the project supervisor and veterinary staff.",
            "**Handling of animals with no tumour**: Not excluded. Because dosing begins on the day of inoculation, the absence of a tumour may be a treatment effect rather than a technical failure, and excluding such animals would systematically remove the strongest responders and bias the analysis against the vaccine; these animals are analysed with an endpoint tumour volume of 0 mm³ and the number of tumour-free animals per group is reported separately.",
            "**Justification for a single sex**: Triple-negative breast cancer occurs overwhelmingly in women, and 4T1 derives from a spontaneously arising mammary carcinoma of female BALB/c origin, so this syngeneic model is conventionally established in female mice, reflecting the clinical target population. Restricting the study to one sex also removes sex as a source of variability and reduces animal use (3Rs, Reduction). Sex as a biological variable can be addressed in later confirmatory studies.",
            "**Other sources of variability** are controlled by standardisation rather than by blocking: a single supplier, a single batch, a single sex, a 2-week age window and a 4 g weight window; all animals inoculated on the same day by the same operator from the same cell preparation; housing in a single room under identical conditions. Cage is not used as a blocking factor because animals are housed by treatment group for husbandry reasons, so cage is confounded with treatment, this is stated openly as a limitation of the design."
          ]
        },
        {
          "type": "heading",
          "level": 4,
          "title": "Step-by-Step Instructions"
        },
        {
          "type": "prose",
          "paragraphs": [
            "**Acclimation & Grouping**"
          ]
        },
        {
          "type": "protocol-steps",
          "steps": [
            {
              "number": "1",
              "blocks": [
                {
                  "type": "prose",
                  "paragraphs": [
                    "Acclimatise the mice in the SPF facility for 7 days, excluding animals with abnormal weight on arrival or signs of ill health."
                  ]
                }
              ]
            },
            {
              "number": "2",
              "blocks": [
                {
                  "type": "prose",
                  "paragraphs": [
                    "On the day of inoculation, use a randomisation table to allocate the eligible mice completely at random to the PBS, empty-vector and Combined groups (5 animals each), with individual ear-tag coding."
                  ]
                }
              ]
            }
          ]
        },
        {
          "type": "prose",
          "paragraphs": [
            "**Cell Preparation**"
          ]
        },
        {
          "type": "protocol-steps",
          "steps": [
            {
              "number": "1",
              "blocks": [
                {
                  "type": "prose",
                  "paragraphs": [
                    "Take log-phase 4T1-TROP2 (viability ≥95%), remove serum and antibiotics thoroughly, resuspend in sterile PBS at 1×10⁶/100 µL and keep on ice."
                  ]
                }
              ]
            }
          ]
        },
        {
          "type": "prose",
          "paragraphs": [
            "**Inoculation into the Axillary Subcutaneous Fat Pad**"
          ]
        },
        {
          "type": "protocol-steps",
          "steps": [
            {
              "number": "1",
              "blocks": [
                {
                  "type": "prose",
                  "paragraphs": [
                    "Shave an area of about 2 cm diameter over the right axilla and disinfect in a circular motion with 75% ethanol. Under light isoflurane anaesthesia, locate the axillary fossa with the forelimb gently abducted; the subcutaneous fat pad lies immediately beneath the skin in the hollow of the axilla and is the target depot."
                  ]
                }
              ]
            },
            {
              "number": "2",
              "blocks": [
                {
                  "type": "prose",
                  "paragraphs": [
                    "Lift a 5–7 mm skin fold over the axilla, insert the needle 5–6 mm at an angle of 15° to the skin so that the bevel comes to rest within the axillary subcutaneous fat pad, and inject 100 µL of cell suspension slowly (over about 5 s). Confirm placement by the appearance of a small, well-defined bleb confined to the fat pad."
                  ]
                }
              ]
            },
            {
              "number": "3",
              "blocks": [
                {
                  "type": "prose",
                  "paragraphs": [
                    "After withdrawing the needle, press the puncture site with a dry cotton ball for 10 s and disinfect with povidone-iodine; use a fresh needle for each mouse, and exclude any animal with visible leakage, replacing it from the reserve cohort."
                  ]
                }
              ]
            }
          ]
        },
        {
          "type": "prose",
          "paragraphs": [
            "**Monitoring** [38][39]"
          ]
        },
        {
          "type": "protocol-steps",
          "steps": [
            {
              "number": "1",
              "blocks": [
                {
                  "type": "prose",
                  "paragraphs": [
                    "Observe daily and record welfare indicators including activity, feeding and drinking, coat condition, body condition score and tumour ulceration; tumours are typically visible 5–7 days after inoculation."
                  ]
                }
              ]
            },
            {
              "number": "2",
              "blocks": [
                {
                  "type": "prose",
                  "paragraphs": [
                    "Give the first immunisation on the day of inoculation (D0), following the schedule in 7.2; do not wait for the tumour to reach a predefined volume."
                  ]
                }
              ]
            }
          ]
        },
        {
          "type": "heading",
          "level": 4,
          "title": "Notes"
        },
        {
          "type": "list",
          "ordered": true,
          "start": 1,
          "items": [
            "4T1 is highly metastatic and forms tumours rapidly, so humane endpoints (tumour volume/ulceration limits) must be enforced strictly with daily inspection.",
            "Do not advance the needle beyond the fat pad, the thoracic wall and the axillary vessels lie immediately deeper, and a misplaced bolus changes the growth kinetics of the tumour. Where dosing starts on D0 rather than at a predefined tumour volume, record tumour-free animals and analyse them at 0 mm³ rather than excluding them.",
            "Match the host MHC to the restriction element of the epitopes. Human HLA-A*02:01–restricted epitopes are unlikely to be presented in wild-type BALB/c (H-2d), so antigen-specific validation requires an HLA-A*02:01 transgenic (e.g. HHD) or humanised host, see Outlook O1."
          ]
        },
        {
          "type": "subheading",
          "id": "exp-7-2",
          "index": "7.2",
          "title": "7.2 In vivo antitumour effect"
        },
        {
          "type": "heading",
          "level": 4,
          "title": "Background"
        },
        {
          "type": "prose",
          "paragraphs": [
            "This is the core experiment for evaluating the efficacy of the vaccine. From the day of tumour inoculation (D0 being the day of implantation), circRNA-LNP vaccine is injected subcutaneously at the base of the tail of the tumour-bearing mice according to the pre-set immunisation schedule (D0/7/14/21/28, once a week, five doses in total). Tumour growth curves and endpoint tumour size are used to compare the PBS, empty-vector and Combined groups, quantifying the in vivo antitumour activity of the vaccine directly; the empty-vector control serves to subtract the non-specific innate immune effect of the circRNA backbone and adjuvant themselves."
          ]
        },
        {
          "type": "heading",
          "level": 4,
          "title": "Materials & Reagents"
        },
        {
          "type": "table",
          "headers": [
            "Component",
            "Amount / Spec"
          ],
          "rows": [
            [
              "4T1/TROP2 tumour-bearing mice (from 7.1)",
              "3 groups × n = 5"
            ],
            [
              "PBS, empty-vector circRNA-LNP, Combined circRNA-LNP vaccine",
              "LNP-encapsulated, 10 µg per dose, 0.1 mL subcutaneously, 5 doses in total"
            ],
            [
              "Vernier caliper (0.02 mm), electronic balance",
              "Measurement"
            ],
            [
              "Surgical scissors / non-toothed forceps, saline, 75% ethanol",
              "Tumour excision"
            ]
          ]
        },
        {
          "type": "heading",
          "level": 4,
          "title": "Equipment"
        },
        {
          "type": "prose",
          "paragraphs": [
            "Mouse restrainer, vernier caliper, electronic balance, surgical instruments."
          ]
        },
        {
          "type": "heading",
          "level": 4,
          "title": "Experimental Design (controls and replicates)"
        },
        {
          "type": "list",
          "items": [
            "**Controls**: a PBS vehicle control group and an empty-vector circRNA-LNP control group. The empty-vector group serves to subtract any non-specific innate immune background contributed by the circRNA backbone/adjuvant, so that the vaccine-versus-vector contrast isolates the contribution of the epitope-encoding sequence. All three pairwise comparisons are pre-specified, Combined versus empty vector, Combined versus PBS, and empty vector versus PBS, because each answers a different question and none is treated as subordinate to the others. [36][37]",
            "**Replicates**: n = 5 per group (the experimental unit is the individual mouse), with complete randomisation on Day 0.",
            "**Primary outcome**: endpoint tumour volume (mm³, continuous). Growth curves are presented descriptively only; confirmatory inference is based on the endpoint volume alone.",
            "**Blinding**: the person administering treatment is aware of the group allocation (the three preparations look different and the administering operator cannot be blinded). To reduce bias, tumour measurement (the primary outcome) is performed blind by a single independent operator, animals are individually coded, and the measurement order is randomised at each time point from a random-number table so that operator drift cannot become confounded with treatment group; ex vivo samples (immunofluorescence and splenic flow cytometry) from all three groups are processed in one batch in a randomised order, with identical antibody panels, instrument settings and gating templates; groups are coded from acquisition through to data analysis, so that immunofluorescence field selection and image review are both performed without knowledge of allocation.",
            "**Statistical methods**: the primary analysis uses a one-way independent ANOVA with treatment as a 3-level factor; normality is assessed by the Shapiro-Wilk test and Q-Q plots and homogeneity of variance by the Levene test and residual-versus-fitted plots. If these are violated, endpoint volume is log-transformed and the ANOVA repeated; if assumptions remain violated after transformation, a Kruskal-Wallis test with Dunn post hoc is used. Following the omnibus test, all three pairwise comparisons are made, all of them pre-specified, Combined vaccine versus empty vector, Combined vaccine versus PBS, and empty vector versus PBS, with multiplicity controlled by the Holm procedure across the full set of three. Each addresses a distinct question: the first isolates the epitope-encoded contribution, the second gives the total effect of the administered product against vehicle, and the third quantifies how much of that total the backbone and adjuvant supply on their own."
          ]
        },
        {
          "type": "heading",
          "level": 4,
          "title": "Step-by-Step Instructions"
        },
        {
          "type": "prose",
          "paragraphs": [
            "**Immunization**"
          ]
        },
        {
          "type": "protocol-steps",
          "steps": [
            {
              "number": "1",
              "blocks": [
                {
                  "type": "prose",
                  "paragraphs": [
                    "The first dose is given on the day of tumour inoculation (D0), followed by the schedule D0, 7, 14, 21, 28 (once a week, five doses in total), injecting the corresponding preparation subcutaneously at the base of the tail of each group at 10 µg circRNA-LNP (100 µL) per dose, with identical injection volume and technique across all groups."
                  ]
                }
              ]
            },
            {
              "number": "2",
              "blocks": [
                {
                  "type": "prose",
                  "paragraphs": [
                    "Inject at the base of the tail, keeping the site well away from the tumour in the right axillary fat pad."
                  ]
                }
              ]
            }
          ]
        },
        {
          "type": "prose",
          "paragraphs": [
            "**Measurement** [35][40]"
          ]
        },
        {
          "type": "protocol-steps",
          "steps": [
            {
              "number": "1",
              "blocks": [
                {
                  "type": "prose",
                  "paragraphs": [
                    "During the immunisation period, the same independent operator measures the long and short tumour diameters blind, in a randomised order, with a vernier caliper, and calculates the volume as follows before plotting the growth curve:",
                    "V = 0.5 × L × W²",
                    "where L is the long diameter and W the short diameter (mm); volume is expressed in mm³."
                  ]
                }
              ]
            }
          ]
        },
        {
          "type": "protocol-steps",
          "steps": [
            {
              "number": "1",
              "blocks": [
                {
                  "type": "prose",
                  "paragraphs": [
                    "Record welfare observations such as activity and feeding status at the same time (body weight is not recorded as an outcome measure)."
                  ]
                }
              ]
            }
          ]
        },
        {
          "type": "prose",
          "paragraphs": [
            "**Endpoint Excision**"
          ]
        },
        {
          "type": "protocol-steps",
          "steps": [
            {
              "number": "1",
              "blocks": [
                {
                  "type": "prose",
                  "paragraphs": [
                    "At the study endpoint (D35), euthanise the mouse, make a small incision at the base of the tumour and dissect the tumour out intact by blunt dissection with non-toothed forceps and ophthalmic scissors."
                  ]
                }
              ]
            },
            {
              "number": "2",
              "blocks": [
                {
                  "type": "prose",
                  "paragraphs": [
                    "Rinse the wound with saline, wash the excised tumour in pre-chilled PBS and blot dry on filter paper."
                  ]
                }
              ]
            },
            {
              "number": "3",
              "blocks": [
                {
                  "type": "prose",
                  "paragraphs": [
                    "Measure the same tumour three times consecutively, blind, and take the mean to calculate the volume."
                  ]
                }
              ]
            },
            {
              "number": "4",
              "blocks": [
                {
                  "type": "prose",
                  "paragraphs": [
                    "Sample collection: the tumour is fixed and paraffin-embedded for the immunofluorescence in 7.3; the spleen is processed fresh into a single-cell suspension for the flow cytometry in 7.4–7.5."
                  ]
                }
              ]
            }
          ]
        },
        {
          "type": "heading",
          "level": 4,
          "title": "Notes"
        },
        {
          "type": "list",
          "ordered": true,
          "start": 1,
          "items": [
            "Caliper readings must be taken by the same operator throughout, blind to group allocation, with the animal gently restrained so that the tumour is not compressed; measure the long and short axes at the widest point and take the mean of repeated readings.",
            "Keep the injection site (tail base) well away from the tumour site, so that local injection-site reaction cannot interfere with tumour measurement or with interpretation of the intratumoural microenvironment.",
            "Bring circRNA-LNP to room temperature and mix by gentle inversion, never vortex, and aliquot per dosing day: freeze–thaw cycles change particle size and encapsulation, so the dose actually delivered stops matching the dose recorded.",
            "Fix the statistical path before the data are seen, and record which branch was taken. Choosing between a parametric and a non-parametric analysis after inspecting the results invalidates the p-values."
          ]
        },
        {
          "type": "subheading",
          "id": "exp-7-3",
          "index": "7.3",
          "title": "7.3 Intratumoural CD8 and Granzyme B"
        },
        {
          "type": "heading",
          "level": 4,
          "title": "Background"
        },
        {
          "type": "prose",
          "paragraphs": [
            "The growth curves say whether the tumour was restrained; they do not say by what. CD8⁺ T cells are the effector cells of anti-tumour immunity and Granzyme B is the molecule they kill with, so dual-label immunofluorescence of tumour sections shows whether both are present, and lets the local immune microenvironment of the three groups be compared side by side."
          ]
        },
        {
          "type": "heading",
          "level": 4,
          "title": "Materials & Reagents"
        },
        {
          "type": "table",
          "headers": [
            "Component",
            "Amount / Spec"
          ],
          "rows": [
            [
              "Paraffin sections of tumours from the three groups (PBS/empty vector/vaccine)",
              "n = 3 per group"
            ],
            [
              "Xylene, graded ethanol; citrate antigen retrieval solution; Triton X-100",
              "Dewaxing/retrieval/permeabilisation; retrieval solution 1×, pH 6.0"
            ],
            [
              "BSA blocking solution; CD8 and Granzyme B fluorescent primary antibodies; corresponding fluorescent secondary antibodies; DAPI",
              "Staining"
            ],
            [
              "Anti-fade mounting medium; PBS",
              "Mounting"
            ]
          ]
        },
        {
          "type": "heading",
          "level": 4,
          "title": "Equipment"
        },
        {
          "type": "prose",
          "paragraphs": [
            "Fluorescence microscope with image acquisition system, water bath, slide dryer, humidified chamber, slides and coverslips."
          ]
        },
        {
          "type": "heading",
          "level": 4,
          "title": "Experimental Design (controls and replicates)"
        },
        {
          "type": "prose",
          "paragraphs": [
            "**Controls**: the PBS and empty-vector groups serve as parallel controls for the vaccine group; a negative control section (no primary antibody, secondary antibody/isotype only) is included to subtract the strong autofluorescence of necrotic tumour tissue. All three groups of sections are processed, stained and imaged in one batch, in randomised order, under identical exposure, gain and display settings, so the panels can be compared with one another by eye.",
            "**Replicates**: n = 3 animals per group, one field acquired per animal. These 3 animals were selected at random from the 5 tumour-bearing mice of each group, and the same 3 animals provided both this immunofluorescence material and the splenic material for 7.4/7.5, so the two ex vivo assays come from one randomly chosen subsample, with no selection by tumour size. One field per animal is a sparser sample than a between-group comparison of stained area or cell number would need, so this experiment is reported descriptively: the images themselves are the readout.",
            "**Blinding**: the group labels were coded throughout, as the EDA design report specifies for this section. Field selection at the microscope was made without the operator knowing which group a section belonged to, and the images were reviewed with the labels still coded. The judgement that remains is the selection criterion itself: with one field per animal, the field taken was the one judged most representative of the section, and that is a judgement made by eye even when the group is unknown. Depositing all of the raw images is what lets a reader see the fields that were not printed."
          ]
        },
        {
          "type": "heading",
          "level": 4,
          "title": "Step-by-Step Instructions"
        },
        {
          "type": "prose",
          "paragraphs": [
            "**Dewaxing & Antigen Retrieval** [41][42]"
          ]
        },
        {
          "type": "protocol-steps",
          "steps": [
            {
              "number": "1",
              "blocks": [
                {
                  "type": "prose",
                  "paragraphs": [
                    "Dewax the paraffin sections through xylene and graded ethanol to water and wash in PBS."
                  ]
                }
              ]
            },
            {
              "number": "2",
              "blocks": [
                {
                  "type": "prose",
                  "paragraphs": [
                    "Immerse in 1× citrate retrieval solution (pH 6.0) and heat at 95–100 ℃ in a water bath or microwave for 15–20 min, cool naturally at room temperature for 30 min, then permeabilise with Triton at room temperature."
                  ]
                }
              ]
            }
          ]
        },
        {
          "type": "prose",
          "paragraphs": [
            "**Blocking & Primary Antibody**"
          ]
        },
        {
          "type": "protocol-steps",
          "steps": [
            {
              "number": "1",
              "blocks": [
                {
                  "type": "prose",
                  "paragraphs": [
                    "Block with BSA at room temperature, then apply the CD8 and Granzyme B primary antibodies and incubate overnight at 4 ℃ in a humidified chamber."
                  ]
                }
              ]
            }
          ]
        },
        {
          "type": "prose",
          "paragraphs": [
            "**Secondary Antibody & DAPI**"
          ]
        },
        {
          "type": "protocol-steps",
          "steps": [
            {
              "number": "1",
              "blocks": [
                {
                  "type": "prose",
                  "paragraphs": [
                    "Wash thoroughly with PBS, apply the corresponding fluorescent secondary antibodies at room temperature in the dark, then counterstain the nuclei with DAPI."
                  ]
                }
              ]
            }
          ]
        },
        {
          "type": "prose",
          "paragraphs": [
            "**Imaging & Analysis**"
          ]
        },
        {
          "type": "protocol-steps",
          "steps": [
            {
              "number": "1",
              "blocks": [
                {
                  "type": "prose",
                  "paragraphs": [
                    "Mount with anti-fade mounting medium and acquire images of all groups on the fluorescence microscope under identical exposure, gain and magnification, with uniform field-selection criteria. Record the spatial calibration at this point, so that the figure can carry a scale bar. For this study the image files carry an embedded scale-bar annotation 100 pixels long, confirmed by the imaging facility to represent 100 µm, giving 1 pixel = 1.00 µm; all nine fields were acquired at the same magnification, and each covers 1368 × 1020 µm. Panels are displayed at an identical linear gain with no group-specific brightness or contrast adjustment."
                  ]
                }
              ]
            },
            {
              "number": "2",
              "blocks": [
                {
                  "type": "prose",
                  "paragraphs": [
                    "Review the nine fields with the group labels coded, and select one field per group for the figure. Deposit all 18 raw images (3 groups × 3 animals × 2 channels) alongside the page, so that the fields printed in the figure can be read against the full set."
                  ]
                }
              ]
            }
          ]
        },
        {
          "type": "heading",
          "level": 4,
          "title": "Notes"
        },
        {
          "type": "list",
          "ordered": true,
          "start": 1,
          "items": [
            "Over-retrieval destroys tissue morphology while insufficient retrieval gives a weak signal; the secondary antibody and DAPI steps must be kept dark throughout to prevent quenching.",
            "Process, stain and image all three groups in one batch, in randomised order, under identical exposure, gain and display settings, and keep the group labels coded both at the microscope and when the images are reviewed.",
            "Limitations of image format and controls: the images are JPEGs (4:2:0 chroma subsampling); all three groups share the same format and compression quality, so the comparison between panels is unaffected. In addition, although a negative control section was included, no single-stain or isotype control was imaged, so it cannot be determined whether the Granzyme B channel signal contains a stromal autofluorescence component."
          ]
        },
        {
          "type": "subheading",
          "id": "exp-7-4",
          "index": "7.4",
          "title": "7.4 Splenocyte flow cytometry"
        },
        {
          "type": "heading",
          "level": 4,
          "title": "Background"
        },
        {
          "type": "prose",
          "paragraphs": [
            "Immunofluorescence of the tumour reflects only the intratumoural microenvironment and cannot show whether the vaccine has activated anti-tumour immunity systemically. The spleen is the most important secondary lymphoid organ, and its immune cell composition directly reflects the systemic immune response. At the study endpoint (D35), spleens are taken and made into single-cell suspensions, and multicolour flow cytometry is used to assess the complete chain from antigen presentation through T cell activation and memory formation to effector molecule production: dendritic cell maturation (CD80/CD86), early CD8⁺ T cell activation (CD69), memory phenotype (CD44/CD62L) and intracellular effector molecules (IFN-γ, Granzyme B). It assesses the immune activation capacity of the vaccine at the systemic level, and provides a systemic counterpart to the qualitative tumour immunofluorescence of 7.3. [23]"
          ]
        },
        {
          "type": "heading",
          "level": 4,
          "title": "Materials & Reagents"
        },
        {
          "type": "table",
          "headers": [
            "Component",
            "Amount / Spec"
          ],
          "rows": [
            [
              "Spleens from each group (PBS / circRNA-vector / circRNA-antigens), collected at the D35 endpoint",
              "3 groups × n = 3"
            ],
            [
              "Red blood cell lysis buffer (ACK / RBC Lysis Buffer); 70 µm cell strainer; syringe plunger",
              "Single-cell preparation"
            ],
            [
              "Flow staining buffer (DPBS + 1% FBS + 0.09% NaN₃, pH 7.4–7.6); pre-chilled PBS",
              "Staining / washing"
            ],
            [
              "Mouse Fc receptor block anti-mouse CD16/32 (clone 2.4G2)",
              "1 µg/10⁶ cells"
            ],
            [
              "Fixable Viability Dye",
              "Per manufacturer; stain in protein-free PBS"
            ],
            [
              "**Panel ① DC maturation**: CD11c + CD80 + CD86",
              "Surface staining"
            ],
            [
              "**Panel ② T cell activation**: CD3 + CD8 + CD69",
              "Surface staining"
            ],
            [
              "**Panel ③ T cell memory**: CD3 + CD8 + CD44 + CD62L",
              "Surface staining"
            ],
            [
              "**Panel ④ Intracellular effector molecules**: CD3 + CD8 + IFN-γ + Granzyme B",
              "Surface + intracellular (see 7.5)"
            ],
            [
              "Isotype controls, FMO controls, single-stain compensation beads",
              "Gating / compensation"
            ]
          ]
        },
        {
          "type": "heading",
          "level": 4,
          "title": "Equipment"
        },
        {
          "type": "prose",
          "paragraphs": [
            "Multicolour flow cytometer, CO₂ incubator, refrigerated centrifuge, biosafety cabinet, 70 µm strainers and grinder, 5 mL light-protected flow tubes."
          ]
        },
        {
          "type": "heading",
          "level": 4,
          "title": "Experimental Design (controls and replicates)"
        },
        {
          "type": "prose",
          "paragraphs": [
            "**Controls**: the PBS and empty-vector groups serve as parallel controls for the vaccine group; each panel also has isotype, unstained, FMO and single-stain compensation controls, with a fixable viability dye to exclude dead cells. Surface panels and intracellular panels are run in separate tubes, because fixation and permeabilisation affect some surface epitopes. Samples from all three groups are processed in one batch in randomised order with identical antibody panels, instrument settings and gating templates, and the groups are coded during analysis.",
            "**Replicates**: n = 3 animals per group, 3 of the 5 tumour-bearing mice in each group selected at random, the same animals that provided the tumour immunofluorescence material in 7.3. ≥2×10⁴ events are acquired per tube."
          ]
        },
        {
          "type": "heading",
          "level": 4,
          "title": "Step-by-Step Instructions"
        },
        {
          "type": "prose",
          "paragraphs": [
            "**Splenocyte Preparation**"
          ]
        },
        {
          "type": "protocol-steps",
          "steps": [
            {
              "number": "1",
              "blocks": [
                {
                  "type": "prose",
                  "paragraphs": [
                    "At the study endpoint (D35), euthanise the mouse, remove the spleen aseptically into pre-chilled flow staining buffer and trim away surrounding connective tissue."
                  ]
                }
              ]
            },
            {
              "number": "2",
              "blocks": [
                {
                  "type": "prose",
                  "paragraphs": [
                    "Grind the spleen gently through a 70 µm strainer with a syringe plunger and rinse the strainer with buffer to collect the cell suspension."
                  ]
                }
              ]
            },
            {
              "number": "3",
              "blocks": [
                {
                  "type": "prose",
                  "paragraphs": [
                    "Add red blood cell lysis buffer and lyse at room temperature for 3–5 min to remove erythrocytes, then stop immediately with PBS and wash once."
                  ]
                }
              ]
            },
            {
              "number": "4",
              "blocks": [
                {
                  "type": "prose",
                  "paragraphs": [
                    "Resuspend in flow staining buffer, count with trypan blue, adjust to 1×10⁷/mL and keep on ice."
                  ]
                }
              ]
            }
          ]
        },
        {
          "type": "prose",
          "paragraphs": [
            "**Fc Blocking** [34]"
          ]
        },
        {
          "type": "protocol-steps",
          "steps": [
            {
              "number": "1",
              "blocks": [
                {
                  "type": "prose",
                  "paragraphs": [
                    "Take 1×10⁶ splenocytes per tube, add 1 µg anti-mouse CD16/32 (2.4G2) in 100 µL staining buffer and incubate at 4 ℃ in the dark for 10–15 min to block Fc receptor–mediated non-specific binding."
                  ]
                }
              ]
            }
          ]
        },
        {
          "type": "prose",
          "paragraphs": [
            "**Viability & Surface Staining** [18]"
          ]
        },
        {
          "type": "protocol-steps",
          "steps": [
            {
              "number": "1",
              "blocks": [
                {
                  "type": "prose",
                  "paragraphs": [
                    "Resuspend the cells in protein-free PBS, add the fixable viability dye as its manufacturer specifies, incubate at 2–8 ℃ in the dark for 30 min, and wash once back into staining buffer."
                  ]
                }
              ]
            },
            {
              "number": "2",
              "blocks": [
                {
                  "type": "prose",
                  "paragraphs": [
                    "Add the corresponding surface antibodies to separate tubes according to panel, in 50–100 µL staining buffer, and incubate at 4 ℃ in the dark for 20–30 min:"
                  ]
                },
                {
                  "type": "list",
                  "items": [
                    "Panel ① (DC maturation): CD11c, CD80, CD86",
                    "Panel ② (activation): CD3, CD8, CD69",
                    "Panel ③ (memory): CD3, CD8, CD44, CD62L",
                    "Panel ④ (surface staining before intracellular staining): CD3, CD8 (then proceed to the intracellular staining in 7.5)"
                  ]
                }
              ]
            },
            {
              "number": "3",
              "blocks": [
                {
                  "type": "prose",
                  "paragraphs": [
                    "Add 1–2 mL staining buffer and wash twice by centrifugation at 250 × g for 5 min."
                  ]
                }
              ]
            }
          ]
        },
        {
          "type": "prose",
          "paragraphs": [
            "**Intracellular Staining**"
          ]
        },
        {
          "type": "protocol-steps",
          "steps": [
            {
              "number": "1",
              "blocks": [
                {
                  "type": "prose",
                  "paragraphs": [
                    "After surface staining, Panel ④ samples are fixed, permeabilised and stained for IFN-γ and Granzyme B according to the intracellular cytokine staining workflow in 7.5."
                  ]
                }
              ]
            }
          ]
        },
        {
          "type": "prose",
          "paragraphs": [
            "**Acquisition & Analysis**"
          ]
        },
        {
          "type": "protocol-steps",
          "steps": [
            {
              "number": "1",
              "blocks": [
                {
                  "type": "prose",
                  "paragraphs": [
                    "Calibrate the compensation matrix with single-stain compensation beads, set FSC/SSC thresholds to exclude debris, and acquire ≥2×10⁴ events per tube."
                  ]
                }
              ]
            },
            {
              "number": "2",
              "blocks": [
                {
                  "type": "prose",
                  "paragraphs": [
                    "Gate in sequence and report the proportions for each group:"
                  ]
                },
                {
                  "type": "list",
                  "items": [
                    "CD80⁺CD86⁺ (within the CD11c⁺ DC gate), DC maturation;",
                    "CD69⁺CD8⁺, early CD8⁺ T cell activation;",
                    "CD44⁺CD62L⁺ (within the CD8⁺ gate), central memory phenotype;",
                    "IFN-γ⁺CD8⁺ and GzmB⁺CD8⁺, effector molecule expression."
                  ]
                }
              ]
            }
          ]
        },
        {
          "type": "protocol-steps",
          "steps": [
            {
              "number": "1",
              "blocks": [
                {
                  "type": "prose",
                  "paragraphs": [
                    "Perform between-group statistics in GraphPad Prism (one-way ANOVA with post hoc testing), with groups coded during analysis."
                  ]
                }
              ]
            }
          ]
        },
        {
          "type": "heading",
          "level": 4,
          "title": "Notes"
        },
        {
          "type": "list",
          "ordered": true,
          "start": 1,
          "items": [
            "The interval from spleen collection to staining should be as short as possible and everything kept cold; red blood cell lysis should not be prolonged (> 5 min damages lymphocytes and raises the dead cell fraction).",
            "CD62L is sensitive to temperature and enzymatic digestion and sheds readily, so pre-chilled buffers must be used throughout and prolonged periods at room temperature avoided, otherwise the central memory subset will be underestimated.",
            "Set up compensation with single-stain controls and include an FMO control for each marker whose gate is not clearly bimodal, since a gate drawn on a continuous distribution is otherwise arbitrary."
          ]
        },
        {
          "type": "subheading",
          "id": "exp-7-5",
          "index": "7.5",
          "title": "7.5 Intracellular cytokine staining"
        },
        {
          "type": "heading",
          "level": 4,
          "title": "Background"
        },
        {
          "type": "prose",
          "paragraphs": [
            "IFN-γ and Granzyme B are the molecules CD8⁺ T cells kill with, and both sit inside the cell where ordinary surface staining cannot reach them. Intracellular cytokine staining (ICS) restimulates the cells in the presence of a protein transport inhibitor so that newly made cytokine is retained rather than secreted, then fixes them in formaldehyde, permeabilises the membrane with saponin so that antibody can reach the inside of the cell, and stains the retained cytokine, which quantifies effector molecule expression one cell at a time. This project uses the BD Cytofix/Cytoperm™ Plus Fixation/Permeabilization Kit with BD GolgiPlug™ (Cat. No. 555028), in which the active ingredient of GolgiPlug is brefeldin A, which blocks Golgi transport so that newly synthesised cytokines accumulate intracellularly and markedly improve the detection signal. [43]"
          ]
        },
        {
          "type": "heading",
          "level": 4,
          "title": "Materials & Reagents"
        },
        {
          "type": "table",
          "headers": [
            "Component",
            "Amount / Spec"
          ],
          "rows": [
            [
              "BD Cytofix/Cytoperm™ Plus Kit (with GolgiPlug)",
              "BD Cat. No. 555028"
            ],
            [
              "Fixation/Permeabilization Solution (contains 4.2% formaldehyde)",
              "250 µL per tube (flow tube)"
            ],
            [
              "BD Perm/Wash™ Buffer (10× concentrate, contains FBS and saponin)",
              "Dilute 1:10 in distilled water before use"
            ],
            [
              "BD GolgiPlug™ (Brefeldin A)",
              "1 µL / 1 mL of cell culture"
            ],
            [
              "Restimulation reagents: PMA + ionomycin",
              "PMA 50 ng/mL; ionomycin 1 µg/mL"
            ],
            [
              "Staining buffer (DPBS + 1% heat-inactivated FCS + 0.09% NaN₃, pH 7.4–7.6, 0.2 µm filtered)",
              "Surface staining / washing"
            ],
            [
              "anti-mouse CD16/32 (2.4G2) Fc block",
              "1 µg/10⁶ cells"
            ],
            [
              "Surface antibodies: CD3, CD8; intracellular antibodies: anti-IFN-γ, anti-Granzyme B",
              "Titrated amounts"
            ],
            [
              "Isotype control antibodies (at the same concentration as the intracellular antibodies)",
              "Negative control"
            ]
          ]
        },
        {
          "type": "heading",
          "level": 4,
          "title": "Equipment"
        },
        {
          "type": "prose",
          "paragraphs": [
            "CO₂ incubator, multicolour flow cytometer, refrigerated centrifuge, vortex mixer, light-protected flow tubes."
          ]
        },
        {
          "type": "heading",
          "level": 4,
          "title": "Experimental Design (controls and replicates)"
        },
        {
          "type": "prose",
          "paragraphs": [
            "**Controls**: each sample has a stimulated and an unstimulated group; the negative control is an isotype control (stained in Perm/Wash buffer at the same concentration as the intracellular antibody) combined with unstained cells; the positive control is splenocytes fully stimulated with PMA/ionomycin. Granzyme B is constitutively stored in intracellular granules and can be stained without restimulation; IFN-γ must be detected after restimulation."
          ]
        },
        {
          "type": "heading",
          "level": 4,
          "title": "Step-by-Step Instructions"
        },
        {
          "type": "prose",
          "paragraphs": [
            "**Stimulation & Transport Block**"
          ]
        },
        {
          "type": "protocol-steps",
          "steps": [
            {
              "number": "1",
              "blocks": [
                {
                  "type": "prose",
                  "paragraphs": [
                    "Take the splenocyte suspension (about 1–2×10⁶/mL) into culture and add PMA (final concentration 50 ng/mL) and ionomycin (final concentration 1 µg/mL) for restimulation."
                  ]
                }
              ]
            },
            {
              "number": "2",
              "blocks": [
                {
                  "type": "prose",
                  "paragraphs": [
                    "At the same time, add the protein transport inhibitor at 1 µL BD GolgiPlug per 1 mL of culture and mix thoroughly to block cytokine secretion so that cytokines accumulate intracellularly."
                  ]
                }
              ]
            },
            {
              "number": "3",
              "blocks": [
                {
                  "type": "prose",
                  "paragraphs": [
                    "Incubate at 37 ℃, 5% CO₂ for 4–6 h (total GolgiPlug time in culture should not exceed 12 h)."
                  ]
                }
              ]
            }
          ]
        },
        {
          "type": "prose",
          "paragraphs": [
            "**Harvest & Fc Block**"
          ]
        },
        {
          "type": "protocol-steps",
          "steps": [
            {
              "number": "1",
              "blocks": [
                {
                  "type": "prose",
                  "paragraphs": [
                    "Centrifuge to collect the cells, discard the GolgiPlug-containing medium, resuspend in staining buffer and count."
                  ]
                }
              ]
            },
            {
              "number": "2",
              "blocks": [
                {
                  "type": "prose",
                  "paragraphs": [
                    "Take about 1×10⁶ cells per tube, add 1 µg anti-mouse CD16/32 in 100 µL staining buffer and block at 4 ℃ in the dark for 10–15 min."
                  ]
                }
              ]
            }
          ]
        },
        {
          "type": "prose",
          "paragraphs": [
            "**Surface Staining**"
          ]
        },
        {
          "type": "protocol-steps",
          "steps": [
            {
              "number": "1",
              "blocks": [
                {
                  "type": "prose",
                  "paragraphs": [
                    "Add the surface antibodies (CD3, CD8) in 50 µL staining buffer and incubate at 4 ℃ in the dark for 30 min."
                  ]
                }
              ]
            },
            {
              "number": "2",
              "blocks": [
                {
                  "type": "prose",
                  "paragraphs": [
                    "Wash twice with staining buffer (1 mL each), centrifuging at 250 × g and discarding the supernatant."
                  ]
                }
              ]
            }
          ]
        },
        {
          "type": "prose",
          "paragraphs": [
            "**Fixation & Permeabilization** [43]"
          ]
        },
        {
          "type": "protocol-steps",
          "steps": [
            {
              "number": "1",
              "blocks": [
                {
                  "type": "prose",
                  "paragraphs": [
                    "Resuspend the cell pellet fully (a gentle vortex first prevents clumping) and add 250 µL Fixation/Permeabilization Solution per tube, incubating at 4 ℃ in the dark for 20 min."
                  ]
                }
              ]
            },
            {
              "number": "2",
              "blocks": [
                {
                  "type": "prose",
                  "paragraphs": [
                    "Wash twice with 1× BD Perm/Wash™ Buffer (1 mL each), centrifuging and discarding the supernatant. From this point on, all washes and antibody dilutions must use Perm/Wash Buffer in order to maintain the permeabilised state of the cells."
                  ]
                }
              ]
            }
          ]
        },
        {
          "type": "prose",
          "paragraphs": [
            "**Intracellular Staining**"
          ]
        },
        {
          "type": "protocol-steps",
          "steps": [
            {
              "number": "1",
              "blocks": [
                {
                  "type": "prose",
                  "paragraphs": [
                    "Resuspend the fixed and permeabilised cells in 50 µL Perm/Wash Buffer containing anti-IFN-γ and anti-Granzyme B antibodies at titration-optimised concentrations (with a separate isotype control tube)."
                  ]
                }
              ]
            },
            {
              "number": "2",
              "blocks": [
                {
                  "type": "prose",
                  "paragraphs": [
                    "Incubate at 4 ℃ in the dark for 30 min."
                  ]
                }
              ]
            },
            {
              "number": "3",
              "blocks": [
                {
                  "type": "prose",
                  "paragraphs": [
                    "Wash twice with 1× Perm/Wash Buffer (1 mL each) and finally resuspend in staining buffer for acquisition."
                  ]
                }
              ]
            }
          ]
        },
        {
          "type": "prose",
          "paragraphs": [
            "**Acquisition & Analysis**"
          ]
        },
        {
          "type": "protocol-steps",
          "steps": [
            {
              "number": "1",
              "blocks": [
                {
                  "type": "prose",
                  "paragraphs": [
                    "Set the PMT voltages and compensation using the surface staining controls, and determine positive thresholds and quadrants with isotype control/unstained cells."
                  ]
                }
              ]
            },
            {
              "number": "2",
              "blocks": [
                {
                  "type": "prose",
                  "paragraphs": [
                    "Within the CD3⁺CD8⁺ gate, report the proportions of IFN-γ⁺ and Granzyme B⁺ cells and compare the PBS, empty-vector and vaccine groups."
                  ]
                }
              ]
            }
          ]
        },
        {
          "type": "heading",
          "level": 4,
          "title": "Notes"
        },
        {
          "type": "list",
          "ordered": true,
          "start": 1,
          "items": [
            "The fixation/permeabilisation solution contains 4.2% formaldehyde, a suspected carcinogen/mutagen: work under ventilation, wear gloves and eye protection, and collect waste as hazardous chemical waste (see the Warnings section of the kit).",
            "Permeabilised cells clump very easily, so a gentle vortex to disperse them before adding the fixation/permeabilisation solution is recommended; ordinary staining buffer must not be substituted for Perm/Wash when washing or diluting antibodies, otherwise the saponin is washed out, the cell membrane reseals, and intracellular antibody cannot enter, giving a false negative.",
            "The literature indicates that PMA/ionomycin stimulation causes a transient downregulation of surface CD4/CD8 on mouse T cells, so CD8 surface staining should be completed before stimulation or taken into account during gating."
          ]
        }
      ]
    },
    {
      "id": "sec-outlook",
      "index": "08",
      "kicker": "08 / Translation & Gaps",
      "navLabel": "Future Outlook",
      "title": "Outlook",
      "summary": "",
      "blocks": [
        {
          "type": "subheading",
          "id": "exp-o1",
          "index": "O1.",
          "title": "Antigen specificity in a humanised model"
        },
        {
          "type": "prose",
          "paragraphs": [
            "The epitopes are HLA-A*02:01–restricted while the efficacy study used wild-type BALB/c mice, so the present in vivo result stands as platform proof of concept rather than as evidence of antigen-specific killing. The next step is to repeat the efficacy study in an HLA-A*02:01 transgenic model (HHD or equivalent), keeping the D0/7/14/21/28 schedule so the two datasets are directly comparable, and to add the readouts that report specificity directly: HLA-A*02:01 tetramer staining of peripheral blood and spleen, peptide-restimulated IFN-γ ELISpot, and killing of antigen-positive against antigen-negative targets. An irrelevant-epitope circRNA-LNP arm alongside the empty vector would separate the effect of the epitope sequence from the act of expressing a peptide. A human immune system–reconstituted model would be closer to the clinic but costs more and is bounded by the GvHD window; the transgenic route is the practical minimum."
          ]
        },
        {
          "type": "subheading",
          "id": "exp-o2",
          "index": "O2.",
          "title": "In vivo validation of the remaining antigens"
        },
        {
          "type": "prose",
          "paragraphs": [
            "The Combined vaccine carries 8 selected epitopes from four antigens, TROP2, B7-H4, Nectin-4 and LIV-1, in 8 tandem fragments (9 predicted epitopes in total: Nectin4-CTL1 is a merged fragment spanning an overlapping Nectin-4 pair, and the other seven fragments each carry one epitope), but the current in vivo model overexpresses only TROP2, so the epitopes of the other three antigens have no corresponding target in that model and their in vivo potency has not been validated. This project adopts a representative-antigen strategy: TROP2, the most immunogenic antigen in the primary screen, is the representative that carries the platform-level proof of concept, and antigen-by-antigen in vivo validation is listed as future work.",
            "Construct 4T1 cell lines stably overexpressing B7-H4, Nectin-4 and LIV-1 respectively (via the same commercial lentiviral transduction route as in 6.1), establish the corresponding tumour-bearing models and repeat the efficacy and mechanism evaluation of 7.2–7.5. Antigen-by-antigen validation would significantly increase animal use, so a multi-antigen co-expressing target cell line is preferred: it validates all the Combined vaccine epitopes in a single model and reduces the number of animals required."
          ]
        },
        {
          "type": "subheading",
          "id": "exp-o3",
          "index": "O3.",
          "title": "In vivo safety and toxicology"
        },
        {
          "type": "prose",
          "paragraphs": [
            "Section 5 was done entirely in cell culture, so it bounds the in vitro working dose without supporting any statement about tolerability in an animal. Three gaps follow directly: persistence measured in buffer says nothing about biodistribution or clearance, a four-line normal-cell panel has no stroma, vasculature or repeat dosing, and ng per 10⁴ cells does not convert to mg/kg. The study that would close them is a repeat-dose toxicity study in BALB/c of both sexes, vehicle, empty-vector circRNA-LNP, and Combined at 1× and 3–5× the efficacy dose, on the D0/7/14/21/28 schedule with a 14-day recovery cohort, reading body weight, clinical pathology, organ weights and blinded histopathology of liver, kidney, spleen, lung, heart, injection site and draining lymph node, together with serum IL-6, TNF-α, IFN-γ and IL-1β after the first and last doses and circRNA copy number by RT-qPCR in the major organs at 6 h, 24 h, 72 h and 7 d. Running it in the HLA-A*02:01 transgenic animals of O1 would supply the specificity and safety endpoints from one cohort, although those animals express mouse target antigens, so a negative finding in normal tissue bounds the on-target risk rather than excluding it. A separate ethics application is required."
          ]
        }
      ]
    },
    {
      "id": "sec-references",
      "index": "09",
      "kicker": "09 / References & Citations",
      "navLabel": "References & Citations",
      "title": "References",
      "summary": "",
      "blocks": [
        {
          "type": "feature",
          "key": "exp-references"
        }
      ]
    }
  ],
  "links": [
    {
      "path": "/design",
      "label": "Construct Architecture"
    },
    {
      "path": "/measurement",
      "label": "Circularity & Purity Metrics"
    },
    {
      "path": "/results",
      "label": "Experimental Findings"
    },
    {
      "path": "/safety-and-security",
      "label": "Biosafety Protocols"
    }
  ],
  "next": {
    "path": "/measurement",
    "label": "Measurement",
    "title": "How Does a Protocol Become a Reliable Metric?",
    "description": "Executing experiments is only the start. Discover how we quantified circularity yields, calibrated degradation kinetics, and normalized flow cytometry across runs."
  }
};

export const experimentsReferences: CitationReference[] = [
  {
    "id": 1,
    "authors": "New England Biolabs (NEB).",
    "title": "*HiScribe® T7 Quick High Yield RNA Synthesis Kit (NEB #E2050S/L): Instruction Manual*. Sections \"DNA Template Preparation: Plasmid Templates\" and \"Standard RNA Synthesis\".",
    "journal": "",
    "volumeYear": "",
    "links": [
      {
        "href": "https://www.neb.com/en/-/media/nebus/files/manuals/manuale2050.pdf",
        "label": "https://www.neb.com/en/-/media/nebus/files/manuals/manuale2050.pdf"
      }
    ]
  },
  {
    "id": 2,
    "authors": "Wesselhoeft RA, Kowalski PS, Anderson DG.",
    "title": "Engineering circular RNA for potent and stable translation in eukaryotic cells. *Nat Commun.* 2018;9:2629. PMID: 29980667.",
    "journal": "",
    "volumeYear": "",
    "links": [
      {
        "href": "https://pubmed.ncbi.nlm.nih.gov/29980667/",
        "label": "https://pubmed.ncbi.nlm.nih.gov/29980667/"
      }
    ]
  },
  {
    "id": 3,
    "authors": "LGC Biosearch Technologies (Epicentre/Lucigen).",
    "title": "*Ribonuclease R (RNase R) Manual* (NRR07250).",
    "journal": "",
    "volumeYear": "",
    "links": [
      {
        "href": "https://biosearchtech.a.bigcontent.io/v1/static/manual_RNR07250_RNase-R",
        "label": "https://biosearchtech.a.bigcontent.io/v1/static/manual_RNR07250_RNase-R"
      }
    ]
  },
  {
    "id": 4,
    "authors": "Xiao MS, Wilusz JE.",
    "title": "An improved method for circular RNA purification using RNase R that efficiently removes linear RNAs containing G-quadruplexes or structured 3′ ends. *Nucleic Acids Res.* 2019;47:8755-8769. PMID: 31269210.",
    "journal": "",
    "volumeYear": "",
    "links": [
      {
        "href": "https://academic.oup.com/nar/article/47/16/8755/5527976",
        "label": "https://academic.oup.com/nar/article/47/16/8755/5527976"
      }
    ]
  },
  {
    "id": 5,
    "authors": "New England Biolabs (NEB).",
    "title": "*RNase R* (NEB #M0100), product page and recommended digestion (1 unit per µg RNA, 37 ℃).",
    "journal": "",
    "volumeYear": "",
    "links": [
      {
        "href": "https://www.neb.com/en/products/m0100-rnase-r",
        "label": "https://www.neb.com/en/products/m0100-rnase-r"
      }
    ]
  },
  {
    "id": 6,
    "authors": "Cytiva.",
    "title": "*Ficoll-Paque PLUS, Cell Preparation, Instructions for Use* (71716700).",
    "journal": "",
    "volumeYear": "",
    "links": [
      {
        "href": "https://cdn.cytivalifesciences.com/api/public/content/digi-12637-pdf",
        "label": "https://cdn.cytivalifesciences.com/api/public/content/digi-12637-pdf"
      }
    ]
  },
  {
    "id": 7,
    "authors": "Miltenyi Biotec.",
    "title": "*CD14 MicroBeads, human* data sheet (#130-050-201).",
    "journal": "",
    "volumeYear": "",
    "links": [
      {
        "href": "https://www.miltenyibiotec.com/upload/assets/IM0001260.PDF",
        "label": "https://www.miltenyibiotec.com/upload/assets/IM0001260.PDF"
      }
    ]
  },
  {
    "id": 8,
    "authors": "Sallusto F, Lanzavecchia A.",
    "title": "Efficient presentation of soluble antigen by cultured human dendritic cells is maintained by granulocyte/macrophage colony-stimulating factor plus interleukin 4 and downregulated by tumor necrosis factor alpha. *J Exp Med.* 1994;179:1109-1118. PMID: 8145033.",
    "journal": "",
    "volumeYear": "",
    "links": [
      {
        "href": "https://pubmed.ncbi.nlm.nih.gov/8145033/",
        "label": "https://pubmed.ncbi.nlm.nih.gov/8145033/"
      }
    ]
  },
  {
    "id": 9,
    "authors": "Lonza.",
    "title": "*Amaxa® Human Dendritic Cell Nucleofector® Kit (VPA-1004), Optimized Protocol for Human Dendritic Cells*.",
    "journal": "",
    "volumeYear": "",
    "links": [
      {
        "href": "https://bioscience.lonza.com/lonza_bs/US/en/document/21410",
        "label": "https://bioscience.lonza.com/lonza_bs/US/en/document/21410"
      }
    ]
  },
  {
    "id": 10,
    "authors": "Miltenyi Biotec.",
    "title": "*CD3 MicroBeads, human* data sheet (#130-050-101).",
    "journal": "",
    "volumeYear": "",
    "links": [
      {
        "href": "https://www.miltenyibiotec.com/upload/assets/IM0001261.PDF",
        "label": "https://www.miltenyibiotec.com/upload/assets/IM0001261.PDF"
      }
    ]
  },
  {
    "id": 11,
    "authors": "Miltenyi Biotec.",
    "title": "*Pre-Separation Filters* data sheet (30 µm, #130-041-407).",
    "journal": "",
    "volumeYear": "",
    "links": [
      {
        "href": "https://www.miltenyibiotec.com/upload/assets/IM0010173.PDF",
        "label": "https://www.miltenyibiotec.com/upload/assets/IM0010173.PDF"
      }
    ]
  },
  {
    "id": 12,
    "authors": "Schuler-Thurner B, Schultz ES, Berger TG, et al.",
    "title": "Rapid induction of tumor-specific type 1 T helper cells in metastatic melanoma patients by vaccination with mature, cryopreserved, peptide-loaded monocyte-derived dendritic cells. *J Exp Med.* 2002;195:1279-1288. PMID: 12021308.",
    "journal": "",
    "volumeYear": "",
    "links": [
      {
        "href": "https://pubmed.ncbi.nlm.nih.gov/12021308/",
        "label": "https://pubmed.ncbi.nlm.nih.gov/12021308/"
      }
    ]
  },
  {
    "id": 13,
    "authors": "Czerkinsky CC, Nilsson LÅ, Nygren H, Ouchterlony Ö, Tarkowski A.",
    "title": "A solid-phase enzyme-linked immunospot (ELISPOT) assay for enumeration of specific antibody-secreting cells. *J Immunol Methods.* 1983;65:109-121. PMID: 6361139.",
    "journal": "",
    "volumeYear": "",
    "links": [
      {
        "href": "https://pubmed.ncbi.nlm.nih.gov/6361139/",
        "label": "https://pubmed.ncbi.nlm.nih.gov/6361139/"
      }
    ]
  },
  {
    "id": 14,
    "authors": "Dakewe Biotech.",
    "title": "*Human IFN-γ Precoated ELISPOT Kit (strips)* instruction manual, Cat. 2110005.",
    "journal": "",
    "volumeYear": "",
    "links": [
      {
        "href": "https://files.dakewe.cn/crm/instruction/dy/2110005.pdf",
        "label": "https://files.dakewe.cn/crm/instruction/dy/2110005.pdf"
      }
    ]
  },
  {
    "id": 15,
    "authors": "Lichtenfels R, Biddison WE, Schulz H, Vogt AB, Martin R.",
    "title": "CARE-LASS (calcein-release-assay), an improved fluorescence-based test system to measure cytotoxic T lymphocyte activity. *J Immunol Methods.* 1994;172:227-239. PMID: 7518485.",
    "journal": "",
    "volumeYear": "",
    "links": [
      {
        "href": "https://pubmed.ncbi.nlm.nih.gov/7518485/",
        "label": "https://pubmed.ncbi.nlm.nih.gov/7518485/"
      }
    ]
  },
  {
    "id": 16,
    "authors": "Neri S, Mariani E, Meneghetti A, Cattini L, Facchini A.",
    "title": "Calcein-acetyoxymethyl cytotoxicity assay: standardization of a method allowing additional analyses on recovered effector cells and supernatants. *Clin Diagn Lab Immunol.* 2001;8:1131-1135. PMID: 11687452.",
    "journal": "",
    "volumeYear": "",
    "links": [
      {
        "href": "https://pubmed.ncbi.nlm.nih.gov/11687452/",
        "label": "https://pubmed.ncbi.nlm.nih.gov/11687452/"
      }
    ]
  },
  {
    "id": 17,
    "authors": "Cibrián D, Sánchez-Madrid F.",
    "title": "CD69: from activation marker to metabolic gatekeeper. *Eur J Immunol.* 2017;47:946-953. PMID: 28475283.",
    "journal": "",
    "volumeYear": "",
    "links": [
      {
        "href": "https://pubmed.ncbi.nlm.nih.gov/28475283/",
        "label": "https://pubmed.ncbi.nlm.nih.gov/28475283/"
      }
    ]
  },
  {
    "id": 18,
    "authors": "BioLegend.",
    "title": "*Cell Surface Flow Cytometry Staining Protocol*.",
    "journal": "",
    "volumeYear": "",
    "links": [
      {
        "href": "https://www.biolegend.com/en-us/protocols/cell-surface-flow-cytometry-staining-protocol",
        "label": "https://www.biolegend.com/en-us/protocols/cell-surface-flow-cytometry-staining-protocol"
      }
    ]
  },
  {
    "id": 19,
    "authors": "Banchereau J, Steinman RM.",
    "title": "Dendritic cells and the control of immunity. *Nature.* 1998;392:245-252. PMID: 9521319.",
    "journal": "",
    "volumeYear": "",
    "links": [
      {
        "href": "https://pubmed.ncbi.nlm.nih.gov/9521319/",
        "label": "https://pubmed.ncbi.nlm.nih.gov/9521319/"
      }
    ]
  },
  {
    "id": 20,
    "authors": "Towbin H, Staehelin T, Gordon J.",
    "title": "Electrophoretic transfer of proteins from polyacrylamide gels to nitrocellulose sheets: procedure and some applications. *Proc Natl Acad Sci USA.* 1979;76:4350-4354. PMID: 388439.",
    "journal": "",
    "volumeYear": "",
    "links": [
      {
        "href": "https://pubmed.ncbi.nlm.nih.gov/388439/",
        "label": "https://pubmed.ncbi.nlm.nih.gov/388439/"
      }
    ]
  },
  {
    "id": 21,
    "authors": "Thermo Fisher Scientific.",
    "title": "*RIPA Lysis and Extraction Buffer* product information sheet (Cat. 89900/89901).",
    "journal": "",
    "volumeYear": "",
    "links": [
      {
        "href": "https://documents.thermofisher.com/TFS-Assets/LSG/manuals/MAN0011565_RIPA_Buff_UG_ND.pdf",
        "label": "https://documents.thermofisher.com/TFS-Assets/LSG/manuals/MAN0011565_RIPA_Buff_UG_ND.pdf"
      }
    ]
  },
  {
    "id": 22,
    "authors": "Bio-Rad.",
    "title": "*Protein Blotting Guide: A Guide to Transfer and Detection* (Bulletin 2895).",
    "journal": "",
    "volumeYear": "",
    "links": [
      {
        "href": "https://www.bio-rad.com/webroot/web/pdf/lsr/literature/Bulletin_2895.pdf",
        "label": "https://www.bio-rad.com/webroot/web/pdf/lsr/literature/Bulletin_2895.pdf"
      }
    ]
  },
  {
    "id": 23,
    "authors": "Sallusto F, Lenig D, Förster R, Lipp M, Lanzavecchia A.",
    "title": "Two subsets of memory T lymphocytes with distinct homing potentials and effector functions. *Nature.* 1999;401:708-712. PMID: 10537110.",
    "journal": "",
    "volumeYear": "",
    "links": [
      {
        "href": "https://pubmed.ncbi.nlm.nih.gov/10537110/",
        "label": "https://pubmed.ncbi.nlm.nih.gov/10537110/"
      }
    ]
  },
  {
    "id": 24,
    "authors": "Lenschow DJ, Walunas TL, Bluestone JA.",
    "title": "CD28/B7 system of T cell costimulation. *Annu Rev Immunol.* 1996;14:233-258. PMID: 8717514.",
    "journal": "",
    "volumeYear": "",
    "links": [
      {
        "href": "https://pubmed.ncbi.nlm.nih.gov/8717514/",
        "label": "https://pubmed.ncbi.nlm.nih.gov/8717514/"
      }
    ]
  },
  {
    "id": 25,
    "authors": "BioLegend.",
    "title": "*PE anti-human CD197 (CCR7) Antibody, clone G043H7*, product data sheet (staining recommended at 37 ℃).",
    "journal": "",
    "volumeYear": "",
    "links": [
      {
        "href": "https://www.biolegend.com/en-us/products/pe-anti-human-cd197-ccr7-antibody-7498",
        "label": "https://www.biolegend.com/en-us/products/pe-anti-human-cd197-ccr7-antibody-7498"
      }
    ]
  },
  {
    "id": 26,
    "authors": "BD Biosciences.",
    "title": "*Multicolor Flow Cytometry Panel Design* (marker selection, fluorochrome assignment, controls and gating).",
    "journal": "",
    "volumeYear": "",
    "links": [
      {
        "href": "https://www.bdbiosciences.com/en-us/resources/panel-design",
        "label": "https://www.bdbiosciences.com/en-us/resources/panel-design"
      }
    ]
  },
  {
    "id": 27,
    "authors": "Thermo Fisher Scientific.",
    "title": "*Enzymatic and Non-Enzymatic Cell Dissociation Protocols* (Gibco Cell Culture Basics).",
    "journal": "",
    "volumeYear": "",
    "links": [
      {
        "href": "https://www.thermofisher.com/us/en/home/references/gibco-cell-culture-basics/cell-culture-protocols/cell-dissociation-protocol.html",
        "label": "https://www.thermofisher.com/us/en/home/references/gibco-cell-culture-basics/cell-culture-protocols/cell-dissociation-protocol.html"
      }
    ]
  },
  {
    "id": 28,
    "authors": "Dojindo.",
    "title": "*Cell Counting Kit-8 (CCK-8) Technical Manual*, Cat. CK04.",
    "journal": "",
    "volumeYear": "",
    "links": [
      {
        "href": "https://www.dojindo.com/manual/CK04/",
        "label": "https://www.dojindo.com/manual/CK04/"
      }
    ]
  },
  {
    "id": 29,
    "authors": "Naldini L, Blömer U, Gallay P, et al.",
    "title": "In vivo gene delivery and stable transduction of nondividing cells by a lentiviral vector. *Science.* 1996;272:263-267. PMID: 8602510.",
    "journal": "",
    "volumeYear": "",
    "links": [
      {
        "href": "https://pubmed.ncbi.nlm.nih.gov/8602510/",
        "label": "https://pubmed.ncbi.nlm.nih.gov/8602510/"
      }
    ]
  },
  {
    "id": 30,
    "authors": "Zufferey R, Nagy D, Mandel RJ, Naldini L, Trono D.",
    "title": "Multiply attenuated lentiviral vector achieves efficient gene delivery in vivo. *Nat Biotechnol.* 1997;15:871-875. PMID: 9306402.",
    "journal": "",
    "volumeYear": "",
    "links": [
      {
        "href": "https://pubmed.ncbi.nlm.nih.gov/9306402/",
        "label": "https://pubmed.ncbi.nlm.nih.gov/9306402/"
      }
    ]
  },
  {
    "id": 31,
    "authors": "BD Biosciences.",
    "title": "*Protocols*, flow cytometry sample preparation, staining and sorting.",
    "journal": "",
    "volumeYear": "",
    "links": [
      {
        "href": "https://www.bdbiosciences.com/en-us/resources/protocols",
        "label": "https://www.bdbiosciences.com/en-us/resources/protocols"
      }
    ]
  },
  {
    "id": 32,
    "authors": "Thermo Fisher Scientific.",
    "title": "*Selection Antibiotics*, puromycin kill curve and stable cell line selection.",
    "journal": "",
    "volumeYear": "",
    "links": [
      {
        "href": "https://www.thermofisher.com/us/en/home/life-science/cell-culture/transfection/transfection-reagents/selection-antibiotics.html",
        "label": "https://www.thermofisher.com/us/en/home/life-science/cell-culture/transfection/transfection-reagents/selection-antibiotics.html"
      }
    ]
  },
  {
    "id": 33,
    "authors": "Chomczynski P, Sacchi N.",
    "title": "Single-step method of RNA isolation by acid guanidinium thiocyanate-phenol-chloroform extraction. *Anal Biochem.* 1987;162:156-159. PMID: 2440339.",
    "journal": "",
    "volumeYear": "",
    "links": [
      {
        "href": "https://pubmed.ncbi.nlm.nih.gov/2440339/",
        "label": "https://pubmed.ncbi.nlm.nih.gov/2440339/"
      }
    ]
  },
  {
    "id": 34,
    "authors": "BD Biosciences.",
    "title": "*Purified Rat Anti-Mouse CD16/CD32 (Mouse BD Fc Block™), clone 2.4G2*, Cat. 553142.",
    "journal": "",
    "volumeYear": "",
    "links": [
      {
        "href": "https://www.bdbiosciences.com/en-us/products/reagents/flow-cytometry-reagents/research-reagents/single-color-antibodies-ruo/purified-rat-anti-mouse-cd16-cd32-mouse-bd-fc-block.553142",
        "label": "https://www.bdbiosciences.com/en-us/products/reagents/flow-cytometry-reagents/research-reagents/single-color-antibodies-ruo/purified-rat-anti-mouse-cd16-cd32-mouse-bd-fc-block.553142"
      }
    ]
  },
  {
    "id": 35,
    "authors": "Pulaski BA, Ostrand-Rosenberg S.",
    "title": "Mouse 4T1 breast tumor model. *Curr Protoc Immunol.* 2000;Chapter 20:Unit 20.2. PMID: 18432775.",
    "journal": "",
    "volumeYear": "",
    "links": [
      {
        "href": "https://pubmed.ncbi.nlm.nih.gov/18432775/",
        "label": "https://pubmed.ncbi.nlm.nih.gov/18432775/"
      }
    ]
  },
  {
    "id": 36,
    "authors": "",
    "title": "The ARRIVE guidelines 2.0, the Essential 10 (NC3Rs).",
    "journal": "",
    "volumeYear": "",
    "links": [
      {
        "href": "https://arriveguidelines.org/arrive-guidelines",
        "label": "https://arriveguidelines.org/arrive-guidelines"
      }
    ]
  },
  {
    "id": 37,
    "authors": "NC3Rs.",
    "title": "*Experimental Design Assistant (EDA)*.",
    "journal": "",
    "volumeYear": "",
    "links": [
      {
        "href": "https://eda.nc3rs.org.uk/",
        "label": "https://eda.nc3rs.org.uk/"
      }
    ]
  },
  {
    "id": 38,
    "authors": "Workman P, Aboagye EO, Balkwill F, et al.",
    "title": "Guidelines for the welfare and use of animals in cancer research (UKCCCR/NCRI). *Br J Cancer.* 2010;102:1555-1577.",
    "journal": "",
    "volumeYear": "",
    "links": [
      {
        "href": "https://www.nature.com/articles/6605642",
        "label": "https://www.nature.com/articles/6605642"
      }
    ]
  },
  {
    "id": 39,
    "authors": "Ullman-Cullere MH, Foltz CJ.",
    "title": "Body condition scoring: a rapid and accurate method for assessing health status in mice. *Lab Anim Sci.* 1999;49:319-323. PMID: 10403450.",
    "journal": "",
    "volumeYear": "",
    "links": [
      {
        "href": "https://pubmed.ncbi.nlm.nih.gov/10403450/",
        "label": "https://pubmed.ncbi.nlm.nih.gov/10403450/"
      }
    ]
  },
  {
    "id": 40,
    "authors": "Tomayko MM, Reynolds CP.",
    "title": "Determination of subcutaneous tumor size in athymic (nude) mice. *Cancer Chemother Pharmacol.* 1989;24:148-154. PMID: 2544306.",
    "journal": "",
    "volumeYear": "",
    "links": [
      {
        "href": "https://pubmed.ncbi.nlm.nih.gov/2544306/",
        "label": "https://pubmed.ncbi.nlm.nih.gov/2544306/"
      }
    ]
  },
  {
    "id": 41,
    "authors": "Abcam.",
    "title": "*IHC with samples in paraffin (IHC-P) protocol*.",
    "journal": "",
    "volumeYear": "",
    "links": [
      {
        "href": "https://www.abcam.com/en-us/technical-resources/protocols/ihc-with-samples-in-paraffin",
        "label": "https://www.abcam.com/en-us/technical-resources/protocols/ihc-with-samples-in-paraffin"
      }
    ]
  },
  {
    "id": 42,
    "authors": "Abcam.",
    "title": "*IHC antigen retrieval protocol* (heat-induced citrate retrieval).",
    "journal": "",
    "volumeYear": "",
    "links": [
      {
        "href": "https://www.abcam.com/en-us/technical-resources/protocols/ihc-antigen-retrieval",
        "label": "https://www.abcam.com/en-us/technical-resources/protocols/ihc-antigen-retrieval"
      }
    ]
  },
  {
    "id": 43,
    "authors": "BD Biosciences.",
    "title": "*BD Cytofix/Cytoperm™ Plus Fixation/Permeabilization Solution Kit with BD GolgiPlug™*, Cat. 555028, kit manual.",
    "journal": "",
    "volumeYear": "",
    "links": [
      {
        "href": "https://www.bdbiosciences.com/en-us/products/reagents/flow-cytometry-reagents/research-reagents/buffers-and-supporting-reagents-ruo/fixation-permeabilization-solution-kit-with-bd-golgiplug.555028",
        "label": "https://www.bdbiosciences.com/en-us/products/reagents/flow-cytometry-reagents/research-reagents/buffers-and-supporting-reagents-ruo/fixation-permeabilization-solution-kit-with-bd-golgiplug.555028"
      }
    ]
  }
];
