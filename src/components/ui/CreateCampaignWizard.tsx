"use client";

import { useState } from "react";
import Link from "next/link";
import { PencilSimple } from "@phosphor-icons/react";
import { Stepper } from "./Stepper";
import { FormField } from "./FormField";
import { Input } from "./Input";
import { Textarea } from "./Textarea";
import { DatePicker, type DateRange } from "./DatePicker";
import { Button } from "./Button";
import { useDemoState } from "@/components/demo-state";
import styles from "./CreateCampaignWizard.module.css";

export type CampaignDraft = {
  title: string;
  heading: string;
  body: string;
  ctaLink: string;
  budget: string;
  dates: DateRange;
};

const emptyDraft: CampaignDraft = {
  title: "",
  heading: "",
  body: "",
  ctaLink: "",
  budget: "",
  dates: { from: null, to: null },
};

const stepMeta = [
  { label: "Step 1 of 3", title: "Ad content" },
  { label: "Step 2 of 3", title: "Budget & time duration" },
  { label: "Step 3 of 3", title: "Final review" },
];

function formatDate(d: Date | null) {
  return d ? d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "—";
}

const DOMAIN_PATTERN = /^(https?:\/\/)?([\w-]+\.)+[a-z]{2,}([/?#].*)?$/i;

function isValidUrl(value: string) {
  return DOMAIN_PATTERN.test(value.trim());
}

export type CreateCampaignWizardProps = {
  initialDraft?: Partial<CampaignDraft>;
  balance?: number;
  onLaunch?: (draft: CampaignDraft) => void;
  onCancel?: () => void;
  onAddBalance?: (draft: CampaignDraft) => void;
};

export function CreateCampaignWizard({
  initialDraft,
  balance,
  onLaunch,
  onCancel,
  onAddBalance,
}: CreateCampaignWizardProps) {
  const { companyLogoUrl } = useDemoState();
  const [step, setStep] = useState(1);
  const [draft, setDraft] = useState<CampaignDraft>({ ...emptyDraft, ...initialDraft });
  const [attemptedNext, setAttemptedNext] = useState(false);

  const update = (patch: Partial<CampaignDraft>) => setDraft((d) => ({ ...d, ...patch }));

  const titleValid = draft.title.trim() !== "";
  const headingValid = draft.heading.trim() !== "";
  const bodyValid = draft.body.trim() !== "";
  const ctaLinkValid = draft.ctaLink.trim() !== "" && isValidUrl(draft.ctaLink);
  const step1Valid = titleValid && headingValid && bodyValid && ctaLinkValid;

  const showTitleError = attemptedNext && !titleValid;
  const showHeadingError = attemptedNext && !headingValid;
  const showBodyError = attemptedNext && !bodyValid;
  const showCtaError = attemptedNext && !ctaLinkValid;

  const budgetNumber = Number(draft.budget.replace(/[^0-9.]/g, ""));
  const overBudget =
    step === 2 && balance !== undefined && draft.budget !== "" && budgetNumber > balance;
  const showOverBudget = attemptedNext && overBudget;

  const handleNext = () => {
    if (step === 1 && !step1Valid) {
      setAttemptedNext(true);
      return;
    }
    if (step === 2 && overBudget) {
      setAttemptedNext(true);
      return;
    }
    setAttemptedNext(false);
    setStep((s) => s + 1);
  };

  return (
    <div className={styles.wizard}>
      <div>
        <Stepper steps={3} currentStep={step} />
        <div className={styles.stepLabel} style={{ marginTop: 12 }}>
          {stepMeta[step - 1].label}
        </div>
        <div className={styles.stepTitle}>{stepMeta[step - 1].title}</div>
      </div>

      {step === 1 && (
        <div className={styles.form}>
          <FormField label="Company logo">
            {companyLogoUrl ? (
              <div className={styles.logoWrap}>
                <img src={companyLogoUrl} alt="Company logo" className={styles.logoPreview} />
                <Link href="/advertiser/settings" className={styles.logoEditBadge} aria-label="Edit company logo in Settings">
                  <PencilSimple size={12} weight="bold" />
                </Link>
              </div>
            ) : (
              <div className={styles.logoStatusRow}>
                <span className={styles.logoPlaceholder} />
                <div className={styles.logoStatus}>
                  <span className={styles.logoStatusText}>Company logo not set</span>
                  <Link href="/advertiser/settings">
                    <Button variant="secondary" size="sm">
                      Set up in Settings
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </FormField>
          <FormField
            label="Campaign title"
            required
            helperText={showTitleError ? "Campaign title is required." : "Internal-only, never shown to end users."}
            error={showTitleError}
          >
            <Input
              placeholder="Q4 launch"
              value={draft.title}
              error={showTitleError}
              onChange={(e) => update({ title: e.target.value })}
            />
          </FormField>
          <FormField
            label="Campaign heading"
            required
            helperText={showHeadingError ? "Campaign heading is required." : undefined}
            error={showHeadingError}
          >
            <Input
              placeholder="The headline shown to end users"
              value={draft.heading}
              error={showHeadingError}
              onChange={(e) => update({ heading: e.target.value })}
            />
          </FormField>
          <FormField
            label="Body text"
            required
            helperText={showBodyError ? "Body text is required." : undefined}
            error={showBodyError}
          >
            <Textarea
              placeholder="Normal text, plus inline hyperlinks"
              value={draft.body}
              error={showBodyError}
              onChange={(e) => update({ body: e.target.value })}
            />
          </FormField>
          <FormField
            label="CTA link"
            required
            helperText={
              showCtaError
                ? draft.ctaLink.trim() === ""
                  ? "CTA link is required."
                  : "Enter valid domain"
                : "Where the call-to-action button links to."
            }
            error={showCtaError}
          >
            <Input
              placeholder="example.com"
              value={draft.ctaLink}
              error={showCtaError}
              onChange={(e) => update({ ctaLink: e.target.value })}
            />
          </FormField>
        </div>
      )}

      {step === 2 && (
        <div className={styles.form}>
          <FormField
            label="Total budget"
            required
            helperText={showOverBudget ? "Your balance isn't enough to cover this budget." : "One lump sum for the whole campaign."}
            error={showOverBudget}
          >
            <Input
              placeholder="$1,000"
              value={draft.budget}
              error={showOverBudget}
              onChange={(e) => update({ budget: e.target.value })}
            />
          </FormField>
          {showOverBudget && (
            <div className={styles.balanceWarning}>
              <span>
                {balance !== undefined ? `Current balance: $${balance.toLocaleString()}. ` : ""}
                Add funds to continue with this budget — we&apos;ll save this campaign as a draft.
              </span>
              <Button variant="secondary" size="sm" onClick={() => onAddBalance?.(draft)}>
                Add balance
              </Button>
            </div>
          )}
          <FormField label="Start & end date" required>
            <DatePicker
              mode="range"
              value={draft.dates}
              onChange={(dates) => update({ dates })}
            />
          </FormField>
        </div>
      )}

      {step === 3 && (
        <div className={styles.summary}>
          {companyLogoUrl && (
            <div className={styles.summaryRow}>
              <span className={styles.summaryLabel}>Company logo</span>
              <img src={companyLogoUrl} alt="Company logo" className={styles.summaryLogo} />
            </div>
          )}
          <div className={styles.summaryRow}>
            <span className={styles.summaryLabel}>Campaign title</span>
            <span className={styles.summaryValue}>{draft.title || "—"}</span>
          </div>
          <div className={styles.summaryRow}>
            <span className={styles.summaryLabel}>Campaign heading</span>
            <span className={styles.summaryValue}>{draft.heading || "—"}</span>
          </div>
          <div className={styles.summaryRow}>
            <span className={styles.summaryLabel}>Body text</span>
            <span className={styles.summaryValue}>{draft.body || "—"}</span>
          </div>
          <div className={styles.summaryRow}>
            <span className={styles.summaryLabel}>CTA link</span>
            <span className={styles.summaryValue}>{draft.ctaLink || "—"}</span>
          </div>
          <div className={styles.summaryRow}>
            <span className={styles.summaryLabel}>Budget</span>
            <span className={styles.summaryValue}>{draft.budget || "—"}</span>
          </div>
          <div className={styles.summaryRow}>
            <span className={styles.summaryLabel}>Dates</span>
            <span className={styles.summaryValue}>
              {formatDate(draft.dates.from)} – {formatDate(draft.dates.to)}
            </span>
          </div>
        </div>
      )}

      <div className={styles.actions}>
        <Button variant="ghost" onClick={step === 1 ? onCancel : () => setStep((s) => s - 1)}>
          {step === 1 ? "Cancel" : "Back"}
        </Button>
        <div className={styles.actionsRight}>
          {step < 3 ? (
            <Button variant="primary" onClick={handleNext}>
              Next
            </Button>
          ) : (
            <Button variant="accent" onClick={() => onLaunch?.(draft)}>
              Launch campaign
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
