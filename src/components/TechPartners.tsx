'use client';

import React from 'react';
import Image from 'next/image';
import { Shield, Server, Activity, Wifi, Network, Video } from 'lucide-react';

interface Partner {
  id?: string | number;
  name: string;
  logo?: any;
}

interface TechPartnersProps {
  partners?: Partner[];
}

const fallbackPartners: { name: string; icon: React.ReactNode }[] = [
  { name: 'Fortinet', icon: <Shield className="w-8 h-8 text-red-500" /> },
  { name: 'Dell EMC', icon: <Server className="w-8 h-8 text-red-500" /> },
  { name: 'Veeam', icon: <Activity className="w-8 h-8 text-red-500" /> },
  { name: 'Radwin', icon: <Wifi className="w-8 h-8 text-red-500" /> },
  { name: 'Synology', icon: <Network className="w-8 h-8 text-red-500" /> },
  { name: 'Dahua', icon: <Video className="w-8 h-8 text-red-500" /> },
];

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

export function TechPartners({ partners }: TechPartnersProps) {
  const hasCustomPartners = partners && partners.length > 0;

  return (
    <section id="partners" className="py-16 border-y border-black/5 dark:border-white/5 bg-zinc-50 dark:bg-[#0D0D11] relative z-20 transition-colors">
      <div className="max-w-7xl mx-auto px-6 mb-10">
        <p className="text-xs font-extrabold tracking-widest text-zinc-500 uppercase text-center">
          Powered by Global Industry Leaders
        </p>
      </div>

      <div className="overflow-hidden relative">
        {/* Gradient Masks for fading edges */}
        <div className="absolute inset-y-0 left-0 w-28 bg-gradient-to-r from-zinc-50 dark:from-[#0D0D11] to-transparent z-10 pointer-events-none transition-colors" />
        <div className="absolute inset-y-0 right-0 w-28 bg-gradient-to-l from-zinc-50 dark:from-[#0D0D11] to-transparent z-10 pointer-events-none transition-colors" />

        <div className="animate-scroll items-center gap-16 md:gap-28 px-8">
          {[...Array(2)].map((_, i) => (
            <React.Fragment key={i}>
              {hasCustomPartners
                ? partners.map((p, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 text-2xl font-extrabold text-zinc-600 dark:text-zinc-400 hover:text-red-600 dark:hover:text-white transition-colors whitespace-nowrap"
                    >
                      {p.logo && (p.logo.url || typeof p.logo === 'string') ? (
                        <div className="w-10 h-10 relative flex-shrink-0">
                          <Image
                            src={cleanLocalUrl(p.logo.url || p.logo)}
                            alt={p.name}
                            fill
                            className="object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                          />
                        </div>
                      ) : (
                        <Shield className="w-8 h-8 text-red-500" />
                      )}
                      <span>{p.name}</span>
                    </div>
                  ))
                : fallbackPartners.map((p, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 text-2xl font-extrabold text-zinc-600 dark:text-zinc-400 hover:text-red-600 dark:hover:text-white transition-colors whitespace-nowrap"
                    >
                      {p.icon}
                      <span>{p.name}</span>
                    </div>
                  ))}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
