import { forwardRef, type ButtonHTMLAttributes } from "react";
import styles from "./Button.module.css";

type Variant = "primary" | "secondary" | "ghost" | "destructive" | "accent";
type Size = "sm" | "md" | "lg" | "xl";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
  /** Demo-only: force a pseudo-class-like visual state without real interaction. */
  forceState?: "hover" | "active";
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = "primary", size = "md", forceState, className, ...props },
  ref
) {
  const classes = [
    styles.btn,
    styles[size],
    styles[variant],
    variant !== "ghost" ? styles.glossy : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  return <button ref={ref} className={classes} data-force={forceState} {...props} />;
});
