"use client";

import { useState } from "react";
import { Eye } from "@phosphor-icons/react/dist/ssr";
import { KPISmallStrip } from "@/components/ui/KPISmallStrip";
import { Switch } from "@/components/ui/Switch";
import { formatCompactNumber } from "@/lib/format";
import styles from "../demo.module.css";

export default function KPISmallStripPage() {
  const [loading, setLoading] = useState(false);

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>KPI Small Strip</h1>
      <p className={styles.subtitle}>
        From{" "}
        <a
          href="https://www.figma.com/design/zIzP7ZqVck2dnUdtr3sFp3/Dashboard?node-id=16-116&m=dev"
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: "underline" }}
        >
          this Figma reference
        </a>
        . The most minimal of the three KPI variants — value + a small
        bordered icon on top, label below. No trend row at all. The icon is
        not a button — it&apos;s a static badge that shows a description
        tooltip on hover/focus (reuses the Tooltip atom&apos;s custom-trigger
        support). <code>orientation=&quot;column&quot;</code> stacks items
        vertically with horizontal dividers instead — used for a compact
        metrics list under a side panel.
      </p>

      <div className={styles.section}>
        <div className={styles.sectionTitle}>Loading</div>
        <div className={styles.row} style={{ alignItems: "center", gap: 8 }}>
          <Switch checked={loading} onCheckedChange={setLoading} />
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionTitle}>6 metrics, one card</div>
        <KPISmallStrip
          loading={loading}
          items={[
            { icon: <Eye size={14} weight="bold" />, tooltip: "How many times the ad was shown.", value: formatCompactNumber(182400), label: "Impressions" },
            { icon: <Eye size={14} weight="bold" />, tooltip: "How many times the ad was shown.", value: formatCompactNumber(182400), label: "Impressions" },
            { icon: <Eye size={14} weight="bold" />, tooltip: "How many times the ad was shown.", value: formatCompactNumber(182400), label: "Impressions" },
            { icon: <Eye size={14} weight="bold" />, tooltip: "How many times the ad was shown.", value: formatCompactNumber(182400), label: "Impressions" },
            { icon: <Eye size={14} weight="bold" />, tooltip: "How many times the ad was shown.", value: formatCompactNumber(182400), label: "Impressions" },
            { icon: <Eye size={14} weight="bold" />, tooltip: "How many times the ad was shown.", value: formatCompactNumber(182400), label: "Impressions" },
          ]}
        />
      </div>

      <div className={styles.section}>
        <div className={styles.sectionTitle}>fullWidth item (tablet/mobile grid only)</div>
        <p className={styles.subtitle}>
          Below 1200px the strip becomes a 2-column grid of bordered cards.
          Mark an item <code>fullWidth</code> to span both columns at the
          800px mobile breakpoint — e.g. a trailing &quot;Balance&quot; tile
          that only appears once the layout has collapsed to mobile. No
          effect above 1200px, where the strip is a single row.
        </p>
        <KPISmallStrip
          loading={loading}
          items={[
            { icon: <Eye size={14} weight="bold" />, tooltip: "How many times the ad was shown.", value: formatCompactNumber(182400), label: "Impressions" },
            { icon: <Eye size={14} weight="bold" />, tooltip: "How many times the ad was shown.", value: formatCompactNumber(182400), label: "Clicks" },
            { icon: <Eye size={14} weight="bold" />, tooltip: "How many times the ad was shown.", value: formatCompactNumber(182400), label: "CTR" },
            { icon: <Eye size={14} weight="bold" />, tooltip: "Your current account balance.", value: "$1,860.40", label: "Balance", fullWidth: true },
          ]}
        />
      </div>

      <div className={styles.section}>
        <div className={styles.sectionTitle}>Column orientation</div>
        <div style={{ maxWidth: 220 }}>
          <KPISmallStrip
            orientation="column"
            loading={loading}
            items={[
              { icon: <Eye size={14} weight="bold" />, tooltip: "Average cost for each click.", value: "$1.36", label: "CPC" },
              { icon: <Eye size={14} weight="bold" />, tooltip: "Cost for every thousand impressions.", value: "$23.20", label: "CPM" },
              { icon: <Eye size={14} weight="bold" />, tooltip: "Average cost for each conversion.", value: "$5.84", label: "CPA" },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
