'use client';

import Link from 'next/link';
import { useState } from 'react';
import { SponsorForm } from '@/components/forms/SponsorForm';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { TBody, THead, Table } from '@/components/ui/Table';
import { useSponsors } from '@/hooks/useSponsors';
import { formatDate } from '@/lib/utils';
import { sponsorService } from '@/services/sponsorService';

export default function SponsorsPage() {
  const [sponsor, setSponsor] = useState('');
  const [student, setStudent] = useState('');
  const [amountFrom, setAmountFrom] = useState('');
  const [amountTo, setAmountTo] = useState('');
  const [openCreate, setOpenCreate] = useState(false);

  const { sponsors, loading, error, refetch } = useSponsors({
    sponsor,
    student,
    amount__gte: amountFrom,
    amount__lte: amountTo,
  });

  const handleDelete = async (id: number) => {
    if (!confirm('Ma\'lumotni o\'chirasizmi?')) {
      return;
    }

    try {
      await sponsorService.delete(id);
      refetch();
    } catch {
      alert('O\'chirishda xatolik');
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Sponsorlar</h2>
        <Button onClick={() => setOpenCreate(true)}>Qo&apos;shish</Button>
      </div>

      <div className="grid grid-cols-1 gap-2 md:grid-cols-4">
        <Input placeholder="Sponsor ID" value={sponsor} onChange={(event) => setSponsor(event.target.value)} />
        <Input placeholder="Student ID" value={student} onChange={(event) => setStudent(event.target.value)} />
        <Input placeholder="Amount >=" value={amountFrom} onChange={(event) => setAmountFrom(event.target.value)} />
        <Input placeholder="Amount <=" value={amountTo} onChange={(event) => setAmountTo(event.target.value)} />
      </div>

      {loading && <div className="rounded bg-white p-4">Yuklanmoqda...</div>}
      {error && <div className="rounded bg-red-50 p-4 text-red-700">{error}</div>}

      <div className="overflow-auto rounded-lg border border-gray-200 bg-white">
        <Table>
          <THead>
            <tr>
              {['Sponsor', 'Student', 'Amount', 'Created at', 'Actions'].map((head) => (
                <th key={head} className="px-3 py-2 text-left font-medium text-gray-600">
                  {head}
                </th>
              ))}
            </tr>
          </THead>
          <TBody>
            {sponsors.map((item) => (
              <tr key={item.id}>
                <td className="px-3 py-2">{item.sponsor?.phone_number || '-'}</td>
                <td className="px-3 py-2">{item.student?.phone_number || '-'}</td>
                <td className="px-3 py-2">{item.amount}</td>
                <td className="px-3 py-2">{formatDate(item.created_at)}</td>
                <td className="px-3 py-2">
                  <div className="flex gap-2">
                    <Link href={`/sponsors/${item.id}`} className="rounded border px-2 py-1 text-xs">
                      View
                    </Link>
                    <button className="rounded border border-red-300 px-2 py-1 text-xs text-red-700" onClick={() => handleDelete(item.id)}>
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </TBody>
        </Table>
      </div>

      <Modal open={openCreate} onClose={() => setOpenCreate(false)} title="Sponsor qo&apos;shish">
        <SponsorForm
          onSuccess={() => {
            setOpenCreate(false);
            refetch();
          }}
        />
      </Modal>
    </div>
  );
}
