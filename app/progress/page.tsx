'use client';

import { PageHeader } from '@/components/page-header';
import { useAppStore } from '@/lib/store';

export default function ProgressPage() {
  const progress = useAppStore((s) => s.progress);
  const words = useAppStore((s) => s.words);

  const entries = Object.values(progress);
  const learned = entries.filter((item) => item.correct > 0).length;
  const weak = words
    .filter((word) => (progress[word.id]?.wrong ?? 0) > (progress[word.id]?.correct ?? 0))
    .slice(0, 6);

  return (
    <div>
      <PageHeader title="Progress" subtitle="Track performance" />
      <section className="card mb-4 grid grid-cols-2 gap-3 text-sm">
        <div>
          <p className="text-slate-500">Words learned</p>
          <p className="text-xl font-semibold">{learned}</p>
        </div>
        <div>
          <p className="text-slate-500">Review due</p>
          <p className="text-xl font-semibold">{entries.filter((item) => item.next_review <= Date.now()).length}</p>
        </div>
      </section>

      <section className="card">
        <h2 className="mb-2 text-sm font-semibold">Weak words</h2>
        <ul className="space-y-1 text-sm">
          {weak.length === 0 && <li>None. Keep going!</li>}
          {weak.map((word) => <li key={word.id}>{word.word} · wrong {progress[word.id].wrong}</li>)}
        </ul>
      </section>
    </div>
  );
}
