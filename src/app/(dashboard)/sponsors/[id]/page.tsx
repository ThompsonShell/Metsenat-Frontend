'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { SponsorForm } from '@/components/forms/SponsorForm';
import { sponsorService } from '@/services/sponsorService';
import { StudentSponsor } from '@/types';

/**
 * Sponsor assignment detail / edit page.
 *
 * Fetches the assignment identified by the `[id]` route segment and renders a
 * {@link SponsorForm} pre-populated with the current values. Re-fetches after
 * a successful save so the form always reflects the latest server state.
 */
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
    return <div className="flex items-center justify-center py-16 text-sm text-gray-400">Loading...</div>;
  }

  if (!data) {
    return <div className="rounded-xl bg-white p-6 text-sm text-gray-500">Record not found</div>;
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <Link
          href="/sponsors"
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 transition"
        >
          <ArrowLeft size={16} />
        </Link>
        <h2 className="text-xl font-semibold text-gray-900">Sponsor #{data.id}</h2>
      </div>

      <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-card">
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
    </div>
  );
}
