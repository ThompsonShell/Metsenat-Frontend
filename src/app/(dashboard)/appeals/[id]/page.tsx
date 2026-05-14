'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { AppealForm } from '@/components/forms/AppealForm';
import { appealService } from '@/services/appealService';
import { Appeal } from '@/types';

export default function AppealDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [appeal, setAppeal] = useState<Appeal | null>(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    try {
      setLoading(true);
      const data = await appealService.get(id);
      setAppeal(data);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    load();
  }, [load]);

  if (loading) {
    return <div>Yuklanmoqda...</div>;
  }

  if (!appeal) {
    return <div>Ariza topilmadi</div>;
  }

  return (
    <div className="space-y-4 rounded-lg bg-white p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Ariza #{appeal.id}</h2>
        <Link href="/appeals" className="rounded border px-3 py-1">
          Orqaga
        </Link>
      </div>
      <AppealForm
        appealId={appeal.id}
        onSuccess={load}
        initialValues={{
          phone_number: appeal.phone_number,
          amount: Number(appeal.amount),
          available: Number(appeal.available),
          status: appeal.status,
          sponsor: appeal.sponsor?.id,
          payment_method: appeal.payment_method?.id,
        }}
      />
    </div>
  );
}
