import { AppealStatus } from '@/types';

/** Tailwind classes applied to each appeal status badge. */
const statusClass: Record<AppealStatus, string> = {
  1: 'bg-blue-50 text-blue-600 border border-blue-100',
  2: 'bg-amber-50 text-amber-700 border border-amber-100',
  3: 'bg-emerald-50 text-emerald-700 border border-emerald-100',
  4: 'bg-red-50 text-red-600 border border-red-100',
};

/** English display labels for each appeal status. */
const statusLabel: Record<AppealStatus, string> = {
  1: 'New',
  2: 'Moderation',
  3: 'Confirmed',
  4: 'Cancelled',
};

/**
 * Renders a coloured pill badge for a given appeal status.
 *
 * @param status - The numeric appeal status (1–4).
 */
export function StatusBadge({ status }: { status: AppealStatus }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${statusClass[status]}`}>
      {statusLabel[status]}
    </span>
  );
}
