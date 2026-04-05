'use client';

import { PageHeader } from '@/components/page-header';
import { useAppStore } from '@/lib/store';

export default function TopicsPage() {
  const words = useAppStore((s) => s.words);
  const progress = useAppStore((s) => s.progress);

  const map = new Map<string, { total: number; done: number }>();
  words.forEach((word) => {
    word.topics.forEach((topic) => {
      const entry = map.get(topic) ?? { total: 0, done: 0 };
      entry.total += 1;
      if ((progress[word.id]?.correct ?? 0) > 0) entry.done += 1;
      map.set(topic, entry);
    });
  });

  return (
    <div>
      <PageHeader title="Topics" subtitle="Choose your learning lane" />
      <div className="grid grid-cols-2 gap-3">
        {Array.from(map.entries()).map(([topic, value]) => (
          <article key={topic} className="card">
            <h2 className="font-semibold">{topic}</h2>
            <p className="text-sm text-slate-500">{value.done}/{value.total} learned</p>
            <div className="mt-2 h-2 rounded-full bg-slate-200 dark:bg-slate-700">
              <div className="h-2 rounded-full bg-brand-500" style={{ width: `${(value.done / value.total) * 100}%` }} />
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
