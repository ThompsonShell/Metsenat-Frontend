'use client';

import { usePathname } from 'next/navigation';
import { LogOut, Bell } from 'lucide-react';
import { authService } from '@/services/authService';
import { useAuthStore } from '@/store/authStore';

/** Maps route paths to their human-readable page titles shown in the navbar. */
const PAGE_TITLES: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/users': 'Users',
  '/appeals': 'Appeals',
  '/sponsors': 'Sponsors',
  '/universities': 'Universities',
  '/payment-methods': 'Payment Methods',
};

/**
 * Top navigation bar for the dashboard layout.
 *
 * Displays the title of the current page (derived from the pathname) and
 * provides a logout button that calls the server-side logout endpoint before
 * clearing local tokens and redirecting to `/login`.
 */
export function Navbar() {
  const logout = useAuthStore((state) => state.logout);
  const pathname = usePathname();

  const title = Object.entries(PAGE_TITLES).find(([key]) => pathname === key || (key !== '/dashboard' && pathname.startsWith(key)))?.[1] ?? 'Dashboard';

  const handleLogout = async () => {
    try {
      await authService.logout();
    } catch {
      // Ignore backend logout failures – clear local state regardless.
    }
    logout();
    window.location.href = '/login';
  };

  return (
    <header className="flex items-center justify-between border-b border-gray-100 bg-white px-6 py-3">
      <h1 className="text-base font-semibold text-gray-900">{title}</h1>
      <div className="flex items-center gap-2">
        <button className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 hover:bg-gray-50 hover:text-gray-600 transition">
          <Bell size={18} />
        </button>
        <button
          onClick={handleLogout}
          className="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50 transition"
        >
          <LogOut size={15} />
          Log out
        </button>
      </div>
    </header>
  );
}
