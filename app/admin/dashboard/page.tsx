// app/admin/dashboard/page.tsx
import { auth }    from '@/auth'
import { prisma }  from '@/lib/prisma'
import { signOut } from '@/auth'
import { redirect } from 'next/navigation'
import ContactsTable from './_components/ContactsTable'

export default async function Dashboard() {
  const session = await auth()
  if (!session) redirect('/admin')

  // Fetch all submissions — newest first
  const contacts = await prisma.contact.findMany({
    orderBy: { createdAt: 'desc' },
  })

  const unread = contacts.filter(c => !c.read).length

  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-12">
      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <p className="font-mono text-sm text-amber-400 mb-1">admin dashboard</p>
            <h1 className="text-3xl font-bold text-zinc-100">
              Contact submissions
            </h1>
            <p className="text-zinc-500 text-sm mt-1">
              {contacts.length} total · {' '}
              <span className="text-amber-400">{unread} unread</span>
            </p>
          </div>
          <form action={async () => {
            'use server'
            await signOut({ redirectTo: '/admin' })
          }}>
            <button
              type="submit"
              className="text-sm font-mono text-zinc-500 hover:text-zinc-300 border border-zinc-800 px-4 py-2 rounded transition-colors cursor-pointer"
            >
              Sign out
            </button>
          </form>
        </div>

        {/* Table */}
        <ContactsTable contacts={contacts} />

      </div>
    </main>
  )
}