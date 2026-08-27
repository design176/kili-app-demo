import type { ReactNode } from "react";
import { DeveloperTourProvider } from "@/components/developer-tour-provider";

export default function DeveloperLayout({ children }: { children: ReactNode }) {
  return <DeveloperTourProvider>{children}</DeveloperTourProvider>;
}
