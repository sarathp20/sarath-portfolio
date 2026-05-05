// app/admin/writings/loading.tsx
import { Skeleton } from '../../components/LoadingSkeleton'

export default function AdminWritingsLoading() {
  return (
    <div className="min-h-screen bg-zinc-950 flex">

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

      <main className="flex-1 flex flex-col">
        <header className="border-b border-zinc-800 px-8 py-5">
          <Skeleton className="h-3 w-32 mb-2" />
          <Skeleton className="h-6 w-32" />
        </header>
        <div className="px-8 py-8">
          <div className="grid grid-cols-3 gap-4 mb-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-zinc-900 border border-zinc-800 rounded-xl px-5 py-4">
                <Skeleton className="h-8 w-8 mb-2" />
                <Skeleton className="h-3 w-20" />
              </div>
            ))}
          </div>
          <div className="border border-zinc-800 rounded-xl overflow-hidden">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="grid grid-cols-4 gap-4 px-6 py-4 border-b border-zinc-800 bg-zinc-900">
                <Skeleton className="h-4 w-full col-span-2" />
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-12" />
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}