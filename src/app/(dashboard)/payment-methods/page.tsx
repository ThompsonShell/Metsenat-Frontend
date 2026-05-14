'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { TBody, THead, Table } from '@/components/ui/Table';
import { generalService } from '@/services/generalService';
import { PaymentMethod } from '@/types';

interface FormValues {
  name: string;
  slug: string;
}

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
      alert('To\'lov usullarini yuklashda xatolik');
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
      alert('Saqlashda xatolik');
    }
  });

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">To&apos;lov usullari</h2>

      <form onSubmit={submit} className="grid grid-cols-1 gap-2 rounded-lg bg-white p-4 md:grid-cols-3">
        <Input placeholder="Name" {...register('name', { required: true })} />
        <Input placeholder="Slug" {...register('slug', { required: true })} />
        <Button type="submit">Qo&apos;shish</Button>
      </form>

      {loading && <div className="rounded bg-white p-4">Yuklanmoqda...</div>}

      <div className="overflow-auto rounded-lg border border-gray-200 bg-white">
        <Table>
          <THead>
            <tr>
              {['Name', 'Slug'].map((head) => (
                <th key={head} className="px-3 py-2 text-left font-medium text-gray-600">
                  {head}
                </th>
              ))}
            </tr>
          </THead>
          <TBody>
            {methods.map((item) => (
              <tr key={item.id}>
                <td className="px-3 py-2">{item.name}</td>
                <td className="px-3 py-2">{item.slug}</td>
              </tr>
            ))}
          </TBody>
        </Table>
      </div>
    </div>
  );
}
