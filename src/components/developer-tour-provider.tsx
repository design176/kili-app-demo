"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useDemoState } from "@/components/demo-state";
import { developerTourSteps } from "@/lib/developer-tour";
import { TourCoachmark } from "@/components/ui/TourCoachmark";

const DeveloperTourContext = createContext<{ replayTour: () => void } | null>(null);

/** Replays the developer walkthrough from step one, navigating there if needed. */
export function useDeveloperTour() {
  const ctx = useContext(DeveloperTourContext);
  if (!ctx) throw new Error("useDeveloperTour must be used within DeveloperTourProvider");
  return ctx;
}

export function DeveloperTourProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const {
    developerTourStep,
    startDeveloperTour,
    advanceDeveloperTour,
    retreatDeveloperTour,
    closeDeveloperTour,
    sidebarCollapsed,
  } = useDemoState();

  const step = developerTourSteps[developerTourStep];
  const onRoute = !!step && step.route === pathname;

  const [anchor, setAnchor] = useState<{ stepId: string; rect: DOMRect } | null>(null);

  useEffect(() => {
    if (!onRoute || !step) return;

    let cancelled = false;
    let attempts = 0;
    let frame = 0;
    let resizeObserver: ResizeObserver | null = null;

    function measure() {
      if (cancelled || !step) return;
      const el = document.querySelector<HTMLElement>(step.anchorSelector);
      if (el) {
        setAnchor({ stepId: step.id, rect: el.getBoundingClientRect() });
        if (!resizeObserver) {
          resizeObserver = new ResizeObserver(scheduleMeasure);
          resizeObserver.observe(el);
        }
        return;
      }
      attempts += 1;
      if (attempts < 20) scheduleMeasure();
    }

    function scheduleMeasure() {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    }

    scheduleMeasure();
    window.addEventListener("resize", scheduleMeasure);
    window.addEventListener("scroll", scheduleMeasure, true);

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      resizeObserver?.disconnect();
      window.removeEventListener("resize", scheduleMeasure);
      window.removeEventListener("scroll", scheduleMeasure, true);
    };
  }, [onRoute, step, sidebarCollapsed]);

  const goToStep = (index: number) => {
    const target = developerTourSteps[index];
    if (target && target.route !== pathname) router.push(target.route);
  };

  const handleNext = () => {
    goToStep(developerTourStep + 1);
    advanceDeveloperTour();
  };

  const handlePrevious = () => {
    goToStep(developerTourStep - 1);
    retreatDeveloperTour();
  };

  const replayTour = () => {
    goToStep(0);
    startDeveloperTour();
  };

  return (
    <DeveloperTourContext.Provider value={{ replayTour }}>
      {children}
      {onRoute && step && anchor?.stepId === step.id && (
        <TourCoachmark
          anchorRect={anchor.rect}
          placement={step.placement}
          title={step.title}
          description={step.description}
          code={step.code}
          illustration={step.illustration}
          stepIndex={developerTourStep}
          stepCount={developerTourSteps.length}
          isLast={!!step.isLast}
          onNext={handleNext}
          onPrevious={handlePrevious}
          onClose={closeDeveloperTour}
        />
      )}
    </DeveloperTourContext.Provider>
  );
}
