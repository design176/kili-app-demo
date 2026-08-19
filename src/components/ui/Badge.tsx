import type { HTMLAttributes } from "react";
import styles from "./Badge.module.css";

type Tone =
  | "neutral"
  | "brand"
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "purple"
  | "amber";

export type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  tone?: Tone;
  dot?: boolean;
};

export function Badge({
  tone = "neutral",
  dot,
  className,
  children,
  ...props
}: BadgeProps) {
  const classes = [styles.badge, styles[tone], className ?? ""]
    .filter(Boolean)
    .join(" ");

  return (
    <span className={classes} {...props}>
      {dot && <span className={styles.dot} />}
      {children}
    </span>
  );
}
