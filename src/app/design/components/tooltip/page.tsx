"use client";

import { useState } from "react";
import { Tooltip } from "@/components/ui/Tooltip";
import { Badge } from "@/components/ui/Badge";
import { StateToggle } from "../state-toggle";
import styles from "../demo.module.css";

const states = ["hidden", "shown"] as const;

export default function TooltipPage() {
  const [state, setState] = useState<(typeof states)[number]>("hidden");

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Tooltip</h1>
      <p className={styles.subtitle}>
        Portaled to <code>document.body</code> so it can&apos;t be clipped by
        a scrolling/overflow container (the bug that motivated it on the IA
        page). Defaults to a small &quot;i&quot; info trigger, or wraps any
        element you pass as children.
      </p>

      <div className={styles.section}>
        <div className={styles.sectionTitle}>Default trigger</div>
        <div className={styles.row}>
          <div className={styles.cell}>
            <Tooltip
              text="Shown forced open for inspection, without real hover."
              forceOpen={state === "shown"}
            />
            <StateToggle options={states} value={state} onChange={setState} />
          </div>
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionTitle}>Wrapping a custom trigger</div>
        <div className={styles.row}>
          <Tooltip text="Draft campaigns are saved but not yet launched.">
            <Badge tone="neutral">Draft</Badge>
          </Tooltip>
        </div>
      </div>
    </div>
  );
}
