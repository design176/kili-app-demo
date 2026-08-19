import { Megaphone } from "@phosphor-icons/react";
import { CampaignCard } from "./CampaignCard";
import { EmptyState } from "./EmptyState";
import type { Campaign } from "./CampaignTable";
import styles from "./CampaignCardGrid.module.css";

export type CampaignCardGridProps = {
  campaigns: Campaign[];
  onManage?: (campaign: Campaign) => void;
  onCreateNew?: () => void;
  className?: string;
};

export function CampaignCardGrid({
  campaigns,
  onManage,
  onCreateNew,
  className,
}: CampaignCardGridProps) {
  if (campaigns.length === 0) {
    return (
      <div className={`${styles.empty} ${className ?? ""}`}>
        <EmptyState
          icon={<Megaphone size={20} weight="bold" />}
          title="No campaigns yet"
          description="Once you launch a campaign, it'll show up here with its spend and performance."
          primaryAction={{ label: "Create Campaign", onClick: onCreateNew }}
        />
      </div>
    );
  }

  return (
    <div className={`${styles.grid} ${className ?? ""}`}>
      {campaigns.map((campaign) => (
        <CampaignCard key={campaign.id} campaign={campaign} onManage={onManage} />
      ))}
    </div>
  );
}
