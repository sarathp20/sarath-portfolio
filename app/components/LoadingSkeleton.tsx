// components/LoadingSkeleton.tsx

// Animated pulse block — reusable building block
export function Skeleton({ className }: { className?: string }) {
  return (
    <div className={`animate-pulse rounded bg-zinc-800 ${className}`} />
  )
}