"use client";

import { useState } from "react";
import { Switch } from "@/components/ui/Switch";
import { FieldPreview } from "../field-preview";
import styles from "../demo.module.css";

const states = ["default", "hover", "focus"] as const;

export default function SwitchPage() {
  const [checked, setChecked] = useState(false);

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Switch</h1>
      <p className={styles.subtitle}>
        On/off toggle. Used for the Settings notification toggles (budget
        exhausting, ad rejected, integration errors, missing payout method).
      </p>

      <div className={styles.section}>
        <div className={styles.sectionTitle}>Try it</div>
        <div className={styles.row}>
          <Switch checked={checked} onCheckedChange={setChecked} />
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionTitle}>States</div>
        <div className={styles.row}>
          <FieldPreview
            states={states}
            center
            render={(forceState) => (
              <Switch
                checked={checked}
                forceState={forceState}
                onCheckedChange={setChecked}
              />
            )}
          />
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionTitle}>Disabled</div>
        <div className={styles.row}>
          <Switch checked={false} disabled onCheckedChange={() => {}} />
          <Switch checked disabled onCheckedChange={() => {}} />
        </div>
      </div>
    </div>
  );
}
