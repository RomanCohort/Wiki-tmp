import { lazy } from "react";

// Register the same published pages; load only the selected route before PageReady.
export const Home = lazy(() =>
  import("./home-scene-01.tsx").then((page) => ({ default: page.Home })),
);
export const Activities = lazy(() =>
  import("./activities.tsx").then((page) => ({ default: page.Activities })),
);
export const Roster = lazy(() =>
  import("./roster.tsx").then((page) => ({ default: page.Roster })),
);
export const Attribution = lazy(() =>
  import("./attribution.tsx").then((page) => ({ default: page.Attribution })),
);
export const Description = lazy(() =>
  import("./description.tsx").then((page) => ({ default: page.Description })),
);
export const Engineering = lazy(() =>
  import("./engineering.tsx").then((page) => ({ default: page.Engineering })),
);
export const Results = lazy(() =>
  import("./results.tsx").then((page) => ({ default: page.Results })),
);
export const Contribution = lazy(() =>
  import("./contribution.tsx").then((page) => ({ default: page.Contribution })),
);
export const Experiments = lazy(() =>
  import("./experiments.tsx").then((page) => ({ default: page.Experiments })),
);
export const Notebook = lazy(() =>
  import("./notebook.tsx").then((page) => ({ default: page.Notebook })),
);
export const Measurement = lazy(() =>
  import("./measurement.tsx").then((page) => ({ default: page.Measurement })),
);
export const AlternativePlatform = lazy(() =>
  import("./alternative-platform.tsx").then((page) => ({
    default: page.AlternativePlatform,
  })),
);
export const SafetyAndSecurity = lazy(() =>
  import("./safety-and-security.tsx").then((page) => ({
    default: page.SafetyAndSecurity,
  })),
);
export const Model = lazy(() =>
  import("./model.tsx").then((page) => ({ default: page.Model })),
);
export const Software = lazy(() =>
  import("./software.tsx").then((page) => ({ default: page.Software })),
);
export const Hardware = lazy(() =>
  import("./hardware.tsx").then((page) => ({ default: page.Hardware })),
);
export const Games = lazy(() =>
  import("./games.tsx").then((page) => ({ default: page.Games })),
);
export const Entrepreneurship = lazy(() =>
  import("./entrepreneurship.tsx").then((page) => ({
    default: page.Entrepreneurship,
  })),
);
export const HumanPractices = lazy(() =>
  import("./human-practices.tsx").then((page) => ({
    default: page.HumanPractices,
  })),
);
export const Education = lazy(() =>
  import("./education.tsx").then((page) => ({ default: page.Education })),
);
export const Sustainability = lazy(() =>
  import("./sustainability.tsx").then((page) => ({
    default: page.Sustainability,
  })),
);

// Register the new navigation destinations while their page content is still
// unpublished. App supplies their title/lead with the existing template shell.
export const Design = lazy(() =>
  import("./design.tsx").then((page) => ({ default: page.Design })),
);
export const VisualDesign = lazy(() =>
  import("./visual-design.tsx").then((page) => ({ default: page.VisualDesign })),
);
