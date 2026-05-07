import { NextRequest }        from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { search }             from '@/lib/embeddings'

const genAI = new GoogleGenerativeAI(
  process.env.GOOGLE_GENERATIVE_AI_API_KEY!
)

const SYSTEM_PROMPT = `You are an AI assistant for Sarath P's portfolio website.
You answer questions about Sarath's skills, experience, projects, publications, and certifications.
Only answer questions about Sarath. If asked about anything else, politely decline and redirect to Sarath's work.
Never make up information. If the context doesn't contain the answer, say "I don't have that information about Sarath."
Be professional and direct. No markdown. Keep answers concise — under 3 sentences unless more detail is requested.
Don't use filler phrases like "Certainly!" or "Great question!". Get straight to the answer.`

export async function POST(req: NextRequest) {
  try {
    const { message, history = [] } = await req.json()

    if (!message) {
      return Response.json({ error: 'Message required' }, { status: 400 })
    }

    // 1. Search for relevant context — top 5 chunks
    const chunks  = await search(message, 5)
    const context = chunks
      .map(c => `[${c.title}]: ${c.content}`)
      .join('\n\n')

    // 2. Build prompt with injected context
    const promptWithContext = `Answer using ONLY the context below.
If the context contains partial information, use all of it to give a complete answer.
If the context doesn't contain the answer, say "I don't have that information about Sarath."

Context:
${context}

Question: ${message}`

    // 3. Build Gemini chat history
    const geminiHistory = history.map((h: { role: string; content: string }) => ({
      role:  h.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: h.content }],
    }))

    // 4. Create model and start chat
    const model = genAI.getGenerativeModel({
      model:             'gemini-2.5-flash',
      systemInstruction: SYSTEM_PROMPT,
    })

    const chat = model.startChat({
      history: geminiHistory,
    })

    // 5. Stream response
    const result = await chat.sendMessageStream(promptWithContext)

    const readable = new ReadableStream({
      async start(controller) {
        for await (const chunk of result.stream) {
          const token = chunk.text()
          if (token) {
            controller.enqueue(new TextEncoder().encode(token))
          }
        }
        controller.close()
      },
    })

    return new Response(readable, {
      headers: {
        'Content-Type':      'text/plain; charset=utf-8',
        'Transfer-Encoding': 'chunked',
      },
    })

  } catch (error) {
    console.error('Chat error:', error)
    return Response.json(
      { error: 'Something went wrong' },
      { status: 500 }
    )
  }
}