"use client";

import { useState } from "react";
import { Check, Copy } from "@phosphor-icons/react";
import { Card } from "@/components/ui/Card";
import { IconButton } from "@/components/ui/IconButton";
import { changelogEntries, type ChangelogEntry } from "./changelog-data";
import styles from "../design.module.css";
import changelogStyles from "./changelog.module.css";

function entryToText(entry: ChangelogEntry) {
  return [entry.date, ...entry.changes.map((change) => `- ${change}`)].join("\n");
}

function ChangelogCard({ entry }: { entry: ChangelogEntry }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(entryToText(entry));
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <Card>
      <div className={changelogStyles.header}>
        <div className={changelogStyles.date}>{entry.date}</div>
        <IconButton variant="ghost" size="sm" label="Copy entry" onClick={handleCopy}>
          {copied ? <Check size={13} weight="bold" /> : <Copy size={13} weight="bold" />}
        </IconButton>
      </div>
      <ul className={changelogStyles.changes}>
        {entry.changes.map((change, i) => (
          <li key={i}>{change}</li>
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
