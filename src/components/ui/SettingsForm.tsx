import { FormField } from "./FormField";
import { Input } from "./Input";
import { Button } from "./Button";
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
} & (
  | { workspace: "advertiser" }
  | { workspace: "developer" }
);

export function SettingsForm({
  account,
  onAccountChange,
  onSave,
}: SettingsFormProps) {
  return (
    <div className={styles.form}>
      <div className={styles.section}>
        <span className={styles.sectionTitle}>Account info</span>
        <FormField label="Name">
          <Input
            value={account.name}
            onChange={(e) => onAccountChange({ ...account, name: e.target.value })}
          />
        </FormField>
        <FormField label="Email">
          <Input
            type="email"
            value={account.email}
            onChange={(e) => onAccountChange({ ...account, email: e.target.value })}
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
