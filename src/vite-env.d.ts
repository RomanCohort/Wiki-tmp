/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_TEAM_ID: string;
  readonly VITE_TEAM_NAME: string;
  readonly VITE_TEAM_YEAR: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module "*.pdb?raw" {
  const content: string;
  export default content;
}

declare module "virtual:molecular-runtime" {
  export const Viewer: typeof import("./components/wiki/features/shared/molstarRuntime").Viewer;
}
