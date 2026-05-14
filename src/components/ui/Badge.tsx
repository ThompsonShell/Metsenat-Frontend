import { AppealStatus } from '@/types';

const statusClass: Record<AppealStatus, string> = {
  1: 'bg-blue-100 text-blue-700',
  2: 'bg-yellow-100 text-yellow-800',
  3: 'bg-green-100 text-green-700',
  4: 'bg-red-100 text-red-700',
};

const statusLabel: Record<AppealStatus, string> = {
  1: 'NEW',
  2: 'MODERATION',
  3: 'CONFIRMED',
  4: 'CANCELLED',
};

export function StatusBadge({ status }: { status: AppealStatus }) {
  return <span className={`rounded-full px-2 py-1 text-xs font-semibold ${statusClass[status]}`}>{statusLabel[status]}</span>;
}
