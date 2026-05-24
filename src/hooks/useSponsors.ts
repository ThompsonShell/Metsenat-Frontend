'use client';

import { useCallback, useEffect, useState } from 'react';
import { SponsorFilters, sponsorService } from '@/services/sponsorService';
import { StudentSponsor } from '@/types';

/**
 * React hook that fetches and manages a list of sponsor–student assignments.
 *
 * Re-fetches automatically whenever `filters` changes.
 *
 * @param filters - Query parameters forwarded to the sponsors list API.
 * @returns An object containing:
 *   - `sponsors` – the current list of assignments (empty array while loading).
 *   - `loading`  – `true` while the request is in flight.
 *   - `error`    – a user-facing error message, or `null` on success.
 *   - `refetch`  – a stable callback to manually trigger a re-fetch.
 */
export function useSponsors(filters: SponsorFilters) {
  const [sponsors, setSponsors] = useState<StudentSponsor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSponsors = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await sponsorService.list(filters);
      setSponsors(data);
    } catch {
      setError('Failed to load sponsors');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchSponsors();
  }, [fetchSponsors]);

  return { sponsors, loading, error, refetch: fetchSponsors };
}
