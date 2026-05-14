import { ReactNode } from 'react';

export function Table({ children }: { children: ReactNode }) {
  return <table className="min-w-full divide-y divide-gray-200 text-sm">{children}</table>;
}

export function THead({ children }: { children: ReactNode }) {
  return <thead className="bg-gray-50">{children}</thead>;
}

export function TBody({ children }: { children: ReactNode }) {
  return <tbody className="divide-y divide-gray-200 bg-white">{children}</tbody>;
}
