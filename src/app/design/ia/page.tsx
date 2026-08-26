"use client";

import { useState } from "react";
import styles from "./ia.module.css";
import { Tooltip } from "@/components/ui/Tooltip";
import { Tabs } from "@/components/ui/Tabs";
import { Badge } from "@/components/ui/Badge";

type Node = {
  label: string;
  desc?: string;
  children?: Node[];
};

type Screen = {
  section: string;
  screen: string;
  desc: string;
  why: string;
  tag: "mvp" | "later";
  children: Node[];
};

const advertiserScreens: Screen[] = [
  {
    section: "Home",
    screen: "Overview",
    desc: "Landing screen after login. Answers 'is my money working' in one glance.",
    why: "First screen an advertiser sees on every visit — needs to earn a habit of checking in, not just report numbers.",
    tag: "mvp",
    children: [
      {
        label: "KPI strip",
        children: [
          { label: "Spend", desc: "total amount spent on the campaign" },
          { label: "Impressions", desc: "how many times the ad was shown" },
          { label: "Clicks", desc: "how many times people clicked the ad" },
          { label: "CPC", desc: "average cost for each click" },
          { label: "CPM", desc: "cost for every thousand impressions" },
          { label: "CTR", desc: "percentage of impressions that turned into clicks" },
        ],
      },
      {
        label: "Needs attention panel",
        desc: "doubles as the activity feed — no separate log for v1",
        children: [
          { label: "Draft campaigns", desc: "saved but not yet launched" },
          { label: "Budget exhausting", desc: "campaigns about to run out of budget" },
          { label: "Rejected ads", desc: "went live, then flagged/rejected afterward for a content problem" },
        ],
      },
      {
        label: "Spend-over-time chart",
        children: [
          { label: "Daily spend trend", desc: "spend per day, not cumulative" },
          { label: "Per-campaign breakdown toggle" },
        ],
      },
      {
        label: "Create Campaign CTA",
        desc: "primary button, dominant on the empty state for a brand-new account",
      },
    ],
  },
  {
    section: "Campaigns",
    screen: "Campaign List",
    desc: "Every campaign the advertiser owns, sortable and filterable.",
    why: "Primary place advertisers manage what's running — has to scale to dozens of campaigns without feeling cluttered.",
    tag: "mvp",
    children: [
      {
        label: "Campaign table",
        children: [
          { label: "Name" },
          { label: "Status badge", desc: "Draft / Active / Paused / Ended" },
          { label: "Budget" },
          { label: "Spend" },
          { label: "Impressions" },
          { label: "Clicks" },
          { label: "CPC" },
          { label: "CPM" },
          { label: "CTR" },
        ],
      },
      {
        label: "Filters",
        children: [
          { label: "Status" },
          { label: "Date range" },
          { label: "Objective" },
        ],
      },
      { label: "Row-level actions", desc: "Pause / Resume / Duplicate / Archive — one row at a time" },
      { label: "Bulk (multi-select) actions", desc: "same actions applied to selected rows" },
      { label: "Create Campaign button", desc: "top right of the table" },
      { label: "Empty state", desc: "short explainer + CTA for zero-campaign accounts" },
    ],
  },
  {
    section: "Campaigns",
    screen: "Create Campaign",
    desc: "A 3-step wizard, no Objective step and no Targeting step — an active campaign's ad is eligible in any conversation, gated only by budget and dates.",
    why: "Major simplification vs. a typical ad platform: no contextual targeting or bid-strategy choice for v1, just content + budget.",
    tag: "mvp",
    children: [
      {
        label: "Step 1 — Ad content",
        children: [
          { label: "Campaign title", desc: "internal-only name, never shown to end users" },
          { label: "Campaign heading", desc: "the headline shown to end users" },
          { label: "Body text", desc: "rich text box — normal text plus inline hyperlinks" },
          { label: "CTA link", desc: "optional standalone call-to-action link" },
        ],
      },
      {
        label: "Step 2 — Budget & time duration",
        children: [
          { label: "Total budget", desc: "one lump sum for the whole campaign, no daily cap" },
          { label: "Start date" },
          { label: "End date" },
        ],
      },
      {
        label: "Step 3 — Final review",
        children: [
          { label: "Read-only summary", desc: "recap of everything entered in steps 1–2" },
          { label: "Launch button", desc: "submits and launches immediately — status = Active, no approval gate" },
        ],
      },
    ],
  },
  {
    section: "Campaigns",
    screen: "Campaign Detail",
    desc: "Everything about one campaign — performance and editing — on a single page, no tabs.",
    why: "One screen serves both 'how is it doing' and 'let me change something' — no Targeting or Creative-variant tabs since neither exists in v1.",
    tag: "mvp",
    children: [
      { label: "KPI strip", desc: "same 6 metrics as Overview, scoped to this campaign" },
      { label: "Spend-over-time chart", desc: "same daily-spend chart as Overview, scoped to this campaign" },
      {
        label: "Editable fields",
        children: [
          { label: "Ad content", desc: "title, heading, body text, CTA link" },
          { label: "Budget & dates" },
        ],
      },
      { label: "Actions", desc: "Pause / Archive" },
    ],
  },
  {
    section: "Tracking",
    screen: "Events Tracking",
    desc: "Conversion analytics: page visits and conversions attributed to Kili ads, over time, plus a live feed of individual purchase events.",
    why: "Split out from pixel install/verification — this is the ongoing analytics view an advertiser checks in on, separate from the one-time setup flow below.",
    tag: "mvp",
    children: [
      {
        label: "KPI strip",
        children: [
          { label: "Page visits", desc: "traffic sent to the site by the ad" },
          { label: "Conversions", desc: "count of completed conversion events" },
        ],
      },
      { label: "Conversions-over-time chart" },
      { label: "Page-visits-over-time chart" },
      { label: "Events activity feed", desc: "individual purchase events, most recent first" },
      { label: "Empty state", desc: "\"set up your pixel to get started\" — links to Pixel Setup" },
    ],
  },
  {
    section: "Tracking",
    screen: "Pixel Setup",
    desc: "Install and verify the client-side pixel on the advertiser's own website — separate from the Developer-side ad-serving integration.",
    why: "New top-level section, not part of Campaigns — pixel install lives on the advertiser's own site, not inside a campaign's settings. Conversion setup/analytics itself now lives on Events Tracking, not here.",
    tag: "mvp",
    children: [
      { label: "Install snippet", desc: "copyable pixel code the advertiser embeds on their own site" },
      { label: "Verify installation", desc: "checks that ads are rendering on a live page" },
    ],
  },
  {
    section: "Billing",
    screen: "Billing",
    desc: "Payment method and current balance — no separate account-wide spend cap, each campaign's own budget is the only ceiling.",
    why: "Minimal on purpose — MVP just needs enough for a campaign to actually run.",
    tag: "mvp",
    children: [
      { label: "Payment method", desc: "add / edit card on file" },
      { label: "Current balance", desc: "funds available; campaigns draw from this to cover their budgets" },
      { label: "Invoices", desc: "history of past charges" },
    ],
  },
  {
    section: "Account",
    screen: "Settings",
    desc: "Bare-minimum account controls. No API key — pixel/API integration belongs to the Developer side, not here.",
    why: "Team roles and permissions are deferred — one user per account for MVP.",
    tag: "mvp",
    children: [
      {
        label: "Account info form",
        children: [{ label: "Name" }, { label: "Email" }, { label: "Company" }],
      },
      {
        label: "Notification toggles",
        children: [
          { label: "Budget exhausting" },
          { label: "Ad rejected" },
        ],
      },
    ],
  },
];

const developerScreens: Screen[] = [
  {
    section: "Home",
    screen: "Overview",
    desc: "Landing screen after login. Answers 'is this working, and is it making me money'.",
    why: "First thing a publisher checks: is this working, and is it making money.",
    tag: "mvp",
    children: [
      {
        label: "KPI strip",
        children: [
          { label: "Revenue", desc: "total money earned from ads shown, this period" },
          { label: "Impressions", desc: "how many times an ad was actually shown in the product" },
          { label: "eCPM", desc: "revenue per 1,000 impressions" },
        ],
      },
      {
        label: "Needs attention panel",
        children: [
          { label: "Integration errors", desc: "ad calls from the product that are failing" },
          { label: "Missing payout method" },
        ],
      },
      {
        label: "Revenue-over-time chart",
        children: [{ label: "Daily revenue trend", desc: "one line, not cumulative — no per-campaign concept on this side" }],
      },
    ],
  },
  {
    section: "Surfaces",
    screen: "Surfaces",
    desc: "The entire path from 'signed up' to 'ads are showing in my product.' No sandbox/live split for v1.",
    why: "This is the entire onboarding path — the less friction here, the faster a publisher goes live.",
    tag: "mvp",
    children: [
      { label: "API keys list", desc: "multiple keys, each with copy and delete, and its placement style + frequency cap shown inline" },
      {
        label: "Create API key modal",
        desc: "placement controls are chosen per-key, not as a separate global screen — trust control lives right where the key is minted",
        children: [
          {
            label: "Placement style selector",
            children: [
              { label: "Above response" },
              { label: "Below response" },
              { label: "Inline with response" },
              { label: "During generation/loading", desc: "for creative/image-gen type apps" },
            ],
          },
          { label: "Frequency cap", desc: "max ads per conversation / session" },
        ],
      },
      { label: "Install snippet", desc: "copyable code block to embed the ad call in the product" },
    ],
  },
  {
    section: "Monetization",
    screen: "Earnings",
    desc: "Purely the payout mechanics — revenue trend already lives on Overview.",
    why: "The proof that integrating was worth it.",
    tag: "mvp",
    children: [
      { label: "Payout method setup", desc: "add / edit how the publisher gets paid" },
      {
        label: "Payout history table",
        children: [
          { label: "Date" },
          { label: "Amount" },
          { label: "Status" },
        ],
        desc: "next scheduled payout highlighted",
      },
    ],
  },
  {
    section: "Account",
    screen: "Settings",
    desc: "Bare-minimum account controls. No API key here either — that lives under Surfaces.",
    why: "Same as the advertiser side — team roles deferred.",
    tag: "mvp",
    children: [
      {
        label: "Account info form",
        children: [{ label: "Name" }, { label: "Email" }, { label: "Company" }],
      },
      {
        label: "Notification toggles",
        children: [
          { label: "Integration errors" },
          { label: "Missing payout method" },
        ],
      },
    ],
  },
];

const deferred = [
  "Bulk (multi-select) actions on Campaign List",
  "Objective / bid-strategy step in Create Campaign",
  "Targeting — topic/intent, contextual matching (v1 ads are untargeted, gated only by budget)",
  "Multiple creative variants & A/B testing",
  "Standalone Conversation Simulator tool",
  "Brand Safety controls & review queues on both sides",
  "Custom reporting builder (exports, scheduled reports)",
  "Team roles & permissions",
  "Sandbox/Live key split & \"test my integration\" check (Developer)",
  "Ad density slider & advertiser-category block list (Developer)",
  "Fill rate & Avg. added latency metrics (Developer)",
  "Revenue breakdown by advertiser category (Developer Earnings)",
  "\"Why did/didn't this ad show\" diagnostic tool",
];

function Tree({ nodes }: { nodes: Node[] }) {
  return (
    <ul className={styles.node}>
      {nodes.map((node) => (
        <li key={node.label} className={node.children ? "" : styles.leaf}>
          <div className={styles.nodeRow}>
            <span className={styles.nodeLabel}>{node.label}</span>
            {node.desc && <span className={styles.nodeDesc}>— {node.desc}</span>}
          </div>
          {node.children && <Tree nodes={node.children} />}
        </li>
      ))}
    </ul>
  );
}

function ScreenList({ screens }: { screens: Screen[] }) {
  return (
    <div className={styles.tree}>
      {screens.map((s) => (
        <div key={s.screen} className={styles.screenBlock}>
          <div className={styles.section}>{s.section}</div>
          <div className={styles.screenHead}>
            <span className={styles.screenName}>
              {s.screen}
              <Tooltip text={s.why} />
            </span>
            <Badge tone={s.tag === "mvp" ? "brand" : "neutral"}>
              {s.tag === "mvp" ? "MVP" : "Later"}
            </Badge>
          </div>
          <p className={styles.screenDesc}>{s.desc}</p>
          <Tree nodes={s.children} />
        </div>
      ))}
    </div>
  );
}

const workspaces = [
  { key: "advertiser", label: "Advertiser", screens: advertiserScreens },
  { key: "developer", label: "Developer", screens: developerScreens },
] as const;

export default function IAPage() {
  const [active, setActive] = useState<(typeof workspaces)[number]["key"]>(
    "advertiser"
  );
  const current = workspaces.find((w) => w.key === active)!;

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Information Architecture</h1>
      <p className={styles.subtitle}>
        MVP scope only, down to the widget level. Hover the{" "}
        <strong>i</strong> next to a screen name for why it&apos;s here.
        Deferred ideas are listed at the bottom.
      </p>

      <div className={styles.shared}>
        <strong>Note:</strong> this tab switch is just for comparing the two
        IAs side by side on this page. In the actual app, Advertiser and
        Developer live on separate routes behind the Workspace Switcher.
      </div>

      <Tabs
        items={workspaces.map((w) => ({ value: w.key, label: w.label }))}
        value={active}
        onChange={(value) => setActive(value as (typeof workspaces)[number]["key"])}
        className={styles.tabs}
      />

      <div className={styles.workspace}>
        <ScreenList screens={current.screens} />
      </div>

      <div className={styles.deferred}>
        <div className={styles.deferredTitle}>Deferred (post-MVP)</div>
        <ul className={styles.deferredList}>
          {deferred.map((d) => (
            <li key={d}>{d}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
