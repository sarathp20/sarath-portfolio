// prisma.config.ts
import { defineConfig } from 'prisma/config'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })  // ← must be .env.local not .env

export default defineConfig({
  schema: 'prisma/schema.prisma',
})