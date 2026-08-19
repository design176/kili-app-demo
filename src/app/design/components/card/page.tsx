import { Card } from "@/components/ui/Card";
import styles from "../demo.module.css";

export default function CardPage() {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Card</h1>
      <p className={styles.subtitle}>
        Plain padded bordered box — no built-in header/title concept, callers
        put whatever they want inside. Used for Needs attention panel,
        Payout method setup, Billing.
      </p>

      <div className={styles.section}>
        <div className={styles.sectionTitle}>Example</div>
        <Card style={{ width: 280 }}>
          <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 4 }}>
            Payment method
          </div>
          <div style={{ fontSize: 13, color: "var(--color-text-muted)" }}>
            Visa ending in 4242
          </div>
        </Card>
      </div>
    </div>
  );
}
