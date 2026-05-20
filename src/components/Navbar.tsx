'use client';

import React, { useState, useEffect } from 'react';
import { Activity, Menu, X, Sun, Moon, ChevronDown, Server, ShieldCheck, Network, Phone, Wifi, Video, Headphones } from 'lucide-react';
import { useTheme } from 'next-themes';

const dropdownServices = [
  { title: 'Professional IT Services', icon: <Network className="w-4 h-4 text-red-500" /> },
  { title: 'Infrastructure & Data Centers', icon: <Server className="w-4 h-4 text-amber-500" /> },
  { title: 'Security & Network Solutions', icon: <ShieldCheck className="w-4 h-4 text-emerald-500" /> },
  { title: 'VoIP Solutions', icon: <Phone className="w-4 h-4 text-indigo-500" /> },
  { title: 'CCTV & Monitoring Room', icon: <Video className="w-4 h-4 text-purple-500" /> },
  { title: 'Wireless Backhaul Solutions', icon: <Wifi className="w-4 h-4 text-cyan-500" /> },
  { title: 'After Sale Support', icon: <Headphones className="w-4 h-4 text-rose-500" /> },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const dropdownTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    };
  }, []);

  const handleMouseEnter = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
      dropdownTimeoutRef.current = null;
    }
    setServicesDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setServicesDropdownOpen(false);
    }, 150);
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
  };

  const selectService = (serviceTitle: string) => {
    scrollTo('services');
    window.dispatchEvent(new CustomEvent('openServiceModal', { detail: serviceTitle }));
    setServicesDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <nav
      id="navbar"
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled || servicesDropdownOpen
          ? 'bg-white/95 dark:bg-[#09090B]/95 backdrop-blur-md border-b border-black/5 dark:border-white/5 py-4 shadow-sm dark:shadow-none'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer group" onClick={() => scrollTo('home')}>
          <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-red-700 rounded flex items-center justify-center shadow-[0_0_15px_rgba(229,9,20,0.3)] group-hover:shadow-[0_0_20px_rgba(229,9,20,0.6)] transition-all">
            <Activity className="text-white w-5 h-5" />
          </div>
          <span className="text-2xl font-extrabold tracking-tight text-zinc-900 dark:text-white transition-colors">
            Horizon<span className="text-red-500">.</span>
          </span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-semibold">
          {/* Services Dropdown */}
          <div
            className="relative py-1"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <button
              onClick={() => scrollTo('services')}
              className="flex items-center gap-1.5 text-zinc-600 dark:text-zinc-300 hover:text-red-600 dark:hover:text-white transition-colors group cursor-pointer"
            >
              Services
              <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${servicesDropdownOpen ? 'rotate-180 text-red-500' : ''}`} />
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-red-500 transition-all group-hover:w-full"></span>
            </button>

            {/* Desktop Dropdown Panel */}
            {servicesDropdownOpen && (
              <div className="absolute top-full -left-6 mt-2 w-80 bg-white dark:bg-zinc-900 border border-black/10 dark:border-white/10 rounded-2xl shadow-2xl p-3 grid gap-1 animate-in fade-in zoom-in-95 duration-200">
                <div className="px-3 py-2 text-xs font-extrabold uppercase tracking-wider text-zinc-400 border-b border-black/5 dark:border-white/5 mb-1">
                  Enterprise Infrastructure
                </div>
                {dropdownServices.map((srv) => (
                  <button
                    key={srv.title}
                    onClick={() => selectService(srv.title)}
                    className="w-full text-left px-3 py-2.5 rounded-xl flex items-center gap-3 text-sm font-bold text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-red-600 dark:hover:text-red-500 transition-all group cursor-pointer"
                  >
                    <span className="p-1 rounded bg-zinc-100 dark:bg-zinc-800 group-hover:bg-red-500/10 transition-colors">
                      {srv.icon}
                    </span>
                    {srv.title}
                  </button>
                ))}
              </div>
            )}
          </div>

          {['Partners', 'Clients', 'Why Us'].map((item) => (
            <button
              key={item}
              onClick={() => scrollTo(item.toLowerCase().replace(' ', '-'))}
              className="text-zinc-600 dark:text-zinc-300 hover:text-red-600 dark:hover:text-white transition-colors relative group py-1 cursor-pointer"
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-red-500 transition-all group-hover:w-full"></span>
            </button>
          ))}
        </div>

        {/* Actions (Theme Toggle + CTA) */}
        <div className="hidden md:flex items-center gap-6">
          {mounted ? (
            <button
              onClick={toggleTheme}
              aria-label="Toggle Dark and Light Mode"
              className="p-2.5 rounded-full bg-zinc-100 dark:bg-zinc-800/80 text-zinc-600 dark:text-zinc-300 hover:text-red-600 dark:hover:text-red-500 border border-black/5 dark:border-white/5 transition-all duration-500 hover:scale-110 shadow-sm cursor-pointer"
            >
              {resolvedTheme === 'dark' ? (
                <Sun className="w-5 h-5 transition-transform duration-500 rotate-0 hover:rotate-90 text-amber-400" />
              ) : (
                <Moon className="w-5 h-5 transition-transform duration-500 rotate-0 hover:-rotate-90 text-indigo-600" />
              )}
            </button>
          ) : (
            <div className="w-[42px] h-[42px] rounded-full bg-zinc-100 dark:bg-zinc-800/80 border border-black/5 dark:border-white/5 animate-pulse" />
          )}

          <button
            onClick={() => scrollTo('contact-form-section')}
            className="px-6 py-2.5 bg-red-600 hover:bg-red-500 text-white text-sm font-bold rounded-lg transition-all shadow-[0_0_15px_rgba(229,9,20,0.3)] hover:shadow-[0_0_25px_rgba(229,9,20,0.5)] cursor-pointer"
          >
            Support Ticket
          </button>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-4 md:hidden">
          {mounted ? (
            <button
              onClick={toggleTheme}
              aria-label="Toggle Dark and Light Mode"
              className="p-2 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300"
            >
              {resolvedTheme === 'dark' ? (
                <Sun className="w-5 h-5 text-amber-400" />
              ) : (
                <Moon className="w-5 h-5 text-indigo-600" />
              )}
            </button>
          ) : (
            <div className="w-[36px] h-[36px] rounded-full bg-zinc-100 dark:bg-zinc-800/80 animate-pulse" />
          )}
          <button
            className="text-zinc-900 dark:text-white p-1 cursor-pointer"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white/95 dark:bg-[#09090B]/95 backdrop-blur-xl border-b border-black/10 dark:border-white/10 flex flex-col p-8 gap-6 md:hidden shadow-xl animate-in fade-in slide-in-from-top-4 duration-300 max-h-[85vh] overflow-y-auto">
          <div className="border-b border-black/5 dark:border-white/5 pb-4">
            <button
              onClick={() => scrollTo('services')}
              className="text-left text-xl font-extrabold text-zinc-900 dark:text-white hover:text-red-600 dark:hover:text-red-500 transition-colors mb-3 flex items-center justify-between w-full"
            >
              <span>Services</span>
              <ChevronDown className="w-5 h-5 text-red-500" />
            </button>
            <div className="grid gap-2 pl-4 border-l-2 border-red-500/30">
              {dropdownServices.map((srv) => (
                <button
                  key={srv.title}
                  onClick={() => selectService(srv.title)}
                  className="text-left text-base font-bold text-zinc-600 dark:text-zinc-400 hover:text-red-600 dark:hover:text-red-500 py-1.5 flex items-center gap-2.5"
                >
                  {srv.icon}
                  {srv.title}
                </button>
              ))}
            </div>
          </div>

          {['Partners', 'Clients', 'Why Us'].map((item) => (
            <button
              key={item}
              onClick={() => scrollTo(item.toLowerCase().replace(' ', '-'))}
              className="text-left text-xl font-extrabold text-zinc-900 dark:text-white hover:text-red-600 dark:hover:text-red-500 transition-colors"
            >
              {item}
            </button>
          ))}

          <button
            onClick={() => scrollTo('contact-form-section')}
            className="w-full py-4 bg-red-600 hover:bg-red-500 text-white text-base font-bold rounded-xl text-center shadow-[0_0_15px_rgba(229,9,20,0.3)] mt-2 cursor-pointer"
          >
            Submit Support Ticket
          </button>
        </div>
      )}
    </nav>
  );
}
