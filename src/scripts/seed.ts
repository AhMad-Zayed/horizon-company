import { getPayload } from 'payload'
import configPromise from '../payload.config'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

async function seed() {
  console.log('\n[Horizon Seeder] Initializing Payload CMS Seeding process...\n')
  const payload = await getPayload({ config: configPromise })

  // ─── 1. Ensure Media Directory & Placeholder SVG ─────────────────────────
  const mediaDir = path.resolve(__dirname, '../../public/media')
  if (!fs.existsSync(mediaDir)) {
    fs.mkdirSync(mediaDir, { recursive: true })
  }

  const heroSvgPath = path.resolve(mediaDir, 'hero-bg.svg')
  if (!fs.existsSync(heroSvgPath)) {
    const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="1920" height="1080" viewBox="0 0 1920 1080">
  <defs>
    <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#09090B"/>
      <stop offset="50%" stop-color="#18181B"/>
      <stop offset="100%" stop-color="#27272A"/>
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#g)"/>
  <circle cx="960" cy="540" r="600" fill="#DC2626" opacity="0.1" filter="blur(100px)"/>
</svg>`
    fs.writeFileSync(heroSvgPath, svgContent, 'utf-8')
  }

  let mediaRecord = (await payload.find({ collection: 'media', where: { alt: { equals: 'Horizon Enterprise Hero' } } })).docs[0]
  if (!mediaRecord) {
    mediaRecord = await payload.create({
      collection: 'media',
      data: { alt: 'Horizon Enterprise Hero' },
      filePath: heroSvgPath,
    })
    console.log('✓ Created Media placeholder record.')
  } else {
    console.log('✓ Media placeholder record already exists.')
  }

  // ─── 2. Seed Hero Slides ─────────────────────────────────────────────────
  const existingSlides = await payload.find({ collection: 'hero-slides' })
  if (existingSlides.totalDocs === 0) {
    await payload.create({
      collection: 'hero-slides',
      data: {
        headline: 'Transforming Enterprise Infrastructure with Intelligent Solutions.',
        subheadline: 'Your trusted partner for modernizing IT architecture, deploying high-end security, and ensuring absolute business continuity.',
        ctaText: 'Explore Our Solutions',
        ctaLink: '#services',
        order: 1,
        image: mediaRecord.id,
      },
    })
    console.log('✓ Seeded Hero Slide 1.')
  } else {
    console.log('✓ Hero Slides already exist. Skipping.')
  }

  // ─── 3. Seed Core Services ───────────────────────────────────────────────
  const servicesToSeed = [
    { title: "Professional IT Services", description: "Advanced technical consulting, deployment, and seamless system integration for major sectors.", iconName: "Network", order: 1 },
    { title: "Infrastructure & Data Centers", description: "Designing, implementing, and modernizing complex enterprise networks and robust data centers.", iconName: "Server", order: 2 },
    { title: "Security Solutions", description: "Comprehensive information security strategies, enterprise firewalls, and active threat mitigation.", iconName: "ShieldCheck", order: 3 },
    { title: "VoIP Solutions", description: "High-end, customized corporate communication architecture tailored for industrial scales.", iconName: "Phone", order: 4 },
    { title: "Wireless Backhaul", description: "Long-range, high-speed corporate internet and robust wireless backhaul deployments.", iconName: "Wifi", order: 5 },
    { title: "CCTV & Monitoring", description: "Turnkey commercial surveillance and specialized command control center setups.", iconName: "Video", order: 6 },
  ]

  console.log('\nChecking Services...')
  for (const s of servicesToSeed) {
    const existing = await payload.find({ collection: 'services', where: { title: { equals: s.title } } })
    if (existing.totalDocs === 0) {
      await payload.create({ collection: 'services', data: s })
      console.log(`  ✓ Seeded Service: ${s.title}`)
    } else {
      console.log(`  - Service already exists: ${s.title}`)
    }
  }

  // ─── 4. Seed Tech Partners ───────────────────────────────────────────────
  const partnersToSeed = ["Fortinet", "Dell EMC", "Veeam", "Radwin", "Synology", "Dahua"]
  console.log('\nChecking Partners...')
  for (const p of partnersToSeed) {
    const existing = await payload.find({ collection: 'partners', where: { name: { equals: p } } })
    if (existing.totalDocs === 0) {
      await payload.create({ collection: 'partners', data: { name: p } })
      console.log(`  ✓ Seeded Partner: ${p}`)
    } else {
      console.log(`  - Partner already exists: ${p}`)
    }
  }

  // ─── 5. Seed Elite Clients ───────────────────────────────────────────────
  const clientsToSeed = [
    { name: "Ramallah Municipality", subtitle: "Public Infrastructure", category: "Gov", initials: "RM" },
    { name: "Ministry of Tourism & Antiquities", subtitle: "State of Palestine", category: "Gov", initials: "MOT" },
    { name: "Ministry of Awqaf", subtitle: "State of Palestine", category: "Gov", initials: "MOA" },
    { name: "St. Joseph Hospital", subtitle: "French Hospital - Jerusalem", category: "Health", initials: "SJH" },
    { name: "Augusta Victoria Hospital", subtitle: "Healthcare Setup", category: "Health", initials: "AVH" },
    { name: "Al-Makassed Hospital", subtitle: "Charitable Society", category: "Health", initials: "AMH" },
    { name: "Masrouji Group", subtitle: "Commercial Enterprise", category: "Corporate", initials: "MG" },
    { name: "National Insurance Co.", subtitle: "Financial Services", category: "Corporate", initials: "NIC" },
    { name: "Palestine Automobile Co.", subtitle: "Automotive & Trade", category: "Corporate", initials: "PAC" },
    { name: "Unipal", subtitle: "Distribution", category: "Corporate", initials: "UNI" },
    { name: "Palestine Insurance", subtitle: "Financial Services", category: "Corporate", initials: "PI" },
  ]

  console.log('\nChecking Clients...')
  for (const c of clientsToSeed) {
    const existing = await payload.find({ collection: 'clients', where: { name: { equals: c.name } } })
    if (existing.totalDocs === 0) {
      await payload.create({ collection: 'clients', data: c as any })
      console.log(`  ✓ Seeded Client: ${c.name}`)
    } else {
      console.log(`  - Client already exists: ${c.name}`)
    }
  }

  console.log('\n[Horizon Seeder] Database seeding completed successfully! 🎉\n')
  process.exit(0)
}

seed()
