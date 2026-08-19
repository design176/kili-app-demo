"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import { Button } from "./Button";
import { FormField } from "./FormField";
import { Input } from "./Input";
import styles from "./AddBalanceModal.module.css";

const MIN_AMOUNT = 100;
const QUICK_AMOUNTS = [200, 500, 1000, 2000];

export type AddBalanceModalProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: (amount: number) => void;
};

export function AddBalanceModal({ open, onClose, onConfirm }: AddBalanceModalProps) {
  const [amount, setAmount] = useState("");
  const [touched, setTouched] = useState(false);

  if (!open || typeof document === "undefined") return null;

  const numericAmount = Number(amount.replace(/[^0-9.]/g, ""));
  const belowMin = amount !== "" && numericAmount < MIN_AMOUNT;
  const canConfirm = numericAmount >= MIN_AMOUNT;

  const close = () => {
    setAmount("");
    setTouched(false);
    onClose();
  };

  const handleConfirm = () => {
    if (!canConfirm) {
      setTouched(true);
      return;
    }
    onConfirm(numericAmount);
    close();
  };

  return createPortal(
    <div className={styles.backdrop} onClick={close}>
      <div className={styles.card} onClick={(e) => e.stopPropagation()}>
        <div className={styles.title}>Add balance</div>
        <p className={styles.description}>Top up your account so campaigns can keep running.</p>

        <FormField
          label="Amount"
          error={touched && belowMin}
          helperText={touched && belowMin ? `Minimum add amount is $${MIN_AMOUNT}.` : undefined}
        >
          <Input
            placeholder="$100"
            value={amount}
            error={touched && belowMin}
            onChange={(e) => setAmount(e.target.value)}
          />
        </FormField>

        <div className={styles.quickAmounts}>
          {QUICK_AMOUNTS.map((value) => (
            <button
              key={value}
              type="button"
              className={`${styles.pill} ${numericAmount === value ? styles.pillActive : ""}`}
              onClick={() => {
                setAmount(String(value));
                setTouched(false);
              }}
            >
              ${value.toLocaleString()}
            </button>
          ))}
        </div>

        <div className={styles.actions}>
          <Button variant="secondary" size="md" onClick={close}>
            Cancel
          </Button>
          <Button variant="primary" size="md" onClick={handleConfirm}>
            Add
          </Button>
        </div>
      </div>
    </div>,
    document.body
  );
}
