// app/admin/writings/[id]/page.tsx
import { auth }     from '@/auth'
import { prisma }   from '@/lib/prisma'
import { redirect, notFound } from 'next/navigation'
import PostEditor   from '../_components/PostEditor'

type Props = { params: Promise<{ id: string }> }

export default async function EditPost({ params }: Props) {
  const session = await auth()
  if (!session) redirect('/admin')

  const { id } = await params

  const post = await prisma.post.findUnique({ where: { id } })
  if (!post) notFound()

  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-12">
      <div className="mx-auto max-w-4xl">
        <p className="font-mono text-sm text-amber-400 mb-2">admin / writings</p>
        <h1 className="text-3xl font-bold text-zinc-100 mb-8">Edit post</h1>
        <PostEditor initialData={{
          id:        post.id,
          title:     post.title,
          slug:      post.slug,
          excerpt:   post.excerpt,
          content:   post.content,
          published: post.published,
        }} />
      </div>
    </main>
  )
}