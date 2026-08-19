"use client";

import { useState } from "react";
import { SettingsForm } from "@/components/ui/SettingsForm";
import { StateToggle } from "../state-toggle";
import styles from "../demo.module.css";

const workspaces = ["advertiser", "platform"] as const;

const advertiserAccount = { name: "Sam Rivera", email: "sam@example.com", company: "Kili" };
const platformAccount = { name: "Jess Lin", email: "jess@example.com", company: "Kili" };

export default function SettingsFormPage() {
  const [workspace, setWorkspace] = useState<(typeof workspaces)[number]>("advertiser");
  const [advertiserAcc, setAdvertiserAcc] = useState(advertiserAccount);
  const [platformAcc, setPlatformAcc] = useState(platformAccount);
  const [advertiserToggles, setAdvertiserToggles] = useState({
    budgetExhausting: true,
    adRejected: true,
  });
  const [platformToggles, setPlatformToggles] = useState({
    integrationErrors: true,
    missingPayoutMethod: true,
  });

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Settings Form</h1>
      <p className={styles.subtitle}>
        Account info Form Fields + notification Switches, assembled. Account
        info is the same shape on both sides — the notification toggles are
        different per workspace and built into the component (not
        caller-defined), same pattern as History Table&apos;s{" "}
        <code>type</code> prop.
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
            toggleValues={advertiserToggles}
            onToggleChange={(key, checked) =>
              setAdvertiserToggles((prev) => ({ ...prev, [key]: checked }))
            }
            onSave={() => console.log("save advertiser settings")}
          />
        ) : (
          <SettingsForm
            workspace="platform"
            account={platformAcc}
            onAccountChange={setPlatformAcc}
            toggleValues={platformToggles}
            onToggleChange={(key, checked) =>
              setPlatformToggles((prev) => ({ ...prev, [key]: checked }))
            }
            onSave={() => console.log("save platform settings")}
          />
        )}
      </div>
    </div>
  );
}
