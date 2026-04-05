import { Word } from '@/lib/types';

const topicPool = ['Food', 'Travel', 'Work', 'School', 'Health', 'Emotions', 'Technology'];
const contextPool = ['At restaurant', 'At airport', 'In meeting', 'At doctor', 'At school'];

export const demoWords: Word[] = Array.from({ length: 36 }).map((_, i) => {
  const idx = i + 1;
  return {
    id: `w-${idx}`,
    word: ['book', 'take', 'make', 'run', 'clear', 'order'][i % 6] + idx,
    phonetic: '/fəˈnɛtɪk/',
    pos: ['verb', 'noun', 'adjective'][i % 3],
    level: (['A1', 'A2', 'B1', 'B2'] as const)[i % 4],
    meaning_vi: `Nghĩa tiếng Việt ${idx}`,
    topics: [topicPool[i % topicPool.length]],
    contexts: [contextPool[i % contextPool.length]],
    collocations: [`common phrase ${idx}`, `natural chunk ${idx}`],
    examples: [
      `I use ${idx} in a real conversation every day.`,
      `This chunk ${idx} helps me sound natural.`,
    ],
    notes: 'Use in everyday speaking',
    confusions: ['similar word A', 'similar word B'],
  };
});
