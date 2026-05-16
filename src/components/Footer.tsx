'use client';

import React from 'react';
import { Activity, MapPin, PhoneCall, Mail, Globe, Shield } from 'lucide-react';

export function Footer() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="bg-zinc-100 dark:bg-[#050505] pt-24 pb-12 border-t border-black/5 dark:border-white/5 relative overflow-hidden transition-colors">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-red-600/5 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Column 1 */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-6 cursor-pointer" onClick={() => scrollTo('home')}>
              <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-red-700 rounded flex items-center justify-center shadow-[0_0_15px_rgba(229,9,20,0.3)]">
                <Activity className="text-white w-5 h-5" />
              </div>
              <span className="text-2xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
                Horizon<span className="text-red-500">.</span>
              </span>
            </div>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed max-w-sm mb-6 font-medium">
              We transform businesses of most major sectors with powerful and adaptable digital solutions that satisfy the needs of today. Horizon Intelligent Technology provides customized communications, enterprise network integrations, and advanced security solutions since 2010.
            </p>
          </div>

          {/* Column 2 */}
          <div>
            <h4 className="text-zinc-900 dark:text-white font-extrabold mb-6 text-base tracking-tight">Quick Links</h4>
            <ul className="space-y-3 text-sm font-semibold text-zinc-600 dark:text-zinc-400">
              <li>
                <button onClick={() => scrollTo('services')} className="hover:text-red-600 dark:hover:text-red-500 transition-colors cursor-pointer">
                  Our Services
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('partners')} className="hover:text-red-600 dark:hover:text-red-500 transition-colors cursor-pointer">
                  Tech Partners
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('clients')} className="hover:text-red-600 dark:hover:text-red-500 transition-colors cursor-pointer">
                  Client Portfolio
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('contact-form-section')} className="hover:text-red-600 dark:hover:text-red-500 transition-colors cursor-pointer">
                  Submit Support Ticket
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h4 className="text-zinc-900 dark:text-white font-extrabold mb-6 text-base tracking-tight">Contact Us</h4>
            <ul className="space-y-4 text-sm font-semibold text-zinc-600 dark:text-zinc-400">
              <li className="flex items-start gap-3.5">
                <MapPin className="w-5 h-5 text-red-600 dark:text-red-500 shrink-0 mt-0.5" />
                <span>15 Almahad st,<br />Ramallah, State Of Palestine</span>
              </li>
              <li className="flex items-center gap-3.5">
                <PhoneCall className="w-5 h-5 text-red-600 dark:text-red-500 shrink-0" />
                <div className="flex flex-col">
                  <span>02-3752111</span>
                  <span>0599998282 / 0522586177</span>
                </div>
              </li>
              <li className="flex items-center gap-3.5">
                <Mail className="w-5 h-5 text-red-600 dark:text-red-500 shrink-0" />
                <a href="mailto:info@horizon-ss.com" className="hover:text-red-500 transition-colors">
                  info@horizon-ss.com
                </a>
              </li>
              <li className="flex items-center gap-3.5">
                <Globe className="w-5 h-5 text-red-600 dark:text-red-500 shrink-0" />
                <a href="https://horizon-ss.com" target="_blank" rel="noopener noreferrer" className="hover:text-red-500 transition-colors">
                  https://horizon-ss.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-black/10 dark:border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-zinc-500 dark:text-zinc-500 font-bold tracking-wide">
          <p>Copyright © 2026 Horizon Intelligent Technology. All rights reserved.</p>
          <p className="flex items-center gap-2">
            <Shield className="w-3.5 h-3.5 text-red-600 dark:text-red-500" /> Privacy-first sovereign local infrastructure.
          </p>
        </div>
      </div>
    </footer>
  );
}
