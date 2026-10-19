import { createElement, useEffect, useRef } from "react";
import bubbleModuleUrl from "../../../../../assets/wiki/sustainability/sdg-bubbles.js?url";
import { sustainabilityContributionScores } from "../../../../../data/engagement/sustainability/sustainabilityContributionData";

let registration: Promise<unknown> | undefined;

type BubbleElement = HTMLElement & {
  data: typeof sustainabilityContributionScores;
};

/** The supplied web component retains its chart, tooltips and keyboard behavior. */
export function SdgContributionBubbles() {
  const element = useRef<BubbleElement>(null);

  useEffect(() => {
    let mounted = true;
    registration ??= import(/* @vite-ignore */ bubbleModuleUrl);
    void registration.then(() => {
      if (mounted && element.current) {
        element.current.data = sustainabilityContributionScores;
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  return createElement("sdg-contribution-bubbles", {
    ref: element,
    className: "sust-contribution-bubbles",
  });
}
