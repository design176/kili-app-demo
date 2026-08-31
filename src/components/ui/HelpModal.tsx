"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Check, Copy, DiscordLogo, X } from "@phosphor-icons/react";
import { Button } from "./Button";
import { IconButton } from "./IconButton";
import styles from "./HelpModal.module.css";

const SUPPORT_EMAIL = "support@trykili.ai";
const TITLE_ID = "help-modal-title";
const DESCRIPTION_ID = "help-modal-description";

export type HelpModalProps = {
  open: boolean;
  onClose: () => void;
  onWatchWalkthrough: () => void;
  onReportBug: () => void;
  onJoinDiscord: () => void;
};

export function HelpModal({
  open,
  onClose,
  onWatchWalkthrough,
  onReportBug,
  onJoinDiscord,
}: HelpModalProps) {
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
  }, [open, onClose]);

  useEffect(
    () => () => {
      if (copyResetTimer.current) clearTimeout(copyResetTimer.current);
    },
    []
  );

  if (!open || typeof document === "undefined") return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(SUPPORT_EMAIL);
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
          variant="primary"
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
              <code className={styles.codeText}>{SUPPORT_EMAIL}</code>
            </div>
            <IconButton
              variant="accent"
              size="md"
              label={copied ? "Support email copied" : "Copy support email"}
              onClick={handleCopy}
            >
              {copied ? <Check size={14} weight="bold" /> : <Copy size={14} weight="bold" />}
            </IconButton>
          </div>
          <Button
            variant="primary"
            size="md"
            className={styles.discordButton}
            onClick={onJoinDiscord}
          >
            <DiscordLogo size={16} weight="fill" />
            Join Discord
          </Button>
        </div>

        <div className={styles.body}>
          <div id={TITLE_ID} className={styles.title}>Need help?</div>
          <p id={DESCRIPTION_ID} className={styles.description}>
            Replay the walkthrough, or let us know if something&apos;s broken.
          </p>
          <div className={styles.actions}>
            <Button variant="secondary" size="md" onClick={onWatchWalkthrough}>
              Watch walkthrough
            </Button>
            <Button variant="secondary" size="md" onClick={onReportBug}>
              Report a bug
            </Button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
