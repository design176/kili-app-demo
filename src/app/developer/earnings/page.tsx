"use client";

import { useState } from "react";
import { Wallet } from "@phosphor-icons/react";
import { DashboardShell } from "@/components/dashboard-shell";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { WalletAddressModal } from "@/components/ui/WalletAddressModal";
import { HistoryTable } from "@/components/ui/HistoryTable";
import { Skeleton } from "@/components/ui/Skeleton";
import { useDemoState } from "@/components/demo-state";
import { mockPayouts } from "@/lib/mock-data";
import { formatShortDate } from "@/lib/format";
import styles from "./earnings.module.css";

function truncateAddress(address: string) {
  if (address.length <= 12) return address;
  return `${address.slice(0, 6)}…${address.slice(-4)}`;
}

function PayoutMethodPanel({
  walletAddress,
  onOpenModal,
}: {
  walletAddress: string | null;
  onOpenModal: () => void;
}) {
  return (
    <>
      <div className={styles.payoutRow}>
        <Wallet size={20} weight="bold" />
        <span>{walletAddress ? truncateAddress(walletAddress) : "EVM wallet not set"}</span>
      </div>
      <Button variant={walletAddress ? "secondary" : "primary"} size="sm" onClick={onOpenModal}>
        {walletAddress ? "Change address" : "Setup"}
      </Button>
    </>
  );
}

export default function EarningsPage() {
  const { forceLoadingStates, walletAddress, setWalletAddress } = useDemoState();
  const [modalOpen, setModalOpen] = useState(false);

  const scheduledPayout = [...mockPayouts]
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
          <div className={styles.summaryHeader}>
            <div className={styles.summaryLabel}>Next payout</div>
            {scheduledPayout && walletAddress && (
              <div className={styles.summaryRefreshNote}>
                On {formatShortDate(scheduledPayout.date)}
              </div>
            )}
          </div>
          {forceLoadingStates ? (
            <>
              <Skeleton variant="text" width={100} height={28} />
              <Skeleton variant="text" width={140} />
            </>
          ) : (
            <>
              <div className={styles.summaryValue}>
                {scheduledPayout ? `$${scheduledPayout.amount.toLocaleString()}` : "—"}
              </div>
              <div className={!walletAddress ? styles.summarySubDanger : styles.summarySub}>
                {!walletAddress
                  ? "Payout method not set"
                  : scheduledPayout
                    ? "Sent automatically every 15 days"
                    : "No payout scheduled yet."}
              </div>
            </>
          )}
        </Card>

        <Card className={styles.payoutCard} data-tour="tour-payout-method">
          <div className={styles.summaryLabel}>Payout method</div>
          <PayoutMethodPanel walletAddress={walletAddress} onOpenModal={() => setModalOpen(true)} />
        </Card>
      </div>

      <div>
        <div className={styles.sectionTitle}>Payout history</div>
        <HistoryTable type="payout" entries={mockPayouts} loading={forceLoadingStates} />
      </div>

      <WalletAddressModal
        key={modalOpen ? walletAddress ?? "empty" : "idle"}
        open={modalOpen}
        initialAddress={walletAddress ?? ""}
        onClose={() => setModalOpen(false)}
        onSave={(address) => {
          setWalletAddress(address);
          setModalOpen(false);
        }}
      />
    </DashboardShell>
  );
}
