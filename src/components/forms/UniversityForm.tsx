'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { generalService } from '@/services/generalService';

const schema = z.object({
  name: z.string().min(2),
  slug: z.string().min(2),
  contract_amount: z.coerce.number().nonnegative(),
});

export function UniversityForm({
  onSuccess,
  universityId,
  initialValues,
}: {
  onSuccess: () => void;
  universityId?: number;
  initialValues?: Partial<z.infer<typeof schema>>;
}) {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { name: '', slug: '', contract_amount: 0, ...initialValues },
  });

  const submit = form.handleSubmit(async (values) => {
    try {
      if (universityId) {
        await generalService.updateUniversity(universityId, values);
      } else {
        await generalService.createUniversity(values);
      }
      onSuccess();
      form.reset();
    } catch {
      alert('Universitetni saqlashda xatolik');
    }
  });

  return (
    <form onSubmit={submit} className="grid grid-cols-1 gap-3 md:grid-cols-3">
      <Input placeholder="Name" {...form.register('name')} />
      <Input placeholder="Slug" {...form.register('slug')} />
      <Input type="number" placeholder="Contract amount" {...form.register('contract_amount')} />
      <Button className="md:col-span-3" type="submit">
        Saqlash
      </Button>
    </form>
  );
}
