import { Rocket, PauseCircle, CheckCircle, Warning, Cursor, Eye, ShoppingBag } from "@phosphor-icons/react";
import { Skeleton } from "./Skeleton";
import styles from "./ActivityFeed.module.css";

const SKELETON_ROWS = 4;

export type ActivityEventType =
  | "launched"
  | "paused"
  | "ended"
  | "budget-exhausting"
  | "click"
  | "visit"
  | "purchase";

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
  loading?: boolean;
  className?: string;
};

const eventMeta: Record<ActivityEventType, { icon: typeof Rocket; tone: "success" | "warning" | "neutral" | "info" }> = {
  launched: { icon: Rocket, tone: "success" },
  paused: { icon: PauseCircle, tone: "warning" },
  ended: { icon: CheckCircle, tone: "neutral" },
  "budget-exhausting": { icon: Warning, tone: "warning" },
  click: { icon: Cursor, tone: "success" },
  visit: { icon: Eye, tone: "info" },
  purchase: { icon: ShoppingBag, tone: "success" },
};

export function ActivityFeed({
  title = "Activity",
  events,
  emptyMessage = "No recent activity.",
  loading,
  className,
}: ActivityFeedProps) {
  return (
    <div className={`${styles.feed} ${className ?? ""}`}>
      <span className={styles.title}>{title}</span>
      {loading ? (
        <div className={styles.list}>
          {Array.from({ length: SKELETON_ROWS }, (_, i) => (
            <div key={i} className={styles.row}>
              <Skeleton variant="circle" width={28} height={28} />
              <div className={styles.body}>
                <Skeleton variant="text" width="70%" />
              </div>
              <Skeleton variant="text" width={36} />
            </div>
          ))}
        </div>
      ) : events.length === 0 ? (
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
