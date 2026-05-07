import { GoogleGenerativeAI } from '@google/generative-ai'
import { prisma } from '@/lib/prisma'

const genAI = new GoogleGenerativeAI(
  process.env.GOOGLE_GENERATIVE_AI_API_KEY!
)

export async function embed(text: string): Promise<number[]> {
  const model  = genAI.getGenerativeModel({ model: 'gemini-embedding-001' })
  const result = await model.embedContent(text)
  return result.embedding.values
}

export async function storeEmbedding(
  source:  string,
  title:   string,
  content: string
): Promise<void> {
  const vector       = await embed(content)
  const vectorString = `[${vector.join(',')}]`

  await prisma.$executeRaw`
    INSERT INTO "Document" (id, source, title, content, embedding, "createdAt")
    VALUES (
      gen_random_uuid(),
      ${source},
      ${title},
      ${content},
      ${vectorString}::vector,
      NOW()
    )
  `
}

export async function search(
  question: string,
  limit:    number = 3
): Promise<{ title: string; content: string; source: string }[]> {
  const vector       = await embed(question)
  const vectorString = `[${vector.join(',')}]`

  return prisma.$queryRaw<{ title: string; content: string; source: string }[]>`
    SELECT source, title, content
    FROM "Document"
    ORDER BY embedding <=> ${vectorString}::vector
    LIMIT ${limit}
  `
}