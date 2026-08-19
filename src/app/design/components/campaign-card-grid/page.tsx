"use client";

import { useState } from "react";
import { CampaignCardGrid } from "@/components/ui/CampaignCardGrid";
import { Switch } from "@/components/ui/Switch";
import type { Campaign } from "@/components/ui/CampaignTable";
import styles from "../demo.module.css";

const campaigns: Campaign[] = [
  {
    id: "1",
    name: "Q4 launch",
    status: "Active",
    budget: 5000,
    spend: 3120,
    impressions: 182400,
    clicks: 3102,
    cpc: 1.01,
    cpm: 17.1,
    ctr: 1.8,
    endDate: new Date(2026, 8, 30),
  },
  {
    id: "2",
    name: "Retargeting — trial users",
    status: "Paused",
    budget: 1200,
    spend: 990,
    impressions: 62100,
    clicks: 980,
    cpc: 1.01,
    cpm: 15.94,
    ctr: 1.58,
    endDate: new Date(2026, 9, 15),
  },
  {
    id: "3",
    name: "Brand awareness — spring",
    status: "Active",
    budget: 800,
    spend: 640,
    impressions: 30100,
    clicks: 410,
    cpc: 1.56,
    cpm: 21.26,
    ctr: 1.36,
    endDate: new Date(2026, 10, 1),
  },
];

export default function CampaignCardGridPage() {
  const [loading, setLoading] = useState(false);

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Campaign Card Grid</h1>
      <p className={styles.subtitle}>
        The Cards-view equivalent of Campaign Table — a responsive grid of
        Campaign Cards (auto-fills, min 260px each), same empty state. On the
        real Campaigns page, this is what mobile always shows, and what
        desktop shows when the Table/Cards toggle is set to Cards.
      </p>

      <div className={styles.section}>
        <div className={styles.sectionTitle}>Loading</div>
        <div className={styles.row} style={{ alignItems: "center", gap: 8 }}>
          <Switch checked={loading} onCheckedChange={setLoading} />
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionTitle}>3 campaigns</div>
        <CampaignCardGrid campaigns={campaigns} onManage={() => {}} loading={loading} />
      </div>

      <div className={styles.section}>
        <div className={styles.sectionTitle}>Empty</div>
        <CampaignCardGrid campaigns={[]} onCreateNew={() => {}} />
      </div>
    </div>
  );
}
