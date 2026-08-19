"use client";

import { useRef, useState } from "react";
import { CaretDown, Check } from "@phosphor-icons/react";
import { PopoverPortal } from "./popover";
import styles from "./Select.module.css";

export type SelectOption = {
  value: string;
  label: string;
};

export type SelectProps = {
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
  /** Demo-only: force a pseudo-class-like visual state without real interaction. */
  forceState?: "hover" | "focus";
};

export function Select({
  options,
  value,
  onChange,
  placeholder = "Select…",
  disabled,
  className,
  style,
  forceState,
}: SelectProps) {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState<{ top: number; left: number; width: number }>();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const selected = options.find((o) => o.value === value);

  const toggle = () => {
    if (disabled) return;
    if (!open) {
      const rect = triggerRef.current?.getBoundingClientRect();
      if (rect) {
        setPos({ top: rect.bottom + 4, left: rect.left, width: rect.width });
      }
    }
    setOpen((o) => !o);
  };

  return (
    <div className={className} style={style}>
      <button
        ref={triggerRef}
        type="button"
        className={styles.trigger}
        onClick={toggle}
        disabled={disabled}
        data-force={forceState}
        data-open={open}
      >
        <span className={selected ? "" : styles.placeholder}>
          {selected?.label ?? placeholder}
        </span>
        <CaretDown
          size={12}
          weight="bold"
          className={`${styles.chevron} ${open ? styles.chevronOpen : ""}`}
        />
      </button>

      <PopoverPortal
        open={open}
        onClose={() => setOpen(false)}
        style={pos ? { top: pos.top, left: pos.left, width: pos.width } : {}}
      >
        <ul className={styles.menu}>
          {options.map((option) => (
            <li
              key={option.value}
              className={`${styles.option} ${
                option.value === value ? styles.optionSelected : ""
              }`}
              onClick={() => {
                onChange(option.value);
                setOpen(false);
              }}
            >
              {option.label}
              {option.value === value && <Check size={14} weight="bold" />}
            </li>
          ))}
        </ul>
      </PopoverPortal>
    </div>
  );
}
