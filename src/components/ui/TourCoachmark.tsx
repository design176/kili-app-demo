"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Check, Copy, X } from "@phosphor-icons/react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Button } from "./Button";
import { IconButton } from "./IconButton";
import { HexagonsIllustration, LineGraphIllustration, KpiIconsIllustration, StripeCardIllustration } from "./TourIllustrations";
import { useIsMobile } from "@/lib/use-mobile";
import type { TourPlacement, DeveloperTourStep } from "@/lib/developer-tour";
import styles from "./TourCoachmark.module.css";

export type TourCoachmarkProps = {
  anchorRect: DOMRect;
  placement: TourPlacement;
  title: string;
  description: string;
  code?: string;
  illustration?: DeveloperTourStep["illustration"];
  stepIndex: number;
  stepCount: number;
  isLast: boolean;
  isOnRoute?: boolean;
  onNext: () => void;
  onPrevious: () => void;
  onClose: () => void;
};

const PLACEMENT_CLASS: Record<TourPlacement, { outer: string; inner: string }> = {
  top: { outer: styles.pointerBorderBottom, inner: styles.pointerBottom },
  bottom: { outer: styles.pointerBorderTop, inner: styles.pointerTop },
  left: { outer: styles.pointerBorderRight, inner: styles.pointerRight },
  right: { outer: styles.pointerBorderLeft, inner: styles.pointerLeft },
};

/** Keeps the card's vertical center far enough down that a typical card height doesn't clip past the top of the viewport. */
const MIN_CENTER_Y = 160;
/** How far the pointer is allowed to drift from the card's vertical center to keep tracking the anchor. */
const MAX_POINTER_OFFSET = 90;

function getCardStyle(anchorRect: DOMRect, placement: TourPlacement) {
  const gap = 14;
  switch (placement) {
    case "right":
    case "left": {
      const anchorCenterY = anchorRect.top + anchorRect.height / 2;
      const cardCenterY = Math.max(anchorCenterY, MIN_CENTER_Y);
      const pointerOffsetY = Math.max(
        -MAX_POINTER_OFFSET,
        Math.min(MAX_POINTER_OFFSET, anchorCenterY - cardCenterY)
      );
      return placement === "right"
        ? {
            top: cardCenterY,
            left: anchorRect.right + gap,
            transform: "translateY(-50%)",
            pointerOffsetY,
          }
        : {
            top: cardCenterY,
            left: anchorRect.left - gap,
            transform: "translate(-100%, -50%)",
            pointerOffsetY,
          };
    }
    case "top":
      return {
        top: anchorRect.top - gap,
        left: anchorRect.left + anchorRect.width / 2,
        transform: "translate(-50%, -100%)",
        pointerOffsetY: 0,
      };
    case "bottom":
    default:
      return {
        top: anchorRect.bottom + gap,
        left: anchorRect.left + anchorRect.width / 2,
        transform: "translateX(-50%)",
        pointerOffsetY: 0,
      };
  }
}

const SPOTLIGHT_PADDING = 8;
const TITLE_ID = "developer-tour-title";
const DESCRIPTION_ID = "developer-tour-description";

export function TourCoachmark({
  anchorRect,
  placement,
  title,
  description,
  code,
  illustration = "hexagons",
  stepIndex,
  stepCount,
  isLast,
  isOnRoute = true,
  onNext,
  onPrevious,
  onClose,
}: TourCoachmarkProps) {
  const [copied, setCopied] = useState(false);
  const copyResetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isMobile = useIsMobile();
  const dialogRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key === "Tab" && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    // Move focus into the dialog when it opens / step changes — defer until after motion.
    const frame = requestAnimationFrame(() => {
      const focusable = dialogRef.current?.querySelector<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      focusable?.focus();
    });
    return () => cancelAnimationFrame(frame);
  }, [anchorRect, placement, stepIndex, isOnRoute]);

  useEffect(
    () => () => {
      if (copyResetTimer.current) clearTimeout(copyResetTimer.current);
    },
    []
  );

  if (typeof document === "undefined") return null;

  const handleCopy = async () => {
    if (!code) return;
    try {
      await navigator.clipboard.writeText(code);
    } catch {
      return;
    }
    setCopied(true);
    if (copyResetTimer.current) clearTimeout(copyResetTimer.current);
    copyResetTimer.current = setTimeout(() => setCopied(false), 1500);
  };

  const { pointerOffsetY, ...cardStyle } = getCardStyle(anchorRect, placement);
  const pointerStyle = pointerOffsetY !== 0 ? { top: `calc(50% + ${pointerOffsetY}px)` } : undefined;

  const spotlightSpring = shouldReduceMotion
    ? { duration: 0 }
    : { type: "spring" as const, stiffness: 380, damping: 32, mass: 0.7 };
  const cardSpring = shouldReduceMotion
    ? { duration: 0 }
    : { type: "spring" as const, stiffness: 420, damping: 34, mass: 0.7 };

  const content = (
    <>
      <div className={code ? styles.codeMedia : styles.illustration}>
        <IconButton
          variant="secondary"
          size="sm"
          label="Close walkthrough"
          className={styles.close}
          onClick={onClose}
        >
          <X size={14} weight="bold" />
        </IconButton>

        {code ? (
          <div className={styles.codeRow}>
            <div className={styles.codeInput}>
              <code className={styles.codeText}>{code}</code>
            </div>
            <IconButton
              variant="accent"
              size="md"
              label={copied ? "Command copied" : "Copy command"}
              onClick={handleCopy}
            >
              {copied ? <Check size={14} weight="bold" /> : <Copy size={14} weight="bold" />}
            </IconButton>
          </div>
        ) : illustration === "overview" ? (
          <LineGraphIllustration className={styles.lineGraphArt} />
        ) : illustration === "kpi" ? (
          <KpiIconsIllustration />
        ) : illustration === "stripe" ? (
          <StripeCardIllustration />
        ) : (
          <HexagonsIllustration className={styles.illustrationArt} />
        )}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={stepIndex}
          initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: -6 }}
          transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.22, ease: "easeOut" }}
        >
          <h3 id={TITLE_ID} className={styles.title}>
            {title}
          </h3>
          <p id={DESCRIPTION_ID} className={styles.description}>
            {description}
          </p>
        </motion.div>
      </AnimatePresence>

      <div className={styles.footer}>
        <div
          className={styles.dots}
          role="status"
          aria-label={`Step ${stepIndex + 1} of ${stepCount}`}
        >
          {Array.from({ length: stepCount }, (_, i) => (
            <span
              key={i}
              aria-hidden="true"
              className={`${styles.dot} ${i === stepIndex ? styles.dotActive : ""}`}
            />
          ))}
        </div>
        <div className={styles.actions}>
          {stepIndex > 0 && (
            <Button variant="secondary" size="sm" onClick={onPrevious}>
              Previous
            </Button>
          )}
          <Button variant="primary" size="sm" onClick={onNext}>
            {isLast ? "Finish" : "Next"}
          </Button>
        </div>
      </div>
    </>
  );

  const spotlightAnimate = {
    top: anchorRect.top - SPOTLIGHT_PADDING,
    left: anchorRect.left - SPOTLIGHT_PADDING,
    width: anchorRect.width + SPOTLIGHT_PADDING * 2,
    height: anchorRect.height + SPOTLIGHT_PADDING * 2,
    opacity: isOnRoute ? 1 : 0.25,
  };

  return createPortal(
    <>
      {/* Blocks hover/click on underlying page content so sidebar nav clicks,
          button clicks, and tooltip hovers don't fire while the tour is open.
          Visual dim is from `.spotlight`'s box-shadow; this layer is just the
          pointer-events shield. Clicking it does not close the tour. */}
      <div
        className={styles.backdrop}
        aria-hidden="true"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        onMouseDown={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      />

      {isMobile ? (
        <>
          <div
            className={styles.spotlight}
            style={{
              top: anchorRect.top - SPOTLIGHT_PADDING,
              left: anchorRect.left - SPOTLIGHT_PADDING,
              width: anchorRect.width + SPOTLIGHT_PADDING * 2,
              height: anchorRect.height + SPOTLIGHT_PADDING * 2,
              opacity: isOnRoute ? 1 : 0.25,
            }}
          />
          <div
            ref={dialogRef}
            className={styles.drawer}
            role="dialog"
            aria-modal="true"
            aria-labelledby={TITLE_ID}
            aria-describedby={DESCRIPTION_ID}
            style={{ opacity: isOnRoute ? 1 : 0, pointerEvents: isOnRoute ? "auto" : "none" }}
          >
            {content}
          </div>
        </>
      ) : (
        <>
          <motion.div
            className={styles.spotlight}
            initial={false}
            animate={spotlightAnimate}
            transition={spotlightSpring}
            style={{ willChange: "top, left, width, height, opacity" }}
          />
          <motion.div
            ref={dialogRef}
            className={styles.card}
            initial={false}
            animate={{
              top: cardStyle.top,
              left: cardStyle.left,
              opacity: isOnRoute ? 1 : 0,
            }}
            transition={cardSpring}
            style={{
              transform: cardStyle.transform,
              willChange: "top, left, opacity, transform",
              pointerEvents: isOnRoute ? "auto" : "none",
            }}
            role="dialog"
            aria-modal="true"
            aria-labelledby={TITLE_ID}
            aria-describedby={DESCRIPTION_ID}
          >
            <motion.span
              className={`${styles.pointerBorder} ${PLACEMENT_CLASS[placement].outer}`}
              initial={false}
              animate={{ top: pointerStyle?.top ?? "50%" }}
              transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.3, ease: "easeOut" }}
              style={pointerStyle ? { willChange: "top" } : undefined}
            />
            <motion.span
              className={`${styles.pointer} ${PLACEMENT_CLASS[placement].inner}`}
              initial={false}
              animate={{ top: pointerStyle?.top ?? "50%" }}
              transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.3, ease: "easeOut" }}
              style={pointerStyle ? { willChange: "top" } : undefined}
            />
            {content}
          </motion.div>
        </>
      )}
    </>,
    document.body
  );
}
