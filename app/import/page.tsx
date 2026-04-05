'use client';

import { ChangeEvent, useState } from 'react';
import { PageHeader } from '@/components/page-header';
import { parseWordsFromCsv, parseWordsFromJson } from '@/lib/data-import';
import { useAppStore } from '@/lib/store';

export default function ImportPage() {
  const importWords = useAppStore((s) => s.importWords);
  const [message, setMessage] = useState('Upload Oxford JSON/CSV to replace demo set.');

  const handleUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const text = await file.text();

    try {
      const words = file.name.endsWith('.csv') ? parseWordsFromCsv(text) : parseWordsFromJson(text);
      if (!words.length) throw new Error('No valid words found');
      importWords(words);
      setMessage(`Imported ${words.length} words successfully.`);
    } catch (error) {
      setMessage(`Import failed: ${(error as Error).message}`);
    }
  };

  return (
    <div>
      <PageHeader title="Data import" subtitle="JSON and CSV supported" />
      <section className="card space-y-3">
        <input type="file" accept=".json,.csv" onChange={handleUpload} className="block w-full text-sm" />
        <p className="text-sm text-slate-600 dark:text-slate-300">{message}</p>
      </section>
    </div>
  );
}
