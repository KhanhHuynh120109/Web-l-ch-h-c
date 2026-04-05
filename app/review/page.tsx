'use client';

import { useMemo, useState } from 'react';
import { PageHeader } from '@/components/page-header';
import { WordCard } from '@/components/word-card';
import { ReviewActions } from '@/components/review-actions';
import { useAppStore, useDueWords } from '@/lib/store';

export default function ReviewPage() {
  const due = useDueWords();
  const reviewWord = useAppStore((s) => s.reviewWord);
  const [index, setIndex] = useState(0);

  const deck = useMemo(() => due.slice(0, 12), [due]);
  const current = deck[index];

  if (!current) {
    return (
      <div>
        <PageHeader title="Review" subtitle="Session summary" />
        <section className="card space-y-2">
          <p className="text-sm">Reviewed cards: {deck.length}</p>
          <p className="text-sm text-emerald-600">No due words left. 🎉</p>
        </section>
      </div>
    );
  }

  return (
    <div>
      <PageHeader title="Review mode" subtitle={`${deck.length - index} cards due`} />
      <WordCard word={current} />
      <ReviewActions
        onSelect={(action) => {
          reviewWord(current.id, action);
          setIndex((i) => i + 1);
        }}
      />
    </div>
  );
}
