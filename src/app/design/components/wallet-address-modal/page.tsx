"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { WalletAddressModal } from "@/components/ui/WalletAddressModal";
import styles from "../demo.module.css";

export default function WalletAddressModalPage() {
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Wallet Address Modal</h1>
      <p className={styles.subtitle}>
        Centered modal for setting/changing the developer&apos;s EVM payout wallet
        address — single required field, Cancel (secondary) + Save (primary). Used
        from the developer Earnings page&apos;s Payout method card (both the initial
        &quot;Setup&quot; and later &quot;Change address&quot; buttons open this same
        modal).
      </p>

      <div className={styles.section}>
        <div className={styles.sectionTitle}>Empty (first-time setup)</div>
        <Button variant="primary" onClick={() => setOpen(true)}>
          Setup
        </Button>
        <WalletAddressModal
          open={open}
          onClose={() => setOpen(false)}
          onSave={() => setOpen(false)}
        />
      </div>

      <div className={styles.section}>
        <div className={styles.sectionTitle}>Pre-filled (change existing address)</div>
        <Button variant="secondary" onClick={() => setEditOpen(true)}>
          Change address
        </Button>
        <WalletAddressModal
          open={editOpen}
          initialAddress="0x8f3Cc1B2b6d1A4e9F0C7d5B2A1E9F0C7d5B2A1E9"
          onClose={() => setEditOpen(false)}
          onSave={() => setEditOpen(false)}
        />
      </div>
    </div>
  );
}
