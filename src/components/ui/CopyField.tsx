"use client";

import { useState } from "react";
import { Check, Copy, TrashSimple } from "@phosphor-icons/react";
import { IconButton } from "./IconButton";
import styles from "./CopyField.module.css";

export type CopyFieldProps = {
  value: string;
  multiline?: boolean;
  onDelete?: () => void;
  className?: string;
};

export function CopyField({ value, multiline, onDelete, className }: CopyFieldProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className={`${styles.field} ${className ?? ""}`}>
      <span className={`${styles.value} ${multiline ? styles.multiline : styles.singleLine}`}>
        {value}
      </span>
      <div className={styles.actions}>
        <IconButton variant="ghost" size="sm" label="Copy" onClick={handleCopy}>
          {copied ? (
            <Check size={13} weight="bold" />
          ) : (
            <Copy size={13} weight="bold" />
          )}
        </IconButton>
        {onDelete && (
          <IconButton variant="ghost" size="sm" label="Delete" onClick={onDelete}>
            <TrashSimple size={13} weight="bold" />
          </IconButton>
        )}
      </div>
    </div>
  );
}
