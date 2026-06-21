import React from 'react';
import SectionHeading from './ui/SectionHeading';
import BrutalCard from './ui/BrutalCard';
import { eventDetails } from '../data/eventDetails';
import { MapPin, Calendar, Clock, Users, Handshake } from 'lucide-react';

const EventDetailsSection: React.FC = () => {
  const getIcon = (iconName: string) => {
    const classes = "w-6 h-6 text-[var(--color-orange)]";
    switch (iconName) {
      case 'map-pin':
        return <MapPin className={classes} aria-hidden="true" />;
      case 'calendar':
        return <Calendar className={classes} aria-hidden="true" />;
      case 'clock':
        return <Clock className={classes} aria-hidden="true" />;
      case 'users':
        return <Users className={classes} aria-hidden="true" />;
      case 'handshake':
        return <Handshake className={classes} aria-hidden="true" />;
      default:
        return null;
    }
  };

  return (
    <section id="details" className="py-16 md:py-24 max-w-[1180px] mx-auto px-4 md:px-8">
      <SectionHeading eyebrow="event details" title="Event Details" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {eventDetails.map((detail) => {
          const isTBA = detail.value === 'TBA';
          return (
            <BrutalCard key={detail.id} className="flex flex-col justify-between p-6 min-h-[160px] text-left">
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs text-[var(--color-ink-dim)] uppercase tracking-wider">
                  {detail.label}
                </span>
                {getIcon(detail.icon)}
              </div>
              <div className={`text-xl md:text-2xl font-bold font-heading tracking-tight ${isTBA ? 'opacity-50 text-[var(--color-ink-dim)]' : 'text-[var(--color-ink)]'}`}>
                {detail.value}
              </div>
            </BrutalCard>
          );
        })}
      </div>
    </section>
  );
};

export default EventDetailsSection;
