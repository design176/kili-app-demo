"use client";

import { CodeSimple, PlugsConnected } from "@phosphor-icons/react";
import { DashboardShell } from "@/components/dashboard-shell";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import styles from "./surfaces.module.css";

export default function SurfacesPage() {
  const vsCodeActive = true;

  return (
    <DashboardShell
      activeKey="surfaces"
      pageTitle="Surfaces"
      pageDescription="Where Kili ads show up across your product and tools."
    >
      <div>
        <div className={styles.sectionTitle}>Kili Surfaces</div>
        <div className={styles.cardGrid}>
          <Card className={styles.surfaceCard}>
            <span className={styles.surfaceIcon}>
              <CodeSimple size={16} weight="bold" />
            </span>
            <div className={styles.surfaceHead}>
              <span className={styles.surfaceName}>VS Code</span>
              <Badge tone={vsCodeActive ? "success" : "neutral"}>
                {vsCodeActive ? "Active" : "Inactive"}
              </Badge>
            </div>
            <Button variant="primary" size="sm" onClick={() => console.log("Install VS Code surface")}>
              Install
            </Button>
          </Card>
        </div>
      </div>

      <div>
        <div className={styles.sectionTitle}>Integrate your own surfaces</div>
        <div className={styles.emptyWrap}>
          <EmptyState
            icon={<PlugsConnected size={20} weight="bold" />}
            title="Coming soon"
            description="Bring Kili ads into your own product with a custom integration."
          />
        </div>
      </div>
    </DashboardShell>
  );
}
