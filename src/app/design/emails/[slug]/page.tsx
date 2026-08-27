import Link from "next/link";
import { notFound } from "next/navigation";
import { getEmailBySlug, emailCatalog } from "../catalog";
import { EmailDetailClient } from "./EmailDetailClient";
import styles from "./detail.module.css";

export function generateStaticParams() {
  return emailCatalog.map((e) => ({ slug: e.slug }));
}

export default async function EmailDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = getEmailBySlug(slug);

  if (!entry) {
    notFound();
  }

  return (
    <div className={styles.page}>
      <Link href="/design/emails" className={styles.back}>
        ← Back to Emails
      </Link>
      <EmailDetailClient entry={entry} />
    </div>
  );
}
