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
  illustration?: "hexagons" | "overview" | "kpi" | "stripe";
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
    id: "vscode-surface",
    route: "/developer/surfaces",
    anchorSelector: '[data-tour="tour-vscode-card"]',
    placement: "right",
    title: "VS Code Extension",
    description: "Shows ads right inside your editor while you code. Install it by running this in your terminal:",
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
    description: "Connect a Stripe account to get paid out automatically — or skip this for now and set it up later.",
    illustration: "stripe",
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
