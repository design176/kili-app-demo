import { Card } from "./Card";
import { Badge } from "./Badge";
import { Button } from "./Button";
import { Divider } from "./Divider";
import type { Campaign } from "./CampaignTable";
import { formatShortDate } from "@/lib/format";
import styles from "./CampaignCard.module.css";

const statusTone = {
  Draft: "neutral",
  Active: "success",
  Paused: "warning",
  Ended: "neutral",
  Archived: "danger",
} as const;

export type CampaignCardProps = {
  campaign: Campaign;
  onManage?: (campaign: Campaign) => void;
  className?: string;
};

export function CampaignCard({ campaign, onManage, className }: CampaignCardProps) {
  return (
    <Card className={`${styles.card} ${className ?? ""}`}>
      <div className={styles.head}>
        <span className={styles.name}>{campaign.name}</span>
        <Badge tone={statusTone[campaign.status]}>{campaign.status}</Badge>
      </div>

      <Divider className={styles.divider} />

      <div className={styles.stats}>
        <div className={styles.stat}>
          <span className={styles.statLabel}>Budget</span>
          <span className={styles.statValue}>${campaign.budget.toLocaleString()}</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statLabel}>Spend</span>
          <span className={styles.statValue}>${campaign.spend.toLocaleString()}</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statLabel}>Impressions</span>
          <span className={styles.statValue}>{campaign.impressions.toLocaleString()}</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statLabel}>Clicks</span>
          <span className={styles.statValue}>{campaign.clicks.toLocaleString()}</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statLabel}>CPC</span>
          <span className={styles.statValue}>${campaign.cpc.toFixed(2)}</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statLabel}>CPM</span>
          <span className={styles.statValue}>${campaign.cpm.toFixed(2)}</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statLabel}>CTR</span>
          <span className={styles.statValue}>{campaign.ctr}%</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statLabel}>End date</span>
          <span className={styles.statValue}>{formatShortDate(campaign.endDate)}</span>
        </div>
      </div>

      <Button
        variant="primary"
        size="sm"
        className={styles.manage}
        onClick={() => onManage?.(campaign)}
      >
        Manage
      </Button>
    </Card>
  );
}
