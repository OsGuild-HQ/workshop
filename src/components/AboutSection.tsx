import React from 'react';
import SectionHeading from './ui/SectionHeading';
import handkeyboard from '../assets/handkeyboard.png';

const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-16 md:py-24 max-w-[1180px] mx-auto px-4 md:px-8">
      <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
        {/* Left Side: About Text */}
        <div className="flex-1 text-left">
          <SectionHeading eyebrow="about" title="What is Genesis?" align="left" className="px-0 mb-6" />
          <p className="text-lg md:text-xl text-[var(--color-ink)] leading-relaxed mb-6 font-medium">
            Genesis Workshop is a gathering for developers, students, and curious builders who want to understand how open source works and how meaningful software is built through collaboration.
          </p>
          <p className="text-base text-[var(--color-ink-dim)] leading-relaxed">
            Participants will learn from experienced contributors, explore modern development workflows, and gain practical insights into open-source communities and Bitcoin technologies.
          </p>
        </div>

        {/* Right Side: Image */}
        <div className="flex-1 flex justify-center md:justify-end w-full">
          <img 
            src={handkeyboard} 
            alt="Genesis hands-on development" 
            className="max-w-full max-h-[380px] object-contain" 
          />
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
