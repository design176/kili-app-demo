"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { AddBalanceModal } from "@/components/ui/AddBalanceModal";
import styles from "../demo.module.css";

export default function AddBalanceModalPage() {
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Add Balance Modal</h1>
      <p className={styles.subtitle}>
        Centered modal for topping up account balance — amount field (min
        $100), quick-select pills ($200/$500/$1,000/$2,000), Cancel
        (Secondary) + Add (Primary). Used from the Sidebar Nav balance card
        and Billing&apos;s "Add balance" button.
      </p>

      <div className={styles.section}>
        <div className={styles.sectionTitle}>Try it</div>
        <Button variant="accent" onClick={() => setOpen(true)}>
          Add balance
        </Button>
      </div>

      <AddBalanceModal
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={() => setOpen(false)}
      />
    </div>
  );
}
