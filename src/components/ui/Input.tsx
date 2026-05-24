import { InputHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

/**
 * A styled text input that merges the design-system base classes with any
 * additional `className` provided by the caller.
 *
 * Forwards all native `<input>` attributes to the underlying element.
 */
export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={cn(
        'w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 placeholder-gray-400 outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20',
        props.className
      )}
    />
  );
}
