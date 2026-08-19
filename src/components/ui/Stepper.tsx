import styles from "./Stepper.module.css";

export type StepperProps = {
  steps: number;
  currentStep: number;
  className?: string;
};

export function Stepper({ steps, currentStep, className }: StepperProps) {
  return (
    <div className={`${styles.stepper} ${className ?? ""}`}>
      {Array.from({ length: steps }, (_, i) => (
        <span
          key={i}
          className={`${styles.segment} ${
            i < currentStep ? styles.segmentFilled : ""
          }`}
        />
      ))}
    </div>
  );
}
