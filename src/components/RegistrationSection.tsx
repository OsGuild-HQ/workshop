import React, { useState, useRef } from 'react';
import { createClient } from '../utils/supabase/client';
import { gsap } from 'gsap';
import { ArrowLeft, Sun, Moon } from 'lucide-react';
import Button from './ui/Button';
import genesisImg from '../assets/TheGenesis.png';
import osguildLogo from '../assets/osguild.png';
import bitdevsLogoBlack from '../assets/bitdevs-black.png';
import bitdevsLogoWhite from '../assets/bitdevs-white.png';
import btrustLogoBlack from '../assets/Btrust-black.png';
import btrustLogoWhite from '../assets/Btrust-white.png';

interface RegistrationSectionProps {
  id?: string;
  isDarkBg?: boolean;
  toggleTheme?: () => void;
}

const supabase = createClient();
const IS_REGISTRATION_PAUSED = false;

const INSTITUTIONS = [
  'University of Mauritius',
  'Middlesex University',
  'ALCHE',
  'Curtin Mauritius',
  'Others'
];

const BUS_PICKUP_POINTS = [
  'University of Mauritius',
  'Middlesex University',
  'ALCHE'
];

interface RegistrationValues {
  name: string;
  email: string;
  github: string;
  phone: string;
  gender: string;
  affiliation: string;
  institution: string;
  busPickup: string;
  blockQuest: string;
  dietary: string;
}

const RegistrationSection: React.FC<RegistrationSectionProps> = ({ 
  id = 'register',
  isDarkBg = false,
  toggleTheme
}) => {
  const [step, setStep] = useState(() => {
    const savedTicketId = localStorage.getItem('genesis-current-ticket-id');
    return savedTicketId ? 12 : 0;
  }); 
  // 0: Intro, 1: Name, 2: Email, 3: GitHub, 4: Phone, 5: Gender, 6: Affiliation, 7: Student Institution, 8: Bus Pickup, 9: Block Quest, 10: Dietary, 11: Confirm, 12: Success
  
  const [values, setValues] = useState<RegistrationValues>(() => {
    const savedUser = localStorage.getItem('genesis-current-user');
    if (savedUser) {
      try {
        return JSON.parse(savedUser);
      } catch (e) {
        // Fallback
      }
    }
    return {
      name: '',
      email: '',
      github: '',
      phone: '',
      gender: '',
      affiliation: '',
      institution: '',
      busPickup: '',
      blockQuest: '',
      dietary: ''
    };
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const confettiRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);
  const [currentTicketId, setCurrentTicketId] = useState(() => {
    return localStorage.getItem('genesis-current-ticket-id') || '';
  });

  const downloadPDFTicket = async () => {
    if (downloading) return;
    setDownloading(true);
    try {
      const canvas = document.createElement('canvas');
      canvas.width = 1800; // 3x scale for crisp, high-resolution PDF printing (1800x2700)
      canvas.height = 2700;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        setDownloading(false);
        return;
      }

      // Configure high-quality image scaling
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.scale(3, 3); // Automatically maps 600x900 drawing coordinates to high-res canvas

      const textColor = isDarkBg ? '#ffffff' : '#000000';
      const textMutedColor = isDarkBg ? '#888888' : '#555555';
      const lineColor = isDarkBg ? '#222222' : '#e5e7eb';

      // 1. Draw background
      ctx.fillStyle = isDarkBg ? '#000000' : '#ffffff';
      ctx.fillRect(0, 0, 600, 900);

      // 2. Draw thick side borders (orange/accent)
      ctx.fillStyle = '#34C759'; // Brand accent color
      ctx.fillRect(0, 0, 24, 900);
      ctx.fillRect(576, 0, 24, 900);

      // 3. Draw Ticket Header Info
      ctx.fillStyle = textColor;
      ctx.font = 'bold 28px sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText('THE GENESIS WORKSHOP', 60, 80);

      ctx.fillStyle = textColor;
      ctx.font = 'bold 16px sans-serif';
      ctx.fillText('The Genesis Workshop, open source edition', 60, 110);

      ctx.fillStyle = textMutedColor;
      ctx.font = '14px sans-serif';
      ctx.fillText('July 25, 2026', 60, 135);
      ctx.fillText('Workshop17 Telfair, Moka, Mauritius', 60, 155);

      // Separator Line 1
      ctx.strokeStyle = lineColor;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(60, 190);
      ctx.lineTo(540, 190);
      ctx.stroke();

      // Welcome/Thank you text
      ctx.fillStyle = textMutedColor;
      ctx.font = '15px sans-serif';
      ctx.fillText('Thank you for registering, ' + values.name + '. This QR code is your ticket!', 60, 230);

      // Separator Line 2
      ctx.strokeStyle = lineColor;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(60, 520);
      ctx.lineTo(540, 520);
      ctx.stroke();

      // Instructions
      ctx.fillStyle = textMutedColor;
      ctx.font = '14px sans-serif';
      ctx.fillText('Present this QR code at the workshop registration desk to check in', 60, 560);
      ctx.fillText('and receive your workshop badge.', 60, 580);

      // Ticket Type: SPARTAN 🪖
      ctx.fillStyle = textColor;
      ctx.font = 'bold 16px sans-serif';
      ctx.fillText('This is a SPARTAN 🪖 ticket', 60, 625);

      // Team Signature
      ctx.fillStyle = textMutedColor;
      ctx.font = 'italic 14px sans-serif';
      ctx.fillText('<3 the OSGuild team', 60, 665);

      // Separator Line 3
      ctx.strokeStyle = lineColor;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(60, 700);
      ctx.lineTo(540, 700);
      ctx.stroke();

      // Links at the bottom
      ctx.fillStyle = '#34C759';
      ctx.font = 'bold 14px monospace';
      ctx.textAlign = 'left';
      ctx.fillText('Workshop Agenda', 60, 830);
      ctx.textAlign = 'right';
      ctx.fillText('Follow us on X', 540, 830);

      // 4. Load all images with Promise wrapper
      const loadImage = (src: string, crossOrigin?: string): Promise<HTMLImageElement | null> => {
        return new Promise((resolve) => {
          const img = new Image();
          if (crossOrigin) img.crossOrigin = crossOrigin;
          img.onload = () => resolve(img);
          img.onerror = () => resolve(null);
          img.src = src;
        });
      };

      const [btrustLogoImg, bdLogoImg, osLogoImg, qrImg] = await Promise.all([
        loadImage(isDarkBg ? btrustLogoWhite : btrustLogoBlack),
        loadImage(isDarkBg ? bitdevsLogoWhite : bitdevsLogoBlack),
        loadImage(osguildLogo),
        loadImage(
          `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(`${window.location.origin}/#ticket?id=${currentTicketId}`)}&color=${isDarkBg ? 'ffffff' : '000000'}&bgcolor=${isDarkBg ? '000000' : 'ffffff'}`,
          'anonymous'
        )
      ]);

      // Draw Logos
      if (btrustLogoImg && btrustLogoImg.width) {
        const h = 40;
        const w = (btrustLogoImg.width / btrustLogoImg.height) * h;
        ctx.drawImage(btrustLogoImg, 60, 740, w, h);
      }
      if (bdLogoImg && bdLogoImg.width) {
        const h = 40;
        const w = (bdLogoImg.width / bdLogoImg.height) * h;
        ctx.drawImage(bdLogoImg, 300 - w / 2, 740, w, h);
      }
      if (osLogoImg && osLogoImg.width) {
        const h = 40;
        const w = (osLogoImg.width / osLogoImg.height) * h;
        ctx.drawImage(osLogoImg, 540 - w, 740, w, h);
      }
      if (qrImg) {
        ctx.drawImage(qrImg, 200, 270, 200, 200);
      }

      // Convert to PDF and download
      const { jsPDF } = await import('jspdf');
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: [400, 600]
      });
      doc.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, 400, 600);
      doc.save(`genesis-workshop-ticket-${values.name.toLowerCase().replace(/\s+/g, '-')}.pdf`);
    } catch (err) {
      console.error('Error generating PDF ticket:', err);
    } finally {
      setDownloading(false);
    }
  };

  const setValue = (key: keyof typeof values, val: string) => {
    setValues((prev) => ({ ...prev, [key]: val }));
  };

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validateMauritiusPhone = (phone: string) => {
    const cleaned = phone.replace(/[\s\(\)\-\.]/g, '');
    let localNumber = cleaned;
    if (cleaned.startsWith('+230')) {
      localNumber = cleaned.substring(4);
    } else if (cleaned.startsWith('230') && cleaned.length > 8) {
      localNumber = cleaned.substring(3);
    } else if (cleaned.startsWith('00230')) {
      localNumber = cleaned.substring(5);
    }
    const isMobile = /^5\d{7}$/.test(localNumber);
    const isLandline = /^[24689]\d{6}$/.test(localNumber);
    return isMobile || isLandline;
  };

  const canProceed = () => {
    switch (step) {
      case 0: return true;
      case 1: return values.name.trim().length >= 2;
      case 2: return validateEmail(values.email);
      case 3: return values.github.trim().length >= 1;
      case 4: return validateMauritiusPhone(values.phone);
      case 5: return values.gender !== '';
      case 6: return values.affiliation !== '';
      case 7: return values.affiliation === 'Student' ? values.institution !== '' : true;
      case 8: return values.busPickup !== '';
      case 9: return values.blockQuest !== '';
      case 10: return values.dietary.trim().length >= 1;
      default: return true;
    }
  };

  const next = () => {
    if (!canProceed()) return;
    if (step === 6 && values.affiliation === 'Professional') {
      setStep(8); // Skip step 7 (student institution selection)
    } else if (step < 11) {
      setStep(step + 1);
    }
  };

  const prev = () => {
    if (step === 8 && values.affiliation === 'Professional') {
      setStep(6);
    } else if (step > 0) {
      setStep(step - 1);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      next();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (IS_REGISTRATION_PAUSED) {
      setSubmitError("Oops something went wrong please try again later");
      return;
    }
    if (step === 11) {
      setSubmitting(true);
      
      // Mock network latency
      setTimeout(() => {
        const ticketIdNum = Math.floor(10000000 + Math.random() * 90000000);
        const ticketId = ticketIdNum.toString();
        
        // Save to localStorage list
        const newRegistration = {
          id: ticketId,
          name: values.name,
          email: values.email,
          github: values.github,
          phone: values.phone,
          gender: values.gender,
          affiliation: values.affiliation,
          institution: values.affiliation === 'Student' ? values.institution : '',
          busPickup: values.busPickup,
          blockQuest: values.blockQuest,
          dietary: values.dietary,
          timestamp: new Date().toISOString()
        };

        const existing = localStorage.getItem('genesis-registrations');
        const list = existing ? JSON.parse(existing) : [];
        list.push(newRegistration);
        localStorage.setItem('genesis-registrations', JSON.stringify(list));

        localStorage.setItem('genesis-current-ticket-id', ticketId);
        localStorage.setItem('genesis-current-user', JSON.stringify(newRegistration));

        // Format data to match Supabase 'Registration' table structure
        const cleanedPhone = values.phone.replace(/[\s\(\)\-\+]/g, '');
        const phoneVal = cleanedPhone ? parseInt(cleanedPhone, 10) : null;

        const dbRegistration = {
          ticket_id: ticketIdNum,
          full_name: values.name,
          email: values.email,
          github: values.github,
          phone_number: phoneVal,
          gender: values.gender,
          occupation: values.affiliation === 'Student' ? values.institution : 'Professional',
          Affiliation: values.affiliation,
          bus: values.busPickup,
          block_quest: values.blockQuest,
          Refreshment: values.dietary
        };

        // Save to Supabase (client-side)
        supabase
          .from('Registration')
          .insert(dbRegistration)
          .then(({ error: sbError }) => {
            if (sbError) {
              console.error('Error saving registration to Supabase:', sbError);
            } else {
              console.log('Registration successfully saved to Supabase');
            }
          });

        // Persist to local JSON file via dev-server API during local development
        fetch('/api/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newRegistration)
        }).catch(err => {
          console.warn('Dev server API not available. Saved locally in browser storage.', err);
        });

        setCurrentTicketId(ticketId);
        setSubmitting(false);
        setStep(12);
        
        // Trigger GSAP confetti animation
        if (confettiRef.current) {
          const container = confettiRef.current;
          for (let i = 0; i < 60; i++) {
            const dot = document.createElement('span');
            const colors = ['#34C759', '#57E0C9', '#8B5CF6', '#F59E0B', '#EF4444', '#3B82F6'];
            dot.style.cssText = `
              position: absolute;
              width: ${6 + Math.random() * 8}px;
              height: ${6 + Math.random() * 8}px;
              background: ${colors[Math.floor(Math.random() * colors.length)]};
              border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
              left: 50%;
              top: 50%;
              pointer-events: none;
              z-index: 50;
            `;
            container.appendChild(dot);

            gsap.to(dot, {
              x: (Math.random() - 0.5) * 600,
              y: (Math.random() - 0.5) * 500 - 150,
              scale: 0,
              rotation: Math.random() * 720,
              duration: 1.2 + Math.random() * 0.8,
              ease: 'power2.out',
              onComplete: () => dot.remove()
            });
          }
        }
      }, 1000);
    }
  };

  const qNumber = () => {
    if (step === 0 || step >= 11) return null;
    if (step <= 5) return step;
    if (step === 6) return 6;
    return values.affiliation === 'Professional' ? step - 1 : step;
  };

  const totalQ = () => {
    return values.affiliation === 'Professional' ? 9 : 10;
  };

  if (step === 12) {
    return (
      <section id={id} className="py-20 md:py-28 max-w-[1180px] mx-auto px-4 md:px-8 relative overflow-hidden flex items-center justify-center min-h-[90vh]">
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

          {toggleTheme && (
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg border border-[var(--color-line)] bg-[var(--color-glass)] text-[var(--color-ink)] hover:bg-[var(--color-glass-strong)] transition-all duration-200 cursor-pointer"
              aria-label={`Switch to ${isDarkBg ? 'light' : 'dark'} mode`}
            >
              {isDarkBg ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          )}
        </nav>

        {/* Centered Ticket Layout */}
        <div 
          className={`relative z-10 w-full max-w-[500px] md:max-w-[680px] mx-auto flex flex-col items-center justify-center p-8 md:p-12 rounded-2xl ${isDarkBg ? 'bg-black' : 'bg-white'}`}
          style={{
            '--color-ink': isDarkBg ? '#ffffff' : '#111827',
            '--color-ink-dim': isDarkBg ? '#8b949e' : '#4b5563',
            '--color-line': isDarkBg ? '#30363d' : '#e5e7eb',
            '--color-bg-soft': isDarkBg ? '#000000' : '#f3f4f6',
            '--color-glass': isDarkBg ? '#000000' : '#ffffff',
            '--color-glass-strong': isDarkBg ? '#111111' : '#f3f4f6',
            color: isDarkBg ? '#ffffff' : '#111827'
          } as React.CSSProperties}
        >
          {/* Confetti Container */}
          <div ref={confettiRef} className="absolute inset-0 pointer-events-none" />

          {/* Registration Successful Title */}
          <div className="text-center mb-8">
            <span className="text-5xl select-none block mb-3">🎉</span>
            <h2 className="text-3xl font-bold tracking-tight text-[var(--color-ink)] font-heading">
              Registration Successful!
            </h2>
            <p className="text-xs text-[var(--color-ink-dim)] mt-2 leading-relaxed max-w-[45ch]">
              Welcome to Genesis, <strong className="text-[var(--color-ink)]">{values.name}</strong>! We've received your application. See you on July 25th, 2026.
            </p>
          </div>

          {/* HTML Ticket Preview (Big Enough!) */}
          <div className={`w-full max-w-[400px] md:max-w-[580px] border-y-0 border-x-[16px] border-[var(--color-orange)] ${isDarkBg ? 'bg-black text-white' : 'bg-white text-black'} p-8 md:p-10 rounded-xl shadow-[0_4px_30px_rgba(0,0,0,0.1)] flex flex-col gap-6 md:gap-7 font-sans text-left border border-[var(--color-line)]`}>
            <div className="flex justify-between items-start gap-4">
              <div>
                <h1 className="font-heading font-black text-2xl md:text-3xl tracking-tighter uppercase italic text-[var(--color-orange)]">
                  THE GENESIS WORKSHOP
                </h1>
                <h2 className="font-semibold text-sm md:text-base mt-1 leading-snug">
                  The Genesis Workshop, open source edition
                </h2>
                <p className="text-xs md:text-sm text-gray-500 mt-1">July 25, 2026</p>
                <p className="text-xs md:text-sm text-gray-500">Workshop17 Telfair, Mauritius</p>
              </div>
            </div>

            <p className="text-xs md:text-sm font-medium text-gray-500 border-t border-[var(--color-line)] pt-4">
              Thank you for registering, <span className="font-bold text-[var(--color-ink)]">{values.name}</span>. This QR code is your ticket!
            </p>

            {/* QR Code */}
            <div className="flex justify-center my-2">
              <img 
                src={`https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(`${window.location.origin}/#ticket?id=${currentTicketId}`)}&color=${isDarkBg ? 'ffffff' : '000000'}&bgcolor=${isDarkBg ? '000000' : 'ffffff'}`}
                alt="Ticket QR Code"
                className="w-[180px] h-[180px] md:w-[220px] md:h-[220px] border border-[var(--color-line)] p-2 bg-white dark:bg-black rounded-lg"
              />
            </div>

            {/* Instructions */}
            <div className="text-xs md:text-sm space-y-2 text-gray-600 dark:text-gray-400">
              <p>Present this QR code at the workshop registration desk to check in and receive your workshop badge.</p>
              <p className="font-semibold text-[var(--color-ink)]">
                This is a <span className="text-[var(--color-orange)] font-bold">SPARTAN 🪖</span> ticket
              </p>
              <p className="text-gray-400 mt-4">&lt;3 the OSGuild team</p>
            </div>

            {/* Logos */}
            <div className="flex items-center justify-between border-t border-[var(--color-line)] pt-4 h-10 md:h-12">
              <img src={isDarkBg ? btrustLogoWhite : btrustLogoBlack} alt="Btrust" className="h-6 md:h-7 w-auto object-contain" />
              <img src={isDarkBg ? bitdevsLogoWhite : bitdevsLogoBlack} alt="Bitdevs" className="h-6 md:h-7 w-auto object-contain" />
              <img src={osguildLogo} alt="OSGuild" className="h-6 md:h-7 w-auto object-contain" />
            </div>

            {/* Links */}
            <div className="flex justify-between text-xs md:text-sm font-mono text-[var(--color-orange)] mt-2">
              <a href="#agenda" className="underline hover:text-[var(--color-orange-dim)]">Workshop Agenda</a>
              <a href="https://x.com/osguild" target="_blank" rel="noreferrer" className="underline hover:text-[var(--color-orange-dim)]">Follow us on X</a>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-wrap justify-center gap-4 w-full">
            <Button 
              variant="primary" 
              onClick={(e) => { e.preventDefault(); downloadPDFTicket(); }}
              disabled={downloading}
              className="py-3 px-8 text-sm"
            >
              {downloading ? 'Downloading...' : 'Download PDF Ticket'}
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id={id} className="py-20 md:py-28 max-w-[1180px] mx-auto px-4 md:px-8 relative overflow-hidden">
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

        {toggleTheme && (
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg border border-[var(--color-line)] bg-[var(--color-glass)] text-[var(--color-ink)] hover:bg-[var(--color-glass-strong)] transition-all duration-200 cursor-pointer"
            aria-label={`Switch to ${isDarkBg ? 'light' : 'dark'} mode`}
          >
            {isDarkBg ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        )}
      </nav>

      <div 
        className="relative z-10 w-full flex flex-col md:flex-row gap-6 md:gap-8 min-h-[550px]"
        style={{
          '--color-ink': isDarkBg ? '#ffffff' : '#111827',
          '--color-ink-dim': isDarkBg ? '#8b949e' : '#4b5563',
          '--color-line': isDarkBg ? '#30363d' : '#e5e7eb',
          '--color-bg-soft': isDarkBg ? '#000000' : '#f3f4f6',
          '--color-glass': isDarkBg ? '#000000' : '#ffffff',
          '--color-glass-strong': isDarkBg ? '#111111' : '#f3f4f6',
          color: isDarkBg ? '#ffffff' : '#111827'
        } as React.CSSProperties}
      >
        {/* Left Side: Interactive Wizard Form */}
        <div className={`w-full md:w-3/5 p-8 sm:p-12 md:p-16 flex flex-col justify-between relative min-h-[500px] rounded-2xl ${isDarkBg ? 'bg-black' : 'bg-white'}`}>
          
          {/* Header/Breadcrumbs */}
          <div className="flex justify-between items-center mb-8">
            <span className="font-mono text-xs font-semibold tracking-wider text-[var(--color-ink-dim)] uppercase">
              Genesis Registration
            </span>
            {qNumber() !== null && (
              <span className="font-mono text-xs text-[var(--color-ink-dim)]">
                Step {qNumber()} of {totalQ()}
              </span>
            )}
          </div>

          <form onSubmit={handleSubmit} className="flex-grow flex flex-col justify-center">
            
            {/* Step 0: Intro */}
            {step === 0 && (
              <div className="flex flex-col gap-4">
                <h2 className="text-3xl font-bold tracking-tight text-[var(--color-ink)] font-heading uppercase">
                  THE GENESIS WORKSHOP
                </h2>
                <p className="text-[1rem] text-[var(--color-ink-dim)] leading-relaxed max-w-[50ch]">
                  Join the next generation of open source developers. Take a few moments to fill in your application.
                </p>
                {IS_REGISTRATION_PAUSED ? (
                  <div className="mt-4 p-4 rounded-xl border border-red-500/30 bg-red-500/10 text-red-500 font-mono text-sm font-semibold flex items-center gap-3">
                    <span className="text-lg">⚠️</span>
                    <span>Oops something went wrong please try again later</span>
                  </div>
                ) : (
                  <div className="mt-4 flex flex-wrap items-center gap-4">
                    <Button variant="primary" onClick={(e) => { e.preventDefault(); setStep(1); }}>
                      Start Registration
                    </Button>
                    <span className="hidden sm:inline font-mono text-xs text-[var(--color-ink-dim)]">
                      press <strong className="text-[var(--color-ink)]">Enter ↵</strong>
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* Step 1: Full Name */}
            {step === 1 && (
              <div className="flex flex-col gap-4">
                <label className="text-xl md:text-2xl font-semibold text-[var(--color-ink)] font-heading">
                  What is your full name?
                </label>
                <input
                  autoFocus
                  type="text"
                  placeholder="Type your name here..."
                  value={values.name}
                  onChange={(e) => setValue('name', e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="w-full border-b-2 border-[var(--color-line)] bg-transparent py-3 text-lg md:text-xl text-[var(--color-ink)] outline-none transition-colors placeholder:opacity-40 focus:border-[var(--color-orange)] font-sans"
                />
                <div className="mt-6 flex items-center gap-4">
                  <Button variant="primary" onClick={(e) => { e.preventDefault(); next(); }} disabled={!canProceed()}>
                    OK ✓
                  </Button>
                  <span className="hidden sm:inline font-mono text-xs text-[var(--color-ink-dim)]">
                    press <strong className="text-[var(--color-ink)]">Enter ↵</strong>
                  </span>
                </div>
              </div>
            )}

            {/* Step 2: Email */}
            {step === 2 && (
              <div className="flex flex-col gap-4">
                <label className="text-xl md:text-2xl font-semibold text-[var(--color-ink)] font-heading">
                  What is your email address?
                </label>
                <input
                  autoFocus
                  type="email"
                  placeholder="you@example.com"
                  value={values.email}
                  onChange={(e) => setValue('email', e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="w-full border-b-2 border-[var(--color-line)] bg-transparent py-3 text-lg md:text-xl text-[var(--color-ink)] outline-none transition-colors placeholder:opacity-40 focus:border-[var(--color-orange)] font-sans"
                />
                <div className="mt-6 flex items-center gap-4">
                  <Button variant="primary" onClick={(e) => { e.preventDefault(); next(); }} disabled={!canProceed()}>
                    OK ✓
                  </Button>
                  <Button variant="ghost" onClick={(e) => { e.preventDefault(); prev(); }} className="py-2.5 px-3 flex items-center justify-center" aria-label="Back">
                    <ArrowLeft size={16} />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: GitHub */}
            {step === 3 && (
              <div className="flex flex-col gap-4">
                <label className="text-xl md:text-2xl font-semibold text-[var(--color-ink)] font-heading">
                  What is your GitHub username?
                </label>
                <input
                  autoFocus
                  type="text"
                  placeholder="e.g. octocat"
                  value={values.github}
                  onChange={(e) => setValue('github', e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="w-full border-b-2 border-[var(--color-line)] bg-transparent py-3 text-lg md:text-xl text-[var(--color-ink)] outline-none transition-colors placeholder:opacity-40 focus:border-[var(--color-orange)] font-sans"
                />
                <div className="mt-6 flex items-center gap-4">
                  <Button variant="primary" onClick={(e) => { e.preventDefault(); next(); }} disabled={!canProceed()}>
                    OK ✓
                  </Button>
                  <Button variant="ghost" onClick={(e) => { e.preventDefault(); prev(); }} className="py-2.5 px-3 flex items-center justify-center" aria-label="Back">
                    <ArrowLeft size={16} />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 4: Phone */}
            {step === 4 && (
              <div className="flex flex-col gap-4">
                <label className="text-xl md:text-2xl font-semibold text-[var(--color-ink)] font-heading">
                  What is your phone number?
                </label>
                <input
                  autoFocus
                  type="tel"
                  placeholder="e.g. 5123 4567 or +230 5123 4567"
                  value={values.phone}
                  onChange={(e) => setValue('phone', e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="w-full border-b-2 border-[var(--color-line)] bg-transparent py-3 text-lg md:text-xl text-[var(--color-ink)] outline-none transition-colors placeholder:opacity-40 focus:border-[var(--color-orange)] font-sans"
                />
                {values.phone.trim().length > 0 && !validateMauritiusPhone(values.phone) && (
                  <p className="text-xs font-mono text-[var(--color-orange)] mt-1">
                    Please enter a valid Mauritius phone number (mobile: 8 digits starting with 5, landline: 7 digits).
                  </p>
                )}
                <div className="mt-6 flex items-center gap-4">
                  <Button variant="primary" onClick={(e) => { e.preventDefault(); next(); }} disabled={!canProceed()}>
                    OK ✓
                  </Button>
                  <Button variant="ghost" onClick={(e) => { e.preventDefault(); prev(); }} className="py-2.5 px-3 flex items-center justify-center" aria-label="Back">
                    <ArrowLeft size={16} />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 5: Gender */}
            {step === 5 && (
              <div className="flex flex-col gap-5">
                <label className="text-xl md:text-2xl font-semibold text-[var(--color-ink)] font-heading">
                  What is your gender?
                </label>
                <div className="flex flex-col sm:flex-row gap-4 mt-2">
                  {['Male', 'Female'].map((option) => {
                    const isSelected = values.gender === option;
                    return (
                      <button
                        key={option}
                        type="button"
                        onClick={() => { setValue('gender', option); setTimeout(next, 300); }}
                        className={`flex-grow text-center p-4 border-2 font-mono text-sm uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[var(--color-orange)] text-[var(--bg)] border-[var(--color-ink)] shadow-[4px_4px_0_0_var(--color-ink)] -translate-x-[2px] -translate-y-[2px]'
                            : 'bg-transparent text-[var(--color-ink)] border-[var(--color-line)] hover:bg-[var(--color-glass-strong)]'
                        }`}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>
                <div className="mt-2">
                  <Button variant="ghost" onClick={(e) => { e.preventDefault(); prev(); }} className="py-2.5 px-3 flex items-center justify-center" aria-label="Back">
                    <ArrowLeft size={16} />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 6: Affiliation */}
            {step === 6 && (
              <div className="flex flex-col gap-5">
                <label className="text-xl md:text-2xl font-semibold text-[var(--color-ink)] font-heading">
                  Are you a student or professional?
                </label>
                <div className="flex flex-col sm:flex-row gap-4 mt-2">
                  {['Student', 'Professional'].map((option) => {
                    const isSelected = values.affiliation === option;
                    return (
                      <button
                        key={option}
                        type="button"
                        onClick={() => { setValue('affiliation', option); setTimeout(next, 300); }}
                        className={`flex-grow text-center p-4 border-2 font-mono text-sm uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[var(--color-orange)] text-[var(--bg)] border-[var(--color-ink)] shadow-[4px_4px_0_0_var(--color-ink)] -translate-x-[2px] -translate-y-[2px]'
                            : 'bg-transparent text-[var(--color-ink)] border-[var(--color-line)] hover:bg-[var(--color-glass-strong)]'
                        }`}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>
                <div className="mt-2">
                  <Button variant="ghost" onClick={(e) => { e.preventDefault(); prev(); }} className="py-2.5 px-3 flex items-center justify-center" aria-label="Back">
                    <ArrowLeft size={16} />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 7: Student Institution */}
            {step === 7 && values.affiliation === 'Student' && (
              <div className="flex flex-col gap-4">
                <label className="text-xl md:text-2xl font-semibold text-[var(--color-ink)] font-heading">
                  Select your university / institution
                </label>
                <div className="relative mt-2">
                  <select
                    value={values.institution}
                    onChange={(e) => setValue('institution', e.target.value)}
                    className="w-full p-4 border-2 border-[var(--color-line)] bg-[var(--color-bg-soft)] rounded-lg text-base text-[var(--color-ink)] outline-none focus:border-[var(--color-orange)] font-mono cursor-pointer"
                  >
                    <option value="" disabled>Choose institution...</option>
                    {INSTITUTIONS.map((inst) => (
                      <option key={inst} value={inst}>{inst}</option>
                    ))}
                  </select>
                </div>
                <div className="mt-6 flex items-center gap-4">
                  <Button variant="primary" onClick={(e) => { e.preventDefault(); next(); }} disabled={!canProceed()}>
                    OK ✓
                  </Button>
                  <Button variant="ghost" onClick={(e) => { e.preventDefault(); prev(); }} className="py-2.5 px-3 flex items-center justify-center" aria-label="Back">
                    <ArrowLeft size={16} />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 8: Bus Pickup */}
            {step === 8 && (
              <div className="flex flex-col gap-5">
                <label className="text-xl md:text-2xl font-semibold text-[var(--color-ink)] font-heading">
                  Do you need bus pickup?
                </label>
                <p className="text-sm text-[var(--color-ink-dim)] leading-relaxed max-w-[50ch]">
                  Bus pickup points: <strong className="text-[var(--color-ink)]">{BUS_PICKUP_POINTS.join(', ')}</strong>
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mt-2">
                  {['Yes', 'No'].map((option) => {
                    const isSelected = values.busPickup === option;
                    return (
                      <button
                        key={option}
                        type="button"
                        onClick={() => { setValue('busPickup', option); setTimeout(next, 300); }}
                        className={`flex-grow text-center p-4 border-2 font-mono text-sm uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[var(--color-orange)] text-[var(--bg)] border-[var(--color-ink)] shadow-[4px_4px_0_0_var(--color-ink)] -translate-x-[2px] -translate-y-[2px]'
                            : 'bg-transparent text-[var(--color-ink)] border-[var(--color-line)] hover:bg-[var(--color-glass-strong)]'
                        }`}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>
                <div className="mt-2">
                  <Button variant="ghost" onClick={(e) => { e.preventDefault(); prev(); }} className="py-2.5 px-3 flex items-center justify-center" aria-label="Back">
                    <ArrowLeft size={16} />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 9: Block Quest */}
            {step === 9 && (
              <div className="flex flex-col gap-5">
                <label className="text-xl md:text-2xl font-semibold text-[var(--color-ink)] font-heading">
                  Will you participate in the Block Quest?
                </label>
                <div className="flex flex-col sm:flex-row gap-4 mt-2">
                  {['Yes', 'No'].map((option) => {
                    const isSelected = values.blockQuest === option;
                    return (
                      <button
                        key={option}
                        type="button"
                        onClick={() => { setValue('blockQuest', option); setTimeout(next, 300); }}
                        className={`flex-grow text-center p-4 border-2 font-mono text-sm uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[var(--color-orange)] text-[var(--bg)] border-[var(--color-ink)] shadow-[4px_4px_0_0_var(--color-ink)] -translate-x-[2px] -translate-y-[2px]'
                            : 'bg-transparent text-[var(--color-ink)] border-[var(--color-line)] hover:bg-[var(--color-glass-strong)]'
                        }`}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>
                <div className="mt-2">
                  <Button variant="ghost" onClick={(e) => { e.preventDefault(); prev(); }} className="py-2.5 px-3 flex items-center justify-center" aria-label="Back">
                    <ArrowLeft size={16} />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 10: Dietary Preference */}
            {step === 10 && (
              <div className="flex flex-col gap-5">
                <label className="text-xl md:text-2xl font-semibold text-[var(--color-ink)] font-heading">
                  Do you have any dietary preferences?
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2 font-mono text-xs uppercase tracking-wider">
                  {['No preference', 'Vegetarian', 'Vegan', 'Gluten-free', 'Other'].map((option) => {
                    const isSelected = values.dietary === option || (option === 'Other' && !['No preference', 'Vegetarian', 'Vegan', 'Gluten-free', ''].includes(values.dietary));
                    return (
                      <button
                        key={option}
                        type="button"
                        onClick={() => {
                          if (option === 'Other') {
                            setValue('dietary', 'Other: ');
                          } else {
                            setValue('dietary', option);
                            setTimeout(next, 300);
                          }
                        }}
                        className={`text-center p-3 border-2 rounded-lg transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[var(--color-orange)] text-[var(--bg)] border-[var(--color-ink)] shadow-[4px_4px_0_0_var(--color-ink)] -translate-x-[2px] -translate-y-[2px]'
                            : 'bg-transparent text-[var(--color-ink)] border-[var(--color-line)] hover:bg-[var(--color-glass-strong)]'
                        }`}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>
                {/* Specify if Other */}
                {(values.dietary.startsWith('Other') || (!['No preference', 'Vegetarian', 'Vegan', 'Gluten-free', ''].includes(values.dietary) && values.dietary !== '')) && (
                  <div className="mt-4 flex flex-col gap-2">
                    <label className="text-xs font-mono text-[var(--color-ink-dim)]">Please specify:</label>
                    <input
                      autoFocus
                      type="text"
                      placeholder="e.g. Halal, allergies, etc."
                      value={values.dietary.startsWith('Other: ') ? values.dietary.substring(7) : values.dietary}
                      onChange={(e) => setValue('dietary', `Other: ${e.target.value}`)}
                      onKeyDown={handleKeyDown}
                      className="w-full border-b-2 border-[var(--color-line)] bg-transparent py-2 text-base text-[var(--color-ink)] outline-none focus:border-[var(--color-orange)] font-sans"
                    />
                  </div>
                )}
                <div className="mt-4 flex items-center gap-4">
                  <Button variant="primary" onClick={(e) => { e.preventDefault(); next(); }} disabled={!canProceed()}>
                    OK ✓
                  </Button>
                  <Button variant="ghost" onClick={(e) => { e.preventDefault(); prev(); }} className="py-2.5 px-3 flex items-center justify-center" aria-label="Back">
                    <ArrowLeft size={16} />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 11: Confirm & Submit */}
            {step === 11 && (
              <div className="flex flex-col gap-5">
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-[var(--color-ink)] font-heading">
                  Ready to Submit?
                </h2>
                {(submitError || IS_REGISTRATION_PAUSED) && (
                  <div className="p-4 rounded-xl border border-red-500/30 bg-red-500/10 text-red-500 font-mono text-sm font-semibold flex items-center gap-3">
                    <span className="text-lg">⚠️</span>
                    <span>Oops something went wrong please try again later</span>
                  </div>
                )}
                <div className="bg-[var(--color-bg-soft)] border border-[var(--color-line)] p-5 rounded-lg text-sm font-mono flex flex-col gap-2 leading-relaxed">
                  <div><strong>Name:</strong> {values.name}</div>
                  <div><strong>Email:</strong> {values.email}</div>
                  <div><strong>GitHub:</strong> {values.github}</div>
                  <div><strong>Phone:</strong> {values.phone}</div>
                  <div><strong>Gender:</strong> {values.gender}</div>
                  <div><strong>Affiliation:</strong> {values.affiliation} {values.affiliation === 'Student' && `(${values.institution})`}</div>
                  <div><strong>Bus Pickup:</strong> {values.busPickup}</div>
                  <div><strong>Block Quest:</strong> {values.blockQuest}</div>
                  <div><strong>Dietary Preference:</strong> {values.dietary}</div>
                </div>
                <div ref={confettiRef} className="mt-4 flex items-center gap-4">
                  <Button 
                    variant="primary" 
                    as="button" 
                    className="py-3 px-8"
                    disabled={IS_REGISTRATION_PAUSED}
                  >
                    {submitting ? 'Registering...' : 'Register Now'}
                  </Button>
                  <Button variant="ghost" onClick={(e) => { e.preventDefault(); prev(); }} className="py-2.5 px-3 flex items-center justify-center" aria-label="Back">
                    <ArrowLeft size={16} />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 12: Success Screen */}
            {step === 12 && (
              <div className="flex flex-col gap-5 items-start">
                <span className="text-5xl select-none">🎉</span>
                <h2 className="text-3xl font-bold tracking-tight text-[var(--color-ink)] font-heading">
                  Registration Successful!
                </h2>
                <p className="text-[1rem] text-[var(--color-ink-dim)] leading-relaxed max-w-[50ch]">
                  Welcome to Genesis, <strong className="text-[var(--color-ink)]">{values.name}</strong>! We've received your application. See you on July 25th, 2026.
                </p>
                <div className="mt-6 flex flex-wrap gap-4">
                  <Button 
                    variant="primary" 
                    onClick={(e) => { e.preventDefault(); downloadPDFTicket(); }}
                    disabled={downloading}
                  >
                    Download PDF Ticket
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="border border-[var(--color-line)]"
                    onClick={(e) => {
                      e.preventDefault();
                      setStep(0);
                      setValues({
                        name: '',
                        email: '',
                        github: '',
                        phone: '',
                        gender: '',
                        affiliation: '',
                        institution: '',
                        busPickup: '',
                        blockQuest: '',
                        dietary: ''
                      });
                    }}
                  >
                    Submit Another
                  </Button>
                </div>
              </div>
            )}
          </form>

          {/* Footer Indicators */}
          <div className="mt-8 pt-4 border-t border-[var(--color-line)] flex items-center justify-between font-mono text-[10px] text-[var(--color-ink-dim)]">
            <span>GENESIS WORKSHOP 2026</span>
            <span>BUILDING OPEN SOURCE DEVELOPERS</span>
          </div>

        </div>

        {/* Right Side: Visual Presentation Panel */}
        <div className={`hidden md:flex md:w-2/5 ${isDarkBg ? 'bg-black' : 'bg-white'} relative flex-col items-center justify-center p-12 overflow-hidden select-none rounded-2xl`}>
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none" />
          
          {step === 12 ? (
            <div className="absolute inset-0 z-10 w-full h-full flex justify-center items-center p-6 bg-[var(--color-bg-soft)] rounded-2xl">
              {/* HTML Ticket Preview */}
              <div className={`w-full max-w-[340px] border-y-0 border-x-[12px] border-[var(--color-orange)] ${isDarkBg ? 'bg-black text-white' : 'bg-white text-black'} p-6 rounded-xl shadow-lg flex flex-col gap-4 font-sans text-left border border-[var(--color-line)]`}>
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <h1 className="font-heading font-black text-lg tracking-tighter uppercase italic text-[var(--color-orange)]">
                      THE GENESIS WORKSHOP
                    </h1>
                    <h2 className="font-semibold text-xs mt-1 leading-snug">
                      The Genesis Workshop, open source edition
                    </h2>
                    <p className="text-[10px] text-gray-500 mt-1">July 25, 2026</p>
                    <p className="text-[10px] text-gray-500">Workshop17 Telfair, Mauritius</p>
                  </div>
                </div>

                <p className="text-[10px] font-medium text-gray-500 border-t border-[var(--color-line)] pt-3">
                  Thank you for registering, <span className="font-bold text-[var(--color-ink)]">{values.name}</span>. This QR code is your ticket!
                </p>

                {/* QR Code */}
                <div className="flex justify-center my-1">
                  <img 
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(`Genesis Ticket: ${values.name} - SPARTAN - ${values.email}`)}&color=${isDarkBg ? 'ffffff' : '000000'}&bgcolor=${isDarkBg ? '000000' : 'ffffff'}`}
                    alt="Ticket QR Code"
                    className="w-[140px] h-[140px] border border-[var(--color-line)] p-2 bg-white dark:bg-black rounded-lg"
                  />
                </div>

                {/* Instructions */}
                <div className="text-[10px] space-y-1.5 text-gray-600 dark:text-gray-400">
                  <p>Present this QR code at the workshop registration desk to check in and receive your workshop badge.</p>
                  <p className="font-semibold text-[var(--color-ink)]">
                    This is a <span className="text-[var(--color-orange)] font-bold">SPARTAN 🪖</span> ticket
                  </p>
                  <p className="text-gray-400 mt-3">&lt;3 the OSGuild team</p>
                </div>

                {/* Logos (Btrust, Bitdevs, OSGuild) */}
                <div className="flex items-center justify-between border-t border-[var(--color-line)] pt-3 h-8">
                  <img src={isDarkBg ? btrustLogoWhite : btrustLogoBlack} alt="Btrust" className="h-5 w-auto object-contain" />
                  <img src={isDarkBg ? bitdevsLogoWhite : bitdevsLogoBlack} alt="Bitdevs" className="h-5 w-auto object-contain" />
                  <img src={osguildLogo} alt="OSGuild" className="h-5 w-auto object-contain" />
                </div>

                {/* Links */}
                <div className="flex justify-between text-[9px] font-mono text-[var(--color-orange)] mt-1">
                  <a href="#agenda" className="underline hover:text-[var(--color-orange-dim)]">Workshop Agenda</a>
                  <a href="https://x.com/osguild" target="_blank" rel="noreferrer" className="underline hover:text-[var(--color-orange-dim)]">Follow us on X</a>
                </div>
              </div>
            </div>
          ) : (
            <>
              <img 
                src={genesisImg} 
                alt="Genesis Graphic" 
                className="w-[260px] h-auto object-contain z-10 transition-transform duration-1000 hover:rotate-6 drop-shadow-2xl" 
              />
              
              <div className="mt-8 text-center z-10 max-w-[30ch]">
                <h3 className="font-heading font-bold text-lg text-[var(--color-ink)] mb-2 uppercase tracking-wide">
                  THE GENESIS WORKSHOP
                </h3>
                <p className="text-xs text-[var(--color-ink-dim)] leading-relaxed">
                  Step confidently into the world of collaborative software and decentralized development.
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default RegistrationSection;
