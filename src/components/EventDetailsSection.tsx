import React from 'react';
import SectionHeading from './ui/SectionHeading';
import Button from './ui/Button';
import { MapPin, ExternalLink } from 'lucide-react';

const EventDetailsSection: React.FC = () => {
  const mapsUrl = "https://maps.app.goo.gl/QH9MHyeDQ5QMx8Rs5?g_st=ic";

  return (
    <section id="details" className="py-16 md:py-24 max-w-[1180px] mx-auto px-4 md:px-8">
      <SectionHeading eyebrow="venue & directions" title="Event Venue" align="left" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-stretch mt-8">
        {/* Left Side: Venue Details */}
        <div className="flex flex-col justify-center items-start text-left">
          <div className="flex items-center gap-3 mb-4 text-[var(--color-orange)]">
            <MapPin className="w-8 h-8" aria-hidden="true" />
            <span className="font-mono text-xs uppercase tracking-wider text-[var(--color-ink-dim)]">
              Location
            </span>
          </div>
          
          <h3 className="text-3xl font-bold tracking-tight text-[var(--color-ink)] font-heading mb-4">
            Workshop17 Telfair
          </h3>
          
          <p className="text-lg text-[var(--color-ink-dim)] leading-relaxed mb-8">
            Telfair, Moka, Mauritius
          </p>

          <Button 
            as="a" 
            href={mapsUrl} 
            variant="primary"
            className="flex items-center gap-2"
          >
            Get Directions <ExternalLink size={16} />
          </Button>
        </div>

        {/* Right Side: Embedded Map */}
        <div className="h-[300px] md:h-[400px] w-full rounded-lg overflow-hidden border border-[var(--color-line)] shadow-sm bg-[var(--color-bg-soft)]">
          <iframe
            title="Workshop17 Telfair Location Map"
            src="https://maps.google.com/maps?q=Workshop17%20Telfair,%20Moka,%20Mauritius&t=&z=15&ie=UTF8&iwloc=&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
};

export default EventDetailsSection;
