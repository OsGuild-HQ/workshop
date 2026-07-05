import React, { useState, useRef } from 'react';
import { gsap } from 'gsap';
import Button from './ui/Button';
import genesisImg from '../assets/TheGenesis.png';

interface RegistrationSectionProps {
  id?: string;
}

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

const RegistrationSection: React.FC<RegistrationSectionProps> = ({ id = 'register' }) => {
  const [step, setStep] = useState(0); 
  // 0: Intro, 1: Name, 2: Email, 3: Phone, 4: Gender, 5: Affiliation, 6: Student Institution, 7: Bus Pickup, 8: Block Quest, 9: Confirm, 10: Success
  
  const [values, setValues] = useState({
    name: '',
    email: '',
    phone: '',
    gender: '',
    affiliation: '',
    institution: '',
    busPickup: '',
    blockQuest: ''
  });

  const [submitting, setSubmitting] = useState(false);
  const confettiRef = useRef<HTMLDivElement>(null);

  const setValue = (key: keyof typeof values, val: string) => {
    setValues((prev) => ({ ...prev, [key]: val }));
  };

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const canProceed = () => {
    switch (step) {
      case 0: return true;
      case 1: return values.name.trim().length >= 2;
      case 2: return validateEmail(values.email);
      case 3: return values.phone.trim().length >= 7;
      case 4: return values.gender !== '';
      case 5: return values.affiliation !== '';
      case 6: return values.affiliation === 'Student' ? values.institution !== '' : true;
      case 7: return values.busPickup !== '';
      case 8: return values.blockQuest !== '';
      default: return true;
    }
  };

  const next = () => {
    if (!canProceed()) return;
    if (step === 5 && values.affiliation === 'Professional') {
      setStep(7); // Skip step 6 (student institution selection)
    } else if (step < 9) {
      setStep(step + 1);
    }
  };

  const prev = () => {
    if (step === 7 && values.affiliation === 'Professional') {
      setStep(5);
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
    if (step === 9) {
      setSubmitting(true);
      
      // Mock network latency
      setTimeout(() => {
        setSubmitting(false);
        setStep(10);
        
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
    if (step === 0 || step >= 9) return null;
    if (step <= 5) return step;
    if (step === 6) return 6;
    return values.affiliation === 'Professional' ? step - 1 : step;
  };

  const totalQ = () => {
    return values.affiliation === 'Professional' ? 7 : 8;
  };

  return (
    <section id={id} className="py-20 md:py-28 border-t border-[var(--color-line)] max-w-[1180px] mx-auto px-4 md:px-8 relative overflow-hidden">
      {/* Subtle backdrop glow */}
      <div 
        className="absolute left-10 top-10 w-[200px] h-[200px] rounded-full blur-[100px] pointer-events-none opacity-5 bg-[var(--color-cyan)]"
        aria-hidden="true"
      />

      <div className="relative z-10 w-full flex flex-col md:flex-row border border-[var(--color-line)] bg-[var(--color-glass)] backdrop-blur-md rounded-2xl overflow-hidden min-h-[550px] shadow-lg">
        {/* Left Side: Interactive Wizard Form */}
        <div className="w-full md:w-3/5 p-8 sm:p-12 md:p-16 flex flex-col justify-between relative min-h-[500px]">
          
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
                <h2 className="text-3xl font-bold tracking-tight text-[var(--color-ink)] font-heading">
                  Register for Genesis
                </h2>
                <p className="text-[1rem] text-[var(--color-ink-dim)] leading-relaxed max-w-[50ch]">
                  Join the next generation of open source developers. Take a few moments to fill in your application.
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-4">
                  <Button variant="primary" onClick={(e) => { e.preventDefault(); setStep(1); }}>
                    Start Registration
                  </Button>
                  <span className="hidden sm:inline font-mono text-xs text-[var(--color-ink-dim)]">
                    press <strong className="text-[var(--color-ink)]">Enter ↵</strong>
                  </span>
                </div>
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
                  <Button variant="ghost" onClick={(e) => { e.preventDefault(); prev(); }} className="py-2.5 px-4 text-xs">
                    Back
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: Phone */}
            {step === 3 && (
              <div className="flex flex-col gap-4">
                <label className="text-xl md:text-2xl font-semibold text-[var(--color-ink)] font-heading">
                  What is your phone number?
                </label>
                <input
                  autoFocus
                  type="tel"
                  placeholder="e.g. +230 5123 4567"
                  value={values.phone}
                  onChange={(e) => setValue('phone', e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="w-full border-b-2 border-[var(--color-line)] bg-transparent py-3 text-lg md:text-xl text-[var(--color-ink)] outline-none transition-colors placeholder:opacity-40 focus:border-[var(--color-orange)] font-sans"
                />
                <div className="mt-6 flex items-center gap-4">
                  <Button variant="primary" onClick={(e) => { e.preventDefault(); next(); }} disabled={!canProceed()}>
                    OK ✓
                  </Button>
                  <Button variant="ghost" onClick={(e) => { e.preventDefault(); prev(); }} className="py-2.5 px-4 text-xs">
                    Back
                  </Button>
                </div>
              </div>
            )}

            {/* Step 4: Gender */}
            {step === 4 && (
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
                  <Button variant="ghost" onClick={(e) => { e.preventDefault(); prev(); }} className="py-2.5 px-4 text-xs">
                    Back
                  </Button>
                </div>
              </div>
            )}

            {/* Step 5: Affiliation */}
            {step === 5 && (
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
                  <Button variant="ghost" onClick={(e) => { e.preventDefault(); prev(); }} className="py-2.5 px-4 text-xs">
                    Back
                  </Button>
                </div>
              </div>
            )}

            {/* Step 6: Student Institution */}
            {step === 6 && values.affiliation === 'Student' && (
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
                  <Button variant="ghost" onClick={(e) => { e.preventDefault(); prev(); }} className="py-2.5 px-4 text-xs">
                    Back
                  </Button>
                </div>
              </div>
            )}

            {/* Step 7: Bus Pickup */}
            {step === 7 && (
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
                  <Button variant="ghost" onClick={(e) => { e.preventDefault(); prev(); }} className="py-2.5 px-4 text-xs">
                    Back
                  </Button>
                </div>
              </div>
            )}

            {/* Step 8: Block Quest */}
            {step === 8 && (
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
                  <Button variant="ghost" onClick={(e) => { e.preventDefault(); prev(); }} className="py-2.5 px-4 text-xs">
                    Back
                  </Button>
                </div>
              </div>
            )}

            {/* Step 9: Confirm & Submit */}
            {step === 9 && (
              <div className="flex flex-col gap-5">
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-[var(--color-ink)] font-heading">
                  Ready to Submit?
                </h2>
                <div className="bg-[var(--color-bg-soft)] border border-[var(--color-line)] p-5 rounded-lg text-sm font-mono flex flex-col gap-2 leading-relaxed">
                  <div><strong>Name:</strong> {values.name}</div>
                  <div><strong>Email:</strong> {values.email}</div>
                  <div><strong>Phone:</strong> {values.phone}</div>
                  <div><strong>Gender:</strong> {values.gender}</div>
                  <div><strong>Affiliation:</strong> {values.affiliation} {values.affiliation === 'Student' && `(${values.institution})`}</div>
                  <div><strong>Bus Pickup:</strong> {values.busPickup}</div>
                  <div><strong>Block Quest:</strong> {values.blockQuest}</div>
                </div>
                <div ref={confettiRef} className="mt-4 flex items-center gap-4">
                  <Button variant="primary" as="button" className="py-3 px-8">
                    {submitting ? 'Registering...' : 'Register Now'}
                  </Button>
                  <Button variant="ghost" onClick={(e) => { e.preventDefault(); prev(); }} className="py-2.5 px-4 text-xs">
                    Back
                  </Button>
                </div>
              </div>
            )}

            {/* Step 10: Success Screen */}
            {step === 10 && (
              <div className="flex flex-col gap-4 items-start">
                <span className="text-5xl select-none">🎉</span>
                <h2 className="text-3xl font-bold tracking-tight text-[var(--color-ink)] font-heading">
                  Registration Successful!
                </h2>
                <p className="text-[1rem] text-[var(--color-ink-dim)] leading-relaxed max-w-[50ch]">
                  Welcome to Genesis, <strong className="text-[var(--color-ink)]">{values.name}</strong>! We've received your application. See you on July 25th, 2026.
                </p>
                <div className="mt-6">
                  <Button 
                    variant="primary" 
                    onClick={(e) => {
                      e.preventDefault();
                      setStep(0);
                      setValues({
                        name: '',
                        email: '',
                        phone: '',
                        gender: '',
                        affiliation: '',
                        institution: '',
                        busPickup: '',
                        blockQuest: ''
                      });
                    }}
                  >
                    Submit Another Application
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
        <div className="hidden md:flex md:w-2/5 bg-[var(--color-bg-soft)] border-l border-[var(--color-line)] relative flex-col items-center justify-center p-12 overflow-hidden select-none">
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none" />
          
          <img 
            src={genesisImg} 
            alt="Genesis Graphic" 
            className="w-[260px] h-auto object-contain z-10 transition-transform duration-1000 hover:rotate-6 drop-shadow-2xl" 
          />
          
          <div className="mt-8 text-center z-10 max-w-[30ch]">
            <h3 className="font-heading font-bold text-lg text-[var(--color-ink)] mb-2 uppercase tracking-wide">
              Genesis Workshop
            </h3>
            <p className="text-xs text-[var(--color-ink-dim)] leading-relaxed">
              Step confidently into the world of collaborative software and decentralized development.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegistrationSection;
