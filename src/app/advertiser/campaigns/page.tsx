"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus } from "@phosphor-icons/react";
import { DashboardShell } from "@/components/dashboard-shell";
import { Button } from "@/components/ui/Button";
import { Tabs } from "@/components/ui/Tabs";
import { CampaignTable, type Campaign } from "@/components/ui/CampaignTable";
import { CampaignCardGrid } from "@/components/ui/CampaignCardGrid";
import { useDemoState } from "@/components/demo-state";
import { mockCampaigns } from "@/lib/mock-data";
import styles from "./campaigns.module.css";

const viewItems = [
  { value: "table", label: "Table" },
  { value: "cards", label: "Cards" },
];

export default function CampaignsPage() {
  const { isNewUser, forceEmptyStates } = useDemoState();
  const router = useRouter();
  const isEmpty = forceEmptyStates || isNewUser;
  const campaigns: Campaign[] = isEmpty ? [] : mockCampaigns;
  const [view, setView] = useState<"table" | "cards">("table");

  const handleRowClick = (campaign: Campaign) => {
    if (campaign.status === "Draft") {
      router.push("/advertiser/campaigns/new");
      return;
    }
    router.push(`/advertiser/campaigns/${campaign.id}`);
  };

  return (
    <DashboardShell
      activeKey="campaigns"
      pageTitle="Campaigns"
      pageDescription="Every campaign you've created, with live spend and performance."
      pageActions={
        <Button variant="accent" onClick={() => router.push("/advertiser/campaigns/new")}>
          <Plus size={14} weight="bold" />
          Create Campaign
        </Button>
      }
    >
      <div className={styles.viewToggle}>
        <Tabs
          items={viewItems}
          value={view}
          onChange={(v) => setView(v as "table" | "cards")}
          size="sm"
        />
      </div>

      <div className={styles.tableView} data-active={view === "table"}>
        <CampaignTable
          campaigns={campaigns}
          onRowClick={handleRowClick}
          onCreateNew={() => router.push("/advertiser/campaigns/new")}
        />
      </div>

      <div className={styles.cardsView} data-active={view === "cards"}>
        <CampaignCardGrid
          campaigns={campaigns}
          onManage={handleRowClick}
          onCreateNew={() => router.push("/advertiser/campaigns/new")}
        />
      </div>
    </DashboardShell>
  );
}
