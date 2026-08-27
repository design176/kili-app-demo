declare global {
  interface Window {
    Tally?: {
      openPopup: (
        formId: string,
        options?: {
          layout?: "default" | "modal";
          emoji?: { text: string; animation: string };
        }
      ) => void;
    };
  }
}

const BUG_REPORT_FORM_ID = "ja8LLE";
const BUG_REPORT_OPTIONS = {
  layout: "modal",
  emoji: { text: "🦜", animation: "spin" },
} as const;

export function openTallyForm(
  formId: string,
  options?: { layout?: "default" | "modal"; emoji?: { text: string; animation: string } }
) {
  window.Tally?.openPopup(formId, options);
}

export function openBugReportForm() {
  openTallyForm(BUG_REPORT_FORM_ID, BUG_REPORT_OPTIONS);
}
