import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const payload = await getPayload({ config: configPromise })

    // Find admin user
    const users = await payload.find({ collection: 'users' })

    if (users.totalDocs === 0) {
      // Create admin user if none exists
      const newUser = await payload.create({
        collection: 'users',
        data: {
          email: 'demo-author@example.com',
          password: 'password',
        },
      })
      return NextResponse.json({
        success: true,
        message: 'Admin account created successfully! Email: demo-author@example.com | Password: password',
        user: newUser.email,
      })
    }

    // Unlock and reset password for all users
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
    }

    return NextResponse.json({
      success: true,
      message: 'All admin accounts successfully unlocked and password reset to "password".',
      unlockedUsers: users.docs.map((u) => u.email),
    })
  } catch (error: any) {
    console.error('[Unlock Admin Error]', error)
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
