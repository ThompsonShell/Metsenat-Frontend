'use client';

import { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';

/**
 * Client-side route guard that redirects unauthenticated users to `/login`.
 *
 * Hydrates the auth store from localStorage on mount, then redirects if no
 * valid access token is found. Shows a loading placeholder while the check
 * is in progress to avoid flashing protected content.
 *
 * @param children - Protected content rendered only when authenticated.
 */
export function AuthGuard({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { isAuthenticated, loadFromStorage } = useAuthStore();

  useEffect(() => {
    loadFromStorage();
  }, [loadFromStorage]);

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/login');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return <div className="p-6">Loading...</div>;
  }

  return <>{children}</>;
}
