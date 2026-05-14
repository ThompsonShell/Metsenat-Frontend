import Link from 'next/link';
import { ReactNode } from 'react';

export interface SidebarItem {
  href: string;
  label: string;
  icon?: ReactNode;
}

export function Sidebar({ items }: { items: SidebarItem[] }) {
  return (
    <aside className="w-full md:w-64 md:min-h-screen border-r border-gray-200 bg-white">
      <div className="p-4 text-lg font-bold">Metsenat</div>
      <nav className="space-y-1 px-2 pb-4">
        {items.map((item) => (
          <Link key={item.href} href={item.href} className="block rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-100">
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
