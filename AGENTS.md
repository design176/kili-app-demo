<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# UI component library — single source of truth

Every UI element (atom, molecule, or organism) lives in `src/components/ui/` and has a corresponding demo page at `src/app/design/components/<slug>/page.tsx`, cataloged in `src/app/design/components/catalog.ts`. This is the **single source of truth** for UI — the whole app (product screens, docs pages, everything) is built by composing these, not by writing one-off styled JSX inline.

- **Never inline-style or hand-roll something that already exists as a component.** If you need a button, table, badge, form field, etc., import it from `@/components/ui/*` — don't reach for a raw `<button>`/`<table>`/inline `style={{...}}` block instead.
- **Adding a new component or changing an existing one must be reflected in `/design/components`:**
  - New component → add it under `src/components/ui/`, give it a demo page under `src/app/design/components/<slug>/page.tsx` showing its states/variants, and add an entry to `catalog.ts` (`status: "built"`).
  - Changed component (new prop, new variant, restyle) → update its demo page so the catalog stays an accurate, live reference — the demo page is documentation, not just a test harness.
- Reuse composition over duplication: higher-level components should compose existing atoms/molecules (e.g. `IconButton` reuses `Button`'s color CSS, `Tabs` renders real `Button`s, `CampaignTable`/`HistoryTable` wrap the generic `Table`) rather than reimplementing their styling.
- Shared demo-page scaffolding (`state-toggle.tsx`, `field-preview.tsx`, `demo.module.css` in `src/app/design/components/`) exists so every demo page inspects states (hover/active/focus/error/disabled) the same way — reuse it for new demo pages instead of inventing new patterns.

# What this project is

A UI/UX-only prototype (no real backend) for **Kili**, There are two dashboards, **Advertiser** and **Developer** (renamed from "Platform"), each under its own route prefix but sharing the same `DashboardShell`/`SidebarNav` component. The pink gear FAB bottom-right (`SettingsPanel`) switches between them (navigates to the other workspace's Overview) and also has New user / Empty states toggles for exercising other states. `Option/Alt+D` toggles light/dark theme.

Real app screens live under `src/app/advertiser/*` (`overview`, `campaigns` + `[id]` detail + `new` wizard, `billing`, `pixel-tracking` ("Pixel Setup" in nav — install/verify the client pixel), `events-tracking` (conversion KPIs + purchase-event feed), `settings`) and `src/app/developer/*` (`overview`, `surfaces` + `[id]` detail ("Surfaces" — where Kili ads actually appear, e.g. a VS Code extension; replaces the old "Integration" screen), `earnings`, `settings`), plus `src/app/login`. `DashboardShell` (`src/components/dashboard-shell.tsx`) derives which workspace it's rendering from the URL (`pathname.startsWith("/advertiser")`) rather than from any global state — so a page's route, not a toggle, decides which sidebar sections and nav routes it gets. Each workspace's sidebar sections/routes are defined as separate lookup objects inline in that file (`advertiserSections`/`advertiserRoutes` vs `developerSections`/`developerRoutes`). There is **no standalone `/placement` route** and **no `CreateApiKeyModal`** — the "Create API key" buttons (advertiser pixel keys, developer API keys) call `addApiKey()`/`addPixelKey()` directly with no modal.

The developer workspace also has a guided walkthrough: `src/lib/developer-tour.ts` defines an ordered list of steps (anchor selector to point a coachmark at, placement, title/description, optional code snippet or illustration, `isLast`). While a tour is active (`developerTourStep >= 0` in demo state), `DashboardShell` suppresses normal sidebar nav clicks so the coachmark's own Previous/Next controls drive routing instead. It's started via `startDeveloperTour()` (from login or the Settings help modal) and is independent of the `isNewUser` toggle — going back to an existing user does close any tour left running, but toggling into new-user mode does not auto-start one.

The sidebar's "Bug report" item opens a Tally.so popup (`src/lib/tally.ts`, form id `ja8LLE`) rather than an in-app form or route.

# Global demo state and persistence

`src/components/demo-state.tsx` (`DemoStateProvider`, mounted once in the root layout) is the single source of truth for cross-page ephemeral state: `isNewUser`, `forceEmptyStates`, `forceLoadingStates`, `sidebarCollapsed`, `balance`, `apiKeys`, `pixelKeys`, `developerTourStep`, `kycComplete`. `balance`, `apiKeys`, `pixelKeys`, `developerTourStep`, and `kycComplete` are persisted to `localStorage` (`kili-demo-balance`, `kili-demo-api-keys`, `kili-demo-pixel-keys`, `kili-demo-developer-tour-step`, `kili-demo-kyc-complete`) and **reset when `setIsNewUser(true)` is called** (simulates a fresh signup: balance/keys clear, `kycComplete` becomes false) — toggling back off restores normal-user state (balance and KYC complete, any running tour closed). Any new piece of state meant to represent "this account's data" should follow the same pattern (add to the provider, persist, reset on new-user) rather than living as page-local `useState`. Which dashboard is active is **not** in this provider — it's derived from the URL (see above), not stored as state.

Mock fixtures live in `src/lib/mock-data.ts` (single source so values agree across pages, e.g. sidebar balance vs Billing page), formatting helpers in `src/lib/format.ts`.

# Responsive convention

Two breakpoints used consistently app-wide — match these rather than inventing new ones:

- **≤1200px ("tablet")**: page _content_ reflows (multi-column rows stack to `flex-direction: column`, remember `align-items: stretch` when doing so or children shrink-to-content instead of filling width) — the shell/sidebar are untouched.
- **≤800px ("mobile")**: shell changes. `DashboardShell`'s `.shell` loses its padding and `.main` loses its border/radius (the page becomes edge-to-edge). The sidebar (`SidebarNav`) is **always `position: fixed`** at this width (collapsed 48px rail or expanded 200px overlay drawer, both fixed — never in-flow) so it never participates in the flex layout; `.main` gets a permanent `margin-left: 48px` gutter instead. Don't let a "collapsed" and "expanded" state differ in flow-participation (one fixed, one static) — that's what causes layout-jump bugs.

# Chart components

`TrendChart` and `StackedBarChart` (`src/components/ui/`) take a `data: Record<"daily"|"weekly"|"monthly", Dataset>` keyed by `RangeFilter`'s granularity (not flat `series`/`xLabels`) so switching granularity swaps the whole x-axis. Panning/granularity-change animates the line by tweening values with `animate()` from the `motion` package (not by remounting/keying the `motion.path`, which causes a disappear-redraw flash). Y-axis labels are plain HTML `<span>`s absolutely positioned over the chart, **not** SVG `<text>` — text inside the scaled `viewBox` resizes with chart width, which is a bug, not a feature.
