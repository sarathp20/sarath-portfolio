import { NextRequest }  from 'next/server'
import { z }            from 'zod'
import { Resend }       from 'resend'
import { prisma }       from '@/lib/prisma'

const resend = new Resend(process.env.RESEND_API_KEY)

const contactSchema = z.object({
  name:    z.string().min(2,  'Name must be at least 2 characters'),
  email:   z.string().email('Invalid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

export async function POST(req: NextRequest) {
  try {
    // 1. Parse and validate
    const body   = await req.json()
    const result = contactSchema.safeParse(body)

    if (!result.success) {
      return Response.json({
        success: false,
        errors: result.error.issues.map(i => ({
          field:   i.path[0],
          message: i.message,
        })),
      }, { status: 400 })
    }

    const { name, email, message } = result.data

    // 2. Save to database — even if email fails, submission is not lost
    const contact = await prisma.contact.create({
      data: { name, email, message },
    })

    // 3. Send email notification to you
    const emailResult = await resend.emails.send({
      from:    'Portfolio <onboarding@resend.dev>',
      to:      'sarathp20@gmail.com',
      replyTo: email,
      subject: `New message from ${name}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px">
          <h2>New portfolio message</h2>
          <p><strong>From:</strong> ${name} (${email})</p>
          <p><strong>Message:</strong></p>
          <p style="background:#f4f4f5;padding:16px;border-radius:8px">${message}</p>
          <p style="color:#999;font-size:12px">Submission ID: ${contact.id}</p>
        </div>
      `,
    })
    console.log('Resend result:', emailResult)
    return Response.json({ success: true }, { status: 201 })

  } catch (error) {
    console.error('Contact error:', error)
    return Response.json(
      { success: false, error: 'Something went wrong' },
      { status: 500 }
    )
  }
}