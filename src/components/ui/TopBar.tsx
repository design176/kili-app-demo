import type { ReactNode } from "react";
import { ArrowLeft } from "@phosphor-icons/react";
import { IconButton } from "./IconButton";
import styles from "./TopBar.module.css";

export type TopBarProps = {
  pageTitle: string;
  pageDescription?: string;
  breadcrumb?: string;
  onBack?: () => void;
  actions?: ReactNode;
  className?: string;
};

export function TopBar({
  pageTitle,
  pageDescription,
  breadcrumb,
  onBack,
  actions,
  className,
}: TopBarProps) {
  return (
    <div className={`${styles.bar} ${className ?? ""}`}>
      <div className={styles.left}>
        {onBack && (
          <IconButton variant="ghost" size="md" label="Back" onClick={onBack}>
            <ArrowLeft size={16} weight="bold" />
          </IconButton>
        )}
        <div className={styles.page}>
          <span className={styles.pageTitle}>
            {breadcrumb && (
              <span className={styles.breadcrumb}>{breadcrumb} / </span>
            )}
            {pageTitle}
          </span>
          {pageDescription && (
            <span className={styles.pageDescription}>{pageDescription}</span>
          )}
        </div>
      </div>
      {actions && <div className={styles.actions}>{actions}</div>}
    </div>
  );
}
