import { Sidebar as UISidebar } from '@/components/ui/Sidebar';

const items = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/users', label: 'Users' },
  { href: '/appeals', label: 'Appeals' },
  { href: '/sponsors', label: 'Sponsors' },
  { href: '/universities', label: 'Universities' },
  { href: '/payment-methods', label: 'Payment Methods' },
];

export function Sidebar() {
  return <UISidebar items={items} />;
}
