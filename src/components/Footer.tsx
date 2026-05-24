'use client';

import React from 'react';
import Image from 'next/image';
import { MapPin, PhoneCall, Mail, Globe, Shield } from 'lucide-react';

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
              <Image
                src="/horizon-logo.png"
                alt="Horizon Logo"
                width={150}
                height={40}
                className="h-10 w-auto object-contain dark:brightness-110"
              />
            </div>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed max-w-sm mb-6 font-medium">
              We transform businesses of most major sectors with powerful and adaptable digital solutions that satisfy the needs of today. Horizon Intelligent Technology provides customized communications, enterprise network integrations, and advanced security solutions since 2010.
            </p>
            {/* Social Links Row */}
            <div className="flex items-center gap-3.5 mb-6">
              <a
                href="https://www.facebook.com/share/1ArLJcttj1/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center text-zinc-600 dark:text-zinc-400 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white transition-all shadow-sm duration-300"
                aria-label="Facebook"
              >
                <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24">
                  <path d="M9 8H7v3h2v9h3v-9h3.6l.4-3H12V6c0-.9.1-1.2.9-1.2H15V1h-3c-3 0-5 1.7-5 4.8V8z" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/company/horizon-intelligent-technology/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center text-zinc-600 dark:text-zinc-400 hover:bg-blue-700 hover:text-white dark:hover:bg-blue-700 dark:hover:text-white transition-all shadow-sm duration-300"
                aria-label="LinkedIn"
              >
                <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              <a
                href="https://wa.me/972522586177"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center text-zinc-600 dark:text-zinc-400 hover:bg-emerald-600 hover:text-white dark:hover:bg-emerald-600 dark:hover:text-white transition-all shadow-sm duration-300"
                aria-label="WhatsApp"
              >
                <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.625 1.451 5.437.002 9.861-4.417 9.864-9.859.002-2.637-1.019-5.117-2.877-6.979C16.398 1.951 13.924 1.01 11.285 1.01 5.848 1.01 1.427 5.428 1.424 10.87c0 1.905.525 3.766 1.523 5.393L1.936 20.73l4.71-1.576zM18.06 14.85c-.3-.15-1.774-.875-2.048-.975-.274-.1-.474-.15-.674.15-.2.3-.775.975-.95 1.175-.175.2-.35.225-.65.075-1.527-.763-2.63-1.32-3.693-3.14-.28-.48.28-.445.8-.1.467.311.52.52.795.075.275-.445.674-1.32.748-1.47.075-.15.075-.28-.037-.43-.112-.15-.975-2.35-1.338-3.225-.353-.85-.711-.735-.975-.75-.25-.015-.537-.015-.824-.015-.287 0-.756.108-1.15.539-.395.43-1.5 1.47-1.5 3.58 0 2.11 1.537 4.148 1.75 4.43.213.28 3.025 4.62 7.33 6.48 1.025.44 1.825.7 2.45.9.102.03.204.05.3.07.674.1 1.348.06 1.85-.02.562-.08 1.774-.725 2.025-1.425.25-.7.25-1.3.175-1.425-.075-.125-.275-.2-.575-.35z" />
                </svg>
              </a>
            </div>
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

        {/* Absolute Base Sub-Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-black/10 dark:border-zinc-800/60 pt-6 mt-8">
          <div className="flex flex-col md:flex-row items-center gap-4 text-xs text-zinc-500 dark:text-zinc-500 font-bold tracking-wide">
            <p>Copyright © 2026 Horizon Intelligent Technology. All rights reserved.</p>
            <p className="flex items-center gap-2">
              <Shield className="w-3.5 h-3.5 text-red-600 dark:text-red-500" /> Privacy-first sovereign local infrastructure.
            </p>
          </div>
          
          <a 
            href="https://www.atlahub.tech/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group flex flex-row items-center gap-2.5 hover:opacity-100 transition-all duration-300 cursor-pointer"
          >
            <Image 
              src="https://www.atlahub.tech/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FAtlaHub_Tech_Logo.0q9v_x~q2fbja.png&w=3840&q=75" 
              alt="AtlaHub Tech"
              width={100}
              height={20}
              unoptimized
              className="h-5 w-auto object-contain brightness-0 opacity-60 dark:invert dark:opacity-80 group-hover:opacity-100 group-hover:brightness-100 dark:group-hover:invert-0 transition-all duration-500"
            />
            <span className="text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-800 dark:group-hover:text-zinc-200 text-xs font-medium transition-colors">
              Engineered & Secured by AtlaHub Tech
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}
