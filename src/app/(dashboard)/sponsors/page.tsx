'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Plus, Trash2, Eye } from 'lucide-react';
import { SponsorForm } from '@/components/forms/SponsorForm';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { TBody, THead, Table } from '@/components/ui/Table';
import { useSponsors } from '@/hooks/useSponsors';
import { formatDate } from '@/lib/utils';
import { sponsorService } from '@/services/sponsorService';

/**
 * Sponsor assignments list page.
 *
 * Provides filter inputs (sponsor ID, student ID, amount range), a data table
 * with view/delete actions per row, and a modal to create new assignments.
 */
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
    if (!confirm('Are you sure you want to delete this record?')) {
      return;
    }

    try {
      await sponsorService.delete(id);
      refetch();
    } catch {
      alert('Failed to delete record. Please try again.');
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Sponsors</h2>
        <Button onClick={() => setOpenCreate(true)} className="flex items-center gap-1.5">
          <Plus size={15} />
          Add
        </Button>
      </div>

      <div className="rounded-xl bg-white border border-gray-100 shadow-card">
        <div className="grid grid-cols-1 gap-3 p-4 md:grid-cols-4 border-b border-gray-50">
          <Input placeholder="Sponsor ID" value={sponsor} onChange={(e) => setSponsor(e.target.value)} />
          <Input placeholder="Student ID" value={student} onChange={(e) => setStudent(e.target.value)} />
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
                {['#', 'Sponsor', 'Student', 'Amount', 'Date', 'Actions'].map((head) => (
                  <th key={head} className="whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                    {head}
                  </th>
                ))}
              </tr>
            </THead>
            <TBody>
              {sponsors.map((item, idx) => (
                <tr key={item.id} className="hover:bg-gray-50/60 transition-colors">
                  <td className="px-4 py-3 text-sm text-gray-400">{idx + 1}</td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">{item.sponsor?.phone_number || '—'}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{item.student?.phone_number || '—'}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{item.amount}</td>
                  <td className="px-4 py-3 text-sm text-gray-500">{formatDate(item.created_at)}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      <Link
                        href={`/sponsors/${item.id}`}
                        className="flex h-7 w-7 items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:border-brand hover:text-brand transition"
                      >
                        <Eye size={13} />
                      </Link>
                      <button
                        className="flex h-7 w-7 items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:border-red-300 hover:text-red-500 transition"
                        onClick={() => handleDelete(item.id)}
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {!loading && sponsors.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-10 text-center text-sm text-gray-400">
                    No sponsors found
                  </td>
                </tr>
              )}
            </TBody>
          </Table>
        </div>
      </div>

      <Modal open={openCreate} onClose={() => setOpenCreate(false)} title="Add sponsor assignment">
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
