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
  Plug,
  Wallet,
} from "@phosphor-icons/react";
import { SidebarNav, type SidebarNavSection } from "@/components/ui/SidebarNav";
import { TopBar } from "@/components/ui/TopBar";
import { useDemoState } from "@/components/demo-state";
import { formatCurrency } from "@/lib/format";
import { openTallyForm } from "@/lib/tally";
import styles from "./dashboard-shell.module.css";

const BUG_REPORT_TALLY_FORM_ID = "ja8LLE";

const advertiserSections: SidebarNavSection[] = [
  {
    key: "workspace",
    label: "Workspace",
    items: [
      { key: "overview", label: "Overview", icon: <House size={16} weight="bold" /> },
      { key: "events", label: "Events Tracking", icon: <Target size={16} weight="bold" /> },
      { key: "campaigns", label: "Campaigns", icon: <Megaphone size={16} weight="bold" /> },
      { key: "pixel", label: "Pixel Setup", icon: <Plug size={16} weight="bold" /> },
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

const platformSections: SidebarNavSection[] = [
  {
    key: "workspace",
    label: "Workspace",
    items: [
      { key: "overview", label: "Overview", icon: <House size={16} weight="bold" /> },
      { key: "integration", label: "Integration", icon: <Plug size={16} weight="bold" /> },
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
  pixel: "/advertiser/pixel-tracking",
  events: "/advertiser/events-tracking",
  billing: "/advertiser/billing",
  settings: "/advertiser/settings",
};

const platformRoutes: Record<string, string> = {
  overview: "/platform/overview",
  integration: "/platform/integration",
  earnings: "/platform/earnings",
  settings: "/platform/settings",
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
  const { sidebarCollapsed, setSidebarCollapsed, balance, addBalance } = useDemoState();
  const router = useRouter();
  const pathname = usePathname();
  const contentRef = useRef<HTMLDivElement>(null);
  const isAdvertiser = pathname.startsWith("/advertiser");
  const routes = isAdvertiser ? advertiserRoutes : platformRoutes;

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
    if (key === "bug") {
      openTallyForm(BUG_REPORT_TALLY_FORM_ID, {
        layout: "modal",
        emoji: { text: "🦜", animation: "spin" },
      });
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
        sections={isAdvertiser ? advertiserSections : platformSections}
        activeKey={activeKey}
        onSelect={handleSelect}
        collapsed={sidebarCollapsed}
        onCollapsedChange={setSidebarCollapsed}
        accountName="Sam Rivera"
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
