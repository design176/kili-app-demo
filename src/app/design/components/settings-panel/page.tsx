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
        <div className={styles.sectionTitle}>What&apos;s in it</div>
        <ul style={{ fontSize: 13, color: "var(--color-text-muted)", lineHeight: 2, paddingLeft: 18 }}>
          <li><strong>Dark mode</strong> — same theme toggle as everywhere else.</li>
          <li><strong>New user</strong> — since auth is dummy (any 6-digit code works), this decides whether going through Login/Signup ends in the empty-onboarding path or a populated dashboard. Toggling it navigates straight to /login.</li>
          <li><strong>Dashboard</strong> — Advertiser/Platform. Advertiser and Platform live under separate route prefixes (<code>/advertiser/*</code>, <code>/platform/*</code>); this switcher jumps to the other workspace&apos;s Overview page.</li>
          <li><strong>Empty states</strong> — forces every page/component&apos;s empty state, independent of New user.</li>
          <li><strong>Loading states</strong> — forces every page&apos;s loading skeleton, independent of the other toggles.</li>
        </ul>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionTitle}>Try it</div>
        <p className={styles.sectionDesc}>
          Look at the bottom-right corner of your screen right now. Visit{" "}
          <code>/advertiser/overview</code> to see the Empty states toggle
          actually change what renders, or use the Dashboard switch to jump
          to <code>/platform/overview</code>.
        </p>
      </div>
    </div>
  );
}
