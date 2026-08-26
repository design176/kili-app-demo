"use client";

import { CopyField } from "@/components/ui/CopyField";
import styles from "../demo.module.css";

export default function CopyFieldPage() {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Copy Field</h1>
      <p className={styles.subtitle}>
        Read-only monospace value with a copy action (briefly shows a
        checkmark), and an optional delete action. Used for Developer
        Surfaces&apos; API keys and Pixel Tracking&apos;s install
        snippet.
      </p>

      <div className={styles.section}>
        <div className={styles.sectionTitle}>API key (single line, deletable)</div>
        <CopyField
          value="gr_live_9f8a2c1e4b6d7f0a3c5e8b1d"
          onDelete={() => {}}
          className={styles.stepperWidth}
        />
      </div>

      <div className={styles.section}>
        <div className={styles.sectionTitle}>Install snippet (multiline)</div>
        <CopyField
          multiline
          value={`<script src="https://cdn.example.com/pixel.js"\n  data-key="gr_live_9f8a2c1e"></script>`}
          className={styles.stepperWidth}
        />
      </div>
    </div>
  );
}
