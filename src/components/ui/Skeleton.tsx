import type { CSSProperties } from "react";
import styles from "./Skeleton.module.css";

export type SkeletonProps = {
  width?: string | number;
  height?: string | number;
  variant?: "text" | "rect" | "circle";
  className?: string;
};

export function Skeleton({ width, height, variant = "rect", className }: SkeletonProps) {
  const style: CSSProperties = {
    width,
    height: height ?? (variant === "text" ? "0.9em" : undefined),
  };

  return (
    <span
      className={`${styles.skeleton} ${styles[variant]} ${className ?? ""}`}
      style={style}
    />
  );
}
