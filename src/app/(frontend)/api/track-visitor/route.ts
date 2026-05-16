import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const payload = await getPayload({ config: configPromise })
    const rawIp = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || '127.0.0.1'
    const ip = rawIp.split(',')[0].trim()
    const userAgent = req.headers.get('user-agent') || 'Unknown Browser'

    // Extract basic browser name
    let browser = 'Unknown Browser'
    if (userAgent.includes('Edg/')) browser = 'Microsoft Edge'
    else if (userAgent.includes('Chrome/')) browser = 'Google Chrome'
    else if (userAgent.includes('Firefox/')) browser = 'Mozilla Firefox'
    else if (userAgent.includes('Safari/') && !userAgent.includes('Chrome/')) browser = 'Apple Safari'

    let country = 'Unknown'
    let countryCode = 'UN'

    if (ip !== '127.0.0.1' && ip !== '::1') {
      try {
        const geoRes = await fetch(`https://ipapi.co/${ip}/json/`, { signal: AbortSignal.timeout(3000) })
        if (geoRes.ok) {
          const geoData = await geoRes.json()
          if (geoData.country_name) country = geoData.country_name
          if (geoData.country) countryCode = geoData.country
        }
      } catch (_) {}
    } else {
      country = 'Localhost (Dev)'
      countryCode = 'DEV'
    }

    await payload.create({
      collection: 'visitor-logs',
      data: {
        ip,
        country,
        countryCode,
        browser,
        timestamp: new Date().toISOString(),
      },
    })

    return NextResponse.json({ success: true })
  } catch (err: any) {
    console.error('[Visitor Tracker Error]', err)
    return NextResponse.json({ success: false, error: err?.message }, { status: 500 })
  }
}
