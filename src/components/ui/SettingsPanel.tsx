"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { Gear } from "@phosphor-icons/react";
import { createPortal } from "react-dom";
import { Switch } from "./Switch";
import { Tabs } from "./Tabs";
import { useDemoState } from "@/components/demo-state";
import { useMounted } from "@/lib/use-mounted";
import styles from "./SettingsPanel.module.css";

const dashboardItems = [
  { value: "advertiser", label: "Advertiser" },
  { value: "platform", label: "Platform" },
];

export function SettingsPanel() {
  const router = useRouter();
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const {
    isNewUser,
    setIsNewUser,
    forceEmptyStates,
    setForceEmptyStates,
    forceLoadingStates,
    setForceLoadingStates,
  } = useDemoState();
  const mounted = useMounted();
  const [open, setOpen] = useState(false);
  const dashboard = pathname.startsWith("/platform") ? "platform" : "advertiser";

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey && e.code === "KeyD") {
        e.preventDefault();
        setTheme(theme === "dark" ? "light" : "dark");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [theme, setTheme]);

  if (!mounted) return null;

  return (
    <>
      <button
        type="button"
        className={styles.fab}
        aria-label="Settings"
        onClick={() => setOpen(true)}
      >
        <Gear size={20} weight="bold" />
      </button>

      {open &&
        createPortal(
          <div className={styles.backdrop} onClick={() => setOpen(false)}>
            <div className={styles.panel} onClick={(e) => e.stopPropagation()}>
              <div className={styles.title}>Settings</div>

              <div className={styles.row}>
                <span className={styles.rowLabel}>Dark mode</span>
                <Switch
                  checked={theme === "dark"}
                  onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
                />
              </div>

              <div className={styles.divider} />

              <div className={styles.row}>
                <span className={styles.rowLabel}>New user</span>
                <Switch
                  checked={isNewUser}
                  onCheckedChange={(checked) => {
                    setIsNewUser(checked);
                    setOpen(false);
                    router.push("/login");
                  }}
                />
              </div>
              <p className={styles.rowHint}>
                Dummy auth — any 6-digit code works. This just decides
                whether the login/signup screen ends in the empty-onboarding
                path or a populated dashboard.
              </p>

              <div className={styles.row}>
                <span className={styles.rowLabel}>Dashboard</span>
                <Tabs
                  items={dashboardItems}
                  value={dashboard}
                  onChange={(v) => {
                    setOpen(false);
                    router.push(`/${v}/overview`);
                  }}
                  size="sm"
                />
              </div>

              <div className={styles.row}>
                <span className={styles.rowLabel}>Empty states</span>
                <Switch checked={forceEmptyStates} onCheckedChange={setForceEmptyStates} />
              </div>
              <p className={styles.rowHint}>
                Forces every page/component&apos;s empty state, independent
                of the New user toggle.
              </p>

              <div className={styles.row}>
                <span className={styles.rowLabel}>Loading states</span>
                <Switch checked={forceLoadingStates} onCheckedChange={setForceLoadingStates} />
              </div>
              <p className={styles.rowHint}>
                Forces every page&apos;s loading skeleton, independent of the
                other toggles above.
              </p>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
