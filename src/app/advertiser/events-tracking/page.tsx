"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, Target, Plug } from "@phosphor-icons/react";
import { DashboardShell } from "@/components/dashboard-shell";
import { Card } from "@/components/ui/Card";
import { KPIStrip } from "@/components/ui/KPIStrip";
import { TrendChart } from "@/components/ui/TrendChart";
import { ActivityFeed } from "@/components/ui/ActivityFeed";
import { EmptyState } from "@/components/ui/EmptyState";
import type { TrendGranularity } from "@/components/ui/RangeFilter";
import { useDemoState } from "@/components/demo-state";
import { mockPageVisits, mockConversions, mockConversionEvents, conversionsByGranularity, pageVisitsByGranularity } from "@/lib/mock-data";
import { buildTrendData } from "@/lib/chart-data";
import { formatCompactNumber } from "@/lib/format";
import styles from "./events-tracking.module.css";

export default function EventsTrackingPage() {
  const { isNewUser, forceEmptyStates, forceLoadingStates } = useDemoState();
  const router = useRouter();
  const isEmpty = forceEmptyStates || isNewUser;
  const [conversionsGranularity, setConversionsGranularity] = useState<TrendGranularity>("monthly");
  const [pageVisitsGranularity, setPageVisitsGranularity] = useState<TrendGranularity>("monthly");

  const conversionsData = buildTrendData(conversionsByGranularity, {
    key: "conversions",
    label: "Conversions",
    color: "var(--color-brand)",
  });

  const pageVisitsData = buildTrendData(pageVisitsByGranularity, {
    key: "pageVisits",
    label: "Page visits",
    color: "var(--color-chart-blue)",
  });

  return (
    <DashboardShell
      activeKey="events"
      pageTitle="Events Tracking"
      pageDescription="Page visits and conversions attributed to your Kili ads."
    >
      {forceLoadingStates ? (
        <>
          <KPIStrip
            loading
            tiles={[
              { icon: <Eye size={16} weight="bold" />, label: "Page visits", value: "" },
              { icon: <Target size={16} weight="bold" />, label: "Conversions", value: "" },
            ]}
          />
          <div className={styles.lowerRow}>
            <div className={styles.chartCol}>
              <Card>
                <TrendChart
                  title="Conversions over time"
                  chartStyle="default"
                  data={conversionsData}
                  valueFormatter={(v) => formatCompactNumber(v)}
                  granularity={conversionsGranularity}
                  onGranularityChange={setConversionsGranularity}
                  loading
                />
              </Card>
              <Card>
                <TrendChart
                  title="Page visits over time"
                  chartStyle="default"
                  data={pageVisitsData}
                  valueFormatter={(v) => formatCompactNumber(v)}
                  granularity={pageVisitsGranularity}
                  onGranularityChange={setPageVisitsGranularity}
                  loading
                />
              </Card>
            </div>
            <div className={styles.feedCol}>
              <Card className={styles.feedCard}>
                <ActivityFeed title="Events" events={[]} loading />
              </Card>
            </div>
          </div>
        </>
      ) : isEmpty ? (
        <div className={styles.emptyWrap}>
          <EmptyState
            icon={<Plug size={20} weight="bold" />}
            title="Set up your pixel to get started"
            description="Install the Kili pixel to start tracking page visits and conversions."
            primaryAction={{
              label: "Set up pixel",
              onClick: () => router.push("/advertiser/pixel-tracking"),
            }}
          />
        </div>
      ) : (
        <>
          <KPIStrip
            tiles={[
              {
                icon: <Eye size={16} weight="bold" />,
                label: "Page visits",
                value: mockPageVisits,
                description: "Visits to your site attributed to a Kili ad click.",
              },
              {
                icon: <Target size={16} weight="bold" />,
                label: "Conversions",
                value: mockConversions,
                description: "Visits that reached your defined conversion URL.",
              },
            ]}
          />
          <div className={styles.lowerRow}>
            <div className={styles.chartCol}>
              <Card>
                <TrendChart
                  title="Conversions over time"
                  chartStyle="default"
                  data={conversionsData}
                  valueFormatter={(v) => formatCompactNumber(v)}
                  granularity={conversionsGranularity}
                  onGranularityChange={setConversionsGranularity}
                />
              </Card>
              <Card>
                <TrendChart
                  title="Page visits over time"
                  chartStyle="default"
                  data={pageVisitsData}
                  valueFormatter={(v) => formatCompactNumber(v)}
                  granularity={pageVisitsGranularity}
                  onGranularityChange={setPageVisitsGranularity}
                />
              </Card>
            </div>
            <div className={styles.feedCol}>
              <Card className={styles.feedCard}>
                <ActivityFeed title="Events" events={mockConversionEvents} />
              </Card>
            </div>
          </div>
        </>
      )}
    </DashboardShell>
  );
}
