"use client";

import { useEffect, useState } from "react";
import { DashboardShell } from "@/components/dashboard-shell";
import { SettingsForm, type AccountInfo } from "@/components/ui/SettingsForm";
import { useDemoState } from "@/components/demo-state";

export default function AdvertiserSettingsPage() {
  const [account, setAccount] = useState<AccountInfo>({
    name: "Sam Rivera",
    email: "sam@acme.com",
    company: "Acme Inc.",
  });
  const { companyLogoUrl, setCompanyLogoUrl } = useDemoState();
  const [logoUrlDraft, setLogoUrlDraft] = useState(companyLogoUrl ?? "");

  useEffect(() => {
    setLogoUrlDraft(companyLogoUrl ?? "");
  }, [companyLogoUrl]);

  const handleSave = () => {
    console.log("Settings saved", account);
    if (logoUrlDraft.trim() !== "") setCompanyLogoUrl(logoUrlDraft.trim());
  };

  return (
    <DashboardShell
      activeKey="settings"
      pageTitle="Settings"
      pageDescription="Account details."
    >
      <div style={{ maxWidth: 520, width: "100%", margin: "0 auto" }}>
        <SettingsForm
          workspace="advertiser"
          account={account}
          onAccountChange={setAccount}
          companyLogoUrl={logoUrlDraft}
          onCompanyLogoUrlChange={setLogoUrlDraft}
          onSave={handleSave}
        />
      </div>
    </DashboardShell>
  );
}
