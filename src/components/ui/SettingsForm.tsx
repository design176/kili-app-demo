import { FormField } from "./FormField";
import { Input } from "./Input";
import { Switch } from "./Switch";
import { Button } from "./Button";
import styles from "./SettingsForm.module.css";

export type AccountInfo = {
  name: string;
  email: string;
  company: string;
};

export type AdvertiserNotificationKey = "budgetExhausting" | "adRejected";
export type DeveloperNotificationKey = "integrationErrors" | "missingPayoutMethod";

type ToggleDef = { key: string; label: string; description: string };

const advertiserToggles: ToggleDef[] = [
  {
    key: "budgetExhausting",
    label: "Budget exhausting",
    description: "A campaign is about to run out of budget.",
  },
  {
    key: "adRejected",
    label: "Ad rejected",
    description: "An ad was flagged after going live.",
  },
];

const developerToggles: ToggleDef[] = [
  {
    key: "integrationErrors",
    label: "Integration errors",
    description: "Ad calls from your product are failing.",
  },
  {
    key: "missingPayoutMethod",
    label: "Missing payout method",
    description: "Payouts can't be sent because no method is on file.",
  },
];

type SettingsFormProps = {
  account: AccountInfo;
  onAccountChange: (account: AccountInfo) => void;
  toggleValues: Record<string, boolean>;
  onToggleChange: (key: string, checked: boolean) => void;
  onSave?: () => void;
} & (
  | { workspace: "advertiser" }
  | { workspace: "developer" }
);

export function SettingsForm({
  workspace,
  account,
  onAccountChange,
  toggleValues,
  onToggleChange,
  onSave,
}: SettingsFormProps) {
  const toggles = workspace === "advertiser" ? advertiserToggles : developerToggles;

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

      <div className={styles.section}>
        <span className={styles.sectionTitle}>Notifications</span>
        {toggles.map((toggle) => (
          <div key={toggle.key} className={styles.toggleRow}>
            <div className={styles.toggleText}>
              <span className={styles.toggleLabel}>{toggle.label}</span>
              <span className={styles.toggleDescription}>{toggle.description}</span>
            </div>
            <Switch
              checked={!!toggleValues[toggle.key]}
              onCheckedChange={(checked) => onToggleChange(toggle.key, checked)}
            />
          </div>
        ))}
      </div>

      <div className={styles.footer}>
        <Button variant="primary" onClick={onSave}>
          Save changes
        </Button>
      </div>
    </div>
  );
}
