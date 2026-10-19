import {
  WatercolorCircle as SharedWatercolorCircle,
  type WatercolorCircleProps,
} from "../../WatercolorCircle";
import type { EntrepreneurshipOrbitTone } from "../../../../data/engagement/entrepreneurshipPage";

/** Preserve the entrepreneurship palette and styling on the shared drawing. */
export function WatercolorCircle(
  props: Omit<WatercolorCircleProps, "tone" | "className"> & {
    tone: EntrepreneurshipOrbitTone;
  },
) {
  return (
    <SharedWatercolorCircle
      {...props}
      className="entrepreneurship-watercolor"
    />
  );
}
