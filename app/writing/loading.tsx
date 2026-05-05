// app/writing/loading.tsx
import { Skeleton } from '../components/LoadingSkeleton'

export default function WritingLoading() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-20">
      <Skeleton className="h-3 w-16 mb-3" />
      <Skeleton className="h-10 w-32 mb-4" />
      <Skeleton className="h-4 w-80 mb-12" />
      <div className="flex flex-col divide-y divide-zinc-800">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex flex-col gap-3 py-8">
            <div className="flex items-start justify-between">
              <Skeleton className="h-5 w-2/3" />
              <Skeleton className="h-3 w-20" />
            </div>
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-3 w-24 mt-1" />
          </div>
        ))}
      </div>
    </main>
  )
}