'use client';
import React from 'react';

export function AdminLogo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', margin: '1rem 0 2rem 0', fontFamily: 'system-ui, -apple-system, sans-serif', textAlign: 'center' }}>
      {/* Horizon Logo Header */}
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center' }}>
        <span style={{ fontSize: '2.75rem', fontWeight: '900', color: '#ffffff', letterSpacing: '-0.04em', lineHeight: '1' }}>
          Horizon
        </span>
        <span style={{ fontSize: '2.75rem', fontWeight: '900', color: '#e50914', lineHeight: '1', textShadow: '0 0 20px rgba(229, 9, 20, 0.8)' }}>
          .
        </span>
      </div>

      {/* Micro-text */}
      <span style={{ fontSize: '0.7rem', fontWeight: '800', color: '#71717a', textTransform: 'uppercase', letterSpacing: '0.25em', marginTop: '0.5rem', display: 'block' }}>
        INTELLIGENT INFRASTRUCTURE OS
      </span>

      {/* Agency Stamp */}
      <div style={{ marginTop: '1.75rem', paddingTop: '1.25rem', borderTop: '1px solid rgba(255, 255, 255, 0.1)', width: '100%', maxWidth: '280px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
        <a
          href="https://www.atlahub.tech/"
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem', textDecoration: 'none', cursor: 'pointer' }}
        >
          <img
            src="https://www.atlahub.tech/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FAtlaHub_Tech_Logo.0q9v_x~q2fbja.png&w=3840&q=75"
            alt="AtlaHub Tech Logo"
            style={{ height: '24px', width: 'auto', objectFit: 'contain' }}
          />
          <span style={{ fontSize: '0.7rem', fontWeight: 'bold', color: '#a1a1aa' }}>
            Engineered & Secured by AtlaHub Tech
          </span>
        </a>
      </div>
    </div>
  );
}
