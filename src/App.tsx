import { useState, useEffect } from 'react';
import PixelBlast from './components/PixelBlast';
import CardNav from './components/CardNav';
import genesisImg from './assets/TheGenesis.png';
import './App.css';

// Section components
import AboutSection from './components/AboutSection';
import WhySection from './components/WhySection';
import CareerPathway from './components/CareerPathway';
import ActivitiesSection from './components/ActivitiesSection';
import AgendaSection from './components/AgendaSection';
import SpeakersSection from './components/SpeakersSection';
import EventDetailsSection from './components/EventDetailsSection';
import PartnersSection from './components/PartnersSection';
import FaqSection from './components/FaqSection';
import CtaSection from './components/CtaSection';
import RegistrationSection from './components/RegistrationSection';
import TicketVerificationSection from './components/TicketVerificationSection';
import BlockQuestDetailsSection from './components/BlockQuestDetailsSection';
import ManageRegistrationSection from './components/ManageRegistrationSection';
import LunchOrderSection from './components/LunchOrderSection';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';

const getRouteAndParams = () => {
  if (typeof window === 'undefined') return { route: 'home', params: {} as Record<string, string> };
  const hash = window.location.hash;
  if (!hash) return { route: 'home', params: {} as Record<string, string> };
  
  const [cleanHash, queryString] = hash.split('?');
  const params: Record<string, string> = {};
  if (queryString) {
    const searchParams = new URLSearchParams(queryString);
    searchParams.forEach((value, key) => {
      params[key] = value;
    });
  }
  return { route: cleanHash.substring(1), params };
};

function App() {
  const [routeInfo, setRouteInfo] = useState(() => getRouteAndParams());
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

  useEffect(() => {
    const handleHashChange = () => {
      const info = getRouteAndParams();
      setRouteInfo(info);
      if (info.route === 'register' || info.route === 'ticket') {
        window.scrollTo(0, 0);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const toggleTheme = () => {
    const nextVal = !isDarkBg;
    setIsDarkBg(nextVal);
    localStorage.setItem('workshop-bg', nextVal ? 'dark' : 'light');
  };

  if (routeInfo.route === 'ticket') {
    return (
      <div className={`app-container ${isDarkBg ? 'dark-bg' : ''}`}>
        <TicketVerificationSection ticketId={routeInfo.params.id || ''} isDarkBg={isDarkBg} />
      </div>
    );
  }

  if (routeInfo.route === 'register') {
    return (
      <div className={`app-container ${isDarkBg ? 'dark-bg' : ''}`}>
        <RegistrationSection isDarkBg={isDarkBg} toggleTheme={toggleTheme} />
      </div>
    );
  }

  if (routeInfo.route === 'block-quest') {
    return (
      <div className={`app-container ${isDarkBg ? 'dark-bg' : ''}`}>
        <BlockQuestDetailsSection isDarkBg={isDarkBg} />
      </div>
    );
  }

  if (routeInfo.route === 'manage') {
    return (
      <div className={`app-container ${isDarkBg ? 'dark-bg' : ''}`}>
        <ManageRegistrationSection isDarkBg={isDarkBg} toggleTheme={toggleTheme} />
      </div>
    );
  }

  if (routeInfo.route === 'lunch') {
    return (
      <div className={`app-container ${isDarkBg ? 'dark-bg' : ''}`}>
        <LunchOrderSection isDarkBg={isDarkBg} toggleTheme={toggleTheme} />
      </div>
    );
  }

  return (
    <div className={`app-container ${isDarkBg ? 'dark-bg' : ''}`}>
      {/* Interactive CardNav */}
      <CardNav logo="GENESIS" isDarkBg={isDarkBg} toggleTheme={toggleTheme} />

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
        <ActivitiesSection isDarkBg={isDarkBg} />
        <SpeakersSection />
        <AgendaSection />
        <EventDetailsSection />
        <PartnersSection />
        <FaqSection />
        <CtaSection />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}

export default App;
