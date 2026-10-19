/** Mirrors the section IDs and labels in the official form's Jump to menu.
 * Content stays in the live official iframe; only its outline is hosted here.
 */
export const attributionPage = {
  route: "/attributions",
  title: "Project Attributions",
  formUrl: "https://teams.igem.org/wiki/6056/attributions",
  sections: [
    { id: "team-member-contributions", label: "Team Member Contributions" },
    { id: "ai-tool-use", label: "AI Tool Use" },
    { id: "igem-partner-offers", label: "iGEM & Partner Offers" },
    { id: "external-contributions", label: "External Contributions" },
    { id: "timeline", label: "Timeline" },
  ],
  next: {
    path: "/activities",
    label: "Team Activities",
    title: "Beyond the Protocol: Our Journey Together",
    description: "Attribution matrices document the tasks, but not the memories. Step behind the scenes to see the camaraderie, trials, and triumphs of our season.",
  },
} as const;
