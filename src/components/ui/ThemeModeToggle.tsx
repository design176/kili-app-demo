"use client";

import { useTheme } from "next-themes";
import { Sun, Moon, Monitor } from "@phosphor-icons/react";
import { IconButton } from "./IconButton";
import { useMounted } from "@/lib/use-mounted";
import styles from "./Tabs.module.css";

const MODES = [
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
  { value: "system", label: "Auto", icon: Monitor },
] as const;

export function ThemeModeToggle() {
  const { theme, setTheme } = useTheme();
  const mounted = useMounted();
  const active = mounted ? theme : undefined;

  return (
    <div className={styles.track}>
      {MODES.map(({ value, label, icon: Icon }) => (
        <IconButton
          key={value}
          variant={value === active ? "primary" : "ghost"}
          size="sm"
          label={label}
          className={value === active ? "" : styles.inactiveTab}
          onClick={() => setTheme(value)}
        >
          <Icon size={14} weight="bold" />
        </IconButton>
      ))}
    </div>
  );
}
