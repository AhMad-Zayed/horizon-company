'use client';
import React, { useState } from 'react';
import { Shield, Key, CheckCircle, AlertTriangle, Lock } from 'lucide-react';

export function TwoFactorField() {
  const [loading, setLoading] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);
  const [secret, setSecret] = useState<string | null>(null);
  const [token, setToken] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [enabled, setEnabled] = useState(false);

  const startSetup = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const res = await fetch('/api/users/2fa/setup', { method: 'POST' });
      const data = await res.json();
      if (data.error) {
        setError(data.error);
      } else {
        setQrCodeUrl(data.qrCodeUrl);
        setSecret(data.secret);
      }
    } catch (err) {
      setError('Failed to contact MFA setup service.');
    } finally {
      setLoading(false);
    }
  };

  const verifyToken = async () => {
    if (!token || token.length < 6) {
      setError('Please enter a valid 6-digit PIN');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/users/2fa/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      });
      const data = await res.json();
      if (data.error || !res.ok) {
        setError(data.error || 'Invalid Security Token');
      } else {
        setSuccess('MFA successfully enabled & verified!');
        setEnabled(true);
        setQrCodeUrl(null);
      }
    } catch (err) {
      setError('Invalid Security Token');
    } finally {
      setLoading(false);
    }
  };

  const disableMFA = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/users/2fa/disable', { method: 'POST' });
      if (res.ok) {
        setEnabled(false);
        setSuccess('MFA successfully disabled.');
        setQrCodeUrl(null);
      } else {
        setError('Failed to disable MFA.');
      }
    } catch (err) {
      setError('Failed to disable MFA.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '2rem', backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '1rem', marginTop: '2rem', color: '#f4f4f5', fontFamily: 'system-ui, -apple-system, sans-serif', maxWidth: '640px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.4)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', borderBottom: '1px solid #27272a', paddingBottom: '1rem' }}>
        <div style={{ width: '40px', height: '40px', borderRadius: '0.75rem', backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', color: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Shield size={20} />
        </div>
        <div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: '800', margin: 0, color: '#ffffff' }}>
            Multi-Factor Authentication (2FA)
          </h3>
          <p style={{ fontSize: '0.85rem', color: '#a1a1aa', margin: '0.25rem 0 0 0' }}>
            Protect your executive account with Time-based One-Time Passwords (TOTP).
          </p>
        </div>
      </div>

      {error && (
        <div style={{ padding: '1rem', backgroundColor: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '0.75rem', color: '#f87171', fontWeight: 'bold', fontSize: '0.85rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <AlertTriangle size={18} /> {error}
        </div>
      )}

      {success && (
        <div style={{ padding: '1rem', backgroundColor: 'rgba(34, 197, 94, 0.15)', border: '1px solid rgba(34, 197, 94, 0.3)', borderRadius: '0.75rem', color: '#4ade80', fontWeight: 'bold', fontSize: '0.85rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <CheckCircle size={18} /> {success}
        </div>
      )}

      {enabled ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '1rem', backgroundColor: '#27272a', borderRadius: '0.75rem', border: '1px solid #3f3f46' }}>
            <Lock size={18} color="#4ade80" />
            <span style={{ fontSize: '0.9rem', color: '#e4e4e7', fontWeight: 'bold' }}>
              Two-Factor Authentication is active for this account.
            </span>
          </div>
          <button
            type="button"
            onClick={disableMFA}
            disabled={loading}
            style={{ padding: '0.75rem 1.5rem', borderRadius: '0.75rem', backgroundColor: 'transparent', border: '1px solid #ef4444', color: '#ef4444', fontWeight: 'bold', cursor: 'pointer', alignSelf: 'flex-start' }}
          >
            {loading ? 'Disabling...' : 'Disable 2FA Security'}
          </button>
        </div>
      ) : qrCodeUrl ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center', padding: '1.5rem', backgroundColor: '#09090b', borderRadius: '0.75rem', border: '1px solid #27272a' }}>
          <div style={{ textAlign: 'center' }}>
            <span style={{ fontSize: '0.85rem', color: '#a1a1aa', fontWeight: 'bold', display: 'block', marginBottom: '1rem' }}>
              Scan this QR Code with Google Authenticator or Apple Keychain:
            </span>
            <div style={{ padding: '1rem', backgroundColor: '#ffffff', borderRadius: '0.75rem', display: 'inline-block' }}>
              <img src={qrCodeUrl} alt="2FA QR Code" style={{ width: '200px', height: '200px' }} />
            </div>
          </div>
          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <label style={{ fontSize: '0.85rem', fontWeight: 'bold', color: '#e4e4e7' }}>Enter 6-Digit Verification PIN:</label>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <input
                type="text"
                placeholder="123456"
                maxLength={6}
                value={token}
                onChange={(e) => setToken(e.target.value)}
                style={{ flex: 1, padding: '0.75rem 1rem', borderRadius: '0.75rem', border: '2px solid #3f3f46', backgroundColor: '#18181b', color: '#ffffff', fontSize: '1.25rem', letterSpacing: '0.25em', fontFamily: 'monospace', textAlign: 'center', outline: 'none' }}
              />
              <button
                type="button"
                onClick={verifyToken}
                disabled={loading}
                style={{ padding: '0.75rem 1.5rem', borderRadius: '0.75rem', backgroundColor: '#ef4444', border: 'none', color: '#ffffff', fontWeight: 'bold', cursor: 'pointer' }}
              >
                {loading ? 'Verifying...' : 'Verify & Enable'}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <p style={{ fontSize: '0.9rem', color: '#a1a1aa', marginBottom: '1.5rem', lineHeight: '1.5' }}>
            Enabling Two-Factor Authentication secures your account against password theft by demanding a time-based one-time PIN generated on your mobile device upon login.
          </p>
          <button
            type="button"
            onClick={startSetup}
            disabled={loading}
            style={{ padding: '0.875rem 1.75rem', borderRadius: '0.75rem', backgroundColor: '#ef4444', border: 'none', color: '#ffffff', fontWeight: 'bold', fontSize: '0.9rem', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', boxShadow: '0 4px 12px rgba(239, 68, 68, 0.3)' }}
          >
            <Key size={18} /> {loading ? 'Initializing Secure Token...' : 'Setup Multi-Factor Authentication'}
          </button>
        </div>
      )}

      <div style={{ marginTop: '2rem', paddingTop: '1rem', borderTop: '1px solid #27272a', textAlign: 'center' }}>
        <span style={{ fontSize: '0.7rem', fontWeight: 'bold', color: '#71717a', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          MFA Protocols Secured by AtlaHub Tech
        </span>
      </div>
    </div>
  );
}
