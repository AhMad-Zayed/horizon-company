import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import fs from 'fs'
import path from 'path'
import { NextResponse } from 'next/server'

export async function GET() {
  return POST()
}

export async function POST() {
  try {
    console.log('[Horizon Slider Seeder] Initializing HeroSlides seeding...')
    const payload = await getPayload({ config: configPromise })

    const mediaDir = path.resolve(process.cwd(), 'public/media')

    const sliderImages = [
      { filename: 'slide1.jpg', alt: 'Transforming Enterprise Infrastructure' },
      { filename: 'slide2.jpg', alt: 'Sovereign Cybersecurity Architecture' },
      { filename: 'slide3.jpg', alt: 'Absolute Business Continuity & Backhaul' },
    ]

    const mediaIds: Record<string, number> = {}

    // Ensure all 3 media records exist
    for (const item of sliderImages) {
      let rec = (await payload.find({ collection: 'media', where: { alt: { equals: item.alt } } })).docs[0]
      if (!rec) {
        rec = await payload.create({
          collection: 'media',
          data: { alt: item.alt },
          filePath: path.resolve(mediaDir, item.filename),
        })
        console.log(`✓ Uploaded Media: ${item.filename}`)
      }
      mediaIds[item.filename] = rec.id as number
    }

    // Wipe any existing slides to ensure perfect original state
    const existingSlides = await payload.find({ collection: 'hero-slides' })
    for (const slide of existingSlides.docs) {
      await payload.delete({ collection: 'hero-slides', id: slide.id })
    }
    console.log('✓ Cleared old hero slides.')

    // Recreate the 3 original slides
    const slidesData = [
      {
        headline: 'Transforming Enterprise Infrastructure',
        subheadline: 'Your trusted partner for modernizing IT architecture, deploying high-end security, and ensuring absolute business continuity.',
        ctaText: 'Explore Solutions',
        ctaLink: 'services',
        order: 1,
        image: mediaIds['slide1.jpg'],
      },
      {
        headline: 'Sovereign Cybersecurity Architecture',
        subheadline: 'Comprehensive information security strategies, enterprise firewalls, and active zero-day threat mitigation for major sectors.',
        ctaText: 'Security Systems',
        ctaLink: 'services',
        order: 2,
        image: mediaIds['slide2.jpg'],
      },
      {
        headline: 'Absolute Business Continuity & Backhaul',
        subheadline: 'Long-range high-speed corporate internet, robust wireless backhaul deployments, and 24/7 premium after-sale support.',
        ctaText: 'Expert Consultation',
        ctaLink: 'contact-form-section',
        order: 3,
        image: mediaIds['slide3.jpg'],
      },
    ]

    for (const s of slidesData) {
      await payload.create({ collection: 'hero-slides', data: s })
      console.log(`✓ Seeded Slide: ${s.headline}`)
    }

    return NextResponse.json({
      success: true,
      message: 'Successfully seeded 3 original slider images into CMS!',
      seededSlides: slidesData.map(s => s.headline),
    })
  } catch (error: any) {
    console.error('[Horizon Slider Seeder Error]', error)
    return NextResponse.json({ success: false, error: error?.message || String(error) }, { status: 500 })
  }
}
