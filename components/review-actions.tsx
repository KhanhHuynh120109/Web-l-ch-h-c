'use client';

import { ReviewAction } from '@/lib/types';

const actions: { id: ReviewAction; label: string; className: string }[] = [
  { id: 'again', label: 'Again', className: 'bg-rose-100 text-rose-700' },
  { id: 'hard', label: 'Hard', className: 'bg-amber-100 text-amber-700' },
  { id: 'good', label: 'Good', className: 'bg-sky-100 text-sky-700' },
  { id: 'easy', label: 'Easy', className: 'bg-emerald-100 text-emerald-700' },
];

export function ReviewActions({ onSelect }: { onSelect: (action: ReviewAction) => void }) {
  return (
    <div className="mt-4 grid grid-cols-4 gap-2">
      {actions.map((action) => (
        <button
          key={action.id}
          onClick={() => onSelect(action.id)}
          className={`rounded-lg px-3 py-3 text-xs font-medium ${action.className}`}
        >
          {action.label}
        </button>
      ))}
    </div>
  );
}
