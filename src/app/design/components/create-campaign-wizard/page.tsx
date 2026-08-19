"use client";

import { CreateCampaignWizard, type CampaignDraft } from "@/components/ui/CreateCampaignWizard";
import styles from "../demo.module.css";

export default function CreateCampaignWizardPage() {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Create Campaign Wizard</h1>
      <p className={styles.subtitle}>
        The full 3-step flow: Ad content → Budget &amp; time duration →
        Final review. Stepper up top, Back/Next/Launch at the bottom —
        Launch uses Accent since it&apos;s the campaign&apos;s primary
        conversion moment.
      </p>

      <div className={styles.section}>
        <CreateCampaignWizard
          onLaunch={(draft: CampaignDraft) => console.log("launch", draft)}
          onCancel={() => console.log("cancel")}
        />
      </div>
    </div>
  );
}
