import type { ReactNode } from "react";
import { Button, type ButtonProps } from "./Button";
import styles from "./EmptyState.module.css";

export type EmptyStateAction = {
  label: string;
  onClick?: () => void;
  icon?: ReactNode;
  variant?: ButtonProps["variant"];
};

export type EmptyStateProps = {
  icon: ReactNode;
  title: string;
  description: string;
  primaryAction?: EmptyStateAction;
  secondaryAction?: EmptyStateAction;
  className?: string;
};

export function EmptyState({
  icon,
  title,
  description,
  primaryAction,
  secondaryAction,
  className,
}: EmptyStateProps) {
  return (
    <div className={`${styles.wrap} ${className ?? ""}`}>
      <div className={styles.halo}>
        <span className={`${styles.ring} ${styles.ring1}`} />
        <span className={`${styles.ring} ${styles.ring2}`} />
        <span className={styles.iconBox}>{icon}</span>
      </div>

      <div className={styles.title}>{title}</div>
      <p className={styles.description}>{description}</p>

      {(primaryAction || secondaryAction) && (
        <div className={styles.actions}>
          {secondaryAction && (
            <Button
              variant={secondaryAction.variant ?? "secondary"}
              size="md"
              onClick={secondaryAction.onClick}
            >
              {secondaryAction.icon}
              {secondaryAction.label}
            </Button>
          )}
          {primaryAction && (
            <Button
              variant={primaryAction.variant ?? "accent"}
              size="md"
              onClick={primaryAction.onClick}
            >
              {primaryAction.icon}
              {primaryAction.label}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
