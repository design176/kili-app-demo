"use client";

import { useState } from "react";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import { IconButton } from "./IconButton";
import { Tooltip } from "./Tooltip";
import { RangeFilter, type TrendGranularity } from "./RangeFilter";
import { Skeleton } from "./Skeleton";
import styles from "./StackedBarChart.module.css";

const CHART_HEIGHT = 200;

export type StackedBarSeries = {
  key: string;
  label: string;
  color: string;
  values: number[];
};

export type StackedBarDataset = {
  xLabels: string[];
  series: StackedBarSeries[];
};

export type StackedBarChartProps = {
  title: string;
  /** Full underlying dataset per Range Filter granularity — switching granularity swaps the x-axis. */
  data: Record<TrendGranularity, StackedBarDataset>;
  /** How many bars are visible at once. Defaults to 6. */
  windowSize?: number;
  granularity: TrendGranularity;
  onGranularityChange: (granularity: TrendGranularity) => void;
  /** Formats y-axis tick values (e.g. as currency). Defaults to a compact K/M abbreviation. */
  valueFormatter?: (value: number) => string;
  loading?: boolean;
  className?: string;
};

const TICK_COUNT = 4;

function defaultFormatTick(value: number) {
  if (value >= 1000) return `${(value / 1000).toFixed(value % 1000 === 0 ? 0 : 1)}K`;
  return String(value);
}

export function StackedBarChart({
  title,
  data,
  windowSize = 6,
  granularity,
  onGranularityChange,
  valueFormatter,
  loading,
  className,
}: StackedBarChartProps) {
  const [hidden, setHidden] = useState<Set<string>>(new Set());
  const dataset = data[granularity];
  const maxOffset = Math.max(0, dataset.xLabels.length - windowSize);
  const [offset, setOffset] = useState(maxOffset);

  // Switching granularity swaps the whole x-axis, so jump back to the newest
  // window. Adjusting during render (rather than in an effect) is React's
  // recommended way to reset state in response to a prop change.
  const [renderedGranularity, setRenderedGranularity] = useState(granularity);
  if (granularity !== renderedGranularity) {
    setRenderedGranularity(granularity);
    setOffset(maxOffset);
  }

  const clampedOffset = Math.min(offset, maxOffset);

  const toggleSeries = (key: string) => {
    setHidden((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const windowXLabels = dataset.xLabels.slice(clampedOffset, clampedOffset + windowSize);
  const visibleSeries = dataset.series
    .filter((s) => !hidden.has(s.key))
    .map((s) => ({ ...s, values: s.values.slice(clampedOffset, clampedOffset + windowSize) }));

  const canPanPrev = clampedOffset > 0;
  const canPanNext = clampedOffset < maxOffset;
  const handlePan = (direction: -1 | 1) => {
    setOffset((o) => Math.min(maxOffset, Math.max(0, o + direction * windowSize)));
  };

  const totals = windowXLabels.map((_, i) =>
    visibleSeries.reduce((sum, s) => sum + (s.values[i] ?? 0), 0)
  );
  const maxTotal = Math.max(1, ...totals);
  const niceMax = Math.ceil(maxTotal / TICK_COUNT) * TICK_COUNT || 1;
  const ticks = Array.from({ length: TICK_COUNT + 1 }, (_, i) => niceMax - (niceMax / TICK_COUNT) * i);
  const formatTick = valueFormatter ?? defaultFormatTick;

  if (loading) {
    return (
      <div className={`${styles.wrap} ${className ?? ""}`}>
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <span className={styles.title}>{title}</span>
          </div>
        </div>
        <Skeleton variant="rect" height={CHART_HEIGHT} />
      </div>
    );
  }

  return (
    <div className={`${styles.wrap} ${className ?? ""}`}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <span className={styles.title}>{title}</span>
          <div className={styles.legend}>
            {dataset.series.map((s) => (
              <button
                key={s.key}
                type="button"
                className={`${styles.legendItem} ${
                  hidden.has(s.key) ? styles.legendItemHidden : ""
                }`}
                onClick={() => toggleSeries(s.key)}
              >
                <span
                  className={styles.dot}
                  style={{ background: hidden.has(s.key) ? "var(--color-text-disabled)" : s.color }}
                />
                {s.label}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.headerRight}>
          <RangeFilter value={granularity} onChange={onGranularityChange} />
          <div className={styles.rangeControls}>
            <Tooltip text="Previous period">
              <IconButton
                variant="secondary"
                size="sm"
                label="Previous period"
                onClick={() => handlePan(-1)}
                disabled={!canPanPrev}
              >
                <CaretLeft size={12} weight="bold" />
              </IconButton>
            </Tooltip>
            <Tooltip text="Next period">
              <IconButton
                variant="secondary"
                size="sm"
                label="Next period"
                onClick={() => handlePan(1)}
                disabled={!canPanNext}
              >
                <CaretRight size={12} weight="bold" />
              </IconButton>
            </Tooltip>
          </div>
        </div>
      </div>

      <div className={styles.chartArea}>
        <div className={styles.gridLines}>
          {ticks.map((tick, i) => (
            <div key={i} className={styles.gridRow}>
              <span className={styles.axisLabel}>{formatTick(Math.round(tick))}</span>
              <span className={styles.gridLine} />
            </div>
          ))}
        </div>

        <div className={styles.bars}>
          {windowXLabels.map((_, i) => (
            <div key={i} className={styles.barCol}>
              <div className={styles.bar}>
                {[...visibleSeries].reverse().map((s) => {
                  const value = s.values[i] ?? 0;
                  const heightPct = (value / niceMax) * 100;
                  return (
                    <div
                      key={s.key}
                      className={styles.segment}
                      style={{ height: `${heightPct}%`, background: s.color }}
                    />
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.xLabels}>
        {windowXLabels.map((label, i) => (
          <span key={i} className={styles.xLabel}>
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}
