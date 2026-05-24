import { Sidebar as UISidebar } from '@/components/ui/Sidebar';
import {
  LayoutDashboard,
  Users,
  FileText,
  Banknote,
  Building2,
  CreditCard,
} from 'lucide-react';

/** Navigation items rendered in the dashboard sidebar. */
const items = [
  { href: '/dashboard', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
  { href: '/users', label: 'Users', icon: <Users size={18} /> },
  { href: '/appeals', label: 'Appeals', icon: <FileText size={18} /> },
  { href: '/sponsors', label: 'Sponsors', icon: <Banknote size={18} /> },
  { href: '/universities', label: 'Universities', icon: <Building2 size={18} /> },
  { href: '/payment-methods', label: 'Payment Methods', icon: <CreditCard size={18} /> },
];

/**
 * Dashboard-specific sidebar that pre-configures the generic {@link UISidebar}
 * with the application's navigation items.
 */
export function Sidebar() {
  return <UISidebar items={items} />;
}
