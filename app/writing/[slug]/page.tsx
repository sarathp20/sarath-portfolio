// app/writing/[slug]/page.tsx
import { prisma }           from '@/lib/prisma'
import { MDXRemote }        from 'next-mdx-remote/rsc'
import { notFound }         from 'next/navigation'
import type { Metadata }    from 'next'
import Link                 from 'next/link'

type Props = { params: Promise<{ slug: string }> }

// Generate metadata per post — critical for SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await prisma.post.findUnique({ where: { slug } })
  if (!post) return {}

  return {
    title:       `${post.title} — Sarath P`,
    description: post.excerpt,
    openGraph: {
      title:       post.title,
      description: post.excerpt,
      type:        'article',
      publishedTime: post.publishedAt?.toISOString(),
    },
  }
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params

  const post = await prisma.post.findUnique({
    where: { slug, published: true },
  })

  if (!post) notFound()

  return (
    <main className="mx-auto max-w-3xl px-6 py-20">

      {/* Back link */}
      <Link
        href="/writing"
        className="font-mono text-xs text-zinc-500 hover:text-amber-400 transition-colors"
      >
        ← Back to writing
      </Link>

      {/* Post header */}
      <div className="mt-8 mb-12">
        <p className="font-mono text-xs text-zinc-500 mb-4">
          {post.publishedAt
            ? new Date(post.publishedAt).toISOString().slice(0, 10)
            : ''}
        </p>
        <h1 className="text-4xl font-bold text-zinc-100 leading-tight">
          {post.title}
        </h1>
        <p className="mt-4 text-lg text-zinc-400 leading-relaxed">
          {post.excerpt}
        </p>
        <div className="mt-6 h-px bg-zinc-800" />
      </div>

      {/* Post content — rendered from markdown */}
      <article className="prose prose-invert prose-amber max-w-none
        prose-headings:text-zinc-100
        prose-p:text-zinc-400
        prose-a:text-amber-400
        prose-strong:text-zinc-100
        prose-code:text-amber-400
        prose-pre:bg-zinc-900
        prose-pre:border
        prose-pre:border-zinc-800"
      >
        <MDXRemote source={post.content} />
      </article>

    </main>
  )
}