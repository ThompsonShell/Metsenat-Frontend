'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { SponsorForm } from '@/components/forms/SponsorForm';
import { sponsorService } from '@/services/sponsorService';
import { StudentSponsor } from '@/types';

export default function SponsorDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<StudentSponsor | null>(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    try {
      setLoading(true);
      const item = await sponsorService.get(id);
      setData(item);
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

  if (!data) {
    return <div>Topilmadi</div>;
  }

  return (
    <div className="space-y-4 rounded-lg bg-white p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Sponsor #{data.id}</h2>
        <Link href="/sponsors" className="rounded border px-3 py-1">
          Orqaga
        </Link>
      </div>
      <SponsorForm
        sponsorId={data.id}
        onSuccess={load}
        initialValues={{
          sponsor: data.sponsor?.id,
          student: data.student?.id,
          amount: Number(data.amount),
        }}
      />
    </div>
  );
}
