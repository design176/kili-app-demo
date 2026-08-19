"use client";

import { useState } from "react";
import { DashboardShell } from "@/components/dashboard-shell";
import { SettingsForm, type AccountInfo } from "@/components/ui/SettingsForm";

export default function AdvertiserSettingsPage() {
  const [account, setAccount] = useState<AccountInfo>({
    name: "Sam Rivera",
    email: "sam@acme.com",
    company: "Acme Inc.",
  });
  const [toggleValues, setToggleValues] = useState<Record<string, boolean>>({
    budgetExhausting: true,
    adRejected: true,
    integrationErrors: true,
    missingPayoutMethod: true,
  });

  return (
    <DashboardShell
      activeKey="settings"
      pageTitle="Settings"
      pageDescription="Account details and notification preferences."
    >
      <div style={{ maxWidth: 520, width: "100%", margin: "0 auto" }}>
        <SettingsForm
          workspace="advertiser"
          account={account}
          onAccountChange={setAccount}
          toggleValues={toggleValues}
          onToggleChange={(key, checked) => setToggleValues((v) => ({ ...v, [key]: checked }))}
          onSave={() => console.log("Settings saved", account, toggleValues)}
        />
      </div>
    </DashboardShell>
  );
}
