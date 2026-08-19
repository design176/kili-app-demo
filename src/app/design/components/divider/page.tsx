import { Divider } from "@/components/ui/Divider";
import styles from "../demo.module.css";

export default function DividerPage() {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Divider</h1>
      <p className={styles.subtitle}>
        A plain rule, horizontal or vertical. No states — nothing to toggle.
      </p>

      <div className={styles.section}>
        <div className={styles.sectionTitle}>Horizontal</div>
        <div style={{ width: 260 }}>
          <Divider />
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionTitle}>Vertical</div>
        <div style={{ display: "flex", height: 40, gap: 12 }}>
          <span>Left</span>
          <Divider orientation="vertical" />
          <span>Right</span>
        </div>
      </div>
    </div>
  );
}
