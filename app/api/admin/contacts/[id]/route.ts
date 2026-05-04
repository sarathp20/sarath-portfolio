import { auth }           from '@/auth'
import { prisma }         from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { NextRequest }    from 'next/server'

type Params = { params: Promise<{ id: string }> }

export async function DELETE(_req: NextRequest, { params }: Params) {
  const session = await auth()
  if (!session) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await params  // ← same fix here

  await prisma.contact.delete({ where: { id } })

  revalidatePath('/admin/dashboard')
  return Response.json({ success: true })
}