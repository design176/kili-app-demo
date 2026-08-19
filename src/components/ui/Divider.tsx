import type { HTMLAttributes } from "react";
import styles from "./Divider.module.css";

export type DividerProps = HTMLAttributes<HTMLHRElement> & {
  orientation?: "horizontal" | "vertical";
};

export function Divider({
  orientation = "horizontal",
  className,
  ...props
}: DividerProps) {
  const classes = [
    orientation === "vertical" ? styles.vertical : styles.horizontal,
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  return <hr className={classes} {...props} />;
}
