import React from 'react';
import { getPayload } from 'payload';
import configPromise from '@/payload.config';
import { Navbar } from '@/components/Navbar';
import { HeroSlider } from '@/components/HeroSlider';
import { TechPartners } from '@/components/TechPartners';
import { AboutSection } from '@/components/AboutSection';
import { ServicesSection } from '@/components/ServicesSection';
import { WhyUsSection } from '@/components/WhyUsSection';
import { ClientsPortfolio } from '@/components/ClientsPortfolio';
import { ContactForm } from '@/components/ContactForm';
import { Footer } from '@/components/Footer';
import { VisitorTracker } from '@/components/VisitorTracker';

export const revalidate = 60;

export default async function Page() {
  // Use unknown[] — Payload generated types may not satisfy Record<string, unknown>
  // Each component handles its own fallback when these are empty arrays.
  let slides: unknown[] = [];
  let partners: unknown[] = [];
  let services: unknown[] = [];
  let clients: unknown[] = [];

  try {
    const payload = await getPayload({ config: configPromise });

    // Use Promise.allSettled so a single collection failure does not prevent
    // other collections from loading successfully.
    const [slidesRes, partnersRes, servicesRes, clientsRes] = await Promise.allSettled([
      payload.find({ collection: 'hero-slides', sort: 'order', depth: 1 }),
      payload.find({ collection: 'partners', depth: 1 }),
      payload.find({ collection: 'services', sort: 'order', depth: 0 }),
      payload.find({ collection: 'clients', depth: 1 }),
    ]);

    if (slidesRes.status === 'fulfilled') slides = slidesRes.value.docs;
    if (partnersRes.status === 'fulfilled') partners = partnersRes.value.docs;
    if (servicesRes.status === 'fulfilled') services = servicesRes.value.docs;
    if (clientsRes.status === 'fulfilled') clients = clientsRes.value.docs;
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    console.error('[Horizon] CMS data fetch failed — using component fallback data.', message);
    // Reset to guaranteed empty arrays so each component uses its own fallbacks
    slides = [];
    partners = [];
    services = [];
    clients = [];
  }

  const bilingualJsonLd = {
    "@context": "https://schema.org",
    "@type": "Corporation",
    "name": "Horizon Smart Solutions",
    "alternateName": ["أفق الحلول الذكية", "Horizon Intelligent Technology"],
    "url": "https://horizon-ss.com",
    "logo": "https://horizon-ss.com/next.svg",
    "description": {
      "en": "Elite turnkey IT modernization, mission-critical datacenter infrastructure, corporate VoIP networks, and advanced CCTV deployments for Palestine's public and private institutions.",
      "ar": "تحديث الأنظمة التقنية المتكاملة للمنشآت، بنى تحتية حرجية لمراكز البيانات، شبكات الاتصالات المؤسسية VoIP، وأنظمة الرقابة المتقدمة للمؤسسات العامة والخاصة في فلسطين."
    },
    "foundingDate": "2010",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Ramallah",
      "addressCountry": "PS"
    },
    "knowsAbout": [
      "Enterprise Networking", "شبكات المنشآت الكبرى",
      "Cybersecurity", "الأمن السيبراني",
      "VoIP Telephony", "الاتصالات المؤسسية وVoIP",
      "CCTV Surveillance", "أنظمة المراقبة والأتمتة",
      "Sovereign Local Infrastructure", "البنية التحتية السيادية المحلية",
      "Datacenters", "مراكز البيانات"
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(bilingualJsonLd) }}
      />
      <main className="w-full relative overflow-hidden bg-white dark:bg-[#09090B] text-zinc-900 dark:text-zinc-100 transition-colors">
      <VisitorTracker />
      <Navbar />

      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      <HeroSlider slides={slides as any} />
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      <TechPartners partners={partners as any} />
      <AboutSection />
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      <ServicesSection services={services as any} />
      <WhyUsSection />
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      <ClientsPortfolio clients={clients as any} />

      {/* Contact Form Section */}
      <section className="py-24 relative z-10 bg-zinc-50/50 dark:bg-[#0D0D11]/50 border-t border-black/5 dark:border-white/5">
        <div className="max-w-4xl mx-auto px-6">
          <ContactForm />
        </div>
      </section>

      <Footer />
    </main>
    </>
  );
}
