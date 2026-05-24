'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Plus, Trash2, Eye } from 'lucide-react';
import { AppealForm } from '@/components/forms/AppealForm';
import { Button } from '@/components/ui/Button';
import { StatusBadge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { TBody, THead, Table } from '@/components/ui/Table';
import { useAppeals } from '@/hooks/useAppeals';
import { formatDate } from '@/lib/utils';
import { appealService } from '@/services/appealService';

/**
 * Appeals list page.
 *
 * Provides filter inputs (status, sponsor, payment method, amount range),
 * a data table with view/delete actions per row, and a modal to create new
 * appeals.
 */
export default function AppealsPage() {
  const [status, setStatus] = useState('');
  const [sponsor, setSponsor] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [amountFrom, setAmountFrom] = useState('');
  const [amountTo, setAmountTo] = useState('');
  const [openCreate, setOpenCreate] = useState(false);

  const { appeals, loading, error, refetch } = useAppeals({
    status,
    sponsor,
    payment_method: paymentMethod,
    amount__gte: amountFrom,
    amount__lte: amountTo,
  });

  const deleteAppeal = async (id: number) => {
    if (!confirm('Are you sure you want to delete this appeal?')) {
      return;
    }

    try {
      await appealService.delete(id);
      refetch();
    } catch {
      alert('Failed to delete appeal. Please try again.');
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-semibold text-gray-900">Appeals</h2>
        <Button onClick={() => setOpenCreate(true)} className="flex items-center gap-1.5">
          <Plus size={15} />
          New appeal
        </Button>
      </div>

      <div className="rounded-xl bg-white border border-gray-100 shadow-card">
        <div className="grid grid-cols-1 gap-3 p-4 md:grid-cols-5 border-b border-gray-50">
          <Input placeholder="Status" value={status} onChange={(e) => setStatus(e.target.value)} />
          <Input placeholder="Sponsor ID" value={sponsor} onChange={(e) => setSponsor(e.target.value)} />
          <Input placeholder="Payment ID" value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} />
          <Input placeholder="Amount >=" value={amountFrom} onChange={(e) => setAmountFrom(e.target.value)} />
          <Input placeholder="Amount <=" value={amountTo} onChange={(e) => setAmountTo(e.target.value)} />
        </div>

        {loading && (
          <div className="flex items-center justify-center py-12 text-sm text-gray-400">Loading...</div>
        )}
        {error && (
          <div className="m-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">{error}</div>
        )}

        <div className="overflow-auto">
          <Table>
            <THead>
              <tr>
                {['#', 'Phone', 'Amount', 'Available', 'Status', 'Sponsor', 'Payment Method', 'Date', 'Actions'].map((head) => (
                  <th key={head} className="whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                    {head}
                  </th>
                ))}
              </tr>
            </THead>
            <TBody>
              {appeals.map((appeal, idx) => (
                <tr key={appeal.id} className="hover:bg-gray-50/60 transition-colors">
                  <td className="px-4 py-3 text-sm text-gray-400">{idx + 1}</td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">{appeal.phone_number}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{appeal.amount}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{appeal.available}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={appeal.status} />
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">{appeal.sponsor?.phone_number || '—'}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{appeal.payment_method?.name || '—'}</td>
                  <td className="px-4 py-3 text-sm text-gray-500">{formatDate(appeal.created_at)}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      <Link
                        href={`/appeals/${appeal.id}`}
                        className="flex h-7 w-7 items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:border-brand hover:text-brand transition"
                      >
                        <Eye size={13} />
                      </Link>
                      <button
                        className="flex h-7 w-7 items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:border-red-300 hover:text-red-500 transition"
                        onClick={() => deleteAppeal(appeal.id)}
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {!loading && appeals.length === 0 && (
                <tr>
                  <td colSpan={9} className="px-4 py-10 text-center text-sm text-gray-400">
                    No appeals found
                  </td>
                </tr>
              )}
            </TBody>
          </Table>
        </div>
      </div>

      <Modal open={openCreate} onClose={() => setOpenCreate(false)} title="Create new appeal">
        <AppealForm
          onSuccess={() => {
            setOpenCreate(false);
            refetch();
          }}
        />
      </Modal>
    </div>
  );
}
