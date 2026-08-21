"use client";

import { useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { Plus, Check, Copy, TrashSimple } from "@phosphor-icons/react";
import { Button } from "./Button";
import { IconButton } from "./IconButton";
import { CopyField } from "./CopyField";
import { Table, type TableColumn } from "./Table";
import { EmptyState } from "./EmptyState";
import type { ApiKeyEntry } from "@/components/demo-state";
import styles from "./KeyManager.module.css";

function maskKey(value: string) {
  return value.length <= 10 ? value : `${value.slice(0, 10)}${"•".repeat(9)}`;
}

export type KeyManagerProps = {
  title: string;
  description: string;
  createLabel: string;
  emptyIcon: ReactNode;
  emptyTitle: string;
  emptyDescription: string;
  keys: ApiKeyEntry[];
  onCreate: () => ApiKeyEntry;
  onRemove: (id: string) => void;
  loading?: boolean;
  className?: string;
};

/** Create-key flow: reveals a brand-new key's full value once, then the table only ever shows a masked value. */
export function KeyManager({
  title,
  description,
  createLabel,
  emptyIcon,
  emptyTitle,
  emptyDescription,
  keys,
  onCreate,
  onRemove,
  loading,
  className,
}: KeyManagerProps) {
  const [revealedKey, setRevealedKey] = useState<ApiKeyEntry | null>(null);
  const [copied, setCopied] = useState(false);

  const handleCreate = () => {
    setRevealedKey(onCreate());
  };

  const handleCopy = async () => {
    if (!revealedKey) return;
    await navigator.clipboard.writeText(revealedKey.value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const columns: TableColumn<ApiKeyEntry>[] = [
    { key: "name", header: "Name", width: "100px" },
    {
      key: "value",
      header: "API key",
      render: (row) => <span className={styles.keyValueText}>{maskKey(row.value)}</span>,
    },
    {
      key: "options",
      header: "Options",
      width: "1%",
      render: (row) => (
        <IconButton variant="ghost" size="sm" dangerHover label="Delete key" onClick={() => onRemove(row.id)}>
          <TrashSimple size={14} weight="bold" />
        </IconButton>
      ),
    },
  ];

  return (
    <div className={className}>
      <div className={styles.sectionHeader}>
        <div>
          <div className={styles.sectionTitle}>{title}</div>
          <p className={styles.sectionDescription}>{description}</p>
        </div>
        <Button variant="accent" className={styles.createButton} onClick={handleCreate}>
          <Plus size={14} weight="bold" />
          {createLabel}
        </Button>
      </div>

      <Table
        columns={columns}
        rows={keys}
        rowKey={(row) => row.id}
        loading={loading}
        className={styles.keysTable}
        emptyState={
          <EmptyState icon={emptyIcon} title={emptyTitle} description={emptyDescription} />
        }
      />

      {revealedKey &&
        typeof document !== "undefined" &&
        createPortal(
          <div className={styles.backdrop} onClick={() => setRevealedKey(null)}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
              <div className={styles.revealTitle}>Your new API key</div>
              <p className={styles.revealHint}>Copy it now — this is the only time it&apos;s shown in full.</p>
              <CopyField value={revealedKey.value} />
              <div className={styles.revealActions}>
                <Button variant="secondary" size="sm" onClick={handleCopy}>
                  {copied ? <Check size={14} weight="bold" /> : <Copy size={14} weight="bold" />}
                  Copy key
                </Button>
                <Button variant="primary" size="sm" onClick={() => setRevealedKey(null)}>
                  Done
                </Button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}
