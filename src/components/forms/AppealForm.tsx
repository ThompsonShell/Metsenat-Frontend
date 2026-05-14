'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { appealService } from '@/services/appealService';

const schema = z.object({
  phone_number: z.string().min(13),
  amount: z.coerce.number().positive(),
  available: z.coerce.number().nonnegative(),
  sponsor: z.coerce.number().positive(),
  payment_method: z.coerce.number().positive(),
  status: z.coerce.number().min(1).max(4),
});

export function AppealForm({
  onSuccess,
  initialValues,
  appealId,
}: {
  onSuccess: () => void;
  initialValues?: Partial<z.infer<typeof schema>>;
  appealId?: number;
}) {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      phone_number: '',
      amount: 0,
      available: 0,
      sponsor: 0,
      payment_method: 0,
      status: 1,
      ...initialValues,
    },
  });

  const submit = form.handleSubmit(async (values) => {
    try {
      if (appealId) {
        await appealService.update(appealId, values);
      } else {
        await appealService.create(values);
      }
      onSuccess();
    } catch {
      alert('Arizani saqlashda xatolik');
    }
  });

  return (
    <form onSubmit={submit} className="grid grid-cols-1 gap-3 md:grid-cols-2">
      <Input placeholder="Phone" {...form.register('phone_number')} />
      <Input placeholder="Amount" type="number" {...form.register('amount')} />
      <Input placeholder="Available" type="number" {...form.register('available')} />
      <Input placeholder="Sponsor ID" type="number" {...form.register('sponsor')} />
      <Input placeholder="Payment Method ID" type="number" {...form.register('payment_method')} />
      <Input placeholder="Status (1-4)" type="number" {...form.register('status')} />
      <Button type="submit" className="md:col-span-2">
        Saqlash
      </Button>
    </form>
  );
}
