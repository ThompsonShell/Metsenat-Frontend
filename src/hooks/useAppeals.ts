'use client';

import { useCallback, useEffect, useState } from 'react';
import { Appeal } from '@/types';
import { AppealFilters, appealService } from '@/services/appealService';

export function useAppeals(filters: AppealFilters) {
  const [appeals, setAppeals] = useState<Appeal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAppeals = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await appealService.list(filters);
      setAppeals(data);
    } catch {
      setError('Arizalarni yuklashda xatolik yuz berdi');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchAppeals();
  }, [fetchAppeals]);

  return { appeals, loading, error, refetch: fetchAppeals };
}
