"use client";

import { FileText, Wallet, XCircle } from "@phosphor-icons/react/dist/ssr";
import { AlertRow } from "@/components/ui/AlertRow";
import styles from "../demo.module.css";

export default function AlertRowPage() {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Alert Row</h1>
      <p className={styles.subtitle}>
        One item inside the Needs attention panel — tone-colored background
        and icon badge, title + description, and a top-right arrow instead
        of any CTA buttons — the whole row is the click target.
      </p>

      <div className={styles.section}>
        <div className={styles.sectionTitle}>Advertiser Overview — Needs attention</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, maxWidth: 420 }}>
          <AlertRow
            tone="neutral"
            icon={<FileText size={16} weight="bold" />}
            title="2 draft campaigns"
            description="Saved but not yet launched."
            onClick={() => {}}
          />
          <AlertRow
            tone="warning"
            icon={<Wallet size={16} weight="bold" />}
            title="Budget exhausting"
            description={'"Q4 launch" will run out of budget in 2 days.'}
            onClick={() => {}}
          />
          <AlertRow
            tone="danger"
            icon={<XCircle size={16} weight="bold" />}
            title="1 ad rejected"
            description="Flagged after going live — a content problem was found."
            onClick={() => {}}
          />
        </div>
      </div>
    </div>
  );
}
