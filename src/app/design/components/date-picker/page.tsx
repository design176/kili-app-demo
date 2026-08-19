"use client";

import { useState } from "react";
import { DatePicker, type DateRange } from "@/components/ui/DatePicker";
import { StateToggle } from "../state-toggle";
import { FieldPreview } from "../field-preview";
import styles from "../demo.module.css";

const states = ["default", "hover", "focus"] as const;
const modes = ["single", "range"] as const;

export default function DatePickerPage() {
  const [mode, setMode] = useState<(typeof modes)[number]>("single");
  const [value, setValue] = useState<DateRange>({ from: null, to: null });

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Date Picker</h1>
      <p className={styles.subtitle}>
        Custom dropdown, not the native browser calendar — month/year pill
        dropdowns plus a day grid. Two modes: single date (Budget &amp; time
        duration — Start/End date) and range (Campaign List — Date range
        filter, both ends picked in one popover).
      </p>

      <div className={styles.section}>
        <div className={styles.sectionTitle}>Try it</div>
        <div className={styles.row}>
          <StateToggle options={modes} value={mode} onChange={setMode} />
        </div>
        <div className={styles.row} style={{ marginTop: 12 }}>
          <DatePicker
            mode={mode}
            value={value}
            onChange={setValue}
            style={{ width: 220 }}
          />
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionTitle}>States</div>
        <div className={styles.row}>
          <FieldPreview
            states={states}
            render={(forceState) => (
              <DatePicker
                mode="single"
                value={{ from: null, to: null }}
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
        <DatePicker
          mode="single"
          value={{ from: null, to: null }}
          onChange={() => {}}
          disabled
          style={{ width: 180 }}
        />
      </div>
    </div>
  );
}
