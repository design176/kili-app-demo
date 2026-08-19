"use client";

import { useState } from "react";
import { FormField } from "@/components/ui/FormField";
import { Input } from "@/components/ui/Input";
import styles from "../demo.module.css";

export default function FormFieldPage() {
  const [value, setValue] = useState("");

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Form Field</h1>
      <p className={styles.subtitle}>
        Wraps a label (+ optional required mark) around any field atom, with
        optional helper/error text below. Used across the Create Campaign
        wizard and Settings account info form.
      </p>

      <div className={styles.section}>
        <div className={styles.sectionTitle}>Default</div>
        <FormField label="Campaign title" helperText="Internal-only, never shown to end users." style={{ width: 260 }}>
          <Input
            placeholder="Q4 launch"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </FormField>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionTitle}>Required</div>
        <FormField label="Campaign heading" required style={{ width: 260 }}>
          <Input placeholder="The headline shown to end users" />
        </FormField>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionTitle}>Error</div>
        <FormField
          label="CTA link"
          helperText="Must be a valid URL."
          error
          style={{ width: 260 }}
        >
          <Input placeholder="https://…" error />
        </FormField>
      </div>
    </div>
  );
}
