'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { AppealForm } from '@/components/forms/AppealForm';
import { appealService } from '@/services/appealService';
import { Appeal } from '@/types';

/**
 * Appeal detail / edit page.
 *
 * Fetches the appeal identified by the `[id]` route segment and renders an
 * {@link AppealForm} pre-populated with the current values. Re-fetches after a
 * successful save so the form always reflects the latest server state.
 */
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
    return <div className="flex items-center justify-center py-16 text-sm text-gray-400">Loading...</div>;
  }

  if (!appeal) {
    return <div className="rounded-xl bg-white p-6 text-sm text-gray-500">Appeal not found</div>;
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <Link
          href="/appeals"
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 transition"
        >
          <ArrowLeft size={16} />
        </Link>
        <h2 className="text-xl font-semibold text-gray-900">Appeal #{appeal.id}</h2>
      </div>

      <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-card">
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
    </div>
  );
}
