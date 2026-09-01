"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import { X } from "@phosphor-icons/react";
import { Button } from "./Button";
import { FormField } from "./FormField";
import { IconButton } from "./IconButton";
import { Input } from "./Input";
import { WalletIllustration } from "./TourIllustrations";
import styles from "./WalletAddressModal.module.css";

export type WalletAddressModalProps = {
  open: boolean;
  initialAddress?: string;
  onClose: () => void;
  onSave: (address: string) => void;
};

export function WalletAddressModal({
  open,
  initialAddress = "",
  onClose,
  onSave,
}: WalletAddressModalProps) {
  const [address, setAddress] = useState(initialAddress);
  const [touched, setTouched] = useState(false);

  if (!open || typeof document === "undefined") return null;

  const trimmed = address.trim();
  const canSave = trimmed.length > 0;

  const handleSave = () => {
    if (!canSave) {
      setTouched(true);
      return;
    }
    onSave(trimmed);
  };

  return createPortal(
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.card} onClick={(e) => e.stopPropagation()}>
        <div className={styles.illustration}>
          <IconButton
            variant="secondary"
            size="sm"
            label="Close"
            className={styles.close}
            onClick={onClose}
          >
            <X size={14} weight="bold" />
          </IconButton>
          <WalletIllustration />
        </div>

        <div className={styles.title}>Payout method</div>
        <p className={styles.description}>Where should we send your payouts?</p>

        {initialAddress && (
          <FormField label="Current address" className={styles.currentField}>
            <Input value={initialAddress} disabled />
          </FormField>
        )}

        <FormField
          label={initialAddress ? "New wallet address" : "EVM wallet address"}
          error={touched && !canSave}
          helperText={touched && !canSave ? "Enter a wallet address." : undefined}
        >
          <Input
            placeholder="0x…"
            value={address}
            error={touched && !canSave}
            onChange={(e) => setAddress(e.target.value)}
          />
        </FormField>

        <div className={styles.actions}>
          <Button variant="secondary" size="md" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" size="md" onClick={handleSave}>
            Save
          </Button>
        </div>
      </div>
    </div>,
    document.body
  );
}
