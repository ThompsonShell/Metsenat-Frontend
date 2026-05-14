'use client';

import { useCallback, useEffect, useState } from 'react';
import { SponsorFilters, sponsorService } from '@/services/sponsorService';
import { StudentSponsor } from '@/types';

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
      setError('Sponsorlarni yuklashda xatolik yuz berdi');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchSponsors();
  }, [fetchSponsors]);

  return { sponsors, loading, error, refetch: fetchSponsors };
}
