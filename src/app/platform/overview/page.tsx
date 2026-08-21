"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plug, Coins, Eye, ChartLineUp } from "@phosphor-icons/react";
import { DashboardShell } from "@/components/dashboard-shell";
import { Card } from "@/components/ui/Card";
import { KPISmallStrip } from "@/components/ui/KPISmallStrip";
import { TrendChart } from "@/components/ui/TrendChart";
import type { TrendGranularity } from "@/components/ui/RangeFilter";
import { EmptyState } from "@/components/ui/EmptyState";
import { useDemoState } from "@/components/demo-state";
import { spendByGranularity, impressionsTotalByGranularity } from "@/lib/mock-data";
import { buildTrendData } from "@/lib/chart-data";
import { formatCompactCurrency, formatCompactNumber } from "@/lib/format";
import styles from "./overview.module.css";

export default function PlatformOverviewPage() {
  const { isNewUser, forceEmptyStates, forceLoadingStates } = useDemoState();
  const router = useRouter();
  const [spendGranularity, setSpendGranularity] = useState<TrendGranularity>("monthly");
  const [impressionsGranularity, setImpressionsGranularity] = useState<TrendGranularity>("monthly");
  const isEmpty = forceEmptyStates || isNewUser;

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
      activeKey="overview"
      pageTitle="Overview"
      pageDescription="Revenue and impressions across your placements."
    >
      <div>
        <KPISmallStrip
          loading={forceLoadingStates}
          items={[
            {
              icon: <Coins size={14} weight="bold" />,
              tooltip: "Total money earned from ads shown, this period.",
              label: "Revenue",
              value: isEmpty ? "$0" : formatCompactCurrency(1890),
            },
            {
              icon: <Eye size={14} weight="bold" />,
              tooltip: "How many times an ad was actually shown in the product.",
              label: "Impressions",
              value: isEmpty ? "0" : formatCompactNumber(142900),
            },
            {
              icon: <ChartLineUp size={14} weight="bold" />,
              tooltip: "Revenue per 1,000 impressions.",
              label: "eCPM",
              value: isEmpty ? "—" : "$8.40",
            },
          ]}
        />
      </div>

      {forceLoadingStates ? (
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
                loading
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
                loading
              />
            </Card>
          </div>
        </div>
      ) : isEmpty ? (
        <>
          <div className={styles.sectionTitle}>Revenue over time</div>
          <div className={styles.emptyChartWrap}>
            <EmptyState
              icon={<Plug size={20} weight="bold" />}
              title="Nothing to show yet"
              description="Once you integrate and start earning, your revenue will show up here."
              primaryAction={{
                label: "Go to Integration",
                onClick: () => router.push("/platform/integration"),
              }}
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
              />
            </Card>
          </div>
        </div>
      )}
    </DashboardShell>
  );
}
