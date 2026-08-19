'use client';

import { useState } from 'react';
import {
  RangeFilter,
  type TrendGranularity,
} from '@/components/ui/RangeFilter';
import styles from '../demo.module.css';

export default function RangeFilterPage() {
  const [value, setValue] = useState<TrendGranularity>('monthly');

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Range Filter</h1>
      <p className={styles.subtitle}>
        A compact trigger that opens a &quot;Range&quot; popover with
        Daily/Weekly/Monthly Radio options. Trend Chart&apos;s granularity
        control — replaces a full calendar date-range picker with a simpler
        single-choice filter.
      </p>

      <div className={styles.section}>
        <div className={styles.sectionTitle}>Try it</div>
        <div className={styles.row}>
          <RangeFilter value={value} onChange={setValue} />
        </div>
      </div>
    </div>
  );
}
