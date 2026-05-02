// app/api/contact/route.ts
import { Resend } from 'resend'
import { NextRequest } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  try {
    // 1. Parse the JSON body sent from the form
    const body = await req.json()
    const { name, email, message } = body

    // 2. Validate — never trust client input
    if (!name || !email || !message) {
      return Response.json(
        { error: 'Name, email and message are required.' },
        { status: 400 }  // 400 = bad request
      )
    }

    // Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return Response.json(
        { error: 'Invalid email address.' },
        { status: 400 }
      )
    }

    // 3. Send the email via Resend
    await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>', // use this until you have a domain
      to: 'sarathp20@gmail.com',
      replyTo: email,           // ← replying goes directly to the recruiter
      subject: `Portfolio message from ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px;">
          <h2 style="color: #fbbf24;">New message from your portfolio</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p style="background:#f4f4f5; padding: 16px; border-radius: 8px;">${message}</p>
        </div>
      `,
    })

    // 4. Return success
    return Response.json(
      { success: true },
      { status: 200 }
    )

  } catch (error) {
    console.error('Contact form error:', error)
    return Response.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }  // 500 = server error
    )
  }
}