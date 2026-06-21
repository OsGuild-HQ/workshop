import React from 'react';
import SectionHeading from './ui/SectionHeading';
import CheckItem from './ui/CheckItem';
import { attendees } from '../data/attendees';

const AttendeesSection: React.FC = () => {
  return (
    <section id="attendees" className="py-16 md:py-24 max-w-[1180px] mx-auto px-4 md:px-8">
      <SectionHeading eyebrow="who should attend" title="Who Should Attend" />
      <div className="flex flex-wrap justify-center gap-6 md:gap-8 max-w-4xl mx-auto">
        {attendees.map((attendee, index) => (
          <CheckItem
            key={index}
            label={attendee}
            className="flex-1 min-w-[200px] max-w-[240px] md:max-w-none md:flex-initial"
          />
        ))}
      </div>
    </section>
  );
};

export default AttendeesSection;
