"use client";

import { useState } from "react";
import { Coins, ChartBar, HandCoins } from "@phosphor-icons/react/dist/ssr";
import { CostBreakdownPills, CostBreakdownPanel } from "@/components/ui/CostBreakdown";
import { Switch } from "@/components/ui/Switch";
import styles from "../demo.module.css";

const items = [
  { key: "cpc", icon: <Coins size={12} weight="bold" />, tooltip: "Average cost for each click.", label: "CPC", value: "$1.36" },
  { key: "cpm", icon: <ChartBar size={12} weight="bold" />, tooltip: "Cost for every thousand impressions.", label: "CPM", value: "$23.20" },
  { key: "cpa", icon: <HandCoins size={12} weight="bold" />, tooltip: "Average cost for each conversion.", label: "CPA", value: "$5.84" },
];

export default function CostBreakdownPage() {
  const [loading, setLoading] = useState(false);

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Cost Breakdown</h1>
      <p className={styles.subtitle}>
        A responsive pair — <code>CostBreakdownPills</code> (Badge pills,
        icon + label + brand-colored amount, wrapped in a Tooltip) shown on
        mobile, and <code>CostBreakdownPanel</code> (a Card with a title and
        dashed-divider rows) shown on tablet/desktop. Both consume the same
        item shape and hide/show via CSS at the 800px breakpoint — place both
        in a layout and only one renders at a time. Used on Advertiser
        Overview (&quot;Spend breakdown&quot;) and Campaign Detail
        (&quot;Cost breakdown&quot;).
      </p>

      <div className={styles.section}>
        <div className={styles.sectionTitle}>Loading</div>
        <div className={styles.row} style={{ alignItems: "center", gap: 8 }}>
          <Switch checked={loading} onCheckedChange={setLoading} />
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionTitle}>
          Pills (only visible below 800px — resize the window to see them)
        </div>
        <CostBreakdownPills items={items} loading={loading} />
      </div>

      <div className={styles.section}>
        <div className={styles.sectionTitle}>Panel</div>
        <div style={{ maxWidth: 320 }}>
          <CostBreakdownPanel title="Cost breakdown" items={items} loading={loading} />
        </div>
      </div>
    </div>
  );
}
