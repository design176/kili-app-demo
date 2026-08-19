import type { InputHTMLAttributes } from "react";
import styles from "./Input.module.css";

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  error?: boolean;
  /** Demo-only: force a pseudo-class-like visual state without real interaction. */
  forceState?: "hover" | "focus" | "error";
};

export function Input({ error, forceState, className, ...props }: InputProps) {
  const classes = [styles.input, error ? styles.error : "", className ?? ""]
    .filter(Boolean)
    .join(" ");

  return <input className={classes} data-force={forceState} {...props} />;
}
