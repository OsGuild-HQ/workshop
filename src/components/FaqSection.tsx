import React from 'react';
import SectionHeading from './ui/SectionHeading';
import Accordion from './ui/Accordion';
import { faq } from '../data/faq';

const FaqSection: React.FC = () => {
  return (
    <section id="faq" className="py-16 md:py-24 max-w-[1180px] mx-auto px-4 md:px-8">
      <SectionHeading eyebrow="faq" title="Frequently Asked Questions" />
      <div className="max-w-[720px] mx-auto">
        <Accordion items={faq} />
      </div>
    </section>
  );
};

export default FaqSection;
