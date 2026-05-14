import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Metsenat Frontend',
  description: 'Metsenat backend API uchun admin frontend',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uz">
      <body className="bg-gray-50 text-gray-900 antialiased">{children}</body>
    </html>
  );
}
