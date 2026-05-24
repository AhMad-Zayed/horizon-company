'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Server, Clock, Users, Cpu, Award } from 'lucide-react';

export function AboutSection() {
  return (
    <section id="about" className="py-32 relative z-10 overflow-hidden bg-zinc-50/50 dark:bg-[#0D0D11]/50 border-y border-black/5 dark:border-white/5 transition-colors">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-[140px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column: Narrative */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-500/10 dark:bg-red-500/15 border border-red-500/20 text-red-600 dark:text-red-500 text-sm font-extrabold tracking-wide">
              <Award className="w-4 h-4" />
              Horizon ( Intelligent Technology / Smart Solutions )
            </div>
            
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white leading-[1.15]">
              Transforming Major Enterprise <br />
              <span className="text-gradient-red">Infrastructure Since 2010.</span>
            </h2>

            <div className="space-y-6 text-zinc-600 dark:text-zinc-300 font-medium leading-relaxed text-lg">
              <p>
                Horizon ( Intelligent Technology / Smart Solutions ) was formed in 2010 with a clear vision to provide elite IT solutions and sovereign equipment. Our qualified team implements complex turnkey projects including enterprise networks, mission-critical data centers, VoIP solutions, information security, programming, and long-range wireless backhaul.
              </p>
              <p>
                We recruit first-class engineers who specialize in seamless integration, 24/7 maintenance, active support, advanced technical consulting, and precision installation. We maintain and modernize IT infrastructure to solve specific operational bottlenecks before they impact business continuity.
              </p>
              <p className="border-l-4 border-red-600 pl-5 text-zinc-900 dark:text-white font-bold italic text-base">
                &quot;We firmly believe that superior professional services and unwavering customer satisfaction are the cornerstone of our success. Your business depends on your IT systems—and we ensure they perform flawlessly.&quot;
              </p>
            </div>
          </motion.div>

          {/* Right Column: Key Corporate Pillars */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 grid grid-cols-1 gap-6"
          >
            <div className="glass-card p-6 rounded-2xl flex items-start gap-5 border-l-4 border-l-red-600 group hover:scale-[1.02] transition-transform">
              <div className="p-3.5 rounded-xl bg-red-500/10 text-red-600 dark:text-red-500 flex-shrink-0 mt-1">
                <Users className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-zinc-900 dark:text-white mb-1 tracking-tight">5–10+ Years Minimum Experience</h3>
                <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed font-medium">
                  We hire only seasoned professional technicians. We provide continuous education on latest tech so we never train on your dime.
                </p>
              </div>
            </div>

            <div className="glass-card p-6 rounded-2xl flex items-start gap-5 border-l-4 border-l-amber-500 group hover:scale-[1.02] transition-transform">
              <div className="p-3.5 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-500 flex-shrink-0 mt-1">
                <Clock className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-zinc-900 dark:text-white mb-1 tracking-tight">1 Hour Guaranteed Response</h3>
                <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed font-medium">
                  Emergency response time is one hour or less guaranteed. A live professional agent will answer your call instantly or handle your online ticket.
                </p>
              </div>
            </div>

            <div className="glass-card p-6 rounded-2xl flex items-start gap-5 border-l-4 border-l-indigo-500 group hover:scale-[1.02] transition-transform">
              <div className="p-3.5 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-500 flex-shrink-0 mt-1">
                <Cpu className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-zinc-900 dark:text-white mb-1 tracking-tight">Remote-First Rapid Resolution</h3>
                <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed font-medium">
                  We securely access your PCs or servers remotely to resolve many critical issues immediately without waiting for travel delays.
                </p>
              </div>
            </div>

            <div className="glass-card p-6 rounded-2xl flex items-start gap-5 border-l-4 border-l-emerald-500 group hover:scale-[1.02] transition-transform">
              <div className="p-3.5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-500 flex-shrink-0 mt-1">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-zinc-900 dark:text-white mb-1 tracking-tight">Turnkey Sovereign Solutions</h3>
                <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed font-medium">
                  Complete design, hardware supply, customized communications, and premium post-installation maintenance for all major industry sectors.
                </p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
