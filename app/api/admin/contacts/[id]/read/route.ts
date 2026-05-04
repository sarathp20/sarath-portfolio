import { auth }           from '@/auth'
import { prisma }         from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { NextRequest }    from 'next/server'

type Params = { params: Promise<{ id: string }> }

export async function PATCH(_req: NextRequest, { params }: Params) {
  const session = await auth()
  if (!session) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await params  // ← await params first, then destructure

  const contact = await prisma.contact.update({
    where: { id },             // ← now id is a real string, not undefined
    data:  { read: true },
  })

  revalidatePath('/admin/dashboard')
  return Response.json({ success: true, data: contact })
}