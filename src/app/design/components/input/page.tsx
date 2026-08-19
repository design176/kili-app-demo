"use client";

import { Input } from "@/components/ui/Input";
import { FieldPreview } from "../field-preview";
import styles from "../demo.module.css";

const states = ["default", "hover", "focus", "error"] as const;

export default function InputPage() {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Input</h1>
      <p className={styles.subtitle}>
        Single fixed size (32px). Used for short text fields — campaign
        title, heading, CTA link, budget amount.
      </p>

      <div className={styles.section}>
        <div className={styles.sectionTitle}>States</div>
        <div className={styles.row}>
          <FieldPreview
            states={states}
            render={(forceState) => (
              <Input
                placeholder="Campaign title"
                forceState={forceState}
                error={forceState === "error"}
                style={{ width: 220 }}
              />
            )}
          />
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionTitle}>Disabled</div>
        <Input placeholder="Campaign title" disabled style={{ width: 220 }} />
      </div>
    </div>
  );
}
