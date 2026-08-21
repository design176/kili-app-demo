"use client";

import type { CSSProperties, ReactNode } from "react";
import { createPortal } from "react-dom";

export function PopoverPortal({
  open,
  onClose,
  style,
  children,
}: {
  open: boolean;
  onClose: () => void;
  style: CSSProperties;
  children: ReactNode;
}) {
  if (!open || typeof document === "undefined") return null;

  return createPortal(
    <>
      <div
        style={{ position: "fixed", inset: 0, zIndex: 999 }}
        onClick={onClose}
      />
      <div style={{ position: "fixed", zIndex: 1000, ...style }}>
        {children}
      </div>
    </>,
    document.body
  );
}
