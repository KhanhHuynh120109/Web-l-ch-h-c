export type CEFR = 'A1' | 'A2' | 'B1' | 'B2';

export type Word = {
  id: string;
  word: string;
  phonetic: string;
  pos: string;
  level: CEFR;
  meaning_vi: string;
  topics: string[];
  contexts: string[];
  collocations: string[];
  examples: string[];
  notes?: string;
  confusions?: string[];
  audio_url?: string;
};

export type ProgressStatus = 'new' | 'learning' | 'review' | 'mastered';

export type UserProgress = {
  word_id: string;
  status: ProgressStatus;
  interval: number;
  ease: number;
  next_review: number;
  correct: number;
  wrong: number;
  favorite?: boolean;
  last_reviewed?: number;
};

export type ReviewAction = 'again' | 'hard' | 'good' | 'easy';
