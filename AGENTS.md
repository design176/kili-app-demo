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

A UI/UX-only prototype (no real backend) for **Kili**, a direct competitor to Gravity (trygravity.ai — "the ad network for AI"). There are two dashboards sharing the same shell: **Advertiser** and **Platform**, switched via the pink gear FAB bottom-right (`SettingsPanel`), which also has New user / Empty states toggles for exercising other states. `Option/Alt+D` toggles light/dark theme.

Real app screens live under `src/app/*`: `overview`, `campaigns` (+ `[id]` detail, + `new` wizard), `billing`, `settings`, `earnings`, `integration`, `pixel-tracking`, `login`. There is **no standalone `/placement` route** — ad placement config was folded into Integration's "Create API key" modal (`CreateApiKeyModal`), shown per-key, not as a global setting.

# Global demo state and persistence

`src/components/demo-state.tsx` (`DemoStateProvider`, mounted once in the root layout) is the single source of truth for cross-page ephemeral state: `isNewUser`, `dashboard`, `forceEmptyStates`, `sidebarCollapsed`, `balance`, `apiKeys`. `balance` and `apiKeys` are persisted to `localStorage` (`kili-demo-balance`, `kili-demo-api-keys`) and **reset when `setIsNewUser(true)` is called** (simulates a fresh signup) — any new piece of state meant to represent "this account's data" should follow that same pattern (add to the provider, persist, reset on new-user) rather than living as page-local `useState`.

Mock fixtures live in `src/lib/mock-data.ts` (single source so values agree across pages, e.g. sidebar balance vs Billing page), formatting helpers in `src/lib/format.ts`.

# Responsive convention

Two breakpoints used consistently app-wide — match these rather than inventing new ones:
- **≤1200px ("tablet")**: page *content* reflows (multi-column rows stack to `flex-direction: column`, remember `align-items: stretch` when doing so or children shrink-to-content instead of filling width) — the shell/sidebar are untouched.
- **≤800px ("mobile")**: shell changes. `DashboardShell`'s `.shell` loses its padding and `.main` loses its border/radius (the page becomes edge-to-edge). The sidebar (`SidebarNav`) is **always `position: fixed`** at this width (collapsed 48px rail or expanded 200px overlay drawer, both fixed — never in-flow) so it never participates in the flex layout; `.main` gets a permanent `margin-left: 48px` gutter instead. Don't let a "collapsed" and "expanded" state differ in flow-participation (one fixed, one static) — that's what causes layout-jump bugs.

# Chart components

`TrendChart` and `StackedBarChart` (`src/components/ui/`) take a `data: Record<"daily"|"weekly"|"monthly", Dataset>` keyed by `RangeFilter`'s granularity (not flat `series`/`xLabels`) so switching granularity swaps the whole x-axis. Panning/granularity-change animates the line by tweening values with `animate()` from the `motion` package (not by remounting/keying the `motion.path`, which causes a disappear-redraw flash). Y-axis labels are plain HTML `<span>`s absolutely positioned over the chart, **not** SVG `<text>` — text inside the scaled `viewBox` resizes with chart width, which is a bug, not a feature.
