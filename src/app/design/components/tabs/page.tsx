"use client";

import { useState } from "react";
import { Tabs } from "@/components/ui/Tabs";
import styles from "../demo.module.css";

const items = [
  { value: "advertiser", label: "Advertiser" },
  { value: "platform", label: "Platform" },
];

const sizes = ["sm", "md", "lg"] as const;
const variants = ["primary", "secondary"] as const;

export default function TabsPage() {
  const [value, setValue] = useState("advertiser");

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Tabs</h1>
      <p className={styles.subtitle}>
        Segmented pill control — literally composed from Button (Ghost for
        inactive tabs; the active tab uses either Primary or Secondary — pick
        via <code>activeVariant</code>, defaults to Primary), 3 sizes
        matching Button&apos;s sm/md/lg.
      </p>

      <div className={styles.section}>
        <div className={styles.sectionTitle}>Try it (default — Primary active)</div>
        <Tabs items={items} value={value} onChange={setValue} />
      </div>

      <div className={styles.section}>
        <div className={styles.sectionTitle}>Active variant</div>
        <div className={styles.row}>
          {variants.map((activeVariant) => (
            <div key={activeVariant} className={styles.cell}>
              <Tabs
                items={items}
                value={value}
                onChange={setValue}
                activeVariant={activeVariant}
              />
              <span style={{ fontSize: 12, color: "var(--color-text-muted)" }}>
                {activeVariant}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionTitle}>Sizes</div>
        <div className={styles.row}>
          {sizes.map((size) => (
            <Tabs key={size} items={items} value={value} onChange={setValue} size={size} />
          ))}
        </div>
      </div>
    </div>
  );
}
