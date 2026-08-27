"use client";

import Image from "next/image";
import { SurfaceCard } from "@/components/ui/SurfaceCard";
import styles from "../demo.module.css";

export default function SurfaceCardPage() {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Surface Card</h1>
      <p className={styles.subtitle}>
        One integration surface as a card — icon, live status dot, name,
        description, and either an &quot;Install&quot; CTA (inactive) or
        earnings + a &quot;View&quot; CTA (active). <code>icon</code> accepts
        an optimized app image or an icon glyph.
      </p>

      <div className={styles.section}>
        <div className={styles.sectionTitle}>Status variants</div>
        <div className={styles.row}>
          <div className={styles.surfaceCardWidth}>
            <SurfaceCard
              icon={<Image src="/vscode-icon.png" alt="" width={48} height={48} />}
              name="VS Code Extension"
              description="View ads in your vs code while you code and pays you for views."
              status="inactive"
              onAction={() => {}}
            />
          </div>
          <div className={styles.surfaceCardWidth}>
            <SurfaceCard
              icon={<Image src="/vscode-icon.png" alt="" width={48} height={48} />}
              name="VS Code Extension"
              description="View ads in your vs code while you code and pays you for views."
              status="active"
              earned={324}
              onAction={() => {}}
            />
          </div>
          <div className={styles.surfaceCardWidth}>
            <SurfaceCard
              icon={<Image src="/terminal-icon.png" alt="" width={48} height={48} />}
              name="Terminal"
              description="View ads in your terminal while you work and get paid for views."
              status="inactive"
              onAction={() => {}}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
