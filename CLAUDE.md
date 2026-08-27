# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

- `npm run dev` — start the dev server (also regenerates the AGENTS.md block above via `next dev`)
- `npm run build` — production build
- `npm run lint` — ESLint (flat config: `eslint-config-next` core-web-vitals + typescript)
- No test suite is configured in this repo.

## Architecture

- Next.js 16 App Router, TypeScript, no backend. Real product screens live under `src/app/advertiser/*` (`overview`, `campaigns` + `[id]` + `new`, `billing`, `pixel-tracking`, `events-tracking`, `settings`) and `src/app/developer/*` (`overview`, `surfaces` + `[id]`, `earnings`, `settings` — this workspace was renamed from "platform"), plus `src/app/login`; `src/app/design/*` is the component catalog/demo area. `src/components/dashboard-shell.tsx` derives which workspace it's rendering from the URL prefix (`pathname.startsWith("/advertiser")`), not from global state — each workspace has its own sidebar sections/routes defined inline in that file.
- All UI is built from `src/components/ui/*`; every component there must have a demo page under `src/app/design/components/<slug>/page.tsx` and an entry in `src/app/design/components/catalog.ts`. See AGENTS.md above for the full rules on this — it is the single source of truth for UI conventions, global state (`src/components/demo-state.tsx`), mock data (`src/lib/mock-data.ts`, `src/lib/format.ts`), the responsive breakpoints, and the chart components' data shape/animation approach.
- `src/app/design/*` beyond `components/` also has: `ia` (information-architecture reference tree of every screen, MVP-vs-later tagged), `changelog` (hand-maintained entries in `changelog-data.ts`, copyable as plain text or markdown), and `emails` (transactional/marketing email catalog in `catalog.ts` with Handlebars templates — raw source also mirrored under `emails/_templates/*.hbs` — rendered per-slug at `emails/[slug]`).
- The developer workspace has a guided walkthrough (`src/lib/developer-tour.ts` defines the step sequence: anchor selector, placement, copy, optional code snippet/illustration; driven by `developerTourStep` in demo state) that takes over sidebar navigation while active — `DashboardShell` ignores nav clicks and steps forward via the coachmark's Previous/Next instead. Bug reports (the sidebar's "Bug report" item) open a Tally.so popup via `src/lib/tally.ts`, not an in-app form.
- Path alias `@/*` maps to `src/*` (see `tsconfig.json`).
