'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { sponsorService } from '@/services/sponsorService';

const schema = z.object({
  sponsor: z.coerce.number().positive(),
  student: z.coerce.number().positive(),
  amount: z.coerce.number().positive(),
});

export function SponsorForm({
  onSuccess,
  sponsorId,
  initialValues,
}: {
  onSuccess: () => void;
  sponsorId?: number;
  initialValues?: Partial<z.infer<typeof schema>>;
}) {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { sponsor: 0, student: 0, amount: 0, ...initialValues },
  });

  const submit = form.handleSubmit(async (values) => {
    try {
      if (sponsorId) {
        await sponsorService.update(sponsorId, values);
      } else {
        await sponsorService.create(values);
      }
      onSuccess();
    } catch {
      alert('Sponsor ma\'lumotini saqlashda xatolik');
    }
  });

  return (
    <form onSubmit={submit} className="grid grid-cols-1 gap-3 md:grid-cols-2">
      <Input type="number" placeholder="Sponsor ID" {...form.register('sponsor')} />
      <Input type="number" placeholder="Student ID" {...form.register('student')} />
      <Input type="number" placeholder="Amount" {...form.register('amount')} />
      <Button type="submit" className="md:col-span-2">
        Saqlash
      </Button>
    </form>
  );
}
