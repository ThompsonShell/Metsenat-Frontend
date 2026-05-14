'use client';

import { useEffect, useState } from 'react';
import { UniversityForm } from '@/components/forms/UniversityForm';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { TBody, THead, Table } from '@/components/ui/Table';
import { generalService } from '@/services/generalService';
import { University } from '@/types';

export default function UniversitiesPage() {
  const [universities, setUniversities] = useState<University[]>([]);
  const [loading, setLoading] = useState(true);
  const [openCreate, setOpenCreate] = useState(false);

  const load = async () => {
    try {
      setLoading(true);
      const data = await generalService.listUniversities();
      setUniversities(data);
    } catch {
      alert('Universitetlarni yuklashda xatolik');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm('O\'chirishni tasdiqlaysizmi?')) {
      return;
    }

    try {
      await generalService.deleteUniversity(id);
      load();
    } catch {
      alert('O\'chirishda xatolik');
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Universitetlar</h2>
        <Button onClick={() => setOpenCreate(true)}>Qo&apos;shish</Button>
      </div>

      {loading && <div className="rounded bg-white p-4">Yuklanmoqda...</div>}

      <div className="overflow-auto rounded-lg border border-gray-200 bg-white">
        <Table>
          <THead>
            <tr>
              {['Name', 'Contract amount', 'Slug', 'Actions'].map((head) => (
                <th key={head} className="px-3 py-2 text-left font-medium text-gray-600">
                  {head}
                </th>
              ))}
            </tr>
          </THead>
          <TBody>
            {universities.map((item) => (
              <tr key={item.id}>
                <td className="px-3 py-2">{item.name}</td>
                <td className="px-3 py-2">{item.contract_amount}</td>
                <td className="px-3 py-2">{item.slug}</td>
                <td className="px-3 py-2">
                  <button className="rounded border border-red-300 px-2 py-1 text-xs text-red-700" onClick={() => handleDelete(item.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </TBody>
        </Table>
      </div>

      <Modal open={openCreate} title="Universitet qo&apos;shish" onClose={() => setOpenCreate(false)}>
        <UniversityForm
          onSuccess={() => {
            setOpenCreate(false);
            load();
          }}
        />
      </Modal>
    </div>
  );
}
