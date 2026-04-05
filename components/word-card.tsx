'use client';

import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { Word } from '@/lib/types';
import { useAppStore } from '@/lib/store';

export function WordCard({ word }: { word: Word }) {
  const progress = useAppStore((s) => s.progress[word.id]);
  const toggleFavorite = useAppStore((s) => s.toggleFavorite);

  return (
    <motion.article className="card" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
      <div className="mb-2 flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-semibold">{word.word}</h2>
          <p className="text-sm text-slate-500">{word.phonetic}</p>
        </div>
        <button onClick={() => toggleFavorite(word.id)} aria-label="favorite" className="rounded-full p-2">
          <Heart className={`h-5 w-5 ${progress?.favorite ? 'fill-rose-500 text-rose-500' : 'text-slate-400'}`} />
        </button>
      </div>

      <p className="mb-3 text-sm">{word.meaning_vi}</p>
      <div className="mb-3 flex flex-wrap gap-2">
        {word.collocations.map((collocation) => (
          <span key={collocation} className="rounded-full bg-brand-50 px-2 py-1 text-xs text-brand-600 dark:bg-slate-800">
            {collocation}
          </span>
        ))}
      </div>

      <ul className="list-disc space-y-1 pl-5 text-sm text-slate-600 dark:text-slate-300">
        {word.examples.slice(0, 2).map((example) => (
          <li key={example}>{example}</li>
        ))}
      </ul>
    </motion.article>
  );
}
