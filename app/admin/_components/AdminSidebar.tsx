// app/admin/_components/AdminSidebar.tsx
import Link  from 'next/link'
import { signOut } from '@/auth'

interface Props {
  activeSection: 'messages' | 'writings'
  unread?: number
  postCount?: number
}

export default function AdminSidebar({ activeSection, unread = 0, postCount = 0 }: Props) {
  return (
    <aside className="w-60 shrink-0 border-r border-zinc-800 flex flex-col">
      <div className="px-6 py-6 border-b border-zinc-800">
        <Link href="/" className="font-mono text-sm font-medium text-zinc-100 hover:text-amber-400 transition-colors">
          ← sarath.dev
        </Link>
        <p className="text-xs text-zinc-600 font-mono mt-1">admin panel</p>
      </div>

      <nav className="flex flex-col gap-1 px-3 py-4 flex-1">
        <p className="text-xs font-mono text-zinc-600 px-3 pb-2 uppercase tracking-widest">
          Sections
        </p>
        <Link
          href="/admin/dashboard"
          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
            activeSection === 'messages'
              ? 'bg-zinc-800 text-zinc-100'
              : 'text-zinc-400 hover:bg-zinc-800/60 hover:text-zinc-100'
          }`}
        >
          <span className="text-base">✉️</span>
          Messages
          {unread > 0 && (
            <span className="ml-auto text-xs font-mono bg-amber-400 text-zinc-950 px-1.5 py-0.5 rounded font-semibold">
              {unread}
            </span>
          )}
        </Link>
        <Link
          href="/admin/writings"
          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
            activeSection === 'writings'
              ? 'bg-zinc-800 text-zinc-100'
              : 'text-zinc-400 hover:bg-zinc-800/60 hover:text-zinc-100'
          }`}
        >
          <span className="text-base">✍️</span>
          Writings
          <span className="ml-auto text-xs font-mono text-zinc-600">
            {postCount}
          </span>
        </Link>
      </nav>

      <div className="px-3 py-4 border-t border-zinc-800">
        <div className="flex items-center gap-3 px-3 py-2 mb-1">
          <div className="w-7 h-7 rounded-full bg-amber-400 flex items-center justify-center text-xs font-bold text-zinc-950">
            S
          </div>
          <div>
            <p className="text-xs font-medium text-zinc-200">Sarath P</p>
            <p className="text-xs text-zinc-600 font-mono">Admin</p>
          </div>
        </div>
        <form action={async () => {
          'use server'
          await signOut({ redirectTo: '/admin' })
        }}>
          <button
            type="submit"
            className="w-full text-left text-xs font-mono text-zinc-500 hover:text-red-400 px-3 py-2 rounded-lg hover:bg-zinc-800/60 transition-colors cursor-pointer"
          >
            Sign out →
          </button>
        </form>
      </div>
    </aside>
  )
}