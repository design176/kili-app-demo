import { AlertRow, type AlertRowProps } from "./AlertRow";
import styles from "./NeedsAttentionPanel.module.css";

export type NeedsAttentionPanelProps = {
  title?: string;
  items: AlertRowProps[];
  emptyMessage?: string;
  className?: string;
};

export function NeedsAttentionPanel({
  title = "Needs attention",
  items,
  emptyMessage = "Nothing needs your attention right now.",
  className,
}: NeedsAttentionPanelProps) {
  return (
    <div className={`${styles.panel} ${className ?? ""}`}>
      <span className={styles.title}>{title}</span>
      {items.length === 0 ? (
        <div className={styles.empty}>{emptyMessage}</div>
      ) : (
        <div className={styles.list}>
          {items.map((item, i) => (
            <AlertRow key={i} {...item} />
          ))}
        </div>
      )}
    </div>
  );
}
