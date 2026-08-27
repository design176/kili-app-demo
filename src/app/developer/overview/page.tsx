"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plug, Coins, Eye, CursorClick, ChartLineUp } from "@phosphor-icons/react";
import { DashboardShell } from "@/components/dashboard-shell";
import { Card } from "@/components/ui/Card";
import { KPISmallStrip } from "@/components/ui/KPISmallStrip";
import { TrendChart } from "@/components/ui/TrendChart";
import type { TrendGranularity } from "@/components/ui/RangeFilter";
import { EmptyState } from "@/components/ui/EmptyState";
import { useDemoState } from "@/components/demo-state";
import { spendByGranularity, impressionsTotalByGranularity, clicksTotalByGranularity } from "@/lib/mock-data";
import { buildTrendData, SIDE_BY_SIDE_CHART_HEIGHT } from "@/lib/chart-data";
import { formatCompactCurrency, formatCompactNumber } from "@/lib/format";
import styles from "./overview.module.css";

export default function DeveloperOverviewPage() {
  const { isNewUser, forceEmptyStates, forceLoadingStates, developerTourStep } = useDemoState();
  const router = useRouter();
  const [spendGranularity, setSpendGranularity] = useState<TrendGranularity>("monthly");
  const [impressionsGranularity, setImpressionsGranularity] = useState<TrendGranularity>("monthly");
  const [clicksGranularity, setClicksGranularity] = useState<TrendGranularity>("monthly");
  // The walkthrough needs real-looking KPIs/charts to point at, so a genuinely
  // empty new-user account still shows dummy data while the tour is active.
  const tourActive = developerTourStep >= 0;
  const isEmpty = (forceEmptyStates || isNewUser) && !tourActive;

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

  const clicksData = buildTrendData(clicksTotalByGranularity, {
    key: "clicks",
    label: "Clicks",
    color: "var(--color-chart-purple)",
  });

  const impressionsAndClicksRow = (loading: boolean) => (
    <div className={styles.chartsRow}>
      <Card className={styles.chartsRowItem}>
        <TrendChart
          title="Impressions"
          chartStyle="default"
          data={impressionsData}
          valueFormatter={(v) => formatCompactNumber(v)}
          granularity={impressionsGranularity}
          onGranularityChange={setImpressionsGranularity}
          loading={loading}
          height={SIDE_BY_SIDE_CHART_HEIGHT}
        />
      </Card>
      <Card className={styles.chartsRowItem}>
        <TrendChart
          title="Clicks"
          chartStyle="default"
          data={clicksData}
          valueFormatter={(v) => formatCompactNumber(v)}
          granularity={clicksGranularity}
          onGranularityChange={setClicksGranularity}
          loading={loading}
          height={SIDE_BY_SIDE_CHART_HEIGHT}
        />
      </Card>
    </div>
  );

  return (
    <DashboardShell
      activeKey="overview"
      pageTitle="Overview"
      pageDescription="Revenue and impressions across your placements."
    >
      <div data-tour="tour-kpi-strip">
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
              icon: <CursorClick size={14} weight="bold" />,
              tooltip: "How many times an ad was clicked, across all surfaces.",
              label: "Clicks",
              value: isEmpty ? "0" : formatCompactNumber(3001),
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
                height={SIDE_BY_SIDE_CHART_HEIGHT}
              />
            </Card>
            {impressionsAndClicksRow(true)}
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
                label: "Go to Surfaces",
                onClick: () => router.push("/developer/surfaces"),
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
                height={SIDE_BY_SIDE_CHART_HEIGHT}
              />
            </Card>
            {impressionsAndClicksRow(false)}
          </div>
        </div>
      )}
    </DashboardShell>
  );
}
