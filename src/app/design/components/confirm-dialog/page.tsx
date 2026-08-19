"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import styles from "../demo.module.css";

export default function ConfirmDialogPage() {
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Confirm Dialog</h1>
      <p className={styles.subtitle}>
        Centered modal — title, description, Cancel (Secondary) + Confirm
        (Destructive by default, or Primary for non-destructive
        confirmations). Used before Table&apos;s Archive action and any
        other irreversible click.
      </p>

      <div className={styles.section}>
        <div className={styles.sectionTitle}>Try it</div>
        <Button variant="destructive" onClick={() => setOpen(true)}>
          Archive campaign
        </Button>
      </div>

      <ConfirmDialog
        open={open}
        title='Archive "Q4 launch"?'
        description="This campaign will stop running and move to Ended. You can't undo this from here."
        confirmLabel="Archive"
        onCancel={() => setOpen(false)}
        onConfirm={() => setOpen(false)}
      />
    </div>
  );
}
