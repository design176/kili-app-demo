import { CardCarousel } from "@/components/ui/CardCarousel";
import styles from "../demo.module.css";

const ITEMS = [
  {
    title: "Match",
    description:
      "Kili scores every eligible sponsor against the buying intent in the query and drops anything below your floor.",
  },
  {
    title: "Serve",
    description:
      "Loading placement, in-answer text or display card inventory brands cannot buy anywhere else, rendered inside your interface.",
  },
  {
    title: "Measure",
    description:
      "Closed-loop measurement with CAPI, so a CPM buy can still be judged on what it actually produced.",
  },
];

export default function CardCarouselPage() {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Card Carousel</h1>
      <p className={styles.subtitle}>
        One card at a time, auto-advancing via the fill bar in the active
        Carousel Dot below; Prev/Next arrows outside the card navigate manually
        and restart the timer.
      </p>

      <div className={styles.section}>
        <div
          style={{
            padding: 40,
            borderRadius: 12,
            background: "linear-gradient(160deg, #2a2a2a 0%, #0a0a0a 70%)",
          }}
        >
          <CardCarousel items={ITEMS} />
        </div>
      </div>
    </div>
  );
}
