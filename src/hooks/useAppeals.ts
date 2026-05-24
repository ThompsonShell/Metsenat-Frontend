'use client';

import { useCallback, useEffect, useState } from 'react';
import { Appeal } from '@/types';
import { AppealFilters, appealService } from '@/services/appealService';

/**
 * React hook that fetches and manages a list of appeals.
 *
 * Re-fetches automatically whenever `filters` changes.
 *
 * @param filters - Query parameters forwarded to the appeals list API.
 * @returns An object containing:
 *   - `appeals`  – the current list of appeals (empty array while loading).
 *   - `loading`  – `true` while the request is in flight.
 *   - `error`    – a user-facing error message, or `null` on success.
 *   - `refetch`  – a stable callback to manually trigger a re-fetch.
 */
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
      setError('Failed to load appeals');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchAppeals();
  }, [fetchAppeals]);

  return { appeals, loading, error, refetch: fetchAppeals };
}
