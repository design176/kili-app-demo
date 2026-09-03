"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  useTransition,
  type ReactNode,
} from "react";
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
  const [, startTransition] = useTransition();
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
  const tourActive = developerTourStep >= 0 && !!step;

  const [anchor, setAnchor] = useState<{ stepId: string; rect: DOMRect } | null>(null);
  const prevRectRef = useRef<DOMRect | null>(null);

  // Keep last rect to tween from when navigating between routes.
  useEffect(() => {
    if (anchor?.rect) prevRectRef.current = anchor.rect;
  }, [anchor]);

  useEffect(() => {
    if (!step) {
      setAnchor(null);
      return;
    }
    // Don't clear anchor when off-route — keep prevRect for cross-route motion.
    if (!onRoute) return;

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
    const nextIndex = developerTourStep + 1;
    const target = developerTourSteps[nextIndex];
    startTransition(() => {
      advanceDeveloperTour();
      if (target && target.route !== pathname) router.push(target.route);
    });
  };

  const handlePrevious = () => {
    const prevIndex = developerTourStep - 1;
    const target = developerTourSteps[prevIndex];
    startTransition(() => {
      retreatDeveloperTour();
      if (target && target.route !== pathname) router.push(target.route);
    });
  };

  const replayTour = () => {
    const target = developerTourSteps[0];
    startTransition(() => {
      startDeveloperTour();
      if (target && target.route !== pathname) router.push(target.route);
    });
  };

  const isMeasuring = tourActive && (!anchor || anchor.stepId !== step.id);
  const renderRect = anchor?.rect ?? prevRectRef.current;

  return (
    <DeveloperTourContext.Provider value={{ replayTour }}>
      {children}
      {tourActive && renderRect && (
        <TourCoachmark
          anchorRect={renderRect}
          placement={step.placement}
          title={step.title}
          description={step.description}
          code={step.code}
          illustration={step.illustration}
          spotlightPadding={step.spotlightPadding}
          stepIndex={developerTourStep}
          stepCount={developerTourSteps.length}
          isLast={!!step.isLast}
          isOnRoute={onRoute && !isMeasuring}
          onNext={handleNext}
          onPrevious={handlePrevious}
          onClose={closeDeveloperTour}
          onJoinDiscord={() => {
            window.open("https://discord.gg/ud22UbERd", "_blank", "noopener,noreferrer");
          }}
        />
      )}
    </DeveloperTourContext.Provider>
  );
}
