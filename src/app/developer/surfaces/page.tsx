"use client";

import type { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { PlugsConnected } from "@phosphor-icons/react";
import { DashboardShell } from "@/components/dashboard-shell";
import { SurfaceCard } from "@/components/ui/SurfaceCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { mockSurfaces, type Surface } from "@/lib/mock-data";
import styles from "./surfaces.module.css";

const SURFACE_ICONS: Record<Surface["icon"], ReactNode> = {
  vscode: <img src="/vscode-icon.png" alt="" />,
  terminal: <img src="/terminal-icon.png" alt="" />,
};

export default function SurfacesPage() {
  const router = useRouter();

  return (
    <DashboardShell
      activeKey="surfaces"
      pageTitle="Surfaces"
      pageDescription="Where Kili ads show up across your product and tools."
    >
      <div>
        <div className={styles.sectionTitle}>Kili Surfaces</div>
        <div className={styles.cardGrid}>
          {mockSurfaces.map((surface) => (
            <SurfaceCard
              key={surface.id}
              icon={SURFACE_ICONS[surface.icon]}
              name={surface.name}
              description={surface.description}
              status={surface.status}
              earned={surface.earned}
              onAction={() =>
                surface.status === "active"
                  ? router.push(`/developer/surfaces/${surface.id}`)
                  : console.log(`Install ${surface.name} surface`)
              }
            />
          ))}
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
