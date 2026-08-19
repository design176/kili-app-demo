"use client";

import { Textarea } from "@/components/ui/Textarea";
import { FieldPreview } from "../field-preview";
import styles from "../demo.module.css";

const states = ["default", "hover", "focus", "error"] as const;

export default function TextareaPage() {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Textarea</h1>
      <p className={styles.subtitle}>
        Multi-line field. Used for the ad content body text (plain text plus
        inline hyperlinks in the real screen — this atom is just the raw
        field; link parsing is a molecule-level concern).
      </p>

      <div className={styles.section}>
        <div className={styles.sectionTitle}>States</div>
        <div className={styles.row}>
          <FieldPreview
            states={states}
            render={(forceState) => (
              <Textarea
                placeholder="Body text"
                forceState={forceState}
                error={forceState === "error"}
                style={{ width: 260 }}
              />
            )}
          />
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionTitle}>Disabled</div>
        <Textarea placeholder="Body text" disabled style={{ width: 260 }} />
      </div>
    </div>
  );
}
