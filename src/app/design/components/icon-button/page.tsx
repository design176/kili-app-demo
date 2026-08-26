"use client";

import { Copy } from "@phosphor-icons/react";
import { IconButton } from "@/components/ui/IconButton";
import { FieldPreview } from "../field-preview";
import styles from "../demo.module.css";

const states = ["default", "hover", "active"] as const;
const variants = ["primary", "secondary", "ghost", "destructive", "accent"] as const;
const sizes = ["sm", "md", "lg"] as const;

export default function IconButtonPage() {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Icon Button</h1>
      <p className={styles.subtitle}>
        Square, icon-only button. Same 5 variants as Button (reuses its color
        CSS directly, so Primary/Secondary invert with the theme exactly like
        Button does) — just 3 square sizes instead of 4. Used for copy/delete
        actions — Developer Surfaces&apos; API keys list, Pixel
        Tracking&apos;s install snippet.
      </p>

      {variants.map((variant) => (
        <div className={styles.section} key={variant}>
          <div className={styles.sectionTitle}>{variant}</div>
          <div className={styles.row}>
            {sizes.map((size) => (
              <FieldPreview
                key={size}
                states={states}
                center
                render={(forceState) => (
                  <IconButton
                    variant={variant}
                    size={size}
                    label="Copy"
                    forceState={forceState}
                  >
                    <Copy size={size === "sm" ? 12 : 14} weight="bold" />
                  </IconButton>
                )}
              />
            ))}
          </div>
        </div>
      ))}

      <div className={styles.section}>
        <div className={styles.sectionTitle}>Disabled</div>
        <div className={styles.row}>
          {variants.map((variant) => (
            <IconButton key={variant} variant={variant} label="Copy" disabled>
              <Copy size={14} weight="bold" />
            </IconButton>
          ))}
        </div>
      </div>
    </div>
  );
}
