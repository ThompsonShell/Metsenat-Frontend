'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { TBody, THead, Table } from '@/components/ui/Table';
import { generalService } from '@/services/generalService';
import { PaymentMethod } from '@/types';

/** Form values for the inline "add payment method" form. */
interface FormValues {
  name: string;
  slug: string;
}

/**
 * Payment methods management page.
 *
 * Displays all existing payment methods in a table and provides an inline
 * form at the top to create new ones. The list re-fetches automatically after
 * a successful create.
 */
export default function PaymentMethodsPage() {
  const [methods, setMethods] = useState<PaymentMethod[]>([]);
  const [loading, setLoading] = useState(true);
  const { register, handleSubmit, reset } = useForm<FormValues>();

  const load = async () => {
    try {
      setLoading(true);
      const data = await generalService.listPaymentMethods();
      setMethods(data);
    } catch {
      alert('Failed to load payment methods. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const submit = handleSubmit(async (values) => {
    try {
      await generalService.createPaymentMethod(values);
      reset();
      load();
    } catch {
      alert('Failed to save payment method. Please try again.');
    }
  });

  return (
    <div className="space-y-5">
      <h2 className="text-xl font-semibold text-gray-900">Payment Methods</h2>

      <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-card">
        <p className="mb-3 text-sm font-medium text-gray-700">Add new payment method</p>
        <form onSubmit={submit} className="grid grid-cols-1 gap-3 md:grid-cols-3">
          <Input placeholder="Name" {...register('name', { required: true })} />
          <Input placeholder="Slug" {...register('slug', { required: true })} />
          <Button type="submit" className="flex items-center gap-1.5">
            <Plus size={15} />
            Add
          </Button>
        </form>
      </div>

      <div className="rounded-xl bg-white border border-gray-100 shadow-card">
        {loading && (
          <div className="flex items-center justify-center py-12 text-sm text-gray-400">Loading...</div>
        )}

        <div className="overflow-auto">
          <Table>
            <THead>
              <tr>
                {['#', 'Name', 'Slug'].map((head) => (
                  <th key={head} className="whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                    {head}
                  </th>
                ))}
              </tr>
            </THead>
            <TBody>
              {methods.map((item, idx) => (
                <tr key={item.id} className="hover:bg-gray-50/60 transition-colors">
                  <td className="px-4 py-3 text-sm text-gray-400">{idx + 1}</td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">{item.name}</td>
                  <td className="px-4 py-3 text-sm text-gray-500">{item.slug}</td>
                </tr>
              ))}
              {!loading && methods.length === 0 && (
                <tr>
                  <td colSpan={3} className="px-4 py-10 text-center text-sm text-gray-400">
                    No payment methods found
                  </td>
                </tr>
              )}
            </TBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
