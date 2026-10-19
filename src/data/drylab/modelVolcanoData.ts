export const MODEL_VOLCANO_DATA_URL =
  "https://static.igem.wiki/teams/6056/wiki/files/pages/dry-lab/model/modelvolcanodata.json";

export type VolcanoPoint = [string, number, number, string];
type VolcanoData = Record<"024322" | "028102", VolcanoPoint[]>;
let request: Promise<VolcanoData> | undefined;

/** Both charts share one request; a failed request can be retried. */
export function loadModelVolcanoData(): Promise<VolcanoData> {
  return (request ??= fetch(MODEL_VOLCANO_DATA_URL)
    .then(async (response) => {
      if (!response.ok) throw new Error(`Volcano data: HTTP ${response.status}`);
      const data: unknown = await response.json();
      if (!data || typeof data !== "object") throw new Error("Invalid volcano data");
      for (const cohort of ["024322", "028102"] as const) {
        const rows = (data as Record<string, unknown>)[cohort];
        if (
          !Array.isArray(rows) || !rows.length ||
          !rows.every((row) =>
            Array.isArray(row) && row.length === 4 &&
            typeof row[0] === "string" && typeof row[3] === "string" &&
            Number.isFinite(row[1]) && Number.isFinite(row[2]) &&
            row[2] > 0 && row[2] <= 1,
          )
        ) throw new Error(`Invalid volcano data for PXD${cohort}`);
      }
      return data as VolcanoData;
    })
    .catch((error: unknown) => {
      request = undefined;
      throw error;
    }));
}
