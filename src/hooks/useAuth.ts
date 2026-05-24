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
 * `loadFromStorage` is a stable Zustand action reference so it only triggers
 * the effect once after the component mounts.
 *
 * @returns The Zustand auth store slice (tokens, `isAuthenticated`, and actions).
 */
export function useAuth() {
  const store = useAuthStore();
  const { loadFromStorage } = store;

  useEffect(() => {
    loadFromStorage();
  }, [loadFromStorage]);

  return store;
}
