"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Dashboard = "advertiser" | "platform";

export type PlacementStyle = "above" | "below" | "inline" | "loading";

export type ApiKeyEntry = {
  id: string;
  value: string;
  placement: PlacementStyle;
  frequency: string;
};

const BALANCE_STORAGE_KEY = "kili-demo-balance";
const DEFAULT_BALANCE = 1860.4;
const API_KEYS_STORAGE_KEY = "kili-demo-api-keys";

function generateKeyValue() {
  return `kili_live_${Math.random().toString(36).slice(2, 18)}`;
}

type DemoState = {
  isNewUser: boolean;
  setIsNewUser: (value: boolean) => void;
  dashboard: Dashboard;
  setDashboard: (value: Dashboard) => void;
  forceEmptyStates: boolean;
  setForceEmptyStates: (value: boolean) => void;
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (value: boolean) => void;
  balance: number;
  addBalance: (amount: number) => void;
  apiKeys: ApiKeyEntry[];
  addApiKey: (placement: PlacementStyle, frequency: string) => void;
  removeApiKey: (id: string) => void;
};

const DemoStateContext = createContext<DemoState | null>(null);

export function DemoStateProvider({ children }: { children: ReactNode }) {
  const [isNewUser, setIsNewUserState] = useState(false);
  const [dashboard, setDashboard] = useState<Dashboard>("advertiser");
  const [forceEmptyStates, setForceEmptyStates] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [balance, setBalance] = useState(DEFAULT_BALANCE);
  const [apiKeys, setApiKeys] = useState<ApiKeyEntry[]>([]);

  // localStorage isn't available during SSR — hydrate from it once mounted.
  useEffect(() => {
    const storedBalance = window.localStorage.getItem(BALANCE_STORAGE_KEY);
    if (storedBalance !== null) setBalance(Number(storedBalance));

    const storedKeys = window.localStorage.getItem(API_KEYS_STORAGE_KEY);
    if (storedKeys !== null) {
      try {
        setApiKeys(JSON.parse(storedKeys));
      } catch {
        // ignore malformed storage
      }
    }
  }, []);

  const persistBalance = (value: number) => {
    setBalance(value);
    window.localStorage.setItem(BALANCE_STORAGE_KEY, String(value));
  };

  const persistApiKeys = (keys: ApiKeyEntry[]) => {
    setApiKeys(keys);
    window.localStorage.setItem(API_KEYS_STORAGE_KEY, JSON.stringify(keys));
  };

  // Toggling into "new user" simulates a fresh signup — balance and API keys reset.
  const setIsNewUser = (value: boolean) => {
    setIsNewUserState(value);
    if (value) {
      persistBalance(0);
      persistApiKeys([]);
    }
  };

  const addBalance = (amount: number) => {
    if (!Number.isFinite(amount) || amount <= 0) return;
    persistBalance(Math.max(0, balance + amount));
  };

  const addApiKey = (placement: PlacementStyle, frequency: string) => {
    const entry: ApiKeyEntry = {
      id: `key_${Date.now()}`,
      value: generateKeyValue(),
      placement,
      frequency,
    };
    persistApiKeys([...apiKeys, entry]);
  };

  const removeApiKey = (id: string) => {
    persistApiKeys(apiKeys.filter((k) => k.id !== id));
  };

  return (
    <DemoStateContext.Provider
      value={{
        isNewUser,
        setIsNewUser,
        dashboard,
        setDashboard,
        forceEmptyStates,
        setForceEmptyStates,
        sidebarCollapsed,
        setSidebarCollapsed,
        balance,
        addBalance,
        apiKeys,
        addApiKey,
        removeApiKey,
      }}
    >
      {children}
    </DemoStateContext.Provider>
  );
}

export function useDemoState() {
  const ctx = useContext(DemoStateContext);
  if (!ctx) throw new Error("useDemoState must be used within DemoStateProvider");
  return ctx;
}
