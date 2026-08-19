"use client";

import { useState } from "react";
import {
  CurrencyDollar,
  Eye,
  Cursor,
  Coins,
  ChartLineUp,
  Percent,
} from "@phosphor-icons/react/dist/ssr";
import { KPITile } from "@/components/ui/KPITile";
import { Switch } from "@/components/ui/Switch";
import styles from "../demo.module.css";

const spendData = [12, 14, 11, 18, 22, 19, 25, 28, 24, 30];
const impressionsData = [30, 28, 32, 29, 31, 35, 33, 30, 28, 27];

export default function KPITilePage() {
  const [loading, setLoading] = useState(false);

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>KPI Tile</h1>
      <p className={styles.subtitle}>
        Icon (per-metric) + label, dashed divider, large value, trend (%,
        direction-colored, comparison period picked per metric&apos;s data
        granularity) + a small real sparkline. A faint &quot;i&quot; in the
        top-right corner shows a brief explanation on hover — on touch
        devices it opens as a bottom-sheet modal instead.
      </p>

      <div className={styles.section}>
        <div className={styles.sectionTitle}>Loading</div>
        <div className={styles.row} style={{ alignItems: "center", gap: 8 }}>
          <Switch checked={loading} onCheckedChange={setLoading} />
          <span style={{ fontSize: 13, color: "var(--color-text-muted)" }}>
            Applies to every tile below
          </span>
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionTitle}>Advertiser Overview KPI strip</div>
        <div className={styles.row}>
          <KPITile
            icon={<CurrencyDollar size={16} weight="bold" />}
            label="Spend"
            value="$4,230"
            description="Total amount spent on the campaign, this period."
            trend={{ direction: "up", percent: 12, comparisonPeriod: "yesterday" }}
            sparklineData={spendData}
            loading={loading}
          />
          <KPITile
            icon={<Eye size={16} weight="bold" />}
            label="Impressions"
            value="182,400"
            description="How many times the ad was shown."
            trend={{ direction: "down", percent: 4, comparisonPeriod: "last_week" }}
            sparklineData={impressionsData}
            loading={loading}
          />
          <KPITile
            icon={<Cursor size={16} weight="bold" />}
            label="Clicks"
            value="3,102"
            description="How many times people clicked the ad."
            trend={{ direction: "up", percent: 8, comparisonPeriod: "last_month" }}
            sparklineData={spendData}
            loading={loading}
          />
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionTitle}>Platform Overview KPI strip</div>
        <div className={styles.row}>
          <KPITile
            icon={<Coins size={16} weight="bold" />}
            label="Revenue"
            value="$1,890"
            description="Total money earned from ads shown, this period."
            trend={{ direction: "up", percent: 6, comparisonPeriod: "last_period" }}
            sparklineData={spendData}
            loading={loading}
          />
          <KPITile
            icon={<ChartLineUp size={16} weight="bold" />}
            label="eCPM"
            value="$8.40"
            description="Revenue per 1,000 impressions."
            trend={{ direction: "up", percent: 3, comparisonPeriod: "yesterday" }}
            sparklineData={impressionsData}
            loading={loading}
          />
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionTitle}>No trend / no sparkline / no tooltip</div>
        <div className={styles.row}>
          <KPITile icon={<Percent size={16} weight="bold" />} label="CTR" value="1.7%" />
        </div>
      </div>
    </div>
  );
}
