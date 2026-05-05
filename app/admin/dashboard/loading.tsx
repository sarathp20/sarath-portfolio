// app/admin/dashboard/loading.tsx
import { Skeleton } from '../../components/LoadingSkeleton'

export default function DashboardLoading() {
  return (
    <div className="min-h-screen bg-zinc-950 flex">

      {/* Sidebar skeleton */}
      <aside className="w-60 shrink-0 border-r border-zinc-800 flex flex-col">
        <div className="px-6 py-6 border-b border-zinc-800">
          <Skeleton className="h-4 w-28 mb-2" />
          <Skeleton className="h-3 w-20" />
        </div>
        <div className="flex flex-col gap-2 px-3 py-4">
          <Skeleton className="h-10 w-full rounded-lg" />
          <Skeleton className="h-10 w-full rounded-lg" />
        </div>
      </aside>

      {/* Main skeleton */}
      <main className="flex-1 flex flex-col">
        <header className="border-b border-zinc-800 px-8 py-5">
          <Skeleton className="h-3 w-32 mb-2" />
          <Skeleton className="h-6 w-40" />
        </header>

        <div className="px-8 py-8">
          {/* Stats */}
          <div className="grid grid-cols-4 gap-4 mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-zinc-900 border border-zinc-800 rounded-xl px-5 py-4">
                <Skeleton className="h-8 w-12 mb-2" />
                <Skeleton className="h-3 w-24" />
              </div>
            ))}
          </div>

          {/* Rows */}
          <div className="flex flex-col gap-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="bg-zinc-900 border border-zinc-800 rounded-xl px-6 py-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex flex-col gap-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                  <Skeleton className="h-3 w-20" />
                </div>
                <Skeleton className="h-3 w-full mt-3" />
                <Skeleton className="h-3 w-4/5 mt-2" />
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}