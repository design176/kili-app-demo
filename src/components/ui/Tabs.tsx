import { Button, type ButtonProps } from "./Button";
import styles from "./Tabs.module.css";

export type TabItem = {
  value: string;
  label: string;
};

export type TabsProps = {
  items: TabItem[];
  value: string;
  onChange: (value: string) => void;
  size?: Extract<ButtonProps["size"], "sm" | "md" | "lg">;
  /** Which variant the active tab uses — inactive tabs are always Ghost. */
  activeVariant?: "primary" | "secondary";
  className?: string;
};

export function Tabs({
  items,
  value,
  onChange,
  size = "md",
  activeVariant = "primary",
  className,
}: TabsProps) {
  return (
    <div className={`${styles.track} ${className ?? ""}`}>
      {items.map((item) => (
        <Button
          key={item.value}
          type="button"
          variant={item.value === value ? activeVariant : "ghost"}
          size={size}
          className={item.value === value ? "" : styles.inactiveTab}
          onClick={() => onChange(item.value)}
        >
          {item.label}
        </Button>
      ))}
    </div>
  );
}
