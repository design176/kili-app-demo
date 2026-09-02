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
    date: "2 September 26 — B",
    changes: [
      {
        text: "Developer Earnings' \"Next payout\" card is a manual, testable flow again (undoing the same-day automatic-every-15-days rework below), with these states: default (next scheduled amount, now 28px, + \"Request payout\"), under the $x minimum (button disabled + \"Min payout value $x\" note — the \"Low payout (<$x)\" pink-FAB toggle forces this), no wallet saved (red \"Payout method not set\" in place of the button), and nothing scheduled (\"No payout scheduled yet.\").",
        files: ["src/app/developer/earnings/page.tsx", "src/app/developer/earnings/earnings.module.css"],
      },
      {
        text: "Clicking \"Request payout\" now animates through \"Paying out\" (amount opacity-pulses 0.5–0.7, button shows a spinning icon + \"Processing…\", 1s) into a result state.",
        files: ["src/app/developer/earnings/page.tsx", "src/app/developer/earnings/earnings.module.css"],
      },
      {
        text: "Result is \"Paid successfully\" (amount + Close / kili-green \"View transaction\" — placeholder, goes nowhere) by default, or \"Payout failed\" (amount in red, explanation, single Close button) if the pink-FAB \"Trigger transaction errors\" toggle is on.",
        files: [
          "src/app/developer/earnings/page.tsx",
          "src/app/developer/earnings/earnings.module.css",
          "src/components/demo-state.tsx",
          "src/components/ui/SettingsPanel.tsx",
        ],
      },
      {
        text: "Close always returns the card to its default state.",
        files: ["src/app/developer/earnings/page.tsx"],
      },
      {
        text: "The scheduled payout no longer shows as its own row in Payout history — only the \"Pending\" row added on request does, flipping to Paid/Failed in sync with the card.",
        files: ["src/app/developer/earnings/page.tsx", "src/components/ui/HistoryTable.tsx"],
      },
    ],
  },
  {
    date: "2 September 26",
    changes: [
      {
        text: "Developer payout method is now a real, persisted EVM wallet address instead of the old fake \"Complete KYC\"/bank-account flow. Earnings' Payout method card shows the saved wallet (truncated) with a \"Change address\" button, or \"EVM wallet not set\" with a \"Setup\" button when none is saved — both open a new Wallet Address Modal (wallet-themed illustration matching the walkthrough, a read-only \"Current address\" field when changing an existing one, and Cancel/Save) to actually set it.",
        files: [
          "src/lib/mock-data.ts",
          "src/components/demo-state.tsx",
          "src/app/developer/earnings/page.tsx",
          "src/app/developer/earnings/earnings.module.css",
          "src/components/ui/WalletAddressModal.tsx",
          "src/components/ui/WalletAddressModal.module.css",
          "src/app/design/components/wallet-address-modal/page.tsx",
          "src/app/design/components/catalog.ts",
        ],
      },
      {
        text: "\"Next payout\" is now automatic every 15 days: the card shows the payout date up top and \"Paid out automatically every 15 days, minimum payout $15\" below the amount, or, in red, \"Payout method not set\" (date hidden) when no wallet is saved — the manual \"Request payout\" button and $20-minimum are gone, along with the Settings Panel toggle that tested it.",
        files: [
          "src/app/developer/earnings/page.tsx",
          "src/app/developer/earnings/earnings.module.css",
          "src/components/ui/SettingsPanel.tsx",
        ],
      },
      {
        text: "Sidebar's red account alert now reads \"Payout method — Not set\" (was \"KYC not complete\") and uses a Money icon instead of Bank — and, along with Log out, no longer breaks the developer walkthrough if clicked mid-tour.",
        files: [
          "src/components/dashboard-shell.tsx",
          "src/components/ui/SidebarNav.tsx",
          "src/app/design/components/sidebar-nav/page.tsx",
          "src/app/design/components/catalog.ts",
        ],
      },
      {
        text: "The developer walkthrough's payout step and its illustration now reference the EVM wallet instead of Stripe.",
        files: [
          "src/lib/developer-tour.ts",
          "src/components/ui/TourIllustrations.tsx",
          "src/components/ui/TourCoachmark.tsx",
          "src/components/ui/TourCoachmark.module.css",
          "src/app/design/components/tour-coachmark/page.tsx",
        ],
      },
    ],
  },
  {
    date: "31 August 26 — B",
    changes: [
      {
        text: "Advertiser Overview KPI strip: removed the Conversions tile.",
        files: ["src/app/advertiser/overview/page.tsx"],
      },
      {
        text: "Advertiser sidebar: reordered Workspace section so Campaigns is second (after Overview, before Events Tracking/Pixel Setup).",
        files: ["src/components/dashboard-shell.tsx"],
      },
      {
        text: "Events Tracking now shows a permanent \"Coming soon\" EmptyState instead of its KPI/chart/feed content. Pixel Setup was removed from the advertiser sidebar/routes entirely and its original page archived (unrouted) to src/_archive/ rather than deleted, in case it's restored later.",
        files: [
          "src/app/advertiser/events-tracking/page.tsx",
          "src/components/dashboard-shell.tsx",
          "src/_archive/advertiser/pixel-tracking/page.tsx",
          "src/_archive/advertiser/pixel-tracking/pixel-tracking.module.css",
        ],
      },
      {
        text: "KPISmallStrip: new optional per-item fullWidth prop that spans both columns of the tablet/mobile 2-column grid (800px breakpoint only). Used to move the mobile-only Balance tile on Overview to the end of the KPI list and make it span the full row instead of sharing a column.",
        files: [
          "src/components/ui/KPISmallStrip.tsx",
          "src/components/ui/KPISmallStrip.module.css",
          "src/app/advertiser/overview/page.tsx",
          "src/app/design/components/kpi-small-strip/page.tsx",
        ],
      },
    ],
  },
  {
    date: "31 August 26",
    changes: [
      {
        text: "Added a primary \"Join Discord\" button (links to https://discord.gg/ud22UbERd) to both the developer Settings \"Need help?\" modal and the final step of the developer walkthrough — placed inside the grid-background box directly under the support-email copy field, sized to match that field+copy-button row's width (single-column CSS grid, not fixed width). New required onJoinDiscord prop on HelpModal, new optional onJoinDiscord prop on TourCoachmark.",
        files: [
          "src/components/ui/HelpModal.tsx",
          "src/components/ui/HelpModal.module.css",
          "src/components/ui/TourCoachmark.tsx",
          "src/components/ui/TourCoachmark.module.css",
          "src/components/developer-tour-provider.tsx",
          "src/app/developer/settings/page.tsx",
          "src/app/design/components/help-modal/page.tsx",
        ],
      },
    ],
  },
  {
    date: "28 August 26",
    changes: [
      {
        text: "Developer Earnings: \"Scheduled for {date}\" next-payout sub-text replaced with a \"Request payout\" primary button (disabled below the $X minimum, with an inline \"Min payout value $X\" note shown only then — currently hardcoded to $20 in page.tsx); added a top-right \"Payout refreshes every couple of hours\" note on the card. New Settings Panel \"Low payout (<$X)\" switch forces the next-payout amount to $15 for testing the disabled/min-value states.",
        files: [
          "src/app/developer/earnings/page.tsx",
          "src/app/developer/earnings/earnings.module.css",
          "src/components/demo-state.tsx",
          "src/components/ui/SettingsPanel.tsx",
        ],
      },
      {
        text: "Added an account-level Company logo, set as a URL on the advertiser Settings page (new first field in Account info — circular preview or dashed empty placeholder, helper text under the input) and persisted to demo state/localStorage, clearable from the Settings Panel FAB. Shown in Create Campaign step 1 (\"Company logo not set\" + \"Set up in Settings\" button when empty; a circular preview with a pencil-edit badge linking back to Settings when set — also included in the step 3 review) and as the advertiser sidebar's account-menu avatar image (replacing the initial-letter avatar) via SidebarNav's new avatarUrl prop.",
        files: [
          "src/components/demo-state.tsx",
          "src/components/ui/SettingsForm.tsx",
          "src/components/ui/SettingsForm.module.css",
          "src/app/advertiser/settings/page.tsx",
          "src/components/ui/CreateCampaignWizard.tsx",
          "src/components/ui/CreateCampaignWizard.module.css",
          "src/components/ui/SidebarNav.tsx",
          "src/components/ui/SidebarNav.module.css",
          "src/components/dashboard-shell.tsx",
          "src/components/ui/SettingsPanel.tsx",
          "src/app/design/components/create-campaign-wizard/page.tsx",
          "src/app/design/components/settings-form/page.tsx",
          "src/app/design/components/sidebar-nav/page.tsx",
          "src/app/design/components/settings-panel/page.tsx",
          "src/app/design/components/catalog.ts",
        ],
      },
    ],
  },
  {
    date: "27 August 26 — B",
    changes: [
      {
        text: "New Claude Code surface, added first in Developer Surfaces' \"Kili Surfaces\" grid — inactive by default, real logo asset (public/claude-code-icon.png), description \"View ads in Claude Code CLI in your terminal and VS Code, and get paid for views.\" The developer walkthrough's second step (previously anchored to the VS Code card) now points at this card instead — id/anchor renamed vscode-surface/tour-vscode-card → claude-code-surface/tour-claude-code-card, copy updated to match.",
        files: [
          "src/lib/mock-data.ts",
          "src/lib/developer-tour.ts",
          "src/app/developer/surfaces/page.tsx",
          "public/claude-code-icon.png",
        ],
      },
      {
        text: "New Install Surface Modal — opened from any inactive Surface card's \"Install\" button (replacing the old console.log stub): grid-background top section with the install command (npx -y @kili-ai/install) in a copy-to-clipboard input, matching the walkthrough's code-step styling; title (\"Install {surface}\"), a \"Paste this into your terminal to install.\" hint, and description. Closes via a secondary-styled X, Escape, or backdrop click — no footer action button.",
        files: [
          "src/components/ui/InstallSurfaceModal.tsx",
          "src/components/ui/InstallSurfaceModal.module.css",
          "src/app/design/components/install-surface-modal/page.tsx",
          "src/app/developer/surfaces/page.tsx",
          "src/app/design/components/catalog.ts",
        ],
      },
      {
        text: "Added a Clicks KPI + Trend Chart to Developer Overview and Surface Detail, laid out beside Impressions in a chartsRow (stacks ≤1200px); clicksTotalByGranularity mock data derived from impressions at ~2.1% CTR. TrendChart gained an optional height prop (px) to fix a chart's rendered height instead of it scaling with width — used here so the side-by-side Impressions/Clicks charts line up with the full-width Revenue chart; every other existing TrendChart call site is unaffected. Shared SIDE_BY_SIDE_CHART_HEIGHT constant (chart-data.ts) instead of a per-page duplicate.",
        files: [
          "src/app/developer/overview/page.tsx",
          "src/app/developer/overview/overview.module.css",
          "src/app/developer/surfaces/[id]/page.tsx",
          "src/app/developer/surfaces/[id]/detail.module.css",
          "src/components/ui/TrendChart.tsx",
          "src/lib/mock-data.ts",
          "src/lib/chart-data.ts",
          "src/app/design/components/catalog.ts",
        ],
      },
      {
        text: "Fixed KPI Strip tiles not filling the row on Advertiser Events Tracking — its @media(max-width:1380px) rule hardcoded 3 grid columns regardless of tile count, so a 2-tile strip (Page visits/Conversions) got squeezed into 2 of 3 equal columns with an empty phantom third column instead of splitting 50/50. Column count at each breakpoint now caps at min(breakpoint's max, tile count).",
        files: ["src/components/ui/KPIStrip.module.css"],
      },
    ],
  },
  {
    date: "27 August 26",
    changes: [
      {
        text: "Developer walkthrough (6 steps, new users only): Tour Coachmark — spotlight hole + directional pointer (top/bottom/left/right), illustration or copyable code, title/description, dots progress, Close + Previous/Next (Finish on last). At ≤800px becomes a fixed bottom drawer. Anchors via data-tour (Surfaces nav, VS Code card, Overview nav, KPI strip, payout method, Settings Help). Background interaction is blocked (nav/button clicks and tooltips don't fire, focus stays trapped in the card). Only 2 triggers: (1) Login → Continue as Developer — triggers only for new users, landing on Surfaces and starting the walkthrough; for returning users it routes to /developer/overview with no walkthrough, (2) manual via Developer Settings → Help → Watch walkthrough (final step shows support@trykili.ai). While the tour is active, Developer Overview shows dummy Revenue/Impressions/eCPM + charts even for a new/empty account so the anchored KPI strip and charts have something to point at (otherwise EmptyState).",
        files: [
          "src/components/ui/TourCoachmark.tsx",
          "src/components/ui/TourCoachmark.module.css",
          "src/components/ui/TourIllustrations.tsx",
          "src/lib/developer-tour.ts",
          "src/app/developer/surfaces/page.tsx",
          "src/app/developer/overview/page.tsx",
          "src/app/developer/earnings/page.tsx",
          "src/components/ui/SurfaceCard.tsx",
          "src/components/ui/SettingsForm.tsx",
          "src/app/login/page.tsx",
          "src/app/developer/settings/page.tsx",
          "src/components/ui/Tooltip.tsx",
        ],
      },
      {
        text: "Developer walkthrough — route-change flicker fixed + motion move effects on desktop: provider keeps portal mounted across route changes (prevRect fallback, startTransition-atomic navigation) instead of unmounting on stale pathname; desktop spotlight and card now animate via motion spring (spotlight stiffness 380/damping 32, card stiffness 420/damping 34), pointer and title/description cross-fade per step (AnimatePresence 0.22s); mobile drawer stays static with dimmed spotlight while measuring; reduced-motion respected; will-change on spotlight/card.",
        files: [
          "src/components/developer-tour-provider.tsx",
          "src/components/ui/TourCoachmark.tsx",
          "src/components/ui/TourCoachmark.module.css",
        ],
      },
      {
        text: "Help Modal — centered modal opened from Developer Settings Help (Lifebuoy icon). Top grid-bg section with support@trykili.ai copy input (Copy/Check), below title/description + two secondary actions: Watch walkthrough and Report a bug. Has its own catalog demo page.",
        files: [
          "src/components/ui/HelpModal.tsx",
          "src/components/ui/HelpModal.module.css",
          "src/app/design/components/help-modal/page.tsx",
          "src/app/design/components/catalog.ts",
        ],
      },
      {
        text: "KYC not complete — danger error state. Sidebar Nav footer shows a red statusAlert card (Bank icon, 'Account — KYC not complete', danger-border/soft/text tokens, same treatment as zero-balance, clickable → Earnings). Earnings → Payout method card swaps from 'Bank account ending in 8821' + Edit to 'Bank account not connected' + primary 'Complete KYC'.",
        files: [
          "src/components/ui/SidebarNav.tsx",
          "src/components/ui/SidebarNav.module.css",
          "src/components/dashboard-shell.tsx",
          "src/app/developer/earnings/page.tsx",
          "src/app/design/components/sidebar-nav/page.tsx",
        ],
      },
      {
        text: "Theme Mode Toggle — icon-only 3-way control (Sun Light / Moon Dark / Monitor Auto) built on Tabs track + IconButton, active = primary. Lives in Settings → Appearance (first section, above Divider). Catalog: new Theme Toggle + Tour Coachmark pages, Sidebar Nav and Settings Form entries updated (Sidebar Nav danger statusAlert; Settings Form — Appearance first, Divider, then Email (disabled/read-only, first) + Name/Company, optional Help on Developer).",
        files: [
          "src/components/ui/ThemeModeToggle.tsx",
          "src/components/ui/SettingsForm.tsx",
          "src/components/ui/SettingsForm.module.css",
          "src/app/design/components/theme-mode-toggle/page.tsx",
          "src/app/design/components/tour-coachmark/page.tsx",
          "src/app/design/components/catalog.ts",
          "src/app/design/components/demo.module.css",
          "src/app/design/components/settings-form/page.tsx",
          "src/app/design/components/sidebar-nav/page.tsx",
        ],
      },
      {
        text: "Login — mobile footer: at ≤480px footer switches to position: static with width: 100% + margin-top: 40px so ToS/Privacy links + theme toggle fill the card and keep space-between instead of shrinking/left-aligning.",
        files: ["src/app/login/login.module.css"],
      },
    ],
  },
  {
    date: "26 August 26 — B",
    changes: [
      {
        text: "Settings page: removed the Notifications section (toggle list + Switch rows) from Settings Form for both Advertiser and Developer — Account info + Save is all that's left.",
        files: [
          "src/components/ui/SettingsForm.tsx",
          "src/components/ui/SettingsForm.module.css",
          "src/app/advertiser/settings/page.tsx",
          "src/app/developer/settings/page.tsx",
          "src/app/design/components/settings-form/page.tsx",
        ],
      },
      {
        text: "Developer Surfaces nav icon swapped from Plug to Stack (Pixel Setup keeps Plug).",
        files: ["src/components/dashboard-shell.tsx"],
      },
      {
        text: "New Surface Card component, rebuilt from Figma to replace the old Badge/icon-square card: real app icon in a bordered square, a plain status dot + text (gray Inactive / brand-green Active) instead of a pill badge, and either an \"Install\" CTA (inactive) or earnings + a \"View\" CTA (active). Surfaces' data moved to a shared mockSurfaces fixture; added a second, inactive Terminal surface card next to VS Code Extension, both using real downloaded icon assets.",
        files: [
          "src/components/ui/SurfaceCard.tsx",
          "src/components/ui/SurfaceCard.module.css",
          "src/app/developer/surfaces/page.tsx",
          "src/app/developer/surfaces/surfaces.module.css",
          "src/app/design/components/surface-card/page.tsx",
          "src/app/design/components/catalog.ts",
          "src/lib/mock-data.ts",
          "public/vscode-icon.png",
          "public/terminal-icon.png",
        ],
      },
      {
        text: "New Surface Detail page (/developer/surfaces/[id]) — the Developer Overview screen (Revenue/Impressions/eCPM KPIs + Revenue-over-time and Impressions Trend Charts) scoped to one surface; an inactive surface shows a \"Not installed yet\" empty state instead. A Surface Card's \"View\" button navigates here.",
        files: [
          "src/app/developer/surfaces/[id]/page.tsx",
          "src/app/developer/surfaces/[id]/detail.module.css",
          "src/app/developer/surfaces/page.tsx",
        ],
      },
    ],
  },
  {
    date: "26 August 26",
    changes: [
      {
        text: "Platform workspace renamed to Developer throughout the app — route /platform/* → /developer/*, login page's workspace picker ('Continue as Platform' → 'Continue as Developer'), SettingsForm/DashboardShell/SettingsPanel workspace keys, and the design-catalog/IA docs.",
        files: [
          "src/components/dashboard-shell.tsx",
          "src/components/ui/SettingsForm.tsx",
          "src/components/ui/SettingsPanel.tsx",
          "src/app/login/page.tsx",
          "src/app/developer/overview/page.tsx",
          "src/app/developer/earnings/page.tsx",
          "src/app/developer/settings/page.tsx",
          "src/app/design/ia/page.tsx",
          "src/app/design/components/catalog.ts",
          "src/app/design/components/settings-form/page.tsx",
        ],
      },
      {
        text: "Developer's Integration page renamed to Surfaces and rebuilt: a \"Kili Surfaces\" card grid (VS Code surface card with an Active/Inactive badge + Install button) and an \"Integrate your own surfaces\" section with a Coming soon empty state — replaces the old API-key/install-snippet/heartbeat-status content.",
        files: [
          "src/app/developer/surfaces/page.tsx",
          "src/app/developer/surfaces/surfaces.module.css",
          "src/components/dashboard-shell.tsx",
          "src/app/design/components/catalog.ts",
          "src/app/design/ia/page.tsx",
        ],
      },
    ],
  },
  {
    date: "24 August 26 — B",
    changes: [
      {
        text: 'Login page rebuilt as a split-panel layout: an empty animated left panel (background inverts dark/light opposite the app theme) beside a centered sign-in card — Advertiser/Platform switcher, "Continue with Google", email form, and a magic-link "Check your inbox" step (replaces the old OTP step). Footer holds ToS/Privacy placeholder links + a theme-toggle icon button. Left panel hides ≤980px; panels split 60/40.',
        files: ["src/app/login/page.tsx", "src/app/login/login.module.css"],
      },
      {
        text: "New Dot Swirl component — canvas-drawn monochrome background: a swirl-warped noise field quantized through 4x4 ordered (Bayer) dithering into an ASCII-character grid (shaded by intensity for depth), forming a ring around a fixed empty center with rotating arms. Tracks the pointer at the window level (works through overlapping UI) to swap nearby characters to a distinct glyph. Respects prefers-reduced-motion. Used as the Login left panel's background.",
        files: [
          "src/components/ui/DotSwirl.tsx",
          "src/components/ui/DotSwirl.module.css",
          "src/app/design/components/dot-swirl/page.tsx",
          "src/app/design/components/catalog.ts",
        ],
      },
      {
        text: "New Card Carousel + Carousel Dots components — one text-only card (title + description) at a time, auto-advancing every 3s; Icon Button Prev/Next arrows outside the card navigate manually, Carousel Dots below show pagination (active dot is a pill with a fill-bar animation that drives the auto-advance, restarting on manual navigation). Shown centered over the Login left panel's Dot Swirl with Match/Serve/Measure copy.",
        files: [
          "src/components/ui/CardCarousel.tsx",
          "src/components/ui/CardCarousel.module.css",
          "src/components/ui/CarouselDots.tsx",
          "src/components/ui/CarouselDots.module.css",
          "src/app/design/components/card-carousel/page.tsx",
          "src/app/design/components/carousel-dots/page.tsx",
          "src/app/design/components/catalog.ts",
          "src/app/login/page.tsx",
        ],
      },
    ],
  },
  {
    date: "24 August 26",
    changes: [
      {
        text: "New Heartbeat Indicator component — a pixel-block heart (clipped to its own silhouette) over a scrolling EKG line, 5 states (healthy/warning/critical/empty/refreshing) with a header refresh button and a footer status row + icon badge.",
        files: [
          "src/components/ui/HeartbeatIndicator.tsx",
          "src/components/ui/HeartbeatIndicator.module.css",
          "src/app/design/components/heartbeat-indicator/page.tsx",
          "src/app/design/components/catalog.ts",
        ],
      },
      {
        text: "Pixel Setup and Platform Integration: Install snippet card now sits beside a new API Status Heartbeat Indicator (snippet panel is full width); status reacts to the pink settings FAB's Empty states/Loading states toggles.",
        files: [
          "src/app/advertiser/pixel-tracking/page.tsx",
          "src/app/advertiser/pixel-tracking/pixel-tracking.module.css",
          "src/app/platform/integration/page.tsx",
          "src/app/platform/integration/integration.module.css",
        ],
      },
      {
        text: 'Pixel Setup page copy renamed from "Pixel" to "API" throughout (title, API keys, install snippet URL, verify message) — sidebar nav label and internal pixel-key state names left as-is.',
        files: ["src/app/advertiser/pixel-tracking/page.tsx"],
      },
    ],
  },
  {
    date: "21 August 26",
    changes: [
      {
        text: "Pixel Tracking renamed to Pixel Setup in the advertiser nav (plug icon); the page itself is just the install/verify flow, no KPI strip.",
        files: [
          "src/components/dashboard-shell.tsx",
          "src/app/advertiser/pixel-tracking/page.tsx",
        ],
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
        files: [
          "src/app/advertiser/overview/page.tsx",
          "src/lib/use-mobile.ts",
        ],
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
        files: [
          "src/components/ui/Button.tsx",
          "src/components/ui/Button.module.css",
          "src/app/globals.css",
        ],
      },
      {
        text: "IA page and components catalog updated to match: Pixel Setup/Events Tracking split, new Cost Breakdown and Key Manager entries, corrected KPI Strip/KPI Small Strip/Trend Chart usedIn.",
        files: [
          "src/app/design/ia/page.tsx",
          "src/app/design/components/catalog.ts",
        ],
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
        text: '"View docs" buttons on Pixel Tracking and Integration, linking to npm.',
        files: [
          "src/app/advertiser/pixel-tracking/page.tsx",
          "src/app/platform/integration/page.tsx",
        ],
      },
      {
        text: "API key creation is now instant (no config modal). Removed the unused Create Api Key Modal; API keys table trimmed to Key + Options.",
        files: [
          "src/components/demo-state.tsx",
          "src/app/platform/integration/page.tsx",
        ],
      },
      {
        text: "Pixel Tracking platform tabs reordered — React and Next.js first.",
        files: ["src/app/advertiser/pixel-tracking/page.tsx"],
      },
      {
        text: 'Fixed "View docs" button and Node/Next.js tabs stretching/misaligning at tablet widths; docs button capped at 200px.',
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
        text: 'Integration "Install snippet" card hidden until an API key exists.',
        files: ["src/app/platform/integration/page.tsx"],
      },
      {
        text: "Fixed Trend Chart y-axis numbers overlapping the plotted line on mobile.",
        files: [
          "src/components/ui/TrendChart.tsx",
          "src/components/ui/TrendChart.module.css",
        ],
      },
      {
        text: "Fixed Trend Chart pan/granularity animation jump.",
        files: ["src/components/ui/TrendChart.tsx"],
      },
      {
        text: 'Removed redundant "Next" badge from Platform Earnings payout history.',
        files: ["src/components/ui/HistoryTable.tsx"],
      },
      {
        text: "Payout method text bumped to 20px on desktop.",
        files: ["src/app/platform/earnings/earnings.module.css"],
      },
    ],
  },
];
