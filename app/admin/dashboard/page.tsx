// app/admin/dashboard/page.tsx
import { auth }          from '@/auth'
import { prisma }        from '@/lib/prisma'
import { signOut }       from '@/auth'
import { redirect }      from 'next/navigation'
import ContactsTable     from './_components/ContactsTable'
import Link              from 'next/link'

export default async function Dashboard() {
  const session = await auth()
  if (!session) redirect('/admin')

  const [contacts, posts] = await Promise.all([
    prisma.contact.findMany({ orderBy: { createdAt: 'desc' } }),
    prisma.post.findMany({
      orderBy: { createdAt: 'desc' },
      select: { id: true, published: true },
    }),
  ])

  const unread    = contacts.filter(c => !c.read).length
  const published = posts.filter(p => p.published).length
  const drafts    = posts.filter(p => !p.published).length

  return (
    <div className="min-h-screen bg-zinc-950 flex">

      {/* ── Sidebar ── */}
      <aside className="w-60 shrink-0 border-r border-zinc-800 flex flex-col">

        {/* Logo */}
        <div className="px-6 py-6 border-b border-zinc-800">
          <Link href="/" className="font-mono text-sm font-medium text-zinc-100 hover:text-amber-400 transition-colors">
            ← sarath.dev
          </Link>
          <p className="text-xs text-zinc-600 font-mono mt-1">admin panel</p>
        </div>

        {/* Nav */}
        <nav className="flex flex-col gap-1 px-3 py-4 flex-1">
          <p className="text-xs font-mono text-zinc-600 px-3 pb-2 uppercase tracking-widest">
            Sections
          </p>
          <Link
            href="/admin/dashboard"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-zinc-800 text-zinc-100 text-sm font-medium"
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
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-zinc-400 hover:bg-zinc-800/60 hover:text-zinc-100 text-sm font-medium transition-colors"
          >
            <span className="text-base">✍️</span>
            Writings
            <span className="ml-auto text-xs font-mono text-zinc-600">
              {posts.length}
            </span>
          </Link>
        </nav>

        {/* User + sign out */}
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

      {/* ── Main content ── */}
      <main className="flex-1 flex flex-col min-w-0">

        {/* Top bar */}
        <header className="border-b border-zinc-800 px-8 py-5 flex items-center justify-between shrink-0">
          <div>
            <p className="font-mono text-xs text-zinc-500 uppercase tracking-widest">
              admin dashboard
            </p>
            <h1 className="text-xl font-bold text-zinc-100 mt-0.5">
              Messages
            </h1>
          </div>
          <time className="text-xs font-mono text-zinc-600">
            {new Date().toISOString().slice(0, 10)}
          </time>
        </header>

        <div className="flex-1 px-8 py-8 overflow-auto">

          {/* Stats row */}
          <div className="grid grid-cols-4 gap-4 mb-8">
            {[
              { label: 'Total messages', value: contacts.length,  color: 'text-zinc-100' },
              { label: 'Unread',         value: unread,           color: 'text-amber-400' },
              { label: 'Posts published',value: published,        color: 'text-emerald-400' },
              { label: 'Drafts',         value: drafts,           color: 'text-zinc-400' },
            ].map(stat => (
              <div
                key={stat.label}
                className="bg-zinc-900 border border-zinc-800 rounded-xl px-5 py-4"
              >
                <p className={`text-2xl font-bold font-mono ${stat.color}`}>
                  {stat.value}
                </p>
                <p className="text-xs text-zinc-500 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Contacts */}
          <ContactsTable contacts={contacts} />

        </div>
      </main>
    </div>
  )
}