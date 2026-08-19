/** Abbreviates large numbers with K/M/B suffixes (e.g. 182400 → "182.4K"). */
export function formatCompactNumber(value: number): string {
  const abs = Math.abs(value);
  const trim = (n: number) => n.toFixed(1).replace(/\.0$/, "");

  if (abs >= 1_000_000_000) return `${trim(value / 1_000_000_000)}B`;
  if (abs >= 1_000_000) return `${trim(value / 1_000_000)}M`;
  if (abs >= 1_000) return `${trim(value / 1_000)}K`;
  return String(value);
}

/** Same as formatCompactNumber, with a leading currency symbol (default "$"). */
export function formatCompactCurrency(value: number, symbol = "$"): string {
  return `${symbol}${formatCompactNumber(value)}`;
}

/** Full-precision currency, always 2 decimals (e.g. 1860.4 → "$1,860.40"). */
export function formatCurrency(value: number, symbol = "$"): string {
  return `${symbol}${value.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

/** Short date format (e.g. "10 Sep, 26"). */
export function formatShortDate(date: Date): string {
  const day = date.getDate();
  const month = date.toLocaleString(undefined, { month: "short" });
  const year = String(date.getFullYear()).slice(-2);
  return `${day} ${month}, ${year}`;
}
