"use client";

import { useMemo } from "react";
import { Wallet, Receipt } from "@phosphor-icons/react/dist/ssr";
import { Table, type TableColumn } from "./Table";
import { Badge } from "./Badge";
import { EmptyState } from "./EmptyState";

export type PayoutStatus = "Paid" | "Scheduled" | "Failed";
export type InvoiceStatus = "Paid" | "Refunded" | "Failed";

export type HistoryEntry<Status extends string> = {
  id: string;
  date: Date;
  amount: number;
  status: Status;
};

const payoutTone: Record<PayoutStatus, "success" | "info" | "danger"> = {
  Paid: "success",
  Scheduled: "info",
  Failed: "danger",
};

const invoiceTone: Record<InvoiceStatus, "success" | "neutral" | "danger"> = {
  Paid: "success",
  Refunded: "neutral",
  Failed: "danger",
};

function formatDate(d: Date) {
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

type HistoryTableProps =
  | { type: "payout"; entries: HistoryEntry<PayoutStatus>[]; loading?: boolean }
  | { type: "invoice"; entries: HistoryEntry<InvoiceStatus>[]; loading?: boolean };

export function HistoryTable(props: HistoryTableProps) {
  const { type, entries, loading } = props;

  // Always latest → oldest by default, regardless of status.
  const sorted = useMemo(
    () => [...entries].sort((a, b) => b.date.getTime() - a.date.getTime()),
    [entries]
  );

  const nextScheduledId =
    type === "payout"
      ? entries
          .filter((e) => e.status === "Scheduled")
          .sort((a, b) => a.date.getTime() - b.date.getTime())[0]?.id
      : undefined;

  const tone = type === "payout" ? payoutTone : invoiceTone;

  const columns: TableColumn<HistoryEntry<string>>[] = [
    {
      key: "date",
      header: "Date",
      sortable: true,
      sortValue: (row) => row.date.getTime(),
      render: (row) => (
        <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
          {formatDate(row.date)}
          {row.id === nextScheduledId && <Badge tone="brand">Next</Badge>}
        </span>
      ),
    },
    {
      key: "amount",
      header: "Amount",
      align: "right",
      sortable: true,
      width: "100px",
      render: (row) => `$${row.amount.toLocaleString()}`,
    },
    {
      key: "status",
      header: "Status",
      align: "right",
      width: "150px",
      render: (row) => (
        <Badge tone={tone[row.status as keyof typeof tone]}>{row.status}</Badge>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      rows={sorted}
      rowKey={(row) => row.id}
      loading={loading}
      emptyState={
        type === "payout" ? (
          <EmptyState
            icon={<Wallet size={20} weight="bold" />}
            title="No payouts yet"
            description="Once your account earns enough to clear the minimum threshold, payouts will show up here."
          />
        ) : (
          <EmptyState
            icon={<Receipt size={20} weight="bold" />}
            title="No invoices yet"
            description="Past charges to your account will show up here."
          />
        )
      }
    />
  );
}
