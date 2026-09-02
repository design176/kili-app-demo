"use client";

import { useState } from "react";
import { Wallet, CircleNotch } from "@phosphor-icons/react";
import { DashboardShell } from "@/components/dashboard-shell";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { WalletAddressModal } from "@/components/ui/WalletAddressModal";
import { HistoryTable } from "@/components/ui/HistoryTable";
import { Skeleton } from "@/components/ui/Skeleton";
import { useDemoState } from "@/components/demo-state";
import { mockPayouts } from "@/lib/mock-data";
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

/** The scheduled payout closest to being paid out, or undefined if none is scheduled. */
function useScheduledPayout() {
  const [scheduledPayout] = useState(() =>
    [...mockPayouts]
      .filter((p) => p.status === "Scheduled")
      .sort((a, b) => a.date.getTime() - b.date.getTime())[0]
  );
  return scheduledPayout;
}

const PAYOUT_PROCESSING_MS = 1000;

/** Tracks a single in-flight "Request payout" click: its amount, and how it resolved. */
type PayoutRequest = { amount: number; status: "processing" | "paid" | "failed" };

function payoutCardHeading(request: PayoutRequest | null) {
  switch (request?.status) {
    case "processing":
      return "Paying out";
    case "paid":
      return "Paid successfully";
    case "failed":
      return "Payout failed";
    default:
      return "Next payout";
  }
}

export default function EarningsPage() {
  const { forceLoadingStates, walletAddress, setWalletAddress, lowPayout, triggerTransactionErrors } =
    useDemoState();
  const [modalOpen, setModalOpen] = useState(false);
  const [payouts, setPayouts] = useState(() =>
    mockPayouts.filter((p) => p.status !== "Scheduled")
  );
  const scheduledPayout = useScheduledPayout();

  // Testing toggle forces the amount below the $20 minimum without touching the mock data.
  const nextPayout =
    scheduledPayout && lowPayout ? { ...scheduledPayout, amount: 15 } : scheduledPayout;

  const [payoutRequest, setPayoutRequest] = useState<PayoutRequest | null>(null);

  const handleRequestPayout = () => {
    if (!nextPayout) return;
    const amount = nextPayout.amount;
    const pendingId = `po_pending_${Date.now()}`;
    setPayoutRequest({ amount, status: "processing" });
    setPayouts((prev) => [...prev, { id: pendingId, date: new Date(), amount, status: "Pending" }]);

    setTimeout(() => {
      const resultStatus = triggerTransactionErrors ? "Failed" : "Paid";
      setPayouts((prev) =>
        prev.map((p) => (p.id === pendingId ? { ...p, status: resultStatus } : p))
      );
      setPayoutRequest({ amount, status: triggerTransactionErrors ? "failed" : "paid" });
    }, PAYOUT_PROCESSING_MS);
  };

  const handleClosePayoutCard = () => setPayoutRequest(null);

  return (
    <DashboardShell
      activeKey="earnings"
      pageTitle="Earnings"
      pageDescription="Your payout method and payout history."
    >
      <div className={styles.topRow}>
        <Card className={styles.summaryCard}>
          <div className={styles.summaryHeader}>
            <div className={styles.summaryLabel}>
              {payoutCardHeading(payoutRequest)}
            </div>
            {!payoutRequest && (
              <div className={styles.summaryRefreshNote}>Payout refreshes every couple of hours</div>
            )}
          </div>
          {forceLoadingStates ? (
            <>
              <Skeleton variant="text" width={100} height={28} />
              <Skeleton variant="text" width={140} />
            </>
          ) : payoutRequest?.status === "processing" ? (
            <>
              <div className={`${styles.summaryValue} ${styles.blinkingValue}`}>
                ${payoutRequest.amount.toLocaleString()}
              </div>
              <div className={styles.payoutActionRow}>
                <Button variant="primary" size="sm" disabled>
                  <CircleNotch size={14} weight="bold" className={styles.spinnerIcon} />
                  Processing…
                </Button>
              </div>
            </>
          ) : payoutRequest?.status === "paid" ? (
            <>
              <div className={styles.summaryValue}>${payoutRequest.amount.toLocaleString()}</div>
              <div className={styles.payoutActionRow}>
                <Button variant="secondary" size="sm" onClick={handleClosePayoutCard}>
                  Close
                </Button>
                <Button variant="accent" size="sm">
                  View transaction
                </Button>
              </div>
            </>
          ) : payoutRequest?.status === "failed" ? (
            <>
              <div className={`${styles.summaryValue} ${styles.errorValue}`}>
                ${payoutRequest.amount.toLocaleString()}
              </div>
              <div className={styles.summarySubDanger}>
                Something went wrong. Try requesting the payout again.
              </div>
              <div className={styles.payoutActionRow}>
                <Button variant="secondary" size="sm" onClick={handleClosePayoutCard}>
                  Close
                </Button>
              </div>
            </>
          ) : (
            <>
              <div className={styles.summaryValue}>
                {nextPayout ? `$${nextPayout.amount.toLocaleString()}` : "—"}
              </div>
              {!walletAddress ? (
                <div className={styles.summarySubDanger}>Payout method not set</div>
              ) : nextPayout ? (
                <div className={styles.payoutActionRow}>
                  <Button
                    variant="primary"
                    size="sm"
                    disabled={nextPayout.amount < 20}
                    onClick={handleRequestPayout}
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
          <PayoutMethodPanel walletAddress={walletAddress} onOpenModal={() => setModalOpen(true)} />
        </Card>
      </div>

      <div>
        <div className={styles.sectionTitle}>Payout history</div>
        <HistoryTable type="payout" entries={payouts} loading={forceLoadingStates} />
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
