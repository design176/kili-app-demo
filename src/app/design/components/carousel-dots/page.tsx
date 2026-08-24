"use client";

import { useState } from "react";
import { CarouselDots } from "@/components/ui/CarouselDots";
import styles from "../demo.module.css";

export default function CarouselDotsPage() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Carousel Dots</h1>
      <p className={styles.subtitle}>
        Pagination dots — the active dot is a pill whose fill bar animates over
        a fixed duration and fires a callback on completion; other dots are
        small circles. Clicking any dot jumps to it.
      </p>

      <div className={styles.section}>
        <div
          style={{
            display: "inline-flex",
            padding: 24,
            borderRadius: 12,
            background: "linear-gradient(160deg, #2a2a2a 0%, #0a0a0a 70%)",
          }}
        >
          <CarouselDots
            count={4}
            activeIndex={activeIndex}
            durationMs={4000}
            onComplete={() => setActiveIndex((i) => (i + 1) % 4)}
            onSelect={setActiveIndex}
          />
        </div>
      </div>
    </div>
  );
}
