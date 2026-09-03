"use client";

import { ReactNode, useState } from "react";
import { Wallet, Bank, CircleNotch } from "@phosphor-icons/react";
import { DashboardShell } from "@/components/dashboard-shell";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Radio } from "@/components/ui/Radio";
import { WalletAddressModal } from "@/components/ui/WalletAddressModal";
import { SwitchPayoutMethodModal } from "@/components/ui/SwitchPayoutMethodModal";
import { HistoryTable } from "@/components/ui/HistoryTable";
import { Skeleton } from "@/components/ui/Skeleton";
import { useDemoState, type PayoutMethod } from "@/components/demo-state";
import { mockPayouts, mockStripeAccountNumber } from "@/lib/mock-data";
import styles from "./earnings.module.css";

function truncateAddress(address: string) {
  if (address.length <= 8) return address;
  return `${address.slice(0, 3)}…${address.slice(-3)}`;
}

function PayoutMethodSection({
  icon,
  label,
  connected,
  showRadio,
  active,
  onSelectActive,
  buttonLabel,
  buttonVariant,
  onButtonClick,
}: {
  icon: ReactNode;
  label: string;
  connected: boolean;
  showRadio: boolean;
  active: boolean;
  onSelectActive: () => void;
  buttonLabel: string;
  buttonVariant: "primary" | "secondary";
  onButtonClick: () => void;
}) {
  // Only a connected method can actually be "selected" — an unconnected one
  // is always shown muted, even if it happens to match the stored preference.
  const selected = connected && active;
  return (
    <div
      className={styles.methodSection}
      data-selected={selected}
      data-clickable={showRadio}
      onClick={() => {
        if (showRadio) onSelectActive();
      }}
    >
      <div className={styles.methodSectionHeader}>
        <div className={styles.payoutRow}>
          <div className={styles.methodIcon}>{icon}</div>
          <span>{label}</span>
        </div>
        {showRadio && (
          <Radio
            checked={active}
            onCheckedChange={() => onSelectActive()}
            className={styles.methodRadio}
          />
        )}
      </div>
      <Button
        variant={buttonVariant}
        size="sm"
        onClick={(e) => {
          e.stopPropagation();
          onButtonClick();
        }}
      >
        {buttonLabel}
      </Button>
    </div>
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
      return null;
  }
}

export default function EarningsPage() {
  const {
    forceLoadingStates,
    walletAddress,
    setWalletAddress,
    stripeAccountNumber,
    setStripeAccountNumber,
    setPayoutMethod,
    effectivePayoutMethod,
    lowPayout,
    triggerTransactionErrors,
  } = useDemoState();
  const [modalOpen, setModalOpen] = useState(false);
  const [switchTarget, setSwitchTarget] = useState<PayoutMethod | null>(null);
  const [payouts, setPayouts] = useState(() =>
    mockPayouts.filter((p) => p.status !== "Scheduled")
  );
  const scheduledPayout = useScheduledPayout();

  // Testing toggle forces the amount below the $20 minimum without touching the mock data.
  const nextPayout =
    scheduledPayout && lowPayout ? { ...scheduledPayout, amount: 15 } : scheduledPayout;

  const [payoutRequest, setPayoutRequest] = useState<PayoutRequest | null>(null);

  // Both sections always show (including "not set"/"not connected" states) —
  // a radio choice only makes sense once both methods are actually connected.
  const showRadios = !!walletAddress && !!stripeAccountNumber;

  const handleRequestSwitch = (method: PayoutMethod) => {
    if (method === effectivePayoutMethod) return;
    setSwitchTarget(method);
  };

  const handleRequestPayout = () => {
    if (effectivePayoutMethod !== "wallet") return;
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

  const heading = payoutCardHeading(payoutRequest);

  return (
    <DashboardShell
      activeKey="earnings"
      pageTitle="Earnings"
      pageDescription="Your payout method and payout history."
    >
      <div className={styles.topRow}>
        <div className={`${styles.payoutColumn} ${styles.balanceColumn}`}>
          <div className={styles.cardHeading}>Payout balance</div>
          <Card className={styles.summaryCard}>
            {heading && <div className={styles.summaryLabel}>{heading}</div>}
            {!payoutRequest && (
              <span className={styles.summaryRefreshNote}>Refreshes every couple of hours</span>
            )}
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
                {(effectivePayoutMethod === "wallet" && !walletAddress) ||
                (effectivePayoutMethod === "stripe" && !stripeAccountNumber) ? (
                  <div className={styles.summarySubDanger}>Payout method not set</div>
                ) : !nextPayout ? (
                  <div className={styles.summarySub}>No payout scheduled yet.</div>
                ) : effectivePayoutMethod === "wallet" ? (
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
                  <div className={styles.summarySub}>Payouts every 15 days. $20 minimum.</div>
                )}
              </>
            )}
          </Card>
        </div>

        <div className={`${styles.payoutColumn} ${styles.preferredColumn}`}>
          <div className={styles.cardHeading}>Preferred payout</div>
          <Card className={styles.payoutCard} data-tour="tour-payout-method">
            <div className={styles.methodsRow}>
              <PayoutMethodSection
                icon={<Wallet size={20} weight="bold" />}
                label={walletAddress ? truncateAddress(walletAddress) : "EVM wallet not set"}
                connected={!!walletAddress}
                showRadio={showRadios}
                active={effectivePayoutMethod === "wallet"}
                onSelectActive={() => handleRequestSwitch("wallet")}
                buttonLabel={walletAddress ? "Change address" : "Setup"}
                buttonVariant={walletAddress ? "secondary" : "primary"}
                onButtonClick={() => setModalOpen(true)}
              />

              <PayoutMethodSection
                icon={<Bank size={20} weight="bold" />}
                label={stripeAccountNumber ?? "Stripe not connected"}
                connected={!!stripeAccountNumber}
                showRadio={showRadios}
                active={effectivePayoutMethod === "stripe"}
                onSelectActive={() => handleRequestSwitch("stripe")}
                buttonLabel={stripeAccountNumber ? "Edit" : "Connect Stripe"}
                buttonVariant={stripeAccountNumber ? "secondary" : "primary"}
                onButtonClick={() => {
                  // No modal: connecting just sets the default account; editing is a no-op.
                  if (!stripeAccountNumber) setStripeAccountNumber(mockStripeAccountNumber);
                }}
              />
            </div>
          </Card>
        </div>
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

      <SwitchPayoutMethodModal
        open={switchTarget !== null}
        target={switchTarget}
        onCancel={() => setSwitchTarget(null)}
        onConfirm={() => {
          if (switchTarget) setPayoutMethod(switchTarget);
          setSwitchTarget(null);
        }}
      />
    </DashboardShell>
  );
}
