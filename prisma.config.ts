// prisma.config.ts
import { defineConfig } from 'prisma/config'
import * as dotenv from 'dotenv'

// Next.js uses .env.local — load it explicitly for Prisma CLI
dotenv.config({ path: '.env.local' })

export default defineConfig({
  schema: 'prisma/schema.prisma',
})