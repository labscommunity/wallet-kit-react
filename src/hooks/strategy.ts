import { getStrategy } from "@arweave-wallet-kit/core/strategy";
import useGlobalState from "./global";
import { useMemo } from "react";

/**
 * Active strategy (wallet) identifier
 */
export function useStrategy() {
  // global context
  const { state } = useGlobalState();
  const val = useMemo(() => state.activeStrategy, [state]);

  return val;
}

// active strategy instance
export default function useActiveStrategy() {
  // global context
  const { state } = useGlobalState();

  const strategy = useMemo(() => getStrategy(
    state.activeStrategy,
    state.config.strategies
  ), [state]);

  return strategy;
}

/**
 * Strategy API
 */
export function useApi() {
  const strategy = useActiveStrategy();

  const api = useMemo(() => {
    if (!strategy) return undefined;

    // only return api functions that would
    // not break the kit
    // e.g.: we don't return connect(),
    // as it needs it's implementation
    // from "useConnection"
    const apiObj = strategy;
    const omit = [
      "name",
      "description",
      "theme",
      "logo",
      "url",
      "resumeSession",
      "isAvailable",
      "addAddressEvent",
      "removeAddressEvent",
      "connect"
    ];

    for (const key in strategy) {
      if (!omit.includes(key)) continue;

      // @ts-expect-error
      delete apiObj[key];
    }

    return apiObj;
  }, [strategy]);

  return api;
}
