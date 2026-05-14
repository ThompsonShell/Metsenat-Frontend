import { InputHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={cn(
        'w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-indigo-500',
        props.className
      )}
    />
  );
}
