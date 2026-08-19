"use client";

import { useState } from "react";
import {
  House,
  Megaphone,
  ChartLineUp,
  CreditCard,
  Gear,
  Bug,
} from "@phosphor-icons/react";
import { SidebarNav, type SidebarNavSection } from "@/components/ui/SidebarNav";
import styles from "../demo.module.css";

const sections: SidebarNavSection[] = [
  {
    key: "workspace",
    label: "Workspace",
    items: [
      { key: "overview", label: "Overview", icon: <House size={16} weight="bold" /> },
      { key: "campaigns", label: "Campaigns", icon: <Megaphone size={16} weight="bold" /> },
      { key: "pixel", label: "Pixel Tracking", icon: <ChartLineUp size={16} weight="bold" /> },
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
        LogoMark; no tooltips on collapsed nav items.
      </p>

      <div className={styles.section}>
        <div
          style={{
            height: 520,
            border: "1px solid var(--color-border)",
            borderRadius: 10,
            overflow: "hidden",
            display: "flex",
          }}
        >
          <SidebarNav
            sections={sections}
            activeKey={active}
            onSelect={setActive}
            collapsed={collapsed}
            onCollapsedChange={setCollapsed}
            accountName="Sam Rivera"
            onLogout={() => {}}
            primaryAction={{ label: "New Campaign", onClick: () => {} }}
            balance={{ label: "Balance", value: "$1,860.40" }}
          />
          <div style={{ flex: 1, background: "var(--color-bg-subtle)" }} />
        </div>
      </div>
    </div>
  );
}
