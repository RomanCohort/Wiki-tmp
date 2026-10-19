import sourceData from "./doseScanData.json";

export interface DoseScanRow {
  dose_ug: number;
  p_effect: number;
  p_screen: number;
  p_joint: number;
  p_joint_mcse: number;
}

export const DOSE_SCAN_DEFAULT_INDEX = 102;
export const DOSE_SCAN_REQUIRED_JOINT = 0.8;
export const DOSE_SCAN_DRAW_COUNT = 1024;
export const DOSE_SCAN_SOURCE_SHA256 =
  "f0afd106ecd92896fa1e3f2ced6dac94440587d84dbd840048e448fdfa3000bc";

/** The 301-point scan supplied with the Model page, bundled locally for the Wiki. */
export const doseScanData = sourceData.rows as DoseScanRow[];

if (
  doseScanData.length !== 301 ||
  doseScanData[0]?.dose_ug !== 0 ||
  doseScanData.at(-1)?.dose_ug !== 30
) {
  throw new Error(
    "Dose scan data does not contain the expected 301-point grid",
  );
}
