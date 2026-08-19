import { HistoryTable, type HistoryEntry, type PayoutStatus, type InvoiceStatus } from "@/components/ui/HistoryTable";
import styles from "../demo.module.css";

const payouts: HistoryEntry<PayoutStatus>[] = [
  { id: "1", date: new Date(2026, 5, 1), amount: 980, status: "Paid" },
  { id: "2", date: new Date(2026, 6, 1), amount: 1240, status: "Paid" },
  { id: "3", date: new Date(2026, 7, 1), amount: 1560, status: "Scheduled" },
];

const invoices: HistoryEntry<InvoiceStatus>[] = [
  { id: "1", date: new Date(2026, 5, 3), amount: 2000, status: "Paid" },
  { id: "2", date: new Date(2026, 6, 3), amount: 3120, status: "Paid" },
  { id: "3", date: new Date(2026, 6, 20), amount: 400, status: "Refunded" },
];

export default function HistoryTablePage() {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>History Table</h1>
      <p className={styles.subtitle}>
        Table molecule configured two ways from one component — Platform
        Earnings (payouts) and Advertiser Billing (invoices). Always sorted
        latest → oldest by default, regardless of status (a Scheduled payout
        with a future date just naturally sorts to the top on its own —
        there&apos;s no special-cased reordering by status).
      </p>

      <div className={styles.section}>
        <div className={styles.sectionTitle}>Platform Earnings — Payouts</div>
        <HistoryTable type="payout" entries={payouts} />
      </div>

      <div className={styles.section}>
        <div className={styles.sectionTitle}>Advertiser Billing — Invoices</div>
        <HistoryTable type="invoice" entries={invoices} />
      </div>

      <div className={styles.section}>
        <div className={styles.sectionTitle}>Empty state</div>
        <HistoryTable type="payout" entries={[]} />
      </div>
    </div>
  );
}
