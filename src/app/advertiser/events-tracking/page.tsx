"use client";

import { Target } from "@phosphor-icons/react";
import { DashboardShell } from "@/components/dashboard-shell";
import { EmptyState } from "@/components/ui/EmptyState";
import styles from "./events-tracking.module.css";

export default function EventsTrackingPage() {
  return (
    <DashboardShell
      activeKey="events"
      pageTitle="Events Tracking"
      pageDescription="Page visits and conversions attributed to your Kili ads."
    >
      <div className={styles.emptyWrap}>
        <EmptyState
          icon={<Target size={20} weight="bold" />}
          title="Coming soon"
          description="Events Tracking is on its way. Check back soon to see page visits and conversions attributed to your Kili ads."
        />
      </div>
    </DashboardShell>
  );
}
