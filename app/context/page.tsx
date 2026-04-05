'use client';

import { PageHeader } from '@/components/page-header';
import { useAppStore } from '@/lib/store';

export default function ContextPage() {
  const words = useAppStore((s) => s.words);
  const map = new Map<string, typeof words>();

  words.forEach((word) => {
    word.contexts.forEach((context) => {
      const entry = map.get(context) ?? [];
      entry.push(word);
      map.set(context, entry);
    });
  });

  return (
    <div>
      <PageHeader title="Context learning" subtitle="Scenario-based chunks" />
      <div className="space-y-3">
        {Array.from(map.entries()).map(([context, group]) => (
          <section key={context} className="card">
            <h2 className="mb-2 font-semibold">{context}</h2>
            <ul className="space-y-1 text-sm">
              {group.slice(0, 4).map((word) => (
                <li key={word.id}><span className="font-medium">{word.word}:</span> {word.collocations[0]}</li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
