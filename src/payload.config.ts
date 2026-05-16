import { buildConfig } from 'payload'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { HeroSlides } from './collections/HeroSlides'
import { Clients } from './collections/Clients'
import { Partners } from './collections/Partners'
import { Services } from './collections/Services'
import { ContactMessages } from './collections/ContactMessages'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// ─── Environment Variable Validation ─────────────────────────────────────────
const INSECURE_DEFAULT_SECRET = '0123456789abcdef0123456789abcdef'
const payloadSecret = process.env.PAYLOAD_SECRET ?? INSECURE_DEFAULT_SECRET

if (payloadSecret === INSECURE_DEFAULT_SECRET) {
  console.warn(
    '\n[Horizon WARNING] PAYLOAD_SECRET is using the insecure default value.\n' +
    'Set a strong, random secret in your .env file before deploying to production:\n' +
    'PAYLOAD_SECRET=<your-random-64-char-string>\n'
  )
}

// Ensure database URI is always resolved to an absolute path pointing to root workspace
let databaseUri = process.env.DATABASE_URI ?? `file:${path.resolve(__dirname, '../payload.db')}`
if (databaseUri.startsWith('file:./')) {
  databaseUri = `file:${path.resolve(process.cwd(), databaseUri.replace('file:./', ''))}`
}

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000',
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(__dirname),
      importMapFile: path.resolve(__dirname, 'app/(payload)/admin/importMap.js'),
    },
  },
  collections: [Users, Media, HeroSlides, Clients, Partners, Services, ContactMessages],
  editor: lexicalEditor(),
  secret: payloadSecret,
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  db: sqliteAdapter({
    client: {
      url: databaseUri,
      syncUrl: undefined,
    },
  }),
  sharp,
})
