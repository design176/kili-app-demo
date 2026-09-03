"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { Gear } from "@phosphor-icons/react";
import { createPortal } from "react-dom";
import { Switch } from "./Switch";
import { Tabs } from "./Tabs";
import { useDemoState } from "@/components/demo-state";
import { useMounted } from "@/lib/use-mounted";
import styles from "./SettingsPanel.module.css";

const panelTabs = [
  { value: "settings", label: "Settings" },
  { value: "routes", label: "Routes" },
];

const routeGroups = [
  {
    label: "Dashboards",
    routes: [
      { href: "/advertiser/overview", label: "Advertiser" },
      { href: "/developer/overview", label: "Developer" },
    ],
  },
  {
    label: "Auth",
    routes: [{ href: "/login", label: "Login" }],
  },
  {
    label: "Design",
    routes: [
      { href: "/design", label: "Design home" },
      { href: "/design/ia", label: "IA" },
      { href: "/design/components", label: "Components" },
      { href: "/design/emails", label: "Emails" },
      { href: "/design/changelog", label: "Changelog" },
    ],
  },
];

export function SettingsPanel() {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const {
    isNewUser,
    setIsNewUser,
    forceEmptyStates,
    setForceEmptyStates,
    forceLoadingStates,
    setForceLoadingStates,
    resetBalance,
    clearApiKeys,
    clearPixelKeys,
    clearCompanyLogoUrl,
    clearWalletAddress,
    clearStripeAccountNumber,
    lowPayout,
    setLowPayout,
    triggerTransactionErrors,
    setTriggerTransactionErrors,
  } = useDemoState();
  const mounted = useMounted();
  const [open, setOpen] = useState(false);
  const [panelTab, setPanelTab] = useState("settings");

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
              <Tabs
                items={panelTabs}
                value={panelTab}
                onChange={setPanelTab}
                size="sm"
                className={styles.panelTabs}
              />

              {panelTab === "settings" ? (
                <>
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
                    <Switch checked={isNewUser} onCheckedChange={setIsNewUser} />
                  </div>
                  <p className={styles.rowHint}>
                    Simulates a fresh signup — resets balance, API keys, and
                    pixel keys to zero/empty. Doesn&apos;t navigate anywhere;
                    visit Login yourself (Routes tab) to see the
                    empty-onboarding path.
                  </p>

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

                  <div className={styles.row}>
                    <span className={styles.rowLabel}>Low payout (&lt;$20)</span>
                    <Switch checked={lowPayout} onCheckedChange={setLowPayout} />
                  </div>
                  <p className={styles.rowHint}>
                    Forces the developer Earnings page&apos;s next-payout
                    amount below the $20 minimum.
                  </p>

                  <div className={styles.row}>
                    <span className={styles.rowLabel}>Trigger transaction errors</span>
                    <Switch
                      checked={triggerTransactionErrors}
                      onCheckedChange={setTriggerTransactionErrors}
                    />
                  </div>
                  <p className={styles.rowHint}>
                    Makes the developer Earnings page&apos;s payout-request
                    animation end in a failure state instead of succeeding.
                  </p>

                  <div className={styles.divider} />

                  <div className={styles.row}>
                    <span className={styles.rowLabel}>Balance</span>
                    <button type="button" className={styles.resetButton} onClick={resetBalance}>
                      Reset to $0
                    </button>
                  </div>

                  <div className={styles.row}>
                    <span className={styles.rowLabel}>API keys</span>
                    <button type="button" className={styles.resetButton} onClick={clearApiKeys}>
                      Clear all
                    </button>
                  </div>

                  <div className={styles.row}>
                    <span className={styles.rowLabel}>Pixel keys</span>
                    <button type="button" className={styles.resetButton} onClick={clearPixelKeys}>
                      Clear all
                    </button>
                  </div>

                  <div className={styles.row}>
                    <span className={styles.rowLabel}>Company logo</span>
                    <button type="button" className={styles.resetButton} onClick={clearCompanyLogoUrl}>
                      Clear
                    </button>
                  </div>

                  <div className={styles.row}>
                    <span className={styles.rowLabel}>Wallet address</span>
                    <button type="button" className={styles.resetButton} onClick={clearWalletAddress}>
                      Clear
                    </button>
                  </div>

                  <div className={styles.row}>
                    <span className={styles.rowLabel}>Bank account</span>
                    <button
                      type="button"
                      className={styles.resetButton}
                      onClick={clearStripeAccountNumber}
                    >
                      Clear
                    </button>
                  </div>
                </>
              ) : (
                <div className={styles.routeList}>
                  {routeGroups.map((group, i) => (
                    <div key={group.label}>
                      {i > 0 && <div className={styles.divider} />}
                      <span className={styles.routeGroupLabel}>{group.label}</span>
                      {group.routes.map((route) => (
                        <button
                          key={route.href}
                          type="button"
                          className={styles.routeLink}
                          onClick={() => {
                            setOpen(false);
                            router.push(route.href);
                          }}
                        >
                          {route.label}
                        </button>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
