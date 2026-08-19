import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";

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
        kili design demo
      </h1>
      <Link href="/login">
        <Button variant="accent">Login</Button>
      </Link>
    </div>
  );
}
