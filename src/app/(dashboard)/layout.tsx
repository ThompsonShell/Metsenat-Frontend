'use client';

import { AuthGuard } from '@/components/layout/AuthGuard';
import { DashboardLayout } from '@/components/layout/DashboardLayout';

/**
 * Layout shared by all protected dashboard routes.
 * Wraps its children in {@link AuthGuard} (redirect to login if not
 * authenticated) and {@link DashboardLayout} (sidebar + navbar shell).
 */
export default function PrivateLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard>
      <DashboardLayout>{children}</DashboardLayout>
    </AuthGuard>
  );
}
