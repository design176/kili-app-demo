"use client";

import { CampaignCard } from "@/components/ui/CampaignCard";
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
    name: "Enterprise waitlist",
    status: "Draft",
    budget: 600,
    spend: 0,
    impressions: 0,
    clicks: 0,
    cpc: 0,
    cpm: 0,
    ctr: 0,
    endDate: new Date(2026, 11, 31),
  },
];

export default function CampaignCardPage() {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Campaign Card</h1>
      <p className={styles.subtitle}>
        Mobile/cards-view equivalent of a Campaign Table row: name + status
        badge, a stacked stat list (Budget/Spend/Impressions/Clicks/CPC/CPM/CTR/End
        date), and the same primary &quot;Manage&quot; action, full-width.
      </p>

      <div className={styles.section}>
        <div className={styles.sectionTitle}>Status variants</div>
        <div className={styles.row}>
          {campaigns.map((c) => (
            <div key={c.id} style={{ width: 280 }}>
              <CampaignCard campaign={c} onManage={() => {}} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
