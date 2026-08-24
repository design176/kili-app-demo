"use client";

import { useState } from "react";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import { IconButton } from "./IconButton";
import { CarouselDots } from "./CarouselDots";
import styles from "./CardCarousel.module.css";

export type CardCarouselItem = {
  title: string;
  description: string;
};

export type CardCarouselProps = {
  items: CardCarouselItem[];
  autoAdvanceMs?: number;
  className?: string;
};

export function CardCarousel({
  items,
  autoAdvanceMs = 3000,
  className,
}: CardCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const goPrev = () => {
    setActiveIndex((i) => (i - 1 + items.length) % items.length);
  };

  const goNext = () => {
    setActiveIndex((i) => (i + 1) % items.length);
  };

  const active = items[activeIndex];

  return (
    <div className={[styles.wrap, className ?? ""].filter(Boolean).join(" ")}>
      <div className={styles.row}>
        <IconButton label="Previous" variant="secondary" onClick={goPrev}>
          <CaretLeft size={14} weight="bold" />
        </IconButton>

        <div className={styles.card}>
          <div className={styles.title}>{active.title}</div>
          <div className={styles.description}>{active.description}</div>
        </div>

        <IconButton label="Next" variant="secondary" onClick={goNext}>
          <CaretRight size={14} weight="bold" />
        </IconButton>
      </div>

      <div className={styles.dotsBackdrop}>
        <CarouselDots
          count={items.length}
          activeIndex={activeIndex}
          durationMs={autoAdvanceMs}
          onComplete={goNext}
          onSelect={setActiveIndex}
        />
      </div>
    </div>
  );
}
