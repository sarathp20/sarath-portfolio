// app/writings/[slug]/loading.tsx
import { Skeleton } from '../../components/LoadingSkeleton'

export default function PostLoading() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-20">
      <Skeleton className="h-3 w-24 mb-8" />
      <Skeleton className="h-3 w-20 mb-4" />
      <Skeleton className="h-12 w-full mb-3" />
      <Skeleton className="h-12 w-3/4 mb-4" />
      <Skeleton className="h-5 w-full mb-2" />
      <Skeleton className="h-5 w-5/6 mb-8" />
      <div className="h-px bg-zinc-800 mb-10" />
      <div className="flex flex-col gap-4">
        {[...Array(8)].map((_, i) => (
          <Skeleton key={i} className={`h-4 ${i % 3 === 2 ? 'w-2/3' : 'w-full'}`} />
        ))}
      </div>
    </main>
  )
}