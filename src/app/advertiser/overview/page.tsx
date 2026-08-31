"use client";

import { useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { Megaphone, CurrencyDollar, Eye, Cursor, Percent, Wallet, Coins, ChartBar, HandCoins } from "@phosphor-icons/react";
import { DashboardShell } from "@/components/dashboard-shell";
import { Card } from "@/components/ui/Card";
import { KPISmallStrip } from "@/components/ui/KPISmallStrip";
import { TrendChart } from "@/components/ui/TrendChart";
import { ActivityFeed } from "@/components/ui/ActivityFeed";
import { CostBreakdownPills, CostBreakdownPanel } from "@/components/ui/CostBreakdown";
import type { TrendGranularity } from "@/components/ui/RangeFilter";
import { EmptyState } from "@/components/ui/EmptyState";
import { useDemoState } from "@/components/demo-state";
import { useIsMobile } from "@/lib/use-mobile";
import { spendByGranularity, impressionsTotalByGranularity, mockActivityEvents, mockCPA } from "@/lib/mock-data";
import { buildTrendData } from "@/lib/chart-data";
import { formatCompactCurrency, formatCompactNumber, formatCurrency } from "@/lib/format";
import styles from "./overview.module.css";

export default function AdvertiserOverviewPage() {
  const { isNewUser, forceEmptyStates, forceLoadingStates, balance } = useDemoState();
  const router = useRouter();
  const isMobile = useIsMobile();
  const [spendGranularity, setSpendGranularity] = useState<TrendGranularity>("monthly");
  const [impressionsGranularity, setImpressionsGranularity] = useState<TrendGranularity>("monthly");
  const isEmpty = forceEmptyStates || isNewUser;

  const spendData = buildTrendData(spendByGranularity, {
    key: "main",
    label: "Spend",
    color: "var(--color-brand)",
  });

  const impressionsData = buildTrendData(impressionsTotalByGranularity, {
    key: "impressions",
    label: "Impressions",
    color: "var(--color-chart-blue)",
  });

  type CostRow = { key: string; icon: ReactNode; tooltip: string; label: string; value: string };

  const costRows: CostRow[] = [
    {
      key: "cpc",
      icon: <Coins size={12} weight="bold" />,
      tooltip: "Average cost for each click.",
      label: "CPC",
      value: isEmpty ? "—" : "$1.36",
    },
    {
      key: "cpm",
      icon: <ChartBar size={12} weight="bold" />,
      tooltip: "Cost for every thousand impressions.",
      label: "CPM",
      value: isEmpty ? "—" : "$23.20",
    },
    {
      key: "cpa",
      icon: <HandCoins size={12} weight="bold" />,
      tooltip: "Average cost for each conversion.",
      label: "CPA",
      value: isEmpty ? "—" : mockCPA,
    },
  ];

  const kpiItems = [
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
      icon: <Percent size={14} weight="bold" />,
      tooltip: "Percentage of impressions that turned into clicks.",
      label: "CTR",
      value: isEmpty ? "—" : "1.7%",
    },
    ...(isMobile
      ? [
          {
            icon: <Wallet size={14} weight="bold" />,
            tooltip: "Your current account balance.",
            label: "Balance",
            value: isEmpty ? "$0" : formatCurrency(balance),
            fullWidth: true,
          },
        ]
      : []),
  ];

  return (
    <DashboardShell
      activeKey="overview"
      pageTitle="Overview"
      pageDescription="Spend and performance across your campaigns."
    >
      <div>
        <KPISmallStrip loading={forceLoadingStates} items={kpiItems} />
      </div>

      <CostBreakdownPills items={costRows} loading={forceLoadingStates} />

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
            <CostBreakdownPanel title="Spend breakdown" items={costRows} loading />
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
            <CostBreakdownPanel title="Spend breakdown" items={costRows} />
          </div>
        </div>
      )}
    </DashboardShell>
  );
}
