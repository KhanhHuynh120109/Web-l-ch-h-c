'use client';

import { useEffect } from 'react';
import { useAppStore } from '@/lib/store';

export function AppHydrator() {
  const load = useAppStore((s) => s.load);

  useEffect(() => {
    load();
  }, [load]);

  return null;
}
