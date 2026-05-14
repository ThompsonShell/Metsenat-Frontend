import { clsx, type ClassValue } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatMoney(value: string | number) {
  const number = Number(value || 0);
  return new Intl.NumberFormat('uz-UZ').format(number);
}

export function formatDate(value?: string) {
  if (!value) {
    return '-';
  }

  return new Date(value).toLocaleString('uz-UZ');
}
