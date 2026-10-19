/**
 * Contribution page — the JLU-FBH Registry parts table.
 *
 * Provenance: `文案集/project/contribution/3.6 Contribution.md`, the 23-row
 * table under "Parts → Reusable and Adaptable Biological Parts".
 *
 * Faithful by construction: every cell carries the manuscript's own wording.
 * The only edits are mechanical — Markdown escapes (`\_`, `\-`, `\(`, `'`) are
 * resolved to the plain characters they stand for, and the source's literal
 * `<br>` cell breaks are kept as line breaks so a long functional description
 * stays one table row instead of being split or truncated.
 *
 * Pure data: no React, no JSX.
 */

export interface ContributionPart {
  /** Registry part name, e.g. `BBa_26REEYOT`. */
  name: string;
  /** Canonical registry URL for the part. */
  registryUrl: string;
  /** The manuscript's "Short Description" column. */
  shortDescription: string;
  /** The manuscript's "Functional Description" column, `<br>`-separated lines. */
  functionalDescription: string;
}

export const contributionPartsHeading = {
  sectionId: "contribution-parts",
  /** Third subheading of the "Reusable Wet Lab Resources" chapter (3.1, 3.2, 3.3). */
  sectionIndex: "3.3",
  sectionTitle: "Parts → Reusable and Adaptable Biological Parts",
};

export const contributionPartsTable: {
  headers: readonly string[];
  rows: readonly ContributionPart[];
} = {
  headers: ["Number", "Short Description", "Functional Description"],
  rows: [
    {
      name: "BBa_26REEYOT",
      registryUrl: "https://registry.igem.org/parts/bba-26reeyot",
      shortDescription: "polyA25 internal poly(A) segment",
      functionalDescription:
        "Twenty-five consecutive adenosines located downstream of the 3' outer homology arm and upstream of the T7 terminator. It is not part of the mature circular RNA — it is excised with the linear by-product during self-splicing. Its roles are:<br>(1) to give the run-off transcript a low-structure 3' end that can be captured on oligo(dT) for precursor purification and quantification;<br>(2) to buffer the transcript before termination, reducing T7-derived 3' end heterogeneity at the terminator<br>(3) to serve as a molecular marker for the linear by-product in RNase R control experiments.",
    },
    {
      name: "BBa_26P6A978",
      registryUrl: "https://registry.igem.org/parts/bba-26p6a978",
      shortDescription: "3xFLAG epitope tag",
      functionalDescription:
        "A 22-residue triple FLAG tag fused to the C-terminus of TROP2. Compared with a single FLAG copy, 3xFLAG gives markedly higher antibody affinity and detection sensitivity, which suits low-abundance targets such as membrane proteins; we use it for anti-FLAG flow cytometry and immunofluorescence to confirm the surface expression level and positive fraction of the 4T1-hTROP2 stable line.",
    },
    {
      name: "BBa_26TV21B9",
      registryUrl: "https://registry.igem.org/parts/bba-26tv21b9",
      shortDescription: "4x murine C3d-P28 molecular adjuvant",
      functionalDescription:
        "Molecular adjuvant. C3d is a complement C3 degradation product whose minimal active core, P28 (28 residues), binds CR2/CD21 on B cells, tethering the antigen–adjuvant fusion to follicular dendritic cells and B cells, lowering the B-cell activation threshold and enhancing antigen presentation and germinal-centre responses. Potency scales with copy number; this part uses four tandem copies (murine sequence, for the BALB/c–4T1 model).<br>Note: the sequence is four near-identical ~102 bp units in tandem and shows strong periodicity at k ≈ 105 by autocorrelation — use primer walking or long-read sequencing for verification, and be aware of template slippage and recombination during PCR.",
    },
    {
      name: "BBa_26H5MIQD",
      registryUrl: "https://registry.igem.org/parts/bba-26h5miqd",
      shortDescription: "tPA signal and pro-peptide secretion leader",
      functionalDescription:
        "The 32-residue signal peptide plus pro-peptide of human tPA. Placed at the extreme 5' end of the multi-epitope antigen cassette, it routes the nascent polypeptide into the ER–Golgi secretory pathway so that antigen is secreted and cross-presented by neighbouring antigen-presenting cells; the same leader is known to raise expression and immunogenicity of nucleic-acid-vaccine-encoded antigens. Together with the downstream MITD, it forms a combined secretion + MHC-I/II trafficking strategy.",
    },
    {
      name: "BBa_26ETK4O5",
      registryUrl: "https://registry.igem.org/parts/bba-26etk4o5",
      shortDescription: "FLAG epitope tag",
      functionalDescription:
        "The eight-residue FLAG epitope tag, placed at the C-terminus of the antigen fusion protein (after MITD), used for anti-FLAG Western blot and flow cytometry to confirm that the circular RNA is indeed translated into the full-length fusion protein inside cells.",
    },
    {
      name: "BBa_26RVX9FC",
      registryUrl: "https://registry.igem.org/parts/bba-26rvx9fc",
      shortDescription: "TROP2 HLA-A*02:01 CTL epitope RLFRERYRL",
      functionalDescription:
        "A nine-residue peptide epitope from human TROP2, predicted to be presented on HLA-A*02:01. When encoded within a circular RNA vaccine and translated in dendritic cells, the peptide is expected to be processed by the proteasome, loaded onto HLA-A*02:01 in the endoplasmic reticulum and displayed at the cell surface, where it is expected to be recognised by cognate CD8+ T cells and to drive their activation and expansion into cytotoxic effectors against TROP2-positive tumour cells. The part is designed to be used as a single module within a string-of-beads multi-epitope array, flanked by flexible GSGGS linkers.",
    },
    {
      name: "BBa_26X4AOBB",
      registryUrl: "https://registry.igem.org/parts/bba-26x4aobb",
      shortDescription: "Apt-eIF4G",
      functionalDescription:
        "A 40 nt RNA aptamer that binds the HEAT-1 domain of eukaryotic initiation factor eIF4G directly. Used as a stand-alone element it recruits eIF4G–eIF4A to any circular or linear RNA, bypassing the eIF4E–cap requirement and enabling cap-independent initiation. In this project it is not inserted separately but is embedded in domain V of synIRES-RC25; it is registered on its own so that other teams can graft it onto their own IRES or UTR.",
    },
    {
      name: "BBa_26YWGNHS",
      registryUrl: "https://registry.igem.org/parts/bba-26ywgnhs",
      shortDescription: "Human HBA1 3'UTR mRNA-stabilising element",
      functionalDescription:
        "The 3' untranslated region of the human alpha-globin gene, one of the most widely used stabilising elements in mRNA vaccines: its pyrimidine-rich element binds alphaCP (PCBP1/2), suppressing deadenylation and 3'->5' exonucleolytic decay and thereby extending transcript half-life and increasing protein accumulation. In this circular RNA it lies downstream of the FLAG tag and upstream of the inner homology arm, acting both as an intra-circle stability/translation-enhancing module and as a structural buffer between the translation stop region and the back-splice junction.",
    },
    {
      name: "BBa_26NZ5F31",
      registryUrl: "https://registry.igem.org/parts/bba-26nz5f31",
      shortDescription: "copGFP coding sequence",
      functionalDescription:
        "Green fluorescent protein from the copepod Pontellina plumata. It is expected to fold and fluoresce in mammalian cells without a cofactor other than molecular oxygen, giving green emission on blue excitation. In this vector it is expected to be co-expressed stoichiometrically with the puromycin resistance protein via a T2A ribosome-skipping peptide, so that green fluorescence reports successful lentiviral transduction and allows transduced cells to be identified and sorted.",
    },
    {
      name: "BBa_26T7Q0VT",
      registryUrl: "https://registry.igem.org/parts/bba-26t7q0vt",
      shortDescription: "LIV-1 HLA-A*02:01 CTL epitope GVATLAWMV",
      functionalDescription:
        "A nine-residue peptide epitope from human LIV-1, predicted to be presented on HLA-A*02:01. When encoded within a circular RNA vaccine and translated in dendritic cells, the peptide is expected to be processed by the proteasome, loaded onto HLA-A*02:01 in the endoplasmic reticulum and displayed at the cell surface, where it is expected to be recognised by cognate CD8+ T cells and to drive their activation and expansion into cytotoxic effectors against LIV-1-positive tumour cells. The part is designed to be used as a single module within a string-of-beads multi-epitope array, flanked by flexible GSGGS linkers.",
    },
    {
      name: "BBa_26Y46OKH",
      registryUrl: "https://registry.igem.org/parts/bba-26y46okh",
      shortDescription: "B7-H4 HLA-A*02:01 CTL epitope WLKEGVLGL",
      functionalDescription:
        "A nine-residue peptide epitope from human B7-H4, predicted to be presented on HLA-A*02:01. When encoded within a circular RNA vaccine and translated in dendritic cells, the peptide is expected to be processed by the proteasome, loaded onto HLA-A*02:01 in the endoplasmic reticulum and displayed at the cell surface, where it is expected to be recognised by cognate CD8+ T cells and to drive their activation and expansion into cytotoxic effectors against B7-H4-positive tumour cells. The part is designed to be used as a single module within a string-of-beads multi-epitope array, flanked by flexible GSGGS linkers.",
    },
    {
      name: "BBa_260EEB6F",
      registryUrl: "https://registry.igem.org/parts/bba-260eeb6f",
      shortDescription: "PVRL4 HLA-A*02:01 CTL epitope AVTSEFHLV",
      functionalDescription:
        "A nine-residue peptide epitope from human NECTIN4, predicted to be presented on HLA-A*02:01. When encoded within a circular RNA vaccine and translated in dendritic cells, the peptide is expected to be processed by the proteasome, loaded onto HLA-A*02:01 in the endoplasmic reticulum and displayed at the cell surface, where it is expected to be recognised by cognate CD8+ T cells and to drive their activation and expansion into cytotoxic effectors against NECTIN4-positive tumour cells. The part is designed to be used as a single module within a string-of-beads multi-epitope array, flanked by flexible GSGGS linkers.",
    },
    {
      name: "BBa_26KIMH8W",
      registryUrl: "https://registry.igem.org/parts/bba-26kimh8w",
      shortDescription: "T7 promoter with GGG initiator",
      functionalDescription:
        "Strong promoter for in vitro transcription (IVT) by T7 RNA polymerase. Unlike the 23 bp version commonly deposited in the Registry, this part retains 10 bp of upstream vector sequence and the downstream GGG initiator triplet, which fixes the 5' end of the run-off transcript at GGG. A defined 5' end is required for reproducible PIE precursor folding and for downstream RNase R / back-splice-junction (BSJ) sequencing. The plasmid is linearised with PmeI before run-off transcription.",
    },
    {
      name: "BBa_260UNJNZ",
      registryUrl: "https://registry.igem.org/parts/bba-260unjnz",
      shortDescription: "PABP-binding spacer with 3-frame stop cassette",
      functionalDescription:
        "A 50 nt spacer placed downstream of the circularisation junction and upstream of the IRES. Its A-rich segment recruits poly(A)-binding protein (PABP), mimicking closed-loop translational enhancement on a circular RNA that has neither a 5' cap nor a poly(A) tail, and it spatially separates the back-splice junction from the IRES so that BSJ secondary structure cannot interfere with IRES folding. Its 3' end carries one stop codon in each of the three reading frames, terminating any aberrant rolling-circle read-through frame and preventing concatenated polypeptides.",
    },
    {
      name: "BBa_26P7AUA8",
      registryUrl: "https://registry.igem.org/parts/bba-26p7aua8",
      shortDescription: "PIE 3' half: T4 td 5'-intron with homology arms",
      functionalDescription:
        "The 3' half of the PIE circularisation system, used together with BBa_26T5SEQR. It sits at the extreme 3' end of the precursor; its 5'-half intron is expected to reconstitute the complete group I ribozyme with the 3'-half intron of BBa_26T5SEQR. Its 20 nt inner arm is complementary to the inner arm of BBa_26T5SEQR and its 20 nt outer arm to the outer arm of BBa_26T5SEQR, so the two ends of the precursor are expected to be held in proximity for splicing. On self-splicing, both intron halves and their outer arms are released as linear by-products, and the circular product retains only a short scar derived from the inner arms.",
    },
    {
      name: "BBa_264AFCJ7",
      registryUrl: "https://registry.igem.org/parts/bba-264afcj7",
      shortDescription: "B7-H4 HLA-A*02:01 CTL epitope AVFADQVIV",
      functionalDescription:
        "A nine-residue peptide epitope from human B7-H4, predicted to be presented on HLA-A*02:01. When encoded within a circular RNA vaccine and translated in dendritic cells, the peptide is expected to be processed by the proteasome, loaded onto HLA-A*02:01 in the endoplasmic reticulum and displayed at the cell surface, where it is expected to be recognised by cognate CD8+ T cells and to drive their activation and expansion into cytotoxic effectors against B7-H4-positive tumour cells. The part is designed to be used as a single module within a string-of-beads multi-epitope array, flanked by flexible GSGGS linkers.",
    },
    {
      name: "BBa_26B8OJKK",
      registryUrl: "https://registry.igem.org/parts/bba-26b8ojkk",
      shortDescription: "GSGGS flexible linker",
      functionalDescription:
        "A five-residue flexible linker (Gly-Ser-Gly-Gly-Ser) used to join the epitope array in frame to the 4x mC3d-P28 molecular adjuvant. The flexible linker lets the two functional domains fold independently without steric interference and provides an accessible region for proteasomal processing.",
    },
    {
      name: "BBa_26DFSBOC",
      registryUrl: "https://registry.igem.org/parts/bba-26dfsboc",
      shortDescription: "MITD MHC class I trafficking domain",
      functionalDescription:
        "The MHC class I trafficking domain, comprising the transmembrane and cytoplasmic tail of HLA-A*02:01. Fused to the C-terminus of the antigen cassette it routes the antigen into the vesicular trafficking pathway shared by MHC-I and MHC-II (trans-Golgi and endosomal recycling), markedly improving MHC-I cross-presentation and MHC-II presentation and thus boosting both CD8+ CTL and CD4+ Th responses. With the N-terminal tPA leader it forms a tandem 'enter the secretory pathway then enter the MHC loading pathway' targeting strategy.",
    },
    {
      name: "BBa_26T5SEQR",
      registryUrl: "https://registry.igem.org/parts/bba-26t5seqr",
      shortDescription: "PIE 5' half: T4 td 3'-intron with homology arms",
      functionalDescription:
        "The 5' half of the PIE (Permuted Intron–Exon) circularisation system. On the precursor RNA it sits at the extreme 5' end; during self-splicing this 3'-half intron pairs with the 5'-half intron of BP-13 to reconstitute the complete T4 td group I ribozyme, which joins the two flanking exons head-to-tail through two transesterification steps to give a covalently closed circular RNA. The 20 nt outer homology arm is reverse-complementary to the outer arm of BP-13 and brings the two precursor ends together; the 20 nt inner arm further stabilises the catalytically active fold.",
    },
    {
      name: "BBa_26JO61YE",
      registryUrl: "https://registry.igem.org/parts/bba-26jo61ye",
      shortDescription: "Human TROP2 (TACSTD2) coding sequence",
      functionalDescription:
        "The full-length human TROP2 coding sequence (323 aa, including its native signal peptide, EGF-like and thyroglobulin-like extracellular domains, transmembrane region and cytoplasmic tail), with the stop codon removed so that it fuses in frame to the downstream 3xFLAG tag. TROP2 is one of the four target antigens of the vaccine and is over-expressed in triple-negative breast cancer.<br>This part is not used for therapeutic expression but to build an antigen-positive target-cell model: lentiviral transduction gives murine 4T1 cells stable over-expression of human TROP2, providing tumour cells that display the human target antigen for CTL killing assays and the BALB/c tumour model.",
    },
    {
      name: "BBa_26UDJYOG",
      registryUrl: "https://registry.igem.org/parts/bba-26udjyog",
      shortDescription: "LIV-1 HLA-A*02:01 CTL epitope GLHNFSDGL",
      functionalDescription:
        "A nine-residue peptide epitope from human LIV-1, predicted to be presented on HLA-A*02:01. When encoded within a circular RNA vaccine and translated in dendritic cells, the peptide is expected to be processed by the proteasome, loaded onto HLA-A*02:01 in the endoplasmic reticulum and displayed at the cell surface, where it is expected to be recognised by cognate CD8+ T cells and to drive their activation and expansion into cytotoxic effectors against LIV-1-positive tumour cells. The part is designed to be used as a single module within a string-of-beads multi-epitope array, flanked by flexible GSGGS linkers.",
    },
    {
      name: "BBa_26DGJ5ZY",
      registryUrl: "https://registry.igem.org/parts/bba-26dgj5zy",
      shortDescription: "synIRES-RC25",
      functionalDescription:
        "Circular RNA has no 5' cap, so translation must be IRES-driven. synIRES-RC25 is rebuilt on a CVB3/HRV-2 type-I/II IRES scaffold: long stem-loops that hinder circularisation are shortened, and an eIF4G-binding aptamer is embedded in domain V so that the eIF4G–eIF4A complex is recruited directly upstream of the start codon. This gives higher, eIF4E-independent initiation than the wild-type CVB3 IRES in human dendritic cells and tumour cells. It is followed immediately by the Kozak sequence and the tPA signal-peptide start codon.",
    },
    {
      name: "BBa_2615OQ94",
      registryUrl: "https://registry.igem.org/parts/bba-2615oq94",
      shortDescription: "TROP2 HLA-A*02:01 CTL epitope SVCWCVNSV",
      functionalDescription:
        "A nine-residue peptide epitope from human TROP2, predicted to be presented on HLA-A*02:01. When encoded within a circular RNA vaccine and translated in dendritic cells, the peptide is expected to be processed by the proteasome, loaded onto HLA-A*02:01 in the endoplasmic reticulum and displayed at the cell surface, where it is expected to be recognised by cognate CD8+ T cells and to drive their activation and expansion into cytotoxic effectors against TROP2-positive tumour cells. The part is designed to be used as a single module within a string-of-beads multi-epitope array, flanked by flexible GSGGS linkers.",
    },
  ],
};
