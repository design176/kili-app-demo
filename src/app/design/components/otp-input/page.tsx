"use client";

import { useState } from "react";
import { OTPInput } from "@/components/ui/OTPInput";
import styles from "../demo.module.css";

export default function OTPInputPage() {
  const [value, setValue] = useState("");
  const [complete, setComplete] = useState("");

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>OTP Input</h1>
      <p className={styles.subtitle}>
        6-digit-box code entry for Login/Signup. Auto-advances on digit
        entry, backspace steps back, paste distributes across all boxes.
      </p>

      <div className={styles.section}>
        <div className={styles.sectionTitle}>Try it</div>
        <OTPInput value={value} onChange={setValue} onComplete={setComplete} />
        <p className={styles.sectionDesc} style={{ marginTop: 12 }}>
          {complete ? `Completed: ${complete}` : "Type any 6 digits."}
        </p>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionTitle}>Error</div>
        <OTPInput value="123456" onChange={() => {}} error />
      </div>
    </div>
  );
}
