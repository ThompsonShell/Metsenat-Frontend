import { ReactNode } from 'react';

export function Table({ children }: { children: ReactNode }) {
  return <table className="min-w-full text-sm">{children}</table>;
}

export function THead({ children }: { children: ReactNode }) {
  return <thead className="bg-page border-b border-gray-100">{children}</thead>;
}

export function TBody({ children }: { children: ReactNode }) {
  return <tbody className="divide-y divide-gray-50 bg-white">{children}</tbody>;
}
