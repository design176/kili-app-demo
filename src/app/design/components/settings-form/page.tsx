"use client";

import { useState } from "react";
import { SettingsForm } from "@/components/ui/SettingsForm";
import { StateToggle } from "../state-toggle";
import styles from "../demo.module.css";

const workspaces = ["advertiser", "developer"] as const;

const advertiserAccount = { name: "Sam Rivera", email: "sam@example.com", company: "Kili" };
const developerAccount = { name: "Jess Lin", email: "jess@example.com", company: "Kili" };

export default function SettingsFormPage() {
  const [workspace, setWorkspace] = useState<(typeof workspaces)[number]>("advertiser");
  const [advertiserAcc, setAdvertiserAcc] = useState(advertiserAccount);
  const [developerAcc, setDeveloperAcc] = useState(developerAccount);

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Settings Form</h1>
      <p className={styles.subtitle}>
        Account info Form Fields, assembled. Same shape on both workspaces —
        the <code>workspace</code> prop is kept for future per-workspace
        sections.
      </p>

      <div className={styles.section}>
        <div className={styles.row}>
          <StateToggle options={workspaces} value={workspace} onChange={setWorkspace} />
        </div>
      </div>

      <div className={styles.section}>
        {workspace === "advertiser" ? (
          <SettingsForm
            workspace="advertiser"
            account={advertiserAcc}
            onAccountChange={setAdvertiserAcc}
            onSave={() => console.log("save advertiser settings")}
          />
        ) : (
          <SettingsForm
            workspace="developer"
            account={developerAcc}
            onAccountChange={setDeveloperAcc}
            onSave={() => console.log("save developer settings")}
          />
        )}
      </div>
    </div>
  );
}
