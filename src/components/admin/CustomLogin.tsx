'use client';
import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Shield, AlertTriangle, ArrowRight, CheckCircle } from 'lucide-react';
import { AdminLogo } from './AdminLogo';

export function CustomLogin() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams?.get('redirect') || '/admin';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [step, setStep] = useState<'credentials' | '2fa'>('credentials');
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCredentialsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please enter your email and password.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/users/2fa/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.status === 401 && data.error === '2FA_REQUIRED') {
        // Multi-Factor Authentication is active for this account! Move to Step 2
        setStep('2fa');
        setLoading(false);
        return;
      }

      if (!res.ok || data.error) {
        setError(data.error || 'Invalid credentials or account locked.');
        setLoading(false);
        return;
      }

      // Successful login without 2FA needed
      router.push(redirectUrl);
      router.refresh();
    } catch (err: any) {
      setError('Failed to authenticate session.');
      setLoading(false);
    }
  };

  const handle2FASubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || token.length < 6) {
      setError('Please enter a valid 6-digit security PIN.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/users/2fa/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, token }),
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        setError(data.error || 'Invalid Security Token');
        setLoading(false);
        return;
      }

      // Successful 2FA verification & login!
      router.push(redirectUrl);
      router.refresh();
    } catch (err: any) {
      setError('Invalid Security Token');
      setLoading(false);
    }
  };

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'radial-gradient(circle at 50% 50%, #111115 0%, #040406 100%)', padding: '1.5rem', color: '#f4f4f5', fontFamily: 'system-ui, -apple-system, sans-serif', zIndex: 999999 }}>
      <div style={{ width: '100%', maxWidth: '440px', background: 'rgba(13, 13, 17, 0.75)', backdropFilter: 'blur(24px)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '1rem', padding: '3.5rem 3rem', boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.9)' }}>
        <AdminLogo />

        {error && (
          <div style={{ padding: '1rem', backgroundColor: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '0.75rem', color: '#f87171', fontWeight: 'bold', fontSize: '0.85rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <AlertTriangle size={18} /> {error}
          </div>
        )}

        {step === 'credentials' ? (
          <form onSubmit={handleCredentialsSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 'bold', color: '#e4e4e7' }}>Email Address *</label>
              <input
                type="email"
                placeholder="admin@horizon.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{ padding: '0.875rem 1rem', borderRadius: '0.75rem', border: '1px solid rgba(255, 255, 255, 0.15)', backgroundColor: 'rgba(0, 0, 0, 0.6)', color: '#ffffff', fontSize: '1rem', outline: 'none' }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 'bold', color: '#e4e4e7' }}>Password *</label>
              <input
                type="password"
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{ padding: '0.875rem 1rem', borderRadius: '0.75rem', border: '1px solid rgba(255, 255, 255, 0.15)', backgroundColor: 'rgba(0, 0, 0, 0.6)', color: '#ffffff', fontSize: '1rem', outline: 'none' }}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{ marginTop: '0.5rem', padding: '0.875rem 1.75rem', borderRadius: '0.75rem', backgroundColor: '#ef4444', border: 'none', color: '#ffffff', fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', boxShadow: '0 4px 12px rgba(239, 68, 68, 0.3)' }}
            >
              {loading ? 'Authenticating...' : 'Secure Login'} <ArrowRight size={18} />
            </button>
          </form>
        ) : (
          <form onSubmit={handle2FASubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '1rem', backgroundColor: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem auto' }}>
                <Shield size={24} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '800', margin: 0, color: '#ffffff' }}>
                Multi-Factor Verification (2FA)
              </h3>
              <p style={{ fontSize: '0.85rem', color: '#a1a1aa', margin: '0.5rem 0 0 0', lineHeight: '1.4' }}>
                Enter the 6-digit TOTP token generated by Duo or Google Authenticator.
              </p>
            </div>

            <input
              type="text"
              placeholder="123456"
              maxLength={6}
              value={token}
              onChange={(e) => setToken(e.target.value)}
              required
              autoFocus
              style={{ width: '100%', padding: '0.875rem 1rem', borderRadius: '0.75rem', border: '2px solid #ef4444', backgroundColor: 'rgba(0, 0, 0, 0.8)', color: '#ffffff', fontSize: '1.5rem', letterSpacing: '0.5em', fontFamily: 'monospace', textAlign: 'center', outline: 'none', boxShadow: '0 0 15px rgba(239, 68, 68, 0.2)' }}
            />

            <button
              type="submit"
              disabled={loading}
              style={{ width: '100%', padding: '0.875rem 1.75rem', borderRadius: '0.75rem', backgroundColor: '#ef4444', border: 'none', color: '#ffffff', fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', boxShadow: '0 4px 12px rgba(239, 68, 68, 0.3)' }}
            >
              {loading ? 'Verifying PIN...' : 'Verify & Continue'} <CheckCircle size={18} />
            </button>

            <button
              type="button"
              onClick={() => { setStep('credentials'); setToken(''); }}
              style={{ background: 'transparent', border: 'none', color: '#a1a1aa', fontSize: '0.85rem', cursor: 'pointer', textDecoration: 'underline' }}
            >
              Back to Credentials
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
