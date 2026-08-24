import { DotSwirl } from "@/components/ui/DotSwirl";
import styles from "../demo.module.css";

export default function DotSwirlPage() {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Dot Swirl</h1>
      <p className={styles.subtitle}>
        Monochrome animated background — a swirl-warped noise field quantized
        through 4x4 ordered (Bayer) dithering into an ASCII-character grid
        (shaded by intensity for depth) forming a ring around a fixed empty
        center; the arms rotate in place. Move your mouse over the box below —
        nearby characters swap to a different glyph.
      </p>

      <div className={styles.section}>
        <div
          style={{
            position: "relative",
            width: 480,
            height: 320,
            maxWidth: "100%",
            borderRadius: 12,
            overflow: "hidden",
            background: "linear-gradient(160deg, #2a2a2a 0%, #0a0a0a 70%)",
          }}
        >
          <DotSwirl />
        </div>
      </div>
    </div>
  );
}
