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
        An &quot;Appearance&quot; section (Theme Mode Toggle — Light/Dark/Auto)
        always comes first, divided from Account info below it. Email is
        always the first field and is disabled/read-only; Name and Company
        stay editable. Same shape on both workspaces — the{" "}
        <code>workspace</code> prop is kept for future per-workspace
        sections. Passing <code>onHelpClick</code> (developer workspace)
        renders a right-aligned &quot;Help&quot; button next to &quot;Account
        info&quot; to replay the developer walkthrough.
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
            onHelpClick={() => console.log("replay walkthrough")}
          />
        )}
      </div>
    </div>
  );
}
