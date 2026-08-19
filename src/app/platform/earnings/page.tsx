"use client";

import { useState } from "react";
import { Bank } from "@phosphor-icons/react";
import { DashboardShell } from "@/components/dashboard-shell";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { FormField } from "@/components/ui/FormField";
import { Input } from "@/components/ui/Input";
import { HistoryTable } from "@/components/ui/HistoryTable";
import { mockPayouts } from "@/lib/mock-data";
import styles from "./earnings.module.css";

export default function EarningsPage() {
  const [editingPayout, setEditingPayout] = useState(false);
  const [accountNumber, setAccountNumber] = useState("");

  const nextPayout = [...mockPayouts]
    .filter((p) => p.status === "Scheduled")
    .sort((a, b) => a.date.getTime() - b.date.getTime())[0];

  return (
    <DashboardShell
      activeKey="earnings"
      pageTitle="Earnings"
      pageDescription="Your payout method and payout history."
    >
      <div className={styles.topRow}>
        <Card className={styles.summaryCard}>
          <div className={styles.summaryLabel}>Next payout</div>
          <div className={styles.summaryValue}>
            {nextPayout ? `$${nextPayout.amount.toLocaleString()}` : "—"}
          </div>
          <div className={styles.summarySub}>
            {nextPayout
              ? `Scheduled for ${nextPayout.date.toLocaleDateString("en-US", { month: "long", day: "numeric" })}`
              : "No payout scheduled yet."}
          </div>
        </Card>

        <Card className={styles.payoutCard}>
          <div className={styles.summaryLabel}>Payout method</div>
          <div className={styles.payoutRow}>
            <Bank size={20} weight="bold" />
            <span>Bank account ending in 8821</span>
          </div>
          <Button variant="secondary" size="sm" onClick={() => setEditingPayout((v) => !v)}>
            Edit
          </Button>
          {editingPayout && (
            <div className={styles.editForm}>
              <FormField label="Account number">
                <Input
                  placeholder="•••• •••• 8821"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                />
              </FormField>
              <Button
                variant="primary"
                onClick={() => {
                  console.log("Updated payout method", accountNumber);
                  setEditingPayout(false);
                }}
              >
                Save
              </Button>
            </div>
          )}
        </Card>
      </div>

      <div>
        <div className={styles.sectionTitle}>Payout history</div>
        <HistoryTable type="payout" entries={mockPayouts} />
      </div>
    </DashboardShell>
  );
}
