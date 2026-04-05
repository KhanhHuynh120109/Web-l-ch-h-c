import type { Metadata } from 'next';
import './globals.css';
import { BottomNav } from '@/components/bottom-nav';
import { AppHydrator } from '@/components/hydrator';
import { PwaRegister } from '@/components/pwa-register';

export const metadata: Metadata = {
  title: 'PhraseFlow',
  description: 'Learn Oxford words by phrase chunks and context',
  manifest: '/manifest.json',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="mx-auto min-h-screen max-w-md pb-20">
        <AppHydrator />
        <PwaRegister />
        <main className="px-4 py-4">{children}</main>
        <BottomNav />
      </body>
    </html>
  );
}
