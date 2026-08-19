"use client";

import { CampaignTable, type Campaign } from "@/components/ui/CampaignTable";
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
    name: "Holiday promo",
    status: "Paused",
    budget: 2000,
    spend: 900,
    impressions: 74000,
    clicks: 880,
    cpc: 1.02,
    cpm: 12.2,
    ctr: 1.2,
    endDate: new Date(2026, 9, 15),
  },
  {
    id: "3",
    name: "Retargeting",
    status: "Draft",
    budget: 1000,
    spend: 0,
    impressions: 0,
    clicks: 0,
    cpc: 0,
    cpm: 0,
    ctr: 0,
    endDate: new Date(2026, 11, 31),
  },
];

export default function CampaignTablePage() {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Campaign Table</h1>
      <p className={styles.subtitle}>
        Table molecule configured for the Campaign List screen: Name /
        Status / Budget / Spend / Impressions / Clicks / CPC / CPM / CTR /
        End date, a single row action (a primary "Manage" button, opens the
        campaign), and the empty state.
        Create Campaign lives in the Top Bar actions slot, not this table.
      </p>

      <div className={styles.section}>
        <div className={styles.sectionTitle}>Campaign List</div>
        <CampaignTable campaigns={campaigns} onRowClick={() => {}} />
      </div>
    </div>
  );
}
