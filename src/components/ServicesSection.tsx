'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  Server,
  ShieldCheck,
  Network,
  Phone,
  Wifi,
  Video,
  Headphones,
  Shield,
  Activity,
  ChevronRight,
  X,
  Check,
  ArrowRight,
  HelpCircle,
} from 'lucide-react';

// ─── Strict Types ────────────────────────────────────────────────────────────

interface Service {
  id?: string | number;
  title: string;
  description: string;
  iconName: string;
  expandedDetails?: string[];
}

interface ServicesSectionProps {
  services?: Service[];
}

// ─── Safe Icon Registry ───────────────────────────────────────────────────────
// Each key maps to an icon component reference (not a JSX element) to avoid
// stale-closure issues and ensure full TypeScript safety.

type IconComponent = React.FC<{ className?: string }>;

const ICON_REGISTRY: Readonly<Record<string, IconComponent>> = {
  Server,
  ShieldCheck,
  Network,
  Phone,
  Wifi,
  Video,
  Headphones,
  Shield,
  Activity,
} as const;

/**
 * Safely resolves an icon from the registry.
 * Falls back to `Server` if the name is missing or misspelled in the CMS.
 * Never throws; never returns undefined.
 */
function getIcon(iconName: string, className = 'w-full h-full'): React.ReactElement {
  const trimmed = (iconName ?? '').trim();
  const IconComponent: IconComponent =
    Object.prototype.hasOwnProperty.call(ICON_REGISTRY, trimmed)
      ? ICON_REGISTRY[trimmed]
      : HelpCircle;
  return <IconComponent className={className} />;
}

// ─── Fallback Data ────────────────────────────────────────────────────────────

const defaultServicesData: Service[] = [
  {
    iconName: 'Network',
    title: 'Professional IT Services',
    description: 'Advanced technical consulting, deployment, and seamless system integration for major sectors.',
    expandedDetails: [
      'Strategic IT roadmap consulting & digital transformation architecture',
      'Legacy infrastructure modernization with zero operational downtime',
      'Customized enterprise software & network integration',
      'SLA-backed managed IT operations tailored for hospitals, municipalities, and corporations',
      'Rigorous compliance and data sovereignty audits',
    ],
  },
  {
    iconName: 'Server',
    title: 'Infrastructure & Data Centers',
    description: 'Designing, implementing, and modernizing complex enterprise networks and robust data centers.',
    expandedDetails: [
      'Tier-3 & Tier-4 redundant data center engineering and build-outs',
      'High-performance structured cabling and fiber optic backbone deployments',
      'Cisco, Juniper, and HP enterprise routing and core switching setups',
      'Server virtualization (VMware/Hyper-V) and hyper-converged storage solutions',
      'Advanced environmental monitoring and uninterrupted power architectures',
    ],
  },
  {
    iconName: 'ShieldCheck',
    title: 'Security & Network Solutions',
    description: 'Comprehensive information security strategies, enterprise firewalls, and active threat mitigation.',
    expandedDetails: [
      'Next-Generation Enterprise Firewalls (Fortinet, Palo Alto, Cisco ASA)',
      'Zero-Trust Network Access (ZTNA) and secure remote VPN architectures',
      '24/7 Active Intrusion Detection and Prevention Systems (IDPS)',
      'Endpoint Detection and Response (EDR) with real-time ransomware quarantine',
      'Vulnerability assessments, penetration testing, and security hardening',
    ],
  },
  {
    iconName: 'Phone',
    title: 'VoIP Solutions',
    description: 'High-end, customized corporate communication architecture tailored for industrial scales.',
    expandedDetails: [
      'Secure, high-definition enterprise IP telephony and PBX deployments',
      'Multi-site Unified Communications connecting distributed branches seamlessly',
      'SIP trunking and advanced call routing algorithms',
      'Integrated call recording, analytics, and CRM call center software pop-ups',
      'Encrypted voice traffic preventing corporate espionage',
    ],
  },
  {
    iconName: 'Video',
    title: 'CCTV & Monitoring Room',
    description: 'Turnkey commercial surveillance and specialized command control center setups.',
    expandedDetails: [
      'High-resolution 4K IP surveillance networks for indoor and expansive outdoor perimeters',
      'Advanced video analytics including license plate recognition (ALPR) and perimeter breach alerts',
      'Centralized command & control video wall installations',
      'Redundant, fail-safe NVR/SAN storage archives with automated cloud backups',
      'Integration with physical access control and biometric security gates',
    ],
  },
  {
    iconName: 'Wifi',
    title: 'Wireless Backhaul Solutions',
    description: 'Long-range, high-speed corporate internet and robust wireless backhaul deployments.',
    expandedDetails: [
      'Carrier-grade point-to-point and point-to-multipoint microwave links',
      'Long-range outdoor Wi-Fi backhaul bridging distant municipal or campus buildings',
      'High-bandwidth wireless mesh networks engineered for dense corporate environments',
      'Automated failover links ensuring 99.99% uptime during fiber cuts',
      'Military-grade wireless encryption protocols',
    ],
  },
];

const afterSaleService: Service = {
  iconName: 'Headphones',
  title: 'After Sale Support & Maintenance',
  description:
    "We don't just deploy and leave. We ensure absolute business continuity with enterprise-grade technical support, maintenance, and instant troubleshooting post-installation.",
  expandedDetails: [
    'Guaranteed 1-hour emergency response time from certified local engineers',
    '24/7 remote monitoring and rapid-resolution ticketing system',
    'Routine scheduled preventive maintenance and firmware patching',
    'On-site emergency dispatch with pre-stocked critical replacement hardware',
    'Dedicated account manager and direct engineering escalation line',
  ],
};

// ─── Component ────────────────────────────────────────────────────────────────

export function ServicesSection({ services }: ServicesSectionProps) {
  const activeServices: Service[] =
    Array.isArray(services) && services.length > 0 ? services : defaultServicesData;

  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, amount: 0.2 });

  // Typed CustomEvent handler — dispatched from Navbar dropdown
  useEffect(() => {
    const handleOpenModal = (event: Event) => {
      const customEvent = event as CustomEvent<string>;
      const srvTitle = typeof customEvent.detail === 'string' ? customEvent.detail : '';
      if (!srvTitle) return;
      const found = [...activeServices, afterSaleService].find((s) =>
        s.title.toLowerCase().includes(srvTitle.toLowerCase())
      );
      if (found) setSelectedService(found);
    };

    window.addEventListener('openServiceModal', handleOpenModal);
    return () => window.removeEventListener('openServiceModal', handleOpenModal);
  }, [activeServices]);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedService(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleConsultationClick = (serviceTitle: string) => {
    setSelectedService(null);
    const formSection = document.getElementById('contact-form-section');
    if (!formSection) return;
    formSection.scrollIntoView({ behavior: 'smooth' });
    const selectElement = document.getElementById('serviceOfInterest') as HTMLSelectElement | null;
    if (!selectElement) return;
    for (let i = 0; i < selectElement.options.length; i++) {
      const optVal = selectElement.options[i].value.toLowerCase();
      if (optVal.includes(serviceTitle.toLowerCase()) || serviceTitle.toLowerCase().includes(optVal)) {
        selectElement.selectedIndex = i;
        break;
      }
    }
  };

  return (
    <section id="services" className="py-32 relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 text-red-600 dark:text-red-500 text-xs font-extrabold mb-3 tracking-wider uppercase">
            <Activity className="w-3.5 h-3.5" /> High-End Capability
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-zinc-900 dark:text-white">
            Elite <span className="text-red-600 dark:text-red-500">Services</span> Architecture
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl text-lg font-medium">
            Comprehensive digital infrastructure solutions engineered for performance, security, and absolute reliability.
          </p>
        </motion.div>

        {/* 6 Core Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activeServices.map((service, idx) => (
            <motion.div
              key={String(service.id ?? idx)}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              onClick={() => setSelectedService(service)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && setSelectedService(service)}
              aria-label={`Learn more about ${service.title}`}
              className="glass-card group p-8 rounded-2xl h-full flex flex-col relative overflow-hidden cursor-pointer hover:border-red-500/40 transition-all duration-500 hover:scale-[1.02] focus-visible:ring-2 focus-visible:ring-red-500 outline-none"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-bl-full group-hover:bg-red-500/10 transition-colors pointer-events-none" />

              <div className="w-14 h-14 rounded-xl bg-zinc-100 dark:bg-zinc-800/50 border border-black/5 dark:border-white/5 flex items-center justify-center mb-6 group-hover:bg-red-500/10 group-hover:border-red-500/30 transition-all duration-300 shadow-sm">
                <div className="w-6 h-6 text-zinc-700 dark:text-zinc-300 group-hover:text-red-600 dark:group-hover:text-red-500 transition-colors [&>svg]:w-full [&>svg]:h-full flex items-center justify-center">
                  {getIcon(service.iconName)}
                </div>
              </div>
              <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-3 group-hover:text-red-600 dark:group-hover:text-red-500 transition-colors tracking-tight">
                {service.title}
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed mb-6 flex-grow font-medium">
                {service.description}
              </p>
              <div className="flex items-center text-sm font-extrabold text-red-600 dark:text-red-500 transform group-hover:translate-x-1 transition-all duration-300">
                Learn More <ChevronRight className="w-4 h-4 ml-1" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* 7th Service (After Sale Support) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
          className="mt-8 cursor-pointer"
          onClick={() => setSelectedService(afterSaleService)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && setSelectedService(afterSaleService)}
          aria-label="Learn more about After Sale Support"
        >
          <div className="glass-card group p-8 md:p-12 rounded-2xl flex flex-col md:flex-row items-center gap-8 overflow-hidden relative border-red-500/20 hover:border-red-500/50 transition-all duration-500 shadow-xl hover:scale-[1.01]">
            <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-red-600/10 to-transparent pointer-events-none" />
            <div className="w-16 h-16 rounded-full bg-red-500/10 dark:bg-red-500/20 border border-red-500/30 dark:border-red-500/40 flex items-center justify-center flex-shrink-0 shadow-inner group-hover:scale-110 transition-transform duration-300">
              <Headphones className="w-8 h-8 text-red-600 dark:text-red-500" />
            </div>
            <div className="flex-grow">
              <h3 className="text-2xl font-extrabold text-zinc-900 dark:text-white mb-2 group-hover:text-red-500 transition-colors tracking-tight">
                Premium After-Sale Support
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400 max-w-3xl font-medium leading-relaxed mb-2">
                We don&apos;t just deploy and leave. We ensure absolute business continuity with enterprise-grade technical
                support, maintenance, and instant troubleshooting post-installation.
              </p>
              <span className="inline-flex items-center text-sm font-extrabold text-red-600 dark:text-red-500 group-hover:translate-x-1 transition-transform">
                Explore SLA Options <ChevronRight className="w-4 h-4 ml-1" />
              </span>
            </div>
          </div>
        </motion.div>

        {/* ─── Framer Motion Modal Overlay ─── */}
        <AnimatePresence>
          {selectedService && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-black/60 backdrop-blur-md"
              onClick={(e) => { if (e.target === e.currentTarget) setSelectedService(null); }}
              role="dialog"
              aria-modal="true"
              aria-label={`Service detail: ${selectedService.title}`}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.3 }}
                className="w-full max-w-2xl bg-white dark:bg-[#121216] border border-black/10 dark:border-white/10 rounded-3xl p-6 md:p-10 shadow-2xl relative overflow-hidden max-h-[90vh] overflow-y-auto"
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/10 rounded-full blur-[90px] pointer-events-none" />

                {/* Close Button */}
                <button
                  onClick={() => setSelectedService(null)}
                  aria-label="Close service detail"
                  className="absolute top-6 right-6 p-2 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer z-10"
                >
                  <X className="w-6 h-6" />
                </button>

                {/* Modal Header */}
                <div className="flex items-center gap-4 mb-6 pr-12">
                  <div className="w-14 h-14 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-500 flex items-center justify-center flex-shrink-0">
                    <div className="w-7 h-7 [&>svg]:w-full [&>svg]:h-full flex items-center justify-center">
                      {getIcon(selectedService.iconName)}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl md:text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
                      {selectedService.title}
                    </h3>
                    <p className="text-zinc-500 dark:text-zinc-400 text-xs font-bold uppercase tracking-wider mt-0.5">
                      Enterprise Architecture &amp; Specification
                    </p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-zinc-600 dark:text-zinc-300 text-base leading-relaxed font-medium mb-8">
                  {selectedService.description}
                </p>

                {/* Expanded Details */}
                {Array.isArray(selectedService.expandedDetails) && selectedService.expandedDetails.length > 0 && (
                  <div className="mb-8 space-y-3 bg-zinc-50 dark:bg-zinc-900/50 p-6 rounded-2xl border border-black/5 dark:border-white/5">
                    <h4 className="text-xs font-extrabold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-3">
                      Key Deliverables &amp; Capabilities
                    </h4>
                    {selectedService.expandedDetails.map((detail, idx) => (
                      <div key={idx} className="flex items-start gap-3 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                        <Check className="w-4 h-4 text-red-600 dark:text-red-500 flex-shrink-0 mt-1" />
                        <span>{detail}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* CTA */}
                <button
                  onClick={() => handleConsultationClick(selectedService.title)}
                  className="w-full py-4 bg-red-600 hover:bg-red-500 text-white font-extrabold rounded-xl transition-all shadow-[0_0_20px_rgba(229,9,20,0.3)] hover:shadow-[0_0_30px_rgba(229,9,20,0.6)] flex items-center justify-center gap-2 text-base cursor-pointer"
                >
                  Request Consultation for {selectedService.title} <ArrowRight className="w-5 h-5 ml-1" />
                </button>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
