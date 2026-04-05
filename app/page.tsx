'use client';

import Link from 'next/link';
import { PageHeader } from '@/components/page-header';
import { useAppStore, useDueWords } from '@/lib/store';

export default function HomePage() {
  const streak = useAppStore((s) => s.streak);
  const words = useAppStore((s) => s.words);
  const progress = useAppStore((s) => s.progress);
  const dueWords = useDueWords();

  const learned = Object.values(progress).filter((item) => item.correct > 0).length;
  const accuracy = Object.values(progress).reduce(
    (acc, p) => {
      acc.correct += p.correct;
      acc.wrong += p.wrong;
      return acc;
    },
    { correct: 0, wrong: 0 },
  );

  const ratio = accuracy.correct + accuracy.wrong === 0 ? 0 : Math.round((accuracy.correct / (accuracy.correct + accuracy.wrong)) * 100);

  return (
    <div>
      <PageHeader title="PhraseFlow" subtitle="Learn Oxford 3000 by chunks" />
      <section className="card mb-4 grid grid-cols-3 gap-3 text-center">
        <div>
          <p className="text-xs text-slate-500">Today</p>
          <p className="text-xl font-semibold">{dueWords.length}</p>
        </div>
        <div>
          <p className="text-xs text-slate-500">Streak</p>
          <p className="text-xl font-semibold">🔥 {streak}</p>
        </div>
        <div>
          <p className="text-xs text-slate-500">Accuracy</p>
          <p className="text-xl font-semibold">{ratio}%</p>
        </div>
      </section>

      <section className="card mb-4">
        <h2 className="mb-2 text-sm font-semibold">Today learning plan</h2>
        <p className="text-sm text-slate-600 dark:text-slate-300">{learned}/{words.length} words touched.</p>
        <div className="mt-3 h-2 rounded-full bg-slate-200 dark:bg-slate-800">
          <div className="h-2 rounded-full bg-brand-500" style={{ width: `${(learned / words.length) * 100}%` }} />
        </div>
      </section>

      <div className="grid grid-cols-2 gap-3">
        <Link href="/learn" className="card text-center text-sm font-semibold">Learn new</Link>
        <Link href="/review" className="card text-center text-sm font-semibold">Review now</Link>
        <Link href="/topics" className="card text-center text-sm font-semibold">Topics</Link>
        <Link href="/context" className="card text-center text-sm font-semibold">Context mode</Link>
      </div>
    </div>
  );
}
