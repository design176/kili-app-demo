"use client";

import { useEffect, useState } from "react";

const MOBILE_QUERY = "(max-width: 800px)";

/** SSR-safe (starts false, updates after mount) — matches DashboardShell's own 800px mobile breakpoint. */
export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(MOBILE_QUERY);
    // eslint-disable-next-line react-hooks/set-state-in-effect -- syncing from window.matchMedia, not derivable during render
    if (mql.matches) setIsMobile(true);
    const handleChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mql.addEventListener("change", handleChange);
    return () => mql.removeEventListener("change", handleChange);
  }, []);

  return isMobile;
}
