import type { TrendGranularity } from "@/components/ui/RangeFilter";
import type { TrendDataset, TrendSeries } from "@/components/ui/TrendChart";
import type { TrendGranularityData } from "./mock-data";

/**
 * Wraps one metric's per-granularity values in the `{ xLabels, series }` shape
 * TrendChart expects, so pages don't hand-roll it (and hand-cast it) each time.
 *
 * `scale` proportionally resizes the shared app-wide dataset — Campaign Detail
 * uses it to derive a single campaign's curve from the reference totals.
 */
export function buildTrendData(
  source: Record<TrendGranularity, TrendGranularityData>,
  series: Omit<TrendSeries, "values">,
  scale = 1
): Record<TrendGranularity, TrendDataset> {
  const datasetFor = (granularity: TrendGranularity): TrendDataset => ({
    xLabels: source[granularity].xLabels,
    series: [
      {
        ...series,
        values: source[granularity].values.map((value) => Math.round(value * scale)),
      },
    ],
  });

  return {
    daily: datasetFor("daily"),
    weekly: datasetFor("weekly"),
    monthly: datasetFor("monthly"),
  };
}
