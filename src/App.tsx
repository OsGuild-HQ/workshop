import { useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import PixelBlast from './components/PixelBlast';
import CardNav from './components/CardNav';
import type { CardNavItem } from './components/CardNav';
import genesisImg from './assets/TheGenesis.png';
import './App.css';

// Section components
import AboutSection from './components/AboutSection';
import WhySection from './components/WhySection';
import CareerPathway from './components/CareerPathway';
import AgendaSection from './components/AgendaSection';
import SpeakersSection from './components/SpeakersSection';
import EventDetailsSection from './components/EventDetailsSection';
import PartnersSection from './components/PartnersSection';
import FaqSection from './components/FaqSection';
import CtaSection from './components/CtaSection';
import Footer from './components/Footer';

const navItems: CardNavItem[] = [
  {
    label: 'Syllabus',
    bgColor: '#ffffff',
    textColor: '#0f0c1b',
    links: [
      { label: 'Intro to Bitcoin', href: '#intro', ariaLabel: 'Learn Bitcoin basics' },
      { label: 'Rust Development', href: '#rust', ariaLabel: 'Rust and protocol coding' },
      { label: 'Final Project', href: '#project', ariaLabel: 'Review final project requirements' }
    ]
  },
  {
    label: 'Resources',
    bgColor: '#ffd984',
    textColor: '#0f0c1b',
    links: [
      { label: 'GitHub Repository', href: '#github', ariaLabel: 'Visit GitHub' },
      { label: 'Setup Guide', href: '#setup', ariaLabel: 'Environment configuration guide' },
      { label: 'FOSS Guidelines', href: '#guidelines', ariaLabel: 'Free and open source guidelines' }
    ]
  },
  {
    label: 'OSGuild',
    bgColor: '#96dbb7',
    textColor: '#0f0c1b',
    links: [
      { label: 'About Us', href: '#about', ariaLabel: 'More about OSGuild' },
      { label: 'Mentorship', href: '#mentorship', ariaLabel: 'Apply for mentorship' },
      { label: 'Contributions', href: '#contributions', ariaLabel: 'Submit contributions' }
    ]
  }
];

function App() {
  const [isDarkBg, setIsDarkBg] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('workshop-bg');
      if (saved) {
        return saved === 'dark';
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  const toggleTheme = () => {
    const nextVal = !isDarkBg;
    setIsDarkBg(nextVal);
    localStorage.setItem('workshop-bg', nextVal ? 'dark' : 'light');
  };

  return (
    <div className={`app-container ${isDarkBg ? 'dark-bg' : ''}`}>
      {/* Interactive CardNav */}
      <CardNav logo="GENESIS" items={navItems} />

      {/* Theme Switcher Button */}
      <button 
        onClick={toggleTheme} 
        className="theme-toggle-btn" 
        aria-label={`Switch to ${isDarkBg ? 'light' : 'dark'} mode`}
      >
        {isDarkBg ? <Sun size={18} /> : <Moon size={18} />}
      </button>

      {/* Header featuring PixelBlast */}
      <header className="hero-header">
        <div className="pixel-blast-wrapper">
          <PixelBlast
            variant="square"
            pixelSize={4}
            color="#34C759"
            patternScale={2}
            patternDensity={1}
            pixelSizeJitter={0}
            enableRipples
            rippleSpeed={0.4}
            rippleThickness={0.12}
            rippleIntensityScale={1.5}
            liquid={false}
            liquidStrength={0.12}
            liquidRadius={1.2}
            liquidWobbleSpeed={5}
            speed={0.5}
            edgeFade={0.25}
            transparent
          />
        </div>
        
        {/* Minimalist Overlay Content */}
        <div className="header-overlay">
          <div className="header-content-wrapper">
            <div className="header-text-side">
              <span className="subtitle-tag">Mauritius 🇲🇺 - 25th July 2026</span>
              <h1 className="main-title">BUILDING OPEN SOURCE DEVELOPERS</h1>
              <p className="description">
                An in-person Workshop designed to help developers step confidently into the world of open source
              </p>
            </div>
            <div className="header-image-side">
              <img src={genesisImg} alt="The Genesis Workshop" className="genesis-image" />
            </div>
          </div>
        </div>
      </header>

      {/* Main content sections */}
      <main className="w-full flex-grow">
        <AboutSection />
        <WhySection />
        <CareerPathway />
        <SpeakersSection />
        <AgendaSection />
        <EventDetailsSection />
        <PartnersSection />
        <FaqSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
