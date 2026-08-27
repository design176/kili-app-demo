import type { Campaign } from "@/components/ui/CampaignTable";
import type { HistoryEntry, InvoiceStatus, PayoutStatus } from "@/components/ui/HistoryTable";
import type { ActivityEvent } from "@/components/ui/ActivityFeed";

/** Starting balance for a demo account — `demo-state` seeds `balance` from this. */
export const mockBalance = 1860.4;

export const mockCampaigns: Campaign[] = [
  {
    id: "camp_1",
    name: "Q4 launch",
    status: "Active",
    budget: 2000,
    spend: 1240,
    impressions: 84200,
    clicks: 1320,
    conversions: 120,
    cpc: 0.94,
    cpm: 14.73,
    ctr: 1.6,
    cpa: 10.33,
    endDate: new Date(2026, 8, 30),
  },
  {
    id: "camp_2",
    name: "Retargeting — trial users",
    status: "Active",
    budget: 1200,
    spend: 990,
    impressions: 62100,
    clicks: 980,
    conversions: 95,
    cpc: 1.01,
    cpm: 15.94,
    ctr: 1.58,
    cpa: 10.42,
    endDate: new Date(2026, 9, 15),
  },
  {
    id: "camp_3",
    name: "Brand awareness — spring",
    status: "Paused",
    budget: 800,
    spend: 640,
    impressions: 30100,
    clicks: 410,
    conversions: 35,
    cpc: 1.56,
    cpm: 21.26,
    ctr: 1.36,
    cpa: 18.29,
    endDate: new Date(2026, 10, 1),
  },
  {
    id: "camp_4",
    name: "Holiday promo 2025",
    status: "Ended",
    budget: 1500,
    spend: 1500,
    impressions: 92000,
    clicks: 1610,
    conversions: 140,
    cpc: 0.93,
    cpm: 16.3,
    ctr: 1.75,
    cpa: 10.71,
    endDate: new Date(2025, 11, 31),
  },
  {
    id: "camp_5",
    name: "Enterprise waitlist",
    status: "Draft",
    budget: 600,
    spend: 0,
    impressions: 0,
    clicks: 0,
    conversions: 0,
    cpc: 0,
    cpm: 0,
    ctr: 0,
    cpa: 0,
    endDate: new Date(2026, 11, 31),
  },
  {
    id: "camp_6",
    name: "Winter sale",
    status: "Active",
    budget: 900,
    spend: 0,
    impressions: 0,
    clicks: 0,
    conversions: 0,
    cpc: 0,
    cpm: 0,
    ctr: 0,
    cpa: 0,
    endDate: new Date(2026, 11, 15),
  },
];

export type Surface = {
  id: string;
  name: string;
  description: string;
  status: "active" | "inactive";
  icon: "claude-code" | "vscode" | "terminal";
  earned?: number;
};

export const mockSurfaces: Surface[] = [
  {
    id: "claude-code",
    name: "Claude Code",
    description: "View ads in Claude Code CLI in your terminal and VS Code, and get paid for views.",
    status: "inactive",
    icon: "claude-code",
  },
  {
    id: "vscode",
    name: "VS Code Extension",
    description: "View ads in your vs code while you code and pays you for views.",
    status: "active",
    icon: "vscode",
    earned: 324,
  },
  {
    id: "terminal",
    name: "Terminal",
    description: "View ads in your terminal while you work and get paid for views.",
    status: "inactive",
    icon: "terminal",
  },
];

export const mockInvoices: HistoryEntry<InvoiceStatus>[] = [
  { id: "inv_1", date: new Date(2026, 7, 1), amount: 500, status: "Paid" },
  { id: "inv_2", date: new Date(2026, 6, 1), amount: 500, status: "Paid" },
  { id: "inv_3", date: new Date(2026, 5, 1), amount: 300, status: "Refunded" },
  { id: "inv_4", date: new Date(2026, 4, 1), amount: 500, status: "Paid" },
  { id: "inv_5", date: new Date(2026, 3, 1), amount: 250, status: "Failed" },
];

export const mockActivityEvents: ActivityEvent[] = [
  { id: "act_1", type: "click", title: "18 new clicks on Q4 launch", time: "12m ago" },
  { id: "act_2", type: "visit", title: "42 new page visits on Retargeting — trial users", time: "1h ago" },
  { id: "act_3", type: "budget-exhausting", title: "Brand awareness — spring is running low on budget", description: "80% of budget spent", time: "2h ago" },
  { id: "act_4", type: "click", title: "9 new clicks on Retargeting — trial users", time: "4h ago" },
  { id: "act_5", type: "paused", title: "Brand awareness — spring was paused", time: "1d ago" },
  { id: "act_6", type: "visit", title: "126 new page visits on Q4 launch", time: "1d ago" },
  { id: "act_7", type: "launched", title: "Q4 launch was launched", time: "3d ago" },
  { id: "act_8", type: "ended", title: "Holiday promo 2025 ended", time: "5d ago" },
];

// Events Tracking KPI strip — shared with Pixel Setup's install-verification
// numbers so both pages agree.
export const mockPageVisits = "12,480";
export const mockConversions = "318";
export const mockCPA = "$5.84";

export const mockConversionEvents: ActivityEvent[] = [
  { id: "conv_1", type: "purchase", title: "$49.00 purchase on Q4 launch", time: "8m ago" },
  { id: "conv_2", type: "purchase", title: "$129.00 purchase on Retargeting — trial users", time: "45m ago" },
  { id: "conv_3", type: "purchase", title: "$19.00 purchase on Q4 launch", time: "2h ago" },
  { id: "conv_4", type: "purchase", title: "$79.00 purchase on Brand awareness — spring", time: "6h ago" },
  { id: "conv_5", type: "purchase", title: "$49.00 purchase on Q4 launch", time: "1d ago" },
  { id: "conv_6", type: "purchase", title: "$99.00 purchase on Holiday promo 2025", time: "1d ago" },
  { id: "conv_7", type: "purchase", title: "$29.00 purchase on Retargeting — trial users", time: "1d ago" },
  { id: "conv_8", type: "purchase", title: "$149.00 purchase on Q4 launch", time: "2d ago" },
  { id: "conv_9", type: "purchase", title: "$39.00 purchase on Brand awareness — spring", time: "2d ago" },
  { id: "conv_10", type: "purchase", title: "$59.00 purchase on Holiday promo 2025", time: "2d ago" },
  { id: "conv_11", type: "purchase", title: "$19.00 purchase on Q4 launch", time: "3d ago" },
  { id: "conv_12", type: "purchase", title: "$199.00 purchase on Retargeting — trial users", time: "3d ago" },
  { id: "conv_13", type: "purchase", title: "$49.00 purchase on Q4 launch", time: "4d ago" },
  { id: "conv_14", type: "purchase", title: "$89.00 purchase on Brand awareness — spring", time: "4d ago" },
  { id: "conv_15", type: "purchase", title: "$129.00 purchase on Holiday promo 2025", time: "5d ago" },
];

export const mockPayouts: HistoryEntry<PayoutStatus>[] = [
  { id: "po_1", date: new Date(2026, 8, 5), amount: 1240, status: "Scheduled" },
  { id: "po_2", date: new Date(2026, 7, 5), amount: 980, status: "Paid" },
  { id: "po_3", date: new Date(2026, 6, 5), amount: 1105, status: "Paid" },
  { id: "po_4", date: new Date(2026, 5, 5), amount: 860, status: "Paid" },
  { id: "po_5", date: new Date(2026, 4, 5), amount: 300, status: "Failed" },
];

export const monthLabels = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

/** Deterministic smooth-ish curve: base + linear growth + a sine wobble. */
function buildValues(count: number, base: number, amplitude: number, growth: number, seed = 0) {
  return Array.from({ length: count }, (_, i) =>
    Math.max(0, Math.round(base + growth * i + amplitude * Math.sin(i / 1.8 + seed)))
  );
}

// Monthly spend — the latest 6 months (Jul–Dec, the chart's default visible
// window) sum to 4,200, matching the Overview KPI strip's "$4.2K" Spend tile.
const monthlySpend = [480, 520, 450, 560, 600, 540, 620, 680, 590, 750, 710, 850];

function formatDayMonth(date: Date) {
  return `${date.getDate()} ${date.toLocaleString(undefined, { month: "short" })}`;
}

// Anchored to a fixed "today" so the mock dataset stays deterministic.
const TODAY = new Date(2026, 7, 19);

function datesEnding(today: Date, count: number, stepDays: number) {
  return Array.from({ length: count }, (_, i) => {
    const d = new Date(today);
    d.setDate(d.getDate() - (count - 1 - i) * stepDays);
    return d;
  });
}

const weeklyLabels = datesEnding(TODAY, 16, 7).map(formatDayMonth);
const weeklySpend = buildValues(16, 135, 28, 4.5, 0.4);
const dailyLabels = datesEnding(TODAY, 30, 1).map(formatDayMonth);
const dailySpend = buildValues(30, 19, 5, 0.4, 0.8);

export type TrendGranularityData = { xLabels: string[]; values: number[] };

/** Spend/Revenue-over-time chart data, keyed by Range Filter granularity. */
export const spendByGranularity: Record<"daily" | "weekly" | "monthly", TrendGranularityData> = {
  daily: { xLabels: dailyLabels, values: dailySpend },
  weekly: { xLabels: weeklyLabels, values: weeklySpend },
  monthly: { xLabels: monthLabels, values: monthlySpend },
};

type ImpressionCategory = { key: string; label: string; color: string; values: number[] };

const impressionCategoryBase: { key: string; label: string; color: string; monthly: number[] }[] = [
  {
    key: "search",
    label: "Search",
    color: "var(--color-chart-blue)",
    monthly: [18000, 19500, 17200, 21000, 24500, 22800, 26200, 28100, 25400, 29800, 27600, 32400],
  },
  {
    key: "display",
    label: "Display",
    color: "var(--color-chart-purple)",
    monthly: [9800, 10200, 9100, 11400, 12600, 11800, 13500, 14200, 12900, 15100, 14300, 16800],
  },
  {
    key: "native",
    label: "Native",
    color: "var(--color-chart-amber)",
    monthly: [5200, 5600, 4900, 6100, 6800, 6300, 7200, 7600, 6900, 8100, 7700, 9000],
  },
  {
    key: "video",
    label: "Video",
    color: "var(--color-chart-pink)",
    monthly: [3400, 3700, 3100, 4000, 4500, 4100, 4800, 5100, 4600, 5400, 5000, 6100],
  },
];

function scaleCategory(monthly: number[], points: number, factor: number, amplitude: number, seed: number) {
  const avg = (monthly.reduce((a, b) => a + b, 0) / monthly.length) * factor;
  return buildValues(points, avg, avg * amplitude, 0, seed);
}

export type ImpressionsGranularityData = { xLabels: string[]; series: ImpressionCategory[] };

/** Impressions breakdown chart data, keyed by Range Filter granularity. */
export const impressionsByGranularity: Record<"daily" | "weekly" | "monthly", ImpressionsGranularityData> = {
  monthly: {
    xLabels: monthLabels,
    series: impressionCategoryBase.map((c) => ({ key: c.key, label: c.label, color: c.color, values: c.monthly })),
  },
  weekly: {
    xLabels: weeklyLabels,
    series: impressionCategoryBase.map((c, i) => ({
      key: c.key,
      label: c.label,
      color: c.color,
      values: scaleCategory(c.monthly, 16, 1 / 4.33, 0.18, i),
    })),
  },
  daily: {
    xLabels: dailyLabels,
    series: impressionCategoryBase.map((c, i) => ({
      key: c.key,
      label: c.label,
      color: c.color,
      values: scaleCategory(c.monthly, 30, 1 / 30, 0.22, i + 10),
    })),
  },
};

function sumSeries(series: ImpressionCategory[], points: number) {
  return Array.from({ length: points }, (_, i) =>
    series.reduce((sum, s) => sum + (s.values[i] ?? 0), 0)
  );
}

/** Total impressions (all categories combined), keyed by Range Filter granularity. */
export const impressionsTotalByGranularity: Record<"daily" | "weekly" | "monthly", TrendGranularityData> = {
  daily: { xLabels: dailyLabels, values: sumSeries(impressionsByGranularity.daily.series, dailyLabels.length) },
  weekly: { xLabels: weeklyLabels, values: sumSeries(impressionsByGranularity.weekly.series, weeklyLabels.length) },
  monthly: { xLabels: monthLabels, values: sumSeries(impressionsByGranularity.monthly.series, monthLabels.length) },
};

function scaleWithJitter(values: number[], factor: number, jitter: number, seed: number) {
  return values.map((v, i) => Math.max(0, Math.round(v * factor + jitter * Math.sin(i / 1.7 + seed))));
}

/** Total clicks (derived from impressions at ~2.1% CTR), keyed by Range Filter granularity. */
export const clicksTotalByGranularity: Record<"daily" | "weekly" | "monthly", TrendGranularityData> = {
  daily: { xLabels: dailyLabels, values: scaleWithJitter(impressionsTotalByGranularity.daily.values, 0.021, 8, 3) },
  weekly: { xLabels: weeklyLabels, values: scaleWithJitter(impressionsTotalByGranularity.weekly.values, 0.021, 25, 3) },
  monthly: { xLabels: monthLabels, values: scaleWithJitter(impressionsTotalByGranularity.monthly.values, 0.021, 60, 3) },
};

const monthlyConversions = [22, 25, 20, 28, 30, 26, 31, 34, 29, 38, 35, 42];
const weeklyConversions = buildValues(16, 18, 5, 0.6, 1.2);
const dailyConversions = buildValues(30, 9, 3, 0.15, 1.6);

/** Conversions-over-time chart data (Events Tracking), keyed by Range Filter granularity. */
export const conversionsByGranularity: Record<"daily" | "weekly" | "monthly", TrendGranularityData> = {
  daily: { xLabels: dailyLabels, values: dailyConversions },
  weekly: { xLabels: weeklyLabels, values: weeklyConversions },
  monthly: { xLabels: monthLabels, values: monthlyConversions },
};

const monthlyPageVisits = [820, 890, 760, 980, 1050, 940, 1080, 1180, 1020, 1310, 1220, 1420];
const weeklyPageVisits = buildValues(16, 620, 140, 22, 0.7);
const dailyPageVisits = buildValues(30, 320, 70, 6, 0.3);

/** Page-visits-over-time chart data (Events Tracking), keyed by Range Filter granularity. */
export const pageVisitsByGranularity: Record<"daily" | "weekly" | "monthly", TrendGranularityData> = {
  daily: { xLabels: dailyLabels, values: dailyPageVisits },
  weekly: { xLabels: weeklyLabels, values: weeklyPageVisits },
  monthly: { xLabels: monthLabels, values: monthlyPageVisits },
};

