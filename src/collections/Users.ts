import type { CollectionConfig } from 'payload'
import { generateSecret, generateURI, verify, NobleCryptoPlugin } from 'otplib'
import qrcode from 'qrcode'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'email',
  },
  fields: [
    {
      name: 'twoFactorEnabled',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'twoFactorSecret',
      type: 'text',
      admin: {
        readOnly: true,
        hidden: true,
      },
    },
    {
      name: 'twoFactorSetupComplete',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        readOnly: true,
        hidden: true,
      },
    },
    {
      name: 'twoFactorManagement',
      type: 'ui',
      admin: {
        components: {
          Field: './components/admin/TwoFactorField#TwoFactorField',
        },
      },
    },
  ],
  endpoints: [
    {
      path: '/2fa/setup',
      method: 'post',
      handler: async (req: any) => {
        try {
          const user = req.user
          if (!user) {
            return Response.json({ error: 'Unauthorized user session' }, { status: 401 })
          }

          // Always generate a fresh cryptographic secret to prevent QR code staleness
          const secret = generateSecret()
          const uri = generateURI({
            issuer: 'Horizon Enterprise OS',
            label: user.email || 'admin@horizon.com',
            secret,
          })
          const qrCodeUrl = await qrcode.toDataURL(uri)

          await req.payload.update({
            collection: 'users',
            id: user.id,
            data: {
              twoFactorSecret: secret,
            },
          })

          return Response.json({
            qrCodeUrl,
            secret,
          })
        } catch (error: any) {
          console.error('[2FA Setup Error]', error)
          return Response.json({ error: 'Failed to initialize 2FA setup', details: error.message }, { status: 500 })
        }
      },
    },
    {
      path: '/2fa/verify',
      method: 'post',
      handler: async (req: any) => {
        try {
          const user = req.user
          if (!user) {
            return Response.json({ error: 'Unauthorized user session' }, { status: 401 })
          }

          const body = typeof req.json === 'function' ? await req.json() : req.body
          const { token } = body

          if (!token) {
            return Response.json({ error: 'Token is required' }, { status: 400 })
          }

          const cleanToken = String(token).trim().replace(/\s+/g, '')

          let isValid = false;
          if (user.twoFactorSecret) {
            const verificationResult = await verify({
              token: cleanToken,
              secret: user.twoFactorSecret,
              epochTolerance: 120, // Allow 2-minute time drift between server and Duo/Google Authenticator app
              crypto: new NobleCryptoPlugin(),
            })
            isValid = verificationResult.valid === true
          }


          if (isValid) {
            await req.payload.update({
              collection: 'users',
              id: user.id,
              data: {
                twoFactorEnabled: true,
                twoFactorSetupComplete: true,
              },
            })

            return Response.json({ success: true, message: '2FA verification successful and enabled' })
          }

          return Response.json({ error: 'Invalid Security Token' }, { status: 400 })
        } catch (error: any) {
          console.error('[2FA Verify Error]', error)
          return Response.json({ error: 'Invalid Security Token' }, { status: 500 })
        }
      },
    },
    {
      path: '/2fa/disable',
      method: 'post',
      handler: async (req: any) => {
        try {
          const user = req.user
          if (!user) {
            return Response.json({ error: 'Unauthorized' }, { status: 401 })
          }

          await req.payload.update({
            collection: 'users',
            id: user.id,
            data: {
              twoFactorEnabled: false,
              twoFactorSetupComplete: false,
              twoFactorSecret: null,
            },
          })

          return Response.json({ success: true, message: '2FA successfully disabled' })
        } catch (error: any) {
          return Response.json({ error: 'Failed to disable 2FA' }, { status: 500 })
        }
      },
    },
    {
      path: '/2fa/login',
      method: 'post',
      handler: async (req: any) => {
        try {
          const body = typeof req.json === 'function' ? await req.json() : req.body
          const { email, password, token } = body

          if (!email || !password) {
            return Response.json({ error: 'Email and password are required' }, { status: 400 })
          }

          const userRecords = await req.payload.find({
            collection: 'users',
            where: { email: { equals: email } },
            limit: 1,
          })

          const user = userRecords.docs[0]
          if (!user) {
            return Response.json({ error: 'Invalid email or password' }, { status: 401 })
          }

          if (user.lockUntil && new Date(user.lockUntil) > new Date()) {
            return Response.json({ error: 'Account temporarily locked due to failed login attempts. Please use /api/unlock-admin.' }, { status: 401 })
          }

          // Check if 2FA is active
          if (user.twoFactorEnabled) {
            if (!token) {
              return Response.json({ error: '2FA_REQUIRED', userId: user.id }, { status: 401 })
            }

            const cleanToken = String(token).trim().replace(/\s+/g, '')
            let isValid = false;
            if (user.twoFactorSecret) {
              const verificationResult = await verify({
                token: cleanToken,
                secret: user.twoFactorSecret,
                epochTolerance: 120,
                crypto: new NobleCryptoPlugin(),
              })
              isValid = verificationResult.valid === true
            }

            if (!isValid) {
              return Response.json({ error: 'Invalid Security Token' }, { status: 401 })
            }
          }

          // Authenticate session via Payload JWT
          const loginResult = await req.payload.login({
            collection: 'users',
            data: { email, password },
          })

          const jwtToken = loginResult.token

          return new Response(JSON.stringify({ success: true, user: loginResult.user, token: jwtToken }), {
            status: 200,
            headers: {
              'Content-Type': 'application/json',
              'Set-Cookie': `payload-token=${jwtToken}; Path=/; HttpOnly; SameSite=Lax; Max-Age=2592000`,
            },
          })
        } catch (error: any) {
          console.error('[2FA Login Error]', error)
          return Response.json({ error: 'Invalid email or password' }, { status: 401 })
        }
      },
    },
  ],
}

