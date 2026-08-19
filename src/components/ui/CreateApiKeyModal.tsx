"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import { Badge } from "./Badge";
import { FormField } from "./FormField";
import { Select } from "./Select";
import { Button } from "./Button";
import type { PlacementStyle } from "@/components/demo-state";
import styles from "./CreateApiKeyModal.module.css";

export const placements: { value: PlacementStyle; label: string; description: string }[] = [
  { value: "above", label: "Above response", description: "Ad shows before the AI's answer begins." },
  { value: "below", label: "Below response", description: "Ad shows after the AI's answer finishes." },
  { value: "inline", label: "Inline with response", description: "Ad is woven into the response content." },
  { value: "loading", label: "During generation loading", description: "Ad shows while the response is generating." },
];

export const placementLabels: Record<PlacementStyle, string> = placements.reduce(
  (acc, p) => ({ ...acc, [p.value]: p.label }),
  {} as Record<PlacementStyle, string>
);

export const frequencyOptions = [
  { value: "1", label: "Every response" },
  { value: "3", label: "Every 3 responses" },
  { value: "5", label: "Every 5 responses" },
  { value: "10", label: "Every 10 responses" },
];

export const frequencyLabels: Record<string, string> = frequencyOptions.reduce(
  (acc, f) => ({ ...acc, [f.value]: f.label }),
  {} as Record<string, string>
);

export type CreateApiKeyModalProps = {
  open: boolean;
  onClose: () => void;
  onCreate: (placement: PlacementStyle, frequency: string) => void;
};

export function CreateApiKeyModal({ open, onClose, onCreate }: CreateApiKeyModalProps) {
  const [selected, setSelected] = useState<PlacementStyle>("below");
  const [frequency, setFrequency] = useState("3");

  if (!open || typeof document === "undefined") return null;

  const handleCreate = () => {
    onCreate(selected, frequency);
    onClose();
  };

  return createPortal(
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.card} onClick={(e) => e.stopPropagation()}>
        <div className={styles.title}>Create API key</div>
        <p className={styles.description}>
          Choose where ads appear for requests made with this key.
        </p>

        <div className={styles.optionList}>
          {placements.map((option) => (
            <button
              key={option.value}
              type="button"
              className={`${styles.option} ${selected === option.value ? styles.optionSelected : ""}`}
              onClick={() => setSelected(option.value)}
            >
              <div className={styles.optionHead}>
                <span className={styles.optionLabel}>{option.label}</span>
                {selected === option.value && <Badge tone="brand">Selected</Badge>}
              </div>
              <span className={styles.optionDescription}>{option.description}</span>
            </button>
          ))}
        </div>

        <FormField label="Frequency cap">
          <Select options={frequencyOptions} value={frequency} onChange={setFrequency} />
        </FormField>

        <div className={styles.actions}>
          <Button variant="secondary" size="md" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" size="md" onClick={handleCreate}>
            Create key
          </Button>
        </div>
      </div>
    </div>,
    document.body
  );
}
