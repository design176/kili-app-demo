"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "@phosphor-icons/react";
import { Button } from "@/components/ui/Button";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <Button variant="secondary" size="md" style={{ visibility: "hidden" }}>
        Toggle theme
      </Button>
    );
  }

  const isDark = theme === "dark";

  return (
    <Button
      variant="secondary"
      size="md"
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      {isDark ? <Sun size={14} weight="bold" /> : <Moon size={14} weight="bold" />}
      {isDark ? "Switch to light" : "Switch to dark"}
    </Button>
  );
}
