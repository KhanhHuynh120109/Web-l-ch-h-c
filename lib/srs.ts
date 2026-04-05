import { ReviewAction, UserProgress } from '@/lib/types';

const actionMap: Record<ReviewAction, [number, number]> = {
  again: [1, 1.1],
  hard: [3, 1.2],
  good: [6, 1.35],
  easy: [12, 1.5],
};

export function nextProgress(current: UserProgress, action: ReviewAction): UserProgress {
  const [interval, ease] = actionMap[action];
  const now = Date.now();
  const nextReview = now + interval * 24 * 60 * 60 * 1000;
  const correct = action === 'again' ? current.correct : current.correct + 1;
  const wrong = action === 'again' ? current.wrong + 1 : current.wrong;
  const status = action === 'easy' && correct > 3 ? 'mastered' : 'review';

  return {
    ...current,
    interval,
    ease,
    next_review: nextReview,
    status,
    correct,
    wrong,
    last_reviewed: now,
  };
}
