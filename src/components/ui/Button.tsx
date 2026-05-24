import { ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

/** Props accepted by the Button component, extending native button attributes. */
type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  /** Visual style variant. Defaults to `"primary"`. */
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  /** Size preset. Defaults to `"md"`. */
  size?: 'sm' | 'md';
};

/**
 * A styled button component with multiple visual variants and sizes.
 *
 * Forwards all native `<button>` attributes to the underlying element.
 *
 * @param variant  - `"primary"` | `"secondary"` | `"danger"` | `"ghost"`. Default `"primary"`.
 * @param size     - `"md"` | `"sm"`. Default `"md"`.
 * @param className - Additional Tailwind classes merged onto the root element.
 */
export function Button({ className, variant = 'primary', size = 'md', ...props }: Props) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-lg font-medium transition disabled:opacity-50 focus:outline-none',
        size === 'md' && 'px-4 py-2 text-sm',
        size === 'sm' && 'px-3 py-1.5 text-xs',
        variant === 'primary' && 'bg-brand text-white hover:bg-brand-dark shadow-sm',
        variant === 'secondary' && 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50',
        variant === 'danger' && 'bg-red-500 text-white hover:bg-red-600',
        variant === 'ghost' && 'text-gray-600 hover:bg-gray-100',
        className
      )}
      {...props}
    />
  );
}
