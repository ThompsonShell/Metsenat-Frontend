'use client';

import { useEffect, useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { UniversityForm } from '@/components/forms/UniversityForm';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { TBody, THead, Table } from '@/components/ui/Table';
import { generalService } from '@/services/generalService';
import { University } from '@/types';

/**
 * Universities list page.
 *
 * Displays all universities in a table with a delete action per row, and
 * opens a modal to create new universities via {@link UniversityForm}.
 */
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
      alert('Failed to load universities. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this university?')) {
      return;
    }

    try {
      await generalService.deleteUniversity(id);
      load();
    } catch {
      alert('Failed to delete university. Please try again.');
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Universities</h2>
        <Button onClick={() => setOpenCreate(true)} className="flex items-center gap-1.5">
          <Plus size={15} />
          Add
        </Button>
      </div>

      <div className="rounded-xl bg-white border border-gray-100 shadow-card">
        {loading && (
          <div className="flex items-center justify-center py-12 text-sm text-gray-400">Loading...</div>
        )}

        <div className="overflow-auto">
          <Table>
            <THead>
              <tr>
                {['#', 'Name', 'Contract Amount', 'Slug', 'Actions'].map((head) => (
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
                    No universities found
                  </td>
                </tr>
              )}
            </TBody>
          </Table>
        </div>
      </div>

      <Modal open={openCreate} title="Add university" onClose={() => setOpenCreate(false)}>
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
