'use client';

import Link from 'next/link';
import { useState } from 'react';
import { AppealForm } from '@/components/forms/AppealForm';
import { Button } from '@/components/ui/Button';
import { StatusBadge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { TBody, THead, Table } from '@/components/ui/Table';
import { useAppeals } from '@/hooks/useAppeals';
import { formatDate } from '@/lib/utils';
import { appealService } from '@/services/appealService';

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
    if (!confirm('Arizani o\'chirishni tasdiqlaysizmi?')) {
      return;
    }

    try {
      await appealService.delete(id);
      refetch();
    } catch {
      alert('O\'chirishda xatolik');
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-semibold">Arizalar</h2>
        <Button onClick={() => setOpenCreate(true)}>Yangi ariza</Button>
      </div>

      <div className="grid grid-cols-1 gap-2 md:grid-cols-5">
        <Input placeholder="Status" value={status} onChange={(event) => setStatus(event.target.value)} />
        <Input placeholder="Sponsor ID" value={sponsor} onChange={(event) => setSponsor(event.target.value)} />
        <Input placeholder="Payment ID" value={paymentMethod} onChange={(event) => setPaymentMethod(event.target.value)} />
        <Input placeholder="Amount >=" value={amountFrom} onChange={(event) => setAmountFrom(event.target.value)} />
        <Input placeholder="Amount <=" value={amountTo} onChange={(event) => setAmountTo(event.target.value)} />
      </div>

      {loading && <div className="rounded bg-white p-4">Yuklanmoqda...</div>}
      {error && <div className="rounded bg-red-50 p-4 text-red-700">{error}</div>}

      <div className="overflow-auto rounded-lg border border-gray-200 bg-white">
        <Table>
          <THead>
            <tr>
              {['Phone', 'Amount', 'Available', 'Status', 'Sponsor', 'Payment method', 'Created at', 'Actions'].map((head) => (
                <th key={head} className="px-3 py-2 text-left font-medium text-gray-600">
                  {head}
                </th>
              ))}
            </tr>
          </THead>
          <TBody>
            {appeals.map((appeal) => (
              <tr key={appeal.id}>
                <td className="px-3 py-2">{appeal.phone_number}</td>
                <td className="px-3 py-2">{appeal.amount}</td>
                <td className="px-3 py-2">{appeal.available}</td>
                <td className="px-3 py-2">
                  <StatusBadge status={appeal.status} />
                </td>
                <td className="px-3 py-2">{appeal.sponsor?.phone_number || '-'}</td>
                <td className="px-3 py-2">{appeal.payment_method?.name || '-'}</td>
                <td className="px-3 py-2">{formatDate(appeal.created_at)}</td>
                <td className="px-3 py-2">
                  <div className="flex gap-2">
                    <Link href={`/appeals/${appeal.id}`} className="rounded border px-2 py-1 text-xs">
                      View
                    </Link>
                    <button className="rounded border border-red-300 px-2 py-1 text-xs text-red-700" onClick={() => deleteAppeal(appeal.id)}>
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </TBody>
        </Table>
      </div>

      <Modal open={openCreate} onClose={() => setOpenCreate(false)} title="Yangi ariza yaratish">
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
