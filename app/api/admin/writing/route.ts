// app/api/admin/writing/route.ts
import { auth }           from '@/auth'
import { prisma }         from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { z }              from 'zod'

const postSchema = z.object({
  title:     z.string().min(1, 'Title required'),
  slug:      z.string().min(1, 'Slug required'),
  excerpt:   z.string().min(1, 'Excerpt required'),
  content:   z.string().min(1, 'Content required'),
  published: z.boolean(),
})

export async function POST(req: Request) {
  const session = await auth()
  if (!session) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body   = await req.json()
  const result = postSchema.safeParse(body)

  if (!result.success) {
    return Response.json({
      error: result.error.issues[0].message
    }, { status: 400 })
  }

  const { title, slug, excerpt, content, published } = result.data

  // Check slug is unique
  const existing = await prisma.post.findUnique({ where: { slug } })
  if (existing) {
    return Response.json({ error: 'Slug already exists' }, { status: 409 })
  }

  const post = await prisma.post.create({
    data: {
      title, slug, excerpt, content, published,
      publishedAt: published ? new Date() : null,
    },
  })

  revalidatePath('/writing')
  revalidatePath('/admin/writing')

  return Response.json({ success: true, data: post }, { status: 201 })
}