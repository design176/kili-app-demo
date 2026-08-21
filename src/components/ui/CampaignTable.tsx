import { Megaphone } from "@phosphor-icons/react";
import { Table, type TableColumn } from "./Table";
import { Badge } from "./Badge";
import { Button } from "./Button";
import { EmptyState } from "./EmptyState";
import { formatShortDate } from "@/lib/format";

export type Campaign = {
  id: string;
  name: string;
  status: "Draft" | "Active" | "Paused" | "Ended" | "Archived";
  budget: number;
  spend: number;
  impressions: number;
  clicks: number;
  conversions: number;
  cpc: number;
  cpm: number;
  ctr: number;
  cpa: number;
  endDate: Date;
};

const statusTone = {
  Draft: "neutral",
  Active: "success",
  Paused: "warning",
  Ended: "neutral",
  Archived: "danger",
} as const;

export type CampaignTableProps = {
  campaigns: Campaign[];
  onCreateNew?: () => void;
  onRowClick?: (campaign: Campaign) => void;
  loading?: boolean;
};

export function CampaignTable({
  campaigns,
  onCreateNew,
  onRowClick,
  loading,
}: CampaignTableProps) {
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
      key: "impressions",
      header: "Impressions",
      align: "right",
      sortable: true,
      render: (row) => row.impressions.toLocaleString(),
    },
    {
      key: "clicks",
      header: "Clicks",
      align: "right",
      sortable: true,
      render: (row) => row.clicks.toLocaleString(),
    },
    {
      key: "conversions",
      header: "Conversions",
      align: "right",
      sortable: true,
      render: (row) => row.conversions.toLocaleString(),
    },
    {
      key: "cpc",
      header: "CPC",
      align: "right",
      sortable: true,
      render: (row) => `$${row.cpc.toFixed(2)}`,
    },
    {
      key: "cpm",
      header: "CPM",
      align: "right",
      sortable: true,
      render: (row) => `$${row.cpm.toFixed(2)}`,
    },
    {
      key: "ctr",
      header: "CTR",
      align: "right",
      sortable: true,
      render: (row) => `${row.ctr}%`,
    },
    {
      key: "cpa",
      header: "CPA",
      align: "right",
      sortable: true,
      render: (row) => `$${row.cpa.toFixed(2)}`,
    },
    {
      key: "endDate",
      header: "End date",
      align: "right",
      sortable: true,
      sortValue: (row) => row.endDate.getTime(),
      render: (row) => formatShortDate(row.endDate),
    },
  ];

  return (
    <Table
      columns={columns}
      rows={campaigns}
      rowKey={(row) => row.id}
      onRowClick={onRowClick}
      loading={loading}
      emptyState={
        <EmptyState
          icon={<Megaphone size={20} weight="bold" />}
          title="No campaigns yet"
          description="Once you launch a campaign, it'll show up here with its spend and performance."
          primaryAction={{ label: "Create Campaign", onClick: onCreateNew }}
        />
      }
      rowActions={(row) => (
        <Button variant="primary" size="sm" onClick={() => onRowClick?.(row)}>
          Manage
        </Button>
      )}
    />
  );
}
