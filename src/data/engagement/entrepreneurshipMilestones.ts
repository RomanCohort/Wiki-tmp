import type { EntrepreneurshipOrbitTone } from "./entrepreneurshipPage";

export interface EntrepreneurshipMilestone {
  title: string;
  start: string;
  end?: string;
}

export interface EntrepreneurshipMilestoneGroup {
  title: string;
  tone: EntrepreneurshipOrbitTone;
  milestones: EntrepreneurshipMilestone[];
}

export const entrepreneurshipMilestoneGroups: EntrepreneurshipMilestoneGroup[] =
  [
    {
      title: "Preparation",
      tone: "rose",
      milestones: [
        { title: "Build a Team", start: "2025-11" },
        { title: "iGEM", start: "2025-12", end: "2026-11" },
        {
          title: "Literature Review and Topic Choosing",
          start: "2025-12",
          end: "2026-02",
        },
      ],
    },
    {
      title: "Launch",
      tone: "peach",
      milestones: [
        { title: "Platform Construction", start: "2026-01", end: "2026-04" },
        {
          title: "Antigen Screening and Vaccine Design",
          start: "2026-02",
          end: "2026-06",
        },
        { title: "Proof of Concept", start: "2026-04", end: "2026-07" },
        {
          title: "Laboratory Testing and Candidate Validation",
          start: "2026-05",
          end: "2026-11",
        },
      ],
    },
    {
      title: "Expansion",
      tone: "yellow",
      milestones: [
        {
          title: "Clinical Needs and Market Research",
          start: "2026-01",
          end: "2028-12",
        },
        {
          title: "Stakeholder Engagement and Human Practices",
          start: "2026-02",
          end: "2026-10",
        },
        {
          title: "Entrepreneurship and Commercial Validation",
          start: "2026-03",
          end: "2026-11",
        },
        {
          title: "Investors Seeking and Funding Access",
          start: "2026-04",
          end: "2030-12",
        },
        {
          title: "Industry Partnership and External Validation",
          start: "2026-07",
          end: "2030-12",
        },
      ],
    },
    {
      title: "Research",
      tone: "sage",
      milestones: [
        {
          title: "Candidate Optimization and Lead Selection",
          start: "2026-08",
          end: "2027-12",
        },
        {
          title: "Mechanism Studies and Data Package Development",
          start: "2026-10",
          end: "2027-12",
        },
        {
          title: "Delivery and Process Development",
          start: "2026-07",
          end: "2028-12",
        },
        {
          title: "CMC and Quality Control Development",
          start: "2026-07",
          end: "2028-12",
        },
        { title: "Pre-Clinical Evaluation", start: "2027-01", end: "2028-12" },
        {
          title: "Intellectual Property and FTO Strategy",
          start: "2026-03",
          end: "2029-12",
        },
        {
          title: "Regulatory Strategy and IND Preparation",
          start: "2027-01",
          end: "2029-12",
        },
      ],
    },
    {
      title: "Commercialization",
      tone: "sky",
      milestones: [
        {
          title: "Technology Licensing and Co-development",
          start: "2027-01",
          end: "2030-12",
        },
        {
          title: "Early Clinical Exploration",
          start: "2030-01",
          end: "2030-12",
        },
      ],
    },
    {
      title: "R&D",
      tone: "lavender",
      milestones: [
        {
          title: "Continuous R&D and Platform Expansion",
          start: "2028-01",
          end: "2030-12",
        },
      ],
    },
  ];
