"use client";

import { useState } from "react";
import { ArrowSquareOut, Eye, Target, XCircle } from "@phosphor-icons/react";
import { DashboardShell } from "@/components/dashboard-shell";
import { Card } from "@/components/ui/Card";
import { KPIStrip } from "@/components/ui/KPIStrip";
import { Tabs } from "@/components/ui/Tabs";
import { Select } from "@/components/ui/Select";
import { CopyField } from "@/components/ui/CopyField";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { FormField } from "@/components/ui/FormField";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useDemoState } from "@/components/demo-state";
import styles from "./pixel-tracking.module.css";

const REACT_DOCS_URL = "https://www.npmjs.com/package/@cherry_ai/react";

const LEGACY_SNIPPET = `<script src="https://cdn.kili.ai/pixel.js" data-account="acct_8fj29d"></script>`;

const USAGE_SNIPPET = `import { CherryAd } from "@cherry_ai/react";
import "@cherry_ai/react/styles.css";

export function ResponseAds({ ads }: { ads: Array<{ adText: string; adId?: string; placement: string; placementId: string }> }) {
  return (
    <>
      {ads.map((ad) => (
        <CherryAd
          key={ad.placementId}
          ad={ad}
          sessionId={chatSession.id}
          fallback={null}
        />
      ))}
    </>
  );
}`;

const platforms = [
  { value: "react", label: "React" },
  { value: "nextjs", label: "Next.js" },
  { value: "html", label: "HTML" },
  { value: "shopify", label: "Shopify" },
  { value: "wordpress", label: "WordPress" },
  { value: "webflow", label: "Webflow" },
  { value: "framer", label: "Framer" },
];

export default function PixelTrackingPage() {
  const { isNewUser, forceEmptyStates, forceLoadingStates } = useDemoState();
  const isEmpty = forceEmptyStates || isNewUser;
  const [platform, setPlatform] = useState("react");
  const [verifyUrl, setVerifyUrl] = useState("");
  const [verifyAttempted, setVerifyAttempted] = useState(false);

  const isReactFamily = platform === "react" || platform === "nextjs";

  return (
    <DashboardShell
      activeKey="pixel"
      pageTitle="Pixel Tracking"
      pageDescription="Install @cherry_ai/react and verify ads are rendering on your site."
    >
      <KPIStrip
        loading={forceLoadingStates}
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
        <div className={styles.cardHeader}>
          <div>
            <div className={styles.sectionTitle}>Install snippet</div>
            <p className={styles.sectionDescription}>
              {isReactFamily
                ? "Install the package and render CherryAd wherever you show a chat response."
                : "Add this to the <head> of every page on your site, just before the closing </head> tag."}
            </p>
          </div>
          <Button
            variant="secondary"
            size="sm"
            className={styles.docsButton}
            onClick={() => window.open(REACT_DOCS_URL, "_blank", "noopener,noreferrer")}
          >
            <ArrowSquareOut size={14} weight="bold" />
            View docs
          </Button>
        </div>

        <div className={styles.platformLabel}>Select your platform</div>
        <Tabs
          items={platforms}
          value={platform}
          onChange={setPlatform}
          size="sm"
          className={styles.platformTabs}
        />
        <Select
          options={platforms}
          value={platform}
          onChange={setPlatform}
          className={styles.platformSelect}
        />

        {isReactFamily ? (
          <div className={styles.snippetStack}>
            <CodeBlock label="Install" value="npm install @cherry_ai/react" />
            <CodeBlock label="Import styles" value={`import "@cherry_ai/react/styles.css";`} />
            <CodeBlock label="Render an ad" multiline value={USAGE_SNIPPET} />
          </div>
        ) : (
          <div className={styles.snippetWrap}>
            <CopyField value={LEGACY_SNIPPET} />
          </div>
        )}
      </Card>

      <Card>
        <div className={styles.sectionTitle}>Verify installation</div>
        <p className={styles.sectionDescription}>
          Check that ads are rendering on a live page.
        </p>
        <div className={styles.form}>
          <FormField label="Page URL">
            <div className={styles.verifyRow}>
              <Input
                placeholder="example.com"
                value={verifyUrl}
                onChange={(e) => setVerifyUrl(e.target.value)}
              />
              <Button variant="secondary" onClick={() => setVerifyAttempted(true)}>
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
