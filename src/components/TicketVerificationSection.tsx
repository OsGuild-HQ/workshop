import React, { useState, useEffect } from 'react';
import { createClient } from '../utils/supabase/client';
import { ArrowLeft, CheckCircle, AlertTriangle } from 'lucide-react';
import Button from './ui/Button';

interface TicketVerificationSectionProps {
  ticketId: string;
  isDarkBg: boolean;
}

const supabase = createClient();

const TicketVerificationSection: React.FC<TicketVerificationSectionProps> = ({ ticketId, isDarkBg }) => {
  const [ticket, setTicket] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [checkingIn, setCheckingIn] = useState(false);

  useEffect(() => {
    const adminSession = localStorage.getItem('genesis-admin-session');
    if (adminSession) {
      setIsAdmin(true);
    }
  }, []);

  const handleAdminCheckIn = async () => {
    if (!ticket) return;
    setCheckingIn(true);
    try {
      const ticketIdNum = parseInt(ticket.id, 10);
      const newStatus = !ticket.checkedIn;
      
      const { error } = await supabase
        .from('Registration')
        .update({ checked_in: newStatus })
        .eq('ticket_id', ticketIdNum);

      if (error) {
        console.error('Check-in failed:', error);
        alert('Check-in failed: ' + error.message);
      } else {
        setTicket((prev: any) => prev ? { ...prev, checkedIn: newStatus } : null);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setCheckingIn(false);
    }
  };

  useEffect(() => {
    let active = true;

    async function loadTicket() {
      // 1. Try to fetch specific ticket from Supabase (client-side)
      try {
        const ticketIdNum = parseInt(ticketId, 10);
        if (!isNaN(ticketIdNum)) {
          const { data, error: sbError } = await supabase
            .from('Registration')
            .select('*')
            .eq('ticket_id', ticketIdNum)
            .maybeSingle();

          if (!sbError && data && active) {
            const mappedData = {
              id: data.ticket_id.toString(),
              name: data.full_name,
              email: data.email,
              github: data.github || '',
              phone: data.phone_number?.toString() || '',
              gender: data.gender,
              affiliation: data.Affiliation,
              institution: data.Affiliation === 'Student' ? data.occupation : '',
              busPickup: data.bus,
              blockQuest: data.block_quest,
              dietary: data.Refreshment || 'No preference',
              checkedIn: !!data.checked_in, // Safeguard null column states automatically to false
              timestamp: data.created_at
            };
            setTicket(mappedData);
            setLoading(false);
            return;
          }
        }
      } catch (err) {
        console.warn('Failed to fetch from Supabase, falling back...', err);
      }

      // 2. Try to fetch specific ticket from /api/register?id=<ticketId>
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
              <div className="flex justify-between border-b border-[var(--color-line)] pb-2">
                <span className="text-[var(--color-ink-dim)] uppercase">Dietary Pref:</span>
                <span className="text-[var(--color-ink)]">{ticket.dietary}</span>
              </div>
              <div className="flex justify-between border-b border-[var(--color-line)] pb-2">
                <span className="text-[var(--color-ink-dim)] uppercase">Attendance:</span>
                <span className={`font-bold ${ticket.checkedIn ? 'text-green-500 font-mono' : 'text-amber-500 font-mono'}`}>
                  {ticket.checkedIn ? 'ATTENDED ✓' : 'PENDING CHECK-IN'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--color-ink-dim)] uppercase">Registered On:</span>
                <span className="text-[var(--color-ink)]">{new Date(ticket.timestamp).toLocaleString()}</span>
              </div>
            </div>

            {isAdmin && (
              <Button 
                onClick={handleAdminCheckIn} 
                disabled={checkingIn} 
                className={`w-full mt-2 mb-4 py-3 font-mono font-bold text-xs uppercase tracking-wider rounded-xl transition-all border ${
                  ticket.checkedIn
                    ? 'bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500/20'
                    : 'bg-[var(--color-orange)] text-[var(--color-bg-soft)] border border-[var(--color-ink)] hover:opacity-90'
                }`}
              >
                {checkingIn ? 'Updating Check-In...' : ticket.checkedIn ? 'Cancel Attendance Check ✓' : 'Validate Check-In ✓'}
              </Button>
            )}

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
