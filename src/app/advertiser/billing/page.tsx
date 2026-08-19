"use client";

import { useState } from "react";
import { CreditCard } from "@phosphor-icons/react";
import { DashboardShell } from "@/components/dashboard-shell";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { AddBalanceModal } from "@/components/ui/AddBalanceModal";
import { HistoryTable } from "@/components/ui/HistoryTable";
import { useDemoState } from "@/components/demo-state";
import { mockInvoices } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/format";
import styles from "./billing.module.css";

export default function BillingPage() {
  const { balance, addBalance } = useDemoState();
  const [addFundsOpen, setAddFundsOpen] = useState(false);

  return (
    <DashboardShell
      activeKey="billing"
      pageTitle="Billing"
      pageDescription="Your balance, payment method, and past invoices."
    >
      <div className={styles.topRow}>
        <Card className={styles.balanceCard}>
          <div className={styles.balanceLabel}>Current balance</div>
          <div className={styles.balanceValue}>{formatCurrency(balance)}</div>
          <Button variant="accent" onClick={() => setAddFundsOpen(true)}>
            Add balance
          </Button>
        </Card>

        <Card className={styles.paymentCard}>
          <div className={styles.balanceLabel}>Payment method</div>
          <div className={styles.paymentRow}>
            <CreditCard size={16} weight="bold" />
            <span>Visa ending in 4242</span>
          </div>
          <Button variant="secondary" onClick={() => console.log("Edit payment method")}>
            Edit
          </Button>
        </Card>
      </div>

      <div>
        <div className={styles.sectionTitle}>Invoices</div>
        <HistoryTable type="invoice" entries={mockInvoices} />
      </div>

      <AddBalanceModal
        open={addFundsOpen}
        onClose={() => setAddFundsOpen(false)}
        onConfirm={addBalance}
      />
    </DashboardShell>
  );
}
