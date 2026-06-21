import React, { useState } from 'react';

interface FAQItemData {
  id: string;
  question: string;
  answer: string;
}

interface AccordionProps {
  items: FAQItemData[];
}

const AccordionItem: React.FC<{ item: FAQItemData }> = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className="border-b border-[var(--color-line)] py-4">
      <button
        type="button"
        id={`faq-btn-${item.id}`}
        aria-expanded={isOpen}
        aria-controls={`faq-panel-${item.id}`}
        onClick={toggle}
        className="flex items-center justify-between w-full text-left font-semibold text-lg py-2 text-[var(--color-ink)] hover:text-[var(--color-orange)] transition-colors focus-visible:outline-2 focus-visible:outline-[var(--color-cyan)] rounded select-none cursor-pointer"
      >
        <span>{item.question}</span>
        <span
          className="ml-4 shrink-0 transition-transform duration-300 motion-reduce:transition-none"
          style={{ transform: isOpen ? 'rotate(45deg)' : 'none' }}
        >
          <svg
            className="w-5 h-5 text-current"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
        </span>
      </button>

      <div
        id={`faq-panel-${item.id}`}
        role="region"
        aria-labelledby={`faq-btn-${item.id}`}
        className="grid transition-[grid-template-rows] duration-300 ease-in-out motion-reduce:transition-none"
        style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
      >
        <div className="overflow-hidden">
          <p className="pb-3 pt-2 text-[1rem] text-[var(--color-ink-dim)] leading-relaxed">
            {item.answer}
          </p>
        </div>
      </div>
    </div>
  );
};

const Accordion: React.FC<AccordionProps> = ({ items }) => {
  return (
    <div className="w-full">
      {items.map((item) => (
        <AccordionItem key={item.id} item={item} />
      ))}
    </div>
  );
};

export default Accordion;
