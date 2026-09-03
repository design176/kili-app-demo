export type TourPlacement = "top" | "bottom" | "left" | "right";

export type DeveloperTourStep = {
  id: string;
  route: string;
  anchorSelector: string;
  placement: TourPlacement;
  title: string;
  description: string;
  code?: string;
  /** Which inline illustration to render (ignored when `code` is set). Defaults to the hexagons artwork. */
  illustration?: "hexagons" | "overview" | "kpi" | "payout-method";
  /** Overrides the default 8px halo the spotlight adds around the anchor — use a smaller value for an anchor that's already borderless/padding-free. */
  spotlightPadding?: number;
  isLast?: boolean;
};

export const developerTourSteps: DeveloperTourStep[] = [
  {
    id: "surfaces",
    route: "/developer/surfaces",
    anchorSelector: '[data-tour="nav-surfaces"]',
    placement: "right",
    title: "Kili Surfaces",
    description: "Surfaces are where Kili ads actually show up. Install one below to start earning.",
  },
  {
    id: "claude-code-surface",
    route: "/developer/surfaces",
    anchorSelector: '[data-tour="tour-claude-code-card"]',
    placement: "right",
    title: "Claude Code",
    description: "Shows ads in Claude Code CLI in your terminal and VS Code. Install it by running this in your terminal:",
    code: "npx -y @kili-ai/install",
  },
  {
    id: "nav-overview",
    route: "/developer/overview",
    anchorSelector: '[data-tour="nav-overview"]',
    placement: "right",
    title: "Overview",
    description: "Head here to see the money you've earned across all your surfaces, in one place.",
    illustration: "overview",
  },
  {
    id: "kpi-strip",
    route: "/developer/overview",
    anchorSelector: '[data-tour="tour-kpi-strip"]',
    placement: "bottom",
    title: "Revenue, Impressions & eCPM",
    description: "Revenue is your total earnings, Impressions is how many times your ads were shown, and eCPM is revenue per 1,000 impressions.",
    illustration: "kpi",
  },
  {
    id: "payout-method",
    route: "/developer/earnings",
    anchorSelector: '[data-tour="tour-payout-method"]',
    placement: "bottom",
    title: "Payout method",
    description: "Add either an EVM wallet or a Stripe-linked bank account to get paid out automatically.",
    illustration: "payout-method",
    spotlightPadding: 0,
  },
  {
    id: "settings-help",
    route: "/developer/settings",
    anchorSelector: '[data-tour="tour-settings-help"]',
    placement: "bottom",
    title: "Need help?",
    description: "Click this anytime to replay this walkthrough. Stuck on something else? Reach out to us here:",
    code: "support@trykili.ai",
    isLast: true,
  },
];
