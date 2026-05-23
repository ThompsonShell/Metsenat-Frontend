import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Metsenat Admin',
  description: 'Metsenat backend API uchun admin frontend',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uz">
      <body className="antialiased">{children}</body>
    </html>
  );
}
