import Link from "next/link";
import styles from "./components.module.css";
import { catalog, categories } from "./catalog";

export default function ComponentsPage() {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Components</h1>
      <p className={styles.subtitle}>
        Every UI piece needed to build the MVP screens from{" "}
        <Link href="/design/ia" style={{ textDecoration: "underline" }}>
          the IA
        </Link>
        , grouped Atoms → Molecules → Organisms. Built with the color
        variables from <code>globals.css</code>. Green dot = built, gray = not
        started yet.
      </p>

      {categories.map((category) => (
        <div key={category} className={styles.group}>
          <div className={styles.groupTitle}>
            <span className={styles.groupDot} />
            {category}s
          </div>
          <div className={styles.grid}>
            {catalog
              .filter((c) => c.category === category)
              .map((c) => (
                <div key={c.slug} className={styles.item}>
                  <div className={styles.itemHead}>
                    <span className={styles.itemName}>{c.name}</span>
                    <span
                      className={`${styles.status} ${
                        c.status === "built"
                          ? styles.statusBuilt
                          : styles.statusPlanned
                      }`}
                    >
                      {c.status === "built" ? "Built" : "Planned"}
                    </span>
                  </div>
                  <p className={styles.itemDesc}>{c.desc}</p>
                  <p className={styles.itemUsedIn}>
                    Used in: {c.usedIn.join(", ")}
                  </p>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}
