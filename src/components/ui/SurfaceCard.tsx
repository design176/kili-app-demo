import type { ReactNode } from "react";
import { Card } from "./Card";
import { Button } from "./Button";
import { formatCompactCurrency } from "@/lib/format";
import styles from "./SurfaceCard.module.css";

export type SurfaceCardProps = {
  /** Either an `<img src="..." />` for a real app icon, or an icon glyph (e.g. a Phosphor icon). */
  icon: ReactNode;
  name: string;
  description: string;
  status: "active" | "inactive";
  earned?: number;
  onAction?: () => void;
  className?: string;
};

export function SurfaceCard({
  icon,
  name,
  description,
  status,
  earned,
  onAction,
  className,
}: SurfaceCardProps) {
  const isActive = status === "active";

  return (
    <Card className={`${styles.card} ${className ?? ""}`}>
      <div className={styles.head}>
        <span className={styles.icon}>{icon}</span>
        <span className={`${styles.status} ${isActive ? styles.statusActive : ""}`}>
          <span className={styles.dot} />
          {isActive ? "Active" : "Inactive"}
        </span>
      </div>

      <span className={styles.name}>{name}</span>
      <p className={styles.description}>{description}</p>

      {isActive ? (
        <div className={styles.footer}>
          <span className={styles.earned}>{formatCompactCurrency(earned ?? 0)} Earned</span>
          <Button variant="primary" size="sm" onClick={onAction}>
            View
          </Button>
        </div>
      ) : (
        <Button variant="primary" size="sm" onClick={onAction}>
          Install
        </Button>
      )}
    </Card>
  );
}
