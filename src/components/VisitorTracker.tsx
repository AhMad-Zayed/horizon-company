'use client';
import { useEffect, useRef } from 'react';

export function VisitorTracker() {
  const tracked = useRef(false);

  useEffect(() => {
    if (!tracked.current) {
      tracked.current = true;
      fetch('/api/track-visitor', { method: 'POST' }).catch(() => {});
    }
  }, []);

  return null;
}
