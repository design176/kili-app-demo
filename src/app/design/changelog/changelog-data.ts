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
export const changelogEntries: ChangelogEntry[] = [
  {
    date: "2026-08-19",
    changes: [
      {
        text: "Reworked the advertiser Pixel Tracking page to install/use @cherry_ai/react (npm install, styles import, CherryAd usage) on the React/Next.js tabs; other platform tabs keep a static placeholder snippet.",
        files: [
          "src/app/advertiser/pixel-tracking/page.tsx",
          "src/app/advertiser/pixel-tracking/pixel-tracking.module.css",
        ],
      },
      {
        text: "Reworked the platform Integration page to install/use @cherry_ai/api — env var wired to the real generated API key, a client CherryContext snippet, and Node vs Next.js server snippet tabs.",
        files: [
          "src/app/platform/integration/page.tsx",
          "src/app/platform/integration/integration.module.css",
        ],
      },
      {
        text: "Added a new Code Block component (a labeled Copy Field) with a design/components demo page and catalog entry.",
        files: [
          "src/components/ui/CodeBlock.tsx",
          "src/components/ui/CodeBlock.module.css",
          "src/app/design/components/code-block/page.tsx",
          "src/app/design/components/catalog.ts",
        ],
      },
      {
        text: "Added \"View docs\" buttons linking to the npm package pages on both the Pixel Tracking and Integration pages.",
        files: [
          "src/app/advertiser/pixel-tracking/page.tsx",
          "src/app/platform/integration/page.tsx",
        ],
      },
      {
        text: "Simplified API key creation — \"Create API key\" now generates a key instantly with no config modal. Removed the now-unused Create Api Key Modal; the API keys table was trimmed to just Key + Options.",
        files: [
          "src/components/demo-state.tsx",
          "src/app/platform/integration/page.tsx",
        ],
      },
      {
        text: "Reordered the Pixel Tracking platform tabs so React and Next.js come first.",
        files: ["src/app/advertiser/pixel-tracking/page.tsx"],
      },
      {
        text: "Fixed the \"View docs\" button and the Integration page's Node/Next.js tabs so they stay right-aligned and don't stretch full-width through tablet widths, only stacking/collapsing at mobile (≤800px); the docs button is capped at 200px wide.",
        files: [
          "src/app/advertiser/pixel-tracking/pixel-tracking.module.css",
          "src/app/platform/integration/integration.module.css",
        ],
      },
      {
        text: "Added a mobile Select dropdown fallback for the Pixel Tracking platform picker (the Tabs row is hidden ≤1200px).",
        files: [
          "src/app/advertiser/pixel-tracking/page.tsx",
          "src/app/advertiser/pixel-tracking/pixel-tracking.module.css",
        ],
      },
      {
        text: "Gave the Integration page's API keys table a fixed 300px height with internal scrolling.",
        files: [
          "src/app/platform/integration/page.tsx",
          "src/app/platform/integration/integration.module.css",
        ],
      },
      {
        text: "Hid the Integration page's \"Install snippet\" card until at least one API key exists.",
        files: ["src/app/platform/integration/page.tsx"],
      },
      {
        text: "Fixed Trend Chart's y-axis numbers overlapping the plotted line on mobile by moving axis labels out of the SVG-scaled overlay into a fixed-width CSS column.",
        files: ["src/components/ui/TrendChart.tsx", "src/components/ui/TrendChart.module.css"],
      },
      {
        text: "Fixed Trend Chart's pan/granularity-change animation jumping — the y-axis domain now eases in with the line instead of snapping instantly to the new window.",
        files: ["src/components/ui/TrendChart.tsx"],
      },
      {
        text: "Removed the redundant \"Next\" badge from Platform Earnings' payout history — the Scheduled status badge already says the same thing.",
        files: ["src/components/ui/HistoryTable.tsx"],
      },
      {
        text: "Bumped the payout method text (\"Bank account ending in ...\") to 20px on desktop.",
        files: ["src/app/platform/earnings/earnings.module.css"],
      },
    ],
  },
];
