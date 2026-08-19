import { Megaphone } from "@phosphor-icons/react";
import { CampaignCard } from "./CampaignCard";
import { EmptyState } from "./EmptyState";
import { Card } from "./Card";
import { Divider } from "./Divider";
import { Skeleton } from "./Skeleton";
import type { Campaign } from "./CampaignTable";
import styles from "./CampaignCardGrid.module.css";

const SKELETON_CARD_COUNT = 4;
const SKELETON_STAT_ROWS = 4;

/** Mirrors CampaignCard's layout (head + divider + stat rows + button) with shimmering placeholders. */
function SkeletonCampaignCard() {
  return (
    <Card className={styles.card}>
      <div className={styles.head}>
        <Skeleton variant="text" width="55%" height={16} />
        <Skeleton variant="rect" width={56} height={18} />
      </div>
      <Divider className={styles.divider} />
      <div className={styles.stats}>
        {Array.from({ length: SKELETON_STAT_ROWS }, (_, i) => (
          <div key={i} className={styles.stat}>
            <Skeleton variant="text" width="60%" />
            <Skeleton variant="text" width="80%" height={14} />
          </div>
        ))}
      </div>
      <Skeleton variant="rect" height={32} />
    </Card>
  );
}

export type CampaignCardGridProps = {
  campaigns: Campaign[];
  onManage?: (campaign: Campaign) => void;
  onCreateNew?: () => void;
  loading?: boolean;
  className?: string;
};

export function CampaignCardGrid({
  campaigns,
  onManage,
  onCreateNew,
  loading,
  className,
}: CampaignCardGridProps) {
  if (loading) {
    return (
      <div className={`${styles.grid} ${className ?? ""}`}>
        {Array.from({ length: SKELETON_CARD_COUNT }, (_, i) => (
          <SkeletonCampaignCard key={i} />
        ))}
      </div>
    );
  }

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
