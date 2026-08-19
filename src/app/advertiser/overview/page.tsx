"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Megaphone, CurrencyDollar, Eye, Cursor, Coins, ChartBar, Percent } from "@phosphor-icons/react";
import { DashboardShell } from "@/components/dashboard-shell";
import { Card } from "@/components/ui/Card";
import { KPISmallStrip } from "@/components/ui/KPISmallStrip";
import { TrendChart } from "@/components/ui/TrendChart";
import { ActivityFeed } from "@/components/ui/ActivityFeed";
import type { TrendGranularity } from "@/components/ui/RangeFilter";
import { EmptyState } from "@/components/ui/EmptyState";
import { useDemoState } from "@/components/demo-state";
import { spendByGranularity, impressionsTotalByGranularity, mockActivityEvents } from "@/lib/mock-data";
import { formatCompactCurrency, formatCompactNumber } from "@/lib/format";
import styles from "./overview.module.css";

const granularities = ["daily", "weekly", "monthly"] as const;

export default function AdvertiserOverviewPage() {
  const { isNewUser, forceEmptyStates, forceLoadingStates } = useDemoState();
  const router = useRouter();
  const [spendGranularity, setSpendGranularity] = useState<TrendGranularity>("monthly");
  const [impressionsGranularity, setImpressionsGranularity] = useState<TrendGranularity>("monthly");
  const isEmpty = forceEmptyStates || isNewUser;

  const spendData = Object.fromEntries(
    granularities.map((g) => [
      g,
      {
        xLabels: spendByGranularity[g].xLabels,
        series: [
          {
            key: "main",
            label: "Spend",
            color: "var(--color-brand)",
            values: spendByGranularity[g].values,
          },
        ],
      },
    ])
  ) as Record<TrendGranularity, { xLabels: string[]; series: { key: string; label: string; color: string; values: number[] }[] }>;

  const impressionsData = Object.fromEntries(
    granularities.map((g) => [
      g,
      {
        xLabels: impressionsTotalByGranularity[g].xLabels,
        series: [
          {
            key: "impressions",
            label: "Impressions",
            color: "var(--color-chart-blue)",
            values: impressionsTotalByGranularity[g].values,
          },
        ],
      },
    ])
  ) as Record<TrendGranularity, { xLabels: string[]; series: { key: string; label: string; color: string; values: number[] }[] }>;

  return (
    <DashboardShell
      activeKey="overview"
      pageTitle="Overview"
      pageDescription="Spend and performance across your campaigns."
    >
      <div>
        <KPISmallStrip
          loading={forceLoadingStates}
          items={[
            {
              icon: <CurrencyDollar size={14} weight="bold" />,
              tooltip: "Total amount spent on the campaign, this period.",
              label: "Spend",
              value: isEmpty ? "$0" : formatCompactCurrency(4230),
            },
            {
              icon: <Eye size={14} weight="bold" />,
              tooltip: "How many times the ad was shown.",
              label: "Impressions",
              value: isEmpty ? "0" : formatCompactNumber(182400),
            },
            {
              icon: <Cursor size={14} weight="bold" />,
              tooltip: "How many times people clicked the ad.",
              label: "Clicks",
              value: isEmpty ? "0" : formatCompactNumber(3102),
            },
            {
              icon: <Coins size={14} weight="bold" />,
              tooltip: "Average cost for each click.",
              label: "CPC",
              value: isEmpty ? "—" : "$1.36",
            },
            {
              icon: <ChartBar size={14} weight="bold" />,
              tooltip: "Cost for every thousand impressions.",
              label: "CPM",
              value: isEmpty ? "—" : "$23.20",
            },
            {
              icon: <Percent size={14} weight="bold" />,
              tooltip: "Percentage of impressions that turned into clicks.",
              label: "CTR",
              value: isEmpty ? "—" : "1.7%",
            },
          ]}
        />
      </div>

      {forceLoadingStates ? (
        <div className={styles.lowerRow}>
          <div className={styles.mainCol}>
            <Card>
              <TrendChart
                title="Spend over time"
                chartStyle="default"
                data={spendData}
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

          <div className={styles.sideCol}>
            <Card>
              <ActivityFeed events={[]} loading />
            </Card>
          </div>
        </div>
      ) : isEmpty ? (
        <>
          <div className={styles.sectionTitle}>Spend over time</div>
          <div className={styles.emptyChartWrap}>
            <EmptyState
              icon={<Megaphone size={20} weight="bold" />}
              title="Nothing to show yet"
              description="Once you launch a campaign, your spend will show up here."
              primaryAction={{
                label: "Create Campaign",
                onClick: () => router.push("/advertiser/campaigns/new"),
              }}
            />
          </div>
        </>
      ) : (
        <div className={styles.lowerRow}>
          <div className={styles.mainCol}>
            <Card>
              <TrendChart
                title="Spend over time"
                chartStyle="default"
                data={spendData}
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

          <div className={styles.sideCol}>
            <Card>
              <ActivityFeed events={mockActivityEvents} />
            </Card>
          </div>
        </div>
      )}
    </DashboardShell>
  );
}
