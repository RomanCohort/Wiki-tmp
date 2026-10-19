import { useWetLabScrollRoute } from "./useWetLabScrollRoute";
import type { RefObject } from "react";

/**
 * Reader-route scroll routing for the reusable `WikiRoutePage` template.
 *
 * Thin wrapper over the shared state machine so the generic template never has
 * to name a module: it only supplies its own <html> state class, which the
 * abstract skin (`wiki-route-skin.css`) styles.
 */
export function useRouteReaderScroll(
  enabled: boolean,
  interfaceRef: RefObject<HTMLElement | null>,
  innerRef: RefObject<HTMLElement | null>,
) {
  useWetLabScrollRoute(enabled, interfaceRef, innerRef, {
    rootClass: "has-route-reader-scroll",
  });
}
