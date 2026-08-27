"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Check, Copy, X } from "@phosphor-icons/react";
import { IconButton } from "./IconButton";
import styles from "./InstallSurfaceModal.module.css";

const TITLE_ID = "install-surface-title";
const DESCRIPTION_ID = "install-surface-description";

export type InstallSurfaceModalProps = {
  open: boolean;
  surfaceName: string;
  description: string;
  code: string;
  onClose: () => void;
};

export function InstallSurfaceModal({
  open,
  surfaceName,
  description,
  code,
  onClose,
}: InstallSurfaceModalProps) {
  const [copied, setCopied] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const copyResetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!open) return;

    const previousFocus = document.activeElement as HTMLElement | null;
    const focusFrame = requestAnimationFrame(() => {
      cardRef.current?.querySelector<HTMLElement>("button")?.focus();
    });
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      cancelAnimationFrame(focusFrame);
      window.removeEventListener("keydown", handleKeyDown);
      previousFocus?.focus();
    };
    // `onClose` is a fresh closure from the parent on every render — keying
    // this effect on `open` alone avoids tearing down the focus trap and
    // keydown listener (and re-stealing focus) on every parent re-render
    // while the modal is open.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(
    () => () => {
      if (copyResetTimer.current) clearTimeout(copyResetTimer.current);
    },
    []
  );

  if (!open || typeof document === "undefined") return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
    } catch {
      return;
    }
    setCopied(true);
    if (copyResetTimer.current) clearTimeout(copyResetTimer.current);
    copyResetTimer.current = setTimeout(() => setCopied(false), 1500);
  };

  return createPortal(
    <div className={styles.backdrop} onClick={onClose}>
      <div
        ref={cardRef}
        className={styles.card}
        role="dialog"
        aria-modal="true"
        aria-labelledby={TITLE_ID}
        aria-describedby={DESCRIPTION_ID}
        onClick={(e) => e.stopPropagation()}
      >
        <IconButton
          variant="secondary"
          size="sm"
          label="Close"
          className={styles.close}
          onClick={onClose}
        >
          <X size={14} weight="bold" />
        </IconButton>

        <div className={styles.gridArea}>
          <div className={styles.codeRow}>
            <div className={styles.codeInput}>
              <code className={styles.codeText}>{code}</code>
            </div>
            <IconButton
              variant="accent"
              size="md"
              label={copied ? "Command copied" : "Copy command"}
              onClick={handleCopy}
            >
              {copied ? <Check size={14} weight="bold" /> : <Copy size={14} weight="bold" />}
            </IconButton>
          </div>
        </div>

        <div className={styles.body}>
          <div id={TITLE_ID} className={styles.title}>Install {surfaceName}</div>
          <p className={styles.hint}>Paste this into your terminal to install.</p>
          <p id={DESCRIPTION_ID} className={styles.description}>
            {description}
          </p>
        </div>
      </div>
    </div>,
    document.body
  );
}
