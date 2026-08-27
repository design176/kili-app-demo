import { ThemeModeToggle } from "@/components/ui/ThemeModeToggle";
import styles from "../demo.module.css";

export default function ThemeModeTogglePage() {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Theme Mode Toggle</h1>
      <p className={styles.subtitle}>
        Icon-only 3-way segmented control — Sun (Light), Moon (Dark), Monitor
        (Auto/system). Built on Tabs&apos; track styling with real
        IconButtons, and drives <code>next-themes</code> directly (Auto uses
        the OS preference via the root layout&apos;s <code>enableSystem</code>).
        Lives in Settings under &quot;Appearance&quot; on both workspaces.
      </p>

      <div className={styles.section}>
        <div className={styles.sectionTitle}>Live</div>
        <ThemeModeToggle />
      </div>
    </div>
  );
}
