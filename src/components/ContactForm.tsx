'use client';

import React, { useState, useTransition } from 'react';
import { submitContactForm } from '@/app/actions/contact';
import { CheckCircle, AlertCircle, Loader2, Send, MessageSquare, Phone, Building2 } from 'lucide-react';

const servicesList = [
  'General Inquiry / Consultation',
  'Professional IT Services',
  'Infrastructure & Data Centers',
  'Security & Network Solutions',
  'VoIP Solutions',
  'CCTV & Monitoring Room',
  'Wireless Backhaul Solutions',
  'After Sale Support & Maintenance',
];

export function ContactForm() {
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<{ success?: boolean; message?: string; error?: string } | null>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setResult(null);

    const formData = new FormData(event.currentTarget);
    const formElement = event.currentTarget;

    startTransition(async () => {
      const res = await submitContactForm(null, formData);
      setResult(res);
      if (res && res.success) {
        formElement.reset();
      }
    });
  };

  return (
    <div id="contact-form-section" className="glass-card p-8 sm:p-12 rounded-3xl relative overflow-hidden border border-black/10 dark:border-white/10 shadow-2xl dark:shadow-none bg-white/70 dark:bg-zinc-900/60 backdrop-blur-2xl">
      <div className="absolute top-0 right-0 w-80 h-80 bg-red-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 text-red-600 dark:text-red-500 text-xs font-extrabold mb-3 tracking-wider uppercase">
          <MessageSquare className="w-3.5 h-3.5" /> Direct Support & Ticketing
        </div>
        <h3 className="text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight mb-2">
          Submit an Inquiry or Support Ticket
        </h3>
        <p className="text-zinc-600 dark:text-zinc-400 text-sm font-medium">
          Guaranteed 1-hour response from our live enterprise engineering team in Ramallah.
        </p>
      </div>

      {result?.success && (
        <div className="mb-8 p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-500/30 text-emerald-800 dark:text-emerald-400 flex items-start gap-4 animate-in fade-in zoom-in duration-300">
          <CheckCircle className="w-6 h-6 flex-shrink-0 mt-0.5 text-emerald-600 dark:text-emerald-400" />
          <div>
            <h4 className="font-extrabold text-base mb-1">Ticket Successfully Created!</h4>
            <p className="text-sm font-medium">{result.message}</p>
          </div>
        </div>
      )}

      {result?.error && (
        <div className="mb-8 p-6 rounded-2xl bg-red-50 dark:bg-red-500/10 border border-red-500/30 text-red-800 dark:text-red-400 flex items-start gap-4 animate-in fade-in zoom-in duration-300">
          <AlertCircle className="w-6 h-6 flex-shrink-0 mt-0.5 text-red-600 dark:text-red-400" />
          <div>
            <h4 className="font-extrabold text-base mb-1">Submission Failed</h4>
            <p className="text-sm font-medium">{result.error}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-xs font-extrabold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-2">
              Full Name <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              placeholder="e.g. Wesam Subhi"
              disabled={isPending}
              className="w-full px-4 py-3.5 rounded-xl bg-zinc-100/80 dark:bg-zinc-800/80 border border-black/5 dark:border-white/5 text-zinc-900 dark:text-white placeholder-zinc-400 font-medium focus:outline-none focus:ring-2 focus:ring-red-600 dark:focus:ring-red-500 transition-all disabled:opacity-50"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-xs font-extrabold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-2">
              Email Address <span className="text-red-600">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              placeholder="e.g. wesam@enterprise.com"
              disabled={isPending}
              className="w-full px-4 py-3.5 rounded-xl bg-zinc-100/80 dark:bg-zinc-800/80 border border-black/5 dark:border-white/5 text-zinc-900 dark:text-white placeholder-zinc-400 font-medium focus:outline-none focus:ring-2 focus:ring-red-600 dark:focus:ring-red-500 transition-all disabled:opacity-50"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label htmlFor="phone" className="block text-xs font-extrabold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-2">
              Phone Number
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-zinc-400">
                <Phone className="w-4 h-4" />
              </span>
              <input
                type="tel"
                id="phone"
                name="phone"
                placeholder="0599998282"
                disabled={isPending}
                className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-zinc-100/80 dark:bg-zinc-800/80 border border-black/5 dark:border-white/5 text-zinc-900 dark:text-white placeholder-zinc-400 font-medium focus:outline-none focus:ring-2 focus:ring-red-600 dark:focus:ring-red-500 transition-all disabled:opacity-50"
              />
            </div>
          </div>

          <div>
            <label htmlFor="company" className="block text-xs font-extrabold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-2">
              Company / Institution
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-zinc-400">
                <Building2 className="w-4 h-4" />
              </span>
              <input
                type="text"
                id="company"
                name="company"
                placeholder="e.g. Horizon Smart Solutions"
                disabled={isPending}
                className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-zinc-100/80 dark:bg-zinc-800/80 border border-black/5 dark:border-white/5 text-zinc-900 dark:text-white placeholder-zinc-400 font-medium focus:outline-none focus:ring-2 focus:ring-red-600 dark:focus:ring-red-500 transition-all disabled:opacity-50"
              />
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="serviceOfInterest" className="block text-xs font-extrabold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-2">
            Service of Interest
          </label>
          <select
            id="serviceOfInterest"
            name="serviceOfInterest"
            disabled={isPending}
            className="w-full px-4 py-3.5 rounded-xl bg-zinc-100/80 dark:bg-zinc-800/80 border border-black/5 dark:border-white/5 text-zinc-900 dark:text-white font-semibold focus:outline-none focus:ring-2 focus:ring-red-600 dark:focus:ring-red-500 transition-all disabled:opacity-50 cursor-pointer"
          >
            {servicesList.map((srv) => (
              <option key={srv} value={srv} className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white py-2">
                {srv}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="message" className="block text-xs font-extrabold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-2">
            Inquiry or Issue Description <span className="text-red-600">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            required
            placeholder="Please describe your IT modernization needs, security requirements, or urgent support request..."
            disabled={isPending}
            className="w-full px-4 py-3.5 rounded-xl bg-zinc-100/80 dark:bg-zinc-800/80 border border-black/5 dark:border-white/5 text-zinc-900 dark:text-white placeholder-zinc-400 font-medium focus:outline-none focus:ring-2 focus:ring-red-600 dark:focus:ring-red-500 transition-all disabled:opacity-50 resize-y"
          />
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full py-4 bg-red-600 hover:bg-red-500 text-white font-extrabold rounded-xl transition-all shadow-[0_0_20px_rgba(229,9,20,0.3)] hover:shadow-[0_0_30px_rgba(229,9,20,0.6)] flex items-center justify-center gap-3 text-base disabled:opacity-50 cursor-pointer"
        >
          {isPending ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" /> Submitting Ticket...
            </>
          ) : (
            <>
              <Send className="w-5 h-5" /> Submit Support Inquiry
            </>
          )}
        </button>
      </form>
    </div>
  );
}
