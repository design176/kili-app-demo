import { Rocket, PauseCircle, CheckCircle, Warning, Cursor, Eye } from "@phosphor-icons/react";
import styles from "./ActivityFeed.module.css";

export type ActivityEventType =
  | "launched"
  | "paused"
  | "ended"
  | "budget-exhausting"
  | "click"
  | "visit";

export type ActivityEvent = {
  id: string;
  type: ActivityEventType;
  title: string;
  description?: string;
  /** Pre-formatted relative time, e.g. "2h ago". */
  time: string;
};

export type ActivityFeedProps = {
  title?: string;
  events: ActivityEvent[];
  emptyMessage?: string;
  className?: string;
};

const eventMeta: Record<ActivityEventType, { icon: typeof Rocket; tone: "success" | "warning" | "neutral" | "info" }> = {
  launched: { icon: Rocket, tone: "success" },
  paused: { icon: PauseCircle, tone: "warning" },
  ended: { icon: CheckCircle, tone: "neutral" },
  "budget-exhausting": { icon: Warning, tone: "warning" },
  click: { icon: Cursor, tone: "success" },
  visit: { icon: Eye, tone: "info" },
};

export function ActivityFeed({
  title = "Activity",
  events,
  emptyMessage = "No recent activity.",
  className,
}: ActivityFeedProps) {
  return (
    <div className={`${styles.feed} ${className ?? ""}`}>
      <span className={styles.title}>{title}</span>
      {events.length === 0 ? (
        <div className={styles.empty}>{emptyMessage}</div>
      ) : (
        <div className={styles.list}>
          {events.map((event) => {
            const meta = eventMeta[event.type];
            const Icon = meta.icon;
            return (
              <div key={event.id} className={styles.row}>
                <span className={`${styles.iconBadge} ${styles[meta.tone]}`}>
                  <Icon size={14} weight="bold" />
                </span>
                <div className={styles.body}>
                  <span className={styles.rowTitle}>{event.title}</span>
                  {event.description && (
                    <span className={styles.description}>{event.description}</span>
                  )}
                </div>
                <span className={styles.time}>{event.time}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
