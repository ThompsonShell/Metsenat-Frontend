'use client';

import { useEffect, useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
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
    if (!confirm("O'chirishni tasdiqlaysizmi?")) {
      return;
    }

    try {
      await generalService.deleteUniversity(id);
      load();
    } catch {
      alert("O'chirishda xatolik");
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Universitetlar</h2>
        <Button onClick={() => setOpenCreate(true)} className="flex items-center gap-1.5">
          <Plus size={15} />
          Qo&apos;shish
        </Button>
      </div>

      <div className="rounded-xl bg-white border border-gray-100 shadow-card">
        {loading && (
          <div className="flex items-center justify-center py-12 text-sm text-gray-400">Yuklanmoqda...</div>
        )}

        <div className="overflow-auto">
          <Table>
            <THead>
              <tr>
                {['#', 'Nomi', 'Kontrakt summasi', 'Slug', 'Amallar'].map((head) => (
                  <th key={head} className="whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                    {head}
                  </th>
                ))}
              </tr>
            </THead>
            <TBody>
              {universities.map((item, idx) => (
                <tr key={item.id} className="hover:bg-gray-50/60 transition-colors">
                  <td className="px-4 py-3 text-sm text-gray-400">{idx + 1}</td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">{item.name}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{item.contract_amount}</td>
                  <td className="px-4 py-3 text-sm text-gray-500">{item.slug}</td>
                  <td className="px-4 py-3">
                    <button
                      className="flex h-7 w-7 items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:border-red-300 hover:text-red-500 transition"
                      onClick={() => handleDelete(item.id)}
                    >
                      <Trash2 size={13} />
                    </button>
                  </td>
                </tr>
              ))}
              {!loading && universities.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-10 text-center text-sm text-gray-400">
                    Universitetlar topilmadi
                  </td>
                </tr>
              )}
            </TBody>
          </Table>
        </div>
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
