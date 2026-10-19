/**
 * Entrepreneurship page — bibliography, field-ised for the shared citation
 * register. Decomposed verbatim from the page's former `references` block:
 *
 * - `authors` keeps the manuscript's trailing period; `""` when the entry
 *   names no author beyond its issuing body (none here — organisations are
 *   kept as authors).
 * - `title` drops the sentence-final period, keeping the original casing.
 * - `journal` is the italic slot: `*…*` markers removed, so entries 17 and 20
 *   (italicised reports without a journal) carry their work title here, per
 *   the house rule for sources with no journal.
 * - `volumeYear` keeps the manuscript's own punctuation; identifiers that
 *   exist only as plain text (DOI, PMCID, NCT number) stay in this slot so no
 *   manuscript text is lost.
 * - `links` carry only URLs present in the manuscript, labelled with the
 *   original link text (or the domain where the manuscript gave none).
 */

import type { CitationReference } from "../citations/citationTypes";

export const entrepreneurshipReferences: CitationReference[] = [
  {
    id: 1,
    authors: "National Cancer Institute.",
    title: "Living with Breast Cancer & Survivorship",
    journal: "",
    volumeYear: "",
    links: [
      {
        href: "https://www.cancer.gov/types/breast/breast-cancer-survivorship",
        label: "cancer.gov",
      },
    ],
  },
  {
    id: 2,
    authors: "National Cancer Institute.",
    title: "Side Effects of Cancer Treatment",
    journal: "",
    volumeYear: "",
    links: [
      {
        href: "https://www.cancer.gov/about-cancer/treatment/side-effects",
        label: "cancer.gov",
      },
    ],
  },
  {
    id: 3,
    authors: "National Cancer Institute.",
    title: "Lymphedema and Cancer",
    journal: "",
    volumeYear: "",
    links: [
      {
        href: "https://www.cancer.gov/about-cancer/treatment/side-effects/lymphedema",
        label: "cancer.gov",
      },
    ],
  },
  {
    id: 4,
    authors: "Zheng R, et al.",
    title:
      "Incidence, mortality, and disability-adjusted life years of female breast cancer in China, 2022",
    journal: "Chinese Medical Journal",
    volumeYear: "2024. PMCID: PMC11479498.",
  },
  {
    id: 5,
    authors: "Zagami P, Carey LA.",
    title: "Triple negative breast cancer: Pitfalls and progress",
    journal: "npj Breast Cancer",
    volumeYear: "2022;8:95.",
  },
  {
    id: 6,
    authors: "Yau C, et al.",
    title:
      "Residual cancer burden after neoadjuvant chemotherapy and long-term survival outcomes in breast cancer",
    journal: "Lancet Oncology",
    volumeYear: "2022;23:149–160.",
  },
  {
    id: 7,
    authors: "Changchun New Area Administrative Committee.",
    title: "Innovation and Value in Changchun New Area’s Development",
    journal: "",
    volumeYear: "2026.",
    links: [
      {
        href: "https://www.ccxq.gov.cn/xqyw/xqdt/202607/t20260727_3651935.html",
        label: "https://www.ccxq.gov.cn/xqyw/xqdt/202607/t20260727_3651935.html",
      },
    ],
  },
  {
    id: 8,
    authors: "Changchun New Area Administrative Committee.",
    title: "Overview of Changchun New Area",
    journal: "",
    volumeYear: "",
    links: [
      {
        href: "https://www.ccxq.gov.cn/zjxq/xqgk/",
        label: "https://www.ccxq.gov.cn/zjxq/xqgk/",
      },
    ],
  },
  {
    id: 9,
    authors: "Changchun Municipal People’s Government.",
    title:
      "Beihu Future Science City Gains Momentum, Building an “Innovation Engine” for High-Quality Development and Sustainable Revitalization",
    journal: "",
    volumeYear: "2025.",
    links: [
      {
        href:
          "https://www.changchun.gov.cn/zw_33994/yw/zwdt_74/jjdt/202511/t20251118_3441196.html",
        label:
          "https://www.changchun.gov.cn/zw_33994/yw/zwdt_74/jjdt/202511/t20251118_3441196.html",
      },
    ],
  },
  {
    id: 10,
    authors: "Changchun New Area Administrative Committee.",
    title:
      "Looking Ahead: How Changchun New Area Is Building “Changchun Pharmaceutical Valley”",
    journal: "",
    volumeYear: "2023.",
    links: [
      {
        href: "https://www.ccxq.gov.cn/syld/202307/t20230725_2450849.html",
        label: "https://www.ccxq.gov.cn/syld/202307/t20230725_2450849.html",
      },
    ],
  },
  {
    id: 11,
    authors: "Schmid P, Cortes J, Dent R, et al.",
    title: "Overall Survival with Pembrolizumab in Early-Stage Triple-Negative Breast Cancer",
    journal: "New England Journal of Medicine",
    volumeYear: "2024;391:1981–1991. DOI: 10.1056/NEJMoa2409932.",
    links: [
      {
        href: "https://www.nejm.org/doi/full/10.1056/NEJMoa2409932?utm_source",
        label: "https://www.nejm.org/doi/full/10.1056/NEJMoa2409932?utm_source",
      },
    ],
  },
  {
    id: 12,
    authors: "Masuda N, Lee SJ, Ohtani S, et al.",
    title: "Adjuvant Capecitabine for Breast Cancer after Preoperative Chemotherapy",
    journal: "New England Journal of Medicine",
    volumeYear: "2017;376:2147–2159. DOI: 10.1056/NEJMoa1612645.",
    links: [
      {
        href: "https://www.nejm.org/doi/full/10.1056/NEJMoa1612645?utm_source",
        label: "https://www.nejm.org/doi/full/10.1056/NEJMoa1612645?utm_source",
      },
    ],
  },
  {
    id: 13,
    authors: "Tutt ANJ, Garber JE, Kaufman B, et al.",
    title: "Adjuvant Olaparib for Patients with BRCA1- or BRCA2-Mutated Breast Cancer",
    journal: "New England Journal of Medicine",
    volumeYear: "2021;384:2394–2405. DOI: 10.1056/NEJMoa2105215.",
    links: [
      {
        href: "https://www.nejm.org/doi/full/10.1056/NEJMoa2105215?utm_source",
        label: "https://www.nejm.org/doi/full/10.1056/NEJMoa2105215?utm_source",
      },
    ],
  },
  {
    id: 14,
    authors: "ClinicalTrials.gov.",
    title: "STEMVAC in Patients With Early Stage Triple Negative Breast Cancer",
    journal: "",
    volumeYear: "NCT05455658. ClinicalTrials.gov — NCT05455658.",
    links: [
      {
        href: "https://clinicaltrials.gov/study/NCT05455658?utm_source",
        label: "https://clinicaltrials.gov/study/NCT05455658?utm_source",
      },
    ],
  },
  {
    id: 15,
    authors: "ClinicalTrials.gov.",
    title:
      "First-in-human, Phase 1 Study of a Self-amplifying RNA Vaccine (ITI-5000) Alone or in Combination With Pembrolizumab in Stage II–III Triple Negative Breast Cancer Following Standard Therapy (VITAL-TNBC)",
    journal: "",
    volumeYear: "NCT07652242. ClinicalTrials.gov — NCT07652242.",
    links: [
      {
        href: "https://clinicaltrials.gov/study/NCT07652242?utm_source",
        label: "https://clinicaltrials.gov/study/NCT07652242?utm_source",
      },
    ],
  },
  {
    id: 16,
    authors: "ClinicalTrials.gov.",
    title:
      "Safety and Immunogenicity of a Personalized Polyepitope DNA Vaccine Strategy in Breast Cancer Patients With Persistent Triple-Negative Disease Following Neoadjuvant Chemotherapy",
    journal: "",
    volumeYear: "NCT02348320. ClinicalTrials.gov — NCT02348320.",
    links: [
      {
        href: "https://clinicaltrials.gov/study/NCT02348320?utm_source",
        label: "https://clinicaltrials.gov/study/NCT02348320?utm_source",
      },
    ],
  },
  {
    id: 17,
    authors: "Jilin Provincial Bureau of Statistics.",
    title: "",
    journal:
      "Statistical Communiqué of Jilin Province on the 2024 National Economic and Social Development.",
    volumeYear: "Changchun: Jilin Provincial Bureau of Statistics; 2025. Available from:",
    links: [
      {
        href: "https://tjj.jl.gov.cn/tjsj/tjgb/ndgb/202503/t20250324_3419691.html",
        label: "https://tjj.jl.gov.cn/tjsj/tjgb/ndgb/202503/t20250324_3419691.html",
      },
    ],
  },
  {
    id: 18,
    authors: "Bray F, Laversanne M, Sung H, Ferlay J, Siegel RL, Soerjomataram I, Jemal A.",
    title:
      "Global cancer statistics 2022: GLOBOCAN estimates of incidence and mortality worldwide for 36 cancers in 185 countries",
    journal: "CA: A Cancer Journal for Clinicians.",
    volumeYear: "2024;74(3):229–263. DOI: 10.3322/caac.21834",
  },
  {
    id: 19,
    authors: "Schmid P, Cortes J, Pusztai L, et al.",
    title: "Pembrolizumab for early triple-negative breast cancer",
    journal: "New England Journal of Medicine.",
    volumeYear: "2020;382(9):810–821. DOI: 10.1056/NEJMoa1910549",
  },
  {
    id: 20,
    authors: "World Cancer Research Fund International.",
    title: "",
    journal: "Breast cancer statistics.",
    volumeYear: "London: WCRF International; 2024. Available from:",
    links: [
      {
        href: "https://www.wcrf.org/preventing-cancer/cancer-statistics/breast-cancer-statistics/",
        label: "https://www.wcrf.org/preventing-cancer/cancer-statistics/breast-cancer-statistics/",
      },
    ],
  },
];
