# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

- `npm run dev` — start the dev server (also regenerates the AGENTS.md block above via `next dev`)
- `npm run build` — production build
- `npm run lint` — ESLint (flat config: `eslint-config-next` core-web-vitals + typescript)
- No test suite is configured in this repo.

## Architecture

- Next.js 16 App Router, TypeScript, no backend. Real product screens live under `src/app/advertiser/*` (`overview`, `campaigns` + `[id]` + `new`, `billing`, `pixel-tracking`, `events-tracking`, `settings`) and `src/app/platform/*` (`overview`, `integration`, `earnings`, `settings`), plus `src/app/login`; `src/app/design/*` is the component catalog/demo area. `DashboardShell` derives which workspace it's rendering from the URL prefix, not from global state.
- All UI is built from `src/components/ui/*`; every component there must have a demo page under `src/app/design/components/<slug>/page.tsx` and an entry in `src/app/design/components/catalog.ts`. See AGENTS.md above for the full rules on this — it is the single source of truth for UI conventions, global state (`src/components/demo-state.tsx`), mock data (`src/lib/mock-data.ts`, `src/lib/format.ts`), the responsive breakpoints, and the chart components' data shape/animation approach.
- Path alias `@/*` maps to `src/*` (see `tsconfig.json`).
