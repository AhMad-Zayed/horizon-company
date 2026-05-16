'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

// ─── Strict Types ─────────────────────────────────────────────────────────────

interface MediaObject {
  url?: string;
  sizes?: {
    thumbnail?: { url?: string };
    [key: string]: { url?: string } | undefined;
  };
}

interface Slide {
  id?: string | number;
  image?: string | MediaObject | null;
  headline: string;
  subheadline: string;
  ctaText: string;
  ctaLink: string;
}

interface HeroSliderProps {
  slides?: Slide[];
}

// ─── Fallback Data ────────────────────────────────────────────────────────────

const fallbackSlides: Slide[] = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2000&auto=format&fit=crop',
    headline: 'Transforming Enterprise Infrastructure',
    subheadline:
      'Your trusted partner for modernizing IT architecture, deploying high-end security, and ensuring absolute business continuity.',
    ctaText: 'Explore Solutions',
    ctaLink: 'services',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2000&auto=format&fit=crop',
    headline: 'Sovereign Cybersecurity Architecture',
    subheadline:
      'Comprehensive information security strategies, enterprise firewalls, and active zero-day threat mitigation for major sectors.',
    ctaText: 'Security Systems',
    ctaLink: 'services',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=2000&auto=format&fit=crop',
    headline: 'Absolute Business Continuity & Backhaul',
    subheadline:
      'Long-range high-speed corporate internet, robust wireless backhaul deployments, and 24/7 premium after-sale support.',
    ctaText: 'Expert Consultation',
    ctaLink: 'contact',
  },
];

// ─── Safe Image URL Resolver ──────────────────────────────────────────────────

function cleanLocalUrl(url: string): string {
  let u = url;
  try {
    if (u.startsWith('http://') || u.startsWith('https://')) {
      const parsed = new URL(u);
      if (parsed.hostname === 'localhost' || parsed.hostname === '127.0.0.1' || parsed.hostname === '::1') {
        u = parsed.pathname;
      }
    }
  } catch (_) {}
  if (u.startsWith('/api/media/file/')) {
    u = u.replace('/api/media/file/', '/media/');
  }
  return u;
}

/**
 * Resolves a valid, non-empty image URL from any shape that Payload CMS
 * may return. Falls back to the static Unsplash slide image at the given index.
 * Never throws; never returns an empty string.
 */
function resolveImageUrl(img: Slide['image'], fallbackIndex: number): string {
  if (typeof img === 'string' && img.trim() !== '') return cleanLocalUrl(img);

  if (img !== null && typeof img === 'object') {
    if (typeof img.url === 'string' && img.url.trim() !== '') return cleanLocalUrl(img.url);
    const thumbUrl = img.sizes?.thumbnail?.url;
    if (typeof thumbUrl === 'string' && thumbUrl.trim() !== '') return cleanLocalUrl(thumbUrl);
  }

  // Safe guaranteed fallback
  const safe = fallbackSlides[fallbackIndex % fallbackSlides.length];
  return typeof safe.image === 'string' ? safe.image : fallbackSlides[0].image as string;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function HeroSlider({ slides }: HeroSliderProps) {
  const activeSlides: Slide[] =
    Array.isArray(slides) && slides.length > 0 ? slides : fallbackSlides;

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % activeSlides.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [activeSlides.length]);

  // Guard: reset index if slides array shrank
  const safeIndex = current >= activeSlides.length ? 0 : current;
  const currentSlide = activeSlides[safeIndex];

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const imageUrl = resolveImageUrl(currentSlide.image, safeIndex);

  // Split headline: last 2 words get gradient treatment
  const words = currentSlide.headline.split(' ');
  const mainWords = words.length > 2 ? words.slice(0, -2).join(' ') : '';
  const gradientWords = words.length > 2 ? words.slice(-2).join(' ') : currentSlide.headline;

  return (
    <section id="home" className="relative pt-40 pb-24 lg:pt-56 lg:pb-32 overflow-hidden flex items-center min-h-screen">
      {/* Background Slider Images */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <AnimatePresence initial={false}>
          <motion.div
            key={safeIndex}
            initial={{ opacity: 0, scale: 1 }}
            animate={{ opacity: 1, scale: 1.08 }}
            exit={{ opacity: 0 }}
            transition={{
              opacity: { duration: 1.4, ease: 'easeInOut' },
              scale: { duration: 10, ease: 'easeOut' },
            }}
            className="absolute inset-0"
          >
            <Image
              src={imageUrl}
              alt={currentSlide.headline}
              fill
              priority
              quality={90}
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-white via-white/85 to-white/40 dark:from-[#09090B] dark:via-[#09090B]/85 dark:to-black/50 z-10" />
      <div className="absolute inset-0 bg-mesh opacity-60 z-10 pointer-events-none" />
      <div className="absolute inset-0 bg-grid opacity-30 z-10 pointer-events-none" />
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-red-600/20 rounded-full blur-[120px] mix-blend-screen pointer-events-none z-10" />

      {/* Hero Content */}
      <div className="max-w-7xl mx-auto px-6 relative z-20 w-full">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-500/10 dark:bg-red-500/15 border border-red-500/20 dark:border-red-500/30 text-red-600 dark:text-red-400 text-sm font-bold mb-8 shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-red-600 dark:bg-red-500 animate-pulse" />
            Intelligent Technology Since 2010
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={safeIndex}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight mb-8 leading-[1.15] text-zinc-900 dark:text-white">
                {mainWords && (
                  <>
                    {mainWords} <br className="hidden md:block" />
                  </>
                )}
                <span className="text-gradient">{gradientWords}</span>
                {' '}<br />
                <span className="text-gradient-red">Intelligent Solutions.</span>
              </h1>

              <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 mb-10 max-w-2xl leading-relaxed font-medium">
                {currentSlide.subheadline}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <button
                  onClick={() => scrollTo(currentSlide.ctaLink)}
                  className="px-8 py-4 bg-zinc-900 dark:bg-white text-white dark:text-black hover:bg-zinc-800 dark:hover:bg-zinc-200 font-extrabold rounded-lg flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-xl cursor-pointer"
                >
                  {currentSlide.ctaText} <ArrowRight className="w-5 h-5" />
                </button>
                <button
                  onClick={() => scrollTo('contact-form-section')}
                  className="px-8 py-4 bg-transparent border border-zinc-900/20 dark:border-white/20 text-zinc-900 dark:text-white hover:bg-zinc-900/5 dark:hover:bg-white/5 font-extrabold rounded-lg flex items-center justify-center transition-all cursor-pointer"
                >
                  Expert Consultation
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Slider Controls */}
      <div className="absolute bottom-8 left-0 right-0 z-20 max-w-7xl mx-auto px-6 flex items-center justify-between pointer-events-auto">
        <div className="flex items-center gap-3">
          {activeSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className="group relative py-3 cursor-pointer"
            >
              <div
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  idx === safeIndex
                    ? 'w-16 bg-red-600 shadow-[0_0_10px_rgba(229,9,20,0.5)]'
                    : 'w-8 bg-zinc-400/40 dark:bg-white/20 group-hover:bg-red-500/50'
                }`}
              />
            </button>
          ))}
        </div>
        <div className="text-sm font-extrabold tracking-widest uppercase text-zinc-500 dark:text-zinc-400">
          {String(safeIndex + 1).padStart(2, '0')} / {String(activeSlides.length).padStart(2, '0')}
        </div>
      </div>
    </section>
  );
}
