"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import { motion } from "motion/react";
import { animate } from "motion";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import { IconButton } from "./IconButton";
import { RangeFilter, type TrendGranularity } from "./RangeFilter";
import styles from "./TrendChart.module.css";

export type TrendSeries = {
  key: string;
  label: string;
  color: string;
  values: number[];
};

export type TrendDataset = {
  xLabels: string[];
  series: TrendSeries[];
};

export type TrendChartProps = {
  title: string;
  /** Full underlying dataset per Range Filter granularity — switching granularity swaps the x-axis. */
  data: Record<TrendGranularity, TrendDataset>;
  chartStyle?: "minimal" | "default";
  /** How many points are visible at once. Defaults to 6. */
  windowSize?: number;
  granularity: TrendGranularity;
  onGranularityChange: (granularity: TrendGranularity) => void;
  /** Formats y-axis tick values and hover-tooltip values (e.g. as currency). Defaults to the raw number. */
  valueFormatter?: (value: number) => string;
  className?: string;
};

const WIDTH = 640;
const HEIGHT = 200;
const PADDING_LEFT_DEFAULT = 36;

function buildSmoothPath(points: { x: number; y: number }[]) {
  if (points.length < 2) return "";
  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i === 0 ? i : i - 1];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2 < points.length ? i + 2 : i + 1];
    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
  }
  return d;
}

function buildAreaPath(points: { x: number; y: number }[], height: number) {
  if (points.length < 2) return "";
  const line = buildSmoothPath(points);
  const first = points[0];
  const last = points[points.length - 1];
  return `${line} L ${last.x} ${height} L ${first.x} ${height} Z`;
}

export function TrendChart({
  title,
  data,
  chartStyle = "minimal",
  windowSize = 6,
  granularity,
  onGranularityChange,
  valueFormatter,
  className,
}: TrendChartProps) {
  const [hidden, setHidden] = useState<Set<string>>(new Set());
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const chartAreaRef = useRef<HTMLDivElement>(null);
  const dataset = data[granularity];
  const maxOffset = Math.max(0, dataset.xLabels.length - windowSize);
  const [offset, setOffset] = useState(maxOffset);

  useEffect(() => {
    setOffset(Math.max(0, data[granularity].xLabels.length - windowSize));
    setHoverIndex(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [granularity]);

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
  const windowedSeries = dataset.series.map((s) => ({
    ...s,
    values: s.values.slice(clampedOffset, clampedOffset + windowSize),
  }));
  const visibleSeries = windowedSeries.filter((s) => !hidden.has(s.key));

  // Animate the line/area smoothly from their current values to the new
  // window's values on pan/granularity change, instead of the whole shape
  // disappearing and redrawing.
  const targetValuesRef = useRef<Record<string, number[]>>({});
  const [displayValues, setDisplayValues] = useState<Record<string, number[]>>({});

  useEffect(() => {
    const nextTargets: Record<string, number[]> = {};
    windowedSeries.forEach((s) => {
      nextTargets[s.key] = s.values;
    });
    const fromValues = targetValuesRef.current;
    const isFirstRun = Object.keys(fromValues).length === 0;
    targetValuesRef.current = nextTargets;

    if (isFirstRun) {
      setDisplayValues(nextTargets);
      return;
    }

    const controls = animate(0, 1, {
      duration: 0.6,
      ease: "easeInOut",
      onUpdate: (progress) => {
        const interpolated: Record<string, number[]> = {};
        Object.keys(nextTargets).forEach((key) => {
          const from = fromValues[key] ?? nextTargets[key];
          const to = nextTargets[key];
          interpolated[key] = to.map((v, i) => {
            const f = from[i] ?? v;
            return f + (v - f) * progress;
          });
        });
        setDisplayValues(interpolated);
      },
    });

    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clampedOffset, granularity]);

  const renderSeries = visibleSeries.map((s) => ({
    ...s,
    values: displayValues[s.key] ?? s.values,
  }));

  const canPanPrev = clampedOffset > 0;
  const canPanNext = clampedOffset < maxOffset;
  const handlePan = (direction: -1 | 1) => {
    setOffset((o) => Math.min(maxOffset, Math.max(0, o + direction * windowSize)));
    setHoverIndex(null);
  };

  const paddingLeft = chartStyle === "default" ? PADDING_LEFT_DEFAULT : 0;
  const plotWidth = WIDTH - paddingLeft;

  const allValues = visibleSeries.flatMap((s) => s.values);
  const maxValue = allValues.length ? Math.max(...allValues) : 1;
  const rawMax = maxValue === 0 ? 4 : Math.ceil(maxValue / 4) * 4;
  const step = rawMax / 4;
  // Headroom: the plotted scale goes one step beyond the highest labeled
  // tick, so the line never touches the top edge and there's always a
  // visible gap above the highest number.
  const niceMax = rawMax + step;

  const toPoints = (values: number[]) =>
    values.map((v, i) => ({
      x: paddingLeft + (i / (values.length - 1 || 1)) * plotWidth,
      y: HEIGHT - (v / niceMax) * HEIGHT,
    }));

  // 5 evenly-spaced ticks, 0..niceMax — the top one is the "next value in
  // the progression" past rawMax, labeling the headroom the line never
  // reaches instead of leaving it blank.
  const ticks = [4, 3, 2, 1, 0].map((m) => Math.round((niceMax / 4) * m));
  const formatTick = valueFormatter ?? ((v: number) => String(v));

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (windowXLabels.length === 0) return;
    const rect = chartAreaRef.current?.getBoundingClientRect();
    if (!rect) return;
    const scale = rect.width / WIDTH;
    const svgX = (e.clientX - rect.left) / scale;
    const pxStep = plotWidth / (windowXLabels.length - 1 || 1);
    const idx = Math.round((svgX - paddingLeft) / pxStep);
    setHoverIndex(Math.min(windowXLabels.length - 1, Math.max(0, idx)));
  };

  const hoverPoints =
    hoverIndex !== null
      ? visibleSeries.map((s, i) => ({
          series: s,
          point: toPoints(renderSeries[i]?.values ?? s.values)[hoverIndex],
        }))
      : [];

  return (
    <div className={`${styles.wrap} ${className ?? ""}`}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <span className={styles.title}>{title}</span>
          {dataset.series.length > 1 && (
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
          )}
        </div>

        <div className={styles.headerRight}>
          <RangeFilter value={granularity} onChange={onGranularityChange} />
          <div className={styles.rangeControls}>
            <IconButton
              variant="secondary"
              size="lg"
              label="Previous period"
              onClick={() => handlePan(-1)}
              disabled={!canPanPrev}
            >
              <CaretLeft size={14} weight="bold" />
            </IconButton>
            <IconButton
              variant="secondary"
              size="lg"
              label="Next period"
              onClick={() => handlePan(1)}
              disabled={!canPanNext}
            >
              <CaretRight size={14} weight="bold" />
            </IconButton>
          </div>
        </div>
      </div>

      <div
        ref={chartAreaRef}
        className={styles.chartArea}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setHoverIndex(null)}
      >
        <svg
          className={styles.svg}
          viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
          preserveAspectRatio="none"
        >
          <defs>
            {visibleSeries.map((s) => (
              <pattern
                key={s.key}
                id={`hatch-${s.key}`}
                patternUnits="userSpaceOnUse"
                width="7"
                height="7"
                patternTransform="rotate(45)"
              >
                <line x1="0" y1="0" x2="0" y2="7" stroke={s.color} strokeWidth="1.2" strokeOpacity="0.55" />
              </pattern>
            ))}
          </defs>

          {chartStyle === "default" && (
            <>
              {ticks.map((tick, i) => {
                const y = HEIGHT - (tick / niceMax) * HEIGHT;
                return (
                  <line
                    key={i}
                    className={styles.gridLine}
                    x1={paddingLeft}
                    x2={WIDTH}
                    y1={y}
                    y2={y}
                  />
                );
              })}
            </>
          )}

          {hoverIndex !== null && (
            <line
              className={styles.hoverLine}
              x1={paddingLeft + (hoverIndex / (windowXLabels.length - 1 || 1)) * plotWidth}
              x2={paddingLeft + (hoverIndex / (windowXLabels.length - 1 || 1)) * plotWidth}
              y1={0}
              y2={HEIGHT}
            />
          )}

          {renderSeries.map((s) => {
            const points = toPoints(s.values);
            const linePath = buildSmoothPath(points);
            const areaPath = buildAreaPath(points, HEIGHT);

            return (
              <g key={s.key}>
                {chartStyle === "default" && (
                  <>
                    <motion.path
                      d={areaPath}
                      fill={s.color}
                      stroke="none"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.1 }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                    />
                    <motion.path
                      d={areaPath}
                      fill={`url(#hatch-${s.key})`}
                      stroke="none"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                    />
                  </>
                )}
                <motion.path
                  className={styles.line}
                  d={linePath}
                  stroke={s.color}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.7, ease: "easeInOut" }}
                />
              </g>
            );
          })}

          {hoverPoints.map(({ series: s, point }) => (
            <circle
              key={s.key}
              className={styles.hoverDot}
              cx={point.x}
              cy={point.y}
              r="4"
              fill={s.color}
            />
          ))}
        </svg>

        {chartStyle === "default" && (
          <div className={styles.axisLabels}>
            {ticks.map((tick, i) => {
              const y = HEIGHT - (tick / niceMax) * HEIGHT;
              return (
                <span
                  key={i}
                  className={styles.axisLabel}
                  style={{ top: `${(y / HEIGHT) * 100}%` }}
                >
                  {formatTick(tick)}
                </span>
              );
            })}
          </div>
        )}

        {hoverIndex !== null && hoverPoints.length > 0 && (
          <div
            className={styles.hoverBubble}
            style={{
              left: `${(hoverPoints[0].point.x / WIDTH) * 100}%`,
              top: `${(Math.min(...hoverPoints.map((h) => h.point.y)) / HEIGHT) * 100}%`,
            }}
          >
            <div className={styles.hoverBubbleLabel}>{windowXLabels[hoverIndex]}</div>
            {hoverPoints.map(({ series: s, point }) => (
              <div key={s.key} className={styles.hoverBubbleRow}>
                <span className={styles.hoverBubbleDot} style={{ background: s.color }} />
                <span>{s.label}</span>
                <span className={styles.hoverBubbleValue}>
                  {formatTick(s.values[hoverIndex] ?? 0)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className={styles.xLabels} style={{ paddingLeft }}>
        {windowXLabels.map((label, i) => (
          <span key={i} className={styles.xLabel}>
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}
