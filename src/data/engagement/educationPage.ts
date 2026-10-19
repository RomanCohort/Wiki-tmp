import type { WikiPageContent } from "../../components/wiki/wikiPageTypes";
import { educationSections } from "./educationSections";

/** Complete Education manuscript from education-source.md. */
export const educationPage: WikiPageContent = {
  route: "/education",
  category: "engagement",
  chapter: "Engagement / 03 of 04",
  eyebrow: "Education · Learning through participation",
  title: "Education",
  lede: "Different barriers call for different educational responses.",
  boundary: "",
  visual: "education-dialogue",
  visualLabel: "From community needs to education and feedback",
  visualSteps: ["Audience × Context", "Educational Functions", "Portfolio", "Feedback"],
  facts: [],
  sections: educationSections,
  links: [
    { path: "/human-practices", label: "Integrated Human Practices" },
    { path: "/games", label: "Educational Games" },
    { path: "/sustainability", label: "SDG Sustainability Matrix" },
    { path: "/contribution", label: "Open Educational Assets" },
  ],
  next: {
    path: "/sustainability",
    label: "Sustainability",
    title: "Anchoring Local Action to Global Goals",
    description: "Education plants the seeds of change; sustainability ensures longevity. Explore how our vaccine roadmap directly advances United Nations Sustainable Development Goals.",
  },
};
