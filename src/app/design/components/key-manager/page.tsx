"use client";

import { useState } from "react";
import { Plug } from "@phosphor-icons/react/dist/ssr";
import { KeyManager } from "@/components/ui/KeyManager";
import { Switch } from "@/components/ui/Switch";
import type { ApiKeyEntry } from "@/components/demo-state";
import styles from "../demo.module.css";

let nextId = 1;

export default function KeyManagerPage() {
  const [keys, setKeys] = useState<ApiKeyEntry[]>([]);
  const [loading, setLoading] = useState(false);

  const handleCreate = (): ApiKeyEntry => {
    const entry: ApiKeyEntry = {
      id: `demo_${nextId}`,
      name: `Key ${keys.length + 1}`,
      value: `kili_live_${Math.random().toString(36).slice(2, 18)}`,
    };
    nextId += 1;
    setKeys((prev) => [...prev, entry]);
    return entry;
  };

  const handleRemove = (id: string) => {
    setKeys((prev) => prev.filter((k) => k.id !== id));
  };

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Key Manager</h1>
      <p className={styles.subtitle}>
        Create-key flow: header (title, description, primary &quot;Create&quot;
        button) above either a Table of existing keys (masked value, delete
        row action) or an Empty State. Clicking Create reveals the new key&apos;s
        full value once, in a Card with a Copy Field + &quot;Copy key&quot;/&quot;Done&quot;
        actions — after Done, it drops back to the table showing only the
        masked value. Used for Platform Integration&apos;s API keys and
        Advertiser Pixel Setup&apos;s pixel keys.
      </p>

      <div className={styles.section}>
        <div className={styles.sectionTitle}>Loading</div>
        <div className={styles.row} style={{ alignItems: "center", gap: 8 }}>
          <Switch checked={loading} onCheckedChange={setLoading} />
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionTitle}>
          Interactive — click Create, copy/Done, then delete a row
        </div>
        <KeyManager
          title="API keys"
          description="The snippet below authenticates with one of these. Revoking a key stops requests from any product still using it."
          createLabel="Create API key"
          emptyIcon={<Plug size={20} weight="bold" />}
          emptyTitle="No API keys yet"
          emptyDescription="Create a key to start authenticating requests from your product."
          keys={keys}
          onCreate={handleCreate}
          onRemove={handleRemove}
          loading={loading}
        />
      </div>
    </div>
  );
}
