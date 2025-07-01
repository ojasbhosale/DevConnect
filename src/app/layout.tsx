// File: src/app/layout.tsx

import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navbar from '@/components/Navbar';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'DevConnect – Discover & Showcase Developers',
  description: 'Create and share your developer profile with the world.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Navbar />
        <main className="container mx-auto max-w-screen-xl px-4 py-8">{children}</main>
        <Toaster />
      </body>
    </html>
  );
}
