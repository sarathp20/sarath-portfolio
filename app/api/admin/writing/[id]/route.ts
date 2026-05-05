// app/api/admin/writing/[id]/route.ts
import { auth }           from '@/auth'
import { prisma }         from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { z }              from 'zod'
import { NextRequest }    from 'next/server'

type Params = { params: Promise<{ id: string }> }

const updateSchema = z.object({
  title:     z.string().min(1).optional(),
  slug:      z.string().min(1).optional(),
  excerpt:   z.string().min(1).optional(),
  content:   z.string().min(1).optional(),
  published: z.boolean().optional(),
})

// PATCH /api/admin/writing/:id — update post
export async function PATCH(req: NextRequest, { params }: Params) {
  const session = await auth()
  if (!session) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id }  = await params
  const body    = await req.json()
  const result  = updateSchema.safeParse(body)

  if (!result.success) {
    return Response.json({ error: result.error.issues[0].message }, { status: 400 })
  }

  const data = result.data

  // If publishing for first time — set publishedAt
  if (data.published) {
    const existing = await prisma.post.findUnique({ where: { id } })
    if (existing && !existing.published) {
      (data as any).publishedAt = new Date()
    }
  }

  const post = await prisma.post.update({
    where: { id },
    data,
  })

  revalidatePath('/writing')
  revalidatePath(`/writing/${post.slug}`)
  revalidatePath('/admin/writing')

  return Response.json({ success: true, data: post })
}

// DELETE /api/admin/writing/:id
export async function DELETE(_req: NextRequest, { params }: Params) {
  const session = await auth()
  if (!session) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await params

  const post = await prisma.post.delete({ where: { id } })

  revalidatePath('/writing')
  revalidatePath('/admin/writing')

  return Response.json({ success: true })
}