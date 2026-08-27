"use client";

import { useState } from "react";
import { DashboardShell } from "@/components/dashboard-shell";
import { SettingsForm, type AccountInfo } from "@/components/ui/SettingsForm";
import { HelpModal } from "@/components/ui/HelpModal";
import { useDeveloperTour } from "@/components/developer-tour-provider";
import { openBugReportForm } from "@/lib/tally";

export default function DeveloperSettingsPage() {
  const { replayTour } = useDeveloperTour();
  const [account, setAccount] = useState<AccountInfo>({
    name: "Sam Rivera",
    email: "sam@acme.com",
    company: "Acme Inc.",
  });
  const [helpOpen, setHelpOpen] = useState(false);
  return (
    <DashboardShell
      activeKey="settings"
      pageTitle="Settings"
      pageDescription="Account details."
    >
      <div style={{ maxWidth: 520, width: "100%", margin: "0 auto" }}>
        <SettingsForm
          workspace="developer"
          account={account}
          onAccountChange={setAccount}
          onSave={() => console.log("Settings saved", account)}
          onHelpClick={() => setHelpOpen(true)}
        />
      </div>

      <HelpModal
        open={helpOpen}
        onClose={() => setHelpOpen(false)}
        onWatchWalkthrough={() => {
          setHelpOpen(false);
          replayTour();
        }}
        onReportBug={() => {
          setHelpOpen(false);
          openBugReportForm();
        }}
      />
    </DashboardShell>
  );
}
