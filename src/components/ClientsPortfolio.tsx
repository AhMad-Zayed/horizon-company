'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface Client {
  id?: string | number;
  name: string;
  subtitle: string;
  category: 'Gov' | 'Health' | 'Corporate';
  initials: string;
  logo?: any;
}

interface ClientsPortfolioProps {
  clients?: Client[];
}

const fallbackClients: Client[] = [
  { category: 'Gov', name: 'Ramallah Municipality', subtitle: 'Public Infrastructure', initials: 'RM' },
  { category: 'Gov', name: 'Ministry of Tourism & Antiquities', subtitle: 'State of Palestine', initials: 'MOT' },
  { category: 'Gov', name: 'Ministry of Awqaf', subtitle: 'State of Palestine', initials: 'MOA' },
  { category: 'Health', name: 'St. Joseph Hospital', subtitle: 'French Hospital - Jerusalem', initials: 'SJH' },
  { category: 'Health', name: 'Augusta Victoria Hospital', subtitle: 'Healthcare Setup', initials: 'AVH' },
  { category: 'Health', name: 'Al-Makassed Hospital', subtitle: 'Charitable Society', initials: 'AMH' },
  { category: 'Corporate', name: 'Masrouji Group', subtitle: 'Commercial Enterprise', initials: 'MG' },
  { category: 'Corporate', name: 'National Insurance Co.', subtitle: 'Financial Services', initials: 'NIC' },
  { category: 'Corporate', name: 'Palestine Automobile Co.', subtitle: 'Automotive & Trade', initials: 'PAC' },
  { category: 'Corporate', name: 'Unipal', subtitle: 'Distribution', initials: 'UNI' },
  { category: 'Corporate', name: 'Palestine Insurance', subtitle: 'Financial Services', initials: 'PI' },
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

export function ClientsPortfolio({ clients }: ClientsPortfolioProps) {
  const activeClients = Array.isArray(clients) && clients.length > 0 ? clients : fallbackClients;
  const [activeTab, setActiveTab] = useState<'All' | 'Gov' | 'Health' | 'Corporate'>('All');

  const filteredClients = activeTab === 'All' 
    ? activeClients 
    : activeClients.filter((c) => c.category === activeTab);

  return (
    <section id="clients" className="py-32 relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-zinc-900 dark:text-white">
            Trusted by <span className="text-red-600 dark:text-red-500">Industry Leaders</span>
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto text-lg font-medium">
            Delivering robust, sovereign local infrastructure for Palestine&apos;s most critical institutions.
          </p>
        </motion.div>

        {/* Custom Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap justify-center gap-3 mb-16"
        >
          {(['All', 'Gov', 'Health', 'Corporate'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-8 py-3 rounded-full text-sm font-extrabold transition-all duration-300 ${
                activeTab === tab
                  ? 'bg-red-600 text-white shadow-[0_0_20px_rgba(229,9,20,0.4)] scale-105'
                  : 'bg-zinc-100 dark:bg-zinc-800/50 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-white border border-black/5 dark:border-white/5'
              }`}
            >
              {tab === 'All' ? 'All Sectors' : tab === 'Gov' ? 'Public & Government' : tab === 'Health' ? 'Medical Sector' : 'Enterprise Corporate'}
            </button>
          ))}
        </motion.div>

        {/* Client Logo Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 min-h-[280px]">
          <AnimatePresence mode="popLayout">
            {filteredClients.map((client, idx) => (
              <motion.div
                key={client.id || client.name}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="glass-card group flex items-center p-5 rounded-2xl cursor-default transition-all duration-500 filter grayscale opacity-80 hover:grayscale-0 hover:opacity-100 hover:border-red-500/40"
              >
                {client.logo && (client.logo.url || typeof client.logo === 'string') ? (
                  <div className="w-16 h-16 rounded-full overflow-hidden bg-white dark:bg-zinc-800/80 border border-black/10 dark:border-zinc-700 flex items-center justify-center flex-shrink-0 group-hover:border-red-500 transition-all duration-500 relative p-2 shadow-sm">
                    <Image
                      src={cleanLocalUrl(client.logo.url || client.logo)}
                      alt={client.name}
                      fill
                      className="object-contain p-2"
                    />
                  </div>
                ) : (
                  <div className="w-16 h-16 rounded-full bg-zinc-200 dark:bg-zinc-800/80 border border-black/10 dark:border-zinc-700 flex items-center justify-center flex-shrink-0 group-hover:bg-zinc-900 dark:group-hover:bg-[#1A1A1A] group-hover:border-red-500 transition-all duration-500 shadow-sm">
                    <span className="font-extrabold text-lg text-zinc-600 dark:text-zinc-400 group-hover:text-white transition-colors">
                      {client.initials}
                    </span>
                  </div>
                )}
                <div className="ml-5 overflow-hidden">
                  <h4 className="text-zinc-900 dark:text-white font-extrabold text-base tracking-tight truncate">
                    {client.name}
                  </h4>
                  <p className="text-zinc-500 dark:text-zinc-400 text-xs mt-1 font-semibold truncate">
                    {client.subtitle}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
