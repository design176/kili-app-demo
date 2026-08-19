"use client";

import { useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { CurrencyDollar, Eye, Cursor, Coins, ChartBar, Percent, Rocket } from "@phosphor-icons/react";
import { DashboardShell } from "@/components/dashboard-shell";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Divider } from "@/components/ui/Divider";
import { KPISmallStrip } from "@/components/ui/KPISmallStrip";
import { TrendChart } from "@/components/ui/TrendChart";
import { EmptyState } from "@/components/ui/EmptyState";
import type { TrendGranularity } from "@/components/ui/RangeFilter";
import { FormField } from "@/components/ui/FormField";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { DatePicker, type DateRange } from "@/components/ui/DatePicker";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { mockCampaigns, spendByGranularity, impressionsTotalByGranularity } from "@/lib/mock-data";
import { formatCompactCurrency, formatCompactNumber } from "@/lib/format";
import styles from "./detail.module.css";

const statusTone = {
  Draft: "neutral",
  Active: "success",
  Paused: "warning",
  Ended: "neutral",
  Archived: "danger",
} as const;

const granularities = ["daily", "weekly", "monthly"] as const;
/** The reference dataset's default 6-month window (Jul–Dec) sums to 4,200 — this scales it to match each campaign's own spend KPI. */
const REFERENCE_SPEND_TOTAL = 4200;
/** The reference impressions dataset's default 6-month window (Jul–Dec) sums to 333,800 — this scales it to match each campaign's own impressions KPI. */
const REFERENCE_IMPRESSIONS_TOTAL = 333800;

export default function CampaignDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const campaign = useMemo(
    () => mockCampaigns.find((c) => c.id === params.id) ?? mockCampaigns[0],
    [params.id]
  );

  const [status, setStatus] = useState(campaign.status);
  const [heading, setHeading] = useState(`${campaign.name} — headline`);
  const [body, setBody] = useState("Normal text, plus inline hyperlinks.");
  const [ctaLink, setCtaLink] = useState("example.com");
  const [budget, setBudget] = useState(String(campaign.budget));
  const [dates, setDates] = useState<DateRange>({
    from: new Date(2026, 0, 1),
    to: new Date(2026, 8, 30),
  });
  const [confirmArchive, setConfirmArchive] = useState(false);
  const [confirmSave, setConfirmSave] = useState(false);
  const [spendGranularity, setSpendGranularity] = useState<TrendGranularity>("monthly");
  const [impressionsGranularity, setImpressionsGranularity] = useState<TrendGranularity>("monthly");
  const isFreshlyLaunched =
    status !== "Draft" && campaign.spend === 0 && campaign.impressions === 0;

  const spendScale = campaign.spend > 0 ? campaign.spend / REFERENCE_SPEND_TOTAL : 0;
  const spendData = Object.fromEntries(
    granularities.map((g) => [
      g,
      {
        xLabels: spendByGranularity[g].xLabels,
        series: [
          {
            key: "spend",
            label: "Spend",
            color: "var(--color-brand)",
            values: spendByGranularity[g].values.map((v) => Math.round(v * spendScale)),
          },
        ],
      },
    ])
  ) as Record<TrendGranularity, { xLabels: string[]; series: { key: string; label: string; color: string; values: number[] }[] }>;

  const impressionsScale =
    campaign.impressions > 0 ? campaign.impressions / REFERENCE_IMPRESSIONS_TOTAL : 0;
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
            values: impressionsTotalByGranularity[g].values.map((v) => Math.round(v * impressionsScale)),
          },
        ],
      },
    ])
  ) as Record<TrendGranularity, { xLabels: string[]; series: { key: string; label: string; color: string; values: number[] }[] }>;

  return (
    <DashboardShell
      activeKey="campaigns"
      pageTitle={campaign.name}
      pageDescription="Edit ad content, budget, and schedule for this campaign."
      breadcrumb="Campaigns"
      onBack={() => router.push("/campaigns")}
    >
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <Badge tone={statusTone[status]}>{status}</Badge>
        </div>
        <div className={styles.headerActions}>
          {status !== "Ended" && status !== "Archived" && (
            <Button
              variant="secondary"
              onClick={() => setStatus((s) => (s === "Paused" ? "Active" : "Paused"))}
            >
              {status === "Paused" ? "Resume" : "Pause"}
            </Button>
          )}
          {status !== "Ended" && status !== "Archived" && (
            <Button variant="destructive" onClick={() => setConfirmArchive(true)}>
              Archive
            </Button>
          )}
        </div>
      </div>

      <KPISmallStrip
        items={[
          {
            icon: <CurrencyDollar size={14} weight="bold" />,
            tooltip: "Total amount spent on this campaign, this period.",
            label: "Spend",
            value: `$${campaign.spend.toLocaleString()}`,
          },
          {
            icon: <Eye size={14} weight="bold" />,
            tooltip: "How many times the ad was shown.",
            label: "Impressions",
            value: campaign.impressions.toLocaleString(),
          },
          {
            icon: <Cursor size={14} weight="bold" />,
            tooltip: "How many times people clicked the ad.",
            label: "Clicks",
            value: campaign.clicks.toLocaleString(),
          },
          {
            icon: <Coins size={14} weight="bold" />,
            tooltip: "Average cost for each click.",
            label: "CPC",
            value: `$${campaign.cpc.toFixed(2)}`,
          },
          {
            icon: <ChartBar size={14} weight="bold" />,
            tooltip: "Cost for every thousand impressions.",
            label: "CPM",
            value: `$${campaign.cpm.toFixed(2)}`,
          },
          {
            icon: <Percent size={14} weight="bold" />,
            tooltip: "Percentage of impressions that turned into clicks.",
            label: "CTR",
            value: `${campaign.ctr}%`,
          },
        ]}
      />

      <div className={styles.lowerRow}>
        <div className={styles.mainCol}>
          {isFreshlyLaunched ? (
            <div className={styles.emptyChartWrap}>
              <EmptyState
                icon={<Rocket size={20} weight="bold" />}
                title="Your campaign is live"
                description="We'll start showing tracked data in a couple of hours."
              />
            </div>
          ) : (
            <>
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
            </>
          )}
        </div>

        <div className={styles.sideCol}>
          <Card>
            <div className={styles.formTitle}>Edit campaign</div>
            <Divider className={styles.formDivider} />
            <div className={styles.form}>
              <FormField label="Campaign heading" required>
                <Input value={heading} onChange={(e) => setHeading(e.target.value)} />
              </FormField>
              <FormField label="Body text" required>
                <Textarea value={body} onChange={(e) => setBody(e.target.value)} />
              </FormField>
              <FormField label="CTA link">
                <Input value={ctaLink} onChange={(e) => setCtaLink(e.target.value)} />
              </FormField>
              <FormField label="Total budget" required>
                <Input value={budget} onChange={(e) => setBudget(e.target.value)} />
              </FormField>
              <FormField label="Start & end date" required>
                <DatePicker mode="range" value={dates} onChange={setDates} />
              </FormField>
              <div className={styles.footer}>
                <Button variant="primary" onClick={() => setConfirmSave(true)}>
                  Save changes
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <ConfirmDialog
        open={confirmArchive}
        title={`Archive "${campaign.name}"?`}
        description="This campaign will stop running and move to Archived. You can't undo this from here."
        confirmLabel="Archive"
        onCancel={() => setConfirmArchive(false)}
        onConfirm={() => {
          setStatus("Archived");
          setConfirmArchive(false);
        }}
      />

      <ConfirmDialog
        open={confirmSave}
        title="Save changes?"
        description="This updates the live campaign with your edits to the ad content, budget, and schedule."
        confirmLabel="Save"
        destructive={false}
        onCancel={() => setConfirmSave(false)}
        onConfirm={() => {
          console.log("Saved campaign edits");
          setConfirmSave(false);
        }}
      />
    </DashboardShell>
  );
}
