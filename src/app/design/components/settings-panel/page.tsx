import styles from "../demo.module.css";

export default function SettingsPanelPage() {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Settings Panel</h1>
      <p className={styles.subtitle}>
        Global, not embedded on this page — it&apos;s mounted once in the
        root layout, so it&apos;s the pink circular gear button fixed to the
        bottom-right corner on every page in this app, including this one.
      </p>

      <div className={styles.section}>
        <div className={styles.sectionTitle}>Settings tab</div>
        <ul style={{ fontSize: 13, color: "var(--color-text-muted)", lineHeight: 2, paddingLeft: 18 }}>
          <li><strong>Dark mode</strong> — same theme toggle as everywhere else.</li>
          <li><strong>New user</strong> — simulates a fresh signup: resets balance to $0 and clears all API keys. Doesn&apos;t navigate anywhere on its own — since auth is dummy (any 6-digit code works), visit Login yourself (Routes tab) to see the empty-onboarding path this flag drives.</li>
          <li><strong>Empty states</strong> — forces every page/component&apos;s empty state, independent of New user.</li>
          <li><strong>Loading states</strong> — forces every page&apos;s loading skeleton, independent of the other toggles.</li>
          <li><strong>Balance / API keys resets</strong> — two standalone actions (&quot;Reset to $0&quot;, &quot;Clear all&quot;) that wipe each independently of the New user flag, for when you just want one reset without the other.</li>
        </ul>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionTitle}>Routes tab</div>
        <p className={styles.sectionDesc}>
          A Settings/Routes segmented control sits at the top of the panel.
          Routes lists quick links, grouped as Dashboards
          (<code>/advertiser/overview</code>, <code>/platform/overview</code>),
          Auth (<code>/login</code>), and Design (Design home, IA,
          Components, Changelog) — a fast way to jump anywhere without
          re-running the login flow.
        </p>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionTitle}>Try it</div>
        <p className={styles.sectionDesc}>
          Look at the bottom-right corner of your screen right now. Flip to
          the Routes tab and jump straight to <code>/platform/overview</code>{" "}
          — no login step in between.
        </p>
      </div>
    </div>
  );
}
