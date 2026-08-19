import type { ButtonHTMLAttributes } from "react";
import buttonStyles from "./Button.module.css";
import styles from "./IconButton.module.css";

type Variant = "primary" | "secondary" | "ghost" | "destructive" | "accent";
type Size = "sm" | "md" | "lg";

export type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
  label: string;
  /** Turns danger-colored on hover — for delete/remove actions. */
  dangerHover?: boolean;
  /** Demo-only: force a pseudo-class-like visual state without real interaction. */
  forceState?: "hover" | "active";
};

export function IconButton({
  variant = "secondary",
  size = "md",
  label,
  dangerHover,
  forceState,
  className,
  children,
  ...props
}: IconButtonProps) {
  const classes = [
    buttonStyles.btn,
    styles.btn,
    styles[size],
    buttonStyles[variant],
    variant !== "ghost" ? buttonStyles.glossy : "",
    dangerHover ? styles.dangerHover : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      className={classes}
      aria-label={label}
      title={label}
      data-force={forceState}
      {...props}
    >
      {children}
    </button>
  );
}
