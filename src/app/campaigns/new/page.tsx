"use client";

import { useRouter } from "next/navigation";
import { DashboardShell } from "@/components/dashboard-shell";
import { CreateCampaignWizard, type CampaignDraft } from "@/components/ui/CreateCampaignWizard";
import { useDemoState } from "@/components/demo-state";

export default function NewCampaignPage() {
  const router = useRouter();
  const { balance } = useDemoState();

  const handleLaunch = (draft: CampaignDraft) => {
    console.log("Campaign launched", draft);
    router.push("/campaigns/camp_6");
  };

  const handleAddBalance = (draft: CampaignDraft) => {
    console.log("Draft saved, redirecting to billing", draft);
    router.push("/billing");
  };

  return (
    <DashboardShell
      activeKey="campaigns"
      pageTitle="Create Campaign"
      pageDescription="Set up your ad content, budget, and schedule."
      breadcrumb="Campaigns"
      onBack={() => router.push("/campaigns")}
    >
      <div style={{ maxWidth: 480, width: "100%", margin: "0 auto" }}>
        <CreateCampaignWizard
          balance={balance}
          onLaunch={handleLaunch}
          onCancel={() => router.push("/campaigns")}
          onAddBalance={handleAddBalance}
        />
      </div>
    </DashboardShell>
  );
}
