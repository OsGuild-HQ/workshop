import React, { useState, useEffect } from 'react';
import { ArrowLeft, CheckCircle, AlertTriangle } from 'lucide-react';
import Button from './ui/Button';

interface TicketVerificationSectionProps {
  ticketId: string;
  isDarkBg: boolean;
}

const TicketVerificationSection: React.FC<TicketVerificationSectionProps> = ({ ticketId, isDarkBg }) => {
  const [ticket, setTicket] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function loadTicket() {
      // 1. Try to fetch specific ticket from /api/register?id=<ticketId>
      try {
        const response = await fetch(`/api/register?id=${encodeURIComponent(ticketId)}`);
        if (response.ok) {
          const data = await response.json();
          if (data && data.id && active) {
            setTicket(data);
            setLoading(false);
            return;
          }
        }
      } catch (err) {
        console.warn('Failed to fetch from /api/register, trying localStorage...', err);
      }

      // 2. Fallback to localStorage
      if (active) {
        const existing = localStorage.getItem('genesis-registrations');
        const list = existing ? JSON.parse(existing) : [];
        const found = list.find((item: any) => item.id === ticketId);
        setTicket(found);
        setLoading(false);
      }
    }

    loadTicket();

    return () => {
      active = false;
    };
  }, [ticketId]);

  if (loading) {
    return (
      <section className="py-20 md:py-28 max-w-[1180px] mx-auto px-4 md:px-8 relative overflow-hidden flex items-center justify-center min-h-[90vh]">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--color-orange)] mb-4"></div>
          <span className="font-mono text-xs uppercase tracking-widest text-gray-500">Verifying Ticket...</span>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 md:py-28 max-w-[1180px] mx-auto px-4 md:px-8 relative overflow-hidden flex items-center justify-center min-h-[90vh]">
      {/* Subtle backdrop glow */}
      <div 
        className="absolute left-10 top-10 w-[200px] h-[200px] rounded-full blur-[100px] pointer-events-none opacity-5 bg-[var(--color-cyan)]"
        aria-hidden="true"
      />

      {/* Navigation */}
      <nav className="absolute left-0 top-0 z-50 flex w-full items-center justify-between p-4 md:p-8 font-mono">
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); window.location.hash = ''; }}
          className="flex items-center gap-2 border border-[var(--color-line)] bg-[var(--color-glass)] px-4 py-2 text-[var(--color-ink)] hover:bg-[var(--color-glass-strong)] transition-all duration-200 rounded-lg font-mono font-bold uppercase tracking-wider text-xs cursor-pointer shadow-[2px_2px_0_0_var(--color-ink)]"
        >
          <ArrowLeft className="h-4.5 w-4.5" />
          <span>back</span>
        </a>
      </nav>

      {/* Centered Card */}
      <div 
        className={`relative z-10 w-full max-w-[580px] mx-auto flex flex-col items-center p-8 md:p-12 rounded-2xl border border-[var(--color-line)] ${isDarkBg ? 'bg-black text-white' : 'bg-white text-black'}`}
        style={{
          '--color-ink': isDarkBg ? '#ffffff' : '#111827',
          '--color-ink-dim': isDarkBg ? '#8b949e' : '#4b5563',
          '--color-line': isDarkBg ? '#30363d' : '#e5e7eb',
          '--color-bg-soft': isDarkBg ? '#161b22' : '#f3f4f6',
          '--color-glass': isDarkBg ? '#000000' : '#ffffff',
          '--color-glass-strong': isDarkBg ? '#111111' : '#f3f4f6',
          color: isDarkBg ? '#ffffff' : '#111827'
        } as React.CSSProperties}
      >
        {ticket ? (
          <div className="w-full flex flex-col items-center">
            <div className="flex items-center gap-3 text-green-500 mb-6">
              <CheckCircle size={48} className="animate-bounce" />
              <div className="text-left">
                <span className="font-mono text-xs font-semibold uppercase tracking-widest text-green-500 block">TICKET STATUS</span>
                <h2 className="text-2xl font-bold font-heading uppercase text-green-500">Verified Spartan ✅</h2>
              </div>
            </div>

            <div className="w-full border-t border-b border-[var(--color-line)] py-6 my-4 space-y-4 font-mono text-sm leading-relaxed">
              <div className="flex justify-between border-b border-[var(--color-line)] pb-2">
                <span className="text-[var(--color-ink-dim)] uppercase">Ticket ID:</span>
                <span className="font-bold text-[var(--color-orange)]">{ticket.id}</span>
              </div>
              <div className="flex justify-between border-b border-[var(--color-line)] pb-2">
                <span className="text-[var(--color-ink-dim)] uppercase">Full Name:</span>
                <span className="font-bold text-[var(--color-ink)]">{ticket.name}</span>
              </div>
              <div className="flex justify-between border-b border-[var(--color-line)] pb-2">
                <span className="text-[var(--color-ink-dim)] uppercase">Email:</span>
                <span className="text-[var(--color-ink)]">{ticket.email}</span>
              </div>
              <div className="flex justify-between border-b border-[var(--color-line)] pb-2">
                <span className="text-[var(--color-ink-dim)] uppercase">Phone:</span>
                <span className="text-[var(--color-ink)]">{ticket.phone}</span>
              </div>
              <div className="flex justify-between border-b border-[var(--color-line)] pb-2">
                <span className="text-[var(--color-ink-dim)] uppercase">Affiliation:</span>
                <span className="text-[var(--color-ink)]">{ticket.affiliation} {ticket.institution && `(${ticket.institution})`}</span>
              </div>
              <div className="flex justify-between border-b border-[var(--color-line)] pb-2">
                <span className="text-[var(--color-ink-dim)] uppercase">Bus Pickup:</span>
                <span className="text-[var(--color-ink)]">{ticket.busPickup}</span>
              </div>
              <div className="flex justify-between border-b border-[var(--color-line)] pb-2">
                <span className="text-[var(--color-ink-dim)] uppercase">Block Quest:</span>
                <span className="text-[var(--color-ink)]">{ticket.blockQuest}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--color-ink-dim)] uppercase">Registered On:</span>
                <span className="text-[var(--color-ink)]">{new Date(ticket.timestamp).toLocaleString()}</span>
              </div>
            </div>

            <p className="text-xs text-[var(--color-ink-dim)] text-center max-w-[40ch] mt-4 leading-relaxed">
              This ticket is active and ready for the workshop check-in desk at Workshop17 Telfair on July 25th, 2026.
            </p>
          </div>
        ) : (
          <div className="w-full flex flex-col items-center text-center">
            <AlertTriangle size={56} className="text-red-500 mb-4 animate-pulse" />
            <span className="font-mono text-xs font-semibold uppercase tracking-widest text-red-500">TICKET NOT FOUND</span>
            <h2 className="text-2xl font-bold font-heading uppercase text-red-500 my-2">Invalid Ticket ID ❌</h2>
            
            <p className="text-sm text-[var(--color-ink-dim)] my-4 leading-relaxed max-w-[40ch]">
              The ticket ID <strong className="text-[var(--color-ink)]">{ticketId}</strong> is invalid or has not been logged in our registrations database.
            </p>
          </div>
        )}

        <div className="mt-8">
          <Button
            variant="primary"
            onClick={(e) => { e.preventDefault(); window.location.hash = ''; }}
            className="py-3 px-8 text-sm"
          >
            Back to Home
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TicketVerificationSection;
