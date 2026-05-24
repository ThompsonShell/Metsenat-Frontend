'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';

/**
 * Convenience hook that hydrates the auth store from localStorage on mount
 * and returns the full auth state and actions.
 *
 * Use this hook in components that need to read authentication state or
 * trigger login/logout without manually calling `loadFromStorage`.
 *
 * @returns The Zustand auth store slice (tokens, `isAuthenticated`, and actions).
 */
export function useAuth() {
  const loadFromStorage = useAuthStore((s) => s.loadFromStorage);
  const store = useAuthStore();

  useEffect(() => {
    loadFromStorage();
  }, [loadFromStorage]);

  return store;
}
