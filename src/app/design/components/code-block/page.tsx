"use client";

import { CodeBlock } from "@/components/ui/CodeBlock";
import styles from "../demo.module.css";

export default function CodeBlockPage() {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Code Block</h1>
      <p className={styles.subtitle}>
        A labeled Copy Field — small heading above the value. Used to stack
        multiple related snippets (install command, setup, usage) on Pixel
        Tracking and Platform Integration.
      </p>

      <div className={styles.section}>
        <div className={styles.sectionTitle}>Single line</div>
        <CodeBlock
          label="Install"
          value="npm install @cherry_ai/react"
          className={styles.stepperWidth}
        />
      </div>

      <div className={styles.section}>
        <div className={styles.sectionTitle}>Multiline</div>
        <CodeBlock
          label="Environment"
          multiline
          value={`import { CherryContext } from "@cherry_ai/api";\n\nconst cherryContext = new CherryContext().collect({\n  sessionId: chatSession.id,\n});`}
        />
      </div>
    </div>
  );
}
