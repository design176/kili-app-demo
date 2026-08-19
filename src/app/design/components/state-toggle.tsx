"use client";

import styles from "./state-toggle.module.css";

export function StateToggle<T extends string>({
  options,
  value,
  onChange,
}: {
  options: readonly T[];
  value: T;
  onChange: (value: T) => void;
}) {
  return (
    <div className={styles.toggle}>
      {options.map((option) => (
        <button
          key={option}
          type="button"
          className={`${styles.btn} ${
            value === option ? styles.btnActive : ""
          }`}
          onClick={() => onChange(option)}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
