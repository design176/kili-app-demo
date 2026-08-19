import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { ThemeToggle } from "@/components/theme-toggle";

export default function Home() {
  return (
    <div
      style={{
        display: "flex",
        flex: 1,
        flexDirection: "column",
        gap: "24px",
        alignItems: "flex-start",
        justifyContent: "center",
        padding: "80px",
      }}
    >
      <Logo height={28} />
      <h1
        style={{
          fontFamily: "var(--font-heading)",
          fontSize: "40px",
          fontWeight: 700,
          color: "var(--color-text-primary)",
        }}
      >
        App shell is set up
      </h1>
      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "16px",
          color: "var(--color-text-secondary)",
          maxWidth: "480px",
        }}
      >
        Colors, typography, and light/dark theming are wired up via CSS
        variables and next-themes. The IA and full component library live
        under Design.
      </p>
      <div style={{ display: "flex", gap: "12px" }}>
        <Link href="/design">
          <Button variant="primary">Open Design</Button>
        </Link>
        <ThemeToggle />
      </div>
    </div>
  );
}
