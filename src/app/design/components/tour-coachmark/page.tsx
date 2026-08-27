"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { TourCoachmark } from "@/components/ui/TourCoachmark";
import type { DeveloperTourStep } from "@/lib/developer-tour";
import { StateToggle } from "../state-toggle";
import styles from "../demo.module.css";

const DEMOS = [
  {
    label: "surface",
    title: "Kili Surfaces",
    description: "Illustration state used to introduce the available surfaces.",
    illustration: "hexagons",
    placement: "bottom",
  },
  {
    label: "command",
    title: "VS Code Extension",
    description: "Code state with a copy action for the install command.",
    code: "npx -y @kili-ai/install",
    placement: "right",
  },
  {
    label: "overview",
    title: "Overview",
    description: "Chart illustration used when the tour reaches Overview.",
    illustration: "overview",
    placement: "bottom",
  },
  {
    label: "kpis",
    title: "Revenue, Impressions & eCPM",
    description: "Metric illustration used for the KPI strip.",
    illustration: "kpi",
    placement: "bottom",
  },
  {
    label: "payout",
    title: "Payout method",
    description: "Stripe illustration used on the Earnings screen.",
    illustration: "stripe",
    placement: "bottom",
  },
  {
    label: "help",
    title: "Need help?",
    description: "Final code state with Finish in place of Next.",
    code: "support@trykili.ai",
    placement: "top",
  },
] as const satisfies readonly (Pick<
  DeveloperTourStep,
  "title" | "description" | "code" | "illustration" | "placement"
> & { label: string })[];

type DemoLabel = (typeof DEMOS)[number]["label"];
const DEMO_LABELS = DEMOS.map(({ label }) => label) as DemoLabel[];

export default function TourCoachmarkPage() {
  const anchorRef = useRef<HTMLDivElement>(null);
  const [activeLabel, setActiveLabel] = useState<DemoLabel>(DEMO_LABELS[0]);
  const [anchorRect, setAnchorRect] = useState<DOMRect | null>(null);
  const [open, setOpen] = useState(false);
  const stepIndex = DEMOS.findIndex(({ label }) => label === activeLabel);
  const demo = DEMOS[stepIndex];

  useEffect(() => {
    if (!open) return;
    const measure = () => setAnchorRect(anchorRef.current?.getBoundingClientRect() ?? null);
    measure();
    window.addEventListener("resize", measure);
    window.addEventListener("scroll", measure, true);
    return () => {
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", measure, true);
    };
  }, [open]);

  const goTo = (index: number) => {
    const next = DEMOS[index];
    if (next) setActiveLabel(next.label);
  };

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Tour Coachmark</h1>
      <p className={styles.subtitle}>
        Anchors to a real element with a directional pointer, media or copyable
        code, step progress, Close, and Previous/Next controls. At ≤800px it
        becomes a fixed bottom drawer while retaining the anchor spotlight.
        Choose a dashboard state, then open its preview.
      </p>

      <div className={styles.section}>
        <div className={styles.row}>
          <StateToggle
            options={DEMO_LABELS}
            value={activeLabel}
            onChange={setActiveLabel}
          />
          <Button variant="secondary" size="sm" onClick={() => setOpen(true)}>
            Open preview
          </Button>
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.coachmarkPreview}>
          <div ref={anchorRef} className={styles.coachmarkAnchor} aria-hidden="true" />
        </div>
      </div>

      {open && anchorRect && (
        <TourCoachmark
          anchorRect={anchorRect}
          placement={demo.placement}
          title={demo.title}
          description={demo.description}
          code={"code" in demo ? demo.code : undefined}
          illustration={"illustration" in demo ? demo.illustration : undefined}
          stepIndex={stepIndex}
          stepCount={DEMOS.length}
          isLast={stepIndex === DEMOS.length - 1}
          onNext={() => {
            if (stepIndex === DEMOS.length - 1) setOpen(false);
            else goTo(stepIndex + 1);
          }}
          onPrevious={() => goTo(stepIndex - 1)}
          onClose={() => setOpen(false)}
        />
      )}
    </div>
  );
}
