'use client';

import { Plus } from '@phosphor-icons/react';
import { TopBar } from '@/components/ui/TopBar';
import { Button } from '@/components/ui/Button';
import styles from '../demo.module.css';

export default function TopBarPage() {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Top Bar</h1>
      <p className={styles.subtitle}>
        Page heading + description on the left, an optional <code>actions</code>{' '}
        slot on the right (e.g. Campaigns&apos; &quot;Create Campaign&quot;
        button lives here, on the same row as the heading — not floating above
        the table). The account menu moved to a footer pinned at the bottom of
        Sidebar Nav. A <code>breadcrumb</code> + <code>onBack</code> pair
        renders a back button and a &quot;Section / Page&quot; heading, for
        drill-in pages like a campaign&apos;s detail view.
      </p>

      <div className={styles.section}>
        <div className={styles.sectionTitle}>Without actions</div>
        <div
          style={{
            border: '1px solid var(--color-border)',
            borderRadius: 10,
            overflow: 'hidden',
          }}
        >
          <TopBar
            pageTitle='Overview'
            pageDescription='Spend, performance, and anything that needs your attention.'
          />
          <div style={{ height: 60, background: 'var(--color-bg-subtle)' }} />
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionTitle}>With actions</div>
        <div
          style={{
            border: '1px solid var(--color-border)',
            borderRadius: 10,
            overflow: 'hidden',
          }}
        >
          <TopBar
            pageTitle='Campaigns'
            pageDescription="Every campaign you've created, with live spend and performance."
            actions={
              <Button variant='accent'>
                <Plus size={14} weight='bold' />
                Create Campaign
              </Button>
            }
          />
          <div style={{ height: 60, background: 'var(--color-bg-subtle)' }} />
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionTitle}>With back button + breadcrumb</div>
        <div
          style={{
            border: '1px solid var(--color-border)',
            borderRadius: 10,
            overflow: 'hidden',
          }}
        >
          <TopBar
            pageTitle='Q4 launch'
            pageDescription='Edit ad content, budget, and schedule for this campaign.'
            breadcrumb='Campaigns'
            onBack={() => {}}
          />
          <div style={{ height: 60, background: 'var(--color-bg-subtle)' }} />
        </div>
      </div>
    </div>
  );
}
