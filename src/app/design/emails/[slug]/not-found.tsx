import Link from "next/link";
import { Button } from "@/components/ui/Button";
import styles from "./detail.module.css";

export default function NotFound() {
  return (
    <div className={styles.page}>
      <div className={styles.notFound}>
        <div className={styles.notFoundTitle}>Email not found</div>
        <p className={styles.notFoundDesc}>No template with that slug. Check the catalog.</p>
        <Link href="/design/emails">
          <Button variant="secondary" size="sm">
            Back to Emails
          </Button>
        </Link>
      </div>
    </div>
  );
}
