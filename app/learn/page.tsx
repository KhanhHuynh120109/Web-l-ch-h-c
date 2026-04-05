'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { PageHeader } from '@/components/page-header';
import { WordCard } from '@/components/word-card';
import { ReviewActions } from '@/components/review-actions';
import { useAppStore } from '@/lib/store';

export default function LearnPage() {
  const words = useAppStore((s) => s.words);
  const reviewWord = useAppStore((s) => s.reviewWord);
  const [index, setIndex] = useState(0);

  const word = words[index];

  if (!word) {
    return (
      <div>
        <PageHeader title="Learn" subtitle="You finished this micro session" />
        <div className="card">Great job. Move to review mode.</div>
      </div>
    );
  }

  return (
    <div>
      <PageHeader title="Learn mode" subtitle="Word → collocations → examples" />
      <AnimatePresence mode="wait">
        <motion.div key={word.id} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }}>
          <WordCard word={word} />
        </motion.div>
      </AnimatePresence>
      <ReviewActions
        onSelect={(action) => {
          reviewWord(word.id, action);
          setIndex((v) => v + 1);
        }}
      />
    </div>
  );
}
