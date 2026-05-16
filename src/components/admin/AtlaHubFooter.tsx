'use client';
import React from 'react';

export function AtlaHubFooter() {
  return (
    <div style={{ padding: '1.5rem 1rem', marginTop: '2rem', borderTop: '1px solid #27272a', backgroundColor: '#09090b', color: '#a1a1aa', fontFamily: 'system-ui, -apple-system, sans-serif', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', textAlign: 'center' }}>
      <a
        href="https://www.atlahub.tech/"
        target="_blank"
        rel="noopener noreferrer"
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', cursor: 'pointer' }}
      >
        <img
          src="https://www.atlahub.tech/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FAtlaHub_Tech_Logo.0q9v_x~q2fbja.png&w=3840&q=75"
          alt="AtlaHub Tech Logo"
          style={{ height: '32px', width: 'auto', objectFit: 'contain' }}
        />
        <span style={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#e4e4e7' }}>
          Engineered & Secured by AtlaHub Tech
        </span>
      </a>
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.25rem 0.75rem', borderRadius: '9999px', backgroundColor: 'rgba(34, 197, 94, 0.15)', border: '1px solid rgba(34, 197, 94, 0.3)', color: '#4ade80', fontSize: '0.65rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        <span style={{ width: '6px', height: '6px', borderRadius: '9999px', backgroundColor: '#22c55e' }} />
        Security Protocols Enforced
      </div>
    </div>
  );
}
