"use client";

import { useState } from "react";
import { Check, Copy, FileMd } from "@phosphor-icons/react";
import { Card } from "@/components/ui/Card";
import { Button, type ButtonProps } from "@/components/ui/Button";
import { changelogEntries, type ChangelogEntry } from "./changelog-data";
import styles from "../design.module.css";
import changelogStyles from "./changelog.module.css";

function entryToText(entry: ChangelogEntry) {
  const lines = entry.changes.map((change) => {
    const files = change.files.length ? ` (${change.files.join(", ")})` : "";
    return `- ${change.text}${files}`;
  });
  return [entry.date, ...lines].join("\n");
}

function entryToMarkdown(entry: ChangelogEntry) {
  const lines = entry.changes.map((change) => {
    const files = change.files.map((f) => `\`${f}\``).join(", ");
    return `- [ ] ${change.text}\n      Files: ${files}`;
  });
  return [`## Changes — ${entry.date}`, "", ...lines].join("\n");
}

function CopyButton({
  variant,
  icon,
  label,
  getText,
}: {
  variant: ButtonProps["variant"];
  icon: React.ReactNode;
  label: string;
  getText: () => string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(getText());
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <Button variant={variant} size="sm" onClick={handleCopy}>
      {copied ? <Check size={14} weight="bold" /> : icon}
      {copied ? "Copied" : label}
    </Button>
  );
}

function ChangelogCard({ entry }: { entry: ChangelogEntry }) {
  return (
    <Card>
      <div className={changelogStyles.header}>
        <div className={changelogStyles.date}>{entry.date}</div>
        <div className={changelogStyles.headerActions}>
          <CopyButton
            variant="secondary"
            icon={<Copy size={14} weight="bold" />}
            label="Copy"
            getText={() => entryToText(entry)}
          />
          <CopyButton
            variant="primary"
            icon={<FileMd size={14} weight="bold" />}
            label="Copy as .md"
            getText={() => entryToMarkdown(entry)}
          />
        </div>
      </div>
      <ul className={changelogStyles.changes}>
        {entry.changes.map((change, i) => (
          <li key={i}>
            {change.text}
            {change.files.length > 0 && (
              <div className={changelogStyles.files}>
                {change.files.map((file) => (
                  <span key={file} className={changelogStyles.file}>
                    {file}
                  </span>
                ))}
              </div>
            )}
          </li>
        ))}
      </ul>
    </Card>
  );
}

export default function ChangelogPage() {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Changelog</h1>
      <p className={styles.subtitle}>
        What changed since the last push, newest first. Updated on request —
        not every commit, just what shipped each push.
      </p>

      <div className={styles.list}>
        {changelogEntries.map((entry) => (
          <ChangelogCard key={entry.date} entry={entry} />
        ))}
      </div>
    </div>
  );
}
