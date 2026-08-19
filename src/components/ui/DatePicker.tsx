"use client";

import { useRef, useState, type ReactNode } from "react";
import { CalendarBlank, CaretLeft, CaretRight } from "@phosphor-icons/react";
import { PopoverPortal } from "./popover";
import { IconButton } from "./IconButton";
import { Select } from "./Select";
import styles from "./DatePicker.module.css";

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const WEEKDAYS = ["S", "M", "T", "W", "T", "F", "S"];

export type DateRange = { from: Date | null; to: Date | null };
type ViewMonth = { year: number; month: number };

export type DatePickerProps = {
  mode?: "single" | "range";
  value: DateRange;
  onChange: (value: DateRange) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
  /** Demo-only: force a pseudo-class-like visual state without real interaction. */
  forceState?: "hover" | "focus";
};

function addMonths(view: ViewMonth, delta: number): ViewMonth {
  let m = view.month + delta;
  let y = view.year;
  while (m < 0) {
    m += 12;
    y -= 1;
  }
  while (m > 11) {
    m -= 12;
    y += 1;
  }
  return { year: y, month: m };
}

function isSameDay(a?: Date | null, b?: Date | null) {
  return !!a && !!b && a.toDateString() === b.toDateString();
}

function formatDate(d: Date) {
  const day = d.getDate();
  const month = d.toLocaleDateString("en-US", { month: "short" });
  const year = String(d.getFullYear()).slice(-2);
  return `${day} ${month}, ${year}`;
}

function formatLabel(mode: "single" | "range", value: DateRange, placeholder: string) {
  if (mode === "single") return value.from ? formatDate(value.from) : placeholder;
  if (!value.from) return placeholder;
  if (!value.to) return `${formatDate(value.from)} – …`;
  return `${formatDate(value.from)} – ${formatDate(value.to)}`;
}

const MONTH_OPTIONS = MONTHS.map((m, i) => ({ value: String(i), label: m }));
const currentYear = new Date().getFullYear();
const YEAR_OPTIONS = Array.from({ length: 21 }, (_, i) => currentYear - 10 + i).map((y) => ({
  value: String(y),
  label: String(y),
}));

function Calendar({
  view,
  onNavigate,
  onViewChange,
  range,
  onDayClick,
}: {
  view: ViewMonth;
  onNavigate: (delta: number) => void;
  onViewChange: (view: ViewMonth) => void;
  range: DateRange;
  onDayClick: (d: Date) => void;
}) {
  const firstWeekday = new Date(view.year, view.month, 1).getDay();
  const totalDays = new Date(view.year, view.month + 1, 0).getDate();
  const cells: (Date | null)[] = [
    ...Array.from({ length: firstWeekday }, () => null),
    ...Array.from({ length: totalDays }, (_, i) => new Date(view.year, view.month, i + 1)),
  ];

  const today = new Date();

  return (
    <div className={styles.calendar}>
      <div className={styles.calendarHead}>
        <div className={styles.calendarDropdowns}>
          <Select
            options={MONTH_OPTIONS}
            value={String(view.month)}
            onChange={(v) => onViewChange({ ...view, month: Number(v) })}
            className={styles.monthSelect}
          />
          <Select
            options={YEAR_OPTIONS}
            value={String(view.year)}
            onChange={(v) => onViewChange({ ...view, year: Number(v) })}
            className={styles.yearSelect}
          />
        </div>
        <div className={styles.calendarNav}>
          <IconButton
            variant="ghost"
            size="sm"
            label="Previous month"
            onClick={() => onNavigate(-1)}
          >
            <CaretLeft size={12} weight="bold" />
          </IconButton>
          <IconButton
            variant="ghost"
            size="sm"
            label="Next month"
            onClick={() => onNavigate(1)}
          >
            <CaretRight size={12} weight="bold" />
          </IconButton>
        </div>
      </div>

      <div className={styles.weekRow}>
        {WEEKDAYS.map((w, i) => (
          <span key={i} className={i === 0 ? styles.sun : ""}>
            {w}
          </span>
        ))}
      </div>

      <div className={styles.dayGrid}>
        {cells.map((d, i) => {
          if (!d) return <span key={i} />;

          const isSelected = isSameDay(d, range.from) || isSameDay(d, range.to);
          const isInRange =
            range.from && range.to && d > range.from && d < range.to;
          const isToday = isSameDay(d, today);

          const classes = [
            styles.day,
            isInRange ? styles.dayInRange : "",
            isToday && !isSelected ? styles.dayToday : "",
            isSelected ? styles.daySelected : "",
          ]
            .filter(Boolean)
            .join(" ");

          return (
            <button key={i} type="button" className={classes} onClick={() => onDayClick(d)}>
              {d.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function DatePicker({
  mode = "single",
  value,
  onChange,
  placeholder = "Select date",
  disabled,
  className,
  style,
  forceState,
}: DatePickerProps) {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState<{ top: number; left: number }>();
  const triggerRef = useRef<HTMLButtonElement>(null);

  const today = new Date();
  const [viewA, setViewA] = useState<ViewMonth>(() => {
    const base = value.from ?? today;
    return { year: base.getFullYear(), month: base.getMonth() };
  });
  const [viewB, setViewB] = useState<ViewMonth>(() => addMonths(viewA, 1));

  const toggle = () => {
    if (disabled) return;
    if (!open) {
      const rect = triggerRef.current?.getBoundingClientRect();
      if (rect) setPos({ top: rect.bottom + 4, left: rect.left });
    }
    setOpen((o) => !o);
  };

  const handleDayClick = (d: Date) => {
    if (mode === "single") {
      onChange({ from: d, to: null });
      setOpen(false);
      return;
    }
    if (!value.from || value.to) {
      onChange({ from: d, to: null });
    } else if (d < value.from) {
      onChange({ from: d, to: value.from });
    } else {
      onChange({ from: value.from, to: d });
    }
  };

  const label = formatLabel(mode, value, placeholder);

  let panel: ReactNode;
  if (mode === "range") {
    panel = (
      <div className={styles.rangePanel}>
        <div className={styles.rangeCol}>
          <div className={styles.rangeLabel}>From</div>
          <Calendar
            view={viewA}
            onNavigate={(delta) => setViewA((v) => addMonths(v, delta))}
            onViewChange={setViewA}
            range={value}
            onDayClick={handleDayClick}
          />
        </div>
        <div className={styles.rangeDivider} />
        <div className={styles.rangeCol}>
          <div className={styles.rangeLabel}>To</div>
          <Calendar
            view={viewB}
            onNavigate={(delta) => setViewB((v) => addMonths(v, delta))}
            onViewChange={setViewB}
            range={value}
            onDayClick={handleDayClick}
          />
        </div>
      </div>
    );
  } else {
    panel = (
      <div className={styles.panel}>
        <Calendar
          view={viewA}
          onNavigate={(delta) => setViewA((v) => addMonths(v, delta))}
          onViewChange={setViewA}
          range={value}
          onDayClick={handleDayClick}
        />
      </div>
    );
  }

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
        <CalendarBlank size={14} weight="bold" className={styles.calIcon} />
        <span
          className={`${styles.triggerLabel} ${value.from ? "" : styles.placeholder}`}
        >
          {label}
        </span>
      </button>

      <PopoverPortal
        open={open}
        onClose={() => setOpen(false)}
        style={pos ? { top: pos.top, left: pos.left } : {}}
      >
        {panel}
      </PopoverPortal>
    </div>
  );
}
