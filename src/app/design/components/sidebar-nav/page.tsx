"use client";

import { useState } from "react";
import {
  House,
  Megaphone,
  Target,
  Plug,
  Stack,
  Wallet,
  CreditCard,
  Gear,
  Bug,
} from "@phosphor-icons/react";
import { SidebarNav, type SidebarNavSection } from "@/components/ui/SidebarNav";
import styles from "../demo.module.css";

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

const developerSections: SidebarNavSection[] = [
  {
    key: "workspace",
    label: "Workspace",
    items: [
      { key: "overview", label: "Overview", icon: <House size={16} weight="bold" /> },
      { key: "surfaces", label: "Surfaces", icon: <Stack size={16} weight="bold" /> },
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

export default function SidebarNavPage() {
  const [active, setActive] = useState("overview");
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Sidebar Nav</h1>
      <p className={styles.subtitle}>
        Logo up top (24px, plus a larger secondary collapse toggle to balance
        it), items grouped into labeled sections separated by dotted
        dividers — Workspace / Account / Other — with a green line + tinted
        bg active state. A footer pinned to the bottom holds an optional
        balance card (advertiser only), an optional primary action (e.g. New
        Campaign), and the account menu (avatar, name, Log out) — moved here
        from Top Bar. Collapses to an icon-only rail using the compact
        LogoMark; no tooltips on collapsed nav items. <code>statusAlert</code>{" "}
        renders a second, always-danger-styled card above the balance card
        (e.g. developer&apos;s &quot;Payout method — Not set&quot;) using
        the same visual treatment as a zero balance. <code>avatarUrl</code>{" "}
        swaps the initial-letter avatar for an image (advertiser workspace
        uses the account&apos;s company logo, when set, from demo state).
      </p>

      <div className={styles.section}>
        <div className={styles.previewFrame}>
          <SidebarNav
            sections={advertiserSections}
            activeKey={active}
            onSelect={setActive}
            collapsed={collapsed}
            onCollapsedChange={setCollapsed}
            accountName="Sam Rivera"
            onLogout={() => {}}
            primaryAction={{ label: "New Campaign", onClick: () => {} }}
            balance={{ label: "Balance", value: "$1,860.40" }}
          />
          <div className={styles.previewSurface} />
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionTitle}>With avatar image</div>
        <div className={styles.previewFrame}>
          <SidebarNav
            sections={advertiserSections}
            activeKey={active}
            onSelect={setActive}
            collapsed={false}
            onCollapsedChange={() => {}}
            accountName="Sam Rivera"
            avatarUrl="https://upload.wikimedia.org/wikipedia/commons/e/ef/Youtube_logo.png"
            onLogout={() => {}}
            primaryAction={{ label: "New Campaign", onClick: () => {} }}
            balance={{ label: "Balance", value: "$1,860.40" }}
          />
          <div className={styles.previewSurface} />
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionTitle}>Status alert (developer)</div>
        <div className={styles.previewFrame}>
          <SidebarNav
            sections={developerSections}
            activeKey={active}
            onSelect={setActive}
            collapsed={false}
            onCollapsedChange={() => {}}
            accountName="Sam Rivera"
            onLogout={() => {}}
            statusAlert={{ label: "Payout method", value: "Not set" }}
          />
          <div className={styles.previewSurface} />
        </div>
      </div>
    </div>
  );
}
