"use client";

import { useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { X } from "@phosphor-icons/react";
import styles from "./Tooltip.module.css";

export function Tooltip({
  text,
  children,
  faint,
  /** Demo-only: keep the bubble shown without real hover. */
  forceOpen,
}: {
  text: string;
  children?: ReactNode;
  faint?: boolean;
  forceOpen?: boolean;
}) {
  const triggerRef = useRef<HTMLSpanElement>(null);
  const [pos, setPos] = useState<{ top: number; left: number } | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const isTouchDevice = () =>
    typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches;

  const show = () => {
    if (isTouchDevice()) return;
    const rect = triggerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setPos({ top: rect.top - 8, left: rect.left + rect.width / 2 });
  };

  const hide = () => setPos(null);

  const handleClick = () => {
    if (isTouchDevice()) setModalOpen(true);
  };

  const open = forceOpen || pos;

  return (
    <>
      <span
        ref={triggerRef}
        className={`${children ? styles.trigger : styles.info} ${
          !children && faint ? styles.infoFaint : ""
        }`}
        tabIndex={0}
        aria-label={text}
        onMouseEnter={show}
        onMouseLeave={hide}
        onFocus={show}
        onBlur={hide}
        onClick={handleClick}
      >
        {children ?? "i"}
      </span>

      {open &&
        typeof document !== "undefined" &&
        createPortal(
          <span
            className={styles.bubble}
            style={
              pos
                ? { top: pos.top, left: pos.left }
                : { top: 40, left: 40, transform: "none" }
            }
          >
            {text}
          </span>,
          document.body
        )}

      {modalOpen &&
        typeof document !== "undefined" &&
        createPortal(
          <div className={styles.modalBackdrop} onClick={() => setModalOpen(false)}>
            <div className={styles.modalCard} onClick={(e) => e.stopPropagation()}>
              <button
                type="button"
                className={styles.modalClose}
                aria-label="Close"
                onClick={() => setModalOpen(false)}
              >
                <X size={14} weight="bold" />
              </button>
              <p className={styles.modalText}>{text}</p>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
