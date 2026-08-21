export type ChangelogChange = {
  text: string;
  files: string[];
};

export type ChangelogEntry = {
  date: string;
  changes: ChangelogChange[];
};

// Add a new entry to the top of this array each time you're asked to log a
// push — one entry per push, newest first. Only log what changed since the
// previous entry; don't back-fill history from before this file existed.
// Date format: "D Month YY" (e.g. "14 July 26"). Keep entries terse — just
// enough for another AI agent to know what changed and which files to open.
export const changelogEntries: ChangelogEntry[] = [
  {
    date: "21 August 26",
    changes: [
      {
        text: "Pixel Tracking renamed to Pixel Setup in the advertiser nav (plug icon); the page itself is just the install/verify flow, no KPI strip.",
        files: ["src/components/dashboard-shell.tsx", "src/app/advertiser/pixel-tracking/page.tsx"],
      },
      {
        text: "New Advertiser Events Tracking screen: Page visits/Conversions KPIs, Conversions-over-time and Page-visits-over-time Trend Charts, and a purchase-events Activity Feed; empty state links back to Pixel Setup. Nav item sits above Campaigns with a Target icon.",
        files: [
          "src/app/advertiser/events-tracking/page.tsx",
          "src/app/advertiser/events-tracking/events-tracking.module.css",
          "src/components/dashboard-shell.tsx",
          "src/components/ui/ActivityFeed.tsx",
        ],
      },
      {
        text: "New Cost Breakdown component (pills on mobile, a panel on desktop) — used for Advertiser Overview's Spend breakdown and Campaign Detail's Cost breakdown (CPC/CPM/CPA).",
        files: [
          "src/components/ui/CostBreakdown.tsx",
          "src/components/ui/CostBreakdown.module.css",
          "src/app/advertiser/overview/page.tsx",
          "src/app/advertiser/campaigns/[id]/page.tsx",
        ],
      },
      {
        text: "Advertiser Overview: added Conversions to the KPI strip and a mobile-only Balance tile next to Clicks (new useIsMobile hook).",
        files: ["src/app/advertiser/overview/page.tsx", "src/lib/use-mobile.ts"],
      },
      {
        text: "Campaign model: added conversions/cpa fields; Campaign Table/Card gained matching columns/stats; Campaign Detail gained Conversions/CPA KPIs and a third Conversions-over-time chart.",
        files: [
          "src/components/ui/CampaignTable.tsx",
          "src/components/ui/CampaignCard.tsx",
          "src/app/advertiser/campaigns/[id]/page.tsx",
          "src/lib/mock-data.ts",
        ],
      },
      {
        text: "KPI Small Strip: row layout stays 2-column on mobile instead of collapsing to 1.",
        files: ["src/components/ui/KPISmallStrip.module.css"],
      },
      {
        text: "Button: Primary/Secondary now have their own --btn-primary-*/--btn-secondary-* tokens (background, gradient, border, shadow, border-width) instead of a shared theme-swapped role, and get the same glossy shimmer-ring overlay as Accent/Destructive/Icon Button. Disabled state zeroes border-width on every variant so none shows a ring.",
        files: ["src/components/ui/Button.tsx", "src/components/ui/Button.module.css", "src/app/globals.css"],
      },
      {
        text: "IA page and components catalog updated to match: Pixel Setup/Events Tracking split, new Cost Breakdown and Key Manager entries, corrected KPI Strip/KPI Small Strip/Trend Chart usedIn.",
        files: ["src/app/design/ia/page.tsx", "src/app/design/components/catalog.ts"],
      },
      {
        text: "New Key Manager component — create-key flow: header, a Table of existing keys (masked value, delete action) sized to its content, and a reveal modal shown once after creating a key (Copy Field, right-aligned Copy key / primary Done). Used by Platform Integration's API keys and Pixel Setup's new pixel keys.",
        files: [
          "src/components/ui/KeyManager.tsx",
          "src/components/ui/KeyManager.module.css",
          "src/app/platform/integration/page.tsx",
          "src/app/advertiser/pixel-tracking/page.tsx",
          "src/components/demo-state.tsx",
        ],
      },
      {
        text: "Platform Integration: Install snippet card is always visible; the CHERRY_API_KEY env line falls back to a YOUR_API_KEY placeholder when no key exists yet.",
        files: ["src/app/platform/integration/page.tsx"],
      },
      {
        text: "Settings panel: Pixel keys has its own Clear all reset row; New user hint mentions pixel keys too.",
        files: ["src/components/ui/SettingsPanel.tsx"],
      },
      {
        text: "Cleanup: extracted buildTrendData() so pages stop hand-casting chart data (9 call sites), dropped dead CSS + a redundant balance constant, renamed popover.tsx to Popover.tsx for casing consistency, and cleared all outstanding lint errors.",
        files: [
          "src/lib/chart-data.ts",
          "src/components/ui/TrendChart.tsx",
          "src/components/ui/StackedBarChart.tsx",
          "src/components/ui/Popover.tsx",
        ],
      },
    ],
  },
  {
    date: "19 August 26",
    changes: [
      {
        text: "Pixel Tracking page: install/use @cherry_ai/react on React/Next.js tabs; other platform tabs keep a static placeholder snippet.",
        files: [
          "src/app/advertiser/pixel-tracking/page.tsx",
          "src/app/advertiser/pixel-tracking/pixel-tracking.module.css",
        ],
      },
      {
        text: "Integration page: install/use @cherry_ai/api — env var wired to the real API key, client + server (Node/Next.js) snippets.",
        files: [
          "src/app/platform/integration/page.tsx",
          "src/app/platform/integration/integration.module.css",
        ],
      },
      {
        text: "New Code Block component (labeled Copy Field) + demo page + catalog entry.",
        files: [
          "src/components/ui/CodeBlock.tsx",
          "src/components/ui/CodeBlock.module.css",
          "src/app/design/components/code-block/page.tsx",
          "src/app/design/components/catalog.ts",
        ],
      },
      {
        text: "\"View docs\" buttons on Pixel Tracking and Integration, linking to npm.",
        files: [
          "src/app/advertiser/pixel-tracking/page.tsx",
          "src/app/platform/integration/page.tsx",
        ],
      },
      {
        text: "API key creation is now instant (no config modal). Removed the unused Create Api Key Modal; API keys table trimmed to Key + Options.",
        files: ["src/components/demo-state.tsx", "src/app/platform/integration/page.tsx"],
      },
      {
        text: "Pixel Tracking platform tabs reordered — React and Next.js first.",
        files: ["src/app/advertiser/pixel-tracking/page.tsx"],
      },
      {
        text: "Fixed \"View docs\" button and Node/Next.js tabs stretching/misaligning at tablet widths; docs button capped at 200px.",
        files: [
          "src/app/advertiser/pixel-tracking/pixel-tracking.module.css",
          "src/app/platform/integration/integration.module.css",
        ],
      },
      {
        text: "Mobile Select dropdown fallback for the Pixel Tracking platform picker (Tabs hidden ≤1200px).",
        files: [
          "src/app/advertiser/pixel-tracking/page.tsx",
          "src/app/advertiser/pixel-tracking/pixel-tracking.module.css",
        ],
      },
      {
        text: "Integration API keys table: fixed 300px height, internal scroll.",
        files: [
          "src/app/platform/integration/page.tsx",
          "src/app/platform/integration/integration.module.css",
        ],
      },
      {
        text: "Integration \"Install snippet\" card hidden until an API key exists.",
        files: ["src/app/platform/integration/page.tsx"],
      },
      {
        text: "Fixed Trend Chart y-axis numbers overlapping the plotted line on mobile.",
        files: ["src/components/ui/TrendChart.tsx", "src/components/ui/TrendChart.module.css"],
      },
      {
        text: "Fixed Trend Chart pan/granularity animation jump.",
        files: ["src/components/ui/TrendChart.tsx"],
      },
      {
        text: "Removed redundant \"Next\" badge from Platform Earnings payout history.",
        files: ["src/components/ui/HistoryTable.tsx"],
      },
      {
        text: "Payout method text bumped to 20px on desktop.",
        files: ["src/app/platform/earnings/earnings.module.css"],
      },
    ],
  },
];
