import type { ButtonHTMLAttributes } from "react";
import styles from "./Switch.module.css";

export type SwitchProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "onChange"
> & {
  checked: boolean;
  onCheckedChange?: (checked: boolean) => void;
  /** Demo-only: force a pseudo-class-like visual state without real interaction. */
  forceState?: "hover" | "focus";
};

export function Switch({
  checked,
  onCheckedChange,
  forceState,
  className,
  ...props
}: SwitchProps) {
  const classes = [styles.track, checked ? styles.on : "", className ?? ""]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      className={classes}
      data-force={forceState}
      onClick={() => onCheckedChange?.(!checked)}
      {...props}
    >
      <span className={styles.thumb} />
    </button>
  );
}
