"use client";

import { useState } from "react";
import { Copy, TrashSimple } from "@phosphor-icons/react";
import { Table, type TableColumn } from "@/components/ui/Table";
import { Badge } from "@/components/ui/Badge";
import { IconButton } from "@/components/ui/IconButton";
import { EmptyState } from "@/components/ui/EmptyState";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import styles from "../demo.module.css";

type Campaign = {
  id: string;
  name: string;
  status: "Draft" | "Active" | "Paused" | "Ended";
  budget: number;
  spend: number;
  ctr: number;
};

const statusTone = {
  Draft: "neutral",
  Active: "success",
  Paused: "warning",
  Ended: "neutral",
} as const;

const initialRows: Campaign[] = [
  { id: "1", name: "Q4 launch", status: "Active", budget: 5000, spend: 3120, ctr: 1.8 },
  { id: "2", name: "Holiday promo", status: "Paused", budget: 2000, spend: 900, ctr: 1.2 },
  { id: "3", name: "Retargeting", status: "Draft", budget: 1000, spend: 0, ctr: 0 },
];

const columns: TableColumn<Campaign>[] = [
  { key: "name", header: "Name", sortable: true },
  {
    key: "status",
    header: "Status",
    render: (row) => <Badge tone={statusTone[row.status]}>{row.status}</Badge>,
  },
  {
    key: "budget",
    header: "Budget",
    align: "right",
    sortable: true,
    render: (row) => `$${row.budget.toLocaleString()}`,
  },
  {
    key: "spend",
    header: "Spend",
    align: "right",
    sortable: true,
    render: (row) => `$${row.spend.toLocaleString()}`,
  },
  {
    key: "ctr",
    header: "CTR",
    align: "right",
    sortable: true,
    render: (row) => `${row.ctr}%`,
  },
];

export default function TablePage() {
  const [rows, setRows] = useState(initialRows);
  const [pendingDelete, setPendingDelete] = useState<Campaign | null>(null);

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Table</h1>
      <p className={styles.subtitle}>
        Generic, data-driven table shell — columns/rows/sorting/row actions
        are all configured per use, nothing campaign-specific is baked in.
        Click a sortable header to sort. The Archive action turns danger-red
        on hover and requires confirmation before it does anything.
      </p>

      <div className={styles.section}>
        <div className={styles.sectionTitle}>Campaign List</div>
        <Table
          columns={columns}
          rows={rows}
          rowKey={(row) => row.id}
          emptyState={
            <EmptyState
              icon={<Copy size={20} weight="bold" />}
              title="No campaigns yet"
              description="Once you launch a campaign, it'll show up here."
              primaryAction={{ label: "Create Campaign" }}
            />
          }
          rowActions={(row) => (
            <div style={{ display: "flex", gap: 4 }}>
              <IconButton variant="ghost" size="sm" label="Duplicate">
                <Copy size={13} weight="bold" />
              </IconButton>
              <IconButton
                variant="ghost"
                size="sm"
                label="Archive"
                dangerHover
                onClick={() => setPendingDelete(row)}
              >
                <TrashSimple size={13} weight="bold" />
              </IconButton>
            </div>
          )}
        />
      </div>

      <ConfirmDialog
        open={!!pendingDelete}
        title={`Archive "${pendingDelete?.name}"?`}
        description="This campaign will stop running and move to Ended. You can't undo this from here."
        confirmLabel="Archive"
        onCancel={() => setPendingDelete(null)}
        onConfirm={() => {
          setRows((prev) => prev.filter((r) => r.id !== pendingDelete?.id));
          setPendingDelete(null);
        }}
      />
    </div>
  );
}
