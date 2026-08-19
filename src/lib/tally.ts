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

export function openTallyForm(
  formId: string,
  options?: { layout?: "default" | "modal"; emoji?: { text: string; animation: string } }
) {
  window.Tally?.openPopup(formId, options);
}
