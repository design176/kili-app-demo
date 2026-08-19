"use client";

import { useState } from "react";
import { ActivityFeed } from "@/components/ui/ActivityFeed";
import { Card } from "@/components/ui/Card";
import { Switch } from "@/components/ui/Switch";
import { mockActivityEvents } from "@/lib/mock-data";
import styles from "../demo.module.css";

export default function ActivityFeedPage() {
  const [loading, setLoading] = useState(false);

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Activity Feed</h1>
      <p className={styles.subtitle}>
        A passive, chronological log — not actionable alerts like Needs
        Attention Panel. Covers campaign lifecycle events (launched, paused,
        ended, budget exhausting) and pixel-tracking events (clicks, page
        visits), each with a tone-colored icon badge and a relative time.
      </p>

      <div className={styles.section}>
        <div className={styles.sectionTitle}>Loading</div>
        <div className={styles.row} style={{ alignItems: "center", gap: 8 }}>
          <Switch checked={loading} onCheckedChange={setLoading} />
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionTitle}>With events</div>
        <div style={{ maxWidth: 360 }}>
          <Card>
            <ActivityFeed events={mockActivityEvents} loading={loading} />
          </Card>
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionTitle}>Empty</div>
        <div style={{ maxWidth: 360 }}>
          <Card>
            <ActivityFeed events={[]} />
          </Card>
        </div>
      </div>
    </div>
  );
}
