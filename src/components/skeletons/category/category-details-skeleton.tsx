 export default function CategoryDetailsSkeleton() {
  return (
    <div className="mx-auto max-w-3xl p-4">
      <div className="h-56 w-full animate-pulse rounded-2xl bg-zinc-200 dark:bg-zinc-800" />
      <div className="mt-4 space-y-2">
        <div className="h-6 w-1/2 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
        <div className="h-4 w-1/3 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
      </div>
    </div>
  );
}
