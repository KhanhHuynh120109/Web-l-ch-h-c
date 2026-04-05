'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BookOpen, ChartColumnBig, House, Search, SquareStack } from 'lucide-react';

const items = [
  { href: '/', label: 'Home', icon: House },
  { href: '/learn', label: 'Learn', icon: BookOpen },
  { href: '/review', label: 'Review', icon: SquareStack },
  { href: '/search', label: 'Search', icon: Search },
  { href: '/progress', label: 'Progress', icon: ChartColumnBig },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 mx-auto flex max-w-md items-center justify-around border-t border-slate-200 bg-white px-2 py-2 dark:border-slate-800 dark:bg-slate-950">
      {items.map((item) => {
        const active = pathname === item.href;
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex min-w-14 flex-col items-center rounded-lg p-2 text-xs ${
              active ? 'text-brand-600' : 'text-slate-500'
            }`}
          >
            <Icon className="mb-1 h-5 w-5" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
