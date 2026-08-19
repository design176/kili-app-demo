import type { ReactNode } from "react";
import styles from "./FormField.module.css";

export type FormFieldProps = {
  label: string;
  htmlFor?: string;
  required?: boolean;
  helperText?: string;
  error?: boolean;
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

export function FormField({
  label,
  htmlFor,
  required,
  helperText,
  error,
  children,
  className,
  style,
}: FormFieldProps) {
  const classes = [styles.field, className ?? ""].filter(Boolean).join(" ");

  return (
    <div className={classes} style={style}>
      <label className={styles.label} htmlFor={htmlFor}>
        {label}
        {required && <span className={styles.required}>*</span>}
      </label>
      {children}
      {helperText && (
        <span className={`${styles.helper} ${error ? styles.helperError : ""}`}>
          {helperText}
        </span>
      )}
    </div>
  );
}
