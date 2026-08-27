"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Table, type TableColumn } from "@/components/ui/Table";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { emailCatalog, type EmailEntry } from "./catalog";
import styles from "./emails.module.css";

function typeTone(type: EmailEntry["type"]): "info" | "purple" | "amber" {
  if (type === "system") return "info";
  if (type === "marketing") return "purple";
  return "amber";
}

function statusTone(status: EmailEntry["status"]): "success" | "neutral" | "danger" {
  if (status === "active") return "success";
  if (status === "draft") return "neutral";
  return "danger";
}

export default function EmailsPage() {
  const router = useRouter();

  const columns: TableColumn<EmailEntry>[] = [
    {
      key: "name",
      header: "Email",
      sortable: true,
      sortValue: (r) => r.name,
      render: (row) => (
        <span className={styles.cellName}>
          <span className={styles.cellNameStrong}>{row.name}</span>
          <span className={styles.cellNameDesc}>{row.description}</span>
        </span>
      ),
    },
    {
      key: "type",
      header: "Type",
      width: "120px",
      sortable: true,
      render: (row) => <Badge tone={typeTone(row.type)}>{row.type}</Badge>,
    },
    {
      key: "trigger",
      header: "Trigger",
      sortable: true,
      render: (row) => row.trigger,
    },
    {
      key: "status",
      header: "Status",
      width: "110px",
      sortable: true,
      render: (row) => <Badge tone={statusTone(row.status)}>{row.status}</Badge>,
    },
  ];

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Emails</h1>
      <p className={styles.subtitle}>
        Every email in the product. Each row is a Handlebars template (<code>.hbs</code>) with a
        JSON props file for preview.
      </p>

      <Table
        columns={columns}
        rows={emailCatalog as unknown as Record<string, unknown>[] as EmailEntry[]}
        rowKey={(r) => (r as EmailEntry).slug}
        onRowClick={(r) => {
          const row = r as unknown as EmailEntry;
          router.push(`/design/emails/${row.slug}`);
        }}
        rowActions={(r) => {
          const row = r as unknown as EmailEntry;
          return (
            <Link href={`/design/emails/${row.slug}`}>
              <Button variant="secondary" size="sm">
                View
              </Button>
            </Link>
          );
        }}
      />
    </div>
  );
}
