"use client";

import { useState } from "react";
import { Radio } from "@/components/ui/Radio";
import { FieldPreview } from "../field-preview";
import styles from "../demo.module.css";

const states = ["default", "hover", "focus"] as const;

export default function RadioPage() {
  const [value, setValue] = useState("weekly");

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Radio</h1>
      <p className={styles.subtitle}>
        Single-select circular control with a label. Used by Range
        Filter&apos;s Daily/Weekly/Monthly options.
      </p>

      <div className={styles.section}>
        <div className={styles.sectionTitle}>Try it</div>
        <div className={styles.row} style={{ flexDirection: "column", alignItems: "flex-start", gap: 8 }}>
          {["daily", "weekly", "monthly"].map((v) => (
            <Radio
              key={v}
              checked={value === v}
              onCheckedChange={() => setValue(v)}
              label={v[0].toUpperCase() + v.slice(1)}
            />
          ))}
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionTitle}>States</div>
        <div className={styles.row}>
          <FieldPreview
            states={states}
            center
            render={(forceState) => (
              <Radio checked={false} forceState={forceState} label="Option" onCheckedChange={() => {}} />
            )}
          />
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionTitle}>Checked</div>
        <div className={styles.row}>
          <Radio checked label="Selected" onCheckedChange={() => {}} />
        </div>
      </div>
    </div>
  );
}
