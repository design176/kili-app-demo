import { Fragment, type ReactNode } from "react";
import { Card } from "./Card";
import { Tooltip } from "./Tooltip";
import { Skeleton } from "./Skeleton";
import styles from "./KPISmallStrip.module.css";

export type KPISmallItem = {
  icon: ReactNode;
  /** Shown in a tooltip on hover/focus — the icon is not a button. */
  tooltip?: string;
  value: string;
  label: string;
};

export type KPISmallStripProps = {
  items: KPISmallItem[];
  loading?: boolean;
  className?: string;
};

export function KPISmallStrip({ items, loading, className }: KPISmallStripProps) {
  return (
    <Card
      className={`${styles.strip} ${className ?? ""}`}
      style={{ padding: "20px 24px", background: "var(--color-surface-2)" }}
    >
      {items.map((item, i) => {
        const badge = <span className={styles.iconBadge}>{item.icon}</span>;

        return (
          <Fragment key={item.label}>
            {i > 0 && <div className={styles.divider} />}
            <div className={styles.item}>
              <div className={styles.head}>
                {loading ? (
                  <Skeleton variant="text" width={56} height={20} />
                ) : (
                  <span className={styles.value}>{item.value}</span>
                )}
                {item.tooltip ? (
                  <Tooltip text={item.tooltip}>{badge}</Tooltip>
                ) : (
                  badge
                )}
              </div>
              {loading ? (
                <Skeleton variant="text" width={70} />
              ) : (
                <span className={styles.label}>{item.label}</span>
              )}
            </div>
          </Fragment>
        );
      })}
    </Card>
  );
}
