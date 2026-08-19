"use client";

import { FileText, Wallet, XCircle } from "@phosphor-icons/react/dist/ssr";
import { NeedsAttentionPanel } from "@/components/ui/NeedsAttentionPanel";
import styles from "../demo.module.css";

export default function NeedsAttentionPanelPage() {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Needs Attention Panel</h1>
      <p className={styles.subtitle}>
        List of Alert Rows surfacing what needs action right now — with a
        title and an empty state for when nothing does.
      </p>

      <div className={styles.section}>
        <div className={styles.sectionTitle}>With items</div>
        <div style={{ maxWidth: 420 }}>
          <NeedsAttentionPanel
            items={[
              {
                tone: "neutral",
                icon: <FileText size={16} weight="bold" />,
                title: "2 draft campaigns",
                description: "Saved but not yet launched.",
                onClick: () => {},
              },
              {
                tone: "warning",
                icon: <Wallet size={16} weight="bold" />,
                title: "Budget exhausting",
                description: '"Q4 launch" will run out of budget in 2 days.',
                onClick: () => {},
              },
              {
                tone: "danger",
                icon: <XCircle size={16} weight="bold" />,
                title: "1 ad rejected",
                description: "Flagged after going live — a content problem was found.",
                onClick: () => {},
              },
            ]}
          />
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionTitle}>Empty</div>
        <div style={{ maxWidth: 420 }}>
          <NeedsAttentionPanel items={[]} />
        </div>
      </div>
    </div>
  );
}
