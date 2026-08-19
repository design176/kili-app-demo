"use client";

import { useState } from "react";
import { Eye, Target, XCircle } from "@phosphor-icons/react";
import { DashboardShell } from "@/components/dashboard-shell";
import { Card } from "@/components/ui/Card";
import { KPIStrip } from "@/components/ui/KPIStrip";
import { Tabs } from "@/components/ui/Tabs";
import { CopyField } from "@/components/ui/CopyField";
import { FormField } from "@/components/ui/FormField";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useDemoState } from "@/components/demo-state";
import styles from "./pixel-tracking.module.css";

const SNIPPET = `<script src="https://cdn.kili.ai/pixel.js" data-account="acct_8fj29d"></script>`;

const platforms = [
  { value: "html", label: "HTML" },
  { value: "shopify", label: "Shopify" },
  { value: "react", label: "React" },
  { value: "nextjs", label: "Next.js" },
  { value: "wordpress", label: "WordPress" },
  { value: "webflow", label: "Webflow" },
  { value: "framer", label: "Framer" },
];

export default function PixelTrackingPage() {
  const { isNewUser, forceEmptyStates } = useDemoState();
  const isEmpty = forceEmptyStates || isNewUser;
  const [platform, setPlatform] = useState("html");
  const [verifyUrl, setVerifyUrl] = useState("");
  const [verifyAttempted, setVerifyAttempted] = useState(false);

  return (
    <DashboardShell
      activeKey="pixel"
      pageTitle="Pixel Tracking"
      pageDescription="Install and verify the tracking snippet on your site."
    >
      <KPIStrip
        tiles={[
          {
            icon: <Eye size={16} weight="bold" />,
            label: "Page visits",
            value: isEmpty ? "0" : "12,480",
            description: "Visits to your site attributed to a Kili ad click.",
          },
          {
            icon: <Target size={16} weight="bold" />,
            label: "Conversions",
            value: isEmpty ? "0" : "318",
            description: "Visits that reached your defined conversion URL.",
          },
        ]}
      />

      <Card>
        <div className={styles.sectionTitle}>Install snippet</div>
        <p className={styles.sectionDescription}>
          Add this to the &lt;head&gt; of every page on your site, just before the closing &lt;/head&gt; tag.
        </p>

        <div className={styles.platformLabel}>Select your platform</div>
        <Tabs items={platforms} value={platform} onChange={setPlatform} size="sm" />

        <div className={styles.snippetWrap}>
          <CopyField value={SNIPPET} />
        </div>
      </Card>

      <Card>
        <div className={styles.sectionTitle}>Verify installation</div>
        <p className={styles.sectionDescription}>
          Check that the pixel is firing on a live page.
        </p>
        <div className={styles.form}>
          <FormField label="Page URL">
            <div className={styles.verifyRow}>
              <Input
                placeholder="example.com"
                value={verifyUrl}
                onChange={(e) => setVerifyUrl(e.target.value)}
              />
              <Button
                variant="secondary"
                onClick={() => {
                  console.log("Verify pixel install", verifyUrl);
                  setVerifyAttempted(true);
                }}
              >
                Open & verify
              </Button>
            </div>
          </FormField>
          {verifyAttempted && (
            <div className={styles.verifyStatus}>
              <XCircle size={16} weight="bold" />
              No events yet. Make sure the snippet is installed and the page is live, then verify again.
            </div>
          )}
        </div>
      </Card>
    </DashboardShell>
  );
}
