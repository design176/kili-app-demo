"use client";

import { useRef, useState, type ReactNode } from "react";
import { Bank, CaretDown, Plus, SidebarSimple, SignOut, Wallet } from "@phosphor-icons/react";
import { Logo, LogoMark } from "./Logo";
import { IconButton } from "./IconButton";
import { Button } from "./Button";
import { Divider } from "./Divider";
import { Tooltip } from "./Tooltip";
import { PopoverPortal } from "./Popover";
import { AddBalanceModal } from "./AddBalanceModal";
import styles from "./SidebarNav.module.css";

export type SidebarNavItem = {
  key: string;
  label: string;
  icon: ReactNode;
  /** Optional `data-tour` hook so a coachmark can anchor to this nav item. */
  tourId?: string;
};

export type SidebarNavSection = {
  key: string;
  label: string;
  items: SidebarNavItem[];
};

export type SidebarNavProps = {
  sections: SidebarNavSection[];
  activeKey: string;
  onSelect: (key: string) => void;
  collapsed: boolean;
  onCollapsedChange: (collapsed: boolean) => void;
  accountName: string;
  /** Replaces the initial-letter avatar with this image when set (e.g. advertiser's company logo). */
  avatarUrl?: string | null;
  onLogout?: () => void;
  primaryAction?: {
    label: string;
    onClick: () => void;
  };
  balance?: {
    label: string;
    value: string;
    zero?: boolean;
    onClick?: () => void;
    onAdd?: (amount: number) => void;
  };
  /** Danger-styled status card (e.g. developer's "KYC not complete") — same visual treatment as a zero balance. */
  statusAlert?: {
    label: string;
    value: string;
    onClick?: () => void;
  };
  className?: string;
};

export function SidebarNav({
  sections,
  activeKey,
  onSelect,
  collapsed,
  onCollapsedChange,
  accountName,
  avatarUrl,
  onLogout,
  primaryAction,
  balance,
  statusAlert,
  className,
}: SidebarNavProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuPos, setMenuPos] = useState<{ top: number; left: number }>();
  const accountTriggerRef = useRef<HTMLButtonElement>(null);

  const [addBalanceOpen, setAddBalanceOpen] = useState(false);

  const initial = accountName.charAt(0).toUpperCase();

  const toggleMenu = () => {
    if (!menuOpen) {
      const rect = accountTriggerRef.current?.getBoundingClientRect();
      if (rect) setMenuPos({ top: rect.top - 6, left: rect.left });
    }
    setMenuOpen((o) => !o);
  };

  return (
    <nav
      className={`${styles.sidebar} ${collapsed ? styles.collapsed : ""} ${
        className ?? ""
      }`}
    >
      <div className={styles.header}>
        {collapsed ? <LogoMark height={20} /> : <Logo height={20} />}
        {!collapsed && (
          <IconButton
            variant="secondary"
            size="md"
            label="Collapse sidebar"
            onClick={() => onCollapsedChange(true)}
          >
            <SidebarSimple size={16} weight="bold" />
          </IconButton>
        )}
      </div>

      {collapsed && (
        <div style={{ display: "flex", justifyContent: "center", paddingBottom: 8 }}>
          <IconButton
            variant="secondary"
            size="md"
            label="Expand sidebar"
            onClick={() => onCollapsedChange(false)}
          >
            <SidebarSimple size={16} weight="bold" />
          </IconButton>
        </div>
      )}

      <Divider />

      <div className={styles.nav}>
        {sections.map((section, i) => (
          <div key={section.key}>
            {i > 0 && <Divider className={styles.divider} />}
            <div className={styles.section}>
              {!collapsed && <span className={styles.sectionLabel}>{section.label}</span>}
              {section.items.map((item) => (
                <button
                  key={item.key}
                  type="button"
                  data-tour={item.tourId}
                  className={`${styles.item} ${
                    item.key === activeKey ? styles.itemActive : ""
                  }`}
                  onClick={() => onSelect(item.key)}
                >
                  <span className={styles.icon}>{item.icon}</span>
                  {!collapsed && item.label}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className={styles.footer}>
        <Divider className={styles.divider} />

        {statusAlert && !collapsed && (() => {
          const cardClasses = `${styles.balanceCard} ${styles.balanceCardDanger} ${
            statusAlert.onClick ? styles.balanceCardClickable : ""
          }`;

          const content = (
            <>
              <span className={styles.balanceIconBadge}>
                <Bank size={14} weight="bold" />
              </span>
              <div className={styles.balanceText}>
                <span className={styles.balanceLabel}>{statusAlert.label}</span>
                <span className={styles.balanceValue}>{statusAlert.value}</span>
              </div>
            </>
          );

          return statusAlert.onClick ? (
            <button type="button" className={cardClasses} onClick={statusAlert.onClick}>
              {content}
            </button>
          ) : (
            <div className={cardClasses}>{content}</div>
          );
        })()}

        {balance && !collapsed && (() => {
          const handleClick = balance.zero
            ? () => setAddBalanceOpen(true)
            : balance.onClick;
          const cardClasses = `${styles.balanceCard} ${
            balance.zero ? styles.balanceCardDanger : ""
          } ${handleClick ? styles.balanceCardClickable : ""}`;

          const content = (
            <>
              <span className={styles.balanceIconBadge}>
                <Wallet size={14} weight="bold" />
              </span>
              <div className={styles.balanceText}>
                <span className={styles.balanceLabel}>{balance.label}</span>
                <span className={styles.balanceValue}>
                  {balance.zero ? "Add balance" : balance.value}
                </span>
              </div>
            </>
          );

          return handleClick ? (
            <button type="button" className={cardClasses} onClick={handleClick}>
              {content}
            </button>
          ) : (
            <div className={cardClasses}>{content}</div>
          );
        })()}

        {balance?.onAdd && (
          <AddBalanceModal
            open={addBalanceOpen}
            onClose={() => setAddBalanceOpen(false)}
            onConfirm={balance.onAdd}
          />
        )}

        {primaryAction &&
          (collapsed ? (
            <Tooltip text={primaryAction.label}>
              <IconButton
                variant="accent"
                size="md"
                label={primaryAction.label}
                onClick={primaryAction.onClick}
              >
                <Plus size={14} weight="bold" />
              </IconButton>
            </Tooltip>
          ) : (
            <Button
              variant="accent"
              size="md"
              onClick={primaryAction.onClick}
              className={styles.primaryAction}
            >
              <Plus size={14} weight="bold" />
              {primaryAction.label}
            </Button>
          ))}

        <button
          ref={accountTriggerRef}
          type="button"
          className={styles.accountTrigger}
          onClick={toggleMenu}
        >
          {avatarUrl ? (
            <img src={avatarUrl} alt="" className={styles.avatarImage} />
          ) : (
            <span className={styles.avatar}>{initial}</span>
          )}
          {!collapsed && (
            <>
              <span className={styles.accountName}>{accountName}</span>
              <CaretDown size={12} weight="bold" className={styles.chevron} />
            </>
          )}
        </button>

        <PopoverPortal
          open={menuOpen}
          onClose={() => setMenuOpen(false)}
          style={
            menuPos
              ? { top: menuPos.top, left: menuPos.left, transform: "translateY(-100%)" }
              : {}
          }
        >
          <div className={styles.menu}>
            <button
              type="button"
              className={styles.menuItem}
              onClick={() => {
                onLogout?.();
                setMenuOpen(false);
              }}
            >
              <SignOut size={14} weight="bold" />
              Log out
            </button>
          </div>
        </PopoverPortal>
      </div>
    </nav>
  );
}
