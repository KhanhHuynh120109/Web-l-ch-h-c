'use client';

import { useMemo } from 'react';
import Fuse from 'fuse.js';
import { useAppStore } from '@/lib/store';

export function useWordSearch(query: string, level?: string, topic?: string) {
  const words = useAppStore((s) => s.words);

  return useMemo(() => {
    let filtered = words;
    if (level) filtered = filtered.filter((word) => word.level === level);
    if (topic) filtered = filtered.filter((word) => word.topics.includes(topic));

    if (!query.trim()) return filtered;
    const fuse = new Fuse(filtered, {
      keys: ['word', 'meaning_vi', 'collocations', 'examples'],
      threshold: 0.4,
    });

    return fuse.search(query).map((item) => item.item);
  }, [words, query, level, topic]);
}
