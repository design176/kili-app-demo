"use client";

import { createPortal } from "react-dom";
import { X } from "@phosphor-icons/react";
import { Button } from "./Button";
import { IconButton } from "./IconButton";
import type { PayoutMethod } from "@/components/demo-state";
import styles from "./SwitchPayoutMethodModal.module.css";

export type SwitchPayoutMethodModalProps = {
  open: boolean;
  /** The payout method being switched to. */
  target: PayoutMethod | null;
  onCancel: () => void;
  onConfirm: () => void;
};

const METHOD_LABEL: Record<PayoutMethod, string> = {
  wallet: "EVM wallet",
  stripe: "Stripe",
};

export function SwitchPayoutMethodModal({
  open,
  target,
  onCancel,
  onConfirm,
}: SwitchPayoutMethodModalProps) {
  if (!open || !target || typeof document === "undefined") return null;

  return createPortal(
    <div className={styles.backdrop} onClick={onCancel}>
      <div className={styles.card} onClick={(e) => e.stopPropagation()}>
        <IconButton
          variant="secondary"
          size="sm"
          label="Close"
          className={styles.close}
          onClick={onCancel}
        >
          <X size={14} weight="bold" />
        </IconButton>

        <div className={styles.title}>Switch to {METHOD_LABEL[target]}?</div>
        <p className={styles.description}>Both payout methods require a min $20 balance.</p>

        <ul className={styles.comparison}>
          <li className={styles.comparisonItem}>
            <span className={styles.comparisonDot} />
            <span>
              <span className={styles.comparisonLabel}>Stripe:</span> automatic payments every 15
              days
            </span>
          </li>
          <li className={styles.comparisonItem}>
            <span className={styles.comparisonDot} />
            <span>
              <span className={styles.comparisonLabel}>EVM wallet:</span> instant payment in a
              single click
            </span>
          </li>
        </ul>

        <hr className={styles.divider} />

        <div className={styles.actions}>
          <Button variant="secondary" size="md" onClick={onCancel}>
            Cancel
          </Button>
          <Button variant="primary" size="md" onClick={onConfirm}>
            Switch
          </Button>
        </div>
      </div>
    </div>,
    document.body
  );
}
