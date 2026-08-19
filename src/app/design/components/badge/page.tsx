import { Badge } from "@/components/ui/Badge";
import styles from "../demo.module.css";

const tones = [
  "neutral",
  "brand",
  "success",
  "warning",
  "danger",
  "info",
  "purple",
  "amber",
] as const;

export default function BadgePage() {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Badge</h1>
      <p className={styles.subtitle}>
        Generic color tones, not hardcoded statuses — callers pick the tone
        per status (e.g. Draft → neutral, Active → success, Rejected →
        danger). No hover/active states — a badge is a label, not something
        you interact with, so there's no toggle here.
      </p>

      <div className={styles.section}>
        <div className={styles.sectionTitle}>Tones</div>
        <div className={styles.row}>
          {tones.map((tone) => (
            <Badge key={tone} tone={tone}>
              {tone}
            </Badge>
          ))}
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionTitle}>With dot</div>
        <div className={styles.row}>
          {tones.map((tone) => (
            <Badge key={tone} tone={tone} dot>
              {tone}
            </Badge>
          ))}
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionTitle}>Example usage — Campaign statuses</div>
        <div className={styles.row}>
          <Badge tone="neutral">Draft</Badge>
          <Badge tone="success">Active</Badge>
          <Badge tone="warning">Paused</Badge>
          <Badge tone="neutral">Ended</Badge>
          <Badge tone="danger">Rejected</Badge>
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionTitle}>Example usage — full status set</div>
        <div className={styles.row}>
          <Badge tone="warning">Pending</Badge>
          <Badge tone="info">In progress</Badge>
          <Badge tone="purple">Submitted</Badge>
          <Badge tone="amber">In review</Badge>
          <Badge tone="success">Success</Badge>
          <Badge tone="danger">Failed</Badge>
          <Badge tone="neutral">Expired</Badge>
        </div>
      </div>
    </div>
  );
}
