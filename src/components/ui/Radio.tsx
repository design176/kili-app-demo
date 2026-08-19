import type { InputHTMLAttributes } from "react";
import styles from "./Radio.module.css";

export type RadioProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type" | "onChange" | "checked"
> & {
  checked: boolean;
  onCheckedChange?: (checked: boolean) => void;
  label?: string;
  /** Demo-only: force a pseudo-class-like visual state without real interaction. */
  forceState?: "hover" | "focus";
};

export function Radio({
  checked,
  onCheckedChange,
  label,
  forceState,
  className,
  ...props
}: RadioProps) {
  return (
    <label className={`${styles.row} ${className ?? ""}`}>
      <span className={styles.control} data-checked={checked} data-force={forceState}>
        <input
          type="radio"
          checked={checked}
          onChange={(e) => onCheckedChange?.(e.target.checked)}
          className={styles.input}
          {...props}
        />
        <span className={styles.dot} />
      </span>
      {label && <span className={styles.label}>{label}</span>}
    </label>
  );
}
