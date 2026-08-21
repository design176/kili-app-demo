import type { ReactNode } from "react";
import { Card } from "./Card";
import { Badge } from "./Badge";
import { Tooltip } from "./Tooltip";
import { Skeleton } from "./Skeleton";
import styles from "./CostBreakdown.module.css";

export type CostBreakdownItem = {
  key: string;
  icon: ReactNode;
  tooltip: string;
  label: string;
  value: string;
};

export type CostBreakdownPillsProps = {
  items: CostBreakdownItem[];
  loading?: boolean;
  className?: string;
};

/** Mobile-only (≤800px) row of pills — pairs with CostBreakdownPanel, which covers the same items on wider screens. */
export function CostBreakdownPills({ items, loading, className }: CostBreakdownPillsProps) {
  return (
    <div className={`${styles.pillRow} ${className ?? ""}`}>
      {items.map((item) =>
        loading ? (
          <Skeleton key={item.key} variant="rect" width={72} height={22} className={styles.pillSkeleton} />
        ) : (
          <Tooltip key={item.key} text={item.tooltip}>
            <Badge tone="neutral">
              {item.icon}
              {item.label} · <span className={styles.pillAmount}>{item.value}</span>
            </Badge>
          </Tooltip>
        )
      )}
    </div>
  );
}

export type CostBreakdownPanelProps = {
  title: string;
  items: CostBreakdownItem[];
  loading?: boolean;
  className?: string;
};

/** Desktop/tablet-only (>800px) card — pairs with CostBreakdownPills, which covers the same items on mobile. */
export function CostBreakdownPanel({ title, items, loading, className }: CostBreakdownPanelProps) {
  return (
    <Card className={`${styles.panel} ${className ?? ""}`}>
      <div className={styles.sectionTitle}>{title}</div>
      <div className={styles.costList}>
        {items.map((item) => (
          <div key={item.key} className={styles.costRow}>
            <Tooltip text={item.tooltip}>
              <span className={styles.costIcon}>{item.icon}</span>
            </Tooltip>
            <span className={styles.costLabel}>
              {loading ? <Skeleton variant="text" width={40} /> : item.label}
            </span>
            <span className={styles.costValue}>
              {loading ? <Skeleton variant="text" width={48} /> : item.value}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}
