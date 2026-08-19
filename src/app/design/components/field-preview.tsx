"use client";

import { useState, type ReactNode } from "react";
import { StateToggle } from "./state-toggle";
import styles from "./demo.module.css";

export function FieldPreview<T extends string>({
  states,
  render,
  center,
}: {
  states: readonly T[];
  /** First entry in `states` (the unforced baseline, e.g. "default") never reaches `render` — it comes through as `undefined`. */
  render: (forceState: Exclude<T, T[0]> | undefined) => ReactNode;
  center?: boolean;
}) {
  const [state, setState] = useState<T>(states[0]);
  const forced = state === states[0] ? undefined : (state as Exclude<T, T[0]>);

  return (
    <div className={`${styles.cell} ${center ? styles.cellCenter : ""}`}>
      {render(forced)}
      <StateToggle options={states} value={state} onChange={setState} />
    </div>
  );
}
