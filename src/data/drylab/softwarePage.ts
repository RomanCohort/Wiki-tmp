// Generated from the final Markdown by scripts/generate_software_page.py.
import type {
  WikiPageContent,
  WikiContentBlock,
  WikiJudgingCriterion,
} from "../../components/wiki/wikiPageTypes";
import type { CitationReference } from "../citations/citationTypes";
import {
  getSoftwareImage,
  softwareFigures,
  type SoftwareFigureKey,
} from "./softwareAssets";

type FigureBlock = Extract<WikiContentBlock, { type: "figure" }>;
type SourceBlock =
  | Exclude<WikiContentBlock, { type: "figure" }>
  | { type: "figure"; asset: SoftwareFigureKey };

export function softwareFigure(key: SoftwareFigureKey): FigureBlock {
  const asset = softwareFigures[key];
  return {
    type: "figure",
    src: getSoftwareImage(key),
    alt: asset.alt,
    caption: asset.caption,
    figureLabel: asset.figureLabel,
    width: asset.width,
    height: asset.height,
    ...(key === "figure-11-run-console"
      ? { className: "software-figure--compact" }
      : {}),
  };
}
const blocks = (value: SourceBlock[]): WikiContentBlock[] =>
  value.map((block) =>
    block.type === "figure" ? softwareFigure(block.asset) : block,
  );

export type SoftwarePanel =
  | { kind: "fold"; id: string; title: string; blocks: WikiContentBlock[] }
  | {
      kind: "gallery";
      id: string;
      title: string;
      entries: { title: string; figure: FigureBlock }[];
    };

export const softwareReferences: CitationReference[] = [
  {
    id: 1,
    authors: "McLaughlin JA, Beal J, Mısırlı G, et al.",
    title:
      "The Synthetic Biology Open Language (SBOL) Version 3: Simplified Data Exchange for Bioengineering.",
    journal: "Frontiers in Bioengineering and Biotechnology.",
    volumeYear: "2020;8:1009.",
    links: [
      {
        href: "https://doi.org/10.3389/fbioe.2020.01009",
        label: "doi:10.3389/fbioe.2020.01009",
      },
    ],
  },
  {
    id: 2,
    authors: "Chen CK, Cheng R, Demeter J, et al.",
    title: "Structured elements drive extensive circular RNA translation.",
    journal: "Molecular Cell.",
    volumeYear: "2021;81:4300–4318.e13.",
    links: [
      {
        href: "https://doi.org/10.1016/j.molcel.2021.07.042",
        label: "doi:10.1016/j.molcel.2021.07.042",
      },
    ],
  },
  {
    id: 3,
    authors: "Robertson MP, Scott WG.",
    title: "The structural basis of ribozyme-catalyzed RNA assembly.",
    journal: "Science.",
    volumeYear: "2007;315:1549–1553.",
    links: [
      {
        href: "https://doi.org/10.1126/science.1136231",
        label: "doi:10.1126/science.1136231",
      },
    ],
  },
  {
    id: 4,
    authors: "Vita R, Mahajan S, Overton JA, et al.",
    title: "The Immune Epitope Database (IEDB): 2018 update.",
    journal: "Nucleic Acids Research.",
    volumeYear: "2019;47:D339–D343.",
    links: [
      {
        href: "https://doi.org/10.1093/nar/gky1006",
        label: "doi:10.1093/nar/gky1006",
      },
    ],
  },
  {
    id: 5,
    authors: "Hofacker IL.",
    title: "Vienna RNA secondary structure server.",
    journal: "Nucleic Acids Research.",
    volumeYear: "2003;31:3429–3431.",
    links: [
      {
        href: "https://doi.org/10.1093/nar/gkg599",
        label: "doi:10.1093/nar/gkg599",
      },
    ],
  },
  {
    id: 6,
    authors: "Shen T, Hu Z, Sun S, et al.",
    title:
      "Accurate RNA 3D structure prediction using a language model-based deep learning approach.",
    journal: "Nature Methods.",
    volumeYear: "2024;21:2287–2298.",
    links: [
      {
        href: "https://doi.org/10.1038/s41592-024-02487-0",
        label: "doi:10.1038/s41592-024-02487-0",
      },
    ],
  },
  {
    id: 7,
    authors: "Wang W, Peng Z, Yang J.",
    title:
      "Predicting RNA 3D structure and conformers using a pre-trained secondary structure model and structure-aware attention.",
    journal: "Nature Machine Intelligence.",
    volumeYear: "2026;8:722–734.",
    links: [
      {
        href: "https://doi.org/10.1038/s42256-026-01223-x",
        label: "doi:10.1038/s42256-026-01223-x",
      },
    ],
  },
  {
    id: 8,
    authors: "Tarafder S, Bhattacharya D.",
    title:
      "RNAbpFlow: base pair-augmented SE(3) flow matching for conditional RNA 3D structure generation.",
    journal: "Nature Methods.",
    volumeYear: "2026;23:1349–1358.",
    links: [
      {
        href: "https://doi.org/10.1038/s41592-026-03128-4",
        label: "doi:10.1038/s41592-026-03128-4",
      },
    ],
  },
  {
    id: 9,
    authors: "Chang W, Cheng J, Allaire JJ, et al.",
    title: "",
    journal: "shiny: Web Application Framework for R.",
    volumeYear: "",
    links: [
      {
        href: "https://shiny.posit.co/r/getstarted/shiny-basics/lesson1/",
        label: "Package documentation",
      },
    ],
  },
  {
    id: 10,
    authors: "Ritchie ME, Phipson B, Wu D, et al.",
    title:
      "limma powers differential expression analyses for RNA-sequencing and microarray studies.",
    journal: "Nucleic Acids Research.",
    volumeYear: "2015;43:e47.",
    links: [
      {
        href: "https://doi.org/10.1093/nar/gkv007",
        label: "doi:10.1093/nar/gkv007",
      },
    ],
  },
  {
    id: 11,
    authors: "Chen Y, Chen L, Lun ATL, Baldoni PL, Smyth GK.",
    title:
      "edgeR v4: powerful differential analysis of sequencing data with expanded functionality and improved support for small counts and larger datasets.",
    journal: "Nucleic Acids Research.",
    volumeYear: "2025;53:gkaf018.",
    links: [
      {
        href: "https://doi.org/10.1093/nar/gkaf018",
        label: "doi:10.1093/nar/gkaf018",
      },
    ],
  },
];

export const softwarePanels: Record<string, SoftwarePanel> = {
  "software-implementation-1": {
    kind: "fold",
    id: "implementation-1",
    title:
      "Implementation 1 · Linking candidate identity, evidence, and researcher confirmation",
    blocks: blocks([
      {
        type: "prose",
        paragraphs: [
          "A stage-specific epitope ID combines sequence, prediction mode, HLA, and target identity. The selection handler records the QC recommendation separately from the researcher’s decision and saves the candidate evidence with the selected entry.",
        ],
      },
      {
        type: "code",
        language: "r",
        code: 'design_cart_epitope_id <- function(peptide, mode, allele, target_symbol, target_accession) {\n  paste(\n    "EPITOPE", toupper(trimws(peptide)), toupper(trimws(mode)),\n    toupper(trimws(allele)), toupper(trimws(target_accession)),\n    toupper(trimws(target_symbol)), sep = ":"\n  )\n}',
      },
      {
        type: "code",
        language: "r",
        code: 'chosen$QCRecommendation <- chosen$FinalDecision %||% chosen$DisplayDecision\nchosen$UserDecision <- "SELECTED_FOR_ORF_REVIEW"\nchosen$ConfirmedAt <- format(Sys.time(), "%Y-%m-%d %H:%M:%S")',
      },
      {
        type: "code",
        language: "r",
        code: 'chosen$EvidenceJSON <- vapply(seq_len(nrow(chosen)), function(i) {\n  as.character(jsonlite::toJSON(\n    as.list(chosen[i, , drop = FALSE]), auto_unbox = TRUE, null = "null", na = "null"\n  ))\n}, character(1))\nchosen$Source <- paste0("IEDB ", toupper(input$pred_mode))\ndesign_cart$add_epitopes(chosen)',
      },
      {
        type: "prose",
        paragraphs: [
          "*Source: `utils/utils_design_cart.R` · `adf4013c` · lines 54–60; `modules/mod_epitope.R` · `adf4013c` · lines 2304–2306; `modules/mod_epitope.R` · `adf4013c` · lines 2313–2319.*",
        ],
      },
    ]),
  },
  "software-implementation-2": {
    kind: "fold",
    id: "implementation-2",
    title:
      "Implementation 2 · Retaining selected records across design stages and sessions",
    blocks: blocks([
      {
        type: "prose",
        paragraphs: [
          "The Cart merges entries by ID while retaining the incoming row order. Project Bundle serialization saves target selections, epitope selections, and the review state for later restoration.",
        ],
      },
      {
        type: "code",
        language: "r",
        code: "merge_rows <- function(old, incoming) {\n  if (!nrow(incoming)) return(old)\n  combined <- rbind(old[!old$CartID %in% incoming$CartID, , drop = FALSE], incoming)\n  rownames(combined) <- NULL\n  combined\n}",
      },
      {
        type: "code",
        language: "r",
        code: 'project_bundle_write_csv(record$targets, file.path(bundle_dir, "targets.csv"))\nproject_bundle_write_csv(record$epitopes, file.path(bundle_dir, "epitopes.csv"))\nproject_bundle_write_json(record$epitope_review %||% list(), file.path(bundle_dir, "epitope_review.json"))',
      },
      {
        type: "prose",
        paragraphs: [
          "*Source: `utils/utils_design_cart.R` · `adf4013c` · lines 68–73; `utils/utils_project_bundle.R` · `adf4013c` · lines 253–255.*",
        ],
      },
    ]),
  },
  "software-implementation-3": {
    kind: "fold",
    id: "implementation-3",
    title: "Implementation 3 · Testing sequence-preserving exports",
    blocks: blocks([
      {
        type: "prose",
        paragraphs: [
          "The SBOL3 round-trip test writes a design, reads it back, and compares both its component identity and DNA sequence with the source manifest.",
        ],
      },
      {
        type: "code",
        language: "r",
        code: 'testthat::test_that("SBOL3 RDF/XML round-trip preserves component and DNA sequence", {\n  manifest <- build_construct_manifest(make_export_construct(), make_export_registry_hits())\n  path <- tempfile(fileext = ".rdf")\n  on.exit(unlink(path), add = TRUE)\n  write_construct_sbol3(manifest, path)\n  restored <- read_construct_sbol3(path)\n  testthat::expect_equal(restored$component_id, manifest$construct_id)\n  testthat::expect_equal(restored$sequence, manifest$dna_template$sequence)\n})',
      },
      {
        type: "prose",
        paragraphs: [
          "*Source: `tests/testthat/test-construct-exports.R` · `cd4d2b35` · lines 88–96.*",
        ],
      },
    ]),
  },
  "software-implementation-4": {
    kind: "fold",
    id: "implementation-4",
    title: "Implementation 4 · Aligning reconstruction anchors",
    blocks: blocks([
      {
        type: "prose",
        paragraphs: [
          "Four target anchors connect the template to the phosphate trace; Kabsch alignment places the template atoms in the reconstructed coordinates.",
        ],
      },
      {
        type: "code",
        language: "python",
        code: "c1_dst = p_coords[i] + b * _C1_ALONG + r * _C1_PERP\nc4_dst = p_coords[i] + b * _C4_ALONG + r * _C4_PERP\no3_dst = nxt - b * 1.6  # O3'[i] consistent with the geometry of P[i+1]\ndst_anchors = np.stack([p_coords[i], c1_dst, c4_dst, o3_dst])\n\n# Kabsch superposition (4-point least squares; one more O3' constraint than the 3-point version)\naligned = _kabsch_align(src_anchors, dst_anchors, tcoords)",
      },
      {
        type: "prose",
        paragraphs: [
          "*Source: `src/torusfold/scheme2/aform_from_template.py` · `4f55c167` · lines 178–184.*",
        ],
      },
    ]),
  },
  "software-implementation-5": {
    kind: "fold",
    id: "implementation-5",
    title: "Implementation 5 · Orienting atoms in a local coordinate frame",
    blocks: blocks([
      {
        type: "prose",
        paragraphs: [
          "The subsequent frame revision uses backbone, perpendicular, and normal directions to position the sugar anchors in three dimensions.",
        ],
      },
      {
        type: "code",
        language: "python",
        code: "n_axis = np.cross(b, r)  # r is already orthogonal to b and unit\n_o1, _o4 = _ANCHOR_OFFSETS[\"C1'\"], _ANCHOR_OFFSETS[\"C4'\"]\nc1_dst = p_coords[i] + b * _o1[0] + r * _o1[1] + n_axis * _o1[2]\nc4_dst = p_coords[i] + b * _o4[0] + r * _o4[1] + n_axis * _o4[2]\no3_dst = nxt - b * 1.6  # O3'[i] consistent with the geometry of P[i+1]\ndst_anchors = np.stack([p_coords[i], c1_dst, c4_dst, o3_dst])\n\n# Kabsch superposition (4-point least squares; one more O3' constraint than the 3-point version)\naligned = _kabsch_align(src_anchors, dst_anchors, tcoords)",
      },
      {
        type: "prose",
        paragraphs: [
          "*Source: `src/torusfold/scheme2/aform_from_template.py` · `c0ed20f0` · lines 188–196.*",
        ],
      },
    ]),
  },
  "software-implementation-6": {
    kind: "fold",
    id: "implementation-6",
    title:
      "Implementation 6 · Carrying base pairs into reconstruction and refinement",
    blocks: blocks([
      {
        type: "prose",
        paragraphs: [
          "The same pair list enters all-atom reconstruction and Amber refinement, connecting pairing guidance across the two stages.",
        ],
      },
      {
        type: "code",
        language: "python",
        code: "_structure_5 = reconstruct_all_atom(best_coords, sequence, pairs=pairs)\n# amber_refine: C1'-C1' pair restraints (K=100 kJ/mol/nm²) + A-form torsions\n_refined_coords_5, _e0_5, _e1_5, _info_5 = _amber_refine_full(\n    _structure_5, pairs,\n    platform_name=\"CPU\",\n    max_iterations=3000,\n)",
      },
      {
        type: "prose",
        paragraphs: [
          "*Source: `src/torusfold/scheme2/isrnaclong.py` · `ea423897` · lines 2117–2123.*",
        ],
      },
    ]),
  },
  "software-implementation-7": {
    kind: "fold",
    id: "implementation-7",
    title: "Implementation 7 · Calibrating the base-pair guidance strength",
    blocks: blocks([
      {
        type: "prose",
        paragraphs: [
          "The calibration script derives a force-scale criterion from observed base-pair distance variation; the corresponding revision sets the guidance coefficient to 13.4.",
        ],
      },
      {
        type: "code",
        language: "python",
        code: 'nn = np.array(nn)\nsigma = float(nn.std())\ncrit = 0.6 * B.KBT / sigma\nprint(f"{len(structs)} structures, {len(nn)} pairs")\nprint(f"observed N-N distance: mean {nn.mean():.3f} nm, sd {sigma:.3f}")\nprint(f"criterion: K_BPP = 0.6 * kBT / sigma = 0.6 * {B.KBT} / {sigma:.3f} = {crit:.1f}")',
      },
      {
        type: "code",
        language: "python",
        code: "K_BPP = 13.4        # BPP soft constraint (0.6 * kBT / sigma_NN; was 600.0)",
      },
      {
        type: "prose",
        paragraphs: [
          "*Source: `scripts/calibrate_bpp.py` · `99ab8508` · lines 52–57; `src/torusfold/scheme2/torch_cgsim.py` · `99ab8508` · lines 147–147.*",
        ],
      },
    ]),
  },
  "software-implementation-8": {
    kind: "fold",
    id: "implementation-8",
    title: "Implementation 8 · Returning a trackable task",
    blocks: blocks([
      {
        type: "prose",
        paragraphs: [
          "Submission returns a job ID, its state, and a status endpoint while the prediction runs in a background task.",
        ],
      },
      {
        type: "code",
        language: "python",
        code: 'service = request.app.state.epitope_service\njob = service.enqueue(payload)\nbackground_tasks.add_task(service.run, job["job_id"])\nreturn {\n    "job_id": job["job_id"],\n    "status": job["status"],\n    "status_url": f"/v1/jobs/{job[\'job_id\']}",\n}',
      },
      {
        type: "prose",
        paragraphs: [
          "*Source: `api/app/routers/epitopes.py` · `ed398cf0` · lines 19–26.*",
        ],
      },
    ]),
  },
  "software-implementation-9": {
    kind: "fold",
    id: "implementation-9",
    title:
      "Implementation 9 · Packaging the design with its verification record",
    blocks: blocks([
      {
        type: "prose",
        paragraphs: [
          "The export writer generates four formats from one manifest, checks their readback, and saves the check table with the export files.",
        ],
      },
      {
        type: "code",
        language: "r",
        code: 'write_construct_json(manifest, json_path)\nwrite_construct_fasta(manifest, fasta_path)\nwrite_construct_genbank(manifest, gbk_path)\nwrite_construct_sbol3(manifest, sbol_path)\nchecks <- verify_construct_roundtrip(manifest, json_path, fasta_path, gbk_path, sbol_path)\nwrite.csv(checks, file.path(bundle_dir, "roundtrip_checks.csv"), row.names = FALSE)',
      },
      {
        type: "prose",
        paragraphs: [
          "*Source: `utils/utils_construct_exports.R` · `cd4d2b35` · lines 265–270.*",
        ],
      },
    ]),
  },
  "software-implementation-10": {
    kind: "fold",
    id: "implementation-10",
    title: "Implementation 10 · Keeping the viewer label tied to its stage",
    blocks: blocks([
      {
        type: "prose",
        paragraphs: [
          "The viewer keys updates by stage file and modification time, keeping the displayed level and description tied to the selected computational stage.",
        ],
      },
      {
        type: "code",
        language: "javascript",
        code: "var key = stage.name + '|' + stage.mtime;\nif (key === shownStructure) return;\nshownStructure = key;\n\nif (labelEl) {\n  labelEl.hidden = false;\n  if (levelEl) levelEl.textContent = 'Level ' + stage.level;\n  if (descEl) descEl.textContent = stage.desc || stage.name;\n}",
      },
      {
        type: "prose",
        paragraphs: [
          "*Source: `src/torusfold/web/app.js` · `52ecff7a` · lines 617–625.*",
        ],
      },
    ]),
  },
  "software-implementation-11": {
    kind: "fold",
    id: "implementation-11",
    title: "Implementation 11 · Updating progress from the running job",
    blocks: blocks([
      {
        type: "prose",
        paragraphs: [
          "Each server heartbeat refreshes the run state and maps the active level to its progress entry, keeping the interface aligned with the calculation.",
        ],
      },
      {
        type: "code",
        language: "javascript",
        code: "EventBus.on('sse:heartbeat', function (data) {\n  applyRunState(data);\n  if (data.current_level != null) updateProgress(levelNameAt(data.current_level), 'running');\n});",
      },
      {
        type: "prose",
        paragraphs: [
          "*Source: `src/torusfold/web/app.js` · `94582d03` · lines 1286–1289.*",
        ],
      },
    ]),
  },
  "software-validation-structure-gallery": {
    kind: "gallery",
    id: "validation-structure-gallery",
    title: "Candidate structural review",
    entries: [
      {
        title: "Terminal anchor",
        figure: softwareFigure("figure-21-epitope-structural-review"),
      },
      {
        title: "Position-by-position",
        figure: softwareFigure("figure-21b-epitope-position-burial"),
      },
    ],
  },
  "software-validation-molecular-gallery": {
    kind: "gallery",
    id: "validation-molecular-gallery",
    title: "Combined reference molecular evidence",
    entries: [
      {
        title: "BSJ sequence",
        figure: softwareFigure("figure-23a-combined-bsj"),
      },
      {
        title: "Protein expression",
        figure: softwareFigure("figure-23b-combined-expression"),
      },
    ],
  },
  "software-validation-functional-gallery": {
    kind: "gallery",
    id: "validation-functional-gallery",
    title: "Combined reference functional evidence",
    entries: [
      {
        title: "IFN-γ ELISpot",
        figure: softwareFigure("figure-24a-combined-elispot"),
      },
      {
        title: "Target-cell killing",
        figure: softwareFigure("figure-24b-combined-target-killing"),
      },
    ],
  },
};

export const softwareJudgingCriteria: WikiJudgingCriterion[] = [
  {
    id: "software-judging-how-compatible-is-the-software-with-existing-synthetic-biology-standards-such-as-sbol-other-rfcs-and-data-formats-does-it-make-full-use-of-these-standards",
    question:
      "How compatible is the software with existing synthetic biology standards, such as SBOL, other RFCs, and data formats? Does it make full use of these standards?",
    anchorIds: [
      "how-compatible-is-the-software-with-existing-synthetic-biology-standards-such-as-sbol-other-rfcs-and-data-formats-does-it-make-full-use-of-these-standards",
    ],
    paragraphs: [
      "CircuForge supports **SBOL3, GenBank, FASTA, and JSON** for saving and transferring reviewed construct designs. SBOL3 records components, sequences, and their relationships; GenBank carries sequence features for downstream design tools; FASTA provides sequence input for further analysis; and JSON retains the application's design record. For formats that support annotations, CircuForge can also include researcher-confirmed iGEM Registry Part IDs. Format-specific readback checks compare the exported sequences and supported annotations with the source design before users continue their work.",
      "TorusFold accepts mature RNA sequences and outputs **PDB models and JSON diagnostics**. Molecular viewers and analysis scripts can read these files, allowing researchers to inspect the structures, compare modeling stages, and continue analysis in their preferred tools.",
      "See [Verifiable design exports](#cf-verified-export) and [Integration and API](#integration-api).",
    ],
  },
  {
    id: "software-judging-has-the-software-been-validated-experimentally",
    question: "Has the software been validated experimentally?",
    anchorIds: ["has-the-software-been-validated-experimentally"],
    paragraphs: [
      "CircuForge was evaluated against the experimentally tested Combined design from our TNBC project. Project screening narrowed 17 reviewed candidates to 15 retained epitopes. Wet Lab merged two overlapping pairs into continuous sequences, producing 13 coding designs that covered all 15 epitopes. IFN-γ ELISpot results guided the selection of two coding segments from each antigen source for Combined. CircuForge turned the eight experimentally selected coding segments into **a sequence-checked Combined construct design**. It assembled the segments in the researcher-confirmed order with GSGGS linkers, generated the corresponding DNA, and replaced the antigen cassette within the supplied backbone while preserving the surrounding backbone sequence. It then verified the encoded payload and checked the exported files against the generated design. This demonstrated CircuForge's ability to carry experimentally informed selections through sequence assembly, backbone integration, and verified export.",
      "We checked TorusFold's refinement settings against the L1 ribozyme structure determined by X-ray crystallography, PDB 2OIU ([Robertson and Scott, 2007](https://doi.org/10.1126/science.1136231)). After **refinement starting from the crystal coordinates**, the model had an RMSD of 1.83 Å relative to the experimental structure. This comparison checked how well the refinement procedure preserved the known crystal structure.",
      "See [Validation](#validation) for the experimental selection, reference reconstruction, and structure checks.",
    ],
  },
  {
    id: "software-judging-can-the-software-be-applied-to-other-projects",
    question: "Can the software be applied to other projects?",
    anchorIds: ["can-the-software-be-applied-to-other-projects"],
    paragraphs: [
      "Other teams can use **their own expression data, antigens, HLA settings, and backbones** in CircuForge. They can begin with expression-based target screening, a known protein, or reviewed peptides, then retain candidate sources and confirmed choices through assembly and export. For their own peptide combinations, they can inspect junction-spanning windows and request binding predictions through the configured IEDB service.",
      "TorusFold can take mature circRNA sequences from other design workflows and use overlapping fragment predictions to reconstruct circular models. Teams can use either tool independently or connect them by transferring the mature RNA sequence file. This lets them adopt the parts of the workflow that fit their research question and available inputs.",
      "See [Usage guide](#usage) and [User guidance and community reuse](#community-reuse).",
    ],
  },
  {
    id: "software-judging-how-well-does-the-software-integrate-with-external-tools-or-software-applications-including-apis-and-packages",
    question:
      "How well does the software integrate with external tools or software applications, including APIs and packages?",
    anchorIds: [
      "how-well-does-the-software-integrate-with-external-tools-or-software-applications-including-apis-and-packages",
    ],
    paragraphs: [
      "CircuForge connects **UniProt, IEDB, and the iGEM Registry** to candidate and construct review. UniProt supplies protein sequences and source records; IEDB supplies epitope predictions; and Registry review compares construct DNA with Part records and writes researcher-confirmed IDs into construct annotations. These connections carry source information into the design rather than leaving it in separate search results.",
      "TorusFold uses ViennaRNA pairing information to guide later modeling stages. It can call configured **RhoFold+, trRosettaRNA2, and RNAbpFlow** predictors to generate structures for overlapping fragments. TorusFold then aligns shared regions, reconstructs the full-length circular model, and applies physical relaxation and refinement to address fragment joins and steric clashes.",
      "Users can export mature RNA from CircuForge and provide that sequence as TorusFold input. Local APIs also expose construct compilation, junction-window enumeration, prediction submission, and job status, while standard files connect both tools to downstream applications.",
      "See [Architecture and design choices](#architecture), [External tools and models](#external-models), and [Integration and API](#integration-api).",
    ],
  },
  {
    id: "software-judging-is-the-software-easy-to-use",
    question: "Is the software easy to use?",
    anchorIds: ["is-the-software-easy-to-use"],
    paragraphs: [
      "CircuForge provides a built-in example and **a six-step browser workflow** from data preparation to downloads. Researchers can review candidates, confirm their Design Cart, assemble a payload, and generate and export a construct without writing analysis scripts. Source records, user confirmations, and task status remain visible throughout the workflow. Saved project files allow users to keep their selections and return to the design later.",
      "TorusFold's example viewer lets users rotate a saved model, change its display, and mark the circular junction without installing the prediction environment. For a new calculation, the usage guide explains sequence preparation, configuration, and run controls. Logs, stage outputs, and checkpoint information help users follow the calculation and inspect its progress.",
      "See [Usage guide](#usage) and [User guidance and community reuse](#community-reuse).",
    ],
  },
  {
    id: "software-judging-how-well-is-the-software-written-and-documented-so-future-teams-can-extend-and-improve-it",
    question:
      "How well is the software written and documented so future teams can extend and improve it?",
    anchorIds: [
      "how-well-is-the-software-written-and-documented-so-future-teams-can-extend-and-improve-it",
    ],
    paragraphs: [
      "CircuForge separates the browser interface, analysis functions, external-resource adapters, construct compiler, and exporters. Architecture diagrams and module descriptions help future teams locate the code for the capability they want to change. TorusFold documents **external-tool configuration, run entry points, checkpoints, and intermediate outputs**, allowing developers to inspect individual modeling stages and adapt their interfaces.",
      "Both projects provide source code under the Apache License 2.0, with repository examples, dependency records, running instructions, and test materials. The Wiki adds an illustrated walkthrough, API request and response examples, and downloadable reference-case files. Teams can begin with a documented example, identify the relevant module, and use the corresponding checks to assess their changes.",
      "See [Architecture and design choices](#architecture), [Installation and API](#installation), and [Open source and reuse](#open-source).",
    ],
  },
];

export const softwarePage: WikiPageContent = {
  route: "/software",
  category: "dry-lab",
  chapter: "Dry Lab / Software",
  eyebrow: "Software",
  title: "CircuForge and TorusFold",
  lede: "Designing, reviewing, exporting, and structurally inspecting circular RNA vaccine constructs.",
  boundary: "",
  visual: "software-console",
  visualLabel: "CircuForge and TorusFold",
  visualSteps: [],
  facts: [],
  sections: [
    {
      id: "software-judging",
      index: "",
      kicker: "",
      navLabel: "Judging Criteria",
      title: "Judging Criteria",
      summary: "",
      blocks: blocks([
        {
          type: "feature",
          key: "software-judging-criteria",
        },
      ]),
      anchorIds: ["judging", "judging-criteria", "1-judging"],
      hideSectionNumber: true,
    },
    {
      id: "software-overview",
      index: "1",
      kicker: "",
      navLabel: "Overview",
      title: "Overview",
      summary: "",
      blocks: blocks([
        {
          type: "prose",
          paragraphs: [
            "Designing a circular RNA (circRNA) vaccine for triple-negative breast cancer (TNBC) meant turning candidate targets and epitopes into constructs we could test in the lab. Which targets should proceed to epitope screening, and which epitopes should enter experiments? When epitopes are combined, should we also **review the new peptides formed at their junctions**? How can we ensure that the final construct sequence matches the design we have reviewed and confirmed? The information needed to answer these questions was spread across different tools. We needed to **connect target analysis, epitope prediction, sequence assembly, and experimental results**, while keeping track of each candidate’s source and the reasons for its selection.",
            "We developed CircuForge to help researchers **review candidates and turn confirmed selections into construct designs in one browser**. Its Design Cart retains selected epitopes, their sources, and the assembly order confirmed by the researcher. After combining epitopes into an open reading frame (ORF), users can check newly formed junction peptides. CircuForge then supports construct generation and export. CircuForge can also compare construct sequences with iGEM Registry Parts and add researcher-confirmed Part IDs to the construct annotations before export. For supported export formats, it reads the files back to check that the preserved sequences and annotations match the source design. In our TNBC vaccine project, this workflow provides a way to organize candidate review and reconstruct the selected coding segments of the **Combined design**.",
            "Because RNA folding can influence translation initiation, we wanted to explore the three-dimensional organization of our mature circRNA after sequence design ([Chen et al., 2021](https://doi.org/10.1016/j.molcel.2021.07.042)). Direct full-length modeling of our 2,013 nt sequence was not feasible with the prediction workflow available to us. We therefore developed TorusFold to **reconstruct and refine a full-length circular RNA model** from overlapping fragment predictions. It aligns the fragments through their shared regions and saves **intermediate structures and geometric diagnostics**, allowing researchers to inspect the modeled circular junction, fragment joins, and steric clashes, and compare structures across modeling stages.",
            "**The mature RNA sequence file connects the two tools**: users export it from CircuForge and provide it as input to TorusFold. Other teams can use either tool independently or follow this workflow with their own candidates and sequences. Both tools are released under the Apache License 2.0, with source code and running instructions available on iGEM GitLab.",
            "Source code: [CircuForge](https://gitlab.igem.org/2026/software/jlu-fbh/circuforge) · [TorusFold](https://gitlab.igem.org/2026/software/jlu-fbh/torusfold-hybrid)",
          ],
        },
        {
          type: "figure",
          asset: "figure-01-integration-overview",
        },
      ]),
      anchorIds: ["overview", "2-overview"],
    },
    {
      id: "software-usage-guide",
      index: "2",
      kicker: "",
      navLabel: "Usage guide",
      title: "Usage guide",
      summary: "",
      blocks: blocks([
        {
          type: "subheading",
          level: 3,
          id: "software-usage-guide-circuforge",
          index: "2.1",
          title: "CircuForge",
          anchorIds: ["31-circuforge"],
        },
        {
          type: "feature",
          key: "software-circuforge-video",
        },
        {
          type: "feature",
          key: "software-circuforge-guide",
        },
        {
          type: "prose",
          paragraphs: [
            "This walkthrough uses the built-in **hepatocellular carcinoma proteomics demo**. The sidebar has six steps: Prepare data, Screen targets, Select epitopes, Assemble peptides, Build construct, and Download files. Selected targets and epitopes are saved in the **Design list** for use in later steps.",
            "If you already have a target protein or candidate peptides, choose the **Target protein or Candidate peptides** entry point on Overview. The walkthrough below starts from expression data and completes a design workflow.",
          ],
        },
        {
          type: "figure",
          asset: "figure-02-candidate-workflow",
        },
        {
          type: "subheading",
          level: 4,
          id: "software-usage-guide-step-1-prepare-data",
          index: "",
          title: "Step 1. Prepare data",
          anchorIds: ["step-1-prepare-data"],
        },
        {
          type: "prose",
          paragraphs: [
            "Open **Prepare data** and click **Load demo data**, or upload your own **Expression matrix**. The software accepts CSV and XLSX files. To provide sample information, download the template and fill in **SampleID** and **Group**. Paired analysis also requires **Subject** information.",
            "Check **Assay type** and the input settings, then click **Process data**. Inspect the processing results and sample groups before continuing to Screen targets.",
          ],
        },
        {
          type: "figure",
          asset: "figure-03-prepare-data",
        },
        {
          type: "subheading",
          level: 4,
          id: "software-usage-guide-step-2-screen-and-save-targets",
          index: "",
          title: "Step 2. Screen and save targets",
          anchorIds: ["step-2-screen-and-save-targets"],
        },
        {
          type: "prose",
          paragraphs: [
            "On **Screen targets**, check the comparison design. This example uses **Unpaired**, with eight tumor samples and eight normal samples. Click **Run Differential Analysis** first. Once the analysis is complete, set the screening criteria. In this example, select **Higher in tumor**, set the minimum `|log2FC|` threshold to **1** and the FDR threshold to **0.05**, then click **Apply screening criteria**.",
            "Inspect the candidate table and the **Evidence Card** below it. Check differential expression, GTEx annotations, UniProt status, and sequence information. This example selects **P16401**. Click **Add Selected Targets to Cart** to save it in the Design list.",
          ],
        },
        {
          type: "figure",
          asset: "figure-04a-comparison-design",
        },
        {
          type: "figure",
          asset: "figure-04b-evidence-card",
        },
        {
          type: "subheading",
          level: 4,
          id: "software-usage-guide-step-3-predict-and-review-epitopes",
          index: "",
          title: "Step 3. Predict and review epitopes",
          anchorIds: ["step-3-predict-and-review-epitopes"],
        },
        {
          type: "prose",
          paragraphs: [
            "Open **Select epitopes**, choose a saved target under **Load from design list**, and click **Load target**. This example loads H1-5 / P16401. Check the **Protein sequence**. You can also enter a UniProt accession or gene name and click **Get protein sequence**.",
            "Under **Prediction settings**, set the MHC class, **Peptide Length**, and **HLA Alleles**. This example uses **MHC-I, 9 aa, and HLA-A*02:01**. Check the input that will be submitted to IEDB, then click **Predict epitopes**.",
            "When the prediction finishes, inspect fields such as Peptide, HLA allele, and **median binding percentile**. Use the column filters to narrow the candidate list. This example selects **SLVSKGTLV and ALAAGGYDV**. Click **Add to design list** to save the selected epitopes for further review and ORF assembly.",
          ],
        },
        {
          type: "figure",
          asset: "figure-05a-epitope-prediction",
        },
        {
          type: "figure",
          asset: "figure-05b-candidate-epitopes",
        },
        {
          type: "prose",
          paragraphs: [
            "Before assembly, you can click **Review human similarity** to review the selected peptides against human proteins. Select **NCBI online human BLAST**, **confirm consent to submit the selected peptides to NCBI**, and click **Start review**. Inspect the returned results and request records, then save the alignment evidence. To check results later, use the saved job ID.",
          ],
        },
        {
          type: "subheading",
          level: 4,
          id: "software-usage-guide-step-4-assemble-peptides-and-check-junctions",
          index: "",
          title: "Step 4. Assemble peptides and check junctions",
          anchorIds: ["step-4-assemble-peptides-and-check-junctions"],
        },
        {
          type: "prose",
          paragraphs: [
            "Open **Assemble peptides**, check the epitopes and their order in the current input list, enter an **ORF Name**, and choose the linkers. This example keeps the **GSGGS** setting. Click **Generate and check ORF** to generate and inspect the assembled sequence.",
            "Under **Review junction peptides**, select the HLA-I alleles, **confirm consent to submit the assembled ORF amino-acid sequence to IEDB**, and click **Run Junction MHC-I Scan**. The screenshot shows the settings and peptide windows before the scan. If the status is `not run`, start the scan, then inspect the returned results and review any flagged junction peptides.",
          ],
        },
        {
          type: "figure",
          asset: "figure-06a-assembly",
        },
        {
          type: "figure",
          asset: "figure-06b-junction-review",
        },
        {
          type: "subheading",
          level: 4,
          id: "software-usage-guide-step-5-generate-and-review-the-construct",
          index: "",
          title: "Step 5. Generate and review the construct",
          anchorIds: ["step-5-generate-and-review-the-construct"],
        },
        {
          type: "prose",
          paragraphs: [
            "Open Build construct and import your team’s backbone under Upload and Read Backbone. CircuForge accepts SnapGene `.dna`, GenBank, and backbone JSON files. Inspect the DNA construct map and choose an insertion or replacement method under Feature Map and Editing Method. Check the target feature or coordinates, strand orientation, and reading frame.",
          ],
        },
        {
          type: "figure",
          asset: "figure-07a-backbone-import",
        },
        {
          type: "prose",
          paragraphs: [
            "Click **Apply ORF and Generate New DNA Construct**, then inspect the results under Construct and checks. Review and confirm the mature circRNA region against your team’s backbone records, and retain the backbone version and confirmation record.",
            "For Registry annotations, open Registry review to query candidate Parts and compare their DNA sequences with the construct. Review the matches, confirm the selected Part IDs, and click **Write Selected IDs to Construct** to add the annotations before export.",
          ],
        },
        {
          type: "feature",
          key: "software-registry-video",
        },
        {
          type: "subheading",
          level: 4,
          id: "software-usage-guide-step-6-download-and-save-files",
          index: "",
          title: "Step 6. Download and save files",
          anchorIds: ["step-6-download-and-save-files"],
        },
        {
          type: "prose",
          paragraphs: [
            "Open **Download files**. After reviewing the construct checks, choose the files needed for your next task.",
          ],
        },
        {
          type: "table",
          headers: ["Download control", "Use"],
          rows: [
            ["Results workbook", "Save result tables for further review"],
            ["FASTA", "Continue sequence analysis"],
            [
              "GenBank, SBOL3",
              "Transfer sequences and annotations to downstream design tools",
            ],
            [
              "JSON, Validation ZIP",
              "Save construct records and verification materials",
            ],
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "For a native SnapGene DNA file, check the backbone's **Native write-back** status first. After completing Registry annotations, you can also download the corresponding Annotated files.",
          ],
        },
        {
          type: "figure",
          asset: "figure-08-downloads",
        },
        {
          type: "prose",
          paragraphs: [
            "To save your current work, open **Design list** and click **Save project**. To resume an existing project, choose the project file and click **Check and load**. **Activity** shows result status for the current session. **Service status** shows the status of computing services and external resources.",
          ],
        },
        {
          type: "subheading",
          level: 3,
          id: "software-usage-guide-torusfold",
          index: "2.2",
          title: "TorusFold",
          anchorIds: ["32-torusfold"],
        },
        {
          type: "feature",
          key: "software-torusfold-guide",
        },
        {
          type: "prose",
          paragraphs: [
            "For a first look, open the **example viewer**. Drag to rotate the saved model, change its colors and display style, and use the BSJ marking control to inspect the circular junction. Clear the marker to return to the whole-model view.",
          ],
        },
        {
          type: "feature",
          key: "software-torusfold-model",
        },
        {
          type: "prose",
          paragraphs: [
            "A full prediction starts with sequence preparation. Follow these six steps.",
          ],
        },
        {
          type: "subheading",
          level: 4,
          id: "software-usage-guide-step-1-prepare-the-mature-circrna-sequence",
          index: "",
          title: "Step 1. Prepare the mature circRNA sequence",
          anchorIds: ["step-1-prepare-the-mature-circrna-sequence"],
        },
        {
          type: "prose",
          paragraphs: [
            "Prepare your own mature circRNA sequence or use the project's 2,013 nt example sequence. Save it in the input file required by the runner. For a sequence exported from CircuForge, retain the **construct ID and sequence hash** with it.",
          ],
        },
        {
          type: "subheading",
          level: 4,
          id: "software-usage-guide-step-2-configure-the-prediction-environment",
          index: "",
          title: "Step 2. Configure the prediction environment",
          anchorIds: ["step-2-configure-the-prediction-environment"],
        },
        {
          type: "prose",
          paragraphs: [
            "Follow the installation guide to configure TorusFold, ViennaRNA, and the required external predictors. Check **predictor paths and model-weight settings** before starting the full calculation.",
          ],
        },
        {
          type: "figure",
          asset: "figure-10-one-click-setup",
        },
        {
          type: "subheading",
          level: 4,
          id: "software-usage-guide-step-3-start-the-prediction",
          index: "",
          title: "Step 3. Start the prediction",
          anchorIds: ["step-3-start-the-prediction"],
        },
        {
          type: "prose",
          paragraphs: [
            "Start the local service and submit the mature RNA, or use the sequence-running script described in the documentation. Check the **job ID or run log** to confirm that the calculation has started.",
          ],
        },
        {
          type: "figure",
          asset: "figure-11-run-console",
        },
        {
          type: "subheading",
          level: 4,
          id: "software-usage-guide-step-4-monitor-progress",
          index: "",
          title: "Step 4. Monitor progress",
          anchorIds: ["step-4-monitor-progress"],
        },
        {
          type: "prose",
          paragraphs: [
            "Check progress through the local interface or status endpoint. If a run is interrupted, follow the [reproduction guide](https://gitlab.igem.org/2026/software/jlu-fbh/torusfold-hybrid/-/blob/main/docs/REPRODUCTION_RESOURCES.md) to **inspect the saved state and resume the calculation**.",
          ],
        },
        {
          type: "figure",
          asset: "figure-12-status-panel",
        },
        {
          type: "subheading",
          level: 4,
          id: "software-usage-guide-step-5-inspect-the-model",
          index: "",
          title: "Step 5. Inspect the model",
          anchorIds: ["step-5-inspect-the-model"],
        },
        {
          type: "prose",
          paragraphs: [
            "When the run finishes, open the **final PDB** in a molecular viewer. Inspect the circular junction and the regions identified in the diagnostic files. Use the pairing diagnostics and stage structures in the output directory to compare the reconstructed and refined models.",
          ],
        },
        {
          type: "subheading",
          level: 4,
          id: "software-usage-guide-step-6-save-and-share-the-results",
          index: "",
          title: "Step 6. Save and share the results",
          anchorIds: ["step-6-save-and-share-the-results"],
        },
        {
          type: "prose",
          paragraphs: [
            "Save the **input sequence, software version, run parameters, PDB model, and diagnostic files**. Include the construct ID and sequence hash when sharing the model so the recipient can find the original design.",
          ],
        },
      ]),
      anchorIds: ["usage", "3-usage-guide"],
    },
    {
      id: "software-architecture-and-design-choices",
      index: "3",
      kicker: "",
      navLabel: "Architecture and design choices",
      title: "Architecture and design choices",
      summary: "",
      blocks: blocks([
        {
          type: "subheading",
          level: 3,
          id: "software-architecture-and-design-choices-circuforge",
          index: "3.1",
          title: "CircuForge",
          anchorIds: ["41-circuforge"],
        },
        {
          type: "prose",
          paragraphs: [
            "CircuForge organizes statistical analysis, external-data retrieval, candidate review, and sequence design around research tasks. The **Design Cart stores confirmed targets and epitopes**, connecting analysis results to later assembly.",
          ],
        },
        {
          type: "figure",
          asset: "figure-13-circuforge-modules",
        },
        {
          type: "subheading",
          level: 4,
          id: "software-architecture-and-design-choices-choice-1-a-guided-browser-workflow",
          index: "",
          title: "Choice 1. A guided browser workflow",
          anchorIds: ["choice-1-a-guided-browser-workflow"],
        },
        {
          type: "prose",
          paragraphs: [
            "We chose Shiny to put analysis tables, plots, and design controls in a browser that researchers can use directly ([Shiny documentation](https://shiny.posit.co/r/getstarted/shiny-basics/lesson1/)). limma, edgeR, and the sequence-handling and visualization packages support analysis, data processing, and result review ([Ritchie et al., 2015](https://doi.org/10.1093/nar/gkv007); [Chen et al., 2025](https://doi.org/10.1093/nar/gkaf018)).",
            "The guided workflow **reduces the need to write scripts**. We prioritized a defined sequence of research tasks so users can review results, confirm selections, and carry a design through assembly and export in one interface.",
          ],
        },
        {
          type: "subheading",
          level: 4,
          id: "software-architecture-and-design-choices-choice-2-separating-interactive-analysis-from-longer-tasks",
          index: "",
          title: "Choice 2. Separating interactive analysis from longer tasks",
          anchorIds: [
            "choice-2-separating-interactive-analysis-from-longer-tasks",
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "Longer prediction jobs need status tracking, while interactive result review needs to remain responsive. Shiny handles interactive analysis, and a local FastAPI service manages tasks that benefit from separate tracking. Docker Compose starts both services together. This makes jobs easier to track, while requiring developers to maintain two runtime environments.",
          ],
        },
        {
          type: "subheading",
          level: 4,
          id: "software-architecture-and-design-choices-choice-3-transferring-confirmed-candidates-through-the-design-cart",
          index: "",
          title:
            "Choice 3. Transferring confirmed candidates through the Design Cart",
          anchorIds: [
            "choice-3-transferring-confirmed-candidates-through-the-design-cart",
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "Candidates need to retain their peptide sequences, HLA alleles, sources, and review records as they move to the next stage. The Design Cart uses **stable IDs, deduplication, and preserved order** to transfer confirmed candidates. Project Bundles support saving and restoring work across sessions.",
            "We keep user confirmation as a separate step so software recommendations and researchers’ design decisions are recorded separately. KEEP, REVIEW, and REJECT display QC recommendations. Researchers confirm which candidates to use before proceeding to assembly.",
          ],
        },
        {
          type: "subheading",
          level: 4,
          id: "software-architecture-and-design-choices-choice-4-retaining-sources-and-retrieval-records",
          index: "",
          title: "Choice 4. Retaining sources and retrieval records",
          anchorIds: ["choice-4-retaining-sources-and-retrieval-records"],
        },
        {
          type: "prose",
          paragraphs: [
            "Candidate review draws on biological resources that return information in different formats. Source adapters organize the required fields and retain available source identifiers, request states, and raw records. Saved responses support later review, while retrieval times and refresh controls help users decide when to update the information.",
          ],
        },
        {
          type: "subheading",
          level: 4,
          id: "software-architecture-and-design-choices-choice-5-verifiable-design-exports",
          index: "",
          title: "Choice 5. Verifiable design exports",
          anchorIds: [
            "cf-verified-export",
            "choice-5-verifiable-design-exports",
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "Other software must be able to read the sequence and features correctly after export. CircuForge **reads core export formats back** and checks the information each format preserves against the source design. Format-specific verification checks sequences and supported annotations, giving researchers checked files to pass to downstream tools and collaborators.",
          ],
        },
        {
          type: "subheading",
          level: 3,
          id: "software-architecture-and-design-choices-torusfold",
          index: "3.2",
          title: "TorusFold",
          anchorIds: ["42-torusfold"],
        },
        {
          type: "prose",
          paragraphs: [
            "TorusFold organizes its modules around pairing information, fragment prediction, full-length reconstruction, and refinement. This lets long-RNA modeling run and be checked one stage at a time. Our reconstruction module uses fragment positions and shared residues to place local coordinates on the same circular RNA molecule.",
          ],
        },
        {
          type: "figure",
          asset: "figure-14-torusfold-stages",
        },
        {
          type: "subheading",
          level: 4,
          id: "software-architecture-and-design-choices-choice-1-retaining-full-sequence-pairing-information-during-fragment-modeling",
          index: "",
          title:
            "Choice 1. Retaining full-sequence pairing information during fragment modeling",
          anchorIds: [
            "choice-1-retaining-full-sequence-pairing-information-during-fragment-modeling",
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "TorusFold retains **pairing information for the whole sequence** when dividing it into fragments, so later stages can use it to model the full molecule. We integrate ViennaRNA and configurable DivideFold+ information, passing candidate base pairs and their supporting information into modeling ([Hofacker, 2003](https://doi.org/10.1093/nar/gkg599); [Omnes et al., 2026](https://doi.org/10.1016/j.jmb.2026.169865)). We retain the sources of the proposed pairs and records of which pairs were used. Researchers can compare suggestions from different sources and inspect the modeling settings.",
          ],
        },
        {
          type: "subheading",
          level: 4,
          id: "software-architecture-and-design-choices-choice-2-using-overlapping-fragments-as-alignment-references",
          index: "",
          title:
            "Choice 2. Using overlapping fragments as alignment references",
          anchorIds: [
            "choice-2-using-overlapping-fragments-as-alignment-references",
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "To let 3D prediction tools process a long input, we divide the sequence into **overlapping fragments** and use their overlaps as alignment references. The documented example runner uses a 200 nt segment setting with 30 nt overlaps. Configured predictors generate candidate structures for these fragments.",
            "The overlaps give neighboring fragments shared residues that the program uses to recover their relative positions. This alignment information comes at the cost of some repeated prediction work in the overlapping regions.",
          ],
        },
        {
          type: "subheading",
          level: 4,
          id: "software-architecture-and-design-choices-choice-3-repairing-joins-and-refining-the-reconstructed-structure",
          index: "",
          title:
            "Choice 3. Repairing joins and refining the reconstructed structure",
          anchorIds: [
            "choice-3-repairing-joins-and-refining-the-reconstructed-structure",
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "Joining fragment models requires handling fragment boundaries, circular closure, and steric clashes. TorusFold aligns shared residues and reconstructs full-length coordinates. It then uses structural constraints and physical refinement to repair joins and reduce steric clashes.",
            "We save the reconstructed coordinates and their check results so researchers can locate joins and compare structures before and after repair.",
          ],
        },
        {
          type: "subheading",
          level: 4,
          id: "software-architecture-and-design-choices-choice-4-saving-stage-results-and-checkpoints",
          index: "",
          title: "Choice 4. Saving stage results and checkpoints",
          anchorIds: ["choice-4-saving-stage-results-and-checkpoints"],
        },
        {
          type: "prose",
          paragraphs: [
            "Long-RNA modeling has several time-consuming stages. Researchers need to monitor progress and reuse completed results after an interruption. TorusFold saves **intermediate structures, diagnostic files, and checkpoints** to support stage comparisons and recovery from saved checkpoints. We allocate additional storage and file management for these records so future teams can inspect or modify individual stages.",
          ],
        },
        {
          type: "subheading",
          level: 3,
          id: "software-architecture-and-design-choices-continuing-from-construct-design-to-structural-modeling",
          index: "3.3",
          title: "Continuing from construct design to structural modeling",
          anchorIds: [
            "43-continuing-from-construct-design-to-structural-modeling",
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "Researchers pass the mature RNA file exported by CircuForge to TorusFold to model the corresponding RNA sequence. Saving the construct ID and sequence hash with the sequence links the model and its run records to the original design.",
          ],
        },
      ]),
      anchorIds: ["architecture", "4-architecture-and-design-choices"],
    },
    {
      id: "software-engineering-iterations",
      index: "4",
      kicker: "",
      navLabel: "Engineering iterations",
      title: "Engineering iterations",
      summary: "",
      blocks: blocks([
        {
          type: "subheading",
          level: 3,
          id: "software-engineering-iterations-circuforge-carrying-project-decisions-into-construct-design",
          index: "4.1",
          title: "CircuForge: carrying project decisions into construct design",
          anchorIds: [
            "51-circuforge-carrying-project-decisions-into-construct-design",
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "CircuForge V1.0 brought data import, target screening, and epitope prediction into one application. As our project moved from candidate analysis to construct design, we needed selected records, supporting evidence, and researcher decisions to remain connected through assembly and export. The following iterations turned that requirement into the V2.0 workflow.",
          ],
        },
        {
          type: "figure",
          asset: "figure-15-workflow-evolution",
        },
        {
          type: "subheading",
          level: 4,
          id: "software-engineering-iterations-iteration-1-making-candidate-identity-and-researcher-decisions-explicit",
          index: "",
          title:
            "Iteration 1. Making candidate identity and researcher decisions explicit",
          anchorIds: [
            "iteration-1-making-candidate-identity-and-researcher-decisions-explicit",
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "We presented V1.0 at an online exchange involving five iGEM teams. The exchange prompted us to reflect on how to distinguish software recommendations from researchers’ final selections. We added **stage-specific IDs and Evidence Cards** to connect candidate identities with their supporting information. KEEP, REVIEW, and REJECT present software QC recommendations, while a separate confirmation step records which candidates the researcher selects for continued design.",
          ],
        },
        {
          type: "feature",
          key: "software-implementation-1",
        },
        {
          type: "figure",
          asset: "figure-16-software-exchange",
        },
        {
          type: "subheading",
          level: 4,
          id: "software-engineering-iterations-iteration-2-preserving-confirmed-selections-in-the-design-cart",
          index: "",
          title:
            "Iteration 2. Preserving confirmed selections in the Design Cart",
          anchorIds: [
            "iteration-2-preserving-confirmed-selections-in-the-design-cart",
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "Associate Professor Qingtian Guan suggested saving selected records before taking further action. We implemented the **Design Cart** to retain confirmed targets and epitopes, compare entries, remove duplicates, and preserve their assembly order. Project Bundles save these records across sessions, allowing researchers to continue a design with its sources and confirmed selections intact.",
          ],
        },
        {
          type: "feature",
          key: "software-implementation-2",
        },
        {
          type: "figure",
          asset: "figure-17-consultation",
        },
        {
          type: "subheading",
          level: 4,
          id: "software-engineering-iterations-iteration-3-connecting-task-management-deployment-and-checked-exports",
          index: "",
          title:
            "Iteration 3. Connecting task management, deployment, and checked exports",
          anchorIds: [
            "iteration-3-connecting-task-management-deployment-and-checked-exports",
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "Professor Xiangyu Meng’s software-engineering feedback informed the separation of module responsibilities, visible status tracking for longer jobs, and runtime documentation. We separated interactive analysis from task services, provided Docker Compose startup, and added export readback checks. Task records show how requests progress, while format-specific checks verify the sequences and supported annotations delivered to downstream tools.",
          ],
        },
        {
          type: "feature",
          key: "software-implementation-3",
        },
        {
          type: "figure",
          asset: "figure-18-team-discussion",
        },
        {
          type: "prose",
          paragraphs: [
            "V2.0 combines these changes into a guided workflow from candidate review to construct export. The [reference-case evaluation](#reference-case) demonstrates how confirmed coding segments become an assembled, sequence-checked design in a supplied backbone.",
          ],
        },
        {
          type: "subheading",
          level: 3,
          id: "software-engineering-iterations-torusfold-connecting-fragment-prediction-reconstruction-and-refinement",
          index: "4.2",
          title:
            "TorusFold: connecting fragment prediction, reconstruction, and refinement",
          anchorIds: [
            "52-torusfold-connecting-fragment-prediction-reconstruction-and-refinement",
          ],
        },
        {
          type: "subheading",
          level: 4,
          id: "software-engineering-iterations-iteration-1-preparing-the-project-sequence-for-fragment-prediction",
          index: "",
          title:
            "Iteration 1. Preparing the project sequence for fragment prediction",
          anchorIds: [
            "iteration-1-preparing-the-project-sequence-for-fragment-prediction",
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "Our 2,013 nt mature circRNA required a modeling route that could use the predictors and computing resources available to us. We implemented **overlapping segmentation with recorded sequence positions**, allowing local predictions to retain their relationship to the complete RNA. Shared residues between neighboring fragments supply the alignment references for reconstruction.",
          ],
        },
        {
          type: "subheading",
          level: 4,
          id: "software-engineering-iterations-iteration-2-establishing-consistent-reconstruction-coordinates",
          index: "",
          title:
            "Iteration 2. Establishing consistent reconstruction coordinates",
          anchorIds: [
            "iteration-2-establishing-consistent-reconstruction-coordinates",
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "Full-length reconstruction requires local predictions to share a consistent coordinate system. We corrected reconstruction anchors, rebuilt local coordinate frames, and passed pairing information through the reconstruction steps. These changes connected fragment positions, alignment references, and structural constraints in the assembled model. Saved stage structures allow researchers to inspect fragment joins and compare coordinates across reconstruction and repair.",
          ],
        },
        {
          type: "feature",
          key: "software-implementation-4",
        },
        {
          type: "feature",
          key: "software-implementation-5",
        },
        {
          type: "feature",
          key: "software-implementation-6",
        },
        {
          type: "subheading",
          level: 4,
          id: "software-engineering-iterations-iteration-3-evaluating-refinement-through-structural-measurements",
          index: "",
          title:
            "Iteration 3. Evaluating refinement through structural measurements",
          anchorIds: [
            "iteration-3-evaluating-refinement-through-structural-measurements",
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "We revised the base-pair guidance parameter `K_BPP` from 600 to 13.4. A separate 200 nt fragment test recorded **a reduction in non-adjacent phosphorus-atom close-contact pairs from eight to three** across reconstruction, PPR, and Amber refinement. The 2OIU comparison checked refinement starting from crystal coordinates against the known experimental structure.",
          ],
        },
        {
          type: "feature",
          key: "software-implementation-7",
        },
      ]),
      anchorIds: ["engineering", "5-engineering-iterations"],
    },
    {
      id: "software-user-testing-and-community-reuse",
      index: "5",
      kicker: "",
      navLabel: "User testing and community reuse",
      title: "User testing and community reuse",
      summary: "",
      blocks: blocks([
        {
          type: "prose",
          paragraphs: [
            "We conducted **internal task-based user testing** of CircuForge and TorusFold. Participants were mainly team members with limited bioinformatics experience, including students from our Wet Lab and Human Practices (HP) groups. They worked through representative design and model-inspection tasks, allowing us to identify where task states, result organization, and guidance needed to be clearer. Their feedback informed the following improvements.",
          ],
        },
        {
          type: "subheading",
          level: 3,
          id: "software-user-testing-and-community-reuse-circuforge-user-testing",
          index: "5.1",
          title: "CircuForge user testing",
          anchorIds: ["61-circuforge-user-testing"],
        },
        {
          type: "prose",
          paragraphs: [
            "The CircuForge sessions followed the design workflow: importing data, reviewing a target, selecting epitopes, checking assembly order and junction peptides, generating a construct, and locating the exported files. Participants used the browser interface and Design list to carry their selections between stages.",
          ],
        },
        {
          type: "figure",
          asset: "figure-19-circuforge-user-testing",
        },
        {
          type: "prose",
          paragraphs: [
            "Participants needed clearer answers to two questions: had a submitted request finished, and which files should they save after generating a construct? We revised **task-status messages and export guidance** to distinguish submission, processing, and result review, and to connect the generated design with its downloadable files. The implementation provides job IDs and status retrieval and construct export packages with readback checks.",
          ],
        },
        {
          type: "feature",
          key: "software-implementation-8",
        },
        {
          type: "feature",
          key: "software-implementation-9",
        },
        {
          type: "prose",
          paragraphs: [
            "Follow-up sessions revisited these tasks, focusing on continuing through the workflow, identifying the returned results, and locating the corresponding exports. The V2.0 workflow keeps confirmed selections in the Design Cart and brings sequence files and validation materials together at the download step.",
          ],
        },
        {
          type: "subheading",
          level: 3,
          id: "software-user-testing-and-community-reuse-torusfold-user-testing",
          index: "5.2",
          title: "TorusFold user testing",
          anchorIds: ["62-torusfold-user-testing"],
        },
        {
          type: "prose",
          paragraphs: [
            "TorusFold testing followed the user journey from sequence preparation and task monitoring to model inspection and output retrieval. Participants worked with the project example, located model and diagnostic files, rotated the RNA structure, changed its display, and inspected the back-splice junction. Stage structures provided material for comparing reconstruction and refinement.",
          ],
        },
        {
          type: "figure",
          asset: "figure-20-torusfold-user-testing",
        },
        {
          type: "prose",
          paragraphs: [
            "Participants needed a clearer connection between the model on screen, its computational stage, and the files used for further inspection. We improved **stage-aware model viewing and progress information**: the interface displays saved stage structures and identifies the stage being viewed, while progress and checkpoint controls help users follow the calculation. The corresponding changes include stage-model display and viewer, progress, and checkpoint improvements. A dedicated demo-view control also gives first-time users a direct entry to the project model.",
          ],
        },
        {
          type: "feature",
          key: "software-implementation-10",
        },
        {
          type: "feature",
          key: "software-implementation-11",
        },
        {
          type: "prose",
          paragraphs: [
            "Follow-up testing focused on finding the final model, identifying the structures used for reconstruction–refinement comparison, and locating the circular junction. We aligned the result guidance with these tasks so users could move from model viewing to stage comparisons and diagnostic files.",
          ],
        },
        {
          type: "subheading",
          level: 3,
          id: "software-user-testing-and-community-reuse-getting-started-as-another-team",
          index: "5.3",
          title: "Getting started as another team",
          anchorIds: ["63-getting-started-as-another-team"],
        },
        {
          type: "prose",
          paragraphs: [
            "The official iGEM GitLab repositories provide source code, installation instructions, example inputs, and test materials for [CircuForge](https://gitlab.igem.org/2026/software/jlu-fbh/circuforge) and [TorusFold](https://gitlab.igem.org/2026/software/jlu-fbh/torusfold-hybrid). The [Usage guide](#usage) illustrates the browser workflows, and [Installation and API](#installation) provides the execution paths and programmatic interfaces.",
            "Teams can begin CircuForge with compatible expression data, a known protein, or reviewed peptides, then supply their own backbone for construct design. TorusFold’s [saved-model viewer](图片和附件/torusfold-example-viewer.html) provides an immediate starting point for structure inspection; teams can then configure the prediction environment for their own mature RNA sequences.",
            "Both tools can be used independently or connected through the mature RNA file. Keeping the construct ID, software version, parameters, and sequence hash with the outputs preserves the link between the reviewed design and the subsequent analysis. Standard-format exports, diagnostic files, and the [reference-case materials](#reference-case) support continued inspection, transfer, and adaptation by other researchers.",
          ],
        },
      ]),
      anchorIds: ["community-reuse", "6-user-testing-and-community-reuse"],
    },
    {
      id: "software-validation",
      index: "6",
      kicker: "",
      navLabel: "Validation",
      title: "Validation",
      summary: "",
      blocks: blocks([
        {
          type: "prose",
          paragraphs: [
            "We evaluated CircuForge against the experimentally tested Combined design and checked TorusFold through a crystal-started refinement comparison and verification of its delivered model. Together, these checks connect **experimentally informed selection, sequence-checked assembly, and inspectable computational outputs**.",
          ],
        },
        {
          type: "subheading",
          level: 3,
          id: "software-validation-from-candidate-epitopes-to-the-combined-design",
          index: "6.1",
          title: "From candidate epitopes to the Combined design",
          anchorIds: [
            "project-selection",
            "71-from-candidate-epitopes-to-the-combined-design",
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "Clinical and multi-omics evidence supported four antigen sources: TROP2, B7-H4, Nectin-4, and LIV-1. The project screened their candidate epitopes for HLA-A*02:01 using predicted BA IC50 below 500 nM and an IEDB immunogenicity score above zero. Researchers then reviewed peptide coordinates against UniProt signal-peptide and transmembrane annotations. A separate AlphaFold 3 structural assessment completed the shortlist for first-round coding.",
          ],
        },
        {
          type: "table",
          headers: [
            "Stage",
            "TROP2",
            "B7-H4",
            "Nectin-4",
            "LIV-1",
            "Total and unit",
          ],
          rows: [
            [
              "All overlapping nine-amino-acid windows",
              "315",
              "274",
              "502",
              "747",
              "1,838 candidate windows",
            ],
            [
              "Predicted BA IC50 below 500 nM",
              "17",
              "13",
              "15",
              "38",
              "83 candidate windows",
            ],
            [
              "IEDB immunogenicity score above zero",
              "9",
              "10",
              "10",
              "22",
              "51 candidate windows",
            ],
            [
              "Manual source-protein review",
              "4",
              "2",
              "6",
              "5",
              "17 candidate epitopes",
            ],
            [
              "Separate structural review",
              "4",
              "2",
              "4",
              "5",
              "15 retained epitopes",
            ],
            [
              "Overlapping pairs encoded as continuous segments",
              "3",
              "2",
              "3",
              "5",
              "13 first-round constructs",
            ],
            [
              "Modules selected for Combined",
              "2",
              "2",
              "2",
              "2",
              "8 coding segments, covering 9 predicted epitopes",
            ],
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "Structural review excluded `HILHVSFLA` and `FLAEASVRG` from first-round coding.",
            "These structure-derived measurements document the project’s candidate-review decisions. Researchers performed the AlphaFold 3 analysis separately; the experimentally selected coding segments then provide the inputs for CircuForge’s assembly evaluation below.",
          ],
        },
        {
          type: "feature",
          key: "software-validation-structure-gallery",
        },
        {
          type: "prose",
          paragraphs: [
            "Wet Lab then encoded two overlapping epitope pairs as continuous segments, **preserving all 15 retained epitopes in 13 constructs**.",
          ],
        },
        {
          type: "table",
          headers: [
            "Coding segment",
            "Original predicted epitopes",
            "Shared residues",
            "Encoded sequence",
            "Length",
          ],
          rows: [
            [
              "TROP2 CTL3",
              "`TLIYYLDEI` and `YLDEIPPKF`",
              "`YLDEI`",
              "`TLIYYLDEIPPKF`",
              "13 aa",
            ],
            [
              "Nectin4 CTL1",
              "`FQARLRLRV` and `RLRVLVPPL`",
              "`RLRV`",
              "`FQARLRLRVLVPPL`",
              "14 aa",
            ],
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "Within each antigen group, first-round IFN-γ ELISpot counts provided a within-run ranking for selecting two coding segments for Combined. The resulting eight-segment design includes the merged Nectin4 CTL1 sequence and therefore covers nine original predicted epitopes. Sequencing, protein-expression, and subsequent functional assays provided biological evidence for the Wet Lab Combined construct. CircuForge carried the selected coding design through the assembly, backbone-integration, and export checks described below.",
          ],
        },
        {
          type: "figure",
          asset: "figure-22-first-round-elispot",
        },
        {
          type: "prose",
          paragraphs: [
            "The [candidate-to-coding index](evidence/candidate-to-coding-index.csv) records source coordinates, peptide identities, sequence hashes, and the documented construct assignments. The [Combined reference fragments](evidence/combined-reference-fragments.csv) identify the eight selected segments and their order in the supplied reference. Scientific selection and experimental procedures are described on our [Model](https://2026.igem.wiki/jlu-fbh/model), [Engineering](https://2026.igem.wiki/jlu-fbh/engineering), [Experiments](https://2026.igem.wiki/jlu-fbh/experiments), and [Results](https://2026.igem.wiki/jlu-fbh/results) pages.",
          ],
        },
        {
          type: "subheading",
          level: 3,
          id: "software-validation-sequence-checked-assembly-and-export-of-combined",
          index: "6.2",
          title: "Sequence-checked assembly and export of Combined",
          anchorIds: [
            "reference-case",
            "72-sequence-checked-assembly-and-export-of-combined",
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "CircuForge turned the eight selected coding segments into **an assembled, sequence-checked construct in the supplied backbone**. Using the 5,267 bp Combined reference plasmid, the compiler joined the segments in their recorded order with seven GSGGS linkers, generated the coding DNA, and replaced the 336 bp antigen-cassette interval at bases 1606–1941 (one-based, inclusive). The checks confirmed the payload translation, linker arrangement, surrounding backbone, and exported design files.",
          ],
        },
        {
          type: "table",
          headers: ["Check", "Recorded result", "What this establishes"],
          rows: [
            [
              "Segment identity and order",
              "All eight segment translations and their order match",
              "The selected coding design is retained at protein level",
            ],
            [
              "Payload and linkers",
              "336 nt; 112 aa, including seven GSGGS linkers",
              "Coding length and linker arrangement match the reference",
            ],
            [
              "Surrounding backbone",
              "4,931 bp outside the edited interval unchanged",
              "The edit is confined to the designated cassette",
            ],
            [
              "Full fusion translation",
              "Matches the reference; no internal stop reported",
              "The recorded fusion coding frame is retained",
            ],
            [
              "DNA generation",
              "54 synonymous codon changes; 67 nucleotide differences",
              "Recoding preserves the encoded protein",
            ],
            [
              "JSON, FASTA, GenBank, and SBOL3 readback",
              "Eight recorded DNA-export checks passed",
              "The tested sequence and identity fields survive export and readback",
            ],
            [
              "Native SnapGene file readback",
              "DNA and 15 generated segment/linker features passed",
              "The generated sequence and feature locations are retained in the file",
            ],
            [
              "Evidence archive",
              "Eleven packaged files match their SHA-256 inventory",
              "The downloadable evidence files retain their recorded identities",
            ],
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "The DNA reference-case records identify compiler `CIRCURE-CONSTRUCT-2.3.0`, exporter `CIRCURE-EXPORT-2.2.0`, and R 4.5.3. The local compiler call took 1.61 s. The resulting design preserves the selected protein sequence while generating a synonymous DNA realization; further codon-optimization options are discussed in [Future improvements](#future-improvements).",
            "The downloadable [reference-case evidence](evidence/reference-case-evidence.zip) contains reference and generated sequences, comparison tables, and a standalone archived-file verifier. These materials let other teams inspect the edit and check the recorded sequence relationships directly.",
          ],
        },
        {
          type: "subheading",
          level: 4,
          id: "software-validation-biological-evidence-for-the-reference-design",
          index: "",
          title: "Biological evidence for the reference design",
          anchorIds: ["biological-evidence-for-the-reference-design"],
        },
        {
          type: "prose",
          paragraphs: [
            "The molecular and functional results below characterize the **Wet Lab Combined reference whose selected coding design CircuForge reconstructed**. BSJ sequencing identifies the circular RNA junction, and anti-FLAG immunoblotting detects protein expression. These assays establish the biological context of the reference design; the sequence comparison and export checks above measure the software’s reconstruction of that design.",
          ],
        },
        {
          type: "feature",
          key: "software-validation-molecular-gallery",
        },
        {
          type: "prose",
          paragraphs: [
            "Second-round IFN-γ ELISpot and MDA-MB-231 killing assays connect the selected multi-segment reference design to immune and target-cell responses. The figures retain the Blank, single-segment, dual-segment, and Combined comparisons used to evaluate that experimental design.",
          ],
        },
        {
          type: "feature",
          key: "software-validation-functional-gallery",
        },
        {
          type: "subheading",
          level: 3,
          id: "software-validation-linking-the-reference-construct-to-the-rna-model-input",
          index: "6.3",
          title: "Linking the reference construct to the RNA-model input",
          anchorIds: [
            "73-linking-the-reference-construct-to-the-rna-model-input",
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "We compared reference plasmid bases 723–2735 with TorusFold’s saved 2,013 nt input. After removing whitespace, uppercasing, and converting T to U, the two sequences **matched exactly**, with zero position differences and no rotation or reversal. Both have the normalized RNA SHA-256:",
          ],
        },
        {
          type: "code",
          language: "text",
          code: "c7836a9fbef98d66e97d72286b6b788055679e06fe6c23bbd18c51f94ab73753",
        },
        {
          type: "prose",
          paragraphs: [
            "The [comparison record](evidence/handoff-sequence-comparison.json) and [reference-region FASTA](evidence/reference-mature-region.fasta) establish the sequence correspondence between the supplied reference plasmid region and the saved model input. This check identifies the RNA sequence represented by that model. Any recoded design must be linked to its own RNA sequence and model run.",
          ],
        },
        {
          type: "subheading",
          level: 3,
          id: "software-validation-torusfold-refinement-and-delivered-model-verification",
          index: "6.4",
          title: "TorusFold refinement and delivered-model verification",
          anchorIds: [
            "torusfold-validation",
            "74-torusfold-refinement-and-delivered-model-verification",
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "**Crystal-started refinement check.** We checked TorusFold’s refinement settings against the L1 ribozyme structure determined by X-ray crystallography, PDB 2OIU ([Robertson and Scott, 2007](https://doi.org/10.1126/science.1136231)). After refinement starting from the crystal coordinates, the repository reports an RMSD of **1.83 Å** relative to the experimental structure. This refinement preservation check provides a reference for calibrating the settings against a known starting structure.",
            "**Inspectable model delivery.** The repository supplies the 2,013 nt input sequence, PDB coordinates, an interactive viewer, and provenance records for the saved PPR-repaired stage. Researchers can inspect the model, locate the circular junction, and relate the coordinates to the recorded sequence and computational stage.",
            "We verified the delivered artifacts with NumPy 2.3.5. The original-LF sequence reproduced 20/32 checks; the Windows-CRLF sequence reproduced 19/32.",
          ],
        },
        {
          type: "table",
          headers: [
            "Sequence-file representation",
            "Checks reproduced",
            "Failed assertions",
            "Exit status",
          ],
          rows: [
            ["Original LF bytes", "20/32", "12", "1"],
            ["Windows-converted CRLF bytes", "19/32", "13", "1"],
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "The extra CRLF failure is the file-byte hash; the normalized nucleotide sequence is unchanged. The twelve shared failures concern the recorded `intra_pc` statistic across twelve runs. The [verification log](evidence/torusfold-headline-LF.log) retains those failures and the additional coordinate diagnostics, while the [resource notes](evidence/torusfold-resource-notes.md) identify the saved measurements. Metric reconciliation and sequence-to-structure benchmarking are priorities in [Future improvements](#future-improvements).",
          ],
        },
        {
          type: "subheading",
          level: 3,
          id: "software-validation-software-checks-and-measured-execution",
          index: "6.5",
          title: "Software checks and measured execution",
          anchorIds: ["75-software-checks-and-measured-execution"],
        },
        {
          type: "prose",
          paragraphs: [
            "The recorded evaluation yielded **32/32 passing CircuForge API tests** and **17/17 passing archived-file consistency checks**. The API suite exercised local API behavior in an isolated Python 3.13.7 environment using offline fixtures and test doubles. The archived-file check independently examined the supplied sequences, coding relationships, archive integrity, and reference-to-model input match. These are separate evaluations with their own recorded scopes.",
          ],
        },
        {
          type: "table",
          headers: ["Evaluation", "Recorded result", "Evidence"],
          rows: [
            [
              "CircuForge API behavior",
              "32 passed; 0 failed",
              "[Verification summary](evidence/wiki-verification-summary.json)",
            ],
            [
              "Archived reference-file consistency",
              "17 passed; 0 failed",
              "[File-check results](evidence/reference-file-verification.json)",
            ],
            [
              "TorusFold delivered-artifact verification",
              "Original LF: 20 reproduced; 12 failed",
              "[Full verification log](evidence/torusfold-headline-LF.log)",
            ],
          ],
        },
        {
          type: "table",
          headers: ["Task", "Recorded measurement", "Measurement scope"],
          rows: [
            [
              "CircuForge reference-case compilation",
              "1.61 s; R 4.5.3 on the recorded Windows environment",
              "One local compiler call; import, external prediction, Registry access, export, and browser interaction are outside this timing",
            ],
            [
              "TorusFold recorded CPU run",
              "Approximately 7 h; approximately 30 GB peak RAM on AMD Ryzen AI MAX 395",
              "Repository-reported saved run with its recorded low-configuration settings",
            ],
            [
              "TorusFold recorded GPU path",
              "Approximately 60 GB peak unified memory on the reference APU",
              "Repository-reported hardware-specific resource measurement",
            ],
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "Run versions, environments, and check results are retained in the [verification summary](evidence/wiki-verification-summary.json) and [reference-case provenance](evidence/reference-case-provenance.json). Current-version end-to-end benchmarking is included in the improvement plan below.",
          ],
        },
      ]),
      anchorIds: ["validation", "7-validation"],
    },
    {
      id: "software-installation-and-api",
      index: "7",
      kicker: "",
      navLabel: "Installation and API",
      title: "Installation and API",
      summary: "",
      blocks: blocks([
        {
          type: "subheading",
          level: 3,
          id: "software-installation-and-api-choose-the-task-first",
          index: "7.1",
          title: "Choose the task first",
          anchorIds: ["81-choose-the-task-first"],
        },
        {
          type: "table",
          headers: ["Task", "What is needed", "Starting point"],
          rows: [
            [
              "Use CircuForge locally",
              "Docker and Docker Compose, or the documented R/Python environments",
              "Browser interface at port 3838; local API at port 8000",
            ],
            [
              "Inspect the existing TorusFold model",
              "A modern browser",
              "Download and open the [self-contained viewer](图片和附件/torusfold-example-viewer.html)",
            ],
            [
              "Verify TorusFold artifacts",
              "Python and NumPy",
              "`python scripts/verify_headline.py`; known failures are documented in Validation",
            ],
            [
              "Compute a new TorusFold model",
              "Python 3.11+, ViennaRNA, OpenMM, configured predictors and weights; path-specific compute resources",
              "Local server or sequence runner",
            ],
          ],
        },
        {
          type: "subheading",
          level: 3,
          id: "software-installation-and-api-circuforge",
          index: "7.2",
          title: "CircuForge",
          anchorIds: ["82-circuforge"],
        },
        {
          type: "prose",
          paragraphs: [
            "Clone the [official repository](https://gitlab.igem.org/2026/software/jlu-fbh/circuforge). In its directory, start the services.",
            "Windows PowerShell:",
          ],
        },
        {
          type: "code",
          language: "powershell",
          code: "git clone https://gitlab.igem.org/2026/software/jlu-fbh/circuforge.git\nSet-Location circuforge\nCopy-Item .env.example .env\ndocker compose up --build",
        },
        {
          type: "prose",
          paragraphs: ["macOS or Linux:"],
        },
        {
          type: "code",
          language: "bash",
          code: "git clone https://gitlab.igem.org/2026/software/jlu-fbh/circuforge.git\ncd circuforge\ncp .env.example .env\ndocker compose up --build",
        },
        {
          type: "prose",
          paragraphs: [
            "Open [CircuForge](http://localhost:3838), the [API documentation](http://localhost:8000/docs) or the [OpenAPI specification](http://localhost:8000/openapi.json). Load the demo and follow the illustrated steps to check the interface. Service startup, remote prediction and construct approval are separate states. Docker startup was not independently exercised during this document revision.",
            "CircuForge commits `renv.lock` and `api/requirements.lock`. Restore the matching environment for a source installation rather than mixing package versions from another run. The API lock pins its listed packages; it does not by itself freeze all transitive packages or container images.",
          ],
        },
        {
          type: "subheading",
          level: 3,
          id: "software-installation-and-api-torusfold",
          index: "7.3",
          title: "TorusFold",
          anchorIds: ["83-torusfold"],
        },
        {
          type: "prose",
          paragraphs: [
            "The saved viewer needs no prediction installation. For a new run, follow the repository’s [deployment guide](https://gitlab.igem.org/2026/software/jlu-fbh/torusfold-hybrid/-/blob/b6c4171ee2a4d68ff69954eee90144542e5f0569/docs/DEPLOY_EXTERNAL.md) in a dedicated Python 3.11+ environment.",
            "For the core package and secondary-structure extra, the following command applies the committed constraints to the packages it installs:",
          ],
        },
        {
          type: "code",
          language: "bash",
          code: 'git clone https://gitlab.igem.org/2026/software/jlu-fbh/torusfold-hybrid.git\ncd torusfold-hybrid\npython -m pip install -c requirements.lock -e ".[ss]"\npython -m pip check',
        },
        {
          type: "prose",
          paragraphs: [
            "This prepares only that dependency layer; it does not install every predictor, optional stage or model weight. The lock records NumPy 2.4.3, SciPy 1.17.1, OpenMM 8.5.2 and ViennaRNA 2.7.2, but its GPU entries are specific to the reference ROCm/APU environment. `pyproject.toml` still leaves NumPy and SciPy unversioned, so `pip install -e .` alone does not reproduce the locked environment. Portable CPU/GPU installation profiles remain an improvement item.",
            "Configure the external paths and weights, then start the local interface:",
          ],
        },
        {
          type: "code",
          language: "bash",
          code: "python serve.py",
        },
        {
          type: "prose",
          paragraphs: [
            "Open [the local interface](http://127.0.0.1:8877), inspect tool availability and parameter settings, and then submit a sequence. For the committed sequence-running example:",
          ],
        },
        {
          type: "code",
          language: "bash",
          code: "python run_2013nt.py",
        },
        {
          type: "prose",
          paragraphs: [
            "The runner uses a local `sequence.txt` when supplied, otherwise the committed `artifacts/2013nt/sequence.txt`. Full-run configuration and resource costs differ from simply starting the web server. Successful submission or creation of an output file is not proof that all predictors or refinement stages completed. Very short debugging sequences can produce noncircular outputs; they are not reliable circular-model test cases.",
          ],
        },
        {
          type: "subheading",
          level: 3,
          id: "software-installation-and-api-integration-and-api",
          index: "7.4",
          title: "Integration and API",
          anchorIds: ["integration-api", "84-integration-and-api"],
        },
        {
          type: "table",
          headers: ["Tool", "Endpoint", "Purpose"],
          rows: [
            [
              "CircuForge",
              "`POST /v1/constructs/compile`",
              "Compile a peptide cassette, or a construct when the required backbone is supplied",
            ],
            [
              "CircuForge",
              "`POST /v1/constructs/junction-windows`",
              "Enumerate cross-boundary windows; this endpoint does not perform a remote binding prediction",
            ],
            [
              "CircuForge",
              "`GET /openapi.json`",
              "Retrieve request and response schemas",
            ],
            [
              "TorusFold",
              "`GET /api/schema`",
              "Inspect supported parameters and defaults",
            ],
            [
              "TorusFold",
              "`POST /api/predict`",
              "Submit a sequence to the configured prediction environment",
            ],
            [
              "TorusFold",
              "`GET /api/status`",
              "Inspect current progress and result/error state",
            ],
          ],
        },
        {
          type: "subheading",
          level: 4,
          id: "software-installation-and-api-circuforge-successful-cassette-request",
          index: "",
          title: "CircuForge: successful cassette request",
          anchorIds: ["circuforge-successful-cassette-request"],
        },
        {
          type: "prose",
          paragraphs: [
            "This request uses two demonstration peptides; it is unrelated to the TNBC experimental shortlist. The endpoint chooses the linker for the adjacent MHC classes, as described in its schema.",
          ],
        },
        {
          type: "code",
          language: "bash",
          code: 'curl -X POST http://localhost:8000/v1/constructs/compile \\\n  -H "Content-Type: application/json" \\\n  -d \'{"project_id":"demo-project","construct_name":"TROP2_demo","epitopes":[{"id":"EPI-001","sequence_aa":"SLYNTVATL","mhc_class":"I"},{"id":"EPI-002","sequence_aa":"KLTQDLFL","mhc_class":"II"}],"linkers":{"mhci":"AAY","mhcii":"GPGPG"}}\'',
        },
        {
          type: "prose",
          paragraphs: [
            'The no-backbone example returns HTTP 200 and `release_status: "CASSETTE_ONLY_BACKBONE_NOT_PROVIDED"`. Its `orf_aa` is `SLYNTVATLGPGPGKLTQDLFL`. This is a cassette response, not an approved complete plasmid. Supply the backbone fields described in OpenAPI to request construct compilation.',
          ],
        },
        {
          type: "subheading",
          level: 4,
          id: "software-installation-and-api-circuforge-rejected-input",
          index: "",
          title: "CircuForge: rejected input",
          anchorIds: ["circuforge-rejected-input"],
        },
        {
          type: "code",
          language: "bash",
          code: 'curl -X POST http://localhost:8000/v1/constructs/compile \\\n  -H "Content-Type: application/json" \\\n  -d \'{"project_id":"demo-project","construct_name":"invalid-demo","epitopes":[{"id":"bad","sequence_aa":"SLYNTVAX","mhc_class":"I"}]}\'',
        },
        {
          type: "prose",
          paragraphs: [
            'The invalid amino-acid letter causes HTTP 422 with `error.code: "REQUEST_VALIDATION_FAILED"`. Save the full response rather than interpreting an absent construct as a completed design. The [API example files](evidence/api-examples.json) retain requests and observed response summaries for this revision.',
          ],
        },
        {
          type: "subheading",
          level: 4,
          id: "software-installation-and-api-torusfold-inspect-and-submit",
          index: "",
          title: "TorusFold: inspect and submit",
          anchorIds: ["torusfold-inspect-and-submit"],
        },
        {
          type: "prose",
          paragraphs: [
            'Inspect `/api/schema` before building a request. A configured `/api/predict` request takes a plain mature RNA string in `sequence` and returns a job ID with `status: "started"` when accepted. Poll `/api/status`; acceptance is not completion. An empty request returns HTTP 400 with `{"error":"No sequence provided"}`. This error path can be inspected without launching an expensive prediction.',
            "The [server source](https://gitlab.igem.org/2026/software/jlu-fbh/torusfold-hybrid/-/blob/b6c4171ee2a4d68ff69954eee90144542e5f0569/serve.py) defines the exact behavior. In this revision, schema retrieval and idle-status retrieval returned HTTP 200, and the empty request returned HTTP 400 as described; [the check record](evidence/torusfold-api-checks.json) identifies the scope. No new prediction was submitted, and a short arbitrary sequence is not presented as a successfully validated circRNA model.",
          ],
        },
        {
          type: "subheading",
          level: 3,
          id: "software-installation-and-api-network-modes",
          index: "7.5",
          title: "Network modes",
          anchorIds: ["85-network-modes"],
        },
        {
          type: "prose",
          paragraphs: [
            "CircuForge’s `CIRCURE_NETWORK_MODE` accepts `auto`, `online` or `offline`; the default is `auto`. Offline mode disables new IEDB and NCBI requests. Saved data and local compilation have different prerequisites from fresh remote results. Check Service status and retain the run’s request, model settings and returned output. A timeout, missing prediction or queued job is not a negative biological result.",
          ],
        },
      ]),
      anchorIds: ["installation", "8-installation-and-api"],
    },
    {
      id: "software-future-improvements",
      index: "8",
      kicker: "",
      navLabel: "Future improvements",
      title: "Future improvements",
      summary: "",
      blocks: blocks([
        {
          type: "prose",
          paragraphs: [
            "Our next steps focus on helping researchers turn reviewed vaccine designs into experimental constructs and explore RNA structure with clearer guidance. Building on our project experience and internal user feedback, we plan to develop the following features.",
            "**Optimize codons for the intended expression host.** We plan to let researchers choose their expression host and optimize the DNA encoding their selected peptide combination while keeping the amino-acid sequence unchanged. CircuForge would consider codon preferences, GC content, and restriction sites specified by the user. Researchers could compare the original and optimized sequences before choosing the DNA for their experiments.",
            "**Review epitopes in their biological context.** We plan to show each peptide’s position on its source protein alongside signal-peptide and transmembrane regions. Researchers could inspect these regions while choosing epitopes and save the reason for each selection or exclusion. Saved screening conditions would also make it easier to repeat a defined selection procedure with another antigen or HLA background.",
            "**Improve NCBI searches for human-protein similarity review.** We plan to improve how CircuForge submits NCBI BLASTP searches and retrieves their results, reducing repeated requests and making long waits easier to follow. Users would see whether a search has been submitted, is still running, or has finished, and could reopen saved matches without submitting the same search again. Clearer handling of interruptions and timeouts would help researchers continue reviewing peptide similarities to human proteins without restarting every step.",
            "**Make RNA structures easier to assess.** We plan to give clearer explanations of fragment joins, close contacts between atoms, proposed base pairs, and changes during refinement. Measurements in the viewer and downloadable reports would use consistent definitions and be checked against the saved structures. We also plan to test predictions on RNAs with experimentally determined structures, allowing researchers to assess how closely the predicted models match those structures. This would extend the current check of how refinement preserves a known starting structure.",
            "**Help more teams run and use the tools.** We plan to provide simpler installation options, more small examples, and a complete demonstration from input preparation to result interpretation. For TorusFold, measurements across RNA lengths and computers would help teams estimate the time and memory needed for their own sequences. Further testing with researchers who have limited bioinformatics experience will cover installation, construct design, viewing saved models, and running new predictions. Their feedback will help us improve the steps that most affect practical use.",
          ],
        },
      ]),
      anchorIds: ["future-improvements", "9-future-improvements"],
    },
    {
      id: "software-open-source-and-reuse",
      index: "9",
      kicker: "",
      navLabel: "Open source and reuse",
      title: "Open source and reuse",
      summary: "",
      blocks: blocks([
        {
          type: "prose",
          paragraphs: [
            "CircuForge and TorusFold are released under **Apache License 2.0**, making their source code available for other teams to use, modify, and extend under the license terms. The official iGEM GitLab repositories provide the code, README, installation instructions, examples, and test materials needed to begin. Teams can use either tool independently or connect construct design with RNA modeling through the mature RNA sequence file.",
          ],
        },
        {
          type: "table",
          headers: ["Tool", "Source and documentation", "License"],
          rows: [
            [
              "CircuForge",
              "[Repository and README](https://gitlab.igem.org/2026/software/jlu-fbh/circuforge) · [Setup and use](#installation)",
              "[Apache-2.0](https://gitlab.igem.org/2026/software/jlu-fbh/circuforge/-/blob/main/LICENSE)",
            ],
            [
              "TorusFold",
              "[Repository and README](https://gitlab.igem.org/2026/software/jlu-fbh/torusfold-hybrid) · [Setup and use](#installation)",
              "[Apache-2.0](https://gitlab.igem.org/2026/software/jlu-fbh/torusfold-hybrid/-/blob/main/LICENSE)",
            ],
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "**Adapt the workflow to another biological project.** Researchers can begin CircuForge with the built-in example, then work with their own candidate proteins, reviewed peptides, and construct backbones. Teams extending the code can add another biological resource, change candidate-selection rules, or introduce another export format. The separate candidate-review, assembly, and export modules provide clear places to make those changes.",
            "**Build on the RNA-modeling workflow.** TorusFold connects fragment predictions, full-length reconstruction, refinement, and result inspection through separate stages. Teams can configure supported predictors, examine intermediate structures, and modify the stages relevant to their research question. The [saved-model viewer](图片和附件/torusfold-example-viewer.html) offers an immediate starting point for structure inspection; the [installation guide](#installation) describes the tools and computing setup for running new sequences.",
          ],
        },
        {
          type: "subheading",
          level: 3,
          id: "software-open-source-and-reuse-external-tools-models-and-attribution",
          index: "9.1",
          title: "External tools, models and attribution",
          anchorIds: [
            "external-models",
            "external-tools-models-and-attribution",
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "Our software connects established biological resources and prediction tools with the candidate-review and reconstruction methods developed by our team. The resources below support data retrieval, configurable RNA prediction, refinement, and visualization.",
          ],
        },
        {
          type: "table",
          headers: [
            "Resource",
            "Contribution to the workflow",
            "Source and reuse information",
          ],
          rows: [
            [
              "[IEDB](https://www.iedb.org/), [UniProt](https://www.uniprot.org/) and [iGEM Registry](https://registry.igem.org/)",
              "Epitope predictions, source-protein annotations, and Part records",
              "Follow each resource’s data and service terms; retain available source identifiers and search settings",
            ],
            [
              "[ViennaRNA](https://www.tbi.univie.ac.at/RNA/)",
              "Proposes RNA base-pairing information",
              "Reference environment: 2.7.2; distributed under its upstream terms",
            ],
            [
              "[OpenMM](https://openmm.org/)",
              "Relaxes structures using physical restraints",
              "Reference environment: 8.5.2; keep the computing platform and settings with each run",
            ],
            [
              "[RhoFold+](https://github.com/ml4bio/RhoFold)",
              "Predicts structures for RNA fragments",
              "Code and pretrained model files are obtained from the upstream project",
            ],
            [
              "[trRosettaRNA2](https://yanglab.qd.sdu.edu.cn/trRosettaRNA/download/)",
              "Predicts structures for RNA fragments",
              "Uses the corresponding upstream code, model files, and terms",
            ],
            [
              "[RNAbpFlow](https://github.com/Bhattacharya-Lab/RNAbpFlow)",
              "Generates RNA structures using supplied conditions",
              "Pretrained model files and their terms are provided by the upstream project",
            ],
            [
              "[PyRosetta](https://www.pyrosetta.org/) and other optional stages",
              "Additional structural refinement",
              "Optional installation under the applicable upstream license",
            ],
            [
              "[3Dmol.js](https://3dmol.org/) and [pako](https://github.com/nodeca/pako)",
              "Displays saved RNA structures and decompresses viewer data",
              "The viewer is accompanied by the [3Dmol](evidence/third-party/3Dmol-LICENSE.txt) and [pako](evidence/third-party/pako-LICENSE.txt) notices",
            ],
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "Third-party software, datasets, and pretrained model files retain their own licenses. TorusFold integrates upstream predictors with our reconstruction and refinement stages; predictor authorship and training-data sources are attributed to the corresponding upstream projects. The [resource notes](evidence/torusfold-resource-notes.md) provide the available source information for the delivered example. We plan to extend future run records with the exact predictor versions and pretrained model files used for each result.",
            "CircuForge’s Registry client acknowledges the request-cooldown approach used by the [iGEM Munich 2025 Registry client](https://github.com/igem-munich/igem_registry_api). The [upstream license and copyright notice](evidence/third-party/igem-munich-registry-LICENSE.txt) accompany this acknowledgement.",
            "We welcome other teams to test the examples, adapt the tools to their own projects, and share improvements through the repositories. Begin with the [Usage guide](#usage), keep the input sequence and software version with the results, and use the repository issue trackers to report problems or suggest features. The official project page is [2026.igem.wiki/jlu-fbh/software](https://2026.igem.wiki/jlu-fbh/software).",
          ],
        },
      ]),
      anchorIds: ["open-source", "10-open-source-and-reuse"],
    },
    {
      id: "software-references",
      index: "10",
      kicker: "",
      navLabel: "References",
      title: "References",
      summary: "",
      blocks: blocks([
        {
          type: "feature",
          key: "software-references",
        },
      ]),
      anchorIds: ["references"],
    },
  ],
  links: [
    { path: "/model", label: "Computational Biophysics" },
    { path: "/hardware", label: "CirCore Hardware Device" },
    { path: "/design", label: "Construct Architecture" },
    { path: "/contribution", label: "Open-Source Repository" },
  ],
  next: {
    path: "/hardware",
    label: "Hardware",
    title: "When In Silico Code Meets Physical Matter",
    description: "Software designs the sequence, but bench manufacturing demands precise physical control. Discover CirCore: our custom automated microfluidic reactor for circRNA synthesis.",
  },
};
