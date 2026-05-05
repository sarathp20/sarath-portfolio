// app/admin/writings/new/page.tsx
import { auth }    from '@/auth'
import { redirect } from 'next/navigation'
import PostEditor  from '../_components/PostEditor'

export default async function NewPost() {
  const session = await auth()
  if (!session) redirect('/admin')

  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-12">
      <div className="mx-auto max-w-4xl">
        <p className="font-mono text-sm text-amber-400 mb-2">admin / writings</p>
        <h1 className="text-3xl font-bold text-zinc-100 mb-8">New post</h1>
        <PostEditor />
      </div>
    </main>
  )
}