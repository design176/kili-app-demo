import { Fragment } from "react";
import { Button } from "@/components/ui/Button";
import styles from "./button-demo.module.css";
import { ButtonPreview } from "./button-preview";

const variants = ["primary", "secondary", "ghost", "destructive", "accent"] as const;
const sizes = ["sm", "md", "lg", "xl"] as const;

export default function ButtonPage() {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Button</h1>
      <p className={styles.subtitle}>
        5 variants × 4 sizes, plus a disabled state. Accent/Destructive are a
        glossy colored fill. Primary/Secondary are monochrome and invert with
        the theme — whichever is black gets the same glossy treatment,
        whichever is white gets its own gradient/border recipe so it doesn't
        wash out. Ghost has no background until interacted with. Each preview
        has its own Default/Hover/Active toggle since real `:hover`/`:active`
        can't be held on demand.
      </p>

      <div className={styles.section}>
        <div className={styles.sectionTitle}>All variants × sizes</div>
        <div className={styles.grid}>
          <div />
          {sizes.map((s) => (
            <div key={s} className={styles.colLabel}>
              {s}
            </div>
          ))}
          {variants.map((v) => (
            <Fragment key={v}>
              <div className={styles.rowLabel}>{v}</div>
              {sizes.map((s) => (
                <ButtonPreview key={`${v}-${s}`} variant={v} size={s} />
              ))}
            </Fragment>
          ))}
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionTitle}>Disabled</div>
        <div className={styles.sectionDesc}>
          Overrides the variant's color entirely — always the same muted
          look, regardless of which variant it's disabling.
        </div>
        <div className={styles.disabledRow}>
          {variants.map((v) => (
            <Button key={v} variant={v} disabled>
              Label
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
