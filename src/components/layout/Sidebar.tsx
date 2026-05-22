import { Sidebar as UISidebar } from '@/components/ui/Sidebar';
import {
  LayoutDashboard,
  Users,
  FileText,
  Banknote,
  Building2,
  CreditCard,
} from 'lucide-react';

const items = [
  { href: '/dashboard', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
  { href: '/users', label: 'Foydalanuvchilar', icon: <Users size={18} /> },
  { href: '/appeals', label: 'Arizalar', icon: <FileText size={18} /> },
  { href: '/sponsors', label: 'Sponsorlar', icon: <Banknote size={18} /> },
  { href: '/universities', label: 'Universitetlar', icon: <Building2 size={18} /> },
  { href: '/payment-methods', label: "To'lov usullari", icon: <CreditCard size={18} /> },
];

export function Sidebar() {
  return <UISidebar items={items} />;
}
