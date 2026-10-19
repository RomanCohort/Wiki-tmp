import { useLocation } from "react-router-dom";
import Pages from "../pages";

/**
 * Which reader module the current path belongs to.
 *
 * The header bar and the footer both recolour themselves from the module
 * palette, and the footer is not a descendant of `.wiki-page--*` — it is a
 * sibling of `<Routes>`. So both need the same answer, computed the same way;
 * this hook is that single answer. Deriving it twice is how the two drift.
 *
 * `route` is kept separate from the five module flags because the palette files
 * test the module classes and the header skin tests this one.
 */
export interface RouteModuleState {
  home: boolean;
  team: boolean;
  project: boolean;
  wetLab: boolean;
  dryLab: boolean;
  engagement: boolean;
  /** True on any of the five module routes. */
  route: boolean;
  /** `is-<module>-page` class list, e.g. `is-wet-lab-page is-route-page`. */
  className: string;
}

/**
 * Module keys, in nav order. `Pages` stays the source of truth for which pages
 * exist; this is the order they are tested in and the order the class list is
 * assembled, so a new module only has to be added here and in its palette file.
 */
const MODULES = [
  { key: "team", folder: "Team", alias: "/team" },
  { key: "project", folder: "Project", alias: "" },
  { key: "wet-lab", folder: "Wet Lab", alias: "" },
  { key: "dry-lab", folder: "Dry Lab", alias: "" },
  { key: "engagement", folder: "Engagement", alias: "" },
] as const;

/**
 * `pages.ts` keeps its node types private, so a folder is matched structurally
 * instead of by an imported guard. Only `name` and each card's `path` are read.
 */
function folderPaths(folderName: string): string[] {
  for (const item of Pages) {
    if (!("folder" in item) || item.name !== folderName) continue;
    const folder = item.folder;
    if (!folder) break;
    return folder.flatMap((card) =>
      "path" in card && card.path ? [card.path] : [],
    );
  }
  return [];
}

function isActive(pathname: string, path: string): boolean {
  if (path === "/") return pathname === "/";
  return pathname === path || pathname.startsWith(`${path}/`);
}

function moduleActive(pathname: string, folderName: string, alias: string) {
  const inFolder = folderPaths(folderName).some((path) =>
    isActive(pathname, path),
  );
  return inFolder || (alias !== "" && isActive(pathname, alias));
}

export function useRouteModule(): RouteModuleState {
  const { pathname } = useLocation();

  const home = isActive(pathname, "/");
  const team = moduleActive(pathname, "Team", "/team");
  const project = moduleActive(pathname, "Project", "");
  const wetLab = moduleActive(pathname, "Wet Lab", "");
  const dryLab = moduleActive(pathname, "Dry Lab", "");
  const engagement = moduleActive(pathname, "Engagement", "");
  const route = team || project || wetLab || dryLab || engagement;

  const className = [
    ...MODULES.filter(({ folder, alias }) =>
      moduleActive(pathname, folder, alias),
    ).map(({ key }) => `is-${key}-page`),
    route ? "is-route-page" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return {
    home,
    team,
    project,
    wetLab,
    dryLab,
    engagement,
    route,
    className,
  };
}
