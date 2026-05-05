// app/projects/loading.tsx
import { Skeleton } from '../components/LoadingSkeleton'

export default function ProjectsLoading() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-20">
      <Skeleton className="h-3 w-16 mb-3" />
      <Skeleton className="h-10 w-40 mb-4" />
      <Skeleton className="h-4 w-80 mb-10" />

      {/* Tab skeleton */}
      <div className="grid grid-cols-2 mb-10 border border-zinc-800 rounded-xl overflow-hidden">
        <div className="px-8 py-5 bg-zinc-900 border-r border-zinc-800">
          <Skeleton className="h-5 w-28 mb-2" />
          <Skeleton className="h-3 w-20" />
        </div>
        <div className="px-8 py-5">
          <Skeleton className="h-5 w-24 mb-2" />
          <Skeleton className="h-3 w-20" />
        </div>
      </div>

      {/* Cards skeleton */}
      <div className="grid grid-cols-2 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex flex-col gap-4 p-6 bg-zinc-900 rounded-xl border border-zinc-800">
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <div className="flex gap-2 mt-2">
              <Skeleton className="h-6 w-16 rounded-full" />
              <Skeleton className="h-6 w-20 rounded-full" />
              <Skeleton className="h-6 w-14 rounded-full" />
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}