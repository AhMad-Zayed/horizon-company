'use client';
import React from 'react';
import useSWR from 'swr';
import { Activity, Monitor, Clock, ArrowUpRight, ShieldCheck, Server, Users, MessageSquare, Globe, Cpu } from 'lucide-react';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function CustomDashboard() {
  const { data, error, isLoading } = useSWR('/api/visitor-logs?limit=7&sort=-timestamp', fetcher, {
    refreshInterval: 8000,
  });

  return (
    <div style={{ padding: '2rem', maxWidth: '1600px', margin: '0 auto', fontFamily: 'system-ui, -apple-system, sans-serif', color: '#f4f4f5' }}>
      {/* Premium Header Banner */}
      <div style={{ background: 'linear-gradient(135deg, #09090b 0%, #18181b 100%)', border: '1px solid #3f3f46', borderRadius: '1.25rem', padding: '2.5rem', marginBottom: '2rem', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1.5rem' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.25rem 0.75rem', borderRadius: '9999px', backgroundColor: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#f87171', fontSize: '0.75rem', fontWeight: 'bold', marginBottom: '0.75rem' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '9999px', backgroundColor: '#ef4444' }} />
              Horizon Enterprise OS v3.84
            </div>
            <h1 style={{ fontSize: '2.25rem', fontWeight: '800', color: '#ffffff', margin: '0 0 0.5rem 0', letterSpacing: '-0.025em' }}>
              Executive System Intelligence
            </h1>
            <p style={{ fontSize: '0.95rem', color: '#a1a1aa', margin: 0, maxWidth: '600px' }}>
              Real-time telemetry, visitor geo-distribution, and mission-critical CMS collections tracking.
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <a
              href="/admin/collections/visitor-logs"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.875rem 1.5rem', borderRadius: '0.75rem', backgroundColor: '#dc2626', color: '#ffffff', fontWeight: 'bold', fontSize: '0.875rem', textDecoration: 'none', border: '1px solid #ef4444' }}
            >
              Full Visitor Logs <ArrowUpRight size={16} />
            </a>
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.875rem 1.5rem', borderRadius: '0.75rem', backgroundColor: '#27272a', color: '#e4e4e7', fontWeight: 'bold', fontSize: '0.875rem', textDecoration: 'none', border: '1px solid #3f3f46' }}
            >
              Open Live Site <Globe size={16} />
            </a>
          </div>
        </div>
      </div>

      {/* Main Multi-Column Responsive Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
        {/* Real-Time Visitor Activity Feed Card */}
        <div style={{ gridColumn: 'span 2 / span 2', backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '1rem', padding: '2rem', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.4)' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', borderBottom: '1px solid #27272a', paddingBottom: '1.5rem', marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '0.75rem', backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', color: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Activity size={22} />
              </div>
              <div>
                <h2 style={{ fontSize: '1.35rem', fontWeight: '800', color: '#ffffff', margin: 0, letterSpacing: '-0.025em' }}>
                  Real-Time Visitor Activity Feed
                </h2>
                <p style={{ fontSize: '0.8rem', color: '#a1a1aa', margin: '0.25rem 0 0 0' }}>
                  Autonomous edge telemetry tracking recent client proxy requests
                </p>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ display: 'inline-block', padding: '0.25rem 0.75rem', borderRadius: '9999px', backgroundColor: 'rgba(34, 197, 94, 0.15)', color: '#4ade80', fontSize: '0.7rem', fontWeight: 'bold', border: '1px solid rgba(34, 197, 94, 0.3)' }}>
                ● LIVE
              </span>
              <span style={{ display: 'inline-block', padding: '0.25rem 0.75rem', borderRadius: '9999px', backgroundColor: '#27272a', color: '#e4e4e7', fontSize: '0.7rem', fontWeight: 'bold', border: '1px solid #3f3f46' }}>
                SWR SYNC
              </span>
            </div>
          </div>

          {/* List Rows */}
          <div style={{ minHeight: '320px' }}>
            {isLoading && (
              <div style={{ padding: '5rem 0', textAlign: 'center', color: '#a1a1aa' }}>
                Polling secure visitor edge logs...
              </div>
            )}

            {error && (
              <div style={{ padding: '4rem 0', textAlign: 'center', color: '#f87171', backgroundColor: 'rgba(239, 68, 68, 0.1)', borderRadius: '0.75rem', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
                Failed to synchronize live telemetry. Check backend SQLite connection.
              </div>
            )}

            {data && data.docs && data.docs.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {data.docs.map((log: any) => {
                  const timeString = new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
                  return (
                    <div
                      key={log.id}
                      style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', borderBottom: '1px solid rgba(39, 39, 42, 0.8)', backgroundColor: 'rgba(39, 39, 42, 0.2)', borderRadius: '0.75rem' }}
                    >
                      {/* LEFT SYNC: Flag & IP */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', minWidth: '220px' }}>
                        <div style={{ width: '38px', height: '38px', borderRadius: '0.5rem', backgroundColor: '#27272a', color: '#e4e4e7', border: '1px solid #3f3f46', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '900', fontSize: '0.8rem' }}>
                          {log.countryCode || 'UN'}
                        </div>
                        <div>
                          <div style={{ fontSize: '0.95rem', fontWeight: '800', color: '#ffffff', fontFamily: 'monospace' }}>
                            {log.ip}
                          </div>
                          <span style={{ fontSize: '0.75rem', color: '#a1a1aa', display: 'block', marginTop: '0.2rem' }}>
                            {log.country}
                          </span>
                        </div>
                      </div>

                      {/* CENTER SYNC: Browser Metadata */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#a1a1aa', fontSize: '0.85rem', fontWeight: '500' }}>
                        <Monitor size={16} color="#71717a" />
                        <span>{log.browser}</span>
                      </div>

                      {/* RIGHT SYNC: Monospace Timestamp */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#a1a1aa', fontFamily: 'monospace', fontSize: '0.85rem' }}>
                        <Clock size={16} color="#71717a" />
                        <span>{timeString}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              !isLoading && (
                <div style={{ padding: '6rem 0', textAlign: 'center', color: '#71717a', fontSize: '0.95rem' }}>
                  No active visitor sessions logged in this timeframe.
                </div>
              )
            )}
          </div>

          <div style={{ marginTop: '1.5rem', paddingTop: '1.25rem', borderTop: '1px solid #27272a', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.8rem', color: '#71717a' }}>
            <span>Showing top recent connections</span>
            <span style={{ fontFamily: 'monospace', color: '#a1a1aa' }}>Total tracked: {data?.totalDocs || 0}</span>
          </div>
        </div>

        {/* Right Column: Marquee System Overview & Quick Actions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* System Health Card */}
          <div style={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '1rem', padding: '1.75rem', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.4)' }}>
            <h3 style={{ fontSize: '0.75rem', fontWeight: '800', color: '#a1a1aa', textTransform: 'uppercase', letterSpacing: '0.1em', margin: '0 0 1rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Cpu size={16} color="#ef4444" /> Telemetry System Status
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem 1rem', borderRadius: '0.75rem', backgroundColor: '#27272a', border: '1px solid #3f3f46' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 'bold', color: '#e4e4e7' }}>SQLite Storage WAL</span>
                <span style={{ padding: '0.2rem 0.6rem', borderRadius: '9999px', backgroundColor: 'rgba(34, 197, 94, 0.15)', color: '#4ade80', fontSize: '0.7rem', fontWeight: 'bold', border: '1px solid rgba(34, 197, 94, 0.3)' }}>
                  OPTIMIZED
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem 1rem', borderRadius: '0.75rem', backgroundColor: '#27272a', border: '1px solid #3f3f46' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 'bold', color: '#e4e4e7' }}>Payload CMS Core</span>
                <span style={{ padding: '0.2rem 0.6rem', borderRadius: '9999px', backgroundColor: 'rgba(34, 197, 94, 0.15)', color: '#4ade80', fontSize: '0.7rem', fontWeight: 'bold', border: '1px solid rgba(34, 197, 94, 0.3)' }}>
                  ONLINE
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem 1rem', borderRadius: '0.75rem', backgroundColor: '#27272a', border: '1px solid #3f3f46' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 'bold', color: '#e4e4e7' }}>Geolocation Proxy</span>
                <span style={{ padding: '0.2rem 0.6rem', borderRadius: '9999px', backgroundColor: 'rgba(34, 197, 94, 0.15)', color: '#4ade80', fontSize: '0.7rem', fontWeight: 'bold', border: '1px solid rgba(34, 197, 94, 0.3)' }}>
                  ACTIVE
                </span>
              </div>
            </div>
          </div>

          {/* Quick Collection Jump */}
          <div style={{ flex: 1, backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '1rem', padding: '1.75rem', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.4)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <h3 style={{ fontSize: '0.75rem', fontWeight: '800', color: '#a1a1aa', textTransform: 'uppercase', letterSpacing: '0.1em', margin: '0 0 1rem 0' }}>
                Enterprise Collections
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <a
                  href="/admin/collections/services"
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.875rem 1rem', borderRadius: '0.75rem', backgroundColor: '#27272a', color: '#e4e4e7', textDecoration: 'none', fontWeight: 'bold', fontSize: '0.85rem', border: '1px solid #3f3f46' }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <Server size={16} color="#ef4444" /> Core Services
                  </span>
                  <ArrowUpRight size={16} color="#a1a1aa" />
                </a>
                <a
                  href="/admin/collections/clients"
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.875rem 1rem', borderRadius: '0.75rem', backgroundColor: '#27272a', color: '#e4e4e7', textDecoration: 'none', fontWeight: 'bold', fontSize: '0.85rem', border: '1px solid #3f3f46' }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <Users size={16} color="#ef4444" /> Elite Clients
                  </span>
                  <ArrowUpRight size={16} color="#a1a1aa" />
                </a>
                <a
                  href="/admin/collections/contact-messages"
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.875rem 1rem', borderRadius: '0.75rem', backgroundColor: '#27272a', color: '#e4e4e7', textDecoration: 'none', fontWeight: 'bold', fontSize: '0.85rem', border: '1px solid #3f3f46' }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <MessageSquare size={16} color="#ef4444" /> Lead CRM Inquiries
                  </span>
                  <ArrowUpRight size={16} color="#a1a1aa" />
                </a>
                <a
                  href="/admin/collections/hero-slides"
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.875rem 1rem', borderRadius: '0.75rem', backgroundColor: '#27272a', color: '#e4e4e7', textDecoration: 'none', fontWeight: 'bold', fontSize: '0.85rem', border: '1px solid #3f3f46' }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <ShieldCheck size={16} color="#ef4444" /> Ken Burns Slides
                  </span>
                  <ArrowUpRight size={16} color="#a1a1aa" />
                </a>
              </div>
            </div>

            <div style={{ marginTop: '2rem', paddingTop: '1rem', borderTop: '1px solid #27272a', textAlign: 'center' }}>
              <span style={{ fontSize: '0.7rem', fontWeight: 'bold', color: '#71717a', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                Horizon Security Protocols Enforced
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
