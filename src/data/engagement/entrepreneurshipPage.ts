import type { WikiPageContent } from "../../components/wiki/wikiPageTypes";
import { entrepreneurshipAssets } from "./entrepreneurshipAssets";

export type EntrepreneurshipOrbitTone =
  | "peach"
  | "sage"
  | "sky"
  | "lavender"
  | "rose"
  | "yellow"
  | "lime"
  | "slate"
  | "mauve";

export interface EntrepreneurshipOrbitTopic {
  id: string;
  label: string[];
  title: string;
  body: string;
  tone: EntrepreneurshipOrbitTone;
  group?: "Direct impacts" | "Indirect impacts";
}

export const entrepreneurshipConcerns: EntrepreneurshipOrbitTopic[] = [
  {
    id: "safety",
    label: ["Safety"],
    title: "Safety Concerns",
    body: "Multi-epitope design may lead to unintended immune responses and cross-reactivity with normal tissues, while the long-term safety of circRNA and its delivery system still requires thorough validation. We will assess normal tissue expression for each candidate antigen and exclude candidates with unacceptable risks through progressively staged in vitro studies, animal studies, and subsequent safety studies conducted according to applicable standards. Where necessary, we will modify or remove the relevant epitopes.",
    tone: "peach",
  },
  {
    id: "patient-access",
    label: ["Patient", "Access"],
    title: "Patient Access Concerns",
    body: "CirCure requires patient screening based on residual disease, TAA expression, and HLA criteria. This may increase the burden of testing, return visits, and follow-up, and may also prevent some patients from qualifying because of screening criteria or limitations in healthcare resources. We will track actual patient attrition during screening along real-world care pathways and continually optimize testing and follow-up procedures, ensuring that patient burden and accessibility are considered alongside technical performance in product decisions.",
    tone: "sage",
  },
  {
    id: "data-privacy",
    label: ["Data", "Privacy"],
    title: "Privacy and Data Concerns",
    body: "Patient screening and subsequent research may involve sensitive medical information, including pathology findings, antigen expression, and HLA data. Improper use of these data could pose privacy risks. We will adhere to the principles of compliant data collection and data minimization, use only de-identified information authorized for use in external communications and industry reviews, and incorporate privacy protection into subsequent data management and collaboration processes.",
    tone: "sky",
  },
  {
    id: "manufacturing-qc",
    label: ["Manufacturing", "& QC"],
    title: "Manufacturing and Quality Control Concerns",
    body: "Although integrating multiple epitopes into a single circRNA offers design potential, it also increases complexity in construction, antigen processing and presentation, analytical methods, and batch-to-batch consistency. We will assess whether the gains in coverage justify the added complexity and engage RNA process specialists, CROs/CDMOs, and specialized laboratories to validate manufacturing, quality, and scale-up. If the complexity does not deliver corresponding value, we will simplify the candidate’s configuration.",
    tone: "lavender",
  },
  {
    id: "clinical-trust",
    label: ["Clinical", "Trust"],
    title: "Clinical Acceptance and Trust Concerns",
    body: "As a therapeutic vaccine candidate still in early development, CirCure must address clinicians’ and patients’ cautious assessments of its safety, efficacy, and relationship to existing standard treatment. We will not position it as a replacement for standard treatment. Instead, through transparent data, clearly defined patient selection criteria, and ongoing clinical dialogue, we will ensure that its future role in clinical care is grounded in evidence rather than promotion.",
    tone: "rose",
  },
];

export const entrepreneurshipImpacts: EntrepreneurshipOrbitTopic[] = [
  {
    id: "treatment-options",
    label: [],
    group: "Direct impacts",
    title: "Expanding Treatment Options for Patients with High-Risk TNBC",
    body: "Further treatment options remain important for patients with TNBC who have residual invasive disease after completing neoadjuvant therapy and surgery and are at high risk of recurrence. If CirCure is ultimately validated through sufficient evidence, it could offer a potential add-on treatment option alongside standard treatment for patients who meet the TAA/HLA criteria. However, we will not draw conclusions about reduced recurrence or improved survival until reliable evidence of safety and clinical efficacy is available.",
    tone: "yellow",
  },
  {
    id: "patient-matching",
    label: [],
    group: "Direct impacts",
    title: "Improving the Match Between Patients and Treatment",
    body: "Patients with TNBC differ in antigen expression and HLA profiles, so a single vaccine candidate is not inherently suitable for all patients. CirCure incorporates clinical risk, TAA expression, and HLA matching into patient screening, aiming to define more clearly which patients the vaccine candidate is suitable for. Its actual patient coverage and the value of this matching approach still require validation through further research.",
    tone: "lime",
  },
  {
    id: "vaccine-development",
    label: [],
    group: "Indirect impacts",
    title:
      "Advancing Therapeutic Vaccine Development Guided by Patient Stratification",
    body: "CirCure integrates clinical risk stratification, TAA/HLA matching, and multi-epitope circRNA design into a single development pathway, ensuring that vaccine design considers not only “what to construct” but also, at an earlier stage, “whom to construct it for.” If further validated, this framework could provide new experience to inform the development of therapeutic RNA vaccines guided by patient stratification.",
    tone: "slate",
  },
  {
    id: "collaboration",
    label: [],
    group: "Indirect impacts",
    title:
      "Promoting Collaboration Across Clinical Practice, Research, and Industry",
    body: "Bringing therapeutic vaccines from early research into practical use requires participation from clinicians, researchers, manufacturers, and industry partners. Throughout development, CirCure continually incorporates feedback from clinicians and industry partners, connecting patient needs, research design, and subsequent translation at an earlier stage. This also establishes a foundation for future collaborative validation and further development.",
    tone: "mauve",
  },
];

export interface GoldenCircleTopic {
  id: "why" | "what" | "how";
  title: string;
  subtitle?: string;
  lead: string;
  body: string;
  tone: "lavender" | "rose" | "yellow";
}

export const goldenCircleTopics: GoldenCircleTopic[] = [
  {
    id: "why",
    title: "Why",
    lead: "TNBC lacks specific targeted therapies and often has a poor prognosis.",
    body: "Current cancer vaccines may face limited epitope coverage, tumor antigen escape, and delivery challenges.",
    tone: "lavender",
  },
  {
    id: "what",
    title: "What",
    lead: "CirCure is a prototype multi-epitope circRNA therapeutic vaccine for TNBC.",
    body: "It includes an epitope-screening computational tool, a multi-epitope circRNA recombinant plasmid, in vitro validation data, preliminary mouse-study results, and a commercialization and regulatory feasibility assessment.",
    tone: "rose",
  },
  {
    id: "how",
    title: "How",
    lead: "We broaden tumor immune recognition by developing a multi-epitope circRNA vaccine.",
    body: "We screen HLA-matched tumor antigen epitopes, design and validate a circular RNA expression construct, evaluate immunogenicity and antitumor effects in cells and animal models, and assess regulatory, CMC, and IP feasibility for future preclinical translation.",
    tone: "yellow",
  },
];

export interface Stakeholder3DItem {
  id: number;
  name: string;
  image: string;
  tone: EntrepreneurshipOrbitTone;
  coordinates: {
    interest: number;
    influence: number;
    impact: number;
  };
  details: {
    interest: string;
    impact: string;
    influence: string;
  };
}

export const stakeholders3DList: Stakeholder3DItem[] = [
  {
    id: 1,
    name: "Patients & Patient Representatives",
    image: entrepreneurshipAssets.stakeholders.patients,
    tone: "rose",
    coordinates: { interest: 9, influence: 4, impact: 10 },
    details: {
      interest: "Treatment efficacy, safety, burden, and accessibility",
      influence:
        "Limited direct decision-making power; shape design through feedback on patient needs",
      impact:
        "Short term: increased participation burden; Long term: effects on treatment choices",
    },
  },
  {
    id: 2,
    name: "Clinicians and the Healthcare System",
    image: entrepreneurshipAssets.stakeholders.clinicians,
    tone: "sky",
    coordinates: { interest: 9, influence: 9, impact: 8 },
    details: {
      interest: "Clinical value, patient eligibility, and feasibility",
      influence:
        "Directly shape patient screening and clinical pathways; inform R&D through professional collaboration",
      impact:
        "Short term: additional research workload; Long term: effects on clinical workflows",
    },
  },
  {
    id: 3,
    name: "Scientific and Technical Experts",
    image: entrepreneurshipAssets.stakeholders.scientificExperts,
    tone: "slate",
    coordinates: { interest: 8, influence: 7, impact: 5 },
    details: {
      interest:
        "Scientific rationale, technical approach, and quality of evidence",
      influence:
        "Limited direct decision-making power; guide technical direction through expertise",
      impact:
        "Short term: knowledge exchange; Long term: advances in technology development",
    },
  },
  {
    id: 4,
    name: "Industry and Development Partners",
    image: entrepreneurshipAssets.stakeholders.industryPartners,
    tone: "peach",
    coordinates: { interest: 8, influence: 9, impact: 8 },
    details: {
      interest: "Development value, CMC, quality, and collaboration potential",
      influence:
        "Directly influence resource allocation for development; shape translation pathways through industry experience",
      impact:
        "Short term: resources committed to evaluation; Long term: shared development risks and returns",
    },
  },
  {
    id: 5,
    name: "Regulatory, Policy, and Payer Stakeholders",
    image: entrepreneurshipAssets.stakeholders.regulatoryPolicyPayers,
    tone: "sage",
    coordinates: { interest: 7, influence: 10, impact: 4 },
    details: {
      interest: "Compliance, safety, reimbursement, and accessibility",
      influence:
        "Directly determine market access requirements; guide development through policies and regulations",
      impact:
        "Short term: limited effects; Long term: effects on regulatory review and resource allocation",
    },
  },
  {
    id: 6,
    name: "Commercialization and Resource Support Partners",
    image: entrepreneurshipAssets.stakeholders.commercializationPartners,
    tone: "yellow",
    coordinates: { interest: 7, influence: 8, impact: 6 },
    details: {
      interest:
        "Intellectual property, financing, and research commercialization",
      influence:
        "Directly influence funding and ownership rights; advance commercialization through resource networks",
      impact:
        "Short term: resources committed to evaluation; Long term: returns linked to commercialization",
    },
  },
  {
    id: 7,
    name: "JLU-FBH Project Team",
    image: entrepreneurshipAssets.stakeholders.teamLogo,
    tone: "mauve",
    coordinates: { interest: 10, influence: 10, impact: 9 },
    details: {
      interest: "Scientific value, patient value, and project progress",
      influence:
        "Directly determines the technical approach; integrates external input through stakeholder collaboration",
      impact:
        "Short term: responsibility for R&D investment; Long term: effects on project outcomes and partnerships",
    },
  },
];

export interface BusinessModelCanvasSection {
  id: string;
  title: string;
  paragraphs: string[];
}

export const businessModelCanvas: {
  image: string;
  imageWidth: number;
  imageHeight: number;
  imageAlt: string;
  prompt: string;
  sections: BusinessModelCanvasSection[];
} = {
  image: entrepreneurshipAssets.illustrations.businessModel,
  imageWidth: 1448,
  imageHeight: 1086,
  imageAlt: "Business Model Canvas of CirCure",
  prompt:
    "Click below to learn more about each step of our business model.",
  sections: [
    {
      id: "customer-segments",
      title: "Customer Segments",
      paragraphs: [
        "At CirCure, we have clearly defined our customer segments to ensure that the project reaches those who truly need the product and those who can support its continued development. CirCure ultimately aims to serve patients with triple-negative breast cancer (TNBC) who have residual invasive disease following neoadjuvant therapy and surgery, remain at high risk of recurrence, and meet the requirements for candidate tumor-associated antigen (TAA) expression and human leukocyte antigen (HLA) matching. These patients have clear needs regarding further treatment options, safety, treatment burden, and long-term disease management. Understanding these needs allows us to incorporate patient stratification and eligibility criteria directly into vaccine design, aligning product development more closely with real-world clinical settings.",
        "In the **B2B** segment, we primarily target **R&D and business development (BD) teams at biopharmaceutical companies** specializing in cancer immunotherapy, RNA therapeutics, and vaccines. These companies continually seek candidate assets with the potential to stand out, while also prioritizing R&D efficiency, pipeline strategy, and the ability to translate technologies into products. Through vaccine candidates, R&D data, technology licensing, and joint development, CirCure offers partner companies new opportunities for pipeline collaboration. Research hospitals, breast cancer centers, and research institutions are also key partners for validation and application, providing real-world clinical settings for patient screening, clinical research, and product translation.",
        "Under our long-term **B2C** model, CirCure will serve patients with TNBC through hospitals and specialized healthcare systems, while improving product accessibility through long-term follow-up, patient education, and support services. By clearly distinguishing commercial customers, validation partners, and ultimate beneficiaries, we can develop tailored strategies for collaborative development, clinical translation, and patient support, keeping our business model centered on the real needs of each group.",
      ],
    },
    {
      id: "value-propositions",
      title: "Value Propositions",
      paragraphs: [
        "CirCure has developed a **multi-epitope circRNA therapeutic vaccine candidate** for patients with high-risk TNBC. We incorporate postoperative risk stratification, TAA expression, and HLA matching into product design. By encoding multiple candidate epitopes within a single circRNA, we establish a clearer link between vaccine design, patient screening, and the eligible patient population.",
        "Rather than adopting a uniform treatment approach for a broad patient population, CirCure builds its product development pathway around patient screening. TAA expression and HLA matching criteria define the eligible population, while the multi-epitope design balances patient matching with the reuse of vaccine candidates across eligible patients. In parallel, our **CircRNA Vaccine Design System** integrates data processing, target screening, epitope prediction, and vaccine design into a unified workflow. Traceable design records and standardized materials support the review, comparison, and iterative refinement of candidates.",
        "CirCure extends beyond vaccine design to provide a development framework built around target patients, candidate design, and product translation. We position it as a potential complementary immunotherapy that fits into existing standard treatment pathways. By connecting clinical needs, product development, and commercialization, CirCure establishes a product framework with both a clear clinical focus and commercial translation potential.",
      ],
    },
    {
      id: "channels",
      title: "Channels",
      paragraphs: [
        "At CirCure, our channels connect the project with potential customers, clinical partners, and industry resources, ensuring that our work reaches stakeholders who can understand and evaluate it, make decisions, and pursue collaborations. **Targeted business outreach** enables us to engage directly with R&D/BD teams at pharmaceutical companies. Through candidate presentations, data packages, and one-to-one discussions, we identify company needs and advance opportunities for technology licensing and joint development.",
        "**Building collaborative networks with hospitals and research institutions** further strengthens CirCure’s clinical and research connections. Drawing on the First Hospital of Jilin University and collaborating research institutions, we can align candidate design with real-world clinical pathways and continually refine the product through research collaborations, patient screening, and clinical studies.",
        "**Academic conferences, publications, and professional industry exchanges** are also important channels for building awareness of CirCure within the scientific and industry communities. By presenting our research and engaging with oncology experts, researchers, and biopharmaceutical companies, we can obtain expert feedback and expand our research and industry networks. Our business plan also identifies academic conferences, professional communications, and face-to-face (F2F) business development as key routes to industry partners.",
        "In addition, technology transfer offices (TTOs), research commercialization platforms, and industry incubators help connect technology transfer with commercial collaboration. Standardized data packages and the review of technical materials support potential partners in evaluating our technology, helping initial engagement progress toward R&D collaboration and commercialization.",
      ],
    },
    {
      id: "customer-relationships",
      title: "Customer Relationships",
      paragraphs: [
        "At CirCure, building and maintaining **long-term, trusted partnerships** is essential to the project’s continued development. For pharmaceutical and biotechnology companies, we emphasize professional communication grounded in data and evidence. Through one-to-one discussions, document reviews, and technical exchanges, we help partners gain a comprehensive understanding of our candidate design, R&D findings, and the value of collaboration.",
        "As partnerships deepen, we will progress from information exchange to data review, collaborative validation, and joint development. **Non-disclosure agreements (NDAs) and material transfer agreements (MTAs)** will define the terms governing data, materials, intellectual property, and each party’s responsibilities. Development objectives and milestones will enable both parties to track progress, allowing initial exchanges to grow into long-term R&D collaborations.",
        "We also provide ongoing technical and data support for our core vaccine candidate. Our **CircRNA Vaccine Design System**, together with our candidate screening and data analysis capabilities, can support technical services for research institutions and industry partners. For patients, CirCure will establish patient education, safety monitoring, and long-term follow-up systems to strengthen ongoing communication among patients, healthcare teams, and the project. Our business plan also incorporates technical consulting, data services, and support throughout the development and treatment lifecycle.",
      ],
    },
    {
      id: "key-activities",
      title: "Key Activities",
      paragraphs: [
        "Key activities underpin CirCure’s **continued development, validation, and translation**. Technology development remains at the core of the project, encompassing the design and optimization of multi-epitope circRNA candidates, assessment of patient coverage based on TAA expression and HLA matching, epitope screening, and candidate validation. Delivery system development, chemistry, manufacturing, and controls (CMC), quality control, safety evaluation, and process optimization are also integral to product development.",
        "**Intellectual property and regulatory planning** are embedded throughout the development process. We continue to pursue patent and software protection, freedom-to-operate (FTO) analysis, and regulatory pathway planning. Standardized data and document management supports technical collaboration, asset licensing, and regulatory submissions.",
        "Ongoing collaboration with hospitals, specialized laboratories, contract research organizations (CROs), contract development and manufacturing organizations (CDMOs), and biopharmaceutical companies brings their expertise into a shared development pathway. Together, these partners support manufacturing, quality control, safety evaluation, process scale-up, and industrial development. Technology R&D, external collaboration, and asset licensing thus form an integrated framework for translation and commercialization.",
      ],
    },
    {
      id: "key-resources",
      title: "Key Resources",
      paragraphs: [
        "Key resources are the core assets that enable CirCure to **develop, validate, and expand** its product value. Our most important resource is the multi-epitope circRNA vaccine candidate, together with the associated framework for patient stratification, TAA/HLA screening, and candidate design. These assets form the technical foundation of CirCure’s product development.",
        "Our research infrastructure and expertise are also core resources. The First Hospital of Jilin University provides a clinical and research environment that keeps the project connected to real-world disease needs and experimental research. The expertise of our team and advisors in tumor immunology, molecular biology, and bioinformatics supports vaccine R&D and product optimization.",
        "**Data and digital tools** further strengthen CirCure’s R&D capabilities. The CircRNA Vaccine Design System supports the complete workflow, from data processing and target screening to epitope prediction and candidate design. Experimental data and standardized review materials support R&D decisions, external evaluation, and industry collaboration.",
        "In addition, patent applications, software copyrights, R&D know-how, and collaborative networks spanning hospitals, biopharmaceutical companies, and specialized institutions together provide an essential resource base for CirCure’s continued R&D, clinical translation, and industry partnerships.",
      ],
    },
    {
      id: "key-partners",
      title: "Key Partners",
      paragraphs: [
        "Key partners strengthen CirCure’s R&D, clinical translation, and commercialization capabilities by providing **specialized expertise, resources, and access to industry**. Collaboration among clinical, research, manufacturing, and industry partners creates a comprehensive network linking research and development with practical application.",
        "The First Hospital of Jilin University provides an important clinical and research foundation for CirCure, enabling the project to remain grounded in real-world clinical needs. We have reached preliminary cooperation agreements with **Jilin Jika Biotechnology Co., Ltd. and Jilin Province Jien Zhihe Biotherapy Technology Co., Ltd.**, establishing a basis for process validation, pilot-scale production, and subsequent industrial development.",
        "CROs/CDMOs and specialized laboratories can collaborate on delivery system development, CMC, quality evaluation, and safety assessment. Biopharmaceutical companies can participate in joint development, clinical advancement, and commercialization. TTOs, along with intellectual property, legal, and regulatory professionals, provide specialized support for establishing technology ownership, FTO analysis, asset licensing, and product registration. Through these partnerships, CirCure builds a collaborative development framework connecting **industry, academia, research, and clinical practice**.",
      ],
    },
    {
      id: "cost-structure",
      title: "Cost Structure",
      paragraphs: [
        "CirCure’s cost structure is essential to maintaining **R&D continuity and efficient resource use**. Fixed costs primarily cover team and project operations, data and software platform maintenance, intellectual property maintenance, and research infrastructure. By making full use of existing research facilities and shared resources at Jilin University and the First Hospital of Jilin University, we can improve facility utilization and optimize fixed expenditure.",
        "Variable costs are primarily associated with specific R&D and translation activities. These include experimental materials, candidate construction and testing, TAA/HLA-related analyses, animal studies, third-party testing, CRO/CDMO services, delivery system development, CMC, pharmacology and toxicology studies, pilot-scale production, and quality evaluation across multiple batches. Our business plan allocates funding to preclinical research, CMC, activities supporting an investigational new drug (IND) application, and pilot-scale process development.",
        "Intellectual property, regulatory consulting, IND preparation, and industry collaboration are also important components of our cost structure. CirCure follows a **phased investment** approach, aligning funding with R&D activities and milestone outcomes. This focuses resources on the key steps that advance product development and translation, improving overall funding efficiency.",
      ],
    },
    {
      id: "revenue-streams",
      title: "Revenue Streams",
      paragraphs: [
        "CirCure builds long-term commercial value through several interconnected revenue streams. **Technology and asset licensing** are among our core revenue sources. Licensing vaccine candidates, associated technologies, and intellectual property to biopharmaceutical companies can generate revenue while drawing on partners’ industry resources to expand the value of our technology.",
        "**Joint development and milestone payments** represent another important revenue stream. CirCure can collaborate with industry partners to advance preclinical research, process optimization, and clinical development, securing joint development funding, upfront payments, and milestone payments tied to different development stages. Our business plan likewise identifies technology licensing and joint development as key revenue models.",
        "The **CircRNA Vaccine Design System, target screening, and data analysis** capabilities create additional opportunities for software licensing, technical consulting, and data services. Product commercialization can also generate licensing fees, a share of sales revenue, and product sales revenue, gradually extending CirCure’s business model from technology transfer to product value and long-term returns from collaboration.",
        "Together, **technology licensing, joint development, data and technical services, and product commercialization** form a diversified revenue structure that supports CirCure’s continued R&D and long-term development.",
      ],
    },
  ],
};

export const entrepreneurshipThankYouNote: {
  background: string;
  title: string;
  paragraphs: string[];
  signOff: string[];
} = {
  background: entrepreneurshipAssets.illustrations.thankYouPaper,
  title: "A heartfelt thank you from the JLU-FBH Team",
  paragraphs: [
    "We extend our deepest and most sincere gratitude to every individual and organisation who has supported our project, CirCure. This ambitious journey — to turn the recurrence risk that standard treatment leaves behind into something the immune system can be taught to recognise — would not have been possible without your invaluable contributions, unwavering belief, and expert guidance.",
    "From the very beginning, you shared our vision: a future in which the risk that remains after surgery, and the distance between one-size-fits-all cancer vaccines and those rebuilt for every individual patient, could be met with a single, carefully designed candidate. Your faith in our mission to build a multi-epitope circular RNA therapeutic vaccine around the patients it is meant to serve has been a constant source of inspiration and motivation for our entire team.",
    "Whether you helped us see which patients we should be designing for, offered the scientific guidance and laboratory support that shaped our experiments, gave a sample so that our epitopes could be measured rather than predicted, or brought the industry perspective that told us what a candidate must carry before anyone will evaluate it, your role has been integral to our success. The partnerships we have forged are the cornerstones of this project, enabling us to turn a bold idea into a tangible candidate and proving that clinical realism and cutting-edge biotechnology can go hand in hand.",
    "The path forward is filled with new milestones, and we are thrilled to continue this journey alongside you. Together, we are not just developing one vaccine candidate for one group of patients; we are helping to shape a way of designing therapies that begins with the people who will receive them, and writing a new chapter for patient-stratified RNA medicine.",
    "Thank you for being such an essential and cherished part of the CirCure story.",
  ],
  signOff: ["With our warmest regards,", "**The JLU-FBH Team**"],
};

/** One judge's question from the Our Highlights record, answer kept folded. */
export interface EntrepreneurshipHighlight {
  id: string;
  question: string;
  paragraphs: string[];
}

export const entrepreneurshipHighlights: EntrepreneurshipHighlight[] = [
  {
    id: "q1",
    question:
      "Has the team discovered their first potential customers and identified any unmet needs not yet covered by other existing solutions?",
    paragraphs: [
      "**Yes.** Our team discovered **Jilin Jika Biotechnology Co., Ltd.** and **Jilin Jien Zhihe Biotherapy Technology Co., Ltd.** as our first potential customers — both have signed a letter of intent with us — through a patient-first process: conversations with **Dr. Lei Wang** (Department of Oncology, the First Hospital of Jilin University) narrowed \"TNBC\" into one specific clinical decision point, and we then worked outward to the companies able to carry such a candidate forward. Research hospitals are our validation tier; the patients below are the end beneficiaries (see [Primary Customer Segment](#primary-customer-segment)).",
      "The unmet need is equally specific: TNBC patients still carrying **residual invasive disease after neoadjuvant therapy and surgery**, whose recurrence risk does not end when their treatment does. Pembrolizumab, capecitabine and olaparib each help part of this group, but eligibility stays gated by treatment stage and molecular features. Shared-antigen vaccines such as STEMVAC and ITI-5000 fix their antigens without patient-level HLA matching; personalised neoantigen vaccines buy that fit with per-patient manufacture. **In the programmes we could identify, none combines post-surgical risk stratification, TAA and HLA matching, and multi-epitope circRNA design to serve one defined population** — the gap CirCure occupies, as an addition to standard of care, not a replacement (see [Unmet Needs](#unmet-needs-first-customers)).",
    ],
  },
  {
    id: "q2",
    question:
      "Has the team shown that their solution is possible, scalable and inventive?",
    paragraphs: [
      "**Yes.** We have considered all three in full: feasibility tested against experimental evidence and clinical judgement, scalability across production, technology, demand, opportunity, risk and finance, and originality that runs through the whole development path.",
      "**Possible:** CirCure exists as a tested construct, not a proposal. Circularisation is confirmed three independent ways — RNase R resistance, divergent- versus convergent-primer RT-qPCR, and sequencing across the back-splice junction — and all 15 candidate epitopes were ranked by measured IFN-γ ELISpot response rather than by prediction. Clinical and industry advisers, among them **Prof. Jiuwei Cui** and **Prof. Fei Ma**, have reviewed the route, and the clinical entry point CirCure targets already exist in post-surgical care, using tests a breast centre can already run (see [Technology](#technology)).",
      "**Scalable:** We tested this on every axis scalability has. Production: the circularisation reaction is enzyme-free and runs in a device we designed to keep it consistent as batch size grows. Technology: design, TAA/HLA matching and epitope selection are standardised, so a new antigen set does not mean a new platform. Demand: the high-risk post-surgical TNBC population is defined, and it is reached through tests breast centres already run. Opportunity: those same capabilities transfer to further candidates and indications once the first is validated. Risk: TAA/HLA coverage and CMC maturity are the binding limits, and we set out how each is verified and controlled. Finance: licensing and co-development revenue arrives at milestones long before any product revenue (see [Scalability](#scalability)).",
      "**Inventive:** The original idea in CirCure is not circRNA but an inversion: pathology, recurrence risk, TAA expression and HLA background do not filter patients after a vaccine is designed — they define the product before it exists. That places us deliberately between fixed shared-antigen vaccines and per-patient neoantigen vaccines, on a route neither school occupies. The skill is in restraint: \"multi-epitope\" means curated, not accumulated, and an epitope that adds construct, analysis and quality-control burden without adding patient coverage is cut. The imagination is refusing to stop at the molecule —The invention extends into the **CircRNA Vaccine Design System**, which records why a candidate was chosen and why it later changed, and into a **circularisation device** that turns a bench reaction into a repeatable one (see [Inventive](#inventive)).",
    ],
  },
  {
    id: "q3",
    question:
      "Has the team presented logical product development plans with realistic milestones, timelines, resources and risks?",
    paragraphs: [
      "Yes. We have set out a **five-year development path**.The roadmap runs from late 2025 to 2030 in six parallel streams, so entrepreneurship and partnership work advances alongside the science rather than after it — from platform construction through candidate validation and IND preparation to early clinical exploration.",
      "The First Hospital of Jilin University supplies the early site, funding and clinical platform; specialist laboratories, CRO/CDMO and industry partners enter as delivery, CMC, quality and regulatory work begins, with funding released against technical progress rather than committed in advance.",
      "**Risks** are scored by impact and likelihood across five domains — candidate identity, manufacturability, TAA/HLA coverage, safety and funding continuity — and each carries both a mitigation and a decision rule (see [Milestone](#milestone), [Risk Analysis](#risk-analysis), [Key Resources](#key-resources)).",
    ],
  },
  {
    id: "q4",
    question:
      "Has the team outlined the skills, capabilities, and stakeholders required to be credible in developing their solution further?",
    paragraphs: [
      "We investigated the capabilities needed to develop CirCure from an early-stage candidate into a real product and compared them with our team’s existing capabilities. This helped us identify gaps and prompted us to actively gain experience in product development and entrepreneurship. With support from Bethune First Hospital of Jilin University, participation in the iGEM Entrepreneurship Workshop, and ongoing discussions with clinical and industry professionals, we have gradually built a professional network to support CirCure’s continued development.",
      "We also identified and contacted external stakeholders needed for the project’s development, enabling CirCure to access support beyond our team’s existing capabilities, from specialized validation to industrial translation and business development (see [Skills, Capabilities & Stakeholders](#skills-capabilities-stakeholders)).",
    ],
  },
  {
    id: "q5",
    question:
      "Has the team considered the positive and negative long-term impacts of their fully developed solution?",
    paragraphs: [
      "Yes. We assessed what a fully developed CirCure could contribute. For high-risk TNBC patients meeting the screening conditions, it would add an antigen-specific option alongside standard care and make patient–candidate matching explicit rather than assumed; the approach itself is reusable, and the clinic–laboratory–industry collaboration behind it is an outcome in its own right (SDG 3, 9 and 17).",
      "However, like any new therapeutic technology, it raises scientific and social challenges — cross-reactivity, the long-term safety of circRNA and its delivery, and the manufacturing complexity of a multi-epitope construct; then the testing burden screening creates, the patients it may exclude, the sensitivity of the data, and the trust an early-stage vaccine must earn. Each has a defined response built into our development decisions (see [Long-Term Impacts](#long-term-impacts), [Potential Problems & Their Solutions](#potential-problems-and-solutions)).",
    ],
  },
];

/** Downloadable documents rendered through the shared collapsible PDF card. */
export type EntrepreneurshipDocumentKey =
  | "jika"
  | "jienzhihe"
  | "scalability"
  | "businessPlan"
  | "legalPlan";

export interface EntrepreneurshipDocument {
  caption: string;
  url: string;
}

export const entrepreneurshipDocuments: Record<
  EntrepreneurshipDocumentKey,
  EntrepreneurshipDocument
> = {
  jika: {
    caption: "Jilin Jika Letter of Intent",
    url: entrepreneurshipAssets.documents.jikaLetterOfIntent,
  },
  jienzhihe: {
    caption: "Jilin Jien Zhihe Letter of Intent",
    url: entrepreneurshipAssets.documents.jienzhiheLetterOfIntent,
  },
  scalability: {
    caption: "Scalability",
    url: entrepreneurshipAssets.documents.scalability,
  },
  businessPlan: {
    caption: "Business Plan",
    url: entrepreneurshipAssets.documents.businessPlan,
  },
  legalPlan: {
    caption: "Legal Plan",
    url: entrepreneurshipAssets.documents.legalPlan,
  },
};

export const entrepreneurshipPage: WikiPageContent = {
  route: "/entrepreneurship",
  category: "engagement",
  chapter: "Engagement / 01 of 04",
  eyebrow: "Entrepreneurship · Validate the path",
  title: "Entrepreneurship",
  lede: "Test the path from need to adoption.",
  boundary:
    "No incorporated venture, priced product, regulatory decision, or validated market dataset was supplied. The page is a structured business-case working draft.",
  visual: "venture-path",
  visualLabel: "Need-to-implementation assumption path",
  visualSteps: ["need", "user", "minimum proof", "adoption"],
  facts: [
    {
      label: "Problem",
      value: "A costly unmet need is defined by affected users.",
    },
    {
      label: "Alternative",
      value: "Current workflows and competing approaches are explicit.",
    },
    {
      label: "MVP",
      value: "The smallest testable value proposition is named.",
    },
    {
      label: "Risk",
      value: "Science, regulation, access, and adoption remain coupled.",
    },
  ],
  sections: [
    {
      id: "our-highlights",
      index: "01",
      kicker: "",
      title: "Our Highlights",
      summary: "",
      blocks: [{ type: "feature", key: "our-highlights" }],
    },
    {
      id: "overview",
      index: "02",
      kicker: "",
      title: "Overview",
      summary: "",
      blocks: [
        { type: "feature", key: "circure-golden-circle" },
        {
          type: "prose",
          paragraphs: [
            "CirCure aims to develop a multi-epitope circular RNA therapeutic vaccine for patients with triple-negative breast cancer (TNBC) who remain at high risk of recurrence and have residual invasive disease after neoadjuvant therapy and surgery. We combine clinical risk stratification, tumor-associated antigen (TAA) expression screening and human leukocyte antigen (HLA) matching to define the intended patient population and guide vaccine design. Experimentally selected epitopes are encoded within a single circRNA construct and delivered through lipid nanoparticles, with the aim of inducing antigen-specific T-cell responses against tumor cells. Through continued validation and industry collaboration, we seek to develop CirCure as a potential additional treatment option alongside standard care.",
          ],
        },
      ],
    },
    {
      id: "unmet-needs-first-customers",
      anchorIds: ["unmet-needs"],
      index: "03",
      kicker: "",
      title: "Unmet Needs & First Potential Customers",
      summary: "",
      blocks: [
        {
          type: "subheading",
          id: "why-we-started",
          index: "3.1",
          title: "Why We Started",
        },
        {
          type: "prose",
          paragraphs: [
            "We would like to begin with a woman we met during our project whose treatment for triple-negative breast cancer was still ongoing.",
          ],
        },
        {
          type: "callout",
          tone: "neutral",
          body: "She had completed chemotherapy and surgery, but her life did not immediately return to its familiar rhythm. Fatigue lingered even after a night’s sleep; numbness in her fingers slowed familiar movements such as fastening buttons and using chopsticks; and the arm on the side of her surgery occasionally felt tight and heavy. It was only when she raised her arm or carried something that she discovered the new limitations her body had been left with.[1–3] Hair loss, surgical scars, and physical changes required adjustment. Returning to school or work, resuming exercise, and meeting friends—once ordinary parts of life—also had to be planned anew.[1,2] What was harder for others to see was the waiting. For some patients with triple-negative breast cancer, residual invasive disease may still be found after chemotherapy and surgery, meaning that the risk of recurrence does not disappear when these treatments end.[4–6] A follow-up examination, a new pain, or an unfamiliar discomfort could bring the question “Has it come back?” to mind once again. This is precisely the issue we hope to address: could we design a multi-epitope circRNA therapeutic vaccine for patients whose tumor antigen expression and HLA profiles meet the relevant criteria, helping the immune system recognize potential tumor cells more specifically and providing an additional candidate for postoperative intervention that warrants further validation?",
        },
        {
          type: "prose",
          paragraphs: [
            "These real-life circumstances strengthened our team’s conviction that what we wanted to develop could not remain merely a laboratory technology. It should serve real women who still need more options and, from the outset, be evaluated in terms of clinical pathways, safety, treatment burden, and feasibility.",
            "We are from Bethune First Hospital of Jilin University. In addressing this challenge, we hoped to begin with a candidate that could be tested: could a single circRNA carry multiple candidate epitopes to explore antigen-specific immune intervention for patients selected according to risk, antigen expression, and HLA criteria?",
            "This idea later acquired a name—CirCure. “Cir” comes from “circular RNA,” representing the core technological vehicle of our project; “Cure” embodies our hope of achieving a cure for patients and our scientific mission. CirCure sounds similar to “circular,” echoing the molecular nature of circular RNA while also expressing our project’s vision: to build on a circular RNA technology platform to bring new hope for a cure to patients with triple-negative breast cancer.",
            "Once we had given the idea a name, the truly difficult questions were only beginning to emerge: Which patients should it serve? How should candidates be selected? What evidence would be needed to move forward? And which tasks would need to be entrusted to partners with more specialized expertise? Every subsequent discussion and validation effort continued to reshape our answers.",
          ],
        },
        {
          type: "callout",
          tone: "neutral",
          body: "**Core Question:** Given the substantial toxicity and side effects of treatments such as chemotherapy and radiotherapy, could there be a therapy with relatively low toxicity and fewer side effects that offers longer-lasting effects, greater affordability, and more complete disease eradication than CAR-T therapy?",
        },
        {
          type: "subheading",
          id: "stakeholder-matrix",
          index: "3.2",
          title: "Stakeholder Matrix",
        },
        {
          type: "prose",
          paragraphs: [
            "For CirCure, stakeholder analysis provides an essential foundation for connecting patient needs, clinical judgment, and subsequent translation into clinical practice. The traditional 2I model primarily considers Interest and Influence, which can overlook groups with limited decision-making influence who may nevertheless be directly affected by the project. CirCure involves multiple stakeholders, including patients, clinicians, research hospitals, testing teams, industry partners, regulators, and payers. We therefore added Impact to adopt a 3I framework, identifying stakeholders more comprehensively across three dimensions: who is interested in the project, who can influence it, and who will be affected by it.",
            "In the three-dimensional matrix, the X-axis represents Interest, the Y-axis represents Influence, and the Z-axis represents Impact—the extent to which stakeholders are affected. This framework helps us identify key collaborators and decision-makers while also incorporating patient rights, treatment burden, equity, and accessibility into project decisions, making CirCure’s development more comprehensive and ensuring that it remains patient-centered throughout.",
          ],
        },
        { type: "feature", key: "stakeholder-matrix-3d" },
        {
          type: "subheading",
          id: "who-we-hope-to-serve",
          index: "3.3",
          title: "Who We Hope to Serve",
        },
        {
          type: "subheading",
          id: "defining-target-patient-population",
          index: "3.3.1",
          title: "Defining the Target Patient Population",
        },
        {
          type: "prose",
          paragraphs: [
            "CirCure initially targeted a broad population of patients with TNBC, but defining the population solely by disease was insufficient to establish clear product and market positioning. Patients with TNBC differ in their treatment pathways, postoperative pathological findings, and subsequent risks. We therefore further segmented the target population by considering the clinical settings in which the candidate product could offer potential value.",
            "Drawing on clinical evidence linking residual cancer burden to long-term prognosis, as well as discussions with **Dr. Lei Wang from the Department of Oncology at the First Hospital of Jilin University**, we narrowed our current target population to patients with TNBC who have residual invasive disease after completing neoadjuvant systemic therapy and surgery, are at high risk of recurrence, and meet the criteria for candidate TAA expression and HLA matching. This refinement moved CirCure from a broad TNBC vaccine concept toward a defined treatment stage and patient population, while also making TAA/HLA screening an integral part of product design and subsequent market assessment.",
          ],
        },
        {
          type: "figure",
          src: entrepreneurshipAssets.illustrations.who,
          width: 4000,
          height: 3000,
          alt: "Diagram defining CirCure's target patient population",
          caption: "Defining CirCure's target patient population.",
        },
        {
          type: "subheading",
          id: "empathy-map",
          index: "3.3.2",
          title: "Empathy Map",
        },
        {
          type: "prose",
          paragraphs: [
            "To develop CirCure into a project with real potential for clinical translation, we must thoroughly understand the circumstances and needs of our target patients. Our research indicates that patients with TNBC who have residual invasive disease after completing neoadjuvant therapy and surgery and are at high risk of recurrence face a range of interconnected challenges. Their subsequent decisions concern not only whether further treatment options are available, but also how to understand their own risk, whether they meet screening criteria, and what burdens additional testing, follow-up, and treatment may impose. Disease characteristics and technical feasibility alone are therefore insufficient to determine whether a candidate truly meets patient needs.",
            "To address this, we introduced an **Empathy Map** to systematically understand patients’ circumstances and decisions at this specific treatment stage from their perspective. By mapping stakeholders’ goals, external environment, statements, behaviors, information sources, and inner thoughts and feelings, an Empathy Map helps the team identify needs, concerns, and factors influencing decisions that technical analysis alone may miss. For CirCure, it reframes patient screening, treatment choices, and follow-up burden as issues that must be reconsidered through patients’ lived experiences, rather than merely as considerations in product design. This process helped us clarify patients’ concerns about recurrence risk, treatment suitability, additional testing and follow-up, and the evidence supporting new treatments. We then used these insights to refine CirCure’s patient screening, information communication, integration into treatment pathways, and subsequent product design.",
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "Please explore the Empathy Map we developed as a tool to help us understand our target patients’ circumstances and treatment environment, as well as the pain points and expectations we identified in seeking to meet their needs.",
          ],
        },
        {
          type: "figure",
          src: entrepreneurshipAssets.illustrations.empathyMap,
          width: 1536,
          height: 1024,
          alt: "Empathy map of the target TNBC patients",
          caption: "The Empathy Map developed for the target TNBC patients.",
        },
        {
          type: "subheading",
          id: "value-proposition-canvas",
          index: "3.4",
          title: "Value Proposition Canvas",
        },
        {
          type: "prose",
          paragraphs: [
            "CirCure’s Value Proposition Canvas helps us understand the needs of our target patients and clinicians and align product design with the practical challenges faced by patients with TNBC who are at high risk after surgery. By identifying the ongoing risk of recurrence, patient screening and treatment burdens, and the clinical need for a clearly defined eligible patient population and potential new treatment options, the canvas helps us further refine patient stratification, TAA/HLA matching, and multi-epitope circRNA vaccine design. This approach also enables us to continually adapt the product based on feedback from patients, clinicians, and industry stakeholders, bringing CirCure’s development into closer alignment with real clinical needs and future pathways to clinical translation.",
          ],
        },
        {
          type: "figure",
          src: entrepreneurshipAssets.illustrations.valuePropositionCanvas,
          width: 1448,
          height: 1086,
          alt: "Value Proposition Canvas for CirCure",
          caption: "Value Proposition Canvas for CirCure.",
        },
        {
          type: "subheading",
          id: "primary-customer-segment",
          index: "3.5",
          title: "Primary Customer Segment",
        },
        {
          type: "prose",
          paragraphs: [
            "In the first half of 2026, the biopharmaceutical industry in Changchun New Area generated an output value of RMB 18.07 billion, representing year-on-year growth of 9%. The area is currently home to 210 pharmaceutical and healthcare companies, forming an industrial cluster centered on biologics, with distinctive strengths in medical devices and modern traditional Chinese medicine.[7,8] Changchun High-Tech Zone ranks 14th nationally and first in Northeast China in the overall industrial competitiveness of biopharmaceutical parks. Meanwhile, with Jilin University at its core, the high-tech section of “Changchun Pharmaceutical Valley” draws on regional research resources to develop a center for basic biopharmaceutical research and a source of innovation in new drug development.[9,10]",
            "CirCure emerged from this industrial and research environment and draws on the resources of the First Hospital of Jilin University to conduct early-stage research. As the project has progressed, we have established initial industry contacts with Jilin Jika Biotechnology Co., Ltd.  and Jilin Jien Zhihe Biotherapy Technology Co., Ltd. . These connections provide a starting point for understanding companies’ practical requirements for early-stage candidate assets, validation data, and subsequent development capabilities.",
            "Changchun therefore serves not only as the starting point for CirCure’s research and development, but also as a practical foundation for connecting with biopharmaceutical companies with capabilities in cancer immunotherapy, RNA therapeutics, or vaccine development; identifying our first potential customers; and exploring collaborations in candidate evaluation, joint validation, and subsequent development.",
          ],
        },
        { type: "feature", key: "doc-jienzhihe" },
        { type: "feature", key: "doc-jika" },
        {
          type: "subheading",
          id: "comparison-of-existing-solutions",
          index: "3.6",
          title: "Comparison of Existing Solutions",
        },
        {
          type: "prose",
          paragraphs: [
            "Several clinically validated treatment options are currently available for high-risk early-stage TNBC. Pembrolizumab can be combined with chemotherapy as neoadjuvant treatment and continued after surgery; capecitabine can be used as further adjuvant therapy for some patients with residual invasive disease after neoadjuvant chemotherapy; and olaparib provides a targeted treatment option for high-risk patients with HER2-negative disease who meet the germline BRCA1/2 eligibility criteria.[11–13] These regimens have improved outcomes for some patients, but their applicability is limited by treatment stage, prior treatment, and molecular characteristics.",
            "Therapeutic cancer vaccines offer another approach. Shared-antigen vaccines use a preselected set of tumor-associated antigens, allowing the same candidate to be used in a group of patients. For example, STEMVAC uses a multi-antigen DNA vaccine strategy for early-stage TNBC, while ITI-5000 uses self-amplifying RNA in clinical research involving stage II–III TNBC.[14,15] These approaches more readily lend themselves to standardized candidates, but the extent of patient coverage offered by fixed antigen combinations and their ability to elicit sufficient antitumor immunity require further validation.",
            "Personalized neoantigen vaccines take this a step further by tailoring vaccine design to mutations in each patient’s tumor. This typically involves obtaining a tumor sample, identifying patient-specific targets through sequencing and neoantigen screening, and then producing a personalized vaccine based on those targets. Such strategies have entered clinical research in TNBC and other cancers.[16] This approach improves the match between individual patients and vaccine antigens, but also increases the complexity of sampling, analysis, design, and manufacturing for each patient.",
            "Our solution seeks a balance between shared-antigen and fully personalized vaccines. CirCure first defines its target patient population based on residual invasive disease and recurrence risk, then screens patients according to candidate TAA expression and HLA criteria, with plans to encode multiple candidate epitopes within a single circRNA. This design retains the ability to use a shared candidate across a group of patients while incorporating patient stratification directly into vaccine design. However, its TAA/HLA coverage, epitope presentation, delivery, safety, and added clinical value still require further validation. CirCure is therefore currently positioned as a potential add-on candidate to standard treatment, rather than a replacement for existing therapies.",
          ],
        },
        {
          type: "table",
          headers: [
            "Approach",
            "Technical Approach",
            "Advantages",
            "Limitations",
            "Clinical Application Perspective",
            "R&D and Manufacturing Perspective",
          ],
          rows: [
            [
              "Current Standard Treatments",
              "Perioperative pembrolizumab plus chemotherapy; capecitabine may be considered for patients with residual disease; olaparib may be used in selected patients with germline BRCA1/2 mutations",
              "Established clinical evidence; clearly defined treatment pathways; improved outcomes for some patients",
              "Eligibility varies by treatment stage, prior treatment, and biomarkers; not all high-risk patients are eligible",
              "Established in standard clinical practice and represents the existing options against which CirCure must first be assessed",
              "Mature development, manufacturing, and regulatory frameworks; new products must demonstrate added value over existing treatments",
            ],
            [
              "Shared-Antigen Therapeutic Vaccines",
              "Multiple shared tumor antigens are selected in advance and expressed using platforms such as DNA or self-amplifying RNA (saRNA), as in STEMVAC and ITI-5000",
              "A single candidate can serve a group of patients; easier to standardize; can target multiple antigens simultaneously",
              "A fixed antigen set may not suit all patients; actual population coverage and clinical benefit remain to be validated",
              "Under investigation in TNBC clinical studies, but the approach remains in development overall",
              "Easier to develop as a standardized product than individually customized vaccines, but antigen selection directly determines the eligible population",
            ],
            [
              "Personalized Neoantigen Vaccines",
              "Tumor sampling and sequencing → mutation identification → HLA/neoantigen screening → patient-specific vaccine design and manufacturing",
              "Closely matched to each patient’s tumor characteristics; can target patient-specific neoantigens",
              "Require individual analysis and manufacturing; complex workflows; demanding timelines and quality control requirements",
              "Offer a high degree of patient-specific matching, but require additional sampling, testing, and waiting time",
              "Individual design and manufacturing for each patient make standardization and scale-up more challenging",
            ],
            [
              "CirCure",
              "Stratification based on residual disease and recurrence risk + TAA expression screening + HLA matching + construction of multiple epitopes within a single circRNA",
              "Integrates patient stratification with vaccine design; a single candidate can serve a screened group of patients; seeks a balance between shared and personalized approaches",
              "TAA/HLA coverage, epitope presentation, delivery, CMC, safety, and efficacy require further validation",
              "Intended for a defined postoperative population with high-risk TNBC as a potential add-on candidate alongside standard treatment",
              "Shared constructs offer the potential for reuse across eligible patients, but candidate identity, quality consistency, and scalable manufacturing remain to be validated",
            ],
          ],
        },
        {
          type: "subheading",
          id: "environmental-assessment",
          index: "3.7",
          title: "Environmental Assessment",
        },
        {
          type: "subheading",
          id: "pestel-analysis",
          index: "3.7.1",
          title: "PESTEL Analysis",
        },
        {
          type: "prose",
          paragraphs: [
            "We conducted a **PESTEL analysis** to explore factors that could influence our project’s success from **political, economic, social, technological, environmental, and legal perspectives**.",
          ],
        },
        {
          type: "figure",
          src: entrepreneurshipAssets.illustrations.pestel,
          width: 1526,
          height: 823,
          alt: "PESTEL analysis of factors influencing CirCure",
          caption: "PESTEL analysis of factors influencing CirCure.",
        },
        {
          type: "subheading",
          id: "tam-sam-som-analysis",
          index: "3.7.2",
          title: "TAM, SAM, SOM Analysis",
        },
        {
          type: "figure",
          src: entrepreneurshipAssets.illustrations.tamSamSom,
          width: 1448,
          height: 1086,
          alt: "TAM, SAM and SOM market analysis for CirCure",
          caption: "TAM, SAM and SOM market analysis for CirCure.",
        },
        {
          type: "prose",
          paragraphs: [
            "**Jilin (SOM):** As mentioned above, Jilin Province had 11.63 million female residents at the end of 2024 [17], corresponding to approximately 6,000 new cases of female breast cancer annually at China's national incidence [18]. Based on the clinical criteria that define the target indication — 15% triple-negative, 55% treated by neoadjuvant therapy followed by surgery, and 45% left with residual invasive disease [19] — approximately 225 patients in the province reach this treatment point each year, giving a provincial market of approximately RMB 64 million (approximately USD 9.0 million) at a course price of USD 40,000. Assuming an initial target market share of 45%, the SOM would be calculated to be approximately **RMB 28.8 million (approximately USD 4.05 million)**.",
            "**China (SAM):** China records more new cases of female breast cancer than any other country, with 357,161 women newly diagnosed in 2022 [20]. Applying the same clinical criteria, approximately 13,300 patients reach this treatment point annually, and at the same course price the SAM segment is calculated to be approximately **RMB 3.78 billion (approximately USD 530 million)**.",
            "**Global (TAM):** Worldwide, 2.3 million women are diagnosed with breast cancer each year [18]. Applying the same clinical criteria, approximately 85,400 patients reach the post-surgical treatment point that a therapeutic vaccine addresses; at a course price of USD 40,000, a conservative estimate places the Total Addressable Market (TAM) at approximately **USD 3.42 billion**.",
          ],
        },
      ],
    },
    {
      id: "solution-proposed",
      index: "04",
      kicker: "",
      title: "Solution proposed",
      summary: "",
      blocks: [
        {
          type: "subheading",
          id: "technology",
          index: "4.1",
          title: "Technology",
        },
        {
          type: "subheading",
          id: "origins-of-technical-requirements",
          index: "4.1.1",
          title: "Origins of the Technical Requirements",
        },
        {
          type: "prose",
          paragraphs: [
            "CirCure’s technical choices began with “Who are we designing for?” rather than “Which new technology should we use?” Once the target population was narrowed to patients with TNBC who have residual invasive disease after completing neoadjuvant systemic therapy and surgery and meet the criteria for candidate TAA expression and HLA matching, the technical requirements became concrete: the candidate needed to sustain a sufficiently long window of antigen availability, cover multiple tumor-associated antigens to reduce the risk of single-antigen escape, and follow a reusable production process rather than one rebuilt for each patient. Every decision below was made in response to these three requirements.",
          ],
        },
        {
          type: "subheading",
          id: "choice-of-vector-circular-rna",
          index: "4.1.2",
          title: "Choice of Vector: Circular RNA",
        },
        {
          type: "prose",
          paragraphs: [
            "We selected circular RNA rather than linear mRNA as the vaccine vector. circRNA is covalently closed and lacks free 5′ and 3′ ends, making it resistant to degradation by intracellular exonucleases.Our in vitro time-course experiments directly confirmed this: linear RNA was almost completely degraded by 24 hours, whereas circRNA remained clearly detectable at 72 hours. This choice also eliminated the need for 5′ cap analogs—among the most expensive raw materials used in linear mRNA production.",
          ],
        },
        {
          type: "subheading",
          id: "circularization-method-pie-self-splicing",
          index: "4.1.3",
          title: "Circularization Method: PIE Self-Splicing",
        },
        {
          type: "prose",
          paragraphs: [
            "Circularization uses a permuted intron–exon (PIE) self-splicing strategy derived from the group I intron of the T4 bacteriophage *td* gene, rather than RNA ligase or chemical ligation.Once precursor RNA transcription is complete, only GTP and Mg²⁺ need to be added. During incubation at 55 °C for 10–15 minutes, the intron mediates end-to-end ligation through two transesterification reactions, with no proteases introduced at any stage. Circularization was cross-validated using three approaches: parallel controls with and without RNase R treatment, RT-qPCR quantification using divergent and convergent primers, and Sanger sequencing across the back-splice junction (BSJ) as direct evidence. To maintain reaction consistency during scale-up, we also designed an integrated nucleic acid circularization reaction device.",
          ],
        },
        {
          type: "subheading",
          id: "payload-selection-experimentally-screened-epitopes",
          index: "4.1.4",
          title: "Payload Selection: Experimentally Screened Epitopes",
        },
        {
          type: "prose",
          paragraphs: [
            "The vaccine payload is determined by experimental measurements rather than predictions alone. IEDB binding predictions and VaxiJen antigenicity filtering yielded 17 candidate peptides. After merging two pairs of naturally adjacent epitopes, we constructed 15 single-epitope circRNAs and tested each individually using IFN-γ ELISpot in an autologous moDC–T-cell co-culture system derived from HLA-A*02:01-typed volunteers. For each antigen, we retained the two epitopes that elicited the strongest measured responses.",
            "Experimental results changed our assessment on several occasions: CTL2 and CTL3 were ultimately selected for LIV-1, rather than CTL1, which had ranked highest in the predictions. For B7-H4, we deliberately excluded the most immunogenic peptide, ILFWSIISI, because it lies within the signal peptide region and lacks tumor specificity. For all four antigens, the wells containing a mixture of all epitopes from a given antigen produced weaker responses than that antigen’s strongest individual epitope. This suggested competition or dilution among epitopes and provided experimental support for selecting a small number of epitopes rather than including as many as possible.",
          ],
        },
        {
          type: "subheading",
          id: "construct-design-linkers-translation-and-antigen-presentation",
          index: "4.1.5",
          title: "Construct Design: Linkers, Translation, and Antigen Presentation",
        },
        {
          type: "prose",
          paragraphs: [
            "Eight epitopes are linked in tandem within a single circRNA using flexible GS linkers. The seven internal linkers encode the same pentapeptide but use distinct codon sequences to eliminate the risk of homologous recombination caused by repetitive sequences during cloning and passaging. Because circular RNA lacks a 5′ cap, translation relies entirely on an internal ribosome entry site. We use an IRES element derived from the human rhinovirus 5′ UTR to drive cap-independent translation.",
            "A tPA signal peptide is fused upstream of the epitope cassette to direct the nascent peptide into the secretory pathway, while an MHC class I trafficking domain is fused downstream to increase the proportion of antigen entering the MHC-I loading pathway.Four tandem copies of the C3d-P28 molecular adjuvant are encoded in the same reading frame,allowing the adjuvant to be delivered with the bulk drug substance without being added separately to the formulation. The construct’s FLAG tag was used to directly verify that the expression system was functional: anti-FLAG immunoblotting yielded a specific band at 50 kDa.",
          ],
        },
        {
          type: "subheading",
          id: "delivery-and-administration",
          index: "4.1.6",
          title: "Delivery and Administration",
        },
        {
          type: "prose",
          paragraphs: [
            "The candidate is encapsulated in lipid nanoparticles. We selected LNPs because they are currently the only nucleic acid delivery system validated through large-scale use in humans, providing established precedents for regulatory and chemistry, manufacturing, and controls (CMC) pathways. In vivo studies use subcutaneous injection at the base of the tail, allowing antigens to reach the draining lymph nodes for uptake by dendritic cells. The working dose range was also determined experimentally: in the dendritic cell co-culture system, cell viability remained stable over the 0–200 ng range but declined markedly at 400 ng. Accordingly, 200 ng is the current upper dose limit.",
          ],
        },
        {
          type: "subheading",
          id: "clinical-origins-of-technical-decisions",
          index: "4.1.7",
          title: "Clinical Origins of Technical Decisions",
        },
        {
          type: "prose",
          paragraphs: [
            "None of these decisions was made solely within the laboratory. The narrowing of the target patient population arose from discussions with Dr. Lei Wang from the Department of Oncology at the First Hospital of Jilin University. Discussions with Dr. Yefan Hu from Beiwan Biotech  prompted us to address candidate identity traceability and production considerations earlier in the development pathway. Our technical approach has therefore remained grounded in a specific clinical question, rather than representing an isolated technological choice.",
          ],
        },
        {
          type: "figure",
          src: entrepreneurshipAssets.illustrations.technology,
          width: 2117,
          height: 743,
          alt: "Overview of CirCure's technical design decisions",
          caption: "Overview of CirCure's technical design decisions.",
        },
        {
          type: "subheading",
          id: "mvp",
          index: "4.2",
          title: "MVP",
        },
        {
          type: "prose",
          paragraphs: [
            "**MVP (Minimum Viable Product)**",
            "The following picture showcases a mockup of our MVP (Minimum Viable Product), i.e., our technical approach to the project.",
          ],
        },
        {
          type: "figure",
          src: entrepreneurshipAssets.illustrations.mvp,
          width: 3000,
          height: 1709,
          alt: "Mockup of the CirCure MVP (Minimum Viable Product)",
          caption: "Mockup of the CirCure MVP (Minimum Viable Product).",
        },
        {
          type: "prose",
          paragraphs: [
            "We built a circRNA vaccine design-and-production system capable of turning a tumour expression dataset into a circularised, self-adjuvanted, LNP-formulated multi-epitope construct. To make that system usable by a laboratory holding vaccine targets but no RNA platform, we adopted a four-pronged strategy:",
          ],
        },
        {
          type: "list",
          ordered: true,
          items: [
            "Replacing enzymatic ligation with PIE self-splicing, so that circularisation needs only GTP and magnesium at 55 °C, introduces no protein enzyme, and dispenses with the 5′ cap analogue — the costliest raw material in linear mRNA production;",
            "Encoding presentation and adjuvanticity into the construct itself, with an IRES driving cap-independent translation, a tPA signal peptide and an MHC-I trafficking domain routing the product, and a C3d-P28 adjuvant carried in the same reading frame, so that the adjuvant travels with the drug substance and no separate formulation step is required;",
            "Keeping the vector modular, with promoter, IRES and flanking PIE elements fixed and the epitope cassette exchangeable, so that a different antigen set — or a different tumour — can be loaded without rebuilding the construct;",
            "Pairing the design software with the reaction hardware, so that the sequences returned by the CircRNA Vaccine Design System pass directly into plasmid construction, while a three-module reaction kit and an integrated circularisation device hold the reaction consistent as batch size grows.",
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "Our system transforms a tumour expression dataset into a formulated multi-epitope circRNA vaccine, embodying a route that is stable, simple to prepare, and quick to re-adapt — achieving both a traceable design record and a reusable production route.",
            "Among the projects we have so far been able to identify, none combines post-surgical residual-disease and recurrence-risk screening, TAA expression and HLA matching, and multi-epitope design on a single circRNA in the way ours does, using technology registered under software copyright 2026SR0543219 and utility model application 2026204425615. However, given its nature as a technology — or rather, a route to producing circRNA vaccine rather than a therapy in itself — our team may encounter challenges in commercializing the product.",
            "Therefore, beyond technology transfer and patent licensing, CirCure is committed to the direct supply of research-grade circRNA vaccines to better meet market demands — whether for hospital and university research groups, domestic biopharmaceutical companies, or partners carrying a candidate towards the clinic.",
          ],
        },
        {
          type: "subheading",
          id: "scalability",
          index: "4.3",
          title: "Scalability",
        },
        {
          type: "prose",
          paragraphs: [
            "For CirCure, scalability determines whether the project can evolve from its current TNBC therapeutic vaccine into a reproducible and sustainable development system. By establishing standardized processes for product design, patient screening, and validation, we can maintain evidence quality and consistency in development while laying the groundwork for future technical scale-up, expansion into additional clinical pathways, and external collaboration. Meanwhile, replicable collaboration and business models can help integrate external resources from hospitals, CROs/CDMOs, and biopharmaceutical companies, strengthening the project’s capacity to progress through different stages of development. Once the first product has been thoroughly validated, the existing design and development framework may also support the exploration of additional therapeutic programs and potential indications. By systematically assessing the potential for expansion—and its limitations—across technical, clinical, operational, commercial, and platform dimensions, we aim to establish a clearer, more sustainable path for CirCure from early-stage research and development toward long-term clinical translation.",
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "**To learn more about our scalability, click below to download.**",
          ],
        },
        { type: "feature", key: "doc-scalability" },
        {
          type: "subheading",
          id: "inventive",
          index: "4.4",
          title: "Inventive",
        },
        {
          type: "prose",
          paragraphs: [
            "CirCure’s innovation lies not only in its use of **circRNA** as a vaccine vector, but also in integrating **clinical patient stratification, TAA/HLA matching, and multi-epitope vaccine design** into a single development pathway. From the outset, vaccine design is guided by three questions: **“Who is it designed for, what should it recognize, and how should the candidate be developed?”**",
          ],
        },
        {
          type: "prose",
          paragraphs: ["Our design focuses on the following:"],
        },
        {
          type: "figure",
          src: entrepreneurshipAssets.illustrations.inventiveFocus,
          width: 1448,
          height: 274,
          alt: "Overview of CirCure's design focus",
          caption: "Overview of CirCure's design focus.",
        },
        {
          type: "prose",
          paragraphs: [
            "CirCure does not broadly target all patients with TNBC. We first focus on **patients who have residual invasive disease after completing neoadjuvant systemic therapy and surgery and are at high risk of recurrence**, then incorporate candidate TAA expression and HLA criteria into patient screening. In other words, pathological findings, clinical risk, antigen expression, and HLA profiles are not additional criteria applied after vaccine design is complete; They directly shape the product definition.",
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "Building on this foundation, we have chosen a design approach that sits **between fixed shared-antigen vaccines and fully personalized neoantigen vaccines**. Shared TAAs preserve the possibility of using the same candidate across a group of patients, while HLA matching improves the alignment between candidate epitopes and the target population. We also plan to integrate multiple candidate epitopes into a single circRNA. Compared with a single-antigen approach, this design aims to reduce the risk of excessive reliance on one antigen; compared with neoantigen vaccines customized for each patient, it retains a more standardized development approach.",
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "Here, “multi-epitope” does not simply mean adding more epitopes. We **consider both gains in patient coverage and construct complexity in our design decisions**, continually screening candidates based on combined TAA/HLA coverage, normal tissue expression, potential cross-reactivity, and antigen processing and presentation results. If an additional epitope increases the complexity of construction, analysis, and quality control without providing a corresponding gain in coverage, we will remove or replace it to keep the candidate amenable to validation and development.",
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "CirCure’s innovation also extends to **how candidates are generated and iteratively refined**. To reduce the fragmentation of information caused by distributing expression data analysis, target screening, and epitope prediction across different tools, we independently developed the **CircRNA Vaccine Design System**, which organizes these steps into a unified digital workflow.",
          ],
        },
        {
          type: "prose",
          paragraphs: ["This system further enables us to:"],
        },
        {
          type: "figure",
          src: entrepreneurshipAssets.illustrations.inventiveSystem,
          width: 1448,
          height: 227,
          alt: "Capabilities of the CircRNA Vaccine Design System",
          caption: "Capabilities of the CircRNA Vaccine Design System.",
        },
        {
          type: "prose",
          paragraphs: [
            "The software does not replace researchers’ judgment. Instead, it helps the team record data sources, analysis parameters, screening results, and decisions made by researchers, making it possible to trace why a candidate was selected and why it was subsequently modified. The vaccine candidate remains CirCure’s core product, while the software and standardized data package make the candidate easier to review internally and provide a clearer basis for future external review by hospitals and industry partners.",
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "Meanwhile, we have extended our innovation from digital design to production. The project has developed a **patent application for an integrated nucleic acid circularization reaction device related to circRNA vaccine production** and completed software copyright registration for the CircRNA Vaccine Design System, gradually building a portfolio of technical assets spanning candidate design and production.",
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "Ultimately, **patient stratification, multi-epitope circRNA, and a traceable design system** together form the core rationale behind CirCure’s innovation. Our aim is not simply to apply a new form of RNA to TNBC, but to **let clinical needs define patient selection, incorporate patient characteristics into candidate design, use digital workflows to document the rationale behind design decisions, and enable candidates to be continually tested and refined through subsequent validation**. CirCure’s innovation therefore extends beyond a single molecule to encompass the entire research and development process, from defining the patient population to developing the candidate.",
          ],
        },
      ],
    },
    {
      id: "development-plans",
      index: "05",
      kicker: "",
      title: "Development plans",
      summary: "",
      blocks: [
        {
          type: "subheading",
          id: "swot-analysis",
          index: "5.1",
          title: "SWOT Analysis",
        },
        {
          type: "prose",
          paragraphs: [
            "The SWOT analysis helps us better understand CirCure’s current position and the key factors shaping its future development. By systematically examining strengths, weaknesses, opportunities, and threats, we can clarify our existing foundations, identify key capabilities that still need to be developed, and anticipate external changes that may affect the project’s progress. These insights allow us to refine our development priorities and maintain flexibility in responding to future challenges.",
          ],
        },
        {
          type: "figure",
          src: entrepreneurshipAssets.illustrations.swot,
          width: 1448,
          height: 922,
          alt: "SWOT analysis of CirCure",
          caption: "SWOT analysis of CirCure.",
        },
        {
          type: "subheading",
          id: "competitors",
          index: "5.2",
          title: "Competitors",
        },
        {
          type: "prose",
          paragraphs: [
            "We also conducted a competitor analysis, grouping competitors into three categories: **direct competitors, indirect competitors, and future competitors**. This classification helps us understand CirCure’s competitive landscape across three dimensions: similar products, alternative treatments, and future technologies.",
          ],
        },
        {
          type: "subheading",
          id: "direct-competitors",
          index: "5.2.1",
          title: "Direct Competitors",
        },
        {
          type: "prose",
          paragraphs: [
            "Direct competitors are projects or organizations that use **therapeutic cancer vaccine strategies**, serve patients with early-stage or high-risk TNBC, and target clinical settings similar to those of CirCure. CirCure focuses on high-risk TNBC, combining TAA expression, HLA matching, and multi-epitope circRNA design to develop a vaccine approach guided by patient stratification. The following projects are representative competitors in the TNBC therapeutic vaccine field.",
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "**Immunomic Therapeutics — ITI-5000:** ITI-5000 is a self-amplifying RNA therapeutic vaccine for stage II–III TNBC. It uses LNPs to deliver two tumor antigens, HERV-K and CT83, and is intended for patients who have completed standard treatment. Its VITAL-TNBC Phase I study began in 2026.",
          ],
        },
        {
          type: "figure",
          src: entrepreneurshipAssets.illustrations.competitorImmunomicTherapeutics,
          width: 581,
          height: 184,
          alt: "Immunomic Therapeutics — ITI-5000",
          caption: "Immunomic Therapeutics — ITI-5000.",
        },
        {
          type: "prose",
          paragraphs: [
            "**University of Washington — STEMVAC:** STEMVAC is a multi-antigen DNA therapeutic vaccine for early-stage TNBC. It uses a polyepitope plasmid to simultaneously target multiple breast cancer-associated antigens and has entered Phase II clinical investigation.",
          ],
        },
        {
          type: "figure",
          src: entrepreneurshipAssets.illustrations.competitorUniversityOfWashingtonStemvac,
          width: 3840,
          height: 2160,
          alt: "University of Washington — STEMVAC",
          caption: "University of Washington — STEMVAC.",
        },
        {
          type: "prose",
          paragraphs: [
            "**Cleveland Clinic — α-Lactalbumin Vaccine:** This project has developed an α-lactalbumin therapeutic vaccine for patients with non-metastatic TNBC at high risk of recurrence, with particular inclusion of patients with residual disease. It targets a breast-associated antigen to induce antitumor immunity.",
          ],
        },
        {
          type: "figure",
          src: entrepreneurshipAssets.illustrations.competitorClevelandClinic,
          width: 3840,
          height: 2160,
          alt: "Cleveland Clinic — α-Lactalbumin Vaccine",
          caption: "Cleveland Clinic — α-Lactalbumin Vaccine.",
        },
        {
          type: "subheading",
          id: "indirect-competitors",
          index: "5.2.2",
          title: "Indirect Competitors",
        },
        {
          type: "prose",
          paragraphs: [
            "Indirect competitors are companies or products that use **different therapeutic approaches to address similar clinical needs in TNBC**. Although these products are not therapeutic circRNA vaccines, they already serve the high-risk early-stage TNBC treatment setting and therefore constitute indirect competition within CirCure’s clinical market.",
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "**Merck — KEYTRUDA®:** KEYTRUDA (pembrolizumab) is already used for high-risk early-stage TNBC, in combination with chemotherapy as neoadjuvant treatment and continued after surgery as adjuvant treatment. It has an established clinical pathway in perioperative TNBC care.",
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "**AstraZeneca — LYNPARZA®:** LYNPARZA (olaparib) is approved for patients with germline BRCA-mutated, HER2-negative, high-risk early-stage breast cancer who have received neoadjuvant or adjuvant chemotherapy. It provides a targeted postoperative adjuvant treatment option for the subset of patients with TNBC who meet the molecular criteria.",
          ],
        },
        {
          type: "figure",
          src: entrepreneurshipAssets.illustrations.competitorMerck,
          width: 3056,
          height: 1380,
          alt: "Merck — KEYTRUDA (pembrolizumab)",
          caption: "Merck — KEYTRUDA (pembrolizumab).",
        },
        {
          type: "figure",
          src: entrepreneurshipAssets.illustrations.competitorAstraZeneca,
          width: 4000,
          height: 2250,
          alt: "AstraZeneca — LYNPARZA (olaparib)",
          caption: "AstraZeneca — LYNPARZA (olaparib).",
        },
        {
          type: "subheading",
          id: "future-competitors",
          index: "5.2.3",
          title: "Future Competitors",
        },
        {
          type: "prose",
          paragraphs: [
            "Future competitors are potential direct or indirect competitors that may enter CirCure’s market. With rapid advances in **circular RNA, RNA delivery, and therapeutic cancer vaccines**, an increasing number of companies and research institutions are advancing these technologies toward clinical application. For example, Therorna has advanced its circular RNA therapeutic cancer vaccine, TI-0093, into Phase I.",
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "These emerging participants may further expand into breast cancer and cancer vaccines guided by patient stratification, creating a more diverse competitive landscape. To maintain our competitive advantage, CirCure will continue strengthening its distinctive combination of **patient stratification, TAA/HLA matching, and multi-epitope circRNA design**. Through continued technological innovation, strategic intellectual property protection, and industry collaboration, we will further distinguish its value in the field of therapeutic vaccines for high-risk TNBC.",
          ],
        },
        {
          type: "subheading",
          id: "business-model",
          anchorIds: ["key-resources"],
          index: "5.3",
          title: "Business Model",
        },
        {
          type: "prose",
          paragraphs: [
            "A business model is essential: it defines how a project creates, delivers, and captures value and provides clear direction for its subsequent operations and development. For CirCure, the Business Model Canvas helps us connect research outcomes, clinical needs, and industry collaboration, guiding the project from early-stage candidate validation toward co-development and future clinical translation.",
          ],
        },
        { type: "feature", key: "business-model-canvas" },
        {
          type: "subheading",
          id: "b2b-b2c",
          index: "5.4",
          title: "B2B, B2C",
        },
        {
          type: "prose",
          paragraphs: [
            "At CirCure, we have clearly defined our customer segments to ensure that the project reaches those who truly need the product and those who can support its continued development. CirCure ultimately serves patients with TNBC who have residual invasive disease after completing neoadjuvant therapy and surgery, are at high risk of recurrence, and meet the criteria for candidate TAA expression and HLA matching. These patients have clear needs regarding further treatment options, safety, treatment burden, and long-term disease management. Understanding these needs allows us to incorporate patient stratification and eligibility criteria directly into vaccine design, bringing product development closer to real clinical settings.",
            "In the **B2B** segment, we primarily target **R&D and business development (BD) teams at biopharmaceutical companies** working in cancer immunotherapy, RNA therapeutics, and vaccines. These companies continually seek candidate assets with the potential to stand out, while also focusing on R&D efficiency, pipeline strategy, and the ability to translate technologies into products. Through its vaccine candidate, R&D data, technology licensing, and joint development, CirCure offers partner companies new opportunities for pipeline collaboration. Research hospitals, breast cancer centers, and research institutions are also important validation and implementation partners, providing real-world clinical settings for patient screening, clinical research, and product translation.",
            "Under its long-term **B2C** model, CirCure will serve patients with TNBC through hospitals and professional healthcare systems, while improving product accessibility through long-term follow-up, patient education, and support services. By clearly distinguishing commercial customers, validation partners, and ultimate beneficiaries, we can develop tailored strategies for collaborative development, clinical translation, and patient support, ensuring that our business model remains centered on the actual needs of each group.",
          ],
        },
        {
          type: "figure",
          src: entrepreneurshipAssets.illustrations.b2bB2c,
          width: 1947,
          height: 1448,
          alt: "B2B and B2C customer segments of CirCure",
          caption: "B2B and B2C customer segments of CirCure.",
        },
        {
          type: "subheading",
          id: "beachhead-strategy",
          index: "5.5",
          title: "Beachhead Strategy",
        },
        {
          type: "prose",
          paragraphs: [
            "A beachhead strategy is an approach to market entry and expansion. Simply put, it involves first selecting the most promising and accessible market segment as the product’s initial entry point, then concentrating resources on establishing clinical, technical, and collaborative foundations within that market. Progress in this initial market then provides a basis for gradual expansion into other patient populations and regional markets.",
            "Building on the market and user analyses above, we identified different needs for CirCure’s application across patient populations and stages of market development. Our initial market entry will therefore focus on **the clinical and industry ecosystem for high-risk TNBC in Jilin Province**. Drawing on the clinical research resources of the First Hospital of Jilin University and regional biopharmaceutical collaboration networks, we will prioritize product development and clinical translation for patients with TNBC who have residual invasive disease after completing neoadjuvant therapy and surgery, are at high risk of recurrence, and meet the TAA/HLA criteria.",
            "Building on this foundation, we plan to expand to major breast cancer centers across Northeast China and nationwide, broadening CirCure’s market reach through technology licensing, joint development, and industry collaboration. As the TNBC product development pathway becomes more established, we will gradually extend this patient stratification-driven circRNA vaccine development framework to other breast cancer subtypes and solid tumors, ultimately establishing a broader network of domestic and international collaborators.",
          ],
        },
        {
          type: "figure",
          src: entrepreneurshipAssets.illustrations.beachheadStrategy,
          width: 2584,
          height: 1182,
          alt: "Beachhead strategy for market entry and expansion",
          caption: "Beachhead strategy for market entry and expansion.",
        },
        {
          type: "subheading",
          id: "exit-strategy",
          index: "5.6",
          title: "Exit strategy",
        },
        {
          type: "prose",
          paragraphs: [
            "An exit strategy is a strategic plan through which a company or investor realizes investment value and exits a project at a certain stage of its development through the transfer of equity, assets, or technology. It also includes exit pathways planned in advance by early investors to achieve their expected returns.",
            "Developing an exit strategy is equally important for CirCure. In assessing the project’s current foundations and future path toward commercialization, we recognized that advancing a biopharmaceutical product from candidate development to clinical development, manufacturing, and commercialization requires the continuous integration of R&D, manufacturing, regulatory, and market resources. Rather than relying solely on building a complete value chain independently, CirCure is better positioned to realize the core value of its vaccine candidate, R&D data, intellectual property, and design framework through industry collaboration, advancing the project toward broader development and application. Our business plan also identifies acquisitions by industry partners, asset acquisitions, and technology licensing as important pathways for realizing project value and enabling investor exits.",
            "We will also continue strengthening CirCure’s intellectual property portfolio and actively explore strategic partnerships and acquisition opportunities with major pharmaceutical and biotechnology companies. Through a corporate or asset acquisition, CirCure’s vaccine candidate, patents, R&D data, and associated technologies could be integrated with a larger company’s clinical development, manufacturing, and commercialization resources, expanding the product’s market reach and continuing to realize the project’s value.",
            "A second option is **out-licensing** CirCure’s candidate assets, associated patents, and technological developments, granting industry partners the corresponding development and commercialization rights. Our business plan identifies vaccine patent licensing and collaboration with major pharmaceutical companies as core commercial pathways. This approach would draw on both parties’ specialized strengths, facilitate technology transfer, and generate ongoing financial returns through upfront payments, milestone payments, and subsequent licensing revenue.",
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "For more details, please refer to our Business Plan in the Business Documents.",
          ],
        },
        { type: "feature", key: "doc-business-plan" },
        {
          type: "subheading",
          id: "milestone",
          index: "5.7",
          title: "Milestone",
        },
        { type: "feature", key: "entrepreneurship-milestone" },
        {
          type: "subheading",
          id: "financial-projections",
          index: "5.8",
          title: "Financial projections",
        },
        {
          type: "prose",
          paragraphs: [
            "To assess the financial feasibility of CirCure’s development, we prepared detailed projections for 2026–2030 based on explicit assumptions about revenue, expenditure and financing. We estimated potential income from technology licensing, co-development, data services and future product commercialization, alongside expenditure on R&D, materials, clinical studies, platform maintenance, administration and business development. These estimates informed projected income statements and balance sheets, helping us examine how financial requirements and potential profitability may evolve throughout development.",
            "We also developed a staged financing plan and allocated proposed funding to candidate validation, preclinical research, IND preparation, pilot manufacturing and subsequent clinical development. Complementary cash-flow scenarios examined the timing of expenditure and potential receipts from licensing and collaboration, including upfront and milestone payments. Together, these analyses helped us identify periods requiring external financial support and align resource allocation with development milestones. The projections remain planning scenarios, subject to research progress, regulatory requirements, financing availability and negotiated partnership terms.",
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "For more details, please refer to our Business Plan in the Business Documents.",
          ],
        },
        { type: "feature", key: "doc-business-plan" },
        {
          type: "subheading",
          id: "risk-analysis",
          index: "5.9",
          title: "Risk Analysis",
        },
        {
          type: "subheading",
          id: "risk-interview",
          index: "5.9.1",
          title: "Risk Interview",
        },
        {
          type: "figure",
          className: "entrepreneurship-figure--portrait",
          src: entrepreneurshipAssets.illustrations.riskInterview,
          width: 1279,
          height: 1706,
          alt: "Risk interview with Yongli Jia of Hualan Biological Engineering",
          caption: "Risk interview with Yongli Jia of Hualan Biological Engineering.",
        },
        {
          type: "prose",
          paragraphs: [
            "Through in-depth discussions with **Yongli Jia, a manager at Hualan Biological Engineering, Inc.**, we gained a more systematic understanding of risk management, particularly risk quantification, risk management practices, and response planning. Mr. Jia emphasized that modern businesses face a wide range of risks and that effectively identifying and addressing these risks has become critical to success, especially for technology-driven innovative companies.",
          ],
        },
        {
          type: "subheading",
          id: "risk-identification-and-assessment",
          index: "5.9.2",
          title: "Risk Identification and Assessment",
        },
        {
          type: "prose",
          paragraphs: [
            "To identify the key risks CirCure may face during subsequent development more systematically, we established a **risk assessment matrix** and used quantitative scoring to prioritize risk management. Compared with relying solely on qualitative judgments, this approach helps us compare risks across technology, funding, intellectual property, collaboration, regulation, and the market more clearly, directing limited resources toward the issues that most urgently need to be addressed.",
            "Specifically, we assess each risk across three dimensions: **Impact **and** Likelihood**. Each dimension is scored on a five-point scale, ranging from 1 (low) to 5 (high). Impact measures the consequences of a risk for candidate development, funding, collaboration, or the commercialization pathway. Likelihood reflects the probability of the risk occurring at the current development stage.",
            "We then calculate the **Risk Priority Index (RPI)** by multiplying the scores across the two dimensions:",
            "**RPI = Impact × Likelihood**",
            "A higher RPI indicates greater potential impact, a higher likelihood of occurrence, or greater difficulty in managing the risk, warranting priority monitoring and targeted mitigation measures. Lower-scoring risks remain under continuous review and are reassessed as the project progresses.",
          ],
        },
        {
          type: "table",
          headers: [
            "Risk Category",
            "Specific Risk",
            "Likelihood",
            "Impact",
            "Risk Level",
            "Mitigation Measures",
          ],
          rows: [
            [
              "Technical R&D",
              "Insufficient validation of vaccine candidate identity and function",
              "4",
              "5",
              "High",
              "Introduce additional orthogonal validation methods; strengthen candidate identity confirmation; establish stage-specific criteria for decisions to proceed, modify, or stop development.",
            ],
            [
              "Technical R&D",
              "Difficulty establishing a reliable delivery system and manufacturing process",
              "4",
              "5",
              "High",
              "Assess delivery and CMC feasibility early; establish critical quality attributes; collaborate with specialized laboratories and CROs/CDMOs for validation.",
            ],
            [
              "Technical R&D",
              "Insufficient TAA/HLA coverage or unsuitable multi-epitope combinations",
              "4",
              "4",
              "High",
              "Continually validate coverage of the target population; compare epitope combinations; optimize candidates by balancing coverage gains against development complexity.",
            ],
            [
              "Technical R&D",
              "Potential cross-reactivity and safety concerns",
              "3",
              "5",
              "High",
              "Examine candidate antigen expression in normal tissues; conduct phased safety assessments; promptly remove or replace epitopes associated with higher risk.",
            ],
            [
              "Market Competition",
              "Rapid changes in TNBC standard treatments and competing products",
              "4",
              "3",
              "Moderate",
              "Monitor treatment guidelines, competing pipelines, and clinical progress; adjust CirCure’s clinical positioning and differentiation strategy as needed.",
            ],
            [
              "Financial",
              "Funding interruptions or development costs exceeding expectations",
              "4",
              "4",
              "High",
              "Secure funding in stages aligned with technical milestones; diversify funding sources through hospitals, universities, funds, and industry partnerships; prioritize essential R&D activities.",
            ],
            [
              "Intellectual Property",
              "Unclear ownership of core technologies or restrictions imposed by third-party patents",
              "3",
              "4",
              "Moderate",
              "Clarify ownership of candidates, patents, software, data, and know-how; conduct FTO analysis; pursue licensing or design-around strategies where necessary.",
            ],
            [
              "Regulatory",
              "Changes in regulatory requirements affecting development and submission pathways",
              "3",
              "4",
              "Moderate",
              "Seek regulatory advice early; plan CMC, nonclinical, and quality studies to meet anticipated submission requirements; reassess the pathway following major product changes.",
            ],
            [
              "Partnership",
              "Excessive dependence on a single external partner",
              "3",
              "3",
              "Moderate",
              "Establish a network of alternative hospital, laboratory, and CRO/CDMO partners; clearly define collaboration tasks, deliverables, timelines, and responsibilities.",
            ],
            [
              "Ethics and Patient Considerations",
              "Patient screening increases testing burden or limits equitable access",
              "3",
              "4",
              "Moderate",
              "Incorporate feedback from patients, clinicians, and ethics stakeholders into the screening process; optimize TAA/HLA testing and follow-up arrangements to reduce additional burden.",
            ],
            [
              "Team Management",
              "Personnel turnover undermines knowledge retention and project continuity",
              "3",
              "3",
              "Moderate",
              "Establish standardized experimental records, software version management, data archives, and handover procedures; designate long-term project leads and clearly define responsibilities.",
            ],
            [
              "Data Security",
              "Disclosure of sensitive patient information, including pathology and TAA/HLA data",
              "2",
              "4",
              "Moderate",
              "Apply data minimization principles; implement de-identification, tiered access controls, and secure storage; provide only the necessary de-identified materials for external review.",
            ],
          ],
        },
        {
          type: "subheading",
          id: "specific-measures-for-high-risk-threats",
          index: "5.9.3",
          title: "Specific Measures for High-Risk Threats",
        },
        {
          type: "prose",
          paragraphs: [
            "Based on the risk assessment results, we developed corresponding mitigation measures for key issues that fell within the high-risk zone. For CirCure, risk management does not mean eliminating all uncertainty. Instead, it means identifying critical issues wherever possible before advancing to the next stage and preventing further risk accumulation through validation, adjustments, or mechanisms for halting development.",
          ],
        },
        {
          type: "heading",
          level: 4,
          title: "Risks in Vaccine Candidate Identity and Functional Validation",
        },
        {
          type: "list",
          items: [
            "**Multi-Level Candidate Identity Verification** Building on existing validation, establish direct verification of the back-splice junction (BSJ), include linear RNA and negative controls, and introduce at least one orthogonal validation method to cross-confirm the candidate’s identity, integrity, and circularity. Proceed to subsequent expression, antigen presentation, and functional evaluation only when candidate identity can be consistently traced.",
            "**Staged Functional Validation** Separate “Is the candidate present?”, “Can the candidate be expressed and its antigens presented?”, and “Does the candidate warrant further development?” into distinct validation stages, avoiding reliance on a single experimental result to determine the candidate’s overall feasibility.",
            "**Go / Revise / No-Go Decision Framework** Define decision criteria for key experimental results in advance. Proceed when results meet development requirements. Enter the Revise stage if issues can be resolved through changes to the sequence, epitopes, or construct design. If core identity or functional issues remain unresolved despite repeated efforts, discontinue the current candidate and pursue an alternative.",
            "**R&D Data Traceability** Standardize candidate versioning, Dry Lab records, software versioning, screening parameters, and experimental results so that every candidate modification can be traced to specific data and the rationale behind the decision, reducing repeated experiments and incorrect judgments caused by version confusion.",
          ],
        },
        {
          type: "heading",
          level: 4,
          title: "Delivery, CMC, and Manufacturability Risks",
        },
        {
          type: "list",
          items: [
            "**Early Integration of Critical Quality Attributes** Establish a framework for the candidate’s critical quality attributes early in development, progressively evaluating identity, purity, integrity, impurities, potency, stability, and batch consistency. This ensures that manufacturing reproducibility and functional performance are assessed alongside each other.",
            "**Parallel Validation of Delivery and Manufacturing Processes** Compare different delivery and production approaches in stages without committing to a single technical route early on. Continuously optimize circularization, purification, and delivery conditions based on the candidate’s properties, stability, and quality requirements, allowing the process to be adjusted promptly in response to experimental results.",
            "**External Expert Validation** Collaborate with specialized laboratories and CROs/CDMOs with expertise in RNA processing, analytics, and quality to externally validate key production and analytical steps. Begin with clearly defined, small-scale validation tasks, then determine whether to expand investment based on the results.",
            "**Alternative Processes and Supply Arrangements** Establish alternatives for critical raw materials, circularization methods, purification processes, and delivery platforms to avoid excessive reliance on a single technology or partner. If the current approach cannot establish a reliable manufacturing operating window, promptly switch to or reassess alternative routes.",
          ],
        },
        {
          type: "heading",
          level: 4,
          title: "Risks in TAA/HLA Coverage and Multi-Epitope Combinations",
        },
        {
          type: "list",
          items: [
            "**Target Population Coverage Validation** Further validate the combined coverage of candidate TAA expression and HLA types using real-world or representative population data to determine the size of the target patient population that the current epitope combination can serve, rather than assuming a coverage advantage based solely on computational predictions.",
            "**Dynamic Optimization of Multi-Epitope Combinations** Treat the current epitope combination as adaptable. Retain, replace, reorder, or remove epitopes based on patient coverage, HLA compatibility, antigen processing and presentation, and functional results, allowing the candidate to be continually refined as evidence accumulates.",
            "**Balancing Coverage Gains and Development Complexity** For each additional epitope, assess both the gains in patient coverage and the added complexity associated with construct length, analytical methods, quality control, and batch-to-batch consistency. If an additional epitope does not provide sufficient coverage gains, prioritize simplifying the candidate rather than maximizing the number of epitopes.",
            "**Clinical Pathway Feedback** Maintain ongoing discussions with breast cancer clinicians and clinical pathology personnel about the feasibility of TAA/HLA screening in routine clinical workflows, ensuring that patient selection criteria are theoretically sound and can be integrated into future clinical pathways.",
          ],
        },
        {
          type: "heading",
          level: 4,
          title: "Safety and Potential Cross-Reactivity Risks",
        },
        {
          type: "list",
          items: [
            "**Normal Tissue Expression Screening** Examine normal tissue expression for each candidate antigen individually, excluding candidates with high expression in normal tissues or clear potential for cross-reactivity at an early stage to avoid increasing safety risks solely to broaden patient coverage. CirCure’s current product requirements explicitly identify normal tissue expression and cross-reactivity as issues that must both be controlled in multi-epitope design.",
            "**Staged Safety Evaluation** Progressively increase the rigor of validation through computational and database screening, in vitro evaluation, and subsequent nonclinical evaluation conducted according to applicable standards. This approach aims to identify high-risk candidates as early as possible, rather than addressing them only after entering more costly development stages.",
            "**Epitope Replacement and Removal** Establish a direct pathway for removing or replacing epitopes associated with clear risks to normal tissues, unintended immune responses, or antigen processing and presentation issues. The multi-epitope combination can be adjusted; patient safety takes priority over preserving the existing candidate structure.",
            "**Patient and Ethics Stakeholder Feedback** Continually incorporate feedback from patients, clinicians, and ethics stakeholders into risk assessment. Consider not only immunological indicators but also the practical treatment burden that additional testing, administration, and follow-up may impose, aligning safety evaluation with the Responsible Innovation emphasized by iGEM.",
          ],
        },
        {
          type: "heading",
          level: 4,
          title: "Funding Continuity and R&D Cost Risks",
        },
        {
          type: "list",
          items: [
            "**Milestone-Driven Financing** Align funding commitments with technological maturity rather than committing resources to the entire drug development pathway at once. Initially, prioritize support from hospitals, university research programs, competitions, and innovation and entrepreneurship initiatives for candidate validation. Once preliminary manufacturability has been established, seek funding for defined tasks through joint research, translational projects, and industry collaboration. Consider strategic industry investment or equity financing when external review, ownership rights, and the development pathway are clearer.",
            "**Risk-Based Budget Allocation** Prioritize funding for work that can resolve critical risks, including candidate identity, TAA/HLA coverage, delivery, CMC, safety, freedom to operate (FTO), and regulatory issues. Assign lower priority to exploratory experiments that cannot directly affect decisions for the next stage, improving the efficiency of limited funding.",
            "**Funding Runway Early Warning** Before entering each new development stage, reassess the funding, time, and external resources needed to complete it. Avoid initiating costly tasks that cannot be completed with the available funding.",
            "**Diversified Resource Support** Alongside equity financing, draw on hospital research support, university innovation programs, government and translational funding, joint research, and platform and technical resources contributed by industry partners to reduce reliance on a single source of capital.",
            "**Dynamic Adjustment of R&D Scope** When funding or resources change, prioritize the core candidate and validation addressing critical risks. Non-core expansion activities can be postponed, reduced in scope, or reprioritized so that funding changes do not directly interrupt the main development pathway.",
          ],
        },
        {
          type: "subheading",
          id: "intellectual-property",
          index: "5.10",
          title: "Intellectual Property",
        },
        {
          type: "prose",
          paragraphs: [
            "Protecting CirCure’s core technologies and original work is essential to safeguarding the project’s commercial value and maintaining a long-term competitive advantage. Intellectual property helps us clarify ownership of R&D outcomes and provides a legal foundation for future technology licensing, joint development, and industry collaboration. We are building an intellectual property protection framework combining **patents, software copyright, and trade secrets** around CirCure’s vaccine production, digital design, and R&D know-how.",
          ],
        },
        {
          type: "subheading",
          id: "patents-and-trade-secrets",
          index: "5.10.1",
          title: "Patents and Trade Secrets",
        },
        {
          type: "prose",
          paragraphs: [
            "Given CirCure’s technical features in circRNA vaccine production and development, **patent protection is an important component of our intellectual property strategy**. We have submitted a utility model patent application for an **integrated nucleic acid circularization reaction device** related to circRNA vaccine production. The application number is **2026204425615**, and the application was **formally accepted on April 3, 2026**. This patent application extends the project’s intellectual property protection to the engineering aspects of circRNA production, establishing a clearly defined technical asset base for subsequent process development, technology collaboration, and industrial translation.",
            "Meanwhile, candidate sequences, screening logic, critical process parameters, experimental data, and R&D know-how also constitute important technical assets for CirCure. We will apply tiered management to this sensitive information and use **non-disclosure agreements (NDAs), material transfer agreements (MTAs), data access controls, and confidentiality measures** during external collaboration and technical review to define the permitted uses of materials and technologies, facilitating collaboration while protecting our core R&D outcomes.",
          ],
        },
        {
          type: "carousel",
          images: [
            {
              src: entrepreneurshipAssets.illustrations.originalDocument1,
              alt: "Original patent acceptance document",
              width: 853,
              height: 1207,
            },
            {
              src: entrepreneurshipAssets.illustrations.originalDocument1EnTranslation,
              alt: "English translation of the patent acceptance document",
              width: 904,
              height: 1280,
            },
          ],
          caption: "Original Document & English Translation",
        },
        {
          type: "subheading",
          id: "software-copyright",
          index: "5.10.2",
          title: "Software Copyright",
        },
        {
          type: "prose",
          paragraphs: [
            "In addition to the patent application covering production equipment, we protect CirCure’s digital R&D tools through software copyright. Our independently developed **CircRNA Vaccine Design System V1.0** completed **software copyright registration on April 9, 2026, under registration number 2026SR0543219**. The system integrates expression data processing, candidate target screening, epitope prediction, and vaccine design workflows, providing ongoing support for CirCure’s candidate design and iterative R&D.",
            "Through a combined protection strategy of **a production device patent, software copyright, and trade secrets**, we extend CirCure’s intellectual property coverage across key stages from digital candidate design to circRNA production, providing a more comprehensive intellectual property foundation for future technology licensing, co-development, and commercialization.",
          ],
        },
        {
          type: "carousel",
          images: [
            {
              src: entrepreneurshipAssets.illustrations.originalDocument2,
              alt: "Original software copyright registration document",
              width: 863,
              height: 1167,
            },
            {
              src: entrepreneurshipAssets.illustrations.originalDocument2EnTranslation,
              alt: "English translation of the software copyright registration document",
              width: 945,
              height: 1280,
            },
          ],
          caption: "Original Document & English Translation",
        },
        {
          type: "subheading",
          id: "ip-strategy",
          index: "5.10.3",
          title: "IP Strategy",
        },
        {
          type: "prose",
          paragraphs: [
            "In addition to protecting our existing research outcomes, we are incorporating intellectual property management into subsequent product development. We have conducted a patent landscape analysis across relevant technical areas, including circRNA construction, circularization methods, translation elements, purification, and delivery, and will continue to advance **Freedom to Operate (FTO) assessments** based on the candidate product and the chosen process.",
            "Through collaboration with the university’s technology transfer office (TTO), patent agents, and legal professionals, we will pursue patent portfolio development, ownership management, and technology transfer in parallel. This will ensure that intellectual property not only protects innovation but also serves as an important asset for CirCure’s future industry collaboration and the realization of its value.",
          ],
        },
        {
          type: "subheading",
          id: "business-documents",
          index: "5.11",
          title: "Business documents",
        },
        { type: "feature", key: "doc-business-plan" },
        {
          type: "subheading",
          id: "legal-considerations",
          index: "5.12",
          title: "Legal considerations",
        },
        { type: "feature", key: "doc-legal-plan" },
      ],
    },
    {
      id: "skills-capabilities-stakeholders",
      index: "06",
      kicker: "",
      title: "Skills, Capabilities & Stakeholders",
      summary: "",
      blocks: [
        {
          type: "subheading",
          id: "team",
          index: "6.1",
          title: "Team",
        },
        {
          type: "prose",
          paragraphs: [
            "The JLU-FBH team brings together members from diverse academic backgrounds, including medicine, life sciences, physics, mathematics, computer science, and veterinary medicine. Our work focuses on optimizing CirCure’s research and development, advancing clinical translation, exploring the market, and pursuing long-term commercialization.",
            "Our backgrounds in medicine and life sciences enable us to understand TNBC’s disease characteristics, treatment pathways, and patient needs in depth, helping us identify key unmet clinical needs and define our target population and product value. Members with expertise in computer science and physics improve the efficiency of vaccine design, patient screening, and R&D management through software development, data processing, and computational analysis, while also supporting market analysis and technological scale-up. Veterinary medicine members help assess the product’s development potential and key risks through preclinical validation and translational evaluation. Mathematics members provide a quantitative basis for business model design and strategic decisions through statistical analysis, market estimation, and risk assessment.",
            "However, we also recognize limitations in our team’s composition. For example, some members must take on responsibilities across additional fields, such as legal and regulatory matters and business model development. Overall, our team covers key areas including clinical needs identification, scientific research and development, data analysis, preclinical validation, and business planning. This capacity for multidisciplinary collaboration, combined with our shared enthusiasm for advancing CirCure toward clinical translation and commercialization, provides a solid foundation for the startup’s continued development.",
          ],
        },
        {
          type: "figure",
          src: entrepreneurshipAssets.illustrations.teamPhoto,
          width: 1280,
          height: 853,
          alt: "Photo of the JLU-FBH team",
          caption: "The JLU-FBH team.",
        },
        {
          type: "subheading",
          id: "stakeholders",
          index: "6.2",
          title: "Stakeholders",
        },
        {
          type: "subheading",
          id: "patients",
          index: "6.2.1",
          title: "Patients",
        },
        {
          type: "prose",
          paragraphs: [
            "CirCure is a multi-epitope circRNA therapeutic vaccine designed for a defined group of high-risk TNBC patients with residual invasive disease after neoadjuvant therapy and surgery. As the ultimate beneficiaries, patients would be directly affected by its eligibility screening, treatment process, and follow-up requirements. Therefore, understanding their needs, concerns, and treatment decisions is essential for the responsible development and future clinical translation of CirCure.",
          ],
        },
        {
          type: "subheading",
          id: "academic-researchers",
          index: "6.2.2",
          title: "Academic Researchers",
        },
        {
          type: "prose",
          paragraphs: [
            "Academic researchers can assess the feasibility of CirCure from the perspectives of scientific validity, experimental design, and translational potential, and provide us with rigorous and constructive suggestions for optimizing our research strategy.",
          ],
        },
        {
          type: "subheading",
          id: "clinicians",
          index: "6.2.3",
          title: "Clinicians",
        },
        {
          type: "prose",
          paragraphs: [
            "Clinicians are directly involved in evaluating patients’ disease status, treatment options, and eligibility for further intervention. Their clinical experience can help us assess whether CirCure has a clear position within the existing TNBC treatment pathway and whether its patient selection and application process are practical. Therefore, communication with clinicians is essential for refining the clinical positioning and translational feasibility of our project.",
          ],
        },
        {
          type: "subheading",
          id: "enterprise",
          index: "6.2.4",
          title: "Enterprise",
        },
        {
          type: "prose",
          paragraphs: [
            "CirCure is situated within a complex RNA therapeutics industry involving biopharmaceutical companies, CRO/CDMO providers, and other supporting sectors. Conducting in-depth research on this industrial chain will help us more accurately assess the technical value, development feasibility, and commercialization potential of CirCure.",
          ],
        },
        {
          type: "subheading",
          id: "government",
          index: "6.2.5",
          title: "Government",
        },
        {
          type: "prose",
          paragraphs: [
            "The development and future translation of RNA therapeutics are closely tied to healthcare, regulatory, and biomedical innovation policies, especially for emerging technologies such as circRNA vaccines. Therefore, direct communication with government and policy stakeholders can help us more accurately assess the feasibility of CirCure’s further development and translation.",
          ],
        },
        {
          type: "subheading",
          id: "thank-you-note",
          index: "6.3",
          title: "Thank-you Note",
        },
        { type: "feature", key: "thank-you-note" },
        {
          type: "subheading",
          id: "entrepreneurship-in-action",
          index: "6.4",
          title: "Entrepreneurship in Action",
        },
        {
          type: "prose",
          paragraphs: [
            "Turning innovative ideas into successful ventures requires more than creativity and persistence; it also depends on gaining recognition and validation from the broader entrepreneurial ecosystem.",
          ],
        },
        {
          type: "carousel",
          images: [
            {
              src: entrepreneurshipAssets.illustrations.actionEastChina,
              alt: "2026 iGEM East China Regional Meeting",
              width: 4000,
              height: 3000,
            },
            {
              src: entrepreneurshipAssets.illustrations.actionCentralChina,
              alt: "2026 Central China iGEM Forum",
              width: 1920,
              height: 1280,
            },
            {
              src: entrepreneurshipAssets.illustrations.actionNorthChina,
              alt: "2026 North China iGEMer Meetup",
              width: 2276,
              height: 1280,
            },
            {
              src: entrepreneurshipAssets.illustrations.actionNortheastChina,
              alt: "Northeast China iGEM Co-creation Salon",
              width: 2275,
              height: 1280,
            },
            {
              src: entrepreneurshipAssets.illustrations.actionSouthChina,
              alt: "Southern China Retional Meeting",
              width: 1920,
              height: 1280,
            },
            {
              src: entrepreneurshipAssets.illustrations.actionSynbiopunk,
              alt: "Synbiopunk-CCiC 2026",
              width: 4000,
              height: 2251,
            },
            {
              src: entrepreneurshipAssets.illustrations.actionApic,
              alt: "The 1st Gramd APiC Conference for Asia-Pracific iGEMer Community",
              width: 2568,
              height: 1926,
            },
          ],
          caption:
            "Gaining recognition and validation from the broader entrepreneurial ecosystem.",
        },
      ],
    },
    {
      id: "long-term-impacts",
      index: "07",
      kicker: "",
      title: "Long-Term Impacts",
      summary: "",
      blocks: [
        {
          type: "subheading",
          id: "positive-long-term-impacts",
          index: "7.1",
          title: "Positive Long-Term Impacts",
        },
        {
          type: "prose",
          paragraphs: [
            "In terms of direct impact, CirCure focuses on patients with TNBC who remain at high risk of recurrence after surgery. Through patient stratification, TAA expression screening, and HLA matching, we explore more precisely targeted potential treatment options beyond standard treatment. This aligns closely with SDG 3 (Good Health and Well-being), aiming to address the ongoing treatment needs of patients with cancer and advance more personalized health interventions.",
            "Indirectly, CirCure advances innovation and translation in therapeutic RNA vaccines by integrating clinical needs, patient stratification, and multi-epitope circRNA vaccine design, while fostering closer collaboration among clinical practice, research, and industry. This further aligns with SDG 9 (Industry, Innovation and Infrastructure) and SDG 17 (Partnerships for the Goals), extending the project’s long-term value beyond a single candidate product to a broader framework for innovation and collaboration.",
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "The following breakdown explains these impacts and how they arise in greater detail:",
          ],
        },
        { type: "feature", key: "positive-long-term-impacts" },
        {
          type: "subheading",
          id: "potential-problems-and-solutions",
          index: "7.2",
          title: "Potential Problems & Their Solutions",
        },
        { type: "feature", key: "potential-problems-and-solutions" },
        {
          type: "subheading",
          id: "planning-and-outlook",
          index: "7.3",
          title: "Planning and Outlook",
        },
        {
          type: "prose",
          paragraphs: [
            "Looking ahead, we are committed not only to advancing the validation of CirCure in TNBC, but also to gradually exploring the broader application of multi-epitope circRNA vaccines guided by patient stratification in cancer immunotherapy. We will continue collaborating with clinicians, research institutions, biopharmaceutical companies, and specialized development partners to refine candidate identity characterization, delivery, CMC, and quality and safety assessments, while advancing the project along an established preclinical development pathway.",
            "Although uncertainties remain in technical validation, market competition, intellectual property, and regulation, we will work to reduce these risks through continued research and development, external validation, and responsible product iteration. Only after the TNBC candidate has been thoroughly validated will we explore extending this design framework to other cancers, gradually building reusable development experience in patient stratification, multi-epitope design, and circRNA technology. Meanwhile, patient safety, equity, privacy, and accessibility will remain integral to the project’s development. Through these efforts, CirCure will continue connecting scientific innovation with real clinical needs, advancing toward long-term translation and development through careful validation.",
          ],
        },
        {
          type: "subheading",
          id: "why-entrepreneurship",
          index: "7.4",
          title: "Why Entrepreneurship?",
        },
        {
          type: "prose",
          paragraphs: [
            "Entrepreneurship is an important force in turning scientific exploration into real-world value. For CirCure, our decision to pursue entrepreneurship reflects not only our hope of bringing research on a multi-epitope circRNA therapeutic vaccine beyond the laboratory, but also our commitment to making this work truly responsive to patient needs. We remain focused on patients with TNBC who face a high risk of recurrence after completing existing treatments, seeking to explore additional potential treatment options for them through continued research, development, and clinical translation. To us, the value of scientific innovation lies not only in introducing a new technology, but also in whether it reflects a true understanding of the uncertainty, treatment burden, and practical needs patients face—and whether it can ultimately become a solution that offers value to them.",
            "Entrepreneurship also encourages us to move beyond a purely research-focused perspective toward a more comprehensive understanding of product development and clinical translation. We have begun actively investigating patient and clinical needs, analyzing the market and industry landscape, assessing potential challenges in technology development, manufacturing, regulation, and commercialization, and continually considering the key steps still needed to bring CirCure into practice. Discussions with patients, clinicians, researchers, industry partners, and other stakeholders have prompted us to reassess our initial assumptions and helped us progressively clarify our target population, product positioning, validation priorities, and future pathways for collaboration. Through this feedback and iteration, CirCure has gradually evolved from a scientific concept in the laboratory into a project with a clearer development direction.",
            "For CirCure, entrepreneurship is therefore both a means of sustaining the project’s development and an important way of putting our patient-centered commitment into practice. It connects patient needs, scientific validation, clinical judgment, and translation into industry, encouraging us to consider not only “Can the technology be developed?” but also “Will it truly be needed, accepted, and ultimately serve patients?” Through this process, we hope to keep improving CirCure while ensuring that it continues to advance toward creating meaningful value in healthcare.",
          ],
        },
      ],
    },
    {
      id: "reference",
      index: "08",
      kicker: "",
      title: "Reference",
      summary: "",
      blocks: [{ type: "feature", key: "entrepreneurship-references" }],
    },
  ],
  links: [
    { path: "/human-practices", label: "Stakeholder Feedback" },
    { path: "/sustainability", label: "SDG Healthcare Equity" },
    { path: "/description", label: "Clinical Rationale" },
    { path: "/results", label: "Efficacy Evidence" },
  ],
  next: {
    path: "/human-practices",
    label: "Human Practices",
    title: "Listening to the Voices That Matter Most",
    description: "A commercial strategy is hollow without patient empathy. Discover how dialogues with oncologists, breast cancer patients, and ethicists continuously reshaped our research.",
  },
};
