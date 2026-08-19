"use client";

import { useMemo, useState, type ReactNode } from "react";
import { CaretDown, CaretUp } from "@phosphor-icons/react";
import { Skeleton } from "./Skeleton";
import styles from "./Table.module.css";

const SKELETON_ROWS = 5;

function alignClass(align: "left" | "right" | "center" = "left") {
  if (align === "right") return styles.alignRight;
  if (align === "center") return styles.alignCenter;
  return styles.alignLeft;
}

export type TableColumn<T> = {
  key: string;
  header: string;
  render?: (row: T) => ReactNode;
  align?: "left" | "right" | "center";
  sortable?: boolean;
  sortValue?: (row: T) => string | number;
  /** Caps the column at this CSS width (e.g. "100px") instead of growing/shrinking with content. Columns left unset share the remaining space. */
  width?: string;
};

export type TableProps<T> = {
  columns: TableColumn<T>[];
  rows: T[];
  rowKey: (row: T) => string;
  rowActions?: (row: T) => ReactNode;
  emptyState?: ReactNode;
  loading?: boolean;
  className?: string;
  onRowClick?: (row: T) => void;
};

export function Table<T extends Record<string, unknown>>({
  columns,
  rows,
  rowKey,
  rowActions,
  emptyState,
  loading,
  className,
  onRowClick,
}: TableProps<T>) {
  const [sort, setSort] = useState<{ key: string; direction: "asc" | "desc" } | null>(null);

  const sortedRows = useMemo(() => {
    if (!sort) return rows;
    const column = columns.find((c) => c.key === sort.key);
    if (!column) return rows;
    const getValue = column.sortValue ?? ((row: T) => row[column.key] as string | number);

    return [...rows].sort((a, b) => {
      const av = getValue(a);
      const bv = getValue(b);
      if (av < bv) return sort.direction === "asc" ? -1 : 1;
      if (av > bv) return sort.direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [rows, sort, columns]);

  const toggleSort = (key: string) => {
    setSort((prev) => {
      if (!prev || prev.key !== key) return { key, direction: "asc" };
      if (prev.direction === "asc") return { key, direction: "desc" };
      return null;
    });
  };

  if (!loading && rows.length === 0 && emptyState) {
    return (
      <div className={`${styles.wrap} ${className ?? ""}`}>
        <div className={styles.empty}>{emptyState}</div>
      </div>
    );
  }

  const skeletonRow = (i: number) => (
    <tr key={`skeleton-${i}`}>
      {columns.map((column) => (
        <td key={column.key} className={alignClass(column.align)}>
          <Skeleton variant="text" width={column.align === "right" ? "50%" : "70%"} />
        </td>
      ))}
      {rowActions && <td />}
    </tr>
  );

  const dataRow = (row: T) => (
    <tr
      key={rowKey(row)}
      className={onRowClick ? styles.clickableRow : undefined}
      onClick={onRowClick ? () => onRowClick(row) : undefined}
    >
      {columns.map((column) => (
        <td
          key={column.key}
          className={alignClass(column.align)}
          style={column.width ? { width: column.width, maxWidth: column.width } : undefined}
        >
          {column.render ? column.render(row) : (row[column.key] as ReactNode)}
        </td>
      ))}
      {rowActions && (
        <td className={styles.actionsCell} onClick={(e) => e.stopPropagation()}>
          {rowActions(row)}
        </td>
      )}
    </tr>
  );

  return (
    <div className={`${styles.wrap} ${className ?? ""}`}>
      <table className={styles.table}>
        <colgroup>
          {columns.map((column) => (
            <col
              key={column.key}
              style={column.width ? { width: column.width } : undefined}
            />
          ))}
          {rowActions && <col style={{ width: "1%" }} />}
        </colgroup>
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className={`${column.sortable ? styles.sortable : ""} ${alignClass(
                  column.align
                )}`}
                style={column.width ? { width: column.width, maxWidth: column.width } : undefined}
                onClick={column.sortable ? () => toggleSort(column.key) : undefined}
              >
                <span className={styles.headContent}>
                  {column.header}
                  {column.sortable && sort?.key === column.key && (
                    sort.direction === "asc" ? (
                      <CaretUp size={10} weight="bold" />
                    ) : (
                      <CaretDown size={10} weight="bold" />
                    )
                  )}
                </span>
              </th>
            ))}
            {rowActions && <th />}
          </tr>
        </thead>
        <tbody>
          {loading
            ? Array.from({ length: SKELETON_ROWS }, (_, i) => skeletonRow(i))
            : sortedRows.map(dataRow)}
        </tbody>
      </table>
    </div>
  );
}
