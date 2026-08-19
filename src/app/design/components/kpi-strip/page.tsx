"use client";

import { useState } from "react";
import { CurrencyDollar, Eye, Cursor } from "@phosphor-icons/react/dist/ssr";
import { KPIStrip } from "@/components/ui/KPIStrip";
import { Switch } from "@/components/ui/Switch";
import styles from "../demo.module.css";

const spendData = [12, 14, 11, 18, 22, 19, 25, 28, 24, 30];
const impressionsData = [30, 28, 32, 29, 31, 35, 33, 30, 28, 27];

export default function KPIStripPage() {
  const [loading, setLoading] = useState(false);

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>KPI Strip</h1>
      <p className={styles.subtitle}>
        Row of KPI Tiles for a screen — responsive grid, wraps as needed.
      </p>

      <div className={styles.section}>
        <div className={styles.sectionTitle}>Loading</div>
        <div className={styles.row} style={{ alignItems: "center", gap: 8 }}>
          <Switch checked={loading} onCheckedChange={setLoading} />
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionTitle}>Advertiser Overview</div>
        <KPIStrip
          loading={loading}
          tiles={[
            {
              icon: <CurrencyDollar size={16} weight="bold" />,
              label: "Spend",
              value: "$4,230",
              description: "Total amount spent on the campaign, this period.",
              trend: { direction: "up", percent: 12, comparisonPeriod: "yesterday" },
              sparklineData: spendData,
            },
            {
              icon: <Eye size={16} weight="bold" />,
              label: "Impressions",
              value: "182,400",
              description: "How many times the ad was shown.",
              trend: { direction: "down", percent: 4, comparisonPeriod: "last_week" },
              sparklineData: impressionsData,
            },
            {
              icon: <Cursor size={16} weight="bold" />,
              label: "Clicks",
              value: "3,102",
              description: "How many times people clicked the ad.",
              trend: { direction: "up", percent: 8, comparisonPeriod: "last_month" },
              sparklineData: spendData,
            },
          ]}
        />
      </div>
    </div>
  );
}
