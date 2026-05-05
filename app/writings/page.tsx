// app/writings/page.tsx
import { prisma } from '@/lib/prisma'
import Link      from 'next/link'
import type { Metadata } from 'next'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Writings — Sarath P',
  description: 'Technical writing on React, Next.js, TypeScript, and full stack development.',
}

export default async function Writings() {
  const posts = await prisma.post.findMany({
    where:   { published: true },       // only show published posts
    orderBy: { publishedAt: 'desc' },   // newest first
    select: {
      id:          true,
      title:       true,
      slug:        true,
      excerpt:     true,
      publishedAt: true,
    },
  })

  return (
    <main className="mx-auto max-w-5xl px-6 py-20">
      <p className="font-mono text-sm text-amber-400">06. writings</p>
      <h1 className="mt-2 text-4xl font-bold text-zinc-100">Writings</h1>
      <p className="mt-4 max-w-xl text-base leading-relaxed text-zinc-500">
        Technical writing on React, Next.js, TypeScript, and full stack development.
      </p>

      <div className="mt-12 flex flex-col divide-y divide-zinc-800">
        {posts.length === 0 ? (
          <p className="text-zinc-500 text-sm py-12 text-center font-mono">
            No posts yet — check back soon.
          </p>
        ) : (
          posts.map(post => (
            <Link
              key={post.id}
              href={`/writings/${post.slug}`}
              className="group flex flex-col gap-2 py-8 hover:opacity-80 transition-opacity"
            >
              <div className="flex items-start justify-between gap-4">
                <h2 className="text-lg font-semibold text-zinc-100 group-hover:text-amber-400 transition-colors">
                  {post.title}
                </h2>
                <span className="text-xs font-mono text-zinc-500 shrink-0 mt-1">
                  {post.publishedAt
                    ? new Date(post.publishedAt).toISOString().slice(0, 10)
                    : ''}
                </span>
              </div>
              <p className="text-sm text-zinc-400 leading-relaxed">
                {post.excerpt}
              </p>
              <span className="text-xs font-mono text-amber-400 mt-1">
                Read more →
              </span>
            </Link>
          ))
        )}
      </div>
    </main>
  )
}