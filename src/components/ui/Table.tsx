import { ReactNode } from 'react';

/**
 * Renders a full-width `<table>` with a fixed minimum width to support
 * horizontal scrolling within an `overflow-auto` container.
 */
export function Table({ children }: { children: ReactNode }) {
  return <table className="min-w-full text-sm">{children}</table>;
}

/**
 * Renders a `<thead>` with the standard page-background colour and a bottom border.
 * Place `<tr>` and `<th>` elements directly inside.
 */
export function THead({ children }: { children: ReactNode }) {
  return <thead className="bg-page border-b border-gray-100">{children}</thead>;
}

/**
 * Renders a `<tbody>` with a white background and dividers between rows.
 * Place `<tr>` elements directly inside.
 */
export function TBody({ children }: { children: ReactNode }) {
  return <tbody className="divide-y divide-gray-50 bg-white">{children}</tbody>;
}
