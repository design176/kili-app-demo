import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/**
 * True once the component has hydrated on the client. Avoids the classic
 * `useState(false)` + `useEffect(() => setMounted(true))` combo, which
 * trips the "no setState in effect" lint rule — useSyncExternalStore reports
 * the mismatched client/server snapshot without an extra render-then-commit.
 */
export function useMounted() {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );
}
