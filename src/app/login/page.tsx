"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Logo } from "@/components/ui/Logo";
import { Input } from "@/components/ui/Input";
import { OTPInput } from "@/components/ui/OTPInput";
import { Button } from "@/components/ui/Button";
import { useDemoState, type Dashboard } from "@/components/demo-state";
import styles from "./login.module.css";

type Step = "email" | "otp" | "workspace";

export default function LoginPage() {
  const router = useRouter();
  const { isNewUser, setDashboard } = useDemoState();
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");

  const goToOverview = (dashboard?: Dashboard) => {
    if (dashboard) setDashboard(dashboard);
    router.push("/overview");
  };

  const handleVerified = () => {
    if (isNewUser) {
      setStep("workspace");
    } else {
      goToOverview();
    }
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.card}>
        <Logo height={28} className={styles.logo} />

        {step === "email" && (
          <>
            <div className={styles.subtitle}>
              yooo welcome back to design demo
            </div>
            <form
              className={styles.form}
              onSubmit={(e) => {
                e.preventDefault();
                setStep("otp");
              }}
            >
              <Input
                type="email"
                placeholder="you@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button type="submit" variant="primary" style={{ width: "100%" }}>
                Next
              </Button>
            </form>
          </>
        )}

        {step === "otp" && (
          <>
            <div className={styles.title}>Enter your code</div>
            <div className={styles.subtitle}>
              We sent a 6-digit code to {email || "your email"}.
            </div>
            <OTPInput value={code} onChange={setCode} onComplete={handleVerified} />
            <Button
              variant="primary"
              style={{ width: "100%", marginTop: 12 }}
              disabled={code.length < 6}
              onClick={handleVerified}
            >
              Verify
            </Button>
          </>
        )}

        {step === "workspace" && (
          <>
            <div className={styles.title}>What are you setting up?</div>
            <div className={styles.subtitle}>
              You can add the other one later.
            </div>
            <div className={styles.workspaceOptions}>
              <button
                type="button"
                className={styles.workspaceOption}
                onClick={() => goToOverview("advertiser")}
              >
                <span className={styles.workspaceOptionTitle}>I&apos;m an Advertiser</span>
                <span className={styles.workspaceOptionDesc}>
                  I want to run ads across the network.
                </span>
              </button>
              <button
                type="button"
                className={styles.workspaceOption}
                onClick={() => goToOverview("platform")}
              >
                <span className={styles.workspaceOptionTitle}>I&apos;m a Platform</span>
                <span className={styles.workspaceOptionDesc}>
                  I run an AI product and want to monetize it.
                </span>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
