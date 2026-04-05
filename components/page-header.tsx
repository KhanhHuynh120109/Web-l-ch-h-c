export function PageHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <header className="mb-4">
      <h1 className="text-2xl font-bold">{title}</h1>
      <p className="text-sm text-slate-500 dark:text-slate-400">{subtitle}</p>
    </header>
  );
}
