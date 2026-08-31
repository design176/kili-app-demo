"use client";

import { ReactNode, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  House,
  Megaphone,
  Target,
  CreditCard,
  Gear,
  Bug,
  Stack,
  Wallet,
} from "@phosphor-icons/react";
import { SidebarNav, type SidebarNavSection } from "@/components/ui/SidebarNav";
import { TopBar } from "@/components/ui/TopBar";
import { useDemoState } from "@/components/demo-state";
import { formatCurrency } from "@/lib/format";
import { openBugReportForm } from "@/lib/tally";
import styles from "./dashboard-shell.module.css";

const advertiserSections: SidebarNavSection[] = [
  {
    key: "workspace",
    label: "Workspace",
    items: [
      { key: "overview", label: "Overview", icon: <House size={16} weight="bold" /> },
      { key: "campaigns", label: "Campaigns", icon: <Megaphone size={16} weight="bold" /> },
      { key: "events", label: "Events Tracking", icon: <Target size={16} weight="bold" /> },
    ],
  },
  {
    key: "account",
    label: "Account",
    items: [
      { key: "billing", label: "Billing", icon: <CreditCard size={16} weight="bold" /> },
      { key: "settings", label: "Settings", icon: <Gear size={16} weight="bold" /> },
    ],
  },
  {
    key: "other",
    label: "Other",
    items: [{ key: "bug", label: "Bug report", icon: <Bug size={16} weight="bold" /> }],
  },
];

const developerSections: SidebarNavSection[] = [
  {
    key: "workspace",
    label: "Workspace",
    items: [
      {
        key: "overview",
        label: "Overview",
        icon: <House size={16} weight="bold" />,
        tourId: "nav-overview",
      },
      {
        key: "surfaces",
        label: "Surfaces",
        icon: <Stack size={16} weight="bold" />,
        tourId: "nav-surfaces",
      },
    ],
  },
  {
    key: "account",
    label: "Account",
    items: [
      { key: "earnings", label: "Earnings", icon: <Wallet size={16} weight="bold" /> },
      { key: "settings", label: "Settings", icon: <Gear size={16} weight="bold" /> },
    ],
  },
  {
    key: "other",
    label: "Other",
    items: [{ key: "bug", label: "Bug report", icon: <Bug size={16} weight="bold" /> }],
  },
];

const advertiserRoutes: Record<string, string> = {
  overview: "/advertiser/overview",
  campaigns: "/advertiser/campaigns",
  events: "/advertiser/events-tracking",
  billing: "/advertiser/billing",
  settings: "/advertiser/settings",
};

const developerRoutes: Record<string, string> = {
  overview: "/developer/overview",
  surfaces: "/developer/surfaces",
  earnings: "/developer/earnings",
  settings: "/developer/settings",
};

const MOBILE_QUERY = "(max-width: 800px)";

interface DashboardShellProps {
  activeKey: string;
  pageTitle: string;
  pageDescription?: string;
  breadcrumb?: string;
  onBack?: () => void;
  pageActions?: ReactNode;
  children: ReactNode;
}

export function DashboardShell({
  activeKey,
  pageTitle,
  pageDescription,
  breadcrumb,
  onBack,
  pageActions,
  children,
}: DashboardShellProps) {
  const {
    sidebarCollapsed,
    setSidebarCollapsed,
    balance,
    addBalance,
    kycComplete,
    developerTourStep,
    companyLogoUrl,
  } = useDemoState();
  const router = useRouter();
  const pathname = usePathname();
  const contentRef = useRef<HTMLDivElement>(null);
  const isAdvertiser = pathname.startsWith("/advertiser");
  const routes = isAdvertiser ? advertiserRoutes : developerRoutes;
  const tourActive = developerTourStep >= 0 && !isAdvertiser;

  // On small screens the sidebar starts collapsed to a rail; expanding it
  // becomes an overlay drawer instead of pushing the page (handled in CSS).
  useEffect(() => {
    const mql = window.matchMedia(MOBILE_QUERY);
    if (mql.matches) setSidebarCollapsed(true);
    const handleChange = (e: MediaQueryListEvent) => {
      if (e.matches) setSidebarCollapsed(true);
    };
    mql.addEventListener("change", handleChange);
    return () => mql.removeEventListener("change", handleChange);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Lock background scroll while the mobile overlay drawer is open, so
  // touch scrolling/gesture bounce on the page underneath doesn't leave the
  // page horizontally offset (clipped-looking text) once it closes — and
  // reset any horizontal scroll on close as a defensive fallback.
  useEffect(() => {
    if (!window.matchMedia(MOBILE_QUERY).matches) return;
    if (!sidebarCollapsed) {
      const { body } = document;
      const prevOverflow = body.style.overflow;
      body.style.overflow = "hidden";
      return () => {
        body.style.overflow = prevOverflow;
      };
    }
    if (contentRef.current) contentRef.current.scrollLeft = 0;
  }, [sidebarCollapsed]);

  const handleSelect = (key: string) => {
    // While the developer walkthrough is active, sidebar navigation is driven
    // by the coachmark's Previous/Next — ignore direct nav clicks so the tour
    // doesn't appear to close (route mismatch hides the coachmark).
    if (tourActive) return;
    if (key === "bug") {
      openBugReportForm();
      return;
    }
    const href = routes[key];
    if (href) router.push(href);
  };

  return (
    <div className={styles.shell}>
      {!sidebarCollapsed && (
        <div
          className={styles.backdrop}
          onClick={() => setSidebarCollapsed(true)}
        />
      )}
      <SidebarNav
        sections={isAdvertiser ? advertiserSections : developerSections}
        activeKey={activeKey}
        onSelect={handleSelect}
        collapsed={sidebarCollapsed}
        onCollapsedChange={setSidebarCollapsed}
        accountName="Sam Rivera"
        avatarUrl={isAdvertiser ? companyLogoUrl : undefined}
        onLogout={() => router.push("/login")}
        primaryAction={
          isAdvertiser
            ? { label: "New Campaign", onClick: () => router.push("/advertiser/campaigns/new") }
            : undefined
        }
        balance={
          isAdvertiser
            ? {
                label: "Balance",
                value: formatCurrency(balance),
                zero: balance === 0,
                onClick: () => router.push("/advertiser/billing"),
                onAdd: addBalance,
              }
            : undefined
        }
        statusAlert={
          !isAdvertiser && !kycComplete
            ? {
                label: "Account",
                value: "KYC not complete",
                onClick: () => router.push("/developer/earnings"),
              }
            : undefined
        }
      />

      <div className={styles.main}>
        <TopBar
          pageTitle={pageTitle}
          pageDescription={pageDescription}
          breadcrumb={breadcrumb}
          onBack={onBack}
          actions={pageActions}
        />

        <div ref={contentRef} className={styles.content}>{children}</div>
      </div>
    </div>
  );
}
