"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { mockBalance } from "@/lib/mock-data";

export type ApiKeyEntry = {
  id: string;
  name: string;
  value: string;
};

const BALANCE_STORAGE_KEY = "kili-demo-balance";
const API_KEYS_STORAGE_KEY = "kili-demo-api-keys";
const PIXEL_KEYS_STORAGE_KEY = "kili-demo-pixel-keys";

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
  resetBalance: () => void;
  apiKeys: ApiKeyEntry[];
  addApiKey: () => ApiKeyEntry;
  removeApiKey: (id: string) => void;
  clearApiKeys: () => void;
  pixelKeys: ApiKeyEntry[];
  addPixelKey: () => ApiKeyEntry;
  removePixelKey: (id: string) => void;
  clearPixelKeys: () => void;
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
  const [pixelKeysOverride, setPixelKeysOverride] = useState<ApiKeyEntry[] | null>(null);

  const storedBalanceRaw = useStoredRaw(BALANCE_STORAGE_KEY);
  const storedApiKeysRaw = useStoredRaw(API_KEYS_STORAGE_KEY);
  const storedPixelKeysRaw = useStoredRaw(PIXEL_KEYS_STORAGE_KEY);

  const storedBalance = useMemo(
    () => (storedBalanceRaw !== null ? Number(storedBalanceRaw) : mockBalance),
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
  const storedPixelKeys = useMemo(() => {
    if (storedPixelKeysRaw === null) return [];
    try {
      return JSON.parse(storedPixelKeysRaw) as ApiKeyEntry[];
    } catch {
      return [];
    }
  }, [storedPixelKeysRaw]);

  const balance = balanceOverride ?? storedBalance;
  const apiKeys = apiKeysOverride ?? storedApiKeys;
  const pixelKeys = pixelKeysOverride ?? storedPixelKeys;

  const persistBalance = (value: number) => {
    setBalanceOverride(value);
    window.localStorage.setItem(BALANCE_STORAGE_KEY, String(value));
  };

  const persistApiKeys = (keys: ApiKeyEntry[]) => {
    setApiKeysOverride(keys);
    window.localStorage.setItem(API_KEYS_STORAGE_KEY, JSON.stringify(keys));
  };

  const persistPixelKeys = (keys: ApiKeyEntry[]) => {
    setPixelKeysOverride(keys);
    window.localStorage.setItem(PIXEL_KEYS_STORAGE_KEY, JSON.stringify(keys));
  };

  // Toggling into "new user" simulates a fresh signup — balance and keys reset.
  const setIsNewUser = (value: boolean) => {
    setIsNewUserState(value);
    if (value) {
      persistBalance(0);
      persistApiKeys([]);
      persistPixelKeys([]);
    }
  };

  const addBalance = (amount: number) => {
    if (!Number.isFinite(amount) || amount <= 0) return;
    persistBalance(Math.max(0, balance + amount));
  };

  const resetBalance = () => persistBalance(0);

  const addApiKey = () => {
    const entry: ApiKeyEntry = {
      id: `key_${Date.now()}`,
      name: `Key ${apiKeys.length + 1}`,
      value: generateKeyValue(),
    };
    persistApiKeys([...apiKeys, entry]);
    return entry;
  };

  const removeApiKey = (id: string) => {
    persistApiKeys(apiKeys.filter((k) => k.id !== id));
  };

  const clearApiKeys = () => persistApiKeys([]);

  const addPixelKey = () => {
    const entry: ApiKeyEntry = {
      id: `pxkey_${Date.now()}`,
      name: `Key ${pixelKeys.length + 1}`,
      value: generateKeyValue(),
    };
    persistPixelKeys([...pixelKeys, entry]);
    return entry;
  };

  const removePixelKey = (id: string) => {
    persistPixelKeys(pixelKeys.filter((k) => k.id !== id));
  };

  const clearPixelKeys = () => persistPixelKeys([]);

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
        resetBalance,
        apiKeys,
        addApiKey,
        removeApiKey,
        clearApiKeys,
        pixelKeys,
        addPixelKey,
        removePixelKey,
        clearPixelKeys,
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
