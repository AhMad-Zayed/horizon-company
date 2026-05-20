import { getPayload } from 'payload'
import configPromise from '../payload.config'

async function run() {
  if (process.env.NODE_ENV === 'production') {
    console.error('CRITICAL: This script cannot be run in a production environment!')
    process.exit(1)
  }

  console.log('\n[Horizon Admin Unlock] Initializing local user unlock and password reset...\n')
  const payload = await getPayload({ config: configPromise })

  const users = await payload.find({ collection: 'users' })

  if (users.totalDocs === 0) {
    const newUser = await payload.create({
      collection: 'users',
      data: {
        email: 'demo-author@example.com',
        password: 'password',
      },
    })
    console.log(`✓ No users found. Created default admin user: demo-author@example.com | password`)
  } else {
    for (const u of users.docs) {
      await payload.update({
        collection: 'users',
        id: u.id,
        data: {
          password: 'password',
          loginAttempts: 0,
          lockUntil: null as any,
        },
      })
      console.log(`✓ Unlocked user and reset password to "password": ${u.email}`)
    }
  }

  console.log('\n[Horizon Admin Unlock] Process completed successfully! 🎉\n')
  process.exit(0)
}

run().catch((err) => {
  console.error('[Horizon Admin Unlock Error]', err)
  process.exit(1)
})
