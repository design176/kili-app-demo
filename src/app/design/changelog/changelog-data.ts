export type ChangelogEntry = {
  date: string;
  changes: string[];
};

// Add a new entry to the top of this array each time you're asked to log a
// push — one entry per push, newest first. Only log what changed since the
// previous entry; don't back-fill history from before this file existed.
export const changelogEntries: ChangelogEntry[] = [
  {
    date: "2026-08-19",
    changes: [
      "Reworked the advertiser Pixel Tracking page to install/use @cherry_ai/react (npm install, styles import, CherryAd usage) on the React/Next.js tabs; other platform tabs keep a static placeholder snippet.",
      "Reworked the platform Integration page to install/use @cherry_ai/api — env var wired to the real generated API key, a client CherryContext snippet, and Node vs Next.js server snippet tabs.",
      "Added a new Code Block component (a labeled Copy Field) with a design/components demo page and catalog entry.",
      "Added \"View docs\" buttons linking to the npm package pages on both the Pixel Tracking and Integration pages.",
      "Simplified API key creation — \"Create API key\" now generates a key instantly with no config modal. Removed the now-unused Create Api Key Modal; the API keys table was trimmed to just Key + Options.",
      "Reordered the Pixel Tracking platform tabs so React and Next.js come first.",
      "Fixed the \"View docs\" button and the Integration page's Node/Next.js tabs so they stay right-aligned and don't stretch full-width through tablet widths, only stacking/collapsing at mobile (≤800px); the docs button is capped at 200px wide.",
      "Added a mobile Select dropdown fallback for the Pixel Tracking platform picker (the Tabs row is hidden ≤800px).",
      "Gave the Integration page's API keys table a fixed 300px height with internal scrolling.",
      "Hid the Integration page's \"Install snippet\" card until at least one API key exists.",
      "Fixed Trend Chart's y-axis numbers overlapping the plotted line on mobile by moving axis labels out of the SVG-scaled overlay into a fixed-width CSS column.",
      "Fixed Trend Chart's pan/granularity-change animation jumping — the y-axis domain now eases in with the line instead of snapping instantly to the new window.",
      "Removed the redundant \"Next\" badge from Platform Earnings' payout history — the Scheduled status badge already says the same thing.",
      "Bumped the payout method text (\"Bank account ending in ...\") to 20px on desktop.",
    ],
  },
];
