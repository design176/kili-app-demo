"use client";

import { useState } from "react";
import { StackedBarChart } from "@/components/ui/StackedBarChart";
import type { TrendGranularity } from "@/components/ui/RangeFilter";
import { Card } from "@/components/ui/Card";
import { impressionsByGranularity } from "@/lib/mock-data";
import styles from "../demo.module.css";

export default function StackedBarChartPage() {
  const [granularity, setGranularity] = useState<TrendGranularity>("monthly");

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Stacked Bar Chart</h1>
      <p className={styles.subtitle}>
        Legend (click a series to hide/show it), a Range Filter
        (Daily/Weekly/Monthly — swaps the entire x-axis to that granularity's
        own dataset) plus secondary prev/next pan arrows that page through a
        fixed-size window of the underlying data. Used for Overview and
        Campaign Detail's Impressions breakdown (Search/Display/Native/Video).
      </p>

      <div className={styles.section}>
        <div className={styles.sectionTitle}>Impressions</div>
        <Card>
          <StackedBarChart
            title="Impressions"
            data={impressionsByGranularity}
            windowSize={6}
            granularity={granularity}
            onGranularityChange={setGranularity}
          />
        </Card>
      </div>
    </div>
  );
}
