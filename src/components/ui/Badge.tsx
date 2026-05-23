import { AppealStatus } from '@/types';

const statusClass: Record<AppealStatus, string> = {
  1: 'bg-blue-50 text-blue-600 border border-blue-100',
  2: 'bg-amber-50 text-amber-700 border border-amber-100',
  3: 'bg-emerald-50 text-emerald-700 border border-emerald-100',
  4: 'bg-red-50 text-red-600 border border-red-100',
};

const statusLabel: Record<AppealStatus, string> = {
  1: 'Yangi',
  2: 'Moderatsiya',
  3: 'Tasdiqlangan',
  4: 'Bekor qilingan',
};

export function StatusBadge({ status }: { status: AppealStatus }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${statusClass[status]}`}>
      {statusLabel[status]}
    </span>
  );
}
