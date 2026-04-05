# PhraseFlow – Learn Oxford 3000 by Chunks

A mobile-first PWA built with Next.js App Router, TypeScript, Tailwind, Zustand, and Fuse.js.

## Features

- Home dashboard with due count, streak, and quick actions.
- Learn mode with chunk-focused cards and SRS actions (Again / Hard / Good / Easy).
- Review mode with due-only card deck and end-session summary.
- Topic and Context pages for grouped vocabulary learning.
- Dictionary search with fuzzy matching and filters.
- Progress page with weak-word tracking.
- JSON/CSV data importer with schema normalization and fallback defaults.
- LocalStorage persistence.
- PWA manifest + basic service worker caching.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Data format

Each row should match:

```ts
{
  id: string
  word: string
  phonetic: string
  pos: string
  level: 'A1' | 'A2' | 'B1' | 'B2'
  meaning_vi: string
  topics: string[]
  contexts: string[]
  collocations: string[]
  examples: string[]
  notes?: string
  confusions?: string[]
  audio_url?: string
}
```

### CSV support

Use column names that mirror the JSON keys.
Array values can be pipe-separated (`topic1|topic2`).

## Import Oxford dataset

1. Go to `/import` in the app.
2. Upload `.json` or `.csv` file.
3. App validates and normalizes data.
4. Successfully parsed words replace the demo dataset.

## Demo data

`data/demo-words.ts` includes 36 sample entries for immediate usage.
