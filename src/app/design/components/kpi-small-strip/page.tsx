import { Eye } from "@phosphor-icons/react/dist/ssr";
import { KPISmallStrip } from "@/components/ui/KPISmallStrip";
import { formatCompactNumber } from "@/lib/format";
import styles from "../demo.module.css";

export default function KPISmallStripPage() {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>KPI Small Strip</h1>
      <p className={styles.subtitle}>
        From{" "}
        <a
          href="https://www.figma.com/design/zIzP7ZqVck2dnUdtr3sFp3/Dashboard?node-id=16-116&m=dev"
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: "underline" }}
        >
          this Figma reference
        </a>
        . The most minimal of the three KPI variants — value + a small
        bordered icon on top, label below. No trend row at all. The icon is
        not a button — it&apos;s a static badge that shows a description
        tooltip on hover/focus (reuses the Tooltip atom&apos;s custom-trigger
        support).
      </p>

      <div className={styles.section}>
        <div className={styles.sectionTitle}>6 metrics, one card</div>
        <KPISmallStrip
          items={[
            { icon: <Eye size={14} weight="bold" />, tooltip: "How many times the ad was shown.", value: formatCompactNumber(182400), label: "Impressions" },
            { icon: <Eye size={14} weight="bold" />, tooltip: "How many times the ad was shown.", value: formatCompactNumber(182400), label: "Impressions" },
            { icon: <Eye size={14} weight="bold" />, tooltip: "How many times the ad was shown.", value: formatCompactNumber(182400), label: "Impressions" },
            { icon: <Eye size={14} weight="bold" />, tooltip: "How many times the ad was shown.", value: formatCompactNumber(182400), label: "Impressions" },
            { icon: <Eye size={14} weight="bold" />, tooltip: "How many times the ad was shown.", value: formatCompactNumber(182400), label: "Impressions" },
            { icon: <Eye size={14} weight="bold" />, tooltip: "How many times the ad was shown.", value: formatCompactNumber(182400), label: "Impressions" },
          ]}
        />
      </div>
    </div>
  );
}
