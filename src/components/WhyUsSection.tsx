'use client';

import React from 'react';
import { motion } from 'framer-motion';

const metrics = [
  {
    val: '1',
    unit: 'hr',
    title: 'Guaranteed Response',
    desc: 'Emergency response time is one hour or less guaranteed. Live agents and streamlined ticketing system at your disposal.',
    highlight: true,
  },
  {
    val: '10',
    unit: '+',
    title: 'Years Avg. Experience',
    desc: 'We hire only seasoned professionals. No training on your dime. Our engineers receive continuous education on latest tech.',
    highlight: false,
  },
  {
    val: 'Remote',
    unit: '',
    title: 'First Resolution',
    desc: 'We securely log into your servers remotely to resolve critical infrastructure issues immediately, bypassing travel delays.',
    highlight: false,
  },
];

export function WhyUsSection() {
  return (
    <section id="why-us" className="py-24 bg-zinc-50 dark:bg-[#0D0D11] border-y border-black/5 dark:border-white/5 transition-colors">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {metrics.map((m, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className={`border-l-2 pl-6 transition-colors duration-300 ${
                m.highlight
                  ? 'border-red-600 dark:border-red-500'
                  : 'border-zinc-300 dark:border-zinc-700 hover:border-red-600 dark:hover:border-red-500'
              }`}
            >
              <div className="text-5xl font-extrabold text-zinc-900 dark:text-white mb-2 tracking-tight">
                {m.val}
                <span className="text-red-600 dark:text-red-500">{m.unit}</span>
              </div>
              <h4 className="text-lg font-bold text-zinc-900 dark:text-white mb-2">{m.title}</h4>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed">{m.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
