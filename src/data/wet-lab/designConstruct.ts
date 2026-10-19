/**
 * Pure data for the `pCirCure-circMEV` construct architecture viewer.
 *
 * Lifted verbatim from the team's `construct-architecture.html` delivery by
 * `scripts/extract-design-construct.py`: the 5,267 bp template sequence, the 34
 * annotated elements, the 7 unique cutters and the element-category palette.
 * Every `description` / `name` string carries the author's original inline
 * markup (italicised gene names, monospaced peptide runs) and is rendered as
 * such by the viewer — these are build-time constants, never user input.
 *
 * No React, no JSX: coordinates here are the single source of truth for both
 * the circular map and the sequence browser.
 */

export interface ConstructElement {
  id: string;
  /** Full element name, may carry inline `<em>` / `<span class="cc-aa">` markup. */
  name: string;
  /** Compact label used on the map and on sequence feature bars. */
  shortLabel: string;
  /** 1-based first base, inclusive. */
  start: number;
  /** 1-based last base, inclusive. */
  end: number;
  /** +1 sense, -1 antisense. */
  strand: number;
  category: ConstructCategoryKey;
  /** iGEM Registry part number, when the element is registered. */
  partBba: string | null;
  description: string;
}

export interface ConstructSite {
  id: string;
  name: string;
  /** Recognition sequence, e.g. `ACCGGT`. */
  recognition: string;
  start: number;
  end: number;
  /** Last base before the staggered cut on the top strand. */
  cut: number;
  /** Last base before the staggered cut on the bottom strand. */
  cutBottom: number;
  note: string;
}

export type ConstructCategoryKey =
  | "cassette"
  | "circ"
  | "trans"
  | "epitope"
  | "linker"
  | "adjuvant"
  | "traffic"
  | "tag"
  | "utr"
  | "backbone"
  | "site";

/** Element-category palette: pastel fill + outline, plus the legend name. */
export interface ConstructCategory {
  key: ConstructCategoryKey;
  fill: string;
  stroke: string;
  label: string;
}

export const constructCategories: readonly ConstructCategory[] = [
  {
    key: "cassette",
    fill: "#EFC4BF",
    stroke: "#C98D85",
    label: "Precursor cassette",
  },
  {
    key: "circ",
    fill: "#A9DBD3",
    stroke: "#5FA79C",
    label: "PIE circularisation",
  },
  {
    key: "trans",
    fill: "#FBE4AD",
    stroke: "#D3AC58",
    label: "Translation control",
  },
  { key: "epitope", fill: "#CFBCEA", stroke: "#9579C9", label: "CTL epitope" },
  { key: "linker", fill: "#C4E6EF", stroke: "#7FB9C9", label: "Linker" },
  {
    key: "adjuvant",
    fill: "#BCE3BF",
    stroke: "#75B37B",
    label: "Molecular adjuvant",
  },
  { key: "traffic", fill: "#B4CCEE", stroke: "#7196C9", label: "Trafficking" },
  { key: "tag", fill: "#F2C7DA", stroke: "#CC8CAC", label: "Detection tag" },
  { key: "utr", fill: "#F9CFAB", stroke: "#D59A63", label: "UTR / processing" },
  {
    key: "backbone",
    fill: "#D8DFE7",
    stroke: "#A3AFBC",
    label: "Vector backbone",
  },
  {
    key: "site",
    fill: "#CCE3F6",
    stroke: "#2E7BC4",
    label: "Restriction site",
  },
];

export const constructCategoryByKey = Object.fromEntries(
  constructCategories.map((category) => [category.key, category]),
) as Record<ConstructCategoryKey, ConstructCategory>;

export const constructMeta = {
  name: "pCirCure-circMEV",
  length: 5267,
  topology: "circular",
  backbone: "pUC57",
} as const;

/** Overview copy shown in the element-function panel when nothing is selected. */
export const constructOverview =
  "<em>pCirCure-circMEV</em> is a 5,267 bp pUC57-based transcription template. Linearised at NotI and transcribed with T7 RNA polymerase, it yields a precursor that circularises itself through permuted intron–exon splicing of the T4 <em>td</em> group I intron. The resulting circRNA carries synIRES-RC25 driving a single polyprotein, read in this order: the tPA secretion leader, eight HLA-A*02:01-restricted TNBC CTL epitopes joined by GSGGS linkers, the 4× mC3d-P28 adjuvant, the MHC class I trafficking domain, and a C-terminal FLAG tag. Elements carrying a BBa number are registered in the iGEM Registry; click one to open its Registry page.";

export const constructSequence =
  "TCGCGCGTTTCGGTGATGACGGTGAAAACCTCTGACACATGCAGCTCCCGGAGACGGTCACAGCTTGTCTGTAAGCGGATGCCGGGAGCAGACAAGCCCGTCAGGGCGCGTCAGCGGGTGTTGGCGGGTGTCGGGGCTGGCTTAACTATGCGGCATCAGAGCAGATTGTACTGAGAGTGCACCATATGCGGTGTGAAATACCGCACAGATGCGTAAGGAGAAAATACCGCATCAGGCGCCATTCGCCATTCAGGCTGCGCAACTGTTGGGAAGGGCGATCGGTGCGGGCCTCTTCGCTATTACGCCAGCTGGCGAAAGGGGGATGTGCTGCAAGGCGATTAAGTTGGGTAACGCCAGGGTTTTCCCAGTCACGACGTTGTAAAACGACGGCCAGTGAATTCGGCCAGTGAATTGTAATACGACTCACTATAGGGGTTAACAAAAAAAAAAAAAAAAAAAAAAAATCACCGACCGATCTATCTGAACCGGTGGGAATTCTAGAGAAAATTTCGTCTGGATTAGTTACTTATCGTGTAAAATCTGATAAATGGAATTGGTTCTACATAAATGCCTAACGACTATCCCTTTGGGGAGTAGGGTCAAGTGACTCGAAACGATAGACAACTTGCTTTAACAAGTTGGAGATATAGTCTGCTCTGCATGGTGACATGCAGCTGGATATAATTCCGGGGTAAGATTAACGACCTTATCTGAACATAACGCTACCGTTTAATATTGCGTCATATTCGGCGACCATTTGTGTGGTAAAAAAAAAAAACCAAAAAAAAAAAACAAAAAAAAAAAATAATTGACTAAGATATCTTAAAACAGCGGATGGGTACCCCACCATCCGACCCACTGGGTGTAGTACTCTGGTACTTCGTACCTTTGTACGCCTGTTCTTCCCATTGTACCCTTCCTGAACTTCCAACCCAAGTAACGTTAGAAGCTCAACATTTAGTACAACAGGAAGCACCACATCCAGTGGTGTTTAGTACAAGCACTTCTGTTTCCCCGGAGCGAGGTATAGGCTGTACCCACTGCCAAAAACCTTTAACCGTTATCCGCCAACCAACTACGTAAAAGCTAGTAGTATTATGTTTTTAACTAGGCGTTCGATCAGGTGGATTTCCCCTCCACTAGTTTGGTCGATGAGGCTAGGAATTCCCCACGGGTGACCGTGTCCTAGCCTGCGTGGCGGCCAACCCAGCCCACTCACTATTTGTTTTCGCGCCCAGTTGCAAAAAGTGTCGGGGCTGGGACGCCTTTTTATAGACATGGTGTGAAGACTCGCATGTGCTTGGTTGTGATTCCTCCGGCCCCTGAATGCGGCTAACCTTAACCCTGGAGCCTTGTGTCACAAACCAGTGATGATAAGGTCGTAATGAGCAATTCCGGGACGGGACCGACTACTTTGGGTGTCCGTGTTTCTTATTTTTCTTATTATTGTCTTATGGTCACAGCATATATATAACATATACTGTGATCATGGCTAGCGCCACCATGGATGCAATGAAGAGAGGGCTCTGCTGTGTGCTGCTGCTGTGTGGAGCAGTCTTCGTTTCGCCCAGCCAGGAAATCCATGCCCGATTCAGAAGAGGATCCAGTGTGTGTTGGTGCGTTAACTCAGTTGGCAGCGGCGGAAGTAGATTGTTCCGCGAGAGATATCGGCTGGGCAGCGGTGGCAGTTGGCTGAAAGAGGGTGTGCTCGGACTCGGTAGTGGTGGTAGCGCCGTGTTTGCCGACCAGGTGATCGTGGGAAGTGGAGGTAGCTTTCAGGCGAGGCTTCGCTTGCGCGTACTCGTTCCACCCCTGGGATCTGGCGGCTCTGCTGTGACTTCCGAGTTCCACCTGGTTGGCAGCGGTGGCAGCGGTGTGGCCACTCTTGCCTGGATGGTGGGCTCCGGCGGCAGTGGCCTCCATAACTTCTCAGACGGTCTGGGCAGCGGAGGCAGCCTCGAGAAGTTTCTGAACACAGCCAAAGATCGGAACCGCTGGGAGGAGCCTGACCAGCAGCTCTACAACGTAGAGGCCACATCCTACGCCCTCCTGGGCTCCGGCGGTAGCAAGTTTCTGAACACAGCCAAAGATCGGAACCGCTGGGAGGAGCCTGACCAGCAGCTCTACAACGTAGAGGCCACATCCTACGCCCTCCTGGGCGGAGGTGGCAGCGGCAAGTTTCTGAACACAGCCAAAGATCGGAACCGCTGGGAGGAGCCTGACCAGCAGCTCTACAACGTAGAGGCCACATCCTACGCCCTCCTGGGCTCCGGCGGTAGCAAGTTTCTGAACACAGCCAAAGATCGGAACCGCTGGGAGGAGCCTGACCAGCAGCTCTACAACGTAGAGGCCACATCCTACGCCCTCCTGGGATCTGGCGGCAGCATCGTGGGCATTGTTGCTGGCCTGGCTGTCCTAGCAGTTGTGGTCATCGGAGCTGTGGTCGCTACTGTGATGTGTAGGAGGAAGAGCTCAGGTGGAAAAGGAGGGAGCTACTCTCAGGCTGCGTCCAGCGACAGTGCCCAGGGCTCTGATGTGTCTCTCACAGCTGGTGGCTCCGATTATAAGGATGATGACGACAAGTGAATCGATGCTGGAGCCTCGGTGGCCATGCTTCTTGCCCCTTGGGCCTCCCCCCAGCCCCTCCTCCCCTTCCTGCACCCGTACCCCCGTGGTCTTTGAATAAAGTCTGAACCACACAAATGGTCGCCGACTCAGTAGATGTTTTCTTGGGTTAATTGAGGCCTGAGTATAAGGTGACTTATACTTGTAATCTATCTAAACGGGGAACCTCTCTAGTAGACAATCCCGTGCTAAATTGTAGGACTGCCCTTTAATAAATACTTCTATATTTAAAGAGGTATTTATGAAAAGCGGAATTTATCAGATTAAAAATACTTTCTCTAGAGTCGACCTGCAGACGCGTTCAGATAGATCGGTCGGTGAAAAAAAAAAAAAAAAAAAAAAAAAAGCGGCCGCCTAGCATAACCCCTTGGGGCCTCTAAACGGGTCTTGAGGGGTTTTTTGAAGCTTGGCGTAATCATGGTCATAGCTGTTTCCTGTGTGAAATTGTTATCCGCTCACAATTCCACACAACATACGAGCCGGAAGCATAAAGTGTAAAGCCTGGGGTGCCTAATGAGTGAGCTAACTCACATTAATTGCGTTGCGCTCACTGCCCGCTTTCCAGTCGGGAAACCTGTCGTGCCAGCTGCATTAATGAATCGGCCAACGCGCGGGGAGAGGCGGTTTGCGTATTGGGCGCTCTTCCGCTTCCTCGCTCACTGACTCGCTGCGCTCGGTCGTTCGGCTGCGGCGAGCGGTATCAGCTCACTCAAAGGCGGTAATACGGTTATCCACAGAATCAGGGGATAACGCAGGAAAGAACATGTGAGCAAAAGGCCAGCAAAAGGCCAGGAACCGTAAAAAGGCCGCGTTGCTGGCGTTTTTCCATAGGCTCCGCCCCCCTGACGAGCATCACAAAAATCGACGCTCAAGTCAGAGGTGGCGAAACCCGACAGGACTATAAAGATACCAGGCGTTTCCCCCTGGAAGCTCCCTCGTGCGCTCTCCTGTTCCGACCCTGCCGCTTACCGGATACCTGTCCGCCTTTCTCCCTTCGGGAAGCGTGGCGCTTTCTCATAGCTCACGCTGTAGGTATCTCAGTTCGGTGTAGGTCGTTCGCTCCAAGCTGGGCTGTGTGCACGAACCCCCCGTTCAGCCCGACCGCTGCGCCTTATCCGGTAACTATCGTCTTGAGTCCAACCCGGTAAGACACGACTTATCGCCACTGGCAGCAGCCACTGGTAACAGGATTAGCAGAGCGAGGTATGTAGGCGGTGCTACAGAGTTCTTGAAGTGGTGGCCTAACTACGGCTACACTAGAAGAACAGTATTTGGTATCTGCGCTCTGCTGAAGCCAGTTACCTTCGGAAAAAGAGTTGGTAGCTCTTGATCCGGCAAACAAACCACCGCTGGTAGCGGTGGTTTTTTTGTTTGCAAGCAGCAGATTACGCGCAGAAAAAAAGGATCTCAAGAAGATCCTTTGATCTTTTCTACGGGGTCTGACGCTCAGTGGAACGAAAACTCACGTTAAGGGATTTTGGTCATGAGATTATCAAAAAGGATCTTCACCTAGATCCTTTTAAATTAAAAATGAAGTTTTAAATCAATCTAAAGTATATATGAGTAAACTTGGTCTGACAGTTACCAATGCTTAATCAGTGAGGCACCTATCTCAGCGATCTGTCTATTTCGTTCATCCATAGTTGCCTGACTCCCCGTCGTGTAGATAACTACGATACGGGAGGGCTTACCATCTGGCCCCAGTGCTGCAATGATACCGCGAGACCCACGCTCACCGGCTCCAGATTTATCAGCAATAAACCAGCCAGCCGGAAGGGCCGAGCGCAGAAGTGGTCCTGCAACTTTATCCGCCTCCATCCAGTCTATTAATTGTTGCCGGGAAGCTAGAGTAAGTAGTTCGCCAGTTAATAGTTTGCGCAACGTTGTTGCCATTGCTACAGGCATCGTGGTGTCACGCTCGTCGTTTGGTATGGCTTCATTCAGCTCCGGTTCCCAACGATCAAGGCGAGTTACATGATCCCCCATGTTGTGCAAAAAAGCGGTTAGCTCCTTCGGTCCTCCGATCGTTGTCAGAAGTAAGTTGGCCGCAGTGTTATCACTCATGGTTATGGCAGCACTGCATAATTCTCTTACTGTCATGCCATCCGTAAGATGCTTTTCTGTGACTGGTGAGTACTCAACCAAGTCATTCTGAGAATAGTGTATGCGGCGACCGAGTTGCTCTTGCCCGGCGTCAATACGGGATAATACCGCGCCACATAGCAGAACTTTAAAAGTGCTCATCATTGGAAAACGTTCTTCGGGGCGAAAACTCTCAAGGATCTTACCGCTGTTGAGATCCAGTTCGATGTAACCCACTCGTGCACCCAACTGATCTTCAGCATCTTTTACTTTCACCAGCGTTTCTGGGTGAGCAAAAACAGGAAGGCAAAATGCCGCAAAAAAGGGAATAAGGGCGACACGGAAATGTTGAATACTCATACTCTTCCTTTTTCAATATTATTGAAGCATTTATCAGGGTTATTGTCTCATGAGCGGATACATATTTGAATGTATTTAGAAAAATAAACAAATAGGGGTTCCGCGCACATTTCCCCGAAAAGTGCCACCTGACGTCTAAGAAACCATTATTATCATGACATTAACCTATAAAAATAGGCGTATCACGAGGCCCTTTCGTC";

export const constructElements: readonly ConstructElement[] = [
  {
    id: "t7p",
    name: "T7 promoter with GGG initiator",
    shortLabel: "T7 promoter",
    start: 402,
    end: 434,
    strand: 1,
    category: "backbone",
    partBba: "BBa_26KIMH8W",
    description:
      "Promoter for in vitro transcription by T7 RNA polymerase. The 33 bp part is the 18 bp T7 consensus at 415–432 preceded by 13 bp of vector sequence and ending in the GGG at 432–434, which becomes the first three bases of the transcript. Fixing the 5′ end at GGG is what makes PIE precursor folding reproducible between batches.",
  },
  {
    id: "pie5",
    name: "PIE 5′ half — T4 <em>td</em> 3′-intron with homology arms",
    shortLabel: "PIE 5' half",
    start: 465,
    end: 766,
    strand: 1,
    category: "circ",
    partBba: "BBa_26T5SEQR",
    description:
      "The 5′ half of the permuted intron–exon circularisation system, sitting at the extreme 5′ end of the precursor. During self-splicing its 3′-half intron pairs with the 5′-half intron of BBa_26P7AUA8 to reconstitute the complete T4 <em>td</em> group I ribozyme, which joins the two flanking exons head-to-tail. The part bundles the 20 nt outer arm, the intron half and the 20 nt inner arm; the two arm pairs anneal to hold the splice sites in register.",
  },
  {
    id: "oha5",
    name: "Outer HomologyArm (5′)",
    shortLabel: "Outer HomologyArm",
    start: 465,
    end: 484,
    strand: 1,
    category: "circ",
    partBba: null,
    description:
      "20-nt arm complementary to the 3′ outer homology arm at 2,927–2,946. Base-pairing between the two outer arms folds the precursor so that the two permuted intron halves are brought into contact, which raises the self-splicing yield.",
  },
  {
    id: "scar2",
    name: "Intron Scar 2",
    shortLabel: "Intron Scar 2",
    start: 723,
    end: 746,
    strand: 1,
    category: "circ",
    partBba: null,
    description:
      "The 24 nt of the upstream intron half retained in the spliced product. In the mature circle it sits directly against Intron Scar 1 across the back-splice junction, and that scar–scar sequence is the signature read out by junction-spanning RT-PCR.",
  },
  {
    id: "iha5",
    name: "Inner HomologyArm (5′)",
    shortLabel: "Inner HomologyArm",
    start: 747,
    end: 766,
    strand: 1,
    category: "circ",
    partBba: null,
    description:
      "20-nt arm paired with the inner arm at 2,694–2,713. Once the outer arms have brought the two intron halves together, the inner pair holds the two splice sites against each other so the ribozyme assembles in the right register.",
  },
  {
    id: "pabp",
    name: "PABP-binding spacer with 3-frame stop",
    shortLabel: "PABP spacer",
    start: 767,
    end: 816,
    strand: 1,
    category: "trans",
    partBba: "BBa_260UNJNZ",
    description:
      'A 50 nt spacer between the circularisation junction and the IRES. Its A-rich segment recruits poly(A)-binding protein, mimicking closed-loop translational enhancement on a circle that has neither a cap nor a poly(A) tail. The 3-frame stop cassette at its 3′ end (<span class="cc-aa">TAATTGACTAA</span>) terminates any ribosome entering upstream of the IRES, so productive translation is restricted to IRES-directed initiation.',
  },
  {
    id: "ires",
    name: "synIRES-RC25",
    shortLabel: "synIRES-RC25",
    start: 823,
    end: 1488,
    strand: 1,
    category: "trans",
    partBba: "BBa_26DGJ5ZY",
    description:
      "Circular RNA has no 5′ cap, so translation has to be IRES-driven. synIRES-RC25 is rebuilt on a CVB3 / HRV-2 type I–II IRES scaffold: long stem-loops that hinder circularisation are shortened, and an eIF4G-binding aptamer is embedded in domain V so that the eIF4G–eIF4A complex is recruited directly upstream of the start codon.",
  },
  {
    id: "apt",
    name: "Apt-eIF4G",
    shortLabel: "Apt-eIF4G",
    start: 1214,
    end: 1253,
    strand: 1,
    category: "trans",
    partBba: "BBa_26X4AOBB",
    description:
      "A 40 nt RNA aptamer binding the HEAT-1 domain of eIF4G. As a stand-alone element it can recruit eIF4G–eIF4A to any circular or linear RNA, bypassing the eIF4E–cap requirement. Here it is not inserted separately but embedded inside domain V of synIRES-RC25.",
  },
  {
    id: "kozak",
    name: "Kozak sequence",
    shortLabel: "Kozak",
    start: 1498,
    end: 1507,
    strand: 1,
    category: "trans",
    partBba: null,
    description:
      "Vertebrate consensus context for strong translation initiation. The ATG at 1,504–1,506 opens the vaccine polyprotein.",
  },
  {
    id: "tpa",
    name: "tPA signal and pro-peptide leader",
    shortLabel: "tPA leader",
    start: 1504,
    end: 1599,
    strand: 1,
    category: "traffic",
    partBba: "BBa_26H5MIQD",
    description:
      'The 32-residue signal peptide plus pro-peptide of human tissue plasminogen activator (<span class="cc-aa">MDAMKRGLCCVLLLCGAVFVSPSQEIHARFRR</span>). Placed at the 5′ end of the antigen cassette, it takes the nascent polypeptide into the ER–Golgi pathway; the MITD at the other end of the cassette then holds it in the MHC trafficking compartments rather than letting it leave the cell.',
  },
  {
    id: "ep1",
    name: "TROP2 CTL epitope SVCWCVNSV",
    shortLabel: "TROP2 CTL1",
    start: 1606,
    end: 1632,
    strand: 1,
    category: "epitope",
    partBba: "BBa_2615OQ94",
    description:
      'HLA-A*02:01-restricted CTL epitope from TROP2 (<span class="cc-aa">SVCWCVNSV</span>). TROP2 is strongly over-expressed in triple-negative breast cancer and is the target of the approved ADC sacituzumab govitecan.',
  },
  {
    id: "l1",
    name: "GSGGS flexible linker",
    shortLabel: "Linker",
    start: 1633,
    end: 1647,
    strand: 1,
    category: "linker",
    partBba: "BBa_26B8OJKK",
    description:
      'Five-residue flexible linker (<span class="cc-aa">GSGGS</span>) between TROP2 CTL1 and TROP2 CTL2. Flexible spacers let neighbouring epitopes fold independently and give the proteasome an accessible cleavage context, so each epitope is released intact instead of being destroyed at the junction.',
  },
  {
    id: "ep2",
    name: "TROP2 CTL epitope RLFRERYRL",
    shortLabel: "TROP2 CTL2",
    start: 1648,
    end: 1674,
    strand: 1,
    category: "epitope",
    partBba: "BBa_26RVX9FC",
    description:
      'Second HLA-A*02:01-restricted TROP2 epitope (<span class="cc-aa">RLFRERYRL</span>). Each of the four target antigens contributes two epitopes, so one antigen staying presentable is enough to keep that target covered.',
  },
  {
    id: "l2",
    name: "GSGGS flexible linker",
    shortLabel: "Linker",
    start: 1675,
    end: 1689,
    strand: 1,
    category: "linker",
    partBba: "BBa_26B8OJKK",
    description:
      '<span class="cc-aa">GSGGS</span> spacer between TROP2 CTL2 and B7-H4 CTL1.',
  },
  {
    id: "ep3",
    name: "B7-H4 CTL epitope WLKEGVLGL",
    shortLabel: "B7-H4 CTL1",
    start: 1690,
    end: 1716,
    strand: 1,
    category: "epitope",
    partBba: "BBa_26Y46OKH",
    description:
      'HLA-A*02:01-restricted epitope from B7-H4 / VTCN1 (<span class="cc-aa">WLKEGVLGL</span>). B7-H4 is an immune-checkpoint ligand with restricted expression in healthy tissue and up-regulation in TNBC, so it serves both as a tumour antigen and as a suppressive signal in the tumour microenvironment.',
  },
  {
    id: "l3",
    name: "GSGGS flexible linker",
    shortLabel: "Linker",
    start: 1717,
    end: 1731,
    strand: 1,
    category: "linker",
    partBba: "BBa_26B8OJKK",
    description:
      '<span class="cc-aa">GSGGS</span> spacer between B7-H4 CTL1 and B7-H4 CTL2.',
  },
  {
    id: "ep4",
    name: "B7-H4 CTL epitope AVFADQVIV",
    shortLabel: "B7-H4 CTL2",
    start: 1732,
    end: 1758,
    strand: 1,
    category: "epitope",
    partBba: "BBa_264AFCJ7",
    description:
      'Second HLA-A*02:01-restricted B7-H4 epitope (<span class="cc-aa">AVFADQVIV</span>).',
  },
  {
    id: "l4",
    name: "GSGGS flexible linker",
    shortLabel: "Linker",
    start: 1759,
    end: 1773,
    strand: 1,
    category: "linker",
    partBba: "BBa_26B8OJKK",
    description:
      '<span class="cc-aa">GSGGS</span> spacer between B7-H4 CTL2 and PVRL4 CTL1.',
  },
  {
    id: "ep5",
    name: "PVRL4 CTL epitope FQARLRLRVLVPPL",
    shortLabel: "PVRL4 CTL1",
    start: 1774,
    end: 1815,
    strand: 1,
    category: "epitope",
    partBba: "BBa_262M4VRL",
    description:
      'Extended HLA-A*02:01-restricted epitope from PVRL4 / Nectin-4 (<span class="cc-aa">FQARLRLRVLVPPL</span>, 14 aa). Nectin-4 is the target of enfortumab vedotin and is re-expressed in TNBC. This is the one extended insert in the array: two predicted 9-mers overlap by four residues in the native Nectin-4 sequence, so they are carried as a single peptide rather than synthesised separately with a duplicated <span class="cc-aa">RLRV</span> and an extra linker.',
  },
  {
    id: "l5",
    name: "GSGGS flexible linker",
    shortLabel: "Linker",
    start: 1816,
    end: 1830,
    strand: 1,
    category: "linker",
    partBba: "BBa_26B8OJKK",
    description:
      '<span class="cc-aa">GSGGS</span> spacer between PVRL4 CTL1 and PVRL4 CTL2.',
  },
  {
    id: "ep6",
    name: "PVRL4 CTL epitope AVTSEFHLV",
    shortLabel: "PVRL4 CTL2",
    start: 1831,
    end: 1857,
    strand: 1,
    category: "epitope",
    partBba: "BBa_260EEB6F",
    description:
      'Second HLA-A*02:01-restricted PVRL4 epitope (<span class="cc-aa">AVTSEFHLV</span>).',
  },
  {
    id: "l6",
    name: "GSGGS flexible linker",
    shortLabel: "Linker",
    start: 1858,
    end: 1872,
    strand: 1,
    category: "linker",
    partBba: "BBa_26B8OJKK",
    description:
      '<span class="cc-aa">GSGGS</span> spacer between PVRL4 CTL2 and LIV-1 CTL2.',
  },
  {
    id: "ep7",
    name: "LIV-1 CTL epitope GVATLAWMV",
    shortLabel: "LIV-1 CTL2",
    start: 1873,
    end: 1899,
    strand: 1,
    category: "epitope",
    partBba: "BBa_26T7Q0VT",
    description:
      'HLA-A*02:01-restricted epitope from LIV-1 / SLC39A6 (ZIP6) (<span class="cc-aa">GVATLAWMV</span>). LIV-1 is a zinc transporter linked to the epithelial–mesenchymal transition in breast cancer and is the target of ladiratuzumab vedotin.',
  },
  {
    id: "l7",
    name: "GSGGS flexible linker",
    shortLabel: "Linker",
    start: 1900,
    end: 1914,
    strand: 1,
    category: "linker",
    partBba: "BBa_26B8OJKK",
    description:
      '<span class="cc-aa">GSGGS</span> spacer between LIV-1 CTL2 and LIV-1 CTL3.',
  },
  {
    id: "ep8",
    name: "LIV-1 CTL epitope GLHNFSDGL",
    shortLabel: "LIV-1 CTL3",
    start: 1915,
    end: 1941,
    strand: 1,
    category: "epitope",
    partBba: "BBa_26UDJYOG",
    description:
      'Second HLA-A*02:01-restricted LIV-1 epitope (<span class="cc-aa">GLHNFSDGL</span>) and the last of the eight epitopes in the array.',
  },
  {
    id: "l8",
    name: "GSGGS flexible linker",
    shortLabel: "Linker",
    start: 1942,
    end: 1956,
    strand: 1,
    category: "linker",
    partBba: "BBa_26B8OJKK",
    description:
      '<span class="cc-aa">GSGGS</span> joining the epitope array in frame to the 4× mC3d-P28 adjuvant, so the two domains fold independently. The XhoI site immediately downstream (<span class="cc-aa">CTCGAG</span>, 1,957–1,962, encoding Leu-Glu) marks the design boundary between the exchangeable antigen cassette and the adjuvant module.',
  },
  {
    id: "mc3d",
    name: "4× murine C3d-P28 molecular adjuvant",
    shortLabel: "4x mC3dP28",
    start: 1963,
    end: 2370,
    strand: 1,
    category: "adjuvant",
    partBba: "BBa_26TV21B9",
    description:
      'Four tandem copies of the murine C3d-P28 peptide (<span class="cc-aa">KFLNTAKDRNRWEEPDQQLYNVEATSYALL</span> per copy, separated by GSGGS spacers), registered and handled as a single 408 bp part. C3d is a complement C3 degradation product whose minimal active core P28 binds CR2 / CD21 on B cells, tethering the antigen–adjuvant fusion to follicular dendritic cells and B cells, lowering the B-cell activation threshold and enhancing germinal-centre responses. Potency depends on multimerisation, which is why the copies are arrayed rather than used singly.',
  },
  {
    id: "mitd",
    name: "MITD — MHC class I trafficking domain",
    shortLabel: "MITD",
    start: 2386,
    end: 2550,
    strand: 1,
    category: "traffic",
    partBba: "BBa_26DFSBOC",
    description:
      'The transmembrane and cytoplasmic tail of HLA-A*02:01 (<span class="cc-aa">IVGIVAGLAVLAVVVIGAVVATVMCRRKSSGGKGGSYSQAASSDSAQGSDVSLTA</span>). Fused to the C-terminus of the antigen cassette, it routes the antigen into the vesicular trafficking pathway shared by MHC-I and MHC-II, improving cross-presentation and CD4<sup>+</sup> help.',
  },
  {
    id: "flag",
    name: "FLAG epitope tag",
    shortLabel: "FLAG",
    start: 2560,
    end: 2583,
    strand: 1,
    category: "tag",
    partBba: "BBa_26ETK4O5",
    description:
      'The eight-residue FLAG tag (<span class="cc-aa">DYKDDDDK</span>) at the C-terminus of the fusion protein, after MITD. Anti-FLAG Western blot and flow cytometry use it to confirm that the circular RNA is translated into the full-length fusion inside cells.',
  },
  {
    id: "hba1",
    name: "Human HBA1 3′ UTR",
    shortLabel: "HBA1 3' UTR",
    start: 2593,
    end: 2693,
    strand: 1,
    category: "utr",
    partBba: "BBa_26YWGNHS",
    description:
      "The 3′ untranslated region of human α-globin, widely used as a stabilising element in mRNA vaccines. Its pyrimidine-rich element binds αCP (PCBP1/2), suppressing deadenylation and 3′-to-5′ exonucleolytic decay, which extends transcript half-life and raises protein accumulation.",
  },
  {
    id: "pie3",
    name: "PIE 3′ half — T4 <em>td</em> 5′-intron with homology arms",
    shortLabel: "PIE 3' half",
    start: 2694,
    end: 2946,
    strand: 1,
    category: "circ",
    partBba: "BBa_26P7AUA8",
    description:
      "The 3′ half of the PIE system, used together with BBa_26T5SEQR. It sits at the extreme 3′ end of the precursor; its 5′-half intron reconstitutes the complete group I ribozyme with the 3′-half intron of the 5′ part, and its 20 nt inner and outer arms are complementary to the corresponding arms upstream.",
  },
  {
    id: "iha3",
    name: "Inner HomologyArm (3′)",
    shortLabel: "Inner HomologyArm",
    start: 2694,
    end: 2713,
    strand: 1,
    category: "circ",
    partBba: null,
    description: "3′ partner of the inner arm at 747–766.",
  },
  {
    id: "scar1",
    name: "Intron Scar 1",
    shortLabel: "Intron Scar 1",
    start: 2714,
    end: 2735,
    strand: 1,
    category: "circ",
    partBba: null,
    description:
      "The 22 nt of the downstream intron half retained in the product, forming the other side of the back-splice junction with Intron Scar 2.",
  },
  {
    id: "oha3",
    name: "Outer HomologyArm (3′)",
    shortLabel: "Outer HomologyArm",
    start: 2927,
    end: 2946,
    strand: 1,
    category: "circ",
    partBba: null,
    description: "3′ partner of the outer arm at 465–484.",
  },
  {
    id: "polya",
    name: "polyA25 internal poly(A) segment",
    shortLabel: "polyA25",
    start: 2947,
    end: 2971,
    strand: 1,
    category: "utr",
    partBba: "BBa_26REEYOT",
    description:
      "Twenty-five consecutive adenosines downstream of the 3′ outer homology arm. It stays out of the mature circle, leaving with the linear by-product during self-splicing. Its roles are to give the run-off transcript a low-structure 3′ end that can be captured on oligo(dT), and to act as a spacer ahead of the linearisation site.",
  },
  {
    id: "t7t",
    name: "T7 terminator",
    shortLabel: "T7 terminator",
    start: 2980,
    end: 3027,
    strand: 1,
    category: "backbone",
    partBba: null,
    description:
      "Terminator for T7 RNA polymerase, sitting downstream of the NotI linearisation site in the bacterial backbone. In a circular-plasmid context it can terminate T7 RNA polymerase; for run-off preparation, linearisation at NotI instead defines the template end.",
  },
  {
    id: "ori",
    name: "ori",
    shortLabel: "ori",
    start: 3448,
    end: 4036,
    strand: -1,
    category: "backbone",
    partBba: null,
    description:
      "pUC / pMB1 origin of replication, high copy number in bacteria. It is a feature of the commercial vector backbone, providing high-copy replication during bacterial propagation by the gene-synthesis vendor. Our team did not perform bacterial culturing, transformation or plasmid amplification; the complete plasmid was ordered endotoxin-free ready for template linearisation.",
  },
  {
    id: "ampr",
    name: "AmpR",
    shortLabel: "AmpR",
    start: 4207,
    end: 5067,
    strand: -1,
    category: "backbone",
    partBba: null,
    description:
      "β-lactamase, conferring ampicillin resistance as a selectable marker in the commercial vector backbone. Because all plasmids were ordered directly from a commercial gene-synthesis vendor, bacterial selection, transformation and overnight culture were not performed by our team.",
  },
  {
    id: "amprp",
    name: "AmpR promoter",
    shortLabel: "AmpR promoter",
    start: 5068,
    end: 5172,
    strand: -1,
    category: "backbone",
    partBba: null,
    description: "Constitutive promoter driving the β-lactamase gene.",
  },
];

export const constructSites: readonly ConstructSite[] = [
  {
    id: "rsAgeI",
    name: "AgeI",
    recognition: "ACCGGT",
    start: 485,
    end: 490,
    cut: 485,
    cutBottom: 489,
    note: "Sits in the 6 bp spacer between the 5′ outer homology arm (465–484) and the T4 <em>td</em> intron half (491–746), at the upstream end of the circularisation cassette. MluI occupies the mirror-image spacer at the 3′ end.",
  },
  {
    id: "rsNheI",
    name: "NheI",
    recognition: "GCTAGC",
    start: 1492,
    end: 1497,
    cut: 1492,
    cutBottom: 1496,
    note: "Boundary between the IRES and the antigen cassette; with BamHI it defines the insert that carries the Kozak context and the tPA leader.",
  },
  {
    id: "rsBamHI",
    name: "BamHI",
    recognition: "GGATCC",
    start: 1600,
    end: 1605,
    cut: 1600,
    cutBottom: 1604,
    note: "5′ end of the epitope array. The NheI–BamHI window was used to swap secretion leaders without touching the epitopes.",
  },
  {
    id: "rsXhoI",
    name: "XhoI",
    recognition: "CTCGAG",
    start: 1957,
    end: 1962,
    cut: 1957,
    cutBottom: 1961,
    note: "Junction between the epitope array and the adjuvant. It sits in frame and encodes Leu-Glu, so adjuvant modules can be exchanged without shifting the reading frame.",
  },
  {
    id: "rsClaI",
    name: "ClaI",
    recognition: "ATCGAT",
    start: 2587,
    end: 2592,
    cut: 2588,
    cutBottom: 2590,
    note: "3′ end of the coding region, just after the FLAG tag and before the HBA1 3′ UTR.",
  },
  {
    id: "rsMluI",
    name: "MluI",
    recognition: "ACGCGT",
    start: 2921,
    end: 2926,
    cut: 2921,
    cutBottom: 2925,
    note: "Sits in the 6 bp spacer between the T4 <em>td</em> intron half (2,714–2,920) and the 3′ outer homology arm (2,927–2,946), mirroring AgeI at the 5′ end.",
  },
  {
    id: "rsNotI",
    name: "NotI",
    recognition: "GCGGCCGC",
    start: 2972,
    end: 2979,
    cut: 2973,
    cutBottom: 2977,
    note: "Linearisation site. The plasmid is cut here before in vitro transcription so that T7 RNA polymerase runs off at a fixed point, giving every precursor the same length.",
  },
];
