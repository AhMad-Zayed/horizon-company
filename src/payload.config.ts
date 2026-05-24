import { buildConfig } from 'payload'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import nodemailer from 'nodemailer'
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
import { VisitorLogs } from './collections/VisitorLogs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// ─── Environment Variable Validation ─────────────────────────────────────────
const payloadSecret = process.env.PAYLOAD_SECRET

if (!payloadSecret) {
  throw new Error(
    'CRITICAL FAILURE: PAYLOAD_SECRET environment variable is missing!\n' +
    'Please set a secure PAYLOAD_SECRET in your .env file before running the application.'
  )
}

// Ensure database URI is always resolved to an absolute path pointing to root workspace
let databaseUri = process.env.DATABASE_URI ?? `file:${path.resolve(__dirname, '../payload.db')}`
if (databaseUri.startsWith('file:./')) {
  databaseUri = `file:${path.resolve(process.cwd(), databaseUri.replace('file:./', ''))}`
}

const isSmtpConfigured = !!process.env.SMTP_HOST;

// Background Transporter Verification
if (isSmtpConfigured) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
    connectionTimeout: parseInt(process.env.SMTP_CONNECTION_TIMEOUT || '10000'),
    greetingTimeout: parseInt(process.env.SMTP_GREETING_TIMEOUT || '10000'),
    socketTimeout: parseInt(process.env.SMTP_SOCKET_TIMEOUT || '15000'),
  });

  transporter.verify()
    .then(() => {
      console.log('[Horizon SMTP] Mail transporter verified successfully.');
    })
    .catch((err: unknown) => {
      const msg = err instanceof Error ? err.message : String(err)
      console.error('[Horizon SMTP] Mail transporter verification failed:', msg);
    });
}

export default buildConfig({
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL || process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000',
  admin: {
    user: Users.slug,
    components: {
      graphics: {
        Logo: './components/admin/AdminLogo#AdminLogo',
      },
      afterNav: [
        './components/admin/AtlaHubFooter#AtlaHubFooter',
      ],
      views: {
        dashboard: {
          Component: './components/admin/CustomDashboard#CustomDashboard',
        },
        login: {
          Component: './components/admin/CustomLogin#CustomLogin',
        },
      },
    },
    importMap: {
      baseDir: path.resolve(__dirname),
      importMapFile: path.resolve(__dirname, 'app/(payload)/admin/importMap.js'),
    },
  },
  collections: [Users, Media, HeroSlides, Clients, Partners, Services, ContactMessages, VisitorLogs],
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
  email: isSmtpConfigured
    ? nodemailerAdapter({
        defaultFromAddress: process.env.EMAIL_FROM || 'info@horizon-ss.com',
        defaultFromName: 'Horizon Support',
        transportOptions: {
          host: process.env.SMTP_HOST,
          port: parseInt(process.env.SMTP_PORT || '587'),
          secure: process.env.SMTP_SECURE === 'true',
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASSWORD,
          },
          connectionTimeout: parseInt(process.env.SMTP_CONNECTION_TIMEOUT || '10000'),
          greetingTimeout: parseInt(process.env.SMTP_GREETING_TIMEOUT || '10000'),
          socketTimeout: parseInt(process.env.SMTP_SOCKET_TIMEOUT || '15000'),
        },
      })
    : undefined,
  sharp,
})
