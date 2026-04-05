import { Word } from '@/lib/types';

function safeString(value: unknown, fallback = ''): string {
  return typeof value === 'string' ? value : fallback;
}

function safeStringArray(value: unknown): string[] {
  if (Array.isArray(value)) return value.map((item) => String(item)).filter(Boolean);
  if (typeof value === 'string') return value.split('|').map((s) => s.trim()).filter(Boolean);
  return [];
}

export function parseWordsFromJson(payload: string): Word[] {
  const parsed = JSON.parse(payload);
  const rows = Array.isArray(parsed) ? parsed : [];
  return rows.map(normalizeWord).filter((word): word is Word => Boolean(word));
}

export function parseWordsFromCsv(payload: string): Word[] {
  const [headerLine, ...lines] = payload.split(/\r?\n/).filter(Boolean);
  const headers = headerLine.split(',').map((h) => h.trim());

  return lines
    .map((line) => {
      const cols = line.split(',').map((c) => c.trim());
      const row = Object.fromEntries(headers.map((h, i) => [h, cols[i]]));
      return normalizeWord(row);
    })
    .filter((word): word is Word => Boolean(word));
}

function normalizeWord(value: unknown): Word | null {
  if (!value || typeof value !== 'object') return null;
  const row = value as Record<string, unknown>;
  const id = safeString(row.id, crypto.randomUUID());
  const word = safeString(row.word);
  if (!word) return null;

  return {
    id,
    word,
    phonetic: safeString(row.phonetic, '/.../'),
    pos: safeString(row.pos, 'word'),
    level: ['A1', 'A2', 'B1', 'B2'].includes(safeString(row.level))
      ? (row.level as Word['level'])
      : 'A1',
    meaning_vi: safeString(row.meaning_vi, 'Chưa có nghĩa'),
    topics: safeStringArray(row.topics),
    contexts: safeStringArray(row.contexts),
    collocations: safeStringArray(row.collocations),
    examples: safeStringArray(row.examples),
    notes: safeString(row.notes),
    confusions: safeStringArray(row.confusions),
    audio_url: safeString(row.audio_url),
  };
}
