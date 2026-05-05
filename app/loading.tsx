// app/loading.tsx
import { Skeleton } from './components/LoadingSkeleton'

export default function Loading() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-20">
      <Skeleton className="h-4 w-20 mb-4" />
      <Skeleton className="h-10 w-64 mb-4" />
      <Skeleton className="h-4 w-96 mb-12" />
      <div className="flex flex-col gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex flex-col gap-3 py-8 border-b border-zinc-800">
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        ))}
      </div>
    </main>
  )
}