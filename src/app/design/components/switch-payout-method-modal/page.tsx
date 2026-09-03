"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { SwitchPayoutMethodModal } from "@/components/ui/SwitchPayoutMethodModal";
import type { PayoutMethod } from "@/components/demo-state";
import styles from "../demo.module.css";

export default function SwitchPayoutMethodModalPage() {
  const [target, setTarget] = useState<PayoutMethod | null>(null);

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Switch Payout Method Modal</h1>
      <p className={styles.subtitle}>
        Confirmation modal shown before switching the developer&apos;s active payout
        method — a side-by-side comparison of Stripe (automatic, every 15 days) vs.
        EVM wallet (instant, single click), Cancel (secondary) + Switch (primary).
        Used from the developer Earnings page&apos;s Payout method card when both
        methods are connected and the developer selects the other one.
      </p>

      <div className={styles.section}>
        <div className={styles.sectionTitle}>Switching to EVM wallet</div>
        <Button variant="primary" onClick={() => setTarget("wallet")}>
          Select wallet
        </Button>
        <SwitchPayoutMethodModal
          open={target === "wallet"}
          target="wallet"
          onCancel={() => setTarget(null)}
          onConfirm={() => setTarget(null)}
        />
      </div>

      <div className={styles.section}>
        <div className={styles.sectionTitle}>Switching to Stripe</div>
        <Button variant="primary" onClick={() => setTarget("stripe")}>
          Select Stripe
        </Button>
        <SwitchPayoutMethodModal
          open={target === "stripe"}
          target="stripe"
          onCancel={() => setTarget(null)}
          onConfirm={() => setTarget(null)}
        />
      </div>
    </div>
  );
}
