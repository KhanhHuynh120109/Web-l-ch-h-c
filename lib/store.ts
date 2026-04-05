'use client';

import { create } from 'zustand';
import { demoWords } from '@/data/demo-words';
import { ReviewAction, UserProgress, Word } from '@/lib/types';
import { nextProgress } from '@/lib/srs';

const STORAGE_KEY = 'phraseflow:v1';

type AppState = {
  words: Word[];
  progress: Record<string, UserProgress>;
  streak: number;
  dailyGoal: number;
  hydrated: boolean;
  importWords: (words: Word[]) => void;
  reviewWord: (id: string, action: ReviewAction) => void;
  toggleFavorite: (id: string) => void;
  load: () => void;
};

const initialProgress = Object.fromEntries(
  demoWords.map((word) => [
    word.id,
    {
      word_id: word.id,
      status: 'new',
      interval: 0,
      ease: 1.3,
      next_review: Date.now(),
      correct: 0,
      wrong: 0,
    } satisfies UserProgress,
  ]),
);

export const useAppStore = create<AppState>((set, get) => ({
  words: demoWords,
  progress: initialProgress,
  streak: 2,
  dailyGoal: 10,
  hydrated: false,
  importWords: (words) => {
    const seeded = Object.fromEntries(
      words.map((word) => [
        word.id,
        get().progress[word.id] ?? {
          word_id: word.id,
          status: 'new',
          interval: 0,
          ease: 1.3,
          next_review: Date.now(),
          correct: 0,
          wrong: 0,
        },
      ]),
    );
    set({ words, progress: seeded });
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ words, progress: seeded, streak: get().streak }));
  },
  reviewWord: (id, action) => {
    const current = get().progress[id];
    if (!current) return;
    const updated = nextProgress(current, action);
    const progress = { ...get().progress, [id]: updated };
    set({ progress, streak: action === 'again' ? get().streak : get().streak + 1 });
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ words: get().words, progress, streak: get().streak + (action === 'again' ? 0 : 1) }),
    );
  },
  toggleFavorite: (id) => {
    const current = get().progress[id];
    if (!current) return;
    const progress = { ...get().progress, [id]: { ...current, favorite: !current.favorite } };
    set({ progress });
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ words: get().words, progress, streak: get().streak }));
  },
  load: () => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      set({ hydrated: true });
      return;
    }

    try {
      const parsed = JSON.parse(raw) as Pick<AppState, 'words' | 'progress' | 'streak'>;
      set({ ...parsed, hydrated: true });
    } catch {
      set({ hydrated: true });
    }
  },
}));

export const useDueWords = () =>
  useAppStore((s) => s.words.filter((word) => (s.progress[word.id]?.next_review ?? 0) <= Date.now()));
