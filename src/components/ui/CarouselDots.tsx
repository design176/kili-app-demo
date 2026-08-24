import styles from "./CarouselDots.module.css";

export type CarouselDotsProps = {
  count: number;
  activeIndex: number;
  /** How long the active dot's bar takes to fill, in ms. */
  durationMs: number;
  /** Called once the active dot's bar finishes filling. */
  onComplete: () => void;
  onSelect: (index: number) => void;
  className?: string;
};

export function CarouselDots({
  count,
  activeIndex,
  durationMs,
  onComplete,
  onSelect,
  className,
}: CarouselDotsProps) {
  return (
    <div className={[styles.dots, className ?? ""].filter(Boolean).join(" ")}>
      {Array.from({ length: count }, (_, i) => {
        const isActive = i === activeIndex;
        return (
          <button
            key={i}
            type="button"
            className={styles.dot}
            aria-label={`Go to slide ${i + 1}`}
            aria-current={isActive}
            onClick={() => onSelect(i)}
          >
            {isActive ? (
              <span className={styles.activeShape}>
                <span
                  key={activeIndex}
                  className={styles.fill}
                  style={{ animationDuration: `${durationMs}ms` }}
                  onAnimationEnd={onComplete}
                />
              </span>
            ) : (
              <span className={styles.dotShape} />
            )}
          </button>
        );
      })}
    </div>
  );
}
