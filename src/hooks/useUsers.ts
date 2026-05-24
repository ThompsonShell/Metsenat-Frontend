'use client';

import { useCallback, useEffect, useState } from 'react';
import { userService, UserFilters } from '@/services/userService';
import { User } from '@/types';

/**
 * React hook that fetches and manages a paginated list of users.
 *
 * Re-fetches automatically whenever `filters` changes.
 *
 * @param filters - Query parameters forwarded to the user list API.
 * @returns An object containing:
 *   - `users`   – the current list of users (empty array while loading).
 *   - `loading` – `true` while the request is in flight.
 *   - `error`   – a user-facing error message, or `null` on success.
 *   - `refetch` – a stable callback to manually trigger a re-fetch.
 */
export function useUsers(filters: UserFilters) {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await userService.list(filters);
      setUsers(data);
    } catch {
      setError('Failed to load users');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return { users, loading, error, refetch: fetchUsers };
}
