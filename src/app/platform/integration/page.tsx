"use client";

import { useState } from "react";
import { ArrowSquareOut, Plus, Plug, Copy, Check, TrashSimple } from "@phosphor-icons/react";
import { DashboardShell } from "@/components/dashboard-shell";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { IconButton } from "@/components/ui/IconButton";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { Tabs } from "@/components/ui/Tabs";
import { EmptyState } from "@/components/ui/EmptyState";
import { Table, type TableColumn } from "@/components/ui/Table";
import { useDemoState, type ApiKeyEntry } from "@/components/demo-state";
import styles from "./integration.module.css";

const API_DOCS_URL = "https://www.npmjs.com/package/@cherry_ai/api";

const CLIENT_SNIPPET = `import { CherryContext } from "@cherry_ai/api";

const cherryContext = new CherryContext().collect({
  sessionId: chatSession.id,
  user: { userId: currentUser.id },
});

fetch("/api/chat", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ messages, cherryContext }),
});`;

const SERVER_SNIPPETS: Record<string, string> = {
  node: `import { Cherry, CherryError } from "@cherry_ai/api";

const cherry = new Cherry({ apiKey: process.env.CHERRY_API_KEY! });

app.post("/api/chat", async (req, res) => {
  const { messages } = req.body;

  const adPromise = cherry
    .getAds(req, messages, [
      { placement: "below_response", placementId: "main" },
    ])
    .catch((error) => {
      if (error instanceof CherryError) {
        return { ads: [] };
      }
      throw error;
    });

  // stream your LLM response...

  const { ads } = await adPromise;
  res.write(\`data: \${JSON.stringify({ type: "done", ads })}\\n\\n\`);
  res.end();
});`,
  nextjs: `import { Cherry } from "@cherry_ai/api";

const cherry = new Cherry({ apiKey: process.env.CHERRY_API_KEY! });

export async function POST(request: Request) {
  const body = await request.json();
  try {
    const { ads } = await cherry.getAds(
      { body, headers: Object.fromEntries(request.headers) },
      body.messages,
      [{ placement: "below_response", placementId: "main" }],
    );
    return Response.json({ ads });
  } catch {
    return Response.json({ ads: [] });
  }
}`,
};

const frameworks = [
  { value: "node", label: "Node" },
  { value: "nextjs", label: "Next.js" },
];

function KeyOptionsCell({ value, onDelete }: { value: string; onDelete: () => void }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className={styles.keyOptionsCell}>
      <IconButton variant="ghost" size="sm" label="Copy" onClick={handleCopy}>
        {copied ? <Check size={13} weight="bold" /> : <Copy size={13} weight="bold" />}
      </IconButton>
      <IconButton variant="ghost" size="sm" dangerHover label="Delete key" onClick={onDelete}>
        <TrashSimple size={14} weight="bold" />
      </IconButton>
    </div>
  );
}

export default function IntegrationPage() {
  const { apiKeys, addApiKey, removeApiKey, forceLoadingStates } = useDemoState();
  const [framework, setFramework] = useState("node");

  const envValue = `CHERRY_API_KEY=${apiKeys[apiKeys.length - 1]?.value}`;

  const columns: TableColumn<ApiKeyEntry>[] = [
    {
      key: "value",
      header: "API key",
      render: (row) => <span className={styles.keyValueText}>{row.value}</span>,
    },
    {
      key: "options",
      header: "Options",
      render: (row) => (
        <KeyOptionsCell value={row.value} onDelete={() => removeApiKey(row.id)} />
      ),
    },
  ];

  return (
    <DashboardShell
      activeKey="integration"
      pageTitle="Integration"
      pageDescription="Create an API key and install @cherry_ai/api in your product."
    >
      <div>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionTitle}>API keys</div>
          <Button variant="accent" onClick={addApiKey}>
            <Plus size={14} weight="bold" />
            Create API key
          </Button>
        </div>

        <Table
          columns={columns}
          rows={apiKeys}
          rowKey={(row) => row.id}
          loading={forceLoadingStates}
          className={styles.apiKeysTable}
          emptyState={
            <EmptyState
              icon={<Plug size={20} weight="bold" />}
              title="No API keys yet"
              description="Create a key to start authenticating requests from your product."
            />
          }
        />
      </div>

      {apiKeys.length > 0 && (
        <Card>
          <div className={styles.cardHeader}>
            <div>
              <div className={styles.sectionTitle}>Install snippet</div>
              <p className={styles.sectionDescription}>
                Fetch ads from the client, then request them server-side using the key above.
              </p>
            </div>
            <Button
              variant="secondary"
              size="sm"
              className={styles.docsButton}
              onClick={() => window.open(API_DOCS_URL, "_blank", "noopener,noreferrer")}
            >
              <ArrowSquareOut size={14} weight="bold" />
              View docs
            </Button>
          </div>

          <div className={styles.snippetStack}>
            <CodeBlock label="Install" value="npm install @cherry_ai/api" />
            <CodeBlock label="Environment" value={envValue} />
            <CodeBlock label="Client — chat UI" multiline value={CLIENT_SNIPPET} />

            <div className={styles.platformLabel}>Server framework</div>
            <Tabs
              items={frameworks}
              value={framework}
              onChange={setFramework}
              size="sm"
              className={styles.frameworkTabs}
            />
            <CodeBlock label="Server — fetch ads" multiline value={SERVER_SNIPPETS[framework]} />
          </div>
        </Card>
      )}
    </DashboardShell>
  );
}
