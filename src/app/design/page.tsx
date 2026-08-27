import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import styles from "./design.module.css";

const pages = [
  {
    href: "/design/ia",
    label: "IA",
    desc: "Information architecture — every screen in the Advertiser and Platform (publisher) flows for the MVP.",
    available: true,
  },
  {
    href: "/design/components",
    label: "Components",
    desc: "Every UI atom/molecule/organism needed to build the screens above.",
    available: true,
  },
  {
    href: "/design/emails",
    label: "Emails",
    desc: "Transactional email templates — Handlebars (.hbs) + JSON props, preview and download. Starts with magic-link login.",
    available: true,
  },
  {
    href: "/design/changelog",
    label: "Changelog",
    desc: "What changed since the last push, newest first — updated on request.",
    available: true,
  },
];

export default function DesignPage() {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Design</h1>
      <p className={styles.subtitle}>Working notes for the dashboard UX, in order.</p>

      <div className={styles.list}>
        {pages.map((page) => {
          const content = (
            <>
              <div className={styles.rowHead}>
                <span
                  className={`${styles.rowLabel} ${
                    page.available ? "" : styles.rowLabelDisabled
                  }`}
                >
                  {page.label}
                </span>
                {!page.available && <Badge tone="neutral">Soon</Badge>}
              </div>
              <p className={styles.rowDesc}>{page.desc}</p>
            </>
          );

          return page.available ? (
            <Link key={page.href} href={page.href} className={styles.row}>
              <Card>{content}</Card>
            </Link>
          ) : (
            <Card key={page.href}>{content}</Card>
          );
        })}
      </div>
    </div>
  );
}
