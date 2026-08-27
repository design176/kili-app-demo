"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { HelpModal } from "@/components/ui/HelpModal";
import styles from "../demo.module.css";

export default function HelpModalPage() {
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Help Modal</h1>
      <p className={styles.subtitle}>
        Opened from the developer Settings &quot;Help&quot; button — a grid-background
        top section shows the support email in a copy-to-clipboard input, and
        below it two secondary actions let the user replay the walkthrough or
        report a bug.
      </p>

      <div className={styles.section}>
        <div className={styles.sectionTitle}>Try it</div>
        <Button variant="secondary" onClick={() => setOpen(true)}>
          Help
        </Button>
      </div>

      <HelpModal
        open={open}
        onClose={() => setOpen(false)}
        onWatchWalkthrough={() => setOpen(false)}
        onReportBug={() => setOpen(false)}
      />
    </div>
  );
}
