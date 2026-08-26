"use client";

import { useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Plug, Coins, Eye, ChartLineUp } from "@phosphor-icons/react";
import { DashboardShell } from "@/components/dashboard-shell";
import { Card } from "@/components/ui/Card";
import { KPISmallStrip } from "@/components/ui/KPISmallStrip";
import { TrendChart } from "@/components/ui/TrendChart";
import type { TrendGranularity } from "@/components/ui/RangeFilter";
import { EmptyState } from "@/components/ui/EmptyState";
import { useDemoState } from "@/components/demo-state";
import { mockSurfaces, spendByGranularity, impressionsTotalByGranularity } from "@/lib/mock-data";
import { buildTrendData } from "@/lib/chart-data";
import { formatCompactCurrency, formatCompactNumber } from "@/lib/format";
import styles from "./detail.module.css";

export default function SurfaceDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { forceLoadingStates } = useDemoState();
  const surface = useMemo(
    () => mockSurfaces.find((s) => s.id === params.id) ?? mockSurfaces[0],
    [params.id]
  );
  const isInactive = surface.status !== "active";

  const [spendGranularity, setSpendGranularity] = useState<TrendGranularity>("monthly");
  const [impressionsGranularity, setImpressionsGranularity] = useState<TrendGranularity>("monthly");

  const revenueData = buildTrendData(spendByGranularity, {
    key: "main",
    label: "Revenue",
    color: "var(--color-brand)",
  });

  const impressionsData = buildTrendData(impressionsTotalByGranularity, {
    key: "impressions",
    label: "Impressions",
    color: "var(--color-chart-blue)",
  });

  return (
    <DashboardShell
      activeKey="surfaces"
      pageTitle={surface.name}
      pageDescription={surface.description}
      breadcrumb="Surfaces"
      onBack={() => router.push("/developer/surfaces")}
    >
      <div>
        <KPISmallStrip
          loading={forceLoadingStates}
          items={[
            {
              icon: <Coins size={14} weight="bold" />,
              tooltip: "Total money earned from ads shown on this surface, this period.",
              label: "Revenue",
              value: isInactive ? "$0" : formatCompactCurrency(surface.earned ?? 0),
            },
            {
              icon: <Eye size={14} weight="bold" />,
              tooltip: "How many times an ad was actually shown on this surface.",
              label: "Impressions",
              value: isInactive ? "0" : formatCompactNumber(142900),
            },
            {
              icon: <ChartLineUp size={14} weight="bold" />,
              tooltip: "Revenue per 1,000 impressions.",
              label: "eCPM",
              value: isInactive ? "—" : "$8.40",
            },
          ]}
        />
      </div>

      {isInactive ? (
        <>
          <div className={styles.sectionTitle}>Revenue over time</div>
          <div className={styles.emptyChartWrap}>
            <EmptyState
              icon={<Plug size={20} weight="bold" />}
              title="Not installed yet"
              description="Install this surface to start showing ads and earning."
            />
          </div>
        </>
      ) : (
        <div className={styles.lowerRow}>
          <div className={styles.mainCol}>
            <Card>
              <TrendChart
                title="Revenue over time"
                chartStyle="default"
                data={revenueData}
                valueFormatter={(v) => formatCompactCurrency(v)}
                granularity={spendGranularity}
                onGranularityChange={setSpendGranularity}
                loading={forceLoadingStates}
              />
            </Card>
            <Card>
              <TrendChart
                title="Impressions"
                chartStyle="default"
                data={impressionsData}
                valueFormatter={(v) => formatCompactNumber(v)}
                granularity={impressionsGranularity}
                onGranularityChange={setImpressionsGranularity}
                loading={forceLoadingStates}
              />
            </Card>
          </div>
        </div>
      )}
    </DashboardShell>
  );
}
