"use client";

import { HeartbeatIndicator } from '@/components/ui/HeartbeatIndicator';
import styles from '../demo.module.css';

const statuses = ['critical', 'warning', 'healthy'] as const;

export default function HeartbeatIndicatorPage() {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Heartbeat Indicator</h1>
      <p className={styles.subtitle}>
        A bordered status card with a pixel-block heart clipped to its own
        silhouette over an EKG line, a footer status row with a tone-colored
        icon badge, and a refresh button in the header. Healthy = live
        (green), warning = partially available (yellow), critical = not live
        (red, static line). The default/empty state is gray and fully
        static, with a flat line and no refresh button — for when no API
        keys have been created yet. The refreshing state looks like empty
        but with the heart and line fading in and out, no refresh button,
        and a spinning icon in the footer.
      </p>

      <div className={styles.section}>
        <div className={styles.sectionTitle}>States</div>
        <div className={styles.row}>
          {statuses.map((status) => (
            <HeartbeatIndicator key={status} status={status} onRefresh={() => {}} />
          ))}
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionTitle}>Default / empty state</div>
        <div className={styles.row}>
          <HeartbeatIndicator />
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionTitle}>Refreshing state</div>
        <div className={styles.row}>
          <HeartbeatIndicator status="refreshing" />
        </div>
      </div>
    </div>
  );
}
