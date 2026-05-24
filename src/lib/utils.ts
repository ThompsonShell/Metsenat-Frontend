import { clsx, type ClassValue } from 'clsx';

/**
 * Merges Tailwind / arbitrary class names using `clsx`.
 * Accepts any combination of strings, arrays, and conditional objects.
 *
 * @param inputs - Class values to merge.
 * @returns A single space-separated class string.
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

/**
 * Formats a numeric or string value as a localized currency string
 * using Uzbek (`uz-UZ`) locale conventions (e.g. `"1 500 000"`).
 *
 * @param value - The amount to format. Falsy values are treated as `0`.
 * @returns The formatted number string.
 */
export function formatMoney(value: string | number) {
  const number = Number(value || 0);
  return new Intl.NumberFormat('uz-UZ').format(number);
}

/**
 * Formats an ISO date string into a human-readable local date/time
 * using Uzbek (`uz-UZ`) locale conventions.
 *
 * @param value - An ISO 8601 date string. Returns `"-"` when falsy.
 * @returns The formatted date/time string, or `"-"` if no value was provided.
 */
export function formatDate(value?: string) {
  if (!value) {
    return '-';
  }

  return new Date(value).toLocaleString('uz-UZ');
}
