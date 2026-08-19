import type { ReactNode } from "react";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import styles from "./AlertRow.module.css";

type Tone = "neutral" | "brand" | "success" | "warning" | "danger" | "info";

export type AlertRowProps = {
  tone?: Tone;
  icon: ReactNode;
  title: string;
  description: string;
  onClick?: () => void;
  className?: string;
};

export function AlertRow({
  tone = "neutral",
  icon,
  title,
  description,
  onClick,
  className,
}: AlertRowProps) {
  const classes = [styles.row, styles[tone], className ?? ""]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes} onClick={onClick} role={onClick ? "button" : undefined}>
      <span className={styles.iconBadge}>{icon}</span>
      <div className={styles.body}>
        <span className={styles.title}>{title}</span>
        <span className={styles.description}>{description}</span>
      </div>
      <ArrowUpRight size={16} weight="bold" className={styles.arrow} />
    </div>
  );
}
