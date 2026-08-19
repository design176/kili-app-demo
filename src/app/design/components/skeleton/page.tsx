import { Skeleton } from "@/components/ui/Skeleton";
import styles from "../demo.module.css";

export default function SkeletonPage() {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Skeleton</h1>
      <p className={styles.subtitle}>
        Shimmering placeholder block — the primitive every data-bearing component composes
        internally for its <code>loading</code> state (KPI Tile, KPI Strip, KPI Small Strip,
        Table, Campaign Card Grid, Activity Feed, Trend Chart, Stacked Bar Chart). Driven globally
        by the Settings panel&apos;s &quot;Loading states&quot; toggle.
      </p>

      <div className={styles.section}>
        <div className={styles.sectionTitle}>Text</div>
        <div className={styles.row} style={{ flexDirection: "column", alignItems: "stretch", gap: 8, maxWidth: 240 }}>
          <Skeleton variant="text" width="100%" />
          <Skeleton variant="text" width="80%" />
          <Skeleton variant="text" width="60%" />
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionTitle}>Rect</div>
        <div className={styles.row}>
          <Skeleton variant="rect" width={160} height={90} />
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionTitle}>Circle</div>
        <div className={styles.row}>
          <Skeleton variant="circle" />
          <Skeleton variant="circle" width={48} height={48} />
        </div>
      </div>
    </div>
  );
}
