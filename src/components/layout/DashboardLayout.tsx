import { ReactNode } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Sidebar } from '@/components/layout/Sidebar';

/**
 * Shell layout for authenticated dashboard pages.
 *
 * Composes the fixed-width {@link Sidebar} on the left with the {@link Navbar}
 * at the top of the main content area. Page content is rendered in a scrollable
 * `<main>` region with consistent padding.
 *
 * @param children - The page content to display in the main area.
 */
export function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-page">
      <Sidebar />
      <div className="flex flex-1 flex-col min-w-0">
        <Navbar />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
