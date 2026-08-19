"use client";

import { useState } from "react";
import { Plus, Plug, Copy, Check, TrashSimple } from "@phosphor-icons/react";
import { DashboardShell } from "@/components/dashboard-shell";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { IconButton } from "@/components/ui/IconButton";
import { CopyField } from "@/components/ui/CopyField";
import { EmptyState } from "@/components/ui/EmptyState";
import { Table, type TableColumn } from "@/components/ui/Table";
import {
  CreateApiKeyModal,
  placementLabels,
  frequencyLabels,
} from "@/components/ui/CreateApiKeyModal";
import { useDemoState, type ApiKeyEntry } from "@/components/demo-state";
import styles from "./integration.module.css";

const SNIPPET = `<script src="https://cdn.kili.ai/sdk.js" data-key="{YOUR_API_KEY}"></script>`;

function KeyOptionsCell({ value, onDelete }: { value: string; onDelete: () => void }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className={styles.keyOptionsCell}>
      <IconButton variant="ghost" size="sm" label="Copy" onClick={handleCopy}>
        {copied ? <Check size={13} weight="bold" /> : <Copy size={13} weight="bold" />}
      </IconButton>
      <IconButton variant="ghost" size="sm" dangerHover label="Delete key" onClick={onDelete}>
        <TrashSimple size={14} weight="bold" />
      </IconButton>
    </div>
  );
}

export default function IntegrationPage() {
  const { apiKeys, addApiKey, removeApiKey, forceLoadingStates } = useDemoState();
  const [createOpen, setCreateOpen] = useState(false);

  const columns: TableColumn<ApiKeyEntry>[] = [
    {
      key: "value",
      header: "API key",
      render: (row) => <span className={styles.keyValueText}>{row.value}</span>,
    },
    {
      key: "frequency",
      header: "Response frequency",
      render: (row) => frequencyLabels[row.frequency],
    },
    {
      key: "placement",
      header: "Position",
      render: (row) => <Badge tone="brand">{placementLabels[row.placement]}</Badge>,
    },
    {
      key: "options",
      header: "Options",
      render: (row) => (
        <KeyOptionsCell value={row.value} onDelete={() => removeApiKey(row.id)} />
      ),
    },
  ];

  return (
    <DashboardShell
      activeKey="integration"
      pageTitle="Integration"
      pageDescription="Create an API key and install the SDK in your product."
    >
      <div>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionTitle}>API keys</div>
          <Button variant="accent" onClick={() => setCreateOpen(true)}>
            <Plus size={14} weight="bold" />
            Create API key
          </Button>
        </div>

        <Table
          columns={columns}
          rows={apiKeys}
          rowKey={(row) => row.id}
          loading={forceLoadingStates}
          emptyState={
            <EmptyState
              icon={<Plug size={20} weight="bold" />}
              title="No API keys yet"
              description="Create a key to start authenticating requests from your product."
            />
          }
        />
      </div>

      <Card>
        <div className={styles.sectionTitle}>Install snippet</div>
        <p className={styles.sectionDescription}>
          Add this to your product, replacing the placeholder with a real API key above.
        </p>
        <CopyField value={SNIPPET} />
      </Card>

      <CreateApiKeyModal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        onCreate={(placement, frequency) => addApiKey(placement, frequency)}
      />
    </DashboardShell>
  );
}
