"use client";

import { useState } from "react";
import { Select } from "@/components/ui/Select";
import { FieldPreview } from "../field-preview";
import styles from "../demo.module.css";

const states = ["default", "hover", "focus"] as const;

const options = [
  { value: "all", label: "All statuses" },
  { value: "draft", label: "Draft" },
  { value: "active", label: "Active" },
  { value: "paused", label: "Paused" },
  { value: "ended", label: "Ended" },
];

export default function SelectPage() {
  const [value, setValue] = useState("all");

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Select</h1>
      <p className={styles.subtitle}>
        Custom dropdown, not the native browser select — a styled trigger
        plus a portaled listbox, so it can be styled consistently with Input.
        Used for the Campaign List filters — Status, Objective.
      </p>

      <div className={styles.section}>
        <div className={styles.sectionTitle}>Try it</div>
        <div className={styles.row}>
          <Select
            options={options}
            value={value}
            onChange={setValue}
            style={{ width: 180 }}
          />
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionTitle}>States</div>
        <div className={styles.row}>
          <FieldPreview
            states={states}
            render={(forceState) => (
              <Select
                options={options}
                value="all"
                onChange={() => {}}
                forceState={forceState}
                style={{ width: 180 }}
              />
            )}
          />
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionTitle}>Disabled</div>
        <Select
          options={options}
          value="all"
          onChange={() => {}}
          disabled
          style={{ width: 180 }}
        />
      </div>
    </div>
  );
}
