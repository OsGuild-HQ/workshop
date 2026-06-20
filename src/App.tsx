import PixelBlast from './components/PixelBlast';
import CardNav from './components/CardNav';
import type { CardNavItem } from './components/CardNav';
import './App.css';

const navItems: CardNavItem[] = [
  {
    label: 'Syllabus',
    bgColor: '#b497cf',
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
  return (
    <div className="app-container">
      {/* Interactive CardNav */}
      <CardNav logo="GENESIS" items={navItems} />

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
          <div className="header-content pt-[80px]">
            <span className="subtitle-tag">OSGUILD PRESENTS</span>
            <h1 className="main-title">THE GENESIS WORKSHOP</h1>
            <p className="description">
              A minimalist, hands-on workshop focused on building clean digital infrastructure.
            </p>
          </div>
        </div>
      </header>

      {/* Main content placeholder for workshop page */}
      <main className="content-main">
        <section className="section-intro">
          <h2>Getting Started</h2>
          <p>
            Welcome to the Genesis Workshop workspace. Start modifying <code>src/App.tsx</code> or build new components inside the structured directory to customize this page.
          </p>
        </section>
      </main>
    </div>
  );
}

export default App;
