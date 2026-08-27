import { Lifebuoy } from "@phosphor-icons/react";
import { FormField } from "./FormField";
import { Input } from "./Input";
import { Button } from "./Button";
import { Divider } from "./Divider";
import { ThemeModeToggle } from "./ThemeModeToggle";
import styles from "./SettingsForm.module.css";

export type AccountInfo = {
  name: string;
  email: string;
  company: string;
};

type SettingsFormProps = {
  account: AccountInfo;
  onAccountChange: (account: AccountInfo) => void;
  onSave?: () => void;
  /** Renders a help icon next to "Account info" — used to replay the developer walkthrough. */
  onHelpClick?: () => void;
} & (
  | { workspace: "advertiser" }
  | { workspace: "developer" }
);

export function SettingsForm({
  account,
  onAccountChange,
  onSave,
  onHelpClick,
}: SettingsFormProps) {
  return (
    <div className={styles.form}>
      <div className={styles.section}>
        <div className={styles.sectionHeading}>
          <span className={styles.sectionTitle}>Appearance</span>
          <ThemeModeToggle />
        </div>
      </div>

      <Divider />

      <div className={styles.section}>
        <div className={styles.sectionHeading}>
          <span className={styles.sectionTitle}>Account info</span>
          {onHelpClick && (
            <Button
              variant="secondary"
              size="sm"
              data-tour="tour-settings-help"
              onClick={onHelpClick}
            >
              <Lifebuoy size={14} weight="bold" />
              Help
            </Button>
          )}
        </div>
        <FormField label="Email">
          <Input type="email" value={account.email} disabled />
        </FormField>
        <FormField label="Name">
          <Input
            value={account.name}
            onChange={(e) => onAccountChange({ ...account, name: e.target.value })}
          />
        </FormField>
        <FormField label="Company">
          <Input
            value={account.company}
            onChange={(e) => onAccountChange({ ...account, company: e.target.value })}
          />
        </FormField>
      </div>

      <div className={styles.footer}>
        <Button variant="primary" onClick={onSave}>
          Save changes
        </Button>
      </div>
    </div>
  );
}
