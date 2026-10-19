let pending: Promise<typeof import("./molstarRuntime")> | undefined;

/** Share the molecular renderer between both pages; load it when needed. */
export function loadLocalMolstar() {
  pending ??= import("virtual:molecular-runtime").catch((error: unknown) => {
    pending = undefined;
    throw error;
  });
  return pending;
}
