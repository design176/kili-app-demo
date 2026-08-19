"use client";

import { useState } from "react";
import { Button, type ButtonProps } from "@/components/ui/Button";
import { StateToggle } from "../state-toggle";
import styles from "./button-demo.module.css";

const states = ["default", "hover", "active"] as const;
type State = (typeof states)[number];

export function ButtonPreview({
  variant,
  size,
  disabled,
}: {
  variant: ButtonProps["variant"];
  size: ButtonProps["size"];
  disabled?: boolean;
}) {
  const [state, setState] = useState<State>("default");

  return (
    <div className={styles.cell}>
      <Button
        variant={variant}
        size={size}
        disabled={disabled}
        forceState={state === "default" ? undefined : state}
      >
        Label
      </Button>
      {!disabled && (
        <StateToggle options={states} value={state} onChange={setState} />
      )}
    </div>
  );
}
