'use client';

// Print test — queue a real print of the slip's primary template with
// its stored default data. Mono status beneath the button, with the
// result (the commit action lives with the preview it commits).

import { useState } from 'react';
import { Button } from '@/components/ui/button';

export function PrintTestButton({ slug }: { slug: string }) {
  const [status, setStatus] = useState('');
  const [isError, setIsError] = useState(false);

  async function printTest() {
    setIsError(false);
    setStatus('queueing…');
    try {
      const res = await fetch(
        `/api/slips/print-test?slug=${encodeURIComponent(slug)}`,
        { method: 'POST' },
      );
      const data = await res.json();
      if (res.ok) {
        setStatus('queued');
      } else {
        setStatus(data.error || 'failed');
        setIsError(true);
      }
    } catch {
      setStatus('connection failed');
      setIsError(true);
    }
  }

  return (
    <div className="flex items-center gap-3">
      <Button
        size="sm"
        className="h-auto px-3 py-1.5 text-xs"
        onClick={printTest}
      >
        Print test
      </Button>
      {status ? (
        <span
          className={`font-mono text-xs ${isError ? 'text-red' : 'text-ink-muted'}`}
        >
          {status}
        </span>
      ) : null}
    </div>
  );
}
