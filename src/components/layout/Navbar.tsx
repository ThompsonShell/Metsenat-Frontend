'use client';

import { Button } from '@/components/ui/Button';
import { authService } from '@/services/authService';
import { useAuthStore } from '@/store/authStore';

export function Navbar() {
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = async () => {
    try {
      await authService.logout();
    } catch {
      // Ignore backend logout failures
    }
    logout();
    window.location.href = '/login';
  };

  return (
    <header className="flex items-center justify-between border-b border-gray-200 bg-white px-4 py-3">
      <h1 className="text-lg font-semibold">Dashboard</h1>
      <Button variant="secondary" onClick={handleLogout}>
        Logout
      </Button>
    </header>
  );
}
