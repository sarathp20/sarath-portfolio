// app/admin/writing/page.tsx
import { prisma }       from '@/lib/prisma'
import { auth }         from '@/auth'
import { redirect }     from 'next/navigation'
import Link             from 'next/link'
import AdminSidebar     from '../_components/AdminSidebar'
import { signOut }      from '@/auth'

export default async function AdminWriting() {
  const session = await auth()
  if (!session) redirect('/admin')

  const [posts, contacts] = await Promise.all([
    prisma.post.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id:        true,
        title:     true,
        slug:      true,
        published: true,
        createdAt: true,
      },
    }),
    prisma.contact.findMany({ select: { id: true, read: true } }),
  ])

  const unread = contacts.filter(c => !c.read).length

  return (
    <div className="min-h-screen bg-zinc-950 flex">

      <AdminSidebar
        activeSection="writing"
        unread={unread}
        postCount={posts.length}
      />

      <main className="flex-1 flex flex-col min-w-0">

        {/* Top bar */}
        <header className="border-b border-zinc-800 px-8 py-5 flex items-center justify-between shrink-0">
          <div>
            <p className="font-mono text-xs text-zinc-500 uppercase tracking-widest">
              admin dashboard
            </p>
            <h1 className="text-xl font-bold text-zinc-100 mt-0.5">
              Writing
            </h1>
          </div>
          <Link
            href="/admin/writing/new"
            className="rounded bg-amber-400 px-4 py-2 text-sm font-semibold text-zinc-950 hover:bg-amber-300 transition-colors"
          >
            New post +
          </Link>
        </header>

        {/* Content */}
        <div className="flex-1 px-8 py-8 overflow-auto">

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            {[
              { label: 'Total posts',  value: posts.length },
              { label: 'Published',    value: posts.filter(p => p.published).length },
              { label: 'Drafts',       value: posts.filter(p => !p.published).length },
            ].map(stat => (
              <div key={stat.label} className="bg-zinc-900 border border-zinc-800 rounded-xl px-5 py-4">
                <p className="text-2xl font-bold font-mono text-zinc-100">{stat.value}</p>
                <p className="text-xs text-zinc-500 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Posts list */}
          <div className="border border-zinc-800 rounded-xl overflow-hidden">
            {posts.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-zinc-500 text-sm font-mono mb-4">No posts yet</p>
                <Link
                  href="/admin/writing/new"
                  className="text-xs font-mono text-amber-400 hover:text-amber-300 transition-colors"
                >
                  Write your first post →
                </Link>
              </div>
            ) : (
              <div className="flex flex-col divide-y divide-zinc-800">
                {/* Table header */}
                <div className="grid grid-cols-[1fr_100px_80px_80px] gap-4 px-6 py-3 bg-zinc-900/50">
                  <span className="text-xs font-mono text-zinc-600 uppercase tracking-widest">Title</span>
                  <span className="text-xs font-mono text-zinc-600 uppercase tracking-widest">Date</span>
                  <span className="text-xs font-mono text-zinc-600 uppercase tracking-widest">Status</span>
                  <span className="text-xs font-mono text-zinc-600 uppercase tracking-widest">Action</span>
                </div>

                {/* Rows */}
                {posts.map(post => (
                  <div
                    key={post.id}
                    className="grid grid-cols-[1fr_100px_80px_80px] gap-4 px-6 py-4 bg-zinc-900 hover:bg-zinc-800/40 transition-colors items-center"
                  >
                    <div className="flex flex-col gap-0.5 min-w-0">
                      <span className="text-sm font-medium text-zinc-100 truncate">
                        {post.title}
                      </span>
                      <span className="text-xs font-mono text-zinc-600 truncate">
                        /writing/{post.slug}
                      </span>
                    </div>

                    <span className="text-xs font-mono text-zinc-500">
                      {new Date(post.createdAt).toISOString().slice(0, 10)}
                    </span>

                    <span className={`text-xs font-mono px-2 py-1 rounded border w-fit ${
                      post.published
                        ? 'bg-emerald-400/10 text-emerald-400 border-emerald-400/20'
                        : 'bg-zinc-800 text-zinc-500 border-zinc-700'
                    }`}>
                      {post.published ? 'Live' : 'Draft'}
                    </span>

                    <Link
                      href={`/admin/writing/${post.id}`}
                      className="text-xs font-mono text-zinc-500 hover:text-amber-400 transition-colors"
                    >
                      Edit →
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </main>
    </div>
  )
}