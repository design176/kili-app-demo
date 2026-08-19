import { Megaphone, Plus, BookOpen } from "@phosphor-icons/react/dist/ssr";
import { EmptyState } from "@/components/ui/EmptyState";
import styles from "../demo.module.css";

export default function EmptyStatePage() {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Empty State</h1>
      <p className={styles.subtitle}>
        Icon in concentric halo rings, title, description, up to two Button
        actions. Copy is written per real context, not generic placeholder
        text.
      </p>

      <div className={styles.section}>
        <div className={styles.sectionTitle}>Campaign List — zero campaigns</div>
        <div style={{ border: "1px solid var(--color-border)", borderRadius: 10 }}>
          <EmptyState
            icon={<Megaphone size={20} weight="bold" />}
            title="No campaigns yet"
            description="Once you launch a campaign, it'll show up here with its spend and performance."
            secondaryAction={{
              label: "Read the guide",
              icon: <BookOpen size={14} weight="bold" />,
            }}
            primaryAction={{
              label: "Create Campaign",
              icon: <Plus size={14} weight="bold" />,
            }}
          />
        </div>
      </div>
    </div>
  );
}
