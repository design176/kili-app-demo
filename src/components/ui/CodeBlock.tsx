import { CopyField } from "./CopyField";
import styles from "./CodeBlock.module.css";

export type CodeBlockProps = {
  label: string;
  value: string;
  multiline?: boolean;
  className?: string;
};

export function CodeBlock({ label, value, multiline, className }: CodeBlockProps) {
  return (
    <div className={`${styles.block} ${className ?? ""}`}>
      <span className={styles.label}>{label}</span>
      <CopyField value={value} multiline={multiline} />
    </div>
  );
}
