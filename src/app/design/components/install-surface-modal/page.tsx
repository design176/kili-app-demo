"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { InstallSurfaceModal } from "@/components/ui/InstallSurfaceModal";
import styles from "../demo.module.css";

export default function InstallSurfaceModalPage() {
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Install Surface Modal</h1>
      <p className={styles.subtitle}>
        Opened from an inactive Surface card&apos;s &quot;Install&quot; button — a
        grid-background top section shows the install command in a
        copy-to-clipboard input, matching the code step of the developer
        walkthrough (Tour Coachmark).
      </p>

      <div className={styles.section}>
        <div className={styles.sectionTitle}>Try it</div>
        <Button variant="secondary" onClick={() => setOpen(true)}>
          Install
        </Button>
      </div>

      <InstallSurfaceModal
        open={open}
        surfaceName="Claude Code"
        description="View ads in Claude Code CLI in your terminal and VS Code, and get paid for views."
        code="npx -y @kili-ai/install"
        onClose={() => setOpen(false)}
      />
    </div>
  );
}
