import type { TextareaHTMLAttributes } from "react";
import styles from "./Textarea.module.css";

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  error?: boolean;
  /** Demo-only: force a pseudo-class-like visual state without real interaction. */
  forceState?: "hover" | "focus" | "error";
};

export function Textarea({
  error,
  forceState,
  className,
  ...props
}: TextareaProps) {
  const classes = [styles.textarea, error ? styles.error : "", className ?? ""]
    .filter(Boolean)
    .join(" ");

  return <textarea className={classes} data-force={forceState} {...props} />;
}
