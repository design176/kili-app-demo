"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { mockBalance, mockWalletAddress } from "@/lib/mock-data";
import { developerTourSteps } from "@/lib/developer-tour";

export type ApiKeyEntry = {
  id: string;
  name: string;
  value: string;
};

const BALANCE_STORAGE_KEY = "kili-demo-balance";
const API_KEYS_STORAGE_KEY = "kili-demo-api-keys";
const PIXEL_KEYS_STORAGE_KEY = "kili-demo-pixel-keys";
const TOUR_STEP_STORAGE_KEY = "kili-demo-developer-tour-step";
const COMPANY_LOGO_URL_STORAGE_KEY = "kili-demo-company-logo-url";
const WALLET_ADDRESS_STORAGE_KEY = "kili-demo-wallet-address";

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
  /** -1 = no walkthrough active, otherwise an index into `developerTourSteps`. */
  developerTourStep: number;
  startDeveloperTour: () => void;
  advanceDeveloperTour: () => void;
  retreatDeveloperTour: () => void;
  closeDeveloperTour: () => void;
  /** Developer's configured payout method — null shows the sidebar's red "Payout method not set" alert. */
  walletAddress: string | null;
  setWalletAddress: (address: string) => void;
  clearWalletAddress: () => void;
  /** Advertiser's company logo URL, set from Settings — null shows "Company logo not set" in Create Campaign. */
  companyLogoUrl: string | null;
  setCompanyLogoUrl: (url: string) => void;
  clearCompanyLogoUrl: () => void;
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
  const [tourStepOverride, setTourStepOverride] = useState<number | null>(null);
  // Two-state override: `undefined` = not yet written this session (fall back
  // to localStorage), `null` = explicitly cleared, string = explicitly set.
  const [companyLogoUrlOverride, setCompanyLogoUrlOverride] = useState<string | null | undefined>(
    undefined
  );
  const [walletAddressOverride, setWalletAddressOverride] = useState<string | null | undefined>(
    undefined
  );

  const storedBalanceRaw = useStoredRaw(BALANCE_STORAGE_KEY);
  const storedApiKeysRaw = useStoredRaw(API_KEYS_STORAGE_KEY);
  const storedPixelKeysRaw = useStoredRaw(PIXEL_KEYS_STORAGE_KEY);
  const storedTourStepRaw = useStoredRaw(TOUR_STEP_STORAGE_KEY);
  const storedCompanyLogoUrlRaw = useStoredRaw(COMPANY_LOGO_URL_STORAGE_KEY);
  const storedWalletAddressRaw = useStoredRaw(WALLET_ADDRESS_STORAGE_KEY);

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
  const storedTourStep = useMemo(
    () => (storedTourStepRaw !== null ? Number(storedTourStepRaw) : -1),
    [storedTourStepRaw]
  );
  // Defaults to a demo address (no error) unless explicitly set — only a fresh
  // "new user" reset clears it, so the "payout method not set" alert is new-user-only.
  const storedWalletAddress = storedWalletAddressRaw !== null ? storedWalletAddressRaw : mockWalletAddress;

  const balance = balanceOverride ?? storedBalance;
  const apiKeys = apiKeysOverride ?? storedApiKeys;
  const pixelKeys = pixelKeysOverride ?? storedPixelKeys;
  const developerTourStep = tourStepOverride ?? storedTourStep;
  const companyLogoUrl =
    companyLogoUrlOverride !== undefined ? companyLogoUrlOverride : storedCompanyLogoUrlRaw;
  const walletAddress = walletAddressOverride !== undefined ? walletAddressOverride : storedWalletAddress;

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

  const persistTourStep = (value: number) => {
    setTourStepOverride(value);
    window.localStorage.setItem(TOUR_STEP_STORAGE_KEY, String(value));
  };

  const persistWalletAddress = (value: string | null) => {
    setWalletAddressOverride(value);
    if (value === null) {
      window.localStorage.removeItem(WALLET_ADDRESS_STORAGE_KEY);
    } else {
      window.localStorage.setItem(WALLET_ADDRESS_STORAGE_KEY, value);
    }
  };

  const setCompanyLogoUrl = (url: string) => {
    setCompanyLogoUrlOverride(url);
    window.localStorage.setItem(COMPANY_LOGO_URL_STORAGE_KEY, url);
  };

  const clearCompanyLogoUrl = () => {
    setCompanyLogoUrlOverride(null);
    window.localStorage.removeItem(COMPANY_LOGO_URL_STORAGE_KEY);
  };

  // Toggling into "new user" simulates a fresh signup — balance, keys, and
  // wallet address reset. The developer walkthrough itself is only started
  // explicitly (from login, or the Settings help modal), not automatically by
  // this toggle — but turning the toggle back off restores the normal
  // (non-error) account state: balance and wallet address back to their demo
  // defaults, and any walkthrough left running from a previous session
  // closed, since these all persist in localStorage independently of this
  // toggle and would otherwise linger.
  const setIsNewUser = (value: boolean) => {
    setIsNewUserState(value);
    if (value) {
      persistBalance(0);
      persistApiKeys([]);
      persistPixelKeys([]);
      persistWalletAddress(null);
      clearCompanyLogoUrl();
    } else {
      persistBalance(mockBalance);
      persistWalletAddress(mockWalletAddress);
      persistTourStep(-1);
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

  const startDeveloperTour = () => persistTourStep(0);

  const advanceDeveloperTour = () => {
    const step = developerTourSteps[developerTourStep];
    if (!step) return;
    if (step.isLast) {
      persistTourStep(-1);
      return;
    }
    persistTourStep(developerTourStep + 1);
  };

  const retreatDeveloperTour = () => {
    if (developerTourStep <= 0) return;
    persistTourStep(developerTourStep - 1);
  };

  const closeDeveloperTour = () => persistTourStep(-1);

  const setWalletAddress = (address: string) => persistWalletAddress(address);

  const clearWalletAddress = () => persistWalletAddress(null);

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
        developerTourStep,
        startDeveloperTour,
        advanceDeveloperTour,
        retreatDeveloperTour,
        closeDeveloperTour,
        walletAddress,
        setWalletAddress,
        clearWalletAddress,
        companyLogoUrl,
        setCompanyLogoUrl,
        clearCompanyLogoUrl,
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

export function useDemoStateOptional() {
  return useContext(DemoStateContext);
}
