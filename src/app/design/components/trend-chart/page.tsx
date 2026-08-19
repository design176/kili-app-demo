'use client';

import { useState } from 'react';
import { TrendChart, type TrendDataset } from '@/components/ui/TrendChart';
import type { TrendGranularity } from '@/components/ui/RangeFilter';
import { Switch } from '@/components/ui/Switch';
import { StateToggle } from '../state-toggle';
import styles from '../demo.module.css';

const monthly: TrendDataset = {
  xLabels: [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ],
  series: [
    {
      key: 'spend',
      label: 'Spend',
      color: 'var(--color-brand)',
      values: [480, 520, 450, 560, 600, 540, 620, 680, 590, 750, 710, 850],
    },
  ],
};

function formatDayMonth(date: Date) {
  return `${date.getDate()} ${date.toLocaleString(undefined, { month: 'short' })}`;
}

function datesEnding(today: Date, count: number, stepDays: number) {
  return Array.from({ length: count }, (_, i) => {
    const d = new Date(today);
    d.setDate(d.getDate() - (count - 1 - i) * stepDays);
    return d;
  });
}

const TODAY = new Date(2026, 7, 19);

const weekly: TrendDataset = {
  xLabels: datesEnding(TODAY, 16, 7).map(formatDayMonth),
  series: [
    {
      key: 'spend',
      label: 'Spend',
      color: 'var(--color-brand)',
      values: [
        110, 125, 118, 140, 135, 150, 145, 160, 155, 170, 165, 180, 175, 190,
        185, 200,
      ],
    },
  ],
};

const daily: TrendDataset = {
  xLabels: datesEnding(TODAY, 30, 1).map(formatDayMonth),
  series: [
    {
      key: 'spend',
      label: 'Spend',
      color: 'var(--color-brand)',
      values: Array.from(
        { length: 30 },
        (_, i) => 18 + Math.round(5 * Math.sin(i / 1.8)),
      ),
    },
  ],
};

const data: Record<TrendGranularity, TrendDataset> = { daily, weekly, monthly };
const chartStyles = ['minimal', 'default'] as const;

export default function TrendChartPage() {
  const [chartStyle, setChartStyle] =
    useState<(typeof chartStyles)[number]>('default');
  const [granularity, setGranularity] = useState<TrendGranularity>('monthly');
  const [loading, setLoading] = useState(false);

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Trend Chart</h1>
      <p className={styles.subtitle}>
        Legend (only shown for 2+ series), a Range Filter (Daily/Weekly/Monthly
        — swaps the entire x-axis to that granularity&apos;s own dataset, and
        its label format: months for Monthly, &quot;date month&quot; for
        Weekly/Daily) plus secondary prev/next pan arrows that page through the
        underlying data, minimal or default (axes/gridlines + hatch-filled area)
        style. The line animates in on load and on every pan/granularity change.
        Y-axis ticks can be formatted via <code>valueFormatter</code> (e.g.
        currency). Hover the chart for a value tooltip on the line itself.
      </p>

      <div className={styles.section}>
        <div className={styles.sectionTitle}>Chart style</div>
        <div className={styles.row}>
          <StateToggle
            options={chartStyles}
            value={chartStyle}
            onChange={setChartStyle}
          />
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionTitle}>Loading</div>
        <div className={styles.row} style={{ alignItems: "center", gap: 8 }}>
          <Switch checked={loading} onCheckedChange={setLoading} />
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionTitle}>
          Advertiser Overview — Spend-over-time chart
        </div>
        <TrendChart
          title='Spend over time'
          data={data}
          chartStyle={chartStyle}
          windowSize={6}
          granularity={granularity}
          onGranularityChange={setGranularity}
          valueFormatter={(v) => `$${v}`}
          loading={loading}
        />
      </div>
    </div>
  );
}
