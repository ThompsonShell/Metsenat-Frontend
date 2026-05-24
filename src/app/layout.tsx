import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Metsenat Admin',
  description: 'Admin frontend for the Metsenat backend API',
};

/**
 * Root layout applied to every page in the application.
 * Sets the HTML language attribute and applies the global stylesheet.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
