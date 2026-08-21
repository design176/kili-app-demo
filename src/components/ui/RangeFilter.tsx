"use client";

import { useRef, useState } from "react";
import { CalendarBlank, CaretDown } from "@phosphor-icons/react";
import { PopoverPortal } from "./Popover";
import { Radio } from "./Radio";
import styles from "./RangeFilter.module.css";

export type TrendGranularity = "daily" | "weekly" | "monthly";

const OPTIONS: { value: TrendGranularity; label: string }[] = [
  { value: "daily", label: "Daily" },
  { value: "weekly", label: "Weekly" },
  { value: "monthly", label: "Monthly" },
];

export type RangeFilterProps = {
  value: TrendGranularity;
  onChange: (value: TrendGranularity) => void;
  className?: string;
};

export function RangeFilter({ value, onChange, className }: RangeFilterProps) {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState<{ top: number; left: number }>();
  const triggerRef = useRef<HTMLButtonElement>(null);

  const toggle = () => {
    if (!open) {
      const rect = triggerRef.current?.getBoundingClientRect();
      if (rect) setPos({ top: rect.bottom + 4, left: rect.left });
    }
    setOpen((o) => !o);
  };

  const currentLabel = OPTIONS.find((o) => o.value === value)?.label ?? "";

  return (
    <div className={className ?? ""}>
      <button
        ref={triggerRef}
        type="button"
        className={styles.trigger}
        onClick={toggle}
        data-open={open}
      >
        <CalendarBlank size={14} weight="bold" className={styles.icon} />
        <span className={styles.triggerLabel}>{currentLabel}</span>
        <CaretDown size={12} weight="bold" className={styles.chevron} />
      </button>

      <PopoverPortal
        open={open}
        onClose={() => setOpen(false)}
        style={pos ? { top: pos.top, left: pos.left } : {}}
      >
        <div className={styles.panel}>
          <div className={styles.panelTitle}>Range</div>
          {OPTIONS.map((opt, i) => (
            <div key={opt.value}>
              {i > 0 && <div className={styles.divider} />}
              <Radio
                checked={value === opt.value}
                onCheckedChange={() => {
                  onChange(opt.value);
                  setOpen(false);
                }}
                label={opt.label}
                className={styles.option}
              />
            </div>
          ))}
        </div>
      </PopoverPortal>
    </div>
  );
}
