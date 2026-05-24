'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

/** Describes a single navigation item rendered in the sidebar. */
export interface SidebarItem {
  /** The target URL for this navigation link. */
  href: string;
  /** Human-readable label displayed next to the icon. */
  label: string;
  /** Optional icon element rendered before the label. */
  icon?: ReactNode;
}

/**
 * A vertical navigation sidebar.
 *
 * Highlights the active link by comparing the current pathname against each
 * item's `href`. Any `href` other than `/dashboard` is matched as a prefix so
 * that nested routes (e.g. `/appeals/123`) keep the parent item highlighted.
 *
 * @param items - Navigation items to render.
 * @param logo  - Optional custom logo node; falls back to the default "M" brand mark.
 */
export function Sidebar({ items, logo }: { items: SidebarItem[]; logo?: ReactNode }) {
  const pathname = usePathname();

  return (
    <aside className="flex w-64 flex-col border-r border-gray-100 bg-white min-h-screen shrink-0">
      <div className="flex items-center gap-2 px-5 py-5 border-b border-gray-100">
        {logo ?? (
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand text-white font-bold text-sm">M</div>
            <span className="text-base font-bold text-gray-900">Metsenat</span>
          </div>
        )}
      </div>
      <nav className="flex-1 space-y-0.5 px-3 py-4">
        {items.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-brand-light text-brand'
                  : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
              )}
            >
              {item.icon && (
                <span className={cn('shrink-0', isActive ? 'text-brand' : 'text-gray-400')}>
                  {item.icon}
                </span>
              )}
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
