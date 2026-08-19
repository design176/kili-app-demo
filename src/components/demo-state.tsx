"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";

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

const noopSubscribe = () => () => {};
const noStoredValue = () => null;

/**
 * Reads a raw localStorage string, defaulting to `null` during SSR (and on
 * the client's first render, to match) so hydration never sees a mismatch —
 * the swap to the real client value happens as part of React's own
 * useSyncExternalStore machinery instead of a setState-in-effect.
 */
function useStoredRaw(key: string) {
  return useSyncExternalStore(
    noopSubscribe,
    () => window.localStorage.getItem(key),
    noStoredValue
  );
}

type DemoState = {
  isNewUser: boolean;
  setIsNewUser: (value: boolean) => void;
  forceEmptyStates: boolean;
  setForceEmptyStates: (value: boolean) => void;
  forceLoadingStates: boolean;
  setForceLoadingStates: (value: boolean) => void;
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
  const [forceEmptyStates, setForceEmptyStates] = useState(false);
  const [forceLoadingStates, setForceLoadingStates] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Overrides win once set (i.e. after any write this session); until then,
  // the value read from localStorage on the client is used.
  const [balanceOverride, setBalanceOverride] = useState<number | null>(null);
  const [apiKeysOverride, setApiKeysOverride] = useState<ApiKeyEntry[] | null>(null);

  const storedBalanceRaw = useStoredRaw(BALANCE_STORAGE_KEY);
  const storedApiKeysRaw = useStoredRaw(API_KEYS_STORAGE_KEY);

  const storedBalance = useMemo(
    () => (storedBalanceRaw !== null ? Number(storedBalanceRaw) : DEFAULT_BALANCE),
    [storedBalanceRaw]
  );
  const storedApiKeys = useMemo(() => {
    if (storedApiKeysRaw === null) return [];
    try {
      return JSON.parse(storedApiKeysRaw) as ApiKeyEntry[];
    } catch {
      return [];
    }
  }, [storedApiKeysRaw]);

  const balance = balanceOverride ?? storedBalance;
  const apiKeys = apiKeysOverride ?? storedApiKeys;

  const persistBalance = (value: number) => {
    setBalanceOverride(value);
    window.localStorage.setItem(BALANCE_STORAGE_KEY, String(value));
  };

  const persistApiKeys = (keys: ApiKeyEntry[]) => {
    setApiKeysOverride(keys);
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
        forceEmptyStates,
        setForceEmptyStates,
        forceLoadingStates,
        setForceLoadingStates,
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
