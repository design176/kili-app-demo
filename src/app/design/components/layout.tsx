import Link from "next/link";
import styles from "./components.module.css";
import { catalog, categories } from "./catalog";
import { ThemeToggle } from "@/components/theme-toggle";

export default function ComponentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.shell}>
      <nav className={styles.sidebar}>
        <div className={styles.sidebarScroll}>
          {categories.map((category) => (
            <div key={category} className={styles.sidebarGroup}>
              <div className={styles.sidebarGroupTitle}>{category}s</div>
              {catalog
                .filter((c) => c.category === category)
                .map((c) =>
                  c.status === "built" ? (
                    <Link
                      key={c.slug}
                      href={`/design/components/${c.slug}`}
                      className={styles.sidebarLink}
                    >
                      {c.name}
                      <span
                        className={`${styles.sidebarDot} ${styles.sidebarDotBuilt}`}
                      />
                    </Link>
                  ) : (
                    <div
                      key={c.slug}
                      className={`${styles.sidebarLink} ${styles.sidebarLinkPlanned}`}
                    >
                      {c.name}
                      <span className={styles.sidebarDot} />
                    </div>
                  )
                )}
            </div>
          ))}
        </div>
        <div className={styles.sidebarFooter}>
          <ThemeToggle />
        </div>
      </nav>
      <div className={styles.main}>{children}</div>
    </div>
  );
}
