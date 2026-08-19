import { Stepper } from "@/components/ui/Stepper";
import styles from "../demo.module.css";

export default function StepperPage() {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Stepper</h1>
      <p className={styles.subtitle}>
        Progress indicator for the 3-step Create Campaign wizard (Ad content
        → Budget &amp; time duration → Final review) — pill segments filled
        up to the current step.
      </p>

      <div className={styles.section}>
        <div className={styles.sectionTitle}>Step 1 of 3</div>
        <Stepper steps={3} currentStep={1} className={styles.stepperWidth} />
      </div>
      <div className={styles.section}>
        <div className={styles.sectionTitle}>Step 2 of 3</div>
        <Stepper steps={3} currentStep={2} className={styles.stepperWidth} />
      </div>
      <div className={styles.section}>
        <div className={styles.sectionTitle}>Step 3 of 3</div>
        <Stepper steps={3} currentStep={3} className={styles.stepperWidth} />
      </div>
    </div>
  );
}
