"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { mockBalance, mockWalletAddress, mockStripeAccountNumber } from "@/lib/mock-data";
import { developerTourSteps } from "@/lib/developer-tour";

export type ApiKeyEntry = {
  id: string;
  name: string;
  value: string;
};

export type PayoutMethod = "wallet" | "stripe";

const BALANCE_STORAGE_KEY = "kili-demo-balance";
const API_KEYS_STORAGE_KEY = "kili-demo-api-keys";
const PIXEL_KEYS_STORAGE_KEY = "kili-demo-pixel-keys";
const TOUR_STEP_STORAGE_KEY = "kili-demo-developer-tour-step";
const COMPANY_LOGO_URL_STORAGE_KEY = "kili-demo-company-logo-url";
const WALLET_ADDRESS_STORAGE_KEY = "kili-demo-wallet-address";
const STRIPE_ACCOUNT_STORAGE_KEY = "kili-demo-stripe-account";
const PAYOUT_METHOD_STORAGE_KEY = "kili-demo-payout-method";

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
  /** Developer's configured wallet payout method — null shows the sidebar's red "Payout method not set" alert when `payoutMethod` is "wallet". */
  walletAddress: string | null;
  setWalletAddress: (address: string) => void;
  clearWalletAddress: () => void;
  /** Developer's configured Stripe-linked bank account — null shows the sidebar's red "Payout method not set" alert when `payoutMethod` is "stripe". */
  stripeAccountNumber: string | null;
  setStripeAccountNumber: (accountNumber: string) => void;
  clearStripeAccountNumber: () => void;
  /** Which payout method the developer has chosen — only meaningful (and only shown as a choice) when both methods are connected. */
  payoutMethod: PayoutMethod;
  setPayoutMethod: (method: PayoutMethod) => void;
  /** The payout method actually in effect: forced to whichever single method is connected if only one is, otherwise `payoutMethod`. Use this (not `payoutMethod`) to gate the Next payout card and sidebar alert. */
  effectivePayoutMethod: PayoutMethod;
  /** Forces the developer Earnings page's next-payout amount below the $20 minimum. */
  lowPayout: boolean;
  setLowPayout: (value: boolean) => void;
  /** Forces the developer Earnings page's payout-request animation to end in a failure state. */
  triggerTransactionErrors: boolean;
  setTriggerTransactionErrors: (value: boolean) => void;
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
  const [lowPayout, setLowPayout] = useState(false);
  const [triggerTransactionErrors, setTriggerTransactionErrors] = useState(false);

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
  const [stripeAccountOverride, setStripeAccountOverride] = useState<string | null | undefined>(
    undefined
  );
  const [payoutMethodOverride, setPayoutMethodOverride] = useState<PayoutMethod | null>(null);

  const storedBalanceRaw = useStoredRaw(BALANCE_STORAGE_KEY);
  const storedApiKeysRaw = useStoredRaw(API_KEYS_STORAGE_KEY);
  const storedPixelKeysRaw = useStoredRaw(PIXEL_KEYS_STORAGE_KEY);
  const storedTourStepRaw = useStoredRaw(TOUR_STEP_STORAGE_KEY);
  const storedCompanyLogoUrlRaw = useStoredRaw(COMPANY_LOGO_URL_STORAGE_KEY);
  const storedWalletAddressRaw = useStoredRaw(WALLET_ADDRESS_STORAGE_KEY);
  const storedStripeAccountRaw = useStoredRaw(STRIPE_ACCOUNT_STORAGE_KEY);
  const storedPayoutMethodRaw = useStoredRaw(PAYOUT_METHOD_STORAGE_KEY);

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
  // Same pattern as the wallet address — pre-seeded for a returning user.
  const storedStripeAccount =
    storedStripeAccountRaw !== null ? storedStripeAccountRaw : mockStripeAccountNumber;
  const storedPayoutMethod: PayoutMethod =
    storedPayoutMethodRaw === "wallet" || storedPayoutMethodRaw === "stripe"
      ? storedPayoutMethodRaw
      : "wallet";

  const balance = balanceOverride ?? storedBalance;
  const apiKeys = apiKeysOverride ?? storedApiKeys;
  const pixelKeys = pixelKeysOverride ?? storedPixelKeys;
  const developerTourStep = tourStepOverride ?? storedTourStep;
  const companyLogoUrl =
    companyLogoUrlOverride !== undefined ? companyLogoUrlOverride : storedCompanyLogoUrlRaw;
  const walletAddress = walletAddressOverride !== undefined ? walletAddressOverride : storedWalletAddress;
  const stripeAccountNumber =
    stripeAccountOverride !== undefined ? stripeAccountOverride : storedStripeAccount;
  const payoutMethod = payoutMethodOverride ?? storedPayoutMethod;
  // When only one of the two methods is connected, it's the only usable
  // option regardless of the stored preference — forces the Earnings page
  // and sidebar alert to agree on which method is actually active.
  const onlyWalletConnected = !!walletAddress && !stripeAccountNumber;
  const onlyStripeConnected = !!stripeAccountNumber && !walletAddress;
  const effectivePayoutMethod: PayoutMethod = onlyWalletConnected
    ? "wallet"
    : onlyStripeConnected
      ? "stripe"
      : payoutMethod;

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

  const persistStripeAccountNumber = (value: string | null) => {
    setStripeAccountOverride(value);
    if (value === null) {
      window.localStorage.removeItem(STRIPE_ACCOUNT_STORAGE_KEY);
    } else {
      window.localStorage.setItem(STRIPE_ACCOUNT_STORAGE_KEY, value);
    }
  };

  const persistPayoutMethod = (value: PayoutMethod) => {
    setPayoutMethodOverride(value);
    window.localStorage.setItem(PAYOUT_METHOD_STORAGE_KEY, value);
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
      persistStripeAccountNumber(null);
      persistPayoutMethod("wallet");
      clearCompanyLogoUrl();
    } else {
      persistBalance(mockBalance);
      persistWalletAddress(mockWalletAddress);
      persistStripeAccountNumber(mockStripeAccountNumber);
      persistPayoutMethod("wallet");
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

  const setStripeAccountNumber = (accountNumber: string) => persistStripeAccountNumber(accountNumber);

  const clearStripeAccountNumber = () => persistStripeAccountNumber(null);

  const setPayoutMethod = (method: PayoutMethod) => persistPayoutMethod(method);

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
        stripeAccountNumber,
        setStripeAccountNumber,
        clearStripeAccountNumber,
        payoutMethod,
        setPayoutMethod,
        effectivePayoutMethod,
        lowPayout,
        setLowPayout,
        triggerTransactionErrors,
        setTriggerTransactionErrors,
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
