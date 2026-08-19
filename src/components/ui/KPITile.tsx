import type { ReactNode } from "react";
import { ArrowUp, ArrowDown } from "@phosphor-icons/react/dist/ssr";
import { Card } from "./Card";
import { Sparkline } from "./Sparkline";
import { Tooltip } from "./Tooltip";
import { Skeleton } from "./Skeleton";
import styles from "./KPITile.module.css";

export type ComparisonPeriod = "yesterday" | "last_week" | "last_month" | "last_period";

const comparisonLabels: Record<ComparisonPeriod, string> = {
  yesterday: "vs Yesterday",
  last_week: "vs Last Week",
  last_month: "vs Last Month",
  last_period: "vs Last Period",
};

export type KPITileTrend = {
  direction: "up" | "down";
  percent: number;
  /** Pick based on the data granularity actually available for this metric. */
  comparisonPeriod?: ComparisonPeriod;
};

export type KPITileProps = {
  icon: ReactNode;
  label: string;
  value: string;
  /** Brief explanation shown in the faint corner tooltip. */
  description?: string;
  trend?: KPITileTrend;
  sparklineData?: number[];
  loading?: boolean;
  className?: string;
};

export function KPITile({
  icon,
  label,
  value,
  description,
  trend,
  sparklineData,
  loading,
  className,
}: KPITileProps) {
  const trendColor =
    trend?.direction === "down" ? "var(--color-chart-negative)" : "var(--color-chart-positive)";

  if (loading) {
    return (
      <Card className={`${styles.tile} ${className ?? ""}`}>
        <div className={styles.head}>
          <span className={styles.iconBadge}>{icon}</span>
          <Skeleton variant="text" width={60} />
        </div>
        <hr className={styles.divider} />
        <Skeleton variant="text" width="50%" height={22} />
        <div className={styles.footer}>
          <Skeleton variant="text" width={90} />
        </div>
      </Card>
    );
  }

  return (
    <Card className={`${styles.tile} ${className ?? ""}`}>
      {description && (
        <span className={styles.cornerTooltip}>
          <Tooltip text={description} faint />
        </span>
      )}

      <div className={styles.head}>
        <span className={styles.iconBadge}>{icon}</span>
        <span className={styles.label}>{label}</span>
      </div>

      <hr className={styles.divider} />

      <span className={styles.value}>{value}</span>

      {(trend || sparklineData) && (
        <div className={styles.footer}>
          {trend && (
            <span
              className={`${styles.trend} ${
                trend.direction === "down" ? styles.trendDown : styles.trendUp
              }`}
            >
              {trend.direction === "down" ? (
                <ArrowDown size={12} weight="bold" />
              ) : (
                <ArrowUp size={12} weight="bold" />
              )}
              <span className={styles.trendPercent}>{trend.percent}%</span>
              <span className={styles.comparisonLabel}>
                {comparisonLabels[trend.comparisonPeriod ?? "last_period"]}
              </span>
            </span>
          )}
          {sparklineData && (
            <Sparkline
              data={sparklineData}
              color={trendColor}
              className={styles.sparkline}
            />
          )}
        </div>
      )}
    </Card>
  );
}
