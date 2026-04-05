'use client';

import { useMemo, useState } from 'react';
import { PageHeader } from '@/components/page-header';
import { useWordSearch } from '@/hooks/use-word-filters';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [level, setLevel] = useState('');
  const [topic, setTopic] = useState('');

  const result = useWordSearch(query, level || undefined, topic || undefined);
  const topics = useMemo(() => Array.from(new Set(result.flatMap((word) => word.topics))), [result]);

  return (
    <div>
      <PageHeader title="Dictionary" subtitle="Fuzzy search + filters" />
      <div className="card mb-4 space-y-2">
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search word, phrase..." className="w-full rounded-lg border p-3 text-sm dark:border-slate-700 dark:bg-slate-900" />
        <div className="grid grid-cols-2 gap-2">
          <select value={level} onChange={(e) => setLevel(e.target.value)} className="rounded-lg border p-2 text-sm dark:border-slate-700 dark:bg-slate-900">
            <option value="">All levels</option>
            {['A1', 'A2', 'B1', 'B2'].map((item) => <option key={item}>{item}</option>)}
          </select>
          <select value={topic} onChange={(e) => setTopic(e.target.value)} className="rounded-lg border p-2 text-sm dark:border-slate-700 dark:bg-slate-900">
            <option value="">All topics</option>
            {topics.map((item) => <option key={item}>{item}</option>)}
          </select>
        </div>
      </div>

      <div className="space-y-3">
        {result.slice(0, 20).map((word) => (
          <article key={word.id} className="card">
            <h2 className="font-semibold">{word.word} <span className="text-xs text-slate-500">({word.level})</span></h2>
            <p className="text-sm text-slate-600 dark:text-slate-300">{word.meaning_vi}</p>
            <p className="mt-1 text-xs text-brand-600">{word.collocations.join(' • ')}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
