"use client";

import { useState } from "react";
import { Bank } from "@phosphor-icons/react";
import { DashboardShell } from "@/components/dashboard-shell";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { FormField } from "@/components/ui/FormField";
import { Input } from "@/components/ui/Input";
import { HistoryTable } from "@/components/ui/HistoryTable";
import { Skeleton } from "@/components/ui/Skeleton";
import { useDemoState } from "@/components/demo-state";
import { mockPayouts } from "@/lib/mock-data";
import styles from "./earnings.module.css";

export default function EarningsPage() {
  const { forceLoadingStates, kycComplete, completeKyc, lowPayout } = useDemoState();
  const [editingPayout, setEditingPayout] = useState(false);
  const [accountNumber, setAccountNumber] = useState("");

  const scheduledPayout = [...mockPayouts]
    .filter((p) => p.status === "Scheduled")
    .sort((a, b) => a.date.getTime() - b.date.getTime())[0];
  const nextPayout = scheduledPayout && lowPayout
    ? { ...scheduledPayout, amount: 15 }
    : scheduledPayout;

  return (
    <DashboardShell
      activeKey="earnings"
      pageTitle="Earnings"
      pageDescription="Your payout method and payout history."
    >
      <div className={styles.topRow}>
        <Card className={styles.summaryCard}>
          <div className={styles.summaryHeader}>
            <div className={styles.summaryLabel}>Next payout</div>
            <div className={styles.summaryRefreshNote}>Payout refreshes every couple of hours</div>
          </div>
          {forceLoadingStates ? (
            <>
              <Skeleton variant="text" width={100} height={28} />
              <Skeleton variant="text" width={140} />
            </>
          ) : (
            <>
              <div className={styles.summaryValue}>
                {nextPayout ? `$${nextPayout.amount.toLocaleString()}` : "—"}
              </div>
              {nextPayout ? (
                <div className={styles.payoutActionRow}>
                  <Button
                    variant="primary"
                    size="sm"
                    disabled={nextPayout.amount < 20}
                    onClick={() => console.log("Requested payout", nextPayout.amount)}
                  >
                    Request payout
                  </Button>
                  {nextPayout.amount < 20 && (
                    <span className={styles.minPayoutNote}>Min payout value $20</span>
                  )}
                </div>
              ) : (
                <div className={styles.summarySub}>No payout scheduled yet.</div>
              )}
            </>
          )}
        </Card>

        <Card className={styles.payoutCard} data-tour="tour-payout-method">
          <div className={styles.summaryLabel}>Payout method</div>
          <div className={styles.payoutRow}>
            <Bank size={20} weight="bold" />
            <span>{kycComplete ? "Bank account ending in 8821" : "Bank account not connected"}</span>
          </div>
          {kycComplete ? (
            <Button variant="secondary" size="sm" onClick={() => setEditingPayout((v) => !v)}>
              Edit
            </Button>
          ) : (
            <Button variant="primary" size="sm" onClick={completeKyc}>
              Complete KYC
            </Button>
          )}
          {kycComplete && editingPayout && (
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
        <HistoryTable type="payout" entries={mockPayouts} loading={forceLoadingStates} />
      </div>
    </DashboardShell>
  );
}
